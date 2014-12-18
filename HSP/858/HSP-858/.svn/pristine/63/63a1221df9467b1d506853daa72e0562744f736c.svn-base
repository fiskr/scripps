/*
 * Common Widgets
 * this namespace will hold functions that can be referenced in multiple properties utilizing a common namespace
 *
 */

if( typeof(SNI.Common)=='undefined' ) {
	SNI.Common = {};
}


/*
 * Mobile Desktop Ribbon - show banner at the top of the page promoting mobile experience
 */
$(document).ready(function() {
    var mobileSize = false;
    var mobileRibbon = sessionStorage.getItem('mobileRibbon');

    // "check" if mobile device
    if ( SNI.HGTV.feCheckForMobileDevice() ) {
	mobileSize = true;
    }

    if (mobileSize && mobileRibbon != 'DoNotDisplay') {
	SNI.HGTV.showDesktopRibbon();
    } 
});

SNI.HGTV.showDesktopRibbon = function() {
    $('html body').prepend('<div id="dRibbonWrap">' +
			   '<a class="to-mobile" href="http://' + SNI.Config.domain + '?layout=mobile">Visit the Mobile Site</a>' +
			   '<a id="dRibbonX"></a>' +
			   '</div>');

    $('#dRibbonX').click(function() {
	$('#dRibbonWrap').remove();
	SNI.Util.Cookie.set('layout', 'desktop', null, '/');
	sessionStorage.setItem('mobileRibbon', 'DoNotDisplay');
    });

    $('#dRibbonWrap .to-mobile').click(function() {
	SNI.Util.Cookie.set('layout', 'mobile', null, '/');
    });
};

SNI.HGTV.feCheckForMobileDevice = function() {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

/*
 * Carousels
 *
 */
SNI.Common.Carousel = function(element, config) {

    config = $.extend({
        btnNext: element + " .next-btn",
        btnPrev: element + " .prev-btn",
        visible: 1,
        circular: false,
        displayPage : false,
        miniNav : false
    }, config);


    //swipe stuff -- using hammer.js, map swipe events to next/previous button clicks
    swipeForElement = function(el) {      
        if(!el.length) {console.log("el.length = 0"); return; }
        var hammer = new Hammer(el.get(0), {
        drag_min_distance: 0,
        drag_horizontal: true,
        drag_vertical: false,
        transform: false,
        hold: false,
        prevent_default: false
        });
        
        // ondragend we will fire next/prev photo click events
        hammer.ondragend = function(ev) {   
        if(ev.direction == 'right') {
            $(config.btnPrev).trigger('click');
        } else if(ev.direction == 'left') {
            $(config.btnNext).trigger('click');
        }
        }

        // ondrag we preview the next/prev slide
        hammer.ondrag = function(ev) {
        var left = 0;
        // determine which direction we need to show the preview
        if(ev.direction == 'left') {
            left = 0 - ev.distance;
        } else if(ev.direction == 'right') {
            left = ev.distance;
        }
        }
        
    }

    SNI.Common.Carousel.swipe = function() {
        /* Set-up Hammer -- swiping grid should trigger next/previous pagination clicks */
        swipeForElement($(element));
    }

    //load hammer.js if device has touch support
   if ( SNI.HGTV.hasTouch() ) {
        SNI.HGTV.loadMobileJS(SNI.Common.Carousel.swipe);
    }


    return $(element + ' .crsl-wrap').jCarouselLite({
        btnNext: config.btnNext,
        btnPrev: config.btnPrev,
        visible: config.visible,
        circular: config.circular,
        scroll: config.visible,
        displayPage: (config.displayPage),
        btnNavigation : (config.displayPage) ? false : true,
        miniNav: config.miniNav,
        container : element,
        mouseWheel: true
    });


};

SNI.Common.LeadCarousel = function(element, config) {

	/*	
	The values below are customized for the lead carousel module.  To customize for other modules, pass in a config object.
	For example, to turn off the infinite loop option: SNI.Common.LeadCarousel('#lead-carousel',{loop:false});
	*/

    config = $.extend({ //
    		addActiveClass: true,
			arrowsNav: true, //was false
			controlNavigation: 'none',
			imageScaleMode: 'none',
			imageScalePadding: 0,
			slidesSpacing: 4,
			minSlideOffset: 0,
			autoScaleSlider: false, //was true
			autoScaleSliderWidth: 60, //was 960    
			autoScaleSliderHeight: 340,
			loop: true,
			fadeinLoadedSlide: false,
			globalCaption: false,
			keyboardNavEnabled: true,
			globalCaptionInside: false,
			imgWidth: 400,
			imgHeight: 300,
			sliderDrag: true,
			navigateByClick: false,
						
			visibleNearby: {
				enabled: true,
				centerArea: 0.86,
				center: true,
				breakpoint: 0, //was 650
				breakpointCenterArea: 0.66,
				navigateByCenterClick: false //was true
			},
			autoPlay: {
    		
    			enabled: true,
    			pauseOnHover: true,
    			delay: 5500
			}
    }, config);
    
    //because having 4 or fewer panels causes flicker -- e.g., for 3 panels the left slide becomes the right slide at the end of the animation --
    // a hack that works is to clone all the panels

    var $panels = $(element).children();
    if($panels.size() <= 4) $panels.clone().appendTo($(element)); 

    return (function() {
    	
    					 $el=$(element);
    					 $el.show();
						  var si = $el.royalSlider({
						  	addActiveClass: config.addActiveClass,
						    arrowsNav: config.arrowsNav, //was false
						    controlNavigation: config.controlNavigation,
							imageScaleMode: config.imageScaleMode,
							imageScalePadding: config.imageScalePadding,
							slidesSpacing: config.slidesSpacing,
							minSlideOffset: config.minSlideOffset,
						    autoScaleSlider: config.autoScaleSlider, 
						    autoScaleSliderWidth: config.autoScaleSliderWidth,    
						    autoScaleSliderHeight: config.autoScaleSliderHeight,
						    loop: config.loop,
						    fadeinLoadedSlide: config.fadeinLoadedSlide,
						    globalCaption: config.globalCaption,
						    keyboardNavEnabled: config.keyboardNavEnabled,
						    globalCaptionInside: config.globalCaptionInside,
							imgWidth: config.imgWidth,
							imgHeight: config.imgHeight,
							sliderDrag: config.sliderDrag,
							navigateByClick: config.navigateByClick,
						
						    visibleNearby: config.visibleNearby,
						    autoPlay: config.autoPlay
						    
						  });
						  $el.removeData(); 
						})();

};

/*
 * Accordions
 *
 */
SNI.Common.Accordion = function(element, config){
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
	
	// fix broken link issue on On HGTV Module -- accordion plug in disables link if embedded in header section
	if (element === "#on-hgtv .acco") {
		$('.tvschedule .acco-link a').click(function() {
            window.location.href = this.href;
            return true;
        });		
	}

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
	var tabs = $(element).tabs(config);

	// force some CSS to center the tabs when true
    //dont need this now but maybe later
    /*	if (config.forcePositionCenter) {
		var nav = tabs.data('tabs').element;
		var navWidth = 0;

		// get the width of each tab
		nav.children().each(function() {
			navWidth += $(this).outerWidth({ margin: true });
		});

		// force the left margin to center the tabs
		var marginLeft = Math.round((nav.width() / 2.0) - (navWidth / 2.0));
		nav.css({position: 'absolute', 'margin-left': marginLeft, zoom: '1'});
	}*/
};


SNI.HGTV.Medialibrary = function(element, o) {
	o = $.extend({
				crslLoad: null,
				crslAttr: "data-crsl-loaded",
				crslClass: ".crsl",
				crslVisible: null
			}, o);

    if (o.crslLoad) {
        $(o.crslLoad).show();
        SNI.Common.Carousel(o.crslLoad, {visible:o.crslVisible});
        $(o.crslLoad).closest('h4').attr(o.crslAttr,'true');
    }

	// prime the toggles for the video channel carousels
	togglelist = $(element).find('li.switch');
	togglelist.each(function(){

		var $this = $(this);
        var crsl = $this.find('.crsl').attr('id');
        
		// click target for li toggle
		var target = $this.find("h4");

		// hide carousel if active class not present
		if (!$this.hasClass("active")) {
			$this.find(o.crslClass).slideUp();
            target.attr(o.crslAttr, 'false');
		} else {
            target.attr(o.crslAttr, 'true');
        }
        
		target.click(function(){
			if ($this.hasClass("active")) {
				$this.removeClass("active");
				$this.find(o.crslClass).slideUp(250);
			} else {
				$this.addClass("active");
				$this.find(o.crslClass).slideDown(250);

                var load = $(this).attr(o.crslAttr);

                if (load == 'false') {
                    SNI.Common.Carousel('#'+crsl, {visible:o.crslVisible});
                    target.attr(o.crslAttr,'true');
                    //console.log('load carousel');
                }
			}
		});
	});
};

if (typeof (SNI.HGTV.ProgramGuide) == 'undefined') {
    SNI.HGTV.ProgramGuide = {};
}

SNI.HGTV.ProgramGuide = {
    getOnTvNow: function() {
        var ontvid = '#hgtv-ontv',
	d = new Date(),
	m = (d.getUTCMinutes()<30) ? '00' : '30';

	$.ajax({
            dataType: 'json',
	    url: '/hgtv/feeds/ontv/0,,HGTV_' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + '-' + d.getUTCFullYear()+ '_' + d.getHours() + ':' + m + ',00.html',
	    success: function(data) {
                if (data) {
                    if (data.onair) {
                        $(ontvid + ' .show.now .show-info').html('<a title="' + data.onair.title + '" href="' + data.onair.url + '">' + data.onair.title + '</a>');
                    } else {
                        $(ontvid + ' .show.now').hide();
                    }

                    if (data.tonight) {
                        $(ontvid + ' .show.tonight .time').html(data.tonight.time);
                        $(ontvid + ' .show.tonight .day-time').html(data.tonight.amorpm);
                        $(ontvid + ' .show.tonight .show-info').html('<a title="' + data.tonight.title + '" href="' + data.tonight.url + '">' + data.tonight.title + '</a>');
                    } else {
                        $(ontvid + ' .show.tonight').hide();
                    }
                }
                SNI.HGTV.Omniture.ClickTrack(ontvid, 'On Tv');
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //hide 'now' and 'tonight' since those would be blank
                $(ontvid + ' .show.now').hide();
                $(ontvid + ' .show.tonight').hide();
            }
	});
    }
};


