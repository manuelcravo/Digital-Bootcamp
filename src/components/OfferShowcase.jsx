import { OFFERS, STARS, avatarBg, initials } from '../data.js';
import { SwapIcon } from './Icons.jsx';

function OfferCard({ o }) {
  const n = STARS[o.condition] || 4;
  return (
    <article className="window offer">
      <div className="titlebar">
        <div className="avatar" style={{ background: avatarBg(o.hue) }}>{initials(o.user)}</div>
        <div className="who"><b>{o.user}</b> · {o.location} · {o.time}</div>
        <span className="heart" aria-hidden="true">♥</span>
      </div>
      <div className="offer-body">
        <div className="photo">
          <div className="photo-label">sneaker photo · {o.title}</div>
          {o.isNew && <div className="burst">NEW!</div>}
          <div className="tags">
            <span>US {o.size}</span>
            <span>{o.category}</span>
          </div>
        </div>
        <div>
          <div className="offer-title">{o.title}</div>
          <div className="condition">
            <span className="stars">
              <span className="on">{'★'.repeat(n)}</span>
              <span className="off">{'★'.repeat(5 - n)}</span>
            </span>
            {o.condition}
          </div>
        </div>
        <p className="offer-desc">{o.desc}</p>
        <div className="trade">
          <div className="has"><small>HAS</small><div>{o.title}</div></div>
          <div className="trade-icon"><SwapIcon size={16} width={3} /></div>
          <div className="wants"><small>WANTS</small><div>{o.wants}</div></div>
        </div>
      </div>
    </article>
  );
}

export default function OfferShowcase() {
  return (
    <section id="offers" className="container showcase">
      <h2 className="section-title">Fresh offers near you</h2>
      <p className="section-sub">A peek at what Berlin is trading right now. Every listing shows what they have and what they want.</p>
      <div className="offer-grid">
        {OFFERS.map((o) => <OfferCard key={o.id} o={o} />)}
      </div>
    </section>
  );
}
