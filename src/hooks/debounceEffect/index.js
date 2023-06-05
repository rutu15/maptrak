import { useCallback, useEffect, useRef } from "react";

export const useDebouncedEffect = (effect, delay, deps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Prevent first render of useEfect
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
