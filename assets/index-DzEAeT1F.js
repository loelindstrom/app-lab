(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function pw(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var bm={exports:{}},za={},Sm={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ns=Symbol.for("react.element"),hw=Symbol.for("react.portal"),mw=Symbol.for("react.fragment"),gw=Symbol.for("react.strict_mode"),yw=Symbol.for("react.profiler"),vw=Symbol.for("react.provider"),_w=Symbol.for("react.context"),ww=Symbol.for("react.forward_ref"),bw=Symbol.for("react.suspense"),Sw=Symbol.for("react.memo"),kw=Symbol.for("react.lazy"),jf=Symbol.iterator;function xw(t){return t===null||typeof t!="object"?null:(t=jf&&t[jf]||t["@@iterator"],typeof t=="function"?t:null)}var km={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},xm=Object.assign,Em={};function di(t,e,n){this.props=t,this.context=e,this.refs=Em,this.updater=n||km}di.prototype.isReactComponent={};di.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};di.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Im(){}Im.prototype=di.prototype;function zu(t,e,n){this.props=t,this.context=e,this.refs=Em,this.updater=n||km}var Wu=zu.prototype=new Im;Wu.constructor=zu;xm(Wu,di.prototype);Wu.isPureReactComponent=!0;var Ff=Array.isArray,Cm=Object.prototype.hasOwnProperty,Bu={current:null},Rm={key:!0,ref:!0,__self:!0,__source:!0};function Tm(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Cm.call(e,r)&&!Rm.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Ns,type:t,key:s,ref:o,props:i,_owner:Bu.current}}function Ew(t,e){return{$$typeof:Ns,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Hu(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ns}function Iw(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Uf=/\/+/g;function El(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Iw(""+t.key):e.toString(36)}function To(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ns:case hw:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+El(o,0):r,Ff(i)?(n="",t!=null&&(n=t.replace(Uf,"$&/")+"/"),To(i,e,n,"",function(c){return c})):i!=null&&(Hu(i)&&(i=Ew(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Uf,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Ff(t))for(var a=0;a<t.length;a++){s=t[a];var l=r+El(s,a);o+=To(s,e,n,l,i)}else if(l=xw(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=r+El(s,a++),o+=To(s,e,n,l,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ro(t,e,n){if(t==null)return t;var r=[],i=0;return To(t,r,"","",function(s){return e.call(n,s,i++)}),r}function Cw(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ge={current:null},Ao={transition:null},Rw={ReactCurrentDispatcher:Ge,ReactCurrentBatchConfig:Ao,ReactCurrentOwner:Bu};function Am(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:ro,forEach:function(t,e,n){ro(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ro(t,function(){e++}),e},toArray:function(t){return ro(t,function(e){return e})||[]},only:function(t){if(!Hu(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Q.Component=di;Q.Fragment=mw;Q.Profiler=yw;Q.PureComponent=zu;Q.StrictMode=gw;Q.Suspense=bw;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rw;Q.act=Am;Q.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=xm({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Bu.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Cm.call(e,l)&&!Rm.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Ns,type:t.type,key:i,ref:s,props:r,_owner:o}};Q.createContext=function(t){return t={$$typeof:_w,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:vw,_context:t},t.Consumer=t};Q.createElement=Tm;Q.createFactory=function(t){var e=Tm.bind(null,t);return e.type=t,e};Q.createRef=function(){return{current:null}};Q.forwardRef=function(t){return{$$typeof:ww,render:t}};Q.isValidElement=Hu;Q.lazy=function(t){return{$$typeof:kw,_payload:{_status:-1,_result:t},_init:Cw}};Q.memo=function(t,e){return{$$typeof:Sw,type:t,compare:e===void 0?null:e}};Q.startTransition=function(t){var e=Ao.transition;Ao.transition={};try{t()}finally{Ao.transition=e}};Q.unstable_act=Am;Q.useCallback=function(t,e){return Ge.current.useCallback(t,e)};Q.useContext=function(t){return Ge.current.useContext(t)};Q.useDebugValue=function(){};Q.useDeferredValue=function(t){return Ge.current.useDeferredValue(t)};Q.useEffect=function(t,e){return Ge.current.useEffect(t,e)};Q.useId=function(){return Ge.current.useId()};Q.useImperativeHandle=function(t,e,n){return Ge.current.useImperativeHandle(t,e,n)};Q.useInsertionEffect=function(t,e){return Ge.current.useInsertionEffect(t,e)};Q.useLayoutEffect=function(t,e){return Ge.current.useLayoutEffect(t,e)};Q.useMemo=function(t,e){return Ge.current.useMemo(t,e)};Q.useReducer=function(t,e,n){return Ge.current.useReducer(t,e,n)};Q.useRef=function(t){return Ge.current.useRef(t)};Q.useState=function(t){return Ge.current.useState(t)};Q.useSyncExternalStore=function(t,e,n){return Ge.current.useSyncExternalStore(t,e,n)};Q.useTransition=function(){return Ge.current.useTransition()};Q.version="18.3.1";Sm.exports=Q;var R=Sm.exports;const Tw=pw(R);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Aw=R,Nw=Symbol.for("react.element"),Pw=Symbol.for("react.fragment"),Ow=Object.prototype.hasOwnProperty,Dw=Aw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Mw={key:!0,ref:!0,__self:!0,__source:!0};function Nm(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Ow.call(e,r)&&!Mw.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Nw,type:t,key:s,ref:o,props:i,_owner:Dw.current}}za.Fragment=Pw;za.jsx=Nm;za.jsxs=Nm;bm.exports=za;var p=bm.exports,_c={},Pm={exports:{}},lt={},Om={exports:{}},Dm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,$){var H=O.length;O.push($);e:for(;0<H;){var F=H-1>>>1,X=O[F];if(0<i(X,$))O[F]=$,O[H]=X,H=F;else break e}}function n(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var $=O[0],H=O.pop();if(H!==$){O[0]=H;e:for(var F=0,X=O.length,_t=X>>>1;F<_t;){var oe=2*(F+1)-1,Bt=O[oe],wt=oe+1,K=O[wt];if(0>i(Bt,H))wt<X&&0>i(K,Bt)?(O[F]=K,O[wt]=H,F=wt):(O[F]=Bt,O[oe]=H,F=oe);else if(wt<X&&0>i(K,H))O[F]=K,O[wt]=H,F=wt;else break e}}return $}function i(O,$){var H=O.sortIndex-$.sortIndex;return H!==0?H:O.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],d=1,u=null,f=3,g=!1,v=!1,w=!1,T=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(O){for(var $=n(c);$!==null;){if($.callback===null)r(c);else if($.startTime<=O)r(c),$.sortIndex=$.expirationTime,e(l,$);else break;$=n(c)}}function _(O){if(w=!1,h(O),!v)if(n(l)!==null)v=!0,dt(b);else{var $=n(c);$!==null&&_e(_,$.startTime-O)}}function b(O,$){v=!1,w&&(w=!1,y(k),k=-1),g=!0;var H=f;try{for(h($),u=n(l);u!==null&&(!(u.expirationTime>$)||O&&!L());){var F=u.callback;if(typeof F=="function"){u.callback=null,f=u.priorityLevel;var X=F(u.expirationTime<=$);$=t.unstable_now(),typeof X=="function"?u.callback=X:u===n(l)&&r(l),h($)}else r(l);u=n(l)}if(u!==null)var _t=!0;else{var oe=n(c);oe!==null&&_e(_,oe.startTime-$),_t=!1}return _t}finally{u=null,f=H,g=!1}}var E=!1,x=null,k=-1,A=5,U=-1;function L(){return!(t.unstable_now()-U<A)}function ee(){if(x!==null){var O=t.unstable_now();U=O;var $=!0;try{$=x(!0,O)}finally{$?ue():(E=!1,x=null)}}else E=!1}var ue;if(typeof m=="function")ue=function(){m(ee)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,Wt=Te.port2;Te.port1.onmessage=ee,ue=function(){Wt.postMessage(null)}}else ue=function(){T(ee,0)};function dt(O){x=O,E||(E=!0,ue())}function _e(O,$){k=T(function(){O(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){v||g||(v=!0,dt(b))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(O){switch(f){case 1:case 2:case 3:var $=3;break;default:$=f}var H=f;f=$;try{return O()}finally{f=H}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,$){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var H=f;f=O;try{return $()}finally{f=H}},t.unstable_scheduleCallback=function(O,$,H){var F=t.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?F+H:F):H=F,O){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=H+X,O={id:d++,callback:$,priorityLevel:O,startTime:H,expirationTime:X,sortIndex:-1},H>F?(O.sortIndex=H,e(c,O),n(l)===null&&O===n(c)&&(w?(y(k),k=-1):w=!0,_e(_,H-F))):(O.sortIndex=X,e(l,O),v||g||(v=!0,dt(b))),O},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(O){var $=f;return function(){var H=f;f=$;try{return O.apply(this,arguments)}finally{f=H}}}})(Dm);Om.exports=Dm;var Lw=Om.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jw=R,at=Lw;function I(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Mm=new Set,ns={};function _r(t,e){Zr(t,e),Zr(t+"Capture",e)}function Zr(t,e){for(ns[t]=e,t=0;t<e.length;t++)Mm.add(e[t])}var nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wc=Object.prototype.hasOwnProperty,Fw=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vf={},$f={};function Uw(t){return wc.call($f,t)?!0:wc.call(Vf,t)?!1:Fw.test(t)?$f[t]=!0:(Vf[t]=!0,!1)}function Vw(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function $w(t,e,n,r){if(e===null||typeof e>"u"||Vw(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ye(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Fe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Fe[t]=new Ye(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Fe[e]=new Ye(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Fe[t]=new Ye(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Fe[t]=new Ye(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Fe[t]=new Ye(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Fe[t]=new Ye(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Fe[t]=new Ye(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Fe[t]=new Ye(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Fe[t]=new Ye(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ku=/[\-:]([a-z])/g;function qu(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ku,qu);Fe[e]=new Ye(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ku,qu);Fe[e]=new Ye(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ku,qu);Fe[e]=new Ye(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Fe[t]=new Ye(t,1,!1,t.toLowerCase(),null,!1,!1)});Fe.xlinkHref=new Ye("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Fe[t]=new Ye(t,1,!1,t.toLowerCase(),null,!0,!0)});function Gu(t,e,n,r){var i=Fe.hasOwnProperty(e)?Fe[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&($w(e,n,i,r)&&(n=null),r||i===null?Uw(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var dn=jw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,io=Symbol.for("react.element"),Rr=Symbol.for("react.portal"),Tr=Symbol.for("react.fragment"),Yu=Symbol.for("react.strict_mode"),bc=Symbol.for("react.profiler"),Lm=Symbol.for("react.provider"),jm=Symbol.for("react.context"),Qu=Symbol.for("react.forward_ref"),Sc=Symbol.for("react.suspense"),kc=Symbol.for("react.suspense_list"),Ju=Symbol.for("react.memo"),mn=Symbol.for("react.lazy"),Fm=Symbol.for("react.offscreen"),zf=Symbol.iterator;function Si(t){return t===null||typeof t!="object"?null:(t=zf&&t[zf]||t["@@iterator"],typeof t=="function"?t:null)}var ve=Object.assign,Il;function ji(t){if(Il===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Il=e&&e[1]||""}return`
`+Il+t}var Cl=!1;function Rl(t,e){if(!t||Cl)return"";Cl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Cl=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ji(t):""}function zw(t){switch(t.tag){case 5:return ji(t.type);case 16:return ji("Lazy");case 13:return ji("Suspense");case 19:return ji("SuspenseList");case 0:case 2:case 15:return t=Rl(t.type,!1),t;case 11:return t=Rl(t.type.render,!1),t;case 1:return t=Rl(t.type,!0),t;default:return""}}function xc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Tr:return"Fragment";case Rr:return"Portal";case bc:return"Profiler";case Yu:return"StrictMode";case Sc:return"Suspense";case kc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case jm:return(t.displayName||"Context")+".Consumer";case Lm:return(t._context.displayName||"Context")+".Provider";case Qu:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ju:return e=t.displayName||null,e!==null?e:xc(t.type)||"Memo";case mn:e=t._payload,t=t._init;try{return xc(t(e))}catch{}}return null}function Ww(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xc(e);case 8:return e===Yu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Un(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Um(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Bw(t){var e=Um(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function so(t){t._valueTracker||(t._valueTracker=Bw(t))}function Vm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Um(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Go(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ec(t,e){var n=e.checked;return ve({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Wf(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Un(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $m(t,e){e=e.checked,e!=null&&Gu(t,"checked",e,!1)}function Ic(t,e){$m(t,e);var n=Un(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Cc(t,e.type,n):e.hasOwnProperty("defaultValue")&&Cc(t,e.type,Un(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Bf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Cc(t,e,n){(e!=="number"||Go(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Fi=Array.isArray;function zr(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Un(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Rc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(I(91));return ve({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Hf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(I(92));if(Fi(n)){if(1<n.length)throw Error(I(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Un(n)}}function zm(t,e){var n=Un(e.value),r=Un(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Kf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Wm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Tc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Wm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var oo,Bm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(oo=oo||document.createElement("div"),oo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=oo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function rs(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var $i={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hw=["Webkit","ms","Moz","O"];Object.keys($i).forEach(function(t){Hw.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),$i[e]=$i[t]})});function Hm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||$i.hasOwnProperty(t)&&$i[t]?(""+e).trim():e+"px"}function Km(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Hm(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var Kw=ve({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ac(t,e){if(e){if(Kw[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(I(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(I(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(I(61))}if(e.style!=null&&typeof e.style!="object")throw Error(I(62))}}function Nc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pc=null;function Xu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Oc=null,Wr=null,Br=null;function qf(t){if(t=Ds(t)){if(typeof Oc!="function")throw Error(I(280));var e=t.stateNode;e&&(e=qa(e),Oc(t.stateNode,t.type,e))}}function qm(t){Wr?Br?Br.push(t):Br=[t]:Wr=t}function Gm(){if(Wr){var t=Wr,e=Br;if(Br=Wr=null,qf(t),e)for(t=0;t<e.length;t++)qf(e[t])}}function Ym(t,e){return t(e)}function Qm(){}var Tl=!1;function Jm(t,e,n){if(Tl)return t(e,n);Tl=!0;try{return Ym(t,e,n)}finally{Tl=!1,(Wr!==null||Br!==null)&&(Qm(),Gm())}}function is(t,e){var n=t.stateNode;if(n===null)return null;var r=qa(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(I(231,e,typeof n));return n}var Dc=!1;if(nn)try{var ki={};Object.defineProperty(ki,"passive",{get:function(){Dc=!0}}),window.addEventListener("test",ki,ki),window.removeEventListener("test",ki,ki)}catch{Dc=!1}function qw(t,e,n,r,i,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var zi=!1,Yo=null,Qo=!1,Mc=null,Gw={onError:function(t){zi=!0,Yo=t}};function Yw(t,e,n,r,i,s,o,a,l){zi=!1,Yo=null,qw.apply(Gw,arguments)}function Qw(t,e,n,r,i,s,o,a,l){if(Yw.apply(this,arguments),zi){if(zi){var c=Yo;zi=!1,Yo=null}else throw Error(I(198));Qo||(Qo=!0,Mc=c)}}function wr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Xm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Gf(t){if(wr(t)!==t)throw Error(I(188))}function Jw(t){var e=t.alternate;if(!e){if(e=wr(t),e===null)throw Error(I(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Gf(i),t;if(s===r)return Gf(i),e;s=s.sibling}throw Error(I(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(I(189))}}if(n.alternate!==r)throw Error(I(190))}if(n.tag!==3)throw Error(I(188));return n.stateNode.current===n?t:e}function Zm(t){return t=Jw(t),t!==null?eg(t):null}function eg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=eg(t);if(e!==null)return e;t=t.sibling}return null}var tg=at.unstable_scheduleCallback,Yf=at.unstable_cancelCallback,Xw=at.unstable_shouldYield,Zw=at.unstable_requestPaint,Se=at.unstable_now,eb=at.unstable_getCurrentPriorityLevel,Zu=at.unstable_ImmediatePriority,ng=at.unstable_UserBlockingPriority,Jo=at.unstable_NormalPriority,tb=at.unstable_LowPriority,rg=at.unstable_IdlePriority,Wa=null,Ft=null;function nb(t){if(Ft&&typeof Ft.onCommitFiberRoot=="function")try{Ft.onCommitFiberRoot(Wa,t,void 0,(t.current.flags&128)===128)}catch{}}var Rt=Math.clz32?Math.clz32:sb,rb=Math.log,ib=Math.LN2;function sb(t){return t>>>=0,t===0?32:31-(rb(t)/ib|0)|0}var ao=64,lo=4194304;function Ui(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Xo(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=Ui(a):(s&=o,s!==0&&(r=Ui(s)))}else o=n&~i,o!==0?r=Ui(o):s!==0&&(r=Ui(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Rt(e),i=1<<n,r|=t[n],e&=~i;return r}function ob(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ab(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Rt(s),a=1<<o,l=i[o];l===-1?(!(a&n)||a&r)&&(i[o]=ob(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Lc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ig(){var t=ao;return ao<<=1,!(ao&4194240)&&(ao=64),t}function Al(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ps(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Rt(e),t[e]=n}function lb(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Rt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function ed(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Rt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ie=0;function sg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var og,td,ag,lg,cg,jc=!1,co=[],En=null,In=null,Cn=null,ss=new Map,os=new Map,yn=[],cb="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Qf(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":In=null;break;case"mouseover":case"mouseout":Cn=null;break;case"pointerover":case"pointerout":ss.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":os.delete(e.pointerId)}}function xi(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Ds(e),e!==null&&td(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function ub(t,e,n,r,i){switch(e){case"focusin":return En=xi(En,t,e,n,r,i),!0;case"dragenter":return In=xi(In,t,e,n,r,i),!0;case"mouseover":return Cn=xi(Cn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return ss.set(s,xi(ss.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,os.set(s,xi(os.get(s)||null,t,e,n,r,i)),!0}return!1}function ug(t){var e=er(t.target);if(e!==null){var n=wr(e);if(n!==null){if(e=n.tag,e===13){if(e=Xm(n),e!==null){t.blockedOn=e,cg(t.priority,function(){ag(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function No(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Fc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Pc=r,n.target.dispatchEvent(r),Pc=null}else return e=Ds(n),e!==null&&td(e),t.blockedOn=n,!1;e.shift()}return!0}function Jf(t,e,n){No(t)&&n.delete(e)}function db(){jc=!1,En!==null&&No(En)&&(En=null),In!==null&&No(In)&&(In=null),Cn!==null&&No(Cn)&&(Cn=null),ss.forEach(Jf),os.forEach(Jf)}function Ei(t,e){t.blockedOn===e&&(t.blockedOn=null,jc||(jc=!0,at.unstable_scheduleCallback(at.unstable_NormalPriority,db)))}function as(t){function e(i){return Ei(i,t)}if(0<co.length){Ei(co[0],t);for(var n=1;n<co.length;n++){var r=co[n];r.blockedOn===t&&(r.blockedOn=null)}}for(En!==null&&Ei(En,t),In!==null&&Ei(In,t),Cn!==null&&Ei(Cn,t),ss.forEach(e),os.forEach(e),n=0;n<yn.length;n++)r=yn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<yn.length&&(n=yn[0],n.blockedOn===null);)ug(n),n.blockedOn===null&&yn.shift()}var Hr=dn.ReactCurrentBatchConfig,Zo=!0;function fb(t,e,n,r){var i=ie,s=Hr.transition;Hr.transition=null;try{ie=1,nd(t,e,n,r)}finally{ie=i,Hr.transition=s}}function pb(t,e,n,r){var i=ie,s=Hr.transition;Hr.transition=null;try{ie=4,nd(t,e,n,r)}finally{ie=i,Hr.transition=s}}function nd(t,e,n,r){if(Zo){var i=Fc(t,e,n,r);if(i===null)Vl(t,e,r,ea,n),Qf(t,r);else if(ub(i,t,e,n,r))r.stopPropagation();else if(Qf(t,r),e&4&&-1<cb.indexOf(t)){for(;i!==null;){var s=Ds(i);if(s!==null&&og(s),s=Fc(t,e,n,r),s===null&&Vl(t,e,r,ea,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Vl(t,e,r,null,n)}}var ea=null;function Fc(t,e,n,r){if(ea=null,t=Xu(r),t=er(t),t!==null)if(e=wr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Xm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ea=t,null}function dg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(eb()){case Zu:return 1;case ng:return 4;case Jo:case tb:return 16;case rg:return 536870912;default:return 16}default:return 16}}var kn=null,rd=null,Po=null;function fg(){if(Po)return Po;var t,e=rd,n=e.length,r,i="value"in kn?kn.value:kn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Po=i.slice(t,1<r?1-r:void 0)}function Oo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function uo(){return!0}function Xf(){return!1}function ct(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?uo:Xf,this.isPropagationStopped=Xf,this}return ve(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=uo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=uo)},persist:function(){},isPersistent:uo}),e}var fi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},id=ct(fi),Os=ve({},fi,{view:0,detail:0}),hb=ct(Os),Nl,Pl,Ii,Ba=ve({},Os,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ii&&(Ii&&t.type==="mousemove"?(Nl=t.screenX-Ii.screenX,Pl=t.screenY-Ii.screenY):Pl=Nl=0,Ii=t),Nl)},movementY:function(t){return"movementY"in t?t.movementY:Pl}}),Zf=ct(Ba),mb=ve({},Ba,{dataTransfer:0}),gb=ct(mb),yb=ve({},Os,{relatedTarget:0}),Ol=ct(yb),vb=ve({},fi,{animationName:0,elapsedTime:0,pseudoElement:0}),_b=ct(vb),wb=ve({},fi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),bb=ct(wb),Sb=ve({},fi,{data:0}),ep=ct(Sb),kb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Eb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ib(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Eb[t])?!!e[t]:!1}function sd(){return Ib}var Cb=ve({},Os,{key:function(t){if(t.key){var e=kb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Oo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?xb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sd,charCode:function(t){return t.type==="keypress"?Oo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Oo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Rb=ct(Cb),Tb=ve({},Ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tp=ct(Tb),Ab=ve({},Os,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sd}),Nb=ct(Ab),Pb=ve({},fi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ob=ct(Pb),Db=ve({},Ba,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Mb=ct(Db),Lb=[9,13,27,32],od=nn&&"CompositionEvent"in window,Wi=null;nn&&"documentMode"in document&&(Wi=document.documentMode);var jb=nn&&"TextEvent"in window&&!Wi,pg=nn&&(!od||Wi&&8<Wi&&11>=Wi),np=" ",rp=!1;function hg(t,e){switch(t){case"keyup":return Lb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ar=!1;function Fb(t,e){switch(t){case"compositionend":return mg(e);case"keypress":return e.which!==32?null:(rp=!0,np);case"textInput":return t=e.data,t===np&&rp?null:t;default:return null}}function Ub(t,e){if(Ar)return t==="compositionend"||!od&&hg(t,e)?(t=fg(),Po=rd=kn=null,Ar=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return pg&&e.locale!=="ko"?null:e.data;default:return null}}var Vb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ip(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Vb[t.type]:e==="textarea"}function gg(t,e,n,r){qm(r),e=ta(e,"onChange"),0<e.length&&(n=new id("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Bi=null,ls=null;function $b(t){Cg(t,0)}function Ha(t){var e=Or(t);if(Vm(e))return t}function zb(t,e){if(t==="change")return e}var yg=!1;if(nn){var Dl;if(nn){var Ml="oninput"in document;if(!Ml){var sp=document.createElement("div");sp.setAttribute("oninput","return;"),Ml=typeof sp.oninput=="function"}Dl=Ml}else Dl=!1;yg=Dl&&(!document.documentMode||9<document.documentMode)}function op(){Bi&&(Bi.detachEvent("onpropertychange",vg),ls=Bi=null)}function vg(t){if(t.propertyName==="value"&&Ha(ls)){var e=[];gg(e,ls,t,Xu(t)),Jm($b,e)}}function Wb(t,e,n){t==="focusin"?(op(),Bi=e,ls=n,Bi.attachEvent("onpropertychange",vg)):t==="focusout"&&op()}function Bb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ha(ls)}function Hb(t,e){if(t==="click")return Ha(e)}function Kb(t,e){if(t==="input"||t==="change")return Ha(e)}function qb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Nt=typeof Object.is=="function"?Object.is:qb;function cs(t,e){if(Nt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!wc.call(e,i)||!Nt(t[i],e[i]))return!1}return!0}function ap(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function lp(t,e){var n=ap(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ap(n)}}function _g(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?_g(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wg(){for(var t=window,e=Go();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Go(t.document)}return e}function ad(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Gb(t){var e=wg(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&_g(n.ownerDocument.documentElement,n)){if(r!==null&&ad(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=lp(n,s);var o=lp(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Yb=nn&&"documentMode"in document&&11>=document.documentMode,Nr=null,Uc=null,Hi=null,Vc=!1;function cp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vc||Nr==null||Nr!==Go(r)||(r=Nr,"selectionStart"in r&&ad(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hi&&cs(Hi,r)||(Hi=r,r=ta(Uc,"onSelect"),0<r.length&&(e=new id("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Nr)))}function fo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Pr={animationend:fo("Animation","AnimationEnd"),animationiteration:fo("Animation","AnimationIteration"),animationstart:fo("Animation","AnimationStart"),transitionend:fo("Transition","TransitionEnd")},Ll={},bg={};nn&&(bg=document.createElement("div").style,"AnimationEvent"in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),"TransitionEvent"in window||delete Pr.transitionend.transition);function Ka(t){if(Ll[t])return Ll[t];if(!Pr[t])return t;var e=Pr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in bg)return Ll[t]=e[n];return t}var Sg=Ka("animationend"),kg=Ka("animationiteration"),xg=Ka("animationstart"),Eg=Ka("transitionend"),Ig=new Map,up="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Kn(t,e){Ig.set(t,e),_r(e,[t])}for(var jl=0;jl<up.length;jl++){var Fl=up[jl],Qb=Fl.toLowerCase(),Jb=Fl[0].toUpperCase()+Fl.slice(1);Kn(Qb,"on"+Jb)}Kn(Sg,"onAnimationEnd");Kn(kg,"onAnimationIteration");Kn(xg,"onAnimationStart");Kn("dblclick","onDoubleClick");Kn("focusin","onFocus");Kn("focusout","onBlur");Kn(Eg,"onTransitionEnd");Zr("onMouseEnter",["mouseout","mouseover"]);Zr("onMouseLeave",["mouseout","mouseover"]);Zr("onPointerEnter",["pointerout","pointerover"]);Zr("onPointerLeave",["pointerout","pointerover"]);_r("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));_r("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));_r("onBeforeInput",["compositionend","keypress","textInput","paste"]);_r("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xb=new Set("cancel close invalid load scroll toggle".split(" ").concat(Vi));function dp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Qw(r,e,void 0,t),t.currentTarget=null}function Cg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;dp(i,a,c),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;dp(i,a,c),s=l}}}if(Qo)throw t=Mc,Qo=!1,Mc=null,t}function de(t,e){var n=e[Hc];n===void 0&&(n=e[Hc]=new Set);var r=t+"__bubble";n.has(r)||(Rg(e,t,2,!1),n.add(r))}function Ul(t,e,n){var r=0;e&&(r|=4),Rg(n,t,r,e)}var po="_reactListening"+Math.random().toString(36).slice(2);function us(t){if(!t[po]){t[po]=!0,Mm.forEach(function(n){n!=="selectionchange"&&(Xb.has(n)||Ul(n,!1,t),Ul(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[po]||(e[po]=!0,Ul("selectionchange",!1,e))}}function Rg(t,e,n,r){switch(dg(e)){case 1:var i=fb;break;case 4:i=pb;break;default:i=nd}n=i.bind(null,e,n,t),i=void 0,!Dc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Vl(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=er(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Jm(function(){var c=s,d=Xu(n),u=[];e:{var f=Ig.get(t);if(f!==void 0){var g=id,v=t;switch(t){case"keypress":if(Oo(n)===0)break e;case"keydown":case"keyup":g=Rb;break;case"focusin":v="focus",g=Ol;break;case"focusout":v="blur",g=Ol;break;case"beforeblur":case"afterblur":g=Ol;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=gb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Nb;break;case Sg:case kg:case xg:g=_b;break;case Eg:g=Ob;break;case"scroll":g=hb;break;case"wheel":g=Mb;break;case"copy":case"cut":case"paste":g=bb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=tp}var w=(e&4)!==0,T=!w&&t==="scroll",y=w?f!==null?f+"Capture":null:f;w=[];for(var m=c,h;m!==null;){h=m;var _=h.stateNode;if(h.tag===5&&_!==null&&(h=_,y!==null&&(_=is(m,y),_!=null&&w.push(ds(m,_,h)))),T)break;m=m.return}0<w.length&&(f=new g(f,v,null,n,d),u.push({event:f,listeners:w}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",f&&n!==Pc&&(v=n.relatedTarget||n.fromElement)&&(er(v)||v[rn]))break e;if((g||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?er(v):null,v!==null&&(T=wr(v),v!==T||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(w=Zf,_="onMouseLeave",y="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(w=tp,_="onPointerLeave",y="onPointerEnter",m="pointer"),T=g==null?f:Or(g),h=v==null?f:Or(v),f=new w(_,m+"leave",g,n,d),f.target=T,f.relatedTarget=h,_=null,er(d)===c&&(w=new w(y,m+"enter",v,n,d),w.target=h,w.relatedTarget=T,_=w),T=_,g&&v)t:{for(w=g,y=v,m=0,h=w;h;h=Er(h))m++;for(h=0,_=y;_;_=Er(_))h++;for(;0<m-h;)w=Er(w),m--;for(;0<h-m;)y=Er(y),h--;for(;m--;){if(w===y||y!==null&&w===y.alternate)break t;w=Er(w),y=Er(y)}w=null}else w=null;g!==null&&fp(u,f,g,w,!1),v!==null&&T!==null&&fp(u,T,v,w,!0)}}e:{if(f=c?Or(c):window,g=f.nodeName&&f.nodeName.toLowerCase(),g==="select"||g==="input"&&f.type==="file")var b=zb;else if(ip(f))if(yg)b=Kb;else{b=Bb;var E=Wb}else(g=f.nodeName)&&g.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(b=Hb);if(b&&(b=b(t,c))){gg(u,b,n,d);break e}E&&E(t,f,c),t==="focusout"&&(E=f._wrapperState)&&E.controlled&&f.type==="number"&&Cc(f,"number",f.value)}switch(E=c?Or(c):window,t){case"focusin":(ip(E)||E.contentEditable==="true")&&(Nr=E,Uc=c,Hi=null);break;case"focusout":Hi=Uc=Nr=null;break;case"mousedown":Vc=!0;break;case"contextmenu":case"mouseup":case"dragend":Vc=!1,cp(u,n,d);break;case"selectionchange":if(Yb)break;case"keydown":case"keyup":cp(u,n,d)}var x;if(od)e:{switch(t){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Ar?hg(t,n)&&(k="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(pg&&n.locale!=="ko"&&(Ar||k!=="onCompositionStart"?k==="onCompositionEnd"&&Ar&&(x=fg()):(kn=d,rd="value"in kn?kn.value:kn.textContent,Ar=!0)),E=ta(c,k),0<E.length&&(k=new ep(k,t,null,n,d),u.push({event:k,listeners:E}),x?k.data=x:(x=mg(n),x!==null&&(k.data=x)))),(x=jb?Fb(t,n):Ub(t,n))&&(c=ta(c,"onBeforeInput"),0<c.length&&(d=new ep("onBeforeInput","beforeinput",null,n,d),u.push({event:d,listeners:c}),d.data=x))}Cg(u,e)})}function ds(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ta(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=is(t,n),s!=null&&r.unshift(ds(t,s,i)),s=is(t,e),s!=null&&r.push(ds(t,s,i))),t=t.return}return r}function Er(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function fp(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=is(n,s),l!=null&&o.unshift(ds(n,l,a))):i||(l=is(n,s),l!=null&&o.push(ds(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Zb=/\r\n?/g,eS=/\u0000|\uFFFD/g;function pp(t){return(typeof t=="string"?t:""+t).replace(Zb,`
`).replace(eS,"")}function ho(t,e,n){if(e=pp(e),pp(t)!==e&&n)throw Error(I(425))}function na(){}var $c=null,zc=null;function Wc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Bc=typeof setTimeout=="function"?setTimeout:void 0,tS=typeof clearTimeout=="function"?clearTimeout:void 0,hp=typeof Promise=="function"?Promise:void 0,nS=typeof queueMicrotask=="function"?queueMicrotask:typeof hp<"u"?function(t){return hp.resolve(null).then(t).catch(rS)}:Bc;function rS(t){setTimeout(function(){throw t})}function $l(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),as(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);as(e)}function Rn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function mp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var pi=Math.random().toString(36).slice(2),jt="__reactFiber$"+pi,fs="__reactProps$"+pi,rn="__reactContainer$"+pi,Hc="__reactEvents$"+pi,iS="__reactListeners$"+pi,sS="__reactHandles$"+pi;function er(t){var e=t[jt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[rn]||n[jt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=mp(t);t!==null;){if(n=t[jt])return n;t=mp(t)}return e}t=n,n=t.parentNode}return null}function Ds(t){return t=t[jt]||t[rn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Or(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(I(33))}function qa(t){return t[fs]||null}var Kc=[],Dr=-1;function qn(t){return{current:t}}function pe(t){0>Dr||(t.current=Kc[Dr],Kc[Dr]=null,Dr--)}function ce(t,e){Dr++,Kc[Dr]=t.current,t.current=e}var Vn={},We=qn(Vn),Ze=qn(!1),lr=Vn;function ei(t,e){var n=t.type.contextTypes;if(!n)return Vn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function et(t){return t=t.childContextTypes,t!=null}function ra(){pe(Ze),pe(We)}function gp(t,e,n){if(We.current!==Vn)throw Error(I(168));ce(We,e),ce(Ze,n)}function Tg(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(I(108,Ww(t)||"Unknown",i));return ve({},n,r)}function ia(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Vn,lr=We.current,ce(We,t),ce(Ze,Ze.current),!0}function yp(t,e,n){var r=t.stateNode;if(!r)throw Error(I(169));n?(t=Tg(t,e,lr),r.__reactInternalMemoizedMergedChildContext=t,pe(Ze),pe(We),ce(We,t)):pe(Ze),ce(Ze,n)}var Kt=null,Ga=!1,zl=!1;function Ag(t){Kt===null?Kt=[t]:Kt.push(t)}function oS(t){Ga=!0,Ag(t)}function Gn(){if(!zl&&Kt!==null){zl=!0;var t=0,e=ie;try{var n=Kt;for(ie=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Kt=null,Ga=!1}catch(i){throw Kt!==null&&(Kt=Kt.slice(t+1)),tg(Zu,Gn),i}finally{ie=e,zl=!1}}return null}var Mr=[],Lr=0,sa=null,oa=0,pt=[],ht=0,cr=null,qt=1,Gt="";function Qn(t,e){Mr[Lr++]=oa,Mr[Lr++]=sa,sa=t,oa=e}function Ng(t,e,n){pt[ht++]=qt,pt[ht++]=Gt,pt[ht++]=cr,cr=t;var r=qt;t=Gt;var i=32-Rt(r)-1;r&=~(1<<i),n+=1;var s=32-Rt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,qt=1<<32-Rt(e)+i|n<<i|r,Gt=s+t}else qt=1<<s|n<<i|r,Gt=t}function ld(t){t.return!==null&&(Qn(t,1),Ng(t,1,0))}function cd(t){for(;t===sa;)sa=Mr[--Lr],Mr[Lr]=null,oa=Mr[--Lr],Mr[Lr]=null;for(;t===cr;)cr=pt[--ht],pt[ht]=null,Gt=pt[--ht],pt[ht]=null,qt=pt[--ht],pt[ht]=null}var ot=null,st=null,he=!1,xt=null;function Pg(t,e){var n=mt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function vp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,ot=t,st=Rn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,ot=t,st=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=cr!==null?{id:qt,overflow:Gt}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=mt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,ot=t,st=null,!0):!1;default:return!1}}function qc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Gc(t){if(he){var e=st;if(e){var n=e;if(!vp(t,e)){if(qc(t))throw Error(I(418));e=Rn(n.nextSibling);var r=ot;e&&vp(t,e)?Pg(r,n):(t.flags=t.flags&-4097|2,he=!1,ot=t)}}else{if(qc(t))throw Error(I(418));t.flags=t.flags&-4097|2,he=!1,ot=t}}}function _p(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;ot=t}function mo(t){if(t!==ot)return!1;if(!he)return _p(t),he=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Wc(t.type,t.memoizedProps)),e&&(e=st)){if(qc(t))throw Og(),Error(I(418));for(;e;)Pg(t,e),e=Rn(e.nextSibling)}if(_p(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(I(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){st=Rn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}st=null}}else st=ot?Rn(t.stateNode.nextSibling):null;return!0}function Og(){for(var t=st;t;)t=Rn(t.nextSibling)}function ti(){st=ot=null,he=!1}function ud(t){xt===null?xt=[t]:xt.push(t)}var aS=dn.ReactCurrentBatchConfig;function Ci(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(I(309));var r=n.stateNode}if(!r)throw Error(I(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(I(284));if(!n._owner)throw Error(I(290,t))}return t}function go(t,e){throw t=Object.prototype.toString.call(e),Error(I(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function wp(t){var e=t._init;return e(t._payload)}function Dg(t){function e(y,m){if(t){var h=y.deletions;h===null?(y.deletions=[m],y.flags|=16):h.push(m)}}function n(y,m){if(!t)return null;for(;m!==null;)e(y,m),m=m.sibling;return null}function r(y,m){for(y=new Map;m!==null;)m.key!==null?y.set(m.key,m):y.set(m.index,m),m=m.sibling;return y}function i(y,m){return y=Pn(y,m),y.index=0,y.sibling=null,y}function s(y,m,h){return y.index=h,t?(h=y.alternate,h!==null?(h=h.index,h<m?(y.flags|=2,m):h):(y.flags|=2,m)):(y.flags|=1048576,m)}function o(y){return t&&y.alternate===null&&(y.flags|=2),y}function a(y,m,h,_){return m===null||m.tag!==6?(m=Yl(h,y.mode,_),m.return=y,m):(m=i(m,h),m.return=y,m)}function l(y,m,h,_){var b=h.type;return b===Tr?d(y,m,h.props.children,_,h.key):m!==null&&(m.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===mn&&wp(b)===m.type)?(_=i(m,h.props),_.ref=Ci(y,m,h),_.return=y,_):(_=Vo(h.type,h.key,h.props,null,y.mode,_),_.ref=Ci(y,m,h),_.return=y,_)}function c(y,m,h,_){return m===null||m.tag!==4||m.stateNode.containerInfo!==h.containerInfo||m.stateNode.implementation!==h.implementation?(m=Ql(h,y.mode,_),m.return=y,m):(m=i(m,h.children||[]),m.return=y,m)}function d(y,m,h,_,b){return m===null||m.tag!==7?(m=ar(h,y.mode,_,b),m.return=y,m):(m=i(m,h),m.return=y,m)}function u(y,m,h){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Yl(""+m,y.mode,h),m.return=y,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case io:return h=Vo(m.type,m.key,m.props,null,y.mode,h),h.ref=Ci(y,null,m),h.return=y,h;case Rr:return m=Ql(m,y.mode,h),m.return=y,m;case mn:var _=m._init;return u(y,_(m._payload),h)}if(Fi(m)||Si(m))return m=ar(m,y.mode,h,null),m.return=y,m;go(y,m)}return null}function f(y,m,h,_){var b=m!==null?m.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return b!==null?null:a(y,m,""+h,_);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case io:return h.key===b?l(y,m,h,_):null;case Rr:return h.key===b?c(y,m,h,_):null;case mn:return b=h._init,f(y,m,b(h._payload),_)}if(Fi(h)||Si(h))return b!==null?null:d(y,m,h,_,null);go(y,h)}return null}function g(y,m,h,_,b){if(typeof _=="string"&&_!==""||typeof _=="number")return y=y.get(h)||null,a(m,y,""+_,b);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case io:return y=y.get(_.key===null?h:_.key)||null,l(m,y,_,b);case Rr:return y=y.get(_.key===null?h:_.key)||null,c(m,y,_,b);case mn:var E=_._init;return g(y,m,h,E(_._payload),b)}if(Fi(_)||Si(_))return y=y.get(h)||null,d(m,y,_,b,null);go(m,_)}return null}function v(y,m,h,_){for(var b=null,E=null,x=m,k=m=0,A=null;x!==null&&k<h.length;k++){x.index>k?(A=x,x=null):A=x.sibling;var U=f(y,x,h[k],_);if(U===null){x===null&&(x=A);break}t&&x&&U.alternate===null&&e(y,x),m=s(U,m,k),E===null?b=U:E.sibling=U,E=U,x=A}if(k===h.length)return n(y,x),he&&Qn(y,k),b;if(x===null){for(;k<h.length;k++)x=u(y,h[k],_),x!==null&&(m=s(x,m,k),E===null?b=x:E.sibling=x,E=x);return he&&Qn(y,k),b}for(x=r(y,x);k<h.length;k++)A=g(x,y,k,h[k],_),A!==null&&(t&&A.alternate!==null&&x.delete(A.key===null?k:A.key),m=s(A,m,k),E===null?b=A:E.sibling=A,E=A);return t&&x.forEach(function(L){return e(y,L)}),he&&Qn(y,k),b}function w(y,m,h,_){var b=Si(h);if(typeof b!="function")throw Error(I(150));if(h=b.call(h),h==null)throw Error(I(151));for(var E=b=null,x=m,k=m=0,A=null,U=h.next();x!==null&&!U.done;k++,U=h.next()){x.index>k?(A=x,x=null):A=x.sibling;var L=f(y,x,U.value,_);if(L===null){x===null&&(x=A);break}t&&x&&L.alternate===null&&e(y,x),m=s(L,m,k),E===null?b=L:E.sibling=L,E=L,x=A}if(U.done)return n(y,x),he&&Qn(y,k),b;if(x===null){for(;!U.done;k++,U=h.next())U=u(y,U.value,_),U!==null&&(m=s(U,m,k),E===null?b=U:E.sibling=U,E=U);return he&&Qn(y,k),b}for(x=r(y,x);!U.done;k++,U=h.next())U=g(x,y,k,U.value,_),U!==null&&(t&&U.alternate!==null&&x.delete(U.key===null?k:U.key),m=s(U,m,k),E===null?b=U:E.sibling=U,E=U);return t&&x.forEach(function(ee){return e(y,ee)}),he&&Qn(y,k),b}function T(y,m,h,_){if(typeof h=="object"&&h!==null&&h.type===Tr&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case io:e:{for(var b=h.key,E=m;E!==null;){if(E.key===b){if(b=h.type,b===Tr){if(E.tag===7){n(y,E.sibling),m=i(E,h.props.children),m.return=y,y=m;break e}}else if(E.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===mn&&wp(b)===E.type){n(y,E.sibling),m=i(E,h.props),m.ref=Ci(y,E,h),m.return=y,y=m;break e}n(y,E);break}else e(y,E);E=E.sibling}h.type===Tr?(m=ar(h.props.children,y.mode,_,h.key),m.return=y,y=m):(_=Vo(h.type,h.key,h.props,null,y.mode,_),_.ref=Ci(y,m,h),_.return=y,y=_)}return o(y);case Rr:e:{for(E=h.key;m!==null;){if(m.key===E)if(m.tag===4&&m.stateNode.containerInfo===h.containerInfo&&m.stateNode.implementation===h.implementation){n(y,m.sibling),m=i(m,h.children||[]),m.return=y,y=m;break e}else{n(y,m);break}else e(y,m);m=m.sibling}m=Ql(h,y.mode,_),m.return=y,y=m}return o(y);case mn:return E=h._init,T(y,m,E(h._payload),_)}if(Fi(h))return v(y,m,h,_);if(Si(h))return w(y,m,h,_);go(y,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,m!==null&&m.tag===6?(n(y,m.sibling),m=i(m,h),m.return=y,y=m):(n(y,m),m=Yl(h,y.mode,_),m.return=y,y=m),o(y)):n(y,m)}return T}var ni=Dg(!0),Mg=Dg(!1),aa=qn(null),la=null,jr=null,dd=null;function fd(){dd=jr=la=null}function pd(t){var e=aa.current;pe(aa),t._currentValue=e}function Yc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Kr(t,e){la=t,dd=jr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Je=!0),t.firstContext=null)}function yt(t){var e=t._currentValue;if(dd!==t)if(t={context:t,memoizedValue:e,next:null},jr===null){if(la===null)throw Error(I(308));jr=t,la.dependencies={lanes:0,firstContext:t}}else jr=jr.next=t;return e}var tr=null;function hd(t){tr===null?tr=[t]:tr.push(t)}function Lg(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,hd(e)):(n.next=i.next,i.next=n),e.interleaved=n,sn(t,r)}function sn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var gn=!1;function md(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function en(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Tn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,Z&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,sn(t,n)}return i=r.interleaved,i===null?(e.next=e,hd(r)):(e.next=i.next,i.next=e),r.interleaved=e,sn(t,n)}function Do(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,ed(t,n)}}function bp(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function ca(t,e,n,r){var i=t.updateQueue;gn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(s!==null){var u=i.baseState;o=0,d=c=l=null,a=s;do{var f=a.lane,g=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:g,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,w=a;switch(f=e,g=n,w.tag){case 1:if(v=w.payload,typeof v=="function"){u=v.call(g,u,f);break e}u=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,f=typeof v=="function"?v.call(g,u,f):v,f==null)break e;u=ve({},u,f);break e;case 2:gn=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=i.effects,f===null?i.effects=[a]:f.push(a))}else g={eventTime:g,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=g,l=u):d=d.next=g,o|=f;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;f=a,a=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(d===null&&(l=u),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);dr|=o,t.lanes=o,t.memoizedState=u}}function Sp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(I(191,i));i.call(r)}}}var Ms={},Ut=qn(Ms),ps=qn(Ms),hs=qn(Ms);function nr(t){if(t===Ms)throw Error(I(174));return t}function gd(t,e){switch(ce(hs,e),ce(ps,t),ce(Ut,Ms),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Tc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Tc(e,t)}pe(Ut),ce(Ut,e)}function ri(){pe(Ut),pe(ps),pe(hs)}function Fg(t){nr(hs.current);var e=nr(Ut.current),n=Tc(e,t.type);e!==n&&(ce(ps,t),ce(Ut,n))}function yd(t){ps.current===t&&(pe(Ut),pe(ps))}var me=qn(0);function ua(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Wl=[];function vd(){for(var t=0;t<Wl.length;t++)Wl[t]._workInProgressVersionPrimary=null;Wl.length=0}var Mo=dn.ReactCurrentDispatcher,Bl=dn.ReactCurrentBatchConfig,ur=0,ye=null,xe=null,Pe=null,da=!1,Ki=!1,ms=0,lS=0;function Ue(){throw Error(I(321))}function _d(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Nt(t[n],e[n]))return!1;return!0}function wd(t,e,n,r,i,s){if(ur=s,ye=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Mo.current=t===null||t.memoizedState===null?fS:pS,t=n(r,i),Ki){s=0;do{if(Ki=!1,ms=0,25<=s)throw Error(I(301));s+=1,Pe=xe=null,e.updateQueue=null,Mo.current=hS,t=n(r,i)}while(Ki)}if(Mo.current=fa,e=xe!==null&&xe.next!==null,ur=0,Pe=xe=ye=null,da=!1,e)throw Error(I(300));return t}function bd(){var t=ms!==0;return ms=0,t}function Mt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?ye.memoizedState=Pe=t:Pe=Pe.next=t,Pe}function vt(){if(xe===null){var t=ye.alternate;t=t!==null?t.memoizedState:null}else t=xe.next;var e=Pe===null?ye.memoizedState:Pe.next;if(e!==null)Pe=e,xe=t;else{if(t===null)throw Error(I(310));xe=t,t={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},Pe===null?ye.memoizedState=Pe=t:Pe=Pe.next=t}return Pe}function gs(t,e){return typeof e=="function"?e(t):e}function Hl(t){var e=vt(),n=e.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=t;var r=xe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,c=s;do{var d=c.lane;if((ur&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var u={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=u,o=r):l=l.next=u,ye.lanes|=d,dr|=d}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=a,Nt(r,e.memoizedState)||(Je=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=l,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,ye.lanes|=s,dr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Kl(t){var e=vt(),n=e.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);Nt(s,e.memoizedState)||(Je=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Ug(){}function Vg(t,e){var n=ye,r=vt(),i=e(),s=!Nt(r.memoizedState,i);if(s&&(r.memoizedState=i,Je=!0),r=r.queue,Sd(Wg.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,ys(9,zg.bind(null,n,r,i,e),void 0,null),De===null)throw Error(I(349));ur&30||$g(n,e,i)}return i}function $g(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ye.updateQueue,e===null?(e={lastEffect:null,stores:null},ye.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function zg(t,e,n,r){e.value=n,e.getSnapshot=r,Bg(e)&&Hg(t)}function Wg(t,e,n){return n(function(){Bg(e)&&Hg(t)})}function Bg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Nt(t,n)}catch{return!0}}function Hg(t){var e=sn(t,1);e!==null&&Tt(e,t,1,-1)}function kp(t){var e=Mt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:gs,lastRenderedState:t},e.queue=t,t=t.dispatch=dS.bind(null,ye,t),[e.memoizedState,t]}function ys(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ye.updateQueue,e===null?(e={lastEffect:null,stores:null},ye.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Kg(){return vt().memoizedState}function Lo(t,e,n,r){var i=Mt();ye.flags|=t,i.memoizedState=ys(1|e,n,void 0,r===void 0?null:r)}function Ya(t,e,n,r){var i=vt();r=r===void 0?null:r;var s=void 0;if(xe!==null){var o=xe.memoizedState;if(s=o.destroy,r!==null&&_d(r,o.deps)){i.memoizedState=ys(e,n,s,r);return}}ye.flags|=t,i.memoizedState=ys(1|e,n,s,r)}function xp(t,e){return Lo(8390656,8,t,e)}function Sd(t,e){return Ya(2048,8,t,e)}function qg(t,e){return Ya(4,2,t,e)}function Gg(t,e){return Ya(4,4,t,e)}function Yg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Qg(t,e,n){return n=n!=null?n.concat([t]):null,Ya(4,4,Yg.bind(null,e,t),n)}function kd(){}function Jg(t,e){var n=vt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_d(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Xg(t,e){var n=vt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_d(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Zg(t,e,n){return ur&21?(Nt(n,e)||(n=ig(),ye.lanes|=n,dr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Je=!0),t.memoizedState=n)}function cS(t,e){var n=ie;ie=n!==0&&4>n?n:4,t(!0);var r=Bl.transition;Bl.transition={};try{t(!1),e()}finally{ie=n,Bl.transition=r}}function ey(){return vt().memoizedState}function uS(t,e,n){var r=Nn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ty(t))ny(e,n);else if(n=Lg(t,e,n,r),n!==null){var i=Ke();Tt(n,t,r,i),ry(n,e,r)}}function dS(t,e,n){var r=Nn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ty(t))ny(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,Nt(a,o)){var l=e.interleaved;l===null?(i.next=i,hd(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}n=Lg(t,e,i,r),n!==null&&(i=Ke(),Tt(n,t,r,i),ry(n,e,r))}}function ty(t){var e=t.alternate;return t===ye||e!==null&&e===ye}function ny(t,e){Ki=da=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ry(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,ed(t,n)}}var fa={readContext:yt,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useInsertionEffect:Ue,useLayoutEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useMutableSource:Ue,useSyncExternalStore:Ue,useId:Ue,unstable_isNewReconciler:!1},fS={readContext:yt,useCallback:function(t,e){return Mt().memoizedState=[t,e===void 0?null:e],t},useContext:yt,useEffect:xp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Lo(4194308,4,Yg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Lo(4194308,4,t,e)},useInsertionEffect:function(t,e){return Lo(4,2,t,e)},useMemo:function(t,e){var n=Mt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Mt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=uS.bind(null,ye,t),[r.memoizedState,t]},useRef:function(t){var e=Mt();return t={current:t},e.memoizedState=t},useState:kp,useDebugValue:kd,useDeferredValue:function(t){return Mt().memoizedState=t},useTransition:function(){var t=kp(!1),e=t[0];return t=cS.bind(null,t[1]),Mt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ye,i=Mt();if(he){if(n===void 0)throw Error(I(407));n=n()}else{if(n=e(),De===null)throw Error(I(349));ur&30||$g(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,xp(Wg.bind(null,r,s,t),[t]),r.flags|=2048,ys(9,zg.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Mt(),e=De.identifierPrefix;if(he){var n=Gt,r=qt;n=(r&~(1<<32-Rt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ms++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=lS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},pS={readContext:yt,useCallback:Jg,useContext:yt,useEffect:Sd,useImperativeHandle:Qg,useInsertionEffect:qg,useLayoutEffect:Gg,useMemo:Xg,useReducer:Hl,useRef:Kg,useState:function(){return Hl(gs)},useDebugValue:kd,useDeferredValue:function(t){var e=vt();return Zg(e,xe.memoizedState,t)},useTransition:function(){var t=Hl(gs)[0],e=vt().memoizedState;return[t,e]},useMutableSource:Ug,useSyncExternalStore:Vg,useId:ey,unstable_isNewReconciler:!1},hS={readContext:yt,useCallback:Jg,useContext:yt,useEffect:Sd,useImperativeHandle:Qg,useInsertionEffect:qg,useLayoutEffect:Gg,useMemo:Xg,useReducer:Kl,useRef:Kg,useState:function(){return Kl(gs)},useDebugValue:kd,useDeferredValue:function(t){var e=vt();return xe===null?e.memoizedState=t:Zg(e,xe.memoizedState,t)},useTransition:function(){var t=Kl(gs)[0],e=vt().memoizedState;return[t,e]},useMutableSource:Ug,useSyncExternalStore:Vg,useId:ey,unstable_isNewReconciler:!1};function St(t,e){if(t&&t.defaultProps){e=ve({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Qc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ve({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Qa={isMounted:function(t){return(t=t._reactInternals)?wr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Ke(),i=Nn(t),s=en(r,i);s.payload=e,n!=null&&(s.callback=n),e=Tn(t,s,i),e!==null&&(Tt(e,t,i,r),Do(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Ke(),i=Nn(t),s=en(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Tn(t,s,i),e!==null&&(Tt(e,t,i,r),Do(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Ke(),r=Nn(t),i=en(n,r);i.tag=2,e!=null&&(i.callback=e),e=Tn(t,i,r),e!==null&&(Tt(e,t,r,n),Do(e,t,r))}};function Ep(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!cs(n,r)||!cs(i,s):!0}function iy(t,e,n){var r=!1,i=Vn,s=e.contextType;return typeof s=="object"&&s!==null?s=yt(s):(i=et(e)?lr:We.current,r=e.contextTypes,s=(r=r!=null)?ei(t,i):Vn),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Qa,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Ip(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Qa.enqueueReplaceState(e,e.state,null)}function Jc(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},md(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=yt(s):(s=et(e)?lr:We.current,i.context=ei(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Qc(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Qa.enqueueReplaceState(i,i.state,null),ca(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ii(t,e){try{var n="",r=e;do n+=zw(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function ql(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Xc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var mS=typeof WeakMap=="function"?WeakMap:Map;function sy(t,e,n){n=en(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){ha||(ha=!0,lu=r),Xc(t,e)},n}function oy(t,e,n){n=en(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Xc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Xc(t,e),typeof r!="function"&&(An===null?An=new Set([this]):An.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Cp(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new mS;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=TS.bind(null,t,e,n),e.then(t,t))}function Rp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Tp(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=en(-1,1),e.tag=2,Tn(n,e,1))),n.lanes|=1),t)}var gS=dn.ReactCurrentOwner,Je=!1;function Be(t,e,n,r){e.child=t===null?Mg(e,null,n,r):ni(e,t.child,n,r)}function Ap(t,e,n,r,i){n=n.render;var s=e.ref;return Kr(e,i),r=wd(t,e,n,r,s,i),n=bd(),t!==null&&!Je?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,on(t,e,i)):(he&&n&&ld(e),e.flags|=1,Be(t,e,r,i),e.child)}function Np(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Nd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,ay(t,e,s,r,i)):(t=Vo(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:cs,n(o,r)&&t.ref===e.ref)return on(t,e,i)}return e.flags|=1,t=Pn(s,r),t.ref=e.ref,t.return=e,e.child=t}function ay(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(cs(s,r)&&t.ref===e.ref)if(Je=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Je=!0);else return e.lanes=t.lanes,on(t,e,i)}return Zc(t,e,n,r,i)}function ly(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(Ur,it),it|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ce(Ur,it),it|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ce(Ur,it),it|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ce(Ur,it),it|=r;return Be(t,e,i,n),e.child}function cy(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Zc(t,e,n,r,i){var s=et(n)?lr:We.current;return s=ei(e,s),Kr(e,i),n=wd(t,e,n,r,s,i),r=bd(),t!==null&&!Je?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,on(t,e,i)):(he&&r&&ld(e),e.flags|=1,Be(t,e,n,i),e.child)}function Pp(t,e,n,r,i){if(et(n)){var s=!0;ia(e)}else s=!1;if(Kr(e,i),e.stateNode===null)jo(t,e),iy(e,n,r),Jc(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=yt(c):(c=et(n)?lr:We.current,c=ei(e,c));var d=n.getDerivedStateFromProps,u=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==c)&&Ip(e,o,r,c),gn=!1;var f=e.memoizedState;o.state=f,ca(e,r,o,i),l=e.memoizedState,a!==r||f!==l||Ze.current||gn?(typeof d=="function"&&(Qc(e,n,d,r),l=e.memoizedState),(a=gn||Ep(e,n,a,r,f,l,c))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),o.props=r,o.state=l,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,jg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:St(e.type,a),o.props=c,u=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=yt(l):(l=et(n)?lr:We.current,l=ei(e,l));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==u||f!==l)&&Ip(e,o,r,l),gn=!1,f=e.memoizedState,o.state=f,ca(e,r,o,i);var v=e.memoizedState;a!==u||f!==v||Ze.current||gn?(typeof g=="function"&&(Qc(e,n,g,r),v=e.memoizedState),(c=gn||Ep(e,n,c,r,f,v,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=v),o.props=r,o.state=v,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),r=!1)}return eu(t,e,n,r,s,i)}function eu(t,e,n,r,i,s){cy(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&yp(e,n,!1),on(t,e,s);r=e.stateNode,gS.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=ni(e,t.child,null,s),e.child=ni(e,null,a,s)):Be(t,e,a,s),e.memoizedState=r.state,i&&yp(e,n,!0),e.child}function uy(t){var e=t.stateNode;e.pendingContext?gp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&gp(t,e.context,!1),gd(t,e.containerInfo)}function Op(t,e,n,r,i){return ti(),ud(i),e.flags|=256,Be(t,e,n,r),e.child}var tu={dehydrated:null,treeContext:null,retryLane:0};function nu(t){return{baseLanes:t,cachePool:null,transitions:null}}function dy(t,e,n){var r=e.pendingProps,i=me.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ce(me,i&1),t===null)return Gc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Za(o,r,0,null),t=ar(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=nu(n),e.memoizedState=tu,t):xd(e,o));if(i=t.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return yS(t,e,o,r,a,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=Pn(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Pn(a,s):(s=ar(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?nu(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=tu,r}return s=t.child,t=s.sibling,r=Pn(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function xd(t,e){return e=Za({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function yo(t,e,n,r){return r!==null&&ud(r),ni(e,t.child,null,n),t=xd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function yS(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=ql(Error(I(422))),yo(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Za({mode:"visible",children:r.children},i,0,null),s=ar(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&ni(e,t.child,null,o),e.child.memoizedState=nu(o),e.memoizedState=tu,s);if(!(e.mode&1))return yo(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(I(419)),r=ql(s,r,void 0),yo(t,e,o,r)}if(a=(o&t.childLanes)!==0,Je||a){if(r=De,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,sn(t,i),Tt(r,t,i,-1))}return Ad(),r=ql(Error(I(421))),yo(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=AS.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,st=Rn(i.nextSibling),ot=e,he=!0,xt=null,t!==null&&(pt[ht++]=qt,pt[ht++]=Gt,pt[ht++]=cr,qt=t.id,Gt=t.overflow,cr=e),e=xd(e,r.children),e.flags|=4096,e)}function Dp(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Yc(t.return,e,n)}function Gl(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function fy(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Be(t,e,r.children,n),r=me.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Dp(t,n,e);else if(t.tag===19)Dp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ce(me,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&ua(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Gl(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&ua(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Gl(e,!0,n,null,s);break;case"together":Gl(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function jo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function on(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),dr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(I(153));if(e.child!==null){for(t=e.child,n=Pn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Pn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function vS(t,e,n){switch(e.tag){case 3:uy(e),ti();break;case 5:Fg(e);break;case 1:et(e.type)&&ia(e);break;case 4:gd(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ce(aa,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ce(me,me.current&1),e.flags|=128,null):n&e.child.childLanes?dy(t,e,n):(ce(me,me.current&1),t=on(t,e,n),t!==null?t.sibling:null);ce(me,me.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return fy(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ce(me,me.current),r)break;return null;case 22:case 23:return e.lanes=0,ly(t,e,n)}return on(t,e,n)}var py,ru,hy,my;py=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ru=function(){};hy=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,nr(Ut.current);var s=null;switch(n){case"input":i=Ec(t,i),r=Ec(t,r),s=[];break;case"select":i=ve({},i,{value:void 0}),r=ve({},r,{value:void 0}),s=[];break;case"textarea":i=Rc(t,i),r=Rc(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=na)}Ac(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ns.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ns.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&de("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};my=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ri(t,e){if(!he)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ve(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function _S(t,e,n){var r=e.pendingProps;switch(cd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ve(e),null;case 1:return et(e.type)&&ra(),Ve(e),null;case 3:return r=e.stateNode,ri(),pe(Ze),pe(We),vd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(mo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,xt!==null&&(du(xt),xt=null))),ru(t,e),Ve(e),null;case 5:yd(e);var i=nr(hs.current);if(n=e.type,t!==null&&e.stateNode!=null)hy(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(I(166));return Ve(e),null}if(t=nr(Ut.current),mo(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[jt]=e,r[fs]=s,t=(e.mode&1)!==0,n){case"dialog":de("cancel",r),de("close",r);break;case"iframe":case"object":case"embed":de("load",r);break;case"video":case"audio":for(i=0;i<Vi.length;i++)de(Vi[i],r);break;case"source":de("error",r);break;case"img":case"image":case"link":de("error",r),de("load",r);break;case"details":de("toggle",r);break;case"input":Wf(r,s),de("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},de("invalid",r);break;case"textarea":Hf(r,s),de("invalid",r)}Ac(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&ho(r.textContent,a,t),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ho(r.textContent,a,t),i=["children",""+a]):ns.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&de("scroll",r)}switch(n){case"input":so(r),Bf(r,s,!0);break;case"textarea":so(r),Kf(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=na)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Wm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[jt]=e,t[fs]=r,py(t,e,!1,!1),e.stateNode=t;e:{switch(o=Nc(n,r),n){case"dialog":de("cancel",t),de("close",t),i=r;break;case"iframe":case"object":case"embed":de("load",t),i=r;break;case"video":case"audio":for(i=0;i<Vi.length;i++)de(Vi[i],t);i=r;break;case"source":de("error",t),i=r;break;case"img":case"image":case"link":de("error",t),de("load",t),i=r;break;case"details":de("toggle",t),i=r;break;case"input":Wf(t,r),i=Ec(t,r),de("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=ve({},r,{value:void 0}),de("invalid",t);break;case"textarea":Hf(t,r),i=Rc(t,r),de("invalid",t);break;default:i=r}Ac(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Km(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Bm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&rs(t,l):typeof l=="number"&&rs(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ns.hasOwnProperty(s)?l!=null&&s==="onScroll"&&de("scroll",t):l!=null&&Gu(t,s,l,o))}switch(n){case"input":so(t),Bf(t,r,!1);break;case"textarea":so(t),Kf(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Un(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?zr(t,!!r.multiple,s,!1):r.defaultValue!=null&&zr(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=na)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ve(e),null;case 6:if(t&&e.stateNode!=null)my(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(I(166));if(n=nr(hs.current),nr(Ut.current),mo(e)){if(r=e.stateNode,n=e.memoizedProps,r[jt]=e,(s=r.nodeValue!==n)&&(t=ot,t!==null))switch(t.tag){case 3:ho(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ho(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[jt]=e,e.stateNode=r}return Ve(e),null;case 13:if(pe(me),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(he&&st!==null&&e.mode&1&&!(e.flags&128))Og(),ti(),e.flags|=98560,s=!1;else if(s=mo(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(I(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(I(317));s[jt]=e}else ti(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ve(e),s=!1}else xt!==null&&(du(xt),xt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||me.current&1?Re===0&&(Re=3):Ad())),e.updateQueue!==null&&(e.flags|=4),Ve(e),null);case 4:return ri(),ru(t,e),t===null&&us(e.stateNode.containerInfo),Ve(e),null;case 10:return pd(e.type._context),Ve(e),null;case 17:return et(e.type)&&ra(),Ve(e),null;case 19:if(pe(me),s=e.memoizedState,s===null)return Ve(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ri(s,!1);else{if(Re!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=ua(t),o!==null){for(e.flags|=128,Ri(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ce(me,me.current&1|2),e.child}t=t.sibling}s.tail!==null&&Se()>si&&(e.flags|=128,r=!0,Ri(s,!1),e.lanes=4194304)}else{if(!r)if(t=ua(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ri(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!he)return Ve(e),null}else 2*Se()-s.renderingStartTime>si&&n!==1073741824&&(e.flags|=128,r=!0,Ri(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Se(),e.sibling=null,n=me.current,ce(me,r?n&1|2:n&1),e):(Ve(e),null);case 22:case 23:return Td(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?it&1073741824&&(Ve(e),e.subtreeFlags&6&&(e.flags|=8192)):Ve(e),null;case 24:return null;case 25:return null}throw Error(I(156,e.tag))}function wS(t,e){switch(cd(e),e.tag){case 1:return et(e.type)&&ra(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ri(),pe(Ze),pe(We),vd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return yd(e),null;case 13:if(pe(me),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(I(340));ti()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return pe(me),null;case 4:return ri(),null;case 10:return pd(e.type._context),null;case 22:case 23:return Td(),null;case 24:return null;default:return null}}var vo=!1,$e=!1,bS=typeof WeakSet=="function"?WeakSet:Set,M=null;function Fr(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){be(t,e,r)}else n.current=null}function iu(t,e,n){try{n()}catch(r){be(t,e,r)}}var Mp=!1;function SS(t,e){if($c=Zo,t=wg(),ad(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,d=0,u=t,f=null;t:for(;;){for(var g;u!==n||i!==0&&u.nodeType!==3||(a=o+i),u!==s||r!==0&&u.nodeType!==3||(l=o+r),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)f=u,u=g;for(;;){if(u===t)break t;if(f===n&&++c===i&&(a=o),f===s&&++d===r&&(l=o),(g=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=g}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(zc={focusedElem:t,selectionRange:n},Zo=!1,M=e;M!==null;)if(e=M,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,M=t;else for(;M!==null;){e=M;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,T=v.memoizedState,y=e.stateNode,m=y.getSnapshotBeforeUpdate(e.elementType===e.type?w:St(e.type,w),T);y.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var h=e.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(I(163))}}catch(_){be(e,e.return,_)}if(t=e.sibling,t!==null){t.return=e.return,M=t;break}M=e.return}return v=Mp,Mp=!1,v}function qi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&iu(e,n,s)}i=i.next}while(i!==r)}}function Ja(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function su(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function gy(t){var e=t.alternate;e!==null&&(t.alternate=null,gy(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[jt],delete e[fs],delete e[Hc],delete e[iS],delete e[sS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function yy(t){return t.tag===5||t.tag===3||t.tag===4}function Lp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||yy(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ou(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=na));else if(r!==4&&(t=t.child,t!==null))for(ou(t,e,n),t=t.sibling;t!==null;)ou(t,e,n),t=t.sibling}function au(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(au(t,e,n),t=t.sibling;t!==null;)au(t,e,n),t=t.sibling}var Me=null,kt=!1;function fn(t,e,n){for(n=n.child;n!==null;)vy(t,e,n),n=n.sibling}function vy(t,e,n){if(Ft&&typeof Ft.onCommitFiberUnmount=="function")try{Ft.onCommitFiberUnmount(Wa,n)}catch{}switch(n.tag){case 5:$e||Fr(n,e);case 6:var r=Me,i=kt;Me=null,fn(t,e,n),Me=r,kt=i,Me!==null&&(kt?(t=Me,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Me.removeChild(n.stateNode));break;case 18:Me!==null&&(kt?(t=Me,n=n.stateNode,t.nodeType===8?$l(t.parentNode,n):t.nodeType===1&&$l(t,n),as(t)):$l(Me,n.stateNode));break;case 4:r=Me,i=kt,Me=n.stateNode.containerInfo,kt=!0,fn(t,e,n),Me=r,kt=i;break;case 0:case 11:case 14:case 15:if(!$e&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&iu(n,e,o),i=i.next}while(i!==r)}fn(t,e,n);break;case 1:if(!$e&&(Fr(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){be(n,e,a)}fn(t,e,n);break;case 21:fn(t,e,n);break;case 22:n.mode&1?($e=(r=$e)||n.memoizedState!==null,fn(t,e,n),$e=r):fn(t,e,n);break;default:fn(t,e,n)}}function jp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new bS),e.forEach(function(r){var i=NS.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function bt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Me=a.stateNode,kt=!1;break e;case 3:Me=a.stateNode.containerInfo,kt=!0;break e;case 4:Me=a.stateNode.containerInfo,kt=!0;break e}a=a.return}if(Me===null)throw Error(I(160));vy(s,o,i),Me=null,kt=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){be(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)_y(e,t),e=e.sibling}function _y(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(bt(e,t),Dt(t),r&4){try{qi(3,t,t.return),Ja(3,t)}catch(w){be(t,t.return,w)}try{qi(5,t,t.return)}catch(w){be(t,t.return,w)}}break;case 1:bt(e,t),Dt(t),r&512&&n!==null&&Fr(n,n.return);break;case 5:if(bt(e,t),Dt(t),r&512&&n!==null&&Fr(n,n.return),t.flags&32){var i=t.stateNode;try{rs(i,"")}catch(w){be(t,t.return,w)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&$m(i,s),Nc(a,o);var c=Nc(a,s);for(o=0;o<l.length;o+=2){var d=l[o],u=l[o+1];d==="style"?Km(i,u):d==="dangerouslySetInnerHTML"?Bm(i,u):d==="children"?rs(i,u):Gu(i,d,u,c)}switch(a){case"input":Ic(i,s);break;case"textarea":zm(i,s);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?zr(i,!!s.multiple,g,!1):f!==!!s.multiple&&(s.defaultValue!=null?zr(i,!!s.multiple,s.defaultValue,!0):zr(i,!!s.multiple,s.multiple?[]:"",!1))}i[fs]=s}catch(w){be(t,t.return,w)}}break;case 6:if(bt(e,t),Dt(t),r&4){if(t.stateNode===null)throw Error(I(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(w){be(t,t.return,w)}}break;case 3:if(bt(e,t),Dt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{as(e.containerInfo)}catch(w){be(t,t.return,w)}break;case 4:bt(e,t),Dt(t);break;case 13:bt(e,t),Dt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Cd=Se())),r&4&&jp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?($e=(c=$e)||d,bt(e,t),$e=c):bt(e,t),Dt(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(M=t,d=t.child;d!==null;){for(u=M=d;M!==null;){switch(f=M,g=f.child,f.tag){case 0:case 11:case 14:case 15:qi(4,f,f.return);break;case 1:Fr(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){r=f,n=f.return;try{e=r,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(w){be(r,n,w)}}break;case 5:Fr(f,f.return);break;case 22:if(f.memoizedState!==null){Up(u);continue}}g!==null?(g.return=f,M=g):Up(u)}d=d.sibling}e:for(d=null,u=t;;){if(u.tag===5){if(d===null){d=u;try{i=u.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=u.stateNode,l=u.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Hm("display",o))}catch(w){be(t,t.return,w)}}}else if(u.tag===6){if(d===null)try{u.stateNode.nodeValue=c?"":u.memoizedProps}catch(w){be(t,t.return,w)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===t)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;d===u&&(d=null),u=u.return}d===u&&(d=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:bt(e,t),Dt(t),r&4&&jp(t);break;case 21:break;default:bt(e,t),Dt(t)}}function Dt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(yy(n)){var r=n;break e}n=n.return}throw Error(I(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(rs(i,""),r.flags&=-33);var s=Lp(t);au(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Lp(t);ou(t,a,o);break;default:throw Error(I(161))}}catch(l){be(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function kS(t,e,n){M=t,wy(t)}function wy(t,e,n){for(var r=(t.mode&1)!==0;M!==null;){var i=M,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||vo;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||$e;a=vo;var c=$e;if(vo=o,($e=l)&&!c)for(M=i;M!==null;)o=M,l=o.child,o.tag===22&&o.memoizedState!==null?Vp(i):l!==null?(l.return=o,M=l):Vp(i);for(;s!==null;)M=s,wy(s),s=s.sibling;M=i,vo=a,$e=c}Fp(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,M=s):Fp(t)}}function Fp(t){for(;M!==null;){var e=M;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:$e||Ja(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!$e)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:St(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Sp(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Sp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var u=d.dehydrated;u!==null&&as(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(I(163))}$e||e.flags&512&&su(e)}catch(f){be(e,e.return,f)}}if(e===t){M=null;break}if(n=e.sibling,n!==null){n.return=e.return,M=n;break}M=e.return}}function Up(t){for(;M!==null;){var e=M;if(e===t){M=null;break}var n=e.sibling;if(n!==null){n.return=e.return,M=n;break}M=e.return}}function Vp(t){for(;M!==null;){var e=M;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ja(4,e)}catch(l){be(e,n,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){be(e,i,l)}}var s=e.return;try{su(e)}catch(l){be(e,s,l)}break;case 5:var o=e.return;try{su(e)}catch(l){be(e,o,l)}}}catch(l){be(e,e.return,l)}if(e===t){M=null;break}var a=e.sibling;if(a!==null){a.return=e.return,M=a;break}M=e.return}}var xS=Math.ceil,pa=dn.ReactCurrentDispatcher,Ed=dn.ReactCurrentOwner,gt=dn.ReactCurrentBatchConfig,Z=0,De=null,ke=null,Le=0,it=0,Ur=qn(0),Re=0,vs=null,dr=0,Xa=0,Id=0,Gi=null,Qe=null,Cd=0,si=1/0,Ht=null,ha=!1,lu=null,An=null,_o=!1,xn=null,ma=0,Yi=0,cu=null,Fo=-1,Uo=0;function Ke(){return Z&6?Se():Fo!==-1?Fo:Fo=Se()}function Nn(t){return t.mode&1?Z&2&&Le!==0?Le&-Le:aS.transition!==null?(Uo===0&&(Uo=ig()),Uo):(t=ie,t!==0||(t=window.event,t=t===void 0?16:dg(t.type)),t):1}function Tt(t,e,n,r){if(50<Yi)throw Yi=0,cu=null,Error(I(185));Ps(t,n,r),(!(Z&2)||t!==De)&&(t===De&&(!(Z&2)&&(Xa|=n),Re===4&&vn(t,Le)),tt(t,r),n===1&&Z===0&&!(e.mode&1)&&(si=Se()+500,Ga&&Gn()))}function tt(t,e){var n=t.callbackNode;ab(t,e);var r=Xo(t,t===De?Le:0);if(r===0)n!==null&&Yf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Yf(n),e===1)t.tag===0?oS($p.bind(null,t)):Ag($p.bind(null,t)),nS(function(){!(Z&6)&&Gn()}),n=null;else{switch(sg(r)){case 1:n=Zu;break;case 4:n=ng;break;case 16:n=Jo;break;case 536870912:n=rg;break;default:n=Jo}n=Ry(n,by.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function by(t,e){if(Fo=-1,Uo=0,Z&6)throw Error(I(327));var n=t.callbackNode;if(qr()&&t.callbackNode!==n)return null;var r=Xo(t,t===De?Le:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=ga(t,r);else{e=r;var i=Z;Z|=2;var s=ky();(De!==t||Le!==e)&&(Ht=null,si=Se()+500,or(t,e));do try{CS();break}catch(a){Sy(t,a)}while(!0);fd(),pa.current=s,Z=i,ke!==null?e=0:(De=null,Le=0,e=Re)}if(e!==0){if(e===2&&(i=Lc(t),i!==0&&(r=i,e=uu(t,i))),e===1)throw n=vs,or(t,0),vn(t,r),tt(t,Se()),n;if(e===6)vn(t,r);else{if(i=t.current.alternate,!(r&30)&&!ES(i)&&(e=ga(t,r),e===2&&(s=Lc(t),s!==0&&(r=s,e=uu(t,s))),e===1))throw n=vs,or(t,0),vn(t,r),tt(t,Se()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(I(345));case 2:Jn(t,Qe,Ht);break;case 3:if(vn(t,r),(r&130023424)===r&&(e=Cd+500-Se(),10<e)){if(Xo(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){Ke(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Bc(Jn.bind(null,t,Qe,Ht),e);break}Jn(t,Qe,Ht);break;case 4:if(vn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Rt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*xS(r/1960))-r,10<r){t.timeoutHandle=Bc(Jn.bind(null,t,Qe,Ht),r);break}Jn(t,Qe,Ht);break;case 5:Jn(t,Qe,Ht);break;default:throw Error(I(329))}}}return tt(t,Se()),t.callbackNode===n?by.bind(null,t):null}function uu(t,e){var n=Gi;return t.current.memoizedState.isDehydrated&&(or(t,e).flags|=256),t=ga(t,e),t!==2&&(e=Qe,Qe=n,e!==null&&du(e)),t}function du(t){Qe===null?Qe=t:Qe.push.apply(Qe,t)}function ES(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Nt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function vn(t,e){for(e&=~Id,e&=~Xa,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Rt(e),r=1<<n;t[n]=-1,e&=~r}}function $p(t){if(Z&6)throw Error(I(327));qr();var e=Xo(t,0);if(!(e&1))return tt(t,Se()),null;var n=ga(t,e);if(t.tag!==0&&n===2){var r=Lc(t);r!==0&&(e=r,n=uu(t,r))}if(n===1)throw n=vs,or(t,0),vn(t,e),tt(t,Se()),n;if(n===6)throw Error(I(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Jn(t,Qe,Ht),tt(t,Se()),null}function Rd(t,e){var n=Z;Z|=1;try{return t(e)}finally{Z=n,Z===0&&(si=Se()+500,Ga&&Gn())}}function fr(t){xn!==null&&xn.tag===0&&!(Z&6)&&qr();var e=Z;Z|=1;var n=gt.transition,r=ie;try{if(gt.transition=null,ie=1,t)return t()}finally{ie=r,gt.transition=n,Z=e,!(Z&6)&&Gn()}}function Td(){it=Ur.current,pe(Ur)}function or(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,tS(n)),ke!==null)for(n=ke.return;n!==null;){var r=n;switch(cd(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ra();break;case 3:ri(),pe(Ze),pe(We),vd();break;case 5:yd(r);break;case 4:ri();break;case 13:pe(me);break;case 19:pe(me);break;case 10:pd(r.type._context);break;case 22:case 23:Td()}n=n.return}if(De=t,ke=t=Pn(t.current,null),Le=it=e,Re=0,vs=null,Id=Xa=dr=0,Qe=Gi=null,tr!==null){for(e=0;e<tr.length;e++)if(n=tr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}tr=null}return t}function Sy(t,e){do{var n=ke;try{if(fd(),Mo.current=fa,da){for(var r=ye.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}da=!1}if(ur=0,Pe=xe=ye=null,Ki=!1,ms=0,Ed.current=null,n===null||n.return===null){Re=1,vs=e,ke=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Le,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,u=d.tag;if(!(d.mode&1)&&(u===0||u===11||u===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=Rp(o);if(g!==null){g.flags&=-257,Tp(g,o,a,s,e),g.mode&1&&Cp(s,c,e),e=g,l=c;var v=e.updateQueue;if(v===null){var w=new Set;w.add(l),e.updateQueue=w}else v.add(l);break e}else{if(!(e&1)){Cp(s,c,e),Ad();break e}l=Error(I(426))}}else if(he&&a.mode&1){var T=Rp(o);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Tp(T,o,a,s,e),ud(ii(l,a));break e}}s=l=ii(l,a),Re!==4&&(Re=2),Gi===null?Gi=[s]:Gi.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var y=sy(s,l,e);bp(s,y);break e;case 1:a=l;var m=s.type,h=s.stateNode;if(!(s.flags&128)&&(typeof m.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(An===null||!An.has(h)))){s.flags|=65536,e&=-e,s.lanes|=e;var _=oy(s,a,e);bp(s,_);break e}}s=s.return}while(s!==null)}Ey(n)}catch(b){e=b,ke===n&&n!==null&&(ke=n=n.return);continue}break}while(!0)}function ky(){var t=pa.current;return pa.current=fa,t===null?fa:t}function Ad(){(Re===0||Re===3||Re===2)&&(Re=4),De===null||!(dr&268435455)&&!(Xa&268435455)||vn(De,Le)}function ga(t,e){var n=Z;Z|=2;var r=ky();(De!==t||Le!==e)&&(Ht=null,or(t,e));do try{IS();break}catch(i){Sy(t,i)}while(!0);if(fd(),Z=n,pa.current=r,ke!==null)throw Error(I(261));return De=null,Le=0,Re}function IS(){for(;ke!==null;)xy(ke)}function CS(){for(;ke!==null&&!Xw();)xy(ke)}function xy(t){var e=Cy(t.alternate,t,it);t.memoizedProps=t.pendingProps,e===null?Ey(t):ke=e,Ed.current=null}function Ey(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=wS(n,e),n!==null){n.flags&=32767,ke=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Re=6,ke=null;return}}else if(n=_S(n,e,it),n!==null){ke=n;return}if(e=e.sibling,e!==null){ke=e;return}ke=e=t}while(e!==null);Re===0&&(Re=5)}function Jn(t,e,n){var r=ie,i=gt.transition;try{gt.transition=null,ie=1,RS(t,e,n,r)}finally{gt.transition=i,ie=r}return null}function RS(t,e,n,r){do qr();while(xn!==null);if(Z&6)throw Error(I(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(I(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(lb(t,s),t===De&&(ke=De=null,Le=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||_o||(_o=!0,Ry(Jo,function(){return qr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=gt.transition,gt.transition=null;var o=ie;ie=1;var a=Z;Z|=4,Ed.current=null,SS(t,n),_y(n,t),Gb(zc),Zo=!!$c,zc=$c=null,t.current=n,kS(n),Zw(),Z=a,ie=o,gt.transition=s}else t.current=n;if(_o&&(_o=!1,xn=t,ma=i),s=t.pendingLanes,s===0&&(An=null),nb(n.stateNode),tt(t,Se()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(ha)throw ha=!1,t=lu,lu=null,t;return ma&1&&t.tag!==0&&qr(),s=t.pendingLanes,s&1?t===cu?Yi++:(Yi=0,cu=t):Yi=0,Gn(),null}function qr(){if(xn!==null){var t=sg(ma),e=gt.transition,n=ie;try{if(gt.transition=null,ie=16>t?16:t,xn===null)var r=!1;else{if(t=xn,xn=null,ma=0,Z&6)throw Error(I(331));var i=Z;for(Z|=4,M=t.current;M!==null;){var s=M,o=s.child;if(M.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(M=c;M!==null;){var d=M;switch(d.tag){case 0:case 11:case 15:qi(8,d,s)}var u=d.child;if(u!==null)u.return=d,M=u;else for(;M!==null;){d=M;var f=d.sibling,g=d.return;if(gy(d),d===c){M=null;break}if(f!==null){f.return=g,M=f;break}M=g}}}var v=s.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var T=w.sibling;w.sibling=null,w=T}while(w!==null)}}M=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,M=o;else e:for(;M!==null;){if(s=M,s.flags&2048)switch(s.tag){case 0:case 11:case 15:qi(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,M=y;break e}M=s.return}}var m=t.current;for(M=m;M!==null;){o=M;var h=o.child;if(o.subtreeFlags&2064&&h!==null)h.return=o,M=h;else e:for(o=m;M!==null;){if(a=M,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ja(9,a)}}catch(b){be(a,a.return,b)}if(a===o){M=null;break e}var _=a.sibling;if(_!==null){_.return=a.return,M=_;break e}M=a.return}}if(Z=i,Gn(),Ft&&typeof Ft.onPostCommitFiberRoot=="function")try{Ft.onPostCommitFiberRoot(Wa,t)}catch{}r=!0}return r}finally{ie=n,gt.transition=e}}return!1}function zp(t,e,n){e=ii(n,e),e=sy(t,e,1),t=Tn(t,e,1),e=Ke(),t!==null&&(Ps(t,1,e),tt(t,e))}function be(t,e,n){if(t.tag===3)zp(t,t,n);else for(;e!==null;){if(e.tag===3){zp(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(An===null||!An.has(r))){t=ii(n,t),t=oy(e,t,1),e=Tn(e,t,1),t=Ke(),e!==null&&(Ps(e,1,t),tt(e,t));break}}e=e.return}}function TS(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Ke(),t.pingedLanes|=t.suspendedLanes&n,De===t&&(Le&n)===n&&(Re===4||Re===3&&(Le&130023424)===Le&&500>Se()-Cd?or(t,0):Id|=n),tt(t,e)}function Iy(t,e){e===0&&(t.mode&1?(e=lo,lo<<=1,!(lo&130023424)&&(lo=4194304)):e=1);var n=Ke();t=sn(t,e),t!==null&&(Ps(t,e,n),tt(t,n))}function AS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Iy(t,n)}function NS(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(I(314))}r!==null&&r.delete(e),Iy(t,n)}var Cy;Cy=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Ze.current)Je=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Je=!1,vS(t,e,n);Je=!!(t.flags&131072)}else Je=!1,he&&e.flags&1048576&&Ng(e,oa,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;jo(t,e),t=e.pendingProps;var i=ei(e,We.current);Kr(e,n),i=wd(null,e,r,t,i,n);var s=bd();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,et(r)?(s=!0,ia(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,md(e),i.updater=Qa,e.stateNode=i,i._reactInternals=e,Jc(e,r,t,n),e=eu(null,e,r,!0,s,n)):(e.tag=0,he&&s&&ld(e),Be(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(jo(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=OS(r),t=St(r,t),i){case 0:e=Zc(null,e,r,t,n);break e;case 1:e=Pp(null,e,r,t,n);break e;case 11:e=Ap(null,e,r,t,n);break e;case 14:e=Np(null,e,r,St(r.type,t),n);break e}throw Error(I(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:St(r,i),Zc(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:St(r,i),Pp(t,e,r,i,n);case 3:e:{if(uy(e),t===null)throw Error(I(387));r=e.pendingProps,s=e.memoizedState,i=s.element,jg(t,e),ca(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ii(Error(I(423)),e),e=Op(t,e,r,n,i);break e}else if(r!==i){i=ii(Error(I(424)),e),e=Op(t,e,r,n,i);break e}else for(st=Rn(e.stateNode.containerInfo.firstChild),ot=e,he=!0,xt=null,n=Mg(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ti(),r===i){e=on(t,e,n);break e}Be(t,e,r,n)}e=e.child}return e;case 5:return Fg(e),t===null&&Gc(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Wc(r,i)?o=null:s!==null&&Wc(r,s)&&(e.flags|=32),cy(t,e),Be(t,e,o,n),e.child;case 6:return t===null&&Gc(e),null;case 13:return dy(t,e,n);case 4:return gd(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=ni(e,null,r,n):Be(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:St(r,i),Ap(t,e,r,i,n);case 7:return Be(t,e,e.pendingProps,n),e.child;case 8:return Be(t,e,e.pendingProps.children,n),e.child;case 12:return Be(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ce(aa,r._currentValue),r._currentValue=o,s!==null)if(Nt(s.value,o)){if(s.children===i.children&&!Ze.current){e=on(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=en(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Yc(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(I(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Yc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Be(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Kr(e,n),i=yt(i),r=r(i),e.flags|=1,Be(t,e,r,n),e.child;case 14:return r=e.type,i=St(r,e.pendingProps),i=St(r.type,i),Np(t,e,r,i,n);case 15:return ay(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:St(r,i),jo(t,e),e.tag=1,et(r)?(t=!0,ia(e)):t=!1,Kr(e,n),iy(e,r,i),Jc(e,r,i,n),eu(null,e,r,!0,t,n);case 19:return fy(t,e,n);case 22:return ly(t,e,n)}throw Error(I(156,e.tag))};function Ry(t,e){return tg(t,e)}function PS(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mt(t,e,n,r){return new PS(t,e,n,r)}function Nd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function OS(t){if(typeof t=="function")return Nd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Qu)return 11;if(t===Ju)return 14}return 2}function Pn(t,e){var n=t.alternate;return n===null?(n=mt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Vo(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Nd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Tr:return ar(n.children,i,s,e);case Yu:o=8,i|=8;break;case bc:return t=mt(12,n,e,i|2),t.elementType=bc,t.lanes=s,t;case Sc:return t=mt(13,n,e,i),t.elementType=Sc,t.lanes=s,t;case kc:return t=mt(19,n,e,i),t.elementType=kc,t.lanes=s,t;case Fm:return Za(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Lm:o=10;break e;case jm:o=9;break e;case Qu:o=11;break e;case Ju:o=14;break e;case mn:o=16,r=null;break e}throw Error(I(130,t==null?t:typeof t,""))}return e=mt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function ar(t,e,n,r){return t=mt(7,t,r,e),t.lanes=n,t}function Za(t,e,n,r){return t=mt(22,t,r,e),t.elementType=Fm,t.lanes=n,t.stateNode={isHidden:!1},t}function Yl(t,e,n){return t=mt(6,t,null,e),t.lanes=n,t}function Ql(t,e,n){return e=mt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function DS(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Al(0),this.expirationTimes=Al(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Al(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Pd(t,e,n,r,i,s,o,a,l){return t=new DS(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=mt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},md(s),t}function MS(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Ty(t){if(!t)return Vn;t=t._reactInternals;e:{if(wr(t)!==t||t.tag!==1)throw Error(I(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(et(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(I(171))}if(t.tag===1){var n=t.type;if(et(n))return Tg(t,n,e)}return e}function Ay(t,e,n,r,i,s,o,a,l){return t=Pd(n,r,!0,t,i,s,o,a,l),t.context=Ty(null),n=t.current,r=Ke(),i=Nn(n),s=en(r,i),s.callback=e??null,Tn(n,s,i),t.current.lanes=i,Ps(t,i,r),tt(t,r),t}function el(t,e,n,r){var i=e.current,s=Ke(),o=Nn(i);return n=Ty(n),e.context===null?e.context=n:e.pendingContext=n,e=en(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Tn(i,e,o),t!==null&&(Tt(t,i,o,s),Do(t,i,o)),o}function ya(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Wp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Od(t,e){Wp(t,e),(t=t.alternate)&&Wp(t,e)}function LS(){return null}var Ny=typeof reportError=="function"?reportError:function(t){console.error(t)};function Dd(t){this._internalRoot=t}tl.prototype.render=Dd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(I(409));el(t,e,null,null)};tl.prototype.unmount=Dd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;fr(function(){el(null,t,null,null)}),e[rn]=null}};function tl(t){this._internalRoot=t}tl.prototype.unstable_scheduleHydration=function(t){if(t){var e=lg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<yn.length&&e!==0&&e<yn[n].priority;n++);yn.splice(n,0,t),n===0&&ug(t)}};function Md(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function nl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Bp(){}function jS(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=ya(o);s.call(c)}}var o=Ay(e,r,t,0,null,!1,!1,"",Bp);return t._reactRootContainer=o,t[rn]=o.current,us(t.nodeType===8?t.parentNode:t),fr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=ya(l);a.call(c)}}var l=Pd(t,0,!1,null,null,!1,!1,"",Bp);return t._reactRootContainer=l,t[rn]=l.current,us(t.nodeType===8?t.parentNode:t),fr(function(){el(e,l,n,r)}),l}function rl(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=ya(o);a.call(l)}}el(e,o,t,i)}else o=jS(n,e,t,i,r);return ya(o)}og=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ui(e.pendingLanes);n!==0&&(ed(e,n|1),tt(e,Se()),!(Z&6)&&(si=Se()+500,Gn()))}break;case 13:fr(function(){var r=sn(t,1);if(r!==null){var i=Ke();Tt(r,t,1,i)}}),Od(t,1)}};td=function(t){if(t.tag===13){var e=sn(t,134217728);if(e!==null){var n=Ke();Tt(e,t,134217728,n)}Od(t,134217728)}};ag=function(t){if(t.tag===13){var e=Nn(t),n=sn(t,e);if(n!==null){var r=Ke();Tt(n,t,e,r)}Od(t,e)}};lg=function(){return ie};cg=function(t,e){var n=ie;try{return ie=t,e()}finally{ie=n}};Oc=function(t,e,n){switch(e){case"input":if(Ic(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=qa(r);if(!i)throw Error(I(90));Vm(r),Ic(r,i)}}}break;case"textarea":zm(t,n);break;case"select":e=n.value,e!=null&&zr(t,!!n.multiple,e,!1)}};Ym=Rd;Qm=fr;var FS={usingClientEntryPoint:!1,Events:[Ds,Or,qa,qm,Gm,Rd]},Ti={findFiberByHostInstance:er,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},US={bundleType:Ti.bundleType,version:Ti.version,rendererPackageName:Ti.rendererPackageName,rendererConfig:Ti.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:dn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Zm(t),t===null?null:t.stateNode},findFiberByHostInstance:Ti.findFiberByHostInstance||LS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wo.isDisabled&&wo.supportsFiber)try{Wa=wo.inject(US),Ft=wo}catch{}}lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=FS;lt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Md(e))throw Error(I(200));return MS(t,e,null,n)};lt.createRoot=function(t,e){if(!Md(t))throw Error(I(299));var n=!1,r="",i=Ny;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Pd(t,1,!1,null,null,n,!1,r,i),t[rn]=e.current,us(t.nodeType===8?t.parentNode:t),new Dd(e)};lt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(I(188)):(t=Object.keys(t).join(","),Error(I(268,t)));return t=Zm(e),t=t===null?null:t.stateNode,t};lt.flushSync=function(t){return fr(t)};lt.hydrate=function(t,e,n){if(!nl(e))throw Error(I(200));return rl(null,t,e,!0,n)};lt.hydrateRoot=function(t,e,n){if(!Md(t))throw Error(I(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Ny;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Ay(e,null,t,1,n??null,i,!1,s,o),t[rn]=e.current,us(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new tl(e)};lt.render=function(t,e,n){if(!nl(e))throw Error(I(200));return rl(null,t,e,!1,n)};lt.unmountComponentAtNode=function(t){if(!nl(t))throw Error(I(40));return t._reactRootContainer?(fr(function(){rl(null,null,t,!1,function(){t._reactRootContainer=null,t[rn]=null})}),!0):!1};lt.unstable_batchedUpdates=Rd;lt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!nl(n))throw Error(I(200));if(t==null||t._reactInternals===void 0)throw Error(I(38));return rl(t,e,n,!1,r)};lt.version="18.3.1-next-f1338f8080-20240426";function Py(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Py)}catch(t){console.error(t)}}Py(),Pm.exports=lt;var VS=Pm.exports,Hp=VS;_c.createRoot=Hp.createRoot,_c.hydrateRoot=Hp.hydrateRoot;function Oy(t="Example App"){return{name:t,description:"Small Alpine and Tailwind TODO app with AppLab JSON persistence and live shared data.",sourceCode:$S}}const $S=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Small Alpine and Tailwind TODO app with AppLab JSON persistence and live shared data.">
    <meta name="app-lab-tailwind" content="enabled">
    <title>Example App</title>
    <style>
      html, body { height: 100%; overflow: hidden; }
      [x-cloak] { display: none !important; }
      [data-done="true"] .item-title { color: #64748b; text-decoration: line-through; }
      details > summary::-webkit-details-marker { display: none; }
      dialog { margin: min(12vh, 4rem) auto auto auto; }
    </style>
  </head>
  <body class="h-full bg-stone-50 text-slate-950">
    <main class="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden" x-data="todoExample" x-init="init()" x-cloak>
      <div class="min-h-0 overflow-y-auto">
        <!-- AppLab already shows a fixed frame header from <title>; do not add a second top app bar inside the sandbox. -->
        <!-- The bottom padding keeps the final items clear of the fixed bottom tabs and plus button. -->
        <div class="mx-auto grid w-full max-w-3xl gap-6 px-5 py-6 pb-32 sm:px-6">
          <header class="grid gap-3">
            <p class="text-xs font-black uppercase tracking-wide text-violet-700">AppLab example</p>
            <h1 class="text-4xl font-black tracking-tight text-slate-950">Example App</h1>
            <p class="max-w-2xl text-sm leading-6 text-slate-600">
              A small Alpine and Tailwind app showing AppLab JSON persistence, live shared data, tabs, one dialog, and collapsible list items.
            </p>
          </header>

          <section class="grid gap-3">
            <div class="flex items-end justify-between gap-3">
              <h2 class="text-xl font-black tracking-tight" x-text="ui.tab === 'active' ? 'Active items' : 'Done items'"></h2>
              <p class="text-xs font-bold uppercase text-slate-500" x-text="countLabel"></p>
            </div>

            <div class="grid gap-3">
              <template x-for="item in visibleItems" :key="item.id">
                <details class="group rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" :data-done="item.done">
                  <summary class="grid min-h-20 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 px-5 py-4">
                    <button class="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-sm font-black text-emerald-700" type="button" aria-label="Toggle item" @click.stop.prevent="toggleItem(item.id)" x-text="item.done ? '✓' : ''"></button>
                    <div class="min-w-0">
                      <strong class="item-title block truncate text-base font-black text-slate-900" x-text="item.title"></strong>
                      <span class="text-xs font-bold uppercase text-slate-500" x-text="item.done ? 'Done' : 'Active'"></span>
                    </div>
                    <button class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 hover:text-violet-700" type="button" aria-label="Edit item" title="Edit item" @click.stop.prevent="openItemDialog(item.id)">
                      <svg class="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.2 19.8 6.4 14.1 9.9 17.6 4.2 19.8Z"></path>
                        <path d="M8.1 12.4 13.4 7.1 16.9 10.6 11.6 15.9Z"></path>
                        <path d="M15.1 5.4 17.4 3.1 20.9 6.6 18.6 8.9Z"></path>
                      </svg>
                    </button>
                    <span class="grid h-9 w-9 place-items-center text-sm font-black text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true">v</span>
                  </summary>
                  <div class="border-t border-slate-100 px-5 pb-5 pt-3">
                    <p class="whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-600" x-text="item.description || 'No description yet.'"></p>
                  </div>
                </details>
              </template>

              <p class="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm font-bold text-slate-500" x-show="visibleItems.length === 0">
                Nothing here yet.
              </p>
            </div>
          </section>

          <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900" x-show="ui.error" role="status">
            <p>Something needs attention.</p>
            <p class="font-semibold" x-text="ui.error"></p>
          </div>
        </div>
      </div>

      <!-- Bottom tabs are useful inside mobile-first sandbox apps; AppLab's outer frame handles global app controls. -->
      <nav class="z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgb(15_23_42_/_6%)]" aria-label="Example App tabs">
        <div class="mx-auto grid max-w-3xl grid-cols-2">
          <button class="min-h-16 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'active' ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'active'">Active</button>
          <button class="min-h-16 border-t-4 px-4 text-sm font-black" :class="ui.tab === 'done' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'" type="button" @click="ui.tab = 'done'">Done</button>
        </div>
      </nav>

      <button class="fixed bottom-20 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-violet-600 text-3xl font-light leading-none text-white shadow-lg shadow-slate-900/20 active:scale-[.96]" type="button" aria-label="New item" title="New item" x-show="ui.tab === 'active'" @click="openItemDialog()">+</button>

      <!-- One dialog handles create, edit, and delete instead of using browser prompt/alert/confirm. -->
      <dialog x-ref="itemDialog" class="w-[min(92vw,28rem)] rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl backdrop:bg-slate-950/40">
        <h2 class="text-xl font-black tracking-tight" x-text="dialogTitle"></h2>
        <label class="mt-4 grid gap-2 text-sm font-black text-slate-700">
          Title
          <input class="min-h-12 rounded-xl border border-slate-300 bg-stone-50 px-4 text-base font-semibold outline-none focus:border-violet-500" autocomplete="off" x-model="ui.titleDraft" @keydown.enter.prevent="saveItemDialog">
        </label>
        <label class="mt-3 grid gap-2 text-sm font-black text-slate-700">
          Description
          <textarea class="min-h-28 resize-none rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base font-semibold outline-none focus:border-violet-500" x-model="ui.descriptionDraft"></textarea>
        </label>

        <div class="mt-5 border-t border-slate-100 pt-4" x-show="ui.editingId">
          <button class="text-sm font-black text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-950" type="button" x-show="!ui.confirmDelete" @click="ui.confirmDelete = true">Delete this item</button>
          <div class="grid gap-3 rounded-xl bg-stone-50 p-3" x-show="ui.confirmDelete">
            <p class="text-sm font-bold text-slate-700">Delete this item permanently?</p>
            <div class="flex justify-end gap-2">
              <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700" type="button" @click="ui.confirmDelete = false">Keep</button>
              <button class="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white" type="button" @click="deleteEditingItem">Delete</button>
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <button class="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-700" type="button" @click="$refs.itemDialog.close()">Cancel</button>
          <button class="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-black text-white" type="button" @click="saveItemDialog">Save</button>
        </div>
      </dialog>
    </main>

    <script>
      "use strict";

      document.addEventListener("alpine:init", () => {
        Alpine.data("todoExample", () => ({
          // Persist only plain JSON. Keep transient UI in ui.
          state: { schemaVersion: 1, items: [] },
          ui: {
            tab: "active",
            editingId: null,
            titleDraft: "",
            descriptionDraft: "",
            confirmDelete: false,
            error: ""
          },
          saveInFlight: 0,
          queuedRemoteData: null,

          async init() {
            // Use AppLab for persistence and live shared data; do not use localStorage or direct IndexedDB.
            AppLab.onError((message) => { this.ui.error = String(message || "Unknown AppLab error"); });
            AppLab.onDataChange((nextData) => {
              // Queue incoming data while a local save is in flight so a remote echo does not clobber the local edit.
              if (this.saveInFlight > 0) {
                this.queuedRemoteData = nextData;
                return;
              }
              this.applyData(nextData);
            });
            this.applyData(await AppLab.getData(this.defaultData()));
          },

          defaultData() {
            return {
              schemaVersion: 1,
              items: [
                {
                  id: this.createId(),
                  title: "Edit this example",
                  description: "Open the source or ask AI to change this AppLab app.",
                  done: false,
                  createdAt: new Date().toISOString(),
                  doneAt: null
                },
                {
                  id: this.createId(),
                  title: "Try live data",
                  description: "Share the app, then update an item to see AppLab.onDataChange apply incoming JSON.",
                  done: false,
                  createdAt: new Date().toISOString(),
                  doneAt: null
                }
              ]
            };
          },

          applyData(data) {
            // Normalize saved JSON before the UI reads it. This keeps older or malformed data from breaking the app.
            const source = data && typeof data === "object" ? data : this.defaultData();
            const items = Array.isArray(source.items) ? source.items : [];
            this.state = {
              schemaVersion: 1,
              items: items.map((item) => ({
                id: typeof item.id === "string" ? item.id : this.createId(),
                title: typeof item.title === "string" && item.title.trim() ? item.title : "Untitled item",
                description: typeof item.description === "string" ? item.description : "",
                done: Boolean(item.done),
                createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
                doneAt: typeof item.doneAt === "string" ? item.doneAt : null
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
              if (this.saveInFlight === 0 && this.queuedRemoteData) {
                const queued = this.queuedRemoteData;
                this.queuedRemoteData = null;
                this.applyData(queued);
              }
            }
          },

          get visibleItems() {
            return this.state.items.filter((item) => this.ui.tab === "done" ? item.done : !item.done);
          },
          get countLabel() {
            return this.visibleItems.length + (this.visibleItems.length === 1 ? " item" : " items");
          },
          get dialogTitle() {
            return this.ui.editingId ? "Edit item" : "New item";
          },

          openItemDialog(id) {
            const item = this.state.items.find((candidate) => candidate.id === id);
            this.ui.editingId = item ? item.id : null;
            this.ui.titleDraft = item ? item.title : "";
            this.ui.descriptionDraft = item ? item.description : "";
            this.ui.confirmDelete = false;
            this.$refs.itemDialog.showModal();
          },
          saveItemDialog() {
            const title = this.ui.titleDraft.trim();
            if (!title) return;
            const item = this.state.items.find((candidate) => candidate.id === this.ui.editingId);
            if (item) {
              item.title = title;
              item.description = this.ui.descriptionDraft;
            } else {
              this.state.items.push({
                id: this.createId(),
                title,
                description: this.ui.descriptionDraft,
                done: false,
                createdAt: new Date().toISOString(),
                doneAt: null
              });
            }
            this.$refs.itemDialog.close();
            this.saveState();
          },
          deleteEditingItem() {
            this.state.items = this.state.items.filter((item) => item.id !== this.ui.editingId);
            this.$refs.itemDialog.close();
            this.saveState();
          },
          toggleItem(id) {
            const item = this.state.items.find((candidate) => candidate.id === id);
            if (!item) return;
            item.done = !item.done;
            item.doneAt = item.done ? new Date().toISOString() : null;
            this.saveState();
          },

          createId() {
            if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
            return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
          }
        }));
      });
    <\/script>
  </body>
</html>`;function Kp(t,e={}){var s,o,a,l,c,d;const n=new DOMParser().parseFromString(t,"text/html"),r=(o=(s=n.querySelector("title"))==null?void 0:s.textContent)==null?void 0:o.trim(),i=(l=(a=zS(n))==null?void 0:a.getAttribute("content"))==null?void 0:l.trim();return{name:r||((c=e.name)==null?void 0:c.trim())||"Untitled App",description:i??((d=e.description)==null?void 0:d.trim())??""}}function zS(t){var e;for(const n of t.querySelectorAll("meta"))if(((e=n.getAttribute("name"))==null?void 0:e.toLowerCase())==="description")return n;return null}const qp=1048576;function Ld(t){let e;try{e=JSON.stringify(t)}catch{throw new Error("App data must be JSON-serializable.")}if(e===void 0)throw new Error("App data must be JSON-serializable.");if(new TextEncoder().encode(e).byteLength>qp)throw new Error(`App data exceeds the ${qp} byte limit.`);return JSON.parse(e)}const WS="app-lab-v2",BS=1;function HS(){let t=null;function e(){return t??(t=KS()),t}async function n(){return(await bo((await e()).transaction("apps_registry").objectStore("apps_registry").getAll())).map(({appId:g,name:v,description:w,updatedAt:T})=>({appId:g,name:v,description:w,updatedAt:T})).sort((g,v)=>g.name.localeCompare(v.name))}async function r(f){return await bo((await e()).transaction("apps_registry").objectStore("apps_registry").get(f))??null}async function i(f){const g=new Date().toISOString(),v=Kp(f.sourceCode,{description:f.description,name:f.name}),w={appId:crypto.randomUUID(),compiledCss:f.compiledCss,compiledCssSourceHash:f.compiledCssSourceHash,name:v.name,description:v.description,sourceCode:f.sourceCode,createdAt:g,updatedAt:g};return await u("apps_registry",w),w}function s(){return i(Oy())}async function o(f){const v=(await e()).transaction(["apps_registry","apps_data"],"readwrite");v.objectStore("apps_registry").delete(f),v.objectStore("apps_data").delete(f),await qS(v)}async function a(f){const g=await r(f.appId);if(!g)throw new Error(`App not found: ${f.appId}`);const v=f.sourceCode===void 0?{...g,...f,updatedAt:new Date().toISOString()}:{...g,...f,...Kp(f.sourceCode,{description:g.description,name:g.name}),updatedAt:new Date().toISOString()};return await u("apps_registry",v),v}async function l(f){return await u("apps_registry",f),f}async function c(f){const g=await bo((await e()).transaction("apps_data").objectStore("apps_data").get(f));return(g==null?void 0:g.data)??null}async function d(f,g){if(!await r(f))throw new Error(`App not found: ${f}`);await u("apps_data",{appId:f,data:Ld(g),updatedAt:new Date().toISOString()})}async function u(f,g){await bo((await e()).transaction(f,"readwrite").objectStore(f).put(g))}return{createApp:i,createBlankApp:s,deleteApp:o,getApp:r,getAppData:c,listApps:n,saveAppData:d,updateApp:a,upsertApp:l}}function KS(){return new Promise((t,e)=>{const n=indexedDB.open(WS,BS);n.onupgradeneeded=()=>{const r=n.result;r.objectStoreNames.contains("apps_registry")||r.createObjectStore("apps_registry",{keyPath:"appId"}).createIndex("updatedAt","updatedAt"),r.objectStoreNames.contains("apps_data")||r.createObjectStore("apps_data",{keyPath:"appId"})},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function bo(t){return new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function qS(t){return new Promise((e,n)=>{t.oncomplete=()=>e(),t.onerror=()=>n(t.error),t.onabort=()=>n(t.error)})}const GS="app-lab-sync-queue-v1",YS=1,Lt="sync_queue",QS=2*60*1e3;function JS(t){return`ensure-app-rooms:${t}`}function Dy(t){return`save-source:${t}`}function My(t){return`save-app-data:${t}`}function XS(t){return`delete-owned-app:${t}`}function ZS(t){return`save-workspace-manifest:${t}`}async function Jl(t,e){const n=JS(e),r=await t.getItem(n),i=new Date().toISOString(),s={appId:e,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"ensure-app-rooms",status:"pending",updatedAt:i};return await t.putItem(s),s}async function ek(t){const e=XS(t.app.appId),n=await t.store.getItem(e),r=new Date().toISOString(),i={app:t.app,appId:t.app.appId,attempts:(n==null?void 0:n.attempts)??0,createdAt:(n==null?void 0:n.createdAt)??r,id:e,kind:"delete-owned-app",status:"pending",syncRecord:t.syncRecord,updatedAt:r};return await t.store.putItem(i),i}async function tk(t,e){const n=Dy(e.appId),r=await t.getItem(n),i=new Date().toISOString(),s={appId:e.appId,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-source",sourceCode:e.sourceCode,status:"pending",updatedAt:i};return await t.putItem(s),s}async function nk(t){const e=My(t.appId),n=await t.store.getItem(e),r=new Date().toISOString(),i=(n==null?void 0:n.kind)==="save-app-data"?n:null,s={appId:t.appId,attempts:(i==null?void 0:i.attempts)??0,baseData:(i==null?void 0:i.baseData)??t.baseData,baseRemoteVersion:(i==null?void 0:i.baseRemoteVersion)??t.baseRemoteVersion,createdAt:(i==null?void 0:i.createdAt)??r,id:e,inFlightRevision:null,kind:"save-app-data",localData:t.data,localRevision:((i==null?void 0:i.localRevision)??0)+1,roomId:t.roomId,status:"pending",updatedAt:r};return await t.store.putItem(s),s}async function rk(t,e){const n=ZS(e),r=await t.getItem(n),i=new Date().toISOString(),s={appId:e,attempts:(r==null?void 0:r.attempts)??0,createdAt:(r==null?void 0:r.createdAt)??i,id:n,kind:"save-workspace-manifest",status:"pending",updatedAt:i,workspaceId:e};return await t.putItem(s),s}async function Ls(t,e){const n={...e,status:"syncing",updatedAt:new Date().toISOString()};return await t.putItem(n),n}async function js(t,e,n){const r={...e,attempts:e.attempts+1,lastError:n instanceof Error?n.message:"Unknown sync error.",status:"pending",updatedAt:new Date().toISOString()};return await t.putItem(r),r}function Fs(t,e=new Date){return t.status==="syncing"&&e.getTime()-new Date(t.updatedAt).getTime()>QS}async function Ly(t,e){const n=await t.getItem(e.id);!n||n.updatedAt!==e.updatedAt||n.status!==e.status||await t.removeItem(e.id)}async function ik(t){const e=await t.listItems(),n=new Date().toISOString();await Promise.all(e.filter(r=>r.status==="syncing").map(r=>t.putItem({...r,status:"pending",updatedAt:n})))}function sk(){let t=null;function e(){return t??(t=ok()),t}return{async getItem(n){const r=await So((await e()).transaction(Lt).objectStore(Lt).get(n));return r?Xl(r):null},async listItems(){return(await So((await e()).transaction(Lt).objectStore(Lt).getAll())).map(Xl).sort(ak)},async putItem(n){await So((await e()).transaction(Lt,"readwrite").objectStore(Lt).put(Xl(n)))},async removeItem(n){await So((await e()).transaction(Lt,"readwrite").objectStore(Lt).delete(n))}}}function ok(){return new Promise((t,e)=>{const n=indexedDB.open(GS,YS);n.onupgradeneeded=()=>{const r=n.result;if(!r.objectStoreNames.contains(Lt)){const i=r.createObjectStore(Lt,{keyPath:"id"});i.createIndex("status","status"),i.createIndex("kind","kind"),i.createIndex("updatedAt","updatedAt")}},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function So(t){return new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function ak(t,e){return t.createdAt.localeCompare(e.createdAt)||t.id.localeCompare(e.id)}function Xl(t){return JSON.parse(JSON.stringify(t))}const jd=1,jy=32,lk=16,ck=32,uk=12;function Zl(){const t=`room_access_${ec(ck)}`;return{roomId:`room_${ec(lk)}`,decryptSecret:ec(jy),accessToken:t,readToken:t,writeToken:t,lastSeenVersion:0}}function je(t){return t.readToken??t.accessToken}function $n(t){return t.writeToken??t.accessToken}async function Fd(t){const e=await Uy(t.decryptSecret),n=crypto.getRandomValues(new Uint8Array(uk)),r=new TextEncoder().encode(JSON.stringify(Ld(t.data))),i=await crypto.subtle.encrypt({name:"AES-GCM",iv:n,additionalData:Fy(t)},e,r),s={schemaVersion:jd,algorithm:"AES-GCM",iv:fu(n),ciphertext:fu(new Uint8Array(i))};return JSON.stringify(s)}async function dk(t){const e=fk(t.encryptedPayload),n=await Uy(t.decryptSecret),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:pu(e.iv),additionalData:Fy(t)},n,pu(e.ciphertext));return Ld(JSON.parse(new TextDecoder().decode(r)))}async function Us(t){const{capability:e,snapshot:n}=t;if(n.roomId!==e.roomId)throw new Error("Snapshot room does not match capability.");if(n.version<e.lastSeenVersion)throw new Error("Remote room snapshot is older than the last seen version.");return dk({roomId:n.roomId,roomType:t.roomType,roomVersion:n.version,decryptSecret:e.decryptSecret,encryptedPayload:n.encryptedPayload})}function br(t,e){return{...t,lastSeenVersion:Math.max(t.lastSeenVersion,e.version)}}function Fy(t){return new TextEncoder().encode(JSON.stringify({schemaVersion:jd,roomId:t.roomId,roomType:t.roomType,roomVersion:t.roomVersion}))}async function Uy(t){const e=pu(t);if(e.byteLength!==jy)throw new Error("Room decrypt secret must be a 256-bit base64url key.");return crypto.subtle.importKey("raw",e,"AES-GCM",!1,["encrypt","decrypt"])}function fk(t){let e;try{e=JSON.parse(t)}catch{throw new Error("Encrypted room payload is not valid JSON.")}if(!e||typeof e!="object"||e.schemaVersion!==jd||e.algorithm!=="AES-GCM"||typeof e.iv!="string"||typeof e.ciphertext!="string")throw new Error("Encrypted room payload has an unsupported shape.");return e}function ec(t){return fu(crypto.getRandomValues(new Uint8Array(t)))}function fu(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function pu(t){if(!/^[A-Za-z0-9_-]+$/.test(t))throw new Error("Value is not valid base64url.");const e=t.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(t.length/4)*4,"="),n=atob(e),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}const Vs="auth-v1",pk=32;function Vy(){return`app_lab_owner_${mk(pk)}`}function hk(t){const e=JSON.stringify(t);return JSON.stringify({rules:{".read":!1,".write":!1,appLabOwners:{$uid:{".read":"auth != null && auth.uid === $uid",".write":`auth != null && auth.uid === $uid && ((!data.exists() && newData.child('owner').val() === true && newData.child('setupSecret').val() === ${e}) || (data.exists() && data.child('owner').val() === true && newData.child('owner').val() === true) || (data.exists() && data.child('owner').val() === true && !newData.exists()))`,".validate":"newData.hasChildren(['owner','setupSecret']) && newData.child('owner').val() === true && newData.child('setupSecret').isString()"}},appLabRoomClaimTokens:{$roomId:{".read":!1,".write":"auth != null && root.child('appLabOwners').child(auth.uid).child('owner').val() === true",".validate":"newData.isString()"}},appLabRoomMembers:{$roomId:{$uid:{".read":!1,".write":"auth != null && auth.uid === $uid && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || (!data.exists() && newData.child('member').val() === true && newData.child('claimToken').val() === root.child('appLabRoomClaimTokens').child($roomId).val()) || (data.exists() && data.child('member').val() === true && newData.child('member').val() === true))",".validate":"newData.hasChildren(['member','claimToken']) && newData.child('member').val() === true && newData.child('claimToken').isString()"}}},appLabSyncRooms:{$roomId:{".read":"auth != null && (root.child('appLabOwners').child(auth.uid).child('owner').val() === true || root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true)",".write":"auth != null && ((!data.exists() && newData.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && root.child('appLabOwners').child(auth.uid).child('owner').val() === true) || (data.exists() && newData.exists() && root.child('appLabRoomMembers').child($roomId).child(auth.uid).child('member').val() === true))",".validate":"newData.hasChildren(['encryptedPayload','readTokenHash','roomId','updatedAt','version','writeTokenHash']) && newData.child('roomId').val() === $roomId && newData.child('encryptedPayload').isString() && newData.child('readTokenHash').isString() && newData.child('updatedAt').isString() && newData.child('version').isNumber() && newData.child('writeTokenHash').isString()"}}}},null,2)}function mk(t){const e=crypto.getRandomValues(new Uint8Array(t));let n="";for(const r of e)n+=String.fromCharCode(r);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function gk(t,e=""){const n=t.trim(),r=n?yk(n):{},i=_s(e||r.databaseURL||"");if(!i)throw new Error("Firebase Realtime Database URL is required.");return{...r,databaseURL:i}}function _s(t){const e=t.trim();return e?e.replace(/\/+$/,""):""}function yk(t){if(!t.trim())return{};try{const e=JSON.parse(t);if(!e||typeof e!="object")throw new Error("Firebase config must be an object.");return $y(e)}catch{return vk(t)}}function vk(t){const e={},n=t.replace(/\/\/.*$/gm,""),r=/([A-Za-z_$][\w$]*)\s*:\s*(['"])(.*?)\2\s*,?/g;let i;for(;i=r.exec(n);)e[i[1]]=i[3];return $y(e)}function $y(t){const e={};for(const n of["apiKey","appId","authDomain","databaseURL","measurementId","messagingSenderId","projectId","storageBucket"])typeof t[n]=="string"&&t[n].trim()&&(e[n]=n==="databaseURL"?_s(t[n]):t[n].trim());return e}const hu=1,_k="app-lab-workspace-sync-v1";function wk(t){async function e(){return await t.load()??Sk()}async function n(h){const _=await e(),b=new Date().toISOString();return h(_,b),_.updatedAt=b,await t.save(_),_}async function r(){return(await e()).storageProfile}async function i(h){const _=gk(h.firebaseConfigText??"",h.databaseUrl),b=_.databaseURL;if(!b)throw new Error("Storage database URL is required.");let E=null;if(await n((x,k)=>{var L,ee;const A=x.storageProfile,U=h.accessModel??(A==null?void 0:A.accessModel)??Vs;kk(_),E={accessModel:U,profileId:(A==null?void 0:A.profileId)??`profile_${crypto.randomUUID()}`,provider:h.provider??"firebase-rtdb",displayName:((L=h.displayName)==null?void 0:L.trim())||(A==null?void 0:A.displayName)||"Firebase Realtime Database",databaseUrl:b,firebaseConfig:_,ownerSetupSecret:((ee=h.ownerSetupSecret)==null?void 0:ee.trim())||(A==null?void 0:A.ownerSetupSecret)||Vy(),createdAt:(A==null?void 0:A.createdAt)??k,updatedAt:k},x.storageProfile=E}),!E)throw new Error("Could not save storage profile.");return E}async function s(){await n(h=>{h.storageProfile=null})}async function o(){let h=null;if(await n(_=>{mu(_),_.manifestRoom??(_.manifestRoom=Zl()),h=_.manifestRoom}),!h)throw new Error("Could not create workspace manifest room.");return h}async function a(h){let _=null;if(await n(b=>{if(!b.manifestRoom)throw new Error("Workspace manifest room is not configured.");b.manifestRoom={...b.manifestRoom,lastSeenVersion:Math.max(b.manifestRoom.lastSeenVersion,h)},_=b.manifestRoom}),!_)throw new Error("Could not remember workspace manifest version.");return _}async function l(h){await t.save(Ik(h))}async function c(h){let _=null;if(await n((b,E)=>{const x=mu(b),k=b.apps[h];if((k==null?void 0:k.kind)==="owned"){_=k;return}if((k==null?void 0:k.kind)==="joined")throw new Error("Joined apps must be made into private copies before they can become owned apps.");if((k==null?void 0:k.kind)==="private-copy"){_={kind:"owned",appId:h,storageProfileId:k.storageProfileId,sourceRoom:k.sourceRoom,dataRoom:k.dataRoom,shareState:"private",createdAt:k.createdAt,updatedAt:E},b.apps[h]=_;return}_={kind:"owned",appId:h,storageProfileId:x.profileId,sourceRoom:Zl(),dataRoom:Zl(),shareState:"private",createdAt:E,updatedAt:E},b.apps[h]=_}),!_)throw new Error("Could not create owned app sync record.");return _}async function d(h){let _=null;if(await n((b,E)=>{_={kind:"joined",appId:h.appId,sourceProvider:h.sourceProvider,dataProvider:h.dataProvider??h.sourceProvider,sourceRoom:h.sourceRoom,dataRoom:h.dataRoom,importedAt:E},b.apps[h.appId]=_}),!_)throw new Error("Could not create joined app sync record.");return _}async function u(h){let _=null;if(await n((b,E)=>{const x=b.apps[h];if(!x)throw new Error("App must have sync rooms before it can be shared.");if(x.kind==="owned"){const A=Yp(b,x.storageProfileId);x.shareState="invite-created",x.updatedAt=E,_=Ai(x.sourceRoom,x.dataRoom,A,E);return}if(x.kind==="joined"){if(x.remoteDeletedAt)throw new Error("Deleted shared apps cannot be forwarded.");_=Ai(x.sourceRoom,x.dataRoom,x.sourceProvider,E);return}const k=Yp(b,x.storageProfileId);_=Ai(x.sourceRoom,x.dataRoom,k,E)}),!_)throw new Error("Could not create app invite.");return _}async function f(h){const _=await e(),b=_.apps[h];if(!b)return null;if(b.kind==="joined")return Ai(b.sourceRoom,b.dataRoom,b.sourceProvider,new Date().toISOString());const E=_.storageProfile;return!E||E.profileId!==b.storageProfileId?null:Ai(b.sourceRoom,b.dataRoom,E,new Date().toISOString())}async function g(h){return(await e()).apps[h]??null}async function v(h){return Gp((await e()).apps[h]??null)}async function w(h){const _=await e();return Object.fromEntries(h.map(b=>[b,Gp(_.apps[b]??null)]))}async function T(h){let _=null;if(await n((b,E)=>{const x=b.apps[h.appId];if(!x)throw new Error(`App sync record not found: ${h.appId}`);_={...x,...h.sourceRoom?{sourceRoom:h.sourceRoom}:{},...h.dataRoom?{dataRoom:h.dataRoom}:{},..."updatedAt"in x?{updatedAt:E}:{}},b.apps[h.appId]=_}),!_)throw new Error("Could not remember app room versions.");return _}async function y(h,_){await n((b,E)=>{const x=b.apps[h];if(!x){b.deletedApps[h]={appId:h,deletedAt:_??E,reason:"remote-owner-delete"};return}x.kind==="joined"?b.apps[h]={...x,remoteDeletedAt:_??E}:(delete b.apps[h],b.deletedApps[h]={appId:h,deletedAt:_??E,reason:"remote-owner-delete"})})}async function m(h){await n((_,b)=>{delete _.apps[h],_.deletedApps[h]={appId:h,deletedAt:b,reason:"local-delete"}})}return{clearStorageProfile:s,configureStorageProfile:i,createInvite:u,ensureOwnedAppRooms:c,ensureWorkspaceManifestRoom:o,getAppSyncBadge:v,getAppSyncRecord:g,getInvite:f,getState:e,getStorageProfile:r,listAppSyncBadges:w,markJoinedApp:d,markRemoteAppDeleted:y,rememberAppRoomVersions:T,rememberWorkspaceManifestVersion:a,removeLocalAppSync:m,replaceState:l}}function bk(t=localStorage,e=_k){return{async load(){const n=t.getItem(e);return n?Ek(n):null},async save(n){t.setItem(e,JSON.stringify(n))}}}function Sk(){const t=new Date().toISOString();return{schemaVersion:hu,workspaceId:`workspace_${crypto.randomUUID()}`,storageProfile:null,manifestRoom:void 0,apps:{},deletedApps:{},updatedAt:t}}function Gp(t){return t?t.kind==="joined"&&t.remoteDeletedAt?{kind:"needs-attention",label:"Deleted by owner",tone:"attention"}:t.kind==="joined"?{kind:"shared-with-me",label:"Shared with me",tone:"shared"}:t.kind==="private-copy"?{kind:"private-copy",label:"Private copy",tone:"good"}:t.shareState==="invite-created"?{kind:"shared-by-me",label:"Shared by me",tone:"shared"}:{kind:"backed-up",label:"Private",tone:"neutral"}:{kind:"local-only",label:"Private",tone:"neutral"}}function mu(t){if(!t.storageProfile)throw new Error("Storage profile must be configured before apps can be backed up.");return t.storageProfile}function kk(t){if(!t.apiKey)throw new Error("Authenticated Firebase access requires the Firebase web app config with apiKey.")}function Yp(t,e){const n=mu(t);if(n.profileId!==e)throw new Error("App sync record belongs to a different storage profile.");return n}function Ai(t,e,n,r){return{schemaVersion:1,kind:"app-lab-invite",provider:{accessModel:n.accessModel??Vs,provider:n.provider,databaseUrl:n.databaseUrl,firebaseConfig:xk(n)},sourceRoom:t,dataRoom:e,createdAt:r}}function xk(t){if(!("firebaseConfig"in t)||!t.firebaseConfig)return;const n={databaseURL:_s(t.firebaseConfig.databaseURL||t.databaseUrl)};return t.firebaseConfig.apiKey&&(n.apiKey=t.firebaseConfig.apiKey),t.firebaseConfig.authDomain&&(n.authDomain=t.firebaseConfig.authDomain),n}function Ek(t){try{const e=JSON.parse(t);return e.schemaVersion!==hu||typeof e.workspaceId!="string"?null:{schemaVersion:hu,workspaceId:e.workspaceId,storageProfile:Ck(e.storageProfile),manifestRoom:Rk(e.manifestRoom),apps:e.apps??{},deletedApps:e.deletedApps??{},updatedAt:typeof e.updatedAt=="string"?e.updatedAt:new Date().toISOString()}}catch{return null}}function Ik(t){return JSON.parse(JSON.stringify(t))}function Ck(t){var i;if(!t||typeof t!="object")return null;const e=t;if(typeof e.profileId!="string"||e.provider!=="firebase-rtdb"||typeof e.displayName!="string"||typeof e.databaseUrl!="string"||typeof e.createdAt!="string"||typeof e.updatedAt!="string")return null;const n=_s(e.databaseUrl);return{accessModel:e.accessModel==="auth-v1"?"auth-v1":Vs,profileId:e.profileId,provider:e.provider,displayName:e.displayName,databaseUrl:n,firebaseConfig:(i=e.firebaseConfig)!=null&&i.databaseURL?{...e.firebaseConfig,databaseURL:_s(e.firebaseConfig.databaseURL)}:{databaseURL:n},ownerSetupSecret:typeof e.ownerSetupSecret=="string"?e.ownerSetupSecret:void 0,createdAt:e.createdAt,updatedAt:e.updatedAt}}function Rk(t){if(!t||typeof t!="object")return;const e=t,n=typeof e.readToken=="string"?e.readToken:void 0,r=typeof e.writeToken=="string"?e.writeToken:void 0,i=typeof e.accessToken=="string"?e.accessToken:r??n;if(!(typeof e.roomId!="string"||typeof e.decryptSecret!="string"||typeof i!="string"||typeof n!="string"||typeof r!="string"||typeof e.lastSeenVersion!="number"))return{roomId:e.roomId,decryptSecret:e.decryptSecret,accessToken:i,readToken:n,writeToken:r,lastSeenVersion:e.lastSeenVersion}}const va="applab-invite=";function Tk(t){return`${va}${jk(JSON.stringify(Ok(t)))}`}function Ak(t){const e=t.trim().replace(/^#/,""),n=e.startsWith(va)?e.slice(va.length):e;let r;try{r=JSON.parse(Fk(n))}catch{try{r=JSON.parse(atob(decodeURIComponent(n)))}catch{throw new Error("App invite is not valid.")}}return Pk(r)}function Nk(t){const e=t.trim().replace(/^#/,"");return e.startsWith(va)?Ak(e):null}function Pk(t){var r;if(Mk(t))return Dk(t);if(!t||typeof t!="object")throw new Error("App invite is malformed.");const e=t;if(e.kind!=="app-lab-invite"||e.schemaVersion!==1||!e.provider||e.provider.provider!=="firebase-rtdb"||typeof e.provider.databaseUrl!="string"||!((r=e.provider.firebaseConfig)!=null&&r.databaseURL)||typeof e.provider.firebaseConfig.apiKey!="string"||!e.sourceRoom||!e.dataRoom||typeof e.createdAt!="string")throw new Error("App invite is unsupported.");const n=e.provider;return{...e,provider:{...n,accessModel:"auth-v1"}}}function Ok(t){var n,r;const e=(n=t.provider.firebaseConfig)==null?void 0:n.apiKey;if(!e)throw new Error("App invite is missing Firebase apiKey.");return{v:2,p:{m:"a",u:t.provider.databaseUrl,k:e,d:(r=t.provider.firebaseConfig)==null?void 0:r.authDomain},r:Qp(t.dataRoom),s:Qp(t.sourceRoom)}}function Dk(t){const e={databaseURL:t.p.u};return t.p.k&&(e.apiKey=t.p.k),t.p.d&&(e.authDomain=t.p.d),{createdAt:new Date().toISOString(),dataRoom:Jp(t.r),kind:"app-lab-invite",provider:{accessModel:"auth-v1",databaseUrl:t.p.u,firebaseConfig:e,provider:"firebase-rtdb"},schemaVersion:1,sourceRoom:Jp(t.s)}}function Qp(t){const e=t.readToken??t.accessToken,n=t.writeToken??t.accessToken;return e===n?[t.roomId,t.decryptSecret,e]:[t.roomId,t.decryptSecret,e,n]}function Jp(t){const[e,n,r,i]=t,s=i??r;return{accessToken:s,decryptSecret:n,lastSeenVersion:0,readToken:r,roomId:e,writeToken:s}}function Mk(t){if(!t||typeof t!="object")return!1;const e=t;return e.v===2&&Lk(e.p)&&Xp(e.s)&&Xp(e.r)}function Lk(t){if(!t||typeof t!="object")return!1;const e=t;return typeof e.u=="string"&&(!e.m||e.m==="a")&&typeof e.k=="string"&&(!e.d||typeof e.d=="string")}function Xp(t){return Array.isArray(t)&&(t.length===3||t.length===4)&&t.every(e=>typeof e=="string")}function jk(t){return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function Fk(t){const e=t.replace(/-/g,"+").replace(/_/g,"/"),n=e.padEnd(Math.ceil(e.length/4)*4,"=");return atob(n)}const zy=`(() => {
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
`,Uk=`  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });`,Wy=zy.replace(Uk,"  window.Alpine = src_default;");if(Wy===zy)throw new Error("Could not remove Alpine auto-start from sandbox runtime.");function Vk(t){return["default-src 'none'",t==="alpine"?"script-src 'unsafe-inline' 'unsafe-eval'":"script-src 'unsafe-inline'","style-src 'unsafe-inline'","img-src data: blob:","font-src data:","connect-src 'none'","media-src data: blob:","object-src 'none'","frame-src 'none'","worker-src 'none'","form-action 'none'","base-uri 'none'"].join("; ")}function $k(t,e,n,r={}){var v;const i=r.runtimeMode??"alpine",s=new DOMParser().parseFromString(t,"text/html");for(const w of s.querySelectorAll("meta[http-equiv]"))((v=w.getAttribute("http-equiv"))==null?void 0:v.toLowerCase())==="content-security-policy"&&w.remove();const o=s.createElement("meta");o.setAttribute("http-equiv","Content-Security-Policy"),o.setAttribute("content",Vk(i));const a=s.createElement("style");a.dataset.appLabRuntime="compiled-css",a.textContent=n??"";const l=s.createElement("script");l.textContent=`Object.defineProperty(window, "__APP_LAB_CAPABILITY__", {
  value: ${JSON.stringify(e)},
  configurable: false,
  enumerable: false,
  writable: false
});`;const c=s.createElement("script");c.textContent=`(function () {
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
})();`;const d=[];if(i==="alpine"){const w=s.createElement("script");w.dataset.appLabRuntime="alpine",w.textContent=Wy,d.push(w)}const u=s.createElement("script");u.textContent=`(function () {
  const appLabCapability = window.__APP_LAB_CAPABILITY__;
  function notifyHost() {
    window.parent.postMessage({ type: "APP_LAB_UNLOADING", appLabCapability }, "*");
  }
  window.addEventListener("pagehide", notifyHost);
  window.addEventListener("beforeunload", notifyHost);
})();`;const f=s.createElement("script");f.dataset.appLabRuntime="alpine-start",f.textContent=`queueMicrotask(() => {
  if (window.Alpine && !window.__APP_LAB_ALPINE_STARTED__) {
    Object.defineProperty(window, "__APP_LAB_ALPINE_STARTED__", {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false
    });
    window.Alpine.start();
  }
});`;const g=n?[o,a,l,c,...d,u]:[o,l,c,...d,u];return s.head.prepend(...g),i==="alpine"&&s.body.append(f),`<!doctype html>
${s.documentElement.outerHTML}`}function zk({app:t,getAppData:e,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:i=0,remoteDataChange:s,saveAppData:o}){const a=R.useRef(null),l=R.useRef(null),c=R.useRef(!1),d=R.useRef(null),u=R.useRef(null),f=R.useRef(null),[g,v]=R.useState(0),w=R.useMemo(()=>{const _=crypto.randomUUID();return{capability:_,html:$k(t.sourceCode,_,t.compiledCss)}},[t.appId,t.compiledCss,t.sourceCode,t.updatedAt,i,g]);R.useLayoutEffect(()=>{l.current={appId:t.appId,capability:w.capability},c.current=!1,d.current=w.capability,u.current=null,T()},[t.appId,w.capability]),R.useEffect(()=>()=>T(),[]),R.useEffect(()=>{async function _(k){var ue;if(k.source!==((ue=a.current)==null?void 0:ue.contentWindow)||!k.data||typeof k.data!="object")return;const A=l.current;if(!A||k.data.appLabCapability!==A.capability)return;const{type:U,requestId:L,payload:ee}=k.data;if(U==="APP_LAB_UNLOADING"){E(A.capability);return}if(U==="APP_LAB_CONSOLE"){const Te=Wk(ee);Te&&n(Te);return}if(U==="APP_LAB_DATA_HANDLER_STATUS"){c.current=!!(ee!=null&&ee.registered),c.current&&y();return}if(U==="GET_MY_DATA"){const Te=await e(A.appId);if(!b(A))return;x({type:"MY_DATA",requestId:L,payload:{data:Te}});return}if(U==="SAVE_MY_DATA")try{if(await o(A.appId,(ee==null?void 0:ee.data)??null),!b(A))return;x({type:"MY_DATA_SAVED",requestId:L,payload:{ok:!0}})}catch(Te){if(!b(A))return;x({type:"MY_DATA_SAVE_FAILED",requestId:L,payload:{ok:!1,error:Te instanceof Error?Te.message:"Could not save app data."}})}}function b(k){const A=l.current;return(A==null?void 0:A.appId)===k.appId&&A.capability===k.capability}function E(k){var A;((A=l.current)==null?void 0:A.capability)===k&&(l.current=null),d.current===k&&(d.current=null)}function x(k){var A,U;(U=(A=a.current)==null?void 0:A.contentWindow)==null||U.postMessage(k,"*")}return window.addEventListener("message",_),()=>window.removeEventListener("message",_)},[e,n,o]),R.useEffect(()=>{if(!s)return;const _=l.current;if(!(!_||_.appId!==t.appId)){if(!c.current){u.current=s,T(),f.current=window.setTimeout(()=>{var b;((b=u.current)==null?void 0:b.id)!==s.id||c.current||(u.current=null,r==null||r())},500);return}m(s)}},[t.appId,r,s]);function T(){f.current!=null&&(window.clearTimeout(f.current),f.current=null)}function y(){const _=u.current;_&&(u.current=null,T(),m(_))}function m(_){var b,E;(E=(b=a.current)==null?void 0:b.contentWindow)==null||E.postMessage({type:"APP_LAB_DATA_CHANGED",payload:{data:_.data,info:{source:"remote",version:_.version}}},"*")}function h(){if(d.current===w.capability){d.current=null;return}l.current=null,d.current=null,v(_=>_+1)}return p.jsx("iframe",{ref:a,className:"block h-[calc(100dvh-44px-44px)] w-full border-0 bg-app-surface lg:h-[calc(100dvh-44px)]",title:`${t.name} app`,sandbox:"allow-scripts","data-app-lab-capability":w.capability,referrerPolicy:"no-referrer",onLoad:h,srcDoc:w.html})}function Wk(t){if(!t||typeof t!="object")return null;const e=t,n=typeof e.level=="string"&&Bk(e.level)?e.level:"log",r=Array.isArray(e.args)?e.args.map(s=>String(s)).slice(0,20):[],i=typeof e.timestamp=="string"?e.timestamp:new Date().toISOString();return{id:crypto.randomUUID(),level:n,args:r,timestamp:i}}function Bk(t){return t==="debug"||t==="error"||t==="info"||t==="log"||t==="warn"}const Hk="modulepreload",Kk=function(t){return"/app-lab/"+t},Zp={},qk=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(l=>{if(l=Kk(l),l in Zp)return;Zp[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Hk,c||(u.as="script"),u.crossOrigin="",u.href=l,a&&u.setAttribute("nonce",a),document.head.appendChild(u),c)return new Promise((f,g)=>{u.addEventListener("load",f),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Gk='meta[name="app-lab-tailwind"][content="enabled"]',Yk='style[type="text/tailwindcss"]',Qk=5e3,Jk=8e3,tc=new Map;let eh=null;async function th(t){const e=await px(t);if(!Xk(t))return{compiledCss:void 0,compiledCssSourceHash:void 0};const n=tc.get(e);if(n)return n;const r=ux(Zk(t,e),Jk,"Tailwind CSS compilation timed out.").catch(i=>{throw tc.delete(e),i});return tc.set(e,r),r}function Xk(t){const e=new DOMParser().parseFromString(t,"text/html");return!!(e.querySelector(Gk)||e.documentElement.hasAttribute("data-app-lab-tailwind")||e.body.hasAttribute("data-app-lab-tailwind"))}async function Zk(t,e){const n=ax(t),r=nx(t),i=tx(t),s=await ex(),o=document.createElement("iframe");o.setAttribute("aria-hidden","true"),o.tabIndex=-1,o.style.cssText="position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;border:0;visibility:hidden;";try{return o.srcdoc=ox(n,r,i,s),document.body.appendChild(o),{compiledCss:await lx(o),compiledCssSourceHash:e}}finally{o.remove()}}async function ex(){return eh??(eh=qk(()=>import("./index.global-XoZzS87n.js"),[]).then(t=>t.default)),eh}function tx(t){return[...new DOMParser().parseFromString(t,"text/html").querySelectorAll(Yk)].map(n=>n.textContent??"").join(`
`)}function nx(t){const e=new Set;return rx(t,e),[...e].sort()}function rx(t,e){for(const n of t.matchAll(/["'`]([^"'`<>]*[-:/[\]().#%][^"'`<>]*)["'`]/g))for(const r of n[1].split(/\s+/)){const i=r.trim().replace(/,$/,"");ix(i)&&e.add(i)}}function ix(t){return sx(t)?/[-:/[\]().#%]/.test(t):!1}function sx(t){return!(!t||t.length>160||/[\s<>{};]/.test(t)||t.startsWith("http:")||t.startsWith("https:")||t.startsWith("data:")||t.startsWith("--"))}function ox(t,e,n,r){const i=e.map(o=>`<div class="${dx(o)}"></div>`).join(""),s=n.trim()?n:"";return`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style type="text/tailwindcss">${fx(s)}</style>
  </head>
  <body>
    ${t}
    ${i}
    <script>${r.replaceAll("<\/script","<\\/script")}<\/script>
  </body>
</html>`}function ax(t){const e=new DOMParser().parseFromString(t,"text/html"),n=e.body.cloneNode(!0);nh(n);const r=e.createElement("div");r.hidden=!0,r.dataset.appLabCompilerTemplates="";for(const i of n.querySelectorAll("template")){const s=i.content.cloneNode(!0);nh(s),r.append(s)}return n.append(r),n.innerHTML}function nh(t){for(const n of[...t.querySelectorAll("script, iframe, object, embed, link, meta, base, style")])n.remove();const e=[];t instanceof Element&&e.push(t),e.push(...t.querySelectorAll("*"));for(const n of e)for(const r of[...n.attributes])r.name!=="class"&&n.removeAttribute(r.name)}async function lx(t){const e=performance.now();for(;performance.now()-e<Qk;){const n=t.contentDocument,r=n?[...n.head.querySelectorAll("style")].filter(i=>i.getAttribute("type")!=="text/tailwindcss").map(i=>{var s;return((s=i.textContent)==null?void 0:s.trim())??""}).filter(Boolean):[];if(r.length>0)return r.join(`
`);await cx(25)}throw new Error("Tailwind CSS compilation timed out.")}function cx(t){return new Promise(e=>window.setTimeout(e,t))}function ux(t,e,n){return new Promise((r,i)=>{const s=window.setTimeout(()=>i(new Error(n)),e);t.then(o=>{window.clearTimeout(s),r(o)},o=>{window.clearTimeout(s),i(o)})})}function dx(t){return t.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function fx(t){return t.replaceAll("</style","<\\/style")}async function px(t){const e=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(r=>r.toString(16).padStart(2,"0")).join("")}class By extends Error{constructor(e,n){super("Remote app was deleted by its owner."),this.appId=e,this.deletedAt=n}}async function hx(t){const e={app:{appId:t.app.appId,compiledCss:t.app.compiledCss,compiledCssSourceHash:t.app.compiledCssSourceHash,createdAt:t.app.createdAt,description:t.app.description,name:t.app.name,sourceCode:t.app.sourceCode,updatedAt:t.app.updatedAt},schemaVersion:1};await _a({capability:t.syncRecord.sourceRoom,data:e,provider:t.provider,roomType:"app-package"}),await _a({capability:t.syncRecord.dataRoom,data:t.appData,provider:t.provider,roomType:"app-data"})}async function Hy(t){const e={app:{appId:t.app.appId,compiledCss:t.app.compiledCss,compiledCssSourceHash:t.app.compiledCssSourceHash,createdAt:t.app.createdAt,description:t.app.description,name:t.app.name,sourceCode:t.app.sourceCode,updatedAt:t.app.updatedAt},schemaVersion:1};return Ud({capability:t.syncRecord.sourceRoom,data:e,provider:t.provider,recreateIfMissing:t.syncRecord.kind!=="joined",roomType:"app-package"})}async function gu(t){return Ud({capability:t.syncRecord.dataRoom,data:t.appData,provider:t.provider,recreateIfMissing:t.syncRecord.kind!=="joined",roomType:"app-data"})}async function Ky(t){const e=await t.provider.loadRoom({readToken:je(t.syncRecord.sourceRoom),roomId:t.syncRecord.sourceRoom.roomId}),n=await Us({capability:t.syncRecord.sourceRoom,roomType:"app-package",snapshot:e});return{app:yx(n),sourceRoom:br(t.syncRecord.sourceRoom,e)}}async function $o(t){const e=await Ky(t),n=await t.provider.loadRoom({readToken:je(t.syncRecord.dataRoom),roomId:t.syncRecord.dataRoom.roomId}),r=await Us({capability:t.syncRecord.dataRoom,roomType:"app-data",snapshot:n});return{app:e.app,appData:r,dataRoom:br(t.syncRecord.dataRoom,n),sourceRoom:e.sourceRoom}}async function mx(t){t.app?await gx({app:t.app,provider:t.sourceProvider,syncRecord:t.syncRecord}):await rh(t.sourceProvider,t.syncRecord.sourceRoom),await rh(t.dataProvider,t.syncRecord.dataRoom)}async function gx(t){const e={appId:t.app.appId,deleted:!0,deletedAt:new Date().toISOString(),name:t.app.name,schemaVersion:1};return Ud({capability:t.syncRecord.sourceRoom,data:e,provider:t.provider,recreateIfMissing:!0,roomType:"app-package"})}async function _a(t){const e=await Fd({data:t.data,decryptSecret:t.capability.decryptSecret,roomId:t.capability.roomId,roomType:t.roomType,roomVersion:1});try{await t.provider.createRoom({encryptedPayload:e,readToken:je(t.capability),roomId:t.capability.roomId,writeToken:$n(t.capability)})}catch(n){if(!vx(n))throw n;await t.provider.loadRoom({readToken:je(t.capability),roomId:t.capability.roomId})}}async function rh(t,e){try{await t.deleteRoom({roomId:e.roomId,writeToken:$n(e)})}catch(n){if(!yu(n))throw n}}async function Ud(t){let e=t.capability.lastSeenVersion;if(e===0)try{e=(await t.provider.loadRoom({readToken:je(t.capability),roomId:t.capability.roomId})).version}catch(i){if(!yu(i))throw i;await _a(t);const s=await t.provider.loadRoom({readToken:je(t.capability),roomId:t.capability.roomId});return ih(t.capability,s)}const n=await Fd({data:t.data,decryptSecret:t.capability.decryptSecret,roomId:t.capability.roomId,roomType:t.roomType,roomVersion:e+1});let r;try{r=await t.provider.saveRoom({encryptedPayload:n,expectedVersion:e,roomId:t.capability.roomId,writeToken:$n(t.capability)})}catch(i){if(!t.recreateIfMissing||!yu(i))throw i;return await _a(t),r=await t.provider.loadRoom({readToken:je(t.capability),roomId:t.capability.roomId}),ih(t.capability,r)}return br(t.capability,r)}function ih(t,e){return{...t,lastSeenVersion:e.version}}function yx(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("App package payload is malformed.");const e=t;if(e.deleted===!0)throw new By(typeof e.appId=="string"?e.appId:"unknown",typeof e.deletedAt=="string"?e.deletedAt:new Date().toISOString());const n=e.app;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("App package is missing app metadata.");const r=n;if(typeof r.appId!="string"||typeof r.description!="string"||typeof r.name!="string"||typeof r.sourceCode!="string"||typeof r.updatedAt!="string")throw new Error("App package app metadata is unsupported.");return{appId:r.appId,compiledCss:typeof r.compiledCss=="string"?r.compiledCss:void 0,compiledCssSourceHash:typeof r.compiledCssSourceHash=="string"?r.compiledCssSourceHash:void 0,createdAt:typeof r.createdAt=="string"?r.createdAt:r.updatedAt,description:r.description,name:r.name,sourceCode:r.sourceCode,updatedAt:r.updatedAt}}function vx(t){return t instanceof Error&&/already exists/i.test(t.message)}function yu(t){return t instanceof Error&&/(not found|found missing)/i.test(t.message)}function sh(t){return t instanceof By}async function _x(t){const e=await t.queueStore.listItems();for(const n of e)n.kind==="save-app-data"&&(n.status==="syncing"&&!Fs(n)||await wx(t,n))}async function wx(t,e){const n=await Ls(t.queueStore,e);try{const r=await t.syncRegistry.getAppSyncRecord(e.appId);if(!r){await t.queueStore.removeItem(e.id);return}const i=await t.createProviderForSyncRecord(r);if(!i)throw new Error("Storage profile is required before app data can sync.");const s=await bx({item:e,provider:i,syncRecord:r});await t.syncRegistry.rememberAppRoomVersions({appId:e.appId,dataRoom:s}),await Ly(t.queueStore,n)}catch(r){await js(t.queueStore,n,r)}}async function bx(t){try{return await gu({appData:t.item.localData,provider:t.provider,syncRecord:t.syncRecord})}catch(e){if(!kx(e))throw e;const n=await Sx(t.provider,t.syncRecord.dataRoom);return gu({appData:t.item.localData,provider:t.provider,syncRecord:{...t.syncRecord,dataRoom:n}})}}async function Sx(t,e){const n=await t.loadRoom({readToken:je(e),roomId:e.roomId});return{...e,lastSeenVersion:n.version}}function kx(t){return t instanceof Error&&/version conflict/i.test(t.message)}var oh={};/**
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
 */const qy={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const C=function(t,e){if(!t)throw hi(e)},hi=function(t){return new Error("Firebase Database ("+qy.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Gy=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},xx=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Vd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,d=s>>2,u=(s&3)<<4|a>>4;let f=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(f=64)),r.push(n[d],n[u],n[f],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Gy(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):xx(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const u=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||c==null||u==null)throw new Ex;const f=s<<2|a>>4;if(r.push(f),c!==64){const g=a<<4&240|c>>2;if(r.push(g),u!==64){const v=c<<6&192|u;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ex extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yy=function(t){const e=Gy(t);return Vd.encodeByteArray(e,!0)},wa=function(t){return Yy(t).replace(/\./g,"")},ba=function(t){try{return Vd.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ix(t){return Qy(void 0,t)}function Qy(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Cx(n)||(t[n]=Qy(t[n],e[n]));return t}function Cx(t){return t!=="__proto__"}/**
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
 */function Rx(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Tx=()=>Rx().__FIREBASE_DEFAULTS__,Ax=()=>{if(typeof process>"u"||typeof oh>"u")return;const t=oh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Nx=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ba(t[1]);return e&&JSON.parse(e)},$d=()=>{try{return Tx()||Ax()||Nx()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Jy=t=>{var e,n;return(n=(e=$d())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Px=t=>{const e=Jy(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Xy=()=>{var t;return(t=$d())===null||t===void 0?void 0:t.config},Zy=t=>{var e;return(e=$d())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class $s{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Ox(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[wa(JSON.stringify(n)),wa(JSON.stringify(o)),""].join(".")}/**
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
 */function qe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function zd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(qe())}function Dx(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Mx(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ev(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lx(){const t=qe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function jx(){return qy.NODE_ADMIN===!0}function Fx(){try{return typeof indexedDB=="object"}catch{return!1}}function Ux(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
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
 */const Vx="FirebaseError";class Yn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Vx,Object.setPrototypeOf(this,Yn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zs.prototype.create)}}class zs{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?$x(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Yn(i,a,r)}}function $x(t,e){return t.replace(zx,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const zx=/\{\$([^}]+)}/g;/**
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
 */function ws(t){return JSON.parse(t)}function Ie(t){return JSON.stringify(t)}/**
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
 */const tv=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=ws(ba(s[0])||""),n=ws(ba(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},Wx=function(t){const e=tv(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Bx=function(t){const e=tv(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Ot(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function pr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function vu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Sa(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function ka(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(ah(s)&&ah(o)){if(!ka(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ah(t){return t!==null&&typeof t=="object"}/**
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
 */function mi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
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
 */class Hx{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)r[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)r[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const f=r[u-3]^r[u-8]^r[u-14]^r[u-16];r[u]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^s&(o^a),d=1518500249):(c=s^o^a,d=1859775393):u<60?(c=s&o|a&(s|o),d=2400959708):(c=s^o^a,d=3395469782);const f=(i<<5|i>>>27)+c+l+d+r[u]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function Kx(t,e){const n=new qx(t,e);return n.subscribe.bind(n)}class qx{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Gx(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=nc),i.error===void 0&&(i.error=nc),i.complete===void 0&&(i.complete=nc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Gx(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function nc(){}function Wd(t,e){return`${t} failed: ${e} argument `}/**
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
 */const Yx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,C(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},il=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function ut(t){return t&&t._delegate?t._delegate:t}class hr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Xn="[DEFAULT]";/**
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
 */class Qx{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new $s;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xx(e))try{this.getOrInitializeService({instanceIdentifier:Xn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xn){return this.instances.has(e)}getOptions(e=Xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Jx(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xn){return this.component?this.component.multipleInstances?e:Xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jx(t){return t===Xn?void 0:t}function Xx(t){return t.instantiationMode==="EAGER"}/**
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
 */class Zx{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Qx(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const eE={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},tE=se.INFO,nE={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},rE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=nE[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bd{constructor(e){this.name=e,this._logLevel=tE,this._logHandler=rE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const iE=(t,e)=>e.some(n=>t instanceof n);let lh,ch;function sE(){return lh||(lh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oE(){return ch||(ch=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nv=new WeakMap,_u=new WeakMap,rv=new WeakMap,rc=new WeakMap,Hd=new WeakMap;function aE(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(On(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&nv.set(n,t)}).catch(()=>{}),Hd.set(e,t),e}function lE(t){if(_u.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});_u.set(t,e)}let wu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _u.get(t);if(e==="objectStoreNames")return t.objectStoreNames||rv.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return On(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function cE(t){wu=t(wu)}function uE(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ic(this),e,...n);return rv.set(r,e.sort?e.sort():[e]),On(r)}:oE().includes(t)?function(...e){return t.apply(ic(this),e),On(nv.get(this))}:function(...e){return On(t.apply(ic(this),e))}}function dE(t){return typeof t=="function"?uE(t):(t instanceof IDBTransaction&&lE(t),iE(t,sE())?new Proxy(t,wu):t)}function On(t){if(t instanceof IDBRequest)return aE(t);if(rc.has(t))return rc.get(t);const e=dE(t);return e!==t&&(rc.set(t,e),Hd.set(e,t)),e}const ic=t=>Hd.get(t);function fE(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=On(o);return r&&o.addEventListener("upgradeneeded",l=>{r(On(o.result),l.oldVersion,l.newVersion,On(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const pE=["get","getKey","getAll","getAllKeys","count"],hE=["put","add","delete","clear"],sc=new Map;function uh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(sc.get(e))return sc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=hE.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||pE.includes(n)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return sc.set(e,s),s}cE(t=>({...t,get:(e,n,r)=>uh(e,n)||t.get(e,n,r),has:(e,n)=>!!uh(e,n)||t.has(e,n)}));/**
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
 */class mE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gE(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gE(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const bu="@firebase/app",dh="0.10.13";/**
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
 */const an=new Bd("@firebase/app"),yE="@firebase/app-compat",vE="@firebase/analytics-compat",_E="@firebase/analytics",wE="@firebase/app-check-compat",bE="@firebase/app-check",SE="@firebase/auth",kE="@firebase/auth-compat",xE="@firebase/database",EE="@firebase/data-connect",IE="@firebase/database-compat",CE="@firebase/functions",RE="@firebase/functions-compat",TE="@firebase/installations",AE="@firebase/installations-compat",NE="@firebase/messaging",PE="@firebase/messaging-compat",OE="@firebase/performance",DE="@firebase/performance-compat",ME="@firebase/remote-config",LE="@firebase/remote-config-compat",jE="@firebase/storage",FE="@firebase/storage-compat",UE="@firebase/firestore",VE="@firebase/vertexai-preview",$E="@firebase/firestore-compat",zE="firebase",WE="10.14.1";/**
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
 */const Su="[DEFAULT]",BE={[bu]:"fire-core",[yE]:"fire-core-compat",[_E]:"fire-analytics",[vE]:"fire-analytics-compat",[bE]:"fire-app-check",[wE]:"fire-app-check-compat",[SE]:"fire-auth",[kE]:"fire-auth-compat",[xE]:"fire-rtdb",[EE]:"fire-data-connect",[IE]:"fire-rtdb-compat",[CE]:"fire-fn",[RE]:"fire-fn-compat",[TE]:"fire-iid",[AE]:"fire-iid-compat",[NE]:"fire-fcm",[PE]:"fire-fcm-compat",[OE]:"fire-perf",[DE]:"fire-perf-compat",[ME]:"fire-rc",[LE]:"fire-rc-compat",[jE]:"fire-gcs",[FE]:"fire-gcs-compat",[UE]:"fire-fst",[$E]:"fire-fst-compat",[VE]:"fire-vertex","fire-js":"fire-js",[zE]:"fire-js-all"};/**
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
 */const bs=new Map,HE=new Map,ku=new Map;function fh(t,e){try{t.container.addComponent(e)}catch(n){an.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function oi(t){const e=t.name;if(ku.has(e))return an.debug(`There were multiple attempts to register component ${e}.`),!1;ku.set(e,t);for(const n of bs.values())fh(n,t);for(const n of HE.values())fh(n,t);return!0}function Kd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Yt(t){return t.settings!==void 0}/**
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
 */const KE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dn=new zs("app","Firebase",KE);/**
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
 */class qE{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new hr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dn.create("app-deleted",{appName:this._name})}}/**
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
 */const gi=WE;function iv(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Su,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Dn.create("bad-app-name",{appName:String(i)});if(n||(n=Xy()),!n)throw Dn.create("no-options");const s=bs.get(i);if(s){if(ka(n,s.options)&&ka(r,s.config))return s;throw Dn.create("duplicate-app",{appName:i})}const o=new Zx(i);for(const l of ku.values())o.addComponent(l);const a=new qE(n,r,o);return bs.set(i,a),a}function sv(t=Su){const e=bs.get(t);if(!e&&t===Su&&Xy())return iv();if(!e)throw Dn.create("no-app",{appName:t});return e}function GE(){return Array.from(bs.values())}function Mn(t,e,n){var r;let i=(r=BE[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),an.warn(a.join(" "));return}oi(new hr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const YE="firebase-heartbeat-database",QE=1,Ss="firebase-heartbeat-store";let oc=null;function ov(){return oc||(oc=fE(YE,QE,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ss)}catch(n){console.warn(n)}}}}).catch(t=>{throw Dn.create("idb-open",{originalErrorMessage:t.message})})),oc}async function JE(t){try{const n=(await ov()).transaction(Ss),r=await n.objectStore(Ss).get(av(t));return await n.done,r}catch(e){if(e instanceof Yn)an.warn(e.message);else{const n=Dn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});an.warn(n.message)}}}async function ph(t,e){try{const r=(await ov()).transaction(Ss,"readwrite");await r.objectStore(Ss).put(e,av(t)),await r.done}catch(n){if(n instanceof Yn)an.warn(n.message);else{const r=Dn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});an.warn(r.message)}}}function av(t){return`${t.name}!${t.options.appId}`}/**
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
 */const XE=1024,ZE=30*24*60*60*1e3;class e0{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new n0(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=hh();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=ZE}),this._storage.overwrite(this._heartbeatsCache))}catch(r){an.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=hh(),{heartbeatsToSend:r,unsentEntries:i}=t0(this._heartbeatsCache.heartbeats),s=wa(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return an.warn(n),""}}}function hh(){return new Date().toISOString().substring(0,10)}function t0(t,e=XE){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),mh(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),mh(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class n0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fx()?Ux().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await JE(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ph(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ph(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function mh(t){return wa(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function r0(t){oi(new hr("platform-logger",e=>new mE(e),"PRIVATE")),oi(new hr("heartbeat",e=>new e0(e),"PRIVATE")),Mn(bu,dh,t),Mn(bu,dh,"esm2017"),Mn("fire-js","")}r0("");var i0="firebase",s0="10.14.1";/**
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
 */Mn(i0,s0,"app");function qd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function lv(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const o0=lv,cv=new zs("auth","Firebase",lv());/**
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
 */const xa=new Bd("@firebase/auth");function a0(t,...e){xa.logLevel<=se.WARN&&xa.warn(`Auth (${gi}): ${t}`,...e)}function zo(t,...e){xa.logLevel<=se.ERROR&&xa.error(`Auth (${gi}): ${t}`,...e)}/**
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
 */function ln(t,...e){throw Gd(t,...e)}function Vt(t,...e){return Gd(t,...e)}function uv(t,e,n){const r=Object.assign(Object.assign({},o0()),{[e]:n});return new zs("auth","Firebase",r).create(e,{appName:t.name})}function Ln(t){return uv(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return cv.create(t,...e)}function B(t,e,...n){if(!t)throw Gd(e,...n)}function Qt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw zo(e),new Error(e)}function cn(t,e){t||Qt(e)}/**
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
 */function xu(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function l0(){return gh()==="http:"||gh()==="https:"}function gh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function c0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(l0()||Mx()||"connection"in navigator)?navigator.onLine:!0}function u0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Ws{constructor(e,n){this.shortDelay=e,this.longDelay=n,cn(n>e,"Short delay should be less than long delay!"),this.isMobile=zd()||ev()}get(){return c0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Yd(t,e){cn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class dv{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Qt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Qt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Qt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const d0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const f0=new Ws(3e4,6e4);function sl(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function yi(t,e,n,r,i={}){return fv(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=mi(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},s);return Dx()||(c.referrerPolicy="no-referrer"),dv.fetch()(hv(t,t.config.apiHost,n,a),c)})}async function fv(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},d0),e);try{const i=new p0(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ko(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ko(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ko(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw ko(t,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw uv(t,d,c);ln(t,d)}}catch(i){if(i instanceof Yn)throw i;ln(t,"network-request-failed",{message:String(i)})}}async function pv(t,e,n,r,i={}){const s=await yi(t,e,n,r,i);return"mfaPendingCredential"in s&&ln(t,"multi-factor-auth-required",{_serverResponse:s}),s}function hv(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Yd(t.config,i):`${t.config.apiScheme}://${i}`}class p0{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Vt(this.auth,"network-request-failed")),f0.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ko(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Vt(t,e,r);return i.customData._tokenResponse=n,i}/**
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
 */async function h0(t,e){return yi(t,"POST","/v1/accounts:delete",e)}async function mv(t,e){return yi(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Qi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function m0(t,e=!1){const n=ut(t),r=await n.getIdToken(e),i=Qd(r);B(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Qi(ac(i.auth_time)),issuedAtTime:Qi(ac(i.iat)),expirationTime:Qi(ac(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ac(t){return Number(t)*1e3}function Qd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return zo("JWT malformed, contained fewer than 3 sections"),null;try{const i=ba(n);return i?JSON.parse(i):(zo("Failed to decode base64 JWT payload"),null)}catch(i){return zo("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function yh(t){const e=Qd(t);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ks(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Yn&&g0(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function g0({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class y0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Eu{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qi(this.lastLoginAt),this.creationTime=Qi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ea(t){var e;const n=t.auth,r=await t.getIdToken(),i=await ks(t,mv(n,{idToken:r}));B(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?gv(s.providerUserInfo):[],a=_0(t.providerData,o),l=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Eu(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function v0(t){const e=ut(t);await Ea(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _0(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function gv(t){return t.map(e=>{var{providerId:n}=e,r=qd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function w0(t,e){const n=await fv(t,{},async()=>{const r=mi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=hv(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",dv.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function b0(t,e){return yi(t,"POST","/v2/accounts:revokeToken",sl(t,e))}/**
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
 */class Gr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):yh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){B(e.length!==0,"internal-error");const n=yh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await w0(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Gr;return r&&(B(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(B(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(B(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gr,this.toJSON())}_performRefresh(){return Qt("not implemented")}}/**
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
 */function pn(t,e){B(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Jt{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=qd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new y0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Eu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await ks(this,this.stsTokenManager.getToken(this.auth,e));return B(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return m0(this,e)}reload(){return v0(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Jt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ea(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Yt(this.auth.app))return Promise.reject(Ln(this.auth));const e=await this.getIdToken();return await ks(this,h0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,l,c,d;const u=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,g=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,v=(o=n.photoURL)!==null&&o!==void 0?o:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,T=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,y=(c=n.createdAt)!==null&&c!==void 0?c:void 0,m=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:h,emailVerified:_,isAnonymous:b,providerData:E,stsTokenManager:x}=n;B(h&&x,e,"internal-error");const k=Gr.fromJSON(this.name,x);B(typeof h=="string",e,"internal-error"),pn(u,e.name),pn(f,e.name),B(typeof _=="boolean",e,"internal-error"),B(typeof b=="boolean",e,"internal-error"),pn(g,e.name),pn(v,e.name),pn(w,e.name),pn(T,e.name),pn(y,e.name),pn(m,e.name);const A=new Jt({uid:h,auth:e,email:f,emailVerified:_,displayName:u,isAnonymous:b,photoURL:v,phoneNumber:g,tenantId:w,stsTokenManager:k,createdAt:y,lastLoginAt:m});return E&&Array.isArray(E)&&(A.providerData=E.map(U=>Object.assign({},U))),T&&(A._redirectEventId=T),A}static async _fromIdTokenResponse(e,n,r=!1){const i=new Gr;i.updateFromServerResponse(n);const s=new Jt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ea(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];B(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?gv(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Gr;a.updateFromIdToken(r);const l=new Jt({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Eu(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,c),l}}/**
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
 */const vh=new Map;function Xt(t){cn(t instanceof Function,"Expected a class definition");let e=vh.get(t);return e?(cn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,vh.set(t,e),e)}/**
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
 */class yv{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yv.type="NONE";const _h=yv;/**
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
 */function Wo(t,e,n){return`firebase:${t}:${e}:${n}`}class Yr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Wo(this.userKey,i.apiKey,s),this.fullPersistenceKey=Wo("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Jt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Yr(Xt(_h),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||Xt(_h);const o=Wo(r,e.config.apiKey,e.name);let a=null;for(const c of n)try{const d=await c._get(o);if(d){const u=Jt._fromJSON(e,d);c!==s&&(a=u),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Yr(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new Yr(s,e,r))}}/**
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
 */function wh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bv(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(vv(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(kv(e))return"Blackberry";if(xv(e))return"Webos";if(_v(e))return"Safari";if((e.includes("chrome/")||wv(e))&&!e.includes("edge/"))return"Chrome";if(Sv(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function vv(t=qe()){return/firefox\//i.test(t)}function _v(t=qe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wv(t=qe()){return/crios\//i.test(t)}function bv(t=qe()){return/iemobile/i.test(t)}function Sv(t=qe()){return/android/i.test(t)}function kv(t=qe()){return/blackberry/i.test(t)}function xv(t=qe()){return/webos/i.test(t)}function Jd(t=qe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function S0(t=qe()){var e;return Jd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function k0(){return Lx()&&document.documentMode===10}function Ev(t=qe()){return Jd(t)||Sv(t)||xv(t)||kv(t)||/windows phone/i.test(t)||bv(t)}/**
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
 */function Iv(t,e=[]){let n;switch(t){case"Browser":n=wh(qe());break;case"Worker":n=`${wh(qe())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${gi}/${r}`}/**
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
 */class x0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function E0(t,e={}){return yi(t,"GET","/v2/passwordPolicy",sl(t,e))}/**
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
 */const I0=6;class C0{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:I0,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class R0{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bh(this),this.idTokenSubscription=new bh(this),this.beforeStateQueue=new x0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=cv,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Xt(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Yr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await mv(this,{idToken:e}),r=await Jt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Yt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ea(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=u0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Yt(this.app))return Promise.reject(Ln(this));const n=e?ut(e):null;return n&&B(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Yt(this.app)?Promise.reject(Ln(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Yt(this.app)?Promise.reject(Ln(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await E0(this),n=new C0(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new zs("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await b0(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Xt(e)||this._popupRedirectResolver;B(n,this,"argument-error"),this.redirectPersistenceManager=await Yr.create(this,[Xt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Iv(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&a0(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ol(t){return ut(t)}class bh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Kx(n=>this.observer=n)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Xd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function T0(t){Xd=t}function A0(t){return Xd.loadJS(t)}function N0(){return Xd.gapiScript}function P0(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function O0(t,e){const n=Kd(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(ka(s,e??{}))return i;ln(i,"already-initialized")}return n.initialize({options:e})}function D0(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Xt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function M0(t,e,n){const r=ol(t);B(r._canInitEmulator,r,"emulator-config-failed"),B(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Cv(e),{host:o,port:a}=L0(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),j0()}function Cv(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function L0(t){const e=Cv(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Sh(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Sh(o)}}}function Sh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function j0(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Rv{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Qt("not implemented")}_getIdTokenResponse(e){return Qt("not implemented")}_linkToIdToken(e,n){return Qt("not implemented")}_getReauthenticationResolver(e){return Qt("not implemented")}}/**
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
 */async function Qr(t,e){return pv(t,"POST","/v1/accounts:signInWithIdp",sl(t,e))}/**
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
 */const F0="http://localhost";class mr extends Rv{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new mr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ln("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=qd(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new mr(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Qr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Qr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Qr(e,n)}buildRequest(){const e={requestUri:F0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=mi(n)}return e}}/**
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
 */class Tv{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Bs extends Tv{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class _n extends Bs{constructor(){super("facebook.com")}static credential(e){return mr._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _n.credential(e.oauthAccessToken)}catch{return null}}}_n.FACEBOOK_SIGN_IN_METHOD="facebook.com";_n.PROVIDER_ID="facebook.com";/**
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
 */class wn extends Bs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return mr._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return wn.credential(n,r)}catch{return null}}}wn.GOOGLE_SIGN_IN_METHOD="google.com";wn.PROVIDER_ID="google.com";/**
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
 */class bn extends Bs{constructor(){super("github.com")}static credential(e){return mr._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bn.credential(e.oauthAccessToken)}catch{return null}}}bn.GITHUB_SIGN_IN_METHOD="github.com";bn.PROVIDER_ID="github.com";/**
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
 */class Sn extends Bs{constructor(){super("twitter.com")}static credential(e,n){return mr._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Sn.credential(n,r)}catch{return null}}}Sn.TWITTER_SIGN_IN_METHOD="twitter.com";Sn.PROVIDER_ID="twitter.com";/**
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
 */async function U0(t,e){return pv(t,"POST","/v1/accounts:signUp",sl(t,e))}/**
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
 */class zn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Jt._fromIdTokenResponse(e,r,i),o=kh(r);return new zn({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=kh(r);return new zn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function kh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function V0(t){var e;if(Yt(t.app))return Promise.reject(Ln(t));const n=ol(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new zn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await U0(n,{returnSecureToken:!0}),i=await zn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
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
 */class Ia extends Yn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ia.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Ia(e,n,r,i)}}function Av(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ia._fromErrorAndOperation(t,s,e,r):s})}async function $0(t,e,n=!1){const r=await ks(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return zn._forOperation(t,"link",r)}/**
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
 */async function z0(t,e,n=!1){const{auth:r}=t;if(Yt(r.app))return Promise.reject(Ln(r));const i="reauthenticate";try{const s=await ks(t,Av(r,i,e,t),n);B(s.idToken,r,"internal-error");const o=Qd(s.idToken);B(o,r,"internal-error");const{sub:a}=o;return B(t.uid===a,r,"user-mismatch"),zn._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ln(r,"user-mismatch"),s}}/**
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
 */async function W0(t,e,n=!1){if(Yt(t.app))return Promise.reject(Ln(t));const r="signIn",i=await Av(t,r,e),s=await zn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function B0(t,e,n,r){return ut(t).onIdTokenChanged(e,n,r)}function H0(t,e,n){return ut(t).beforeAuthStateChanged(e,n)}const Ca="__sak";/**
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
 */class Nv{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ca,"1"),this.storage.removeItem(Ca),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const K0=1e3,q0=10;class Pv extends Nv{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ev(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);k0()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,q0):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},K0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pv.type="LOCAL";const G0=Pv;/**
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
 */class Ov extends Nv{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ov.type="SESSION";const Dv=Ov;/**
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
 */function Y0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class al{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new al(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(n.origin,s)),l=await Y0(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}al.receivers=[];/**
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
 */function Zd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Q0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const c=Zd("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(u){const f=u;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(f.data.response);break;default:clearTimeout(d),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function $t(){return window}function J0(t){$t().location.href=t}/**
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
 */function Mv(){return typeof $t().WorkerGlobalScope<"u"&&typeof $t().importScripts=="function"}async function X0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Z0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function eI(){return Mv()?self:null}/**
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
 */const Lv="firebaseLocalStorageDb",tI=1,Ra="firebaseLocalStorage",jv="fbase_key";class Hs{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ll(t,e){return t.transaction([Ra],e?"readwrite":"readonly").objectStore(Ra)}function nI(){const t=indexedDB.deleteDatabase(Lv);return new Hs(t).toPromise()}function Iu(){const t=indexedDB.open(Lv,tI);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ra,{keyPath:jv})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ra)?e(r):(r.close(),await nI(),e(await Iu()))})})}async function xh(t,e,n){const r=ll(t,!0).put({[jv]:e,value:n});return new Hs(r).toPromise()}async function rI(t,e){const n=ll(t,!1).get(e),r=await new Hs(n).toPromise();return r===void 0?null:r.value}function Eh(t,e){const n=ll(t,!0).delete(e);return new Hs(n).toPromise()}const iI=800,sI=3;class Fv{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Iu(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>sI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mv()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=al._getInstance(eI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await X0(),!this.activeServiceWorker)return;this.sender=new Q0(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Z0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Iu();return await xh(e,Ca,"1"),await Eh(e,Ca),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>xh(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>rI(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Eh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ll(i,!1).getAll();return new Hs(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Fv.type="LOCAL";const oI=Fv;new Ws(3e4,6e4);/**
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
 */function aI(t,e){return e?Xt(e):(B(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class ef extends Rv{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Qr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Qr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Qr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function lI(t){return W0(t.auth,new ef(t),t.bypassAuthState)}function cI(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),z0(n,new ef(t),t.bypassAuthState)}async function uI(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),$0(n,new ef(t),t.bypassAuthState)}/**
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
 */class Uv{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return lI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return cI;default:ln(this.auth,"internal-error")}}resolve(e){cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const dI=new Ws(2e3,1e4);class Vr extends Uv{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Vr.currentPopupAction&&Vr.currentPopupAction.cancel(),Vr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){cn(this.filter.length===1,"Popup operations only handle one event");const e=Zd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Vt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Vt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Vr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Vt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,dI.get())};e()}}Vr.currentPopupAction=null;/**
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
 */const fI="pendingRedirect",Bo=new Map;class pI extends Uv{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Bo.get(this.auth._key());if(!e){try{const r=await hI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Bo.set(this.auth._key(),e)}return this.bypassAuthState||Bo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hI(t,e){const n=yI(e),r=gI(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function mI(t,e){Bo.set(t._key(),e)}function gI(t){return Xt(t._redirectPersistence)}function yI(t){return Wo(fI,t.config.apiKey,t.name)}async function vI(t,e,n=!1){if(Yt(t.app))return Promise.reject(Ln(t));const r=ol(t),i=aI(r,e),o=await new pI(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const _I=10*60*1e3;class wI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Vv(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Vt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_I&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ih(e))}saveEventToCache(e){this.cachedEventUids.add(Ih(e)),this.lastProcessedEventTime=Date.now()}}function Ih(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Vv({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function bI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Vv(t);default:return!1}}/**
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
 */async function SI(t,e={}){return yi(t,"GET","/v1/projects",e)}/**
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
 */const kI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xI=/^https?/;async function EI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await SI(t);for(const n of e)try{if(II(n))return}catch{}ln(t,"unauthorized-domain")}function II(t){const e=xu(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!xI.test(n))return!1;if(kI.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const CI=new Ws(3e4,6e4);function Ch(){const t=$t().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function RI(t){return new Promise((e,n)=>{var r,i,s;function o(){Ch(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ch(),n(Vt(t,"network-request-failed"))},timeout:CI.get()})}if(!((i=(r=$t().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=$t().gapi)===null||s===void 0)&&s.load)o();else{const a=P0("iframefcb");return $t()[a]=()=>{gapi.load?o():n(Vt(t,"network-request-failed"))},A0(`${N0()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw Ho=null,e})}let Ho=null;function TI(t){return Ho=Ho||RI(t),Ho}/**
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
 */const AI=new Ws(5e3,15e3),NI="__/auth/iframe",PI="emulator/auth/iframe",OI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},DI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function MI(t){const e=t.config;B(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Yd(e,PI):`https://${t.config.authDomain}/${NI}`,r={apiKey:e.apiKey,appName:t.name,v:gi},i=DI.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${mi(r).slice(1)}`}async function LI(t){const e=await TI(t),n=$t().gapi;return B(n,t,"internal-error"),e.open({where:document.body,url:MI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:OI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Vt(t,"network-request-failed"),a=$t().setTimeout(()=>{s(o)},AI.get());function l(){$t().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const jI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FI=500,UI=600,VI="_blank",$I="http://localhost";class Rh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zI(t,e,n,r=FI,i=UI){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},jI),{width:r.toString(),height:i.toString(),top:s,left:o}),c=qe().toLowerCase();n&&(a=wv(c)?VI:n),vv(c)&&(e=e||$I,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[g,v])=>`${f}${g}=${v},`,"");if(S0(c)&&a!=="_self")return WI(e||"",a),new Rh(null);const u=window.open(e||"",a,d);B(u,t,"popup-blocked");try{u.focus()}catch{}return new Rh(u)}function WI(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const BI="__/auth/handler",HI="emulator/auth/handler",KI=encodeURIComponent("fac");async function Th(t,e,n,r,i,s){B(t.config.authDomain,t,"auth-domain-config-required"),B(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:gi,eventId:i};if(e instanceof Tv){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",vu(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof Bs){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await t._getAppCheckToken(),c=l?`#${KI}=${encodeURIComponent(l)}`:"";return`${qI(t)}?${mi(a).slice(1)}${c}`}function qI({config:t}){return t.emulator?Yd(t,HI):`https://${t.authDomain}/${BI}`}/**
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
 */const lc="webStorageSupport";class GI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Dv,this._completeRedirectFn=vI,this._overrideRedirectResult=mI}async _openPopup(e,n,r,i){var s;cn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Th(e,n,r,xu(),i);return zI(e,o,Zd())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Th(e,n,r,xu(),i);return J0(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(cn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await LI(e),r=new wI(e);return n.register("authEvent",i=>(B(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(lc,{type:lc},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[lc];o!==void 0&&n(!!o),ln(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=EI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ev()||_v()||Jd()}}const YI=GI;var Ah="@firebase/auth",Nh="1.7.9";/**
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
 */class QI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function JI(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function XI(t){oi(new hr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Iv(t)},c=new R0(r,i,s,l);return D0(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),oi(new hr("auth-internal",e=>{const n=ol(e.getProvider("auth").getImmediate());return(r=>new QI(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mn(Ah,Nh,JI(t)),Mn(Ah,Nh,"esm2017")}/**
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
 */const ZI=5*60,eC=Zy("authIdTokenMaxAge")||ZI;let Ph=null;const tC=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>eC)return;const i=n==null?void 0:n.token;Ph!==i&&(Ph=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nC(t=sv()){const e=Kd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=O0(t,{popupRedirectResolver:YI,persistence:[oI,G0,Dv]}),r=Zy("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=tC(s.toString());H0(n,o,()=>o(n.currentUser)),B0(n,a=>o(a))}}const i=Jy("auth");return i&&M0(n,`http://${i}`),n}function rC(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}T0({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Vt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",rC().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});XI("Browser");var Oh={};const Dh="@firebase/database",Mh="1.0.8";/**
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
 */let $v="";function iC(t){$v=t}/**
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
 */class sC{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ie(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:ws(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class oC{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ot(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const zv=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new sC(e)}}catch{}return new oC},rr=zv("localStorage"),aC=zv("sessionStorage");/**
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
 */const Jr=new Bd("@firebase/database"),Wv=function(){let t=1;return function(){return t++}}(),Bv=function(t){const e=Yx(t),n=new Hx;n.update(e);const r=n.digest();return Vd.encodeByteArray(r)},Ks=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Ks.apply(null,r):typeof r=="object"?e+=Ie(r):e+=r,e+=" "}return e};let Ji=null,Lh=!0;const lC=function(t,e){C(!0,"Can't turn on custom loggers persistently."),Jr.logLevel=se.VERBOSE,Ji=Jr.log.bind(Jr)},ze=function(...t){if(Lh===!0&&(Lh=!1,Ji===null&&aC.get("logging_enabled")===!0&&lC()),Ji){const e=Ks.apply(null,t);Ji(e)}},qs=function(t){return function(...e){ze(t,...e)}},Cu=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ks(...t);Jr.error(e)},un=function(...t){const e=`FIREBASE FATAL ERROR: ${Ks(...t)}`;throw Jr.error(e),new Error(e)},nt=function(...t){const e="FIREBASE WARNING: "+Ks(...t);Jr.warn(e)},cC=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&nt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},tf=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},uC=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ai="[MIN_NAME]",gr="[MAX_NAME]",vi=function(t,e){if(t===e)return 0;if(t===ai||e===gr)return-1;if(e===ai||t===gr)return 1;{const n=jh(t),r=jh(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},dC=function(t,e){return t===e?0:t<e?-1:1},Ni=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Ie(e))},nf=function(t){if(typeof t!="object"||t===null)return Ie(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Ie(e[r]),n+=":",n+=nf(t[e[r]]);return n+="}",n},Hv=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function rt(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Kv=function(t){C(!tf(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,a,l;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),u=u+f}return u.toLowerCase()},fC=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},pC=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function hC(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const mC=new RegExp("^-?(0*)\\d{1,10}$"),gC=-2147483648,yC=2147483647,jh=function(t){if(mC.test(t)){const e=Number(t);if(e>=gC&&e<=yC)return e}return null},_i=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw nt("Exception was thrown by user callback.",n),e},Math.floor(0))}},vC=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Xi=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class _C{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){nt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class wC{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ze("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',nt(e)}}class Ko{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ko.OWNER="owner";/**
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
 */const rf="5",qv="v",Gv="s",Yv="r",Qv="f",Jv=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Xv="ls",Zv="p",Ru="ac",e_="websocket",t_="long_polling";/**
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
 */class n_{constructor(e,n,r,i,s=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=rr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&rr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function bC(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function r_(t,e,n){C(typeof e=="string","typeof type must == string"),C(typeof n=="object","typeof params must == object");let r;if(e===e_)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===t_)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);bC(t)&&(n.ns=t.namespace);const i=[];return rt(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
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
 */class SC{constructor(){this.counters_={}}incrementCounter(e,n=1){Ot(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Ix(this.counters_)}}/**
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
 */const cc={},uc={};function sf(t){const e=t.toString();return cc[e]||(cc[e]=new SC),cc[e]}function kC(t,e){const n=t.toString();return uc[n]||(uc[n]=e()),uc[n]}/**
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
 */class xC{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&_i(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Fh="start",EC="close",IC="pLPCommand",CC="pRTLPCB",i_="id",s_="pw",o_="ser",RC="cb",TC="seg",AC="ts",NC="d",PC="dframe",a_=1870,l_=30,OC=a_-l_,DC=25e3,MC=3e4;class $r{constructor(e,n,r,i,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=qs(e),this.stats_=sf(n),this.urlFn=l=>(this.appCheckToken&&(l[Ru]=this.appCheckToken),r_(n,t_,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new xC(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(MC)),uC(()=>{if(this.isClosed_)return;this.scriptTagHolder=new of((...s)=>{const[o,a,l,c,d]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Fh)this.id=a,this.password=l;else if(o===EC)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Fh]="t",r[o_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[RC]=this.scriptTagHolder.uniqueCallbackIdentifier),r[qv]=rf,this.transportSessionId&&(r[Gv]=this.transportSessionId),this.lastSessionId&&(r[Xv]=this.lastSessionId),this.applicationId&&(r[Zv]=this.applicationId),this.appCheckToken&&(r[Ru]=this.appCheckToken),typeof location<"u"&&location.hostname&&Jv.test(location.hostname)&&(r[Yv]=Qv);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){$r.forceAllow_=!0}static forceDisallow(){$r.forceDisallow_=!0}static isAvailable(){return $r.forceAllow_?!0:!$r.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!fC()&&!pC()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Ie(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Yy(n),i=Hv(r,OC);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[PC]="t",r[i_]=e,r[s_]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Ie(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class of{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Wv(),window[IC+this.uniqueCallbackIdentifier]=e,window[CC+this.uniqueCallbackIdentifier]=n,this.myIFrame=of.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ze("frame writing exception"),a.stack&&ze(a.stack),ze(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ze("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[i_]=this.myID,e[s_]=this.myPW,e[o_]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+l_+r.length<=a_;){const o=this.pendingSegs.shift();r=r+"&"+TC+i+"="+o.seg+"&"+AC+i+"="+o.ts+"&"+NC+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(DC)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ze("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const LC=16384,jC=45e3;let Ta=null;typeof MozWebSocket<"u"?Ta=MozWebSocket:typeof WebSocket<"u"&&(Ta=WebSocket);class Et{constructor(e,n,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=qs(this.connId),this.stats_=sf(n),this.connURL=Et.connectionURL_(n,o,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[qv]=rf,typeof location<"u"&&location.hostname&&Jv.test(location.hostname)&&(o[Yv]=Qv),n&&(o[Gv]=n),r&&(o[Xv]=r),i&&(o[Ru]=i),s&&(o[Zv]=s),r_(e,e_,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,rr.set("previous_websocket_failure",!0);try{let r;jx(),this.mySock=new Ta(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Et.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Ta!==null&&!Et.forceDisallow_}static previouslyFailed(){return rr.isInMemoryStorage||rr.get("previous_websocket_failure")===!0}markConnectionHealthy(){rr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=ws(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(C(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Ie(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Hv(n,LC);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(jC))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Et.responsesRequiredToBeHealthy=2;Et.healthyTimeout=3e4;/**
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
 */class xs{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[$r,Et]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Et&&Et.isAvailable();let r=n&&!Et.previouslyFailed();if(e.webSocketOnly&&(n||nt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Et];else{const i=this.transports_=[];for(const s of xs.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);xs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xs.globalTransportInitialized_=!1;/**
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
 */const FC=6e4,UC=5e3,VC=10*1024,$C=100*1024,dc="t",Uh="d",zC="s",Vh="r",WC="e",$h="o",zh="a",Wh="n",Bh="p",BC="h";class HC{constructor(e,n,r,i,s,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=qs("c:"+this.id+":"),this.transportManager_=new xs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Xi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>$C?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>VC?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(dc in e){const n=e[dc];n===zh?this.upgradeIfSecondaryHealthy_():n===Vh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===$h&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ni("t",e),r=Ni("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Bh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:zh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Wh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ni("t",e),r=Ni("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ni(dc,e);if(Uh in e){const r=e[Uh];if(n===BC){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Wh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===zC?this.onConnectionShutdown_(r):n===Vh?this.onReset_(r):n===WC?Cu("Server Error: "+r):n===$h?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Cu("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),rf!==r&&nt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Xi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(FC))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Xi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(UC))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Bh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(rr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class c_{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class u_{constructor(e){this.allowedEvents_=e,this.listeners_={},C(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){C(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Aa extends u_{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!zd()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Aa}getInitialEvent(e){return C(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Hh=32,Kh=768;class ae{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function te(){return new ae("")}function q(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Wn(t){return t.pieces_.length-t.pieceNum_}function le(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ae(t.pieces_,e)}function d_(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function KC(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function f_(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function p_(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ae(e,0)}function Ce(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof ae)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new ae(n,0)}function Y(t){return t.pieceNum_>=t.pieces_.length}function He(t,e){const n=q(t),r=q(e);if(n===null)return e;if(n===r)return He(le(t),le(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function af(t,e){if(Wn(t)!==Wn(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function It(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(Wn(t)>Wn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class qC{constructor(e,n){this.errorPrefix_=n,this.parts_=f_(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=il(this.parts_[r]);h_(this)}}function GC(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=il(e),h_(t)}function YC(t){const e=t.parts_.pop();t.byteLength_-=il(e),t.parts_.length>0&&(t.byteLength_-=1)}function h_(t){if(t.byteLength_>Kh)throw new Error(t.errorPrefix_+"has a key path longer than "+Kh+" bytes ("+t.byteLength_+").");if(t.parts_.length>Hh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Hh+") or object contains a cycle "+Zn(t))}function Zn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class lf extends u_{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new lf}getInitialEvent(e){return C(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Pi=1e3,QC=60*5*1e3,qh=30*1e3,JC=1.3,XC=3e4,ZC="server_kill",Gh=3;class tn extends c_{constructor(e,n,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=tn.nextPersistentConnectionId_++,this.log_=qs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pi,this.maxReconnectDelay_=QC,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");lf.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Aa.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(Ie(s)),C(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new $s,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),C(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;tn.warnOnListenWarnings_(l,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ot(e,"w")){const r=pr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();nt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Bx(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=qh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Wx(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ie(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Cu("Unrecognized action received from server: "+Ie(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){C(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>XC&&(this.reconnectDelay_=Pi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*JC)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+tn.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(u){C(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?ze("getToken() completed but was canceled"):(ze("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=f&&f.token,a=new HC(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,g=>{nt(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(ZC)},s))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&nt(u),l())}}}interrupt(e){ze("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ze("Resuming connection for reason: "+e),delete this.interruptReasons_[e],vu(this.interruptReasons_)&&(this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>nf(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new ae(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){ze("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Gh&&(this.reconnectDelay_=qh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ze("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Gh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+$v.replace(/\./g,"-")]=1,zd()?e["framework.cordova"]=1:ev()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Aa.getInstance().currentlyOnline();return vu(this.interruptReasons_)&&e}}tn.nextPersistentConnectionId_=0;tn.nextConnectionId_=0;/**
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
 */class G{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new G(e,n)}}/**
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
 */class cl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new G(ai,e),i=new G(ai,n);return this.compare(r,i)!==0}minPost(){return G.MIN}}/**
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
 */let xo;class m_ extends cl{static get __EMPTY_NODE(){return xo}static set __EMPTY_NODE(e){xo=e}compare(e,n){return vi(e.name,n.name)}isDefinedOn(e){throw hi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return G.MIN}maxPost(){return new G(gr,xo)}makePost(e,n){return C(typeof e=="string","KeyIndex indexValue must always be a string."),new G(e,xo)}toString(){return".key"}}const Xr=new m_;/**
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
 */class Eo{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Oe{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Oe.RED,this.left=i??Xe.EMPTY_NODE,this.right=s??Xe.EMPTY_NODE}copy(e,n,r,i,s){return new Oe(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Xe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Xe.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Oe.RED=!0;Oe.BLACK=!1;class eR{copy(e,n,r,i,s){return this}insert(e,n,r){return new Oe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Xe{constructor(e,n=Xe.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Xe(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Oe.BLACK,null,null))}remove(e){return new Xe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Oe.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Eo(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Eo(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Eo(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Eo(this.root_,null,this.comparator_,!0,e)}}Xe.EMPTY_NODE=new eR;/**
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
 */function tR(t,e){return vi(t.name,e.name)}function cf(t,e){return vi(t,e)}/**
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
 */let Tu;function nR(t){Tu=t}const g_=function(t){return typeof t=="number"?"number:"+Kv(t):"string:"+t},y_=function(t){if(t.isLeafNode()){const e=t.val();C(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ot(e,".sv"),"Priority must be a string or number.")}else C(t===Tu||t.isEmpty(),"priority of unexpected type.");C(t===Tu||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Yh;class Ne{constructor(e,n=Ne.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,C(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),y_(this.priorityNode_)}static set __childrenNodeConstructor(e){Yh=e}static get __childrenNodeConstructor(){return Yh}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ne(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ne.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Y(e)?this:q(e)===".priority"?this.priorityNode_:Ne.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Ne.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=q(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(C(r!==".priority"||Wn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Ne.__childrenNodeConstructor.EMPTY_NODE.updateChild(le(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+g_(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Kv(this.value_):e+=this.value_,this.lazyHash_=Bv(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ne.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ne.__childrenNodeConstructor?-1:(C(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=Ne.VALUE_TYPE_ORDER.indexOf(n),s=Ne.VALUE_TYPE_ORDER.indexOf(r);return C(i>=0,"Unknown leaf type: "+n),C(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Ne.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let v_,__;function rR(t){v_=t}function iR(t){__=t}class sR extends cl{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?vi(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return G.MIN}maxPost(){return new G(gr,new Ne("[PRIORITY-POST]",__))}makePost(e,n){const r=v_(e);return new G(n,new Ne("[PRIORITY-POST]",r))}toString(){return".priority"}}const ge=new sR;/**
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
 */const oR=Math.log(2);class aR{constructor(e){const n=s=>parseInt(Math.log(s)/oR,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Na=function(t,e,n,r){t.sort(e);const i=function(l,c){const d=c-l;let u,f;if(d===0)return null;if(d===1)return u=t[l],f=n?n(u):u,new Oe(f,u.node,Oe.BLACK,null,null);{const g=parseInt(d/2,10)+l,v=i(l,g),w=i(g+1,c);return u=t[g],f=n?n(u):u,new Oe(f,u.node,Oe.BLACK,v,w)}},s=function(l){let c=null,d=null,u=t.length;const f=function(v,w){const T=u-v,y=u;u-=v;const m=i(T+1,y),h=t[T],_=n?n(h):h;g(new Oe(_,h.node,w,null,m))},g=function(v){c?(c.left=v,c=v):(d=v,c=v)};for(let v=0;v<l.count;++v){const w=l.nextBitIsOne(),T=Math.pow(2,l.count-(v+1));w?f(T,Oe.BLACK):(f(T,Oe.BLACK),f(T,Oe.RED))}return d},o=new aR(t.length),a=s(o);return new Xe(r||e,a)};/**
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
 */let fc;const Ir={};class Zt{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return C(Ir&&ge,"ChildrenNode.ts has not been loaded"),fc=fc||new Zt({".priority":Ir},{".priority":ge}),fc}get(e){const n=pr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Xe?n:null}hasIndex(e){return Ot(this.indexSet_,e.toString())}addIndex(e,n){C(e!==Xr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(G.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=Na(r,e.getCompare()):a=Ir;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Zt(d,c)}addToIndexes(e,n){const r=Sa(this.indexes_,(i,s)=>{const o=pr(this.indexSet_,s);if(C(o,"Missing index implementation for "+s),i===Ir)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(G.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Na(a,o.getCompare())}else return Ir;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new G(e.name,a))),l.insert(e,e.node)}});return new Zt(r,this.indexSet_)}removeFromIndexes(e,n){const r=Sa(this.indexes_,i=>{if(i===Ir)return i;{const s=n.get(e.name);return s?i.remove(new G(e.name,s)):i}});return new Zt(r,this.indexSet_)}}/**
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
 */let Oi;class W{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&y_(this.priorityNode_),this.children_.isEmpty()&&C(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Oi||(Oi=new W(new Xe(cf),null,Zt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Oi}updatePriority(e){return this.children_.isEmpty()?this:new W(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Oi:n}}getChild(e){const n=q(e);return n===null?this:this.getImmediateChild(n).getChild(le(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(C(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new G(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?Oi:this.priorityNode_;return new W(i,o,s)}}updateChild(e,n){const r=q(e);if(r===null)return n;{C(q(e)!==".priority"||Wn(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(le(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(ge,(o,a)=>{n[o]=a.val(e),r++,s&&W.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+g_(this.getPriority().val())+":"),this.forEachChild(ge,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Bv(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new G(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new G(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new G(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,G.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,G.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Gs?-1:0}withIndex(e){if(e===Xr||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new W(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Xr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(ge),i=n.getIterator(ge);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Xr?null:this.indexMap_.get(e.toString())}}W.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class lR extends W{constructor(){super(new Xe(cf),W.EMPTY_NODE,Zt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return W.EMPTY_NODE}isEmpty(){return!1}}const Gs=new lR;Object.defineProperties(G,{MIN:{value:new G(ai,W.EMPTY_NODE)},MAX:{value:new G(gr,Gs)}});m_.__EMPTY_NODE=W.EMPTY_NODE;Ne.__childrenNodeConstructor=W;nR(Gs);iR(Gs);/**
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
 */const cR=!0;function Ee(t,e=null){if(t===null)return W.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),C(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Ne(n,Ee(e))}if(!(t instanceof Array)&&cR){const n=[];let r=!1;if(rt(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=Ee(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),n.push(new G(o,l)))}}),n.length===0)return W.EMPTY_NODE;const s=Na(n,tR,o=>o.name,cf);if(r){const o=Na(n,ge.getCompare());return new W(s,Ee(e),new Zt({".priority":o},{".priority":ge}))}else return new W(s,Ee(e),Zt.Default)}else{let n=W.EMPTY_NODE;return rt(t,(r,i)=>{if(Ot(t,r)&&r.substring(0,1)!=="."){const s=Ee(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(Ee(e))}}rR(Ee);/**
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
 */class uR extends cl{constructor(e){super(),this.indexPath_=e,C(!Y(e)&&q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?vi(e.name,n.name):s}makePost(e,n){const r=Ee(e),i=W.EMPTY_NODE.updateChild(this.indexPath_,r);return new G(n,i)}maxPost(){const e=W.EMPTY_NODE.updateChild(this.indexPath_,Gs);return new G(gr,e)}toString(){return f_(this.indexPath_,0).join("/")}}/**
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
 */class dR extends cl{compare(e,n){const r=e.node.compareTo(n.node);return r===0?vi(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return G.MIN}maxPost(){return G.MAX}makePost(e,n){const r=Ee(e);return new G(n,r)}toString(){return".value"}}const fR=new dR;/**
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
 */function w_(t){return{type:"value",snapshotNode:t}}function li(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Es(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Is(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function pR(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class uf{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){C(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Es(n,a)):C(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(li(n,r)):o.trackChildChange(Is(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(ge,(i,s)=>{n.hasChild(i)||r.trackChildChange(Es(i,s))}),n.isLeafNode()||n.forEachChild(ge,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(Is(i,s,o))}else r.trackChildChange(li(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?W.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Cs{constructor(e){this.indexedFilter_=new uf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Cs.getStartPost_(e),this.endPost_=Cs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new G(n,r))||(r=W.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=W.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(W.EMPTY_NODE);const s=this;return n.forEachChild(ge,(o,a)=>{s.matches(new G(o,a))||(i=i.updateImmediateChild(o,W.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class hR{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Cs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new G(n,r))||(r=W.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=W.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=W.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(W.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,W.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const u=this.index_.getCompare();o=(f,g)=>u(g,f)}else o=this.index_.getCompare();const a=e;C(a.numChildren()===this.limit_,"");const l=new G(n,r),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const g=f==null?1:o(f,l);if(d&&!r.isEmpty()&&g>=0)return s!=null&&s.trackChildChange(Is(n,r,u)),a.updateImmediateChild(n,r);{s!=null&&s.trackChildChange(Es(n,u));const w=a.updateImmediateChild(n,W.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(s!=null&&s.trackChildChange(li(f.name,f.node)),w.updateImmediateChild(f.name,f.node)):w}}else return r.isEmpty()?e:d&&o(c,l)>=0?(s!=null&&(s.trackChildChange(Es(c.name,c.node)),s.trackChildChange(li(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(c.name,W.EMPTY_NODE)):e}}/**
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
 */class df{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ge}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return C(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return C(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ai}hasEnd(){return this.endSet_}getIndexEndValue(){return C(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return C(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:gr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return C(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ge}copy(){const e=new df;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function mR(t){return t.loadsAllData()?new uf(t.getIndex()):t.hasLimit()?new hR(t):new Cs(t)}function Qh(t){const e={};if(t.isDefault())return e;let n;if(t.index_===ge?n="$priority":t.index_===fR?n="$value":t.index_===Xr?n="$key":(C(t.index_ instanceof uR,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Ie(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Ie(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Ie(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Ie(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Ie(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Jh(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==ge&&(e.i=t.index_.toString()),e}/**
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
 */class Pa extends c_{constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=qs("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(C(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Pa.getListenId_(e,r),a={};this.listens_[o]=a;const l=Qh(e._queryParams);this.restRequest_(s+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(s,u,!1,r),pr(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const r=Pa.getListenId_(e,n);delete this.listens_[r]}get(e){const n=Qh(e._queryParams),r=e._path.toString(),i=new $s;return this.restRequest_(r+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+mi(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ws(a.responseText)}catch{nt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&nt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class gR{constructor(){this.rootNode_=W.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Oa(){return{value:null,children:new Map}}function b_(t,e,n){if(Y(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=q(e);t.children.has(r)||t.children.set(r,Oa());const i=t.children.get(r);e=le(e),b_(i,e,n)}}function Au(t,e,n){t.value!==null?n(e,t.value):yR(t,(r,i)=>{const s=new ae(e.toString()+"/"+r);Au(i,s,n)})}function yR(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
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
 */class vR{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&rt(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
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
 */const Xh=10*1e3,_R=30*1e3,wR=5*60*1e3;class bR{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new vR(e);const r=Xh+(_R-Xh)*Math.random();Xi(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;rt(e,(i,s)=>{s>0&&Ot(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),Xi(this.reportStats_.bind(this),Math.floor(Math.random()*2*wR))}}/**
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
 */var Ct;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ct||(Ct={}));function S_(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ff(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function pf(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class Da{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Ct.ACK_USER_WRITE,this.source=S_()}operationForChild(e){if(Y(this.path)){if(this.affectedTree.value!=null)return C(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ae(e));return new Da(te(),n,this.revert)}}else return C(q(this.path)===e,"operationForChild called for unrelated child."),new Da(le(this.path),this.affectedTree,this.revert)}}/**
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
 */class Rs{constructor(e,n){this.source=e,this.path=n,this.type=Ct.LISTEN_COMPLETE}operationForChild(e){return Y(this.path)?new Rs(this.source,te()):new Rs(this.source,le(this.path))}}/**
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
 */class yr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Ct.OVERWRITE}operationForChild(e){return Y(this.path)?new yr(this.source,te(),this.snap.getImmediateChild(e)):new yr(this.source,le(this.path),this.snap)}}/**
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
 */class Ts{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Ct.MERGE}operationForChild(e){if(Y(this.path)){const n=this.children.subtree(new ae(e));return n.isEmpty()?null:n.value?new yr(this.source,te(),n.value):new Ts(this.source,te(),n)}else return C(q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ts(this.source,le(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Bn{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Y(e))return this.isFullyInitialized()&&!this.filtered_;const n=q(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class SR{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function kR(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(pR(o.childName,o.snapshotNode))}),Di(t,i,"child_removed",e,r,n),Di(t,i,"child_added",e,r,n),Di(t,i,"child_moved",s,r,n),Di(t,i,"child_changed",e,r,n),Di(t,i,"value",e,r,n),i}function Di(t,e,n,r,i,s){const o=r.filter(a=>a.type===n);o.sort((a,l)=>ER(t,a,l)),o.forEach(a=>{const l=xR(t,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function xR(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function ER(t,e,n){if(e.childName==null||n.childName==null)throw hi("Should only compare child_ events.");const r=new G(e.childName,e.snapshotNode),i=new G(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
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
 */function ul(t,e){return{eventCache:t,serverCache:e}}function Zi(t,e,n,r){return ul(new Bn(e,n,r),t.serverCache)}function k_(t,e,n,r){return ul(t.eventCache,new Bn(e,n,r))}function Ma(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function vr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let pc;const IR=()=>(pc||(pc=new Xe(dC)),pc);class fe{constructor(e,n=IR()){this.value=e,this.children=n}static fromObject(e){let n=new fe(null);return rt(e,(r,i)=>{n=n.set(new ae(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:te(),value:this.value};if(Y(e))return null;{const r=q(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(le(e),n);return s!=null?{path:Ce(new ae(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Y(e))return this;{const n=q(e),r=this.children.get(n);return r!==null?r.subtree(le(e)):new fe(null)}}set(e,n){if(Y(e))return new fe(n,this.children);{const r=q(e),s=(this.children.get(r)||new fe(null)).set(le(e),n),o=this.children.insert(r,s);return new fe(this.value,o)}}remove(e){if(Y(e))return this.children.isEmpty()?new fe(null):new fe(null,this.children);{const n=q(e),r=this.children.get(n);if(r){const i=r.remove(le(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new fe(null):new fe(this.value,s)}else return this}}get(e){if(Y(e))return this.value;{const n=q(e),r=this.children.get(n);return r?r.get(le(e)):null}}setTree(e,n){if(Y(e))return n;{const r=q(e),s=(this.children.get(r)||new fe(null)).setTree(le(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new fe(this.value,o)}}fold(e){return this.fold_(te(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(Ce(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,te(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(Y(e))return null;{const s=q(e),o=this.children.get(s);return o?o.findOnPath_(le(e),Ce(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,te(),n)}foreachOnPath_(e,n,r){if(Y(e))return this;{this.value&&r(n,this.value);const i=q(e),s=this.children.get(i);return s?s.foreachOnPath_(le(e),Ce(n,i),r):new fe(null)}}foreach(e){this.foreach_(te(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(Ce(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
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
 */class At{constructor(e){this.writeTree_=e}static empty(){return new At(new fe(null))}}function es(t,e,n){if(Y(e))return new At(new fe(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=He(i,e);return s=s.updateChild(o,n),new At(t.writeTree_.set(i,s))}else{const i=new fe(n),s=t.writeTree_.setTree(e,i);return new At(s)}}}function Zh(t,e,n){let r=t;return rt(n,(i,s)=>{r=es(r,Ce(e,i),s)}),r}function em(t,e){if(Y(e))return At.empty();{const n=t.writeTree_.setTree(e,new fe(null));return new At(n)}}function Nu(t,e){return Sr(t,e)!=null}function Sr(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(He(n.path,e)):null}function tm(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(ge,(r,i)=>{e.push(new G(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new G(r,i.value))}),e}function jn(t,e){if(Y(e))return t;{const n=Sr(t,e);return n!=null?new At(new fe(n)):new At(t.writeTree_.subtree(e))}}function Pu(t){return t.writeTree_.isEmpty()}function ci(t,e){return x_(te(),t.writeTree_,e)}function x_(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(C(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=x_(Ce(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(Ce(t,".priority"),r)),n}}/**
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
 */function dl(t,e){return R_(e,t)}function CR(t,e,n,r,i){C(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=es(t.visibleWrites,e,n)),t.lastWriteId=r}function RR(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function TR(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);C(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&AR(a,r.path)?i=!1:It(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return NR(t),!0;if(r.snap)t.visibleWrites=em(t.visibleWrites,r.path);else{const a=r.children;rt(a,l=>{t.visibleWrites=em(t.visibleWrites,Ce(r.path,l))})}return!0}else return!1}function AR(t,e){if(t.snap)return It(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&It(Ce(t.path,n),e))return!0;return!1}function NR(t){t.visibleWrites=E_(t.allWrites,PR,te()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function PR(t){return t.visible}function E_(t,e,n){let r=At.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let a;if(s.snap)It(n,o)?(a=He(n,o),r=es(r,a,s.snap)):It(o,n)&&(a=He(o,n),r=es(r,te(),s.snap.getChild(a)));else if(s.children){if(It(n,o))a=He(n,o),r=Zh(r,a,s.children);else if(It(o,n))if(a=He(o,n),Y(a))r=Zh(r,te(),s.children);else{const l=pr(s.children,q(a));if(l){const c=l.getChild(le(a));r=es(r,te(),c)}}}else throw hi("WriteRecord should have .snap or .children")}}return r}function I_(t,e,n,r,i){if(!r&&!i){const s=Sr(t.visibleWrites,e);if(s!=null)return s;{const o=jn(t.visibleWrites,e);if(Pu(o))return n;if(n==null&&!Nu(o,te()))return null;{const a=n||W.EMPTY_NODE;return ci(o,a)}}}else{const s=jn(t.visibleWrites,e);if(!i&&Pu(s))return n;if(!i&&n==null&&!Nu(s,te()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(It(c.path,e)||It(e,c.path))},a=E_(t.allWrites,o,e),l=n||W.EMPTY_NODE;return ci(a,l)}}}function OR(t,e,n){let r=W.EMPTY_NODE;const i=Sr(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ge,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=jn(t.visibleWrites,e);return n.forEachChild(ge,(o,a)=>{const l=ci(jn(s,new ae(o)),a);r=r.updateImmediateChild(o,l)}),tm(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=jn(t.visibleWrites,e);return tm(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function DR(t,e,n,r,i){C(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=Ce(e,n);if(Nu(t.visibleWrites,s))return null;{const o=jn(t.visibleWrites,s);return Pu(o)?i.getChild(n):ci(o,i.getChild(n))}}function MR(t,e,n,r){const i=Ce(e,n),s=Sr(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=jn(t.visibleWrites,i);return ci(o,r.getNode().getImmediateChild(n))}else return null}function LR(t,e){return Sr(t.visibleWrites,e)}function jR(t,e,n,r,i,s,o){let a;const l=jn(t.visibleWrites,e),c=Sr(l,te());if(c!=null)a=c;else if(n!=null)a=ci(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),f=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let g=f.getNext();for(;g&&d.length<i;)u(g,r)!==0&&d.push(g),g=f.getNext();return d}else return[]}function FR(){return{visibleWrites:At.empty(),allWrites:[],lastWriteId:-1}}function La(t,e,n,r){return I_(t.writeTree,t.treePath,e,n,r)}function hf(t,e){return OR(t.writeTree,t.treePath,e)}function nm(t,e,n,r){return DR(t.writeTree,t.treePath,e,n,r)}function ja(t,e){return LR(t.writeTree,Ce(t.treePath,e))}function UR(t,e,n,r,i,s){return jR(t.writeTree,t.treePath,e,n,r,i,s)}function mf(t,e,n){return MR(t.writeTree,t.treePath,e,n)}function C_(t,e){return R_(Ce(t.treePath,e),t.writeTree)}function R_(t,e){return{treePath:t,writeTree:e}}/**
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
 */class VR{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;C(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),C(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,Is(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Es(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,li(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,Is(r,e.snapshotNode,i.oldSnap));else throw hi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class $R{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const T_=new $R;class gf{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Bn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return mf(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:vr(this.viewCache_),s=UR(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
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
 */function zR(t){return{filter:t}}function WR(t,e){C(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),C(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function BR(t,e,n,r,i){const s=new VR;let o,a;if(n.type===Ct.OVERWRITE){const c=n;c.source.fromUser?o=Ou(t,e,c.path,c.snap,r,i,s):(C(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!Y(c.path),o=Fa(t,e,c.path,c.snap,r,i,a,s))}else if(n.type===Ct.MERGE){const c=n;c.source.fromUser?o=KR(t,e,c.path,c.children,r,i,s):(C(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Du(t,e,c.path,c.children,r,i,a,s))}else if(n.type===Ct.ACK_USER_WRITE){const c=n;c.revert?o=YR(t,e,c.path,r,i,s):o=qR(t,e,c.path,c.affectedTree,r,i,s)}else if(n.type===Ct.LISTEN_COMPLETE)o=GR(t,e,n.path,r,s);else throw hi("Unknown operation type: "+n.type);const l=s.getChanges();return HR(e,o,l),{viewCache:o,changes:l}}function HR(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Ma(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(w_(Ma(e)))}}function A_(t,e,n,r,i,s){const o=e.eventCache;if(ja(r,n)!=null)return e;{let a,l;if(Y(n))if(C(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=vr(e),d=c instanceof W?c:W.EMPTY_NODE,u=hf(r,d);a=t.filter.updateFullNode(e.eventCache.getNode(),u,s)}else{const c=La(r,vr(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=q(n);if(c===".priority"){C(Wn(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=nm(r,n,d,l);u!=null?a=t.filter.updatePriority(d,u):a=o.getNode()}else{const d=le(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=nm(r,n,o.getNode(),l);f!=null?u=o.getNode().getImmediateChild(c).updateChild(d,f):u=o.getNode().getImmediateChild(c)}else u=mf(r,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,d,i,s):a=o.getNode()}}return Zi(e,a,o.isFullyInitialized()||Y(n),t.filter.filtersNodes())}}function Fa(t,e,n,r,i,s,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(Y(n))c=d.updateFullNode(l.getNode(),r,null);else if(d.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(n,r);c=d.updateFullNode(l.getNode(),g,null)}else{const g=q(n);if(!l.isCompleteForPath(n)&&Wn(n)>1)return e;const v=le(n),T=l.getNode().getImmediateChild(g).updateChild(v,r);g===".priority"?c=d.updatePriority(l.getNode(),T):c=d.updateChild(l.getNode(),g,T,v,T_,null)}const u=k_(e,c,l.isFullyInitialized()||Y(n),d.filtersNodes()),f=new gf(i,u,s);return A_(t,u,n,i,f,a)}function Ou(t,e,n,r,i,s,o){const a=e.eventCache;let l,c;const d=new gf(i,e,s);if(Y(n))c=t.filter.updateFullNode(e.eventCache.getNode(),r,o),l=Zi(e,c,!0,t.filter.filtersNodes());else{const u=q(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),r),l=Zi(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=le(n),g=a.getNode().getImmediateChild(u);let v;if(Y(f))v=r;else{const w=d.getCompleteChild(u);w!=null?d_(f)===".priority"&&w.getChild(p_(f)).isEmpty()?v=w:v=w.updateChild(f,r):v=W.EMPTY_NODE}if(g.equals(v))l=e;else{const w=t.filter.updateChild(a.getNode(),u,v,f,d,o);l=Zi(e,w,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function rm(t,e){return t.eventCache.isCompleteForChild(e)}function KR(t,e,n,r,i,s,o){let a=e;return r.foreach((l,c)=>{const d=Ce(n,l);rm(e,q(d))&&(a=Ou(t,a,d,c,i,s,o))}),r.foreach((l,c)=>{const d=Ce(n,l);rm(e,q(d))||(a=Ou(t,a,d,c,i,s,o))}),a}function im(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Du(t,e,n,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;Y(n)?c=r:c=new fe(null).setTree(n,r);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,f)=>{if(d.hasChild(u)){const g=e.serverCache.getNode().getImmediateChild(u),v=im(t,g,f);l=Fa(t,l,new ae(u),v,i,s,o,a)}}),c.children.inorderTraversal((u,f)=>{const g=!e.serverCache.isCompleteForChild(u)&&f.value===null;if(!d.hasChild(u)&&!g){const v=e.serverCache.getNode().getImmediateChild(u),w=im(t,v,f);l=Fa(t,l,new ae(u),w,i,s,o,a)}}),l}function qR(t,e,n,r,i,s,o){if(ja(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(Y(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Fa(t,e,n,l.getNode().getChild(n),i,s,a,o);if(Y(n)){let c=new fe(null);return l.getNode().forEachChild(Xr,(d,u)=>{c=c.set(new ae(d),u)}),Du(t,e,n,c,i,s,a,o)}else return e}else{let c=new fe(null);return r.foreach((d,u)=>{const f=Ce(n,d);l.isCompleteForPath(f)&&(c=c.set(d,l.getNode().getChild(f)))}),Du(t,e,n,c,i,s,a,o)}}function GR(t,e,n,r,i){const s=e.serverCache,o=k_(e,s.getNode(),s.isFullyInitialized()||Y(n),s.isFiltered());return A_(t,o,n,r,T_,i)}function YR(t,e,n,r,i,s){let o;if(ja(r,n)!=null)return e;{const a=new gf(r,e,i),l=e.eventCache.getNode();let c;if(Y(n)||q(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=La(r,vr(e));else{const u=e.serverCache.getNode();C(u instanceof W,"serverChildren would be complete if leaf node"),d=hf(r,u)}d=d,c=t.filter.updateFullNode(l,d,s)}else{const d=q(n);let u=mf(r,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=t.filter.updateChild(l,d,u,le(n),a,s):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,W.EMPTY_NODE,le(n),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=La(r,vr(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||ja(r,te())!=null,Zi(e,c,o,t.filter.filtersNodes())}}/**
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
 */class QR{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new uf(r.getIndex()),s=mR(r);this.processor_=zR(s);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(W.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(W.EMPTY_NODE,a.getNode(),null),d=new Bn(l,o.isFullyInitialized(),i.filtersNodes()),u=new Bn(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=ul(u,d),this.eventGenerator_=new SR(this.query_)}get query(){return this.query_}}function JR(t){return t.viewCache_.serverCache.getNode()}function XR(t){return Ma(t.viewCache_)}function ZR(t,e){const n=vr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!Y(e)&&!n.getImmediateChild(q(e)).isEmpty())?n.getChild(e):null}function sm(t){return t.eventRegistrations_.length===0}function eT(t,e){t.eventRegistrations_.push(e)}function om(t,e,n){const r=[];if(n){C(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function am(t,e,n,r){e.type===Ct.MERGE&&e.source.queryId!==null&&(C(vr(t.viewCache_),"We should always have a full cache before handling merges"),C(Ma(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=BR(t.processor_,i,e,n,r);return WR(t.processor_,s.viewCache),C(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,N_(t,s.changes,s.viewCache.eventCache.getNode(),null)}function tT(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(ge,(s,o)=>{r.push(li(s,o))}),n.isFullyInitialized()&&r.push(w_(n.getNode())),N_(t,r,n.getNode(),e)}function N_(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return kR(t.eventGenerator_,e,n,i)}/**
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
 */let Ua;class P_{constructor(){this.views=new Map}}function nT(t){C(!Ua,"__referenceConstructor has already been defined"),Ua=t}function rT(){return C(Ua,"Reference.ts has not been loaded"),Ua}function iT(t){return t.views.size===0}function yf(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return C(s!=null,"SyncTree gave us an op for an invalid query."),am(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(am(o,e,n,r));return s}}function O_(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=La(n,i?r:null),l=!1;a?l=!0:r instanceof W?(a=hf(n,r),l=!1):(a=W.EMPTY_NODE,l=!1);const c=ul(new Bn(a,l,!1),new Bn(r,i,!1));return new QR(e,c)}return o}function sT(t,e,n,r,i,s){const o=O_(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),eT(o,n),tT(o,n)}function oT(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const a=Hn(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(om(c,n,r)),sm(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(om(l,n,r)),sm(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!Hn(t)&&s.push(new(rT())(e._repo,e._path)),{removed:s,events:o}}function D_(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Fn(t,e){let n=null;for(const r of t.views.values())n=n||ZR(r,e);return n}function M_(t,e){if(e._queryParams.loadsAllData())return fl(t);{const r=e._queryIdentifier;return t.views.get(r)}}function L_(t,e){return M_(t,e)!=null}function Hn(t){return fl(t)!=null}function fl(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Va;function aT(t){C(!Va,"__referenceConstructor has already been defined"),Va=t}function lT(){return C(Va,"Reference.ts has not been loaded"),Va}let cT=1;class lm{constructor(e){this.listenProvider_=e,this.syncPointTree_=new fe(null),this.pendingWriteTree_=FR(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function vf(t,e,n,r,i){return CR(t.pendingWriteTree_,e,n,r,i),i?Qs(t,new yr(S_(),e,n)):[]}function ir(t,e,n=!1){const r=RR(t.pendingWriteTree_,e);if(TR(t.pendingWriteTree_,e)){let s=new fe(null);return r.snap!=null?s=s.set(te(),!0):rt(r.children,o=>{s=s.set(new ae(o),!0)}),Qs(t,new Da(r.path,s,n))}else return[]}function Ys(t,e,n){return Qs(t,new yr(ff(),e,n))}function uT(t,e,n){const r=fe.fromObject(n);return Qs(t,new Ts(ff(),e,r))}function dT(t,e){return Qs(t,new Rs(ff(),e))}function fT(t,e,n){const r=_f(t,n);if(r){const i=wf(r),s=i.path,o=i.queryId,a=He(s,e),l=new Rs(pf(o),a);return bf(t,s,l)}else return[]}function $a(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||L_(o,e))){const l=oT(o,e,n,r);iT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(s,(f,g)=>Hn(g));if(d&&!u){const f=t.syncPointTree_.subtree(s);if(!f.isEmpty()){const g=mT(f);for(let v=0;v<g.length;++v){const w=g[v],T=w.query,y=V_(t,w);t.listenProvider_.startListening(ts(T),As(t,T),y.hashFn,y.onComplete)}}}!u&&c.length>0&&!r&&(d?t.listenProvider_.stopListening(ts(e),null):c.forEach(f=>{const g=t.queryToTagMap.get(hl(f));t.listenProvider_.stopListening(ts(f),g)}))}gT(t,c)}return a}function j_(t,e,n,r){const i=_f(t,r);if(i!=null){const s=wf(i),o=s.path,a=s.queryId,l=He(o,e),c=new yr(pf(a),l,n);return bf(t,o,c)}else return[]}function pT(t,e,n,r){const i=_f(t,r);if(i){const s=wf(i),o=s.path,a=s.queryId,l=He(o,e),c=fe.fromObject(n),d=new Ts(pf(a),l,c);return bf(t,o,d)}else return[]}function Mu(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,g)=>{const v=He(f,i);s=s||Fn(g,v),o=o||Hn(g)});let a=t.syncPointTree_.get(i);a?(o=o||Hn(a),s=s||Fn(a,te())):(a=new P_,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=W.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((g,v)=>{const w=Fn(v,te());w&&(s=s.updateImmediateChild(g,w))}));const c=L_(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=hl(e);C(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const g=yT();t.queryToTagMap.set(f,g),t.tagToQueryMap.set(g,f)}const d=dl(t.pendingWriteTree_,i);let u=sT(a,e,n,d,s,l);if(!c&&!o&&!r){const f=M_(a,e);u=u.concat(vT(t,e,f))}return u}function pl(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=He(o,e),c=Fn(a,l);if(c)return c});return I_(i,e,s,n,!0)}function hT(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const u=He(c,n);r=r||Fn(d,u)});let i=t.syncPointTree_.get(n);i?r=r||Fn(i,te()):(i=new P_,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new Bn(r,!0,!1):null,a=dl(t.pendingWriteTree_,e._path),l=O_(i,e,a,s?o.getNode():W.EMPTY_NODE,s);return XR(l)}function Qs(t,e){return F_(e,t.syncPointTree_,null,dl(t.pendingWriteTree_,te()))}function F_(t,e,n,r){if(Y(t.path))return U_(t,e,n,r);{const i=e.get(te());n==null&&i!=null&&(n=Fn(i,te()));let s=[];const o=q(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=C_(r,o);s=s.concat(F_(a,l,c,d))}return i&&(s=s.concat(yf(i,t,r,n))),s}}function U_(t,e,n,r){const i=e.get(te());n==null&&i!=null&&(n=Fn(i,te()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=C_(r,o),d=t.operationForChild(o);d&&(s=s.concat(U_(d,a,l,c)))}),i&&(s=s.concat(yf(i,t,r,n))),s}function V_(t,e){const n=e.query,r=As(t,n);return{hashFn:()=>(JR(e)||W.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?fT(t,n._path,r):dT(t,n._path);{const s=hC(i,n);return $a(t,n,null,s)}}}}function As(t,e){const n=hl(e);return t.queryToTagMap.get(n)}function hl(t){return t._path.toString()+"$"+t._queryIdentifier}function _f(t,e){return t.tagToQueryMap.get(e)}function wf(t){const e=t.indexOf("$");return C(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ae(t.substr(0,e))}}function bf(t,e,n){const r=t.syncPointTree_.get(e);C(r,"Missing sync point for query tag that we're tracking");const i=dl(t.pendingWriteTree_,e);return yf(r,n,i,null)}function mT(t){return t.fold((e,n,r)=>{if(n&&Hn(n))return[fl(n)];{let i=[];return n&&(i=D_(n)),rt(r,(s,o)=>{i=i.concat(o)}),i}})}function ts(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(lT())(t._repo,t._path):t}function gT(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=hl(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function yT(){return cT++}function vT(t,e,n){const r=e._path,i=As(t,e),s=V_(t,n),o=t.listenProvider_.startListening(ts(e),i,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(r);if(i)C(!Hn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!Y(c)&&d&&Hn(d))return[fl(d).query];{let f=[];return d&&(f=f.concat(D_(d).map(g=>g.query))),rt(u,(g,v)=>{f=f.concat(v)}),f}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(ts(d),As(t,d))}}return o}/**
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
 */class Sf{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Sf(n)}node(){return this.node_}}class kf{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Ce(this.path_,e);return new kf(this.syncTree_,n)}node(){return pl(this.syncTree_,this.path_)}}const _T=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},cm=function(t,e,n){if(!t||typeof t!="object")return t;if(C(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return wT(t[".sv"],e,n);if(typeof t[".sv"]=="object")return bT(t[".sv"],e);C(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},wT=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:C(!1,"Unexpected server value: "+t)}},bT=function(t,e,n){t.hasOwnProperty("increment")||C(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&C(!1,"Unexpected increment value: "+r);const i=e.node();if(C(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},ST=function(t,e,n,r){return Ef(e,new kf(n,t),r)},xf=function(t,e,n){return Ef(t,new Sf(e),n)};function Ef(t,e,n){const r=t.getPriority().val(),i=cm(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=cm(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new Ne(a,Ee(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Ne(i))),o.forEachChild(ge,(a,l)=>{const c=Ef(l,e.getImmediateChild(a),n);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
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
 */class If{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function ml(t,e){let n=e instanceof ae?e:new ae(e),r=t,i=q(n);for(;i!==null;){const s=pr(r.node.children,i)||{children:{},childCount:0};r=new If(i,r,s),n=le(n),i=q(n)}return r}function kr(t){return t.node.value}function Cf(t,e){t.node.value=e,Lu(t)}function $_(t){return t.node.childCount>0}function kT(t){return kr(t)===void 0&&!$_(t)}function gl(t,e){rt(t.node.children,(n,r)=>{e(new If(n,t,r))})}function z_(t,e,n,r){n&&e(t),gl(t,i=>{z_(i,e,!0)})}function xT(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Js(t){return new ae(t.parent===null?t.name:Js(t.parent)+"/"+t.name)}function Lu(t){t.parent!==null&&ET(t.parent,t.name,t)}function ET(t,e,n){const r=kT(n),i=Ot(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,Lu(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Lu(t))}/**
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
 */const IT=/[\[\].#$\/\u0000-\u001F\u007F]/,CT=/[\[\].#$\u0000-\u001F\u007F]/,hc=10*1024*1024,W_=function(t){return typeof t=="string"&&t.length!==0&&!IT.test(t)},B_=function(t){return typeof t=="string"&&t.length!==0&&!CT.test(t)},RT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),B_(t)},TT=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!tf(t)||t&&typeof t=="object"&&Ot(t,".sv")},AT=function(t,e,n,r){yl(Wd(t,"value"),e,n)},yl=function(t,e,n){const r=n instanceof ae?new qC(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Zn(r));if(typeof e=="function")throw new Error(t+"contains a function "+Zn(r)+" with contents = "+e.toString());if(tf(e))throw new Error(t+"contains "+e.toString()+" "+Zn(r));if(typeof e=="string"&&e.length>hc/3&&il(e)>hc)throw new Error(t+"contains a string greater than "+hc+" utf8 bytes "+Zn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(rt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!W_(o)))throw new Error(t+" contains an invalid key ("+o+") "+Zn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);GC(r,o),yl(t,a,r),YC(r)}),i&&s)throw new Error(t+' contains ".value" child '+Zn(r)+" in addition to actual children.")}},H_=function(t,e,n,r){if(!B_(n))throw new Error(Wd(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},NT=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),H_(t,e,n)},Rf=function(t,e){if(q(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},PT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!W_(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!RT(n))throw new Error(Wd(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class OT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Tf(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!af(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function K_(t,e,n){Tf(t,n),q_(t,r=>af(r,e))}function Pt(t,e,n){Tf(t,n),q_(t,r=>It(r,e)||It(e,r))}function q_(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(DT(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function DT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Ji&&ze("event: "+n.toString()),_i(r)}}}/**
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
 */const MT="repo_interrupt",LT=25;class jT{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new OT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Oa(),this.transactionQueueTree_=new If,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function FT(t,e,n){if(t.stats_=sf(t.repoInfo_),t.forceRestClient_||vC())t.server_=new Pa(t.repoInfo_,(r,i,s,o)=>{um(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>dm(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ie(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new tn(t.repoInfo_,e,(r,i,s,o)=>{um(t,r,i,s,o)},r=>{dm(t,r)},r=>{VT(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=kC(t.repoInfo_,()=>new bR(t.stats_,t.server_)),t.infoData_=new gR,t.infoSyncTree_=new lm({startListening:(r,i,s,o)=>{let a=[];const l=t.infoData_.getNode(r._path);return l.isEmpty()||(a=Ys(t.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Af(t,"connected",!1),t.serverSyncTree_=new lm({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(a,l)=>{const c=o(a,l);Pt(t.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function UT(t){const n=t.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function vl(t){return _T({timestamp:UT(t)})}function um(t,e,n,r,i){t.dataUpdateCount++;const s=new ae(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const l=Sa(n,c=>Ee(c));o=pT(t.serverSyncTree_,s,l,i)}else{const l=Ee(n);o=j_(t.serverSyncTree_,s,l,i)}else if(r){const l=Sa(n,c=>Ee(c));o=uT(t.serverSyncTree_,s,l)}else{const l=Ee(n);o=Ys(t.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=wl(t,s)),Pt(t.eventQueue_,a,o)}function dm(t,e){Af(t,"connected",e),e===!1&&WT(t)}function VT(t,e){rt(e,(n,r)=>{Af(t,n,r)})}function Af(t,e,n){const r=new ae("/.info/"+e),i=Ee(n);t.infoData_.updateSnapshot(r,i);const s=Ys(t.infoSyncTree_,r,i);Pt(t.eventQueue_,r,s)}function Nf(t){return t.nextWriteId_++}function $T(t,e,n){const r=hT(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=Ee(i).withIndex(e._queryParams.getIndex());Mu(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ys(t.serverSyncTree_,e._path,s);else{const a=As(t.serverSyncTree_,e);o=j_(t.serverSyncTree_,e._path,s,a)}return Pt(t.eventQueue_,e._path,o),$a(t.serverSyncTree_,e,n,null,!0),s},i=>(Xs(t,"get for query "+Ie(e)+" failed: "+i),Promise.reject(new Error(i))))}function zT(t,e,n,r,i){Xs(t,"set",{path:e.toString(),value:n,priority:r});const s=vl(t),o=Ee(n,r),a=pl(t.serverSyncTree_,e),l=xf(o,a,s),c=Nf(t),d=vf(t.serverSyncTree_,e,l,c,!0);Tf(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(f,g)=>{const v=f==="ok";v||nt("set at "+e+" failed: "+f);const w=ir(t.serverSyncTree_,c,!v);Pt(t.eventQueue_,e,w),qT(t,i,f,g)});const u=J_(t,e);wl(t,u),Pt(t.eventQueue_,u,[])}function WT(t){Xs(t,"onDisconnectEvents");const e=vl(t),n=Oa();Au(t.onDisconnect_,te(),(i,s)=>{const o=ST(i,s,t.serverSyncTree_,e);b_(n,i,o)});let r=[];Au(n,te(),(i,s)=>{r=r.concat(Ys(t.serverSyncTree_,i,s));const o=J_(t,i);wl(t,o)}),t.onDisconnect_=Oa(),Pt(t.eventQueue_,te(),r)}function BT(t,e,n){let r;q(e._path)===".info"?r=Mu(t.infoSyncTree_,e,n):r=Mu(t.serverSyncTree_,e,n),K_(t.eventQueue_,e._path,r)}function HT(t,e,n){let r;q(e._path)===".info"?r=$a(t.infoSyncTree_,e,n):r=$a(t.serverSyncTree_,e,n),K_(t.eventQueue_,e._path,r)}function KT(t){t.persistentConnection_&&t.persistentConnection_.interrupt(MT)}function Xs(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ze(n,...e)}function qT(t,e,n,r){e&&_i(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function GT(t,e,n,r,i,s){Xs(t,"transaction on "+e);const o={path:e,update:n,onComplete:r,status:null,order:Wv(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Pf(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{yl("transaction failed: Data returned ",l,o.path),o.status=0;const c=ml(t.transactionQueueTree_,e),d=kr(c)||[];d.push(o),Cf(c,d);let u;typeof l=="object"&&l!==null&&Ot(l,".priority")?(u=pr(l,".priority"),C(TT(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(pl(t.serverSyncTree_,e)||W.EMPTY_NODE).getPriority().val();const f=vl(t),g=Ee(l,u),v=xf(g,a,f);o.currentOutputSnapshotRaw=g,o.currentOutputSnapshotResolved=v,o.currentWriteId=Nf(t);const w=vf(t.serverSyncTree_,e,v,o.currentWriteId,o.applyLocally);Pt(t.eventQueue_,e,w),_l(t,t.transactionQueueTree_)}}function Pf(t,e,n){return pl(t.serverSyncTree_,e,n)||W.EMPTY_NODE}function _l(t,e=t.transactionQueueTree_){if(e||bl(t,e),kr(e)){const n=Y_(t,e);C(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&YT(t,Js(e),n)}else $_(e)&&gl(e,n=>{_l(t,n)})}function YT(t,e,n){const r=n.map(c=>c.currentWriteId),i=Pf(t,e,r);let s=i;const o=i.hash();for(let c=0;c<n.length;c++){const d=n[c];C(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=He(e,d.path);s=s.updateChild(u,d.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Xs(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(ir(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&u.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();bl(t,ml(t.transactionQueueTree_,e)),_l(t,t.transactionQueueTree_),Pt(t.eventQueue_,e,d);for(let f=0;f<u.length;f++)_i(u[f])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{nt("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}wl(t,e)}},o)}function wl(t,e){const n=G_(t,e),r=Js(n),i=Y_(t,n);return QT(t,i,r),r}function QT(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=He(n,l.path);let d=!1,u;if(C(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(ir(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=LT)d=!0,u="maxretry",i=i.concat(ir(t.serverSyncTree_,l.currentWriteId,!0));else{const f=Pf(t,l.path,o);l.currentInputSnapshot=f;const g=e[a].update(f.val());if(g!==void 0){yl("transaction failed: Data returned ",g,l.path);let v=Ee(g);typeof g=="object"&&g!=null&&Ot(g,".priority")||(v=v.updatePriority(f.getPriority()));const T=l.currentWriteId,y=vl(t),m=xf(v,f,y);l.currentOutputSnapshotRaw=v,l.currentOutputSnapshotResolved=m,l.currentWriteId=Nf(t),o.splice(o.indexOf(T),1),i=i.concat(vf(t.serverSyncTree_,l.path,m,l.currentWriteId,l.applyLocally)),i=i.concat(ir(t.serverSyncTree_,T,!0))}else d=!0,u="nodata",i=i.concat(ir(t.serverSyncTree_,l.currentWriteId,!0))}Pt(t.eventQueue_,n,i),i=[],d&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(u),!1,null))))}bl(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)_i(r[a]);_l(t,t.transactionQueueTree_)}function G_(t,e){let n,r=t.transactionQueueTree_;for(n=q(e);n!==null&&kr(r)===void 0;)r=ml(r,n),e=le(e),n=q(e);return r}function Y_(t,e){const n=[];return Q_(t,e,n),n.sort((r,i)=>r.order-i.order),n}function Q_(t,e,n){const r=kr(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);gl(e,i=>{Q_(t,i,n)})}function bl(t,e){const n=kr(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,Cf(e,n.length>0?n:void 0)}gl(e,r=>{bl(t,r)})}function J_(t,e){const n=Js(G_(t,e)),r=ml(t.transactionQueueTree_,e);return xT(r,i=>{mc(t,i)}),mc(t,r),z_(r,i=>{mc(t,i)}),n}function mc(t,e){const n=kr(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(C(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(C(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(ir(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?Cf(e,void 0):n.length=s+1,Pt(t.eventQueue_,Js(e),i);for(let o=0;o<r.length;o++)_i(r[o])}}/**
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
 */function JT(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function XT(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):nt(`Invalid query segment '${n}' in query '${t}'`)}return e}const fm=function(t,e){const n=ZT(t),r=n.namespace;n.domain==="firebase.com"&&un(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&un("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||cC();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new n_(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new ae(n.pathString)}},ZT=function(t){let e="",n="",r="",i="",s="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(d,u)),d<u&&(i=JT(t.substring(d,u)));const f=XT(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")n="localhost";else if(g.split(".").length<=2)n=g;else{const v=e.indexOf(".");r=e.substring(0,v).toLowerCase(),n=e.substring(v+1),s=r}"ns"in f&&(s=f.ns)}return{host:e,port:l,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
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
 */class eA{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ie(this.snapshot.exportVal())}}class tA{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class X_{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return C(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Of{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return Y(this._path)?null:d_(this._path)}get ref(){return new zt(this._repo,this._path)}get _queryIdentifier(){const e=Jh(this._queryParams),n=nf(e);return n==="{}"?"default":n}get _queryObject(){return Jh(this._queryParams)}isEqual(e){if(e=ut(e),!(e instanceof Of))return!1;const n=this._repo===e._repo,r=af(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+KC(this._path)}}class zt extends Of{constructor(e,n){super(e,n,new df,!1)}get parent(){const e=p_(this._path);return e===null?null:new zt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ui{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ae(e),r=ju(this.ref,e);return new ui(this._node.getChild(n),r,ge)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new ui(i,ju(this.ref,r),ge)))}hasChild(e){const n=new ae(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Zs(t,e){return t=ut(t),t._checkNotDeleted("ref"),e!==void 0?ju(t._root,e):t._root}function ju(t,e){return t=ut(t),q(t._path)===null?NT("child","path",e):H_("child","path",e),new zt(t._repo,Ce(t._path,e))}function nA(t){return Rf("remove",t._path),qo(t,null)}function qo(t,e){t=ut(t),Rf("set",t._path),AT("set",e,t._path);const n=new $s;return zT(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function pm(t){t=ut(t);const e=new X_(()=>{}),n=new Sl(e);return $T(t._repo,t,n).then(r=>new ui(r,new zt(t._repo,t._path),t._queryParams.getIndex()))}class Sl{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new eA("value",this,new ui(e.snapshotNode,new zt(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new tA(this,e,n):null}matches(e){return e instanceof Sl?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function rA(t,e,n,r,i){const s=new X_(n,void 0),o=new Sl(s);return BT(t._repo,t,o),()=>HT(t._repo,t,o)}function Fu(t,e,n,r){return rA(t,"value",e)}nT(zt);aT(zt);/**
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
 */const iA="FIREBASE_DATABASE_EMULATOR_HOST",Uu={};let sA=!1;function oA(t,e,n,r){t.repoInfo_=new n_(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function aA(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||un("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ze("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=fm(s,i),a=o.repoInfo,l;typeof process<"u"&&Oh&&(l=Oh[iA]),l?(s=`http://${l}?ns=${a.namespace}`,o=fm(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new wC(t.name,t.options,e);PT("Invalid Firebase Database URL",o),Y(o.path)||un("Database URL must point to the root of a Firebase Database (not including a child path).");const d=cA(a,t,c,new _C(t.name,n));return new uA(d,t)}function lA(t,e){const n=Uu[e];(!n||n[t.key]!==t)&&un(`Database ${e}(${t.repoInfo_}) has already been deleted.`),KT(t),delete n[t.key]}function cA(t,e,n,r){let i=Uu[e.name];i||(i={},Uu[e.name]=i);let s=i[t.toURLString()];return s&&un("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new jT(t,sA,n,r),i[t.toURLString()]=s,s}class uA{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(FT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new zt(this._repo,te())),this._rootInternal}_delete(){return this._rootInternal!==null&&(lA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&un("Cannot call "+e+" on a deleted database.")}}function dA(t=sv(),e){const n=Kd(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=Px("database");r&&fA(n,...r)}return n}function fA(t,e,n,r={}){t=ut(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&un("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&un('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new Ko(Ko.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:Ox(r.mockUserToken,t.app.options.projectId);s=new Ko(o)}oA(i,e,n,s)}/**
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
 */function pA(t){iC(gi),oi(new hr("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return aA(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),Mn(Dh,Mh,t),Mn(Dh,Mh,"esm2017")}/**
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
 */class hA{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function hm(t,e,n){var r;if(t=ut(t),Rf("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(r=void 0)!==null&&r!==void 0?r:!0,s=new $s,o=(l,c,d)=>{let u=null;l?s.reject(l):(u=new ui(d,new zt(t._repo,t._path),ge),s.resolve(new hA(c,u)))},a=Fu(t,()=>{});return GT(t._repo,t._path,e,o,a,i),s.promise}tn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};tn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};pA();const mA="appLabSyncRooms",gA="appLabOwners",yA="appLabRoomClaimTokens",vA="appLabRoomMembers",_A=new TextEncoder;function Z_(t){async function e(l){const c={encryptedPayload:l.encryptedPayload,readTokenHash:await Cr(l.readToken),roomId:l.roomId,updatedAt:new Date().toISOString(),version:1,writeTokenHash:await Cr(l.writeToken)};if(!await t.driver.createRoom(c,{claimToken:l.writeToken}))throw new Error(`Room already exists: ${l.roomId}`);return Io(c)}async function n(l){const c=await o(l.roomId,l.readToken);return Io(c)}async function r(l){var f;const c=await a(l.roomId);if(c.writeTokenHash!==await Cr(l.writeToken))throw new Error("Write token is not authorized for this room.");if(c.version!==l.expectedVersion)throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${c.version}.`);const d={...c,encryptedPayload:l.encryptedPayload,updatedAt:new Date().toISOString(),version:c.version+1},u=await t.driver.saveRoom({expectedVersion:l.expectedVersion,nextRecord:d,roomId:l.roomId});if(!u.ok){const g=((f=u.currentRecord)==null?void 0:f.version)??"missing";throw new Error(`Room version conflict. Expected ${l.expectedVersion}, found ${g}.`)}return Io(u.currentRecord??d)}async function i(l){const c=await a(l.roomId),d=await Cr(l.writeToken);if(c.writeTokenHash!==d)throw new Error("Write token is not authorized for this room.");if(!(await t.driver.deleteRoom({roomId:l.roomId,writeTokenHash:d})).ok)throw new Error(`Room could not be deleted: ${l.roomId}`)}function s(l){let c=!1;const d=Cr(l.readToken),u=t.driver.subscribeRoom(l.roomId,f=>{c||!f||d.then(g=>{c||f.readTokenHash!==g||l.onChange(Io(f))})});return()=>{c=!0,u()}}async function o(l,c){const d=await a(l);if(d.readTokenHash!==await Cr(c))throw new Error("Read token is not authorized for this room.");return d}async function a(l){const c=await t.driver.getRoom(l);if(!c)throw new Error(`Room not found: ${l}`);return c}return{claimRoomAccess:t.driver.claimRoomAccess,createRoom:e,deleteRoom:i,loadRoom:n,saveRoom:r,subscribeConnection:t.driver.subscribeConnection,subscribeRoom:s}}function ew(t,e={}){const n=e.accessModel??Vs,r=`app-lab-sync-${xA(`${n}:${t.databaseURL}`)}`,s=GE().find(l=>l.name===r)??iv(t,r),o=dA(s,t.databaseURL),a=nC(s);return wA(o,{auth:a,ownerSetupSecret:e.ownerSetupSecret})}function wA(t,e={}){const n=e.auth;let r=null;async function i(){if(!n)throw new Error("Firebase Auth is required for auth-v1 RTDB access.");return(n.currentUser??(await V0(n)).user).uid}async function s(){const a=await i();return e.ownerSetupSecret?(r??(r=qo(bA(t,a),{owner:!0,setupSecret:e.ownerSetupSecret}).then(()=>a,l=>{throw r=null,l})),r):a}async function o(){await s()}return{async claimRoomAccess(a){const l=await i();await qo(kA(t,a.roomId,l),{claimToken:a.claimToken,member:!0})},async createRoom(a,l){if(await s(),!(l!=null&&l.claimToken))throw new Error("Room claim token is required for auth-v1 RTDB access.");return await qo(SA(t,a.roomId),l.claimToken),(await hm(Mi(t,a.roomId),d=>{if(d===null)return a})).committed},async getRoom(a){await o();const l=await pm(Mi(t,a));return Li(l.val(),a)},async saveRoom(a){await o();let l=null;const c=await hm(Mi(t,a.roomId),d=>{const u=Li(d,a.roomId);if(l=u,!(!u||u.version!==a.expectedVersion))return l=a.nextRecord,a.nextRecord});return{currentRecord:Li(c.snapshot.val(),a.roomId)??l,ok:c.committed}},async deleteRoom(a){await o();const l=Mi(t,a.roomId),c=await pm(l),d=Li(c.val(),a.roomId);return!d||d.writeTokenHash!==a.writeTokenHash?{currentRecord:d,ok:!1}:(await nA(l),{currentRecord:null,ok:!0})},subscribeConnection(a){return o().catch(()=>{}),Fu(Zs(t,".info/connected"),l=>{a(l.val()===!0)})},subscribeRoom(a,l){let c=!1,d=null;return o().then(()=>{c||(d=Fu(Mi(t,a),u=>{l(Li(u.val(),a))}))}).catch(u=>{console.warn("Could not start Firebase room subscription.",u)}),()=>{c=!0,d==null||d()}}}}async function Cr(t){const e=await crypto.subtle.digest("SHA-256",_A.encode(t));return EA(new Uint8Array(e))}function Io(t){return{encryptedPayload:t.encryptedPayload,roomId:t.roomId,updatedAt:t.updatedAt,version:t.version}}function Mi(t,e){return Zs(t,`${mA}/${e}`)}function bA(t,e){return Zs(t,`${gA}/${e}`)}function SA(t,e){return Zs(t,`${yA}/${e}`)}function kA(t,e,n){return Zs(t,`${vA}/${e}/${n}`)}function Li(t,e){if(t==null)return null;if(!t||typeof t!="object")throw new Error(`Firebase room is malformed: ${e}`);const n=t;if(n.roomId!==e||typeof n.encryptedPayload!="string"||typeof n.readTokenHash!="string"||typeof n.updatedAt!="string"||typeof n.version!="number"||typeof n.writeTokenHash!="string")throw new Error(`Firebase room is malformed: ${e}`);return{encryptedPayload:n.encryptedPayload,readTokenHash:n.readTokenHash,roomId:n.roomId,updatedAt:n.updatedAt,version:n.version,writeTokenHash:n.writeTokenHash}}function xA(t){let e=0;for(let n=0;n<t.length;n+=1)e=e*31+t.charCodeAt(n)|0;return Math.abs(e).toString(36)}function EA(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}async function IA(t){const e=await t.queueStore.listItems();for(const n of e)n.kind==="delete-owned-app"&&(n.status==="syncing"&&!Fs(n)||await CA(t,n))}async function CA(t,e){const n=await Ls(t.queueStore,e);try{const r=await t.syncRegistry.getStorageProfile();if(!r)throw new Error("Storage profile is required before remote app rooms can be deleted.");const i=t.createProviderFromStorageProfile(r),s=await mm(i,e.syncRecord.sourceRoom),o=await mm(i,e.syncRecord.dataRoom);await mx({app:e.app,dataProvider:i,sourceProvider:i,syncRecord:{...e.syncRecord,dataRoom:o,sourceRoom:s}}),await t.queueStore.removeItem(e.id)}catch(r){await js(t.queueStore,n,r)}}async function mm(t,e){try{const n=await t.loadRoom({readToken:je(e),roomId:e.roomId});return{...e,lastSeenVersion:n.version}}catch(n){if(!RA(n))throw n;return{...e,lastSeenVersion:0}}}function RA(t){return t instanceof Error&&/(not found|found missing)/i.test(t.message)}async function TA(t){const e=await t.queueStore.listItems();for(const n of e)n.kind==="ensure-app-rooms"&&(n.status==="syncing"&&!Fs(n)||await AA(t,n))}async function AA(t,e){const n=await Ls(t.queueStore,e);try{const r=await t.syncRegistry.getStorageProfile();if(!r){await t.queueStore.removeItem(e.id);return}const i=await t.core.getApp(e.appId);if(!i){await t.queueStore.removeItem(e.id);return}const s=await t.syncRegistry.getAppSyncRecord(e.appId);if(!s||s.kind==="joined"){await t.queueStore.removeItem(e.id);return}const o=t.createProviderFromStorageProfile(r);await hx({app:i,appData:await t.core.getAppData(i.appId),provider:o,syncRecord:s});const a=await $o({provider:o,syncRecord:s});await t.syncRegistry.rememberAppRoomVersions({appId:i.appId,dataRoom:a.dataRoom,sourceRoom:a.sourceRoom}),await t.queueStore.removeItem(e.id)}catch(r){await js(t.queueStore,n,r)}}async function NA(t){const e=await t.queueStore.listItems();for(const n of e)n.kind==="save-source"&&(n.status==="syncing"&&!Fs(n)||await PA(t,n))}async function PA(t,e){const n=await Ls(t.queueStore,e);try{const r=await t.core.getApp(e.appId);if(!r){await t.queueStore.removeItem(e.id);return}const i=await t.syncRegistry.getAppSyncRecord(e.appId);if(!i){await t.queueStore.removeItem(e.id);return}const s=await t.createProviderForSyncRecord(i);if(!s)throw new Error("Storage profile is required before source can sync.");const o=await Hy({app:r,provider:s,syncRecord:i});await t.syncRegistry.rememberAppRoomVersions({appId:r.appId,sourceRoom:o}),await Ly(t.queueStore,n)}catch(r){await js(t.queueStore,n,r)}}const tw=1;function OA(t){if(!t.storageProfile)throw new Error("Storage profile is required before exporting recovery material.");if(!t.manifestRoom)throw new Error("Workspace manifest room is required before exporting recovery material.");return{createdAt:new Date().toISOString(),kind:"app-lab-workspace-recovery",manifestRoom:t.manifestRoom,provider:{accessModel:t.storageProfile.accessModel,databaseUrl:t.storageProfile.databaseUrl,firebaseConfig:t.storageProfile.firebaseConfig,ownerSetupSecret:t.storageProfile.ownerSetupSecret,profileId:t.storageProfile.profileId,provider:t.storageProfile.provider},schemaVersion:tw,workspaceState:sw(t),workspaceId:t.workspaceId}}function DA(t){return`applab-recovery:${WA(new TextEncoder().encode(JSON.stringify(t)))}`}function MA(t){const e=t.trim().replace(/^applab-recovery:/,"");let n;try{n=JSON.parse(new TextDecoder().decode(BA(e)))}catch{throw new Error("Workspace recovery material is not valid.")}return VA(n)}async function LA(t){const e=Df(t.state),n=e.lastSeenVersion===0?await UA(t.provider,e,t.state):await iw(t.provider,e,t.state,e.lastSeenVersion);return{...t.state,manifestRoom:br(e,n),updatedAt:new Date().toISOString()}}async function jA(t){if(t.recoveryMaterial.workspaceState)return gm($u(t.recoveryMaterial.workspaceState),t.recoveryMaterial);const e=await t.provider.loadRoom({readToken:je(t.recoveryMaterial.manifestRoom),roomId:t.recoveryMaterial.manifestRoom.roomId}),n=await Us({capability:t.recoveryMaterial.manifestRoom,roomType:"workspace-manifest",snapshot:e}),r=$u(n);return gm({...r,manifestRoom:br(t.recoveryMaterial.manifestRoom,e)},t.recoveryMaterial)}async function FA(t){const e=Df(t.state),n=await t.provider.loadRoom({readToken:je(e),roomId:e.roomId});return nw({snapshot:n,state:t.state})}async function nw(t){const e=Df(t.state),n=await Us({capability:e,roomType:"workspace-manifest",snapshot:t.snapshot}),r=$u(n);return{...r,manifestRoom:br(e,t.snapshot),storageProfile:r.storageProfile??t.state.storageProfile}}function gm(t,e){var n,r,i,s,o;return{...t,manifestRoom:t.manifestRoom??e.manifestRoom,storageProfile:{accessModel:e.provider.accessModel??((n=t.storageProfile)==null?void 0:n.accessModel)??Vs,createdAt:((r=t.storageProfile)==null?void 0:r.createdAt)??e.createdAt,databaseUrl:e.provider.databaseUrl,displayName:((i=t.storageProfile)==null?void 0:i.displayName)??"Firebase Realtime Database",firebaseConfig:e.provider.firebaseConfig,ownerSetupSecret:e.provider.ownerSetupSecret??((s=t.storageProfile)==null?void 0:s.ownerSetupSecret),profileId:e.provider.profileId??((o=t.storageProfile)==null?void 0:o.profileId)??`profile_${crypto.randomUUID()}`,provider:e.provider.provider,updatedAt:new Date().toISOString()}}}async function UA(t,e,n){try{return await rw(t,e,n)}catch(r){if(!(r instanceof Error)||!/already exists/i.test(r.message))throw r;const i=await t.loadRoom({readToken:je(e),roomId:e.roomId});return iw(t,e,n,i.version)}}async function rw(t,e,n){return t.createRoom({encryptedPayload:await Vu(e,n,1),readToken:je(e),roomId:e.roomId,writeToken:$n(e)})}async function iw(t,e,n,r){try{return await t.saveRoom({encryptedPayload:await Vu(e,n,r+1),expectedVersion:r,roomId:e.roomId,writeToken:$n(e)})}catch(i){if($A(i))return rw(t,e,n);if(!zA(i))throw i;const s=await t.loadRoom({readToken:je(e),roomId:e.roomId});return t.saveRoom({encryptedPayload:await Vu(e,n,s.version+1),expectedVersion:s.version,roomId:e.roomId,writeToken:$n(e)})}}function Vu(t,e,n){return Fd({data:sw(e),decryptSecret:t.decryptSecret,roomId:t.roomId,roomType:"workspace-manifest",roomVersion:n})}function sw(t){return{apps:t.apps,deletedApps:t.deletedApps,schemaVersion:t.schemaVersion,storageProfile:t.storageProfile,updatedAt:t.updatedAt,workspaceId:t.workspaceId}}function $u(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Workspace manifest payload is malformed.");const e=t;if(e.schemaVersion!==1||typeof e.workspaceId!="string"||typeof e.updatedAt!="string")throw new Error("Workspace manifest payload is unsupported.");return{apps:sr(e.apps)?e.apps:{},deletedApps:sr(e.deletedApps)?e.deletedApps:{},schemaVersion:1,storageProfile:sr(e.storageProfile)?e.storageProfile:null,updatedAt:e.updatedAt,workspaceId:e.workspaceId}}function VA(t){if(!sr(t))throw new Error("Workspace recovery material is malformed.");if(t.kind!=="app-lab-workspace-recovery"||t.schemaVersion!==tw||typeof t.workspaceId!="string"||typeof t.createdAt!="string"||!sr(t.provider)||t.provider.provider!=="firebase-rtdb"||typeof t.provider.databaseUrl!="string"||!sr(t.provider.firebaseConfig)||typeof t.provider.firebaseConfig.databaseURL!="string"||!sr(t.manifestRoom))throw new Error("Workspace recovery material is unsupported.");return t}function Df(t){if(!t.manifestRoom)throw new Error("Workspace manifest room is not configured.");return t.manifestRoom}function sr(t){return!!(t&&typeof t=="object"&&!Array.isArray(t))}function $A(t){return t instanceof Error&&/(not found|found missing)/i.test(t.message)}function zA(t){return t instanceof Error&&/room version conflict/i.test(t.message)}function WA(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function BA(t){if(!/^[A-Za-z0-9_-]+$/.test(t))throw new Error("Value is not valid base64url.");const e=t.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(t.length/4)*4,"="),n=atob(e),r=new Uint8Array(n.length);for(let i=0;i<n.length;i+=1)r[i]=n.charCodeAt(i);return r}async function HA(t){const e=await t.queueStore.listItems();for(const n of e)n.kind==="save-workspace-manifest"&&(n.status==="syncing"&&!Fs(n)||await KA(t,n))}async function KA(t,e){const n=await Ls(t.queueStore,e);try{const r=await t.syncRegistry.getStorageProfile();if(!r){await t.queueStore.removeItem(e.id);return}await t.syncRegistry.ensureWorkspaceManifestRoom();const i=await t.syncRegistry.getState();if(i.workspaceId!==e.workspaceId){await t.queueStore.removeItem(e.id);return}const s=await LA({provider:t.createProviderFromStorageProfile(r),state:i});s.manifestRoom&&await t.syncRegistry.rememberWorkspaceManifestVersion(s.manifestRoom.lastSeenVersion),await t.queueStore.removeItem(e.id)}catch(r){if(await js(t.queueStore,n,r),t.throwOnError)throw r}}function qA(t){const{core:e,queueStore:n,syncRegistry:r}=t,i=t.createProviderFromStorageProfile??YA,s=t.createProviderFromReference??QA;let o=!1,a=null,l=!1,c=null,d=!1,u=null,f=!1,g=null,v=!1,w=null;const T=new Map;async function y(S){const N=await e.getApp(S);if(!N)throw new Error("App not found.");let V=await r.getAppSyncRecord(S);if(V||(V=await r.ensureOwnedAppRooms(S)),V.kind!=="joined"){await F(),await X(),await _t(),V=await r.getAppSyncRecord(S);const J=await r.getStorageProfile();if(!J)throw new Error("Storage profile is required before sharing.");await dt(N,i(J),V)}const z=await r.createInvite(S);return await oe(),K(),z}async function m(S){const N=s(S.provider);await JA(N,S);const V=await $o({provider:N,syncRecord:{appId:"pending-import",dataProvider:S.provider,dataRoom:S.dataRoom,importedAt:new Date().toISOString(),kind:"joined",sourceProvider:S.provider,sourceRoom:S.sourceRoom}});await e.upsertApp(V.app),await e.saveAppData(V.app.appId,V.appData),await r.markJoinedApp({appId:V.app.appId,dataProvider:S.provider,dataRoom:V.dataRoom,sourceProvider:S.provider,sourceRoom:V.sourceRoom}),await oe(),K()}async function h(S){if(!await r.getAppSyncRecord(S.appId)){if(!await r.getStorageProfile())return;await r.ensureOwnedAppRooms(S.appId),await Jl(n,S.appId)}await tk(n,S),X()}async function _(S,N){eo(S);let z=await r.getAppSyncRecord(S);if(!z){if(!await r.getStorageProfile())return;z=await r.ensureOwnedAppRooms(S),await Jl(n,S)}await nk({appId:S,baseData:N,baseRemoteVersion:z.dataRoom.lastSeenVersion,data:N,roomId:z.dataRoom.roomId,store:n}),_t()}async function b(S){await r.getStorageProfile()&&(await r.ensureOwnedAppRooms(S.appId),await Jl(n,S.appId),await F(),await oe(),K())}async function E(){for(const S of await e.listApps()){await r.getAppSyncRecord(S.appId)||await r.ensureOwnedAppRooms(S.appId);const V=await e.getApp(S.appId);V&&await b(V)}await F(),await oe(),await K()}async function x(S){if(await wi(S))return{};const N=await r.getAppSyncRecord(S),V=await _e(N);if(!N||!V)return{};try{const z=await $o({provider:V,syncRecord:N});return await e.upsertApp(z.app),await e.saveAppData(z.app.appId,z.appData),await r.rememberAppRoomVersions({appId:z.app.appId,dataRoom:z.dataRoom,sourceRoom:z.sourceRoom}),await oe(),{app:z.app}}catch(z){if(!sh(z))throw z;return await r.markRemoteAppDeleted(S,z.deletedAt),await oe(),{deletedAt:z.deletedAt}}}async function k(S){const N=await r.getAppSyncRecord(S);if(!N||N.kind==="joined")return;const V=await e.getApp(S);V&&(await ek({app:V,store:n,syncRecord:N}),no())}async function A(){await r.ensureWorkspaceManifestRoom(),await F(),await X(),await _t();let S=await r.getState();if(!S.storageProfile)throw new Error("Storage profile is required.");const N=i(S.storageProfile);for(const z of await e.listApps()){const J=await e.getApp(z.appId),P=await r.getAppSyncRecord(z.appId);!J||!P||P.kind==="joined"||await dt(J,N,P)}await oe(),K(),S=await r.getState();const V=OA(S);return DA(V)}async function U(S){const N=MA(S),V=await jA({provider:s(N.provider),recoveryMaterial:N});await H(V),await r.replaceState(V),await oe(),K()}async function L(){const S=await r.getState();if(!S.storageProfile||!S.manifestRoom)return Co();const N=await FA({provider:i(S.storageProfile),state:S});return $(N)}async function ee(S){const N=await r.getState();return!N.storageProfile||!N.manifestRoom?()=>{}:i(N.storageProfile).subscribeRoom({readToken:je(N.manifestRoom),roomId:N.manifestRoom.roomId,onChange:z=>{(async()=>{try{const J=await r.getState();if(!J.storageProfile||!J.manifestRoom||z.roomId!==J.manifestRoom.roomId||z.version<=J.manifestRoom.lastSeenVersion)return;const P=await nw({snapshot:z,state:J}),D=await $(P);(D.appIdsChanged.length||D.appIdsDeleted.length)&&S(D)}catch(J){if(gc(J))return;console.warn("Could not process remote workspace manifest update.",J)}})()}})}async function ue(S,N){const V=await r.getAppSyncRecord(S),z=await _e(V);if(!V||!z)return()=>{};const J=V.dataRoom.lastSeenVersion;let P=!1;return z.subscribeRoom({readToken:je(V.dataRoom),roomId:V.dataRoom.roomId,onChange:D=>{(async()=>{try{const j=!P;P=!0;const ne=await r.getAppSyncRecord(S);if(!ne||D.version<=ne.dataRoom.lastSeenVersion||await kl(S))return;const re=await Us({capability:ne.dataRoom,roomType:"app-data",snapshot:D});await e.saveAppData(S,re);const Ae=br(ne.dataRoom,D);if(await r.rememberAppRoomVersions({appId:S,dataRoom:Ae}),await oe(),j&&J===0)return;N({data:re,version:D.version})}catch(j){if(gc(j))return;console.warn("Could not process remote app data update.",j)}})()}})}async function Te(S,N,V){const z=await r.getAppSyncRecord(S),J=await O(z);return!z||!J?()=>{}:J.subscribeRoom({readToken:je(z.sourceRoom),roomId:z.sourceRoom.roomId,onChange:P=>{(async()=>{const D=await r.getAppSyncRecord(S);if(!(!D||P.version<=D.sourceRoom.lastSeenVersion))try{if(await we(S))return;const j=await Ky({provider:J,syncRecord:D});await e.upsertApp(j.app),await r.rememberAppRoomVersions({appId:j.app.appId,sourceRoom:j.sourceRoom}),await oe(),N({app:j.app})}catch(j){if(gc(j))return;if(!sh(j)){console.warn("Could not process remote app source update.",j);return}await r.markRemoteAppDeleted(S,j.deletedAt),await oe(),V({deletedAt:j.deletedAt})}})()}})}async function Wt(S){var z;const N=await r.getStorageProfile();if(!N)return()=>{};const V=i(N);return((z=V.subscribeConnection)==null?void 0:z.call(V,S))??(()=>{})}async function dt(S,N,V){if(!V||V.kind==="joined")return;const z=await Hy({app:S,provider:N,syncRecord:V}),J=await gu({appData:await e.getAppData(S.appId),provider:N,syncRecord:{...V,sourceRoom:z}});await r.rememberAppRoomVersions({appId:S.appId,dataRoom:J,sourceRoom:z}),await oe()}async function _e(S){if(!S)return null;if(S.kind==="joined")return s(S.dataProvider);const N=await r.getStorageProfile();return N?i(N):null}async function O(S){if(!S)return null;if(S.kind==="joined")return s(S.sourceProvider);const N=await r.getStorageProfile();return N?i(N):null}async function $(S){const N=await r.getState();if(!N.storageProfile||!N.manifestRoom||!S.manifestRoom)return Co();if(S.workspaceId!==N.workspaceId)throw new Error("Remote workspace manifest belongs to a different workspace.");if(S.manifestRoom.lastSeenVersion<=N.manifestRoom.lastSeenVersion)return Co();const V=new Set,z=new Set,J=new Set;let P=!1;const D={...N,apps:{...N.apps},deletedApps:{...N.deletedApps},manifestRoom:S.manifestRoom,storageProfile:S.storageProfile??N.storageProfile,updatedAt:S.updatedAt};for(const[j,ne]of Object.entries(S.deletedApps)){if(await wi(j))continue;const re=D.apps[j];if((re==null?void 0:re.kind)==="joined"){re.remoteDeletedAt!==ne.deletedAt&&(D.apps[j]={...re,remoteDeletedAt:ne.deletedAt},V.add(j),P=!0);continue}const Ae=D.deletedApps[j];(!Ae||ne.deletedAt>Ae.deletedAt)&&(D.deletedApps[j]=ne,P=!0),re&&(delete D.apps[j],z.add(j),P=!0)}for(const[j,ne]of Object.entries(S.apps)){if(await wi(j))continue;const re=D.apps[j],Ae=await e.getApp(j);re&&Ae&&!GA(ne,re)||(D.apps[j]=ne,delete D.deletedApps[j],V.add(j),ow(ne)||J.add(j),P=!0)}return P?(await H(D,J),await r.replaceState(D),await Promise.all([...z].map(j=>e.deleteApp(j))),{appIdsChanged:[...V],appIdsDeleted:[...z]}):(await r.rememberWorkspaceManifestVersion(S.manifestRoom.lastSeenVersion),Co())}async function H(S,N){if(S.storageProfile)for(const V of Object.values(S.apps)){if(N&&!N.has(V.appId)||V.kind==="joined"&&V.sourceProvider.databaseUrl!==S.storageProfile.databaseUrl)continue;const z=i(S.storageProfile),J=await $o({provider:z,syncRecord:V});await e.upsertApp(J.app),await e.saveAppData(J.app.appId,J.appData),V.sourceRoom=J.sourceRoom,V.dataRoom=J.dataRoom}}async function F(){return a?(o=!0,a):(a=(async()=>{do o=!1,await TA({core:e,createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(o)})().finally(()=>{a=null}),a)}async function X(){return u?(d=!0,u):(u=(async()=>{do d=!1,await F(),await NA({core:e,createProviderForSyncRecord:O,queueStore:n,syncRegistry:r});while(d);await oe(),K()})().finally(()=>{u=null}),u)}async function _t(){return c?(l=!0,c):(c=(async()=>{do l=!1,await F(),await _x({createProviderForSyncRecord:_e,queueStore:n,syncRegistry:r}),await to();while(l);await oe(),K()})().finally(()=>{c=null}),c)}async function oe(){const S=await r.getState();S.storageProfile&&(await r.ensureWorkspaceManifestRoom(),await rk(n,S.workspaceId))}async function Bt(){await oe()}function wt(S){eo(S)}async function K(S={}){if(!(g&&(f=!0,await g,!S.throwOnError)))return g=(async()=>{do f=!1,await HA({createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r,throwOnError:S.throwOnError});while(f)})().finally(()=>{g=null}),g}async function ft(S){const N=await n.getItem(My(S));return(N==null?void 0:N.kind)==="save-app-data"}async function we(S){const N=await n.getItem(Dy(S));return(N==null?void 0:N.kind)==="save-source"}async function wi(S){return await ft(S)||await we(S)}async function kl(S){return await ft(S)||xl(S)}function eo(S){T.set(S,Date.now()+1500)}function xl(S){const N=T.get(S);return N?Date.now()<=N?!0:(T.delete(S),!1):!1}async function to(){await Promise.all([...T.keys()].map(async S=>{await ft(S)||T.delete(S)}))}async function no(){return w?(v=!0,w):(w=(async()=>{do v=!1,await IA({createProviderFromStorageProfile:i,queueStore:n,syncRegistry:r});while(v)})().finally(()=>{w=null}),w)}return{backUpLocalApps:E,createInvite:y,deleteSyncedAppRooms:k,ensureAppBackedUp:b,exportWorkspaceRecovery:A,flushAppDataSyncQueue:_t,flushOwnedAppDeletionQueue:no,flushWorkspaceManifestQueue:K,flushSourceSyncQueue:X,flushRoomLifecycleQueue:F,importInvite:m,noteLocalAppDataEdit:wt,pullLatestAppRooms:x,pullLatestWorkspaceManifest:L,pushAppData:_,pushAppSource:h,queueWorkspaceManifestSave:Bt,restoreWorkspaceRecovery:U,subscribeAppData:ue,subscribeAppSource:Te,subscribeStorageConnection:Wt,subscribeWorkspaceManifest:ee}}function Co(){return{appIdsChanged:[],appIdsDeleted:[]}}function GA(t,e){return t.kind!==e.kind||ow(t)&&t.remoteDeletedAt!==(e.kind==="joined"?e.remoteDeletedAt:void 0)||t.sourceRoom.roomId!==e.sourceRoom.roomId||t.dataRoom.roomId!==e.dataRoom.roomId?!0:t.sourceRoom.lastSeenVersion>e.sourceRoom.lastSeenVersion||t.dataRoom.lastSeenVersion>e.dataRoom.lastSeenVersion}function ow(t){return t.kind==="joined"&&typeof t.remoteDeletedAt=="string"}function YA(t){return Z_({driver:ew(t.firebaseConfig,{accessModel:t.accessModel,ownerSetupSecret:t.ownerSetupSecret})})}function QA(t){if(!t.firebaseConfig)throw new Error("Invite is missing Firebase config.");return Z_({driver:ew(t.firebaseConfig,{accessModel:t.accessModel,ownerSetupSecret:t.ownerSetupSecret})})}async function JA(t,e){t.claimRoomAccess&&(await t.claimRoomAccess({claimToken:$n(e.sourceRoom),roomId:e.sourceRoom.roomId}),await t.claimRoomAccess({claimToken:$n(e.dataRoom),roomId:e.dataRoom.roomId}))}function gc(t){return t instanceof Error&&/(not found|found missing)/i.test(t.message)}function XA({isOpen:t,onClearStorageProfile:e,onClose:n,onConfigureStorageProfile:r,onExportWorkspaceRecovery:i,onRestoreWorkspaceRecovery:s,storageProfile:o}){const[a,l]=R.useState("storage"),[c,d]=R.useState("setup"),[u,f]=R.useState(""),[g,v]=R.useState(()=>Vy()),[w,T]=R.useState(""),[y,m]=R.useState(""),[h,_]=R.useState(""),[b,E]=R.useState(""),[x,k]=R.useState("Ready"),[A,U]=R.useState("firebase"),[L,ee]=R.useState(()=>vm()),ue=R.useRef(!1);R.useEffect(()=>{f((o==null?void 0:o.displayName)??""),m((o==null?void 0:o.databaseUrl)??""),T(o?JSON.stringify(o.firebaseConfig,null,2):""),o!=null&&o.ownerSetupSecret&&v(o.ownerSetupSecret)},[o]),R.useEffect(()=>{if(!t){ue.current=!1;return}ue.current||(ue.current=!0,_(""),E(""),k("Ready"),U(o?"connect":"firebase"),ee(vm()))},[t,o]);const Te=hk(g);if(!t)return null;async function Wt(){k("Saving storage profile...");try{await r({accessModel:"auth-v1",databaseUrl:y,displayName:u,firebaseConfigText:w,ownerSetupSecret:g}),k("Storage profile saved. Existing owned apps now have stable sync rooms.")}catch(F){k(F instanceof Error?F.message:"Could not save storage profile.")}}async function dt(){var F;try{await((F=navigator.clipboard)==null?void 0:F.writeText(Te)),k("Firebase rules copied.")}catch{k("Could not copy rules. Select the rules text and copy it manually.")}}function _e(F){ee(X=>({...X,[F]:!X[F]}))}async function O(){if(window.confirm("Remove this storage profile from this browser? Existing app sync room references stay in the workspace metadata.")){k("Removing storage profile...");try{await e(),k("Storage profile removed from this browser.")}catch(F){k(F instanceof Error?F.message:"Could not remove storage profile.")}}}async function $(){var F;k("Saving encrypted workspace manifest...");try{const X=await i();_(X),k("Sync material ready. Treat it like a password."),(F=navigator.clipboard)==null||F.writeText(X).catch(()=>{})}catch(X){k(X instanceof Error?X.message:"Could not generate sync material.")}}async function H(){if(b.trim()){if(o){k("This browser already has a storage profile. Remove the current profile in First-time setup before syncing this device.");return}k("Restoring workspace manifest...");try{await s(b),k("Workspace synced. Apps are being hydrated from their rooms.")}catch(F){k(F instanceof Error?F.message:"Could not sync this device.")}}}return p.jsx("div",{className:"fixed inset-0 z-30 bg-app-surface",role:"presentation",children:p.jsxs("section",{className:"grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden",role:"dialog","aria-modal":"true","aria-labelledby":"settings-title",children:[p.jsx("header",{className:"border-b border-app-line bg-white/90",children:p.jsxs("div",{className:"mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3",children:[p.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-extrabold text-app-ink hover:border-app-accent",type:"button",onClick:n,children:"← Back"}),p.jsxs("div",{className:"min-w-0",children:[p.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Settings"}),p.jsx("h2",{className:"truncate text-xl font-extrabold leading-tight",id:"settings-title",children:a==="ai"?"AI config":"Storage and sync"})]})]})}),p.jsx("div",{className:"min-h-0 overflow-auto",children:p.jsxs("div",{className:"mx-auto grid min-h-full w-full max-w-5xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[190px_minmax(0,1fr)]",children:[p.jsxs("nav",{className:"flex gap-2 rounded-lg border border-app-line bg-white p-2 md:grid md:content-start","aria-label":"Settings sections",children:[p.jsx(Ro,{active:a==="storage",label:"Storage",onClick:()=>l("storage")}),p.jsx(Ro,{active:a==="ai",label:"AI",onClick:()=>l("ai")})]}),p.jsx("div",{className:"min-w-0",children:a==="ai"?p.jsxs("form",{className:"grid gap-4",children:[p.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"BuilderAI configuration will live here. It stays separate from storage so sync setup does not get mixed with model/API-key setup."}),p.jsxs("label",{className:"grid gap-2 text-sm font-extrabold text-app-muted",children:["API key",p.jsx("input",{className:"rounded-md border border-app-line px-3 py-2 text-app-ink",type:"password",autoComplete:"off",placeholder:"Stored by the future core config service"})]}),p.jsxs("label",{className:"grid gap-2 text-sm font-extrabold text-app-muted",children:["Model id",p.jsx("input",{className:"rounded-md border border-app-line px-3 py-2 text-app-ink",type:"text",placeholder:"inclusionai/ling-2.6-flash"})]}),p.jsx("button",{className:"min-h-9 justify-self-end rounded-md border border-app-line bg-slate-100 px-4 font-bold text-app-muted",type:"button",disabled:!0,children:"Save later"})]}):p.jsxs("div",{className:"grid gap-4",children:[p.jsxs("div",{className:"flex flex-wrap gap-2 rounded-lg bg-white p-1",children:[p.jsx(Ro,{active:c==="setup",label:"First-time setup",onClick:()=>d("setup")}),p.jsx(Ro,{active:c==="sync",label:"Sync device",onClick:()=>d("sync")})]}),c==="setup"?p.jsxs("div",{className:"grid gap-4",children:[p.jsxs("div",{className:"grid gap-2 text-sm leading-relaxed text-app-muted",children:[p.jsx("p",{children:"Connect your own Firebase Realtime Database to back up this browser's apps, restore them on another device, and create app invite links. Set up security before saving the profile here."}),o?p.jsxs("p",{className:"break-all rounded-md bg-emerald-50 px-3 py-2 font-mono text-xs font-bold text-emerald-800",children:["Connected to ",o.databaseUrl]}):null]}),p.jsxs("div",{className:"divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white",children:[p.jsxs(yc,{id:"firebase",number:"1",title:"Create Firebase",description:"Create the Firebase account, project, and Realtime Database.",open:A==="firebase",onOpenChange:U,children:[p.jsx(hn,{checked:L["create-account"],stepNumber:"1a",label:"Create or sign in to Firebase",detail:"Use the Google account that should own this sync storage.",onChange:()=>_e("create-account")}),p.jsx(hn,{checked:L["create-project"],stepNumber:"1b",label:"Create a Firebase project",detail:"A plain project is enough; App Lab only needs the web app config and Realtime Database.",onChange:()=>_e("create-project")}),p.jsx(hn,{checked:L["create-database"],stepNumber:"1c",label:"Create Realtime Database",detail:"Pick a region, create the database, and leave this screen open before copying details.",onChange:()=>_e("create-database")})]}),p.jsxs(yc,{id:"security",number:"2",title:"Set Security",description:"Enable anonymous users and publish the rules before App Lab connects.",open:A==="security",onOpenChange:U,children:[p.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"App Lab uses authenticated room claims for new Firebase setups. That prevents invite recipients from creating unrelated App Lab rooms in your database."}),p.jsx(hn,{checked:L["enable-auth"],stepNumber:"2a",label:"Enable Anonymous Auth",detail:"In Firebase Authentication, add Anonymous as a sign-in provider.",onChange:()=>_e("enable-auth")}),p.jsx(hn,{checked:L["paste-rules"],stepNumber:"2b",label:"Publish these Realtime Database rules",detail:"They let you create rooms and let invited people claim only the rooms in an invite.",onChange:()=>_e("paste-rules"),children:p.jsxs("div",{className:"grid gap-2",children:[p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[p.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Rules"}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-xs font-extrabold text-app-ink hover:border-app-accent",type:"button",onClick:dt,children:"Copy rules"})]}),p.jsx("pre",{className:"max-h-72 overflow-auto rounded-md border border-app-line bg-slate-50 p-3 text-xs leading-relaxed text-app-ink",children:Te})]})})]}),p.jsxs(yc,{id:"connect",number:"3",title:"Connect App Lab",description:"Paste the web app config and database URL, then save.",open:A==="connect",onOpenChange:U,children:[p.jsxs(hn,{checked:L["copy-config"],stepNumber:"3a",label:"Copy web app config object",detail:"Use the config object from Project settings. Authenticated setup requires the apiKey field.",onChange:()=>_e("copy-config"),children:[p.jsxs("label",{className:"grid gap-2 text-sm font-extrabold text-app-muted",children:["Display name",p.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent",value:u,onChange:F=>f(F.target.value),placeholder:"My Firebase project"})]}),p.jsxs("label",{className:"grid gap-2 text-sm font-extrabold text-app-muted",children:["Firebase web app config",p.jsx("textarea",{className:"min-h-28 resize-y rounded-md border border-app-line bg-white px-3 py-2 font-mono text-xs text-app-ink outline-none focus:border-app-accent",value:w,onChange:F=>T(F.target.value),placeholder:`const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "..."
};`})]})]}),p.jsx(hn,{checked:L["copy-url"],stepNumber:"3b",label:"Copy the Realtime Database URL",detail:"Use the database URL from Realtime Database, not a Storage bucket URL.",onChange:()=>_e("copy-url"),children:p.jsxs("label",{className:"grid gap-2 text-sm font-extrabold text-app-muted",children:["Firebase Realtime Database URL",p.jsx("input",{className:"min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent",value:y,onChange:F=>m(F.target.value),placeholder:"https://your-project.region.firebasedatabase.app"})]})}),p.jsx(hn,{checked:L.sync,stepNumber:"3c",label:"Ready to connect and sync",detail:"Saving the profile backs up existing local apps to the selected Firebase project.",onChange:()=>_e("sync")})]})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[p.jsx("span",{className:"text-xs font-bold text-app-muted",children:x}),p.jsxs("div",{className:"flex gap-2",children:[o?p.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:O,children:"Remove profile"}):null,p.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!y.trim(),onClick:Wt,children:"Save storage profile"})]})]})]}):p.jsxs("div",{className:"grid gap-4",children:[p.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"Sync device is for moving the whole workspace to another browser or device. Generate sync material on a device that already has this workspace, then paste it on the device you want to sync with."}),p.jsxs("div",{className:"divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white",children:[p.jsxs(ym,{number:"1",title:"Generate sync material",description:"Use this on the device that already has the workspace you want to sync.",children:[p.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs outline-none focus:border-app-accent",readOnly:!0,placeholder:"Generated workspace sync material will appear here.",value:h}),p.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!o,onClick:$,children:"Generate sync material"})]}),p.jsxs(ym,{number:"2",title:"Paste sync material",description:"Use this on the device or browser you want to sync with the existing workspace.",children:[p.jsx("textarea",{className:"min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent",placeholder:"Paste workspace sync material",value:b,onChange:F=>E(F.target.value)}),p.jsx("button",{className:"min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!b.trim(),onClick:H,children:"Sync this device"})]})]}),p.jsx("span",{className:"text-xs font-bold text-app-muted",children:x})]})]})})]})})]})})}function Ro({active:t,label:e,onClick:n}){return p.jsx("button",{className:`min-h-9 rounded-md px-3 text-sm font-extrabold ${t?"bg-app-accent text-white":"bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent"}`,type:"button",onClick:n,children:e})}function yc({children:t,description:e,id:n,number:r,onOpenChange:i,open:s,title:o}){return p.jsxs("section",{children:[p.jsxs("button",{className:"grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-app-accent/5",type:"button","aria-expanded":s,onClick:()=>i(s?null:n),children:[p.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent text-sm font-extrabold text-white",children:r}),p.jsxs("span",{className:"min-w-0",children:[p.jsx("span",{className:"block text-sm font-extrabold text-app-ink",children:o}),p.jsx("span",{className:"block text-sm leading-relaxed text-app-muted",children:e})]}),p.jsx("span",{className:"text-xl leading-none text-app-muted","aria-hidden":"true",children:s?"−":"+"})]}),s?p.jsx("div",{className:"grid gap-4 px-4 pb-4",children:t}):null]})}function hn({checked:t,children:e,detail:n,label:r,onChange:i,stepNumber:s}){return p.jsxs("div",{className:"grid grid-cols-[2rem_minmax(0,1fr)_2.25rem] gap-4 border-t border-app-line py-4 text-sm leading-relaxed first:border-t-0 first:pt-0",children:[p.jsx("span",{className:"pt-0.5 font-mono text-xs font-extrabold text-app-muted",children:s}),p.jsxs("div",{className:"grid min-w-0 gap-3",children:[p.jsxs("span",{className:"grid gap-1",children:[p.jsx("span",{className:`block font-extrabold ${t?"text-app-muted line-through decoration-2":"text-app-ink"}`,children:r}),p.jsx("span",{className:`block ${t?"text-app-muted/80 line-through":"text-app-muted"}`,children:n})]}),e?p.jsx("div",{className:"grid gap-3",children:e}):null]}),p.jsxs("label",{className:"grid h-8 min-h-8 w-8 cursor-pointer place-items-center self-center justify-self-end",title:r,children:[p.jsx("input",{"aria-label":r,className:"peer sr-only",type:"checkbox",checked:t,onChange:i}),p.jsx("span",{className:"grid h-5 min-h-5 w-5 place-items-center rounded-full border-2 border-app-line text-[11px] font-extrabold leading-none text-white peer-checked:border-app-accent peer-checked:bg-app-accent",children:t?"✓":""})]})]})}function ym({children:t,description:e,number:n,title:r}){return p.jsxs("section",{className:"grid grid-cols-[2rem_minmax(0,1fr)] gap-4 px-4 py-4 text-sm leading-relaxed",children:[p.jsx("span",{className:"grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent text-sm font-extrabold text-white",children:n}),p.jsxs("div",{className:"grid min-w-0 gap-3",children:[p.jsxs("div",{className:"grid gap-1",children:[p.jsx("h3",{className:"font-extrabold text-app-ink",children:r}),p.jsx("p",{className:"text-app-muted",children:e})]}),p.jsx("div",{className:"grid gap-3",children:t})]})]})}function vm(){return{"copy-config":!1,"copy-url":!1,"create-account":!1,"create-database":!1,"create-project":!1,"enable-auth":!1,"paste-rules":!1,sync:!1}}function ZA({activeApp:t,consoleEntries:e,mode:n,onClearConsole:r,onClose:i,onLoadAppData:s,onSaveSource:o}){const a=n!==null,l=n==="source"?"Source":n==="builder"?"BuilderAI":n==="console"?"Console":"App tools";return p.jsxs("aside",{className:`fixed bottom-11 right-0 z-20 grid h-[min(74svh,620px)] w-full grid-rows-[44px_minmax(0,1fr)] overflow-hidden border-t border-app-line bg-app-panel shadow-panel transition-transform duration-200 lg:bottom-0 lg:top-11 lg:h-auto lg:w-[min(420px,36vw)] lg:border-l lg:border-t-0 ${a?"translate-y-0 lg:translate-x-0":"translate-y-[calc(100%+44px)] lg:translate-x-full lg:translate-y-0"}`,"aria-label":l,"aria-hidden":!a,children:[p.jsxs("header",{className:"flex min-h-0 items-center justify-between gap-3 border-b border-app-line px-3",children:[p.jsxs("div",{className:"min-w-0",children:[p.jsx("p",{className:"m-0 truncate text-[11px] font-extrabold uppercase text-app-muted",children:t.name}),p.jsx("h2",{className:"truncate text-base font-extrabold leading-tight",children:l})]}),p.jsx("button",{className:"min-h-8 w-8 rounded-full border border-transparent bg-transparent p-0 text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Close ${l}`,onClick:i,children:"×"})]}),n==="source"?p.jsx(eN,{app:t,onLoadAppData:s,onSaveSource:o}):n==="console"?p.jsx(iN,{entries:e,onClear:r}):p.jsx(rN,{app:t})]})}function eN({app:t,onLoadAppData:e,onSaveSource:n}){const[r,i]=R.useState(t.sourceCode),[s,o]=R.useState(!1),[a,l]=R.useState(!0),[c,d]=R.useState(!1),[u,f]=R.useState(""),[g,v]=R.useState(""),[w,T]=R.useState(""),[y,m]=R.useState("Ready"),[h,_]=R.useState("Ready");R.useEffect(()=>{i(t.sourceCode),m("Ready"),l(!0),d(!1),f(""),v(""),T(""),_("Ready")},[t.appId,t.sourceCode]);async function b(){m("Saving...");try{await n(r),m("Saved.")}catch(L){m(L instanceof Error?L.message:"Could not save.")}}async function E(){_("Loading data...");try{const L=await e(t.appId),ee=JSON.stringify(L,null,2);return f(ee),_("Data loaded."),ee}catch(L){return _(L instanceof Error?L.message:"Could not load app data."),null}}async function x(L,ee){if(!L){_(`No ${ee} to copy.`);return}try{await Mf(navigator.clipboard.writeText(L),1500),v(""),T(""),_("Copied.")}catch{v(L),T(ee),_("Select and copy manually.")}}async function k(){const L=u||await E();L&&await x(L,"app data")}async function A(L){d(L),L&&!u&&await E()}async function U(){if(!a&&!c){_("Select at least one export.");return}const L=[];if(a&&L.push({contents:r,kind:"source"}),c){const ue=u||await E();if(!ue)return;L.push({contents:ue,kind:"data"})}const ee=L.filter(ue=>nN(ue.contents,vc(t.name,ue.kind),tN(ue.kind))).length;_(ee===L.length?"Download started.":"Download is unavailable.")}return p.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto_auto] bg-[#111827]",children:[p.jsx("div",{className:"min-h-0 bg-[#111827]",children:p.jsx("textarea",{className:"h-full min-h-0 w-full resize-none border-0 bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 outline-none [tab-size:2]",spellCheck:!1,value:r,onChange:L=>{i(L.target.value),m("Unsaved changes")}})}),s?p.jsxs("div",{className:"grid gap-3 border-t border-app-line bg-app-panel p-3",children:[p.jsxs("fieldset",{className:"grid gap-2",children:[p.jsx("legend",{className:"sr-only",children:"Export files"}),p.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[p.jsx("input",{checked:a,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:L=>l(L.target.checked)}),p.jsxs("span",{className:"min-w-0",children:[p.jsx("span",{className:"block",children:"Source code"}),p.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:vc(t.name,"source")})]})]}),p.jsxs("label",{className:"flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink",children:[p.jsx("input",{checked:c,className:"h-4 w-4 accent-app-accent",type:"checkbox",onChange:L=>void A(L.target.checked)}),p.jsxs("span",{className:"min-w-0",children:[p.jsx("span",{className:"block",children:"App data"}),p.jsx("span",{className:"block truncate text-xs font-bold text-app-muted",children:vc(t.name,"data")})]})]})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[p.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:()=>void U(),children:"Download selected"}),p.jsxs("div",{className:"flex flex-wrap gap-2",children:[c?p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void E(),children:"Refresh data"}):null,p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void x(r,"source code"),children:"Copy source"}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>void k(),children:"Copy data"})]})]}),g?p.jsx("textarea",{"aria-label":`${w} export`,className:"h-32 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:g,onFocus:L=>L.target.select()}):null,p.jsx("div",{className:"text-xs font-bold text-app-muted",children:h})]}):null,p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[p.jsx("div",{className:"text-xs font-bold text-app-muted",children:y}),p.jsxs("div",{className:"flex gap-2",children:[p.jsxs("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>o(L=>!L),children:["Export ",s?"↓":"↑"]}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:b,children:"Save"})]})]})]})}function vc(t,e){const r=t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)||"untitled-app";return e==="source"?`${r}.html`:`${r}.data.json`}function tN(t){return t==="source"?"text/html;charset=utf-8":"application/json;charset=utf-8"}function nN(t,e,n){if(typeof window.URL.createObjectURL!="function")return!1;const r=window.URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement("a");return i.href=r,i.download=e,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>{typeof window.URL.revokeObjectURL=="function"&&window.URL.revokeObjectURL(r)},0),!0}function rN({app:t}){const[e,n]=R.useState(!1),[r,i]=R.useState("Ready"),s=R.useMemo(()=>sN(t.name,t.sourceCode),[t.name,t.sourceCode]),o="builder-prompt-code";R.useEffect(()=>{n(!1),i("Ready")},[t.appId]);async function a(){try{await Mf(navigator.clipboard.writeText(s),1500),i("Copied.")}catch{n(!0),i("Select and copy manually.")}}return p.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto]",children:[p.jsx("div",{className:"min-h-0 overflow-auto",children:p.jsx("ol",{className:"flex flex-col gap-3 p-3","aria-live":"polite",children:p.jsx("li",{className:"rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm leading-relaxed text-app-muted",children:"The AI bot is still being built, but use the button below to copy prompt + code and use it in another AI."})})}),p.jsxs("form",{className:"grid gap-2 border-t border-app-line p-3",children:[p.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2",children:[p.jsx("label",{className:"sr-only",htmlFor:"builder-message",children:"Message"}),p.jsx("textarea",{className:"max-h-36 min-h-11 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink",id:"builder-message",rows:2,placeholder:"Ask BuilderAI to change this app"}),p.jsx("button",{className:"grid h-10 min-h-10 w-10 place-items-center rounded-full border border-app-accent bg-app-accent p-0 text-xl font-bold text-white hover:bg-app-strong",type:"button","aria-label":"Send message",children:"↑"})]}),e?p.jsxs("div",{className:"grid gap-2 rounded-md border border-app-line bg-app-panel p-2",id:o,children:[p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[p.jsx("div",{className:"text-xs font-bold text-app-muted",children:r}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:a,children:"Copy"})]}),p.jsx("textarea",{"aria-label":"Prompt and code",className:"h-40 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink",readOnly:!0,value:s,onFocus:l=>l.target.select()})]}):null,p.jsxs("button",{"aria-controls":o,"aria-expanded":e,className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{n(l=>!l),i("Ready")},children:["Copy prompt + code ",e?"↓":"↑"]})]})]})}function iN({entries:t,onClear:e}){const[n,r]=R.useState("Ready"),i=R.useMemo(()=>oN(t),[t]);async function s(){if(!i){r("No output");return}try{await Mf(navigator.clipboard.writeText(i),1500),r("Copied.")}catch{r("Select and copy manually.")}}return p.jsxs("div",{className:"grid min-h-0 grid-rows-[minmax(0,1fr)_auto] bg-slate-950",children:[p.jsx("div",{className:"min-h-0 overflow-auto p-3 font-mono text-xs leading-relaxed text-slate-200",children:t.length?p.jsx("ol",{className:"select-text space-y-4",children:t.map(o=>p.jsxs("li",{className:"whitespace-pre-wrap break-words",children:[p.jsxs("span",{className:"text-slate-500",children:["[",aw(o.timestamp),"] "]}),p.jsx("span",{className:`font-extrabold ${aN(o.level)}`,children:o.level.toUpperCase()}),p.jsxs("span",{children:[" ",o.args.join(" ")||"(empty)"]})]},o.id))}):p.jsx("p",{className:"select-text text-slate-400",children:"No console output yet."})}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2",children:[p.jsx("div",{className:"text-xs font-bold text-app-muted",children:n}),p.jsxs("div",{className:"flex gap-2",children:[p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>{e(),r("Cleared.")},children:"Clear"}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong",type:"button",onClick:s,children:"Copy"})]})]})]})}function Mf(t,e){return new Promise((n,r)=>{const i=window.setTimeout(()=>r(new Error("Timed out.")),e);t.then(s=>{window.clearTimeout(i),n(s)},s=>{window.clearTimeout(i),r(s)})})}function sN(t,e){return`You are helping me edit an App Lab sandbox app named "${t}".

Return one complete single-file HTML document. Use inline JavaScript, host-compiled Tailwind classes, Alpine.js, and minimal inline CSS only when Tailwind cannot express a rule.

App Lab provides the runtime:
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
- Do not use raw postMessage unless the user explicitly asks for low-level App Lab runtime code.

Please rewrite the app as requested, returning only the complete HTML document.

Current app code:

\`\`\`html
${e}
\`\`\`
`}function oN(t){return t.map(e=>{const n=e.args.join(" ")||"(empty)";return`[${aw(e.timestamp)}] ${e.level.toUpperCase()} ${n}`}).join(`

`)}function aw(t){return new Intl.DateTimeFormat(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date(t))}function aN(t){return t==="error"?"text-red-400":t==="warn"?"text-amber-300":t==="info"?"text-sky-300":t==="debug"?"text-violet-300":"text-slate-100"}function lN({core:t,syncActionsOverride:e,syncQueueStore:n,syncRegistry:r}){const[i,s]=R.useState([]),[o,a]=R.useState({}),[l,c]=R.useState({}),[d,u]=R.useState(null),[f,g]=R.useState(null),[v,w]=R.useState(null),[T,y]=R.useState("launcher"),[m,h]=R.useState(null),[_,b]=R.useState(!1),[E,x]=R.useState(null),[k,A]=R.useState(null),[U,L]=R.useState(null),[ee,ue]=R.useState(0),[Te,Wt]=R.useState(!0),[dt,_e]=R.useState([]),[O,$]=R.useState(null),[H,F]=R.useState(!1),[X,_t]=R.useState(0),oe=R.useRef(navigator.onLine),Bt=R.useRef(null),wt=R.useMemo(()=>qA({core:t,queueStore:n,syncRegistry:r}),[t,n,r]),K=e??wt;function ft(){return oe.current&&Bt.current!==!1}R.useEffect(()=>{we(ft())},[]),R.useEffect(()=>{let P=!1,D=null,j=null;async function ne(Lf=ft()){try{if(!Lf){P||await we(!1);return}await K.flushRoomLifecycleQueue(),await K.flushSourceSyncQueue(),await K.flushAppDataSyncQueue(),await K.flushOwnedAppDeletionQueue(),await K.flushWorkspaceManifestQueue(),await K.pullLatestWorkspaceManifest(),P||await we(!0)}catch(bi){const fw=bi instanceof Error?bi.message:"Unknown sync error.";P||$(`Could not retry pending sync: ${fw}`)}}function re(){document.visibilityState==="visible"&&ne(ft())}function Ae(){oe.current=!0,ne(ft())}function xr(){oe.current=!1,we(!1)}async function dw(){if(await ik(n),!await r.getStorageProfile()){ne(ft());return}D=await K.subscribeStorageConnection(bi=>{Bt.current=bi,bi?ne(ft()):we(!1)}),j=await K.subscribeWorkspaceManifest(()=>{P||we(ft())})}return Bt.current=null,dw(),window.addEventListener("online",Ae),window.addEventListener("offline",xr),document.addEventListener("visibilitychange",re),()=>{P=!0,D==null||D(),j==null||j(),window.removeEventListener("online",Ae),window.removeEventListener("offline",xr),document.removeEventListener("visibilitychange",re)}},[d==null?void 0:d.profileId,d==null?void 0:d.databaseUrl,K,n,r,f]),R.useEffect(()=>{function P(){try{A(Nk(window.location.hash))}catch{A(null)}}return P(),window.addEventListener("hashchange",P),()=>window.removeEventListener("hashchange",P)},[]),R.useEffect(()=>{if(!v)return;const P=v;let D=null,j=!1;async function ne(){const re=await K.subscribeAppData(P.appId,({data:Ae,version:xr})=>{j||L({data:Ae,id:crypto.randomUUID(),version:xr})});j?re():D=re}return ne(),()=>{j=!0,D==null||D()}},[v==null?void 0:v.appId,K]),R.useEffect(()=>{if(!v)return;const P=v;let D=null,j=!1;async function ne(){const re=await K.subscribeAppSource(P.appId,({app:Ae})=>{j||(w(Ae),$(null),we())},()=>{j||($("This shared app was deleted by its owner."),we())});j?re():D=re}return ne(),()=>{j=!0,D==null||D()}},[v==null?void 0:v.appId,K]);async function we(P=ft()){var Ae;const D=await t.listApps(),j=await r.listAppSyncBadges(D.map(xr=>xr.appId)),ne=await n.listItems();s(D),a(j),c(fN({apps:D,badges:j,isOnline:P,queueItems:ne}));const re=await r.getState();u(re.storageProfile),g(((Ae=re.manifestRoom)==null?void 0:Ae.roomId)??null)}async function wi(P){const D=await t.getApp(P);D&&(w(D),y("app"),h(null),_e([]),F(!1),ue(j=>j+1),Wt(!1),V(P))}async function kl(P){let D={},j=null;try{D=await th(P.sourceCode)}catch(re){const Ae=re instanceof Error?re.message:"Unknown Tailwind compile error.";j=`${P.name} created without compiled Tailwind CSS: ${Ae}`}const ne=await t.createApp({...P,...D});await z("App created locally. Remote backup failed",()=>K.ensureAppBackedUp(ne)),j&&$(j),J(K.flushRoomLifecycleQueue()),await we(),w(ne),y("app"),h(null),_e([]),F(!1),ue(re=>re+1),Wt(!1)}async function eo(){await kl(Oy())}function xl(){y("launcher"),h(null)}function to(P){P==="builder"&&Wt(!0),h(D=>D===P?null:P)}const no=R.useMemo(()=>T==="launcher"?"App Lab":(v==null?void 0:v.name)??"App",[v==null?void 0:v.name,T]),S=v?l[v.appId]:void 0,N=O?{kind:"problem",label:"",title:O,tone:"attention"}:S;return p.jsxs("div",{className:"grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden lg:min-h-dvh",children:[p.jsxs("header",{className:"grid grid-cols-[88px_minmax(0,1fr)_112px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]",children:[p.jsx("div",{className:"justify-self-start",children:T==="app"?p.jsx("button",{className:"min-h-9 rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10",type:"button",onClick:xl,children:"‹ Apps"}):null}),p.jsx("h1",{className:"max-w-[50vw] truncate text-center text-[17px] font-extrabold",children:no}),p.jsxs("nav",{className:"relative flex items-center justify-end gap-1 lg:gap-3","aria-label":"Workspace actions",children:[T==="app"&&N&&N.kind!=="none"?p.jsx(cw,{health:N,onReload:O?()=>{_t(P=>P+1),$(null),F(!1)}:void 0,open:H,onOpenChange:F,popoverAlign:"right"}):null,T==="app"&&v?p.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":`Share ${v.name}`,title:"Share",onClick:()=>x(v),children:p.jsx(lw,{className:"h-5 w-5"})}):null,p.jsx("button",{className:"grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Open settings",onClick:()=>b(!0),children:"⚙"}),T==="app"&&v?p.jsx("div",{className:"hidden lg:block",children:p.jsx(_m,{activeTool:m,aiAttentionDismissed:Te,aiAttentionKey:ee,consoleCount:dt.length,onToggleTool:to})}):null]})]}),p.jsx("main",{className:`min-h-0 overflow-hidden ${m?"lg:mr-[min(420px,36vw)]":""}`,children:T==="launcher"?p.jsx(cN,{apps:i,onDeleteApp:async P=>{await K.deleteSyncedAppRooms(P),await t.deleteApp(P),await r.removeLocalAppSync(P),await K.queueWorkspaceManifestSave(),K.flushWorkspaceManifestQueue(),await we()},onOpenApp:wi,onShareApp:P=>x(P),storageProfile:d,syncBadges:o,syncHealth:l}):v?p.jsx(_N,{app:v,core:t,reloadKey:X,remoteDataChange:U,onConsoleEntry:P=>{_e(D=>[...D.slice(-199),P])},onSaveAppData:async(P,D)=>{L(null),K.noteLocalAppDataEdit(P),await t.saveAppData(P,D),await z("App data saved locally. Remote data sync failed",()=>K.pushAppData(P,D)),J(K.flushAppDataSyncQueue()),await we()},onUnhandledRemoteDataChange:()=>{$("Remote data changed. This app does not handle live updates yet; reopen it to reload latest data.")}}):null}),T==="app"&&v?p.jsxs(p.Fragment,{children:[p.jsx("footer",{className:"sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden",children:p.jsx(_m,{activeTool:m,aiAttentionDismissed:Te,aiAttentionKey:ee,consoleCount:dt.length,onToggleTool:to})}),p.jsx(ZA,{activeApp:v,consoleEntries:dt,mode:m,onClearConsole:()=>_e([]),onClose:()=>h(null),onLoadAppData:t.getAppData,onSaveSource:async P=>{const D=await th(P),j=await t.updateApp({appId:v.appId,sourceCode:P,...D});await z("Source saved locally. Remote source sync failed",()=>K.pushAppSource(j)),J(K.flushSourceSyncQueue()),w(j),_e([]),await we()}})]}):T==="launcher"?p.jsx(p.Fragment,{children:p.jsx("button",{className:"fixed bottom-5 right-5 z-20 grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong",type:"button","aria-label":"Create new app",onClick:eo,children:"+"})}):null,p.jsx(XA,{isOpen:_,storageProfile:d,onClearStorageProfile:async()=>{await r.clearStorageProfile(),await we()},onClose:()=>b(!1),onConfigureStorageProfile:async P=>{await r.configureStorageProfile(P),await z("Storage configured locally. Remote backup failed",()=>K.backUpLocalApps()),await we()},onExportWorkspaceRecovery:async()=>K.exportWorkspaceRecovery(),onRestoreWorkspaceRecovery:async P=>{await K.restoreWorkspaceRecovery(P),window.setTimeout(()=>void we(),0)}}),p.jsx(mN,{app:E,onClose:()=>x(null),onOpenStorageSettings:()=>{x(null),b(!0)},onCreateInvite:async P=>{const D=await K.createInvite(P);return await we(),D},storageProfile:d}),p.jsx(gN,{invite:k,onClose:()=>{A(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)},onImport:async P=>{await K.importInvite(P),await we(),A(null),window.location.hash.startsWith("#applab-invite=")&&history.replaceState(null,"",window.location.pathname+window.location.search)}})]});async function V(P){await z("Could not pull latest shared app",async()=>{const D=await K.pullLatestAppRooms(P);if(D.deletedAt)throw new Error("This shared app was deleted by its owner.");D.app&&w(D.app)}),await we()}async function z(P,D){try{await D(),$(null)}catch(j){const ne=j instanceof Error?j.message:"Unknown sync error.";$(`${P}: ${ne}`)}}function J(P){P.finally(()=>{we()})}}function _m({activeTool:t,aiAttentionDismissed:e,aiAttentionKey:n,consoleCount:r,onToggleTool:i}){const s=!e&&t!=="builder";return p.jsxs("div",{className:"flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1",role:"group","aria-label":"App tools",children:[p.jsxs("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-accent ${t==="console"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle console",onClick:()=>i("console"),children:["Log",r>0?p.jsx("span",{className:"absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white shadow-sm",children:r>99?"99+":r}):null]}),p.jsx("button",{className:`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-mono font-bold text-app-muted hover:text-app-accent ${t==="source"?"text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent":""}`,type:"button","aria-label":"Toggle source",onClick:()=>i("source"),children:"<>"}),p.jsxs("button",{className:`relative min-h-0 overflow-hidden rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-violet ${t==="builder"?"text-app-violet after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-violet":""}`,type:"button","aria-label":"Toggle BuilderAI",onClick:()=>i("builder"),children:[s?p.jsx("svg",{className:"pointer-events-none absolute inset-0 h-full w-full",viewBox:"0 0 100 36",preserveAspectRatio:"none","aria-hidden":"true",children:p.jsx("rect",{className:"ai-snake-path",x:"2",y:"2",width:"96",height:"32",rx:"6",ry:"6",pathLength:"100",fill:"none",stroke:"#8b5cf6",strokeLinecap:"round"},n)}):null,p.jsx("span",{className:`relative z-10 ${s?"animate-ai-text-shimmer":""}`,children:"AI ✦"},n)]})]})}function cN({apps:t,onDeleteApp:e,onOpenApp:n,onShareApp:r,storageProfile:i,syncBadges:s,syncHealth:o}){const[a,l]=R.useState(null);return p.jsxs("section",{className:"mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24","aria-label":"Apps",children:[p.jsxs("div",{className:"mb-5 flex flex-wrap items-end justify-between gap-5",children:[p.jsxs("div",{children:[p.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Workspace"}),p.jsx("h2",{className:"text-[clamp(24px,4vw,38px)] font-extrabold leading-none",children:"Choose an app"})]}),p.jsx("div",{className:"flex flex-wrap items-center justify-end gap-2",children:p.jsx("span",{className:"rounded-full border border-app-line bg-white px-3 py-1 text-xs font-extrabold uppercase text-app-muted",children:i?`Storage: ${i.displayName}`:"Local only"})})]}),t.length?p.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3",children:t.map(c=>p.jsx(uN,{app:c,onOpenActions:()=>l(c),onOpen:()=>n(c.appId),onShare:()=>r(c),syncBadge:s[c.appId]??{kind:"local-only",label:"Private",tone:"neutral"},syncHealth:o[c.appId]??{kind:"none",label:"",title:"",tone:"neutral"}},c.appId))}):p.jsx("div",{className:"rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted",children:"No apps yet. Use the + button to create the example app."}),p.jsx(yN,{app:a,onClose:()=>l(null),onDeleteApp:async c=>{await e(c),l(null)},syncBadge:a?s[a.appId]:void 0})]})}function uN({app:t,onOpenActions:e,onOpen:n,onShare:r,syncBadge:i,syncHealth:s}){const o=i.kind==="needs-attention";return p.jsxs("article",{className:`relative grid min-h-32 content-start gap-3 rounded-lg border border-app-line bg-app-surface/95 p-4 text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white ${o?"opacity-75":""}`,children:[p.jsx("button",{className:"absolute right-3 top-3 grid h-8 min-h-8 w-8 place-items-center rounded-md border border-transparent bg-white/80 text-base text-app-muted hover:border-app-accent hover:text-app-accent",type:"button","aria-label":`Open app actions for ${t.name}`,title:"App actions",onClick:e,children:p.jsxs("svg",{className:"h-4 w-4","aria-hidden":"true",viewBox:"0 0 24 24",fill:"currentColor",children:[p.jsx("path",{d:"M4.2 19.8 6.4 14.1 9.9 17.6 4.2 19.8Z"}),p.jsx("path",{d:"M8.1 12.4 13.4 7.1 16.9 10.6 11.6 15.9Z"}),p.jsx("path",{d:"M15.1 5.4 17.4 3.1 20.9 6.6 18.6 8.9Z"})]})}),p.jsxs("button",{className:"grid gap-2 pr-9 text-left disabled:cursor-default",type:"button",disabled:o,onClick:n,children:[p.jsx("strong",{className:`text-lg leading-tight ${o?"line-through decoration-2":""}`,children:t.name}),p.jsx("span",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:t.description})]}),p.jsxs("div",{className:"flex flex-wrap gap-2",children:[p.jsxs("span",{className:`rounded-full px-2 py-1 text-[11px] font-extrabold uppercase ${dN(i.tone)}`,title:o?"The owner deleted this shared app. You can remove this local entry from app actions.":void 0,children:[i.label,o?" ⓘ":""]}),s.kind!=="none"?p.jsx(cw,{health:s,popoverAlign:"left"}):null]}),p.jsxs("div",{className:"mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3",children:[p.jsx("span",{className:"truncate text-xs font-bold text-app-muted",children:uw(t.updatedAt)}),p.jsxs("div",{className:"flex gap-2",children:[p.jsxs("button",{className:"inline-flex min-h-8 items-center gap-1.5 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:o,onClick:r,children:[p.jsx(lw,{className:"h-4 w-4"}),"Share"]}),p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50",type:"button",disabled:o,onClick:n,children:"Open"})]})]})]})}function lw({className:t}){return p.jsxs("svg",{className:t,"aria-hidden":"true",viewBox:"0 0 24 24",fill:"none",children:[p.jsx("path",{d:"M8.1 10.7 15.6 6.6M8.1 13.3l7.5 4.1",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),p.jsx("circle",{cx:"6",cy:"12",r:"2.4",fill:"currentColor"}),p.jsx("circle",{cx:"18",cy:"5.5",r:"2.4",fill:"currentColor"}),p.jsx("circle",{cx:"18",cy:"18.5",r:"2.4",fill:"currentColor"})]})}function dN(t){return t==="good"?"bg-emerald-50 text-emerald-700":t==="shared"?"bg-violet-50 text-violet-700":t==="attention"?"bg-amber-50 text-amber-800":"bg-slate-100 text-app-muted"}function fN(t){return Object.fromEntries(t.apps.map(e=>{const n=t.badges[e.appId],r=t.queueItems.filter(i=>i.appId===e.appId);return[e.appId,pN({badge:n,isOnline:t.isOnline,items:r})]}))}function pN(t){var n,r;if(((n=t.badge)==null?void 0:n.kind)==="local-only")return{kind:"none",label:"",title:"",tone:"neutral"};if(((r=t.badge)==null?void 0:r.kind)==="needs-attention")return{kind:"problem",label:"",title:"This shared app was deleted by its owner. You can remove this local entry from app actions.",tone:"attention"};if(!t.items.length)return{kind:"synced",label:"☁ ✓",title:"Synced with remote storage.",tone:"good"};if(!t.isOnline)return{kind:"offline",label:"☁ ×",title:"Offline. Local changes are saved and will sync when the browser comes back online.",tone:"attention"};const e=t.items.find(i=>i.lastError||i.status==="problem");return e?{kind:"problem",label:"☁ !",title:`Could not sync ${hN(e.kind)}. App Lab will retry when sync wakes up. ${e.lastError??""}`.trim(),tone:"attention"}:t.items.some(i=>i.status==="syncing")?{kind:"syncing",label:"☁ …",title:"Syncing local changes to remote storage.",tone:"working"}:{kind:"pending",label:"☁ …",title:"Local changes are queued for remote sync.",tone:"working"}}function cw({health:t,onOpenChange:e,onReload:n,open:r,popoverAlign:i="right"}){const[s,o]=R.useState(!1),a=r??s,l=e??o,c=t.kind==="synced"?"text-emerald-600 hover:bg-emerald-50":t.kind==="pending"||t.kind==="syncing"?"text-blue-600 hover:bg-blue-50":t.kind==="offline"?"text-slate-500 hover:bg-slate-100":"text-red-600 hover:bg-red-50",d=t.kind==="synced"?"border-emerald-100":t.kind==="pending"||t.kind==="syncing"?"border-blue-100":t.kind==="offline"?"border-slate-200":"border-red-100";return p.jsxs("div",{className:"relative inline-grid place-items-center",children:[p.jsx("button",{"aria-label":`Open sync status: ${t.title}`,className:`grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent ${c}`,title:t.title,type:"button",onClick:()=>l(!a),children:p.jsx(wm,{kind:t.kind})}),a?p.jsxs("div",{className:`absolute top-10 z-40 grid w-72 gap-3 rounded-lg border ${d} bg-white p-3 text-left text-app-ink shadow-panel ${i==="left"?"left-0":"right-0"}`,children:[p.jsxs("div",{className:"flex items-start gap-3",children:[p.jsx("div",{className:c.replace(/hover:[^ ]+/g,""),children:p.jsx(wm,{kind:t.kind})}),p.jsxs("div",{className:"grid gap-1",children:[p.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Sync status"}),p.jsx("p",{className:"text-sm font-bold leading-snug",children:t.title})]})]}),p.jsxs("div",{className:"flex items-center justify-end gap-2",children:[p.jsx("button",{className:"min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:()=>l(!1),children:"Close"}),n?p.jsx("button",{"aria-label":"Reload app",className:"grid h-8 min-h-8 w-8 place-items-center rounded-md border border-app-accent bg-app-accent text-lg font-bold text-white hover:bg-app-strong",title:"Reload app",type:"button",onClick:n,children:"↻"}):null]})]}):null]})}function wm({kind:t}){return p.jsxs("svg",{"aria-hidden":"true",className:"block h-7 w-7",viewBox:"0 0 64 64",children:[p.jsx("path",{d:"M20 46h26a12 12 0 0 0 1.2-23.9A17 17 0 0 0 15.5 27.5 9.5 9.5 0 0 0 20 46Z",fill:"#f8fafc",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.8"}),t==="synced"?p.jsx("path",{d:"m25 35 5 5 10-12",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,t==="pending"?p.jsxs(p.Fragment,{children:[p.jsx("circle",{className:"cloud-sync-dot-one",cx:"27",cy:"36",fill:"currentColor",r:"2.4"}),p.jsx("circle",{className:"cloud-sync-dot-two",cx:"32",cy:"36",fill:"currentColor",r:"2.4"}),p.jsx("circle",{className:"cloud-sync-dot-three",cx:"37",cy:"36",fill:"currentColor",r:"2.4"})]}):null,t==="syncing"?p.jsxs("g",{className:"cloud-sync-spin",children:[p.jsx("path",{d:"M37.7 27.3a8 8 0 0 1 2.1 8.8",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),p.jsx("path",{d:"M24 33a8 8 0 0 1 13.7-5.7",fill:"none",opacity:"0.58",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),p.jsx("path",{d:"M26.4 38.7A8 8 0 0 1 24 33",fill:"none",opacity:"0.24",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"})]}):null,t==="offline"?p.jsx("path",{d:"M17 17 47 47",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}):null,t==="problem"?p.jsxs(p.Fragment,{children:[p.jsx("path",{d:"M32 21.8v9.4",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.4"}),p.jsx("circle",{cx:"32",cy:"38.8",fill:"currentColor",r:"2.4"})]}):null]})}function hN(t){return t==="ensure-app-rooms"?"app rooms":t==="save-source"?"source code":t==="save-app-data"?"app data":t==="delete-owned-app"?"app deletion":"workspace manifest"}function mN({app:t,onClose:e,onCreateInvite:n,onOpenStorageSettings:r,storageProfile:i}){const[s,o]=R.useState(""),[a,l]=R.useState("Ready"),c=!!i;if(R.useEffect(()=>{o(""),l("Ready")},[t==null?void 0:t.appId]),!t)return null;async function d(){var u;if(t){l("Creating invite...");try{const f=await n(t.appId),g=`${window.location.origin}${window.location.pathname}#${Tk(f)}`;o(g),l("Invite ready. It reuses this app's stable source and data rooms."),(u=navigator.clipboard)==null||u.writeText(g).catch(()=>{})}catch(f){l(f instanceof Error?f.message:"Could not create invite.")}}}return p.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Share app",children:p.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[p.jsxs("div",{className:"flex items-center justify-between gap-3",children:[p.jsxs("div",{className:"min-w-0",children:[p.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Share"}),p.jsx("h2",{className:"truncate text-lg font-extrabold",children:t.name})]}),p.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close share dialog",onClick:e,children:"×"})]}),c?p.jsxs("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[p.jsx("p",{className:"font-bold",children:"Invite links are sensitive."}),p.jsx("p",{children:"Anyone with the link can access and edit this app's source and data rooms. It does not include the owner setup material for creating new rooms."})]}):p.jsxs("div",{className:"grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:[p.jsx("p",{className:"font-bold",children:"Cloud sync is required before this app can be shared."}),p.jsx("button",{className:"min-h-9 justify-self-start rounded-md border border-amber-300 bg-white px-3 text-sm font-extrabold text-amber-900 hover:border-amber-500",type:"button",onClick:r,children:"Open settings"})]}),p.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3",children:[p.jsx("p",{className:"mb-2 text-xs font-extrabold uppercase text-app-muted",children:"Invite link"}),p.jsx("textarea",{className:"min-h-24 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted",readOnly:!0,value:s||"Create an invite to generate the access link."})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[p.jsx("span",{className:"text-xs font-bold text-app-muted",children:a}),p.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong disabled:opacity-50",type:"button",disabled:!c,onClick:d,children:"Create invite"})]})]})})}function gN({invite:t,onClose:e,onImport:n}){const[r,i]=R.useState("Ready");if(R.useEffect(()=>{i("Ready")},[t==null?void 0:t.createdAt]),!t)return null;async function s(){if(!t)return;const o=t;i("Importing shared app...");try{await n(o),i("Imported.")}catch(a){i(a instanceof Error?a.message:"Could not import invite.")}}return p.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"Import shared app",children:p.jsxs("div",{className:"grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[p.jsxs("div",{className:"flex items-center justify-between gap-3",children:[p.jsxs("div",{className:"min-w-0",children:[p.jsx("p",{className:"mb-1 text-xs font-extrabold uppercase text-app-muted",children:"Shared app invite"}),p.jsx("h2",{className:"truncate text-lg font-extrabold",children:"Import shared app"})]}),p.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close invite import",onClick:e,children:"×"})]}),p.jsx("p",{className:"text-sm leading-relaxed text-app-muted",children:"This link grants access to a shared app source room and data room. Importing will add the app to this workspace as Shared with me and connect it to live data updates."}),p.jsx("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900",children:"Shared app source is executable code from whoever controls the shared source room. Only import apps from people you trust."}),p.jsxs("div",{className:"rounded-lg border border-app-line bg-slate-50 p-3 text-xs text-app-muted",children:[p.jsxs("p",{children:["Provider: ",p.jsx("span",{className:"font-mono",children:t.provider.databaseUrl})]}),p.jsxs("p",{children:["Created: ",p.jsx("span",{className:"font-mono",children:uw(t.createdAt)})]})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[p.jsx("span",{className:"text-xs font-bold text-app-muted",children:r}),p.jsxs("div",{className:"flex gap-2",children:[p.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:e,children:"Cancel"}),p.jsx("button",{className:"min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong",type:"button",onClick:s,children:"Import"})]})]})]})})}function yN({app:t,onClose:e,onDeleteApp:n,syncBadge:r}){const[i,s]=R.useState("");if(R.useEffect(()=>{s("")},[t]),!t)return null;async function o(){if(!t)return;const a=vN(t,r);if(window.confirm(a)){s("Deleting...");try{await n(t.appId)}catch(l){s(l instanceof Error?l.message:"Could not delete app.")}}}return p.jsx("div",{className:"fixed inset-0 z-40 grid place-items-center bg-black/35 px-4",role:"dialog","aria-modal":"true","aria-label":"App actions",children:p.jsxs("div",{className:"grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel",children:[p.jsxs("div",{className:"flex items-center justify-between gap-3",children:[p.jsx("h2",{className:"text-lg font-extrabold",children:"App actions"}),p.jsx("button",{className:"grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent",type:"button","aria-label":"Close app actions",onClick:e,children:"×"})]}),p.jsxs("div",{className:"grid gap-1 rounded-lg border border-app-line bg-white p-3",children:[p.jsx("p",{className:"text-xs font-extrabold uppercase text-app-muted",children:"Selected app"}),p.jsx("p",{className:"truncate text-base font-extrabold text-app-ink",children:t.name}),t.description?p.jsx("p",{className:"line-clamp-3 text-sm leading-snug text-app-muted",children:t.description}):null]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[p.jsx("button",{className:"min-h-9 rounded-md border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 hover:bg-red-100",type:"button",onClick:o,children:"Delete"}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsx("span",{className:"text-xs font-bold text-app-muted",children:i}),p.jsx("button",{className:"min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent",type:"button",onClick:e,children:"Cancel"})]})]})]})})}function vN(t,e){const n=`Delete "${t.name}"? This removes the app and its saved data from this workspace.`;return(e==null?void 0:e.kind)==="shared-by-me"?`${n}

This app is shared. Its remote source and data rooms will also be deleted, so collaborators with the invite link will lose access.`:(e==null?void 0:e.kind)==="shared-with-me"||(e==null?void 0:e.kind)==="needs-attention"?`${n}

This app was shared with you. Deleting it here only removes your local entry; it does not delete the owner's rooms.`:e&&e.kind!=="local-only"?`${n}

Its remote source and data backup rooms will also be deleted.`:n}function _N({app:t,core:e,onConsoleEntry:n,onUnhandledRemoteDataChange:r,onSaveAppData:i,reloadKey:s,remoteDataChange:o}){return p.jsx("section",{className:"min-h-0","aria-label":t.name,children:p.jsx(zk,{app:t,getAppData:e.getAppData,onConsoleEntry:n,onUnhandledRemoteDataChange:r,reloadKey:s,remoteDataChange:o,saveAppData:i})})}function uw(t){return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric"}).format(new Date(t))}function wN(){const t=R.useMemo(()=>HS(),[]),e=R.useMemo(()=>sk(),[]),n=R.useMemo(()=>wk(bk()),[]);return p.jsx(lN,{core:t,syncQueueStore:e,syncRegistry:n})}_c.createRoot(document.getElementById("root")).render(p.jsx(Tw.StrictMode,{children:p.jsx(wN,{})}));
