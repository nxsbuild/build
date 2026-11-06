(() => {
  'use strict';
  // Builder release archive: one owner for both its presentation and behavior.
  const trigger = document.getElementById('btnPatchNotes');
  if (!trigger || document.getElementById('builderPatchDialog')) return;

  // ── 01 · 패치노트 스타일 ──
  const style = document.createElement('style');
  style.id = 'builder-patch-style';
  style.textContent = String.raw`
/* 패치노트: 빌더 기본 모달 색상 토큰 사용; 헤더 버튼은 style.css 공통 규칙 적용 */
#builderPatchDialog{--patch-text:var(--ui-text,#e2e7f0);position:fixed;inset:0;box-sizing:border-box;width:min(820px,calc(100vw - 42px));height:min(750px,calc(100dvh - 50px));max-width:none;max-height:none;margin:auto;padding:0;overflow:hidden;border:1px solid #425875;border-radius:var(--ui-modal-radius,15px);background:var(--ui-panel-body-bg,#08090b);color:var(--patch-text);box-shadow:var(--ui-modal-shadow,0 28px 95px #000b);font:calc(12.5px * var(--app-font-scale,1))/1.5 var(--font-main,system-ui,sans-serif);color-scheme:dark}
#builderPatchDialog[open]{display:flex;flex-direction:column}
#builderPatchDialog::backdrop{background:rgba(0,0,0,.78);backdrop-filter:blur(7px)}
#builderPatchDialog *{box-sizing:border-box}
#builderPatchDialog [hidden]{display:none!important}
#builderPatchDialog button,#builderPatchDialog input{font:inherit}
#builderPatchDialog button{cursor:pointer;transition:border-color .15s,background .15s,color .15s}
#builderPatchDialog :is(button,input,summary):focus-visible{outline:2px solid #92bdf8;outline-offset:2px}
#builderPatchDialog .bp-head{display:flex;align-items:flex-start;gap:12px;flex:0 0 auto;padding:19px 22px 17px;border-bottom:1px solid var(--ui-integrated-head-line,#252d35);background:linear-gradient(115deg,rgba(111,147,191,.09),transparent 64%),var(--ui-integrated-head-bg,linear-gradient(105deg,#13181e,#0c1014 78%))}
#builderPatchDialog .bp-mark{display:grid;place-items:center;flex:0 0 39px;width:39px;height:39px;border:1px solid #45658b;border-radius:11px;background:linear-gradient(140deg,#193955,#111924);color:#a9c8ff;box-shadow:inset 0 1px #ffffff18}
#builderPatchDialog .bp-mark svg{width:21px;height:21px}
#builderPatchDialog .bp-head-copy{flex:1;min-width:0}
#builderPatchDialog .bp-kicker{display:block;margin:0 0 3px;color:#8dbaf2;font:700 9px/1.3 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.14em}
#builderPatchDialog h2{margin:0;color:var(--ui-integrated-head-text,#e6edf7);font-size:20px;font-weight:700;line-height:1.2;letter-spacing:-.025em}
#builderPatchDialog .bp-subtitle{margin:5px 0 0;color:#9bafc8;font-size:11px;line-height:1.35}
#builderPatchDialog #bp-close{display:grid;place-items:center;flex:0 0 32px;width:32px;height:32px;padding:0;border:1px solid #47566b;border-radius:8px;background:#18212d;color:#c5d5e9;font-size:22px;line-height:1}
#builderPatchDialog #bp-close:hover{border-color:#94bfff;color:#fff;background:#24354a}
#builderPatchDialog .bp-controls{flex:0 0 auto;padding:12px 22px;border-bottom:1px solid #273343;background:#090b0d}
#builderPatchDialog .bp-toolbar{display:flex;align-items:center;gap:8px;margin-bottom:10px}
#builderPatchDialog .bp-search{display:flex;align-items:center;flex:1;min-width:0;min-height:36px;gap:8px;padding:0 11px;border:1px solid #405674;border-radius:8px;background:#080d13;transition:border-color .15s}
#builderPatchDialog .bp-search:focus-within{border-color:#80b6fb;box-shadow:0 0 0 2px #75aaff20}
#builderPatchDialog .bp-search svg{width:15px;height:15px;flex:0 0 15px;color:#829cb9}
#builderPatchDialog .bp-search input{flex:1;min-width:0;width:100%;height:34px;border:0;background:transparent;color:#eff6ff;outline:0;font-size:12px}
#builderPatchDialog .bp-search input::placeholder{color:#879cb6}
#builderPatchDialog #bp-refresh{flex:0 0 auto;min-height:36px;padding:5px 12px;border:1px solid #405674;border-radius:8px;background:#1a2634;color:#c7d9ed;font-size:11px}
#builderPatchDialog #bp-refresh:hover:not(:disabled){border-color:#88aff2;background:#243b57}
#builderPatchDialog #bp-refresh:disabled{cursor:wait;opacity:.65}
#builderPatchDialog .bp-filters{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
#builderPatchDialog .bp-filters button{min-height:30px;padding:5px 12px;border:1px solid #344457;border-radius:7px;background:#161e28;color:#afc2da;font-size:11px;line-height:1.2}
#builderPatchDialog .bp-filters button:hover{background:#223248;color:#e7f2ff}
#builderPatchDialog .bp-filters [aria-pressed="true"]{border-color:#6f9bcf;background:#263e59;color:#e7f2ff;font-weight:700;box-shadow:inset 0 1px #ffffff12}
#builderPatchDialog .bp-filters [data-kind="new"][aria-pressed="true"]{border-color:#549b94;background:#173b3b;color:#a6eadf}
#builderPatchDialog .bp-filters [data-kind="preset"][aria-pressed="true"]{border-color:#9981d1;background:#302840;color:#ddcaff}
#builderPatchDialog .bp-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:14px 22px 18px;background:#090b0d;scrollbar-width:thin;scrollbar-color:#465b73 transparent}
#builderPatchDialog .bp-summary{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#9aa9bc;font-size:11px}
#builderPatchDialog .bp-summary:before{content:'';flex:0 0 3px;width:3px;height:13px;border-radius:3px;background:#83b8f5}
#builderPatchDialog .bp-empty{display:grid;place-items:center;min-height:170px;padding:20px;border:1px dashed #3c516a;border-radius:12px;background:#111a24;color:#b7c9dc;text-align:center;line-height:1.65;white-space:pre-line}
#builderPatchDialog .bp-list{display:grid;gap:23px}
#builderPatchDialog .bp-release{min-width:0}
#builderPatchDialog .bp-release-head{display:flex;align-items:end;justify-content:space-between;flex-wrap:wrap;gap:8px 14px;margin-bottom:11px;padding:4px 2px 12px;border-bottom:1px solid #314156}
#builderPatchDialog .bp-release-heading{min-width:0;padding-left:12px;border-left:3px solid #80b8ff}
#builderPatchDialog .bp-release-kicker{display:block;margin:0 0 3px;color:#8fb8e9;font:700 9px/1.3 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.13em}
#builderPatchDialog .bp-release-title{margin:0;color:#f2f6fc;font-size:19px;font-weight:750;line-height:1.3;letter-spacing:-.025em;overflow-wrap:anywhere}
#builderPatchDialog .bp-release-meta{display:flex;align-items:center;gap:10px;padding-bottom:2px;color:#91a5bf;font-size:10px;white-space:nowrap}
#builderPatchDialog .bp-release-meta time{margin:0;color:inherit}
#builderPatchDialog .bp-release-items{display:grid;gap:8px;min-width:0}
#builderPatchDialog .bp-card{--bp-tone:#80b8ff;--bp-rgb:128,184,255;overflow-wrap:anywhere;min-width:0;border:1px solid #334457;border-radius:9px;background:linear-gradient(120deg,rgba(76,112,151,.035),transparent 72%),#141b24;box-shadow:inset 0 1px #ffffff05;transition:border-color .15s,background .15s}
#builderPatchDialog .bp-card[data-tone="fix"]{--bp-tone:#cc858e;--bp-rgb:204,133,142}
#builderPatchDialog .bp-card[data-tone="improve"]{--bp-tone:#aeb8c4;--bp-rgb:174,184,196}
#builderPatchDialog .bp-card:hover{border-color:#536e8c;background:linear-gradient(120deg,rgba(var(--bp-rgb),.065),transparent 72%),#17212c}
#builderPatchDialog .bp-card[open]{border-color:#59718a;background:#141c26}
#builderPatchDialog .bp-card>summary{display:block;padding:12px 14px;border-left:3px solid var(--bp-tone);border-radius:8px;list-style:none;cursor:pointer;scroll-margin-top:8px}
#builderPatchDialog .bp-card>summary::-webkit-details-marker{display:none}
#builderPatchDialog .bp-card>summary::marker{content:''}
#builderPatchDialog .bp-card[open]>summary{border-bottom:1px solid #344559;border-radius:8px 8px 0 0;background:rgba(var(--bp-rgb),.035)}
#builderPatchDialog .bp-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px 12px;min-width:0}
#builderPatchDialog .bp-kind{flex:0 0 auto;font:600 9px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.055em;white-space:nowrap}
#builderPatchDialog .bp-kind[data-kind="update"]{color:#80b8ff}
#builderPatchDialog .bp-kind[data-kind="new"]{color:#c4a0ff}
#builderPatchDialog .bp-kind[data-kind="preset"]{color:#67d8e8}
#builderPatchDialog .bp-kind[data-kind="fix"]{color:#ff8585}
#builderPatchDialog .bp-kind[data-kind="improve"]{color:#c4cbd4}
#builderPatchDialog .bp-kinds{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px 9px;min-width:0}
#builderPatchDialog .bp-kind-unit{display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
#builderPatchDialog .bp-kind-separator{color:#657386;font:600 10px/1 ui-monospace,SFMono-Regular,Consolas,monospace}
#builderPatchDialog .bp-tag{padding:2px 7px;border:1px solid #3d526c;border-radius:5px;background:#233247;color:#c6daef;font-size:10px;line-height:1.4}
#builderPatchDialog time{flex:0 0 auto;margin-left:auto;color:#9aa9bc;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;font-variant-numeric:tabular-nums}
#builderPatchDialog .bp-second{display:flex;align-items:center;flex-wrap:wrap;gap:5px 9px;margin-top:7px;min-width:0}
#builderPatchDialog .bp-preview{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;flex:1 1 0;min-width:0;overflow:hidden;overflow-wrap:anywhere;color:#f1f5f9;font-size:13.5px;font-weight:650;line-height:1.45}
#builderPatchDialog .bp-excerpt{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:9px 0 0;color:#aebed0;font-size:11.5px;line-height:1.55}
#builderPatchDialog .bp-body{padding:14px 16px 18px;background:#0b0d10;color:#e6edf7;font-size:12px;line-height:1.65;overflow-wrap:anywhere}
#builderPatchDialog .bp-body>*+*{margin-top:8px}
#builderPatchDialog .bp-body h4{margin:13px 0 6px;padding-left:9px;border-left:2px solid #6795cd;color:#e6f1ff;font-size:13px}
#builderPatchDialog .bp-body :is(ul,ol){padding-left:18px}
#builderPatchDialog .bp-body li+li{margin-top:4px}
#builderPatchDialog .bp-body strong{color:#f1f7ff}
#builderPatchDialog .bp-body pre{overflow:auto;padding:10px;border-radius:7px;background:#090d12}
#builderPatchDialog .bp-body code{padding:2px 4px;border-radius:4px;background:#222c38}
#builderPatchDialog .bp-body pre code{padding:0;background:none}
#builderPatchDialog .bp-body blockquote{padding-left:11px;border-left:2px solid #465d7c}
#builderPatchDialog .bp-body a{color:#9bcaff;text-decoration:underline}
#builderPatchDialog .bp-body :is(th,td){padding:5px 7px;border:1px solid #3c4f66}
#builderPatchDialog .bp-body table{display:block;overflow:auto;border-collapse:collapse}
#builderPatchDialog .bp-body hr{border:0;border-top:1px solid #344558}
#builderPatchDialog .bp-plain{white-space:pre-wrap}
#builderPatchDialog .bp-image-link{display:inline-block;max-width:100%}
#builderPatchDialog .bp-image{display:block;max-width:100%;max-height:420px;border:1px solid #3c4f66;border-radius:7px}
#builderPatchDialog .bp-reader{display:grid;grid-template-columns:95px minmax(0,1fr) 95px;align-items:center;gap:10px;flex:0 0 auto;padding:10px 22px;border-top:1px solid #34485f;background:linear-gradient(110deg,#182434,#0d131b)}
#builderPatchDialog .bp-reader button{min-height:34px;padding:4px 8px;border:1px solid #466389;border-radius:8px;background:#20334a;color:#e0edfb;font-size:12px}
#builderPatchDialog .bp-reader button:not(:disabled):hover{border-color:#91bdf5;background:#2d486a}
#builderPatchDialog .bp-reader button:disabled{opacity:.38;cursor:not-allowed}
#builderPatchDialog .bp-position{text-align:center;color:#b5d5ff;font:700 11px ui-monospace,SFMono-Regular,Consolas,monospace}
@media(max-width:540px){
 #builderPatchDialog{width:calc(100vw - 18px);height:calc(100dvh - 20px);border-radius:13px}
 #builderPatchDialog .bp-head{gap:9px;padding:13px 12px}
 #builderPatchDialog .bp-mark{flex-basis:34px;width:34px;height:34px}
 #builderPatchDialog .bp-mark svg{width:19px;height:19px}
 #builderPatchDialog h2{font-size:18px}
 #builderPatchDialog .bp-kicker{font-size:8px}
 #builderPatchDialog .bp-subtitle{font-size:10px}
 #builderPatchDialog .bp-controls{padding:10px 11px}
 #builderPatchDialog .bp-scroll{padding:12px 10px 15px}
 #builderPatchDialog .bp-filters{gap:4px}
 #builderPatchDialog .bp-filters button{padding:4px 9px;min-height:30px;font-size:10.5px}
 #builderPatchDialog .bp-release-head{gap:6px 10px;padding-bottom:10px}
 #builderPatchDialog .bp-release-title{font-size:17px}
 #builderPatchDialog .bp-release-meta{font-size:9.5px}
 #builderPatchDialog .bp-card>summary{padding:10px 10px 10px 11px}
 #builderPatchDialog .bp-preview{font-size:12.5px}
 #builderPatchDialog .bp-excerpt{font-size:11px}
 #builderPatchDialog .bp-body{padding:12px}
 #builderPatchDialog .bp-reader{grid-template-columns:76px minmax(0,1fr) 76px;gap:7px;padding:8px 10px}
 #builderPatchDialog .bp-reader button{font-size:11px}
}
@media(max-width:360px){#builderPatchDialog .bp-filters button{padding:4px 8px}#builderPatchDialog .bp-second{gap:4px 6px}#builderPatchDialog time{font-size:9px}}
@media(prefers-reduced-motion:reduce){#builderPatchDialog .bp-card,#builderPatchDialog button{transition:none}}
`;
  document.head.appendChild(style);

  // ── 02 · 모달 구조·공통 상태 ──
  // Keep markup inside the owner file; only the trigger belongs to the existing header.
  const dialog = document.createElement('dialog');
  dialog.id = 'builderPatchDialog';
  dialog.setAttribute('aria-labelledby', 'bp-title');
  dialog.setAttribute('aria-describedby', 'bp-description');
  dialog.innerHTML = `
    <header class="bp-head">
      <span class="bp-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h9l4 4v12H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M15 4v4h4M8 12h8M8 16h6"/></svg></span>
      <div class="bp-head-copy"><span class="bp-kicker">BUILDER · PATCH NOTES</span><h2 id="bp-title">패치노트</h2><p id="bp-description" class="bp-subtitle">새로운 콘텐츠와 주요 변경 사항을 확인하세요.</p></div>
      <button id="bp-close" type="button" aria-label="패치노트 닫기">×</button>
    </header>
    <div class="bp-controls">
      <div class="bp-toolbar"><label class="bp-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.3"/><path d="m15 15 5 5"/></svg><input id="bp-query" type="search" placeholder="버전 · 태그 · 내용 검색" aria-label="패치노트 검색" autocomplete="off"/></label><button id="bp-refresh" type="button">새로고침</button></div>
      <nav class="bp-filters" aria-label="패치노트 카테고리"><button type="button" data-kind="all" aria-pressed="true">전체</button><button type="button" data-kind="update" aria-pressed="false">업데이트</button><button type="button" data-kind="new" aria-pressed="false">신규기능</button><button type="button" data-kind="preset" aria-pressed="false">프리셋</button><button type="button" data-kind="fix" aria-pressed="false">오류수정</button><button type="button" data-kind="improve" aria-pressed="false">개선사항</button></nav>
    </div>
    <main class="bp-scroll"><div id="bp-summary" class="bp-summary">전체 기간 · 불러오는 중</div><div id="bp-empty" class="bp-empty" role="status">패치노트를 불러오는 중입니다.</div><section id="bp-list" class="bp-list" aria-label="패치노트 목록"></section></main>
    <footer id="bp-reader" class="bp-reader" hidden><button id="bp-prev" type="button">‹ 이전</button><span id="bp-position" class="bp-position"></span><button id="bp-next" type="button">다음 ›</button></footer>
  `;
  document.body.appendChild(dialog);
  const $ = (selector) => dialog.querySelector(selector);
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
  let search = '';
  let openedNumber = null;
  let listScrollPosition = 0;
  let lastAttempt = 0;
  let retryAfter = 0;
  let loading = false;

  // ── 03 · GitHub 이슈 분류·본문 처리 ──
  // Version labels identify a release; content categories are independent of the version.
  function normalizeIssue(issue) {
    if (!issue || issue.pull_request || issue.user?.login?.toLowerCase() !== creator) return null;
    const rawTitle = String(issue.title || '').trim();
    const body = String(issue.body || '').trim();
    if (!rawTitle) return null;
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

  // ── 04 · 검색·필터·버전별 표시 ──
  function filteredNotes() {
    const matches = notes.filter((note) => (chosenKind === 'all' || note.kinds.includes(chosenKind)) &&
      [note.name, ...note.tags, note.body, ...note.kinds.map((kind) => statusLabel[kind])].join(' ').toLocaleLowerCase().includes(search));
    // 화면의 버전 정렬과 상세보기 이전·다음 이동 순서를 동일하게 유지한다.
    return groupByRelease(matches).flatMap((group) => group.items);
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
  function render() {
    const selected = filteredNotes();
    const active = selected.find((note) => note.number === openedNumber);
    if (!active) openedNumber = null;
    const displayed = active ? [active] : selected;
    const releases = groupByRelease(displayed).map((group) => {
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
    });
    list.replaceChildren(...releases);
    summary.textContent = '전체 기간 · ' + selected.length + '건';
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

  // ── 05 · GitHub 목록 새로고침 ──
  async function refresh(force = false) {
    if (loading || (!force && Date.now() - lastAttempt < refreshInterval)) return;
    if (Date.now() < retryAfter) { empty.hidden = false; empty.textContent = 'GitHub 요청 한도에 도달했습니다. 이후 다시 시도해 주세요.'; return; }
    loading = true;
    refreshButton.disabled = true;
    refreshButton.textContent = '확인 중…';
    list.setAttribute('aria-busy', 'true');
    lastAttempt = Date.now();
    try {
      const url = new URL(`https://api.github.com/repos/${repository}/issues`);
      url.search = new URLSearchParams({ creator, state: 'all', sort: 'created', direction: 'desc', per_page: '100' });
      const updated = [];
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
        updated.push(...issues.map(normalizeIssue).filter(Boolean));
        if (!response.headers.get('link')?.includes('rel="next"')) break;
      }
      notes = updated;
      render();
    } catch {
      // Keep previously fetched records visible after a temporary network failure.
      if (!notes.length) { empty.hidden = false; empty.textContent = '패치노트를 불러오지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.'; }
      else summary.textContent = '저장된 목록 표시 · 새로고침 실패';
    } finally {
      loading = false;
      refreshButton.disabled = false;
      refreshButton.textContent = '새로고침';
      list.removeAttribute('aria-busy');
    }
  }

  // ── 06 · 모달 이벤트 연결 ──
  $('.bp-filters').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-kind]');
    if (!button || button.dataset.kind === chosenKind) return;
    chosenKind = button.dataset.kind;
    $('.bp-filters [aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    resetReader(); render();
  });
  $('#bp-query').addEventListener('input', (event) => { search = event.target.value.trim().toLocaleLowerCase(); resetReader(); render(); });
  $('#bp-prev').addEventListener('click', () => move(-1));
  $('#bp-next').addEventListener('click', () => move(1));
  refreshButton.addEventListener('click', () => void refresh(true));
  $('#bp-close').addEventListener('click', () => dialog.close());
  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    render();
    if (!lastAttempt) { empty.hidden = false; empty.textContent = '패치노트를 불러오는 중입니다.'; }
    void refresh();
  });
  dialog.addEventListener('close', () => { trigger.setAttribute('aria-expanded', 'false'); trigger.focus({ preventScroll: true }); });
  let backdropPress = false;
  function outside(event) {
    const r = dialog.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  }
  dialog.addEventListener('pointerdown', (event) => { backdropPress = event.target === dialog && outside(event); });
  dialog.addEventListener('click', (event) => {
    if (backdropPress && event.target === dialog && outside(event)) dialog.close();
    backdropPress = false;
  });
  dialog.addEventListener('keydown', (event) => event.stopPropagation());
  const refreshIfDue = () => { if (dialog.open && !document.hidden) void refresh(); };
  window.addEventListener('focus', refreshIfDue);
  document.addEventListener('visibilitychange', refreshIfDue);
  window.addEventListener('online', refreshIfDue);
})();
