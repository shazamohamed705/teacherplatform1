import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiFacebookLogoLight } from 'react-icons/pi';
import Eyebrow from '../ui/Eyebrow';
import Words from '../ui/Words';
import Arrow from '../ui/Arrow';
import Lightbox from '../ui/Lightbox';
import { countWords } from '../../lib/words';
import styles from './Team.module.css';

const members = [
  {
    key: 'ahmed',
    short: 'CEO',
    img: '/WhatsApp Image 2026-07-25 at 8.11.08 PM.jpeg',
    facebook: 'https://www.facebook.com/share/1D41ZCrT7p/',
  },
  {
    key: 'omar',
    short: 'CPRO',
    img: '/WhatsApp Image 2026-07-25 at 8.11.16 PM.jpeg',
    facebook: 'https://www.facebook.com/share/1cAJbCMcCu/',
  },
  {
    key: 'atef',
    short: 'CCO',
    img: '/WhatsApp Image 2026-07-25 at 8.06.40 PM.jpeg',
    facebook: 'https://www.facebook.com/share/18L5w6Eof4/',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function Team() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);
  const title1 = t('team.title1');
  const person = (m) => ({ name: t(`team.people.${m.key}.name`), role: t(`team.people.${m.key}.role`) });

  return (
    <section id="team" className={`${styles.section} theme-deep`}>
      <div className="container">
        <header className={styles.head}>
          <Eyebrow num="08" data-reveal="up">{t('team.eyebrow')}</Eyebrow>
          <h2 className={`display ${styles.title}`} data-reveal="words">
            <Words text={title1} />
            <em><Words text={t('team.titleSpk')} start={countWords(title1)} /></em>
          </h2>
          <p className={styles.sub} data-reveal="up" style={{ '--d': '0.25s' }}>{t('team.subtitle')}</p>
        </header>

        <div className={styles.cards}>
          {members.map((m, i) => {
            const { name, role } = person(m);
            return (
              <article key={m.key} className={styles.card} data-reveal="up" style={{ '--d': `${i * 0.12}s` }}>
                <button type="button" className={styles.portrait} onClick={() => setOpen(m)} aria-label={name}>
                  <span className={styles.frame} data-reveal="curtain" style={{ '--d': `${0.1 + i * 0.12}s` }}>
                    <img src={m.img} alt={name} loading="lazy" />
                  </span>
                  <span className={styles.idx}>{pad(i + 1)}</span>
                </button>
                <div className={styles.info}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.role}>
                    <span className={styles.short}>{m.short}</span>
                    {role}
                  </p>
                  <a href={m.facebook} target="_blank" rel="noreferrer" className={`link-arrow ${styles.fb}`}>
                    {t('team.profile')} <Arrow />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {open && (
        <Lightbox label={person(open).name} onClose={() => setOpen(null)}>
          <div className={styles.popup}>
            <div className={styles.popPhoto}>
              <img src={open.img} alt="" />
            </div>
            <div className={styles.popInfo}>
              <span className={styles.short}>{open.short}</span>
              <h3 className={`display ${styles.popName}`}>{person(open).name}</h3>
              <p className={styles.popRole}>{person(open).role}</p>
              <a href={open.facebook} target="_blank" rel="noreferrer" className="btn btn--solid">
                <PiFacebookLogoLight size={18} /> {t('team.viewProfile')}
              </a>
            </div>
          </div>
        </Lightbox>
      )}
    </section>
  );
}
