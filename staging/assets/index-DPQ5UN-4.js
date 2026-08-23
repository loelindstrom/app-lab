(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var wl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function dp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Tw={exports:{}},_u={},Rw={exports:{}},ue={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qs=Symbol.for("react.element"),P0=Symbol.for("react.portal"),D0=Symbol.for("react.fragment"),O0=Symbol.for("react.strict_mode"),L0=Symbol.for("react.profiler"),M0=Symbol.for("react.provider"),j0=Symbol.for("react.context"),F0=Symbol.for("react.forward_ref"),U0=Symbol.for("react.suspense"),z0=Symbol.for("react.memo"),B0=Symbol.for("react.lazy"),jm=Symbol.iterator;function V0(e){return e===null||typeof e!="object"?null:(e=jm&&e[jm]||e["@@iterator"],typeof e=="function"?e:null)}var Nw={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pw=Object.assign,Dw={};function vo(e,t,n){this.props=e,this.context=t,this.refs=Dw,this.updater=n||Nw}vo.prototype.isReactComponent={};vo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};vo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ow(){}Ow.prototype=vo.prototype;function fp(e,t,n){this.props=e,this.context=t,this.refs=Dw,this.updater=n||Nw}var pp=fp.prototype=new Ow;pp.constructor=fp;Pw(pp,vo.prototype);pp.isPureReactComponent=!0;var Fm=Array.isArray,Lw=Object.prototype.hasOwnProperty,hp={current:null},Mw={key:!0,ref:!0,__self:!0,__source:!0};function jw(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)Lw.call(t,r)&&!Mw.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:qs,type:e,key:o,ref:s,props:i,_owner:hp.current}}function $0(e,t){return{$$typeof:qs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function mp(e){return typeof e=="object"&&e!==null&&e.$$typeof===qs}function H0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Um=/\/+/g;function lc(e,t){return typeof e=="object"&&e!==null&&e.key!=null?H0(""+e.key):t.toString(36)}function Ja(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case qs:case P0:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+lc(s,0):r,Fm(i)?(n="",e!=null&&(n=e.replace(Um,"$&/")+"/"),Ja(i,t,n,"",function(u){return u})):i!=null&&(mp(i)&&(i=$0(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(Um,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",Fm(e))for(var a=0;a<e.length;a++){o=e[a];var l=r+lc(o,a);s+=Ja(o,t,n,l,i)}else if(l=V0(e),typeof l=="function")for(e=l.call(e),a=0;!(o=e.next()).done;)o=o.value,l=r+lc(o,a++),s+=Ja(o,t,n,l,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function _a(e,t,n){if(e==null)return e;var r=[],i=0;return Ja(e,r,"","",function(o){return t.call(n,o,i++)}),r}function W0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Tt={current:null},Xa={transition:null},q0={ReactCurrentDispatcher:Tt,ReactCurrentBatchConfig:Xa,ReactCurrentOwner:hp};function Fw(){throw Error("act(...) is not supported in production builds of React.")}ue.Children={map:_a,forEach:function(e,t,n){_a(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return _a(e,function(){t++}),t},toArray:function(e){return _a(e,function(t){return t})||[]},only:function(e){if(!mp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ue.Component=vo;ue.Fragment=D0;ue.Profiler=L0;ue.PureComponent=fp;ue.StrictMode=O0;ue.Suspense=U0;ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q0;ue.act=Fw;ue.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Pw({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=hp.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)Lw.call(t,l)&&!Mw.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:qs,type:e.type,key:i,ref:o,props:r,_owner:s}};ue.createContext=function(e){return e={$$typeof:j0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:M0,_context:e},e.Consumer=e};ue.createElement=jw;ue.createFactory=function(e){var t=jw.bind(null,e);return t.type=e,t};ue.createRef=function(){return{current:null}};ue.forwardRef=function(e){return{$$typeof:F0,render:e}};ue.isValidElement=mp;ue.lazy=function(e){return{$$typeof:B0,_payload:{_status:-1,_result:e},_init:W0}};ue.memo=function(e,t){return{$$typeof:z0,type:e,compare:t===void 0?null:t}};ue.startTransition=function(e){var t=Xa.transition;Xa.transition={};try{e()}finally{Xa.transition=t}};ue.unstable_act=Fw;ue.useCallback=function(e,t){return Tt.current.useCallback(e,t)};ue.useContext=function(e){return Tt.current.useContext(e)};ue.useDebugValue=function(){};ue.useDeferredValue=function(e){return Tt.current.useDeferredValue(e)};ue.useEffect=function(e,t){return Tt.current.useEffect(e,t)};ue.useId=function(){return Tt.current.useId()};ue.useImperativeHandle=function(e,t,n){return Tt.current.useImperativeHandle(e,t,n)};ue.useInsertionEffect=function(e,t){return Tt.current.useInsertionEffect(e,t)};ue.useLayoutEffect=function(e,t){return Tt.current.useLayoutEffect(e,t)};ue.useMemo=function(e,t){return Tt.current.useMemo(e,t)};ue.useReducer=function(e,t,n){return Tt.current.useReducer(e,t,n)};ue.useRef=function(e){return Tt.current.useRef(e)};ue.useState=function(e){return Tt.current.useState(e)};ue.useSyncExternalStore=function(e,t,n){return Tt.current.useSyncExternalStore(e,t,n)};ue.useTransition=function(){return Tt.current.useTransition()};ue.version="18.3.1";Rw.exports=ue;var P=Rw.exports;const K0=dp(P);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G0=P,Y0=Symbol.for("react.element"),Q0=Symbol.for("react.fragment"),J0=Object.prototype.hasOwnProperty,X0=G0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Z0={key:!0,ref:!0,__self:!0,__source:!0};function Uw(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)J0.call(t,r)&&!Z0.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Y0,type:e,key:o,ref:s,props:i,_owner:X0.current}}_u.Fragment=Q0;_u.jsx=Uw;_u.jsxs=Uw;Tw.exports=_u;var h=Tw.exports,Id={},zw={exports:{}},Yt={},Bw={exports:{}},Vw={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(B,q){var x=B.length;B.push(q);e:for(;0<x;){var re=x-1>>>1,ce=B[re];if(0<i(ce,q))B[re]=q,B[x]=ce,x=re;else break e}}function n(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var q=B[0],x=B.pop();if(x!==q){B[0]=x;e:for(var re=0,ce=B.length,I=ce>>>1;re<I;){var ke=2*(re+1)-1,Me=B[ke],de=ke+1,Ue=B[de];if(0>i(Me,x))de<ce&&0>i(Ue,Me)?(B[re]=Ue,B[de]=x,re=de):(B[re]=Me,B[ke]=x,re=ke);else if(de<ce&&0>i(Ue,x))B[re]=Ue,B[de]=x,re=de;else break e}}return q}function i(B,q){var x=B.sortIndex-q.sortIndex;return x!==0?x:B.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var l=[],u=[],d=1,c=null,f=3,p=!1,m=!1,w=!1,C=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(B){for(var q=n(u);q!==null;){if(q.callback===null)r(u);else if(q.startTime<=B)r(u),q.sortIndex=q.expirationTime,t(l,q);else break;q=n(u)}}function k(B){if(w=!1,g(B),!m)if(n(l)!==null)m=!0,ve(S);else{var q=n(u);q!==null&&xe(k,q.startTime-B)}}function S(B,q){m=!1,w&&(w=!1,y(R),R=-1),p=!0;var x=f;try{for(g(q),c=n(l);c!==null&&(!(c.expirationTime>q)||B&&!D());){var re=c.callback;if(typeof re=="function"){c.callback=null,f=c.priorityLevel;var ce=re(c.expirationTime<=q);q=e.unstable_now(),typeof ce=="function"?c.callback=ce:c===n(l)&&r(l),g(q)}else r(l);c=n(l)}if(c!==null)var I=!0;else{var ke=n(u);ke!==null&&xe(k,ke.startTime-q),I=!1}return I}finally{c=null,f=x,p=!1}}var _=!1,A=null,R=-1,O=5,E=-1;function D(){return!(e.unstable_now()-E<O)}function z(){if(A!==null){var B=e.unstable_now();E=B;var q=!0;try{q=A(!0,B)}finally{q?K():(_=!1,A=null)}}else _=!1}var K;if(typeof v=="function")K=function(){v(z)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,te=Z.port2;Z.port1.onmessage=z,K=function(){te.postMessage(null)}}else K=function(){C(z,0)};function ve(B){A=B,_||(_=!0,K())}function xe(B,q){R=C(function(){B(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(B){B.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,ve(S))},e.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<B?Math.floor(1e3/B):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(B){switch(f){case 1:case 2:case 3:var q=3;break;default:q=f}var x=f;f=q;try{return B()}finally{f=x}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(B,q){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var x=f;f=B;try{return q()}finally{f=x}},e.unstable_scheduleCallback=function(B,q,x){var re=e.unstable_now();switch(typeof x=="object"&&x!==null?(x=x.delay,x=typeof x=="number"&&0<x?re+x:re):x=re,B){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=x+ce,B={id:d++,callback:q,priorityLevel:B,startTime:x,expirationTime:ce,sortIndex:-1},x>re?(B.sortIndex=x,t(u,B),n(l)===null&&B===n(u)&&(w?(y(R),R=-1):w=!0,xe(k,x-re))):(B.sortIndex=ce,t(l,B),m||p||(m=!0,ve(S))),B},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(B){var q=f;return function(){var x=f;f=q;try{return B.apply(this,arguments)}finally{f=x}}}})(Vw);Bw.exports=Vw;var eI=Bw.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tI=P,Gt=eI;function F(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var $w=new Set,ms={};function Si(e,t){io(e,t),io(e+"Capture",t)}function io(e,t){for(ms[e]=t,e=0;e<t.length;e++)$w.add(t[e])}var Qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ed=Object.prototype.hasOwnProperty,nI=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zm={},Bm={};function rI(e){return Ed.call(Bm,e)?!0:Ed.call(zm,e)?!1:nI.test(e)?Bm[e]=!0:(zm[e]=!0,!1)}function iI(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function oI(e,t,n,r){if(t===null||typeof t>"u"||iI(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Rt(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var ht={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ht[e]=new Rt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ht[t]=new Rt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ht[e]=new Rt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ht[e]=new Rt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ht[e]=new Rt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ht[e]=new Rt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ht[e]=new Rt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ht[e]=new Rt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ht[e]=new Rt(e,5,!1,e.toLowerCase(),null,!1,!1)});var gp=/[\-:]([a-z])/g;function yp(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(gp,yp);ht[t]=new Rt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(gp,yp);ht[t]=new Rt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(gp,yp);ht[t]=new Rt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ht[e]=new Rt(e,1,!1,e.toLowerCase(),null,!1,!1)});ht.xlinkHref=new Rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ht[e]=new Rt(e,1,!1,e.toLowerCase(),null,!0,!0)});function vp(e,t,n,r){var i=ht.hasOwnProperty(t)?ht[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(oI(t,n,i,r)&&(n=null),r||i===null?rI(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ir=tI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ba=Symbol.for("react.element"),Di=Symbol.for("react.portal"),Oi=Symbol.for("react.fragment"),wp=Symbol.for("react.strict_mode"),Cd=Symbol.for("react.profiler"),Hw=Symbol.for("react.provider"),Ww=Symbol.for("react.context"),_p=Symbol.for("react.forward_ref"),Ad=Symbol.for("react.suspense"),Td=Symbol.for("react.suspense_list"),bp=Symbol.for("react.memo"),dr=Symbol.for("react.lazy"),qw=Symbol.for("react.offscreen"),Vm=Symbol.iterator;function To(e){return e===null||typeof e!="object"?null:(e=Vm&&e[Vm]||e["@@iterator"],typeof e=="function"?e:null)}var $e=Object.assign,uc;function Ko(e){if(uc===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);uc=t&&t[1]||""}return`
`+uc+e}var cc=!1;function dc(e,t){if(!e||cc)return"";cc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==o[a]){var l=`
`+i[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=s&&0<=a);break}}}finally{cc=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ko(e):""}function sI(e){switch(e.tag){case 5:return Ko(e.type);case 16:return Ko("Lazy");case 13:return Ko("Suspense");case 19:return Ko("SuspenseList");case 0:case 2:case 15:return e=dc(e.type,!1),e;case 11:return e=dc(e.type.render,!1),e;case 1:return e=dc(e.type,!0),e;default:return""}}function Rd(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Oi:return"Fragment";case Di:return"Portal";case Cd:return"Profiler";case wp:return"StrictMode";case Ad:return"Suspense";case Td:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ww:return(e.displayName||"Context")+".Consumer";case Hw:return(e._context.displayName||"Context")+".Provider";case _p:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case bp:return t=e.displayName||null,t!==null?t:Rd(e.type)||"Memo";case dr:t=e._payload,e=e._init;try{return Rd(e(t))}catch{}}return null}function aI(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Rd(t);case 8:return t===wp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Lr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Kw(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function lI(e){var t=Kw(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function xa(e){e._valueTracker||(e._valueTracker=lI(e))}function Gw(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Kw(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function _l(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Nd(e,t){var n=t.checked;return $e({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function $m(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Lr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Yw(e,t){t=t.checked,t!=null&&vp(e,"checked",t,!1)}function Pd(e,t){Yw(e,t);var n=Lr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Dd(e,t.type,n):t.hasOwnProperty("defaultValue")&&Dd(e,t.type,Lr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Hm(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Dd(e,t,n){(t!=="number"||_l(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Go=Array.isArray;function Ki(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Lr(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Od(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(F(91));return $e({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wm(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(F(92));if(Go(n)){if(1<n.length)throw Error(F(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Lr(n)}}function Qw(e,t){var n=Lr(t.value),r=Lr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function qm(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Jw(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ld(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Jw(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ka,Xw=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ka=ka||document.createElement("div"),ka.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ka.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function gs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},uI=["Webkit","ms","Moz","O"];Object.keys(Jo).forEach(function(e){uI.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jo[t]=Jo[e]})});function Zw(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Jo.hasOwnProperty(e)&&Jo[e]?(""+t).trim():t+"px"}function e_(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Zw(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var cI=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Md(e,t){if(t){if(cI[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(F(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(F(61))}if(t.style!=null&&typeof t.style!="object")throw Error(F(62))}}function jd(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fd=null;function xp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ud=null,Gi=null,Yi=null;function Km(e){if(e=Ys(e)){if(typeof Ud!="function")throw Error(F(280));var t=e.stateNode;t&&(t=Iu(t),Ud(e.stateNode,e.type,t))}}function t_(e){Gi?Yi?Yi.push(e):Yi=[e]:Gi=e}function n_(){if(Gi){var e=Gi,t=Yi;if(Yi=Gi=null,Km(e),t)for(e=0;e<t.length;e++)Km(t[e])}}function r_(e,t){return e(t)}function i_(){}var fc=!1;function o_(e,t,n){if(fc)return e(t,n);fc=!0;try{return r_(e,t,n)}finally{fc=!1,(Gi!==null||Yi!==null)&&(i_(),n_())}}function ys(e,t){var n=e.stateNode;if(n===null)return null;var r=Iu(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(F(231,t,typeof n));return n}var zd=!1;if(Qn)try{var Ro={};Object.defineProperty(Ro,"passive",{get:function(){zd=!0}}),window.addEventListener("test",Ro,Ro),window.removeEventListener("test",Ro,Ro)}catch{zd=!1}function dI(e,t,n,r,i,o,s,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Xo=!1,bl=null,xl=!1,Bd=null,fI={onError:function(e){Xo=!0,bl=e}};function pI(e,t,n,r,i,o,s,a,l){Xo=!1,bl=null,dI.apply(fI,arguments)}function hI(e,t,n,r,i,o,s,a,l){if(pI.apply(this,arguments),Xo){if(Xo){var u=bl;Xo=!1,bl=null}else throw Error(F(198));xl||(xl=!0,Bd=u)}}function Ii(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Gm(e){if(Ii(e)!==e)throw Error(F(188))}function mI(e){var t=e.alternate;if(!t){if(t=Ii(e),t===null)throw Error(F(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Gm(i),e;if(o===r)return Gm(i),t;o=o.sibling}throw Error(F(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?e:t}function a_(e){return e=mI(e),e!==null?l_(e):null}function l_(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=l_(e);if(t!==null)return t;e=e.sibling}return null}var u_=Gt.unstable_scheduleCallback,Ym=Gt.unstable_cancelCallback,gI=Gt.unstable_shouldYield,yI=Gt.unstable_requestPaint,qe=Gt.unstable_now,vI=Gt.unstable_getCurrentPriorityLevel,kp=Gt.unstable_ImmediatePriority,c_=Gt.unstable_UserBlockingPriority,kl=Gt.unstable_NormalPriority,wI=Gt.unstable_LowPriority,d_=Gt.unstable_IdlePriority,bu=null,Pn=null;function _I(e){if(Pn&&typeof Pn.onCommitFiberRoot=="function")try{Pn.onCommitFiberRoot(bu,e,void 0,(e.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:kI,bI=Math.log,xI=Math.LN2;function kI(e){return e>>>=0,e===0?32:31-(bI(e)/xI|0)|0}var Sa=64,Ia=4194304;function Yo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Sl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~i;a!==0?r=Yo(a):(o&=s,o!==0&&(r=Yo(o)))}else s=n&~i,s!==0?r=Yo(s):o!==0&&(r=Yo(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-yn(t),i=1<<n,r|=e[n],t&=~i;return r}function SI(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function II(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-yn(o),a=1<<s,l=i[s];l===-1?(!(a&n)||a&r)&&(i[s]=SI(a,t)):l<=t&&(e.expiredLanes|=a),o&=~a}}function Vd(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function f_(){var e=Sa;return Sa<<=1,!(Sa&4194240)&&(Sa=64),e}function pc(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ks(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-yn(t),e[t]=n}function EI(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-yn(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function Sp(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-yn(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var be=0;function p_(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var h_,Ip,m_,g_,y_,$d=!1,Ea=[],br=null,xr=null,kr=null,vs=new Map,ws=new Map,pr=[],CI="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Qm(e,t){switch(e){case"focusin":case"focusout":br=null;break;case"dragenter":case"dragleave":xr=null;break;case"mouseover":case"mouseout":kr=null;break;case"pointerover":case"pointerout":vs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ws.delete(t.pointerId)}}function No(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Ys(t),t!==null&&Ip(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function AI(e,t,n,r,i){switch(t){case"focusin":return br=No(br,e,t,n,r,i),!0;case"dragenter":return xr=No(xr,e,t,n,r,i),!0;case"mouseover":return kr=No(kr,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return vs.set(o,No(vs.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,ws.set(o,No(ws.get(o)||null,e,t,n,r,i)),!0}return!1}function v_(e){var t=ti(e.target);if(t!==null){var n=Ii(t);if(n!==null){if(t=n.tag,t===13){if(t=s_(n),t!==null){e.blockedOn=t,y_(e.priority,function(){m_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Za(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Hd(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Fd=r,n.target.dispatchEvent(r),Fd=null}else return t=Ys(n),t!==null&&Ip(t),e.blockedOn=n,!1;t.shift()}return!0}function Jm(e,t,n){Za(e)&&n.delete(t)}function TI(){$d=!1,br!==null&&Za(br)&&(br=null),xr!==null&&Za(xr)&&(xr=null),kr!==null&&Za(kr)&&(kr=null),vs.forEach(Jm),ws.forEach(Jm)}function Po(e,t){e.blockedOn===t&&(e.blockedOn=null,$d||($d=!0,Gt.unstable_scheduleCallback(Gt.unstable_NormalPriority,TI)))}function _s(e){function t(i){return Po(i,e)}if(0<Ea.length){Po(Ea[0],e);for(var n=1;n<Ea.length;n++){var r=Ea[n];r.blockedOn===e&&(r.blockedOn=null)}}for(br!==null&&Po(br,e),xr!==null&&Po(xr,e),kr!==null&&Po(kr,e),vs.forEach(t),ws.forEach(t),n=0;n<pr.length;n++)r=pr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<pr.length&&(n=pr[0],n.blockedOn===null);)v_(n),n.blockedOn===null&&pr.shift()}var Qi=ir.ReactCurrentBatchConfig,Il=!0;function RI(e,t,n,r){var i=be,o=Qi.transition;Qi.transition=null;try{be=1,Ep(e,t,n,r)}finally{be=i,Qi.transition=o}}function NI(e,t,n,r){var i=be,o=Qi.transition;Qi.transition=null;try{be=4,Ep(e,t,n,r)}finally{be=i,Qi.transition=o}}function Ep(e,t,n,r){if(Il){var i=Hd(e,t,n,r);if(i===null)kc(e,t,r,El,n),Qm(e,r);else if(AI(i,e,t,n,r))r.stopPropagation();else if(Qm(e,r),t&4&&-1<CI.indexOf(e)){for(;i!==null;){var o=Ys(i);if(o!==null&&h_(o),o=Hd(e,t,n,r),o===null&&kc(e,t,r,El,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else kc(e,t,r,null,n)}}var El=null;function Hd(e,t,n,r){if(El=null,e=xp(r),e=ti(e),e!==null)if(t=Ii(e),t===null)e=null;else if(n=t.tag,n===13){if(e=s_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return El=e,null}function w_(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vI()){case kp:return 1;case c_:return 4;case kl:case wI:return 16;case d_:return 536870912;default:return 16}default:return 16}}var wr=null,Cp=null,el=null;function __(){if(el)return el;var e,t=Cp,n=t.length,r,i="value"in wr?wr.value:wr.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return el=i.slice(e,1<r?1-r:void 0)}function tl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ca(){return!0}function Xm(){return!1}function Qt(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ca:Xm,this.isPropagationStopped=Xm,this}return $e(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ca)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ca)},persist:function(){},isPersistent:Ca}),t}var wo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ap=Qt(wo),Gs=$e({},wo,{view:0,detail:0}),PI=Qt(Gs),hc,mc,Do,xu=$e({},Gs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Do&&(Do&&e.type==="mousemove"?(hc=e.screenX-Do.screenX,mc=e.screenY-Do.screenY):mc=hc=0,Do=e),hc)},movementY:function(e){return"movementY"in e?e.movementY:mc}}),Zm=Qt(xu),DI=$e({},xu,{dataTransfer:0}),OI=Qt(DI),LI=$e({},Gs,{relatedTarget:0}),gc=Qt(LI),MI=$e({},wo,{animationName:0,elapsedTime:0,pseudoElement:0}),jI=Qt(MI),FI=$e({},wo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),UI=Qt(FI),zI=$e({},wo,{data:0}),eg=Qt(zI),BI={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},VI={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$I={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function HI(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$I[e])?!!t[e]:!1}function Tp(){return HI}var WI=$e({},Gs,{key:function(e){if(e.key){var t=BI[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=tl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?VI[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tp,charCode:function(e){return e.type==="keypress"?tl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?tl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qI=Qt(WI),KI=$e({},xu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tg=Qt(KI),GI=$e({},Gs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tp}),YI=Qt(GI),QI=$e({},wo,{propertyName:0,elapsedTime:0,pseudoElement:0}),JI=Qt(QI),XI=$e({},xu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ZI=Qt(XI),eE=[9,13,27,32],Rp=Qn&&"CompositionEvent"in window,Zo=null;Qn&&"documentMode"in document&&(Zo=document.documentMode);var tE=Qn&&"TextEvent"in window&&!Zo,b_=Qn&&(!Rp||Zo&&8<Zo&&11>=Zo),ng=" ",rg=!1;function x_(e,t){switch(e){case"keyup":return eE.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function k_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Li=!1;function nE(e,t){switch(e){case"compositionend":return k_(t);case"keypress":return t.which!==32?null:(rg=!0,ng);case"textInput":return e=t.data,e===ng&&rg?null:e;default:return null}}function rE(e,t){if(Li)return e==="compositionend"||!Rp&&x_(e,t)?(e=__(),el=Cp=wr=null,Li=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return b_&&t.locale!=="ko"?null:t.data;default:return null}}var iE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ig(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!iE[e.type]:t==="textarea"}function S_(e,t,n,r){t_(r),t=Cl(t,"onChange"),0<t.length&&(n=new Ap("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var es=null,bs=null;function oE(e){L_(e,0)}function ku(e){var t=Fi(e);if(Gw(t))return e}function sE(e,t){if(e==="change")return t}var I_=!1;if(Qn){var yc;if(Qn){var vc="oninput"in document;if(!vc){var og=document.createElement("div");og.setAttribute("oninput","return;"),vc=typeof og.oninput=="function"}yc=vc}else yc=!1;I_=yc&&(!document.documentMode||9<document.documentMode)}function sg(){es&&(es.detachEvent("onpropertychange",E_),bs=es=null)}function E_(e){if(e.propertyName==="value"&&ku(bs)){var t=[];S_(t,bs,e,xp(e)),o_(oE,t)}}function aE(e,t,n){e==="focusin"?(sg(),es=t,bs=n,es.attachEvent("onpropertychange",E_)):e==="focusout"&&sg()}function lE(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ku(bs)}function uE(e,t){if(e==="click")return ku(t)}function cE(e,t){if(e==="input"||e==="change")return ku(t)}function dE(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var bn=typeof Object.is=="function"?Object.is:dE;function xs(e,t){if(bn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ed.call(t,i)||!bn(e[i],t[i]))return!1}return!0}function ag(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function lg(e,t){var n=ag(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ag(n)}}function C_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?C_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function A_(){for(var e=window,t=_l();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=_l(e.document)}return t}function Np(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function fE(e){var t=A_(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&C_(n.ownerDocument.documentElement,n)){if(r!==null&&Np(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=lg(n,o);var s=lg(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var pE=Qn&&"documentMode"in document&&11>=document.documentMode,Mi=null,Wd=null,ts=null,qd=!1;function ug(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;qd||Mi==null||Mi!==_l(r)||(r=Mi,"selectionStart"in r&&Np(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ts&&xs(ts,r)||(ts=r,r=Cl(Wd,"onSelect"),0<r.length&&(t=new Ap("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Mi)))}function Aa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ji={animationend:Aa("Animation","AnimationEnd"),animationiteration:Aa("Animation","AnimationIteration"),animationstart:Aa("Animation","AnimationStart"),transitionend:Aa("Transition","TransitionEnd")},wc={},T_={};Qn&&(T_=document.createElement("div").style,"AnimationEvent"in window||(delete ji.animationend.animation,delete ji.animationiteration.animation,delete ji.animationstart.animation),"TransitionEvent"in window||delete ji.transitionend.transition);function Su(e){if(wc[e])return wc[e];if(!ji[e])return e;var t=ji[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in T_)return wc[e]=t[n];return e}var R_=Su("animationend"),N_=Su("animationiteration"),P_=Su("animationstart"),D_=Su("transitionend"),O_=new Map,cg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Br(e,t){O_.set(e,t),Si(t,[e])}for(var _c=0;_c<cg.length;_c++){var bc=cg[_c],hE=bc.toLowerCase(),mE=bc[0].toUpperCase()+bc.slice(1);Br(hE,"on"+mE)}Br(R_,"onAnimationEnd");Br(N_,"onAnimationIteration");Br(P_,"onAnimationStart");Br("dblclick","onDoubleClick");Br("focusin","onFocus");Br("focusout","onBlur");Br(D_,"onTransitionEnd");io("onMouseEnter",["mouseout","mouseover"]);io("onMouseLeave",["mouseout","mouseover"]);io("onPointerEnter",["pointerout","pointerover"]);io("onPointerLeave",["pointerout","pointerover"]);Si("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Si("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Si("onBeforeInput",["compositionend","keypress","textInput","paste"]);Si("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Si("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Si("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gE=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qo));function dg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,hI(r,t,void 0,e),e.currentTarget=null}function L_(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;dg(i,a,u),o=l}else for(s=0;s<r.length;s++){if(a=r[s],l=a.instance,u=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;dg(i,a,u),o=l}}}if(xl)throw e=Bd,xl=!1,Bd=null,e}function De(e,t){var n=t[Jd];n===void 0&&(n=t[Jd]=new Set);var r=e+"__bubble";n.has(r)||(M_(t,e,2,!1),n.add(r))}function xc(e,t,n){var r=0;t&&(r|=4),M_(n,e,r,t)}var Ta="_reactListening"+Math.random().toString(36).slice(2);function ks(e){if(!e[Ta]){e[Ta]=!0,$w.forEach(function(n){n!=="selectionchange"&&(gE.has(n)||xc(n,!1,e),xc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ta]||(t[Ta]=!0,xc("selectionchange",!1,t))}}function M_(e,t,n,r){switch(w_(t)){case 1:var i=RI;break;case 4:i=NI;break;default:i=Ep}n=i.bind(null,t,n,e),i=void 0,!zd||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function kc(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;s=s.return}for(;a!==null;){if(s=ti(a),s===null)return;if(l=s.tag,l===5||l===6){r=o=s;continue e}a=a.parentNode}}r=r.return}o_(function(){var u=o,d=xp(n),c=[];e:{var f=O_.get(e);if(f!==void 0){var p=Ap,m=e;switch(e){case"keypress":if(tl(n)===0)break e;case"keydown":case"keyup":p=qI;break;case"focusin":m="focus",p=gc;break;case"focusout":m="blur",p=gc;break;case"beforeblur":case"afterblur":p=gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=OI;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=YI;break;case R_:case N_:case P_:p=jI;break;case D_:p=JI;break;case"scroll":p=PI;break;case"wheel":p=ZI;break;case"copy":case"cut":case"paste":p=UI;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=tg}var w=(t&4)!==0,C=!w&&e==="scroll",y=w?f!==null?f+"Capture":null:f;w=[];for(var v=u,g;v!==null;){g=v;var k=g.stateNode;if(g.tag===5&&k!==null&&(g=k,y!==null&&(k=ys(v,y),k!=null&&w.push(Ss(v,k,g)))),C)break;v=v.return}0<w.length&&(f=new p(f,m,null,n,d),c.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==Fd&&(m=n.relatedTarget||n.fromElement)&&(ti(m)||m[Jn]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=u,m=m?ti(m):null,m!==null&&(C=Ii(m),m!==C||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=u),p!==m)){if(w=Zm,k="onMouseLeave",y="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(w=tg,k="onPointerLeave",y="onPointerEnter",v="pointer"),C=p==null?f:Fi(p),g=m==null?f:Fi(m),f=new w(k,v+"leave",p,n,d),f.target=C,f.relatedTarget=g,k=null,ti(d)===u&&(w=new w(y,v+"enter",m,n,d),w.target=g,w.relatedTarget=C,k=w),C=k,p&&m)t:{for(w=p,y=m,v=0,g=w;g;g=Ti(g))v++;for(g=0,k=y;k;k=Ti(k))g++;for(;0<v-g;)w=Ti(w),v--;for(;0<g-v;)y=Ti(y),g--;for(;v--;){if(w===y||y!==null&&w===y.alternate)break t;w=Ti(w),y=Ti(y)}w=null}else w=null;p!==null&&fg(c,f,p,w,!1),m!==null&&C!==null&&fg(c,C,m,w,!0)}}e:{if(f=u?Fi(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var S=sE;else if(ig(f))if(I_)S=cE;else{S=lE;var _=aE}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=uE);if(S&&(S=S(e,u))){S_(c,S,n,d);break e}_&&_(e,f,u),e==="focusout"&&(_=f._wrapperState)&&_.controlled&&f.type==="number"&&Dd(f,"number",f.value)}switch(_=u?Fi(u):window,e){case"focusin":(ig(_)||_.contentEditable==="true")&&(Mi=_,Wd=u,ts=null);break;case"focusout":ts=Wd=Mi=null;break;case"mousedown":qd=!0;break;case"contextmenu":case"mouseup":case"dragend":qd=!1,ug(c,n,d);break;case"selectionchange":if(pE)break;case"keydown":case"keyup":ug(c,n,d)}var A;if(Rp)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Li?x_(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(b_&&n.locale!=="ko"&&(Li||R!=="onCompositionStart"?R==="onCompositionEnd"&&Li&&(A=__()):(wr=d,Cp="value"in wr?wr.value:wr.textContent,Li=!0)),_=Cl(u,R),0<_.length&&(R=new eg(R,e,null,n,d),c.push({event:R,listeners:_}),A?R.data=A:(A=k_(n),A!==null&&(R.data=A)))),(A=tE?nE(e,n):rE(e,n))&&(u=Cl(u,"onBeforeInput"),0<u.length&&(d=new eg("onBeforeInput","beforeinput",null,n,d),c.push({event:d,listeners:u}),d.data=A))}L_(c,t)})}function Ss(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Cl(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ys(e,n),o!=null&&r.unshift(Ss(e,o,i)),o=ys(e,t),o!=null&&r.push(Ss(e,o,i))),e=e.return}return r}function Ti(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function fg(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&u!==null&&(a=u,i?(l=ys(n,o),l!=null&&s.unshift(Ss(n,l,a))):i||(l=ys(n,o),l!=null&&s.push(Ss(n,l,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var yE=/\r\n?/g,vE=/\u0000|\uFFFD/g;function pg(e){return(typeof e=="string"?e:""+e).replace(yE,`
`).replace(vE,"")}function Ra(e,t,n){if(t=pg(t),pg(e)!==t&&n)throw Error(F(425))}function Al(){}var Kd=null,Gd=null;function Yd(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Qd=typeof setTimeout=="function"?setTimeout:void 0,wE=typeof clearTimeout=="function"?clearTimeout:void 0,hg=typeof Promise=="function"?Promise:void 0,_E=typeof queueMicrotask=="function"?queueMicrotask:typeof hg<"u"?function(e){return hg.resolve(null).then(e).catch(bE)}:Qd;function bE(e){setTimeout(function(){throw e})}function Sc(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),_s(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);_s(t)}function Sr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function mg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _o=Math.random().toString(36).slice(2),Nn="__reactFiber$"+_o,Is="__reactProps$"+_o,Jn="__reactContainer$"+_o,Jd="__reactEvents$"+_o,xE="__reactListeners$"+_o,kE="__reactHandles$"+_o;function ti(e){var t=e[Nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Jn]||n[Nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=mg(e);e!==null;){if(n=e[Nn])return n;e=mg(e)}return t}e=n,n=e.parentNode}return null}function Ys(e){return e=e[Nn]||e[Jn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Fi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function Iu(e){return e[Is]||null}var Xd=[],Ui=-1;function Vr(e){return{current:e}}function Le(e){0>Ui||(e.current=Xd[Ui],Xd[Ui]=null,Ui--)}function Ne(e,t){Ui++,Xd[Ui]=e.current,e.current=t}var Mr={},bt=Vr(Mr),Mt=Vr(!1),di=Mr;function oo(e,t){var n=e.type.contextTypes;if(!n)return Mr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function jt(e){return e=e.childContextTypes,e!=null}function Tl(){Le(Mt),Le(bt)}function gg(e,t,n){if(bt.current!==Mr)throw Error(F(168));Ne(bt,t),Ne(Mt,n)}function j_(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(F(108,aI(e)||"Unknown",i));return $e({},n,r)}function Rl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Mr,di=bt.current,Ne(bt,e),Ne(Mt,Mt.current),!0}function yg(e,t,n){var r=e.stateNode;if(!r)throw Error(F(169));n?(e=j_(e,t,di),r.__reactInternalMemoizedMergedChildContext=e,Le(Mt),Le(bt),Ne(bt,e)):Le(Mt),Ne(Mt,n)}var zn=null,Eu=!1,Ic=!1;function F_(e){zn===null?zn=[e]:zn.push(e)}function SE(e){Eu=!0,F_(e)}function $r(){if(!Ic&&zn!==null){Ic=!0;var e=0,t=be;try{var n=zn;for(be=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}zn=null,Eu=!1}catch(i){throw zn!==null&&(zn=zn.slice(e+1)),u_(kp,$r),i}finally{be=t,Ic=!1}}return null}var zi=[],Bi=0,Nl=null,Pl=0,en=[],tn=0,fi=null,Bn=1,Vn="";function Yr(e,t){zi[Bi++]=Pl,zi[Bi++]=Nl,Nl=e,Pl=t}function U_(e,t,n){en[tn++]=Bn,en[tn++]=Vn,en[tn++]=fi,fi=e;var r=Bn;e=Vn;var i=32-yn(r)-1;r&=~(1<<i),n+=1;var o=32-yn(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Bn=1<<32-yn(t)+i|n<<i|r,Vn=o+e}else Bn=1<<o|n<<i|r,Vn=e}function Pp(e){e.return!==null&&(Yr(e,1),U_(e,1,0))}function Dp(e){for(;e===Nl;)Nl=zi[--Bi],zi[Bi]=null,Pl=zi[--Bi],zi[Bi]=null;for(;e===fi;)fi=en[--tn],en[tn]=null,Vn=en[--tn],en[tn]=null,Bn=en[--tn],en[tn]=null}var qt=null,Wt=null,Fe=!1,pn=null;function z_(e,t){var n=rn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function vg(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,qt=e,Wt=Sr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,qt=e,Wt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=fi!==null?{id:Bn,overflow:Vn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=rn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,qt=e,Wt=null,!0):!1;default:return!1}}function Zd(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ef(e){if(Fe){var t=Wt;if(t){var n=t;if(!vg(e,t)){if(Zd(e))throw Error(F(418));t=Sr(n.nextSibling);var r=qt;t&&vg(e,t)?z_(r,n):(e.flags=e.flags&-4097|2,Fe=!1,qt=e)}}else{if(Zd(e))throw Error(F(418));e.flags=e.flags&-4097|2,Fe=!1,qt=e}}}function wg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;qt=e}function Na(e){if(e!==qt)return!1;if(!Fe)return wg(e),Fe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Yd(e.type,e.memoizedProps)),t&&(t=Wt)){if(Zd(e))throw B_(),Error(F(418));for(;t;)z_(e,t),t=Sr(t.nextSibling)}if(wg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Wt=Sr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Wt=null}}else Wt=qt?Sr(e.stateNode.nextSibling):null;return!0}function B_(){for(var e=Wt;e;)e=Sr(e.nextSibling)}function so(){Wt=qt=null,Fe=!1}function Op(e){pn===null?pn=[e]:pn.push(e)}var IE=ir.ReactCurrentBatchConfig;function Oo(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var a=i.refs;s===null?delete a[o]:a[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,e))}return e}function Pa(e,t){throw e=Object.prototype.toString.call(t),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function _g(e){var t=e._init;return t(e._payload)}function V_(e){function t(y,v){if(e){var g=y.deletions;g===null?(y.deletions=[v],y.flags|=16):g.push(v)}}function n(y,v){if(!e)return null;for(;v!==null;)t(y,v),v=v.sibling;return null}function r(y,v){for(y=new Map;v!==null;)v.key!==null?y.set(v.key,v):y.set(v.index,v),v=v.sibling;return y}function i(y,v){return y=Ar(y,v),y.index=0,y.sibling=null,y}function o(y,v,g){return y.index=g,e?(g=y.alternate,g!==null?(g=g.index,g<v?(y.flags|=2,v):g):(y.flags|=2,v)):(y.flags|=1048576,v)}function s(y){return e&&y.alternate===null&&(y.flags|=2),y}function a(y,v,g,k){return v===null||v.tag!==6?(v=Pc(g,y.mode,k),v.return=y,v):(v=i(v,g),v.return=y,v)}function l(y,v,g,k){var S=g.type;return S===Oi?d(y,v,g.props.children,k,g.key):v!==null&&(v.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dr&&_g(S)===v.type)?(k=i(v,g.props),k.ref=Oo(y,v,g),k.return=y,k):(k=ll(g.type,g.key,g.props,null,y.mode,k),k.ref=Oo(y,v,g),k.return=y,k)}function u(y,v,g,k){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=Dc(g,y.mode,k),v.return=y,v):(v=i(v,g.children||[]),v.return=y,v)}function d(y,v,g,k,S){return v===null||v.tag!==7?(v=li(g,y.mode,k,S),v.return=y,v):(v=i(v,g),v.return=y,v)}function c(y,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Pc(""+v,y.mode,g),v.return=y,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ba:return g=ll(v.type,v.key,v.props,null,y.mode,g),g.ref=Oo(y,null,v),g.return=y,g;case Di:return v=Dc(v,y.mode,g),v.return=y,v;case dr:var k=v._init;return c(y,k(v._payload),g)}if(Go(v)||To(v))return v=li(v,y.mode,g,null),v.return=y,v;Pa(y,v)}return null}function f(y,v,g,k){var S=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return S!==null?null:a(y,v,""+g,k);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ba:return g.key===S?l(y,v,g,k):null;case Di:return g.key===S?u(y,v,g,k):null;case dr:return S=g._init,f(y,v,S(g._payload),k)}if(Go(g)||To(g))return S!==null?null:d(y,v,g,k,null);Pa(y,g)}return null}function p(y,v,g,k,S){if(typeof k=="string"&&k!==""||typeof k=="number")return y=y.get(g)||null,a(v,y,""+k,S);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ba:return y=y.get(k.key===null?g:k.key)||null,l(v,y,k,S);case Di:return y=y.get(k.key===null?g:k.key)||null,u(v,y,k,S);case dr:var _=k._init;return p(y,v,g,_(k._payload),S)}if(Go(k)||To(k))return y=y.get(g)||null,d(v,y,k,S,null);Pa(v,k)}return null}function m(y,v,g,k){for(var S=null,_=null,A=v,R=v=0,O=null;A!==null&&R<g.length;R++){A.index>R?(O=A,A=null):O=A.sibling;var E=f(y,A,g[R],k);if(E===null){A===null&&(A=O);break}e&&A&&E.alternate===null&&t(y,A),v=o(E,v,R),_===null?S=E:_.sibling=E,_=E,A=O}if(R===g.length)return n(y,A),Fe&&Yr(y,R),S;if(A===null){for(;R<g.length;R++)A=c(y,g[R],k),A!==null&&(v=o(A,v,R),_===null?S=A:_.sibling=A,_=A);return Fe&&Yr(y,R),S}for(A=r(y,A);R<g.length;R++)O=p(A,y,R,g[R],k),O!==null&&(e&&O.alternate!==null&&A.delete(O.key===null?R:O.key),v=o(O,v,R),_===null?S=O:_.sibling=O,_=O);return e&&A.forEach(function(D){return t(y,D)}),Fe&&Yr(y,R),S}function w(y,v,g,k){var S=To(g);if(typeof S!="function")throw Error(F(150));if(g=S.call(g),g==null)throw Error(F(151));for(var _=S=null,A=v,R=v=0,O=null,E=g.next();A!==null&&!E.done;R++,E=g.next()){A.index>R?(O=A,A=null):O=A.sibling;var D=f(y,A,E.value,k);if(D===null){A===null&&(A=O);break}e&&A&&D.alternate===null&&t(y,A),v=o(D,v,R),_===null?S=D:_.sibling=D,_=D,A=O}if(E.done)return n(y,A),Fe&&Yr(y,R),S;if(A===null){for(;!E.done;R++,E=g.next())E=c(y,E.value,k),E!==null&&(v=o(E,v,R),_===null?S=E:_.sibling=E,_=E);return Fe&&Yr(y,R),S}for(A=r(y,A);!E.done;R++,E=g.next())E=p(A,y,R,E.value,k),E!==null&&(e&&E.alternate!==null&&A.delete(E.key===null?R:E.key),v=o(E,v,R),_===null?S=E:_.sibling=E,_=E);return e&&A.forEach(function(z){return t(y,z)}),Fe&&Yr(y,R),S}function C(y,v,g,k){if(typeof g=="object"&&g!==null&&g.type===Oi&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case ba:e:{for(var S=g.key,_=v;_!==null;){if(_.key===S){if(S=g.type,S===Oi){if(_.tag===7){n(y,_.sibling),v=i(_,g.props.children),v.return=y,y=v;break e}}else if(_.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dr&&_g(S)===_.type){n(y,_.sibling),v=i(_,g.props),v.ref=Oo(y,_,g),v.return=y,y=v;break e}n(y,_);break}else t(y,_);_=_.sibling}g.type===Oi?(v=li(g.props.children,y.mode,k,g.key),v.return=y,y=v):(k=ll(g.type,g.key,g.props,null,y.mode,k),k.ref=Oo(y,v,g),k.return=y,y=k)}return s(y);case Di:e:{for(_=g.key;v!==null;){if(v.key===_)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){n(y,v.sibling),v=i(v,g.children||[]),v.return=y,y=v;break e}else{n(y,v);break}else t(y,v);v=v.sibling}v=Dc(g,y.mode,k),v.return=y,y=v}return s(y);case dr:return _=g._init,C(y,v,_(g._payload),k)}if(Go(g))return m(y,v,g,k);if(To(g))return w(y,v,g,k);Pa(y,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(n(y,v.sibling),v=i(v,g),v.return=y,y=v):(n(y,v),v=Pc(g,y.mode,k),v.return=y,y=v),s(y)):n(y,v)}return C}var ao=V_(!0),$_=V_(!1),Dl=Vr(null),Ol=null,Vi=null,Lp=null;function Mp(){Lp=Vi=Ol=null}function jp(e){var t=Dl.current;Le(Dl),e._currentValue=t}function tf(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ji(e,t){Ol=e,Lp=Vi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ot=!0),e.firstContext=null)}function sn(e){var t=e._currentValue;if(Lp!==e)if(e={context:e,memoizedValue:t,next:null},Vi===null){if(Ol===null)throw Error(F(308));Vi=e,Ol.dependencies={lanes:0,firstContext:e}}else Vi=Vi.next=e;return t}var ni=null;function Fp(e){ni===null?ni=[e]:ni.push(e)}function H_(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Fp(t)):(n.next=i.next,i.next=n),t.interleaved=n,Xn(e,r)}function Xn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var fr=!1;function Up(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function W_(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ir(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Xn(e,n)}return i=r.interleaved,i===null?(t.next=t,Fp(r)):(t.next=i.next,i.next=t),r.interleaved=t,Xn(e,n)}function nl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Sp(e,n)}}function bg(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ll(e,t,n,r){var i=e.updateQueue;fr=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,u=l.next;l.next=null,s===null?o=u:s.next=u,s=l;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==s&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=l))}if(o!==null){var c=i.baseState;s=0,d=u=l=null,a=o;do{var f=a.lane,p=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=e,w=a;switch(f=t,p=n,w.tag){case 1:if(m=w.payload,typeof m=="function"){c=m.call(p,c,f);break e}c=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=w.payload,f=typeof m=="function"?m.call(p,c,f):m,f==null)break e;c=$e({},c,f);break e;case 2:fr=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=p,l=c):d=d.next=p,s|=f;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;f=a,a=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(d===null&&(l=c),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);hi|=s,e.lanes=s,e.memoizedState=c}}function xg(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(F(191,i));i.call(r)}}}var Qs={},Dn=Vr(Qs),Es=Vr(Qs),Cs=Vr(Qs);function ri(e){if(e===Qs)throw Error(F(174));return e}function zp(e,t){switch(Ne(Cs,t),Ne(Es,e),Ne(Dn,Qs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ld(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ld(t,e)}Le(Dn),Ne(Dn,t)}function lo(){Le(Dn),Le(Es),Le(Cs)}function q_(e){ri(Cs.current);var t=ri(Dn.current),n=Ld(t,e.type);t!==n&&(Ne(Es,e),Ne(Dn,n))}function Bp(e){Es.current===e&&(Le(Dn),Le(Es))}var ze=Vr(0);function Ml(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ec=[];function Vp(){for(var e=0;e<Ec.length;e++)Ec[e]._workInProgressVersionPrimary=null;Ec.length=0}var rl=ir.ReactCurrentDispatcher,Cc=ir.ReactCurrentBatchConfig,pi=0,Ve=null,Ze=null,ot=null,jl=!1,ns=!1,As=0,EE=0;function gt(){throw Error(F(321))}function $p(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!bn(e[n],t[n]))return!1;return!0}function Hp(e,t,n,r,i,o){if(pi=o,Ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,rl.current=e===null||e.memoizedState===null?RE:NE,e=n(r,i),ns){o=0;do{if(ns=!1,As=0,25<=o)throw Error(F(301));o+=1,ot=Ze=null,t.updateQueue=null,rl.current=PE,e=n(r,i)}while(ns)}if(rl.current=Fl,t=Ze!==null&&Ze.next!==null,pi=0,ot=Ze=Ve=null,jl=!1,t)throw Error(F(300));return e}function Wp(){var e=As!==0;return As=0,e}function An(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ot===null?Ve.memoizedState=ot=e:ot=ot.next=e,ot}function an(){if(Ze===null){var e=Ve.alternate;e=e!==null?e.memoizedState:null}else e=Ze.next;var t=ot===null?Ve.memoizedState:ot.next;if(t!==null)ot=t,Ze=e;else{if(e===null)throw Error(F(310));Ze=e,e={memoizedState:Ze.memoizedState,baseState:Ze.baseState,baseQueue:Ze.baseQueue,queue:Ze.queue,next:null},ot===null?Ve.memoizedState=ot=e:ot=ot.next=e}return ot}function Ts(e,t){return typeof t=="function"?t(e):t}function Ac(e){var t=an(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=Ze,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var a=s=null,l=null,u=o;do{var d=u.lane;if((pi&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=c,s=r):l=l.next=c,Ve.lanes|=d,hi|=d}u=u.next}while(u!==null&&u!==o);l===null?s=r:l.next=a,bn(r,t.memoizedState)||(Ot=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,Ve.lanes|=o,hi|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Tc(e){var t=an(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);bn(o,t.memoizedState)||(Ot=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function K_(){}function G_(e,t){var n=Ve,r=an(),i=t(),o=!bn(r.memoizedState,i);if(o&&(r.memoizedState=i,Ot=!0),r=r.queue,qp(J_.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ot!==null&&ot.memoizedState.tag&1){if(n.flags|=2048,Rs(9,Q_.bind(null,n,r,i,t),void 0,null),lt===null)throw Error(F(349));pi&30||Y_(n,t,i)}return i}function Y_(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ve.updateQueue,t===null?(t={lastEffect:null,stores:null},Ve.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Q_(e,t,n,r){t.value=n,t.getSnapshot=r,X_(t)&&Z_(e)}function J_(e,t,n){return n(function(){X_(t)&&Z_(e)})}function X_(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!bn(e,n)}catch{return!0}}function Z_(e){var t=Xn(e,1);t!==null&&vn(t,e,1,-1)}function kg(e){var t=An();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ts,lastRenderedState:e},t.queue=e,e=e.dispatch=TE.bind(null,Ve,e),[t.memoizedState,e]}function Rs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ve.updateQueue,t===null?(t={lastEffect:null,stores:null},Ve.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function eb(){return an().memoizedState}function il(e,t,n,r){var i=An();Ve.flags|=e,i.memoizedState=Rs(1|t,n,void 0,r===void 0?null:r)}function Cu(e,t,n,r){var i=an();r=r===void 0?null:r;var o=void 0;if(Ze!==null){var s=Ze.memoizedState;if(o=s.destroy,r!==null&&$p(r,s.deps)){i.memoizedState=Rs(t,n,o,r);return}}Ve.flags|=e,i.memoizedState=Rs(1|t,n,o,r)}function Sg(e,t){return il(8390656,8,e,t)}function qp(e,t){return Cu(2048,8,e,t)}function tb(e,t){return Cu(4,2,e,t)}function nb(e,t){return Cu(4,4,e,t)}function rb(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ib(e,t,n){return n=n!=null?n.concat([e]):null,Cu(4,4,rb.bind(null,t,e),n)}function Kp(){}function ob(e,t){var n=an();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&$p(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function sb(e,t){var n=an();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&$p(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ab(e,t,n){return pi&21?(bn(n,t)||(n=f_(),Ve.lanes|=n,hi|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ot=!0),e.memoizedState=n)}function CE(e,t){var n=be;be=n!==0&&4>n?n:4,e(!0);var r=Cc.transition;Cc.transition={};try{e(!1),t()}finally{be=n,Cc.transition=r}}function lb(){return an().memoizedState}function AE(e,t,n){var r=Cr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ub(e))cb(t,n);else if(n=H_(e,t,n,r),n!==null){var i=Ct();vn(n,e,r,i),db(n,t,r)}}function TE(e,t,n){var r=Cr(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ub(e))cb(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,a=o(s,n);if(i.hasEagerState=!0,i.eagerState=a,bn(a,s)){var l=t.interleaved;l===null?(i.next=i,Fp(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=H_(e,t,i,r),n!==null&&(i=Ct(),vn(n,e,r,i),db(n,t,r))}}function ub(e){var t=e.alternate;return e===Ve||t!==null&&t===Ve}function cb(e,t){ns=jl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function db(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Sp(e,n)}}var Fl={readContext:sn,useCallback:gt,useContext:gt,useEffect:gt,useImperativeHandle:gt,useInsertionEffect:gt,useLayoutEffect:gt,useMemo:gt,useReducer:gt,useRef:gt,useState:gt,useDebugValue:gt,useDeferredValue:gt,useTransition:gt,useMutableSource:gt,useSyncExternalStore:gt,useId:gt,unstable_isNewReconciler:!1},RE={readContext:sn,useCallback:function(e,t){return An().memoizedState=[e,t===void 0?null:t],e},useContext:sn,useEffect:Sg,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,il(4194308,4,rb.bind(null,t,e),n)},useLayoutEffect:function(e,t){return il(4194308,4,e,t)},useInsertionEffect:function(e,t){return il(4,2,e,t)},useMemo:function(e,t){var n=An();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=An();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=AE.bind(null,Ve,e),[r.memoizedState,e]},useRef:function(e){var t=An();return e={current:e},t.memoizedState=e},useState:kg,useDebugValue:Kp,useDeferredValue:function(e){return An().memoizedState=e},useTransition:function(){var e=kg(!1),t=e[0];return e=CE.bind(null,e[1]),An().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ve,i=An();if(Fe){if(n===void 0)throw Error(F(407));n=n()}else{if(n=t(),lt===null)throw Error(F(349));pi&30||Y_(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Sg(J_.bind(null,r,o,e),[e]),r.flags|=2048,Rs(9,Q_.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=An(),t=lt.identifierPrefix;if(Fe){var n=Vn,r=Bn;n=(r&~(1<<32-yn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=As++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=EE++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},NE={readContext:sn,useCallback:ob,useContext:sn,useEffect:qp,useImperativeHandle:ib,useInsertionEffect:tb,useLayoutEffect:nb,useMemo:sb,useReducer:Ac,useRef:eb,useState:function(){return Ac(Ts)},useDebugValue:Kp,useDeferredValue:function(e){var t=an();return ab(t,Ze.memoizedState,e)},useTransition:function(){var e=Ac(Ts)[0],t=an().memoizedState;return[e,t]},useMutableSource:K_,useSyncExternalStore:G_,useId:lb,unstable_isNewReconciler:!1},PE={readContext:sn,useCallback:ob,useContext:sn,useEffect:qp,useImperativeHandle:ib,useInsertionEffect:tb,useLayoutEffect:nb,useMemo:sb,useReducer:Tc,useRef:eb,useState:function(){return Tc(Ts)},useDebugValue:Kp,useDeferredValue:function(e){var t=an();return Ze===null?t.memoizedState=e:ab(t,Ze.memoizedState,e)},useTransition:function(){var e=Tc(Ts)[0],t=an().memoizedState;return[e,t]},useMutableSource:K_,useSyncExternalStore:G_,useId:lb,unstable_isNewReconciler:!1};function dn(e,t){if(e&&e.defaultProps){t=$e({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function nf(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:$e({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Au={isMounted:function(e){return(e=e._reactInternals)?Ii(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ct(),i=Cr(e),o=Gn(r,i);o.payload=t,n!=null&&(o.callback=n),t=Ir(e,o,i),t!==null&&(vn(t,e,i,r),nl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ct(),i=Cr(e),o=Gn(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Ir(e,o,i),t!==null&&(vn(t,e,i,r),nl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ct(),r=Cr(e),i=Gn(n,r);i.tag=2,t!=null&&(i.callback=t),t=Ir(e,i,r),t!==null&&(vn(t,e,r,n),nl(t,e,r))}};function Ig(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!xs(n,r)||!xs(i,o):!0}function fb(e,t,n){var r=!1,i=Mr,o=t.contextType;return typeof o=="object"&&o!==null?o=sn(o):(i=jt(t)?di:bt.current,r=t.contextTypes,o=(r=r!=null)?oo(e,i):Mr),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Au,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Eg(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Au.enqueueReplaceState(t,t.state,null)}function rf(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Up(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=sn(o):(o=jt(t)?di:bt.current,i.context=oo(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(nf(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Au.enqueueReplaceState(i,i.state,null),Ll(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function uo(e,t){try{var n="",r=t;do n+=sI(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Rc(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function of(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var DE=typeof WeakMap=="function"?WeakMap:Map;function pb(e,t,n){n=Gn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){zl||(zl=!0,mf=r),of(e,t)},n}function hb(e,t,n){n=Gn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){of(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){of(e,t),typeof r!="function"&&(Er===null?Er=new Set([this]):Er.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Cg(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new DE;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=KE.bind(null,e,t,n),t.then(e,e))}function Ag(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Tg(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Gn(-1,1),t.tag=2,Ir(n,t,1))),n.lanes|=1),e)}var OE=ir.ReactCurrentOwner,Ot=!1;function St(e,t,n,r){t.child=e===null?$_(t,null,n,r):ao(t,e.child,n,r)}function Rg(e,t,n,r,i){n=n.render;var o=t.ref;return Ji(t,i),r=Hp(e,t,n,r,o,i),n=Wp(),e!==null&&!Ot?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Zn(e,t,i)):(Fe&&n&&Pp(t),t.flags|=1,St(e,t,r,i),t.child)}function Ng(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!th(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,mb(e,t,o,r,i)):(e=ll(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:xs,n(s,r)&&e.ref===t.ref)return Zn(e,t,i)}return t.flags|=1,e=Ar(o,r),e.ref=t.ref,e.return=t,t.child=e}function mb(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(xs(o,r)&&e.ref===t.ref)if(Ot=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Ot=!0);else return t.lanes=e.lanes,Zn(e,t,i)}return sf(e,t,n,r,i)}function gb(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ne(Hi,Ht),Ht|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ne(Hi,Ht),Ht|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,Ne(Hi,Ht),Ht|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,Ne(Hi,Ht),Ht|=r;return St(e,t,i,n),t.child}function yb(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function sf(e,t,n,r,i){var o=jt(n)?di:bt.current;return o=oo(t,o),Ji(t,i),n=Hp(e,t,n,r,o,i),r=Wp(),e!==null&&!Ot?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Zn(e,t,i)):(Fe&&r&&Pp(t),t.flags|=1,St(e,t,n,i),t.child)}function Pg(e,t,n,r,i){if(jt(n)){var o=!0;Rl(t)}else o=!1;if(Ji(t,i),t.stateNode===null)ol(e,t),fb(t,n,r),rf(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=sn(u):(u=jt(n)?di:bt.current,u=oo(t,u));var d=n.getDerivedStateFromProps,c=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";c||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||l!==u)&&Eg(t,s,r,u),fr=!1;var f=t.memoizedState;s.state=f,Ll(t,r,s,i),l=t.memoizedState,a!==r||f!==l||Mt.current||fr?(typeof d=="function"&&(nf(t,n,d,r),l=t.memoizedState),(a=fr||Ig(t,n,a,r,f,l,u))?(c||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),s.props=r,s.state=l,s.context=u,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,W_(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:dn(t.type,a),s.props=u,c=t.pendingProps,f=s.context,l=n.contextType,typeof l=="object"&&l!==null?l=sn(l):(l=jt(n)?di:bt.current,l=oo(t,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==c||f!==l)&&Eg(t,s,r,l),fr=!1,f=t.memoizedState,s.state=f,Ll(t,r,s,i);var m=t.memoizedState;a!==c||f!==m||Mt.current||fr?(typeof p=="function"&&(nf(t,n,p,r),m=t.memoizedState),(u=fr||Ig(t,n,u,r,f,m,l)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,m,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,m,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),s.props=r,s.state=m,s.context=l,r=u):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return af(e,t,n,r,o,i)}function af(e,t,n,r,i,o){yb(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&yg(t,n,!1),Zn(e,t,o);r=t.stateNode,OE.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=ao(t,e.child,null,o),t.child=ao(t,null,a,o)):St(e,t,a,o),t.memoizedState=r.state,i&&yg(t,n,!0),t.child}function vb(e){var t=e.stateNode;t.pendingContext?gg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&gg(e,t.context,!1),zp(e,t.containerInfo)}function Dg(e,t,n,r,i){return so(),Op(i),t.flags|=256,St(e,t,n,r),t.child}var lf={dehydrated:null,treeContext:null,retryLane:0};function uf(e){return{baseLanes:e,cachePool:null,transitions:null}}function wb(e,t,n){var r=t.pendingProps,i=ze.current,o=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Ne(ze,i&1),e===null)return ef(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Nu(s,r,0,null),e=li(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=uf(n),t.memoizedState=lf,e):Gp(t,s));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return LE(e,t,s,r,a,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=Ar(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?o=Ar(a,o):(o=li(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?uf(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=lf,r}return o=e.child,e=o.sibling,r=Ar(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Gp(e,t){return t=Nu({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Da(e,t,n,r){return r!==null&&Op(r),ao(t,e.child,null,n),e=Gp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function LE(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Rc(Error(F(422))),Da(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Nu({mode:"visible",children:r.children},i,0,null),o=li(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&ao(t,e.child,null,s),t.child.memoizedState=uf(s),t.memoizedState=lf,o);if(!(t.mode&1))return Da(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(F(419)),r=Rc(o,r,void 0),Da(e,t,s,r)}if(a=(s&e.childLanes)!==0,Ot||a){if(r=lt,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Xn(e,i),vn(r,e,i,-1))}return eh(),r=Rc(Error(F(421))),Da(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=GE.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Wt=Sr(i.nextSibling),qt=t,Fe=!0,pn=null,e!==null&&(en[tn++]=Bn,en[tn++]=Vn,en[tn++]=fi,Bn=e.id,Vn=e.overflow,fi=t),t=Gp(t,r.children),t.flags|=4096,t)}function Og(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),tf(e.return,t,n)}function Nc(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function _b(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(St(e,t,r.children,n),r=ze.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Og(e,n,t);else if(e.tag===19)Og(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ne(ze,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ml(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Nc(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ml(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Nc(t,!0,n,null,o);break;case"together":Nc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ol(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Zn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),hi|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(F(153));if(t.child!==null){for(e=t.child,n=Ar(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ar(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ME(e,t,n){switch(t.tag){case 3:vb(t),so();break;case 5:q_(t);break;case 1:jt(t.type)&&Rl(t);break;case 4:zp(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Ne(Dl,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ne(ze,ze.current&1),t.flags|=128,null):n&t.child.childLanes?wb(e,t,n):(Ne(ze,ze.current&1),e=Zn(e,t,n),e!==null?e.sibling:null);Ne(ze,ze.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return _b(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ne(ze,ze.current),r)break;return null;case 22:case 23:return t.lanes=0,gb(e,t,n)}return Zn(e,t,n)}var bb,cf,xb,kb;bb=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};cf=function(){};xb=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,ri(Dn.current);var o=null;switch(n){case"input":i=Nd(e,i),r=Nd(e,r),o=[];break;case"select":i=$e({},i,{value:void 0}),r=$e({},r,{value:void 0}),o=[];break;case"textarea":i=Od(e,i),r=Od(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Al)}Md(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ms.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var l=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(n||(n={}),n[s]=l[s])}else n||(o||(o=[]),o.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(o=o||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ms.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&De("scroll",e),o||a===l||(o=[])):(o=o||[]).push(u,l))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};kb=function(e,t,n,r){n!==r&&(t.flags|=4)};function Lo(e,t){if(!Fe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function yt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function jE(e,t,n){var r=t.pendingProps;switch(Dp(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yt(t),null;case 1:return jt(t.type)&&Tl(),yt(t),null;case 3:return r=t.stateNode,lo(),Le(Mt),Le(bt),Vp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Na(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,pn!==null&&(vf(pn),pn=null))),cf(e,t),yt(t),null;case 5:Bp(t);var i=ri(Cs.current);if(n=t.type,e!==null&&t.stateNode!=null)xb(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(F(166));return yt(t),null}if(e=ri(Dn.current),Na(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Nn]=t,r[Is]=o,e=(t.mode&1)!==0,n){case"dialog":De("cancel",r),De("close",r);break;case"iframe":case"object":case"embed":De("load",r);break;case"video":case"audio":for(i=0;i<Qo.length;i++)De(Qo[i],r);break;case"source":De("error",r);break;case"img":case"image":case"link":De("error",r),De("load",r);break;case"details":De("toggle",r);break;case"input":$m(r,o),De("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},De("invalid",r);break;case"textarea":Wm(r,o),De("invalid",r)}Md(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Ra(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Ra(r.textContent,a,e),i=["children",""+a]):ms.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&De("scroll",r)}switch(n){case"input":xa(r),Hm(r,o,!0);break;case"textarea":xa(r),qm(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Al)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Jw(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[Nn]=t,e[Is]=r,bb(e,t,!1,!1),t.stateNode=e;e:{switch(s=jd(n,r),n){case"dialog":De("cancel",e),De("close",e),i=r;break;case"iframe":case"object":case"embed":De("load",e),i=r;break;case"video":case"audio":for(i=0;i<Qo.length;i++)De(Qo[i],e);i=r;break;case"source":De("error",e),i=r;break;case"img":case"image":case"link":De("error",e),De("load",e),i=r;break;case"details":De("toggle",e),i=r;break;case"input":$m(e,r),i=Nd(e,r),De("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=$e({},r,{value:void 0}),De("invalid",e);break;case"textarea":Wm(e,r),i=Od(e,r),De("invalid",e);break;default:i=r}Md(n,i),a=i;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="style"?e_(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Xw(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&gs(e,l):typeof l=="number"&&gs(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ms.hasOwnProperty(o)?l!=null&&o==="onScroll"&&De("scroll",e):l!=null&&vp(e,o,l,s))}switch(n){case"input":xa(e),Hm(e,r,!1);break;case"textarea":xa(e),qm(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Lr(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Ki(e,!!r.multiple,o,!1):r.defaultValue!=null&&Ki(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Al)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return yt(t),null;case 6:if(e&&t.stateNode!=null)kb(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(F(166));if(n=ri(Cs.current),ri(Dn.current),Na(t)){if(r=t.stateNode,n=t.memoizedProps,r[Nn]=t,(o=r.nodeValue!==n)&&(e=qt,e!==null))switch(e.tag){case 3:Ra(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ra(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Nn]=t,t.stateNode=r}return yt(t),null;case 13:if(Le(ze),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Fe&&Wt!==null&&t.mode&1&&!(t.flags&128))B_(),so(),t.flags|=98560,o=!1;else if(o=Na(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(F(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(F(317));o[Nn]=t}else so(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;yt(t),o=!1}else pn!==null&&(vf(pn),pn=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ze.current&1?rt===0&&(rt=3):eh())),t.updateQueue!==null&&(t.flags|=4),yt(t),null);case 4:return lo(),cf(e,t),e===null&&ks(t.stateNode.containerInfo),yt(t),null;case 10:return jp(t.type._context),yt(t),null;case 17:return jt(t.type)&&Tl(),yt(t),null;case 19:if(Le(ze),o=t.memoizedState,o===null)return yt(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)Lo(o,!1);else{if(rt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Ml(e),s!==null){for(t.flags|=128,Lo(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ne(ze,ze.current&1|2),t.child}e=e.sibling}o.tail!==null&&qe()>co&&(t.flags|=128,r=!0,Lo(o,!1),t.lanes=4194304)}else{if(!r)if(e=Ml(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Lo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Fe)return yt(t),null}else 2*qe()-o.renderingStartTime>co&&n!==1073741824&&(t.flags|=128,r=!0,Lo(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=qe(),t.sibling=null,n=ze.current,Ne(ze,r?n&1|2:n&1),t):(yt(t),null);case 22:case 23:return Zp(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ht&1073741824&&(yt(t),t.subtreeFlags&6&&(t.flags|=8192)):yt(t),null;case 24:return null;case 25:return null}throw Error(F(156,t.tag))}function FE(e,t){switch(Dp(t),t.tag){case 1:return jt(t.type)&&Tl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return lo(),Le(Mt),Le(bt),Vp(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Bp(t),null;case 13:if(Le(ze),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(F(340));so()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Le(ze),null;case 4:return lo(),null;case 10:return jp(t.type._context),null;case 22:case 23:return Zp(),null;case 24:return null;default:return null}}var Oa=!1,vt=!1,UE=typeof WeakSet=="function"?WeakSet:Set,W=null;function $i(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){We(e,t,r)}else n.current=null}function df(e,t,n){try{n()}catch(r){We(e,t,r)}}var Lg=!1;function zE(e,t){if(Kd=Il,e=A_(),Np(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,a=-1,l=-1,u=0,d=0,c=e,f=null;t:for(;;){for(var p;c!==n||i!==0&&c.nodeType!==3||(a=s+i),c!==o||r!==0&&c.nodeType!==3||(l=s+r),c.nodeType===3&&(s+=c.nodeValue.length),(p=c.firstChild)!==null;)f=c,c=p;for(;;){if(c===e)break t;if(f===n&&++u===i&&(a=s),f===o&&++d===r&&(l=s),(p=c.nextSibling)!==null)break;c=f,f=c.parentNode}c=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Gd={focusedElem:e,selectionRange:n},Il=!1,W=t;W!==null;)if(t=W,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,W=e;else for(;W!==null;){t=W;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var w=m.memoizedProps,C=m.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?w:dn(t.type,w),C);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(k){We(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,W=e;break}W=t.return}return m=Lg,Lg=!1,m}function rs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&df(t,n,o)}i=i.next}while(i!==r)}}function Tu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ff(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Sb(e){var t=e.alternate;t!==null&&(e.alternate=null,Sb(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Nn],delete t[Is],delete t[Jd],delete t[xE],delete t[kE])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ib(e){return e.tag===5||e.tag===3||e.tag===4}function Mg(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ib(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function pf(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Al));else if(r!==4&&(e=e.child,e!==null))for(pf(e,t,n),e=e.sibling;e!==null;)pf(e,t,n),e=e.sibling}function hf(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(hf(e,t,n),e=e.sibling;e!==null;)hf(e,t,n),e=e.sibling}var dt=null,fn=!1;function ar(e,t,n){for(n=n.child;n!==null;)Eb(e,t,n),n=n.sibling}function Eb(e,t,n){if(Pn&&typeof Pn.onCommitFiberUnmount=="function")try{Pn.onCommitFiberUnmount(bu,n)}catch{}switch(n.tag){case 5:vt||$i(n,t);case 6:var r=dt,i=fn;dt=null,ar(e,t,n),dt=r,fn=i,dt!==null&&(fn?(e=dt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):dt.removeChild(n.stateNode));break;case 18:dt!==null&&(fn?(e=dt,n=n.stateNode,e.nodeType===8?Sc(e.parentNode,n):e.nodeType===1&&Sc(e,n),_s(e)):Sc(dt,n.stateNode));break;case 4:r=dt,i=fn,dt=n.stateNode.containerInfo,fn=!0,ar(e,t,n),dt=r,fn=i;break;case 0:case 11:case 14:case 15:if(!vt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&df(n,t,s),i=i.next}while(i!==r)}ar(e,t,n);break;case 1:if(!vt&&($i(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){We(n,t,a)}ar(e,t,n);break;case 21:ar(e,t,n);break;case 22:n.mode&1?(vt=(r=vt)||n.memoizedState!==null,ar(e,t,n),vt=r):ar(e,t,n);break;default:ar(e,t,n)}}function jg(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new UE),t.forEach(function(r){var i=YE.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function cn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:dt=a.stateNode,fn=!1;break e;case 3:dt=a.stateNode.containerInfo,fn=!0;break e;case 4:dt=a.stateNode.containerInfo,fn=!0;break e}a=a.return}if(dt===null)throw Error(F(160));Eb(o,s,i),dt=null,fn=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(u){We(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Cb(t,e),t=t.sibling}function Cb(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(cn(t,e),Cn(e),r&4){try{rs(3,e,e.return),Tu(3,e)}catch(w){We(e,e.return,w)}try{rs(5,e,e.return)}catch(w){We(e,e.return,w)}}break;case 1:cn(t,e),Cn(e),r&512&&n!==null&&$i(n,n.return);break;case 5:if(cn(t,e),Cn(e),r&512&&n!==null&&$i(n,n.return),e.flags&32){var i=e.stateNode;try{gs(i,"")}catch(w){We(e,e.return,w)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&Yw(i,o),jd(a,s);var u=jd(a,o);for(s=0;s<l.length;s+=2){var d=l[s],c=l[s+1];d==="style"?e_(i,c):d==="dangerouslySetInnerHTML"?Xw(i,c):d==="children"?gs(i,c):vp(i,d,c,u)}switch(a){case"input":Pd(i,o);break;case"textarea":Qw(i,o);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var p=o.value;p!=null?Ki(i,!!o.multiple,p,!1):f!==!!o.multiple&&(o.defaultValue!=null?Ki(i,!!o.multiple,o.defaultValue,!0):Ki(i,!!o.multiple,o.multiple?[]:"",!1))}i[Is]=o}catch(w){We(e,e.return,w)}}break;case 6:if(cn(t,e),Cn(e),r&4){if(e.stateNode===null)throw Error(F(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(w){We(e,e.return,w)}}break;case 3:if(cn(t,e),Cn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{_s(t.containerInfo)}catch(w){We(e,e.return,w)}break;case 4:cn(t,e),Cn(e);break;case 13:cn(t,e),Cn(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Jp=qe())),r&4&&jg(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(vt=(u=vt)||d,cn(t,e),vt=u):cn(t,e),Cn(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(W=e,d=e.child;d!==null;){for(c=W=d;W!==null;){switch(f=W,p=f.child,f.tag){case 0:case 11:case 14:case 15:rs(4,f,f.return);break;case 1:$i(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(w){We(r,n,w)}}break;case 5:$i(f,f.return);break;case 22:if(f.memoizedState!==null){Ug(c);continue}}p!==null?(p.return=f,W=p):Ug(c)}d=d.sibling}e:for(d=null,c=e;;){if(c.tag===5){if(d===null){d=c;try{i=c.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=c.stateNode,l=c.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Zw("display",s))}catch(w){We(e,e.return,w)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(w){We(e,e.return,w)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===e)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break e;for(;c.sibling===null;){if(c.return===null||c.return===e)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:cn(t,e),Cn(e),r&4&&jg(e);break;case 21:break;default:cn(t,e),Cn(e)}}function Cn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ib(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(gs(i,""),r.flags&=-33);var o=Mg(e);hf(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Mg(e);pf(e,a,s);break;default:throw Error(F(161))}}catch(l){We(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function BE(e,t,n){W=e,Ab(e)}function Ab(e,t,n){for(var r=(e.mode&1)!==0;W!==null;){var i=W,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||Oa;if(!s){var a=i.alternate,l=a!==null&&a.memoizedState!==null||vt;a=Oa;var u=vt;if(Oa=s,(vt=l)&&!u)for(W=i;W!==null;)s=W,l=s.child,s.tag===22&&s.memoizedState!==null?zg(i):l!==null?(l.return=s,W=l):zg(i);for(;o!==null;)W=o,Ab(o),o=o.sibling;W=i,Oa=a,vt=u}Fg(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,W=o):Fg(e)}}function Fg(e){for(;W!==null;){var t=W;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:vt||Tu(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!vt)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:dn(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&xg(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}xg(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&_s(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}vt||t.flags&512&&ff(t)}catch(f){We(t,t.return,f)}}if(t===e){W=null;break}if(n=t.sibling,n!==null){n.return=t.return,W=n;break}W=t.return}}function Ug(e){for(;W!==null;){var t=W;if(t===e){W=null;break}var n=t.sibling;if(n!==null){n.return=t.return,W=n;break}W=t.return}}function zg(e){for(;W!==null;){var t=W;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Tu(4,t)}catch(l){We(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){We(t,i,l)}}var o=t.return;try{ff(t)}catch(l){We(t,o,l)}break;case 5:var s=t.return;try{ff(t)}catch(l){We(t,s,l)}}}catch(l){We(t,t.return,l)}if(t===e){W=null;break}var a=t.sibling;if(a!==null){a.return=t.return,W=a;break}W=t.return}}var VE=Math.ceil,Ul=ir.ReactCurrentDispatcher,Yp=ir.ReactCurrentOwner,on=ir.ReactCurrentBatchConfig,ge=0,lt=null,Qe=null,ft=0,Ht=0,Hi=Vr(0),rt=0,Ns=null,hi=0,Ru=0,Qp=0,is=null,Dt=null,Jp=0,co=1/0,Un=null,zl=!1,mf=null,Er=null,La=!1,_r=null,Bl=0,os=0,gf=null,sl=-1,al=0;function Ct(){return ge&6?qe():sl!==-1?sl:sl=qe()}function Cr(e){return e.mode&1?ge&2&&ft!==0?ft&-ft:IE.transition!==null?(al===0&&(al=f_()),al):(e=be,e!==0||(e=window.event,e=e===void 0?16:w_(e.type)),e):1}function vn(e,t,n,r){if(50<os)throw os=0,gf=null,Error(F(185));Ks(e,n,r),(!(ge&2)||e!==lt)&&(e===lt&&(!(ge&2)&&(Ru|=n),rt===4&&hr(e,ft)),Ft(e,r),n===1&&ge===0&&!(t.mode&1)&&(co=qe()+500,Eu&&$r()))}function Ft(e,t){var n=e.callbackNode;II(e,t);var r=Sl(e,e===lt?ft:0);if(r===0)n!==null&&Ym(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ym(n),t===1)e.tag===0?SE(Bg.bind(null,e)):F_(Bg.bind(null,e)),_E(function(){!(ge&6)&&$r()}),n=null;else{switch(p_(r)){case 1:n=kp;break;case 4:n=c_;break;case 16:n=kl;break;case 536870912:n=d_;break;default:n=kl}n=Mb(n,Tb.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Tb(e,t){if(sl=-1,al=0,ge&6)throw Error(F(327));var n=e.callbackNode;if(Xi()&&e.callbackNode!==n)return null;var r=Sl(e,e===lt?ft:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Vl(e,r);else{t=r;var i=ge;ge|=2;var o=Nb();(lt!==e||ft!==t)&&(Un=null,co=qe()+500,ai(e,t));do try{WE();break}catch(a){Rb(e,a)}while(!0);Mp(),Ul.current=o,ge=i,Qe!==null?t=0:(lt=null,ft=0,t=rt)}if(t!==0){if(t===2&&(i=Vd(e),i!==0&&(r=i,t=yf(e,i))),t===1)throw n=Ns,ai(e,0),hr(e,r),Ft(e,qe()),n;if(t===6)hr(e,r);else{if(i=e.current.alternate,!(r&30)&&!$E(i)&&(t=Vl(e,r),t===2&&(o=Vd(e),o!==0&&(r=o,t=yf(e,o))),t===1))throw n=Ns,ai(e,0),hr(e,r),Ft(e,qe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(F(345));case 2:Qr(e,Dt,Un);break;case 3:if(hr(e,r),(r&130023424)===r&&(t=Jp+500-qe(),10<t)){if(Sl(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ct(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Qd(Qr.bind(null,e,Dt,Un),t);break}Qr(e,Dt,Un);break;case 4:if(hr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-yn(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=qe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*VE(r/1960))-r,10<r){e.timeoutHandle=Qd(Qr.bind(null,e,Dt,Un),r);break}Qr(e,Dt,Un);break;case 5:Qr(e,Dt,Un);break;default:throw Error(F(329))}}}return Ft(e,qe()),e.callbackNode===n?Tb.bind(null,e):null}function yf(e,t){var n=is;return e.current.memoizedState.isDehydrated&&(ai(e,t).flags|=256),e=Vl(e,t),e!==2&&(t=Dt,Dt=n,t!==null&&vf(t)),e}function vf(e){Dt===null?Dt=e:Dt.push.apply(Dt,e)}function $E(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!bn(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function hr(e,t){for(t&=~Qp,t&=~Ru,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-yn(t),r=1<<n;e[n]=-1,t&=~r}}function Bg(e){if(ge&6)throw Error(F(327));Xi();var t=Sl(e,0);if(!(t&1))return Ft(e,qe()),null;var n=Vl(e,t);if(e.tag!==0&&n===2){var r=Vd(e);r!==0&&(t=r,n=yf(e,r))}if(n===1)throw n=Ns,ai(e,0),hr(e,t),Ft(e,qe()),n;if(n===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Qr(e,Dt,Un),Ft(e,qe()),null}function Xp(e,t){var n=ge;ge|=1;try{return e(t)}finally{ge=n,ge===0&&(co=qe()+500,Eu&&$r())}}function mi(e){_r!==null&&_r.tag===0&&!(ge&6)&&Xi();var t=ge;ge|=1;var n=on.transition,r=be;try{if(on.transition=null,be=1,e)return e()}finally{be=r,on.transition=n,ge=t,!(ge&6)&&$r()}}function Zp(){Ht=Hi.current,Le(Hi)}function ai(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,wE(n)),Qe!==null)for(n=Qe.return;n!==null;){var r=n;switch(Dp(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Tl();break;case 3:lo(),Le(Mt),Le(bt),Vp();break;case 5:Bp(r);break;case 4:lo();break;case 13:Le(ze);break;case 19:Le(ze);break;case 10:jp(r.type._context);break;case 22:case 23:Zp()}n=n.return}if(lt=e,Qe=e=Ar(e.current,null),ft=Ht=t,rt=0,Ns=null,Qp=Ru=hi=0,Dt=is=null,ni!==null){for(t=0;t<ni.length;t++)if(n=ni[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}ni=null}return e}function Rb(e,t){do{var n=Qe;try{if(Mp(),rl.current=Fl,jl){for(var r=Ve.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}jl=!1}if(pi=0,ot=Ze=Ve=null,ns=!1,As=0,Yp.current=null,n===null||n.return===null){rt=1,Ns=t,Qe=null;break}e:{var o=e,s=n.return,a=n,l=t;if(t=ft,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Ag(s);if(p!==null){p.flags&=-257,Tg(p,s,a,o,t),p.mode&1&&Cg(o,u,t),t=p,l=u;var m=t.updateQueue;if(m===null){var w=new Set;w.add(l),t.updateQueue=w}else m.add(l);break e}else{if(!(t&1)){Cg(o,u,t),eh();break e}l=Error(F(426))}}else if(Fe&&a.mode&1){var C=Ag(s);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Tg(C,s,a,o,t),Op(uo(l,a));break e}}o=l=uo(l,a),rt!==4&&(rt=2),is===null?is=[o]:is.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var y=pb(o,l,t);bg(o,y);break e;case 1:a=l;var v=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Er===null||!Er.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=hb(o,a,t);bg(o,k);break e}}o=o.return}while(o!==null)}Db(n)}catch(S){t=S,Qe===n&&n!==null&&(Qe=n=n.return);continue}break}while(!0)}function Nb(){var e=Ul.current;return Ul.current=Fl,e===null?Fl:e}function eh(){(rt===0||rt===3||rt===2)&&(rt=4),lt===null||!(hi&268435455)&&!(Ru&268435455)||hr(lt,ft)}function Vl(e,t){var n=ge;ge|=2;var r=Nb();(lt!==e||ft!==t)&&(Un=null,ai(e,t));do try{HE();break}catch(i){Rb(e,i)}while(!0);if(Mp(),ge=n,Ul.current=r,Qe!==null)throw Error(F(261));return lt=null,ft=0,rt}function HE(){for(;Qe!==null;)Pb(Qe)}function WE(){for(;Qe!==null&&!gI();)Pb(Qe)}function Pb(e){var t=Lb(e.alternate,e,Ht);e.memoizedProps=e.pendingProps,t===null?Db(e):Qe=t,Yp.current=null}function Db(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=FE(n,t),n!==null){n.flags&=32767,Qe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{rt=6,Qe=null;return}}else if(n=jE(n,t,Ht),n!==null){Qe=n;return}if(t=t.sibling,t!==null){Qe=t;return}Qe=t=e}while(t!==null);rt===0&&(rt=5)}function Qr(e,t,n){var r=be,i=on.transition;try{on.transition=null,be=1,qE(e,t,n,r)}finally{on.transition=i,be=r}return null}function qE(e,t,n,r){do Xi();while(_r!==null);if(ge&6)throw Error(F(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(EI(e,o),e===lt&&(Qe=lt=null,ft=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||La||(La=!0,Mb(kl,function(){return Xi(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=on.transition,on.transition=null;var s=be;be=1;var a=ge;ge|=4,Yp.current=null,zE(e,n),Cb(n,e),fE(Gd),Il=!!Kd,Gd=Kd=null,e.current=n,BE(n),yI(),ge=a,be=s,on.transition=o}else e.current=n;if(La&&(La=!1,_r=e,Bl=i),o=e.pendingLanes,o===0&&(Er=null),_I(n.stateNode),Ft(e,qe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(zl)throw zl=!1,e=mf,mf=null,e;return Bl&1&&e.tag!==0&&Xi(),o=e.pendingLanes,o&1?e===gf?os++:(os=0,gf=e):os=0,$r(),null}function Xi(){if(_r!==null){var e=p_(Bl),t=on.transition,n=be;try{if(on.transition=null,be=16>e?16:e,_r===null)var r=!1;else{if(e=_r,_r=null,Bl=0,ge&6)throw Error(F(331));var i=ge;for(ge|=4,W=e.current;W!==null;){var o=W,s=o.child;if(W.flags&16){var a=o.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(W=u;W!==null;){var d=W;switch(d.tag){case 0:case 11:case 15:rs(8,d,o)}var c=d.child;if(c!==null)c.return=d,W=c;else for(;W!==null;){d=W;var f=d.sibling,p=d.return;if(Sb(d),d===u){W=null;break}if(f!==null){f.return=p,W=f;break}W=p}}}var m=o.alternate;if(m!==null){var w=m.child;if(w!==null){m.child=null;do{var C=w.sibling;w.sibling=null,w=C}while(w!==null)}}W=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,W=s;else e:for(;W!==null;){if(o=W,o.flags&2048)switch(o.tag){case 0:case 11:case 15:rs(9,o,o.return)}var y=o.sibling;if(y!==null){y.return=o.return,W=y;break e}W=o.return}}var v=e.current;for(W=v;W!==null;){s=W;var g=s.child;if(s.subtreeFlags&2064&&g!==null)g.return=s,W=g;else e:for(s=v;W!==null;){if(a=W,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Tu(9,a)}}catch(S){We(a,a.return,S)}if(a===s){W=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,W=k;break e}W=a.return}}if(ge=i,$r(),Pn&&typeof Pn.onPostCommitFiberRoot=="function")try{Pn.onPostCommitFiberRoot(bu,e)}catch{}r=!0}return r}finally{be=n,on.transition=t}}return!1}function Vg(e,t,n){t=uo(n,t),t=pb(e,t,1),e=Ir(e,t,1),t=Ct(),e!==null&&(Ks(e,1,t),Ft(e,t))}function We(e,t,n){if(e.tag===3)Vg(e,e,n);else for(;t!==null;){if(t.tag===3){Vg(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Er===null||!Er.has(r))){e=uo(n,e),e=hb(t,e,1),t=Ir(t,e,1),e=Ct(),t!==null&&(Ks(t,1,e),Ft(t,e));break}}t=t.return}}function KE(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ct(),e.pingedLanes|=e.suspendedLanes&n,lt===e&&(ft&n)===n&&(rt===4||rt===3&&(ft&130023424)===ft&&500>qe()-Jp?ai(e,0):Qp|=n),Ft(e,t)}function Ob(e,t){t===0&&(e.mode&1?(t=Ia,Ia<<=1,!(Ia&130023424)&&(Ia=4194304)):t=1);var n=Ct();e=Xn(e,t),e!==null&&(Ks(e,t,n),Ft(e,n))}function GE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ob(e,n)}function YE(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(t),Ob(e,n)}var Lb;Lb=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Mt.current)Ot=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ot=!1,ME(e,t,n);Ot=!!(e.flags&131072)}else Ot=!1,Fe&&t.flags&1048576&&U_(t,Pl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ol(e,t),e=t.pendingProps;var i=oo(t,bt.current);Ji(t,n),i=Hp(null,t,r,e,i,n);var o=Wp();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,jt(r)?(o=!0,Rl(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Up(t),i.updater=Au,t.stateNode=i,i._reactInternals=t,rf(t,r,e,n),t=af(null,t,r,!0,o,n)):(t.tag=0,Fe&&o&&Pp(t),St(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ol(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=JE(r),e=dn(r,e),i){case 0:t=sf(null,t,r,e,n);break e;case 1:t=Pg(null,t,r,e,n);break e;case 11:t=Rg(null,t,r,e,n);break e;case 14:t=Ng(null,t,r,dn(r.type,e),n);break e}throw Error(F(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),sf(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),Pg(e,t,r,i,n);case 3:e:{if(vb(t),e===null)throw Error(F(387));r=t.pendingProps,o=t.memoizedState,i=o.element,W_(e,t),Ll(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=uo(Error(F(423)),t),t=Dg(e,t,r,n,i);break e}else if(r!==i){i=uo(Error(F(424)),t),t=Dg(e,t,r,n,i);break e}else for(Wt=Sr(t.stateNode.containerInfo.firstChild),qt=t,Fe=!0,pn=null,n=$_(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(so(),r===i){t=Zn(e,t,n);break e}St(e,t,r,n)}t=t.child}return t;case 5:return q_(t),e===null&&ef(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,Yd(r,i)?s=null:o!==null&&Yd(r,o)&&(t.flags|=32),yb(e,t),St(e,t,s,n),t.child;case 6:return e===null&&ef(t),null;case 13:return wb(e,t,n);case 4:return zp(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ao(t,null,r,n):St(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),Rg(e,t,r,i,n);case 7:return St(e,t,t.pendingProps,n),t.child;case 8:return St(e,t,t.pendingProps.children,n),t.child;case 12:return St(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,Ne(Dl,r._currentValue),r._currentValue=s,o!==null)if(bn(o.value,s)){if(o.children===i.children&&!Mt.current){t=Zn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Gn(-1,n&-n),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),tf(o.return,n,t),a.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(F(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),tf(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}St(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Ji(t,n),i=sn(i),r=r(i),t.flags|=1,St(e,t,r,n),t.child;case 14:return r=t.type,i=dn(r,t.pendingProps),i=dn(r.type,i),Ng(e,t,r,i,n);case 15:return mb(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),ol(e,t),t.tag=1,jt(r)?(e=!0,Rl(t)):e=!1,Ji(t,n),fb(t,r,i),rf(t,r,i,n),af(null,t,r,!0,e,n);case 19:return _b(e,t,n);case 22:return gb(e,t,n)}throw Error(F(156,t.tag))};function Mb(e,t){return u_(e,t)}function QE(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rn(e,t,n,r){return new QE(e,t,n,r)}function th(e){return e=e.prototype,!(!e||!e.isReactComponent)}function JE(e){if(typeof e=="function")return th(e)?1:0;if(e!=null){if(e=e.$$typeof,e===_p)return 11;if(e===bp)return 14}return 2}function Ar(e,t){var n=e.alternate;return n===null?(n=rn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ll(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")th(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Oi:return li(n.children,i,o,t);case wp:s=8,i|=8;break;case Cd:return e=rn(12,n,t,i|2),e.elementType=Cd,e.lanes=o,e;case Ad:return e=rn(13,n,t,i),e.elementType=Ad,e.lanes=o,e;case Td:return e=rn(19,n,t,i),e.elementType=Td,e.lanes=o,e;case qw:return Nu(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Hw:s=10;break e;case Ww:s=9;break e;case _p:s=11;break e;case bp:s=14;break e;case dr:s=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return t=rn(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function li(e,t,n,r){return e=rn(7,e,r,t),e.lanes=n,e}function Nu(e,t,n,r){return e=rn(22,e,r,t),e.elementType=qw,e.lanes=n,e.stateNode={isHidden:!1},e}function Pc(e,t,n){return e=rn(6,e,null,t),e.lanes=n,e}function Dc(e,t,n){return t=rn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function XE(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pc(0),this.expirationTimes=pc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function nh(e,t,n,r,i,o,s,a,l){return e=new XE(e,t,n,a,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=rn(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Up(o),e}function ZE(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Di,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function jb(e){if(!e)return Mr;e=e._reactInternals;e:{if(Ii(e)!==e||e.tag!==1)throw Error(F(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(jt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(F(171))}if(e.tag===1){var n=e.type;if(jt(n))return j_(e,n,t)}return t}function Fb(e,t,n,r,i,o,s,a,l){return e=nh(n,r,!0,e,i,o,s,a,l),e.context=jb(null),n=e.current,r=Ct(),i=Cr(n),o=Gn(r,i),o.callback=t??null,Ir(n,o,i),e.current.lanes=i,Ks(e,i,r),Ft(e,r),e}function Pu(e,t,n,r){var i=t.current,o=Ct(),s=Cr(i);return n=jb(n),t.context===null?t.context=n:t.pendingContext=n,t=Gn(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Ir(i,t,s),e!==null&&(vn(e,i,s,o),nl(e,i,s)),s}function $l(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $g(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function rh(e,t){$g(e,t),(e=e.alternate)&&$g(e,t)}function eC(){return null}var Ub=typeof reportError=="function"?reportError:function(e){console.error(e)};function ih(e){this._internalRoot=e}Du.prototype.render=ih.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(F(409));Pu(e,t,null,null)};Du.prototype.unmount=ih.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mi(function(){Pu(null,e,null,null)}),t[Jn]=null}};function Du(e){this._internalRoot=e}Du.prototype.unstable_scheduleHydration=function(e){if(e){var t=g_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<pr.length&&t!==0&&t<pr[n].priority;n++);pr.splice(n,0,e),n===0&&v_(e)}};function oh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ou(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Hg(){}function tC(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=$l(s);o.call(u)}}var s=Fb(t,r,e,0,null,!1,!1,"",Hg);return e._reactRootContainer=s,e[Jn]=s.current,ks(e.nodeType===8?e.parentNode:e),mi(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=$l(l);a.call(u)}}var l=nh(e,0,!1,null,null,!1,!1,"",Hg);return e._reactRootContainer=l,e[Jn]=l.current,ks(e.nodeType===8?e.parentNode:e),mi(function(){Pu(t,l,n,r)}),l}function Lu(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var a=i;i=function(){var l=$l(s);a.call(l)}}Pu(t,s,e,i)}else s=tC(n,t,e,i,r);return $l(s)}h_=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Yo(t.pendingLanes);n!==0&&(Sp(t,n|1),Ft(t,qe()),!(ge&6)&&(co=qe()+500,$r()))}break;case 13:mi(function(){var r=Xn(e,1);if(r!==null){var i=Ct();vn(r,e,1,i)}}),rh(e,1)}};Ip=function(e){if(e.tag===13){var t=Xn(e,134217728);if(t!==null){var n=Ct();vn(t,e,134217728,n)}rh(e,134217728)}};m_=function(e){if(e.tag===13){var t=Cr(e),n=Xn(e,t);if(n!==null){var r=Ct();vn(n,e,t,r)}rh(e,t)}};g_=function(){return be};y_=function(e,t){var n=be;try{return be=e,t()}finally{be=n}};Ud=function(e,t,n){switch(t){case"input":if(Pd(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Iu(r);if(!i)throw Error(F(90));Gw(r),Pd(r,i)}}}break;case"textarea":Qw(e,n);break;case"select":t=n.value,t!=null&&Ki(e,!!n.multiple,t,!1)}};r_=Xp;i_=mi;var nC={usingClientEntryPoint:!1,Events:[Ys,Fi,Iu,t_,n_,Xp]},Mo={findFiberByHostInstance:ti,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rC={bundleType:Mo.bundleType,version:Mo.version,rendererPackageName:Mo.rendererPackageName,rendererConfig:Mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ir.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=a_(e),e===null?null:e.stateNode},findFiberByHostInstance:Mo.findFiberByHostInstance||eC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ma=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ma.isDisabled&&Ma.supportsFiber)try{bu=Ma.inject(rC),Pn=Ma}catch{}}Yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nC;Yt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!oh(t))throw Error(F(200));return ZE(e,t,null,n)};Yt.createRoot=function(e,t){if(!oh(e))throw Error(F(299));var n=!1,r="",i=Ub;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=nh(e,1,!1,null,null,n,!1,r,i),e[Jn]=t.current,ks(e.nodeType===8?e.parentNode:e),new ih(t)};Yt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=a_(t),e=e===null?null:e.stateNode,e};Yt.flushSync=function(e){return mi(e)};Yt.hydrate=function(e,t,n){if(!Ou(t))throw Error(F(200));return Lu(null,e,t,!0,n)};Yt.hydrateRoot=function(e,t,n){if(!oh(e))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Ub;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Fb(t,null,e,1,n??null,i,!1,o,s),e[Jn]=t.current,ks(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Du(t)};Yt.render=function(e,t,n){if(!Ou(t))throw Error(F(200));return Lu(null,e,t,!1,n)};Yt.unmountComponentAtNode=function(e){if(!Ou(e))throw Error(F(40));return e._reactRootContainer?(mi(function(){Lu(null,null,e,!1,function(){e._reactRootContainer=null,e[Jn]=null})}),!0):!1};Yt.unstable_batchedUpdates=Xp;Yt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ou(n))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return Lu(e,t,n,!1,r)};Yt.version="18.3.1-next-f1338f8080-20240426";function zb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zb)}catch(e){console.error(e)}}zb(),zw.exports=Yt;var iC=zw.exports,Wg=iC;Id.createRoot=Wg.createRoot,Id.hydrateRoot=Wg.hydrateRoot;const Bb=`App Lab provides the runtime:
- Alpine.js 3.14.9 is injected before app code runs. Alpine directives and the global Alpine object are available without adding a script tag.
- Tailwind utilities are compiled by App Lab when the document includes <meta name="app-lab-tailwind" content="enabled">.
- App-owned JSON data is stored through the injected AppLab helper.

Runtime rules:
- Do not use external scripts, imports, CDNs, remote images, cookies, localStorage, sessionStorage, direct IndexedDB, navigation, window.prompt, alert, or confirm.
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- Because of the sandbox origin, browser storage, cookies, same-origin assumptions, top-level navigation, and network-loaded dependencies are unavailable or unreliable; use AppLab APIs and inline code instead.
- To use Tailwind, include <meta name="app-lab-tailwind" content="enabled"> in <head>. Do not include Tailwind with <script src>, import, CDN, or package-manager syntax.
- Tailwind classes should appear literally in class attributes whenever possible, so App Lab can compile them on save. Avoid constructing class names dynamically in JavaScript.
- Do not include Alpine with <script src>, import, CDN, or package-manager syntax. Do not call Alpine.start(); App Lab starts Alpine after the body is parsed.
- Alpine runs in normal mode, so x-model, x-show comparisons, ternary :class values, method calls, and simple inline expressions are supported.
- Register non-trivial Alpine components inside document.addEventListener("alpine:init", () => Alpine.data("componentName", () => ({ ... }))), then use x-data="componentName".
- A small <style> block is fine for rules like [x-cloak], data-attribute selectors, and browser quirks; prefer Tailwind utilities for normal layout and styling.
- Use <dialog> for modal UI. Do not use native form submission; use button type="button" and explicit click handlers.
- Use x-text, textContent, and DOM APIs for user-controlled text. Do not put user content into x-html or innerHTML.
- Include a visible error area for unexpected runtime or save failures, but avoid noisy "Ready" or "Saved" status UI unless the user asks for it.
- Do not add a fixed top app bar unless the user asks for one; App Lab already shows the app title from the <title> tag in its surrounding frame.
- If implementing drag/drop, use pointer events and keep touch-action scoped to the drag handle.

Persistence API:
- Use the injected helper: await AppLab.getData(fallbackValue)
- Save app-owned JSON data with: await AppLab.saveData(jsonValue)
- Register live shared data updates with: AppLab.onDataChange((nextData, info) => { ... }).
- Keep persisted data separate from transient UI state. Persist records/settings; keep tabs, dialogs, focus, drafts, and open/collapsed state as UI state unless the user asks to persist them.
- Persist only JSON-compatible data: primitives, arrays, and plain objects. Do not save DOM nodes, functions, Events, Maps, Sets, Dates, class instances, or circular objects.
- Save a plain JSON snapshot, for example with JSON.parse(JSON.stringify(state)) or an explicit snapshot() method, before calling AppLab.saveData.
- Include schemaVersion in saved data and normalize loaded data defensively before the UI reads it.
- For lists or collections, prefer stable high-entropy id fields using crypto.randomUUID() or a fallback.
- In onDataChange, update the persisted data model without resetting transient UI state.
- If a local save is currently in flight, ignore or queue onDataChange so an older remote echo cannot overwrite the user's local edit.
- Current App Lab sync uses latest-local-wins for unresolved offline conflicts. Design shared apps so occasional full-state overwrites are acceptable.
- You can show unexpected runtime errors with AppLab.onError((message) => { ... }).
- Do not use raw postMessage unless the user explicitly asks for low-level App Lab runtime code.`;function oC(e){return`You are BuilderAI for the active App Lab app named "${e}".

You edit exactly one active app. You cannot access other apps, API keys, app data, sync configuration, or browser storage.

Agent rules:
- Use read_current_app_source before replacing source unless the user asks only a general question.
- Use read_recent_console_output when the request concerns an error or broken behavior.
- Use replace_current_app_source when the user asks for an app change.
- The replacement must be one complete single-file HTML document.
- Never ask a tool to operate on an app id; the host binds every tool to the active app.
- After replacing source, briefly summarize what changed.
- If clarification is genuinely required, ask before replacing source.

${Bb}`}function sC(e,t){return`You are helping me edit an App Lab sandbox app named "${e}".

Return one complete single-file HTML document. Use inline JavaScript, host-compiled Tailwind classes, Alpine.js, and minimal inline CSS only when Tailwind cannot express a rule.

${Bb}

Please rewrite the app as requested, returning only the complete HTML document.

Current app code:

\`\`\`html
${t}
\`\`\`
`}const aC="A richer example app that showcases App Lab capabilities through reusable UI and state patterns designed to inspire the user and AI.",lC=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${aC}">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Opinionated Board</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      dialog { margin: min(12vh, 4rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-stone-50 text-slate-950">
    <main class="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="opinionatedBoard" x-init="init()" x-cloak>
      <div
        class="min-h-0 overflow-y-auto"
        data-board-scroll
        x-ref="scrollViewport"
        @dragover.prevent="handleBoardDragOver($event)"
        @dragleave="handleBoardDragLeave($event)"
        @drop.prevent="dropNoteAtPointer($event)"
      >
        <!-- App Lab already renders the document title in its outer frame. -->
        <div class="mx-auto grid w-full max-w-3xl gap-4 px-4 py-5 pb-28 sm:px-6 sm:py-7">
          <section class="grid gap-4" aria-labelledby="notes-heading">
            <div class="flex items-end justify-between gap-3">
              <h2 class="text-xl font-black text-slate-950" id="notes-heading" x-text="ui.tab === 'active' ? 'Active notes' : 'Archived notes'"></h2>
              <p class="text-xs font-bold uppercase text-slate-500" x-text="countLabel"></p>
            </div>

            <div class="grid gap-3">
              <template x-for="note in visibleNotes" :key="note.id">
                <article
                  class="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-opacity sm:gap-3 sm:p-4"
                  :class="ui.draggedNoteId === note.id ? 'opacity-50' : ''"
                  :data-note-id="note.id"
                >
                  <button
                    class="absolute inset-0 z-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset"
                    type="button"
                    data-note-toggle
                    :aria-expanded="String(!isNoteCollapsed(note.id))"
                    :aria-label="(isNoteCollapsed(note.id) ? 'Expand details for ' : 'Collapse details for ') + note.title"
                    :title="isNoteCollapsed(note.id) ? 'Expand note' : 'Collapse note'"
                    @click="toggleNoteCollapsed(note.id)"
                  ></button>

                  <div class="relative z-10 grid w-9 justify-items-center gap-0.5">
                    <button
                      class="grid h-9 w-9 cursor-grab place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing"
                      type="button"
                      draggable="true"
                      :aria-label="'Drag ' + note.title + ' to reorder'"
                      title="Drag to reorder. Arrow keys also work."
                      x-show="ui.tab === 'active'"
                      @dragstart="startNoteDrag(note.id, $event)"
                      @dragend="endNoteDrag($event)"
                      @keydown.arrow-up.prevent="moveNote(note.id, -1)"
                      @keydown.arrow-down.prevent="moveNote(note.id, 1)"
                    >
                      <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle>
                        <circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle>
                        <circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle>
                      </svg>
                    </button>
                    <div class="grid" x-show="ui.tab === 'archived'">
                      <button
                        class="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                        type="button"
                        :aria-label="'Move ' + note.title + ' up'"
                        title="Move up"
                        :disabled="isFirstVisibleNote(note.id)"
                        @click="moveNote(note.id, -1)"
                      >
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline></svg>
                      </button>
                      <button
                        class="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                        type="button"
                        :aria-label="'Move ' + note.title + ' down'"
                        title="Move down"
                        :disabled="isLastVisibleNote(note.id)"
                        @click="moveNote(note.id, 1)"
                      >
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                    </div>
                  </div>

                  <div class="pointer-events-none relative z-10 min-w-0 py-1">
                    <h3 class="break-words text-base font-black text-slate-950" x-text="note.title"></h3>
                    <p class="mt-1 text-xs font-semibold text-slate-500" x-text="formatDate(note.updatedAt || note.createdAt)"></p>
                    <p class="mt-3 whitespace-pre-wrap break-words text-sm font-medium leading-6 text-slate-600" x-show="!isNoteCollapsed(note.id)" x-transition.opacity x-text="note.body"></p>
                  </div>

                  <div class="relative z-10 grid grid-cols-2 gap-0.5 sm:flex sm:items-center">
                      <button
                        class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        type="button"
                        :aria-expanded="String(!isNoteCollapsed(note.id))"
                        :aria-label="(isNoteCollapsed(note.id) ? 'Expand ' : 'Collapse ') + note.title"
                        :title="isNoteCollapsed(note.id) ? 'Expand note' : 'Collapse note'"
                        @click="toggleNoteCollapsed(note.id)"
                      >
                        <svg class="h-[18px] w-[18px]" data-direction="up" x-show="!isNoteCollapsed(note.id)" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline></svg>
                        <svg class="h-[18px] w-[18px]" data-direction="down" x-show="isNoteCollapsed(note.id)" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-violet-50 hover:text-violet-700" type="button" :aria-label="'Edit ' + note.title" title="Edit note" x-show="ui.tab === 'active'" @click="openNoteDialog(note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-emerald-50 hover:text-emerald-700" type="button" :aria-label="'Archive ' + note.title" title="Archive note" x-show="ui.tab === 'active'" @click="requestAction('archive', note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-emerald-50 hover:text-emerald-700" type="button" :aria-label="'Restore ' + note.title" title="Restore note" x-show="ui.tab === 'archived'" @click="restoreNote(note.id)">
                        <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 12a8 8 0 1 0 3-6.2M4 4v6h6"></path>
                        </svg>
                      </button>
                      <button class="grid h-9 w-9 place-items-center rounded-md text-xl leading-none text-slate-500 hover:bg-red-50 hover:text-red-700" type="button" :aria-label="'Delete ' + note.title" title="Delete note" x-show="ui.tab === 'archived'" @click="requestAction('delete', note.id)">&times;</button>
                  </div>
                </article>
              </template>

              <p class="rounded-lg border border-dashed border-slate-300 bg-white/70 p-7 text-center text-sm font-semibold text-slate-500" x-show="visibleNotes.length === 0">
                Nothing here yet.
              </p>
            </div>
          </section>

          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900" x-show="ui.error" role="alert">
            <p class="font-black">Something needs attention.</p>
            <p x-text="ui.error"></p>
          </div>
        </div>
      </div>

      <nav class="z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgb(15_23_42_/_6%)]" aria-label="Opinionated Board tabs">
        <div class="mx-auto grid max-w-3xl grid-cols-2">
          <button class="flex min-h-16 items-center justify-center gap-2 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'active' ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'active'">
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6M8 13h8M8 17h6"></path></svg>
            Active
          </button>
          <button class="flex min-h-16 items-center justify-center gap-2 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'archived' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'archived'">
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6"></path></svg>
            Archived
          </button>
        </div>
      </nav>

      <div class="pointer-events-none fixed inset-x-0 bottom-20 z-40 mx-auto w-full max-w-3xl px-4 sm:px-6" x-show="ui.tab === 'active'">
        <button class="pointer-events-auto ml-auto grid h-14 w-14 place-items-center rounded-full bg-violet-600 text-3xl font-light leading-none text-white shadow-lg shadow-slate-900/20 active:scale-[.96]" type="button" aria-label="New note" title="New note" @click="openNoteDialog()">+</button>
      </div>

      <dialog x-ref="noteDialog" class="w-[min(92vw,28rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-xl font-black" x-text="noteDialogTitle"></h2>
        <label class="mt-4 grid gap-2 text-sm font-bold text-slate-700">
          Title
          <input class="min-h-12 rounded-md border border-slate-300 bg-stone-50 px-3 text-base font-semibold outline-none focus:border-violet-500" autocomplete="off" x-model="ui.titleDraft" @keydown.enter.prevent="saveNoteDialog()">
        </label>
        <label class="mt-3 grid gap-2 text-sm font-bold text-slate-700">
          Note
          <textarea class="min-h-32 resize-y rounded-md border border-slate-300 bg-stone-50 px-3 py-3 text-base font-medium outline-none focus:border-violet-500" x-model="ui.bodyDraft"></textarea>
        </label>
        <div class="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.noteDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md bg-violet-600 px-4 text-sm font-black text-white" type="button" @click="saveNoteDialog()">Save</button>
        </div>
      </dialog>

      <!-- Archive and delete share one confirmation dialog and one action dispatcher. -->
      <dialog x-ref="confirmDialog" class="w-[min(88vw,24rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-lg font-black" x-text="confirmTitle"></h2>
        <p class="mt-2 text-sm font-medium leading-6 text-slate-600" x-text="confirmMessage"></p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.confirmDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md px-4 text-sm font-black text-white" :class="ui.pendingAction === 'delete' ? 'bg-red-700' : 'bg-emerald-700'" type="button" x-text="confirmLabel" @click="confirmAction()"></button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("opinionatedBoard", () => ({
          // Persist plain JSON only. Dialogs, drafts, and selected tabs remain transient.
          state: { schemaVersion: 1, notes: [] },
          ui: {
            tab: "active",
            collapsedNoteIds: [],
            draggedNoteId: null,
            editingId: null,
            titleDraft: "",
            bodyDraft: "",
            pendingAction: null,
            pendingNoteId: null,
            error: ""
          },
          saveInFlight: 0,
          queuedRemoteData: undefined,
          dragScrollFrame: null,
          dragScrollSpeed: 0,
          externalDropIndex: null,

          async init() {
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown App Lab error"); });
            AppLab.onDataChange((nextData) => {
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            const now = new Date().toISOString();
            return {
              schemaVersion: 1,
              notes: [
                {
                  id: this.createId(),
                  title: "Welcome to App Lab",
                  body: "This board showcases App Lab persistence, live updates, tabs, dialogs, and reusable actions for you (the user) and for the AI which will interact with it.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                },
                {
                  id: this.createId(),
                  title: "Build with AI",
                  body: "Press 'AI ✦' to copy the prompt+app source into an external AI chat, or work directly with BuilderAI after connecting your own provider in 'Settings'.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                },
                {
                  id: this.createId(),
                  title: "Share live updates",
                  body: "Connect a storage provider in 'Settings', then share the app to let other people update this board live.",
                  status: "active",
                  createdAt: now,
                  updatedAt: now,
                  archivedAt: null
                }
              ]
            };
          },

          applyData(data) {
            const fallback = this.defaultData();
            const source = data && typeof data === "object" ? data : fallback;
            const notes = Array.isArray(source.notes) ? source.notes : fallback.notes;
            this.state = {
              schemaVersion: 1,
              notes: notes.map((note) => ({
                id: typeof note.id === "string" ? note.id : this.createId(),
                title: typeof note.title === "string" && note.title.trim() ? note.title : "Untitled note",
                body: typeof note.body === "string" ? note.body : "",
                status: note.status === "archived" ? "archived" : "active",
                createdAt: typeof note.createdAt === "string" ? note.createdAt : new Date().toISOString(),
                updatedAt: typeof note.updatedAt === "string" ? note.updatedAt : null,
                archivedAt: typeof note.archivedAt === "string" ? note.archivedAt : null
              }))
            };
          },

          async saveState() {
            this.ui.error = "";
            this.saveInFlight += 1;
            try {
              await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
            } catch (error) {
              this.ui.error = error && error.message ? error.message : "Could not save data.";
            } finally {
              this.saveInFlight -= 1;
              if (this.saveInFlight === 0 && this.queuedRemoteData !== undefined) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = undefined;
                this.applyData(queued);
              }
            }
          },

          get visibleNotes() {
            return this.state.notes.filter((note) => note.status === this.ui.tab);
          },
          get countLabel() {
            return this.visibleNotes.length + (this.visibleNotes.length === 1 ? " note" : " notes");
          },
          get noteDialogTitle() {
            return this.ui.editingId ? "Edit note" : "New note";
          },
          get confirmTitle() {
            return this.ui.pendingAction === "delete" ? "Delete note?" : "Archive note?";
          },
          get confirmMessage() {
            return this.ui.pendingAction === "delete"
              ? "This permanently removes the note from the shared board."
              : "The note moves to Archived and can be restored later.";
          },
          get confirmLabel() {
            return this.ui.pendingAction === "delete" ? "Delete" : "Archive";
          },

          isNoteCollapsed(noteId) {
            return this.ui.collapsedNoteIds.includes(noteId);
          },
          toggleNoteCollapsed(noteId) {
            this.ui.collapsedNoteIds = this.isNoteCollapsed(noteId)
              ? this.ui.collapsedNoteIds.filter((id) => id !== noteId)
              : [...this.ui.collapsedNoteIds, noteId];
          },
          isFirstVisibleNote(noteId) {
            return this.visibleNotes[0]?.id === noteId;
          },
          isLastVisibleNote(noteId) {
            return this.visibleNotes[this.visibleNotes.length - 1]?.id === noteId;
          },
          moveNote(noteId, offset) {
            const visible = [...this.visibleNotes];
            const currentIndex = visible.findIndex((note) => note.id === noteId);
            const nextIndex = currentIndex + offset;
            if (currentIndex < 0 || nextIndex < 0 || nextIndex >= visible.length) return;
            const [moved] = visible.splice(currentIndex, 1);
            visible.splice(nextIndex, 0, moved);
            this.replaceVisibleOrder(visible);
            this.saveState();
          },
          startNoteDrag(noteId, event) {
            this.ui.draggedNoteId = noteId;
            this.externalDropIndex = null;
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", noteId);
          },
          handleBoardDragOver(event) {
            if (!this.ui.draggedNoteId) return;
            this.externalDropIndex = null;
            event.dataTransfer.dropEffect = "move";
            this.updateDragAutoScroll(event.clientY);
          },
          handleBoardDragLeave(event) {
            const nextTarget = event.relatedTarget;
            if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
            const cards = [...this.$refs.scrollViewport.querySelectorAll("[data-note-id]")];
            const viewportBounds = this.$refs.scrollViewport.getBoundingClientRect();
            const firstBounds = cards[0]?.getBoundingClientRect();
            const lastBounds = cards[cards.length - 1]?.getBoundingClientRect();
            this.externalDropIndex = event.clientY <= viewportBounds.top + 4
              ? 0
              : event.clientY >= viewportBounds.bottom - 4
                ? cards.length
                : firstBounds && event.clientY < firstBounds.top
                  ? 0
                  : lastBounds && event.clientY > lastBounds.bottom
                    ? cards.length
                    : null;
            this.stopDragAutoScroll();
          },
          updateDragAutoScroll(clientY) {
            const viewport = this.$refs.scrollViewport;
            const bounds = viewport.getBoundingClientRect();
            const threshold = Math.min(72, Math.max(40, bounds.height * 0.18));
            const maxSpeed = 14;
            let speed = 0;

            if (clientY < bounds.top + threshold) {
              speed = -maxSpeed * Math.min(1, (bounds.top + threshold - clientY) / threshold);
            } else if (clientY > bounds.bottom - threshold) {
              speed = maxSpeed * Math.min(1, (clientY - (bounds.bottom - threshold)) / threshold);
            }

            this.dragScrollSpeed = speed;
            if (speed === 0) {
              this.stopDragAutoScroll();
            } else if (this.dragScrollFrame === null) {
              this.dragScrollFrame = requestAnimationFrame(() => this.continueDragAutoScroll());
            }
          },
          continueDragAutoScroll() {
            if (!this.ui.draggedNoteId || this.dragScrollSpeed === 0) {
              this.dragScrollFrame = null;
              return;
            }
            this.$refs.scrollViewport.scrollTop += this.dragScrollSpeed;
            this.dragScrollFrame = requestAnimationFrame(() => this.continueDragAutoScroll());
          },
          stopDragAutoScroll() {
            if (this.dragScrollFrame !== null) cancelAnimationFrame(this.dragScrollFrame);
            this.dragScrollFrame = null;
            this.dragScrollSpeed = 0;
          },
          finishNoteDrag() {
            this.ui.draggedNoteId = null;
            this.externalDropIndex = null;
            this.stopDragAutoScroll();
          },
          endNoteDrag(event) {
            const draggedNoteId = this.ui.draggedNoteId;
            let dropIndex = this.externalDropIndex;
            if (draggedNoteId && dropIndex === null) {
              const bounds = this.$refs.scrollViewport.getBoundingClientRect();
              if (event.clientY >= bounds.bottom - 4) dropIndex = this.visibleNotes.length;
              if (event.clientY > 0 && event.clientY <= bounds.top + 4) dropIndex = 0;
            }
            this.finishNoteDrag();
            if (draggedNoteId && dropIndex !== null) this.placeDraggedNote(draggedNoteId, dropIndex);
          },
          getDropIndex(clientY) {
            const cards = [...this.$refs.scrollViewport.querySelectorAll("[data-note-id]")];
            const index = cards.findIndex((card) => {
              const bounds = card.getBoundingClientRect();
              return clientY < bounds.top + bounds.height / 2;
            });
            return index < 0 ? cards.length : index;
          },
          dropNoteAtPointer(event) {
            const draggedNoteId = this.ui.draggedNoteId || event.dataTransfer.getData("text/plain");
            const dropIndex = this.getDropIndex(event.clientY);
            this.finishNoteDrag();
            this.placeDraggedNote(draggedNoteId, dropIndex);
          },
          placeDraggedNote(draggedNoteId, dropIndex) {
            const visible = [...this.visibleNotes];
            const draggedIndex = visible.findIndex((note) => note.id === draggedNoteId);
            if (draggedIndex < 0) return;
            const [moved] = visible.splice(draggedIndex, 1);
            const adjustedIndex = Math.max(
              0,
              Math.min(visible.length, dropIndex - (draggedIndex < dropIndex ? 1 : 0))
            );
            visible.splice(adjustedIndex, 0, moved);
            if (visible.every((note, index) => note.id === this.visibleNotes[index]?.id)) return;
            this.replaceVisibleOrder(visible);
            this.saveState();
          },
          replaceVisibleOrder(visible) {
            let visibleIndex = 0;
            this.state.notes = this.state.notes.map((note) =>
              note.status === this.ui.tab ? visible[visibleIndex++] : note
            );
          },

          openNoteDialog(id) {
            const note = this.state.notes.find((candidate) => candidate.id === id);
            this.ui.editingId = note ? note.id : null;
            this.ui.titleDraft = note ? note.title : "";
            this.ui.bodyDraft = note ? note.body : "";
            this.$refs.noteDialog.showModal();
          },
          saveNoteDialog() {
            const title = this.ui.titleDraft.trim();
            const body = this.ui.bodyDraft.trim();
            if (!title || !body) return;
            const now = new Date().toISOString();
            const note = this.state.notes.find((candidate) => candidate.id === this.ui.editingId);
            if (note) {
              note.title = title;
              note.body = body;
              note.updatedAt = now;
            } else {
              this.state.notes.unshift({
                id: this.createId(),
                title,
                body,
                status: "active",
                createdAt: now,
                updatedAt: now,
                archivedAt: null
              });
            }
            this.$refs.noteDialog.close();
            this.saveState();
          },
          requestAction(action, noteId) {
            this.ui.pendingAction = action;
            this.ui.pendingNoteId = noteId;
            this.$refs.confirmDialog.showModal();
          },
          confirmAction() {
            const note = this.state.notes.find((candidate) => candidate.id === this.ui.pendingNoteId);
            if (this.ui.pendingAction === "delete") {
              this.state.notes = this.state.notes.filter((candidate) => candidate.id !== this.ui.pendingNoteId);
            } else if (note) {
              note.status = "archived";
              note.archivedAt = new Date().toISOString();
              note.updatedAt = note.archivedAt;
            }
            this.$refs.confirmDialog.close();
            this.ui.pendingAction = null;
            this.ui.pendingNoteId = null;
            this.saveState();
          },
          restoreNote(noteId) {
            const note = this.state.notes.find((candidate) => candidate.id === noteId);
            if (!note) return;
            note.status = "active";
            note.archivedAt = null;
            note.updatedAt = new Date().toISOString();
            this.saveState();
          },

          formatDate(value) {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
          },
          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "note_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    <\/script>
  </body>
</html>`,Vb="{{appName}}",Js="builtin-minimal-v1",uC="builtin-opinionated-v1",$b="A small example app that showcases App Lab's runtime, persistence, and live updates while leaving design and behavior to the user and AI.",Hb=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${$b}">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Minimal Board</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      dialog { margin: min(16vh, 6rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-slate-100 text-slate-950">
    <main class="grid h-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="minimalBoard" x-init="init()" x-cloak>
      <div class="min-h-0 overflow-y-auto">
        <div class="mx-auto grid w-full max-w-xl gap-3 px-4 py-5">
          <template x-for="note in state.notes" :key="note.id">
            <article class="relative rounded-lg border border-slate-200 bg-white p-4 pr-12 shadow-sm">
              <button
                class="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md text-xl leading-none text-slate-400 hover:bg-red-50 hover:text-red-700"
                type="button"
                :aria-label="'Delete note: ' + note.body.slice(0, 40)"
                title="Delete note"
                @click="requestDelete(note.id)"
              >&times;</button>
              <p class="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700" x-text="note.body"></p>
              <p class="mt-3 text-xs font-semibold text-slate-400" x-text="formatDate(note.createdAt)"></p>
            </article>
          </template>
        </div>
      </div>

      <section class="border-t border-slate-200 bg-white p-4" aria-label="Post a note">
        <div class="mx-auto grid w-full max-w-xl gap-2">
          <label class="sr-only" for="minimal-board-note">Note</label>
          <textarea
            class="min-h-24 resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-blue-600"
            id="minimal-board-note"
            placeholder="Write a note"
            x-model="ui.draft"
          ></textarea>
          <button
            class="min-h-11 rounded-md bg-blue-700 px-4 text-sm font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            :disabled="!ui.draft.trim()"
            @click="postNote()"
          >Post</button>
          <p class="text-sm font-semibold text-red-700" role="alert" x-show="ui.error" x-text="ui.error"></p>
        </div>
      </section>

      <dialog x-ref="deleteDialog" class="w-[min(88vw,24rem)] rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-lg font-bold">Delete note?</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">This permanently removes the note from the shared board.</p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700" type="button" @click="$refs.deleteDialog.close()">Cancel</button>
          <button class="min-h-10 rounded-md bg-red-700 px-4 text-sm font-bold text-white" type="button" @click="deleteNote()">Delete</button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("minimalBoard", () => ({
          state: { schemaVersion: 1, notes: [] },
          ui: { draft: "", pendingDeleteId: null, error: "" },
          saveInFlight: 0,
          queuedRemoteData: undefined,

          async init() {
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown App Lab error"); });
            AppLab.onDataChange((nextData) => {
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            const now = new Date().toISOString();
            return {
              schemaVersion: 1,
              notes: [
                {
                  id: this.createId(),
                  body: [
                    "Hi!",
                    "",
                    "This example app shows you (the user) and the AI, the most crucial parts of building apps in App Lab.",
                    "",
                    "Press 'AI ✦' to copy the prompt+app source into an external AI chat, or work directly with BuilderAI after connecting your own provider in 'Settings'.",
                    "",
                    "In 'Settings' you can also switch profile, add your own starter app, and adjust the AI agent's instructions.",
                    "",
                    "Happy building!",
                    "",
                    "/App Lab"
                  ].join("\\n"),
                  createdAt: now
                },
                {
                  id: this.createId(),
                  body: "PS. Connect a storage provider in 'Settings' to share your app with friends and collaborate in real-time.",
                  createdAt: now
                }
              ]
            };
          },

          applyData(data) {
            const fallback = this.defaultData();
            const source = data && typeof data === "object" ? data : fallback;
            const notes = Array.isArray(source.notes) ? source.notes : fallback.notes;
            this.state = {
              schemaVersion: 1,
              notes: notes.map((note) => ({
                id: typeof note.id === "string" ? note.id : this.createId(),
                body: typeof note.body === "string" ? note.body : "",
                createdAt: typeof note.createdAt === "string" ? note.createdAt : new Date().toISOString()
              }))
            };
          },

          postNote() {
            const body = this.ui.draft.trim();
            if (!body) return;
            this.state.notes = [
              ...this.state.notes,
              { id: this.createId(), body, createdAt: new Date().toISOString() }
            ];
            this.ui.draft = "";
            this.saveState();
          },

          requestDelete(noteId) {
            this.ui.pendingDeleteId = noteId;
            this.$refs.deleteDialog.showModal();
          },

          deleteNote() {
            this.state.notes = this.state.notes.filter((note) => note.id !== this.ui.pendingDeleteId);
            this.ui.pendingDeleteId = null;
            this.$refs.deleteDialog.close();
            this.saveState();
          },

          async saveState() {
            this.ui.error = "";
            this.saveInFlight += 1;
            try {
              await AppLab.saveData(JSON.parse(JSON.stringify(this.state)));
            } catch (error) {
              this.ui.error = error && error.message ? error.message : "Could not save data.";
            } finally {
              this.saveInFlight -= 1;
              if (this.saveInFlight === 0 && this.queuedRemoteData !== undefined) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = undefined;
                this.applyData(queued);
              }
            }
          },

          formatDate(value) {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
          },

          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "note_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    <\/script>
  </body>
</html>`;function cC(){const e=fC();return[{builtIn:!0,description:"Uses only the essential App Lab constraints, with a small starter that leaves the rest to you and the AI.",name:"Minimal",profileId:Js,promptTemplate:e,starterSource:Hb},{builtIn:!0,description:"Adds App Lab UI and data best practices, with a richer starter that demonstrates reusable patterns.",name:"Opinionated",profileId:uC,promptTemplate:`${e}

App Lab best practices:
- Build a polished, mobile-first app with clear visual hierarchy and efficient controls.
- Prefer a small, focused app over speculative features and leave room for the user to iterate.
- Use tabs, lists, dialogs, and collapsible details when they simplify the workflow.
- App Lab already displays the title from <title>; avoid repeating it in a fixed app header.
- Register non-trivial Alpine components with Alpine.data during alpine:init.
- Prefer literal Tailwind classes for layout and styling, with small inline styles only for browser quirks.
- Keep transient UI state separate from persisted records and settings.
- Include schemaVersion in persisted data, normalize loaded data, and give collection items stable high-entropy ids.
- Show unexpected runtime or save errors without adding noisy success-status UI.
- Design shared state so occasional latest-local-wins overwrites remain understandable to users.
- Follow the patterns demonstrated by the current starter source when they suit the user's request.`,starterSource:lC}]}function dC(e,t){return e.split(Vb).join(t)}function qg(e,t){return e.find(n=>n.profileId===t)??e.find(n=>n.profileId===Js)??e[0]??null}function fC(){return`You are BuilderAI, helping edit the active App Lab app named "${Vb}".

Return app changes as one complete single-file HTML document.

Runtime constraints:
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- Keep code and dependencies inline. Do not use external scripts, imports, CDNs, remote images, browser storage, cookies, or navigation.
- Do not use <form>, form submission, or buttons with type="submit". Use button type="button" and explicit click handlers.
- Alpine.js is injected by App Lab. Do not import it or call Alpine.start().
- To use Tailwind, include <meta name="app-lab-tailwind" content="enabled"> and keep utility classes literal in class attributes.
- Use x-text, textContent, or DOM APIs for user-controlled text, never x-html or innerHTML.

Persistence and live data:
- Load app-owned JSON with await AppLab.getData(fallbackValue).
- Save a plain JSON snapshot with await AppLab.saveData(jsonValue).
- App data may later be shared and update live. Subscribe with AppLab.onDataChange and do not immediately save remote updates back.
- Persist only JSON-compatible primitives, arrays, and plain objects.`}const Kg="app-lab-builder-preferences-v1",Wb={long:24,medium:12,short:4},sh={activeProfileId:Js,conversationMemory:"short"};function pC(e){return{async get(){try{const t=JSON.parse(e.getItem(Kg)??"null");if(!t||typeof t!="object"||Array.isArray(t))return Oc();const n=t;return n.version!==1||!Gg(n.conversationMemory)?Oc():{activeProfileId:hC(n.activeProfileId),conversationMemory:n.conversationMemory}}catch{return Oc()}},async save(t){if(!Gg(t.conversationMemory))throw new Error("Conversation memory is invalid.");const n=t.activeProfileId.trim();if(!n)throw new Error("Active Builder profile is invalid.");const r={activeProfileId:n,conversationMemory:t.conversationMemory};return e.setItem(Kg,JSON.stringify({...r,version:1})),r}}}function Oc(){return{...sh}}function Gg(e){return e==="short"||e==="medium"||e==="long"}function hC(e){return typeof e=="string"&&e.trim()?e.trim():Js}function qb(e){const t=e.trimStart().toLowerCase();return!/^<!doctype\s+html(?:\s[^>]*)?>/.test(t)&&!/^<html(?:\s|>)/.test(t)?{code:"INCOMPLETE_HTML",message:"Return one complete HTML document starting with <!doctype html> or <html>.",success:!1}:new DOMParser().parseFromString(e,"text/html").querySelector("form, button[type='submit'], input[type='submit']")?{code:"UNSUPPORTED_FORM",message:"Generated apps must use buttons with explicit click handlers instead of forms or submit controls.",success:!1}:null}function ah(){return{completionTokens:0,costUsd:0,promptTokens:0,reasoningTokens:0,totalTokens:0}}function Kb(e,t){return{completionTokens:e.completionTokens+t.completionTokens,costUsd:e.costUsd===null||t.costUsd===null?null:e.costUsd+t.costUsd,promptTokens:e.promptTokens+t.promptTokens,reasoningTokens:e.reasoningTokens+t.reasoningTokens,totalTokens:e.totalTokens+t.totalTokens}}const Yg=4,Gb=[{function:{description:"Read the active app's metadata and complete HTML source.",name:"read_current_app_source",parameters:{additionalProperties:!1,properties:{},type:"object"}},type:"function"},{function:{description:"Read recent console output from the active app.",name:"read_recent_console_output",parameters:{additionalProperties:!1,properties:{},type:"object"}},type:"function"},{function:{description:"Replace the active app with one complete single-file HTML document.",name:"replace_current_app_source",parameters:{additionalProperties:!1,properties:{sourceCode:{description:"Complete standalone HTML document for the active app.",type:"string"}},required:["sourceCode"],type:"object"}},type:"function"}],mC=Gb.map(({function:e})=>({description:e.description,name:e.name}));function gC(e,t){return{async runTurn(n){var u,d,c,f,p;const r=n.conversationMemory??sh.conversationMemory,i=n.messages.filter(m=>m.appId===n.appId).slice(-Wb[r]),o=[{content:n.profile?dC(n.profile.promptTemplate,n.appName):oC(n.appName),role:"system"},...i.map(m=>({content:m.content,role:m.role}))],s=await t();let a=ah();const l=[];for(let m=0;m<Yg;m+=1){(u=n.onActivity)==null||u.call(n,"Thinking..."),(d=n.onAssistantContent)==null||d.call(n,"");let w="";const C=await e.sendChat({config:s,messages:[...o],onContent:n.onAssistantContent,onReasoning:g=>{var k;w=g,(k=n.onReasoning)==null||k.call(n,[...l,g].filter(Boolean).join(`

`))},signal:n.signal,tools:Gb});w&&l.push(w);const y=C.message;a=Kb(a,C.usage),(c=n.onUsage)==null||c.call(n,C.usage),o.push(y);const v=y.tool_calls??[];if(v.length===0)return{content:((f=y.content)==null?void 0:f.trim())||"Done.",toolRounds:m,usage:a};(p=n.onAssistantContent)==null||p.call(n,"");for(const g of v){const k=await yC(g,n.tools,n.onActivity);o.push({content:JSON.stringify(k),name:g.function.name,role:"tool",tool_call_id:g.id})}}throw new Error(`BuilderAI stopped after ${Yg} tool rounds.`)}}}async function yC(e,t,n){const r=vC(e);if(!r)return Lc("INVALID_TOOL_ARGUMENTS",`Use one valid JSON object for ${e.function.name}.`);if(e.function.name==="read_current_app_source")return n==null||n("Reading current app..."),t.readCurrentAppSource();if(e.function.name==="read_recent_console_output")return n==null||n("Reading recent console output..."),{output:await t.readRecentConsoleOutput()};if(e.function.name==="replace_current_app_source"){if(typeof r.sourceCode!="string")return Lc("INVALID_TOOL_ARGUMENTS","replace_current_app_source requires one string field named sourceCode.");const i=qb(r.sourceCode);return i||(n==null||n("Applying app source..."),t.replaceCurrentAppSource(r.sourceCode))}return Lc("UNKNOWN_TOOL",`The tool ${e.function.name} is not available.`)}function vC(e){try{const t=JSON.parse(e.function.arguments||"{}");if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Expected an object.");return t}catch{return null}}function Lc(e,t){return{code:e,message:t,success:!1}}const Mc="app-lab-ai-config-v1";function wC(e){return{async clear(){e.removeItem(Mc)},async get(){try{const t=e.getItem(Mc);return t?_C(JSON.parse(t)):_f()}catch{return _f()}},async save(t){const n=wf(t);return e.setItem(Mc,JSON.stringify(n)),n}}}function wf(e){const t={apiKey:e.apiKey.trim(),model:e.model.trim()};if(!t.apiKey)throw new Error("OpenRouter API key is required.");if(!t.model)throw new Error("OpenRouter model id is required.");return t}function _C(e){if(!e||typeof e!="object")return _f();const t=e;return{apiKey:typeof t.apiKey=="string"?t.apiKey.trim():"",model:typeof t.model=="string"?t.model.trim():""}}function _f(){return{apiKey:"",model:""}}class Qg extends Error{constructor(t,n){super(t),this.name="ParseError",this.type=n.type,this.field=n.field,this.value=n.value,this.line=n.line}}function jc(e){}function bC(e){if(typeof e=="function")throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");const{onEvent:t=jc,onError:n=jc,onRetry:r=jc,onComment:i}=e;let o="",s=!0,a,l="",u="";function d(w){const C=s?w.replace(/^\xEF\xBB\xBF/,""):w,[y,v]=xC(`${o}${C}`);for(const g of y)c(g);o=v,s=!1}function c(w){if(w===""){p();return}if(w.startsWith(":")){i&&i(w.slice(w.startsWith(": ")?2:1));return}const C=w.indexOf(":");if(C!==-1){const y=w.slice(0,C),v=w[C+1]===" "?2:1,g=w.slice(C+v);f(y,g,w);return}f(w,"",w)}function f(w,C,y){switch(w){case"event":u=C;break;case"data":l=`${l}${C}
`;break;case"id":a=C.includes("\0")?void 0:C;break;case"retry":/^\d+$/.test(C)?r(parseInt(C,10)):n(new Qg(`Invalid \`retry\` value: "${C}"`,{type:"invalid-retry",value:C,line:y}));break;default:n(new Qg(`Unknown field "${w.length>20?`${w.slice(0,20)}…`:w}"`,{type:"unknown-field",field:w,value:C,line:y}));break}}function p(){l.length>0&&t({id:a,event:u||void 0,data:l.endsWith(`
`)?l.slice(0,-1):l}),a=void 0,l="",u=""}function m(w={}){o&&w.consume&&c(o),s=!0,a=void 0,l="",u="",o=""}return{feed:d,reset:m}}function xC(e){const t=[];let n="",r=0;for(;r<e.length;){const i=e.indexOf("\r",r),o=e.indexOf(`
`,r);let s=-1;if(i!==-1&&o!==-1?s=Math.min(i,o):i!==-1?i===e.length-1?s=-1:s=i:o!==-1&&(s=o),s===-1){n=e.slice(r);break}else{const a=e.slice(r,s);t.push(a),r=s+1,e[r-1]==="\r"&&e[r]===`
`&&r++}}return[t,n]}const kC="https://openrouter.ai/api/v1/chat/completions",SC="https://openrouter.ai/api/v1/key",IC="https://openrouter.ai/api/v1/models?supported_parameters=tools",EC=20*1024*1024;function CC(e={}){const t=e.fetchImpl??fetch;return{async sendChat(n){const r=wf(n.config),i=await t(kC,{body:JSON.stringify({messages:n.messages,model:r.model,parallel_tool_calls:!1,stream:!0,tool_choice:"auto",tools:n.tools}),headers:Jg(r,e.referer),method:"POST",signal:n.signal});if(!i.ok){const o=await Fc(i);Uc(i,o)}return AC(i,n)},async testConnection(n,r){const i=wf(n),o=Jg(i,e.referer),s=await t(SC,{headers:o,signal:r}),a=await Fc(s);Uc(s,a);const l=await t(IC,{headers:o,signal:r}),u=await Fc(l);Uc(l,u);const c=ui(u.data).map(at).filter(m=>!!m).find(m=>m.id===i.model);if(!c)throw new Error(`OpenRouter model '${i.model}' was not found among tool-capable models.`);if(!ui(c.supported_parameters).includes("tools"))throw new Error(`OpenRouter model '${i.model}' does not advertise tool support.`);const p=at(a.data);return{keyLabel:typeof(p==null?void 0:p.label)=="string"?p.label:null,model:i.model,modelName:typeof c.name=="string"?c.name:i.model}}}}async function AC(e,t){if(!e.body)throw new Error("OpenRouter returned an empty response stream.");let n="",r="",i=[],o="",s=OC(),a=0,l=!1,u=null;const d=new Map,c=bC({onError(m){u=new Error(`OpenRouter returned an invalid response stream: ${m.message}`)},onEvent(m){var k,S;if(l)return;if(m.data==="[DONE]"){l=!0;return}let w;try{w=at(JSON.parse(m.data))??{}}catch{u=new Error("OpenRouter returned invalid JSON in its response stream.");return}const C=at(w.error);if(C){u=new Error(typeof C.message=="string"?C.message:"OpenRouter streaming request failed.");return}at(w.usage)&&(s=MC(w.usage));const y=at(ui(w.choices)[0]),v=at(y==null?void 0:y.delta);if(!v)return;typeof v.content=="string"&&(n+=v.content,(k=t.onContent)==null||k.call(t,n)),typeof v.reasoning=="string"&&(r+=v.reasoning),i=RC(i,ui(v.reasoning_details));const g=PC(i,r);g!==o&&(o=g,(S=t.onReasoning)==null||S.call(t,o)),TC(d,ui(v.tool_calls))}}),f=e.body.getReader(),p=new TextDecoder;try{for(;;){const m=await f.read();if(m.done)break;if(a+=m.value.byteLength,a>EC)throw new Error("OpenRouter response exceeded the 20 MB stream limit.");if(c.feed(p.decode(m.value,{stream:!0})),u)throw u;if(l){await f.cancel().catch(()=>{});break}}if(!l&&(c.feed(p.decode()),c.reset({consume:!0}),u))throw u}catch(m){throw await f.cancel().catch(()=>{}),m}return{message:DC({content:n||null,reasoning:r||void 0,reasoning_details:i.length?i:void 0,role:"assistant",tool_calls:[...d.entries()].sort(([m],[w])=>m-w).map(([,m])=>m)}),usage:s}}function TC(e,t){t.forEach((n,r)=>{const i=at(n);if(!i)return;const o=typeof i.index=="number"&&Number.isInteger(i.index)?i.index:r,s=at(i.function),a=e.get(o)??{function:{arguments:"",name:""},id:"",type:"function"};typeof i.id=="string"&&(a.id||(a.id=i.id)),typeof(s==null?void 0:s.name)=="string"&&(a.function.name+=s.name),typeof(s==null?void 0:s.arguments)=="string"&&(a.function.arguments+=s.arguments),e.set(o,a)})}function RC(e,t){const n=e.map(r=>({...r}));for(const r of t){const i=at(r);if(!i)continue;const o=NC(n,i);if(o<0){n.push({...i});continue}const s=n[o],a={...s,...i};for(const l of["data","summary","text"])typeof i[l]=="string"&&(a[l]=`${typeof s[l]=="string"?s[l]:""}${i[l]}`);n[o]=a}return n}function NC(e,t){return typeof t.index=="number"?e.findIndex(n=>n.index===t.index&&n.type===t.type):typeof t.id=="string"?e.findIndex(n=>n.id===t.id&&n.type===t.type):-1}function PC(e,t){const n=e.filter(i=>i.type==="reasoning.text"&&typeof i.text=="string").map(i=>i.text).join(`

`);return n||e.filter(i=>i.type==="reasoning.summary"&&typeof i.summary=="string").map(i=>i.summary).join(`

`)||t}function Jg(e,t){const n={Authorization:`Bearer ${e.apiKey}`,"Content-Type":"application/json","X-Title":"App Lab"};return t&&(n["HTTP-Referer"]=t),n}async function Fc(e){const t=await e.json().catch(()=>null);return at(t)??{}}function Uc(e,t){const n=at(t.error);if(e.ok&&!n)return;const r=typeof(n==null?void 0:n.message)=="string"?n.message:`OpenRouter request failed with ${e.status}.`;throw new Error(r)}function DC(e){const t=at(e);if(!t||t.role!=="assistant")throw new Error("OpenRouter returned an invalid assistant response.");const n=ui(t.tool_calls).map(LC),r=typeof t.content=="string"?t.content:null,i=typeof t.reasoning=="string"?t.reasoning:void 0,o=ui(t.reasoning_details).map(at).filter(s=>!!s);if(!r&&n.length===0)throw new Error("OpenRouter returned an empty assistant response.");return{content:r,...i?{reasoning:i}:{},...o.length?{reasoning_details:o}:{},role:"assistant",...n.length?{tool_calls:n}:{}}}function OC(){return{completionTokens:0,costUsd:null,promptTokens:0,reasoningTokens:0,totalTokens:0}}function LC(e){const t=at(e),n=at(t==null?void 0:t.function);if(!t||typeof t.id!="string"||!n||typeof n.name!="string"||typeof n.arguments!="string")throw new Error("OpenRouter returned an invalid tool call.");return{function:{arguments:n.arguments,name:n.name},id:t.id,type:"function"}}function MC(e){const t=at(e),n=at(t==null?void 0:t.completion_tokens_details);return{completionTokens:ja(t==null?void 0:t.completion_tokens),costUsd:jC(t==null?void 0:t.cost),promptTokens:ja(t==null?void 0:t.prompt_tokens),reasoningTokens:ja(n==null?void 0:n.reasoning_tokens),totalTokens:ja(t==null?void 0:t.total_tokens)}}function ja(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jC(e){const t=typeof e=="number"?e:typeof e=="string"?Number(e):Number.NaN;return Number.isFinite(t)?t:null}function ui(e){return Array.isArray(e)?e:[]}function at(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:null}const Yb="app-lab-builder-profiles-v1";function FC(e,t){const n=t.builtInProfiles.map(o=>({...o,builtIn:!0})),r=new Set(n.map(o=>o.profileId)),i=t.createId??(()=>crypto.randomUUID());return{async create(o){const s=Fa(e,r);let a=i();for(;r.has(a)||s.some(u=>u.profileId===a);)a=i();const l=Xg(o,a);return zc(e,[...s,l]),l},async delete(o){if(r.has(o))throw new Error("Built-in Builder profiles cannot be deleted.");const s=Fa(e,r);zc(e,s.filter(a=>a.profileId!==o))},async list(){return[...n.map(o=>({...o})),...Fa(e,r)]},async update(o){if(r.has(o.profileId))throw new Error("Built-in Builder profiles cannot be changed.");const s=Fa(e,r),a=s.findIndex(u=>u.profileId===o.profileId);if(a<0)throw new Error("Builder profile not found.");const l=Xg(o,o.profileId);return s[a]=l,zc(e,s),l}}}function Xg(e,t){const n=e.name.trim();if(!n)throw new Error("Profile name is required.");return zC(e.starterSource),{builtIn:!1,description:e.description.trim(),name:n,profileId:t,promptTemplate:e.promptTemplate,starterSource:e.starterSource}}function Fa(e,t){try{const n=JSON.parse(e.getItem(Yb)??"null");if(!n||typeof n!="object"||Array.isArray(n))return[];const r=n;if(r.version!==1)return[];const i=r.profiles;if(!Array.isArray(i))return[];const o=new Set;return i.flatMap(s=>{const a=UC(s);return!a||t.has(a.profileId)||o.has(a.profileId)?[]:(o.add(a.profileId),[a])})}catch{return[]}}function UC(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;return typeof t.profileId!="string"||!t.profileId||typeof t.name!="string"||!t.name.trim()||typeof t.promptTemplate!="string"||typeof t.starterSource!="string"||!t.starterSource.trim()?null:{builtIn:!1,description:typeof t.description=="string"?t.description.trim():"",name:t.name.trim(),profileId:t.profileId,promptTemplate:t.promptTemplate,starterSource:t.starterSource}}function zC(e){if(!e.trim())throw new Error("Starter app is required.");const t=qb(e);if(t)throw new Error(`Starter app is invalid: ${t.message}`)}function zc(e,t){e.setItem(Yb,JSON.stringify({profiles:t,version:1}))}function BC(e={}){const t=e.storage??window.localStorage,n=wC(t),r=pC(t),i=FC(t,{builtInProfiles:cC()}),o=e.client??CC({referer:window.location.origin}),s=gC(o,n.get);return{clearConfig:n.clear,createBuilderProfile:i.create,deleteBuilderProfile:i.delete,getBuilderPreferences:r.get,getConfig:n.get,listBuilderProfiles:i.list,runBuilderTurn:s.runTurn,saveConfig:n.save,saveBuilderPreferences:r.save,testConnection:a=>o.testConnection(a),updateBuilderProfile:i.update}}function VC(){return{name:"Blank App",description:"Blank App Lab document.",sourceCode:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Blank App Lab document.">
    <title>Blank App</title>
  </head>
  <body></body>
</html>`}}function Zg(e,t={}){var o,s,a,l,u,d;const n=new DOMParser().parseFromString(e,"text/html"),r=(s=(o=n.querySelector("title"))==null?void 0:o.textContent)==null?void 0:s.trim(),i=(l=(a=$C(n))==null?void 0:a.getAttribute("content"))==null?void 0:l.trim();return{name:r||((u=t.name)==null?void 0:u.trim())||"Untitled App",description:i??((d=t.description)==null?void 0:d.trim())??""}}function $C(e){var t;for(const n of e.querySelectorAll("meta"))if(((t=n.getAttribute("name"))==null?void 0:t.toLowerCase())==="description")return n;return null}const ey=1048576;function lh(e){let t;try{t=JSON.stringify(e)}catch{throw new Error("App data must be JSON-serializable.")}if(t===void 0)throw new Error("App data must be JSON-serializable.");if(new TextEncoder().encode(t).byteLength>ey)throw new Error(`App data exceeds the ${ey} byte limit.`);return JSON.parse(t)}const HC="app-lab-v2",WC=1;function qC(){let e=null;function t(){return e??(e=KC()),e}async function n(){return(await Ua((await t()).transaction("apps_registry").objectStore("apps_registry").getAll())).map(({appId:p,name:m,description:w,updatedAt:C})=>({appId:p,name:m,description:w,updatedAt:C})).sort((p,m)=>p.name.localeCompare(m.name))}async function r(f){return await Ua((await t()).transaction("apps_registry").objectStore("apps_registry").get(f))??null}async function i(f){const p=new Date().toISOString(),m=Zg(f.sourceCode,{description:f.description,name:f.name}),w={appId:crypto.randomUUID(),compiledCss:f.compiledCss,compiledCssSourceHash:f.compiledCssSourceHash,name:m.name,description:m.description,sourceCode:f.sourceCode,createdAt:p,updatedAt:p};return await c("apps_registry",w),w}function o(){return i(VC())}async function s(f){const m=(await t()).transaction(["apps_registry","apps_data"],"readwrite");m.objectStore("apps_registry").delete(f),m.objectStore("apps_data").delete(f),await GC(m)}async function a(f){const p=await r(f.appId);if(!p)throw new Error(`App not found: ${f.appId}`);const m=f.sourceCode===void 0?{...p,...f,updatedAt:new Date().toISOString()}:{...p,...f,...Zg(f.sourceCode,{description:p.description,name:p.name}),updatedAt:new Date().toISOString()};return await c("apps_registry",m),m}async function l(f){return await c("apps_registry",f),f}async function u(f){const p=await Ua((await t()).transaction("apps_data").objectStore("apps_data").get(f));return(p==null?void 0:p.data)??null}async function d(f,p){if(!await r(f))throw new Error(`App not found: ${f}`);await c("apps_data",{appId:f,data:lh(p),updatedAt:new Date().toISOString()})}async function c(f,p){await Ua((await t()).transaction(f,"readwrite").objectStore(f).put(p))}return{createApp:i,createBlankApp:o,deleteApp:s,getApp:r,getAppData:u,listApps:n,saveAppData:d,updateApp:a,upsertApp:l}}function KC(){return new Promise((e,t)=>{const n=indexedDB.open(HC,WC);n.onupgradeneeded=()=>{const r=n.result;r.objectStoreNames.contains("apps_registry")||r.createObjectStore("apps_registry",{keyPath:"appId"}).createIndex("updatedAt","updatedAt"),r.objectStoreNames.contains("apps_data")||r.createObjectStore("apps_data",{keyPath:"appId"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function Ua(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error)})}function GC(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}const Xs="auth-v1",YC=32;function Qb(){return`app_lab_owner_${JC(YC)}`}function QC(e){const t=JSON.stringify(e);return JSON.stringify({rules:{".read":!1,".write":!1,appLabOwners:{$uid:{".read":"auth != null && auth.uid === $uid",".write":`auth != null && auth.uid === $uid && ((!data.exists() && newData.child('owner').val() === true && newData.child('setupSecret').val() === ${t}) || (data.exists() && data.child('owner').val() === true && newData.child('owner').val() === true) || (data.exists() && data.child('owner').val() === true && !newData.exists()))`,".validate":"newData.hasChildren(['owner','setupSecret']) && newData.child('owner').val() === true && newData.child('setupSecret').isString()"}},appLabRoomClaimTokens:{$roomId:{".read":!1,".write":"auth != null && root.child('appLabOwners').child(auth.uid).child('owner').val() === true",".validate":"newData.isString()"}},appLabRoomMembers:{$roomId:{$uid:{".read":!1,".write":"auth != null && auth.uid === $uid && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || (!data.exists() && newData.child('member').val() === true && newData.child('claimToken').val() === root.child('appLabRoomClaimTokens').child($roomId).val()) || (data.exists() && data.child('member').val() === true && newData.child('member').val() === true))",".validate":"newData.hasChildren(['member','claimToken']) && newData.child('member').val() === true && newData.child('claimToken').isString()"}}},appLabSyncRooms:{$roomId:{".read":"auth != null && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true)",".write":"auth != null && ((!data.exists() && newData.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && newData.exists() && root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true))",".validate":"newData.hasChildren(['encryptedPayload','readTokenHash','roomId','updatedAt','version','writeTokenHash']) && newData.child('roomId').val() === $roomId && newData.child('encryptedPayload').isString() && newData.child('readTokenHash').isString() && newData.child('updatedAt').isString() && newData.child('version').isNumber() && newData.child('writeTokenHash').isString()"}}}},null,2)}function JC(e){const t=crypto.getRandomValues(new Uint8Array(e));let n="";for(const r of t)n+=String.fromCharCode(r);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}const XC="app-lab-sync-queue-v1",ZC=1,Tn="sync_queue",eA=2*60*1e3;function tA(e){return`ensure-app-rooms:${e}`}function Jb(e){return`save-source:${e}`}function uh(e){return`save-app-data:${e}`}function nA(e){return`delete-owned-app:${e}`}function rA(e){return`save-workspace-manifest:${e}`}async function Bc(e,t){const n=tA(t),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"ensure-app-rooms",status:"pending",updatedAt:i};return await e.putItem(o),o}async function iA(e){const t=nA(e.app.appId),n=await e.store.getItem(t),r=new Date().toISOString(),i={app:e.app,appId:e.app.appId,attempts:(n==null?void 0:n.attempts)??0,createdAt:(n==null?void 0:n.createdAt)??r,id:t,kind:"delete-owned-app",status:"pending",syncRecord:e.syncRecord,updatedAt:r};return await e.store.putItem(i),i}async function oA(e,t){const n=Jb(t.appId),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t.appId,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-source",sourceCode:t.sourceCode,status:"pending",updatedAt:i};return await e.putItem(o),o}async function sA(e){const t=uh(e.appId),n=await e.store.getItem(t),r=new Date().toISOString(),i=(n==null?void 0:n.kind)==="save-app-data"?n:null,o={appId:e.appId,attempts:(i==null?void 0:i.attempts)??0,baseData:(i==null?void 0:i.baseData)??e.baseData,baseRemoteVersion:(i==null?void 0:i.baseRemoteVersion)??e.baseRemoteVersion,createdAt:(i==null?void 0:i.createdAt)??r,id:t,inFlightRevision:null,kind:"save-app-data",localData:e.data,localRevision:((i==null?void 0:i.localRevision)??0)+1,roomId:e.roomId,status:"pending",updatedAt:r};return await e.store.putItem(o),o}async function aA(e,t){const n=rA(t),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-workspace-manifest",status:"pending",updatedAt:i,workspaceId:t};return await e.putItem(o),o}async function Zs(e,t){const n={...t,status:"syncing",updatedAt:new Date().toISOString()};return await e.putItem(n),n}async function ea(e,t,n){const r={...t,attempts:t.attempts+1,lastError:n instanceof Error?n.message:"Unknown sync error.",status:"pending",updatedAt:new Date().toISOString()};return await e.putItem(r),r}function ta(e,t=new Date){return e.status==="syncing"&&t.getTime()-new Date(e.updatedAt).getTime()>eA}async function Xb(e,t){const n=await e.getItem(t.id);!n||n.updatedAt!==t.updatedAt||n.status!==t.status||await e.removeItem(t.id)}async function lA(e){const t=await e.listItems(),n=new Date().toISOString();await Promise.all(t.filter(r=>r.status==="syncing").map(r=>e.putItem({...r,status:"pending",updatedAt:n})))}function uA(){let e=null;function t(){return e??(e=cA()),e}return{async getItem(n){const r=await za((await t()).transaction(Tn).objectStore(Tn).get(n));return r?Vc(r):null},async listItems(){return(await za((await t()).transaction(Tn).objectStore(Tn).getAll())).map(Vc).sort(dA)},async putItem(n){await za((await t()).transaction(Tn,"readwrite").objectStore(Tn).put(Vc(n)))},async removeItem(n){await za((await t()).transaction(Tn,"readwrite").objectStore(Tn).delete(n))}}}function cA(){return new Promise((e,t)=>{const n=indexedDB.open(XC,ZC);n.onupgradeneeded=()=>{const r=n.result;if(!r.objectStoreNames.contains(Tn)){const i=r.createObjectStore(Tn,{keyPath:"id"});i.createIndex("status","status"),i.createIndex("kind","kind"),i.createIndex("updatedAt","updatedAt")}},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function za(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error)})}function dA(e,t){return e.createdAt.localeCompare(t.createdAt)||e.id.localeCompare(t.id)}function Vc(e){return JSON.parse(JSON.stringify(e))}const Hl="applab-invite=";function fA(e){return`${Hl}${_A(JSON.stringify(gA(e)))}`}function pA(e){const t=e.trim().replace(/^#/,""),n=t.startsWith(Hl)?t.slice(Hl.length):t;let r;try{r=JSON.parse(bA(n))}catch{throw new Error("App invite is not valid.")}return mA(r)}function hA(e){const t=e.trim().replace(/^#/,"");return t.startsWith(Hl)?pA(t):null}function mA(e){if(!vA(e))throw new Error("App invite is unsupported.");return yA(e)}function gA(e){var n,r;const t=(n=e.provider.firebaseConfig)==null?void 0:n.apiKey;if(!t)throw new Error("App invite is missing Firebase apiKey.");return{v:2,p:{m:"a",u:e.provider.databaseUrl,k:t,d:(r=e.provider.firebaseConfig)==null?void 0:r.authDomain},r:ty(e.dataRoom),s:ty(e.sourceRoom)}}function yA(e){const t={databaseURL:e.p.u};return e.p.k&&(t.apiKey=e.p.k),e.p.d&&(t.authDomain=e.p.d),{createdAt:new Date().toISOString(),dataRoom:ny(e.r),kind:"app-lab-invite",provider:{accessModel:"auth-v1",databaseUrl:e.p.u,firebaseConfig:t,provider:"firebase-rtdb"},schemaVersion:1,sourceRoom:ny(e.s)}}function ty(e){const t=e.readToken??e.accessToken,n=e.writeToken??e.accessToken;return t===n?[e.roomId,e.decryptSecret,t]:[e.roomId,e.decryptSecret,t,n]}function ny(e){const[t,n,r,i]=e,o=i??r;return{accessToken:o,decryptSecret:n,lastSeenVersion:0,readToken:r,roomId:t,writeToken:o}}function vA(e){if(!e||typeof e!="object")return!1;const t=e;return t.v===2&&wA(t.p)&&ry(t.s)&&ry(t.r)}function wA(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.u=="string"&&(!t.m||t.m==="a")&&typeof t.k=="string"&&(!t.d||typeof t.d=="string")}function ry(e){return Array.isArray(e)&&(e.length===3||e.length===4)&&e.every(t=>typeof t=="string")}function _A(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function bA(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return atob(n)}function xA(e,t=""){const n=e.trim(),r=n?kA(n):{},i=Ps(t||r.databaseURL||"");if(!i)throw new Error("Firebase Realtime Database URL is required.");return{...r,databaseURL:i}}function Ps(e){const t=e.trim();return t?t.replace(/\/+$/,""):""}function kA(e){if(!e.trim())return{};try{const t=JSON.parse(e);if(!t||typeof t!="object")throw new Error("Firebase config must be an object.");return Zb(t)}catch{return SA(e)}}function SA(e){const t={},n=e.replace(/\/\/.*$/gm,""),r=/([A-Za-z_$][\w$]*)\s*:\s*(['"])(.*?)\2\s*,?/g;let i;for(;i=r.exec(n);)t[i[1]]=i[3];return Zb(t)}function Zb(e){const t={};for(const n of["apiKey","appId","authDomain","databaseURL","measurementId","messagingSenderId","projectId","storageBucket"])typeof e[n]=="string"&&e[n].trim()&&(t[n]=n==="databaseURL"?Ps(e[n]):e[n].trim());return t}const ch=1,ex=32,IA=16,EA=32,CA=12;function $c(){const e=`room_access_${Hc(EA)}`;return{roomId:`room_${Hc(IA)}`,decryptSecret:Hc(ex),accessToken:e,readToken:e,writeToken:e,lastSeenVersion:0}}function pt(e){return e.readToken??e.accessToken}function On(e){return e.writeToken??e.accessToken}async function dh(e){const t=await nx(e.decryptSecret),n=crypto.getRandomValues(new Uint8Array(CA)),r=new TextEncoder().encode(JSON.stringify(lh(e.data))),i=await crypto.subtle.encrypt({name:"AES-GCM",iv:n,additionalData:tx(e)},t,r),o={schemaVersion:ch,algorithm:"AES-GCM",iv:bf(n),ciphertext:bf(new Uint8Array(i))};return JSON.stringify(o)}async function AA(e){const t=TA(e.encryptedPayload),n=await nx(e.decryptSecret),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:xf(t.iv),additionalData:tx(e)},n,xf(t.ciphertext));return lh(JSON.parse(new TextDecoder().decode(r)))}async function Mu(e){const{capability:t,snapshot:n}=e;if(n.roomId!==t.roomId)throw new Error("Snapshot room does not match capability.");if(n.version<t.lastSeenVersion)throw new Error("Remote room snapshot is older than the last seen version.");return AA({roomId:n.roomId,roomType:e.roomType,roomVersion:n.version,decryptSecret:t.decryptSecret,encryptedPayload:n.encryptedPayload})}function na(e,t){return{...e,lastSeenVersion:Math.max(e.lastSeenVersion,t.version)}}function tx(e){return new TextEncoder().encode(JSON.stringify({schemaVersion:ch,roomId:e.roomId,roomType:e.roomType,roomVersion:e.roomVersion}))}async function nx(e){const t=xf(e);if(t.byteLength!==ex)throw new Error("Room decrypt secret must be a 256-bit base64url key.");return crypto.subtle.importKey("raw",t,"AES-GCM",!1,["encrypt","decrypt"])}function TA(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Encrypted room payload is not valid JSON.")}if(!t||typeof t!="object"||t.schemaVersion!==ch||t.algorithm!=="AES-GCM"||typeof t.iv!="string"||typeof t.ciphertext!="string")throw new Error("Encrypted room payload has an unsupported shape.");return t}function Hc(e){return bf(crypto.getRandomValues(new Uint8Array(e)))}function bf(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function xf(e){if(!/^[A-Za-z0-9_-]+$/.test(e))throw new Error("Value is not valid base64url.");const t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}const kf=1,RA="app-lab-workspace-sync-v1";function NA(e){async function t(){return await e.load()??DA()}async function n(g){const k=await t(),S=new Date().toISOString();return g(k,S),k.updatedAt=S,await e.save(k),k}async function r(){return(await t()).storageProfile}async function i(g){const k=xA(g.firebaseConfigText??"",g.databaseUrl),S=k.databaseURL;if(!S)throw new Error("Storage database URL is required.");let _=null;if(await n((A,R)=>{var D,z;const O=A.storageProfile,E=g.accessModel??(O==null?void 0:O.accessModel)??Xs;OA(k),_={accessModel:E,profileId:(O==null?void 0:O.profileId)??`profile_${crypto.randomUUID()}`,provider:g.provider??"firebase-rtdb",displayName:((D=g.displayName)==null?void 0:D.trim())||(O==null?void 0:O.displayName)||"Firebase Realtime Database",databaseUrl:S,firebaseConfig:k,ownerSetupSecret:((z=g.ownerSetupSecret)==null?void 0:z.trim())||(O==null?void 0:O.ownerSetupSecret)||Qb(),createdAt:(O==null?void 0:O.createdAt)??R,updatedAt:R},A.storageProfile=_}),!_)throw new Error("Could not save storage profile.");return _}async function o(){await n(g=>{g.storageProfile=null})}async function s(){let g=null;if(await n(k=>{Sf(k),k.manifestRoom??(k.manifestRoom=$c()),g=k.manifestRoom}),!g)throw new Error("Could not create workspace manifest room.");return g}async function a(g){let k=null;if(await n(S=>{if(!S.manifestRoom)throw new Error("Workspace manifest room is not configured.");S.manifestRoom={...S.manifestRoom,lastSeenVersion:Math.max(S.manifestRoom.lastSeenVersion,g)},k=S.manifestRoom}),!k)throw new Error("Could not remember workspace manifest version.");return k}async function l(g){await e.save(jA(g))}async function u(g){let k=null;if(await n((S,_)=>{const A=Sf(S),R=S.apps[g];if((R==null?void 0:R.kind)==="owned"){k=R;return}if((R==null?void 0:R.kind)==="joined")throw new Error("Joined apps must be made into private copies before they can become owned apps.");if((R==null?void 0:R.kind)==="private-copy"){k={kind:"owned",appId:g,storageProfileId:R.storageProfileId,sourceRoom:R.sourceRoom,dataRoom:R.dataRoom,shareState:"private",createdAt:R.createdAt,updatedAt:_},S.apps[g]=k;return}k={kind:"owned",appId:g,storageProfileId:A.profileId,sourceRoom:$c(),dataRoom:$c(),shareState:"private",createdAt:_,updatedAt:_},S.apps[g]=k}),!k)throw new Error("Could not create owned app sync record.");return k}async function d(g){let k=null;if(await n((S,_)=>{k={kind:"joined",appId:g.appId,sourceProvider:g.sourceProvider,dataProvider:g.dataProvider??g.sourceProvider,sourceRoom:g.sourceRoom,dataRoom:g.dataRoom,importedAt:_},S.apps[g.appId]=k}),!k)throw new Error("Could not create joined app sync record.");return k}async function c(g){let k=null;if(await n((S,_)=>{const A=S.apps[g];if(!A)throw new Error("App must have sync rooms before it can be shared.");if(A.kind==="owned"){const O=oy(S,A.storageProfileId);A.shareState="invite-created",A.updatedAt=_,k=jo(A.sourceRoom,A.dataRoom,O,_);return}if(A.kind==="joined"){if(A.remoteDeletedAt)throw new Error("Deleted shared apps cannot be forwarded.");k=jo(A.sourceRoom,A.dataRoom,A.sourceProvider,_);return}const R=oy(S,A.storageProfileId);k=jo(A.sourceRoom,A.dataRoom,R,_)}),!k)throw new Error("Could not create app invite.");return k}async function f(g){const k=await t(),S=k.apps[g];if(!S)return null;if(S.kind==="joined")return jo(S.sourceRoom,S.dataRoom,S.sourceProvider,new Date().toISOString());const _=k.storageProfile;return!_||_.profileId!==S.storageProfileId?null:jo(S.sourceRoom,S.dataRoom,_,new Date().toISOString())}async function p(g){return(await t()).apps[g]??null}async function m(g){return iy((await t()).apps[g]??null)}async function w(g){const k=await t();return Object.fromEntries(g.map(S=>[S,iy(k.apps[S]??null)]))}async function C(g){let k=null;if(await n((S,_)=>{const A=S.apps[g.appId];if(!A)throw new Error(`App sync record not found: ${g.appId}`);k={...A,...g.sourceRoom?{sourceRoom:g.sourceRoom}:{},...g.dataRoom?{dataRoom:g.dataRoom}:{},..."updatedAt"in A?{updatedAt:_}:{}},S.apps[g.appId]=k}),!k)throw new Error("Could not remember app room versions.");return k}async function y(g,k){await n((S,_)=>{const A=S.apps[g];if(!A){S.deletedApps[g]={appId:g,deletedAt:k??_,reason:"remote-owner-delete"};return}A.kind==="joined"?S.apps[g]={...A,remoteDeletedAt:k??_}:(delete S.apps[g],S.deletedApps[g]={appId:g,deletedAt:k??_,reason:"remote-owner-delete"})})}async function v(g){await n((k,S)=>{delete k.apps[g],k.deletedApps[g]={appId:g,deletedAt:S,reason:"local-delete"}})}return{clearStorageProfile:o,configureStorageProfile:i,createInvite:c,ensureOwnedAppRooms:u,ensureWorkspaceManifestRoom:s,getAppSyncBadge:m,getAppSyncRecord:p,getInvite:f,getState:t,getStorageProfile:r,listAppSyncBadges:w,markJoinedApp:d,markRemoteAppDeleted:y,rememberAppRoomVersions:C,rememberWorkspaceManifestVersion:a,removeLocalAppSync:v,replaceState:l}}function PA(e=localStorage,t=RA){return{async load(){const n=e.getItem(t);return n?MA(n):null},async save(n){e.setItem(t,JSON.stringify(n))}}}function DA(){const e=new Date().toISOString();return{schemaVersion:kf,workspaceId:`workspace_${crypto.randomUUID()}`,storageProfile:null,manifestRoom:void 0,apps:{},deletedApps:{},updatedAt:e}}function iy(e){return e?e.kind==="joined"&&e.remoteDeletedAt?{kind:"needs-attention",label:"Deleted by owner",tone:"attention"}:e.kind==="joined"?{kind:"shared-with-me",label:"Shared with me",tone:"shared"}:e.kind==="private-copy"?{kind:"private-copy",label:"Private copy",tone:"good"}:e.shareState==="invite-created"?{kind:"shared-by-me",label:"Shared by me",tone:"shared"}:{kind:"backed-up",label:"Private",tone:"neutral"}:{kind:"local-only",label:"Private",tone:"neutral"}}function Sf(e){if(!e.storageProfile)throw new Error("Storage profile must be configured before apps can be backed up.");return e.storageProfile}function OA(e){if(!e.apiKey)throw new Error("Authenticated Firebase access requires the Firebase web app config with apiKey.")}function oy(e,t){const n=Sf(e);if(n.profileId!==t)throw new Error("App sync record belongs to a different storage profile.");return n}function jo(e,t,n,r){return{schemaVersion:1,kind:"app-lab-invite",provider:{accessModel:n.accessModel??Xs,provider:n.provider,databaseUrl:n.databaseUrl,firebaseConfig:LA(n)},sourceRoom:e,dataRoom:t,createdAt:r}}function LA(e){if(!("firebaseConfig"in e)||!e.firebaseConfig)return;const n={databaseURL:Ps(e.firebaseConfig.databaseURL||e.databaseUrl)};return e.firebaseConfig.apiKey&&(n.apiKey=e.firebaseConfig.apiKey),e.firebaseConfig.authDomain&&(n.authDomain=e.firebaseConfig.authDomain),n}function MA(e){try{const t=JSON.parse(e);return t.schemaVersion!==kf||typeof t.workspaceId!="string"?null:{schemaVersion:kf,workspaceId:t.workspaceId,storageProfile:FA(t.storageProfile),manifestRoom:UA(t.manifestRoom),apps:t.apps??{},deletedApps:t.deletedApps??{},updatedAt:typeof t.updatedAt=="string"?t.updatedAt:new Date().toISOString()}}catch{return null}}function jA(e){return JSON.parse(JSON.stringify(e))}function FA(e){var i;if(!e||typeof e!="object")return null;const t=e;if(typeof t.profileId!="string"||t.provider!=="firebase-rtdb"||typeof t.displayName!="string"||typeof t.databaseUrl!="string"||typeof t.createdAt!="string"||typeof t.updatedAt!="string")return null;const n=Ps(t.databaseUrl);return{accessModel:t.accessModel==="auth-v1"?"auth-v1":Xs,profileId:t.profileId,provider:t.provider,displayName:t.displayName,databaseUrl:n,firebaseConfig:(i=t.firebaseConfig)!=null&&i.databaseURL?{...t.firebaseConfig,databaseURL:Ps(t.firebaseConfig.databaseURL)}:{databaseURL:n},ownerSetupSecret:typeof t.ownerSetupSecret=="string"?t.ownerSetupSecret:void 0,createdAt:t.createdAt,updatedAt:t.updatedAt}}function UA(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.readToken=="string"?t.readToken:void 0,r=typeof t.writeToken=="string"?t.writeToken:void 0,i=typeof t.accessToken=="string"?t.accessToken:r??n;if(!(typeof t.roomId!="string"||typeof t.decryptSecret!="string"||typeof i!="string"||typeof n!="string"||typeof r!="string"||typeof t.lastSeenVersion!="number"))return{roomId:t.roomId,decryptSecret:t.decryptSecret,accessToken:i,readToken:n,writeToken:r,lastSeenVersion:t.lastSeenVersion}}class rx extends Error{constructor(t,n){super("Remote app was deleted by its owner."),this.appId=t,this.deletedAt=n}}async function zA(e){const t={app:{appId:e.app.appId,compiledCss:e.app.compiledCss,compiledCssSourceHash:e.app.compiledCssSourceHash,createdAt:e.app.createdAt,description:e.app.description,name:e.app.name,sourceCode:e.app.sourceCode,updatedAt:e.app.updatedAt},schemaVersion:1};await ql({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,roomType:"app-package"}),await ql({capability:e.syncRecord.dataRoom,data:e.appData,provider:e.provider,roomType:"app-data"})}async function If(e){const t={app:{appId:e.app.appId,compiledCss:e.app.compiledCss,compiledCssSourceHash:e.app.compiledCssSourceHash,createdAt:e.app.createdAt,description:e.app.description,name:e.app.name,sourceCode:e.app.sourceCode,updatedAt:e.app.updatedAt},schemaVersion:1};return fh({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,recreateIfMissing:e.syncRecord.kind!=="joined",roomType:"app-package"})}async function Ef(e){return fh({capability:e.syncRecord.dataRoom,data:e.appData,provider:e.provider,recreateIfMissing:e.syncRecord.kind!=="joined",roomType:"app-data"})}async function Wl(e){const t=await e.provider.loadRoom({readToken:pt(e.syncRecord.sourceRoom),roomId:e.syncRecord.sourceRoom.roomId}),n=await Mu({capability:e.syncRecord.sourceRoom,roomType:"app-package",snapshot:t});return{app:$A(n),sourceRoom:na(e.syncRecord.sourceRoom,t)}}async function ul(e){const t=await Wl(e),n=await e.provider.loadRoom({readToken:pt(e.syncRecord.dataRoom),roomId:e.syncRecord.dataRoom.roomId}),r=await Mu({capability:e.syncRecord.dataRoom,roomType:"app-data",snapshot:n});return{app:t.app,appData:r,dataRoom:na(e.syncRecord.dataRoom,n),sourceRoom:t.sourceRoom}}async function BA(e){e.app?await VA({app:e.app,provider:e.sourceProvider,syncRecord:e.syncRecord}):await sy(e.sourceProvider,e.syncRecord.sourceRoom),await sy(e.dataProvider,e.syncRecord.dataRoom)}async function VA(e){const t={appId:e.app.appId,deleted:!0,deletedAt:new Date().toISOString(),name:e.app.name,schemaVersion:1};return fh({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,recreateIfMissing:!0,roomType:"app-package"})}async function ql(e){const t=await dh({data:e.data,decryptSecret:e.capability.decryptSecret,roomId:e.capability.roomId,roomType:e.roomType,roomVersion:1});try{await e.provider.createRoom({encryptedPayload:t,readToken:pt(e.capability),roomId:e.capability.roomId,writeToken:On(e.capability)})}catch(n){if(!HA(n))throw n;await e.provider.loadRoom({readToken:pt(e.capability),roomId:e.capability.roomId})}}async function sy(e,t){try{await e.deleteRoom({roomId:t.roomId,writeToken:On(t)})}catch(n){if(!Cf(n))throw n}}async function fh(e){let t=e.capability.lastSeenVersion;if(t===0)try{t=(await e.provider.loadRoom({readToken:pt(e.capability),roomId:e.capability.roomId})).version}catch(i){if(!Cf(i))throw i;await ql(e);const o=await e.provider.loadRoom({readToken:pt(e.capability),roomId:e.capability.roomId});return ay(e.capability,o)}const n=await dh({data:e.data,decryptSecret:e.capability.decryptSecret,roomId:e.capability.roomId,roomType:e.roomType,roomVersion:t+1});let r;try{r=await e.provider.saveRoom({encryptedPayload:n,expectedVersion:t,roomId:e.capability.roomId,writeToken:On(e.capability)})}catch(i){if(!e.recreateIfMissing||!Cf(i))throw i;return await ql(e),r=await e.provider.loadRoom({readToken:pt(e.capability),roomId:e.capability.roomId}),ay(e.capability,r)}return na(e.capability,r)}function ay(e,t){return{...e,lastSeenVersion:t.version}}function $A(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("App package payload is malformed.");const t=e;if(t.deleted===!0)throw new rx(typeof t.appId=="string"?t.appId:"unknown",typeof t.deletedAt=="string"?t.deletedAt:new Date().toISOString());const n=t.app;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("App package is missing app metadata.");const r=n;if(typeof r.appId!="string"||typeof r.description!="string"||typeof r.name!="string"||typeof r.sourceCode!="string"||typeof r.updatedAt!="string")throw new Error("App package app metadata is unsupported.");return{appId:r.appId,compiledCss:typeof r.compiledCss=="string"?r.compiledCss:void 0,compiledCssSourceHash:typeof r.compiledCssSourceHash=="string"?r.compiledCssSourceHash:void 0,createdAt:typeof r.createdAt=="string"?r.createdAt:r.updatedAt,description:r.description,name:r.name,sourceCode:r.sourceCode,updatedAt:r.updatedAt}}function HA(e){return e instanceof Error&&/already exists/i.test(e.message)}function Cf(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function Af(e){return e instanceof rx}async function WA(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-app-data"&&(n.status==="syncing"&&!ta(n)||await qA(e,n))}async function qA(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getAppSyncRecord(t.appId);if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.createProviderForSyncRecord(r);if(!i)throw new Error("Storage profile is required before app data can sync.");const o=await KA({item:t,provider:i,syncRecord:r});await e.syncRegistry.rememberAppRoomVersions({appId:t.appId,dataRoom:o}),await Xb(e.queueStore,n)}catch(r){await ea(e.queueStore,n,r)}}async function KA(e){try{return await Ef({appData:e.item.localData,provider:e.provider,syncRecord:e.syncRecord})}catch(t){if(!YA(t))throw t;const n=await GA(e.provider,e.syncRecord.dataRoom);return Ef({appData:e.item.localData,provider:e.provider,syncRecord:{...e.syncRecord,dataRoom:n}})}}async function GA(e,t){const n=await e.loadRoom({readToken:pt(t),roomId:t.roomId});return{...t,lastSeenVersion:n.version}}function YA(e){return e instanceof Error&&/version conflict/i.test(e.message)}async function QA(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="delete-owned-app"&&(n.status==="syncing"&&!ta(n)||await JA(e,n))}async function JA(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getStorageProfile();if(!r)throw new Error("Storage profile is required before remote app rooms can be deleted.");const i=e.createProviderFromStorageProfile(r),o=await ly(i,t.syncRecord.sourceRoom),s=await ly(i,t.syncRecord.dataRoom);await BA({app:t.app,dataProvider:i,sourceProvider:i,syncRecord:{...t.syncRecord,dataRoom:s,sourceRoom:o}}),await e.queueStore.removeItem(t.id)}catch(r){await ea(e.queueStore,n,r)}}async function ly(e,t){try{const n=await e.loadRoom({readToken:pt(t),roomId:t.roomId});return{...t,lastSeenVersion:n.version}}catch(n){if(!XA(n))throw n;return{...t,lastSeenVersion:0}}}function XA(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}async function ZA(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="ensure-app-rooms"&&(n.status==="syncing"&&!ta(n)||await eT(e,n))}async function eT(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getStorageProfile();if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.core.getApp(t.appId);if(!i){await e.queueStore.removeItem(t.id);return}const o=await e.syncRegistry.getAppSyncRecord(t.appId);if(!o||o.kind==="joined"){await e.queueStore.removeItem(t.id);return}const s=e.createProviderFromStorageProfile(r);await zA({app:i,appData:await e.core.getAppData(i.appId),provider:s,syncRecord:o});const a=await ul({provider:s,syncRecord:o});await e.syncRegistry.rememberAppRoomVersions({appId:i.appId,dataRoom:a.dataRoom,sourceRoom:a.sourceRoom}),await e.queueStore.removeItem(t.id)}catch(r){await ea(e.queueStore,n,r)}}async function tT(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-source"&&(n.status==="syncing"&&!ta(n)||await nT(e,n))}async function nT(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.core.getApp(t.appId);if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.syncRegistry.getAppSyncRecord(t.appId);if(!i){await e.queueStore.removeItem(t.id);return}const o=await e.createProviderForSyncRecord(i);if(!o)throw new Error("Storage profile is required before source can sync.");const s=await rT({app:r,provider:o,syncRecord:i});if(s.kind==="deleted"){await iT(e,t,i,s.deletedAt);return}await e.syncRegistry.rememberAppRoomVersions({appId:r.appId,sourceRoom:s.sourceRoom}),await Xb(e.queueStore,n)}catch(r){await ea(e.queueStore,n,r)}}async function rT(e){try{return{kind:"saved",sourceRoom:await If(e)}}catch(t){if(!oT(t))throw t;try{const n=await Wl({provider:e.provider,syncRecord:e.syncRecord});return{kind:"saved",sourceRoom:await If({...e,syncRecord:{...e.syncRecord,sourceRoom:n.sourceRoom}})}}catch(n){if(Af(n))return{kind:"deleted",deletedAt:n.deletedAt};throw n}}}async function iT(e,t,n,r){n.kind!=="joined"&&await e.core.deleteApp(t.appId),await e.syncRegistry.markRemoteAppDeleted(t.appId,r),await e.queueStore.removeItem(t.id),await e.queueStore.removeItem(uh(t.appId))}function oT(e){return e instanceof Error&&/room version conflict/i.test(e.message)}const ph=1;function sT(e){if(!e.storageProfile)throw new Error("Storage profile is required before exporting recovery material.");if(!e.manifestRoom)throw new Error("Workspace manifest room is required before exporting recovery material.");return{createdAt:new Date().toISOString(),kind:"app-lab-workspace-recovery",manifestRoom:e.manifestRoom,provider:{accessModel:e.storageProfile.accessModel,databaseUrl:e.storageProfile.databaseUrl,firebaseConfig:e.storageProfile.firebaseConfig,ownerSetupSecret:e.storageProfile.ownerSetupSecret,profileId:e.storageProfile.profileId,provider:e.storageProfile.provider},schemaVersion:ph,workspaceState:sx(e),workspaceId:e.workspaceId}}function aT(e){return`applab-recovery:${ST(new TextEncoder().encode(JSON.stringify(e)))}`}function lT(e){const t=e.trim().replace(/^applab-recovery:/,"");let n;try{n=JSON.parse(new TextDecoder().decode(IT(t)))}catch{throw new Error("Workspace recovery material is not valid.")}return bT(n)}async function uT(e){const t=gh(e.state),n=t.lastSeenVersion===0?await fT(e.provider,t,e.state):await ox(e.provider,t,e.state,t.lastSeenVersion);return{...n.state,manifestRoom:{...n.state.manifestRoom??t,lastSeenVersion:n.snapshot.version},updatedAt:new Date().toISOString()}}async function cT(e){const t=e.recoveryMaterial.workspaceState?uy(ax(e.recoveryMaterial.workspaceState),e.recoveryMaterial):null;let n=null;try{const r=await e.provider.loadRoom({readToken:pt(e.recoveryMaterial.manifestRoom),roomId:e.recoveryMaterial.manifestRoom.roomId});n=await ra({snapshot:r,state:{apps:{},deletedApps:{},manifestRoom:e.recoveryMaterial.manifestRoom,schemaVersion:ph,storageProfile:null,updatedAt:e.recoveryMaterial.createdAt,workspaceId:e.recoveryMaterial.workspaceId}})}catch(r){if(t)return t;throw r}return uy(t?hh(n,t):n,e.recoveryMaterial)}async function dT(e){const t=gh(e.state),n=await e.provider.loadRoom({readToken:pt(t),roomId:t.roomId});return ra({snapshot:n,state:e.state})}async function ra(e){const t=gh(e.state),n=await Mu({capability:t,roomType:"workspace-manifest",snapshot:e.snapshot}),r=ax(n);return{...r,manifestRoom:na(t,e.snapshot),storageProfile:r.storageProfile??e.state.storageProfile}}function uy(e,t){var n,r,i,o,s;return{...e,manifestRoom:e.manifestRoom??t.manifestRoom,storageProfile:{accessModel:t.provider.accessModel??((n=e.storageProfile)==null?void 0:n.accessModel)??Xs,createdAt:((r=e.storageProfile)==null?void 0:r.createdAt)??t.createdAt,databaseUrl:t.provider.databaseUrl,displayName:((i=e.storageProfile)==null?void 0:i.displayName)??"Firebase Realtime Database",firebaseConfig:t.provider.firebaseConfig,ownerSetupSecret:t.provider.ownerSetupSecret??((o=e.storageProfile)==null?void 0:o.ownerSetupSecret),profileId:t.provider.profileId??((s=e.storageProfile)==null?void 0:s.profileId)??`profile_${crypto.randomUUID()}`,provider:t.provider.provider,updatedAt:new Date().toISOString()}}}async function fT(e,t,n){try{return await ix(e,t,n)}catch(r){if(!(r instanceof Error)||!/already exists/i.test(r.message))throw r;const i=await e.loadRoom({readToken:pt(t),roomId:t.roomId}),o=await ra({snapshot:i,state:n});return ox(e,t,hh(o,n),i.version)}}async function ix(e,t,n){return{snapshot:await e.createRoom({encryptedPayload:await cl(t,n,1),readToken:pt(t),roomId:t.roomId,writeToken:On(t)}),state:n}}async function ox(e,t,n,r){try{return{snapshot:await e.saveRoom({encryptedPayload:await cl(t,n,r+1),expectedVersion:r,roomId:t.roomId,writeToken:On(t)}),state:n}}catch(i){if(xT(i))return ix(e,t,n);if(!kT(i))throw i;const o=await e.loadRoom({readToken:pt(t),roomId:t.roomId});if(o.version<r)return{snapshot:await e.saveRoom({encryptedPayload:await cl(t,n,o.version+1),expectedVersion:o.version,roomId:t.roomId,writeToken:On(t)}),state:n};const s=await ra({snapshot:o,state:n}),a=hh(s,n);return{snapshot:await e.saveRoom({encryptedPayload:await cl(t,a,o.version+1),expectedVersion:o.version,roomId:t.roomId,writeToken:On(t)}),state:a}}}function hh(e,t){if(e.workspaceId!==t.workspaceId)throw new Error("Workspace manifest belongs to a different workspace.");const n=pT(e.deletedApps,t.deletedApps),r={};for(const i of[...Object.values(e.apps),...Object.values(t.apps)])n[i.appId]||(r[i.appId]=mT(r[i.appId],i));return{apps:r,deletedApps:n,manifestRoom:_T(e.manifestRoom,t.manifestRoom),schemaVersion:e.schemaVersion,storageProfile:e.storageProfile??t.storageProfile,updatedAt:mh(e.updatedAt,t.updatedAt),workspaceId:e.workspaceId}}function pT(e,t){const n={};for(const r of[...Object.values(e),...Object.values(t)])n[r.appId]=hT(n[r.appId],r);return n}function hT(e,t){return!e||t.deletedAt>e.deletedAt||t.deletedAt===e.deletedAt&&t.reason==="remote-owner-delete"?t:e}function mT(e,t){if(!e)return t;const n=wT(t,e)?t:e,r=n===t?e:t;return n.kind==="owned"&&r.kind==="owned"?gT(n,r):n.kind==="private-copy"&&r.kind==="private-copy"?yT(n,r):n.kind==="joined"&&r.kind==="joined"?vT(n,r):n}function gT(e,t){return{...e,dataRoom:gi(e.dataRoom,t.dataRoom),shareState:e.shareState==="invite-created"||t.shareState==="invite-created"?"invite-created":"private",sourceRoom:gi(e.sourceRoom,t.sourceRoom),updatedAt:mh(e.updatedAt,t.updatedAt)}}function yT(e,t){return{...e,dataRoom:gi(e.dataRoom,t.dataRoom),sourceRoom:gi(e.sourceRoom,t.sourceRoom),updatedAt:mh(e.updatedAt,t.updatedAt)}}function vT(e,t){return{...e,cachedAt:Kl(e.cachedAt,t.cachedAt),dataRoom:gi(e.dataRoom,t.dataRoom),remoteDeletedAt:Kl(e.remoteDeletedAt,t.remoteDeletedAt),sourceRoom:gi(e.sourceRoom,t.sourceRoom)}}function wT(e,t){const n=cy(e),r=cy(t);return n!==r?n>r:dy(e)>dy(t)}function cy(e){return Math.max(e.sourceRoom.lastSeenVersion,e.dataRoom.lastSeenVersion)}function dy(e){return"updatedAt"in e?e.updatedAt:Kl(e.remoteDeletedAt,e.cachedAt,e.importedAt)??""}function _T(e,t){return e?t?gi(e,t):e:t}function gi(e,t){if(e.roomId!==t.roomId)return e.lastSeenVersion>=t.lastSeenVersion?e:t;const n=e.lastSeenVersion>=t.lastSeenVersion?e:t,r=n===e?t:e;return{...n,lastSeenVersion:Math.max(e.lastSeenVersion,t.lastSeenVersion),readToken:n.readToken||r.readToken,writeToken:n.writeToken||r.writeToken,accessToken:n.accessToken||r.accessToken}}function Kl(...e){return e.filter(t=>!!t).sort().at(-1)}function mh(e,t){return Kl(e,t)??e}function cl(e,t,n){return dh({data:sx(t),decryptSecret:e.decryptSecret,roomId:e.roomId,roomType:"workspace-manifest",roomVersion:n})}function sx(e){return{apps:e.apps,deletedApps:e.deletedApps,schemaVersion:e.schemaVersion,storageProfile:e.storageProfile,updatedAt:e.updatedAt,workspaceId:e.workspaceId}}function ax(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Workspace manifest payload is malformed.");const t=e;if(t.schemaVersion!==1||typeof t.workspaceId!="string"||typeof t.updatedAt!="string")throw new Error("Workspace manifest payload is unsupported.");return{apps:ii(t.apps)?t.apps:{},deletedApps:ii(t.deletedApps)?t.deletedApps:{},schemaVersion:1,storageProfile:ii(t.storageProfile)?t.storageProfile:null,updatedAt:t.updatedAt,workspaceId:t.workspaceId}}function bT(e){if(!ii(e))throw new Error("Workspace recovery material is malformed.");if(e.kind!=="app-lab-workspace-recovery"||e.schemaVersion!==ph||typeof e.workspaceId!="string"||typeof e.createdAt!="string"||!ii(e.provider)||e.provider.provider!=="firebase-rtdb"||typeof e.provider.databaseUrl!="string"||!ii(e.provider.firebaseConfig)||typeof e.provider.firebaseConfig.databaseURL!="string"||!ii(e.manifestRoom))throw new Error("Workspace recovery material is unsupported.");return e}function gh(e){if(!e.manifestRoom)throw new Error("Workspace manifest room is not configured.");return e.manifestRoom}function ii(e){return!!(e&&typeof e=="object"&&!Array.isArray(e))}function xT(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function kT(e){return e instanceof Error&&/room version conflict/i.test(e.message)}function ST(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function IT(e){if(!/^[A-Za-z0-9_-]+$/.test(e))throw new Error("Value is not valid base64url.");const t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}async function ET(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-workspace-manifest"&&(n.status==="syncing"&&!ta(n)||await CT(e,n))}async function CT(e,t){var r,i;const n=await Zs(e.queueStore,t);try{const o=await e.syncRegistry.getStorageProfile();if(!o){await e.queueStore.removeItem(t.id);return}await e.syncRegistry.ensureWorkspaceManifestRoom();const s=await e.syncRegistry.getState();if(s.workspaceId!==t.workspaceId){await e.queueStore.removeItem(t.id);return}const a=await uT({provider:e.createProviderFromStorageProfile(o),state:s});if(AT(s,a)){const l=await e.syncRegistry.getState();((r=l.manifestRoom)==null?void 0:r.roomId)===((i=s.manifestRoom)==null?void 0:i.roomId)&&await e.syncRegistry.replaceState({...l,manifestRoom:a.manifestRoom})}else e.onSavedState?await e.onSavedState(a):await e.syncRegistry.replaceState(a);await e.queueStore.removeItem(t.id)}catch(o){if(await ea(e.queueStore,n,o),e.throwOnError)throw o}}function AT(e,t){return!!(e.manifestRoom&&t.manifestRoom&&e.manifestRoom.roomId===t.manifestRoom.roomId&&t.manifestRoom.lastSeenVersion<e.manifestRoom.lastSeenVersion)}var fy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lx={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V=function(e,t){if(!e)throw bo(t)},bo=function(e){return new Error("Firebase Database ("+lx.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ux=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},TT=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=e[n++],s=e[n++],a=e[n++],l=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},yh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const o=e[i],s=i+1<e.length,a=s?e[i+1]:0,l=i+2<e.length,u=l?e[i+2]:0,d=o>>2,c=(o&3)<<4|a>>4;let f=(a&15)<<2|u>>6,p=u&63;l||(p=64,s||(f=64)),r.push(n[d],n[c],n[f],n[p])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(ux(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):TT(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;const u=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||a==null||u==null||c==null)throw new RT;const f=o<<2|a>>4;if(r.push(f),u!==64){const p=a<<4&240|u>>2;if(r.push(p),c!==64){const m=u<<6&192|c;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class RT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const cx=function(e){const t=ux(e);return yh.encodeByteArray(t,!0)},Gl=function(e){return cx(e).replace(/\./g,"")},Yl=function(e){try{return yh.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NT(e){return dx(void 0,e)}function dx(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const n=t;return new Date(n.getTime());case Object:e===void 0&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)!t.hasOwnProperty(n)||!PT(n)||(e[n]=dx(e[n],t[n]));return e}function PT(e){return e!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT=()=>DT().__FIREBASE_DEFAULTS__,LT=()=>{if(typeof process>"u"||typeof fy>"u")return;const e=fy.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},MT=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&Yl(e[1]);return t&&JSON.parse(t)},vh=()=>{try{return OT()||LT()||MT()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},fx=e=>{var t,n;return(n=(t=vh())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},jT=e=>{const t=fx(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},px=()=>{var e;return(e=vh())===null||e===void 0?void 0:e.config},hx=e=>{var t;return(t=vh())===null||t===void 0?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FT(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,o=e.sub||e.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},e);return[Gl(JSON.stringify(n)),Gl(JSON.stringify(s)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(At())}function UT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zT(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function mx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function BT(){const e=At();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function VT(){return lx.NODE_ADMIN===!0}function $T(){try{return typeof indexedDB=="object"}catch{return!1}}function HT(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT="FirebaseError";class Hr extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=WT,Object.setPrototypeOf(this,Hr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oa.prototype.create)}}class oa{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?qT(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new Hr(i,a,r)}}function qT(e,t){return e.replace(KT,(n,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const KT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(e){return JSON.parse(e)}function tt(e){return JSON.stringify(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gx=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=Ds(Yl(o[0])||""),n=Ds(Yl(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch{}return{header:t,claims:n,data:r,signature:i}},GT=function(e){const t=gx(e),n=t.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},YT=function(e){const t=gx(e).claims;return typeof t=="object"&&t.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function yi(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]}function Tf(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Ql(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function Jl(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const o=e[i],s=t[i];if(py(o)&&py(s)){if(!Jl(o,s))return!1}else if(o!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function py(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,n){n||(n=0);const r=this.W_;if(typeof t=="string")for(let c=0;c<16;c++)r[c]=t.charCodeAt(n)<<24|t.charCodeAt(n+1)<<16|t.charCodeAt(n+2)<<8|t.charCodeAt(n+3),n+=4;else for(let c=0;c<16;c++)r[c]=t[n]<<24|t[n+1]<<16|t[n+2]<<8|t[n+3],n+=4;for(let c=16;c<80;c++){const f=r[c-3]^r[c-8]^r[c-14]^r[c-16];r[c]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],o=this.chain_[1],s=this.chain_[2],a=this.chain_[3],l=this.chain_[4],u,d;for(let c=0;c<80;c++){c<40?c<20?(u=a^o&(s^a),d=1518500249):(u=o^s^a,d=1859775393):c<60?(u=o&s|a&(o|s),d=2400959708):(u=o^s^a,d=3395469782);const f=(i<<5|i>>>27)+u+l+d+r[c]&4294967295;l=a,a=s,s=(o<<30|o>>>2)&4294967295,o=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(t,n){if(t==null)return;n===void 0&&(n=t.length);const r=n-this.blockSize;let i=0;const o=this.buf_;let s=this.inbuf_;for(;i<n;){if(s===0)for(;i<=r;)this.compress_(t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<n;)if(o[s]=t.charCodeAt(i),++s,++i,s===this.blockSize){this.compress_(o),s=0;break}}else for(;i<n;)if(o[s]=t[i],++s,++i,s===this.blockSize){this.compress_(o),s=0;break}}this.inbuf_=s,this.total_+=n}digest(){const t=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let o=24;o>=0;o-=8)t[r]=this.chain_[i]>>o&255,++r;return t}}function JT(e,t){const n=new XT(e,t);return n.subscribe.bind(n)}class XT{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");ZT(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=Wc),i.error===void 0&&(i.error=Wc),i.complete===void 0&&(i.complete=Wc);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ZT(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Wc(){}function _h(e,t){return`${e} failed: ${t} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const o=i-55296;r++,V(r<e.length,"Surrogate pair missing trail surrogate.");const s=e.charCodeAt(r)-56320;i=65536+(o<<10)+s}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},ju=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(e){return e&&e._delegate?e._delegate:e}class vi{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new ia;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(rR(t))try{this.getOrInitializeService({instanceIdentifier:Jr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Jr){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Jr){return this.instances.has(t)}getOptions(t=Jr){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(t,n){var r;const i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const s=this.instances.get(i);return s&&t(s,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:nR(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Jr){return this.component?this.component.multipleInstances?t:Jr:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function nR(e){return e===Jr?void 0:e}function rR(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new tR(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(Se||(Se={}));const oR={debug:Se.DEBUG,verbose:Se.VERBOSE,info:Se.INFO,warn:Se.WARN,error:Se.ERROR,silent:Se.SILENT},sR=Se.INFO,aR={[Se.DEBUG]:"log",[Se.VERBOSE]:"log",[Se.INFO]:"info",[Se.WARN]:"warn",[Se.ERROR]:"error"},lR=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=aR[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class bh{constructor(t){this.name=t,this._logLevel=sR,this._logHandler=lR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Se))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?oR[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Se.DEBUG,...t),this._logHandler(this,Se.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Se.VERBOSE,...t),this._logHandler(this,Se.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Se.INFO,...t),this._logHandler(this,Se.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Se.WARN,...t),this._logHandler(this,Se.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Se.ERROR,...t),this._logHandler(this,Se.ERROR,...t)}}const uR=(e,t)=>t.some(n=>e instanceof n);let hy,my;function cR(){return hy||(hy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function dR(){return my||(my=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yx=new WeakMap,Rf=new WeakMap,vx=new WeakMap,qc=new WeakMap,xh=new WeakMap;function fR(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(Tr(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&yx.set(n,e)}).catch(()=>{}),xh.set(t,e),t}function pR(e){if(Rf.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});Rf.set(e,t)}let Nf={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Rf.get(e);if(t==="objectStoreNames")return e.objectStoreNames||vx.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Tr(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function hR(e){Nf=e(Nf)}function mR(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Kc(this),t,...n);return vx.set(r,t.sort?t.sort():[t]),Tr(r)}:dR().includes(e)?function(...t){return e.apply(Kc(this),t),Tr(yx.get(this))}:function(...t){return Tr(e.apply(Kc(this),t))}}function gR(e){return typeof e=="function"?mR(e):(e instanceof IDBTransaction&&pR(e),uR(e,cR())?new Proxy(e,Nf):e)}function Tr(e){if(e instanceof IDBRequest)return fR(e);if(qc.has(e))return qc.get(e);const t=gR(e);return t!==e&&(qc.set(e,t),xh.set(t,e)),t}const Kc=e=>xh.get(e);function yR(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),a=Tr(s);return r&&s.addEventListener("upgradeneeded",l=>{r(Tr(s.result),l.oldVersion,l.newVersion,Tr(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const vR=["get","getKey","getAll","getAllKeys","count"],wR=["put","add","delete","clear"],Gc=new Map;function gy(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Gc.get(t))return Gc.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=wR.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||vR.includes(n)))return;const o=async function(s,...a){const l=this.transaction(s,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&l.done]))[0]};return Gc.set(t,o),o}hR(e=>({...e,get:(t,n,r)=>gy(t,n)||e.get(t,n,r),has:(t,n)=>!!gy(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function bR(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Pf="@firebase/app",yy="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new bh("@firebase/app"),xR="@firebase/app-compat",kR="@firebase/analytics-compat",SR="@firebase/analytics",IR="@firebase/app-check-compat",ER="@firebase/app-check",CR="@firebase/auth",AR="@firebase/auth-compat",TR="@firebase/database",RR="@firebase/data-connect",NR="@firebase/database-compat",PR="@firebase/functions",DR="@firebase/functions-compat",OR="@firebase/installations",LR="@firebase/installations-compat",MR="@firebase/messaging",jR="@firebase/messaging-compat",FR="@firebase/performance",UR="@firebase/performance-compat",zR="@firebase/remote-config",BR="@firebase/remote-config-compat",VR="@firebase/storage",$R="@firebase/storage-compat",HR="@firebase/firestore",WR="@firebase/vertexai-preview",qR="@firebase/firestore-compat",KR="firebase",GR="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df="[DEFAULT]",YR={[Pf]:"fire-core",[xR]:"fire-core-compat",[SR]:"fire-analytics",[kR]:"fire-analytics-compat",[ER]:"fire-app-check",[IR]:"fire-app-check-compat",[CR]:"fire-auth",[AR]:"fire-auth-compat",[TR]:"fire-rtdb",[RR]:"fire-data-connect",[NR]:"fire-rtdb-compat",[PR]:"fire-fn",[DR]:"fire-fn-compat",[OR]:"fire-iid",[LR]:"fire-iid-compat",[MR]:"fire-fcm",[jR]:"fire-fcm-compat",[FR]:"fire-perf",[UR]:"fire-perf-compat",[zR]:"fire-rc",[BR]:"fire-rc-compat",[VR]:"fire-gcs",[$R]:"fire-gcs-compat",[HR]:"fire-fst",[qR]:"fire-fst-compat",[WR]:"fire-vertex","fire-js":"fire-js",[KR]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=new Map,QR=new Map,Of=new Map;function vy(e,t){try{e.container.addComponent(t)}catch(n){er.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function fo(e){const t=e.name;if(Of.has(t))return er.debug(`There were multiple attempts to register component ${t}.`),!1;Of.set(t,e);for(const n of Os.values())vy(n,e);for(const n of QR.values())vy(n,e);return!0}function kh(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function $n(e){return e.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JR={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rr=new oa("app","Firebase",JR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XR{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Rr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=GR;function wx(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Df,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw Rr.create("bad-app-name",{appName:String(i)});if(n||(n=px()),!n)throw Rr.create("no-options");const o=Os.get(i);if(o){if(Jl(n,o.options)&&Jl(r,o.config))return o;throw Rr.create("duplicate-app",{appName:i})}const s=new iR(i);for(const l of Of.values())s.addComponent(l);const a=new XR(n,r,s);return Os.set(i,a),a}function _x(e=Df){const t=Os.get(e);if(!t&&e===Df&&px())return wx();if(!t)throw Rr.create("no-app",{appName:e});return t}function ZR(){return Array.from(Os.values())}function Nr(e,t,n){var r;let i=(r=YR[e])!==null&&r!==void 0?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){const a=[`Unable to register library "${i}" with version "${t}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),er.warn(a.join(" "));return}fo(new vi(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e1="firebase-heartbeat-database",t1=1,Ls="firebase-heartbeat-store";let Yc=null;function bx(){return Yc||(Yc=yR(e1,t1,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Ls)}catch(n){console.warn(n)}}}}).catch(e=>{throw Rr.create("idb-open",{originalErrorMessage:e.message})})),Yc}async function n1(e){try{const n=(await bx()).transaction(Ls),r=await n.objectStore(Ls).get(xx(e));return await n.done,r}catch(t){if(t instanceof Hr)er.warn(t.message);else{const n=Rr.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});er.warn(n.message)}}}async function wy(e,t){try{const r=(await bx()).transaction(Ls,"readwrite");await r.objectStore(Ls).put(t,xx(e)),await r.done}catch(n){if(n instanceof Hr)er.warn(n.message);else{const r=Rr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});er.warn(r.message)}}}function xx(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r1=1024,i1=30*24*60*60*1e3;class o1{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new a1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=_y();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const a=new Date(s.date).valueOf();return Date.now()-a<=i1}),this._storage.overwrite(this._heartbeatsCache))}catch(r){er.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=_y(),{heartbeatsToSend:r,unsentEntries:i}=s1(this._heartbeatsCache.heartbeats),o=Gl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return er.warn(n),""}}}function _y(){return new Date().toISOString().substring(0,10)}function s1(e,t=r1){const n=[];let r=e.slice();for(const i of e){const o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),by(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),by(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class a1{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $T()?HT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await n1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return wy(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return wy(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function by(e){return Gl(JSON.stringify({version:2,heartbeats:e})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l1(e){fo(new vi("platform-logger",t=>new _R(t),"PRIVATE")),fo(new vi("heartbeat",t=>new o1(t),"PRIVATE")),Nr(Pf,yy,e),Nr(Pf,yy,"esm2017"),Nr("fire-js","")}l1("");var u1="firebase",c1="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nr(u1,c1,"app");function Sh(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function kx(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const d1=kx,Sx=new oa("auth","Firebase",kx());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=new bh("@firebase/auth");function f1(e,...t){Xl.logLevel<=Se.WARN&&Xl.warn(`Auth (${ko}): ${e}`,...t)}function dl(e,...t){Xl.logLevel<=Se.ERROR&&Xl.error(`Auth (${ko}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(e,...t){throw Ih(e,...t)}function Ln(e,...t){return Ih(e,...t)}function Ix(e,t,n){const r=Object.assign(Object.assign({},d1()),{[t]:n});return new oa("auth","Firebase",r).create(t,{appName:e.name})}function Pr(e){return Ix(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ih(e,...t){if(typeof e!="string"){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Sx.create(e,...t)}function J(e,t,...n){if(!e)throw Ih(t,...n)}function Hn(e){const t="INTERNAL ASSERTION FAILED: "+e;throw dl(t),new Error(t)}function nr(e,t){e||Hn(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.href)||""}function p1(){return xy()==="http:"||xy()==="https:"}function xy(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h1(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(p1()||zT()||"connection"in navigator)?navigator.onLine:!0}function m1(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(t,n){this.shortDelay=t,this.longDelay=n,nr(n>t,"Short delay should be less than long delay!"),this.isMobile=wh()||mx()}get(){return h1()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eh(e,t){nr(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ex{static initialize(t,n,r){this.fetchImpl=t,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Hn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Hn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Hn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g1={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y1=new sa(3e4,6e4);function Fu(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function So(e,t,n,r,i={}){return Cx(e,i,async()=>{let o={},s={};r&&(t==="GET"?s=r:o={body:JSON.stringify(r)});const a=xo(Object.assign({key:e.config.apiKey},s)).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);const u=Object.assign({method:t,headers:l},o);return UT()||(u.referrerPolicy="no-referrer"),Ex.fetch()(Tx(e,e.config.apiHost,n,a),u)})}async function Cx(e,t,n){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},g1),t);try{const i=new v1(e),o=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const s=await o.json();if("needConfirmation"in s)throw Ba(e,"account-exists-with-different-credential",s);if(o.ok&&!("errorMessage"in s))return s;{const a=o.ok?s.errorMessage:s.error.message,[l,u]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ba(e,"credential-already-in-use",s);if(l==="EMAIL_EXISTS")throw Ba(e,"email-already-in-use",s);if(l==="USER_DISABLED")throw Ba(e,"user-disabled",s);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Ix(e,d,u);tr(e,d)}}catch(i){if(i instanceof Hr)throw i;tr(e,"network-request-failed",{message:String(i)})}}async function Ax(e,t,n,r,i={}){const o=await So(e,t,n,r,i);return"mfaPendingCredential"in o&&tr(e,"multi-factor-auth-required",{_serverResponse:o}),o}function Tx(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?Eh(e.config,i):`${e.config.apiScheme}://${i}`}class v1{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ln(this.auth,"network-request-failed")),y1.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ba(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Ln(e,t,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w1(e,t){return So(e,"POST","/v1/accounts:delete",t)}async function Rx(e,t){return So(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function _1(e,t=!1){const n=Jt(e),r=await n.getIdToken(t),i=Ch(r);J(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,s=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:ss(Qc(i.auth_time)),issuedAtTime:ss(Qc(i.iat)),expirationTime:ss(Qc(i.exp)),signInProvider:s||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Qc(e){return Number(e)*1e3}function Ch(e){const[t,n,r]=e.split(".");if(t===void 0||n===void 0||r===void 0)return dl("JWT malformed, contained fewer than 3 sections"),null;try{const i=Yl(n);return i?JSON.parse(i):(dl("Failed to decode base64 JWT payload"),null)}catch(i){return dl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ky(e){const t=Ch(e);return J(t,"internal-error"),J(typeof t.exp<"u","internal-error"),J(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ms(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof Hr&&b1(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function b1({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x1{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var n;if(t){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ss(this.lastLoginAt),this.creationTime=ss(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zl(e){var t;const n=e.auth,r=await e.getIdToken(),i=await Ms(e,Rx(n,{idToken:r}));J(i==null?void 0:i.users.length,n,"internal-error");const o=i.users[0];e._notifyReloadListener(o);const s=!((t=o.providerUserInfo)===null||t===void 0)&&t.length?Nx(o.providerUserInfo):[],a=S1(e.providerData,s),l=e.isAnonymous,u=!(e.email&&o.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,c={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new Mf(o.createdAt,o.lastLoginAt),isAnonymous:d};Object.assign(e,c)}async function k1(e){const t=Jt(e);await Zl(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function S1(e,t){return[...e.filter(r=>!t.some(i=>i.providerId===r.providerId)),...t]}function Nx(e){return e.map(t=>{var{providerId:n}=t,r=Sh(t,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function I1(e,t){const n=await Cx(e,{},async()=>{const r=xo({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:o}=e.config,s=Tx(e,i,"/v1/token",`key=${o}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Ex.fetch()(s,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function E1(e,t){return So(e,"POST","/v2/accounts:revokeToken",Fu(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){J(t.idToken,"internal-error"),J(typeof t.idToken<"u","internal-error"),J(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):ky(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){J(t.length!==0,"internal-error");const n=ky(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(J(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:r,refreshToken:i,expiresIn:o}=await I1(t,n);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(t,n,r){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,n){const{refreshToken:r,accessToken:i,expirationTime:o}=n,s=new Zi;return r&&(J(typeof r=="string","internal-error",{appName:t}),s.refreshToken=r),i&&(J(typeof i=="string","internal-error",{appName:t}),s.accessToken=i),o&&(J(typeof o=="number","internal-error",{appName:t}),s.expirationTime=o),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Zi,this.toJSON())}_performRefresh(){return Hn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(e,t){J(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class Wn{constructor(t){var{uid:n,auth:r,stsTokenManager:i}=t,o=Sh(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new x1(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Mf(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(t){const n=await Ms(this,this.stsTokenManager.getToken(this.auth,t));return J(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return _1(this,t)}reload(){return k1(this)}_assign(t){this!==t&&(J(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>Object.assign({},n)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new Wn(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(t){J(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),n&&await Zl(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if($n(this.auth.app))return Promise.reject(Pr(this.auth));const t=await this.getIdToken();return await Ms(this,w1(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){var r,i,o,s,a,l,u,d;const c=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,p=(o=n.phoneNumber)!==null&&o!==void 0?o:void 0,m=(s=n.photoURL)!==null&&s!==void 0?s:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,C=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,y=(u=n.createdAt)!==null&&u!==void 0?u:void 0,v=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:g,emailVerified:k,isAnonymous:S,providerData:_,stsTokenManager:A}=n;J(g&&A,t,"internal-error");const R=Zi.fromJSON(this.name,A);J(typeof g=="string",t,"internal-error"),lr(c,t.name),lr(f,t.name),J(typeof k=="boolean",t,"internal-error"),J(typeof S=="boolean",t,"internal-error"),lr(p,t.name),lr(m,t.name),lr(w,t.name),lr(C,t.name),lr(y,t.name),lr(v,t.name);const O=new Wn({uid:g,auth:t,email:f,emailVerified:k,displayName:c,isAnonymous:S,photoURL:m,phoneNumber:p,tenantId:w,stsTokenManager:R,createdAt:y,lastLoginAt:v});return _&&Array.isArray(_)&&(O.providerData=_.map(E=>Object.assign({},E))),C&&(O._redirectEventId=C),O}static async _fromIdTokenResponse(t,n,r=!1){const i=new Zi;i.updateFromServerResponse(n);const o=new Wn({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await Zl(o),o}static async _fromGetAccountInfoResponse(t,n,r){const i=n.users[0];J(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Nx(i.providerUserInfo):[],s=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),a=new Zi;a.updateFromIdToken(r);const l=new Wn({uid:i.localId,auth:t,stsTokenManager:a,isAnonymous:s}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Mf(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=new Map;function qn(e){nr(e instanceof Function,"Expected a class definition");let t=Sy.get(e);return t?(nr(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Sy.set(e,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Px{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}Px.type="NONE";const Iy=Px;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(e,t,n){return`firebase:${e}:${t}:${n}`}class eo{constructor(t,n,r){this.persistence=t,this.auth=n,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=fl(this.userKey,i.apiKey,o),this.fullPersistenceKey=fl("persistence",i.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?Wn._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r="authUser"){if(!n.length)return new eo(qn(Iy),t,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let o=i[0]||qn(Iy);const s=fl(r,t.config.apiKey,t.name);let a=null;for(const u of n)try{const d=await u._get(s);if(d){const c=Wn._fromJSON(t,d);u!==o&&(a=c),o=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!o._shouldAllowMigration||!l.length?new eo(o,t,r):(o=l[0],a&&await o._set(s,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==o)try{await u._remove(s)}catch{}})),new eo(o,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ey(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Mx(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Dx(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Fx(t))return"Blackberry";if(Ux(t))return"Webos";if(Ox(t))return"Safari";if((t.includes("chrome/")||Lx(t))&&!t.includes("edge/"))return"Chrome";if(jx(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Dx(e=At()){return/firefox\//i.test(e)}function Ox(e=At()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Lx(e=At()){return/crios\//i.test(e)}function Mx(e=At()){return/iemobile/i.test(e)}function jx(e=At()){return/android/i.test(e)}function Fx(e=At()){return/blackberry/i.test(e)}function Ux(e=At()){return/webos/i.test(e)}function Ah(e=At()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function C1(e=At()){var t;return Ah(e)&&!!(!((t=window.navigator)===null||t===void 0)&&t.standalone)}function A1(){return BT()&&document.documentMode===10}function zx(e=At()){return Ah(e)||jx(e)||Ux(e)||Fx(e)||/windows phone/i.test(e)||Mx(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bx(e,t=[]){let n;switch(e){case"Browser":n=Ey(At());break;case"Worker":n=`${Ey(At())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${ko}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T1{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const r=o=>new Promise((s,a)=>{try{const l=t(o);s(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const r of this.queue)await r(t),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function R1(e,t={}){return So(e,"GET","/v2/passwordPolicy",Fu(e,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N1=6;class P1{constructor(t){var n,r,i,o;const s=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=s.minPasswordLength)!==null&&n!==void 0?n:N1,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),s.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),s.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),s.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),s.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=t.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=t.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var n,r,i,o,s,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,l),this.validatePasswordCharacterOptions(t,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsUppercaseLetter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(s=l.containsNumericCharacter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(t,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=t.length>=r),i&&(n.meetsMaxPasswordLength=t.length<=i)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<t.length;i++)r=t.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,n,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D1{constructor(t,n,r,i){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cy(this),this.idTokenSubscription=new Cy(this),this.beforeStateQueue=new T1(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sx,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=qn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await eo.create(this,t),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await Rx(this,{idToken:t}),r=await Wn._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var n;if($n(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(t);(!s||s===a)&&(l!=null&&l.user)&&(i=l.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return J(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await Zl(t)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=m1()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if($n(this.app))return Promise.reject(Pr(this));const n=t?Jt(t):null;return n&&J(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&J(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return $n(this.app)?Promise.reject(Pr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return $n(this.app)?Promise.reject(Pr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qn(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await R1(this),n=new P1(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new oa("auth","Firebase",t())}onAuthStateChanged(t,n,r){return this.registerStateListener(this.authStateSubscription,t,n,r)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,r){return this.registerStateListener(this.idTokenSubscription,t,n,r)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await E1(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,n){const r=await this.getOrInitRedirectPersistenceManager(n);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&qn(t)||this._popupRedirectResolver;J(n,this,"argument-error"),this.redirectPersistenceManager=await eo.create(this,[qn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===t?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,r,i){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let s=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(J(a,this,"internal-error"),a.then(()=>{s||o(this.currentUser)}),typeof n=="function"){const l=t.addObserver(n,r,i);return()=>{s=!0,l()}}else{const l=t.addObserver(n);return()=>{s=!0,l()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return J(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Bx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var t;const n=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return n!=null&&n.error&&f1(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Uu(e){return Jt(e)}class Cy{constructor(t){this.auth=t,this.observer=null,this.addObserver=JT(n=>this.observer=n)}get next(){return J(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Th={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function O1(e){Th=e}function L1(e){return Th.loadJS(e)}function M1(){return Th.gapiScript}function j1(e){return`__${e}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F1(e,t){const n=kh(e,"auth");if(n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(Jl(o,t??{}))return i;tr(i,"already-initialized")}return n.initialize({options:t})}function U1(e,t){const n=(t==null?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(qn);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function z1(e,t,n){const r=Uu(e);J(r._canInitEmulator,r,"emulator-config-failed"),J(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!1,o=Vx(t),{host:s,port:a}=B1(t),l=a===null?"":`:${a}`;r.config.emulator={url:`${o}//${s}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),V1()}function Vx(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function B1(e){const t=Vx(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Ay(r.substr(o.length+1))}}else{const[o,s]=r.split(":");return{host:o,port:Ay(s)}}}function Ay(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function V1(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $x{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return Hn("not implemented")}_getIdTokenResponse(t){return Hn("not implemented")}_linkToIdToken(t,n){return Hn("not implemented")}_getReauthenticationResolver(t){return Hn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function to(e,t){return Ax(e,"POST","/v1/accounts:signInWithIdp",Fu(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $1="http://localhost";class wi extends $x{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new wi(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):tr("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:i}=n,o=Sh(n,["providerId","signInMethod"]);if(!r||!i)return null;const s=new wi(r,i);return s.idToken=o.idToken||void 0,s.accessToken=o.accessToken||void 0,s.secret=o.secret,s.nonce=o.nonce,s.pendingToken=o.pendingToken||null,s}_getIdTokenResponse(t){const n=this.buildRequest();return to(t,n)}_linkToIdToken(t,n){const r=this.buildRequest();return r.idToken=n,to(t,r)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,to(t,n)}buildRequest(){const t={requestUri:$1,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=xo(n)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hx{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa extends Hx{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends aa{constructor(){super("facebook.com")}static credential(t){return wi._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return mr.credentialFromTaggedObject(t)}static credentialFromError(t){return mr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return mr.credential(t.oauthAccessToken)}catch{return null}}}mr.FACEBOOK_SIGN_IN_METHOD="facebook.com";mr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr extends aa{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return wi._fromParams({providerId:gr.PROVIDER_ID,signInMethod:gr.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return gr.credentialFromTaggedObject(t)}static credentialFromError(t){return gr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return gr.credential(n,r)}catch{return null}}}gr.GOOGLE_SIGN_IN_METHOD="google.com";gr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends aa{constructor(){super("github.com")}static credential(t){return wi._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return yr.credentialFromTaggedObject(t)}static credentialFromError(t){return yr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return yr.credential(t.oauthAccessToken)}catch{return null}}}yr.GITHUB_SIGN_IN_METHOD="github.com";yr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends aa{constructor(){super("twitter.com")}static credential(t,n){return wi._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return vr.credentialFromTaggedObject(t)}static credentialFromError(t){return vr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return vr.credential(n,r)}catch{return null}}}vr.TWITTER_SIGN_IN_METHOD="twitter.com";vr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H1(e,t){return Ax(e,"POST","/v1/accounts:signUp",Fu(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){const o=await Wn._fromIdTokenResponse(t,r,i),s=Ty(r);return new jr({user:o,providerId:s,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);const i=Ty(r);return new jr({user:t,providerId:i,_tokenResponse:r,operationType:n})}}function Ty(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W1(e){var t;if($n(e.app))return Promise.reject(Pr(e));const n=Uu(e);if(await n._initializationPromise,!((t=n.currentUser)===null||t===void 0)&&t.isAnonymous)return new jr({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await H1(n,{returnSecureToken:!0}),i=await jr._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu extends Hr{constructor(t,n,r,i){var o;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,eu.prototype),this.customData={appName:t.name,tenantId:(o=t.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new eu(t,n,r,i)}}function Wx(e,t,n,r){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?eu._fromErrorAndOperation(e,o,t,r):o})}async function q1(e,t,n=!1){const r=await Ms(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return jr._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K1(e,t,n=!1){const{auth:r}=e;if($n(r.app))return Promise.reject(Pr(r));const i="reauthenticate";try{const o=await Ms(e,Wx(r,i,t,e),n);J(o.idToken,r,"internal-error");const s=Ch(o.idToken);J(s,r,"internal-error");const{sub:a}=s;return J(e.uid===a,r,"user-mismatch"),jr._forOperation(e,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&tr(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G1(e,t,n=!1){if($n(e.app))return Promise.reject(Pr(e));const r="signIn",i=await Wx(e,r,t),o=await jr._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(o.user),o}function Y1(e,t,n,r){return Jt(e).onIdTokenChanged(t,n,r)}function Q1(e,t,n){return Jt(e).beforeAuthStateChanged(t,n)}const tu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qx{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(tu,"1"),this.storage.removeItem(tu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J1=1e3,X1=10;class Kx extends qx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zx(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&t(n,i,r)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((s,a,l)=>{this.notifyListeners(s,l)});return}const r=t.key;n?this.detachListener():this.stopPolling();const i=()=>{const s=this.storage.getItem(r);!n&&this.localCache[r]===s||this.notifyListeners(r,s)},o=this.storage.getItem(r);A1()&&o!==t.newValue&&t.newValue!==t.oldValue?setTimeout(i,X1):i()}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)})},J1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}Kx.type="LOCAL";const Z1=Kx;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gx extends qx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}Gx.type="SESSION";const Yx=Gx;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eN(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(i=>i.isListeningto(t));if(n)return n;const r=new zu(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:r,eventType:i,data:o}=n.data,s=this.handlersMap[i];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(s).map(async u=>u(n.origin,o)),l=await eN(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(Math.random()*10);return e+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tN{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,s;return new Promise((a,l)=>{const u=Rh("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);s={messageChannel:i,onMessage(c){const f=c;if(f.data.eventId===u)switch(f.data.status){case"ack":clearTimeout(d),o=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),a(f.data.response);break;default:clearTimeout(d),clearTimeout(o),l(new Error("invalid_response"));break}}},this.handlers.add(s),i.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:t,eventId:u,data:n},[i.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(){return window}function nN(e){Mn().location.href=e}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qx(){return typeof Mn().WorkerGlobalScope<"u"&&typeof Mn().importScripts=="function"}async function rN(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iN(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)===null||e===void 0?void 0:e.controller)||null}function oN(){return Qx()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jx="firebaseLocalStorageDb",sN=1,nu="firebaseLocalStorage",Xx="fbase_key";class la{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Bu(e,t){return e.transaction([nu],t?"readwrite":"readonly").objectStore(nu)}function aN(){const e=indexedDB.deleteDatabase(Jx);return new la(e).toPromise()}function jf(){const e=indexedDB.open(Jx,sN);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const r=e.result;try{r.createObjectStore(nu,{keyPath:Xx})}catch(i){n(i)}}),e.addEventListener("success",async()=>{const r=e.result;r.objectStoreNames.contains(nu)?t(r):(r.close(),await aN(),t(await jf()))})})}async function Ry(e,t,n){const r=Bu(e,!0).put({[Xx]:t,value:n});return new la(r).toPromise()}async function lN(e,t){const n=Bu(e,!1).get(t),r=await new la(n).toPromise();return r===void 0?null:r.value}function Ny(e,t){const n=Bu(e,!0).delete(t);return new la(n).toPromise()}const uN=800,cN=3;class Zx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jf(),this.db)}async _withRetries(t){let n=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(n++>cN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qx()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zu._getInstance(oN()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await rN(),!this.activeServiceWorker)return;this.sender=new tN(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((t=r[0])===null||t===void 0)&&t.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||iN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await jf();return await Ry(t,tu,"1"),await Ny(t,tu),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ry(r,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(r=>lN(r,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ny(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(i=>{const o=Bu(i,!1).getAll();return new la(o).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(t.length!==0)for(const{fbase_key:i,value:o}of t)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zx.type="LOCAL";const dN=Zx;new sa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fN(e,t){return t?qn(t):(J(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh extends $x{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return to(t,this._buildIdpRequest())}_linkToIdToken(t,n){return to(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return to(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function pN(e){return G1(e.auth,new Nh(e),e.bypassAuthState)}function hN(e){const{auth:t,user:n}=e;return J(n,t,"internal-error"),K1(n,new Nh(e),e.bypassAuthState)}async function mN(e){const{auth:t,user:n}=e;return J(n,t,"internal-error"),q1(n,new Nh(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(t,n,r,i,o=!1){this.auth=t,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:r,postBody:i,tenantId:o,error:s,type:a}=t;if(s){this.reject(s);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(u){this.reject(u)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return pN;case"linkViaPopup":case"linkViaRedirect":return mN;case"reauthViaPopup":case"reauthViaRedirect":return hN;default:tr(this.auth,"internal-error")}}resolve(t){nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gN=new sa(2e3,1e4);class Wi extends ek{constructor(t,n,r,i,o){super(t,n,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Wi.currentPopupAction&&Wi.currentPopupAction.cancel(),Wi.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return J(t,this.auth,"internal-error"),t}async onExecution(){nr(this.filter.length===1,"Popup operations only handle one event");const t=Rh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ln(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)===null||t===void 0?void 0:t.associatedEvent)||null}cancel(){this.reject(Ln(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wi.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ln(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,gN.get())};t()}}Wi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yN="pendingRedirect",pl=new Map;class vN extends ek{constructor(t,n,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let t=pl.get(this.auth._key());if(!t){try{const r=await wN(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(n){t=()=>Promise.reject(n)}pl.set(this.auth._key(),t)}return this.bypassAuthState||pl.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wN(e,t){const n=xN(t),r=bN(e);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function _N(e,t){pl.set(e._key(),t)}function bN(e){return qn(e._redirectPersistence)}function xN(e){return fl(yN,e.config.apiKey,e.name)}async function kN(e,t,n=!1){if($n(e.app))return Promise.reject(Pr(e));const r=Uu(e),i=fN(r,t),s=await new vN(r,i,n).execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SN=10*60*1e3;class IN{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(n=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!EN(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var r;if(t.error&&!tk(t)){const i=((r=t.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Ln(this.auth,i))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const r=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=SN&&this.cachedEventUids.clear(),this.cachedEventUids.has(Py(t))}saveEventToCache(t){this.cachedEventUids.add(Py(t)),this.lastProcessedEventTime=Date.now()}}function Py(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function tk({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function EN(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tk(e);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CN(e,t={}){return So(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,TN=/^https?/;async function RN(e){if(e.config.emulator)return;const{authorizedDomains:t}=await CN(e);for(const n of t)try{if(NN(n))return}catch{}tr(e,"unauthorized-domain")}function NN(e){const t=Lf(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return s.hostname===""&&r===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===r}if(!TN.test(n))return!1;if(AN.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PN=new sa(3e4,6e4);function Dy(){const e=Mn().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function DN(e){return new Promise((t,n)=>{var r,i,o;function s(){Dy(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Dy(),n(Ln(e,"network-request-failed"))},timeout:PN.get()})}if(!((i=(r=Mn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)t(gapi.iframes.getContext());else if(!((o=Mn().gapi)===null||o===void 0)&&o.load)s();else{const a=j1("iframefcb");return Mn()[a]=()=>{gapi.load?s():n(Ln(e,"network-request-failed"))},L1(`${M1()}?onload=${a}`).catch(l=>n(l))}}).catch(t=>{throw hl=null,t})}let hl=null;function ON(e){return hl=hl||DN(e),hl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LN=new sa(5e3,15e3),MN="__/auth/iframe",jN="emulator/auth/iframe",FN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},UN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zN(e){const t=e.config;J(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Eh(t,jN):`https://${e.config.authDomain}/${MN}`,r={apiKey:t.apiKey,appName:e.name,v:ko},i=UN.get(e.config.apiHost);i&&(r.eid=i);const o=e._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${xo(r).slice(1)}`}async function BN(e){const t=await ON(e),n=Mn().gapi;return J(n,e,"internal-error"),t.open({where:document.body,url:zN(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:FN,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const s=Ln(e,"network-request-failed"),a=Mn().setTimeout(()=>{o(s)},LN.get());function l(){Mn().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{o(s)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$N=500,HN=600,WN="_blank",qN="http://localhost";class Oy{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function KN(e,t,n,r=$N,i=HN){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},VN),{width:r.toString(),height:i.toString(),top:o,left:s}),u=At().toLowerCase();n&&(a=Lx(u)?WN:n),Dx(u)&&(t=t||qN,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[p,m])=>`${f}${p}=${m},`,"");if(C1(u)&&a!=="_self")return GN(t||"",a),new Oy(null);const c=window.open(t||"",a,d);J(c,e,"popup-blocked");try{c.focus()}catch{}return new Oy(c)}function GN(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YN="__/auth/handler",QN="emulator/auth/handler",JN=encodeURIComponent("fac");async function Ly(e,t,n,r,i,o){J(e.config.authDomain,e,"auth-domain-config-required"),J(e.config.apiKey,e,"invalid-api-key");const s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:ko,eventId:i};if(t instanceof Hx){t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",Tf(t.getCustomParameters())||(s.customParameters=JSON.stringify(t.getCustomParameters()));for(const[d,c]of Object.entries({}))s[d]=c}if(t instanceof aa){const d=t.getScopes().filter(c=>c!=="");d.length>0&&(s.scopes=d.join(","))}e.tenantId&&(s.tid=e.tenantId);const a=s;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await e._getAppCheckToken(),u=l?`#${JN}=${encodeURIComponent(l)}`:"";return`${XN(e)}?${xo(a).slice(1)}${u}`}function XN({config:e}){return e.emulator?Eh(e,QN):`https://${e.authDomain}/${YN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="webStorageSupport";class ZN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yx,this._completeRedirectFn=kN,this._overrideRedirectResult=_N}async _openPopup(t,n,r,i){var o;nr((o=this.eventManagers[t._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Ly(t,n,r,Lf(),i);return KN(t,s,Rh())}async _openRedirect(t,n,r,i){await this._originValidation(t);const o=await Ly(t,n,r,Lf(),i);return nN(o),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:i,promise:o}=this.eventManagers[n];return i?Promise.resolve(i):(nr(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(t);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(t){const n=await BN(t),r=new IN(t);return n.register("authEvent",i=>(J(i==null?void 0:i.authEvent,t,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=n,r}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(Jc,{type:Jc},i=>{var o;const s=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[Jc];s!==void 0&&n(!!s),tr(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=RN(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return zx()||Ox()||Ah()}}const eP=ZN;var My="@firebase/auth",jy="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tP{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){J(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nP(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rP(e){fo(new vi("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),o=t.getProvider("app-check-internal"),{apiKey:s,authDomain:a}=r.options;J(s&&!s.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:s,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bx(e)},u=new D1(r,i,o,l);return U1(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,r)=>{t.getProvider("auth-internal").initialize()})),fo(new vi("auth-internal",t=>{const n=Uu(t.getProvider("auth").getImmediate());return(r=>new tP(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nr(My,jy,nP(e)),Nr(My,jy,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iP=5*60,oP=hx("authIdTokenMaxAge")||iP;let Fy=null;const sP=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>oP)return;const i=n==null?void 0:n.token;Fy!==i&&(Fy=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function aP(e=_x()){const t=kh(e,"auth");if(t.isInitialized())return t.getImmediate();const n=F1(e,{popupRedirectResolver:eP,persistence:[dN,Z1,Yx]}),r=hx("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const s=sP(o.toString());Q1(n,s,()=>s(n.currentUser)),Y1(n,a=>s(a))}}const i=fx("auth");return i&&z1(n,`http://${i}`),n}function lP(){var e,t;return(t=(e=document.getElementsByTagName("head"))===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:document}O1({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=i=>{const o=Ln("internal-error");o.customData=i,n(o)},r.type="text/javascript",r.charset="UTF-8",lP().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rP("Browser");var Uy={};const zy="@firebase/database",By="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nk="";function uP(e){nk=e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cP{constructor(t){this.domStorage_=t,this.prefix_="firebase:"}set(t,n){n==null?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),tt(n))}get(t){const n=this.domStorage_.getItem(this.prefixedName_(t));return n==null?null:Ds(n)}remove(t){this.domStorage_.removeItem(this.prefixedName_(t))}prefixedName_(t){return this.prefix_+t}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dP{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(t,n){n==null?delete this.cache_[t]:this.cache_[t]=n}get(t){return kn(this.cache_,t)?this.cache_[t]:null}remove(t){delete this.cache_[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk=function(e){try{if(typeof window<"u"&&typeof window[e]<"u"){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new cP(t)}}catch{}return new dP},oi=rk("localStorage"),fP=rk("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=new bh("@firebase/database"),ik=function(){let e=1;return function(){return e++}}(),ok=function(e){const t=eR(e),n=new QT;n.update(t);const r=n.digest();return yh.encodeByteArray(r)},ua=function(...e){let t="";for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?t+=ua.apply(null,r):typeof r=="object"?t+=tt(r):t+=r,t+=" "}return t};let as=null,Vy=!0;const pP=function(e,t){V(!0,"Can't turn on custom loggers persistently."),no.logLevel=Se.VERBOSE,as=no.log.bind(no)},wt=function(...e){if(Vy===!0&&(Vy=!1,as===null&&fP.get("logging_enabled")===!0&&pP()),as){const t=ua.apply(null,e);as(t)}},ca=function(e){return function(...t){wt(e,...t)}},Ff=function(...e){const t="FIREBASE INTERNAL ERROR: "+ua(...e);no.error(t)},rr=function(...e){const t=`FIREBASE FATAL ERROR: ${ua(...e)}`;throw no.error(t),new Error(t)},Ut=function(...e){const t="FIREBASE WARNING: "+ua(...e);no.warn(t)},hP=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ut("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ph=function(e){return typeof e=="number"&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},mP=function(e){if(document.readyState==="complete")e();else{let t=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}t||(t=!0,e())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},po="[MIN_NAME]",_i="[MAX_NAME]",Io=function(e,t){if(e===t)return 0;if(e===po||t===_i)return-1;if(t===po||e===_i)return 1;{const n=$y(e),r=$y(t);return n!==null?r!==null?n-r===0?e.length-t.length:n-r:-1:r!==null?1:e<t?-1:1}},gP=function(e,t){return e===t?0:e<t?-1:1},Fo=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+tt(t))},Dh=function(e){if(typeof e!="object"||e===null)return tt(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)r!==0&&(n+=","),n+=tt(t[r]),n+=":",n+=Dh(e[t[r]]);return n+="}",n},sk=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function zt(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const ak=function(e){V(!Ph(e),"Invalid JSON number");const t=11,n=52,r=(1<<t-1)-1;let i,o,s,a,l;e===0?(o=0,s=0,i=1/e===-1/0?1:0):(i=e<0,e=Math.abs(e),e>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(e)/Math.LN2),r),o=a+r,s=Math.round(e*Math.pow(2,n-a)-Math.pow(2,n))):(o=0,s=Math.round(e/Math.pow(2,1-r-n))));const u=[];for(l=n;l;l-=1)u.push(s%2?1:0),s=Math.floor(s/2);for(l=t;l;l-=1)u.push(o%2?1:0),o=Math.floor(o/2);u.push(i?1:0),u.reverse();const d=u.join("");let c="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),c=c+f}return c.toLowerCase()},yP=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},vP=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function wP(e,t){let n="Unknown Error";e==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":e==="permission_denied"?n="Client doesn't have permission to access the desired data.":e==="unavailable"&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}const _P=new RegExp("^-?(0*)\\d{1,10}$"),bP=-2147483648,xP=2147483647,$y=function(e){if(_P.test(e)){const t=Number(e);if(t>=bP&&t<=xP)return t}return null},Eo=function(e){try{e()}catch(t){setTimeout(()=>{const n=t.stack||"";throw Ut("Exception was thrown by user callback.",n),t},Math.floor(0))}},kP=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ls=function(e,t){const n=setTimeout(e,t);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SP{constructor(t,n){this.appName_=t,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(t){return this.appCheck?this.appCheck.getToken(t):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(t).then(n,r):n(null)},0)})}addTokenChangeListener(t){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(t))}notifyForInvalidToken(){Ut(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IP{constructor(t,n,r){this.appName_=t,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(t){return this.auth_?this.auth_.getToken(t).catch(n=>n&&n.code==="auth/token-not-initialized"?(wt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(t).then(n,r):n(null)},0)})}addTokenChangeListener(t){this.auth_?this.auth_.addAuthTokenListener(t):this.authProvider_.get().then(n=>n.addAuthTokenListener(t))}removeTokenChangeListener(t){this.authProvider_.get().then(n=>n.removeAuthTokenListener(t))}notifyForInvalidToken(){let t='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ut(t)}}class ml{constructor(t){this.accessToken=t}getToken(t){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(t){t(this.accessToken)}removeTokenChangeListener(t){}notifyForInvalidToken(){}}ml.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh="5",lk="v",uk="s",ck="r",dk="f",fk=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,pk="ls",hk="p",Uf="ac",mk="websocket",gk="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yk{constructor(t,n,r,i,o=!1,s="",a=!1,l=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=o,this.persistenceKey=s,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=t.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=oi.get("host:"+t)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&oi.set("host:"+this._host,this.internalHost))}toString(){let t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t}toURLString(){const t=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${t}${this.host}/${n}`}}function EP(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams}function vk(e,t,n){V(typeof t=="string","typeof type must == string"),V(typeof n=="object","typeof params must == object");let r;if(t===mk)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else if(t===gk)r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+t);EP(e)&&(n.ns=e.namespace);const i=[];return zt(n,(o,s)=>{i.push(o+"="+s)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CP{constructor(){this.counters_={}}incrementCounter(t,n=1){kn(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=n}get(){return NT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc={},Zc={};function Lh(e){const t=e.toString();return Xc[t]||(Xc[t]=new CP),Xc[t]}function AP(e,t){const n=e.toString();return Zc[n]||(Zc[n]=t()),Zc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP{constructor(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(t,n){this.closeAfterResponse=t,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(t,n){for(this.pendingResponses[t]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Eo(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy="start",RP="close",NP="pLPCommand",PP="pRTLPCB",wk="id",_k="pw",bk="ser",DP="cb",OP="seg",LP="ts",MP="d",jP="dframe",xk=1870,kk=30,FP=xk-kk,UP=25e3,zP=3e4;class qi{constructor(t,n,r,i,o,s,a){this.connId=t,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.transportSessionId=s,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ca(t),this.stats_=Lh(n),this.urlFn=l=>(this.appCheckToken&&(l[Uf]=this.appCheckToken),vk(n,gk,l))}open(t,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new TP(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(zP)),mP(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Mh((...o)=>{const[s,a,l,u,d]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,s===Hy)this.id=a,this.password=l;else if(s===RP)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+s)},(...o)=>{const[s,a]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(s,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Hy]="t",r[bk]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[DP]=this.scriptTagHolder.uniqueCallbackIdentifier),r[lk]=Oh,this.transportSessionId&&(r[uk]=this.transportSessionId),this.lastSessionId&&(r[pk]=this.lastSessionId),this.applicationId&&(r[hk]=this.applicationId),this.appCheckToken&&(r[Uf]=this.appCheckToken),typeof location<"u"&&location.hostname&&fk.test(location.hostname)&&(r[ck]=dk);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){qi.forceAllow_=!0}static forceDisallow(){qi.forceDisallow_=!0}static isAvailable(){return qi.forceAllow_?!0:!qi.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!yP()&&!vP()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(t){const n=tt(t);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=cx(n),i=sk(r,FP);for(let o=0;o<i.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[o]),this.curSegmentNum++}addDisconnectPingFrame(t,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[jP]="t",r[wk]=t,r[_k]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(t){const n=tt(t).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Mh{constructor(t,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ik(),window[NP+this.uniqueCallbackIdentifier]=t,window[PP+this.uniqueCallbackIdentifier]=n,this.myIFrame=Mh.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const s="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(s),this.myIFrame.doc.close()}catch(a){wt("frame writing exception"),a.stack&&wt(a.stack),wt(a)}}}static createIFrame_(){const t=document.createElement("iframe");if(t.style.display="none",document.body){document.body.appendChild(t);try{t.contentWindow.document||wt("No IE domain setting required")}catch{const r=document.domain;t.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return t.contentDocument?t.doc=t.contentDocument:t.contentWindow?t.doc=t.contentWindow.document:t.document&&(t.doc=t.document),t}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const t=this.onDisconnect;t&&(this.onDisconnect=null,t())}startLongPoll(t,n){for(this.myID=t,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const t={};t[wk]=this.myID,t[_k]=this.myPW,t[bk]=this.currentSerial;let n=this.urlFn(t),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+kk+r.length<=xk;){const s=this.pendingSegs.shift();r=r+"&"+OP+i+"="+s.seg+"&"+LP+i+"="+s.ts+"&"+MP+i+"="+s.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(t,n,r){this.pendingSegs.push({seg:t,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(t,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(UP)),o=()=>{clearTimeout(i),r()};this.addTag(t,o)}addTag(t,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=t,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{wt("Long-poll script failed to load: "+t),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BP=16384,VP=45e3;let ru=null;typeof MozWebSocket<"u"?ru=MozWebSocket:typeof WebSocket<"u"&&(ru=WebSocket);class hn{constructor(t,n,r,i,o,s,a){this.connId=t,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ca(this.connId),this.stats_=Lh(n),this.connURL=hn.connectionURL_(n,s,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(t,n,r,i,o){const s={};return s[lk]=Oh,typeof location<"u"&&location.hostname&&fk.test(location.hostname)&&(s[ck]=dk),n&&(s[uk]=n),r&&(s[pk]=r),i&&(s[Uf]=i),o&&(s[hk]=o),vk(t,mk,s)}open(t,n){this.onDisconnect=n,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,oi.set("previous_websocket_failure",!0);try{let r;VT(),this.mySock=new ru(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){hn.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(t=!0)}return!t&&ru!==null&&!hn.forceDisallow_}static previouslyFailed(){return oi.isInMemoryStorage||oi.get("previous_websocket_failure")===!0}markConnectionHealthy(){oi.remove("previous_websocket_failure")}appendFrame_(t){if(this.frames.push(t),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Ds(n);this.onMessage(r)}}handleNewFrameCount_(t){this.totalFrames=t,this.frames=[]}extractFrameCount_(t){if(V(this.frames===null,"We already have a frame buffer"),t.length<=6){const n=Number(t);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),t}handleIncomingFrame(t){if(this.mySock===null)return;const n=t.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(t){this.resetKeepAlive();const n=tt(t);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=sk(n,BP);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(VP))}sendString_(t){try{this.mySock.send(t)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}hn.responsesRequiredToBeHealthy=2;hn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(t){this.initTransports_(t)}static get ALL_TRANSPORTS(){return[qi,hn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(t){const n=hn&&hn.isAvailable();let r=n&&!hn.previouslyFailed();if(t.webSocketOnly&&(n||Ut("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[hn];else{const i=this.transports_=[];for(const o of js.ALL_TRANSPORTS)o&&o.isAvailable()&&i.push(o);js.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}js.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $P=6e4,HP=5e3,WP=10*1024,qP=100*1024,ed="t",Wy="d",KP="s",qy="r",GP="e",Ky="o",Gy="a",Yy="n",Qy="p",YP="h";class QP{constructor(t,n,r,i,o,s,a,l,u,d){this.id=t,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=o,this.onMessage_=s,this.onReady_=a,this.onDisconnect_=l,this.onKill_=u,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ca("c:"+this.id+":"),this.transportManager_=new js(n),this.log_("Connection created"),this.start_()}start_(){const t=this.transportManager_.initialTransport();this.conn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=t.healthyTimeout||0;i>0&&(this.healthyTimeout_=ls(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>qP?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>WP?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(t){return n=>{t===this.conn_?this.onConnectionLost_(n):t===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(t){return n=>{this.state_!==2&&(t===this.rx_?this.onPrimaryMessageReceived_(n):t===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(t){const n={t:"d",d:t};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(t){if(ed in t){const n=t[ed];n===Gy?this.upgradeIfSecondaryHealthy_():n===qy?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Ky&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(t){const n=Fo("t",t),r=Fo("d",t);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Qy,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Gy,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Yy,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(t){const n=Fo("t",t),r=Fo("d",t);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(t){this.onPrimaryResponse_(),this.onMessage_(t)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(t){const n=Fo(ed,t);if(Wy in t){const r=t[Wy];if(n===YP){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Yy){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===KP?this.onConnectionShutdown_(r):n===qy?this.onReset_(r):n===GP?Ff("Server Error: "+r):n===Ky?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ff("Unknown control packet command: "+n)}}onHandshake_(t){const n=t.ts,r=t.v,i=t.h;this.sessionId=t.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Oh!==r&&Ut("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)}startUpgrade_(t){this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),ls(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor($P))}onReset_(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.host=t,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(t,n){this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ls(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(HP))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Qy,d:{}}}))}onSecondaryConnectionLost_(){const t=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===t||this.rx_===t)&&this.close()}onConnectionLost_(t){this.conn_=null,!t&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(oi.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(t){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(t)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{put(t,n,r,i){}merge(t,n,r,i){}refreshAuthToken(t){}refreshAppCheckToken(t){}onDisconnectPut(t,n,r){}onDisconnectMerge(t,n,r){}onDisconnectCancel(t,n){}reportStats(t){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(t){this.allowedEvents_=t,this.listeners_={},V(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...n){if(Array.isArray(this.listeners_[t])){const r=[...this.listeners_[t]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(t,n,r){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:n,context:r});const i=this.getInitialEvent(t);i&&n.apply(r,i)}off(t,n,r){this.validateEventType_(t);const i=this.listeners_[t]||[];for(let o=0;o<i.length;o++)if(i[o].callback===n&&(!r||r===i[o].context)){i.splice(o,1);return}}validateEventType_(t){V(this.allowedEvents_.find(n=>n===t),"Unknown event: "+t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu extends Ik{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!wh()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new iu}getInitialEvent(t){return V(t==="online","Unknown event type: "+t),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=32,Xy=768;class Ce{constructor(t,n){if(n===void 0){this.pieces_=t.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=n}toString(){let t="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(t+="/"+this.pieces_[n]);return t||"/"}}function ye(){return new Ce("")}function oe(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function Fr(e){return e.pieces_.length-e.pieceNum_}function Re(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new Ce(e.pieces_,t)}function Ek(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function JP(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)e.pieces_[n]!==""&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}function Ck(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Ak(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new Ce(t,0)}function nt(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof Ce)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const r=t.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new Ce(n,0)}function ae(e){return e.pieceNum_>=e.pieces_.length}function Et(e,t){const n=oe(e),r=oe(t);if(n===null)return t;if(n===r)return Et(Re(e),Re(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function jh(e,t){if(Fr(e)!==Fr(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function mn(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(Fr(e)>Fr(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class XP{constructor(t,n){this.errorPrefix_=n,this.parts_=Ck(t,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=ju(this.parts_[r]);Tk(this)}}function ZP(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=ju(t),Tk(e)}function eD(e){const t=e.parts_.pop();e.byteLength_-=ju(t),e.parts_.length>0&&(e.byteLength_-=1)}function Tk(e){if(e.byteLength_>Xy)throw new Error(e.errorPrefix_+"has a key path longer than "+Xy+" bytes ("+e.byteLength_+").");if(e.parts_.length>Jy)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Jy+") or object contains a cycle "+Xr(e))}function Xr(e){return e.parts_.length===0?"":"in property '"+e.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh extends Ik{constructor(){super(["visible"]);let t,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",t="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",t="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",t="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[t];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Fh}getInitialEvent(t){return V(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=1e3,tD=60*5*1e3,Zy=30*1e3,nD=1.3,rD=3e4,iD="server_kill",ev=3;class Yn extends Sk{constructor(t,n,r,i,o,s,a,l){if(super(),this.repoInfo_=t,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=o,this.authTokenProvider_=s,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Yn.nextPersistentConnectionId_++,this.log_=ca("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Uo,this.maxReconnectDelay_=tD,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Fh.getInstance().on("visible",this.onVisible_,this),t.host.indexOf("fblocal")===-1&&iu.getInstance().on("online",this.onOnline_,this)}sendRequest(t,n,r){const i=++this.requestNumber_,o={r:i,a:t,b:n};this.log_(tt(o)),V(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),r&&(this.requestCBHash_[i]=r)}get(t){this.initConnection_();const n=new ia,i={action:"g",request:{p:t._path.toString(),q:t._queryObject},onComplete:s=>{const a=s.d;s.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),n.promise}listen(t,n,r,i){this.initConnection_();const o=t._queryIdentifier,s=t._path.toString();this.log_("Listen called for "+s+" "+o),this.listens.has(s)||this.listens.set(s,new Map),V(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"listen() called for non-default but complete query"),V(!this.listens.get(s).has(o),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:t,tag:r};this.listens.get(s).set(o,a),this.connected_&&this.sendListen_(a)}sendGet_(t){const n=this.outstandingGets_[t];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[t],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(t){const n=t.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const o={p:r},s="q";t.tag&&(o.q=n._queryObject,o.t=t.tag),o.h=t.hashFn(),this.sendRequest(s,o,a=>{const l=a.d,u=a.s;Yn.warnOnListenWarnings_(l,n),(this.listens.get(r)&&this.listens.get(r).get(i))===t&&(this.log_("listen response",a),u!=="ok"&&this.removeListen_(r,i),t.onComplete&&t.onComplete(u,l))})}static warnOnListenWarnings_(t,n){if(t&&typeof t=="object"&&kn(t,"w")){const r=yi(t,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',o=n._path.toString();Ut(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(t)}reduceReconnectDelayIfAdminCredential_(t){(t&&t.length===40||YT(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Zy)}refreshAppCheckToken(t){this.appCheckToken_=t,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const t=this.authToken_,n=GT(t)?"auth":"gauth",r={cred:t};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const o=i.s,s=i.d||"error";this.authToken_===t&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,s))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},t=>{const n=t.s,r=t.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(t,n){const r=t._path.toString(),i=t._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),V(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,t._queryObject,n)}sendUnlisten_(t,n,r,i){this.log_("Unlisten on "+t+" for "+n);const o={p:t},s="n";i&&(o.q=r,o.t=i),this.sendRequest(s,o)}onDisconnectPut(t,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",t,n,r):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:n,onComplete:r})}onDisconnectMerge(t,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",t,n,r):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:n,onComplete:r})}onDisconnectCancel(t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",t,null,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(t,n,r,i){const o={p:n,d:r};this.log_("onDisconnect "+t,o),this.sendRequest(t,o,s=>{i&&setTimeout(()=>{i(s.s,s.d)},Math.floor(0))})}put(t,n,r,i){this.putInternal("p",t,n,r,i)}merge(t,n,r,i){this.putInternal("m",t,n,r,i)}putInternal(t,n,r,i,o){this.initConnection_();const s={p:n,d:r};o!==void 0&&(s.h=o),this.outstandingPuts_.push({action:t,request:s,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(t){const n=this.outstandingPuts_[t].action,r=this.outstandingPuts_[t].request,i=this.outstandingPuts_[t].onComplete;this.outstandingPuts_[t].queued=this.connected_,this.sendRequest(n,r,o=>{this.log_(n+" response",o),delete this.outstandingPuts_[t],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(o.s,o.d)})}reportStats(t){if(this.connected_){const n={c:t};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const o=r.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(t){if("r"in t){this.log_("from server: "+tt(t));const n=t.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}}onDataPush_(t,n){this.log_("handleServerMessage",t,n),t==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):t==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):t==="c"?this.onListenRevoked_(n.p,n.q):t==="ac"?this.onAuthRevoked_(n.s,n.d):t==="apc"?this.onAppCheckRevoked_(n.s,n.d):t==="sd"?this.onSecurityDebugPacket_(n):Ff("Unrecognized action received from server: "+tt(t)+`
Are you using the latest client?`)}onReady_(t,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(t),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(t){V(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(t))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0)),this.visible_=t}onOnline_(t){t?(this.log_("Browser went online."),this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rD&&(this.reconnectDelay_=Uo),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const t=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-t);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*nD)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Yn.nextConnectionId_++,o=this.lastSessionId;let s=!1,a=null;const l=function(){a?a.close():(s=!0,r())},u=function(c){V(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(c)};this.realtime_={close:l,sendRequest:u};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[c,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);s?wt("getToken() completed but was canceled"):(wt("getToken() completed. Creating connection."),this.authToken_=c&&c.accessToken,this.appCheckToken_=f&&f.token,a=new QP(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,r,p=>{Ut(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(iD)},o))}catch(c){this.log_("Failed to get token: "+c),s||(this.repoInfo_.nodeAdmin&&Ut(c),l())}}}interrupt(t){wt("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(t){wt("Resuming connection for reason: "+t),delete this.interruptReasons_[t],Tf(this.interruptReasons_)&&(this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(t){const n=t-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let t=0;t<this.outstandingPuts_.length;t++){const n=this.outstandingPuts_[t];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(t,n){let r;n?r=n.map(o=>Dh(o)).join("$"):r="default";const i=this.removeListen_(t,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(t,n){const r=new Ce(t).toString();let i;if(this.listens.has(r)){const o=this.listens.get(r);i=o.get(n),o.delete(n),o.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(t,n){wt("Auth token revoked: "+t+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(t==="invalid_token"||t==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ev&&(this.reconnectDelay_=Zy,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(t,n){wt("App check token revoked: "+t+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(t==="invalid_token"||t==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ev&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const t of this.listens.values())for(const n of t.values())this.sendListen_(n);for(let t=0;t<this.outstandingPuts_.length;t++)this.outstandingPuts_[t]&&this.sendPut_(t);for(;this.onDisconnectRequestQueue_.length;){const t=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(t.action,t.pathString,t.data,t.onComplete)}for(let t=0;t<this.outstandingGets_.length;t++)this.outstandingGets_[t]&&this.sendGet_(t)}sendConnectStats_(){const t={};let n="js";t["sdk."+n+"."+nk.replace(/\./g,"-")]=1,wh()?t["framework.cordova"]=1:mx()&&(t["framework.reactnative"]=1),this.reportStats(t)}shouldReconnect_(){const t=iu.getInstance().currentlyOnline();return Tf(this.interruptReasons_)&&t}}Yn.nextPersistentConnectionId_=0;Yn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(t,n){this.name=t,this.node=n}static Wrap(t,n){return new se(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{getCompare(){return this.compare.bind(this)}indexedValueChanged(t,n){const r=new se(po,t),i=new se(po,n);return this.compare(r,i)!==0}minPost(){return se.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Va;class Rk extends Vu{static get __EMPTY_NODE(){return Va}static set __EMPTY_NODE(t){Va=t}compare(t,n){return Io(t.name,n.name)}isDefinedOn(t){throw bo("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(t,n){return!1}minPost(){return se.MIN}maxPost(){return new se(_i,Va)}makePost(t,n){return V(typeof t=="string","KeyIndex indexValue must always be a string."),new se(t,Va)}toString(){return".key"}}const ro=new Rk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(t,n,r,i,o=null){this.isReverse_=i,this.resultGenerator_=o,this.nodeStack_=[];let s=1;for(;!t.isEmpty();)if(t=t,s=n?r(t.key,n):1,i&&(s*=-1),s<0)this.isReverse_?t=t.left:t=t.right;else if(s===0){this.nodeStack_.push(t);break}else this.nodeStack_.push(t),this.isReverse_?t=t.right:t=t.left}getNext(){if(this.nodeStack_.length===0)return null;let t=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(t.key,t.value):n={key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}}}class st{constructor(t,n,r,i,o){this.key=t,this.value=n,this.color=r??st.RED,this.left=i??Lt.EMPTY_NODE,this.right=o??Lt.EMPTY_NODE}copy(t,n,r,i,o){return new st(t??this.key,n??this.value,r??this.color,i??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||!!t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let i=this;const o=r(t,i.key);return o<0?i=i.copy(null,null,null,i.left.insert(t,n,r),null):o===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(t,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Lt.EMPTY_NODE;let t=this;return!t.left.isRed_()&&!t.left.left.isRed_()&&(t=t.moveRedLeft_()),t=t.copy(null,null,null,t.left.removeMin_(),null),t.fixUp_()}remove(t,n){let r,i;if(r=this,n(t,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(t,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(t,r.key)===0){if(r.right.isEmpty())return Lt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(t,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t}moveRedLeft_(){let t=this.colorFlip_();return t.right.left.isRed_()&&(t=t.copy(null,null,null,null,t.right.rotateRight_()),t=t.rotateLeft_(),t=t.colorFlip_()),t}moveRedRight_(){let t=this.colorFlip_();return t.left.left.isRed_()&&(t=t.rotateRight_(),t=t.colorFlip_()),t}rotateLeft_(){const t=this.copy(null,null,st.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){const t=this.copy(null,null,st.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth_(){const t=this.check_();return Math.pow(2,t)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const t=this.left.check_();if(t!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)}}st.RED=!0;st.BLACK=!1;class oD{copy(t,n,r,i,o){return this}insert(t,n,r){return new st(t,n,null)}remove(t,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Lt{constructor(t,n=Lt.EMPTY_NODE){this.comparator_=t,this.root_=n}insert(t,n){return new Lt(this.comparator_,this.root_.insert(t,n,this.comparator_).copy(null,null,st.BLACK,null,null))}remove(t){return new Lt(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,st.BLACK,null,null))}get(t){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(t,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(t){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(t,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(t){return this.root_.inorderTraversal(t)}reverseTraversal(t){return this.root_.reverseTraversal(t)}getIterator(t){return new $a(this.root_,null,this.comparator_,!1,t)}getIteratorFrom(t,n){return new $a(this.root_,t,this.comparator_,!1,n)}getReverseIteratorFrom(t,n){return new $a(this.root_,t,this.comparator_,!0,n)}getReverseIterator(t){return new $a(this.root_,null,this.comparator_,!0,t)}}Lt.EMPTY_NODE=new oD;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sD(e,t){return Io(e.name,t.name)}function Uh(e,t){return Io(e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zf;function aD(e){zf=e}const Nk=function(e){return typeof e=="number"?"number:"+ak(e):"string:"+e},Pk=function(e){if(e.isLeafNode()){const t=e.val();V(typeof t=="string"||typeof t=="number"||typeof t=="object"&&kn(t,".sv"),"Priority must be a string or number.")}else V(e===zf||e.isEmpty(),"priority of unexpected type.");V(e===zf||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tv;class it{constructor(t,n=it.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=n,this.lazyHash_=null,V(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Pk(this.priorityNode_)}static set __childrenNodeConstructor(t){tv=t}static get __childrenNodeConstructor(){return tv}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new it(this.value_,t)}getImmediateChild(t){return t===".priority"?this.priorityNode_:it.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return ae(t)?this:oe(t)===".priority"?this.priorityNode_:it.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(t,n){return null}updateImmediateChild(t,n){return t===".priority"?this.updatePriority(n):n.isEmpty()&&t!==".priority"?this:it.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,n).updatePriority(this.priorityNode_)}updateChild(t,n){const r=oe(t);return r===null?n:n.isEmpty()&&r!==".priority"?this:(V(r!==".priority"||Fr(t)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,it.__childrenNodeConstructor.EMPTY_NODE.updateChild(Re(t),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(t,n){return!1}val(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let t="";this.priorityNode_.isEmpty()||(t+="priority:"+Nk(this.priorityNode_.val())+":");const n=typeof this.value_;t+=n+":",n==="number"?t+=ak(this.value_):t+=this.value_,this.lazyHash_=ok(t)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===it.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof it.__childrenNodeConstructor?-1:(V(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))}compareToLeafNode_(t){const n=typeof t.value_,r=typeof this.value_,i=it.VALUE_TYPE_ORDER.indexOf(n),o=it.VALUE_TYPE_ORDER.indexOf(r);return V(i>=0,"Unknown leaf type: "+n),V(o>=0,"Unknown leaf type: "+r),i===o?r==="object"?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:o-i}withIndex(){return this}isIndexed(){return!0}equals(t){if(t===this)return!0;if(t.isLeafNode()){const n=t;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}it.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dk,Ok;function lD(e){Dk=e}function uD(e){Ok=e}class cD extends Vu{compare(t,n){const r=t.node.getPriority(),i=n.node.getPriority(),o=r.compareTo(i);return o===0?Io(t.name,n.name):o}isDefinedOn(t){return!t.getPriority().isEmpty()}indexedValueChanged(t,n){return!t.getPriority().equals(n.getPriority())}minPost(){return se.MIN}maxPost(){return new se(_i,new it("[PRIORITY-POST]",Ok))}makePost(t,n){const r=Dk(t);return new se(n,new it("[PRIORITY-POST]",r))}toString(){return".priority"}}const Be=new cD;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dD=Math.log(2);class fD{constructor(t){const n=o=>parseInt(Math.log(o)/dD,10),r=o=>parseInt(Array(o+1).join("1"),2);this.count=n(t+1),this.current_=this.count-1;const i=r(this.count);this.bits_=t+1&i}nextBitIsOne(){const t=!(this.bits_&1<<this.current_);return this.current_--,t}}const ou=function(e,t,n,r){e.sort(t);const i=function(l,u){const d=u-l;let c,f;if(d===0)return null;if(d===1)return c=e[l],f=n?n(c):c,new st(f,c.node,st.BLACK,null,null);{const p=parseInt(d/2,10)+l,m=i(l,p),w=i(p+1,u);return c=e[p],f=n?n(c):c,new st(f,c.node,st.BLACK,m,w)}},o=function(l){let u=null,d=null,c=e.length;const f=function(m,w){const C=c-m,y=c;c-=m;const v=i(C+1,y),g=e[C],k=n?n(g):g;p(new st(k,g.node,w,null,v))},p=function(m){u?(u.left=m,u=m):(d=m,u=m)};for(let m=0;m<l.count;++m){const w=l.nextBitIsOne(),C=Math.pow(2,l.count-(m+1));w?f(C,st.BLACK):(f(C,st.BLACK),f(C,st.RED))}return d},s=new fD(e.length),a=o(s);return new Lt(r||t,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let td;const Ri={};class Kn{constructor(t,n){this.indexes_=t,this.indexSet_=n}static get Default(){return V(Ri&&Be,"ChildrenNode.ts has not been loaded"),td=td||new Kn({".priority":Ri},{".priority":Be}),td}get(t){const n=yi(this.indexes_,t);if(!n)throw new Error("No index defined for "+t);return n instanceof Lt?n:null}hasIndex(t){return kn(this.indexSet_,t.toString())}addIndex(t,n){V(t!==ro,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const o=n.getIterator(se.Wrap);let s=o.getNext();for(;s;)i=i||t.isDefinedOn(s.node),r.push(s),s=o.getNext();let a;i?a=ou(r,t.getCompare()):a=Ri;const l=t.toString(),u=Object.assign({},this.indexSet_);u[l]=t;const d=Object.assign({},this.indexes_);return d[l]=a,new Kn(d,u)}addToIndexes(t,n){const r=Ql(this.indexes_,(i,o)=>{const s=yi(this.indexSet_,o);if(V(s,"Missing index implementation for "+o),i===Ri)if(s.isDefinedOn(t.node)){const a=[],l=n.getIterator(se.Wrap);let u=l.getNext();for(;u;)u.name!==t.name&&a.push(u),u=l.getNext();return a.push(t),ou(a,s.getCompare())}else return Ri;else{const a=n.get(t.name);let l=i;return a&&(l=l.remove(new se(t.name,a))),l.insert(t,t.node)}});return new Kn(r,this.indexSet_)}removeFromIndexes(t,n){const r=Ql(this.indexes_,i=>{if(i===Ri)return i;{const o=n.get(t.name);return o?i.remove(new se(t.name,o)):i}});return new Kn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zo;class Q{constructor(t,n,r){this.children_=t,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Pk(this.priorityNode_),this.children_.isEmpty()&&V(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return zo||(zo=new Q(new Lt(Uh),null,Kn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||zo}updatePriority(t){return this.children_.isEmpty()?this:new Q(this.children_,t,this.indexMap_)}getImmediateChild(t){if(t===".priority")return this.getPriority();{const n=this.children_.get(t);return n===null?zo:n}}getChild(t){const n=oe(t);return n===null?this:this.getImmediateChild(n).getChild(Re(t))}hasChild(t){return this.children_.get(t)!==null}updateImmediateChild(t,n){if(V(n,"We should always be passing snapshot nodes"),t===".priority")return this.updatePriority(n);{const r=new se(t,n);let i,o;n.isEmpty()?(i=this.children_.remove(t),o=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(t,n),o=this.indexMap_.addToIndexes(r,this.children_));const s=i.isEmpty()?zo:this.priorityNode_;return new Q(i,s,o)}}updateChild(t,n){const r=oe(t);if(r===null)return n;{V(oe(t)!==".priority"||Fr(t)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Re(t),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;const n={};let r=0,i=0,o=!0;if(this.forEachChild(Be,(s,a)=>{n[s]=a.val(t),r++,o&&Q.INTEGER_REGEXP_.test(s)?i=Math.max(i,Number(s)):o=!1}),!t&&o&&i<2*r){const s=[];for(const a in n)s[a]=n[a];return s}else return t&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let t="";this.getPriority().isEmpty()||(t+="priority:"+Nk(this.getPriority().val())+":"),this.forEachChild(Be,(n,r)=>{const i=r.hash();i!==""&&(t+=":"+n+":"+i)}),this.lazyHash_=t===""?"":ok(t)}return this.lazyHash_}getPredecessorChildName(t,n,r){const i=this.resolveIndex_(r);if(i){const o=i.getPredecessorKey(new se(t,n));return o?o.name:null}else return this.children_.getPredecessorKey(t)}getFirstChildName(t){const n=this.resolveIndex_(t);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(t){const n=this.getFirstChildName(t);return n?new se(n,this.children_.get(n)):null}getLastChildName(t){const n=this.resolveIndex_(t);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(t){const n=this.getLastChildName(t);return n?new se(n,this.children_.get(n)):null}forEachChild(t,n){const r=this.resolveIndex_(t);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(t){return this.getIteratorFrom(t.minPost(),t)}getIteratorFrom(t,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(t,i=>i);{const i=this.children_.getIteratorFrom(t.name,se.Wrap);let o=i.peek();for(;o!=null&&n.compare(o,t)<0;)i.getNext(),o=i.peek();return i}}getReverseIterator(t){return this.getReverseIteratorFrom(t.maxPost(),t)}getReverseIteratorFrom(t,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(t,i=>i);{const i=this.children_.getReverseIteratorFrom(t.name,se.Wrap);let o=i.peek();for(;o!=null&&n.compare(o,t)>0;)i.getNext(),o=i.peek();return i}}compareTo(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===da?-1:0}withIndex(t){if(t===ro||this.indexMap_.hasIndex(t))return this;{const n=this.indexMap_.addIndex(t,this.children_);return new Q(this.children_,this.priorityNode_,n)}}isIndexed(t){return t===ro||this.indexMap_.hasIndex(t)}equals(t){if(t===this)return!0;if(t.isLeafNode())return!1;{const n=t;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(Be),i=n.getIterator(Be);let o=r.getNext(),s=i.getNext();for(;o&&s;){if(o.name!==s.name||!o.node.equals(s.node))return!1;o=r.getNext(),s=i.getNext()}return o===null&&s===null}else return!1;else return!1}}resolveIndex_(t){return t===ro?null:this.indexMap_.get(t.toString())}}Q.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class pD extends Q{constructor(){super(new Lt(Uh),Q.EMPTY_NODE,Kn.Default)}compareTo(t){return t===this?0:1}equals(t){return t===this}getPriority(){return this}getImmediateChild(t){return Q.EMPTY_NODE}isEmpty(){return!1}}const da=new pD;Object.defineProperties(se,{MIN:{value:new se(po,Q.EMPTY_NODE)},MAX:{value:new se(_i,da)}});Rk.__EMPTY_NODE=Q.EMPTY_NODE;it.__childrenNodeConstructor=Q;aD(da);uD(da);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hD=!0;function et(e,t=null){if(e===null)return Q.EMPTY_NODE;if(typeof e=="object"&&".priority"in e&&(t=e[".priority"]),V(t===null||typeof t=="string"||typeof t=="number"||typeof t=="object"&&".sv"in t,"Invalid priority type found: "+typeof t),typeof e=="object"&&".value"in e&&e[".value"]!==null&&(e=e[".value"]),typeof e!="object"||".sv"in e){const n=e;return new it(n,et(t))}if(!(e instanceof Array)&&hD){const n=[];let r=!1;if(zt(e,(s,a)=>{if(s.substring(0,1)!=="."){const l=et(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),n.push(new se(s,l)))}}),n.length===0)return Q.EMPTY_NODE;const o=ou(n,sD,s=>s.name,Uh);if(r){const s=ou(n,Be.getCompare());return new Q(o,et(t),new Kn({".priority":s},{".priority":Be}))}else return new Q(o,et(t),Kn.Default)}else{let n=Q.EMPTY_NODE;return zt(e,(r,i)=>{if(kn(e,r)&&r.substring(0,1)!=="."){const o=et(i);(o.isLeafNode()||!o.isEmpty())&&(n=n.updateImmediateChild(r,o))}}),n.updatePriority(et(t))}}lD(et);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mD extends Vu{constructor(t){super(),this.indexPath_=t,V(!ae(t)&&oe(t)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(t){return t.getChild(this.indexPath_)}isDefinedOn(t){return!t.getChild(this.indexPath_).isEmpty()}compare(t,n){const r=this.extractChild(t.node),i=this.extractChild(n.node),o=r.compareTo(i);return o===0?Io(t.name,n.name):o}makePost(t,n){const r=et(t),i=Q.EMPTY_NODE.updateChild(this.indexPath_,r);return new se(n,i)}maxPost(){const t=Q.EMPTY_NODE.updateChild(this.indexPath_,da);return new se(_i,t)}toString(){return Ck(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gD extends Vu{compare(t,n){const r=t.node.compareTo(n.node);return r===0?Io(t.name,n.name):r}isDefinedOn(t){return!0}indexedValueChanged(t,n){return!t.equals(n)}minPost(){return se.MIN}maxPost(){return se.MAX}makePost(t,n){const r=et(t);return new se(n,r)}toString(){return".value"}}const yD=new gD;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lk(e){return{type:"value",snapshotNode:e}}function ho(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function Fs(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function Us(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}function vD(e,t){return{type:"child_moved",snapshotNode:t,childName:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(t){this.index_=t}updateChild(t,n,r,i,o,s){V(t.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=t.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(s!=null&&(r.isEmpty()?t.hasChild(n)?s.trackChildChange(Fs(n,a)):V(t.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(ho(n,r)):s.trackChildChange(Us(n,r,a))),t.isLeafNode()&&r.isEmpty())?t:t.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(t,n,r){return r!=null&&(t.isLeafNode()||t.forEachChild(Be,(i,o)=>{n.hasChild(i)||r.trackChildChange(Fs(i,o))}),n.isLeafNode()||n.forEachChild(Be,(i,o)=>{if(t.hasChild(i)){const s=t.getImmediateChild(i);s.equals(o)||r.trackChildChange(Us(i,o,s))}else r.trackChildChange(ho(i,o))})),n.withIndex(this.index_)}updatePriority(t,n){return t.isEmpty()?Q.EMPTY_NODE:t.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(t){this.indexedFilter_=new zh(t.getIndex()),this.index_=t.getIndex(),this.startPost_=zs.getStartPost_(t),this.endPost_=zs.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(t){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),t)<=0:this.index_.compare(this.getStartPost(),t)<0,r=this.endIsInclusive_?this.index_.compare(t,this.getEndPost())<=0:this.index_.compare(t,this.getEndPost())<0;return n&&r}updateChild(t,n,r,i,o,s){return this.matches(new se(n,r))||(r=Q.EMPTY_NODE),this.indexedFilter_.updateChild(t,n,r,i,o,s)}updateFullNode(t,n,r){n.isLeafNode()&&(n=Q.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(Q.EMPTY_NODE);const o=this;return n.forEachChild(Be,(s,a)=>{o.matches(new se(s,a))||(i=i.updateImmediateChild(s,Q.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(t,i,r)}updatePriority(t,n){return t}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(t){if(t.hasStart()){const n=t.getIndexStartName();return t.getIndex().makePost(t.getIndexStartValue(),n)}else return t.getIndex().minPost()}static getEndPost_(t){if(t.hasEnd()){const n=t.getIndexEndName();return t.getIndex().makePost(t.getIndexEndValue(),n)}else return t.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wD{constructor(t){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new zs(t),this.index_=t.getIndex(),this.limit_=t.getLimit(),this.reverse_=!t.isViewFromLeft(),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}updateChild(t,n,r,i,o,s){return this.rangedFilter_.matches(new se(n,r))||(r=Q.EMPTY_NODE),t.getImmediateChild(n).equals(r)?t:t.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(t,n,r,i,o,s):this.fullLimitUpdateChild_(t,n,r,o,s)}updateFullNode(t,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=Q.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=Q.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let s=0;for(;o.hasNext()&&s<this.limit_;){const a=o.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),s++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(Q.EMPTY_NODE);let o;this.reverse_?o=i.getReverseIterator(this.index_):o=i.getIterator(this.index_);let s=0;for(;o.hasNext();){const a=o.getNext();s<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?s++:i=i.updateImmediateChild(a.name,Q.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(t,i,r)}updatePriority(t,n){return t}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(t,n,r,i,o){let s;if(this.reverse_){const c=this.index_.getCompare();s=(f,p)=>c(p,f)}else s=this.index_.getCompare();const a=t;V(a.numChildren()===this.limit_,"");const l=new se(n,r),u=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const c=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,u,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const p=f==null?1:s(f,l);if(d&&!r.isEmpty()&&p>=0)return o!=null&&o.trackChildChange(Us(n,r,c)),a.updateImmediateChild(n,r);{o!=null&&o.trackChildChange(Fs(n,c));const w=a.updateImmediateChild(n,Q.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(o!=null&&o.trackChildChange(ho(f.name,f.node)),w.updateImmediateChild(f.name,f.node)):w}}else return r.isEmpty()?t:d&&s(u,l)>=0?(o!=null&&(o.trackChildChange(Fs(u.name,u.node)),o.trackChildChange(ho(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(u.name,Q.EMPTY_NODE)):t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Be}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return V(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return V(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:po}hasEnd(){return this.endSet_}getIndexEndValue(){return V(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return V(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:_i}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return V(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Be}copy(){const t=new Bh;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}}function _D(e){return e.loadsAllData()?new zh(e.getIndex()):e.hasLimit()?new wD(e):new zs(e)}function nv(e){const t={};if(e.isDefault())return t;let n;if(e.index_===Be?n="$priority":e.index_===yD?n="$value":e.index_===ro?n="$key":(V(e.index_ instanceof mD,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=tt(n),e.startSet_){const r=e.startAfterSet_?"startAfter":"startAt";t[r]=tt(e.indexStartValue_),e.startNameSet_&&(t[r]+=","+tt(e.indexStartName_))}if(e.endSet_){const r=e.endBeforeSet_?"endBefore":"endAt";t[r]=tt(e.indexEndValue_),e.endNameSet_&&(t[r]+=","+tt(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function rv(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;n===""&&(e.isViewFromLeft()?n="l":n="r"),t.vf=n}return e.index_!==Be&&(t.i=e.index_.toString()),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su extends Sk{constructor(t,n,r,i){super(),this.repoInfo_=t,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=ca("p:rest:"),this.listens_={}}reportStats(t){throw new Error("Method not implemented.")}static getListenId_(t,n){return n!==void 0?"tag$"+n:(V(t._queryParams.isDefault(),"should have a tag if it's not a default query."),t._path.toString())}listen(t,n,r,i){const o=t._path.toString();this.log_("Listen called for "+o+" "+t._queryIdentifier);const s=su.getListenId_(t,r),a={};this.listens_[s]=a;const l=nv(t._queryParams);this.restRequest_(o+".json",l,(u,d)=>{let c=d;if(u===404&&(c=null,u=null),u===null&&this.onDataUpdate_(o,c,!1,r),yi(this.listens_,s)===a){let f;u?u===401?f="permission_denied":f="rest_error:"+u:f="ok",i(f,null)}})}unlisten(t,n){const r=su.getListenId_(t,n);delete this.listens_[r]}get(t){const n=nv(t._queryParams),r=t._path.toString(),i=new ia;return this.restRequest_(r+".json",n,(o,s)=>{let a=s;o===404&&(a=null,o=null),o===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(t){}restRequest_(t,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,o])=>{i&&i.accessToken&&(n.auth=i.accessToken),o&&o.token&&(n.ac=o.token);const s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+t+"?ns="+this.repoInfo_.namespace+xo(n);this.log_("Sending REST request for "+s);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+s+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ds(a.responseText)}catch{Ut("Failed to parse JSON response for "+s+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&Ut("Got unsuccessful REST response for "+s+" Status: "+a.status),r(a.status);r=null}},a.open("GET",s,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bD{constructor(){this.rootNode_=Q.EMPTY_NODE}getNode(t){return this.rootNode_.getChild(t)}updateSnapshot(t,n){this.rootNode_=this.rootNode_.updateChild(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(){return{value:null,children:new Map}}function Mk(e,t,n){if(ae(t))e.value=n,e.children.clear();else if(e.value!==null)e.value=e.value.updateChild(t,n);else{const r=oe(t);e.children.has(r)||e.children.set(r,au());const i=e.children.get(r);t=Re(t),Mk(i,t,n)}}function Bf(e,t,n){e.value!==null?n(t,e.value):xD(e,(r,i)=>{const o=new Ce(t.toString()+"/"+r);Bf(i,o,n)})}function xD(e,t){e.children.forEach((n,r)=>{t(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kD{constructor(t){this.collection_=t,this.last_=null}get(){const t=this.collection_.get(),n=Object.assign({},t);return this.last_&&zt(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iv=10*1e3,SD=30*1e3,ID=5*60*1e3;class ED{constructor(t,n){this.server_=n,this.statsToReport_={},this.statsListener_=new kD(t);const r=iv+(SD-iv)*Math.random();ls(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const t=this.statsListener_.get(),n={};let r=!1;zt(t,(i,o)=>{o>0&&kn(this.statsToReport_,i)&&(n[i]=o,r=!0)}),r&&this.server_.reportStats(n),ls(this.reportStats_.bind(this),Math.floor(Math.random()*2*ID))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gn;(function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(gn||(gn={}));function jk(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Vh(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function $h(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(t,n,r){this.path=t,this.affectedTree=n,this.revert=r,this.type=gn.ACK_USER_WRITE,this.source=jk()}operationForChild(t){if(ae(this.path)){if(this.affectedTree.value!=null)return V(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new Ce(t));return new lu(ye(),n,this.revert)}}else return V(oe(this.path)===t,"operationForChild called for unrelated child."),new lu(Re(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(t,n){this.source=t,this.path=n,this.type=gn.LISTEN_COMPLETE}operationForChild(t){return ae(this.path)?new Bs(this.source,ye()):new Bs(this.source,Re(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(t,n,r){this.source=t,this.path=n,this.snap=r,this.type=gn.OVERWRITE}operationForChild(t){return ae(this.path)?new bi(this.source,ye(),this.snap.getImmediateChild(t)):new bi(this.source,Re(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(t,n,r){this.source=t,this.path=n,this.children=r,this.type=gn.MERGE}operationForChild(t){if(ae(this.path)){const n=this.children.subtree(new Ce(t));return n.isEmpty()?null:n.value?new bi(this.source,ye(),n.value):new Vs(this.source,ye(),n)}else return V(oe(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new Vs(this.source,Re(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,n,r){this.node_=t,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(t){if(ae(t))return this.isFullyInitialized()&&!this.filtered_;const n=oe(t);return this.isCompleteForChild(n)}isCompleteForChild(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CD{constructor(t){this.query_=t,this.index_=this.query_._queryParams.getIndex()}}function AD(e,t,n,r){const i=[],o=[];return t.forEach(s=>{s.type==="child_changed"&&e.index_.indexedValueChanged(s.oldSnap,s.snapshotNode)&&o.push(vD(s.childName,s.snapshotNode))}),Bo(e,i,"child_removed",t,r,n),Bo(e,i,"child_added",t,r,n),Bo(e,i,"child_moved",o,r,n),Bo(e,i,"child_changed",t,r,n),Bo(e,i,"value",t,r,n),i}function Bo(e,t,n,r,i,o){const s=r.filter(a=>a.type===n);s.sort((a,l)=>RD(e,a,l)),s.forEach(a=>{const l=TD(e,a,o);i.forEach(u=>{u.respondsTo(a.type)&&t.push(u.createEvent(l,e.query_))})})}function TD(e,t,n){return t.type==="value"||t.type==="child_removed"||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}function RD(e,t,n){if(t.childName==null||n.childName==null)throw bo("Should only compare child_ events.");const r=new se(t.childName,t.snapshotNode),i=new se(n.childName,n.snapshotNode);return e.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(e,t){return{eventCache:e,serverCache:t}}function us(e,t,n,r){return $u(new Ur(t,n,r),e.serverCache)}function Fk(e,t,n,r){return $u(e.eventCache,new Ur(t,n,r))}function uu(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function xi(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nd;const ND=()=>(nd||(nd=new Lt(gP)),nd);class Oe{constructor(t,n=ND()){this.value=t,this.children=n}static fromObject(t){let n=new Oe(null);return zt(t,(r,i)=>{n=n.set(new Ce(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(t,n){if(this.value!=null&&n(this.value))return{path:ye(),value:this.value};if(ae(t))return null;{const r=oe(t),i=this.children.get(r);if(i!==null){const o=i.findRootMostMatchingPathAndValue(Re(t),n);return o!=null?{path:nt(new Ce(r),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(t){return this.findRootMostMatchingPathAndValue(t,()=>!0)}subtree(t){if(ae(t))return this;{const n=oe(t),r=this.children.get(n);return r!==null?r.subtree(Re(t)):new Oe(null)}}set(t,n){if(ae(t))return new Oe(n,this.children);{const r=oe(t),o=(this.children.get(r)||new Oe(null)).set(Re(t),n),s=this.children.insert(r,o);return new Oe(this.value,s)}}remove(t){if(ae(t))return this.children.isEmpty()?new Oe(null):new Oe(null,this.children);{const n=oe(t),r=this.children.get(n);if(r){const i=r.remove(Re(t));let o;return i.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,i),this.value===null&&o.isEmpty()?new Oe(null):new Oe(this.value,o)}else return this}}get(t){if(ae(t))return this.value;{const n=oe(t),r=this.children.get(n);return r?r.get(Re(t)):null}}setTree(t,n){if(ae(t))return n;{const r=oe(t),o=(this.children.get(r)||new Oe(null)).setTree(Re(t),n);let s;return o.isEmpty()?s=this.children.remove(r):s=this.children.insert(r,o),new Oe(this.value,s)}}fold(t){return this.fold_(ye(),t)}fold_(t,n){const r={};return this.children.inorderTraversal((i,o)=>{r[i]=o.fold_(nt(t,i),n)}),n(t,this.value,r)}findOnPath(t,n){return this.findOnPath_(t,ye(),n)}findOnPath_(t,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(ae(t))return null;{const o=oe(t),s=this.children.get(o);return s?s.findOnPath_(Re(t),nt(n,o),r):null}}foreachOnPath(t,n){return this.foreachOnPath_(t,ye(),n)}foreachOnPath_(t,n,r){if(ae(t))return this;{this.value&&r(n,this.value);const i=oe(t),o=this.children.get(i);return o?o.foreachOnPath_(Re(t),nt(n,i),r):new Oe(null)}}foreach(t){this.foreach_(ye(),t)}foreach_(t,n){this.children.inorderTraversal((r,i)=>{i.foreach_(nt(t,r),n)}),this.value&&n(t,this.value)}foreachChild(t){this.children.inorderTraversal((n,r)=>{r.value&&t(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(t){this.writeTree_=t}static empty(){return new wn(new Oe(null))}}function cs(e,t,n){if(ae(t))return new wn(new Oe(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(r!=null){const i=r.path;let o=r.value;const s=Et(i,t);return o=o.updateChild(s,n),new wn(e.writeTree_.set(i,o))}else{const i=new Oe(n),o=e.writeTree_.setTree(t,i);return new wn(o)}}}function ov(e,t,n){let r=e;return zt(n,(i,o)=>{r=cs(r,nt(t,i),o)}),r}function sv(e,t){if(ae(t))return wn.empty();{const n=e.writeTree_.setTree(t,new Oe(null));return new wn(n)}}function Vf(e,t){return Ei(e,t)!=null}function Ei(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return n!=null?e.writeTree_.get(n.path).getChild(Et(n.path,t)):null}function av(e){const t=[],n=e.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Be,(r,i)=>{t.push(new se(r,i))}):e.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&t.push(new se(r,i.value))}),t}function Dr(e,t){if(ae(t))return e;{const n=Ei(e,t);return n!=null?new wn(new Oe(n)):new wn(e.writeTree_.subtree(t))}}function $f(e){return e.writeTree_.isEmpty()}function mo(e,t){return Uk(ye(),e.writeTree_,t)}function Uk(e,t,n){if(t.value!=null)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal((i,o)=>{i===".priority"?(V(o.value!==null,"Priority writes must always be leaf nodes"),r=o.value):n=Uk(nt(e,i),o,n)}),!n.getChild(e).isEmpty()&&r!==null&&(n=n.updateChild(nt(e,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(e,t){return $k(t,e)}function PD(e,t,n,r,i){V(r>e.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=cs(e.visibleWrites,t,n)),e.lastWriteId=r}function DD(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}function OD(e,t){const n=e.allWrites.findIndex(a=>a.writeId===t);V(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,s=e.allWrites.length-1;for(;i&&s>=0;){const a=e.allWrites[s];a.visible&&(s>=n&&LD(a,r.path)?i=!1:mn(r.path,a.path)&&(o=!0)),s--}if(i){if(o)return MD(e),!0;if(r.snap)e.visibleWrites=sv(e.visibleWrites,r.path);else{const a=r.children;zt(a,l=>{e.visibleWrites=sv(e.visibleWrites,nt(r.path,l))})}return!0}else return!1}function LD(e,t){if(e.snap)return mn(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&mn(nt(e.path,n),t))return!0;return!1}function MD(e){e.visibleWrites=zk(e.allWrites,jD,ye()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}function jD(e){return e.visible}function zk(e,t,n){let r=wn.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const s=o.path;let a;if(o.snap)mn(n,s)?(a=Et(n,s),r=cs(r,a,o.snap)):mn(s,n)&&(a=Et(s,n),r=cs(r,ye(),o.snap.getChild(a)));else if(o.children){if(mn(n,s))a=Et(n,s),r=ov(r,a,o.children);else if(mn(s,n))if(a=Et(s,n),ae(a))r=ov(r,ye(),o.children);else{const l=yi(o.children,oe(a));if(l){const u=l.getChild(Re(a));r=cs(r,ye(),u)}}}else throw bo("WriteRecord should have .snap or .children")}}return r}function Bk(e,t,n,r,i){if(!r&&!i){const o=Ei(e.visibleWrites,t);if(o!=null)return o;{const s=Dr(e.visibleWrites,t);if($f(s))return n;if(n==null&&!Vf(s,ye()))return null;{const a=n||Q.EMPTY_NODE;return mo(s,a)}}}else{const o=Dr(e.visibleWrites,t);if(!i&&$f(o))return n;if(!i&&n==null&&!Vf(o,ye()))return null;{const s=function(u){return(u.visible||i)&&(!r||!~r.indexOf(u.writeId))&&(mn(u.path,t)||mn(t,u.path))},a=zk(e.allWrites,s,t),l=n||Q.EMPTY_NODE;return mo(a,l)}}}function FD(e,t,n){let r=Q.EMPTY_NODE;const i=Ei(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(Be,(o,s)=>{r=r.updateImmediateChild(o,s)}),r;if(n){const o=Dr(e.visibleWrites,t);return n.forEachChild(Be,(s,a)=>{const l=mo(Dr(o,new Ce(s)),a);r=r.updateImmediateChild(s,l)}),av(o).forEach(s=>{r=r.updateImmediateChild(s.name,s.node)}),r}else{const o=Dr(e.visibleWrites,t);return av(o).forEach(s=>{r=r.updateImmediateChild(s.name,s.node)}),r}}function UD(e,t,n,r,i){V(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=nt(t,n);if(Vf(e.visibleWrites,o))return null;{const s=Dr(e.visibleWrites,o);return $f(s)?i.getChild(n):mo(s,i.getChild(n))}}function zD(e,t,n,r){const i=nt(t,n),o=Ei(e.visibleWrites,i);if(o!=null)return o;if(r.isCompleteForChild(n)){const s=Dr(e.visibleWrites,i);return mo(s,r.getNode().getImmediateChild(n))}else return null}function BD(e,t){return Ei(e.visibleWrites,t)}function VD(e,t,n,r,i,o,s){let a;const l=Dr(e.visibleWrites,t),u=Ei(l,ye());if(u!=null)a=u;else if(n!=null)a=mo(l,n);else return[];if(a=a.withIndex(s),!a.isEmpty()&&!a.isLeafNode()){const d=[],c=s.getCompare(),f=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s);let p=f.getNext();for(;p&&d.length<i;)c(p,r)!==0&&d.push(p),p=f.getNext();return d}else return[]}function $D(){return{visibleWrites:wn.empty(),allWrites:[],lastWriteId:-1}}function cu(e,t,n,r){return Bk(e.writeTree,e.treePath,t,n,r)}function Hh(e,t){return FD(e.writeTree,e.treePath,t)}function lv(e,t,n,r){return UD(e.writeTree,e.treePath,t,n,r)}function du(e,t){return BD(e.writeTree,nt(e.treePath,t))}function HD(e,t,n,r,i,o){return VD(e.writeTree,e.treePath,t,n,r,i,o)}function Wh(e,t,n){return zD(e.writeTree,e.treePath,t,n)}function Vk(e,t){return $k(nt(e.treePath,t),e.writeTree)}function $k(e,t){return{treePath:e,writeTree:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WD{constructor(){this.changeMap=new Map}trackChildChange(t){const n=t.type,r=t.childName;V(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),V(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const o=i.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(r,Us(r,t.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(r,Fs(r,i.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(r,ho(r,t.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(r,Us(r,t.snapshotNode,i.oldSnap));else throw bo("Illegal combination of changes: "+t+" occurred after "+i)}else this.changeMap.set(r,t)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qD{getCompleteChild(t){return null}getChildAfterChild(t,n,r){return null}}const Hk=new qD;class qh{constructor(t,n,r=null){this.writes_=t,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(t){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(t))return n.getNode().getImmediateChild(t);{const r=this.optCompleteServerCache_!=null?new Ur(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Wh(this.writes_,t,r)}}getChildAfterChild(t,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:xi(this.viewCache_),o=HD(this.writes_,i,n,1,r,t);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KD(e){return{filter:e}}function GD(e,t){V(t.eventCache.getNode().isIndexed(e.filter.getIndex()),"Event snap not indexed"),V(t.serverCache.getNode().isIndexed(e.filter.getIndex()),"Server snap not indexed")}function YD(e,t,n,r,i){const o=new WD;let s,a;if(n.type===gn.OVERWRITE){const u=n;u.source.fromUser?s=Hf(e,t,u.path,u.snap,r,i,o):(V(u.source.fromServer,"Unknown source."),a=u.source.tagged||t.serverCache.isFiltered()&&!ae(u.path),s=fu(e,t,u.path,u.snap,r,i,a,o))}else if(n.type===gn.MERGE){const u=n;u.source.fromUser?s=JD(e,t,u.path,u.children,r,i,o):(V(u.source.fromServer,"Unknown source."),a=u.source.tagged||t.serverCache.isFiltered(),s=Wf(e,t,u.path,u.children,r,i,a,o))}else if(n.type===gn.ACK_USER_WRITE){const u=n;u.revert?s=eO(e,t,u.path,r,i,o):s=XD(e,t,u.path,u.affectedTree,r,i,o)}else if(n.type===gn.LISTEN_COMPLETE)s=ZD(e,t,n.path,r,o);else throw bo("Unknown operation type: "+n.type);const l=o.getChanges();return QD(t,s,l),{viewCache:s,changes:l}}function QD(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=uu(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(Lk(uu(t)))}}function Wk(e,t,n,r,i,o){const s=t.eventCache;if(du(r,n)!=null)return t;{let a,l;if(ae(n))if(V(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const u=xi(t),d=u instanceof Q?u:Q.EMPTY_NODE,c=Hh(r,d);a=e.filter.updateFullNode(t.eventCache.getNode(),c,o)}else{const u=cu(r,xi(t));a=e.filter.updateFullNode(t.eventCache.getNode(),u,o)}else{const u=oe(n);if(u===".priority"){V(Fr(n)===1,"Can't have a priority with additional path components");const d=s.getNode();l=t.serverCache.getNode();const c=lv(r,n,d,l);c!=null?a=e.filter.updatePriority(d,c):a=s.getNode()}else{const d=Re(n);let c;if(s.isCompleteForChild(u)){l=t.serverCache.getNode();const f=lv(r,n,s.getNode(),l);f!=null?c=s.getNode().getImmediateChild(u).updateChild(d,f):c=s.getNode().getImmediateChild(u)}else c=Wh(r,u,t.serverCache);c!=null?a=e.filter.updateChild(s.getNode(),u,c,d,i,o):a=s.getNode()}}return us(t,a,s.isFullyInitialized()||ae(n),e.filter.filtersNodes())}}function fu(e,t,n,r,i,o,s,a){const l=t.serverCache;let u;const d=s?e.filter:e.filter.getIndexedFilter();if(ae(n))u=d.updateFullNode(l.getNode(),r,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,r);u=d.updateFullNode(l.getNode(),p,null)}else{const p=oe(n);if(!l.isCompleteForPath(n)&&Fr(n)>1)return t;const m=Re(n),C=l.getNode().getImmediateChild(p).updateChild(m,r);p===".priority"?u=d.updatePriority(l.getNode(),C):u=d.updateChild(l.getNode(),p,C,m,Hk,null)}const c=Fk(t,u,l.isFullyInitialized()||ae(n),d.filtersNodes()),f=new qh(i,c,o);return Wk(e,c,n,i,f,a)}function Hf(e,t,n,r,i,o,s){const a=t.eventCache;let l,u;const d=new qh(i,t,o);if(ae(n))u=e.filter.updateFullNode(t.eventCache.getNode(),r,s),l=us(t,u,!0,e.filter.filtersNodes());else{const c=oe(n);if(c===".priority")u=e.filter.updatePriority(t.eventCache.getNode(),r),l=us(t,u,a.isFullyInitialized(),a.isFiltered());else{const f=Re(n),p=a.getNode().getImmediateChild(c);let m;if(ae(f))m=r;else{const w=d.getCompleteChild(c);w!=null?Ek(f)===".priority"&&w.getChild(Ak(f)).isEmpty()?m=w:m=w.updateChild(f,r):m=Q.EMPTY_NODE}if(p.equals(m))l=t;else{const w=e.filter.updateChild(a.getNode(),c,m,f,d,s);l=us(t,w,a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function uv(e,t){return e.eventCache.isCompleteForChild(t)}function JD(e,t,n,r,i,o,s){let a=t;return r.foreach((l,u)=>{const d=nt(n,l);uv(t,oe(d))&&(a=Hf(e,a,d,u,i,o,s))}),r.foreach((l,u)=>{const d=nt(n,l);uv(t,oe(d))||(a=Hf(e,a,d,u,i,o,s))}),a}function cv(e,t,n){return n.foreach((r,i)=>{t=t.updateChild(r,i)}),t}function Wf(e,t,n,r,i,o,s,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l=t,u;ae(n)?u=r:u=new Oe(null).setTree(n,r);const d=t.serverCache.getNode();return u.children.inorderTraversal((c,f)=>{if(d.hasChild(c)){const p=t.serverCache.getNode().getImmediateChild(c),m=cv(e,p,f);l=fu(e,l,new Ce(c),m,i,o,s,a)}}),u.children.inorderTraversal((c,f)=>{const p=!t.serverCache.isCompleteForChild(c)&&f.value===null;if(!d.hasChild(c)&&!p){const m=t.serverCache.getNode().getImmediateChild(c),w=cv(e,m,f);l=fu(e,l,new Ce(c),w,i,o,s,a)}}),l}function XD(e,t,n,r,i,o,s){if(du(i,n)!=null)return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(r.value!=null){if(ae(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return fu(e,t,n,l.getNode().getChild(n),i,o,a,s);if(ae(n)){let u=new Oe(null);return l.getNode().forEachChild(ro,(d,c)=>{u=u.set(new Ce(d),c)}),Wf(e,t,n,u,i,o,a,s)}else return t}else{let u=new Oe(null);return r.foreach((d,c)=>{const f=nt(n,d);l.isCompleteForPath(f)&&(u=u.set(d,l.getNode().getChild(f)))}),Wf(e,t,n,u,i,o,a,s)}}function ZD(e,t,n,r,i){const o=t.serverCache,s=Fk(t,o.getNode(),o.isFullyInitialized()||ae(n),o.isFiltered());return Wk(e,s,n,r,Hk,i)}function eO(e,t,n,r,i,o){let s;if(du(r,n)!=null)return t;{const a=new qh(r,t,i),l=t.eventCache.getNode();let u;if(ae(n)||oe(n)===".priority"){let d;if(t.serverCache.isFullyInitialized())d=cu(r,xi(t));else{const c=t.serverCache.getNode();V(c instanceof Q,"serverChildren would be complete if leaf node"),d=Hh(r,c)}d=d,u=e.filter.updateFullNode(l,d,o)}else{const d=oe(n);let c=Wh(r,d,t.serverCache);c==null&&t.serverCache.isCompleteForChild(d)&&(c=l.getImmediateChild(d)),c!=null?u=e.filter.updateChild(l,d,c,Re(n),a,o):t.eventCache.getNode().hasChild(d)?u=e.filter.updateChild(l,d,Q.EMPTY_NODE,Re(n),a,o):u=l,u.isEmpty()&&t.serverCache.isFullyInitialized()&&(s=cu(r,xi(t)),s.isLeafNode()&&(u=e.filter.updateFullNode(u,s,o)))}return s=t.serverCache.isFullyInitialized()||du(r,ye())!=null,us(t,u,s,e.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(t,n){this.query_=t,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new zh(r.getIndex()),o=_D(r);this.processor_=KD(o);const s=n.serverCache,a=n.eventCache,l=i.updateFullNode(Q.EMPTY_NODE,s.getNode(),null),u=o.updateFullNode(Q.EMPTY_NODE,a.getNode(),null),d=new Ur(l,s.isFullyInitialized(),i.filtersNodes()),c=new Ur(u,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=$u(c,d),this.eventGenerator_=new CD(this.query_)}get query(){return this.query_}}function nO(e){return e.viewCache_.serverCache.getNode()}function rO(e){return uu(e.viewCache_)}function iO(e,t){const n=xi(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!ae(t)&&!n.getImmediateChild(oe(t)).isEmpty())?n.getChild(t):null}function dv(e){return e.eventRegistrations_.length===0}function oO(e,t){e.eventRegistrations_.push(t)}function fv(e,t,n){const r=[];if(n){V(t==null,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach(o=>{const s=o.createCancelEvent(n,i);s&&r.push(s)})}if(t){let i=[];for(let o=0;o<e.eventRegistrations_.length;++o){const s=e.eventRegistrations_[o];if(!s.matches(t))i.push(s);else if(t.hasAnyCallback()){i=i.concat(e.eventRegistrations_.slice(o+1));break}}e.eventRegistrations_=i}else e.eventRegistrations_=[];return r}function pv(e,t,n,r){t.type===gn.MERGE&&t.source.queryId!==null&&(V(xi(e.viewCache_),"We should always have a full cache before handling merges"),V(uu(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=YD(e.processor_,i,t,n,r);return GD(e.processor_,o.viewCache),V(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,qk(e,o.changes,o.viewCache.eventCache.getNode(),null)}function sO(e,t){const n=e.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Be,(o,s)=>{r.push(ho(o,s))}),n.isFullyInitialized()&&r.push(Lk(n.getNode())),qk(e,r,n.getNode(),t)}function qk(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return AD(e.eventGenerator_,t,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pu;class Kk{constructor(){this.views=new Map}}function aO(e){V(!pu,"__referenceConstructor has already been defined"),pu=e}function lO(){return V(pu,"Reference.ts has not been loaded"),pu}function uO(e){return e.views.size===0}function Kh(e,t,n,r){const i=t.source.queryId;if(i!==null){const o=e.views.get(i);return V(o!=null,"SyncTree gave us an op for an invalid query."),pv(o,t,n,r)}else{let o=[];for(const s of e.views.values())o=o.concat(pv(s,t,n,r));return o}}function Gk(e,t,n,r,i){const o=t._queryIdentifier,s=e.views.get(o);if(!s){let a=cu(n,i?r:null),l=!1;a?l=!0:r instanceof Q?(a=Hh(n,r),l=!1):(a=Q.EMPTY_NODE,l=!1);const u=$u(new Ur(a,l,!1),new Ur(r,i,!1));return new tO(t,u)}return s}function cO(e,t,n,r,i,o){const s=Gk(e,t,r,i,o);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,s),oO(s,n),sO(s,n)}function dO(e,t,n,r){const i=t._queryIdentifier,o=[];let s=[];const a=zr(e);if(i==="default")for(const[l,u]of e.views.entries())s=s.concat(fv(u,n,r)),dv(u)&&(e.views.delete(l),u.query._queryParams.loadsAllData()||o.push(u.query));else{const l=e.views.get(i);l&&(s=s.concat(fv(l,n,r)),dv(l)&&(e.views.delete(i),l.query._queryParams.loadsAllData()||o.push(l.query)))}return a&&!zr(e)&&o.push(new(lO())(t._repo,t._path)),{removed:o,events:s}}function Yk(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Or(e,t){let n=null;for(const r of e.views.values())n=n||iO(r,t);return n}function Qk(e,t){if(t._queryParams.loadsAllData())return Wu(e);{const r=t._queryIdentifier;return e.views.get(r)}}function Jk(e,t){return Qk(e,t)!=null}function zr(e){return Wu(e)!=null}function Wu(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hu;function fO(e){V(!hu,"__referenceConstructor has already been defined"),hu=e}function pO(){return V(hu,"Reference.ts has not been loaded"),hu}let hO=1;class hv{constructor(t){this.listenProvider_=t,this.syncPointTree_=new Oe(null),this.pendingWriteTree_=$D(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Gh(e,t,n,r,i){return PD(e.pendingWriteTree_,t,n,r,i),i?pa(e,new bi(jk(),t,n)):[]}function si(e,t,n=!1){const r=DD(e.pendingWriteTree_,t);if(OD(e.pendingWriteTree_,t)){let o=new Oe(null);return r.snap!=null?o=o.set(ye(),!0):zt(r.children,s=>{o=o.set(new Ce(s),!0)}),pa(e,new lu(r.path,o,n))}else return[]}function fa(e,t,n){return pa(e,new bi(Vh(),t,n))}function mO(e,t,n){const r=Oe.fromObject(n);return pa(e,new Vs(Vh(),t,r))}function gO(e,t){return pa(e,new Bs(Vh(),t))}function yO(e,t,n){const r=Yh(e,n);if(r){const i=Qh(r),o=i.path,s=i.queryId,a=Et(o,t),l=new Bs($h(s),a);return Jh(e,o,l)}else return[]}function mu(e,t,n,r,i=!1){const o=t._path,s=e.syncPointTree_.get(o);let a=[];if(s&&(t._queryIdentifier==="default"||Jk(s,t))){const l=dO(s,t,n,r);uO(s)&&(e.syncPointTree_=e.syncPointTree_.remove(o));const u=l.removed;if(a=l.events,!i){const d=u.findIndex(f=>f._queryParams.loadsAllData())!==-1,c=e.syncPointTree_.findOnPath(o,(f,p)=>zr(p));if(d&&!c){const f=e.syncPointTree_.subtree(o);if(!f.isEmpty()){const p=_O(f);for(let m=0;m<p.length;++m){const w=p[m],C=w.query,y=tS(e,w);e.listenProvider_.startListening(ds(C),$s(e,C),y.hashFn,y.onComplete)}}}!c&&u.length>0&&!r&&(d?e.listenProvider_.stopListening(ds(t),null):u.forEach(f=>{const p=e.queryToTagMap.get(Ku(f));e.listenProvider_.stopListening(ds(f),p)}))}bO(e,u)}return a}function Xk(e,t,n,r){const i=Yh(e,r);if(i!=null){const o=Qh(i),s=o.path,a=o.queryId,l=Et(s,t),u=new bi($h(a),l,n);return Jh(e,s,u)}else return[]}function vO(e,t,n,r){const i=Yh(e,r);if(i){const o=Qh(i),s=o.path,a=o.queryId,l=Et(s,t),u=Oe.fromObject(n),d=new Vs($h(a),l,u);return Jh(e,s,d)}else return[]}function qf(e,t,n,r=!1){const i=t._path;let o=null,s=!1;e.syncPointTree_.foreachOnPath(i,(f,p)=>{const m=Et(f,i);o=o||Or(p,m),s=s||zr(p)});let a=e.syncPointTree_.get(i);a?(s=s||zr(a),o=o||Or(a,ye())):(a=new Kk,e.syncPointTree_=e.syncPointTree_.set(i,a));let l;o!=null?l=!0:(l=!1,o=Q.EMPTY_NODE,e.syncPointTree_.subtree(i).foreachChild((p,m)=>{const w=Or(m,ye());w&&(o=o.updateImmediateChild(p,w))}));const u=Jk(a,t);if(!u&&!t._queryParams.loadsAllData()){const f=Ku(t);V(!e.queryToTagMap.has(f),"View does not exist, but we have a tag");const p=xO();e.queryToTagMap.set(f,p),e.tagToQueryMap.set(p,f)}const d=Hu(e.pendingWriteTree_,i);let c=cO(a,t,n,d,o,l);if(!u&&!s&&!r){const f=Qk(a,t);c=c.concat(kO(e,t,f))}return c}function qu(e,t,n){const i=e.pendingWriteTree_,o=e.syncPointTree_.findOnPath(t,(s,a)=>{const l=Et(s,t),u=Or(a,l);if(u)return u});return Bk(i,t,o,n,!0)}function wO(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,(u,d)=>{const c=Et(u,n);r=r||Or(d,c)});let i=e.syncPointTree_.get(n);i?r=r||Or(i,ye()):(i=new Kk,e.syncPointTree_=e.syncPointTree_.set(n,i));const o=r!=null,s=o?new Ur(r,!0,!1):null,a=Hu(e.pendingWriteTree_,t._path),l=Gk(i,t,a,o?s.getNode():Q.EMPTY_NODE,o);return rO(l)}function pa(e,t){return Zk(t,e.syncPointTree_,null,Hu(e.pendingWriteTree_,ye()))}function Zk(e,t,n,r){if(ae(e.path))return eS(e,t,n,r);{const i=t.get(ye());n==null&&i!=null&&(n=Or(i,ye()));let o=[];const s=oe(e.path),a=e.operationForChild(s),l=t.children.get(s);if(l&&a){const u=n?n.getImmediateChild(s):null,d=Vk(r,s);o=o.concat(Zk(a,l,u,d))}return i&&(o=o.concat(Kh(i,e,r,n))),o}}function eS(e,t,n,r){const i=t.get(ye());n==null&&i!=null&&(n=Or(i,ye()));let o=[];return t.children.inorderTraversal((s,a)=>{const l=n?n.getImmediateChild(s):null,u=Vk(r,s),d=e.operationForChild(s);d&&(o=o.concat(eS(d,a,l,u)))}),i&&(o=o.concat(Kh(i,e,r,n))),o}function tS(e,t){const n=t.query,r=$s(e,n);return{hashFn:()=>(nO(t)||Q.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?yO(e,n._path,r):gO(e,n._path);{const o=wP(i,n);return mu(e,n,null,o)}}}}function $s(e,t){const n=Ku(t);return e.queryToTagMap.get(n)}function Ku(e){return e._path.toString()+"$"+e._queryIdentifier}function Yh(e,t){return e.tagToQueryMap.get(t)}function Qh(e){const t=e.indexOf("$");return V(t!==-1&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new Ce(e.substr(0,t))}}function Jh(e,t,n){const r=e.syncPointTree_.get(t);V(r,"Missing sync point for query tag that we're tracking");const i=Hu(e.pendingWriteTree_,t);return Kh(r,n,i,null)}function _O(e){return e.fold((t,n,r)=>{if(n&&zr(n))return[Wu(n)];{let i=[];return n&&(i=Yk(n)),zt(r,(o,s)=>{i=i.concat(s)}),i}})}function ds(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(pO())(e._repo,e._path):e}function bO(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const i=Ku(r),o=e.queryToTagMap.get(i);e.queryToTagMap.delete(i),e.tagToQueryMap.delete(o)}}}function xO(){return hO++}function kO(e,t,n){const r=t._path,i=$s(e,t),o=tS(e,n),s=e.listenProvider_.startListening(ds(t),i,o.hashFn,o.onComplete),a=e.syncPointTree_.subtree(r);if(i)V(!zr(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((u,d,c)=>{if(!ae(u)&&d&&zr(d))return[Wu(d).query];{let f=[];return d&&(f=f.concat(Yk(d).map(p=>p.query))),zt(c,(p,m)=>{f=f.concat(m)}),f}});for(let u=0;u<l.length;++u){const d=l[u];e.listenProvider_.stopListening(ds(d),$s(e,d))}}return s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t){this.node_=t}getImmediateChild(t){const n=this.node_.getImmediateChild(t);return new Xh(n)}node(){return this.node_}}class Zh{constructor(t,n){this.syncTree_=t,this.path_=n}getImmediateChild(t){const n=nt(this.path_,t);return new Zh(this.syncTree_,n)}node(){return qu(this.syncTree_,this.path_)}}const SO=function(e){return e=e||{},e.timestamp=e.timestamp||new Date().getTime(),e},mv=function(e,t,n){if(!e||typeof e!="object")return e;if(V(".sv"in e,"Unexpected leaf node or priority contents"),typeof e[".sv"]=="string")return IO(e[".sv"],t,n);if(typeof e[".sv"]=="object")return EO(e[".sv"],t);V(!1,"Unexpected server value: "+JSON.stringify(e,null,2))},IO=function(e,t,n){switch(e){case"timestamp":return n.timestamp;default:V(!1,"Unexpected server value: "+e)}},EO=function(e,t,n){e.hasOwnProperty("increment")||V(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;typeof r!="number"&&V(!1,"Unexpected increment value: "+r);const i=t.node();if(V(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const s=i.getValue();return typeof s!="number"?r:s+r},CO=function(e,t,n,r){return tm(t,new Zh(n,e),r)},em=function(e,t,n){return tm(e,new Xh(t),n)};function tm(e,t,n){const r=e.getPriority().val(),i=mv(r,t.getImmediateChild(".priority"),n);let o;if(e.isLeafNode()){const s=e,a=mv(s.getValue(),t,n);return a!==s.getValue()||i!==s.getPriority().val()?new it(a,et(i)):e}else{const s=e;return o=s,i!==s.getPriority().val()&&(o=o.updatePriority(new it(i))),s.forEachChild(Be,(a,l)=>{const u=tm(l,t.getImmediateChild(a),n);u!==l&&(o=o.updateImmediateChild(a,u))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(t="",n=null,r={children:{},childCount:0}){this.name=t,this.parent=n,this.node=r}}function Gu(e,t){let n=t instanceof Ce?t:new Ce(t),r=e,i=oe(n);for(;i!==null;){const o=yi(r.node.children,i)||{children:{},childCount:0};r=new nm(i,r,o),n=Re(n),i=oe(n)}return r}function Ci(e){return e.node.value}function rm(e,t){e.node.value=t,Kf(e)}function nS(e){return e.node.childCount>0}function AO(e){return Ci(e)===void 0&&!nS(e)}function Yu(e,t){zt(e.node.children,(n,r)=>{t(new nm(n,e,r))})}function rS(e,t,n,r){n&&t(e),Yu(e,i=>{rS(i,t,!0)})}function TO(e,t,n){let r=e.parent;for(;r!==null;){if(t(r))return!0;r=r.parent}return!1}function ha(e){return new Ce(e.parent===null?e.name:ha(e.parent)+"/"+e.name)}function Kf(e){e.parent!==null&&RO(e.parent,e.name,e)}function RO(e,t,n){const r=AO(n),i=kn(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Kf(e)):!r&&!i&&(e.node.children[t]=n.node,e.node.childCount++,Kf(e))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NO=/[\[\].#$\/\u0000-\u001F\u007F]/,PO=/[\[\].#$\u0000-\u001F\u007F]/,rd=10*1024*1024,iS=function(e){return typeof e=="string"&&e.length!==0&&!NO.test(e)},oS=function(e){return typeof e=="string"&&e.length!==0&&!PO.test(e)},DO=function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),oS(e)},OO=function(e){return e===null||typeof e=="string"||typeof e=="number"&&!Ph(e)||e&&typeof e=="object"&&kn(e,".sv")},LO=function(e,t,n,r){Qu(_h(e,"value"),t,n)},Qu=function(e,t,n){const r=n instanceof Ce?new XP(n,e):n;if(t===void 0)throw new Error(e+"contains undefined "+Xr(r));if(typeof t=="function")throw new Error(e+"contains a function "+Xr(r)+" with contents = "+t.toString());if(Ph(t))throw new Error(e+"contains "+t.toString()+" "+Xr(r));if(typeof t=="string"&&t.length>rd/3&&ju(t)>rd)throw new Error(e+"contains a string greater than "+rd+" utf8 bytes "+Xr(r)+" ('"+t.substring(0,50)+"...')");if(t&&typeof t=="object"){let i=!1,o=!1;if(zt(t,(s,a)=>{if(s===".value")i=!0;else if(s!==".priority"&&s!==".sv"&&(o=!0,!iS(s)))throw new Error(e+" contains an invalid key ("+s+") "+Xr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ZP(r,s),Qu(e,a,r),eD(r)}),i&&o)throw new Error(e+' contains ".value" child '+Xr(r)+" in addition to actual children.")}},sS=function(e,t,n,r){if(!oS(n))throw new Error(_h(e,t)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},MO=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),sS(e,t,n)},im=function(e,t){if(oe(t)===".info")throw new Error(e+" failed = Can't modify data under /.info/")},jO=function(e,t){const n=t.path.toString();if(typeof t.repoInfo.host!="string"||t.repoInfo.host.length===0||!iS(t.repoInfo.namespace)&&t.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!DO(n))throw new Error(_h(e,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FO{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function om(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],o=i.getPath();n!==null&&!jh(o,n.path)&&(e.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(i)}n&&e.eventLists_.push(n)}function aS(e,t,n){om(e,n),lS(e,r=>jh(r,t))}function xn(e,t,n){om(e,n),lS(e,r=>mn(r,t)||mn(t,r))}function lS(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){const o=i.path;t(o)?(UO(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function UO(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(n!==null){e.events[t]=null;const r=n.getEventRunner();as&&wt("event: "+n.toString()),Eo(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zO="repo_interrupt",BO=25;class VO{constructor(t,n,r,i){this.repoInfo_=t,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new FO,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=au(),this.transactionQueueTree_=new nm,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function $O(e,t,n){if(e.stats_=Lh(e.repoInfo_),e.forceRestClient_||kP())e.server_=new su(e.repoInfo_,(r,i,o,s)=>{gv(e,r,i,o,s)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>yv(e,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{tt(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Yn(e.repoInfo_,t,(r,i,o,s)=>{gv(e,r,i,o,s)},r=>{yv(e,r)},r=>{WO(e,r)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(r=>{e.server_.refreshAuthToken(r)}),e.appCheckProvider_.addTokenChangeListener(r=>{e.server_.refreshAppCheckToken(r.token)}),e.statsReporter_=AP(e.repoInfo_,()=>new ED(e.stats_,e.server_)),e.infoData_=new bD,e.infoSyncTree_=new hv({startListening:(r,i,o,s)=>{let a=[];const l=e.infoData_.getNode(r._path);return l.isEmpty()||(a=fa(e.infoSyncTree_,r._path,l),setTimeout(()=>{s("ok")},0)),a},stopListening:()=>{}}),sm(e,"connected",!1),e.serverSyncTree_=new hv({startListening:(r,i,o,s)=>(e.server_.listen(r,o,i,(a,l)=>{const u=s(a,l);xn(e.eventQueue_,r._path,u)}),[]),stopListening:(r,i)=>{e.server_.unlisten(r,i)}})}function HO(e){const n=e.infoData_.getNode(new Ce(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Ju(e){return SO({timestamp:HO(e)})}function gv(e,t,n,r,i){e.dataUpdateCount++;const o=new Ce(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let s=[];if(i)if(r){const l=Ql(n,u=>et(u));s=vO(e.serverSyncTree_,o,l,i)}else{const l=et(n);s=Xk(e.serverSyncTree_,o,l,i)}else if(r){const l=Ql(n,u=>et(u));s=mO(e.serverSyncTree_,o,l)}else{const l=et(n);s=fa(e.serverSyncTree_,o,l)}let a=o;s.length>0&&(a=Zu(e,o)),xn(e.eventQueue_,a,s)}function yv(e,t){sm(e,"connected",t),t===!1&&GO(e)}function WO(e,t){zt(t,(n,r)=>{sm(e,n,r)})}function sm(e,t,n){const r=new Ce("/.info/"+t),i=et(n);e.infoData_.updateSnapshot(r,i);const o=fa(e.infoSyncTree_,r,i);xn(e.eventQueue_,r,o)}function am(e){return e.nextWriteId_++}function qO(e,t,n){const r=wO(e.serverSyncTree_,t);return r!=null?Promise.resolve(r):e.server_.get(t).then(i=>{const o=et(i).withIndex(t._queryParams.getIndex());qf(e.serverSyncTree_,t,n,!0);let s;if(t._queryParams.loadsAllData())s=fa(e.serverSyncTree_,t._path,o);else{const a=$s(e.serverSyncTree_,t);s=Xk(e.serverSyncTree_,t._path,o,a)}return xn(e.eventQueue_,t._path,s),mu(e.serverSyncTree_,t,n,null,!0),o},i=>(ma(e,"get for query "+tt(t)+" failed: "+i),Promise.reject(new Error(i))))}function KO(e,t,n,r,i){ma(e,"set",{path:t.toString(),value:n,priority:r});const o=Ju(e),s=et(n,r),a=qu(e.serverSyncTree_,t),l=em(s,a,o),u=am(e),d=Gh(e.serverSyncTree_,t,l,u,!0);om(e.eventQueue_,d),e.server_.put(t.toString(),s.val(!0),(f,p)=>{const m=f==="ok";m||Ut("set at "+t+" failed: "+f);const w=si(e.serverSyncTree_,u,!m);xn(e.eventQueue_,t,w),XO(e,i,f,p)});const c=fS(e,t);Zu(e,c),xn(e.eventQueue_,c,[])}function GO(e){ma(e,"onDisconnectEvents");const t=Ju(e),n=au();Bf(e.onDisconnect_,ye(),(i,o)=>{const s=CO(i,o,e.serverSyncTree_,t);Mk(n,i,s)});let r=[];Bf(n,ye(),(i,o)=>{r=r.concat(fa(e.serverSyncTree_,i,o));const s=fS(e,i);Zu(e,s)}),e.onDisconnect_=au(),xn(e.eventQueue_,ye(),r)}function YO(e,t,n){let r;oe(t._path)===".info"?r=qf(e.infoSyncTree_,t,n):r=qf(e.serverSyncTree_,t,n),aS(e.eventQueue_,t._path,r)}function QO(e,t,n){let r;oe(t._path)===".info"?r=mu(e.infoSyncTree_,t,n):r=mu(e.serverSyncTree_,t,n),aS(e.eventQueue_,t._path,r)}function JO(e){e.persistentConnection_&&e.persistentConnection_.interrupt(zO)}function ma(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),wt(n,...t)}function XO(e,t,n,r){t&&Eo(()=>{if(n==="ok")t(null);else{const i=(n||"error").toUpperCase();let o=i;r&&(o+=": "+r);const s=new Error(o);s.code=i,t(s)}})}function ZO(e,t,n,r,i,o){ma(e,"transaction on "+t);const s={path:t,update:n,onComplete:r,status:null,order:ik(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=lm(e,t,void 0);s.currentInputSnapshot=a;const l=s.update(a.val());if(l===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{Qu("transaction failed: Data returned ",l,s.path),s.status=0;const u=Gu(e.transactionQueueTree_,t),d=Ci(u)||[];d.push(s),rm(u,d);let c;typeof l=="object"&&l!==null&&kn(l,".priority")?(c=yi(l,".priority"),V(OO(c),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):c=(qu(e.serverSyncTree_,t)||Q.EMPTY_NODE).getPriority().val();const f=Ju(e),p=et(l,c),m=em(p,a,f);s.currentOutputSnapshotRaw=p,s.currentOutputSnapshotResolved=m,s.currentWriteId=am(e);const w=Gh(e.serverSyncTree_,t,m,s.currentWriteId,s.applyLocally);xn(e.eventQueue_,t,w),Xu(e,e.transactionQueueTree_)}}function lm(e,t,n){return qu(e.serverSyncTree_,t,n)||Q.EMPTY_NODE}function Xu(e,t=e.transactionQueueTree_){if(t||ec(e,t),Ci(t)){const n=cS(e,t);V(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&eL(e,ha(t),n)}else nS(t)&&Yu(t,n=>{Xu(e,n)})}function eL(e,t,n){const r=n.map(u=>u.currentWriteId),i=lm(e,t,r);let o=i;const s=i.hash();for(let u=0;u<n.length;u++){const d=n[u];V(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const c=Et(t,d.path);o=o.updateChild(c,d.currentOutputSnapshotRaw)}const a=o.val(!0),l=t;e.server_.put(l.toString(),a,u=>{ma(e,"transaction put response",{path:l.toString(),status:u});let d=[];if(u==="ok"){const c=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(si(e.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&c.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();ec(e,Gu(e.transactionQueueTree_,t)),Xu(e,e.transactionQueueTree_),xn(e.eventQueue_,t,d);for(let f=0;f<c.length;f++)Eo(c[f])}else{if(u==="datastale")for(let c=0;c<n.length;c++)n[c].status===3?n[c].status=4:n[c].status=0;else{Ut("transaction at "+l.toString()+" failed: "+u);for(let c=0;c<n.length;c++)n[c].status=4,n[c].abortReason=u}Zu(e,t)}},s)}function Zu(e,t){const n=uS(e,t),r=ha(n),i=cS(e,n);return tL(e,i,r),r}function tL(e,t,n){if(t.length===0)return;const r=[];let i=[];const s=t.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<t.length;a++){const l=t[a],u=Et(n,l.path);let d=!1,c;if(V(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,c=l.abortReason,i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=BO)d=!0,c="maxretry",i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0));else{const f=lm(e,l.path,s);l.currentInputSnapshot=f;const p=t[a].update(f.val());if(p!==void 0){Qu("transaction failed: Data returned ",p,l.path);let m=et(p);typeof p=="object"&&p!=null&&kn(p,".priority")||(m=m.updatePriority(f.getPriority()));const C=l.currentWriteId,y=Ju(e),v=em(m,f,y);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=v,l.currentWriteId=am(e),s.splice(s.indexOf(C),1),i=i.concat(Gh(e.serverSyncTree_,l.path,v,l.currentWriteId,l.applyLocally)),i=i.concat(si(e.serverSyncTree_,C,!0))}else d=!0,c="nodata",i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0))}xn(e.eventQueue_,n,i),i=[],d&&(t[a].status=2,function(f){setTimeout(f,Math.floor(0))}(t[a].unwatcher),t[a].onComplete&&(c==="nodata"?r.push(()=>t[a].onComplete(null,!1,t[a].currentInputSnapshot)):r.push(()=>t[a].onComplete(new Error(c),!1,null))))}ec(e,e.transactionQueueTree_);for(let a=0;a<r.length;a++)Eo(r[a]);Xu(e,e.transactionQueueTree_)}function uS(e,t){let n,r=e.transactionQueueTree_;for(n=oe(t);n!==null&&Ci(r)===void 0;)r=Gu(r,n),t=Re(t),n=oe(t);return r}function cS(e,t){const n=[];return dS(e,t,n),n.sort((r,i)=>r.order-i.order),n}function dS(e,t,n){const r=Ci(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Yu(t,i=>{dS(e,i,n)})}function ec(e,t){const n=Ci(t);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,rm(t,n.length>0?n:void 0)}Yu(t,r=>{ec(e,r)})}function fS(e,t){const n=ha(uS(e,t)),r=Gu(e.transactionQueueTree_,t);return TO(r,i=>{id(e,i)}),id(e,r),rS(r,i=>{id(e,i)}),n}function id(e,t){const n=Ci(t);if(n){const r=[];let i=[],o=-1;for(let s=0;s<n.length;s++)n[s].status===3||(n[s].status===1?(V(o===s-1,"All SENT items should be at beginning of queue."),o=s,n[s].status=3,n[s].abortReason="set"):(V(n[s].status===0,"Unexpected transaction status in abort"),n[s].unwatcher(),i=i.concat(si(e.serverSyncTree_,n[s].currentWriteId,!0)),n[s].onComplete&&r.push(n[s].onComplete.bind(null,new Error("set"),!1,null))));o===-1?rm(t,void 0):n.length=o+1,xn(e.eventQueue_,ha(t),i);for(let s=0;s<r.length;s++)Eo(r[s])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nL(e){let t="";const n=e.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}t+="/"+i}return t}function rL(e){const t={};e.charAt(0)==="?"&&(e=e.substring(1));for(const n of e.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Ut(`Invalid query segment '${n}' in query '${e}'`)}return t}const vv=function(e,t){const n=iL(e),r=n.namespace;n.domain==="firebase.com"&&rr(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&rr("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||hP();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new yk(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new Ce(n.pathString)}},iL=function(e){let t="",n="",r="",i="",o="",s=!0,a="https",l=443;if(typeof e=="string"){let u=e.indexOf("//");u>=0&&(a=e.substring(0,u-1),e=e.substring(u+2));let d=e.indexOf("/");d===-1&&(d=e.length);let c=e.indexOf("?");c===-1&&(c=e.length),t=e.substring(0,Math.min(d,c)),d<c&&(i=nL(e.substring(d,c)));const f=rL(e.substring(Math.min(e.length,c)));u=t.indexOf(":"),u>=0?(s=a==="https"||a==="wss",l=parseInt(t.substring(u+1),10)):u=t.length;const p=t.slice(0,u);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const m=t.indexOf(".");r=t.substring(0,m).toLowerCase(),n=t.substring(m+1),o=r}"ns"in f&&(o=f.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oL{constructor(t,n,r,i){this.eventType=t,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const t=this.snapshot.ref;return this.eventType==="value"?t._path:t.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+tt(this.snapshot.exportVal())}}class sL{constructor(t,n,r){this.eventRegistration=t,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{constructor(t,n){this.snapshotCallback=t,this.cancelCallback=n}onValue(t,n){this.snapshotCallback.call(null,t,n)}onCancel(t){return V(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,t)}get hasCancelCallback(){return!!this.cancelCallback}matches(t){return this.snapshotCallback===t.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===t.snapshotCallback.userCallback&&this.snapshotCallback.context===t.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(t,n,r,i){this._repo=t,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return ae(this._path)?null:Ek(this._path)}get ref(){return new jn(this._repo,this._path)}get _queryIdentifier(){const t=rv(this._queryParams),n=Dh(t);return n==="{}"?"default":n}get _queryObject(){return rv(this._queryParams)}isEqual(t){if(t=Jt(t),!(t instanceof um))return!1;const n=this._repo===t._repo,r=jh(this._path,t._path),i=this._queryIdentifier===t._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+JP(this._path)}}class jn extends um{constructor(t,n){super(t,n,new Bh,!1)}get parent(){const t=Ak(this._path);return t===null?null:new jn(this._repo,t)}get root(){let t=this;for(;t.parent!==null;)t=t.parent;return t}}class go{constructor(t,n,r){this._node=t,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){const n=new Ce(t),r=Gf(this.ref,t);return new go(this._node.getChild(n),r,Be)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>t(new go(i,Gf(this.ref,r),Be)))}hasChild(t){const n=new Ce(t);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ga(e,t){return e=Jt(e),e._checkNotDeleted("ref"),t!==void 0?Gf(e._root,t):e._root}function Gf(e,t){return e=Jt(e),oe(e._path)===null?MO("child","path",t):sS("child","path",t),new jn(e._repo,nt(e._path,t))}function aL(e){return im("remove",e._path),gl(e,null)}function gl(e,t){e=Jt(e),im("set",e._path),LO("set",t,e._path);const n=new ia;return KO(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function wv(e){e=Jt(e);const t=new pS(()=>{}),n=new tc(t);return qO(e._repo,e,n).then(r=>new go(r,new jn(e._repo,e._path),e._queryParams.getIndex()))}class tc{constructor(t){this.callbackContext=t}respondsTo(t){return t==="value"}createEvent(t,n){const r=n._queryParams.getIndex();return new oL("value",this,new go(t.snapshotNode,new jn(n._repo,n._path),r))}getEventRunner(t){return t.getEventType()==="cancel"?()=>this.callbackContext.onCancel(t.error):()=>this.callbackContext.onValue(t.snapshot,null)}createCancelEvent(t,n){return this.callbackContext.hasCancelCallback?new sL(this,t,n):null}matches(t){return t instanceof tc?!t.callbackContext||!this.callbackContext?!0:t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function lL(e,t,n,r,i){const o=new pS(n,void 0),s=new tc(o);return YO(e._repo,e,s),()=>QO(e._repo,e,s)}function Yf(e,t,n,r){return lL(e,"value",t)}aO(jn);fO(jn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uL="FIREBASE_DATABASE_EMULATOR_HOST",Qf={};let cL=!1;function dL(e,t,n,r){e.repoInfo_=new yk(`${t}:${n}`,!1,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0),r&&(e.authTokenProvider_=r)}function fL(e,t,n,r,i){let o=r||e.options.databaseURL;o===void 0&&(e.options.projectId||rr("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),wt("Using default host for project ",e.options.projectId),o=`${e.options.projectId}-default-rtdb.firebaseio.com`);let s=vv(o,i),a=s.repoInfo,l;typeof process<"u"&&Uy&&(l=Uy[uL]),l?(o=`http://${l}?ns=${a.namespace}`,s=vv(o,i),a=s.repoInfo):s.repoInfo.secure;const u=new IP(e.name,e.options,t);jO("Invalid Firebase Database URL",s),ae(s.path)||rr("Database URL must point to the root of a Firebase Database (not including a child path).");const d=hL(a,e,u,new SP(e.name,n));return new mL(d,e)}function pL(e,t){const n=Qf[t];(!n||n[e.key]!==e)&&rr(`Database ${t}(${e.repoInfo_}) has already been deleted.`),JO(e),delete n[e.key]}function hL(e,t,n,r){let i=Qf[t.name];i||(i={},Qf[t.name]=i);let o=i[e.toURLString()];return o&&rr("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new VO(e,cL,n,r),i[e.toURLString()]=o,o}class mL{constructor(t,n){this._repoInternal=t,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||($O(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new jn(this._repo,ye())),this._rootInternal}_delete(){return this._rootInternal!==null&&(pL(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(t){this._rootInternal===null&&rr("Cannot call "+t+" on a deleted database.")}}function gL(e=_x(),t){const n=kh(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const r=jT("database");r&&yL(n,...r)}return n}function yL(e,t,n,r={}){e=Jt(e),e._checkNotDeleted("useEmulator"),e._instanceStarted&&rr("Cannot call useEmulator() after instance has already been initialized.");const i=e._repoInternal;let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&rr('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ml(ml.OWNER);else if(r.mockUserToken){const s=typeof r.mockUserToken=="string"?r.mockUserToken:FT(r.mockUserToken,e.app.options.projectId);o=new ml(s)}dL(i,t,n,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vL(e){uP(ko),fo(new vi("database",(t,{instanceIdentifier:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return fL(r,i,o,n)},"PUBLIC").setMultipleInstances(!0)),Nr(zy,By,e),Nr(zy,By,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wL{constructor(t,n){this.committed=t,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function _v(e,t,n){var r;if(e=Jt(e),im("Reference.transaction",e._path),e.key===".length"||e.key===".keys")throw"Reference.transaction failed: "+e.key+" is a read-only object.";const i=(r=void 0)!==null&&r!==void 0?r:!0,o=new ia,s=(l,u,d)=>{let c=null;l?o.reject(l):(c=new go(d,new jn(e._repo,e._path),Be),o.resolve(new wL(u,c)))},a=Yf(e,()=>{});return ZO(e._repo,e._path,t,s,a,i),o.promise}Yn.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)};Yn.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};vL();const _L="appLabSyncRooms",bL="appLabOwners",xL="appLabRoomClaimTokens",kL="appLabRoomMembers",SL=new TextEncoder;function hS(e){async function t(l){const u={encryptedPayload:l.encryptedPayload,readTokenHash:await Ni(l.readToken),roomId:l.roomId,updatedAt:new Date().toISOString(),version:1,writeTokenHash:await Ni(l.writeToken)};if(!await e.driver.createRoom(u,{claimToken:l.writeToken}))throw new Error(`Room already exists: ${l.roomId}`);return Ha(u)}async function n(l){const u=await s(l.roomId,l.readToken);return Ha(u)}async function r(l){var f;const u=await a(l.roomId);if(u.writeTokenHash!==await Ni(l.writeToken))throw new Error("Write token is not authorized for this room.");if(u.version!==l.expectedVersion)throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${u.version}.`);const d={...u,encryptedPayload:l.encryptedPayload,updatedAt:new Date().toISOString(),version:u.version+1},c=await e.driver.saveRoom({expectedVersion:l.expectedVersion,nextRecord:d,roomId:l.roomId});if(!c.ok){const p=((f=c.currentRecord)==null?void 0:f.version)??"missing";throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${p}.`)}return Ha(c.currentRecord??d)}async function i(l){const u=await a(l.roomId),d=await Ni(l.writeToken);if(u.writeTokenHash!==d)throw new Error("Write token is not authorized for this room.");if(!(await e.driver.deleteRoom({roomId:l.roomId,writeTokenHash:d})).ok)throw new Error(`Room could not be deleted: ${l.roomId}`)}function o(l){let u=!1;const d=Ni(l.readToken),c=e.driver.subscribeRoom(l.roomId,f=>{u||!f||d.then(p=>{u||f.readTokenHash!==p||l.onChange(Ha(f))})});return()=>{u=!0,c()}}async function s(l,u){const d=await a(l);if(d.readTokenHash!==await Ni(u))throw new Error("Read token is not authorized for this room.");return d}async function a(l){const u=await e.driver.getRoom(l);if(!u)throw new Error(`Room not found: ${l}`);return u}return{claimRoomAccess:e.driver.claimRoomAccess,createRoom:t,deleteRoom:i,loadRoom:n,saveRoom:r,subscribeConnection:e.driver.subscribeConnection,subscribeRoom:o}}function mS(e,t={}){const n=t.accessModel??Xs,r=`app-lab-sync-${TL(`${n}:${e.databaseURL}`)}`,o=ZR().find(l=>l.name===r)??wx(e,r),s=gL(o,e.databaseURL),a=aP(o);return IL(s,{auth:a,ownerSetupSecret:t.ownerSetupSecret})}function IL(e,t={}){const n=t.auth;let r=null;async function i(){if(!n)throw new Error("Firebase Auth is required for auth-v1 RTDB access.");return(n.currentUser??(await W1(n)).user).uid}async function o(){const a=await i();return t.ownerSetupSecret?(r??(r=gl(EL(e,a),{owner:!0,setupSecret:t.ownerSetupSecret}).then(()=>a,l=>{throw r=null,l})),r):a}async function s(){await o()}return{async claimRoomAccess(a){const l=await i();await gl(AL(e,a.roomId,l),{claimToken:a.claimToken,member:!0})},async createRoom(a,l){if(await o(),!(l!=null&&l.claimToken))throw new Error("Room claim token is required for auth-v1 RTDB access.");return await gl(CL(e,a.roomId),l.claimToken),(await _v(Vo(e,a.roomId),d=>{if(d===null)return a})).committed},async getRoom(a){await s();const l=await wv(Vo(e,a));return $o(l.val(),a)},async saveRoom(a){await s();let l=null,u=!1;const d=await _v(Vo(e,a.roomId),c=>{const f=$o(c,a.roomId);if(l=f,!f)return u?void 0:(u=!0,a.nextRecord);if(u=!0,f.version===a.expectedVersion)return l=a.nextRecord,a.nextRecord});return{currentRecord:$o(d.snapshot.val(),a.roomId)??l,ok:d.committed}},async deleteRoom(a){await s();const l=Vo(e,a.roomId),u=await wv(l),d=$o(u.val(),a.roomId);return!d||d.writeTokenHash!==a.writeTokenHash?{currentRecord:d,ok:!1}:(await aL(l),{currentRecord:null,ok:!0})},subscribeConnection(a){return s().catch(()=>{}),Yf(ga(e,".info/connected"),l=>{a(l.val()===!0)})},subscribeRoom(a,l){let u=!1,d=null;return s().then(()=>{u||(d=Yf(Vo(e,a),c=>{l($o(c.val(),a))}))}).catch(c=>{console.warn("Could not start Firebase room subscription.",c)}),()=>{u=!0,d==null||d()}}}}async function Ni(e){const t=await crypto.subtle.digest("SHA-256",SL.encode(e));return RL(new Uint8Array(t))}function Ha(e){return{encryptedPayload:e.encryptedPayload,roomId:e.roomId,updatedAt:e.updatedAt,version:e.version}}function Vo(e,t){return ga(e,`${_L}/${t}`)}function EL(e,t){return ga(e,`${bL}/${t}`)}function CL(e,t){return ga(e,`${xL}/${t}`)}function AL(e,t,n){return ga(e,`${kL}/${t}/${n}`)}function $o(e,t){if(e==null)return null;if(!e||typeof e!="object")throw new Error(`Firebase room is malformed: ${t}`);const n=e;if(n.roomId!==t||typeof n.encryptedPayload!="string"||typeof n.readTokenHash!="string"||typeof n.updatedAt!="string"||typeof n.version!="number"||typeof n.writeTokenHash!="string")throw new Error(`Firebase room is malformed: ${t}`);return{encryptedPayload:n.encryptedPayload,readTokenHash:n.readTokenHash,roomId:n.roomId,updatedAt:n.updatedAt,version:n.version,writeTokenHash:n.writeTokenHash}}function TL(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;return Math.abs(t).toString(36)}function RL(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function NL(e){const{core:t,queueStore:n,syncRegistry:r}=e,i=e.createProviderFromStorageProfile??DL,o=e.createProviderFromReference??OL;let s=!1,a=null,l=!1,u=null,d=!1,c=null,f=!1,p=null,m=!1,w=null;const C=new Map,y=new Map,v=new Map;async function g(){return await lA(n),{storageConfigured:!!await r.getStorageProfile()}}async function k(b){var H;const[T,N,M]=await Promise.all([r.listAppSyncBadges(b),n.listItems(),r.getState()]);return{appBadges:T,pendingOperations:N.map(({appId:fe,kind:he,lastError:ee,status:ie})=>({appId:fe,kind:he,lastError:ee,status:ie})),storageProfile:M.storageProfile,workspaceManifestRoomId:((H=M.manifestRoom)==null?void 0:H.roomId)??null}}async function S(b){return r.configureStorageProfile(b)}async function _(){await r.clearStorageProfile()}async function A(b){await r.removeLocalAppSync(b)}async function R(b){const T=await t.getApp(b);if(!T)throw new Error("App not found.");let N=await r.getAppSyncRecord(b);if(N||(N=await r.ensureOwnedAppRooms(b)),N.kind!=="joined"){await Ke(),await Ae(),await mt(),N=await r.getAppSyncRecord(b);const H=await r.getStorageProfile();if(!H)throw new Error("Storage profile is required before sharing.");await ke(T,i(H),N)}const M=await r.createInvite(b);return await Te(),He(),M}async function O(b){const T=o(b.provider);T.claimRoomAccess&&await T.claimRoomAccess({claimToken:On(b.sourceRoom),roomId:b.sourceRoom.roomId});const N=await Wl({provider:T,syncRecord:{appId:"pending-preview",dataProvider:b.provider,dataRoom:b.dataRoom,importedAt:new Date().toISOString(),kind:"joined",sourceProvider:b.provider,sourceRoom:b.sourceRoom}});return{appId:N.app.appId,dataRoomId:b.dataRoom.roomId,description:N.app.description,name:N.app.name,providerDatabaseUrl:b.provider.databaseUrl,sourceRoomId:N.sourceRoom.roomId,updatedAt:N.app.updatedAt}}async function E(b){const T=o(b.provider);await LL(T,b);const N=await ul({provider:T,syncRecord:{appId:"pending-import",dataProvider:b.provider,dataRoom:b.dataRoom,importedAt:new Date().toISOString(),kind:"joined",sourceProvider:b.provider,sourceRoom:b.sourceRoom}});await t.upsertApp(N.app),await t.saveAppData(N.app.appId,N.appData),await r.markJoinedApp({appId:N.app.appId,dataProvider:b.provider,dataRoom:N.dataRoom,sourceProvider:b.provider,sourceRoom:N.sourceRoom}),await Te(),He()}async function D(b){const T=Vt(b.appId);try{if(!await r.getAppSyncRecord(b.appId)){if(!await r.getStorageProfile())return;await r.ensureOwnedAppRooms(b.appId),await Bc(n,b.appId)}await oA(n,b),Ae()}finally{T()}}async function z(b,T){_e(b);let M=await r.getAppSyncRecord(b);if(!M){if(!await r.getStorageProfile())return;M=await r.ensureOwnedAppRooms(b),await Bc(n,b)}await sA({appId:b,baseData:T,baseRemoteVersion:M.dataRoom.lastSeenVersion,data:T,roomId:M.dataRoom.roomId,store:n}),mt()}async function K(b,T={}){if(await r.getStorageProfile()){if(await r.ensureOwnedAppRooms(b.appId),await Bc(n,b.appId),T.flush===!1){await Te();return}await Ke(),await Te(),He()}}async function Z(){for(const b of await t.listApps()){await r.getAppSyncRecord(b.appId)||await r.ensureOwnedAppRooms(b.appId);const N=await t.getApp(b.appId);N&&await K(N)}await Ke(),await Te(),await He()}async function te(b){if(await Nt(b))return{};const T=await r.getAppSyncRecord(b),N=await Me(T);if(!T||!N)return{};try{const M=await ul({provider:N,syncRecord:T});return await t.upsertApp(M.app),await t.saveAppData(M.app.appId,M.appData),await r.rememberAppRoomVersions({appId:M.app.appId,dataRoom:M.dataRoom,sourceRoom:M.sourceRoom}),await Te(),{app:M.app}}catch(M){if(!Af(M))throw M;return await r.markRemoteAppDeleted(b,M.deletedAt),await Te(),{deletedAt:M.deletedAt}}}async function ve(b){const T=await r.getAppSyncRecord(b);if(!T||T.kind==="joined")return;const N=await t.getApp(b);N&&(await iA({app:N,store:n,syncRecord:T}),sr())}async function xe(){await r.ensureWorkspaceManifestRoom(),await Ke(),await Ae(),await mt();let b=await r.getState();if(!b.storageProfile)throw new Error("Storage profile is required.");const T=i(b.storageProfile);for(const M of await t.listApps()){const H=await t.getApp(M.appId),fe=await r.getAppSyncRecord(M.appId);!H||!fe||fe.kind==="joined"||await ke(H,T,fe)}await Te(),He(),b=await r.getState();const N=sT(b);return aT(N)}async function B(b){const T=lT(b),N=await cT({provider:o(T.provider),recoveryMaterial:T});await we(N),await r.replaceState(N),await Te(),He()}async function q(){const b=await r.getState();if(!b.storageProfile||!b.manifestRoom)return Wa();const T=await dT({provider:i(b.storageProfile),state:b});return Ue(T)}async function x(b){const T=await r.getState();return!T.storageProfile||!T.manifestRoom?()=>{}:i(T.storageProfile).subscribeRoom({readToken:pt(T.manifestRoom),roomId:T.manifestRoom.roomId,onChange:M=>{(async()=>{try{const H=await r.getState();if(!H.storageProfile||!H.manifestRoom||M.roomId!==H.manifestRoom.roomId||M.version<=H.manifestRoom.lastSeenVersion)return;const fe=await ra({snapshot:M,state:H}),he=await Ue(fe);(he.appIdsChanged.length||he.appIdsDeleted.length)&&b(he)}catch(H){if(od(H))return;console.warn("Could not process remote workspace manifest update.",H)}})()}})}async function re(b,T){const N=await r.getAppSyncRecord(b),M=await Me(N);if(!N||!M)return()=>{};const H=N.dataRoom.lastSeenVersion;let fe=!1;return M.subscribeRoom({readToken:pt(N.dataRoom),roomId:N.dataRoom.roomId,onChange:he=>{(async()=>{try{const ee=!fe;fe=!0;const ie=await r.getAppSyncRecord(b);if(!ie||he.version<=ie.dataRoom.lastSeenVersion||await Xe(b))return;const j=await Mu({capability:ie.dataRoom,roomType:"app-data",snapshot:he});await t.saveAppData(b,j);const ne=na(ie.dataRoom,he);if(await r.rememberAppRoomVersions({appId:b,dataRoom:ne}),await Te(),ee&&H===0)return;T({data:j,version:he.version})}catch(ee){if(od(ee))return;console.warn("Could not process remote app data update.",ee)}})()}})}async function ce(b,T,N){const M=await r.getAppSyncRecord(b),H=await de(M);return!M||!H?()=>{}:H.subscribeRoom({readToken:pt(M.sourceRoom),roomId:M.sourceRoom.roomId,onChange:fe=>{(async()=>{const he=v.get(b)??0,ee=await r.getAppSyncRecord(b);if(!(!ee||fe.version<=ee.sourceRoom.lastSeenVersion))try{if(await ln(b))return;const ie=await Wl({provider:H,syncRecord:ee}),j=await r.getAppSyncRecord(b);if(he!==(v.get(b)??0)||await ln(b)||!j||ie.sourceRoom.lastSeenVersion<=j.sourceRoom.lastSeenVersion)return;await t.upsertApp(ie.app),await r.rememberAppRoomVersions({appId:ie.app.appId,sourceRoom:ie.sourceRoom}),await Te(),T({app:ie.app})}catch(ie){if(od(ie))return;if(!Af(ie)){console.warn("Could not process remote app source update.",ie);return}await r.markRemoteAppDeleted(b,ie.deletedAt),await Te(),N({deletedAt:ie.deletedAt})}})()}})}async function I(b){var M;const T=await r.getStorageProfile();if(!T)return()=>{};const N=i(T);return((M=N.subscribeConnection)==null?void 0:M.call(N,b))??(()=>{})}async function ke(b,T,N){if(!N||N.kind==="joined")return;const M=await If({app:b,provider:T,syncRecord:N}),H=await Ef({appData:await t.getAppData(b.appId),provider:T,syncRecord:{...N,sourceRoom:M}});await r.rememberAppRoomVersions({appId:b.appId,dataRoom:H,sourceRoom:M}),await Te()}async function Me(b){if(!b)return null;if(b.kind==="joined")return o(b.dataProvider);const T=await r.getStorageProfile();return T?i(T):null}async function de(b){if(!b)return null;if(b.kind==="joined")return o(b.sourceProvider);const T=await r.getStorageProfile();return T?i(T):null}async function Ue(b){const T=await r.getState();if(!T.storageProfile||!T.manifestRoom||!b.manifestRoom)return Wa();if(b.workspaceId!==T.workspaceId)throw new Error("Remote workspace manifest belongs to a different workspace.");if(b.manifestRoom.lastSeenVersion<=T.manifestRoom.lastSeenVersion)return Wa();const N=new Set,M=new Set,H=new Set;let fe=!1;const he={...T,apps:{...T.apps},deletedApps:{...T.deletedApps},manifestRoom:b.manifestRoom,storageProfile:b.storageProfile??T.storageProfile,updatedAt:b.updatedAt};for(const[ee,ie]of Object.entries(b.deletedApps)){if(await Nt(ee))continue;const j=he.apps[ee];if((j==null?void 0:j.kind)==="joined"){j.remoteDeletedAt!==ie.deletedAt&&(he.apps[ee]={...j,remoteDeletedAt:ie.deletedAt},N.add(ee),fe=!0);continue}const ne=he.deletedApps[ee];(!ne||ie.deletedAt>ne.deletedAt)&&(he.deletedApps[ee]=ie,fe=!0),j&&(delete he.apps[ee],M.add(ee),fe=!0)}for(const[ee,ie]of Object.entries(b.apps)){if(await Nt(ee))continue;const j=he.apps[ee],ne=await t.getApp(ee);j&&ne&&!PL(ie,j)||(he.apps[ee]=ie,delete he.deletedApps[ee],N.add(ee),gS(ie)||H.add(ee),fe=!0)}return fe?(await we(he,H),await r.replaceState(he),await Promise.all([...M].map(ee=>t.deleteApp(ee))),{appIdsChanged:[...N],appIdsDeleted:[...M]}):(await r.rememberWorkspaceManifestVersion(b.manifestRoom.lastSeenVersion),Wa())}async function we(b,T){if(b.storageProfile)for(const N of Object.values(b.apps)){if(T&&!T.has(N.appId)||N.kind==="joined"&&N.sourceProvider.databaseUrl!==b.storageProfile.databaseUrl)continue;const M=i(b.storageProfile),H=await ul({provider:M,syncRecord:N});await t.upsertApp(H.app),await t.saveAppData(H.app.appId,H.appData),N.sourceRoom=H.sourceRoom,N.dataRoom=H.dataRoom}}async function Ke(){return a?(s=!0,a):(a=(async()=>{do s=!1,await ZA({core:t,createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(s)})().finally(()=>{a=null}),a)}async function Ae(){return c?(d=!0,c):(c=(async()=>{do d=!1,await Ke(),await tT({core:t,createProviderForSyncRecord:de,queueStore:n,syncRegistry:r});while(d);await Te(),He()})().finally(()=>{c=null}),c)}async function mt(){return u?(l=!0,u):(u=(async()=>{do l=!1,await Ke(),await WA({createProviderForSyncRecord:Me,queueStore:n,syncRegistry:r}),await Kr();while(l);await Te(),He()})().finally(()=>{u=null}),u)}async function Te(){const b=await r.getState();b.storageProfile&&(await r.ensureWorkspaceManifestRoom(),await aA(n,b.workspaceId))}async function Sn(){await Te()}function pe(b){_e(b)}function Vt(b){v.set(b,(v.get(b)??0)+1),y.set(b,(y.get(b)??0)+1);let T=!1;return()=>{if(T)return;T=!0;const N=(y.get(b)??1)-1;N>0?y.set(b,N):y.delete(b)}}async function He(b={}){if(!(p&&(f=!0,await p,!b.throwOnError)))return p=(async()=>{do f=!1,await ET({createProviderFromStorageProfile:i,onSavedState:async T=>{await Ue(T)},queueStore:n,syncRegistry:r,throwOnError:b.throwOnError});while(f)})().finally(()=>{p=null}),p}async function Je(b){const T=await n.getItem(uh(b));return(T==null?void 0:T.kind)==="save-app-data"}async function In(b){const T=await n.getItem(Jb(b));return(T==null?void 0:T.kind)==="save-source"}async function Nt(b){return await Je(b)||await In(b)}async function Xe(b){return await Je(b)||qr(b)}async function ln(b){return await In(b)||y.has(b)}function _e(b){C.set(b,Date.now()+1500)}function qr(b){const T=C.get(b);return T?Date.now()<=T?!0:(C.delete(b),!1):!1}async function Kr(){await Promise.all([...C.keys()].map(async b=>{await Je(b)||C.delete(b)}))}async function sr(){return w?(m=!0,w):(w=(async()=>{do m=!1,await QA({createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(m)})().finally(()=>{w=null}),w)}return{backUpLocalApps:Z,clearStorageProfile:_,configureStorageProfile:S,createInvite:R,deleteSyncedAppRooms:ve,ensureAppBackedUp:K,exportWorkspaceRecovery:xe,flushAppDataSyncQueue:mt,flushOwnedAppDeletionQueue:sr,flushWorkspaceManifestQueue:He,flushSourceSyncQueue:Ae,flushRoomLifecycleQueue:Ke,getWorkspaceSyncOverview:k,importInvite:E,initializeWorkspaceSync:g,beginLocalAppSourceEdit:Vt,noteLocalAppDataEdit:pe,previewInvite:O,pullLatestAppRooms:te,pullLatestWorkspaceManifest:q,pushAppData:z,pushAppSource:D,queueWorkspaceManifestSave:Sn,removeLocalAppSync:A,restoreWorkspaceRecovery:B,subscribeAppData:re,subscribeAppSource:ce,subscribeStorageConnection:I,subscribeWorkspaceManifest:x}}function Wa(){return{appIdsChanged:[],appIdsDeleted:[]}}function PL(e,t){return e.kind!==t.kind||gS(e)&&e.remoteDeletedAt!==(t.kind==="joined"?t.remoteDeletedAt:void 0)||e.sourceRoom.roomId!==t.sourceRoom.roomId||e.dataRoom.roomId!==t.dataRoom.roomId?!0:e.sourceRoom.lastSeenVersion>t.sourceRoom.lastSeenVersion||e.dataRoom.lastSeenVersion>t.dataRoom.lastSeenVersion}function gS(e){return e.kind==="joined"&&typeof e.remoteDeletedAt=="string"}function DL(e){return hS({driver:mS(e.firebaseConfig,{accessModel:e.accessModel,ownerSetupSecret:e.ownerSetupSecret})})}function OL(e){if(!e.firebaseConfig)throw new Error("Invite is missing Firebase config.");return hS({driver:mS(e.firebaseConfig,{accessModel:e.accessModel,ownerSetupSecret:e.ownerSetupSecret})})}async function LL(e,t){e.claimRoomAccess&&(await e.claimRoomAccess({claimToken:On(t.sourceRoom),roomId:t.sourceRoom.roomId}),await e.claimRoomAccess({claimToken:On(t.dataRoom),roomId:t.dataRoom.roomId}))}function od(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function ML(e){return NL({core:e,queueStore:uA(),syncRegistry:NA(PA())})}const yS=`(() => {
  // packages/alpinejs/src/scheduler.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }

  // packages/alpinejs/src/reactivity.js
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }

  // packages/alpinejs/src/mutation.js
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    el._x_effects?.forEach(dequeueJob);
    while (el._x_cleanups?.length)
      el._x_cleanups.pop()();
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = [];
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].removedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (!node._x_marker)
            return;
          removedNodes.add(node);
        });
        mutations[i].addedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (removedNodes.has(node)) {
            removedNodes.delete(node);
            return;
          }
          if (node._x_marker)
            return;
          addedNodes.push(node);
        });
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.some((i) => i.contains(node)))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    for (let node of addedNodes) {
      if (!node.isConnected)
        continue;
      onElAddeds.forEach((i) => i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }

  // packages/alpinejs/src/scope.js
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(
        new Set(objects.flatMap((i) => Object.keys(i)))
      );
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
      );
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Reflect.has(obj, name)
        ) || {},
        name,
        thisProxy
      );
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.set && descriptor?.get)
        return descriptor.set.call(thisProxy, value) || true;
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }

  // packages/alpinejs/src/interceptor.js
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        if (typeof value === "object" && value !== null && value.__v_skip)
          return;
        let path = basePath === "" ? key : \`\${basePath}.\${key}\`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }

  // packages/alpinejs/src/magics.js
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    let memoizedUtilities = getUtilities(el);
    Object.entries(magics).forEach(([name, callback]) => {
      Object.defineProperty(obj, \`$\${name}\`, {
        get() {
          return callback(el, memoizedUtilities);
        },
        enumerable: false
      });
    });
    return obj;
  }
  function getUtilities(el) {
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    let utils = { interceptor, ...utilities };
    onElRemoved(el, cleanup2);
    return utils;
  }

  // packages/alpinejs/src/utils/error.js
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    error2 = Object.assign(
      error2 ?? { message: "No error message given." },
      { el, expression }
    );
    console.warn(\`Alpine Expression Error: \${error2.message}

\${expression ? 'Expression: "' + expression + '"\\n\\n' : ""}\`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }

  // packages/alpinejs/src/evaluator.js
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\\n\\s]*if.*\\(.*\\)/.test(expression.trim()) || /^(let|const)\\s/.test(expression.trim()) ? \`(async()=>{ \${expression} })()\` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(
          ["__self", "scope"],
          \`with (scope) { __self.result = \${rightSideSafeExpression} }; __self.finished = true; return __self.result;\`
        );
        Object.defineProperty(func2, "name", {
          value: \`[Alpine] \${expression}\`
        });
        return func2;
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i) => receiver(i));
    } else {
      receiver(value);
    }
  }

  // packages/alpinejs/src/directives.js
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw\`Cannot find directive \\\`\${directive2}\\\`. \\\`\${name}\\\` will use the default order of execution\`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directiveExists(name) {
    return Object.keys(directiveHandlers).includes(name);
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: \`x-bind:\${attribute.name}\`,
            value: \`"\${attribute.value}"\`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(\`^\${prefixAsString}([^:^.]+)\\\\b\`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\\-_:]+)/);
      let modifiers = name.match(/\\.[^.\\]]+(?=[^\\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }

  // packages/alpinejs/src/utils/dispatch.js
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
      })
    );
  }

  // packages/alpinejs/src/utils/walk.js
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }

  // packages/alpinejs/src/utils/warn.js
  function warn(message, ...args) {
    console.warn(\`Alpine Warning: \${message}\`, ...args);
  }

  // packages/alpinejs/src/lifecycle.js
  var started = false;
  function start() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before \`<body>\` is available. Did you forget to add \`defer\` in Alpine's \`<script>\` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(() => {
      warnAboutMissingPlugins();
    });
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors2 = [];
  function interceptInit(callback) {
    initInterceptors2.push(callback);
  }
  var markerDispenser = 1;
  function initTree(el, walker = walk, intercept = () => {
  }) {
    if (findClosest(el, (i) => i._x_ignore))
      return;
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        if (el2._x_marker)
          return;
        intercept(el2, skip);
        initInterceptors2.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        if (!el2._x_ignore)
          el2._x_marker = markerDispenser++;
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupElement(el);
      cleanupAttributes(el);
      delete el._x_marker;
    });
  }
  function warnAboutMissingPlugins() {
    let pluginDirectives = [
      ["ui", "dialog", ["[x-dialog], [x-popover]"]],
      ["anchor", "anchor", ["[x-anchor]"]],
      ["sort", "sort", ["[x-sort]"]]
    ];
    pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
      if (directiveExists(directive2))
        return;
      selectors.some((selector) => {
        if (document.querySelector(selector)) {
          warn(\`found "\${selector}", but missing \${plugin2} plugin\`);
          return true;
        }
      });
    });
  }

  // packages/alpinejs/src/nextTick.js
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }

  // packages/alpinejs/src/utils/classes.js
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }

  // packages/alpinejs/src/utils/styles.js
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  // packages/alpinejs/src/utils/once.js
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }

  // packages/alpinejs/src/directives/x-transition.js
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      "enter": (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      "leave": (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = \`cubic-bezier(0.4, 0.0, 0.2, 1)\`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: \`\${delay}s\`,
        transitionProperty: property,
        transitionDuration: \`\${durationIn}s\`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: \`scale(\${scaleValue})\`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: \`scale(1)\`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: \`\${delay}s\`,
        transitionProperty: property,
        transitionDuration: \`\${durationOut}s\`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: \`scale(1)\`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: \`scale(\${scaleValue})\`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i?.());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }

  // packages/alpinejs/src/clone.js
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {
        });
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }

  // packages/alpinejs/src/utils/bind.js
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (isRadio(el)) {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (isCheckbox(el)) {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === void 0 ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  var booleanAttributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "shadowrootclonable",
    "shadowrootdelegatesfocus",
    "shadowrootserializable"
  ]);
  function isBooleanAttr(attrName) {
    return booleanAttributes.has(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
  }
  function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback);
  }
  function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }
  function isCheckbox(el) {
    return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
  }
  function isRadio(el) {
    return el.type === "radio" || el.localName === "ui-radio";
  }

  // packages/alpinejs/src/utils/debounce.js
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // packages/alpinejs/src/utils/throttle.js
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // packages/alpinejs/src/entangle.js
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else {
        }
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }

  // packages/alpinejs/src/plugin.js
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }

  // packages/alpinejs/src/store.js
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    initInterceptors(stores[name]);
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
  }
  function getStores() {
    return stores;
  }

  // packages/alpinejs/src/binds.js
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: \`x-bind:\${attribute.name}\`,
          value: \`"\${attribute.value}"\`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }

  // packages/alpinejs/src/datas.js
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }

  // packages/alpinejs/src/alpine.js
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.14.9",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;

  // node_modules/@vue/shared/dist/shared.esm-bundler.js
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = \`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly\`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + \`,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected\`);
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? \`on\${capitalize(str)}\` : \`\`);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

  // node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(\`__proto__,__v_isRef,__isVue\`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        console.warn(\`Set operation on key "\${String(key)}" failed: target is readonly.\`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(\`Delete operation on key "\${String(key)}" failed: target is readonly.\`, target);
      }
      return true;
    }
  };
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? \`on key "\${args[0]}" \` : \`\`;
        console.warn(\`\${capitalize(type)} operation \${key}failed: target is readonly.\`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(\`Reactive \${type} contains both the raw and reactive versions of the same object\${type === \`Map\` ? \` as keys\` : \`\`}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.\`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target[
      "__v_isReadonly"
      /* IS_READONLY */
    ]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(\`value cannot be made reactive: \${String(target)}\`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* RAW */
    ] && !(isReadonly && target[
      "__v_isReactive"
      /* IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed[
      "__v_raw"
      /* RAW */
    ]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }

  // packages/alpinejs/src/magics/$nextTick.js
  magic("nextTick", () => nextTick);

  // packages/alpinejs/src/magics/$dispatch.js
  magic("dispatch", (el) => dispatch.bind(dispatch, el));

  // packages/alpinejs/src/magics/$watch.js
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate2((i) => value = i);
      return value;
    };
    let unwatch = watch(getter, callback);
    cleanup2(unwatch);
  });

  // packages/alpinejs/src/magics/$store.js
  magic("store", getStores);

  // packages/alpinejs/src/magics/$data.js
  magic("data", (el) => scope(el));

  // packages/alpinejs/src/magics/$root.js
  magic("root", (el) => closestRoot(el));

  // packages/alpinejs/src/magics/$refs.js
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }

  // packages/alpinejs/src/ids.js
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }

  // packages/alpinejs/src/magics/$id.js
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = \`\${name}\${key ? \`-\${key}\` : ""}\`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? \`\${name}-\${id}-\${key}\` : \`\${name}-\${id}\`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }

  // packages/alpinejs/src/magics/$el.js
  magic("el", (el) => el);

  // packages/alpinejs/src/magics/index.js
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(\`You can't use [$\${magicName}] without first installing the "\${name}" plugin here: https://alpinejs.dev/plugins/\${slug}\`, el));
  }

  // packages/alpinejs/src/directives/x-modelable.js
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(\`\${expression} = __placeholder\`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { "__placeholder": val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle(
        {
          get() {
            return outerGet();
          },
          set(value) {
            outerSet(value);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value) {
            innerSet(value);
          }
        }
      );
      cleanup2(releaseEntanglement);
    });
  });

  // packages/alpinejs/src/directives/x-teleport.js
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone2, target, modifiers);
      skipDuringClone(() => {
        initTree(clone2);
      })();
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(
      () => mutateDom(() => {
        clone2.remove();
        destroyTree(clone2);
      })
    );
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(\`Cannot find x-teleport element for selector: "\${expression}"\`);
    return target;
  }

  // packages/alpinejs/src/directives/x-ignore.js
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);

  // packages/alpinejs/src/directives/x-effect.js
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));

  // packages/alpinejs/src/utils/on.js
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (isKeyEvent(event) || isClickEvent(event)) {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
        next(e);
      });
    }
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(
      subject
    ))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isClickEvent(event) {
    return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[\`\${modifier}Key\`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (isClickEvent(e.type))
          return false;
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      "ctrl": "control",
      "slash": "/",
      "space": " ",
      "spacebar": " ",
      "cmd": "meta",
      "esc": "escape",
      "up": "arrow-up",
      "down": "arrow-down",
      "left": "arrow-left",
      "right": "arrow-right",
      "period": ".",
      "comma": ",",
      "equal": "=",
      "minus": "-",
      "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }

  // packages/alpinejs/src/directives/x-model.js
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, \`\${expression} = __placeholder\`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, \`\${expression()} = __placeholder\`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
        setValue(
          getInputValue(el, modifiers, { target: el }, getValue())
        );
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === void 0 && typeof expression === "string" && expression.match(/\\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (isCheckbox(el)) {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        let newValue;
        if (isRadio(el)) {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }

  // packages/alpinejs/src/directives/x-cloak.js
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));

  // packages/alpinejs/src/directives/x-init.js
  addInitSelector(() => \`[\${prefix("init")}]\`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));

  // packages/alpinejs/src/directives/x-text.js
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });

  // packages/alpinejs/src/directives/x-html.js
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });

  // packages/alpinejs/src/directives/x-bind.js
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && typeof expression === "string" && expression.match(/\\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
    cleanup2(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }

  // packages/alpinejs/src/directives/x-data.js
  addRootSelector(() => \`[\${prefix("data")}]\`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }

  // packages/alpinejs/src/directives/x-show.js
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value) => value ? show() : hide(),
      (value) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
        } else {
          value ? clickAwayCompatibleShow() : hide();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });

  // packages/alpinejs/src/directives/x-for.js
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => mutateDom(
        () => {
          destroyTree(el2);
          el2.remove();
        }
      ));
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => {
            if (keys.includes(value))
              warn("Duplicate key on x-for", el);
            keys.push(value);
          }, { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!(key in lookup))
          continue;
        mutateDom(() => {
          destroyTree(lookup[key]);
          lookup[key].remove();
        });
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(\`x-for ":key" is undefined or invalid\`, templateEl, keyForSpot, lookup);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          skipDuringClone(() => initTree(clone2))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\\}\\]]*)(?:,([^,\\}\\]]*))?$/;
    let stripParensRE = /^\\s*\\(|\\)\\s*$/g;
    let forAliasRE = /([\\s\\S]*?)\\s+(?:in|of)\\s+([\\s\\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\\[.*\\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\\{.*\\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }

  // packages/alpinejs/src/directives/x-ref.js
  function handler3() {
  }
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);

  // packages/alpinejs/src/directives/x-if.js
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        mutateDom(() => {
          destroyTree(clone2);
          clone2.remove();
        });
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });

  // packages/alpinejs/src/directives/x-id.js
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });

  // packages/alpinejs/src/directives/x-on.js
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { "$event": e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));

  // packages/alpinejs/src/directives/index.js
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(\`You can't use [x-\${directiveName}] without first installing the "\${name}" plugin here: https://alpinejs.dev/plugins/\${slug}\`, el));
  }

  // packages/alpinejs/src/index.js
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;

  // packages/alpinejs/builds/cdn.js
  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });
})();
`,jL=`  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });`,vS=yS.replace(jL,"  window.Alpine = src_default;");if(vS===yS)throw new Error("Could not remove Alpine auto-start from sandbox runtime.");function FL(e){return["default-src 'none'",e==="alpine"?"script-src 'unsafe-inline' 'unsafe-eval'":"script-src 'unsafe-inline'","style-src 'unsafe-inline'","img-src data: blob:","font-src data:","connect-src 'none'","media-src data: blob:","object-src 'none'","frame-src 'none'","worker-src 'none'","form-action 'none'","base-uri 'none'"].join("; ")}function UL(e,t,n,r={}){var m;const i=r.runtimeMode??"alpine",o=new DOMParser().parseFromString(e,"text/html");for(const w of o.querySelectorAll("meta[http-equiv]"))((m=w.getAttribute("http-equiv"))==null?void 0:m.toLowerCase())==="content-security-policy"&&w.remove();const s=o.createElement("meta");s.setAttribute("http-equiv","Content-Security-Policy"),s.setAttribute("content",FL(i));const a=o.createElement("style");a.dataset.appLabRuntime="compiled-css",a.textContent=n??"";const l=o.createElement("script");l.textContent=`Object.defineProperty(window, "__APP_LAB_CAPABILITY__", {
  value: ${JSON.stringify(t)},
  configurable: false,
  enumerable: false,
  writable: false
});`;const u=o.createElement("script");u.textContent=`(function () {
  const appLabCapability = window.__APP_LAB_CAPABILITY__;
  const pending = new Map();
  const errorHandlers = new Set();
  const dataChangeHandlers = new Set();
  const originalConsole = {
    debug: console.debug.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    log: console.log.bind(console),
    warn: console.warn.bind(console)
  };

  function createRequestId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "req-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function notifyError(error) {
    const message = error instanceof Error ? error.message : String(error);
    for (const handler of errorHandlers) {
      try {
        handler(message, error);
      } catch (_) {}
    }
  }

  function formatConsoleArg(value) {
    if (value instanceof Error) {
      return value.stack || value.message;
    }
    if (typeof value === "string") {
      return value;
    }
    try {
      const json = JSON.stringify(value);
      return json === undefined ? String(value) : json;
    } catch (_) {
      return String(value);
    }
  }

  function postConsole(level, args) {
    window.parent.postMessage({
      type: "APP_LAB_CONSOLE",
      appLabCapability,
      payload: {
        level,
        args: Array.from(args).map(formatConsoleArg),
        timestamp: new Date().toISOString()
      }
    }, "*");
  }

  for (const level of ["debug", "error", "info", "log", "warn"]) {
    console[level] = function () {
      originalConsole[level](...arguments);
      postConsole(level, arguments);
    };
  }

  function request(type, payload) {
    return new Promise((resolve, reject) => {
      const requestId = createRequestId();
      pending.set(requestId, { type, resolve, reject });
      try {
        window.parent.postMessage({ type, requestId, appLabCapability, payload: payload || {} }, "*");
      } catch (error) {
        pending.delete(requestId);
        reject(error);
        notifyError(error);
      }
    });
  }

  function toJsonValue(value) {
    if (value === undefined) return null;
    const json = JSON.stringify(value);
    if (json === undefined) return null;
    return JSON.parse(json);
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (!message || typeof message !== "object") return;

    if (message.type === "APP_LAB_DATA_CHANGED") {
      const data = message.payload ? message.payload.data : null;
      const info = message.payload ? message.payload.info || {} : {};
      for (const handler of dataChangeHandlers) {
        try {
          handler(data, info);
        } catch (error) {
          console.error(error);
          notifyError(error);
        }
      }
    }

    const pendingRequest = pending.get(message.requestId);
    if (!pendingRequest) return;

    if (message.type === "MY_DATA" && pendingRequest.type === "GET_MY_DATA") {
      pending.delete(message.requestId);
      pendingRequest.resolve(message.payload ? message.payload.data : null);
      return;
    }

    if (message.type === "MY_DATA_SAVED" && pendingRequest.type === "SAVE_MY_DATA") {
      pending.delete(message.requestId);
      pendingRequest.resolve(true);
      return;
    }

    if (message.type === "MY_DATA_SAVE_FAILED" && pendingRequest.type === "SAVE_MY_DATA") {
      pending.delete(message.requestId);
      const error = new Error((message.payload && message.payload.error) || "Could not save app data.");
      pendingRequest.reject(error);
      notifyError(error);
    }
  });

  window.addEventListener("error", (event) => {
    postConsole("error", [event.error || event.message]);
    notifyError(event.error || event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    postConsole("error", [event.reason]);
    notifyError(event.reason);
  });

  function reportUnsupportedFormSubmission() {
    const error = new Error(
      'Form submission is blocked by the App Lab sandbox. Use a button with type="button" and an explicit click handler instead.'
    );
    originalConsole.error(error.message);
    postConsole("error", [error]);
    notifyError(error);
  }

  window.addEventListener("submit", (event) => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    reportUnsupportedFormSubmission();
  });

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    const target = event.target instanceof Element ? event.target.closest("button, input") : null;
    if (!(target instanceof HTMLButtonElement || target instanceof HTMLInputElement) || !target.form) return;

    const type = (target.getAttribute("type") || (target instanceof HTMLButtonElement ? "submit" : "text")).toLowerCase();
    if (type !== "submit" && type !== "image") return;

    event.preventDefault();
    reportUnsupportedFormSubmission();
  });

  Object.defineProperty(window, "AppLab", {
    value: Object.freeze({
      getData: function (fallback) {
        return request("GET_MY_DATA").then((data) => data == null && arguments.length ? fallback : data);
      },
      saveData: function (data) {
        try {
          return request("SAVE_MY_DATA", { data: toJsonValue(data) });
        } catch (error) {
          notifyError(error);
          return Promise.reject(error);
        }
      },
      onDataChange: function (handler) {
        if (typeof handler !== "function") return function () {};
        dataChangeHandlers.add(handler);
        window.parent.postMessage({
          type: "APP_LAB_DATA_HANDLER_STATUS",
          appLabCapability,
          payload: { registered: dataChangeHandlers.size > 0 }
        }, "*");
        return function () {
          dataChangeHandlers.delete(handler);
          window.parent.postMessage({
            type: "APP_LAB_DATA_HANDLER_STATUS",
            appLabCapability,
            payload: { registered: dataChangeHandlers.size > 0 }
          }, "*");
        };
      },
      onError: function (handler) {
        if (typeof handler !== "function") return function () {};
        errorHandlers.add(handler);
        return function () {
          errorHandlers.delete(handler);
        };
      }
    }),
    configurable: false,
    enumerable: false,
    writable: false
  });
})();`;const d=[];if(i==="alpine"){const w=o.createElement("script");w.dataset.appLabRuntime="alpine",w.textContent=vS,d.push(w)}const c=o.createElement("script");c.textContent=`(function () {
  const appLabCapability = window.__APP_LAB_CAPABILITY__;
  function notifyHost() {
    window.parent.postMessage({ type: "APP_LAB_UNLOADING", appLabCapability }, "*");
  }
  window.addEventListener("pagehide", notifyHost);
  window.addEventListener("beforeunload", notifyHost);
})();`;const f=o.createElement("script");f.dataset.appLabRuntime="alpine-start",f.textContent=`queueMicrotask(() => {
  if (window.Alpine && !window.__APP_LAB_ALPINE_STARTED__) {
    Object.defineProperty(window, "__APP_LAB_ALPINE_STARTED__", {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false
    });
    window.Alpine.start();
  }
});`;const p=n?[s,a,l,u,...d,c]:[s,l,u,...d,c];return o.head.prepend(...p),i==="alpine"&&o.body.append(f),`<!doctype html>
${o.documentElement.outerHTML}`}function zL({app:e,getAppData:t,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:i=0,remoteDataChange:o,saveAppData:s}){const a=P.useRef(null),l=P.useRef(null),u=P.useRef(!1),d=P.useRef(null),c=P.useRef(null),f=P.useRef(null),[p,m]=P.useState(0),w=P.useMemo(()=>{const k=crypto.randomUUID();return{capability:k,html:UL(e.sourceCode,k,e.compiledCss)}},[e.appId,e.compiledCss,e.sourceCode,e.updatedAt,i,p]);P.useLayoutEffect(()=>{l.current={appId:e.appId,capability:w.capability},u.current=!1,d.current=w.capability,c.current=null,C()},[e.appId,w.capability]),P.useEffect(()=>()=>C(),[]),P.useEffect(()=>{async function k(R){var K;if(R.source!==((K=a.current)==null?void 0:K.contentWindow)||!R.data||typeof R.data!="object")return;const O=l.current;if(!O||R.data.appLabCapability!==O.capability)return;const{type:E,requestId:D,payload:z}=R.data;if(E==="APP_LAB_UNLOADING"){_(O.capability);return}if(E==="APP_LAB_CONSOLE"){const Z=BL(z);Z&&n(Z);return}if(E==="APP_LAB_DATA_HANDLER_STATUS"){u.current=!!(z!=null&&z.registered),u.current&&y();return}if(E==="GET_MY_DATA"){const Z=await t(O.appId);if(!S(O))return;A({type:"MY_DATA",requestId:D,payload:{data:Z}});return}if(E==="SAVE_MY_DATA")try{if(await s(O.appId,(z==null?void 0:z.data)??null),!S(O))return;A({type:"MY_DATA_SAVED",requestId:D,payload:{ok:!0}})}catch(Z){if(!S(O))return;A({type:"MY_DATA_SAVE_FAILED",requestId:D,payload:{ok:!1,error:Z instanceof Error?Z.message:"Could not save app data."}})}}function S(R){const O=l.current;return(O==null?void 0:O.appId)===R.appId&&O.capability===R.capability}function _(R){var O;((O=l.current)==null?void 0:O.capability)===R&&(l.current=null),d.current===R&&(d.current=null)}function A(R){var O,E;(E=(O=a.current)==null?void 0:O.contentWindow)==null||E.postMessage(R,"*")}return window.addEventListener("message",k),()=>window.removeEventListener("message",k)},[t,n,s]),P.useEffect(()=>{if(!o)return;const k=l.current;if(!(!k||k.appId!==e.appId)){if(!u.current){c.current=o,C(),f.current=window.setTimeout(()=>{var S;((S=c.current)==null?void 0:S.id)!==o.id||u.current||(c.current=null,r==null||r())},500);return}v(o)}},[e.appId,r,o]);function C(){f.current!=null&&(window.clearTimeout(f.current),f.current=null)}function y(){const k=c.current;k&&(c.current=null,C(),v(k))}function v(k){var S,_;(_=(S=a.current)==null?void 0:S.contentWindow)==null||_.postMessage({type:"APP_LAB_DATA_CHANGED",payload:{data:k.data,info:{source:"remote",version:k.version}}},"*")}function g(){if(d.current===w.capability){d.current=null;return}l.current=null,d.current=null,m(k=>k+1)}return h.jsx("iframe",{ref:a,className:"block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]",title:`${e.name} app`,sandbox:"allow-scripts","data-app-lab-capability":w.capability,referrerPolicy:"no-referrer",onLoad:g,srcDoc:w.html})}function BL(e){if(!e||typeof e!="object")return null;const t=e,n=typeof t.level=="string"&&VL(t.level)?t.level:"log",r=Array.isArray(t.args)?t.args.map(o=>String(o)).slice(0,20):[],i=typeof t.timestamp=="string"?t.timestamp:new Date().toISOString();return{id:crypto.randomUUID(),level:n,args:r,timestamp:i}}function VL(e){return e==="debug"||e==="error"||e==="info"||e==="log"||e==="warn"}const $L="modulepreload",HL=function(e){return"/app-lab/staging/"+e},bv={},WL=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(l=>{if(l=HL(l),l in bv)return;bv[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":$L,u||(c.as="script"),c.crossOrigin="",c.href=l,a&&c.setAttribute("nonce",a),document.head.appendChild(c),u)return new Promise((f,p)=>{c.addEventListener("load",f),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},qL='meta[name="app-lab-tailwind"][content="enabled"]',KL='style[type="text/tailwindcss"]',wS=5e3,GL=8e3,sd=new Map;let xv=null;async function kv(e){const t=await hM(e);if(!YL(e))return{compiledCss:void 0,compiledCssSourceHash:void 0};if(rM())throw new Error("Tailwind CSS compilation is unavailable while offline.");const n=sd.get(t);if(n)return n;const r=cM(QL(e,t),GL,"Tailwind CSS compilation timed out.").catch(i=>{throw sd.delete(t),i});return sd.set(t,r),r}function YL(e){const t=new DOMParser().parseFromString(e,"text/html");return!!(t.querySelector(qL)||t.documentElement.hasAttribute("data-app-lab-tailwind")||t.body.hasAttribute("data-app-lab-tailwind"))}async function QL(e,t){const n=pM(),r=oM(e),i=ZL(e),o=XL(e),s=await JL(),a=document.createElement("iframe");a.setAttribute("aria-hidden","true"),a.setAttribute("sandbox","allow-scripts"),a.tabIndex=-1,a.style.cssText="position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;border:0;visibility:hidden;";try{return a.srcdoc=iM(n,r,i,o,s),document.body.appendChild(a),{compiledCss:await sM(a,n),compiledCssSourceHash:t}}finally{a.remove()}}async function JL(){return xv??(xv=WL(()=>import("./index.global-XoZzS87n.js"),[]).then(e=>e.default)),xv}function XL(e){return[...new DOMParser().parseFromString(e,"text/html").querySelectorAll(KL)].map(n=>n.textContent??"").join(`
`)}function ZL(e){const t=new Set;return eM(e,t),[...t].sort()}function eM(e,t){for(const n of e.matchAll(/["'`]([^"'`<>]*[-:/[\]().#%][^"'`<>]*)["'`]/g))for(const r of n[1].split(/\s+/)){const i=r.trim().replace(/,$/,"");tM(i)&&t.add(i)}}function tM(e){return nM(e)?/[-:/[\]().#%]/.test(e):!1}function nM(e){return!(!e||e.length>160||/[\s<>{};]/.test(e)||e.startsWith("http:")||e.startsWith("https:")||e.startsWith("data:")||e.startsWith("--"))}function rM(){return typeof navigator<"u"&&navigator.onLine===!1}function iM(e,t,n,r,i){const o=n.map(a=>`<div class="${dM(a)}"></div>`).join(""),s=r.trim()?r:"";return`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'">
    <style type="text/tailwindcss">${fM(s)}</style>
  </head>
  <body>
    ${t}
    ${o}
    <script>${aM(e)}<\/script>
    <script>${i.replaceAll("<\/script","<\\/script")}<\/script>
    <script>${lM(e)}<\/script>
  </body>
</html>`}function oM(e){const t=new DOMParser().parseFromString(e,"text/html"),n=t.body.cloneNode(!0);Sv(n);const r=t.createElement("div");r.hidden=!0,r.dataset.appLabCompilerTemplates="";for(const i of n.querySelectorAll("template")){const o=i.content.cloneNode(!0);Sv(o),r.append(o)}return n.append(r),n.innerHTML}function Sv(e){for(const n of[...e.querySelectorAll("script, iframe, object, embed, link, meta, base, style")])n.remove();const t=[];e instanceof Element&&t.push(e),t.push(...e.querySelectorAll("*"));for(const n of t)for(const r of[...n.attributes])r.name!=="class"&&n.removeAttribute(r.name)}async function sM(e,t){return new Promise((n,r)=>{const i=window.setTimeout(()=>{o(),r(new Error("Tailwind CSS compilation timed out."))},wS);function o(){window.clearTimeout(i),window.removeEventListener("message",s)}function s(a){if(!(a.source!==e.contentWindow||!uM(a.data,t))){if(o(),a.data.error){r(new Error(a.data.error));return}n(a.data.css)}}window.addEventListener("message",s)})}function aM(e){return`(function () {
  const compilerId = ${JSON.stringify(e)};
  function report(error) {
    parent.postMessage({
      type: "APP_LAB_TAILWIND_COMPILE_RESULT",
      compilerId,
      error: error && error.message ? error.message : String(error || "Tailwind CSS compilation failed.")
    }, "*");
  }
  window.addEventListener("error", (event) => report(event.error || event.message));
  window.addEventListener("unhandledrejection", (event) => report(event.reason));
})();`.replaceAll("<\/script","<\\/script")}function lM(e){return`(function () {
  const compilerId = ${JSON.stringify(e)};
  const startedAt = performance.now();
  function readCompiledCss() {
    const compiledStyles = Array.from(document.head.querySelectorAll("style"))
      .filter((style) => style.getAttribute("type") !== "text/tailwindcss")
      .map((style) => (style.textContent || "").trim())
      .filter(Boolean);
    if (compiledStyles.length > 0) {
      parent.postMessage({
        type: "APP_LAB_TAILWIND_COMPILE_RESULT",
        compilerId,
        css: compiledStyles.join("\\n")
      }, "*");
      return;
    }
    if (performance.now() - startedAt > ${wS}) {
      parent.postMessage({
        type: "APP_LAB_TAILWIND_COMPILE_RESULT",
        compilerId,
        error: "Tailwind CSS compilation timed out."
      }, "*");
      return;
    }
    setTimeout(readCompiledCss, 25);
  }
  readCompiledCss();
})();`.replaceAll("<\/script","<\\/script")}function uM(e,t){if(!e||typeof e!="object")return!1;const n=e;return n.type==="APP_LAB_TAILWIND_COMPILE_RESULT"&&n.compilerId===t&&(typeof n.css=="string"||typeof n.error=="string")}function cM(e,t,n){return new Promise((r,i)=>{const o=window.setTimeout(()=>i(new Error(n)),t);e.then(s=>{window.clearTimeout(o),r(s)},s=>{window.clearTimeout(o),i(s)})})}function dM(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function fM(e){return e.replaceAll("</style","<\\/style")}function pM(){return typeof crypto.randomUUID=="function"?crypto.randomUUID():`compiler_${Math.random().toString(36).slice(2)}`}async function hM(e){const t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(r=>r.toString(16).padStart(2,"0")).join("")}function Jf({children:e,status:t}){return h.jsx("div",{className:"fixed inset-x-0 bottom-0 z-40 border-t border-app-line bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur",children:h.jsxs("div",{className:"mx-auto flex w-full max-w-5xl flex-wrap items-center justify-end gap-3 px-4 py-3 md:pl-[228px]",children:[t&&t!=="Ready"?h.jsx("span",{className:"mr-auto min-w-0 flex-1 text-xs font-normal text-app-muted","aria-live":"polite",children:t}):null,h.jsx("div",{className:"flex flex-wrap justify-end gap-2",children:e})]})})}function _S({message:e}){return e?h.jsx("div",{className:"fixed bottom-20 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md bg-app-ink px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg",role:"status",children:e}):null}function mM({activeProfileId:e,onCreate:t,onDelete:n,onSelect:r,onUpdate:i,profiles:o}){const[s,a]=P.useState(e),l=P.useMemo(()=>o.find(_=>_.profileId===s)??o.find(_=>_.profileId===e)??o[0]??null,[e,o,s]),[u,d]=P.useState(()=>Ho(l)),[c,f]=P.useState(null),[p,m]=P.useState("Ready");P.useEffect(()=>{o.some(_=>_.profileId===e)&&a(e)},[e,o]),P.useEffect(()=>{l&&(a(l.profileId),d(Ho(l)))},[l]),P.useEffect(()=>{if(!c)return;const _=window.setTimeout(()=>f(null),3e3);return()=>window.clearTimeout(_)},[c]);async function w(_,A,R=(_==null?void 0:_.description)??""){m("Creating profile...");let O;try{O=await t({...Ho(_),description:R,name:A})}catch(E){m("Ready"),f(E instanceof Error?E.message:"Could not create profile.");return}a(O.profileId),d(Ho(O));try{await r(O.profileId),f("Profile created.")}catch{a(e),f("Profile created, but could not make it active.")}finally{m("Ready")}}async function C(_){a(_),m("Selecting profile...");try{await r(_),m("Ready")}catch(A){a(e),m("Ready"),f(A instanceof Error?A.message:"Could not select profile.")}}async function y(){if(!(!l||l.builtIn)){m("Saving profile...");try{const _=await i({profileId:l.profileId,...u});d(Ho(_)),m("Ready"),f("Profile saved.")}catch(_){m("Ready"),f(_ instanceof Error?_.message:"Could not save profile.")}}}async function v(){if(!l||l.builtIn||!window.confirm(`Delete the Builder profile "${l.name}"?`))return;m("Deleting profile...");const _=o.find(A=>A.profileId!==l.profileId)??null;try{await n(l.profileId)}catch(A){m("Ready"),f(A instanceof Error?A.message:"Could not delete profile.");return}a((_==null?void 0:_.profileId)??"");try{_&&await r(_.profileId),f("Profile deleted.")}catch{f("Profile deleted, but could not save the fallback selection.")}finally{m("Ready")}}if(!l)return h.jsx("p",{className:"text-sm text-app-muted",children:"No Builder profiles are available."});const g=l.builtIn,k=o.find(_=>_.profileId===Js)??o[0]??null,S=`w-full rounded-md border border-app-line px-3 py-2 font-normal text-app-ink outline-none focus:border-app-accent ${g?"bg-slate-50":"bg-white"}`;return h.jsxs("div",{className:"grid max-w-3xl gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h3",{className:"text-xl font-bold text-app-ink",children:"Builder profiles"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Choose the instructions and starter app BuilderAI can use."})]}),h.jsxs("section",{className:"grid gap-4","aria-labelledby":"profile-section-title",children:[h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"profile-section-title",children:"Profile"}),h.jsxs("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Profile actions",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>void w(k,"New profile",""),children:"New"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>void w(l,`${l.name} copy`),children:"Duplicate"}),h.jsx("button",{className:"min-h-9 rounded-md border border-transparent px-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-app-muted disabled:hover:bg-transparent",type:"button",disabled:g,title:g?"Built-in profiles cannot be deleted":"Delete profile",onClick:()=>void v(),children:"Delete"})]})]}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Active profile",h.jsx("select",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-normal text-app-ink outline-none focus:border-app-accent",value:l.profileId,onChange:_=>{C(_.target.value)},children:o.map(_=>h.jsxs("option",{value:_.profileId,children:[_.name,_.builtIn?" (Built-in)":""]},_.profileId))})]}),l.description?h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:l.description}):null]}),h.jsxs("section",{className:"grid gap-8 border-t border-app-line pt-6","aria-labelledby":"profile-details-title",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"profile-details-title",children:"Profile details"}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Profile name",h.jsx("input",{className:S,readOnly:g,type:"text",value:u.name,onChange:_=>d(A=>({...A,name:_.target.value}))})]}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Description",h.jsx("textarea",{className:`${S} min-h-24 resize-y text-sm leading-relaxed`,readOnly:g,value:u.description,onChange:_=>d(A=>({...A,description:_.target.value}))})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"instructions-section-title",children:[h.jsx("h5",{className:"text-base font-bold text-app-ink",id:"instructions-section-title",children:"Instructions"}),h.jsx("p",{className:"text-sm text-app-muted",children:"These instructions guide how BuilderAI plans changes and writes App Lab code."}),h.jsx("textarea",{"aria-label":"Builder instructions",className:`${S} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`,readOnly:g,spellCheck:!1,value:u.promptTemplate,onChange:_=>d(A=>({...A,promptTemplate:_.target.value}))})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"starter-section-title",children:[h.jsx("h5",{className:"text-base font-bold text-app-ink",id:"starter-section-title",children:"Starter app"}),h.jsx("p",{className:"text-sm text-app-muted",children:"This source becomes each new app created with the profile."}),h.jsx("textarea",{"aria-label":"Starter app source",className:`${S} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`,readOnly:g,spellCheck:!1,value:u.starterSource,onChange:_=>d(A=>({...A,starterSource:_.target.value}))})]})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"fixed-tools-section-title",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"fixed-tools-section-title",children:"Fixed tools"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Every profile can use these App Lab tools; profiles change the guidance, not the capabilities."}),h.jsx("ul",{className:"grid gap-2 text-sm font-normal text-app-muted",children:mC.map(_=>h.jsxs("li",{className:"grid gap-0.5",children:[h.jsx("code",{className:"break-all font-semibold text-app-ink",children:_.name}),h.jsx("span",{children:_.description.replace(/\.$/,"")})]},_.name))})]}),g?null:h.jsx(Jf,{status:p,children:h.jsx("button",{className:"min-h-9 rounded-md bg-app-accent px-3 text-sm font-semibold text-white hover:bg-app-strong",type:"button",onClick:()=>void y(),children:"Save profile"})}),h.jsx(_S,{message:c})]})}function Ho(e){return{description:(e==null?void 0:e.description)??"",name:(e==null?void 0:e.name)??"",promptTemplate:(e==null?void 0:e.promptTemplate)??"",starterSource:(e==null?void 0:e.starterSource)??""}}function gM({aiConfig:e,builderPreferences:t,builderProfiles:n,initialAiTab:r,initialSection:i,isOpen:o,onClearAiConfig:s,onClearStorageProfile:a,onClose:l,onConfigureStorageProfile:u,onCreateBuilderProfile:d,onDeleteBuilderProfile:c,onExportWorkspaceRecovery:f,onRestoreWorkspaceRecovery:p,onSaveAiConfig:m,onSaveBuilderPreferences:w,onTestAiConnection:C,onUpdateBuilderProfile:y,storageProfile:v}){const[g,k]=P.useState(""),[S,_]=P.useState(""),[A,R]=P.useState("connection"),[O,E]=P.useState("Ready"),[D,z]=P.useState("storage"),[K,Z]=P.useState("setup"),[te,ve]=P.useState(""),[xe,B]=P.useState(()=>Qb()),[q,x]=P.useState(""),[re,ce]=P.useState(""),[I,ke]=P.useState(wM),[Me,de]=P.useState(!1),[Ue,we]=P.useState(null),[Ke,Ae]=P.useState(""),[mt,Te]=P.useState(""),[Sn,pe]=P.useState("Ready"),[Vt,He]=P.useState("firebase"),[Je,In]=P.useState(()=>Av()),Nt=P.useRef(!1);P.useEffect(()=>{k(e.apiKey),_(e.model)},[e]),P.useEffect(()=>{ve((v==null?void 0:v.displayName)??""),ce((v==null?void 0:v.databaseUrl)??""),x(v?JSON.stringify(v.firebaseConfig,null,2):""),v!=null&&v.ownerSetupSecret&&B(v.ownerSetupSecret)},[v]),P.useEffect(()=>{if(typeof window.matchMedia!="function")return;const j=window.matchMedia("(max-width: 767px)"),ne=Xt=>ke(Xt.matches);return ke(j.matches),j.addEventListener("change",ne),()=>j.removeEventListener("change",ne)},[]),P.useEffect(()=>{if(!Ue)return;const j=window.setTimeout(()=>we(null),3e3);return()=>window.clearTimeout(j)},[Ue]),P.useEffect(()=>{if(!o){Nt.current=!1;return}Nt.current||(Nt.current=!0,i&&z(i),r&&R(r),de(!!i),we(null),Ae(""),Te(""),pe("Ready"),E("Ready"),He(v?"connect":"firebase"),In(Av()))},[r,i,o,v]);const Xe=QC(xe);if(!o)return null;async function ln(){pe("Saving storage profile...");try{await u({accessModel:"auth-v1",databaseUrl:re,displayName:te,firebaseConfigText:q,ownerSetupSecret:xe}),pe("Ready"),we("Storage profile saved. Existing owned apps now have stable sync rooms.")}catch(j){pe(j instanceof Error?j.message:"Could not save storage profile.")}}async function _e(){pe("Saving AI configuration...");try{const j=await m({apiKey:g,model:S});k(j.apiKey),_(j.model),pe("Ready"),we("AI configuration saved in this browser.")}catch(j){pe(j instanceof Error?j.message:"Could not save AI configuration.")}}async function qr(){pe("Testing OpenRouter key and model...");try{const j=await C({apiKey:g,model:S}),ne=j.keyLabel?` using ${j.keyLabel}`:"";pe(`Connected to ${j.modelName}${ne}.`)}catch(j){pe(j instanceof Error?j.message:"Could not connect to OpenRouter.")}}async function Kr(j){E("Saving...");try{await w({...t,conversationMemory:j}),E("Saved")}catch(ne){E(ne instanceof Error?ne.message:"Could not save.")}}async function sr(j){await w({...t,activeProfileId:j})}async function b(){if(window.confirm("Remove the OpenRouter API key and model from this browser?")){pe("Removing AI configuration...");try{await s(),k(""),_(""),pe("Ready"),we("AI configuration removed from this browser.")}catch(j){pe(j instanceof Error?j.message:"Could not remove AI configuration.")}}}async function T(){var j;try{await((j=navigator.clipboard)==null?void 0:j.writeText(Xe)),pe("Ready"),we("Firebase rules copied.")}catch{pe("Could not copy rules. Select the rules text and copy it manually.")}}function N(j){In(ne=>({...ne,[j]:!ne[j]}))}function M(j){z(j),we(null),pe("Ready")}function H(j){R(j),we(null),pe("Ready")}function fe(j){Z(j),we(null),pe("Ready")}async function he(){if(window.confirm("Remove this storage profile from this browser? Existing app sync room references stay in the workspace metadata.")){pe("Removing storage profile...");try{await a(),pe("Ready"),we("Storage profile removed from this browser.")}catch(j){pe(j instanceof Error?j.message:"Could not remove storage profile.")}}}async function ee(){var j;pe("Saving encrypted workspace manifest...");try{const ne=await f();Ae(ne),pe("Sync material ready. Treat it like a password."),(j=navigator.clipboard)==null||j.writeText(ne).catch(()=>{})}catch(ne){pe(ne instanceof Error?ne.message:"Could not generate sync material.")}}async function ie(){if(mt.trim()){if(v){pe("This browser already has a storage profile. Remove the current profile in First-time setup before syncing this device.");return}pe("Restoring workspace manifest...");try{await p(mt),pe("Workspace synced. Apps are being hydrated from their rooms.")}catch(j){pe(j instanceof Error?j.message:"Could not sync this device.")}}}return h.jsx("div",{className:"fixed inset-0 z-30 bg-app-surface",role:"presentation",children:h.jsxs("section",{className:"grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden",role:"dialog","aria-modal":"true","aria-labelledby":"settings-title",children:[h.jsx("header",{className:"border-b border-app-line bg-white/90",children:h.jsxs("div",{className:"mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3",children:[h.jsx("button",{"aria-label":I&&Me?"Back to Settings":void 0,className:`min-h-9 rounded-md border border-app-line bg-white text-sm font-extrabold text-app-ink hover:border-app-accent ${I&&Me?"w-9 px-0 text-lg":"px-3"}`,type:"button",onClick:()=>{if(I&&Me){de(!1),we(null),pe("Ready");return}l()},children:I&&Me?"←":"← Back"}),h.jsx("h2",{className:"truncate text-xl font-bold leading-tight text-app-ink",id:"settings-title",children:"Settings"})]})}),h.jsx("div",{className:"min-h-0 overflow-auto pb-24",children:I&&!Me?h.jsx(yM,{onOpen:j=>{M(j),de(!0)}}):h.jsxs("div",{className:`mx-auto grid w-full max-w-5xl px-4 py-5 ${I?"grid-cols-1":"min-h-full grid-cols-[180px_minmax(0,1fr)] gap-8"}`,children:[I?null:h.jsxs("nav",{className:"grid content-start border-r border-app-line pr-4","aria-label":"Settings sections",children:[h.jsx(Ev,{active:D==="storage",label:"Storage",onClick:()=>M("storage")}),h.jsx(Ev,{active:D==="ai",label:"AI",onClick:()=>M("ai")})]}),h.jsx("div",{className:"min-w-0",children:D==="ai"?h.jsxs("div",{className:"grid gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h2",{className:"text-2xl font-bold text-app-ink",children:"AI"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Connect a model and configure how BuilderAI works."})]}),h.jsxs("nav",{className:"flex gap-6 border-b border-app-line","aria-label":"AI settings",children:[h.jsx(qa,{active:A==="connection",label:"Connection",onClick:()=>H("connection")}),h.jsx(qa,{active:A==="agent",label:"AI Agent",onClick:()=>H("agent")})]}),A==="connection"?h.jsxs("form",{className:"grid max-w-3xl gap-5",onSubmit:j=>{j.preventDefault(),_e()},children:[h.jsxs("div",{className:"grid gap-2 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{children:"Connect OpenRouter to use BuilderAI. The API key is stored only in this browser and sent to OpenRouter to authenticate requests. It is never included in workspace sync or app invites."}),h.jsx("p",{children:"App source and conversation context are sent to the selected model only when you submit a BuilderAI request."})]}),h.jsxs("ol",{className:"grid gap-3 text-sm leading-relaxed text-app-muted",children:[h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"1"}),h.jsxs("span",{children:["Create an API key in"," ",h.jsx("a",{className:"font-extrabold text-app-accent underline",href:"https://openrouter.ai/settings/keys",target:"_blank",rel:"noreferrer",children:"OpenRouter"}),"."]})]}),h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"2"}),h.jsxs("span",{children:["Choose a model id from the"," ",h.jsx("a",{className:"font-extrabold text-app-accent underline",href:"https://openrouter.ai/models?supported_parameters=tools",target:"_blank",rel:"noreferrer",children:"tool-capable models"}),"."]})]}),h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"3"}),h.jsx("span",{children:"Paste both values below, test the connection, and save them locally."})]})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["OpenRouter API key",h.jsx("input",{autoComplete:"off",className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",onChange:j=>k(j.target.value),placeholder:"sk-or-v1-...",type:"password",value:g})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Model id",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",onChange:j=>_(j.target.value),placeholder:"provider/model-name",type:"text",value:S})]}),h.jsxs(Jf,{status:Sn,children:[e.apiKey||e.model?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void b(),children:"Remove"}):null,h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:opacity-50",disabled:!g.trim()||!S.trim(),type:"button",onClick:()=>void qr(),children:"Test connection"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-4 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50",disabled:!g.trim()||!S.trim(),type:"submit",children:"Save AI configuration"})]})]}):h.jsxs("div",{className:"grid max-w-3xl gap-8",children:[h.jsxs("section",{className:"grid gap-4 border-b border-app-line pb-6","aria-labelledby":"global-ai-settings-title",children:[h.jsx("h3",{className:"text-xl font-bold text-app-ink",id:"global-ai-settings-title",children:"Global settings"}),h.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",children:[h.jsxs("div",{className:"grid gap-1",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",children:"Conversation memory"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Recent messages sent with each request."})]}),h.jsxs("div",{className:"grid justify-items-end gap-1",children:[h.jsx("select",{"aria-label":"Conversation memory",className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent",value:t.conversationMemory,onChange:j=>void Kr(j.target.value),children:["short","medium","long"].map(j=>h.jsx("option",{value:j,children:vM(j)},j))}),h.jsx("span",{className:"min-h-4 text-xs font-normal text-app-muted","aria-live":"polite",children:O==="Ready"?"":O})]})]})]}),h.jsx(mM,{activeProfileId:t.activeProfileId,profiles:n,onCreate:d,onDelete:c,onSelect:sr,onUpdate:y})]})]}):h.jsxs("div",{className:"grid gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h2",{className:"text-2xl font-bold text-app-ink",children:"Storage and sync"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Connect storage for backup, sharing, and cross-device sync."})]}),h.jsxs("nav",{className:"flex gap-6 border-b border-app-line","aria-label":"Storage settings",children:[h.jsx(qa,{active:K==="setup",label:"First-time setup",onClick:()=>fe("setup")}),h.jsx(qa,{active:K==="sync",label:"Sync device",onClick:()=>fe("sync")})]}),K==="setup"?h.jsxs("div",{className:"grid gap-4",children:[h.jsxs("div",{className:"grid gap-2 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{children:"Connect your own Firebase Realtime Database to back up this browser's apps, restore them on another device, and create app invite links. Complete the security setup in step 2 to protect your storage."}),v?h.jsxs("p",{className:"break-all rounded-md bg-emerald-50 px-3 py-2 font-mono text-xs font-bold text-emerald-800",children:["Connected to ",v.databaseUrl]}):null]}),h.jsxs("div",{className:"divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white",children:[h.jsxs(ad,{id:"firebase",number:"1",title:"Create Firebase",description:"Create the Firebase account, project, and Realtime Database.",open:Vt==="firebase",onOpenChange:He,children:[h.jsx(ur,{checked:Je["create-account"],stepNumber:"a",label:"Create or sign in to Firebase",detail:"Use the Google account that should own this sync storage.",onChange:()=>N("create-account")}),h.jsx(ur,{checked:Je["create-project"],stepNumber:"b",label:"Create a Firebase project",detail:"A plain project is enough; App Lab only needs the web app config and Realtime Database.",onChange:()=>N("create-project")}),h.jsx(ur,{checked:Je["create-database"],stepNumber:"c",label:"Create Realtime Database",detail:"Pick a region, create the database, and leave this screen open before copying details.",onChange:()=>N("create-database")})]}),h.jsxs(ad,{id:"security",number:"2",title:"Set Security",description:"Enable anonymous users and publish the rules before App Lab connects.",open:Vt==="security",onOpenChange:He,children:[h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"App Lab uses authenticated room claims for new Firebase setups. That prevents invite recipients from creating unrelated App Lab rooms in your database."}),h.jsx(ur,{checked:Je["enable-auth"],stepNumber:"a",label:"Enable Anonymous Auth",detail:"In Firebase Authentication, add Anonymous as a sign-in provider.",onChange:()=>N("enable-auth")}),h.jsx(ur,{checked:Je["paste-rules"],stepNumber:"b",label:"Publish these Realtime Database rules",detail:"They let you create rooms and let invited people claim only the rooms in an invite.",onChange:()=>N("paste-rules"),children:h.jsxs("div",{className:"grid gap-2",children:[h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Rules"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-xs font-extrabold text-app-ink hover:border-app-accent",type:"button",onClick:T,children:"Copy rules"})]}),h.jsx("pre",{className:"max-h-72 overflow-auto rounded-md border border-app-line bg-slate-50 p-3 text-xs leading-relaxed text-app-ink",children:Xe})]})})]}),h.jsxs(ad,{id:"connect",number:"3",title:"Connect App Lab",description:"Paste the web app config and database URL, then save.",open:Vt==="connect",onOpenChange:He,children:[h.jsxs(ur,{checked:Je["copy-config"],stepNumber:"a",label:"Copy web app config object",detail:"Use the config object from Project settings. Authenticated setup requires the apiKey field.",onChange:()=>N("copy-config"),children:[h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Display name",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent",value:te,onChange:j=>ve(j.target.value),placeholder:"My Firebase project"})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Firebase web app config",h.jsx("textarea",{className:"min-h-28 resize-y rounded-md border border-app-line bg-white px-3 py-2 font-mono text-xs text-app-ink outline-none focus:border-app-accent",value:q,onChange:j=>x(j.target.value),placeholder:`const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "..."
};`})]})]}),h.jsx(ur,{checked:Je["copy-url"],stepNumber:"b",label:"Copy the Realtime Database URL",detail:"Use the database URL from Realtime Database, not a Storage bucket URL.",onChange:()=>N("copy-url"),children:h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Firebase Realtime Database URL",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",value:re,onChange:j=>ce(j.target.value),placeholder:"https://your-project.region.firebasedatabase.app"})]})}),h.jsx(ur,{checked:Je.sync,stepNumber:"c",label:"Ready to connect and sync",detail:"Saving the profile backs up existing local apps to the selected Firebase project.",onChange:()=>N("sync")})]})]}),h.jsxs(Jf,{status:Sn,children:[v?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:he,children:"Remove profile"}):null,h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!re.trim(),onClick:ln,children:"Save storage profile"})]})]}):h.jsxs("div",{className:"grid gap-4",children:[h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"Sync device is for moving the whole workspace to another browser or device. Generate sync material on a device that already has this workspace, then paste it on the device you want to sync with."}),h.jsxs("div",{className:"divide-y divide-app-line",children:[h.jsxs(Cv,{number:"1",title:"Generate sync material",description:"Use this on the device that already has the workspace you want to sync.",children:[h.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs outline-none focus:border-app-accent",readOnly:!0,placeholder:"Generated workspace sync material will appear here.",value:Ke}),h.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!v,onClick:ee,children:"Generate sync material"})]}),h.jsxs(Cv,{number:"2",title:"Paste sync material",description:"Use this on the device or browser you want to sync with the existing workspace.",children:[h.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent",placeholder:"Paste workspace sync material",value:mt,onChange:j=>Te(j.target.value)}),h.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!mt.trim(),onClick:ie,children:"Sync this device"})]})]}),Sn!=="Ready"?h.jsx("span",{className:"text-xs font-normal text-app-muted",children:Sn}):null]})]})})]})}),h.jsx(_S,{message:Ue})]})})}function yM({onOpen:e}){return h.jsxs("nav",{className:"mx-auto w-full max-w-5xl divide-y divide-app-line border-y border-app-line","aria-label":"Settings sections",children:[h.jsx(Iv,{description:"Back up apps, share them, and sync this workspace.",label:"Storage and sync",onClick:()=>e("storage")}),h.jsx(Iv,{description:"Connect a model and configure how BuilderAI works.",label:"AI",onClick:()=>e("ai")})]})}function Iv({description:e,label:t,onClick:n}){return h.jsxs("button",{className:"grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 bg-white px-4 py-4 text-left hover:bg-slate-50",type:"button",onClick:n,children:[h.jsxs("span",{className:"grid gap-1",children:[h.jsx("span",{className:"text-base font-bold text-app-ink",children:t}),h.jsx("span",{className:"text-sm text-app-muted",children:e})]}),h.jsx("span",{className:"text-xl text-app-muted","aria-hidden":"true",children:"›"})]})}function Ev({active:e,label:t,onClick:n}){return h.jsx("button",{"aria-current":e?"page":void 0,className:`min-h-10 border-b-2 px-3 text-left text-sm font-semibold md:border-b-0 md:border-l-2 ${e?"border-app-accent bg-app-accent/5 text-app-ink":"border-transparent text-app-muted hover:bg-slate-100 hover:text-app-ink"}`,type:"button",onClick:n,children:t})}function qa({active:e,label:t,onClick:n}){return h.jsx("button",{"aria-current":e?"page":void 0,className:`-mb-px min-h-10 border-b-2 px-0 text-sm font-semibold ${e?"border-app-ink text-app-ink":"border-transparent text-app-muted hover:text-app-ink"}`,type:"button",onClick:n,children:t})}function vM(e){return`${`${e.charAt(0).toUpperCase()}${e.slice(1)}`} (${Wb[e]})`}function ad({children:e,description:t,id:n,number:r,onOpenChange:i,open:o,title:s}){return h.jsxs("section",{children:[h.jsxs("button",{className:"grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-app-accent/5",type:"button","aria-expanded":o,onClick:()=>i(o?null:n),children:[h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block text-sm font-extrabold text-app-ink",children:`${r}. ${s}`}),h.jsx("span",{className:"block text-sm leading-relaxed text-app-muted",children:t})]}),h.jsx("span",{className:"text-xl leading-none text-app-muted","aria-hidden":"true",children:o?"−":"+"})]}),o?h.jsx("div",{className:"grid gap-4 px-4 pb-4",children:e}):null]})}function ur({checked:e,children:t,detail:n,label:r,onChange:i,stepNumber:o}){return h.jsxs("div",{className:"grid grid-cols-[2rem_minmax(0,1fr)_2.25rem] gap-4 border-t border-app-line py-4 text-sm leading-relaxed first:border-t-0 first:pt-0",children:[h.jsx("span",{className:"pt-0.5 font-mono text-xs font-extrabold text-app-muted",children:o}),h.jsxs("div",{className:"grid min-w-0 gap-3",children:[h.jsxs("span",{className:"grid gap-1",children:[h.jsx("span",{className:`block font-extrabold ${e?"text-app-muted line-through decoration-2":"text-app-ink"}`,children:r}),h.jsx("span",{className:`block ${e?"text-app-muted/80 line-through":"text-app-muted"}`,children:n})]}),t?h.jsx("div",{className:"grid gap-3",children:t}):null]}),h.jsxs("label",{className:"grid h-8 min-h-8 w-8 cursor-pointer place-items-center self-center justify-self-end",title:r,children:[h.jsx("input",{"aria-label":r,className:"peer sr-only",type:"checkbox",checked:e,onChange:i}),h.jsx("span",{className:"grid h-5 min-h-5 w-5 place-items-center rounded-full border-2 border-app-line text-[11px] font-extrabold leading-none text-white peer-checked:border-app-accent peer-checked:bg-app-accent",children:e?"✓":""})]})]})}function Cv({children:e,description:t,number:n,title:r}){return h.jsx("section",{className:"grid gap-3 py-5 text-sm leading-relaxed",children:h.jsxs("div",{className:"grid min-w-0 gap-3",children:[h.jsxs("div",{className:"grid gap-1",children:[h.jsx("h3",{className:"font-extrabold text-app-ink",children:`${n}. ${r}`}),h.jsx("p",{className:"text-app-muted",children:t})]}),h.jsx("div",{className:"grid gap-3",children:e})]})})}function Av(){return{"copy-config":!1,"copy-url":!1,"create-account":!1,"create-database":!1,"create-project":!1,"enable-auth":!1,"paste-rules":!1,sync:!1}}function wM(){return typeof window>"u"?!1:typeof window.matchMedia=="function"?window.matchMedia("(max-width: 767px)").matches:window.innerWidth<=767}function _M(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const bM=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,xM=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,kM={};function Tv(e,t){return(kM.jsx?xM:bM).test(e)}const SM=/[ \t\n\f\r]/g;function IM(e){return typeof e=="object"?e.type==="text"?Rv(e.value):!1:Rv(e)}function Rv(e){return e.replace(SM,"")===""}class ya{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}ya.prototype.normal={};ya.prototype.property={};ya.prototype.space=void 0;function bS(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new ya(n,r,t)}function Xf(e){return e.toLowerCase()}class Bt{constructor(t,n){this.attribute=n,this.property=t}}Bt.prototype.attribute="";Bt.prototype.booleanish=!1;Bt.prototype.boolean=!1;Bt.prototype.commaOrSpaceSeparated=!1;Bt.prototype.commaSeparated=!1;Bt.prototype.defined=!1;Bt.prototype.mustUseProperty=!1;Bt.prototype.number=!1;Bt.prototype.overloadedBoolean=!1;Bt.prototype.property="";Bt.prototype.spaceSeparated=!1;Bt.prototype.space=void 0;let EM=0;const X=Ai(),Ye=Ai(),Zf=Ai(),U=Ai(),Ie=Ai(),ci=Ai(),$t=Ai();function Ai(){return 2**++EM}const ep=Object.freeze(Object.defineProperty({__proto__:null,boolean:X,booleanish:Ye,commaOrSpaceSeparated:$t,commaSeparated:ci,number:U,overloadedBoolean:Zf,spaceSeparated:Ie},Symbol.toStringTag,{value:"Module"})),ld=Object.keys(ep);class cm extends Bt{constructor(t,n,r,i){let o=-1;if(super(t,n),Nv(this,"space",i),typeof r=="number")for(;++o<ld.length;){const s=ld[o];Nv(this,ld[o],(r&ep[s])===ep[s])}}}cm.prototype.defined=!0;function Nv(e,t,n){n&&(e[t]=n)}function Co(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const o=new cm(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),t[r]=o,n[Xf(r)]=r,n[Xf(o.attribute)]=r}return new ya(t,n,e.space)}const xS=Co({properties:{ariaActiveDescendant:null,ariaAtomic:Ye,ariaAutoComplete:null,ariaBusy:Ye,ariaChecked:Ye,ariaColCount:U,ariaColIndex:U,ariaColSpan:U,ariaControls:Ie,ariaCurrent:null,ariaDescribedBy:Ie,ariaDetails:null,ariaDisabled:Ye,ariaDropEffect:Ie,ariaErrorMessage:null,ariaExpanded:Ye,ariaFlowTo:Ie,ariaGrabbed:Ye,ariaHasPopup:null,ariaHidden:Ye,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ie,ariaLevel:U,ariaLive:null,ariaModal:Ye,ariaMultiLine:Ye,ariaMultiSelectable:Ye,ariaOrientation:null,ariaOwns:Ie,ariaPlaceholder:null,ariaPosInSet:U,ariaPressed:Ye,ariaReadOnly:Ye,ariaRelevant:null,ariaRequired:Ye,ariaRoleDescription:Ie,ariaRowCount:U,ariaRowIndex:U,ariaRowSpan:U,ariaSelected:Ye,ariaSetSize:U,ariaSort:null,ariaValueMax:U,ariaValueMin:U,ariaValueNow:U,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function kS(e,t){return t in e?e[t]:t}function SS(e,t){return kS(e,t.toLowerCase())}const CM=Co({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:ci,acceptCharset:Ie,accessKey:Ie,action:null,allow:null,allowFullScreen:X,allowPaymentRequest:X,allowUserMedia:X,alpha:X,alt:null,as:null,async:X,autoCapitalize:null,autoComplete:Ie,autoFocus:X,autoPlay:X,blocking:Ie,capture:null,charSet:null,checked:X,cite:null,className:Ie,closedBy:null,colorSpace:null,cols:U,colSpan:U,command:null,commandFor:null,content:null,contentEditable:Ye,controls:X,controlsList:Ie,coords:U|ci,crossOrigin:null,data:null,dateTime:null,decoding:null,default:X,defer:X,dir:null,dirName:null,disabled:X,download:Zf,draggable:Ye,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:X,formTarget:null,headers:Ie,height:U,hidden:Zf,high:U,href:null,hrefLang:null,htmlFor:Ie,httpEquiv:Ie,id:null,imageSizes:null,imageSrcSet:null,inert:X,inputMode:null,integrity:null,is:null,isMap:X,itemId:null,itemProp:Ie,itemRef:Ie,itemScope:X,itemType:Ie,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:X,low:U,manifest:null,max:null,maxLength:U,media:null,method:null,min:null,minLength:U,multiple:X,muted:X,name:null,nonce:null,noModule:X,noValidate:X,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:X,optimum:U,pattern:null,ping:Ie,placeholder:null,playsInline:X,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:X,referrerPolicy:null,rel:Ie,required:X,reversed:X,rows:U,rowSpan:U,sandbox:Ie,scope:null,scoped:X,seamless:X,selected:X,shadowRootClonable:X,shadowRootCustomElementRegistry:X,shadowRootDelegatesFocus:X,shadowRootMode:null,shadowRootSerializable:X,shape:null,size:U,sizes:null,slot:null,span:U,spellCheck:Ye,src:null,srcDoc:null,srcLang:null,srcSet:null,start:U,step:null,style:null,tabIndex:U,target:null,title:null,translate:null,type:null,typeMustMatch:X,useMap:null,value:Ye,width:U,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ie,axis:null,background:null,bgColor:null,border:U,borderColor:null,bottomMargin:U,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:X,declare:X,event:null,face:null,frame:null,frameBorder:null,hSpace:U,leftMargin:U,link:null,longDesc:null,lowSrc:null,marginHeight:U,marginWidth:U,noResize:X,noHref:X,noShade:X,noWrap:X,object:null,profile:null,prompt:null,rev:null,rightMargin:U,rules:null,scheme:null,scrolling:Ye,standby:null,summary:null,text:null,topMargin:U,valueType:null,version:null,vAlign:null,vLink:null,vSpace:U,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:X,disablePictureInPicture:X,disableRemotePlayback:X,exportParts:ci,part:Ie,prefix:null,property:null,results:U,security:null,unselectable:null},space:"html",transform:SS}),AM=Co({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",maskType:"mask-type",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:$t,accentHeight:U,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:U,amplitude:U,arabicForm:null,ascent:U,attributeName:null,attributeType:null,azimuth:U,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:U,by:null,calcMode:null,capHeight:U,className:Ie,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:U,diffuseConstant:U,direction:null,display:null,dur:null,divisor:U,dominantBaseline:null,download:X,dx:null,dy:null,edgeMode:null,editable:null,elevation:U,enableBackground:null,end:null,event:null,exponent:U,externalResourcesRequired:null,fill:null,fillOpacity:U,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:ci,g2:ci,glyphName:ci,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:U,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:U,horizOriginX:U,horizOriginY:U,id:null,ideographic:U,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:U,k:U,k1:U,k2:U,k3:U,k4:U,kernelMatrix:$t,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:U,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:U,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:U,overlineThickness:U,paintOrder:null,panose1:null,path:null,pathLength:U,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ie,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:U,pointsAtY:U,pointsAtZ:U,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:$t,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:$t,rev:$t,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:$t,requiredFeatures:$t,requiredFonts:$t,requiredFormats:$t,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:U,specularExponent:U,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:U,strikethroughThickness:U,string:null,stroke:null,strokeDashArray:$t,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:U,strokeOpacity:U,strokeWidth:null,style:null,surfaceScale:U,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:$t,tabIndex:U,tableValues:null,target:null,targetX:U,targetY:U,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:$t,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:U,underlineThickness:U,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:U,values:null,vAlphabetic:U,vMathematical:U,vectorEffect:null,vHanging:U,vIdeographic:U,version:null,vertAdvY:U,vertOriginX:U,vertOriginY:U,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:U,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:kS}),IS=Co({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),ES=Co({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:SS}),CS=Co({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),TM={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},RM=/[A-Z]/g,Pv=/-[a-z]/g,NM=/^data[-\w.:]+$/i;function PM(e,t){const n=Xf(t);let r=t,i=Bt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&NM.test(t)){if(t.charAt(4)==="-"){const o=t.slice(5).replace(Pv,OM);r="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=t.slice(4);if(!Pv.test(o)){let s=o.replace(RM,DM);s.charAt(0)!=="-"&&(s="-"+s),t="data"+s}}i=cm}return new i(r,t)}function DM(e){return"-"+e.toLowerCase()}function OM(e){return e.charAt(1).toUpperCase()}const LM=bS([xS,CM,IS,ES,CS],"html"),dm=bS([xS,AM,IS,ES,CS],"svg");function MM(e){return e.join(" ").trim()}var fm={},Dv=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,jM=/\n/g,FM=/^\s*/,UM=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,zM=/^:\s*/,BM=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,VM=/^[;\s]*/,$M=/^\s+|\s+$/g,HM=`
`,Ov="/",Lv="*",ei="",WM="comment",qM="declaration";function KM(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(m){var w=m.match(jM);w&&(n+=w.length);var C=m.lastIndexOf(HM);r=~C?m.length-C:r+m.length}function o(){var m={line:n,column:r};return function(w){return w.position=new s(m),u(),w}}function s(m){this.start=m,this.end={line:n,column:r},this.source=t.source}s.prototype.content=e;function a(m){var w=new Error(t.source+":"+n+":"+r+": "+m);if(w.reason=m,w.filename=t.source,w.line=n,w.column=r,w.source=e,!t.silent)throw w}function l(m){var w=m.exec(e);if(w){var C=w[0];return i(C),e=e.slice(C.length),w}}function u(){l(FM)}function d(m){var w;for(m=m||[];w=c();)w!==!1&&m.push(w);return m}function c(){var m=o();if(!(Ov!=e.charAt(0)||Lv!=e.charAt(1))){for(var w=2;ei!=e.charAt(w)&&(Lv!=e.charAt(w)||Ov!=e.charAt(w+1));)++w;if(w+=2,ei===e.charAt(w-1))return a("End of comment missing");var C=e.slice(2,w-2);return r+=2,i(C),e=e.slice(w),r+=2,m({type:WM,comment:C})}}function f(){var m=o(),w=l(UM);if(w){if(c(),!l(zM))return a("property missing ':'");var C=l(BM),y=m({type:qM,property:Mv(w[0].replace(Dv,ei)),value:C?Mv(C[0].replace(Dv,ei)):ei});return l(VM),y}}function p(){var m=[];d(m);for(var w;w=f();)w!==!1&&(m.push(w),d(m));return m}return u(),p()}function Mv(e){return e?e.replace($M,ei):ei}var GM=KM,YM=wl&&wl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(fm,"__esModule",{value:!0});fm.default=JM;const QM=YM(GM);function JM(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,QM.default)(e),i=typeof t=="function";return r.forEach(o=>{if(o.type!=="declaration")return;const{property:s,value:a}=o;i?t(s,a,o):a&&(n=n||{},n[s]=a)}),n}var nc={};Object.defineProperty(nc,"__esModule",{value:!0});nc.camelCase=void 0;var XM=/^--[a-zA-Z0-9_-]+$/,ZM=/-([a-z])/g,ej=/^[^-]+$/,tj=/^-(webkit|moz|ms|o|khtml)-/,nj=/^-(ms)-/,rj=function(e){return!e||ej.test(e)||XM.test(e)},ij=function(e,t){return t.toUpperCase()},jv=function(e,t){return"".concat(t,"-")},oj=function(e,t){return t===void 0&&(t={}),rj(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(nj,jv):e=e.replace(tj,jv),e.replace(ZM,ij))};nc.camelCase=oj;var sj=wl&&wl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},aj=sj(fm),lj=nc;function tp(e,t){var n={};return!e||typeof e!="string"||(0,aj.default)(e,function(r,i){r&&i&&(n[(0,lj.camelCase)(r,t)]=i)}),n}tp.default=tp;var uj=tp;const cj=dp(uj),AS=TS("end"),pm=TS("start");function TS(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function dj(e){const t=pm(e),n=AS(e);if(t&&n)return{start:t,end:n}}function fs(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Fv(e.position):"start"in e||"end"in e?Fv(e):"line"in e||"column"in e?np(e):""}function np(e){return Uv(e&&e.line)+":"+Uv(e&&e.column)}function Fv(e){return np(e&&e.start)+"-"+np(e&&e.end)}function Uv(e){return e&&typeof e=="number"?e:1}class xt extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",o={},s=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof t=="string"?i=t:!o.cause&&t&&(s=!0,i=t.message,o.cause=t),!o.ruleId&&!o.source&&typeof r=="string"){const l=r.indexOf(":");l===-1?o.ruleId=r:(o.source=r.slice(0,l),o.ruleId=r.slice(l+1))}if(!o.place&&o.ancestors&&o.ancestors){const l=o.ancestors[o.ancestors.length-1];l&&(o.place=l.position)}const a=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=a?a.line:void 0,this.name=fs(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=s&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}xt.prototype.file="";xt.prototype.name="";xt.prototype.reason="";xt.prototype.message="";xt.prototype.stack="";xt.prototype.column=void 0;xt.prototype.line=void 0;xt.prototype.ancestors=void 0;xt.prototype.cause=void 0;xt.prototype.fatal=void 0;xt.prototype.place=void 0;xt.prototype.ruleId=void 0;xt.prototype.source=void 0;const hm={}.hasOwnProperty,fj=new Map,pj=/[A-Z]/g,hj=new Set(["table","tbody","thead","tfoot","tr"]),mj=new Set(["td","th"]),RS="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function gj(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=Sj(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=kj(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?dm:LM,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},o=NS(i,e,void 0);return o&&typeof o!="string"?o:i.create(e,i.Fragment,{children:o||void 0},void 0)}function NS(e,t,n){if(t.type==="element")return yj(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return vj(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return _j(e,t,n);if(t.type==="mdxjsEsm")return wj(e,t);if(t.type==="root")return bj(e,t,n);if(t.type==="text")return xj(e,t)}function yj(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=dm,e.schema=i),e.ancestors.push(t);const o=DS(e,t.tagName,!1),s=Ij(e,t);let a=gm(e,t);return hj.has(t.tagName)&&(a=a.filter(function(l){return typeof l=="string"?!IM(l):!0})),PS(e,s,o,t),mm(s,a),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function vj(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}Hs(e,t.position)}function wj(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Hs(e,t.position)}function _j(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=dm,e.schema=i),e.ancestors.push(t);const o=t.name===null?e.Fragment:DS(e,t.name,!0),s=Ej(e,t),a=gm(e,t);return PS(e,s,o,t),mm(s,a),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function bj(e,t,n){const r={};return mm(r,gm(e,t)),e.create(t,e.Fragment,r,n)}function xj(e,t){return t.value}function PS(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function mm(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function kj(e,t,n){return r;function r(i,o,s,a){const u=Array.isArray(s.children)?n:t;return a?u(o,s,a):u(o,s)}}function Sj(e,t){return n;function n(r,i,o,s){const a=Array.isArray(o.children),l=pm(r);return t(i,o,s,a,{columnNumber:l?l.column-1:void 0,fileName:e,lineNumber:l?l.line:void 0},void 0)}}function Ij(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&hm.call(t.properties,i)){const o=Cj(e,i,t.properties[i]);if(o){const[s,a]=o;e.tableCellAlignToStyle&&s==="align"&&typeof a=="string"&&mj.has(t.tagName)?r=a:n[s]=a}}if(r){const o=n.style||(n.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function Ej(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const o=r.data.estree.body[0];o.type;const s=o.expression;s.type;const a=s.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Hs(e,t.position);else{const i=r.name;let o;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,o=e.evaluater.evaluateExpression(a.expression)}else Hs(e,t.position);else o=r.value===null?!0:r.value;n[i]=o}return n}function gm(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:fj;for(;++r<t.children.length;){const o=t.children[r];let s;if(e.passKeys){const l=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(l){const u=i.get(l)||0;s=l+"-"+u,i.set(l,u+1)}}const a=NS(e,o,s);a!==void 0&&n.push(a)}return n}function Cj(e,t,n){const r=PM(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?_M(n):MM(n)),r.property==="style"){let i=typeof n=="object"?n:Aj(e,String(n));return e.stylePropertyNameCase==="css"&&(i=Tj(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?TM[r.property]||r.property:r.attribute,n]}}function Aj(e,t){try{return cj(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new xt("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=RS+"#cannot-parse-style-attribute",i}}function DS(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let o=-1,s;for(;++o<i.length;){const a=Tv(i[o])?{type:"Identifier",name:i[o]}:{type:"Literal",value:i[o]};s=s?{type:"MemberExpression",object:s,property:a,computed:!!(o&&a.type==="Literal"),optional:!1}:a}r=s}else r=Tv(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return hm.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);Hs(e)}function Hs(e,t){const n=new xt("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=RS+"#cannot-handle-mdx-estrees-without-createevaluater",n}function Tj(e){const t={};let n;for(n in e)hm.call(e,n)&&(t[Rj(n)]=e[n]);return t}function Rj(e){let t=e.replace(pj,Nj);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function Nj(e){return"-"+e.toLowerCase()}const ud={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},Pj={};function ym(e,t){const n=Pj,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return OS(e,r,i)}function OS(e,t,n){if(Dj(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return zv(e.children,t,n)}return Array.isArray(e)?zv(e,t,n):""}function zv(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=OS(e[i],t,n);return r.join("")}function Dj(e){return!!(e&&typeof e=="object")}const Bv=document.createElement("i");function vm(e){const t="&"+e+";";Bv.innerHTML=t;const n=Bv.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function Kt(e,t,n,r){const i=e.length;let o=0,s;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)s=Array.from(r),s.unshift(t,n),e.splice(...s);else for(n&&e.splice(t,n);o<r.length;)s=r.slice(o,o+1e4),s.unshift(t,0),e.splice(...s),o+=1e4,t+=1e4}function nn(e,t){return e.length>0?(Kt(e,e.length,0,t),e):t}const Vv={}.hasOwnProperty;function LS(e){const t={};let n=-1;for(;++n<e.length;)Oj(t,e[n]);return t}function Oj(e,t){let n;for(n in t){const i=(Vv.call(e,n)?e[n]:void 0)||(e[n]={}),o=t[n];let s;if(o)for(s in o){Vv.call(i,s)||(i[s]=[]);const a=o[s];Lj(i[s],Array.isArray(a)?a:a?[a]:[])}}}function Lj(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);Kt(e,0,0,r)}function MS(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function _n(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const It=Wr(/[A-Za-z]/),_t=Wr(/[\dA-Za-z]/),Mj=Wr(/[#-'*+\--9=?A-Z^-~]/);function gu(e){return e!==null&&(e<32||e===127)}const rp=Wr(/\d/),jj=Wr(/[\dA-Fa-f]/),Fj=Wr(/[!-/:-@[-`{-~]/);function G(e){return e!==null&&e<-2}function Ee(e){return e!==null&&(e<0||e===32)}function le(e){return e===-2||e===-1||e===32}const rc=Wr(new RegExp("\\p{P}|\\p{S}","u")),ki=Wr(/\s/);function Wr(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function Ao(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const o=e.charCodeAt(n);let s="";if(o===37&&_t(e.charCodeAt(n+1))&&_t(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(s=String.fromCharCode(o));else if(o>55295&&o<57344){const a=e.charCodeAt(n+1);o<56320&&a>56319&&a<57344?(s=String.fromCharCode(o,a),i=1):s="�"}else s=String.fromCharCode(o);s&&(t.push(e.slice(r,n),encodeURIComponent(s)),r=n+i+1,s=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function me(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return s;function s(l){return le(l)?(e.enter(n),a(l)):t(l)}function a(l){return le(l)&&o++<i?(e.consume(l),a):(e.exit(n),t(l))}}const Uj={tokenize:zj};function zj(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),me(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),o(a)}function o(a){const l=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=l),n=l,s(a)}function s(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return G(a)?(e.consume(a),e.exit("chunkText"),o):(e.consume(a),s)}}const Bj={tokenize:Vj},$v={tokenize:$j};function Vj(e){const t=this,n=[];let r=0,i,o,s;return a;function a(g){if(r<n.length){const k=n[r];return t.containerState=k[1],e.attempt(k[0].continuation,l,u)(g)}return u(g)}function l(g){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();const k=t.events.length;let S=k,_;for(;S--;)if(t.events[S][0]==="exit"&&t.events[S][1].type==="chunkFlow"){_=t.events[S][1].end;break}y(r);let A=k;for(;A<t.events.length;)t.events[A][1].end={..._},A++;return Kt(t.events,S+1,0,t.events.slice(k)),t.events.length=A,u(g)}return a(g)}function u(g){if(r===n.length){if(!i)return f(g);if(i.currentConstruct&&i.currentConstruct.concrete)return m(g);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check($v,d,c)(g)}function d(g){return i&&v(),y(r),f(g)}function c(g){return t.parser.lazy[t.now().line]=r!==n.length,s=t.now().offset,m(g)}function f(g){return t.containerState={},e.attempt($v,p,m)(g)}function p(g){return r++,n.push([t.currentConstruct,t.containerState]),f(g)}function m(g){if(g===null){i&&v(),y(0),e.consume(g);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:o}),w(g)}function w(g){if(g===null){C(e.exit("chunkFlow"),!0),y(0),e.consume(g);return}return G(g)?(e.consume(g),C(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(g),w)}function C(g,k){const S=t.sliceStream(g);if(k&&S.push(null),g.previous=o,o&&(o.next=g),o=g,i.defineSkip(g.start),i.write(S),t.parser.lazy[g.start.line]){let _=i.events.length;for(;_--;)if(i.events[_][1].start.offset<s&&(!i.events[_][1].end||i.events[_][1].end.offset>s))return;const A=t.events.length;let R=A,O,E;for(;R--;)if(t.events[R][0]==="exit"&&t.events[R][1].type==="chunkFlow"){if(O){E=t.events[R][1].end;break}O=!0}for(y(r),_=A;_<t.events.length;)t.events[_][1].end={...E},_++;Kt(t.events,R+1,0,t.events.slice(A)),t.events.length=_}}function y(g){let k=n.length;for(;k-- >g;){const S=n[k];t.containerState=S[1],S[0].exit.call(t,e)}n.length=g}function v(){i.write([null]),o=void 0,i=void 0,t.containerState._closeFlow=void 0}}function $j(e,t,n){return me(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function yo(e){if(e===null||Ee(e)||ki(e))return 1;if(rc(e))return 2}function ic(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const o=e[i].resolveAll;o&&!r.includes(o)&&(t=o(t,n),r.push(o))}return t}const ip={name:"attention",resolveAll:Hj,tokenize:Wj};function Hj(e,t){let n=-1,r,i,o,s,a,l,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;l=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const c={...e[r][1].end},f={...e[n][1].start};Hv(c,-l),Hv(f,l),s={type:l>1?"strongSequence":"emphasisSequence",start:c,end:{...e[r][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:f},o={type:l>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:l>1?"strong":"emphasis",start:{...s.start},end:{...a.end}},e[r][1].end={...s.start},e[n][1].start={...a.end},u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=nn(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=nn(u,[["enter",i,t],["enter",s,t],["exit",s,t],["enter",o,t]]),u=nn(u,ic(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=nn(u,[["exit",o,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=nn(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,Kt(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Wj(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=yo(r);let o;return s;function s(l){return o=l,e.enter("attentionSequence"),a(l)}function a(l){if(l===o)return e.consume(l),a;const u=e.exit("attentionSequence"),d=yo(l),c=!d||d===2&&i||n.includes(l),f=!i||i===2&&d||n.includes(r);return u._open=!!(o===42?c:c&&(i||!f)),u._close=!!(o===42?f:f&&(d||!c)),t(l)}}function Hv(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const qj={name:"autolink",tokenize:Kj};function Kj(e,t,n){let r=0;return i;function i(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(p){return It(p)?(e.consume(p),s):p===64?n(p):u(p)}function s(p){return p===43||p===45||p===46||_t(p)?(r=1,a(p)):u(p)}function a(p){return p===58?(e.consume(p),r=0,l):(p===43||p===45||p===46||_t(p))&&r++<32?(e.consume(p),a):(r=0,u(p))}function l(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||gu(p)?n(p):(e.consume(p),l)}function u(p){return p===64?(e.consume(p),d):Mj(p)?(e.consume(p),u):n(p)}function d(p){return _t(p)?c(p):n(p)}function c(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):f(p)}function f(p){if((p===45||_t(p))&&r++<63){const m=p===45?f:c;return e.consume(p),m}return n(p)}}const va={partial:!0,tokenize:Gj};function Gj(e,t,n){return r;function r(o){return le(o)?me(e,i,"linePrefix")(o):i(o)}function i(o){return o===null||G(o)?t(o):n(o)}}const jS={continuation:{tokenize:Qj},exit:Jj,name:"blockQuote",tokenize:Yj};function Yj(e,t,n){const r=this;return i;function i(s){if(s===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(s),e.exit("blockQuoteMarker"),o}return n(s)}function o(s){return le(s)?(e.enter("blockQuotePrefixWhitespace"),e.consume(s),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(s))}}function Qj(e,t,n){const r=this;return i;function i(s){return le(s)?me(e,o,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s):o(s)}function o(s){return e.attempt(jS,t,n)(s)}}function Jj(e){e.exit("blockQuote")}const FS={name:"characterEscape",tokenize:Xj};function Xj(e,t,n){return r;function r(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),i}function i(o){return Fj(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(o)}}const US={name:"characterReference",tokenize:Zj};function Zj(e,t,n){const r=this;let i=0,o,s;return a;function a(c){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),l}function l(c){return c===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(c),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),o=31,s=_t,d(c))}function u(c){return c===88||c===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(c),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,s=jj,d):(e.enter("characterReferenceValue"),o=7,s=rp,d(c))}function d(c){if(c===59&&i){const f=e.exit("characterReferenceValue");return s===_t&&!vm(r.sliceSerialize(f))?n(c):(e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return s(c)&&i++<o?(e.consume(c),d):n(c)}}const Wv={partial:!0,tokenize:t2},qv={concrete:!0,name:"codeFenced",tokenize:e2};function e2(e,t,n){const r=this,i={partial:!0,tokenize:S};let o=0,s=0,a;return l;function l(_){return u(_)}function u(_){const A=r.events[r.events.length-1];return o=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=_,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(_)}function d(_){return _===a?(s++,e.consume(_),d):s<3?n(_):(e.exit("codeFencedFenceSequence"),le(_)?me(e,c,"whitespace")(_):c(_))}function c(_){return _===null||G(_)?(e.exit("codeFencedFence"),r.interrupt?t(_):e.check(Wv,w,k)(_)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(_))}function f(_){return _===null||G(_)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(_)):le(_)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),me(e,p,"whitespace")(_)):_===96&&_===a?n(_):(e.consume(_),f)}function p(_){return _===null||G(_)?c(_):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),m(_))}function m(_){return _===null||G(_)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(_)):_===96&&_===a?n(_):(e.consume(_),m)}function w(_){return e.attempt(i,k,C)(_)}function C(_){return e.enter("lineEnding"),e.consume(_),e.exit("lineEnding"),y}function y(_){return o>0&&le(_)?me(e,v,"linePrefix",o+1)(_):v(_)}function v(_){return _===null||G(_)?e.check(Wv,w,k)(_):(e.enter("codeFlowValue"),g(_))}function g(_){return _===null||G(_)?(e.exit("codeFlowValue"),v(_)):(e.consume(_),g)}function k(_){return e.exit("codeFenced"),t(_)}function S(_,A,R){let O=0;return E;function E(te){return _.enter("lineEnding"),_.consume(te),_.exit("lineEnding"),D}function D(te){return _.enter("codeFencedFence"),le(te)?me(_,z,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(te):z(te)}function z(te){return te===a?(_.enter("codeFencedFenceSequence"),K(te)):R(te)}function K(te){return te===a?(O++,_.consume(te),K):O>=s?(_.exit("codeFencedFenceSequence"),le(te)?me(_,Z,"whitespace")(te):Z(te)):R(te)}function Z(te){return te===null||G(te)?(_.exit("codeFencedFence"),A(te)):R(te)}}}function t2(e,t,n){const r=this;return i;function i(s){return s===null?n(s):(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}const cd={name:"codeIndented",tokenize:r2},n2={partial:!0,tokenize:i2};function r2(e,t,n){const r=this;return i;function i(u){return e.enter("codeIndented"),me(e,o,"linePrefix",5)(u)}function o(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?s(u):n(u)}function s(u){return u===null?l(u):G(u)?e.attempt(n2,s,l)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||G(u)?(e.exit("codeFlowValue"),s(u)):(e.consume(u),a)}function l(u){return e.exit("codeIndented"),t(u)}}function i2(e,t,n){const r=this;return i;function i(s){return r.parser.lazy[r.now().line]?n(s):G(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),i):me(e,o,"linePrefix",5)(s)}function o(s){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(s):G(s)?i(s):n(s)}}const o2={name:"codeText",previous:a2,resolve:s2,tokenize:l2};function s2(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function a2(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function l2(e,t,n){let r=0,i,o;return s;function s(c){return e.enter("codeText"),e.enter("codeTextSequence"),a(c)}function a(c){return c===96?(e.consume(c),r++,a):(e.exit("codeTextSequence"),l(c))}function l(c){return c===null?n(c):c===32?(e.enter("space"),e.consume(c),e.exit("space"),l):c===96?(o=e.enter("codeTextSequence"),i=0,d(c)):G(c)?(e.enter("lineEnding"),e.consume(c),e.exit("lineEnding"),l):(e.enter("codeTextData"),u(c))}function u(c){return c===null||c===32||c===96||G(c)?(e.exit("codeTextData"),l(c)):(e.consume(c),u)}function d(c){return c===96?(e.consume(c),i++,d):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(c)):(o.type="codeTextData",u(c))}}class u2{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const o=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&Wo(this.left,r),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Wo(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Wo(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);Wo(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Wo(this.left,n.reverse())}}}function Wo(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function zS(e){const t={};let n=-1,r,i,o,s,a,l,u;const d=new u2(e);for(;++n<d.length;){for(;n in t;)n=t[n];if(r=d.get(n),n&&r[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(l=r[1]._tokenizer.events,o=0,o<l.length&&l[o][1].type==="lineEndingBlank"&&(o+=2),o<l.length&&l[o][1].type==="content"))for(;++o<l.length&&l[o][1].type!=="content";)l[o][1].type==="chunkText"&&(l[o][1]._isInFirstContentOfListItem=!0,o++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,c2(d,n)),n=t[n],u=!0);else if(r[1]._container){for(o=n,i=void 0;o--;)if(s=d.get(o),s[1].type==="lineEnding"||s[1].type==="lineEndingBlank")s[0]==="enter"&&(i&&(d.get(i)[1].type="lineEndingBlank"),s[1].type="lineEnding",i=o);else if(!(s[1].type==="linePrefix"||s[1].type==="listItemIndent"))break;i&&(r[1].end={...d.get(i)[1].start},a=d.slice(i,n),a.unshift(r),d.splice(i,n-i+1,a))}}return Kt(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!u}function c2(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const o=[];let s=n._tokenizer;s||(s=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));const a=s.events,l=[],u={};let d,c,f=-1,p=n,m=0,w=0;const C=[w];for(;p;){for(;e.get(++i)[1]!==p;);o.push(i),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),c&&s.defineSkip(p.start),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(d),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),c=p,p=p.next}for(p=n;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(w=f+1,C.push(w),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(s.events=[],p?(p._tokenizer=void 0,p.previous=void 0):C.pop(),f=C.length;f--;){const y=a.slice(C[f],C[f+1]),v=o.pop();l.push([v,v+y.length-1]),e.splice(v,2,y)}for(l.reverse(),f=-1;++f<l.length;)u[m+l[f][0]]=m+l[f][1],m+=l[f][1]-l[f][0]-1;return u}const d2={resolve:p2,tokenize:h2},f2={partial:!0,tokenize:m2};function p2(e){return zS(e),e}function h2(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?o(a):G(a)?e.check(f2,s,o)(a):(e.consume(a),i)}function o(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function s(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function m2(e,t,n){const r=this;return i;function i(s){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),me(e,o,"linePrefix")}function o(s){if(s===null||G(s))return n(s);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(s):e.interrupt(r.parser.constructs.flow,n,t)(s)}}function BS(e,t,n,r,i,o,s,a,l){const u=l||Number.POSITIVE_INFINITY;let d=0;return c;function c(y){return y===60?(e.enter(r),e.enter(i),e.enter(o),e.consume(y),e.exit(o),f):y===null||y===32||y===41||gu(y)?n(y):(e.enter(r),e.enter(s),e.enter(a),e.enter("chunkString",{contentType:"string"}),w(y))}function f(y){return y===62?(e.enter(o),e.consume(y),e.exit(o),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(y))}function p(y){return y===62?(e.exit("chunkString"),e.exit(a),f(y)):y===null||y===60||G(y)?n(y):(e.consume(y),y===92?m:p)}function m(y){return y===60||y===62||y===92?(e.consume(y),p):p(y)}function w(y){return!d&&(y===null||y===41||Ee(y))?(e.exit("chunkString"),e.exit(a),e.exit(s),e.exit(r),t(y)):d<u&&y===40?(e.consume(y),d++,w):y===41?(e.consume(y),d--,w):y===null||y===32||y===40||gu(y)?n(y):(e.consume(y),y===92?C:w)}function C(y){return y===40||y===41||y===92?(e.consume(y),w):w(y)}}function VS(e,t,n,r,i,o){const s=this;let a=0,l;return u;function u(p){return e.enter(r),e.enter(i),e.consume(p),e.exit(i),e.enter(o),d}function d(p){return a>999||p===null||p===91||p===93&&!l||p===94&&!a&&"_hiddenFootnoteSupport"in s.parser.constructs?n(p):p===93?(e.exit(o),e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):G(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),c(p))}function c(p){return p===null||p===91||p===93||G(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),l||(l=!le(p)),p===92?f:c)}function f(p){return p===91||p===92||p===93?(e.consume(p),a++,c):c(p)}}function $S(e,t,n,r,i,o){let s;return a;function a(f){return f===34||f===39||f===40?(e.enter(r),e.enter(i),e.consume(f),e.exit(i),s=f===40?41:f,l):n(f)}function l(f){return f===s?(e.enter(i),e.consume(f),e.exit(i),e.exit(r),t):(e.enter(o),u(f))}function u(f){return f===s?(e.exit(o),l(s)):f===null?n(f):G(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),me(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===s||f===null||G(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?c:d)}function c(f){return f===s||f===92?(e.consume(f),d):d(f)}}function ps(e,t){let n;return r;function r(i){return G(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):le(i)?me(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const g2={name:"definition",tokenize:v2},y2={partial:!0,tokenize:w2};function v2(e,t,n){const r=this;let i;return o;function o(p){return e.enter("definition"),s(p)}function s(p){return VS.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=_n(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),l):n(p)}function l(p){return Ee(p)?ps(e,u)(p):u(p)}function u(p){return BS(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(y2,c,c)(p)}function c(p){return le(p)?me(e,f,"whitespace")(p):f(p)}function f(p){return p===null||G(p)?(e.exit("definition"),r.parser.defined.push(i),t(p)):n(p)}}function w2(e,t,n){return r;function r(a){return Ee(a)?ps(e,i)(a):n(a)}function i(a){return $S(e,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function o(a){return le(a)?me(e,s,"whitespace")(a):s(a)}function s(a){return a===null||G(a)?t(a):n(a)}}const _2={name:"hardBreakEscape",tokenize:b2};function b2(e,t,n){return r;function r(o){return e.enter("hardBreakEscape"),e.consume(o),i}function i(o){return G(o)?(e.exit("hardBreakEscape"),t(o)):n(o)}}const x2={name:"headingAtx",resolve:k2,tokenize:S2};function k2(e,t){let n=e.length-2,r=3,i,o;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},o={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},Kt(e,r,n-r+1,[["enter",i,t],["enter",o,t],["exit",o,t],["exit",i,t]])),e}function S2(e,t,n){let r=0;return i;function i(d){return e.enter("atxHeading"),o(d)}function o(d){return e.enter("atxHeadingSequence"),s(d)}function s(d){return d===35&&r++<6?(e.consume(d),s):d===null||Ee(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),l(d)):d===null||G(d)?(e.exit("atxHeading"),t(d)):le(d)?me(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function l(d){return d===35?(e.consume(d),l):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||Ee(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const I2=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Kv=["pre","script","style","textarea"],E2={concrete:!0,name:"htmlFlow",resolveTo:T2,tokenize:R2},C2={partial:!0,tokenize:P2},A2={partial:!0,tokenize:N2};function T2(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function R2(e,t,n){const r=this;let i,o,s,a,l;return u;function u(I){return d(I)}function d(I){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(I),c}function c(I){return I===33?(e.consume(I),f):I===47?(e.consume(I),o=!0,w):I===63?(e.consume(I),i=3,r.interrupt?t:x):It(I)?(e.consume(I),s=String.fromCharCode(I),C):n(I)}function f(I){return I===45?(e.consume(I),i=2,p):I===91?(e.consume(I),i=5,a=0,m):It(I)?(e.consume(I),i=4,r.interrupt?t:x):n(I)}function p(I){return I===45?(e.consume(I),r.interrupt?t:x):n(I)}function m(I){const ke="CDATA[";return I===ke.charCodeAt(a++)?(e.consume(I),a===ke.length?r.interrupt?t:z:m):n(I)}function w(I){return It(I)?(e.consume(I),s=String.fromCharCode(I),C):n(I)}function C(I){if(I===null||I===47||I===62||Ee(I)){const ke=I===47,Me=s.toLowerCase();return!ke&&!o&&Kv.includes(Me)?(i=1,r.interrupt?t(I):z(I)):I2.includes(s.toLowerCase())?(i=6,ke?(e.consume(I),y):r.interrupt?t(I):z(I)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(I):o?v(I):g(I))}return I===45||_t(I)?(e.consume(I),s+=String.fromCharCode(I),C):n(I)}function y(I){return I===62?(e.consume(I),r.interrupt?t:z):n(I)}function v(I){return le(I)?(e.consume(I),v):E(I)}function g(I){return I===47?(e.consume(I),E):I===58||I===95||It(I)?(e.consume(I),k):le(I)?(e.consume(I),g):E(I)}function k(I){return I===45||I===46||I===58||I===95||_t(I)?(e.consume(I),k):S(I)}function S(I){return I===61?(e.consume(I),_):le(I)?(e.consume(I),S):g(I)}function _(I){return I===null||I===60||I===61||I===62||I===96?n(I):I===34||I===39?(e.consume(I),l=I,A):le(I)?(e.consume(I),_):R(I)}function A(I){return I===l?(e.consume(I),l=null,O):I===null||G(I)?n(I):(e.consume(I),A)}function R(I){return I===null||I===34||I===39||I===47||I===60||I===61||I===62||I===96||Ee(I)?S(I):(e.consume(I),R)}function O(I){return I===47||I===62||le(I)?g(I):n(I)}function E(I){return I===62?(e.consume(I),D):n(I)}function D(I){return I===null||G(I)?z(I):le(I)?(e.consume(I),D):n(I)}function z(I){return I===45&&i===2?(e.consume(I),ve):I===60&&i===1?(e.consume(I),xe):I===62&&i===4?(e.consume(I),re):I===63&&i===3?(e.consume(I),x):I===93&&i===5?(e.consume(I),q):G(I)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(C2,ce,K)(I)):I===null||G(I)?(e.exit("htmlFlowData"),K(I)):(e.consume(I),z)}function K(I){return e.check(A2,Z,ce)(I)}function Z(I){return e.enter("lineEnding"),e.consume(I),e.exit("lineEnding"),te}function te(I){return I===null||G(I)?K(I):(e.enter("htmlFlowData"),z(I))}function ve(I){return I===45?(e.consume(I),x):z(I)}function xe(I){return I===47?(e.consume(I),s="",B):z(I)}function B(I){if(I===62){const ke=s.toLowerCase();return Kv.includes(ke)?(e.consume(I),re):z(I)}return It(I)&&s.length<8?(e.consume(I),s+=String.fromCharCode(I),B):z(I)}function q(I){return I===93?(e.consume(I),x):z(I)}function x(I){return I===62?(e.consume(I),re):I===45&&i===2?(e.consume(I),x):z(I)}function re(I){return I===null||G(I)?(e.exit("htmlFlowData"),ce(I)):(e.consume(I),re)}function ce(I){return e.exit("htmlFlow"),t(I)}}function N2(e,t,n){const r=this;return i;function i(s){return G(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o):n(s)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}function P2(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(va,t,n)}}const D2={name:"htmlText",tokenize:O2};function O2(e,t,n){const r=this;let i,o,s;return a;function a(x){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(x),l}function l(x){return x===33?(e.consume(x),u):x===47?(e.consume(x),S):x===63?(e.consume(x),g):It(x)?(e.consume(x),R):n(x)}function u(x){return x===45?(e.consume(x),d):x===91?(e.consume(x),o=0,m):It(x)?(e.consume(x),v):n(x)}function d(x){return x===45?(e.consume(x),p):n(x)}function c(x){return x===null?n(x):x===45?(e.consume(x),f):G(x)?(s=c,xe(x)):(e.consume(x),c)}function f(x){return x===45?(e.consume(x),p):c(x)}function p(x){return x===62?ve(x):x===45?f(x):c(x)}function m(x){const re="CDATA[";return x===re.charCodeAt(o++)?(e.consume(x),o===re.length?w:m):n(x)}function w(x){return x===null?n(x):x===93?(e.consume(x),C):G(x)?(s=w,xe(x)):(e.consume(x),w)}function C(x){return x===93?(e.consume(x),y):w(x)}function y(x){return x===62?ve(x):x===93?(e.consume(x),y):w(x)}function v(x){return x===null||x===62?ve(x):G(x)?(s=v,xe(x)):(e.consume(x),v)}function g(x){return x===null?n(x):x===63?(e.consume(x),k):G(x)?(s=g,xe(x)):(e.consume(x),g)}function k(x){return x===62?ve(x):g(x)}function S(x){return It(x)?(e.consume(x),_):n(x)}function _(x){return x===45||_t(x)?(e.consume(x),_):A(x)}function A(x){return G(x)?(s=A,xe(x)):le(x)?(e.consume(x),A):ve(x)}function R(x){return x===45||_t(x)?(e.consume(x),R):x===47||x===62||Ee(x)?O(x):n(x)}function O(x){return x===47?(e.consume(x),ve):x===58||x===95||It(x)?(e.consume(x),E):G(x)?(s=O,xe(x)):le(x)?(e.consume(x),O):ve(x)}function E(x){return x===45||x===46||x===58||x===95||_t(x)?(e.consume(x),E):D(x)}function D(x){return x===61?(e.consume(x),z):G(x)?(s=D,xe(x)):le(x)?(e.consume(x),D):O(x)}function z(x){return x===null||x===60||x===61||x===62||x===96?n(x):x===34||x===39?(e.consume(x),i=x,K):G(x)?(s=z,xe(x)):le(x)?(e.consume(x),z):(e.consume(x),Z)}function K(x){return x===i?(e.consume(x),i=void 0,te):x===null?n(x):G(x)?(s=K,xe(x)):(e.consume(x),K)}function Z(x){return x===null||x===34||x===39||x===60||x===61||x===96?n(x):x===47||x===62||Ee(x)?O(x):(e.consume(x),Z)}function te(x){return x===47||x===62||Ee(x)?O(x):n(x)}function ve(x){return x===62?(e.consume(x),e.exit("htmlTextData"),e.exit("htmlText"),t):n(x)}function xe(x){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),B}function B(x){return le(x)?me(e,q,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):q(x)}function q(x){return e.enter("htmlTextData"),s(x)}}const wm={name:"labelEnd",resolveAll:F2,resolveTo:U2,tokenize:z2},L2={tokenize:B2},M2={tokenize:V2},j2={tokenize:$2};function F2(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&Kt(e,0,e.length,n),e}function U2(e,t){let n=e.length,r=0,i,o,s,a;for(;n--;)if(i=e[n][1],o){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(s){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(o=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(s=n);const l={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[o][1].start},end:{...e[s][1].end}},d={type:"labelText",start:{...e[o+r+2][1].end},end:{...e[s-2][1].start}};return a=[["enter",l,t],["enter",u,t]],a=nn(a,e.slice(o+1,o+r+3)),a=nn(a,[["enter",d,t]]),a=nn(a,ic(t.parser.constructs.insideSpan.null,e.slice(o+r+4,s-3),t)),a=nn(a,[["exit",d,t],e[s-2],e[s-1],["exit",u,t]]),a=nn(a,e.slice(s+1)),a=nn(a,[["exit",l,t]]),Kt(e,o,e.length,a),e}function z2(e,t,n){const r=this;let i=r.events.length,o,s;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){o=r.events[i][1];break}return a;function a(f){return o?o._inactive?c(f):(s=r.parser.defined.includes(_n(r.sliceSerialize({start:o.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),l):n(f)}function l(f){return f===40?e.attempt(L2,d,s?d:c)(f):f===91?e.attempt(M2,d,s?u:c)(f):s?d(f):c(f)}function u(f){return e.attempt(j2,d,c)(f)}function d(f){return t(f)}function c(f){return o._balanced=!0,n(f)}}function B2(e,t,n){return r;function r(c){return e.enter("resource"),e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),i}function i(c){return Ee(c)?ps(e,o)(c):o(c)}function o(c){return c===41?d(c):BS(e,s,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function s(c){return Ee(c)?ps(e,l)(c):d(c)}function a(c){return n(c)}function l(c){return c===34||c===39||c===40?$S(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):d(c)}function u(c){return Ee(c)?ps(e,d)(c):d(c)}function d(c){return c===41?(e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),e.exit("resource"),t):n(c)}}function V2(e,t,n){const r=this;return i;function i(a){return VS.call(r,e,o,s,"reference","referenceMarker","referenceString")(a)}function o(a){return r.parser.defined.includes(_n(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function s(a){return n(a)}}function $2(e,t,n){return r;function r(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),i}function i(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),t):n(o)}}const H2={name:"labelStartImage",resolveAll:wm.resolveAll,tokenize:W2};function W2(e,t,n){const r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),o}function o(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),s):n(a)}function s(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const q2={name:"labelStartLink",resolveAll:wm.resolveAll,tokenize:K2};function K2(e,t,n){const r=this;return i;function i(s){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelLink"),o}function o(s){return s===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(s):t(s)}}const dd={name:"lineEnding",tokenize:G2};function G2(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),me(e,t,"linePrefix")}}const yl={name:"thematicBreak",tokenize:Y2};function Y2(e,t,n){let r=0,i;return o;function o(u){return e.enter("thematicBreak"),s(u)}function s(u){return i=u,a(u)}function a(u){return u===i?(e.enter("thematicBreakSequence"),l(u)):r>=3&&(u===null||G(u))?(e.exit("thematicBreak"),t(u)):n(u)}function l(u){return u===i?(e.consume(u),r++,l):(e.exit("thematicBreakSequence"),le(u)?me(e,a,"whitespace")(u):a(u))}}const Pt={continuation:{tokenize:Z2},exit:tF,name:"list",tokenize:X2},Q2={partial:!0,tokenize:nF},J2={partial:!0,tokenize:eF};function X2(e,t,n){const r=this,i=r.events[r.events.length-1];let o=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,s=0;return a;function a(p){const m=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(m==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:rp(p)){if(r.containerState.type||(r.containerState.type=m,e.enter(m,{_container:!0})),m==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(yl,n,u)(p):u(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),l(p)}return n(p)}function l(p){return rp(p)&&++s<10?(e.consume(p),l):(!r.interrupt||s<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(va,r.interrupt?n:d,e.attempt(Q2,f,c))}function d(p){return r.containerState.initialBlankLine=!0,o++,f(p)}function c(p){return le(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return r.containerState.size=o+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function Z2(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(va,i,o);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,me(e,t,"listItemIndent",r.containerState.size+1)(a)}function o(a){return r.containerState.furtherBlankLines||!le(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,s(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(J2,t,s)(a))}function s(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,me(e,e.attempt(Pt,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function eF(e,t,n){const r=this;return me(e,i,"listItemIndent",r.containerState.size+1);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="listItemIndent"&&s[2].sliceSerialize(s[1],!0).length===r.containerState.size?t(o):n(o)}}function tF(e){e.exit(this.containerState.type)}function nF(e,t,n){const r=this;return me(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(o){const s=r.events[r.events.length-1];return!le(o)&&s&&s[1].type==="listItemPrefixWhitespace"?t(o):n(o)}}const Gv={name:"setextUnderline",resolveTo:rF,tokenize:iF};function rF(e,t){let n=e.length,r,i,o;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!o&&e[n][1].type==="definition"&&(o=n);const s={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",o?(e.splice(i,0,["enter",s,t]),e.splice(o+1,0,["exit",e[r][1],t]),e[r][1].end={...e[o][1].end}):e[r][1]=s,e.push(["exit",s,t]),e}function iF(e,t,n){const r=this;let i;return o;function o(u){let d=r.events.length,c;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){c=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(e.enter("setextHeadingLine"),i=u,s(u)):n(u)}function s(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===i?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),le(u)?me(e,l,"lineSuffix")(u):l(u))}function l(u){return u===null||G(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const oF={tokenize:sF};function sF(e){const t=this,n=e.attempt(va,r,e.attempt(this.parser.constructs.flowInitial,i,me(e,e.attempt(this.parser.constructs.flow,i,e.attempt(d2,i)),"linePrefix")));return n;function r(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const aF={resolveAll:WS()},lF=HS("string"),uF=HS("text");function HS(e){return{resolveAll:WS(e==="text"?cF:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],o=n.attempt(i,s,a);return s;function s(d){return u(d)?o(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),l}function l(d){return u(d)?(n.exit("data"),o(d)):(n.consume(d),l)}function u(d){if(d===null)return!0;const c=i[d];let f=-1;if(c)for(;++f<c.length;){const p=c[f];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function WS(e){return t;function t(n,r){let i=-1,o;for(;++i<=n.length;)o===void 0?n[i]&&n[i][1].type==="data"&&(o=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==o+2&&(n[o][1].end=n[i-1][1].end,n.splice(o+2,i-o-2),i=o+2),o=void 0);return e?e(n,r):n}}function cF(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let o=i.length,s=-1,a=0,l;for(;o--;){const u=i[o];if(typeof u=="string"){for(s=u.length;u.charCodeAt(s-1)===32;)a++,s--;if(s)break;s=-1}else if(u===-2)l=!0,a++;else if(u!==-1){o++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(a=0),a){const u={type:n===e.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?s:r.start._bufferIndex+s,_index:r.start._index+o,line:r.end.line,column:r.end.column-a,offset:r.end.offset-a},end:{...r.end}};r.end={...u.start},r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}const dF={42:Pt,43:Pt,45:Pt,48:Pt,49:Pt,50:Pt,51:Pt,52:Pt,53:Pt,54:Pt,55:Pt,56:Pt,57:Pt,62:jS},fF={91:g2},pF={[-2]:cd,[-1]:cd,32:cd},hF={35:x2,42:yl,45:[Gv,yl],60:E2,61:Gv,95:yl,96:qv,126:qv},mF={38:US,92:FS},gF={[-5]:dd,[-4]:dd,[-3]:dd,33:H2,38:US,42:ip,60:[qj,D2],91:q2,92:[_2,FS],93:wm,95:ip,96:o2},yF={null:[ip,aF]},vF={null:[42,95]},wF={null:[]},_F=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:vF,contentInitial:fF,disable:wF,document:dF,flow:hF,flowInitial:pF,insideSpan:yF,string:mF,text:gF},Symbol.toStringTag,{value:"Module"}));function bF(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},o=[];let s=[],a=[];const l={attempt:A(S),check:A(_),consume:v,enter:g,exit:k,interrupt:A(_,{interrupt:!0})},u={code:null,containerState:{},defineSkip:w,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:c};let d=t.tokenize.call(u,l);return t.resolveAll&&o.push(t),u;function c(D){return s=nn(s,D),C(),s[s.length-1]!==null?[]:(R(t,0),u.events=ic(o,u.events,u),u.events)}function f(D,z){return kF(p(D),z)}function p(D){return xF(s,D)}function m(){const{_bufferIndex:D,_index:z,line:K,column:Z,offset:te}=r;return{_bufferIndex:D,_index:z,line:K,column:Z,offset:te}}function w(D){i[D.line]=D.column,E()}function C(){let D;for(;r._index<s.length;){const z=s[r._index];if(typeof z=="string")for(D=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===D&&r._bufferIndex<z.length;)y(z.charCodeAt(r._bufferIndex));else y(z)}}function y(D){d=d(D)}function v(D){G(D)?(r.line++,r.column=1,r.offset+=D===-3?2:1,E()):D!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===s[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=D}function g(D,z){const K=z||{};return K.type=D,K.start=m(),u.events.push(["enter",K,u]),a.push(K),K}function k(D){const z=a.pop();return z.end=m(),u.events.push(["exit",z,u]),z}function S(D,z){R(D,z.from)}function _(D,z){z.restore()}function A(D,z){return K;function K(Z,te,ve){let xe,B,q,x;return Array.isArray(Z)?ce(Z):"tokenize"in Z?ce([Z]):re(Z);function re(de){return Ue;function Ue(we){const Ke=we!==null&&de[we],Ae=we!==null&&de.null,mt=[...Array.isArray(Ke)?Ke:Ke?[Ke]:[],...Array.isArray(Ae)?Ae:Ae?[Ae]:[]];return ce(mt)(we)}}function ce(de){return xe=de,B=0,de.length===0?ve:I(de[B])}function I(de){return Ue;function Ue(we){return x=O(),q=de,de.partial||(u.currentConstruct=de),de.name&&u.parser.constructs.disable.null.includes(de.name)?Me():de.tokenize.call(z?Object.assign(Object.create(u),z):u,l,ke,Me)(we)}}function ke(de){return D(q,x),te}function Me(de){return x.restore(),++B<xe.length?I(xe[B]):ve}}}function R(D,z){D.resolveAll&&!o.includes(D)&&o.push(D),D.resolve&&Kt(u.events,z,u.events.length-z,D.resolve(u.events.slice(z),u)),D.resolveTo&&(u.events=D.resolveTo(u.events,u))}function O(){const D=m(),z=u.previous,K=u.currentConstruct,Z=u.events.length,te=Array.from(a);return{from:Z,restore:ve};function ve(){r=D,u.previous=z,u.currentConstruct=K,u.events.length=Z,a=te,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function xF(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,o=t.end._bufferIndex;let s;if(n===i)s=[e[n].slice(r,o)];else{if(s=e.slice(n,i),r>-1){const a=s[0];typeof a=="string"?s[0]=a.slice(r):s.shift()}o>0&&s.push(e[i].slice(0,o))}return s}function kF(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const o=e[n];let s;if(typeof o=="string")s=o;else switch(o){case-5:{s="\r";break}case-4:{s=`
`;break}case-3:{s=`\r
`;break}case-2:{s=t?" ":"	";break}case-1:{if(!t&&i)continue;s=" ";break}default:s=String.fromCharCode(o)}i=o===-2,r.push(s)}return r.join("")}function SF(e){const r={constructs:LS([_F,...(e||{}).extensions||[]]),content:i(Uj),defined:[],document:i(Bj),flow:i(oF),lazy:{},string:i(lF),text:i(uF)};return r;function i(o){return s;function s(a){return bF(r,o,a)}}}function IF(e){for(;!zS(e););return e}const Yv=/[\0\t\n\r]/g;function EF(){let e=1,t="",n=!0,r;return i;function i(o,s,a){const l=[];let u,d,c,f,p;for(o=t+(typeof o=="string"?o.toString():new TextDecoder(s||void 0).decode(o)),c=0,t="",n&&(o.charCodeAt(0)===65279&&c++,n=void 0);c<o.length;){if(Yv.lastIndex=c,u=Yv.exec(o),f=u&&u.index!==void 0?u.index:o.length,p=o.charCodeAt(f),!u){t=o.slice(c);break}if(p===10&&c===f&&r)l.push(-3),r=void 0;else switch(r&&(l.push(-5),r=void 0),c<f&&(l.push(o.slice(c,f)),e+=f-c),p){case 0:{l.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,l.push(-2);e++<d;)l.push(-1);break}case 10:{l.push(-4),e=1;break}default:r=!0,e=1}c=f+1}return a&&(r&&l.push(-5),t&&l.push(t),l.push(null)),l}}const CF=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function AF(e){return e.replace(CF,TF)}function TF(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),o=i===120||i===88;return MS(n.slice(o?2:1),o?16:10)}return vm(n)||e}const qS={}.hasOwnProperty;function RF(e,t,n){return t&&typeof t=="object"&&(n=t,t=void 0),NF(n)(IF(SF(n).document().write(EF()(e,t,!0))))}function NF(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(Nt),autolinkProtocol:O,autolinkEmail:O,atxHeading:o(Vt),blockQuote:o(Ae),characterEscape:O,characterReference:O,codeFenced:o(mt),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:o(mt,s),codeText:o(Te,s),codeTextData:O,data:O,codeFlowValue:O,definition:o(Sn),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:o(pe),hardBreakEscape:o(He),hardBreakTrailing:o(He),htmlFlow:o(Je,s),htmlFlowData:O,htmlText:o(Je,s),htmlTextData:O,image:o(In),label:s,link:o(Nt),listItem:o(ln),listItemValue:f,listOrdered:o(Xe,c),listUnordered:o(Xe),paragraph:o(_e),reference:I,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:o(Vt),strong:o(qr),thematicBreak:o(sr)},exit:{atxHeading:l(),atxHeadingSequence:S,autolink:l(),autolinkEmail:Ke,autolinkProtocol:we,blockQuote:l(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:Me,characterReferenceMarkerNumeric:Me,characterReferenceValue:de,characterReference:Ue,codeFenced:l(C),codeFencedFence:w,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:E,codeIndented:l(y),codeText:l(te),codeTextData:E,data:E,definition:l(),definitionDestinationString:k,definitionLabelString:v,definitionTitleString:g,emphasis:l(),hardBreakEscape:l(z),hardBreakTrailing:l(z),htmlFlow:l(K),htmlFlowData:E,htmlText:l(Z),htmlTextData:E,image:l(xe),label:q,labelText:B,lineEnding:D,link:l(ve),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:ke,resourceDestinationString:x,resourceTitleString:re,resource:ce,setextHeading:l(R),setextHeadingLineSequence:A,setextHeadingText:_,strong:l(),thematicBreak:l()}};KS(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(b){let T={type:"root",children:[]};const N={stack:[T],tokenStack:[],config:t,enter:a,exit:u,buffer:s,resume:d,data:n},M=[];let H=-1;for(;++H<b.length;)if(b[H][1].type==="listOrdered"||b[H][1].type==="listUnordered")if(b[H][0]==="enter")M.push(H);else{const fe=M.pop();H=i(b,fe,H)}for(H=-1;++H<b.length;){const fe=t[b[H][0]];qS.call(fe,b[H][1].type)&&fe[b[H][1].type].call(Object.assign({sliceSerialize:b[H][2].sliceSerialize},N),b[H][1])}if(N.tokenStack.length>0){const fe=N.tokenStack[N.tokenStack.length-1];(fe[1]||Qv).call(N,void 0,fe[0])}for(T.position={start:cr(b.length>0?b[0][1].start:{line:1,column:1,offset:0}),end:cr(b.length>0?b[b.length-2][1].end:{line:1,column:1,offset:0})},H=-1;++H<t.transforms.length;)T=t.transforms[H](T)||T;return T}function i(b,T,N){let M=T-1,H=-1,fe=!1,he,ee,ie,j;for(;++M<=N;){const ne=b[M];switch(ne[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ne[0]==="enter"?H++:H--,j=void 0;break}case"lineEndingBlank":{ne[0]==="enter"&&(he&&!j&&!H&&!ie&&(ie=M),j=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:j=void 0}if(!H&&ne[0]==="enter"&&ne[1].type==="listItemPrefix"||H===-1&&ne[0]==="exit"&&(ne[1].type==="listUnordered"||ne[1].type==="listOrdered")){if(he){let Xt=M;for(ee=void 0;Xt--;){const Zt=b[Xt];if(Zt[1].type==="lineEnding"||Zt[1].type==="lineEndingBlank"){if(Zt[0]==="exit")continue;ee&&(b[ee][1].type="lineEndingBlank",fe=!0),Zt[1].type="lineEnding",ee=Xt}else if(!(Zt[1].type==="linePrefix"||Zt[1].type==="blockQuotePrefix"||Zt[1].type==="blockQuotePrefixWhitespace"||Zt[1].type==="blockQuoteMarker"||Zt[1].type==="listItemIndent"))break}ie&&(!ee||ie<ee)&&(he._spread=!0),he.end=Object.assign({},ee?b[ee][1].start:ne[1].end),b.splice(ee||M,0,["exit",he,ne[2]]),M++,N++}if(ne[1].type==="listItemPrefix"){const Xt={type:"listItem",_spread:!1,start:Object.assign({},ne[1].start),end:void 0};he=Xt,b.splice(M,0,["enter",Xt,ne[2]]),M++,N++,ie=void 0,j=!0}}}return b[T][1]._spread=fe,N}function o(b,T){return N;function N(M){a.call(this,b(M),M),T&&T.call(this,M)}}function s(){this.stack.push({type:"fragment",children:[]})}function a(b,T,N){this.stack[this.stack.length-1].children.push(b),this.stack.push(b),this.tokenStack.push([T,N||void 0]),b.position={start:cr(T.start),end:void 0}}function l(b){return T;function T(N){b&&b.call(this,N),u.call(this,N)}}function u(b,T){const N=this.stack.pop(),M=this.tokenStack.pop();if(M)M[0].type!==b.type&&(T?T.call(this,b,M[0]):(M[1]||Qv).call(this,b,M[0]));else throw new Error("Cannot close `"+b.type+"` ("+fs({start:b.start,end:b.end})+"): it’s not open");N.position.end=cr(b.end)}function d(){return ym(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function f(b){if(this.data.expectingFirstListItemValue){const T=this.stack[this.stack.length-2];T.start=Number.parseInt(this.sliceSerialize(b),10),this.data.expectingFirstListItemValue=void 0}}function p(){const b=this.resume(),T=this.stack[this.stack.length-1];T.lang=b}function m(){const b=this.resume(),T=this.stack[this.stack.length-1];T.meta=b}function w(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function C(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function y(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b.replace(/(\r?\n|\r)$/g,"")}function v(b){const T=this.resume(),N=this.stack[this.stack.length-1];N.label=T,N.identifier=_n(this.sliceSerialize(b)).toLowerCase()}function g(){const b=this.resume(),T=this.stack[this.stack.length-1];T.title=b}function k(){const b=this.resume(),T=this.stack[this.stack.length-1];T.url=b}function S(b){const T=this.stack[this.stack.length-1];if(!T.depth){const N=this.sliceSerialize(b).length;T.depth=N}}function _(){this.data.setextHeadingSlurpLineEnding=!0}function A(b){const T=this.stack[this.stack.length-1];T.depth=this.sliceSerialize(b).codePointAt(0)===61?1:2}function R(){this.data.setextHeadingSlurpLineEnding=void 0}function O(b){const N=this.stack[this.stack.length-1].children;let M=N[N.length-1];(!M||M.type!=="text")&&(M=Kr(),M.position={start:cr(b.start),end:void 0},N.push(M)),this.stack.push(M)}function E(b){const T=this.stack.pop();T.value+=this.sliceSerialize(b),T.position.end=cr(b.end)}function D(b){const T=this.stack[this.stack.length-1];if(this.data.atHardBreak){const N=T.children[T.children.length-1];N.position.end=cr(b.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(T.type)&&(O.call(this,b),E.call(this,b))}function z(){this.data.atHardBreak=!0}function K(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function Z(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function te(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function ve(){const b=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";b.type+="Reference",b.referenceType=T,delete b.url,delete b.title}else delete b.identifier,delete b.label;this.data.referenceType=void 0}function xe(){const b=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";b.type+="Reference",b.referenceType=T,delete b.url,delete b.title}else delete b.identifier,delete b.label;this.data.referenceType=void 0}function B(b){const T=this.sliceSerialize(b),N=this.stack[this.stack.length-2];N.label=AF(T),N.identifier=_n(T).toLowerCase()}function q(){const b=this.stack[this.stack.length-1],T=this.resume(),N=this.stack[this.stack.length-1];if(this.data.inReference=!0,N.type==="link"){const M=b.children;N.children=M}else N.alt=T}function x(){const b=this.resume(),T=this.stack[this.stack.length-1];T.url=b}function re(){const b=this.resume(),T=this.stack[this.stack.length-1];T.title=b}function ce(){this.data.inReference=void 0}function I(){this.data.referenceType="collapsed"}function ke(b){const T=this.resume(),N=this.stack[this.stack.length-1];N.label=T,N.identifier=_n(this.sliceSerialize(b)).toLowerCase(),this.data.referenceType="full"}function Me(b){this.data.characterReferenceType=b.type}function de(b){const T=this.sliceSerialize(b),N=this.data.characterReferenceType;let M;N?(M=MS(T,N==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):M=vm(T);const H=this.stack[this.stack.length-1];H.value+=M}function Ue(b){const T=this.stack.pop();T.position.end=cr(b.end)}function we(b){E.call(this,b);const T=this.stack[this.stack.length-1];T.url=this.sliceSerialize(b)}function Ke(b){E.call(this,b);const T=this.stack[this.stack.length-1];T.url="mailto:"+this.sliceSerialize(b)}function Ae(){return{type:"blockquote",children:[]}}function mt(){return{type:"code",lang:null,meta:null,value:""}}function Te(){return{type:"inlineCode",value:""}}function Sn(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function pe(){return{type:"emphasis",children:[]}}function Vt(){return{type:"heading",depth:0,children:[]}}function He(){return{type:"break"}}function Je(){return{type:"html",value:""}}function In(){return{type:"image",title:null,url:"",alt:null}}function Nt(){return{type:"link",title:null,url:"",children:[]}}function Xe(b){return{type:"list",ordered:b.type==="listOrdered",start:null,spread:b._spread,children:[]}}function ln(b){return{type:"listItem",spread:b._spread,checked:null,children:[]}}function _e(){return{type:"paragraph",children:[]}}function qr(){return{type:"strong",children:[]}}function Kr(){return{type:"text",value:""}}function sr(){return{type:"thematicBreak"}}}function cr(e){return{line:e.line,column:e.column,offset:e.offset}}function KS(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?KS(e,r):PF(e,r)}}function PF(e,t){let n;for(n in t)if(qS.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Qv(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+fs({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+fs({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+fs({start:t.start,end:t.end})+") is still open")}function DF(e){const t=this;t.parser=n;function n(r){return RF(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function OF(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function LF(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function MF(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function jF(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function FF(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function UF(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=Ao(r.toLowerCase()),o=e.footnoteOrder.indexOf(r);let s,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),s=e.footnoteOrder.length):s=o+1,a+=1,e.footnoteCounts.set(r,a);const l={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(s)}]};e.patch(t,l);const u={type:"element",tagName:"sup",properties:{},children:[l]};return e.patch(t,u),e.applyData(t,u)}function zF(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function BF(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function GS(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),o=i[0];o&&o.type==="text"?o.value="["+o.value:i.unshift({type:"text",value:"["});const s=i[i.length-1];return s&&s.type==="text"?s.value+=r:i.push({type:"text",value:r}),i}function VF(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return GS(e,t);const i={src:Ao(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,o),e.applyData(t,o)}function $F(e,t){const n={src:Ao(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function HF(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function WF(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return GS(e,t);const i={href:Ao(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)}function qF(e,t){const n={href:Ao(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function KF(e,t,n){const r=e.all(t),i=n?GF(n):YS(t),o={},s=[];if(typeof t.checked=="boolean"){const d=r[0];let c;d&&d.type==="element"&&d.tagName==="p"?c=d:(c={type:"element",tagName:"p",properties:{},children:[]},r.unshift(c)),c.children.length>0&&c.children.unshift({type:"text",value:" "}),c.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(i||a!==0||d.type!=="element"||d.tagName!=="p")&&s.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!i?s.push(...d.children):s.push(d)}const l=r[r.length-1];l&&(i||l.type!=="element"||l.tagName!=="p")&&s.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:o,children:s};return e.patch(t,u),e.applyData(t,u)}function GF(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=YS(n[r])}return t}function YS(e){const t=e.spread;return t??e.children.length>1}function YF(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const s=r[i];if(s.type==="element"&&s.tagName==="li"&&s.properties&&Array.isArray(s.properties.className)&&s.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)}function QF(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function JF(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function XF(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ZF(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const s={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],s),i.push(s)}if(n.length>0){const s={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=pm(t.children[1]),l=AS(t.children[t.children.length-1]);a&&l&&(s.position={start:a,end:l}),i.push(s)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)}function e3(e,t,n){const r=n?n.children:void 0,o=(r?r.indexOf(t):1)===0?"th":"td",s=n&&n.type==="table"?n.align:void 0,a=s?s.length:t.children.length;let l=-1;const u=[];for(;++l<a;){const c=t.children[l],f={},p=s?s[l]:void 0;p&&(f.align=p);let m={type:"element",tagName:o,properties:f,children:[]};c&&(m.children=e.all(c),e.patch(c,m),m=e.applyData(c,m)),u.push(m)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function t3(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Jv=9,Xv=32;function n3(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const o=[];for(;r;)o.push(Zv(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return o.push(Zv(t.slice(i),i>0,!1)),o.join("")}function Zv(e,t,n){let r=0,i=e.length;if(t){let o=e.codePointAt(r);for(;o===Jv||o===Xv;)r++,o=e.codePointAt(r)}if(n){let o=e.codePointAt(i-1);for(;o===Jv||o===Xv;)i--,o=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function r3(e,t){const n={type:"text",value:n3(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function i3(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const o3={blockquote:OF,break:LF,code:MF,delete:jF,emphasis:FF,footnoteReference:UF,heading:zF,html:BF,imageReference:VF,image:$F,inlineCode:HF,linkReference:WF,link:qF,listItem:KF,list:YF,paragraph:QF,root:JF,strong:XF,table:ZF,tableCell:t3,tableRow:e3,text:r3,thematicBreak:i3,toml:Ka,yaml:Ka,definition:Ka,footnoteDefinition:Ka};function Ka(){}const QS=-1,oc=0,hs=1,yu=2,_m=3,bm=4,xm=5,km=6,JS=7,XS=8,ZS=typeof self=="object"?self:globalThis,ew=(e,t)=>{switch(e){case"Function":case"SharedWorker":case"Worker":case"eval":case"setInterval":case"setTimeout":throw new TypeError("unable to deserialize "+e)}return new ZS[e](t)},s3=(e,t)=>{const n=(i,o)=>(e.set(o,i),i),r=i=>{if(e.has(i))return e.get(i);const[o,s]=t[i];switch(o){case oc:case QS:return n(s,i);case hs:{const a=n([],i);for(const l of s)a.push(r(l));return a}case yu:{const a=n({},i);for(const[l,u]of s)a[r(l)]=r(u);return a}case _m:return n(new Date(s),i);case bm:{const{source:a,flags:l}=s;return n(new RegExp(a,l),i)}case xm:{const a=n(new Map,i);for(const[l,u]of s)a.set(r(l),r(u));return a}case km:{const a=n(new Set,i);for(const l of s)a.add(r(l));return a}case JS:{const{name:a,message:l}=s;return n(typeof ZS[a]=="function"?ew(a,l):new Error(l),i)}case XS:return n(BigInt(s),i);case"BigInt":return n(Object(BigInt(s)),i);case"ArrayBuffer":return n(new Uint8Array(s).buffer,s);case"DataView":{const{buffer:a}=new Uint8Array(s);return n(new DataView(a),s)}}return n(ew(o,s),i)};return r},tw=e=>s3(new Map,e)(0),Zr="",{toString:a3}={},{keys:l3}=Object,qo=e=>{const t=typeof e;if(t!=="object"||!e)return[oc,t];const n=a3.call(e).slice(8,-1);switch(n){case"Array":return[hs,Zr];case"Object":return[yu,Zr];case"Date":return[_m,Zr];case"RegExp":return[bm,Zr];case"Map":return[xm,Zr];case"Set":return[km,Zr];case"DataView":return[hs,n]}return n.includes("Array")?[hs,n]:e instanceof Error?[JS,e.name||"Error"]:[yu,n]},Ga=([e,t])=>e===oc&&(t==="function"||t==="symbol"),u3=(e,t,n,r)=>{const i=(s,a)=>{const l=r.push(s)-1;return n.set(a,l),l},o=s=>{if(n.has(s))return n.get(s);let[a,l]=qo(s);switch(a){case oc:{let d=s;switch(l){case"bigint":a=XS,d=s.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+l);d=null;break;case"undefined":return i([QS],s)}return i([a,d],s)}case hs:{if(l){let f=s;return l==="DataView"?f=new Uint8Array(s.buffer):l==="ArrayBuffer"&&(f=new Uint8Array(s)),i([l,[...f]],s)}const d=[],c=i([a,d],s);for(const f of s)d.push(o(f));return c}case yu:{if(l)switch(l){case"BigInt":return i([l,s.toString()],s);case"Boolean":case"Number":case"String":return i([l,s.valueOf()],s)}if(t&&"toJSON"in s)return o(s.toJSON());const d=[],c=i([a,d],s);for(const f of l3(s))(e||!Ga(qo(s[f])))&&d.push([o(f),o(s[f])]);return c}case _m:return i([a,isNaN(s.getTime())?Zr:s.toISOString()],s);case bm:{const{source:d,flags:c}=s;return i([a,{source:d,flags:c}],s)}case xm:{const d=[],c=i([a,d],s);for(const[f,p]of s)(e||!(Ga(qo(f))||Ga(qo(p))))&&d.push([o(f),o(p)]);return c}case km:{const d=[],c=i([a,d],s);for(const f of s)(e||!Ga(qo(f)))&&d.push(o(f));return c}}const{message:u}=s;return i([a,{name:l,message:u}],s)};return o},nw=(e,{json:t,lossy:n}={})=>{const r=[];return u3(!(t||n),!!t,new Map,r)(e),r},vu=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?tw(nw(e,t)):structuredClone(e):(e,t)=>tw(nw(e,t));function c3(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function d3(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function f3(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||c3,r=e.options.footnoteBackLabel||d3,i=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",s=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let l=-1;for(;++l<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[l]);if(!u)continue;const d=e.all(u),c=String(u.identifier).toUpperCase(),f=Ao(c.toLowerCase());let p=0;const m=[],w=e.footnoteCounts.get(c);for(;w!==void 0&&++p<=w;){m.length>0&&m.push({type:"text",value:" "});let v=typeof n=="string"?n:n(l,p);typeof v=="string"&&(v={type:"text",value:v}),m.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(l,p),className:["data-footnote-backref"]},children:Array.isArray(v)?v:[v]})}const C=d[d.length-1];if(C&&C.type==="element"&&C.tagName==="p"){const v=C.children[C.children.length-1];v&&v.type==="text"?v.value+=" ":C.children.push({type:"text",value:" "}),C.children.push(...m)}else d.push(...m);const y={type:"element",tagName:"li",properties:{id:t+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,y),a.push(y)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...vu(s),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const sc=function(e){if(e==null)return g3;if(typeof e=="function")return ac(e);if(typeof e=="object")return Array.isArray(e)?p3(e):h3(e);if(typeof e=="string")return m3(e);throw new Error("Expected function, string, or object as test")};function p3(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=sc(e[n]);return ac(r);function r(...i){let o=-1;for(;++o<t.length;)if(t[o].apply(this,i))return!0;return!1}}function h3(e){const t=e;return ac(n);function n(r){const i=r;let o;for(o in e)if(i[o]!==t[o])return!1;return!0}}function m3(e){return ac(t);function t(n){return n&&n.type===e}}function ac(e){return t;function t(n,r,i){return!!(y3(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function g3(){return!0}function y3(e){return e!==null&&typeof e=="object"&&"type"in e}const e0=[],v3=!0,op=!1,w3="skip";function t0(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const o=sc(i),s=r?-1:1;a(e,void 0,[])();function a(l,u,d){const c=l&&typeof l=="object"?l:{};if(typeof c.type=="string"){const p=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(l.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=e0,m,w,C;if((!t||o(l,u,d[d.length-1]||void 0))&&(p=_3(n(l,d)),p[0]===op))return p;if("children"in l&&l.children){const y=l;if(y.children&&p[0]!==w3)for(w=(r?y.children.length:-1)+s,C=d.concat(y);w>-1&&w<y.children.length;){const v=y.children[w];if(m=a(v,w,C)(),m[0]===op)return m;w=typeof m[1]=="number"?m[1]:w+s}}return p}}}function _3(e){return Array.isArray(e)?e:typeof e=="number"?[v3,e]:e==null?e0:[e]}function Sm(e,t,n,r){let i,o,s;typeof t=="function"&&typeof n!="function"?(o=void 0,s=t,i=n):(o=t,s=n,i=r),t0(e,o,a,i);function a(l,u){const d=u[u.length-1],c=d?d.children.indexOf(l):void 0;return s(l,c,d)}}const sp={}.hasOwnProperty,b3={};function x3(e,t){const n=t||b3,r=new Map,i=new Map,o=new Map,s={...o3,...n.handlers},a={all:u,applyData:S3,definitionById:r,footnoteById:i,footnoteCounts:o,footnoteOrder:[],handlers:s,one:l,options:n,patch:k3,wrap:E3};return Sm(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const c=d.type==="definition"?r:i,f=String(d.identifier).toUpperCase();c.has(f)||c.set(f,d)}}),a;function l(d,c){const f=d.type,p=a.handlers[f];if(sp.call(a.handlers,f)&&p)return p(a,d,c);if(a.options.passThrough&&a.options.passThrough.includes(f)){if("children"in d){const{children:w,...C}=d,y=vu(C);return y.children=a.all(d),y}return vu(d)}return(a.options.unknownHandler||I3)(a,d,c)}function u(d){const c=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const m=a.one(f[p],d);if(m){if(p&&f[p-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=rw(m.value)),!Array.isArray(m)&&m.type==="element")){const w=m.children[0];w&&w.type==="text"&&(w.value=rw(w.value))}Array.isArray(m)?c.push(...m):c.push(m)}}}return c}}function k3(e,t){e.position&&(t.position=dj(e))}function S3(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,o=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const s="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:s}}n.type==="element"&&o&&Object.assign(n.properties,vu(o)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function I3(e,t){const n=t.data||{},r="value"in t&&!(sp.call(n,"hProperties")||sp.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function E3(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function rw(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function iw(e,t){const n=x3(e,t),r=n.one(e,void 0),i=f3(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:`
`},i),o}function C3(e,t){return e&&"run"in e?async function(n,r){const i=iw(n,{file:r,...t});await e.run(i,r)}:function(n,r){return iw(n,{file:r,...e||t})}}function ow(e){if(e)throw e}var vl=Object.prototype.hasOwnProperty,n0=Object.prototype.toString,sw=Object.defineProperty,aw=Object.getOwnPropertyDescriptor,lw=function(t){return typeof Array.isArray=="function"?Array.isArray(t):n0.call(t)==="[object Array]"},uw=function(t){if(!t||n0.call(t)!=="[object Object]")return!1;var n=vl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&vl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||vl.call(t,i)},cw=function(t,n){sw&&n.name==="__proto__"?sw(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},dw=function(t,n){if(n==="__proto__")if(vl.call(t,n)){if(aw)return aw(t,n).value}else return;return t[n]},A3=function e(){var t,n,r,i,o,s,a=arguments[0],l=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},l=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});l<u;++l)if(t=arguments[l],t!=null)for(n in t)r=dw(a,n),i=dw(t,n),a!==i&&(d&&i&&(uw(i)||(o=lw(i)))?(o?(o=!1,s=r&&lw(r)?r:[]):s=r&&uw(r)?r:{},cw(a,{name:n,newValue:e(d,s,i)})):typeof i<"u"&&cw(a,{name:n,newValue:i}));return a};const fd=dp(A3);function ap(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function T3(){const e=[],t={run:n,use:r};return t;function n(...i){let o=-1;const s=i.pop();if(typeof s!="function")throw new TypeError("Expected function as last argument, not "+s);a(null,...i);function a(l,...u){const d=e[++o];let c=-1;if(l){s(l);return}for(;++c<i.length;)(u[c]===null||u[c]===void 0)&&(u[c]=i[c]);i=u,d?R3(d,a)(...u):s(null,...u)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function R3(e,t){let n;return r;function r(...s){const a=e.length>s.length;let l;a&&s.push(i);try{l=e.apply(this,s)}catch(u){const d=u;if(a&&n)throw d;return i(d)}a||(l&&l.then&&typeof l.then=="function"?l.then(o,i):l instanceof Error?i(l):o(l))}function i(s,...a){n||(n=!0,t(s,...a))}function o(s){i(null,s)}}const Rn={basename:N3,dirname:P3,extname:D3,join:O3,sep:"/"};function N3(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');wa(e);let n=0,r=-1,i=e.length,o;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else r<0&&(o=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let s=-1,a=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else s<0&&(o=!0,s=i+1),a>-1&&(e.codePointAt(i)===t.codePointAt(a--)?a<0&&(r=i):(a=-1,r=s));return n===r?r=s:r<0&&(r=e.length),e.slice(n,r)}function P3(e){if(wa(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function D3(e){wa(e);let t=e.length,n=-1,r=0,i=-1,o=0,s;for(;t--;){const a=e.codePointAt(t);if(a===47){if(s){r=t+1;break}continue}n<0&&(s=!0,n=t+1),a===46?i<0?i=t:o!==1&&(o=1):i>-1&&(o=-1)}return i<0||n<0||o===0||o===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function O3(...e){let t=-1,n;for(;++t<e.length;)wa(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":L3(n)}function L3(e){wa(e);const t=e.codePointAt(0)===47;let n=M3(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function M3(e,t){let n="",r=0,i=-1,o=0,s=-1,a,l;for(;++s<=e.length;){if(s<e.length)a=e.codePointAt(s);else{if(a===47)break;a=47}if(a===47){if(!(i===s-1||o===1))if(i!==s-1&&o===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(l=n.lastIndexOf("/"),l!==n.length-1){l<0?(n="",r=0):(n=n.slice(0,l),r=n.length-1-n.lastIndexOf("/")),i=s,o=0;continue}}else if(n.length>0){n="",r=0,i=s,o=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,s):n=e.slice(i+1,s),r=s-i-1;i=s,o=0}else a===46&&o>-1?o++:o=-1}return n}function wa(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const j3={cwd:F3};function F3(){return"/"}function lp(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function U3(e){if(typeof e=="string")e=new URL(e);else if(!lp(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return z3(e)}function z3(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const pd=["history","path","basename","stem","extname","dirname"];class r0{constructor(t){let n;t?lp(t)?n={path:t}:typeof t=="string"||B3(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":j3.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<pd.length;){const o=pd[r];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let i;for(i in n)pd.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?Rn.basename(this.path):void 0}set basename(t){md(t,"basename"),hd(t,"basename"),this.path=Rn.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Rn.dirname(this.path):void 0}set dirname(t){fw(this.basename,"dirname"),this.path=Rn.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Rn.extname(this.path):void 0}set extname(t){if(hd(t,"extname"),fw(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Rn.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){lp(t)&&(t=U3(t)),md(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Rn.basename(this.path,this.extname):void 0}set stem(t){md(t,"stem"),hd(t,"stem"),this.path=Rn.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new xt(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function hd(e,t){if(e&&e.includes(Rn.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Rn.sep+"`")}function md(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function fw(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function B3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const V3=function(e){const r=this.constructor.prototype,i=r[e],o=function(){return i.apply(o,arguments)};return Object.setPrototypeOf(o,r),o},$3={}.hasOwnProperty;class Im extends V3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=T3()}copy(){const t=new Im;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(fd(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(vd("data",this.frozen),this.namespace[t]=n,this):$3.call(this.namespace,t)&&this.namespace[t]||void 0:t?(vd("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=Ya(t),r=this.parser||this.Parser;return gd("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),gd("process",this.parser||this.Parser),yd("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(o,s){const a=Ya(t),l=r.parse(a);r.run(l,a,function(d,c,f){if(d||!c||!f)return u(d);const p=c,m=r.stringify(p,f);q3(m)?f.value=m:f.result=m,u(d,f)});function u(d,c){d||!c?s(d):o?o(c):n(void 0,c)}}}processSync(t){let n=!1,r;return this.freeze(),gd("processSync",this.parser||this.Parser),yd("processSync",this.compiler||this.Compiler),this.process(t,i),hw("processSync","process",n),r;function i(o,s){n=!0,ow(o),r=s}}run(t,n,r){pw(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?o(void 0,r):new Promise(o);function o(s,a){const l=Ya(n);i.run(t,l,u);function u(d,c,f){const p=c||t;d?a(d):s?s(p):r(void 0,p,f)}}}runSync(t,n){let r=!1,i;return this.run(t,n,o),hw("runSync","run",r),i;function o(s,a){ow(s),i=a,r=!0}}stringify(t,n){this.freeze();const r=Ya(n),i=this.compiler||this.Compiler;return yd("stringify",i),pw(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(vd("use",this.frozen),t!=null)if(typeof t=="function")l(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):s(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function o(u){if(typeof u=="function")l(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...c]=u;l(d,c)}else s(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function s(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(i.settings=fd(!0,i.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const c=u[d];o(c)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function l(u,d){let c=-1,f=-1;for(;++c<r.length;)if(r[c][0]===u){f=c;break}if(f===-1)r.push([u,...d]);else if(d.length>0){let[p,...m]=d;const w=r[f][1];ap(w)&&ap(p)&&(p=fd(!0,w,p)),r[f]=[u,p,...m]}}}}const H3=new Im().freeze();function gd(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function yd(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function vd(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function pw(e){if(!ap(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function hw(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function Ya(e){return W3(e)?e:new r0(e)}function W3(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function q3(e){return typeof e=="string"||K3(e)}function K3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const G3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",mw=[],gw={allowDangerousHtml:!0},Y3=/^(https?|ircs?|mailto|xmpp)$/i,Q3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function J3(e){const t=X3(e),n=Z3(e);return e4(t.runSync(t.parse(n),n),e)}function X3(e){const t=e.rehypePlugins||mw,n=e.remarkPlugins||mw,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...gw}:gw;return H3().use(DF).use(n).use(C3,r).use(t)}function Z3(e){const t=e.children||"",n=new r0;return typeof t=="string"&&(n.value=t),n}function e4(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,o=t.disallowedElements,s=t.skipHtml,a=t.unwrapDisallowed,l=t.urlTransform||t4;for(const d of Q3)Object.hasOwn(t,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+G3+d.id,void 0);return Sm(e,u),gj(e,{Fragment:h.Fragment,components:i,ignoreInvalidStyle:!0,jsx:h.jsx,jsxs:h.jsxs,passKeys:!0,passNode:!0});function u(d,c,f){if(d.type==="raw"&&f&&typeof c=="number")return s?f.children.splice(c,1):f.children[c]={type:"text",value:d.value},c;if(d.type==="element"){let p;for(p in ud)if(Object.hasOwn(ud,p)&&Object.hasOwn(d.properties,p)){const m=d.properties[p],w=ud[p];(w===null||w.includes(d.tagName))&&(d.properties[p]=l(String(m||""),p,d))}}if(d.type==="element"){let p=n?!n.includes(d.tagName):o?o.includes(d.tagName):!1;if(!p&&r&&typeof c=="number"&&(p=!r(d,c,f)),p&&f&&typeof c=="number")return a&&d.children?f.children.splice(c,1,...d.children):f.children.splice(c,1),c}}}function t4(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||Y3.test(e.slice(0,t))?e:""}function yw(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function n4(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function r4(e,t,n){const i=sc((n||{}).ignore||[]),o=i4(t);let s=-1;for(;++s<o.length;)t0(e,"text",a);function a(u,d){let c=-1,f;for(;++c<d.length;){const p=d[c],m=f?f.children:void 0;if(i(p,m?m.indexOf(p):void 0,f))return;f=p}if(f)return l(u,d)}function l(u,d){const c=d[d.length-1],f=o[s][0],p=o[s][1];let m=0;const C=c.children.indexOf(u);let y=!1,v=[];f.lastIndex=0;let g=f.exec(u.value);for(;g;){const k=g.index,S={index:g.index,input:g.input,stack:[...d,u]};let _=p(...g,S);if(typeof _=="string"&&(_=_.length>0?{type:"text",value:_}:void 0),_===!1?f.lastIndex=k+1:(m!==k&&v.push({type:"text",value:u.value.slice(m,k)}),Array.isArray(_)?v.push(..._):_&&v.push(_),m=k+g[0].length,y=!0),!f.global)break;g=f.exec(u.value)}return y?(m<u.value.length&&v.push({type:"text",value:u.value.slice(m)}),c.children.splice(C,1,...v)):v=[u],C+v.length}}function i4(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const i=n[r];t.push([o4(i[0]),s4(i[1])])}return t}function o4(e){return typeof e=="string"?new RegExp(n4(e),"g"):e}function s4(e){return typeof e=="function"?e:function(){return e}}const wd="phrasing",_d=["autolink","link","image","label"];function a4(){return{transforms:[h4],enter:{literalAutolink:u4,literalAutolinkEmail:bd,literalAutolinkHttp:bd,literalAutolinkWww:bd},exit:{literalAutolink:p4,literalAutolinkEmail:f4,literalAutolinkHttp:c4,literalAutolinkWww:d4}}}function l4(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:wd,notInConstruct:_d},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:wd,notInConstruct:_d},{character:":",before:"[ps]",after:"\\/",inConstruct:wd,notInConstruct:_d}]}}function u4(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function bd(e){this.config.enter.autolinkProtocol.call(this,e)}function c4(e){this.config.exit.autolinkProtocol.call(this,e)}function d4(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function f4(e){this.config.exit.autolinkEmail.call(this,e)}function p4(e){this.exit(e)}function h4(e){r4(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,m4],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),g4]],{ignore:["link","linkReference"]})}function m4(e,t,n,r,i){let o="";if(!i0(i)||(/^w/i.test(t)&&(n=t+n,t="",o="http://"),!y4(n)))return!1;const s=v4(n+r);if(!s[0])return!1;const a={type:"link",title:null,url:o+t+s[0],children:[{type:"text",value:t+s[0]}]};return s[1]?[a,{type:"text",value:s[1]}]:a}function g4(e,t,n,r){return!i0(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function y4(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function v4(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const i=yw(e,"(");let o=yw(e,")");for(;r!==-1&&i>o;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),o++;return[e,n]}function i0(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||ki(n)||rc(n))&&(!t||n!==47)}o0.peek=C4;function w4(){this.buffer()}function _4(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function b4(){this.buffer()}function x4(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function k4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_n(this.sliceSerialize(e)).toLowerCase(),n.label=t}function S4(e){this.exit(e)}function I4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_n(this.sliceSerialize(e)).toLowerCase(),n.label=t}function E4(e){this.exit(e)}function C4(){return"["}function o0(e,t,n,r){const i=n.createTracker(r);let o=i.move("[^");const s=n.enter("footnoteReference"),a=n.enter("reference");return o+=i.move(n.safe(n.associationId(e),{after:"]",before:o})),a(),s(),o+=i.move("]"),o}function A4(){return{enter:{gfmFootnoteCallString:w4,gfmFootnoteCall:_4,gfmFootnoteDefinitionLabelString:b4,gfmFootnoteDefinition:x4},exit:{gfmFootnoteCallString:k4,gfmFootnoteCall:S4,gfmFootnoteDefinitionLabelString:I4,gfmFootnoteDefinition:E4}}}function T4(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:o0},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function n(r,i,o,s){const a=o.createTracker(s);let l=a.move("[^");const u=o.enter("footnoteDefinition"),d=o.enter("label");return l+=a.move(o.safe(o.associationId(r),{before:l,after:"]"})),d(),l+=a.move("]:"),r.children&&r.children.length>0&&(a.shift(4),l+=a.move((t?`
`:" ")+o.indentLines(o.containerFlow(r,a.current()),t?s0:R4))),u(),l}}function R4(e,t,n){return t===0?e:s0(e,t,n)}function s0(e,t,n){return(n?"":"    ")+e}const N4=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];a0.peek=M4;function P4(){return{canContainEols:["delete"],enter:{strikethrough:O4},exit:{strikethrough:L4}}}function D4(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:N4}],handlers:{delete:a0}}}function O4(e){this.enter({type:"delete",children:[]},e)}function L4(e){this.exit(e)}function a0(e,t,n,r){const i=n.createTracker(r),o=n.enter("strikethrough");let s=i.move("~~");return s+=n.containerPhrasing(e,{...i.current(),before:s,after:"~"}),s+=i.move("~~"),o(),s}function M4(){return"~"}function j4(e){return e.length}function F4(e,t){const n=t||{},r=(n.align||[]).concat(),i=n.stringLength||j4,o=[],s=[],a=[],l=[];let u=0,d=-1;for(;++d<e.length;){const w=[],C=[];let y=-1;for(e[d].length>u&&(u=e[d].length);++y<e[d].length;){const v=U4(e[d][y]);if(n.alignDelimiters!==!1){const g=i(v);C[y]=g,(l[y]===void 0||g>l[y])&&(l[y]=g)}w.push(v)}s[d]=w,a[d]=C}let c=-1;if(typeof r=="object"&&"length"in r)for(;++c<u;)o[c]=vw(r[c]);else{const w=vw(r);for(;++c<u;)o[c]=w}c=-1;const f=[],p=[];for(;++c<u;){const w=o[c];let C="",y="";w===99?(C=":",y=":"):w===108?C=":":w===114&&(y=":");let v=n.alignDelimiters===!1?1:Math.max(1,l[c]-C.length-y.length);const g=C+"-".repeat(v)+y;n.alignDelimiters!==!1&&(v=C.length+v+y.length,v>l[c]&&(l[c]=v),p[c]=v),f[c]=g}s.splice(1,0,f),a.splice(1,0,p),d=-1;const m=[];for(;++d<s.length;){const w=s[d],C=a[d];c=-1;const y=[];for(;++c<u;){const v=w[c]||"";let g="",k="";if(n.alignDelimiters!==!1){const S=l[c]-(C[c]||0),_=o[c];_===114?g=" ".repeat(S):_===99?S%2?(g=" ".repeat(S/2+.5),k=" ".repeat(S/2-.5)):(g=" ".repeat(S/2),k=g):k=" ".repeat(S)}n.delimiterStart!==!1&&!c&&y.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&v==="")&&(n.delimiterStart!==!1||c)&&y.push(" "),n.alignDelimiters!==!1&&y.push(g),y.push(v),n.alignDelimiters!==!1&&y.push(k),n.padding!==!1&&y.push(" "),(n.delimiterEnd!==!1||c!==u-1)&&y.push("|")}m.push(n.delimiterEnd===!1?y.join("").replace(/ +$/,""):y.join(""))}return m.join(`
`)}function U4(e){return e==null?"":String(e)}function vw(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function z4(e,t,n,r){const i=n.enter("blockquote"),o=n.createTracker(r);o.move("> "),o.shift(2);const s=n.indentLines(n.containerFlow(e,o.current()),B4);return i(),s}function B4(e,t,n){return">"+(n?"":" ")+e}function V4(e,t){return ww(e,t.inConstruct,!0)&&!ww(e,t.notInConstruct,!1)}function ww(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function _w(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&V4(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function $4(e,t){const n=String(e);let r=n.indexOf(t),i=r,o=0,s=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===i?++o>s&&(s=o):o=1,i=r+t.length,r=n.indexOf(t,i);return s}function H4(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function W4(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function q4(e,t,n,r){const i=W4(n),o=e.value||"",s=i==="`"?"GraveAccent":"Tilde";if(H4(e,n)){const c=n.enter("codeIndented"),f=n.indentLines(o,K4);return c(),f}const a=n.createTracker(r),l=i.repeat(Math.max($4(o,i)+1,3)),u=n.enter("codeFenced");let d=a.move(l);if(e.lang){const c=n.enter(`codeFencedLang${s}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),c()}if(e.lang&&e.meta){const c=n.enter(`codeFencedMeta${s}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),c()}return d+=a.move(`
`),o&&(d+=a.move(o+`
`)),d+=a.move(l),u(),d}function K4(e,t,n){return(n?"":"    ")+e}function Em(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function G4(e,t,n,r){const i=Em(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("definition");let a=n.enter("label");const l=n.createTracker(r);let u=l.move("[");return u+=l.move(n.safe(n.associationId(e),{before:u,after:"]",...l.current()})),u+=l.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(a=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...l.current()}))),a(),e.title&&(a=n.enter(`title${o}`),u+=l.move(" "+i),u+=l.move(n.safe(e.title,{before:u,after:i,...l.current()})),u+=l.move(i),a()),s(),u}function Y4(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function Ws(e){return"&#x"+e.toString(16).toUpperCase()+";"}function wu(e,t,n){const r=yo(e),i=yo(t);return r===void 0?i===void 0?n==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}l0.peek=Q4;function l0(e,t,n,r){const i=Y4(n),o=n.enter("emphasis"),s=n.createTracker(r),a=s.move(i);let l=s.move(n.containerPhrasing(e,{after:i,before:a,...s.current()}));const u=l.charCodeAt(0),d=wu(r.before.charCodeAt(r.before.length-1),u,i);d.inside&&(l=Ws(u)+l.slice(1));const c=l.charCodeAt(l.length-1),f=wu(r.after.charCodeAt(0),c,i);f.inside&&(l=l.slice(0,-1)+Ws(c));const p=s.move(i);return o(),n.attentionEncodeSurroundingInfo={after:f.outside,before:d.outside},a+l+p}function Q4(e,t,n){return n.options.emphasis||"*"}function J4(e,t){let n=!1;return Sm(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,op}),!!((!e.depth||e.depth<3)&&ym(e)&&(t.options.setext||n))}function X4(e,t,n,r){const i=Math.max(Math.min(6,e.depth||1),1),o=n.createTracker(r);if(J4(e,n)){const d=n.enter("headingSetext"),c=n.enter("phrasing"),f=n.containerPhrasing(e,{...o.current(),before:`
`,after:`
`});return c(),d(),f+`
`+(i===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const s="#".repeat(i),a=n.enter("headingAtx"),l=n.enter("phrasing");o.move(s+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...o.current()});return/^[\t ]/.test(u)&&(u=Ws(u.charCodeAt(0))+u.slice(1)),u=u?s+" "+u:s,n.options.closeAtx&&(u+=" "+s),l(),a(),u}u0.peek=Z4;function u0(e){return e.value||""}function Z4(){return"<"}c0.peek=eU;function c0(e,t,n,r){const i=Em(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("image");let a=n.enter("label");const l=n.createTracker(r);let u=l.move("![");return u+=l.move(n.safe(e.alt,{before:u,after:"]",...l.current()})),u+=l.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(a=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":")",...l.current()}))),a(),e.title&&(a=n.enter(`title${o}`),u+=l.move(" "+i),u+=l.move(n.safe(e.title,{before:u,after:i,...l.current()})),u+=l.move(i),a()),u+=l.move(")"),s(),u}function eU(){return"!"}d0.peek=tU;function d0(e,t,n,r){const i=e.referenceType,o=n.enter("imageReference");let s=n.enter("label");const a=n.createTracker(r);let l=a.move("![");const u=n.safe(e.alt,{before:l,after:"]",...a.current()});l+=a.move(u+"]["),s();const d=n.stack;n.stack=[],s=n.enter("reference");const c=n.safe(n.associationId(e),{before:l,after:"]",...a.current()});return s(),n.stack=d,o(),i==="full"||!u||u!==c?l+=a.move(c+"]"):i==="shortcut"?l=l.slice(0,-1):l+=a.move("]"),l}function tU(){return"!"}f0.peek=nU;function f0(e,t,n){let r=e.value||"",i="`",o=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++o<n.unsafe.length;){const s=n.unsafe[o],a=n.compilePattern(s);let l;if(s.atBreak)for(;l=a.exec(r);){let u=l.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(l.index+1)}}return i+r+i}function nU(){return"`"}function p0(e,t){const n=ym(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}h0.peek=rU;function h0(e,t,n,r){const i=Em(n),o=i==='"'?"Quote":"Apostrophe",s=n.createTracker(r);let a,l;if(p0(e,n)){const d=n.stack;n.stack=[],a=n.enter("autolink");let c=s.move("<");return c+=s.move(n.containerPhrasing(e,{before:c,after:">",...s.current()})),c+=s.move(">"),a(),n.stack=d,c}a=n.enter("link"),l=n.enter("label");let u=s.move("[");return u+=s.move(n.containerPhrasing(e,{before:u,after:"](",...s.current()})),u+=s.move("]("),l(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(l=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),l(),e.title&&(l=n.enter(`title${o}`),u+=s.move(" "+i),u+=s.move(n.safe(e.title,{before:u,after:i,...s.current()})),u+=s.move(i),l()),u+=s.move(")"),a(),u}function rU(e,t,n){return p0(e,n)?"<":"["}m0.peek=iU;function m0(e,t,n,r){const i=e.referenceType,o=n.enter("linkReference");let s=n.enter("label");const a=n.createTracker(r);let l=a.move("[");const u=n.containerPhrasing(e,{before:l,after:"]",...a.current()});l+=a.move(u+"]["),s();const d=n.stack;n.stack=[],s=n.enter("reference");const c=n.safe(n.associationId(e),{before:l,after:"]",...a.current()});return s(),n.stack=d,o(),i==="full"||!u||u!==c?l+=a.move(c+"]"):i==="shortcut"?l=l.slice(0,-1):l+=a.move("]"),l}function iU(){return"["}function Cm(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function oU(e){const t=Cm(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function sU(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function g0(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function aU(e,t,n,r){const i=n.enter("list"),o=n.bulletCurrent;let s=e.ordered?sU(n):Cm(n);const a=e.ordered?s==="."?")":".":oU(n);let l=t&&n.bulletLastUsed?s===n.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((s==="*"||s==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(l=!0),g0(n)===s&&d){let c=-1;for(;++c<e.children.length;){const f=e.children[c];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){l=!0;break}}}}l&&(s=a),n.bulletCurrent=s;const u=n.containerFlow(e,r);return n.bulletLastUsed=s,n.bulletCurrent=o,i(),u}function lU(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function uU(e,t,n,r){const i=lU(n);let o=n.bulletCurrent||Cm(n);t&&t.type==="list"&&t.ordered&&(o=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+o);let s=o.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(s=Math.ceil(s/4)*4);const a=n.createTracker(r);a.move(o+" ".repeat(s-o.length)),a.shift(s);const l=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,a.current()),d);return l(),u;function d(c,f,p){return f?(p?"":" ".repeat(s))+c:(p?o:o+" ".repeat(s-o.length))+c}}function cU(e,t,n,r){const i=n.enter("paragraph"),o=n.enter("phrasing"),s=n.containerPhrasing(e,r);return o(),i(),s}const dU=sc(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function fU(e,t,n,r){return(e.children.some(function(s){return dU(s)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function pU(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}y0.peek=hU;function y0(e,t,n,r){const i=pU(n),o=n.enter("strong"),s=n.createTracker(r),a=s.move(i+i);let l=s.move(n.containerPhrasing(e,{after:i,before:a,...s.current()}));const u=l.charCodeAt(0),d=wu(r.before.charCodeAt(r.before.length-1),u,i);d.inside&&(l=Ws(u)+l.slice(1));const c=l.charCodeAt(l.length-1),f=wu(r.after.charCodeAt(0),c,i);f.inside&&(l=l.slice(0,-1)+Ws(c));const p=s.move(i+i);return o(),n.attentionEncodeSurroundingInfo={after:f.outside,before:d.outside},a+l+p}function hU(e,t,n){return n.options.strong||"*"}function mU(e,t,n,r){return n.safe(e.value,r)}function gU(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function yU(e,t,n){const r=(g0(n)+(n.options.ruleSpaces?" ":"")).repeat(gU(n));return n.options.ruleSpaces?r.slice(0,-1):r}const v0={blockquote:z4,break:_w,code:q4,definition:G4,emphasis:l0,hardBreak:_w,heading:X4,html:u0,image:c0,imageReference:d0,inlineCode:f0,link:h0,linkReference:m0,list:aU,listItem:uU,paragraph:cU,root:fU,strong:y0,text:mU,thematicBreak:yU};function vU(){return{enter:{table:wU,tableData:bw,tableHeader:bw,tableRow:bU},exit:{codeText:xU,table:_U,tableData:xd,tableHeader:xd,tableRow:xd}}}function wU(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function _U(e){this.exit(e),this.data.inTable=void 0}function bU(e){this.enter({type:"tableRow",children:[]},e)}function xd(e){this.exit(e)}function bw(e){this.enter({type:"tableCell",children:[]},e)}function xU(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,kU));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function kU(e,t){return t==="|"?t:e}function SU(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,o=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:s,tableCell:l,tableRow:a}};function s(p,m,w,C){return u(d(p,w,C),p.align)}function a(p,m,w,C){const y=c(p,w,C),v=u([y]);return v.slice(0,v.indexOf(`
`))}function l(p,m,w,C){const y=w.enter("tableCell"),v=w.enter("phrasing"),g=w.containerPhrasing(p,{...C,before:o,after:o});return v(),y(),g}function u(p,m){return F4(p,{align:m,alignDelimiters:r,padding:n,stringLength:i})}function d(p,m,w){const C=p.children;let y=-1;const v=[],g=m.enter("table");for(;++y<C.length;)v[y]=c(C[y],m,w);return g(),v}function c(p,m,w){const C=p.children;let y=-1;const v=[],g=m.enter("tableRow");for(;++y<C.length;)v[y]=l(C[y],p,m,w);return g(),v}function f(p,m,w){let C=v0.inlineCode(p,m,w);return w.stack.includes("tableCell")&&(C=C.replace(/\|/g,"\\$&")),C}}function IU(){return{exit:{taskListCheckValueChecked:xw,taskListCheckValueUnchecked:xw,paragraph:CU}}}function EU(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:AU}}}function xw(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function CU(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const i=t.children;let o=-1,s;for(;++o<i.length;){const a=i[o];if(a.type==="paragraph"){s=a;break}}s===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function AU(e,t,n,r){const i=e.children[0],o=typeof e.checked=="boolean"&&i&&i.type==="paragraph",s="["+(e.checked?"x":" ")+"] ",a=n.createTracker(r);o&&a.move(s);let l=v0.listItem(e,t,n,{...r,...a.current()});return o&&(l=l.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),l;function u(d){return d+s}}function TU(){return[a4(),A4(),P4(),vU(),IU()]}function RU(e){return{extensions:[l4(),T4(e),D4(),SU(e),EU()]}}const NU={tokenize:jU,partial:!0},w0={tokenize:FU,partial:!0},_0={tokenize:UU,partial:!0},b0={tokenize:zU,partial:!0},PU={tokenize:BU,partial:!0},x0={name:"wwwAutolink",tokenize:LU,previous:S0},k0={name:"protocolAutolink",tokenize:MU,previous:I0},or={name:"emailAutolink",tokenize:OU,previous:E0},Fn={};function DU(){return{text:Fn}}let Gr=48;for(;Gr<123;)Fn[Gr]=or,Gr++,Gr===58?Gr=65:Gr===91&&(Gr=97);Fn[43]=or;Fn[45]=or;Fn[46]=or;Fn[95]=or;Fn[72]=[or,k0];Fn[104]=[or,k0];Fn[87]=[or,x0];Fn[119]=[or,x0];function OU(e,t,n){const r=this;let i,o;return s;function s(c){return!up(c)||!E0.call(r,r.previous)||Am(r.events)?n(c):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(c))}function a(c){return up(c)?(e.consume(c),a):c===64?(e.consume(c),l):n(c)}function l(c){return c===46?e.check(PU,d,u)(c):c===45||c===95||_t(c)?(o=!0,e.consume(c),l):d(c)}function u(c){return e.consume(c),i=!0,l}function d(c){return o&&i&&It(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(c)):n(c)}}function LU(e,t,n){const r=this;return i;function i(s){return s!==87&&s!==119||!S0.call(r,r.previous)||Am(r.events)?n(s):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(NU,e.attempt(w0,e.attempt(_0,o),n),n)(s))}function o(s){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(s)}}function MU(e,t,n){const r=this;let i="",o=!1;return s;function s(c){return(c===72||c===104)&&I0.call(r,r.previous)&&!Am(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(c),e.consume(c),a):n(c)}function a(c){if(It(c)&&i.length<5)return i+=String.fromCodePoint(c),e.consume(c),a;if(c===58){const f=i.toLowerCase();if(f==="http"||f==="https")return e.consume(c),l}return n(c)}function l(c){return c===47?(e.consume(c),o?u:(o=!0,l)):n(c)}function u(c){return c===null||gu(c)||Ee(c)||ki(c)||rc(c)?n(c):e.attempt(w0,e.attempt(_0,d),n)(c)}function d(c){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(c)}}function jU(e,t,n){let r=0;return i;function i(s){return(s===87||s===119)&&r<3?(r++,e.consume(s),i):s===46&&r===3?(e.consume(s),o):n(s)}function o(s){return s===null?n(s):t(s)}}function FU(e,t,n){let r,i,o;return s;function s(u){return u===46||u===95?e.check(b0,l,a)(u):u===null||Ee(u)||ki(u)||u!==45&&rc(u)?l(u):(o=!0,e.consume(u),s)}function a(u){return u===95?r=!0:(i=r,r=void 0),e.consume(u),s}function l(u){return i||r||!o?n(u):t(u)}}function UU(e,t){let n=0,r=0;return i;function i(s){return s===40?(n++,e.consume(s),i):s===41&&r<n?o(s):s===33||s===34||s===38||s===39||s===41||s===42||s===44||s===46||s===58||s===59||s===60||s===63||s===93||s===95||s===126?e.check(b0,t,o)(s):s===null||Ee(s)||ki(s)?t(s):(e.consume(s),i)}function o(s){return s===41&&r++,e.consume(s),i}}function zU(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),o):a===93?(e.consume(a),i):a===60||a===null||Ee(a)||ki(a)?t(a):n(a)}function i(a){return a===null||a===40||a===91||Ee(a)||ki(a)?t(a):r(a)}function o(a){return It(a)?s(a):n(a)}function s(a){return a===59?(e.consume(a),r):It(a)?(e.consume(a),s):n(a)}}function BU(e,t,n){return r;function r(o){return e.consume(o),i}function i(o){return _t(o)?n(o):t(o)}}function S0(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||Ee(e)}function I0(e){return!It(e)}function E0(e){return!(e===47||up(e))}function up(e){return e===43||e===45||e===46||e===95||_t(e)}function Am(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const VU={tokenize:QU,partial:!0};function $U(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:KU,continuation:{tokenize:GU},exit:YU}},text:{91:{name:"gfmFootnoteCall",tokenize:qU},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:HU,resolveTo:WU}}}}function HU(e,t,n){const r=this;let i=r.events.length;const o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let s;for(;i--;){const l=r.events[i][1];if(l.type==="labelImage"){s=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!s||!s._balanced)return n(l);const u=_n(r.sliceSerialize({start:s.end,end:r.now()}));return u.codePointAt(0)!==94||!o.includes(u.slice(1))?n(l):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(l),e.exit("gfmFootnoteCallLabelMarker"),t(l))}}function WU(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;const o={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},s={type:"chunkString",contentType:"string",start:Object.assign({},o.start),end:Object.assign({},o.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",o,t],["enter",s,t],["exit",s,t],["exit",o,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function qU(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o=0,s;return a;function a(c){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),l}function l(c){return c!==94?n(c):(e.enter("gfmFootnoteCallMarker"),e.consume(c),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(c){if(o>999||c===93&&!s||c===null||c===91||Ee(c))return n(c);if(c===93){e.exit("chunkString");const f=e.exit("gfmFootnoteCallString");return i.includes(_n(r.sliceSerialize(f)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(c)}return Ee(c)||(s=!0),o++,e.consume(c),c===92?d:u}function d(c){return c===91||c===92||c===93?(e.consume(c),o++,u):u(c)}}function KU(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o,s=0,a;return l;function l(m){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(m){return m===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(m)}function d(m){if(s>999||m===93&&!a||m===null||m===91||Ee(m))return n(m);if(m===93){e.exit("chunkString");const w=e.exit("gfmFootnoteDefinitionLabelString");return o=_n(r.sliceSerialize(w)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),f}return Ee(m)||(a=!0),s++,e.consume(m),m===92?c:d}function c(m){return m===91||m===92||m===93?(e.consume(m),s++,d):d(m)}function f(m){return m===58?(e.enter("definitionMarker"),e.consume(m),e.exit("definitionMarker"),i.includes(o)||i.push(o),me(e,p,"gfmFootnoteDefinitionWhitespace")):n(m)}function p(m){return t(m)}}function GU(e,t,n){return e.check(va,t,e.attempt(VU,t,n))}function YU(e){e.exit("gfmFootnoteDefinition")}function QU(e,t,n){const r=this;return me(e,i,"gfmFootnoteDefinitionIndent",5);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="gfmFootnoteDefinitionIndent"&&s[2].sliceSerialize(s[1],!0).length===4?t(o):n(o)}}function JU(e){let n=(e||{}).singleTilde;const r={name:"strikethrough",tokenize:o,resolveAll:i};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function i(s,a){let l=-1;for(;++l<s.length;)if(s[l][0]==="enter"&&s[l][1].type==="strikethroughSequenceTemporary"&&s[l][1]._close){let u=l;for(;u--;)if(s[u][0]==="exit"&&s[u][1].type==="strikethroughSequenceTemporary"&&s[u][1]._open&&s[l][1].end.offset-s[l][1].start.offset===s[u][1].end.offset-s[u][1].start.offset){s[l][1].type="strikethroughSequence",s[u][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},s[u][1].start),end:Object.assign({},s[l][1].end)},c={type:"strikethroughText",start:Object.assign({},s[u][1].end),end:Object.assign({},s[l][1].start)},f=[["enter",d,a],["enter",s[u][1],a],["exit",s[u][1],a],["enter",c,a]],p=a.parser.constructs.insideSpan.null;p&&Kt(f,f.length,0,ic(p,s.slice(u+1,l),a)),Kt(f,f.length,0,[["exit",c,a],["enter",s[l][1],a],["exit",s[l][1],a],["exit",d,a]]),Kt(s,u-1,l-u+3,f),l=u+f.length-2;break}}for(l=-1;++l<s.length;)s[l][1].type==="strikethroughSequenceTemporary"&&(s[l][1].type="data");return s}function o(s,a,l){const u=this.previous,d=this.events;let c=0;return f;function f(m){return u===126&&d[d.length-1][1].type!=="characterEscape"?l(m):(s.enter("strikethroughSequenceTemporary"),p(m))}function p(m){const w=yo(u);if(m===126)return c>1?l(m):(s.consume(m),c++,p);if(c<2&&!n)return l(m);const C=s.exit("strikethroughSequenceTemporary"),y=yo(m);return C._open=!y||y===2&&!!w,C._close=!w||w===2&&!!y,a(m)}}}class XU{constructor(){this.map=[]}add(t,n,r){ZU(this,t,n,r)}consume(t){if(this.map.sort(function(o,s){return o[0]-s[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push(t.slice()),t.length=0;let i=r.pop();for(;i;){for(const o of i)t.push(o);i=r.pop()}this.map.length=0}}function ZU(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function ez(e,t){let n=!1;const r=[];for(;t<e.length;){const i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const o=r.length-1;r[o]=r[o]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function tz(){return{flow:{null:{name:"table",tokenize:nz,resolveAll:rz}}}}function nz(e,t,n){const r=this;let i=0,o=0,s;return a;function a(E){let D=r.events.length-1;for(;D>-1;){const Z=r.events[D][1].type;if(Z==="lineEnding"||Z==="linePrefix")D--;else break}const z=D>-1?r.events[D][1].type:null,K=z==="tableHead"||z==="tableRow"?_:l;return K===_&&r.parser.lazy[r.now().line]?n(E):K(E)}function l(E){return e.enter("tableHead"),e.enter("tableRow"),u(E)}function u(E){return E===124||(s=!0,o+=1),d(E)}function d(E){return E===null?n(E):G(E)?o>1?(o=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(E),e.exit("lineEnding"),p):n(E):le(E)?me(e,d,"whitespace")(E):(o+=1,s&&(s=!1,i+=1),E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),s=!0,d):(e.enter("data"),c(E)))}function c(E){return E===null||E===124||Ee(E)?(e.exit("data"),d(E)):(e.consume(E),E===92?f:c)}function f(E){return E===92||E===124?(e.consume(E),c):c(E)}function p(E){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(E):(e.enter("tableDelimiterRow"),s=!1,le(E)?me(e,m,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(E):m(E))}function m(E){return E===45||E===58?C(E):E===124?(s=!0,e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),w):S(E)}function w(E){return le(E)?me(e,C,"whitespace")(E):C(E)}function C(E){return E===58?(o+=1,s=!0,e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),y):E===45?(o+=1,y(E)):E===null||G(E)?k(E):S(E)}function y(E){return E===45?(e.enter("tableDelimiterFiller"),v(E)):S(E)}function v(E){return E===45?(e.consume(E),v):E===58?(s=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),g):(e.exit("tableDelimiterFiller"),g(E))}function g(E){return le(E)?me(e,k,"whitespace")(E):k(E)}function k(E){return E===124?m(E):E===null||G(E)?!s||i!==o?S(E):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(E)):S(E)}function S(E){return n(E)}function _(E){return e.enter("tableRow"),A(E)}function A(E){return E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),A):E===null||G(E)?(e.exit("tableRow"),t(E)):le(E)?me(e,A,"whitespace")(E):(e.enter("data"),R(E))}function R(E){return E===null||E===124||Ee(E)?(e.exit("data"),A(E)):(e.consume(E),E===92?O:R)}function O(E){return E===92||E===124?(e.consume(E),R):R(E)}}function rz(e,t){let n=-1,r=!0,i=0,o=[0,0,0,0],s=[0,0,0,0],a=!1,l=0,u,d,c;const f=new XU;for(;++n<e.length;){const p=e[n],m=p[1];p[0]==="enter"?m.type==="tableHead"?(a=!1,l!==0&&(kw(f,t,l,u,d),d=void 0,l=0),u={type:"table",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",u,t]])):m.type==="tableRow"||m.type==="tableDelimiterRow"?(r=!0,c=void 0,o=[0,0,0,0],s=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",d,t]])),i=m.type==="tableDelimiterRow"?2:d?3:1):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")?(r=!1,s[2]===0&&(o[1]!==0&&(s[0]=s[1],c=Qa(f,t,o,i,void 0,c),o=[0,0,0,0]),s[2]=n)):m.type==="tableCellDivider"&&(r?r=!1:(o[1]!==0&&(s[0]=s[1],c=Qa(f,t,o,i,void 0,c)),o=s,s=[o[1],n,0,0])):m.type==="tableHead"?(a=!0,l=n):m.type==="tableRow"||m.type==="tableDelimiterRow"?(l=n,o[1]!==0?(s[0]=s[1],c=Qa(f,t,o,i,n,c)):s[1]!==0&&(c=Qa(f,t,s,i,n,c)),i=0):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")&&(s[3]=n)}for(l!==0&&kw(f,t,l,u,d),f.consume(t.events),n=-1;++n<t.events.length;){const p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=ez(t.events,n))}return e}function Qa(e,t,n,r,i,o){const s=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(o.end=Object.assign({},Pi(t.events,n[0])),e.add(n[0],0,[["exit",o,t]]));const l=Pi(t.events,n[1]);if(o={type:s,start:Object.assign({},l),end:Object.assign({},l)},e.add(n[1],0,[["enter",o,t]]),n[2]!==0){const u=Pi(t.events,n[2]),d=Pi(t.events,n[3]),c={type:a,start:Object.assign({},u),end:Object.assign({},d)};if(e.add(n[2],0,[["enter",c,t]]),r!==2){const f=t.events[n[2]],p=t.events[n[3]];if(f[1].end=Object.assign({},p[1].end),f[1].type="chunkText",f[1].contentType="text",n[3]>n[2]+1){const m=n[2]+1,w=n[3]-n[2]-1;e.add(m,w,[])}}e.add(n[3]+1,0,[["exit",c,t]])}return i!==void 0&&(o.end=Object.assign({},Pi(t.events,i)),e.add(i,0,[["exit",o,t]]),o=void 0),o}function kw(e,t,n,r,i){const o=[],s=Pi(t.events,n);i&&(i.end=Object.assign({},s),o.push(["exit",i,t])),r.end=Object.assign({},s),o.push(["exit",r,t]),e.add(n+1,0,o)}function Pi(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const iz={name:"tasklistCheck",tokenize:sz};function oz(){return{text:{91:iz}}}function sz(e,t,n){const r=this;return i;function i(l){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(l):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(l),e.exit("taskListCheckMarker"),o)}function o(l){return Ee(l)?(e.enter("taskListCheckValueUnchecked"),e.consume(l),e.exit("taskListCheckValueUnchecked"),s):l===88||l===120?(e.enter("taskListCheckValueChecked"),e.consume(l),e.exit("taskListCheckValueChecked"),s):n(l)}function s(l){return l===93?(e.enter("taskListCheckMarker"),e.consume(l),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(l)}function a(l){return G(l)?t(l):le(l)?e.check({tokenize:az},t,n)(l):n(l)}}function az(e,t,n){return me(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function lz(e){return LS([DU(),$U(),JU(e),tz(),oz()])}const uz={};function cz(e){const t=this,n=e||uz,r=t.data(),i=r.micromarkExtensions||(r.micromarkExtensions=[]),o=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),s=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);i.push(lz(n)),o.push(TU()),s.push(RU(n))}function C0({content:e}){return h.jsx("div",{className:"min-w-0 overflow-x-auto break-words text-app-muted",children:h.jsx(J3,{skipHtml:!0,remarkPlugins:[cz],components:{a:({children:t,href:n,title:r})=>n?h.jsx("a",{className:"font-bold text-app-accent underline underline-offset-2",href:n,rel:"noreferrer noopener",target:"_blank",title:r,children:t}):h.jsx("span",{children:t}),blockquote:({children:t})=>h.jsx("blockquote",{className:"border-l-2 border-app-line pl-3 italic",children:t}),code:({children:t})=>h.jsx("code",{className:"rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-app-ink",children:t}),h1:({children:t})=>h.jsx("h3",{className:"text-base font-extrabold text-app-ink",children:t}),h2:({children:t})=>h.jsx("h4",{className:"text-sm font-extrabold text-app-ink",children:t}),h3:({children:t})=>h.jsx("h5",{className:"text-sm font-bold text-app-ink",children:t}),li:({children:t})=>h.jsx("li",{className:"my-0.5",children:t}),ol:({children:t})=>h.jsx("ol",{className:"my-2 list-decimal space-y-0.5 pl-5",children:t}),p:({children:t})=>h.jsx("p",{className:"my-2 first:mt-0 last:mb-0",children:t}),pre:({children:t})=>h.jsx("pre",{className:"my-2 max-w-full overflow-x-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",children:t}),table:({children:t})=>h.jsx("table",{className:"my-2 w-full border-collapse text-left text-xs",children:t}),td:({children:t})=>h.jsx("td",{className:"border border-app-line px-2 py-1 align-top",children:t}),th:({children:t})=>h.jsx("th",{className:"border border-app-line bg-app-panel px-2 py-1 font-bold text-app-ink",children:t}),ul:({children:t})=>h.jsx("ul",{className:"my-2 list-disc space-y-0.5 pl-5",children:t})},children:e})})}function dz({activeApp:e,activeBuilderModel:t,activeBuilderProfileName:n,aiConfigured:r,builderActivity:i,builderError:o,builderIsRunning:s,builderMessages:a,builderReasoning:l,builderReasoningMessageId:u,builderStreamingContent:d,builderUsage:c,consoleEntries:f,mode:p,onClearBuilderConversation:m,onClearConsole:w,onClose:C,onLoadAppData:y,onOpenAiSettings:v,onOpenBuilderProfileSettings:g,onSaveSource:k,onSendBuilderMessage:S}){const _=p!==null,A=p==="source"?"Source":p==="builder"?"BuilderAI":p==="console"?"Console":"App tools";return h.jsxs("aside",{className:`fixed bottom-11 right-0 z-20 grid h-[min(74svh,620px)] min-w-0 w-full grid-rows-[44px_minmax(0,1fr)] overflow-hidden border-t border-app-line bg-app-panel shadow-panel transition-transform duration-200 lg:bottom-0 lg:top-11 lg:h-auto lg:w-[min(420px,36vw)] lg:border-l lg:border-t-0 ${_?"translate-y-0 lg:translate-x-0":"translate-y-[calc(100%+44px)] lg:translate-x-full lg:translate-y-0"}`,"aria-label":A,"aria-hidden":!_,children:[h.jsxs("header",{className:"flex min-h-0 items-center justify-between gap-3 border-b border-app-line px-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"m-0 truncate text-[11px] font-extrabold uppercase text-app-muted",children:e.name}),h.jsxs("div",{className:"flex min-w-0 items-baseline gap-1.5",children:[h.jsx("h2",{className:"shrink-0 truncate text-base font-extrabold leading-tight",children:A}),p==="builder"&&n?h.jsxs("div",{className:"flex min-w-0 items-baseline gap-1.5 text-xs font-bold text-app-muted",children:[h.jsx("span",{"aria-hidden":"true",className:"shrink-0",children:"·"}),h.jsx("button",{className:"min-w-0 truncate text-left text-app-accent underline underline-offset-2",type:"button","aria-label":`Open Builder profile settings for ${n}`,title:`Active profile: ${n}`,onClick:g,children:n}),t?h.jsxs(h.Fragment,{children:[h.jsx("span",{"aria-hidden":"true",className:"hidden shrink-0 sm:inline",children:"·"}),h.jsx("button",{className:"hidden min-w-0 truncate text-left text-app-accent underline underline-offset-2 sm:block",type:"button","aria-label":`Open AI connection settings for ${t}`,title:`Active model: ${t}`,onClick:v,children:t})]}):null]}):null]})]}),h.jsx("button",{className:"min-h-8 w-8 rounded-full border border-transparent bg-transparent p-0 text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Close ${A}`,onClick:C,children:"×"})]}),p==="source"?h.jsx(fz,{app:e,onLoadAppData:y,onSaveSource:k}):p==="console"?h.jsx(vz,{entries:f,onClear:w}):h.jsx(mz,{activity:i,app:e,configured:r,error:o,isRunning:s,messages:a,reasoning:l,reasoningMessageId:u,streamingContent:d,usage:c,onClear:m,onOpenAiSettings:v,onSendMessage:S})]})}function fz({app:e,onLoadAppData:t,onSaveSource:n}){const[r,i]=P.useState(e.sourceCode),[o,s]=P.useState(!1),[a,l]=P.useState(!0),[u,d]=P.useState(!1),[c,f]=P.useState(""),[p,m]=P.useState(""),[w,C]=P.useState(""),[y,v]=P.useState("Ready"),[g,k]=P.useState("Ready");P.useEffect(()=>{i(e.sourceCode),v("Ready"),l(!0),d(!1),f(""),m(""),C(""),k("Ready")},[e.appId,e.sourceCode]);async function S(){v("Saving...");try{await n(r),v("Saved.")}catch(D){v(D instanceof Error?D.message:"Could not save.")}}async function _(){k("Loading data...");try{const D=await t(e.appId),z=JSON.stringify(D,null,2);return f(z),k("Data loaded."),z}catch(D){return k(D instanceof Error?D.message:"Could not load app data."),null}}async function A(D,z){if(!D){k(`No ${z} to copy.`);return}try{await Tm(navigator.clipboard.writeText(D),1500),m(""),C(""),k("Copied.")}catch{m(D),C(z),k("Select and copy manually.")}}async function R(){const D=c||await _();D&&await A(D,"app data")}async function O(D){d(D),D&&!c&&await _()}async function E(){if(!a&&!u){k("Select at least one export.");return}const D=[];if(a&&D.push({contents:r,kind:"source"}),u){const K=c||await _();if(!K)return;D.push({contents:K,kind:"data"})}const z=D.filter(K=>hz(K.contents,kd(e.name,K.kind),pz(K.kind))).length;k(z===D.length?"Download started.":"Download is unavailable.")}return h.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto_auto] bg-[#111827]",children:[h.jsx("div",{className:"min-h-0 bg-[#111827]",children:h.jsx("textarea",{className:"h-full min-h-0 w-full resize-none border-0 bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 outline-none [tab-size:2]",spellCheck:!1,value:r,onChange:D=>{i(D.target.value),v("Unsaved changes")}})}),o?h.jsxs("div",{className:"grid gap-3 border-t border-app-line bg-app-panel p-3",children:[h.jsxs("fieldset",{className:"grid gap-2",children:[h.jsx("legend",{className:"sr-only",children:"Export files"}),h.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[h.jsx("input",{checked:a,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:D=>l(D.target.checked)}),h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block",children:"Source code"}),h.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:kd(e.name,"source")})]})]}),h.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[h.jsx("input",{checked:u,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:D=>void O(D.target.checked)}),h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block",children:"App data"}),h.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:kd(e.name,"data")})]})]})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:()=>void E(),children:"Download selected"}),h.jsxs("div",{className:"flex flex-wrap gap-2",children:[u?h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void _(),children:"Refresh data"}):null,h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void A(r,"source code"),children:"Copy source"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void R(),children:"Copy data"})]})]}),p?h.jsx("textarea",{"aria-label":`${w} export`,className:"h-32 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:p,onFocus:D=>D.target.select()}):null,h.jsx("div",{className:"text-xs font-bold text-app-muted",children:g})]}):null,h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",children:y}),h.jsxs("div",{className:"flex gap-2",children:[h.jsxs("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>s(D=>!D),children:["Export ",o?"↓":"↑"]}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:S,children:"Save"})]})]})]})}function kd(e,t){const r=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)||"untitled-app";return t==="source"?`${r}.html`:`${r}.data.json`}function pz(e){return e==="source"?"text/html;charset=utf-8":"application/json;charset=utf-8"}function hz(e,t,n){if(typeof window.URL.createObjectURL!="function")return!1;const r=window.URL.createObjectURL(new Blob([e],{type:n})),i=document.createElement("a");return i.href=r,i.download=t,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>{typeof window.URL.revokeObjectURL=="function"&&window.URL.revokeObjectURL(r)},0),!0}function mz({activity:e,app:t,configured:n,error:r,isRunning:i,messages:o,reasoning:s,reasoningMessageId:a,streamingContent:l,usage:u,onClear:d,onOpenAiSettings:c,onSendMessage:f}){const p=P.useRef(null),[m,w]=P.useState(""),[C,y]=P.useState(!1),[v,g]=P.useState(""),k=P.useMemo(()=>sC(t.name,t.sourceCode),[t.name,t.sourceCode]),S="builder-prompt-code";P.useEffect(()=>{w(""),y(!1),g("")},[t.appId]),P.useEffect(()=>{var R;typeof((R=p.current)==null?void 0:R.scrollIntoView)=="function"&&p.current.scrollIntoView({block:"nearest"})},[e,r,o.length,s,l]);async function _(){const R=m.trim();!n||i||!R||(w(""),await f(R))}async function A(){try{await Tm(navigator.clipboard.writeText(k),1500),g("Copied.")}catch{y(!0),g("Select and copy manually.")}}return h.jsxs("div",{className:"grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto]",children:[h.jsx("div",{className:"min-h-0 overflow-auto",children:h.jsxs("ol",{className:"flex min-w-0 flex-col gap-3 p-3","aria-live":"polite",children:[h.jsxs("li",{className:"mr-auto grid max-w-[92%] gap-2 rounded-lg border border-app-line bg-white px-3 py-3 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{className:"font-bold text-app-ink",children:"Hi,"}),n?h.jsxs(h.Fragment,{children:[h.jsxs("p",{children:["Describe how you want to edit ",t.name,"."]}),h.jsx("p",{children:"Or use the button below to work in an external AI chat."})]}):h.jsxs(h.Fragment,{children:[h.jsx("p",{children:"Use the button below to work in an external AI chat."}),h.jsxs("p",{children:["Or set up your AI provider in"," ",h.jsx("button",{className:"font-bold text-app-accent underline underline-offset-2",type:"button",onClick:c,children:"Settings"})," ","to chat directly here."]})]}),h.jsx("div",{children:h.jsxs("button",{"aria-controls":S,"aria-expanded":C,className:"inline-flex min-h-9 items-center gap-2 rounded-md border border-app-line bg-app-panel px-3 text-sm font-bold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>{y(!0),g("")},children:[h.jsx(Iw,{className:"h-4 w-4"}),"Copy prompt + code"]})})]}),o.map(R=>h.jsxs(P.Fragment,{children:[R.messageId===a&&s?h.jsx(Sw,{activity:null,content:s,isRunning:!1}):null,h.jsx(gz,{message:R})]},R.messageId)),!a&&(i||s||e)?h.jsx(Sw,{activity:e,content:s,isRunning:i}):null,l?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-white px-3 py-2 text-sm leading-relaxed",children:h.jsx(C0,{content:l})}):null,e&&a?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm font-bold text-app-muted",children:e}):null,r?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-700",role:"alert",children:r}):null,h.jsx("li",{"aria-hidden":"true",className:"h-px",ref:p})]})}),h.jsxs("form",{className:"grid gap-2 border-t border-app-line p-3",onSubmit:R=>{R.preventDefault(),_()},children:[h.jsxs("p",{"aria-label":"Builder session usage",className:"text-right text-xs font-bold text-app-muted",children:["Session: ",yz(u)]}),n?h.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2",children:[h.jsx("label",{className:"sr-only",htmlFor:"builder-message",children:"Message"}),h.jsx("textarea",{className:"max-h-36 min-h-11 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink outline-none focus:border-app-accent disabled:bg-slate-100",disabled:i,id:"builder-message",rows:2,placeholder:"Ask BuilderAI to change this app",value:m,onChange:R=>w(R.target.value),onKeyDown:R=>{var O;R.key!=="Enter"||R.shiftKey||R.nativeEvent.isComposing||(R.preventDefault(),(O=R.currentTarget.form)==null||O.requestSubmit())}}),h.jsx("button",{className:"grid h-10 min-h-10 w-10 place-items-center rounded-full border border-app-accent bg-app-accent p-0 text-xl font-bold text-white hover:bg-app-strong disabled:opacity-50",disabled:i||!m.trim(),type:"submit","aria-label":"Send message",children:"↑"})]}):null,C?h.jsxs("div",{className:"grid gap-2 rounded-md border border-app-line bg-app-panel p-2",id:S,children:[h.jsxs("div",{className:"flex items-start justify-between gap-3",children:[h.jsxs("p",{className:"text-sm leading-relaxed text-app-muted",children:["Copy this prompt into an external AI. Paste the returned HTML into ",h.jsx("span",{className:"font-mono text-app-ink",children:"<>"})," and save."]}),h.jsx("button",{"aria-label":"Close prompt and code",className:"grid h-8 min-h-8 w-8 shrink-0 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button",onClick:()=>y(!1),children:"×"})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",role:"status",children:v}),h.jsxs("button",{className:"inline-flex min-h-8 items-center gap-2 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:A,children:[h.jsx(Iw,{className:"h-4 w-4"}),"Copy"]})]}),h.jsx("textarea",{"aria-label":"Prompt and code",className:"h-40 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:k,onFocus:R=>R.target.select()})]}):null,h.jsx("div",{className:"flex flex-wrap justify-start gap-2",children:o.length||r?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-muted hover:border-red-300 hover:text-red-700 disabled:opacity-50",disabled:i,type:"button",onClick:d,children:"Clear chat"}):null})]})]})}function gz({message:e}){return e.role==="assistant"?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-white px-3 py-2 text-sm leading-relaxed",children:h.jsx(C0,{content:e.content})}):h.jsx("li",{className:"ml-auto min-w-0 max-w-[92%] whitespace-pre-wrap break-words rounded-lg bg-app-accent px-3 py-2 text-sm leading-relaxed text-white",children:e.content})}function Sw({activity:e,content:t,isRunning:n}){const r=P.useRef(null),[i,o]=P.useState(0);return P.useEffect(()=>{if(!n)return;r.current&&(r.current.open=!1);const s=Date.now();o(0);const a=window.setInterval(()=>o(Math.floor((Date.now()-s)/1e3)),1e3);return()=>window.clearInterval(a)},[n]),h.jsx("li",{className:"mr-auto w-[92%] max-w-[92%] text-sm text-app-muted",children:h.jsxs("details",{className:"rounded-lg border border-app-line bg-app-accent/10 px-3 py-2",ref:r,children:[h.jsxs("summary",{className:"cursor-pointer font-bold text-app-ink",children:[h.jsx("span",{className:n?"animate-pulse":"",children:e??"Reasoning"}),n?h.jsxs("span",{className:"ml-1 font-normal text-app-muted",children:[i,"s"]}):null]}),h.jsx("div",{className:"mt-2 max-h-56 overflow-auto whitespace-pre-wrap border-t border-app-line pt-2 text-xs leading-relaxed",children:t||(n?"Waiting for model reasoning...":"This model did not expose reasoning text.")})]})})}function Iw({className:e}){return h.jsxs("svg",{className:e,"aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),h.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]})}function yz(e){const t=e.totalTokens<1e3?String(e.totalTokens):`${(e.totalTokens/1e3).toFixed(1)}k`;return[e.costUsd===null?null:`$${e.costUsd.toFixed(e.costUsd<.1?4:2)}`,`${t} tokens`].filter(Boolean).join(" · ")}function vz({entries:e,onClear:t}){const[n,r]=P.useState("Ready"),i=P.useMemo(()=>wz(e),[e]);async function o(){if(!i){r("No output");return}try{await Tm(navigator.clipboard.writeText(i),1500),r("Copied.")}catch{r("Select and copy manually.")}}return h.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto] bg-slate-950",children:[h.jsx("div",{className:"min-h-0 overflow-auto p-3 font-mono text-xs leading-relaxed text-slate-200",children:e.length?h.jsx("ol",{className:"select-text space-y-4",children:e.map(s=>h.jsxs("li",{className:"whitespace-pre-wrap break-words",children:[h.jsxs("span",{className:"text-slate-500",children:["[",A0(s.timestamp),"] "]}),h.jsx("span",{className:`font-extrabold ${_z(s.level)}`,children:s.level.toUpperCase()}),h.jsxs("span",{children:[" ",s.args.join(" ")||"(empty)"]})]},s.id))}):h.jsx("p",{className:"select-text text-slate-400",children:"No console output yet."})}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",children:n}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{t(),r("Cleared.")},children:"Clear"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:o,children:"Copy"})]})]})]})}function Tm(e,t){return new Promise((n,r)=>{const i=window.setTimeout(()=>r(new Error("Timed out.")),t);e.then(o=>{window.clearTimeout(i),n(o)},o=>{window.clearTimeout(i),r(o)})})}function wz(e){return e.map(t=>{const n=t.args.join(" ")||"(empty)";return`[${A0(t.timestamp)}] ${t.level.toUpperCase()} ${n}`}).join(`

`)}function A0(e){return new Intl.DateTimeFormat(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date(e))}function _z(e){return e==="error"?"text-red-400":e==="warn"?"text-amber-300":e==="info"?"text-sky-300":e==="debug"?"text-violet-300":"text-slate-100"}function bz({aiActions:e,core:t,syncActions:n}){var Zt,Rm,Nm,Pm,Dm,Om,Lm,Mm;const[r,i]=P.useState({apiKey:"",model:""}),[o,s]=P.useState({...sh}),[a,l]=P.useState([]),[u,d]=P.useState({}),[c,f]=P.useState([]),[p,m]=P.useState({}),[w,C]=P.useState({}),[y,v]=P.useState(null),[g,k]=P.useState(null),[S,_]=P.useState(null),[A,R]=P.useState("launcher"),[O,E]=P.useState(null),[D,z]=P.useState(!1),[K,Z]=P.useState(),[te,ve]=P.useState(),[xe,B]=P.useState(null),[q,x]=P.useState(null),[re,ce]=P.useState(null),[I,ke]=P.useState(0),[Me,de]=P.useState(!0),[Ue,we]=P.useState([]),[Ke,Ae]=P.useState(null),[mt,Te]=P.useState(!1),[Sn,pe]=P.useState(0),Vt=P.useRef(null),He=P.useRef(new Set),Je=P.useRef(navigator.onLine),In=P.useRef([]),Nt=P.useRef(null);Vt.current=(S==null?void 0:S.appId)??null,In.current=Ue;function Xe(){return Je.current&&Nt.current!==!1}P.useEffect(()=>{_e(Xe())},[]),P.useEffect(()=>{e.getConfig().then(i)},[e]),P.useEffect(()=>{e.listBuilderProfiles().then(l)},[e]),P.useEffect(()=>{e.getBuilderPreferences().then(s)},[e]);const ln=P.useMemo(()=>qg(a,o.activeProfileId),[o.activeProfileId,a]);P.useEffect(()=>{let L=!1,$=null,Y=null;async function Pe(Ge=Xe()){try{if(!Ge){L||await _e(!1);return}await n.flushRoomLifecycleQueue(),await n.flushSourceSyncQueue(),await n.flushAppDataSyncQueue(),await n.flushOwnedAppDeletionQueue(),await n.flushWorkspaceManifestQueue(),await n.pullLatestWorkspaceManifest(),L||await _e(!0)}catch(ct){const N0=ct instanceof Error?ct.message:"Unknown sync error.";L||Ae(`Could not retry pending sync: ${N0}`)}}function je(){document.visibilityState==="visible"&&Pe(Xe())}function kt(){Pe(Xe())}function En(){Je.current=!0,Pe(Xe())}function ut(){Je.current=!1,_e(!1)}async function un(){const{storageConfigured:Ge}=await n.initializeWorkspaceSync();if(!Ge){Pe(Xe());return}$=await n.subscribeStorageConnection(ct=>{Nt.current=ct,ct?Pe(Xe()):_e(!1)}),Y=await n.subscribeWorkspaceManifest(()=>{L||_e(Xe())})}return Nt.current=null,un(),window.addEventListener("online",En),window.addEventListener("offline",ut),window.addEventListener("focus",kt),document.addEventListener("visibilitychange",je),()=>{L=!0,$==null||$(),Y==null||Y(),window.removeEventListener("online",En),window.removeEventListener("offline",ut),window.removeEventListener("focus",kt),document.removeEventListener("visibilitychange",je)}},[y==null?void 0:y.profileId,y==null?void 0:y.databaseUrl,n,g]),P.useEffect(()=>{function L(){try{x(hA(window.location.hash))}catch{x(null)}}return L(),window.addEventListener("hashchange",L),()=>window.removeEventListener("hashchange",L)},[]),P.useEffect(()=>{if(!S)return;const L=S;let $=null,Y=!1;async function Pe(){const je=await n.subscribeAppData(L.appId,({data:kt,version:En})=>{Y||ce({data:kt,id:crypto.randomUUID(),version:En})});Y?je():$=je}return Pe(),()=>{Y=!0,$==null||$()}},[S==null?void 0:S.appId,n]),P.useEffect(()=>{if(!S)return;const L=S;let $=null,Y=!1;async function Pe(){const je=await n.subscribeAppSource(L.appId,({app:kt})=>{Y||(_(kt),Ae(null),_e())},()=>{Y||(Ae("This shared app was deleted by its owner."),_e())});Y?je():$=je}return Pe(),()=>{Y=!0,$==null||$()}},[S==null?void 0:S.appId,n]);async function _e(L=Xe()){const $=await t.listApps(),Y=await n.getWorkspaceSyncOverview($.map(Pe=>Pe.appId));f($),m(Y.appBadges),C(Ez({apps:$,badges:Y.appBadges,isOnline:L,queueItems:Y.pendingOperations})),v(Y.storageProfile),k(Y.workspaceManifestRoomId)}async function qr(L){const $=await t.getApp(L);$&&(_($),R("app"),E(null),we([]),Te(!1),ke(Y=>Y+1),de(!1),j(L))}async function Kr(L){let $={},Y=null;try{$=await kv(L.sourceCode)}catch(je){const kt=je instanceof Error?je.message:"Unknown Tailwind compile error.";Y=`${L.name} created without compiled Tailwind CSS: ${kt}`}const Pe=await t.createApp({...L,...$});Y&&Ae(Y),_(Pe),R("app"),E(null),we([]),Te(!1),ke(je=>je+1),de(!1),n.ensureAppBackedUp(Pe,{flush:Xe()}).then(()=>_e(),je=>{const kt=je instanceof Error?je.message:"Unknown sync error.";Ae(`App created locally. Remote backup failed: ${kt}`),_e(!1)}),Xt(n.flushRoomLifecycleQueue()),await _e()}async function sr(){const[L,$]=await Promise.all([e.listBuilderProfiles(),e.getBuilderPreferences()]);l(L),s($);const Y=qg(L,$.activeProfileId);await Kr(Y?{description:`Created from the ${Y.name} Builder profile.`,name:"New App",sourceCode:Y.starterSource}:{description:$b,name:"Minimal Board",sourceCode:Hb})}async function b(L,$){xz($);let Y,Pe=null;try{Y=await kv($)}catch(ut){const un=ut instanceof Error?ut.message:"Unknown Tailwind compile error.";Y={compiledCss:void 0,compiledCssSourceHash:void 0},Pe=`Source saved without compiled Tailwind CSS: ${un}`}let je=null;const kt=n.beginLocalAppSourceEdit(L),En=await(async()=>{try{const ut=await t.updateApp({appId:L,sourceCode:$,...Y});try{await n.pushAppSource(ut)}catch(un){je=`Source saved locally. Remote source sync failed: ${un instanceof Error?un.message:"Unknown sync error."}`}return ut}finally{kt()}})();return Xt(n.flushSourceSyncQueue()),Vt.current===L&&(_(En),we([]),Ae([Pe,je].filter(Boolean).join(" ")||null)),await _e(),En}async function T(L,$){var En;const Y=$.trim();if(!Y||He.current.has(L.appId))return;const Pe=((En=u[L.appId])==null?void 0:En.messages)??[],je=Aw(L.appId,"user",Y),kt=[...Pe,je];He.current.add(L.appId),M(L.appId,ut=>({...ut,activity:"Thinking...",error:null,isRunning:!0,messages:kt,reasoning:"",reasoningMessageId:null,streamingContent:""}));try{const ut=await e.runBuilderTurn({appId:L.appId,appName:L.name,conversationMemory:o.conversationMemory,messages:kt,onActivity:Ge=>{M(L.appId,ct=>({...ct,activity:Ge}))},onAssistantContent:Ge=>{M(L.appId,ct=>({...ct,streamingContent:Ge}))},onReasoning:Ge=>{M(L.appId,ct=>({...ct,reasoning:Ge}))},onUsage:Ge=>{M(L.appId,ct=>({...ct,usage:Kb(ct.usage,Ge)}))},profile:ln??void 0,tools:{readCurrentAppSource:async()=>{const Ge=await t.getApp(L.appId);if(!Ge)throw new Error("The app no longer exists.");return Lz(Ge)},readRecentConsoleOutput:async()=>Vt.current!==L.appId?"The app is no longer active, so recent console output is unavailable.":Mz(In.current),replaceCurrentAppSource:async Ge=>{const ct=await b(L.appId,Ge);return{name:ct.name,sourceChars:ct.sourceCode.length,success:!0}}}}),un=Aw(L.appId,"assistant",ut.content);M(L.appId,Ge=>({...Ge,messages:[...Ge.messages,un],reasoningMessageId:un.messageId,streamingContent:""}))}catch(ut){M(L.appId,un=>({...un,error:ut instanceof Error?ut.message:"BuilderAI could not complete the request."}))}finally{He.current.delete(L.appId),M(L.appId,ut=>({...ut,activity:null,isRunning:!1}))}}function N(L){He.current.has(L)||d($=>{const Y={...$};return delete Y[L],Y})}function M(L,$){d(Y=>({...Y,[L]:$(Y[L]??Oz())}))}function H(){R("launcher"),E(null),n.pullLatestWorkspaceManifest().catch(L=>{const $=L instanceof Error?L.message:"Unknown sync error.";Ae(`Could not pull latest workspace: ${$}`)}).finally(()=>{_e(Xe())})}function fe(L){L==="builder"&&de(!0),E($=>$===L?null:L)}const he=P.useMemo(()=>A==="launcher"?"App Lab":(S==null?void 0:S.name)??"App",[S==null?void 0:S.name,A]),ee=S?w[S.appId]:void 0,ie=Ke?{kind:"problem",label:"",title:Ke,tone:"attention"}:ee;return h.jsxs("div",{className:"grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden lg:min-h-dvh",children:[h.jsxs("header",{className:"grid grid-cols-[88px_minmax(0,1fr)_112px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]",children:[h.jsx("div",{className:"justify-self-start",children:A==="app"?h.jsx("button",{className:"min-h-9 rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10",type:"button",onClick:H,children:"‹ Apps"}):null}),h.jsx("h1",{className:"max-w-[50vw] truncate text-center text-[17px] font-extrabold",children:he}),h.jsxs("nav",{className:"relative flex items-center justify-end gap-1 lg:gap-3","aria-label":"Workspace actions",children:[A==="app"&&ie&&ie.kind!=="none"?h.jsx(R0,{health:ie,onReload:Ke?()=>{pe(L=>L+1),Ae(null),Te(!1)}:void 0,open:mt,onOpenChange:Te,popoverAlign:"right"}):null,A==="app"&&S?h.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Share ${S.name}`,title:"Share",onClick:()=>B(S),children:h.jsx(T0,{className:"h-5 w-5"})}):null,h.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Open settings",onClick:()=>{Z(void 0),ve(void 0),z(!0)},children:"⚙"}),A==="app"&&S?h.jsx("div",{className:"hidden lg:block",children:h.jsx(Ew,{activeTool:O,aiAttentionDismissed:Me,aiAttentionKey:I,consoleCount:Ue.length,onToggleTool:fe})}):null]})]}),h.jsx("main",{className:`min-h-0 overflow-hidden ${O?"lg:mr-[min(420px,36vw)]":""}`,children:A==="launcher"?h.jsx(kz,{apps:c,onDeleteApp:async L=>{await n.deleteSyncedAppRooms(L),await t.deleteApp(L),await n.removeLocalAppSync(L),await n.queueWorkspaceManifestSave(),n.flushWorkspaceManifestQueue(),await _e()},onOpenApp:qr,onShareApp:L=>B(L),storageProfile:y,syncBadges:p,syncHealth:w}):S?h.jsx(Dz,{app:S,core:t,reloadKey:Sn,remoteDataChange:re,onConsoleEntry:L=>{we($=>[...$.slice(-199),L])},onSaveAppData:async(L,$)=>{ce(null),n.noteLocalAppDataEdit(L),await t.saveAppData(L,$),await ne("App data saved locally. Remote data sync failed",()=>n.pushAppData(L,$)),Xt(n.flushAppDataSyncQueue()),await _e()},onUnhandledRemoteDataChange:()=>{Ae("Remote data changed. This app does not handle live updates yet; reopen it to reload latest data.")}}):null}),A==="app"&&S?h.jsxs(h.Fragment,{children:[h.jsx("footer",{className:"sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden",children:h.jsx(Ew,{activeTool:O,aiAttentionDismissed:Me,aiAttentionKey:I,consoleCount:Ue.length,onToggleTool:fe})}),h.jsx(dz,{activeApp:S,activeBuilderModel:r.apiKey&&r.model?r.model:null,activeBuilderProfileName:(ln==null?void 0:ln.name)??null,aiConfigured:!!(r.apiKey&&r.model),builderActivity:((Zt=u[S.appId])==null?void 0:Zt.activity)??null,builderError:((Rm=u[S.appId])==null?void 0:Rm.error)??null,builderIsRunning:((Nm=u[S.appId])==null?void 0:Nm.isRunning)??!1,builderMessages:((Pm=u[S.appId])==null?void 0:Pm.messages)??[],builderReasoning:((Dm=u[S.appId])==null?void 0:Dm.reasoning)??"",builderReasoningMessageId:((Om=u[S.appId])==null?void 0:Om.reasoningMessageId)??null,builderStreamingContent:((Lm=u[S.appId])==null?void 0:Lm.streamingContent)??"",builderUsage:((Mm=u[S.appId])==null?void 0:Mm.usage)??ah(),consoleEntries:Ue,mode:O,onClearBuilderConversation:()=>N(S.appId),onClearConsole:()=>we([]),onClose:()=>E(null),onLoadAppData:t.getAppData,onOpenAiSettings:()=>{Z("connection"),ve("ai"),z(!0)},onOpenBuilderProfileSettings:()=>{Z("agent"),ve("ai"),z(!0)},onSaveSource:L=>b(S.appId,L),onSendBuilderMessage:L=>T(S,L)})]}):A==="launcher"?h.jsx("div",{className:"pointer-events-none fixed inset-x-0 bottom-5 z-20",children:h.jsx("div",{className:"mx-auto flex w-full max-w-5xl justify-end px-4",children:h.jsx("button",{className:"pointer-events-auto grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong",type:"button","aria-label":"Create new app",onClick:sr,children:"+"})})}):null,h.jsx(gM,{aiConfig:r,builderPreferences:o,builderProfiles:a,initialAiTab:K,initialSection:te,isOpen:D,storageProfile:y,onClearAiConfig:async()=>{await e.clearConfig(),i({apiKey:"",model:""})},onClearStorageProfile:async()=>{await n.clearStorageProfile(),await _e()},onClose:()=>z(!1),onConfigureStorageProfile:async L=>{await n.configureStorageProfile(L),await ne("Storage configured locally. Remote backup failed",()=>n.backUpLocalApps()),await _e()},onCreateBuilderProfile:async L=>{const $=await e.createBuilderProfile(L);return l(Y=>[...Y,$]),$},onDeleteBuilderProfile:async L=>{await e.deleteBuilderProfile(L),l($=>$.filter(Y=>Y.profileId!==L))},onSaveAiConfig:async L=>{const $=await e.saveConfig(L);return i($),$},onSaveBuilderPreferences:async L=>{const $=await e.saveBuilderPreferences(L);return s($),$},onTestAiConnection:e.testConnection,onUpdateBuilderProfile:async L=>{const $=await e.updateBuilderProfile(L);return l(Y=>Y.map(Pe=>Pe.profileId===$.profileId?$:Pe)),$},onExportWorkspaceRecovery:async()=>n.exportWorkspaceRecovery(),onRestoreWorkspaceRecovery:async L=>{await n.restoreWorkspaceRecovery(L),window.setTimeout(()=>void _e(),0)}}),h.jsx(Tz,{app:xe,onClose:()=>B(null),onOpenStorageSettings:()=>{B(null),Z(void 0),ve("storage"),z(!0)},onCreateInvite:async L=>{const $=await n.createInvite(L);return await _e(),$},storageProfile:y}),h.jsx(Rz,{invite:q,onClose:()=>{x(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)},onPreview:n.previewInvite,onImport:async L=>{await n.importInvite(L),await _e(),x(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)}})]});async function j(L){await ne("Could not pull latest shared app",async()=>{const $=await n.pullLatestAppRooms(L);if($.deletedAt)throw new Error("This shared app was deleted by its owner.");$.app&&_($.app)}),await _e()}async function ne(L,$){try{return await $(),Ae(null),null}catch(Y){const Pe=Y instanceof Error?Y.message:"Unknown sync error.",je=`${L}: ${Pe}`;return Ae(je),je}}function Xt(L){L.finally(()=>{_e()})}}function xz(e){const t=e.trimStart().toLowerCase();if(!/^<!doctype\s+html(?:\s[^>]*)?>/.test(t)&&!/^<html(?:\s|>)/.test(t))throw new Error("Source must be a complete HTML document starting with <!doctype html> or <html>.")}function Ew({activeTool:e,aiAttentionDismissed:t,aiAttentionKey:n,consoleCount:r,onToggleTool:i}){const o=!t&&e!=="builder";return h.jsxs("div",{className:"flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1",role:"group","aria-label":"App tools",children:[h.jsxs("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-accent ${e==="console"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle console",onClick:()=>i("console"),children:["Log",r>0?h.jsx("span",{className:"absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white shadow-sm",children:r>99?"99+":r}):null]}),h.jsx("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-mono font-bold text-app-muted hover:text-app-accent ${e==="source"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle source",onClick:()=>i("source"),children:"<>"}),h.jsxs("button",{className:`relative min-h-0 overflow-hidden rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-violet ${e==="builder"?"text-app-violet after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-violet":""}`,type:"button","aria-label":"Toggle BuilderAI",onClick:()=>i("builder"),children:[o?h.jsx("svg",{className:"pointer-events-none absolute inset-0 h-full w-full",viewBox:"0 0 100 36",preserveAspectRatio:"none","aria-hidden":"true",children:h.jsx("rect",{className:"ai-snake-path",x:"2",y:"2",width:"96",height:"32",rx:"6",ry:"6",pathLength:"100",fill:"none",stroke:"#8b5cf6",strokeLinecap:"round"},n)}):null,h.jsx("span",{className:`relative z-10 ${o?"animate-ai-text-shimmer":""}`,children:"AI ✦"},n)]})]})}function kz({apps:e,onDeleteApp:t,onOpenApp:n,onShareApp:r,storageProfile:i,syncBadges:o,syncHealth:s}){const[a,l]=P.useState(null);return h.jsxs("section",{className:"mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24","aria-label":"Apps",children:[h.jsxs("div",{className:"mb-5 flex flex-wrap items-end justify-between gap-5",children:[h.jsxs("div",{children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Workspace"}),h.jsx("h2",{className:"text-[clamp(24px,4vw,38px)] font-extrabold leading-none",children:"Choose an app"})]}),h.jsx("div",{className:"flex flex-wrap items-center justify-end gap-2",children:h.jsx("span",{className:"rounded-full border border-app-line bg-white px-3 py-1 text-xs font-extrabold uppercase text-app-muted",children:i?`Storage: ${i.displayName}`:"Local only"})})]}),e.length?h.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3",children:e.map(u=>h.jsx(Sz,{app:u,onOpenActions:()=>l(u),onOpen:()=>n(u.appId),onShare:()=>r(u),syncBadge:o[u.appId]??{kind:"local-only",label:"Private",tone:"neutral"},syncHealth:s[u.appId]??{kind:"none",label:"",title:"",tone:"neutral"}},u.appId))}):h.jsx("div",{className:"rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted",children:"No apps yet. Use the + button to create the example app."}),h.jsx(Nz,{app:a,onClose:()=>l(null),onDeleteApp:async u=>{await t(u),l(null)},syncBadge:a?o[a.appId]:void 0})]})}function Sz({app:e,onOpenActions:t,onOpen:n,onShare:r,syncBadge:i,syncHealth:o}){const s=i.kind==="needs-attention";return h.jsxs("article",{className:`relative grid min-h-32 content-start gap-3 rounded-lg border border-app-line bg-app-surface/95 p-4 text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white ${s?"opacity-75":""}`,children:[h.jsx("button",{className:"absolute right-3 top-3 grid h-8 min-h-8 w-8 place-items-center rounded-md border border-transparent bg-white/80 text-base text-app-muted hover:border-app-accent hover:text-app-accent",type:"button","aria-label":`Open app actions for ${e.name}`,title:"App actions",onClick:t,children:h.jsxs("svg",{className:"h-4 w-4","aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h.jsx("path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}),h.jsx("path",{d:"m15 5 4 4"})]})}),h.jsxs("button",{className:"grid gap-2 pr-9 text-left disabled:cursor-default",type:"button",disabled:s,onClick:n,children:[h.jsx("strong",{className:`text-lg leading-tight ${s?"line-through decoration-2":""}`,children:e.name}),h.jsx("span",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:e.description})]}),h.jsxs("div",{className:"flex flex-wrap gap-2",children:[h.jsxs("span",{className:`rounded-full px-2 py-1 text-[11px] font-extrabold uppercase ${Iz(i.tone)}`,title:s?"The owner deleted this shared app. You can remove this local entry from app actions.":void 0,children:[i.label,s?" ⓘ":""]}),o.kind!=="none"?h.jsx(R0,{health:o,popoverAlign:"left"}):null]}),h.jsxs("div",{className:"mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3",children:[h.jsx("span",{className:"truncate text-xs font-bold text-app-muted",children:cp(e.updatedAt)}),h.jsxs("div",{className:"flex gap-2",children:[h.jsxs("button",{className:"inline-flex min-h-8 items-center gap-1.5 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:s,onClick:r,children:[h.jsx(T0,{className:"h-4 w-4"}),"Share"]}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:s,onClick:n,children:"Open"})]})]})]})}function T0({className:e}){return h.jsxs("svg",{className:e,"aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",children:[h.jsx("path",{d:"M8.1 10.7 15.6 6.6M8.1 13.3l7.5 4.1",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),h.jsx("circle",{cx:"6",cy:"12",r:"2.4",fill:"currentColor"}),h.jsx("circle",{cx:"18",cy:"5.5",r:"2.4",fill:"currentColor"}),h.jsx("circle",{cx:"18",cy:"18.5",r:"2.4",fill:"currentColor"})]})}function Iz(e){return e==="good"?"bg-emerald-50 text-emerald-700":e==="shared"?"bg-violet-50 text-violet-700":e==="attention"?"bg-amber-50 text-amber-800":"bg-slate-100 text-app-muted"}function Ez(e){return Object.fromEntries(e.apps.map(t=>{const n=e.badges[t.appId],r=e.queueItems.filter(i=>i.appId===t.appId);return[t.appId,Cz({badge:n,isOnline:e.isOnline,items:r})]}))}function Cz(e){var n,r;if(((n=e.badge)==null?void 0:n.kind)==="local-only")return{kind:"none",label:"",title:"",tone:"neutral"};if(((r=e.badge)==null?void 0:r.kind)==="needs-attention")return{kind:"problem",label:"",title:"This shared app was deleted by its owner. You can remove this local entry from app actions.",tone:"attention"};if(!e.items.length)return{kind:"synced",label:"☁ ✓",title:"Synced with remote storage.",tone:"good"};if(!e.isOnline)return{kind:"offline",label:"☁ ×",title:"Offline. Local changes are saved and will sync when the browser comes back online.",tone:"attention"};const t=e.items.find(i=>i.lastError||i.status==="problem");return t?{kind:"problem",label:"☁ !",title:`Could not sync ${Az(t.kind)}. App Lab will retry when sync wakes up. ${t.lastError??""}`.trim(),tone:"attention"}:e.items.some(i=>i.status==="syncing")?{kind:"syncing",label:"☁ …",title:"Syncing local changes to remote storage.",tone:"working"}:{kind:"pending",label:"☁ …",title:"Local changes are queued for remote sync.",tone:"working"}}function R0({health:e,onOpenChange:t,onReload:n,open:r,popoverAlign:i="right"}){const[o,s]=P.useState(!1),a=r??o,l=t??s,u=e.kind==="synced"?"text-emerald-600 hover:bg-emerald-50":e.kind==="pending"||e.kind==="syncing"?"text-blue-600 hover:bg-blue-50":e.kind==="offline"?"text-slate-500 hover:bg-slate-100":"text-red-600 hover:bg-red-50",d=e.kind==="synced"?"border-emerald-100":e.kind==="pending"||e.kind==="syncing"?"border-blue-100":e.kind==="offline"?"border-slate-200":"border-red-100";return h.jsxs("div",{className:"relative inline-grid place-items-center",children:[h.jsx("button",{"aria-label":`Open sync status: ${e.title}`,className:`grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent ${u}`,title:e.title,type:"button",onClick:()=>l(!a),children:h.jsx(Cw,{kind:e.kind})}),a?h.jsxs("div",{className:`absolute top-10 z-40 grid w-72 gap-3 rounded-lg border ${d} bg-white p-3 text-left text-app-ink shadow-panel ${i==="left"?"left-0":"right-0"}`,children:[h.jsxs("div",{className:"flex items-start gap-3",children:[h.jsx("div",{className:u.replace(/hover:[^ ]+/g,""),children:h.jsx(Cw,{kind:e.kind})}),h.jsxs("div",{className:"grid gap-1",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Sync status"}),h.jsx("p",{className:"text-sm font-bold leading-snug",children:e.title})]})]}),h.jsxs("div",{className:"flex items-center justify-end gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>l(!1),children:"Close"}),n?h.jsx("button",{"aria-label":"Reload app",className:"grid h-8 min-h-8 w-8 place-items-center rounded-md border border-app-accent bg-app-accent text-lg font-bold text-white hover:bg-app-strong",title:"Reload app",type:"button",onClick:n,children:"↻"}):null]})]}):null]})}function Cw({kind:e}){return h.jsxs("svg",{"aria-hidden":"true",className:"block h-7 w-7",viewBox:"0 0 64 64",children:[h.jsx("path",{d:"M20 46h26a12 12 0 0 0 1.2-23.9A17 17 0 0 0 15.5 27.5 9.5 9.5 0 0 0 20 46Z",fill:"#f8fafc",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.8"}),e==="synced"?h.jsx("path",{d:"m25 35 5 5 10-12",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,e==="pending"?h.jsxs(h.Fragment,{children:[h.jsx("circle",{className:"cloud-sync-dot-one",cx:"27",cy:"36",fill:"currentColor",r:"2.4"}),h.jsx("circle",{className:"cloud-sync-dot-two",cx:"32",cy:"36",fill:"currentColor",r:"2.4"}),h.jsx("circle",{className:"cloud-sync-dot-three",cx:"37",cy:"36",fill:"currentColor",r:"2.4"})]}):null,e==="syncing"?h.jsxs("g",{className:"cloud-sync-spin",children:[h.jsx("path",{d:"M37.7 27.3a8 8 0 0 1 2.1 8.8",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("path",{d:"M24 33a8 8 0 0 1 13.7-5.7",fill:"none",opacity:"0.58",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("path",{d:"M26.4 38.7A8 8 0 0 1 24 33",fill:"none",opacity:"0.24",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"})]}):null,e==="offline"?h.jsx("path",{d:"M17 17 47 47",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,e==="problem"?h.jsxs(h.Fragment,{children:[h.jsx("path",{d:"M32 21.8v9.4",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("circle",{cx:"32",cy:"38.8",fill:"currentColor",r:"2.4"})]}):null]})}function Az(e){return e==="ensure-app-rooms"?"app rooms":e==="save-source"?"source code":e==="save-app-data"?"app data":e==="delete-owned-app"?"app deletion":"workspace manifest"}function Tz({app:e,onClose:t,onCreateInvite:n,onOpenStorageSettings:r,storageProfile:i}){const[o,s]=P.useState(""),[a,l]=P.useState("Ready"),u=!!i;if(P.useEffect(()=>{s(""),l("Ready")},[e==null?void 0:e.appId]),!e)return null;async function d(){var c;if(e){l("Creating invite...");try{const f=await n(e.appId),p=`${window.location.origin}${window.location.pathname}#${fA(f)}`;s(p),l("Invite ready. It reuses this app's stable source and data rooms."),(c=navigator.clipboard)==null||c.writeText(p).catch(()=>{})}catch(f){l(f instanceof Error?f.message:"Could not create invite.")}}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Share app",children:h.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Share"}),h.jsx("h2",{className:"truncate text-lg font-extrabold",children:e.name})]}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close share dialog",onClick:t,children:"×"})]}),u?h.jsxs("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[h.jsx("p",{className:"font-bold",children:"Invite links are sensitive."}),h.jsx("p",{children:"Anyone with the link can access and edit this app's source and data rooms. It does not include the owner setup material for creating new rooms."})]}):h.jsxs("div",{className:"grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[h.jsx("p",{className:"font-bold",children:"Cloud sync is required before this app can be shared."}),h.jsx("button",{className:"min-h-9 justify-self-start rounded-md border border-amber-300 bg-white px-3 text-sm font-extrabold text-amber-900 hover:border-amber-500",type:"button",onClick:r,children:"Open settings"})]}),h.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3",children:[h.jsx("p",{className:"mb-2 text-xs font-extrabold uppercase text-app-muted",children:"Invite link"}),h.jsx("textarea",{className:"min-h-24 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted",readOnly:!0,value:o||"Create an invite to generate the access link."})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:a}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!u,onClick:d,children:"Create invite"})]})]})})}function Rz({invite:e,onClose:t,onImport:n,onPreview:r}){const[i,o]=P.useState(null),[s,a]=P.useState("Ready");if(P.useEffect(()=>{o(null),a("Ready")},[e]),!e)return null;async function l(){if(!e)return;const d=e;a("Loading app preview...");try{o(await r(d)),a("Preview loaded. Review before importing.")}catch(c){o(null),a(c instanceof Error?c.message:"Could not load app preview.")}}async function u(){if(!e)return;const d=e;a("Importing shared app...");try{await n(d),a("Imported.")}catch(c){a(c instanceof Error?c.message:"Could not import invite.")}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Import shared app",children:h.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Shared app invite"}),h.jsx("h2",{className:"truncate text-lg font-extrabold",children:"Import shared app"})]}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close invite import",onClick:t,children:"×"})]}),h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"This link grants access to a shared app source room and data room. Importing will add the app to this workspace as Shared with me and connect it to live data updates."}),h.jsx("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:"Shared app source is executable code from whoever controls the shared source room. Only import apps from people you trust."}),h.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3 text-xs text-app-muted",children:[h.jsxs("p",{children:["Provider: ",h.jsx("span",{className:"font-mono",children:e.provider.databaseUrl})]}),h.jsxs("p",{children:["Created: ",h.jsx("span",{className:"font-mono",children:cp(e.createdAt)})]})]}),i?h.jsxs("div",{className:"grid gap-2 rounded-lg border border-app-line bg-white p-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Preview"}),h.jsx("h3",{className:"truncate text-base font-extrabold text-app-ink",children:i.name}),i.description?h.jsx("p",{className:"mt-1 text-sm leading-relaxed text-app-muted",children:i.description}):null]}),h.jsxs("div",{className:"grid gap-1 text-xs text-app-muted",children:[h.jsxs("p",{children:["App id: ",h.jsx("span",{className:"font-mono",children:Sd(i.appId)})]}),h.jsxs("p",{children:["Source room: ",h.jsx("span",{className:"font-mono",children:Sd(i.sourceRoomId)})]}),h.jsxs("p",{children:["Data room: ",h.jsx("span",{className:"font-mono",children:Sd(i.dataRoomId)})]}),h.jsxs("p",{children:["Updated: ",h.jsx("span",{className:"font-mono",children:cp(i.updatedAt)})]})]})]}):null,h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:s}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:t,children:"Cancel"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:l,children:"Preview app"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong",type:"button",onClick:u,children:"Import"})]})]})]})})}function Sd(e){return e.length<=18?e:`${e.slice(0,8)}...${e.slice(-6)}`}function Nz({app:e,onClose:t,onDeleteApp:n,syncBadge:r}){const[i,o]=P.useState("");if(P.useEffect(()=>{o("")},[e]),!e)return null;async function s(){if(!e)return;const a=Pz(e,r);if(window.confirm(a)){o("Deleting...");try{await n(e.appId)}catch(l){o(l instanceof Error?l.message:"Could not delete app.")}}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"App actions",children:h.jsxs("div",{className:"grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsx("h2",{className:"text-lg font-extrabold",children:"App actions"}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close app actions",onClick:t,children:"×"})]}),h.jsxs("div",{className:"grid gap-1 rounded-lg border border-app-line bg-white p-3",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Selected app"}),h.jsx("p",{className:"truncate text-base font-extrabold text-app-ink",children:e.name}),e.description?h.jsx("p",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:e.description}):null]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 hover:bg-red-100",type:"button",onClick:s,children:"Delete"}),h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:i}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:t,children:"Cancel"})]})]})]})})}function Pz(e,t){const n=`Delete "${e.name}"? This removes the app and its saved data from this workspace.`;return(t==null?void 0:t.kind)==="shared-by-me"?`${n}

This app is shared. Its remote source and data rooms will also be deleted, so collaborators with the invite link will lose access.`:(t==null?void 0:t.kind)==="shared-with-me"||(t==null?void 0:t.kind)==="needs-attention"?`${n}

This app was shared with you. Deleting it here only removes your local entry; it does not delete the owner's rooms.`:t&&t.kind!=="local-only"?`${n}

Its remote source and data backup rooms will also be deleted.`:n}function Dz({app:e,core:t,onConsoleEntry:n,onUnhandledRemoteDataChange:r,onSaveAppData:i,reloadKey:o,remoteDataChange:s}){return h.jsx("section",{className:"min-h-0","aria-label":e.name,children:h.jsx(zL,{app:e,getAppData:t.getAppData,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:o,remoteDataChange:s,saveAppData:i})})}function Oz(){return{activity:null,error:null,isRunning:!1,messages:[],reasoning:"",reasoningMessageId:null,streamingContent:"",usage:ah()}}function Aw(e,t,n){return{appId:e,content:n,createdAt:new Date().toISOString(),messageId:crypto.randomUUID(),role:t}}function Lz(e){return{description:e.description,name:e.name,sourceCode:e.sourceCode}}function Mz(e){return e.length?e.slice(-50).map(t=>`[${t.timestamp}] ${t.level.toUpperCase()} ${t.args.join(" ")||"(empty)"}`).join(`
`):"No recent console output."}function cp(e){return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric"}).format(new Date(e))}function jz(){const e=P.useMemo(()=>BC(),[]),t=P.useMemo(()=>qC(),[]),n=P.useMemo(()=>ML(t),[t]);return h.jsx(bz,{aiActions:e,core:t,syncActions:n})}Id.createRoot(document.getElementById("root")).render(h.jsx(K0.StrictMode,{children:h.jsx(jz,{})}));
