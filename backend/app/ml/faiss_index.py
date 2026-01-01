import faiss
import json
import os
import numpy as np
from app.ai.embedding_engine import EmbeddingEngine

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
JOB_PATH = os.path.join(BASE_DIR, "ml", "job_roles.json")

class JobFAISSIndex:
    def __init__(self):
        self.embedder = EmbeddingEngine()
        self.index = None
        self.job_titles = []
        self._build_index()

    def _build_index(self):
        with open(JOB_PATH, "r", encoding="utf-8") as f:
            jobs = json.load(f)

        embeddings = []
        for title, data in jobs.items():
            emb = self.embedder.encode(data["description"])
            embeddings.append(emb)
            self.job_titles.append(title)

        vectors = np.array(embeddings).astype("float32")
        self.index = faiss.IndexFlatIP(vectors.shape[1])
        self.index.add(vectors)

    def search(self, resume_embedding, top_k=1):
        resume_embedding = np.array([resume_embedding]).astype("float32")
        scores, indices = self.index.search(resume_embedding, top_k)
        return self.job_titles[indices[0][0]], float(scores[0][0])
