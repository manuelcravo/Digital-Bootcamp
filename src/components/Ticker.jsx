import { TICKS } from '../data.js';

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-label"><i />LIVE SWAPS</div>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {[...TICKS, ...TICKS].map((t, i) => (
            <span key={i} aria-hidden={i >= TICKS.length}>
              {t}
              <b>●</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
