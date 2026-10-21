export const ShoeIcon = ({ width = 34, height = 23, laces = true }) => (
  <svg width={width} height={height} viewBox="0 0 48 32" aria-hidden="true">
    <path d="M4 22V10q0-3 3-3h7q2 5 8 6l12 3q10 2 10 6z" fill="#fff" />
    <rect x="3" y="22" width="42" height="5" rx="2.5" fill="#c9f5b8" />
    {laces && <path d="M17 11l3-3M21 12l3-3M25 13l3-3" stroke="#1592d8" strokeWidth="1.8" strokeLinecap="round" />}
  </svg>
);

const stroke = { fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const CameraIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" {...stroke} aria-hidden="true">
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const ChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" {...stroke} aria-hidden="true">
    <path d="M4 5h16v11H9l-5 4z" />
  </svg>
);

export const SwapIcon = ({ size = 32, width = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={width} {...stroke} aria-hidden="true">
    <path d="M4 9h13l-3-3M20 15H7l3 3" />
  </svg>
);
