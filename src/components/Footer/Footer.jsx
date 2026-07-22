import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Home',      href: '#hero'      },
  { label: 'About',     href: '#about'     },
  { label: 'Why Us',    href: '#why'       },
  { label: 'Process',   href: '#process'   },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Doctors',   href: '#doctors'   },
];

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />

        {/* Top */}
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <img
              src="/Screenshot_2026-07-19_224553-removebg-preview.png"
              alt="WAHAJ MEDIA"
              className={styles.logo}
            />
            <p className={styles.brandDesc}>
              نحول خبرتك الطبية إلى محتوى رقمي يصل لآلاف المرضى ويبني ثقة حقيقية.
            </p>
            <button className={styles.ctaBtn} onClick={() => setShowModal(true)}>
              ابدأ معنا الآن
              <span>→</span>
            </button>
          </div>

          {/* Nav Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>روابط سريعة</h4>
            <div className={styles.linkGrid}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className={styles.link}>{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>تواصل معنا</h4>
            <ul className={styles.contactList}>
              <li>
                <a
                  href="https://wa.me/201023313853"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactItem}
                >
                  <span className={styles.contactIcon}><FaWhatsapp /></span>
                  <div>
                    <span className={styles.contactLabel}>WhatsApp</span>
                    <span className={styles.contactValue}>01023313853</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Wahaj.official.2025@gmail.com"
                  className={styles.contactItem}
                >
                  <span className={styles.contactIcon}><FaEnvelope /></span>
                  <div>
                    <span className={styles.contactLabel}>Gmail</span>
                    <span className={styles.contactValue}>Wahaj.official.2025@gmail.com</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 WAHAJ MEDIA. جميع الحقوق محفوظة.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.social} aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className={styles.social} aria-label="TikTok"><FaTiktok /></a>
            <a href="#" className={styles.social} aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </footer>

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
                <FaWhatsapp /> WhatsApp
              </a>
              <a
                href="mailto:Wahaj.official.2025@gmail.com"
                className={`${styles.modalBtn} ${styles.modalBtnGmail}`}
                onClick={() => setShowModal(false)}
              >
                <FaEnvelope /> Gmail
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
