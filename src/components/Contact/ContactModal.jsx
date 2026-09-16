import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiWhatsappLogoLight, PiEnvelopeSimpleLight } from 'react-icons/pi';
import Lightbox from '../ui/Lightbox';
import Eyebrow from '../ui/Eyebrow';
import Arrow from '../ui/Arrow';
import { CONTACT, CONTACT_EVENT } from '../../lib/contact';
import styles from './ContactModal.module.css';

export default function ContactModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_EVENT, onOpen);
  }, []);

  if (!open) return null;
  const close = () => setOpen(false);

  return (
    <Lightbox onClose={close} label={t('contact.title')}>
      <div className={styles.panel}>
        <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
        <h3 className={`display ${styles.title}`}>{t('contact.title')}</h3>
        <p className={styles.sub}>{t('contact.sub')}</p>

        <div className={styles.rows}>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className={styles.row} onClick={close}>
            <PiWhatsappLogoLight className={`${styles.icon} ${styles.wa}`} />
            <span className={styles.text}>
              <b>WhatsApp</b>
              <small dir="ltr">{CONTACT.phone}</small>
            </span>
            <Arrow />
          </a>
          <a href={`mailto:${CONTACT.email}`} className={styles.row} onClick={close}>
            <PiEnvelopeSimpleLight className={`${styles.icon} ${styles.mail}`} />
            <span className={styles.text}>
              <b>Gmail</b>
              <small>{CONTACT.email}</small>
            </span>
            <Arrow />
          </a>
        </div>
      </div>
    </Lightbox>
  );
}
