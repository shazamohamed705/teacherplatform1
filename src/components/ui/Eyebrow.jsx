export default function Eyebrow({ num, children, className = '', ...rest }) {
  return (
    <p className={`eyebrow ${className}`} {...rest}>
      {num && <span className="eyebrow__num">{num}</span>}
      <span className="eyebrow__line" />
      <span>{children}</span>
    </p>
  );
}
