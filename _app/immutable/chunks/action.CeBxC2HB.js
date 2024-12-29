import{r as V,v as Ie,q as se,x as re,y as ce,z as R}from"./base.B8YQNtyG.js";import{al as Oe}from"./utils.jAVDF0d8.js";import{r as le,w as fe}from"./paths.ILxTyYqI.js";function Re(r){return r[r.length-1]}function Nt(r,e){return r.map((t,a)=>r[(e+a)%r.length])}function ge(r){return new Promise(e=>setTimeout(e,r))}const we=()=>typeof window<"u";function Ce(){const r=navigator.userAgentData;return(r==null?void 0:r.platform)??navigator.platform}const Te=r=>we()&&r.test(Ce().toLowerCase()),xe=()=>we()&&!!navigator.maxTouchPoints,Le=()=>Te(/^mac/)&&!xe(),Me=()=>Te(/mac|iphone|ipad|ipod/i),Be=()=>Me()&&!Le(),J="data-melt-scroll-lock";function de(r,e){if(!r)return;const t=r.style.cssText;return Object.assign(r.style,e),()=>{r.style.cssText=t}}function Ke(r,e,t){if(!r)return;const a=r.style.getPropertyValue(e);return r.style.setProperty(e,t),()=>{a?r.style.setProperty(e,a):r.style.removeProperty(e)}}function je(r){const e=r.getBoundingClientRect().left;return Math.round(e)+r.scrollLeft?"paddingLeft":"paddingRight"}function Ft(r){const e=document,t=e.defaultView??window,{documentElement:a,body:u}=e;if(u.hasAttribute(J))return V;u.setAttribute(J,"");const n=t.innerWidth-a.clientWidth,f=()=>Ke(a,"--scrollbar-width",`${n}px`),l=je(a),v=t.getComputedStyle(u)[l],y=()=>de(u,{overflow:"hidden",[l]:`calc(${v} + ${n}px)`}),b=()=>{const{scrollX:E,scrollY:h,visualViewport:S}=t,D=(S==null?void 0:S.offsetLeft)??0,P=(S==null?void 0:S.offsetTop)??0,k=de(u,{position:"fixed",overflow:"hidden",top:`${-(h-Math.floor(P))}px`,left:`${-(E-Math.floor(D))}px`,right:"0",[l]:`calc(${v} + ${n}px)`});return()=>{k==null||k(),t.scrollTo(E,h)}},w=[f(),Be()?b():y()];return()=>{w.forEach(E=>E==null?void 0:E()),u.removeAttribute(J)}}async function Et(r){const{prop:e,defaultEl:t}=r;if(await Promise.all([ge(1),Oe]),e===void 0){t==null||t.focus();return}const a=Ie(e)?e(t):e;if(typeof a=="string"){const u=document.querySelector(a);if(!se(u))return;u.focus()}else se(a)&&a.focus()}/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var Ne=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],W=Ne.join(","),Fe=typeof Element>"u",x=Fe?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,X=!Fe&&Element.prototype.getRootNode?function(r){var e;return r==null||(e=r.getRootNode)===null||e===void 0?void 0:e.call(r)}:function(r){return r==null?void 0:r.ownerDocument},Y=function r(e,t){var a;t===void 0&&(t=!0);var u=e==null||(a=e.getAttribute)===null||a===void 0?void 0:a.call(e,"inert"),s=u===""||u==="true",n=s||t&&e&&r(e.parentNode);return n},$e=function(e){var t,a=e==null||(t=e.getAttribute)===null||t===void 0?void 0:t.call(e,"contenteditable");return a===""||a==="true"},Ee=function(e,t,a){if(Y(e))return[];var u=Array.prototype.slice.apply(e.querySelectorAll(W));return t&&x.call(e,W)&&u.unshift(e),u=u.filter(a),u},Se=function r(e,t,a){for(var u=[],s=Array.from(e);s.length;){var n=s.shift();if(!Y(n,!1))if(n.tagName==="SLOT"){var f=n.assignedElements(),l=f.length?f:n.children,v=r(l,!0,a);a.flatten?u.push.apply(u,v):u.push({scopeParent:n,candidates:v})}else{var y=x.call(n,W);y&&a.filter(n)&&(t||!e.includes(n))&&u.push(n);var b=n.shadowRoot||typeof a.getShadowRoot=="function"&&a.getShadowRoot(n),w=!Y(b,!1)&&(!a.shadowRootFilter||a.shadowRootFilter(n));if(b&&w){var E=r(b===!0?n.children:b.children,!0,a);a.flatten?u.push.apply(u,E):u.push({scopeParent:n,candidates:E})}else s.unshift.apply(s,n.children)}}return u},Pe=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},C=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||$e(e))&&!Pe(e)?0:e.tabIndex},Ue=function(e,t){var a=C(e);return a<0&&t&&!Pe(e)?0:a},qe=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},ke=function(e){return e.tagName==="INPUT"},Ge=function(e){return ke(e)&&e.type==="hidden"},Ve=function(e){var t=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(a){return a.tagName==="SUMMARY"});return t},We=function(e,t){for(var a=0;a<e.length;a++)if(e[a].checked&&e[a].form===t)return e[a]},Xe=function(e){if(!e.name)return!0;var t=e.form||X(e),a=function(f){return t.querySelectorAll('input[type="radio"][name="'+f+'"]')},u;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")u=a(window.CSS.escape(e.name));else try{u=a(e.name)}catch(n){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",n.message),!1}var s=We(u,e.form);return!s||s===e},Ye=function(e){return ke(e)&&e.type==="radio"},ze=function(e){return Ye(e)&&!Xe(e)},Ze=function(e){var t,a=e&&X(e),u=(t=a)===null||t===void 0?void 0:t.host,s=!1;if(a&&a!==e){var n,f,l;for(s=!!((n=u)!==null&&n!==void 0&&(f=n.ownerDocument)!==null&&f!==void 0&&f.contains(u)||e!=null&&(l=e.ownerDocument)!==null&&l!==void 0&&l.contains(e));!s&&u;){var v,y,b;a=X(u),u=(v=a)===null||v===void 0?void 0:v.host,s=!!((y=u)!==null&&y!==void 0&&(b=y.ownerDocument)!==null&&b!==void 0&&b.contains(u))}}return s},ve=function(e){var t=e.getBoundingClientRect(),a=t.width,u=t.height;return a===0&&u===0},He=function(e,t){var a=t.displayCheck,u=t.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var s=x.call(e,"details>summary:first-of-type"),n=s?e.parentElement:e;if(x.call(n,"details:not([open]) *"))return!0;if(!a||a==="full"||a==="legacy-full"){if(typeof u=="function"){for(var f=e;e;){var l=e.parentElement,v=X(e);if(l&&!l.shadowRoot&&u(l)===!0)return ve(e);e.assignedSlot?e=e.assignedSlot:!l&&v!==e.ownerDocument?e=v.host:e=l}e=f}if(Ze(e))return!e.getClientRects().length;if(a!=="legacy-full")return!0}else if(a==="non-zero-area")return ve(e);return!1},_e=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName==="FIELDSET"&&t.disabled){for(var a=0;a<t.children.length;a++){var u=t.children.item(a);if(u.tagName==="LEGEND")return x.call(t,"fieldset[disabled] *")?!0:!u.contains(e)}return!0}t=t.parentElement}return!1},z=function(e,t){return!(t.disabled||Y(t)||Ge(t)||He(t,e)||Ve(t)||_e(t))},ee=function(e,t){return!(ze(t)||C(t)<0||!z(e,t))},Je=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},Qe=function r(e){var t=[],a=[];return e.forEach(function(u,s){var n=!!u.scopeParent,f=n?u.scopeParent:u,l=Ue(f,n),v=n?r(u.candidates):f;l===0?n?t.push.apply(t,v):t.push(f):a.push({documentOrder:s,tabIndex:l,item:u,isScope:n,content:v})}),a.sort(qe).reduce(function(u,s){return s.isScope?u.push.apply(u,s.content):u.push(s.content),u},[]).concat(t)},et=function(e,t){t=t||{};var a;return t.getShadowRoot?a=Se([e],t.includeContainer,{filter:ee.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:Je}):a=Ee(e,t.includeContainer,ee.bind(null,t)),Qe(a)},tt=function(e,t){t=t||{};var a;return t.getShadowRoot?a=Se([e],t.includeContainer,{filter:z.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):a=Ee(e,t.includeContainer,z.bind(null,t)),a},L=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return x.call(e,W)===!1?!1:ee(t,e)},rt=Ne.concat("iframe").join(","),Q=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return x.call(e,rt)===!1?!1:z(t,e)};/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/function te(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function at(r){if(Array.isArray(r))return te(r)}function nt(r,e,t){return(e=ct(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function it(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function ot(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function be(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);e&&(a=a.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),t.push.apply(t,a)}return t}function pe(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?be(Object(t),!0).forEach(function(a){nt(r,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):be(Object(t)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))})}return r}function ut(r){return at(r)||it(r)||lt(r)||ot()}function st(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var a=t.call(r,e||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function ct(r){var e=st(r,"string");return typeof e=="symbol"?e:e+""}function lt(r,e){if(r){if(typeof r=="string")return te(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?te(r,e):void 0}}var he={activateTrap:function(e,t){if(e.length>0){var a=e[e.length-1];a!==t&&a.pause()}var u=e.indexOf(t);u===-1||e.splice(u,1),e.push(t)},deactivateTrap:function(e,t){var a=e.indexOf(t);a!==-1&&e.splice(a,1),e.length>0&&e[e.length-1].unpause()}},ft=function(e){return e.tagName&&e.tagName.toLowerCase()==="input"&&typeof e.select=="function"},dt=function(e){return(e==null?void 0:e.key)==="Escape"||(e==null?void 0:e.key)==="Esc"||(e==null?void 0:e.keyCode)===27},U=function(e){return(e==null?void 0:e.key)==="Tab"||(e==null?void 0:e.keyCode)===9},vt=function(e){return U(e)&&!e.shiftKey},bt=function(e){return U(e)&&e.shiftKey},me=function(e){return setTimeout(e,0)},$=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),u=1;u<t;u++)a[u-1]=arguments[u];return typeof e=="function"?e.apply(void 0,a):e},q=function(e){return e.target.shadowRoot&&typeof e.composedPath=="function"?e.composedPath()[0]:e.target},pt=[],ht=function(e,t){var a=(t==null?void 0:t.document)||document,u=(t==null?void 0:t.trapStack)||pt,s=pe({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0,isKeyForward:vt,isKeyBackward:bt},t),n={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0,recentNavEvent:void 0},f,l=function(i,o,c){return i&&i[o]!==void 0?i[o]:s[c||o]},v=function(i,o){var c=typeof(o==null?void 0:o.composedPath)=="function"?o.composedPath():void 0;return n.containerGroups.findIndex(function(p){var m=p.container,T=p.tabbableNodes;return m.contains(i)||(c==null?void 0:c.includes(m))||T.find(function(d){return d===i})})},y=function(i){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},c=o.hasFallback,p=c===void 0?!1:c,m=o.params,T=m===void 0?[]:m,d=s[i];if(typeof d=="function"&&(d=d.apply(void 0,ut(T))),d===!0&&(d=void 0),!d){if(d===void 0||d===!1)return d;throw new Error("`".concat(i,"` was specified but was not a node, or did not return a node"))}var N=d;if(typeof d=="string"){try{N=a.querySelector(d)}catch(F){throw new Error("`".concat(i,'` appears to be an invalid selector; error="').concat(F.message,'"'))}if(!N&&!p)throw new Error("`".concat(i,"` as selector refers to no known node"))}return N},b=function(){var i=y("initialFocus",{hasFallback:!0});if(i===!1)return!1;if(i===void 0||i&&!Q(i,s.tabbableOptions))if(v(a.activeElement)>=0)i=a.activeElement;else{var o=n.tabbableGroups[0],c=o&&o.firstTabbableNode;i=c||y("fallbackFocus")}else i===null&&(i=y("fallbackFocus"));if(!i)throw new Error("Your focus-trap needs to have at least one focusable element");return i},w=function(){if(n.containerGroups=n.containers.map(function(i){var o=et(i,s.tabbableOptions),c=tt(i,s.tabbableOptions),p=o.length>0?o[0]:void 0,m=o.length>0?o[o.length-1]:void 0,T=c.find(function(F){return L(F)}),d=c.slice().reverse().find(function(F){return L(F)}),N=!!o.find(function(F){return C(F)>0});return{container:i,tabbableNodes:o,focusableNodes:c,posTabIndexesFound:N,firstTabbableNode:p,lastTabbableNode:m,firstDomTabbableNode:T,lastDomTabbableNode:d,nextTabbableNode:function(O){var K=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,I=o.indexOf(O);return I<0?K?c.slice(c.indexOf(O)+1).find(function(j){return L(j)}):c.slice(0,c.indexOf(O)).reverse().find(function(j){return L(j)}):o[I+(K?1:-1)]}}}),n.tabbableGroups=n.containerGroups.filter(function(i){return i.tabbableNodes.length>0}),n.tabbableGroups.length<=0&&!y("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");if(n.containerGroups.find(function(i){return i.posTabIndexesFound})&&n.containerGroups.length>1)throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")},E=function(i){var o=i.activeElement;if(o)return o.shadowRoot&&o.shadowRoot.activeElement!==null?E(o.shadowRoot):o},h=function(i){if(i!==!1&&i!==E(document)){if(!i||!i.focus){h(b());return}i.focus({preventScroll:!!s.preventScroll}),n.mostRecentlyFocusedNode=i,ft(i)&&i.select()}},S=function(i){var o=y("setReturnFocus",{params:[i]});return o||(o===!1?!1:i)},D=function(i){var o=i.target,c=i.event,p=i.isBackward,m=p===void 0?!1:p;o=o||q(c),w();var T=null;if(n.tabbableGroups.length>0){var d=v(o,c),N=d>=0?n.containerGroups[d]:void 0;if(d<0)m?T=n.tabbableGroups[n.tabbableGroups.length-1].lastTabbableNode:T=n.tabbableGroups[0].firstTabbableNode;else if(m){var F=n.tabbableGroups.findIndex(function(H){var _=H.firstTabbableNode;return o===_});if(F<0&&(N.container===o||Q(o,s.tabbableOptions)&&!L(o,s.tabbableOptions)&&!N.nextTabbableNode(o,!1))&&(F=d),F>=0){var O=F===0?n.tabbableGroups.length-1:F-1,K=n.tabbableGroups[O];T=C(o)>=0?K.lastTabbableNode:K.lastDomTabbableNode}else U(c)||(T=N.nextTabbableNode(o,!1))}else{var I=n.tabbableGroups.findIndex(function(H){var _=H.lastTabbableNode;return o===_});if(I<0&&(N.container===o||Q(o,s.tabbableOptions)&&!L(o,s.tabbableOptions)&&!N.nextTabbableNode(o))&&(I=d),I>=0){var j=I===n.tabbableGroups.length-1?0:I+1,ue=n.tabbableGroups[j];T=C(o)>=0?ue.firstTabbableNode:ue.firstDomTabbableNode}else U(c)||(T=N.nextTabbableNode(o))}}else T=y("fallbackFocus");return T},P=function(i){var o=q(i);if(!(v(o,i)>=0)){if($(s.clickOutsideDeactivates,i)){f.deactivate({returnFocus:s.returnFocusOnDeactivate});return}$(s.allowOutsideClick,i)||i.preventDefault()}},k=function(i){var o=q(i),c=v(o,i)>=0;if(c||o instanceof Document)c&&(n.mostRecentlyFocusedNode=o);else{i.stopImmediatePropagation();var p,m=!0;if(n.mostRecentlyFocusedNode)if(C(n.mostRecentlyFocusedNode)>0){var T=v(n.mostRecentlyFocusedNode),d=n.containerGroups[T].tabbableNodes;if(d.length>0){var N=d.findIndex(function(F){return F===n.mostRecentlyFocusedNode});N>=0&&(s.isKeyForward(n.recentNavEvent)?N+1<d.length&&(p=d[N+1],m=!1):N-1>=0&&(p=d[N-1],m=!1))}}else n.containerGroups.some(function(F){return F.tabbableNodes.some(function(O){return C(O)>0})})||(m=!1);else m=!1;m&&(p=D({target:n.mostRecentlyFocusedNode,isBackward:s.isKeyBackward(n.recentNavEvent)})),h(p||n.mostRecentlyFocusedNode||b())}n.recentNavEvent=void 0},A=function(i){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;n.recentNavEvent=i;var c=D({event:i,isBackward:o});c&&(U(i)&&i.preventDefault(),h(c))},M=function(i){(s.isKeyForward(i)||s.isKeyBackward(i))&&A(i,s.isKeyBackward(i))},ae=function(i){dt(i)&&$(s.escapeDeactivates,i)!==!1&&(i.preventDefault(),f.deactivate())},ne=function(i){var o=q(i);v(o,i)>=0||$(s.clickOutsideDeactivates,i)||$(s.allowOutsideClick,i)||(i.preventDefault(),i.stopImmediatePropagation())},ie=function(){if(n.active)return he.activateTrap(u,f),n.delayInitialFocusTimer=s.delayInitialFocus?me(function(){h(b())}):h(b()),a.addEventListener("focusin",k,!0),a.addEventListener("mousedown",P,{capture:!0,passive:!1}),a.addEventListener("touchstart",P,{capture:!0,passive:!1}),a.addEventListener("click",ne,{capture:!0,passive:!1}),a.addEventListener("keydown",M,{capture:!0,passive:!1}),a.addEventListener("keydown",ae),f},oe=function(){if(n.active)return a.removeEventListener("focusin",k,!0),a.removeEventListener("mousedown",P,!0),a.removeEventListener("touchstart",P,!0),a.removeEventListener("click",ne,!0),a.removeEventListener("keydown",M,!0),a.removeEventListener("keydown",ae),f},Ae=function(i){var o=i.some(function(c){var p=Array.from(c.removedNodes);return p.some(function(m){return m===n.mostRecentlyFocusedNode})});o&&h(b())},Z=typeof window<"u"&&"MutationObserver"in window?new MutationObserver(Ae):void 0,B=function(){Z&&(Z.disconnect(),n.active&&!n.paused&&n.containers.map(function(i){Z.observe(i,{subtree:!0,childList:!0})}))};return f={get active(){return n.active},get paused(){return n.paused},activate:function(i){if(n.active)return this;var o=l(i,"onActivate"),c=l(i,"onPostActivate"),p=l(i,"checkCanFocusTrap");p||w(),n.active=!0,n.paused=!1,n.nodeFocusedBeforeActivation=a.activeElement,o==null||o();var m=function(){p&&w(),ie(),B(),c==null||c()};return p?(p(n.containers.concat()).then(m,m),this):(m(),this)},deactivate:function(i){if(!n.active)return this;var o=pe({onDeactivate:s.onDeactivate,onPostDeactivate:s.onPostDeactivate,checkCanReturnFocus:s.checkCanReturnFocus},i);clearTimeout(n.delayInitialFocusTimer),n.delayInitialFocusTimer=void 0,oe(),n.active=!1,n.paused=!1,B(),he.deactivateTrap(u,f);var c=l(o,"onDeactivate"),p=l(o,"onPostDeactivate"),m=l(o,"checkCanReturnFocus"),T=l(o,"returnFocus","returnFocusOnDeactivate");c==null||c();var d=function(){me(function(){T&&h(S(n.nodeFocusedBeforeActivation)),p==null||p()})};return T&&m?(m(S(n.nodeFocusedBeforeActivation)).then(d,d),this):(d(),this)},pause:function(i){if(n.paused||!n.active)return this;var o=l(i,"onPause"),c=l(i,"onPostPause");return n.paused=!0,o==null||o(),oe(),B(),c==null||c(),this},unpause:function(i){if(!n.paused||!n.active)return this;var o=l(i,"onUnpause"),c=l(i,"onPostUnpause");return n.paused=!1,o==null||o(),w(),ie(),B(),c==null||c(),this},updateContainerElements:function(i){var o=[].concat(i).filter(Boolean);return n.containers=o.map(function(c){return typeof c=="string"?a.querySelector(c):c}),n.active&&w(),B(),this}},f.updateContainerElements(e),f};function St(r={}){let e;const{immediate:t,...a}=r,u=fe(!1),s=fe(!1),n=b=>e==null?void 0:e.activate(b),f=b=>{e==null||e.deactivate(b)},l=()=>{e&&(e.pause(),s.set(!0))},v=()=>{e&&(e.unpause(),s.set(!1))};return{useFocusTrap:b=>(e=ht(b,{...a,onActivate(){var w;u.set(!0),(w=r.onActivate)==null||w.call(r)},onDeactivate(){var w;u.set(!1),(w=r.onDeactivate)==null||w.call(r)}}),t&&n(),{destroy(){f(),e=void 0}}),hasFocus:le(u),isPaused:le(s),activate:n,deactivate:f,pause:l,unpause:v}}const G=[],Pt=(r,e)=>{let t=V;function a(){const s=G.indexOf(r);s>=0&&G.splice(s,1)}function u(s){t();const{open:n,onClose:f,shouldCloseOnInteractOutside:l,closeOnInteractOutside:v}=s;ge(100).then(()=>{n?G.push(r):a()});function y(){return Re(G)===r}function b(){y()&&f&&(f(),a())}function w(h){const S=h.target;re(S)&&S&&y()&&(h.preventDefault(),h.stopPropagation(),h.stopImmediatePropagation())}function E(h){l!=null&&l(h)&&y()&&(h.preventDefault(),h.stopPropagation(),h.stopImmediatePropagation(),b())}t=mt(r,{onInteractOutsideStart:w,onInteractOutside:v?E:void 0,enabled:n}).destroy}return u(e),{update:u,destroy(){a(),t()}}},mt=(r,e)=>{let t=V,a=V,u=!1,s=!1,n=!1;function f(y){t(),a();const{onInteractOutside:b,onInteractOutsideStart:w,enabled:E}=y;if(!E)return;function h(P){b&&ye(P,r)&&(w==null||w(P));const k=P.target;re(k)&&De(r,k)&&(s=!0),u=!0}function S(P){b==null||b(P)}const D=yt(r);if(typeof PointerEvent<"u"){const P=k=>{a();const A=M=>{l(M)&&S(M),v()};if(k.pointerType==="touch"){a=R(D,"click",A,{capture:!0,once:!0});return}A(k)};t=ce(R(D,"pointerdown",h,!0),R(D,"pointerup",P,!0))}else{const P=A=>{n?n=!1:l(A)&&S(A),v()},k=A=>{n=!0,l(A)&&S(A),v()};t=ce(R(D,"mousedown",h,!0),R(D,"mouseup",P,!0),R(D,"touchstart",h,!0),R(D,"touchend",k,!0))}}function l(y){return!!(u&&!s&&ye(y,r))}function v(){u=!1,s=!1}return f(e),{update:f,destroy(){t(),a()}}};function ye(r,e){if("button"in r&&r.button>0)return!1;const t=r.target;if(!re(t))return!1;const a=t.ownerDocument;return!a||!a.documentElement.contains(t)?!1:e&&!De(e,t)}function De(r,e){return r===e||r.contains(e)}function yt(r){return(r==null?void 0:r.ownerDocument)??document}export{St as c,Et as h,Ft as r,ge as s,Pt as u,Nt as w};
