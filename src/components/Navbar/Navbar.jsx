import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

const sectionIds = ['hero','story','about','why','process','portfolio'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('hero');
  const [langOpen, setLangOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isAr = i18n.language === 'ar';
  const langRef = useRef(null);

  const navItems = [
    { label: t('nav.home'),      href: '#hero' },
    { label: t('nav.ourStory'),  href: '#story' },
    { label: t('nav.theGap'),    href: '#about' },
    { label: t('nav.whyUs'),     href: '#why' },
    { label: t('nav.process'),   href: '#process' },
    { label: t('nav.work'),      href: '#portfolio' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOut = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, []);

  useEffect(() => {
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const switchLang = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setLangOpen(false);
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>

        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          <img
            src="/Screenshot_2026-07-19_224553-removebg-preview.png"
            alt="WAHAJ MEDIA"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active === id ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className={styles.navRight}>
          {/* Lang dropdown */}
          <div ref={langRef} className={`${styles.langDropdown} ${langOpen ? styles.open : ''}`}>
            <button
              className={styles.langTrigger}
              onClick={() => setLangOpen(o => !o)}
              aria-label="Select language"
            >
              <span className={styles.langFlag}>{isAr ? '🇸🇦' : '🇬🇧'}</span>
              {isAr ? 'العربية' : 'English'}
              <span className={styles.langArrow}>▾</span>
            </button>

            <div className={styles.langMenu}>
              <button
                className={`${styles.langOption} ${!isAr ? styles.langOptionActive : ''}`}
                onClick={() => switchLang('en')}
              >
                <span>🇬🇧</span> English
              </button>
              <button
                className={`${styles.langOption} ${isAr ? styles.langOptionActive : ''}`}
                onClick={() => switchLang('ar')}
              >
                <span>🇸🇦</span> العربية
              </button>
            </div>
          </div>

          {/* CTA */}
          <button className={styles.ctaBtn} onClick={() => setShowModal(true)}>
            {t('nav.getStarted')}
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            {item.label}
          </a>
        ))}
        <div className={styles.mobileLangRow}>
          <button className={styles.mobileLangBtn} onClick={() => switchLang(isAr ? 'en' : 'ar')}>
            {isAr ? '🇬🇧 Switch to English' : '🇸🇦 التبديل للعربية'}
          </button>
        </div>
        <button className={styles.mobileCta} onClick={() => { handleLinkClick(); setShowModal(true); }}>
          {t('nav.getStarted')}
        </button>
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
                <span>💬</span>
                WhatsApp
              </a>
              <a
                href="mailto:Wahaj.official.2025@gmail.com"
                className={`${styles.modalBtn} ${styles.modalBtnGmail}`}
                onClick={() => setShowModal(false)}
              >
                <span>✉️</span>
                Gmail
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
