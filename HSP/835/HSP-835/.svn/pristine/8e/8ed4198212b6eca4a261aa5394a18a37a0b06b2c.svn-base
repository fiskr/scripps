SNI.DIY.Accordion = function(element, config){

	// determine which browser specific fixes should be run
	SNI.DIY.Accordion.overflowFix = ($.browser.mozilla && parseFloat($.browser.version) <= 1.9); // FF3 or under
	SNI.DIY.Accordion.dynamicFix = ($.browser.msie && parseInt($.browser.version) < 8); // IE7 or under
	
	config = $.extend({
		autoheight: true,
		header: '.acco-link',
		change: SNI.DIY.Accordion.change,
		animated: 'easeOutSine'
		// clearStyle: true,
		// animated: ($.browser.msie ? false : 'easeOutSine')
	}, config);
	
	var acco = $(element).accordion(config);
	
	// hook into the links to run some browser specific fixes if needed
	if (SNI.DIY.Accordion.overflowFix || SNI.DIY.Accordion.dynamicFix) {
		$(config.header, acco).click(function() {
			var link = $(this);
		
			// only run if link is not open
			if (!link.hasClass('ui-state-active')) {
			
				// hide any dynamic content inside of accordion
				if (SNI.DIY.Accordion.dynamicFix) {
					$('.ui-accordion-content .crsl', acco).hide();
				}
			
				// remove the overflow from elements inside accordion
				if (SNI.DIY.Accordion.overflowFix) {
					$('.ui-accordion-content .list, .ui-accordion-content .thumbs', acco).css('overflow', 'hidden');
				}
			}
		});
	}
};

SNI.DIY.Accordion.change = function(event, ui) {

	// show any dynamic elements that were hidden
	if (SNI.DIY.Accordion.dynamicFix) {
		$('.crsl', ui.newContent).show();
	}
	
	// add the overflow back to any elements that need it
	if (SNI.DIY.Accordion.overflowFix) {
		$('.list, .thumbs', ui.newContent).css('overflow', 'auto');
	}
};
