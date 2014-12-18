SNI.DIY.Util = {
	moveToView: function(element, options) {
		options = $.extend({
			anchor: null,            // position the element relative to this element
			align: 'left',           // left or right align relative to the anchor
			topOffset: 0,            // any additional top offset
			leftOffset: 0,           // any additional left offset
			positionInViewport: true // force the element to be inside of the viewport (possibly changing the top and left offsets)
		}, options);
		
		element = $(element);
		
		// position the element relative to the anchor
		if (options.anchor !== null) {
			var anchor = $(options.anchor);
			var offset = anchor.offset();
			
			if (options.align == 'right') {
				options.leftOffset += anchor.width();
			}
			
			options.topOffset += offset.top; 
			options.leftOffset += offset.left;
		}
		
		element.css({top: options.topOffset, left: options.leftOffset});
		
		if (options.positionInViewport) {
			SNI.DIY.Util.positionInViewport(element);
		}
		
		element.fadeIn('fast');
	},
	
	getOffset: function(element) {
		element = $(element);

		var hidden = element.is(":hidden");
		if (hidden) { element.show(); }
		var offset = element.offset();
		if (hidden) { element.hide(); }
		
		return offset;
	},
	
	positionInViewport: function(element) {
		element = $(element);
		
		var windowOffset = 63; // additional offset due to DIY 'master head'
		var offset = SNI.DIY.Util.getOffset(element);
		var width = element.width();
		var height = element.height();
		
		var win = $(window);
		var browserWidth = win.width();
		var browserHeight = win.height();
		var scrollX = win.scrollLeft();
		var scrollY = win.scrollTop() + windowOffset; // add additional height due to DIY 'master head'

		// see if the element is off the top or bottom of the viewport
		if (offset.top < scrollY) {
			element.css({top: scrollY});
		} else if (offset.top + height > (scrollY-windowOffset) + browserHeight) {
			element.css({top: ((scrollY-windowOffset) + (browserHeight - height))});
		}
		
		// see if the element is off the left or right of the viewport
		if (offset.left < scrollX) {
			element.css({left: scrollX});
		} else if (offset.left + width > scrollX + browserWidth) {
			console.log('oh snap');
			element.css({left: ((scrollX+browserWidth) - width)});
		}		
	},
	
	closeNotice: function() {
		// hide the notice message if X is clicked
		$('.notice-msg .close').click(function() {
			$('.notice-msg').slideUp();
			return false;
		});
	},
	
	// when the <select> changes send the user to the link found in the option value
	dropdownToLinks: function(select) {
		select = $(select);
		
		select.change(function() {
			var val = $.trim(select.val());
			if (val != '') {
				window.location.href = val;
			}
		});
	},
	
	jumpLinkScrollTo: function(e) {
		var winOffset = 70;  // #diy-masthead height 
		
		// take into account the project finder expanded/hidden
		if ( $("#find-project-wrap").is(':visible') ) {
  			winOffset = winOffset + $("#find-project-wrap").height()
		}

		if ($(e).length) {
			var targetOffset = $(e).offset().top - winOffset;
			$('html,body').animate({scrollTop: targetOffset}, "fast");
			return false;
	      }
	}	

};
