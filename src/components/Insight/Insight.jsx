import { useTranslation } from 'react-i18next';
import { PiCameraLight, PiMegaphoneLight, PiPenNibLight, PiPaletteLight } from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import { useParallax } from '../../hooks/useScrollVar';
import { countWords } from '../../lib/words';
import styles from './Insight.module.css';

export default function Insight() {
  const { t } = useTranslation();
  const statementRef = useParallax(0.12);

  const skills = [
    { icon: PiCameraLight,    label: t('insight.skill1') },
    { icon: PiMegaphoneLight, label: t('insight.skill2') },
    { icon: PiPenNibLight,    label: t('insight.skill3') },
    { icon: PiPaletteLight,   label: t('insight.skill4') },
  ];

  const l1 = t('insight.bigLine1');
  const l2 = t('insight.bigLine2');

  return (
    <section id="spark" className={`${styles.section} theme-deep`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Eyebrow num="02" data-reveal="up">{t('insight.eyebrow')}</Eyebrow>

          <h2 className={`display ${styles.lead}`} data-reveal="words">
            <Words text={t('insight.intro1')} />
          </h2>

          <p className={styles.intro} data-reveal="up" style={{ '--d': '0.2s' }}>{t('insight.intro2')}</p>

          <ul className={styles.skills}>
            {skills.map(({ icon: Icon, label }, i) => (
              <li key={i} className={styles.skill} data-reveal="up" style={{ '--d': `${0.2 + i * 0.08}s` }}>
                <span className={styles.skillNum}>0{i + 1}</span>
                <span className={styles.skillName}>{label}</span>
                <Icon className={styles.skillIcon} />
              </li>
            ))}
          </ul>

          <p className={styles.conclusion} data-reveal="up">
            {t('insight.conclusion')}
            <em>{t('insight.medicine')}</em>
          </p>
        </div>

        <div className={styles.statement} ref={statementRef}>
          <div className={styles.flameWrap} data-reveal="fade" style={{ '--d': '0.2s' }} aria-hidden="true">
            <img src="/Asset 25@4x.png" alt="" className={styles.flame} />
          </div>
          <p className={`display ${styles.big}`} data-reveal="words" style={{ '--d': '0.1s' }}>
            <span className={styles.bigSmall}><Words text={l1} /></span>
            <em className={styles.bigLine}><Words text={l2} start={countWords(l1)} /></em>
            <span className={styles.bigLine}>
              <Words text={t('insight.bigLine3')} start={countWords(l1) + countWords(l2)} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
