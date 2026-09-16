import { useTranslation } from 'react-i18next';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import { countWords } from '../../lib/words';
import styles from './About.module.css';

const ROMAN = ['I', 'II', 'III'];

export default function About() {
  const { t } = useTranslation();
  const title1 = t('about.title1');
  const pillars = [1, 2, 3].map((n) => ({
    title: t(`about.p${n}Title`),
    desc: t(`about.p${n}Desc`),
  }));

  return (
    <section id="story" className={`${styles.section} theme-purple`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.side}>
          <Eyebrow num="01" data-reveal="up">{t('about.eyebrow')}</Eyebrow>
        </div>

        <div className={styles.main}>
          <h2 className={`display ${styles.title}`} data-reveal="words">
            <Words text={title1} />
            <em><Words text={t('about.title2')} start={countWords(title1)} /></em>
          </h2>
          <div className={styles.body}>
            <p className={styles.dropcap} data-reveal="up" style={{ '--d': '0.15s' }}>{t('about.body1')}</p>
            <p data-reveal="up" style={{ '--d': '0.25s' }}>{t('about.body2')}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <span className="rule" data-reveal="rule" />
        <ol className={styles.pillars}>
          {pillars.map((p, i) => (
            <li key={i} className={styles.pillar} data-reveal="up" style={{ '--d': `${0.15 + i * 0.12}s` }}>
              <span className={styles.roman}>{ROMAN[i]}.</span>
              <h3 className={styles.pTitle}>{p.title}</h3>
              <p className={styles.pDesc}>{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
