import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTimes } from 'react-icons/fa';
import styles from './Team.module.css';

const membersMeta = [
  {
    id: 1,
    name: 'Ahmed Elgazar',
    short: 'CEO',
    role: 'Chief Executive Officer',
    img: '/WhatsApp Image 2026-07-25 at 8.11.08 PM.jpeg',
    color: '#f26522',
    facebook: 'https://www.facebook.com/share/1D41ZCrT7p/',
  },
  {
    id: 2,
    name: 'Omar Nour',
    short: 'CPRO',
    role: 'Chief Public Relations Officer',
    img: '/WhatsApp Image 2026-07-25 at 8.11.16 PM.jpeg',
    color: '#f26522',
    facebook: 'https://www.facebook.com/share/1cAJbCMcCu/',
  },
  {
    id: 3,
    name: 'Atef Khalil',
    short: 'CCO',
    role: 'Chief Creative Officer',
    img: '/WhatsApp Image 2026-07-25 at 8.06.40 PM.jpeg',
    color: '#a78bfa',
    facebook: 'https://www.facebook.com/share/18L5w6Eof4/',
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

function MemberCard({ meta, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ '--c': meta.color, transitionDelay: `${index * 0.15}s` }}
    >
      <div className={styles.ring} />

      {/* clickable photo */}
      <div className={styles.photoWrap} onClick={() => onOpen(meta)}>
        <img src={meta.img} alt={meta.name} className={styles.photo} />
        <div className={styles.photoShine} />
        <div className={styles.photoHover}>
          <FaFacebook className={styles.photoHoverIcon} />
        </div>
      </div>

      {/* name + role */}
      <div className={styles.info}>
        <h3 className={styles.name}>{meta.name}</h3>
        <div className={styles.roleRow}>
          <span className={styles.short}>{meta.short}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.role}>{meta.role}</span>
        </div>
      </div>

      <div className={styles.line} />
    </div>
  );
}

function MemberPopup({ meta, onClose }) {
  // close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.popup}
        style={{ '--c': meta.color }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.popupClose} onClick={onClose}><FaTimes /></button>

        <div className={styles.popupPhoto}>
          <img src={meta.img} alt={meta.name} />
        </div>

        <div className={styles.popupInfo}>
          <h3 className={styles.popupName}>{meta.name}</h3>
          <div className={styles.popupRoleRow}>
            <span className={styles.popupShort}>{meta.short}</span>
            <span className={styles.popupDivider}>|</span>
            <span className={styles.popupRole}>{meta.role}</span>
          </div>
          <a
            href={meta.facebook}
            target="_blank"
            rel="noreferrer"
            className={styles.fbBtn}
          >
            <FaFacebook /> Facebook Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const { t } = useTranslation();
  const [activePopup, setActivePopup] = useState(null);

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
          <MemberCard key={meta.id} meta={meta} index={i} onOpen={setActivePopup} />
        ))}
      </div>

      {activePopup && (
        <MemberPopup meta={activePopup} onClose={() => setActivePopup(null)} />
      )}

    </section>
  );
}
