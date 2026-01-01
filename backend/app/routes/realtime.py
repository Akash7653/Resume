from fastapi import APIRouter, WebSocket
from celery.result import AsyncResult
from app.core.background import celery_app
import asyncio
import json

router = APIRouter()


@router.websocket("/ws/task/{task_id}")
async def task_updates(websocket: WebSocket, task_id: str):
    await websocket.accept()

    sent_pending = False  # send PENDING only once

    try:
        while True:
            result = AsyncResult(task_id, app=celery_app)

            # ✅ PENDING (send once)
            if result.state == "PENDING":
                if not sent_pending:
                    await websocket.send_text(json.dumps({
                        "state": "PENDING",
                        "message": "Task queued"
                    }))
                    sent_pending = True

            # ✅ PROGRESS
            elif result.state == "PROGRESS":
                await websocket.send_text(json.dumps({
                    "state": "PROGRESS",
                    **(result.info or {})
                }))

            # 🔥 CRITICAL FIX (DO NOT USE result.state == "SUCCESS")
            elif result.ready():
                final = result.get(timeout=1)

                # unwrap {"state": "SUCCESS", "result": {...}}
                payload = (
                    final.get("result", final)
                    if isinstance(final, dict)
                    else final
                )

                await websocket.send_text(json.dumps({
                    "state": "SUCCESS",
                    "result": payload
                }))
                break  # 🔥 stop loop

            # ❌ FAILURE
            elif result.state == "FAILURE":
                await websocket.send_text(json.dumps({
                    "state": "FAILURE",
                    "error": str(result.info)
                }))
                break

            await asyncio.sleep(0.5)  # faster polling

    except Exception as e:
        print("WebSocket error:", e)

    finally:
        await websocket.close()
