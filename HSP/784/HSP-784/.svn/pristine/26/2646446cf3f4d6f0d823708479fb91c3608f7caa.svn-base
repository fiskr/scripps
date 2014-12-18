if( typeof(SNI.HGRM) == "undefined" ) { SNI.HGRM = {}; }
SNI.HGRM.ANIMATION_SPEED = 150;

if (typeof(SNI.Util) == "undefined") {
    SNI.Util = {};
}

/*console spoof, in case code with console methods make it to prod*/
if ( window.console === undefined) {
    var names = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'],
    len = names.length,
    i = 0;

    window.console = {};
    for ( i = 0, i < len; i < len; i += 1) {
	window.console[names[i]] = function(){};
    }
}


SNI.Util.truncate = function(str, length, truncation) {
    length = length || 30;
    truncation = truncation == undefined ? '...' : truncation;
    return str.length > length ?
	str.slice(0, length - truncation.length) + truncation : str;
};


// do something once metadata object is ready; checks every 100ms for default up to 5s
SNI.Util.onMDready = function(myfn, tmlim) {
    if (tmlim == undefined) {
	tmlim = 5000;
    }
    n = 0;
    nlim = tmlim / 100;
    timerID = window.setInterval(
	function() {
	    ++n;
	    if (n > nlim) {
		window.clearInterval(timerID);
	    }
	    else if (typeof(mdManager) != "undefined") {
		window.clearInterval(timerID);
		myfn();
	    }
	}, 100);
};  



SNI.Util.moveToView = function(element, options) {
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
	SNI.Util.positionInViewport(element);
    }

    element.fadeIn('350');
};

SNI.Util.getOffset = function(element) {
    element = $(element);

    var hidden = element.is(":hidden");
    if (hidden) {
	element.show();
    }
    var offset = element.offset();
    if (hidden) {
	element.hide();
    }

    return offset;
};

SNI.Util.positionInViewport = function(element) {
    element = $(element);

    var windowOffset = 63; // additional offset due to DIY 'master head'
    var offset = SNI.Util.getOffset(element);
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
    } else if (offset.top + height > (scrollY - windowOffset) + browserHeight) {
	element.css({top: ((scrollY - windowOffset) + (browserHeight - height))});
    }

    // see if the element is off the left or right of the viewport
    if (offset.left < scrollX) {
	element.css({left: scrollX});
    } else if (offset.left + width > scrollX + browserWidth) {
	element.css({left: ((scrollX + browserWidth) - width)});
    }
};

//session creates a cookie that expires after the session
//same as persist...just no days
SNI.Util.Cookie.session = function(cookieName, key, value) {
    var cookie = this.get(cookieName);

    // just need to read the value
    if (typeof value == 'undefined') {

	// cookie has not been created so no info exists
	if (cookie == null) {
	    return null;

	    // try to find the key/value pair
	} else {
	    var values = this.getPersistValues(cookie);
	    return values[key];
	}

	// writing the value
    } else {

	// create new cookie
	if (cookie == null) {
	    var values = {};
	    values[key] = escape(value);

	    // append to the current cookie
	} else {
	    var values = this.getPersistValues(cookie);
	    values[key] = value;
	}

	this.set(cookieName, this.buildPersistString(values));
    }
};

SNI.Util.Toolbar = function(config) {

    var page_url = document.location.href;
    var page_type = mdManager.getPageType();
    var page_title = mdManager.getPageTitle();
    var share_url = SNI.Util.Url.setParameter(document.location.href, "soc", "share");

    var email_module = $("#email-a-friend");
    var email_module_path = SNI.Config.emailModulePath;
    var email_subject = "Check Out This Page on HGTVRemodels.com";
    var email_body = "thought you would be interested in this link to \"" + page_title + "\" on HGTVRemodels.com:";
    var email_comments = "I think this is just what you've been looking for.";
    var email_link = "";

    var showPrintLink = (mdManager.getPageType() === "CHANNEL" || mdManager.getPageType() === "PLAYER" || (mdManager.getParameterString('DelvFrmt').indexOf('GALLERY') > -1)) ? false : true;

    /**
     * turn off items by setting values to false in the toolBarConfig hash
     createEmail: true,
     printPage: true,
     twitterShare: true,
     fbShare: true,
     shareThis: true
    */

    // default values
    var configObj = $.extend({
	toolBarConfig : {
	    printPage: showPrintLink
	    //enter hashes here to remove
	},
	tweetUrl: share_url,
	pageUrl: page_url,
	emailModule: email_module,
	emailModulePath: email_module_path,
	emailSubject: email_subject,
	emailBody: email_body,
	emailLink: email_link,
	emailComments: email_comments,
	emailPageTitle: page_title
    }, config, true);


    SNI.HGRM.globalToolbar.init(configObj);
};

// abstracted functionality to scroll HTML nodes into view
SNI.Util.scrollNodeIntoView = ( function($){
    return function(cfg){
	var DEFAULT_CONFIGS = {},
	doc = $('html, body');

	cfg = $.extend(DEFAULT_CONFIGS, cfg);
	doc.animate({scrollTop: cfg.n.offset().top - cfg.special_offset}, 750);
    };
} )(jQuery);

SNI.Util.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);

    if(results == null) return "";
    
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};



// namespace to display overlays for inline modules
// called out of inline module namespaces
// inline module namespaces sold (stored) separately
SNI.Util.overlay = ( function($){
    return {
	is_showing : false,
	contents : '', // used to determine whether cached content should display or not
	open : function(cfg){
	    /* Method to inject overlay if necessary and display overlay
	     * @param {Object} config Configuration for module-related information as it pertains to the overlay
	     wrapper: overlay node
	     module: the current module
	     offset: module offset
	    */
	    var DEFAULT_CONFIGS = {
		wrapper : '#overlay', // overlay node ID
		inner : '#overlay-content',
		inlineVideo:0,
		fill : SNI.HGRM.TheaterModules.fill,
		empty : function(outer, inner){
		    inner.fadeOut('slow', function() {
			inner.html('');
			SNI.Util.overlay.close();
		    });
		}
	    },

	    bd = $('body'),
	    hd = $('header:first'),
	    wrapper,
	    inner;

	    cfg = $.extend(DEFAULT_CONFIGS, cfg);

	    // the first time this is called, the overlay wrappers don't exist
	    // thus, we inject them and re-define the function later
	    hd.after(function(idx, html){
		// create/inject overlay (gray) wrapper
		var attr = cfg.wrapper.replace('#',''),
		node_attrs = {
		    id : attr,
		    'class' : attr
		},

		n = $('<div />', node_attrs);

		// cache reference to the overlay wrapper for the re-definition
		wrapper = n;
		return n;
	    });

	    $(wrapper).click(function() {
		SNI.Util.overlay.close(cfg);
	    });

	    // also, create/inject modal module content wrappers
	    wrapper.after(function(idx, html){
		var attr = cfg.inner.replace('#',''),
		node_attrs = {
		    id : attr,
		    'class' : attr
		},
		n = $('<div />', node_attrs);

		// cache reference to the inner content wrappers for our cfg.empty function call
		inner = n;
		return n;
	    });

	    // re-define function as we no longer need to check if the overlay is on the page
	    SNI.Util.overlay.opens = function(){
		$(inner).css('top', cfg.offset);
		SNI.Util.overlay.is_showing = true;
		wrapper.show().animate({ opacity : .75}, 350, function(){
		    cfg.fill({url : cfg.url, inlineVideo: cfg.inlineVideo});
		});
		
		var advParent = $('.sni-e .lead.flush .mrec');
		advParent.css('height', $(advParent).height() + 'px');
		$(advParent).children().hide();
		$('#leaderboard-wrap #leaderboard').css('visibility', 'hidden');
	    };

	    // call the re-defined, shorter function
	    SNI.Util.overlay.opens();

	    // cache reference to the overlay content wrapper so that we can hide it on close
	    inner = $(cfg.inner);

	    inner.bind('click', function(evt){
		evt.stopPropagation();
		evt.preventDefault();

		var tar = $(evt.target);
		if( tar.is('#' + inner.attr('id')) || tar.is('#overlay-inner > div.close:first *') ){
		    SNI.Util.overlay.is_showing = false;
		    cfg.empty(wrapper, inner);
		}

	    });

	    $(document).bind('keyup', function(evt) {
		if(evt.keyCode === 27 && SNI.Util.overlay.is_showing === true){
		    SNI.Util.overlay.is_showing = false;
		    cfg.empty(wrapper, inner);
		}
	    });
	}, // end SNI.Util.overlay.open

	close : function(cfg){
	    /* Method to inject overlay if necessary and display overlay
	     * @param {Object} config Configuration for module-related information as it pertains to the overlay
	     wrapper: overlay node
	     module: the current module
	     offset: module offset
	    */
	    var DEFAULT_CONFIGS = {
		wrapper: '#overlay' // overlay node ID
	    },
	    wrapper;

	    cfg = $.extend(DEFAULT_CONFIGS, cfg);
	    $('#overlay-content').hide();
	    $('#overlay-content').remove();

	    var advParent = $('.sni-e .mrec');
	    $(advParent).children().show()
	    $(advParent).css('height', 'auto')
	    $('#leaderboard-wrap #leaderboard').css('visibility', 'visible');
	    wrapper = $(cfg.wrapper).animate(
		{
		    opacity : 0
		}, 350,
		function(){
		    wrapper.remove();
		}
	    );

	    // empty out var used to reference most recent theater content
	    SNI.Util.overlay.contents = '';
	} // end SNI.Util.overlay.close
    };
} )(jQuery);

SNI.Util.HookIMGResize = function(citeId, aTagId) {
    $(citeId).bind('click', function(evt){
	evt.stopPropagation();
	evt.preventDefault();
	$(aTagId).click();
    });
};

// click-based photo resize functionality
SNI.Util.IMGResize = ( function($){
    return {
	sizes : { // storing various image sizes for flexible lookup on resize
	    'lg': {width: '616px', height: '462px',
		   vertical_dimensions: {width: '616px', height: '821px'}
		  },
	    'al': {width: '266px', height: '200px',
		   vertical_dimensions: {width: '266px', height: '354px'}
		  },
	    'med': {width:'160px', height: '120px', 
		    vertical_dimensions: {width: '160px', height: '120px'}
		   },
	    'tzhz': {width: '120px', height: '90px', 
		     vertical_dimensions: {width: '90px', height: '120px'}
		    },
	    'ab': {width: '160px', height: '120px',
		   vertical_dimensions: {width: '120px', height: '160px'}
		  }
	},
	
	grow: function(cfg) {
	    var animate = function() {

		var p = cfg.img.parent(),
		ico = p.find('.ico:first'),
		newsize = SNI.Util.IMGResize.sizes[cfg.newsize];
		p.spinner();

		if(cfg.is_vertical === true) { // check if large image is vertical. if so, change the dimensions of the new size
		    newsize = SNI.Util.IMGResize.sizes[cfg.newsize].vertical_dimensions;
		}

		ico.fadeOut('350', function() {

			p.spinner('remove');

		    if (cfg.headline.n.length === 0) { //when no h4 to scroll to, use image
			cfg.headline.n = cfg.img;
		    }

		    SNI.Util.scrollNodeIntoView(cfg.headline);
		    p.parent().addClass('active');

		    cfg.img.animate($.extend(newsize, cfg.props), {			    
			duration: 350,
			complete: function() {
			    p.find('.ico em:first').text('Shrink Photo').parent().delay(0).fadeIn('350');
			    cfg.img.removeClass('animating');
			} // end callback
		    }); // end animate
		});
	    },
	    prep = function() {
		if(cfg.fluff !== false && typeof cfg.fluff.pregrow !== 'undefined'){
		    cfg.fluff.pregrow();
		}
	    };
	    
	    prep();
	    cfg.img.one('load', function(evt) {
		animate();

	    });
	    cfg.img.attr('src', cfg.newsrc);
	},

	shrink: function(cfg) { 	    // scale large image back down to the smaller image's size

	    var p = cfg.img.parent();
	    ico = p.find('.ico:first'),
	    originalsize = cfg.originalsize;
	    
	    if(cfg.is_vertical === true) {
		originalsize = cfg.originalsize.vertical_dimensions;
	    }

	    ico.fadeOut('350', function() {
		p.parent().removeClass('active');
		cfg.img.stop().animate($.extend(originalsize, cfg.props), {
		    duration: 350,
		    complete: function() {
			
			if(cfg.fluff !== false && typeof cfg.fluff.postshrink !== 'undefined') {
			    cfg.fluff.postshrink();
			}
			p.find('.ico em:first').text('Enlarge Photo').parent().delay(0).fadeIn('350');
			cfg.img.attr('src', cfg.newsrc);
			cfg.img.removeClass('animating');
			
		    } // end callback
		}); // end animate
	    });
	},

	init: function(cfg) {
	    var DEFAULT_CONFIG = {
		module : '',
		context : '' // used to indicate if special treatment needs to be applied prior to resize
	    },
	    img,
	    img_sm_url,
	    img_lg_url,
	    treatments = {},
	    fluff = false,
	    headline,
	    references = {},
	    originalsize,     // suffix associated with original (thumb) size,
	    newsize,     // suffix associated with enlarged thumb (traditionally _lg)
	                //	    suffix = /(3x4|4x3)\_(.{2,4})\.jpg$/ig, // 2-4 characters after the last underscore, prior to the .jpg extension;

	    suffix = /\_(lg|lead|al|med|tz|sm|ab|tzhz)\.jpg$/ig,    //match all possible image sizes

	    is_vertical = function(str, imgClass) { //vertical if '3x4' present
		if (imgClass == 'vertical') return true;

		str = str || '';
		if (str.split('_').shift() === '3x4') {
		    return true;
		}
		return false;
	    },

	    get_suffix = function(str){
		str = str || '';
		return str.split('_').pop();
	    },

	    originalsize_is_vertical,
	    newsize_is_vertical;

	    cfg = $.extend(DEFAULT_CONFIG, cfg);
	    cfg.module = $(cfg.module);

	    // store small and large image values
	    img = cfg.module.find('img:first');
	    img_sm_url = img.attr('src');
	    img_lg_url = cfg.module.attr('href');

	    // cached dom selectors related to before/after module
	    // should be expanded/abstracted to accommodate other contexts as needed
	    references.li = img.parent().parent();
	    references.nextli = references.li.next();
	    references.previmg = references.li.prev('li').find('img:first');

	    // various custom pre-treatments based on special cases,
	    // dictated by the cfg.context parameter in its relation to a key within this lookup table
	    treatments = {
		'before' : {
		    headline : {
			n : cfg.module.prev('h5'),
			special_offset : 20
		    }, // jquery selector for headline associated with before image in before/after module

		    references : references,
		    pregrow: function() {
			treatments.before.references.li.animate(
			    {'padding-left': '0px'},
			    {duration: 350}
			);

			if(treatments.before.references.nextli.hasClass('active') === false) {
			    treatments.before.references.nextli.find('cite:first').css('margin-left', '7px');
			}
		    },

		    postshrink: function() {
			headline.special_offset = 15;
			SNI.Util.scrollNodeIntoView(headline);
			
			treatments.before.references.li.animate(
			    {'padding-left': '28px'},
			    {duration: 350}
			);
			
			if(treatments.before.references.nextli.hasClass('active') === false) {
			    treatments.before.references.nextli.find('cite:first').removeAttr('style');
			}
		    }
		},

		'after': {
		    headline: {
			n: cfg.module.prev('h5'),
			special_offset : -270
		    },
		    references : references, // get reference to before image

		    pregrow: function() { // check if it's enlarged
			if( treatments.after.references.previmg.attr('height') === 200) {
			    headline.special_offset = -270
			
			} else headline.special_offset = 15;
		    },

		    postshrink : function(){
			if( treatments.after.references.previmg.attr('height') === 200) {
			    headline.special_offset = 15;
			}
			else {
			    headline.special_offset = 15;
			}

			// if there's a custom style (left margin on image-specific caption) remove it
			treatments.after.references.li.find('cite:first').removeAttr('style');
			SNI.Util.scrollNodeIntoView(headline);
		    }
		}
	    };

	    // check if pre-treatment needs to be applied prior to resize
	    if(cfg.context !== '' && typeof cfg.context !== 'undefined'){
		fluff = treatments[cfg.context];
		headline = treatments[cfg.context].headline;
	    
	    } else { // set headline to hard-coded default
		headline = {
		    n : cfg.module.parent().prev('h4'),
		    special_offset : 10
		};
	    }

	    originalsize = img.attr('src').match(suffix)[0].replace('.jpg','');
	    imgClass = img.attr('class');
	    originalsize_is_vertical = is_vertical(originalsize, imgClass);
	    originalsize = get_suffix(originalsize);

            newsize = img_lg_url.match(suffix)[0].replace('.jpg','');
	    newsize_is_vertical = originalsize_is_vertical;
	    newsize = get_suffix(newsize);

	    // delegating click event off of link so that nothing breaks when image or icon is clicked
	    return cfg.module.bind('click', function(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		// adding a class so that duplicate handlers don't execute
		if(img.hasClass('animating') === false) {
		    img.addClass('animating');
		    
		    if(img.parent().parent().hasClass('active')){
			SNI.Util.IMGResize.shrink({
			    is_vertical : originalsize_is_vertical,
			    img : img,
			    newsrc : img_sm_url,
			    fluff : fluff,
			    originalsize : SNI.Util.IMGResize.sizes[originalsize],
			    props : cfg.shrinkprops,
			    headline : headline
			});
		    }
		    else {
			SNI.Util.IMGResize.grow({
			    is_vertical : newsize_is_vertical,
			    img : img,
			    newsrc : img_lg_url,
			    newsize : newsize,
			    fluff : fluff,
			    props : cfg.growprops,
			    headline : headline
			});
		    } // end if
		} // end if
	    }); // end handler
	}
    };
} )(jQuery);


/*  slides down panel
    trigger: the clicked item
    panel: the thing you want to display
*/
SNI.Util.hideAndSlide = function(trigger,panel) {
    trigger = $(trigger);
    panel = $(panel);

    trigger.click(function () {
	panel.slideDown("fast");
	$('html, body').animate({
	    scrollTop: panel.offset().top-14
	}, 'slow');
	$(this).remove();
	return false;
    });

};

SNI.Util.Ellipsize = function(selector, max) {
    var dots = '...';
    var text = $(selector).html();

    if (text.length <= max) return text;
    var end = text.lastIndexOf(' ', (max - 3)); // Start by chopping off at the word before max
    if (end == -1) return text.substring(0, (max - 3)) + dots;     // Just one long word. Chop it off.
    
    var newEnd = end;
    while ((text.substring(0, newEnd) + dots).length < max) {
	end = newEnd;
	newEnd = text.indexOf(' ', end + 1);
	
	if (newEnd == -1) newEnd = text.length; // No more spaces.
    } 
    return text.substring(0, end) + dots;
};


$(function() {
    $('#carousel .crsl-item span.last').each(function() {
		$(this).html( SNI.Util.Ellipsize(this, 30) );
    });

    if ( ( mdManager.getParameterString("SctnName") == "HOME" ) || (mdManager.getParameterString("Type") == "MODULE" ) ) {
    		SNI.HGRM.Dynlead.init(".themed-lead");
    }
});