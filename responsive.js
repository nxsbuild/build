/*!
 * Lenis 1.3.27 — bundled for a single-file responsive/scroll module.
 * The MIT License
 * 
 * Copyright (c) 2024 darkroom.engineering
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){var e=`1.3.27`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof Element&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();
;

/* 반응형 레이아웃
 * - 뷰포트 상태 클래스 관리
 * - 모바일/태블릿/세로 화면 전환 보조
 */
(() => {
  'use strict';
  const MODES=['is-pc-landscape','is-pc-portrait','is-tablet','is-mobile','is-portrait-view','is-mobile-device','is-tablet-device','is-narrow-mobile','is-tabbed'];
  // 독립 창은 자체 페이지이므로 원본 모바일 탭 재배치를 적용하지 않는다.
  if(window.DPS_STANDALONE_VIEW){
    const init=()=>{
      for(const el of [document.body,document.documentElement]){
        el.classList.remove(...MODES);
        el.classList.add('is-pc-landscape');
      }
      window.__dpsResponsiveLayoutReady=true;
      window.dpsMarkResponsiveLayoutReady?.();
    };
    window.dpsSyncResponsiveLayout=init;
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
    return;
  }

  /* 반응형 상태·측정 헬퍼 */
  const TABBED_PAGES = [
    { key: 'basic', label: '기본 정보', selectors: ['.col-left'] },
    { key: 'trait', label: '특성 관리', selectors: ['.trait-board-panel'] },
    { key: 'specUnit', label: '분석 보드', selectors: ['.stat-dps-card'] }
  ];
  const state = {
    tabs: null,
    pages: [],
    restore: new Map(),
    raf: 0,
    arrangedTabbed: false,
    layoutWidth: 0,
    layoutPortrait: null,
    activeIndex: 0,
    activeKey: null,
    resumeRaf: 0,
    initialized: false,
    traitScrollObserver: null,
    traitScrollRaf: 0,
    touchScrolling: false,
    viewportUpdatePending: false
  };
  /* 접힘 애니메이션·회전·제스처 후 변동된 특성 목록의 스크롤 경계를 보정한다.
   * 모바일/태블릿 특성 탭에만 적용하고 다른 페이지의 스크롤은 유지한다. */
  function clampTraitScroll() {
    if (!document.body.classList.contains('is-tabbed')) return;
    const page = state.pages.find(item => item.key === 'trait')?.el;
    if (!page || page.hidden || !page.classList.contains('active')) return;
    const maximum = Math.max(0, page.scrollHeight - page.clientHeight);
    if (page.scrollTop > maximum + 1) page.scrollTop = maximum;
  }
  function scheduleTraitScrollClamp() {
    if (state.traitScrollRaf) return;
    state.traitScrollRaf = requestAnimationFrame(() => {
      state.traitScrollRaf = 0;
      clampTraitScroll();
    });
  }
  function observeTraitScrollArea() {
    state.traitScrollObserver?.disconnect();
    state.traitScrollObserver = null;
    const panel = state.pages.find(item => item.key === 'trait')?.el.querySelector('.trait-board-panel');
    if (!panel || typeof ResizeObserver === 'undefined') return;
    state.traitScrollObserver = new ResizeObserver(scheduleTraitScrollClamp);
    state.traitScrollObserver.observe(panel);
  }
  /* 뷰포트 판정 */
  function getViewportSize() {
    const root = document.documentElement;
    return {
      w: root.clientWidth || window.innerWidth || 0,
      h: root.clientHeight || window.innerHeight || 0
    };
  }
  function getMode() {
    const { w, h } = getViewportSize();
    const shortSide = Math.min(w, h);
    const longSide = Math.max(w, h);
    const portrait = h > w;
    if (shortSide <= 600) return 'is-mobile';
    if (shortSide <= 1024 && longSide <= 1366) return 'is-tablet';
    if (portrait) return 'is-pc-portrait';
    return 'is-pc-landscape';
  }
  function updateMobileOffsets() {
    const header = document.querySelector('.hdr');
    const tabs = document.querySelector('.mobile-section-tabs');
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    const tabsHeight = tabs ? Math.ceil(tabs.getBoundingClientRect().height) : 0;
    const { w, h } = getViewportSize();
    document.documentElement.style.setProperty('--mobile-vw', `${w}px`);
    document.documentElement.style.setProperty('--mobile-header-h', `${headerHeight}px`);
    document.documentElement.style.setProperty('--mobile-tabs-h', `${tabsHeight}px`);
    const visualHeight = window.visualViewport?.height;
    const focused = document.activeElement;
    const isEditing = focused && (focused.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(focused.tagName));
    // Browser toolbar animations must not repeatedly resize the active scroll viewport.
    // Only shrink it for an actually focused editor with a visible on-screen keyboard.
    const keyboardVisible = isEditing && Number.isFinite(visualHeight) && visualHeight > 0 && h - visualHeight > 160;
    const usableHeight = keyboardVisible ? Math.min(h, Math.round(visualHeight)) : h;
    document.documentElement.style.setProperty('--mobile-vh', `${usableHeight}px`);
    scheduleTraitScrollClamp();
  }
  function applyMode() {
    const mode = getMode();
    const { w, h } = getViewportSize();
    const shortSide = Math.min(w, h);
    const direction = h > w ? 'is-portrait-view' : '';
    const deviceClass = mode === 'is-mobile' ? 'is-mobile-device' : (mode === 'is-tablet' ? 'is-tablet-device' : '');
    const widthClass = mode === 'is-mobile' && shortSide <= 430 ? 'is-narrow-mobile' : '';
    const classes=[mode];
    if (mode === 'is-mobile' || mode === 'is-tablet' || mode === 'is-pc-portrait') classes.push('is-tabbed');
    if (direction) classes.push(direction);
    if (deviceClass) classes.push(deviceClass);
    if (widthClass) classes.push(widthClass);
    for(const el of [document.body,document.documentElement]){
      el.classList.remove(...MODES);
      el.classList.add(...classes);
    }
    state.layoutWidth = w;
    state.layoutPortrait = h > w;
    syncTabbedLayout();
    const basicTopTab = state.tabs?.querySelector('#mobileTab-basic .mobile-tab-label');
    if (basicTopTab) basicTopTab.textContent = mode === 'is-mobile' || mode === 'is-tablet' ? '기본 설정' : '기본 정보';
    updateMobileOffsets();
  }
  /* 탭 레이아웃 */
  function rememberPosition(el) {
    if (!el || state.restore.has(el)) return;
    const marker = document.createComment(`mobile-restore:${el.className || el.tagName}`);
    el.parentNode.insertBefore(marker, el);
    state.restore.set(el, marker);
  }
  function getOrCreatePage(key) {
    let page = document.querySelector(`.mobile-page[data-mobile-page="${key}"]`);
    if (!page) {
      page = document.createElement('div');
      page.className = `mobile-page mobile-page-${key}`;
      page.dataset.mobilePage = key;
    }
    page.id = `mobilePage-${key}`;
    page.setAttribute('role', 'tabpanel');
    page.setAttribute('tabindex', '0');
    return page;
  }
  function getPageIndexByKey(key) {
    if (!key) return -1;
    return state.pages.findIndex(page => page.key === key);
  }
  function buildTabs(colWork, pages) {
    if (!state.tabs) {
      state.tabs = document.createElement('div');
      state.tabs.className = 'mobile-section-tabs';
      state.tabs.setAttribute('aria-label', '화면 전환');
      colWork.parentNode.insertBefore(state.tabs, colWork);
      state.tabs.addEventListener('keydown', handleTabKeydown);
    }
    state.tabs.textContent = '';
    const pageRow = document.createElement('div');
    pageRow.className = 'mobile-section-page-row';
    pageRow.setAttribute('role', 'tablist');
    pageRow.setAttribute('aria-label', '화면 전환');
    pages.forEach((page, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = `mobileTab-${page.key}`;
      btn.className = ['mobile-section-tab', 'mobile-section-page-tab', page.toneClass].filter(Boolean).join(' ');
      const glyph = page.key === 'basic' ? '▤' : page.key === 'trait' ? '✦' : '▥';
      btn.innerHTML = `<span class="mobile-tab-glyph" aria-hidden="true">${glyph}</span><span class="mobile-tab-label">${page.label}</span>`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('aria-controls', page.el.id);
      btn.tabIndex = -1;
      page.el.setAttribute('aria-labelledby', btn.id);
      btn.addEventListener('click', () => showTabbedPage(idx, true));
      pageRow.appendChild(btn);
    });
    state.tabs.append(pageRow);
  }
  function handleTabKeydown(event) {
    const tabs = Array.from(state.tabs?.querySelectorAll('.mobile-section-page-tab') || []);
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex < 0) return;
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    showTabbedPage(nextIndex, false);
    tabs[nextIndex]?.focus();
  }
  function setActiveTab(activeIndex) {
    const nextIndex = Math.max(0, Math.min(state.pages.length - 1, activeIndex));
    state.activeIndex = nextIndex;
    state.activeKey = state.pages[nextIndex]?.key || state.activeKey;
    if (state.tabs) {
      state.tabs.querySelectorAll('.mobile-section-page-tab').forEach((btn, idx) => {
        const active = idx === nextIndex;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
        btn.tabIndex = active ? 0 : -1;
      });
    }
    state.pages.forEach((page, idx) => {
      const active = idx === nextIndex;
      page.el.classList.toggle('active', active);
      page.el.hidden = !active;
      page.el.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }
  function showTabbedPage(index, resetPageScroll = false) {
    if (!state.pages.length) return;
    const nextIndex = Math.max(0, Math.min(state.pages.length - 1, index));
    setActiveTab(nextIndex);
    if (resetPageScroll) state.pages[nextIndex].el.scrollTop = 0;
    updateMobileOffsets();
    scheduleTraitScrollClamp();
  }
  function arrangeTabbed(colWork) {
    const pages = [];
    const keepKey = state.activeKey || state.pages[state.activeIndex]?.key || 'basic';
    TABBED_PAGES.forEach((config) => {
      const elements = config.selectors.map(selector => document.querySelector(selector)).filter(Boolean);
      if (!elements.length) return;
      const page = getOrCreatePage(config.key);
      page.textContent = '';
      page.dataset.mobileLabel = config.label;
      elements.forEach((el) => {
        rememberPosition(el);
        page.appendChild(el);
      });
      colWork.appendChild(page);
      pages.push({ ...config, el: page });
    });
    state.pages = pages;
    observeTraitScrollArea();
    buildTabs(colWork, pages);
    colWork.classList.add('is-mobile-arranged');
    state.arrangedTabbed = true;
    const keepIndex = getPageIndexByKey(keepKey);
    showTabbedPage(keepIndex >= 0 ? keepIndex : state.activeIndex);
  }
  function restoreDesktop() {
    if (!state.arrangedTabbed) return;
    state.traitScrollObserver?.disconnect();
    state.traitScrollObserver = null;
    if (state.traitScrollRaf) cancelAnimationFrame(state.traitScrollRaf);
    state.traitScrollRaf = 0;
    state.restore.forEach((marker, el) => {
      if (marker.parentNode) marker.parentNode.insertBefore(el, marker.nextSibling);
    });
    Array.from(document.querySelectorAll('.mobile-page')).forEach(page => page.remove());
    if (state.tabs) state.tabs.remove();
    document.querySelector('.col-work')?.classList.remove('is-mobile-arranged');
    state.tabs = null;
    state.pages = [];
    state.arrangedTabbed = false;
  }
  function syncTabbedLayout() {
    const colWork = document.querySelector('.col-work');
    if (!colWork) return;
    if (document.body.classList.contains('is-tabbed')) {
      if (!state.arrangedTabbed) arrangeTabbed(colWork);
      else {
        showTabbedPage(getPageIndexByKey(state.activeKey));
      }
    } else {
      restoreDesktop();
    }
  }

  function isTextInput(el) {
    if (!el || el.disabled || el.readOnly) return false;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName !== 'INPUT') return false;
    return !['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'].includes((el.type || '').toLowerCase());
  }
  function bindInputAutoSelect() {
    if (document.documentElement.dataset.inputAutoSelectBound === '1') return;
    document.documentElement.dataset.inputAutoSelectBound = '1';
    document.addEventListener('focusin', (event) => {
      const el = event.target;
      if (!isTextInput(el)) return;
      requestAnimationFrame(() => {
        if(typeof el.select==='function') el.select();
      });
    });
  }
  /* 갱신·초기화 */
  function scheduleApply() {
    if (state.touchScrolling) {
      state.viewportUpdatePending = true;
      return;
    }
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(() => {
      state.raf = 0;
      const { w, h } = getViewportSize();
      const portrait = h > w;
      const widthChanged = Math.abs(w - state.layoutWidth) > 1;
      const orientationChanged = state.layoutPortrait !== portrait;
      if (widthChanged || orientationChanged) applyMode();
      else updateMobileOffsets();
    });
  }
  function scheduleResumeApply() {
    if (state.resumeRaf) return;
    state.resumeRaf = requestAnimationFrame(() => {
      state.resumeRaf = 0;
      applyMode();
    });
  }
  function markResponsiveReady() {
    window.__dpsResponsiveLayoutReady = true;
    if (typeof window.dpsMarkResponsiveLayoutReady === 'function') {
      window.dpsMarkResponsiveLayoutReady();
    }
  }

  function initializeResponsiveLayout() {
    if (state.initialized) {
      markResponsiveReady();
      return;
    }
    state.initialized = true;
    applyMode();
    bindInputAutoSelect();
    markResponsiveReady();
  }
  function syncResponsiveLayout() {
    if (!state.initialized) {
      initializeResponsiveLayout();
      return;
    }
    applyMode();
    markResponsiveReady();
  }
  window.dpsSyncResponsiveLayout = syncResponsiveLayout;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResponsiveLayout, { once: true });
  } else {
    initializeResponsiveLayout();
  }
  // Let the browser own native touch momentum; viewport mutations resume after release.
  document.addEventListener('touchstart', () => { state.touchScrolling = true; }, { passive: true });
  const finishTouch = () => {
    state.touchScrolling = false;
    if (state.viewportUpdatePending) {
      state.viewportUpdatePending = false;
      scheduleApply();
    }
  };
  document.addEventListener('touchend', finishTouch, { passive: true });
  document.addEventListener('touchcancel', finishTouch, { passive: true });
  window.addEventListener('resize', scheduleApply, { passive: true });
  window.addEventListener('orientationchange', scheduleApply, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleApply, { passive: true });
  window.addEventListener('pageshow', scheduleResumeApply, { passive: true });
  window.addEventListener('focus', scheduleResumeApply, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scheduleResumeApply();
  }, { passive: true });
  window.addEventListener('load', updateMobileOffsets, { once: true });
})();


/* ===== Lenis 패널 스크롤 통합 ===== */
/* v032: 기존 스크롤 영역에 Lenis 적용. 계산·버튼·화면 전환 코드는 유지합니다. */
(() => {
  'use strict';
  if (!window.Lenis) return;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const instances = new Map();
  let ready = false, destroyed = false, frame = 0, timer = 0;
  const visible = element => !element.hidden && element.getClientRects().length > 0;
  const sizeObserver = new ResizeObserver(scheduleSync);
  const observed = new Set();

  function targets() {
    if (reduced.matches) return [];
    if (window.DPS_STANDALONE_VIEW) return [window];
    return [...document.querySelectorAll(document.body.classList.contains('is-tabbed')
      ? '.mobile-page.active' : '.col-left,.col-mid,.col-right')].filter(visible);
  }
  function sync() {
    timer = 0;
    if (!ready || destroyed) return;
    const active = targets();
    for (const [wrapper, entry] of instances) {
      if (active.includes(wrapper)) continue;
      entry.lenis.destroy();
      if (wrapper !== window) wrapper.removeAttribute('data-lenis-panel');
      instances.delete(wrapper);
    }
    const nextObserved = new Set();
    for (const wrapper of active) {
      const content = wrapper === window ? root : wrapper;
      const height = content.scrollHeight;
      const viewport = wrapper === window ? innerHeight : wrapper.clientHeight;
      if (!instances.has(wrapper)) {
        instances.set(wrapper, {
          lenis: new window.Lenis({
            wrapper, content, eventsTarget: wrapper,
            autoRaf: false, lerp: .105, smoothWheel: true,
            syncTouch: false, overscroll: false, allowNestedScroll: true,
            prevent: node => !!node.closest?.('textarea,[data-lenis-prevent],[role="dialog"],dialog,.app-select-menu,.dps-compare-scroll')
          }), height, viewport
        });
        if (wrapper !== window) wrapper.setAttribute('data-lenis-panel', '');
      } else {
        const entry = instances.get(wrapper);
        if (entry.height !== height || entry.viewport !== viewport) {
          entry.lenis.resize();
          entry.height = height;
          entry.viewport = viewport;
        }
      }
      nextObserved.add(content);
      // The application relies on direct-child selectors, so retain its DOM.
      // Watch its content cards instead of introducing a scrolling wrapper.
      for (const child of content.children) nextObserved.add(child);
      if (wrapper !== window) {
        content.querySelectorAll('.trait-board-panel,.trait-invest-list,.stat-dps-card').forEach(el => nextObserved.add(el));
      }
    }
    for (const el of observed) if (!nextObserved.has(el)) { sizeObserver.unobserve(el); observed.delete(el); }
    for (const el of nextObserved) if (!observed.has(el)) { sizeObserver.observe(el); observed.add(el); }
    if (instances.size && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    if (!instances.size && frame) { cancelAnimationFrame(frame); frame = 0; }
  }
  function tick(ms) {
    frame = 0;
    if (destroyed || document.hidden || !instances.size) return;
    for (const {lenis} of instances.values()) lenis.raf(ms);
    frame = requestAnimationFrame(tick);
  }
  function scheduleSync() {
    if (destroyed) return;
    clearTimeout(timer);
    timer = setTimeout(sync, 100);
  }
  function start() {
    if (ready || destroyed || root.classList.contains('dps-booting') || !document.querySelector('.wrap')) return;
    ready = true;
    sync();
  }
  const observer = new MutationObserver(records => {
    if (!ready) { start(); return; }
    if (records.some(({target, type, addedNodes, removedNodes}) => {
      if (type === 'attributes') return target.matches?.('body,.mobile-page,[role="tabpanel"],.trait-tier-panel,.trait-invest-list');
      return [...addedNodes,...removedNodes].some(node => node.nodeType === 1 &&
        (node.matches?.('.mobile-page,.col-left,.trait-tier-panel') || node.querySelector?.('.mobile-page')));
    })) scheduleSync();
  });
  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else sync();
  }
  function onPageHide(event) {
    if (event.persisted) { cancelAnimationFrame(frame); frame = 0; }
    else destroy();
  }
  function destroy() {
    destroyed = true;
    clearTimeout(timer); cancelAnimationFrame(frame);
    observer.disconnect(); sizeObserver.disconnect();
    for (const [wrapper, {lenis}] of instances) {
      lenis.destroy();
      if (wrapper !== window) wrapper.removeAttribute('data-lenis-panel');
    }
    instances.clear();
    window.removeEventListener('resize', scheduleSync);
    window.removeEventListener('pageshow', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', scheduleSync);
  }
  observer.observe(root, {subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden','aria-selected']});
  window.addEventListener('resize', scheduleSync, {passive:true});
  window.addEventListener('pageshow', onVisibility);
  window.addEventListener('pagehide', onPageHide);
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', scheduleSync);
  start();
})();
