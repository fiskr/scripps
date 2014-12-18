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
SNI.DIY.Tabs = function(element, config) {
	var tabs = $(element).tabs(config);

	// force some CSS to center the tabs
	if (!config || config.forcePositionCenter !== false) {
		var nav = tabs.data('tabs').element;
		var navWidth = 0;

		// get the width of each tab
		nav.children().each(function() { 
			navWidth += $(this).outerWidth({ margin: true });
		});
		
		// force the left margin to center the tabs
		var marginLeft = Math.round((nav.width() / 2.0) - (navWidth / 2.0));
		nav.css({position: 'absolute', 'margin-left': marginLeft, zoom: '1'});
	}
};