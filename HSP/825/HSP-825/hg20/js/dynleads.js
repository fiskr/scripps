SNI.HGTV.Dynlead = {
    init: function(elem, config) {
	SNI.HGTV.Dynlead.config = $.extend({
	    delay: 4000,
	    fadeSpeed: 'slow',
	    changeOn: 'mouseover' // switch between items on 'mouseover' or 'click'
	}, config);
	
	SNI.HGTV.Dynlead.timeout = null;
	SNI.HGTV.Dynlead.activeItem = null;
	SNI.HGTV.Dynlead.contents = $('.dl-content li', elem);
	SNI.HGTV.Dynlead.nav = $('.dl-menu li', elem);
	
	$('.dl-content li:gt(0)', elem).hide();
	this.enable();
    },
    
    enable: function() {
	// make each menu item clickable 
	SNI.HGTV.Dynlead.nav.bind(SNI.HGTV.Dynlead.config.changeOn, function() {
	    var item = $(this);
	    var itemActive = item.hasClass('active'); // UI specifies no linking unless active	    
	    SNI.HGTV.Dynlead.nextItem(item);	    
	    return itemActive;
	});	
	this.nextItem();
    },
    
    nextItem: function(nextItem) {	
	clearTimeout(SNI.HGTV.Dynlead.timeout);
	SNI.HGTV.Dynlead.timeout = null;
	
	if (SNI.HGTV.Dynlead.activeItem) {	    
	    // don't run animation if active item is clicked
	    if (!nextItem.hasClass('active')) {
		var activeContent = SNI.HGTV.Dynlead.itemContent(SNI.HGTV.Dynlead.activeItem);
		
		// just in case someone gets click happy
		activeContent.css({opacity: 1});
		activeContent.stop();		
		activeContent.fadeOut(SNI.HGTV.Dynlead.config.fadeSpeed);
		SNI.HGTV.Dynlead.itemContent(nextItem).fadeIn(SNI.HGTV.Dynlead.config.fadeSpeed);		
		SNI.HGTV.Dynlead.nav.removeClass('active');
		nextItem.addClass('active');		
		SNI.HGTV.Dynlead.activeItem = nextItem;
	    }
	    // activate the first item
	} else {
	    SNI.HGTV.Dynlead.activeItem = SNI.HGTV.Dynlead.nav.eq(0).addClass('active');
	}
	
	// determine the next item
	var activeIndex = SNI.HGTV.Dynlead.nav.index(SNI.HGTV.Dynlead.activeItem);
	var nextIndex = SNI.HGTV.Dynlead.nextItemIndex(activeIndex);
	nextItem = SNI.HGTV.Dynlead.nav.eq(nextIndex);
	
	SNI.HGTV.Dynlead.timeout = setTimeout(function() {
	    SNI.HGTV.Dynlead.nextItem(nextItem);
	}, SNI.HGTV.Dynlead.config.delay);
    },
    
    nextItemIndex: function(activeIndex) {
	return SNI.HGTV.Dynlead.nav.length > activeIndex+1 ? activeIndex+1 : 0;
    },
    
    itemContent: function(item) {
	var index = SNI.HGTV.Dynlead.nav.index(item);
	return SNI.HGTV.Dynlead.contents.eq(index);
    }
};