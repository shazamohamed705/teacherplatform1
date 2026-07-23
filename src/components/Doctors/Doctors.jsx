import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './Doctors.module.css';

const doctors = [
  {
    id: 'hany',
    name: 'Dr. mohamed hanafy',
    specialty: 'Medical Content Creator',
    items: [
      { id: 1,  type: 'image', src: '/2.1.png',          title: 'Campaign 01', size: 'large' },
      { id: 3,  type: 'image', src: '/2.2.png',          title: 'Campaign 02', size: 'small' },
      { id: 4,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784724051/4B_dr_hanafy_%D8%B9%D9%86%D8%AF%D9%83_%D8%A7%D8%B3%D8%A8%D9%88%D8%B9%D9%8A%D9%86_u89dzj.mp4',                   title: 'Reel 02', size: 'small' },
      { id: 5,  type: 'image', src: '/2.3.png',          title: 'Campaign 03', size: 'large' },
      { id: 6,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784725654/2A_dr_hanafy_filler_%D8%A7%D8%B3%D8%B9%D8%A7%D8%B1_rfems6.mp4',                                                  title: 'Reel 03', size: 'small' },
      { id: 7,  type: 'image', src: '/2.4.png',          title: 'Campaign 04', size: 'large' },
      { id: 8,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784724258/6_1_%D8%B9%D9%8A%D8%AF%D9%83%D9%85_%D9%85%D8%A8%D8%A7%D8%B1%D9%83_%D8%AF_%D8%AD%D9%86%D9%81%D9%8A_o1jnvt.mp4', title: 'Reel 04', size: 'small' },
      { id: 9,  type: 'image', src: '/2.5 OPTION 2.png', title: 'Campaign 05', size: 'small' },
      { id: 10, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784743649/11B_red_flag_dr_hanafy_dnn5rh.mp4',                                                                                    title: 'Reel 05', size: 'small' },
      { id: 11, type: 'image', src: '/2.6.png',          title: 'Campaign 06', size: 'large' },
      { id: 12, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784729491/10B__%D8%AF%D9%83%D8%AA%D9%88%D8%B1_%D8%AD%D9%86%D9%81%D9%8A_90fake_jb55z8.mp4',                                     title: 'Reel 06', size: 'small' },
      { id: 13, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784726393/2B_filler_botox_edit_outro_qrvqx9.mp4',                                                                               title: 'Reel 07', size: 'small' },
      { id: 14, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784745926/5A_%D8%A7%D8%B9%D9%85%D9%84_%D9%81%D9%8A%D9%84%D8%B1_%D9%88%D9%84%D8%A7_%D8%A8%D9%88%D8%AA%D9%88%D9%83%D8%B3_dr_hanafy_fubbtn.mp4', title: 'Reel 08', size: 'small' },
    ],
  },
  {
    id: 'mokhtar',
    name: 'Dr. Mohamed Mokhtar',
    specialty: 'Medical Content Creator',
    items: [
      { id: 1, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746865/1_a78vj7.mp4', title: 'Reel 01', size: 'small' },
      { id: 2, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746866/2_miwq9q.mp4', title: 'Reel 02', size: 'small' },
      { id: 3, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746867/3_qutzss.mp4', title: 'Reel 03', size: 'large' },
      { id: 4, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746866/4_rqlhml.mp4', title: 'Reel 04', size: 'small' },
      { id: 5, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746867/5_utnxrn.mp4', title: 'Reel 05', size: 'small' },
      { id: 9, type: 'promo', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784747348/Promo/promo_came_M_2_nwvpok.mp4', title: 'Promo' },
      { id: 6, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746870/6_blubwo.mp4', title: 'Reel 06', size: 'large' },
      { id: 7, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746869/7_sjz6vx.mp4', title: 'Reel 07', size: 'small' },
      { id: 8, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784746869/8_fjvgqp.mp4', title: 'Reel 08', size: 'small' },
    ],
  },
  {
    id: 'mona',
    name: 'Dr.mona Kotait ',
    specialty: 'ENT Specialist',
    items: [
      { id: 1,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747971/Copy_of_%D8%B6%D8%B9%D9%81_%D8%A7%D9%84%D8%B3%D9%85%D8%B9_%D9%88%D8%A7%D9%84%D8%AE%D8%B7%D9%88%D8%B1%D8%A9_%D8%B9%D9%84%D9%89_%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9_h5m057.jpg', title: 'Campaign 01', size: 'large' },
      { id: 2,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748323/Copy_of_Assurance_azczy6.mov',      title: 'Reel 01', size: 'small' },
      { id: 3,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747971/Copy_of_%D8%B7%D9%86%D9%8A%D9%86_%D8%A7%D9%84%D8%A3%D8%B0%D9%86_buhx3l.jpg',                                       title: 'Campaign 02', size: 'small' },
      { id: 4,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748324/Copy_of_Engagement_m70yc1.mov',      title: 'Reel 02', size: 'small' },
      { id: 5,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747971/Copy_of_%D8%B6%D8%B9%D9%81_%D8%A7%D9%84%D8%B3%D9%85%D8%B9_%D9%88%D8%A7%D9%84%D8%AA%D8%AD%D8%B5%D9%8A%D9%84_%D8%A7%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D9%8A_rgfwow.jpg', title: 'Campaign 03', size: 'large' },
      { id: 6,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748324/Copy_of_Authority_z4ag2x.mov',       title: 'Reel 03', size: 'small' },
      { id: 7,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747970/Copy_of_%D8%AD%D8%A7%D9%84%D8%A7%D8%AA_%D8%A7%D9%84%D8%A7%D8%AA%D8%B2%D8%A7%D9%86_-_%D8%A7%D9%84%D8%AA%D8%A3%D8%AB%D9%8A%D8%B1_%D8%B9%D9%84%D9%89_%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9_%D8%A7%D9%84%D9%8A%D9%88%D9%85%D9%8A%D8%A9_mapgbq.jpg', title: 'Campaign 04', size: 'large' },
      { id: 8,  type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748325/Copy_of_Explanation_2_t9e6hj.mov',   title: 'Reel 04', size: 'small' },
      { id: 9,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747969/Copy_of_CTA_-_%D9%84%D9%8A%D9%87_%D8%AA%D8%AE%D8%AA%D8%A7%D8%B1%D9%86%D8%A7_jxcq2k.jpg',                          title: 'Campaign 05', size: 'small' },
      { id: 10, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748327/Copy_of_Explanation_1_j4fqk5.mov',   title: 'Reel 05', size: 'small' },
      { id: 11, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784747969/Copy_of_%D8%AA%D8%A3%D8%AB%D9%8A%D8%B1_%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9_jchkhe.jpg',                    title: 'Campaign 06', size: 'large' },
      { id: 12, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748329/Copy_of_Explanation_3_ztyg7n.mp4',   title: 'Reel 06', size: 'small' },
      { id: 13, type: 'video', src: 'https://res.cloudinary.com/ofmkb97h/video/upload/v1784748336/Copy_of_Symptom_2_dhfv8e.mp4',       title: 'Reel 07', size: 'small' },
    ],
  },
  {
    id: 'afaf',
    name: 'Dr. Afaf Emara',
    specialty: 'ENT Specialist',
    items: [
      { id: 1,  type: 'image', src: '/زراعة-القوقعة.jpg',        title: 'Cochlear Implant',     size: 'large'  },
      { id: 2,  type: 'image', src: '/تخلص-من-الدوخة.jpg',       title: 'Vertigo Treatment',    size: 'small'  },
      { id: 3,  type: 'image', src: '/تحفيزي.jpg',               title: 'Motivational',         size: 'small'  },
      { id: 4,  type: 'image', src: '/إلتهاب-الأذن-للرضع.jpg',   title: 'Infant Ear Infection', size: 'small'  },
      { id: 5,  type: 'image', src: '/إلتهاب-الأذن.jpg',         title: 'Ear Infection',        size: 'large'  },
      { id: 6,  type: 'image', src: '/إستعادة-السمع.jpg',        title: 'Hearing Restoration',  size: 'small'  },
      { id: 7,  type: 'image', src: '/احجز-الأن-CTA.jpg',        title: 'Book Now CTA',         size: 'small'  },
      { id: 8,  type: 'image', src: '/Screening.jpg',             title: 'Screening Campaign',   size: 'large'  },
      { id: 9,  type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750093/Profile_zs6tzp.jpg',                                                                                         title: 'Profile',          size: 'small'  },
      { id: 10, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750093/Storyfelling-1_1_ttl9g8.jpg',                                                                                title: 'Storytelling 01',  size: 'small'  },
      { id: 11, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750093/Storyfelling-2_1_iq6zep.jpg',                                                                                title: 'Storytelling 02',  size: 'large'  },
      { id: 12, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750093/%D8%A7%D9%84%D9%83%D8%B4%D9%81-%D8%A7%D9%84%D9%85%D8%A8%D9%83%D8%B1_fs7ers.jpg',                           title: 'Early Detection',  size: 'small'  },
      { id: 13, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750094/%D8%A3%D8%AE%D8%B7%D8%A7%D8%A1-%D8%B4%D8%A7%D8%A6%D8%B9%D8%A9_izgarh.jpg',                                 title: 'Common Mistakes',  size: 'small'  },
      { id: 14, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750095/%D8%AA%D9%88%D8%B9%D9%88%D9%8A-1_tytstp.jpg',                                                               title: 'Awareness',        size: 'small'  },
      { id: 15, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750095/%D8%AA%D9%82%D8%AF%D9%8A%D9%85-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9-4_pojhle.jpg', title: 'Clinic Services',  size: 'large'  },
      { id: 16, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750095/%D8%B3%D9%85%D8%A7%D8%B9%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9-1_m16xrq.jpg',                               title: 'Hearing Aids',     size: 'small'  },
      { id: 17, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750094/%D8%AA%D9%82%D8%AF%D9%8A%D9%85-%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1_gr8okk.jpg',                     title: 'Doctor Intro',     size: 'small'  },
      { id: 18, type: 'image', src: 'https://res.cloudinary.com/ofmkb97h/image/upload/v1784750096/%D8%B7%D9%86%D9%8A%D9%86-%D8%A7%D9%84%D8%A7%D8%B0%D9%86_apeoal.jpg',                                       title: 'Ear Tinnitus',     size: 'large'  },
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

function VideoItem({ item, isLarge, onOpen }) {
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
      onClick={() => onOpen(item)}
    >
      {item.src && (
        <video
          ref={vidRef}
          src={`${item.src}#t=0.5`}
          className={styles.thumb}
          muted={muted}
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* play overlay */}
      <div className={styles.cardOverlay}>
        <div className={styles.overlayIcon}><FaPlay /></div>
      </div>

      {/* bottom bar */}
      <div className={styles.cardInfo}>
        <span className={styles.cardTag}>🎬 Reel</span>
        <div className={styles.cardInfoRow}>
          <span className={styles.cardTitle}>{item.title}</span>
        </div>
      </div>
    </div>
  );
}

function PromoItem({ item, onOpen }) {
  return (
    <div className={styles.promoCard} onClick={() => onOpen(item)}>
      <video
        src={`${item.src}#t=0.5`}
        className={styles.promoVideo}
        muted
        playsInline
        preload="metadata"
      />
      <div className={styles.cardOverlay}>
        <div className={styles.overlayIcon}><FaPlay /></div>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardTag}>🎬 Promo</span>
        <div className={styles.cardInfoRow}>
          <span className={styles.cardTitle}>{item.title}</span>
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef);
  const [activeDoc, setActiveDoc] = useState(0);
  const [lightbox,  setLightbox]  = useState(null);
  const [videoLightbox, setVideoLightbox] = useState(null); // { index in videoItems }

  const doctor = doctors[activeDoc];

  // كل الفيديوهات في الـ doctor الحالي
  const videoItems = doctor.items.filter(i => i.type === 'video' || i.type === 'promo');

  const openVideo = (item) => {
    const idx = videoItems.findIndex(v => v.id === item.id);
    setVideoLightbox(idx);
  };

  const prevVideo = (e) => {
    e.stopPropagation();
    setVideoLightbox(i => (i - 1 + videoItems.length) % videoItems.length);
  };

  const nextVideo = (e) => {
    e.stopPropagation();
    setVideoLightbox(i => (i + 1) % videoItems.length);
  };

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (videoLightbox === null) return;
      if (e.key === 'ArrowLeft')  setVideoLightbox(i => (i - 1 + videoItems.length) % videoItems.length);
      if (e.key === 'ArrowRight') setVideoLightbox(i => (i + 1) % videoItems.length);
      if (e.key === 'Escape')     setVideoLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [videoLightbox, videoItems.length]);

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
      </div>

      {/* Grid */}
      <div className={`${styles.grid} ${inView ? styles.visible : ''}`}>
        {doctor.items.map((item, i) => {
          if (item.type === 'promo') {
            return <PromoItem key={item.id} item={item} onOpen={openVideo} />;
          }
          if (item.type === 'video') {
            return (
              <VideoItem
                key={item.id}
                item={item}
                isLarge={item.size === 'large'}
                onOpen={openVideo}
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

      {/* Image Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} className={styles.lightboxImg} />
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {videoLightbox !== null && (
        <div className={styles.videoLightbox} onClick={() => setVideoLightbox(null)}>
          <div className={styles.videoLightboxInner} onClick={e => e.stopPropagation()}>

            <button className={styles.lightboxClose} onClick={() => setVideoLightbox(null)}>✕</button>

            {/* prev */}
            {videoItems.length > 1 && (
              <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prevVideo}>‹</button>
            )}

            <video
              key={videoItems[videoLightbox]?.src}
              src={videoItems[videoLightbox]?.src}
              className={styles.lightboxVideo}
              controls
              autoPlay
              playsInline
            />

            {/* next */}
            {videoItems.length > 1 && (
              <button className={`${styles.navBtn} ${styles.navNext}`} onClick={nextVideo}>›</button>
            )}

            <p className={styles.videoCounter}>
              {videoLightbox + 1} / {videoItems.length}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
