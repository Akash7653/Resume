from celery import Celery
import redis
from redis.exceptions import ConnectionError as RedisConnectionError

# Redis connection settings
REDIS_BROKER_URL = "redis://localhost:6379/0"
REDIS_BACKEND_URL = "redis://localhost:6379/1"

# Test Redis connection
def test_redis_connection():
    """Test if Redis is available"""
    try:
        r = redis.Redis(host='localhost', port=6379, db=0, socket_connect_timeout=2)
        r.ping()
        return True
    except (RedisConnectionError, Exception):
        return False

celery_app = Celery(
    "resumeiq",
    broker=REDIS_BROKER_URL,
    backend=REDIS_BACKEND_URL,
)

# 👇 THIS IS THE FIX
celery_app.autodiscover_tasks([
    "app.tasks"
])

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    task_default_queue="celery",
    broker_connection_retry_on_startup=True,
    broker_connection_retry=True,
    broker_connection_max_retries=10,
    result_backend_transport_options={
        'master_name': 'mymaster',
        'retry_policy': {
            'timeout': 5.0
        }
    },
)

