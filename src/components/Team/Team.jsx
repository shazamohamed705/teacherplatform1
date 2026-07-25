import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Team.module.css';

const membersMeta = [
  {
    id: 1,
    name: 'Ahmed Elgazar',
    role: 'Chief Executive Officer',
    img: '/WhatsApp Image 2026-07-25 at 8.11.08 PM.jpeg',
    color: '#f26522',
  },
  {
    id: 2,
    name: 'Omar Nour',
    role: 'CPRO',
    img: '/WhatsApp Image 2026-07-25 at 8.11.16 PM.jpeg',
    color: '#f26522',
  },
  {
    id: 3,
    name: 'Atef Khalil',
    role: 'CCO (Chief Creative Officer)',
    img: '/WhatsApp Image 2026-07-25 at 8.06.40 PM.jpeg',
    color: '#a78bfa',
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function MemberCard({ meta, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ '--c': meta.color, transitionDelay: `${index * 0.15}s` }}
    >
      <div className={styles.ring} />

      <div className={styles.photoWrap}>
        <img src={meta.img} alt={meta.name} className={styles.photo} />
        <div className={styles.photoShine} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{meta.name}</h3>
        <p className={styles.role}>{meta.role}</p>
      </div>

      <div className={styles.line} />
    </div>
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const { t } = useTranslation();

  const members = t('team.members', { returnObjects: true });

  return (
    <section id="team" className={styles.section} ref={sectionRef}>

      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.gridBg} />
      <div className={styles.bgWord}>TEAM</div>

      <div className={`${styles.header} ${inView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>{t('team.eyebrow')}</span>
        <h2 className={styles.title}>
          {t('team.title1')}<span className={styles.orange}>{t('team.titleSpk')}</span>
        </h2>
        <p className={styles.subtitle}>{t('team.subtitle')}</p>
      </div>

      <div className={styles.cards}>
        {membersMeta.map((meta, i) => (
          <MemberCard key={meta.id} meta={meta} index={i} />
        ))}
      </div>

    </section>
  );
}
