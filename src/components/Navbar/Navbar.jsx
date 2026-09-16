import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openContact } from '../../lib/contact';
import { NAV_DONE_EVENT } from '../../lib/navigation';
import styles from './Navbar.module.css';

const items = [
  { key: 'home',     id: 'hero' },
  { key: 'ourStory', id: 'story' },
  { key: 'theGap',   id: 'about' },
  { key: 'whyUs',    id: 'why' },
  { key: 'process',  id: 'process' },
  { key: 'work',     id: 'portfolio' },
  { key: 'team',     id: 'team' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const progressRef = useRef(null);
  const isAr = i18n.language === 'ar';

  // Background on scroll, hide while scrolling down, reading-progress hairline.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(document.documentElement.dataset.motion !== 'lite' && y > lastY && y > 520);
        lastY = y;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      // Sections are stacked, so the visible one is the last whose top has
      // passed the middle of the viewport (earlier ones sit underneath).
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // After a curtain transition, show the bar even though we jumped downward
    const onNavigated = () => {
      lastY = window.scrollY;
      setHidden(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener(NAV_DONE_EVENT, onNavigated);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener(NAV_DONE_EVENT, onNavigated);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const switchLang = () => {
    const lang = isAr ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const navClass = [
    styles.nav,
    scrolled && styles.scrolled,
    hidden && !menuOpen && styles.hidden,
    menuOpen && styles.open,
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={navClass}>
        <div className={`container ${styles.inner}`}>
          <a href="#hero" className={styles.brand} aria-label="WAHAJ MEDIA" onClick={() => setMenuOpen(false)}>
            <img src="/Asset 25@4x.png" alt="" className={styles.mark} />
            <span className={styles.wordmark} dir="ltr">
              <b>WAHAJ</b>
              <small>Media Production</small>
            </span>
          </a>

          <nav className={styles.links} aria-label="Main">
            {items.map(({ key, id }) => (
              <a key={id} href={`#${id}`} className={`${styles.link} ${active === id ? styles.active : ''}`}>
                <span className={styles.roll} data-text={t(`nav.${key}`)}>
                  <span>{t(`nav.${key}`)}</span>
                </span>
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.lang} onClick={switchLang} lang={isAr ? 'en' : 'ar'}>
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button type="button" className={`btn btn--solid btn--sm ${styles.cta}`} onClick={openContact}>
              {t('nav.getStarted')}
            </button>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={t('nav.menu')}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <span ref={progressRef} className={styles.progress} />
      </header>

      <div className={styles.mobile} data-open={menuOpen}>
        <nav className={styles.mLinks} aria-label="Mobile">
          {items.map(({ key, id }, i) => (
            <a key={id} href={`#${id}`} className={styles.mLink} style={{ '--i': i }} onClick={() => setMenuOpen(false)}>
              <span className={styles.mInner}>
                <span className={styles.mNum}>0{i + 1}</span>
                {t(`nav.${key}`)}
              </span>
            </a>
          ))}
        </nav>
        <div className={styles.mFoot}>
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => { setMenuOpen(false); openContact(); }}
          >
            {t('nav.getStarted')}
          </button>
        </div>
      </div>
    </>
  );
}
