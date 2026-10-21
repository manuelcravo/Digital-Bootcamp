import { SWAPPERS, TRENDING, avatarBg, initials } from '../data.js';

export default function Community() {
  return (
    <section id="community" className="container community">
      <div className="meet">
        <div className="meet-kicker">NEXT SWAP MEET</div>
        <div className="meet-row">
          <div className="cal"><div>OCT</div><div>24</div></div>
          <div>
            <div className="meet-name">Mauerpark Sneaker Swap</div>
            <div className="meet-time">Saturday · 12:00–18:00</div>
          </div>
        </div>
      </div>

      <div className="window">
        <div className="titlebar"><span className="title">Trending searches</span></div>
        <div className="panel-list">
          {TRENDING.map((t, i) => (
            <div key={t} className="rank-row">
              <span className="rank">{i + 1}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="window">
        <div className="titlebar green"><span className="title">Top swappers</span></div>
        <div className="panel-list">
          {SWAPPERS.map((u) => (
            <div key={u.name} className="swapper-row">
              <div className="avatar" style={{ background: avatarBg(u.hue) }}>{initials(u.name)}</div>
              <div className="swapper-info">
                <b>{u.name}</b>
                <span>{u.swaps} swaps</span>
              </div>
              <span className="stars"><span className="on">★★★★★</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
