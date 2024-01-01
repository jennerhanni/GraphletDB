(()=>{var e={579:(e,t,o)=>{"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function r(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){var i,r,a,d;i=e,r=t,a=o[t],d=function(e,t){if("object"!=n(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var i=o.call(e,"string");if("object"!=n(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==n(d)?d:String(d))in i?Object.defineProperty(i,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[r]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var a=o(869).initLabelNode;function d(){return console.log("GraphletJS v0.0.1"),"GraphletJS v0.0.1"}function l(e,t){var o,n;do{o="";for(var i=0;i<t;i++)o+=Math.floor(16*Math.random()).toString(16);n=!e.some((function(e){return e.id===o}))}while(!n);return console.log("getRandomToken",t,o),o}function c(e,t){return console.log("getListOfLabels",e,t),e&&e.length>0?"id"===t?e.filter((function(e){return"Label"===e.label})).map((function(e){return e.label})):"obj"===t?e.filter((function(e){return"Label"===e.label})):[]:[]}window.aboutGraphletJS=d,window.getRandomToken=l,window.getListOfLabels=c;var s=function(){console.log("getDateObjects");var e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return"".concat(t).concat(o).concat(n).concat(i).concat(r)};function u(){return[a]}function b(e,t){var o=Object.assign({},e.find((function(e){return"Label"===e.label&&e.strLabel===t})));return o||((o=a()).id=l(e,12),o.label="Label",o.date=s()),console.log("initNode",o),o}function f(e,t,o,n){return n?[Object.assign({},e.find((function(e){return e[t]===o})))]:[Object.assign({},e.filter((function(e){return e[t]===o})))]}window.initList=u,window.initNode=b,window.getNodeByKeyPairs=function(e,t,o){console.log("getNodeByKeyPairs",t,o);var n=e.filter((function(e){return t.every((function(t){return e[t.key]===t.value}))}));return console.log(n),o?n[0]:n},window.getNodeByKeyPair=f,e.exports={aboutGraphletJS:d,getRandomToken:l,getListOfLabels:c,getDateObjects:s,initList:u,initNode:b,getNodeByKeyPair:f,addNode:function(e,t){var o=f(e,"id",t.id,!0)[0];return console.log("id exists",o),o&&Object.keys(o).length>0?{data:e,msg:"ID_EXISTS"}:(e.push(t),console.log("nodes with added",e),{data:e,msg:"SUCCESS"})},removeNode:function(e,t){return e.filter((function(e){return e!==t}))},updateNode:function(e,t){return e.map((function(e){return e===t?r(r({},e),t):e}))},validateListContent:function(e){var t=e.every((function(e){return e&&"object"===n(e)}));return{data:t,msg:t?"Valid list content.":"Invalid list content. List must contain only node objects."}},validateList:function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?fixedNodes:e}}},869:e=>{var t=[{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},{id:"bbb",label:"Label",date:"202312311828",strLabel:"Topic",strLabelDesc:"A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.",strText:""},{id:"ccc",label:"Topic",date:"202312210727",strText:"History"}];window.validNodes=t,e.exports={initLabelNode:{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},validNodes:t}}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}(()=>{var e=o(579),t=e.aboutGraphletJS,n=e.initList,i=e.getRandomToken,r=e.getListOfLabels,a=e.getNodeByKeyPair,d=e.initNode,l=e.addNode,c={nodes:[],randomToken:"",listOfLabels:[],aboutGraphletJS:"",whichNode:{}};function s(e){console.log("demoInitNode",e);var t=d(c.nodes,e);console.log("demoInitNode",e,t),c.whichNode=t,f()}function u(e){console.log("demoAddNode",c.nodes,e);var t=l(c.nodes,e);"SUCCESS"===t.msg&&(c.nodes=t.data),f()}function b(e,t,o,n){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=document.createElement(t);for(var a in o&&(r.className=o),n&&(r.textContent=n),i)r.setAttribute(a,i[a]);return e.appendChild(r),r}function f(){var e=document.getElementById("aboutGraphletJS"),t=document.getElementById("nodesList"),o=document.getElementById("labelsList"),n=document.getElementById("nodeCount"),i=document.getElementById("randomToken"),r=document.getElementById("whichNode");t.innerHTML="",o.innerHTML="",c.nodes.forEach((function(e){var o=document.createElement("li");o.textContent=e.id,t.appendChild(o)})),n&&(n.textContent="Your list has ".concat(c.nodes.length," items")),e&&(e.textContent="".concat(c.aboutGraphletJS)),randomToken&&(i.textContent="".concat(c.randomToken)),c.listOfLabels.forEach((function(e){var t=document.createElement("li");t.classList.add("labelListItem");var n=document.createElement("span");n.textContent=e,t.appendChild(n);var i=document.createElement("span");i.textContent="➕",t.appendChild(i),t.onclick=function(){console.log("clicked",t.textContent),s(n.textContent)},o.appendChild(t)})),function(e){if(e)if(console.log("whichNodeDiv",c.whichNode),e.innerHTML="",c.whichNode&&Object.keys(c.whichNode).length>0){b(e,"h4","",c.whichNode.label||"Node");var t=b(e,"form","node-form");["id","date"].concat(Object.keys(c.whichNode).filter((function(e){return!["id","date","label"].includes(e)}))).forEach((function(e){if(void 0!==c.whichNode[e]){var o=b(t,"div","node-field");b(o,"label","node-label","".concat(e,": "),{for:"input-".concat(e)}),b(o,"input","node-input","",{id:"input-".concat(e),value:c.whichNode[e],name:e}).addEventListener("change",(function(t){c.whichNode[e]=t.target.value})),"date"===e&&b(t,"hr","node-divider")}}));var o=document.createElement("button");o.type="button",o.textContent="Add node to list",o.classList.add("save-button"),o.addEventListener("click",(function(){return u(c.whichNode)})),t.appendChild(o)}else{var n=document.createElement("p");n.textContent="No active node selected",n.classList.add("inside"),e.appendChild(n)}}(r)}window.demoClearAll=function(){console.log("demoClearAll"),c.nodes=[],c.randomToken="",c.listOfLabels=[],c.aboutGraphletJS="",c.whichNode={},f()},window.demoAboutGraphletJS=function(){console.log("demoAboutGraphletJs"),c.aboutGraphletJS=t(),f()},window.demoGetRandomToken=function(e){c.randomToken=i(c.nodes,e),console.log(c.randomToken),f()},window.demoInitList=function(){c.nodes=n(),console.log("demoInitList",c.nodes),c.listOfLabels=r(c.nodes,"id"),f()},window.demoGetListOfLabels=function(e){console.log("demoGetListOfLabels",e),c.listOfLabels=r(c.nodes,e),f()},window.demoInitNode=s,window.demoGetNodeByKeyPair=function(e,t){console.log("demoGetNodeByKeyPair",e,t),c.whichNode=a(c.nodes,e,t,!0),console.log(c.whichNode),f()},window.demoGetNodeByKeyPairs=function(){c.searchResults=getNodeByKeyPairs(c.nodes,[{key:"id",value:"123"},{key:"name",value:"Node1"},{key:"id",value:"aaa"}],!1),console.log("demoGetNodeByKeyPairs done",c.searchResults)},window.demoGetNodeById=function(e){console.log("demoGetNodeById",e),c.whichNode=a(c.nodes,"id",e,!0)[0],console.log(c.whichNode),f()},window.demoAddNode=u,document.addEventListener("DOMContentLoaded",f)})()})();