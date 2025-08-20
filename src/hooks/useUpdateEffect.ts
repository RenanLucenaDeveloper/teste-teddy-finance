import { useEffect, useRef } from "react";

// This custom hook is used to create a 
// useEffect that ignores the first render
export function useUpdateEffect(effect: React.EffectCallback, deps: React.DependencyList) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    return effect();
  }, deps);
}