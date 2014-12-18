/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function(a2,aB){var w,af,o=a2.document,aI=a2.location,d=a2.navigator,bg=a2.jQuery,I=a2.$,am=Array.prototype.push,a4=Array.prototype.slice,aK=Array.prototype.indexOf,z=Object.prototype.toString,V=Object.prototype.hasOwnProperty,aO=String.prototype.trim,bG=function(e,bZ){return new bG.fn.init(e,bZ,w)
},bx=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,aa=/\S/,aV=/\s+/,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,bo=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,a=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,bf=/^[\],:{}\s]*$/,bi=/(?:^|:|,)(?:\s*\[)+/g,bD=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,a0=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,bP=/^-ms-/,aU=/-([\da-z])/gi,N=function(e,bZ){return(bZ+"").toUpperCase()
},aF=function(){if(o.addEventListener){o.removeEventListener("DOMContentLoaded",aF,false);
bG.ready()
}else{if(o.readyState==="complete"){o.detachEvent("onreadystatechange",aF);
bG.ready()
}}},Z={};
bG.fn=bG.prototype={constructor:bG,init:function(e,b2,b1){var b0,b3,bZ,b4;
if(!e){return this
}if(e.nodeType){this.context=this[0]=e;
this.length=1;
return this
}if(typeof e==="string"){if(e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3){b0=[null,e,null]
}else{b0=bo.exec(e)
}if(b0&&(b0[1]||!b2)){if(b0[1]){b2=b2 instanceof bG?b2[0]:b2;
b4=(b2&&b2.nodeType?b2.ownerDocument||b2:o);
e=bG.parseHTML(b0[1],b4,true);
if(a.test(b0[1])&&bG.isPlainObject(b2)){this.attr.call(e,b2,true)
}return bG.merge(this,e)
}else{b3=o.getElementById(b0[2]);
if(b3&&b3.parentNode){if(b3.id!==b0[2]){return b1.find(e)
}this.length=1;
this[0]=b3
}this.context=o;
this.selector=e;
return this
}}else{if(!b2||b2.jquery){return(b2||b1).find(e)
}else{return this.constructor(b2).find(e)
}}}else{if(bG.isFunction(e)){return b1.ready(e)
}}if(e.selector!==aB){this.selector=e.selector;
this.context=e.context
}return bG.makeArray(e,this)
},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length
},toArray:function(){return a4.call(this)
},get:function(e){return e==null?this.toArray():(e<0?this[this.length+e]:this[e])
},pushStack:function(bZ,b1,e){var b0=bG.merge(this.constructor(),bZ);
b0.prevObject=this;
b0.context=this.context;
if(b1==="find"){b0.selector=this.selector+(this.selector?" ":"")+e
}else{if(b1){b0.selector=this.selector+"."+b1+"("+e+")"
}}return b0
},each:function(bZ,e){return bG.each(this,bZ,e)
},ready:function(e){bG.ready.promise().done(e);
return this
},eq:function(e){e=+e;
return e===-1?this.slice(e):this.slice(e,e+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(a4.apply(this,arguments),"slice",a4.call(arguments).join(","))
},map:function(e){return this.pushStack(bG.map(this,function(b0,bZ){return e.call(b0,bZ,b0)
}))
},end:function(){return this.prevObject||this.constructor(null)
},push:am,sort:[].sort,splice:[].splice};
bG.fn.init.prototype=bG.fn;
bG.extend=bG.fn.extend=function(){var b7,b0,e,bZ,b4,b5,b3=arguments[0]||{},b2=1,b1=arguments.length,b6=false;
if(typeof b3==="boolean"){b6=b3;
b3=arguments[1]||{};
b2=2
}if(typeof b3!=="object"&&!bG.isFunction(b3)){b3={}
}if(b1===b2){b3=this;
--b2
}for(;
b2<b1;
b2++){if((b7=arguments[b2])!=null){for(b0 in b7){e=b3[b0];
bZ=b7[b0];
if(b3===bZ){continue
}if(b6&&bZ&&(bG.isPlainObject(bZ)||(b4=bG.isArray(bZ)))){if(b4){b4=false;
b5=e&&bG.isArray(e)?e:[]
}else{b5=e&&bG.isPlainObject(e)?e:{}
}b3[b0]=bG.extend(b6,b5,bZ)
}else{if(bZ!==aB){b3[b0]=bZ
}}}}}return b3
};
bG.extend({noConflict:function(e){if(a2.$===bG){a2.$=I
}if(e&&a2.jQuery===bG){a2.jQuery=bg
}return bG
},isReady:false,readyWait:1,holdReady:function(e){if(e){bG.readyWait++
}else{bG.ready(true)
}},ready:function(e){if(e===true?--bG.readyWait:bG.isReady){return
}if(!o.body){return setTimeout(bG.ready,1)
}bG.isReady=true;
if(e!==true&&--bG.readyWait>0){return
}af.resolveWith(o,[bG]);
if(bG.fn.trigger){bG(o).trigger("ready").off("ready")
}},isFunction:function(e){return bG.type(e)==="function"
},isArray:Array.isArray||function(e){return bG.type(e)==="array"
},isWindow:function(e){return e!=null&&e==e.window
},isNumeric:function(e){return !isNaN(parseFloat(e))&&isFinite(e)
},type:function(e){return e==null?String(e):Z[z.call(e)]||"object"
},isPlainObject:function(b1){if(!b1||bG.type(b1)!=="object"||b1.nodeType||bG.isWindow(b1)){return false
}try{if(b1.constructor&&!V.call(b1,"constructor")&&!V.call(b1.constructor.prototype,"isPrototypeOf")){return false
}}catch(b0){return false
}var bZ;
for(bZ in b1){}return bZ===aB||V.call(b1,bZ)
},isEmptyObject:function(bZ){var e;
for(e in bZ){return false
}return true
},error:function(e){throw new Error(e)
},parseHTML:function(b1,b0,e){var bZ;
if(!b1||typeof b1!=="string"){return null
}if(typeof b0==="boolean"){e=b0;
b0=0
}b0=b0||o;
if((bZ=a.exec(b1))){return[b0.createElement(bZ[1])]
}bZ=bG.buildFragment([b1],b0,e?null:[]);
return bG.merge([],(bZ.cacheable?bG.clone(bZ.fragment):bZ.fragment).childNodes)
},parseJSON:function(e){if(!e||typeof e!=="string"){return null
}e=bG.trim(e);
if(a2.JSON&&a2.JSON.parse){return a2.JSON.parse(e)
}if(bf.test(e.replace(bD,"@").replace(a0,"]").replace(bi,""))){return(new Function("return "+e))()
}bG.error("Invalid JSON: "+e)
},parseXML:function(b1){var bZ,b0;
if(!b1||typeof b1!=="string"){return null
}try{if(a2.DOMParser){b0=new DOMParser();
bZ=b0.parseFromString(b1,"text/xml")
}else{bZ=new ActiveXObject("Microsoft.XMLDOM");
bZ.async="false";
bZ.loadXML(b1)
}}catch(b2){bZ=aB
}if(!bZ||!bZ.documentElement||bZ.getElementsByTagName("parsererror").length){bG.error("Invalid XML: "+b1)
}return bZ
},noop:function(){},globalEval:function(e){if(e&&aa.test(e)){(a2.execScript||function(bZ){a2["eval"].call(a2,bZ)
})(e)
}},camelCase:function(e){return e.replace(bP,"ms-").replace(aU,N)
},nodeName:function(bZ,e){return bZ.nodeName&&bZ.nodeName.toLowerCase()===e.toLowerCase()
},each:function(b3,b4,b0){var bZ,b1=0,b2=b3.length,e=b2===aB||bG.isFunction(b3);
if(b0){if(e){for(bZ in b3){if(b4.apply(b3[bZ],b0)===false){break
}}}else{for(;
b1<b2;
){if(b4.apply(b3[b1++],b0)===false){break
}}}}else{if(e){for(bZ in b3){if(b4.call(b3[bZ],bZ,b3[bZ])===false){break
}}}else{for(;
b1<b2;
){if(b4.call(b3[b1],b1,b3[b1++])===false){break
}}}}return b3
},trim:aO&&!aO.call("\uFEFF\xA0")?function(e){return e==null?"":aO.call(e)
}:function(e){return e==null?"":(e+"").replace(C,"")
},makeArray:function(e,b0){var b1,bZ=b0||[];
if(e!=null){b1=bG.type(e);
if(e.length==null||b1==="string"||b1==="function"||b1==="regexp"||bG.isWindow(e)){am.call(bZ,e)
}else{bG.merge(bZ,e)
}}return bZ
},inArray:function(b1,bZ,b0){var e;
if(bZ){if(aK){return aK.call(bZ,b1,b0)
}e=bZ.length;
b0=b0?b0<0?Math.max(0,e+b0):b0:0;
for(;
b0<e;
b0++){if(b0 in bZ&&bZ[b0]===b1){return b0
}}}return -1
},merge:function(b2,b0){var e=b0.length,b1=b2.length,bZ=0;
if(typeof e==="number"){for(;
bZ<e;
bZ++){b2[b1++]=b0[bZ]
}}else{while(b0[bZ]!==aB){b2[b1++]=b0[bZ++]
}}b2.length=b1;
return b2
},grep:function(bZ,b4,e){var b3,b0=[],b1=0,b2=bZ.length;
e=!!e;
for(;
b1<b2;
b1++){b3=!!b4(bZ[b1],b1);
if(e!==b3){b0.push(bZ[b1])
}}return b0
},map:function(e,b5,b6){var b3,b4,b2=[],b0=0,bZ=e.length,b1=e instanceof bG||bZ!==aB&&typeof bZ==="number"&&((bZ>0&&e[0]&&e[bZ-1])||bZ===0||bG.isArray(e));
if(b1){for(;
b0<bZ;
b0++){b3=b5(e[b0],b0,b6);
if(b3!=null){b2[b2.length]=b3
}}}else{for(b4 in e){b3=b5(e[b4],b4,b6);
if(b3!=null){b2[b2.length]=b3
}}}return b2.concat.apply([],b2)
},guid:1,proxy:function(b2,b1){var b0,e,bZ;
if(typeof b1==="string"){b0=b2[b1];
b1=b2;
b2=b0
}if(!bG.isFunction(b2)){return aB
}e=a4.call(arguments,2);
bZ=function(){return b2.apply(b1,e.concat(a4.call(arguments)))
};
bZ.guid=b2.guid=b2.guid||bG.guid++;
return bZ
},access:function(e,b4,b7,b5,b2,b8,b6){var b0,b3=b7==null,b1=0,bZ=e.length;
if(b7&&typeof b7==="object"){for(b1 in b7){bG.access(e,b4,b1,b7[b1],1,b8,b5)
}b2=1
}else{if(b5!==aB){b0=b6===aB&&bG.isFunction(b5);
if(b3){if(b0){b0=b4;
b4=function(ca,b9,cb){return b0.call(bG(ca),cb)
}
}else{b4.call(e,b5);
b4=null
}}if(b4){for(;
b1<bZ;
b1++){b4(e[b1],b7,b0?b5.call(e[b1],b1,b4(e[b1],b7)):b5,b6)
}}b2=1
}}return b2?e:b3?b4.call(e):bZ?b4(e[0],b7):b8
},now:function(){return(new Date()).getTime()
}});
bG.ready.promise=function(b2){if(!af){af=bG.Deferred();
if(o.readyState==="complete"){setTimeout(bG.ready,1)
}else{if(o.addEventListener){o.addEventListener("DOMContentLoaded",aF,false);
a2.addEventListener("load",bG.ready,false)
}else{o.attachEvent("onreadystatechange",aF);
a2.attachEvent("onload",bG.ready);
var b1=false;
try{b1=a2.frameElement==null&&o.documentElement
}catch(b0){}if(b1&&b1.doScroll){(function bZ(){if(!bG.isReady){try{b1.doScroll("left")
}catch(b3){return setTimeout(bZ,50)
}bG.ready()
}})()
}}}}return af.promise(b2)
};
bG.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(bZ,e){Z["[object "+e+"]"]=e.toLowerCase()
});
w=bG(o);
var bU={};
function ac(bZ){var e=bU[bZ]={};
bG.each(bZ.split(aV),function(b1,b0){e[b0]=true
});
return e
}bG.Callbacks=function(b8){b8=typeof b8==="string"?(bU[b8]||ac(b8)):bG.extend({},b8);
var b1,e,b2,b0,b3,b4,b5=[],b6=!b8.once&&[],bZ=function(b9){b1=b8.memory&&b9;
e=true;
b4=b0||0;
b0=0;
b3=b5.length;
b2=true;
for(;
b5&&b4<b3;
b4++){if(b5[b4].apply(b9[0],b9[1])===false&&b8.stopOnFalse){b1=false;
break
}}b2=false;
if(b5){if(b6){if(b6.length){bZ(b6.shift())
}}else{if(b1){b5=[]
}else{b7.disable()
}}}},b7={add:function(){if(b5){var ca=b5.length;
(function b9(cb){bG.each(cb,function(cd,cc){var ce=bG.type(cc);
if(ce==="function"){if(!b8.unique||!b7.has(cc)){b5.push(cc)
}}else{if(cc&&cc.length&&ce!=="string"){b9(cc)
}}})
})(arguments);
if(b2){b3=b5.length
}else{if(b1){b0=ca;
bZ(b1)
}}}return this
},remove:function(){if(b5){bG.each(arguments,function(cb,b9){var ca;
while((ca=bG.inArray(b9,b5,ca))>-1){b5.splice(ca,1);
if(b2){if(ca<=b3){b3--
}if(ca<=b4){b4--
}}}})
}return this
},has:function(b9){return bG.inArray(b9,b5)>-1
},empty:function(){b5=[];
return this
},disable:function(){b5=b6=b1=aB;
return this
},disabled:function(){return !b5
},lock:function(){b6=aB;
if(!b1){b7.disable()
}return this
},locked:function(){return !b6
},fireWith:function(ca,b9){b9=b9||[];
b9=[ca,b9.slice?b9.slice():b9];
if(b5&&(!e||b6)){if(b2){b6.push(b9)
}else{bZ(b9)
}}return this
},fire:function(){b7.fireWith(this,arguments);
return this
},fired:function(){return !!e
}};
return b7
};
bG.extend({Deferred:function(b0){var bZ=[["resolve","done",bG.Callbacks("once memory"),"resolved"],["reject","fail",bG.Callbacks("once memory"),"rejected"],["notify","progress",bG.Callbacks("memory")]],b1="pending",b2={state:function(){return b1
},always:function(){e.done(arguments).fail(arguments);
return this
},then:function(){var b3=arguments;
return bG.Deferred(function(b4){bG.each(bZ,function(b6,b5){var b8=b5[0],b7=b3[b6];
e[b5[1]](bG.isFunction(b7)?function(){var b9=b7.apply(this,arguments);
if(b9&&bG.isFunction(b9.promise)){b9.promise().done(b4.resolve).fail(b4.reject).progress(b4.notify)
}else{b4[b8+"With"](this===e?b4:this,[b9])
}}:b4[b8])
});
b3=null
}).promise()
},promise:function(b3){return b3!=null?bG.extend(b3,b2):b2
}},e={};
b2.pipe=b2.then;
bG.each(bZ,function(b4,b3){var b6=b3[2],b5=b3[3];
b2[b3[1]]=b6.add;
if(b5){b6.add(function(){b1=b5
},bZ[b4^1][2].disable,bZ[2][2].lock)
}e[b3[0]]=b6.fire;
e[b3[0]+"With"]=b6.fireWith
});
b2.promise(e);
if(b0){b0.call(e,e)
}return e
},when:function(b2){var b0=0,b4=a4.call(arguments),e=b4.length,bZ=e!==1||(b2&&bG.isFunction(b2.promise))?e:0,b7=bZ===1?b2:bG.Deferred(),b1=function(b9,ca,b8){return function(cb){ca[b9]=this;
b8[b9]=arguments.length>1?a4.call(arguments):cb;
if(b8===b6){b7.notifyWith(ca,b8)
}else{if(!(--bZ)){b7.resolveWith(ca,b8)
}}}
},b6,b3,b5;
if(e>1){b6=new Array(e);
b3=new Array(e);
b5=new Array(e);
for(;
b0<e;
b0++){if(b4[b0]&&bG.isFunction(b4[b0].promise)){b4[b0].promise().done(b1(b0,b5,b4)).fail(b7.reject).progress(b1(b0,b3,b6))
}else{--bZ
}}}if(!bZ){b7.resolveWith(b5,b4)
}return b7.promise()
}});
bG.support=(function(){var cb,ca,b8,b9,b2,b7,b6,b4,b3,b1,bZ,b0=o.createElement("div");
b0.setAttribute("className","t");
b0.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
ca=b0.getElementsByTagName("*");
b8=b0.getElementsByTagName("a")[0];
if(!ca||!b8||!ca.length){return{}
}b9=o.createElement("select");
b2=b9.appendChild(o.createElement("option"));
b7=b0.getElementsByTagName("input")[0];
b8.style.cssText="top:1px;float:left;opacity:.5";
cb={leadingWhitespace:(b0.firstChild.nodeType===3),tbody:!b0.getElementsByTagName("tbody").length,htmlSerialize:!!b0.getElementsByTagName("link").length,style:/top/.test(b8.getAttribute("style")),hrefNormalized:(b8.getAttribute("href")==="/a"),opacity:/^0.5/.test(b8.style.opacity),cssFloat:!!b8.style.cssFloat,checkOn:(b7.value==="on"),optSelected:b2.selected,getSetAttribute:b0.className!=="t",enctype:!!o.createElement("form").enctype,html5Clone:o.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",boxModel:(o.compatMode==="CSS1Compat"),submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,boxSizingReliable:true,pixelPosition:false};
b7.checked=true;
cb.noCloneChecked=b7.cloneNode(true).checked;
b9.disabled=true;
cb.optDisabled=!b2.disabled;
try{delete b0.test
}catch(b5){cb.deleteExpando=false
}if(!b0.addEventListener&&b0.attachEvent&&b0.fireEvent){b0.attachEvent("onclick",bZ=function(){cb.noCloneEvent=false
});
b0.cloneNode(true).fireEvent("onclick");
b0.detachEvent("onclick",bZ)
}b7=o.createElement("input");
b7.value="t";
b7.setAttribute("type","radio");
cb.radioValue=b7.value==="t";
b7.setAttribute("checked","checked");
b7.setAttribute("name","t");
b0.appendChild(b7);
b6=o.createDocumentFragment();
b6.appendChild(b0.lastChild);
cb.checkClone=b6.cloneNode(true).cloneNode(true).lastChild.checked;
cb.appendChecked=b7.checked;
b6.removeChild(b7);
b6.appendChild(b0);
if(b0.attachEvent){for(b3 in {submit:true,change:true,focusin:true}){b4="on"+b3;
b1=(b4 in b0);
if(!b1){b0.setAttribute(b4,"return;");
b1=(typeof b0[b4]==="function")
}cb[b3+"Bubbles"]=b1
}}bG(function(){var cc,cg,ce,cf,cd="padding:0;margin:0;border:0;display:block;overflow:hidden;",e=o.getElementsByTagName("body")[0];
if(!e){return
}cc=o.createElement("div");
cc.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
e.insertBefore(cc,e.firstChild);
cg=o.createElement("div");
cc.appendChild(cg);
cg.innerHTML="<table><tr><td></td><td>t</td></tr></table>";
ce=cg.getElementsByTagName("td");
ce[0].style.cssText="padding:0;margin:0;border:0;display:none";
b1=(ce[0].offsetHeight===0);
ce[0].style.display="";
ce[1].style.display="none";
cb.reliableHiddenOffsets=b1&&(ce[0].offsetHeight===0);
cg.innerHTML="";
cg.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
cb.boxSizing=(cg.offsetWidth===4);
cb.doesNotIncludeMarginInBodyOffset=(e.offsetTop!==1);
if(a2.getComputedStyle){cb.pixelPosition=(a2.getComputedStyle(cg,null)||{}).top!=="1%";
cb.boxSizingReliable=(a2.getComputedStyle(cg,null)||{width:"4px"}).width==="4px";
cf=o.createElement("div");
cf.style.cssText=cg.style.cssText=cd;
cf.style.marginRight=cf.style.width="0";
cg.style.width="1px";
cg.appendChild(cf);
cb.reliableMarginRight=!parseFloat((a2.getComputedStyle(cf,null)||{}).marginRight)
}if(typeof cg.style.zoom!=="undefined"){cg.innerHTML="";
cg.style.cssText=cd+"width:1px;padding:1px;display:inline;zoom:1";
cb.inlineBlockNeedsLayout=(cg.offsetWidth===3);
cg.style.display="block";
cg.style.overflow="visible";
cg.innerHTML="<div></div>";
cg.firstChild.style.width="5px";
cb.shrinkWrapBlocks=(cg.offsetWidth!==3);
cc.style.zoom=1
}e.removeChild(cc);
cc=cg=ce=cf=null
});
b6.removeChild(b0);
ca=b8=b9=b2=b7=b6=b0=null;
return cb
})();
var bt=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,aL=/([A-Z])/g;
bG.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(bG.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},hasData:function(e){e=e.nodeType?bG.cache[e[bG.expando]]:e[bG.expando];
return !!e&&!O(e)
},data:function(b1,bZ,b3,b2){if(!bG.acceptData(b1)){return
}var b4,b6,b7=bG.expando,b5=typeof bZ==="string",b8=b1.nodeType,e=b8?bG.cache:b1,b0=b8?b1[b7]:b1[b7]&&b7;
if((!b0||!e[b0]||(!b2&&!e[b0].data))&&b5&&b3===aB){return
}if(!b0){if(b8){b1[b7]=b0=bG.deletedIds.pop()||bG.guid++
}else{b0=b7
}}if(!e[b0]){e[b0]={};
if(!b8){e[b0].toJSON=bG.noop
}}if(typeof bZ==="object"||typeof bZ==="function"){if(b2){e[b0]=bG.extend(e[b0],bZ)
}else{e[b0].data=bG.extend(e[b0].data,bZ)
}}b4=e[b0];
if(!b2){if(!b4.data){b4.data={}
}b4=b4.data
}if(b3!==aB){b4[bG.camelCase(bZ)]=b3
}if(b5){b6=b4[bZ];
if(b6==null){b6=b4[bG.camelCase(bZ)]
}}else{b6=b4
}return b6
},removeData:function(b1,bZ,b2){if(!bG.acceptData(b1)){return
}var b5,b4,b3,b6=b1.nodeType,e=b6?bG.cache:b1,b0=b6?b1[bG.expando]:bG.expando;
if(!e[b0]){return
}if(bZ){b5=b2?e[b0]:e[b0].data;
if(b5){if(!bG.isArray(bZ)){if(bZ in b5){bZ=[bZ]
}else{bZ=bG.camelCase(bZ);
if(bZ in b5){bZ=[bZ]
}else{bZ=bZ.split(" ")
}}}for(b4=0,b3=bZ.length;
b4<b3;
b4++){delete b5[bZ[b4]]
}if(!(b2?O:bG.isEmptyObject)(b5)){return
}}}if(!b2){delete e[b0].data;
if(!O(e[b0])){return
}}if(b6){bG.cleanData([b1],true)
}else{if(bG.support.deleteExpando||e!=e.window){delete e[b0]
}else{e[b0]=null
}}},_data:function(bZ,e,b0){return bG.data(bZ,e,b0,true)
},acceptData:function(bZ){var e=bZ.nodeName&&bG.noData[bZ.nodeName.toLowerCase()];
return !e||e!==true&&bZ.getAttribute("classid")===e
}});
bG.fn.extend({data:function(b7,b6){var b2,bZ,b5,e,b1,b0=this[0],b4=0,b3=null;
if(b7===aB){if(this.length){b3=bG.data(b0);
if(b0.nodeType===1&&!bG._data(b0,"parsedAttrs")){b5=b0.attributes;
for(b1=b5.length;
b4<b1;
b4++){e=b5[b4].name;
if(!e.indexOf("data-")){e=bG.camelCase(e.substring(5));
bv(b0,e,b3[e])
}}bG._data(b0,"parsedAttrs",true)
}}return b3
}if(typeof b7==="object"){return this.each(function(){bG.data(this,b7)
})
}b2=b7.split(".",2);
b2[1]=b2[1]?"."+b2[1]:"";
bZ=b2[1]+"!";
return bG.access(this,function(b8){if(b8===aB){b3=this.triggerHandler("getData"+bZ,[b2[0]]);
if(b3===aB&&b0){b3=bG.data(b0,b7);
b3=bv(b0,b7,b3)
}return b3===aB&&b2[1]?this.data(b2[0]):b3
}b2[1]=b8;
this.each(function(){var b9=bG(this);
b9.triggerHandler("setData"+bZ,b2);
bG.data(this,b7,b8);
b9.triggerHandler("changeData"+bZ,b2)
})
},null,b6,arguments.length>1,null,false)
},removeData:function(e){return this.each(function(){bG.removeData(this,e)
})
}});
function bv(b1,b0,b2){if(b2===aB&&b1.nodeType===1){var bZ="data-"+b0.replace(aL,"-$1").toLowerCase();
b2=b1.getAttribute(bZ);
if(typeof b2==="string"){try{b2=b2==="true"?true:b2==="false"?false:b2==="null"?null:+b2+""===b2?+b2:bt.test(b2)?bG.parseJSON(b2):b2
}catch(b3){}bG.data(b1,b0,b2)
}else{b2=aB
}}return b2
}function O(bZ){var e;
for(e in bZ){if(e==="data"&&bG.isEmptyObject(bZ[e])){continue
}if(e!=="toJSON"){return false
}}return true
}bG.extend({queue:function(b0,bZ,b1){var e;
if(b0){bZ=(bZ||"fx")+"queue";
e=bG._data(b0,bZ);
if(b1){if(!e||bG.isArray(b1)){e=bG._data(b0,bZ,bG.makeArray(b1))
}else{e.push(b1)
}}return e||[]
}},dequeue:function(b3,b2){b2=b2||"fx";
var bZ=bG.queue(b3,b2),b4=bZ.length,b1=bZ.shift(),e=bG._queueHooks(b3,b2),b0=function(){bG.dequeue(b3,b2)
};
if(b1==="inprogress"){b1=bZ.shift();
b4--
}if(b1){if(b2==="fx"){bZ.unshift("inprogress")
}delete e.stop;
b1.call(b3,b0,e)
}if(!b4&&e){e.empty.fire()
}},_queueHooks:function(b0,bZ){var e=bZ+"queueHooks";
return bG._data(b0,e)||bG._data(b0,e,{empty:bG.Callbacks("once memory").add(function(){bG.removeData(b0,bZ+"queue",true);
bG.removeData(b0,e,true)
})})
}});
bG.fn.extend({queue:function(e,bZ){var b0=2;
if(typeof e!=="string"){bZ=e;
e="fx";
b0--
}if(arguments.length<b0){return bG.queue(this[0],e)
}return bZ===aB?this:this.each(function(){var b1=bG.queue(this,e,bZ);
bG._queueHooks(this,e);
if(e==="fx"&&b1[0]!=="inprogress"){bG.dequeue(this,e)
}})
},dequeue:function(e){return this.each(function(){bG.dequeue(this,e)
})
},delay:function(bZ,e){bZ=bG.fx?bG.fx.speeds[bZ]||bZ:bZ;
e=e||"fx";
return this.queue(e,function(b1,b0){var b2=setTimeout(b1,bZ);
b0.stop=function(){clearTimeout(b2)
}
})
},clearQueue:function(e){return this.queue(e||"fx",[])
},promise:function(b0,b4){var bZ,b1=1,b5=bG.Deferred(),b3=this,e=this.length,b2=function(){if(!(--b1)){b5.resolveWith(b3,[b3])
}};
if(typeof b0!=="string"){b4=b0;
b0=aB
}b0=b0||"fx";
while(e--){bZ=bG._data(b3[e],b0+"queueHooks");
if(bZ&&bZ.empty){b1++;
bZ.empty.add(b2)
}}b2();
return b5.promise(b4)
}});
var a7,bV,n,bJ=/[\t\r\n]/g,ai=/\r/g,j=/^(?:button|input)$/i,aA=/^(?:button|input|object|select|textarea)$/i,D=/^a(?:rea|)$/i,M=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,bL=bG.support.getSetAttribute;
bG.fn.extend({attr:function(e,bZ){return bG.access(this,bG.attr,e,bZ,arguments.length>1)
},removeAttr:function(e){return this.each(function(){bG.removeAttr(this,e)
})
},prop:function(e,bZ){return bG.access(this,bG.prop,e,bZ,arguments.length>1)
},removeProp:function(e){e=bG.propFix[e]||e;
return this.each(function(){try{this[e]=aB;
delete this[e]
}catch(bZ){}})
},addClass:function(b2){var b4,b0,bZ,b1,b3,b5,e;
if(bG.isFunction(b2)){return this.each(function(b6){bG(this).addClass(b2.call(this,b6,this.className))
})
}if(b2&&typeof b2==="string"){b4=b2.split(aV);
for(b0=0,bZ=this.length;
b0<bZ;
b0++){b1=this[b0];
if(b1.nodeType===1){if(!b1.className&&b4.length===1){b1.className=b2
}else{b3=" "+b1.className+" ";
for(b5=0,e=b4.length;
b5<e;
b5++){if(b3.indexOf(" "+b4[b5]+" ")<0){b3+=b4[b5]+" "
}}b1.className=bG.trim(b3)
}}}}return this
},removeClass:function(b4){var b1,b2,b3,b5,bZ,b0,e;
if(bG.isFunction(b4)){return this.each(function(b6){bG(this).removeClass(b4.call(this,b6,this.className))
})
}if((b4&&typeof b4==="string")||b4===aB){b1=(b4||"").split(aV);
for(b0=0,e=this.length;
b0<e;
b0++){b3=this[b0];
if(b3.nodeType===1&&b3.className){b2=(" "+b3.className+" ").replace(bJ," ");
for(b5=0,bZ=b1.length;
b5<bZ;
b5++){while(b2.indexOf(" "+b1[b5]+" ")>=0){b2=b2.replace(" "+b1[b5]+" "," ")
}}b3.className=b4?bG.trim(b2):""
}}}return this
},toggleClass:function(b1,bZ){var b0=typeof b1,e=typeof bZ==="boolean";
if(bG.isFunction(b1)){return this.each(function(b2){bG(this).toggleClass(b1.call(this,b2,this.className,bZ),bZ)
})
}return this.each(function(){if(b0==="string"){var b4,b3=0,b2=bG(this),b5=bZ,b6=b1.split(aV);
while((b4=b6[b3++])){b5=e?b5:!b2.hasClass(b4);
b2[b5?"addClass":"removeClass"](b4)
}}else{if(b0==="undefined"||b0==="boolean"){if(this.className){bG._data(this,"__className__",this.className)
}this.className=this.className||b1===false?"":bG._data(this,"__className__")||""
}}})
},hasClass:function(e){var b1=" "+e+" ",b0=0,bZ=this.length;
for(;
b0<bZ;
b0++){if(this[b0].nodeType===1&&(" "+this[b0].className+" ").replace(bJ," ").indexOf(b1)>=0){return true
}}return false
},val:function(b1){var e,bZ,b2,b0=this[0];
if(!arguments.length){if(b0){e=bG.valHooks[b0.type]||bG.valHooks[b0.nodeName.toLowerCase()];
if(e&&"get" in e&&(bZ=e.get(b0,"value"))!==aB){return bZ
}bZ=b0.value;
return typeof bZ==="string"?bZ.replace(ai,""):bZ==null?"":bZ
}return
}b2=bG.isFunction(b1);
return this.each(function(b4){var b5,b3=bG(this);
if(this.nodeType!==1){return
}if(b2){b5=b1.call(this,b4,b3.val())
}else{b5=b1
}if(b5==null){b5=""
}else{if(typeof b5==="number"){b5+=""
}else{if(bG.isArray(b5)){b5=bG.map(b5,function(b6){return b6==null?"":b6+""
})
}}}e=bG.valHooks[this.type]||bG.valHooks[this.nodeName.toLowerCase()];
if(!e||!("set" in e)||e.set(this,b5,"value")===aB){this.value=b5
}})
}});
bG.extend({valHooks:{option:{get:function(e){var bZ=e.attributes.value;
return !bZ||bZ.specified?e.value:e.text
}},select:{get:function(e){var b4,b0,b6=e.options,b2=e.selectedIndex,b1=e.type==="select-one"||b2<0,b5=b1?null:[],b3=b1?b2+1:b6.length,bZ=b2<0?b3:b1?b2:0;
for(;
bZ<b3;
bZ++){b0=b6[bZ];
if((b0.selected||bZ===b2)&&(bG.support.optDisabled?!b0.disabled:b0.getAttribute("disabled")===null)&&(!b0.parentNode.disabled||!bG.nodeName(b0.parentNode,"optgroup"))){b4=bG(b0).val();
if(b1){return b4
}b5.push(b4)
}}return b5
},set:function(bZ,b0){var e=bG.makeArray(b0);
bG(bZ).find("option").each(function(){this.selected=bG.inArray(bG(this).val(),e)>=0
});
if(!e.length){bZ.selectedIndex=-1
}return e
}}},attrFn:{},attr:function(b4,b1,b5,b3){var b0,e,b2,bZ=b4.nodeType;
if(!b4||bZ===3||bZ===8||bZ===2){return
}if(b3&&bG.isFunction(bG.fn[b1])){return bG(b4)[b1](b5)
}if(typeof b4.getAttribute==="undefined"){return bG.prop(b4,b1,b5)
}b2=bZ!==1||!bG.isXMLDoc(b4);
if(b2){b1=b1.toLowerCase();
e=bG.attrHooks[b1]||(M.test(b1)?bV:a7)
}if(b5!==aB){if(b5===null){bG.removeAttr(b4,b1);
return
}else{if(e&&"set" in e&&b2&&(b0=e.set(b4,b5,b1))!==aB){return b0
}else{b4.setAttribute(b1,b5+"");
return b5
}}}else{if(e&&"get" in e&&b2&&(b0=e.get(b4,b1))!==null){return b0
}else{b0=b4.getAttribute(b1);
return b0===null?aB:b0
}}},removeAttr:function(b1,b3){var b2,b4,bZ,e,b0=0;
if(b3&&b1.nodeType===1){b4=b3.split(aV);
for(;
b0<b4.length;
b0++){bZ=b4[b0];
if(bZ){b2=bG.propFix[bZ]||bZ;
e=M.test(bZ);
if(!e){bG.attr(b1,bZ,"")
}b1.removeAttribute(bL?bZ:b2);
if(e&&b2 in b1){b1[b2]=false
}}}}},attrHooks:{type:{set:function(e,bZ){if(j.test(e.nodeName)&&e.parentNode){bG.error("type property can't be changed")
}else{if(!bG.support.radioValue&&bZ==="radio"&&bG.nodeName(e,"input")){var b0=e.value;
e.setAttribute("type",bZ);
if(b0){e.value=b0
}return bZ
}}}},value:{get:function(bZ,e){if(a7&&bG.nodeName(bZ,"button")){return a7.get(bZ,e)
}return e in bZ?bZ.value:null
},set:function(bZ,b0,e){if(a7&&bG.nodeName(bZ,"button")){return a7.set(bZ,b0,e)
}bZ.value=b0
}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(b3,b1,b4){var b0,e,b2,bZ=b3.nodeType;
if(!b3||bZ===3||bZ===8||bZ===2){return
}b2=bZ!==1||!bG.isXMLDoc(b3);
if(b2){b1=bG.propFix[b1]||b1;
e=bG.propHooks[b1]
}if(b4!==aB){if(e&&"set" in e&&(b0=e.set(b3,b4,b1))!==aB){return b0
}else{return(b3[b1]=b4)
}}else{if(e&&"get" in e&&(b0=e.get(b3,b1))!==null){return b0
}else{return b3[b1]
}}},propHooks:{tabIndex:{get:function(bZ){var e=bZ.getAttributeNode("tabindex");
return e&&e.specified?parseInt(e.value,10):aA.test(bZ.nodeName)||D.test(bZ.nodeName)&&bZ.href?0:aB
}}}});
bV={get:function(bZ,e){var b1,b0=bG.prop(bZ,e);
return b0===true||typeof b0!=="boolean"&&(b1=bZ.getAttributeNode(e))&&b1.nodeValue!==false?e.toLowerCase():aB
},set:function(bZ,b1,e){var b0;
if(b1===false){bG.removeAttr(bZ,e)
}else{b0=bG.propFix[e]||e;
if(b0 in bZ){bZ[b0]=true
}bZ.setAttribute(e,e.toLowerCase())
}return e
}};
if(!bL){n={name:true,id:true,coords:true};
a7=bG.valHooks.button={get:function(b0,bZ){var e;
e=b0.getAttributeNode(bZ);
return e&&(n[bZ]?e.value!=="":e.specified)?e.value:aB
},set:function(b0,b1,bZ){var e=b0.getAttributeNode(bZ);
if(!e){e=o.createAttribute(bZ);
b0.setAttributeNode(e)
}return(e.value=b1+"")
}};
bG.each(["width","height"],function(bZ,e){bG.attrHooks[e]=bG.extend(bG.attrHooks[e],{set:function(b0,b1){if(b1===""){b0.setAttribute(e,"auto");
return b1
}}})
});
bG.attrHooks.contenteditable={get:a7.get,set:function(bZ,b0,e){if(b0===""){b0="false"
}a7.set(bZ,b0,e)
}}
}if(!bG.support.hrefNormalized){bG.each(["href","src","width","height"],function(bZ,e){bG.attrHooks[e]=bG.extend(bG.attrHooks[e],{get:function(b1){var b0=b1.getAttribute(e,2);
return b0===null?aB:b0
}})
})
}if(!bG.support.style){bG.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||aB
},set:function(e,bZ){return(e.style.cssText=bZ+"")
}}
}if(!bG.support.optSelected){bG.propHooks.selected=bG.extend(bG.propHooks.selected,{get:function(bZ){var e=bZ.parentNode;
if(e){e.selectedIndex;
if(e.parentNode){e.parentNode.selectedIndex
}}return null
}})
}if(!bG.support.enctype){bG.propFix.enctype="encoding"
}if(!bG.support.checkOn){bG.each(["radio","checkbox"],function(){bG.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value
}}
})
}bG.each(["radio","checkbox"],function(){bG.valHooks[this]=bG.extend(bG.valHooks[this],{set:function(e,bZ){if(bG.isArray(bZ)){return(e.checked=bG.inArray(bG(e).val(),bZ)>=0)
}}})
});
var bE=/^(?:textarea|input|select)$/i,br=/^([^\.]*|)(?:\.(.+)|)$/,ba=/(?:^|\s)hover(\.\S+|)\b/,a3=/^key/,bK=/^(?:mouse|contextmenu)|click/,by=/^(?:focusinfocus|focusoutblur)$/,aq=function(e){return bG.event.special.hover?e:e.replace(ba,"mouseenter$1 mouseleave$1")
};
bG.event={add:function(b1,b5,cc,b3,b2){var b6,b4,cd,cb,ca,b8,e,b9,bZ,b0,b7;
if(b1.nodeType===3||b1.nodeType===8||!b5||!cc||!(b6=bG._data(b1))){return
}if(cc.handler){bZ=cc;
cc=bZ.handler;
b2=bZ.selector
}if(!cc.guid){cc.guid=bG.guid++
}cd=b6.events;
if(!cd){b6.events=cd={}
}b4=b6.handle;
if(!b4){b6.handle=b4=function(ce){return typeof bG!=="undefined"&&(!ce||bG.event.triggered!==ce.type)?bG.event.dispatch.apply(b4.elem,arguments):aB
};
b4.elem=b1
}b5=bG.trim(aq(b5)).split(" ");
for(cb=0;
cb<b5.length;
cb++){ca=br.exec(b5[cb])||[];
b8=ca[1];
e=(ca[2]||"").split(".").sort();
b7=bG.event.special[b8]||{};
b8=(b2?b7.delegateType:b7.bindType)||b8;
b7=bG.event.special[b8]||{};
b9=bG.extend({type:b8,origType:ca[1],data:b3,handler:cc,guid:cc.guid,selector:b2,needsContext:b2&&bG.expr.match.needsContext.test(b2),namespace:e.join(".")},bZ);
b0=cd[b8];
if(!b0){b0=cd[b8]=[];
b0.delegateCount=0;
if(!b7.setup||b7.setup.call(b1,b3,e,b4)===false){if(b1.addEventListener){b1.addEventListener(b8,b4,false)
}else{if(b1.attachEvent){b1.attachEvent("on"+b8,b4)
}}}}if(b7.add){b7.add.call(b1,b9);
if(!b9.handler.guid){b9.handler.guid=cc.guid
}}if(b2){b0.splice(b0.delegateCount++,0,b9)
}else{b0.push(b9)
}bG.event.global[b8]=true
}b1=null
},global:{},remove:function(b1,b6,cc,b2,b5){var cd,ce,b9,b0,bZ,b3,b4,cb,b8,e,ca,b7=bG.hasData(b1)&&bG._data(b1);
if(!b7||!(cb=b7.events)){return
}b6=bG.trim(aq(b6||"")).split(" ");
for(cd=0;
cd<b6.length;
cd++){ce=br.exec(b6[cd])||[];
b9=b0=ce[1];
bZ=ce[2];
if(!b9){for(b9 in cb){bG.event.remove(b1,b9+b6[cd],cc,b2,true)
}continue
}b8=bG.event.special[b9]||{};
b9=(b2?b8.delegateType:b8.bindType)||b9;
e=cb[b9]||[];
b3=e.length;
bZ=bZ?new RegExp("(^|\\.)"+bZ.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
for(b4=0;
b4<e.length;
b4++){ca=e[b4];
if((b5||b0===ca.origType)&&(!cc||cc.guid===ca.guid)&&(!bZ||bZ.test(ca.namespace))&&(!b2||b2===ca.selector||b2==="**"&&ca.selector)){e.splice(b4--,1);
if(ca.selector){e.delegateCount--
}if(b8.remove){b8.remove.call(b1,ca)
}}}if(e.length===0&&b3!==e.length){if(!b8.teardown||b8.teardown.call(b1,bZ,b7.handle)===false){bG.removeEvent(b1,b9,b7.handle)
}delete cb[b9]
}}if(bG.isEmptyObject(cb)){delete b7.handle;
bG.removeData(b1,"events",true)
}},customEvent:{getData:true,setData:true,changeData:true},trigger:function(bZ,b6,b4,cd){if(b4&&(b4.nodeType===3||b4.nodeType===8)){return
}var e,b1,b7,cb,b3,b2,b9,b8,b5,cc,ca=bZ.type||bZ,b0=[];
if(by.test(ca+bG.event.triggered)){return
}if(ca.indexOf("!")>=0){ca=ca.slice(0,-1);
b1=true
}if(ca.indexOf(".")>=0){b0=ca.split(".");
ca=b0.shift();
b0.sort()
}if((!b4||bG.event.customEvent[ca])&&!bG.event.global[ca]){return
}bZ=typeof bZ==="object"?bZ[bG.expando]?bZ:new bG.Event(ca,bZ):new bG.Event(ca);
bZ.type=ca;
bZ.isTrigger=true;
bZ.exclusive=b1;
bZ.namespace=b0.join(".");
bZ.namespace_re=bZ.namespace?new RegExp("(^|\\.)"+b0.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
b2=ca.indexOf(":")<0?"on"+ca:"";
if(!b4){e=bG.cache;
for(b7 in e){if(e[b7].events&&e[b7].events[ca]){bG.event.trigger(bZ,b6,e[b7].handle.elem,true)
}}return
}bZ.result=aB;
if(!bZ.target){bZ.target=b4
}b6=b6!=null?bG.makeArray(b6):[];
b6.unshift(bZ);
b9=bG.event.special[ca]||{};
if(b9.trigger&&b9.trigger.apply(b4,b6)===false){return
}b5=[[b4,b9.bindType||ca]];
if(!cd&&!b9.noBubble&&!bG.isWindow(b4)){cc=b9.delegateType||ca;
cb=by.test(cc+ca)?b4:b4.parentNode;
for(b3=b4;
cb;
cb=cb.parentNode){b5.push([cb,cc]);
b3=cb
}if(b3===(b4.ownerDocument||o)){b5.push([b3.defaultView||b3.parentWindow||a2,cc])
}}for(b7=0;
b7<b5.length&&!bZ.isPropagationStopped();
b7++){cb=b5[b7][0];
bZ.type=b5[b7][1];
b8=(bG._data(cb,"events")||{})[bZ.type]&&bG._data(cb,"handle");
if(b8){b8.apply(cb,b6)
}b8=b2&&cb[b2];
if(b8&&bG.acceptData(cb)&&b8.apply&&b8.apply(cb,b6)===false){bZ.preventDefault()
}}bZ.type=ca;
if(!cd&&!bZ.isDefaultPrevented()){if((!b9._default||b9._default.apply(b4.ownerDocument,b6)===false)&&!(ca==="click"&&bG.nodeName(b4,"a"))&&bG.acceptData(b4)){if(b2&&b4[ca]&&((ca!=="focus"&&ca!=="blur")||bZ.target.offsetWidth!==0)&&!bG.isWindow(b4)){b3=b4[b2];
if(b3){b4[b2]=null
}bG.event.triggered=ca;
b4[ca]();
bG.event.triggered=aB;
if(b3){b4[b2]=b3
}}}}return bZ.result
},dispatch:function(e){e=bG.event.fix(e||a2.event);
var b5,b4,ce,b8,b7,bZ,b6,cc,b1,cd,b2=((bG._data(this,"events")||{})[e.type]||[]),b3=b2.delegateCount,ca=a4.call(arguments),b0=!e.exclusive&&!e.namespace,b9=bG.event.special[e.type]||{},cb=[];
ca[0]=e;
e.delegateTarget=this;
if(b9.preDispatch&&b9.preDispatch.call(this,e)===false){return
}if(b3&&!(e.button&&e.type==="click")){for(ce=e.target;
ce!=this;
ce=ce.parentNode||this){if(ce.disabled!==true||e.type!=="click"){b7={};
b6=[];
for(b5=0;
b5<b3;
b5++){cc=b2[b5];
b1=cc.selector;
if(b7[b1]===aB){b7[b1]=cc.needsContext?bG(b1,this).index(ce)>=0:bG.find(b1,this,null,[ce]).length
}if(b7[b1]){b6.push(cc)
}}if(b6.length){cb.push({elem:ce,matches:b6})
}}}}if(b2.length>b3){cb.push({elem:this,matches:b2.slice(b3)})
}for(b5=0;
b5<cb.length&&!e.isPropagationStopped();
b5++){bZ=cb[b5];
e.currentTarget=bZ.elem;
for(b4=0;
b4<bZ.matches.length&&!e.isImmediatePropagationStopped();
b4++){cc=bZ.matches[b4];
if(b0||(!e.namespace&&!cc.namespace)||e.namespace_re&&e.namespace_re.test(cc.namespace)){e.data=cc.data;
e.handleObj=cc;
b8=((bG.event.special[cc.origType]||{}).handle||cc.handler).apply(bZ.elem,ca);
if(b8!==aB){e.result=b8;
if(b8===false){e.preventDefault();
e.stopPropagation()
}}}}}if(b9.postDispatch){b9.postDispatch.call(this,e)
}return e.result
},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(bZ,e){if(bZ.which==null){bZ.which=e.charCode!=null?e.charCode:e.keyCode
}return bZ
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(b1,b0){var b2,b3,e,bZ=b0.button,b4=b0.fromElement;
if(b1.pageX==null&&b0.clientX!=null){b2=b1.target.ownerDocument||o;
b3=b2.documentElement;
e=b2.body;
b1.pageX=b0.clientX+(b3&&b3.scrollLeft||e&&e.scrollLeft||0)-(b3&&b3.clientLeft||e&&e.clientLeft||0);
b1.pageY=b0.clientY+(b3&&b3.scrollTop||e&&e.scrollTop||0)-(b3&&b3.clientTop||e&&e.clientTop||0)
}if(!b1.relatedTarget&&b4){b1.relatedTarget=b4===b1.target?b0.toElement:b4
}if(!b1.which&&bZ!==aB){b1.which=(bZ&1?1:(bZ&2?3:(bZ&4?2:0)))
}return b1
}},fix:function(b0){if(b0[bG.expando]){return b0
}var bZ,b3,e=b0,b1=bG.event.fixHooks[b0.type]||{},b2=b1.props?this.props.concat(b1.props):this.props;
b0=bG.Event(e);
for(bZ=b2.length;
bZ;
){b3=b2[--bZ];
b0[b3]=e[b3]
}if(!b0.target){b0.target=e.srcElement||o
}if(b0.target.nodeType===3){b0.target=b0.target.parentNode
}b0.metaKey=!!b0.metaKey;
return b1.filter?b1.filter(b0,e):b0
},special:{load:{noBubble:true},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(b0,bZ,e){if(bG.isWindow(this)){this.onbeforeunload=e
}},teardown:function(bZ,e){if(this.onbeforeunload===e){this.onbeforeunload=null
}}}},simulate:function(b0,b2,b1,bZ){var b3=bG.extend(new bG.Event(),b1,{type:b0,isSimulated:true,originalEvent:{}});
if(bZ){bG.event.trigger(b3,null,b2)
}else{bG.event.dispatch.call(b2,b3)
}if(b3.isDefaultPrevented()){b1.preventDefault()
}}};
bG.event.handle=bG.event.dispatch;
bG.removeEvent=o.removeEventListener?function(bZ,e,b0){if(bZ.removeEventListener){bZ.removeEventListener(e,b0,false)
}}:function(b0,bZ,b1){var e="on"+bZ;
if(b0.detachEvent){if(typeof b0[e]==="undefined"){b0[e]=null
}b0.detachEvent(e,b1)
}};
bG.Event=function(bZ,e){if(!(this instanceof bG.Event)){return new bG.Event(bZ,e)
}if(bZ&&bZ.type){this.originalEvent=bZ;
this.type=bZ.type;
this.isDefaultPrevented=(bZ.defaultPrevented||bZ.returnValue===false||bZ.getPreventDefault&&bZ.getPreventDefault())?R:X
}else{this.type=bZ
}if(e){bG.extend(this,e)
}this.timeStamp=bZ&&bZ.timeStamp||bG.now();
this[bG.expando]=true
};
function X(){return false
}function R(){return true
}bG.Event.prototype={preventDefault:function(){this.isDefaultPrevented=R;
var bZ=this.originalEvent;
if(!bZ){return
}if(bZ.preventDefault){bZ.preventDefault()
}else{bZ.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=R;
var bZ=this.originalEvent;
if(!bZ){return
}if(bZ.stopPropagation){bZ.stopPropagation()
}bZ.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=R;
this.stopPropagation()
},isDefaultPrevented:X,isPropagationStopped:X,isImmediatePropagationStopped:X};
bG.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(bZ,e){bG.event.special[bZ]={delegateType:e,bindType:e,handle:function(b3){var b1,b5=this,b4=b3.relatedTarget,b2=b3.handleObj,b0=b2.selector;
if(!b4||(b4!==b5&&!bG.contains(b5,b4))){b3.type=b2.origType;
b1=b2.handler.apply(this,arguments);
b3.type=e
}return b1
}}
});
if(!bG.support.submitBubbles){bG.event.special.submit={setup:function(){if(bG.nodeName(this,"form")){return false
}bG.event.add(this,"click._submit keypress._submit",function(b1){var b0=b1.target,bZ=bG.nodeName(b0,"input")||bG.nodeName(b0,"button")?b0.form:aB;
if(bZ&&!bG._data(bZ,"_submit_attached")){bG.event.add(bZ,"submit._submit",function(e){e._submit_bubble=true
});
bG._data(bZ,"_submit_attached",true)
}})
},postDispatch:function(e){if(e._submit_bubble){delete e._submit_bubble;
if(this.parentNode&&!e.isTrigger){bG.event.simulate("submit",this.parentNode,e,true)
}}},teardown:function(){if(bG.nodeName(this,"form")){return false
}bG.event.remove(this,"._submit")
}}
}if(!bG.support.changeBubbles){bG.event.special.change={setup:function(){if(bE.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){bG.event.add(this,"propertychange._change",function(e){if(e.originalEvent.propertyName==="checked"){this._just_changed=true
}});
bG.event.add(this,"click._change",function(e){if(this._just_changed&&!e.isTrigger){this._just_changed=false
}bG.event.simulate("change",this,e,true)
})
}return false
}bG.event.add(this,"beforeactivate._change",function(b0){var bZ=b0.target;
if(bE.test(bZ.nodeName)&&!bG._data(bZ,"_change_attached")){bG.event.add(bZ,"change._change",function(e){if(this.parentNode&&!e.isSimulated&&!e.isTrigger){bG.event.simulate("change",this.parentNode,e,true)
}});
bG._data(bZ,"_change_attached",true)
}})
},handle:function(bZ){var e=bZ.target;
if(this!==e||bZ.isSimulated||bZ.isTrigger||(e.type!=="radio"&&e.type!=="checkbox")){return bZ.handleObj.handler.apply(this,arguments)
}},teardown:function(){bG.event.remove(this,"._change");
return !bE.test(this.nodeName)
}}
}if(!bG.support.focusinBubbles){bG.each({focus:"focusin",blur:"focusout"},function(b1,e){var bZ=0,b0=function(b2){bG.event.simulate(e,b2.target,bG.event.fix(b2),true)
};
bG.event.special[e]={setup:function(){if(bZ++===0){o.addEventListener(b1,b0,true)
}},teardown:function(){if(--bZ===0){o.removeEventListener(b1,b0,true)
}}}
})
}bG.fn.extend({on:function(b0,e,b3,b2,bZ){var b4,b1;
if(typeof b0==="object"){if(typeof e!=="string"){b3=b3||e;
e=aB
}for(b1 in b0){this.on(b1,e,b3,b0[b1],bZ)
}return this
}if(b3==null&&b2==null){b2=e;
b3=e=aB
}else{if(b2==null){if(typeof e==="string"){b2=b3;
b3=aB
}else{b2=b3;
b3=e;
e=aB
}}}if(b2===false){b2=X
}else{if(!b2){return this
}}if(bZ===1){b4=b2;
b2=function(b5){bG().off(b5);
return b4.apply(this,arguments)
};
b2.guid=b4.guid||(b4.guid=bG.guid++)
}return this.each(function(){bG.event.add(this,b0,b2,b3,e)
})
},one:function(bZ,e,b1,b0){return this.on(bZ,e,b1,b0,1)
},off:function(b0,e,b2){var bZ,b1;
if(b0&&b0.preventDefault&&b0.handleObj){bZ=b0.handleObj;
bG(b0.delegateTarget).off(bZ.namespace?bZ.origType+"."+bZ.namespace:bZ.origType,bZ.selector,bZ.handler);
return this
}if(typeof b0==="object"){for(b1 in b0){this.off(b1,e,b0[b1])
}return this
}if(e===false||typeof e==="function"){b2=e;
e=aB
}if(b2===false){b2=X
}return this.each(function(){bG.event.remove(this,b0,b2,e)
})
},bind:function(e,b0,bZ){return this.on(e,null,b0,bZ)
},unbind:function(e,bZ){return this.off(e,null,bZ)
},live:function(e,b0,bZ){bG(this.context).on(e,this.selector,b0,bZ);
return this
},die:function(e,bZ){bG(this.context).off(e,this.selector||"**",bZ);
return this
},delegate:function(e,bZ,b1,b0){return this.on(bZ,e,b1,b0)
},undelegate:function(e,bZ,b0){return arguments.length===1?this.off(e,"**"):this.off(bZ,e||"**",b0)
},trigger:function(e,bZ){return this.each(function(){bG.event.trigger(e,bZ,this)
})
},triggerHandler:function(e,bZ){if(this[0]){return bG.event.trigger(e,bZ,this[0],true)
}},toggle:function(b1){var bZ=arguments,e=b1.guid||bG.guid++,b0=0,b2=function(b3){var b4=(bG._data(this,"lastToggle"+b1.guid)||0)%b0;
bG._data(this,"lastToggle"+b1.guid,b4+1);
b3.preventDefault();
return bZ[b4].apply(this,arguments)||false
};
b2.guid=e;
while(b0<bZ.length){bZ[b0++].guid=e
}return this.click(b2)
},hover:function(e,bZ){return this.mouseenter(e).mouseleave(bZ||e)
}});
bG.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(bZ,e){bG.fn[e]=function(b1,b0){if(b0==null){b0=b1;
b1=null
}return arguments.length>0?this.on(e,null,b1,b0):this.trigger(e)
};
if(a3.test(e)){bG.event.fixHooks[e]=bG.event.keyHooks
}if(bK.test(e)){bG.event.fixHooks[e]=bG.event.mouseHooks
}});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function(cS,ch){var cX,ca,cL,b0,cm,cA,cd,cg,cc,cJ,b9=true,cu="undefined",cZ=("sizcache"+Math.random()).replace(".",""),b4=String,b8=cS.document,cb=b8.documentElement,cr=0,cf=0,cE=[].pop,cW=[].push,cl=[].slice,co=[].indexOf||function(c8){var c7=0,e=this.length;
for(;
c7<e;
c7++){if(this[c7]===c8){return c7
}}return -1
},c1=function(e,c7){e[cZ]=c7==null||c7;
return e
},c5=function(){var e={},c7=[];
return c1(function(c8,c9){if(c7.push(c8)>cL.cacheLength){delete e[c7.shift()]
}return(e[c8+" "]=c9)
},e)
},cU=c5(),cV=c5(),cn=c5(),cy="[\\x20\\t\\r\\n\\f]",ck="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",ci=ck.replace("w","w#"),c4="([*^$|!~]?=)",cP="\\["+cy+"*("+ck+")"+cy+"*(?:"+c4+cy+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+ci+")|)|)"+cy+"*\\]",c6=":("+ck+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+cP+")|[^:]|\\\\.)*|.*))\\)|)",cz=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+cy+"*((?:-\\d)?\\d*)"+cy+"*\\)|)(?=[^-]|$)",cT=new RegExp("^"+cy+"+|((?:^|[^\\\\])(?:\\\\.)*)"+cy+"+$","g"),b5=new RegExp("^"+cy+"*,"+cy+"*"),cH=new RegExp("^"+cy+"*([\\x20\\t\\r\\n\\f>+~])"+cy+"*"),cM=new RegExp(c6),cO=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,cD=/^:not/,cR=/[\x20\t\r\n\f]*[+~]/,c0=/:not\($/,cs=/h\d/i,cN=/input|select|textarea|button/i,ct=/\\(?!\\)/g,cG={ID:new RegExp("^#("+ck+")"),CLASS:new RegExp("^\\.("+ck+")"),NAME:new RegExp("^\\[name=['\"]?("+ck+")['\"]?\\]"),TAG:new RegExp("^("+ck.replace("w","w*")+")"),ATTR:new RegExp("^"+cP),PSEUDO:new RegExp("^"+c6),POS:new RegExp(cz,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+cy+"*(even|odd|(([+-]|)(\\d*)n|)"+cy+"*(?:([+-]|)"+cy+"*(\\d+)|))"+cy+"*\\)|)","i"),needsContext:new RegExp("^"+cy+"*[>+~]|"+cz,"i")},cK=function(c7){var c9=b8.createElement("div");
try{return c7(c9)
}catch(c8){return false
}finally{c9=null
}},b7=cK(function(e){e.appendChild(b8.createComment(""));
return !e.getElementsByTagName("*").length
}),cC=cK(function(e){e.innerHTML="<a href='#'></a>";
return e.firstChild&&typeof e.firstChild.getAttribute!==cu&&e.firstChild.getAttribute("href")==="#"
}),cq=cK(function(c7){c7.innerHTML="<select></select>";
var e=typeof c7.lastChild.getAttribute("multiple");
return e!=="boolean"&&e!=="string"
}),cB=cK(function(e){e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!e.getElementsByClassName||!e.getElementsByClassName("e").length){return false
}e.lastChild.className="e";
return e.getElementsByClassName("e").length===2
}),bZ=cK(function(c7){c7.id=cZ+0;
c7.innerHTML="<a name='"+cZ+"'></a><div name='"+cZ+"'></div>";
cb.insertBefore(c7,cb.firstChild);
var e=b8.getElementsByName&&b8.getElementsByName(cZ).length===2+b8.getElementsByName(cZ+0).length;
ca=!b8.getElementById(cZ);
cb.removeChild(c7);
return e
});
try{cl.call(cb.childNodes,0)[0].nodeType
}catch(c3){cl=function(c7){var c8,e=[];
for(;
(c8=this[c7]);
c7++){e.push(c8)
}return e
}
}function cQ(c9,e,db,de){db=db||[];
e=e||b8;
var dc,c7,dd,c8,da=e.nodeType;
if(!c9||typeof c9!=="string"){return db
}if(da!==1&&da!==9){return[]
}dd=cm(e);
if(!dd&&!de){if((dc=cO.exec(c9))){if((c8=dc[1])){if(da===9){c7=e.getElementById(c8);
if(c7&&c7.parentNode){if(c7.id===c8){db.push(c7);
return db
}}else{return db
}}else{if(e.ownerDocument&&(c7=e.ownerDocument.getElementById(c8))&&cA(e,c7)&&c7.id===c8){db.push(c7);
return db
}}}else{if(dc[2]){cW.apply(db,cl.call(e.getElementsByTagName(c9),0));
return db
}else{if((c8=dc[3])&&cB&&e.getElementsByClassName){cW.apply(db,cl.call(e.getElementsByClassName(c8),0));
return db
}}}}}return cY(c9.replace(cT,"$1"),e,db,de,dd)
}cQ.matches=function(c7,e){return cQ(c7,null,null,e)
};
cQ.matchesSelector=function(e,c7){return cQ(c7,null,null,[e]).length>0
};
function cI(e){return function(c8){var c7=c8.nodeName.toLowerCase();
return c7==="input"&&c8.type===e
}
}function b3(e){return function(c8){var c7=c8.nodeName.toLowerCase();
return(c7==="input"||c7==="button")&&c8.type===e
}
}function cF(e){return c1(function(c7){c7=+c7;
return c1(function(c8,dc){var da,c9=e([],c8.length,c7),db=c9.length;
while(db--){if(c8[(da=c9[db])]){c8[da]=!(dc[da]=c8[da])
}}})
})
}b0=cQ.getText=function(da){var c9,c7="",c8=0,e=da.nodeType;
if(e){if(e===1||e===9||e===11){if(typeof da.textContent==="string"){return da.textContent
}else{for(da=da.firstChild;
da;
da=da.nextSibling){c7+=b0(da)
}}}else{if(e===3||e===4){return da.nodeValue
}}}else{for(;
(c9=da[c8]);
c8++){c7+=b0(c9)
}}return c7
};
cm=cQ.isXML=function(e){var c7=e&&(e.ownerDocument||e).documentElement;
return c7?c7.nodeName!=="HTML":false
};
cA=cQ.contains=cb.contains?function(c7,e){var c9=c7.nodeType===9?c7.documentElement:c7,c8=e&&e.parentNode;
return c7===c8||!!(c8&&c8.nodeType===1&&c9.contains&&c9.contains(c8))
}:cb.compareDocumentPosition?function(c7,e){return e&&!!(c7.compareDocumentPosition(e)&16)
}:function(c7,e){while((e=e.parentNode)){if(e===c7){return true
}}return false
};
cQ.attr=function(c8,c7){var c9,e=cm(c8);
if(!e){c7=c7.toLowerCase()
}if((c9=cL.attrHandle[c7])){return c9(c8)
}if(e||cq){return c8.getAttribute(c7)
}c9=c8.getAttributeNode(c7);
return c9?typeof c8[c7]==="boolean"?c8[c7]?c7:null:c9.specified?c9.value:null:null
};
cL=cQ.selectors={cacheLength:50,createPseudo:c1,match:cG,attrHandle:cC?{}:{href:function(e){return e.getAttribute("href",2)
},type:function(e){return e.getAttribute("type")
}},find:{ID:ca?function(c9,c8,c7){if(typeof c8.getElementById!==cu&&!c7){var e=c8.getElementById(c9);
return e&&e.parentNode?[e]:[]
}}:function(c9,c8,c7){if(typeof c8.getElementById!==cu&&!c7){var e=c8.getElementById(c9);
return e?e.id===c9||typeof e.getAttributeNode!==cu&&e.getAttributeNode("id").value===c9?[e]:ch:[]
}},TAG:b7?function(e,c7){if(typeof c7.getElementsByTagName!==cu){return c7.getElementsByTagName(e)
}}:function(e,da){var c9=da.getElementsByTagName(e);
if(e==="*"){var db,c8=[],c7=0;
for(;
(db=c9[c7]);
c7++){if(db.nodeType===1){c8.push(db)
}}return c8
}return c9
},NAME:bZ&&function(e,c7){if(typeof c7.getElementsByName!==cu){return c7.getElementsByName(name)
}},CLASS:cB&&function(c8,c7,e){if(typeof c7.getElementsByClassName!==cu&&!e){return c7.getElementsByClassName(c8)
}}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(ct,"");
e[3]=(e[4]||e[5]||"").replace(ct,"");
if(e[2]==="~="){e[3]=" "+e[3]+" "
}return e.slice(0,4)
},CHILD:function(e){e[1]=e[1].toLowerCase();
if(e[1]==="nth"){if(!e[2]){cQ.error(e[0])
}e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd"));
e[4]=+((e[6]+e[7])||e[2]==="odd")
}else{if(e[2]){cQ.error(e[0])
}}return e
},PSEUDO:function(c7){var c8,e;
if(cG.CHILD.test(c7[0])){return null
}if(c7[3]){c7[2]=c7[3]
}else{if((c8=c7[4])){if(cM.test(c8)&&(e=b1(c8,true))&&(e=c8.indexOf(")",c8.length-e)-c8.length)){c8=c8.slice(0,e);
c7[0]=c7[0].slice(0,e)
}c7[2]=c8
}}return c7.slice(0,3)
}},filter:{ID:ca?function(e){e=e.replace(ct,"");
return function(c7){return c7.getAttribute("id")===e
}
}:function(e){e=e.replace(ct,"");
return function(c8){var c7=typeof c8.getAttributeNode!==cu&&c8.getAttributeNode("id");
return c7&&c7.value===e
}
},TAG:function(e){if(e==="*"){return function(){return true
}
}e=e.replace(ct,"").toLowerCase();
return function(c7){return c7.nodeName&&c7.nodeName.toLowerCase()===e
}
},CLASS:function(e){var c7=cU[cZ][e+" "];
return c7||(c7=new RegExp("(^|"+cy+")"+e+"("+cy+"|$)"))&&cU(e,function(c8){return c7.test(c8.className||(typeof c8.getAttribute!==cu&&c8.getAttribute("class"))||"")
})
},ATTR:function(c8,c7,e){return function(db,da){var c9=cQ.attr(db,c8);
if(c9==null){return c7==="!="
}if(!c7){return true
}c9+="";
return c7==="="?c9===e:c7==="!="?c9!==e:c7==="^="?e&&c9.indexOf(e)===0:c7==="*="?e&&c9.indexOf(e)>-1:c7==="$="?e&&c9.substr(c9.length-e.length)===e:c7==="~="?(" "+c9+" ").indexOf(e)>-1:c7==="|="?c9===e||c9.substr(0,e.length+1)===e+"-":false
}
},CHILD:function(e,c8,c9,c7){if(e==="nth"){return function(dc){var db,dd,da=dc.parentNode;
if(c9===1&&c7===0){return true
}if(da){dd=0;
for(db=da.firstChild;
db;
db=db.nextSibling){if(db.nodeType===1){dd++;
if(dc===db){break
}}}}dd-=c7;
return dd===c9||(dd%c9===0&&dd/c9>=0)
}
}return function(db){var da=db;
switch(e){case"only":case"first":while((da=da.previousSibling)){if(da.nodeType===1){return false
}}if(e==="first"){return true
}da=db;
case"last":while((da=da.nextSibling)){if(da.nodeType===1){return false
}}return true
}}
},PSEUDO:function(c9,c8){var e,c7=cL.pseudos[c9]||cL.setFilters[c9.toLowerCase()]||cQ.error("unsupported pseudo: "+c9);
if(c7[cZ]){return c7(c8)
}if(c7.length>1){e=[c9,c9,"",c8];
return cL.setFilters.hasOwnProperty(c9.toLowerCase())?c1(function(dc,de){var db,da=c7(dc,c8),dd=da.length;
while(dd--){db=co.call(dc,da[dd]);
dc[db]=!(de[db]=da[dd])
}}):function(da){return c7(da,0,e)
}
}return c7
}},pseudos:{not:c1(function(e){var c7=[],c8=[],c9=cd(e.replace(cT,"$1"));
return c9[cZ]?c1(function(db,dg,de,dc){var df,da=c9(db,null,dc,[]),dd=db.length;
while(dd--){if((df=da[dd])){db[dd]=!(dg[dd]=df)
}}}):function(dc,db,da){c7[0]=dc;
c9(c7,null,da,c8);
return !c8.pop()
}
}),has:c1(function(e){return function(c7){return cQ(e,c7).length>0
}
}),contains:c1(function(e){return function(c7){return(c7.textContent||c7.innerText||b0(c7)).indexOf(e)>-1
}
}),enabled:function(e){return e.disabled===false
},disabled:function(e){return e.disabled===true
},checked:function(e){var c7=e.nodeName.toLowerCase();
return(c7==="input"&&!!e.checked)||(c7==="option"&&!!e.selected)
},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex
}return e.selected===true
},parent:function(e){return !cL.pseudos.empty(e)
},empty:function(c7){var e;
c7=c7.firstChild;
while(c7){if(c7.nodeName>"@"||(e=c7.nodeType)===3||e===4){return false
}c7=c7.nextSibling
}return true
},header:function(e){return cs.test(e.nodeName)
},text:function(c8){var c7,e;
return c8.nodeName.toLowerCase()==="input"&&(c7=c8.type)==="text"&&((e=c8.getAttribute("type"))==null||e.toLowerCase()===c7)
},radio:cI("radio"),checkbox:cI("checkbox"),file:cI("file"),password:cI("password"),image:cI("image"),submit:b3("submit"),reset:b3("reset"),button:function(c7){var e=c7.nodeName.toLowerCase();
return e==="input"&&c7.type==="button"||e==="button"
},input:function(e){return cN.test(e.nodeName)
},focus:function(e){var c7=e.ownerDocument;
return e===c7.activeElement&&(!c7.hasFocus||c7.hasFocus())&&!!(e.type||e.href||~e.tabIndex)
},active:function(e){return e===e.ownerDocument.activeElement
},first:cF(function(){return[0]
}),last:cF(function(e,c7){return[c7-1]
}),eq:cF(function(e,c8,c7){return[c7<0?c7+c8:c7]
}),even:cF(function(e,c8){for(var c7=0;
c7<c8;
c7+=2){e.push(c7)
}return e
}),odd:cF(function(e,c8){for(var c7=1;
c7<c8;
c7+=2){e.push(c7)
}return e
}),lt:cF(function(e,c9,c8){for(var c7=c8<0?c8+c9:c8;
--c7>=0;
){e.push(c7)
}return e
}),gt:cF(function(e,c9,c8){for(var c7=c8<0?c8+c9:c8;
++c7<c9;
){e.push(c7)
}return e
})}};
function b2(c7,e,c8){if(c7===e){return c8
}var c9=c7.nextSibling;
while(c9){if(c9===e){return -1
}c9=c9.nextSibling
}return 1
}cg=cb.compareDocumentPosition?function(c7,e){if(c7===e){cc=true;
return 0
}return(!c7.compareDocumentPosition||!e.compareDocumentPosition?c7.compareDocumentPosition:c7.compareDocumentPosition(e)&4)?-1:1
}:function(de,dd){if(de===dd){cc=true;
return 0
}else{if(de.sourceIndex&&dd.sourceIndex){return de.sourceIndex-dd.sourceIndex
}}var db,c7,c8=[],e=[],da=de.parentNode,dc=dd.parentNode,df=da;
if(da===dc){return b2(de,dd)
}else{if(!da){return -1
}else{if(!dc){return 1
}}}while(df){c8.unshift(df);
df=df.parentNode
}df=dc;
while(df){e.unshift(df);
df=df.parentNode
}db=c8.length;
c7=e.length;
for(var c9=0;
c9<db&&c9<c7;
c9++){if(c8[c9]!==e[c9]){return b2(c8[c9],e[c9])
}}return c9===db?b2(de,e[c9],-1):b2(c8[c9],dd,1)
};
[0,0].sort(cg);
b9=!cc;
cQ.uniqueSort=function(c8){var c9,da=[],c7=1,e=0;
cc=b9;
c8.sort(cg);
if(cc){for(;
(c9=c8[c7]);
c7++){if(c9===c8[c7-1]){e=da.push(c7)
}}while(e--){c8.splice(da[e],1)
}}return c8
};
cQ.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)
};
function b1(da,df){var c7,db,dd,de,dc,c8,e,c9=cV[cZ][da+" "];
if(c9){return df?0:c9.slice(0)
}dc=da;
c8=[];
e=cL.preFilter;
while(dc){if(!c7||(db=b5.exec(dc))){if(db){dc=dc.slice(db[0].length)||dc
}c8.push(dd=[])
}c7=false;
if((db=cH.exec(dc))){dd.push(c7=new b4(db.shift()));
dc=dc.slice(c7.length);
c7.type=db[0].replace(cT," ")
}for(de in cL.filter){if((db=cG[de].exec(dc))&&(!e[de]||(db=e[de](db)))){dd.push(c7=new b4(db.shift()));
dc=dc.slice(c7.length);
c7.type=de;
c7.matches=db
}}if(!c7){break
}}return df?dc.length:dc?cQ.error(da):cV(da,c8).slice(0)
}function cw(da,c8,c9){var e=c8.dir,db=c9&&c8.dir==="parentNode",c7=cf++;
return c8.first?function(de,dd,dc){while((de=de[e])){if(db||de.nodeType===1){return da(de,dd,dc)
}}}:function(df,de,dd){if(!dd){var dc,dg=cr+" "+c7+" ",dh=dg+cX;
while((df=df[e])){if(db||df.nodeType===1){if((dc=df[cZ])===dh){return df.sizset
}else{if(typeof dc==="string"&&dc.indexOf(dg)===0){if(df.sizset){return df
}}else{df[cZ]=dh;
if(da(df,de,dd)){df.sizset=true;
return df
}df.sizset=false
}}}}}else{while((df=df[e])){if(db||df.nodeType===1){if(da(df,de,dd)){return df
}}}}}
}function ce(e){return e.length>1?function(da,c9,c7){var c8=e.length;
while(c8--){if(!e[c8](da,c9,c7)){return false
}}return true
}:e[0]
}function cv(e,c7,c8,c9,dc){var da,df=[],db=0,dd=e.length,de=c7!=null;
for(;
db<dd;
db++){if((da=e[db])){if(!c8||c8(da,c9,dc)){df.push(da);
if(de){c7.push(db)
}}}}return df
}function c2(c8,c7,da,c9,db,e){if(c9&&!c9[cZ]){c9=c2(c9)
}if(db&&!db[cZ]){db=c2(db,e)
}return c1(function(dm,dj,de,dl){var dp,dk,dg,df=[],dn=[],dd=dj.length,dc=dm||cp(c7||"*",de.nodeType?[de]:de,[]),dh=c8&&(dm||!c7)?cv(dc,df,c8,de,dl):dc,di=da?db||(dm?c8:dd||c9)?[]:dj:dh;
if(da){da(dh,di,de,dl)
}if(c9){dp=cv(di,dn);
c9(dp,[],de,dl);
dk=dp.length;
while(dk--){if((dg=dp[dk])){di[dn[dk]]=!(dh[dn[dk]]=dg)
}}}if(dm){if(db||c8){if(db){dp=[];
dk=di.length;
while(dk--){if((dg=di[dk])){dp.push((dh[dk]=dg))
}}db(null,(di=[]),dp,dl)
}dk=di.length;
while(dk--){if((dg=di[dk])&&(dp=db?co.call(dm,dg):df[dk])>-1){dm[dp]=!(dj[dp]=dg)
}}}}else{di=cv(di===dj?di.splice(dd,di.length):di);
if(db){db(null,dj,di,dl)
}else{cW.apply(dj,di)
}}})
}function cx(dc){var c7,da,c8,db=dc.length,df=cL.relative[dc[0].type],dg=df||cL.relative[" "],c9=df?1:0,dd=cw(function(dh){return dh===c7
},dg,true),de=cw(function(dh){return co.call(c7,dh)>-1
},dg,true),e=[function(dj,di,dh){return(!df&&(dh||di!==cJ))||((c7=di).nodeType?dd(dj,di,dh):de(dj,di,dh))
}];
for(;
c9<db;
c9++){if((da=cL.relative[dc[c9].type])){e=[cw(ce(e),da)]
}else{da=cL.filter[dc[c9].type].apply(null,dc[c9].matches);
if(da[cZ]){c8=++c9;
for(;
c8<db;
c8++){if(cL.relative[dc[c8].type]){break
}}return c2(c9>1&&ce(e),c9>1&&dc.slice(0,c9-1).join("").replace(cT,"$1"),da,c9<c8&&cx(dc.slice(c9,c8)),c8<db&&cx((dc=dc.slice(c8))),c8<db&&dc.join(""))
}e.push(da)
}}return ce(e)
}function b6(c9,c8){var e=c8.length>0,da=c9.length>0,c7=function(dk,de,dj,di,dr){var df,dg,dl,dq=[],dp=0,dh="0",db=dk&&[],dm=dr!=null,dn=cJ,dd=dk||da&&cL.find.TAG("*",dr&&de.parentNode||de),dc=(cr+=dn==null?1:Math.E);
if(dm){cJ=de!==b8&&de;
cX=c7.el
}for(;
(df=dd[dh])!=null;
dh++){if(da&&df){for(dg=0;
(dl=c9[dg]);
dg++){if(dl(df,de,dj)){di.push(df);
break
}}if(dm){cr=dc;
cX=++c7.el
}}if(e){if((df=!dl&&df)){dp--
}if(dk){db.push(df)
}}}dp+=dh;
if(e&&dh!==dp){for(dg=0;
(dl=c8[dg]);
dg++){dl(db,dq,de,dj)
}if(dk){if(dp>0){while(dh--){if(!(db[dh]||dq[dh])){dq[dh]=cE.call(di)
}}}dq=cv(dq)
}cW.apply(di,dq);
if(dm&&!dk&&dq.length>0&&(dp+c8.length)>1){cQ.uniqueSort(di)
}}if(dm){cr=dc;
cJ=dn
}return db
};
c7.el=0;
return e?c1(c7):c7
}cd=cQ.compile=function(e,db){var c8,c7=[],da=[],c9=cn[cZ][e+" "];
if(!c9){if(!db){db=b1(e)
}c8=db.length;
while(c8--){c9=cx(db[c8]);
if(c9[cZ]){c7.push(c9)
}else{da.push(c9)
}}c9=cn(e,b6(da,c7))
}return c9
};
function cp(c7,da,c9){var c8=0,e=da.length;
for(;
c8<e;
c8++){cQ(c7,da[c8],c9)
}return c9
}function cY(c8,e,da,de,dd){var db,dh,c7,dg,df,dc=b1(c8),c9=dc.length;
if(!de){if(dc.length===1){dh=dc[0]=dc[0].slice(0);
if(dh.length>2&&(c7=dh[0]).type==="ID"&&e.nodeType===9&&!dd&&cL.relative[dh[1].type]){e=cL.find.ID(c7.matches[0].replace(ct,""),e,dd)[0];
if(!e){return da
}c8=c8.slice(dh.shift().length)
}for(db=cG.POS.test(c8)?-1:dh.length-1;
db>=0;
db--){c7=dh[db];
if(cL.relative[(dg=c7.type)]){break
}if((df=cL.find[dg])){if((de=df(c7.matches[0].replace(ct,""),cR.test(dh[0].type)&&e.parentNode||e,dd))){dh.splice(db,1);
c8=de.length&&dh.join("");
if(!c8){cW.apply(da,cl.call(de,0));
return da
}break
}}}}}cd(c8,dc)(de,e,dd,da,cR.test(c8));
return da
}if(b8.querySelectorAll){(function(){var db,dc=cY,da=/'|\\/g,c8=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,c7=[":focus"],e=[":active"],c9=cb.matchesSelector||cb.mozMatchesSelector||cb.webkitMatchesSelector||cb.oMatchesSelector||cb.msMatchesSelector;
cK(function(dd){dd.innerHTML="<select><option selected=''></option></select>";
if(!dd.querySelectorAll("[selected]").length){c7.push("\\["+cy+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!dd.querySelectorAll(":checked").length){c7.push(":checked")
}});
cK(function(dd){dd.innerHTML="<p test=''></p>";
if(dd.querySelectorAll("[test^='']").length){c7.push("[*^$]="+cy+"*(?:\"\"|'')")
}dd.innerHTML="<input type='hidden'/>";
if(!dd.querySelectorAll(":enabled").length){c7.push(":enabled",":disabled")
}});
c7=new RegExp(c7.join("|"));
cY=function(dj,de,dl,dp,dn){if(!dp&&!dn&&!c7.test(dj)){var dh,dm,dg=true,dd=cZ,df=de,dk=de.nodeType===9&&dj;
if(de.nodeType===1&&de.nodeName.toLowerCase()!=="object"){dh=b1(dj);
if((dg=de.getAttribute("id"))){dd=dg.replace(da,"\\$&")
}else{de.setAttribute("id",dd)
}dd="[id='"+dd+"'] ";
dm=dh.length;
while(dm--){dh[dm]=dd+dh[dm].join("")
}df=cR.test(dj)&&de.parentNode||de;
dk=dh.join(",")
}if(dk){try{cW.apply(dl,cl.call(df.querySelectorAll(dk),0));
return dl
}catch(di){}finally{if(!dg){de.removeAttribute("id")
}}}}return dc(dj,de,dl,dp,dn)
};
if(c9){cK(function(de){db=c9.call(de,"div");
try{c9.call(de,"[test!='']:sizzle");
e.push("!=",c6)
}catch(dd){}});
e=new RegExp(e.join("|"));
cQ.matchesSelector=function(de,dg){dg=dg.replace(c8,"='$1']");
if(!cm(de)&&!e.test(dg)&&!c7.test(dg)){try{var dd=c9.call(de,dg);
if(dd||db||de.document&&de.document.nodeType!==11){return dd
}}catch(df){}}return cQ(dg,null,null,[de]).length>0
}
}})()
}cL.pseudos.nth=cL.pseudos.eq;
function cj(){}cL.filters=cj.prototype=cL.pseudos;
cL.setFilters=new cj();
cQ.attr=bG.attr;
bG.find=cQ;
bG.expr=cQ.selectors;
bG.expr[":"]=bG.expr.pseudos;
bG.unique=cQ.uniqueSort;
bG.text=cQ.getText;
bG.isXMLDoc=cQ.isXML;
bG.contains=cQ.contains
})(a2);
var ag=/Until$/,bq=/^(?:parents|prev(?:Until|All))/,al=/^.[^:#\[\.,]*$/,y=bG.expr.match.needsContext,bu={children:true,contents:true,next:true,prev:true};
bG.fn.extend({find:function(e){var b2,bZ,b4,b5,b3,b1,b0=this;
if(typeof e!=="string"){return bG(e).filter(function(){for(b2=0,bZ=b0.length;
b2<bZ;
b2++){if(bG.contains(b0[b2],this)){return true
}}})
}b1=this.pushStack("","find",e);
for(b2=0,bZ=this.length;
b2<bZ;
b2++){b4=b1.length;
bG.find(e,this[b2],b1);
if(b2>0){for(b5=b4;
b5<b1.length;
b5++){for(b3=0;
b3<b4;
b3++){if(b1[b3]===b1[b5]){b1.splice(b5--,1);
break
}}}}}return b1
},has:function(b1){var b0,bZ=bG(b1,this),e=bZ.length;
return this.filter(function(){for(b0=0;
b0<e;
b0++){if(bG.contains(this,bZ[b0])){return true
}}})
},not:function(e){return this.pushStack(aM(this,e,false),"not",e)
},filter:function(e){return this.pushStack(aM(this,e,true),"filter",e)
},is:function(e){return !!e&&(typeof e==="string"?y.test(e)?bG(e,this.context).index(this[0])>=0:bG.filter(e,this).length>0:this.filter(e).length>0)
},closest:function(b2,b1){var b3,b0=0,e=this.length,bZ=[],b4=y.test(b2)||typeof b2!=="string"?bG(b2,b1||this.context):0;
for(;
b0<e;
b0++){b3=this[b0];
while(b3&&b3.ownerDocument&&b3!==b1&&b3.nodeType!==11){if(b4?b4.index(b3)>-1:bG.find.matchesSelector(b3,b2)){bZ.push(b3);
break
}b3=b3.parentNode
}}bZ=bZ.length>1?bG.unique(bZ):bZ;
return this.pushStack(bZ,"closest",b2)
},index:function(e){if(!e){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1
}if(typeof e==="string"){return bG.inArray(this[0],bG(e))
}return bG.inArray(e.jquery?e[0]:e,this)
},add:function(e,bZ){var b1=typeof e==="string"?bG(e,bZ):bG.makeArray(e&&e.nodeType?[e]:e),b0=bG.merge(this.get(),b1);
return this.pushStack(aR(b1[0])||aR(b0[0])?b0:bG.unique(b0))
},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))
}});
bG.fn.andSelf=bG.fn.addBack;
function aR(e){return !e||!e.parentNode||e.parentNode.nodeType===11
}function aY(bZ,e){do{bZ=bZ[e]
}while(bZ&&bZ.nodeType!==1);
return bZ
}bG.each({parent:function(bZ){var e=bZ.parentNode;
return e&&e.nodeType!==11?e:null
},parents:function(e){return bG.dir(e,"parentNode")
},parentsUntil:function(bZ,e,b0){return bG.dir(bZ,"parentNode",b0)
},next:function(e){return aY(e,"nextSibling")
},prev:function(e){return aY(e,"previousSibling")
},nextAll:function(e){return bG.dir(e,"nextSibling")
},prevAll:function(e){return bG.dir(e,"previousSibling")
},nextUntil:function(bZ,e,b0){return bG.dir(bZ,"nextSibling",b0)
},prevUntil:function(bZ,e,b0){return bG.dir(bZ,"previousSibling",b0)
},siblings:function(e){return bG.sibling((e.parentNode||{}).firstChild,e)
},children:function(e){return bG.sibling(e.firstChild)
},contents:function(e){return bG.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:bG.merge([],e.childNodes)
}},function(e,bZ){bG.fn[e]=function(b2,b0){var b1=bG.map(this,bZ,b2);
if(!ag.test(e)){b0=b2
}if(b0&&typeof b0==="string"){b1=bG.filter(b0,b1)
}b1=this.length>1&&!bu[e]?bG.unique(b1):b1;
if(this.length>1&&bq.test(e)){b1=b1.reverse()
}return this.pushStack(b1,e,a4.call(arguments).join(","))
}
});
bG.extend({filter:function(b0,e,bZ){if(bZ){b0=":not("+b0+")"
}return e.length===1?bG.find.matchesSelector(e[0],b0)?[e[0]]:[]:bG.find.matches(b0,e)
},dir:function(b0,bZ,b2){var e=[],b1=b0[bZ];
while(b1&&b1.nodeType!==9&&(b2===aB||b1.nodeType!==1||!bG(b1).is(b2))){if(b1.nodeType===1){e.push(b1)
}b1=b1[bZ]
}return e
},sibling:function(b0,bZ){var e=[];
for(;
b0;
b0=b0.nextSibling){if(b0.nodeType===1&&b0!==bZ){e.push(b0)
}}return e
}});
function aM(b1,b0,e){b0=b0||0;
if(bG.isFunction(b0)){return bG.grep(b1,function(b3,b2){var b4=!!b0.call(b3,b2,b3);
return b4===e
})
}else{if(b0.nodeType){return bG.grep(b1,function(b3,b2){return(b3===b0)===e
})
}else{if(typeof b0==="string"){var bZ=bG.grep(b1,function(b2){return b2.nodeType===1
});
if(al.test(b0)){return bG.filter(b0,bZ,!e)
}else{b0=bG.filter(b0,bZ)
}}}}return bG.grep(b1,function(b3,b2){return(bG.inArray(b3,b0)>=0)===e
})
}function A(e){var b0=c.split("|"),bZ=e.createDocumentFragment();
if(bZ.createElement){while(b0.length){bZ.createElement(b0.pop())
}}return bZ
}var c="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",av=/ jQuery\d+="(?:null|\d+)"/g,bY=/^\s+/,ay=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,p=/<([\w:]+)/,bT=/<tbody/i,J=/<|&#?\w+;/,aj=/<(?:script|style|link)/i,ap=/<(?:script|object|embed|option|style)/i,K=new RegExp("<(?:"+c+")[\\s/>]","i"),aE=/^(?:checkbox|radio)$/,bR=/checked\s*(?:[^=]|=\s*.checked.)/i,bw=/\/(java|ecma)script/i,aH=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,T={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},aQ=A(o),l=aQ.appendChild(o.createElement("div"));
T.optgroup=T.option;
T.tbody=T.tfoot=T.colgroup=T.caption=T.thead;
T.th=T.td;
if(!bG.support.htmlSerialize){T._default=[1,"X<div>","</div>"]
}bG.fn.extend({text:function(e){return bG.access(this,function(bZ){return bZ===aB?bG.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(bZ))
},null,e,arguments.length)
},wrapAll:function(e){if(bG.isFunction(e)){return this.each(function(b0){bG(this).wrapAll(e.call(this,b0))
})
}if(this[0]){var bZ=bG(e,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){bZ.insertBefore(this[0])
}bZ.map(function(){var b0=this;
while(b0.firstChild&&b0.firstChild.nodeType===1){b0=b0.firstChild
}return b0
}).append(this)
}return this
},wrapInner:function(e){if(bG.isFunction(e)){return this.each(function(bZ){bG(this).wrapInner(e.call(this,bZ))
})
}return this.each(function(){var bZ=bG(this),b0=bZ.contents();
if(b0.length){b0.wrapAll(e)
}else{bZ.append(e)
}})
},wrap:function(e){var bZ=bG.isFunction(e);
return this.each(function(b0){bG(this).wrapAll(bZ?e.call(this,b0):e)
})
},unwrap:function(){return this.parent().each(function(){if(!bG.nodeName(this,"body")){bG(this).replaceWith(this.childNodes)
}}).end()
},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1||this.nodeType===11){this.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1||this.nodeType===11){this.insertBefore(e,this.firstChild)
}})
},before:function(){if(!aR(this[0])){return this.domManip(arguments,false,function(bZ){this.parentNode.insertBefore(bZ,this)
})
}if(arguments.length){var e=bG.clean(arguments);
return this.pushStack(bG.merge(e,this),"before",this.selector)
}},after:function(){if(!aR(this[0])){return this.domManip(arguments,false,function(bZ){this.parentNode.insertBefore(bZ,this.nextSibling)
})
}if(arguments.length){var e=bG.clean(arguments);
return this.pushStack(bG.merge(this,e),"after",this.selector)
}},remove:function(e,b1){var b0,bZ=0;
for(;
(b0=this[bZ])!=null;
bZ++){if(!e||bG.filter(e,[b0]).length){if(!b1&&b0.nodeType===1){bG.cleanData(b0.getElementsByTagName("*"));
bG.cleanData([b0])
}if(b0.parentNode){b0.parentNode.removeChild(b0)
}}}return this
},empty:function(){var bZ,e=0;
for(;
(bZ=this[e])!=null;
e++){if(bZ.nodeType===1){bG.cleanData(bZ.getElementsByTagName("*"))
}while(bZ.firstChild){bZ.removeChild(bZ.firstChild)
}}return this
},clone:function(bZ,e){bZ=bZ==null?false:bZ;
e=e==null?bZ:e;
return this.map(function(){return bG.clone(this,bZ,e)
})
},html:function(e){return bG.access(this,function(b2){var b1=this[0]||{},b0=0,bZ=this.length;
if(b2===aB){return b1.nodeType===1?b1.innerHTML.replace(av,""):aB
}if(typeof b2==="string"&&!aj.test(b2)&&(bG.support.htmlSerialize||!K.test(b2))&&(bG.support.leadingWhitespace||!bY.test(b2))&&!T[(p.exec(b2)||["",""])[1].toLowerCase()]){b2=b2.replace(ay,"<$1></$2>");
try{for(;
b0<bZ;
b0++){b1=this[b0]||{};
if(b1.nodeType===1){bG.cleanData(b1.getElementsByTagName("*"));
b1.innerHTML=b2
}}b1=0
}catch(b3){}}if(b1){this.empty().append(b2)
}},null,e,arguments.length)
},replaceWith:function(e){if(!aR(this[0])){if(bG.isFunction(e)){return this.each(function(b1){var b0=bG(this),bZ=b0.html();
b0.replaceWith(e.call(this,b1,bZ))
})
}if(typeof e!=="string"){e=bG(e).detach()
}return this.each(function(){var b0=this.nextSibling,bZ=this.parentNode;
bG(this).remove();
if(b0){bG(b0).before(e)
}else{bG(bZ).append(e)
}})
}return this.length?this.pushStack(bG(bG.isFunction(e)?e():e),"replaceWith",e):this
},detach:function(e){return this.remove(e,true)
},domManip:function(b4,b8,b7){b4=[].concat.apply([],b4);
var b0,b2,b3,b6,b1=0,b5=b4[0],bZ=[],e=this.length;
if(!bG.support.checkClone&&e>1&&typeof b5==="string"&&bR.test(b5)){return this.each(function(){bG(this).domManip(b4,b8,b7)
})
}if(bG.isFunction(b5)){return this.each(function(ca){var b9=bG(this);
b4[0]=b5.call(this,ca,b8?b9.html():aB);
b9.domManip(b4,b8,b7)
})
}if(this[0]){b0=bG.buildFragment(b4,this,bZ);
b3=b0.fragment;
b2=b3.firstChild;
if(b3.childNodes.length===1){b3=b2
}if(b2){b8=b8&&bG.nodeName(b2,"tr");
for(b6=b0.cacheable||e-1;
b1<e;
b1++){b7.call(b8&&bG.nodeName(this[b1],"table")?x(this[b1],"tbody"):this[b1],b1===b6?b3:bG.clone(b3,true,true))
}}b3=b2=null;
if(bZ.length){bG.each(bZ,function(b9,ca){if(ca.src){if(bG.ajax){bG.ajax({url:ca.src,type:"GET",dataType:"script",async:false,global:false,"throws":true})
}else{bG.error("no ajax")
}}else{bG.globalEval((ca.text||ca.textContent||ca.innerHTML||"").replace(aH,""))
}if(ca.parentNode){ca.parentNode.removeChild(ca)
}})
}}return this
}});
function x(bZ,e){return bZ.getElementsByTagName(e)[0]||bZ.appendChild(bZ.ownerDocument.createElement(e))
}function ao(b5,bZ){if(bZ.nodeType!==1||!bG.hasData(b5)){return
}var b2,b1,e,b4=bG._data(b5),b3=bG._data(bZ,b4),b0=b4.events;
if(b0){delete b3.handle;
b3.events={};
for(b2 in b0){for(b1=0,e=b0[b2].length;
b1<e;
b1++){bG.event.add(bZ,b2,b0[b2][b1])
}}}if(b3.data){b3.data=bG.extend({},b3.data)
}}function F(bZ,e){var b0;
if(e.nodeType!==1){return
}if(e.clearAttributes){e.clearAttributes()
}if(e.mergeAttributes){e.mergeAttributes(bZ)
}b0=e.nodeName.toLowerCase();
if(b0==="object"){if(e.parentNode){e.outerHTML=bZ.outerHTML
}if(bG.support.html5Clone&&(bZ.innerHTML&&!bG.trim(e.innerHTML))){e.innerHTML=bZ.innerHTML
}}else{if(b0==="input"&&aE.test(bZ.type)){e.defaultChecked=e.checked=bZ.checked;
if(e.value!==bZ.value){e.value=bZ.value
}}else{if(b0==="option"){e.selected=bZ.defaultSelected
}else{if(b0==="input"||b0==="textarea"){e.defaultValue=bZ.defaultValue
}else{if(b0==="script"&&e.text!==bZ.text){e.text=bZ.text
}}}}}e.removeAttribute(bG.expando)
}bG.buildFragment=function(b1,b2,bZ){var b0,e,b3,b4=b1[0];
b2=b2||o;
b2=!b2.nodeType&&b2[0]||b2;
b2=b2.ownerDocument||b2;
if(b1.length===1&&typeof b4==="string"&&b4.length<512&&b2===o&&b4.charAt(0)==="<"&&!ap.test(b4)&&(bG.support.checkClone||!bR.test(b4))&&(bG.support.html5Clone||!K.test(b4))){e=true;
b0=bG.fragments[b4];
b3=b0!==aB
}if(!b0){b0=b2.createDocumentFragment();
bG.clean(b1,b2,b0,bZ);
if(e){bG.fragments[b4]=b3&&b0
}}return{fragment:b0,cacheable:e}
};
bG.fragments={};
bG.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,bZ){bG.fn[e]=function(b0){var b2,b4=0,b3=[],b6=bG(b0),b1=b6.length,b5=this.length===1&&this[0].parentNode;
if((b5==null||b5&&b5.nodeType===11&&b5.childNodes.length===1)&&b1===1){b6[bZ](this[0]);
return this
}else{for(;
b4<b1;
b4++){b2=(b4>0?this.clone(true):this).get();
bG(b6[b4])[bZ](b2);
b3=b3.concat(b2)
}return this.pushStack(b3,e,b6.selector)
}}
});
function m(e){if(typeof e.getElementsByTagName!=="undefined"){return e.getElementsByTagName("*")
}else{if(typeof e.querySelectorAll!=="undefined"){return e.querySelectorAll("*")
}else{return[]
}}}function bS(e){if(aE.test(e.type)){e.defaultChecked=e.checked
}}bG.extend({clone:function(b2,b4,b0){var e,bZ,b1,b3;
if(bG.support.html5Clone||bG.isXMLDoc(b2)||!K.test("<"+b2.nodeName+">")){b3=b2.cloneNode(true)
}else{l.innerHTML=b2.outerHTML;
l.removeChild(b3=l.firstChild)
}if((!bG.support.noCloneEvent||!bG.support.noCloneChecked)&&(b2.nodeType===1||b2.nodeType===11)&&!bG.isXMLDoc(b2)){F(b2,b3);
e=m(b2);
bZ=m(b3);
for(b1=0;
e[b1];
++b1){if(bZ[b1]){F(e[b1],bZ[b1])
}}}if(b4){ao(b2,b3);
if(b0){e=m(b2);
bZ=m(b3);
for(b1=0;
e[b1];
++b1){ao(e[b1],bZ[b1])
}}}e=bZ=null;
return b3
},clean:function(cb,b0,e,b1){var b8,b7,ca,cf,b4,ce,b5,b2,bZ,b9,cd,b6,b3=b0===o&&aQ,cc=[];
if(!b0||typeof b0.createDocumentFragment==="undefined"){b0=o
}for(b8=0;
(ca=cb[b8])!=null;
b8++){if(typeof ca==="number"){ca+=""
}if(!ca){continue
}if(typeof ca==="string"){if(!J.test(ca)){ca=b0.createTextNode(ca)
}else{b3=b3||A(b0);
b5=b0.createElement("div");
b3.appendChild(b5);
ca=ca.replace(ay,"<$1></$2>");
cf=(p.exec(ca)||["",""])[1].toLowerCase();
b4=T[cf]||T._default;
ce=b4[0];
b5.innerHTML=b4[1]+ca+b4[2];
while(ce--){b5=b5.lastChild
}if(!bG.support.tbody){b2=bT.test(ca);
bZ=cf==="table"&&!b2?b5.firstChild&&b5.firstChild.childNodes:b4[1]==="<table>"&&!b2?b5.childNodes:[];
for(b7=bZ.length-1;
b7>=0;
--b7){if(bG.nodeName(bZ[b7],"tbody")&&!bZ[b7].childNodes.length){bZ[b7].parentNode.removeChild(bZ[b7])
}}}if(!bG.support.leadingWhitespace&&bY.test(ca)){b5.insertBefore(b0.createTextNode(bY.exec(ca)[0]),b5.firstChild)
}ca=b5.childNodes;
b5.parentNode.removeChild(b5)
}}if(ca.nodeType){cc.push(ca)
}else{bG.merge(cc,ca)
}}if(b5){ca=b5=b3=null
}if(!bG.support.appendChecked){for(b8=0;
(ca=cc[b8])!=null;
b8++){if(bG.nodeName(ca,"input")){bS(ca)
}else{if(typeof ca.getElementsByTagName!=="undefined"){bG.grep(ca.getElementsByTagName("input"),bS)
}}}}if(e){cd=function(cg){if(!cg.type||bw.test(cg.type)){return b1?b1.push(cg.parentNode?cg.parentNode.removeChild(cg):cg):e.appendChild(cg)
}};
for(b8=0;
(ca=cc[b8])!=null;
b8++){if(!(bG.nodeName(ca,"script")&&cd(ca))){e.appendChild(ca);
if(typeof ca.getElementsByTagName!=="undefined"){b6=bG.grep(bG.merge([],ca.getElementsByTagName("script")),cd);
cc.splice.apply(cc,[b8+1,0].concat(b6));
b8+=b6.length
}}}}return cc
},cleanData:function(bZ,b7){var b2,b0,b1,b6,b3=0,b8=bG.expando,e=bG.cache,b4=bG.support.deleteExpando,b5=bG.event.special;
for(;
(b1=bZ[b3])!=null;
b3++){if(b7||bG.acceptData(b1)){b0=b1[b8];
b2=b0&&e[b0];
if(b2){if(b2.events){for(b6 in b2.events){if(b5[b6]){bG.event.remove(b1,b6)
}else{bG.removeEvent(b1,b6,b2.handle)
}}}if(e[b0]){delete e[b0];
if(b4){delete b1[b8]
}else{if(b1.removeAttribute){b1.removeAttribute(b8)
}else{b1[b8]=null
}}bG.deletedIds.push(b0)
}}}}}});
(function(){var e,bZ;
bG.uaMatch=function(b1){b1=b1.toLowerCase();
var b0=/(chrome)[ \/]([\w.]+)/.exec(b1)||/(webkit)[ \/]([\w.]+)/.exec(b1)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b1)||/(msie) ([\w.]+)/.exec(b1)||b1.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b1)||[];
return{browser:b0[1]||"",version:b0[2]||"0"}
};
e=bG.uaMatch(d.userAgent);
bZ={};
if(e.browser){bZ[e.browser]=true;
bZ.version=e.version
}if(bZ.chrome){bZ.webkit=true
}else{if(bZ.webkit){bZ.safari=true
}}bG.browser=bZ;
bG.sub=function(){function b0(b3,b4){return new b0.fn.init(b3,b4)
}bG.extend(true,b0,this);
b0.superclass=this;
b0.fn=b0.prototype=this();
b0.fn.constructor=b0;
b0.sub=this.sub;
b0.fn.init=function b2(b3,b4){if(b4&&b4 instanceof bG&&!(b4 instanceof b0)){b4=b0(b4)
}return bG.fn.init.call(this,b3,b4,b1)
};
b0.fn.init.prototype=b0.fn;
var b1=b0(o);
return b0
}
})();
var E,az,aW,be=/alpha\([^)]*\)/i,aS=/opacity=([^)]*)/,bk=/^(top|right|bottom|left)$/,G=/^(none|table(?!-c[ea]).+)/,aZ=/^margin/,a8=new RegExp("^("+bx+")(.*)$","i"),W=new RegExp("^("+bx+")(?!px)[a-z%]+$","i"),S=new RegExp("^([-+])=("+bx+")","i"),bh={BODY:"block"},a9={position:"absolute",visibility:"hidden",display:"block"},bA={letterSpacing:0,fontWeight:400},bQ=["Top","Right","Bottom","Left"],ar=["Webkit","O","Moz","ms"],aJ=bG.fn.toggle;
function b(b1,bZ){if(bZ in b1){return bZ
}var b2=bZ.charAt(0).toUpperCase()+bZ.slice(1),e=bZ,b0=ar.length;
while(b0--){bZ=ar[b0]+b2;
if(bZ in b1){return bZ
}}return e
}function Q(bZ,e){bZ=e||bZ;
return bG.css(bZ,"display")==="none"||!bG.contains(bZ.ownerDocument,bZ)
}function s(b3,e){var b2,b4,bZ=[],b0=0,b1=b3.length;
for(;
b0<b1;
b0++){b2=b3[b0];
if(!b2.style){continue
}bZ[b0]=bG._data(b2,"olddisplay");
if(e){if(!bZ[b0]&&b2.style.display==="none"){b2.style.display=""
}if(b2.style.display===""&&Q(b2)){bZ[b0]=bG._data(b2,"olddisplay",bC(b2.nodeName))
}}else{b4=E(b2,"display");
if(!bZ[b0]&&b4!=="none"){bG._data(b2,"olddisplay",b4)
}}}for(b0=0;
b0<b1;
b0++){b2=b3[b0];
if(!b2.style){continue
}if(!e||b2.style.display==="none"||b2.style.display===""){b2.style.display=e?bZ[b0]||"":"none"
}}return b3
}bG.fn.extend({css:function(e,bZ){return bG.access(this,function(b1,b0,b2){return b2!==aB?bG.style(b1,b0,b2):bG.css(b1,b0)
},e,bZ,arguments.length>1)
},show:function(){return s(this,true)
},hide:function(){return s(this)
},toggle:function(b0,bZ){var e=typeof b0==="boolean";
if(bG.isFunction(b0)&&bG.isFunction(bZ)){return aJ.apply(this,arguments)
}return this.each(function(){if(e?b0:Q(this)){bG(this).show()
}else{bG(this).hide()
}})
}});
bG.extend({cssHooks:{opacity:{get:function(b0,bZ){if(bZ){var e=E(b0,"opacity");
return e===""?"1":e
}}}},cssNumber:{fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":bG.support.cssFloat?"cssFloat":"styleFloat"},style:function(b1,b0,b7,b2){if(!b1||b1.nodeType===3||b1.nodeType===8||!b1.style){return
}var b5,b6,b8,b3=bG.camelCase(b0),bZ=b1.style;
b0=bG.cssProps[b3]||(bG.cssProps[b3]=b(bZ,b3));
b8=bG.cssHooks[b0]||bG.cssHooks[b3];
if(b7!==aB){b6=typeof b7;
if(b6==="string"&&(b5=S.exec(b7))){b7=(b5[1]+1)*b5[2]+parseFloat(bG.css(b1,b0));
b6="number"
}if(b7==null||b6==="number"&&isNaN(b7)){return
}if(b6==="number"&&!bG.cssNumber[b3]){b7+="px"
}if(!b8||!("set" in b8)||(b7=b8.set(b1,b7,b2))!==aB){try{bZ[b0]=b7
}catch(b4){}}}else{if(b8&&"get" in b8&&(b5=b8.get(b1,false,b2))!==aB){return b5
}return bZ[b0]
}},css:function(b4,b2,b3,bZ){var b5,b1,e,b0=bG.camelCase(b2);
b2=bG.cssProps[b0]||(bG.cssProps[b0]=b(b4.style,b0));
e=bG.cssHooks[b2]||bG.cssHooks[b0];
if(e&&"get" in e){b5=e.get(b4,true,bZ)
}if(b5===aB){b5=E(b4,b2)
}if(b5==="normal"&&b2 in bA){b5=bA[b2]
}if(b3||bZ!==aB){b1=parseFloat(b5);
return b3||bG.isNumeric(b1)?b1||0:b5
}return b5
},swap:function(b2,b1,b3){var b0,bZ,e={};
for(bZ in b1){e[bZ]=b2.style[bZ];
b2.style[bZ]=b1[bZ]
}b0=b3.call(b2);
for(bZ in b1){b2.style[bZ]=e[bZ]
}return b0
}});
if(a2.getComputedStyle){E=function(b5,bZ){var e,b2,b1,b4,b3=a2.getComputedStyle(b5,null),b0=b5.style;
if(b3){e=b3.getPropertyValue(bZ)||b3[bZ];
if(e===""&&!bG.contains(b5.ownerDocument,b5)){e=bG.style(b5,bZ)
}if(W.test(e)&&aZ.test(bZ)){b2=b0.width;
b1=b0.minWidth;
b4=b0.maxWidth;
b0.minWidth=b0.maxWidth=b0.width=e;
e=b3.width;
b0.width=b2;
b0.minWidth=b1;
b0.maxWidth=b4
}}return e
}
}else{if(o.documentElement.currentStyle){E=function(b2,b0){var b3,e,bZ=b2.currentStyle&&b2.currentStyle[b0],b1=b2.style;
if(bZ==null&&b1&&b1[b0]){bZ=b1[b0]
}if(W.test(bZ)&&!bk.test(b0)){b3=b1.left;
e=b2.runtimeStyle&&b2.runtimeStyle.left;
if(e){b2.runtimeStyle.left=b2.currentStyle.left
}b1.left=b0==="fontSize"?"1em":bZ;
bZ=b1.pixelLeft+"px";
b1.left=b3;
if(e){b2.runtimeStyle.left=e
}}return bZ===""?"auto":bZ
}
}}function aG(e,b0,b1){var bZ=a8.exec(b0);
return bZ?Math.max(0,bZ[1]-(b1||0))+(bZ[2]||"px"):b0
}function at(b1,bZ,e,b3){var b0=e===(b3?"border":"content")?4:bZ==="width"?1:0,b2=0;
for(;
b0<4;
b0+=2){if(e==="margin"){b2+=bG.css(b1,e+bQ[b0],true)
}if(b3){if(e==="content"){b2-=parseFloat(E(b1,"padding"+bQ[b0]))||0
}if(e!=="margin"){b2-=parseFloat(E(b1,"border"+bQ[b0]+"Width"))||0
}}else{b2+=parseFloat(E(b1,"padding"+bQ[b0]))||0;
if(e!=="padding"){b2+=parseFloat(E(b1,"border"+bQ[b0]+"Width"))||0
}}}return b2
}function u(b1,bZ,e){var b2=bZ==="width"?b1.offsetWidth:b1.offsetHeight,b0=true,b3=bG.support.boxSizing&&bG.css(b1,"boxSizing")==="border-box";
if(b2<=0||b2==null){b2=E(b1,bZ);
if(b2<0||b2==null){b2=b1.style[bZ]
}if(W.test(b2)){return b2
}b0=b3&&(bG.support.boxSizingReliable||b2===b1.style[bZ]);
b2=parseFloat(b2)||0
}return(b2+at(b1,bZ,e||(b3?"border":"content"),b0))+"px"
}function bC(b0){if(bh[b0]){return bh[b0]
}var e=bG("<"+b0+">").appendTo(o.body),bZ=e.css("display");
e.remove();
if(bZ==="none"||bZ===""){az=o.body.appendChild(az||bG.extend(o.createElement("iframe"),{frameBorder:0,width:0,height:0}));
if(!aW||!az.createElement){aW=(az.contentWindow||az.contentDocument).document;
aW.write("<!doctype html><html><body>");
aW.close()
}e=aW.body.appendChild(aW.createElement(b0));
bZ=E(e,"display");
o.body.removeChild(az)
}bh[b0]=bZ;
return bZ
}bG.each(["height","width"],function(bZ,e){bG.cssHooks[e]={get:function(b2,b1,b0){if(b1){if(b2.offsetWidth===0&&G.test(E(b2,"display"))){return bG.swap(b2,a9,function(){return u(b2,e,b0)
})
}else{return u(b2,e,b0)
}}},set:function(b1,b2,b0){return aG(b1,b2,b0?at(b1,e,b0,bG.support.boxSizing&&bG.css(b1,"boxSizing")==="border-box"):0)
}}
});
if(!bG.support.opacity){bG.cssHooks.opacity={get:function(bZ,e){return aS.test((e&&bZ.currentStyle?bZ.currentStyle.filter:bZ.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":e?"1":""
},set:function(b2,b3){var b1=b2.style,bZ=b2.currentStyle,e=bG.isNumeric(b3)?"alpha(opacity="+b3*100+")":"",b0=bZ&&bZ.filter||b1.filter||"";
b1.zoom=1;
if(b3>=1&&bG.trim(b0.replace(be,""))===""&&b1.removeAttribute){b1.removeAttribute("filter");
if(bZ&&!bZ.filter){return
}}b1.filter=be.test(b0)?b0.replace(be,e):b0+" "+e
}}
}bG(function(){if(!bG.support.reliableMarginRight){bG.cssHooks.marginRight={get:function(bZ,e){return bG.swap(bZ,{display:"inline-block"},function(){if(e){return E(bZ,"marginRight")
}})
}}
}if(!bG.support.pixelPosition&&bG.fn.position){bG.each(["top","left"],function(e,bZ){bG.cssHooks[bZ]={get:function(b2,b1){if(b1){var b0=E(b2,bZ);
return W.test(b0)?bG(b2).position()[bZ]+"px":b0
}}}
})
}});
if(bG.expr&&bG.expr.filters){bG.expr.filters.hidden=function(e){return(e.offsetWidth===0&&e.offsetHeight===0)||(!bG.support.reliableHiddenOffsets&&((e.style&&e.style.display)||E(e,"display"))==="none")
};
bG.expr.filters.visible=function(e){return !bG.expr.filters.hidden(e)
}
}bG.each({margin:"",padding:"",border:"Width"},function(e,bZ){bG.cssHooks[e+bZ]={expand:function(b2){var b1,b3=typeof b2==="string"?b2.split(" "):[b2],b0={};
for(b1=0;
b1<4;
b1++){b0[e+bQ[b1]+bZ]=b3[b1]||b3[b1-2]||b3[0]
}return b0
}};
if(!aZ.test(e)){bG.cssHooks[e+bZ].set=aG
}});
var bs=/%20/g,aP=/\[\]$/,U=/\r?\n/g,bz=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,aD=/^(?:select|textarea)/i;
bG.fn.extend({serialize:function(){return bG.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?bG.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||aD.test(this.nodeName)||bz.test(this.type))
}).map(function(e,bZ){var b0=bG(this).val();
return b0==null?null:bG.isArray(b0)?bG.map(b0,function(b2,b1){return{name:bZ.name,value:b2.replace(U,"\r\n")}
}):{name:bZ.name,value:b0.replace(U,"\r\n")}
}).get()
}});
bG.param=function(e,b0){var b1,bZ=[],b2=function(b3,b4){b4=bG.isFunction(b4)?b4():(b4==null?"":b4);
bZ[bZ.length]=encodeURIComponent(b3)+"="+encodeURIComponent(b4)
};
if(b0===aB){b0=bG.ajaxSettings&&bG.ajaxSettings.traditional
}if(bG.isArray(e)||(e.jquery&&!bG.isPlainObject(e))){bG.each(e,function(){b2(this.name,this.value)
})
}else{for(b1 in e){k(b1,e[b1],b0,b2)
}}return bZ.join("&").replace(bs,"+")
};
function k(b0,b2,bZ,b1){var e;
if(bG.isArray(b2)){bG.each(b2,function(b4,b3){if(bZ||aP.test(b0)){b1(b0,b3)
}else{k(b0+"["+(typeof b3==="object"?b4:"")+"]",b3,bZ,b1)
}})
}else{if(!bZ&&bG.type(b2)==="object"){for(e in b2){k(b0+"["+e+"]",b2[e],bZ,b1)
}}else{b1(b0,b2)
}}}var bX,Y,an=/#.*$/,ad=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,B=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,r=/^(?:GET|HEAD)$/,aC=/^\/\//,bN=/\?/,g=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,P=/([?&])_=[^&]*/,aT=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,bW=bG.fn.load,v={},a6={},aX=["*/"]+["*"];
try{Y=aI.href
}catch(bd){Y=o.createElement("a");
Y.href="";
Y=Y.href
}bX=aT.exec(Y.toLowerCase())||[];
function bI(e){return function(b2,b4){if(typeof b2!=="string"){b4=b2;
b2="*"
}var bZ,b5,b6,b1=b2.toLowerCase().split(aV),b0=0,b3=b1.length;
if(bG.isFunction(b4)){for(;
b0<b3;
b0++){bZ=b1[b0];
b6=/^\+/.test(bZ);
if(b6){bZ=bZ.substr(1)||"*"
}b5=e[bZ]=e[bZ]||[];
b5[b6?"unshift":"push"](b4)
}}}
}function q(bZ,b8,b3,b6,b5,b1){b5=b5||b8.dataTypes[0];
b1=b1||{};
b1[b5]=true;
var b7,b4=bZ[b5],b0=0,e=b4?b4.length:0,b2=(bZ===v);
for(;
b0<e&&(b2||!b7);
b0++){b7=b4[b0](b8,b3,b6);
if(typeof b7==="string"){if(!b2||b1[b7]){b7=aB
}else{b8.dataTypes.unshift(b7);
b7=q(bZ,b8,b3,b6,b7,b1)
}}}if((b2||!b7)&&!b1["*"]){b7=q(bZ,b8,b3,b6,"*",b1)
}return b7
}function t(b0,b1){var bZ,e,b2=bG.ajaxSettings.flatOptions||{};
for(bZ in b1){if(b1[bZ]!==aB){(b2[bZ]?b0:(e||(e={})))[bZ]=b1[bZ]
}}if(e){bG.extend(true,b0,e)
}}bG.fn.load=function(b1,b4,b5){if(typeof b1!=="string"&&bW){return bW.apply(this,arguments)
}if(!this.length){return this
}var e,b2,b0,bZ=this,b3=b1.indexOf(" ");
if(b3>=0){e=b1.slice(b3,b1.length);
b1=b1.slice(0,b3)
}if(bG.isFunction(b4)){b5=b4;
b4=aB
}else{if(b4&&typeof b4==="object"){b2="POST"
}}bG.ajax({url:b1,type:b2,dataType:"html",data:b4,complete:function(b7,b6){if(b5){bZ.each(b5,b0||[b7.responseText,b6,b7])
}}}).done(function(b6){b0=arguments;
bZ.html(e?bG("<div>").append(b6.replace(g,"")).find(e):b6)
});
return this
};
bG.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,bZ){bG.fn[bZ]=function(b0){return this.on(bZ,b0)
}
});
bG.each(["get","post"],function(e,bZ){bG[bZ]=function(b0,b2,b3,b1){if(bG.isFunction(b2)){b1=b1||b3;
b3=b2;
b2=aB
}return bG.ajax({type:bZ,url:b0,data:b2,success:b3,dataType:b1})
}
});
bG.extend({getScript:function(e,bZ){return bG.get(e,aB,bZ,"script")
},getJSON:function(e,bZ,b0){return bG.get(e,bZ,b0,"json")
},ajaxSetup:function(bZ,e){if(e){t(bZ,bG.ajaxSettings)
}else{e=bZ;
bZ=bG.ajaxSettings
}t(bZ,e);
return bZ
},ajaxSettings:{url:Y,isLocal:B.test(bX[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":aX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a2.String,"text html":true,"text json":bG.parseJSON,"text xml":bG.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:bI(v),ajaxTransport:bI(a6),ajax:function(b4,b1){if(typeof b4==="object"){b1=b4;
b4=aB
}b1=b1||{};
var b7,cl,b2,cg,b9,cd,b0,cf,b8=bG.ajaxSetup({},b1),cn=b8.context||b8,cb=cn!==b8&&(cn.nodeType||cn instanceof bG)?bG(cn):bG.event,cm=bG.Deferred(),ci=bG.Callbacks("once memory"),b5=b8.statusCode||{},cc={},cj={},b3=0,b6="canceled",ce={readyState:0,setRequestHeader:function(co,cp){if(!b3){var e=co.toLowerCase();
co=cj[e]=cj[e]||co;
cc[co]=cp
}return this
},getAllResponseHeaders:function(){return b3===2?cl:null
},getResponseHeader:function(co){var e;
if(b3===2){if(!b2){b2={};
while((e=ad.exec(cl))){b2[e[1].toLowerCase()]=e[2]
}}e=b2[co.toLowerCase()]
}return e===aB?null:e
},overrideMimeType:function(e){if(!b3){b8.mimeType=e
}return this
},abort:function(e){e=e||b6;
if(cg){cg.abort(e)
}ca(0,e);
return this
}};
function ca(cs,co,ct,cq){var e,cw,cu,cr,cv,cp=co;
if(b3===2){return
}b3=2;
if(b9){clearTimeout(b9)
}cg=aB;
cl=cq||"";
ce.readyState=cs>0?4:0;
if(ct){cr=h(b8,ce,ct)
}if(cs>=200&&cs<300||cs===304){if(b8.ifModified){cv=ce.getResponseHeader("Last-Modified");
if(cv){bG.lastModified[b7]=cv
}cv=ce.getResponseHeader("Etag");
if(cv){bG.etag[b7]=cv
}}if(cs===304){cp="notmodified";
e=true
}else{e=ae(b8,cr);
cp=e.state;
cw=e.data;
cu=e.error;
e=!cu
}}else{cu=cp;
if(!cp||cs){cp="error";
if(cs<0){cs=0
}}}ce.status=cs;
ce.statusText=(co||cp)+"";
if(e){cm.resolveWith(cn,[cw,cp,ce])
}else{cm.rejectWith(cn,[ce,cp,cu])
}ce.statusCode(b5);
b5=aB;
if(b0){cb.trigger("ajax"+(e?"Success":"Error"),[ce,b8,e?cw:cu])
}ci.fireWith(cn,[ce,cp]);
if(b0){cb.trigger("ajaxComplete",[ce,b8]);
if(!(--bG.active)){bG.event.trigger("ajaxStop")
}}}cm.promise(ce);
ce.success=ce.done;
ce.error=ce.fail;
ce.complete=ci.add;
ce.statusCode=function(co){if(co){var e;
if(b3<2){for(e in co){b5[e]=[b5[e],co[e]]
}}else{e=co[ce.status];
ce.always(e)
}}return this
};
b8.url=((b4||b8.url)+"").replace(an,"").replace(aC,bX[1]+"//");
b8.dataTypes=bG.trim(b8.dataType||"*").toLowerCase().split(aV);
if(b8.crossDomain==null){cd=aT.exec(b8.url.toLowerCase());
b8.crossDomain=!!(cd&&(cd[1]!==bX[1]||cd[2]!==bX[2]||(cd[3]||(cd[1]==="http:"?80:443))!=(bX[3]||(bX[1]==="http:"?80:443))))
}if(b8.data&&b8.processData&&typeof b8.data!=="string"){b8.data=bG.param(b8.data,b8.traditional)
}q(v,b8,b1,ce);
if(b3===2){return ce
}b0=b8.global;
b8.type=b8.type.toUpperCase();
b8.hasContent=!r.test(b8.type);
if(b0&&bG.active++===0){bG.event.trigger("ajaxStart")
}if(!b8.hasContent){if(b8.data){b8.url+=(bN.test(b8.url)?"&":"?")+b8.data;
delete b8.data
}b7=b8.url;
if(b8.cache===false){var bZ=bG.now(),ck=b8.url.replace(P,"$1_="+bZ);
b8.url=ck+((ck===b8.url)?(bN.test(b8.url)?"&":"?")+"_="+bZ:"")
}}if(b8.data&&b8.hasContent&&b8.contentType!==false||b1.contentType){ce.setRequestHeader("Content-Type",b8.contentType)
}if(b8.ifModified){b7=b7||b8.url;
if(bG.lastModified[b7]){ce.setRequestHeader("If-Modified-Since",bG.lastModified[b7])
}if(bG.etag[b7]){ce.setRequestHeader("If-None-Match",bG.etag[b7])
}}ce.setRequestHeader("Accept",b8.dataTypes[0]&&b8.accepts[b8.dataTypes[0]]?b8.accepts[b8.dataTypes[0]]+(b8.dataTypes[0]!=="*"?", "+aX+"; q=0.01":""):b8.accepts["*"]);
for(cf in b8.headers){ce.setRequestHeader(cf,b8.headers[cf])
}if(b8.beforeSend&&(b8.beforeSend.call(cn,ce,b8)===false||b3===2)){return ce.abort()
}b6="abort";
for(cf in {success:1,error:1,complete:1}){ce[cf](b8[cf])
}cg=q(a6,b8,b1,ce);
if(!cg){ca(-1,"No Transport")
}else{ce.readyState=1;
if(b0){cb.trigger("ajaxSend",[ce,b8])
}if(b8.async&&b8.timeout>0){b9=setTimeout(function(){ce.abort("timeout")
},b8.timeout)
}try{b3=1;
cg.send(cc,ca)
}catch(ch){if(b3<2){ca(-1,ch)
}else{throw ch
}}}return ce
},active:0,lastModified:{},etag:{}});
function h(b7,b6,b3){var b2,b4,b1,e,bZ=b7.contents,b5=b7.dataTypes,b0=b7.responseFields;
for(b4 in b0){if(b4 in b3){b6[b0[b4]]=b3[b4]
}}while(b5[0]==="*"){b5.shift();
if(b2===aB){b2=b7.mimeType||b6.getResponseHeader("content-type")
}}if(b2){for(b4 in bZ){if(bZ[b4]&&bZ[b4].test(b2)){b5.unshift(b4);
break
}}}if(b5[0] in b3){b1=b5[0]
}else{for(b4 in b3){if(!b5[0]||b7.converters[b4+" "+b5[0]]){b1=b4;
break
}if(!e){e=b4
}}b1=b1||e
}if(b1){if(b1!==b5[0]){b5.unshift(b1)
}return b3[b1]
}}function ae(b9,b1){var b7,bZ,b5,b3,b6=b9.dataTypes.slice(),b0=b6[0],b8={},b2=0;
if(b9.dataFilter){b1=b9.dataFilter(b1,b9.dataType)
}if(b6[1]){for(b7 in b9.converters){b8[b7.toLowerCase()]=b9.converters[b7]
}}for(;
(b5=b6[++b2]);
){if(b5!=="*"){if(b0!=="*"&&b0!==b5){b7=b8[b0+" "+b5]||b8["* "+b5];
if(!b7){for(bZ in b8){b3=bZ.split(" ");
if(b3[1]===b5){b7=b8[b0+" "+b3[0]]||b8["* "+b3[0]];
if(b7){if(b7===true){b7=b8[bZ]
}else{if(b8[bZ]!==true){b5=b3[0];
b6.splice(b2--,0,b5)
}}break
}}}}if(b7!==true){if(b7&&b9["throws"]){b1=b7(b1)
}else{try{b1=b7(b1)
}catch(b4){return{state:"parsererror",error:b7?b4:"No conversion from "+b0+" to "+b5}
}}}}b0=b5
}}return{state:"success",data:b1}
}var bp=[],aw=/\?/,a5=/(=)\?(?=&|$)|\?\?/,bl=bG.now();
bG.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=bp.pop()||(bG.expando+"_"+(bl++));
this[e]=true;
return e
}});
bG.ajaxPrefilter("json jsonp",function(b8,b3,b7){var b6,e,b5,b1=b8.data,bZ=b8.url,b0=b8.jsonp!==false,b4=b0&&a5.test(bZ),b2=b0&&!b4&&typeof b1==="string"&&!(b8.contentType||"").indexOf("application/x-www-form-urlencoded")&&a5.test(b1);
if(b8.dataTypes[0]==="jsonp"||b4||b2){b6=b8.jsonpCallback=bG.isFunction(b8.jsonpCallback)?b8.jsonpCallback():b8.jsonpCallback;
e=a2[b6];
if(b4){b8.url=bZ.replace(a5,"$1"+b6)
}else{if(b2){b8.data=b1.replace(a5,"$1"+b6)
}else{if(b0){b8.url+=(aw.test(bZ)?"&":"?")+b8.jsonp+"="+b6
}}}b8.converters["script json"]=function(){if(!b5){bG.error(b6+" was not called")
}return b5[0]
};
b8.dataTypes[0]="json";
a2[b6]=function(){b5=arguments
};
b7.always(function(){a2[b6]=e;
if(b8[b6]){b8.jsonpCallback=b3.jsonpCallback;
bp.push(b6)
}if(b5&&bG.isFunction(e)){e(b5[0])
}b5=e=aB
});
return"script"
}});
bG.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){bG.globalEval(e);
return e
}}});
bG.ajaxPrefilter("script",function(e){if(e.cache===aB){e.cache=false
}if(e.crossDomain){e.type="GET";
e.global=false
}});
bG.ajaxTransport("script",function(b0){if(b0.crossDomain){var e,bZ=o.head||o.getElementsByTagName("head")[0]||o.documentElement;
return{send:function(b1,b2){e=o.createElement("script");
e.async="async";
if(b0.scriptCharset){e.charset=b0.scriptCharset
}e.src=b0.url;
e.onload=e.onreadystatechange=function(b4,b3){if(b3||!e.readyState||/loaded|complete/.test(e.readyState)){e.onload=e.onreadystatechange=null;
if(bZ&&e.parentNode){bZ.removeChild(e)
}e=aB;
if(!b3){b2(200,"success")
}}};
bZ.insertBefore(e,bZ.firstChild)
},abort:function(){if(e){e.onload(0,1)
}}}
}});
var ah,aN=a2.ActiveXObject?function(){for(var e in ah){ah[e](0,1)
}}:false,au=0;
function bB(){try{return new a2.XMLHttpRequest()
}catch(bZ){}}function bb(){try{return new a2.ActiveXObject("Microsoft.XMLHTTP")
}catch(bZ){}}bG.ajaxSettings.xhr=a2.ActiveXObject?function(){return !this.isLocal&&bB()||bb()
}:bB;
(function(e){bG.extend(bG.support,{ajax:!!e,cors:!!e&&("withCredentials" in e)})
})(bG.ajaxSettings.xhr());
if(bG.support.ajax){bG.ajaxTransport(function(e){if(!e.crossDomain||bG.support.cors){var bZ;
return{send:function(b5,b0){var b3,b2,b4=e.xhr();
if(e.username){b4.open(e.type,e.url,e.async,e.username,e.password)
}else{b4.open(e.type,e.url,e.async)
}if(e.xhrFields){for(b2 in e.xhrFields){b4[b2]=e.xhrFields[b2]
}}if(e.mimeType&&b4.overrideMimeType){b4.overrideMimeType(e.mimeType)
}if(!e.crossDomain&&!b5["X-Requested-With"]){b5["X-Requested-With"]="XMLHttpRequest"
}try{for(b2 in b5){b4.setRequestHeader(b2,b5[b2])
}}catch(b1){}b4.send((e.hasContent&&e.data)||null);
bZ=function(ce,b8){var b9,b7,b6,cc,cb;
try{if(bZ&&(b8||b4.readyState===4)){bZ=aB;
if(b3){b4.onreadystatechange=bG.noop;
if(aN){delete ah[b3]
}}if(b8){if(b4.readyState!==4){b4.abort()
}}else{b9=b4.status;
b6=b4.getAllResponseHeaders();
cc={};
cb=b4.responseXML;
if(cb&&cb.documentElement){cc.xml=cb
}try{cc.text=b4.responseText
}catch(cd){}try{b7=b4.statusText
}catch(cd){b7=""
}if(!b9&&e.isLocal&&!e.crossDomain){b9=cc.text?200:404
}else{if(b9===1223){b9=204
}}}}}catch(ca){if(!b8){b0(-1,ca)
}}if(cc){b0(b9,b7,cc,b6)
}};
if(!e.async){bZ()
}else{if(b4.readyState===4){setTimeout(bZ,0)
}else{b3=++au;
if(aN){if(!ah){ah={};
bG(a2).unload(aN)
}ah[b3]=bZ
}b4.onreadystatechange=bZ
}}},abort:function(){if(bZ){bZ(0,1)
}}}
}})
}var L,ab,bO=/^(?:toggle|show|hide)$/,bH=new RegExp("^(?:([-+])=|)("+bx+")([a-z%]*)$","i"),bM=/queueHooks$/,ax=[i],a1={"*":[function(e,b5){var b1,b6,b7=this.createTween(e,b5),b2=bH.exec(b5),b3=b7.cur(),bZ=+b3||0,b0=1,b4=20;
if(b2){b1=+b2[2];
b6=b2[3]||(bG.cssNumber[e]?"":"px");
if(b6!=="px"&&bZ){bZ=bG.css(b7.elem,e,true)||b1||1;
do{b0=b0||".5";
bZ=bZ/b0;
bG.style(b7.elem,e,bZ+b6)
}while(b0!==(b0=b7.cur()/b3)&&b0!==1&&--b4)
}b7.unit=b6;
b7.start=bZ;
b7.end=b2[1]?bZ+(b2[1]+1)*b1:b1
}return b7
}]};
function bj(){setTimeout(function(){L=aB
},0);
return(L=bG.now())
}function bc(bZ,e){bG.each(e,function(b4,b2){var b3=(a1[b4]||[]).concat(a1["*"]),b0=0,b1=b3.length;
for(;
b0<b1;
b0++){if(b3[b0].call(bZ,b4,b2)){return
}}})
}function f(b0,b4,b7){var b8,b3=0,e=0,bZ=ax.length,b6=bG.Deferred().always(function(){delete b2.elem
}),b2=function(){var ce=L||bj(),cb=Math.max(0,b1.startTime+b1.duration-ce),b9=cb/b1.duration||0,cd=1-b9,ca=0,cc=b1.tweens.length;
for(;
ca<cc;
ca++){b1.tweens[ca].run(cd)
}b6.notifyWith(b0,[b1,cd,cb]);
if(cd<1&&cc){return cb
}else{b6.resolveWith(b0,[b1]);
return false
}},b1=b6.promise({elem:b0,props:bG.extend({},b4),opts:bG.extend(true,{specialEasing:{}},b7),originalProperties:b4,originalOptions:b7,startTime:L||bj(),duration:b7.duration,tweens:[],createTween:function(cc,b9,cb){var ca=bG.Tween(b0,b1.opts,cc,b9,b1.opts.specialEasing[cc]||b1.opts.easing);
b1.tweens.push(ca);
return ca
},stop:function(ca){var b9=0,cb=ca?b1.tweens.length:0;
for(;
b9<cb;
b9++){b1.tweens[b9].run(1)
}if(ca){b6.resolveWith(b0,[b1,ca])
}else{b6.rejectWith(b0,[b1,ca])
}return this
}}),b5=b1.props;
ak(b5,b1.opts.specialEasing);
for(;
b3<bZ;
b3++){b8=ax[b3].call(b1,b0,b5,b1.opts);
if(b8){return b8
}}bc(b1,b5);
if(bG.isFunction(b1.opts.start)){b1.opts.start.call(b0,b1)
}bG.fx.timer(bG.extend(b2,{anim:b1,queue:b1.opts.queue,elem:b0}));
return b1.progress(b1.opts.progress).done(b1.opts.done,b1.opts.complete).fail(b1.opts.fail).always(b1.opts.always)
}function ak(b1,b3){var b0,bZ,b4,b2,e;
for(b0 in b1){bZ=bG.camelCase(b0);
b4=b3[bZ];
b2=b1[b0];
if(bG.isArray(b2)){b4=b2[1];
b2=b1[b0]=b2[0]
}if(b0!==bZ){b1[bZ]=b2;
delete b1[b0]
}e=bG.cssHooks[bZ];
if(e&&"expand" in e){b2=e.expand(b2);
delete b1[bZ];
for(b0 in b2){if(!(b0 in b1)){b1[b0]=b2[b0];
b3[b0]=b4
}}}else{b3[bZ]=b4
}}}bG.Animation=bG.extend(f,{tweener:function(bZ,b2){if(bG.isFunction(bZ)){b2=bZ;
bZ=["*"]
}else{bZ=bZ.split(" ")
}var b1,e=0,b0=bZ.length;
for(;
e<b0;
e++){b1=bZ[e];
a1[b1]=a1[b1]||[];
a1[b1].unshift(b2)
}},prefilter:function(bZ,e){if(e){ax.unshift(bZ)
}else{ax.push(bZ)
}}});
function i(b2,b8,e){var b7,b0,ca,b1,ce,b4,cd,cc,cb,b3=this,bZ=b2.style,b9={},b6=[],b5=b2.nodeType&&Q(b2);
if(!e.queue){cc=bG._queueHooks(b2,"fx");
if(cc.unqueued==null){cc.unqueued=0;
cb=cc.empty.fire;
cc.empty.fire=function(){if(!cc.unqueued){cb()
}}
}cc.unqueued++;
b3.always(function(){b3.always(function(){cc.unqueued--;
if(!bG.queue(b2,"fx").length){cc.empty.fire()
}})
})
}if(b2.nodeType===1&&("height" in b8||"width" in b8)){e.overflow=[bZ.overflow,bZ.overflowX,bZ.overflowY];
if(bG.css(b2,"display")==="inline"&&bG.css(b2,"float")==="none"){if(!bG.support.inlineBlockNeedsLayout||bC(b2.nodeName)==="inline"){bZ.display="inline-block"
}else{bZ.zoom=1
}}}if(e.overflow){bZ.overflow="hidden";
if(!bG.support.shrinkWrapBlocks){b3.done(function(){bZ.overflow=e.overflow[0];
bZ.overflowX=e.overflow[1];
bZ.overflowY=e.overflow[2]
})
}}for(b7 in b8){ca=b8[b7];
if(bO.exec(ca)){delete b8[b7];
b4=b4||ca==="toggle";
if(ca===(b5?"hide":"show")){continue
}b6.push(b7)
}}b1=b6.length;
if(b1){ce=bG._data(b2,"fxshow")||bG._data(b2,"fxshow",{});
if("hidden" in ce){b5=ce.hidden
}if(b4){ce.hidden=!b5
}if(b5){bG(b2).show()
}else{b3.done(function(){bG(b2).hide()
})
}b3.done(function(){var cf;
bG.removeData(b2,"fxshow",true);
for(cf in b9){bG.style(b2,cf,b9[cf])
}});
for(b7=0;
b7<b1;
b7++){b0=b6[b7];
cd=b3.createTween(b0,b5?ce[b0]:0);
b9[b0]=ce[b0]||bG.style(b2,b0);
if(!(b0 in ce)){ce[b0]=cd.start;
if(b5){cd.end=cd.start;
cd.start=b0==="width"||b0==="height"?1:0
}}}}}function H(b0,bZ,b2,e,b1){return new H.prototype.init(b0,bZ,b2,e,b1)
}bG.Tween=H;
H.prototype={constructor:H,init:function(b1,bZ,b3,e,b2,b0){this.elem=b1;
this.prop=b3;
this.easing=b2||"swing";
this.options=bZ;
this.start=this.now=this.cur();
this.end=e;
this.unit=b0||(bG.cssNumber[b3]?"":"px")
},cur:function(){var e=H.propHooks[this.prop];
return e&&e.get?e.get(this):H.propHooks._default.get(this)
},run:function(b0){var bZ,e=H.propHooks[this.prop];
if(this.options.duration){this.pos=bZ=bG.easing[this.easing](b0,this.options.duration*b0,0,1,this.options.duration)
}else{this.pos=bZ=b0
}this.now=(this.end-this.start)*bZ+this.start;
if(this.options.step){this.options.step.call(this.elem,this.now,this)
}if(e&&e.set){e.set(this)
}else{H.propHooks._default.set(this)
}return this
}};
H.prototype.init.prototype=H.prototype;
H.propHooks={_default:{get:function(bZ){var e;
if(bZ.elem[bZ.prop]!=null&&(!bZ.elem.style||bZ.elem.style[bZ.prop]==null)){return bZ.elem[bZ.prop]
}e=bG.css(bZ.elem,bZ.prop,false,"");
return !e||e==="auto"?0:e
},set:function(e){if(bG.fx.step[e.prop]){bG.fx.step[e.prop](e)
}else{if(e.elem.style&&(e.elem.style[bG.cssProps[e.prop]]!=null||bG.cssHooks[e.prop])){bG.style(e.elem,e.prop,e.now+e.unit)
}else{e.elem[e.prop]=e.now
}}}}};
H.propHooks.scrollTop=H.propHooks.scrollLeft={set:function(e){if(e.elem.nodeType&&e.elem.parentNode){e.elem[e.prop]=e.now
}}};
bG.each(["toggle","show","hide"],function(bZ,e){var b0=bG.fn[e];
bG.fn[e]=function(b1,b3,b2){return b1==null||typeof b1==="boolean"||(!bZ&&bG.isFunction(b1)&&bG.isFunction(b3))?b0.apply(this,arguments):this.animate(bF(e,true),b1,b3,b2)
}
});
bG.fn.extend({fadeTo:function(e,b1,b0,bZ){return this.filter(Q).css("opacity",0).show().end().animate({opacity:b1},e,b0,bZ)
},animate:function(b4,b1,b3,b2){var b0=bG.isEmptyObject(b4),e=bG.speed(b1,b3,b2),bZ=function(){var b5=f(this,bG.extend({},b4),e);
if(b0){b5.stop(true)
}};
return b0||e.queue===false?this.each(bZ):this.queue(e.queue,bZ)
},stop:function(b0,bZ,e){var b1=function(b2){var b3=b2.stop;
delete b2.stop;
b3(e)
};
if(typeof b0!=="string"){e=bZ;
bZ=b0;
b0=aB
}if(bZ&&b0!==false){this.queue(b0||"fx",[])
}return this.each(function(){var b5=true,b2=b0!=null&&b0+"queueHooks",b4=bG.timers,b3=bG._data(this);
if(b2){if(b3[b2]&&b3[b2].stop){b1(b3[b2])
}}else{for(b2 in b3){if(b3[b2]&&b3[b2].stop&&bM.test(b2)){b1(b3[b2])
}}}for(b2=b4.length;
b2--;
){if(b4[b2].elem===this&&(b0==null||b4[b2].queue===b0)){b4[b2].anim.stop(e);
b5=false;
b4.splice(b2,1)
}}if(b5||!e){bG.dequeue(this,b0)
}})
}});
function bF(b0,b2){var b1,e={height:b0},bZ=0;
b2=b2?1:0;
for(;
bZ<4;
bZ+=2-b2){b1=bQ[bZ];
e["margin"+b1]=e["padding"+b1]=b0
}if(b2){e.opacity=e.width=b0
}return e
}bG.each({slideDown:bF("show"),slideUp:bF("hide"),slideToggle:bF("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,bZ){bG.fn[e]=function(b0,b2,b1){return this.animate(bZ,b0,b2,b1)
}
});
bG.speed=function(b0,b1,bZ){var e=b0&&typeof b0==="object"?bG.extend({},b0):{complete:bZ||!bZ&&b1||bG.isFunction(b0)&&b0,duration:b0,easing:bZ&&b1||b1&&!bG.isFunction(b1)&&b1};
e.duration=bG.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in bG.fx.speeds?bG.fx.speeds[e.duration]:bG.fx.speeds._default;
if(e.queue==null||e.queue===true){e.queue="fx"
}e.old=e.complete;
e.complete=function(){if(bG.isFunction(e.old)){e.old.call(this)
}if(e.queue){bG.dequeue(this,e.queue)
}};
return e
};
bG.easing={linear:function(e){return e
},swing:function(e){return 0.5-Math.cos(e*Math.PI)/2
}};
bG.timers=[];
bG.fx=H.prototype.init;
bG.fx.tick=function(){var b0,bZ=bG.timers,e=0;
L=bG.now();
for(;
e<bZ.length;
e++){b0=bZ[e];
if(!b0()&&bZ[e]===b0){bZ.splice(e--,1)
}}if(!bZ.length){bG.fx.stop()
}L=aB
};
bG.fx.timer=function(e){if(e()&&bG.timers.push(e)&&!ab){ab=setInterval(bG.fx.tick,bG.fx.interval)
}};
bG.fx.interval=13;
bG.fx.stop=function(){clearInterval(ab);
ab=null
};
bG.fx.speeds={slow:600,fast:200,_default:400};
bG.fx.step={};
if(bG.expr&&bG.expr.filters){bG.expr.filters.animated=function(e){return bG.grep(bG.timers,function(bZ){return e===bZ.elem
}).length
}
}var bm=/^(?:body|html)$/i;
bG.fn.offset=function(b8){if(arguments.length){return b8===aB?this:this.each(function(b9){bG.offset.setOffset(this,b8,b9)
})
}var bZ,b4,b5,b2,b6,e,b1,b3={top:0,left:0},b0=this[0],b7=b0&&b0.ownerDocument;
if(!b7){return
}if((b4=b7.body)===b0){return bG.offset.bodyOffset(b0)
}bZ=b7.documentElement;
if(!bG.contains(bZ,b0)){return b3
}if(typeof b0.getBoundingClientRect!=="undefined"){b3=b0.getBoundingClientRect()
}b5=bn(b7);
b2=bZ.clientTop||b4.clientTop||0;
b6=bZ.clientLeft||b4.clientLeft||0;
e=b5.pageYOffset||bZ.scrollTop;
b1=b5.pageXOffset||bZ.scrollLeft;
return{top:b3.top+e-b2,left:b3.left+b1-b6}
};
bG.offset={bodyOffset:function(e){var b0=e.offsetTop,bZ=e.offsetLeft;
if(bG.support.doesNotIncludeMarginInBodyOffset){b0+=parseFloat(bG.css(e,"marginTop"))||0;
bZ+=parseFloat(bG.css(e,"marginLeft"))||0
}return{top:b0,left:bZ}
},setOffset:function(b1,ca,b4){var b5=bG.css(b1,"position");
if(b5==="static"){b1.style.position="relative"
}var b3=bG(b1),bZ=b3.offset(),e=bG.css(b1,"top"),b8=bG.css(b1,"left"),b9=(b5==="absolute"||b5==="fixed")&&bG.inArray("auto",[e,b8])>-1,b7={},b6={},b0,b2;
if(b9){b6=b3.position();
b0=b6.top;
b2=b6.left
}else{b0=parseFloat(e)||0;
b2=parseFloat(b8)||0
}if(bG.isFunction(ca)){ca=ca.call(b1,b4,bZ)
}if(ca.top!=null){b7.top=(ca.top-bZ.top)+b0
}if(ca.left!=null){b7.left=(ca.left-bZ.left)+b2
}if("using" in ca){ca.using.call(b1,b7)
}else{b3.css(b7)
}}};
bG.fn.extend({position:function(){if(!this[0]){return
}var b0=this[0],bZ=this.offsetParent(),b1=this.offset(),e=bm.test(bZ[0].nodeName)?{top:0,left:0}:bZ.offset();
b1.top-=parseFloat(bG.css(b0,"marginTop"))||0;
b1.left-=parseFloat(bG.css(b0,"marginLeft"))||0;
e.top+=parseFloat(bG.css(bZ[0],"borderTopWidth"))||0;
e.left+=parseFloat(bG.css(bZ[0],"borderLeftWidth"))||0;
return{top:b1.top-e.top,left:b1.left-e.left}
},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.body;
while(e&&(!bm.test(e.nodeName)&&bG.css(e,"position")==="static")){e=e.offsetParent
}return e||o.body
})
}});
bG.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b0,bZ){var e=/Y/.test(bZ);
bG.fn[b0]=function(b1){return bG.access(this,function(b2,b5,b4){var b3=bn(b2);
if(b4===aB){return b3?(bZ in b3)?b3[bZ]:b3.document.documentElement[b5]:b2[b5]
}if(b3){b3.scrollTo(!e?b4:bG(b3).scrollLeft(),e?b4:bG(b3).scrollTop())
}else{b2[b5]=b4
}},b0,b1,arguments.length,null)
}
});
function bn(e){return bG.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:false
}bG.each({Height:"height",Width:"width"},function(e,bZ){bG.each({padding:"inner"+e,content:bZ,"":"outer"+e},function(b0,b1){bG.fn[b1]=function(b5,b4){var b3=arguments.length&&(b0||typeof b5!=="boolean"),b2=b0||(b5===true||b4===true?"margin":"border");
return bG.access(this,function(b7,b6,b8){var b9;
if(bG.isWindow(b7)){return b7.document.documentElement["client"+e]
}if(b7.nodeType===9){b9=b7.documentElement;
return Math.max(b7.body["scroll"+e],b9["scroll"+e],b7.body["offset"+e],b9["offset"+e],b9["client"+e])
}return b8===aB?bG.css(b7,b6,b8,b2):bG.style(b7,b6,b8,b2)
},bZ,b3?b5:aB,b3,null)
}
})
});
a2.jQuery=a2.$=bG;
if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return bG
})
}})(window);