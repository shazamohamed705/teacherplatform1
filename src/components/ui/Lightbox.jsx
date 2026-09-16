import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PiXLight } from 'react-icons/pi';
import Arrow from './Arrow';
import styles from './Lightbox.module.css';

export default function Lightbox({ onClose, onPrev, onNext, counter, label, children }) {
  const [closing, setClosing] = useState(false);
  const handlers = useRef({ onClose, onPrev, onNext });

  useEffect(() => {
    handlers.current = { onClose, onPrev, onNext };
  });

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => handlers.current.onClose(), 260);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') handlers.current.onPrev?.();
      if (e.key === 'ArrowRight') handlers.current.onNext?.();
    };
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [close]);

  return createPortal(
    <div
      className={`${styles.backdrop} ${closing ? styles.closing : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        className={styles.close}
        onClick={(e) => { e.stopPropagation(); close(); }}
        aria-label="Close"
      >
        <PiXLight />
      </button>

      {onPrev && (
        <button
          type="button"
          className={`${styles.nav} ${styles.prev}`}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <Arrow dir="left" size={22} />
        </button>
      )}

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

      {onNext && (
        <button
          type="button"
          className={`${styles.nav} ${styles.next}`}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <Arrow dir="right" size={22} />
        </button>
      )}

      {counter && <p className={styles.counter}>{counter}</p>}
    </div>,
    document.body
  );
}
