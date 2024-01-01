(()=>{var e={579:(e,t,n)=>{"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){var i,r,a,d;i=e,r=t,a=n[t],d=function(e,t){if("object"!=o(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!=o(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==o(d)?d:String(d))in i?Object.defineProperty(i,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[r]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var d=n(869).initLabelNode;function c(){return console.log("GraphletJS v0.0.1"),{data:"GraphletJS v0.0.1",msg:"SUCCESS"}}function l(e,t){var n,o;do{n="";for(var i=0;i<t;i++)n+=Math.floor(16*Math.random()).toString(16);o=!e.some((function(e){return e.id===n}))}while(!o);return{data:n,msg:"SUCCESS"}}function s(e,t){return console.log("getListOfLabels",e,t),e&&e.length>0?"id"===t?e.filter((function(e){return"Label"===e.label})).map((function(e){return e.strLabel})):"obj"===t?e.filter((function(e){return"Label"===e.label})):[]:[]}window.aboutGraphletJS=c,window.getRandomToken=l,window.getListOfLabels=s;var u=function(){console.log("getDateObjects");var e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return"".concat(t).concat(n).concat(o).concat(i).concat(r)};function f(){return[d]}function m(e,t){var n=Object.assign({},e.find((function(e){return"Label"===e.label&&e.strLabel===t})));return n||((n=d()).label="Label"),n.id=l(e,12),n.date=u(),console.log("initNode",n),n}function b(e,t,n,o){return o?[Object.assign({},e.find((function(e){return e[t]===n})))]:[Object.assign({},e.filter((function(e){return e[t]===n})))]}window.initList=f,window.initNode=m,window.getNodeByKeyPairs=function(e,t,n){console.log("getNodeByKeyPairs",t,n);var o=e.filter((function(e){return t.every((function(t){return e[t.key]===t.value}))}));return console.log(o),n?o[0]:o},window.getNodeByKeyPair=b,e.exports={aboutGraphletJS:c,getRandomToken:l,getListOfLabels:s,getListOfKeys:function(e){console.log("getListOfKeys");var t=new Set;e.forEach((function(e){Object.keys(e).forEach((function(e){t.add(e)}))}));var n=Array.from(t).sort();return["id","date","label"].reverse().forEach((function(e){var t;n.includes(e)&&(n=[e].concat(function(e){if(Array.isArray(e))return a(e)}(t=n.filter((function(t){return t!==e})))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()))})),n},getDateObjects:u,initList:f,initNode:m,getNodeByKeyPair:b,addNode:function(e,t){var n=b(e,"id",t.id,!0)[0];if(console.log("id exists",n),n&&Object.keys(n).length>0)return{data:e,msg:"ERROR_ID_EXISTS"};if(""===t.id)return{data:e,msg:"ERROR_ID_CANNOT_BE_AN_EMPTY_STRING"};if("Label"===t.label){var o=b(e,"strLabel",t.strLabel,!0)[0];if(o&&Object.keys(o).length>0)return console.log("strlabel exists"),{data:e,msg:"ERROR_STRLABEL_EXISTS"}}return e.push(t),console.log("nodes with added",e),{data:e,msg:"SUCCESS"}},removeNode:function(e,t){return{data:e=e.filter((function(e){return e!==t})),msg:"SUCCESS"}},updateNode:function(e,t){return e.map((function(e){return e.id===t.id?r(r({},e),t):e}))},validateListContent:function(e){var t=e.every((function(e){return e&&"object"===o(e)}));return{data:t,msg:t?"Valid list content.":"Invalid list content. List must contain only node objects."}},validateList:function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?fixedNodes:e}}},869:e=>{var t=[{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},{id:"bbb",label:"Label",date:"202312311828",strLabel:"Topic",strLabelDesc:"A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.",strText:""},{id:"ccc",label:"Topic",date:"202312210727",strText:"History"}];window.validNodes=t,e.exports={initLabelNode:{id:"aaa",label:"Label",date:"202312311822",strLabel:"Label",strLabelDesc:"The basic building block of the database."},validNodes:t}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(()=>{var e=n(579),t=e.aboutGraphletJS,o=e.initList,i=e.getRandomToken,r=e.getListOfLabels,a=e.getListOfKeys,d=e.getNodeByKeyPair,c=e.initNode,l=e.addNode,s=e.updateNode,u=e.removeNode,f={nodes:[],randomToken:"",listOfLabels:[],listOfKeys:[],aboutGraphletJS:"",whichNode:{},whichNodeMode:"",searchResults:[]};function m(e){p(c(f.nodes,e),"create")}function b(e){console.log("demoAddNode",f.nodes,e);var t=l(f.nodes,e);"SUCCESS"===t.msg&&(f.nodes=t.data,f.listOfLabels=r(f.nodes,"id"),f.whichNodeMode="update"),y()}function h(e){console.log("demoRemoveNode",f.nodes,e);var t=u(f.nodes,e);"SUCCESS"===t.msg&&(f.nodes=t.data,f.whichNode.id===e.id&&(f.whichNode={})),console.log("res",t,f.nodes),y()}function p(e,t){f.whichNode=e,f.whichNodeMode=t,y()}function g(e,t,n,o){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=document.createElement(t);for(var a in n&&(r.className=n),o&&(r.textContent=o),i)r.setAttribute(a,i[a]);return e.appendChild(r),r}function y(){var e=document.getElementById("aboutGraphletJS"),t=document.getElementById("nodesList"),n=document.getElementById("labelsList"),o=document.getElementById("keysList"),i=document.getElementById("nodeCount"),r=document.getElementById("randomToken"),a=document.getElementById("whichNode");document.getElementById("createNodeModal"),t.innerHTML="",n.innerHTML="",o.innerHTML="",function(e){f.nodes.forEach((function(t){var n=document.createElement("li");n.style.display="flex",n.style.justifyContent="space-between";var o=document.createElement("span");o.textContent=t.label,o.onclick=function(){return p(t,"update")},n.appendChild(o);var i=document.createElement("span");i.textContent=t.id,i.onclick=function(){return p(t,"update")},n.appendChild(i);var r=document.createElement("span");r.textContent=t.date,r.onclick=function(){return p(t,"update")},n.appendChild(r);var a=document.createElement("span");a.textContent="🗑️",a.style.cursor="pointer",a.onclick=function(){return h(t)},n.appendChild(a),e.appendChild(n)}))}(t),i&&(i.textContent="Your list has ".concat(f.nodes.length," items")),e&&(e.textContent="".concat(f.aboutGraphletJS)),randomToken&&(r.textContent="".concat(f.randomToken)),f.listOfLabels.forEach((function(e){var t=document.createElement("li");t.classList.add("labelListItem");var o=document.createElement("span");o.textContent=e,t.appendChild(o);var i=document.createElement("span");i.textContent="➕",t.appendChild(i),t.onclick=function(){console.log("clicked",t.textContent),m(o.textContent)},n.appendChild(t)})),f.listOfKeys.forEach((function(e){var t=document.createElement("li");t.classList.add("keyListItem");var n=document.createElement("span");n.textContent=e,t.appendChild(n),t.onclick=function(){console.log("clicked",t.textContent)},o.appendChild(t)})),function(e){if(e)if(console.log("whichNodeDiv",f.whichNode),e.innerHTML="",f.whichNode&&Object.keys(f.whichNode).length>0){g(e,"h4","",f.whichNode.label||"Node");var t=g(e,"form","node-form");if(function(e,t){t.forEach((function(t){if(void 0!==f.whichNode[t]){var n=g(e,"div","node-field");g(n,"label","node-label","".concat(t,": "),{for:"input-".concat(t)}),g(n,"input","node-input","",{id:"input-".concat(t),value:f.whichNode[t],name:t}).addEventListener("change",(function(e){f.whichNode[t]=e.target.value})),"date"===t&&g(e,"hr","node-divider")}}))}(t,["id","date"].concat(Object.keys(f.whichNode).filter((function(e){return!["id","date","label"].includes(e)})))),f.whichNodeMode){var n=document.createElement("button");n.type="button",n.classList.add("save-button"),"update"===f.whichNodeMode?(n.addEventListener("click",(function(){return function(e){console.log("demoUpdateNode",f.nodes,e);var t=s(f.nodes,e);"SUCCESS"===t.msg&&(f.nodes=t.data),y()}(f.whichNode)})),n.textContent="Update Node"):"create"===f.whichNodeMode&&(n.addEventListener("click",(function(){return b(f.whichNode)})),n.textContent="Create Node"),t.appendChild(n)}}else{var o=document.createElement("p");o.textContent="No active node selected",o.classList.add("inside"),e.appendChild(o)}}(a)}window.demoClearAll=function(){console.log("demoClearAll"),f.nodes=[],f.randomToken="",f.listOfLabels=[],f.listOfKeys=[],f.aboutGraphletJS="",f.whichNode={},f.searchResults=[],y()},window.demoAboutGraphletJS=function(){console.log("demoAboutGraphletJs");var e=t();"SUCCESS"===e.msg&&(f.aboutGraphletJS=e.data),y()},window.demoGetRandomToken=function(e){console.log("demoGetRandomToken",e);var t=i(f.nodes,e);"SUCCESS"===t.msg&&(f.randomToken=t.data),y()},window.demoInitList=function(){f.nodes=o(),console.log("demoInitList",f.nodes),f.listOfLabels=r(f.nodes,"id"),f.listOfKeys=a(f.nodes),y()},window.demoGetListOfLabels=function(e){console.log("demoGetListOfLabels",e),f.listOfLabels=r(f.nodes,e),y()},window.demoGetListOfKeys=function(){console.log("demoGetListOfKeys"),f.listOfKeys=a(f.nodes),y()},window.demoInitNode=m,window.demoGetNodeByKeyPair=function(e,t){console.log("demoGetNodeByKeyPair",e,t),f.whichNode=p(d(f.nodes,e,t,!0)[0],"update"),console.log(f.whichNode),y()},window.demoGetNodeByKeyPairs=function(){return f.searchResults=getNodeByKeyPairs(f.nodes,[{key:"id",value:"123"},{key:"name",value:"Node1"},{key:"id",value:"aaa"}],!1),console.log("demoGetNodeByKeyPairs done",f.searchResults),searchResults},window.demoGetNodeById=function(e){console.log("demoGetNodeById",e),f.whichNode=d(f.nodes,"id",e,!0)[0],console.log(f.whichNode),y()},window.demoAddNode=b,window.demoAddNode=b,window.demoRemoveNode=h,window.demoSetWhichNode=p,document.addEventListener("DOMContentLoaded",y)})()})();