const groups=[
{n:'01',k:'VSL ',t:'VSL',d:'AI-assisted sales and performance creatives built around hooks, product storytelling, pacing, and conversion-focused visual sequences.',v:[['vsl-01.mp4','VSL Sample 01'],['vsl-02.mp4','VSL Sample 02']]},
{n:'02',k:'UGC / SOCIAL ADS',t:'AI UGC',d:'Creator-style vertical videos designed to feel native, conversational, realistic, and ready for TikTok, Reels, Shorts, and paid social.',v:[['ugc-01.mp4','UGC Sample 01'],['ugc-02.mp4','UGC Sample 02']]},
{n:'03',k:'STYLIZED 3D',t:'Pixar-Style AI Videos',d:'Character-driven stylized 3D storytelling with consistent art direction, cinematic framing, expressive motion, and scene continuity.',v:[['pixar-01.mp4','Stylized 3D Sample 01'],['pixar-02.mp4','Stylized 3D Sample 02'],['pixar-03.mp4','Stylized 3D Sample 03']]},
{n:'04',k:'ANIMATION',t:'Animated Storytelling',d:'Stylized narrative videos combining visual identity, character consistency, pacing, motion, and cinematic composition.',v:[['animation-01.mp4','The Nonchalant Man Nobody Can Read'],['animation-02.mp4','5 Signs That Reveal Who Someone Really Is']]},
{n:'05',k:'AI CONTENT',t:'Other AI Content',d:'Food, DIY, lifestyle, faceless, and educational short-form content produced with repeatable AI-assisted workflows.',v:[['other-01.mp4','3 Kitchen Hacks That Actually Work'],['other-02.mp4','Fridge Seal Foam Reset'],['other-03.mp4','2-Ingredient Bagels'],['other-04.mp4','Charcoal & Lemon Pan Miracle'],['other-05.mp4','Floor Cleaning Tips'],['other-06.mp4','Grilled Chicken Sandwich'],['other-07.mp4','2-Ingredient Apple Cider Donuts'],['other-08.mp4','4-Ingredient Dinner Blend']]}
];
const host=document.querySelector('#sections');
host.innerHTML=groups.map(g=>`<section class="category"><div class="wrap category-head reveal"><b>${g.n}</b><div><small>${g.k}</small><h3>${g.t}</h3></div><p>${g.d}</p></div><div class="wrap video-grid ${g.v.length>3?'many':''}">${g.v.map(([src,title],i)=>`<article class="video-card reveal"><div class="player"><div class="badge"><i></i>AUTOPLAY · MUTED</div><video muted autoplay loop playsinline controls preload="metadata" src="./videos/${src}" aria-label="${title}"></video></div><div class="video-meta"><small>${g.k.split('/')[0]}</small><b>${title}</b></div></article>`).join('')}</div></section>`).join('');
const allVideos=[...document.querySelectorAll('video')];

// All previews autoplay silently by default. They pause only when far off-screen.
const observer=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('show');
    if(e.target.tagName==='VIDEO'){
      e.target.muted=true;
      e.target.defaultMuted=true;
      e.target.play().catch(()=>{});
    }
  }else if(e.target.tagName==='VIDEO'){
    e.target.muted=true;
    e.target.pause();
  }
}),{threshold:.12,rootMargin:'120px 0px'});
document.querySelectorAll('.reveal,video').forEach(x=>observer.observe(x));

function muteOthers(active){
  allVideos.forEach(v=>{
    if(v!==active){
      v.muted=true;
      v.defaultMuted=true;
    }
  });
}

allVideos.forEach(v=>{
  v.muted=true;
  v.defaultMuted=true;
  v.volume=1;

  // Desktop: hover = sound on for this video only; leave = muted again.
  v.addEventListener('mouseenter',()=>{
    muteOthers(v);
    v.muted=false;
    v.volume=1;
    v.play().catch(()=>{});
  });
  v.addEventListener('mouseleave',()=>{
    v.muted=true;
  });

  // Touch/mobile fallback: tapping the video toggles sound for this video only.
  v.addEventListener('click',()=>{
    if(v.muted){
      muteOthers(v);
      v.muted=false;
      v.volume=1;
    }
  });
});
const theme=document.querySelector('#theme');theme.onclick=()=>{document.body.classList.toggle('light');theme.querySelector('span').textContent=document.body.classList.contains('light')?'Dark':'Light';theme.firstChild.textContent=document.body.classList.contains('light')?'☾ ':'☼ '};
