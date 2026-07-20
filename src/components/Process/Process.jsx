import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCompass, FaBullseye, FaMagic } from 'react-icons/fa';
import styles from './Process.module.css';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return { inView, key };
}

function StepItem({ step, index, isLast }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const Icon = step.icon;
  const isEven = index % 2 === 1;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.stepRow} ${isEven ? styles.stepRowReverse : ''} ${inView ? styles.visible : ''}`}
    >
      <div className={styles.stepSpine}>
        <div className={`${styles.stepCircle} ${inView ? styles.circleVisible : ''}`}>
          <Icon className={styles.stepCircleIcon} />
        </div>
        {!isLast && (
          <div key={`line-${animKey}`} className={`${styles.stepLine} ${inView ? styles.grow : ''}`} />
        )}
      </div>

      <div key={`card-${animKey}`} className={`${styles.stepCard} ${inView ? styles.cardVisible : ''}`}>
        <span className={styles.stepNum}>{step.number}</span>
        <div className={styles.stepContent}>
          <span className={styles.stepSubtitle}>{step.subtitle}</span>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDesc}>{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const { inView: headerInView } = useInView(headerRef);

  const steps = [
    { icon: FaSearch,   number: '01', subtitle: t('process.s1Sub'), title: t('process.s1Title'), desc: t('process.s1Desc') },
    { icon: FaCompass,  number: '02', subtitle: t('process.s2Sub'), title: t('process.s2Title'), desc: t('process.s2Desc') },
    { icon: FaBullseye, number: '03', subtitle: t('process.s3Sub'), title: t('process.s3Title'), desc: t('process.s3Desc') },
    { icon: FaMagic,    number: '04', subtitle: t('process.s4Sub'), title: t('process.s4Title'), desc: t('process.s4Desc') },
  ];

  return (
    <section id="process" className={styles.section} ref={sectionRef}>

      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />
      <div className={styles.bgGrid} />

      <div ref={headerRef} className={`${styles.header} ${headerInView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>{t('process.eyebrow')}</span>
        <h2 className={styles.title}>
          {t('process.title1')}<span className={styles.titleOrange}>{t('process.titleQ')}</span>
        </h2>
        <p className={styles.question}>{t('process.question')}</p>
      </div>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <StepItem key={i} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>

    </section>
  );
}
