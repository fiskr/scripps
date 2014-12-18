var SNI = SNI || {};
SNI.TP = SNI.TP || {};
SNI.TP.settings = SNI.TP.settings || {};

SNI.TP.util = {                                                                                                
	injectscript : function(url){
		$.ajax({url: url, 
			dataType: 'script',
			cache: true,
			timeout: 5000});
	}
};

SNI.TP.social = {
    FBLike: function (cfg) {
        cfg = cfg || {};
        cfg.url = (cfg.url || $('meta[property="og:url"]').attr('content')) || window.location.href.replace(/\?(?:.)*/g, '')+'?soc=sharingfb'; // URL to like can be specified or is the og canonical URL by default, falling back to native dom
        cfg.style = cfg.style || 'button_count'; // like button style is either specified or standard by default
        cfg.dest = cfg.dest || '#diy-w'; // node to be used for injection
        cfg.width = cfg.width || 200;
        cfg.height = cfg.height || 81;
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
		var urlMeta = $('meta[property="og:url"]'),
			current_page = ( urlMeta.length > 0 ) ? urlMeta.attr('content').replace(/\?(?:.)*/g, '') :   window.location.href.replace(/\?(?:.)*/g, '')+'?soc=sharingtw',
        	widget = $('<a />'),
            default_attrs = {
                'class': 'twitter-share-button',
                'href': 'http://twitter.com/share',
                'data-url': current_page,
                'data-text': '',
                'data-counturl': current_page,
                'data-count': 'vertical',
                'data-via': 'DIYNetwork'
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