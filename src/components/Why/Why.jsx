import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaHandshake, FaRocket } from 'react-icons/fa';
import styles from './Why.module.css';

function useInView(ref, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return { inView, key };
}

function ReasonItem({ reason, index }) {
  const ref = useRef(null);
  const { inView } = useInView(ref, 0.4);
  const Icon = reason.icon;

  return (
    <div
      ref={ref}
      className={`${styles.reason} ${inView ? styles.visible : ''}`}
      style={{ '--reason-color': reason.color, transitionDelay: `${index * 0.1}s` }}
    >
      {/* Left glow bar */}
      <div className={styles.reasonBar} />

      {/* Icon */}
      <div className={styles.reasonIcon}>
        <Icon />
      </div>

      {/* Text */}
      <p className={styles.reasonText}>{reason.text}</p>

      {/* Hover shimmer */}
      <div className={styles.reasonShimmer} />
    </div>
  );
}

export default function Why() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const { inView: headInView } = useInView(headRef, 0.3);

  const reasons = [
    { icon: FaBullseye,  text: t('why.r1'), color: '#f26522' },
    { icon: FaHandshake, text: t('why.r2'), color: '#a78bfa' },
    { icon: FaRocket,    text: t('why.r3'), color: '#f26522' },
  ];

  return (
    <section id="why" className={styles.section} ref={sectionRef}>

      {/* bg */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />
      <div className={styles.bgNoise} />

      {/* big bg text */}
      <span className={styles.bgWord}>WHY?</span>

      <div className={styles.container}>

        {/* LEFT — heading */}
        <div
          ref={headRef}
          className={`${styles.left} ${headInView ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>{t('why.eyebrow')}</span>

          <h2 className={styles.title}>
            {t('why.title1')}<span className={styles.titleOrange}>{t('why.titleName')}</span>{t('why.title2')}
          </h2>

          <p className={styles.subtitle}>
            {t('why.subtitle1')}<strong>{t('why.subtitleB')}</strong>{t('why.subtitle2')}
          </p>

          {/* animated arrow */}
          <div className={styles.arrowWrap}>
            <div className={styles.arrowLine} />
            <div className={styles.arrowHead} />
          </div>
        </div>

        {/* RIGHT — reasons */}
        <div className={styles.right}>
          {reasons.map((r, i) => (
            <ReasonItem key={i} reason={r} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
