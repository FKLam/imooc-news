(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-feedback-feedback"],{1229:function(t,e,n){"use strict";(function(t,r){var i=n("4ea4");n("4160"),n("a434"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("1da1")),o={data:function(){return{imageList:[],content:""}},methods:{addImage:function(){var e=this,n=5-this.imageList.length;uni.chooseImage({count:n,success:function(n){t.log(n);var r=n.tempFilePaths,i=n.tempFiles;r.forEach((function(t,n){e.imageList.push({url:t,name:i[n].name})}))}})},deleteImage:function(t){this.imageList.splice(t,1)},submit:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,r,i,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.content.length){e.next=3;break}return uni.showToast({title:"请输入要反馈的问题",icon:"none"}),e.abrupt("return");case 3:n=[],uni.showLoading(),r=0;case 6:if(!(r<t.imageList.length)){e.next=16;break}return i=t.imageList[r].url,a=t.imageList[r].name,e.next=11,t.uploadFiles(i,a);case 11:o=e.sent,n.push(o);case 13:r++,e.next=6;break;case 16:t.updateFeedback({content:t.content,feedbackImages:n});case 17:case"end":return e.stop()}}),e)})))()},uploadFiles:function(e,n){return(0,a.default)(regeneratorRuntime.mark((function i(){var a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,r.uploadFile({filePath:e,cloudPath:n}).catch((function(e){t.log(e)}));case 2:return a=i.sent,i.abrupt("return",a.fileID);case 4:case"end":return i.stop()}}),i)})))()},updateFeedback:function(e){var n=e.content,r=e.feedbackImages;this.$api.update_feedback({content:n,feedbackImages:r}).then((function(e){t.log(e),uni.hideLoading(),uni.showToast({title:"反馈提交成功",icon:"none"}),setTimeout((function(){uni.switchTab({url:"/pages/tabbar/my/my"})}),2e3)})).catch((function(e){t.log(e),uni.hideLoading(),uni.showToast({title:"反馈提交失败",icon:"none"})}))}}};e.default=o}).call(this,n("5a52")["default"],n("a9ff")["default"])},"1da1":function(t,e,n){"use strict";function r(t,e,n,r,i,a,o){try{var c=t[a](o),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var o=t.apply(e,n);function c(t){r(o,i,a,c,u,"next",t)}function u(t){r(o,i,a,c,u,"throw",t)}c(void 0)}))}}n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"2d7b":function(t,e,n){"use strict";n.r(e);var r=n("bd5f"),i=n("82eb");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("c22a");var o,c=n("f0c5"),u=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"0cf83d9d",null,!1,r["a"],o);e["default"]=u.exports},"4ae8":function(t,e,n){var r=n("ad5a");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("49febdde",r,!0,{sourceMap:!1,shadowMode:!1})},"82eb":function(t,e,n){"use strict";n.r(e);var r=n("1229"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,i=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag",s="object"===typeof t,f=e.regeneratorRuntime;if(f)s&&(t.exports=f);else{f=e.regeneratorRuntime=s?t.exports:{},f.wrap=y;var l="suspendedStart",d="suspendedYield",p="executing",h="completed",v={},g={};g[o]=function(){return this};var m=Object.getPrototypeOf,b=m&&m(m(T([])));b&&b!==r&&i.call(b,o)&&(g=b);var w=E.prototype=k.prototype=Object.create(g);L.prototype=w.constructor=E,E.constructor=L,E[u]=L.displayName="GeneratorFunction",f.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},f.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},f.awrap=function(t){return{__await:t}},_(j.prototype),j.prototype[c]=function(){return this},f.AsyncIterator=j,f.async=function(t,e,n,r){var i=new j(y(t,e,n,r));return f.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(w),w[u]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},f.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},f.values=T,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,i){return c.type="throw",c.arg=t,e.next=r,i&&(e.method="next",e.arg=n),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),s=i.call(o,"finallyLoc");if(u&&s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),I(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;I(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),v}}}function y(t,e,n,r){var i=e&&e.prototype instanceof k?e:k,a=Object.create(i.prototype),o=new C(r||[]);return a._invoke=F(t,n,o),a}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function k(){}function L(){}function E(){}function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function j(t){function e(n,r,a,o){var c=x(t[n],t,r);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&i.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,a,o)}),(function(t){e("throw",t,a,o)})):Promise.resolve(s).then((function(t){u.value=t,a(u)}),(function(t){return e("throw",t,a,o)}))}o(c.arg)}var n;function r(t,r){function i(){return new Promise((function(n,i){e(t,r,n,i)}))}return n=n?n.then(i,i):i()}this._invoke=r}function F(t,e,n){var r=l;return function(i,a){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw a;return G()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var c=O(o,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var u=x(t,e,n);if("normal"===u.type){if(r=n.done?h:d,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=h,n.method="throw",n.arg=u.arg)}}}function O(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,O(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=x(r,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,v):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function T(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){while(++r<t.length)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return a.next=a}}return{next:G}}function G(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},ad5a:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.feedback-title[data-v-0cf83d9d]{font-size:14px;margin:15px;margin-bottom:0;color:#666}.feedback-content[data-v-0cf83d9d]{margin:15px;padding:10px;box-sizing:border-box;border:1px #eee solid}.feedback-content .feedback-content-text[data-v-0cf83d9d]{font-size:12px;width:100%;height:100px}.feedback-image-wrapper[data-v-0cf83d9d]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:10px}.feedback-image-wrapper .feedback-image-item[data-v-0cf83d9d]{position:relative;width:33.33%;height:0;padding-top:33.33%;box-sizing:border-box}.feedback-image-wrapper .feedback-image-item .feedback-image-item-close[data-v-0cf83d9d]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;top:0;right:0;width:22px;height:22px;border-radius:50%;background-color:#ff5a5f;z-index:2}.feedback-image-wrapper .feedback-image-item .feedback-image-item-wrapper[data-v-0cf83d9d]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;top:5px;right:5px;bottom:5px;left:5px;border:1px #eee solid;border-radius:5px;overflow:hidden}.feedback-image-wrapper .feedback-image-item .feedback-image-item-wrapper uni-image[data-v-0cf83d9d]{width:100%;height:100%}.feedback-button[data-v-0cf83d9d]{margin:0 15px;background-color:#f07373}',""]),t.exports=e},bd5f:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uniIcons:n("239a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"feedback-title"},[t._v("意见反馈:")]),n("v-uni-view",{staticClass:"feedback-content"},[n("v-uni-textarea",{staticClass:"feedback-content-text",attrs:{placeholder:"请输入您要反馈的问题"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),n("v-uni-view",{staticClass:"feedback-title"},[t._v("反馈图片:")]),n("v-uni-view",{staticClass:"feedback-image-wrapper"},[t._l(t.imageList,(function(e,r){return n("v-uni-view",{key:r,staticClass:"feedback-image-item"},[n("v-uni-view",{staticClass:"feedback-image-item-close",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.deleteImage(r)}}},[n("uni-icons",{attrs:{type:"closeempty",size:"18",color:"#fff"}})],1),n("v-uni-view",{staticClass:"feedback-image-item-wrapper"},[n("v-uni-image",{attrs:{src:e.url,mode:"aspectFill"}})],1)],1)})),t.imageList.length<5?n("v-uni-view",{staticClass:"feedback-image-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addImage.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"feedback-image-item-wrapper"},[n("uni-icons",{attrs:{type:"plusempty",size:"50",color:"#eee"}})],1)],1):t._e()],2),n("v-uni-button",{staticClass:"feedback-button",attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("提交反馈意见")])],1)},a=[]},c22a:function(t,e,n){"use strict";var r=n("4ae8"),i=n.n(r);i.a}}]);