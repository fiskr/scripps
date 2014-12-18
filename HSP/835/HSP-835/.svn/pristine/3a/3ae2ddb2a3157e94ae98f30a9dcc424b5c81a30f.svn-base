// Revenue Science support functions:
// 1. rdcookie - reads rsi_segs cookie and parses into segQS var
// 2. setvars - called at bottom of mains to set RSI category, tag etc.
// CEL Mar. 2009

if( typeof(SNI) == "undefined" ) {
	SNI = {};
}

if( typeof(SNI.RSI) == "undefined" ) {
	SNI.RSI = {};
}

// need this global:
var segQS="";

SNI.RSI.rdcookie = function() {

	// REVENUE SCIENCE AD TAG CODE - read cookie into js var that later goes into ad tag query string
	// separate with & not ; as in vendor doc
	var rsi_segs = [];
	var segs_beg=document.cookie.indexOf('rsi_segs=');
	if (segs_beg>=0){
		segs_beg=document.cookie.indexOf('=',segs_beg)+1;
		if(segs_beg>0){
			var segs_end=document.cookie.indexOf(';',segs_beg);
			if(segs_end==-1) segs_end=document.cookie.length;
			rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');
		}
	}
	var segLen=20;
	if (rsi_segs.length<segLen) {segLen=rsi_segs.length}
	for (var i=0;i<segLen;i++){
		segQS+=("&rsi"+"="+rsi_segs[i])
	}
	
	SNI.Ads.UseRSI = true;
	// END REVENUE SCIENCE AD TAG CODE 
	return;
}

// fires on page load
SNI.RSI.rdcookie();

// called at bottom of page
SNI.RSI.setvars = function() {
	A09802.DM_cat(mdManager.getParameter("Classification").split(',').reverse().join(' > '));
    A09802.DM_addEncToLoc("keyword", mdManager.getParameter(SNI.Config.rsiKeyWord));   
	A09802.DM_tag();
}
