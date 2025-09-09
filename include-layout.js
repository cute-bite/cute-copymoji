
// === Remove "Add" menu from both desktop and mobile ===
function removeAddMenu(){
  try{
    // Desktop header (settings dropdown and any direct nav)
    document.querySelectorAll('[data-site-header] nav a[href$="add.html"], [data-site-header] .settings-menu a[href$="add.html"]').forEach(a=>{
      const li = a.closest('a, .settings-item, .settings-dropdown') || a;
      li.remove();
    });
    // Mobile cloned menu
    document.querySelectorAll('#mobileMenu a[href$="add.html"]').forEach(a=>{
      const li = a.closest('a, .settings-item, .settings-dropdown') || a;
      li.remove();
    });
  }catch(e){ /* no-op */ }
}

(function(){
  function replaceWithHTML(host, html){
    if(!host) return;
    host.innerHTML = html;
    host.replaceWith(...host.childNodes);
  }
const H_FALLBACK = `<!-- Locked Header (scoped) -->
<header data-site-header>
<style>
  :root{ --bg:#fff7fb; --card:#ffffff; --text:#301934; --muted:#6b6470; --accent:#ff8fcf; --accent-2:#ffb3d9; --chip:#ffe6f4; --border:#e8d7e2; --shadow:0 8px 24px rgba(0,0,0,.06); }
  .theme-pink{ --bg:#fff7fb; --card:#ffffff; --text:#301934; --muted:#6b6470; --accent:#ff8fcf; --accent-2:#ffb3d9; --chip:#ffe6f4; --border:#e8d7e2; }
  .theme-red{ --bg:#fff6f6; --card:#ffffff; --text:#2a0f12; --muted:#665055; --accent:#ff4d4d; --accent-2:#ffa5a5; --chip:#ffe8e8; --border:#f0caca; }
  .theme-sky{ --bg:#f6fbff; --card:#ffffff; --text:#0d1b2a; --muted:#4a5568; --accent:#8fd3ff; --accent-2:#bde3ff; --chip:#eaf5ff; --border:#d8e8ff; }
  .theme-green{ --bg:#f6fff7; --card:#ffffff; --text:#0f2414; --muted:#43604a; --accent:#8fe08f; --accent-2:#bfeec0; --chip:#eafbea; --border:#d3f0d5; }
  .theme-yellow{ --bg:#fffdf6; --card:#ffffff; --text:#2a2010; --muted:#665c49; --accent:#ffe38f; --accent-2:#ffefb9; --chip:#fff7e6; --border:#f3e3c7; }
  .theme-purple{ --bg:#fbf7ff; --card:#ffffff; --text:#251a3a; --muted:#5e5570; --accent:#c79bff; --accent-2:#e0cfff; --chip:#f1e8ff; --border:#e2d6ff; }
  .theme-peach{ --bg:#fff9f5; --card:#ffffff; --text:#3a2316; --muted:#6b5a50; --accent:#ffb38a; --accent-2:#ffd3ba; --chip:#fff1e6; --border:#ffdcca; }
  .theme-white{ --bg:#f8fafc; --card:#ffffff; --text:#0b1220; --muted:#4b5563; --accent:#5a48ff; --accent-2:#8ea6ff; --chip:#eef2ff; --border:#e5e7eb; }
  .theme-dark{ --bg:#0b0c0f; --card:#12141a; --muted:#c7c9d1; --text:#e9ebf1; --accent:#7c66ff; --accent-2:#9ea0ff; --chip:#1a1d25; --border:#2a2f3a; }

  /* === 다크 테마 글자색 자동 적용 === */
  .theme-dark body,
  .theme-dark .card,
  .theme-dark .emo,
  .theme-dark .meta,
  .theme-dark .example,
  .theme-dark .font-out,
  .theme-dark .dotart-result,
  .theme-dark .dot-card,
  .theme-dark .dot-card pre,
  .theme-dark .dotart-col h3,
  .theme-dark .dotart-controls .control-label,
  .theme-dark .fonts-grid,
  .theme-dark .fonts-input input {
    color: var(--text);
  }

  *{box-sizing:border-box}
  html, body{height:100%}
  html{scrollbar-gutter: stable}
  body{
    margin:0;background:var(--bg);color:var(--text);
    font:16px/1.5 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans", Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    overflow-y:scroll;
    -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
  }
  .container{max-width:1100px;margin:0 auto;padding:0 16px 0px}
  header{position:sticky;top:0;background:linear-gradient(to bottom, var(--bg) 75%, transparent);backdrop-filter:saturate(140%) blur(6px);z-index:40;padding:10px 0 3px}
  .topbar{position:relative;display:flex;flex-direction:column;gap:10px;align-items:center}

  .brand{display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center}
  .brand a{font-size:32px;font-weight:900;color:var(--accent);text-decoration:none;letter-spacing:.02em}
  .theme-white .brand a{color:#0b1220;}
  .theme-dark .brand a{color:#ffffff;}
  .subtitle{margin:0;color:var(--muted);font-size:12px}

  .menu{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center}
  .menu a{ border:1px solid transparent;background:transparent;color:var(--text);padding:8px 12px;border-radius:10px;transition:background .15s ease, border-color .15s ease, transform .04s ease; display:inline-flex;align-items:center;gap:8px; text-decoration:none; font-size:14px; }
  .menu a:hover, .menu a:focus-visible{ background:var(--chip); border-color:var(--border); transform:translateY(-1px); }
  .menu a.is-active{ background:var(--chip); border-color:var(--border); }

  .mi{width:18px;height:18px;flex:0 0 18px}
  .mi.big{width:36px;height:36px}
  .mi .fill{fill:var(--chip)}
  .mi .stroke{stroke:var(--accent);stroke-width:1.4;fill:none;stroke-linecap:round;stroke-linejoin:round}

  .toolbar{display:flex;justify-content:center;margin:14px 0}
  .search{position:relative;width:90%}
  .search input{width:100%;padding:12px 44px 12px 40px;border-radius:14px;border:1px solid var(--border);background:var(--card);color:var(--text);box-shadow:var(--shadow);outline:none}
  .search .icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);opacity:.7}
  .content{width:90%;margin:0 auto}

  .home-hero{padding:16px;border:1px solid var(--border);border-radius:16px;background:linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 8%, var(--bg)), var(--bg))}
  .home-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px}
  .home-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px; min-height:120px; padding:16px; background:var(--card); border:1px solid var(--border); border-radius:16px; box-shadow:var(--shadow); color:var(--text); cursor:pointer; transition:background .15s ease, border-color .15s ease, transform .06s ease; text-decoration:none;}
  .home-card .label{font-weight:700; font-size:14px}
  .home-card:hover{ background:var(--chip); border-color:var(--border); transform:translateY(-2px) }
  .home-card:active{ transform:translateY(0) }

  .theme-picker{display:flex;gap:8px;justify-content:center;margin-top:16px}
  .theme-btn{width:24px;height:24px;border-radius:50%;border:2px solid var(--border);cursor:pointer;transition:transform .1s ease}
  .theme-btn:hover{transform:scale(1.1)}
  .theme-btn[data-theme="pink"]{background:#ff8fcf}
  .theme-btn[data-theme="red"]{background:#ff4d4d}
  .theme-btn[data-theme="sky"]{background:#8fd3ff}
  .theme-btn[data-theme="green"]{background:#8fe08f}
  .theme-btn[data-theme="yellow"]{background:#ffe38f}
  .theme-btn[data-theme="purple"]{background:#c79bff}
  .theme-btn[data-theme="peach"]{background:#ffb38a}
  .theme-btn[data-theme="white"]{background:#ffffff;border-color:#cbd5e1}
  .theme-btn[data-theme="dark"]{background:#000000}

  /* === Theme color chips === */
  #themeDialog .palette{display:grid;grid-template-columns:repeat(9, 1fr);gap:10px}
  .chip-color{display:flex;align-items:center;justify-content:center;padding:10px;border-radius:12px;border:1px solid var(--border);background:var(--card)}
  .swatch{width:22px;height:22px;border-radius:999px;border:2px solid rgba(0,0,0,.08)}
  .chip-color[aria-selected="true"]{border-color:var(--accent)}
  .chip-color[data-theme="white"] .swatch{background:#ffffff; border:1px solid #cbd5e1}
  .chip-color[data-theme="dark"] .swatch{background:#000000; border:1px solid #000000}
  .chip-color[data-theme="pink"]   .swatch{ background:#ff8fcf; border-color:#e8d7e2; }
  .chip-color[data-theme="red"]    .swatch{ background:#ff4d4d; border-color:#f0caca; }
  .chip-color[data-theme="sky"]    .swatch{ background:#8fd3ff; border-color:#d8e8ff; }
  .chip-color[data-theme="green"]  .swatch{ background:#8fe08f; border-color:#d3f0d5; }
  .chip-color[data-theme="yellow"] .swatch{ background:#ffe38f; border-color:#f3e3c7; }
  .chip-color[data-theme="purple"] .swatch{ background:#c79bff; border-color:#e2d6ff; }
  .chip-color[data-theme="peach"]  .swatch{ background:#ffb38a; border-color:#ffdcca; }

  .toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%) translateY(40px);opacity:0;background:var(--card);border:1px solid var(--border);padding:12px 16px;border-radius:12px;box-shadow:var(--shadow);transition:all .25s ease;z-index:50;color:var(--text)}
  .toast.show{transform:translateX(-50%) translateY(0);opacity:1}

  dialog{border:none;padding:0;border-radius:16px;background:var(--card);color:var(--text);box-shadow:var(--shadow);width:min(520px,92vw);overflow-x:hidden}
  .modal-inner{padding:18px}
  .modal-grid{display:grid;gap:10px}
  .modal-grid input, .modal-grid select{padding:10px 12px;border-radius:12px;border:1px solid var(--border);background:var(--bg);color:var(--text)}
  .modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}

  .chip{background:var(--chip);border:1px solid var(--border);font-size:13px;border-radius:12px;padding:8px 12px;cursor:pointer;color:var(--text)}
  .chip.is-active{border-color:var(--accent); background:var(--chip)}

  /* Language selection dialog */
  .language-options{display:grid;grid-template-columns:repeat(2, 1fr);gap:10px}
  .language-option{display:flex;align-items:center;justify-content:center;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;transition:all .15s ease;font-size:14px}
  .language-option:hover{background:var(--chip);border-color:var(--accent)}
  .language-option[aria-selected="true"]{border-color:var(--accent);background:var(--chip)}

  .settings-dropdown{ position:relative; display:inline-block; }
  .settings-toggle{ border:1px solid transparent;background:transparent;color:var(--text);padding:8px 12px;border-radius:10px;transition:background .15s ease, border-color .15s ease, transform .04s ease; display:inline-flex;align-items:center;gap:8px; cursor:pointer;}
  .settings-toggle:hover, .settings-toggle:focus-visible{ background:var(--chip); border-color:var(--border); transform:translateY(-1px); }
  .settings-menu{ position:absolute; top:100%; left:50%; transform:translate(-50%, -8px); background:var(--card); border:1px solid var(--border); border-radius:12px; box-shadow:var(--shadow); padding:8px; min-width:160px; z-index:50; opacity:0; visibility:hidden; transition:all .2s ease; text-align:center; }
  .settings-dropdown:hover .settings-menu,
  .settings-dropdown:focus-within .settings-menu,
  .settings-dropdown.open .settings-menu{
  opacity:1; visibility:visible; transform:translate(-50%, 0);
  }
  .settings-menu a, .settings-item{ display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 12px; border-radius:8px; color:var(--text); text-decoration:none; border:none; background:transparent; width:100%; font-size:14px; cursor:pointer; transition:background .15s ease; }
  .settings-menu a:hover, .settings-item:hover{ background:var(--chip); }
  .settings-item{ font-family:inherit; }

  

  @media (max-width:1024px){ .home-cards{grid-template-columns:repeat(3,1fr)} }
  @media (max-width:768px){ .home-cards{grid-template-columns:repeat(2,1fr)} }
  @media (max-width:640px){ .home-cards{grid-template-columns:repeat(2,1fr)} }




  .menu a{ 
    border:1px solid transparent;
    background:transparent;
    color:var(--text);
    padding:8px 12px;
    border-radius:10px;
    transition:background .15s ease, border-color .15s ease, transform .04s ease; 
    display:inline-flex;
    align-items:center;
    gap:8px; 
    text-decoration:none; 
    font-size:14px;
    position: relative; /* 추가 */
    z-index: 1; /* 추가 */
  }
  
  /* dot art 메뉴 특별 처리 */
  .menu a[href="dotart.html"] {
    pointer-events: auto;
  }
  
  .menu a[href="dotart.html"] svg {
    pointer-events: none;
  }


  
/* Floating Buttons */
.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.float-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform 0.2s, background 0.2s;
}

.float-btn:hover {
  transform: scale(1.1);
  background: var(--accent-2);
}
  

.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.float-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform 0.2s, background 0.2s;
}

.float-btn:hover {
  transform: scale(1.1);
  background: var(--accent-2);
}


/* === 다크 테마: Emoticon / Line / Emoji 카드 색상 강제 적용 === */
.theme-dark .emo-card {
  background: var(--card) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}

.theme-dark .emo-card .emo-t,
.theme-dark .emo-card .fav-btn {
  color: var(--text) !important;
  background: transparent !important;
}


/* === 필터바 우측 그라데이션 제거 === */
.filters::after,
.filter-wrap::after {
  background: none !important;
  content: none !important;
}


/* 다크 테마에서 Shuffle 버튼 글자색을 흰색으로 */
.theme-dark .toolbar .btn {
  color: var(--text) !important;   /* --text는 다크 테마에서 흰색임 */
  background: var(--card);         /* 필요시 배경도 다크 테마 색상으로 */
  border-color: var(--border);
}

.theme-dark .toolbar .btn:hover {
  background: var(--chip);
  border-color: var(--border);
}


/* ===== Mobile menu (hamburger) ===== */
.hamburger{
  display:none;
  position:absolute; right:10px; top:10px;
  width:40px; height:40px; border-radius:10px;
  border:1px solid var(--border); background:var(--card); color:var(--text);
  align-items:center; justify-content:center; cursor:pointer;
  box-shadow: var(--shadow);
}
.hamburger:focus-visible,.hamburger:hover{ background:var(--chip); }

.mobile-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.4);
  opacity:0; visibility:hidden; transition:opacity .2s ease;
  z-index:60;
}
.mobile-menu{
  position:fixed; top:0; right:0; height:100%; width:min(86vw, 360px);
  background:var(--card); color:var(--text); border-left:1px solid var(--border);
  box-shadow: var(--shadow);
  transform: translateX(100%); opacity:.98; visibility:hidden;
  transition: transform .25s ease;
  z-index:70; display:flex; flex-direction:column; padding:12px;
}
.mobile-menu .mobile-head{
  display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;
}
.mobile-menu .close-btn{
  border:1px solid var(--border); background:var(--card); color:var(--text);
  border-radius:10px; padding:8px 10px; cursor:pointer;
}
.mobile-menu .menu{ display:flex; flex-direction:column; gap:6px; flex-wrap:nowrap; }
.mobile-menu .menu a{ justify-content:flex-start; font-size:16px; }
.mobile-menu .settings-menu{ position:static; transform:none; opacity:1; visibility:visible; box-shadow:none; border:none; padding:0; }
.mobile-menu .settings-dropdown{ width:100%; }

body.mobile-open .mobile-backdrop{ opacity:1; visibility:visible; }
body.mobile-open .mobile-menu{ transform: translateX(0); visibility:visible; }

/* breakpoint: 모바일에서는 상단 메뉴 숨기고 햄버거 표시 */
@media (max-width: 900px){
  nav.menu{ display:none; }
  .hamburger{ display:flex; }
}


/* === Mobile menu fixes: solid BG + proper dropdown === */
.mobile-backdrop{
  background: rgba(0,0,0,.55) !important; /* 더 진한 딤 처리 */
}

.mobile-menu{
  background: var(--card) !important;     /* 패널 불투명 배경 */
  color: var(--text) !important;
  border-left: 1px solid var(--border) !important;
  overflow: auto;                          /* 긴 메뉴 스크롤 */
  opacity: 1 !important;                   /* 반투명 느낌 제거 */
}

/* 모바일 패널 내 Settings를 '드롭다운'처럼 보이게 */
.mobile-menu .settings-dropdown{ width:100%; }
.mobile-menu .settings-toggle{
  width:100%; justify-content:space-between;
  border:1px solid var(--border); border-radius:10px;
  background: var(--card); color: var(--text);
}
.mobile-menu .settings-menu{
  position: relative !important;
  top:auto !important; left:auto !important;
  transform:none !important;
  opacity:1 !important; visibility:visible !important;
  display:none;                 /* 기본은 접힘 */
  background: transparent;      /* 패널 배경과 자연스럽게 */
  border:0; box-shadow:none; padding:6px 0;
  min-width: 0;
}
.mobile-menu .settings-dropdown.open .settings-menu{
  display:flex; flex-direction:column; gap:6px;
}
.mobile-menu .settings-menu a,
.mobile-menu .settings-menu .settings-item{
  justify-content:flex-start;
  background: var(--card); color: var(--text);
  border-radius:8px;
}

/* 다크 테마 대비 강화 (선택) */
.theme-dark .mobile-menu{ background:#12141a !important; }

/* ===== Mobile menu (hamburger) ===== */
.hamburger{
  display:none;
  position:absolute; right:10px; top:10px;
  width:40px; height:40px; border-radius:10px;
  border:1px solid var(--border); background:var(--card); color:var(--text);
  align-items:center; justify-content:center; cursor:pointer;
  box-shadow: var(--shadow);
}
.hamburger:focus-visible,.hamburger:hover{ background:var(--chip); }

.mobile-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.4);
  opacity:0; visibility:hidden; transition:opacity .2s ease;
  z-index:60;
}
.mobile-menu{
  position:fixed; top:0; right:0; height:100%; width:min(86vw, 360px);
  background:var(--card); color:var(--text); border-left:1px solid var(--border);
  box-shadow: var(--shadow);
  transform: translateX(100%); opacity:.98; visibility:hidden;
  transition: transform .25s ease;
  z-index:70; display:flex; flex-direction:column; padding:12px;
}
.mobile-menu .mobile-head{
  display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;
}
.mobile-menu .close-btn{
  border:1px solid var(--border); background:var(--card); color:var(--text);
  border-radius:10px; padding:8px 10px; cursor:pointer;
}
.mobile-menu .menu{ display:flex; flex-direction:column; gap:4px; flex-wrap:nowrap; }
.mobile-menu .menu a{ justify-content:flex-start; font-size:14px; padding:8px 12px; min-height:40px; }
.mobile-menu .settings-menu{ position:static; transform:none; opacity:1; visibility:visible; box-shadow:none; border:none; padding:0; }
.mobile-menu .settings-dropdown{ width:100%; }

body.mobile-open .mobile-backdrop{ opacity:1; visibility:visible; }
body.mobile-open .mobile-menu{ transform: translateX(0); visibility:visible; }

/* breakpoint: 모바일에서는 상단 메뉴 숨기고 햄버거 표시 */
@media (max-width: 900px){
  nav.menu{ display:none; }
  .hamburger{ display:flex; }
}


/* === Mobile menu fixes: solid BG + proper dropdown === */
.mobile-backdrop{
  background: rgba(0,0,0,.55) !important; /* 더 진한 딤 처리 */
}

.mobile-menu{
  background: var(--card) !important;     /* 패널 불투명 배경 */
  color: var(--text) !important;
  border-left: 1px solid var(--border) !important;
  overflow: auto;                          /* 긴 메뉴 스크롤 */
  opacity: 1 !important;                   /* 반투명 느낌 제거 */
}

/* 모바일 패널 내 Settings를 '드롭다운'처럼 보이게 */
.mobile-menu .settings-dropdown{ width:100%; }
.mobile-menu .settings-toggle{
  width:100%; justify-content:space-between;
  border:1px solid var(--border); border-radius:10px;
  background: var(--card); color: var(--text);
  padding:8px 12px; min-height:40px; font-size:14px;
}
.mobile-menu .settings-menu{
  position: relative !important;
  top:auto !important; left:auto !important;
  transform:none !important;
  opacity:1 !important; visibility:visible !important;
  display:none;                 /* 기본은 접힘 */
  background: transparent;      /* 패널 배경과 자연스럽게 */
  border:0; box-shadow:none; padding:4px 0;
  min-width: 0;
}
.mobile-menu .settings-dropdown.open .settings-menu{
  display:flex; flex-direction:column; gap:4px;
}
.mobile-menu .settings-menu a,
.mobile-menu .settings-menu .settings-item{
  justify-content:flex-start;
  background: var(--card); color: var(--text);
  border-radius:8px;
  padding:6px 12px; min-height:36px; font-size:14px;
}

/* 다크 테마 대비 강화 (선택) */
.theme-dark .mobile-menu{ background:#12141a !important; }


/* === Mobile menu polish: edge artifact + settings text align === */

/* 좌측 끝에 보이는 회색 네모칸 제거(패널 외곽 보더/쉐도우/클리핑 보정) */
.mobile-menu{
  border-left: none !important;
  box-shadow: none !important;
  clip-path: inset(0 0 0 0) !important; /* 일부 브라우저의 한 픽셀 틈새 방지 */
}

/* 패널 내부 항목은 항상 좌측 정렬 */
.mobile-menu .menu,
.mobile-menu .menu a,
.mobile-menu .settings-menu,
.mobile-menu .settings-menu a,
.mobile-menu .settings-menu .settings-item{
  text-align: left !important;
  justify-content: flex-start !important;
}

/* 드롭다운 버튼(톱니)도 좌측 기반 정렬 */
.mobile-menu .settings-toggle{
  text-align: left !important;
  justify-content: space-between !important; /* 라벨-아이콘 간격은 유지 */
}

/* 포커스시 파란 외곽선/밑줄로 보이는 아티팩트 제거 (접근성 고려해 box-shadow로 대체) */
.mobile-menu .menu a:focus{
  outline: none !important;
  text-decoration: none !important;
  box-shadow: 0 0 0 2px var(--border) inset !important;
}


/* 1) 데스크톱에서는 모바일 패널을 아예 렌더링에서 제외 */
@media (min-width: 901px){
  #mobileMenu,
  #mobileBackdrop{
    display: none !important;
  }
}

/* 2) 혹시 남는 1px 누수를 원천 차단 (모바일/데스크톱 공통 안전벨트) */
html, body{
  overflow-x: hidden;   /* 가로 스크롤 봉인 */
}


/* 모바일 패널 너비를 고정 px로 한정(모바일에만 적용) */
@media (max-width: 900px){
  #mobileMenu{
    width: 360px !important;     /* 86vw 대신 고정 */
    max-width: 92vw !important;  /* 혹시 매우 작은 화면 예외 */
  }
}

html, body{ overflow-x: hidden; }


/* === Mobile: Theme 팔레트 2줄 레이아웃 === */
@media (max-width: 640px){
  /* 다이얼로그 내 팔레트: 5열 → 총 9개가 5+4로 2줄 배치 */
  #themeDialog .palette{
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
  }
  /* 칩과 스와치 크기 살짝 줄여서 좁은 화면에서도 딱 맞게 */
  #themeDialog .chip-color{ padding: 8px; }
  #themeDialog .swatch{ width: 18px; height: 18px; }
}

/* 초협소 화면(≤360px) 보정: 여백을 조금 더 줄여 가독성 유지 */
@media (max-width: 360px){
  #themeDialog .palette{ gap: 6px; }
  #themeDialog .chip-color{ padding: 6px; }
  #themeDialog .swatch{ width: 16px; height: 16px; }
}

/* 헤더 상단의 가로 테마 버튼 묶음도 필요 시 2줄로 자동 줄바꿈 */
@media (max-width: 640px){
  .theme-picker{
    flex-wrap: wrap;
    row-gap: 8px; /* 줄 간격 */
  }
}




</style>

<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>


<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png?v=2">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png?v=2">
<link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48.png?v=2">
<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png?v=2">
<link rel="apple-touch-icon" href="apple-touch-icon.png?v=2">
<link rel="manifest" href="site.webmanifest?v=2">

<meta name="theme-color" content="#ff8fcf">




</head>
<body class="theme-pink">
<div class="container">
  <header>
    <div class="topbar">
      <div class="brand">
        <a href="index.html">Cute CopyMoji</a>
        <div class="subtitle">Free Online Emoji Keyboard ☀️ – Copy & Paste Emojis for Social Media in One Click!</div>
      </div>

      <nav class="menu" aria-label="Primary">
        <a href="/">
          <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
  <path class="fill" d="M4 11.5l8-6 8 6V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z"></path>
  <path class="stroke" d="M4 11.5l8-6 8 6M9 21v-6h6v6"></path>
</svg>
          <span class="menu-label">Home
        </span></a>
        <a href="/">
          <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
  <circle class="fill" cx="12" cy="12" r="9"></circle>
  <circle class="stroke" cx="9" cy="10" r="1"></circle>
  <circle class="stroke" cx="15" cy="10" r="1"></circle>
  <path class="stroke" d="M8 14c1.2 1.2 6.8 1.2 8 0"></path>
  <circle class="stroke" cx="12" cy="12" r="9"></circle>
</svg>
          <span class="menu-label">Emoticon
        </span></a>

        <a href="/">
  <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
    <!-- Line 아이콘 예시: 채팅 말풍선 모양 -->
    <path class="fill" d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
    <path class="stroke" d="M2 18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14z"></path>
  </svg>
  <span class="menu-label">Line</span>
</a>

<!-- emoji -->
<a href="/">
  <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill" d="M12.1 21.35l-1.1-.99C5.14 15.36 2 12.54 2 9.28 2 6.5 4.24 4.25 7 4.25c1.54 0 3.04.73 4 1.87 0 0 2.46-3.12 6-1.37 1.2.57 2 1.86 2 3.28 0 3.26-3.14 6.08-8.9 11.08l-1 0.94z"></path>
    <path class="stroke" d="M12 20s-5.5-3.5-8-6.7C1.6 11 .9 8.7 2.2 6.9 3.8 4.7 7 4.3 8.9 6.1L12 9.1l3.1-3c1.9-1.8 5.1-1.4 6.7.8 1.3 1.8.6 4.1-1.8 6.4C17.5 16.5 12 20 12 20z"></path>
  </svg>
  <span class="menu-label">Emoji</span>
</a>



        <a href="/">
          <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
            <g class="stroke">
              <rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke-width="1.4"></rect>
              <rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke-width="1.4"></rect>
              <rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke-width="1.4"></rect>
              <rect x="14" y="14" width="6" height="6" rx="1" fill="none" stroke-width="1.4"></rect>
            </g>
          </svg>
          <span class="menu-label">Dot Art</span>
        </a>


<!-- fonts -->
<a href="/" class="menu-item">
  <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill" d="M3 18h18v2H3z"></path>
    <path class="stroke" d="M8 16l4-10 4 10M9.5 12h5M6 16h12"></path>
  </svg>
  <span class="menu-label" data-i18n="fonts">Fonts</span>
</a>

<!-- username -->
<a href="/" class="menu-item">
  <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill" d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z"></path>
    <path class="fill" d="M4 20c0-2.66 5.33-4 8-4s8 1.34 8 4v2H4v-2z"></path>
    <path class="stroke" d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 8c0-2.66 5.33-4 8-4s8 1.34 8 4"></path>
  </svg>
  <span class="menu-label" data-i18n="username">Username</span>
</a>

<!-- favorites -->
<a href="/" class="menu-item">
  <svg class="mi" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill" d="M12 4l2.5 5.1 5.6.8-4.05 3.95.96 5.55L12 16.9 6.99 19.4l.96-5.55L3.9 9.9l5.6-.8L12 4z"></path>
    <path class="stroke" d="M12 4l2.5 5.1 5.6.8-4.05 3.95.96 5.55L12 16.9 6.99 19.4l.96-5.55L3.9 9.9l5.6-.8L12 4z"></path>
  </svg>
  <span class="menu-label" data-i18n="favorites">Favorites</span>
</a>


        <div class="settings-dropdown">
          <button class="settings-toggle" aria-label="Settings">
            <svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path class="fill" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path class="stroke" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path></svg>
            <span class="menu-label">Settings
          </span></button>
          <div class="settings-menu">
            <!-- ✅ Settings 안의 Favorites는 원래부터 제거 상태 유지 -->
            <a href="/">
              <svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><rect class="fill" x="4" y="4" width="16" height="16" rx="4"></rect><path class="stroke" d="M12 8v8M8 12h8"></path></svg>
             <span class="menu-label">Add
            </span></a>
            <button id="menuTheme" class="settings-item" aria-label="Theme picker">
              <svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><circle class="fill" cx="12" cy="12" r="9"></circle><path class="stroke" d="M12 2v20M2 12h20"></path></svg>
             <span class="menu-label">Theme
            </span></button>
            <button class="settings-item" id="languageToggle" aria-label="Language">
              <svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path class="fill" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.01-4.65.64-6.7-.17-.25-.35-.49-.56-.7l-.01-.01-.01-.01c-.2-.2-.45-.39-.7-.56-2.05-1.37-4.76-1.1-6.7.64l-.03.03-2.51 2.54c-.18.18-.18.47 0 .65l.03.03c.18.18.47.18.65 0l2.51-2.54c1.74-1.94 4.65-2.01 6.7-.64.25.17.49.35.7.56.2.2.39.45.56.7 1.37 2.05 1.1 4.76-.64 6.7l-.03.03 2.51 2.54c.18.18.18.47 0 .65l-.03.03c-.18.18-.47.18-.65 0z"></path><path class="stroke" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.01-4.65.64-6.7-.17-.25-.35-.49-.56-.7l-.01-.01-.01-.01c-.2-.2-.45-.39-.7-.56-2.05-1.37-4.76-1.1-6.7.64l-.03.03-2.51 2.54c-.18.18-.18.47 0 .65l.03.03c.18.18.47.18.65 0l2.51-2.54c1.74-1.94 4.65-2.01 6.7-.64.25.17.49.35.7.56.2.2.39.45.56.7 1.37 2.05 1.1 4.76-.64 6.7l-.03.03 2.51 2.54c.18.18.18.47 0 .65l-.03.03c-.18.18-.47.18-.65 0z"></path></svg>
             <span class="menu-label">Language
            </span></button>
</div>
        </div>
      </nav>


      <!-- Mobile hamburger button (top-right) -->
<button id="hamburger" class="hamburger" aria-label="Open menu" aria-controls="mobileMenu" aria-expanded="false">≡</button>

<!-- Mobile menu & backdrop -->
<div id="mobileBackdrop" class="mobile-backdrop" hidden></div>
<nav id="mobileMenu" class="mobile-menu" aria-label="Mobile menu" hidden>
  <div class="mobile-head">
    <strong>Menu</strong>
    <button id="mobileClose" class="close-btn" aria-label="Close menu">✕</button>
  </div>
  <!-- 여기 안에 데스크톱 nav.menu의 내용이 JS로 그대로 복제됩니다 -->
  <div class="mobile-menu-inner"></div>
</nav>


      <!-- Theme picker dialog -->
<dialog id="themeDialog" aria-label="Choose theme">
  <div class="modal-inner">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-weight:700">Theme</div>
      <button id="closeTheme" class="chip" title="Close">✕</button>
    </div>
    <div class="palette" role="listbox" aria-label="Theme palette">
      <button class="chip-color" role="option" data-theme="pink"  aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="red"   aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="sky"   aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="green" aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="yellow" aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="purple" aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="peach" aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="white" aria-selected="false"><span class="swatch"></span></button>
      <button class="chip-color" role="option" data-theme="dark" aria-selected="false"><span class="swatch"></span></button>
    </div>
  </div>
</dialog>

<!-- Language selection dialog -->
<dialog id="languageDialog" aria-label="Choose language">
  <div class="modal-inner">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-weight:700">Language</div>
      <button id="closeLanguage" class="chip" title="Close">✕</button>
    </div>
    <div class="language-options" role="listbox" aria-label="Language options">
      <button class="language-option" role="option" data-lang="ko" aria-selected="false">한국어</button>
      <button class="language-option" role="option" data-lang="en" aria-selected="false">English</button>
      <button class="language-option" role="option" data-lang="ja" aria-selected="false">日本語</button>
      <button class="language-option" role="option" data-lang="es" aria-selected="false">Español</button>
      <button class="language-option" role="option" data-lang="pt" aria-selected="false">Português</button>
      <button class="language-option" role="option" data-lang="de" aria-selected="false">Deutsch</button>
      <button class="language-option" role="option" data-lang="fr" aria-selected="false">Français</button>
    </div>
  </div>
</dialog>






    
  </header>`;

  

  const F_FALLBACK = `<!-- Locked Footer (scoped) -->
<footer data-site-footer>
  <style>
    [data-site-footer]{margin-top:52px;padding:20px 0;text-align:center;background:var(--card,#fff);border-top:1px solid var(--border,#e8d7e2);color:var(--muted,#6b6470);font-size:10px}
    [data-site-footer] .footer-links{margin-bottom:8px}
    [data-site-footer] .footer-links a{margin:0 10px;color:var(--text,#301934);text-decoration:none;transition:color .2s}
    [data-site-footer] .footer-links a:hover{color:var(--accent,#ff8fcf)}
    [data-site-footer] .footer-copy{color:var(--muted,#6b6470);font-size:10px}


    /* ===== Mobile menu visual fixes ===== */

/* 2) 좌측 회색 여백(1px 라인/쉐도우) 제거 */
.mobile-menu{
  border-left: none !important;
  box-shadow: none !important;
  clip-path: inset(0 0 0 0) !important; /* 일부 브라우저 테두리 틈 방지 */
}

/* 3) 세팅 '토글 버튼'은 원래처럼 좌측 정렬 */
.mobile-menu .settings-toggle{
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-start !important;  /* ← 왼쪽 정렬 */
  text-align:left !important;
  gap: 10px !important;
}

/* 4) 세팅 하위 메뉴 항목(테마/언어)에 테두리/버튼 스타일 부여 */
.mobile-menu .settings-menu{
  position: relative !important;
  top:auto !important; left:auto !important; transform:none !important;
  opacity:1 !important; visibility:visible !important;
  display:none;
  background: transparent; border:0; box-shadow:none; padding:6px 0; min-width:0;
}
.mobile-menu .settings-dropdown.open .settings-menu{
  display:flex; flex-direction:column; gap:6px;
}
.mobile-menu .settings-menu a,
.mobile-menu .settings-menu .settings-item{
  display:flex; align-items:center; justify-content:flex-start;
  min-height: 40px; padding: 10px 12px;
  border: 1px solid var(--border) !important;   /* ← 테두리 */
  border-radius: 8px !important;
  background: var(--card) !important;
  color: var(--text) !important;
  text-decoration: none !important;
}

/* === 모바일 세팅 메뉴 토글을 좌측 정렬로 변경 === */
.mobile-menu .settings-toggle {
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-start !important;  /* ← 왼쪽 정렬 */
  text-align: left !important;
  gap: 10px !important;
  width: 100% !important;
  padding: 10px 12px !important;
  border: 1px solid var(--border) !important;
  border-radius: 10px !important;
  background: var(--card) !important;
  color: var(--text) !important;
}

/* ID Suggestions 결과 영역: 다크모드 대응 */
.theme-dark #usernameOut,
.theme-dark .username-result,
.theme-dark .username-card,
.theme-dark .id-card,
.theme-dark .id-output,
.theme-dark .result-box,
.theme-dark .font-out {
  background: var(--card) !important;   /* 다크모드 카드색상 사용 */
  color: var(--text) !important;        /* 글자색도 다크모드 색상 */
  border-color: var(--border) !important;
}

/* 입력창 같은 폼 요소도 통일 */
.theme-dark .username-input input,
.theme-dark .username-input textarea {
  background: var(--bg) !important;     /* 다크모드 배경색 */
  color: var(--text) !important;
  border-color: var(--border) !important;
}




  </style>


    
  <div class="footer-links">
    <a href="/">Privacy Policy</a>
    <a href="/">Terms of Service</a>
    <a href="/">Contact</a>
  </div>
  <div class="footer-copy">© 2025 Cute CopyMoji. All rights reserved.</div>

<!-- Floating Buttons -->
<div class="floating-buttons">
  <button id="btnTop" class="float-btn" title="top">
    ⬆
  </button>
  <button id="btnShare" class="float-btn" title="share">
    🔗
  </button>

</div>


</footer>`;

  async function inject(sel, url, fallbackHTML){
    const host = document.querySelector(sel);
    if(!host) return;
    try {
      const res = await fetch(url, {cache:'no-store'});
      if(!res.ok) throw new Error(res.status);
      const text = await res.text();
      replaceWithHTML(host, text);
    } catch(e) {
      replaceWithHTML(host, fallbackHTML);
    }
  }



  function wireSettingsDropdown(){
  const dd  = document.querySelector('[data-site-header] .settings-dropdown');
  const btn = dd?.querySelector('.settings-toggle');
  const menu= dd?.querySelector('.settings-menu');
  if (!dd || !btn || !menu) return;

  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', dd.classList.contains('open') ? 'true' : 'false');
  });

  document.addEventListener('click', (e)=>{
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      btn.blur();
    }
  });

   // 테마 변경
  function applyTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('emo.theme.v19', theme);
    document.querySelectorAll('.chip-color').forEach(btn => {
      btn.setAttribute('aria-selected', btn.dataset.theme === theme);
    });
  }

  // 테마 다이얼로그 이벤트 (안전 바인딩)
  const $ = (sel) => document.querySelector(sel);
  const on = (sel, evt, fn) => { const el = $(sel); if (el) el.addEventListener(evt, fn); };

  document.querySelectorAll('.chip-color').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      const dlg = $('#themeDialog'); if (dlg) dlg.close();
      showToast(`Theme: ${theme}`);
    });
  });

  on('#closeTheme', 'click', () => { const d = $('#themeDialog'); if (d) d.close(); });
  on('#themeDialog', 'click', (e) => { const d = $('#themeDialog'); if (e.target === d) d.close(); });
  on('#menuTheme', 'click', () => { const d = $('#themeDialog'); if (d) d.showModal(); });

  // 저장된 테마 적용
  const savedTheme = localStorage.getItem('emo.theme.v19') || 'pink';
  applyTheme(savedTheme);

  // 토스트 메시지
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1100);
  }

  
  // 언어 번역 리소스 (정상 객체)
  const languages = {
    en: { home:'Home', emoticon:'Emoticon', line:'Line', emoji:'Emoji', ascii:'ASCII', fonts:'Fonts', dotart:'Dot Art', username:'ID Suggestions', favorites:'Favorites', add:'Add', theme:'Theme', language:'Language', inquiry:'Inquiry', settings:'Settings', quickAccess:'Quick Access', searchPlaceholder:'Search emoticons… (Enter to open Emoticon)', subtitle:'Free Online Emoji Keyboard ☀️ – Copy & Paste Emojis for Social Media in One Click!' },
    ko: { home:'홈', emoticon:'이모티콘', line:'라인', emoji:'이모지', ascii:'ASCII', fonts:'폰트', dotart:'도트/아스키', username:'아이디메이커', favorites:'즐겨찾기', add:'추가', theme:'테마', language:'언어', inquiry:'문의', settings:'설정', quickAccess:'빠른 접근', searchPlaceholder:'이모티콘 검색… (Enter로 이모티콘 열기)', subtitle:'무료 이모지 키보드 온라인 ☀️ – 소셜 미디어 이모지 복사·붙여넣기 한 번에!' },
    ja: { home:'ホーム', emoticon:'顔文字', line:'ライン', emoji:'絵文字', ascii:'ASCII', fonts:'フォント', dotart:'ドット/アスキー', username:'IDおすすめ', favorites:'お気に入り', add:'追加', theme:'テーマ', language:'言語', inquiry:'お問い合わせ', settings:'設定', quickAccess:'クイックアクセス', searchPlaceholder:'顔文字を検索… (Enterで開く)', subtitle:'無料絵文字キーボードオンライン ☀️ – SNS用絵文字をワンクリックでコピー＆ペースト！' },
    es: { home:'Inicio', emoticon:'Emoticonos', line:'Línea', emoji:'Emoji', ascii:'ASCII', fonts:'Fuentes', dotart:'Arte de Puntos', username:'ID Bonito', favorites:'Favoritos', add:'Añadir', theme:'Tema', language:'Idioma', inquiry:'Consulta', settings:'Ajustes', quickAccess:'Acceso rápido', searchPlaceholder:'Buscar emoticonos… (Enter para abrir Emoticon)', subtitle:'Teclado de Emojis Gratis en Línea ☀️ – Copia y Pega Emojis para Redes Sociales Fácilmente' },
    pt: { home:'Início', emoticon:'Emoticons', line:'Linha', emoji:'Emoji', ascii:'ASCII', fonts:'Fontes', dotart:'Arte em Pontos', username:'ID Bonito', favorites:'Favoritos', add:'Adicionar', theme:'Tema', language:'Idioma', inquiry:'Contato', settings:'Configurações', quickAccess:'Acesso rápido', searchPlaceholder:'Buscar emoticons… (Enter para abrir Emoticon)', subtitle:'Teclado de Emojis Grátis Online ☀️ – Copiar e Colar Emojis para Redes Sociais em um Clique' },
    de: { home:'Start', emoticon:'Emoticons', line:'Linie', emoji:'Emoji', ascii:'ASCII', fonts:'Schriftarten', dotart:'Punktkunst', username:'ID Vorschläge', favorites:'Favoriten', add:'Hinzufügen', theme:'Thema', language:'Sprache', inquiry:'Anfrage', settings:'Einstellungen', quickAccess:'Schnellzugriff', searchPlaceholder:'Emoticons suchen… (Enter zum Öffnen)', subtitle:'Kostenlose Online-Emoji-Tastatur ☀️ – Emojis für Soziale Medien Einfach Kopieren & Einfügen' },
    fr: { home:'Accueil', emoticon:'Émoticônes', line:'Ligne', emoji:'Emoji', ascii:'ASCII', fonts:'Polices', dotart:'Art en points', username:"ID Joli", favorites:'Favoris', add:'Ajouter', theme:'Thème', language:'Langue', inquiry:'Contact', settings:'Paramètres', quickAccess:'Accès rapide', searchPlaceholder:'Rechercher des émoticônes… (Entrée pour ouvrir Emoticon)', subtitle:'Clavier Emoji Gratuit en Ligne ☀️ – Copier-Coller des Emojis pour Réseaux Sociaux en Un Clic' }
  };

// Injected: localized short/full labels for Dot/ASCII
try{
  languages.en.dotascii = 'Dot/ASCII';
  languages.en.dotasciiFull = 'Dot/ASCII Art';
  // Other languages keep default L.dotart for full; add short if needed
  languages.ko.dotascii = '도트/아스키';
  languages.ja.dotascii = 'ドット/アスキー';
  languages.es.dotascii = 'Dot/ASCII';
  languages.pt.dotascii = 'Dot/ASCII';
  languages.de.dotascii = 'Dot/ASCII';
  languages.fr.dotascii = 'Dot/ASCII';
}catch(e){}



// Injected: localized short label for Dot/ASCII in top nav
try{
  languages.en.dotascii = 'Dot/ASCII';
  languages.ko.dotascii = '도트/아스키';
  languages.ja.dotascii = 'ドット/アスキー';
  languages.es.dotascii = 'Dot/ASCII';
  languages.pt.dotascii = 'Dot/ASCII';
  languages.de.dotascii = 'Dot/ASCII';
  languages.fr.dotascii = 'Dot/ASCII';
}catch(e){/* no-op */}


  let currentLang = localStorage.getItem('emo.language') || 'en';

  // Portuguese-specific short labels for top menu only (to prevent wrapping)
  const ptShort = { home:'Início', emoticon:'Emot.', emoji:'Emoji', ascii:'ASCII', fonts:'Fontes', dotart:'Pontos', username:'ID Bonito', favorites:'Favoritos', settings:'Config.', theme:'Tema', language:'Idioma', inquiry:'Contato' };

  // 언어 적용: 메뉴 라벨/홈 타이틀/검색 placeholder/서브타이틀만 변경
  function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('emo.language', lang);
    const L = languages[lang] || languages['en'];
    const useShort = (lang === 'pt') ? ptShort : null;

    // 메뉴 라벨만 교체 (SVG 보존) — top nav only
    document.querySelectorAll('nav.menu a, nav.menu button, .settings-menu a, .settings-menu button, #mobileMenu a, #mobileMenu button').forEach(el => {
      const span = el.querySelector('.menu-label');
      if (!span) return;
      const href = el.getAttribute('href') || '';
      const id = el.getAttribute('id') || '';
      if (href.endsWith('index.html')) span.textContent = (useShort?.home || L.home);
      else if (href.endsWith('emoticon.html')) span.textContent = (useShort?.emoticon || L.emoticon);
      else if (href.endsWith('line.html')) span.textContent = (useShort?.line || L.line);
      else if (href.endsWith('emoji.html')) span.textContent = (useShort?.emoji || L.emoji);
      else if (href.endsWith('ascii.html')) span.textContent = (useShort?.ascii || L.ascii);
      else if (href.endsWith('dotart.html')) span.textContent = (useShort?.dotascii || L.dotascii || L.dotart);
      else if (href.endsWith('fonts.html')) span.textContent = (useShort?.fonts || L.fonts);
      else if (href.endsWith('username.html')) span.textContent = (useShort?.username || L.username);
      else if (href.endsWith('favorites.html')) span.textContent = (useShort?.favorites || L.favorites);
      else if (href.endsWith('add.html'))      span.textContent = (useShort?.add || L.add);
      else if (id === 'menuTheme') span.textContent = (useShort?.theme || L.theme);
      else if (id === 'languageToggle') span.textContent = (useShort?.language || L.language);
      else if (id === 'inquiryBtn') span.textContent = (useShort?.inquiry || L.inquiry);
      else if (!href && el.classList.contains('settings-toggle')) span.textContent = (useShort?.settings || L.settings);
    });

    // 홈 카드 라벨 — always full text (no abbreviation)
    document.querySelectorAll('.home-card').forEach(card => {
      const href = card.getAttribute('href') || '';
      const label = card.querySelector('.label');
      if (!label) return;
      if (href.endsWith('index.html')) label.textContent = L.home;
      else if (href.endsWith('emoticon.html')) label.textContent = L.emoticon;
      else if (href.endsWith('line.html')) label.textContent = L.line;
      else if (href.endsWith('emoji.html')) label.textContent = L.emoji;
      else if (href.endsWith('ascii.html')) label.textContent = L.ascii;
      else if (href.endsWith('dotart.html')) label.textContent = (L.dotasciiFull || L.dotart);
      else if (href.endsWith('fonts.html')) label.textContent = L.fonts;
      else if (href.endsWith('username.html')) label.textContent = L.username;
      else if (href.endsWith('favorites.html')) label.textContent = L.favorites;
    });

    // 기타 텍스트 (Fonts 예제/결과는 건드리지 않음)
    const h2 = document.querySelector('.home-hero h2'); if (h2) h2.textContent = L.quickAccess;
    const inp = document.querySelector('#homeQ'); if (inp) inp.placeholder = L.searchPlaceholder;
    const sub = document.querySelector('.subtitle'); if (sub) sub.textContent = L.subtitle;
  }

  // 언어 다이얼로그 open/close & 선택
  on('#languageToggle', 'click', () => { const d = document.getElementById('languageDialog'); if (d) d.showModal(); });
  on('#closeLanguage', 'click', () => { const d = document.getElementById('languageDialog'); if (d) d.close(); });
  on('#languageDialog', 'click', (e) => { const d = document.getElementById('languageDialog'); if (e.target === d) d.close(); });
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      changeLanguage(lang);
      document.querySelectorAll('.language-option').forEach(x => x.setAttribute('aria-selected', x === btn ? 'true' : 'false'));
      const d = document.getElementById('languageDialog'); if (d) d.close();
      showToast('Language: ' + lang);
    });
  });

  // Inquiry
  on('#inquiryBtn', 'click', () => { showToast('Inquiry feature coming soon!'); });

  // 초기 적용
  changeLanguage(currentLang); 
}
// ⬆⬆ 여기까지 추가 ⬆⬆







// === Remove "Add" menu from both desktop and mobile ===
function removeAddMenu(){
  try{
    // Desktop header (settings dropdown and any direct nav)
    document.querySelectorAll('[data-site-header] nav a[href$="add.html"], [data-site-header] .settings-menu a[href$="add.html"]').forEach(a=>{
      const li = a.closest('a, .settings-item, .settings-dropdown') || a;
      li.remove();
    });
    // Mobile cloned menu
    document.querySelectorAll('#mobileMenu a[href$="add.html"]').forEach(a=>{
      const li = a.closest('a, .settings-item, .settings-dropdown') || a;
      li.remove();
    });
  }catch(e){ /* no-op */ }
}


Promise.all([
  inject('#app-header','./header.html', H_FALLBACK),
  inject('#app-footer','./footer.html', F_FALLBACK)
]).then(function(){
  // Active state 표시
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-site-header] nav a[data-match]').forEach(a => {
    a.classList.toggle('is-active', (a.getAttribute('data-match') || '').toLowerCase() === path);
  });


// === Mobile menu (safe clone + auto refresh on language change) ===
function wireMobileMenu(){
  const btn      = document.getElementById('hamburger');
  const panel    = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  const closeBtn = document.getElementById('mobileClose');
  const inner    = panel?.querySelector('.mobile-menu-inner');
  const desktop  = document.querySelector('[data-site-header] nav.menu'); // 데스크톱 메뉴

  if (!btn || !panel || !backdrop || !closeBtn || !inner || !desktop) return;

  // (공통) 열고/닫기 + 이중 스크롤 방지
  function open(){
    document.body.classList.add('mobile-open');
    panel.hidden = false; backdrop.hidden = false;
    btn.setAttribute('aria-expanded','true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  function close(){
    document.body.classList.remove('mobile-open');
    btn.setAttribute('aria-expanded','false');
    setTimeout(()=>{ panel.hidden = true; backdrop.hidden = true; }, 250);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // ✅ 재빌드: 안전 복제 + 이벤트 다시 연결
  function rebuild(){
    // 1) 안전 복제 (<a>, .settings-dropdown만)
    inner.replaceChildren();
    desktop.querySelectorAll(':scope > a, :scope > .settings-dropdown').forEach(node=>{
      inner.appendChild(node.cloneNode(true));
    });

    // 메뉴 레이아웃 활성화
    inner.classList.add('menu');

    // 2) 복제본의 중복 id 제거 → data-mobile-id로 마킹
    inner.querySelectorAll('[id]').forEach(el=>{
      const id = el.id;
      el.removeAttribute('id');
      if (id === 'menuTheme')      el.dataset.mobileId = 'menuTheme';
      if (id === 'languageToggle') el.dataset.mobileId = 'languageToggle';
    });

    // 3) Settings 드롭다운 토글 (모바일용)
    inner.querySelectorAll('.settings-dropdown').forEach((dd)=>{
      const btnToggle = dd.querySelector('.settings-toggle, button, a');
      const menu      = dd.querySelector('.settings-menu');
      if (!btnToggle || !menu) return;

      dd.classList.remove('open');

      btnToggle.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // 다른 드롭다운 닫기
        inner.querySelectorAll('.settings-dropdown.open').forEach(o=>{
          if (o !== dd) o.classList.remove('open');
        });
        dd.classList.toggle('open');
      });

      // 하위 메뉴 항목 클릭 시 닫기
      menu.addEventListener('click', (e)=>{
        const a = e.target.closest('a,button');
        if (a) dd.classList.remove('open');
      });
    });

// 4) 테마/언어 버튼 연결 (모바일 복제본)
const openThemeDialog = () => { const d = document.getElementById('themeDialog'); if (d) d.showModal(); };
const openLangDialog  = () => { const d = document.getElementById('languageDialog'); if (d) d.showModal(); };

inner.querySelectorAll('[data-mobile-id="menuTheme"]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault(); e.stopPropagation();
    close();                  // ✅ 먼저 모바일 메뉴 닫아서 스크롤 잠금 해제
    openThemeDialog();
  });
});
inner.querySelectorAll('[data-mobile-id="languageToggle"]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault(); e.stopPropagation();
    close();                  // ✅ 동일 처리
    openLangDialog();
  });
});

    // 5) 패널 안 링크 클릭 시 닫기
    inner.addEventListener('click', (e)=>{
      const a = e.target.closest('a');
      if (a) close();
    });
  }

  // 최초 1회 렌더
  rebuild();

  // ✅ 언어 변경 시(또는 데스크톱 메뉴 텍스트 변동 시) 자동 갱신
  // - 데스크톱 메뉴에 MutationObserver: 언어 스위치로 라벨이 바뀌면 자동 rebuild()
  const mo = new MutationObserver(()=> rebuild());
  mo.observe(desktop, { childList:true, subtree:true, characterData:true });

  // - 혹시 setLang 같은 내부 함수가 커스텀 이벤트를 쏠 수 있으면 이것도 받음(있으면 자동 작동)
  document.addEventListener('lang:changed', rebuild);

  // 토글/닫기 바인딩
  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });

  // 패널 밖 클릭 시 열린 드롭다운 닫기
  document.addEventListener('click', (e)=>{
    const inside = e.target.closest('#mobileMenu');
    if (!inside){
      inner.querySelectorAll('.settings-dropdown.open').forEach(o=>o.classList.remove('open'));
    }
  }, { capture:true });
}




  // 설정/테마 바인딩
  wireSettingsDropdown();

// ✅ 모바일 메뉴 바인딩
wireMobileMenu();

  // Remove Add menu
  removeAddMenu();



// 강제 스타일 주입: header.html이 로드돼도 항상 적용되도록
(function ensureMobileMenuStyles(){
  if (document.getElementById('mobile-menu-override')) return;
  const s = document.createElement('style');
  s.id = 'mobile-menu-override';
  s.textContent = `
    /* ===== Mobile menu sizing & scroll polish (runtime inject) ===== */
    .mobile-menu{
      width: clamp(320px, 92vw, 420px) !important;
      height: 100dvh !important;
      box-sizing: border-box !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      background: var(--card) !important;
      color: var(--text) !important;
      border-left: 1px solid var(--border) !important;
      opacity: 1 !important;
    }
    .mobile-backdrop{ background: rgba(0,0,0,.55) !important; }

    /* 메뉴 리스트가 가로로 꽉 차게 */
    .mobile-menu .menu{
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      align-items: stretch !important;
      flex-wrap: nowrap !important;
    }

    /* 각 항목 버튼처럼 보이게 + 밑줄 제거 */
    .mobile-menu .menu a{
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      width: 100% !important;
      min-height: 44px !important;
      padding: 12px 14px !important;
      text-decoration: none !important;
      font-size: 16px !important;
      border: 1px solid var(--border) !important;
      border-radius: 10px !important;
      background: var(--card) !important;
      color: var(--text) !important;
    }
    .mobile-menu .menu a .mi{
      width: 18px !important; height: 18px !important; flex: 0 0 18px !important;
    }

    /* 모바일 패널 내 Settings 드롭다운 */
    .mobile-menu .settings-dropdown{ width:100%; }
    .mobile-menu .settings-toggle{
      width:100%; justify-content:space-between;
      border:1px solid var(--border); border-radius:10px;
      background: var(--card); color: var(--text);
    }
    .mobile-menu .settings-menu{
      position: relative !important;
      top:auto !important; left:auto !important; transform:none !important;
      opacity:1 !important; visibility:visible !important;
      display:none; background: transparent; border:0; box-shadow:none; padding:6px 0; min-width:0;
    }
    .mobile-menu .settings-dropdown.open .settings-menu{
      display:flex; flex-direction:column; gap:6px;
    }

    /* 다크 테마 대비 */
    .theme-dark .mobile-menu{ background:#12141a !important; }
    .theme-dark .mobile-menu .menu a{
      background: var(--card) !important; color: var(--text) !important; border-color: var(--border) !important;
    }

    /* === Mobile menu polish: edge artifact + settings text align === */

/* 좌측 끝에 보이는 회색 네모칸 제거(패널 외곽 보더/쉐도우/클리핑 보정) */
.mobile-menu{
  border-left: none !important;
  box-shadow: none !important;
  clip-path: inset(0 0 0 0) !important; /* 일부 브라우저의 한 픽셀 틈새 방지 */
}

/* 패널 내부 항목은 항상 좌측 정렬 */
.mobile-menu .menu,
.mobile-menu .menu a,
.mobile-menu .settings-menu,
.mobile-menu .settings-menu a,
.mobile-menu .settings-menu .settings-item{
  text-align: left !important;
  justify-content: flex-start !important;
}

/* 드롭다운 버튼(톱니)도 좌측 기반 정렬 */
.mobile-menu .settings-toggle{
  text-align: left !important;
  justify-content: space-between !important; /* 라벨-아이콘 간격은 유지 */
}

/* 포커스시 파란 외곽선/밑줄로 보이는 아티팩트 제거 (접근성 고려해 box-shadow로 대체) */
.mobile-menu .menu a:focus{
  outline: none !important;
  text-decoration: none !important;
  box-shadow: 0 0 0 2px var(--border) inset !important;
}



  `;
  document.head.appendChild(s);
})();


  // ✅ 여기서 버튼 이벤트 연결 (헤더/푸터 주입 '후'라서 DOM 존재)
  const btnTop   = document.getElementById('btnTop');
  const btnShare = document.getElementById('btnShare');

if (btnTop && !btnTop.dataset.bound) {
  btnTop.dataset.bound = '1';
  btnTop.addEventListener('click', () => {
    // 1) 혹시 남아 있을지 모르는 스크롤 잠금 해제
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // 2) 스크롤 가능한 컨테이너들을 전부 찾아서 맨 위로
    const isScrollable = (el) => {
      if (!el) return false;
      const style = getComputedStyle(el);
      const oy = style.overflowY;
      const canScroll = (oy === 'auto' || oy === 'scroll' || oy === 'overlay');
      return canScroll && el.scrollHeight > el.clientHeight;
    };

    // 우선순위: 명시적 스크롤 루트 → 표준 루트들
    const candidates = [
      document.querySelector('[data-scroll-root]'),
      document.scrollingElement,
      document.documentElement,
      document.body,
      // 추가로 페이지 내 모든 스크롤러도 포함
      ...Array.from(document.querySelectorAll('*')).filter(isScrollable)
    ].filter(Boolean);

    // 중복 제거
    const unique = [...new Set(candidates)];

    unique.forEach(el => {
      try {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        el.scrollTop = 0;
      }
    });
  });
}


  if (btnShare && !btnShare.dataset.bound) {
  btnShare.dataset.bound = '1';
  btnShare.addEventListener('click', async () => {
    const pageUrl = window.location.href;

    // 1) Web Share API 지원 → 네이티브 공유
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Share this page!',
          url: pageUrl
        });
        return;
      } catch (err) {
        // 사용자가 취소하면 그냥 아래 복사 로직 실행
        console.log('Share canceled', err);
      }
    }

    // 2) 지원 안 되면 → 클립보드 복사
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert('The link has been copied to your clipboard!');
    } catch (err) {
      alert('Automatic copy is not supported in this browser.\nPlease copy the link below manually:\n' + pageUrl);
    }
  });
}


  // 레이아웃 준비 완료 신호
  document.dispatchEvent(new CustomEvent('layout:ready'));
});





})();





/* ==== [ADDON] Emoticon data bootstrap (safe drop-in) ==== */
(function(){
  // 이미 데이터가 있으면 패스
  if (Array.isArray(window.DEFAULT_ITEMS) && window.DEFAULT_ITEMS.length) {
    document.dispatchEvent(new CustomEvent('emodata:ready'));
    return;
  }

  function loadScript(src){
    return new Promise(function(resolve){
      var s=document.createElement('script');
      s.src=src; s.async=true;
      s.onload=function(){ resolve(true); };
      s.onerror=function(){ resolve(false); };
      document.head.appendChild(s);
    });
  }

  (async function ensureEmoticonData(){
    // 같은 위치에 emoticon-data.js가 있으면 먼저 시도
    var ok = await loadScript('./emoticon-data.js');

    if (!ok || !Array.isArray(window.DEFAULT_ITEMS)) {
      // 실패 시 최소 기본값 주입 (프로젝트에 맞게 수정 가능)
      window.DEFAULT_ITEMS = [
        { t:'૮₍ ´• ﻌ • ₎ა',     l:'Puppy Face', g:['kaomoji','cute','animals'] },
        { t:'(,,ᴗ  ̫ᴗ,,)ꕤ*.ﾟ', l:'Shy Flower', g:['kaomoji','cute','love'] },
        { t:'໒꒰⸝⸝>♡︎<⸝⸝꒱ა', l:'Heart Hug',  g:['kaomoji','cute','love'] },
        { t:'(•‿•)', l:'Smile', g:['kaomoji','happy'] },
        { t:'(＾▽＾)', l:'Big Smile', g:['kaomoji','happy'] }
      ];
    }

    // 이 페이지(Emoticons)가 받을 이벤트
    document.dispatchEvent(new CustomEvent('emodata:ready'));
  })();


  /* === favNotice (non-invasive append) === */
(function(){
  try{
    const L = typeof languages !== 'undefined' ? languages : null;
    if(!L) return;
    (L.ko||(L.ko={})).favNotice = "즐겨찾기한 이모티콘은 브라우저의 로컬 스토리지에만 저장됩니다.<br>쿠키/로컬 스토리지를 삭제하거나 브라우저·기기를 바꾸면 데이터가 초기화됩니다.";
    (L.en||(L.en={})).favNotice = "Favorites are stored only in your browser’s local storage.<br>If you clear cookies/local storage or change browser/device, the data will be reset.";
    (L.ja||(L.ja={})).favNotice = "お気に入りにした絵文字はブラウザのローカルストレージのみに保存されます。<br>Cookie／ローカルストレージを削除するかブラウザ・端末を変更するとデータは初期化されます。";
    (L.es||(L.es={})).favNotice = "Los emoticonos marcados como favoritos se guardan solo en el almacenamiento local del navegador.<br>Si borras las cookies/almacenamiento local o cambias de navegador/dispositivo, los datos se restablecerán.";
    (L.pt||(L.pt={})).favNotice = "Os emoticons adicionados aos favoritos são armazenados apenas no armazenamento local do navegador.<br>Se você apagar cookies/armazenamento local ou trocar de navegador/dispositivo, os dados serão reiniciados.";
    (L.de||(L.de={})).favNotice = "Favoriten werden nur im lokalen Speicher des Browsers gespeichert.<br>Wenn Sie Cookies/Local Storage löschen oder den Browser/das Gerät wechseln, werden die Daten zurückgesetzt.";
    (L.fr||(L.fr={})).favNotice = "Les émoticônes ajoutés aux favoris sont enregistrés uniquement dans le stockage local du navigateur.<br>Si vous supprimez les cookies/le stockage local ou changez de navigateur/appareil, les données seront réinitialisées.";
  }catch(e){}
})();


})();






/* === No-Drag / No-Select (site-wide, safe defaults) === */
(function(){
  try{
    const apply = () => {
      // 1) Inject CSS (idempotent)
      if (!document.getElementById('no-drag-no-select-style')) {
        const style = document.createElement('style');
        style.id = 'no-drag-no-select-style';
        style.textContent = `
          html, body,
          *:not(input):not(textarea):not([contenteditable="true"]):not([data-allow-select]){
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
          }
          img, a, svg, .emo, .emo-card, .emo .emo-t {
            -webkit-user-drag: none !important;
            user-drag: none !important;
            pointer-events: auto;
          }
        `;
        (document.head || document.documentElement).appendChild(style);
      }

      // 2) Guard drag/select globally, with exceptions
      const isAllowed = (el)=> !!el && (
        el.closest('input, textarea, [contenteditable="true"], [data-allow-select]')
      );

      const guard = (evt)=>{
        const t = evt.target;
        if (!isAllowed(t)) {
          evt.preventDefault();
          return false;
        }
      };

      ['dragstart','selectstart'].forEach(type=>{
        document.addEventListener(type, guard, {capture:true, passive:false});
      });

      // Helpers
      window.__allowSelect = function(el){ if(el) el.setAttribute('data-allow-select',''); };
      window.__disallowSelect = function(el){ if(el) el.removeAttribute('data-allow-select'); };
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', apply, {once:true});
    } else {
      apply();
    }
  }catch(e){ /* no-op */ }
})();



/* =========================
   PATCH v5 (non-structural)
   - Fixes: #1, #2, #3, #4, #5, #6, #7, #8
   - Only CSS overrides + small JS helpers
   ========================= */
(function(){
  // 0) Helper: add style once
  function addStyleOnce(id, css){
    if(document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id; s.textContent = css;
    document.head.appendChild(s);
  }

  // 1) Settings toggle/text alignment (desktop & mobile)
  addStyleOnce("patch-v5-settings-align", `
    /* Desktop header settings alignment */
    [data-site-header] .settings-toggle,
    [data-site-header] .settings-menu,
    [data-site-header] .settings-menu a,
    [data-site-header] .settings-item{
      text-align: left !important;
      justify-content: flex-start !important;
    }
  `);

  // 2 & 4) Blue text color + center alignment on Emoticon/Line/Dot/ASCII
  addStyleOnce("patch-v5-card-center-bluefix", `
    /* Neutralize link blue + center cards */
    main a, .content a, .emo-card a, .dot-card a, .font-out a {
      color: var(--text) !important;
      text-decoration: none !important;
    }
    .emo-card, .dot-card, .font-out, .dotart-result, .dotart-col, .ascii-wrap, .line-wrap{
      color: var(--text) !important;
      text-align: center !important;
    }
    /* Common grids/lists → centered */
    .emo-list, .emoji-list, .dotart-list, .ascii-list, .line-list, .fonts-grid, .grid, .cards, .emo-grid{
      display: flex;
      flex-wrap: wrap;
      justify-content: center !important;
    }
  `);

  // 5) Prevent input auto-zoom (iOS/Safari) by ensuring min 16px font
  addStyleOnce("patch-v5-input-zoom", `
    input, select, textarea {
      font-size: 16px !important;
    }
  `);

  // 6) Favorite star coloring (inactive vs active)
  addStyleOnce("patch-v5-fav-color", `
    .fav-btn { color: var(--muted) !important; }
    .fav-btn svg { fill: currentColor !important; }
    .fav-btn.is-active, .fav-btn[aria-pressed="true"] { color: var(--accent) !important; }
  `);

  // 7) i18n for "favorites stored in local storage" style notices
  //    Apply to any element with data-i18n="favNotice" (and a few related keys).
  const I18N = {
    en: {
      favNotice: "Favorited emoticons are saved in your browser's local storage.",
      favEmpty: "You don’t have any favorites yet.",
      share: "Share",
      top: "Top"
    },
    ko: {
      favNotice: "즐겨찾기한 이모티콘은 브라우저의 로컬 스토리지에 저장됩니다.",
      favEmpty: "아직 즐겨찾기가 없습니다.",
      share: "공유",
      top: "위로"
    },
    ja: {
      favNotice: "お気に入りの絵文字はブラウザのローカルストレージに保存されます。",
      favEmpty: "まだお気に入りはありません。",
      share: "共有",
      top: "トップ"
    },
    es: {
      favNotice: "Los emoticonos favoritos se guardan en el almacenamiento local del navegador.",
      favEmpty: "Aún no tienes favoritos.",
      share: "Compartir",
      top: "Arriba"
    },
    pt: {
      favNotice: "Os emoticons favoritos são salvos no armazenamento local do navegador.",
      favEmpty: "Você ainda não tem favoritos.",
      share: "Compartilhar",
      top: "Topo"
    },
    de: {
      favNotice: "Favorisierte Emoticons werden im lokalen Speicher des Browsers gespeichert.",
      favEmpty: "Du hast noch keine Favoriten.",
      share: "Teilen",
      top: "Nach oben"
    },
    fr: {
      favNotice: "Les émoticônes favorites sont enregistrées dans le stockage local du navigateur.",
      favEmpty: "Vous n’avez pas encore de favoris.",
      share: "Partager",
      top: "Haut"
    }
  };

  function applyFavI18n(){
    const lang = localStorage.getItem('emo.language') || 'en';
    const L = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n="favNotice"]').forEach(el => { el.textContent = L.favNotice; });
    document.querySelectorAll('[data-i18n="favEmpty"]').forEach(el => { el.textContent = L.favEmpty; });
    // Buttons if they carry data-i18n
    const shareBtn = document.querySelector('#btnShare[data-i18n]'); if (shareBtn) shareBtn.setAttribute('title', L.share);
    const topBtn = document.querySelector('#btnTop[data-i18n]'); if (topBtn) topBtn.setAttribute('title', L.top);
  }

  // Re-apply i18n when language is changed via dialog (listen our own handlers)
  document.addEventListener('click', function(e){
    const langBtn = e.target.closest('.language-option[data-lang]');
    if(langBtn){
      setTimeout(applyFavI18n, 60);
    }
  });

  // Also apply on load
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyFavI18n, {once:true});
  } else {
    applyFavI18n();
  }

  // 3) Emoji “no results” fix — ensure data is loaded if missing
  function ensureScriptOnce(id, src, onload){
    if (document.getElementById(id)) return;
    const s = document.createElement('script'); s.id = id; s.src = src; s.async = true;
    s.onload = onload || null;
    document.head.appendChild(s);
  }

  function ensurePageData(){
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === 'emoji.html'){
      if (!window.EMOJI_DATA){
        // Try absolute then relative
        ensureScriptOnce('auto-emoji-data', '/assets/emoji-data.js', function(){
          document.dispatchEvent(new Event('emojidata:ready'));
        });
      }
    }
    if (page === 'emoticon.html' && !window.EMOTICON_DATA){
      ensureScriptOnce('auto-emo-data', '/assets/emoticon-data.js', function(){
        document.dispatchEvent(new Event('emodata:ready'));
      });
    }
    if (page === 'line.html' && !window.LINE_DATA){
      ensureScriptOnce('auto-line-data', '/assets/line-data.js', function(){
        document.dispatchEvent(new Event('linedata:ready'));
      });
    }
    if ((page === 'dotart.html' || page === 'ascii.html') && !window.DOT_DATA){
      ensureScriptOnce('auto-dot-data', '/assets/dot-data.js', function(){
        document.dispatchEvent(new Event('dotdata:ready'));
      });
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensurePageData, {once:true});
  } else {
    ensurePageData();
  }

  // 8) Floating buttons (Top/Share) — rebind & recreate if missing
  function ensureFloatingButtons(){
    let container = document.querySelector('.floating-buttons');
    if(!container){
      container = document.createElement('div');
      container.className = 'floating-buttons';
      // minimal styles in case CSS not present
      container.style.position='fixed'; container.style.right='20px'; container.style.bottom='20px';
      container.style.display='flex'; container.style.flexDirection='column'; container.style.gap='10px'; container.style.zIndex='999';
      document.body.appendChild(container);
    }
    let btnTop = document.getElementById('btnTop');
    if(!btnTop){
      btnTop = document.createElement('button');
      btnTop.id = 'btnTop';
      btnTop.className = 'float-btn';
      btnTop.title = 'top';
      btnTop.textContent = '⬆';
      container.appendChild(btnTop);
    }
    let btnShare = document.getElementById('btnShare');
    if(!btnShare){
      btnShare = document.createElement('button');
      btnShare.id = 'btnShare';
      btnShare.className = 'float-btn';
      btnShare.title = 'share';
      btnShare.textContent = '🔗';
      container.appendChild(btnShare);
    }

    // Bind
    btnTop.onclick = function(e){ e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); };
    btnShare.onclick = async function(e){
      e.preventDefault();
      const data = { title: document.title, url: location.href };
      try{
        if (navigator.share) { await navigator.share(data); }
        else {
          await navigator.clipboard.writeText(location.href);
          // Simple toast fallback
          let t = document.getElementById('patchV5Toast');
          if(!t){ t = document.createElement('div'); t.id='patchV5Toast'; t.style.cssText='position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:var(--card);border:1px solid var(--border);padding:10px 12px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.08);z-index:9999;color:var(--text);opacity:0;transition:opacity .2s'; document.body.appendChild(t); }
          t.textContent = 'Link copied!';
          requestAnimationFrame(()=>{ t.style.opacity='1'; setTimeout(()=>{ t.style.opacity='0'; }, 1000); });
        }
      }catch(_){ /* no-op */ }
    };
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureFloatingButtons, {once:true});
  } else {
    ensureFloatingButtons();
  }

  // 2) (extra) Make sure Line/Emoticon/Dot/ASCII "center wrapper" exists even if markup differs
  // Try to center any immediate grid under .content
  addStyleOnce("patch-v5-center-fallback", `
    .content > .grid, .content > .list, .content > .cards { justify-content: center !important; }
  `);
})();


/* === FIX_ONLY: Settings menu text alignment === */
(function(){
  try{
    const s = document.createElement('style');
    s.setAttribute('data-fix','settings-align-only');
    s.textContent = `.mobile-menu .settings-toggle{justify-content:flex-start !important;text-align:left !important;}
.settings-menu, .mobile-menu .settings-menu{ text-align:left !important; }
.settings-menu button, .settings-menu label, .settings-menu a{ text-align:left !important; justify-content:flex-start !important; }`;
    document.head.appendChild(s);
  }catch(e){/*no-op*/}


  /* SETTINGS-ALIGN-ONLY (safe) */
(function(){
  function addStyleOnce(id, css){
    if (document.getElementById(id)) return;
    var s = document.createElement('style'); s.id = id; s.textContent = css;
    document.head.appendChild(s);
  }
  addStyleOnce('settings-align-only', [
    // 데스크톱 헤더의 세팅 토글/메뉴/항목만 좌측 정렬
    '[data-site-header] .settings-toggle,',
    '[data-site-header] .settings-menu,',
    '[data-site-header] .settings-menu a,',
    '[data-site-header] .settings-item',
    '{ text-align:left !important; justify-content:flex-start !important; }',

    // 모바일 패널(#mobileMenu) 내 세팅만 좌측 정렬
    '#mobileMenu .settings-toggle,',
    '#mobileMenu .settings-menu,',
    '#mobileMenu .settings-menu a,',
    '#mobileMenu .settings-item',
    '{ text-align:left !important; justify-content:flex-start !important; }'
  ].join('\n'));
})();



/* FIX: Line/Emoji/Fonts — 카드(출력 박스) 사이즈 '고정' 복원 (safe) */
(function(){
  function addStyleOnce(id, css){
    if (document.getElementById(id)) return;
    var s = document.createElement('style'); s.id = id; s.textContent = css;
    document.head.appendChild(s);
  }

  addStyleOnce('fix-card-sizes-v2', `
    /* === LINE & EMOJI: 컨테이너를 grid로, 고정 칸폭으로 === */
    .line-list, .emoji-list{
      display: grid !important;
      grid-template-columns: repeat(auto-fill, 140px) !important; /* 칸폭 고정 */
      gap: 12px !important;
      justify-content: center !important;
      align-content: start !important;
    }
    /* 아이템(카드) 고정 사이즈 */
    .line-list > *, .emoji-list > *{
      width: 140px !important;
      height: 120px !important;
      margin: 0 auto !important; /* 중앙 배치 안전벨트 */
    }
    /* 카드 내부 텍스트(이모티콘/라인/이모지) 중앙 고정 */
    .emo-t{
      display:flex !important;
      align-items:center !important;
      justify-content:center !important;
      text-align:center !important;
      width:100% !important; height:100% !important;
    }

    /* === FONTS 페이지: 카드·출력 박스 고정 === */
    .fonts-grid{
      display: grid !important;
      grid-template-columns: repeat(auto-fill, 260px) !important; /* 칸폭 고정 */
      gap: 12px !important;
      justify-content: center !important;
      align-content: start !important;
    }
    /* 폰트 카드(아이템) 고정 크기 */
    .fonts-grid > *{
      width: 260px !important;
      min-height: 140px !important;
      margin: 0 auto !important;
    }
    /* 출력 박스(.font-out) 높이 통일 + 중앙 정렬 */
    .font-out{
      min-height: 90px !important;
      display:flex !important;
      align-items:center !important;
      justify-content:center !important;
      text-align:center !important;
      overflow-wrap:anywhere;
    }

    /* 모바일에서도 동일하게 강제 (규칙 충돌 방지) */
    @media (max-width: 640px){
      .line-list > *, .emoji-list > *{ width:140px !important; height:120px !important; }
      .fonts-grid{ grid-template-columns: repeat(auto-fill, 260px) !important; }
      .fonts-grid > *{ width:260px !important; }
    }
  `);
})();




})();
