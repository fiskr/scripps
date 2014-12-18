SNI = SNI || {};
SNI.DIY = SNI.DIY || {};
SNI.DIY.DynamicAds = SNI.DynamicAds;

// customize interstitial markup for site (augmented module pattern to override method):
SNI.DIY.DynamicAds = (function(d) {
	d.fmt_interstitial = function() {
		var hRet = "";
		hRet += '<div class="interwrap">';
		hRet += '<a href="#" class="close"><span></span>Skip Ad</a>';
		hRet += '<h6>Advertisement</h6>';

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
		return hRet;
	}
	
	return d;
	
}) (SNI.DIY.DynamicAds);
