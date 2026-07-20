import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './Reel.module.css';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function Reel() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const inView     = useInView(sectionRef);

  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(true);
  const [progress, setProgress] = useState(0);
  const [started,  setStarted]  = useState(false);

  useEffect(() => {
    if (!inView && playing) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [inView]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); setStarted(true); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <section id="reel" className={styles.section} ref={sectionRef}>

      {/* full-bleed bg video tint */}
      <div className={styles.bgFull} />
      <div className={styles.bgGrid} />

      {/* Floating label top-left */}
      <div className={`${styles.floatLabel} ${inView ? styles.visible : ''}`}>
        <span className={styles.labelDot} />
        {t('reel.label')}
      </div>

      {/* GIANT heading behind player */}
      <div className={`${styles.behindText} ${inView ? styles.visible : ''}`}>
        WAHAJ
      </div>

      {/* Player */}
      <div
        className={`${styles.playerWrap} ${inView ? styles.visible : ''}`}
        onClick={togglePlay}
      >
        {/* animated border */}
        <div className={`${styles.borderAnim} ${playing ? styles.borderPlaying : ''}`} />

        <div className={styles.videoBox}>
          <video
            ref={videoRef}
            className={styles.video}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={onTimeUpdate}
            poster="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80"
          >
            {/* ← ضعي رابط الرييل هنا */}
            <source src="" type="video/mp4" />
          </video>

          {/* dark overlay */}
          <div className={`${styles.overlay} ${playing && started ? styles.overlayFade : ''}`}>
            <div className={styles.playBtn}>
              <div className={styles.pulse} />
              <div className={styles.pulse} style={{ animationDelay: '1s' }} />
              {playing
                ? <FaPause className={styles.playIcon} />
                : <FaPlay  className={styles.playIcon} />
              }
            </div>
            {!started && <p className={styles.hint}>{t('reel.hint')}</p>}
          </div>

          {/* bottom controls */}
          <div className={`${styles.controls} ${started ? styles.ctrlShow : ''}`}>
            <div className={styles.progressTrack} onClick={onSeek}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              <div className={styles.progressDot}  style={{ left:  `${progress}%` }} />
            </div>
            <div className={styles.ctrlRow}>
              <button className={styles.ctrlBtn} onClick={togglePlay}>
                {playing ? <FaPause /> : <FaPlay />}
              </button>
              <button className={styles.ctrlBtn} onClick={toggleMute}>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <span className={styles.ctrlLabel}>{t('reel.ctrlLabel')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom cta */}
      <div className={`${styles.bottomRow} ${inView ? styles.visible : ''}`}>
        <a href="#contact" className={styles.ctaBtn}>
          {t('reel.cta')}
          <span className={styles.ctaArrow}>→</span>
        </a>
        <p className={styles.ctaNote}>{t('reel.ctaNote')}</p>
      </div>

    </section>
  );
}
