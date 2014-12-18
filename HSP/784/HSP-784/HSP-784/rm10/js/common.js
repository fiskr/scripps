/*
 * Common Widgets
 * this namespace will hold functions that can be referenced in multiple properties utilizing a common namespace
 *
 */

if (typeof(SNI.Common) == 'undefined') {
	SNI.Common = {};
}


/*
 * Carousels
 *
 */
SNI.Common.Carousel = function(element, config) {

	config = $.extend({
		btnNext: element + " .btn.next",
		btnPrev: element + " .btn.prev",
		visible: 1,
		circular: false,
		displayPage : false,
		miniNav : false,
		speed: 'fast',
		btnGo: ""
	}, config);

	return $(element + ' .crsl-wrap').jCarouselLite({
		btnNext: config.btnNext,
		btnPrev: config.btnPrev,
		visible: config.visible,
		circular: config.circular,
		scroll: config.scroll != undefined ? config.scroll : config.visible,
		displayPage: (config.displayPage),
		btnNavigation : (config.displayPage) ? false : true,
		miniNav: config.miniNav,
		container : element,
		mouseWheel: true,
		speed: config.speed,
		btnGo: config.btnGo
	});


};

/*
 * Accordions
 *
 */
SNI.Common.Accordion = function(element, config) {
	var ca = this;
	// determine which browser specific fixes should be run
	ca.overflowFix = ($.browser.mozilla && parseFloat($.browser.version) <= 1.9); // FF3 or under
	SNI.Common.Accordion.dynamicFix = ($.browser.msie && parseInt($.browser.version) < 8); // IE7 or under

	config = $.extend({
		autoheight: true,
		header: '.acco-link',
		change: ca.change,
		animated: 'easeOutSine'
		// clearStyle: true,
		// animated: ($.browser.msie ? false : 'easeOutSine')
	}, config);

	var acco = $(element).accordion(config);

	// hook into the links to run some browser specific fixes if needed
	if (ca.overflowFix || ca.dynamicFix) {
		$(config.header, acco).click(function() {
			var link = $(this);

			// only run if link is not open
			if (!link.hasClass('ui-state-active')) {

				// hide any dynamic content inside of accordion
				if (ca.dynamicFix) {
					$('.ui-accordion-content .crsl', acco).hide();
				}

				// remove the overflow from elements inside accordion
				if (ca.overflowFix) {
					$('.ui-accordion-content .list, .ui-accordion-content .thumbs', acco).css('overflow', 'hidden');
				}
			}
		});
	}
};

SNI.Common.Accordion.change = function(event, ui) {

	// show any dynamic elements that were hidden
	if (SNI.Common.Accordion.dynamicFix) {
		$('.crsl', ui.newContent).show();
	}

	// add the overflow back to any elements that need it
	if (SNI.Common.Accordion.overflowFix) {
		$('.list, .thumbs', ui.newContent).css('overflow', 'auto');
	}
};


/**
 * Extends the default ui.tabs functionality (http://docs.jquery.com/UI/Tabs)
 *
 * Example:
 * SNI.DIY.Tabs('#most-popular', {forcePositionCenter: false});
 *
 * Params:
 *  element: the DOM element where tabs will be created
 *  forcePositionCenter: (optional, default is 'true') force the tabs to align center with CSS
 */
SNI.Common.Tabs = function(element, config) {

	if (config.selected == "random") {
		var countTabs = $(element).find(".tabs").children().size();
		var random = Math.floor(Math.random()*(countTabs));

		config = $.extend(config,{
			selected: random
		});
	}

	var tabs = $(element).tabs(config);
	
};

