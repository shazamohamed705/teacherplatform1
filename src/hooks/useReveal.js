import { useEffect } from 'react';

// One observer for the whole page: every [data-reveal] element gets a
// data-in attribute the first time it scrolls into view. An attribute is
// used (not a class) so React re-renders never wipe it.
//
// Two animation frames before flipping data-in so the hidden state paints
// first — otherwise first-screen items snap in with no motion.
export default function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let dead = false;
    const lite = document.documentElement.dataset.motion === 'lite';
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!dead) el.setAttribute('data-in', '');
            });
          });
        }
      },
      { threshold: 0, rootMargin: lite ? '0px 0px -12% 0px' : '0px 0px -10% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    };

    let raf = 0;
    const onMutate = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; scan(); });
    };

    scan();
    const mo = new MutationObserver(onMutate);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });

    return () => {
      dead = true;
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
}
