declare module '../utils/token' {
  export function setToken(token: string): void;
  export function removeToken(): void;
  export function getToken(): string | null;
}

declare module '../api/auth.api' {
  export function login(credentials: { email: string; password: string }): Promise<{ access_token: string }>;
  export function register(userData: { email: string; password: string; name: string }): Promise<{ access_token: string }>;
  export function getProfile(): Promise<any>;
}

declare module '../api/resume.api' {
  export function analyzeResumeAsync(file: File): Promise<any>;
  export function getResumeHistory(): Promise<any>;
  export function getResumeById(id: string): Promise<any>;
}

declare module '../hooks/useAuth' {
  export function useAuth(): {
    user: any;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<any>;
    register: (userData: { email: string; password: string; name: string }) => Promise<any>;
    logout: () => void;
  };
}

declare module '../hooks/useResume' {
  export function useResume(): {
    currentResume: any;
    setCurrentResume: (resume: any) => void;
    analysisResult: any;
    setAnalysisResult: (result: any) => void;
    clearResume: () => void;
  };
}

declare module '../hooks/useWebSocket' {
  export function useWebSocket(taskId: string, callback: (result: any) => void): {
    status: string;
    progress: number;
  };
}

declare module '../components/layout/PageWrapper' {
  const PageWrapper: any;
  export default PageWrapper;
}

declare module '../components/ui/Button' {
  const Button: any;
  export default Button;
}

declare module '../components/ui/Progress' {
  const Progress: any;
  export default Progress;
}

declare module '../api/*' {
  const api: any;
  export default api;
  export function get(url: string, config?: any): Promise<any>;
  export function post(url: string, data?: any, config?: any): Promise<any>;
  export function put(url: string, data?: any, config?: any): Promise<any>;
  export function del(url: string, config?: any): Promise<any>;
}
