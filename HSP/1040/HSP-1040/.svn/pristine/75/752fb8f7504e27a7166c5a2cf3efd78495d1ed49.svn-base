/* This file is a place for various module code to live */

SNI.HGTV.loadMobileJS = function(callbackFunc) {
    var url = (SNI.Config.env === 'prod') ? 'http://hgtv.sndimg.com/webhgtv/hg20/js/hammer.js' : 'http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/hammer.js';
    
    jQuery.ajax({
	url: url,
	dataType: 'script',
	success: function(data) {
	    if ( typeof callbackFunc === 'function') callbackFunc();
	}
    });
}


SNI.HGTV.hasTouch = function () {
    if (typeof (SNI.HGTV.hasTouchSupport) === 'undefined') {
    
	SNI.HGTV.hasTouchSupport = false;

	if( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            SNI.HGTV.hasTouchSupport = true;
	}
    }
    return SNI.HGTV.hasTouchSupport;
}
SNI.HGTV.hasTouch();

SNI.HGTV.Hosts = {
    init: function() {
	$('#hgtv-hosts select').dropdown();
	$('#hgtv-hosts select').change(function() {
	    location.href = $(this).val();
	});	
    }
};
$(document).ready(function () {

    /*
        Swap location of ad and right rail module on rooms pages to comply with IAB 545 -- done on the FE to preserve SEO placement
    */
    var rrMod = $('body#rooms #hg-e .sf-inside');
    if(rrMod){ $('body#rooms #hg-e .mrec').after(rrMod); }

    /*
      Outbrain Module Module - it ajax-es in a module with related content
     */
    var outbrain_selector = '.outbrain-widget'
    var outbrain_module = $(outbrain_selector);
    if (outbrain_module.length > 0) {
	var firstPageUrl = mdManager.getParameter('PageOneUrl');
	if (! firstPageUrl) {
	    firstPageUrl = window.location.pathname.replace(/\/page-[0-9]\.html$/gi, '/index.html');
	}

	outbrain_module.attr('data-src', 'http://www.hgtv.com' + firstPageUrl);
	$.getScript('http://widgets.outbrain.com/outbrain.js');
	SNI.HGTV.Omniture.OutbrainClickTrack(outbrain_selector, 'HGTV : Outbrain');
    }

    SNI.HGTV.misc = {
	init: function() {
	    $('div.gallery-tease a:last-child img').css({'margin-right' : '0px'});
	    $('div.gallery-tease a.gallery-link').css({'width' : '97px'});
	}
    };
    SNI.HGTV.misc.init();

    SNI.HGTV.bindViewMoreEventOnGalleries = function() {

        //dynamic content grid - 'Get Inspired by DIY' $module
        var $module = $('#hg-w .pods.get-inspired, #hg-w .featured');

        if ($module.length) {
            $module.find("a.load-more").click(function (e) {

	    e.preventDefault();

                var $this = $(this),
                    $hidden = $module.find(".more-hidden:eq(0)"),
                    t,
                    u,
                    $left_hidden;

                if ($hidden.length) {
                    $hidden.show(250).removeClass("more-hidden");

                    t = setTimeout(function () { $hidden.spinner(); }, 250);
                    u = setTimeout(function () {
                        $hidden.spinner("remove");
                        $hidden.children().show();
                    }, 750);

                    $left_hidden = $module.find(".more-hidden");

                    if ($left_hidden.length === 0) { $this.hide(250); }
                }
        });
    }
    }

    SNI.HGTV.bindViewMoreEventOnGalleries();

    SNI.HGTV.highlightHubTab = function() {
	var hubs = $('.hub.clrfix .button-nav');
	if (hubs.length <=  0) return;

		var hub_links = hubs.find('li a');
	        page_url = mdManager.getParameter('Url').replace(/\/(index|page-\d).html/gi, '');

	$.each(hub_links, function(index, key) {
	    var hub_url = $(this).attr('href').replace('/index.html', '');
		    if (hub_url.match(RegExp(page_url+'$','g'))) {
		    	hub_links.removeClass('selected');
				$(this).addClass('selected');	
				return;	
		    }
        });
    }
    SNI.HGTV.highlightHubTab();

});


SNI.HGTV.showHide = function(element, showText, hideText) {
    var target = $(element).find(".toggle");
    target.click(function () {
	$(".toggle-bd").slideToggle("slow");
	var toggleValue = target.text();
	if (toggleValue === showText) {
	    target.html(hideText);
	} else {
	    target.html(showText);
	}
    });
};	

/* join the conversation right rail module -- based on code from FN by Matt Ford */
if (!SNI.TP) {
	SNI.TP = {};
}

SNI.TP.util = {                                                                                                
	injectscript : function(url){
		$.ajax({url: url, 
			dataType: 'script',
			cache: true,
			timeout: 5000});
	},//end injectscript
	isPackage: function(){
		if( $('body').hasClass('package') ){
			return true;
		}
		else{
			return false;
		}
	}
};

SNI.TP.social = {
    FBLike: function (cfg) {
        cfg = cfg || {};
        cfg.url = (cfg.url || $('meta[property="og:url"]').attr('content')) || window.location.href.replace(/\?(?:.)*/g, ''); // URL to like can be specified or is the og canonical URL by default, falling back to native dom
        cfg.style = cfg.style || 'button_count'; // like button style is either specified or standard by default
        cfg.dest = cfg.dest || '#hg-w'; // node to be used for injection
        cfg.width = cfg.width || 200;
        cfg.height = cfg.height || 65;
        cfg.injectionMethod = cfg.injectionMethod || 'prepend'; // jQuery injection method to be used
        cfg.wrapper = cfg.wrapper || $('<span />', {id: 'fb-like'}); // wrapper of include code to be used

        var embedcode = {
                standard: '<iframe src="http://www.facebook.com/plugins/like.php?href=' + cfg.url + '&amp;send=true&amp;layout=standard&amp;width=' + cfg.width + '&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=' + cfg.height + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:' + cfg.width + 'px; height:' + cfg.height + 'px;" allowTransparency="true"></iframe>',
                button_count: '<iframe src="http://www.facebook.com/plugins/like.php?href=' + cfg.url + '&amp;send=true&amp;layout=button_count&amp;width=' + cfg.width + '&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=' + cfg.height + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:' + cfg.width + 'px; height:' + cfg.height + 'px;" allowTransparency="true"></iframe>',
                box_count: '<iframe src="http://www.facebook.com/plugins/like.php?href=' + cfg.url + '&amp;send=false&amp;layout=box_count&amp;width=' + cfg.width + '&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=' + cfg.height + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:' + cfg.width + 'px; height:' + cfg.height + 'px;" allowTransparency="true"></iframe>'
            },
            getembedcode = function (type) {
                return embedcode[type];
            };

        // convert string to jquery object
        cfg.dest = $(cfg.dest);
        // call injection method on jquery node to insert FB like markup
        cfg.dest[cfg.injectionMethod](
            function (stuff) {
                cfg.wrapper.html(
                    function () {
                        return getembedcode(cfg.style);
                    }
                );

                return cfg.wrapper;
            }
        );
    },

    TWShare: function (cfg) {
        var current_page = $('meta[property="og:url"]').attr('content') || window.location.href.replace(/\?(?:.)*/g, ''),
            widget = $('<a />'),
            default_attrs = {
                'class': 'twitter-share-button',
                'href': 'http://twitter.com/share',
                'data-url': current_page,
                'data-text': '',
                'data-counturl': current_page,
                'data-count': 'vertical',
                'data-via': 'hgtv'
            },
            prop;

        cfg = cfg || {};
        cfg.JS = cfg.JS || 'http://platform.twitter.com/widgets.js';
        cfg.injectionMethod = cfg.injectionMethod || 'prepend';
        cfg.attrs = $.extend({}, default_attrs, cfg.attrs);
        cfg.dest = cfg.dest || $('#tweet-anywhere-e');


        //deprecate the hardcoded message to the metadata manager-set twitter message, if set
        if (mdManager.getParameter('TwitterMsg')) {
            cfg.attrs = $.extend(cfg.attrs, {'data-text': mdManager.getParameter('TwitterMsg') });
        }

        //apply properties to the widget object from the config object
        for (prop in cfg.attrs) {
            widget.attr(prop, cfg.attrs[prop]);
        }

        widget.attr('data-text', function () {
            return $(this).attr('data-text');
        });

        // call injection method on jquery node to insert FB like markup at specified destination
        cfg.dest[cfg.injectionMethod](widget);

        //inject the script that iterates over a.twitter-share-button and replaces with twitter buttons
        SNI.TP.util.injectscript(cfg.JS);
    }
};