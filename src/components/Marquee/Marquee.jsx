import { useTranslation } from 'react-i18next';
import styles from './Marquee.module.css';

export default function Marquee() {
  const { t } = useTranslation();
  const items = t('marquee', { returnObjects: true });
  const list = Array.isArray(items) ? [...items, ...items] : [];

  // Two identical halves; the track slides by exactly one half for a seamless loop.
  return (
    <div className={styles.band} dir="ltr" aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy}>
            {list.map((item, i) => (
              <span className={styles.item} key={i}>
                {item}
                <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
