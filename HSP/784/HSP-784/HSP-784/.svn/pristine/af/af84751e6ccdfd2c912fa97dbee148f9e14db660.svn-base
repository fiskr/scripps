SNI.HGRM.TheaterModules = SNI.HGRM.TheaterModules || {};

SNI.HGRM.adjustFrameWrapperHeight = function(h) { //this function is called from the iframe to adjust the height of the iframe wrapper
    $('#overlay-inner').animate({height: h}, 250);
};
 
SNI.HGRM.TheaterModules = (function($) {
    return {	
		fill : function(cfg) {
			
		var DEFAULT_CONFIG = {
			inlineVideo: 0,
			inner : $('#overlay-content'),
			item_info : '', // used to import info for particular inline gallery via AJAX if necessary
			btn_close : $('<span />', {
			    'class' : 'modal-btn modal-btn-close',
			    html : 'close x'
			}),
			contentInnerHeight : 630
	    },
	    
	    iframe = $('<iframe />', {
			id: 'photo-gal-frame',
			css : {
				border : '0 none',
				width : '994px',
				height : '100%',
				display : 'none',
				background: '#242424'
			},
		   overflow : 'hidden',
		   frameborder : '0',
		   scrolling : 'no'
		}),
	    
		// template for .overlay-content-inner #overlay-inner
		contentInnerTemplate = [
		
			'<div class="overlay-content-inner" id="overlay-inner" style="height:'+ DEFAULT_CONFIG.contentInnerHeight +'px">',
				'<div class="box close inline">',
					'<div class="hd">',
						'<em>Close</em><span></span>',
					'</div>',
				'</div>',
			'</div>'
		],
		
	    n = $('<div />').prepend(contentInnerTemplate.join('')).find("div").eq(0).append(iframe);
	
	    // when iframe loads, remomve spinner and display iframe
	    iframe.load(function() {
			$('#overlay-inner').addClass('loaded');
			iframe.css('display','inline');
			
			if (cfg.inlineVideo) {
			    var inlineVideoIframe = document.getElementById('photo-gal-frame');
			    inlineVideoIframe.contentWindow.SNI.HGRM.TravelingLib.instantiateInlineSnapPlayer();
			    inlineVideoIframe.contentWindow.SNI.Common.Carousel('#carousel', {visible:5});
			    inlineVideoIframe.contentWindow.SNI.HGRM.TravelingLib.wireInlinePlayerCarouselLinks();
			}
			$('#photo-gal-frame').contents().find('html').css('background-color','#242424');
			
/*			iframe.fadeIn(500, function(){
			    setTimeout(function(){
					var _height = $("#photo-gal-frame").height();
					SNI.HGRM.adjustFrameWrapperHeight(_height + 45);
			    }, 500);
			}); */ //temporarily commenting this out			
	    });

	    cfg = $.extend(DEFAULT_CONFIG, cfg);
	    iframe.attr('src', cfg.url);
				
	    // check if cached content should be displayed or new content should be injected
	    // needs to be refined a bit in to address situations with multiple inline galleries on the page
	    if (SNI.Util.overlay.contents !== 'gallery') {
			cfg.inner.html('').prepend(n);
			$('#overlay-content')
				.css('position', 'absolute')
				.show()
				.find('div:first')
				.fadeIn('fast', function(){
					SNI.Util.overlay.contents = 'gallery';
				});
	    }
	    else {
		    cfg.inner.fadeIn('fast'); 
	    }
	    
	}, // end SNI.HGRM.TheaterModules.fill

	/*
	Method to initialize dynamic overlay-associated functionality for modules
	* @param {Object} config Configurations to convey which modules should be associated
	$(clickables): node collection of modules
	url: URL of i-framed component within theater
	*/
	init: function(cfg) {

	    var DEFAULT_CONFIG = {                                              
		clickables : $('a.gal-btn'),
		offset:0,
		inlineVideo:0,
		scroll_headline_into_view : function(cfg){
		    var doc = $('html,body');
		    doc.animate({scrollTop: cfg.headline.offset().top - cfg.special_offset}, 750);
		}		    
	    };
	    if (cfg.url.match(/inline_channel/g)) cfg.inlineVideo = 1; 
	    var cfg = $.extend(DEFAULT_CONFIG, cfg);
 
	    var module_bd = cfg.clickables.closest('div.bd'),
	    pod_headline = cfg.clickables.parent().prev('h4'),
	    strip_headline = module_bd.find('h5:first');
	    // adding the "view # photos/videos" text link click handling as well
	    // may make more sense to bind an event handler to the parent, 
	    // though that would defeat the purpose of anchor tags in the first place
	    cfg.clickables.parent().find('a').bind('click', function(evt) {
		// open overlay
		evt.stopPropagation();
		evt.preventDefault();  
		
		// presently, there are only two variants for this type of functionality
		// if these grow, this code block will likely need to change to something more scalable
		// life is too short :(
		// determine whether we are dealing with a pod, or an image strip
		// now, then...are we in a pod?
		if(pod_headline.length > 0){
		    cfg.offset = $(pod_headline).offset().top;
		    cfg.scroll_headline_into_view({
			headline : pod_headline,
			special_offset : 14
		    });

		} else if (strip_headline.length > 0) { // then we must be in an image strip! maybe?
		    cfg.offset = $(strip_headline).offset().top;
		    cfg.scroll_headline_into_view({
			headline : strip_headline,
			special_offset : 20
		    });
		
		} else { 
		    cfg.offset = $(module_bd).offset().top; 
		    cfg.scroll_headline_into_view({
			headline : module_bd,
			special_offset : 20
		    });
		}
		
		SNI.Util.overlay.open(cfg);
	    });
	} // end SNI.HGRM.TheaterModules.init
    };
})(jQuery);