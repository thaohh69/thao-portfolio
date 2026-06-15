import { useState, useEffect } from 'react';

interface CSRFTokenResponse {
  success: boolean;
  data: {
    token: string;
    sessionId: string;
  };
  message: string;
}

export function useCSRFToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const fetchCSRFToken = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/csrf/token', {
        method: 'GET',
        credentials: 'include', // Important: include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data: CSRFTokenResponse = await response.json();
      setToken(data.data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = () => {
    fetchCSRFToken();
  };

  return {
    token,
    loading,
    error,
    refreshToken,
  };
}

export function useSecureRequest() {
  const { token } = useCSRFToken();

  const secureRequest = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers = new Headers(options.headers);

    // Add CSRF token to requests that modify data
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method || 'GET')) {
      if (token) {
        headers.set('X-CSRF-Token', token);
      }
      headers.set('Content-Type', 'application/json');
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies
    });
  };

  return {
    secureRequest,
    hasToken: !!token,
  };
}