import { ShoeIcon } from './Icons.jsx';

export default function Header() {
  return (
    <header className="container site-header">
      <div className="logo-mark">
        <span className="shine" />
        <ShoeIcon />
        <div className="recycle">♻</div>
      </div>
      <div>
        <div className="wordmark">sole<span>swap</span></div>
        <div className="tagline">the sneaker trading community</div>
      </div>
      <nav className="nav">
        <a className="navlink" href="#how">How it works</a>
        <a className="navlink" href="#offers">Offers</a>
        <a className="navlink" href="#community">Community</a>
        <div className="beta">BETA</div>
      </nav>
    </header>
  );
}
