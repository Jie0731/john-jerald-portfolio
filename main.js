const groups=[
{
  n:'01',
  k:'VSL',
  t:'VSL',
  d:'AI-assisted video sales letters built around hooks, product storytelling, pacing, and conversion-focused visual sequences.',
  v:[
    ['vsl-01.mp4','VSL Sample 01'],
    ['vsl-02.mp4','VSL Sample 02'],
    ['vsl-03.mp4','VSL Sample 03'],
    ['vsl-04.mp4','VSL Sample 04']
  ]
},
{
  n:'02',
  k:'UGC / SOCIAL ADS',
  t:'AI UGC',
  d:'Creator-style vertical videos designed to feel native, conversational, realistic, and ready for TikTok, Reels, Shorts, and paid social.',
  v:[
    ['ugc-01.mp4','UGC Sample 01'],
    ['ugc-02.mp4','UGC Sample 02']
  ]
},
{
  n:'03',
  k:'STYLIZED 3D',
  t:'Pixar-Style AI Videos',
  d:'Character-driven stylized 3D storytelling with consistent art direction, cinematic framing, expressive motion, and scene continuity.',
  v:[
    ['pixar-01.mp4','Stylized 3D Sample 01'],
    ['pixar-02.mp4','Stylized 3D Sample 02'],
    ['pixar-03.mp4','Stylized 3D Sample 03']
  ]
},
{
  n:'04',
  k:'ANIMATION',
  t:'Animated Storytelling',
  d:'Stylized narrative videos combining visual identity, character consistency, pacing, motion, and cinematic composition.',
  v:[
    ['animation-01.mp4','The Nonchalant Man Nobody Can Read'],
    ['animation-02.mp4','5 Signs That Reveal Who Someone Really Is']
  ]
},
{
  n:'05',
  k:'AI CONTENT',
  t:'Other AI Content',
  d:'Food, DIY, lifestyle, faceless, and educational short-form content produced with repeatable AI-assisted workflows.',
  v:[
    ['other-01.mp4','3 Kitchen Hacks That Actually Work'],
    ['other-02.mp4','Fridge Seal Foam Reset'],
    ['other-03.mp4','2-Ingredient Bagels'],
    ['other-04.mp4','Charcoal & Lemon Pan Miracle'],
    ['other-05.mp4','Floor Cleaning Tips'],
    ['other-06.mp4','Grilled Chicken Sandwich'],
    ['other-07.mp4','2-Ingredient Apple Cider Donuts'],
    ['other-08.mp4','4-Ingredient Dinner Blend']
  ]
}
];

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

          <div class="badge">
            <i></i>
            AUTOPLAY · MUTED
          </div>

          <video
            muted
            autoplay
            loop
            playsinline
            controls
            controlsList="nodownload"
            disablePictureInPicture
            preload="metadata"
            src="./videos/${src}"
            aria-label="${title}">
          </video>

        </div>

        <div class="video-meta">
          <small>${g.k.split('/')[0]}</small>
          <b>${title}</b>
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
   Replays when scrolling away and back
   ========================================= */

const revealObserver=new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      requestAnimationFrame(()=>{
        entry.target.classList.add('show');
      });

      if(entry.target.classList.contains('category')){
        entry.target.classList.add('in-view');
      }

    }else{

      if(!entry.target.matches('video')){
        entry.target.classList.remove('show');
      }

      if(entry.target.classList.contains('category')){
        entry.target.classList.remove('in-view');
      }

    }

  });

},{
  threshold:.13,
  rootMargin:'0px 0px -7% 0px'
});

document
  .querySelectorAll('.reveal,.category')
  .forEach(el=>revealObserver.observe(el));



/* =========================================
   VIDEO AUTOPLAY
   Visible = play
   Offscreen = pause + mute
   ========================================= */

const allVideos=[
  ...document.querySelectorAll('video')
];

const videoObserver=new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

    const video=entry.target;

    if(entry.isIntersecting){

      video.muted=true;
      video.defaultMuted=true;

      video.play().catch(()=>{});

    }else{

      video.muted=true;
      video.pause();

    }

  });

},{
  threshold:.08,
  rootMargin:'180px 0px'
});

allVideos.forEach(video=>{
  videoObserver.observe(video);
});



/* =========================================
   VIDEO AUDIO
   Desktop:
   hover = unmute
   mouse leave = mute

   Mobile:
   tap = toggle sound
   ========================================= */

function muteOthers(active){

  allVideos.forEach(video=>{

    if(video!==active){
      video.muted=true;
      video.defaultMuted=true;
    }

  });

}


allVideos.forEach(video=>{

  video.muted=true;
  video.defaultMuted=true;
  video.volume=1;


  /* DESKTOP HOVER */

  video.addEventListener('mouseenter',()=>{

    muteOthers(video);

    video.muted=false;
    video.volume=1;

    video.play().catch(()=>{});

  });


  video.addEventListener('mouseleave',()=>{

    video.muted=true;

  });


  /* MOBILE / CLICK */

  video.addEventListener('click',()=>{

    if(video.muted){

      muteOthers(video);

      video.muted=false;
      video.volume=1;

      video.play().catch(()=>{});

    }else{

      video.muted=true;

    }

  });

});



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
