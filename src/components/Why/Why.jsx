import { useTranslation } from 'react-i18next';
import { PiTargetLight, PiHandshakeLight, PiRocketLaunchLight } from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import { countWords } from '../../lib/words';
import styles from './Why.module.css';

const NUMERALS = ['i.', 'ii.', 'iii.'];

export default function Why() {
  const { t } = useTranslation();
  const title1 = t('why.title1');

  const reasons = [
    { icon: PiTargetLight,       text: t('why.r1') },
    { icon: PiHandshakeLight,    text: t('why.r2') },
    { icon: PiRocketLaunchLight, text: t('why.r3') },
  ];

  return (
    <section id="why" className={`${styles.section} theme-deep`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.sticky}>
            <Eyebrow num="04" data-reveal="up">{t('why.eyebrow')}</Eyebrow>
            <h2 className={`display ${styles.title}`} data-reveal="words">
              <Words text={title1} />
              <em><Words text={t('why.titleName')} start={countWords(title1)} /></em>
              <Words text={t('why.title2')} start={countWords(title1) + 1} />
            </h2>
            <p className={styles.sub} data-reveal="up" style={{ '--d': '0.25s' }}>
              {t('why.subtitle1')}<strong>{t('why.subtitleB')}</strong>{t('why.subtitle2')}
            </p>
          </div>
        </div>

        <ol className={styles.list}>
          {reasons.map(({ icon: Icon, text }, i) => (
            <li key={i} className={styles.item} data-reveal="up" style={{ '--d': `${i * 0.1}s` }}>
              <span className={`rule ${styles.itemRule}`} data-reveal="rule" style={{ '--d': `${i * 0.1}s` }} />
              <span className={styles.num}>{NUMERALS[i]}</span>
              <p className={styles.text}>{text}</p>
              <Icon className={styles.icon} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
