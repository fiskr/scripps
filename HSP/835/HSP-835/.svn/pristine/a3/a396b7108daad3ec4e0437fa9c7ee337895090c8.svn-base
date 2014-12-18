SNI.DIY.Dynlead = {
	
	init: function(elem, config) {
		SNI.DIY.Dynlead.config = $.extend({
			delay: 4000,
			fadeSpeed: 'slow',
			changeOn: 'mouseover' // switch between items on 'mouseover' or 'click'
		}, config);
	
		SNI.DIY.Dynlead.timeout = null;
		SNI.DIY.Dynlead.activeItem = null;
		SNI.DIY.Dynlead.contents = $('.dl-content li', elem);
		SNI.DIY.Dynlead.nav = $('.dl-menu li', elem);
		
		$('.dl-content li:gt(0)', elem).hide();
		
		this.enable();
	},
	
	enable: function() {
	
		// make each menu item clickable 
		SNI.DIY.Dynlead.nav.bind(SNI.DIY.Dynlead.config.changeOn, function() {
			var item = $(this);
			var itemActive = item.hasClass('active'); // UI specifies no linking unless active
			
			SNI.DIY.Dynlead.nextItem(item);
			
			return itemActive;
		});
		
		this.nextItem();
	},
	
	nextItem: function(nextItem) {
		
		clearTimeout(SNI.DIY.Dynlead.timeout);
		SNI.DIY.Dynlead.timeout = null;
		
		if (SNI.DIY.Dynlead.activeItem) {
			
			// don't run animation if active item is clicked
			if (!nextItem.hasClass('active')) {
				var activeContent = SNI.DIY.Dynlead.itemContent(SNI.DIY.Dynlead.activeItem);
				
				// just in case someone gets click happy
				activeContent.css({opacity: 1});
				activeContent.stop();
		
				activeContent.fadeOut(SNI.DIY.Dynlead.config.fadeSpeed);
				SNI.DIY.Dynlead.itemContent(nextItem).fadeIn(SNI.DIY.Dynlead.config.fadeSpeed);
		
				SNI.DIY.Dynlead.nav.removeClass('active');
				nextItem.addClass('active');
		
				SNI.DIY.Dynlead.activeItem = nextItem;
			}
		
		// activate the first item
		} else {
			SNI.DIY.Dynlead.activeItem = SNI.DIY.Dynlead.nav.eq(0).addClass('active');
		}
		
		// determine the next item
		var activeIndex = SNI.DIY.Dynlead.nav.index(SNI.DIY.Dynlead.activeItem);
		var nextIndex = SNI.DIY.Dynlead.nextItemIndex(activeIndex);
		nextItem = SNI.DIY.Dynlead.nav.eq(nextIndex);
			
		SNI.DIY.Dynlead.timeout = setTimeout(function() {
			SNI.DIY.Dynlead.nextItem(nextItem);
		}, SNI.DIY.Dynlead.config.delay);
	},
	
	nextItemIndex: function(activeIndex) {
		return SNI.DIY.Dynlead.nav.length > activeIndex+1 ? activeIndex+1 : 0;
	},
	
	itemContent: function(item) {
		var index = SNI.DIY.Dynlead.nav.index(item);
		return SNI.DIY.Dynlead.contents.eq(index);
	}
};