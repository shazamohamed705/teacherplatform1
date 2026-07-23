import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserMd, FaVideo, FaEye, FaStar } from 'react-icons/fa';
import styles from './Hero.module.css';
import TypeWriter from './TypeWriter';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const statIcons = [FaUserMd, FaVideo, FaEye, FaStar];

function StatItem({ number, suffix = '+', label, animate, index = 0 }) {
  const count = useCounter(number, 1800, animate);
  const Icon = statIcons[index];
  return (
    <div className={styles.statItem}>
      <div className={styles.statInner}>
        <div className={styles.statFront}>
          <span className={styles.statNumber}>{count}{suffix}</span>
          <span className={styles.statLabel}>{label}</span>
        </div>
        <div className={styles.statBack}>
          <Icon className={styles.statIcon} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>

      {/* Background elements */}
      <div className={styles.bgShapes}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
      </div>
      <div className={styles.gridOverlay} />
      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.container}>

        {/* ---- Text Content ---- */}
        <div className={styles.content}>

          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>{t('hero.badge')}</span>
          </div>

          {/* Title */}
          <div className={styles.titleWrapper}>
            <h1 className={styles.name}>
              {t('hero.line1')} <span className={styles.orange}>{t('hero.line2')}</span>
              <span className={styles.nameHighlight}><TypeWriter /></span>
            </h1>
            <div className={styles.titleLine}>
              <span className={styles.titleTag}>{t('hero.tag1')}</span>
              <span className={styles.titleTag}>{t('hero.tag2')}</span>
              <span className={styles.titleTag}>{t('hero.tag3')}</span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.description}>
            {t('hero.desc1')}
            <br /><br />
            {t('hero.desc2')}{' '}
            <strong>{t('hero.desc3')}</strong>
          </p>

          {/* Stats */}
          <div className={styles.stats}>
            <StatItem number={50}  suffix={t('hero.stat1Suf')} label={t('hero.stat1Label')} animate={animate} index={0} />
            <StatItem number={300} suffix={t('hero.stat2Suf')} label={t('hero.stat2Label')} animate={animate} index={1} />
            <StatItem number={5}   suffix={t('hero.stat3Suf')} label={t('hero.stat3Label')} animate={animate} index={2} />
            <StatItem number={98}  suffix={t('hero.stat4Suf')} label={t('hero.stat4Label')} animate={animate} index={3} />
          </div>

          {/* CTA */}
          <div className={styles.actions}>
            <button
              className={styles.btnPrimary}
              onClick={() => setShowModal(true)}
            >
              {t('hero.cta1')}
              <span className={styles.btnIcon}>→</span>
            </button>
            <a
              href="#portfolio"
              className={styles.btnSecondary}
              onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {t('hero.cta2')}
              <span className={styles.btnIcon}>→</span>
            </a>
          </div>

          {/* Social */}
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="YouTube">▶</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">📸</a>
            <a href="#" className={styles.socialLink} aria-label="TikTok">🎵</a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* ---- Image Side ---- */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageRing}>
            {/* Rings */}
            <div className={`${styles.ring} ${styles.ringOuter}`} />
            <div className={`${styles.ring} ${styles.ringMid}`} />
            <div className={styles.orbitDot} />
            <div className={`${styles.orbitDot} ${styles.orbitDot2}`} />

            {/* Main circle */}
            <div className={styles.imageCircle}>
              <img
                src="/Asset 5@4x.png"
                alt="WAHAJ MEDIA"
                className={styles.doctorImg}
              />
            </div>

            {/* Float card 1 */}
            <div className={`${styles.floatCard} ${styles.floatCard1}`}>
              <span className={styles.cardEmoji}>⭐</span>
              <div className={styles.cardText}>
                <span className={styles.cardNum}>4.9</span>
                <span className={styles.cardLabel}>{t('hero.card1Label')}</span>
              </div>
            </div>

            {/* Float card 2 */}
            <div className={`${styles.floatCard} ${styles.floatCard2}`}>
              <span className={styles.cardEmoji}>🏆</span>
              <div className={styles.cardText}>
                <span className={styles.cardNum}>{t('hero.card2Num')}</span>
                <span className={styles.cardLabel}>{t('hero.card2Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        role="button"
        aria-label="Scroll down"
      >
        <span className={styles.scrollText}>Discover More</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>✕</button>
            <h3 className={styles.modalTitle}>تواصل معنا</h3>
            <p className={styles.modalSub}>اختار طريقة التواصل المفضلة</p>
            <div className={styles.modalBtns}>
              <a
                href="https://wa.me/201023313853"
                target="_blank"
                rel="noreferrer"
                className={`${styles.modalBtn} ${styles.modalBtnWa}`}
                onClick={() => setShowModal(false)}
              >
                <span>💬</span> WhatsApp
              </a>
              <a
                href="mailto:Wahaj.official.2025@gmail.com"
                className={`${styles.modalBtn} ${styles.modalBtnGmail}`}
                onClick={() => setShowModal(false)}
              >
                <span>✉️</span> Gmail
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
