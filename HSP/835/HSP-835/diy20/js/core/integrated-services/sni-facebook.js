if (typeof SNI === 'undefined') {
    SNI = {}
}
if (SNI.IS === undefined) {
    SNI.IS = {}
}

/**
 * @author <a href="mailto:reilam@scrippsnetworks.com">Rob Eilam</a>
 * @namespace FaceBook module that contains common Facebook related functionality
 * @param {jQuery | Object} $ representation of the jQuery object
 */
SNI.IS.FB = (function($) {

    var methods = function() {
        
        var m = this;

        // private methods for setup with public flags for have-run status
        /* Updated JavaScript SDK and OAuth 2.0 Roadmap	http://developers.facebook.com/blog/post/525/	 */
        m.parmsDone = false;
        
        function setAsyncParms() {
            if (!m.parmsDone) {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: SNI.Config.FB.AppID || null, //'#',
                        status: true,
                        cookie: true,
                        xfbml: true,
                        channelUrl: SNI.Config.FB.ChannelUrl, //value located in sni-config
                        oauth : true
                    });
                };
                m.parmsDone = true;
            }
        }

        m.allJSDone = false;
        function insertAllJS() {
            if (!m.allJSDone) {
                $("body").prepend('<div id="fb-root"></div>');
                var e = document.createElement('script');
                e.async = true;
                e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
                // no good, jQ does something odd: $("#fb-root").append(e);
                document.getElementById("fb-root").appendChild(e)
                m.allJSDone = true;
            }
        }

        /**
         * @name SNI.IS.FB.share
         * @function
         * @description skeleton function to hold future functionality for facebook share
         */
        m.share = function() {
        };
        /**
         * @name SNI.IS.FB.init
         * @function
         * @description prepares Asynchronous request and get all JS via Async
         *
         */
        m.init = function() {
            setAsyncParms();
            insertAllJS();
        }
        /**
         * @name SNI.IS.FB.send
         * @function
         * @description skeleton function to hold future functionality for facebook send
         */

        m.send = function() {
        };
        /**
         * @name SNI.IS.FB.recommend
         * @function
         * @description skeleton function to hold future functionality for facebook recommend
         */

        m.recommend = function() {
        };
        /**
         * @author <a href="mailto:reilam@scrippsnetworks.com">Rob Eilam</a>
         * @name SNI.IS.FB.like
         * @function
         * @description Like a page to user's Facebook
         * @param {object} options configuration object to override the default values set by "settings".
         * please see site level configuration before overriding
         * @example
         * // Here we are passing in the DOM element as an argument that will
         * // receive the FB Like button injection as XFBML when rendered in the browser.
         * // (The like button will appear inside of "#tb-facebook")
         * SNI.Food.IS.FB.like({element: "#tb-facebook"});

         */
        m.like = function(options) {
            var settings = {
                'layout':'button_count',
                'show_faces':'true',
                'width' : '50',
                'action':'like',
                'font':'trebuchet ms',
                'colorscheme':'light'
            };

            var $likeButton;

            if (options) {
                $.extend(settings, options);
            }
            $likeButton = $(settings.element);
            // $likeButton.removeClass("fb-like");
            var like = '<fb:like ref="fb:like" layout="' + settings.layout + '"show_faces="' + settings.show_faces + '"width="' + settings.width + '"action="' + settings.action + '"font="' + settings.font + '"colorscheme="' + settings.colorscheme + '"class="fb_edge_widget_with_comment fb_iframe_widget"></fb:like><span id="fb-root"></span>';
            var targetElement = $likeButton.attr("id");
            var fbid = document.getElementById(targetElement);
            $likeButton.buttonId = fbid;

            //Inject button into target element
            fbid.innerHTML = like;

            m.init();

        }; //End Like Method
        /**
         * @name SNI.IS.FB.login
         * @function
         * @description log a user into their Facebook account
         */
        m.login = function(options) {
            m.init();
            this.FBLoginHandler = function(response) {
                // if (typeof console === "object" ) { console.log("FB log in: handling response") }
                if (response.authResponse) {
                    // user is logged in and granted some permissions.
                    // if (typeof console === "object" ) { console.log("FB log in: user logged and accepted extended permissions.") }
                    var fb_accesstoken = response.authResponse.accessToken;
                    var url = 'http://' + SNI.Config.Community.ur3Domain + '/sync.jsp?';
                    var params = 'operation=checkifalreadysynced&epallowed=true&cb=SNI.IS.FB.afterFBLogin&access_token=' + fb_accesstoken;
                    $.getScript(url + params, function() {
                    });
                } else {
                    // user is not logged in
                    // if (typeof console === "object" ) { console.log("User cancelled login or did not fully authorize.") }
                }
            }

            var settings = {
                selector: "#fb-login",
                perms: {scope: 'read_stream,publish_stream'},
                FBLoginHandler : this.FBLoginHandler
            };
            if (options) {
                $.extend(settings, options);
            }

            // attach login handler to user control
            $(settings.selector).click(function() {
                FB.login(settings.FBLoginHandler, settings.perms);
                return false;
            });
        };
        /**
         * @name SNI.IS.FB.afterFBLogin
         * @function
         * @description {fill me in Rob}
         */
        m.afterFBLogin = function(obj) {
            //	if (typeof console === "object" ) { console.log("Inside afterFBLogin") }
            var fbSynced = obj.fbSynced;
            var isepallowed = obj.isepallowed;

            //get the access_token
            var access_token;
            FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                    // logged in and connected user, someone you know
                    access_token = response.authResponse.accessToken;
                } else {
                    // no user session available, someone you dont know
                }
            });

            if (fbSynced == "false") {
                //the user has not yet synced with fb/ur3
                // if (typeof console === "object" ) { console.log("Redirect the user to register_lite.esi") }
                document.location = "http://" + SNI.Config.Community.ur3Domain + "/registration/register_lite.esi?mode=fb&access_token=" + access_token + "&epallowed=" + isepallowed;
                return;
            } else {
                // take them to sync.jsp on the secure domain...from here we will need to log them in
                // if (typeof console === "object" ) { console.log("Redirect the user to sync.jsp") }
                window.location = "http://" + SNI.Config.Community.ur3Domain + "/sync.jsp?operation=login&epallowed=" + isepallowed + "&access_token=" + access_token;
                return;
            }
        };

        /**
         * Update existing FB Like button asynchronously
         * @param options
         */
        m.updateButton = function(options) {
            if (typeof(fbAsyncInit) === 'undefined') {
                return;
            }

            var $iframe = $(options.element).eq(0);

            if ($iframe.is('iframe')) {
                var preUrl = $iframe.attr('src').split('&href=')[0],
                    likeUrl = $iframe.attr('src').split('&href=')[1].split('&layout=')[0],
                    postUrl = $iframe.attr('src').split('&href=')[1].split('&layout=')[1];

                likeUrl = "&href=" + options.url;
                $iframe.attr('src', preUrl + likeUrl + '&layout=' + postUrl);
            }
        }

    }; //End All Methods

    return new methods();

    /*
     $.fn.FB = function(config) {

     var DEFAULT_CONFIGS = {
     action : ''
     };

     config = $.extend(DEFAULT_CONFIGS, config);

     // Method calling logic
     if (methods[config.action]) {
     return methods[ config.action ].apply(this, Array.prototype.slice.call(arguments));
     } else if (typeof config.action === 'object' || ! method) {
     return methods.init.apply(this, arguments);
     } else {
     alert('Sorry Action ' + config.action + ' does not exist in the FB plugin');
     }

     };
     */
})(jQuery);
