import { useEffect } from 'react';
import { onMotionChange } from '../lib/motion';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// How each section arrives (`in`) and how it leaves while the next one
// slides over it (`out`). Every boundary gets a different pairing.
const EFFECTS = {
  hero:      { out: 'push' },
  story:     { in: 'arch',        out: 'recede' },
  spark:     { in: 'sunrise',     out: 'tiltBack' },
  about:     { in: 'diagonal',    out: 'push' },
  why:       { in: 'sheet',       out: 'recede' },
  process:   { in: 'doors',       out: 'tiltBack' },
  portfolio: { in: 'tilt',        out: 'push' },
  doctors:   { in: 'corner',      out: 'recede' },
  team:      { in: 'diagonalRev' },
};
const DEFAULT_EFFECT = { in: 'sheet', out: 'recede' };

// e: 1 → 0 while the section rises into place (its top at viewport bottom → top).
function arrive(kind, e, w, vh) {
  if (e <= 0) return {};
  const shown = 1 - e;
  switch (kind) {
    case 'arch': {
      const x = e * 0.22 * w;
      const r = e * (w / 2 - x);
      return { clip: `inset(0 ${x}px 0 ${x}px round ${r}px ${r}px 0 0)` };
    }
    case 'sunrise': {
      const r = shown * Math.hypot(w / 2, vh) * 1.05;
      return { clip: `circle(${r}px at 50% 0)` };
    }
    case 'corner': {
      const r = shown * Math.hypot(w, vh) * 1.02;
      return { clip: `circle(${r}px at 0 0)` };
    }
    case 'diagonal':
    case 'diagonalRev': {
      const d = vh * 0.35;
      const a = shown * (vh + d);
      const b = a - d;
      return {
        clip: kind === 'diagonal'
          ? `polygon(0 0, 100% 0, 100% ${b}px, 0 ${a}px)`
          : `polygon(0 0, 100% 0, 100% ${a}px, 0 ${b}px)`,
      };
    }
    case 'doors': {
      const x = (e * w) / 2;
      return { clip: `inset(0 ${x}px 0 ${x}px)` };
    }
    case 'tilt':
      return { transform: `perspective(1400px) rotateX(${(e * 14).toFixed(2)}deg)`, origin: '50% 0' };
    default: // sheet
      return {
        transform: `scale(${(1 - 0.05 * e).toFixed(4)})`,
        origin: '50% 0',
        radius: `${e * 56}px ${e * 56}px 0 0`,
      };
  }
}

// c: 0 → 1 as the next section covers this (stuck) one.
function recede(kind, c, h, vh) {
  if (c <= 0) return {};
  const origin = `50% ${Math.max(h / 2, h - vh / 2)}px`;
  switch (kind) {
    case 'push':
      return {
        transform: `translateY(${(-c * vh * 0.18).toFixed(1)}px) scale(${(1 - 0.03 * c).toFixed(4)})`,
        origin,
        dim: 0.6 * c,
      };
    case 'tiltBack':
      return {
        transform: `perspective(1200px) rotateX(${(c * 9).toFixed(2)}deg) scale(${(1 - 0.05 * c).toFixed(4)})`,
        origin,
        dim: 0.6 * c,
      };
    default: // recede
      return { transform: `scale(${(1 - 0.07 * c).toFixed(4)})`, origin, dim: 0.55 * c };
  }
}

function clearSection(el) {
  el.removeAttribute('data-stack');
  ['position', 'top', 'zIndex', 'transform', 'transformOrigin', 'clipPath', 'borderRadius'].forEach((p) => {
    el.style[p] = '';
  });
  el.style.removeProperty('--dim');
}

function bindStack(root) {
  const items = [...root.children];
  let vh = window.innerHeight;
  let heights = [];
  let widths = [];
  let tops = [];
  let sticky = [];
  let raf = 0;
  let layoutRaf = 0;
  const idle = new WeakSet();

  const update = () => {
    raf = 0;
    const y = window.scrollY;
    items.forEach((el, i) => {
      const fx = EFFECTS[el.id] || DEFAULT_EFFECT;
      const e = i === 0 ? 0 : clamp01((tops[i] - y) / vh);
      const c = sticky[i] && i < items.length - 1 ? clamp01(1 - (tops[i + 1] - y) / vh) : 0;

      if (e === 0 && c === 0) {
        if (idle.has(el)) return;
        idle.add(el);
        el.style.transform = '';
        el.style.transformOrigin = '';
        el.style.clipPath = '';
        el.style.borderRadius = '';
        el.style.setProperty('--dim', '0');
        return;
      }

      idle.delete(el);
      const a = fx.in ? arrive(fx.in, e, widths[i], vh) : {};
      const r = fx.out ? recede(fx.out, c, heights[i], vh) : {};

      el.style.transform = [a.transform, r.transform].filter(Boolean).join(' ');
      el.style.transformOrigin = r.origin || a.origin || '';
      el.style.clipPath = a.clip || '';
      el.style.borderRadius = a.radius || '';
      el.style.setProperty('--dim', (r.dim || 0).toFixed(3));
    });
  };

  const layout = () => {
    layoutRaf = 0;
    vh = window.innerHeight;
    heights = items.map((el) => el.offsetHeight);
    widths = items.map((el) => el.offsetWidth);
    sticky = heights.map((h) => h >= vh * 0.5);
    let acc = root.getBoundingClientRect().top + window.scrollY;
    tops = heights.map((h) => {
      const top = acc;
      acc += h;
      return top;
    });

    items.forEach((el, i) => {
      idle.delete(el);
      el.setAttribute('data-stack', '');
      el.style.zIndex = String(i + 1);
      el.style.position = sticky[i] ? 'sticky' : 'relative';
      el.style.top = sticky[i] ? `${Math.min(0, vh - heights[i])}px` : '';
    });
    update();
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const onResize = () => {
    if (!layoutRaf) layoutRaf = requestAnimationFrame(layout);
  };

  const ro = new ResizeObserver(onResize);
  items.forEach((el) => ro.observe(el));

  layout();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  return () => {
    ro.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(raf);
    cancelAnimationFrame(layoutRaf);
    items.forEach(clearSection);
  };
}

// Turns the children of <main> into a stack of "pages" on desktop. Phones skip
// this entirely — clip-path + sticky + per-frame writes hitch hard on mobile.
export default function useStackedSections() {
  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return;

    let stop = () => {};
    const unsub = onMotionChange((lite) => {
      stop();
      stop = lite ? () => {} : bindStack(root);
    });

    return () => {
      unsub();
      stop();
    };
  }, []);
}
