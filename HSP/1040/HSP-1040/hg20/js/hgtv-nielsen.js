// site-specific wrapper for core Nielsen page tracking functionality

(function($) {
	var o = this;
	
	// define exclusion conditions for pages NOT to track
	o.exclPg = function() {
		var retVal = false;
		var re = /kudzu\.com$/;
		retVal = retVal || re.test(window.location.hostname);
		return retVal;
	}
	
	o.trackPageView = function() {
		if (!o.exclPg()) SNI.Nielsen.trackPageView();
	}
	
	SNI.HGTV.Nielsen = o;
}) (jQuery);