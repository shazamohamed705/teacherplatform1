import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiPlayFill, PiArrowsOutSimpleLight } from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import Lightbox from '../ui/Lightbox';
import doctors from '../../data/doctors';
import { countWords } from '../../lib/words';
import styles from './Doctors.module.css';

const pad = (n) => String(n).padStart(2, '0');

function MediaCard({ item, index, label, onOpen }) {
  const videoRef = useRef(null);
  const isVideo = item.type !== 'image';

  // Muted preview while hovering a reel
  const preview = () => videoRef.current?.play().catch(() => {});
  const stop = () => videoRef.current?.pause();

  const cls = [
    styles.card,
    item.type === 'promo' && styles.promo,
    item.size === 'large' && styles.large,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      style={{ '--i': Math.min(index, 8) }}
      onClick={onOpen}
      onMouseEnter={isVideo ? preview : undefined}
      onMouseLeave={isVideo ? stop : undefined}
    >
      <span className={styles.media}>
        {isVideo ? (
          <video ref={videoRef} src={`${item.src}#t=0.5`} muted loop playsInline preload="metadata" />
        ) : (
          <img src={item.src} alt={item.title} loading="lazy" />
        )}
      </span>
      <span className={styles.badge}>{isVideo ? <PiPlayFill /> : <PiArrowsOutSimpleLight />}</span>
      <span className={styles.cap}>
        <span className={styles.capTag}>{label}</span>
        <span className={styles.capTitle}>{item.title}</span>
      </span>
    </button>
  );
}

export default function Doctors() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null); // index into the active doctor's items
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);

  const doctor = doctors[active];
  const items = doctor.items;
  const n = items.length;
  const title1 = t('doctors.title1');
  const labels = { image: t('doctors.campaign'), video: t('doctors.reel'), promo: t('doctors.promo') };

  // Slide the underline to the selected tab
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabsRef.current?.querySelector('[aria-selected="true"]');
      const bar = indicatorRef.current;
      if (!tab || !bar) return;
      bar.style.width = `${tab.offsetWidth}px`;
      bar.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, i18n.language]);

  const selectDoctor = (i) => {
    setActive(i);
    setOpen(null);
  };

  const current = open !== null ? items[open] : null;

  return (
    <section id="doctors" className={`${styles.section} theme-purple`}>
      <div className="container">
        <header className={styles.head}>
          <Eyebrow num="07" data-reveal="up">{t('doctors.eyebrow')}</Eyebrow>
          <h2 className={`display ${styles.title}`} data-reveal="words">
            <Words text={title1} />
            <em><Words text={t('doctors.titleSpk')} start={countWords(title1)} /></em>
          </h2>
          <p className={styles.sub} data-reveal="up" style={{ '--d': '0.25s' }}>{t('doctors.subtitle')}</p>
        </header>

        <div className={styles.tabsWrap} data-reveal="up" style={{ '--d': '0.3s' }}>
          <div className={styles.tabs} role="tablist" ref={tabsRef}>
            {doctors.map((doc, i) => (
              <button
                key={doc.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={styles.tab}
                onClick={() => selectDoctor(i)}
              >
                <span className={styles.tabNum}>{pad(i + 1)}</span>
                <span className={styles.tabName} dir="ltr">{doc.name}</span>
                <span className={styles.tabSpec}>{t(`doctors.spec.${doc.specialty}`)}</span>
              </button>
            ))}
            <span className={styles.indicator} ref={indicatorRef} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.grid} data-reveal="fade">
          {items.map((item, i) => (
            <MediaCard
              key={`${doctor.id}-${item.id}`}
              item={item}
              index={i}
              label={labels[item.type]}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </div>

      {current && (
        <Lightbox
          label={current.title}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i - 1 + n) % n)}
          onNext={() => setOpen((i) => (i + 1) % n)}
          counter={`${pad(open + 1)} / ${pad(n)}`}
        >
          {current.type === 'image' ? (
            <img key={current.src} src={current.src} alt={current.title} />
          ) : (
            <video key={current.src} src={current.src} controls autoPlay playsInline />
          )}
        </Lightbox>
      )}
    </section>
  );
}
