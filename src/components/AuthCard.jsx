import { useState } from 'react';
import { ShoeIcon } from './Icons.jsx';
import { supabase } from '../supabase.js';

// Sign-in / sign-up card backed by Supabase Auth.
export default function AuthCard() {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState(null); // { type: 'ok' | 'error', text }
  const [loading, setLoading] = useState(false);
  const signup = mode === 'signup';

  const switchTo = (m) => {
    setMode(m);
    setStatus(null);
  };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setStatus({ type: 'error', text: 'Supabase is not configured — add your keys to .env.local.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    const { email, password, username } = form;
    const { data, error } = signup
      ? await supabase.auth.signUp({ email, password, options: { data: { username } } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setStatus({ type: 'error', text: error.message });
    } else if (signup && !data.session) {
      setStatus({ type: 'ok', text: 'Check your inbox to confirm your email.' });
    } else {
      setStatus({ type: 'ok', text: `Signed in as ${data.user.email}.` });
    }
  };

  return (
    <div id="join" className="window auth-card">
      <div className="titlebar">
        <span className="app-icon" />
        <span className="title">SoleSwap — {signup ? 'Create account' : 'Sign in'}</span>
        <div className="win-controls" aria-hidden="true">
          <span>–</span>
          <span>□</span>
          <span className="close">✕</span>
        </div>
      </div>
      <div className="auth-body">
        <div className="auth-head">
          <div className="avatar-frame">
            <div><ShoeIcon width={40} height={27} laces={false} /></div>
            <span className="shine" />
          </div>
          <div>
            <div className="auth-title">{signup ? 'Join SoleSwap' : 'Welcome back'}</div>
            <div className="auth-sub">{signup ? 'Create an account to start swapping.' : 'Sign in to see the latest offers.'}</div>
          </div>
        </div>

        <div className="tabs">
          <button type="button" className={signup ? '' : 'on'} onClick={() => switchTo('login')}>Log in</button>
          <button type="button" className={signup ? 'on' : ''} onClick={() => switchTo('signup')}>Sign up</button>
        </div>

        <form className="form" onSubmit={submit}>
          {signup && (
            <label className="field">
              Username
              <input name="username" value={form.username} onChange={update} placeholder="kickcollector" />
            </label>
          )}
          <label className="field">
            Email
            <input name="email" type="email" required value={form.email} onChange={update} placeholder="you@email.com" />
          </label>
          <label className="field">
            Password
            <input name="password" type="password" required minLength={6} value={form.password} onChange={update} placeholder="••••••••" />
          </label>
          <div className="form-row">
            <label><input type="checkbox" defaultChecked />Keep me signed in</label>
            <a href="#join">Forgot password?</a>
          </div>
          {status && (
            <div className="notice" style={status.type === 'error' ? { color: '#b42318' } : undefined}>{status.text}</div>
          )}
          <button type="submit" className="btn btn-aqua" disabled={loading}>
            <span className="gloss" />
            <span>{loading ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}</span>
          </button>
        </form>

        <div className="divider"><span />or<span /></div>
        <div className="switch">
          {signup ? 'Already a member?' : 'New to SoleSwap?'}{' '}
          <a
            href="#join"
            onClick={(e) => {
              e.preventDefault();
              switchTo(signup ? 'login' : 'signup');
            }}
          >
            {signup ? 'Sign in' : 'Create an account'}
          </a>
        </div>
      </div>
    </div>
  );
}
