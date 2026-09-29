import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import apiClient from '@src/utils/axiosConfig.js';

export function useApiReader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const callApi = useCallback(
    async ({ url, method = 'GET', body = null } = {}) => {
      if (!url) {
        throw new Error(": 'url' is required");
      }

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient({
          url,
          method,
          data: body,
          signal: controller.signal,
        });

        setData(response.data);

        return response.data;
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        const message =
          err.response?.data?.message ||
          'Something went wrong. Please try again.';

        setError(message);

        throw new Error(message);
      } finally {
        setLoading(false);
        controllerRef.current = null;
      }
    },
    [],
  );

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    callApi,
    cancel,
  };
}

export default useApiReader;
