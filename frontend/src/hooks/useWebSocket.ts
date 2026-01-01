import { useState, useEffect, useRef } from 'react';

interface WebSocketResult {
  [key: string]: any;
}

interface WebSocketReturn {
  status: string | null;
  progress: number;
  error: string | null;
  result: WebSocketResult | null;
}

export const useWebSocket = (taskId: string, onSuccess?: (result: WebSocketResult) => void): WebSocketReturn => {
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WebSocketResult | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!taskId) return;

    const ws = new WebSocket(`ws://localhost:8000/realtime/ws/task/${taskId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket connected');
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (process.env.NODE_ENV === 'development') {
          console.log('WebSocket message received');
        }
        
        // Handle both state and status for compatibility
        const taskStatus = data.status || data.state;
        setStatus(taskStatus);
        
        // For SUCCESS state, capture the result and mark as completed
        if (taskStatus === 'SUCCESS') {
          setProgress(100);
          setResult(data.result);
          if (onSuccess && data.result) {
            onSuccess(data.result);
          }
        } else {
          setProgress(data.progress || 0);
        }
        
        if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (err: Event) => {
      console.error('WebSocket error:', err);
      setError('Connection error');
    };

    ws.onclose = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket disconnected');
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [taskId, onSuccess]);

  return { status, progress, error, result };
};
