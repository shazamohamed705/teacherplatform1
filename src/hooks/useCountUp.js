import { useEffect, useState } from 'react';

export default function useCountUp(target, run, duration = 2000, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf;
    let start;
    const step = (ts) => {
      start ??= ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(step); }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, run, duration, delay]);

  return value;
}
