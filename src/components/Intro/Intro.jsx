import { useEffect, useRef, useState } from 'react';
import { prefersLiteMotion } from '../../lib/motion';
import styles from './Intro.module.css';

export default function Intro({ onReady }) {
  const [gone, setGone] = useState(false);
  const readyRef = useRef(onReady);

  useEffect(() => {
    try {
      sessionStorage.setItem('wahaj-intro', '1');
    } catch {
      /* storage unavailable — intro simply plays again next time */
    }
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const lite = prefersLiteMotion();

    const lift = setTimeout(() => {
      root.style.overflow = '';
      readyRef.current();
    }, lite ? 720 : 1250);
    const unmount = setTimeout(() => setGone(true), lite ? 1400 : 2400);

    return () => {
      clearTimeout(lift);
      clearTimeout(unmount);
      root.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.inner}>
        <img src="/Asset 25@4x.png" alt="" className={styles.mark} />
        <p className={styles.word} dir="ltr">
          {'WAHAJ'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i }}>{c}</span>
          ))}
        </p>
        <span className={styles.line} />
        <p className={styles.sub} dir="ltr">Media Production</p>
      </div>
    </div>
  );
}
