import AuthCard from './AuthCard.jsx';
import { CameraIcon, ChatIcon, SwapIcon } from './Icons.jsx';

const STEPS = [
  { name: 'Snap', desc: 'Post your pair', color: 'blue', Icon: CameraIcon },
  { name: 'Chat', desc: 'Agree the deal', color: 'amber', Icon: ChatIcon },
  { name: 'Swap', desc: 'Meet & trade', color: 'green', Icon: SwapIcon },
];

export default function Hero() {
  return (
    <section className="container hero">
      <div className="hero-copy">
        <h1>
          Swap your kicks.<br />
          <span className="fresh">Keep it fresh.</span>
        </h1>
        <p className="hero-lede">
          Trade the pairs you've outgrown for the ones you're hunting. Post a photo, find a match nearby, chat,
          and meet up to swap.
        </p>
        <div className="hero-actions">
          <a href="#join" className="btn btn-green"><span className="gloss" /><span>Start swapping</span></a>
          <a href="#offers" className="btn btn-white"><span>Browse offers</span></a>
        </div>
        <div id="how" className="steps">
          {STEPS.map(({ name, desc, color, Icon }) => (
            <div key={name} className="step">
              <div className={`orb ${color}`}>
                <span className="shine" />
                <Icon />
              </div>
              <div className="step-name">{name}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <AuthCard />
    </section>
  );
}
