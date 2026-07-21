import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTiktok, FaYoutube, FaExpand } from 'react-icons/fa';
import styles from './Portfolio.module.css';

const allImages = [
  { image: '/1B.png',          title: 'Brand Campaign',        tag: 'Branding',          platform: 'instagram' },
  { image: '/2B.png',          title: 'Medical Content',       tag: 'Content Design',    platform: 'instagram' },
  { image: '/3B.png',          title: 'Social Media Post',     tag: 'Social Media',      platform: 'instagram' },
  { image: '/4A.png',          title: 'Video Production',      tag: 'Video',             platform: 'youtube'   },
  { image: '/4B.png',          title: 'Doctor Brand',          tag: 'Branding',          platform: 'instagram' },
  { image: '/5.png',           title: 'Creative Visual',       tag: 'Creative Direction',platform: 'tiktok'    },
  { image: '/6_01.png',        title: 'Medical Series',        tag: 'Content Design',    platform: 'instagram' },
  { image: '/6_02.png',        title: 'Brand Identity',        tag: 'Brand Identity',    platform: 'instagram' },
  { image: '/6_03 (1).png',    title: 'Visual Design',         tag: 'Design',            platform: 'instagram' },
  { image: '/6_03.png',        title: 'Social Campaign',       tag: 'Social Media',      platform: 'instagram' },
  { image: '/6_04.png',        title: 'Medical Awareness',     tag: 'Content Design',    platform: 'youtube'   },
  { image: '/6_05.png',        title: 'Clinic Branding',       tag: 'Branding',          platform: 'instagram' },
  { image: '/6_06 (1).png',    title: 'Health Campaign',       tag: 'Social Media',      platform: 'tiktok'    },
  { image: '/6_06.png',        title: 'Digital Marketing',     tag: 'Marketing',         platform: 'instagram' },
  { image: '/7A_01.png',       title: 'Doctor Content',        tag: 'Video',             platform: 'youtube'   },
  { image: '/7A_03.png',       title: 'Medical Reels',         tag: 'Video',             platform: 'tiktok'    },
  { image: '/7A_05.png',       title: 'Health Education',      tag: 'Content Design',    platform: 'youtube'   },
  { image: '/7B.png',          title: 'Video Series',          tag: 'Video Production',  platform: 'youtube'   },
  { image: '/8A.png',          title: 'Personal Brand',        tag: 'Branding',          platform: 'instagram' },
  { image: '/8B.png',          title: 'Creative Direction',    tag: 'Creative Direction',platform: 'tiktok'    },
  { image: '/9A.png',          title: 'Medical Podcast',       tag: 'Content Design',    platform: 'youtube'   },
  { image: '/9B.png',          title: 'Awareness Campaign',    tag: 'Social Media',      platform: 'instagram' },
  { image: '/Carousel-2A_07.png',  title: 'Carousel Design',       tag: 'Design',            platform: 'instagram' },
  { image: '/Carousel-2A_06.png',  title: 'Carousel Series',       tag: 'Design',            platform: 'instagram' },
  { image: '/Carousel-2A_04.png',  title: 'Medical Carousel',      tag: 'Content Design',    platform: 'instagram' },
  { image: '/Carousel-2A_01.png',  title: 'Brand Carousel',        tag: 'Branding',          platform: 'instagram' },
  { image: '/Carousel-2A_03.png',  title: 'Creative Carousel',     tag: 'Creative Direction',platform: 'instagram' },

];

// Split into sets of 6
const sizes = ['large','small','small','small','large','small'];
const sets = [];
for (let i = 0; i < allImages.length; i += 6) {
  const chunk = allImages.slice(i, i + 6);
  // pad if last chunk is incomplete — use a fixed offset so the index doesn't drift
  let padIdx = 0;
  while (chunk.length < 6) chunk.push(allImages[padIdx++]);
  sets.push(chunk.map((img, j) => ({ ...img, id: i + j + 1, size: sizes[j] })));
}

const platformIcons = { instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok };

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
  const [activeSet, setActiveSet] = useState(0);
  const [fading, setFading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const works = sets[activeSet];

  // auto cycle every 4s
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveSet(i => (i + 1) % sets.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, [inView, sets.length]);

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
      <div className={`${styles.grid} ${fading ? styles.fadeOut : styles.fadeIn}`} key={`grid-${key}`}>
        {works.map((work, i) => {
          const PlatformIcon = platformIcons[work.platform];
          return (
            <div
              key={work.id}
              className={`${styles.card} ${work.size === 'large' ? styles.cardLarge : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setLightbox(work)}
            >
              <div className={styles.cardImg}>
                {work.image && <img src={work.image} alt={work.title} loading="lazy" />}
                <div className={styles.cardOverlay}>
                  <div className={styles.overlayContent}>
                    <div className={styles.expandBtn}><FaExpand /></div>
                  </div>
                </div>
              </div>
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

      {/* Dots */}
      <div className={`${styles.dots} ${inView ? styles.visible : ''}`}>
        {sets.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeSet ? styles.dotActive : ''}`}
            onClick={() => setActiveSet(i)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.image} alt={lightbox.title} />
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
