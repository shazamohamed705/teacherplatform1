import { useTranslation } from 'react-i18next';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import { useScrollProgress } from '../../hooks/useScrollVar';
import { countWords } from '../../lib/words';
import styles from './Process.module.css';

export default function Process() {
  const { t } = useTranslation();
  const stepsRef = useScrollProgress();
  const title1 = t('process.title1');

  const steps = [1, 2, 3, 4].map((n) => ({
    number: `0${n}`,
    sub: t(`process.s${n}Sub`),
    title: t(`process.s${n}Title`),
    desc: t(`process.s${n}Desc`),
  }));

  return (
    <section id="process" className={`${styles.section} theme-purple`}>
      <div className="container">
        <header className={styles.head}>
          <Eyebrow num="05" data-reveal="up">{t('process.eyebrow')}</Eyebrow>
          <h2 className={`display ${styles.title}`} data-reveal="words">
            <Words text={title1} />
            <em><Words text={t('process.titleQ')} start={countWords(title1)} /></em>
          </h2>
          <p className={`display ${styles.question}`} data-reveal="words" style={{ '--d': '0.3s' }}>
            <Words text={t('process.question')} />
          </p>
        </header>

        {/* The orange rail fills as you scroll through the steps */}
        <div className={styles.steps} ref={stepsRef}>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
          </span>

          {steps.map((s) => (
            <article key={s.number} className={styles.step} data-reveal="up">
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.num}>{s.number}</span>
              <div className={styles.body}>
                <span className={styles.sub}>{s.sub}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
