import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiInstagramLogoLight, PiTiktokLogoLight, PiYoutubeLogoLight } from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import Arrow from '../ui/Arrow';
import Lightbox from '../ui/Lightbox';
import useInView from '../../hooks/useInView';
import { portfolioItems, portfolioSets } from '../../data/portfolio';
import { countWords } from '../../lib/words';
import styles from './Portfolio.module.css';

const platformIcons = {
  instagram: PiInstagramLogoLight,
  youtube: PiYoutubeLogoLight,
  tiktok: PiTiktokLogoLight,
};

const pad = (n) => String(n).padStart(2, '0');
const total = portfolioSets.length;
const count = portfolioItems.length;

export default function Portfolio() {
  const { t } = useTranslation();
  const [sectionRef, inView] = useInView({ threshold: 0, once: false });
  const [set, setSet] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState(null); // index into portfolioItems

  const go = (step) => setSet((s) => (s + step + total) % total);
  // Autoplay is driven by the progress bar's CSS animation: when it ends, advance.
  const running = inView && !hovering && open === null;
  const title1 = t('portfolio.title1');
  const current = open !== null ? portfolioItems[open] : null;

  return (
    <section id="portfolio" className={`${styles.section} theme-deep`} ref={sectionRef}>
      <div className="container">
        <header className={styles.head}>
          <div>
            <Eyebrow num="06" data-reveal="up">{t('portfolio.eyebrow')}</Eyebrow>
            <h2 className={`display ${styles.title}`} data-reveal="words">
              <Words text={title1} />
              <em><Words text={t('portfolio.titleSpk')} start={countWords(title1)} /></em>
            </h2>
          </div>

          <div className={styles.aside} data-reveal="up" style={{ '--d': '0.2s' }}>
            <p className={styles.sub}>{t('portfolio.subtitle')}</p>
            <div className={styles.pager}>
              <button type="button" className={styles.pagerBtn} onClick={() => go(-1)} aria-label={t('portfolio.prev')}>
                <Arrow dir="back" />
              </button>
              <span className={styles.count}>
                <b>{pad(set + 1)}</b> / {pad(total)}
              </span>
              <button type="button" className={styles.pagerBtn} onClick={() => go(1)} aria-label={t('portfolio.next')}>
                <Arrow dir="auto" />
              </button>
            </div>
            <span className={styles.progress}>
              <span
                key={set}
                className={styles.progressBar}
                style={{ animationPlayState: running ? 'running' : 'paused' }}
                onAnimationEnd={() => go(1)}
              />
            </span>
          </div>
        </header>

        <div
          className={styles.grid}
          data-reveal="fade"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {portfolioSets[set].map((work, i) => {
            const Icon = platformIcons[work.platform];
            return (
              <button
                type="button"
                key={`${set}-${work.id}`}
                className={`${styles.card} ${work.size === 'large' ? styles.large : ''}`}
                style={{ '--i': i }}
                onClick={() => setOpen(work.index)}
              >
                <span className={styles.media}>
                  <img src={work.image} alt={work.title} loading="lazy" />
                </span>
                <span className={styles.cap}>
                  <span className={styles.capTitle}>{work.title}</span>
                  <span className={styles.capTag}>
                    {work.tag}
                    <Icon />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {current && (
        <Lightbox
          label={current.title}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i - 1 + count) % count)}
          onNext={() => setOpen((i) => (i + 1) % count)}
          counter={`${pad(open + 1)} / ${pad(count)}`}
        >
          <img key={current.image} src={current.image} alt={current.title} />
          <p className={styles.lbCap}>
            <span>{current.title}</span>
            <span>{current.tag}</span>
          </p>
        </Lightbox>
      )}
    </section>
  );
}
