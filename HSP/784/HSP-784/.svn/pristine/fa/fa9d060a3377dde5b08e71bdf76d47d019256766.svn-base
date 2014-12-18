SNI = SNI || {};
SNI.HGRM = SNI.HGRM || {};
SNI.HGRM.DynamicAds = SNI.DynamicAds;

// customize interstitial markup for site (augmented module pattern to override method):
SNI.HGRM.DynamicAds = (function(d) {
	d.fmt_interstitial = function() {
		var hRet = "";
		hRet += '<div class="interwrap">';
		hRet += '<a href="#" class="close"><span></span>Skip Ad</a>';
		hRet += '<h6 class="mrec">Advertisement</h6>';
		hRet += '<div class="inter-container">';
		if (d.iparm.iFmt.toLowerCase() == "swf") {
			hRet += '<div id="interad">'
		+ '<a class="no-flash-message" href="http://www.adobe.com/go/getflashplayer">'
		+ '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />'
		+ '</a>'
		+ '</div>';
		} else {
			if (d.iparm.iHREF != "") {
				hRet += '<a href="' + d.iparm.iHREF + '">';
			}
			hRet += '<img src ="' + d.iparm.iURL + '" />';
			if (d.iparm.iHREF != "") {
				hRet += '</a>';
			}
		}
		hRet += '<iframe class="tracker" width="0" height="0" frameborder="0"></iframe>';
		hRet += '</div>';
		hRet += '</div>';
		return hRet;
	}
	
	return d;
	
}) (SNI.HGRM.DynamicAds);
