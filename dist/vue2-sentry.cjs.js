"use strict";function createCommonjsModule(e,t){return t={exports:{}},e(t,t.exports),t.exports}function isObject$1(e){return"object"==typeof e&&null!==e}function isError$1(e){switch({}.toString.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":return!0;default:return e instanceof Error}}function wrappedCallback(e){return function(t,n){var r=e(t)||t;return n?n(r)||r:r}}function getLocationHref(){return"undefined"==typeof document||null==document.location?"":document.location.href}function RavenConfigError(e){this.name="RavenConfigError",this.message=e}function now(){return+new Date}function keepOriginalCallback(e,t){return isFunction(t)?function(n){return t(n,e)}:t}function Raven$2(){this._hasJSON=!("object"!=typeof JSON||!JSON.stringify),this._hasDocument=!isUndefined(_document),this._hasNavigator=!isUndefined(_navigator),this._lastCapturedException=null,this._lastData=null,this._lastEventId=null,this._globalServer=null,this._globalKey=null,this._globalProject=null,this._globalContext={},this._globalOptions={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,maxMessageLength:0,maxUrlLength:250,stackTraceLimit:50,autoBreadcrumbs:!0,instrument:!0,sampleRate:1},this._ignoreOnError=0,this._isRavenInstalled=!1,this._originalErrorStackTraceLimit=Error.stackTraceLimit,this._originalConsole=_window$1.console||{},this._originalConsoleMethods={},this._plugins=[],this._startTime=now(),this._wrappedBuiltIns=[],this._breadcrumbs=[],this._lastCapturedEvent=null,this._keypressTimeout,this._location=_window$1.location,this._lastHref=this._location&&this._location.href,this._resetBackoff();for(var e in this._originalConsole)this._originalConsoleMethods[e]=this._originalConsole[e]}function isUndefined(e){return void 0===e}function isFunction(e){return"function"==typeof e}function isString(e){return"[object String]"===objectPrototype.toString.call(e)}function isEmptyObject(e){for(var t in e)return!1;return!0}function each(e,t){var n,r;if(isUndefined(e.length))for(n in e)hasKey(e,n)&&t.call(null,n,e[n]);else if(r=e.length)for(n=0;n<r;n++)t.call(null,n,e[n])}function objectMerge(e,t){return t?(each(t,function(t,n){e[t]=n}),e):e}function objectFrozen(e){return!!Object.isFrozen&&Object.isFrozen(e)}function truncate(e,t){return!t||e.length<=t?e:e.substr(0,t)+"…"}function hasKey(e,t){return objectPrototype.hasOwnProperty.call(e,t)}function joinRegExp(e){for(var t,n=[],r=0,o=e.length;r<o;r++)isString(t=e[r])?n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):t&&t.source&&n.push(t.source);return new RegExp(n.join("|"),"i")}function urlencode(e){var t=[];return each(e,function(e,n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))}),t.join("&")}function parseUrl(e){var t=e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};var n=t[6]||"",r=t[8]||"";return{protocol:t[2],host:t[4],path:t[5],relative:t[5]+n+r}}function uuid4(){var e=_window$1.crypto||_window$1.msCrypto;if(!isUndefined(e)&&e.getRandomValues){var t=new Uint16Array(8);e.getRandomValues(t),t[3]=4095&t[3]|16384,t[4]=16383&t[4]|32768;var n=function(e){for(var t=e.toString(16);t.length<4;)t="0"+t;return t};return n(t[0])+n(t[1])+n(t[2])+n(t[3])+n(t[4])+n(t[5])+n(t[6])+n(t[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function htmlTreeAsString(e){for(var t,n=[],r=0,o=0,a=" > ".length;e&&r++<5&&!("html"===(t=htmlElementAsString(e))||r>1&&o+n.length*a+t.length>=80);)n.push(t),o+=t.length,e=e.parentNode;return n.reverse().join(" > ")}function htmlElementAsString(e){var t,n,r,o,a,i=[];if(!e||!e.tagName)return"";if(i.push(e.tagName.toLowerCase()),e.id&&i.push("#"+e.id),(t=e.className)&&isString(t))for(n=t.split(/\s+/),a=0;a<n.length;a++)i.push("."+n[a]);var s=["type","name","title","alt"];for(a=0;a<s.length;a++)r=s[a],(o=e.getAttribute(r))&&i.push("["+r+'="'+o+'"]');return i.join("")}function isOnlyOneTruthy(e,t){return!!(!!e^!!t)}function isSameException(e,t){return!isOnlyOneTruthy(e,t)&&(e=e.values[0],t=t.values[0],e.type===t.type&&e.value===t.value&&isSameStacktrace(e.stacktrace,t.stacktrace))}function isSameStacktrace(e,t){if(isOnlyOneTruthy(e,t))return!1;var n=e.frames,r=t.frames;if(n.length!==r.length)return!1;for(var o,a,i=0;i<n.length;i++)if(o=n[i],a=r[i],o.filename!==a.filename||o.lineno!==a.lineno||o.colno!==a.colno||o.function!==a.function)return!1;return!0}function fill(e,t,n,r){var o=e[t];e[t]=n(o),r&&r.push([e,t,o])}function formatComponentName(e){if(e.$root===e)return"root instance";var t=e._isVue?e.$options.name||e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options.__file?" at "+e.$options.__file:"")}function vuePlugin(e,t){if((t=t||window.Vue)&&t.config){var n=t.config.errorHandler;t.config.errorHandler=function(t,r,o){var a={componentName:formatComponentName(r),propsData:r.$options.propsData};void 0!==o&&(a.lifecycleHook=o),e.captureException(t,{extra:a}),"function"==typeof n&&n.call(this,t,r,o)}}}function VueSentry(e,t){var n={enable:!0};t&&(t=_extends({},n,t)),t.enable&&(singleton.config((t.protocol||"https")+"://"+t.key+"@"+(t.server||"sentry.io")+"/"+t.project,_extends({},t.config)).addPlugin(vue,e).install(),e.prototype.$raven=singleton)}var commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},utils={isObject:isObject$1,isError:isError$1,wrappedCallback:wrappedCallback},TraceKit={collectWindowErrors:!0,debug:!1},_window$2="undefined"!=typeof window?window:void 0!==commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{},_slice=[].slice,UNKNOWN_FUNCTION="?",ERROR_TYPES_RE=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;TraceKit.report=function(){function e(e,t){var n=null;if(!t||TraceKit.collectWindowErrors){for(var r in l)if(l.hasOwnProperty(r))try{l[r].apply(null,[e].concat(_slice.call(arguments,2)))}catch(e){n=e}if(n)throw n}}function t(t,n,r,a,s){if(f)TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(f,n,r,t),o();else if(s&&utils.isError(s))e(TraceKit.computeStackTrace(s),!0);else{var l,c={url:n,line:r,column:a},u=void 0,h=t;"[object String]"==={}.toString.call(t)&&(l=t.match(ERROR_TYPES_RE))&&(u=l[1],h=l[2]),c.func=UNKNOWN_FUNCTION,e({name:u,message:h,url:getLocationHref(),stack:[c]},!0)}return!!i&&i.apply(this,arguments)}function n(){s||(i=_window$2.onerror,_window$2.onerror=t,s=!0)}function r(){s&&(_window$2.onerror=i,s=!1,i=void 0)}function o(){var t=f,n=c;c=null,f=null,u=null,e.apply(null,[t,!1].concat(n))}function a(e,t){var n=_slice.call(arguments,1);if(f){if(u===e)return;o()}var r=TraceKit.computeStackTrace(e);if(f=r,u=e,c=n,setTimeout(function(){u===e&&o()},r.incomplete?2e3:0),!1!==t)throw e}var i,s,l=[],c=null,u=null,f=null;return a.subscribe=function(e){n(),l.push(e)},a.unsubscribe=function(e){for(var t=l.length-1;t>=0;--t)l[t]===e&&l.splice(t,1)},a.uninstall=function(){r(),l=[]},a}(),TraceKit.computeStackTrace=function(){function e(e){if(void 0!==e.stack&&e.stack){for(var t,n,r,o=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,a=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,i=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,s=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,l=/\((\S*)(?::(\d+))(?::(\d+))\)/,c=e.stack.split("\n"),u=[],f=(/^(.*) is undefined$/.exec(e.message),0),h=c.length;f<h;++f){if(n=o.exec(c[f])){var p=n[2]&&0===n[2].indexOf("native");(d=n[2]&&0===n[2].indexOf("eval"))&&(t=l.exec(n[2]))&&(n[2]=t[1],n[3]=t[2],n[4]=t[3]),r={url:p?null:n[2],func:n[1]||UNKNOWN_FUNCTION,args:p?[n[2]]:[],line:n[3]?+n[3]:null,column:n[4]?+n[4]:null}}else if(n=i.exec(c[f]))r={url:n[2],func:n[1]||UNKNOWN_FUNCTION,args:[],line:+n[3],column:n[4]?+n[4]:null};else{if(!(n=a.exec(c[f])))continue;var d=n[3]&&n[3].indexOf(" > eval")>-1;d&&(t=s.exec(n[3]))?(n[3]=t[1],n[4]=t[2],n[5]=null):0!==f||n[5]||void 0===e.columnNumber||(u[0].column=e.columnNumber+1),r={url:n[3],func:n[1]||UNKNOWN_FUNCTION,args:n[2]?n[2].split(","):[],line:n[4]?+n[4]:null,column:n[5]?+n[5]:null}}!r.func&&r.line&&(r.func=UNKNOWN_FUNCTION),u.push(r)}return u.length?{name:e.name,message:e.message,url:getLocationHref(),stack:u}:null}}function t(e,t,n,r){var o={url:t,line:n};if(o.url&&o.line){if(e.incomplete=!1,o.func||(o.func=UNKNOWN_FUNCTION),e.stack.length>0&&e.stack[0].url===o.url){if(e.stack[0].line===o.line)return!1;if(!e.stack[0].line&&e.stack[0].func===o.func)return e.stack[0].line=o.line,!1}return e.stack.unshift(o),e.partial=!0,!0}return e.incomplete=!0,!1}function n(e,o){for(var a,i,s=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,l=[],c={},u=!1,f=n.caller;f&&!u;f=f.caller)if(f!==r&&f!==TraceKit.report){if(i={url:null,func:UNKNOWN_FUNCTION,line:null,column:null},f.name?i.func=f.name:(a=s.exec(f.toString()))&&(i.func=a[1]),void 0===i.func)try{i.func=a.input.substring(0,a.input.indexOf("{"))}catch(e){}c[""+f]?u=!0:c[""+f]=!0,l.push(i)}o&&l.splice(0,o);var h={name:e.name,message:e.message,url:getLocationHref(),stack:l};return t(h,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),h}function r(t,r){var o=null;r=null==r?0:+r;try{if(o=e(t))return o}catch(e){if(TraceKit.debug)throw e}try{if(o=n(t,r+1))return o}catch(e){if(TraceKit.debug)throw e}return{name:t.name,message:t.message,url:getLocationHref()}}return r.augmentStackTraceWithInitialElement=t,r.computeStackTraceFromStackProp=e,r}();var tracekit=TraceKit,stringify_1=createCommonjsModule(function(e,t){function n(e,t){for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}function r(e){var t={stack:e.stack,message:e.message,name:e.name};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function o(e,t){var o=[],a=[];return null==t&&(t=function(e,t){return o[0]===t?"[Circular ~]":"[Circular ~."+a.slice(0,n(o,t)).join(".")+"]"}),function(i,s){if(o.length>0){var l=n(o,this);~l?o.splice(l+1):o.push(this),~l?a.splice(l,1/0,i):a.push(i),~n(o,s)&&(s=t.call(this,i,s))}else o.push(s);return null==e?s instanceof Error?r(s):s:e.call(this,i,s)}}(e.exports=function(e,t,n,r){return JSON.stringify(e,o(t,r),n)}).getSerialize=o});RavenConfigError.prototype=new Error,RavenConfigError.prototype.constructor=RavenConfigError;var configError=RavenConfigError,wrapMethod=function(e,t,n){var r=e[t],o=e;if(t in e){var a="warn"===t?"warning":t;e[t]=function(){var e=[].slice.call(arguments),i=""+e.join(" "),s={level:a,logger:"console",extra:{arguments:e}};"assert"===t?!1===e[0]&&(i="Assertion failed: "+(e.slice(1).join(" ")||"console.assert"),s.extra.arguments=e.slice(1),n&&n(i,s)):n&&n(i,s),r&&Function.prototype.apply.call(r,o,e)}}},console$1={wrapMethod:wrapMethod},isError=utils.isError,isObject=utils.isObject,wrapConsoleMethod=console$1.wrapMethod,dsnKeys="source protocol user pass host port path".split(" "),dsnPattern=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,_window$1="undefined"!=typeof window?window:void 0!==commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{},_document=_window$1.document,_navigator=_window$1.navigator;Raven$2.prototype={VERSION:"3.18.1",debug:!1,TraceKit:tracekit,config:function(e,t){var n=this;if(n._globalServer)return this._logDebug("error","Error: Raven has already been configured"),n;if(!e)return n;var r=n._globalOptions;t&&each(t,function(e,t){"tags"===e||"extra"===e||"user"===e?n._globalContext[e]=t:r[e]=t}),n.setDSN(e),r.ignoreErrors.push(/^Script error\.?$/),r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),r.ignoreErrors=joinRegExp(r.ignoreErrors),r.ignoreUrls=!!r.ignoreUrls.length&&joinRegExp(r.ignoreUrls),r.whitelistUrls=!!r.whitelistUrls.length&&joinRegExp(r.whitelistUrls),r.includePaths=joinRegExp(r.includePaths),r.maxBreadcrumbs=Math.max(0,Math.min(r.maxBreadcrumbs||100,100));var o={xhr:!0,console:!0,dom:!0,location:!0},a=r.autoBreadcrumbs;"[object Object]"==={}.toString.call(a)?a=objectMerge(o,a):!1!==a&&(a=o),r.autoBreadcrumbs=a;var i={tryCatch:!0},s=r.instrument;return"[object Object]"==={}.toString.call(s)?s=objectMerge(i,s):!1!==s&&(s=i),r.instrument=s,tracekit.collectWindowErrors=!!r.collectWindowErrors,n},install:function(){var e=this;return e.isSetup()&&!e._isRavenInstalled&&(tracekit.report.subscribe(function(){e._handleOnErrorStackInfo.apply(e,arguments)}),e._globalOptions.instrument&&e._globalOptions.instrument.tryCatch&&e._instrumentTryCatch(),e._globalOptions.autoBreadcrumbs&&e._instrumentBreadcrumbs(),e._drainPlugins(),e._isRavenInstalled=!0),Error.stackTraceLimit=e._globalOptions.stackTraceLimit,this},setDSN:function(e){var t=this,n=t._parseDSN(e),r=n.path.lastIndexOf("/"),o=n.path.substr(1,r);t._dsn=e,t._globalKey=n.user,t._globalSecret=n.pass&&n.pass.substr(1),t._globalProject=n.path.substr(r+1),t._globalServer=t._getGlobalServer(n),t._globalEndpoint=t._globalServer+"/"+o+"api/"+t._globalProject+"/store/",this._resetBackoff()},context:function(e,t,n){return isFunction(e)&&(n=t||[],t=e,e=void 0),this.wrap(e,t).apply(this,n)},wrap:function(e,t,n){function r(){var r=[],a=arguments.length,i=!e||e&&!1!==e.deep;for(n&&isFunction(n)&&n.apply(this,arguments);a--;)r[a]=i?o.wrap(e,arguments[a]):arguments[a];try{return t.apply(this,r)}catch(t){throw o._ignoreNextOnError(),o.captureException(t,e),t}}var o=this;if(isUndefined(t)&&!isFunction(e))return e;if(isFunction(e)&&(t=e,e=void 0),!isFunction(t))return t;try{if(t.__raven__)return t;if(t.__raven_wrapper__)return t.__raven_wrapper__}catch(e){return t}for(var a in t)hasKey(t,a)&&(r[a]=t[a]);return r.prototype=t.prototype,t.__raven_wrapper__=r,r.__raven__=!0,r.__inner__=t,r},uninstall:function(){return tracekit.report.uninstall(),this._restoreBuiltIns(),Error.stackTraceLimit=this._originalErrorStackTraceLimit,this._isRavenInstalled=!1,this},captureException:function(e,t){if(!isError(e))return this.captureMessage(e,objectMerge({trimHeadFrames:1,stacktrace:!0},t));this._lastCapturedException=e;try{var n=tracekit.computeStackTrace(e);this._handleStackInfo(n,t)}catch(t){if(e!==t)throw t}return this},captureMessage:function(e,t){if(!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(e)){var n=objectMerge({message:e+""},t=t||{});if(this._globalOptions.stacktrace||t&&t.stacktrace){var r;try{throw new Error(e)}catch(e){r=e}r.name=null,t=objectMerge({fingerprint:e,trimHeadFrames:(t.trimHeadFrames||0)+1},t);var o=tracekit.computeStackTrace(r),a=this._prepareFrames(o,t);n.stacktrace={frames:a.reverse()}}return this._send(n),this}},captureBreadcrumb:function(e){var t=objectMerge({timestamp:now()/1e3},e);if(isFunction(this._globalOptions.breadcrumbCallback)){var n=this._globalOptions.breadcrumbCallback(t);if(isObject(n)&&!isEmptyObject(n))t=n;else if(!1===n)return this}return this._breadcrumbs.push(t),this._breadcrumbs.length>this._globalOptions.maxBreadcrumbs&&this._breadcrumbs.shift(),this},addPlugin:function(e){var t=[].slice.call(arguments,1);return this._plugins.push([e,t]),this._isRavenInstalled&&this._drainPlugins(),this},setUserContext:function(e){return this._globalContext.user=e,this},setExtraContext:function(e){return this._mergeContext("extra",e),this},setTagsContext:function(e){return this._mergeContext("tags",e),this},clearContext:function(){return this._globalContext={},this},getContext:function(){return JSON.parse(stringify_1(this._globalContext))},setEnvironment:function(e){return this._globalOptions.environment=e,this},setRelease:function(e){return this._globalOptions.release=e,this},setDataCallback:function(e){var t=this._globalOptions.dataCallback;return this._globalOptions.dataCallback=keepOriginalCallback(t,e),this},setBreadcrumbCallback:function(e){var t=this._globalOptions.breadcrumbCallback;return this._globalOptions.breadcrumbCallback=keepOriginalCallback(t,e),this},setShouldSendCallback:function(e){var t=this._globalOptions.shouldSendCallback;return this._globalOptions.shouldSendCallback=keepOriginalCallback(t,e),this},setTransport:function(e){return this._globalOptions.transport=e,this},lastException:function(){return this._lastCapturedException},lastEventId:function(){return this._lastEventId},isSetup:function(){return!!this._hasJSON&&(!!this._globalServer||(this.ravenNotConfiguredError||(this.ravenNotConfiguredError=!0,this._logDebug("error","Error: Raven has not been configured.")),!1))},afterLoad:function(){var e=_window$1.RavenConfig;e&&this.config(e.dsn,e.config).install()},showReportDialog:function(e){if(_document){var t=(e=e||{}).eventId||this.lastEventId();if(!t)throw new configError("Missing eventId");var n=e.dsn||this._dsn;if(!n)throw new configError("Missing DSN");var r=encodeURIComponent,o="";o+="?eventId="+r(t),o+="&dsn="+r(n);var a=e.user||this._globalContext.user;a&&(a.name&&(o+="&name="+r(a.name)),a.email&&(o+="&email="+r(a.email)));var i=this._getGlobalServer(this._parseDSN(n)),s=_document.createElement("script");s.async=!0,s.src=i+"/api/embed/error-page/"+o,(_document.head||_document.body).appendChild(s)}},_ignoreNextOnError:function(){var e=this;this._ignoreOnError+=1,setTimeout(function(){e._ignoreOnError-=1})},_triggerEvent:function(e,t){var n,r;if(this._hasDocument){t=t||{},e="raven"+e.substr(0,1).toUpperCase()+e.substr(1),_document.createEvent?(n=_document.createEvent("HTMLEvents")).initEvent(e,!0,!0):(n=_document.createEventObject()).eventType=e;for(r in t)hasKey(t,r)&&(n[r]=t[r]);if(_document.createEvent)_document.dispatchEvent(n);else try{_document.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(e){}}},_breadcrumbEventHandler:function(e){var t=this;return function(n){if(t._keypressTimeout=null,t._lastCapturedEvent!==n){t._lastCapturedEvent=n;var r;try{r=htmlTreeAsString(n.target)}catch(e){r="<unknown>"}t.captureBreadcrumb({category:"ui."+e,message:r})}}},_keypressEventHandler:function(){var e=this;return function(t){var n;try{n=t.target}catch(e){return}var r=n&&n.tagName;if(r&&("INPUT"===r||"TEXTAREA"===r||n.isContentEditable)){var o=e._keypressTimeout;o||e._breadcrumbEventHandler("input")(t),clearTimeout(o),e._keypressTimeout=setTimeout(function(){e._keypressTimeout=null},1e3)}}},_captureUrlChange:function(e,t){var n=parseUrl(this._location.href),r=parseUrl(t),o=parseUrl(e);this._lastHref=t,n.protocol===r.protocol&&n.host===r.host&&(t=r.relative),n.protocol===o.protocol&&n.host===o.host&&(e=o.relative),this.captureBreadcrumb({category:"navigation",data:{to:t,from:e}})},_instrumentTryCatch:function(){function e(e){return function(n,r){for(var o=new Array(arguments.length),a=0;a<o.length;++a)o[a]=arguments[a];var i=o[0];return isFunction(i)&&(o[0]=t.wrap(i)),e.apply?e.apply(this,o):e(o[0],o[1])}}var t=this,n=t._wrappedBuiltIns,r=this._globalOptions.autoBreadcrumbs;fill(_window$1,"setTimeout",e,n),fill(_window$1,"setInterval",e,n),_window$1.requestAnimationFrame&&fill(_window$1,"requestAnimationFrame",function(e){return function(n){return e(t.wrap(n))}},n);for(var o=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],a=0;a<o.length;a++)!function(e){var o=_window$1[e]&&_window$1[e].prototype;o&&o.hasOwnProperty&&o.hasOwnProperty("addEventListener")&&(fill(o,"addEventListener",function(n){return function(o,a,i,s){try{a&&a.handleEvent&&(a.handleEvent=t.wrap(a.handleEvent))}catch(e){}var l,c,u;return r&&r.dom&&("EventTarget"===e||"Node"===e)&&(c=t._breadcrumbEventHandler("click"),u=t._keypressEventHandler(),l=function(e){if(e){var t;try{t=e.type}catch(e){return}return"click"===t?c(e):"keypress"===t?u(e):void 0}}),n.call(this,o,t.wrap(a,void 0,l),i,s)}},n),fill(o,"removeEventListener",function(e){return function(t,n,r,o){try{n=n&&(n.__raven_wrapper__?n.__raven_wrapper__:n)}catch(e){}return e.call(this,t,n,r,o)}},n))}(o[a])},_instrumentBreadcrumbs:function(){function e(e,n){e in n&&isFunction(n[e])&&fill(n,e,function(e){return t.wrap(e)})}var t=this,n=this._globalOptions.autoBreadcrumbs,r=t._wrappedBuiltIns;if(n.xhr&&"XMLHttpRequest"in _window$1){var o=XMLHttpRequest.prototype;fill(o,"open",function(e){return function(n,r){return isString(r)&&-1===r.indexOf(t._globalKey)&&(this.__raven_xhr={method:n,url:r,status_code:null}),e.apply(this,arguments)}},r),fill(o,"send",function(n){return function(r){function o(){if(a.__raven_xhr&&4===a.readyState){try{a.__raven_xhr.status_code=a.status}catch(e){}t.captureBreadcrumb({type:"http",category:"xhr",data:a.__raven_xhr})}}for(var a=this,i=["onload","onerror","onprogress"],s=0;s<i.length;s++)e(i[s],a);return"onreadystatechange"in a&&isFunction(a.onreadystatechange)?fill(a,"onreadystatechange",function(e){return t.wrap(e,void 0,o)}):a.onreadystatechange=o,n.apply(this,arguments)}},r)}n.xhr&&"fetch"in _window$1&&fill(_window$1,"fetch",function(e){return function(n,r){for(var o=new Array(arguments.length),a=0;a<o.length;++a)o[a]=arguments[a];var i,s=o[0],l="GET";"string"==typeof s?i=s:(i=s.url,s.method&&(l=s.method)),o[1]&&o[1].method&&(l=o[1].method);var c={method:l,url:i,status_code:null};return t.captureBreadcrumb({type:"http",category:"fetch",data:c}),e.apply(this,o).then(function(e){return c.status_code=e.status,e})}},r),n.dom&&this._hasDocument&&(_document.addEventListener?(_document.addEventListener("click",t._breadcrumbEventHandler("click"),!1),_document.addEventListener("keypress",t._keypressEventHandler(),!1)):(_document.attachEvent("onclick",t._breadcrumbEventHandler("click")),_document.attachEvent("onkeypress",t._keypressEventHandler())));var a=_window$1.chrome,i=!(a&&a.app&&a.app.runtime)&&_window$1.history&&history.pushState;if(n.location&&i){var s=_window$1.onpopstate;_window$1.onpopstate=function(){var e=t._location.href;if(t._captureUrlChange(t._lastHref,e),s)return s.apply(this,arguments)},fill(history,"pushState",function(e){return function(){var n=arguments.length>2?arguments[2]:void 0;return n&&t._captureUrlChange(t._lastHref,n+""),e.apply(this,arguments)}},r)}if(n.console&&"console"in _window$1&&console.log){var l=function(e,n){t.captureBreadcrumb({message:e,level:n.level,category:"console"})};each(["debug","info","warn","error","log"],function(e,t){wrapConsoleMethod(console,t,l)})}},_restoreBuiltIns:function(){for(var e;this._wrappedBuiltIns.length;){var t=(e=this._wrappedBuiltIns.shift())[0],n=e[1],r=e[2];t[n]=r}},_drainPlugins:function(){var e=this;each(this._plugins,function(t,n){var r=n[0],o=n[1];r.apply(e,[e].concat(o))})},_parseDSN:function(e){var t=dsnPattern.exec(e),n={},r=7;try{for(;r--;)n[dsnKeys[r]]=t[r]||""}catch(t){throw new configError("Invalid DSN: "+e)}if(n.pass&&!this._globalOptions.allowSecretKey)throw new configError("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");return n},_getGlobalServer:function(e){var t="//"+e.host+(e.port?":"+e.port:"");return e.protocol&&(t=e.protocol+":"+t),t},_handleOnErrorStackInfo:function(){this._ignoreOnError||this._handleStackInfo.apply(this,arguments)},_handleStackInfo:function(e,t){var n=this._prepareFrames(e,t);this._triggerEvent("handle",{stackInfo:e,options:t}),this._processException(e.name,e.message,e.url,e.lineno,n,t)},_prepareFrames:function(e,t){var n=this,r=[];if(e.stack&&e.stack.length&&(each(e.stack,function(t,o){var a=n._normalizeFrame(o,e.url);a&&r.push(a)}),t&&t.trimHeadFrames))for(var o=0;o<t.trimHeadFrames&&o<r.length;o++)r[o].in_app=!1;return r=r.slice(0,this._globalOptions.stackTraceLimit)},_normalizeFrame:function(e,t){var n={filename:e.url,lineno:e.line,colno:e.column,function:e.func||"?"};return e.url||(n.filename=t),n.in_app=!(this._globalOptions.includePaths.test&&!this._globalOptions.includePaths.test(n.filename)||/(Raven|TraceKit)\./.test(n.function)||/raven\.(min\.)?js$/.test(n.filename)),n},_processException:function(e,t,n,r,o,a){var i=(e||"")+": "+(t||"");if(!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(i)){var s;if(o&&o.length?(n=o[0].filename||n,o.reverse(),s={frames:o}):n&&(s={frames:[{filename:n,lineno:r,in_app:!0}]}),(!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(n))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(n))){var l=objectMerge({exception:{values:[{type:e,value:t,stacktrace:s}]},culprit:n},a);this._send(l)}}},_trimPacket:function(e){var t=this._globalOptions.maxMessageLength;if(e.message&&(e.message=truncate(e.message,t)),e.exception){var n=e.exception.values[0];n.value=truncate(n.value,t)}var r=e.request;return r&&(r.url&&(r.url=truncate(r.url,this._globalOptions.maxUrlLength)),r.Referer&&(r.Referer=truncate(r.Referer,this._globalOptions.maxUrlLength))),e.breadcrumbs&&e.breadcrumbs.values&&this._trimBreadcrumbs(e.breadcrumbs),e},_trimBreadcrumbs:function(e){for(var t,n,r,o=["to","from","url"],a=0;a<e.values.length;++a)if((n=e.values[a]).hasOwnProperty("data")&&isObject(n.data)&&!objectFrozen(n.data)){r=objectMerge({},n.data);for(var i=0;i<o.length;++i)t=o[i],r.hasOwnProperty(t)&&r[t]&&(r[t]=truncate(r[t],this._globalOptions.maxUrlLength));e.values[a].data=r}},_getHttpData:function(){if(this._hasNavigator||this._hasDocument){var e={};return this._hasNavigator&&_navigator.userAgent&&(e.headers={"User-Agent":navigator.userAgent}),this._hasDocument&&(_document.location&&_document.location.href&&(e.url=_document.location.href),_document.referrer&&(e.headers||(e.headers={}),e.headers.Referer=_document.referrer)),e}},_resetBackoff:function(){this._backoffDuration=0,this._backoffStart=null},_shouldBackoff:function(){return this._backoffDuration&&now()-this._backoffStart<this._backoffDuration},_isRepeatData:function(e){var t=this._lastData;return!(!t||e.message!==t.message||e.culprit!==t.culprit)&&(e.stacktrace||t.stacktrace?isSameStacktrace(e.stacktrace,t.stacktrace):!e.exception&&!t.exception||isSameException(e.exception,t.exception))},_setBackoffState:function(e){if(!this._shouldBackoff()){var t=e.status;if(400===t||401===t||429===t){var n;try{n=e.getResponseHeader("Retry-After"),n=1e3*parseInt(n,10)}catch(e){}this._backoffDuration=n||(2*this._backoffDuration||1e3),this._backoffStart=now()}}},_send:function(e){var t=this._globalOptions,n={project:this._globalProject,logger:t.logger,platform:"javascript"},r=this._getHttpData();r&&(n.request=r),e.trimHeadFrames&&delete e.trimHeadFrames,(e=objectMerge(n,e)).tags=objectMerge(objectMerge({},this._globalContext.tags),e.tags),e.extra=objectMerge(objectMerge({},this._globalContext.extra),e.extra),e.extra["session:duration"]=now()-this._startTime,this._breadcrumbs&&this._breadcrumbs.length>0&&(e.breadcrumbs={values:[].slice.call(this._breadcrumbs,0)}),isEmptyObject(e.tags)&&delete e.tags,this._globalContext.user&&(e.user=this._globalContext.user),t.environment&&(e.environment=t.environment),t.release&&(e.release=t.release),t.serverName&&(e.server_name=t.serverName),isFunction(t.dataCallback)&&(e=t.dataCallback(e)||e),e&&!isEmptyObject(e)&&(isFunction(t.shouldSendCallback)&&!t.shouldSendCallback(e)||(this._shouldBackoff()?this._logDebug("warn","Raven dropped error due to backoff: ",e):"number"==typeof t.sampleRate?Math.random()<t.sampleRate&&this._sendProcessedPayload(e):this._sendProcessedPayload(e)))},_getUuid:function(){return uuid4()},_sendProcessedPayload:function(e,t){var n=this,r=this._globalOptions;if(this.isSetup())if(e=this._trimPacket(e),this._globalOptions.allowDuplicates||!this._isRepeatData(e)){this._lastEventId=e.event_id||(e.event_id=this._getUuid()),this._lastData=e,this._logDebug("debug","Raven about to send:",e);var o={sentry_version:"7",sentry_client:"raven-js/"+this.VERSION,sentry_key:this._globalKey};this._globalSecret&&(o.sentry_secret=this._globalSecret);var a=e.exception&&e.exception.values[0];this.captureBreadcrumb({category:"sentry",message:a?(a.type?a.type+": ":"")+a.value:e.message,event_id:e.event_id,level:e.level||"error"});var i=this._globalEndpoint;(r.transport||this._makeRequest).call(this,{url:i,auth:o,data:e,options:r,onSuccess:function(){n._resetBackoff(),n._triggerEvent("success",{data:e,src:i}),t&&t()},onError:function(r){n._logDebug("error","Raven transport failed to send: ",r),r.request&&n._setBackoffState(r.request),n._triggerEvent("failure",{data:e,src:i}),r=r||new Error("Raven send failed (no additional details provided)"),t&&t(r)}})}else this._logDebug("warn","Raven dropped repeat event: ",e)},_makeRequest:function(e){var t=_window$1.XMLHttpRequest&&new _window$1.XMLHttpRequest;if(t&&("withCredentials"in t||"undefined"!=typeof XDomainRequest)){var n=e.url;"withCredentials"in t?t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status)e.onSuccess&&e.onSuccess();else if(e.onError){var n=new Error("Sentry error code: "+t.status);n.request=t,e.onError(n)}}:(t=new XDomainRequest,n=n.replace(/^https?:/,""),e.onSuccess&&(t.onload=e.onSuccess),e.onError&&(t.onerror=function(){var n=new Error("Sentry error code: XDomainRequest");n.request=t,e.onError(n)})),t.open("POST",n+"?"+urlencode(e.auth)),t.send(stringify_1(e.data))}},_logDebug:function(e){this._originalConsoleMethods[e]&&this.debug&&Function.prototype.apply.call(this._originalConsoleMethods[e],this._originalConsole,[].slice.call(arguments,1))},_mergeContext:function(e,t){isUndefined(t)?delete this._globalContext[e]:this._globalContext[e]=objectMerge(this._globalContext[e]||{},t)}};var objectPrototype=Object.prototype;"undefined"!=typeof __DEV__&&__DEV__&&(Raven$2.utils={isUndefined:isUndefined,isFunction:isFunction,isString:isString,isObject:isObject,isEmptyObject:isEmptyObject,isError:isError,each:each,objectMerge:objectMerge,truncate:truncate,hasKey:hasKey,joinRegExp:joinRegExp,urlencode:urlencode,uuid4:uuid4,htmlTreeAsString:htmlTreeAsString,htmlElementAsString:htmlElementAsString,parseUrl:parseUrl,fill:fill}),Raven$2.prototype.setUser=Raven$2.prototype.setUserContext,Raven$2.prototype.setReleaseContext=Raven$2.prototype.setRelease;var raven=Raven$2,_window="undefined"!=typeof window?window:void 0!==commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{},_Raven=_window.Raven,Raven=new raven;Raven.noConflict=function(){return _window.Raven=_Raven,Raven},Raven.afterLoad();var singleton=Raven,vue=vuePlugin,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};module.exports=VueSentry;
