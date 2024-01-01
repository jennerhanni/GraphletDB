(()=>{var t={579:(t,e,r)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){var o,a,i,c;o=t,a=e,i=r[e],c=function(t,e){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(a),(a="symbol"==n(c)?c:String(c))in o?Object.defineProperty(o,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[a]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var c=r(869).initLabelNode;function l(){return console.log("GraphletJS v0.0.1"),{data:"GraphletJS v0.0.1",msg:"SUCCESS"}}function s(t,e){var r,n;do{r="";for(var o=0;o<e;o++)r+=Math.floor(16*Math.random()).toString(16);n=!t.some((function(t){return t.id===r}))}while(!n);return{data:r,msg:"SUCCESS"}}function u(t,e){return console.log("getListOfLabels",t,e),t&&t.length>0?"id"===e?t.filter((function(t){return"Label"===t.label})).map((function(t){return t.strLabel})):"obj"===e?t.filter((function(t){return"Label"===t.label})):[]:[]}function d(t){console.log("getListOfKeys");var e=new Set;t.forEach((function(t){Object.keys(t).forEach((function(t){e.add(t)}))}));var r=Array.from(e).sort();return["id","date","label"].reverse().forEach((function(t){var e;r.includes(t)&&(r=[t].concat(function(t){if(Array.isArray(t))return i(t)}(e=r.filter((function(e){return e!==t})))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()))})),r}window.aboutGraphletJS=l,window.getRandomToken=s,window.getListOfLabels=u,window.getListOfKeys=d;var b=function(){console.log("getDateObjects");var t=new Date,e=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return"".concat(e).concat(r).concat(n).concat(o).concat(a)?{data:"".concat(e).concat(r).concat(n).concat(o).concat(a),msg:"SUCCESS"}:{data:"",msg:"ERROR_FAILED_TO_CREATE_DATESTRING"}};function f(){return[c]}function g(t,e){var r,n,o=Object.assign({},t.find((function(t){return"Label"===t.label&&t.strLabel===e})));o||((o=c()).label="Label");do{r=s(t,12)}while("SUCCESS"!==r.msg);o.id=r.data;do{n=b()}while("SUCCESS"!==n.msg);return o.date=n.data,console.log("initNode",o),o}function y(t,e,r,n){return n?[Object.assign({},t.find((function(t){return t[e]===r})))]:[Object.assign({},t.filter((function(t){return t[e]===r})))]}function p(t,e){var r=y(t,"id",e.id,!0)[0];if(console.log("id exists",r),r&&Object.keys(r).length>0)return{data:t,msg:"ERROR_ID_EXISTS"};if(""===e.id)return{data:t,msg:"ERROR_ID_CANNOT_BE_AN_EMPTY_STRING"};if("Label"===e.label){var n=y(t,"strLabel",e.strLabel,!0)[0];if(n&&Object.keys(n).length>0)return console.log("strlabel exists"),{data:t,msg:"ERROR_STRLABEL_EXISTS"}}return t.push(e),console.log("nodes with added",t),{data:t,msg:"SUCCESS"}}function S(t,e){return{data:t=t.filter((function(t){return t!==e})),msg:"SUCCESS"}}function v(t,e){return t.map((function(t){return t.id===e.id?a(a({},t),e):t}))}function m(t){var e=t.every((function(t){return t&&"object"===n(t)}));return{data:e,msg:e?"Valid list content.":"Invalid list content. List must contain only node objects."}}function w(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?fixedNodes:t}window.getDateObjects=b,window.initList=f,window.initNode=g,window.getNodeByKeyPairs=function(t,e,r){console.log("getNodeByKeyPairs",e,r);var n=t.filter((function(t){return e.every((function(e){return t[e.key]===e.value}))}));return console.log(n),r?n[0]:n},window.getNodeByKeyPair=y,window.addNode=p,window.removeNode=S,window.updateNode=v,window.validateListContent=m,window.validateList=w,t.exports={aboutGraphletJS:l,getRandomToken:s,getListOfLabels:u,getListOfKeys:d,getDateObjects:b,initList:f,initNode:g,getNodeByKeyPair:y,addNode:p,removeNode:S,updateNode:v,validateListContent:m,validateList:w}},869:t=>{var e=[{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},{id:"bbb",label:"Label",date:"202312311828",strLabel:"Topic",strLabelDesc:"A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.",strText:""},{id:"ccc",label:"Topic",date:"202312210727",strText:"History"}];window.validNodes=e,t.exports={initLabelNode:{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},validNodes:e}}},e={};!function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}(579)})();