import { useEffect, useRef } from 'react';
import { onMotionChange } from '../lib/motion';

// Writes a scroll-derived CSS custom property onto the ref'd element on every
// animation frame while scrolling — no React re-renders involved.
function useScrollVar(name, compute) {
  const ref = useRef(null);
  const computeRef = useRef(compute);

  useEffect(() => {
    computeRef.current = compute;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let attached = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > window.innerHeight + 300) return;
      el.style.setProperty(name, computeRef.current(rect, window.innerHeight));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const enable = () => {
      if (attached) return;
      attached = true;
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    };
    const disable = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      raf = 0;
      el.style.removeProperty(name);
    };

    const unsub = onMotionChange((lite) => {
      if (lite) disable();
      else enable();
    });

    return () => {
      unsub();
      disable();
    };
  }, [name]);

  return ref;
}

// --py: offset in px, proportional to how far the element sits from viewport centre.
// Apply it to a child (not the measured element) to avoid feedback.
export function useParallax(factor = 0.12) {
  return useScrollVar('--py', (rect, vh) => {
    const fromCentre = rect.top + rect.height / 2 - vh / 2;
    return `${(-fromCentre * factor).toFixed(1)}px`;
  });
}

// --p: 0 → 1 as the element passes a line at 60% of the viewport.
export function useScrollProgress() {
  return useScrollVar('--p', (rect, vh) => {
    const p = (vh * 0.6 - rect.top) / rect.height;
    return Math.max(0, Math.min(1, p)).toFixed(4);
  });
}
