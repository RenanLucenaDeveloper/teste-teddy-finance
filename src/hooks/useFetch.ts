import { useEffect, useState, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface RefetchOptions extends RequestInit {
  url?: string;
}

export function useFetch<T = unknown>(initialUrl: string, initialOptions?: RequestInit) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState<RequestInit | undefined>(initialOptions);
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(
    async (fetchUrl: string, fetchOptions?: RequestInit) => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        setState({ data: null, loading: true, error: null });

        const response = await fetch(fetchUrl, { ...fetchOptions, signal });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = (await response.json()) as T;
        setState({ data, loading: false, error: null });
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message });
      }

      return () => controller.abort();
    },
    []
  );

  useEffect(() => {
    fetchData(url, options);
  }, [url, options, fetchData]);

  const refetch = useCallback((refetchOptions?: RefetchOptions) => {
    if (refetchOptions?.url) {
      setUrl(refetchOptions.url);
    }
    if (refetchOptions) {
      setOptions(refetchOptions);
    }
  }, []);

  return { ...state, refetch };
}