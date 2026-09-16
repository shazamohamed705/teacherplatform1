import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Words from '../ui/Words';
import Arrow from '../ui/Arrow';
import Eyebrow from '../ui/Eyebrow';
import useInView from '../../hooks/useInView';
import useCountUp from '../../hooks/useCountUp';
import { useParallax } from '../../hooks/useScrollVar';
import { useLiteMotion } from '../../lib/motion';
import { openContact } from '../../lib/contact';
import { countWords } from '../../lib/words';
import styles from './Hero.module.css';

const FLAME = '/Asset 25@4x.png';

// Embers drifting up off the flame: horizontal start, drift, duration, delay, size
const EMBERS = [
  { x: '-14%', dx: '-18px', t: '3.4s', d: '0s',   s: 4 },
  { x: '6%',   dx: '10px',  t: '4.2s', d: '0.8s', s: 3 },
  { x: '-2%',  dx: '-6px',  t: '3.8s', d: '1.6s', s: 5 },
  { x: '14%',  dx: '20px',  t: '4.6s', d: '2.3s', s: 3 },
  { x: '-8%',  dx: '-12px', t: '3.2s', d: '2.9s', s: 4 },
  { x: '10%',  dx: '4px',   t: '4s',   d: '3.6s', s: 3 },
  { x: '0%',   dx: '14px',  t: '3.6s', d: '1.2s', s: 2 },
];

// Cycles through words: the old one slides up and out, the new one rises in.
function Roller({ words }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 2800);
    return () => clearInterval(id);
  }, []);

  if (!words.length) return null;
  const current = words[tick % words.length];
  const previous = tick > 0 ? words[(tick - 1) % words.length] : null;

  return (
    <span className={styles.roller}>
      {previous && (
        <span key={`out-${tick}`} className={styles.rollOut} aria-hidden="true">{previous}</span>
      )}
      <span key={`in-${tick}`} className={styles.rollIn}>{current}</span>
    </span>
  );
}

function Stat({ value, suffix, label, run, lite }) {
  const n = useCountUp(value, run, lite ? 900 : 2200, lite ? 80 : 1300);
  return (
    <li className={styles.stat}>
      <span className={styles.statNum}>
        {n}
        <span className={styles.suf}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </li>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const words = t('typewriter', { returnObjects: true });
  const [statsRef, statsIn] = useInView({ threshold: 0.4 });
  const lite = useLiteMotion();
  const artRef = useParallax(0.08);
  const line1 = t('hero.line1');

  const stats = [1, 2, 3, 4].map((n) => ({
    value: Number(t(`hero.stat${n}Num`)),
    suffix: t(`hero.stat${n}Suf`),
    label: t(`hero.stat${n}Label`),
  }));

  // The flame tilts toward the mouse (-1…1 on each axis, relative to the artwork)
  const onPointerMove = (e) => {
    const el = artRef.current;
    if (e.pointerType !== 'mouse' || !el) return;
    const r = el.getBoundingClientRect();
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    el.style.setProperty('--mx', clamp((e.clientX - (r.left + r.width / 2)) / r.width).toFixed(3));
    el.style.setProperty('--my', clamp((e.clientY - (r.top + r.height / 2)) / r.height).toFixed(3));
  };

  const onPointerLeave = () => {
    artRef.current?.style.setProperty('--mx', '0');
    artRef.current?.style.setProperty('--my', '0');
  };

  const flameMask = { WebkitMaskImage: `url("${FLAME}")`, maskImage: `url("${FLAME}")` };

  return (
    <section
      id="hero"
      className={`${styles.hero} theme-deep`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={`container ${styles.grid}`}>
        {/* ---- Copy ---- */}
        <div className={styles.copy}>
          <Eyebrow data-reveal="up">{t('hero.badge')}</Eyebrow>

          <h1 className={`display ${styles.title}`} data-reveal="words" style={{ '--d': '0.1s' }}>
            <Words text={line1} />{' '}
            <em><Words text={t('hero.line2')} start={countWords(line1)} /></em>
            <span className={styles.rollLine} data-reveal="up" style={{ '--d': '0.55s' }}>
              <span className={styles.rollDash} aria-hidden="true" />
              <Roller words={Array.isArray(words) ? words : []} />
            </span>
          </h1>

          <ul className={styles.tags} data-reveal="up" style={{ '--d': '0.4s' }}>
            <li>{t('hero.tag1')}</li>
            <li>{t('hero.tag2')}</li>
            <li>{t('hero.tag3')}</li>
          </ul>

          <p className={styles.lead} data-reveal="up" style={{ '--d': '0.5s' }}>
            {t('hero.desc1')} {t('hero.desc2')} <strong>{t('hero.desc3')}</strong>
          </p>

          <div className={styles.ctas} data-reveal="up" style={{ '--d': '0.6s' }}>
            <button type="button" className="btn btn--solid" onClick={openContact}>
              {t('hero.cta1')} <Arrow />
            </button>
            <a href="#portfolio" className="link-arrow">
              {t('hero.cta2')} <Arrow />
            </a>
          </div>
        </div>

        {/* ---- Arch artwork ---- */}
        <div className={styles.art} ref={artRef}>
          <span className={styles.frameLine} data-reveal="fade" style={{ '--d': '0.7s' }} />
          <div className={styles.arch} data-reveal="curtain" style={{ '--d': '0.15s' }}>
            <div className={styles.flameWrap}>
              <div className={styles.tilt}>
                <span className={styles.glow} aria-hidden="true" />
                {!lite && <span className={styles.rings} aria-hidden="true"><i /><i /></span>}
                <div className={styles.ignite}>
                  <div className={styles.flameBox}>
                    <img src={FLAME} alt={t('hero.imgLabel')} className={styles.flame} />
                    {!lite && <span className={styles.flameShine} style={flameMask} aria-hidden="true" />}
                  </div>
                </div>
                {!lite && (
                  <span className={styles.embers} aria-hidden="true">
                    {EMBERS.map((e, i) => (
                      <i
                        key={i}
                        style={{ '--x': e.x, '--dx': e.dx, '--t': e.t, '--delay': e.d, '--s': `${e.s}px` }}
                      />
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.seal} data-reveal="fade" style={{ '--d': '0.9s' }} dir="ltr" aria-hidden="true">
            <svg viewBox="0 0 120 120" className={styles.sealText}>
              <defs>
                <path id="hero-seal-path" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" />
              </defs>
              <text>
                <textPath href="#hero-seal-path" textLength="292" lengthAdjust="spacing">
                  {t('hero.seal')}
                </textPath>
              </text>
            </svg>
            <img src={FLAME} alt="" className={styles.sealMark} />
          </div>

          <p className={styles.caption} data-reveal="up" style={{ '--d': '1s' }}>
            <span className={styles.capNum}>{t('hero.card1Num')}</span>
            <span>{t('hero.card1Label')}</span>
            <span className={styles.capSep} />
            <span className={styles.capNum}>{t('hero.card2Num')}</span>
            <span>{t('hero.card2Label')}</span>
          </p>
        </div>
      </div>

      {/* ---- Figures ---- */}
      <div className="container">
        <ul className={styles.stats} ref={statsRef} data-reveal="up" style={{ '--d': '0.75s' }}>
          {stats.map((s, i) => (
            <Stat key={i} {...s} run={statsIn} lite={lite} />
          ))}
        </ul>
      </div>
    </section>
  );
}
