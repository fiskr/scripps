
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.saveEvars();
	            CQ_Analytics.Sitecatalyst.updateEvars(options);
	            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
	            return false;
	        }, 10);
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            s = s_gi("devscripps");
	            if (s.linkTrackVars == "None") {
	                s.linkTrackVars = "events";
	            } else {
	                s.linkTrackVars = s.linkTrackVars + ",events";
	            }
	            CQ_Analytics.Sitecatalyst.trackLink(options);
	            return false;
	        }, 100);
	
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.restoreEvars();
	            return false;
	        }, 200);
	
	        CQ_Analytics.adhocLinkTracking = "false";
	        
	
	
	        var s_account = "devscripps";
	        var s = s_gi(s_account);
	        s.fpCookieDomainPeriods = "2";
	        s.currencyCode= 'USD';
        s.trackInlineStats= true;
        s.charSet= 'UTF-8';
        s.linkTrackVars= '\"None\"';
        s.linkTrackEvents= '\"None\"';
        s.linkDownloadFileTypes= '\"exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx\"';
        s.trackDownloadLinks= true;
        s.linkLeaveQueryString= false;
        s.linkExternalFilters= '';
        s.useForcedLinkTracking= false;
        s.trackExternalLinks= true;
        s.linkInternalFilters= '\"javascript:,hgtv.com,scrippsnetworks.com\"';
        s.trackDownLoadLinks= true;
        
        s.visitorNamespace = "ewscripps";
        s.trackingServer = "sa.hgtv.com";
        s.trackingServerSecure = "ssa.hgtv.com";
        
        //updated 08/21/2014
s.usePlugins=true;
function s_doPlugins(s) {
//Campaign
s.eVar3=s.getQueryParam('xp');
s.eVar11=s.getQueryParam('c1');
s.eVar12=s.getQueryParam('c2');
s.eVar13=s.getQueryParam('c3');
s.eVar14=s.getQueryParam('c4');
s.eVar2=s.getQueryParam('nl');
if (s.eVar2 == ""){s.eVar2=s.getQueryParam('sni_mid');}
s.eVar37=s.getQueryParam('oc');
s.eVar38=s.getQueryParam('vty');
s.eVar69=s.getQueryParam('ic1');
if (location.search.indexOf("c1=") != -1 && location.search.indexOf("ic1=") == -1) {s.campaign=s.getQueryParam("c1");}
else if (location.search.indexOf("soc=") !="-1") {s.campaign=s.getQueryParam('soc');}
else if (location.search.indexOf("syc=") !="-1") {s.campaign="syc: " + s.getQueryParam('syc');}
else if (location.search.indexOf("vpid=") !="-1") {s.campaign="vpid: " + s.getQueryParam('vpid');}
else if (location.search.indexOf("nl=") !="-1") {s.campaign="nl: " + s.getQueryParam('nl');}
else if (location.search.indexOf("sni_mid=") !="-1") {s.campaign="nl: " + s.getQueryParam('sni_mid');}
else if (location.search.indexOf("oc=") !="-1") {s.campaign="oc: " + s.getQueryParam('oc');}
else if (location.search.indexOf("vty=") !="-1") {s.campaign="vty: " + s.getQueryParam('vty');}
	
//Strongmail
s.eVar63=s.getQueryParam("sni_rid");
s.eVar64=s.getQueryParam("sni_mid");

//Sweepstakes
if (location.search.indexOf("e_by=") != "-1") {
		var e_by=s.getQueryParam('e_by');
		var e_gdr=s.getQueryParam('e_gdr');
		var e_mvpd=s.getQueryParam('e_mvpd');
		s.eVar36=e_by + "|" + e_gdr + "|" + e_mvpd
		if(s.events.indexOf("event34") == -1) {
			s.events=s.apl(s.events,"event34",",",2);
		}
	}


//GetValOnce
s.campaign=s.getValOnce(s.campaign,"s_campaign",0);
s.eVar2=s.getValOnce(s.eVar2,"s_gvo",0);
s.eVar3=s.getValOnce(s.eVar3,"s_gvo",0);
s.eVar37=s.getValOnce(s.eVar37,"s_gvo",0);
s.eVar38=s.getValOnce(s.eVar38,"s_gvo",0);
s.eVar69=s.getValOnce(s.eVar69,"s_gvo",0);
s.eVar63=s.getValOnce(s.eVar63,"s_gvo",0);
s.eVar64=s.getValOnce(s.eVar64,"s_gvo",0);
s.eVar15=s.getValOnce(s.eVar15,"s_gvo",0);
s.eVar11=s.getValOnce(s.eVar11,"s_gvo",0);

/* Get New and Repeat Visitor Information reset 2 years */
s.prop13=s.getNewRepeat(30);

s.server="D=User-Agent";
s.prop28="D=g";

/* TimeParting Code into One Variable (need to classify) */
var omniHour=s.getTimeParting('h','-5');
var omniDay=s.getTimeParting('d','-5');
var lenOH=omniHour.length;
switch(lenOH)
{
case 6:
    if (omniHour.indexOf(":30") == -1) {
            var aHour=omniHour.substring(0,1) + omniHour.substring(4,5);
    }
    else {
            var aHour=omniHour.substring(0,1) + ".5" + omniHour.substring(4,5);
    }
    break;
case 7:
    if (omniHour.indexOf(":30") == -1) {
            var aHour=omniHour.substring(0,2) + omniHour.substring(5,6);
    }
    else {
            var aHour=omniHour.substring(0,2) + ".5" + omniHour.substring(5,6);
    }
    break;
default:
            var aHour=omniHour;
}
var aDay=omniDay.substring(0,3);
s.prop33=aDay + "-" + aHour;

/*getPercentPageViewed and Previous Page*/
s.prop35=s.getPreviousValue(s.pageName,'gpv_pn');
if (s.prop35) {
s.prop34=s.getPercentPageViewed();
if (s.prop35.length > 100){s.prop35=s.prop35.substring(0,100);}
}

//Capture other hgtv-specific meta-data to Products
/*if(s.prop10=="recipe") {  //Possibly can use on HGTV with other meta data
s.products="";
var i;
var recipeComponents=["cuisine","difficulty","mainingredient","mealpart","preptime","technique","dish","mealtype","nutrition","occasions","courses","taste"];
for (i=0;i<recipeComponents.length;i++){
	if(mdManager.getParameter(recipeComponents[i]) != undefined){
		if (s.products == "") {
			s.products=recipeComponents[i] + ";" + mdManager.getParameter(recipeComponents[i]) + ",";
		}
		else {
			s.products=s.products + recipeComponents[i] + ";" + mdManager.getParameter(recipeComponents[i]) + ",";
		}
	}
}
s.products=s.products.toLowerCase();

//Add Crosslink Terms to Products to capture Crosslink Impressions
var xLinkTerms="";
var xLinkTerms1="";
if (mdManager.getParameterString("crossLinkTerms") != "") {
	xLinkTerms=mdManager.getParameterString("crossLinkTerms").toLowerCase();
	var xLinkTermsArray=xLinkTerms.split(";");
	var ii;
	for (ii=1;ii<xLinkTermsArray.length;ii++) {xLinkTerms1=xLinkTerms1 + "crosslink;" + xLinkTermsArray[ii];}
	s.events=s.apl(s.events,"event32",",",2);
}

s.products=s.products + xLinkTerms1;
}
*/

//************Begin Profile IDs
var cUserID="";
var sniUserID="";

//1 - UR3 userLoginCookie
cUserID=getCookie("userLoginCookie");
if(cUserID != undefined) {if(cUserID !=null || cUserID !=""){sniUserID=cUserID.substring(8, cUserID.indexOf("|"));}}
if(sniUserID.indexOf(":") == 0) {sniUserID=sniUserID.substring(1)}  //***temp fix for TC since they're cookie starts with " character (unlike other Scripps sites)

//2 - sni core userIdCookie
if(sniUserID == "") {
	cUserID=getCookie("userIdCookie");
	if(cUserID != undefined) {
		if(cUserID != "" || cUserID !=null) {
			//if(cUserID.indexOf("emailZZZZ") == -1) {sniUserID=cUserID.substring(cUserID.indexOf("emailZZ")+7, cUserID.indexOf("createDate")-2);}
			if(cUserID.indexOf("emailZZZZ") == -1) {sniUserID=cUserID.substring(8, cUserID.indexOf("emailZZ")-2);}
		}
	}
}
if(sniUserID != ""){s.prop75="Logged In";}
else {s.prop75="Logged Out";}

//3 - mdManager userid
if(sniUserID == "") {
	if (typeof mdManager != "undefined") {sniUserID=mdManager.getParameterString("UserID");}
}

sniUserID=sniUserID.toLowerCase();
s.eVar10=sniUserID;

s.prop20=getCookie("aam_did");

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
//************End Profile IDs

var origPN=s.pageName || location.href;
s.pageName = s.pageName ? s.pageName : location.pathname;


//drop querystring
if (s.pageName.indexOf("?") != -1) {
	pnEnd=s.pageName.indexOf("?");
	s.pageName=s.pageName.substring(0, pnEnd);
}
//drop protocol
if (s.pageName.indexOf("http://") != -1) {
	pnBegin=s.pageName.indexOf("http://")+7;
	s.pageName=s.pageName.substring(pnBegin);
}
//truncate characters over 100
if (s.pageName.length > 100){
	s.pageName=s.pageName.substring(0,100);
}

if(s.prop21){s.events=s.apl(s.events,"event14",",",2);}
if (s.eVar1){s.events=s.apl(s.events,"event28",",",2);}
s.eVar62 = mdManager.getParameterString("Contributor");

var sniRole=mdManager.getParameterString("Role").toLowerCase();
var sniSweeps=mdManager.getParameterString("Sweepstakes").toLowerCase();
if (s.prop45 != "" && s.prop7 != "") {s.prop47=s.prop45 + "-" + s.prop7;}
if (s.prop39 == "article_photo_gallery" || s.prop39 == "photogallery" || s.prop39 == "article_builder_photogallery" || s.prop39 == "photo_gallery") {s.events=s.apl(s.events,"event19",",",2);}
if (origPN.indexOf("#gallery") != -1) {s.events=s.apl(s.events,"event19",",",2); s.prop39="inline gallery";}  //may not apply on food sites?
else if (origPN.indexOf("#video") != -1) {s.prop39="inline video";}  //may not apply on food sites?
if (sniRole == "package") {s.events=s.apl(s.events,"event18",",",2);}
if (sniSweeps == "SweepsThankYou") {s.events=s.apl(s.events,"event34",",",2);}
if (s.prop10 == "topic") {s.events=s.apl(s.events,"event26",",",2);}


if (location.search.indexOf("c32=") !="-1") {s.prop32=s.getQueryParam("c32").toLowerCase();}
if (s.prop32 == "" || s.prop32 == undefined) {
	if (typeof mdManager != "undefined") {s.prop32 = mdManager.getParameterString("UserIdKey");}
}
if (s.prop32 == "" || s.prop32 == undefined) {s.prop32 = s.eVar10;}

}

s.doPlugins=s_doPlugins;

s.prop62="CQ 20140821";
window['optimizely'] = window['optimizely'] || [];
window['optimizely'].push("activateSiteCatalyst");

"function"!=typeof DIL&&(DIL=function(a,b){var c=[],d,e;a!==Object(a)&&(a={});var f,g,n,s,u,v,q,w,x,I,C;f=a.partner;g=a.containerNSID;n=a.iframeAttachmentDelay;s=!!a.disableDestinationPublishingIframe;u=a.iframeAkamaiHTTPS;v=a.mappings;q=a.uuidCookie;w=!0===a.enableErrorReporting;x=a.visitorService;I=a.declaredId;C=!0===a.removeFinishedScriptsAndCallbacks;var J,K,F,y,E;J=!0===a.disableScriptAttachment;K=!0===a.disableDefaultRequest;F=a.afterResultForDefaultRequest;y=!0===a.disableDPDemdexCookieSetting;
E=a.dpIframeSrc;w&&DIL.errorModule.activate();var L=!0===window._dil_unit_tests;(d=b)&&c.push(d+"");if(!f||"string"!=typeof f)return d="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:d,filename:"dil.js"}),Error(d);d="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(g||"number"==typeof g)g=parseInt(g,10),!isNaN(g)&&0<=g&&(d="");d&&(g=0,c.push(d),d="");e=DIL.getDil(f,g);if(e instanceof DIL&&e.api.getPartner()==
f&&e.api.getContainerNSID()==g)return e;if(this instanceof DIL)DIL.registerDil(this,f,g);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+f+" and containerNSID = "+g);var A={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},G={stuffed:{}},m={},p={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,
callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:g+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,uuid:null,noVisitorAPI:!1,
instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(h){try{if(!this.admsProcessingStarted){var a=this,l,k,d,b,c;if("function"==typeof h&&"function"==typeof h.getInstance){if(x===Object(x)&&(l=x.namespace)&&"string"==typeof l)k=h.getInstance(l);else{this.releaseType="no namespace";this.releaseRequests();return}if(k===Object(k)&&"function"==typeof k.isAllowed&&"function"==typeof k.getGlobalVisitorID){if(!k.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();
return}this.instance=k;this.admsProcessingStarted=!0;d=function(h){"VisitorAPI"!=a.releaseType&&(a.uuid=h,a.releaseType="VisitorAPI",a.releaseRequests())};L&&(b=x.server)&&"string"==typeof b&&(k.server=b);c=k.getGlobalVisitorID(d);if("string"==typeof c&&c.length){d(c);return}setTimeout(function(){"VisitorAPI"!=a.releaseType&&(a.releaseType="timeout",a.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(f){this.releaseRequests()}},
releaseRequests:function(){this.calledBack=!0;p.registerRequest()},getGlobalVisitorID:function(){return this.instance?this.instance.getGlobalVisitorID():null}},declaredId:{uuid:null,declaredId:{init:null,request:null},declaredIdCombos:{},dIdAlwaysOn:!1,dIdInRequest:!1,setDeclaredId:function(h,a){var l=t.isPopulatedString,k=encodeURIComponent;if(h===Object(h)&&l(a)){var d=h.dpid,c=h.dpuuid,b=null;if(l(d)&&l(c)){b=k(d)+"$"+k(c);if(!0===this.declaredIdCombos[b])return"setDeclaredId: combo exists for type '"+
a+"'";this.declaredIdCombos[b]=!0;this.declaredId[a]={dpid:d,dpuuid:c};"init"==a?this.dIdAlwaysOn=!0:"request"==a&&(this.dIdInRequest=!0);return"setDeclaredId: succeeded for type '"+a+"'"}}return"setDeclaredId: failed for type '"+a+"'"},getDeclaredIdQueryString:function(){var h=this.declaredId.request,a=this.declaredId.init,l="";null!==h?l="&d_dpid="+h.dpid+"&d_dpuuid="+h.dpuuid:null!==a&&(l="&d_dpid="+a.dpid+"&d_dpuuid="+a.dpuuid);return l},getUUIDQueryString:function(){var h=p.adms,a=t.isPopulatedString,
l=!1,k=p.adms.getGlobalVisitorID();a(this.uuid)?a(k)&&this.uuid!=k&&(this.uuid=k):this.uuid=k||h.uuid;if(this.dIdAlwaysOn||this.dIdInRequest)l=!0,this.dIdInRequest=!1;return a(this.uuid)&&l?"d_uuid="+this.uuid+"&":""}},registerRequest:function(h){var a=this.firingQueue;h===Object(h)&&a.push(h);!this.firing&&a.length&&(this.adms.calledBack?(h=a.shift(),h.src=h.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.declaredId.getUUIDQueryString()+"d_nsid="),B.fireRequest(h),this.firstRequestHasFired||
"script"!=h.tag||(this.firstRequestHasFired=!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(h){if(!C)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,l,k;h===Object(h)&&(l=h.script,k=h.callbackName,(l===Object(l)&&"SCRIPT"==l.nodeName||"no script created"==l)&&"string"==typeof k&&k.length&&a.push(h));if(this.readyToRemove&&a.length){k=a.shift();l=k.script;k=k.callbackName;"no script created"!=
l?(h=l.src,l.parentNode.removeChild(l)):h=l;window[k]=null;try{delete window[k]}catch(d){}this.removed.push({scriptSrc:h,callbackName:k});DIL.variables.scriptsRemoved.push(h);DIL.variables.callbacksRemoved.push(k);return this.requestRemoval()}return"requestRemoval() processed"}};e=function(){var h="http://fast.",a="?d_nsid="+g+"#"+encodeURIComponent(document.location.href);if("string"===typeof E&&E.length)return E+a;A.IS_HTTPS&&(h=!0===u?"https://fast.":"https://");return h+f+".demdex.net/dest4.html"+
a};var z={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+f+"_"+g,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:A.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],responseUUID:null,dsidc:y,attachIframe:function(){var h=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";a.src=this.url;r.addListener(a,"load",function(){h.iframeHasLoaded=!0;h.requestToProcess()});
document.body.appendChild(a);this.iframe=a},requestToProcess:function(h,a){var l=this;h&&!t.isEmptyObject(h)&&this.process(h,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){l.messageSendingInterval=A.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(h,a){var l=encodeURIComponent,k,d,c,b,f,e;a===Object(a)&&(e=r.encodeAndBuildRequest([p.declaredId.uuid||
"",a.dpid||"",a.dpuuid||""],","));if((k=h.dests)&&k instanceof Array&&(d=k.length))for(c=0;c<d;c++)b=k[c],b=[l("dests"),l(b.id||""),l(b.y||""),l(b.c||"")],this.addMessage(b.join("|"));if((k=h.ibs)&&k instanceof Array&&(d=k.length))for(c=0;c<d;c++)b=k[c],b=[l("ibs"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||[],","),l(b.ttl||""),"",e],this.addMessage(b.join("|"));if((k=h.dpcalls)&&k instanceof Array&&(d=k.length))for(c=0;c<d;c++)b=k[c],f=b.callback||{},f=[f.obj||"",f.fn||"",f.key||"",
f.tag||"",f.url||""],b=[l("dpm"),l(b.id||""),l(b.tag||""),r.encodeAndBuildRequest(b.url||[],","),l(b.ttl||""),r.encodeAndBuildRequest(f,","),e],this.addMessage(b.join("|"));this.jsonProcessed.push(h)},addMessage:function(h){var a=encodeURIComponent,a=w?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+h)},sendMessages:function(){var h=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){h.sendMessages()},
this.messageSendingInterval)):this.sendingMessages=!1},setIframeDemdexCookie:function(){if(this.dsidc)return"setIframeDemdexCookie disabled";var h=z,a=[],b=encodeURIComponent;a[0]=b("uuid");a[1]=b(this.responseUUID);h.addMessage(a.join("|"));p.firstRequestHasFired&&h.requestToProcess();return"Successfully queued"}},H={traits:function(h){t.isValidPdata(h)&&(m.sids instanceof Array||(m.sids=[]),r.extendArray(m.sids,h));return this},pixels:function(h){t.isValidPdata(h)&&(m.pdata instanceof Array||(m.pdata=
[]),r.extendArray(m.pdata,h));return this},logs:function(h){t.isValidLogdata(h)&&(m.logdata!==Object(m.logdata)&&(m.logdata={}),r.extendObject(m.logdata,h));return this},customQueryParams:function(h){t.isEmptyObject(h)||r.extendObject(m,h,p.reservedKeys);return this},signals:function(h,a){var b,c=h;if(!t.isEmptyObject(c)){if(a&&"string"==typeof a)for(b in c={},h)h.hasOwnProperty(b)&&(c[a+b]=h[b]);r.extendObject(m,c,p.reservedKeys)}return this},declaredId:function(a){p.declaredId.setDeclaredId(a,"request");
return this},result:function(a){"function"==typeof a&&(m.callback=a);return this},afterResult:function(a){"function"==typeof a&&(m.postCallbackFn=a);return this},useImageRequest:function(){m.useImageRequest=!0;return this},clearData:function(){m={};return this},submit:function(){B.submitRequest(m);m={};return this},getPartner:function(){return f},getContainerNSID:function(){return g},getEventLog:function(){return c},getState:function(){var a={},b={};r.extendObject(a,p,{callbackPrefix:!0,useJSONP:!0,
registerRequest:!0});r.extendObject(b,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:m,otherRequestInfo:a,destinationPublishingInfo:b}},idSync:function(a){if(a!==Object(a)||"string"!=typeof a.dpid||!a.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof a.url||!a.url.length)return"Error: config.url is empty";var b=a.url,c=a.minutesToLive,d=encodeURIComponent,f=z,e=p.declaredId,b=b.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==
typeof c)c=20160;else if(c=parseInt(c,10),isNaN(c)||0>=c)return"Error: config.minutesToLive needs to be a positive number";e=r.encodeAndBuildRequest([p.adms.getGlobalVisitorID()||e.uuid||"",a.dpid,a.dpuuid||""],",");a=["ibs",d(a.dpid),"img",d(b),c,"",e];f.addMessage(a.join("|"));p.firstRequestHasFired&&f.requestToProcess();return"Successfully queued"},aamIdSync:function(a){if(a!==Object(a)||"string"!=typeof a.dpuuid||!a.dpuuid.length)return"Error: config or config.dpuuid is empty";a.url="//dpm.demdex.net/ibs:dpid="+
a.dpid+"&dpuuid="+a.dpuuid;return this.idSync(a)},passData:function(a){if(t.isEmptyObject(a))return"Error: json is empty or not an object";B.defaultCallback(a);return"json submitted for processing"},getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var a=p,b=a.modStatsParams,c=a.platformParams,d;if(!b){b={};for(d in c)c.hasOwnProperty(d)&&!a.nonModStatsParams[d]&&(b[d.replace(/^d_/,"")]=c[d]);a.modStatsParams=b}return b}},B={submitRequest:function(a){p.registerRequest(B.createQueuedRequest(a));
return!0},createQueuedRequest:function(a){var b=p,c,d=a.callback,e="img";if(!t.isEmptyObject(v)){var D,q,n;for(D in v)v.hasOwnProperty(D)&&(q=v[D],null!=q&&""!==q&&D in a&&!(q in a||q in p.reservedKeys)&&(n=a[D],null!=n&&""!==n&&(a[q]=n)))}t.isValidPdata(a.sids)||(a.sids=[]);t.isValidPdata(a.pdata)||(a.pdata=[]);t.isValidLogdata(a.logdata)||(a.logdata={});a.logdataArray=r.convertObjectToKeyValuePairs(a.logdata,"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());"function"!=typeof d&&(d=this.defaultCallback);
if(b.useJSONP=!a.useImageRequest||"boolean"!=typeof a.useImageRequest)e="script",c=b.callbackPrefix+"_"+f+"_"+g+"_"+(new Date).getTime();return{tag:e,src:B.makeRequestSrc(a,c),internalCallbackName:c,callbackFn:d,postCallbackFn:a.postCallbackFn,useImageRequest:a.useImageRequest,requestData:a}},defaultCallback:function(a,b){var c,d,f,e,g,n,u,m,v;if((c=a.stuff)&&c instanceof Array&&(d=c.length))for(f=0;f<d;f++)if((e=c[f])&&e===Object(e)){g=e.cn;n=e.cv;u=e.ttl;if("undefined"==typeof u||""===u)u=Math.floor(r.getMaxCookieExpiresInMinutes()/
60/24);m=e.dmn||"."+document.domain.replace(/^www\./,"");v=e.type;g&&(n||"number"==typeof n)&&("var"!=v&&(u=parseInt(u,10))&&!isNaN(u)&&r.setCookie(g,n,1440*u,"/",m,!1),G.stuffed[g]=n)}c=a.uuid;d=z;f=p.declaredId;e=t.isPopulatedString;e(c)&&(e(d.responseUUID)&&d.responseUUID===c||(d.responseUUID=c,d.setIframeDemdexCookie()),e(f.uuid)||(f.uuid=c),t.isEmptyObject(q)||(d=q.path,"string"==typeof d&&d.length||(d="/"),f=parseInt(q.days,10),isNaN(f)&&(f=100),r.setCookie(q.name||"aam_did",c,1440*f,d,q.domain||
"."+document.domain.replace(/^www\./,""),!0===q.secure)));s||p.abortRequests||z.requestToProcess(a,b)},makeRequestSrc:function(a,b){a.sids=t.removeEmptyArrayValues(a.sids||[]);a.pdata=t.removeEmptyArrayValues(a.pdata||[]);var c=p,d=c.platformParams,e=r.encodeAndBuildRequest(a.sids,","),g=r.encodeAndBuildRequest(a.pdata,","),q=(a.logdataArray||[]).join("&");delete a.logdataArray;var n=A.IS_HTTPS?"https://":"http://",u=c.declaredId.getDeclaredIdQueryString(),s;s=[];var m,v,w,x;for(m in a)if(!(m in c.reservedKeys)&&
a.hasOwnProperty(m))if(v=a[m],m=encodeURIComponent(m),v instanceof Array)for(w=0,x=v.length;w<x;w++)s.push(m+"="+encodeURIComponent(v[w]));else s.push(m+"="+encodeURIComponent(v));s=s.length?"&"+s.join("&"):"";return n+f+".demdex.net/event?d_nsid="+d.d_nsid+u+(e.length?"&d_sid="+e:"")+(g.length?"&d_px="+g:"")+(q.length?"&d_ld="+encodeURIComponent(q):"")+s+(c.useJSONP?"&d_rtbd="+d.d_rtbd+"&d_jsonv="+d.d_jsonv+"&d_dst="+d.d_dst+"&d_cb="+(b||""):"")},fireRequest:function(a){if("img"==a.tag)this.fireImage(a);
else if("script"==a.tag){var c=p.declaredId,c=c.declaredId.request||c.declaredId.init||{};this.fireScript(a,{dpid:c.dpid||"",dpuuid:c.dpuuid||""})}},fireImage:function(a){var b=p,f,e;b.abortRequests||(b.firing=!0,f=new Image(0,0),b.sent.push(a),f.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},e=function(f){d="imgAbortOrErrorHandler received the event of type "+f.type;c.push(d);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},
f.addEventListener?(f.addEventListener("error",e,!1),f.addEventListener("abort",e,!1)):f.attachEvent&&(f.attachEvent("onerror",e),f.attachEvent("onabort",e)),f.src=a.src)},fireScript:function(a,b){var e=this,k=p,g,q,n=a.src,s=a.postCallbackFn,u="function"==typeof s,m=a.internalCallbackName;k.abortRequests||(k.firing=!0,window[m]=function(e){try{e!==Object(e)&&(e={});var l=a.callbackFn;k.firing=!1;k.fired.push(a);k.num_of_jsonp_responses++;l(e,b);u&&s(e,b)}catch(g){g.message="DIL jsonp callback caught error with message "+
g.message;d=g.message;c.push(d);g.filename=g.filename||"dil.js";g.partner=f;DIL.errorModule.handleError(g);try{l({error:g.name+"|"+g.message}),u&&s({error:g.name+"|"+g.message})}catch(n){}}finally{k.requestRemoval({script:q,callbackName:m}),k.registerRequest()}},J?(k.firing=!1,k.requestRemoval({script:"no script created",callbackName:m})):(q=document.createElement("script"),q.addEventListener&&q.addEventListener("error",function(b){k.requestRemoval({script:q,callbackName:m});d="jsonp script tag error listener received the event of type "+
b.type+" with src "+n;e.handleScriptError(d,a)},!1),q.type="text/javascript",q.src=n,g=DIL.variables.scriptNodeList[0],g.parentNode.insertBefore(q,g)),k.sent.push(a),k.declaredId.declaredId.request=null)},handleScriptError:function(a,b){var d=p;c.push(a);d.abortRequests=!0;d.firing=!1;d.errored.push(b);d.num_of_jsonp_errors++;d.registerRequest()}},t={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},
isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,f=[],b=0;b<c;b++)d=a[b],"undefined"!=typeof d&&null!=d&&f.push(d);return f},isPopulatedString:function(a){return"string"==typeof a&&a.length}},r={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"==typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+
b,function(a){"function"==typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[];b=b||"=";var f,e;for(f in a)e=a[f],"undefined"!=typeof e&&null!=e&&d.push(f+b+(c?encodeURIComponent(e):e));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;
for(var f=Array(d),e=0;e<d;e++)e in c&&(f[e]=b.call(b,c[e],e,c));return f},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],f=0;f<d;f++)if(f in c){var g=c[f];b.call(b,g,f,c)&&e.push(g)}return e}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,f;c=0;for(d=b.length;c<d;c++){for(f=b[c];" "==f.charAt(0);)f=f.substring(1,f.length);if(0==
f.indexOf(a))return decodeURIComponent(f.substring(a.length,f.length))}return null},setCookie:function(a,b,c,d,f,e){var g=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(g.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(f?";domain="+f:"")+(e?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||
!t.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(A.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"==f&&0==g&&r.addListener(window,"load",function(){DIL.windowLoaded=!0});y=function(){N();s||p.abortRequests||z.attachIframe();p.readyToRemove=!0;p.requestRemoval()};var N=function(){s||setTimeout(function(){K||p.firstRequestHasFired||p.adms.admsProcessingStarted||p.adms.calledBack||("function"==typeof F?
H.afterResult(F).submit():H.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},M=document;"error"!=f&&(DIL.windowLoaded?y():"complete"!=M.readyState&&"loaded"!=M.readyState?r.addListener(window,"load",y):DIL.isAddedPostWindowLoadWasCalled?r.addListener(window,"load",y):(n="number"==typeof n?parseInt(n,10):0,0>n&&(n=0),setTimeout(y,n||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));p.declaredId.setDeclaredId(I,"init");this.api=H;this.getStuffedVariable=function(a){var b=G.stuffed[a];b||"number"==
typeof b||(b=r.getCookie(a))||"number"==typeof b||(b="");return b};this.validators=t;this.helpers=r;this.constants=A;this.log=c;L&&(this.pendingRequest=m,this.requestController=p,this.setDestinationPublishingUrl=e,this.destinationPublishing=z,this.requestProcs=B,this.variables=G)},function(){var a=document,b;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",b=function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1))}(),
DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},DIL.extendStaticPropertiesAndMethods({version:"4.7",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=
!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,b,c){b=b+"$"+
c;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var c;"string"!=typeof a&&(a="");b||(b=0);c=a+"$"+b;return c in this.dils?this.dils[c]:Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,c){b=this.getDil(b,c);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,c){var d=1;b&&(window.postMessage?c.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(c.location=b.replace(/#.*$/,"")+"#"+ +new Date+
d++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},c=!1;return{activate:function(){c=!0},handleError:function(d){if(!c)return"DIL error module has not been activated";d!==Object(d)&&(d={});var e=d.name?(new String(d.name)).toLowerCase():
"",f=[];d={name:e,filename:d.filename?d.filename+"":"",partner:d.partner?d.partner+"":"no_partner",site:d.site?d.site+"":document.location.href,message:d.message?d.message+"":""};f.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(f).logs(d).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,c){var d="";b=b||"Error caught in DIL module/submodule: ";a===Object(a)?d=b+(a.message||"err has no message"):(d=b+"err is not a valid object",
a={});a.message=d;c instanceof DIL&&(a.partner=c.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=d}}});
DIL.tools.getSearchReferrer=function(a,b){var c=DIL.getDil("error"),d=DIL.tools.decomposeURI(a||document.referrer),e="",f="",g={queryParam:"q"};return(e=c.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!d.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:d.hostname,keywords:(c.helpers.extendObject(g,e),f=g.queryPattern?
(e=(""+d.search).match(g.queryPattern))?e[1]:"":d.uriParams[g.queryParam],decodeURIComponent(f||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),c=document.createElement("a");c.href=a||document.referrer;return{hash:c.hash,host:c.host.split(":").shift(),hostname:c.hostname,href:c.href,pathname:c.pathname.replace(/^\//,""),protocol:c.protocol,search:c.search,uriParams:function(a,c){b.helpers.map(c.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},c.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),c,d,e,f,g;c=0;for(e=arguments.length;c<e;c++)if(f=arguments[c],null!==f)for(d=0;d<b.length;d++)if(g=b[d],g.name==f){a[f]=g.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,c){try{var d=this,e={name:"DIL Site Catalyst Module Error"},f=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.dil=null;if(b instanceof DIL)this.dil=b;else return f("dilInstance is not a valid instance of DIL");e.partner=b.api.getPartner();if(a!==Object(a))return f("siteCatalystReportingSuite is not an object");if("function"!=typeof a.m_i||"function"!=typeof a.loadModule)return f("s.m_i is not a function or s.loadModule is not a function");
a.m_DIL=function(a){a=a.m_i("DIL");if(a!==Object(a))return f("m is not an object");a.trackVars=d.constructTrackVars(c);a.d=0;a._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,e,g=[];e=[];var n={},C=!1;if(d!==Object(d)||!(d.va_t instanceof Array))return f("Error in m._t function: s is not an object or s.va_t is not an array");if(this.d){if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),
d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(g=a.split(",");b<g.length;b++)0<=c.indexOf(","+g[b]+",")&&e.push(g[b]);e.length&&(c=","+e.join(",")+",")}e=0;for(b=d.va_t.length;e<b;e++)a=d.va_t[e],0<=c.indexOf(","+a+",")&&null!=d[a]&&""!==d[a]&&(n[a]=d[a],C=!0);C&&this.d.api.signals(n,"c_").submit()}};a.setup=function(a,c){this.d=b}};a.loadModule("DIL");if(a.DIL!==Object(a.DIL)||"function"!=typeof a.DIL.setup)return f("s.DIL is not an object or s.DIL.setup is not a function");
a.DIL.setup();if(e.message)return e.message}catch(g){return this.handle(g,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],c,d,e,f,g;if(a===Object(a)){c=a.names;if(c instanceof Array&&(e=c.length))for(d=0;d<e;d++)f=c[d],"string"==typeof f&&f.length&&b.push(f);a=a.iteratedNames;if(a instanceof Array&&(e=a.length))for(d=0;d<e;d++)if(c=a[d],c===Object(c)&&(f=c.name,g=parseInt(c.maxIndex,10),"string"==typeof f&&f.length&&!isNaN(g)&&0<=g))for(c=
0;c<=g;c++)b.push(f+c);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,c){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var d={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
d.message=e,DIL.errorModule.handleError(d));a instanceof Array&&a.length?this.arr=a:(e="gaArray is not an array or is empty",d.message=e,DIL.errorModule.handleError(d));this.tv=this.constructTrackVars(c);this.errorMessage=e}catch(f){this.handle(f,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],c,d,e,f;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;f={};c=0;for(d=e.length;c<d;c++)f[e[c]]=
!0;this.defaultTrackVarsObj=f}else f=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(d=a.length))for(c=0;c<d;c++)e=a[c],"string"==typeof e&&e.length&&e in f&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={};a=a instanceof Array?a:this.arr;var c,d,e,f;c=0;for(d=a.length;c<d;c++)e=a[c],e instanceof Array&&e.length&&(e=[],f=a[c],e instanceof Array&&f instanceof Array&&Array.prototype.push.apply(e,f),f=e.shift(),"string"==typeof f&&
f.length&&(b[f]instanceof Array||(b[f]=[]),b[f].push(e)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c,d){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,f){this.addToSignals("c_itemOrderId",
a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",f)},_addTrans:function(a,b,c,d,e,f,g,n){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",f);this.addToSignals("c_transState",g);this.addToSignals("c_transCountry",
n)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},c=this.tv,d,e,f,g,n,s;d=0;for(e=c.length;d<e;d++)if(f=c[d],a.hasOwnProperty(f)&&b.hasOwnProperty(f)&&(s=a[f],s instanceof Array))for(g=0,n=s.length;g<n;g++)b[f].apply(this,s[g])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,c){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,
this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(c)?c:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(d){this.handle(d,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,c,d,e,f,g;g=!1;var n=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(c=b.length))for(a=0;a<c;a++)if((d=b[a])&&d===Object(d)&&(e=d.cn,f=d.cv,e==this.cookieName&&this.v(f))){g=!0;break}if(g){b=
f.split(this.delimiter);"undefined"==typeof window._gaq&&(window._gaq=[]);d=window._gaq;a=0;for(c=b.length;a<c&&!(g=b[a].split("="),f=g[0],g=g[1],this.v(f)&&this.v(g)&&d.push(["_setCustomVar",n++,f,g,1]),n>this.LIMIT);a++);this.errorMessage=1<n?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;
this.dil.api.afterResult(function(b){a.process(b)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,c){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=c===Object(c)?c:{};c={name:"DIL Peer39 Module Error"};var d=[],e="";this.isSecurePageButNotEnabled(document.location.protocol)&&(e="Module has not been enabled for a secure page",d.push(e),c.message=e,DIL.errorModule.handleError(c));b instanceof
DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",d.push(e),c.message=e,DIL.errorModule.handleError(c));"string"==typeof a&&a.length?this.aid=a:(e="aid is not a string or is empty",d.push(e),c.message=e,DIL.errorModule.handleError(c));this.errorMessage=d.join("\n")}catch(f){this.handle(f,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),c=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(c){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};c.parentNode.insertBefore(b,c);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,c,d,e,f={},g=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,c=a.length;b<c;b++)d=a[b].split("="),e=d[0],d=d[1],e&&isFinite(d)&&!isNaN(parseInt(d,10))&&(f[e]instanceof Array||(f[e]=[]),f[e].push(d),g=!0);return{hasSignals:g,signals:f}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,c=b.scriptId,d=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof c&&c.length?c:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof d&&d.length?a.src=d:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
// Get the in Site Catalyst object instance

var _scObj = s_gi(s_account);
// Instantiate a DIL code

var scDil = DIL.create({

	partner: 'scripps'

});


DIL.modules.siteCatalyst.init(_scObj, scDil);


if (s.prop32 != null && s.prop32 != "") {
	scDil.api.aamIdSync({
		dpid: '468',
		dpuuid: s.prop32,
		minutesToLive: 20160
	});
}

// set aam_did cookie
(function(w, d, args) {
    function setCookie(name, value, expires, path, domain, secure) {
        var today = new Date();
		if (expires) {
			expires = expires * 1000 * 60;
		}
		document.cookie = name + '=' + value + ((expires) ? ';expires=' + new Date(today.getTime() + expires).toUTCString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
    }

    var cookie = {
        name : args.cookie_name || "aam_did",
        days : args.cookie_days || 100,
		domain : args.cookie_domain || "." + document.domain
    };
	var cb = args.callback_func || function(arg) {
		if (arg && arg.uuid) {
			setCookie(cookie.name, arg.uuid, cookie.days * 24 * 60, '/', cookie.domain, false);
		}
	};
    var callback = {
        name : args.callback_name || "_aam_cb",
        remove : function() {
            try {
                delete window[callback.name];
            }
            catch(e) {
                window[callback.name] = null;
            }
        },  
        func : function(arg) {
            cb(arg);
            callback.remove()
        }
    };
    var script = d.createElement('script');
    var first_script = document.getElementsByTagName('script')[0];
    var done = false;

    w[callback.name] = callback.func;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
            done = true;
            script.onload = script.onreadystatechange = null;

            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
    };
    script.src = window.location.protocol + "//" + args.subdomain + ".demdex.net/event?d_rtbd=json&d_cb=" + callback.name;
    first_script.parentNode.insertBefore(script, first_script);
}(window, document, {
        subdomain : "scripps",
	cookie_name : "aam_did",
	cookie_days : 730,
	cookie_domain : document.domain,
	callback_name : "_aam_cb"
}));

//*******CNAME Work-around*************
var _aam_iframe = null;

if (document.location.protocol !== 'https:') {
    _aam_iframe = document.createElement('iframe');
    _aam_iframe.id = '_aam_iframe';
    _aam_iframe.style.cssText = 'display: none; width: 0; height: 0;';
    _aam_iframe.src = 'http://aam.adsremote.scrippsnetworks.com/dilfire.html';
    document.body.appendChild(_aam_iframe);
}



