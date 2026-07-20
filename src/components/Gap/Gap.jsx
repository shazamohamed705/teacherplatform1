import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import styles from './Gap.module.css';

function useTypewriter(lines, inView, key) {
  const [displayed, setDisplayed] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      setDisplayed([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setDone(false);
      return;
    }
    if (done) return;
    if (currentLine >= lines.length) { setDone(true); return; }
    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || '') + line[currentChar];
          return next;
        });
        setCurrentChar(c => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setCurrentLine(l => l + 1); setCurrentChar(0); }, 300);
      return () => clearTimeout(t);
    }
  }, [inView, currentLine, currentChar, done, lines, key]);

  return displayed;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setKey(k => k + 1); setInView(true); }
        else setInView(false);
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return { inView, key };
}

export default function Gap() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const { inView, key } = useInView(sectionRef);

  const problemLines = [
    t('gap.prob1'), t('gap.prob2'), t('gap.prob3'), t('gap.prob4'),
  ];
  const solutionLines = [
    t('gap.sol1'), t('gap.sol2'), t('gap.sol3'), t('gap.sol4'),
  ];

  const problemDisplayed  = useTypewriter(problemLines,  inView, `${key}-${i18n.language}`);
  const solutionDisplayed = useTypewriter(solutionLines, inView, `s-${key}-${i18n.language}`);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>

      {/* Header */}
      <div className={`${styles.header} ${inView ? styles.visible : ''}`}>
        <span className={styles.eyebrow}>{t('gap.eyebrow')}</span>
        <h2 className={styles.title}>
          {t('gap.title1')}<span className={styles.titleOrange}>{t('gap.titleGap')}</span>{t('gap.title2')}
        </h2>
        <p className={styles.subtitle}>{t('gap.subtitle')}</p>
      </div>

      {/* Split Screen */}
      <div className={`${styles.split} ${inView ? styles.visible : ''}`}>

        {/* LEFT — Problem */}
        <div className={styles.leftPane}>
          <div className={styles.paneOverlay} />
          <div className={styles.paneContent}>
            <div className={styles.paneTag}>
              <FaTimesCircle className={styles.tagIconBad} />
              <span>{t('gap.probTag')}</span>
            </div>
            <h3 className={`${styles.paneTitle} ${styles.paneTitlePurple}`}>{t('gap.probTitle')}</h3>
            <p className={styles.paneDesc}>{t('gap.probDesc')}</p>
            <ul className={styles.twList} key={`prob-${key}-${i18n.language}`}>
              {problemLines.map((line, i) => (
                <li key={i} className={styles.twItem}>
                  <FaTimesCircle className={styles.twIconBad} />
                  <span>
                    {problemDisplayed[i] || ''}
                    {i === (problemDisplayed.length - 1) &&
                     problemDisplayed[i] !== undefined &&
                     problemDisplayed[i].length < line.length &&
                      <span className={styles.cursor}>|</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div className={styles.divider}>
          <div className={`${styles.dividerLine} ${inView ? styles.grow : ''}`} />
          <div className={styles.dividerBadge}>VS</div>
          <div className={`${styles.dividerLine} ${inView ? styles.grow : ''}`} />
        </div>

        {/* RIGHT — Solution */}
        <div className={styles.rightPane}>
          <div className={styles.paneOverlay} />
          <div className={styles.paneContent}>
            <div className={styles.paneTag}>
              <FaCheckCircle className={styles.tagIconGood} />
              <span>{t('gap.solTag')}</span>
            </div>
            <h3 className={`${styles.paneTitle} ${styles.paneTitleOrange}`}>{t('gap.solTitle')}</h3>
            <p className={styles.paneDesc}>{t('gap.solDesc')}</p>
            <ul className={styles.twList} key={`sol-${key}-${i18n.language}`}>
              {solutionLines.map((line, i) => (
                <li key={i} className={styles.twItem}>
                  <FaCheckCircle className={styles.twIconGood} />
                  <span>
                    {solutionDisplayed[i] || ''}
                    {i === (solutionDisplayed.length - 1) &&
                     solutionDisplayed[i] !== undefined &&
                     solutionDisplayed[i].length < line.length &&
                      <span className={styles.cursor}>|</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className={`${styles.banner} ${inView ? styles.visible : ''}`}>
        <span className={styles.bannerText}>
          {t('gap.banner')}<strong>{t('gap.bannerB1')}</strong>{t('gap.bannerAnd')}<strong>{t('gap.bannerB2')}</strong>
        </span>
      </div>

    </section>
  );
}
