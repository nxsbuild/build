(() => {
  'use strict';
  // 기록의 전당: 패치노트·기록 목록·기록 분석의 유일한 모달 소유자.
  const trigger = document.getElementById('btnRecordArchive');
  if (!trigger || document.getElementById('builderRecordDialog')) return;

  // ── 01 · 기록의 전당 통합 스타일 ──
  const style = document.createElement('style');
  style.id = 'builder-record-hall-style';
  style.textContent = String.raw`
/* 패치노트: 빌더 기본 모달 색상 토큰 사용; 헤더 버튼은 style.css 공통 규칙 적용 */
#builderRecordDialog .ra-patch-pane{--patch-text:var(--ui-text,#e2e7f0);display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden;color:var(--patch-text)}
#builderRecordDialog .ra-patch-pane *{box-sizing:border-box}
#builderRecordDialog .ra-patch-pane [hidden]{display:none!important}
#builderRecordDialog .ra-patch-pane button,#builderRecordDialog .ra-patch-pane input,#builderRecordDialog .ra-patch-pane select{font:inherit}
#builderRecordDialog .ra-patch-pane button{cursor:pointer;transition:border-color .15s,background .15s,color .15s}
#builderRecordDialog .ra-patch-pane :is(button,input,select,summary):focus-visible{outline:2px solid #92bdf8;outline-offset:2px}
#builderRecordDialog .ra-patch-pane .bp-controls{flex:0 0 auto;padding:10px 22px;border-bottom:1px solid #273343;background:#090b0d}
#builderRecordDialog .ra-patch-pane .bp-toolbar{display:flex;align-items:center;gap:8px;margin-bottom:8px}
#builderRecordDialog .ra-patch-pane .bp-search{display:flex;align-items:center;flex:1;min-width:0;min-height:36px;gap:8px;padding:0 11px;border:1px solid #405674;border-radius:8px;background:#080d13;transition:border-color .15s}
#builderRecordDialog .ra-patch-pane .bp-search:focus-within{border-color:#80b6fb;box-shadow:0 0 0 2px #75aaff20}
#builderRecordDialog .ra-patch-pane .bp-search svg{width:15px;height:15px;flex:0 0 15px;color:#829cb9}
#builderRecordDialog .ra-patch-pane .bp-search input{flex:1;min-width:0;width:100%;height:34px;border:0;background:transparent;color:#eff6ff;outline:0;font-size:12px}
#builderRecordDialog .ra-patch-pane .bp-search input::placeholder{color:#879cb6}
#builderRecordDialog .ra-patch-pane #bp-refresh{flex:0 0 auto;min-height:36px;padding:5px 12px;border:1px solid #405674;border-radius:8px;background:#1a2634;color:#c7d9ed;font-size:11px}
#builderRecordDialog .ra-patch-pane #bp-refresh:hover:not(:disabled){border-color:#88aff2;background:#243b57}
#builderRecordDialog .ra-patch-pane #bp-refresh:disabled{cursor:wait;opacity:.65}
#builderRecordDialog .ra-patch-pane .bp-periodbar{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;min-width:0;margin-bottom:9px}
#builderRecordDialog .ra-patch-pane .bp-range{min-width:0;overflow:hidden;color:#9fb4cb;font-size:10px;white-space:nowrap;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-patch-pane .bp-periodtabs{display:flex;align-items:center;justify-content:center;gap:16px;white-space:nowrap}
#builderRecordDialog .ra-patch-pane .bp-periodtabs button{padding:4px 1px 5px;border:0;border-bottom:2px solid transparent;border-radius:0;background:transparent;color:#96a9bf;font-size:11px;line-height:1.25;transition:none}
#builderRecordDialog .ra-patch-pane .bp-periodtabs button[aria-pressed="true"]{border-bottom-color:#80b8ff;color:#eff6ff;font-weight:700}
#builderRecordDialog .ra-patch-pane .bp-periodtabs button:hover{color:#eff6ff}
#builderRecordDialog .ra-patch-pane .bp-version{justify-self:end;width:116px;min-width:0;max-width:100%;min-height:30px;padding:4px 8px;border:1px solid #405674;border-radius:7px;background:#151e29;color:#c7d9ed;font-size:11px;cursor:pointer}
#builderRecordDialog .ra-patch-pane .bp-month{display:grid;gap:12px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-month-head{margin:0 0 2px;padding:0 1px 7px;border-bottom:1px solid #2d3e52;color:#adc4df;font-size:12px;font-weight:650}
#builderRecordDialog .ra-patch-pane .bp-month-releases{display:grid;gap:20px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-filters{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
#builderRecordDialog .ra-patch-pane .bp-filters button{min-height:30px;padding:5px 12px;border:1px solid #344457;border-radius:7px;background:#161e28;color:#afc2da;font-size:11px;line-height:1.2}
#builderRecordDialog .ra-patch-pane .bp-filters button:hover{background:#223248;color:#e7f2ff}
#builderRecordDialog .ra-patch-pane .bp-filters [aria-pressed="true"]{border-color:#6f9bcf;background:#263e59;color:#e7f2ff;font-weight:700;box-shadow:inset 0 1px #ffffff12}
#builderRecordDialog .ra-patch-pane .bp-filters [data-kind="preset"][aria-pressed="true"]{border-color:#9981d1;background:#302840;color:#ddcaff}
#builderRecordDialog .ra-patch-pane .bp-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:14px 22px 18px;background:#090b0d;scrollbar-width:thin;scrollbar-color:#465b73 transparent}
#builderRecordDialog .ra-patch-pane .bp-summary{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#9aa9bc;font-size:11px}
#builderRecordDialog .ra-patch-pane .bp-summary:before{content:'';flex:0 0 3px;width:3px;height:13px;border-radius:3px;background:#83b8f5}
#builderRecordDialog .ra-patch-pane .bp-empty{display:grid;place-items:center;min-height:170px;padding:20px;border:1px dashed #3c516a;border-radius:12px;background:#111a24;color:#b7c9dc;text-align:center;line-height:1.65;white-space:pre-line}
#builderRecordDialog .ra-patch-pane .bp-list{display:grid;gap:23px}
#builderRecordDialog .ra-patch-pane .bp-release{min-width:0}
#builderRecordDialog .ra-patch-pane .bp-release-head{display:flex;align-items:end;justify-content:space-between;flex-wrap:wrap;gap:8px 14px;margin-bottom:11px;padding:4px 2px 12px;border-bottom:1px solid #314156}
#builderRecordDialog .ra-patch-pane .bp-release-heading{min-width:0;padding-left:12px;border-left:3px solid #80b8ff}
#builderRecordDialog .ra-patch-pane .bp-release-kicker{display:block;margin:0 0 3px;color:#8fb8e9;font:700 9px/1.3 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.13em}
#builderRecordDialog .ra-patch-pane .bp-release-title{margin:0;color:#f2f6fc;font-size:19px;font-weight:750;line-height:1.3;letter-spacing:-.025em;overflow-wrap:anywhere}
#builderRecordDialog .ra-patch-pane .bp-release-meta{display:flex;align-items:center;gap:10px;padding-bottom:2px;color:#91a5bf;font-size:10px;white-space:nowrap}
#builderRecordDialog .ra-patch-pane .bp-release-meta time{margin:0;color:inherit}
#builderRecordDialog .ra-patch-pane .bp-release-items{display:grid;gap:8px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-card{--bp-tone:#80b8ff;--bp-rgb:128,184,255;overflow-wrap:anywhere;min-width:0;border:1px solid #334457;border-radius:9px;background:linear-gradient(120deg,rgba(76,112,151,.035),transparent 72%),#141b24;box-shadow:inset 0 1px #ffffff05;transition:border-color .15s,background .15s}
#builderRecordDialog .ra-patch-pane .bp-card[data-tone="fix"]{--bp-tone:#cc858e;--bp-rgb:204,133,142}
#builderRecordDialog .ra-patch-pane .bp-card[data-tone="improve"]{--bp-tone:#aeb8c4;--bp-rgb:174,184,196}
#builderRecordDialog .ra-patch-pane .bp-card:hover{border-color:#536e8c;background:linear-gradient(120deg,rgba(var(--bp-rgb),.065),transparent 72%),#17212c}
#builderRecordDialog .ra-patch-pane .bp-card[open]{border-color:#59718a;background:#141c26}
#builderRecordDialog .ra-patch-pane .bp-card>summary{display:block;padding:12px 14px;border-left:3px solid var(--bp-tone);border-radius:8px;list-style:none;cursor:pointer;scroll-margin-top:8px}
#builderRecordDialog .ra-patch-pane .bp-card>summary::-webkit-details-marker{display:none}
#builderRecordDialog .ra-patch-pane .bp-card>summary::marker{content:''}
#builderRecordDialog .ra-patch-pane .bp-card[open]>summary{border-bottom:1px solid #344559;border-radius:8px 8px 0 0;background:rgba(var(--bp-rgb),.035)}
#builderRecordDialog .ra-patch-pane .bp-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px 12px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-kind{flex:0 0 auto;font:600 9px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.055em;white-space:nowrap}
#builderRecordDialog .ra-patch-pane .bp-kind[data-kind="update"]{color:#80b8ff}
#builderRecordDialog .ra-patch-pane .bp-kind[data-kind="new"]{color:#c4a0ff}
#builderRecordDialog .ra-patch-pane .bp-kind[data-kind="preset"]{color:#67d8e8}
#builderRecordDialog .ra-patch-pane .bp-kind[data-kind="fix"]{color:#ff8585}
#builderRecordDialog .ra-patch-pane .bp-kind[data-kind="improve"]{color:#c4cbd4}
#builderRecordDialog .ra-patch-pane .bp-kinds{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px 9px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-kind-unit{display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
#builderRecordDialog .ra-patch-pane .bp-kind-separator{color:#657386;font:600 10px/1 ui-monospace,SFMono-Regular,Consolas,monospace}
#builderRecordDialog .ra-patch-pane .bp-tag{padding:2px 7px;border:1px solid #3d526c;border-radius:5px;background:#233247;color:#c6daef;font-size:10px;line-height:1.4}
#builderRecordDialog .ra-patch-pane time{flex:0 0 auto;margin-left:auto;color:#9aa9bc;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-patch-pane .bp-second{display:flex;align-items:center;flex-wrap:wrap;gap:5px 9px;margin-top:7px;min-width:0}
#builderRecordDialog .ra-patch-pane .bp-preview{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;flex:1 1 0;min-width:0;overflow:hidden;overflow-wrap:anywhere;color:#f1f5f9;font-size:13.5px;font-weight:650;line-height:1.45}
#builderRecordDialog .ra-patch-pane .bp-excerpt{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:9px 0 0;color:#aebed0;font-size:11.5px;line-height:1.55}
#builderRecordDialog .ra-patch-pane .bp-body{padding:14px 16px 18px;background:#0b0d10;color:#e6edf7;font-size:12px;line-height:1.65;overflow-wrap:anywhere}
#builderRecordDialog .ra-patch-pane .bp-body>*+*{margin-top:8px}
#builderRecordDialog .ra-patch-pane .bp-body h4{margin:13px 0 6px;padding-left:9px;border-left:2px solid #6795cd;color:#e6f1ff;font-size:13px}
#builderRecordDialog .ra-patch-pane .bp-body :is(ul,ol){padding-left:18px}
#builderRecordDialog .ra-patch-pane .bp-body li+li{margin-top:4px}
#builderRecordDialog .ra-patch-pane .bp-body strong{color:#f1f7ff}
#builderRecordDialog .ra-patch-pane .bp-body pre{overflow:auto;padding:10px;border-radius:7px;background:#090d12}
#builderRecordDialog .ra-patch-pane .bp-body code{padding:2px 4px;border-radius:4px;background:#222c38}
#builderRecordDialog .ra-patch-pane .bp-body pre code{padding:0;background:none}
#builderRecordDialog .ra-patch-pane .bp-body blockquote{padding-left:11px;border-left:2px solid #465d7c}
#builderRecordDialog .ra-patch-pane .bp-body a{color:#9bcaff;text-decoration:underline}
#builderRecordDialog .ra-patch-pane .bp-body :is(th,td){padding:5px 7px;border:1px solid #3c4f66}
#builderRecordDialog .ra-patch-pane .bp-body table{display:block;overflow:auto;border-collapse:collapse}
#builderRecordDialog .ra-patch-pane .bp-body hr{border:0;border-top:1px solid #344558}
#builderRecordDialog .ra-patch-pane .bp-plain{white-space:pre-wrap}
#builderRecordDialog .ra-patch-pane .bp-image-link{display:inline-block;max-width:100%}
#builderRecordDialog .ra-patch-pane .bp-image{display:block;max-width:100%;max-height:420px;border:1px solid #3c4f66;border-radius:7px}
#builderRecordDialog .ra-patch-pane .bp-reader{display:grid;grid-template-columns:95px minmax(0,1fr) 95px;align-items:center;gap:10px;flex:0 0 auto;padding:10px 22px;border-top:1px solid #34485f;background:linear-gradient(110deg,#182434,#0d131b)}
#builderRecordDialog .ra-patch-pane .bp-reader button{min-height:34px;padding:4px 8px;border:1px solid #466389;border-radius:8px;background:#20334a;color:#e0edfb;font-size:12px}
#builderRecordDialog .ra-patch-pane .bp-reader button:not(:disabled):hover{border-color:#91bdf5;background:#2d486a}
#builderRecordDialog .ra-patch-pane .bp-reader button:disabled{opacity:.38;cursor:not-allowed}
#builderRecordDialog .ra-patch-pane .bp-position{text-align:center;color:#b5d5ff;font:700 11px ui-monospace,SFMono-Regular,Consolas,monospace}
@media(max-width:540px){
 #builderRecordDialog .ra-patch-pane .bp-controls{padding:9px 11px}
 #builderRecordDialog .ra-patch-pane .bp-periodbar{gap:4px;margin-bottom:8px}
 #builderRecordDialog .ra-patch-pane .bp-range{font-size:9px;letter-spacing:-.035em}
 #builderRecordDialog .ra-patch-pane .bp-periodtabs{gap:7px}
 #builderRecordDialog .ra-patch-pane .bp-periodtabs button{font-size:10px;padding:4px 0 5px}
 #builderRecordDialog .ra-patch-pane .bp-version{width:90px;min-height:28px;padding:3px 4px;font-size:10px}
 #builderRecordDialog .ra-patch-pane .bp-scroll{padding:12px 10px 15px}
 #builderRecordDialog .ra-patch-pane .bp-filters{gap:4px;flex-wrap:nowrap}
 #builderRecordDialog .ra-patch-pane .bp-filters button{flex:1 1 0;min-width:0;padding:4px 3px;font-size:10px;white-space:nowrap}
 #builderRecordDialog .ra-patch-pane .bp-release-head{gap:6px 10px;padding-bottom:10px}
 #builderRecordDialog .ra-patch-pane .bp-release-title{font-size:17px}
 #builderRecordDialog .ra-patch-pane .bp-release-meta{font-size:9.5px}
 #builderRecordDialog .ra-patch-pane .bp-card>summary{padding:10px 10px 10px 11px}
 #builderRecordDialog .ra-patch-pane .bp-preview{font-size:12.5px}
 #builderRecordDialog .ra-patch-pane .bp-excerpt{font-size:11px}
 #builderRecordDialog .ra-patch-pane .bp-body{padding:12px}
 #builderRecordDialog .ra-patch-pane .bp-reader{grid-template-columns:76px minmax(0,1fr) 76px;gap:7px;padding:8px 10px}
 #builderRecordDialog .ra-patch-pane .bp-reader button{font-size:11px}
}
@media(max-width:360px){#builderRecordDialog .ra-patch-pane .bp-filters button{padding:4px 2px;font-size:9.5px}#builderRecordDialog .ra-patch-pane .bp-second{gap:4px 6px}#builderRecordDialog .ra-patch-pane time{font-size:9px}}
@media(prefers-reduced-motion:reduce){#builderRecordDialog .ra-patch-pane .bp-card,#builderRecordDialog .ra-patch-pane button{transition:none}}

/* ── 기록의 전당 · 패치노트와 기록 조회를 하나의 다이얼로그로 통합 ── */
#builderRecordDialog{position:fixed;inset:0;box-sizing:border-box;width:min(860px,calc(100vw - 36px));height:min(750px,calc(100dvh - 34px));max-width:none;max-height:none;margin:auto;padding:0;overflow:hidden;border:1px solid #475d79;border-radius:var(--ui-modal-radius,15px);background:var(--ui-panel-body-bg,#08090b);color:var(--ui-text,#e2e7f0);box-shadow:var(--ui-modal-shadow,0 28px 95px #000b);font:calc(12.5px * var(--app-font-scale,1))/1.5 var(--font-main,system-ui,sans-serif);color-scheme:dark}
#builderRecordDialog[open]{display:flex;flex-direction:column}
#builderRecordDialog::backdrop{background:rgba(0,0,0,.8);backdrop-filter:blur(7px)}
#builderRecordDialog *,#builderRecordDialog *::before,#builderRecordDialog *::after{box-sizing:border-box}
#builderRecordDialog [hidden]{display:none!important}
#builderRecordDialog button,#builderRecordDialog select{font:inherit}
#builderRecordDialog :is(button,select,a):focus-visible{outline:2px solid #b5d3fb;outline-offset:2px}
#builderRecordDialog button{cursor:pointer}
#builderRecordDialog .ra-head{display:grid;grid-template-columns:minmax(0,1fr) max-content minmax(0,1fr);align-items:center;gap:9px;flex:0 0 auto;padding:6px 18px;border-bottom:1px solid #2c4056;background:linear-gradient(110deg,#18283b,#0b1017)}
#builderRecordDialog .ra-head-brand{display:flex;align-items:center;gap:9px;min-width:0}
#builderRecordDialog .ra-head-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px;min-width:0}
#builderRecordDialog .ra-mark{display:grid;place-items:center;flex:0 0 30px;width:30px;height:30px;border:1px solid #88764f;border-radius:9px;background:#242015;color:#efd49e;font-size:18px}
#builderRecordDialog .ra-mark svg{width:18px;height:18px}
#builderRecordDialog .ra-title{min-width:0;flex:0 1 auto}
#builderRecordDialog .ra-title small{display:block;color:#93bce9;font-size:8px;letter-spacing:.14em;font-weight:700}
#builderRecordDialog .ra-title h2{margin:0;color:#eff6ff;font-size:16px;line-height:1.2;white-space:nowrap}
#builderRecordDialog .ra-close{flex:0 0 30px;width:30px;height:30px;border:1px solid #526681;border-radius:8px;background:#182538;color:#d7e7f9;font-size:21px;line-height:1}
#builderRecordDialog .ra-close:hover{background:#27415e}
#builderRecordDialog .ra-record-pane{display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden}
#builderRecordDialog .ra-controls{flex:0 0 auto;padding:10px 18px 11px;border-bottom:1px solid #303640;background:#0d1015}
#builderRecordDialog .ra-filter-matrix{display:grid;gap:8px;min-width:0}
#builderRecordDialog .ra-filter-group{display:grid;grid-template-columns:78px minmax(0,1fr);align-items:center;gap:10px;min-width:0}
#builderRecordDialog .ra-filter-label{color:#b8c5d3;font-size:12px;font-weight:650;line-height:1.3;white-space:nowrap}
#builderRecordDialog .ra-tabs,#builderRecordDialog .ra-battle{display:flex;align-items:stretch;gap:7px;min-width:0;overflow-x:auto;scrollbar-width:none}
#builderRecordDialog .ra-tabs::-webkit-scrollbar,#builderRecordDialog .ra-battle::-webkit-scrollbar{display:none}
#builderRecordDialog .ra-tabs button,#builderRecordDialog .ra-battle button{flex:1 0 0;min-width:94px;min-height:36px;padding:7px 8px;border:1px solid #394653;border-radius:8px;background:#171e27;color:#c6d3e0;font-size:12px;line-height:1.25;white-space:nowrap}
#builderRecordDialog .ra-tabs button:hover:not(:disabled):not([aria-pressed="true"]),#builderRecordDialog .ra-battle button:hover:not(:disabled):not([aria-pressed="true"]){border-color:#687c91;background:#26313f;color:#f0f6fc}
#builderRecordDialog .ra-tabs button[aria-pressed="true"],#builderRecordDialog .ra-battle button[aria-pressed="true"]{border-color:#859ab1;background:#303d4b;color:#f6f8fb;font-weight:700;box-shadow:inset 0 1px #ffffff12}
#builderRecordDialog .ra-battle button:disabled{cursor:not-allowed;opacity:.35}
#builderRecordDialog .ra-filter-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-items:center;gap:7px;min-width:0}
#builderRecordDialog .ra-filter-row label{display:block;min-width:0}
#builderRecordDialog .ra-select-caption{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
#builderRecordDialog .ra-filter-row select{width:100%;min-width:0;height:36px;padding:6px 26px 6px 10px;border:1px solid #465465;border-radius:8px;background:#151c25;color:#e3e8f0;font-size:12px}
#builderRecordDialog .ra-filter-row select:focus-visible{border-color:#99b3cf}
#builderRecordDialog .ra-viewtabs{display:flex;align-items:center;justify-content:center;gap:3px;min-width:0;padding:3px;border:1px solid #40516a;border-radius:8px;background:#0b121b;white-space:nowrap}
#builderRecordDialog .ra-viewtabs button{flex:0 0 auto;min-height:28px;padding:5px 10px;border:0;border-radius:5px;background:transparent;color:#adbdce;font-size:11.5px;font-weight:650;line-height:1.2;white-space:nowrap}
#builderRecordDialog .ra-viewtabs button:hover{color:#f3f8ff;background:#1a2a3c}
#builderRecordDialog .ra-viewtabs button[aria-pressed="true"]{color:#fff;background:#304866;font-weight:750}
#builderRecordDialog .ra-analysis-filters{display:grid;gap:7px;min-width:0}
#builderRecordDialog .ra-analysis-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;min-width:0}
#builderRecordDialog .ra-analysis-grid label{display:grid;gap:5px;min-width:0;color:#b8c5d3;font-size:10px;font-weight:650}
#builderRecordDialog .ra-analysis-grid select{width:100%;min-width:0;height:36px;padding:6px 23px 6px 9px;border:1px solid #465465;border-radius:8px;background:#151c25;color:#e3e8f0;font-size:12px}
#builderRecordDialog .ra-analysis-grid select:disabled{opacity:.5}
#builderRecordDialog .ra-analysis-overview{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-bottom:16px}
#builderRecordDialog .ra-analysis-metric{display:grid;gap:5px;min-width:0;padding:12px;border:1px solid #40536a;border-radius:10px;background:#111b27}
#builderRecordDialog .ra-analysis-metric small{color:#aec4df;font-size:10px}
#builderRecordDialog .ra-analysis-metric strong{color:#ecf5ff;font-size:20px;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-analysis-results{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
#builderRecordDialog .ra-analysis-result{display:grid;gap:4px;min-width:0;padding:10px;border:1px solid #394e67;border-radius:8px;background:#111d2b}
#builderRecordDialog .ra-analysis-result small{color:#aec4df;font-size:10px}
#builderRecordDialog .ra-analysis-result strong{color:#ecf5ff;font-size:15px;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-analysis-section{display:grid;gap:10px;min-width:0;margin:0 0 19px}
#builderRecordDialog .ra-analysis-heading{margin:0;color:#e9f2ff;font-size:14px;font-weight:800}
#builderRecordDialog .ra-analysis-note{margin:0;color:#9bb1c7;font-size:10.5px}
#builderRecordDialog .ra-analysis-chart{display:grid;gap:7px;max-height:300px;min-width:0;overflow:auto;padding:9px;border:1px solid #384b60;border-radius:10px;background:#0d151e}
#builderRecordDialog .ra-analysis-bar{display:grid;grid-template-columns:minmax(75px,126px) minmax(0,1fr) minmax(62px,90px);align-items:center;gap:10px;min-height:31px;width:100%;padding:4px 7px;border:1px solid transparent;border-radius:7px;background:#141e2a;color:#e7f2ff;text-align:left}
#builderRecordDialog .ra-analysis-bar:hover,#builderRecordDialog .ra-analysis-bar:focus-visible{border-color:#83b3e7;background:#22354b}
#builderRecordDialog .ra-analysis-bar[data-min="true"]{border-color:#bfa16a;background:#2a281f}
#builderRecordDialog .ra-analysis-player{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}
#builderRecordDialog .ra-analysis-track{display:block;height:12px;overflow:hidden;border-radius:5px;background:#27374a}
#builderRecordDialog .ra-analysis-fill{display:block;height:100%;border-radius:5px;background:#779fc9}
#builderRecordDialog .ra-analysis-bar[data-min="true"] .ra-analysis-fill{background:#dfbf7a}
#builderRecordDialog .ra-analysis-value{text-align:right;font-size:11px;font-weight:750;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-analysis-recommend .ra-cards{grid-template-columns:minmax(0,1fr)}

#builderRecordDialog .ra-refresh{flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:5px;min-height:30px;padding:4px 9px;border:1px solid #526681;border-radius:8px;background:#202a35;color:#d4e0ed;font-size:11px;white-space:nowrap}
#builderRecordDialog .ra-refresh:hover:not(:disabled){border-color:#8195ab;background:#2c3949}
#builderRecordDialog .ra-refresh:disabled{opacity:.55;cursor:wait}
#builderRecordDialog .ra-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:16px 20px 24px;scrollbar-width:none;-ms-overflow-style:none}
#builderRecordDialog .ra-scroll::-webkit-scrollbar{display:none;width:0;height:0}
#builderRecordDialog .ra-status{margin:0 0 14px;color:#a5b7cd;font-size:11px}
#builderRecordDialog .ra-empty{display:grid;place-items:center;min-height:150px;padding:20px;border:1px dashed #405878;border-radius:11px;background:#111a26;color:#bbcce0;text-align:center;white-space:pre-line}
#builderRecordDialog .ra-list{display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
#builderRecordDialog .ra-detail{width:100%;max-width:780px;min-width:0;margin-inline:auto}
#builderRecordDialog .ra-group{--ra-accent:#7fa6c7;--ra-aura:rgba(75,130,180,.09);display:grid;gap:10px;min-width:0}
#builderRecordDialog .ra-group-head{display:flex;align-items:center;gap:10px;padding:8px 10px 12px;border-bottom:1px solid var(--ra-accent);background:linear-gradient(90deg,var(--ra-aura),transparent 88%);border-radius:7px 7px 0 0}
#builderRecordDialog .ra-group-name{margin:0;font-size:16px;font-weight:800;color:var(--ra-accent)}
#builderRecordDialog .ra-group-battle{flex:0 0 auto;padding:2px 7px;border:1px solid #52667d;border-radius:100px;background:#1c2937;color:#d1deeb;font-size:10px;font-weight:700;line-height:1.5;white-space:nowrap}
#builderRecordDialog .ra-group-count{margin-left:auto;color:#aabbd1;font-size:10px;white-space:nowrap}
#builderRecordDialog .ra-legend{padding:3px 7px;border:1px solid var(--ra-accent);border-radius:100px;color:var(--ra-accent);font:700 9px/1.5 ui-monospace,monospace;letter-spacing:.09em}
#builderRecordDialog .ra-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:10px}
#builderRecordDialog .ra-card{position:relative;display:block;width:100%;min-width:0;overflow:hidden;padding:11px 12px;border:1px solid var(--ra-accent);border-radius:11px;background:linear-gradient(115deg,var(--ra-aura),transparent 75%),#101820;color:#e9f3ff;text-align:left;box-shadow:inset 0 1px #ffffff0d;transition:transform .18s,border-color .18s,background .18s}
#builderRecordDialog .ra-card:hover{transform:translateY(-2px);background:linear-gradient(115deg,var(--ra-aura),#131d28 80%);border-color:var(--ra-accent)}
#builderRecordDialog .ra-card-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(84px,112px);gap:9px;min-width:0;align-items:start}
#builderRecordDialog .ra-card-left{display:grid;align-content:start;gap:7px;min-width:0}
#builderRecordDialog .ra-card-right{display:grid;align-content:start;justify-items:end;gap:9px;min-width:0;text-align:right}
#builderRecordDialog .ra-card-field{display:grid;gap:2px;min-width:0}
#builderRecordDialog .ra-card-field small{color:#a3afc1;font-size:9px;line-height:1.35}
#builderRecordDialog .ra-card-field strong{color:#f0f6ff;font-size:17px;line-height:1.2;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-card-field[data-field="dps"] strong{color:#d3eef2;font-size:19px}
#builderRecordDialog .ra-card-field[data-field="achievement"] strong{font-size:15px}
#builderRecordDialog .ra-card-mode{color:#e7eafa;font-size:11px;font-weight:650;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#builderRecordDialog .ra-card-context{color:#bcc8d8;font-size:10.5px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#builderRecordDialog .ra-card-difficulty{display:grid;align-content:start;justify-items:start;gap:2px;margin-top:4px;min-width:0}
#builderRecordDialog .ra-card-difficulty small{color:#9ba9bd;font-size:10px;line-height:1.35}
#builderRecordDialog .ra-difficulty-name{color:var(--ra-difficulty-color,var(--ra-accent));font-size:23px;line-height:1.15;font-weight:900;letter-spacing:-.035em;overflow-wrap:anywhere;text-shadow:0 1px 0 #000}
#builderRecordDialog .ra-stage-grade{margin-top:3px;padding:2px 6px;border:1px solid var(--ra-accent);border-radius:5px;color:var(--ra-accent);font-size:10px;font-weight:800;white-space:nowrap}
#builderRecordDialog .ra-card[data-grade="18"] .ra-stage-grade,#builderRecordDialog .ra-card[data-grade="19"] .ra-stage-grade,#builderRecordDialog .ra-card[data-grade="20"] .ra-stage-grade{color:#e7a4f5;border-color:#9e71c3;background:#251a36}
#builderRecordDialog .ra-tags{display:flex;flex-wrap:wrap;gap:5px;min-width:0}
#builderRecordDialog .ra-tag{padding:2px 6px;border:1px solid #465c78;border-radius:5px;background:#20314a;color:#bbd8f7;font-size:9px;overflow-wrap:anywhere}
#builderRecordDialog .ra-group[data-legend] .ra-card{background:linear-gradient(110deg,var(--ra-aura),#101822 90%);border-color:var(--ra-accent);box-shadow:inset 0 1px #ffffff12}
#builderRecordDialog .ra-group[data-legend="19"] .ra-card{box-shadow:inset 0 0 0 1px #ffffff0b}
#builderRecordDialog .ra-group[data-legend="20"] .ra-card{box-shadow:inset 0 0 0 1px #ffdf9924}
#builderRecordDialog .ra-group[data-legend] .ra-card:hover{box-shadow:inset 0 0 0 1px #ffffff20}
#builderRecordDialog .ra-back{min-height:34px;padding:6px 13px;border:1px solid #4c6684;border-radius:8px;background:#19283b;color:#dfedff}
#builderRecordDialog .ra-detail-head{display:flex;align-items:center;justify-content:space-between;gap:9px;margin:0 0 15px}
#builderRecordDialog .ra-detail-person{display:grid;justify-items:end;gap:3px;min-width:0;text-align:right}
#builderRecordDialog .ra-detail-person small{color:#9db5cf;font-size:10px}
#builderRecordDialog .ra-detail-person strong{font-size:17px;color:#eff7ff;overflow-wrap:anywhere}
#builderRecordDialog .ra-report-heading{margin:0;padding:10px 12px;border:1px solid #353a43;border-bottom:0;border-radius:7px 7px 0 0;background:#191e25;color:#f0f1f3;font-size:13px;font-weight:750;text-align:center}
#builderRecordDialog .ra-detail-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-bottom:0;border:1px solid #353a43}
#builderRecordDialog .ra-metric{display:flex;flex-direction:column;justify-content:center;min-width:0;min-height:70px;padding:9px 6px;border-right:1px solid #353a43;border-bottom:1px solid #353a43;background:#101317;text-align:center}
#builderRecordDialog .ra-metric:nth-child(3n){border-right:0}
#builderRecordDialog .ra-metric:nth-last-child(-n+3){border-bottom:0}
#builderRecordDialog .ra-metric small{display:block;color:#adb6c1;font-size:10px}
#builderRecordDialog .ra-metric strong{display:block;margin-top:4px;color:#eef0f3;font-size:14px;overflow-wrap:anywhere;white-space:pre-line;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-detail > .ra-tags{margin:0 0 11px}
#builderRecordDialog .ra-report{width:100%;min-width:0;margin-top:16px;overflow-wrap:anywhere;color:#e0e4eb;font-size:12px;line-height:1.6}
#builderRecordDialog .ra-report .ra-structured{display:grid;gap:20px}
#builderRecordDialog .ra-report .ra-section{width:100%;min-width:0;margin:0}
#builderRecordDialog .ra-report .ra-table-wrap{width:100%;max-width:100%;overflow-x:auto;border:1px solid #323b47;border-radius:10px;background:#10151b;scrollbar-width:none;-ms-overflow-style:none}
#builderRecordDialog .ra-report .ra-table-wrap::-webkit-scrollbar{display:none;width:0;height:0}
#builderRecordDialog .ra-report table{width:100%;border-collapse:separate;border-spacing:0;margin:0;table-layout:fixed}
#builderRecordDialog .ra-report :is(td,th){padding:10px 12px;border:0;border-bottom:1px solid #29323d;background:#111820;color:#e8edf2;vertical-align:middle;white-space:normal;overflow-wrap:anywhere}
#builderRecordDialog .ra-report thead th{background:#1c2530;font-weight:650}
#builderRecordDialog .ra-report th.ra-section-heading{padding:11px 12px;background:#1b222b;color:#f2f3f6;text-align:center;font-size:12px;font-weight:750}
#builderRecordDialog .ra-report tbody tr:last-child td{border-bottom:0}
#builderRecordDialog .ra-report .ra-pairs td:first-child{width:38%;background:#171f28;color:#bac7d5;font-weight:600;text-align:center}
#builderRecordDialog .ra-report .ra-pairs td:nth-child(2){width:62%;text-align:left}
#builderRecordDialog .ra-report .ra-resources td:nth-child(2){text-align:left;font-variant-numeric:tabular-nums}
#builderRecordDialog .ra-report .ra-buff-value span{display:block;white-space:normal}
#builderRecordDialog .ra-report .ra-buff-value span+span{margin-top:4px}
#builderRecordDialog .ra-report .ra-sanctuary{width:100%;min-width:630px;border-collapse:collapse;table-layout:fixed;}
.ra-sanctuary :is(th,td){text-align:center!important;vertical-align:middle;}
.ra-sanctuary .ra-section-heading{text-align:center!important;}
.ra-units{min-width:780px}
#builderRecordDialog .ra-report .ra-units th:not(.ra-section-heading){text-align:center;font-size:11px;color:#cbd7e5}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(1){width:6%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(2){width:26%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(3){width:8%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(4){width:9%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(5){width:12%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(6){width:12%}
#builderRecordDialog .ra-report .ra-units thead tr:nth-child(2) th:nth-child(7){width:27%}
#builderRecordDialog .ra-report .ra-units td{text-align:center;font-size:11px}
#builderRecordDialog .ra-report .ra-units tr[data-slot-start] td:nth-child(2){text-align:left;color:#e5eaf1;font-weight:650}
#builderRecordDialog .ra-report .ra-units tbody tr[data-slot-start]:not(:first-child) td{border-top:1px solid #475161}
#builderRecordDialog .ra-report .ra-report-note{padding:12px;border:1px dashed #4a6078;border-radius:8px;color:#b1c6dd}
@media(max-width:640px){#builderRecordDialog .ra-cards{grid-template-columns:minmax(0,1fr)}#builderRecordDialog .ra-analysis-recommend .ra-cards{grid-template-columns:minmax(0,1fr)}}
@media(max-width:560px){
 #builderRecordDialog{width:calc(100vw - 16px);height:calc(100dvh - 18px);border-radius:12px}
 #builderRecordDialog .ra-head{grid-template-columns:minmax(0,1fr) auto;gap:6px;padding:6px 10px}
 #builderRecordDialog .ra-head-brand{grid-column:1;grid-row:1}
 #builderRecordDialog .ra-head-actions{grid-column:2;grid-row:1}
 #builderRecordDialog .ra-viewtabs{grid-column:1/-1;grid-row:2;width:100%;justify-self:stretch}
 #builderRecordDialog .ra-viewtabs button{flex:1 1 0;min-width:0}
 #builderRecordDialog .ra-head-brand{gap:6px}
 #builderRecordDialog .ra-head-actions{gap:5px}
 #builderRecordDialog .ra-mark{flex-basis:28px;width:28px;height:28px;border-radius:8px}
 #builderRecordDialog .ra-mark svg{width:17px;height:17px}
 #builderRecordDialog .ra-title small{display:none}
 #builderRecordDialog .ra-title h2{font-size:13px}
 #builderRecordDialog .ra-viewtabs{gap:2px;padding:2px;border-radius:7px}
 #builderRecordDialog .ra-viewtabs button{min-height:28px;padding:5px 7px;font-size:10.5px}
 #builderRecordDialog .ra-controls{padding:7px 10px 9px}
 #builderRecordDialog .ra-analysis-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
 #builderRecordDialog .ra-analysis-grid select{height:38px}
 #builderRecordDialog .ra-analysis-grid label:last-child{grid-column:1/-1}
 #builderRecordDialog .ra-analysis-results{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
 #builderRecordDialog .ra-analysis-result{padding:8px}
 #builderRecordDialog .ra-analysis-result strong{font-size:13px}
 #builderRecordDialog .ra-analysis-bar{grid-template-columns:minmax(61px,95px) minmax(0,1fr) minmax(54px,77px);gap:6px;padding:4px}
 #builderRecordDialog .ra-analysis-overview{gap:7px}
 #builderRecordDialog .ra-analysis-metric{padding:10px}
 #builderRecordDialog .ra-analysis-metric strong{font-size:16px}
 #builderRecordDialog .ra-filter-matrix{gap:7px}
 #builderRecordDialog .ra-filter-group{grid-template-columns:55px minmax(0,1fr);gap:6px}
 #builderRecordDialog .ra-filter-label{font-size:10.5px}
 #builderRecordDialog .ra-tabs,#builderRecordDialog .ra-battle{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;overflow:visible}
 #builderRecordDialog .ra-tabs button,#builderRecordDialog .ra-battle button{flex:none;min-width:0;min-height:36px;padding:6px 4px;font-size:11px;white-space:normal}
 #builderRecordDialog .ra-filter-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;overflow:visible}
 #builderRecordDialog .ra-filter-row label{min-width:0}
 #builderRecordDialog .ra-filter-row select{height:38px}
 #builderRecordDialog .ra-refresh{width:30px;min-height:32px;height:32px;padding:0}
 #builderRecordDialog .ra-refresh-label{display:none}
 #builderRecordDialog .ra-close{flex-basis:30px;width:30px;height:32px}
 #builderRecordDialog .ra-scroll{padding:13px 11px 18px}
 #builderRecordDialog .ra-detail-summary{gap:4px}
 #builderRecordDialog .ra-metric strong{font-size:12px}
 #builderRecordDialog .ra-card{min-height:110px;padding:11px 10px}
 #builderRecordDialog .ra-card-layout{grid-template-columns:minmax(0,1fr) minmax(90px,112px);gap:8px}
 #builderRecordDialog .ra-card-mode{font-size:10.5px}
 #builderRecordDialog .ra-difficulty-name{font-size:24px}
 #builderRecordDialog .ra-card-field strong{font-size:16px}
 #builderRecordDialog .ra-card-right{gap:11px}
 #builderRecordDialog .ra-report :is(td,th){padding:7px 6px}
 #builderRecordDialog .ra-report .ra-table-wrap{scrollbar-width:thin;scrollbar-color:#52677e transparent;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
 #builderRecordDialog .ra-metric{min-height:66px;padding:7px 3px}
}
@media(max-width:360px){
 #builderRecordDialog .ra-head{gap:4px;padding-inline:8px}
 #builderRecordDialog .ra-mark{display:none}
 #builderRecordDialog .ra-title h2{font-size:12px}
 #builderRecordDialog .ra-viewtabs{gap:1px;padding:2px}
 #builderRecordDialog .ra-viewtabs button{padding-inline:5px;font-size:10px}
 #builderRecordDialog .ra-head-actions{gap:3px}
 #builderRecordDialog .ra-refresh{width:27px}
 #builderRecordDialog .ra-close{flex-basis:27px;width:27px}
}
@media(prefers-reduced-motion:reduce){#builderRecordDialog .ra-card{transition:none}}
`;
  document.head.appendChild(style);

  // ── 02 · 모달 구조·공통 상태 ──
  // Keep markup inside the owner file; only the trigger belongs to the existing header.
  const archiveTrigger = trigger;
  const archiveDialog = document.createElement('dialog');
  archiveDialog.id = 'builderRecordDialog';
  archiveDialog.setAttribute('aria-labelledby', 'ra-title');
  archiveDialog.innerHTML = `
    <header class="ra-head">
      <div class="ra-head-brand"><span class="ra-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v7a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></svg></span><div class="ra-title"><small>BUILDER · RECORD HALL</small><h2 id="ra-title">기록의 전당</h2></div></div>
      <nav class="ra-viewtabs" aria-label="기록의 전당 메뉴"><button type="button" data-ra-view="patch" aria-pressed="true">패치노트</button><button type="button" data-ra-view="records" aria-pressed="false">기록 목록</button><button type="button" data-ra-view="analysis" aria-pressed="false">기록 분석</button></nav>
      <div class="ra-head-actions"><button class="ra-refresh" id="ra-refresh" type="button" title="기록 새로고침" aria-label="기록 새로고침"><span aria-hidden="true">↻</span><span class="ra-refresh-label">새로고침</span></button><button class="ra-close" type="button" aria-label="기록의 전당 닫기">×</button></div>
    </header>
    <section class="ra-patch-pane" aria-label="패치노트">
    <div class="bp-controls">
      <div class="bp-toolbar"><label class="bp-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.3"/><path d="m15 15 5 5"/></svg><input id="bp-query" type="search" placeholder="버전 · 태그 · 내용 검색" aria-label="패치노트 검색" autocomplete="off"/></label><button id="bp-refresh" type="button">새로고침</button></div>
      <div class="bp-periodbar" aria-label="기간 및 버전 선택"><span id="bp-range" class="bp-range"></span><div class="bp-periodtabs" role="group" aria-label="패치노트 기간"><button type="button" data-period="latest" aria-pressed="true">최신 내역</button><button type="button" data-period="past" aria-pressed="false">이전 내역</button></div><select id="bp-version" class="bp-version" aria-label="버전 선택"></select></div>
      <nav class="bp-filters" aria-label="패치노트 카테고리"><button type="button" data-kind="all" aria-pressed="true">전체</button><button type="button" data-kind="update" aria-pressed="false">업데이트</button><button type="button" data-kind="preset" aria-pressed="false">프리셋</button><button type="button" data-kind="fix" aria-pressed="false">오류수정</button><button type="button" data-kind="improve" aria-pressed="false">개선사항</button></nav>
    </div>
    <main class="bp-scroll"><div id="bp-summary" class="bp-summary">전체 기간 · 불러오는 중</div><div id="bp-empty" class="bp-empty" role="status">패치노트를 불러오는 중입니다.</div><section id="bp-list" class="bp-list" aria-label="패치노트 목록"></section></main>
    <footer id="bp-reader" class="bp-reader" hidden><button id="bp-prev" type="button">‹ 이전</button><span id="bp-position" class="bp-position"></span><button id="bp-next" type="button">다음 ›</button></footer>
    </section>
    <section class="ra-record-pane" aria-label="기록 목록과 분석" hidden>
    <div class="ra-controls" id="ra-controls">
      <div class="ra-filter-matrix" aria-label="기록의 전당 기록 필터">
        <div class="ra-filter-group">
          <span class="ra-filter-label">게임 종류</span>
          <nav class="ra-tabs" role="group" aria-label="게임 종류"><button type="button" data-ra-mode="개인전" aria-pressed="true">개인전</button><button type="button" data-ra-mode="협동전" aria-pressed="false">협동전</button><button type="button" data-ra-mode="도전의 탑" aria-pressed="false">도전의 탑</button><button type="button" data-ra-mode="행성탐사" aria-pressed="false">행성탐사</button></nav>
        </div>
        <div class="ra-filter-group">
          <span class="ra-filter-label">기록 유형</span>
          <div class="ra-battle" role="group" aria-label="기록 유형"><button type="button" data-ra-battle="전체" aria-pressed="true">전체</button><button type="button" data-ra-battle="일반" aria-pressed="false">일반 기록</button><button type="button" data-ra-battle="유물" aria-pressed="false">유물 기록</button><button type="button" data-ra-battle="명예" aria-pressed="false">명예 기록</button></div>
        </div>
        <div class="ra-filter-group">
          <span class="ra-filter-label">기록 조건</span>
          <div class="ra-filter-row"><label><span class="ra-select-caption">게임 모드</span><select id="ra-game" class="ra-native-select"><option value="전체">게임 모드 전체</option><option value="일반">일반 모드</option><option value="스피드">스피드 모드</option></select></label><label><span class="ra-select-caption">난이도</span><select id="ra-difficulty" class="ra-native-select"><option value="전체">전체 난이도</option></select></label><label><span class="ra-select-caption">고행 / 층</span><select id="ra-stage" class="ra-native-select"><option value="전체">전체 고행 / 층</option></select></label><label><span class="ra-select-caption">플레이어</span><select id="ra-player" class="ra-native-select"><option value="전체">전체 플레이어</option></select></label></div>
        </div>
        <div class="ra-analysis-filters" id="ra-analysis-filters" hidden>
          <div class="ra-analysis-grid">
            <label>모드<select id="ra-analysis-game" class="ra-native-select"></select></label>
            <label>난이도<select id="ra-analysis-difficulty" class="ra-native-select"></select></label>
            <label>고행 / 층<select id="ra-analysis-stage" class="ra-native-select"></select></label>
            <label>라운드<select id="ra-analysis-round" class="ra-native-select"></select></label>
            <label>DPS 종류<select id="ra-analysis-kind" class="ra-native-select"></select></label>
          </div>
        </div>
      </div>
    </div>
    <main class="ra-scroll"><p class="ra-status" id="ra-status" role="status">기록을 불러오는 중입니다.</p><div class="ra-empty" id="ra-empty" hidden></div><section class="ra-list" id="ra-list" aria-label="고행별 기록 목록"></section></main>
    </section>
  `;
  document.body.appendChild(archiveDialog);
  const ra = (selector) => archiveDialog.querySelector(selector);
  const raScroll = ra('.ra-scroll');
  const raList = ra('#ra-list');
  const raEmpty = ra('#ra-empty');
  const raStatus = ra('#ra-status');
  const raRefresh = ra('#ra-refresh');
  const $ = (selector) => archiveDialog.querySelector(selector);
  const scroll = $('.bp-scroll');
  const list = $('#bp-list');
  const empty = $('#bp-empty');
  const summary = $('#bp-summary');
  const nav = $('#bp-reader');
  const refreshButton = $('#bp-refresh');
  const refreshInterval = 60_000;
  const repository = 'nxsbuild/build';
  const creator = 'nxsbuild';
  const formatDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const statusLabel = { update: 'VERSION UPDATE', new: 'NEW MODE', preset: 'PRESET', fix: 'BUG FIX', improve: 'IMPROVEMENT' };
  const escapeElement = (tag, text, className = '') => {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const dateString = (value) => {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    const parts = Object.fromEntries(formatDate.formatToParts(date).map(({ type, value }) => [type, value]));
    return `${parts.year}.${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
  };
  const httpsUrl = (raw) => {
    try { const url = new URL(raw); return url.protocol === 'https:' ? url : null; } catch { return null; }
  };

  let notes = [];
  let chosenKind = 'all';
  let chosenPeriod = 'latest';
  let chosenVersion = '';
  let versionManuallySelected = false;
  let renderedMonth = '';
  let search = '';
  let openedNumber = null;
  let listScrollPosition = 0;
  let lastAttempt = 0;
  let retryAfter = 0;
  let loading = false;
  let records = [];
  const recordFilters = { mode: '개인전', battle: '전체', game: '전체', difficulty: '전체', stage: '전체', player: '전체' };
  let openedRecord = null;
  let recordScrollPosition = 0;
  let recordFetchFailed = false;
  let hasFetched = false;
  let recordView = 'records';
  let activeView = 'patch';
  let recordListBattle = '전체';
  const analysisFilters = {game:'',difficulty:'',stage:'',round:'',kind:''};

  // ── 03 · GitHub 이슈 분류·본문 처리 ──
  // Version labels identify a release; content categories are independent of the version.
  // [기록] 제목은 플레이어명·자유 태그·개인전 전용 '명예' 접미어를 구분한다.
  function recordHashtags(text) {
    return [...String(text || '').matchAll(/(?:^|[\s|,，])#([^\s#,，|\[\](){}<>]+)/gmu)]
      .map((match) => match[1].replace(/[.!?;:，。*`~]+$/gu, ''))
      .filter((tag) => tag && !/^\d+$/u.test(tag) && tag.length <= 48);
  }
  function isCreatorIssue(issue) {
    return !!issue && !issue.pull_request && issue.user?.login?.toLowerCase() === creator;
  }
  function normalizeRecord(issue) {
    if (!isCreatorIssue(issue)) return null;
    const title = /^\[기록\]\s*(.+)$/u.exec(String(issue.title || '').trim())?.[1]?.trim();
    if (!title) return null;
    const titleTags = recordHashtags(title);
    const titledPlayer = title.replace(/(?:^|\s)#[^\s#]+/gu, ' ').replace(/\s+/gu, ' ').trim();
    const honor = /(?:^|\s)명예$/u.test(titledPlayer);
    const player = (honor ? titledPlayer.replace(/(?:^|\s)명예$/u, '') : titledPlayer).trim();
    if (!player) return null;
    const body = String(issue.body || '').trim();
    // 기록 보관소는 검증된 텍스트 보고서 형식만 처리한다. 붙여넣기 HTML은 지원하지 않는다.
    if (!/^\s*(?:\*\*)?클리어\s*기록\s*보고서(?:\*\*)?\s*$/mu.test(body) ||
        !/^\s*(?:\*\*)?빌드\s*설정(?:\*\*)?\s*$/mu.test(body) ||
        !/^\s*(?:\*\*)?선택\s*유닛\s*정보\s*\([^)]+\)(?:\*\*)?\s*$/mu.test(body) ||
        /<(?:table|thead|tbody|tr|td|th)\b/iu.test(body)) return null;
    // 지원하는 마크다운 표·텍스트 보고서의 메타데이터를 정규화한다.
    const plain = (value) => String(value || '').replace(/<br\s*\/?\s*>/giu, ' ')
      .replace(/<[^>]*>/gu, ' ').replace(/&(?:nbsp|#160);/giu, ' ').replace(/[|*_`~]/gu, ' ')
      .replace(/\s+/gu, ' ').trim();
    const source = plain(body);
    const modeText = /모드\s*난이도\s*:?\s*(.*?)(?=\s*(?:-\s*)?(?:고행(?:\s*라운드)?\s*:|라운드\s*:|스펙\s*DPS|유물\s*DPS|클리어\s*기준))/u.exec(source)?.[1] || '';
    const parts = modeText.split('·').map((piece) => piece.trim()).filter(Boolean);
    const game = parts[0] === '스피드' ? '스피드' : parts[0] === '일반' ? '일반' : '';
    let mode = parts[1] || '';
    const difficulty = parts[parts.length - 1] || '';
    if (/도전의\s*탑/u.test(modeText)) mode = '도전의 탑';
    else if (/행성탐사/u.test(modeText)) mode = '행성탐사';
    if (!['개인전','협동전','도전의 탑','행성탐사'].includes(mode) || !game || !difficulty) return null;
    // 명예는 제목 메타데이터이며 협동전·탑·탐사에는 적용하지 않는다.
    if (honor && mode !== '개인전') return null;
    const penance = /(?:고행(?:\s*라운드)?\s*:?)[\s-]*(\d{1,2})\s*고행/u.exec(source);
    const floor = /(?:고행(?:\s*라운드)?\s*:?)\s*(\d{1,3})\s*층/u.exec(source);
    const round = /(?:라운드\s*:\s*(\d{1,3})\s*라운드|고행\s*라운드\s*:?\s*\d{1,3}\s*(?:고행|층)\s*[·\s]*(\d{1,3})\s*라운드)/u.exec(source);
    const stageValue = mode === '도전의 탑' || mode === '행성탐사' ? floor?.[1] : penance?.[1];
    const stage = stageValue === undefined ? NaN : Number(stageValue);
    if (!Number.isInteger(stage) || stage < 0 || (mode === '개인전' || mode === '협동전' ? stage > 20 : stage < 1 || stage > 100)) return null;
    if (honor && ![0,10,17,19,20].includes(stage)) return null;
    const artifactDps = /유물\s*DPS\s*:?\s*([\d,.]+)/u.exec(source);
    const normalDps = /스펙\s*DPS\s*:?\s*([\d,.]+)/u.exec(source);
    const dps = artifactDps?.[1] || normalDps?.[1];
    if (!dps) return null;
    const numericValue = (label) => {
      const match = new RegExp(label + '\\s*:?\\s*([\\d,.]+\\s*(?:조|억|만|%)?)', 'u').exec(source);
      return match ? match[1].replace(/\s+/gu, '') : '—';
    };
    const tags = [...new Set([...titleTags, ...recordHashtags(body)])].sort((a,b) => a.localeCompare(b,'ko'));
    return {
      number: issue.number, player, mode, battle: honor ? '명예' : artifactDps ? '유물' : '일반', dpsKind: artifactDps ? '유물' : '스펙', game, difficulty,
      dataMode: parts[2] || '', team: parts.find((part) => /^\d+인$/u.test(part)) || '',
      stage, round: round ? Number(round[1] || round[2]) : null, dps, required: numericValue('클리어\\s*기준'),
      expected: numericValue('클리어\\s*기대값'), achievement: numericValue('클리어\\s*달성률'),
      tags, body, publishedAt: issue.created_at,
    };
  }

  function normalizeIssue(issue) {
    if (!isCreatorIssue(issue)) return null;
    const rawTitle = String(issue.title || '').trim();
    const body = String(issue.body || '').trim();
    if (!rawTitle || /^\[기록\]/u.test(rawTitle)) return null;
    const tags = [...new Set([...rawTitle.matchAll(/#([^\s#,，|\[\]]+)/gu)].map((match) => match[1]))];
    const prefix = /^(?:\s*\[[^\]]+\]\s*)+/u.exec(rawTitle)?.[0] || '';
    // 대괄호는 카테고리, #태그는 검색용으로만 사용한다.
    const classifications = [...prefix.matchAll(/\[([^\]]+)\]/gu)].map((match) => match[1]).join(' ');
    const version = (prefix || rawTitle).match(/\b(?:bdV\d+[\w.-]*|build-v\d+[\w.-]*|v\d+[\w.-]*)\b/iu)?.[0] || '';
    // 지정된 카테고리가 있으면 해당 분류만 표시한다. VERSION UPDATE는 분류가 없는 이슈에만 표시한다.
    const kinds = [];
    if (/(?:신규\s*기능|new[\s_-]*mode|newmode)/iu.test(classifications)) kinds.push('new');
    if (/(?:프리셋|preset)/iu.test(classifications)) kinds.push('preset');
    if (/(?:오류\s*수정|버그\s*수정|bug[\s_-]*fix)/iu.test(classifications)) kinds.push('fix');
    if (/(?:개선\s*사항|개선|improvement)/iu.test(classifications)) kinds.push('improve');
    if (!kinds.length) kinds.push('update');
    const heading = body.split(/\r?\n/gu).map((line) => /^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/u.exec(line)?.[1] || '')
      .find((line) => line && !/^(?:변경\s*사항|업데이트\s*내용|상세\s*내용|공지\s*사항)$/u.test(line.trim()));
    const titleRemainder = rawTitle.slice(prefix.length).replace(/#[^\s#,，|\[\]]+/gu, ' ').replace(/\s+/gu, ' ').trim();
    const bodyFirstLine = body.split(/\r?\n/gu).map((line) => line.trim())
      .find((line) => line && !/^(?:[-*+]\s+|\| |---|```|!\[)/u.test(line)) || '';
    const title = (heading || titleRemainder || bodyFirstLine || rawTitle).replace(/^#{1,6}\s+/u, '').trim();
    return {
      number: issue.number, kinds, version, tags, title, body, html: issue.body_html || '',
      publishedAt: issue.created_at, name: [version, title].filter(Boolean).join(' '),
    };
  }

  const safeTags = new Set(['p', 'ul', 'ol', 'li', 'strong', 'em', 'del', 'code', 'pre', 'blockquote', 'hr', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a']);
  function renderBody(note) {
    const container = escapeElement('div', '', 'bp-body');
    if (!note.html) {
      container.append(escapeElement('p', note.body, 'bp-plain'));
      return container;
    }
    const template = document.createElement('template');
    template.innerHTML = note.html;
    const attachments = note.body.match(/https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]{36}/gi) || [];
    function append(parent, node) {
      if (node.nodeType === Node.TEXT_NODE) { parent.append(node.textContent); return; }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toLowerCase();
      if (['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'].includes(tag)) return;
      if (tag === 'img') {
        const src = httpsUrl(node.getAttribute('src'));
        if (!src) return;
        const stable = attachments.find((url) => src.pathname.includes(url.split('/').pop()));
        const url = stable || src.href;
        const link = escapeElement('a', '', 'bp-image-link');
        link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        const image = escapeElement('img', '', 'bp-image');
        image.alt = node.getAttribute('alt') || '패치노트 첨부 이미지';
        image.loading = 'lazy'; image.decoding = 'async'; image.referrerPolicy = 'no-referrer';
        image.src = url;
        image.addEventListener('error', () => { image.hidden = true; link.append('이미지 원본 보기 ↗'); }, { once: true });
        link.append(image); parent.append(link);
        return;
      }
      const href = tag === 'a' ? httpsUrl(node.getAttribute('href')) : null;
      const isHeading = /^h[1-6]$/.test(tag);
      const allowed = isHeading || (safeTags.has(tag) && (tag !== 'a' || href));
      const target = allowed ? document.createElement(isHeading ? 'h4' : tag) : parent;
      if (href && allowed) { target.href = href.href; target.rel = 'noopener noreferrer'; target.target = '_blank'; }
      for (const child of node.childNodes) append(target, child);
      if (allowed) parent.append(target);
    }
    for (const node of template.content.childNodes) append(container, node);
    return container;
  }

  // ── 04 · 패치노트·기록의 전당 목록 표시 ──
  // 한국시간 기준 현재 월을 최신 내역으로 분류하며, 이전 달은 월별로 보관한다.
  const monthKey = (value) => dateString(value).slice(0, 7);
  const baseVersion = (note) => {
    const match = /^v(\d+)(?:[a-z]+)?$/iu.exec(note.version || '');
    return match ? `V${match[1]}` : (note.version || '').replace(/^v/iu, 'V');
  };
  function byMonth(items) {
    const months = new Map();
    for (const note of items) {
      const key = monthKey(note.publishedAt);
      if (key && !months.has(key)) months.set(key, []);
      if (key) months.get(key).push(note);
    }
    return [...months].sort(([a], [b]) => b.localeCompare(a)).map(([month, items]) => ({ month, items }));
  }
  function periodNotes() {
    const current = monthKey(new Date());
    return notes.filter((note) => {
      const key = monthKey(note.publishedAt);
      return key && (chosenPeriod === 'latest' ? key === current : key < current);
    });
  }
  function updatePeriodControls() {
    const current = monthKey(new Date());
    const [year, month] = current.split('.').map(Number);
    $('#bp-range').textContent = chosenPeriod === 'latest'
      ? `${year}년 ${month}월`
      : `${year}년 ${month}월 이전`;
    $('.bp-periodtabs [aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
    $(`.bp-periodtabs [data-period="${chosenPeriod}"]`).setAttribute('aria-pressed', 'true');
    const versions = [...new Set(periodNotes().map(baseVersion).filter(Boolean))].sort((a, b) => {
      const av = /^V(\d+)$/iu.exec(a), bv = /^V(\d+)$/iu.exec(b);
      if (av && bv) return Number(bv[1]) - Number(av[1]);
      if (av) return -1;
      if (bv) return 1;
      return b.localeCompare(a);
    });
    if (!versionManuallySelected || !versions.includes(chosenVersion)) {
      chosenVersion = versions[0] || '';
      versionManuallySelected = false;
    }
    const select = $('#bp-version');
    const options = versions.map((version) => {
      const option = escapeElement('option', version);
      option.value = version;
      return option;
    });
    if (!options.length) {
      const option = escapeElement('option', '등록된 버전 없음');
      option.value = '';
      option.disabled = true;
      options.push(option);
    }
    select.replaceChildren(...options);
    select.value = chosenVersion;
    select.disabled = !versions.length;
    renderedMonth = current;
  }
  function filteredNotes() {
    const matches = periodNotes().filter((note) =>
      chosenVersion && baseVersion(note) === chosenVersion &&
      (chosenKind === 'all' || note.kinds.includes(chosenKind)) &&
      [note.name, ...note.tags, note.body, ...note.kinds.map((kind) => statusLabel[kind])].join(' ').toLocaleLowerCase().includes(search));
    // 이전 내역은 월 역순, 각 월에서는 버전 역순으로 표시하고 상세보기 이동 순서도 맞춘다.
    return byMonth(matches).flatMap(({ items }) => groupByRelease(items).flatMap((group) => group.items));
  }
  function focusCard(number) {
    list.querySelector(`details[data-number="${number}"] > summary`)?.focus({ preventScroll: true });
  }
  function toggleReader(number) {
    if (openedNumber === number) {
      openedNumber = null;
      render();
      scroll.scrollTop = listScrollPosition;
      focusCard(number);
    } else {
      if (openedNumber === null) listScrollPosition = scroll.scrollTop;
      openedNumber = number;
      render();
      scroll.scrollTop = 0;
      focusCard(number);
    }
  }
  function resetReader() {
    openedNumber = null;
    listScrollPosition = 0;
    scroll.scrollTop = 0;
  }
  // 같은 버전의 GitHub 이슈를 한 묶음으로 표시하고 기존 이슈별 상세보기는 유지한다.
  function groupByRelease(items) {
    const groups = [];
    const byVersion = new Map();
    for (const note of items) {
      const numericRelease = /^v(\d+)(?:[a-z]+)?$/iu.exec(note.version || '');
      const releaseVersion = numericRelease ? `V${numericRelease[1]}` : note.version;
      const key = releaseVersion ? releaseVersion.toLocaleLowerCase() : '__unversioned__';
      let group = byVersion.get(key);
      if (!group) {
        group = { version: releaseVersion, publishedAt: note.publishedAt, items: [] };
        byVersion.set(key, group);
        groups.push(group);
      }
      group.items.push(note);
      if (new Date(note.publishedAt) > new Date(group.publishedAt)) group.publishedAt = note.publishedAt;
    }
    // GitHub 이슈 작성 순서와 관계없이 기본 버전 번호가 큰 그룹을 먼저 표시한다.
    groups.sort((a, b) => {
      const aVersion = /^V(\d+)$/iu.exec(a.version || '');
      const bVersion = /^V(\d+)$/iu.exec(b.version || '');
      if (aVersion && bVersion) return Number(bVersion[1]) - Number(aVersion[1]);
      if (aVersion) return -1;
      if (bVersion) return 1;
      return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    });
    for (const group of groups) {
      group.items.sort((a, b) => (Date.parse(b.publishedAt) - Date.parse(a.publishedAt)) || (b.number - a.number));
    }
    return groups;
  }
  // 이슈 본문의 첫 설명만 목록에 노출하며 원문·상세보기 데이터는 변경하지 않는다.
  function shortDescription(note) {
    const lines = note.body.split(/\r?\n/gu);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || /^(?:#{1,6}\s|```|~~~|\||---|!\[|<img)/u.test(trimmed)) continue;
      const plain = trimmed.replace(/!\[([^\]]*)\]\([^)]+\)/gu, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
        .replace(/^[-*+]\s+|^\d+[.)]\s+/u, '')
        .replace(/[`*_~]/gu, '').replace(/<[^>]*>/gu, '').trim();
      if (plain && plain !== note.title && !/^(?:변경\s*사항|업데이트\s*내용|상세\s*내용|공지\s*사항)$/u.test(plain)) return plain;
    }
    return '';
  }
  // ── 04-A · 패치노트 목록·상세 렌더링 ──
  function render() {
    updatePeriodControls();
    const selected = filteredNotes();
    const active = selected.find((note) => note.number === openedNumber);
    if (!active) openedNumber = null;
    const displayed = active ? [active] : selected;
    const makeRelease = (group) => {
      const section = escapeElement('section', '', 'bp-release');
      const heading = escapeElement('header', '', 'bp-release-head');
      const label = escapeElement('div', '', 'bp-release-heading');
      label.append(escapeElement('span', 'UPDATE', 'bp-release-kicker'));
      const versionName = group.version
        ? (/^v\d/iu.test(group.version) ? 'Builder ' + group.version.replace(/^v/iu, 'V') : group.version)
        : '기타 업데이트';
      label.append(escapeElement('h3', versionName, 'bp-release-title'));
      const meta = escapeElement('div', '', 'bp-release-meta');
      const date = escapeElement('time', dateString(group.publishedAt).split(' ')[0]);
      date.dateTime = group.publishedAt;
      meta.append(date, escapeElement('span', `${group.items.length}개 항목`));
      heading.append(label, meta);
      const items = escapeElement('div', '', 'bp-release-items');
      const cards = group.items.map((note) => {
        const details = document.createElement('details');
        details.className = 'bp-card';
        details.dataset.number = note.number;
        details.dataset.tone = note.kinds.includes('fix') ? 'fix' : note.kinds.includes('improve') ? 'improve' : 'default';
        details.open = note.number === openedNumber;
        const head = document.createElement('summary');
        const top = escapeElement('div', '', 'bp-top');
        top.append(escapeElement('span', note.title, 'bp-preview'));
        const timestamp = escapeElement('time', dateString(note.publishedAt));
        timestamp.dateTime = note.publishedAt;
        top.append(timestamp);
        const second = escapeElement('div', '', 'bp-second');
        const kinds = escapeElement('span', '', 'bp-kinds');
        note.kinds.forEach((kind, index) => {
          const unit = escapeElement('span', '', 'bp-kind-unit');
          if (index) unit.append(escapeElement('span', '·', 'bp-kind-separator'));
          const status = escapeElement('span', statusLabel[kind], 'bp-kind');
          status.dataset.kind = kind;
          unit.append(status);
          kinds.append(unit);
        });
        second.append(kinds);
        for (const tag of note.tags) second.append(escapeElement('span', '#' + tag, 'bp-tag'));
        head.append(top, second);
        const excerpt = shortDescription(note);
        if (excerpt && !details.open) head.append(escapeElement('p', excerpt, 'bp-excerpt'));
        head.addEventListener('click', (event) => { event.preventDefault(); toggleReader(note.number); });
        details.append(head);
        if (details.open && note.body) details.append(renderBody(note));
        return details;
      });
      items.append(...cards);
      section.append(heading, items);
      return section;
    };
    const releases = chosenPeriod === 'latest' ? groupByRelease(displayed).map(makeRelease) :
      byMonth(displayed).map(({ month, items }) => {
        const archive = escapeElement('section', '', 'bp-month');
        const [year, monthNumber] = month.split('.');
        archive.append(escapeElement('h3', `${year}년 ${Number(monthNumber)}월`, 'bp-month-head'));
        const children = escapeElement('div', '', 'bp-month-releases');
        children.append(...groupByRelease(items).map(makeRelease));
        archive.append(children);
        return archive;
      });
    list.replaceChildren(...releases);
    summary.textContent = (chosenPeriod === 'latest' ? '최신 내역' : '이전 내역') + ' · ' + selected.length + '건';
    empty.hidden = selected.length > 0;
    if (!selected.length) empty.textContent = search ? '검색 결과가 없습니다.' : '해당 분류에 등록된 패치노트가 없습니다.';
    const index = selected.findIndex((note) => note.number === openedNumber);
    nav.hidden = index === -1;
    if (index >= 0) {
      $('#bp-prev').disabled = index === 0;
      $('#bp-next').disabled = index === selected.length - 1;
      $('#bp-position').textContent = `${index + 1} / ${selected.length}`;
    }
  }
  function move(direction) {
    const selected = filteredNotes();
    const index = selected.findIndex((note) => note.number === openedNumber);
    if (index < 0 || index + direction < 0 || index + direction >= selected.length) return;
    openedNumber = selected[index + direction].number;
    render(); scroll.scrollTop = 0; focusCard(openedNumber);
  }

  // ── 04-B · 기록의 전당 필터·보고서·기록 카드 ──
  // 기록 보관소 · 기록 메타데이터, 버전별 패치노트와 동일한 묶음 구조로 표시
  function recordDifficultyOptions() {
    const possible = records.filter(record => record.mode === recordFilters.mode &&
      (recordFilters.battle === '전체' || record.battle === recordFilters.battle) &&
      (recordFilters.game === '전체' || record.game === recordFilters.game));
    const names = [...new Set(possible.map(record => record.difficulty))];
    const order = typeof DPS_CONFIG !== 'undefined' ? DPS_CONFIG.dpsTable.difficulties : [];
    return names.sort((a,b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia < 0 ? Number.MAX_SAFE_INTEGER : ia) - (ib < 0 ? Number.MAX_SAFE_INTEGER : ib) || a.localeCompare(b,'ko');
    });
  }
  function syncRecordOptions(select, label, values, caption = value => value) {
    const wanted = [{value:'전체', label}, ...values.map(value=>({value,label:caption(value)}))];
    if (select.options.length !== wanted.length || wanted.some((item,index)=>
      select.options[index].value !== item.value || select.options[index].textContent !== item.label)) {
      select.replaceChildren(...wanted.map((item)=>{
        const option = escapeElement('option', item.label);
        option.value = item.value;
        return option;
      }));
    }
  }
  function updateRecordControls() {
    const mode = recordFilters.mode;
    const availableKinds = mode === '개인전' ? ['전체','일반','유물','명예'] :
      mode === '협동전' ? ['전체','일반','유물'] : ['전체'];
    if (!availableKinds.includes(recordFilters.battle)) recordFilters.battle = '전체';
    for (const button of ra('.ra-battle').querySelectorAll('button[data-ra-battle]')) {
      button.disabled = !availableKinds.includes(button.dataset.raBattle) || (recordView === 'analysis' && availableKinds.length > 1 && button.dataset.raBattle === '전체');
      button.setAttribute('aria-pressed', String(button.dataset.raBattle === recordFilters.battle));
      button.title = button.disabled ? (button.dataset.raBattle === '명예' ? '개인전 전용 기록' : '선택한 게임 종류에서는 사용할 수 없습니다.') : '';
    }
    for (const button of ra('.ra-tabs').querySelectorAll('button[data-ra-mode]')) {
      button.setAttribute('aria-pressed', String(button.dataset.raMode === mode));
    }
    // 분석 화면에서 숨겨진 목록 필터의 선택값을 덮어쓰지 않는다.
    if (recordView === 'analysis') return;
    const gameSelect = ra('#ra-game');
    gameSelect.querySelector('[value="스피드"]').disabled = ['도전의 탑','행성탐사'].includes(mode) &&
      !records.some(record => record.mode === mode && record.game === '스피드');
    if (gameSelect.querySelector('[value="스피드"]').disabled && recordFilters.game === '스피드') recordFilters.game = '전체';
    gameSelect.value = recordFilters.game;
    const allowed = recordDifficultyOptions();
    if (recordFilters.difficulty !== '전체' && !allowed.includes(recordFilters.difficulty)) recordFilters.difficulty = '전체';
    const select = ra('#ra-difficulty');
    syncRecordOptions(select, '전체 난이도', allowed);
    select.value = recordFilters.difficulty;
    const stages = [...new Set(records.filter(record => recordMatchesBaseFilters(record, false))
      .map(record => String(record.stage)))].sort((a,b) => Number(b) - Number(a));
    if (recordFilters.stage !== '전체' && !stages.includes(recordFilters.stage)) recordFilters.stage = '전체';
    const stageSelect = ra('#ra-stage');
    const stageSuffix = ['도전의 탑','행성탐사'].includes(mode) ? '층' : ' 고행';
    syncRecordOptions(stageSelect, '전체 고행 / 층', stages, stage => `${stage}${stageSuffix}`);
    stageSelect.value = recordFilters.stage;
    const players = [...new Set(records.filter(record => recordMatchesBaseFilters(record))
      .map((r) => r.player))].sort((a,b) => a.localeCompare(b, 'ko'));
    if (recordFilters.player !== '전체' && !players.includes(recordFilters.player)) recordFilters.player = '전체';
    const playerSelect = ra('#ra-player');
    syncRecordOptions(playerSelect, '전체 플레이어', players);
    playerSelect.value = recordFilters.player;
  }
  function recordMatchesBaseFilters(record, withStage = true) {
    return record.mode === recordFilters.mode &&
      (!['개인전','협동전'].includes(record.mode) || recordFilters.battle === '전체' || record.battle === recordFilters.battle) &&
      (recordFilters.game === '전체' || record.game === recordFilters.game) &&
      (recordFilters.difficulty === '전체' || record.difficulty === recordFilters.difficulty) &&
      (!withStage || recordFilters.stage === '전체' || String(record.stage) === recordFilters.stage);
  }
  function filteredRecords(source = records) {
    return source.filter(record => recordMatchesBaseFilters(record) &&
      (recordFilters.player === '전체' || record.player === recordFilters.player));
  }
  // 기록 분석 · 게임 종류·기록 유형·모드·난이도·고행·라운드가 일치하는 기록만 비교한다.
  // 달성률 DPS는 실제 DPS가 아니라 유닛 보드가 보고서에 저장한 달성률(%)을 사용한다.
  // 유물 기록은 달성률로 클리어 조건을 비교할 수 없어 이 분석에서 제외한다.
  function recordAnalysisRound(record) {
    return record.round === null ? '없음' : String(record.round);
  }
  function recordAchievementValue(record) {
    const match = /^\s*([\d,]+(?:\.\d+)?)\s*%\s*$/u.exec(String(record.achievement || ''));
    return match ? Number(match[1].replace(/,/gu,'')) : NaN;
  }
  function recordAnalysisValue(record, kind) {
    if (kind === '달성률') return record.battle === '유물' ? NaN : recordAchievementValue(record);
    if (record.dpsKind !== kind) return NaN;
    return Number(String(record.dps).replace(/,/gu,''));
  }
  function syncAnalysisControls() {
    const possibleBattles = recordFilters.mode === '개인전' ? ['일반','유물','명예'] :
      recordFilters.mode === '협동전' ? ['일반','유물'] : ['전체'];
    if (recordFilters.battle === '전체' && possibleBattles.length > 1) {
      recordFilters.battle = possibleBattles.find(kind => records.some(record => record.mode === recordFilters.mode && record.battle === kind)) || possibleBattles[0];
    }
    const base = records.filter(record => record.mode === recordFilters.mode &&
      (recordFilters.battle === '전체' || record.battle === recordFilters.battle));
    const controls = [
      ['game', 'ra-analysis-game'],
      ['difficulty', 'ra-analysis-difficulty'],
      ['stage', 'ra-analysis-stage'],
      ['round', 'ra-analysis-round'],
      ['kind', 'ra-analysis-kind'],
    ];
    for (const [key,id] of controls) {
      const current = base.filter(record => (key === 'game' || record.game === analysisFilters.game) &&
        (['game','difficulty'].includes(key) || record.difficulty === analysisFilters.difficulty) &&
        (['game','difficulty','stage'].includes(key) || String(record.stage) === analysisFilters.stage) &&
        (['game','difficulty','stage','round'].includes(key) || recordAnalysisRound(record) === analysisFilters.round));
      const values = key === 'game' ? [...new Set(base.map(record => record.game))].sort((a,b)=>a === '일반' ? -1 : b === '일반' ? 1 : a.localeCompare(b,'ko')) :
        key === 'difficulty' ? [...new Set(current.map(record => record.difficulty))].sort((a,b)=>a.localeCompare(b,'ko')) :
        key === 'stage' ? [...new Set(current.map(record => String(record.stage)))].sort((a,b)=>Number(b)-Number(a)) :
        key === 'round' ? [...new Set(current.map(record => recordAnalysisRound(record)))].sort((a,b)=>Number(b)-Number(a)) :
        ['스펙','유물','달성률'].filter(kind => current.some(record => {
          const value = recordAnalysisValue(record,kind);
          return Number.isFinite(value) && value >= 0;
        }));
      if (!values.includes(analysisFilters[key])) analysisFilters[key] = values[0] || '';
      const select = ra('#'+id);
      const labels = values.map(value => ({value, label:key === 'stage' ? `${value}${['도전의 탑','행성탐사'].includes(recordFilters.mode) ? '층' : ' 고행'}` :
        key === 'round' ? (value === '없음' ? '해당 없음' : `${value} 라운드`) :
        key === 'kind' ? `${value} DPS` : value}));
      if (!labels.length) labels.push({value:'',label:'기록 없음'});
      if (select.options.length !== labels.length || labels.some((item,index)=>select.options[index].value !== item.value || select.options[index].textContent !== item.label)) {
        select.replaceChildren(...labels.map(item=>{const option=escapeElement('option',item.label);option.value=item.value;return option;}));
      }
      select.value = analysisFilters[key];
      select.disabled = !values.length;
    }
  }
  function matchingAnalysisRecords(source = records) {
    return source.filter(record => record.mode === recordFilters.mode &&
      (recordFilters.battle === '전체' || record.battle === recordFilters.battle) &&
      record.game === analysisFilters.game && record.difficulty === analysisFilters.difficulty &&
      String(record.stage) === analysisFilters.stage && recordAnalysisRound(record) === analysisFilters.round)
      .map(record => ({record,value:recordAnalysisValue(record,analysisFilters.kind)}))
      .filter(item => Number.isFinite(item.value) && item.value >= 0)
      .sort((a,b)=>a.value-b.value || Date.parse(a.record.publishedAt)-Date.parse(b.record.publishedAt) || a.record.number-b.record.number);
  }
  function renderRecordAnalysis() {
    const matches = matchingAnalysisRecords();
    const isAchievement = analysisFilters.kind === '달성률';
    raStatus.textContent = `기록 분석 · 동일 조건 ${matches.length}건${recordFetchFailed ? ' · 최신 목록 확인 실패' : ''}`;
    if (!matches.length) {
      raEmpty.hidden = false;
      raEmpty.textContent = recordFetchFailed && !records.length ? '기록 데이터를 불러오지 못했습니다. 새로고침해 주세요.' :
        !records.length && !lastAttempt ? '기록을 불러오는 중입니다.' : '현재 선택한 조건에 집계 가능한 기록이 없습니다.';
      return;
    }
    const minimum = matches[0];
    const context = [analysisFilters.game,analysisFilters.difficulty,
      `${analysisFilters.stage}${['도전의 탑','행성탐사'].includes(recordFilters.mode) ? '층' : ' 고행'}`,
      analysisFilters.round === '없음' ? '라운드 해당 없음' : `${analysisFilters.round} 라운드`,
      `${analysisFilters.kind} DPS`].join(' · ');
    const overview = escapeElement('div','','ra-analysis-overview');
    for(const [label,value] of [[isAchievement ? '최저 클리어 달성률' : '최저 클리어 DPS',
      isAchievement ? minimum.record.achievement : minimum.record.dps],['동일 조건 기록',`${matches.length}건`]]){
      const block=escapeElement('div','','ra-analysis-metric');
      block.append(escapeElement('small',label),escapeElement('strong',value));
      overview.append(block);
    }
    raList.append(overview);
    const chartSection=escapeElement('section','','ra-analysis-section');
    chartSection.append(escapeElement('h3',isAchievement ? '클리어 달성률 비교' : '클리어 DPS 비교','ra-analysis-heading'));
    chartSection.append(escapeElement('p',context,'ra-analysis-note'));
    const chart=escapeElement('div','','ra-analysis-chart');
    chart.setAttribute('role','group');
    chart.setAttribute('aria-label',isAchievement ? '동일 조건 클리어 달성률 비교 그래프' : '동일 조건 클리어 DPS 비교 그래프');
    const max=Math.max(...matches.map(item=>item.value));
    for(const item of matches){
      const displayValue = isAchievement ? item.record.achievement : item.record.dps;
      const bar=escapeElement('button','','ra-analysis-bar');
      bar.type='button';
      bar.dataset.recordNumber=String(item.record.number);
      if(item.value===minimum.value) bar.dataset.min='true';
      bar.setAttribute('aria-label',`${item.record.player}, ${isAchievement ? '클리어 달성률' : `${analysisFilters.kind} DPS`} ${displayValue}, 기록 카드 보기`);
      const track=escapeElement('span','','ra-analysis-track');
      const fill=escapeElement('span','','ra-analysis-fill');
      fill.style.width=`${max ? Math.max(2,item.value/max*100) : 0}%`;
      track.append(fill);
      bar.append(escapeElement('span',item.record.player,'ra-analysis-player'),track,escapeElement('span',displayValue,'ra-analysis-value'));
      chart.append(bar);
    }
    chartSection.append(chart,escapeElement('p','막대를 누르면 해당 기록 카드를 바로 볼 수 있습니다.','ra-analysis-note'));
    raList.append(chartSection);
    const recommend=escapeElement('section','','ra-analysis-section ra-analysis-recommend');
    recommend.append(escapeElement('h3',isAchievement ? '최저 달성률 기록 추천' : '최저 기록 추천','ra-analysis-heading'));
    if (isAchievement) {
      const results = escapeElement('div','','ra-analysis-results');
      for(const [label,value] of [['클리어 기준',minimum.record.required],
        ['클리어 기대값',minimum.record.expected],['클리어 달성률',minimum.record.achievement]]) {
        const result = escapeElement('div','','ra-analysis-result');
        result.append(escapeElement('small',label),escapeElement('strong',value));
        results.append(result);
      }
      recommend.append(results);
    }
    const cards=escapeElement('div','','ra-cards');
    cards.append(makeRecordCard(minimum.record));
    recommend.append(cards);
    raList.append(recommend);
  }
  function recordPenanceTheme(group, stage, kind) {
    if (kind !== '고행') {
      group.style.setProperty('--ra-accent', '#8cb6e9');
      group.style.setProperty('--ra-aura', 'rgba(94,149,214,.09)');
      return;
    }
    const level = Math.max(0, Math.min(20, stage));
    const hue = Math.round(209 - 181 * Math.min(level,17) / 17);
    const saturation = Math.round(30 + 3 * Math.min(level,17));
    const lightness = Math.round(64 + .4 * Math.min(level,17));
    const aura = Math.min(.14,.035 + level * .006);
    if (level >= 18) {
      const legendary = {18:['#d7b173','rgba(215,177,115,.09)'],19:['#dda8c7','rgba(221,168,199,.1)'],20:['#e7ca87','rgba(231,202,135,.105)']}[level];
      group.dataset.legend = String(level);
      group.style.setProperty('--ra-accent', legendary[0]);
      group.style.setProperty('--ra-aura', legendary[1]);
    } else {
      group.style.setProperty('--ra-accent', `hsl(${hue} ${saturation}% ${lightness}%)`);
      group.style.setProperty('--ra-aura', `hsla(${hue}, ${saturation}%, ${lightness}%, ${aura})`);
    }
  }
  const recordDifficultyColors = Object.freeze({
    'Practice':'#80f36c','Very Easy':'#91f78d','Easy':'#95ead7','Normal':'#43e8de',
    'Hard':'#fca46e','Very Hard':'#ffc164','Hell':'#e5b0c9','Inferno':'#ff9c8f',
    'Lunatic':'#f2c4e8','Holic':'#eba5f7','Epic':'#f278d2','Ultimate':'#ff6297',
    'Impossible':'#fb6178','The Final':'#c7a3ff'
  });
  function recordStageLabel(battle, stage) {
    if (battle !== '명예') return '';
    const known = {0:'B',10:'A',17:'S',19:'S',20:'XD'};
    return Object.prototype.hasOwnProperty.call(known,stage) ? known[stage] : '';
  }
  // 기록 상세: 새 세로형 텍스트와 기존 V37 기록을 같은 표 데이터로 해석한다.
  const recordSectionNames = ['재화 현황','빌드 설정','이달의 룬 효과','강화 효과','선택 버프','성소 정보','선택 유닛 정보'];
  function recordCleanCell(value) {
    return String(value || '').replace(/<br\s*\/?\s*>/giu, ' · ')
      .replace(/<[^>]+>/gu, ' ').replace(/&(?:nbsp|#160);/giu, ' ')
      .replace(/&amp;/giu, '&').replace(/&lt;/giu, '<').replace(/&gt;/giu, '>')
      .replace(/\*\*|__|`/gu, '').replace(/^#{1,6}\s+/u, '')
      .replace(/\\([|*])/gu, '$1').replace(/\s+/gu, ' ').trim();
  }
  function parseRecordReport(record) {
    const sections = new Map(recordSectionNames.map(name=>[name,{title:name,rows:[]} ]));
    let current='';
    let seenReport=false;
    let legacyJanuaryScope='';
    for(const raw of String(record.body || '').split(/\r?\n/gu)){
      const line=raw.trim();
      if(!line || /^```/u.test(line)) continue;
      let cells=line.startsWith('|')
        ? line.split('|').slice(1,line.endsWith('|') ? -1 : undefined).map(recordCleanCell)
        : [recordCleanCell(line.replace(/^[-*+]\s+/u,''))];
      cells=cells.filter(Boolean);
      if(!cells.length || cells.every(cell=>/^:?-{2,}:?$/u.test(cell))) continue;
      const heading=cells.length===1 ? cells[0] : '';
      if(/^클리어\s*기록\s*보고서$/u.test(heading)){
        if(seenReport) break; // 동일 보고서가 두 번 붙은 이슈의 중복 출력 방지
        seenReport=true;
        current='';
        continue;
      }
      const match=recordSectionNames.find(name=>heading===name || heading.startsWith(name+' ') || heading.startsWith(name+' (') ||
        (name==='이달의 룬 효과' && heading.startsWith(name+' ·')) ||
        (name==='재화 현황' && heading==='특성 재화 사용 현황'));
      if(match){
        current=match;
        if(match==='이달의 룬 효과'){
          const scope=heading.match(/@J[12]\b/iu);
          if(scope) legacyJanuaryScope=scope[0].toUpperCase();
        }
        continue;
      }
      if(!current) continue; // 여섯 요약 지표는 상단 카드에서만 표시
      if(current==='선택 유닛 정보' && cells[0]==='유닛') continue;
      if(current==='재화 현황' && cells[0]==='항목') continue;
      if(current==='성소 정보' && cells[0]==='번호') continue;
      // 유닛 슬롯 상위 행뿐 아니라 1기~5기/1번~5번의 확장 정보도 보존한다.
      if(current==='선택 유닛 정보' && cells.length===1 && !/^(?:\d{1,2}\s*·|[1-5]\s*[기번]\s*·)/u.test(cells[0])) continue;
      if(current==='선택 버프' && /^#\S+/u.test(cells[0])) continue;
      const rows=sections.get(current).rows;
      // 서로 다른 슬롯에서 같은 확장 개체 정보가 반복될 수 있으므로 유닛 행은 중복 제거하지 않는다.
      if(current==='선택 유닛 정보' || !rows.some(row=>JSON.stringify(row)===JSON.stringify(cells))) rows.push(cells);
    }
    const monthRows=sections.get('이달의 룬 효과').rows;
    if(legacyJanuaryScope && !monthRows.some(cells=>cells.some(cell=>cell.startsWith('1월 적용 범위')))){
      monthRows.unshift(['1월 적용 범위',legacyJanuaryScope]);
    }
    return sections;
  }
  function recordRowPair(cells,section){
    if(cells.length>1) return [cells[0],cells.slice(1).join(' · ')];
    const text=cells[0];
    const labels=section==='빌드 설정' ? ['룬','종족업','10강','15강','초월','인첸트'] :
      section==='재화 현황' ? ['총 SP','사용한 EP','사용한 RP','사용한 심연의혼'] :
      section==='이달의 룬 효과' ? ['1월 적용 범위','1월','4월','9월'] : ['오버핸스','리페핸스','강화의 달인'];
    for(const label of labels){
      if(text===label) return [label,'—'];
      if(text.startsWith(label+':')) return [label,text.slice(label.length+1).trim() || '—'];
      if(text.startsWith(label+' ')) return [label,text.slice(label.length).trim()];
      if(label==='리페핸스' && text.startsWith(label+'+')) return [label,text];
    }
    return ['',text];
  }
  // ── 선택 유닛 정보: 슬롯(01~10)과 슬롯 확장 개체(1~5번)를 별도로 연결한다. ──
  // 이전의 1기~5기 입력도 읽되, 보고서에는 1번~5번으로 일관되게 출력한다.
  function recordUnitRows(rows) {
    const slots=[];
    let active=null;
    const cleanBreak=(value)=>String(value||'').replace(/^(?:한계\s*돌파|돌파)\s*:?\s*/u,'').trim()||'—';
    const expansionNumber=(value)=>/^([1-5])\s*[기번]$/u.exec(String(value||'').trim())?.[1] || '';
    const expandedDetails=(parts)=>{
      const detail=parts.map(part=>String(part||'').trim()).filter(Boolean);
      const ordinal=expansionNumber(detail[0]);
      if(!ordinal) return null;
      const breakAt=detail.findIndex(part=>/^(?:한계\s*돌파|돌파)(?:\s|:|$)/u.test(part));
      return {number:`${ordinal}번`,limit:breakAt<0?'—':cleanBreak(detail[breakAt]),
        jewel:(breakAt<0?detail.slice(1):detail.slice(breakAt+1)).join(' · ')||'—'};
    };
    for(const cells of rows){
      if(!cells.length) continue;
      // 예전 HTML/마크다운 5열 기록과 새 세로형 보고서를 함께 인식한다.
      if(cells.length===1){
        const parts=cells[0].split(/\s*·\s*/u).map(part=>part.trim()).filter(Boolean);
        const expansion=expandedDetails(parts);
        if(expansion){
          if(active && !active.instances.some(item=>item.number===expansion.number)) active.instances.push(expansion);
          continue;
        }
        if(!/^\d{1,2}$/u.test(parts[0]||'')) continue;
        const countAt=parts.findIndex(part=>/^\d+\s*마리$/u.test(part));
        const unit={slot:parts[0].padStart(2,'0'),name:parts.slice(1,countAt>1?countAt:2).join(' · ')||'—',
          quantity:countAt<0?'1':parts[countAt].replace(/\s*마리$/u,''),enhance:'500',
          limit:'—',jewel:'—',instances:[]};
        const after=parts.slice(countAt<0?2:countAt+1);
        const enhance=after.find(part=>/^강화\s*:?\s*\d+$/u.test(part));
        if(enhance) unit.enhance=enhance.replace(/^강화\s*:?\s*/u,'');
        const breakAt=after.findIndex(part=>/^(?:한계\s*돌파|돌파)\s+/u.test(part));
        if(breakAt>=0){
          unit.limit=cleanBreak(after[breakAt]);
          unit.jewel=after.slice(breakAt+1).join(' · ')||'—';
        }
        const inlineOrdinal=after.find(part=>expansionNumber(part));
        if(inlineOrdinal) unit.instances.push({number:`${expansionNumber(inlineOrdinal)}번`,limit:unit.limit,jewel:unit.jewel});
        slots.push(unit);active=unit;
        continue;
      }
      // 구버전 4~5열: "01 · 유닛" | "1마리 · 강화 500" | "구분" | "돌파" | "쥬얼"
      const head=cells[0].split(/\s*·\s*/u).map(part=>part.trim()).filter(Boolean);
      if(!/^\d{1,2}$/u.test(head[0]||'')) continue;
      const combined=[...head,...String(cells[1]||'').split(/\s*·\s*/u).map(part=>part.trim())];
      const countAt=combined.findIndex(part=>/^\d+\s*마리$/u.test(part));
      const enhance=combined.find(part=>/^강화\s*:?\s*\d+$/u.test(part));
      const hasExpansion=cells.length>=5 && !!expansionNumber(cells[2]);
      const unit={slot:head[0].padStart(2,'0'),name:combined.slice(1,countAt>1?countAt:head.length).join(' · ')||'—',
        quantity:countAt<0?'1':combined[countAt].replace(/\s*마리$/u,''),
        enhance:enhance?enhance.replace(/^강화\s*:?\s*/u,''):'500',
        limit:cleanBreak(hasExpansion?cells[3]:(cells.length>=5?cells[3]:cells[2])),
        jewel:(cells.length>=5?cells.slice(4):cells.slice(3)).join(' · ')||'—',instances:[]};
      if(hasExpansion) unit.instances.push({number:`${expansionNumber(cells[2])}번`,limit:unit.limit,jewel:unit.jewel});
      slots.push(unit);active=unit;
    }
    return slots;
  }
  const recordReportCache = new WeakMap();
  function renderRecordReport(record) {
    const container=escapeElement('div','','ra-structured');
    let parsed=recordReportCache.get(record);
    if(!parsed){
      const sections=parseRecordReport(record);
      parsed={sections,units:recordUnitRows(sections.get('선택 유닛 정보').rows)};
      recordReportCache.set(record,parsed);
    }
    const {sections,units:parsedUnits}=parsed;
    const makeSection=(section,buffs)=>{
      const isUnit=section.title.startsWith('선택 유닛 정보');
      const isSanctuary=section.title==='성소 정보';
      const block=escapeElement('section','','ra-section');
      const wrap=escapeElement('div','','ra-table-wrap');
      const table=escapeElement('table','',isUnit?'ra-units':isSanctuary?'ra-sanctuary':'ra-pairs');
      const thead=document.createElement('thead');
      const titleRow=document.createElement('tr');
      const titleCell=escapeElement('th',section.title,'ra-section-heading');
      titleCell.colSpan=isUnit||isSanctuary?7:2;
      titleRow.append(titleCell);thead.append(titleRow);
      if(isUnit){
        const heads=document.createElement('tr');
        for(const label of ['번호','유닛명','수량','강화','슬롯 확장','한계돌파','쥬얼 정보']) heads.append(escapeElement('th',label));
        thead.append(heads);
      }
      if(isSanctuary && section.rows.some(cells=>cells[0]!=='성소 스킬 사용 없이 클리어됨')){
        const heads=document.createElement('tr');
        for(const label of ['번호','시작','종료','1번 스킬','사용 횟수','2번 스킬','사용 횟수']) heads.append(escapeElement('th',label));
        thead.append(heads);
      }
      table.append(thead);
      const tbody=document.createElement('tbody');
      if(isUnit){
        for(const unit of parsedUnits){
          const instances=unit.instances.length ? unit.instances : [{number:'—',limit:unit.limit,jewel:unit.jewel}];
          for(const [index,instance] of instances.entries()){
            const row=document.createElement('tr');
            row.dataset.slot=unit.slot;
            if(index===0){
              row.dataset.slotStart='true';
              for(const value of [unit.slot,unit.name,unit.quantity,unit.enhance]){
                const cell=escapeElement('td',value||'—');
                cell.rowSpan=instances.length;
                row.append(cell);
              }
            }
            for(const value of [instance.number,instance.limit,instance.jewel]) row.append(escapeElement('td',value||'—'));
            tbody.append(row);
          }
        }
      }else if(isSanctuary){
        for(const cells of section.rows){
          if(cells.length===1 && cells[0]==='성소 스킬 사용 없이 클리어됨'){
            const row=document.createElement('tr');
            const message=escapeElement('td',cells[0]);
            message.colSpan=7;
            row.append(message);
            tbody.append(row);
            continue;
          }
          const parts=cells.length>=7 ? cells : cells[0].split(/\s*·\s*/u).map(value=>value.trim());
          if(parts.length!==6 && parts.length!==7) continue;
          let values=parts;
          if(parts.length===6){
            const range=/^(\d+)\s*~\s*(\d+)$/u.exec(parts[1]);
            if(!range) continue;
            values=[parts[0],range[1],range[2],parts[2],parts[3],parts[4],parts[5]];
          }
          if(!/^\d{1,2}$/u.test(values[0]) || !/^\d+$/u.test(values[1]) || !/^\d+$/u.test(values[2])) continue;
          const row=document.createElement('tr');
          for(const value of values) row.append(escapeElement('td',value||'—'));
          tbody.append(row);
        }
      }else{
        for(const cells of section.rows){
          const values=recordRowPair(cells,section.title);
          const row=document.createElement('tr');
          for(const value of values) row.append(escapeElement('td',value||'—'));
          tbody.append(row);
        }
      }
      // 버프는 별도 섹션을 만들지 않고 강화 효과의 마지막 항목으로 합친다.
      if(buffs){
        const row=document.createElement('tr');
        row.append(escapeElement('td','선택 버프'));
        const value=escapeElement('td','','ra-buff-value');
        if(buffs.rows.length){
          for(const cells of buffs.rows) value.append(escapeElement('span',cells.join(' · ')));
        }else{
          value.append(escapeElement('span','미기재'));
        }
        row.append(value);tbody.append(row);
      }
      table.append(tbody);wrap.append(table);block.append(wrap);
      return block;
    };
    const resources=sections.get('재화 현황');
    const build=sections.get('빌드 설정');
    const runes=sections.get('이달의 룬 효과');
    const enhances=sections.get('강화 효과');
    const buffs=sections.get('선택 버프');
    const sanctuary=sections.get('성소 정보');
    const units=sections.get('선택 유닛 정보');
    if(resources.rows.length){
      const resourceSection=makeSection(resources);
      resourceSection.classList.add('ra-resources');
      container.append(resourceSection);
    }
    if(build.rows.length) container.append(makeSection(build));
    if(runes.rows.length) container.append(makeSection(runes));
    if(enhances.rows.length || buffs.rows.length) container.append(makeSection(enhances,buffs));
    if(sanctuary.rows.length) container.append(makeSection(sanctuary));
    if(parsedUnits.length) container.append(makeSection(units));
    if(!container.childElementCount) container.append(escapeElement('p','등록된 보고서에서 세부 항목을 확인할 수 없습니다.','ra-report-note'));
    return container;
  }
  function makeRecordTags(tags) {
    const row = escapeElement('div', '', 'ra-tags');
    for (const tag of tags) row.append(escapeElement('span', `#${tag}`, 'ra-tag'));
    return row;
  }
  function makeRecordCard(record) {
    const kind = ['도전의 탑','행성탐사'].includes(record.mode) ? '층' : '고행';
    const card = escapeElement('button', '', 'ra-card');
    card.type = 'button';
    card.setAttribute('aria-label', `${record.player} · ${record.stage}${kind} · 상세 보고서 보기`);
    const layout = escapeElement('div', '', 'ra-card-layout');
    const left = escapeElement('div', '', 'ra-card-left');
    if (record.tags.length) left.append(makeRecordTags(record.tags));
    left.append(escapeElement('div', [record.game === '스피드' ? '스피드' : '일반',record.mode,record.dataMode,record.team].filter(Boolean).join(' · '), 'ra-card-mode'));
    const cardStageName = kind === '층' ? `${record.stage}층` : `${record.battle === '명예' ? '명예 ' : ''}${record.stage} 고행`;
    left.append(escapeElement('div', [cardStageName,record.round === null ? '' : `${record.round} 라운드`].filter(Boolean).join(' · '), 'ra-card-context'));
    const difficulty = escapeElement('div', '', 'ra-card-difficulty');
    difficulty.append(escapeElement('small', '난이도'));
    const difficultyName = escapeElement('strong', record.difficulty || '—', 'ra-difficulty-name');
    difficultyName.style.setProperty('--ra-difficulty-color', recordDifficultyColors[record.difficulty] || 'var(--ra-accent)');
    difficulty.append(difficultyName);
    const cardStageGrade = kind !== '고행' ? '' : record.battle === '명예' ? recordStageLabel(record.battle, record.stage) : (record.stage <= 16 ? `Ex ${record.stage}` : ({17:'Ex M',18:'Le S',19:'Le SS',20:'Le SSS'}[record.stage] || ''));
    if (cardStageGrade) {
      if(record.battle !== '명예' && record.stage >= 18) card.dataset.grade = String(record.stage);
      difficulty.append(escapeElement('span', cardStageGrade, 'ra-stage-grade'));
    }
    left.append(difficulty);
    const right = escapeElement('div', '', 'ra-card-right');
    for (const [key, label, value] of [
      ['player','플레이어',record.player],
      ['dps',record.dpsKind === '유물' ? '유물 DPS' : '스펙 DPS',record.dps],
      ['achievement','클리어 달성률',record.achievement],
    ]) {
      const field = escapeElement('div', '', 'ra-card-field');
      field.dataset.field = key;
      field.append(escapeElement('small',label), escapeElement('strong',value));
      right.append(field);
    }
    layout.append(left,right);
    card.append(layout);
    card.dataset.recordNumber = String(record.number);
    return card;
  }
  function showRecordDetail(record) {
    openedRecord = record.number;
    recordScrollPosition = raScroll.scrollTop;
    renderRecordArchive();
    raScroll.scrollTop = 0;
    ra('.ra-back')?.focus({ preventScroll: true });
  }
  function renderRecordArchive() {
    if (recordView === 'analysis') syncAnalysisControls();
    updateRecordControls();
    const selected = filteredRecords();
    const detail = recordView === 'analysis' ? records.find(record=>record.number===openedRecord) :
      selected.find((record) => record.number === openedRecord);
    if (!detail) openedRecord = null;
    ra('#ra-controls').hidden = !!detail;
    ra('.ra-filter-row').closest('.ra-filter-group').hidden = recordView === 'analysis';
    ra('#ra-analysis-filters').hidden = recordView !== 'analysis';
    raList.replaceChildren();
    raEmpty.hidden = true;
    if (detail) {
      raStatus.textContent = `${detail.player}님의 클리어 기록 보고서`;
      const holder = escapeElement('section', '', 'ra-detail');
      const head = escapeElement('header', '', 'ra-detail-head');
      const back = escapeElement('button', recordView === 'analysis' ? '← 기록 분석' : '← 기록 목록', 'ra-back');
      back.type = 'button';
      back.addEventListener('click', () => {
        openedRecord = null;
        renderRecordArchive();
        raScroll.scrollTop = recordScrollPosition;
      });
      const person = escapeElement('div', '', 'ra-detail-person');
      person.append(escapeElement('small', '플레이어'), escapeElement('strong', detail.player));
      head.append(back, person);
      holder.append(head);
      if (detail.tags.length) holder.append(makeRecordTags(detail.tags));
      const title = escapeElement('h3', '클리어 기록 보고서', 'ra-report-heading');
      holder.append(title);
      const metrics = escapeElement('div', '', 'ra-detail-summary');
      const stageText = `${['개인전','협동전'].includes(detail.mode) ? detail.battle + ' ' : ''}${detail.stage}${['도전의 탑','행성탐사'].includes(detail.mode) ? '층' : ' 고행'}`;
      const values = [
        ['모드 난이도', [detail.game,detail.mode,detail.dataMode,detail.team,detail.difficulty].filter(Boolean).join(' · ')],
        ['고행 라운드', `${stageText}\n${detail.round === null ? '—' : `${detail.round} 라운드`}`],
        [detail.dpsKind === '유물' ? '유물 DPS' : '스펙 DPS', detail.dps],
        ['클리어 기준', detail.required], ['클리어 기대값', detail.expected], ['클리어 달성률', detail.achievement],
      ];
      for (const [label, value] of values) {
        const metric = escapeElement('div', '', 'ra-metric');
        metric.append(escapeElement('small', label), escapeElement('strong', value));
        metrics.append(metric);
      }
      holder.append(metrics);
      const report = escapeElement('section', '', 'ra-report');
      report.append(renderRecordReport(detail));
      holder.append(report);
      raList.append(holder);
      return;
    }
    if (recordView === 'analysis') {
      renderRecordAnalysis();
      return;
    }
    raStatus.textContent = `${recordFilters.mode} · ${selected.length}개 기록${recordFetchFailed ? ' · 최신 목록 확인 실패' : ''}`;
    if (!selected.length) {
      raEmpty.hidden = false;
      raEmpty.textContent = recordFetchFailed ? '기록을 불러오지 못했습니다. 새로고침으로 다시 시도할 수 있습니다.' :
        hasFetched ? '해당 조건에 등록된 기록이 없습니다.' : '기록을 불러오는 중입니다.';
      return;
    }
    const kind = ['도전의 탑','행성탐사'].includes(recordFilters.mode) ? '층' : '고행';
    const recordsByGroup = new Map();
    for (const record of selected) {
      const groupKey = kind === '고행' ? `${record.stage}:${record.battle}` : String(record.stage);
      if (!recordsByGroup.has(groupKey)) recordsByGroup.set(groupKey, { stage: record.stage, battle: kind === '고행' ? record.battle : '', items: [] });
      recordsByGroup.get(groupKey).items.push(record);
    }
    const battleOrder = { '일반': 0, '유물': 1, '명예': 2 };
    const groups = [...recordsByGroup.values()].sort((a,b) => b.stage - a.stage ||
      (battleOrder[a.battle] ?? 3) - (battleOrder[b.battle] ?? 3));
    for (const {stage, battle, items} of groups) {
      const group = escapeElement('section', '', 'ra-group');
      recordPenanceTheme(group, stage, kind);
      const groupHead = escapeElement('header', '', 'ra-group-head');
      groupHead.append(escapeElement('h3', kind === '층' ? `${stage}층` : `${stage} 고행`, 'ra-group-name'));
      if (kind === '고행') groupHead.append(escapeElement('span', battle, 'ra-group-battle'));
      const normalGrade = stage <= 16 ? `Ex ${stage}` : ({17:'Ex M',18:'Le S',19:'Le SS',20:'Le SSS'}[stage] || '');
      const stageGrade = kind !== '고행' ? '' : battle === '명예' ? recordStageLabel(battle, stage) : normalGrade;
      if (stageGrade) groupHead.append(escapeElement('span', stageGrade, 'ra-legend'));
      const stageItems = items.sort((a,b) => (Date.parse(b.publishedAt) - Date.parse(a.publishedAt)) || b.number - a.number);
      groupHead.append(escapeElement('span', `${stageItems.length}건`, 'ra-group-count'));
      group.append(groupHead);
      const cards = escapeElement('div', '', 'ra-cards');
      for (const record of stageItems) cards.append(makeRecordCard(record));
      group.append(cards);
      raList.append(group);
    }
  }

  // ── 05 · GitHub 목록 새로고침 ──
  // 갱신 결과가 같으면 DOM을 유지해 보고서 읽기·스크롤 중 화면이 흔들리지 않게 한다.
  function updateRecordFetchNotice() {
    if (!archiveDialog.open || activeView === 'patch') return;
    if (openedRecord === null) {
      const suffix = ' · 최신 목록 확인 실패';
      const base = raStatus.textContent.endsWith(suffix) ? raStatus.textContent.slice(0, -suffix.length) : raStatus.textContent;
      raStatus.textContent = base + (recordFetchFailed ? suffix : '');
    }
    if (!raEmpty.hidden) {
      if (recordView === 'analysis') {
        raEmpty.textContent = recordFetchFailed && !records.length ? '기록 데이터를 불러오지 못했습니다. 새로고침해 주세요.' :
          !records.length && !lastAttempt ? '기록을 불러오는 중입니다.' : '현재 선택한 조건에 집계 가능한 기록이 없습니다.';
      } else {
        raEmpty.textContent = recordFetchFailed ? '기록을 불러오지 못했습니다. 새로고침으로 다시 시도할 수 있습니다.' :
          hasFetched ? '해당 조건에 등록된 기록이 없습니다.' : '기록을 불러오는 중입니다.';
      }
    }
  }
  function refreshDisplayedRecords(previousRecords) {
    if (openedRecord !== null) {
      const previous = previousRecords.find(record => record.number === openedRecord);
      const current = records.find(record => record.number === openedRecord);
      // 다른 기록이 추가·변경되더라도 보고 있는 상세 보고서는 그대로 유지한다.
      if (previous && current && JSON.stringify(previous) === JSON.stringify(current)) return;
    } else if (recordView === 'records') {
      if (JSON.stringify(filteredRecords(previousRecords)) === JSON.stringify(filteredRecords())) {
        updateRecordControls();
        updateRecordFetchNotice();
        return;
      }
    } else {
      const before = JSON.stringify(matchingAnalysisRecords(previousRecords));
      syncAnalysisControls();
      updateRecordControls();
      if (before === JSON.stringify(matchingAnalysisRecords())) {
        updateRecordFetchNotice();
        return;
      }
    }
    const previousScroll = raScroll.scrollTop;
    const hadDetail = openedRecord !== null;
    renderRecordArchive();
    raScroll.scrollTop = hadDetail && openedRecord === null ? recordScrollPosition : previousScroll;
  }
  async function refresh(force = false) {
    if (loading || (!force && Date.now() - lastAttempt < refreshInterval)) return;
    if (Date.now() < retryAfter) {
      empty.hidden = false;
      empty.textContent = 'GitHub 요청 한도에 도달했습니다. 이후 다시 시도해 주세요.';
      recordFetchFailed = true;
      updateRecordFetchNotice();
      return;
    }
    loading = true;
    refreshButton.disabled = true;
    refreshButton.textContent = '확인 중…';
    list.setAttribute('aria-busy', 'true');
    raList.setAttribute('aria-busy', 'true');
    raRefresh.disabled = true;
    lastAttempt = Date.now();
    try {
      const url = new URL(`https://api.github.com/repos/${repository}/issues`);
      url.search = new URLSearchParams({ creator, state: 'all', sort: 'created', direction: 'desc', per_page: '100' });
      const updated = [];
      const incomingRecords = [];
      for (let page = 1; ; page++) {
        url.searchParams.set('page', String(page));
        const response = await fetch(url, {
          headers: { Accept: 'application/vnd.github.full+json' }, cache: 'no-cache',
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            const seconds = Number(response.headers.get('retry-after')) || 60;
            const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000 || 0;
            retryAfter = Math.max(Date.now() + seconds * 1000, reset);
          }
          throw new Error(`GitHub Issues ${response.status}`);
        }
        const issues = await response.json();
        for (const issue of issues) {
          const recordTitle = /^\[기록\]/u.test(String(issue?.title || '').trim());
          if (recordTitle) {
            const record = normalizeRecord(issue);
            if (record) incomingRecords.push(record);
          } else {
            const note = normalizeIssue(issue);
            if (note) updated.push(note);
          }
        }
        if (!response.headers.get('link')?.includes('rel="next"')) break;
      }
      const previousRecords = records;
      const firstFetch = !hasFetched;
      const notesChanged = JSON.stringify(notes) !== JSON.stringify(updated);
      const recordsChanged = JSON.stringify(records) !== JSON.stringify(incomingRecords);
      const wasFailed = recordFetchFailed;
      notes = updated;
      records = incomingRecords;
      recordFetchFailed = false;
      hasFetched = true;
      if (archiveDialog.open) {
        if (activeView === 'patch') {
          if (firstFetch || notesChanged) {
            const previousScroll = scroll.scrollTop;
            render();
            if (!firstFetch) scroll.scrollTop = previousScroll;
          }
        } else if (firstFetch) renderRecordArchive();
        else if (recordsChanged) refreshDisplayedRecords(previousRecords);
        else if (wasFailed) updateRecordFetchNotice();
      }
    } catch {
      recordFetchFailed = true;
      updateRecordFetchNotice();
      // Keep previously fetched records visible after a temporary network failure.
      if (!notes.length) { empty.hidden = false; empty.textContent = '패치노트를 불러오지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.'; }
      else summary.textContent = '저장된 목록 표시 · 새로고침 실패';
    } finally {
      loading = false;
      refreshButton.disabled = false;
      refreshButton.textContent = '새로고침';
      list.removeAttribute('aria-busy');
      raList.removeAttribute('aria-busy');
      raRefresh.disabled = false;
    }
  }

  // ── 06 · 모달 이벤트 연결 ──
  // 선택 탭의 화면만 보이고 각 탭의 기존 검색·필터 상태는 유지한다.
  function showRecordHallView(){
    ra('.ra-patch-pane').hidden = activeView !== 'patch';
    ra('.ra-record-pane').hidden = activeView === 'patch';
    raRefresh.hidden = activeView === 'patch';
    for (const button of ra('.ra-viewtabs').querySelectorAll('[data-ra-view]')) {
      button.setAttribute('aria-pressed',String(button.dataset.raView === activeView));
    }
    if (activeView === 'patch') render();
    else renderRecordArchive();
  }
  // 기록 보관소 · 필터, 전체 카드 클릭, 목록 복귀, GitHub 새로고침
  raList.addEventListener('click', (event) => {
    const card = event.target.closest('button[data-record-number]');
    if (!card || !raList.contains(card)) return;
    const record = records.find((item) => String(item.number) === card.dataset.recordNumber);
    if (record) showRecordDetail(record);
  });
  ra('.ra-viewtabs').addEventListener('click', event => {
    const button = event.target.closest('button[data-ra-view]');
    if (!button || activeView === button.dataset.raView) return;
    const nextView = button.dataset.raView;
    if (nextView !== 'patch') {
      if (recordView !== nextView) {
        if (nextView === 'analysis') recordListBattle = recordFilters.battle;
        else recordFilters.battle = recordListBattle;
        recordView = nextView;
      }
      openedRecord = null;
      raScroll.scrollTop = 0;
    }
    activeView = nextView;
    showRecordHallView();
  });
  for (const [id,key] of [['ra-analysis-game','game'],['ra-analysis-difficulty','difficulty'],
    ['ra-analysis-stage','stage'],['ra-analysis-round','round'],['ra-analysis-kind','kind']]) {
    ra('#'+id).addEventListener('change',event=>{
      analysisFilters[key] = event.target.value;
      openedRecord = null;
      raScroll.scrollTop = 0;
      renderRecordArchive();
    });
  }
  ra('.ra-tabs').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-ra-mode]');
    if (!button) return;
    recordFilters.mode = button.dataset.raMode;
    recordFilters.battle = '전체';
    if (recordView === 'analysis') recordListBattle = '전체';
    recordFilters.game = '전체';
    recordFilters.difficulty = '전체';
    recordFilters.stage = '전체';
    recordFilters.player = '전체';
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  ra('.ra-battle').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-ra-battle]');
    if (!button || button.disabled) return;
    recordFilters.battle = button.dataset.raBattle;
    if (recordView === 'records') {
      recordFilters.difficulty = '전체';
      recordFilters.stage = '전체';
      recordFilters.player = '전체';
    }
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  ra('#ra-game').addEventListener('change', (event) => {
    recordFilters.game = event.target.value;
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  ra('#ra-difficulty').addEventListener('change', (event) => {
    recordFilters.difficulty = event.target.value;
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  ra('#ra-stage').addEventListener('change', (event) => {
    recordFilters.stage = event.target.value;
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  ra('#ra-player').addEventListener('change', (event) => {
    recordFilters.player = event.target.value;
    openedRecord = null;
    raScroll.scrollTop = 0;
    renderRecordArchive();
  });
  raRefresh.addEventListener('click', () => void refresh(true));
  ra('.ra-close').addEventListener('click', () => archiveDialog.close());
  archiveTrigger?.addEventListener('click', () => {
    if (archiveDialog.open) return;
    archiveDialog.showModal();
    archiveTrigger.setAttribute('aria-expanded', 'true');
    activeView = 'patch';
    openedRecord = null;
    raScroll.scrollTop = 0;
    showRecordHallView();
    void refresh();
  });
  archiveDialog.addEventListener('close', () => {
    archiveTrigger?.setAttribute('aria-expanded', 'false');
    archiveTrigger?.focus({ preventScroll: true });
  });
  let recordBackdropPress = false;
  archiveDialog.addEventListener('pointerdown', (event) => {
    const r = archiveDialog.getBoundingClientRect();
    recordBackdropPress = event.target === archiveDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom);
  });
  archiveDialog.addEventListener('click', (event) => {
    const r = archiveDialog.getBoundingClientRect();
    if (recordBackdropPress && event.target === archiveDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) archiveDialog.close();
    recordBackdropPress = false;
  });
  archiveDialog.addEventListener('keydown', (event) => event.stopPropagation());
  $('.bp-filters').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-kind]');
    if (!button || button.dataset.kind === chosenKind) return;
    chosenKind = button.dataset.kind;
    $('.bp-filters [aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    resetReader(); render();
  });
  $('.bp-periodtabs').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-period]');
    if (!button || button.dataset.period === chosenPeriod) return;
    chosenPeriod = button.dataset.period;
    chosenVersion = '';
    versionManuallySelected = false;
    resetReader(); render();
  });
  $('#bp-version').addEventListener('change', (event) => {
    chosenVersion = event.target.value;
    versionManuallySelected = true;
    resetReader(); render();
  });
  $('#bp-query').addEventListener('input', (event) => { search = event.target.value.trim().toLocaleLowerCase(); resetReader(); render(); });
  $('#bp-prev').addEventListener('click', () => move(-1));
  $('#bp-next').addEventListener('click', () => move(1));
  refreshButton.addEventListener('click', () => void refresh(true));
  const refreshIfDue = () => {
    if (!archiveDialog.open || document.hidden) return;
    if (monthKey(new Date()) !== renderedMonth) { chosenVersion = ''; versionManuallySelected = false; resetReader(); render(); }
    void refresh();
  };
  window.addEventListener('focus', refreshIfDue);
  document.addEventListener('visibilitychange', refreshIfDue);
  window.addEventListener('online', refreshIfDue);
})();
