(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var _l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function hp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Pw={exports:{}},bu={},Dw={exports:{}},de={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qs=Symbol.for("react.element"),L0=Symbol.for("react.portal"),M0=Symbol.for("react.fragment"),j0=Symbol.for("react.strict_mode"),F0=Symbol.for("react.profiler"),U0=Symbol.for("react.provider"),z0=Symbol.for("react.context"),B0=Symbol.for("react.forward_ref"),V0=Symbol.for("react.suspense"),$0=Symbol.for("react.memo"),H0=Symbol.for("react.lazy"),zm=Symbol.iterator;function W0(e){return e===null||typeof e!="object"?null:(e=zm&&e[zm]||e["@@iterator"],typeof e=="function"?e:null)}var Ow={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Lw=Object.assign,Mw={};function vo(e,t,n){this.props=e,this.context=t,this.refs=Mw,this.updater=n||Ow}vo.prototype.isReactComponent={};vo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};vo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function jw(){}jw.prototype=vo.prototype;function mp(e,t,n){this.props=e,this.context=t,this.refs=Mw,this.updater=n||Ow}var gp=mp.prototype=new jw;gp.constructor=mp;Lw(gp,vo.prototype);gp.isPureReactComponent=!0;var Bm=Array.isArray,Fw=Object.prototype.hasOwnProperty,yp={current:null},Uw={key:!0,ref:!0,__self:!0,__source:!0};function zw(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)Fw.call(t,r)&&!Uw.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:qs,type:e,key:o,ref:s,props:i,_owner:yp.current}}function q0(e,t){return{$$typeof:qs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function vp(e){return typeof e=="object"&&e!==null&&e.$$typeof===qs}function K0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Vm=/\/+/g;function dc(e,t){return typeof e=="object"&&e!==null&&e.key!=null?K0(""+e.key):t.toString(36)}function Xa(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case qs:case L0:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+dc(s,0):r,Bm(i)?(n="",e!=null&&(n=e.replace(Vm,"$&/")+"/"),Xa(i,t,n,"",function(u){return u})):i!=null&&(vp(i)&&(i=q0(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(Vm,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",Bm(e))for(var a=0;a<e.length;a++){o=e[a];var l=r+dc(o,a);s+=Xa(o,t,n,l,i)}else if(l=W0(e),typeof l=="function")for(e=l.call(e),a=0;!(o=e.next()).done;)o=o.value,l=r+dc(o,a++),s+=Xa(o,t,n,l,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function ba(e,t,n){if(e==null)return e;var r=[],i=0;return Xa(e,r,"","",function(o){return t.call(n,o,i++)}),r}function G0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Tt={current:null},Za={transition:null},Y0={ReactCurrentDispatcher:Tt,ReactCurrentBatchConfig:Za,ReactCurrentOwner:yp};function Bw(){throw Error("act(...) is not supported in production builds of React.")}de.Children={map:ba,forEach:function(e,t,n){ba(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ba(e,function(){t++}),t},toArray:function(e){return ba(e,function(t){return t})||[]},only:function(e){if(!vp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};de.Component=vo;de.Fragment=M0;de.Profiler=F0;de.PureComponent=mp;de.StrictMode=j0;de.Suspense=V0;de.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y0;de.act=Bw;de.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Lw({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=yp.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)Fw.call(t,l)&&!Uw.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:qs,type:e.type,key:i,ref:o,props:r,_owner:s}};de.createContext=function(e){return e={$$typeof:z0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:U0,_context:e},e.Consumer=e};de.createElement=zw;de.createFactory=function(e){var t=zw.bind(null,e);return t.type=e,t};de.createRef=function(){return{current:null}};de.forwardRef=function(e){return{$$typeof:B0,render:e}};de.isValidElement=vp;de.lazy=function(e){return{$$typeof:H0,_payload:{_status:-1,_result:e},_init:G0}};de.memo=function(e,t){return{$$typeof:$0,type:e,compare:t===void 0?null:t}};de.startTransition=function(e){var t=Za.transition;Za.transition={};try{e()}finally{Za.transition=t}};de.unstable_act=Bw;de.useCallback=function(e,t){return Tt.current.useCallback(e,t)};de.useContext=function(e){return Tt.current.useContext(e)};de.useDebugValue=function(){};de.useDeferredValue=function(e){return Tt.current.useDeferredValue(e)};de.useEffect=function(e,t){return Tt.current.useEffect(e,t)};de.useId=function(){return Tt.current.useId()};de.useImperativeHandle=function(e,t,n){return Tt.current.useImperativeHandle(e,t,n)};de.useInsertionEffect=function(e,t){return Tt.current.useInsertionEffect(e,t)};de.useLayoutEffect=function(e,t){return Tt.current.useLayoutEffect(e,t)};de.useMemo=function(e,t){return Tt.current.useMemo(e,t)};de.useReducer=function(e,t,n){return Tt.current.useReducer(e,t,n)};de.useRef=function(e){return Tt.current.useRef(e)};de.useState=function(e){return Tt.current.useState(e)};de.useSyncExternalStore=function(e,t,n){return Tt.current.useSyncExternalStore(e,t,n)};de.useTransition=function(){return Tt.current.useTransition()};de.version="18.3.1";Dw.exports=de;var N=Dw.exports;const Q0=hp(N);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J0=N,X0=Symbol.for("react.element"),Z0=Symbol.for("react.fragment"),eI=Object.prototype.hasOwnProperty,tI=J0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,nI={key:!0,ref:!0,__self:!0,__source:!0};function Vw(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)eI.call(t,r)&&!nI.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:X0,type:e,key:o,ref:s,props:i,_owner:tI.current}}bu.Fragment=Z0;bu.jsx=Vw;bu.jsxs=Vw;Pw.exports=bu;var h=Pw.exports,Ad={},$w={exports:{}},Jt={},Hw={exports:{}},Ww={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,q){var _=z.length;z.push(q);e:for(;0<_;){var K=_-1>>>1,X=z[K];if(0<i(X,q))z[K]=q,z[_]=X,_=K;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var q=z[0],_=z.pop();if(_!==q){z[0]=_;e:for(var K=0,X=z.length,I=X>>>1;K<I;){var ke=2*(K+1)-1,je=z[ke],fe=ke+1,Ue=z[fe];if(0>i(je,_))fe<X&&0>i(Ue,je)?(z[K]=Ue,z[fe]=_,K=fe):(z[K]=je,z[ke]=_,K=ke);else if(fe<X&&0>i(Ue,_))z[K]=Ue,z[fe]=_,K=fe;else break e}}return q}function i(z,q){var _=z.sortIndex-q.sortIndex;return _!==0?_:z.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var l=[],u=[],d=1,c=null,f=3,p=!1,m=!1,w=!1,C=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(z){for(var q=n(u);q!==null;){if(q.callback===null)r(u);else if(q.startTime<=z)r(u),q.sortIndex=q.expirationTime,t(l,q);else break;q=n(u)}}function k(z){if(w=!1,g(z),!m)if(n(l)!==null)m=!0,ye(S);else{var q=n(u);q!==null&&_e(k,q.startTime-z)}}function S(z,q){m=!1,w&&(w=!1,y(R),R=-1),p=!0;var _=f;try{for(g(q),c=n(l);c!==null&&(!(c.expirationTime>q)||z&&!F());){var K=c.callback;if(typeof K=="function"){c.callback=null,f=c.priorityLevel;var X=K(c.expirationTime<=q);q=e.unstable_now(),typeof X=="function"?c.callback=X:c===n(l)&&r(l),g(q)}else r(l);c=n(l)}if(c!==null)var I=!0;else{var ke=n(u);ke!==null&&_e(k,ke.startTime-q),I=!1}return I}finally{c=null,f=_,p=!1}}var x=!1,A=null,R=-1,D=5,E=-1;function F(){return!(e.unstable_now()-E<D)}function V(){if(A!==null){var z=e.unstable_now();E=z;var q=!0;try{q=A(!0,z)}finally{q?Q():(x=!1,A=null)}}else x=!1}var Q;if(typeof v=="function")Q=function(){v(V)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,ne=Z.port2;Z.port1.onmessage=V,Q=function(){ne.postMessage(null)}}else Q=function(){C(V,0)};function ye(z){A=z,x||(x=!0,Q())}function _e(z,q){R=C(function(){z(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,ye(S))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(z){switch(f){case 1:case 2:case 3:var q=3;break;default:q=f}var _=f;f=q;try{return z()}finally{f=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var _=f;f=z;try{return q()}finally{f=_}},e.unstable_scheduleCallback=function(z,q,_){var K=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?K+_:K):_=K,z){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=_+X,z={id:d++,callback:q,priorityLevel:z,startTime:_,expirationTime:X,sortIndex:-1},_>K?(z.sortIndex=_,t(u,z),n(l)===null&&z===n(u)&&(w?(y(R),R=-1):w=!0,_e(k,_-K))):(z.sortIndex=X,t(l,z),m||p||(m=!0,ye(S))),z},e.unstable_shouldYield=F,e.unstable_wrapCallback=function(z){var q=f;return function(){var _=f;f=q;try{return z.apply(this,arguments)}finally{f=_}}}})(Ww);Hw.exports=Ww;var rI=Hw.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iI=N,Qt=rI;function j(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var qw=new Set,ms={};function Si(e,t){io(e,t),io(e+"Capture",t)}function io(e,t){for(ms[e]=t,e=0;e<t.length;e++)qw.add(t[e])}var Jn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Td=Object.prototype.hasOwnProperty,oI=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$m={},Hm={};function sI(e){return Td.call(Hm,e)?!0:Td.call($m,e)?!1:oI.test(e)?Hm[e]=!0:($m[e]=!0,!1)}function aI(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function lI(e,t,n,r){if(t===null||typeof t>"u"||aI(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Rt(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var mt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){mt[e]=new Rt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];mt[t]=new Rt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){mt[e]=new Rt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){mt[e]=new Rt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){mt[e]=new Rt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){mt[e]=new Rt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){mt[e]=new Rt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){mt[e]=new Rt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){mt[e]=new Rt(e,5,!1,e.toLowerCase(),null,!1,!1)});var wp=/[\-:]([a-z])/g;function _p(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(wp,_p);mt[t]=new Rt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(wp,_p);mt[t]=new Rt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(wp,_p);mt[t]=new Rt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){mt[e]=new Rt(e,1,!1,e.toLowerCase(),null,!1,!1)});mt.xlinkHref=new Rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){mt[e]=new Rt(e,1,!1,e.toLowerCase(),null,!0,!0)});function bp(e,t,n,r){var i=mt.hasOwnProperty(t)?mt[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(lI(t,n,i,r)&&(n=null),r||i===null?sI(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var or=iI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xa=Symbol.for("react.element"),Di=Symbol.for("react.portal"),Oi=Symbol.for("react.fragment"),xp=Symbol.for("react.strict_mode"),Rd=Symbol.for("react.profiler"),Kw=Symbol.for("react.provider"),Gw=Symbol.for("react.context"),kp=Symbol.for("react.forward_ref"),Nd=Symbol.for("react.suspense"),Pd=Symbol.for("react.suspense_list"),Sp=Symbol.for("react.memo"),pr=Symbol.for("react.lazy"),Yw=Symbol.for("react.offscreen"),Wm=Symbol.iterator;function To(e){return e===null||typeof e!="object"?null:(e=Wm&&e[Wm]||e["@@iterator"],typeof e=="function"?e:null)}var $e=Object.assign,fc;function Ko(e){if(fc===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);fc=t&&t[1]||""}return`
`+fc+e}var pc=!1;function hc(e,t){if(!e||pc)return"";pc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==o[a]){var l=`
`+i[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=s&&0<=a);break}}}finally{pc=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ko(e):""}function uI(e){switch(e.tag){case 5:return Ko(e.type);case 16:return Ko("Lazy");case 13:return Ko("Suspense");case 19:return Ko("SuspenseList");case 0:case 2:case 15:return e=hc(e.type,!1),e;case 11:return e=hc(e.type.render,!1),e;case 1:return e=hc(e.type,!0),e;default:return""}}function Dd(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Oi:return"Fragment";case Di:return"Portal";case Rd:return"Profiler";case xp:return"StrictMode";case Nd:return"Suspense";case Pd:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Gw:return(e.displayName||"Context")+".Consumer";case Kw:return(e._context.displayName||"Context")+".Provider";case kp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Sp:return t=e.displayName||null,t!==null?t:Dd(e.type)||"Memo";case pr:t=e._payload,e=e._init;try{return Dd(e(t))}catch{}}return null}function cI(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Dd(t);case 8:return t===xp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function jr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Qw(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function dI(e){var t=Qw(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ka(e){e._valueTracker||(e._valueTracker=dI(e))}function Jw(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Qw(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function bl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Od(e,t){var n=t.checked;return $e({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function qm(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=jr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Xw(e,t){t=t.checked,t!=null&&bp(e,"checked",t,!1)}function Ld(e,t){Xw(e,t);var n=jr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Md(e,t.type,n):t.hasOwnProperty("defaultValue")&&Md(e,t.type,jr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Km(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Md(e,t,n){(t!=="number"||bl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Go=Array.isArray;function Ki(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+jr(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function jd(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(j(91));return $e({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Gm(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(j(92));if(Go(n)){if(1<n.length)throw Error(j(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:jr(n)}}function Zw(e,t){var n=jr(t.value),r=jr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ym(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function e_(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fd(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?e_(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Sa,t_=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Sa=Sa||document.createElement("div"),Sa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Sa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function gs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fI=["Webkit","ms","Moz","O"];Object.keys(Jo).forEach(function(e){fI.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jo[t]=Jo[e]})});function n_(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Jo.hasOwnProperty(e)&&Jo[e]?(""+t).trim():t+"px"}function r_(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=n_(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var pI=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ud(e,t){if(t){if(pI[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(j(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(j(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(j(61))}if(t.style!=null&&typeof t.style!="object")throw Error(j(62))}}function zd(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bd=null;function Ip(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vd=null,Gi=null,Yi=null;function Qm(e){if(e=Ys(e)){if(typeof Vd!="function")throw Error(j(280));var t=e.stateNode;t&&(t=Eu(t),Vd(e.stateNode,e.type,t))}}function i_(e){Gi?Yi?Yi.push(e):Yi=[e]:Gi=e}function o_(){if(Gi){var e=Gi,t=Yi;if(Yi=Gi=null,Qm(e),t)for(e=0;e<t.length;e++)Qm(t[e])}}function s_(e,t){return e(t)}function a_(){}var mc=!1;function l_(e,t,n){if(mc)return e(t,n);mc=!0;try{return s_(e,t,n)}finally{mc=!1,(Gi!==null||Yi!==null)&&(a_(),o_())}}function ys(e,t){var n=e.stateNode;if(n===null)return null;var r=Eu(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var $d=!1;if(Jn)try{var Ro={};Object.defineProperty(Ro,"passive",{get:function(){$d=!0}}),window.addEventListener("test",Ro,Ro),window.removeEventListener("test",Ro,Ro)}catch{$d=!1}function hI(e,t,n,r,i,o,s,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Xo=!1,xl=null,kl=!1,Hd=null,mI={onError:function(e){Xo=!0,xl=e}};function gI(e,t,n,r,i,o,s,a,l){Xo=!1,xl=null,hI.apply(mI,arguments)}function yI(e,t,n,r,i,o,s,a,l){if(gI.apply(this,arguments),Xo){if(Xo){var u=xl;Xo=!1,xl=null}else throw Error(j(198));kl||(kl=!0,Hd=u)}}function Ii(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Jm(e){if(Ii(e)!==e)throw Error(j(188))}function vI(e){var t=e.alternate;if(!t){if(t=Ii(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Jm(i),e;if(o===r)return Jm(i),t;o=o.sibling}throw Error(j(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s)throw Error(j(189))}}if(n.alternate!==r)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function c_(e){return e=vI(e),e!==null?d_(e):null}function d_(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=d_(e);if(t!==null)return t;e=e.sibling}return null}var f_=Qt.unstable_scheduleCallback,Xm=Qt.unstable_cancelCallback,wI=Qt.unstable_shouldYield,_I=Qt.unstable_requestPaint,Ke=Qt.unstable_now,bI=Qt.unstable_getCurrentPriorityLevel,Ep=Qt.unstable_ImmediatePriority,p_=Qt.unstable_UserBlockingPriority,Sl=Qt.unstable_NormalPriority,xI=Qt.unstable_LowPriority,h_=Qt.unstable_IdlePriority,xu=null,Pn=null;function kI(e){if(Pn&&typeof Pn.onCommitFiberRoot=="function")try{Pn.onCommitFiberRoot(xu,e,void 0,(e.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:EI,SI=Math.log,II=Math.LN2;function EI(e){return e>>>=0,e===0?32:31-(SI(e)/II|0)|0}var Ia=64,Ea=4194304;function Yo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Il(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~i;a!==0?r=Yo(a):(o&=s,o!==0&&(r=Yo(o)))}else s=n&~i,s!==0?r=Yo(s):o!==0&&(r=Yo(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-yn(t),i=1<<n,r|=e[n],t&=~i;return r}function CI(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function AI(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-yn(o),a=1<<s,l=i[s];l===-1?(!(a&n)||a&r)&&(i[s]=CI(a,t)):l<=t&&(e.expiredLanes|=a),o&=~a}}function Wd(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function m_(){var e=Ia;return Ia<<=1,!(Ia&4194240)&&(Ia=64),e}function gc(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ks(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-yn(t),e[t]=n}function TI(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-yn(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function Cp(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-yn(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var xe=0;function g_(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var y_,Ap,v_,w_,__,qd=!1,Ca=[],kr=null,Sr=null,Ir=null,vs=new Map,ws=new Map,mr=[],RI="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zm(e,t){switch(e){case"focusin":case"focusout":kr=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":Ir=null;break;case"pointerover":case"pointerout":vs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ws.delete(t.pointerId)}}function No(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Ys(t),t!==null&&Ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function NI(e,t,n,r,i){switch(t){case"focusin":return kr=No(kr,e,t,n,r,i),!0;case"dragenter":return Sr=No(Sr,e,t,n,r,i),!0;case"mouseover":return Ir=No(Ir,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return vs.set(o,No(vs.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,ws.set(o,No(ws.get(o)||null,e,t,n,r,i)),!0}return!1}function b_(e){var t=ti(e.target);if(t!==null){var n=Ii(t);if(n!==null){if(t=n.tag,t===13){if(t=u_(n),t!==null){e.blockedOn=t,__(e.priority,function(){v_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function el(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Kd(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Bd=r,n.target.dispatchEvent(r),Bd=null}else return t=Ys(n),t!==null&&Ap(t),e.blockedOn=n,!1;t.shift()}return!0}function eg(e,t,n){el(e)&&n.delete(t)}function PI(){qd=!1,kr!==null&&el(kr)&&(kr=null),Sr!==null&&el(Sr)&&(Sr=null),Ir!==null&&el(Ir)&&(Ir=null),vs.forEach(eg),ws.forEach(eg)}function Po(e,t){e.blockedOn===t&&(e.blockedOn=null,qd||(qd=!0,Qt.unstable_scheduleCallback(Qt.unstable_NormalPriority,PI)))}function _s(e){function t(i){return Po(i,e)}if(0<Ca.length){Po(Ca[0],e);for(var n=1;n<Ca.length;n++){var r=Ca[n];r.blockedOn===e&&(r.blockedOn=null)}}for(kr!==null&&Po(kr,e),Sr!==null&&Po(Sr,e),Ir!==null&&Po(Ir,e),vs.forEach(t),ws.forEach(t),n=0;n<mr.length;n++)r=mr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<mr.length&&(n=mr[0],n.blockedOn===null);)b_(n),n.blockedOn===null&&mr.shift()}var Qi=or.ReactCurrentBatchConfig,El=!0;function DI(e,t,n,r){var i=xe,o=Qi.transition;Qi.transition=null;try{xe=1,Tp(e,t,n,r)}finally{xe=i,Qi.transition=o}}function OI(e,t,n,r){var i=xe,o=Qi.transition;Qi.transition=null;try{xe=4,Tp(e,t,n,r)}finally{xe=i,Qi.transition=o}}function Tp(e,t,n,r){if(El){var i=Kd(e,t,n,r);if(i===null)Ec(e,t,r,Cl,n),Zm(e,r);else if(NI(i,e,t,n,r))r.stopPropagation();else if(Zm(e,r),t&4&&-1<RI.indexOf(e)){for(;i!==null;){var o=Ys(i);if(o!==null&&y_(o),o=Kd(e,t,n,r),o===null&&Ec(e,t,r,Cl,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else Ec(e,t,r,null,n)}}var Cl=null;function Kd(e,t,n,r){if(Cl=null,e=Ip(r),e=ti(e),e!==null)if(t=Ii(e),t===null)e=null;else if(n=t.tag,n===13){if(e=u_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Cl=e,null}function x_(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(bI()){case Ep:return 1;case p_:return 4;case Sl:case xI:return 16;case h_:return 536870912;default:return 16}default:return 16}}var br=null,Rp=null,tl=null;function k_(){if(tl)return tl;var e,t=Rp,n=t.length,r,i="value"in br?br.value:br.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return tl=i.slice(e,1<r?1-r:void 0)}function nl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Aa(){return!0}function tg(){return!1}function Xt(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Aa:tg,this.isPropagationStopped=tg,this}return $e(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Aa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Aa)},persist:function(){},isPersistent:Aa}),t}var wo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Np=Xt(wo),Gs=$e({},wo,{view:0,detail:0}),LI=Xt(Gs),yc,vc,Do,ku=$e({},Gs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Do&&(Do&&e.type==="mousemove"?(yc=e.screenX-Do.screenX,vc=e.screenY-Do.screenY):vc=yc=0,Do=e),yc)},movementY:function(e){return"movementY"in e?e.movementY:vc}}),ng=Xt(ku),MI=$e({},ku,{dataTransfer:0}),jI=Xt(MI),FI=$e({},Gs,{relatedTarget:0}),wc=Xt(FI),UI=$e({},wo,{animationName:0,elapsedTime:0,pseudoElement:0}),zI=Xt(UI),BI=$e({},wo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),VI=Xt(BI),$I=$e({},wo,{data:0}),rg=Xt($I),HI={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},WI={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qI={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function KI(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=qI[e])?!!t[e]:!1}function Pp(){return KI}var GI=$e({},Gs,{key:function(e){if(e.key){var t=HI[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=nl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?WI[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pp,charCode:function(e){return e.type==="keypress"?nl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?nl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),YI=Xt(GI),QI=$e({},ku,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ig=Xt(QI),JI=$e({},Gs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pp}),XI=Xt(JI),ZI=$e({},wo,{propertyName:0,elapsedTime:0,pseudoElement:0}),eE=Xt(ZI),tE=$e({},ku,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),nE=Xt(tE),rE=[9,13,27,32],Dp=Jn&&"CompositionEvent"in window,Zo=null;Jn&&"documentMode"in document&&(Zo=document.documentMode);var iE=Jn&&"TextEvent"in window&&!Zo,S_=Jn&&(!Dp||Zo&&8<Zo&&11>=Zo),og=" ",sg=!1;function I_(e,t){switch(e){case"keyup":return rE.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function E_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Li=!1;function oE(e,t){switch(e){case"compositionend":return E_(t);case"keypress":return t.which!==32?null:(sg=!0,og);case"textInput":return e=t.data,e===og&&sg?null:e;default:return null}}function sE(e,t){if(Li)return e==="compositionend"||!Dp&&I_(e,t)?(e=k_(),tl=Rp=br=null,Li=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return S_&&t.locale!=="ko"?null:t.data;default:return null}}var aE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ag(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!aE[e.type]:t==="textarea"}function C_(e,t,n,r){i_(r),t=Al(t,"onChange"),0<t.length&&(n=new Np("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var es=null,bs=null;function lE(e){F_(e,0)}function Su(e){var t=Fi(e);if(Jw(t))return e}function uE(e,t){if(e==="change")return t}var A_=!1;if(Jn){var _c;if(Jn){var bc="oninput"in document;if(!bc){var lg=document.createElement("div");lg.setAttribute("oninput","return;"),bc=typeof lg.oninput=="function"}_c=bc}else _c=!1;A_=_c&&(!document.documentMode||9<document.documentMode)}function ug(){es&&(es.detachEvent("onpropertychange",T_),bs=es=null)}function T_(e){if(e.propertyName==="value"&&Su(bs)){var t=[];C_(t,bs,e,Ip(e)),l_(lE,t)}}function cE(e,t,n){e==="focusin"?(ug(),es=t,bs=n,es.attachEvent("onpropertychange",T_)):e==="focusout"&&ug()}function dE(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Su(bs)}function fE(e,t){if(e==="click")return Su(t)}function pE(e,t){if(e==="input"||e==="change")return Su(t)}function hE(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var bn=typeof Object.is=="function"?Object.is:hE;function xs(e,t){if(bn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Td.call(t,i)||!bn(e[i],t[i]))return!1}return!0}function cg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dg(e,t){var n=cg(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=cg(n)}}function R_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?R_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function N_(){for(var e=window,t=bl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=bl(e.document)}return t}function Op(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function mE(e){var t=N_(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&R_(n.ownerDocument.documentElement,n)){if(r!==null&&Op(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=dg(n,o);var s=dg(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var gE=Jn&&"documentMode"in document&&11>=document.documentMode,Mi=null,Gd=null,ts=null,Yd=!1;function fg(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Yd||Mi==null||Mi!==bl(r)||(r=Mi,"selectionStart"in r&&Op(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ts&&xs(ts,r)||(ts=r,r=Al(Gd,"onSelect"),0<r.length&&(t=new Np("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Mi)))}function Ta(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ji={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},xc={},P_={};Jn&&(P_=document.createElement("div").style,"AnimationEvent"in window||(delete ji.animationend.animation,delete ji.animationiteration.animation,delete ji.animationstart.animation),"TransitionEvent"in window||delete ji.transitionend.transition);function Iu(e){if(xc[e])return xc[e];if(!ji[e])return e;var t=ji[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in P_)return xc[e]=t[n];return e}var D_=Iu("animationend"),O_=Iu("animationiteration"),L_=Iu("animationstart"),M_=Iu("transitionend"),j_=new Map,pg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $r(e,t){j_.set(e,t),Si(t,[e])}for(var kc=0;kc<pg.length;kc++){var Sc=pg[kc],yE=Sc.toLowerCase(),vE=Sc[0].toUpperCase()+Sc.slice(1);$r(yE,"on"+vE)}$r(D_,"onAnimationEnd");$r(O_,"onAnimationIteration");$r(L_,"onAnimationStart");$r("dblclick","onDoubleClick");$r("focusin","onFocus");$r("focusout","onBlur");$r(M_,"onTransitionEnd");io("onMouseEnter",["mouseout","mouseover"]);io("onMouseLeave",["mouseout","mouseover"]);io("onPointerEnter",["pointerout","pointerover"]);io("onPointerLeave",["pointerout","pointerover"]);Si("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Si("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Si("onBeforeInput",["compositionend","keypress","textInput","paste"]);Si("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Si("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Si("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wE=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qo));function hg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,yI(r,t,void 0,e),e.currentTarget=null}function F_(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;hg(i,a,u),o=l}else for(s=0;s<r.length;s++){if(a=r[s],l=a.instance,u=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;hg(i,a,u),o=l}}}if(kl)throw e=Hd,kl=!1,Hd=null,e}function Oe(e,t){var n=t[ef];n===void 0&&(n=t[ef]=new Set);var r=e+"__bubble";n.has(r)||(U_(t,e,2,!1),n.add(r))}function Ic(e,t,n){var r=0;t&&(r|=4),U_(n,e,r,t)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function ks(e){if(!e[Ra]){e[Ra]=!0,qw.forEach(function(n){n!=="selectionchange"&&(wE.has(n)||Ic(n,!1,e),Ic(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ra]||(t[Ra]=!0,Ic("selectionchange",!1,t))}}function U_(e,t,n,r){switch(x_(t)){case 1:var i=DI;break;case 4:i=OI;break;default:i=Tp}n=i.bind(null,t,n,e),i=void 0,!$d||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ec(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;s=s.return}for(;a!==null;){if(s=ti(a),s===null)return;if(l=s.tag,l===5||l===6){r=o=s;continue e}a=a.parentNode}}r=r.return}l_(function(){var u=o,d=Ip(n),c=[];e:{var f=j_.get(e);if(f!==void 0){var p=Np,m=e;switch(e){case"keypress":if(nl(n)===0)break e;case"keydown":case"keyup":p=YI;break;case"focusin":m="focus",p=wc;break;case"focusout":m="blur",p=wc;break;case"beforeblur":case"afterblur":p=wc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=ng;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=jI;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=XI;break;case D_:case O_:case L_:p=zI;break;case M_:p=eE;break;case"scroll":p=LI;break;case"wheel":p=nE;break;case"copy":case"cut":case"paste":p=VI;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ig}var w=(t&4)!==0,C=!w&&e==="scroll",y=w?f!==null?f+"Capture":null:f;w=[];for(var v=u,g;v!==null;){g=v;var k=g.stateNode;if(g.tag===5&&k!==null&&(g=k,y!==null&&(k=ys(v,y),k!=null&&w.push(Ss(v,k,g)))),C)break;v=v.return}0<w.length&&(f=new p(f,m,null,n,d),c.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==Bd&&(m=n.relatedTarget||n.fromElement)&&(ti(m)||m[Xn]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=u,m=m?ti(m):null,m!==null&&(C=Ii(m),m!==C||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=u),p!==m)){if(w=ng,k="onMouseLeave",y="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(w=ig,k="onPointerLeave",y="onPointerEnter",v="pointer"),C=p==null?f:Fi(p),g=m==null?f:Fi(m),f=new w(k,v+"leave",p,n,d),f.target=C,f.relatedTarget=g,k=null,ti(d)===u&&(w=new w(y,v+"enter",m,n,d),w.target=g,w.relatedTarget=C,k=w),C=k,p&&m)t:{for(w=p,y=m,v=0,g=w;g;g=Ti(g))v++;for(g=0,k=y;k;k=Ti(k))g++;for(;0<v-g;)w=Ti(w),v--;for(;0<g-v;)y=Ti(y),g--;for(;v--;){if(w===y||y!==null&&w===y.alternate)break t;w=Ti(w),y=Ti(y)}w=null}else w=null;p!==null&&mg(c,f,p,w,!1),m!==null&&C!==null&&mg(c,C,m,w,!0)}}e:{if(f=u?Fi(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var S=uE;else if(ag(f))if(A_)S=pE;else{S=dE;var x=cE}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=fE);if(S&&(S=S(e,u))){C_(c,S,n,d);break e}x&&x(e,f,u),e==="focusout"&&(x=f._wrapperState)&&x.controlled&&f.type==="number"&&Md(f,"number",f.value)}switch(x=u?Fi(u):window,e){case"focusin":(ag(x)||x.contentEditable==="true")&&(Mi=x,Gd=u,ts=null);break;case"focusout":ts=Gd=Mi=null;break;case"mousedown":Yd=!0;break;case"contextmenu":case"mouseup":case"dragend":Yd=!1,fg(c,n,d);break;case"selectionchange":if(gE)break;case"keydown":case"keyup":fg(c,n,d)}var A;if(Dp)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Li?I_(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(S_&&n.locale!=="ko"&&(Li||R!=="onCompositionStart"?R==="onCompositionEnd"&&Li&&(A=k_()):(br=d,Rp="value"in br?br.value:br.textContent,Li=!0)),x=Al(u,R),0<x.length&&(R=new rg(R,e,null,n,d),c.push({event:R,listeners:x}),A?R.data=A:(A=E_(n),A!==null&&(R.data=A)))),(A=iE?oE(e,n):sE(e,n))&&(u=Al(u,"onBeforeInput"),0<u.length&&(d=new rg("onBeforeInput","beforeinput",null,n,d),c.push({event:d,listeners:u}),d.data=A))}F_(c,t)})}function Ss(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Al(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ys(e,n),o!=null&&r.unshift(Ss(e,o,i)),o=ys(e,t),o!=null&&r.push(Ss(e,o,i))),e=e.return}return r}function Ti(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function mg(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&u!==null&&(a=u,i?(l=ys(n,o),l!=null&&s.unshift(Ss(n,l,a))):i||(l=ys(n,o),l!=null&&s.push(Ss(n,l,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var _E=/\r\n?/g,bE=/\u0000|\uFFFD/g;function gg(e){return(typeof e=="string"?e:""+e).replace(_E,`
`).replace(bE,"")}function Na(e,t,n){if(t=gg(t),gg(e)!==t&&n)throw Error(j(425))}function Tl(){}var Qd=null,Jd=null;function Xd(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Zd=typeof setTimeout=="function"?setTimeout:void 0,xE=typeof clearTimeout=="function"?clearTimeout:void 0,yg=typeof Promise=="function"?Promise:void 0,kE=typeof queueMicrotask=="function"?queueMicrotask:typeof yg<"u"?function(e){return yg.resolve(null).then(e).catch(SE)}:Zd;function SE(e){setTimeout(function(){throw e})}function Cc(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),_s(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);_s(t)}function Er(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function vg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _o=Math.random().toString(36).slice(2),Nn="__reactFiber$"+_o,Is="__reactProps$"+_o,Xn="__reactContainer$"+_o,ef="__reactEvents$"+_o,IE="__reactListeners$"+_o,EE="__reactHandles$"+_o;function ti(e){var t=e[Nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Xn]||n[Nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=vg(e);e!==null;){if(n=e[Nn])return n;e=vg(e)}return t}e=n,n=e.parentNode}return null}function Ys(e){return e=e[Nn]||e[Xn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Fi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(j(33))}function Eu(e){return e[Is]||null}var tf=[],Ui=-1;function Hr(e){return{current:e}}function Me(e){0>Ui||(e.current=tf[Ui],tf[Ui]=null,Ui--)}function De(e,t){Ui++,tf[Ui]=e.current,e.current=t}var Fr={},xt=Hr(Fr),jt=Hr(!1),di=Fr;function oo(e,t){var n=e.type.contextTypes;if(!n)return Fr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ft(e){return e=e.childContextTypes,e!=null}function Rl(){Me(jt),Me(xt)}function wg(e,t,n){if(xt.current!==Fr)throw Error(j(168));De(xt,t),De(jt,n)}function z_(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(j(108,cI(e)||"Unknown",i));return $e({},n,r)}function Nl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Fr,di=xt.current,De(xt,e),De(jt,jt.current),!0}function _g(e,t,n){var r=e.stateNode;if(!r)throw Error(j(169));n?(e=z_(e,t,di),r.__reactInternalMemoizedMergedChildContext=e,Me(jt),Me(xt),De(xt,e)):Me(jt),De(jt,n)}var Bn=null,Cu=!1,Ac=!1;function B_(e){Bn===null?Bn=[e]:Bn.push(e)}function CE(e){Cu=!0,B_(e)}function Wr(){if(!Ac&&Bn!==null){Ac=!0;var e=0,t=xe;try{var n=Bn;for(xe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Bn=null,Cu=!1}catch(i){throw Bn!==null&&(Bn=Bn.slice(e+1)),f_(Ep,Wr),i}finally{xe=t,Ac=!1}}return null}var zi=[],Bi=0,Pl=null,Dl=0,tn=[],nn=0,fi=null,Vn=1,$n="";function Yr(e,t){zi[Bi++]=Dl,zi[Bi++]=Pl,Pl=e,Dl=t}function V_(e,t,n){tn[nn++]=Vn,tn[nn++]=$n,tn[nn++]=fi,fi=e;var r=Vn;e=$n;var i=32-yn(r)-1;r&=~(1<<i),n+=1;var o=32-yn(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Vn=1<<32-yn(t)+i|n<<i|r,$n=o+e}else Vn=1<<o|n<<i|r,$n=e}function Lp(e){e.return!==null&&(Yr(e,1),V_(e,1,0))}function Mp(e){for(;e===Pl;)Pl=zi[--Bi],zi[Bi]=null,Dl=zi[--Bi],zi[Bi]=null;for(;e===fi;)fi=tn[--nn],tn[nn]=null,$n=tn[--nn],tn[nn]=null,Vn=tn[--nn],tn[nn]=null}var Gt=null,Kt=null,Fe=!1,pn=null;function $_(e,t){var n=on(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function bg(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Gt=e,Kt=Er(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Gt=e,Kt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=fi!==null?{id:Vn,overflow:$n}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=on(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Gt=e,Kt=null,!0):!1;default:return!1}}function nf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function rf(e){if(Fe){var t=Kt;if(t){var n=t;if(!bg(e,t)){if(nf(e))throw Error(j(418));t=Er(n.nextSibling);var r=Gt;t&&bg(e,t)?$_(r,n):(e.flags=e.flags&-4097|2,Fe=!1,Gt=e)}}else{if(nf(e))throw Error(j(418));e.flags=e.flags&-4097|2,Fe=!1,Gt=e}}}function xg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Gt=e}function Pa(e){if(e!==Gt)return!1;if(!Fe)return xg(e),Fe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Xd(e.type,e.memoizedProps)),t&&(t=Kt)){if(nf(e))throw H_(),Error(j(418));for(;t;)$_(e,t),t=Er(t.nextSibling)}if(xg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Kt=Er(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Kt=null}}else Kt=Gt?Er(e.stateNode.nextSibling):null;return!0}function H_(){for(var e=Kt;e;)e=Er(e.nextSibling)}function so(){Kt=Gt=null,Fe=!1}function jp(e){pn===null?pn=[e]:pn.push(e)}var AE=or.ReactCurrentBatchConfig;function Oo(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var r=n.stateNode}if(!r)throw Error(j(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var a=i.refs;s===null?delete a[o]:a[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,e))}return e}function Da(e,t){throw e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function kg(e){var t=e._init;return t(e._payload)}function W_(e){function t(y,v){if(e){var g=y.deletions;g===null?(y.deletions=[v],y.flags|=16):g.push(v)}}function n(y,v){if(!e)return null;for(;v!==null;)t(y,v),v=v.sibling;return null}function r(y,v){for(y=new Map;v!==null;)v.key!==null?y.set(v.key,v):y.set(v.index,v),v=v.sibling;return y}function i(y,v){return y=Rr(y,v),y.index=0,y.sibling=null,y}function o(y,v,g){return y.index=g,e?(g=y.alternate,g!==null?(g=g.index,g<v?(y.flags|=2,v):g):(y.flags|=2,v)):(y.flags|=1048576,v)}function s(y){return e&&y.alternate===null&&(y.flags|=2),y}function a(y,v,g,k){return v===null||v.tag!==6?(v=Lc(g,y.mode,k),v.return=y,v):(v=i(v,g),v.return=y,v)}function l(y,v,g,k){var S=g.type;return S===Oi?d(y,v,g.props.children,k,g.key):v!==null&&(v.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pr&&kg(S)===v.type)?(k=i(v,g.props),k.ref=Oo(y,v,g),k.return=y,k):(k=ul(g.type,g.key,g.props,null,y.mode,k),k.ref=Oo(y,v,g),k.return=y,k)}function u(y,v,g,k){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=Mc(g,y.mode,k),v.return=y,v):(v=i(v,g.children||[]),v.return=y,v)}function d(y,v,g,k,S){return v===null||v.tag!==7?(v=li(g,y.mode,k,S),v.return=y,v):(v=i(v,g),v.return=y,v)}function c(y,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Lc(""+v,y.mode,g),v.return=y,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case xa:return g=ul(v.type,v.key,v.props,null,y.mode,g),g.ref=Oo(y,null,v),g.return=y,g;case Di:return v=Mc(v,y.mode,g),v.return=y,v;case pr:var k=v._init;return c(y,k(v._payload),g)}if(Go(v)||To(v))return v=li(v,y.mode,g,null),v.return=y,v;Da(y,v)}return null}function f(y,v,g,k){var S=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return S!==null?null:a(y,v,""+g,k);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case xa:return g.key===S?l(y,v,g,k):null;case Di:return g.key===S?u(y,v,g,k):null;case pr:return S=g._init,f(y,v,S(g._payload),k)}if(Go(g)||To(g))return S!==null?null:d(y,v,g,k,null);Da(y,g)}return null}function p(y,v,g,k,S){if(typeof k=="string"&&k!==""||typeof k=="number")return y=y.get(g)||null,a(v,y,""+k,S);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case xa:return y=y.get(k.key===null?g:k.key)||null,l(v,y,k,S);case Di:return y=y.get(k.key===null?g:k.key)||null,u(v,y,k,S);case pr:var x=k._init;return p(y,v,g,x(k._payload),S)}if(Go(k)||To(k))return y=y.get(g)||null,d(v,y,k,S,null);Da(v,k)}return null}function m(y,v,g,k){for(var S=null,x=null,A=v,R=v=0,D=null;A!==null&&R<g.length;R++){A.index>R?(D=A,A=null):D=A.sibling;var E=f(y,A,g[R],k);if(E===null){A===null&&(A=D);break}e&&A&&E.alternate===null&&t(y,A),v=o(E,v,R),x===null?S=E:x.sibling=E,x=E,A=D}if(R===g.length)return n(y,A),Fe&&Yr(y,R),S;if(A===null){for(;R<g.length;R++)A=c(y,g[R],k),A!==null&&(v=o(A,v,R),x===null?S=A:x.sibling=A,x=A);return Fe&&Yr(y,R),S}for(A=r(y,A);R<g.length;R++)D=p(A,y,R,g[R],k),D!==null&&(e&&D.alternate!==null&&A.delete(D.key===null?R:D.key),v=o(D,v,R),x===null?S=D:x.sibling=D,x=D);return e&&A.forEach(function(F){return t(y,F)}),Fe&&Yr(y,R),S}function w(y,v,g,k){var S=To(g);if(typeof S!="function")throw Error(j(150));if(g=S.call(g),g==null)throw Error(j(151));for(var x=S=null,A=v,R=v=0,D=null,E=g.next();A!==null&&!E.done;R++,E=g.next()){A.index>R?(D=A,A=null):D=A.sibling;var F=f(y,A,E.value,k);if(F===null){A===null&&(A=D);break}e&&A&&F.alternate===null&&t(y,A),v=o(F,v,R),x===null?S=F:x.sibling=F,x=F,A=D}if(E.done)return n(y,A),Fe&&Yr(y,R),S;if(A===null){for(;!E.done;R++,E=g.next())E=c(y,E.value,k),E!==null&&(v=o(E,v,R),x===null?S=E:x.sibling=E,x=E);return Fe&&Yr(y,R),S}for(A=r(y,A);!E.done;R++,E=g.next())E=p(A,y,R,E.value,k),E!==null&&(e&&E.alternate!==null&&A.delete(E.key===null?R:E.key),v=o(E,v,R),x===null?S=E:x.sibling=E,x=E);return e&&A.forEach(function(V){return t(y,V)}),Fe&&Yr(y,R),S}function C(y,v,g,k){if(typeof g=="object"&&g!==null&&g.type===Oi&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case xa:e:{for(var S=g.key,x=v;x!==null;){if(x.key===S){if(S=g.type,S===Oi){if(x.tag===7){n(y,x.sibling),v=i(x,g.props.children),v.return=y,y=v;break e}}else if(x.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pr&&kg(S)===x.type){n(y,x.sibling),v=i(x,g.props),v.ref=Oo(y,x,g),v.return=y,y=v;break e}n(y,x);break}else t(y,x);x=x.sibling}g.type===Oi?(v=li(g.props.children,y.mode,k,g.key),v.return=y,y=v):(k=ul(g.type,g.key,g.props,null,y.mode,k),k.ref=Oo(y,v,g),k.return=y,y=k)}return s(y);case Di:e:{for(x=g.key;v!==null;){if(v.key===x)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){n(y,v.sibling),v=i(v,g.children||[]),v.return=y,y=v;break e}else{n(y,v);break}else t(y,v);v=v.sibling}v=Mc(g,y.mode,k),v.return=y,y=v}return s(y);case pr:return x=g._init,C(y,v,x(g._payload),k)}if(Go(g))return m(y,v,g,k);if(To(g))return w(y,v,g,k);Da(y,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(n(y,v.sibling),v=i(v,g),v.return=y,y=v):(n(y,v),v=Lc(g,y.mode,k),v.return=y,y=v),s(y)):n(y,v)}return C}var ao=W_(!0),q_=W_(!1),Ol=Hr(null),Ll=null,Vi=null,Fp=null;function Up(){Fp=Vi=Ll=null}function zp(e){var t=Ol.current;Me(Ol),e._currentValue=t}function of(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ji(e,t){Ll=e,Fp=Vi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Lt=!0),e.firstContext=null)}function an(e){var t=e._currentValue;if(Fp!==e)if(e={context:e,memoizedValue:t,next:null},Vi===null){if(Ll===null)throw Error(j(308));Vi=e,Ll.dependencies={lanes:0,firstContext:e}}else Vi=Vi.next=e;return t}var ni=null;function Bp(e){ni===null?ni=[e]:ni.push(e)}function K_(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Bp(t)):(n.next=i.next,i.next=n),t.interleaved=n,Zn(e,r)}function Zn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var hr=!1;function Vp(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function G_(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Yn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Cr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Zn(e,n)}return i=r.interleaved,i===null?(t.next=t,Bp(r)):(t.next=i.next,i.next=t),r.interleaved=t,Zn(e,n)}function rl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Cp(e,n)}}function Sg(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ml(e,t,n,r){var i=e.updateQueue;hr=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,u=l.next;l.next=null,s===null?o=u:s.next=u,s=l;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==s&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=l))}if(o!==null){var c=i.baseState;s=0,d=u=l=null,a=o;do{var f=a.lane,p=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=e,w=a;switch(f=t,p=n,w.tag){case 1:if(m=w.payload,typeof m=="function"){c=m.call(p,c,f);break e}c=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=w.payload,f=typeof m=="function"?m.call(p,c,f):m,f==null)break e;c=$e({},c,f);break e;case 2:hr=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=p,l=c):d=d.next=p,s|=f;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;f=a,a=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(d===null&&(l=c),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);hi|=s,e.lanes=s,e.memoizedState=c}}function Ig(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(j(191,i));i.call(r)}}}var Qs={},Dn=Hr(Qs),Es=Hr(Qs),Cs=Hr(Qs);function ri(e){if(e===Qs)throw Error(j(174));return e}function $p(e,t){switch(De(Cs,t),De(Es,e),De(Dn,Qs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Fd(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Fd(t,e)}Me(Dn),De(Dn,t)}function lo(){Me(Dn),Me(Es),Me(Cs)}function Y_(e){ri(Cs.current);var t=ri(Dn.current),n=Fd(t,e.type);t!==n&&(De(Es,e),De(Dn,n))}function Hp(e){Es.current===e&&(Me(Dn),Me(Es))}var ze=Hr(0);function jl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Tc=[];function Wp(){for(var e=0;e<Tc.length;e++)Tc[e]._workInProgressVersionPrimary=null;Tc.length=0}var il=or.ReactCurrentDispatcher,Rc=or.ReactCurrentBatchConfig,pi=0,Ve=null,et=null,at=null,Fl=!1,ns=!1,As=0,TE=0;function yt(){throw Error(j(321))}function qp(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!bn(e[n],t[n]))return!1;return!0}function Kp(e,t,n,r,i,o){if(pi=o,Ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,il.current=e===null||e.memoizedState===null?DE:OE,e=n(r,i),ns){o=0;do{if(ns=!1,As=0,25<=o)throw Error(j(301));o+=1,at=et=null,t.updateQueue=null,il.current=LE,e=n(r,i)}while(ns)}if(il.current=Ul,t=et!==null&&et.next!==null,pi=0,at=et=Ve=null,Fl=!1,t)throw Error(j(300));return e}function Gp(){var e=As!==0;return As=0,e}function An(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return at===null?Ve.memoizedState=at=e:at=at.next=e,at}function ln(){if(et===null){var e=Ve.alternate;e=e!==null?e.memoizedState:null}else e=et.next;var t=at===null?Ve.memoizedState:at.next;if(t!==null)at=t,et=e;else{if(e===null)throw Error(j(310));et=e,e={memoizedState:et.memoizedState,baseState:et.baseState,baseQueue:et.baseQueue,queue:et.queue,next:null},at===null?Ve.memoizedState=at=e:at=at.next=e}return at}function Ts(e,t){return typeof t=="function"?t(e):t}function Nc(e){var t=ln(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var r=et,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var a=s=null,l=null,u=o;do{var d=u.lane;if((pi&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=c,s=r):l=l.next=c,Ve.lanes|=d,hi|=d}u=u.next}while(u!==null&&u!==o);l===null?s=r:l.next=a,bn(r,t.memoizedState)||(Lt=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,Ve.lanes|=o,hi|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Pc(e){var t=ln(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);bn(o,t.memoizedState)||(Lt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Q_(){}function J_(e,t){var n=Ve,r=ln(),i=t(),o=!bn(r.memoizedState,i);if(o&&(r.memoizedState=i,Lt=!0),r=r.queue,Yp(eb.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||at!==null&&at.memoizedState.tag&1){if(n.flags|=2048,Rs(9,Z_.bind(null,n,r,i,t),void 0,null),ct===null)throw Error(j(349));pi&30||X_(n,t,i)}return i}function X_(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ve.updateQueue,t===null?(t={lastEffect:null,stores:null},Ve.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Z_(e,t,n,r){t.value=n,t.getSnapshot=r,tb(t)&&nb(e)}function eb(e,t,n){return n(function(){tb(t)&&nb(e)})}function tb(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!bn(e,n)}catch{return!0}}function nb(e){var t=Zn(e,1);t!==null&&vn(t,e,1,-1)}function Eg(e){var t=An();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ts,lastRenderedState:e},t.queue=e,e=e.dispatch=PE.bind(null,Ve,e),[t.memoizedState,e]}function Rs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ve.updateQueue,t===null?(t={lastEffect:null,stores:null},Ve.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function rb(){return ln().memoizedState}function ol(e,t,n,r){var i=An();Ve.flags|=e,i.memoizedState=Rs(1|t,n,void 0,r===void 0?null:r)}function Au(e,t,n,r){var i=ln();r=r===void 0?null:r;var o=void 0;if(et!==null){var s=et.memoizedState;if(o=s.destroy,r!==null&&qp(r,s.deps)){i.memoizedState=Rs(t,n,o,r);return}}Ve.flags|=e,i.memoizedState=Rs(1|t,n,o,r)}function Cg(e,t){return ol(8390656,8,e,t)}function Yp(e,t){return Au(2048,8,e,t)}function ib(e,t){return Au(4,2,e,t)}function ob(e,t){return Au(4,4,e,t)}function sb(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ab(e,t,n){return n=n!=null?n.concat([e]):null,Au(4,4,sb.bind(null,t,e),n)}function Qp(){}function lb(e,t){var n=ln();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qp(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ub(e,t){var n=ln();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qp(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function cb(e,t,n){return pi&21?(bn(n,t)||(n=m_(),Ve.lanes|=n,hi|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Lt=!0),e.memoizedState=n)}function RE(e,t){var n=xe;xe=n!==0&&4>n?n:4,e(!0);var r=Rc.transition;Rc.transition={};try{e(!1),t()}finally{xe=n,Rc.transition=r}}function db(){return ln().memoizedState}function NE(e,t,n){var r=Tr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},fb(e))pb(t,n);else if(n=K_(e,t,n,r),n!==null){var i=Ct();vn(n,e,r,i),hb(n,t,r)}}function PE(e,t,n){var r=Tr(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(fb(e))pb(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,a=o(s,n);if(i.hasEagerState=!0,i.eagerState=a,bn(a,s)){var l=t.interleaved;l===null?(i.next=i,Bp(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=K_(e,t,i,r),n!==null&&(i=Ct(),vn(n,e,r,i),hb(n,t,r))}}function fb(e){var t=e.alternate;return e===Ve||t!==null&&t===Ve}function pb(e,t){ns=Fl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hb(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Cp(e,n)}}var Ul={readContext:an,useCallback:yt,useContext:yt,useEffect:yt,useImperativeHandle:yt,useInsertionEffect:yt,useLayoutEffect:yt,useMemo:yt,useReducer:yt,useRef:yt,useState:yt,useDebugValue:yt,useDeferredValue:yt,useTransition:yt,useMutableSource:yt,useSyncExternalStore:yt,useId:yt,unstable_isNewReconciler:!1},DE={readContext:an,useCallback:function(e,t){return An().memoizedState=[e,t===void 0?null:t],e},useContext:an,useEffect:Cg,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ol(4194308,4,sb.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ol(4194308,4,e,t)},useInsertionEffect:function(e,t){return ol(4,2,e,t)},useMemo:function(e,t){var n=An();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=An();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=NE.bind(null,Ve,e),[r.memoizedState,e]},useRef:function(e){var t=An();return e={current:e},t.memoizedState=e},useState:Eg,useDebugValue:Qp,useDeferredValue:function(e){return An().memoizedState=e},useTransition:function(){var e=Eg(!1),t=e[0];return e=RE.bind(null,e[1]),An().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ve,i=An();if(Fe){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),ct===null)throw Error(j(349));pi&30||X_(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Cg(eb.bind(null,r,o,e),[e]),r.flags|=2048,Rs(9,Z_.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=An(),t=ct.identifierPrefix;if(Fe){var n=$n,r=Vn;n=(r&~(1<<32-yn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=As++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=TE++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},OE={readContext:an,useCallback:lb,useContext:an,useEffect:Yp,useImperativeHandle:ab,useInsertionEffect:ib,useLayoutEffect:ob,useMemo:ub,useReducer:Nc,useRef:rb,useState:function(){return Nc(Ts)},useDebugValue:Qp,useDeferredValue:function(e){var t=ln();return cb(t,et.memoizedState,e)},useTransition:function(){var e=Nc(Ts)[0],t=ln().memoizedState;return[e,t]},useMutableSource:Q_,useSyncExternalStore:J_,useId:db,unstable_isNewReconciler:!1},LE={readContext:an,useCallback:lb,useContext:an,useEffect:Yp,useImperativeHandle:ab,useInsertionEffect:ib,useLayoutEffect:ob,useMemo:ub,useReducer:Pc,useRef:rb,useState:function(){return Pc(Ts)},useDebugValue:Qp,useDeferredValue:function(e){var t=ln();return et===null?t.memoizedState=e:cb(t,et.memoizedState,e)},useTransition:function(){var e=Pc(Ts)[0],t=ln().memoizedState;return[e,t]},useMutableSource:Q_,useSyncExternalStore:J_,useId:db,unstable_isNewReconciler:!1};function dn(e,t){if(e&&e.defaultProps){t=$e({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function sf(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:$e({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Tu={isMounted:function(e){return(e=e._reactInternals)?Ii(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ct(),i=Tr(e),o=Yn(r,i);o.payload=t,n!=null&&(o.callback=n),t=Cr(e,o,i),t!==null&&(vn(t,e,i,r),rl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ct(),i=Tr(e),o=Yn(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Cr(e,o,i),t!==null&&(vn(t,e,i,r),rl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ct(),r=Tr(e),i=Yn(n,r);i.tag=2,t!=null&&(i.callback=t),t=Cr(e,i,r),t!==null&&(vn(t,e,r,n),rl(t,e,r))}};function Ag(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!xs(n,r)||!xs(i,o):!0}function mb(e,t,n){var r=!1,i=Fr,o=t.contextType;return typeof o=="object"&&o!==null?o=an(o):(i=Ft(t)?di:xt.current,r=t.contextTypes,o=(r=r!=null)?oo(e,i):Fr),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Tu,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Tg(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Tu.enqueueReplaceState(t,t.state,null)}function af(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Vp(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=an(o):(o=Ft(t)?di:xt.current,i.context=oo(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(sf(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Tu.enqueueReplaceState(i,i.state,null),Ml(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function uo(e,t){try{var n="",r=t;do n+=uI(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Dc(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function lf(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ME=typeof WeakMap=="function"?WeakMap:Map;function gb(e,t,n){n=Yn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Bl||(Bl=!0,vf=r),lf(e,t)},n}function yb(e,t,n){n=Yn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){lf(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){lf(e,t),typeof r!="function"&&(Ar===null?Ar=new Set([this]):Ar.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Rg(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ME;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=QE.bind(null,e,t,n),t.then(e,e))}function Ng(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Pg(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Yn(-1,1),t.tag=2,Cr(n,t,1))),n.lanes|=1),e)}var jE=or.ReactCurrentOwner,Lt=!1;function St(e,t,n,r){t.child=e===null?q_(t,null,n,r):ao(t,e.child,n,r)}function Dg(e,t,n,r,i){n=n.render;var o=t.ref;return Ji(t,i),r=Kp(e,t,n,r,o,i),n=Gp(),e!==null&&!Lt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,er(e,t,i)):(Fe&&n&&Lp(t),t.flags|=1,St(e,t,r,i),t.child)}function Og(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!ih(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,vb(e,t,o,r,i)):(e=ul(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:xs,n(s,r)&&e.ref===t.ref)return er(e,t,i)}return t.flags|=1,e=Rr(o,r),e.ref=t.ref,e.return=t,t.child=e}function vb(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(xs(o,r)&&e.ref===t.ref)if(Lt=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Lt=!0);else return t.lanes=e.lanes,er(e,t,i)}return uf(e,t,n,r,i)}function wb(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},De(Hi,qt),qt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,De(Hi,qt),qt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,De(Hi,qt),qt|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,De(Hi,qt),qt|=r;return St(e,t,i,n),t.child}function _b(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function uf(e,t,n,r,i){var o=Ft(n)?di:xt.current;return o=oo(t,o),Ji(t,i),n=Kp(e,t,n,r,o,i),r=Gp(),e!==null&&!Lt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,er(e,t,i)):(Fe&&r&&Lp(t),t.flags|=1,St(e,t,n,i),t.child)}function Lg(e,t,n,r,i){if(Ft(n)){var o=!0;Nl(t)}else o=!1;if(Ji(t,i),t.stateNode===null)sl(e,t),mb(t,n,r),af(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=an(u):(u=Ft(n)?di:xt.current,u=oo(t,u));var d=n.getDerivedStateFromProps,c=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";c||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||l!==u)&&Tg(t,s,r,u),hr=!1;var f=t.memoizedState;s.state=f,Ml(t,r,s,i),l=t.memoizedState,a!==r||f!==l||jt.current||hr?(typeof d=="function"&&(sf(t,n,d,r),l=t.memoizedState),(a=hr||Ag(t,n,a,r,f,l,u))?(c||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),s.props=r,s.state=l,s.context=u,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,G_(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:dn(t.type,a),s.props=u,c=t.pendingProps,f=s.context,l=n.contextType,typeof l=="object"&&l!==null?l=an(l):(l=Ft(n)?di:xt.current,l=oo(t,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==c||f!==l)&&Tg(t,s,r,l),hr=!1,f=t.memoizedState,s.state=f,Ml(t,r,s,i);var m=t.memoizedState;a!==c||f!==m||jt.current||hr?(typeof p=="function"&&(sf(t,n,p,r),m=t.memoizedState),(u=hr||Ag(t,n,u,r,f,m,l)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,m,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,m,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),s.props=r,s.state=m,s.context=l,r=u):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return cf(e,t,n,r,o,i)}function cf(e,t,n,r,i,o){_b(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&_g(t,n,!1),er(e,t,o);r=t.stateNode,jE.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=ao(t,e.child,null,o),t.child=ao(t,null,a,o)):St(e,t,a,o),t.memoizedState=r.state,i&&_g(t,n,!0),t.child}function bb(e){var t=e.stateNode;t.pendingContext?wg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&wg(e,t.context,!1),$p(e,t.containerInfo)}function Mg(e,t,n,r,i){return so(),jp(i),t.flags|=256,St(e,t,n,r),t.child}var df={dehydrated:null,treeContext:null,retryLane:0};function ff(e){return{baseLanes:e,cachePool:null,transitions:null}}function xb(e,t,n){var r=t.pendingProps,i=ze.current,o=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),De(ze,i&1),e===null)return rf(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Pu(s,r,0,null),e=li(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ff(n),t.memoizedState=df,e):Jp(t,s));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return FE(e,t,s,r,a,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=Rr(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?o=Rr(a,o):(o=li(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?ff(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=df,r}return o=e.child,e=o.sibling,r=Rr(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Jp(e,t){return t=Pu({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Oa(e,t,n,r){return r!==null&&jp(r),ao(t,e.child,null,n),e=Jp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function FE(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Dc(Error(j(422))),Oa(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Pu({mode:"visible",children:r.children},i,0,null),o=li(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&ao(t,e.child,null,s),t.child.memoizedState=ff(s),t.memoizedState=df,o);if(!(t.mode&1))return Oa(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(j(419)),r=Dc(o,r,void 0),Oa(e,t,s,r)}if(a=(s&e.childLanes)!==0,Lt||a){if(r=ct,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Zn(e,i),vn(r,e,i,-1))}return rh(),r=Dc(Error(j(421))),Oa(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=JE.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Kt=Er(i.nextSibling),Gt=t,Fe=!0,pn=null,e!==null&&(tn[nn++]=Vn,tn[nn++]=$n,tn[nn++]=fi,Vn=e.id,$n=e.overflow,fi=t),t=Jp(t,r.children),t.flags|=4096,t)}function jg(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),of(e.return,t,n)}function Oc(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function kb(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(St(e,t,r.children,n),r=ze.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&jg(e,n,t);else if(e.tag===19)jg(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(De(ze,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&jl(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Oc(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&jl(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Oc(t,!0,n,null,o);break;case"together":Oc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function sl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function er(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),hi|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=Rr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Rr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function UE(e,t,n){switch(t.tag){case 3:bb(t),so();break;case 5:Y_(t);break;case 1:Ft(t.type)&&Nl(t);break;case 4:$p(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;De(Ol,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(De(ze,ze.current&1),t.flags|=128,null):n&t.child.childLanes?xb(e,t,n):(De(ze,ze.current&1),e=er(e,t,n),e!==null?e.sibling:null);De(ze,ze.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return kb(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),De(ze,ze.current),r)break;return null;case 22:case 23:return t.lanes=0,wb(e,t,n)}return er(e,t,n)}var Sb,pf,Ib,Eb;Sb=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};pf=function(){};Ib=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,ri(Dn.current);var o=null;switch(n){case"input":i=Od(e,i),r=Od(e,r),o=[];break;case"select":i=$e({},i,{value:void 0}),r=$e({},r,{value:void 0}),o=[];break;case"textarea":i=jd(e,i),r=jd(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Tl)}Ud(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ms.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var l=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(n||(n={}),n[s]=l[s])}else n||(o||(o=[]),o.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(o=o||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ms.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&Oe("scroll",e),o||a===l||(o=[])):(o=o||[]).push(u,l))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Eb=function(e,t,n,r){n!==r&&(t.flags|=4)};function Lo(e,t){if(!Fe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function vt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function zE(e,t,n){var r=t.pendingProps;switch(Mp(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vt(t),null;case 1:return Ft(t.type)&&Rl(),vt(t),null;case 3:return r=t.stateNode,lo(),Me(jt),Me(xt),Wp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Pa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,pn!==null&&(bf(pn),pn=null))),pf(e,t),vt(t),null;case 5:Hp(t);var i=ri(Cs.current);if(n=t.type,e!==null&&t.stateNode!=null)Ib(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(j(166));return vt(t),null}if(e=ri(Dn.current),Pa(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Nn]=t,r[Is]=o,e=(t.mode&1)!==0,n){case"dialog":Oe("cancel",r),Oe("close",r);break;case"iframe":case"object":case"embed":Oe("load",r);break;case"video":case"audio":for(i=0;i<Qo.length;i++)Oe(Qo[i],r);break;case"source":Oe("error",r);break;case"img":case"image":case"link":Oe("error",r),Oe("load",r);break;case"details":Oe("toggle",r);break;case"input":qm(r,o),Oe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Oe("invalid",r);break;case"textarea":Gm(r,o),Oe("invalid",r)}Ud(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Na(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Na(r.textContent,a,e),i=["children",""+a]):ms.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&Oe("scroll",r)}switch(n){case"input":ka(r),Km(r,o,!0);break;case"textarea":ka(r),Ym(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Tl)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=e_(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[Nn]=t,e[Is]=r,Sb(e,t,!1,!1),t.stateNode=e;e:{switch(s=zd(n,r),n){case"dialog":Oe("cancel",e),Oe("close",e),i=r;break;case"iframe":case"object":case"embed":Oe("load",e),i=r;break;case"video":case"audio":for(i=0;i<Qo.length;i++)Oe(Qo[i],e);i=r;break;case"source":Oe("error",e),i=r;break;case"img":case"image":case"link":Oe("error",e),Oe("load",e),i=r;break;case"details":Oe("toggle",e),i=r;break;case"input":qm(e,r),i=Od(e,r),Oe("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=$e({},r,{value:void 0}),Oe("invalid",e);break;case"textarea":Gm(e,r),i=jd(e,r),Oe("invalid",e);break;default:i=r}Ud(n,i),a=i;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="style"?r_(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&t_(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&gs(e,l):typeof l=="number"&&gs(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ms.hasOwnProperty(o)?l!=null&&o==="onScroll"&&Oe("scroll",e):l!=null&&bp(e,o,l,s))}switch(n){case"input":ka(e),Km(e,r,!1);break;case"textarea":ka(e),Ym(e);break;case"option":r.value!=null&&e.setAttribute("value",""+jr(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Ki(e,!!r.multiple,o,!1):r.defaultValue!=null&&Ki(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Tl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return vt(t),null;case 6:if(e&&t.stateNode!=null)Eb(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(j(166));if(n=ri(Cs.current),ri(Dn.current),Pa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Nn]=t,(o=r.nodeValue!==n)&&(e=Gt,e!==null))switch(e.tag){case 3:Na(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Na(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Nn]=t,t.stateNode=r}return vt(t),null;case 13:if(Me(ze),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Fe&&Kt!==null&&t.mode&1&&!(t.flags&128))H_(),so(),t.flags|=98560,o=!1;else if(o=Pa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(j(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(j(317));o[Nn]=t}else so(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;vt(t),o=!1}else pn!==null&&(bf(pn),pn=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ze.current&1?it===0&&(it=3):rh())),t.updateQueue!==null&&(t.flags|=4),vt(t),null);case 4:return lo(),pf(e,t),e===null&&ks(t.stateNode.containerInfo),vt(t),null;case 10:return zp(t.type._context),vt(t),null;case 17:return Ft(t.type)&&Rl(),vt(t),null;case 19:if(Me(ze),o=t.memoizedState,o===null)return vt(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)Lo(o,!1);else{if(it!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=jl(e),s!==null){for(t.flags|=128,Lo(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return De(ze,ze.current&1|2),t.child}e=e.sibling}o.tail!==null&&Ke()>co&&(t.flags|=128,r=!0,Lo(o,!1),t.lanes=4194304)}else{if(!r)if(e=jl(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Lo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Fe)return vt(t),null}else 2*Ke()-o.renderingStartTime>co&&n!==1073741824&&(t.flags|=128,r=!0,Lo(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ke(),t.sibling=null,n=ze.current,De(ze,r?n&1|2:n&1),t):(vt(t),null);case 22:case 23:return nh(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?qt&1073741824&&(vt(t),t.subtreeFlags&6&&(t.flags|=8192)):vt(t),null;case 24:return null;case 25:return null}throw Error(j(156,t.tag))}function BE(e,t){switch(Mp(t),t.tag){case 1:return Ft(t.type)&&Rl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return lo(),Me(jt),Me(xt),Wp(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Hp(t),null;case 13:if(Me(ze),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));so()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Me(ze),null;case 4:return lo(),null;case 10:return zp(t.type._context),null;case 22:case 23:return nh(),null;case 24:return null;default:return null}}var La=!1,wt=!1,VE=typeof WeakSet=="function"?WeakSet:Set,W=null;function $i(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){qe(e,t,r)}else n.current=null}function hf(e,t,n){try{n()}catch(r){qe(e,t,r)}}var Fg=!1;function $E(e,t){if(Qd=El,e=N_(),Op(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,a=-1,l=-1,u=0,d=0,c=e,f=null;t:for(;;){for(var p;c!==n||i!==0&&c.nodeType!==3||(a=s+i),c!==o||r!==0&&c.nodeType!==3||(l=s+r),c.nodeType===3&&(s+=c.nodeValue.length),(p=c.firstChild)!==null;)f=c,c=p;for(;;){if(c===e)break t;if(f===n&&++u===i&&(a=s),f===o&&++d===r&&(l=s),(p=c.nextSibling)!==null)break;c=f,f=c.parentNode}c=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Jd={focusedElem:e,selectionRange:n},El=!1,W=t;W!==null;)if(t=W,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,W=e;else for(;W!==null;){t=W;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var w=m.memoizedProps,C=m.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?w:dn(t.type,w),C);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(k){qe(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,W=e;break}W=t.return}return m=Fg,Fg=!1,m}function rs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&hf(t,n,o)}i=i.next}while(i!==r)}}function Ru(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function mf(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Cb(e){var t=e.alternate;t!==null&&(e.alternate=null,Cb(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Nn],delete t[Is],delete t[ef],delete t[IE],delete t[EE])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ab(e){return e.tag===5||e.tag===3||e.tag===4}function Ug(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ab(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gf(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Tl));else if(r!==4&&(e=e.child,e!==null))for(gf(e,t,n),e=e.sibling;e!==null;)gf(e,t,n),e=e.sibling}function yf(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(yf(e,t,n),e=e.sibling;e!==null;)yf(e,t,n),e=e.sibling}var ft=null,fn=!1;function ur(e,t,n){for(n=n.child;n!==null;)Tb(e,t,n),n=n.sibling}function Tb(e,t,n){if(Pn&&typeof Pn.onCommitFiberUnmount=="function")try{Pn.onCommitFiberUnmount(xu,n)}catch{}switch(n.tag){case 5:wt||$i(n,t);case 6:var r=ft,i=fn;ft=null,ur(e,t,n),ft=r,fn=i,ft!==null&&(fn?(e=ft,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ft.removeChild(n.stateNode));break;case 18:ft!==null&&(fn?(e=ft,n=n.stateNode,e.nodeType===8?Cc(e.parentNode,n):e.nodeType===1&&Cc(e,n),_s(e)):Cc(ft,n.stateNode));break;case 4:r=ft,i=fn,ft=n.stateNode.containerInfo,fn=!0,ur(e,t,n),ft=r,fn=i;break;case 0:case 11:case 14:case 15:if(!wt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&hf(n,t,s),i=i.next}while(i!==r)}ur(e,t,n);break;case 1:if(!wt&&($i(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){qe(n,t,a)}ur(e,t,n);break;case 21:ur(e,t,n);break;case 22:n.mode&1?(wt=(r=wt)||n.memoizedState!==null,ur(e,t,n),wt=r):ur(e,t,n);break;default:ur(e,t,n)}}function zg(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new VE),t.forEach(function(r){var i=XE.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function cn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:ft=a.stateNode,fn=!1;break e;case 3:ft=a.stateNode.containerInfo,fn=!0;break e;case 4:ft=a.stateNode.containerInfo,fn=!0;break e}a=a.return}if(ft===null)throw Error(j(160));Tb(o,s,i),ft=null,fn=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(u){qe(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Rb(t,e),t=t.sibling}function Rb(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(cn(t,e),Cn(e),r&4){try{rs(3,e,e.return),Ru(3,e)}catch(w){qe(e,e.return,w)}try{rs(5,e,e.return)}catch(w){qe(e,e.return,w)}}break;case 1:cn(t,e),Cn(e),r&512&&n!==null&&$i(n,n.return);break;case 5:if(cn(t,e),Cn(e),r&512&&n!==null&&$i(n,n.return),e.flags&32){var i=e.stateNode;try{gs(i,"")}catch(w){qe(e,e.return,w)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&Xw(i,o),zd(a,s);var u=zd(a,o);for(s=0;s<l.length;s+=2){var d=l[s],c=l[s+1];d==="style"?r_(i,c):d==="dangerouslySetInnerHTML"?t_(i,c):d==="children"?gs(i,c):bp(i,d,c,u)}switch(a){case"input":Ld(i,o);break;case"textarea":Zw(i,o);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var p=o.value;p!=null?Ki(i,!!o.multiple,p,!1):f!==!!o.multiple&&(o.defaultValue!=null?Ki(i,!!o.multiple,o.defaultValue,!0):Ki(i,!!o.multiple,o.multiple?[]:"",!1))}i[Is]=o}catch(w){qe(e,e.return,w)}}break;case 6:if(cn(t,e),Cn(e),r&4){if(e.stateNode===null)throw Error(j(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(w){qe(e,e.return,w)}}break;case 3:if(cn(t,e),Cn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{_s(t.containerInfo)}catch(w){qe(e,e.return,w)}break;case 4:cn(t,e),Cn(e);break;case 13:cn(t,e),Cn(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(eh=Ke())),r&4&&zg(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(wt=(u=wt)||d,cn(t,e),wt=u):cn(t,e),Cn(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(W=e,d=e.child;d!==null;){for(c=W=d;W!==null;){switch(f=W,p=f.child,f.tag){case 0:case 11:case 14:case 15:rs(4,f,f.return);break;case 1:$i(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(w){qe(r,n,w)}}break;case 5:$i(f,f.return);break;case 22:if(f.memoizedState!==null){Vg(c);continue}}p!==null?(p.return=f,W=p):Vg(c)}d=d.sibling}e:for(d=null,c=e;;){if(c.tag===5){if(d===null){d=c;try{i=c.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=c.stateNode,l=c.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=n_("display",s))}catch(w){qe(e,e.return,w)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(w){qe(e,e.return,w)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===e)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break e;for(;c.sibling===null;){if(c.return===null||c.return===e)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:cn(t,e),Cn(e),r&4&&zg(e);break;case 21:break;default:cn(t,e),Cn(e)}}function Cn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ab(n)){var r=n;break e}n=n.return}throw Error(j(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(gs(i,""),r.flags&=-33);var o=Ug(e);yf(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Ug(e);gf(e,a,s);break;default:throw Error(j(161))}}catch(l){qe(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function HE(e,t,n){W=e,Nb(e)}function Nb(e,t,n){for(var r=(e.mode&1)!==0;W!==null;){var i=W,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||La;if(!s){var a=i.alternate,l=a!==null&&a.memoizedState!==null||wt;a=La;var u=wt;if(La=s,(wt=l)&&!u)for(W=i;W!==null;)s=W,l=s.child,s.tag===22&&s.memoizedState!==null?$g(i):l!==null?(l.return=s,W=l):$g(i);for(;o!==null;)W=o,Nb(o),o=o.sibling;W=i,La=a,wt=u}Bg(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,W=o):Bg(e)}}function Bg(e){for(;W!==null;){var t=W;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:wt||Ru(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!wt)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:dn(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ig(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ig(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&_s(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}wt||t.flags&512&&mf(t)}catch(f){qe(t,t.return,f)}}if(t===e){W=null;break}if(n=t.sibling,n!==null){n.return=t.return,W=n;break}W=t.return}}function Vg(e){for(;W!==null;){var t=W;if(t===e){W=null;break}var n=t.sibling;if(n!==null){n.return=t.return,W=n;break}W=t.return}}function $g(e){for(;W!==null;){var t=W;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ru(4,t)}catch(l){qe(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){qe(t,i,l)}}var o=t.return;try{mf(t)}catch(l){qe(t,o,l)}break;case 5:var s=t.return;try{mf(t)}catch(l){qe(t,s,l)}}}catch(l){qe(t,t.return,l)}if(t===e){W=null;break}var a=t.sibling;if(a!==null){a.return=t.return,W=a;break}W=t.return}}var WE=Math.ceil,zl=or.ReactCurrentDispatcher,Xp=or.ReactCurrentOwner,sn=or.ReactCurrentBatchConfig,ge=0,ct=null,Xe=null,pt=0,qt=0,Hi=Hr(0),it=0,Ns=null,hi=0,Nu=0,Zp=0,is=null,Ot=null,eh=0,co=1/0,zn=null,Bl=!1,vf=null,Ar=null,Ma=!1,xr=null,Vl=0,os=0,wf=null,al=-1,ll=0;function Ct(){return ge&6?Ke():al!==-1?al:al=Ke()}function Tr(e){return e.mode&1?ge&2&&pt!==0?pt&-pt:AE.transition!==null?(ll===0&&(ll=m_()),ll):(e=xe,e!==0||(e=window.event,e=e===void 0?16:x_(e.type)),e):1}function vn(e,t,n,r){if(50<os)throw os=0,wf=null,Error(j(185));Ks(e,n,r),(!(ge&2)||e!==ct)&&(e===ct&&(!(ge&2)&&(Nu|=n),it===4&&gr(e,pt)),Ut(e,r),n===1&&ge===0&&!(t.mode&1)&&(co=Ke()+500,Cu&&Wr()))}function Ut(e,t){var n=e.callbackNode;AI(e,t);var r=Il(e,e===ct?pt:0);if(r===0)n!==null&&Xm(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Xm(n),t===1)e.tag===0?CE(Hg.bind(null,e)):B_(Hg.bind(null,e)),kE(function(){!(ge&6)&&Wr()}),n=null;else{switch(g_(r)){case 1:n=Ep;break;case 4:n=p_;break;case 16:n=Sl;break;case 536870912:n=h_;break;default:n=Sl}n=Ub(n,Pb.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Pb(e,t){if(al=-1,ll=0,ge&6)throw Error(j(327));var n=e.callbackNode;if(Xi()&&e.callbackNode!==n)return null;var r=Il(e,e===ct?pt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=$l(e,r);else{t=r;var i=ge;ge|=2;var o=Ob();(ct!==e||pt!==t)&&(zn=null,co=Ke()+500,ai(e,t));do try{GE();break}catch(a){Db(e,a)}while(!0);Up(),zl.current=o,ge=i,Xe!==null?t=0:(ct=null,pt=0,t=it)}if(t!==0){if(t===2&&(i=Wd(e),i!==0&&(r=i,t=_f(e,i))),t===1)throw n=Ns,ai(e,0),gr(e,r),Ut(e,Ke()),n;if(t===6)gr(e,r);else{if(i=e.current.alternate,!(r&30)&&!qE(i)&&(t=$l(e,r),t===2&&(o=Wd(e),o!==0&&(r=o,t=_f(e,o))),t===1))throw n=Ns,ai(e,0),gr(e,r),Ut(e,Ke()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(j(345));case 2:Qr(e,Ot,zn);break;case 3:if(gr(e,r),(r&130023424)===r&&(t=eh+500-Ke(),10<t)){if(Il(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ct(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Zd(Qr.bind(null,e,Ot,zn),t);break}Qr(e,Ot,zn);break;case 4:if(gr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-yn(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=Ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*WE(r/1960))-r,10<r){e.timeoutHandle=Zd(Qr.bind(null,e,Ot,zn),r);break}Qr(e,Ot,zn);break;case 5:Qr(e,Ot,zn);break;default:throw Error(j(329))}}}return Ut(e,Ke()),e.callbackNode===n?Pb.bind(null,e):null}function _f(e,t){var n=is;return e.current.memoizedState.isDehydrated&&(ai(e,t).flags|=256),e=$l(e,t),e!==2&&(t=Ot,Ot=n,t!==null&&bf(t)),e}function bf(e){Ot===null?Ot=e:Ot.push.apply(Ot,e)}function qE(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!bn(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gr(e,t){for(t&=~Zp,t&=~Nu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-yn(t),r=1<<n;e[n]=-1,t&=~r}}function Hg(e){if(ge&6)throw Error(j(327));Xi();var t=Il(e,0);if(!(t&1))return Ut(e,Ke()),null;var n=$l(e,t);if(e.tag!==0&&n===2){var r=Wd(e);r!==0&&(t=r,n=_f(e,r))}if(n===1)throw n=Ns,ai(e,0),gr(e,t),Ut(e,Ke()),n;if(n===6)throw Error(j(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Qr(e,Ot,zn),Ut(e,Ke()),null}function th(e,t){var n=ge;ge|=1;try{return e(t)}finally{ge=n,ge===0&&(co=Ke()+500,Cu&&Wr())}}function mi(e){xr!==null&&xr.tag===0&&!(ge&6)&&Xi();var t=ge;ge|=1;var n=sn.transition,r=xe;try{if(sn.transition=null,xe=1,e)return e()}finally{xe=r,sn.transition=n,ge=t,!(ge&6)&&Wr()}}function nh(){qt=Hi.current,Me(Hi)}function ai(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,xE(n)),Xe!==null)for(n=Xe.return;n!==null;){var r=n;switch(Mp(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Rl();break;case 3:lo(),Me(jt),Me(xt),Wp();break;case 5:Hp(r);break;case 4:lo();break;case 13:Me(ze);break;case 19:Me(ze);break;case 10:zp(r.type._context);break;case 22:case 23:nh()}n=n.return}if(ct=e,Xe=e=Rr(e.current,null),pt=qt=t,it=0,Ns=null,Zp=Nu=hi=0,Ot=is=null,ni!==null){for(t=0;t<ni.length;t++)if(n=ni[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}ni=null}return e}function Db(e,t){do{var n=Xe;try{if(Up(),il.current=Ul,Fl){for(var r=Ve.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Fl=!1}if(pi=0,at=et=Ve=null,ns=!1,As=0,Xp.current=null,n===null||n.return===null){it=1,Ns=t,Xe=null;break}e:{var o=e,s=n.return,a=n,l=t;if(t=pt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Ng(s);if(p!==null){p.flags&=-257,Pg(p,s,a,o,t),p.mode&1&&Rg(o,u,t),t=p,l=u;var m=t.updateQueue;if(m===null){var w=new Set;w.add(l),t.updateQueue=w}else m.add(l);break e}else{if(!(t&1)){Rg(o,u,t),rh();break e}l=Error(j(426))}}else if(Fe&&a.mode&1){var C=Ng(s);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Pg(C,s,a,o,t),jp(uo(l,a));break e}}o=l=uo(l,a),it!==4&&(it=2),is===null?is=[o]:is.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var y=gb(o,l,t);Sg(o,y);break e;case 1:a=l;var v=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Ar===null||!Ar.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=yb(o,a,t);Sg(o,k);break e}}o=o.return}while(o!==null)}Mb(n)}catch(S){t=S,Xe===n&&n!==null&&(Xe=n=n.return);continue}break}while(!0)}function Ob(){var e=zl.current;return zl.current=Ul,e===null?Ul:e}function rh(){(it===0||it===3||it===2)&&(it=4),ct===null||!(hi&268435455)&&!(Nu&268435455)||gr(ct,pt)}function $l(e,t){var n=ge;ge|=2;var r=Ob();(ct!==e||pt!==t)&&(zn=null,ai(e,t));do try{KE();break}catch(i){Db(e,i)}while(!0);if(Up(),ge=n,zl.current=r,Xe!==null)throw Error(j(261));return ct=null,pt=0,it}function KE(){for(;Xe!==null;)Lb(Xe)}function GE(){for(;Xe!==null&&!wI();)Lb(Xe)}function Lb(e){var t=Fb(e.alternate,e,qt);e.memoizedProps=e.pendingProps,t===null?Mb(e):Xe=t,Xp.current=null}function Mb(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=BE(n,t),n!==null){n.flags&=32767,Xe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{it=6,Xe=null;return}}else if(n=zE(n,t,qt),n!==null){Xe=n;return}if(t=t.sibling,t!==null){Xe=t;return}Xe=t=e}while(t!==null);it===0&&(it=5)}function Qr(e,t,n){var r=xe,i=sn.transition;try{sn.transition=null,xe=1,YE(e,t,n,r)}finally{sn.transition=i,xe=r}return null}function YE(e,t,n,r){do Xi();while(xr!==null);if(ge&6)throw Error(j(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(j(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(TI(e,o),e===ct&&(Xe=ct=null,pt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ma||(Ma=!0,Ub(Sl,function(){return Xi(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=sn.transition,sn.transition=null;var s=xe;xe=1;var a=ge;ge|=4,Xp.current=null,$E(e,n),Rb(n,e),mE(Jd),El=!!Qd,Jd=Qd=null,e.current=n,HE(n),_I(),ge=a,xe=s,sn.transition=o}else e.current=n;if(Ma&&(Ma=!1,xr=e,Vl=i),o=e.pendingLanes,o===0&&(Ar=null),kI(n.stateNode),Ut(e,Ke()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Bl)throw Bl=!1,e=vf,vf=null,e;return Vl&1&&e.tag!==0&&Xi(),o=e.pendingLanes,o&1?e===wf?os++:(os=0,wf=e):os=0,Wr(),null}function Xi(){if(xr!==null){var e=g_(Vl),t=sn.transition,n=xe;try{if(sn.transition=null,xe=16>e?16:e,xr===null)var r=!1;else{if(e=xr,xr=null,Vl=0,ge&6)throw Error(j(331));var i=ge;for(ge|=4,W=e.current;W!==null;){var o=W,s=o.child;if(W.flags&16){var a=o.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(W=u;W!==null;){var d=W;switch(d.tag){case 0:case 11:case 15:rs(8,d,o)}var c=d.child;if(c!==null)c.return=d,W=c;else for(;W!==null;){d=W;var f=d.sibling,p=d.return;if(Cb(d),d===u){W=null;break}if(f!==null){f.return=p,W=f;break}W=p}}}var m=o.alternate;if(m!==null){var w=m.child;if(w!==null){m.child=null;do{var C=w.sibling;w.sibling=null,w=C}while(w!==null)}}W=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,W=s;else e:for(;W!==null;){if(o=W,o.flags&2048)switch(o.tag){case 0:case 11:case 15:rs(9,o,o.return)}var y=o.sibling;if(y!==null){y.return=o.return,W=y;break e}W=o.return}}var v=e.current;for(W=v;W!==null;){s=W;var g=s.child;if(s.subtreeFlags&2064&&g!==null)g.return=s,W=g;else e:for(s=v;W!==null;){if(a=W,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ru(9,a)}}catch(S){qe(a,a.return,S)}if(a===s){W=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,W=k;break e}W=a.return}}if(ge=i,Wr(),Pn&&typeof Pn.onPostCommitFiberRoot=="function")try{Pn.onPostCommitFiberRoot(xu,e)}catch{}r=!0}return r}finally{xe=n,sn.transition=t}}return!1}function Wg(e,t,n){t=uo(n,t),t=gb(e,t,1),e=Cr(e,t,1),t=Ct(),e!==null&&(Ks(e,1,t),Ut(e,t))}function qe(e,t,n){if(e.tag===3)Wg(e,e,n);else for(;t!==null;){if(t.tag===3){Wg(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ar===null||!Ar.has(r))){e=uo(n,e),e=yb(t,e,1),t=Cr(t,e,1),e=Ct(),t!==null&&(Ks(t,1,e),Ut(t,e));break}}t=t.return}}function QE(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ct(),e.pingedLanes|=e.suspendedLanes&n,ct===e&&(pt&n)===n&&(it===4||it===3&&(pt&130023424)===pt&&500>Ke()-eh?ai(e,0):Zp|=n),Ut(e,t)}function jb(e,t){t===0&&(e.mode&1?(t=Ea,Ea<<=1,!(Ea&130023424)&&(Ea=4194304)):t=1);var n=Ct();e=Zn(e,t),e!==null&&(Ks(e,t,n),Ut(e,n))}function JE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),jb(e,n)}function XE(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(j(314))}r!==null&&r.delete(t),jb(e,n)}var Fb;Fb=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||jt.current)Lt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Lt=!1,UE(e,t,n);Lt=!!(e.flags&131072)}else Lt=!1,Fe&&t.flags&1048576&&V_(t,Dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;sl(e,t),e=t.pendingProps;var i=oo(t,xt.current);Ji(t,n),i=Kp(null,t,r,e,i,n);var o=Gp();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ft(r)?(o=!0,Nl(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Vp(t),i.updater=Tu,t.stateNode=i,i._reactInternals=t,af(t,r,e,n),t=cf(null,t,r,!0,o,n)):(t.tag=0,Fe&&o&&Lp(t),St(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(sl(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=eC(r),e=dn(r,e),i){case 0:t=uf(null,t,r,e,n);break e;case 1:t=Lg(null,t,r,e,n);break e;case 11:t=Dg(null,t,r,e,n);break e;case 14:t=Og(null,t,r,dn(r.type,e),n);break e}throw Error(j(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),uf(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),Lg(e,t,r,i,n);case 3:e:{if(bb(t),e===null)throw Error(j(387));r=t.pendingProps,o=t.memoizedState,i=o.element,G_(e,t),Ml(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=uo(Error(j(423)),t),t=Mg(e,t,r,n,i);break e}else if(r!==i){i=uo(Error(j(424)),t),t=Mg(e,t,r,n,i);break e}else for(Kt=Er(t.stateNode.containerInfo.firstChild),Gt=t,Fe=!0,pn=null,n=q_(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(so(),r===i){t=er(e,t,n);break e}St(e,t,r,n)}t=t.child}return t;case 5:return Y_(t),e===null&&rf(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,Xd(r,i)?s=null:o!==null&&Xd(r,o)&&(t.flags|=32),_b(e,t),St(e,t,s,n),t.child;case 6:return e===null&&rf(t),null;case 13:return xb(e,t,n);case 4:return $p(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ao(t,null,r,n):St(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),Dg(e,t,r,i,n);case 7:return St(e,t,t.pendingProps,n),t.child;case 8:return St(e,t,t.pendingProps.children,n),t.child;case 12:return St(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,De(Ol,r._currentValue),r._currentValue=s,o!==null)if(bn(o.value,s)){if(o.children===i.children&&!jt.current){t=er(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Yn(-1,n&-n),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),of(o.return,n,t),a.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(j(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),of(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}St(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Ji(t,n),i=an(i),r=r(i),t.flags|=1,St(e,t,r,n),t.child;case 14:return r=t.type,i=dn(r,t.pendingProps),i=dn(r.type,i),Og(e,t,r,i,n);case 15:return vb(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:dn(r,i),sl(e,t),t.tag=1,Ft(r)?(e=!0,Nl(t)):e=!1,Ji(t,n),mb(t,r,i),af(t,r,i,n),cf(null,t,r,!0,e,n);case 19:return kb(e,t,n);case 22:return wb(e,t,n)}throw Error(j(156,t.tag))};function Ub(e,t){return f_(e,t)}function ZE(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function on(e,t,n,r){return new ZE(e,t,n,r)}function ih(e){return e=e.prototype,!(!e||!e.isReactComponent)}function eC(e){if(typeof e=="function")return ih(e)?1:0;if(e!=null){if(e=e.$$typeof,e===kp)return 11;if(e===Sp)return 14}return 2}function Rr(e,t){var n=e.alternate;return n===null?(n=on(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ul(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")ih(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Oi:return li(n.children,i,o,t);case xp:s=8,i|=8;break;case Rd:return e=on(12,n,t,i|2),e.elementType=Rd,e.lanes=o,e;case Nd:return e=on(13,n,t,i),e.elementType=Nd,e.lanes=o,e;case Pd:return e=on(19,n,t,i),e.elementType=Pd,e.lanes=o,e;case Yw:return Pu(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Kw:s=10;break e;case Gw:s=9;break e;case kp:s=11;break e;case Sp:s=14;break e;case pr:s=16,r=null;break e}throw Error(j(130,e==null?e:typeof e,""))}return t=on(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function li(e,t,n,r){return e=on(7,e,r,t),e.lanes=n,e}function Pu(e,t,n,r){return e=on(22,e,r,t),e.elementType=Yw,e.lanes=n,e.stateNode={isHidden:!1},e}function Lc(e,t,n){return e=on(6,e,null,t),e.lanes=n,e}function Mc(e,t,n){return t=on(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function tC(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gc(0),this.expirationTimes=gc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function oh(e,t,n,r,i,o,s,a,l){return e=new tC(e,t,n,a,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=on(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vp(o),e}function nC(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Di,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function zb(e){if(!e)return Fr;e=e._reactInternals;e:{if(Ii(e)!==e||e.tag!==1)throw Error(j(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ft(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(j(171))}if(e.tag===1){var n=e.type;if(Ft(n))return z_(e,n,t)}return t}function Bb(e,t,n,r,i,o,s,a,l){return e=oh(n,r,!0,e,i,o,s,a,l),e.context=zb(null),n=e.current,r=Ct(),i=Tr(n),o=Yn(r,i),o.callback=t??null,Cr(n,o,i),e.current.lanes=i,Ks(e,i,r),Ut(e,r),e}function Du(e,t,n,r){var i=t.current,o=Ct(),s=Tr(i);return n=zb(n),t.context===null?t.context=n:t.pendingContext=n,t=Yn(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Cr(i,t,s),e!==null&&(vn(e,i,s,o),rl(e,i,s)),s}function Hl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function qg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function sh(e,t){qg(e,t),(e=e.alternate)&&qg(e,t)}function rC(){return null}var Vb=typeof reportError=="function"?reportError:function(e){console.error(e)};function ah(e){this._internalRoot=e}Ou.prototype.render=ah.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));Du(e,t,null,null)};Ou.prototype.unmount=ah.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mi(function(){Du(null,e,null,null)}),t[Xn]=null}};function Ou(e){this._internalRoot=e}Ou.prototype.unstable_scheduleHydration=function(e){if(e){var t=w_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<mr.length&&t!==0&&t<mr[n].priority;n++);mr.splice(n,0,e),n===0&&b_(e)}};function lh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Lu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Kg(){}function iC(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=Hl(s);o.call(u)}}var s=Bb(t,r,e,0,null,!1,!1,"",Kg);return e._reactRootContainer=s,e[Xn]=s.current,ks(e.nodeType===8?e.parentNode:e),mi(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=Hl(l);a.call(u)}}var l=oh(e,0,!1,null,null,!1,!1,"",Kg);return e._reactRootContainer=l,e[Xn]=l.current,ks(e.nodeType===8?e.parentNode:e),mi(function(){Du(t,l,n,r)}),l}function Mu(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var a=i;i=function(){var l=Hl(s);a.call(l)}}Du(t,s,e,i)}else s=iC(n,t,e,i,r);return Hl(s)}y_=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Yo(t.pendingLanes);n!==0&&(Cp(t,n|1),Ut(t,Ke()),!(ge&6)&&(co=Ke()+500,Wr()))}break;case 13:mi(function(){var r=Zn(e,1);if(r!==null){var i=Ct();vn(r,e,1,i)}}),sh(e,1)}};Ap=function(e){if(e.tag===13){var t=Zn(e,134217728);if(t!==null){var n=Ct();vn(t,e,134217728,n)}sh(e,134217728)}};v_=function(e){if(e.tag===13){var t=Tr(e),n=Zn(e,t);if(n!==null){var r=Ct();vn(n,e,t,r)}sh(e,t)}};w_=function(){return xe};__=function(e,t){var n=xe;try{return xe=e,t()}finally{xe=n}};Vd=function(e,t,n){switch(t){case"input":if(Ld(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Eu(r);if(!i)throw Error(j(90));Jw(r),Ld(r,i)}}}break;case"textarea":Zw(e,n);break;case"select":t=n.value,t!=null&&Ki(e,!!n.multiple,t,!1)}};s_=th;a_=mi;var oC={usingClientEntryPoint:!1,Events:[Ys,Fi,Eu,i_,o_,th]},Mo={findFiberByHostInstance:ti,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sC={bundleType:Mo.bundleType,version:Mo.version,rendererPackageName:Mo.rendererPackageName,rendererConfig:Mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:or.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=c_(e),e===null?null:e.stateNode},findFiberByHostInstance:Mo.findFiberByHostInstance||rC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ja=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ja.isDisabled&&ja.supportsFiber)try{xu=ja.inject(sC),Pn=ja}catch{}}Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oC;Jt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!lh(t))throw Error(j(200));return nC(e,t,null,n)};Jt.createRoot=function(e,t){if(!lh(e))throw Error(j(299));var n=!1,r="",i=Vb;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=oh(e,1,!1,null,null,n,!1,r,i),e[Xn]=t.current,ks(e.nodeType===8?e.parentNode:e),new ah(t)};Jt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=c_(t),e=e===null?null:e.stateNode,e};Jt.flushSync=function(e){return mi(e)};Jt.hydrate=function(e,t,n){if(!Lu(t))throw Error(j(200));return Mu(null,e,t,!0,n)};Jt.hydrateRoot=function(e,t,n){if(!lh(e))throw Error(j(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Vb;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Bb(t,null,e,1,n??null,i,!1,o,s),e[Xn]=t.current,ks(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Ou(t)};Jt.render=function(e,t,n){if(!Lu(t))throw Error(j(200));return Mu(null,e,t,!1,n)};Jt.unmountComponentAtNode=function(e){if(!Lu(e))throw Error(j(40));return e._reactRootContainer?(mi(function(){Mu(null,null,e,!1,function(){e._reactRootContainer=null,e[Xn]=null})}),!0):!1};Jt.unstable_batchedUpdates=th;Jt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Lu(n))throw Error(j(200));if(e==null||e._reactInternals===void 0)throw Error(j(38));return Mu(e,t,n,!1,r)};Jt.version="18.3.1-next-f1338f8080-20240426";function $b(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($b)}catch(e){console.error(e)}}$b(),$w.exports=Jt;var aC=$w.exports,Gg=aC;Ad.createRoot=Gg.createRoot,Ad.hydrateRoot=Gg.hydrateRoot;const Hb=`App Lab provides the runtime:
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
- Do not use raw postMessage unless the user explicitly asks for low-level App Lab runtime code.`;function lC(e){return`You are BuilderAI for the active App Lab app named "${e}".

You edit exactly one active app. You cannot access other apps, API keys, app data, sync configuration, or browser storage.

Agent rules:
- Use read_current_app_source before replacing source unless the user asks only a general question.
- Use read_recent_console_output when the request concerns an error or broken behavior.
- Use replace_current_app_source when the user asks for an app change.
- The replacement must be one complete single-file HTML document.
- Never ask a tool to operate on an app id; the host binds every tool to the active app.
- After replacing source, briefly summarize what changed.
- If clarification is genuinely required, ask before replacing source.

${Hb}`}function uC(e,t){return`You are helping me edit an App Lab sandbox app named "${e}".

Return one complete single-file HTML document. Use inline JavaScript, host-compiled Tailwind classes, Alpine.js, and minimal inline CSS only when Tailwind cannot express a rule.

${Hb}

Please rewrite the app as requested, returning only the complete HTML document.

Current app code:

\`\`\`html
${t}
\`\`\`
`}const cC="A richer example app that showcases App Lab capabilities through reusable UI and state patterns designed to inspire the user and AI.",dC=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${cC}">
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
</html>`,Wb="{{appName}}",Js="builtin-minimal-v1",fC="builtin-opinionated-v1",qb="A small example app that showcases App Lab's runtime, persistence, and live updates while leaving design and behavior to the user and AI.",Kb=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${qb}">
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
</html>`;function pC(){const e=mC();return[{builtIn:!0,description:"Uses only the essential App Lab constraints, with a small starter that leaves the rest to you and the AI.",name:"Minimal",profileId:Js,promptTemplate:e,starterSource:Kb},{builtIn:!0,description:"Adds App Lab UI and data best practices, with a richer starter that demonstrates reusable patterns.",name:"Opinionated",profileId:fC,promptTemplate:`${e}

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
- Follow the patterns demonstrated by the current starter source when they suit the user's request.`,starterSource:dC}]}function hC(e,t){return e.split(Wb).join(t)}function Yg(e,t){return e.find(n=>n.profileId===t)??e.find(n=>n.profileId===Js)??e[0]??null}function mC(){return`You are BuilderAI, helping edit the active App Lab app named "${Wb}".

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
- Persist only JSON-compatible primitives, arrays, and plain objects.`}const Qg="app-lab-builder-preferences-v1",Gb={long:24,medium:12,short:4},uh={activeProfileId:Js,conversationMemory:"short"};function gC(e){return{async get(){try{const t=JSON.parse(e.getItem(Qg)??"null");if(!t||typeof t!="object"||Array.isArray(t))return jc();const n=t;return n.version!==1||!Jg(n.conversationMemory)?jc():{activeProfileId:yC(n.activeProfileId),conversationMemory:n.conversationMemory}}catch{return jc()}},async save(t){if(!Jg(t.conversationMemory))throw new Error("Conversation memory is invalid.");const n=t.activeProfileId.trim();if(!n)throw new Error("Active Builder profile is invalid.");const r={activeProfileId:n,conversationMemory:t.conversationMemory};return e.setItem(Qg,JSON.stringify({...r,version:1})),r}}}function jc(){return{...uh}}function Jg(e){return e==="short"||e==="medium"||e==="long"}function yC(e){return typeof e=="string"&&e.trim()?e.trim():Js}function Yb(e){const t=e.trimStart().toLowerCase();return!/^<!doctype\s+html(?:\s[^>]*)?>/.test(t)&&!/^<html(?:\s|>)/.test(t)?{code:"INCOMPLETE_HTML",message:"Return one complete HTML document starting with <!doctype html> or <html>.",success:!1}:new DOMParser().parseFromString(e,"text/html").querySelector("form, button[type='submit'], input[type='submit']")?{code:"UNSUPPORTED_FORM",message:"Generated apps must use buttons with explicit click handlers instead of forms or submit controls.",success:!1}:null}function ch(){return{completionTokens:0,costUsd:0,promptTokens:0,reasoningTokens:0,totalTokens:0}}function Qb(e,t){return{completionTokens:e.completionTokens+t.completionTokens,costUsd:e.costUsd===null||t.costUsd===null?null:e.costUsd+t.costUsd,promptTokens:e.promptTokens+t.promptTokens,reasoningTokens:e.reasoningTokens+t.reasoningTokens,totalTokens:e.totalTokens+t.totalTokens}}const Xg=4,Jb=[{function:{description:"Read the active app's metadata and complete HTML source.",name:"read_current_app_source",parameters:{additionalProperties:!1,properties:{},type:"object"}},type:"function"},{function:{description:"Read recent console output from the active app.",name:"read_recent_console_output",parameters:{additionalProperties:!1,properties:{},type:"object"}},type:"function"},{function:{description:"Replace the active app with one complete single-file HTML document.",name:"replace_current_app_source",parameters:{additionalProperties:!1,properties:{sourceCode:{description:"Complete standalone HTML document for the active app.",type:"string"}},required:["sourceCode"],type:"object"}},type:"function"}],vC=Jb.map(({function:e})=>({description:e.description,name:e.name}));function wC(e,t){return{async runTurn(n){var u,d,c,f,p;const r=n.conversationMemory??uh.conversationMemory,i=n.messages.filter(m=>m.appId===n.appId).slice(-Gb[r]),o=[{content:n.profile?hC(n.profile.promptTemplate,n.appName):lC(n.appName),role:"system"},...i.map(m=>({content:m.content,role:m.role}))],s=await t();let a=ch();const l=[];for(let m=0;m<Xg;m+=1){(u=n.onActivity)==null||u.call(n,"Thinking..."),(d=n.onAssistantContent)==null||d.call(n,"");let w="";const C=await e.sendChat({config:s,messages:[...o],onContent:n.onAssistantContent,onReasoning:g=>{var k;w=g,(k=n.onReasoning)==null||k.call(n,[...l,g].filter(Boolean).join(`

`))},signal:n.signal,tools:Jb});w&&l.push(w);const y=C.message;a=Qb(a,C.usage),(c=n.onUsage)==null||c.call(n,C.usage),o.push(y);const v=y.tool_calls??[];if(v.length===0)return{content:((f=y.content)==null?void 0:f.trim())||"Done.",toolRounds:m,usage:a};(p=n.onAssistantContent)==null||p.call(n,"");for(const g of v){const k=await _C(g,n.tools,n.onActivity);o.push({content:JSON.stringify(k),name:g.function.name,role:"tool",tool_call_id:g.id})}}throw new Error(`BuilderAI stopped after ${Xg} tool rounds.`)}}}async function _C(e,t,n){const r=bC(e);if(!r)return Fc("INVALID_TOOL_ARGUMENTS",`Use one valid JSON object for ${e.function.name}.`);if(e.function.name==="read_current_app_source")return n==null||n("Reading current app..."),t.readCurrentAppSource();if(e.function.name==="read_recent_console_output")return n==null||n("Reading recent console output..."),{output:await t.readRecentConsoleOutput()};if(e.function.name==="replace_current_app_source"){if(typeof r.sourceCode!="string")return Fc("INVALID_TOOL_ARGUMENTS","replace_current_app_source requires one string field named sourceCode.");const i=Yb(r.sourceCode);return i||(n==null||n("Applying app source..."),t.replaceCurrentAppSource(r.sourceCode))}return Fc("UNKNOWN_TOOL",`The tool ${e.function.name} is not available.`)}function bC(e){try{const t=JSON.parse(e.function.arguments||"{}");if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Expected an object.");return t}catch{return null}}function Fc(e,t){return{code:e,message:t,success:!1}}const Uc="app-lab-ai-config-v1";function xC(e){return{async clear(){e.removeItem(Uc)},async get(){try{const t=e.getItem(Uc);return t?kC(JSON.parse(t)):kf()}catch{return kf()}},async save(t){const n=xf(t);return e.setItem(Uc,JSON.stringify(n)),n}}}function xf(e){const t={apiKey:e.apiKey.trim(),model:e.model.trim()};if(!t.apiKey)throw new Error("OpenRouter API key is required.");if(!t.model)throw new Error("OpenRouter model id is required.");return t}function kC(e){if(!e||typeof e!="object")return kf();const t=e;return{apiKey:typeof t.apiKey=="string"?t.apiKey.trim():"",model:typeof t.model=="string"?t.model.trim():""}}function kf(){return{apiKey:"",model:""}}class Zg extends Error{constructor(t,n){super(t),this.name="ParseError",this.type=n.type,this.field=n.field,this.value=n.value,this.line=n.line}}function zc(e){}function SC(e){if(typeof e=="function")throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");const{onEvent:t=zc,onError:n=zc,onRetry:r=zc,onComment:i}=e;let o="",s=!0,a,l="",u="";function d(w){const C=s?w.replace(/^\xEF\xBB\xBF/,""):w,[y,v]=IC(`${o}${C}`);for(const g of y)c(g);o=v,s=!1}function c(w){if(w===""){p();return}if(w.startsWith(":")){i&&i(w.slice(w.startsWith(": ")?2:1));return}const C=w.indexOf(":");if(C!==-1){const y=w.slice(0,C),v=w[C+1]===" "?2:1,g=w.slice(C+v);f(y,g,w);return}f(w,"",w)}function f(w,C,y){switch(w){case"event":u=C;break;case"data":l=`${l}${C}
`;break;case"id":a=C.includes("\0")?void 0:C;break;case"retry":/^\d+$/.test(C)?r(parseInt(C,10)):n(new Zg(`Invalid \`retry\` value: "${C}"`,{type:"invalid-retry",value:C,line:y}));break;default:n(new Zg(`Unknown field "${w.length>20?`${w.slice(0,20)}…`:w}"`,{type:"unknown-field",field:w,value:C,line:y}));break}}function p(){l.length>0&&t({id:a,event:u||void 0,data:l.endsWith(`
`)?l.slice(0,-1):l}),a=void 0,l="",u=""}function m(w={}){o&&w.consume&&c(o),s=!0,a=void 0,l="",u="",o=""}return{feed:d,reset:m}}function IC(e){const t=[];let n="",r=0;for(;r<e.length;){const i=e.indexOf("\r",r),o=e.indexOf(`
`,r);let s=-1;if(i!==-1&&o!==-1?s=Math.min(i,o):i!==-1?i===e.length-1?s=-1:s=i:o!==-1&&(s=o),s===-1){n=e.slice(r);break}else{const a=e.slice(r,s);t.push(a),r=s+1,e[r-1]==="\r"&&e[r]===`
`&&r++}}return[t,n]}const EC="https://openrouter.ai/api/v1/chat/completions",CC="https://openrouter.ai/api/v1/key",AC="https://openrouter.ai/api/v1/models?supported_parameters=tools",TC=20*1024*1024;function RC(e={}){const t=e.fetchImpl??fetch;return{async sendChat(n){const r=xf(n.config),i=await t(EC,{body:JSON.stringify({messages:n.messages,model:r.model,parallel_tool_calls:!1,stream:!0,tool_choice:"auto",tools:n.tools}),headers:ey(r,e.referer),method:"POST",signal:n.signal});if(!i.ok){const o=await Bc(i);Vc(i,o)}return NC(i,n)},async testConnection(n,r){const i=xf(n),o=ey(i,e.referer),s=await t(CC,{headers:o,signal:r}),a=await Bc(s);Vc(s,a);const l=await t(AC,{headers:o,signal:r}),u=await Bc(l);Vc(l,u);const c=ui(u.data).map(ut).filter(m=>!!m).find(m=>m.id===i.model);if(!c)throw new Error(`OpenRouter model '${i.model}' was not found among tool-capable models.`);if(!ui(c.supported_parameters).includes("tools"))throw new Error(`OpenRouter model '${i.model}' does not advertise tool support.`);const p=ut(a.data);return{keyLabel:typeof(p==null?void 0:p.label)=="string"?p.label:null,model:i.model,modelName:typeof c.name=="string"?c.name:i.model}}}}async function NC(e,t){if(!e.body)throw new Error("OpenRouter returned an empty response stream.");let n="",r="",i=[],o="",s=jC(),a=0,l=!1,u=null;const d=new Map,c=SC({onError(m){u=new Error(`OpenRouter returned an invalid response stream: ${m.message}`)},onEvent(m){var k,S;if(l)return;if(m.data==="[DONE]"){l=!0;return}let w;try{w=ut(JSON.parse(m.data))??{}}catch{u=new Error("OpenRouter returned invalid JSON in its response stream.");return}const C=ut(w.error);if(C){u=new Error(typeof C.message=="string"?C.message:"OpenRouter streaming request failed.");return}ut(w.usage)&&(s=UC(w.usage));const y=ut(ui(w.choices)[0]),v=ut(y==null?void 0:y.delta);if(!v)return;typeof v.content=="string"&&(n+=v.content,(k=t.onContent)==null||k.call(t,n)),typeof v.reasoning=="string"&&(r+=v.reasoning),i=DC(i,ui(v.reasoning_details));const g=LC(i,r);g!==o&&(o=g,(S=t.onReasoning)==null||S.call(t,o)),PC(d,ui(v.tool_calls))}}),f=e.body.getReader(),p=new TextDecoder;try{for(;;){const m=await f.read();if(m.done)break;if(a+=m.value.byteLength,a>TC)throw new Error("OpenRouter response exceeded the 20 MB stream limit.");if(c.feed(p.decode(m.value,{stream:!0})),u)throw u;if(l){await f.cancel().catch(()=>{});break}}if(!l&&(c.feed(p.decode()),c.reset({consume:!0}),u))throw u}catch(m){throw await f.cancel().catch(()=>{}),m}return{message:MC({content:n||null,reasoning:r||void 0,reasoning_details:i.length?i:void 0,role:"assistant",tool_calls:[...d.entries()].sort(([m],[w])=>m-w).map(([,m])=>m)}),usage:s}}function PC(e,t){t.forEach((n,r)=>{const i=ut(n);if(!i)return;const o=typeof i.index=="number"&&Number.isInteger(i.index)?i.index:r,s=ut(i.function),a=e.get(o)??{function:{arguments:"",name:""},id:"",type:"function"};typeof i.id=="string"&&(a.id||(a.id=i.id)),typeof(s==null?void 0:s.name)=="string"&&(a.function.name+=s.name),typeof(s==null?void 0:s.arguments)=="string"&&(a.function.arguments+=s.arguments),e.set(o,a)})}function DC(e,t){const n=e.map(r=>({...r}));for(const r of t){const i=ut(r);if(!i)continue;const o=OC(n,i);if(o<0){n.push({...i});continue}const s=n[o],a={...s,...i};for(const l of["data","summary","text"])typeof i[l]=="string"&&(a[l]=`${typeof s[l]=="string"?s[l]:""}${i[l]}`);n[o]=a}return n}function OC(e,t){return typeof t.index=="number"?e.findIndex(n=>n.index===t.index&&n.type===t.type):typeof t.id=="string"?e.findIndex(n=>n.id===t.id&&n.type===t.type):-1}function LC(e,t){const n=e.filter(i=>i.type==="reasoning.text"&&typeof i.text=="string").map(i=>i.text).join(`

`);return n||e.filter(i=>i.type==="reasoning.summary"&&typeof i.summary=="string").map(i=>i.summary).join(`

`)||t}function ey(e,t){const n={Authorization:`Bearer ${e.apiKey}`,"Content-Type":"application/json","X-Title":"App Lab"};return t&&(n["HTTP-Referer"]=t),n}async function Bc(e){const t=await e.json().catch(()=>null);return ut(t)??{}}function Vc(e,t){const n=ut(t.error);if(e.ok&&!n)return;const r=typeof(n==null?void 0:n.message)=="string"?n.message:`OpenRouter request failed with ${e.status}.`;throw new Error(r)}function MC(e){const t=ut(e);if(!t||t.role!=="assistant")throw new Error("OpenRouter returned an invalid assistant response.");const n=ui(t.tool_calls).map(FC),r=typeof t.content=="string"?t.content:null,i=typeof t.reasoning=="string"?t.reasoning:void 0,o=ui(t.reasoning_details).map(ut).filter(s=>!!s);if(!r&&n.length===0)throw new Error("OpenRouter returned an empty assistant response.");return{content:r,...i?{reasoning:i}:{},...o.length?{reasoning_details:o}:{},role:"assistant",...n.length?{tool_calls:n}:{}}}function jC(){return{completionTokens:0,costUsd:null,promptTokens:0,reasoningTokens:0,totalTokens:0}}function FC(e){const t=ut(e),n=ut(t==null?void 0:t.function);if(!t||typeof t.id!="string"||!n||typeof n.name!="string"||typeof n.arguments!="string")throw new Error("OpenRouter returned an invalid tool call.");return{function:{arguments:n.arguments,name:n.name},id:t.id,type:"function"}}function UC(e){const t=ut(e),n=ut(t==null?void 0:t.completion_tokens_details);return{completionTokens:Fa(t==null?void 0:t.completion_tokens),costUsd:zC(t==null?void 0:t.cost),promptTokens:Fa(t==null?void 0:t.prompt_tokens),reasoningTokens:Fa(n==null?void 0:n.reasoning_tokens),totalTokens:Fa(t==null?void 0:t.total_tokens)}}function Fa(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zC(e){const t=typeof e=="number"?e:typeof e=="string"?Number(e):Number.NaN;return Number.isFinite(t)?t:null}function ui(e){return Array.isArray(e)?e:[]}function ut(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:null}const Xb="app-lab-builder-profiles-v1";function BC(e,t){const n=t.builtInProfiles.map(o=>({...o,builtIn:!0})),r=new Set(n.map(o=>o.profileId)),i=t.createId??(()=>crypto.randomUUID());return{async create(o){const s=Ua(e,r);let a=i();for(;r.has(a)||s.some(u=>u.profileId===a);)a=i();const l=ty(o,a);return $c(e,[...s,l]),l},async delete(o){if(r.has(o))throw new Error("Built-in Builder profiles cannot be deleted.");const s=Ua(e,r);$c(e,s.filter(a=>a.profileId!==o))},async list(){return[...n.map(o=>({...o})),...Ua(e,r)]},async update(o){if(r.has(o.profileId))throw new Error("Built-in Builder profiles cannot be changed.");const s=Ua(e,r),a=s.findIndex(u=>u.profileId===o.profileId);if(a<0)throw new Error("Builder profile not found.");const l=ty(o,o.profileId);return s[a]=l,$c(e,s),l}}}function ty(e,t){const n=e.name.trim();if(!n)throw new Error("Profile name is required.");return $C(e.starterSource),{builtIn:!1,description:e.description.trim(),name:n,profileId:t,promptTemplate:e.promptTemplate,starterSource:e.starterSource}}function Ua(e,t){try{const n=JSON.parse(e.getItem(Xb)??"null");if(!n||typeof n!="object"||Array.isArray(n))return[];const r=n;if(r.version!==1)return[];const i=r.profiles;if(!Array.isArray(i))return[];const o=new Set;return i.flatMap(s=>{const a=VC(s);return!a||t.has(a.profileId)||o.has(a.profileId)?[]:(o.add(a.profileId),[a])})}catch{return[]}}function VC(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;return typeof t.profileId!="string"||!t.profileId||typeof t.name!="string"||!t.name.trim()||typeof t.promptTemplate!="string"||typeof t.starterSource!="string"||!t.starterSource.trim()?null:{builtIn:!1,description:typeof t.description=="string"?t.description.trim():"",name:t.name.trim(),profileId:t.profileId,promptTemplate:t.promptTemplate,starterSource:t.starterSource}}function $C(e){if(!e.trim())throw new Error("Starter app is required.");const t=Yb(e);if(t)throw new Error(`Starter app is invalid: ${t.message}`)}function $c(e,t){e.setItem(Xb,JSON.stringify({profiles:t,version:1}))}function HC(e={}){const t=e.storage??window.localStorage,n=xC(t),r=gC(t),i=BC(t,{builtInProfiles:pC()}),o=e.client??RC({referer:window.location.origin}),s=wC(o,n.get);return{clearConfig:n.clear,createBuilderProfile:i.create,deleteBuilderProfile:i.delete,getBuilderPreferences:r.get,getConfig:n.get,listBuilderProfiles:i.list,runBuilderTurn:s.runTurn,saveConfig:n.save,saveBuilderPreferences:r.save,testConnection:a=>o.testConnection(a),updateBuilderProfile:i.update}}function WC(){return{name:"Blank App",description:"Blank App Lab document.",sourceCode:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Blank App Lab document.">
    <title>Blank App</title>
  </head>
  <body></body>
</html>`}}function ny(e,t={}){var o,s,a,l,u,d;const n=new DOMParser().parseFromString(e,"text/html"),r=(s=(o=n.querySelector("title"))==null?void 0:o.textContent)==null?void 0:s.trim(),i=(l=(a=qC(n))==null?void 0:a.getAttribute("content"))==null?void 0:l.trim();return{name:r||((u=t.name)==null?void 0:u.trim())||"Untitled App",description:i??((d=t.description)==null?void 0:d.trim())??""}}function qC(e){var t;for(const n of e.querySelectorAll("meta"))if(((t=n.getAttribute("name"))==null?void 0:t.toLowerCase())==="description")return n;return null}const ry=1048576;function ju(e){let t;try{t=JSON.stringify(e)}catch{throw new Error("App data must be JSON-serializable.")}if(t===void 0)throw new Error("App data must be JSON-serializable.");if(new TextEncoder().encode(t).byteLength>ry)throw new Error(`App data exceeds the ${ry} byte limit.`);return JSON.parse(t)}const KC="app-lab-v2",GC=1;function YC(){let e=null;function t(){return e??(e=QC()),e}async function n(){return(await za((await t()).transaction("apps_registry").objectStore("apps_registry").getAll())).map(({appId:p,name:m,description:w,updatedAt:C})=>({appId:p,name:m,description:w,updatedAt:C})).sort((p,m)=>p.name.localeCompare(m.name))}async function r(f){return await za((await t()).transaction("apps_registry").objectStore("apps_registry").get(f))??null}async function i(f){const p=new Date().toISOString(),m=ny(f.sourceCode,{description:f.description,name:f.name}),w={appId:crypto.randomUUID(),compiledCss:f.compiledCss,compiledCssSourceHash:f.compiledCssSourceHash,name:m.name,description:m.description,sourceCode:f.sourceCode,createdAt:p,updatedAt:p};return await c("apps_registry",w),w}function o(){return i(WC())}async function s(f){const m=(await t()).transaction(["apps_registry","apps_data"],"readwrite");m.objectStore("apps_registry").delete(f),m.objectStore("apps_data").delete(f),await JC(m)}async function a(f){const p=await r(f.appId);if(!p)throw new Error(`App not found: ${f.appId}`);const m=f.sourceCode===void 0?{...p,...f,updatedAt:new Date().toISOString()}:{...p,...f,...ny(f.sourceCode,{description:p.description,name:p.name}),updatedAt:new Date().toISOString()};return await c("apps_registry",m),m}async function l(f){return await c("apps_registry",f),f}async function u(f){const p=await za((await t()).transaction("apps_data").objectStore("apps_data").get(f));return(p==null?void 0:p.data)??null}async function d(f,p){if(!await r(f))throw new Error(`App not found: ${f}`);await c("apps_data",{appId:f,data:ju(p),updatedAt:new Date().toISOString()})}async function c(f,p){await za((await t()).transaction(f,"readwrite").objectStore(f).put(p))}return{createApp:i,createBlankApp:o,deleteApp:s,getApp:r,getAppData:u,listApps:n,saveAppData:d,updateApp:a,upsertApp:l}}function QC(){return new Promise((e,t)=>{const n=indexedDB.open(KC,GC);n.onupgradeneeded=()=>{const r=n.result;r.objectStoreNames.contains("apps_registry")||r.createObjectStore("apps_registry",{keyPath:"appId"}).createIndex("updatedAt","updatedAt"),r.objectStoreNames.contains("apps_data")||r.createObjectStore("apps_data",{keyPath:"appId"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function za(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error)})}function JC(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}const Xs="auth-v1",XC=32;function Zb(){return`app_lab_owner_${eA(XC)}`}function ZC(e){const t=JSON.stringify(e);return JSON.stringify({rules:{".read":!1,".write":!1,appLabOwners:{$uid:{".read":"auth != null && auth.uid === $uid",".write":`auth != null && auth.uid === $uid && ((!data.exists() && newData.child('owner').val() === true && newData.child('setupSecret').val() === ${t}) || (data.exists() && data.child('owner').val() === true && newData.child('owner').val() === true) || (data.exists() && data.child('owner').val() === true && !newData.exists()))`,".validate":"newData.hasChildren(['owner','setupSecret']) && newData.child('owner').val() === true && newData.child('setupSecret').isString()"}},appLabRoomClaimTokens:{$roomId:{".read":!1,".write":"auth != null && root.child('appLabOwners').child(auth.uid).child('owner').val() === true",".validate":"newData.isString()"}},appLabRoomMembers:{$roomId:{$uid:{".read":!1,".write":"auth != null && auth.uid === $uid && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || (!data.exists() && newData.child('member').val() === true && newData.child('claimToken').val() === root.child('appLabRoomClaimTokens').child($roomId).val()) || (data.exists() && data.child('member').val() === true && newData.child('member').val() === true))",".validate":"newData.hasChildren(['member','claimToken']) && newData.child('member').val() === true && newData.child('claimToken').isString()"}}},appLabSyncRooms:{$roomId:{".read":"auth != null && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true)",".write":"auth != null && ((!data.exists() && newData.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && newData.exists() && root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true))",".validate":"newData.hasChildren(['encryptedPayload','readTokenHash','roomId','updatedAt','version','writeTokenHash']) && newData.child('roomId').val() === $roomId && newData.child('encryptedPayload').isString() && newData.child('readTokenHash').isString() && newData.child('updatedAt').isString() && newData.child('version').isNumber() && newData.child('writeTokenHash').isString()"}}}},null,2)}function eA(e){const t=crypto.getRandomValues(new Uint8Array(e));let n="";for(const r of t)n+=String.fromCharCode(r);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}const tA="app-lab-sync-queue-v1",nA=1,Tn="sync_queue",rA=2*60*1e3;function iA(e){return`ensure-app-rooms:${e}`}function ex(e){return`save-source:${e}`}function dh(e){return`save-app-data:${e}`}function oA(e){return`delete-owned-app:${e}`}function sA(e){return`save-workspace-manifest:${e}`}async function Hc(e,t){const n=iA(t),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"ensure-app-rooms",status:"pending",updatedAt:i};return await e.putItem(o),o}async function aA(e){const t=oA(e.app.appId),n=await e.store.getItem(t),r=new Date().toISOString(),i={app:e.app,appId:e.app.appId,attempts:(n==null?void 0:n.attempts)??0,createdAt:(n==null?void 0:n.createdAt)??r,id:t,kind:"delete-owned-app",status:"pending",syncRecord:e.syncRecord,updatedAt:r};return await e.store.putItem(i),i}async function lA(e,t){const n=ex(t.appId),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t.appId,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-source",sourceCode:t.sourceCode,status:"pending",updatedAt:i};return await e.putItem(o),o}async function uA(e){const t=dh(e.appId),n=await e.store.getItem(t),r=new Date().toISOString(),i=(n==null?void 0:n.kind)==="save-app-data"?n:null,o={appId:e.appId,attempts:(i==null?void 0:i.attempts)??0,baseData:(i==null?void 0:i.baseData)??e.baseData,baseRemoteVersion:(i==null?void 0:i.baseRemoteVersion)??e.baseRemoteVersion,createdAt:(i==null?void 0:i.createdAt)??r,id:t,inFlightRevision:null,kind:"save-app-data",localData:e.data,localRevision:((i==null?void 0:i.localRevision)??0)+1,roomId:e.roomId,status:"pending",updatedAt:r};return await e.store.putItem(o),o}async function cA(e,t){const n=sA(t),r=await e.getItem(n),i=new Date().toISOString(),o={appId:t,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-workspace-manifest",status:"pending",updatedAt:i,workspaceId:t};return await e.putItem(o),o}async function Zs(e,t){const n={...t,status:"syncing",updatedAt:new Date().toISOString()};return await e.putItem(n),n}async function ea(e,t,n){const r={...t,attempts:t.attempts+1,lastError:n instanceof Error?n.message:"Unknown sync error.",status:"pending",updatedAt:new Date().toISOString()};return await e.putItem(r),r}function ta(e,t=new Date){return e.status==="syncing"&&t.getTime()-new Date(e.updatedAt).getTime()>rA}async function tx(e,t){const n=await e.getItem(t.id);!n||n.updatedAt!==t.updatedAt||n.status!==t.status||await e.removeItem(t.id)}async function dA(e){const t=await e.listItems(),n=new Date().toISOString();await Promise.all(t.filter(r=>r.status==="syncing").map(r=>e.putItem({...r,status:"pending",updatedAt:n})))}function fA(){let e=null;function t(){return e??(e=pA()),e}return{async getItem(n){const r=await Ba((await t()).transaction(Tn).objectStore(Tn).get(n));return r?Wc(r):null},async listItems(){return(await Ba((await t()).transaction(Tn).objectStore(Tn).getAll())).map(Wc).sort(hA)},async putItem(n){await Ba((await t()).transaction(Tn,"readwrite").objectStore(Tn).put(Wc(n)))},async removeItem(n){await Ba((await t()).transaction(Tn,"readwrite").objectStore(Tn).delete(n))}}}function pA(){return new Promise((e,t)=>{const n=indexedDB.open(tA,nA);n.onupgradeneeded=()=>{const r=n.result;if(!r.objectStoreNames.contains(Tn)){const i=r.createObjectStore(Tn,{keyPath:"id"});i.createIndex("status","status"),i.createIndex("kind","kind"),i.createIndex("updatedAt","updatedAt")}},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function Ba(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error)})}function hA(e,t){return e.createdAt.localeCompare(t.createdAt)||e.id.localeCompare(t.id)}function Wc(e){return JSON.parse(JSON.stringify(e))}const Wl="applab-invite=";function mA(e){return`${Wl}${kA(JSON.stringify(wA(e)))}`}function gA(e){const t=e.trim().replace(/^#/,""),n=t.startsWith(Wl)?t.slice(Wl.length):t;let r;try{r=JSON.parse(SA(n))}catch{throw new Error("App invite is not valid.")}return vA(r)}function yA(e){const t=e.trim().replace(/^#/,"");return t.startsWith(Wl)?gA(t):null}function vA(e){if(!bA(e))throw new Error("App invite is unsupported.");return _A(e)}function wA(e){var n,r;const t=(n=e.provider.firebaseConfig)==null?void 0:n.apiKey;if(!t)throw new Error("App invite is missing Firebase apiKey.");return{v:2,p:{m:"a",u:e.provider.databaseUrl,k:t,d:(r=e.provider.firebaseConfig)==null?void 0:r.authDomain},r:iy(e.dataRoom),s:iy(e.sourceRoom)}}function _A(e){const t={databaseURL:e.p.u};return e.p.k&&(t.apiKey=e.p.k),e.p.d&&(t.authDomain=e.p.d),{createdAt:new Date().toISOString(),dataRoom:oy(e.r),kind:"app-lab-invite",provider:{accessModel:"auth-v1",databaseUrl:e.p.u,firebaseConfig:t,provider:"firebase-rtdb"},schemaVersion:1,sourceRoom:oy(e.s)}}function iy(e){const t=e.readToken??e.accessToken,n=e.writeToken??e.accessToken;return t===n?[e.roomId,e.decryptSecret,t]:[e.roomId,e.decryptSecret,t,n]}function oy(e){const[t,n,r,i]=e,o=i??r;return{accessToken:o,decryptSecret:n,lastSeenVersion:0,readToken:r,roomId:t,writeToken:o}}function bA(e){if(!e||typeof e!="object")return!1;const t=e;return t.v===2&&xA(t.p)&&sy(t.s)&&sy(t.r)}function xA(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.u=="string"&&(!t.m||t.m==="a")&&typeof t.k=="string"&&(!t.d||typeof t.d=="string")}function sy(e){return Array.isArray(e)&&(e.length===3||e.length===4)&&e.every(t=>typeof t=="string")}function kA(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function SA(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return atob(n)}function IA(e,t=""){const n=e.trim(),r=n?EA(n):{},i=Ps(t||r.databaseURL||"");if(!i)throw new Error("Firebase Realtime Database URL is required.");return{...r,databaseURL:i}}function Ps(e){const t=e.trim();return t?t.replace(/\/+$/,""):""}function EA(e){if(!e.trim())return{};try{const t=JSON.parse(e);if(!t||typeof t!="object")throw new Error("Firebase config must be an object.");return nx(t)}catch{return CA(e)}}function CA(e){const t={},n=e.replace(/\/\/.*$/gm,""),r=/([A-Za-z_$][\w$]*)\s*:\s*(['"])(.*?)\2\s*,?/g;let i;for(;i=r.exec(n);)t[i[1]]=i[3];return nx(t)}function nx(e){const t={};for(const n of["apiKey","appId","authDomain","databaseURL","measurementId","messagingSenderId","projectId","storageBucket"])typeof e[n]=="string"&&e[n].trim()&&(t[n]=n==="databaseURL"?Ps(e[n]):e[n].trim());return t}const fh=1,rx=32,AA=16,TA=32,RA=12;function qc(){const e=`room_access_${Kc(TA)}`;return{roomId:`room_${Kc(AA)}`,decryptSecret:Kc(rx),accessToken:e,readToken:e,writeToken:e,lastSeenVersion:0}}function ht(e){return e.readToken??e.accessToken}function On(e){return e.writeToken??e.accessToken}async function ph(e){const t=await ox(e.decryptSecret),n=crypto.getRandomValues(new Uint8Array(RA)),r=new TextEncoder().encode(JSON.stringify(ju(e.data))),i=await crypto.subtle.encrypt({name:"AES-GCM",iv:n,additionalData:ix(e)},t,r),o={schemaVersion:fh,algorithm:"AES-GCM",iv:Sf(n),ciphertext:Sf(new Uint8Array(i))};return JSON.stringify(o)}async function NA(e){const t=PA(e.encryptedPayload),n=await ox(e.decryptSecret),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:If(t.iv),additionalData:ix(e)},n,If(t.ciphertext));return ju(JSON.parse(new TextDecoder().decode(r)))}async function Fu(e){const{capability:t,snapshot:n}=e;if(n.roomId!==t.roomId)throw new Error("Snapshot room does not match capability.");if(n.version<t.lastSeenVersion)throw new Error("Remote room snapshot is older than the last seen version.");return NA({roomId:n.roomId,roomType:e.roomType,roomVersion:n.version,decryptSecret:t.decryptSecret,encryptedPayload:n.encryptedPayload})}function na(e,t){return{...e,lastSeenVersion:Math.max(e.lastSeenVersion,t.version)}}function ix(e){return new TextEncoder().encode(JSON.stringify({schemaVersion:fh,roomId:e.roomId,roomType:e.roomType,roomVersion:e.roomVersion}))}async function ox(e){const t=If(e);if(t.byteLength!==rx)throw new Error("Room decrypt secret must be a 256-bit base64url key.");return crypto.subtle.importKey("raw",t,"AES-GCM",!1,["encrypt","decrypt"])}function PA(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Encrypted room payload is not valid JSON.")}if(!t||typeof t!="object"||t.schemaVersion!==fh||t.algorithm!=="AES-GCM"||typeof t.iv!="string"||typeof t.ciphertext!="string")throw new Error("Encrypted room payload has an unsupported shape.");return t}function Kc(e){return Sf(crypto.getRandomValues(new Uint8Array(e)))}function Sf(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function If(e){if(!/^[A-Za-z0-9_-]+$/.test(e))throw new Error("Value is not valid base64url.");const t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}const Ef=1,DA="app-lab-workspace-sync-v1";function OA(e){async function t(){return await e.load()??MA()}async function n(g){const k=await t(),S=new Date().toISOString();return g(k,S),k.updatedAt=S,await e.save(k),k}async function r(){return(await t()).storageProfile}async function i(g){const k=IA(g.firebaseConfigText??"",g.databaseUrl),S=k.databaseURL;if(!S)throw new Error("Storage database URL is required.");let x=null;if(await n((A,R)=>{var F,V;const D=A.storageProfile,E=g.accessModel??(D==null?void 0:D.accessModel)??Xs;jA(k),x={accessModel:E,profileId:(D==null?void 0:D.profileId)??`profile_${crypto.randomUUID()}`,provider:g.provider??"firebase-rtdb",displayName:((F=g.displayName)==null?void 0:F.trim())||(D==null?void 0:D.displayName)||"Firebase Realtime Database",databaseUrl:S,firebaseConfig:k,ownerSetupSecret:((V=g.ownerSetupSecret)==null?void 0:V.trim())||(D==null?void 0:D.ownerSetupSecret)||Zb(),createdAt:(D==null?void 0:D.createdAt)??R,updatedAt:R},A.storageProfile=x}),!x)throw new Error("Could not save storage profile.");return x}async function o(){await n(g=>{g.storageProfile=null})}async function s(){let g=null;if(await n(k=>{Cf(k),k.manifestRoom??(k.manifestRoom=qc()),g=k.manifestRoom}),!g)throw new Error("Could not create workspace manifest room.");return g}async function a(g){let k=null;if(await n(S=>{if(!S.manifestRoom)throw new Error("Workspace manifest room is not configured.");S.manifestRoom={...S.manifestRoom,lastSeenVersion:Math.max(S.manifestRoom.lastSeenVersion,g)},k=S.manifestRoom}),!k)throw new Error("Could not remember workspace manifest version.");return k}async function l(g){await e.save(zA(g))}async function u(g){let k=null;if(await n((S,x)=>{const A=Cf(S),R=S.apps[g];if((R==null?void 0:R.kind)==="owned"){k=R;return}if((R==null?void 0:R.kind)==="joined")throw new Error("Joined apps must be made into private copies before they can become owned apps.");if((R==null?void 0:R.kind)==="private-copy"){k={kind:"owned",appId:g,storageProfileId:R.storageProfileId,sourceRoom:R.sourceRoom,dataRoom:R.dataRoom,shareState:"private",createdAt:R.createdAt,updatedAt:x},S.apps[g]=k;return}k={kind:"owned",appId:g,storageProfileId:A.profileId,sourceRoom:qc(),dataRoom:qc(),shareState:"private",createdAt:x,updatedAt:x},S.apps[g]=k}),!k)throw new Error("Could not create owned app sync record.");return k}async function d(g){let k=null;if(await n((S,x)=>{k={kind:"joined",appId:g.appId,sourceProvider:g.sourceProvider,dataProvider:g.dataProvider??g.sourceProvider,sourceRoom:g.sourceRoom,dataRoom:g.dataRoom,importedAt:x},S.apps[g.appId]=k}),!k)throw new Error("Could not create joined app sync record.");return k}async function c(g){let k=null;if(await n((S,x)=>{const A=S.apps[g];if(!A)throw new Error("App must have sync rooms before it can be shared.");if(A.kind==="owned"){const D=ly(S,A.storageProfileId);A.shareState="invite-created",A.updatedAt=x,k=jo(A.sourceRoom,A.dataRoom,D,x);return}if(A.kind==="joined"){if(A.remoteDeletedAt)throw new Error("Deleted shared apps cannot be forwarded.");k=jo(A.sourceRoom,A.dataRoom,A.sourceProvider,x);return}const R=ly(S,A.storageProfileId);k=jo(A.sourceRoom,A.dataRoom,R,x)}),!k)throw new Error("Could not create app invite.");return k}async function f(g){const k=await t(),S=k.apps[g];if(!S)return null;if(S.kind==="joined")return jo(S.sourceRoom,S.dataRoom,S.sourceProvider,new Date().toISOString());const x=k.storageProfile;return!x||x.profileId!==S.storageProfileId?null:jo(S.sourceRoom,S.dataRoom,x,new Date().toISOString())}async function p(g){return(await t()).apps[g]??null}async function m(g){return ay((await t()).apps[g]??null)}async function w(g){const k=await t();return Object.fromEntries(g.map(S=>[S,ay(k.apps[S]??null)]))}async function C(g){let k=null;if(await n((S,x)=>{const A=S.apps[g.appId];if(!A)throw new Error(`App sync record not found: ${g.appId}`);k={...A,...g.sourceRoom?{sourceRoom:g.sourceRoom}:{},...g.dataRoom?{dataRoom:g.dataRoom}:{},..."updatedAt"in A?{updatedAt:x}:{}},S.apps[g.appId]=k}),!k)throw new Error("Could not remember app room versions.");return k}async function y(g,k){await n((S,x)=>{const A=S.apps[g];if(!A){S.deletedApps[g]={appId:g,deletedAt:k??x,reason:"remote-owner-delete"};return}A.kind==="joined"?S.apps[g]={...A,remoteDeletedAt:k??x}:(delete S.apps[g],S.deletedApps[g]={appId:g,deletedAt:k??x,reason:"remote-owner-delete"})})}async function v(g){await n((k,S)=>{delete k.apps[g],k.deletedApps[g]={appId:g,deletedAt:S,reason:"local-delete"}})}return{clearStorageProfile:o,configureStorageProfile:i,createInvite:c,ensureOwnedAppRooms:u,ensureWorkspaceManifestRoom:s,getAppSyncBadge:m,getAppSyncRecord:p,getInvite:f,getState:t,getStorageProfile:r,listAppSyncBadges:w,markJoinedApp:d,markRemoteAppDeleted:y,rememberAppRoomVersions:C,rememberWorkspaceManifestVersion:a,removeLocalAppSync:v,replaceState:l}}function LA(e=localStorage,t=DA){return{async load(){const n=e.getItem(t);return n?UA(n):null},async save(n){e.setItem(t,JSON.stringify(n))}}}function MA(){const e=new Date().toISOString();return{schemaVersion:Ef,workspaceId:`workspace_${crypto.randomUUID()}`,storageProfile:null,manifestRoom:void 0,apps:{},deletedApps:{},updatedAt:e}}function ay(e){return e?e.kind==="joined"&&e.remoteDeletedAt?{kind:"needs-attention",label:"Deleted by owner",tone:"attention"}:e.kind==="joined"?{kind:"shared-with-me",label:"Shared with me",tone:"shared"}:e.kind==="private-copy"?{kind:"private-copy",label:"Private copy",tone:"good"}:e.shareState==="invite-created"?{kind:"shared-by-me",label:"Shared by me",tone:"shared"}:{kind:"backed-up",label:"Private",tone:"neutral"}:{kind:"local-only",label:"Private",tone:"neutral"}}function Cf(e){if(!e.storageProfile)throw new Error("Storage profile must be configured before apps can be backed up.");return e.storageProfile}function jA(e){if(!e.apiKey)throw new Error("Authenticated Firebase access requires the Firebase web app config with apiKey.")}function ly(e,t){const n=Cf(e);if(n.profileId!==t)throw new Error("App sync record belongs to a different storage profile.");return n}function jo(e,t,n,r){return{schemaVersion:1,kind:"app-lab-invite",provider:{accessModel:n.accessModel??Xs,provider:n.provider,databaseUrl:n.databaseUrl,firebaseConfig:FA(n)},sourceRoom:e,dataRoom:t,createdAt:r}}function FA(e){if(!("firebaseConfig"in e)||!e.firebaseConfig)return;const n={databaseURL:Ps(e.firebaseConfig.databaseURL||e.databaseUrl)};return e.firebaseConfig.apiKey&&(n.apiKey=e.firebaseConfig.apiKey),e.firebaseConfig.authDomain&&(n.authDomain=e.firebaseConfig.authDomain),n}function UA(e){try{const t=JSON.parse(e);return t.schemaVersion!==Ef||typeof t.workspaceId!="string"?null:{schemaVersion:Ef,workspaceId:t.workspaceId,storageProfile:BA(t.storageProfile),manifestRoom:VA(t.manifestRoom),apps:t.apps??{},deletedApps:t.deletedApps??{},updatedAt:typeof t.updatedAt=="string"?t.updatedAt:new Date().toISOString()}}catch{return null}}function zA(e){return JSON.parse(JSON.stringify(e))}function BA(e){var i;if(!e||typeof e!="object")return null;const t=e;if(typeof t.profileId!="string"||t.provider!=="firebase-rtdb"||typeof t.displayName!="string"||typeof t.databaseUrl!="string"||typeof t.createdAt!="string"||typeof t.updatedAt!="string")return null;const n=Ps(t.databaseUrl);return{accessModel:t.accessModel==="auth-v1"?"auth-v1":Xs,profileId:t.profileId,provider:t.provider,displayName:t.displayName,databaseUrl:n,firebaseConfig:(i=t.firebaseConfig)!=null&&i.databaseURL?{...t.firebaseConfig,databaseURL:Ps(t.firebaseConfig.databaseURL)}:{databaseURL:n},ownerSetupSecret:typeof t.ownerSetupSecret=="string"?t.ownerSetupSecret:void 0,createdAt:t.createdAt,updatedAt:t.updatedAt}}function VA(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.readToken=="string"?t.readToken:void 0,r=typeof t.writeToken=="string"?t.writeToken:void 0,i=typeof t.accessToken=="string"?t.accessToken:r??n;if(!(typeof t.roomId!="string"||typeof t.decryptSecret!="string"||typeof i!="string"||typeof n!="string"||typeof r!="string"||typeof t.lastSeenVersion!="number"))return{roomId:t.roomId,decryptSecret:t.decryptSecret,accessToken:i,readToken:n,writeToken:r,lastSeenVersion:t.lastSeenVersion}}class sx extends Error{constructor(t,n){super("Remote app was deleted by its owner."),this.appId=t,this.deletedAt=n}}async function $A(e){const t={app:{appId:e.app.appId,compiledCss:e.app.compiledCss,compiledCssSourceHash:e.app.compiledCssSourceHash,createdAt:e.app.createdAt,description:e.app.description,name:e.app.name,sourceCode:e.app.sourceCode,updatedAt:e.app.updatedAt},schemaVersion:1};await Kl({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,roomType:"app-package"}),await Kl({capability:e.syncRecord.dataRoom,data:e.appData,provider:e.provider,roomType:"app-data"})}async function Af(e){const t={app:{appId:e.app.appId,compiledCss:e.app.compiledCss,compiledCssSourceHash:e.app.compiledCssSourceHash,createdAt:e.app.createdAt,description:e.app.description,name:e.app.name,sourceCode:e.app.sourceCode,updatedAt:e.app.updatedAt},schemaVersion:1};return hh({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,recreateIfMissing:e.syncRecord.kind!=="joined",roomType:"app-package"})}async function Tf(e){return hh({capability:e.syncRecord.dataRoom,data:e.appData,provider:e.provider,recreateIfMissing:e.syncRecord.kind!=="joined",roomType:"app-data"})}async function ql(e){const t=await e.provider.loadRoom({readToken:ht(e.syncRecord.sourceRoom),roomId:e.syncRecord.sourceRoom.roomId}),n=await Fu({capability:e.syncRecord.sourceRoom,roomType:"app-package",snapshot:t});return{app:qA(n),sourceRoom:na(e.syncRecord.sourceRoom,t)}}async function cl(e){const t=await ql(e),n=await e.provider.loadRoom({readToken:ht(e.syncRecord.dataRoom),roomId:e.syncRecord.dataRoom.roomId}),r=await Fu({capability:e.syncRecord.dataRoom,roomType:"app-data",snapshot:n});return{app:t.app,appData:r,dataRoom:na(e.syncRecord.dataRoom,n),sourceRoom:t.sourceRoom}}async function HA(e){e.app?await WA({app:e.app,provider:e.sourceProvider,syncRecord:e.syncRecord}):await uy(e.sourceProvider,e.syncRecord.sourceRoom),await uy(e.dataProvider,e.syncRecord.dataRoom)}async function WA(e){const t={appId:e.app.appId,deleted:!0,deletedAt:new Date().toISOString(),name:e.app.name,schemaVersion:1};return hh({capability:e.syncRecord.sourceRoom,data:t,provider:e.provider,recreateIfMissing:!0,roomType:"app-package"})}async function Kl(e){const t=await ph({data:e.data,decryptSecret:e.capability.decryptSecret,roomId:e.capability.roomId,roomType:e.roomType,roomVersion:1});try{await e.provider.createRoom({encryptedPayload:t,readToken:ht(e.capability),roomId:e.capability.roomId,writeToken:On(e.capability)})}catch(n){if(!KA(n))throw n;await e.provider.loadRoom({readToken:ht(e.capability),roomId:e.capability.roomId})}}async function uy(e,t){try{await e.deleteRoom({roomId:t.roomId,writeToken:On(t)})}catch(n){if(!Rf(n))throw n}}async function hh(e){let t=e.capability.lastSeenVersion;if(t===0)try{t=(await e.provider.loadRoom({readToken:ht(e.capability),roomId:e.capability.roomId})).version}catch(i){if(!Rf(i))throw i;await Kl(e);const o=await e.provider.loadRoom({readToken:ht(e.capability),roomId:e.capability.roomId});return cy(e.capability,o)}const n=await ph({data:e.data,decryptSecret:e.capability.decryptSecret,roomId:e.capability.roomId,roomType:e.roomType,roomVersion:t+1});let r;try{r=await e.provider.saveRoom({encryptedPayload:n,expectedVersion:t,roomId:e.capability.roomId,writeToken:On(e.capability)})}catch(i){if(!e.recreateIfMissing||!Rf(i))throw i;return await Kl(e),r=await e.provider.loadRoom({readToken:ht(e.capability),roomId:e.capability.roomId}),cy(e.capability,r)}return na(e.capability,r)}function cy(e,t){return{...e,lastSeenVersion:t.version}}function qA(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("App package payload is malformed.");const t=e;if(t.deleted===!0)throw new sx(typeof t.appId=="string"?t.appId:"unknown",typeof t.deletedAt=="string"?t.deletedAt:new Date().toISOString());const n=t.app;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("App package is missing app metadata.");const r=n;if(typeof r.appId!="string"||typeof r.description!="string"||typeof r.name!="string"||typeof r.sourceCode!="string"||typeof r.updatedAt!="string")throw new Error("App package app metadata is unsupported.");return{appId:r.appId,compiledCss:typeof r.compiledCss=="string"?r.compiledCss:void 0,compiledCssSourceHash:typeof r.compiledCssSourceHash=="string"?r.compiledCssSourceHash:void 0,createdAt:typeof r.createdAt=="string"?r.createdAt:r.updatedAt,description:r.description,name:r.name,sourceCode:r.sourceCode,updatedAt:r.updatedAt}}function KA(e){return e instanceof Error&&/already exists/i.test(e.message)}function Rf(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function Nf(e){return e instanceof sx}async function GA(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-app-data"&&(n.status==="syncing"&&!ta(n)||await YA(e,n))}async function YA(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getAppSyncRecord(t.appId);if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.createProviderForSyncRecord(r);if(!i)throw new Error("Storage profile is required before app data can sync.");const o=await QA({item:t,provider:i,syncRecord:r});await e.syncRegistry.rememberAppRoomVersions({appId:t.appId,dataRoom:o}),await tx(e.queueStore,n)}catch(r){await ea(e.queueStore,n,r)}}async function QA(e){try{return await Tf({appData:e.item.localData,provider:e.provider,syncRecord:e.syncRecord})}catch(t){if(!XA(t))throw t;const n=await JA(e.provider,e.syncRecord.dataRoom);return Tf({appData:e.item.localData,provider:e.provider,syncRecord:{...e.syncRecord,dataRoom:n}})}}async function JA(e,t){const n=await e.loadRoom({readToken:ht(t),roomId:t.roomId});return{...t,lastSeenVersion:n.version}}function XA(e){return e instanceof Error&&/version conflict/i.test(e.message)}async function ZA(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="delete-owned-app"&&(n.status==="syncing"&&!ta(n)||await eT(e,n))}async function eT(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getStorageProfile();if(!r)throw new Error("Storage profile is required before remote app rooms can be deleted.");const i=e.createProviderFromStorageProfile(r),o=await dy(i,t.syncRecord.sourceRoom),s=await dy(i,t.syncRecord.dataRoom);await HA({app:t.app,dataProvider:i,sourceProvider:i,syncRecord:{...t.syncRecord,dataRoom:s,sourceRoom:o}}),await e.queueStore.removeItem(t.id)}catch(r){await ea(e.queueStore,n,r)}}async function dy(e,t){try{const n=await e.loadRoom({readToken:ht(t),roomId:t.roomId});return{...t,lastSeenVersion:n.version}}catch(n){if(!tT(n))throw n;return{...t,lastSeenVersion:0}}}function tT(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}async function nT(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="ensure-app-rooms"&&(n.status==="syncing"&&!ta(n)||await rT(e,n))}async function rT(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.syncRegistry.getStorageProfile();if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.core.getApp(t.appId);if(!i){await e.queueStore.removeItem(t.id);return}const o=await e.syncRegistry.getAppSyncRecord(t.appId);if(!o||o.kind==="joined"){await e.queueStore.removeItem(t.id);return}const s=e.createProviderFromStorageProfile(r);await $A({app:i,appData:await e.core.getAppData(i.appId),provider:s,syncRecord:o});const a=await cl({provider:s,syncRecord:o});await e.syncRegistry.rememberAppRoomVersions({appId:i.appId,dataRoom:a.dataRoom,sourceRoom:a.sourceRoom}),await e.queueStore.removeItem(t.id)}catch(r){await ea(e.queueStore,n,r)}}async function iT(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-source"&&(n.status==="syncing"&&!ta(n)||await oT(e,n))}async function oT(e,t){const n=await Zs(e.queueStore,t);try{const r=await e.core.getApp(t.appId);if(!r){await e.queueStore.removeItem(t.id);return}const i=await e.syncRegistry.getAppSyncRecord(t.appId);if(!i){await e.queueStore.removeItem(t.id);return}const o=await e.createProviderForSyncRecord(i);if(!o)throw new Error("Storage profile is required before source can sync.");const s=await sT({app:r,provider:o,syncRecord:i});if(s.kind==="deleted"){await aT(e,t,i,s.deletedAt);return}await e.syncRegistry.rememberAppRoomVersions({appId:r.appId,sourceRoom:s.sourceRoom}),await tx(e.queueStore,n)}catch(r){await ea(e.queueStore,n,r)}}async function sT(e){try{return{kind:"saved",sourceRoom:await Af(e)}}catch(t){if(!lT(t))throw t;try{const n=await ql({provider:e.provider,syncRecord:e.syncRecord});return{kind:"saved",sourceRoom:await Af({...e,syncRecord:{...e.syncRecord,sourceRoom:n.sourceRoom}})}}catch(n){if(Nf(n))return{kind:"deleted",deletedAt:n.deletedAt};throw n}}}async function aT(e,t,n,r){n.kind!=="joined"&&await e.core.deleteApp(t.appId),await e.syncRegistry.markRemoteAppDeleted(t.appId,r),await e.queueStore.removeItem(t.id),await e.queueStore.removeItem(dh(t.appId))}function lT(e){return e instanceof Error&&/room version conflict/i.test(e.message)}const mh=1;function uT(e){if(!e.storageProfile)throw new Error("Storage profile is required before exporting recovery material.");if(!e.manifestRoom)throw new Error("Workspace manifest room is required before exporting recovery material.");return{createdAt:new Date().toISOString(),kind:"app-lab-workspace-recovery",manifestRoom:e.manifestRoom,provider:{accessModel:e.storageProfile.accessModel,databaseUrl:e.storageProfile.databaseUrl,firebaseConfig:e.storageProfile.firebaseConfig,ownerSetupSecret:e.storageProfile.ownerSetupSecret,profileId:e.storageProfile.profileId,provider:e.storageProfile.provider},schemaVersion:mh,workspaceState:ux(e),workspaceId:e.workspaceId}}function cT(e){return`applab-recovery:${CT(new TextEncoder().encode(JSON.stringify(e)))}`}function dT(e){const t=e.trim().replace(/^applab-recovery:/,"");let n;try{n=JSON.parse(new TextDecoder().decode(AT(t)))}catch{throw new Error("Workspace recovery material is not valid.")}return ST(n)}async function fT(e){const t=vh(e.state),n=t.lastSeenVersion===0?await mT(e.provider,t,e.state):await lx(e.provider,t,e.state,t.lastSeenVersion);return{...n.state,manifestRoom:{...n.state.manifestRoom??t,lastSeenVersion:n.snapshot.version},updatedAt:new Date().toISOString()}}async function pT(e){const t=e.recoveryMaterial.workspaceState?fy(cx(e.recoveryMaterial.workspaceState),e.recoveryMaterial):null;let n=null;try{const r=await e.provider.loadRoom({readToken:ht(e.recoveryMaterial.manifestRoom),roomId:e.recoveryMaterial.manifestRoom.roomId});n=await ra({snapshot:r,state:{apps:{},deletedApps:{},manifestRoom:e.recoveryMaterial.manifestRoom,schemaVersion:mh,storageProfile:null,updatedAt:e.recoveryMaterial.createdAt,workspaceId:e.recoveryMaterial.workspaceId}})}catch(r){if(t)return t;throw r}return fy(t?gh(n,t):n,e.recoveryMaterial)}async function hT(e){const t=vh(e.state),n=await e.provider.loadRoom({readToken:ht(t),roomId:t.roomId});return ra({snapshot:n,state:e.state})}async function ra(e){const t=vh(e.state),n=await Fu({capability:t,roomType:"workspace-manifest",snapshot:e.snapshot}),r=cx(n);return{...r,manifestRoom:na(t,e.snapshot),storageProfile:r.storageProfile??e.state.storageProfile}}function fy(e,t){var n,r,i,o,s;return{...e,manifestRoom:e.manifestRoom??t.manifestRoom,storageProfile:{accessModel:t.provider.accessModel??((n=e.storageProfile)==null?void 0:n.accessModel)??Xs,createdAt:((r=e.storageProfile)==null?void 0:r.createdAt)??t.createdAt,databaseUrl:t.provider.databaseUrl,displayName:((i=e.storageProfile)==null?void 0:i.displayName)??"Firebase Realtime Database",firebaseConfig:t.provider.firebaseConfig,ownerSetupSecret:t.provider.ownerSetupSecret??((o=e.storageProfile)==null?void 0:o.ownerSetupSecret),profileId:t.provider.profileId??((s=e.storageProfile)==null?void 0:s.profileId)??`profile_${crypto.randomUUID()}`,provider:t.provider.provider,updatedAt:new Date().toISOString()}}}async function mT(e,t,n){try{return await ax(e,t,n)}catch(r){if(!(r instanceof Error)||!/already exists/i.test(r.message))throw r;const i=await e.loadRoom({readToken:ht(t),roomId:t.roomId}),o=await ra({snapshot:i,state:n});return lx(e,t,gh(o,n),i.version)}}async function ax(e,t,n){return{snapshot:await e.createRoom({encryptedPayload:await dl(t,n,1),readToken:ht(t),roomId:t.roomId,writeToken:On(t)}),state:n}}async function lx(e,t,n,r){try{return{snapshot:await e.saveRoom({encryptedPayload:await dl(t,n,r+1),expectedVersion:r,roomId:t.roomId,writeToken:On(t)}),state:n}}catch(i){if(IT(i))return ax(e,t,n);if(!ET(i))throw i;const o=await e.loadRoom({readToken:ht(t),roomId:t.roomId});if(o.version<r)return{snapshot:await e.saveRoom({encryptedPayload:await dl(t,n,o.version+1),expectedVersion:o.version,roomId:t.roomId,writeToken:On(t)}),state:n};const s=await ra({snapshot:o,state:n}),a=gh(s,n);return{snapshot:await e.saveRoom({encryptedPayload:await dl(t,a,o.version+1),expectedVersion:o.version,roomId:t.roomId,writeToken:On(t)}),state:a}}}function gh(e,t){if(e.workspaceId!==t.workspaceId)throw new Error("Workspace manifest belongs to a different workspace.");const n=gT(e.deletedApps,t.deletedApps),r={};for(const i of[...Object.values(e.apps),...Object.values(t.apps)])n[i.appId]||(r[i.appId]=vT(r[i.appId],i));return{apps:r,deletedApps:n,manifestRoom:kT(e.manifestRoom,t.manifestRoom),schemaVersion:e.schemaVersion,storageProfile:e.storageProfile??t.storageProfile,updatedAt:yh(e.updatedAt,t.updatedAt),workspaceId:e.workspaceId}}function gT(e,t){const n={};for(const r of[...Object.values(e),...Object.values(t)])n[r.appId]=yT(n[r.appId],r);return n}function yT(e,t){return!e||t.deletedAt>e.deletedAt||t.deletedAt===e.deletedAt&&t.reason==="remote-owner-delete"?t:e}function vT(e,t){if(!e)return t;const n=xT(t,e)?t:e,r=n===t?e:t;return n.kind==="owned"&&r.kind==="owned"?wT(n,r):n.kind==="private-copy"&&r.kind==="private-copy"?_T(n,r):n.kind==="joined"&&r.kind==="joined"?bT(n,r):n}function wT(e,t){return{...e,dataRoom:gi(e.dataRoom,t.dataRoom),shareState:e.shareState==="invite-created"||t.shareState==="invite-created"?"invite-created":"private",sourceRoom:gi(e.sourceRoom,t.sourceRoom),updatedAt:yh(e.updatedAt,t.updatedAt)}}function _T(e,t){return{...e,dataRoom:gi(e.dataRoom,t.dataRoom),sourceRoom:gi(e.sourceRoom,t.sourceRoom),updatedAt:yh(e.updatedAt,t.updatedAt)}}function bT(e,t){return{...e,cachedAt:Gl(e.cachedAt,t.cachedAt),dataRoom:gi(e.dataRoom,t.dataRoom),remoteDeletedAt:Gl(e.remoteDeletedAt,t.remoteDeletedAt),sourceRoom:gi(e.sourceRoom,t.sourceRoom)}}function xT(e,t){const n=py(e),r=py(t);return n!==r?n>r:hy(e)>hy(t)}function py(e){return Math.max(e.sourceRoom.lastSeenVersion,e.dataRoom.lastSeenVersion)}function hy(e){return"updatedAt"in e?e.updatedAt:Gl(e.remoteDeletedAt,e.cachedAt,e.importedAt)??""}function kT(e,t){return e?t?gi(e,t):e:t}function gi(e,t){if(e.roomId!==t.roomId)return e.lastSeenVersion>=t.lastSeenVersion?e:t;const n=e.lastSeenVersion>=t.lastSeenVersion?e:t,r=n===e?t:e;return{...n,lastSeenVersion:Math.max(e.lastSeenVersion,t.lastSeenVersion),readToken:n.readToken||r.readToken,writeToken:n.writeToken||r.writeToken,accessToken:n.accessToken||r.accessToken}}function Gl(...e){return e.filter(t=>!!t).sort().at(-1)}function yh(e,t){return Gl(e,t)??e}function dl(e,t,n){return ph({data:ux(t),decryptSecret:e.decryptSecret,roomId:e.roomId,roomType:"workspace-manifest",roomVersion:n})}function ux(e){return{apps:e.apps,deletedApps:e.deletedApps,schemaVersion:e.schemaVersion,storageProfile:e.storageProfile,updatedAt:e.updatedAt,workspaceId:e.workspaceId}}function cx(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Workspace manifest payload is malformed.");const t=e;if(t.schemaVersion!==1||typeof t.workspaceId!="string"||typeof t.updatedAt!="string")throw new Error("Workspace manifest payload is unsupported.");return{apps:ii(t.apps)?t.apps:{},deletedApps:ii(t.deletedApps)?t.deletedApps:{},schemaVersion:1,storageProfile:ii(t.storageProfile)?t.storageProfile:null,updatedAt:t.updatedAt,workspaceId:t.workspaceId}}function ST(e){if(!ii(e))throw new Error("Workspace recovery material is malformed.");if(e.kind!=="app-lab-workspace-recovery"||e.schemaVersion!==mh||typeof e.workspaceId!="string"||typeof e.createdAt!="string"||!ii(e.provider)||e.provider.provider!=="firebase-rtdb"||typeof e.provider.databaseUrl!="string"||!ii(e.provider.firebaseConfig)||typeof e.provider.firebaseConfig.databaseURL!="string"||!ii(e.manifestRoom))throw new Error("Workspace recovery material is unsupported.");return e}function vh(e){if(!e.manifestRoom)throw new Error("Workspace manifest room is not configured.");return e.manifestRoom}function ii(e){return!!(e&&typeof e=="object"&&!Array.isArray(e))}function IT(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function ET(e){return e instanceof Error&&/room version conflict/i.test(e.message)}function CT(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function AT(e){if(!/^[A-Za-z0-9_-]+$/.test(e))throw new Error("Value is not valid base64url.");const t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}async function TT(e){const t=await e.queueStore.listItems();for(const n of t)n.kind==="save-workspace-manifest"&&(n.status==="syncing"&&!ta(n)||await RT(e,n))}async function RT(e,t){var r,i;const n=await Zs(e.queueStore,t);try{const o=await e.syncRegistry.getStorageProfile();if(!o){await e.queueStore.removeItem(t.id);return}await e.syncRegistry.ensureWorkspaceManifestRoom();const s=await e.syncRegistry.getState();if(s.workspaceId!==t.workspaceId){await e.queueStore.removeItem(t.id);return}const a=await fT({provider:e.createProviderFromStorageProfile(o),state:s});if(NT(s,a)){const l=await e.syncRegistry.getState();((r=l.manifestRoom)==null?void 0:r.roomId)===((i=s.manifestRoom)==null?void 0:i.roomId)&&await e.syncRegistry.replaceState({...l,manifestRoom:a.manifestRoom})}else e.onSavedState?await e.onSavedState(a):await e.syncRegistry.replaceState(a);await e.queueStore.removeItem(t.id)}catch(o){if(await ea(e.queueStore,n,o),e.throwOnError)throw o}}function NT(e,t){return!!(e.manifestRoom&&t.manifestRoom&&e.manifestRoom.roomId===t.manifestRoom.roomId&&t.manifestRoom.lastSeenVersion<e.manifestRoom.lastSeenVersion)}var my={};/**
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
 */const dx={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const B=function(e,t){if(!e)throw bo(t)},bo=function(e){return new Error("Firebase Database ("+dx.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};/**
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
 */const fx=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},PT=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=e[n++],s=e[n++],a=e[n++],l=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},wh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const o=e[i],s=i+1<e.length,a=s?e[i+1]:0,l=i+2<e.length,u=l?e[i+2]:0,d=o>>2,c=(o&3)<<4|a>>4;let f=(a&15)<<2|u>>6,p=u&63;l||(p=64,s||(f=64)),r.push(n[d],n[c],n[f],n[p])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(fx(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):PT(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;const u=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||a==null||u==null||c==null)throw new DT;const f=o<<2|a>>4;if(r.push(f),u!==64){const p=a<<4&240|u>>2;if(r.push(p),c!==64){const m=u<<6&192|c;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class DT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const px=function(e){const t=fx(e);return wh.encodeByteArray(t,!0)},Yl=function(e){return px(e).replace(/\./g,"")},Ql=function(e){try{return wh.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function OT(e){return hx(void 0,e)}function hx(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const n=t;return new Date(n.getTime());case Object:e===void 0&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)!t.hasOwnProperty(n)||!LT(n)||(e[n]=hx(e[n],t[n]));return e}function LT(e){return e!=="__proto__"}/**
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
 */function MT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const jT=()=>MT().__FIREBASE_DEFAULTS__,FT=()=>{if(typeof process>"u"||typeof my>"u")return;const e=my.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},UT=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&Ql(e[1]);return t&&JSON.parse(t)},_h=()=>{try{return jT()||FT()||UT()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},mx=e=>{var t,n;return(n=(t=_h())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},zT=e=>{const t=mx(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},gx=()=>{var e;return(e=_h())===null||e===void 0?void 0:e.config},yx=e=>{var t;return(t=_h())===null||t===void 0?void 0:t[`_${e}`]};/**
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
 */function BT(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,o=e.sub||e.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},e);return[Yl(JSON.stringify(n)),Yl(JSON.stringify(s)),""].join(".")}/**
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
 */function At(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(At())}function VT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function $T(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function vx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function HT(){const e=At();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function WT(){return dx.NODE_ADMIN===!0}function qT(){try{return typeof indexedDB=="object"}catch{return!1}}function KT(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}/**
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
 */const GT="FirebaseError";class qr extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=GT,Object.setPrototypeOf(this,qr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oa.prototype.create)}}class oa{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?YT(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new qr(i,a,r)}}function YT(e,t){return e.replace(QT,(n,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const QT=/\{\$([^}]+)}/g;/**
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
 */function Ds(e){return JSON.parse(e)}function nt(e){return JSON.stringify(e)}/**
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
 */const wx=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=Ds(Ql(o[0])||""),n=Ds(Ql(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch{}return{header:t,claims:n,data:r,signature:i}},JT=function(e){const t=wx(e),n=t.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},XT=function(e){const t=wx(e).claims;return typeof t=="object"&&t.admin===!0};/**
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
 */function kn(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function yi(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]}function Pf(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Jl(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function Xl(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const o=e[i],s=t[i];if(gy(o)&&gy(s)){if(!Xl(o,s))return!1}else if(o!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function gy(e){return e!==null&&typeof e=="object"}/**
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
 */class ZT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,n){n||(n=0);const r=this.W_;if(typeof t=="string")for(let c=0;c<16;c++)r[c]=t.charCodeAt(n)<<24|t.charCodeAt(n+1)<<16|t.charCodeAt(n+2)<<8|t.charCodeAt(n+3),n+=4;else for(let c=0;c<16;c++)r[c]=t[n]<<24|t[n+1]<<16|t[n+2]<<8|t[n+3],n+=4;for(let c=16;c<80;c++){const f=r[c-3]^r[c-8]^r[c-14]^r[c-16];r[c]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],o=this.chain_[1],s=this.chain_[2],a=this.chain_[3],l=this.chain_[4],u,d;for(let c=0;c<80;c++){c<40?c<20?(u=a^o&(s^a),d=1518500249):(u=o^s^a,d=1859775393):c<60?(u=o&s|a&(o|s),d=2400959708):(u=o^s^a,d=3395469782);const f=(i<<5|i>>>27)+u+l+d+r[c]&4294967295;l=a,a=s,s=(o<<30|o>>>2)&4294967295,o=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(t,n){if(t==null)return;n===void 0&&(n=t.length);const r=n-this.blockSize;let i=0;const o=this.buf_;let s=this.inbuf_;for(;i<n;){if(s===0)for(;i<=r;)this.compress_(t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<n;)if(o[s]=t.charCodeAt(i),++s,++i,s===this.blockSize){this.compress_(o),s=0;break}}else for(;i<n;)if(o[s]=t[i],++s,++i,s===this.blockSize){this.compress_(o),s=0;break}}this.inbuf_=s,this.total_+=n}digest(){const t=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let o=24;o>=0;o-=8)t[r]=this.chain_[i]>>o&255,++r;return t}}function eR(e,t){const n=new tR(e,t);return n.subscribe.bind(n)}class tR{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");nR(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=Gc),i.error===void 0&&(i.error=Gc),i.complete===void 0&&(i.complete=Gc);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nR(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Gc(){}function xh(e,t){return`${e} failed: ${t} argument `}/**
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
 */const rR=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const o=i-55296;r++,B(r<e.length,"Surrogate pair missing trail surrogate.");const s=e.charCodeAt(r)-56320;i=65536+(o<<10)+s}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Uu=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};/**
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
 */function Zt(e){return e&&e._delegate?e._delegate:e}class vi{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */class iR{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new ia;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(sR(t))try{this.getOrInitializeService({instanceIdentifier:Jr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Jr){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Jr){return this.instances.has(t)}getOptions(t=Jr){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(t,n){var r;const i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const s=this.instances.get(i);return s&&t(s,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:oR(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Jr){return this.component?this.component.multipleInstances?t:Jr:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function oR(e){return e===Jr?void 0:e}function sR(e){return e.instantiationMode==="EAGER"}/**
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
 */class aR{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new iR(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Ie;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(Ie||(Ie={}));const lR={debug:Ie.DEBUG,verbose:Ie.VERBOSE,info:Ie.INFO,warn:Ie.WARN,error:Ie.ERROR,silent:Ie.SILENT},uR=Ie.INFO,cR={[Ie.DEBUG]:"log",[Ie.VERBOSE]:"log",[Ie.INFO]:"info",[Ie.WARN]:"warn",[Ie.ERROR]:"error"},dR=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=cR[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class kh{constructor(t){this.name=t,this._logLevel=uR,this._logHandler=dR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Ie))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?lR[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Ie.DEBUG,...t),this._logHandler(this,Ie.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Ie.VERBOSE,...t),this._logHandler(this,Ie.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Ie.INFO,...t),this._logHandler(this,Ie.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Ie.WARN,...t),this._logHandler(this,Ie.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Ie.ERROR,...t),this._logHandler(this,Ie.ERROR,...t)}}const fR=(e,t)=>t.some(n=>e instanceof n);let yy,vy;function pR(){return yy||(yy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hR(){return vy||(vy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _x=new WeakMap,Df=new WeakMap,bx=new WeakMap,Yc=new WeakMap,Sh=new WeakMap;function mR(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(Nr(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&_x.set(n,e)}).catch(()=>{}),Sh.set(t,e),t}function gR(e){if(Df.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});Df.set(e,t)}let Of={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Df.get(e);if(t==="objectStoreNames")return e.objectStoreNames||bx.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Nr(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function yR(e){Of=e(Of)}function vR(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Qc(this),t,...n);return bx.set(r,t.sort?t.sort():[t]),Nr(r)}:hR().includes(e)?function(...t){return e.apply(Qc(this),t),Nr(_x.get(this))}:function(...t){return Nr(e.apply(Qc(this),t))}}function wR(e){return typeof e=="function"?vR(e):(e instanceof IDBTransaction&&gR(e),fR(e,pR())?new Proxy(e,Of):e)}function Nr(e){if(e instanceof IDBRequest)return mR(e);if(Yc.has(e))return Yc.get(e);const t=wR(e);return t!==e&&(Yc.set(e,t),Sh.set(t,e)),t}const Qc=e=>Sh.get(e);function _R(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),a=Nr(s);return r&&s.addEventListener("upgradeneeded",l=>{r(Nr(s.result),l.oldVersion,l.newVersion,Nr(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const bR=["get","getKey","getAll","getAllKeys","count"],xR=["put","add","delete","clear"],Jc=new Map;function wy(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Jc.get(t))return Jc.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=xR.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||bR.includes(n)))return;const o=async function(s,...a){const l=this.transaction(s,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&l.done]))[0]};return Jc.set(t,o),o}yR(e=>({...e,get:(t,n,r)=>wy(t,n)||e.get(t,n,r),has:(t,n)=>!!wy(t,n)||e.has(t,n)}));/**
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
 */class kR{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(SR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function SR(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Lf="@firebase/app",_y="0.10.13";/**
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
 */const tr=new kh("@firebase/app"),IR="@firebase/app-compat",ER="@firebase/analytics-compat",CR="@firebase/analytics",AR="@firebase/app-check-compat",TR="@firebase/app-check",RR="@firebase/auth",NR="@firebase/auth-compat",PR="@firebase/database",DR="@firebase/data-connect",OR="@firebase/database-compat",LR="@firebase/functions",MR="@firebase/functions-compat",jR="@firebase/installations",FR="@firebase/installations-compat",UR="@firebase/messaging",zR="@firebase/messaging-compat",BR="@firebase/performance",VR="@firebase/performance-compat",$R="@firebase/remote-config",HR="@firebase/remote-config-compat",WR="@firebase/storage",qR="@firebase/storage-compat",KR="@firebase/firestore",GR="@firebase/vertexai-preview",YR="@firebase/firestore-compat",QR="firebase",JR="10.14.1";/**
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
 */const Mf="[DEFAULT]",XR={[Lf]:"fire-core",[IR]:"fire-core-compat",[CR]:"fire-analytics",[ER]:"fire-analytics-compat",[TR]:"fire-app-check",[AR]:"fire-app-check-compat",[RR]:"fire-auth",[NR]:"fire-auth-compat",[PR]:"fire-rtdb",[DR]:"fire-data-connect",[OR]:"fire-rtdb-compat",[LR]:"fire-fn",[MR]:"fire-fn-compat",[jR]:"fire-iid",[FR]:"fire-iid-compat",[UR]:"fire-fcm",[zR]:"fire-fcm-compat",[BR]:"fire-perf",[VR]:"fire-perf-compat",[$R]:"fire-rc",[HR]:"fire-rc-compat",[WR]:"fire-gcs",[qR]:"fire-gcs-compat",[KR]:"fire-fst",[YR]:"fire-fst-compat",[GR]:"fire-vertex","fire-js":"fire-js",[QR]:"fire-js-all"};/**
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
 */const Os=new Map,ZR=new Map,jf=new Map;function by(e,t){try{e.container.addComponent(t)}catch(n){tr.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function fo(e){const t=e.name;if(jf.has(t))return tr.debug(`There were multiple attempts to register component ${t}.`),!1;jf.set(t,e);for(const n of Os.values())by(n,e);for(const n of ZR.values())by(n,e);return!0}function Ih(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Hn(e){return e.settings!==void 0}/**
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
 */const e1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pr=new oa("app","Firebase",e1);/**
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
 */class t1{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Pr.create("app-deleted",{appName:this._name})}}/**
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
 */const ko=JR;function xx(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Mf,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw Pr.create("bad-app-name",{appName:String(i)});if(n||(n=gx()),!n)throw Pr.create("no-options");const o=Os.get(i);if(o){if(Xl(n,o.options)&&Xl(r,o.config))return o;throw Pr.create("duplicate-app",{appName:i})}const s=new aR(i);for(const l of jf.values())s.addComponent(l);const a=new t1(n,r,s);return Os.set(i,a),a}function kx(e=Mf){const t=Os.get(e);if(!t&&e===Mf&&gx())return xx();if(!t)throw Pr.create("no-app",{appName:e});return t}function n1(){return Array.from(Os.values())}function Dr(e,t,n){var r;let i=(r=XR[e])!==null&&r!==void 0?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){const a=[`Unable to register library "${i}" with version "${t}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),tr.warn(a.join(" "));return}fo(new vi(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
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
 */const r1="firebase-heartbeat-database",i1=1,Ls="firebase-heartbeat-store";let Xc=null;function Sx(){return Xc||(Xc=_R(r1,i1,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Ls)}catch(n){console.warn(n)}}}}).catch(e=>{throw Pr.create("idb-open",{originalErrorMessage:e.message})})),Xc}async function o1(e){try{const n=(await Sx()).transaction(Ls),r=await n.objectStore(Ls).get(Ix(e));return await n.done,r}catch(t){if(t instanceof qr)tr.warn(t.message);else{const n=Pr.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});tr.warn(n.message)}}}async function xy(e,t){try{const r=(await Sx()).transaction(Ls,"readwrite");await r.objectStore(Ls).put(t,Ix(e)),await r.done}catch(n){if(n instanceof qr)tr.warn(n.message);else{const r=Pr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});tr.warn(r.message)}}}function Ix(e){return`${e.name}!${e.options.appId}`}/**
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
 */const s1=1024,a1=30*24*60*60*1e3;class l1{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new c1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ky();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const a=new Date(s.date).valueOf();return Date.now()-a<=a1}),this._storage.overwrite(this._heartbeatsCache))}catch(r){tr.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ky(),{heartbeatsToSend:r,unsentEntries:i}=u1(this._heartbeatsCache.heartbeats),o=Yl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return tr.warn(n),""}}}function ky(){return new Date().toISOString().substring(0,10)}function u1(e,t=s1){const n=[];let r=e.slice();for(const i of e){const o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),Sy(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Sy(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class c1{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qT()?KT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await o1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return xy(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return xy(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function Sy(e){return Yl(JSON.stringify({version:2,heartbeats:e})).length}/**
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
 */function d1(e){fo(new vi("platform-logger",t=>new kR(t),"PRIVATE")),fo(new vi("heartbeat",t=>new l1(t),"PRIVATE")),Dr(Lf,_y,e),Dr(Lf,_y,"esm2017"),Dr("fire-js","")}d1("");var f1="firebase",p1="10.14.1";/**
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
 */Dr(f1,p1,"app");function Eh(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function Ex(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const h1=Ex,Cx=new oa("auth","Firebase",Ex());/**
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
 */const Zl=new kh("@firebase/auth");function m1(e,...t){Zl.logLevel<=Ie.WARN&&Zl.warn(`Auth (${ko}): ${e}`,...t)}function fl(e,...t){Zl.logLevel<=Ie.ERROR&&Zl.error(`Auth (${ko}): ${e}`,...t)}/**
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
 */function nr(e,...t){throw Ch(e,...t)}function Ln(e,...t){return Ch(e,...t)}function Ax(e,t,n){const r=Object.assign(Object.assign({},h1()),{[t]:n});return new oa("auth","Firebase",r).create(t,{appName:e.name})}function Or(e){return Ax(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ch(e,...t){if(typeof e!="string"){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Cx.create(e,...t)}function ee(e,t,...n){if(!e)throw Ch(t,...n)}function Wn(e){const t="INTERNAL ASSERTION FAILED: "+e;throw fl(t),new Error(t)}function rr(e,t){e||Wn(t)}/**
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
 */function Ff(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.href)||""}function g1(){return Iy()==="http:"||Iy()==="https:"}function Iy(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.protocol)||null}/**
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
 */function y1(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(g1()||$T()||"connection"in navigator)?navigator.onLine:!0}function v1(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
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
 */class sa{constructor(t,n){this.shortDelay=t,this.longDelay=n,rr(n>t,"Short delay should be less than long delay!"),this.isMobile=bh()||vx()}get(){return y1()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ah(e,t){rr(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
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
 */class Tx{static initialize(t,n,r){this.fetchImpl=t,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const w1={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const _1=new sa(3e4,6e4);function zu(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function So(e,t,n,r,i={}){return Rx(e,i,async()=>{let o={},s={};r&&(t==="GET"?s=r:o={body:JSON.stringify(r)});const a=xo(Object.assign({key:e.config.apiKey},s)).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);const u=Object.assign({method:t,headers:l},o);return VT()||(u.referrerPolicy="no-referrer"),Tx.fetch()(Px(e,e.config.apiHost,n,a),u)})}async function Rx(e,t,n){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},w1),t);try{const i=new b1(e),o=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const s=await o.json();if("needConfirmation"in s)throw Va(e,"account-exists-with-different-credential",s);if(o.ok&&!("errorMessage"in s))return s;{const a=o.ok?s.errorMessage:s.error.message,[l,u]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Va(e,"credential-already-in-use",s);if(l==="EMAIL_EXISTS")throw Va(e,"email-already-in-use",s);if(l==="USER_DISABLED")throw Va(e,"user-disabled",s);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Ax(e,d,u);nr(e,d)}}catch(i){if(i instanceof qr)throw i;nr(e,"network-request-failed",{message:String(i)})}}async function Nx(e,t,n,r,i={}){const o=await So(e,t,n,r,i);return"mfaPendingCredential"in o&&nr(e,"multi-factor-auth-required",{_serverResponse:o}),o}function Px(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?Ah(e.config,i):`${e.config.apiScheme}://${i}`}class b1{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ln(this.auth,"network-request-failed")),_1.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Va(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Ln(e,t,r);return i.customData._tokenResponse=n,i}/**
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
 */async function x1(e,t){return So(e,"POST","/v1/accounts:delete",t)}async function Dx(e,t){return So(e,"POST","/v1/accounts:lookup",t)}/**
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
 */function ss(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function k1(e,t=!1){const n=Zt(e),r=await n.getIdToken(t),i=Th(r);ee(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,s=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:ss(Zc(i.auth_time)),issuedAtTime:ss(Zc(i.iat)),expirationTime:ss(Zc(i.exp)),signInProvider:s||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Zc(e){return Number(e)*1e3}function Th(e){const[t,n,r]=e.split(".");if(t===void 0||n===void 0||r===void 0)return fl("JWT malformed, contained fewer than 3 sections"),null;try{const i=Ql(n);return i?JSON.parse(i):(fl("Failed to decode base64 JWT payload"),null)}catch(i){return fl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ey(e){const t=Th(e);return ee(t,"internal-error"),ee(typeof t.exp<"u","internal-error"),ee(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function Ms(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof qr&&S1(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function S1({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
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
 */class I1{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var n;if(t){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Uf{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ss(this.lastLoginAt),this.creationTime=ss(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function eu(e){var t;const n=e.auth,r=await e.getIdToken(),i=await Ms(e,Dx(n,{idToken:r}));ee(i==null?void 0:i.users.length,n,"internal-error");const o=i.users[0];e._notifyReloadListener(o);const s=!((t=o.providerUserInfo)===null||t===void 0)&&t.length?Ox(o.providerUserInfo):[],a=C1(e.providerData,s),l=e.isAnonymous,u=!(e.email&&o.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,c={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new Uf(o.createdAt,o.lastLoginAt),isAnonymous:d};Object.assign(e,c)}async function E1(e){const t=Zt(e);await eu(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function C1(e,t){return[...e.filter(r=>!t.some(i=>i.providerId===r.providerId)),...t]}function Ox(e){return e.map(t=>{var{providerId:n}=t,r=Eh(t,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function A1(e,t){const n=await Rx(e,{},async()=>{const r=xo({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:o}=e.config,s=Px(e,i,"/v1/token",`key=${o}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Tx.fetch()(s,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function T1(e,t){return So(e,"POST","/v2/accounts:revokeToken",zu(e,t))}/**
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
 */class Zi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){ee(t.idToken,"internal-error"),ee(typeof t.idToken<"u","internal-error"),ee(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Ey(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){ee(t.length!==0,"internal-error");const n=Ey(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ee(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:r,refreshToken:i,expiresIn:o}=await A1(t,n);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(t,n,r){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,n){const{refreshToken:r,accessToken:i,expirationTime:o}=n,s=new Zi;return r&&(ee(typeof r=="string","internal-error",{appName:t}),s.refreshToken=r),i&&(ee(typeof i=="string","internal-error",{appName:t}),s.accessToken=i),o&&(ee(typeof o=="number","internal-error",{appName:t}),s.expirationTime=o),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Zi,this.toJSON())}_performRefresh(){return Wn("not implemented")}}/**
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
 */function cr(e,t){ee(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class qn{constructor(t){var{uid:n,auth:r,stsTokenManager:i}=t,o=Eh(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new I1(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Uf(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(t){const n=await Ms(this,this.stsTokenManager.getToken(this.auth,t));return ee(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return k1(this,t)}reload(){return E1(this)}_assign(t){this!==t&&(ee(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>Object.assign({},n)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new qn(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(t){ee(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),n&&await eu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Hn(this.auth.app))return Promise.reject(Or(this.auth));const t=await this.getIdToken();return await Ms(this,x1(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){var r,i,o,s,a,l,u,d;const c=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,p=(o=n.phoneNumber)!==null&&o!==void 0?o:void 0,m=(s=n.photoURL)!==null&&s!==void 0?s:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,C=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,y=(u=n.createdAt)!==null&&u!==void 0?u:void 0,v=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:g,emailVerified:k,isAnonymous:S,providerData:x,stsTokenManager:A}=n;ee(g&&A,t,"internal-error");const R=Zi.fromJSON(this.name,A);ee(typeof g=="string",t,"internal-error"),cr(c,t.name),cr(f,t.name),ee(typeof k=="boolean",t,"internal-error"),ee(typeof S=="boolean",t,"internal-error"),cr(p,t.name),cr(m,t.name),cr(w,t.name),cr(C,t.name),cr(y,t.name),cr(v,t.name);const D=new qn({uid:g,auth:t,email:f,emailVerified:k,displayName:c,isAnonymous:S,photoURL:m,phoneNumber:p,tenantId:w,stsTokenManager:R,createdAt:y,lastLoginAt:v});return x&&Array.isArray(x)&&(D.providerData=x.map(E=>Object.assign({},E))),C&&(D._redirectEventId=C),D}static async _fromIdTokenResponse(t,n,r=!1){const i=new Zi;i.updateFromServerResponse(n);const o=new qn({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await eu(o),o}static async _fromGetAccountInfoResponse(t,n,r){const i=n.users[0];ee(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Ox(i.providerUserInfo):[],s=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),a=new Zi;a.updateFromIdToken(r);const l=new qn({uid:i.localId,auth:t,stsTokenManager:a,isAnonymous:s}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Uf(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(l,u),l}}/**
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
 */const Cy=new Map;function Kn(e){rr(e instanceof Function,"Expected a class definition");let t=Cy.get(e);return t?(rr(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Cy.set(e,t),t)}/**
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
 */class Lx{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}Lx.type="NONE";const Ay=Lx;/**
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
 */function pl(e,t,n){return`firebase:${e}:${t}:${n}`}class eo{constructor(t,n,r){this.persistence=t,this.auth=n,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=pl(this.userKey,i.apiKey,o),this.fullPersistenceKey=pl("persistence",i.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?qn._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r="authUser"){if(!n.length)return new eo(Kn(Ay),t,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let o=i[0]||Kn(Ay);const s=pl(r,t.config.apiKey,t.name);let a=null;for(const u of n)try{const d=await u._get(s);if(d){const c=qn._fromJSON(t,d);u!==o&&(a=c),o=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!o._shouldAllowMigration||!l.length?new eo(o,t,r):(o=l[0],a&&await o._set(s,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==o)try{await u._remove(s)}catch{}})),new eo(o,t,r))}}/**
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
 */function Ty(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Ux(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Mx(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Bx(t))return"Blackberry";if(Vx(t))return"Webos";if(jx(t))return"Safari";if((t.includes("chrome/")||Fx(t))&&!t.includes("edge/"))return"Chrome";if(zx(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Mx(e=At()){return/firefox\//i.test(e)}function jx(e=At()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Fx(e=At()){return/crios\//i.test(e)}function Ux(e=At()){return/iemobile/i.test(e)}function zx(e=At()){return/android/i.test(e)}function Bx(e=At()){return/blackberry/i.test(e)}function Vx(e=At()){return/webos/i.test(e)}function Rh(e=At()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function R1(e=At()){var t;return Rh(e)&&!!(!((t=window.navigator)===null||t===void 0)&&t.standalone)}function N1(){return HT()&&document.documentMode===10}function $x(e=At()){return Rh(e)||zx(e)||Vx(e)||Bx(e)||/windows phone/i.test(e)||Ux(e)}/**
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
 */function Hx(e,t=[]){let n;switch(e){case"Browser":n=Ty(At());break;case"Worker":n=`${Ty(At())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${ko}/${r}`}/**
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
 */class P1{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const r=o=>new Promise((s,a)=>{try{const l=t(o);s(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const r of this.queue)await r(t),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function D1(e,t={}){return So(e,"GET","/v2/passwordPolicy",zu(e,t))}/**
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
 */const O1=6;class L1{constructor(t){var n,r,i,o;const s=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=s.minPasswordLength)!==null&&n!==void 0?n:O1,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),s.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),s.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),s.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),s.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=t.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=t.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var n,r,i,o,s,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,l),this.validatePasswordCharacterOptions(t,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsUppercaseLetter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(s=l.containsNumericCharacter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(t,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=t.length>=r),i&&(n.meetsMaxPasswordLength=t.length<=i)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<t.length;i++)r=t.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,n,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=o))}}/**
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
 */class M1{constructor(t,n,r,i){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ry(this),this.idTokenSubscription=new Ry(this),this.beforeStateQueue=new P1(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cx,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=Kn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await eo.create(this,t),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await Dx(this,{idToken:t}),r=await qn._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var n;if(Hn(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(t);(!s||s===a)&&(l!=null&&l.user)&&(i=l.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ee(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await eu(t)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=v1()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Hn(this.app))return Promise.reject(Or(this));const n=t?Zt(t):null;return n&&ee(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&ee(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Hn(this.app)?Promise.reject(Or(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Hn(this.app)?Promise.reject(Or(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Kn(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await D1(this),n=new L1(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new oa("auth","Firebase",t())}onAuthStateChanged(t,n,r){return this.registerStateListener(this.authStateSubscription,t,n,r)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,r){return this.registerStateListener(this.idTokenSubscription,t,n,r)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await T1(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,n){const r=await this.getOrInitRedirectPersistenceManager(n);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&Kn(t)||this._popupRedirectResolver;ee(n,this,"argument-error"),this.redirectPersistenceManager=await eo.create(this,[Kn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===t?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,r,i){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let s=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ee(a,this,"internal-error"),a.then(()=>{s||o(this.currentUser)}),typeof n=="function"){const l=t.addObserver(n,r,i);return()=>{s=!0,l()}}else{const l=t.addObserver(n);return()=>{s=!0,l()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return ee(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Hx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var t;const n=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return n!=null&&n.error&&m1(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Bu(e){return Zt(e)}class Ry{constructor(t){this.auth=t,this.observer=null,this.addObserver=eR(n=>this.observer=n)}get next(){return ee(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Nh={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function j1(e){Nh=e}function F1(e){return Nh.loadJS(e)}function U1(){return Nh.gapiScript}function z1(e){return`__${e}${Math.floor(Math.random()*1e6)}`}/**
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
 */function B1(e,t){const n=Ih(e,"auth");if(n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(Xl(o,t??{}))return i;nr(i,"already-initialized")}return n.initialize({options:t})}function V1(e,t){const n=(t==null?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Kn);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function $1(e,t,n){const r=Bu(e);ee(r._canInitEmulator,r,"emulator-config-failed"),ee(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!1,o=Wx(t),{host:s,port:a}=H1(t),l=a===null?"":`:${a}`;r.config.emulator={url:`${o}//${s}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),W1()}function Wx(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function H1(e){const t=Wx(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Ny(r.substr(o.length+1))}}else{const[o,s]=r.split(":");return{host:o,port:Ny(s)}}}function Ny(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function W1(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
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
 */class qx{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return Wn("not implemented")}_getIdTokenResponse(t){return Wn("not implemented")}_linkToIdToken(t,n){return Wn("not implemented")}_getReauthenticationResolver(t){return Wn("not implemented")}}/**
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
 */async function to(e,t){return Nx(e,"POST","/v1/accounts:signInWithIdp",zu(e,t))}/**
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
 */const q1="http://localhost";class wi extends qx{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new wi(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):nr("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:i}=n,o=Eh(n,["providerId","signInMethod"]);if(!r||!i)return null;const s=new wi(r,i);return s.idToken=o.idToken||void 0,s.accessToken=o.accessToken||void 0,s.secret=o.secret,s.nonce=o.nonce,s.pendingToken=o.pendingToken||null,s}_getIdTokenResponse(t){const n=this.buildRequest();return to(t,n)}_linkToIdToken(t,n){const r=this.buildRequest();return r.idToken=n,to(t,r)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,to(t,n)}buildRequest(){const t={requestUri:q1,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=xo(n)}return t}}/**
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
 */class Kx{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class aa extends Kx{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class yr extends aa{constructor(){super("facebook.com")}static credential(t){return wi._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return yr.credentialFromTaggedObject(t)}static credentialFromError(t){return yr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return yr.credential(t.oauthAccessToken)}catch{return null}}}yr.FACEBOOK_SIGN_IN_METHOD="facebook.com";yr.PROVIDER_ID="facebook.com";/**
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
 */class vr extends aa{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return wi._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return vr.credentialFromTaggedObject(t)}static credentialFromError(t){return vr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return vr.credential(n,r)}catch{return null}}}vr.GOOGLE_SIGN_IN_METHOD="google.com";vr.PROVIDER_ID="google.com";/**
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
 */class wr extends aa{constructor(){super("github.com")}static credential(t){return wi._fromParams({providerId:wr.PROVIDER_ID,signInMethod:wr.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return wr.credentialFromTaggedObject(t)}static credentialFromError(t){return wr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return wr.credential(t.oauthAccessToken)}catch{return null}}}wr.GITHUB_SIGN_IN_METHOD="github.com";wr.PROVIDER_ID="github.com";/**
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
 */class _r extends aa{constructor(){super("twitter.com")}static credential(t,n){return wi._fromParams({providerId:_r.PROVIDER_ID,signInMethod:_r.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return _r.credentialFromTaggedObject(t)}static credentialFromError(t){return _r.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return _r.credential(n,r)}catch{return null}}}_r.TWITTER_SIGN_IN_METHOD="twitter.com";_r.PROVIDER_ID="twitter.com";/**
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
 */async function K1(e,t){return Nx(e,"POST","/v1/accounts:signUp",zu(e,t))}/**
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
 */class Ur{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){const o=await qn._fromIdTokenResponse(t,r,i),s=Py(r);return new Ur({user:o,providerId:s,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);const i=Py(r);return new Ur({user:t,providerId:i,_tokenResponse:r,operationType:n})}}function Py(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
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
 */async function G1(e){var t;if(Hn(e.app))return Promise.reject(Or(e));const n=Bu(e);if(await n._initializationPromise,!((t=n.currentUser)===null||t===void 0)&&t.isAnonymous)return new Ur({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await K1(n,{returnSecureToken:!0}),i=await Ur._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
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
 */class tu extends qr{constructor(t,n,r,i){var o;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,tu.prototype),this.customData={appName:t.name,tenantId:(o=t.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new tu(t,n,r,i)}}function Gx(e,t,n,r){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?tu._fromErrorAndOperation(e,o,t,r):o})}async function Y1(e,t,n=!1){const r=await Ms(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Ur._forOperation(e,"link",r)}/**
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
 */async function Q1(e,t,n=!1){const{auth:r}=e;if(Hn(r.app))return Promise.reject(Or(r));const i="reauthenticate";try{const o=await Ms(e,Gx(r,i,t,e),n);ee(o.idToken,r,"internal-error");const s=Th(o.idToken);ee(s,r,"internal-error");const{sub:a}=s;return ee(e.uid===a,r,"user-mismatch"),Ur._forOperation(e,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&nr(r,"user-mismatch"),o}}/**
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
 */async function J1(e,t,n=!1){if(Hn(e.app))return Promise.reject(Or(e));const r="signIn",i=await Gx(e,r,t),o=await Ur._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(o.user),o}function X1(e,t,n,r){return Zt(e).onIdTokenChanged(t,n,r)}function Z1(e,t,n){return Zt(e).beforeAuthStateChanged(t,n)}const nu="__sak";/**
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
 */class Yx{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(nu,"1"),this.storage.removeItem(nu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const eN=1e3,tN=10;class Qx extends Yx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$x(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&t(n,i,r)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((s,a,l)=>{this.notifyListeners(s,l)});return}const r=t.key;n?this.detachListener():this.stopPolling();const i=()=>{const s=this.storage.getItem(r);!n&&this.localCache[r]===s||this.notifyListeners(r,s)},o=this.storage.getItem(r);N1()&&o!==t.newValue&&t.newValue!==t.oldValue?setTimeout(i,tN):i()}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)})},eN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}Qx.type="LOCAL";const nN=Qx;/**
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
 */class Jx extends Yx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}Jx.type="SESSION";const Xx=Jx;/**
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
 */function rN(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Vu{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(i=>i.isListeningto(t));if(n)return n;const r=new Vu(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:r,eventType:i,data:o}=n.data,s=this.handlersMap[i];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(s).map(async u=>u(n.origin,o)),l=await rN(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Vu.receivers=[];/**
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
 */function Ph(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(Math.random()*10);return e+n}/**
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
 */class iN{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,s;return new Promise((a,l)=>{const u=Ph("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);s={messageChannel:i,onMessage(c){const f=c;if(f.data.eventId===u)switch(f.data.status){case"ack":clearTimeout(d),o=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),a(f.data.response);break;default:clearTimeout(d),clearTimeout(o),l(new Error("invalid_response"));break}}},this.handlers.add(s),i.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:t,eventId:u,data:n},[i.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
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
 */function Mn(){return window}function oN(e){Mn().location.href=e}/**
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
 */function Zx(){return typeof Mn().WorkerGlobalScope<"u"&&typeof Mn().importScripts=="function"}async function sN(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function aN(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)===null||e===void 0?void 0:e.controller)||null}function lN(){return Zx()?self:null}/**
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
 */const ek="firebaseLocalStorageDb",uN=1,ru="firebaseLocalStorage",tk="fbase_key";class la{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function $u(e,t){return e.transaction([ru],t?"readwrite":"readonly").objectStore(ru)}function cN(){const e=indexedDB.deleteDatabase(ek);return new la(e).toPromise()}function zf(){const e=indexedDB.open(ek,uN);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const r=e.result;try{r.createObjectStore(ru,{keyPath:tk})}catch(i){n(i)}}),e.addEventListener("success",async()=>{const r=e.result;r.objectStoreNames.contains(ru)?t(r):(r.close(),await cN(),t(await zf()))})})}async function Dy(e,t,n){const r=$u(e,!0).put({[tk]:t,value:n});return new la(r).toPromise()}async function dN(e,t){const n=$u(e,!1).get(t),r=await new la(n).toPromise();return r===void 0?null:r.value}function Oy(e,t){const n=$u(e,!0).delete(t);return new la(n).toPromise()}const fN=800,pN=3;class nk{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await zf(),this.db)}async _withRetries(t){let n=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(n++>pN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zx()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vu._getInstance(lN()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await sN(),!this.activeServiceWorker)return;this.sender=new iN(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((t=r[0])===null||t===void 0)&&t.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||aN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await zf();return await Dy(t,nu,"1"),await Oy(t,nu),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Dy(r,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(r=>dN(r,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Oy(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(i=>{const o=$u(i,!1).getAll();return new la(o).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(t.length!==0)for(const{fbase_key:i,value:o}of t)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}nk.type="LOCAL";const hN=nk;new sa(3e4,6e4);/**
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
 */function mN(e,t){return t?Kn(t):(ee(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
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
 */class Dh extends qx{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return to(t,this._buildIdpRequest())}_linkToIdToken(t,n){return to(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return to(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function gN(e){return J1(e.auth,new Dh(e),e.bypassAuthState)}function yN(e){const{auth:t,user:n}=e;return ee(n,t,"internal-error"),Q1(n,new Dh(e),e.bypassAuthState)}async function vN(e){const{auth:t,user:n}=e;return ee(n,t,"internal-error"),Y1(n,new Dh(e),e.bypassAuthState)}/**
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
 */class rk{constructor(t,n,r,i,o=!1){this.auth=t,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:r,postBody:i,tenantId:o,error:s,type:a}=t;if(s){this.reject(s);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(u){this.reject(u)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return gN;case"linkViaPopup":case"linkViaRedirect":return vN;case"reauthViaPopup":case"reauthViaRedirect":return yN;default:nr(this.auth,"internal-error")}}resolve(t){rr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){rr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const wN=new sa(2e3,1e4);class Wi extends rk{constructor(t,n,r,i,o){super(t,n,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Wi.currentPopupAction&&Wi.currentPopupAction.cancel(),Wi.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return ee(t,this.auth,"internal-error"),t}async onExecution(){rr(this.filter.length===1,"Popup operations only handle one event");const t=Ph();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ln(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)===null||t===void 0?void 0:t.associatedEvent)||null}cancel(){this.reject(Ln(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wi.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ln(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,wN.get())};t()}}Wi.currentPopupAction=null;/**
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
 */const _N="pendingRedirect",hl=new Map;class bN extends rk{constructor(t,n,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let t=hl.get(this.auth._key());if(!t){try{const r=await xN(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(n){t=()=>Promise.reject(n)}hl.set(this.auth._key(),t)}return this.bypassAuthState||hl.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function xN(e,t){const n=IN(t),r=SN(e);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function kN(e,t){hl.set(e._key(),t)}function SN(e){return Kn(e._redirectPersistence)}function IN(e){return pl(_N,e.config.apiKey,e.name)}async function EN(e,t,n=!1){if(Hn(e.app))return Promise.reject(Or(e));const r=Bu(e),i=mN(r,t),s=await new bN(r,i,n).execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}/**
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
 */const CN=10*60*1e3;class AN{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(n=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!TN(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var r;if(t.error&&!ik(t)){const i=((r=t.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Ln(this.auth,i))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const r=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=CN&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ly(t))}saveEventToCache(t){this.cachedEventUids.add(Ly(t)),this.lastProcessedEventTime=Date.now()}}function Ly(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function ik({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function TN(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ik(e);default:return!1}}/**
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
 */async function RN(e,t={}){return So(e,"GET","/v1/projects",t)}/**
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
 */const NN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,PN=/^https?/;async function DN(e){if(e.config.emulator)return;const{authorizedDomains:t}=await RN(e);for(const n of t)try{if(ON(n))return}catch{}nr(e,"unauthorized-domain")}function ON(e){const t=Ff(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return s.hostname===""&&r===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===r}if(!PN.test(n))return!1;if(NN.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const LN=new sa(3e4,6e4);function My(){const e=Mn().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function MN(e){return new Promise((t,n)=>{var r,i,o;function s(){My(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{My(),n(Ln(e,"network-request-failed"))},timeout:LN.get()})}if(!((i=(r=Mn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)t(gapi.iframes.getContext());else if(!((o=Mn().gapi)===null||o===void 0)&&o.load)s();else{const a=z1("iframefcb");return Mn()[a]=()=>{gapi.load?s():n(Ln(e,"network-request-failed"))},F1(`${U1()}?onload=${a}`).catch(l=>n(l))}}).catch(t=>{throw ml=null,t})}let ml=null;function jN(e){return ml=ml||MN(e),ml}/**
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
 */const FN=new sa(5e3,15e3),UN="__/auth/iframe",zN="emulator/auth/iframe",BN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},VN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $N(e){const t=e.config;ee(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Ah(t,zN):`https://${e.config.authDomain}/${UN}`,r={apiKey:t.apiKey,appName:e.name,v:ko},i=VN.get(e.config.apiHost);i&&(r.eid=i);const o=e._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${xo(r).slice(1)}`}async function HN(e){const t=await jN(e),n=Mn().gapi;return ee(n,e,"internal-error"),t.open({where:document.body,url:$N(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:BN,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const s=Ln(e,"network-request-failed"),a=Mn().setTimeout(()=>{o(s)},FN.get());function l(){Mn().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{o(s)})}))}/**
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
 */const WN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qN=500,KN=600,GN="_blank",YN="http://localhost";class jy{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function QN(e,t,n,r=qN,i=KN){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},WN),{width:r.toString(),height:i.toString(),top:o,left:s}),u=At().toLowerCase();n&&(a=Fx(u)?GN:n),Mx(u)&&(t=t||YN,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[p,m])=>`${f}${p}=${m},`,"");if(R1(u)&&a!=="_self")return JN(t||"",a),new jy(null);const c=window.open(t||"",a,d);ee(c,e,"popup-blocked");try{c.focus()}catch{}return new jy(c)}function JN(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const XN="__/auth/handler",ZN="emulator/auth/handler",eP=encodeURIComponent("fac");async function Fy(e,t,n,r,i,o){ee(e.config.authDomain,e,"auth-domain-config-required"),ee(e.config.apiKey,e,"invalid-api-key");const s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:ko,eventId:i};if(t instanceof Kx){t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",Pf(t.getCustomParameters())||(s.customParameters=JSON.stringify(t.getCustomParameters()));for(const[d,c]of Object.entries({}))s[d]=c}if(t instanceof aa){const d=t.getScopes().filter(c=>c!=="");d.length>0&&(s.scopes=d.join(","))}e.tenantId&&(s.tid=e.tenantId);const a=s;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await e._getAppCheckToken(),u=l?`#${eP}=${encodeURIComponent(l)}`:"";return`${tP(e)}?${xo(a).slice(1)}${u}`}function tP({config:e}){return e.emulator?Ah(e,ZN):`https://${e.authDomain}/${XN}`}/**
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
 */const ed="webStorageSupport";class nP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xx,this._completeRedirectFn=EN,this._overrideRedirectResult=kN}async _openPopup(t,n,r,i){var o;rr((o=this.eventManagers[t._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Fy(t,n,r,Ff(),i);return QN(t,s,Ph())}async _openRedirect(t,n,r,i){await this._originValidation(t);const o=await Fy(t,n,r,Ff(),i);return oN(o),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:i,promise:o}=this.eventManagers[n];return i?Promise.resolve(i):(rr(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(t);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(t){const n=await HN(t),r=new AN(t);return n.register("authEvent",i=>(ee(i==null?void 0:i.authEvent,t,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=n,r}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(ed,{type:ed},i=>{var o;const s=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[ed];s!==void 0&&n(!!s),nr(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=DN(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return $x()||jx()||Rh()}}const rP=nP;var Uy="@firebase/auth",zy="1.7.9";/**
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
 */class iP{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ee(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function oP(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sP(e){fo(new vi("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),o=t.getProvider("app-check-internal"),{apiKey:s,authDomain:a}=r.options;ee(s&&!s.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:s,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hx(e)},u=new M1(r,i,o,l);return V1(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,r)=>{t.getProvider("auth-internal").initialize()})),fo(new vi("auth-internal",t=>{const n=Bu(t.getProvider("auth").getImmediate());return(r=>new iP(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Dr(Uy,zy,oP(e)),Dr(Uy,zy,"esm2017")}/**
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
 */const aP=5*60,lP=yx("authIdTokenMaxAge")||aP;let By=null;const uP=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>lP)return;const i=n==null?void 0:n.token;By!==i&&(By=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function cP(e=kx()){const t=Ih(e,"auth");if(t.isInitialized())return t.getImmediate();const n=B1(e,{popupRedirectResolver:rP,persistence:[hN,nN,Xx]}),r=yx("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const s=uP(o.toString());Z1(n,s,()=>s(n.currentUser)),X1(n,a=>s(a))}}const i=mx("auth");return i&&$1(n,`http://${i}`),n}function dP(){var e,t;return(t=(e=document.getElementsByTagName("head"))===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:document}j1({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=i=>{const o=Ln("internal-error");o.customData=i,n(o)},r.type="text/javascript",r.charset="UTF-8",dP().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sP("Browser");var Vy={};const $y="@firebase/database",Hy="1.0.8";/**
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
 */let ok="";function fP(e){ok=e}/**
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
 */class pP{constructor(t){this.domStorage_=t,this.prefix_="firebase:"}set(t,n){n==null?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),nt(n))}get(t){const n=this.domStorage_.getItem(this.prefixedName_(t));return n==null?null:Ds(n)}remove(t){this.domStorage_.removeItem(this.prefixedName_(t))}prefixedName_(t){return this.prefix_+t}toString(){return this.domStorage_.toString()}}/**
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
 */class hP{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(t,n){n==null?delete this.cache_[t]:this.cache_[t]=n}get(t){return kn(this.cache_,t)?this.cache_[t]:null}remove(t){delete this.cache_[t]}}/**
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
 */const sk=function(e){try{if(typeof window<"u"&&typeof window[e]<"u"){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new pP(t)}}catch{}return new hP},oi=sk("localStorage"),mP=sk("sessionStorage");/**
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
 */const no=new kh("@firebase/database"),ak=function(){let e=1;return function(){return e++}}(),lk=function(e){const t=rR(e),n=new ZT;n.update(t);const r=n.digest();return wh.encodeByteArray(r)},ua=function(...e){let t="";for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?t+=ua.apply(null,r):typeof r=="object"?t+=nt(r):t+=r,t+=" "}return t};let as=null,Wy=!0;const gP=function(e,t){B(!0,"Can't turn on custom loggers persistently."),no.logLevel=Ie.VERBOSE,as=no.log.bind(no)},_t=function(...e){if(Wy===!0&&(Wy=!1,as===null&&mP.get("logging_enabled")===!0&&gP()),as){const t=ua.apply(null,e);as(t)}},ca=function(e){return function(...t){_t(e,...t)}},Bf=function(...e){const t="FIREBASE INTERNAL ERROR: "+ua(...e);no.error(t)},ir=function(...e){const t=`FIREBASE FATAL ERROR: ${ua(...e)}`;throw no.error(t),new Error(t)},zt=function(...e){const t="FIREBASE WARNING: "+ua(...e);no.warn(t)},yP=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&zt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Oh=function(e){return typeof e=="number"&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},vP=function(e){if(document.readyState==="complete")e();else{let t=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}t||(t=!0,e())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},po="[MIN_NAME]",_i="[MAX_NAME]",Io=function(e,t){if(e===t)return 0;if(e===po||t===_i)return-1;if(t===po||e===_i)return 1;{const n=qy(e),r=qy(t);return n!==null?r!==null?n-r===0?e.length-t.length:n-r:-1:r!==null?1:e<t?-1:1}},wP=function(e,t){return e===t?0:e<t?-1:1},Fo=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+nt(t))},Lh=function(e){if(typeof e!="object"||e===null)return nt(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)r!==0&&(n+=","),n+=nt(t[r]),n+=":",n+=Lh(e[t[r]]);return n+="}",n},uk=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function Bt(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const ck=function(e){B(!Oh(e),"Invalid JSON number");const t=11,n=52,r=(1<<t-1)-1;let i,o,s,a,l;e===0?(o=0,s=0,i=1/e===-1/0?1:0):(i=e<0,e=Math.abs(e),e>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(e)/Math.LN2),r),o=a+r,s=Math.round(e*Math.pow(2,n-a)-Math.pow(2,n))):(o=0,s=Math.round(e/Math.pow(2,1-r-n))));const u=[];for(l=n;l;l-=1)u.push(s%2?1:0),s=Math.floor(s/2);for(l=t;l;l-=1)u.push(o%2?1:0),o=Math.floor(o/2);u.push(i?1:0),u.reverse();const d=u.join("");let c="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),c=c+f}return c.toLowerCase()},_P=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},bP=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function xP(e,t){let n="Unknown Error";e==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":e==="permission_denied"?n="Client doesn't have permission to access the desired data.":e==="unavailable"&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}const kP=new RegExp("^-?(0*)\\d{1,10}$"),SP=-2147483648,IP=2147483647,qy=function(e){if(kP.test(e)){const t=Number(e);if(t>=SP&&t<=IP)return t}return null},Eo=function(e){try{e()}catch(t){setTimeout(()=>{const n=t.stack||"";throw zt("Exception was thrown by user callback.",n),t},Math.floor(0))}},EP=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ls=function(e,t){const n=setTimeout(e,t);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class CP{constructor(t,n){this.appName_=t,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(t){return this.appCheck?this.appCheck.getToken(t):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(t).then(n,r):n(null)},0)})}addTokenChangeListener(t){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(t))}notifyForInvalidToken(){zt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class AP{constructor(t,n,r){this.appName_=t,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(t){return this.auth_?this.auth_.getToken(t).catch(n=>n&&n.code==="auth/token-not-initialized"?(_t("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(t).then(n,r):n(null)},0)})}addTokenChangeListener(t){this.auth_?this.auth_.addAuthTokenListener(t):this.authProvider_.get().then(n=>n.addAuthTokenListener(t))}removeTokenChangeListener(t){this.authProvider_.get().then(n=>n.removeAuthTokenListener(t))}notifyForInvalidToken(){let t='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',zt(t)}}class gl{constructor(t){this.accessToken=t}getToken(t){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(t){t(this.accessToken)}removeTokenChangeListener(t){}notifyForInvalidToken(){}}gl.OWNER="owner";/**
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
 */const Mh="5",dk="v",fk="s",pk="r",hk="f",mk=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,gk="ls",yk="p",Vf="ac",vk="websocket",wk="long_polling";/**
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
 */class _k{constructor(t,n,r,i,o=!1,s="",a=!1,l=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=o,this.persistenceKey=s,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=t.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=oi.get("host:"+t)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&oi.set("host:"+this._host,this.internalHost))}toString(){let t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t}toURLString(){const t=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${t}${this.host}/${n}`}}function TP(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams}function bk(e,t,n){B(typeof t=="string","typeof type must == string"),B(typeof n=="object","typeof params must == object");let r;if(t===vk)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else if(t===wk)r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+t);TP(e)&&(n.ns=e.namespace);const i=[];return Bt(n,(o,s)=>{i.push(o+"="+s)}),r+i.join("&")}/**
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
 */class RP{constructor(){this.counters_={}}incrementCounter(t,n=1){kn(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=n}get(){return OT(this.counters_)}}/**
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
 */const td={},nd={};function jh(e){const t=e.toString();return td[t]||(td[t]=new RP),td[t]}function NP(e,t){const n=e.toString();return nd[n]||(nd[n]=t()),nd[n]}/**
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
 */class PP{constructor(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(t,n){this.closeAfterResponse=t,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(t,n){for(this.pendingResponses[t]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Eo(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ky="start",DP="close",OP="pLPCommand",LP="pRTLPCB",xk="id",kk="pw",Sk="ser",MP="cb",jP="seg",FP="ts",UP="d",zP="dframe",Ik=1870,Ek=30,BP=Ik-Ek,VP=25e3,$P=3e4;class qi{constructor(t,n,r,i,o,s,a){this.connId=t,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.transportSessionId=s,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ca(t),this.stats_=jh(n),this.urlFn=l=>(this.appCheckToken&&(l[Vf]=this.appCheckToken),bk(n,wk,l))}open(t,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new PP(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor($P)),vP(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Fh((...o)=>{const[s,a,l,u,d]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,s===Ky)this.id=a,this.password=l;else if(s===DP)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+s)},(...o)=>{const[s,a]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(s,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Ky]="t",r[Sk]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[MP]=this.scriptTagHolder.uniqueCallbackIdentifier),r[dk]=Mh,this.transportSessionId&&(r[fk]=this.transportSessionId),this.lastSessionId&&(r[gk]=this.lastSessionId),this.applicationId&&(r[yk]=this.applicationId),this.appCheckToken&&(r[Vf]=this.appCheckToken),typeof location<"u"&&location.hostname&&mk.test(location.hostname)&&(r[pk]=hk);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){qi.forceAllow_=!0}static forceDisallow(){qi.forceDisallow_=!0}static isAvailable(){return qi.forceAllow_?!0:!qi.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!_P()&&!bP()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(t){const n=nt(t);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=px(n),i=uk(r,BP);for(let o=0;o<i.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[o]),this.curSegmentNum++}addDisconnectPingFrame(t,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[zP]="t",r[xk]=t,r[kk]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(t){const n=nt(t).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Fh{constructor(t,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ak(),window[OP+this.uniqueCallbackIdentifier]=t,window[LP+this.uniqueCallbackIdentifier]=n,this.myIFrame=Fh.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const s="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(s),this.myIFrame.doc.close()}catch(a){_t("frame writing exception"),a.stack&&_t(a.stack),_t(a)}}}static createIFrame_(){const t=document.createElement("iframe");if(t.style.display="none",document.body){document.body.appendChild(t);try{t.contentWindow.document||_t("No IE domain setting required")}catch{const r=document.domain;t.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return t.contentDocument?t.doc=t.contentDocument:t.contentWindow?t.doc=t.contentWindow.document:t.document&&(t.doc=t.document),t}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const t=this.onDisconnect;t&&(this.onDisconnect=null,t())}startLongPoll(t,n){for(this.myID=t,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const t={};t[xk]=this.myID,t[kk]=this.myPW,t[Sk]=this.currentSerial;let n=this.urlFn(t),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ek+r.length<=Ik;){const s=this.pendingSegs.shift();r=r+"&"+jP+i+"="+s.seg+"&"+FP+i+"="+s.ts+"&"+UP+i+"="+s.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(t,n,r){this.pendingSegs.push({seg:t,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(t,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(VP)),o=()=>{clearTimeout(i),r()};this.addTag(t,o)}addTag(t,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=t,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{_t("Long-poll script failed to load: "+t),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const HP=16384,WP=45e3;let iu=null;typeof MozWebSocket<"u"?iu=MozWebSocket:typeof WebSocket<"u"&&(iu=WebSocket);class hn{constructor(t,n,r,i,o,s,a){this.connId=t,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ca(this.connId),this.stats_=jh(n),this.connURL=hn.connectionURL_(n,s,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(t,n,r,i,o){const s={};return s[dk]=Mh,typeof location<"u"&&location.hostname&&mk.test(location.hostname)&&(s[pk]=hk),n&&(s[fk]=n),r&&(s[gk]=r),i&&(s[Vf]=i),o&&(s[yk]=o),bk(t,vk,s)}open(t,n){this.onDisconnect=n,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,oi.set("previous_websocket_failure",!0);try{let r;WT(),this.mySock=new iu(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){hn.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(t=!0)}return!t&&iu!==null&&!hn.forceDisallow_}static previouslyFailed(){return oi.isInMemoryStorage||oi.get("previous_websocket_failure")===!0}markConnectionHealthy(){oi.remove("previous_websocket_failure")}appendFrame_(t){if(this.frames.push(t),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Ds(n);this.onMessage(r)}}handleNewFrameCount_(t){this.totalFrames=t,this.frames=[]}extractFrameCount_(t){if(B(this.frames===null,"We already have a frame buffer"),t.length<=6){const n=Number(t);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),t}handleIncomingFrame(t){if(this.mySock===null)return;const n=t.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(t){this.resetKeepAlive();const n=nt(t);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=uk(n,HP);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(WP))}sendString_(t){try{this.mySock.send(t)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}hn.responsesRequiredToBeHealthy=2;hn.healthyTimeout=3e4;/**
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
 */class js{constructor(t){this.initTransports_(t)}static get ALL_TRANSPORTS(){return[qi,hn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(t){const n=hn&&hn.isAvailable();let r=n&&!hn.previouslyFailed();if(t.webSocketOnly&&(n||zt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[hn];else{const i=this.transports_=[];for(const o of js.ALL_TRANSPORTS)o&&o.isAvailable()&&i.push(o);js.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}js.globalTransportInitialized_=!1;/**
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
 */const qP=6e4,KP=5e3,GP=10*1024,YP=100*1024,rd="t",Gy="d",QP="s",Yy="r",JP="e",Qy="o",Jy="a",Xy="n",Zy="p",XP="h";class ZP{constructor(t,n,r,i,o,s,a,l,u,d){this.id=t,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=o,this.onMessage_=s,this.onReady_=a,this.onDisconnect_=l,this.onKill_=u,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ca("c:"+this.id+":"),this.transportManager_=new js(n),this.log_("Connection created"),this.start_()}start_(){const t=this.transportManager_.initialTransport();this.conn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=t.healthyTimeout||0;i>0&&(this.healthyTimeout_=ls(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>YP?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>GP?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(t){return n=>{t===this.conn_?this.onConnectionLost_(n):t===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(t){return n=>{this.state_!==2&&(t===this.rx_?this.onPrimaryMessageReceived_(n):t===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(t){const n={t:"d",d:t};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(t){if(rd in t){const n=t[rd];n===Jy?this.upgradeIfSecondaryHealthy_():n===Yy?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Qy&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(t){const n=Fo("t",t),r=Fo("d",t);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zy,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Jy,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Xy,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(t){const n=Fo("t",t),r=Fo("d",t);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(t){this.onPrimaryResponse_(),this.onMessage_(t)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(t){const n=Fo(rd,t);if(Gy in t){const r=t[Gy];if(n===XP){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Xy){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===QP?this.onConnectionShutdown_(r):n===Yy?this.onReset_(r):n===JP?Bf("Server Error: "+r):n===Qy?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Bf("Unknown control packet command: "+n)}}onHandshake_(t){const n=t.ts,r=t.v,i=t.h;this.sessionId=t.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Mh!==r&&zt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)}startUpgrade_(t){this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),ls(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(qP))}onReset_(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.host=t,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(t,n){this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ls(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(KP))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zy,d:{}}}))}onSecondaryConnectionLost_(){const t=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===t||this.rx_===t)&&this.close()}onConnectionLost_(t){this.conn_=null,!t&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(oi.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(t){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(t)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Ck{put(t,n,r,i){}merge(t,n,r,i){}refreshAuthToken(t){}refreshAppCheckToken(t){}onDisconnectPut(t,n,r){}onDisconnectMerge(t,n,r){}onDisconnectCancel(t,n){}reportStats(t){}}/**
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
 */class Ak{constructor(t){this.allowedEvents_=t,this.listeners_={},B(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...n){if(Array.isArray(this.listeners_[t])){const r=[...this.listeners_[t]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(t,n,r){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:n,context:r});const i=this.getInitialEvent(t);i&&n.apply(r,i)}off(t,n,r){this.validateEventType_(t);const i=this.listeners_[t]||[];for(let o=0;o<i.length;o++)if(i[o].callback===n&&(!r||r===i[o].context)){i.splice(o,1);return}}validateEventType_(t){B(this.allowedEvents_.find(n=>n===t),"Unknown event: "+t)}}/**
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
 */class ou extends Ak{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!bh()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ou}getInitialEvent(t){return B(t==="online","Unknown event type: "+t),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const ev=32,tv=768;class Te{constructor(t,n){if(n===void 0){this.pieces_=t.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=n}toString(){let t="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(t+="/"+this.pieces_[n]);return t||"/"}}function ve(){return new Te("")}function ae(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function zr(e){return e.pieces_.length-e.pieceNum_}function Pe(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new Te(e.pieces_,t)}function Tk(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function eD(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)e.pieces_[n]!==""&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}function Rk(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Nk(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new Te(t,0)}function rt(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof Te)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const r=t.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new Te(n,0)}function ue(e){return e.pieceNum_>=e.pieces_.length}function Et(e,t){const n=ae(e),r=ae(t);if(n===null)return t;if(n===r)return Et(Pe(e),Pe(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function Uh(e,t){if(zr(e)!==zr(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function mn(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(zr(e)>zr(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class tD{constructor(t,n){this.errorPrefix_=n,this.parts_=Rk(t,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Uu(this.parts_[r]);Pk(this)}}function nD(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=Uu(t),Pk(e)}function rD(e){const t=e.parts_.pop();e.byteLength_-=Uu(t),e.parts_.length>0&&(e.byteLength_-=1)}function Pk(e){if(e.byteLength_>tv)throw new Error(e.errorPrefix_+"has a key path longer than "+tv+" bytes ("+e.byteLength_+").");if(e.parts_.length>ev)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ev+") or object contains a cycle "+Xr(e))}function Xr(e){return e.parts_.length===0?"":"in property '"+e.parts_.join(".")+"'"}/**
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
 */class zh extends Ak{constructor(){super(["visible"]);let t,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",t="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",t="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",t="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[t];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new zh}getInitialEvent(t){return B(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
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
 */const Uo=1e3,iD=60*5*1e3,nv=30*1e3,oD=1.3,sD=3e4,aD="server_kill",rv=3;class Qn extends Ck{constructor(t,n,r,i,o,s,a,l){if(super(),this.repoInfo_=t,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=o,this.authTokenProvider_=s,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Qn.nextPersistentConnectionId_++,this.log_=ca("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Uo,this.maxReconnectDelay_=iD,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");zh.getInstance().on("visible",this.onVisible_,this),t.host.indexOf("fblocal")===-1&&ou.getInstance().on("online",this.onOnline_,this)}sendRequest(t,n,r){const i=++this.requestNumber_,o={r:i,a:t,b:n};this.log_(nt(o)),B(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),r&&(this.requestCBHash_[i]=r)}get(t){this.initConnection_();const n=new ia,i={action:"g",request:{p:t._path.toString(),q:t._queryObject},onComplete:s=>{const a=s.d;s.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),n.promise}listen(t,n,r,i){this.initConnection_();const o=t._queryIdentifier,s=t._path.toString();this.log_("Listen called for "+s+" "+o),this.listens.has(s)||this.listens.set(s,new Map),B(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"listen() called for non-default but complete query"),B(!this.listens.get(s).has(o),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:t,tag:r};this.listens.get(s).set(o,a),this.connected_&&this.sendListen_(a)}sendGet_(t){const n=this.outstandingGets_[t];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[t],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(t){const n=t.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const o={p:r},s="q";t.tag&&(o.q=n._queryObject,o.t=t.tag),o.h=t.hashFn(),this.sendRequest(s,o,a=>{const l=a.d,u=a.s;Qn.warnOnListenWarnings_(l,n),(this.listens.get(r)&&this.listens.get(r).get(i))===t&&(this.log_("listen response",a),u!=="ok"&&this.removeListen_(r,i),t.onComplete&&t.onComplete(u,l))})}static warnOnListenWarnings_(t,n){if(t&&typeof t=="object"&&kn(t,"w")){const r=yi(t,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',o=n._path.toString();zt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(t)}reduceReconnectDelayIfAdminCredential_(t){(t&&t.length===40||XT(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=nv)}refreshAppCheckToken(t){this.appCheckToken_=t,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const t=this.authToken_,n=JT(t)?"auth":"gauth",r={cred:t};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const o=i.s,s=i.d||"error";this.authToken_===t&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,s))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},t=>{const n=t.s,r=t.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(t,n){const r=t._path.toString(),i=t._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),B(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,t._queryObject,n)}sendUnlisten_(t,n,r,i){this.log_("Unlisten on "+t+" for "+n);const o={p:t},s="n";i&&(o.q=r,o.t=i),this.sendRequest(s,o)}onDisconnectPut(t,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",t,n,r):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:n,onComplete:r})}onDisconnectMerge(t,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",t,n,r):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:n,onComplete:r})}onDisconnectCancel(t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",t,null,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(t,n,r,i){const o={p:n,d:r};this.log_("onDisconnect "+t,o),this.sendRequest(t,o,s=>{i&&setTimeout(()=>{i(s.s,s.d)},Math.floor(0))})}put(t,n,r,i){this.putInternal("p",t,n,r,i)}merge(t,n,r,i){this.putInternal("m",t,n,r,i)}putInternal(t,n,r,i,o){this.initConnection_();const s={p:n,d:r};o!==void 0&&(s.h=o),this.outstandingPuts_.push({action:t,request:s,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(t){const n=this.outstandingPuts_[t].action,r=this.outstandingPuts_[t].request,i=this.outstandingPuts_[t].onComplete;this.outstandingPuts_[t].queued=this.connected_,this.sendRequest(n,r,o=>{this.log_(n+" response",o),delete this.outstandingPuts_[t],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(o.s,o.d)})}reportStats(t){if(this.connected_){const n={c:t};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const o=r.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(t){if("r"in t){this.log_("from server: "+nt(t));const n=t.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}}onDataPush_(t,n){this.log_("handleServerMessage",t,n),t==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):t==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):t==="c"?this.onListenRevoked_(n.p,n.q):t==="ac"?this.onAuthRevoked_(n.s,n.d):t==="apc"?this.onAppCheckRevoked_(n.s,n.d):t==="sd"?this.onSecurityDebugPacket_(n):Bf("Unrecognized action received from server: "+nt(t)+`
Are you using the latest client?`)}onReady_(t,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(t),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(t){B(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(t))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0)),this.visible_=t}onOnline_(t){t?(this.log_("Browser went online."),this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>sD&&(this.reconnectDelay_=Uo),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const t=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-t);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*oD)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Qn.nextConnectionId_++,o=this.lastSessionId;let s=!1,a=null;const l=function(){a?a.close():(s=!0,r())},u=function(c){B(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(c)};this.realtime_={close:l,sendRequest:u};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[c,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);s?_t("getToken() completed but was canceled"):(_t("getToken() completed. Creating connection."),this.authToken_=c&&c.accessToken,this.appCheckToken_=f&&f.token,a=new ZP(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,r,p=>{zt(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(aD)},o))}catch(c){this.log_("Failed to get token: "+c),s||(this.repoInfo_.nodeAdmin&&zt(c),l())}}}interrupt(t){_t("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(t){_t("Resuming connection for reason: "+t),delete this.interruptReasons_[t],Pf(this.interruptReasons_)&&(this.reconnectDelay_=Uo,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(t){const n=t-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let t=0;t<this.outstandingPuts_.length;t++){const n=this.outstandingPuts_[t];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(t,n){let r;n?r=n.map(o=>Lh(o)).join("$"):r="default";const i=this.removeListen_(t,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(t,n){const r=new Te(t).toString();let i;if(this.listens.has(r)){const o=this.listens.get(r);i=o.get(n),o.delete(n),o.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(t,n){_t("Auth token revoked: "+t+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(t==="invalid_token"||t==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=rv&&(this.reconnectDelay_=nv,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(t,n){_t("App check token revoked: "+t+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(t==="invalid_token"||t==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=rv&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const t of this.listens.values())for(const n of t.values())this.sendListen_(n);for(let t=0;t<this.outstandingPuts_.length;t++)this.outstandingPuts_[t]&&this.sendPut_(t);for(;this.onDisconnectRequestQueue_.length;){const t=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(t.action,t.pathString,t.data,t.onComplete)}for(let t=0;t<this.outstandingGets_.length;t++)this.outstandingGets_[t]&&this.sendGet_(t)}sendConnectStats_(){const t={};let n="js";t["sdk."+n+"."+ok.replace(/\./g,"-")]=1,bh()?t["framework.cordova"]=1:vx()&&(t["framework.reactnative"]=1),this.reportStats(t)}shouldReconnect_(){const t=ou.getInstance().currentlyOnline();return Pf(this.interruptReasons_)&&t}}Qn.nextPersistentConnectionId_=0;Qn.nextConnectionId_=0;/**
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
 */class le{constructor(t,n){this.name=t,this.node=n}static Wrap(t,n){return new le(t,n)}}/**
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
 */class Hu{getCompare(){return this.compare.bind(this)}indexedValueChanged(t,n){const r=new le(po,t),i=new le(po,n);return this.compare(r,i)!==0}minPost(){return le.MIN}}/**
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
 */let $a;class Dk extends Hu{static get __EMPTY_NODE(){return $a}static set __EMPTY_NODE(t){$a=t}compare(t,n){return Io(t.name,n.name)}isDefinedOn(t){throw bo("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(t,n){return!1}minPost(){return le.MIN}maxPost(){return new le(_i,$a)}makePost(t,n){return B(typeof t=="string","KeyIndex indexValue must always be a string."),new le(t,$a)}toString(){return".key"}}const ro=new Dk;/**
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
 */class Ha{constructor(t,n,r,i,o=null){this.isReverse_=i,this.resultGenerator_=o,this.nodeStack_=[];let s=1;for(;!t.isEmpty();)if(t=t,s=n?r(t.key,n):1,i&&(s*=-1),s<0)this.isReverse_?t=t.left:t=t.right;else if(s===0){this.nodeStack_.push(t);break}else this.nodeStack_.push(t),this.isReverse_?t=t.right:t=t.left}getNext(){if(this.nodeStack_.length===0)return null;let t=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(t.key,t.value):n={key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}}}class lt{constructor(t,n,r,i,o){this.key=t,this.value=n,this.color=r??lt.RED,this.left=i??Mt.EMPTY_NODE,this.right=o??Mt.EMPTY_NODE}copy(t,n,r,i,o){return new lt(t??this.key,n??this.value,r??this.color,i??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||!!t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let i=this;const o=r(t,i.key);return o<0?i=i.copy(null,null,null,i.left.insert(t,n,r),null):o===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(t,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Mt.EMPTY_NODE;let t=this;return!t.left.isRed_()&&!t.left.left.isRed_()&&(t=t.moveRedLeft_()),t=t.copy(null,null,null,t.left.removeMin_(),null),t.fixUp_()}remove(t,n){let r,i;if(r=this,n(t,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(t,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(t,r.key)===0){if(r.right.isEmpty())return Mt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(t,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t}moveRedLeft_(){let t=this.colorFlip_();return t.right.left.isRed_()&&(t=t.copy(null,null,null,null,t.right.rotateRight_()),t=t.rotateLeft_(),t=t.colorFlip_()),t}moveRedRight_(){let t=this.colorFlip_();return t.left.left.isRed_()&&(t=t.rotateRight_(),t=t.colorFlip_()),t}rotateLeft_(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth_(){const t=this.check_();return Math.pow(2,t)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const t=this.left.check_();if(t!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)}}lt.RED=!0;lt.BLACK=!1;class lD{copy(t,n,r,i,o){return this}insert(t,n,r){return new lt(t,n,null)}remove(t,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Mt{constructor(t,n=Mt.EMPTY_NODE){this.comparator_=t,this.root_=n}insert(t,n){return new Mt(this.comparator_,this.root_.insert(t,n,this.comparator_).copy(null,null,lt.BLACK,null,null))}remove(t){return new Mt(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,lt.BLACK,null,null))}get(t){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(t,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(t){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(t,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(t){return this.root_.inorderTraversal(t)}reverseTraversal(t){return this.root_.reverseTraversal(t)}getIterator(t){return new Ha(this.root_,null,this.comparator_,!1,t)}getIteratorFrom(t,n){return new Ha(this.root_,t,this.comparator_,!1,n)}getReverseIteratorFrom(t,n){return new Ha(this.root_,t,this.comparator_,!0,n)}getReverseIterator(t){return new Ha(this.root_,null,this.comparator_,!0,t)}}Mt.EMPTY_NODE=new lD;/**
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
 */function uD(e,t){return Io(e.name,t.name)}function Bh(e,t){return Io(e,t)}/**
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
 */let $f;function cD(e){$f=e}const Ok=function(e){return typeof e=="number"?"number:"+ck(e):"string:"+e},Lk=function(e){if(e.isLeafNode()){const t=e.val();B(typeof t=="string"||typeof t=="number"||typeof t=="object"&&kn(t,".sv"),"Priority must be a string or number.")}else B(e===$f||e.isEmpty(),"priority of unexpected type.");B(e===$f||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let iv;class st{constructor(t,n=st.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=n,this.lazyHash_=null,B(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lk(this.priorityNode_)}static set __childrenNodeConstructor(t){iv=t}static get __childrenNodeConstructor(){return iv}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new st(this.value_,t)}getImmediateChild(t){return t===".priority"?this.priorityNode_:st.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return ue(t)?this:ae(t)===".priority"?this.priorityNode_:st.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(t,n){return null}updateImmediateChild(t,n){return t===".priority"?this.updatePriority(n):n.isEmpty()&&t!==".priority"?this:st.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,n).updatePriority(this.priorityNode_)}updateChild(t,n){const r=ae(t);return r===null?n:n.isEmpty()&&r!==".priority"?this:(B(r!==".priority"||zr(t)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,st.__childrenNodeConstructor.EMPTY_NODE.updateChild(Pe(t),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(t,n){return!1}val(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let t="";this.priorityNode_.isEmpty()||(t+="priority:"+Ok(this.priorityNode_.val())+":");const n=typeof this.value_;t+=n+":",n==="number"?t+=ck(this.value_):t+=this.value_,this.lazyHash_=lk(t)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===st.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof st.__childrenNodeConstructor?-1:(B(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))}compareToLeafNode_(t){const n=typeof t.value_,r=typeof this.value_,i=st.VALUE_TYPE_ORDER.indexOf(n),o=st.VALUE_TYPE_ORDER.indexOf(r);return B(i>=0,"Unknown leaf type: "+n),B(o>=0,"Unknown leaf type: "+r),i===o?r==="object"?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:o-i}withIndex(){return this}isIndexed(){return!0}equals(t){if(t===this)return!0;if(t.isLeafNode()){const n=t;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}st.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Mk,jk;function dD(e){Mk=e}function fD(e){jk=e}class pD extends Hu{compare(t,n){const r=t.node.getPriority(),i=n.node.getPriority(),o=r.compareTo(i);return o===0?Io(t.name,n.name):o}isDefinedOn(t){return!t.getPriority().isEmpty()}indexedValueChanged(t,n){return!t.getPriority().equals(n.getPriority())}minPost(){return le.MIN}maxPost(){return new le(_i,new st("[PRIORITY-POST]",jk))}makePost(t,n){const r=Mk(t);return new le(n,new st("[PRIORITY-POST]",r))}toString(){return".priority"}}const Be=new pD;/**
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
 */const hD=Math.log(2);class mD{constructor(t){const n=o=>parseInt(Math.log(o)/hD,10),r=o=>parseInt(Array(o+1).join("1"),2);this.count=n(t+1),this.current_=this.count-1;const i=r(this.count);this.bits_=t+1&i}nextBitIsOne(){const t=!(this.bits_&1<<this.current_);return this.current_--,t}}const su=function(e,t,n,r){e.sort(t);const i=function(l,u){const d=u-l;let c,f;if(d===0)return null;if(d===1)return c=e[l],f=n?n(c):c,new lt(f,c.node,lt.BLACK,null,null);{const p=parseInt(d/2,10)+l,m=i(l,p),w=i(p+1,u);return c=e[p],f=n?n(c):c,new lt(f,c.node,lt.BLACK,m,w)}},o=function(l){let u=null,d=null,c=e.length;const f=function(m,w){const C=c-m,y=c;c-=m;const v=i(C+1,y),g=e[C],k=n?n(g):g;p(new lt(k,g.node,w,null,v))},p=function(m){u?(u.left=m,u=m):(d=m,u=m)};for(let m=0;m<l.count;++m){const w=l.nextBitIsOne(),C=Math.pow(2,l.count-(m+1));w?f(C,lt.BLACK):(f(C,lt.BLACK),f(C,lt.RED))}return d},s=new mD(e.length),a=o(s);return new Mt(r||t,a)};/**
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
 */let id;const Ri={};class Gn{constructor(t,n){this.indexes_=t,this.indexSet_=n}static get Default(){return B(Ri&&Be,"ChildrenNode.ts has not been loaded"),id=id||new Gn({".priority":Ri},{".priority":Be}),id}get(t){const n=yi(this.indexes_,t);if(!n)throw new Error("No index defined for "+t);return n instanceof Mt?n:null}hasIndex(t){return kn(this.indexSet_,t.toString())}addIndex(t,n){B(t!==ro,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const o=n.getIterator(le.Wrap);let s=o.getNext();for(;s;)i=i||t.isDefinedOn(s.node),r.push(s),s=o.getNext();let a;i?a=su(r,t.getCompare()):a=Ri;const l=t.toString(),u=Object.assign({},this.indexSet_);u[l]=t;const d=Object.assign({},this.indexes_);return d[l]=a,new Gn(d,u)}addToIndexes(t,n){const r=Jl(this.indexes_,(i,o)=>{const s=yi(this.indexSet_,o);if(B(s,"Missing index implementation for "+o),i===Ri)if(s.isDefinedOn(t.node)){const a=[],l=n.getIterator(le.Wrap);let u=l.getNext();for(;u;)u.name!==t.name&&a.push(u),u=l.getNext();return a.push(t),su(a,s.getCompare())}else return Ri;else{const a=n.get(t.name);let l=i;return a&&(l=l.remove(new le(t.name,a))),l.insert(t,t.node)}});return new Gn(r,this.indexSet_)}removeFromIndexes(t,n){const r=Jl(this.indexes_,i=>{if(i===Ri)return i;{const o=n.get(t.name);return o?i.remove(new le(t.name,o)):i}});return new Gn(r,this.indexSet_)}}/**
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
 */let zo;class J{constructor(t,n,r){this.children_=t,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Lk(this.priorityNode_),this.children_.isEmpty()&&B(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return zo||(zo=new J(new Mt(Bh),null,Gn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||zo}updatePriority(t){return this.children_.isEmpty()?this:new J(this.children_,t,this.indexMap_)}getImmediateChild(t){if(t===".priority")return this.getPriority();{const n=this.children_.get(t);return n===null?zo:n}}getChild(t){const n=ae(t);return n===null?this:this.getImmediateChild(n).getChild(Pe(t))}hasChild(t){return this.children_.get(t)!==null}updateImmediateChild(t,n){if(B(n,"We should always be passing snapshot nodes"),t===".priority")return this.updatePriority(n);{const r=new le(t,n);let i,o;n.isEmpty()?(i=this.children_.remove(t),o=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(t,n),o=this.indexMap_.addToIndexes(r,this.children_));const s=i.isEmpty()?zo:this.priorityNode_;return new J(i,s,o)}}updateChild(t,n){const r=ae(t);if(r===null)return n;{B(ae(t)!==".priority"||zr(t)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Pe(t),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;const n={};let r=0,i=0,o=!0;if(this.forEachChild(Be,(s,a)=>{n[s]=a.val(t),r++,o&&J.INTEGER_REGEXP_.test(s)?i=Math.max(i,Number(s)):o=!1}),!t&&o&&i<2*r){const s=[];for(const a in n)s[a]=n[a];return s}else return t&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let t="";this.getPriority().isEmpty()||(t+="priority:"+Ok(this.getPriority().val())+":"),this.forEachChild(Be,(n,r)=>{const i=r.hash();i!==""&&(t+=":"+n+":"+i)}),this.lazyHash_=t===""?"":lk(t)}return this.lazyHash_}getPredecessorChildName(t,n,r){const i=this.resolveIndex_(r);if(i){const o=i.getPredecessorKey(new le(t,n));return o?o.name:null}else return this.children_.getPredecessorKey(t)}getFirstChildName(t){const n=this.resolveIndex_(t);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(t){const n=this.getFirstChildName(t);return n?new le(n,this.children_.get(n)):null}getLastChildName(t){const n=this.resolveIndex_(t);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(t){const n=this.getLastChildName(t);return n?new le(n,this.children_.get(n)):null}forEachChild(t,n){const r=this.resolveIndex_(t);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(t){return this.getIteratorFrom(t.minPost(),t)}getIteratorFrom(t,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(t,i=>i);{const i=this.children_.getIteratorFrom(t.name,le.Wrap);let o=i.peek();for(;o!=null&&n.compare(o,t)<0;)i.getNext(),o=i.peek();return i}}getReverseIterator(t){return this.getReverseIteratorFrom(t.maxPost(),t)}getReverseIteratorFrom(t,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(t,i=>i);{const i=this.children_.getReverseIteratorFrom(t.name,le.Wrap);let o=i.peek();for(;o!=null&&n.compare(o,t)>0;)i.getNext(),o=i.peek();return i}}compareTo(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===da?-1:0}withIndex(t){if(t===ro||this.indexMap_.hasIndex(t))return this;{const n=this.indexMap_.addIndex(t,this.children_);return new J(this.children_,this.priorityNode_,n)}}isIndexed(t){return t===ro||this.indexMap_.hasIndex(t)}equals(t){if(t===this)return!0;if(t.isLeafNode())return!1;{const n=t;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(Be),i=n.getIterator(Be);let o=r.getNext(),s=i.getNext();for(;o&&s;){if(o.name!==s.name||!o.node.equals(s.node))return!1;o=r.getNext(),s=i.getNext()}return o===null&&s===null}else return!1;else return!1}}resolveIndex_(t){return t===ro?null:this.indexMap_.get(t.toString())}}J.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class gD extends J{constructor(){super(new Mt(Bh),J.EMPTY_NODE,Gn.Default)}compareTo(t){return t===this?0:1}equals(t){return t===this}getPriority(){return this}getImmediateChild(t){return J.EMPTY_NODE}isEmpty(){return!1}}const da=new gD;Object.defineProperties(le,{MIN:{value:new le(po,J.EMPTY_NODE)},MAX:{value:new le(_i,da)}});Dk.__EMPTY_NODE=J.EMPTY_NODE;st.__childrenNodeConstructor=J;cD(da);fD(da);/**
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
 */const yD=!0;function tt(e,t=null){if(e===null)return J.EMPTY_NODE;if(typeof e=="object"&&".priority"in e&&(t=e[".priority"]),B(t===null||typeof t=="string"||typeof t=="number"||typeof t=="object"&&".sv"in t,"Invalid priority type found: "+typeof t),typeof e=="object"&&".value"in e&&e[".value"]!==null&&(e=e[".value"]),typeof e!="object"||".sv"in e){const n=e;return new st(n,tt(t))}if(!(e instanceof Array)&&yD){const n=[];let r=!1;if(Bt(e,(s,a)=>{if(s.substring(0,1)!=="."){const l=tt(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),n.push(new le(s,l)))}}),n.length===0)return J.EMPTY_NODE;const o=su(n,uD,s=>s.name,Bh);if(r){const s=su(n,Be.getCompare());return new J(o,tt(t),new Gn({".priority":s},{".priority":Be}))}else return new J(o,tt(t),Gn.Default)}else{let n=J.EMPTY_NODE;return Bt(e,(r,i)=>{if(kn(e,r)&&r.substring(0,1)!=="."){const o=tt(i);(o.isLeafNode()||!o.isEmpty())&&(n=n.updateImmediateChild(r,o))}}),n.updatePriority(tt(t))}}dD(tt);/**
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
 */class vD extends Hu{constructor(t){super(),this.indexPath_=t,B(!ue(t)&&ae(t)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(t){return t.getChild(this.indexPath_)}isDefinedOn(t){return!t.getChild(this.indexPath_).isEmpty()}compare(t,n){const r=this.extractChild(t.node),i=this.extractChild(n.node),o=r.compareTo(i);return o===0?Io(t.name,n.name):o}makePost(t,n){const r=tt(t),i=J.EMPTY_NODE.updateChild(this.indexPath_,r);return new le(n,i)}maxPost(){const t=J.EMPTY_NODE.updateChild(this.indexPath_,da);return new le(_i,t)}toString(){return Rk(this.indexPath_,0).join("/")}}/**
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
 */class wD extends Hu{compare(t,n){const r=t.node.compareTo(n.node);return r===0?Io(t.name,n.name):r}isDefinedOn(t){return!0}indexedValueChanged(t,n){return!t.equals(n)}minPost(){return le.MIN}maxPost(){return le.MAX}makePost(t,n){const r=tt(t);return new le(n,r)}toString(){return".value"}}const _D=new wD;/**
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
 */function Fk(e){return{type:"value",snapshotNode:e}}function ho(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function Fs(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function Us(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}function bD(e,t){return{type:"child_moved",snapshotNode:t,childName:e}}/**
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
 */class Vh{constructor(t){this.index_=t}updateChild(t,n,r,i,o,s){B(t.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=t.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(s!=null&&(r.isEmpty()?t.hasChild(n)?s.trackChildChange(Fs(n,a)):B(t.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(ho(n,r)):s.trackChildChange(Us(n,r,a))),t.isLeafNode()&&r.isEmpty())?t:t.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(t,n,r){return r!=null&&(t.isLeafNode()||t.forEachChild(Be,(i,o)=>{n.hasChild(i)||r.trackChildChange(Fs(i,o))}),n.isLeafNode()||n.forEachChild(Be,(i,o)=>{if(t.hasChild(i)){const s=t.getImmediateChild(i);s.equals(o)||r.trackChildChange(Us(i,o,s))}else r.trackChildChange(ho(i,o))})),n.withIndex(this.index_)}updatePriority(t,n){return t.isEmpty()?J.EMPTY_NODE:t.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class zs{constructor(t){this.indexedFilter_=new Vh(t.getIndex()),this.index_=t.getIndex(),this.startPost_=zs.getStartPost_(t),this.endPost_=zs.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(t){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),t)<=0:this.index_.compare(this.getStartPost(),t)<0,r=this.endIsInclusive_?this.index_.compare(t,this.getEndPost())<=0:this.index_.compare(t,this.getEndPost())<0;return n&&r}updateChild(t,n,r,i,o,s){return this.matches(new le(n,r))||(r=J.EMPTY_NODE),this.indexedFilter_.updateChild(t,n,r,i,o,s)}updateFullNode(t,n,r){n.isLeafNode()&&(n=J.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(J.EMPTY_NODE);const o=this;return n.forEachChild(Be,(s,a)=>{o.matches(new le(s,a))||(i=i.updateImmediateChild(s,J.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(t,i,r)}updatePriority(t,n){return t}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(t){if(t.hasStart()){const n=t.getIndexStartName();return t.getIndex().makePost(t.getIndexStartValue(),n)}else return t.getIndex().minPost()}static getEndPost_(t){if(t.hasEnd()){const n=t.getIndexEndName();return t.getIndex().makePost(t.getIndexEndValue(),n)}else return t.getIndex().maxPost()}}/**
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
 */class xD{constructor(t){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new zs(t),this.index_=t.getIndex(),this.limit_=t.getLimit(),this.reverse_=!t.isViewFromLeft(),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}updateChild(t,n,r,i,o,s){return this.rangedFilter_.matches(new le(n,r))||(r=J.EMPTY_NODE),t.getImmediateChild(n).equals(r)?t:t.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(t,n,r,i,o,s):this.fullLimitUpdateChild_(t,n,r,o,s)}updateFullNode(t,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=J.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=J.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let s=0;for(;o.hasNext()&&s<this.limit_;){const a=o.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),s++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(J.EMPTY_NODE);let o;this.reverse_?o=i.getReverseIterator(this.index_):o=i.getIterator(this.index_);let s=0;for(;o.hasNext();){const a=o.getNext();s<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?s++:i=i.updateImmediateChild(a.name,J.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(t,i,r)}updatePriority(t,n){return t}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(t,n,r,i,o){let s;if(this.reverse_){const c=this.index_.getCompare();s=(f,p)=>c(p,f)}else s=this.index_.getCompare();const a=t;B(a.numChildren()===this.limit_,"");const l=new le(n,r),u=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const c=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,u,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const p=f==null?1:s(f,l);if(d&&!r.isEmpty()&&p>=0)return o!=null&&o.trackChildChange(Us(n,r,c)),a.updateImmediateChild(n,r);{o!=null&&o.trackChildChange(Fs(n,c));const w=a.updateImmediateChild(n,J.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(o!=null&&o.trackChildChange(ho(f.name,f.node)),w.updateImmediateChild(f.name,f.node)):w}}else return r.isEmpty()?t:d&&s(u,l)>=0?(o!=null&&(o.trackChildChange(Fs(u.name,u.node)),o.trackChildChange(ho(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(u.name,J.EMPTY_NODE)):t}}/**
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
 */class $h{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Be}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return B(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return B(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:po}hasEnd(){return this.endSet_}getIndexEndValue(){return B(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return B(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:_i}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return B(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Be}copy(){const t=new $h;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}}function kD(e){return e.loadsAllData()?new Vh(e.getIndex()):e.hasLimit()?new xD(e):new zs(e)}function ov(e){const t={};if(e.isDefault())return t;let n;if(e.index_===Be?n="$priority":e.index_===_D?n="$value":e.index_===ro?n="$key":(B(e.index_ instanceof vD,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=nt(n),e.startSet_){const r=e.startAfterSet_?"startAfter":"startAt";t[r]=nt(e.indexStartValue_),e.startNameSet_&&(t[r]+=","+nt(e.indexStartName_))}if(e.endSet_){const r=e.endBeforeSet_?"endBefore":"endAt";t[r]=nt(e.indexEndValue_),e.endNameSet_&&(t[r]+=","+nt(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function sv(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;n===""&&(e.isViewFromLeft()?n="l":n="r"),t.vf=n}return e.index_!==Be&&(t.i=e.index_.toString()),t}/**
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
 */class au extends Ck{constructor(t,n,r,i){super(),this.repoInfo_=t,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=ca("p:rest:"),this.listens_={}}reportStats(t){throw new Error("Method not implemented.")}static getListenId_(t,n){return n!==void 0?"tag$"+n:(B(t._queryParams.isDefault(),"should have a tag if it's not a default query."),t._path.toString())}listen(t,n,r,i){const o=t._path.toString();this.log_("Listen called for "+o+" "+t._queryIdentifier);const s=au.getListenId_(t,r),a={};this.listens_[s]=a;const l=ov(t._queryParams);this.restRequest_(o+".json",l,(u,d)=>{let c=d;if(u===404&&(c=null,u=null),u===null&&this.onDataUpdate_(o,c,!1,r),yi(this.listens_,s)===a){let f;u?u===401?f="permission_denied":f="rest_error:"+u:f="ok",i(f,null)}})}unlisten(t,n){const r=au.getListenId_(t,n);delete this.listens_[r]}get(t){const n=ov(t._queryParams),r=t._path.toString(),i=new ia;return this.restRequest_(r+".json",n,(o,s)=>{let a=s;o===404&&(a=null,o=null),o===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(t){}restRequest_(t,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,o])=>{i&&i.accessToken&&(n.auth=i.accessToken),o&&o.token&&(n.ac=o.token);const s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+t+"?ns="+this.repoInfo_.namespace+xo(n);this.log_("Sending REST request for "+s);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+s+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ds(a.responseText)}catch{zt("Failed to parse JSON response for "+s+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&zt("Got unsuccessful REST response for "+s+" Status: "+a.status),r(a.status);r=null}},a.open("GET",s,!0),a.send()})}}/**
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
 */class SD{constructor(){this.rootNode_=J.EMPTY_NODE}getNode(t){return this.rootNode_.getChild(t)}updateSnapshot(t,n){this.rootNode_=this.rootNode_.updateChild(t,n)}}/**
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
 */function lu(){return{value:null,children:new Map}}function Uk(e,t,n){if(ue(t))e.value=n,e.children.clear();else if(e.value!==null)e.value=e.value.updateChild(t,n);else{const r=ae(t);e.children.has(r)||e.children.set(r,lu());const i=e.children.get(r);t=Pe(t),Uk(i,t,n)}}function Hf(e,t,n){e.value!==null?n(t,e.value):ID(e,(r,i)=>{const o=new Te(t.toString()+"/"+r);Hf(i,o,n)})}function ID(e,t){e.children.forEach((n,r)=>{t(r,n)})}/**
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
 */class ED{constructor(t){this.collection_=t,this.last_=null}get(){const t=this.collection_.get(),n=Object.assign({},t);return this.last_&&Bt(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=t,n}}/**
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
 */const av=10*1e3,CD=30*1e3,AD=5*60*1e3;class TD{constructor(t,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ED(t);const r=av+(CD-av)*Math.random();ls(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const t=this.statsListener_.get(),n={};let r=!1;Bt(t,(i,o)=>{o>0&&kn(this.statsToReport_,i)&&(n[i]=o,r=!0)}),r&&this.server_.reportStats(n),ls(this.reportStats_.bind(this),Math.floor(Math.random()*2*AD))}}/**
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
 */var gn;(function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(gn||(gn={}));function zk(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Hh(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Wh(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}/**
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
 */class uu{constructor(t,n,r){this.path=t,this.affectedTree=n,this.revert=r,this.type=gn.ACK_USER_WRITE,this.source=zk()}operationForChild(t){if(ue(this.path)){if(this.affectedTree.value!=null)return B(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new Te(t));return new uu(ve(),n,this.revert)}}else return B(ae(this.path)===t,"operationForChild called for unrelated child."),new uu(Pe(this.path),this.affectedTree,this.revert)}}/**
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
 */class Bs{constructor(t,n){this.source=t,this.path=n,this.type=gn.LISTEN_COMPLETE}operationForChild(t){return ue(this.path)?new Bs(this.source,ve()):new Bs(this.source,Pe(this.path))}}/**
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
 */class bi{constructor(t,n,r){this.source=t,this.path=n,this.snap=r,this.type=gn.OVERWRITE}operationForChild(t){return ue(this.path)?new bi(this.source,ve(),this.snap.getImmediateChild(t)):new bi(this.source,Pe(this.path),this.snap)}}/**
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
 */class Vs{constructor(t,n,r){this.source=t,this.path=n,this.children=r,this.type=gn.MERGE}operationForChild(t){if(ue(this.path)){const n=this.children.subtree(new Te(t));return n.isEmpty()?null:n.value?new bi(this.source,ve(),n.value):new Vs(this.source,ve(),n)}else return B(ae(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new Vs(this.source,Pe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Br{constructor(t,n,r){this.node_=t,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(t){if(ue(t))return this.isFullyInitialized()&&!this.filtered_;const n=ae(t);return this.isCompleteForChild(n)}isCompleteForChild(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)}getNode(){return this.node_}}/**
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
 */class RD{constructor(t){this.query_=t,this.index_=this.query_._queryParams.getIndex()}}function ND(e,t,n,r){const i=[],o=[];return t.forEach(s=>{s.type==="child_changed"&&e.index_.indexedValueChanged(s.oldSnap,s.snapshotNode)&&o.push(bD(s.childName,s.snapshotNode))}),Bo(e,i,"child_removed",t,r,n),Bo(e,i,"child_added",t,r,n),Bo(e,i,"child_moved",o,r,n),Bo(e,i,"child_changed",t,r,n),Bo(e,i,"value",t,r,n),i}function Bo(e,t,n,r,i,o){const s=r.filter(a=>a.type===n);s.sort((a,l)=>DD(e,a,l)),s.forEach(a=>{const l=PD(e,a,o);i.forEach(u=>{u.respondsTo(a.type)&&t.push(u.createEvent(l,e.query_))})})}function PD(e,t,n){return t.type==="value"||t.type==="child_removed"||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}function DD(e,t,n){if(t.childName==null||n.childName==null)throw bo("Should only compare child_ events.");const r=new le(t.childName,t.snapshotNode),i=new le(n.childName,n.snapshotNode);return e.index_.compare(r,i)}/**
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
 */function Wu(e,t){return{eventCache:e,serverCache:t}}function us(e,t,n,r){return Wu(new Br(t,n,r),e.serverCache)}function Bk(e,t,n,r){return Wu(e.eventCache,new Br(t,n,r))}function cu(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function xi(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}/**
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
 */let od;const OD=()=>(od||(od=new Mt(wP)),od);class Le{constructor(t,n=OD()){this.value=t,this.children=n}static fromObject(t){let n=new Le(null);return Bt(t,(r,i)=>{n=n.set(new Te(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(t,n){if(this.value!=null&&n(this.value))return{path:ve(),value:this.value};if(ue(t))return null;{const r=ae(t),i=this.children.get(r);if(i!==null){const o=i.findRootMostMatchingPathAndValue(Pe(t),n);return o!=null?{path:rt(new Te(r),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(t){return this.findRootMostMatchingPathAndValue(t,()=>!0)}subtree(t){if(ue(t))return this;{const n=ae(t),r=this.children.get(n);return r!==null?r.subtree(Pe(t)):new Le(null)}}set(t,n){if(ue(t))return new Le(n,this.children);{const r=ae(t),o=(this.children.get(r)||new Le(null)).set(Pe(t),n),s=this.children.insert(r,o);return new Le(this.value,s)}}remove(t){if(ue(t))return this.children.isEmpty()?new Le(null):new Le(null,this.children);{const n=ae(t),r=this.children.get(n);if(r){const i=r.remove(Pe(t));let o;return i.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,i),this.value===null&&o.isEmpty()?new Le(null):new Le(this.value,o)}else return this}}get(t){if(ue(t))return this.value;{const n=ae(t),r=this.children.get(n);return r?r.get(Pe(t)):null}}setTree(t,n){if(ue(t))return n;{const r=ae(t),o=(this.children.get(r)||new Le(null)).setTree(Pe(t),n);let s;return o.isEmpty()?s=this.children.remove(r):s=this.children.insert(r,o),new Le(this.value,s)}}fold(t){return this.fold_(ve(),t)}fold_(t,n){const r={};return this.children.inorderTraversal((i,o)=>{r[i]=o.fold_(rt(t,i),n)}),n(t,this.value,r)}findOnPath(t,n){return this.findOnPath_(t,ve(),n)}findOnPath_(t,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(ue(t))return null;{const o=ae(t),s=this.children.get(o);return s?s.findOnPath_(Pe(t),rt(n,o),r):null}}foreachOnPath(t,n){return this.foreachOnPath_(t,ve(),n)}foreachOnPath_(t,n,r){if(ue(t))return this;{this.value&&r(n,this.value);const i=ae(t),o=this.children.get(i);return o?o.foreachOnPath_(Pe(t),rt(n,i),r):new Le(null)}}foreach(t){this.foreach_(ve(),t)}foreach_(t,n){this.children.inorderTraversal((r,i)=>{i.foreach_(rt(t,r),n)}),this.value&&n(t,this.value)}foreachChild(t){this.children.inorderTraversal((n,r)=>{r.value&&t(n,r.value)})}}/**
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
 */class wn{constructor(t){this.writeTree_=t}static empty(){return new wn(new Le(null))}}function cs(e,t,n){if(ue(t))return new wn(new Le(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(r!=null){const i=r.path;let o=r.value;const s=Et(i,t);return o=o.updateChild(s,n),new wn(e.writeTree_.set(i,o))}else{const i=new Le(n),o=e.writeTree_.setTree(t,i);return new wn(o)}}}function lv(e,t,n){let r=e;return Bt(n,(i,o)=>{r=cs(r,rt(t,i),o)}),r}function uv(e,t){if(ue(t))return wn.empty();{const n=e.writeTree_.setTree(t,new Le(null));return new wn(n)}}function Wf(e,t){return Ei(e,t)!=null}function Ei(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return n!=null?e.writeTree_.get(n.path).getChild(Et(n.path,t)):null}function cv(e){const t=[],n=e.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Be,(r,i)=>{t.push(new le(r,i))}):e.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&t.push(new le(r,i.value))}),t}function Lr(e,t){if(ue(t))return e;{const n=Ei(e,t);return n!=null?new wn(new Le(n)):new wn(e.writeTree_.subtree(t))}}function qf(e){return e.writeTree_.isEmpty()}function mo(e,t){return Vk(ve(),e.writeTree_,t)}function Vk(e,t,n){if(t.value!=null)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal((i,o)=>{i===".priority"?(B(o.value!==null,"Priority writes must always be leaf nodes"),r=o.value):n=Vk(rt(e,i),o,n)}),!n.getChild(e).isEmpty()&&r!==null&&(n=n.updateChild(rt(e,".priority"),r)),n}}/**
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
 */function qu(e,t){return qk(t,e)}function LD(e,t,n,r,i){B(r>e.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=cs(e.visibleWrites,t,n)),e.lastWriteId=r}function MD(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}function jD(e,t){const n=e.allWrites.findIndex(a=>a.writeId===t);B(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,s=e.allWrites.length-1;for(;i&&s>=0;){const a=e.allWrites[s];a.visible&&(s>=n&&FD(a,r.path)?i=!1:mn(r.path,a.path)&&(o=!0)),s--}if(i){if(o)return UD(e),!0;if(r.snap)e.visibleWrites=uv(e.visibleWrites,r.path);else{const a=r.children;Bt(a,l=>{e.visibleWrites=uv(e.visibleWrites,rt(r.path,l))})}return!0}else return!1}function FD(e,t){if(e.snap)return mn(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&mn(rt(e.path,n),t))return!0;return!1}function UD(e){e.visibleWrites=$k(e.allWrites,zD,ve()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}function zD(e){return e.visible}function $k(e,t,n){let r=wn.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const s=o.path;let a;if(o.snap)mn(n,s)?(a=Et(n,s),r=cs(r,a,o.snap)):mn(s,n)&&(a=Et(s,n),r=cs(r,ve(),o.snap.getChild(a)));else if(o.children){if(mn(n,s))a=Et(n,s),r=lv(r,a,o.children);else if(mn(s,n))if(a=Et(s,n),ue(a))r=lv(r,ve(),o.children);else{const l=yi(o.children,ae(a));if(l){const u=l.getChild(Pe(a));r=cs(r,ve(),u)}}}else throw bo("WriteRecord should have .snap or .children")}}return r}function Hk(e,t,n,r,i){if(!r&&!i){const o=Ei(e.visibleWrites,t);if(o!=null)return o;{const s=Lr(e.visibleWrites,t);if(qf(s))return n;if(n==null&&!Wf(s,ve()))return null;{const a=n||J.EMPTY_NODE;return mo(s,a)}}}else{const o=Lr(e.visibleWrites,t);if(!i&&qf(o))return n;if(!i&&n==null&&!Wf(o,ve()))return null;{const s=function(u){return(u.visible||i)&&(!r||!~r.indexOf(u.writeId))&&(mn(u.path,t)||mn(t,u.path))},a=$k(e.allWrites,s,t),l=n||J.EMPTY_NODE;return mo(a,l)}}}function BD(e,t,n){let r=J.EMPTY_NODE;const i=Ei(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(Be,(o,s)=>{r=r.updateImmediateChild(o,s)}),r;if(n){const o=Lr(e.visibleWrites,t);return n.forEachChild(Be,(s,a)=>{const l=mo(Lr(o,new Te(s)),a);r=r.updateImmediateChild(s,l)}),cv(o).forEach(s=>{r=r.updateImmediateChild(s.name,s.node)}),r}else{const o=Lr(e.visibleWrites,t);return cv(o).forEach(s=>{r=r.updateImmediateChild(s.name,s.node)}),r}}function VD(e,t,n,r,i){B(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=rt(t,n);if(Wf(e.visibleWrites,o))return null;{const s=Lr(e.visibleWrites,o);return qf(s)?i.getChild(n):mo(s,i.getChild(n))}}function $D(e,t,n,r){const i=rt(t,n),o=Ei(e.visibleWrites,i);if(o!=null)return o;if(r.isCompleteForChild(n)){const s=Lr(e.visibleWrites,i);return mo(s,r.getNode().getImmediateChild(n))}else return null}function HD(e,t){return Ei(e.visibleWrites,t)}function WD(e,t,n,r,i,o,s){let a;const l=Lr(e.visibleWrites,t),u=Ei(l,ve());if(u!=null)a=u;else if(n!=null)a=mo(l,n);else return[];if(a=a.withIndex(s),!a.isEmpty()&&!a.isLeafNode()){const d=[],c=s.getCompare(),f=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s);let p=f.getNext();for(;p&&d.length<i;)c(p,r)!==0&&d.push(p),p=f.getNext();return d}else return[]}function qD(){return{visibleWrites:wn.empty(),allWrites:[],lastWriteId:-1}}function du(e,t,n,r){return Hk(e.writeTree,e.treePath,t,n,r)}function qh(e,t){return BD(e.writeTree,e.treePath,t)}function dv(e,t,n,r){return VD(e.writeTree,e.treePath,t,n,r)}function fu(e,t){return HD(e.writeTree,rt(e.treePath,t))}function KD(e,t,n,r,i,o){return WD(e.writeTree,e.treePath,t,n,r,i,o)}function Kh(e,t,n){return $D(e.writeTree,e.treePath,t,n)}function Wk(e,t){return qk(rt(e.treePath,t),e.writeTree)}function qk(e,t){return{treePath:e,writeTree:t}}/**
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
 */class GD{constructor(){this.changeMap=new Map}trackChildChange(t){const n=t.type,r=t.childName;B(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),B(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const o=i.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(r,Us(r,t.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(r,Fs(r,i.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(r,ho(r,t.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(r,Us(r,t.snapshotNode,i.oldSnap));else throw bo("Illegal combination of changes: "+t+" occurred after "+i)}else this.changeMap.set(r,t)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class YD{getCompleteChild(t){return null}getChildAfterChild(t,n,r){return null}}const Kk=new YD;class Gh{constructor(t,n,r=null){this.writes_=t,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(t){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(t))return n.getNode().getImmediateChild(t);{const r=this.optCompleteServerCache_!=null?new Br(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Kh(this.writes_,t,r)}}getChildAfterChild(t,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:xi(this.viewCache_),o=KD(this.writes_,i,n,1,r,t);return o.length===0?null:o[0]}}/**
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
 */function QD(e){return{filter:e}}function JD(e,t){B(t.eventCache.getNode().isIndexed(e.filter.getIndex()),"Event snap not indexed"),B(t.serverCache.getNode().isIndexed(e.filter.getIndex()),"Server snap not indexed")}function XD(e,t,n,r,i){const o=new GD;let s,a;if(n.type===gn.OVERWRITE){const u=n;u.source.fromUser?s=Kf(e,t,u.path,u.snap,r,i,o):(B(u.source.fromServer,"Unknown source."),a=u.source.tagged||t.serverCache.isFiltered()&&!ue(u.path),s=pu(e,t,u.path,u.snap,r,i,a,o))}else if(n.type===gn.MERGE){const u=n;u.source.fromUser?s=eO(e,t,u.path,u.children,r,i,o):(B(u.source.fromServer,"Unknown source."),a=u.source.tagged||t.serverCache.isFiltered(),s=Gf(e,t,u.path,u.children,r,i,a,o))}else if(n.type===gn.ACK_USER_WRITE){const u=n;u.revert?s=rO(e,t,u.path,r,i,o):s=tO(e,t,u.path,u.affectedTree,r,i,o)}else if(n.type===gn.LISTEN_COMPLETE)s=nO(e,t,n.path,r,o);else throw bo("Unknown operation type: "+n.type);const l=o.getChanges();return ZD(t,s,l),{viewCache:s,changes:l}}function ZD(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=cu(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(Fk(cu(t)))}}function Gk(e,t,n,r,i,o){const s=t.eventCache;if(fu(r,n)!=null)return t;{let a,l;if(ue(n))if(B(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const u=xi(t),d=u instanceof J?u:J.EMPTY_NODE,c=qh(r,d);a=e.filter.updateFullNode(t.eventCache.getNode(),c,o)}else{const u=du(r,xi(t));a=e.filter.updateFullNode(t.eventCache.getNode(),u,o)}else{const u=ae(n);if(u===".priority"){B(zr(n)===1,"Can't have a priority with additional path components");const d=s.getNode();l=t.serverCache.getNode();const c=dv(r,n,d,l);c!=null?a=e.filter.updatePriority(d,c):a=s.getNode()}else{const d=Pe(n);let c;if(s.isCompleteForChild(u)){l=t.serverCache.getNode();const f=dv(r,n,s.getNode(),l);f!=null?c=s.getNode().getImmediateChild(u).updateChild(d,f):c=s.getNode().getImmediateChild(u)}else c=Kh(r,u,t.serverCache);c!=null?a=e.filter.updateChild(s.getNode(),u,c,d,i,o):a=s.getNode()}}return us(t,a,s.isFullyInitialized()||ue(n),e.filter.filtersNodes())}}function pu(e,t,n,r,i,o,s,a){const l=t.serverCache;let u;const d=s?e.filter:e.filter.getIndexedFilter();if(ue(n))u=d.updateFullNode(l.getNode(),r,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,r);u=d.updateFullNode(l.getNode(),p,null)}else{const p=ae(n);if(!l.isCompleteForPath(n)&&zr(n)>1)return t;const m=Pe(n),C=l.getNode().getImmediateChild(p).updateChild(m,r);p===".priority"?u=d.updatePriority(l.getNode(),C):u=d.updateChild(l.getNode(),p,C,m,Kk,null)}const c=Bk(t,u,l.isFullyInitialized()||ue(n),d.filtersNodes()),f=new Gh(i,c,o);return Gk(e,c,n,i,f,a)}function Kf(e,t,n,r,i,o,s){const a=t.eventCache;let l,u;const d=new Gh(i,t,o);if(ue(n))u=e.filter.updateFullNode(t.eventCache.getNode(),r,s),l=us(t,u,!0,e.filter.filtersNodes());else{const c=ae(n);if(c===".priority")u=e.filter.updatePriority(t.eventCache.getNode(),r),l=us(t,u,a.isFullyInitialized(),a.isFiltered());else{const f=Pe(n),p=a.getNode().getImmediateChild(c);let m;if(ue(f))m=r;else{const w=d.getCompleteChild(c);w!=null?Tk(f)===".priority"&&w.getChild(Nk(f)).isEmpty()?m=w:m=w.updateChild(f,r):m=J.EMPTY_NODE}if(p.equals(m))l=t;else{const w=e.filter.updateChild(a.getNode(),c,m,f,d,s);l=us(t,w,a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function fv(e,t){return e.eventCache.isCompleteForChild(t)}function eO(e,t,n,r,i,o,s){let a=t;return r.foreach((l,u)=>{const d=rt(n,l);fv(t,ae(d))&&(a=Kf(e,a,d,u,i,o,s))}),r.foreach((l,u)=>{const d=rt(n,l);fv(t,ae(d))||(a=Kf(e,a,d,u,i,o,s))}),a}function pv(e,t,n){return n.foreach((r,i)=>{t=t.updateChild(r,i)}),t}function Gf(e,t,n,r,i,o,s,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l=t,u;ue(n)?u=r:u=new Le(null).setTree(n,r);const d=t.serverCache.getNode();return u.children.inorderTraversal((c,f)=>{if(d.hasChild(c)){const p=t.serverCache.getNode().getImmediateChild(c),m=pv(e,p,f);l=pu(e,l,new Te(c),m,i,o,s,a)}}),u.children.inorderTraversal((c,f)=>{const p=!t.serverCache.isCompleteForChild(c)&&f.value===null;if(!d.hasChild(c)&&!p){const m=t.serverCache.getNode().getImmediateChild(c),w=pv(e,m,f);l=pu(e,l,new Te(c),w,i,o,s,a)}}),l}function tO(e,t,n,r,i,o,s){if(fu(i,n)!=null)return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(r.value!=null){if(ue(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return pu(e,t,n,l.getNode().getChild(n),i,o,a,s);if(ue(n)){let u=new Le(null);return l.getNode().forEachChild(ro,(d,c)=>{u=u.set(new Te(d),c)}),Gf(e,t,n,u,i,o,a,s)}else return t}else{let u=new Le(null);return r.foreach((d,c)=>{const f=rt(n,d);l.isCompleteForPath(f)&&(u=u.set(d,l.getNode().getChild(f)))}),Gf(e,t,n,u,i,o,a,s)}}function nO(e,t,n,r,i){const o=t.serverCache,s=Bk(t,o.getNode(),o.isFullyInitialized()||ue(n),o.isFiltered());return Gk(e,s,n,r,Kk,i)}function rO(e,t,n,r,i,o){let s;if(fu(r,n)!=null)return t;{const a=new Gh(r,t,i),l=t.eventCache.getNode();let u;if(ue(n)||ae(n)===".priority"){let d;if(t.serverCache.isFullyInitialized())d=du(r,xi(t));else{const c=t.serverCache.getNode();B(c instanceof J,"serverChildren would be complete if leaf node"),d=qh(r,c)}d=d,u=e.filter.updateFullNode(l,d,o)}else{const d=ae(n);let c=Kh(r,d,t.serverCache);c==null&&t.serverCache.isCompleteForChild(d)&&(c=l.getImmediateChild(d)),c!=null?u=e.filter.updateChild(l,d,c,Pe(n),a,o):t.eventCache.getNode().hasChild(d)?u=e.filter.updateChild(l,d,J.EMPTY_NODE,Pe(n),a,o):u=l,u.isEmpty()&&t.serverCache.isFullyInitialized()&&(s=du(r,xi(t)),s.isLeafNode()&&(u=e.filter.updateFullNode(u,s,o)))}return s=t.serverCache.isFullyInitialized()||fu(r,ve())!=null,us(t,u,s,e.filter.filtersNodes())}}/**
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
 */class iO{constructor(t,n){this.query_=t,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Vh(r.getIndex()),o=kD(r);this.processor_=QD(o);const s=n.serverCache,a=n.eventCache,l=i.updateFullNode(J.EMPTY_NODE,s.getNode(),null),u=o.updateFullNode(J.EMPTY_NODE,a.getNode(),null),d=new Br(l,s.isFullyInitialized(),i.filtersNodes()),c=new Br(u,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=Wu(c,d),this.eventGenerator_=new RD(this.query_)}get query(){return this.query_}}function oO(e){return e.viewCache_.serverCache.getNode()}function sO(e){return cu(e.viewCache_)}function aO(e,t){const n=xi(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!ue(t)&&!n.getImmediateChild(ae(t)).isEmpty())?n.getChild(t):null}function hv(e){return e.eventRegistrations_.length===0}function lO(e,t){e.eventRegistrations_.push(t)}function mv(e,t,n){const r=[];if(n){B(t==null,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach(o=>{const s=o.createCancelEvent(n,i);s&&r.push(s)})}if(t){let i=[];for(let o=0;o<e.eventRegistrations_.length;++o){const s=e.eventRegistrations_[o];if(!s.matches(t))i.push(s);else if(t.hasAnyCallback()){i=i.concat(e.eventRegistrations_.slice(o+1));break}}e.eventRegistrations_=i}else e.eventRegistrations_=[];return r}function gv(e,t,n,r){t.type===gn.MERGE&&t.source.queryId!==null&&(B(xi(e.viewCache_),"We should always have a full cache before handling merges"),B(cu(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=XD(e.processor_,i,t,n,r);return JD(e.processor_,o.viewCache),B(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,Yk(e,o.changes,o.viewCache.eventCache.getNode(),null)}function uO(e,t){const n=e.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Be,(o,s)=>{r.push(ho(o,s))}),n.isFullyInitialized()&&r.push(Fk(n.getNode())),Yk(e,r,n.getNode(),t)}function Yk(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return ND(e.eventGenerator_,t,n,i)}/**
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
 */let hu;class Qk{constructor(){this.views=new Map}}function cO(e){B(!hu,"__referenceConstructor has already been defined"),hu=e}function dO(){return B(hu,"Reference.ts has not been loaded"),hu}function fO(e){return e.views.size===0}function Yh(e,t,n,r){const i=t.source.queryId;if(i!==null){const o=e.views.get(i);return B(o!=null,"SyncTree gave us an op for an invalid query."),gv(o,t,n,r)}else{let o=[];for(const s of e.views.values())o=o.concat(gv(s,t,n,r));return o}}function Jk(e,t,n,r,i){const o=t._queryIdentifier,s=e.views.get(o);if(!s){let a=du(n,i?r:null),l=!1;a?l=!0:r instanceof J?(a=qh(n,r),l=!1):(a=J.EMPTY_NODE,l=!1);const u=Wu(new Br(a,l,!1),new Br(r,i,!1));return new iO(t,u)}return s}function pO(e,t,n,r,i,o){const s=Jk(e,t,r,i,o);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,s),lO(s,n),uO(s,n)}function hO(e,t,n,r){const i=t._queryIdentifier,o=[];let s=[];const a=Vr(e);if(i==="default")for(const[l,u]of e.views.entries())s=s.concat(mv(u,n,r)),hv(u)&&(e.views.delete(l),u.query._queryParams.loadsAllData()||o.push(u.query));else{const l=e.views.get(i);l&&(s=s.concat(mv(l,n,r)),hv(l)&&(e.views.delete(i),l.query._queryParams.loadsAllData()||o.push(l.query)))}return a&&!Vr(e)&&o.push(new(dO())(t._repo,t._path)),{removed:o,events:s}}function Xk(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Mr(e,t){let n=null;for(const r of e.views.values())n=n||aO(r,t);return n}function Zk(e,t){if(t._queryParams.loadsAllData())return Ku(e);{const r=t._queryIdentifier;return e.views.get(r)}}function eS(e,t){return Zk(e,t)!=null}function Vr(e){return Ku(e)!=null}function Ku(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}/**
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
 */let mu;function mO(e){B(!mu,"__referenceConstructor has already been defined"),mu=e}function gO(){return B(mu,"Reference.ts has not been loaded"),mu}let yO=1;class yv{constructor(t){this.listenProvider_=t,this.syncPointTree_=new Le(null),this.pendingWriteTree_=qD(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Qh(e,t,n,r,i){return LD(e.pendingWriteTree_,t,n,r,i),i?pa(e,new bi(zk(),t,n)):[]}function si(e,t,n=!1){const r=MD(e.pendingWriteTree_,t);if(jD(e.pendingWriteTree_,t)){let o=new Le(null);return r.snap!=null?o=o.set(ve(),!0):Bt(r.children,s=>{o=o.set(new Te(s),!0)}),pa(e,new uu(r.path,o,n))}else return[]}function fa(e,t,n){return pa(e,new bi(Hh(),t,n))}function vO(e,t,n){const r=Le.fromObject(n);return pa(e,new Vs(Hh(),t,r))}function wO(e,t){return pa(e,new Bs(Hh(),t))}function _O(e,t,n){const r=Jh(e,n);if(r){const i=Xh(r),o=i.path,s=i.queryId,a=Et(o,t),l=new Bs(Wh(s),a);return Zh(e,o,l)}else return[]}function gu(e,t,n,r,i=!1){const o=t._path,s=e.syncPointTree_.get(o);let a=[];if(s&&(t._queryIdentifier==="default"||eS(s,t))){const l=hO(s,t,n,r);fO(s)&&(e.syncPointTree_=e.syncPointTree_.remove(o));const u=l.removed;if(a=l.events,!i){const d=u.findIndex(f=>f._queryParams.loadsAllData())!==-1,c=e.syncPointTree_.findOnPath(o,(f,p)=>Vr(p));if(d&&!c){const f=e.syncPointTree_.subtree(o);if(!f.isEmpty()){const p=kO(f);for(let m=0;m<p.length;++m){const w=p[m],C=w.query,y=iS(e,w);e.listenProvider_.startListening(ds(C),$s(e,C),y.hashFn,y.onComplete)}}}!c&&u.length>0&&!r&&(d?e.listenProvider_.stopListening(ds(t),null):u.forEach(f=>{const p=e.queryToTagMap.get(Yu(f));e.listenProvider_.stopListening(ds(f),p)}))}SO(e,u)}return a}function tS(e,t,n,r){const i=Jh(e,r);if(i!=null){const o=Xh(i),s=o.path,a=o.queryId,l=Et(s,t),u=new bi(Wh(a),l,n);return Zh(e,s,u)}else return[]}function bO(e,t,n,r){const i=Jh(e,r);if(i){const o=Xh(i),s=o.path,a=o.queryId,l=Et(s,t),u=Le.fromObject(n),d=new Vs(Wh(a),l,u);return Zh(e,s,d)}else return[]}function Yf(e,t,n,r=!1){const i=t._path;let o=null,s=!1;e.syncPointTree_.foreachOnPath(i,(f,p)=>{const m=Et(f,i);o=o||Mr(p,m),s=s||Vr(p)});let a=e.syncPointTree_.get(i);a?(s=s||Vr(a),o=o||Mr(a,ve())):(a=new Qk,e.syncPointTree_=e.syncPointTree_.set(i,a));let l;o!=null?l=!0:(l=!1,o=J.EMPTY_NODE,e.syncPointTree_.subtree(i).foreachChild((p,m)=>{const w=Mr(m,ve());w&&(o=o.updateImmediateChild(p,w))}));const u=eS(a,t);if(!u&&!t._queryParams.loadsAllData()){const f=Yu(t);B(!e.queryToTagMap.has(f),"View does not exist, but we have a tag");const p=IO();e.queryToTagMap.set(f,p),e.tagToQueryMap.set(p,f)}const d=qu(e.pendingWriteTree_,i);let c=pO(a,t,n,d,o,l);if(!u&&!s&&!r){const f=Zk(a,t);c=c.concat(EO(e,t,f))}return c}function Gu(e,t,n){const i=e.pendingWriteTree_,o=e.syncPointTree_.findOnPath(t,(s,a)=>{const l=Et(s,t),u=Mr(a,l);if(u)return u});return Hk(i,t,o,n,!0)}function xO(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,(u,d)=>{const c=Et(u,n);r=r||Mr(d,c)});let i=e.syncPointTree_.get(n);i?r=r||Mr(i,ve()):(i=new Qk,e.syncPointTree_=e.syncPointTree_.set(n,i));const o=r!=null,s=o?new Br(r,!0,!1):null,a=qu(e.pendingWriteTree_,t._path),l=Jk(i,t,a,o?s.getNode():J.EMPTY_NODE,o);return sO(l)}function pa(e,t){return nS(t,e.syncPointTree_,null,qu(e.pendingWriteTree_,ve()))}function nS(e,t,n,r){if(ue(e.path))return rS(e,t,n,r);{const i=t.get(ve());n==null&&i!=null&&(n=Mr(i,ve()));let o=[];const s=ae(e.path),a=e.operationForChild(s),l=t.children.get(s);if(l&&a){const u=n?n.getImmediateChild(s):null,d=Wk(r,s);o=o.concat(nS(a,l,u,d))}return i&&(o=o.concat(Yh(i,e,r,n))),o}}function rS(e,t,n,r){const i=t.get(ve());n==null&&i!=null&&(n=Mr(i,ve()));let o=[];return t.children.inorderTraversal((s,a)=>{const l=n?n.getImmediateChild(s):null,u=Wk(r,s),d=e.operationForChild(s);d&&(o=o.concat(rS(d,a,l,u)))}),i&&(o=o.concat(Yh(i,e,r,n))),o}function iS(e,t){const n=t.query,r=$s(e,n);return{hashFn:()=>(oO(t)||J.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?_O(e,n._path,r):wO(e,n._path);{const o=xP(i,n);return gu(e,n,null,o)}}}}function $s(e,t){const n=Yu(t);return e.queryToTagMap.get(n)}function Yu(e){return e._path.toString()+"$"+e._queryIdentifier}function Jh(e,t){return e.tagToQueryMap.get(t)}function Xh(e){const t=e.indexOf("$");return B(t!==-1&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new Te(e.substr(0,t))}}function Zh(e,t,n){const r=e.syncPointTree_.get(t);B(r,"Missing sync point for query tag that we're tracking");const i=qu(e.pendingWriteTree_,t);return Yh(r,n,i,null)}function kO(e){return e.fold((t,n,r)=>{if(n&&Vr(n))return[Ku(n)];{let i=[];return n&&(i=Xk(n)),Bt(r,(o,s)=>{i=i.concat(s)}),i}})}function ds(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(gO())(e._repo,e._path):e}function SO(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const i=Yu(r),o=e.queryToTagMap.get(i);e.queryToTagMap.delete(i),e.tagToQueryMap.delete(o)}}}function IO(){return yO++}function EO(e,t,n){const r=t._path,i=$s(e,t),o=iS(e,n),s=e.listenProvider_.startListening(ds(t),i,o.hashFn,o.onComplete),a=e.syncPointTree_.subtree(r);if(i)B(!Vr(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((u,d,c)=>{if(!ue(u)&&d&&Vr(d))return[Ku(d).query];{let f=[];return d&&(f=f.concat(Xk(d).map(p=>p.query))),Bt(c,(p,m)=>{f=f.concat(m)}),f}});for(let u=0;u<l.length;++u){const d=l[u];e.listenProvider_.stopListening(ds(d),$s(e,d))}}return s}/**
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
 */class em{constructor(t){this.node_=t}getImmediateChild(t){const n=this.node_.getImmediateChild(t);return new em(n)}node(){return this.node_}}class tm{constructor(t,n){this.syncTree_=t,this.path_=n}getImmediateChild(t){const n=rt(this.path_,t);return new tm(this.syncTree_,n)}node(){return Gu(this.syncTree_,this.path_)}}const CO=function(e){return e=e||{},e.timestamp=e.timestamp||new Date().getTime(),e},vv=function(e,t,n){if(!e||typeof e!="object")return e;if(B(".sv"in e,"Unexpected leaf node or priority contents"),typeof e[".sv"]=="string")return AO(e[".sv"],t,n);if(typeof e[".sv"]=="object")return TO(e[".sv"],t);B(!1,"Unexpected server value: "+JSON.stringify(e,null,2))},AO=function(e,t,n){switch(e){case"timestamp":return n.timestamp;default:B(!1,"Unexpected server value: "+e)}},TO=function(e,t,n){e.hasOwnProperty("increment")||B(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;typeof r!="number"&&B(!1,"Unexpected increment value: "+r);const i=t.node();if(B(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const s=i.getValue();return typeof s!="number"?r:s+r},RO=function(e,t,n,r){return rm(t,new tm(n,e),r)},nm=function(e,t,n){return rm(e,new em(t),n)};function rm(e,t,n){const r=e.getPriority().val(),i=vv(r,t.getImmediateChild(".priority"),n);let o;if(e.isLeafNode()){const s=e,a=vv(s.getValue(),t,n);return a!==s.getValue()||i!==s.getPriority().val()?new st(a,tt(i)):e}else{const s=e;return o=s,i!==s.getPriority().val()&&(o=o.updatePriority(new st(i))),s.forEachChild(Be,(a,l)=>{const u=rm(l,t.getImmediateChild(a),n);u!==l&&(o=o.updateImmediateChild(a,u))}),o}}/**
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
 */class im{constructor(t="",n=null,r={children:{},childCount:0}){this.name=t,this.parent=n,this.node=r}}function Qu(e,t){let n=t instanceof Te?t:new Te(t),r=e,i=ae(n);for(;i!==null;){const o=yi(r.node.children,i)||{children:{},childCount:0};r=new im(i,r,o),n=Pe(n),i=ae(n)}return r}function Ci(e){return e.node.value}function om(e,t){e.node.value=t,Qf(e)}function oS(e){return e.node.childCount>0}function NO(e){return Ci(e)===void 0&&!oS(e)}function Ju(e,t){Bt(e.node.children,(n,r)=>{t(new im(n,e,r))})}function sS(e,t,n,r){n&&t(e),Ju(e,i=>{sS(i,t,!0)})}function PO(e,t,n){let r=e.parent;for(;r!==null;){if(t(r))return!0;r=r.parent}return!1}function ha(e){return new Te(e.parent===null?e.name:ha(e.parent)+"/"+e.name)}function Qf(e){e.parent!==null&&DO(e.parent,e.name,e)}function DO(e,t,n){const r=NO(n),i=kn(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Qf(e)):!r&&!i&&(e.node.children[t]=n.node,e.node.childCount++,Qf(e))}/**
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
 */const OO=/[\[\].#$\/\u0000-\u001F\u007F]/,LO=/[\[\].#$\u0000-\u001F\u007F]/,sd=10*1024*1024,aS=function(e){return typeof e=="string"&&e.length!==0&&!OO.test(e)},lS=function(e){return typeof e=="string"&&e.length!==0&&!LO.test(e)},MO=function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),lS(e)},jO=function(e){return e===null||typeof e=="string"||typeof e=="number"&&!Oh(e)||e&&typeof e=="object"&&kn(e,".sv")},FO=function(e,t,n,r){Xu(xh(e,"value"),t,n)},Xu=function(e,t,n){const r=n instanceof Te?new tD(n,e):n;if(t===void 0)throw new Error(e+"contains undefined "+Xr(r));if(typeof t=="function")throw new Error(e+"contains a function "+Xr(r)+" with contents = "+t.toString());if(Oh(t))throw new Error(e+"contains "+t.toString()+" "+Xr(r));if(typeof t=="string"&&t.length>sd/3&&Uu(t)>sd)throw new Error(e+"contains a string greater than "+sd+" utf8 bytes "+Xr(r)+" ('"+t.substring(0,50)+"...')");if(t&&typeof t=="object"){let i=!1,o=!1;if(Bt(t,(s,a)=>{if(s===".value")i=!0;else if(s!==".priority"&&s!==".sv"&&(o=!0,!aS(s)))throw new Error(e+" contains an invalid key ("+s+") "+Xr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);nD(r,s),Xu(e,a,r),rD(r)}),i&&o)throw new Error(e+' contains ".value" child '+Xr(r)+" in addition to actual children.")}},uS=function(e,t,n,r){if(!lS(n))throw new Error(xh(e,t)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},UO=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),uS(e,t,n)},sm=function(e,t){if(ae(t)===".info")throw new Error(e+" failed = Can't modify data under /.info/")},zO=function(e,t){const n=t.path.toString();if(typeof t.repoInfo.host!="string"||t.repoInfo.host.length===0||!aS(t.repoInfo.namespace)&&t.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!MO(n))throw new Error(xh(e,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class BO{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function am(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],o=i.getPath();n!==null&&!Uh(o,n.path)&&(e.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(i)}n&&e.eventLists_.push(n)}function cS(e,t,n){am(e,n),dS(e,r=>Uh(r,t))}function xn(e,t,n){am(e,n),dS(e,r=>mn(r,t)||mn(t,r))}function dS(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){const o=i.path;t(o)?(VO(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function VO(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(n!==null){e.events[t]=null;const r=n.getEventRunner();as&&_t("event: "+n.toString()),Eo(r)}}}/**
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
 */const $O="repo_interrupt",HO=25;class WO{constructor(t,n,r,i){this.repoInfo_=t,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new BO,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=lu(),this.transactionQueueTree_=new im,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function qO(e,t,n){if(e.stats_=jh(e.repoInfo_),e.forceRestClient_||EP())e.server_=new au(e.repoInfo_,(r,i,o,s)=>{wv(e,r,i,o,s)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>_v(e,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{nt(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Qn(e.repoInfo_,t,(r,i,o,s)=>{wv(e,r,i,o,s)},r=>{_v(e,r)},r=>{GO(e,r)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(r=>{e.server_.refreshAuthToken(r)}),e.appCheckProvider_.addTokenChangeListener(r=>{e.server_.refreshAppCheckToken(r.token)}),e.statsReporter_=NP(e.repoInfo_,()=>new TD(e.stats_,e.server_)),e.infoData_=new SD,e.infoSyncTree_=new yv({startListening:(r,i,o,s)=>{let a=[];const l=e.infoData_.getNode(r._path);return l.isEmpty()||(a=fa(e.infoSyncTree_,r._path,l),setTimeout(()=>{s("ok")},0)),a},stopListening:()=>{}}),lm(e,"connected",!1),e.serverSyncTree_=new yv({startListening:(r,i,o,s)=>(e.server_.listen(r,o,i,(a,l)=>{const u=s(a,l);xn(e.eventQueue_,r._path,u)}),[]),stopListening:(r,i)=>{e.server_.unlisten(r,i)}})}function KO(e){const n=e.infoData_.getNode(new Te(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Zu(e){return CO({timestamp:KO(e)})}function wv(e,t,n,r,i){e.dataUpdateCount++;const o=new Te(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let s=[];if(i)if(r){const l=Jl(n,u=>tt(u));s=bO(e.serverSyncTree_,o,l,i)}else{const l=tt(n);s=tS(e.serverSyncTree_,o,l,i)}else if(r){const l=Jl(n,u=>tt(u));s=vO(e.serverSyncTree_,o,l)}else{const l=tt(n);s=fa(e.serverSyncTree_,o,l)}let a=o;s.length>0&&(a=tc(e,o)),xn(e.eventQueue_,a,s)}function _v(e,t){lm(e,"connected",t),t===!1&&JO(e)}function GO(e,t){Bt(t,(n,r)=>{lm(e,n,r)})}function lm(e,t,n){const r=new Te("/.info/"+t),i=tt(n);e.infoData_.updateSnapshot(r,i);const o=fa(e.infoSyncTree_,r,i);xn(e.eventQueue_,r,o)}function um(e){return e.nextWriteId_++}function YO(e,t,n){const r=xO(e.serverSyncTree_,t);return r!=null?Promise.resolve(r):e.server_.get(t).then(i=>{const o=tt(i).withIndex(t._queryParams.getIndex());Yf(e.serverSyncTree_,t,n,!0);let s;if(t._queryParams.loadsAllData())s=fa(e.serverSyncTree_,t._path,o);else{const a=$s(e.serverSyncTree_,t);s=tS(e.serverSyncTree_,t._path,o,a)}return xn(e.eventQueue_,t._path,s),gu(e.serverSyncTree_,t,n,null,!0),o},i=>(ma(e,"get for query "+nt(t)+" failed: "+i),Promise.reject(new Error(i))))}function QO(e,t,n,r,i){ma(e,"set",{path:t.toString(),value:n,priority:r});const o=Zu(e),s=tt(n,r),a=Gu(e.serverSyncTree_,t),l=nm(s,a,o),u=um(e),d=Qh(e.serverSyncTree_,t,l,u,!0);am(e.eventQueue_,d),e.server_.put(t.toString(),s.val(!0),(f,p)=>{const m=f==="ok";m||zt("set at "+t+" failed: "+f);const w=si(e.serverSyncTree_,u,!m);xn(e.eventQueue_,t,w),tL(e,i,f,p)});const c=mS(e,t);tc(e,c),xn(e.eventQueue_,c,[])}function JO(e){ma(e,"onDisconnectEvents");const t=Zu(e),n=lu();Hf(e.onDisconnect_,ve(),(i,o)=>{const s=RO(i,o,e.serverSyncTree_,t);Uk(n,i,s)});let r=[];Hf(n,ve(),(i,o)=>{r=r.concat(fa(e.serverSyncTree_,i,o));const s=mS(e,i);tc(e,s)}),e.onDisconnect_=lu(),xn(e.eventQueue_,ve(),r)}function XO(e,t,n){let r;ae(t._path)===".info"?r=Yf(e.infoSyncTree_,t,n):r=Yf(e.serverSyncTree_,t,n),cS(e.eventQueue_,t._path,r)}function ZO(e,t,n){let r;ae(t._path)===".info"?r=gu(e.infoSyncTree_,t,n):r=gu(e.serverSyncTree_,t,n),cS(e.eventQueue_,t._path,r)}function eL(e){e.persistentConnection_&&e.persistentConnection_.interrupt($O)}function ma(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),_t(n,...t)}function tL(e,t,n,r){t&&Eo(()=>{if(n==="ok")t(null);else{const i=(n||"error").toUpperCase();let o=i;r&&(o+=": "+r);const s=new Error(o);s.code=i,t(s)}})}function nL(e,t,n,r,i,o){ma(e,"transaction on "+t);const s={path:t,update:n,onComplete:r,status:null,order:ak(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=cm(e,t,void 0);s.currentInputSnapshot=a;const l=s.update(a.val());if(l===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{Xu("transaction failed: Data returned ",l,s.path),s.status=0;const u=Qu(e.transactionQueueTree_,t),d=Ci(u)||[];d.push(s),om(u,d);let c;typeof l=="object"&&l!==null&&kn(l,".priority")?(c=yi(l,".priority"),B(jO(c),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):c=(Gu(e.serverSyncTree_,t)||J.EMPTY_NODE).getPriority().val();const f=Zu(e),p=tt(l,c),m=nm(p,a,f);s.currentOutputSnapshotRaw=p,s.currentOutputSnapshotResolved=m,s.currentWriteId=um(e);const w=Qh(e.serverSyncTree_,t,m,s.currentWriteId,s.applyLocally);xn(e.eventQueue_,t,w),ec(e,e.transactionQueueTree_)}}function cm(e,t,n){return Gu(e.serverSyncTree_,t,n)||J.EMPTY_NODE}function ec(e,t=e.transactionQueueTree_){if(t||nc(e,t),Ci(t)){const n=pS(e,t);B(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&rL(e,ha(t),n)}else oS(t)&&Ju(t,n=>{ec(e,n)})}function rL(e,t,n){const r=n.map(u=>u.currentWriteId),i=cm(e,t,r);let o=i;const s=i.hash();for(let u=0;u<n.length;u++){const d=n[u];B(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const c=Et(t,d.path);o=o.updateChild(c,d.currentOutputSnapshotRaw)}const a=o.val(!0),l=t;e.server_.put(l.toString(),a,u=>{ma(e,"transaction put response",{path:l.toString(),status:u});let d=[];if(u==="ok"){const c=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(si(e.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&c.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();nc(e,Qu(e.transactionQueueTree_,t)),ec(e,e.transactionQueueTree_),xn(e.eventQueue_,t,d);for(let f=0;f<c.length;f++)Eo(c[f])}else{if(u==="datastale")for(let c=0;c<n.length;c++)n[c].status===3?n[c].status=4:n[c].status=0;else{zt("transaction at "+l.toString()+" failed: "+u);for(let c=0;c<n.length;c++)n[c].status=4,n[c].abortReason=u}tc(e,t)}},s)}function tc(e,t){const n=fS(e,t),r=ha(n),i=pS(e,n);return iL(e,i,r),r}function iL(e,t,n){if(t.length===0)return;const r=[];let i=[];const s=t.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<t.length;a++){const l=t[a],u=Et(n,l.path);let d=!1,c;if(B(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,c=l.abortReason,i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=HO)d=!0,c="maxretry",i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0));else{const f=cm(e,l.path,s);l.currentInputSnapshot=f;const p=t[a].update(f.val());if(p!==void 0){Xu("transaction failed: Data returned ",p,l.path);let m=tt(p);typeof p=="object"&&p!=null&&kn(p,".priority")||(m=m.updatePriority(f.getPriority()));const C=l.currentWriteId,y=Zu(e),v=nm(m,f,y);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=v,l.currentWriteId=um(e),s.splice(s.indexOf(C),1),i=i.concat(Qh(e.serverSyncTree_,l.path,v,l.currentWriteId,l.applyLocally)),i=i.concat(si(e.serverSyncTree_,C,!0))}else d=!0,c="nodata",i=i.concat(si(e.serverSyncTree_,l.currentWriteId,!0))}xn(e.eventQueue_,n,i),i=[],d&&(t[a].status=2,function(f){setTimeout(f,Math.floor(0))}(t[a].unwatcher),t[a].onComplete&&(c==="nodata"?r.push(()=>t[a].onComplete(null,!1,t[a].currentInputSnapshot)):r.push(()=>t[a].onComplete(new Error(c),!1,null))))}nc(e,e.transactionQueueTree_);for(let a=0;a<r.length;a++)Eo(r[a]);ec(e,e.transactionQueueTree_)}function fS(e,t){let n,r=e.transactionQueueTree_;for(n=ae(t);n!==null&&Ci(r)===void 0;)r=Qu(r,n),t=Pe(t),n=ae(t);return r}function pS(e,t){const n=[];return hS(e,t,n),n.sort((r,i)=>r.order-i.order),n}function hS(e,t,n){const r=Ci(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Ju(t,i=>{hS(e,i,n)})}function nc(e,t){const n=Ci(t);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,om(t,n.length>0?n:void 0)}Ju(t,r=>{nc(e,r)})}function mS(e,t){const n=ha(fS(e,t)),r=Qu(e.transactionQueueTree_,t);return PO(r,i=>{ad(e,i)}),ad(e,r),sS(r,i=>{ad(e,i)}),n}function ad(e,t){const n=Ci(t);if(n){const r=[];let i=[],o=-1;for(let s=0;s<n.length;s++)n[s].status===3||(n[s].status===1?(B(o===s-1,"All SENT items should be at beginning of queue."),o=s,n[s].status=3,n[s].abortReason="set"):(B(n[s].status===0,"Unexpected transaction status in abort"),n[s].unwatcher(),i=i.concat(si(e.serverSyncTree_,n[s].currentWriteId,!0)),n[s].onComplete&&r.push(n[s].onComplete.bind(null,new Error("set"),!1,null))));o===-1?om(t,void 0):n.length=o+1,xn(e.eventQueue_,ha(t),i);for(let s=0;s<r.length;s++)Eo(r[s])}}/**
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
 */function oL(e){let t="";const n=e.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}t+="/"+i}return t}function sL(e){const t={};e.charAt(0)==="?"&&(e=e.substring(1));for(const n of e.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):zt(`Invalid query segment '${n}' in query '${e}'`)}return t}const bv=function(e,t){const n=aL(e),r=n.namespace;n.domain==="firebase.com"&&ir(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&ir("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||yP();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new _k(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new Te(n.pathString)}},aL=function(e){let t="",n="",r="",i="",o="",s=!0,a="https",l=443;if(typeof e=="string"){let u=e.indexOf("//");u>=0&&(a=e.substring(0,u-1),e=e.substring(u+2));let d=e.indexOf("/");d===-1&&(d=e.length);let c=e.indexOf("?");c===-1&&(c=e.length),t=e.substring(0,Math.min(d,c)),d<c&&(i=oL(e.substring(d,c)));const f=sL(e.substring(Math.min(e.length,c)));u=t.indexOf(":"),u>=0?(s=a==="https"||a==="wss",l=parseInt(t.substring(u+1),10)):u=t.length;const p=t.slice(0,u);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const m=t.indexOf(".");r=t.substring(0,m).toLowerCase(),n=t.substring(m+1),o=r}"ns"in f&&(o=f.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}};/**
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
 */class lL{constructor(t,n,r,i){this.eventType=t,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const t=this.snapshot.ref;return this.eventType==="value"?t._path:t.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+nt(this.snapshot.exportVal())}}class uL{constructor(t,n,r){this.eventRegistration=t,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class gS{constructor(t,n){this.snapshotCallback=t,this.cancelCallback=n}onValue(t,n){this.snapshotCallback.call(null,t,n)}onCancel(t){return B(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,t)}get hasCancelCallback(){return!!this.cancelCallback}matches(t){return this.snapshotCallback===t.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===t.snapshotCallback.userCallback&&this.snapshotCallback.context===t.snapshotCallback.context}}/**
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
 */class dm{constructor(t,n,r,i){this._repo=t,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return ue(this._path)?null:Tk(this._path)}get ref(){return new jn(this._repo,this._path)}get _queryIdentifier(){const t=sv(this._queryParams),n=Lh(t);return n==="{}"?"default":n}get _queryObject(){return sv(this._queryParams)}isEqual(t){if(t=Zt(t),!(t instanceof dm))return!1;const n=this._repo===t._repo,r=Uh(this._path,t._path),i=this._queryIdentifier===t._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+eD(this._path)}}class jn extends dm{constructor(t,n){super(t,n,new $h,!1)}get parent(){const t=Nk(this._path);return t===null?null:new jn(this._repo,t)}get root(){let t=this;for(;t.parent!==null;)t=t.parent;return t}}class go{constructor(t,n,r){this._node=t,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){const n=new Te(t),r=Jf(this.ref,t);return new go(this._node.getChild(n),r,Be)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>t(new go(i,Jf(this.ref,r),Be)))}hasChild(t){const n=new Te(t);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ga(e,t){return e=Zt(e),e._checkNotDeleted("ref"),t!==void 0?Jf(e._root,t):e._root}function Jf(e,t){return e=Zt(e),ae(e._path)===null?UO("child","path",t):uS("child","path",t),new jn(e._repo,rt(e._path,t))}function cL(e){return sm("remove",e._path),yl(e,null)}function yl(e,t){e=Zt(e),sm("set",e._path),FO("set",t,e._path);const n=new ia;return QO(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function xv(e){e=Zt(e);const t=new gS(()=>{}),n=new rc(t);return YO(e._repo,e,n).then(r=>new go(r,new jn(e._repo,e._path),e._queryParams.getIndex()))}class rc{constructor(t){this.callbackContext=t}respondsTo(t){return t==="value"}createEvent(t,n){const r=n._queryParams.getIndex();return new lL("value",this,new go(t.snapshotNode,new jn(n._repo,n._path),r))}getEventRunner(t){return t.getEventType()==="cancel"?()=>this.callbackContext.onCancel(t.error):()=>this.callbackContext.onValue(t.snapshot,null)}createCancelEvent(t,n){return this.callbackContext.hasCancelCallback?new uL(this,t,n):null}matches(t){return t instanceof rc?!t.callbackContext||!this.callbackContext?!0:t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function dL(e,t,n,r,i){const o=new gS(n,void 0),s=new rc(o);return XO(e._repo,e,s),()=>ZO(e._repo,e,s)}function Xf(e,t,n,r){return dL(e,"value",t)}cO(jn);mO(jn);/**
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
 */const fL="FIREBASE_DATABASE_EMULATOR_HOST",Zf={};let pL=!1;function hL(e,t,n,r){e.repoInfo_=new _k(`${t}:${n}`,!1,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0),r&&(e.authTokenProvider_=r)}function mL(e,t,n,r,i){let o=r||e.options.databaseURL;o===void 0&&(e.options.projectId||ir("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),_t("Using default host for project ",e.options.projectId),o=`${e.options.projectId}-default-rtdb.firebaseio.com`);let s=bv(o,i),a=s.repoInfo,l;typeof process<"u"&&Vy&&(l=Vy[fL]),l?(o=`http://${l}?ns=${a.namespace}`,s=bv(o,i),a=s.repoInfo):s.repoInfo.secure;const u=new AP(e.name,e.options,t);zO("Invalid Firebase Database URL",s),ue(s.path)||ir("Database URL must point to the root of a Firebase Database (not including a child path).");const d=yL(a,e,u,new CP(e.name,n));return new vL(d,e)}function gL(e,t){const n=Zf[t];(!n||n[e.key]!==e)&&ir(`Database ${t}(${e.repoInfo_}) has already been deleted.`),eL(e),delete n[e.key]}function yL(e,t,n,r){let i=Zf[t.name];i||(i={},Zf[t.name]=i);let o=i[e.toURLString()];return o&&ir("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new WO(e,pL,n,r),i[e.toURLString()]=o,o}class vL{constructor(t,n){this._repoInternal=t,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(qO(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new jn(this._repo,ve())),this._rootInternal}_delete(){return this._rootInternal!==null&&(gL(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(t){this._rootInternal===null&&ir("Cannot call "+t+" on a deleted database.")}}function wL(e=kx(),t){const n=Ih(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const r=zT("database");r&&_L(n,...r)}return n}function _L(e,t,n,r={}){e=Zt(e),e._checkNotDeleted("useEmulator"),e._instanceStarted&&ir("Cannot call useEmulator() after instance has already been initialized.");const i=e._repoInternal;let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&ir('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new gl(gl.OWNER);else if(r.mockUserToken){const s=typeof r.mockUserToken=="string"?r.mockUserToken:BT(r.mockUserToken,e.app.options.projectId);o=new gl(s)}hL(i,t,n,o)}/**
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
 */function bL(e){fP(ko),fo(new vi("database",(t,{instanceIdentifier:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return mL(r,i,o,n)},"PUBLIC").setMultipleInstances(!0)),Dr($y,Hy,e),Dr($y,Hy,"esm2017")}/**
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
 */class xL{constructor(t,n){this.committed=t,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function kv(e,t,n){var r;if(e=Zt(e),sm("Reference.transaction",e._path),e.key===".length"||e.key===".keys")throw"Reference.transaction failed: "+e.key+" is a read-only object.";const i=(r=void 0)!==null&&r!==void 0?r:!0,o=new ia,s=(l,u,d)=>{let c=null;l?o.reject(l):(c=new go(d,new jn(e._repo,e._path),Be),o.resolve(new xL(u,c)))},a=Xf(e,()=>{});return nL(e._repo,e._path,t,s,a,i),o.promise}Qn.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)};Qn.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};bL();const kL="appLabSyncRooms",SL="appLabOwners",IL="appLabRoomClaimTokens",EL="appLabRoomMembers",CL=new TextEncoder;function yS(e){async function t(l){const u={encryptedPayload:l.encryptedPayload,readTokenHash:await Ni(l.readToken),roomId:l.roomId,updatedAt:new Date().toISOString(),version:1,writeTokenHash:await Ni(l.writeToken)};if(!await e.driver.createRoom(u,{claimToken:l.writeToken}))throw new Error(`Room already exists: ${l.roomId}`);return Wa(u)}async function n(l){const u=await s(l.roomId,l.readToken);return Wa(u)}async function r(l){var f;const u=await a(l.roomId);if(u.writeTokenHash!==await Ni(l.writeToken))throw new Error("Write token is not authorized for this room.");if(u.version!==l.expectedVersion)throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${u.version}.`);const d={...u,encryptedPayload:l.encryptedPayload,updatedAt:new Date().toISOString(),version:u.version+1},c=await e.driver.saveRoom({expectedVersion:l.expectedVersion,nextRecord:d,roomId:l.roomId});if(!c.ok){const p=((f=c.currentRecord)==null?void 0:f.version)??"missing";throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${p}.`)}return Wa(c.currentRecord??d)}async function i(l){const u=await a(l.roomId),d=await Ni(l.writeToken);if(u.writeTokenHash!==d)throw new Error("Write token is not authorized for this room.");if(!(await e.driver.deleteRoom({roomId:l.roomId,writeTokenHash:d})).ok)throw new Error(`Room could not be deleted: ${l.roomId}`)}function o(l){let u=!1;const d=Ni(l.readToken),c=e.driver.subscribeRoom(l.roomId,f=>{u||!f||d.then(p=>{u||f.readTokenHash!==p||l.onChange(Wa(f))})});return()=>{u=!0,c()}}async function s(l,u){const d=await a(l);if(d.readTokenHash!==await Ni(u))throw new Error("Read token is not authorized for this room.");return d}async function a(l){const u=await e.driver.getRoom(l);if(!u)throw new Error(`Room not found: ${l}`);return u}return{claimRoomAccess:e.driver.claimRoomAccess,createRoom:t,deleteRoom:i,loadRoom:n,saveRoom:r,subscribeConnection:e.driver.subscribeConnection,subscribeRoom:o}}function vS(e,t={}){const n=t.accessModel??Xs,r=`app-lab-sync-${PL(`${n}:${e.databaseURL}`)}`,o=n1().find(l=>l.name===r)??xx(e,r),s=wL(o,e.databaseURL),a=cP(o);return AL(s,{auth:a,ownerSetupSecret:t.ownerSetupSecret})}function AL(e,t={}){const n=t.auth;let r=null;async function i(){if(!n)throw new Error("Firebase Auth is required for auth-v1 RTDB access.");return(n.currentUser??(await G1(n)).user).uid}async function o(){const a=await i();return t.ownerSetupSecret?(r??(r=yl(TL(e,a),{owner:!0,setupSecret:t.ownerSetupSecret}).then(()=>a,l=>{throw r=null,l})),r):a}async function s(){await o()}return{async claimRoomAccess(a){const l=await i();await yl(NL(e,a.roomId,l),{claimToken:a.claimToken,member:!0})},async createRoom(a,l){if(await o(),!(l!=null&&l.claimToken))throw new Error("Room claim token is required for auth-v1 RTDB access.");return await yl(RL(e,a.roomId),l.claimToken),(await kv(Vo(e,a.roomId),d=>{if(d===null)return a})).committed},async getRoom(a){await s();const l=await xv(Vo(e,a));return $o(l.val(),a)},async saveRoom(a){await s();let l=null,u=!1;const d=await kv(Vo(e,a.roomId),c=>{const f=$o(c,a.roomId);if(l=f,!f)return u?void 0:(u=!0,a.nextRecord);if(u=!0,f.version===a.expectedVersion)return l=a.nextRecord,a.nextRecord});return{currentRecord:$o(d.snapshot.val(),a.roomId)??l,ok:d.committed}},async deleteRoom(a){await s();const l=Vo(e,a.roomId),u=await xv(l),d=$o(u.val(),a.roomId);return!d||d.writeTokenHash!==a.writeTokenHash?{currentRecord:d,ok:!1}:(await cL(l),{currentRecord:null,ok:!0})},subscribeConnection(a){return s().catch(()=>{}),Xf(ga(e,".info/connected"),l=>{a(l.val()===!0)})},subscribeRoom(a,l){let u=!1,d=null;return s().then(()=>{u||(d=Xf(Vo(e,a),c=>{l($o(c.val(),a))}))}).catch(c=>{console.warn("Could not start Firebase room subscription.",c)}),()=>{u=!0,d==null||d()}}}}async function Ni(e){const t=await crypto.subtle.digest("SHA-256",CL.encode(e));return DL(new Uint8Array(t))}function Wa(e){return{encryptedPayload:e.encryptedPayload,roomId:e.roomId,updatedAt:e.updatedAt,version:e.version}}function Vo(e,t){return ga(e,`${kL}/${t}`)}function TL(e,t){return ga(e,`${SL}/${t}`)}function RL(e,t){return ga(e,`${IL}/${t}`)}function NL(e,t,n){return ga(e,`${EL}/${t}/${n}`)}function $o(e,t){if(e==null)return null;if(!e||typeof e!="object")throw new Error(`Firebase room is malformed: ${t}`);const n=e;if(n.roomId!==t||typeof n.encryptedPayload!="string"||typeof n.readTokenHash!="string"||typeof n.updatedAt!="string"||typeof n.version!="number"||typeof n.writeTokenHash!="string")throw new Error(`Firebase room is malformed: ${t}`);return{encryptedPayload:n.encryptedPayload,readTokenHash:n.readTokenHash,roomId:n.roomId,updatedAt:n.updatedAt,version:n.version,writeTokenHash:n.writeTokenHash}}function PL(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;return Math.abs(t).toString(36)}function DL(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function OL(e){const{core:t,queueStore:n,syncRegistry:r}=e,i=e.createProviderFromStorageProfile??ML,o=e.createProviderFromReference??jL;let s=!1,a=null,l=!1,u=null,d=!1,c=null,f=!1,p=null,m=!1,w=null;const C=new Map,y=new Map,v=new Map;async function g(){return await dA(n),{storageConfigured:!!await r.getStorageProfile()}}async function k(b){var H;const[T,P,M]=await Promise.all([r.listAppSyncBadges(b),n.listItems(),r.getState()]);return{appBadges:T,pendingOperations:P.map(({appId:he,kind:ie,lastError:re,status:se})=>({appId:he,kind:ie,lastError:re,status:se})),storageProfile:M.storageProfile,workspaceManifestRoomId:((H=M.manifestRoom)==null?void 0:H.roomId)??null}}async function S(b){return r.configureStorageProfile(b)}async function x(){await r.clearStorageProfile()}async function A(b){await r.removeLocalAppSync(b)}async function R(b){const T=await t.getApp(b);if(!T)throw new Error("App not found.");let P=await r.getAppSyncRecord(b);if(P||(P=await r.ensureOwnedAppRooms(b)),P.kind!=="joined"){await Ge(),await Se(),await gt(),P=await r.getAppSyncRecord(b);const H=await r.getStorageProfile();if(!H)throw new Error("Storage profile is required before sharing.");await ke(T,i(H),P)}const M=await r.createInvite(b);return await Re(),He(),M}async function D(b){const T=o(b.provider);T.claimRoomAccess&&await T.claimRoomAccess({claimToken:On(b.sourceRoom),roomId:b.sourceRoom.roomId});const P=await ql({provider:T,syncRecord:{appId:"pending-preview",dataProvider:b.provider,dataRoom:b.dataRoom,importedAt:new Date().toISOString(),kind:"joined",sourceProvider:b.provider,sourceRoom:b.sourceRoom}});return{appId:P.app.appId,dataRoomId:b.dataRoom.roomId,description:P.app.description,name:P.app.name,providerDatabaseUrl:b.provider.databaseUrl,sourceRoomId:P.sourceRoom.roomId,updatedAt:P.app.updatedAt}}async function E(b){const T=o(b.provider);await FL(T,b);const P=await cl({provider:T,syncRecord:{appId:"pending-import",dataProvider:b.provider,dataRoom:b.dataRoom,importedAt:new Date().toISOString(),kind:"joined",sourceProvider:b.provider,sourceRoom:b.sourceRoom}});await t.upsertApp(P.app),await t.saveAppData(P.app.appId,P.appData),await r.markJoinedApp({appId:P.app.appId,dataProvider:b.provider,dataRoom:P.dataRoom,sourceProvider:b.provider,sourceRoom:P.sourceRoom}),await Re(),He()}async function F(b){const T=$t(b.appId);try{if(!await r.getAppSyncRecord(b.appId)){if(!await r.getStorageProfile())return;await r.ensureOwnedAppRooms(b.appId),await Hc(n,b.appId)}await lA(n,b),Se()}finally{T()}}async function V(b,T){ar(b);let M=await r.getAppSyncRecord(b);if(!M){if(!await r.getStorageProfile())return;M=await r.ensureOwnedAppRooms(b),await Hc(n,b)}await uA({appId:b,baseData:T,baseRemoteVersion:M.dataRoom.lastSeenVersion,data:T,roomId:M.dataRoom.roomId,store:n}),gt()}async function Q(b,T={}){if(await r.getStorageProfile()){if(await r.ensureOwnedAppRooms(b.appId),await Hc(n,b.appId),T.flush===!1){await Re();return}await Ge(),await Re(),He()}}async function Z(){for(const b of await t.listApps()){await r.getAppSyncRecord(b.appId)||await r.ensureOwnedAppRooms(b.appId);const P=await t.getApp(b.appId);P&&await Q(P)}await Ge(),await Re(),await He()}async function ne(b){if(await Nt(b))return{};const T=await r.getAppSyncRecord(b),P=await je(T);if(!T||!P)return{};try{const M=await cl({provider:P,syncRecord:T});return await t.upsertApp(M.app),await t.saveAppData(M.app.appId,M.appData),await r.rememberAppRoomVersions({appId:M.app.appId,dataRoom:M.dataRoom,sourceRoom:M.sourceRoom}),await Re(),{app:M.app}}catch(M){if(!Nf(M))throw M;return await r.markRemoteAppDeleted(b,M.deletedAt),await Re(),{deletedAt:M.deletedAt}}}async function ye(b){const T=await r.getAppSyncRecord(b);if(!T||T.kind==="joined")return;const P=await t.getApp(b);P&&(await aA({app:P,store:n,syncRecord:T}),lr())}async function _e(){await r.ensureWorkspaceManifestRoom(),await Ge(),await Se(),await gt();let b=await r.getState();if(!b.storageProfile)throw new Error("Storage profile is required.");const T=i(b.storageProfile);for(const M of await t.listApps()){const H=await t.getApp(M.appId),he=await r.getAppSyncRecord(M.appId);!H||!he||he.kind==="joined"||await ke(H,T,he)}await Re(),He(),b=await r.getState();const P=uT(b);return cT(P)}async function z(b){const T=dT(b),P=await pT({provider:o(T.provider),recoveryMaterial:T});await be(P),await r.replaceState(P),await Re(),He()}async function q(){const b=await r.getState();if(!b.storageProfile||!b.manifestRoom)return qa();const T=await hT({provider:i(b.storageProfile),state:b});return Ue(T)}async function _(b){const T=await r.getState();return!T.storageProfile||!T.manifestRoom?()=>{}:i(T.storageProfile).subscribeRoom({readToken:ht(T.manifestRoom),roomId:T.manifestRoom.roomId,onChange:M=>{(async()=>{try{const H=await r.getState();if(!H.storageProfile||!H.manifestRoom||M.roomId!==H.manifestRoom.roomId||M.version<=H.manifestRoom.lastSeenVersion)return;const he=await ra({snapshot:M,state:H}),ie=await Ue(he);(ie.appIdsChanged.length||ie.appIdsDeleted.length)&&b(ie)}catch(H){if(ld(H))return;console.warn("Could not process remote workspace manifest update.",H)}})()}})}async function K(b,T){const P=await r.getAppSyncRecord(b),M=await je(P);if(!P||!M)return()=>{};const H=P.dataRoom.lastSeenVersion;let he=!1;return M.subscribeRoom({readToken:ht(P.dataRoom),roomId:P.dataRoom.roomId,onChange:ie=>{(async()=>{try{const re=!he;he=!0;const se=await r.getAppSyncRecord(b);if(!se||ie.version<=se.dataRoom.lastSeenVersion||await Ye(b))return;const L=await Fu({capability:se.dataRoom,roomType:"app-data",snapshot:ie});await t.saveAppData(b,L);const oe=na(se.dataRoom,ie);if(await r.rememberAppRoomVersions({appId:b,dataRoom:oe}),await Re(),re&&H===0)return;T({data:L,version:ie.version})}catch(re){if(ld(re))return;console.warn("Could not process remote app data update.",re)}})()}})}async function X(b,T,P){const M=await r.getAppSyncRecord(b),H=await fe(M);return!M||!H?()=>{}:H.subscribeRoom({readToken:ht(M.sourceRoom),roomId:M.sourceRoom.roomId,onChange:he=>{(async()=>{const ie=v.get(b)??0,re=await r.getAppSyncRecord(b);if(!(!re||he.version<=re.sourceRoom.lastSeenVersion))try{if(await Un(b))return;const se=await ql({provider:H,syncRecord:re}),L=await r.getAppSyncRecord(b);if(ie!==(v.get(b)??0)||await Un(b)||!L||se.sourceRoom.lastSeenVersion<=L.sourceRoom.lastSeenVersion)return;await t.upsertApp(se.app),await r.rememberAppRoomVersions({appId:se.app.appId,sourceRoom:se.sourceRoom}),await Re(),T({app:se.app})}catch(se){if(ld(se))return;if(!Nf(se)){console.warn("Could not process remote app source update.",se);return}await r.markRemoteAppDeleted(b,se.deletedAt),await Re(),P({deletedAt:se.deletedAt})}})()}})}async function I(b){var M;const T=await r.getStorageProfile();if(!T)return()=>{};const P=i(T);return((M=P.subscribeConnection)==null?void 0:M.call(P,b))??(()=>{})}async function ke(b,T,P){if(!P||P.kind==="joined")return;const M=await Af({app:b,provider:T,syncRecord:P}),H=await Tf({appData:await t.getAppData(b.appId),provider:T,syncRecord:{...P,sourceRoom:M}});await r.rememberAppRoomVersions({appId:b.appId,dataRoom:H,sourceRoom:M}),await Re()}async function je(b){if(!b)return null;if(b.kind==="joined")return o(b.dataProvider);const T=await r.getStorageProfile();return T?i(T):null}async function fe(b){if(!b)return null;if(b.kind==="joined")return o(b.sourceProvider);const T=await r.getStorageProfile();return T?i(T):null}async function Ue(b){const T=await r.getState();if(!T.storageProfile||!T.manifestRoom||!b.manifestRoom)return qa();if(b.workspaceId!==T.workspaceId)throw new Error("Remote workspace manifest belongs to a different workspace.");if(b.manifestRoom.lastSeenVersion<=T.manifestRoom.lastSeenVersion)return qa();const P=new Set,M=new Set,H=new Set;let he=!1;const ie={...T,apps:{...T.apps},deletedApps:{...T.deletedApps},manifestRoom:b.manifestRoom,storageProfile:b.storageProfile??T.storageProfile,updatedAt:b.updatedAt};for(const[re,se]of Object.entries(b.deletedApps)){if(await Nt(re))continue;const L=ie.apps[re];if((L==null?void 0:L.kind)==="joined"){L.remoteDeletedAt!==se.deletedAt&&(ie.apps[re]={...L,remoteDeletedAt:se.deletedAt},P.add(re),he=!0);continue}const oe=ie.deletedApps[re];(!oe||se.deletedAt>oe.deletedAt)&&(ie.deletedApps[re]=se,he=!0),L&&(delete ie.apps[re],M.add(re),he=!0)}for(const[re,se]of Object.entries(b.apps)){if(await Nt(re))continue;const L=ie.apps[re],oe=await t.getApp(re);L&&oe&&!LL(se,L)||(ie.apps[re]=se,delete ie.deletedApps[re],P.add(re),wS(se)||H.add(re),he=!0)}return he?(await be(ie,H),await r.replaceState(ie),await Promise.all([...M].map(re=>t.deleteApp(re))),{appIdsChanged:[...P],appIdsDeleted:[...M]}):(await r.rememberWorkspaceManifestVersion(b.manifestRoom.lastSeenVersion),qa())}async function be(b,T){if(b.storageProfile)for(const P of Object.values(b.apps)){if(T&&!T.has(P.appId)||P.kind==="joined"&&P.sourceProvider.databaseUrl!==b.storageProfile.databaseUrl)continue;const M=i(b.storageProfile),H=await cl({provider:M,syncRecord:P});await t.upsertApp(H.app),await t.saveAppData(H.app.appId,H.appData),P.sourceRoom=H.sourceRoom,P.dataRoom=H.dataRoom}}async function Ge(){return a?(s=!0,a):(a=(async()=>{do s=!1,await nT({core:t,createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(s)})().finally(()=>{a=null}),a)}async function Se(){return c?(d=!0,c):(c=(async()=>{do d=!1,await Ge(),await iT({core:t,createProviderForSyncRecord:fe,queueStore:n,syncRegistry:r});while(d);await Re(),He()})().finally(()=>{c=null}),c)}async function gt(){return u?(l=!0,u):(u=(async()=>{do l=!1,await Ge(),await GA({createProviderForSyncRecord:je,queueStore:n,syncRegistry:r}),await we();while(l);await Re(),He()})().finally(()=>{u=null}),u)}async function Re(){const b=await r.getState();b.storageProfile&&(await r.ensureWorkspaceManifestRoom(),await cA(n,b.workspaceId))}async function Sn(){await Re()}function pe(b){ar(b)}function $t(b){v.set(b,(v.get(b)??0)+1),y.set(b,(y.get(b)??0)+1);let T=!1;return()=>{if(T)return;T=!0;const P=(y.get(b)??1)-1;P>0?y.set(b,P):y.delete(b)}}async function He(b={}){if(!(p&&(f=!0,await p,!b.throwOnError)))return p=(async()=>{do f=!1,await TT({createProviderFromStorageProfile:i,onSavedState:async T=>{await Ue(T)},queueStore:n,syncRegistry:r,throwOnError:b.throwOnError});while(f)})().finally(()=>{p=null}),p}async function Ze(b){const T=await n.getItem(dh(b));return(T==null?void 0:T.kind)==="save-app-data"}async function In(b){const T=await n.getItem(ex(b));return(T==null?void 0:T.kind)==="save-source"}async function Nt(b){return await Ze(b)||await In(b)}async function Ye(b){return await Ze(b)||En(b)}async function Un(b){return await In(b)||y.has(b)}function ar(b){C.set(b,Date.now()+1500)}function En(b){const T=C.get(b);return T?Date.now()<=T?!0:(C.delete(b),!1):!1}async function we(){await Promise.all([...C.keys()].map(async b=>{await Ze(b)||C.delete(b)}))}async function lr(){return w?(m=!0,w):(w=(async()=>{do m=!1,await ZA({createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(m)})().finally(()=>{w=null}),w)}return{backUpLocalApps:Z,clearStorageProfile:x,configureStorageProfile:S,createInvite:R,deleteSyncedAppRooms:ye,ensureAppBackedUp:Q,exportWorkspaceRecovery:_e,flushAppDataSyncQueue:gt,flushOwnedAppDeletionQueue:lr,flushWorkspaceManifestQueue:He,flushSourceSyncQueue:Se,flushRoomLifecycleQueue:Ge,getWorkspaceSyncOverview:k,importInvite:E,initializeWorkspaceSync:g,beginLocalAppSourceEdit:$t,noteLocalAppDataEdit:pe,previewInvite:D,pullLatestAppRooms:ne,pullLatestWorkspaceManifest:q,pushAppData:V,pushAppSource:F,queueWorkspaceManifestSave:Sn,removeLocalAppSync:A,restoreWorkspaceRecovery:z,subscribeAppData:K,subscribeAppSource:X,subscribeStorageConnection:I,subscribeWorkspaceManifest:_}}function qa(){return{appIdsChanged:[],appIdsDeleted:[]}}function LL(e,t){return e.kind!==t.kind||wS(e)&&e.remoteDeletedAt!==(t.kind==="joined"?t.remoteDeletedAt:void 0)||e.sourceRoom.roomId!==t.sourceRoom.roomId||e.dataRoom.roomId!==t.dataRoom.roomId?!0:e.sourceRoom.lastSeenVersion>t.sourceRoom.lastSeenVersion||e.dataRoom.lastSeenVersion>t.dataRoom.lastSeenVersion}function wS(e){return e.kind==="joined"&&typeof e.remoteDeletedAt=="string"}function ML(e){return yS({driver:vS(e.firebaseConfig,{accessModel:e.accessModel,ownerSetupSecret:e.ownerSetupSecret})})}function jL(e){if(!e.firebaseConfig)throw new Error("Invite is missing Firebase config.");return yS({driver:vS(e.firebaseConfig,{accessModel:e.accessModel,ownerSetupSecret:e.ownerSetupSecret})})}async function FL(e,t){e.claimRoomAccess&&(await e.claimRoomAccess({claimToken:On(t.sourceRoom),roomId:t.sourceRoom.roomId}),await e.claimRoomAccess({claimToken:On(t.dataRoom),roomId:t.dataRoom.roomId}))}function ld(e){return e instanceof Error&&/(not found|found missing)/i.test(e.message)}function UL(e){return OL({core:e,queueStore:fA(),syncRegistry:OA(LA())})}const _S=`(() => {
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
`,zL=`  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });`,bS=_S.replace(zL,"  window.Alpine = src_default;");if(bS===_S)throw new Error("Could not remove Alpine auto-start from sandbox runtime.");function BL(e){return["default-src 'none'",e==="alpine"?"script-src 'unsafe-inline' 'unsafe-eval'":"script-src 'unsafe-inline'","style-src 'unsafe-inline'","img-src data: blob:","font-src data:","connect-src 'none'","media-src data: blob:","object-src 'none'","frame-src 'none'","worker-src 'none'","form-action 'none'","base-uri 'none'"].join("; ")}function VL(e,t,n,r={}){var m;const i=r.runtimeMode??"alpine",o=new DOMParser().parseFromString(e,"text/html");for(const w of o.querySelectorAll("meta[http-equiv]"))((m=w.getAttribute("http-equiv"))==null?void 0:m.toLowerCase())==="content-security-policy"&&w.remove();const s=o.createElement("meta");s.setAttribute("http-equiv","Content-Security-Policy"),s.setAttribute("content",BL(i));const a=o.createElement("style");a.dataset.appLabRuntime="compiled-css",a.textContent=n??"";const l=o.createElement("script");l.textContent=`Object.defineProperty(window, "__APP_LAB_CAPABILITY__", {
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
})();`;const d=[];if(i==="alpine"){const w=o.createElement("script");w.dataset.appLabRuntime="alpine",w.textContent=bS,d.push(w)}const c=o.createElement("script");c.textContent=`(function () {
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
${o.documentElement.outerHTML}`}function $L({app:e,getAppData:t,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:i=0,remoteDataChange:o,saveAppData:s}){const a=N.useRef(null),l=N.useRef(null),u=N.useRef(!1),d=N.useRef(null),c=N.useRef(null),f=N.useRef(null),[p,m]=N.useState(0),w=N.useMemo(()=>{const k=crypto.randomUUID();return{capability:k,html:VL(e.sourceCode,k,e.compiledCss)}},[e.appId,e.compiledCss,e.sourceCode,e.updatedAt,i,p]);N.useLayoutEffect(()=>{l.current={appId:e.appId,capability:w.capability},u.current=!1,d.current=w.capability,c.current=null,C()},[e.appId,w.capability]),N.useEffect(()=>()=>C(),[]),N.useEffect(()=>{async function k(R){var Q;if(R.source!==((Q=a.current)==null?void 0:Q.contentWindow)||!R.data||typeof R.data!="object")return;const D=l.current;if(!D||R.data.appLabCapability!==D.capability)return;const{type:E,requestId:F,payload:V}=R.data;if(E==="APP_LAB_UNLOADING"){x(D.capability);return}if(E==="APP_LAB_CONSOLE"){const Z=HL(V);Z&&n(Z);return}if(E==="APP_LAB_DATA_HANDLER_STATUS"){u.current=!!(V!=null&&V.registered),u.current&&y();return}if(E==="GET_MY_DATA"){const Z=await t(D.appId);if(!S(D))return;A({type:"MY_DATA",requestId:F,payload:{data:Z}});return}if(E==="SAVE_MY_DATA")try{if(await s(D.appId,(V==null?void 0:V.data)??null),!S(D))return;A({type:"MY_DATA_SAVED",requestId:F,payload:{ok:!0}})}catch(Z){if(!S(D))return;A({type:"MY_DATA_SAVE_FAILED",requestId:F,payload:{ok:!1,error:Z instanceof Error?Z.message:"Could not save app data."}})}}function S(R){const D=l.current;return(D==null?void 0:D.appId)===R.appId&&D.capability===R.capability}function x(R){var D;((D=l.current)==null?void 0:D.capability)===R&&(l.current=null),d.current===R&&(d.current=null)}function A(R){var D,E;(E=(D=a.current)==null?void 0:D.contentWindow)==null||E.postMessage(R,"*")}return window.addEventListener("message",k),()=>window.removeEventListener("message",k)},[t,n,s]),N.useEffect(()=>{if(!o)return;const k=l.current;if(!(!k||k.appId!==e.appId)){if(!u.current){c.current=o,C(),f.current=window.setTimeout(()=>{var S;((S=c.current)==null?void 0:S.id)!==o.id||u.current||(c.current=null,r==null||r())},500);return}v(o)}},[e.appId,r,o]);function C(){f.current!=null&&(window.clearTimeout(f.current),f.current=null)}function y(){const k=c.current;k&&(c.current=null,C(),v(k))}function v(k){var S,x;(x=(S=a.current)==null?void 0:S.contentWindow)==null||x.postMessage({type:"APP_LAB_DATA_CHANGED",payload:{data:k.data,info:{source:"remote",version:k.version}}},"*")}function g(){if(d.current===w.capability){d.current=null;return}l.current=null,d.current=null,m(k=>k+1)}return h.jsx("iframe",{ref:a,className:"block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]",title:`${e.name} app`,sandbox:"allow-scripts","data-app-lab-capability":w.capability,referrerPolicy:"no-referrer",onLoad:g,srcDoc:w.html})}function HL(e){if(!e||typeof e!="object")return null;const t=e,n=typeof t.level=="string"&&WL(t.level)?t.level:"log",r=Array.isArray(t.args)?t.args.map(o=>String(o)).slice(0,20):[],i=typeof t.timestamp=="string"?t.timestamp:new Date().toISOString();return{id:crypto.randomUUID(),level:n,args:r,timestamp:i}}function WL(e){return e==="debug"||e==="error"||e==="info"||e==="log"||e==="warn"}const qL="modulepreload",KL=function(e){return"/app-lab/"+e},Sv={},GL=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(l=>{if(l=KL(l),l in Sv)return;Sv[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":qL,u||(c.as="script"),c.crossOrigin="",c.href=l,a&&c.setAttribute("nonce",a),document.head.appendChild(c),u)return new Promise((f,p)=>{c.addEventListener("load",f),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},YL='meta[name="app-lab-tailwind"][content="enabled"]',QL='style[type="text/tailwindcss"]',xS=5e3,JL=8e3,ud=new Map;let Iv=null;async function Ev(e){const t=await yM(e);if(!XL(e))return{compiledCss:void 0,compiledCssSourceHash:void 0};if(sM())throw new Error("Tailwind CSS compilation is unavailable while offline.");const n=ud.get(t);if(n)return n;const r=pM(ZL(e,t),JL,"Tailwind CSS compilation timed out.").catch(i=>{throw ud.delete(t),i});return ud.set(t,r),r}function XL(e){const t=new DOMParser().parseFromString(e,"text/html");return!!(t.querySelector(YL)||t.documentElement.hasAttribute("data-app-lab-tailwind")||t.body.hasAttribute("data-app-lab-tailwind"))}async function ZL(e,t){const n=gM(),r=lM(e),i=nM(e),o=tM(e),s=await eM(),a=document.createElement("iframe");a.setAttribute("aria-hidden","true"),a.setAttribute("sandbox","allow-scripts"),a.tabIndex=-1,a.style.cssText="position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;border:0;visibility:hidden;";try{return a.srcdoc=aM(n,r,i,o,s),document.body.appendChild(a),{compiledCss:await uM(a,n),compiledCssSourceHash:t}}finally{a.remove()}}async function eM(){return Iv??(Iv=GL(()=>import("./index.global-XoZzS87n.js"),[]).then(e=>e.default)),Iv}function tM(e){return[...new DOMParser().parseFromString(e,"text/html").querySelectorAll(QL)].map(n=>n.textContent??"").join(`
`)}function nM(e){const t=new Set;return rM(e,t),[...t].sort()}function rM(e,t){for(const n of e.matchAll(/["'`]([^"'`<>]*[-:/[\]().#%][^"'`<>]*)["'`]/g))for(const r of n[1].split(/\s+/)){const i=r.trim().replace(/,$/,"");iM(i)&&t.add(i)}}function iM(e){return oM(e)?/[-:/[\]().#%]/.test(e):!1}function oM(e){return!(!e||e.length>160||/[\s<>{};]/.test(e)||e.startsWith("http:")||e.startsWith("https:")||e.startsWith("data:")||e.startsWith("--"))}function sM(){return typeof navigator<"u"&&navigator.onLine===!1}function aM(e,t,n,r,i){const o=n.map(a=>`<div class="${hM(a)}"></div>`).join(""),s=r.trim()?r:"";return`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'">
    <style type="text/tailwindcss">${mM(s)}</style>
  </head>
  <body>
    ${t}
    ${o}
    <script>${cM(e)}<\/script>
    <script>${i.replaceAll("<\/script","<\\/script")}<\/script>
    <script>${dM(e)}<\/script>
  </body>
</html>`}function lM(e){const t=new DOMParser().parseFromString(e,"text/html"),n=t.body.cloneNode(!0);Cv(n);const r=t.createElement("div");r.hidden=!0,r.dataset.appLabCompilerTemplates="";for(const i of n.querySelectorAll("template")){const o=i.content.cloneNode(!0);Cv(o),r.append(o)}return n.append(r),n.innerHTML}function Cv(e){for(const n of[...e.querySelectorAll("script, iframe, object, embed, link, meta, base, style")])n.remove();const t=[];e instanceof Element&&t.push(e),t.push(...e.querySelectorAll("*"));for(const n of t)for(const r of[...n.attributes])r.name!=="class"&&n.removeAttribute(r.name)}async function uM(e,t){return new Promise((n,r)=>{const i=window.setTimeout(()=>{o(),r(new Error("Tailwind CSS compilation timed out."))},xS);function o(){window.clearTimeout(i),window.removeEventListener("message",s)}function s(a){if(!(a.source!==e.contentWindow||!fM(a.data,t))){if(o(),a.data.error){r(new Error(a.data.error));return}n(a.data.css)}}window.addEventListener("message",s)})}function cM(e){return`(function () {
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
})();`.replaceAll("<\/script","<\\/script")}function dM(e){return`(function () {
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
    if (performance.now() - startedAt > ${xS}) {
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
})();`.replaceAll("<\/script","<\\/script")}function fM(e,t){if(!e||typeof e!="object")return!1;const n=e;return n.type==="APP_LAB_TAILWIND_COMPILE_RESULT"&&n.compilerId===t&&(typeof n.css=="string"||typeof n.error=="string")}function pM(e,t,n){return new Promise((r,i)=>{const o=window.setTimeout(()=>i(new Error(n)),t);e.then(s=>{window.clearTimeout(o),r(s)},s=>{window.clearTimeout(o),i(s)})})}function hM(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function mM(e){return e.replaceAll("</style","<\\/style")}function gM(){return typeof crypto.randomUUID=="function"?crypto.randomUUID():`compiler_${Math.random().toString(36).slice(2)}`}async function yM(e){const t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return[...new Uint8Array(n)].map(r=>r.toString(16).padStart(2,"0")).join("")}function ep({children:e,status:t}){return h.jsx("div",{className:"fixed inset-x-0 bottom-0 z-40 border-t border-app-line bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur",children:h.jsxs("div",{className:"mx-auto flex w-full max-w-5xl flex-wrap items-center justify-end gap-3 px-4 py-3 md:pl-[228px]",children:[t&&t!=="Ready"?h.jsx("span",{className:"mr-auto min-w-0 flex-1 text-xs font-normal text-app-muted","aria-live":"polite",children:t}):null,h.jsx("div",{className:"flex flex-wrap justify-end gap-2",children:e})]})})}function kS({message:e}){return e?h.jsx("div",{className:"fixed bottom-20 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md bg-app-ink px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg",role:"status",children:e}):null}function vM({activeProfileId:e,onCreate:t,onDelete:n,onSelect:r,onUpdate:i,profiles:o}){const[s,a]=N.useState(e),l=N.useMemo(()=>o.find(x=>x.profileId===s)??o.find(x=>x.profileId===e)??o[0]??null,[e,o,s]),[u,d]=N.useState(()=>Ho(l)),[c,f]=N.useState(null),[p,m]=N.useState("Ready");N.useEffect(()=>{o.some(x=>x.profileId===e)&&a(e)},[e,o]),N.useEffect(()=>{l&&(a(l.profileId),d(Ho(l)))},[l]),N.useEffect(()=>{if(!c)return;const x=window.setTimeout(()=>f(null),3e3);return()=>window.clearTimeout(x)},[c]);async function w(x,A,R=(x==null?void 0:x.description)??""){m("Creating profile...");let D;try{D=await t({...Ho(x),description:R,name:A})}catch(E){m("Ready"),f(E instanceof Error?E.message:"Could not create profile.");return}a(D.profileId),d(Ho(D));try{await r(D.profileId),f("Profile created.")}catch{a(e),f("Profile created, but could not make it active.")}finally{m("Ready")}}async function C(x){a(x),m("Selecting profile...");try{await r(x),m("Ready")}catch(A){a(e),m("Ready"),f(A instanceof Error?A.message:"Could not select profile.")}}async function y(){if(!(!l||l.builtIn)){m("Saving profile...");try{const x=await i({profileId:l.profileId,...u});d(Ho(x)),m("Ready"),f("Profile saved.")}catch(x){m("Ready"),f(x instanceof Error?x.message:"Could not save profile.")}}}async function v(){if(!l||l.builtIn||!window.confirm(`Delete the Builder profile "${l.name}"?`))return;m("Deleting profile...");const x=o.find(A=>A.profileId!==l.profileId)??null;try{await n(l.profileId)}catch(A){m("Ready"),f(A instanceof Error?A.message:"Could not delete profile.");return}a((x==null?void 0:x.profileId)??"");try{x&&await r(x.profileId),f("Profile deleted.")}catch{f("Profile deleted, but could not save the fallback selection.")}finally{m("Ready")}}if(!l)return h.jsx("p",{className:"text-sm text-app-muted",children:"No Builder profiles are available."});const g=l.builtIn,k=o.find(x=>x.profileId===Js)??o[0]??null,S=`w-full rounded-md border border-app-line px-3 py-2 font-normal text-app-ink outline-none focus:border-app-accent ${g?"bg-slate-50":"bg-white"}`;return h.jsxs("div",{className:"grid max-w-3xl gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h3",{className:"text-xl font-bold text-app-ink",children:"Builder profiles"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Choose the instructions and starter app BuilderAI can use."})]}),h.jsxs("section",{className:"grid gap-4","aria-labelledby":"profile-section-title",children:[h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"profile-section-title",children:"Profile"}),h.jsxs("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Profile actions",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>void w(k,"New profile",""),children:"New"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-semibold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>void w(l,`${l.name} copy`),children:"Duplicate"}),h.jsx("button",{className:"min-h-9 rounded-md border border-transparent px-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-app-muted disabled:hover:bg-transparent",type:"button",disabled:g,title:g?"Built-in profiles cannot be deleted":"Delete profile",onClick:()=>void v(),children:"Delete"})]})]}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Active profile",h.jsx("select",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-normal text-app-ink outline-none focus:border-app-accent",value:l.profileId,onChange:x=>{C(x.target.value)},children:o.map(x=>h.jsxs("option",{value:x.profileId,children:[x.name,x.builtIn?" (Built-in)":""]},x.profileId))})]}),l.description?h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:l.description}):null]}),h.jsxs("section",{className:"grid gap-8 border-t border-app-line pt-6","aria-labelledby":"profile-details-title",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"profile-details-title",children:"Profile details"}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Profile name",h.jsx("input",{className:S,readOnly:g,type:"text",value:u.name,onChange:x=>d(A=>({...A,name:x.target.value}))})]}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-normal text-app-muted",children:["Description",h.jsx("textarea",{className:`${S} min-h-24 resize-y text-sm leading-relaxed`,readOnly:g,value:u.description,onChange:x=>d(A=>({...A,description:x.target.value}))})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"instructions-section-title",children:[h.jsx("h5",{className:"text-base font-bold text-app-ink",id:"instructions-section-title",children:"Instructions"}),h.jsx("p",{className:"text-sm text-app-muted",children:"These instructions guide how BuilderAI plans changes and writes App Lab code."}),h.jsx("textarea",{"aria-label":"Builder instructions",className:`${S} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`,readOnly:g,spellCheck:!1,value:u.promptTemplate,onChange:x=>d(A=>({...A,promptTemplate:x.target.value}))})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"starter-section-title",children:[h.jsx("h5",{className:"text-base font-bold text-app-ink",id:"starter-section-title",children:"Starter app"}),h.jsx("p",{className:"text-sm text-app-muted",children:"This source becomes each new app created with the profile."}),h.jsx("textarea",{"aria-label":"Starter app source",className:`${S} min-h-64 resize-y font-mono text-xs font-normal leading-relaxed`,readOnly:g,spellCheck:!1,value:u.starterSource,onChange:x=>d(A=>({...A,starterSource:x.target.value}))})]})]}),h.jsxs("section",{className:"grid gap-3","aria-labelledby":"fixed-tools-section-title",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",id:"fixed-tools-section-title",children:"Fixed tools"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Every profile can use these App Lab tools; profiles change the guidance, not the capabilities."}),h.jsx("ul",{className:"grid gap-2 text-sm font-normal text-app-muted",children:vC.map(x=>h.jsxs("li",{className:"grid gap-0.5",children:[h.jsx("code",{className:"break-all font-semibold text-app-ink",children:x.name}),h.jsx("span",{children:x.description.replace(/\.$/,"")})]},x.name))})]}),g?null:h.jsx(ep,{status:p,children:h.jsx("button",{className:"min-h-9 rounded-md bg-app-accent px-3 text-sm font-semibold text-white hover:bg-app-strong",type:"button",onClick:()=>void y(),children:"Save profile"})}),h.jsx(kS,{message:c})]})}function Ho(e){return{description:(e==null?void 0:e.description)??"",name:(e==null?void 0:e.name)??"",promptTemplate:(e==null?void 0:e.promptTemplate)??"",starterSource:(e==null?void 0:e.starterSource)??""}}function wM({aiConfig:e,builderPreferences:t,builderProfiles:n,initialAiTab:r,initialSection:i,isOpen:o,onClearAiConfig:s,onClearStorageProfile:a,onClose:l,onConfigureStorageProfile:u,onCreateBuilderProfile:d,onDeleteBuilderProfile:c,onExportWorkspaceRecovery:f,onRestoreWorkspaceRecovery:p,onSaveAiConfig:m,onSaveBuilderPreferences:w,onTestAiConnection:C,onUpdateBuilderProfile:y,storageProfile:v}){const[g,k]=N.useState(""),[S,x]=N.useState(""),[A,R]=N.useState("connection"),[D,E]=N.useState("Ready"),[F,V]=N.useState("storage"),[Q,Z]=N.useState("setup"),[ne,ye]=N.useState(""),[_e,z]=N.useState(()=>Zb()),[q,_]=N.useState(""),[K,X]=N.useState(""),[I,ke]=N.useState(xM),[je,fe]=N.useState(!1),[Ue,be]=N.useState(null),[Ge,Se]=N.useState(""),[gt,Re]=N.useState(""),[Sn,pe]=N.useState("Ready"),[$t,He]=N.useState("firebase"),[Ze,In]=N.useState(()=>Nv()),Nt=N.useRef(!1);N.useEffect(()=>{k(e.apiKey),x(e.model)},[e]),N.useEffect(()=>{ye((v==null?void 0:v.displayName)??""),X((v==null?void 0:v.databaseUrl)??""),_(v?JSON.stringify(v.firebaseConfig,null,2):""),v!=null&&v.ownerSetupSecret&&z(v.ownerSetupSecret)},[v]),N.useEffect(()=>{if(typeof window.matchMedia!="function")return;const L=window.matchMedia("(max-width: 767px)"),oe=en=>ke(en.matches);return ke(L.matches),L.addEventListener("change",oe),()=>L.removeEventListener("change",oe)},[]),N.useEffect(()=>{if(!Ue)return;const L=window.setTimeout(()=>be(null),3e3);return()=>window.clearTimeout(L)},[Ue]),N.useEffect(()=>{if(!o){Nt.current=!1;return}Nt.current||(Nt.current=!0,i&&V(i),r&&R(r),fe(!!i),be(null),Se(""),Re(""),pe("Ready"),E("Ready"),He(v?"connect":"firebase"),In(Nv()))},[r,i,o,v]);const Ye=ZC(_e);if(!o)return null;async function Un(){pe("Saving storage profile...");try{await u({accessModel:"auth-v1",databaseUrl:K,displayName:ne,firebaseConfigText:q,ownerSetupSecret:_e}),pe("Ready"),be("Storage profile saved. Existing owned apps now have stable sync rooms.")}catch(L){pe(L instanceof Error?L.message:"Could not save storage profile.")}}async function ar(){pe("Saving AI configuration...");try{const L=await m({apiKey:g,model:S});k(L.apiKey),x(L.model),pe("Ready"),be("AI configuration saved in this browser.")}catch(L){pe(L instanceof Error?L.message:"Could not save AI configuration.")}}async function En(){pe("Testing OpenRouter key and model...");try{const L=await C({apiKey:g,model:S}),oe=L.keyLabel?` using ${L.keyLabel}`:"";pe(`Connected to ${L.modelName}${oe}.`)}catch(L){pe(L instanceof Error?L.message:"Could not connect to OpenRouter.")}}async function we(L){E("Saving...");try{await w({...t,conversationMemory:L}),E("Saved")}catch(oe){E(oe instanceof Error?oe.message:"Could not save.")}}async function lr(L){await w({...t,activeProfileId:L})}async function b(){if(window.confirm("Remove the OpenRouter API key and model from this browser?")){pe("Removing AI configuration...");try{await s(),k(""),x(""),pe("Ready"),be("AI configuration removed from this browser.")}catch(L){pe(L instanceof Error?L.message:"Could not remove AI configuration.")}}}async function T(){var L;try{await((L=navigator.clipboard)==null?void 0:L.writeText(Ye)),pe("Ready"),be("Firebase rules copied.")}catch{pe("Could not copy rules. Select the rules text and copy it manually.")}}function P(L){In(oe=>({...oe,[L]:!oe[L]}))}function M(L){V(L),be(null),pe("Ready")}function H(L){R(L),be(null),pe("Ready")}function he(L){Z(L),be(null),pe("Ready")}async function ie(){if(window.confirm("Remove this storage profile from this browser? Existing app sync room references stay in the workspace metadata.")){pe("Removing storage profile...");try{await a(),pe("Ready"),be("Storage profile removed from this browser.")}catch(L){pe(L instanceof Error?L.message:"Could not remove storage profile.")}}}async function re(){var L;pe("Saving encrypted workspace manifest...");try{const oe=await f();Se(oe),pe("Sync material ready. Treat it like a password."),(L=navigator.clipboard)==null||L.writeText(oe).catch(()=>{})}catch(oe){pe(oe instanceof Error?oe.message:"Could not generate sync material.")}}async function se(){if(gt.trim()){if(v){pe("This browser already has a storage profile. Remove the current profile in First-time setup before syncing this device.");return}pe("Restoring workspace manifest...");try{await p(gt),pe("Workspace synced. Apps are being hydrated from their rooms.")}catch(L){pe(L instanceof Error?L.message:"Could not sync this device.")}}}return h.jsx("div",{className:"fixed inset-0 z-30 bg-app-surface",role:"presentation",children:h.jsxs("section",{className:"grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden",role:"dialog","aria-modal":"true","aria-labelledby":"settings-title",children:[h.jsx("header",{className:"border-b border-app-line bg-white/90",children:h.jsxs("div",{className:"mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3",children:[h.jsx("button",{"aria-label":I&&je?"Back to Settings":void 0,className:`min-h-9 rounded-md border border-app-line bg-white text-sm font-extrabold text-app-ink hover:border-app-accent ${I&&je?"w-9 px-0 text-lg":"px-3"}`,type:"button",onClick:()=>{if(I&&je){fe(!1),be(null),pe("Ready");return}l()},children:I&&je?"←":"← Back"}),h.jsx("h2",{className:"truncate text-xl font-bold leading-tight text-app-ink",id:"settings-title",children:"Settings"})]})}),h.jsx("div",{className:"min-h-0 overflow-auto pb-24",children:I&&!je?h.jsx(_M,{onOpen:L=>{M(L),fe(!0)}}):h.jsxs("div",{className:`mx-auto grid w-full max-w-5xl px-4 py-5 ${I?"grid-cols-1":"min-h-full grid-cols-[180px_minmax(0,1fr)] gap-8"}`,children:[I?null:h.jsxs("nav",{className:"grid content-start border-r border-app-line pr-4","aria-label":"Settings sections",children:[h.jsx(Tv,{active:F==="storage",label:"Storage",onClick:()=>M("storage")}),h.jsx(Tv,{active:F==="ai",label:"AI",onClick:()=>M("ai")})]}),h.jsx("div",{className:"min-w-0",children:F==="ai"?h.jsxs("div",{className:"grid gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h2",{className:"text-2xl font-bold text-app-ink",children:"AI"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Connect a model and configure how BuilderAI works."})]}),h.jsxs("nav",{className:"flex gap-6 border-b border-app-line","aria-label":"AI settings",children:[h.jsx(Ka,{active:A==="connection",label:"Connection",onClick:()=>H("connection")}),h.jsx(Ka,{active:A==="agent",label:"AI Agent",onClick:()=>H("agent")})]}),A==="connection"?h.jsxs("form",{className:"grid max-w-3xl gap-5",onSubmit:L=>{L.preventDefault(),ar()},children:[h.jsxs("div",{className:"grid gap-2 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{children:"Connect OpenRouter to use BuilderAI. The API key is stored only in this browser and sent to OpenRouter to authenticate requests. It is never included in workspace sync or app invites."}),h.jsx("p",{children:"App source and conversation context are sent to the selected model only when you submit a BuilderAI request."})]}),h.jsxs("ol",{className:"grid gap-3 text-sm leading-relaxed text-app-muted",children:[h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"1"}),h.jsxs("span",{children:["Create an API key in"," ",h.jsx("a",{className:"font-extrabold text-app-accent underline",href:"https://openrouter.ai/settings/keys",target:"_blank",rel:"noreferrer",children:"OpenRouter"}),"."]})]}),h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"2"}),h.jsxs("span",{children:["Choose a model id from the"," ",h.jsx("a",{className:"font-extrabold text-app-accent underline",href:"https://openrouter.ai/models?supported_parameters=tools",target:"_blank",rel:"noreferrer",children:"tool-capable models"}),"."]})]}),h.jsxs("li",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-3",children:[h.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white",children:"3"}),h.jsx("span",{children:"Paste both values below, test the connection, and save them locally."})]})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["OpenRouter API key",h.jsx("input",{autoComplete:"off",className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",onChange:L=>k(L.target.value),placeholder:"sk-or-v1-...",type:"password",value:g})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Model id",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",onChange:L=>x(L.target.value),placeholder:"provider/model-name",type:"text",value:S})]}),h.jsxs(ep,{status:Sn,children:[e.apiKey||e.model?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void b(),children:"Remove"}):null,h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:opacity-50",disabled:!g.trim()||!S.trim(),type:"button",onClick:()=>void En(),children:"Test connection"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-4 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50",disabled:!g.trim()||!S.trim(),type:"submit",children:"Save AI configuration"})]})]}):h.jsxs("div",{className:"grid max-w-3xl gap-8",children:[h.jsxs("section",{className:"grid gap-4 border-b border-app-line pb-6","aria-labelledby":"global-ai-settings-title",children:[h.jsx("h3",{className:"text-xl font-bold text-app-ink",id:"global-ai-settings-title",children:"Global settings"}),h.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",children:[h.jsxs("div",{className:"grid gap-1",children:[h.jsx("h4",{className:"text-base font-bold text-app-ink",children:"Conversation memory"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Recent messages sent with each request."})]}),h.jsxs("div",{className:"grid justify-items-end gap-1",children:[h.jsx("select",{"aria-label":"Conversation memory",className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent",value:t.conversationMemory,onChange:L=>void we(L.target.value),children:["short","medium","long"].map(L=>h.jsx("option",{value:L,children:bM(L)},L))}),h.jsx("span",{className:"min-h-4 text-xs font-normal text-app-muted","aria-live":"polite",children:D==="Ready"?"":D})]})]})]}),h.jsx(vM,{activeProfileId:t.activeProfileId,profiles:n,onCreate:d,onDelete:c,onSelect:lr,onUpdate:y})]})]}):h.jsxs("div",{className:"grid gap-8",children:[h.jsxs("header",{className:"grid gap-1",children:[h.jsx("h2",{className:"text-2xl font-bold text-app-ink",children:"Storage and sync"}),h.jsx("p",{className:"text-sm text-app-muted",children:"Connect storage for backup, sharing, and cross-device sync."})]}),h.jsxs("nav",{className:"flex gap-6 border-b border-app-line","aria-label":"Storage settings",children:[h.jsx(Ka,{active:Q==="setup",label:"First-time setup",onClick:()=>he("setup")}),h.jsx(Ka,{active:Q==="sync",label:"Sync device",onClick:()=>he("sync")})]}),Q==="setup"?h.jsxs("div",{className:"grid gap-4",children:[h.jsxs("div",{className:"grid gap-2 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{children:"Connect your own Firebase Realtime Database to back up this browser's apps, restore them on another device, and create app invite links. Complete the security setup in step 2 to protect your storage."}),v?h.jsxs("p",{className:"break-all rounded-md bg-emerald-50 px-3 py-2 font-mono text-xs font-bold text-emerald-800",children:["Connected to ",v.databaseUrl]}):null]}),h.jsxs("div",{className:"divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white",children:[h.jsxs(cd,{id:"firebase",number:"1",title:"Create Firebase",description:"Create the Firebase account, project, and Realtime Database.",open:$t==="firebase",onOpenChange:He,children:[h.jsx(dr,{checked:Ze["create-account"],stepNumber:"a",label:"Create or sign in to Firebase",detail:"Use the Google account that should own this sync storage.",onChange:()=>P("create-account")}),h.jsx(dr,{checked:Ze["create-project"],stepNumber:"b",label:"Create a Firebase project",detail:"A plain project is enough; App Lab only needs the web app config and Realtime Database.",onChange:()=>P("create-project")}),h.jsx(dr,{checked:Ze["create-database"],stepNumber:"c",label:"Create Realtime Database",detail:"Pick a region, create the database, and leave this screen open before copying details.",onChange:()=>P("create-database")})]}),h.jsxs(cd,{id:"security",number:"2",title:"Set Security",description:"Enable anonymous users and publish the rules before App Lab connects.",open:$t==="security",onOpenChange:He,children:[h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"App Lab uses authenticated room claims for new Firebase setups. That prevents invite recipients from creating unrelated App Lab rooms in your database."}),h.jsx(dr,{checked:Ze["enable-auth"],stepNumber:"a",label:"Enable Anonymous Auth",detail:"In Firebase Authentication, add Anonymous as a sign-in provider.",onChange:()=>P("enable-auth")}),h.jsx(dr,{checked:Ze["paste-rules"],stepNumber:"b",label:"Publish these Realtime Database rules",detail:"They let you create rooms and let invited people claim only the rooms in an invite.",onChange:()=>P("paste-rules"),children:h.jsxs("div",{className:"grid gap-2",children:[h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Rules"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-xs font-extrabold text-app-ink hover:border-app-accent",type:"button",onClick:T,children:"Copy rules"})]}),h.jsx("pre",{className:"max-h-72 overflow-auto rounded-md border border-app-line bg-slate-50 p-3 text-xs leading-relaxed text-app-ink",children:Ye})]})})]}),h.jsxs(cd,{id:"connect",number:"3",title:"Connect App Lab",description:"Paste the web app config and database URL, then save.",open:$t==="connect",onOpenChange:He,children:[h.jsxs(dr,{checked:Ze["copy-config"],stepNumber:"a",label:"Copy web app config object",detail:"Use the config object from Project settings. Authenticated setup requires the apiKey field.",onChange:()=>P("copy-config"),children:[h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Display name",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent",value:ne,onChange:L=>ye(L.target.value),placeholder:"My Firebase project"})]}),h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Firebase web app config",h.jsx("textarea",{className:"min-h-28 resize-y rounded-md border border-app-line bg-white px-3 py-2 font-mono text-xs text-app-ink outline-none focus:border-app-accent",value:q,onChange:L=>_(L.target.value),placeholder:`const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "..."
};`})]})]}),h.jsx(dr,{checked:Ze["copy-url"],stepNumber:"b",label:"Copy the Realtime Database URL",detail:"Use the database URL from Realtime Database, not a Storage bucket URL.",onChange:()=>P("copy-url"),children:h.jsxs("label",{className:"grid gap-2 text-sm font-normal text-app-muted",children:["Firebase Realtime Database URL",h.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",value:K,onChange:L=>X(L.target.value),placeholder:"https://your-project.region.firebasedatabase.app"})]})}),h.jsx(dr,{checked:Ze.sync,stepNumber:"c",label:"Ready to connect and sync",detail:"Saving the profile backs up existing local apps to the selected Firebase project.",onChange:()=>P("sync")})]})]}),h.jsxs(ep,{status:Sn,children:[v?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:ie,children:"Remove profile"}):null,h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!K.trim(),onClick:Un,children:"Save storage profile"})]})]}):h.jsxs("div",{className:"grid gap-4",children:[h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"Sync device is for moving the whole workspace to another browser or device. Generate sync material on a device that already has this workspace, then paste it on the device you want to sync with."}),h.jsxs("div",{className:"divide-y divide-app-line",children:[h.jsxs(Rv,{number:"1",title:"Generate sync material",description:"Use this on the device that already has the workspace you want to sync.",children:[h.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs outline-none focus:border-app-accent",readOnly:!0,placeholder:"Generated workspace sync material will appear here.",value:Ge}),h.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!v,onClick:re,children:"Generate sync material"})]}),h.jsxs(Rv,{number:"2",title:"Paste sync material",description:"Use this on the device or browser you want to sync with the existing workspace.",children:[h.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent",placeholder:"Paste workspace sync material",value:gt,onChange:L=>Re(L.target.value)}),h.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!gt.trim(),onClick:se,children:"Sync this device"})]})]}),Sn!=="Ready"?h.jsx("span",{className:"text-xs font-normal text-app-muted",children:Sn}):null]})]})})]})}),h.jsx(kS,{message:Ue})]})})}function _M({onOpen:e}){return h.jsxs("nav",{className:"mx-auto w-full max-w-5xl divide-y divide-app-line border-y border-app-line","aria-label":"Settings sections",children:[h.jsx(Av,{description:"Back up apps, share them, and sync this workspace.",label:"Storage and sync",onClick:()=>e("storage")}),h.jsx(Av,{description:"Connect a model and configure how BuilderAI works.",label:"AI",onClick:()=>e("ai")})]})}function Av({description:e,label:t,onClick:n}){return h.jsxs("button",{className:"grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 bg-white px-4 py-4 text-left hover:bg-slate-50",type:"button",onClick:n,children:[h.jsxs("span",{className:"grid gap-1",children:[h.jsx("span",{className:"text-base font-bold text-app-ink",children:t}),h.jsx("span",{className:"text-sm text-app-muted",children:e})]}),h.jsx("span",{className:"text-xl text-app-muted","aria-hidden":"true",children:"›"})]})}function Tv({active:e,label:t,onClick:n}){return h.jsx("button",{"aria-current":e?"page":void 0,className:`min-h-10 border-b-2 px-3 text-left text-sm font-semibold md:border-b-0 md:border-l-2 ${e?"border-app-accent bg-app-accent/5 text-app-ink":"border-transparent text-app-muted hover:bg-slate-100 hover:text-app-ink"}`,type:"button",onClick:n,children:t})}function Ka({active:e,label:t,onClick:n}){return h.jsx("button",{"aria-current":e?"page":void 0,className:`-mb-px min-h-10 border-b-2 px-0 text-sm font-semibold ${e?"border-app-ink text-app-ink":"border-transparent text-app-muted hover:text-app-ink"}`,type:"button",onClick:n,children:t})}function bM(e){return`${`${e.charAt(0).toUpperCase()}${e.slice(1)}`} (${Gb[e]})`}function cd({children:e,description:t,id:n,number:r,onOpenChange:i,open:o,title:s}){return h.jsxs("section",{children:[h.jsxs("button",{className:"grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-app-accent/5",type:"button","aria-expanded":o,onClick:()=>i(o?null:n),children:[h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block text-sm font-extrabold text-app-ink",children:`${r}. ${s}`}),h.jsx("span",{className:"block text-sm leading-relaxed text-app-muted",children:t})]}),h.jsx("span",{className:"text-xl leading-none text-app-muted","aria-hidden":"true",children:o?"−":"+"})]}),o?h.jsx("div",{className:"grid gap-4 px-4 pb-4",children:e}):null]})}function dr({checked:e,children:t,detail:n,label:r,onChange:i,stepNumber:o}){return h.jsxs("div",{className:"grid grid-cols-[2rem_minmax(0,1fr)_2.25rem] gap-4 border-t border-app-line py-4 text-sm leading-relaxed first:border-t-0 first:pt-0",children:[h.jsx("span",{className:"pt-0.5 font-mono text-xs font-extrabold text-app-muted",children:o}),h.jsxs("div",{className:"grid min-w-0 gap-3",children:[h.jsxs("span",{className:"grid gap-1",children:[h.jsx("span",{className:`block font-extrabold ${e?"text-app-muted line-through decoration-2":"text-app-ink"}`,children:r}),h.jsx("span",{className:`block ${e?"text-app-muted/80 line-through":"text-app-muted"}`,children:n})]}),t?h.jsx("div",{className:"grid gap-3",children:t}):null]}),h.jsxs("label",{className:"grid h-8 min-h-8 w-8 cursor-pointer place-items-center self-center justify-self-end",title:r,children:[h.jsx("input",{"aria-label":r,className:"peer sr-only",type:"checkbox",checked:e,onChange:i}),h.jsx("span",{className:"grid h-5 min-h-5 w-5 place-items-center rounded-full border-2 border-app-line text-[11px] font-extrabold leading-none text-white peer-checked:border-app-accent peer-checked:bg-app-accent",children:e?"✓":""})]})]})}function Rv({children:e,description:t,number:n,title:r}){return h.jsx("section",{className:"grid gap-3 py-5 text-sm leading-relaxed",children:h.jsxs("div",{className:"grid min-w-0 gap-3",children:[h.jsxs("div",{className:"grid gap-1",children:[h.jsx("h3",{className:"font-extrabold text-app-ink",children:`${n}. ${r}`}),h.jsx("p",{className:"text-app-muted",children:t})]}),h.jsx("div",{className:"grid gap-3",children:e})]})})}function Nv(){return{"copy-config":!1,"copy-url":!1,"create-account":!1,"create-database":!1,"create-project":!1,"enable-auth":!1,"paste-rules":!1,sync:!1}}function xM(){return typeof window>"u"?!1:typeof window.matchMedia=="function"?window.matchMedia("(max-width: 767px)").matches:window.innerWidth<=767}function kM(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const SM=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,IM=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,EM={};function Pv(e,t){return(EM.jsx?IM:SM).test(e)}const CM=/[ \t\n\f\r]/g;function AM(e){return typeof e=="object"?e.type==="text"?Dv(e.value):!1:Dv(e)}function Dv(e){return e.replace(CM,"")===""}class ya{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}ya.prototype.normal={};ya.prototype.property={};ya.prototype.space=void 0;function SS(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new ya(n,r,t)}function tp(e){return e.toLowerCase()}class Vt{constructor(t,n){this.attribute=n,this.property=t}}Vt.prototype.attribute="";Vt.prototype.booleanish=!1;Vt.prototype.boolean=!1;Vt.prototype.commaOrSpaceSeparated=!1;Vt.prototype.commaSeparated=!1;Vt.prototype.defined=!1;Vt.prototype.mustUseProperty=!1;Vt.prototype.number=!1;Vt.prototype.overloadedBoolean=!1;Vt.prototype.property="";Vt.prototype.spaceSeparated=!1;Vt.prototype.space=void 0;let TM=0;const te=Ai(),Je=Ai(),np=Ai(),U=Ai(),Ce=Ai(),ci=Ai(),Wt=Ai();function Ai(){return 2**++TM}const rp=Object.freeze(Object.defineProperty({__proto__:null,boolean:te,booleanish:Je,commaOrSpaceSeparated:Wt,commaSeparated:ci,number:U,overloadedBoolean:np,spaceSeparated:Ce},Symbol.toStringTag,{value:"Module"})),dd=Object.keys(rp);class fm extends Vt{constructor(t,n,r,i){let o=-1;if(super(t,n),Ov(this,"space",i),typeof r=="number")for(;++o<dd.length;){const s=dd[o];Ov(this,dd[o],(r&rp[s])===rp[s])}}}fm.prototype.defined=!0;function Ov(e,t,n){n&&(e[t]=n)}function Co(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const o=new fm(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),t[r]=o,n[tp(r)]=r,n[tp(o.attribute)]=r}return new ya(t,n,e.space)}const IS=Co({properties:{ariaActiveDescendant:null,ariaAtomic:Je,ariaAutoComplete:null,ariaBusy:Je,ariaChecked:Je,ariaColCount:U,ariaColIndex:U,ariaColSpan:U,ariaControls:Ce,ariaCurrent:null,ariaDescribedBy:Ce,ariaDetails:null,ariaDisabled:Je,ariaDropEffect:Ce,ariaErrorMessage:null,ariaExpanded:Je,ariaFlowTo:Ce,ariaGrabbed:Je,ariaHasPopup:null,ariaHidden:Je,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ce,ariaLevel:U,ariaLive:null,ariaModal:Je,ariaMultiLine:Je,ariaMultiSelectable:Je,ariaOrientation:null,ariaOwns:Ce,ariaPlaceholder:null,ariaPosInSet:U,ariaPressed:Je,ariaReadOnly:Je,ariaRelevant:null,ariaRequired:Je,ariaRoleDescription:Ce,ariaRowCount:U,ariaRowIndex:U,ariaRowSpan:U,ariaSelected:Je,ariaSetSize:U,ariaSort:null,ariaValueMax:U,ariaValueMin:U,ariaValueNow:U,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function ES(e,t){return t in e?e[t]:t}function CS(e,t){return ES(e,t.toLowerCase())}const RM=Co({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:ci,acceptCharset:Ce,accessKey:Ce,action:null,allow:null,allowFullScreen:te,allowPaymentRequest:te,allowUserMedia:te,alpha:te,alt:null,as:null,async:te,autoCapitalize:null,autoComplete:Ce,autoFocus:te,autoPlay:te,blocking:Ce,capture:null,charSet:null,checked:te,cite:null,className:Ce,closedBy:null,colorSpace:null,cols:U,colSpan:U,command:null,commandFor:null,content:null,contentEditable:Je,controls:te,controlsList:Ce,coords:U|ci,crossOrigin:null,data:null,dateTime:null,decoding:null,default:te,defer:te,dir:null,dirName:null,disabled:te,download:np,draggable:Je,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:te,formTarget:null,headers:Ce,height:U,hidden:np,high:U,href:null,hrefLang:null,htmlFor:Ce,httpEquiv:Ce,id:null,imageSizes:null,imageSrcSet:null,inert:te,inputMode:null,integrity:null,is:null,isMap:te,itemId:null,itemProp:Ce,itemRef:Ce,itemScope:te,itemType:Ce,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:te,low:U,manifest:null,max:null,maxLength:U,media:null,method:null,min:null,minLength:U,multiple:te,muted:te,name:null,nonce:null,noModule:te,noValidate:te,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:te,optimum:U,pattern:null,ping:Ce,placeholder:null,playsInline:te,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:te,referrerPolicy:null,rel:Ce,required:te,reversed:te,rows:U,rowSpan:U,sandbox:Ce,scope:null,scoped:te,seamless:te,selected:te,shadowRootClonable:te,shadowRootCustomElementRegistry:te,shadowRootDelegatesFocus:te,shadowRootMode:null,shadowRootSerializable:te,shape:null,size:U,sizes:null,slot:null,span:U,spellCheck:Je,src:null,srcDoc:null,srcLang:null,srcSet:null,start:U,step:null,style:null,tabIndex:U,target:null,title:null,translate:null,type:null,typeMustMatch:te,useMap:null,value:Je,width:U,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ce,axis:null,background:null,bgColor:null,border:U,borderColor:null,bottomMargin:U,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:te,declare:te,event:null,face:null,frame:null,frameBorder:null,hSpace:U,leftMargin:U,link:null,longDesc:null,lowSrc:null,marginHeight:U,marginWidth:U,noResize:te,noHref:te,noShade:te,noWrap:te,object:null,profile:null,prompt:null,rev:null,rightMargin:U,rules:null,scheme:null,scrolling:Je,standby:null,summary:null,text:null,topMargin:U,valueType:null,version:null,vAlign:null,vLink:null,vSpace:U,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:te,disablePictureInPicture:te,disableRemotePlayback:te,exportParts:ci,part:Ce,prefix:null,property:null,results:U,security:null,unselectable:null},space:"html",transform:CS}),NM=Co({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",maskType:"mask-type",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Wt,accentHeight:U,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:U,amplitude:U,arabicForm:null,ascent:U,attributeName:null,attributeType:null,azimuth:U,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:U,by:null,calcMode:null,capHeight:U,className:Ce,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:U,diffuseConstant:U,direction:null,display:null,dur:null,divisor:U,dominantBaseline:null,download:te,dx:null,dy:null,edgeMode:null,editable:null,elevation:U,enableBackground:null,end:null,event:null,exponent:U,externalResourcesRequired:null,fill:null,fillOpacity:U,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:ci,g2:ci,glyphName:ci,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:U,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:U,horizOriginX:U,horizOriginY:U,id:null,ideographic:U,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:U,k:U,k1:U,k2:U,k3:U,k4:U,kernelMatrix:Wt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:U,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:U,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:U,overlineThickness:U,paintOrder:null,panose1:null,path:null,pathLength:U,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ce,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:U,pointsAtY:U,pointsAtZ:U,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Wt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Wt,rev:Wt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Wt,requiredFeatures:Wt,requiredFonts:Wt,requiredFormats:Wt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:U,specularExponent:U,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:U,strikethroughThickness:U,string:null,stroke:null,strokeDashArray:Wt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:U,strokeOpacity:U,strokeWidth:null,style:null,surfaceScale:U,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Wt,tabIndex:U,tableValues:null,target:null,targetX:U,targetY:U,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Wt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:U,underlineThickness:U,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:U,values:null,vAlphabetic:U,vMathematical:U,vectorEffect:null,vHanging:U,vIdeographic:U,version:null,vertAdvY:U,vertOriginX:U,vertOriginY:U,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:U,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:ES}),AS=Co({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),TS=Co({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:CS}),RS=Co({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),PM={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},DM=/[A-Z]/g,Lv=/-[a-z]/g,OM=/^data[-\w.:]+$/i;function LM(e,t){const n=tp(t);let r=t,i=Vt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&OM.test(t)){if(t.charAt(4)==="-"){const o=t.slice(5).replace(Lv,jM);r="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=t.slice(4);if(!Lv.test(o)){let s=o.replace(DM,MM);s.charAt(0)!=="-"&&(s="-"+s),t="data"+s}}i=fm}return new i(r,t)}function MM(e){return"-"+e.toLowerCase()}function jM(e){return e.charAt(1).toUpperCase()}const FM=SS([IS,RM,AS,TS,RS],"html"),pm=SS([IS,NM,AS,TS,RS],"svg");function UM(e){return e.join(" ").trim()}var hm={},Mv=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,zM=/\n/g,BM=/^\s*/,VM=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,$M=/^:\s*/,HM=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,WM=/^[;\s]*/,qM=/^\s+|\s+$/g,KM=`
`,jv="/",Fv="*",ei="",GM="comment",YM="declaration";function QM(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(m){var w=m.match(zM);w&&(n+=w.length);var C=m.lastIndexOf(KM);r=~C?m.length-C:r+m.length}function o(){var m={line:n,column:r};return function(w){return w.position=new s(m),u(),w}}function s(m){this.start=m,this.end={line:n,column:r},this.source=t.source}s.prototype.content=e;function a(m){var w=new Error(t.source+":"+n+":"+r+": "+m);if(w.reason=m,w.filename=t.source,w.line=n,w.column=r,w.source=e,!t.silent)throw w}function l(m){var w=m.exec(e);if(w){var C=w[0];return i(C),e=e.slice(C.length),w}}function u(){l(BM)}function d(m){var w;for(m=m||[];w=c();)w!==!1&&m.push(w);return m}function c(){var m=o();if(!(jv!=e.charAt(0)||Fv!=e.charAt(1))){for(var w=2;ei!=e.charAt(w)&&(Fv!=e.charAt(w)||jv!=e.charAt(w+1));)++w;if(w+=2,ei===e.charAt(w-1))return a("End of comment missing");var C=e.slice(2,w-2);return r+=2,i(C),e=e.slice(w),r+=2,m({type:GM,comment:C})}}function f(){var m=o(),w=l(VM);if(w){if(c(),!l($M))return a("property missing ':'");var C=l(HM),y=m({type:YM,property:Uv(w[0].replace(Mv,ei)),value:C?Uv(C[0].replace(Mv,ei)):ei});return l(WM),y}}function p(){var m=[];d(m);for(var w;w=f();)w!==!1&&(m.push(w),d(m));return m}return u(),p()}function Uv(e){return e?e.replace(qM,ei):ei}var JM=QM,XM=_l&&_l.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(hm,"__esModule",{value:!0});hm.default=ej;const ZM=XM(JM);function ej(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,ZM.default)(e),i=typeof t=="function";return r.forEach(o=>{if(o.type!=="declaration")return;const{property:s,value:a}=o;i?t(s,a,o):a&&(n=n||{},n[s]=a)}),n}var ic={};Object.defineProperty(ic,"__esModule",{value:!0});ic.camelCase=void 0;var tj=/^--[a-zA-Z0-9_-]+$/,nj=/-([a-z])/g,rj=/^[^-]+$/,ij=/^-(webkit|moz|ms|o|khtml)-/,oj=/^-(ms)-/,sj=function(e){return!e||rj.test(e)||tj.test(e)},aj=function(e,t){return t.toUpperCase()},zv=function(e,t){return"".concat(t,"-")},lj=function(e,t){return t===void 0&&(t={}),sj(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(oj,zv):e=e.replace(ij,zv),e.replace(nj,aj))};ic.camelCase=lj;var uj=_l&&_l.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},cj=uj(hm),dj=ic;function ip(e,t){var n={};return!e||typeof e!="string"||(0,cj.default)(e,function(r,i){r&&i&&(n[(0,dj.camelCase)(r,t)]=i)}),n}ip.default=ip;var fj=ip;const pj=hp(fj),NS=PS("end"),mm=PS("start");function PS(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function hj(e){const t=mm(e),n=NS(e);if(t&&n)return{start:t,end:n}}function fs(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Bv(e.position):"start"in e||"end"in e?Bv(e):"line"in e||"column"in e?op(e):""}function op(e){return Vv(e&&e.line)+":"+Vv(e&&e.column)}function Bv(e){return op(e&&e.start)+"-"+op(e&&e.end)}function Vv(e){return e&&typeof e=="number"?e:1}class kt extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",o={},s=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof t=="string"?i=t:!o.cause&&t&&(s=!0,i=t.message,o.cause=t),!o.ruleId&&!o.source&&typeof r=="string"){const l=r.indexOf(":");l===-1?o.ruleId=r:(o.source=r.slice(0,l),o.ruleId=r.slice(l+1))}if(!o.place&&o.ancestors&&o.ancestors){const l=o.ancestors[o.ancestors.length-1];l&&(o.place=l.position)}const a=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=a?a.line:void 0,this.name=fs(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=s&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}kt.prototype.file="";kt.prototype.name="";kt.prototype.reason="";kt.prototype.message="";kt.prototype.stack="";kt.prototype.column=void 0;kt.prototype.line=void 0;kt.prototype.ancestors=void 0;kt.prototype.cause=void 0;kt.prototype.fatal=void 0;kt.prototype.place=void 0;kt.prototype.ruleId=void 0;kt.prototype.source=void 0;const gm={}.hasOwnProperty,mj=new Map,gj=/[A-Z]/g,yj=new Set(["table","tbody","thead","tfoot","tr"]),vj=new Set(["td","th"]),DS="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function wj(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=Cj(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=Ej(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?pm:FM,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},o=OS(i,e,void 0);return o&&typeof o!="string"?o:i.create(e,i.Fragment,{children:o||void 0},void 0)}function OS(e,t,n){if(t.type==="element")return _j(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return bj(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return kj(e,t,n);if(t.type==="mdxjsEsm")return xj(e,t);if(t.type==="root")return Sj(e,t,n);if(t.type==="text")return Ij(e,t)}function _j(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=pm,e.schema=i),e.ancestors.push(t);const o=MS(e,t.tagName,!1),s=Aj(e,t);let a=vm(e,t);return yj.has(t.tagName)&&(a=a.filter(function(l){return typeof l=="string"?!AM(l):!0})),LS(e,s,o,t),ym(s,a),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function bj(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}Hs(e,t.position)}function xj(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Hs(e,t.position)}function kj(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=pm,e.schema=i),e.ancestors.push(t);const o=t.name===null?e.Fragment:MS(e,t.name,!0),s=Tj(e,t),a=vm(e,t);return LS(e,s,o,t),ym(s,a),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function Sj(e,t,n){const r={};return ym(r,vm(e,t)),e.create(t,e.Fragment,r,n)}function Ij(e,t){return t.value}function LS(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function ym(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function Ej(e,t,n){return r;function r(i,o,s,a){const u=Array.isArray(s.children)?n:t;return a?u(o,s,a):u(o,s)}}function Cj(e,t){return n;function n(r,i,o,s){const a=Array.isArray(o.children),l=mm(r);return t(i,o,s,a,{columnNumber:l?l.column-1:void 0,fileName:e,lineNumber:l?l.line:void 0},void 0)}}function Aj(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&gm.call(t.properties,i)){const o=Rj(e,i,t.properties[i]);if(o){const[s,a]=o;e.tableCellAlignToStyle&&s==="align"&&typeof a=="string"&&vj.has(t.tagName)?r=a:n[s]=a}}if(r){const o=n.style||(n.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function Tj(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const o=r.data.estree.body[0];o.type;const s=o.expression;s.type;const a=s.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Hs(e,t.position);else{const i=r.name;let o;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,o=e.evaluater.evaluateExpression(a.expression)}else Hs(e,t.position);else o=r.value===null?!0:r.value;n[i]=o}return n}function vm(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:mj;for(;++r<t.children.length;){const o=t.children[r];let s;if(e.passKeys){const l=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(l){const u=i.get(l)||0;s=l+"-"+u,i.set(l,u+1)}}const a=OS(e,o,s);a!==void 0&&n.push(a)}return n}function Rj(e,t,n){const r=LM(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?kM(n):UM(n)),r.property==="style"){let i=typeof n=="object"?n:Nj(e,String(n));return e.stylePropertyNameCase==="css"&&(i=Pj(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?PM[r.property]||r.property:r.attribute,n]}}function Nj(e,t){try{return pj(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new kt("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=DS+"#cannot-parse-style-attribute",i}}function MS(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let o=-1,s;for(;++o<i.length;){const a=Pv(i[o])?{type:"Identifier",name:i[o]}:{type:"Literal",value:i[o]};s=s?{type:"MemberExpression",object:s,property:a,computed:!!(o&&a.type==="Literal"),optional:!1}:a}r=s}else r=Pv(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return gm.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);Hs(e)}function Hs(e,t){const n=new kt("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=DS+"#cannot-handle-mdx-estrees-without-createevaluater",n}function Pj(e){const t={};let n;for(n in e)gm.call(e,n)&&(t[Dj(n)]=e[n]);return t}function Dj(e){let t=e.replace(gj,Oj);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function Oj(e){return"-"+e.toLowerCase()}const fd={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},Lj={};function wm(e,t){const n=Lj,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return jS(e,r,i)}function jS(e,t,n){if(Mj(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return $v(e.children,t,n)}return Array.isArray(e)?$v(e,t,n):""}function $v(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=jS(e[i],t,n);return r.join("")}function Mj(e){return!!(e&&typeof e=="object")}const Hv=document.createElement("i");function _m(e){const t="&"+e+";";Hv.innerHTML=t;const n=Hv.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function Yt(e,t,n,r){const i=e.length;let o=0,s;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)s=Array.from(r),s.unshift(t,n),e.splice(...s);else for(n&&e.splice(t,n);o<r.length;)s=r.slice(o,o+1e4),s.unshift(t,0),e.splice(...s),o+=1e4,t+=1e4}function rn(e,t){return e.length>0?(Yt(e,e.length,0,t),e):t}const Wv={}.hasOwnProperty;function FS(e){const t={};let n=-1;for(;++n<e.length;)jj(t,e[n]);return t}function jj(e,t){let n;for(n in t){const i=(Wv.call(e,n)?e[n]:void 0)||(e[n]={}),o=t[n];let s;if(o)for(s in o){Wv.call(i,s)||(i[s]=[]);const a=o[s];Fj(i[s],Array.isArray(a)?a:a?[a]:[])}}}function Fj(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);Yt(e,0,0,r)}function US(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function _n(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const It=Kr(/[A-Za-z]/),bt=Kr(/[\dA-Za-z]/),Uj=Kr(/[#-'*+\--9=?A-Z^-~]/);function yu(e){return e!==null&&(e<32||e===127)}const sp=Kr(/\d/),zj=Kr(/[\dA-Fa-f]/),Bj=Kr(/[!-/:-@[-`{-~]/);function Y(e){return e!==null&&e<-2}function Ae(e){return e!==null&&(e<0||e===32)}function ce(e){return e===-2||e===-1||e===32}const oc=Kr(new RegExp("\\p{P}|\\p{S}","u")),ki=Kr(/\s/);function Kr(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function Ao(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const o=e.charCodeAt(n);let s="";if(o===37&&bt(e.charCodeAt(n+1))&&bt(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(s=String.fromCharCode(o));else if(o>55295&&o<57344){const a=e.charCodeAt(n+1);o<56320&&a>56319&&a<57344?(s=String.fromCharCode(o,a),i=1):s="�"}else s=String.fromCharCode(o);s&&(t.push(e.slice(r,n),encodeURIComponent(s)),r=n+i+1,s=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function me(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return s;function s(l){return ce(l)?(e.enter(n),a(l)):t(l)}function a(l){return ce(l)&&o++<i?(e.consume(l),a):(e.exit(n),t(l))}}const Vj={tokenize:$j};function $j(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),me(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),o(a)}function o(a){const l=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=l),n=l,s(a)}function s(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return Y(a)?(e.consume(a),e.exit("chunkText"),o):(e.consume(a),s)}}const Hj={tokenize:Wj},qv={tokenize:qj};function Wj(e){const t=this,n=[];let r=0,i,o,s;return a;function a(g){if(r<n.length){const k=n[r];return t.containerState=k[1],e.attempt(k[0].continuation,l,u)(g)}return u(g)}function l(g){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();const k=t.events.length;let S=k,x;for(;S--;)if(t.events[S][0]==="exit"&&t.events[S][1].type==="chunkFlow"){x=t.events[S][1].end;break}y(r);let A=k;for(;A<t.events.length;)t.events[A][1].end={...x},A++;return Yt(t.events,S+1,0,t.events.slice(k)),t.events.length=A,u(g)}return a(g)}function u(g){if(r===n.length){if(!i)return f(g);if(i.currentConstruct&&i.currentConstruct.concrete)return m(g);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(qv,d,c)(g)}function d(g){return i&&v(),y(r),f(g)}function c(g){return t.parser.lazy[t.now().line]=r!==n.length,s=t.now().offset,m(g)}function f(g){return t.containerState={},e.attempt(qv,p,m)(g)}function p(g){return r++,n.push([t.currentConstruct,t.containerState]),f(g)}function m(g){if(g===null){i&&v(),y(0),e.consume(g);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:o}),w(g)}function w(g){if(g===null){C(e.exit("chunkFlow"),!0),y(0),e.consume(g);return}return Y(g)?(e.consume(g),C(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(g),w)}function C(g,k){const S=t.sliceStream(g);if(k&&S.push(null),g.previous=o,o&&(o.next=g),o=g,i.defineSkip(g.start),i.write(S),t.parser.lazy[g.start.line]){let x=i.events.length;for(;x--;)if(i.events[x][1].start.offset<s&&(!i.events[x][1].end||i.events[x][1].end.offset>s))return;const A=t.events.length;let R=A,D,E;for(;R--;)if(t.events[R][0]==="exit"&&t.events[R][1].type==="chunkFlow"){if(D){E=t.events[R][1].end;break}D=!0}for(y(r),x=A;x<t.events.length;)t.events[x][1].end={...E},x++;Yt(t.events,R+1,0,t.events.slice(A)),t.events.length=x}}function y(g){let k=n.length;for(;k-- >g;){const S=n[k];t.containerState=S[1],S[0].exit.call(t,e)}n.length=g}function v(){i.write([null]),o=void 0,i=void 0,t.containerState._closeFlow=void 0}}function qj(e,t,n){return me(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function yo(e){if(e===null||Ae(e)||ki(e))return 1;if(oc(e))return 2}function sc(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const o=e[i].resolveAll;o&&!r.includes(o)&&(t=o(t,n),r.push(o))}return t}const ap={name:"attention",resolveAll:Kj,tokenize:Gj};function Kj(e,t){let n=-1,r,i,o,s,a,l,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;l=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const c={...e[r][1].end},f={...e[n][1].start};Kv(c,-l),Kv(f,l),s={type:l>1?"strongSequence":"emphasisSequence",start:c,end:{...e[r][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:f},o={type:l>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:l>1?"strong":"emphasis",start:{...s.start},end:{...a.end}},e[r][1].end={...s.start},e[n][1].start={...a.end},u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=rn(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=rn(u,[["enter",i,t],["enter",s,t],["exit",s,t],["enter",o,t]]),u=rn(u,sc(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=rn(u,[["exit",o,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=rn(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,Yt(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Gj(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=yo(r);let o;return s;function s(l){return o=l,e.enter("attentionSequence"),a(l)}function a(l){if(l===o)return e.consume(l),a;const u=e.exit("attentionSequence"),d=yo(l),c=!d||d===2&&i||n.includes(l),f=!i||i===2&&d||n.includes(r);return u._open=!!(o===42?c:c&&(i||!f)),u._close=!!(o===42?f:f&&(d||!c)),t(l)}}function Kv(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const Yj={name:"autolink",tokenize:Qj};function Qj(e,t,n){let r=0;return i;function i(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(p){return It(p)?(e.consume(p),s):p===64?n(p):u(p)}function s(p){return p===43||p===45||p===46||bt(p)?(r=1,a(p)):u(p)}function a(p){return p===58?(e.consume(p),r=0,l):(p===43||p===45||p===46||bt(p))&&r++<32?(e.consume(p),a):(r=0,u(p))}function l(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||yu(p)?n(p):(e.consume(p),l)}function u(p){return p===64?(e.consume(p),d):Uj(p)?(e.consume(p),u):n(p)}function d(p){return bt(p)?c(p):n(p)}function c(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):f(p)}function f(p){if((p===45||bt(p))&&r++<63){const m=p===45?f:c;return e.consume(p),m}return n(p)}}const va={partial:!0,tokenize:Jj};function Jj(e,t,n){return r;function r(o){return ce(o)?me(e,i,"linePrefix")(o):i(o)}function i(o){return o===null||Y(o)?t(o):n(o)}}const zS={continuation:{tokenize:Zj},exit:e2,name:"blockQuote",tokenize:Xj};function Xj(e,t,n){const r=this;return i;function i(s){if(s===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(s),e.exit("blockQuoteMarker"),o}return n(s)}function o(s){return ce(s)?(e.enter("blockQuotePrefixWhitespace"),e.consume(s),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(s))}}function Zj(e,t,n){const r=this;return i;function i(s){return ce(s)?me(e,o,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s):o(s)}function o(s){return e.attempt(zS,t,n)(s)}}function e2(e){e.exit("blockQuote")}const BS={name:"characterEscape",tokenize:t2};function t2(e,t,n){return r;function r(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),i}function i(o){return Bj(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(o)}}const VS={name:"characterReference",tokenize:n2};function n2(e,t,n){const r=this;let i=0,o,s;return a;function a(c){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),l}function l(c){return c===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(c),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),o=31,s=bt,d(c))}function u(c){return c===88||c===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(c),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,s=zj,d):(e.enter("characterReferenceValue"),o=7,s=sp,d(c))}function d(c){if(c===59&&i){const f=e.exit("characterReferenceValue");return s===bt&&!_m(r.sliceSerialize(f))?n(c):(e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return s(c)&&i++<o?(e.consume(c),d):n(c)}}const Gv={partial:!0,tokenize:i2},Yv={concrete:!0,name:"codeFenced",tokenize:r2};function r2(e,t,n){const r=this,i={partial:!0,tokenize:S};let o=0,s=0,a;return l;function l(x){return u(x)}function u(x){const A=r.events[r.events.length-1];return o=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=x,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(x)}function d(x){return x===a?(s++,e.consume(x),d):s<3?n(x):(e.exit("codeFencedFenceSequence"),ce(x)?me(e,c,"whitespace")(x):c(x))}function c(x){return x===null||Y(x)?(e.exit("codeFencedFence"),r.interrupt?t(x):e.check(Gv,w,k)(x)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(x))}function f(x){return x===null||Y(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(x)):ce(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),me(e,p,"whitespace")(x)):x===96&&x===a?n(x):(e.consume(x),f)}function p(x){return x===null||Y(x)?c(x):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),m(x))}function m(x){return x===null||Y(x)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(x)):x===96&&x===a?n(x):(e.consume(x),m)}function w(x){return e.attempt(i,k,C)(x)}function C(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),y}function y(x){return o>0&&ce(x)?me(e,v,"linePrefix",o+1)(x):v(x)}function v(x){return x===null||Y(x)?e.check(Gv,w,k)(x):(e.enter("codeFlowValue"),g(x))}function g(x){return x===null||Y(x)?(e.exit("codeFlowValue"),v(x)):(e.consume(x),g)}function k(x){return e.exit("codeFenced"),t(x)}function S(x,A,R){let D=0;return E;function E(ne){return x.enter("lineEnding"),x.consume(ne),x.exit("lineEnding"),F}function F(ne){return x.enter("codeFencedFence"),ce(ne)?me(x,V,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(ne):V(ne)}function V(ne){return ne===a?(x.enter("codeFencedFenceSequence"),Q(ne)):R(ne)}function Q(ne){return ne===a?(D++,x.consume(ne),Q):D>=s?(x.exit("codeFencedFenceSequence"),ce(ne)?me(x,Z,"whitespace")(ne):Z(ne)):R(ne)}function Z(ne){return ne===null||Y(ne)?(x.exit("codeFencedFence"),A(ne)):R(ne)}}}function i2(e,t,n){const r=this;return i;function i(s){return s===null?n(s):(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}const pd={name:"codeIndented",tokenize:s2},o2={partial:!0,tokenize:a2};function s2(e,t,n){const r=this;return i;function i(u){return e.enter("codeIndented"),me(e,o,"linePrefix",5)(u)}function o(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?s(u):n(u)}function s(u){return u===null?l(u):Y(u)?e.attempt(o2,s,l)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||Y(u)?(e.exit("codeFlowValue"),s(u)):(e.consume(u),a)}function l(u){return e.exit("codeIndented"),t(u)}}function a2(e,t,n){const r=this;return i;function i(s){return r.parser.lazy[r.now().line]?n(s):Y(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),i):me(e,o,"linePrefix",5)(s)}function o(s){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(s):Y(s)?i(s):n(s)}}const l2={name:"codeText",previous:c2,resolve:u2,tokenize:d2};function u2(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function c2(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function d2(e,t,n){let r=0,i,o;return s;function s(c){return e.enter("codeText"),e.enter("codeTextSequence"),a(c)}function a(c){return c===96?(e.consume(c),r++,a):(e.exit("codeTextSequence"),l(c))}function l(c){return c===null?n(c):c===32?(e.enter("space"),e.consume(c),e.exit("space"),l):c===96?(o=e.enter("codeTextSequence"),i=0,d(c)):Y(c)?(e.enter("lineEnding"),e.consume(c),e.exit("lineEnding"),l):(e.enter("codeTextData"),u(c))}function u(c){return c===null||c===32||c===96||Y(c)?(e.exit("codeTextData"),l(c)):(e.consume(c),u)}function d(c){return c===96?(e.consume(c),i++,d):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(c)):(o.type="codeTextData",u(c))}}class f2{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const o=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&Wo(this.left,r),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Wo(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Wo(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);Wo(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Wo(this.left,n.reverse())}}}function Wo(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function $S(e){const t={};let n=-1,r,i,o,s,a,l,u;const d=new f2(e);for(;++n<d.length;){for(;n in t;)n=t[n];if(r=d.get(n),n&&r[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(l=r[1]._tokenizer.events,o=0,o<l.length&&l[o][1].type==="lineEndingBlank"&&(o+=2),o<l.length&&l[o][1].type==="content"))for(;++o<l.length&&l[o][1].type!=="content";)l[o][1].type==="chunkText"&&(l[o][1]._isInFirstContentOfListItem=!0,o++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,p2(d,n)),n=t[n],u=!0);else if(r[1]._container){for(o=n,i=void 0;o--;)if(s=d.get(o),s[1].type==="lineEnding"||s[1].type==="lineEndingBlank")s[0]==="enter"&&(i&&(d.get(i)[1].type="lineEndingBlank"),s[1].type="lineEnding",i=o);else if(!(s[1].type==="linePrefix"||s[1].type==="listItemIndent"))break;i&&(r[1].end={...d.get(i)[1].start},a=d.slice(i,n),a.unshift(r),d.splice(i,n-i+1,a))}}return Yt(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!u}function p2(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const o=[];let s=n._tokenizer;s||(s=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));const a=s.events,l=[],u={};let d,c,f=-1,p=n,m=0,w=0;const C=[w];for(;p;){for(;e.get(++i)[1]!==p;);o.push(i),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),c&&s.defineSkip(p.start),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(d),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),c=p,p=p.next}for(p=n;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(w=f+1,C.push(w),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(s.events=[],p?(p._tokenizer=void 0,p.previous=void 0):C.pop(),f=C.length;f--;){const y=a.slice(C[f],C[f+1]),v=o.pop();l.push([v,v+y.length-1]),e.splice(v,2,y)}for(l.reverse(),f=-1;++f<l.length;)u[m+l[f][0]]=m+l[f][1],m+=l[f][1]-l[f][0]-1;return u}const h2={resolve:g2,tokenize:y2},m2={partial:!0,tokenize:v2};function g2(e){return $S(e),e}function y2(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?o(a):Y(a)?e.check(m2,s,o)(a):(e.consume(a),i)}function o(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function s(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function v2(e,t,n){const r=this;return i;function i(s){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),me(e,o,"linePrefix")}function o(s){if(s===null||Y(s))return n(s);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(s):e.interrupt(r.parser.constructs.flow,n,t)(s)}}function HS(e,t,n,r,i,o,s,a,l){const u=l||Number.POSITIVE_INFINITY;let d=0;return c;function c(y){return y===60?(e.enter(r),e.enter(i),e.enter(o),e.consume(y),e.exit(o),f):y===null||y===32||y===41||yu(y)?n(y):(e.enter(r),e.enter(s),e.enter(a),e.enter("chunkString",{contentType:"string"}),w(y))}function f(y){return y===62?(e.enter(o),e.consume(y),e.exit(o),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(y))}function p(y){return y===62?(e.exit("chunkString"),e.exit(a),f(y)):y===null||y===60||Y(y)?n(y):(e.consume(y),y===92?m:p)}function m(y){return y===60||y===62||y===92?(e.consume(y),p):p(y)}function w(y){return!d&&(y===null||y===41||Ae(y))?(e.exit("chunkString"),e.exit(a),e.exit(s),e.exit(r),t(y)):d<u&&y===40?(e.consume(y),d++,w):y===41?(e.consume(y),d--,w):y===null||y===32||y===40||yu(y)?n(y):(e.consume(y),y===92?C:w)}function C(y){return y===40||y===41||y===92?(e.consume(y),w):w(y)}}function WS(e,t,n,r,i,o){const s=this;let a=0,l;return u;function u(p){return e.enter(r),e.enter(i),e.consume(p),e.exit(i),e.enter(o),d}function d(p){return a>999||p===null||p===91||p===93&&!l||p===94&&!a&&"_hiddenFootnoteSupport"in s.parser.constructs?n(p):p===93?(e.exit(o),e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):Y(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),c(p))}function c(p){return p===null||p===91||p===93||Y(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),l||(l=!ce(p)),p===92?f:c)}function f(p){return p===91||p===92||p===93?(e.consume(p),a++,c):c(p)}}function qS(e,t,n,r,i,o){let s;return a;function a(f){return f===34||f===39||f===40?(e.enter(r),e.enter(i),e.consume(f),e.exit(i),s=f===40?41:f,l):n(f)}function l(f){return f===s?(e.enter(i),e.consume(f),e.exit(i),e.exit(r),t):(e.enter(o),u(f))}function u(f){return f===s?(e.exit(o),l(s)):f===null?n(f):Y(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),me(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===s||f===null||Y(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?c:d)}function c(f){return f===s||f===92?(e.consume(f),d):d(f)}}function ps(e,t){let n;return r;function r(i){return Y(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):ce(i)?me(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const w2={name:"definition",tokenize:b2},_2={partial:!0,tokenize:x2};function b2(e,t,n){const r=this;let i;return o;function o(p){return e.enter("definition"),s(p)}function s(p){return WS.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=_n(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),l):n(p)}function l(p){return Ae(p)?ps(e,u)(p):u(p)}function u(p){return HS(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(_2,c,c)(p)}function c(p){return ce(p)?me(e,f,"whitespace")(p):f(p)}function f(p){return p===null||Y(p)?(e.exit("definition"),r.parser.defined.push(i),t(p)):n(p)}}function x2(e,t,n){return r;function r(a){return Ae(a)?ps(e,i)(a):n(a)}function i(a){return qS(e,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function o(a){return ce(a)?me(e,s,"whitespace")(a):s(a)}function s(a){return a===null||Y(a)?t(a):n(a)}}const k2={name:"hardBreakEscape",tokenize:S2};function S2(e,t,n){return r;function r(o){return e.enter("hardBreakEscape"),e.consume(o),i}function i(o){return Y(o)?(e.exit("hardBreakEscape"),t(o)):n(o)}}const I2={name:"headingAtx",resolve:E2,tokenize:C2};function E2(e,t){let n=e.length-2,r=3,i,o;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},o={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},Yt(e,r,n-r+1,[["enter",i,t],["enter",o,t],["exit",o,t],["exit",i,t]])),e}function C2(e,t,n){let r=0;return i;function i(d){return e.enter("atxHeading"),o(d)}function o(d){return e.enter("atxHeadingSequence"),s(d)}function s(d){return d===35&&r++<6?(e.consume(d),s):d===null||Ae(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),l(d)):d===null||Y(d)?(e.exit("atxHeading"),t(d)):ce(d)?me(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function l(d){return d===35?(e.consume(d),l):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||Ae(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const A2=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Qv=["pre","script","style","textarea"],T2={concrete:!0,name:"htmlFlow",resolveTo:P2,tokenize:D2},R2={partial:!0,tokenize:L2},N2={partial:!0,tokenize:O2};function P2(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function D2(e,t,n){const r=this;let i,o,s,a,l;return u;function u(I){return d(I)}function d(I){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(I),c}function c(I){return I===33?(e.consume(I),f):I===47?(e.consume(I),o=!0,w):I===63?(e.consume(I),i=3,r.interrupt?t:_):It(I)?(e.consume(I),s=String.fromCharCode(I),C):n(I)}function f(I){return I===45?(e.consume(I),i=2,p):I===91?(e.consume(I),i=5,a=0,m):It(I)?(e.consume(I),i=4,r.interrupt?t:_):n(I)}function p(I){return I===45?(e.consume(I),r.interrupt?t:_):n(I)}function m(I){const ke="CDATA[";return I===ke.charCodeAt(a++)?(e.consume(I),a===ke.length?r.interrupt?t:V:m):n(I)}function w(I){return It(I)?(e.consume(I),s=String.fromCharCode(I),C):n(I)}function C(I){if(I===null||I===47||I===62||Ae(I)){const ke=I===47,je=s.toLowerCase();return!ke&&!o&&Qv.includes(je)?(i=1,r.interrupt?t(I):V(I)):A2.includes(s.toLowerCase())?(i=6,ke?(e.consume(I),y):r.interrupt?t(I):V(I)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(I):o?v(I):g(I))}return I===45||bt(I)?(e.consume(I),s+=String.fromCharCode(I),C):n(I)}function y(I){return I===62?(e.consume(I),r.interrupt?t:V):n(I)}function v(I){return ce(I)?(e.consume(I),v):E(I)}function g(I){return I===47?(e.consume(I),E):I===58||I===95||It(I)?(e.consume(I),k):ce(I)?(e.consume(I),g):E(I)}function k(I){return I===45||I===46||I===58||I===95||bt(I)?(e.consume(I),k):S(I)}function S(I){return I===61?(e.consume(I),x):ce(I)?(e.consume(I),S):g(I)}function x(I){return I===null||I===60||I===61||I===62||I===96?n(I):I===34||I===39?(e.consume(I),l=I,A):ce(I)?(e.consume(I),x):R(I)}function A(I){return I===l?(e.consume(I),l=null,D):I===null||Y(I)?n(I):(e.consume(I),A)}function R(I){return I===null||I===34||I===39||I===47||I===60||I===61||I===62||I===96||Ae(I)?S(I):(e.consume(I),R)}function D(I){return I===47||I===62||ce(I)?g(I):n(I)}function E(I){return I===62?(e.consume(I),F):n(I)}function F(I){return I===null||Y(I)?V(I):ce(I)?(e.consume(I),F):n(I)}function V(I){return I===45&&i===2?(e.consume(I),ye):I===60&&i===1?(e.consume(I),_e):I===62&&i===4?(e.consume(I),K):I===63&&i===3?(e.consume(I),_):I===93&&i===5?(e.consume(I),q):Y(I)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(R2,X,Q)(I)):I===null||Y(I)?(e.exit("htmlFlowData"),Q(I)):(e.consume(I),V)}function Q(I){return e.check(N2,Z,X)(I)}function Z(I){return e.enter("lineEnding"),e.consume(I),e.exit("lineEnding"),ne}function ne(I){return I===null||Y(I)?Q(I):(e.enter("htmlFlowData"),V(I))}function ye(I){return I===45?(e.consume(I),_):V(I)}function _e(I){return I===47?(e.consume(I),s="",z):V(I)}function z(I){if(I===62){const ke=s.toLowerCase();return Qv.includes(ke)?(e.consume(I),K):V(I)}return It(I)&&s.length<8?(e.consume(I),s+=String.fromCharCode(I),z):V(I)}function q(I){return I===93?(e.consume(I),_):V(I)}function _(I){return I===62?(e.consume(I),K):I===45&&i===2?(e.consume(I),_):V(I)}function K(I){return I===null||Y(I)?(e.exit("htmlFlowData"),X(I)):(e.consume(I),K)}function X(I){return e.exit("htmlFlow"),t(I)}}function O2(e,t,n){const r=this;return i;function i(s){return Y(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o):n(s)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}function L2(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(va,t,n)}}const M2={name:"htmlText",tokenize:j2};function j2(e,t,n){const r=this;let i,o,s;return a;function a(_){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(_),l}function l(_){return _===33?(e.consume(_),u):_===47?(e.consume(_),S):_===63?(e.consume(_),g):It(_)?(e.consume(_),R):n(_)}function u(_){return _===45?(e.consume(_),d):_===91?(e.consume(_),o=0,m):It(_)?(e.consume(_),v):n(_)}function d(_){return _===45?(e.consume(_),p):n(_)}function c(_){return _===null?n(_):_===45?(e.consume(_),f):Y(_)?(s=c,_e(_)):(e.consume(_),c)}function f(_){return _===45?(e.consume(_),p):c(_)}function p(_){return _===62?ye(_):_===45?f(_):c(_)}function m(_){const K="CDATA[";return _===K.charCodeAt(o++)?(e.consume(_),o===K.length?w:m):n(_)}function w(_){return _===null?n(_):_===93?(e.consume(_),C):Y(_)?(s=w,_e(_)):(e.consume(_),w)}function C(_){return _===93?(e.consume(_),y):w(_)}function y(_){return _===62?ye(_):_===93?(e.consume(_),y):w(_)}function v(_){return _===null||_===62?ye(_):Y(_)?(s=v,_e(_)):(e.consume(_),v)}function g(_){return _===null?n(_):_===63?(e.consume(_),k):Y(_)?(s=g,_e(_)):(e.consume(_),g)}function k(_){return _===62?ye(_):g(_)}function S(_){return It(_)?(e.consume(_),x):n(_)}function x(_){return _===45||bt(_)?(e.consume(_),x):A(_)}function A(_){return Y(_)?(s=A,_e(_)):ce(_)?(e.consume(_),A):ye(_)}function R(_){return _===45||bt(_)?(e.consume(_),R):_===47||_===62||Ae(_)?D(_):n(_)}function D(_){return _===47?(e.consume(_),ye):_===58||_===95||It(_)?(e.consume(_),E):Y(_)?(s=D,_e(_)):ce(_)?(e.consume(_),D):ye(_)}function E(_){return _===45||_===46||_===58||_===95||bt(_)?(e.consume(_),E):F(_)}function F(_){return _===61?(e.consume(_),V):Y(_)?(s=F,_e(_)):ce(_)?(e.consume(_),F):D(_)}function V(_){return _===null||_===60||_===61||_===62||_===96?n(_):_===34||_===39?(e.consume(_),i=_,Q):Y(_)?(s=V,_e(_)):ce(_)?(e.consume(_),V):(e.consume(_),Z)}function Q(_){return _===i?(e.consume(_),i=void 0,ne):_===null?n(_):Y(_)?(s=Q,_e(_)):(e.consume(_),Q)}function Z(_){return _===null||_===34||_===39||_===60||_===61||_===96?n(_):_===47||_===62||Ae(_)?D(_):(e.consume(_),Z)}function ne(_){return _===47||_===62||Ae(_)?D(_):n(_)}function ye(_){return _===62?(e.consume(_),e.exit("htmlTextData"),e.exit("htmlText"),t):n(_)}function _e(_){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(_),e.exit("lineEnding"),z}function z(_){return ce(_)?me(e,q,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(_):q(_)}function q(_){return e.enter("htmlTextData"),s(_)}}const bm={name:"labelEnd",resolveAll:B2,resolveTo:V2,tokenize:$2},F2={tokenize:H2},U2={tokenize:W2},z2={tokenize:q2};function B2(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&Yt(e,0,e.length,n),e}function V2(e,t){let n=e.length,r=0,i,o,s,a;for(;n--;)if(i=e[n][1],o){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(s){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(o=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(s=n);const l={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[o][1].start},end:{...e[s][1].end}},d={type:"labelText",start:{...e[o+r+2][1].end},end:{...e[s-2][1].start}};return a=[["enter",l,t],["enter",u,t]],a=rn(a,e.slice(o+1,o+r+3)),a=rn(a,[["enter",d,t]]),a=rn(a,sc(t.parser.constructs.insideSpan.null,e.slice(o+r+4,s-3),t)),a=rn(a,[["exit",d,t],e[s-2],e[s-1],["exit",u,t]]),a=rn(a,e.slice(s+1)),a=rn(a,[["exit",l,t]]),Yt(e,o,e.length,a),e}function $2(e,t,n){const r=this;let i=r.events.length,o,s;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){o=r.events[i][1];break}return a;function a(f){return o?o._inactive?c(f):(s=r.parser.defined.includes(_n(r.sliceSerialize({start:o.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),l):n(f)}function l(f){return f===40?e.attempt(F2,d,s?d:c)(f):f===91?e.attempt(U2,d,s?u:c)(f):s?d(f):c(f)}function u(f){return e.attempt(z2,d,c)(f)}function d(f){return t(f)}function c(f){return o._balanced=!0,n(f)}}function H2(e,t,n){return r;function r(c){return e.enter("resource"),e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),i}function i(c){return Ae(c)?ps(e,o)(c):o(c)}function o(c){return c===41?d(c):HS(e,s,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function s(c){return Ae(c)?ps(e,l)(c):d(c)}function a(c){return n(c)}function l(c){return c===34||c===39||c===40?qS(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):d(c)}function u(c){return Ae(c)?ps(e,d)(c):d(c)}function d(c){return c===41?(e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),e.exit("resource"),t):n(c)}}function W2(e,t,n){const r=this;return i;function i(a){return WS.call(r,e,o,s,"reference","referenceMarker","referenceString")(a)}function o(a){return r.parser.defined.includes(_n(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function s(a){return n(a)}}function q2(e,t,n){return r;function r(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),i}function i(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),t):n(o)}}const K2={name:"labelStartImage",resolveAll:bm.resolveAll,tokenize:G2};function G2(e,t,n){const r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),o}function o(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),s):n(a)}function s(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const Y2={name:"labelStartLink",resolveAll:bm.resolveAll,tokenize:Q2};function Q2(e,t,n){const r=this;return i;function i(s){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelLink"),o}function o(s){return s===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(s):t(s)}}const hd={name:"lineEnding",tokenize:J2};function J2(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),me(e,t,"linePrefix")}}const vl={name:"thematicBreak",tokenize:X2};function X2(e,t,n){let r=0,i;return o;function o(u){return e.enter("thematicBreak"),s(u)}function s(u){return i=u,a(u)}function a(u){return u===i?(e.enter("thematicBreakSequence"),l(u)):r>=3&&(u===null||Y(u))?(e.exit("thematicBreak"),t(u)):n(u)}function l(u){return u===i?(e.consume(u),r++,l):(e.exit("thematicBreakSequence"),ce(u)?me(e,a,"whitespace")(u):a(u))}}const Dt={continuation:{tokenize:nF},exit:iF,name:"list",tokenize:tF},Z2={partial:!0,tokenize:oF},eF={partial:!0,tokenize:rF};function tF(e,t,n){const r=this,i=r.events[r.events.length-1];let o=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,s=0;return a;function a(p){const m=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(m==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:sp(p)){if(r.containerState.type||(r.containerState.type=m,e.enter(m,{_container:!0})),m==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(vl,n,u)(p):u(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),l(p)}return n(p)}function l(p){return sp(p)&&++s<10?(e.consume(p),l):(!r.interrupt||s<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(va,r.interrupt?n:d,e.attempt(Z2,f,c))}function d(p){return r.containerState.initialBlankLine=!0,o++,f(p)}function c(p){return ce(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return r.containerState.size=o+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function nF(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(va,i,o);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,me(e,t,"listItemIndent",r.containerState.size+1)(a)}function o(a){return r.containerState.furtherBlankLines||!ce(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,s(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(eF,t,s)(a))}function s(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,me(e,e.attempt(Dt,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function rF(e,t,n){const r=this;return me(e,i,"listItemIndent",r.containerState.size+1);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="listItemIndent"&&s[2].sliceSerialize(s[1],!0).length===r.containerState.size?t(o):n(o)}}function iF(e){e.exit(this.containerState.type)}function oF(e,t,n){const r=this;return me(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(o){const s=r.events[r.events.length-1];return!ce(o)&&s&&s[1].type==="listItemPrefixWhitespace"?t(o):n(o)}}const Jv={name:"setextUnderline",resolveTo:sF,tokenize:aF};function sF(e,t){let n=e.length,r,i,o;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!o&&e[n][1].type==="definition"&&(o=n);const s={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",o?(e.splice(i,0,["enter",s,t]),e.splice(o+1,0,["exit",e[r][1],t]),e[r][1].end={...e[o][1].end}):e[r][1]=s,e.push(["exit",s,t]),e}function aF(e,t,n){const r=this;let i;return o;function o(u){let d=r.events.length,c;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){c=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(e.enter("setextHeadingLine"),i=u,s(u)):n(u)}function s(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===i?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),ce(u)?me(e,l,"lineSuffix")(u):l(u))}function l(u){return u===null||Y(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const lF={tokenize:uF};function uF(e){const t=this,n=e.attempt(va,r,e.attempt(this.parser.constructs.flowInitial,i,me(e,e.attempt(this.parser.constructs.flow,i,e.attempt(h2,i)),"linePrefix")));return n;function r(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const cF={resolveAll:GS()},dF=KS("string"),fF=KS("text");function KS(e){return{resolveAll:GS(e==="text"?pF:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],o=n.attempt(i,s,a);return s;function s(d){return u(d)?o(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),l}function l(d){return u(d)?(n.exit("data"),o(d)):(n.consume(d),l)}function u(d){if(d===null)return!0;const c=i[d];let f=-1;if(c)for(;++f<c.length;){const p=c[f];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function GS(e){return t;function t(n,r){let i=-1,o;for(;++i<=n.length;)o===void 0?n[i]&&n[i][1].type==="data"&&(o=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==o+2&&(n[o][1].end=n[i-1][1].end,n.splice(o+2,i-o-2),i=o+2),o=void 0);return e?e(n,r):n}}function pF(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let o=i.length,s=-1,a=0,l;for(;o--;){const u=i[o];if(typeof u=="string"){for(s=u.length;u.charCodeAt(s-1)===32;)a++,s--;if(s)break;s=-1}else if(u===-2)l=!0,a++;else if(u!==-1){o++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(a=0),a){const u={type:n===e.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?s:r.start._bufferIndex+s,_index:r.start._index+o,line:r.end.line,column:r.end.column-a,offset:r.end.offset-a},end:{...r.end}};r.end={...u.start},r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}const hF={42:Dt,43:Dt,45:Dt,48:Dt,49:Dt,50:Dt,51:Dt,52:Dt,53:Dt,54:Dt,55:Dt,56:Dt,57:Dt,62:zS},mF={91:w2},gF={[-2]:pd,[-1]:pd,32:pd},yF={35:I2,42:vl,45:[Jv,vl],60:T2,61:Jv,95:vl,96:Yv,126:Yv},vF={38:VS,92:BS},wF={[-5]:hd,[-4]:hd,[-3]:hd,33:K2,38:VS,42:ap,60:[Yj,M2],91:Y2,92:[k2,BS],93:bm,95:ap,96:l2},_F={null:[ap,cF]},bF={null:[42,95]},xF={null:[]},kF=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:bF,contentInitial:mF,disable:xF,document:hF,flow:yF,flowInitial:gF,insideSpan:_F,string:vF,text:wF},Symbol.toStringTag,{value:"Module"}));function SF(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},o=[];let s=[],a=[];const l={attempt:A(S),check:A(x),consume:v,enter:g,exit:k,interrupt:A(x,{interrupt:!0})},u={code:null,containerState:{},defineSkip:w,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:c};let d=t.tokenize.call(u,l);return t.resolveAll&&o.push(t),u;function c(F){return s=rn(s,F),C(),s[s.length-1]!==null?[]:(R(t,0),u.events=sc(o,u.events,u),u.events)}function f(F,V){return EF(p(F),V)}function p(F){return IF(s,F)}function m(){const{_bufferIndex:F,_index:V,line:Q,column:Z,offset:ne}=r;return{_bufferIndex:F,_index:V,line:Q,column:Z,offset:ne}}function w(F){i[F.line]=F.column,E()}function C(){let F;for(;r._index<s.length;){const V=s[r._index];if(typeof V=="string")for(F=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===F&&r._bufferIndex<V.length;)y(V.charCodeAt(r._bufferIndex));else y(V)}}function y(F){d=d(F)}function v(F){Y(F)?(r.line++,r.column=1,r.offset+=F===-3?2:1,E()):F!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===s[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=F}function g(F,V){const Q=V||{};return Q.type=F,Q.start=m(),u.events.push(["enter",Q,u]),a.push(Q),Q}function k(F){const V=a.pop();return V.end=m(),u.events.push(["exit",V,u]),V}function S(F,V){R(F,V.from)}function x(F,V){V.restore()}function A(F,V){return Q;function Q(Z,ne,ye){let _e,z,q,_;return Array.isArray(Z)?X(Z):"tokenize"in Z?X([Z]):K(Z);function K(fe){return Ue;function Ue(be){const Ge=be!==null&&fe[be],Se=be!==null&&fe.null,gt=[...Array.isArray(Ge)?Ge:Ge?[Ge]:[],...Array.isArray(Se)?Se:Se?[Se]:[]];return X(gt)(be)}}function X(fe){return _e=fe,z=0,fe.length===0?ye:I(fe[z])}function I(fe){return Ue;function Ue(be){return _=D(),q=fe,fe.partial||(u.currentConstruct=fe),fe.name&&u.parser.constructs.disable.null.includes(fe.name)?je():fe.tokenize.call(V?Object.assign(Object.create(u),V):u,l,ke,je)(be)}}function ke(fe){return F(q,_),ne}function je(fe){return _.restore(),++z<_e.length?I(_e[z]):ye}}}function R(F,V){F.resolveAll&&!o.includes(F)&&o.push(F),F.resolve&&Yt(u.events,V,u.events.length-V,F.resolve(u.events.slice(V),u)),F.resolveTo&&(u.events=F.resolveTo(u.events,u))}function D(){const F=m(),V=u.previous,Q=u.currentConstruct,Z=u.events.length,ne=Array.from(a);return{from:Z,restore:ye};function ye(){r=F,u.previous=V,u.currentConstruct=Q,u.events.length=Z,a=ne,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function IF(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,o=t.end._bufferIndex;let s;if(n===i)s=[e[n].slice(r,o)];else{if(s=e.slice(n,i),r>-1){const a=s[0];typeof a=="string"?s[0]=a.slice(r):s.shift()}o>0&&s.push(e[i].slice(0,o))}return s}function EF(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const o=e[n];let s;if(typeof o=="string")s=o;else switch(o){case-5:{s="\r";break}case-4:{s=`
`;break}case-3:{s=`\r
`;break}case-2:{s=t?" ":"	";break}case-1:{if(!t&&i)continue;s=" ";break}default:s=String.fromCharCode(o)}i=o===-2,r.push(s)}return r.join("")}function CF(e){const r={constructs:FS([kF,...(e||{}).extensions||[]]),content:i(Vj),defined:[],document:i(Hj),flow:i(lF),lazy:{},string:i(dF),text:i(fF)};return r;function i(o){return s;function s(a){return SF(r,o,a)}}}function AF(e){for(;!$S(e););return e}const Xv=/[\0\t\n\r]/g;function TF(){let e=1,t="",n=!0,r;return i;function i(o,s,a){const l=[];let u,d,c,f,p;for(o=t+(typeof o=="string"?o.toString():new TextDecoder(s||void 0).decode(o)),c=0,t="",n&&(o.charCodeAt(0)===65279&&c++,n=void 0);c<o.length;){if(Xv.lastIndex=c,u=Xv.exec(o),f=u&&u.index!==void 0?u.index:o.length,p=o.charCodeAt(f),!u){t=o.slice(c);break}if(p===10&&c===f&&r)l.push(-3),r=void 0;else switch(r&&(l.push(-5),r=void 0),c<f&&(l.push(o.slice(c,f)),e+=f-c),p){case 0:{l.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,l.push(-2);e++<d;)l.push(-1);break}case 10:{l.push(-4),e=1;break}default:r=!0,e=1}c=f+1}return a&&(r&&l.push(-5),t&&l.push(t),l.push(null)),l}}const RF=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function NF(e){return e.replace(RF,PF)}function PF(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),o=i===120||i===88;return US(n.slice(o?2:1),o?16:10)}return _m(n)||e}const YS={}.hasOwnProperty;function DF(e,t,n){return t&&typeof t=="object"&&(n=t,t=void 0),OF(n)(AF(CF(n).document().write(TF()(e,t,!0))))}function OF(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(Nt),autolinkProtocol:D,autolinkEmail:D,atxHeading:o($t),blockQuote:o(Se),characterEscape:D,characterReference:D,codeFenced:o(gt),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:o(gt,s),codeText:o(Re,s),codeTextData:D,data:D,codeFlowValue:D,definition:o(Sn),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:o(pe),hardBreakEscape:o(He),hardBreakTrailing:o(He),htmlFlow:o(Ze,s),htmlFlowData:D,htmlText:o(Ze,s),htmlTextData:D,image:o(In),label:s,link:o(Nt),listItem:o(Un),listItemValue:f,listOrdered:o(Ye,c),listUnordered:o(Ye),paragraph:o(ar),reference:I,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:o($t),strong:o(En),thematicBreak:o(lr)},exit:{atxHeading:l(),atxHeadingSequence:S,autolink:l(),autolinkEmail:Ge,autolinkProtocol:be,blockQuote:l(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:je,characterReferenceMarkerNumeric:je,characterReferenceValue:fe,characterReference:Ue,codeFenced:l(C),codeFencedFence:w,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:E,codeIndented:l(y),codeText:l(ne),codeTextData:E,data:E,definition:l(),definitionDestinationString:k,definitionLabelString:v,definitionTitleString:g,emphasis:l(),hardBreakEscape:l(V),hardBreakTrailing:l(V),htmlFlow:l(Q),htmlFlowData:E,htmlText:l(Z),htmlTextData:E,image:l(_e),label:q,labelText:z,lineEnding:F,link:l(ye),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:ke,resourceDestinationString:_,resourceTitleString:K,resource:X,setextHeading:l(R),setextHeadingLineSequence:A,setextHeadingText:x,strong:l(),thematicBreak:l()}};QS(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(b){let T={type:"root",children:[]};const P={stack:[T],tokenStack:[],config:t,enter:a,exit:u,buffer:s,resume:d,data:n},M=[];let H=-1;for(;++H<b.length;)if(b[H][1].type==="listOrdered"||b[H][1].type==="listUnordered")if(b[H][0]==="enter")M.push(H);else{const he=M.pop();H=i(b,he,H)}for(H=-1;++H<b.length;){const he=t[b[H][0]];YS.call(he,b[H][1].type)&&he[b[H][1].type].call(Object.assign({sliceSerialize:b[H][2].sliceSerialize},P),b[H][1])}if(P.tokenStack.length>0){const he=P.tokenStack[P.tokenStack.length-1];(he[1]||Zv).call(P,void 0,he[0])}for(T.position={start:fr(b.length>0?b[0][1].start:{line:1,column:1,offset:0}),end:fr(b.length>0?b[b.length-2][1].end:{line:1,column:1,offset:0})},H=-1;++H<t.transforms.length;)T=t.transforms[H](T)||T;return T}function i(b,T,P){let M=T-1,H=-1,he=!1,ie,re,se,L;for(;++M<=P;){const oe=b[M];switch(oe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{oe[0]==="enter"?H++:H--,L=void 0;break}case"lineEndingBlank":{oe[0]==="enter"&&(ie&&!L&&!H&&!se&&(se=M),L=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:L=void 0}if(!H&&oe[0]==="enter"&&oe[1].type==="listItemPrefix"||H===-1&&oe[0]==="exit"&&(oe[1].type==="listUnordered"||oe[1].type==="listOrdered")){if(ie){let en=M;for(re=void 0;en--;){const un=b[en];if(un[1].type==="lineEnding"||un[1].type==="lineEndingBlank"){if(un[0]==="exit")continue;re&&(b[re][1].type="lineEndingBlank",he=!0),un[1].type="lineEnding",re=en}else if(!(un[1].type==="linePrefix"||un[1].type==="blockQuotePrefix"||un[1].type==="blockQuotePrefixWhitespace"||un[1].type==="blockQuoteMarker"||un[1].type==="listItemIndent"))break}se&&(!re||se<re)&&(ie._spread=!0),ie.end=Object.assign({},re?b[re][1].start:oe[1].end),b.splice(re||M,0,["exit",ie,oe[2]]),M++,P++}if(oe[1].type==="listItemPrefix"){const en={type:"listItem",_spread:!1,start:Object.assign({},oe[1].start),end:void 0};ie=en,b.splice(M,0,["enter",en,oe[2]]),M++,P++,se=void 0,L=!0}}}return b[T][1]._spread=he,P}function o(b,T){return P;function P(M){a.call(this,b(M),M),T&&T.call(this,M)}}function s(){this.stack.push({type:"fragment",children:[]})}function a(b,T,P){this.stack[this.stack.length-1].children.push(b),this.stack.push(b),this.tokenStack.push([T,P||void 0]),b.position={start:fr(T.start),end:void 0}}function l(b){return T;function T(P){b&&b.call(this,P),u.call(this,P)}}function u(b,T){const P=this.stack.pop(),M=this.tokenStack.pop();if(M)M[0].type!==b.type&&(T?T.call(this,b,M[0]):(M[1]||Zv).call(this,b,M[0]));else throw new Error("Cannot close `"+b.type+"` ("+fs({start:b.start,end:b.end})+"): it’s not open");P.position.end=fr(b.end)}function d(){return wm(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function f(b){if(this.data.expectingFirstListItemValue){const T=this.stack[this.stack.length-2];T.start=Number.parseInt(this.sliceSerialize(b),10),this.data.expectingFirstListItemValue=void 0}}function p(){const b=this.resume(),T=this.stack[this.stack.length-1];T.lang=b}function m(){const b=this.resume(),T=this.stack[this.stack.length-1];T.meta=b}function w(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function C(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function y(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b.replace(/(\r?\n|\r)$/g,"")}function v(b){const T=this.resume(),P=this.stack[this.stack.length-1];P.label=T,P.identifier=_n(this.sliceSerialize(b)).toLowerCase()}function g(){const b=this.resume(),T=this.stack[this.stack.length-1];T.title=b}function k(){const b=this.resume(),T=this.stack[this.stack.length-1];T.url=b}function S(b){const T=this.stack[this.stack.length-1];if(!T.depth){const P=this.sliceSerialize(b).length;T.depth=P}}function x(){this.data.setextHeadingSlurpLineEnding=!0}function A(b){const T=this.stack[this.stack.length-1];T.depth=this.sliceSerialize(b).codePointAt(0)===61?1:2}function R(){this.data.setextHeadingSlurpLineEnding=void 0}function D(b){const P=this.stack[this.stack.length-1].children;let M=P[P.length-1];(!M||M.type!=="text")&&(M=we(),M.position={start:fr(b.start),end:void 0},P.push(M)),this.stack.push(M)}function E(b){const T=this.stack.pop();T.value+=this.sliceSerialize(b),T.position.end=fr(b.end)}function F(b){const T=this.stack[this.stack.length-1];if(this.data.atHardBreak){const P=T.children[T.children.length-1];P.position.end=fr(b.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(T.type)&&(D.call(this,b),E.call(this,b))}function V(){this.data.atHardBreak=!0}function Q(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function Z(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function ne(){const b=this.resume(),T=this.stack[this.stack.length-1];T.value=b}function ye(){const b=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";b.type+="Reference",b.referenceType=T,delete b.url,delete b.title}else delete b.identifier,delete b.label;this.data.referenceType=void 0}function _e(){const b=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";b.type+="Reference",b.referenceType=T,delete b.url,delete b.title}else delete b.identifier,delete b.label;this.data.referenceType=void 0}function z(b){const T=this.sliceSerialize(b),P=this.stack[this.stack.length-2];P.label=NF(T),P.identifier=_n(T).toLowerCase()}function q(){const b=this.stack[this.stack.length-1],T=this.resume(),P=this.stack[this.stack.length-1];if(this.data.inReference=!0,P.type==="link"){const M=b.children;P.children=M}else P.alt=T}function _(){const b=this.resume(),T=this.stack[this.stack.length-1];T.url=b}function K(){const b=this.resume(),T=this.stack[this.stack.length-1];T.title=b}function X(){this.data.inReference=void 0}function I(){this.data.referenceType="collapsed"}function ke(b){const T=this.resume(),P=this.stack[this.stack.length-1];P.label=T,P.identifier=_n(this.sliceSerialize(b)).toLowerCase(),this.data.referenceType="full"}function je(b){this.data.characterReferenceType=b.type}function fe(b){const T=this.sliceSerialize(b),P=this.data.characterReferenceType;let M;P?(M=US(T,P==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):M=_m(T);const H=this.stack[this.stack.length-1];H.value+=M}function Ue(b){const T=this.stack.pop();T.position.end=fr(b.end)}function be(b){E.call(this,b);const T=this.stack[this.stack.length-1];T.url=this.sliceSerialize(b)}function Ge(b){E.call(this,b);const T=this.stack[this.stack.length-1];T.url="mailto:"+this.sliceSerialize(b)}function Se(){return{type:"blockquote",children:[]}}function gt(){return{type:"code",lang:null,meta:null,value:""}}function Re(){return{type:"inlineCode",value:""}}function Sn(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function pe(){return{type:"emphasis",children:[]}}function $t(){return{type:"heading",depth:0,children:[]}}function He(){return{type:"break"}}function Ze(){return{type:"html",value:""}}function In(){return{type:"image",title:null,url:"",alt:null}}function Nt(){return{type:"link",title:null,url:"",children:[]}}function Ye(b){return{type:"list",ordered:b.type==="listOrdered",start:null,spread:b._spread,children:[]}}function Un(b){return{type:"listItem",spread:b._spread,checked:null,children:[]}}function ar(){return{type:"paragraph",children:[]}}function En(){return{type:"strong",children:[]}}function we(){return{type:"text",value:""}}function lr(){return{type:"thematicBreak"}}}function fr(e){return{line:e.line,column:e.column,offset:e.offset}}function QS(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?QS(e,r):LF(e,r)}}function LF(e,t){let n;for(n in t)if(YS.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Zv(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+fs({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+fs({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+fs({start:t.start,end:t.end})+") is still open")}function MF(e){const t=this;t.parser=n;function n(r){return DF(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function jF(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function FF(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function UF(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function zF(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function BF(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function VF(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=Ao(r.toLowerCase()),o=e.footnoteOrder.indexOf(r);let s,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),s=e.footnoteOrder.length):s=o+1,a+=1,e.footnoteCounts.set(r,a);const l={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(s)}]};e.patch(t,l);const u={type:"element",tagName:"sup",properties:{},children:[l]};return e.patch(t,u),e.applyData(t,u)}function $F(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function HF(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function JS(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),o=i[0];o&&o.type==="text"?o.value="["+o.value:i.unshift({type:"text",value:"["});const s=i[i.length-1];return s&&s.type==="text"?s.value+=r:i.push({type:"text",value:r}),i}function WF(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return JS(e,t);const i={src:Ao(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,o),e.applyData(t,o)}function qF(e,t){const n={src:Ao(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function KF(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function GF(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return JS(e,t);const i={href:Ao(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)}function YF(e,t){const n={href:Ao(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function QF(e,t,n){const r=e.all(t),i=n?JF(n):XS(t),o={},s=[];if(typeof t.checked=="boolean"){const d=r[0];let c;d&&d.type==="element"&&d.tagName==="p"?c=d:(c={type:"element",tagName:"p",properties:{},children:[]},r.unshift(c)),c.children.length>0&&c.children.unshift({type:"text",value:" "}),c.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(i||a!==0||d.type!=="element"||d.tagName!=="p")&&s.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!i?s.push(...d.children):s.push(d)}const l=r[r.length-1];l&&(i||l.type!=="element"||l.tagName!=="p")&&s.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:o,children:s};return e.patch(t,u),e.applyData(t,u)}function JF(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=XS(n[r])}return t}function XS(e){const t=e.spread;return t??e.children.length>1}function XF(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const s=r[i];if(s.type==="element"&&s.tagName==="li"&&s.properties&&Array.isArray(s.properties.className)&&s.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)}function ZF(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function e3(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function t3(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function n3(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const s={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],s),i.push(s)}if(n.length>0){const s={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=mm(t.children[1]),l=NS(t.children[t.children.length-1]);a&&l&&(s.position={start:a,end:l}),i.push(s)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)}function r3(e,t,n){const r=n?n.children:void 0,o=(r?r.indexOf(t):1)===0?"th":"td",s=n&&n.type==="table"?n.align:void 0,a=s?s.length:t.children.length;let l=-1;const u=[];for(;++l<a;){const c=t.children[l],f={},p=s?s[l]:void 0;p&&(f.align=p);let m={type:"element",tagName:o,properties:f,children:[]};c&&(m.children=e.all(c),e.patch(c,m),m=e.applyData(c,m)),u.push(m)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function i3(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const ew=9,tw=32;function o3(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const o=[];for(;r;)o.push(nw(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return o.push(nw(t.slice(i),i>0,!1)),o.join("")}function nw(e,t,n){let r=0,i=e.length;if(t){let o=e.codePointAt(r);for(;o===ew||o===tw;)r++,o=e.codePointAt(r)}if(n){let o=e.codePointAt(i-1);for(;o===ew||o===tw;)i--,o=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function s3(e,t){const n={type:"text",value:o3(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function a3(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const l3={blockquote:jF,break:FF,code:UF,delete:zF,emphasis:BF,footnoteReference:VF,heading:$F,html:HF,imageReference:WF,image:qF,inlineCode:KF,linkReference:GF,link:YF,listItem:QF,list:XF,paragraph:ZF,root:e3,strong:t3,table:n3,tableCell:i3,tableRow:r3,text:s3,thematicBreak:a3,toml:Ga,yaml:Ga,definition:Ga,footnoteDefinition:Ga};function Ga(){}const ZS=-1,ac=0,hs=1,vu=2,xm=3,km=4,Sm=5,Im=6,e0=7,t0=8,n0=typeof self=="object"?self:globalThis,rw=(e,t)=>{switch(e){case"Function":case"SharedWorker":case"Worker":case"eval":case"setInterval":case"setTimeout":throw new TypeError("unable to deserialize "+e)}return new n0[e](t)},u3=(e,t)=>{const n=(i,o)=>(e.set(o,i),i),r=i=>{if(e.has(i))return e.get(i);const[o,s]=t[i];switch(o){case ac:case ZS:return n(s,i);case hs:{const a=n([],i);for(const l of s)a.push(r(l));return a}case vu:{const a=n({},i);for(const[l,u]of s)a[r(l)]=r(u);return a}case xm:return n(new Date(s),i);case km:{const{source:a,flags:l}=s;return n(new RegExp(a,l),i)}case Sm:{const a=n(new Map,i);for(const[l,u]of s)a.set(r(l),r(u));return a}case Im:{const a=n(new Set,i);for(const l of s)a.add(r(l));return a}case e0:{const{name:a,message:l}=s;return n(typeof n0[a]=="function"?rw(a,l):new Error(l),i)}case t0:return n(BigInt(s),i);case"BigInt":return n(Object(BigInt(s)),i);case"ArrayBuffer":return n(new Uint8Array(s).buffer,s);case"DataView":{const{buffer:a}=new Uint8Array(s);return n(new DataView(a),s)}}return n(rw(o,s),i)};return r},iw=e=>u3(new Map,e)(0),Zr="",{toString:c3}={},{keys:d3}=Object,qo=e=>{const t=typeof e;if(t!=="object"||!e)return[ac,t];const n=c3.call(e).slice(8,-1);switch(n){case"Array":return[hs,Zr];case"Object":return[vu,Zr];case"Date":return[xm,Zr];case"RegExp":return[km,Zr];case"Map":return[Sm,Zr];case"Set":return[Im,Zr];case"DataView":return[hs,n]}return n.includes("Array")?[hs,n]:e instanceof Error?[e0,e.name||"Error"]:[vu,n]},Ya=([e,t])=>e===ac&&(t==="function"||t==="symbol"),f3=(e,t,n,r)=>{const i=(s,a)=>{const l=r.push(s)-1;return n.set(a,l),l},o=s=>{if(n.has(s))return n.get(s);let[a,l]=qo(s);switch(a){case ac:{let d=s;switch(l){case"bigint":a=t0,d=s.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+l);d=null;break;case"undefined":return i([ZS],s)}return i([a,d],s)}case hs:{if(l){let f=s;return l==="DataView"?f=new Uint8Array(s.buffer):l==="ArrayBuffer"&&(f=new Uint8Array(s)),i([l,[...f]],s)}const d=[],c=i([a,d],s);for(const f of s)d.push(o(f));return c}case vu:{if(l)switch(l){case"BigInt":return i([l,s.toString()],s);case"Boolean":case"Number":case"String":return i([l,s.valueOf()],s)}if(t&&"toJSON"in s)return o(s.toJSON());const d=[],c=i([a,d],s);for(const f of d3(s))(e||!Ya(qo(s[f])))&&d.push([o(f),o(s[f])]);return c}case xm:return i([a,isNaN(s.getTime())?Zr:s.toISOString()],s);case km:{const{source:d,flags:c}=s;return i([a,{source:d,flags:c}],s)}case Sm:{const d=[],c=i([a,d],s);for(const[f,p]of s)(e||!(Ya(qo(f))||Ya(qo(p))))&&d.push([o(f),o(p)]);return c}case Im:{const d=[],c=i([a,d],s);for(const f of s)(e||!Ya(qo(f)))&&d.push(o(f));return c}}const{message:u}=s;return i([a,{name:l,message:u}],s)};return o},ow=(e,{json:t,lossy:n}={})=>{const r=[];return f3(!(t||n),!!t,new Map,r)(e),r},wu=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?iw(ow(e,t)):structuredClone(e):(e,t)=>iw(ow(e,t));function p3(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function h3(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function m3(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||p3,r=e.options.footnoteBackLabel||h3,i=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",s=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let l=-1;for(;++l<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[l]);if(!u)continue;const d=e.all(u),c=String(u.identifier).toUpperCase(),f=Ao(c.toLowerCase());let p=0;const m=[],w=e.footnoteCounts.get(c);for(;w!==void 0&&++p<=w;){m.length>0&&m.push({type:"text",value:" "});let v=typeof n=="string"?n:n(l,p);typeof v=="string"&&(v={type:"text",value:v}),m.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(l,p),className:["data-footnote-backref"]},children:Array.isArray(v)?v:[v]})}const C=d[d.length-1];if(C&&C.type==="element"&&C.tagName==="p"){const v=C.children[C.children.length-1];v&&v.type==="text"?v.value+=" ":C.children.push({type:"text",value:" "}),C.children.push(...m)}else d.push(...m);const y={type:"element",tagName:"li",properties:{id:t+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,y),a.push(y)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...wu(s),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const lc=function(e){if(e==null)return w3;if(typeof e=="function")return uc(e);if(typeof e=="object")return Array.isArray(e)?g3(e):y3(e);if(typeof e=="string")return v3(e);throw new Error("Expected function, string, or object as test")};function g3(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=lc(e[n]);return uc(r);function r(...i){let o=-1;for(;++o<t.length;)if(t[o].apply(this,i))return!0;return!1}}function y3(e){const t=e;return uc(n);function n(r){const i=r;let o;for(o in e)if(i[o]!==t[o])return!1;return!0}}function v3(e){return uc(t);function t(n){return n&&n.type===e}}function uc(e){return t;function t(n,r,i){return!!(_3(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function w3(){return!0}function _3(e){return e!==null&&typeof e=="object"&&"type"in e}const r0=[],b3=!0,lp=!1,x3="skip";function i0(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const o=lc(i),s=r?-1:1;a(e,void 0,[])();function a(l,u,d){const c=l&&typeof l=="object"?l:{};if(typeof c.type=="string"){const p=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(l.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=r0,m,w,C;if((!t||o(l,u,d[d.length-1]||void 0))&&(p=k3(n(l,d)),p[0]===lp))return p;if("children"in l&&l.children){const y=l;if(y.children&&p[0]!==x3)for(w=(r?y.children.length:-1)+s,C=d.concat(y);w>-1&&w<y.children.length;){const v=y.children[w];if(m=a(v,w,C)(),m[0]===lp)return m;w=typeof m[1]=="number"?m[1]:w+s}}return p}}}function k3(e){return Array.isArray(e)?e:typeof e=="number"?[b3,e]:e==null?r0:[e]}function Em(e,t,n,r){let i,o,s;typeof t=="function"&&typeof n!="function"?(o=void 0,s=t,i=n):(o=t,s=n,i=r),i0(e,o,a,i);function a(l,u){const d=u[u.length-1],c=d?d.children.indexOf(l):void 0;return s(l,c,d)}}const up={}.hasOwnProperty,S3={};function I3(e,t){const n=t||S3,r=new Map,i=new Map,o=new Map,s={...l3,...n.handlers},a={all:u,applyData:C3,definitionById:r,footnoteById:i,footnoteCounts:o,footnoteOrder:[],handlers:s,one:l,options:n,patch:E3,wrap:T3};return Em(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const c=d.type==="definition"?r:i,f=String(d.identifier).toUpperCase();c.has(f)||c.set(f,d)}}),a;function l(d,c){const f=d.type,p=a.handlers[f];if(up.call(a.handlers,f)&&p)return p(a,d,c);if(a.options.passThrough&&a.options.passThrough.includes(f)){if("children"in d){const{children:w,...C}=d,y=wu(C);return y.children=a.all(d),y}return wu(d)}return(a.options.unknownHandler||A3)(a,d,c)}function u(d){const c=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const m=a.one(f[p],d);if(m){if(p&&f[p-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=sw(m.value)),!Array.isArray(m)&&m.type==="element")){const w=m.children[0];w&&w.type==="text"&&(w.value=sw(w.value))}Array.isArray(m)?c.push(...m):c.push(m)}}}return c}}function E3(e,t){e.position&&(t.position=hj(e))}function C3(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,o=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const s="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:s}}n.type==="element"&&o&&Object.assign(n.properties,wu(o)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function A3(e,t){const n=t.data||{},r="value"in t&&!(up.call(n,"hProperties")||up.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function T3(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function sw(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function aw(e,t){const n=I3(e,t),r=n.one(e,void 0),i=m3(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:`
`},i),o}function R3(e,t){return e&&"run"in e?async function(n,r){const i=aw(n,{file:r,...t});await e.run(i,r)}:function(n,r){return aw(n,{file:r,...e||t})}}function lw(e){if(e)throw e}var wl=Object.prototype.hasOwnProperty,o0=Object.prototype.toString,uw=Object.defineProperty,cw=Object.getOwnPropertyDescriptor,dw=function(t){return typeof Array.isArray=="function"?Array.isArray(t):o0.call(t)==="[object Array]"},fw=function(t){if(!t||o0.call(t)!=="[object Object]")return!1;var n=wl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&wl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||wl.call(t,i)},pw=function(t,n){uw&&n.name==="__proto__"?uw(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},hw=function(t,n){if(n==="__proto__")if(wl.call(t,n)){if(cw)return cw(t,n).value}else return;return t[n]},N3=function e(){var t,n,r,i,o,s,a=arguments[0],l=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},l=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});l<u;++l)if(t=arguments[l],t!=null)for(n in t)r=hw(a,n),i=hw(t,n),a!==i&&(d&&i&&(fw(i)||(o=dw(i)))?(o?(o=!1,s=r&&dw(r)?r:[]):s=r&&fw(r)?r:{},pw(a,{name:n,newValue:e(d,s,i)})):typeof i<"u"&&pw(a,{name:n,newValue:i}));return a};const md=hp(N3);function cp(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function P3(){const e=[],t={run:n,use:r};return t;function n(...i){let o=-1;const s=i.pop();if(typeof s!="function")throw new TypeError("Expected function as last argument, not "+s);a(null,...i);function a(l,...u){const d=e[++o];let c=-1;if(l){s(l);return}for(;++c<i.length;)(u[c]===null||u[c]===void 0)&&(u[c]=i[c]);i=u,d?D3(d,a)(...u):s(null,...u)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function D3(e,t){let n;return r;function r(...s){const a=e.length>s.length;let l;a&&s.push(i);try{l=e.apply(this,s)}catch(u){const d=u;if(a&&n)throw d;return i(d)}a||(l&&l.then&&typeof l.then=="function"?l.then(o,i):l instanceof Error?i(l):o(l))}function i(s,...a){n||(n=!0,t(s,...a))}function o(s){i(null,s)}}const Rn={basename:O3,dirname:L3,extname:M3,join:j3,sep:"/"};function O3(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');wa(e);let n=0,r=-1,i=e.length,o;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else r<0&&(o=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let s=-1,a=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else s<0&&(o=!0,s=i+1),a>-1&&(e.codePointAt(i)===t.codePointAt(a--)?a<0&&(r=i):(a=-1,r=s));return n===r?r=s:r<0&&(r=e.length),e.slice(n,r)}function L3(e){if(wa(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function M3(e){wa(e);let t=e.length,n=-1,r=0,i=-1,o=0,s;for(;t--;){const a=e.codePointAt(t);if(a===47){if(s){r=t+1;break}continue}n<0&&(s=!0,n=t+1),a===46?i<0?i=t:o!==1&&(o=1):i>-1&&(o=-1)}return i<0||n<0||o===0||o===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function j3(...e){let t=-1,n;for(;++t<e.length;)wa(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":F3(n)}function F3(e){wa(e);const t=e.codePointAt(0)===47;let n=U3(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function U3(e,t){let n="",r=0,i=-1,o=0,s=-1,a,l;for(;++s<=e.length;){if(s<e.length)a=e.codePointAt(s);else{if(a===47)break;a=47}if(a===47){if(!(i===s-1||o===1))if(i!==s-1&&o===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(l=n.lastIndexOf("/"),l!==n.length-1){l<0?(n="",r=0):(n=n.slice(0,l),r=n.length-1-n.lastIndexOf("/")),i=s,o=0;continue}}else if(n.length>0){n="",r=0,i=s,o=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,s):n=e.slice(i+1,s),r=s-i-1;i=s,o=0}else a===46&&o>-1?o++:o=-1}return n}function wa(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const z3={cwd:B3};function B3(){return"/"}function dp(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function V3(e){if(typeof e=="string")e=new URL(e);else if(!dp(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return $3(e)}function $3(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const gd=["history","path","basename","stem","extname","dirname"];class s0{constructor(t){let n;t?dp(t)?n={path:t}:typeof t=="string"||H3(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":z3.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<gd.length;){const o=gd[r];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let i;for(i in n)gd.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?Rn.basename(this.path):void 0}set basename(t){vd(t,"basename"),yd(t,"basename"),this.path=Rn.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Rn.dirname(this.path):void 0}set dirname(t){mw(this.basename,"dirname"),this.path=Rn.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Rn.extname(this.path):void 0}set extname(t){if(yd(t,"extname"),mw(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Rn.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){dp(t)&&(t=V3(t)),vd(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Rn.basename(this.path,this.extname):void 0}set stem(t){vd(t,"stem"),yd(t,"stem"),this.path=Rn.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new kt(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function yd(e,t){if(e&&e.includes(Rn.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Rn.sep+"`")}function vd(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function mw(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function H3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const W3=function(e){const r=this.constructor.prototype,i=r[e],o=function(){return i.apply(o,arguments)};return Object.setPrototypeOf(o,r),o},q3={}.hasOwnProperty;class Cm extends W3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=P3()}copy(){const t=new Cm;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(md(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(bd("data",this.frozen),this.namespace[t]=n,this):q3.call(this.namespace,t)&&this.namespace[t]||void 0:t?(bd("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=Qa(t),r=this.parser||this.Parser;return wd("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),wd("process",this.parser||this.Parser),_d("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(o,s){const a=Qa(t),l=r.parse(a);r.run(l,a,function(d,c,f){if(d||!c||!f)return u(d);const p=c,m=r.stringify(p,f);Y3(m)?f.value=m:f.result=m,u(d,f)});function u(d,c){d||!c?s(d):o?o(c):n(void 0,c)}}}processSync(t){let n=!1,r;return this.freeze(),wd("processSync",this.parser||this.Parser),_d("processSync",this.compiler||this.Compiler),this.process(t,i),yw("processSync","process",n),r;function i(o,s){n=!0,lw(o),r=s}}run(t,n,r){gw(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?o(void 0,r):new Promise(o);function o(s,a){const l=Qa(n);i.run(t,l,u);function u(d,c,f){const p=c||t;d?a(d):s?s(p):r(void 0,p,f)}}}runSync(t,n){let r=!1,i;return this.run(t,n,o),yw("runSync","run",r),i;function o(s,a){lw(s),i=a,r=!0}}stringify(t,n){this.freeze();const r=Qa(n),i=this.compiler||this.Compiler;return _d("stringify",i),gw(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(bd("use",this.frozen),t!=null)if(typeof t=="function")l(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):s(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function o(u){if(typeof u=="function")l(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...c]=u;l(d,c)}else s(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function s(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(i.settings=md(!0,i.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const c=u[d];o(c)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function l(u,d){let c=-1,f=-1;for(;++c<r.length;)if(r[c][0]===u){f=c;break}if(f===-1)r.push([u,...d]);else if(d.length>0){let[p,...m]=d;const w=r[f][1];cp(w)&&cp(p)&&(p=md(!0,w,p)),r[f]=[u,p,...m]}}}}const K3=new Cm().freeze();function wd(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function _d(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function bd(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function gw(e){if(!cp(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function yw(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function Qa(e){return G3(e)?e:new s0(e)}function G3(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function Y3(e){return typeof e=="string"||Q3(e)}function Q3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const J3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",vw=[],ww={allowDangerousHtml:!0},X3=/^(https?|ircs?|mailto|xmpp)$/i,Z3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function e4(e){const t=t4(e),n=n4(e);return r4(t.runSync(t.parse(n),n),e)}function t4(e){const t=e.rehypePlugins||vw,n=e.remarkPlugins||vw,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...ww}:ww;return K3().use(MF).use(n).use(R3,r).use(t)}function n4(e){const t=e.children||"",n=new s0;return typeof t=="string"&&(n.value=t),n}function r4(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,o=t.disallowedElements,s=t.skipHtml,a=t.unwrapDisallowed,l=t.urlTransform||i4;for(const d of Z3)Object.hasOwn(t,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+J3+d.id,void 0);return Em(e,u),wj(e,{Fragment:h.Fragment,components:i,ignoreInvalidStyle:!0,jsx:h.jsx,jsxs:h.jsxs,passKeys:!0,passNode:!0});function u(d,c,f){if(d.type==="raw"&&f&&typeof c=="number")return s?f.children.splice(c,1):f.children[c]={type:"text",value:d.value},c;if(d.type==="element"){let p;for(p in fd)if(Object.hasOwn(fd,p)&&Object.hasOwn(d.properties,p)){const m=d.properties[p],w=fd[p];(w===null||w.includes(d.tagName))&&(d.properties[p]=l(String(m||""),p,d))}}if(d.type==="element"){let p=n?!n.includes(d.tagName):o?o.includes(d.tagName):!1;if(!p&&r&&typeof c=="number"&&(p=!r(d,c,f)),p&&f&&typeof c=="number")return a&&d.children?f.children.splice(c,1,...d.children):f.children.splice(c,1),c}}}function i4(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||X3.test(e.slice(0,t))?e:""}function _w(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function o4(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function s4(e,t,n){const i=lc((n||{}).ignore||[]),o=a4(t);let s=-1;for(;++s<o.length;)i0(e,"text",a);function a(u,d){let c=-1,f;for(;++c<d.length;){const p=d[c],m=f?f.children:void 0;if(i(p,m?m.indexOf(p):void 0,f))return;f=p}if(f)return l(u,d)}function l(u,d){const c=d[d.length-1],f=o[s][0],p=o[s][1];let m=0;const C=c.children.indexOf(u);let y=!1,v=[];f.lastIndex=0;let g=f.exec(u.value);for(;g;){const k=g.index,S={index:g.index,input:g.input,stack:[...d,u]};let x=p(...g,S);if(typeof x=="string"&&(x=x.length>0?{type:"text",value:x}:void 0),x===!1?f.lastIndex=k+1:(m!==k&&v.push({type:"text",value:u.value.slice(m,k)}),Array.isArray(x)?v.push(...x):x&&v.push(x),m=k+g[0].length,y=!0),!f.global)break;g=f.exec(u.value)}return y?(m<u.value.length&&v.push({type:"text",value:u.value.slice(m)}),c.children.splice(C,1,...v)):v=[u],C+v.length}}function a4(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const i=n[r];t.push([l4(i[0]),u4(i[1])])}return t}function l4(e){return typeof e=="string"?new RegExp(o4(e),"g"):e}function u4(e){return typeof e=="function"?e:function(){return e}}const xd="phrasing",kd=["autolink","link","image","label"];function c4(){return{transforms:[y4],enter:{literalAutolink:f4,literalAutolinkEmail:Sd,literalAutolinkHttp:Sd,literalAutolinkWww:Sd},exit:{literalAutolink:g4,literalAutolinkEmail:m4,literalAutolinkHttp:p4,literalAutolinkWww:h4}}}function d4(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:xd,notInConstruct:kd},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:xd,notInConstruct:kd},{character:":",before:"[ps]",after:"\\/",inConstruct:xd,notInConstruct:kd}]}}function f4(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Sd(e){this.config.enter.autolinkProtocol.call(this,e)}function p4(e){this.config.exit.autolinkProtocol.call(this,e)}function h4(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function m4(e){this.config.exit.autolinkEmail.call(this,e)}function g4(e){this.exit(e)}function y4(e){s4(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,v4],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),w4]],{ignore:["link","linkReference"]})}function v4(e,t,n,r,i){let o="";if(!a0(i)||(/^w/i.test(t)&&(n=t+n,t="",o="http://"),!_4(n)))return!1;const s=b4(n+r);if(!s[0])return!1;const a={type:"link",title:null,url:o+t+s[0],children:[{type:"text",value:t+s[0]}]};return s[1]?[a,{type:"text",value:s[1]}]:a}function w4(e,t,n,r){return!a0(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function _4(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function b4(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const i=_w(e,"(");let o=_w(e,")");for(;r!==-1&&i>o;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),o++;return[e,n]}function a0(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||ki(n)||oc(n))&&(!t||n!==47)}l0.peek=R4;function x4(){this.buffer()}function k4(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function S4(){this.buffer()}function I4(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function E4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_n(this.sliceSerialize(e)).toLowerCase(),n.label=t}function C4(e){this.exit(e)}function A4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_n(this.sliceSerialize(e)).toLowerCase(),n.label=t}function T4(e){this.exit(e)}function R4(){return"["}function l0(e,t,n,r){const i=n.createTracker(r);let o=i.move("[^");const s=n.enter("footnoteReference"),a=n.enter("reference");return o+=i.move(n.safe(n.associationId(e),{after:"]",before:o})),a(),s(),o+=i.move("]"),o}function N4(){return{enter:{gfmFootnoteCallString:x4,gfmFootnoteCall:k4,gfmFootnoteDefinitionLabelString:S4,gfmFootnoteDefinition:I4},exit:{gfmFootnoteCallString:E4,gfmFootnoteCall:C4,gfmFootnoteDefinitionLabelString:A4,gfmFootnoteDefinition:T4}}}function P4(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:l0},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function n(r,i,o,s){const a=o.createTracker(s);let l=a.move("[^");const u=o.enter("footnoteDefinition"),d=o.enter("label");return l+=a.move(o.safe(o.associationId(r),{before:l,after:"]"})),d(),l+=a.move("]:"),r.children&&r.children.length>0&&(a.shift(4),l+=a.move((t?`
`:" ")+o.indentLines(o.containerFlow(r,a.current()),t?u0:D4))),u(),l}}function D4(e,t,n){return t===0?e:u0(e,t,n)}function u0(e,t,n){return(n?"":"    ")+e}const O4=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];c0.peek=U4;function L4(){return{canContainEols:["delete"],enter:{strikethrough:j4},exit:{strikethrough:F4}}}function M4(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:O4}],handlers:{delete:c0}}}function j4(e){this.enter({type:"delete",children:[]},e)}function F4(e){this.exit(e)}function c0(e,t,n,r){const i=n.createTracker(r),o=n.enter("strikethrough");let s=i.move("~~");return s+=n.containerPhrasing(e,{...i.current(),before:s,after:"~"}),s+=i.move("~~"),o(),s}function U4(){return"~"}function z4(e){return e.length}function B4(e,t){const n=t||{},r=(n.align||[]).concat(),i=n.stringLength||z4,o=[],s=[],a=[],l=[];let u=0,d=-1;for(;++d<e.length;){const w=[],C=[];let y=-1;for(e[d].length>u&&(u=e[d].length);++y<e[d].length;){const v=V4(e[d][y]);if(n.alignDelimiters!==!1){const g=i(v);C[y]=g,(l[y]===void 0||g>l[y])&&(l[y]=g)}w.push(v)}s[d]=w,a[d]=C}let c=-1;if(typeof r=="object"&&"length"in r)for(;++c<u;)o[c]=bw(r[c]);else{const w=bw(r);for(;++c<u;)o[c]=w}c=-1;const f=[],p=[];for(;++c<u;){const w=o[c];let C="",y="";w===99?(C=":",y=":"):w===108?C=":":w===114&&(y=":");let v=n.alignDelimiters===!1?1:Math.max(1,l[c]-C.length-y.length);const g=C+"-".repeat(v)+y;n.alignDelimiters!==!1&&(v=C.length+v+y.length,v>l[c]&&(l[c]=v),p[c]=v),f[c]=g}s.splice(1,0,f),a.splice(1,0,p),d=-1;const m=[];for(;++d<s.length;){const w=s[d],C=a[d];c=-1;const y=[];for(;++c<u;){const v=w[c]||"";let g="",k="";if(n.alignDelimiters!==!1){const S=l[c]-(C[c]||0),x=o[c];x===114?g=" ".repeat(S):x===99?S%2?(g=" ".repeat(S/2+.5),k=" ".repeat(S/2-.5)):(g=" ".repeat(S/2),k=g):k=" ".repeat(S)}n.delimiterStart!==!1&&!c&&y.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&v==="")&&(n.delimiterStart!==!1||c)&&y.push(" "),n.alignDelimiters!==!1&&y.push(g),y.push(v),n.alignDelimiters!==!1&&y.push(k),n.padding!==!1&&y.push(" "),(n.delimiterEnd!==!1||c!==u-1)&&y.push("|")}m.push(n.delimiterEnd===!1?y.join("").replace(/ +$/,""):y.join(""))}return m.join(`
`)}function V4(e){return e==null?"":String(e)}function bw(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function $4(e,t,n,r){const i=n.enter("blockquote"),o=n.createTracker(r);o.move("> "),o.shift(2);const s=n.indentLines(n.containerFlow(e,o.current()),H4);return i(),s}function H4(e,t,n){return">"+(n?"":" ")+e}function W4(e,t){return xw(e,t.inConstruct,!0)&&!xw(e,t.notInConstruct,!1)}function xw(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function kw(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&W4(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function q4(e,t){const n=String(e);let r=n.indexOf(t),i=r,o=0,s=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===i?++o>s&&(s=o):o=1,i=r+t.length,r=n.indexOf(t,i);return s}function K4(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function G4(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Y4(e,t,n,r){const i=G4(n),o=e.value||"",s=i==="`"?"GraveAccent":"Tilde";if(K4(e,n)){const c=n.enter("codeIndented"),f=n.indentLines(o,Q4);return c(),f}const a=n.createTracker(r),l=i.repeat(Math.max(q4(o,i)+1,3)),u=n.enter("codeFenced");let d=a.move(l);if(e.lang){const c=n.enter(`codeFencedLang${s}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),c()}if(e.lang&&e.meta){const c=n.enter(`codeFencedMeta${s}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),c()}return d+=a.move(`
`),o&&(d+=a.move(o+`
`)),d+=a.move(l),u(),d}function Q4(e,t,n){return(n?"":"    ")+e}function Am(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function J4(e,t,n,r){const i=Am(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("definition");let a=n.enter("label");const l=n.createTracker(r);let u=l.move("[");return u+=l.move(n.safe(n.associationId(e),{before:u,after:"]",...l.current()})),u+=l.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(a=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...l.current()}))),a(),e.title&&(a=n.enter(`title${o}`),u+=l.move(" "+i),u+=l.move(n.safe(e.title,{before:u,after:i,...l.current()})),u+=l.move(i),a()),s(),u}function X4(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function Ws(e){return"&#x"+e.toString(16).toUpperCase()+";"}function _u(e,t,n){const r=yo(e),i=yo(t);return r===void 0?i===void 0?n==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}d0.peek=Z4;function d0(e,t,n,r){const i=X4(n),o=n.enter("emphasis"),s=n.createTracker(r),a=s.move(i);let l=s.move(n.containerPhrasing(e,{after:i,before:a,...s.current()}));const u=l.charCodeAt(0),d=_u(r.before.charCodeAt(r.before.length-1),u,i);d.inside&&(l=Ws(u)+l.slice(1));const c=l.charCodeAt(l.length-1),f=_u(r.after.charCodeAt(0),c,i);f.inside&&(l=l.slice(0,-1)+Ws(c));const p=s.move(i);return o(),n.attentionEncodeSurroundingInfo={after:f.outside,before:d.outside},a+l+p}function Z4(e,t,n){return n.options.emphasis||"*"}function eU(e,t){let n=!1;return Em(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,lp}),!!((!e.depth||e.depth<3)&&wm(e)&&(t.options.setext||n))}function tU(e,t,n,r){const i=Math.max(Math.min(6,e.depth||1),1),o=n.createTracker(r);if(eU(e,n)){const d=n.enter("headingSetext"),c=n.enter("phrasing"),f=n.containerPhrasing(e,{...o.current(),before:`
`,after:`
`});return c(),d(),f+`
`+(i===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const s="#".repeat(i),a=n.enter("headingAtx"),l=n.enter("phrasing");o.move(s+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...o.current()});return/^[\t ]/.test(u)&&(u=Ws(u.charCodeAt(0))+u.slice(1)),u=u?s+" "+u:s,n.options.closeAtx&&(u+=" "+s),l(),a(),u}f0.peek=nU;function f0(e){return e.value||""}function nU(){return"<"}p0.peek=rU;function p0(e,t,n,r){const i=Am(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("image");let a=n.enter("label");const l=n.createTracker(r);let u=l.move("![");return u+=l.move(n.safe(e.alt,{before:u,after:"]",...l.current()})),u+=l.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(a=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":")",...l.current()}))),a(),e.title&&(a=n.enter(`title${o}`),u+=l.move(" "+i),u+=l.move(n.safe(e.title,{before:u,after:i,...l.current()})),u+=l.move(i),a()),u+=l.move(")"),s(),u}function rU(){return"!"}h0.peek=iU;function h0(e,t,n,r){const i=e.referenceType,o=n.enter("imageReference");let s=n.enter("label");const a=n.createTracker(r);let l=a.move("![");const u=n.safe(e.alt,{before:l,after:"]",...a.current()});l+=a.move(u+"]["),s();const d=n.stack;n.stack=[],s=n.enter("reference");const c=n.safe(n.associationId(e),{before:l,after:"]",...a.current()});return s(),n.stack=d,o(),i==="full"||!u||u!==c?l+=a.move(c+"]"):i==="shortcut"?l=l.slice(0,-1):l+=a.move("]"),l}function iU(){return"!"}m0.peek=oU;function m0(e,t,n){let r=e.value||"",i="`",o=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++o<n.unsafe.length;){const s=n.unsafe[o],a=n.compilePattern(s);let l;if(s.atBreak)for(;l=a.exec(r);){let u=l.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(l.index+1)}}return i+r+i}function oU(){return"`"}function g0(e,t){const n=wm(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}y0.peek=sU;function y0(e,t,n,r){const i=Am(n),o=i==='"'?"Quote":"Apostrophe",s=n.createTracker(r);let a,l;if(g0(e,n)){const d=n.stack;n.stack=[],a=n.enter("autolink");let c=s.move("<");return c+=s.move(n.containerPhrasing(e,{before:c,after:">",...s.current()})),c+=s.move(">"),a(),n.stack=d,c}a=n.enter("link"),l=n.enter("label");let u=s.move("[");return u+=s.move(n.containerPhrasing(e,{before:u,after:"](",...s.current()})),u+=s.move("]("),l(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(l=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),l(),e.title&&(l=n.enter(`title${o}`),u+=s.move(" "+i),u+=s.move(n.safe(e.title,{before:u,after:i,...s.current()})),u+=s.move(i),l()),u+=s.move(")"),a(),u}function sU(e,t,n){return g0(e,n)?"<":"["}v0.peek=aU;function v0(e,t,n,r){const i=e.referenceType,o=n.enter("linkReference");let s=n.enter("label");const a=n.createTracker(r);let l=a.move("[");const u=n.containerPhrasing(e,{before:l,after:"]",...a.current()});l+=a.move(u+"]["),s();const d=n.stack;n.stack=[],s=n.enter("reference");const c=n.safe(n.associationId(e),{before:l,after:"]",...a.current()});return s(),n.stack=d,o(),i==="full"||!u||u!==c?l+=a.move(c+"]"):i==="shortcut"?l=l.slice(0,-1):l+=a.move("]"),l}function aU(){return"["}function Tm(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function lU(e){const t=Tm(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function uU(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function w0(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function cU(e,t,n,r){const i=n.enter("list"),o=n.bulletCurrent;let s=e.ordered?uU(n):Tm(n);const a=e.ordered?s==="."?")":".":lU(n);let l=t&&n.bulletLastUsed?s===n.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((s==="*"||s==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(l=!0),w0(n)===s&&d){let c=-1;for(;++c<e.children.length;){const f=e.children[c];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){l=!0;break}}}}l&&(s=a),n.bulletCurrent=s;const u=n.containerFlow(e,r);return n.bulletLastUsed=s,n.bulletCurrent=o,i(),u}function dU(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function fU(e,t,n,r){const i=dU(n);let o=n.bulletCurrent||Tm(n);t&&t.type==="list"&&t.ordered&&(o=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+o);let s=o.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(s=Math.ceil(s/4)*4);const a=n.createTracker(r);a.move(o+" ".repeat(s-o.length)),a.shift(s);const l=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,a.current()),d);return l(),u;function d(c,f,p){return f?(p?"":" ".repeat(s))+c:(p?o:o+" ".repeat(s-o.length))+c}}function pU(e,t,n,r){const i=n.enter("paragraph"),o=n.enter("phrasing"),s=n.containerPhrasing(e,r);return o(),i(),s}const hU=lc(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function mU(e,t,n,r){return(e.children.some(function(s){return hU(s)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function gU(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}_0.peek=yU;function _0(e,t,n,r){const i=gU(n),o=n.enter("strong"),s=n.createTracker(r),a=s.move(i+i);let l=s.move(n.containerPhrasing(e,{after:i,before:a,...s.current()}));const u=l.charCodeAt(0),d=_u(r.before.charCodeAt(r.before.length-1),u,i);d.inside&&(l=Ws(u)+l.slice(1));const c=l.charCodeAt(l.length-1),f=_u(r.after.charCodeAt(0),c,i);f.inside&&(l=l.slice(0,-1)+Ws(c));const p=s.move(i+i);return o(),n.attentionEncodeSurroundingInfo={after:f.outside,before:d.outside},a+l+p}function yU(e,t,n){return n.options.strong||"*"}function vU(e,t,n,r){return n.safe(e.value,r)}function wU(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function _U(e,t,n){const r=(w0(n)+(n.options.ruleSpaces?" ":"")).repeat(wU(n));return n.options.ruleSpaces?r.slice(0,-1):r}const b0={blockquote:$4,break:kw,code:Y4,definition:J4,emphasis:d0,hardBreak:kw,heading:tU,html:f0,image:p0,imageReference:h0,inlineCode:m0,link:y0,linkReference:v0,list:cU,listItem:fU,paragraph:pU,root:mU,strong:_0,text:vU,thematicBreak:_U};function bU(){return{enter:{table:xU,tableData:Sw,tableHeader:Sw,tableRow:SU},exit:{codeText:IU,table:kU,tableData:Id,tableHeader:Id,tableRow:Id}}}function xU(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function kU(e){this.exit(e),this.data.inTable=void 0}function SU(e){this.enter({type:"tableRow",children:[]},e)}function Id(e){this.exit(e)}function Sw(e){this.enter({type:"tableCell",children:[]},e)}function IU(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,EU));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function EU(e,t){return t==="|"?t:e}function CU(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,o=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:s,tableCell:l,tableRow:a}};function s(p,m,w,C){return u(d(p,w,C),p.align)}function a(p,m,w,C){const y=c(p,w,C),v=u([y]);return v.slice(0,v.indexOf(`
`))}function l(p,m,w,C){const y=w.enter("tableCell"),v=w.enter("phrasing"),g=w.containerPhrasing(p,{...C,before:o,after:o});return v(),y(),g}function u(p,m){return B4(p,{align:m,alignDelimiters:r,padding:n,stringLength:i})}function d(p,m,w){const C=p.children;let y=-1;const v=[],g=m.enter("table");for(;++y<C.length;)v[y]=c(C[y],m,w);return g(),v}function c(p,m,w){const C=p.children;let y=-1;const v=[],g=m.enter("tableRow");for(;++y<C.length;)v[y]=l(C[y],p,m,w);return g(),v}function f(p,m,w){let C=b0.inlineCode(p,m,w);return w.stack.includes("tableCell")&&(C=C.replace(/\|/g,"\\$&")),C}}function AU(){return{exit:{taskListCheckValueChecked:Iw,taskListCheckValueUnchecked:Iw,paragraph:RU}}}function TU(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:NU}}}function Iw(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function RU(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const i=t.children;let o=-1,s;for(;++o<i.length;){const a=i[o];if(a.type==="paragraph"){s=a;break}}s===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function NU(e,t,n,r){const i=e.children[0],o=typeof e.checked=="boolean"&&i&&i.type==="paragraph",s="["+(e.checked?"x":" ")+"] ",a=n.createTracker(r);o&&a.move(s);let l=b0.listItem(e,t,n,{...r,...a.current()});return o&&(l=l.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),l;function u(d){return d+s}}function PU(){return[c4(),N4(),L4(),bU(),AU()]}function DU(e){return{extensions:[d4(),P4(e),M4(),CU(e),TU()]}}const OU={tokenize:zU,partial:!0},x0={tokenize:BU,partial:!0},k0={tokenize:VU,partial:!0},S0={tokenize:$U,partial:!0},LU={tokenize:HU,partial:!0},I0={name:"wwwAutolink",tokenize:FU,previous:C0},E0={name:"protocolAutolink",tokenize:UU,previous:A0},sr={name:"emailAutolink",tokenize:jU,previous:T0},Fn={};function MU(){return{text:Fn}}let Gr=48;for(;Gr<123;)Fn[Gr]=sr,Gr++,Gr===58?Gr=65:Gr===91&&(Gr=97);Fn[43]=sr;Fn[45]=sr;Fn[46]=sr;Fn[95]=sr;Fn[72]=[sr,E0];Fn[104]=[sr,E0];Fn[87]=[sr,I0];Fn[119]=[sr,I0];function jU(e,t,n){const r=this;let i,o;return s;function s(c){return!fp(c)||!T0.call(r,r.previous)||Rm(r.events)?n(c):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(c))}function a(c){return fp(c)?(e.consume(c),a):c===64?(e.consume(c),l):n(c)}function l(c){return c===46?e.check(LU,d,u)(c):c===45||c===95||bt(c)?(o=!0,e.consume(c),l):d(c)}function u(c){return e.consume(c),i=!0,l}function d(c){return o&&i&&It(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(c)):n(c)}}function FU(e,t,n){const r=this;return i;function i(s){return s!==87&&s!==119||!C0.call(r,r.previous)||Rm(r.events)?n(s):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(OU,e.attempt(x0,e.attempt(k0,o),n),n)(s))}function o(s){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(s)}}function UU(e,t,n){const r=this;let i="",o=!1;return s;function s(c){return(c===72||c===104)&&A0.call(r,r.previous)&&!Rm(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(c),e.consume(c),a):n(c)}function a(c){if(It(c)&&i.length<5)return i+=String.fromCodePoint(c),e.consume(c),a;if(c===58){const f=i.toLowerCase();if(f==="http"||f==="https")return e.consume(c),l}return n(c)}function l(c){return c===47?(e.consume(c),o?u:(o=!0,l)):n(c)}function u(c){return c===null||yu(c)||Ae(c)||ki(c)||oc(c)?n(c):e.attempt(x0,e.attempt(k0,d),n)(c)}function d(c){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(c)}}function zU(e,t,n){let r=0;return i;function i(s){return(s===87||s===119)&&r<3?(r++,e.consume(s),i):s===46&&r===3?(e.consume(s),o):n(s)}function o(s){return s===null?n(s):t(s)}}function BU(e,t,n){let r,i,o;return s;function s(u){return u===46||u===95?e.check(S0,l,a)(u):u===null||Ae(u)||ki(u)||u!==45&&oc(u)?l(u):(o=!0,e.consume(u),s)}function a(u){return u===95?r=!0:(i=r,r=void 0),e.consume(u),s}function l(u){return i||r||!o?n(u):t(u)}}function VU(e,t){let n=0,r=0;return i;function i(s){return s===40?(n++,e.consume(s),i):s===41&&r<n?o(s):s===33||s===34||s===38||s===39||s===41||s===42||s===44||s===46||s===58||s===59||s===60||s===63||s===93||s===95||s===126?e.check(S0,t,o)(s):s===null||Ae(s)||ki(s)?t(s):(e.consume(s),i)}function o(s){return s===41&&r++,e.consume(s),i}}function $U(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),o):a===93?(e.consume(a),i):a===60||a===null||Ae(a)||ki(a)?t(a):n(a)}function i(a){return a===null||a===40||a===91||Ae(a)||ki(a)?t(a):r(a)}function o(a){return It(a)?s(a):n(a)}function s(a){return a===59?(e.consume(a),r):It(a)?(e.consume(a),s):n(a)}}function HU(e,t,n){return r;function r(o){return e.consume(o),i}function i(o){return bt(o)?n(o):t(o)}}function C0(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||Ae(e)}function A0(e){return!It(e)}function T0(e){return!(e===47||fp(e))}function fp(e){return e===43||e===45||e===46||e===95||bt(e)}function Rm(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const WU={tokenize:ZU,partial:!0};function qU(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:QU,continuation:{tokenize:JU},exit:XU}},text:{91:{name:"gfmFootnoteCall",tokenize:YU},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:KU,resolveTo:GU}}}}function KU(e,t,n){const r=this;let i=r.events.length;const o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let s;for(;i--;){const l=r.events[i][1];if(l.type==="labelImage"){s=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!s||!s._balanced)return n(l);const u=_n(r.sliceSerialize({start:s.end,end:r.now()}));return u.codePointAt(0)!==94||!o.includes(u.slice(1))?n(l):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(l),e.exit("gfmFootnoteCallLabelMarker"),t(l))}}function GU(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;const o={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},s={type:"chunkString",contentType:"string",start:Object.assign({},o.start),end:Object.assign({},o.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",o,t],["enter",s,t],["exit",s,t],["exit",o,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function YU(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o=0,s;return a;function a(c){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),l}function l(c){return c!==94?n(c):(e.enter("gfmFootnoteCallMarker"),e.consume(c),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(c){if(o>999||c===93&&!s||c===null||c===91||Ae(c))return n(c);if(c===93){e.exit("chunkString");const f=e.exit("gfmFootnoteCallString");return i.includes(_n(r.sliceSerialize(f)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(c)}return Ae(c)||(s=!0),o++,e.consume(c),c===92?d:u}function d(c){return c===91||c===92||c===93?(e.consume(c),o++,u):u(c)}}function QU(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o,s=0,a;return l;function l(m){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(m){return m===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(m)}function d(m){if(s>999||m===93&&!a||m===null||m===91||Ae(m))return n(m);if(m===93){e.exit("chunkString");const w=e.exit("gfmFootnoteDefinitionLabelString");return o=_n(r.sliceSerialize(w)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),f}return Ae(m)||(a=!0),s++,e.consume(m),m===92?c:d}function c(m){return m===91||m===92||m===93?(e.consume(m),s++,d):d(m)}function f(m){return m===58?(e.enter("definitionMarker"),e.consume(m),e.exit("definitionMarker"),i.includes(o)||i.push(o),me(e,p,"gfmFootnoteDefinitionWhitespace")):n(m)}function p(m){return t(m)}}function JU(e,t,n){return e.check(va,t,e.attempt(WU,t,n))}function XU(e){e.exit("gfmFootnoteDefinition")}function ZU(e,t,n){const r=this;return me(e,i,"gfmFootnoteDefinitionIndent",5);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="gfmFootnoteDefinitionIndent"&&s[2].sliceSerialize(s[1],!0).length===4?t(o):n(o)}}function ez(e){let n=(e||{}).singleTilde;const r={name:"strikethrough",tokenize:o,resolveAll:i};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function i(s,a){let l=-1;for(;++l<s.length;)if(s[l][0]==="enter"&&s[l][1].type==="strikethroughSequenceTemporary"&&s[l][1]._close){let u=l;for(;u--;)if(s[u][0]==="exit"&&s[u][1].type==="strikethroughSequenceTemporary"&&s[u][1]._open&&s[l][1].end.offset-s[l][1].start.offset===s[u][1].end.offset-s[u][1].start.offset){s[l][1].type="strikethroughSequence",s[u][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},s[u][1].start),end:Object.assign({},s[l][1].end)},c={type:"strikethroughText",start:Object.assign({},s[u][1].end),end:Object.assign({},s[l][1].start)},f=[["enter",d,a],["enter",s[u][1],a],["exit",s[u][1],a],["enter",c,a]],p=a.parser.constructs.insideSpan.null;p&&Yt(f,f.length,0,sc(p,s.slice(u+1,l),a)),Yt(f,f.length,0,[["exit",c,a],["enter",s[l][1],a],["exit",s[l][1],a],["exit",d,a]]),Yt(s,u-1,l-u+3,f),l=u+f.length-2;break}}for(l=-1;++l<s.length;)s[l][1].type==="strikethroughSequenceTemporary"&&(s[l][1].type="data");return s}function o(s,a,l){const u=this.previous,d=this.events;let c=0;return f;function f(m){return u===126&&d[d.length-1][1].type!=="characterEscape"?l(m):(s.enter("strikethroughSequenceTemporary"),p(m))}function p(m){const w=yo(u);if(m===126)return c>1?l(m):(s.consume(m),c++,p);if(c<2&&!n)return l(m);const C=s.exit("strikethroughSequenceTemporary"),y=yo(m);return C._open=!y||y===2&&!!w,C._close=!w||w===2&&!!y,a(m)}}}class tz{constructor(){this.map=[]}add(t,n,r){nz(this,t,n,r)}consume(t){if(this.map.sort(function(o,s){return o[0]-s[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push(t.slice()),t.length=0;let i=r.pop();for(;i;){for(const o of i)t.push(o);i=r.pop()}this.map.length=0}}function nz(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function rz(e,t){let n=!1;const r=[];for(;t<e.length;){const i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const o=r.length-1;r[o]=r[o]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function iz(){return{flow:{null:{name:"table",tokenize:oz,resolveAll:sz}}}}function oz(e,t,n){const r=this;let i=0,o=0,s;return a;function a(E){let F=r.events.length-1;for(;F>-1;){const Z=r.events[F][1].type;if(Z==="lineEnding"||Z==="linePrefix")F--;else break}const V=F>-1?r.events[F][1].type:null,Q=V==="tableHead"||V==="tableRow"?x:l;return Q===x&&r.parser.lazy[r.now().line]?n(E):Q(E)}function l(E){return e.enter("tableHead"),e.enter("tableRow"),u(E)}function u(E){return E===124||(s=!0,o+=1),d(E)}function d(E){return E===null?n(E):Y(E)?o>1?(o=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(E),e.exit("lineEnding"),p):n(E):ce(E)?me(e,d,"whitespace")(E):(o+=1,s&&(s=!1,i+=1),E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),s=!0,d):(e.enter("data"),c(E)))}function c(E){return E===null||E===124||Ae(E)?(e.exit("data"),d(E)):(e.consume(E),E===92?f:c)}function f(E){return E===92||E===124?(e.consume(E),c):c(E)}function p(E){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(E):(e.enter("tableDelimiterRow"),s=!1,ce(E)?me(e,m,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(E):m(E))}function m(E){return E===45||E===58?C(E):E===124?(s=!0,e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),w):S(E)}function w(E){return ce(E)?me(e,C,"whitespace")(E):C(E)}function C(E){return E===58?(o+=1,s=!0,e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),y):E===45?(o+=1,y(E)):E===null||Y(E)?k(E):S(E)}function y(E){return E===45?(e.enter("tableDelimiterFiller"),v(E)):S(E)}function v(E){return E===45?(e.consume(E),v):E===58?(s=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),g):(e.exit("tableDelimiterFiller"),g(E))}function g(E){return ce(E)?me(e,k,"whitespace")(E):k(E)}function k(E){return E===124?m(E):E===null||Y(E)?!s||i!==o?S(E):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(E)):S(E)}function S(E){return n(E)}function x(E){return e.enter("tableRow"),A(E)}function A(E){return E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),A):E===null||Y(E)?(e.exit("tableRow"),t(E)):ce(E)?me(e,A,"whitespace")(E):(e.enter("data"),R(E))}function R(E){return E===null||E===124||Ae(E)?(e.exit("data"),A(E)):(e.consume(E),E===92?D:R)}function D(E){return E===92||E===124?(e.consume(E),R):R(E)}}function sz(e,t){let n=-1,r=!0,i=0,o=[0,0,0,0],s=[0,0,0,0],a=!1,l=0,u,d,c;const f=new tz;for(;++n<e.length;){const p=e[n],m=p[1];p[0]==="enter"?m.type==="tableHead"?(a=!1,l!==0&&(Ew(f,t,l,u,d),d=void 0,l=0),u={type:"table",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",u,t]])):m.type==="tableRow"||m.type==="tableDelimiterRow"?(r=!0,c=void 0,o=[0,0,0,0],s=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",d,t]])),i=m.type==="tableDelimiterRow"?2:d?3:1):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")?(r=!1,s[2]===0&&(o[1]!==0&&(s[0]=s[1],c=Ja(f,t,o,i,void 0,c),o=[0,0,0,0]),s[2]=n)):m.type==="tableCellDivider"&&(r?r=!1:(o[1]!==0&&(s[0]=s[1],c=Ja(f,t,o,i,void 0,c)),o=s,s=[o[1],n,0,0])):m.type==="tableHead"?(a=!0,l=n):m.type==="tableRow"||m.type==="tableDelimiterRow"?(l=n,o[1]!==0?(s[0]=s[1],c=Ja(f,t,o,i,n,c)):s[1]!==0&&(c=Ja(f,t,s,i,n,c)),i=0):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")&&(s[3]=n)}for(l!==0&&Ew(f,t,l,u,d),f.consume(t.events),n=-1;++n<t.events.length;){const p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=rz(t.events,n))}return e}function Ja(e,t,n,r,i,o){const s=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(o.end=Object.assign({},Pi(t.events,n[0])),e.add(n[0],0,[["exit",o,t]]));const l=Pi(t.events,n[1]);if(o={type:s,start:Object.assign({},l),end:Object.assign({},l)},e.add(n[1],0,[["enter",o,t]]),n[2]!==0){const u=Pi(t.events,n[2]),d=Pi(t.events,n[3]),c={type:a,start:Object.assign({},u),end:Object.assign({},d)};if(e.add(n[2],0,[["enter",c,t]]),r!==2){const f=t.events[n[2]],p=t.events[n[3]];if(f[1].end=Object.assign({},p[1].end),f[1].type="chunkText",f[1].contentType="text",n[3]>n[2]+1){const m=n[2]+1,w=n[3]-n[2]-1;e.add(m,w,[])}}e.add(n[3]+1,0,[["exit",c,t]])}return i!==void 0&&(o.end=Object.assign({},Pi(t.events,i)),e.add(i,0,[["exit",o,t]]),o=void 0),o}function Ew(e,t,n,r,i){const o=[],s=Pi(t.events,n);i&&(i.end=Object.assign({},s),o.push(["exit",i,t])),r.end=Object.assign({},s),o.push(["exit",r,t]),e.add(n+1,0,o)}function Pi(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const az={name:"tasklistCheck",tokenize:uz};function lz(){return{text:{91:az}}}function uz(e,t,n){const r=this;return i;function i(l){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(l):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(l),e.exit("taskListCheckMarker"),o)}function o(l){return Ae(l)?(e.enter("taskListCheckValueUnchecked"),e.consume(l),e.exit("taskListCheckValueUnchecked"),s):l===88||l===120?(e.enter("taskListCheckValueChecked"),e.consume(l),e.exit("taskListCheckValueChecked"),s):n(l)}function s(l){return l===93?(e.enter("taskListCheckMarker"),e.consume(l),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(l)}function a(l){return Y(l)?t(l):ce(l)?e.check({tokenize:cz},t,n)(l):n(l)}}function cz(e,t,n){return me(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function dz(e){return FS([MU(),qU(),ez(e),iz(),lz()])}const fz={};function pz(e){const t=this,n=e||fz,r=t.data(),i=r.micromarkExtensions||(r.micromarkExtensions=[]),o=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),s=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);i.push(dz(n)),o.push(PU()),s.push(DU(n))}function R0({content:e}){return h.jsx("div",{className:"min-w-0 overflow-x-auto break-words text-app-muted",children:h.jsx(e4,{skipHtml:!0,remarkPlugins:[pz],components:{a:({children:t,href:n,title:r})=>n?h.jsx("a",{className:"font-bold text-app-accent underline underline-offset-2",href:n,rel:"noreferrer noopener",target:"_blank",title:r,children:t}):h.jsx("span",{children:t}),blockquote:({children:t})=>h.jsx("blockquote",{className:"border-l-2 border-app-line pl-3 italic",children:t}),code:({children:t})=>h.jsx("code",{className:"rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-app-ink",children:t}),h1:({children:t})=>h.jsx("h3",{className:"text-base font-extrabold text-app-ink",children:t}),h2:({children:t})=>h.jsx("h4",{className:"text-sm font-extrabold text-app-ink",children:t}),h3:({children:t})=>h.jsx("h5",{className:"text-sm font-bold text-app-ink",children:t}),li:({children:t})=>h.jsx("li",{className:"my-0.5",children:t}),ol:({children:t})=>h.jsx("ol",{className:"my-2 list-decimal space-y-0.5 pl-5",children:t}),p:({children:t})=>h.jsx("p",{className:"my-2 first:mt-0 last:mb-0",children:t}),pre:({children:t})=>h.jsx("pre",{className:"my-2 max-w-full overflow-x-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",children:t}),table:({children:t})=>h.jsx("table",{className:"my-2 w-full border-collapse text-left text-xs",children:t}),td:({children:t})=>h.jsx("td",{className:"border border-app-line px-2 py-1 align-top",children:t}),th:({children:t})=>h.jsx("th",{className:"border border-app-line bg-app-panel px-2 py-1 font-bold text-app-ink",children:t}),ul:({children:t})=>h.jsx("ul",{className:"my-2 list-disc space-y-0.5 pl-5",children:t})},children:e})})}function hz({activeApp:e,activeBuilderModel:t,activeBuilderProfileName:n,aiConfigured:r,builderActivity:i,builderError:o,builderIsRunning:s,builderMessages:a,builderReasoning:l,builderReasoningMessageId:u,builderStreamingContent:d,builderUsage:c,consoleEntries:f,mode:p,onClearBuilderConversation:m,onClearConsole:w,onClose:C,onImportAppData:y,onLoadAppData:v,onOpenAiSettings:g,onOpenBuilderProfileSettings:k,onSaveSource:S,onSendBuilderMessage:x}){const A=p!==null,R=p==="source"?"Source":p==="builder"?"BuilderAI":p==="console"?"Console":"App tools";return h.jsxs("aside",{className:`fixed bottom-11 right-0 z-20 grid h-[min(74svh,620px)] min-w-0 w-full grid-rows-[44px_minmax(0,1fr)] overflow-hidden border-t border-app-line bg-app-panel shadow-panel transition-transform duration-200 lg:bottom-0 lg:top-11 lg:h-auto lg:w-[min(420px,36vw)] lg:border-l lg:border-t-0 ${A?"translate-y-0 lg:translate-x-0":"translate-y-[calc(100%+44px)] lg:translate-x-full lg:translate-y-0"}`,"aria-label":R,"aria-hidden":!A,children:[h.jsxs("header",{className:"flex min-h-0 items-center justify-between gap-3 border-b border-app-line px-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"m-0 truncate text-[11px] font-extrabold uppercase text-app-muted",children:e.name}),h.jsxs("div",{className:"flex min-w-0 items-baseline gap-1.5",children:[h.jsx("h2",{className:"shrink-0 truncate text-base font-extrabold leading-tight",children:R}),p==="builder"&&n?h.jsxs("div",{className:"flex min-w-0 items-baseline gap-1.5 text-xs font-bold text-app-muted",children:[h.jsx("span",{"aria-hidden":"true",className:"shrink-0",children:"·"}),h.jsx("button",{className:"min-w-0 truncate text-left text-app-accent underline underline-offset-2",type:"button","aria-label":`Open Builder profile settings for ${n}`,title:`Active profile: ${n}`,onClick:k,children:n}),t?h.jsxs(h.Fragment,{children:[h.jsx("span",{"aria-hidden":"true",className:"shrink-0",children:"·"}),h.jsx("button",{className:"min-w-0 truncate text-left text-app-accent underline underline-offset-2",type:"button","aria-label":`Open AI connection settings for ${t}`,title:`Active model: ${t}`,onClick:g,children:t})]}):null]}):null]})]}),h.jsx("button",{className:"min-h-8 w-8 rounded-full border border-transparent bg-transparent p-0 text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Close ${R}`,onClick:C,children:"×"})]}),p==="source"?h.jsx(mz,{app:e,onImportAppData:y,onLoadAppData:v,onSaveSource:S}):p==="console"?h.jsx(bz,{entries:f,onClear:w}):h.jsx(vz,{activity:i,app:e,configured:r,error:o,isRunning:s,messages:a,reasoning:l,reasoningMessageId:u,streamingContent:d,usage:c,onClear:m,onOpenAiSettings:g,onSendMessage:x})]})}function mz({app:e,onImportAppData:t,onLoadAppData:n,onSaveSource:r}){const[i,o]=N.useState(e.sourceCode),[s,a]=N.useState(!1),[l,u]=N.useState(!1),[d,c]=N.useState(!0),[f,p]=N.useState(!1),[m,w]=N.useState(""),[C,y]=N.useState(""),[v,g]=N.useState(""),[k,S]=N.useState("Ready"),[x,A]=N.useState("Ready"),[R,D]=N.useState(""),[E,F]=N.useState("Ready");N.useEffect(()=>{o(e.sourceCode),S("Ready"),c(!0),p(!1),u(!1),D(""),F("Ready"),w(""),y(""),g(""),A("Ready")},[e.appId,e.sourceCode]);async function V(){S("Saving...");try{await r(i),S("Saved.")}catch(_){S(_ instanceof Error?_.message:"Could not save.")}}async function Q(){A("Loading data...");try{const _=await n(e.appId),K=JSON.stringify(_,null,2);return w(K),A("Data loaded."),K}catch(_){return A(_ instanceof Error?_.message:"Could not load app data."),null}}async function Z(_,K){if(!_){A(`No ${K} to copy.`);return}try{await Nm(navigator.clipboard.writeText(_),1500),y(""),g(""),A("Copied.")}catch{y(_),g(K),A("Select and copy manually.")}}async function ne(){const _=m||await Q();_&&await Z(_,"app data")}async function ye(_){p(_),_&&!m&&await Q()}async function _e(){if(!d&&!f){A("Select at least one export.");return}const _=[];if(d&&_.push({contents:i,kind:"source"}),f){const X=m||await Q();if(!X)return;_.push({contents:X,kind:"data"})}const K=_.filter(X=>yz(X.contents,Ed(e.name,X.kind),gz(X.kind))).length;A(K===_.length?"Download started.":"Download is unavailable.")}async function z(){if(!R.trim()){F("Paste JSON or choose a file first.");return}let _;try{_=ju(JSON.parse(R))}catch(K){F(K instanceof Error?K.message:"Could not parse app data JSON.");return}F("Importing...");try{await t(e.appId,_),D(""),F("Imported.")}catch(K){F(K instanceof Error?K.message:"Could not import app data.")}}async function q(_){if(_)try{D(await _.text()),F(`${_.name} loaded. Review and import.`)}catch{F("Could not read the JSON file.")}}return h.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto_auto] bg-[#111827]",children:[h.jsx("div",{className:"min-h-0 bg-[#111827]",children:h.jsx("textarea",{className:"h-full min-h-0 w-full resize-none border-0 bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 outline-none [tab-size:2]",spellCheck:!1,value:i,onChange:_=>{o(_.target.value),S("Unsaved changes")}})}),s?h.jsxs("div",{className:"grid gap-3 border-t border-app-line bg-app-panel p-3",children:[h.jsxs("fieldset",{className:"grid gap-2",children:[h.jsx("legend",{className:"sr-only",children:"Export files"}),h.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[h.jsx("input",{checked:d,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:_=>c(_.target.checked)}),h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block",children:"Source code"}),h.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:Ed(e.name,"source")})]})]}),h.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[h.jsx("input",{checked:f,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:_=>void ye(_.target.checked)}),h.jsxs("span",{className:"min-w-0",children:[h.jsx("span",{className:"block",children:"App data"}),h.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:Ed(e.name,"data")})]})]})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:()=>void _e(),children:"Download selected"}),h.jsxs("div",{className:"flex flex-wrap gap-2",children:[f?h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void Q(),children:"Refresh data"}):null,h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void Z(i,"source code"),children:"Copy source"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void ne(),children:"Copy data"})]})]}),C?h.jsx("textarea",{"aria-label":`${v} export`,className:"h-32 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:C,onFocus:_=>_.target.select()}):null,h.jsx("div",{className:"text-xs font-bold text-app-muted",children:x})]}):null,l?h.jsxs("div",{className:"grid gap-3 border-t border-app-line bg-app-panel p-3",children:[h.jsxs("label",{className:"grid gap-1.5 text-sm font-bold text-app-ink",children:["Paste app data JSON",h.jsx("textarea",{"aria-label":"App data JSON",className:"min-h-32 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink outline-none focus:border-app-accent",placeholder:'{"items": []}',value:R,onChange:_=>{D(_.target.value),F("Ready")}})]}),h.jsxs("label",{className:"grid gap-1.5 text-sm font-bold text-app-ink",children:["Or upload a JSON file",h.jsx("input",{accept:".json,application/json","aria-label":"Upload app data JSON",className:"block w-full rounded-md border border-app-line bg-white px-3 py-2 text-sm font-normal text-app-ink file:mr-3 file:rounded-md file:border-0 file:bg-app-accent file:px-3 file:py-1.5 file:font-bold file:text-white",type:"file",onChange:_=>{var X;const K=_.currentTarget;q((X=K.files)==null?void 0:X[0]).finally(()=>{K.value=""})}})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:!R.trim(),onClick:()=>void z(),children:"Import data"}),h.jsx("div",{className:"text-xs font-bold text-app-muted",children:E})]})]}):null,h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",children:k}),h.jsxs("div",{className:"flex gap-2",children:[h.jsxs("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{a(_=>!_),u(!1)},children:["Export ",s?"↓":"↑"]}),h.jsxs("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{u(_=>!_),a(!1)},children:["Import ",l?"↓":"↑"]}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:V,children:"Save"})]})]})]})}function Ed(e,t){const r=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)||"untitled-app";return t==="source"?`${r}.html`:`${r}.data.json`}function gz(e){return e==="source"?"text/html;charset=utf-8":"application/json;charset=utf-8"}function yz(e,t,n){if(typeof window.URL.createObjectURL!="function")return!1;const r=window.URL.createObjectURL(new Blob([e],{type:n})),i=document.createElement("a");return i.href=r,i.download=t,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>{typeof window.URL.revokeObjectURL=="function"&&window.URL.revokeObjectURL(r)},0),!0}function vz({activity:e,app:t,configured:n,error:r,isRunning:i,messages:o,reasoning:s,reasoningMessageId:a,streamingContent:l,usage:u,onClear:d,onOpenAiSettings:c,onSendMessage:f}){const p=N.useRef(null),[m,w]=N.useState(""),[C,y]=N.useState(!1),[v,g]=N.useState(""),k=N.useMemo(()=>uC(t.name,t.sourceCode),[t.name,t.sourceCode]),S="builder-prompt-code";N.useEffect(()=>{w(""),y(!1),g("")},[t.appId]),N.useEffect(()=>{var R;typeof((R=p.current)==null?void 0:R.scrollIntoView)=="function"&&p.current.scrollIntoView({block:"nearest"})},[e,r,o.length,s,l]);async function x(){const R=m.trim();!n||i||!R||(w(""),await f(R))}async function A(){try{await Nm(navigator.clipboard.writeText(k),1500),g("Copied.")}catch{y(!0),g("Select and copy manually.")}}return h.jsxs("div",{className:"grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto]",children:[h.jsx("div",{className:"min-h-0 overflow-auto",children:h.jsxs("ol",{className:"flex min-w-0 flex-col gap-3 p-3","aria-live":"polite",children:[h.jsxs("li",{className:"mr-auto grid max-w-[92%] gap-2 rounded-lg border border-app-line bg-white px-3 py-3 text-sm leading-relaxed text-app-muted",children:[h.jsx("p",{className:"font-bold text-app-ink",children:"Hi,"}),n?h.jsxs(h.Fragment,{children:[h.jsxs("p",{children:["Describe how you want to edit ",t.name,"."]}),h.jsx("p",{children:"Or use the button below to work in an external AI chat."})]}):h.jsxs(h.Fragment,{children:[h.jsx("p",{children:"Use the button below to work in an external AI chat."}),h.jsxs("p",{children:["Or set up your AI provider in"," ",h.jsx("button",{className:"font-bold text-app-accent underline underline-offset-2",type:"button",onClick:c,children:"Settings"})," ","to chat directly here."]})]}),h.jsx("div",{children:h.jsxs("button",{"aria-controls":S,"aria-expanded":C,className:"inline-flex min-h-9 items-center gap-2 rounded-md border border-app-line bg-app-panel px-3 text-sm font-bold text-app-ink hover:border-app-accent hover:text-app-accent",type:"button",onClick:()=>{y(!0),g("")},children:[h.jsx(Aw,{className:"h-4 w-4"}),"Copy prompt + code"]})})]}),o.map(R=>h.jsxs(N.Fragment,{children:[R.messageId===a&&s?h.jsx(Cw,{activity:null,content:s,isRunning:!1}):null,h.jsx(wz,{message:R})]},R.messageId)),!a&&(i||s||e)?h.jsx(Cw,{activity:e,content:s,isRunning:i}):null,l?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-white px-3 py-2 text-sm leading-relaxed",children:h.jsx(R0,{content:l})}):null,e&&a?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm font-bold text-app-muted",children:e}):null,r?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-700",role:"alert",children:r}):null,h.jsx("li",{"aria-hidden":"true",className:"h-px",ref:p})]})}),h.jsxs("form",{className:"grid gap-2 border-t border-app-line p-3",onSubmit:R=>{R.preventDefault(),x()},children:[h.jsxs("p",{"aria-label":"Builder session usage",className:"text-right text-xs font-bold text-app-muted",children:["Session: ",_z(u)]}),n?h.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2",children:[h.jsx("label",{className:"sr-only",htmlFor:"builder-message",children:"Message"}),h.jsx("textarea",{className:"max-h-36 min-h-11 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink outline-none focus:border-app-accent disabled:bg-slate-100",disabled:i,id:"builder-message",rows:2,placeholder:"Ask BuilderAI to change this app",value:m,onChange:R=>w(R.target.value),onKeyDown:R=>{var D;R.key!=="Enter"||R.shiftKey||R.nativeEvent.isComposing||(R.preventDefault(),(D=R.currentTarget.form)==null||D.requestSubmit())}}),h.jsx("button",{className:"grid h-10 min-h-10 w-10 place-items-center rounded-full border border-app-accent bg-app-accent p-0 text-xl font-bold text-white hover:bg-app-strong disabled:opacity-50",disabled:i||!m.trim(),type:"submit","aria-label":"Send message",children:"↑"})]}):null,C?h.jsxs("div",{className:"grid gap-2 rounded-md border border-app-line bg-app-panel p-2",id:S,children:[h.jsxs("div",{className:"flex items-start justify-between gap-3",children:[h.jsxs("p",{className:"text-sm leading-relaxed text-app-muted",children:["Copy this prompt into an external AI. Paste the returned HTML into ",h.jsx("span",{className:"font-mono text-app-ink",children:"<>"})," and save."]}),h.jsx("button",{"aria-label":"Close prompt and code",className:"grid h-8 min-h-8 w-8 shrink-0 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button",onClick:()=>y(!1),children:"×"})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",role:"status",children:v}),h.jsxs("button",{className:"inline-flex min-h-8 items-center gap-2 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:A,children:[h.jsx(Aw,{className:"h-4 w-4"}),"Copy"]})]}),h.jsx("textarea",{"aria-label":"Prompt and code",className:"h-40 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:k,onFocus:R=>R.target.select()})]}):null,h.jsx("div",{className:"flex flex-wrap justify-start gap-2",children:o.length||r?h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-muted hover:border-red-300 hover:text-red-700 disabled:opacity-50",disabled:i,type:"button",onClick:d,children:"Clear chat"}):null})]})]})}function wz({message:e}){return e.role==="assistant"?h.jsx("li",{className:"mr-auto max-w-[92%] rounded-lg border border-app-line bg-white px-3 py-2 text-sm leading-relaxed",children:h.jsx(R0,{content:e.content})}):h.jsx("li",{className:"ml-auto min-w-0 max-w-[92%] whitespace-pre-wrap break-words rounded-lg bg-app-accent px-3 py-2 text-sm leading-relaxed text-white",children:e.content})}function Cw({activity:e,content:t,isRunning:n}){const r=N.useRef(null),[i,o]=N.useState(0);return N.useEffect(()=>{if(!n)return;r.current&&(r.current.open=!1);const s=Date.now();o(0);const a=window.setInterval(()=>o(Math.floor((Date.now()-s)/1e3)),1e3);return()=>window.clearInterval(a)},[n]),h.jsx("li",{className:"mr-auto w-[92%] max-w-[92%] text-sm text-app-muted",children:h.jsxs("details",{className:"rounded-lg border border-app-line bg-app-accent/10 px-3 py-2",ref:r,children:[h.jsxs("summary",{className:"cursor-pointer font-bold text-app-ink",children:[h.jsx("span",{className:n?"animate-pulse":"",children:e??"Reasoning"}),n?h.jsxs("span",{className:"ml-1 font-normal text-app-muted",children:[i,"s"]}):null]}),h.jsx("div",{className:"mt-2 max-h-56 overflow-auto whitespace-pre-wrap border-t border-app-line pt-2 text-xs leading-relaxed",children:t||(n?"Waiting for model reasoning...":"This model did not expose reasoning text.")})]})})}function Aw({className:e}){return h.jsxs("svg",{className:e,"aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h.jsx("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),h.jsx("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]})}function _z(e){const t=e.totalTokens<1e3?String(e.totalTokens):`${(e.totalTokens/1e3).toFixed(1)}k`;return[e.costUsd===null?null:`$${e.costUsd.toFixed(e.costUsd<.1?4:2)}`,`${t} tokens`].filter(Boolean).join(" · ")}function bz({entries:e,onClear:t}){const[n,r]=N.useState("Ready"),i=N.useMemo(()=>xz(e),[e]);async function o(){if(!i){r("No output");return}try{await Nm(navigator.clipboard.writeText(i),1500),r("Copied.")}catch{r("Select and copy manually.")}}return h.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto] bg-slate-950",children:[h.jsx("div",{className:"min-h-0 overflow-auto p-3 font-mono text-xs leading-relaxed text-slate-200",children:e.length?h.jsx("ol",{className:"select-text space-y-4",children:e.map(s=>h.jsxs("li",{className:"whitespace-pre-wrap break-words",children:[h.jsxs("span",{className:"text-slate-500",children:["[",N0(s.timestamp),"] "]}),h.jsx("span",{className:`font-extrabold ${kz(s.level)}`,children:s.level.toUpperCase()}),h.jsxs("span",{children:[" ",s.args.join(" ")||"(empty)"]})]},s.id))}):h.jsx("p",{className:"select-text text-slate-400",children:"No console output yet."})}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[h.jsx("div",{className:"text-xs font-bold text-app-muted",children:n}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{t(),r("Cleared.")},children:"Clear"}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:o,children:"Copy"})]})]})]})}function Nm(e,t){return new Promise((n,r)=>{const i=window.setTimeout(()=>r(new Error("Timed out.")),t);e.then(o=>{window.clearTimeout(i),n(o)},o=>{window.clearTimeout(i),r(o)})})}function xz(e){return e.map(t=>{const n=t.args.join(" ")||"(empty)";return`[${N0(t.timestamp)}] ${t.level.toUpperCase()} ${n}`}).join(`

`)}function N0(e){return new Intl.DateTimeFormat(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date(e))}function kz(e){return e==="error"?"text-red-400":e==="warn"?"text-amber-300":e==="info"?"text-sky-300":e==="debug"?"text-violet-300":"text-slate-100"}function Sz({aiActions:e,core:t,syncActions:n}){var Pm,Dm,Om,Lm,Mm,jm,Fm,Um;const[r,i]=N.useState({apiKey:"",model:""}),[o,s]=N.useState({...uh}),[a,l]=N.useState([]),[u,d]=N.useState({}),[c,f]=N.useState([]),[p,m]=N.useState({}),[w,C]=N.useState({}),[y,v]=N.useState(null),[g,k]=N.useState(null),[S,x]=N.useState(null),[A,R]=N.useState("launcher"),[D,E]=N.useState(null),[F,V]=N.useState(!1),[Q,Z]=N.useState(),[ne,ye]=N.useState(),[_e,z]=N.useState(null),[q,_]=N.useState(null),[K,X]=N.useState(null),[I,ke]=N.useState(0),[je,fe]=N.useState(!0),[Ue,be]=N.useState([]),[Ge,Se]=N.useState(null),[gt,Re]=N.useState(!1),[Sn,pe]=N.useState(0),$t=N.useRef(null),He=N.useRef(new Set),Ze=N.useRef(navigator.onLine),In=N.useRef([]),Nt=N.useRef(null);$t.current=(S==null?void 0:S.appId)??null,In.current=Ue;function Ye(){return Ze.current&&Nt.current!==!1}async function Un(O,$){X(null),n.noteLocalAppDataEdit(O),await t.saveAppData(O,$),await cc("App data saved locally. Remote data sync failed",()=>n.pushAppData(O,$)),_a(n.flushAppDataSyncQueue()),await we()}async function ar(O,$){await Un(O,$),pe(G=>G+1)}N.useEffect(()=>{we(Ye())},[]),N.useEffect(()=>{e.getConfig().then(i)},[e]),N.useEffect(()=>{e.listBuilderProfiles().then(l)},[e]),N.useEffect(()=>{e.getBuilderPreferences().then(s)},[e]);const En=N.useMemo(()=>Yg(a,o.activeProfileId),[o.activeProfileId,a]);N.useEffect(()=>{let O=!1,$=null,G=null;async function Ee(Qe=Ye()){try{if(!Qe){O||await we(!1);return}await n.flushRoomLifecycleQueue(),await n.flushSourceSyncQueue(),await n.flushAppDataSyncQueue(),await n.flushOwnedAppDeletionQueue(),await n.flushWorkspaceManifestQueue(),await n.pullLatestWorkspaceManifest(),O||await we(!0)}catch(dt){const O0=dt instanceof Error?dt.message:"Unknown sync error.";O||Se(`Could not retry pending sync: ${O0}`)}}function Ne(){document.visibilityState==="visible"&&Ee(Ye())}function ot(){Ee(Ye())}function Pt(){Ze.current=!0,Ee(Ye())}function We(){Ze.current=!1,we(!1)}async function Ht(){const{storageConfigured:Qe}=await n.initializeWorkspaceSync();if(!Qe){Ee(Ye());return}$=await n.subscribeStorageConnection(dt=>{Nt.current=dt,dt?Ee(Ye()):we(!1)}),G=await n.subscribeWorkspaceManifest(()=>{O||we(Ye())})}return Nt.current=null,Ht(),window.addEventListener("online",Pt),window.addEventListener("offline",We),window.addEventListener("focus",ot),document.addEventListener("visibilitychange",Ne),()=>{O=!0,$==null||$(),G==null||G(),window.removeEventListener("online",Pt),window.removeEventListener("offline",We),window.removeEventListener("focus",ot),document.removeEventListener("visibilitychange",Ne)}},[y==null?void 0:y.profileId,y==null?void 0:y.databaseUrl,n,g]),N.useEffect(()=>{function O(){try{_(yA(window.location.hash))}catch{_(null)}}return O(),window.addEventListener("hashchange",O),()=>window.removeEventListener("hashchange",O)},[]),N.useEffect(()=>{if(!S)return;const O=S;let $=null,G=!1;async function Ee(){const Ne=await n.subscribeAppData(O.appId,({data:ot,version:Pt})=>{G||X({data:ot,id:crypto.randomUUID(),version:Pt})});G?Ne():$=Ne}return Ee(),()=>{G=!0,$==null||$()}},[S==null?void 0:S.appId,n]),N.useEffect(()=>{if(!S)return;const O=S;let $=null,G=!1;async function Ee(){const Ne=await n.subscribeAppSource(O.appId,({app:ot})=>{G||(x(ot),Se(null),we())},()=>{G||(Se("This shared app was deleted by its owner."),we())});G?Ne():$=Ne}return Ee(),()=>{G=!0,$==null||$()}},[S==null?void 0:S.appId,n]);async function we(O=Ye()){const $=await t.listApps(),G=await n.getWorkspaceSyncOverview($.map(Ee=>Ee.appId));f($),m(G.appBadges),C(Pz({apps:$,badges:G.appBadges,isOnline:O,queueItems:G.pendingOperations})),v(G.storageProfile),k(G.workspaceManifestRoomId)}async function lr(O){const $=await t.getApp(O);$&&(x($),R("app"),E(null),be([]),Re(!1),ke(G=>G+1),fe(!1),un(O))}async function b(O){let $={},G=null;try{$=await Ev(O.sourceCode)}catch(Ne){const ot=Ne instanceof Error?Ne.message:"Unknown Tailwind compile error.";G=`${O.name} created without compiled Tailwind CSS: ${ot}`}const Ee=await t.createApp({...O,...$});G&&Se(G),x(Ee),R("app"),E(null),be([]),Re(!1),ke(Ne=>Ne+1),fe(!1),n.ensureAppBackedUp(Ee,{flush:Ye()}).then(()=>we(),Ne=>{const ot=Ne instanceof Error?Ne.message:"Unknown sync error.";Se(`App created locally. Remote backup failed: ${ot}`),we(!1)}),_a(n.flushRoomLifecycleQueue()),await we()}async function T(){const[O,$]=await Promise.all([e.listBuilderProfiles(),e.getBuilderPreferences()]);l(O),s($);const G=Yg(O,$.activeProfileId);await b(G?{description:`Created from the ${G.name} Builder profile.`,name:"New App",sourceCode:G.starterSource}:{description:qb,name:"Minimal Board",sourceCode:Kb})}async function P(O,$){const[G,Ee]=await Promise.all([t.getApp(O),t.listApps()]);if(!G)throw new Error("App not found.");const Ne=$?await t.getAppData(O):null,ot=Ez(G.name,Ee),Pt=await t.createApp({compiledCss:G.compiledCss,description:G.description,name:ot,sourceCode:Cz(G.sourceCode,ot)});if($)try{await t.saveAppData(Pt.appId,Ne)}catch(We){try{await t.deleteApp(Pt.appId)}catch{}throw We}Se(null),n.ensureAppBackedUp(Pt,{flush:Ye()}).then(()=>we(),We=>{const Ht=We instanceof Error?We.message:"Unknown sync error.";Se(`App copied locally. Remote backup failed: ${Ht}`),we(!1)}),_a(n.flushRoomLifecycleQueue()),await we()}async function M(O,$){Iz($);let G,Ee=null;try{G=await Ev($)}catch(We){const Ht=We instanceof Error?We.message:"Unknown Tailwind compile error.";G={compiledCss:void 0,compiledCssSourceHash:void 0},Ee=`Source saved without compiled Tailwind CSS: ${Ht}`}let Ne=null;const ot=n.beginLocalAppSourceEdit(O),Pt=await(async()=>{try{const We=await t.updateApp({appId:O,sourceCode:$,...G});try{await n.pushAppSource(We)}catch(Ht){Ne=`Source saved locally. Remote source sync failed: ${Ht instanceof Error?Ht.message:"Unknown sync error."}`}return We}finally{ot()}})();return _a(n.flushSourceSyncQueue()),$t.current===O&&(x(Pt),be([]),Se([Ee,Ne].filter(Boolean).join(" ")||null)),await we(),Pt}async function H(O,$){var Pt;const G=$.trim();if(!G||He.current.has(O.appId))return;const Ee=((Pt=u[O.appId])==null?void 0:Pt.messages)??[],Ne=Nw(O.appId,"user",G),ot=[...Ee,Ne];He.current.add(O.appId),ie(O.appId,We=>({...We,activity:"Thinking...",error:null,isRunning:!0,messages:ot,reasoning:"",reasoningMessageId:null,streamingContent:""}));try{const We=await e.runBuilderTurn({appId:O.appId,appName:O.name,conversationMemory:o.conversationMemory,messages:ot,onActivity:Qe=>{ie(O.appId,dt=>({...dt,activity:Qe}))},onAssistantContent:Qe=>{ie(O.appId,dt=>({...dt,streamingContent:Qe}))},onReasoning:Qe=>{ie(O.appId,dt=>({...dt,reasoning:Qe}))},onUsage:Qe=>{ie(O.appId,dt=>({...dt,usage:Qb(dt.usage,Qe)}))},profile:En??void 0,tools:{readCurrentAppSource:async()=>{const Qe=await t.getApp(O.appId);if(!Qe)throw new Error("The app no longer exists.");return Bz(Qe)},readRecentConsoleOutput:async()=>$t.current!==O.appId?"The app is no longer active, so recent console output is unavailable.":Vz(In.current),replaceCurrentAppSource:async Qe=>{const dt=await M(O.appId,Qe);return{name:dt.name,sourceChars:dt.sourceCode.length,success:!0}}}}),Ht=Nw(O.appId,"assistant",We.content);ie(O.appId,Qe=>({...Qe,messages:[...Qe.messages,Ht],reasoningMessageId:Ht.messageId,streamingContent:""}))}catch(We){ie(O.appId,Ht=>({...Ht,error:We instanceof Error?We.message:"BuilderAI could not complete the request."}))}finally{He.current.delete(O.appId),ie(O.appId,We=>({...We,activity:null,isRunning:!1}))}}function he(O){He.current.has(O)||d($=>{const G={...$};return delete G[O],G})}function ie(O,$){d(G=>({...G,[O]:$(G[O]??zz())}))}function re(){R("launcher"),E(null),n.pullLatestWorkspaceManifest().catch(O=>{const $=O instanceof Error?O.message:"Unknown sync error.";Se(`Could not pull latest workspace: ${$}`)}).finally(()=>{we(Ye())})}function se(O){O==="builder"&&fe(!0),E($=>$===O?null:O)}const L=N.useMemo(()=>A==="launcher"?"App Lab":(S==null?void 0:S.name)??"App",[S==null?void 0:S.name,A]),oe=S?w[S.appId]:void 0,en=Ge?{kind:"problem",label:"",title:Ge,tone:"attention"}:oe;return h.jsxs("div",{className:"grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden lg:min-h-dvh",children:[h.jsxs("header",{className:"grid grid-cols-[88px_minmax(0,1fr)_112px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]",children:[h.jsx("div",{className:"justify-self-start",children:A==="app"?h.jsx("button",{className:"min-h-9 rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10",type:"button",onClick:re,children:"‹ Apps"}):null}),h.jsx("h1",{className:"max-w-[50vw] truncate text-center text-[17px] font-extrabold",children:L}),h.jsxs("nav",{className:"relative flex items-center justify-end gap-1 lg:gap-3","aria-label":"Workspace actions",children:[A==="app"&&en&&en.kind!=="none"?h.jsx(D0,{health:en,onReload:Ge?()=>{pe(O=>O+1),Se(null),Re(!1)}:void 0,open:gt,onOpenChange:Re,popoverAlign:"right"}):null,A==="app"&&S?h.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Share ${S.name}`,title:"Share",onClick:()=>z(S),children:h.jsx(P0,{className:"h-5 w-5"})}):null,h.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Open settings",onClick:()=>{Z(void 0),ye(void 0),V(!0)},children:"⚙"}),A==="app"&&S?h.jsx("div",{className:"hidden lg:block",children:h.jsx(Tw,{activeTool:D,aiAttentionDismissed:je,aiAttentionKey:I,consoleCount:Ue.length,onToggleTool:se})}):null]})]}),h.jsx("main",{className:`min-h-0 overflow-hidden ${D?"lg:mr-[min(420px,36vw)]":""}`,children:A==="launcher"?h.jsx(Tz,{apps:c,onCopyApp:P,onDeleteApp:async O=>{await n.deleteSyncedAppRooms(O),await t.deleteApp(O),await n.removeLocalAppSync(O),await n.queueWorkspaceManifestSave(),n.flushWorkspaceManifestQueue(),await we()},onOpenApp:lr,onShareApp:O=>z(O),storageProfile:y,syncBadges:p,syncHealth:w}):S?h.jsx(Uz,{app:S,core:t,reloadKey:Sn,remoteDataChange:K,onConsoleEntry:O=>{be($=>[...$.slice(-199),O])},onSaveAppData:Un,onUnhandledRemoteDataChange:()=>{Se("Remote data changed. This app does not handle live updates yet; reopen it to reload latest data.")}}):null}),A==="app"&&S?h.jsxs(h.Fragment,{children:[h.jsx("footer",{className:"sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden",children:h.jsx(Tw,{activeTool:D,aiAttentionDismissed:je,aiAttentionKey:I,consoleCount:Ue.length,onToggleTool:se})}),h.jsx(hz,{activeApp:S,activeBuilderModel:r.apiKey&&r.model?r.model:null,activeBuilderProfileName:(En==null?void 0:En.name)??null,aiConfigured:!!(r.apiKey&&r.model),builderActivity:((Pm=u[S.appId])==null?void 0:Pm.activity)??null,builderError:((Dm=u[S.appId])==null?void 0:Dm.error)??null,builderIsRunning:((Om=u[S.appId])==null?void 0:Om.isRunning)??!1,builderMessages:((Lm=u[S.appId])==null?void 0:Lm.messages)??[],builderReasoning:((Mm=u[S.appId])==null?void 0:Mm.reasoning)??"",builderReasoningMessageId:((jm=u[S.appId])==null?void 0:jm.reasoningMessageId)??null,builderStreamingContent:((Fm=u[S.appId])==null?void 0:Fm.streamingContent)??"",builderUsage:((Um=u[S.appId])==null?void 0:Um.usage)??ch(),consoleEntries:Ue,mode:D,onClearBuilderConversation:()=>he(S.appId),onClearConsole:()=>be([]),onClose:()=>E(null),onImportAppData:ar,onLoadAppData:t.getAppData,onOpenAiSettings:()=>{Z("connection"),ye("ai"),V(!0)},onOpenBuilderProfileSettings:()=>{Z("agent"),ye("ai"),V(!0)},onSaveSource:O=>M(S.appId,O),onSendBuilderMessage:O=>H(S,O)})]}):A==="launcher"?h.jsx("div",{className:"pointer-events-none fixed inset-x-0 bottom-5 z-20",children:h.jsx("div",{className:"mx-auto flex w-full max-w-5xl justify-end px-4",children:h.jsx("button",{className:"pointer-events-auto grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong",type:"button","aria-label":"Create new app",onClick:T,children:"+"})})}):null,h.jsx(wM,{aiConfig:r,builderPreferences:o,builderProfiles:a,initialAiTab:Q,initialSection:ne,isOpen:F,storageProfile:y,onClearAiConfig:async()=>{await e.clearConfig(),i({apiKey:"",model:""})},onClearStorageProfile:async()=>{await n.clearStorageProfile(),await we()},onClose:()=>V(!1),onConfigureStorageProfile:async O=>{await n.configureStorageProfile(O),await cc("Storage configured locally. Remote backup failed",()=>n.backUpLocalApps()),await we()},onCreateBuilderProfile:async O=>{const $=await e.createBuilderProfile(O);return l(G=>[...G,$]),$},onDeleteBuilderProfile:async O=>{await e.deleteBuilderProfile(O),l($=>$.filter(G=>G.profileId!==O))},onSaveAiConfig:async O=>{const $=await e.saveConfig(O);return i($),$},onSaveBuilderPreferences:async O=>{const $=await e.saveBuilderPreferences(O);return s($),$},onTestAiConnection:e.testConnection,onUpdateBuilderProfile:async O=>{const $=await e.updateBuilderProfile(O);return l(G=>G.map(Ee=>Ee.profileId===$.profileId?$:Ee)),$},onExportWorkspaceRecovery:async()=>n.exportWorkspaceRecovery(),onRestoreWorkspaceRecovery:async O=>{await n.restoreWorkspaceRecovery(O),window.setTimeout(()=>void we(),0)}}),h.jsx(Lz,{app:_e,onClose:()=>z(null),onOpenStorageSettings:()=>{z(null),Z(void 0),ye("storage"),V(!0)},onCreateInvite:async O=>{const $=await n.createInvite(O);return await we(),$},storageProfile:y}),h.jsx(Mz,{invite:q,onClose:()=>{_(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)},onPreview:n.previewInvite,onImport:async O=>{await n.importInvite(O),await we(),_(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)}})]});async function un(O){await cc("Could not pull latest shared app",async()=>{const $=await n.pullLatestAppRooms(O);if($.deletedAt)throw new Error("This shared app was deleted by its owner.");$.app&&x($.app)}),await we()}async function cc(O,$){try{return await $(),Se(null),null}catch(G){const Ee=G instanceof Error?G.message:"Unknown sync error.",Ne=`${O}: ${Ee}`;return Se(Ne),Ne}}function _a(O){O.finally(()=>{we()})}}function Iz(e){const t=e.trimStart().toLowerCase();if(!/^<!doctype\s+html(?:\s[^>]*)?>/.test(t)&&!/^<html(?:\s|>)/.test(t))throw new Error("Source must be a complete HTML document starting with <!doctype html> or <html>.")}function Ez(e,t){const n=new Set(t.map(s=>s.name.toLocaleLowerCase())),r=e.replace(/ \(copy(?: \d+)?\)$/i,"");let i=1,o=`${r} (copy)`;for(;n.has(o.toLocaleLowerCase());)i+=1,o=`${r} (copy ${i})`;return o}function Cz(e,t){const n=`<title>${Az(t)}</title>`,r=/<title(?:\s[^>]*)?>[\s\S]*?<\/title\s*>/i,o=/<head(?:\s[^>]*)?>[\s\S]*?<\/head\s*>/i.exec(e);if(o){const d=r.test(o[0])?o[0].replace(r,n):o[0].replace(/<head(?:\s[^>]*)?>/i,c=>`${c}
    ${n}`);return`${e.slice(0,o.index)}${d}${e.slice(o.index+o[0].length)}`}const s=e.search(/<body(?:\s|>)/i),a=s===-1?e:e.slice(0,s);if(r.test(a))return`${a.replace(r,n)}${s===-1?"":e.slice(s)}`;const l=/<head(?:\s[^>]*)?>/i;if(l.test(e))return e.replace(l,d=>`${d}
    ${n}`);const u=/<html(?:\s[^>]*)?>/i;return u.test(e)?e.replace(u,d=>`${d}
  <head>${n}</head>`):`${n}
${e}`}function Az(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function Tw({activeTool:e,aiAttentionDismissed:t,aiAttentionKey:n,consoleCount:r,onToggleTool:i}){const o=!t&&e!=="builder";return h.jsxs("div",{className:"flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1",role:"group","aria-label":"App tools",children:[h.jsxs("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-accent ${e==="console"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle console",onClick:()=>i("console"),children:["Log",r>0?h.jsx("span",{className:"absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white shadow-sm",children:r>99?"99+":r}):null]}),h.jsx("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-mono font-bold text-app-muted hover:text-app-accent ${e==="source"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle source",onClick:()=>i("source"),children:"<>"}),h.jsxs("button",{className:`relative min-h-0 overflow-hidden rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-violet ${e==="builder"?"text-app-violet after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-violet":""}`,type:"button","aria-label":"Toggle BuilderAI",onClick:()=>i("builder"),children:[o?h.jsx("svg",{className:"pointer-events-none absolute inset-0 h-full w-full",viewBox:"0 0 100 36",preserveAspectRatio:"none","aria-hidden":"true",children:h.jsx("rect",{className:"ai-snake-path",x:"2",y:"2",width:"96",height:"32",rx:"6",ry:"6",pathLength:"100",fill:"none",stroke:"#8b5cf6",strokeLinecap:"round"},n)}):null,h.jsx("span",{className:`relative z-10 ${o?"animate-ai-text-shimmer":""}`,children:"AI ✦"},n)]})]})}function Tz({apps:e,onCopyApp:t,onDeleteApp:n,onOpenApp:r,onShareApp:i,storageProfile:o,syncBadges:s,syncHealth:a}){const[l,u]=N.useState(null);return h.jsxs("section",{className:"mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24","aria-label":"Apps",children:[h.jsxs("div",{className:"mb-5 flex flex-wrap items-end justify-between gap-5",children:[h.jsxs("div",{children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Workspace"}),h.jsx("h2",{className:"text-[clamp(24px,4vw,38px)] font-extrabold leading-none",children:"Choose an app"})]}),h.jsx("div",{className:"flex flex-wrap items-center justify-end gap-2",children:h.jsx("span",{className:"rounded-full border border-app-line bg-white px-3 py-1 text-xs font-extrabold uppercase text-app-muted",children:o?`Storage: ${o.displayName}`:"Local only"})})]}),e.length?h.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3",children:e.map(d=>h.jsx(Rz,{app:d,onOpenActions:()=>u(d),onOpen:()=>r(d.appId),onShare:()=>i(d),syncBadge:s[d.appId]??{kind:"local-only",label:"Private",tone:"neutral"},syncHealth:a[d.appId]??{kind:"none",label:"",title:"",tone:"neutral"}},d.appId))}):h.jsx("div",{className:"rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted",children:"No apps yet. Use the + button to create the example app."}),h.jsx(jz,{app:l,onClose:()=>u(null),onCopyApp:async(d,c)=>{await t(d,c),u(null)},onDeleteApp:async d=>{await n(d),u(null)},syncBadge:l?s[l.appId]:void 0})]})}function Rz({app:e,onOpenActions:t,onOpen:n,onShare:r,syncBadge:i,syncHealth:o}){const s=i.kind==="needs-attention";return h.jsxs("article",{className:`relative grid min-h-32 content-start gap-3 rounded-lg border border-app-line bg-app-surface/95 p-4 text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white ${s?"opacity-75":""}`,children:[h.jsx("button",{className:"absolute right-3 top-3 grid h-8 min-h-8 w-8 place-items-center rounded-md border border-transparent bg-white/80 text-base text-app-muted hover:border-app-accent hover:text-app-accent",type:"button","aria-label":`Open app actions for ${e.name}`,title:"App actions",onClick:t,children:h.jsxs("svg",{className:"h-4 w-4","aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h.jsx("path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}),h.jsx("path",{d:"m15 5 4 4"})]})}),h.jsxs("button",{className:"grid gap-2 pr-9 text-left disabled:cursor-default",type:"button",disabled:s,onClick:n,children:[h.jsx("strong",{className:`text-lg leading-tight ${s?"line-through decoration-2":""}`,children:e.name}),h.jsx("span",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:e.description})]}),h.jsxs("div",{className:"flex flex-wrap gap-2",children:[h.jsxs("span",{className:`rounded-full px-2 py-1 text-[11px] font-extrabold uppercase ${Nz(i.tone)}`,title:s?"The owner deleted this shared app. You can remove this local entry from app actions.":void 0,children:[i.label,s?" ⓘ":""]}),o.kind!=="none"?h.jsx(D0,{health:o,popoverAlign:"left"}):null]}),h.jsxs("div",{className:"mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3",children:[h.jsx("span",{className:"truncate text-xs font-bold text-app-muted",children:pp(e.updatedAt)}),h.jsxs("div",{className:"flex gap-2",children:[h.jsxs("button",{className:"inline-flex min-h-8 items-center gap-1.5 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:s,onClick:r,children:[h.jsx(P0,{className:"h-4 w-4"}),"Share"]}),h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:s,onClick:n,children:"Open"})]})]})]})}function P0({className:e}){return h.jsxs("svg",{className:e,"aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",children:[h.jsx("path",{d:"M8.1 10.7 15.6 6.6M8.1 13.3l7.5 4.1",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),h.jsx("circle",{cx:"6",cy:"12",r:"2.4",fill:"currentColor"}),h.jsx("circle",{cx:"18",cy:"5.5",r:"2.4",fill:"currentColor"}),h.jsx("circle",{cx:"18",cy:"18.5",r:"2.4",fill:"currentColor"})]})}function Nz(e){return e==="good"?"bg-emerald-50 text-emerald-700":e==="shared"?"bg-violet-50 text-violet-700":e==="attention"?"bg-amber-50 text-amber-800":"bg-slate-100 text-app-muted"}function Pz(e){return Object.fromEntries(e.apps.map(t=>{const n=e.badges[t.appId],r=e.queueItems.filter(i=>i.appId===t.appId);return[t.appId,Dz({badge:n,isOnline:e.isOnline,items:r})]}))}function Dz(e){var n,r;if(((n=e.badge)==null?void 0:n.kind)==="local-only")return{kind:"none",label:"",title:"",tone:"neutral"};if(((r=e.badge)==null?void 0:r.kind)==="needs-attention")return{kind:"problem",label:"",title:"This shared app was deleted by its owner. You can remove this local entry from app actions.",tone:"attention"};if(!e.items.length)return{kind:"synced",label:"☁ ✓",title:"Synced with remote storage.",tone:"good"};if(!e.isOnline)return{kind:"offline",label:"☁ ×",title:"Offline. Local changes are saved and will sync when the browser comes back online.",tone:"attention"};const t=e.items.find(i=>i.lastError||i.status==="problem");return t?{kind:"problem",label:"☁ !",title:`Could not sync ${Oz(t.kind)}. App Lab will retry when sync wakes up. ${t.lastError??""}`.trim(),tone:"attention"}:e.items.some(i=>i.status==="syncing")?{kind:"syncing",label:"☁ …",title:"Syncing local changes to remote storage.",tone:"working"}:{kind:"pending",label:"☁ …",title:"Local changes are queued for remote sync.",tone:"working"}}function D0({health:e,onOpenChange:t,onReload:n,open:r,popoverAlign:i="right"}){const[o,s]=N.useState(!1),a=r??o,l=t??s,u=e.kind==="synced"?"text-emerald-600 hover:bg-emerald-50":e.kind==="pending"||e.kind==="syncing"?"text-blue-600 hover:bg-blue-50":e.kind==="offline"?"text-slate-500 hover:bg-slate-100":"text-red-600 hover:bg-red-50",d=e.kind==="synced"?"border-emerald-100":e.kind==="pending"||e.kind==="syncing"?"border-blue-100":e.kind==="offline"?"border-slate-200":"border-red-100";return h.jsxs("div",{className:"relative inline-grid place-items-center",children:[h.jsx("button",{"aria-label":`Open sync status: ${e.title}`,className:`grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent ${u}`,title:e.title,type:"button",onClick:()=>l(!a),children:h.jsx(Rw,{kind:e.kind})}),a?h.jsxs("div",{className:`absolute top-10 z-40 grid w-72 gap-3 rounded-lg border ${d} bg-white p-3 text-left text-app-ink shadow-panel ${i==="left"?"left-0":"right-0"}`,children:[h.jsxs("div",{className:"flex items-start gap-3",children:[h.jsx("div",{className:u.replace(/hover:[^ ]+/g,""),children:h.jsx(Rw,{kind:e.kind})}),h.jsxs("div",{className:"grid gap-1",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Sync status"}),h.jsx("p",{className:"text-sm font-bold leading-snug",children:e.title})]})]}),h.jsxs("div",{className:"flex items-center justify-end gap-2",children:[h.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>l(!1),children:"Close"}),n?h.jsx("button",{"aria-label":"Reload app",className:"grid h-8 min-h-8 w-8 place-items-center rounded-md border border-app-accent bg-app-accent text-lg font-bold text-white hover:bg-app-strong",title:"Reload app",type:"button",onClick:n,children:"↻"}):null]})]}):null]})}function Rw({kind:e}){return h.jsxs("svg",{"aria-hidden":"true",className:"block h-7 w-7",viewBox:"0 0 64 64",children:[h.jsx("path",{d:"M20 46h26a12 12 0 0 0 1.2-23.9A17 17 0 0 0 15.5 27.5 9.5 9.5 0 0 0 20 46Z",fill:"#f8fafc",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.8"}),e==="synced"?h.jsx("path",{d:"m25 35 5 5 10-12",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,e==="pending"?h.jsxs(h.Fragment,{children:[h.jsx("circle",{className:"cloud-sync-dot-one",cx:"27",cy:"36",fill:"currentColor",r:"2.4"}),h.jsx("circle",{className:"cloud-sync-dot-two",cx:"32",cy:"36",fill:"currentColor",r:"2.4"}),h.jsx("circle",{className:"cloud-sync-dot-three",cx:"37",cy:"36",fill:"currentColor",r:"2.4"})]}):null,e==="syncing"?h.jsxs("g",{className:"cloud-sync-spin",children:[h.jsx("path",{d:"M37.7 27.3a8 8 0 0 1 2.1 8.8",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("path",{d:"M24 33a8 8 0 0 1 13.7-5.7",fill:"none",opacity:"0.58",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("path",{d:"M26.4 38.7A8 8 0 0 1 24 33",fill:"none",opacity:"0.24",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"})]}):null,e==="offline"?h.jsx("path",{d:"M17 17 47 47",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,e==="problem"?h.jsxs(h.Fragment,{children:[h.jsx("path",{d:"M32 21.8v9.4",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),h.jsx("circle",{cx:"32",cy:"38.8",fill:"currentColor",r:"2.4"})]}):null]})}function Oz(e){return e==="ensure-app-rooms"?"app rooms":e==="save-source"?"source code":e==="save-app-data"?"app data":e==="delete-owned-app"?"app deletion":"workspace manifest"}function Lz({app:e,onClose:t,onCreateInvite:n,onOpenStorageSettings:r,storageProfile:i}){const[o,s]=N.useState(""),[a,l]=N.useState("Ready"),u=!!i;if(N.useEffect(()=>{s(""),l("Ready")},[e==null?void 0:e.appId]),!e)return null;async function d(){var c;if(e){l("Creating invite...");try{const f=await n(e.appId),p=`${window.location.origin}${window.location.pathname}#${mA(f)}`;s(p),l("Invite ready. It reuses this app's stable source and data rooms."),(c=navigator.clipboard)==null||c.writeText(p).catch(()=>{})}catch(f){l(f instanceof Error?f.message:"Could not create invite.")}}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Share app",children:h.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Share"}),h.jsx("h2",{className:"truncate text-lg font-extrabold",children:e.name})]}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close share dialog",onClick:t,children:"×"})]}),u?h.jsxs("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[h.jsx("p",{className:"font-bold",children:"Invite links are sensitive."}),h.jsx("p",{children:"Anyone with the link can access and edit this app's source and data rooms. It does not include the owner setup material for creating new rooms."})]}):h.jsxs("div",{className:"grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[h.jsx("p",{className:"font-bold",children:"Cloud sync is required before this app can be shared."}),h.jsx("button",{className:"min-h-9 justify-self-start rounded-md border border-amber-300 bg-white px-3 text-sm font-extrabold text-amber-900 hover:border-amber-500",type:"button",onClick:r,children:"Open settings"})]}),h.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3",children:[h.jsx("p",{className:"mb-2 text-xs font-extrabold uppercase text-app-muted",children:"Invite link"}),h.jsx("textarea",{className:"min-h-24 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted",readOnly:!0,value:o||"Create an invite to generate the access link."})]}),h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:a}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!u,onClick:d,children:"Create invite"})]})]})})}function Mz({invite:e,onClose:t,onImport:n,onPreview:r}){const[i,o]=N.useState(null),[s,a]=N.useState("Ready");if(N.useEffect(()=>{o(null),a("Ready")},[e]),!e)return null;async function l(){if(!e)return;const d=e;a("Loading app preview...");try{o(await r(d)),a("Preview loaded. Review before importing.")}catch(c){o(null),a(c instanceof Error?c.message:"Could not load app preview.")}}async function u(){if(!e)return;const d=e;a("Importing shared app...");try{await n(d),a("Imported.")}catch(c){a(c instanceof Error?c.message:"Could not import invite.")}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Import shared app",children:h.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Shared app invite"}),h.jsx("h2",{className:"truncate text-lg font-extrabold",children:"Import shared app"})]}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close invite import",onClick:t,children:"×"})]}),h.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"This link grants access to a shared app source room and data room. Importing will add the app to this workspace as Shared with me and connect it to live data updates."}),h.jsx("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:"Shared app source is executable code from whoever controls the shared source room. Only import apps from people you trust."}),h.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3 text-xs text-app-muted",children:[h.jsxs("p",{children:["Provider: ",h.jsx("span",{className:"font-mono",children:e.provider.databaseUrl})]}),h.jsxs("p",{children:["Created: ",h.jsx("span",{className:"font-mono",children:pp(e.createdAt)})]})]}),i?h.jsxs("div",{className:"grid gap-2 rounded-lg border border-app-line bg-white p-3",children:[h.jsxs("div",{className:"min-w-0",children:[h.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Preview"}),h.jsx("h3",{className:"truncate text-base font-extrabold text-app-ink",children:i.name}),i.description?h.jsx("p",{className:"mt-1 text-sm leading-relaxed text-app-muted",children:i.description}):null]}),h.jsxs("div",{className:"grid gap-1 text-xs text-app-muted",children:[h.jsxs("p",{children:["App id: ",h.jsx("span",{className:"font-mono",children:Cd(i.appId)})]}),h.jsxs("p",{children:["Source room: ",h.jsx("span",{className:"font-mono",children:Cd(i.sourceRoomId)})]}),h.jsxs("p",{children:["Data room: ",h.jsx("span",{className:"font-mono",children:Cd(i.dataRoomId)})]}),h.jsxs("p",{children:["Updated: ",h.jsx("span",{className:"font-mono",children:pp(i.updatedAt)})]})]})]}):null,h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:s}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:t,children:"Cancel"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:l,children:"Preview app"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong",type:"button",onClick:u,children:"Import"})]})]})]})})}function Cd(e){return e.length<=18?e:`${e.slice(0,8)}...${e.slice(-6)}`}function jz({app:e,onClose:t,onCopyApp:n,onDeleteApp:r,syncBadge:i}){const[o,s]=N.useState(""),[a,l]=N.useState(!1),[u,d]=N.useState("actions");if(N.useEffect(()=>{s(""),l(!1),d("actions")},[e]),!e)return null;async function c(){if(!e)return;const p=Fz(e,i);if(window.confirm(p)){s("Deleting...");try{await r(e.appId)}catch(m){s(m instanceof Error?m.message:"Could not delete app.")}}}async function f(p){if(!(!e||a)){l(!0),s("Copying...");try{await n(e.appId,p)}catch(m){s(m instanceof Error?m.message:"Could not copy app."),l(!1)}}}return h.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"App actions",children:h.jsxs("div",{className:"grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsx("h2",{className:"text-lg font-extrabold",children:u==="copy"?"Copy app":"App actions"}),h.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close app actions",disabled:a,onClick:t,children:"×"})]}),h.jsxs("div",{className:"grid gap-1 rounded-lg border border-app-line bg-white p-3",children:[h.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Selected app"}),h.jsx("p",{className:"truncate text-base font-extrabold text-app-ink",children:e.name}),e.description?h.jsx("p",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:e.description}):null]}),u==="copy"?h.jsxs("div",{className:"grid gap-3",children:[h.jsx("p",{className:"text-sm text-app-muted",children:"Should the copy include this app's saved data?"}),h.jsxs("div",{className:"grid gap-2 sm:grid-cols-2",children:[h.jsxs("button",{className:"grid min-h-14 content-center rounded-md border border-app-line bg-white px-3 text-left hover:border-app-accent",type:"button",disabled:a,onClick:()=>f(!1),children:[h.jsx("strong",{className:"text-sm text-app-ink",children:"Without data"}),h.jsx("span",{className:"text-xs text-app-muted",children:"Copy source only"})]}),h.jsxs("button",{className:"grid min-h-14 content-center rounded-md border border-app-accent bg-app-accent/5 px-3 text-left hover:bg-app-accent/10",type:"button",disabled:a,onClick:()=>f(!0),children:[h.jsx("strong",{className:"text-sm text-app-ink",children:"With data"}),h.jsx("span",{className:"text-xs text-app-muted",children:"Copy source and saved data"})]})]}),h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:o}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",disabled:a,onClick:()=>{s(""),d("actions")},children:"Back"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",disabled:a,onClick:t,children:"Cancel"})]})]})]}):h.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[h.jsx("button",{className:"min-h-9 rounded-md border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 hover:bg-red-100",type:"button",onClick:c,children:"Delete"}),h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsx("span",{className:"text-xs font-bold text-app-muted",children:o}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>d("copy"),children:"Copy"}),h.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:t,children:"Cancel"})]})]})]})})}function Fz(e,t){const n=`Delete "${e.name}"? This removes the app and its saved data from this workspace.`;return(t==null?void 0:t.kind)==="shared-by-me"?`${n}

This app is shared. Its remote source and data rooms will also be deleted, so collaborators with the invite link will lose access.`:(t==null?void 0:t.kind)==="shared-with-me"||(t==null?void 0:t.kind)==="needs-attention"?`${n}

This app was shared with you. Deleting it here only removes your local entry; it does not delete the owner's rooms.`:t&&t.kind!=="local-only"?`${n}

Its remote source and data backup rooms will also be deleted.`:n}function Uz({app:e,core:t,onConsoleEntry:n,onUnhandledRemoteDataChange:r,onSaveAppData:i,reloadKey:o,remoteDataChange:s}){return h.jsx("section",{className:"min-h-0","aria-label":e.name,children:h.jsx($L,{app:e,getAppData:t.getAppData,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:o,remoteDataChange:s,saveAppData:i})})}function zz(){return{activity:null,error:null,isRunning:!1,messages:[],reasoning:"",reasoningMessageId:null,streamingContent:"",usage:ch()}}function Nw(e,t,n){return{appId:e,content:n,createdAt:new Date().toISOString(),messageId:crypto.randomUUID(),role:t}}function Bz(e){return{description:e.description,name:e.name,sourceCode:e.sourceCode}}function Vz(e){return e.length?e.slice(-50).map(t=>`[${t.timestamp}] ${t.level.toUpperCase()} ${t.args.join(" ")||"(empty)"}`).join(`
`):"No recent console output."}function pp(e){return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric"}).format(new Date(e))}function $z(){const e=N.useMemo(()=>HC(),[]),t=N.useMemo(()=>YC(),[]),n=N.useMemo(()=>UL(t),[t]);return h.jsx(Sz,{aiActions:e,core:t,syncActions:n})}Ad.createRoot(document.getElementById("root")).render(h.jsx(Q0.StrictMode,{children:h.jsx($z,{})}));
