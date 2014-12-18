(function($) {

    var shareThis =
    /**
     * @lends SNI.IS.ShareThis
     */
    {
        /**
         * Intialize the ShareThis widget
         * @param config
         * @param type type of social widget to create
         * @description
         */
        init: function (config, type) {
            if (typeof shareThis.obj == 'object') {
                shareThis.load(config, type);
            } else {
                $.getScript(TWITTER_CONFIG.shareThisSrc, function() {
                    SHARETHIS.onReady();
                    shareThis.obj = SHARETHIS;
                    shareThis.load(config, type);
                });
            }
        },
        /**
         * loads a ShareThis button
         * @param config
         * @param type type of social widget to create
         */
        load: function (config, type) {
//            console.log("finish get script");

            var share_config = {
                title: config.tweet_msg,
                url: config.share_url
            };

            var shared_object = shareThis.obj.addEntry(share_config, {button:false, onmouseover:false});

            if(type == 'twitter') {
                shared_object.attachChicklet("twitter", $(config.element + " .chicklet")[0]);
            } else if(type == 'sharethis') {
                shared_object.attachButton($(config.element)[0]);
            } else if(type == 'facebook') {
                shared_object.attachChicklet("facebook", $(config.element + " .chicklet")[0]);
            }
        }
    };

    /**
     * @author <a href="htan@scrippsnetworks.com">Hao Tan</a>
     * @namespace SNI.IS.ShareThis
     */
    SNI.IS.ShareThis = shareThis;

    /**
     * Default configuration for Twitter sharing
     * @memeberOf SNI.IS.Twitter
     *
     */
    var TWITTER_CONFIG = {
        messages: {
            prefix: {
                DEFAULT: "",
                RECIPE: "Get the recipe:",
                COMPANY: "Get local info:",
                MENU: "Get the menu:",
                GALLERY: "Browse the photos:",
                CHANNEL: "Watch the video:",
                ARTICLE: "Read the article:"
            },
            via: "@FoodNetwork"
        },
        shareThisSrc: "http://w.sharethis.com/button/sharethis.js#publisher=87e14ce7-dc4d-40d2-ada1-38b20bfad22c&amp;type=website&amp;post_services=email%2Cfacebook%2Ctwitter%2Cgbuzz%2Cmyspace%2Cdigg%2Csms%2Cwindows_live%2Cdelicious%2Cstumbleupon%2Creddit%2Cgoogle_bmarks%2Clinkedin%2Cbebo%2Cybuzz%2Cblogger%2Cyahoo_bmarks%2Cmixx%2Ctechnorati%2Cfriendfeed%2Cpropeller%2Cwordpress%2Cnewsvine&amp;button=false"
    }


    var twitter =
    /**
     * @lends SNI.IS.Twitter
     */
    {
        /**
         * Create a Twitter share using the page configuration.
         * @deprecated Start using SNI.IS.Twitter.tweet instead
         * @author <a href="mailto:htan@scrippsnetworks.com">Hao Tan</a>
         * @param config
         */
        share: function (config) {

            $.extend(TWITTER_CONFIG, config);
            var $twitterContainer = $(config.element),
                page_title = mdManager.getPageTitle(),
                page_type = mdManager.getPageType(),
                prefix_msg;

			if (!TWITTER_CONFIG.messages.tweet_msg) {
				page_type = (mdManager.getParameterString('DelvFrmt').indexOf('GALLERY') > 1) ? "GALLERY" : page_type;
				prefix_msg = TWITTER_CONFIG.messages.prefix[page_type] || TWITTER_CONFIG.messages.prefix["DEFAULT"];
			}

            TWITTER_CONFIG.share_url = config.share_url || SNI.Util.Url.setParameter(document.location.href,"soc","share") || "";
            TWITTER_CONFIG.tweet_msg = TWITTER_CONFIG.messages.tweet_msg || prefix_msg + " " + page_title + " " + TWITTER_CONFIG.messages.via + ((TWITTER_CONFIG.messages.suffix) ? " " + TWITTER_CONFIG.messages.suffix : "");

            /* legacy ShareThis implementation, may need to change */
            $twitterContainer.append($('<a>').attr({'class' : 'chicklet', 'href' : '#', 'st_dest' : 'twitter.com'}).text('Tweet'));

            $twitterContainer.click(function(event) {
                event.preventDefault();
            });

            SNI.IS.ShareThis.init(TWITTER_CONFIG, 'twitter');
        },

        /**
         * Create a Twitter share button using the base Twitter API (rather than the ShareThis API in SNI.IS.Twitter.share)
         * @author <a href="mailto:mheisig@scrippsnetworks.com">Matt Heisig</a>
         * @param options
         */
        tweet: function (options) {
            SNI.IS.Twitter.load();

            var config = $.extend({
                element: options.element,
                url: options.url || window.location.href + "?soc=sharingtw",
                text: options.text || '',
                layout: options.layout || 'horizontal'
            }, options);

            var $el = $(config.element);
            var link = $('<a />', {
                'class': 'twitter-share-button',
                'data-lang': 'en',
                'data-url': config.url,
                'data-count': config.layout,
                'data-text': config.text
            });

            $el.append(link);
        },

        /**
         * @author <a href="mailto:mheisig@scrippsnetworks.com">Matt Heisig</a>
         * @param options
         */
        updateButton: function(options) {
            if (typeof(twttr) === 'undefined') {
                return;
            }

            var config = $.extend({
                element: options.element, // Needs to be the parent <LI> of the existing iframe
                url: options.url || window.location.href,
                text: options.text || ''
            }, options);

            var $el = $(config.element);
            var $iframe = $el.find('iframe').eq(0);

            if ($iframe.is('iframe')) {
                var baseUrl = $iframe.attr('src').split('&original_referer=')[0];

                $iframe.attr('src', baseUrl + '&text=' + config.text + '&url=' + config.url + "&soc=sharingtw");

                $el.empty().append($iframe);
            }
        },

        /**
         * @author <a href="mailto:mheisig@scrippsnetworks.com">Matt Heisig</a>
         */
        load: function() {
            if (typeof(twttr) === 'undefined') {
                !function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");
            }
        }
    };

    /**
     * @author <a href="mailto:htan@scrippsnetworks.com">Hao Tan</a>
     * @namespace Twitter sharing module
     * @description This Twitter sharing module leverages the ShareThis module to create a Twitter sharing button.
     * The shared message is prepended with the current site's page "category"
     */
    SNI.IS.Twitter = twitter;
})(jQuery);

