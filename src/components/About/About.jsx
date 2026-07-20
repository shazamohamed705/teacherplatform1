import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStethoscope, FaVideo, FaLightbulb } from 'react-icons/fa';
import styles from './About.module.css';

function useTitleTypewriter(line1, line2, inView, key) {
  const [phase, setPhase] = useState(0); // 0=idle,1=line1,2=line2
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');

  useEffect(() => {
    if (!inView) { setPhase(0); setT1(''); setT2(''); return; }
    setPhase(1);
  }, [inView, key]);

  // Line 1
  useEffect(() => {
    if (phase !== 1) return;
    if (t1.length < line1.length) {
      const t = setTimeout(() => setT1(line1.slice(0, t1.length + 1)), 55);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase(2), 120);
      return () => clearTimeout(t);
    }
  }, [phase, t1, line1]);

  // Line 2
  useEffect(() => {
    if (phase !== 2) return;
    if (t2.length < line2.length) {
      const t = setTimeout(() => setT2(line2.slice(0, t2.length + 1)), 65);
      return () => clearTimeout(t);
    }
  }, [phase, t2, line2]);

  return { t1, t2, typing: phase === 1 || (phase === 2 && t2.length < line2.length) };
}

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

export default function About() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const { inView, key } = useInView(sectionRef);
  const [beam, setBeam] = useState(false);

  const line1 = t('about.title1');
  const line2 = t('about.title2');

  const { t1, t2, typing } = useTitleTypewriter(line1, line2, inView, `${key}-${i18n.language}`);

  const pillars = [
    {
      icon: FaStethoscope,
      title: t('about.p1Title'),
      desc: t('about.p1Desc'),
    },
    {
      icon: FaVideo,
      title: t('about.p2Title'),
      desc: t('about.p2Desc'),
    },
    {
      icon: FaLightbulb,
      title: t('about.p3Title'),
      desc: t('about.p3Desc'),
    },
  ];

  useEffect(() => {
    if (inView) {
      setBeam(false);
      const t = setTimeout(() => setBeam(true), 50);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      id="story"
      className={`${styles.section} ${beam ? styles.beamActive : ''}`}
      ref={sectionRef}
    >

      <div className={styles.bgBlob} />

      {/* Label */}
      <div className={`${styles.eyebrowWrap} ${inView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>{t('about.eyebrow')}</span>
      </div>

      {/* Main Text */}
      <div className={`${styles.textBlock} ${inView ? styles.visible : ''}`}>
        <h2 className={styles.title}>
          {t1}
          {typing && t2.length === 0 && <span className={styles.caret}>|</span>}
          <span className={styles.titleOrange}>
            {t2}
            {typing && t2.length > 0 && t2.length < line2.length && (
              <span className={styles.caret}>|</span>
            )}
          </span>
        </h2>
        <p className={styles.body}>
          {t('about.body1')}
        </p>
        <p className={styles.body}>
          {t('about.body2')}
        </p>
      </div>

      {/* Pillars */}
      <div className={styles.pillars}>
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className={`${styles.pillar} ${inView ? styles.visible : ''}`}
              style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className={styles.pillarIcon}>
                <Icon />
              </div>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
