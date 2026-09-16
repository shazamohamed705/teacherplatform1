import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_DONE_EVENT, naturalTop } from '../../lib/navigation';
import { prefersLiteMotion } from '../../lib/motion';
import styles from './PageTransition.module.css';

// Section number + label shown on the curtain
const LABELS = {
  hero:      ['00', 'nav.home'],
  story:     ['01', 'nav.ourStory'],
  spark:     ['02', 'insight.eyebrow'],
  about:     ['03', 'nav.theGap'],
  why:       ['04', 'nav.whyUs'],
  process:   ['05', 'nav.process'],
  portfolio: ['06', 'nav.work'],
  doctors:   ['07', 'nav.doctors'],
  team:      ['08', 'nav.team'],
};

// Each click uses the next curtain style in turn
const VARIANTS = ['rise', 'iris', 'side', 'split', 'skew'];

const COVERED_AT = 760; // ms — both panels fully cover the screen
const DONE_AT = 1750;   // ms — curtain has left

// Intercepts every in-page anchor click (#section) and turns the jump into
// a curtain transition: orange and purple panels cover the screen, the page
// jumps underneath, then the panels clear away.
export default function PageTransition() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const busy = useRef(false);
  const turn = useRef(-1);

  useEffect(() => {
    const timers = [];

    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      if (busy.current) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: naturalTop(target) });
        window.dispatchEvent(new Event(NAV_DONE_EVENT));
        return;
      }

      const lite = prefersLiteMotion();
      busy.current = true;
      turn.current = (turn.current + 1) % VARIANTS.length;
      setActive({
        id,
        key: Date.now(),
        variant: lite ? 'rise' : VARIANTS[turn.current],
        lite,
        // Keyboard "clicks" report 0,0 — open from the centre instead
        cx: e.clientX || window.innerWidth / 2,
        cy: e.clientY || window.innerHeight / 2,
      });

      timers.push(setTimeout(() => {
        window.scrollTo({ top: naturalTop(target), behavior: 'instant' });
      }, lite ? 380 : COVERED_AT));

      timers.push(setTimeout(() => {
        setActive(null);
        busy.current = false;
        window.dispatchEvent(new Event(NAV_DONE_EVENT));
      }, lite ? 900 : DONE_AT));
    };

    // Capture phase, so it runs before any link's own handlers
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!active) return null;
  const [num, labelKey] = LABELS[active.id] ?? ['', 'nav.home'];

  return (
    <div
      key={active.key}
      className={`${styles.wrap} ${styles[active.variant]}${active.lite ? ` ${styles.lite}` : ''}`}
      style={{ '--cx': `${active.cx}px`, '--cy': `${active.cy}px` }}
      aria-hidden="true"
    >
      <div className={`${styles.panel} ${styles.orange}`} />
      <div className={`${styles.panel} ${styles.purple}`} />
      <div className={styles.label}>
        <img src="/Asset 25@4x.png" alt="" className={styles.mark} />
        <span className={styles.num}>{num}</span>
        <span className={styles.name}>
          <span>{t(labelKey)}</span>
        </span>
        <span className={styles.line} />
      </div>
    </div>
  );
}
