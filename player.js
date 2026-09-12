(() => {
  'use strict';

  const frameHost = document.querySelector('#player-frame');
  const title = document.querySelector('#player-title');
  const message = document.querySelector('#player-message');
  const externalLink = document.querySelector('#open-on-twitch');

  if (window.self !== window.top) document.documentElement.classList.add('embedded');
  window.addEventListener('hashchange', () => window.location.reload());

  const showError = (text) => {
    title.textContent = 'Player unavailable';
    frameHost.replaceChildren();
    const error = document.createElement('div');
    error.className = 'player-error';
    error.textContent = text;
    frameHost.append(error);
    message.textContent = 'Close this window and try the item again from WuxScout.';
  };

  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const type = String(params.get('type') || '').toLowerCase();
  const id = String(params.get('id') || '');
  const parent = window.location.hostname;

  let embedUrl = '';
  let twitchUrl = '';
  let label = '';

  if (!parent || !window.isSecureContext) {
    showError('This player must be opened from its published HTTPS address.');
    return;
  }

  if (type === 'clip' && /^[A-Za-z0-9_-]+$/.test(id)) {
    embedUrl = `https://clips.twitch.tv/embed?clip=${encodeURIComponent(id)}&parent=${encodeURIComponent(parent)}&autoplay=false`;
    twitchUrl = `https://clips.twitch.tv/${encodeURIComponent(id)}`;
    label = 'Twitch clip';
  } else if (type === 'video' && /^\d+$/.test(id)) {
    embedUrl = `https://player.twitch.tv/?video=v${encodeURIComponent(id)}&parent=${encodeURIComponent(parent)}&autoplay=false`;
    twitchUrl = `https://www.twitch.tv/videos/${encodeURIComponent(id)}`;
    label = 'Twitch video';
  } else if (type === 'live' && /^[A-Za-z0-9_]{1,25}$/.test(id)) {
    const login = id.toLowerCase();
    embedUrl = `https://player.twitch.tv/?channel=${encodeURIComponent(login)}&parent=${encodeURIComponent(parent)}&autoplay=false`;
    twitchUrl = `https://www.twitch.tv/${encodeURIComponent(login)}`;
    label = `${login} live on Twitch`;
  } else {
    showError('WuxScout supplied an invalid or unsupported Twitch item.');
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.title = label;
  iframe.allow = 'autoplay; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'no-referrer';

  title.textContent = label;
  externalLink.href = twitchUrl;
  externalLink.hidden = false;
  frameHost.replaceChildren(iframe);
})();
