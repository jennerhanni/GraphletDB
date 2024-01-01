(()=>{var t={579:(t,e,r)=>{"use strict";function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){var n,i,a,l;n=t,i=e,a=r[e],l=function(t,e){if("object"!=o(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(i),(i="symbol"==o(l)?l:String(l))in n?Object.defineProperty(n,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[i]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}var a=r(869).validMinimumList;function l(){console.log("GraphletJS v0.0.1")}function u(){return a}window.aboutGraphlet=l,window.initList=u,t.exports={aboutGraphlet:l,validateListContent:function(t){var e=t.every((function(t){return t&&"object"===o(t)}));return{data:e,msg:e?"Valid list content.":"Invalid list content. List must contain only node objects."}},initList:u,initNode:function(t,e){var r=t.find((function(t){return"Label"===t.label&&t.properties.label===e}));return r||(r={label:"Label",properties:{label:e}},t.push(r)),[i({},r.properties)]},getListOfAllLabels:function(t){return t.filter((function(t){return"Label"===t.label})).map((function(t){return t.properties.label}))},validateList:function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?fixedNodes:t},addNode:function(t,e){return t.push(e),t},removeNode:function(t,e){return t.filter((function(t){return t!==e}))},updateNode:function(t,e){return t.map((function(t){return t===e?i(i({},t),e):t}))}}},869:t=>{var e=[{id:1,label:"Label",date:"202312311822",strLabel:"Label",strLabelDescription:"The basic building block of the database."},{id:1,label:"Label",date:"202312311828",strLabel:"Topic",strLabelDescription:"A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.",strText:""},{id:1,label:"Topic",date:"202312210727",strText:"History"}];window.validNodes=e,t.exports={validMinimumList:[{id:1,label:"Label",date:"202312311822",strLabel:"Label",strLabelDescription:"The basic building block of the database."}],validNodes:e}}},e={};!function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}(579)})();