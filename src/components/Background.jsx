const BUBBLES = [
  [8, 46, 18, 0], [22, 22, 24, 6], [38, 70, 30, 3], [55, 30, 20, 11], [68, 54, 26, 8],
  [80, 18, 16, 2], [90, 64, 34, 14], [15, 34, 22, 17], [47, 16, 19, 9],
];

const STARS = [
  { left: '12%', top: '18%', size: 18, dur: 3, delay: 0 },
  { left: '58%', top: '12%', size: 12, dur: 2.4, delay: 0.8 },
  { left: '84%', top: '52%', size: 22, dur: 3.6, delay: 1.4 },
  { left: '32%', top: '64%', size: 14, dur: 2.8, delay: 0.3 },
];

export default function Background() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sun" />
      <div className="orb1" />
      <div className="orb2" />
      <div className="orb3" />
      <div className="swoosh1" />
      <div className="swoosh2" />
      <div className="swoosh3" />
      <div className="hill1" />
      <div className="hill2" />
      {STARS.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{ left: s.left, top: s.top, fontSize: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
        >
          ✦
        </div>
      ))}
      {BUBBLES.map(([left, size, dur, delay], i) => (
        <div
          key={i}
          className="bubble"
          style={{ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }}
        />
      ))}
    </div>
  );
}
