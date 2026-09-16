import { useTranslation } from 'react-i18next';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import { countWords } from '../../lib/words';
import styles from './Gap.module.css';

function Column({ variant, tag, title, desc, items, mark }) {
  const isBad = variant === 'bad';
  return (
    <div className={`${styles.col} ${isBad ? styles.bad : styles.good}`}>
      <div className={styles.colHead} data-reveal="up" style={{ '--d': isBad ? '0s' : '0.1s' }}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.colTitle}>{title}</h3>
        <p className={styles.colDesc}>{desc}</p>
      </div>
      <ul>
        {items.map((text, i) => (
          <li key={i} className={styles.item} data-reveal="up" style={{ '--d': `${(isBad ? 0.1 : 0.2) + i * 0.1}s` }}>
            <span className={styles.mark} aria-hidden="true">{mark}</span>
            <span className={isBad ? styles.strike : undefined}>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Gap() {
  const { t } = useTranslation();
  const title1 = t('gap.title1');
  const problems = [1, 2, 3, 4].map((n) => t(`gap.prob${n}`));
  const solutions = [1, 2, 3, 4].map((n) => t(`gap.sol${n}`));

  return (
    <section id="about" className={`${styles.section} theme-cream`}>
      <div className="container">
        <header className={styles.head}>
          <Eyebrow num="03" data-reveal="up">{t('gap.eyebrow')}</Eyebrow>
          <h2 className={`display ${styles.title}`} data-reveal="words">
            <Words text={title1} />
            <em className={styles.marked}>
              <Words text={t('gap.titleGap')} start={countWords(title1)} />
              <svg className={styles.scribble} viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 17 C 46 7, 104 5, 196 12" pathLength="1" />
              </svg>
            </em>
            <Words text={t('gap.title2')} start={countWords(title1) + 1} />
          </h2>
          <p className={styles.sub} data-reveal="up" style={{ '--d': '0.3s' }}>{t('gap.subtitle')}</p>
        </header>

        <div className={styles.ledger}>
          <Column
            variant="bad"
            tag={t('gap.probTag')}
            title={t('gap.probTitle')}
            desc={t('gap.probDesc')}
            items={problems}
            mark="✕"
          />
          <div className={styles.vs} data-reveal="fade" style={{ '--d': '0.3s' }}>
            <span>{t('gap.vs')}</span>
          </div>
          <Column
            variant="good"
            tag={t('gap.solTag')}
            title={t('gap.solTitle')}
            desc={t('gap.solDesc')}
            items={solutions}
            mark="✓"
          />
        </div>

        <blockquote className={styles.quote} data-reveal="up">
          <span className={styles.qmark} aria-hidden="true">“</span>
          <p className="display">
            {t('gap.banner')}<em>{t('gap.bannerB1')}</em>{t('gap.bannerAnd')}<em>{t('gap.bannerB2')}</em>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
