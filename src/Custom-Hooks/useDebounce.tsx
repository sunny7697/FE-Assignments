import { useEffect, useState } from 'react';

const useDebounce = (query: string, delay: number = 1000) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, delay]);

  return debouncedQuery.toLowerCase();
};

export default useDebounce;
