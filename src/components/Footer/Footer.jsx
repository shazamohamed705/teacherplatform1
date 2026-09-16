import { useTranslation } from 'react-i18next';
import {
  PiWhatsappLogoLight, PiEnvelopeSimpleLight,
  PiInstagramLogoLight, PiTiktokLogoLight, PiYoutubeLogoLight,
} from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import Arrow from '../ui/Arrow';
import { useParallax } from '../../hooks/useScrollVar';
import { CONTACT, openContact } from '../../lib/contact';
import { countWords } from '../../lib/words';
import styles from './Footer.module.css';

const links = [
  { key: 'home',     href: '#hero' },
  { key: 'ourStory', href: '#story' },
  { key: 'theGap',   href: '#about' },
  { key: 'whyUs',    href: '#why' },
  { key: 'process',  href: '#process' },
  { key: 'work',     href: '#portfolio' },
  { key: 'doctors',  href: '#doctors' },
  { key: 'team',     href: '#team' },
];

export default function Footer() {
  const { t } = useTranslation();
  const wordmarkRef = useParallax(0.12);
  const title1 = t('footer.ctaTitle1');
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} theme-deep`}>
      {/* ---- Closing call to action ---- */}
      <div className={`container ${styles.cta}`}>
        <Eyebrow data-reveal="up">{t('footer.eyebrow')}</Eyebrow>
        <h2 className={`display ${styles.ctaTitle}`} data-reveal="words">
          <Words text={title1} />
          <em><Words text={t('footer.ctaTitle2')} start={countWords(title1)} /></em>
        </h2>
        <div data-reveal="up" style={{ '--d': '0.3s' }}>
          <button type="button" className="btn btn--solid" onClick={openContact}>
            {t('footer.cta')} <Arrow />
          </button>
        </div>
      </div>

      <div className="container">
        <span className="rule" data-reveal="rule" />
      </div>

      {/* ---- Columns ---- */}
      <div className={`container ${styles.cols}`}>
        <div className={styles.brand} data-reveal="up">
          <img
            src="/Screenshot_2026-07-19_224553-removebg-preview.png"
            alt="WAHAJ MEDIA"
            className={styles.logo}
          />
          <p className={styles.desc}>{t('footer.desc')}</p>
        </div>

        <nav data-reveal="up" style={{ '--d': '0.1s' }} aria-label={t('footer.quick')}>
          <h4 className={styles.colTitle}>{t('footer.quick')}</h4>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={styles.link}>{t(`nav.${l.key}`)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-reveal="up" style={{ '--d': '0.2s' }}>
          <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
          <ul className={styles.contact}>
            <li>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className={styles.contactItem}>
                <PiWhatsappLogoLight />
                <span dir="ltr">{CONTACT.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className={styles.contactItem}>
                <PiEnvelopeSimpleLight />
                <span>{CONTACT.email}</span>
              </a>
            </li>
          </ul>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram"><PiInstagramLogoLight /></a>
            <a href="#" aria-label="TikTok"><PiTiktokLogoLight /></a>
            <a href="#" aria-label="YouTube"><PiYoutubeLogoLight /></a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} WAHAJ MEDIA. {t('footer.rights')}</p>
        <a href="#hero" className={styles.toTop} aria-label="Back to top">
          <Arrow dir="right" />
        </a>
      </div>

      {/* ---- Oversized outlined wordmark ---- */}
      <div className={styles.wordmark} ref={wordmarkRef} data-reveal="words" dir="ltr" aria-hidden="true">
        <span className={styles.wordmarkInner}>
          {'WAHAJ'.split('').map((c, i) => (
            <span className="w" key={i}>
              <span style={{ '--i': i }}>{c}</span>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
