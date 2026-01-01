from fastapi import WebSocket
from typing import Dict, List
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, task_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(task_id, []).append(websocket)

    def disconnect(self, task_id: str, websocket: WebSocket):
        if task_id in self.active_connections:
            self.active_connections[task_id].remove(websocket)
            if not self.active_connections[task_id]:
                del self.active_connections[task_id]

    async def send(self, task_id: str, message: dict):
        if task_id not in self.active_connections:
            return

        dead = []
        for ws in self.active_connections[task_id]:
            try:
                await ws.send_text(json.dumps(message))
            except:
                dead.append(ws)

        for ws in dead:
            self.disconnect(task_id, ws)

    async def close_all(self, task_id: str):
        if task_id not in self.active_connections:
            return

        for ws in self.active_connections[task_id]:
            await ws.close()

        del self.active_connections[task_id]


manager = ConnectionManager()
