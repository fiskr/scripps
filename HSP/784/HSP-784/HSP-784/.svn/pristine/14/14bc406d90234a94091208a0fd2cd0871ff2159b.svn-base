SNI.HGRM.Dynlead = {
	
	init: function(elem, config) {
		SNI.HGRM.Dynlead.config = $.extend({
			delay: 4000,
			fadeSpeed: 'slow',
			changeOn: 'mouseover' // switch between items on 'mouseover' or 'click'
		}, config);
	
		SNI.HGRM.Dynlead.timeout = null;
		SNI.HGRM.Dynlead.activeItem = null;
		SNI.HGRM.Dynlead.contents = $('.dl-content li', elem);
		SNI.HGRM.Dynlead.nav = $('.dl-menu li', elem);
		
		$('.dl-content li:gt(0)', elem).hide();
		
		this.enable();
	},
	
	enable: function() {
	
		// make each menu item clickable 
		SNI.HGRM.Dynlead.nav.bind(SNI.HGRM.Dynlead.config.changeOn, function() {
			var item = $(this);
			var itemActive = item.hasClass('active'); // UI specifies no linking unless active
			
			SNI.HGRM.Dynlead.nextItem(item);
			
			return itemActive;
		});
		
		this.nextItem();
	},
	
	nextItem: function(nextItem) {
		
		clearTimeout(SNI.HGRM.Dynlead.timeout);
		SNI.HGRM.Dynlead.timeout = null;
		
		if (SNI.HGRM.Dynlead.activeItem) {
			
			// don't run animation if active item is clicked
			if (!nextItem.hasClass('active')) {
				var activeContent = SNI.HGRM.Dynlead.itemContent(SNI.HGRM.Dynlead.activeItem);
				
				// just in case someone gets click happy
				activeContent.css({opacity: 1});
				activeContent.stop();
		
				activeContent.fadeOut(SNI.HGRM.Dynlead.config.fadeSpeed);
				SNI.HGRM.Dynlead.itemContent(nextItem).fadeIn(SNI.HGRM.Dynlead.config.fadeSpeed);
		
				SNI.HGRM.Dynlead.nav.removeClass('active');
				nextItem.addClass('active');
		
				SNI.HGRM.Dynlead.activeItem = nextItem;
			}
		
		// activate the first item
		} else {
			SNI.HGRM.Dynlead.activeItem = SNI.HGRM.Dynlead.nav.eq(0).addClass('active');
		}
		
		// determine the next item
		var activeIndex = SNI.HGRM.Dynlead.nav.index(SNI.HGRM.Dynlead.activeItem);
		var nextIndex = SNI.HGRM.Dynlead.nextItemIndex(activeIndex);
		nextItem = SNI.HGRM.Dynlead.nav.eq(nextIndex);
			
		SNI.HGRM.Dynlead.timeout = setTimeout(function() {
			SNI.HGRM.Dynlead.nextItem(nextItem);
		}, SNI.HGRM.Dynlead.config.delay);
	},
	
	nextItemIndex: function(activeIndex) {
		return SNI.HGRM.Dynlead.nav.length > activeIndex+1 ? activeIndex+1 : 0;
	},
	
	itemContent: function(item) {
		var index = SNI.HGRM.Dynlead.nav.index(item);
		return SNI.HGRM.Dynlead.contents.eq(index);
	}
};