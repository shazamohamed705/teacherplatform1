import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaInstagram, FaTiktok, FaYoutube, FaExpand } from 'react-icons/fa';
import styles from './Portfolio.module.css';

const categories = ['All', 'Branding', 'Social Media', 'Video', 'Design'];

const works = [
  {
    id: 1,
    category: 'Branding',
    title: 'Medical Brand Identity',
    tag: 'Brand Identity',
    platform: 'instagram',
    image: '/6_02.png',
    size: 'large',
  },
  {
    id: 2,
    category: 'Design',
    title: 'Visual Content Design',
    tag: 'Content Design',
    platform: 'instagram',
    image: '/6_03 (1).png',
    size: 'small',
  },
  {
    id: 3,
    category: 'Social Media',
    title: 'Social Media Campaign',
    tag: 'Social Media',
    platform: 'instagram',
    image: '/6_03.png',
    size: 'small',
  },
  {
    id: 4,
    category: 'Video',
    title: 'Medical Video Production',
    tag: 'Video',
    platform: 'youtube',
    image: '/7B.png',
    size: 'small',
    hasPlay: true,
  },
  {
    id: 5,
    category: 'Branding',
    title: 'Doctor Personal Brand',
    tag: 'Branding',
    platform: 'instagram',
    image: '/8A.png',
    size: 'large',
  },
  {
    id: 6,
    category: 'Design',
    title: 'Creative Direction',
    tag: 'Creative Direction',
    platform: 'tiktok',
    image: '/8B.png',
    size: 'small',
  },
];

const platformIcons = {
  instagram: FaInstagram,
  youtube:   FaYoutube,
  tiktok:    FaTiktok,
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return { inView, key };
}

export default function Portfolio() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { inView, key } = useInView(sectionRef);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="portfolio" className={styles.section} ref={sectionRef}>

      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      {/* Header */}
      <div className={`${styles.header} ${inView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>{t('portfolio.eyebrow')}</span>
        <h2 className={styles.title}>
          {t('portfolio.title1')}<span className={styles.titleOrange}>{t('portfolio.titleSpk')}</span>
        </h2>
        <p className={styles.subtitle}>{t('portfolio.subtitle')}</p>
      </div>

      {/* Grid */}
      <div className={styles.grid} key={`grid-${key}`}>
        {works.map((work, i) => {
          const PlatformIcon = platformIcons[work.platform];
          return (
            <div
              key={work.id}
              className={`${styles.card} ${work.size === 'large' ? styles.cardLarge : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(work)}
            >
              {/* Image */}
              <div className={styles.cardImg}>
                <img src={work.image} alt={work.title} loading="lazy" />
                <div className={styles.cardOverlay}>
                  <div className={styles.overlayContent}>
                    {work.hasPlay && (
                      <div className={styles.playBtn}>
                        <FaPlay />
                      </div>
                    )}
                    <div className={styles.expandBtn}>
                      <FaExpand />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className={styles.cardInfo}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardTag}>{work.tag}</span>
                  <PlatformIcon className={styles.platformIcon} />
                </div>
                <h3 className={styles.cardTitle}>{work.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.image.replace('w=600', 'w=1200')} alt={lightbox.title} />
            <div className={styles.lightboxInfo}>
              <span className={styles.cardTag}>{lightbox.tag}</span>
              <h3>{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
