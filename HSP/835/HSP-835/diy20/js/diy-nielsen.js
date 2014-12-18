/// site-specific wrapper for core Nielsen page tracking functionality

if( typeof(SNI.DIY) == "undefined" ) {SNI.DIY = {};}SNI.DIY.ANIMATION_SPEED = 150;

(function($) {
	var o = this;

	o.trackPageView =  SNI.Nielsen.trackPageView;

        o.trackNSE = SNI.Nielsen.trackNSE;

	SNI.DIY.Nielsen = o;
}) (jQuery);
