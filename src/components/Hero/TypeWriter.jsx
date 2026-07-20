import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TypeWriter.module.css';

export default function TypeWriter() {
  const { t, i18n } = useTranslation();
  const words = t('typewriter', { returnObjects: true });

  const [index,    setIndex]    = useState(0);
  const [displayed,setDisplayed]= useState('');
  const [phase,    setPhase]    = useState('idle');
  const [started,  setStarted]  = useState(false);
  const wrapperRef = useRef(null);

  // reset on language change
  useEffect(() => {
    setIndex(0);
    setDisplayed('');
    setPhase(started ? 'typing' : 'idle');
  }, [i18n.language]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setPhase('typing');
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (phase === 'idle') return;
    const current = words[index] || '';

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() =>
          setDisplayed(current.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), 300);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() =>
          setDisplayed(displayed.slice(0, -1)), 45);
        return () => clearTimeout(t);
      } else {
        setIndex(i => (i + 1) % words.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, started, words]);

  return (
    <span className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.text}>{displayed}</span>
      <span className={styles.cursor} />
    </span>
  );
}
