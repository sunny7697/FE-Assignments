import { useEffect, useRef } from 'react';

const useClickOutside = (callback: Function) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', click);

    return () => {
      document.removeEventListener('click', click);
    };
  }, []);

  return ref;
};

export default useClickOutside;
