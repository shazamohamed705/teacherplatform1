// A thin long arrow.
//   dir="auto"  points forward (right in LTR, left in RTL)
//   dir="back"  points backward (left in LTR, right in RTL)
//   dir="left" / "right" are fixed physical directions.
const classes = {
  auto: 'arrow arrow--auto',
  back: 'arrow arrow--back',
  left: 'arrow arrow--left',
  right: 'arrow',
};

export default function Arrow({ dir = 'auto', size = 18 }) {
  return (
    <svg className={classes[dir]} width={size} height={size * 0.6} viewBox="0 0 30 18" fill="none" aria-hidden="true">
      <path d="M0 9h28M20 1l8 8-8 8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
