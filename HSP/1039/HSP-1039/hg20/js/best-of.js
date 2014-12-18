// interaction for DP "Best Of" module (not sure used)
// refactored to encapsulate jQuery $ 

(function($) {

	var BestOf = function() {
		this.init = function() {
			SNI.HGTV.Drops.init($(".best-of-full .drops"), $(".best-of-full .more-lnk"));
			SNI.HGTV.ViewSlider.init();
			return;
		};
	};

	SNI.HGTV.BestOf = new BestOf;
})(jQuery);
