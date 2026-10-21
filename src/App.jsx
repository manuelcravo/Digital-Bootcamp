import Background from './components/Background.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import OfferShowcase from './components/OfferShowcase.jsx';
import Community from './components/Community.jsx';

export default function App() {
  return (
    <div className="page">
      <Background />
      <div className="layer">
        <Header />
        <Hero />
        <Ticker />
        <OfferShowcase />
        <Community />
        <div className="container">
          <section className="cta">
            <h2 className="section-title">Got a pair gathering dust?</h2>
            <p className="section-sub">Give it a second life — and find your next favourite pair along the way.</p>
            <a href="#join" className="btn btn-green"><span className="gloss" /><span>Join the beta</span></a>
          </section>
        </div>
        <footer className="container footer">
          <span>© 2026 SoleSwap · Made in Berlin</span>
          <span><a href="#how">How it works</a> · <a href="#offers">Offers</a> · <a href="#community">Community</a></span>
        </footer>
      </div>
    </div>
  );
}
