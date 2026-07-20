import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCamera, FaBullhorn, FaPencilAlt, FaPalette
} from 'react-icons/fa';
import styles from './Insight.module.css';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return { inView, key };
}

export default function Insight() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { inView, key } = useInView(sectionRef);

  const skills = [
    { icon: FaCamera,    label: t('insight.skill1'), color: '#a78bfa' },
    { icon: FaBullhorn,  label: t('insight.skill2'), color: '#f26522' },
    { icon: FaPencilAlt, label: t('insight.skill3'), color: '#f26522' },
    { icon: FaPalette,   label: t('insight.skill4'), color: '#a78bfa' },
  ];

  return (
    <section id="spark" className={styles.section} ref={sectionRef}>

      {/* bg decoration */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>

        {/* ---- LEFT ---- */}
        <div className={styles.left}>

          <div className={`${styles.eyebrowWrap} ${inView ? styles.visible : ''}`}>
            <span className={styles.eyebrow}>{t('insight.eyebrow')}</span>
          </div>

          <p className={`${styles.intro} ${inView ? styles.visible : ''}`}>
            <strong>{t('insight.intro1')}</strong>
            <br />
            {t('insight.intro2')}
          </p>

          {/* Skill Pills */}
          <div className={styles.skillsGrid}>
            {skills.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className={`${styles.skillPill} ${inView ? styles.visible : ''}`}
                  style={{
                    '--pill-color': s.color,
                    transitionDelay: `${0.3 + i * 0.1}s`,
                    animationDelay:  `${0.3 + i * 0.1}s`,
                  }}
                >
                  <Icon className={styles.pillIcon} />
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          <p className={`${styles.conclusion} ${inView ? styles.visible : ''}`}>
            {t('insight.conclusion')}
            <strong>{t('insight.medicine')}</strong>
          </p>
        </div>

        {/* ---- RIGHT ---- */}
        <div className={`${styles.right} ${inView ? styles.visible : ''}`}>

          {/* Big glowing text */}
          <div className={styles.bigText}>
            <span className={styles.bigLine1}>The Sparking</span>
            <span className={styles.bigLine2}>Insight</span>
            <span className={styles.bigLine3}>Glows</span>
          </div>

          {/* Bulb icon */}
          <div className={`${styles.bulbWrap} ${inView ? styles.glow : ''}`}>
            <div className={styles.bulbRing} />
            <div className={styles.bulbRing2} />
            <span className={styles.bulbEmoji}>💡</span>
          </div>

        </div>
      </div>

    </section>
  );
}
