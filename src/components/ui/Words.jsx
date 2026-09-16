import { Fragment } from 'react';

// Splits text into masked words that rise in sequence when an ancestor
// [data-reveal] element receives data-in. `start` continues the stagger
// from a previous fragment. Phone CSS just shortens the travel and delay.
export default function Words({ text = '', start = 0 }) {
  const str = String(text);
  const words = str.trim().split(/\s+/).filter(Boolean);

  return (
    <>
      {/^\s/.test(str) && ' '}
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w">
            <span style={{ '--i': start + i }}>{word}</span>
          </span>
        </Fragment>
      ))}
      {/\s$/.test(str) && ' '}
    </>
  );
}
