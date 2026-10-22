import { useState } from 'react';
import { OFFERS, STARS, avatarBg, initials } from '../data.js';
import { SwapIcon } from './Icons.jsx';

function OfferCard({ o, onLike }) {
  const n = STARS[o.condition] || 4;
  return (
    <article className="window offer">
      <div className="titlebar">
        <div className="avatar" style={{ background: avatarBg(o.hue) }}>{initials(o.user)}</div>
        <div className="who"><b>{o.user}</b> · {o.location} · {o.time}</div>
        <button type="button" className="heart" aria-label="Like this offer" onClick={onLike}>♥</button>
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
  const [showConnect, setShowConnect] = useState(false);
  const close = () => setShowConnect(false);
  return (
    <section id="offers" className="container showcase">
      <h2 className="section-title">Fresh offers near you</h2>
      <p className="section-sub">A peek at what Berlin is trading right now. Every listing shows what they have and what they want.</p>
      <div className="offer-grid">
        {OFFERS.map((o) => <OfferCard key={o.id} o={o} onLike={() => setShowConnect(true)} />)}
      </div>
      {showConnect && (
        <div className="modal-backdrop" onClick={close}>
          <div className="window connect-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="titlebar">
              <span className="app-icon" />
              <span className="title">SoleSwap — Connect</span>
              <div className="win-controls">
                <span className="close" role="button" aria-label="Close" onClick={close}>✕</span>
              </div>
            </div>
            <div className="connect-body">
              <div className="connect-heart">♥</div>
              <div className="auth-title">Connect to like this</div>
              <p className="auth-sub">Log in or create an account to like offers and start swapping.</p>
              <a href="#join" className="btn btn-aqua" onClick={close}><span className="gloss" /><span>Log in / Sign up</span></a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
