import time
import threading

_lock = threading.Lock()
_last_call = 0
MIN_INTERVAL = 5.0  # seconds between calls (increased from 3.0 to prevent rate limits)

def wait_for_slot():
    global _last_call
    with _lock:
        now = time.time()
        elapsed = now - _last_call
        if elapsed < MIN_INTERVAL:
            time.sleep(MIN_INTERVAL - elapsed)
        _last_call = time.time()
