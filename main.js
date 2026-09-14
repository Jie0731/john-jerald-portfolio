// VIDEO LINKS: Paste your YouTube URL between the empty quotes in each row.
// Example: ['https://youtu.be/VIDEO_ID', 'VSL Sample 01']
// Supports youtube.com/watch?v=..., youtu.be/..., and youtube.com/shorts/...
// Leave a link empty to display “Video coming soon”.

const groups=[
{
  n:'01',
  k:'VSL',
  t:'VSL',
  d:'AI-assisted video sales letters built around hooks, product storytelling, pacing, and conversion-focused visual sequences.',
  v:[
    ['https://youtube.com/shorts/6G_5bIG-GMM', 'VSL Sample 01'],
    ['https://youtube.com/shorts/JBem3JV-QEE', 'VSL Sample 02'],
    ['https://youtube.com/shorts/c6WkYlh93G4', 'VSL Sample 03'],
    ['https://youtube.com/shorts/38EWO50-poY', 'VSL Sample 04'],
    ['https://youtube.com/shorts/96xvASrtwK4', 'VSL Sample 05'],
    ['https://youtube.com/shorts/xEsqEgKkH2M', 'VSL Sample 06'],
    ['https://youtube.com/shorts/FjcUtP4oJFY', 'VSL Sample 07']
  ]
},
{
  n:'02',
  k:'UGC / SOCIAL ADS',
  t:'AI UGC',
  d:'Creator-style vertical videos designed to feel native, conversational, realistic, and ready for TikTok, Reels, Shorts, and paid social.',
  v:[
    ['https://youtube.com/shorts/IHHz6sZhd1Y?feature=share', 'UGC Sample 01'],
    ['https://youtube.com/shorts/BeVzC80jvkY', 'UGC Sample 02'],
    ['https://youtube.com/shorts/VMUBOZkoepI', 'UGC Sample 03'],
    ['https://youtube.com/shorts/spEOiN7VWY8', 'UGC Sample 04'],
    ['https://youtube.com/shorts/6x0dQGLCMOY', 'UGC Sample 05'],
    ['https://youtube.com/shorts/mjOlUYx_V5s', 'UGC Sample 06'],
    ['https://youtube.com/shorts/t-7-M-4uorM', 'UGC Sample 07'],
    ['https://youtube.com/shorts/emSVs_tf62o', 'UGC Sample 08']
  ]
},
{
  n:'03',
  k:'STYLIZED 3D',
  t:'Pixar-Style AI Videos',
  d:'Character-driven stylized 3D storytelling with consistent art direction, cinematic framing, expressive motion, and scene continuity.',
  v:[
    ['https://youtube.com/shorts/vQ6bT4794FY', 'Stylized 3D Sample 01'],
    ['https://youtube.com/shorts/tZprSGiWiYI', 'Stylized 3D Sample 02'],
    ['https://youtube.com/shorts/eERZxmckjDA', 'Stylized 3D Sample 03']
  ]
},
{
  n:'04',
  k:'ANIMATION',
  t:'Animated Storytelling',
  d:'Stylized narrative videos combining visual identity, character consistency, pacing, motion, and cinematic composition.',
  v:[
    ['https://youtube.com/shorts/nuqR70I9MZo', 'The Nonchalant Man Nobody Can Read']
  ]
},
  {
  n:'05',
  k:'CLAYMATION',
  t:'Claymation AI Videos',
  d:'Clay-style AI videos with handcrafted textures, expressive motion, stop-motion-inspired animation, and consistent visual storytelling.',
  v:[
    ['https://youtube.com/shorts/nTm7ya52FSc', 'Claymation Sample 01'],
    ['https://youtube.com/shorts/So6jA_8UPaU', 'Claymation Sample 02'],
    ['https://youtube.com/shorts/Qv4xDQgXYBQ', 'Claymation Sample 03']
  ]
}
];

function youtubeEmbed(link) {
  try {
    const url = new URL(link);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let id;
    if (host === 'youtu.be') {
      id = url.pathname.split('/')[1];
    } else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      const parts = url.pathname.split('/').filter(Boolean);
      id = parts[0] === 'watch' ? url.searchParams.get('v')
        : ['shorts', 'embed', 'live'].includes(parts[0]) ? parts[1] : null;
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id || '')
      ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function renderPlayer(link, title) {
  const embed = youtubeEmbed(link);
  if (!embed) {
    return '<div class="video-placeholder"><span aria-hidden="true">▶</span><p>Video coming soon</p></div>';
  }
  return `<iframe src="${embed}?enablejsapi=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}" title="${escapeHTML(title)}"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}


const host = document.querySelector('#sections');
host.innerHTML = groups.map(g => `
<section class="category" data-category="${g.n}" aria-label="${escapeHTML(g.t)}">
  <div class="wrap category-head reveal"><b>${g.n}</b><div><small>${escapeHTML(g.k)}</small><h3>${escapeHTML(g.t)}</h3></div><p>${escapeHTML(g.d)}</p></div>
  <div class="wrap video-grid">
    ${g.v.map(([src,title]) => `
      <article class="video-card reveal"><div class="player">${renderPlayer(src,title)}</div>
      <div class="video-meta"><small>${escapeHTML(g.k.split('/')[0])}<span aria-hidden="true">↗</span></small><b>${escapeHTML(title)}</b></div></article>
    `).join('')}
  </div>
</section>`).join('');

// Each element reveals once and stays visible on return visits.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    revealObserver.unobserve(entry.target);
  });
}, {threshold: .08});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filterLabels = ['VSL', 'AI UGC', 'Pixar-style', 'Animation', 'Claymation'];
const filters = document.querySelector('.work-filters');
filters.innerHTML = '<button type="button" data-filter="all" aria-pressed="true">All work</button>' +
  groups.map((g,i) => `<button type="button" data-filter="${g.n}" aria-pressed="false">${filterLabels[i] || escapeHTML(g.t)}</button>`).join('');
function filterWork(value) {
  document.querySelectorAll('.category').forEach(section => {
    section.hidden = value !== 'all' && section.dataset.category !== value;
  });
  filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
  const count = groups.filter(g => value === 'all' || g.n === value).reduce((sum,g) => sum + g.v.length, 0);
  document.querySelector('.work-count').textContent = `${count} video${count === 1 ? '' : 's'}`;
  document.dispatchEvent(new Event('portfoliofilter'));
}
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (button) filterWork(button.dataset.filter);
});
filterWork('all');

// Native dialog provides keyboard focus trapping and Escape-to-close.
const contactDialog = document.querySelector('#contact');
let contactOpener;
document.querySelectorAll('[data-contact-open]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    if (contactDialog.open) return;
    contactOpener = trigger;
    contactDialog.showModal();
    document.body.classList.add('contact-open');
    document.dispatchEvent(new Event('portfoliofilter'));
  });
});
contactDialog.querySelector('.contact-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', event => {
  const rect = contactDialog.getBoundingClientRect();
  if (event.target === contactDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) contactDialog.close();
});
contactDialog.addEventListener('close', () => {
  document.body.classList.remove('contact-open');
  contactOpener?.focus({preventScroll:true});
});

const theme = document.querySelector('#theme');
function setTheme(light) {
  document.body.classList.toggle('light',light);
  theme.textContent = light ? '☾' : '☼';
  theme.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
try { setTheme(localStorage.getItem('portfolio-theme') === 'light'); } catch {}
theme.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  setTheme(light);
  try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch {}
});

/* YouTube hover previews: mouse only; touch devices use native tap controls. */
function setupHoverPreviews() {
  const mouseHover = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
  if (!mouseHover.matches) return;
  const states = [];
  function pause(state) {
    if (state.ready) { state.player.pauseVideo(); state.player.mute(); }
  }
  function preview(state) {
    if (!state.ready || !state.hovered || !mouseHover.matches || document.hidden) return;
    states.forEach(other => { if (other !== state) pause(other); });
    state.player.unMute();
    state.player.setVolume(100);
    state.player.playVideo();
  }
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        const state = states.find(item => item.card === entry.target);
        if (state) { state.hovered = false; pause(state); }
      }
    });
  }, { threshold: 0 });
  document.querySelectorAll('.video-card').forEach(card => {
    const frame = card.querySelector('iframe');
    if (!frame) return;
    const state = { card, frame, hovered: false, ready: false, player: null };
    states.push(state);
    card.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || !mouseHover.matches) return;
      state.hovered = true;
      preview(state);
    });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse') return;
      state.hovered = false;
      pause(state);
    });
    visibility.observe(card);
  });
  function connectPlayers() {
    states.forEach(state => {
      state.player = new window.YT.Player(state.frame, {
        events: {
          onReady: event => {
            state.player = event.target;
            state.ready = true;
            preview(state);
          }
        }
      });
    });
  }
  document.addEventListener('portfoliofilter', () => {
    states.forEach(state => { state.hovered = false; pause(state); });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) states.forEach(state => { state.hovered = false; pause(state); });
  });
  mouseHover.addEventListener('change', () => {
    if (!mouseHover.matches) states.forEach(state => { state.hovered = false; pause(state); });
  });
  if (window.YT?.Player) connectPlayers();
  else {
    window.onYouTubeIframeAPIReady = connectPlayers;
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  }
}
setupHoverPreviews();

