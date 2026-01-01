from fastapi import APIRouter
from celery.result import AsyncResult
from app.core.background import celery_app

router = APIRouter()

@router.get("/status/{task_id}")

def get_resume_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)

    if result.state == "PENDING":
        return {"state": "PENDING"}

    if result.state == "PROGRESS":
        return {
            "state": "PROGRESS",
            "step": result.info.get("step")
        }

    if result.state == "SUCCESS":
        return {
            "state": "SUCCESS",
            "result": result.result
        }

    if result.state == "FAILURE":
        return {
            "state": "FAILURE",
            "error": str(result.info)
        }
