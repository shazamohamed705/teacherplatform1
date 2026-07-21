import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './Doctors.module.css';

const doctors = [
  {
    id: '  Mohamed mokhtar',
    name: 'Dr. Mokhtar',
    specialty: 'Medical Content Creator',
    items: [
      { id: 1,  type: 'image', src: '/2.1.png',          title: 'Campaign 01', size: 'large' },
      { id: 2,  type: 'video', src: '/2B.MOV',           title: 'Reel 01',     size: 'small' },
      { id: 3,  type: 'image', src: '/2.2.png',          title: 'Campaign 02', size: 'small' },
      { id: 5,  type: 'image', src: '/2.3.png',          title: 'Campaign 03', size: 'large' },
      { id: 7,  type: 'image', src: '/2.4.png',          title: 'Campaign 04', size: 'large' },
      { id: 9,  type: 'image', src: '/2.5 OPTION 2.png', title: 'Campaign 05', size: 'small' },
      { id: 10, type: 'video', src: '/8 - Take 1.MOV',   title: 'Reel 02',     size: 'small' },
      { id: 11, type: 'image', src: '/2.6.png',          title: 'Campaign 06', size: 'large' },
    ],
  },
  {
    id: 'afaf',
    name: 'Dr. Afaf Emara',
    specialty: 'ENT Specialist',
    items: [
      { id: 1, type: 'image', src: '/زراعة-القوقعة.jpg',        title: 'Cochlear Implant',     size: 'large' },
      { id: 2, type: 'image', src: '/تخلص-من-الدوخة.jpg',       title: 'Vertigo Treatment',    size: 'small' },
      { id: 3, type: 'image', src: '/تحفيزي.jpg',               title: 'Motivational',         size: 'small' },
      { id: 4, type: 'image', src: '/إلتهاب-الأذن-للرضع.jpg',   title: 'Infant Ear Infection', size: 'small' },
      { id: 5, type: 'image', src: '/إلتهاب-الأذن.jpg',         title: 'Ear Infection',        size: 'large' },
      { id: 6, type: 'image', src: '/إستعادة-السمع.jpg',        title: 'Hearing Restoration',  size: 'small' },
      { id: 7, type: 'image', src: '/احجز-الأن-CTA.jpg',        title: 'Book Now CTA',         size: 'small' },
      { id: 8, type: 'image', src: '/Screening.jpg',             title: 'Screening Campaign',   size: 'large' },
    ],
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function VideoItem({ item, isLarge }) {
  const vidRef  = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);

  const toggle = (e) => {
    e.stopPropagation();
    const v = vidRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play();  setPlaying(true);  }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = vidRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className={`${styles.card} ${isLarge ? styles.cardLarge : ''}`}
      onClick={toggle}
    >
      {item.src && (
        <video
          ref={vidRef}
          src={item.src}
          className={styles.thumb}
          muted={muted}
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* play/pause overlay */}
      <div className={`${styles.cardOverlay} ${playing ? styles.overlayPlaying : ''}`}>
        <div className={styles.overlayIcon}>
          {playing ? <FaPause /> : <FaPlay />}
        </div>
      </div>

      {/* bottom bar */}
      <div className={styles.cardInfo}>
        <span className={styles.cardTag}>🎬 Reel</span>
        <div className={styles.cardInfoRow}>
          <span className={styles.cardTitle}>{item.title}</span>
          <button className={styles.muteBtn} onClick={toggleMute}>
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef);
  const [activeDoc, setActiveDoc] = useState(0);
  const [lightbox,  setLightbox]  = useState(null); // { type, src }

  const doctor = doctors[activeDoc];

  return (
    <section id="doctors" className={styles.section} ref={sectionRef}>

      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      {/* Header */}
      <div className={`${styles.header} ${inView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>Our Doctors</span>
        <h2 className={styles.title}>
          Real Doctors. <span className={styles.titleOrange}>Real Results.</span>
        </h2>
        <p className={styles.subtitle}>Campaigns, reels and content we created for our doctors.</p>
      </div>

      {/* Doctor Tabs */}
      <div className={`${styles.tabs} ${inView ? styles.visible : ''}`}>
        {doctors.map((doc, i) => (
          <button
            key={doc.id}
            className={`${styles.tab} ${i === activeDoc ? styles.tabActive : ''}`}
            onClick={() => setActiveDoc(i)}
          >
            {doc.name}
            <span className={styles.tabSpec}>{doc.specialty}</span>
          </button>
        ))}
        <button className={`${styles.tab} ${styles.tabSoon}`} disabled>
          More Doctors
          <span className={styles.tabSpec}>Coming Soon</span>
        </button>
      </div>

      {/* Grid */}
      <div className={`${styles.grid} ${inView ? styles.visible : ''}`}>
        {doctor.items.map((item, i) => {
          if (item.type === 'video') {
            return (
              <VideoItem
                key={item.id}
                item={item}
                isLarge={item.size === 'large'}
              />
            );
          }
          return (
            <div
              key={item.id}
              className={`${styles.card} ${item.size === 'large' ? styles.cardLarge : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.title} loading="lazy" className={styles.thumb} />
              <div className={styles.cardOverlay}>
                <div className={styles.overlayIcon}><FaExpand /></div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardTag}>📸 Campaign</span>
                <span className={styles.cardTitle}>{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for images only */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} className={styles.lightboxImg} />
          </div>
        </div>
      )}

    </section>
  );
}
