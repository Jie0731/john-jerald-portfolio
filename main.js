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
    ['https://youtube.com/shorts/xEsqEgKkH2M', 'VSL Sample 06']
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
    ['https://youtube.com/shorts/spEOiN7VWY8', 'UGC Sample 04']
  ]
},
{
  n:'03',
  k:'STYLIZED 3D',
  t:'Pixar-Style AI Videos',
  d:'Character-driven stylized 3D storytelling with consistent art direction, cinematic framing, expressive motion, and scene continuity.',
  v:[
    ['', 'Stylized 3D Sample 01'],
    ['', 'Stylized 3D Sample 02'],
    ['', 'Stylized 3D Sample 03']
  ]
},
{
  n:'04',
  k:'ANIMATION',
  t:'Animated Storytelling',
  d:'Stylized narrative videos combining visual identity, character consistency, pacing, motion, and cinematic composition.',
  v:[
    ['', 'The Nonchalant Man Nobody Can Read'],
    ['', '5 Signs That Reveal Who Someone Really Is']
  ]
},
  {
  n:'05',
  k:'CLAYMATION',
  t:'Claymation AI Videos',
  d:'Clay-style AI videos with handcrafted textures, expressive motion, stop-motion-inspired animation, and consistent visual storytelling.',
  v:[
    ['', 'Claymation Sample 01'],
    ['', 'Claymation Sample 02']
  ]
},
{
  n:'06',
  k:'AI CONTENT',
  t:'Other AI Content',
  d:'Food, DIY, lifestyle, faceless, and educational short-form content produced with repeatable AI-assisted workflows.',
  v:[
    ['', '3 Kitchen Hacks That Actually Work'],
    ['', 'Fridge Seal Foam Reset'],
    ['', '2-Ingredient Bagels'],
    ['', 'Charcoal & Lemon Pan Miracle'],
    ['', 'Floor Cleaning Tips'],
    ['', 'Grilled Chicken Sandwich'],
    ['', '2-Ingredient Apple Cider Donuts'],
    ['', '4-Ingredient Dinner Blend']
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
  return `<iframe src="${embed}" title="${escapeHTML(title)}"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

const host=document.querySelector('#sections');

host.innerHTML=groups.map(g=>`
<section class="category">

  <div class="wrap category-head reveal">
    <b>${g.n}</b>

    <div>
      <small>${g.k}</small>
      <h3>${g.t}</h3>
    </div>

    <p>${g.d}</p>
  </div>

  <div class="wrap video-grid ${g.v.length>3?'many':''}">

    ${g.v.map(([src,title],i)=>`
      <article
        class="video-card reveal"
        style="--delay:${i*100}ms">

        <div class="player">

          ${renderPlayer(src, title)}

        </div>

        <div class="video-meta">
          <small>${g.k.split('/')[0]}</small>
          <b>${escapeHTML(title)}</b>
        </div>

      </article>
    `).join('')}

  </div>

</section>
`).join('');


/* =========================================
   ASSEMBLY ANIMATION DIRECTIONS
   Corners / Left / Right -> Final Position
   ========================================= */

const heroCopy=document.querySelector('.hero-copy');
const portrait=document.querySelector('.portrait-wrap');

heroCopy?.classList.add('assemble-left');
portrait?.classList.add('assemble-right');


/* HERO BUTTONS */

document.querySelectorAll('.actions a').forEach((el,i)=>{
  el.classList.add('reveal');
  el.classList.add(
    i===0 ? 'assemble-bottom-left' : 'assemble-bottom-right'
  );
  el.style.setProperty('--delay',`${250+(i*120)}ms`);
});


/* STATS */

document.querySelectorAll('.stats > div').forEach((el,i)=>{

  el.classList.add('reveal');

  const directions=[
    'assemble-left',
    'assemble-top-left',
    'assemble-top-right',
    'assemble-right'
  ];

  el.classList.add(directions[i] || 'assemble-center');

  el.style.setProperty('--delay',`${i*90}ms`);
});


/* SECTION HEADINGS */

document.querySelectorAll('.section-head').forEach((el,i)=>{

  if(
    el.classList.contains('hero-copy')
  ) return;

  el.classList.add(
    i%2===0
      ? 'assemble-left'
      : 'assemble-right'
  );
});


/* ANALYTICS */

document.querySelectorAll('.analytics figure').forEach((el,i)=>{

  el.classList.add(
    i===0
      ? 'assemble-bottom-left'
      : 'assemble-bottom-right'
  );

  el.style.setProperty('--delay',`${i*130}ms`);
});


/* CATEGORY HEADINGS */

document.querySelectorAll('.category-head').forEach((el,i)=>{

  el.classList.add(
    i%2===0
      ? 'assemble-left'
      : 'assemble-right'
  );

});


/* VIDEO CARDS
   Cards alternate from all four corners
*/

document.querySelectorAll('.video-grid').forEach(grid=>{

  const cards=[...grid.querySelectorAll('.video-card')];

  const directions=[
    'assemble-bottom-left',
    'assemble-bottom-right',
    'assemble-top-left',
    'assemble-top-right'
  ];

  cards.forEach((card,i)=>{

    card.classList.add(
      directions[i%directions.length]
    );

    card.style.setProperty(
      '--delay',
      `${i*100}ms`
    );

  });

});


/* ABOUT */

document.querySelector('.about-grid')
  ?.classList.add('assemble-center');


/* ABOUT CHIPS */

document.querySelectorAll('.chips span').forEach((el,i)=>{

  el.classList.add('reveal');

  const directions=[
    'assemble-left',
    'assemble-top-left',
    'assemble-top-right',
    'assemble-right',
    'assemble-bottom-left',
    'assemble-bottom-right'
  ];

  el.classList.add(
    directions[i%directions.length]
  );

  el.style.setProperty(
    '--delay',
    `${i*55}ms`
  );

});


/* CONTACT CARDS */

document.querySelectorAll('.contact-grid a').forEach((el,i)=>{

  el.classList.add('reveal');

  const directions=[
    'assemble-bottom-left',
    'assemble-center',
    'assemble-bottom-right'
  ];

  el.classList.add(
    directions[i] || 'assemble-center'
  );

  el.style.setProperty(
    '--delay',
    `${i*110}ms`
  );

});


/* FULL PORTFOLIO BUTTON */

document.querySelector('.full-portfolio')
  ?.classList.add('assemble-center');



/* =========================================
   SCROLL REVEAL
   Plays once per element; stays visible when scrolling back
   ========================================= */

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    requestAnimationFrame(()=>{
      entry.target.classList.add('show');
      if (entry.target.classList.contains('category')) {
        entry.target.classList.add('in-view');
      }
    });
    // Keep revealed elements visible when scrolling back.
    revealObserver.unobserve(entry.target);
  });
},{
  threshold:.13,
  rootMargin:'0px 0px -7% 0px'
});

document
  .querySelectorAll('.reveal,.category')
  .forEach(el=>revealObserver.observe(el));



/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */

const nav=document.querySelector('.nav');

function updateNav(){

  if(window.scrollY>40){

    nav?.classList.add('scrolled');

  }else{

    nav?.classList.remove('scrolled');

  }

}

window.addEventListener(
  'scroll',
  updateNav,
  {passive:true}
);

updateNav();



/* =========================================
   SUBTLE MOUSE PARALLAX ON HERO
   Desktop only
   ========================================= */

const hero=document.querySelector('.hero');
const heroText=document.querySelector('.hero-copy');
const heroPortrait=document.querySelector('.portrait-wrap');

if(
  hero &&
  heroText &&
  heroPortrait &&
  window.matchMedia('(min-width:801px)').matches
){

  hero.addEventListener('mousemove',e=>{

    if(
      !heroText.classList.contains('show') ||
      !heroPortrait.classList.contains('show')
    ) return;

    const rect=hero.getBoundingClientRect();

    const x=
      (e.clientX-rect.left) /
      rect.width -.5;

    const y=
      (e.clientY-rect.top) /
      rect.height -.5;

    heroText.style.translate=
      `${x*8}px ${y*5}px`;

    heroPortrait.style.translate=
      `${x*-10}px ${y*-7}px`;

  });


  hero.addEventListener('mouseleave',()=>{

    heroText.style.translate='0 0';
    heroPortrait.style.translate='0 0';

  });

}



/* =========================================
   THEME TOGGLE
   ========================================= */

const theme=document.querySelector('#theme');

if(theme){

  theme.onclick=()=>{

    document.body.classList.toggle('light');

    const isLight=
      document.body.classList.contains('light');

    theme.querySelector('span').textContent=
      isLight ? 'Dark' : 'Light';

    theme.firstChild.textContent=
      isLight ? '☾ ' : '☼ ';

  };

}

/* Contact dialog: native focus trapping, Escape and trigger focus restoration */
const contactDialog = document.querySelector('#contact');
const contactTriggers = document.querySelectorAll('[data-contact-open]');
let contactOpener;
function openContacts(opener) {
  if (!contactDialog || contactDialog.open) return;
  contactOpener = opener;
  contactDialog.showModal();
  document.body.classList.add('contact-open');
}
contactTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openContacts(trigger);
  });
});
contactDialog?.querySelector('.contact-close')?.addEventListener('click', () => contactDialog.close());
contactDialog?.addEventListener('click', event => {
  const rect = contactDialog.getBoundingClientRect();
  if (event.target === contactDialog &&
      (event.clientX < rect.left || event.clientX > rect.right ||
       event.clientY < rect.top || event.clientY > rect.bottom)) contactDialog.close();
});
contactDialog?.addEventListener('close', () => {
  document.body.classList.remove('contact-open');
  contactOpener?.focus({ preventScroll: true });
});
// Contacts open only after an explicit click on Work with me.
