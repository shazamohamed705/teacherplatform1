import { useEffect, useState } from 'react';

const LITE_QUERY = '(prefers-reduced-motion: reduce), (max-width: 1024px)';

export const liteMotionQuery = () =>
  typeof window !== 'undefined' && window.matchMedia(LITE_QUERY);

export const prefersLiteMotion = () => Boolean(liteMotionQuery()?.matches);

export function syncMotionMode() {
  const lite = prefersLiteMotion();
  document.documentElement.dataset.motion = lite ? 'lite' : 'full';
  return lite;
}

export function onMotionChange(fn) {
  const mq = liteMotionQuery();
  if (!mq) return () => {};

  const notify = () => fn(syncMotionMode());
  notify();
  mq.addEventListener('change', notify);
  return () => mq.removeEventListener('change', notify);
}

export function useLiteMotion() {
  const [lite, setLite] = useState(prefersLiteMotion);
  useEffect(() => onMotionChange(setLite), []);
  return lite;
}
