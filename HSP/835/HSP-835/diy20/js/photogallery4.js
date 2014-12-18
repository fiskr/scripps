(function($){

    // added polyfill for indexOf on the Array object
    if (!Array.indexOf) {
      Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
          if (this[i] == obj) {
            return i;
          };
        };
        return -1;
      };
    };

    //TODO: replace HGTV images.  Can't find the diy versions right now
    var DEFAULT_CONFIG = {
          'gallery_title'            : ''
        , 'current_index'            : 0
        , 'default_product_image_sm' : 'http://www.diynetwork.com/webdiy/diy20/imgs/se/product_unavailable_sm.jpg'
        , 'default_product_image_lg' : 'http://www.diynetwork.com/webdiy/diy20/imgs/se/product_unavailable_al.jpg'
        , 'images'                   : null
        , 'num_images'               : 0
    };

    /* A photo gallery with a few methods to traverse through an array of photos
     * @constructor
     * @param {Object|String} element DOM reference or jQuery selector string to initialize photo gallery functionality
     * @param {Object} config Configuration for photo gallery settings
     * @return PhotoGallery
     */
    SNI.DIY.PhotoGallery4 = function (element, config) {

        for(var prop in DEFAULT_CONFIG) {
            if(!config.hasOwnProperty(prop)){
                config[prop] = DEFAULT_CONFIG[prop];
            }
        };

        config.images = config.images || imageData;

        var gallery = this,
        gallery_element,
        count_text,
        photo_display,
        thumbnails_button,
        thumbnails_frame,
        next_button,
        previous_button,
        ad_unit,
        photo_area_wrapper,
        photo_author,
        caption_head,
        caption,
        toggler,
        template_element,
        hsproduct_wrapper,
        ymal,
        ymal_list,
        current_index,
        print_link,
        loader_img             = new Image(),
        default_product_img_sm = new Image(),
        default_product_img_lg = new Image(),
        inter_next             = false,
        inter_refreshed        = true,
        dyn_load_origin        = '',
        num_images             = config['num_images'],
        next_gallery_index     = 0,
        mediastream            = true,
        on_initial_load        = true,
        cookies                = SNI.Util.Cookie,
        prevUrls               = [];

        if(num_images < 1 || typeof ymal_next == 'undefined' || ymal_next.length == 0 || !ymal_next[0].delvFrmt){
            mediastream = false;
            if (num_images < 1) num_images = +$('.pg-photo-count p span.total').text();
            $('.pg-endframe').hide();
        }

        if (mediastream) next_gallery_index = getNextGalleryIndex();

		clean_url = 'http://www.diynetwork.com' + window.location.pathname;
		var photo_title = $('.intro h1').html();
		SNI.DIY.Toolbar.addPintrestShare('#tb-pinit', $('.pg-photo-display-wrapper').eq(0).find('img').attr('src'), photo_title + ": " + " From DIYNetwork.com");
		SNI.DIY.Toolbar.addFacebookShare('#tb-facebook');
		SNI.DIY.Toolbar.addGooglePlusShare('#tb-gplus');

 		//SNI.DIY.Toolbar.addStumbleUponShare('#tb-su');
 		//SNI.DIY.Toolbar.addShareThis('#tb-sharethis');

		SNI.IS.Twitter.tweet({
					'element': '#tb-twitter',
		        	'url': clean_url + '?soc=sharingtw',
		        	'text': photo_title + " - See more inspiration like this at DIYNetwork.com."
		});
		//SNI.DIY.Toolbar.addShareThis("See more inspiration like this at DIYNetwork.com");

        /**
         * @returns {String} provides url for AJAX request to get the next gallery data.
         * @param section_id Photo gallery section id.
         * @param asset_id Photo gallery asset id.
         */
        function getGalleryDataUrl(section_id, asset_id) {
            var asset_section = section_id + '__' + asset_id;
            return '/diy/cda/modules/articleMetadata/0,,ARTICLE-DETAIL_DIY_' + asset_section + '_ARTICLE-DETAIL_no_,00.html';
        }

        /**
         * @param url The url used to get the data [via AJAX] for a gallery
         */
        function updateHistoryNext(section_id, asset_id){
            //should only do this on Next Gallery click
            prevUrls.push(section_id + '__' + asset_id);

            if(typeof(Storage) !== 'undefined'){
                sessionStorage['prevUrls'] = JSON.stringify(prevUrls);
            } else {
                //limit max cookie size by limiting history to 100 visited galleries ~ 1500 chars
                if (prevUrls.length > 100) prevUrls.splice(0,1);
                cookies.set('userHistory', prevUrls.join(','), undefined, '/');
            }
        }

        /**
         * @returns {String} Tthe url used to get the data [via AJAX] of the previously visited gallery
         */
        function updateHistoryPrev(){
            var asset_ids = prevUrls.pop().split('__');
            if(typeof(Storage) !== 'undefined') {
                sessionStorage['prevUrls'] = JSON.stringify(prevUrls);
            } else {
                cookies.set('userHistory', prevUrls.join(','), undefined, '/');
            };

            return getGalleryDataUrl(asset_ids[0], asset_ids[1]);
        }

        function hideNextGalleryTitleOverlay() {
            $('#pg-next-title').hide();
        }

        /**
         * @returns {Integer} Provides the index of the "ymal_next" array of objects for the next gallery to visit
         */
        function getNextGalleryIndex() {
            var i = 0,
            safe_index = -1;

            for (i; i < ymal_next.length; i++) {
                if (ymal_next[i].delvFrmt != 'ARTICLE_BUILDER_PHOTOGALLERY') continue; //old gallery, skip
                next_gall_url = ymal_next[i].sectionId + '__' + ymal_next[i].assetId;
                safe_index = i;

                if (prevUrls.length == 0 || prevUrls.indexOf(next_gall_url) == -1 ) break;
            }

            if (i == ymal_next.length) return safe_index;

            return i;
        }

        /**
         * Removes Omniure referrer value
         */
        function removeOmniReferrer() {
          if (typeof(s) != 'undefined') s.referrer = '';
        };

        /*
         * Omniture tracking when photo loads
         * @param i Intereger that gets appended to updated Omniture values
         */
        function doDynOmni(i) {
            ++i;
            var omniVars = new Object();

            if (mdManager.getParameterString("oUrl") === "") {
                mdManager.setParameter("oUrl", mdManager.getParameterString("Url"));
            }

            mdManager.setParameter("Url", mdManager.getParameter("oUrl") + "?i=" + i);

            if (i < 10) {
                i = "0" + i;
            }

            mdManager.setParameter("UniqueId", mdManager.getParameterString("UniqueId").replace(/(.*?)-([0-9]{1,2})$/, '$1-' + i));

            if (typeof s === "object") {
                if (dyn_load_origin !== "") {
                    omniVars.prop26 = "DIY : Photo Gallery : " + config.gallery_title + " : " + dyn_load_origin;

                    //add gallery number, unless Next/Previous Gallery
                    if (dyn_load_origin.indexOf("Gallery") === -1 ) {
                        omniVars.prop26 += " : " + i;
                    }
                    dyn_load_origin = "";
                }
                s.t(omniVars);
            }
            return;
        }


        /*
         * Enables or disables Image Toggler 'Enlarge/Shring Photo +/-' to Image wrapper
         * @param element 'jQquery' element to which the toggler belongs
         * @param current_image image object 'confing.images' which contains the image data
         * @param current_index index of image [with respect to config.imags] for which the toggler is set up
         */
        function createImageToggler(element, current_image, current_index) {
            var toggler = element.children('.pg-toggler');
            if( +current_image.bvert === 1 ) {
                setupToggler(toggler, current_index);
                toggler.show();
            } else {
                toggler.hide();
                element.removeClass('pg-fitted');
            };
        }

        /*
         * Allow user to click on an image to proceed to the next gallery.
         * @param selector 'jQquery' element for which we are setting up the click event
         * @param current_index the index of the image for which we are setting up the click event
         */
        function setupOnImageClick(selector, current_index) {
            selector.click( function(e){
                e.preventDefault();
                if(config.images[current_index].hotspotSet) return; //no image click on hotspotted images
                if( +config.images[current_index].bhs !== -1 ) {
                    if (config.images.length - 1 == current_index){
                        gallery.redirect_action = 'next';
                        gallery.redirect(e);
                        //gallery.getGalleryData('next');
                        next_button.unbind('click');//unbind the next gallery action from main button
                    }
                    else gallery.nextPhoto(e);

                    var omniParams = {
                        'section'  : 'DIY : Photo Gallery',
                        'module'   : (config.gallery_title || document.title),
                        'linkText' : 'Photo Click:' + current_index
                    }
                }
            });
        }

        /*
         * @param current_image Image object [config.images] for which we are setting up the image wrapper
         * @param new_gallery boolean value. needed in order to delete the first element when going between galleries. Otherwise 2 images are seen in Chrome
         */
        function createImageWrapper (current_image) {
            var clone = template_element.clone(),
            clone_image = clone.find('a img'),
            new_image = new Image();

            clone.children('.pg-hotspots').remove();
            clone_image.attr('alt', current_image.ialt);
            clone.attr('id', 'pg-photo-' + current_image.iid);

            //if (new_gallery) template_element.remove();

            jQuery(new_image).load(function(response, status, xhr){

                // only add when the image is really loaded
                clone.appendTo(photo_display);
                current_image.image_wrapper = clone;
                createImageToggler(clone, current_image, current_index);
                clone_image.attr('src', new_image.src);
                clone_image.attr('style', '');
                clone.attr('style', '');

                applyHotspots(current_image);
                gallery_element.removeClass('loading');
                clone.hide();
                clone.fadeIn('fast');
                setupOnImageClick( clone.find('a.photo').attr('href', current_image.pgUrl), current_index);
                $('.pg-viewport').css('height','auto');

            }).error(function(){
                // in case image doesn't load properly
                gallery_element.removeClass('loading');
                gallery_element.addClass('pg-errored');
            });

            new_image.src = current_image.iurl;
        };

        /*
         * @param toggler jQuery object/selector of the toggler is set up
         * @param index The index of the image for which the toggler is set up
         */
        function setupToggler(toggler, index) {
            var enlarge = toggler.find('.pg-enlarge');
            var shrink = toggler.find('.pg-shrink');
            var current_image = config.images[index];
            var viewport=$('.pg-viewport');

            shrink.hide();
            enlarge.show();

            current_image.image_wrapper.addClass('pg-fitted');

            current_image.toggler = toggler;
            current_image.toggler.enlarge = enlarge;
            current_image.toggler.shrink = shrink;

            enlarge.unbind('click').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                viewport.css('height','auto');
                current_image.image_wrapper.animate({
                    width: '616px'
                }, 200);
                current_image.image_wrapper.find('a.photo img').animate({
                    width: '616px'
                }, 200);
                enlarge.hide();
                shrink.show();
            });

            enlarge.children('.pg-toggler-button').hover(
                function () {
                    enlarge.children('.pg-toggler-label').show();
                },
                function () {
                    enlarge.children('.pg-toggler-label').hide();
                }
            );

            enlarge.children('.pg-toggler-label').hover(
                function () {
                    enlarge.children('.pg-toggler-label').show();
                },
                function () {
                    enlarge.children('.pg-toggler-label').hide();
                }
            );

            shrink.click(function(e){
                e.preventDefault();
                e.stopPropagation();
                viewport.css('height','auto');
                current_image.image_wrapper.animate({
                    width: '339px'
                }, 250);
                current_image.image_wrapper.find('a.photo img').animate({
                    width: '339px'
                }, 250);
                shrink.hide();
                enlarge.show();
            });

            shrink.children('.pg-toggler-button').hover(
                function () {
                    shrink.children('.pg-toggler-label').show();
                },
                function () {
                    shrink.children('.pg-toggler-label').hide();
                }
            );

            shrink.children('.pg-toggler-label').hover(
                function () {
                    shrink.children('.pg-toggler-label').show();
                },
                function () {
                    shrink.children('.pg-toggler-label').hide();
                }
            );
        }

        /*
         * @param index The index of the image being loaded
         * @param bFirst Boolean indicating whether or not this is the first photo/image
         */
        function loadPhotoInfo(index, bFirst) {
            var current_image = config.images[index]
              , next_button_text = 'Next'
              , bFirst = bFirst ? true : false
              , next_index = (index + 1) % config.images.length;

            $viewport = $('.pg-viewport');

            if (mediastream && index+1 == config.images.length) next_button_text = 'Next Gallery';
            next_button.find('span').text(next_button_text);

            if (index === 0) {
                if (mediastream && prevUrls.length) {
                    previous_button.find('span').html('Previous Gallery');
                    previous_button.removeClass("pg-disabled");
                } else {
                    previous_button.addClass("pg-disabled").find('span').html('Previous');
                }
				if (mediastream && config.images.length == 1){//if only one image in gallery

					// show "next gallery" dialog
                    gallery.startNextAnimation();

                    // unbind and then bind the mediastream redirect
                    next_button.unbind('click').bind('click', gallery.redirect);
                    gallery.redirect_action = 'next';
				}
            } else {
                previous_button.removeClass("pg-disabled").find('span').html('Previous');
            }

            if(!on_initial_load) {
                doDynOmni(index);//on initial page load omniture call comes from s.t() call in footer
            }
            // Nielson non-std event count, not on initial load
            if (!bFirst) { SNI.Nielsen.trackNSE(); }

            next_button.attr('href', config.images[next_index].pgUrl);

            if (print_link.length > 0) {
                var i = index + 1;
                var plink = print_link.attr('href');
                if (i < 10) i = '0' + i
                plink = plink.replace(/(.*ARTICLE-PRINT-PHOTO-GALLERY-CURRENT).*?(,00.html)$/, "$1_" + i + "$2");
                print_link.attr('href', plink);
            };

            gallery_element.addClass('loading');
            count_text.html(index + 1 + ' of ' + num_images + ' Photos');


            if ( $.trim(current_image.ititle) === "" ) { /* IE7/8 hide cap head */
                caption_head.hide();
            } else {
                caption_head.show().html(current_image.ititle);
            };

            // put content into the caption container && click
            //line height has to be same as preexisting line height
            caption.html(current_image.icap);
            caption.truncate({
                'maxLines': 3,
                'lineHeight' : 22,
                'truncateString': '&nbsp;&#8230;',
                'showText': 'More'
            });

            if(current_image.rtitle && current_image.rtitle != '') {
                ymal.show();
                if(current_image.rtxt) ymal.find('h4').text(current_image.rtxt);
                ymal_list.html('<li><a href="'+ current_image.rurl + '">' + current_image.rtitle + '</a></li>');

            } else {
                ymal.hide();
            };

            if(current_image.creator) {
                photo_author.html('Credit: ' + current_image.creator);
                photo_author.show();
            } else {
                photo_author.html('');
            };
            photo_author.show();

            // show photo
            if(!current_image.image_wrapper) {
                createImageWrapper(current_image);
            } else {
                gallery_element.removeClass('loading');
                current_image.image_wrapper.fadeIn('fast');
                $viewport.css('height','auto');
            };

            gallery_element.trigger('load-photo-complete', {
                gallery: gallery,
                photo: current_image
            });

            // MM-4855: Fire comScore tracking function on navigation to new slide (counts as a new page load)
            // HOME-35: adding the check for undefined beacon method. This will allow for better handling
            //          of badly formed COMSCORE objects
            if (typeof(COMSCORE) === "object" && typeof(COMSCORE.beacon) === "function") {
                COMSCORE.beacon({
                    c1: "2",
                    c2: "6035648",
                    c3: "",
                    c4: "http://www.diynetwork.com" + current_image.pgUrl
                });
            }
        };

        /*
         * @param current_data The image object [config.images] for which the hot spot is set-up
         */
        function applyHotspots(current_data) {
            var imgs,
                len,
                i = 0;

            // move social toolbar above photo title dynamically to preserve SEO reqs
            $socialtoolbar.remove();
            photo_author.after($socialtoolbar);

            if (typeof SNI.DIY.Photogallery3.Hotspots === "undefined") return console.info("There were no hotspot.");

            var _hots = [];

            imgs = SNI.DIY.Photogallery3.Hotspots.images;
            len = imgs.length;

            var Hotspot = function(hotspot){
                if (!arguments.length) return console.warn("Cannot construct Hotspot class without parameters.");

                this.index = 0;
                this.id = hotspot.id;
                this.name = hotspot.name;
                this.x = hotspot.hotspotXPercent;
                this.y = hotspot.hotspotYPercent;
                this.uid = "pg-hotspot-" + this.id;
                this.description = hotspot.description;
                
                var markup = [
                    '<div class="pg-hotspot" id="{{uid}}" style="top: {{y}}%; left: {{x}}%;">',
                    '<a href="javascript:;" class="pg-icon"></a>',
                    '<div class="pg-tooltip">',
                    '<div class="pg-hotspot-top"></div>',
                    '<div class="pg-hotspot-middle">',
                    '<p class="pg-hotspot-title">{{name}}</a>',
                    '</div>',
                    '<div class="pg-hotspot-bottom"></div>',
                    '</div>',
                    '</div>'
                ].join("");

                markup = markup
                    .replace(/{{uid}}/g, this.uid)
                    .replace(/{{x}}/g, this.x)
                    .replace(/{{y}}/g, this.y)
                    .replace(/{{name}}/g, this.name);

                this.markup = markup;
            };

            Hotspot.prototype.append_to = function( element ) {
                if (typeof element === "undefined") return console.warn("Cannot append to an undefined element.");
                $(this.markup).appendTo(element);
                return $("#" + this.uid);
            };

            for (i; i < len; i++) {
                var _ref = imgs[i];

                // checks to match current data with hotspots
                if (_ref.id != current_data.iid) continue;

                // checks to see if hotspots have been set
                if (current_data.hotspotSet) continue;

                // data is good, mark hotspot set flag to true for this interation
                current_data.hotspotSet = true;

                // setup some vars
                var hs_container
                , hs_products
                , hs_info
                , product_image_url
                , product_description;

                // create and grab reference to the hotspot container
                hs_container = $("<div />", {
                    "class" : "pg-hotspots"
                });

                // append container to current data image wrapper
                hs_container.appendTo(current_data.image_wrapper);

                // creating some array-like templating methods
                var list_html = []
                , product_info_html = []
                , panel_html = [];

                // starting the list markup...
                // NOTE: not closing it here.
                list_html.push('<h3>Products From This Photo:</h3><ul class="pg-hotspot-list">');

                // starting product info...
                // NOTE: not closing it here.
                product_info_html.push('<ul class="pg-hsproducts">');

                // starting panel area
                // NOTE: not closing the left column or the panel.
                panel_html.push([
                    '<div class="pg-hotspot-panel clrfix" id="pg-hotspot-panel-' + current_data.iid + '">',
                    '<div class="l">',
                    '<div class="pg-close-hspanel pg-close">',
                    '<img src="' + (current_data.imurl || current_data.itnurl) + '" />',
                    '<span>',
                    '<a href="javascript: void(0);">Back To This Photo</a>',
                    '</span>',
                    '</div>'
                ].join(""));

                var showProducts = function(e){
                    // stop propagation
                    e.preventDefault();
                    e.stopPropagation();

                    hideNextGalleryTitleOverlay();
                    var context = $(this).get(0),
                    data = e.data;

                    // do omniture
                    SNI.DIY.Omniture.HotSpotClick( data, 'c' );

                    // remove/hide image wrapper
                    return current_data.image_wrapper.fadeOut('fast', function(){

                        // make sure no previous product is selected.
                        hs_products.find('ul.pg-hotspot-list li.selected').removeClass('selected');

                        // hide info pane
                        hs_info.hide();

                        // add selected indactor to corrent list item index
                        $(hs_products.find('ul.pg-hotspot-list li')[data.index]).addClass('selected');

                        // show info pane
                        $(hs_info[data.index]).show();

                        // fade in product panel
                        current_data.image_wrapper.product_panel.fadeIn('fast', function(){
                            current_data.image_wrapper.addClass('pg-hide-hotspots');
                        });

                        // fade in wrapper
                        hsproduct_wrapper.fadeIn('fast');
                    });
                }

                var hoverIn = function() { return $(this).children().fadeIn("fast"); };

                var hoverOut = function(){ return $(this).children().fadeOut("fast"); };

                $(_ref.hotspots).each(function(index){
                    var hotspot = this;
                    _hots.push(this);

                    product_image_url = hotspot.imageURL;
                    product_description = hotspot.description;

                    if(product_description.length > 180) {
                        product_description = product_description.substring(0, 180) + '... <a class="hotspot_readmore_'+index+'" href="' + hotspot.url + '">Read More</a>';
                    };

                    if(hotspot.imageURL === "null" || hotspot.imageURL == "" || hotspot.imageURL == null) {
                        product_image_url = default_product_img_lg.src;
                    };

                    list_html.push('<li>' + hotspot.name + '</li>');

                    product_info_html.push([
                        '<li class="clrfix">',
                        '<h4>',
                        '<a class="hotspot_readmore_'+index+'" href="' + hotspot.url + '" target="_blank">' + hotspot.name + '</a>',
                        '</h4>',
                        '<div class="pg-hsproduct-img">',
                        '<a class="hotspot_readmore_'+index+'" href="' + hotspot.url + '" target="_blank">',
                        '<img src="' + product_image_url + '" alt="' + hotspot.name + '" />',
                        '</a>',
                        '</div>',
                        '<p>' + product_description + '</p>',
                        '<a class="pg-hsproduct-moreinfo hotspot_readmore_'+index+'" href="' + hotspot.url +'" target="_blank">',
                        '<span>More info</span>',
                        '</a>',
                        '</li>'
                    ].join(""));

                    hs = new Hotspot(hotspot);
                    hs.index = index;
                    hs.markup = hs.append_to( hs_container );
                    hs.markup.bind("click", hs, showProducts);

                });

                list_html.push('</ul>');
                product_info_html.push('</ul>');
                panel_html.push(list_html.join("\n"));
                panel_html.push('</div><div class="r">');
                panel_html.push(product_info_html.join("\n"));
                panel_html.push('</div><span class="pg-close-btn pg-close"></span></div>');

                // create product panel
                hs_products = $(panel_html.join('\n')).appendTo(hsproduct_wrapper);
                current_data.image_wrapper.product_panel = hs_products;

                hs_info = hs_products.find('ul.pg-hsproducts li');
                $(hs_info[0]).show();

                hs_products.find('ul.pg-hotspot-list li').click(function(){
                    var $this = $(this),
                    index = $this.index();

                    
                    hs_products.find('ul.pg-hotspot-list li.selected').removeClass('selected');
                    hs_info.hide();
                    $(this).addClass('selected');
                    $(hs_info[index]).show();
                });

                hs_products.find('.pg-close').click(function(){
                    hsproduct_wrapper.hide();
                    var wrapper = current_data.image_wrapper;
                    wrapper.product_panel.hide();
                    wrapper.removeClass('pg-hide-hotspots');
                    wrapper.find(".pg-hotspot-name").hide();
                    wrapper.show();
                });

                hs_products.find('ul.pg-hsproducts li').each(function(index){
                    $(this).find('a.hotspot_readmore_'+index).click(function(e){
                        SNI.DIY.Omniture.HotSpotClick(_hots[index],'1');
                        e.stopPropagation();
                        return true;
                    });
                });

            };

            gallery_element.trigger('hotspot-render-complete', {
                'gallery' : gallery
            });
        };


        /*
         * Gallery object. Defines/contains almost all functions that enable the photo gallery experiece
         */
        gallery = {
            title: config.gallery_title,
            mdSponsorship: mdManager.getParameter('Sponsorship') ? mdManager.getParameter('Sponsorship') : '',
            products: {},
            references: {},
            new_index: current_index,
            redirect_action : '',
            thumbnail_state : false,

            /*
             * Resets/refreshes social toolbar
             * @param url The url of current image
             * @param title The title of the current gallery
             */

			/*photo_title: '.imgpanel h2',
			photo_desc: '.imgpanel cite',
			clean_url: 'http://www.diynetwork.com' + window.location.pathname,
			portf_photo: '.imgwrap a.bigimg img',
			portf_photo_href: 'imgwrap a.bigimg',
			*/
            refreshSocialToolsOld : function(url, title){

                if (typeof url === 'undefined') return false;
                if (typeof title === 'undefined') title = document.title;

                var i    = 2,
                args = arguments,
                len  = args.length,
                url  = (location.protocol + "//" + location.host) + url || location.href;

                for (i; i < len; i++) {
                    var $selector = $(args[i]),
                        $parent   = $selector.parent(),
                        $type     = $parent.attr("class");

/*
                    var s = SHARETHIS.addEntry({
                        "title" : title,
                        "url"   : url
                    });

                    s.attachChicklet($type, $selector.get(0));
*/
                };
                return url;
            },
			refreshSocialTools : function(pageurl,title,iurl,cap){
				if (typeof pageurl === 'undefined') return false;
                if (typeof title === 'undefined') title = document.title;
                var full_url = 'http://www.diynetwork.com' + pageurl;
				SNI.IS.Pinterest.updateButton({
						element: '#tb-pinit',
						url: full_url,
						imgUrl: iurl,
						desc: title + ": " + cap,
						fromMsg: " From DIYnetwork.com"
					});

					SNI.IS.FB.updateButton({
						element: '#tb-facebook iframe',
						url: full_url
					});

					SNI.IS.Twitter.updateButton({
						'element': '#tb-twitter',
						'url': full_url + '?soc=sharingtw',
						'text': title + " - See more inspiration like this at DIYnetwork.com's Photo Galleries."
					});

					SNI.IS.GP.updateButton({
						element: '#tb-gplus iframe',
						url: full_url
					});

			},

            /*
             * @param title The title of the current gallery
             */
            updateGalleryTitleAndBreadcrumb: function(title) {
                var crumbs = $('div.breadcrumb');
                var crumb_links = crumbs.children().remove();

                $('div.intro h1').html(title);
                crumbs.html(title).prepend(crumb_links);
            },

            /*
             * @param url The title of the current gallery
             */
            getHubTabs: function(url) {
                $.ajax({
                    url: url,
                    dataType: 'html',
                    timeout: 15000,
                    success: function(data) {
                        $('div.intro').after(data);
                        setTimeout( function() { SNI.DIY.highlightHubTab(); }, 1000 );
                    },
                    error: function () {
                        console.warn('Could not get  hub tabs');
                    }
                });

            },

            updateGalleryDescArea: function(data) {
                $('div.intro p.intro-txt').html(data.subHeadline); //description
                $('ul.article-info').remove();
                $('ul#hub-nav').remove();
                if (data.hubNavigation != '') gallery.getHubTabs(data.hubNavigation);

                var info = document.createElement('ul');
                info.className = 'article-info clrfix';

                if (data.byline != '') {
                    var li = document.createElement('li');
                    li.className = 'byline';
                    var cite = document.createElement('cite');
                    cite.innerHTML = data.byline;

                    li.appendChild(cite);
                    info.appendChild(li);
                }

                var filedUnder = data.filedUnderLinks;
                if (filedUnder && typeof (filedUnder.main) != 'undefined' && filedUnder.main.length) {
                    var li = document.createElement('li');
                    li.className = 'tags';

                    var cite = document.createElement('cite');
                    cite.innerHTML = 'Filed under:&nbsp;';

                    for (var i = 0; i < filedUnder.main.length; i++) {
                        var item = filedUnder.main[i];

                        var span = document.createElement('span');
                        span.className = 'tag';

                        var a = document.createElement('a');
                        a.setAttribute('href', item.url);
                        a.innerHTML = item.dspName;

                        span.appendChild(a);
                        cite.appendChild(span);
                        if (i < filedUnder.main.length - 1) cite.innerHTML = cite.innerHTML + ',&nbsp';
                    }
                    li.appendChild(cite);
                    info.appendChild(cite);
                }
                $('div.intro').after(info);
                SNI.DIY.Omniture.ClickTrack('li.tags', 'Filed Under: ');
            },

            updateFITG: function(url) { // FITG == Featured In This Gallery

				if(!url)return;
                var container_div  = $('#diy-w .content');
                container_div.find('.featured').hide('slow').remove();

                $.ajax({
                    url: url,
                    dataType: 'html',
                    timeout: 15000,
                    success: function(data) {
                        container_div.append(data);
                        var t = setTimeout(function() { SNI.DIY.bindViewMoreEventOnGalleries() }, 1500);
                    },
                    error: function () {
                        console.warn('Could not get FitG module data');
                    }
                });
            },

            updateLeftRailModule: function(url) {
				if(!url) return;

                var container_div  = $('#diy-w .content');
                container_div.find('#diy-ww').hide('slow').remove();
                $.ajax({
                    url: url,
                    dataType: 'html',
                    timeout: 15000,

                    success: function(data) {
                        var lr_module = container_div.find('#diy-ww'); //.after(data);
                        if (lr_module.length) lr_module.after(data);
                        else container_div.prepend(data);
                    },
                    error: function () {
                        console.warn('Could not get Left Rail module data');
                    }
                });
            },

            updateWeRecommendModule: function(url) {
				if(!url) return; //currently diy does not have weRecommend.  This safety should probably be here anyway.
                var container_div  = $('#diy-w .content');
                container_div.find('.content').hide('slow').remove();
                $.ajax({
                    url: url,
                    dataType: 'html',
                    timeout: 15000,
                    success: function(data) {
                        var ftig_module = container_div.find('.featured'); //.after(data);
                        if (ftig_module.length) ftig_module.after(data);
                        else container_div.prepend(data);
                    },
                    error: function () {
                        console.warn('Could not get We Recommend module data');
                    }
                });
            },

            addThumbsClickEvent: function() {

                thumbnails_frame.find('li').each(function(index) {
                    var thumb = $(this);

                    thumb.unbind("click").bind("click", function(e) {

                        dyn_load_origin = 'Thumbnail';
                        gallery.goToPhoto(index);

                        gallery.hideThumbnails(e);

                       $(gallery_element).trigger('click-thumbnail', {
                            gallery: gallery,
                            thumb: thumb
                        });


                    });
                });
            },

            removeThumbsClickEvent: function() {
                return thumbnails_frame.find('li').unbind("click");
            },

            setYmalNextValue: function(data) {
                if (! data.YMALModule) return '';

                $.ajax({
                    url: data.YMALModule,
                    dataType: 'json',
                    timeout: 15000,
                    attemptCount : 0,
                    retryLimit: 3,
                    success: function(data) {
                        ymal_next = data;
                        next_gallery_index = getNextGalleryIndex();
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        this.attemptCount++;
                        if (this.attemptCount <= this.retryLimit) {
                            $.ajax(this); //try again
                            return;
                        }
                        console.warn('Could not load next gallery data');
                    }
                });

            },

            getGalleryData: function(redirect_action) {
                next_gall_url = (redirect_action === 'prev') ? updateHistoryPrev() : '';

                if (redirect_action === 'next') {
                    var i = getNextGalleryIndex();

                    if(ymal_next.length == 0) return;

                    if (ymal_next[i].delvFrmt.toUpperCase() === 'ARTICLE_PHOTO_GALLERY') {
                        document.location.href =  document.location.origin + ymal_next[i].url;
                        return;
                    }

                    next_gall_url = getGalleryDataUrl(ymal_next[i].sectionId, ymal_next[i].assetId);
                    updateHistoryNext(mdManager.getParameter('SctnId'), mdManager.getParameter('DetailId'));
                }

                if (! next_gall_url) return console.warn('Next gallery data url could not be set');

                $.ajax({
                    url: next_gall_url,
                    dataType: 'json',
                    timeout: 15000,
                    attemptCount: 0,
                    retryLimit: 3,
                    beforeSend:function (jqXHR, settings) {
                        gallery_element.addClass('loading');
                    },
                    success: function(data) {
                        gallery.clearHotspotPanels();
                        gallery.clearProducts(true);
                        gallery.clearFrames();
                        hideNextGalleryTitleOverlay();
                        gallery.loadNewGallery(data);
                        gallery.setYmalNextValue(data);
                    },
                    complete:function (jqXHR, textStatus) {},
                    error: function(xhr, textStatus, errorThrown) {
                        this.attemptCount++;
                        if (this.attemptCount <= this.retryLimit) {
                            $.ajax(this); //try again
                            return;
                        }
                        gallery_element.removeClass('loading');
                        console.warn('Could not load next gallery data');
                    }
                });
            },

            checkHotspotStatus: function() {
                var status = (SNI.DIY.Photogallery3.Hotspots && SNI.DIY.Photogallery3.Hotspots.images.length) ? true : false;

                if (status) $('a.view-all-products').show();
                else $('a.view-all-products').hide();
            },

            updateUrl: function(){
                if (typeof history.pushState !== 'function') return;

                var url   = mdManager.getParameter('Url'),
                state = (history.state ? history.state : {}),
                title = mdManager.getParameter('Title');

                history.pushState(state, title, url);
            },

            updateThumbnails: function() {
                // kill old pagination and content
                $('.pg-thumbnails-frame ul, .pg-thumbnails-frame .pagination-container').remove();

                // create wrapper, and append new thumbs
                $('.pg-thumbnails-frame').append(
                  $('<ul />', {
                    'class' : 'pg-thumbnails clrfix'
                  })
                ).find('.pg-thumbnails').append(
                  getNewThumbnails()
                );

                function getNewThumbnails() {
                    var images = config.images,
                    thumbnails = [];

                    for (var i = 0; i < images.length; i++) {
                        // create dom objects natively!
                        var li = document.createElement('li');
                        if (i === 0) li.className = 'pg-selected-thumbnail';

                        var div =  document.createElement('div');
                        div.className = 'pg-thumbnail';

                        var img = document.createElement('img');
                        img.setAttribute('data-src', images[i].itnurl);
                        img.setAttribute('title', images[i].ititle);
                        img.setAttribute('alt', images[i].ititle);
                        div.appendChild(img);
                        li.appendChild(div);
                        thumbnails.push(li);
                    }
                    return thumbnails;
                }
            },

            loadNewGallery : function(data) {
                //reset key variables;
                config.images = data.images;
                current_index = 0;
                config.current_index = current_index;
                num_images = data.num_images;
                config.gallery_title = data.Title;
                config.hotspotURL = data.hotspotURL;


                template_element.hide();
                $('.pg-endframe').remove();

                template_element.find('img').attr('src', data.images[0].iurl).attr('style', '');
                template_element.find('.pg-hotspots').remove();

                var toggler = template_element.find('.pg-toggler');

                if ( +data.images[0].bvert === 0 ) {
                    template_element.removeClass('pg-fitted').attr('style', '');
                    toggler.hide();
                } else {
                    template_element.addClass('pg-fitted');
                    toggler.show();
                    config.images[current_index].image_wrapper = template_element;
                    setupToggler(toggler, current_index);
                }
                gallery.updateThumbnails();

                var catDspName = mdManager.getParameter('CategoryDspName').toLowerCase();
                catDspName = catDspName.substring(0, 1).toUpperCase() + catDspName.substring(1);

                document.title = config.gallery_title + ' : ' + catDspName  + ' : DIY';
                gallery.updateGalleryMetadata(data)
                gallery.updateGalleryTitleAndBreadcrumb(config.gallery_title);
                gallery.updateGalleryDescArea(data);
                gallery.initGallery(true);
                gallery.updateFITG(data.featuredInThisGalleryModule);
                gallery.updateLeftRailModule(data.pgLeftRailModule);
              	gallery.refreshSocialTools( config.images[current_index].pgUrl, config.gallery_title, config.images[current_index].iurl,config.images[current_index].icap, 'tb-twitter', 'tb-facebook' );
                gallery.checkHotspotStatus();
                gallery.updateUrl();

                gallery.setReference( "refPagination", null );
                gallery.setReference( "refThumbnails", null );
                gallery.setReference( "refProducts", null );

            },

            updateGalleryMetadata: function(data) {
		adManager.resetKeys();

                mdManager.setParameter('oUrl', data.Url);
                mdManager.setParameter('Url', data.Url);
                mdManager.setParameter('Role', data.Role);
                mdManager.setParameter('Title', data.Title);
                mdManager.setParameter('Keywords', data.Keywords);
                mdManager.setParameter('Site', data.Site);
                mdManager.setParameter('SctnId', data.SctnId);
                mdManager.setParameter('DetailId', data.DetailId);
                mdManager.setParameter('PageNumber', data.PageNumber);
                mdManager.setParameter('AdKey1', data.AdKey1);
                mdManager.setParameter('AdKey2', data.AdKey2);
                mdManager.setParameter('Channel', data.Channel);
                mdManager.setParameter('TalentName', data.TalentName);
                mdManager.setParameter('Source', data.Source);
                mdManager.setParameter('ContentTag1', data.ContentTag1);
                mdManager.setParameter('ContentTag2', data.ContentTag2);
                mdManager.setParameter('SctnName', data.SctnName);
                mdManager.setParameter('SctnNameLineage', data.SctnNameLineage);
                mdManager.setParameter('Show_Abbr', data.Show_Abbr);
                mdManager.setParameter('CategoryDspName', data.CategoryDspName);
                mdManager.setParameter('Classification', data.Classification);
                mdManager.setParameter('SctnDspName', data.SctnDspName);
                mdManager.setParameter('Sponsorship', data.Sponsorship);
                mdManager.setParameter('Type', data.Type);
                mdManager.setParameter('UniqueId', data.UniqueId);
                mdManager.setParameter('DelvFrmt', data.DelvFrmt);
                mdManager.setParameter('ShowTitle', data.ShowTitle);
                mdManager.setParameter('ShowAbstract', data.ShowAbstract);
                mdManager.setParameter('ShowRole', data.ShowRole);
                mdManager.setParameter('ShowType', data.ShowType);
                mdManager.setParameter('HubHierarchy', data.HubHierarchy);

                gallery.updateAds();
            },

            updateAds: function() {
                $('#leaderboard-wrap').attr('style', 'visibility:hidden');
                initAdManager(adManager, mdManager);
                SNI.DynamicAds.refresh();
            },

            /*
             *   goToPhoto             : handles all navigation for photos
             *   @int                  : index of where to go to next
             *   @function (optional)  : callback a method that gets call at the end of navigation
             * */
            goToPhoto : function(index){
                //Remove omniture referrer
                SNI.DIY.Omniture.setAjaxOmniReferer();

                // set pointers
                var $g           = gallery_element
                , hasError     = $g.hasClass("pg-errored")
                , isLoading    = $g.hasClass("loading")
                , len          = config["images"].length
                , t            = this
                , i            = +index
                , h            = +(index + 1)
                , lastImage    = config.images[current_index];

                t.closeProductPanel();

                var $viewport=$('.pg-viewport');
                $viewport.height($viewport.height());

                // if there was a previous error, remove the indicator
                if (hasError) $g.removeClass("pg-errored");

                // if the gallery is not currently loading, handle request
                if (!isLoading) {
                    if (h !== len && mediastream) {
                        // this is for hiding the "next gallery" dialog
                        hideNextGalleryTitleOverlay();

                        // rebind the next on every call,
                        // todo: id like to first check if the event is already set to next photo though
                        next_button.unbind("click").bind("click", t.nextPhoto);

                        // making sure ad refresh only happens on normal photos, not last
                        SNI.DynamicAds.refresh();

                    } else if (h === len && mediastream) {
                         //Refresh the Ads
                         SNI.DynamicAds.refresh();
                         
                        // this is for showing the "next gallery" dialog
                        t.startNextAnimation();

                        // unbind and then bind the mediastream redirect
                        next_button.unbind('click').bind('click', gallery.redirect);
                        gallery.redirect_action = 'next';
                    };

                    // next in progress... add loading indicator
                    $g.addClass("loading");

                    // set some new pointers
                    var lastImageUrl = lastImage.pgUrl,
                    lastImageProductPanelIsVisible = lastImage.hotspotSet,
                    thumbnails = thumbnails_frame.find("li");

                    if (typeof lastImage.image_wrapper !== "undefined") {
                        var lastImageWrapper = lastImage.image_wrapper;
                        if (typeof lastImageWrapper.product_panel !== "undefined") var lastImageProductPanel = lastImageWrapper.product_panel;
                    };

                    // hide product window
                    hsproduct_wrapper.hide();
                    if (current_index >= 0) {
                        // hide previous image
                        if (typeof lastImageWrapper !== "undefined") {
                            lastImageWrapper.hide();

                            // if there is a panel, hide the previous image panel
                            if (lastImageProductPanelIsVisible && typeof lastImageWrapper !== "undefined") {
                                if (typeof lastImageProductPanel !== "undefined") lastImageProductPanel.hide();

                                lastImageWrapper.find(".pg-hotspot-name").hide();
                                lastImageWrapper.removeClass("pg-hide-hotspots");
                            }
                        }

                        // set href of previous button to previous url
                        previous_button.attr("href", lastImageUrl);
                    }

                    current_index = index;

                    if( current_index <= 0 && !prevUrls) {
                        current_index = 0;
                        previous_button.addClass("pg-disabled");
                    } else if( current_index > 0 && previous_button.hasClass("pg-disabled") ) {
                        previous_button.removeClass("pg-disabled");
                    }

                    loadPhotoInfo(current_index, false);
                    gallery.refreshSocialTools( config.images[current_index].pgUrl, config.gallery_title, config.images[current_index].iurl,config.images[current_index].icap, 'tb-twitter', 'tb-facebook' );

                    return t;
                };
            },

            redirect: function (e) {
                e.preventDefault();

                var going_to = "Previous Gallery";

                dyn_load_origin = "Previous Gallery";

                if (gallery.redirect_action == "next") {
                    going_to = "Next Gallery";
                    dyn_load_origin = "Next Gallery";
                    next_button.unbind("click", gallery.redirect);
                }

                //doDynOmni(current_index);

                window.photogallery_is_first_gallery = false;

                return gallery.getGalleryData(gallery.redirect_action);
            },

            previousPhoto: function (e) {
                removeOmniReferrer();

                if (current_index === 0 && mediastream && prevUrls.length) {
                    e.preventDefault();
                    gallery.redirect_action = "prev";

                    return gallery.redirect(e);
                };

                if ( $(this).data("block") !== "yes" && !previous_button.hasClass("pg-disabled") ) {

                    if( gallery_element.hasClass("pg-errored") ) {
                        gallery_element.removeClass("pg-errored");
                    }

                    dyn_load_origin = "Previous";
                    inter_next = false;
                    gallery.new_index = current_index-1;

                   // if( +gallery.new_index === 0 ) { doDynOmni(gallery.new_index); }

                    gallery.goToPhoto(gallery.new_index);

                    gallery_element.trigger("previous-photo", {
                        "gallery" : gallery,
                        "index"   : gallery.new_index,
                        "element" : previous_button
                    });
                };

                if (typeof e !== "undefined") { return e.preventDefault(); }
            },

            nextPhoto : function (e) {

                removeOmniReferrer();

                if ( $(this).data("block") !== "yes" && !next_button.hasClass("pg-disabled") ) {

                    if (gallery_element.hasClass("pg-errored")) {
                        gallery_element.removeClass("pg-errored");
                    }

                    dyn_load_origin = "Next";
                    inter_next = true;
                    gallery.new_index = ( (current_index + 1) % config.images.length );
                    gallery.goToPhoto(gallery.new_index);

                    gallery_element.trigger("next-photo", {
                        "gallery" : gallery,
                        "index"   : gallery.new_index,
                        "element" : next_button
                    });
                }

                if (typeof e !== "undefined") { return e.preventDefault(); }
            },

            getReference: function(ref){
                return gallery.references[ref] || null;
            },

            setReference: function(ref, value){
                gallery.references[ref] = value || null;
                return value;
            },

            selectThumbnailIndex: function(){
                return thumbnails_frame
                    .find("li").removeClass("pg-selected-thumbnail")
                    .eq(current_index).addClass("pg-selected-thumbnail");
            },

            buildThumbnailPagination: function() {
                var myShowNumber = 30;

                // loads from memory
                if ( gallery.getReference("refThumbnails") !== null ) {

                    // create pagination
                    gallery.createPagination(myShowNumber, ".pg-thumbnails-frame .pg-thumbnails", "refThumbnails");
                    gallery.addThumbsClickEvent();
                    gallery.selectThumbnailIndex();
                    return false;

                }

                //create pagination first and then load images
                gallery.createPagination(myShowNumber, ".pg-thumbnails-frame .pg-thumbnails", "refThumbnails");

                // go through each thumbnail and add/show loader
                var thumbs = thumbnails_frame.find(".pg-thumbnail"),
                count = 0;

                $.each( thumbs, function(index) {
                    var $this = $(this),
                    thumb = $this.find("img").eq(0),
                    image = new Image();
                    var alt_text = thumb.attr('alt');
                    thumb.attr('alt', '');

                    // set src to gif loader
                    thumb.attr("src", loader_img.src);

		    // adds click event to thumbs -- allows fast clicking outside load
                    gallery.addThumbsClickEvent();

                    // when the new image is loaded, reset the thumb src
                    $(image).load(function(e){
                        $this.removeClass("pg-thumbnails-loading");
                        thumb.attr("src", image.src);
                        count = count + 1;
                    });

                    // set in-memory image to the scr of the data attribute
                    $this.addClass("pg-thumbnails-loading");
                    image.src = thumb.attr("data-src");
                });
            },

            showThumbnails : function(e){
                var $viewport=$('.pg-viewport');
                $viewport.height($viewport.height());

                var container=$(".pg-thumbnails-frame");
                container.height($viewport.height() - 70);

                // if loading, do nothing...
                if ( gallery_element.hasClass('loading') ) return false;
                // if already open, close...
                if ( thumbnails_button.hasClass('selected') ) return gallery.hideThumbnails();

                // disregard clicks on the document body...
                if (typeof e !== 'undefined') e.stopPropagation();
                // add selected state to button
                thumbnails_button.addClass('selected');
                // add class indicator for showing thumbs
                thumbnails_button.parent().parent().addClass('showing_thumbnails');
                // hide the next title, it should already be hidden... so it doesnt hurt to re-apply
                hideNextGalleryTitleOverlay();
                // adds the hide event on document element
                $(document).bind('click', gallery.hideThumbnails);
                // stop propegation
                $('.pg-thumbnails-frame').click(function(e){ e.stopPropagation(); })
                // build pagination
                gallery.buildThumbnailPagination();
                // update state
                gallery.thumbnail_state = true;
                // update selected thumbnail
                thumbnails_frame
                    .find("li").removeClass("pg-selected-thumbnail")
                    .eq(current_index).addClass("pg-selected-thumbnail");


                return true;
            },

            hideThumbnails: function (e){
                if ( !$(thumbnails_frame).is(':visible') ) return false;
                if (typeof e !== 'undefined') e.stopPropagation();

                // remove selected state class
                thumbnails_button.removeClass('selected');
                // remove class indicator for showing thumbs
                thumbnails_button.parent().parent().removeClass('showing_thumbnails');
                // removes the hide event on document element
                $(document).unbind('click', gallery.hideThumbnails);
                // removes propegation event
                $('.pg-thumbnails-frame').unbind();
                // removes thumbnail clicks
                gallery.removeThumbsClickEvent();
                // update state
                gallery.thumbnail_state = false;

                return false;
            },

            toggleThumbnails: function(e){
                if (typeof e !== 'undefined') e.stopPropagation();

                // hide/show based on state of thumbs
                gallery[gallery.thumbnail_state ? 'hideThumbnails' : 'showThumbnails']();

                // return the result state
                return gallery.thumbnail_state;
            },

            startNextAnimation: function(){
                // start clean everytime
                $("#pg-next-title").unbind().remove();

                if (ymal_next.length == 0 || next_gallery_index == -1) return;

                setTimeout(function() {

                    var photo_id        = (config.images[config.images.length-1].iid)
                      , next_title      = ymal_next[next_gallery_index].title
                      , $wrapper        = $('.pg-photo-display-wrapper')
                      , $previous_image = $('#pg-photo-' + photo_id)
                      , html_overlay    = [
                            '<div id="pg-next-title">',
                                '<span>',
                                    '<b>Next Gallery: </b>' + next_title,
                                '</span>',
                            '</div>'
                        ].join("");

                    if ( +config.images[ (config.images.length - 1) ].bvert === 1 ) {
                        $previous_image.append(html_overlay);
                    } else {
                        $wrapper.append(html_overlay);
                    }

                    var next_gallery_title = $('#pg-next-title');
                    next_gallery_title.click(function(e) {
                        gallery.redirect_action = 'next';
                        gallery.redirect(e);
                        next_button.unbind('click'); //to remove the "next gallery" action
                    });

                    next_gallery_title.animate({'marginRight' : '330px'}, 1000).delay(5000).animate({
                        'marginRight' : '-330px'
                    }, 3000);
                }, 1000);
            },

            SHOWING_DETAILS: false,

            clearFrames: function() {
                var _frames = $('.pg-photo-wrapper');
                _frames.not(':eq(0)').remove();
                _frames.eq(0).removeClass('pg-hide-hotspots');
            },

            clearProducts: function( shouldCloseContainer ){
                var container = $(".pg-endframe").eq(0);
                if (gallery.SHOWING_DETAILS) {
                    console.info("Product detail view is showing... Removing the element along with the listing container.")
                    container.find("ul.pg-endframe-products, div.pagination-container, div.product-detail-container, a.back-to-all-products, div.product-pagination-container").remove();
                } else {
                    container.find("ul.pg-endframe-products, div.pagination-container").remove();
                };

                console.info("The product unordered list container has been removed.");

                if (shouldCloseContainer) {
                    gallery.closeProductPanel();
                    console.info("The product panel has been closed and hidden.");
                };

                return container;
            },

            clearHotspotPanels: function( id ){
               // by default remove all, unless id is provided - remove singular
                if (id) {
                    $("#pg-hotspot-panel-" + id).remove();
                    return true;
                };

                $(".pg-photo-hsproduct-wrapper").empty();
                return true;

            },

            restorePagination: function(){
                if ( gallery.getReference("refPagination") === null ) return console.warn("There was no original reference made to the items markup.");

                var container = $(".pg-endframe").eq(0);

                gallery.clearProducts();

                container.find("div.pg-endframe-product-detail").remove();
                container.append( gallery.getReference("refPagination") );
            },

            createPagination : function( showNumber, list, reference ) {
                if (!showNumber || !list) return console.warn("Not enough arguments, %s", arguments);

                // hold reference
                if ( typeof reference !== "undefined" ) {
                   //it seems now there is no function of the DOM parameter below; all that matters is the first parameter and that the reference is not null
                  if ( gallery.getReference( reference ) === null ) gallery.setReference( reference, $(list).clone() );
                };

                // construct pagination variables
                var showAmount       = showNumber
                  , itemArray        = $(list).children()
                  , itemCount        = itemArray.size()
                  , theList          = $(list)
                  , theContainer     = $(list).parent()
                  , paginationHolder = ""
                  , newListHolder    = ""
                  , totalPages       = Math.ceil( itemCount / showAmount )
                  , count            = 0
                  , currentPage      = 1;

                // if there is less than the amount per page return because no need to paginate
                if (itemCount <= showAmount) return console.info("No need to paginate. Not enough items");

                var i = 1,
                len = totalPages;

                // loop to create pages
                for (i; i <= len; i++){
                    newListHolder += "<ul class='pg-endframe-products clrfix page page" + i + "'>";

                    //loop the number of times equal to the amount of items shown per page
                    for (var j = 0; j < showAmount; j++){
                        if (itemArray[count]){
                            newListHolder += itemArray[count].outerHTML;
                            count++;
                        }
                    }

                    newListHolder += "</ul>";
                };

                //replace original list with new paginated list separated in <ul>'s
                theList.replaceWith(newListHolder);

                //creating pagination - assume first page selected at first, so it's included in the first string with the class current
                paginationHolder += '<div class="pagination-container clrfix" style="display: none;"><div class="pagination clrfix"><div class="prev clrfix no-more"><a href="javascript:;">&larr; Prev Page</a></div><div class="pages clrfix"><a href ="javascript:;" class="current page1">1</a>';

                var i   = 2,
                len = totalPages;

                //first is already created so starting with the second
                for(i; i <= len; i++) {
                    paginationHolder += '<a href ="javascript:;" class="page'+ i + '">' + i + '</a>';
                };

                //closing everything out
                paginationHolder += '</div><div class="next clrfix"><a href="javascript:;">Next Page &rarr;</a></div></div></div>';

                //adding created pagination to the end of the container
                theContainer.append(paginationHolder);

                //jump to page that user was on
                currentPage =  Math.floor(current_index / showNumber) + 1;
                if (currentPage > 1){ //jump in pagination only if necessary
                    showPage(currentPage);
                    paginationHighlight(currentPage);
                }


                //change slides based on page number clicks
                theContainer.find('.pagination .pages a').click(function(){

                    $this = $(this);

                    //if already selected don't do anything
                    if( $this.hasClass('current') ) return console.info("Already selected");

                    currentPage = ( theContainer.find('.pagination .pages a').index( $this ) ) + 1; //finds the order of the link clicked and assigns that as current page
                    showPage(currentPage);

                    //controls highlighting of pagination
                    paginationHighlight(currentPage);

                });

                //change slides based on prev click
                theContainer.find('.pagination .prev').click(function(){

                    if (currentPage === 1) return console.warn("Cannot go back any further.");

                    currentPage -= 1;
                    showPage(currentPage);
                    paginationHighlight(currentPage);

                });

                //change slides based on next click
                theContainer.find('.pagination .next').click(function(){

                    if (currentPage === totalPages) return console.warn("Cannot go forward any further.");

                    currentPage += 1;
                    showPage(currentPage);
                    paginationHighlight(currentPage);

                });

                // set pagination centered
                var pagi_container = theContainer.find('.pagination-container').eq(0)
                  , pagi_width     = pagi_container.outerWidth(true) + 2
                  , pagi_offset    = -(pagi_width / 2);

                pagi_container.css({
                      "width"       : pagi_width
                    , "margin-left" : pagi_offset
                    , "left"        : "50%"
                }).show();

                //controls the highlighting of the pagination
                function paginationHighlight(currentPage){

                    var $p  = theContainer.find('.pagination .prev')
                      , $n  = theContainer.find('.pagination .next')
                      , $a  = theContainer.find('.pagination .pages a')
                      , $pg = theContainer.find('.pagination .pages .page' + currentPage);


                    $p.addClass('no-more');
                    $n.addClass('no-more');

                    if (currentPage !== 1 && currentPage > 1){
                        $p.removeClass('no-more');
                    };

                    if(currentPage !== totalPages && currentPage != totalPages){
                        $n.removeClass('no-more');
                    };

                    //creating allPagination global after pagination is created
                    $a.removeClass('current');
                    $pg.addClass('current');

                };

                function showPage(currentPage){
                    theContainer.find('.page').hide();
                    theContainer.find('.page' + currentPage).show();
                };
            },

            closeProductPanel : function(){
                if ( $(".pg-endframe-close-btn").length ) {
                    return $(".pg-endframe-close-btn").eq(0).click();
                };
            }
        }; //closes -> gallery = {

        // get reference to dom elements
        gallery_element = $(element);
        photo_area_wrapper = $('.pg-viewport .pg-photo-display');
        interstitial_takeover = gallery_element.find('.pg-viewport');
        photo_display = gallery_element.find('.pg-viewport .pg-photo-display-wrapper');
        count_text = $('.pg-thumbnails-button span');
        thumbnails_button = gallery_element.find('.pg-navigation a.pg-thumbnails-button');
        thumbnails_frame = gallery_element.find('.pg-navigation .pg-thumbnails-frame');
        next_button = gallery_element.find('.pg-navigation .pg-next');
        previous_button = gallery_element.find('.pg-navigation .pg-previous');
        template_element = photo_display.children('.pg-photo-wrapper');
        photo_author = photo_area_wrapper.find('p.pg-author');
        caption_head = photo_area_wrapper.children('h2');
        caption = photo_area_wrapper.children('p.desc');
        hsproduct_wrapper = $('<div class="pg-photo-hsproduct-wrapper"></div>').appendTo(photo_display);
        ymal = gallery_element.find('.pg-you-might-like');
        ymal_list = ymal.find('ul');
        print_link = $('#print-select a.this');
        $close = $(".photo-gallery4 .pg-close-btn"),
        $socialtoolbar = $("#social-toolbar");

        // some initial leg work
        gallery.initGallery  = function(new_gallery) {
            //new_gallery is true after an ajax load
            current_index   = config.current_index;

            if( !config.images[current_index] ) current_index = 0;

            config.images[current_index].image_wrapper = template_element;
            template_element.hide();

            if (!new_gallery) {
                createImageToggler(template_element, config.images[current_index], current_index);
                setupOnImageClick(config.images[current_index].image_wrapper, current_index);
            }

            // go out and get the hotspots first
            var applyHotspotImg = config.images[current_index];

            if(config.hotspotURL && config.hotspotURL != '') {

                $.ajax({
                    url      : config.hotspotURL,
                    dataType : 'script',
                    timeout  : 10000,
                    async    : false,
                    success  : function(data) {
                        var count = 0;

                        /* attach this function to the DIY property to be accessed outside of this closure */
                        SNI.DIY.buildProductsTab = function () {
                            var count = 0;
                            applyHotspots(applyHotspotImg);

                            $(config.images).each(function(){
                                var image = this;
                                var product_image_url;
                                var even_class;

                                if (+image.bhs === 0) return true; //same as 'continue' in a for loop

                                $(SNI.DIY.Photogallery3.Hotspots.images).each(function() {
                                    if (image.iid != this.id) return true;

                                    $(this.hotspots).each(function(){
                                        count++;
                                        even_class = '';
                                        product_image_url = this.imageURL;

                                        if(this.imageURL == 'null' || this.imageURL == '' || this.imageURL == null) {
                                            product_image_url = default_product_img_sm.src;
                                        }

                                        if((count%2) == 0) even_class = ' even';
                                    });
                                });
                            });

                            gallery_element
                              .trigger('endframe-render-complete', {gallery: gallery});

                        };

                        // build endframe products
                        //$("head").append('<script type="text/javascript">' + data + ' \n SNI.DIY.buildProductsTab(); </script>');
                    },
                    complete: function() {
                        loadPhotoInfo(current_index, true);
                        applyHotspots(config.images[current_index]);
                    }
                });

            };

            // check hotspot status
            gallery.checkHotspotStatus();

            // next picture
            // TODO: wtf, why isnt this double bound like the prev is????
            next_button.click(gallery.nextPhoto);

             //link left/right keyboard arrows to previous/next buttons
            $(document).unbind('keyup').keyup(function(e){
                var code = e.keyCode || e.which;
                if (code === 39){//right arrow
                    e.preventDefault();
                    next_button.trigger('click');
                }
                else if (code === 37){//left arrow
                    e.preventDefault();
                    previous_button.trigger('click');
                }
            });

            if ( !new_gallery ) {

                // show thumbs
                thumbnails_button.unbind("click", gallery.showThumbnails).bind("click", gallery.showThumbnails);
                $close.unbind("click", gallery.showThumbnails).bind("click", gallery.showThumbnails);

                // prev picture
                previous_button.click(gallery.previousPhoto);

                // error handle
                gallery_element.find('.pg-error button').click(function(e){
                    gallery.goToPhoto(current_index);
                    e.preventDefault();
                });

                $('#toolbar .font-resize').find('li').click(function(){
                    var defaultSize = '100%';
                    $(element).find('li.active').removeClass('active');
                    $(this).addClass('active');

                    if ($(this).hasClass('med')) {
                        photo_area_wrapper.css('font-size',defaultSize);
                    } else if ($(this).hasClass('sm')) {
                        photo_area_wrapper.css('font-size','85%');
                    } else {
                        photo_area_wrapper.css('font-size','116%');
                    }
                });

                SNI.DIY.Omniture.ClickTrackSingle('div.recommend', 'You Might Also Like: '.replace('&rsquo;','\u0027'), mdManager.getParameter('title'));
                SNI.DIY.Omniture.ClickTrackSingle('div.pg-you-might-like', 'You Might Also Like: '.replace('&rsquo;','\u0027'), mdManager.getParameter('title'));

                /*
                 * SNI Core SNI.DynamicAds to enable interstitial ads
                 */
                SNI.DynamicAds.init({
                    'container': gallery_element,
                    'insert_tgt': photo_display,
                    'insert_tgt_to': interstitial_takeover,
                    'callback': null,
                    'dismiss_elts': [next_button, previous_button]
                });

            } // endif;

            /*
             *   ImageItem : Image item class, builds an image
             *   @src      : src of img
             * */
            var ImageItem = function(id, title, description, src, index, href, belongsTo){

                if (typeof id === "undefined") return console.warn("Every image must have an id.", arguments);

                // constructor
                this.id          = id;
                this.src         = src;
                this.title       = title;
                this.description = description;
                this["index"]    = index || 0;
                this.href        = href;
                this.isFirst     = (this["index"] === 0);
                this.className   = "clrfix hs-product" + (this.isFirst ? " first" :  "") + (this["index"] % 2 ? " odd" : " even") + " hs-product-" + (this["index"] + 1);

                var li           = document.createElement("li");
                li.className     = this.className;

                var div          = document.createElement("div");
                div.className    = "pg-endframe-product-img";

                var img          = document.createElement("img");
                img.src          = this.src;
                img.alt          = "Image";
                img.setAttribute("data-src", this.src)

                var p            = document.createElement("p");
                var t            = document.createTextNode(this.title);
                var a            = document.createElement("a");
                a.href           = "javascript:;";

                // append all that newly created goodness to the container
                div.appendChild(img);
                a.appendChild(t);
                p.appendChild(a);
                li.appendChild(div);
                li.appendChild(p);

                // make the element available
                this.element = li;

                // expose the inner elements so that we have bindings on them
                this._e      = [div, a, img, p, li, t];

                // expose which image the item is related too
                this._b      = config.images[ belongsTo ];
            };

            /*
             *   buildProductPanel     : handles the building of a product panel
             * */
            var buildProductsPanel = function( callback, finishedCallback ){

                // handle the panel if the endframe exsist.
                if ( $(".pg-endframe").length ) {

                    // kickoff callback if the panel already exsist.
                    callback( $(".pg-endframe").get(0) );
                    finishedCallback( $(".pg-endframe").find("> ul > li").eq(0) );

                    // leave a message for the user.
                    return console.info(
                        "Product panel already exsist. No need to build."
                        , $(".pg-endframe")
                    );
                };

                // build product panel
                var productPanel                        = {};
                    productPanel.divProductPanelWrapper = document.createElement("div");
                    productPanel.hrefProductPanelClose  = document.createElement("a");
                    productPanel.ulProductContainer     = document.createElement("ul");
                    productPanel.productItems           = [];

                // first time use -> let's start by adding the proper classes
                productPanel.divProductPanelWrapper.className = "pg-endframe hide";
                productPanel.ulProductContainer.className     = "pg-endframe-products clrfix";

                // put "ul" into container "div"
                productPanel.divProductPanelWrapper.appendChild(productPanel.ulProductContainer);

                // handle success of getting products
                var success = function(){
                    var cnt  = 0
                      , imgs = SNI.DIY.Photogallery3.Hotspots.images
                      , len  = imgs.length
                      , panelsIndex = len
                      , configImagesLength = config.images.length
                      , panelIndexing = new Array(configImagesLength)
                      , unsorted = [];


                    if (len === 0) {
                        $(".view-all-products > a").text("There was an error.").parent().delay(5000).fadeOut();
                        return console.warn("There was no products returned from SNI.DIY.Photogallery3.Hotspots");
                    };

                    // index the panels
                    for (var j = 0; j < configImagesLength; j++ ) {
                        panelIndexing[j] = config.images[j].iid;
                    }

                    while (panelsIndex--) {
                        var panel  = imgs[panelsIndex]
                          , hotspots = panel.hotspots
                          , hotspotsLength = hotspots.length
                          , hotspotIndex    = 0;

                        unsorted[panelIndexing.indexOf(panel.id)] = new Array(hotspotsLength);

                        // loop through the products in the hotspotIndex response
                        for (hotspotIndex; hotspotIndex < hotspotsLength; hotspotIndex++) {
                            var hotspot = hotspots[hotspotIndex];

                            unsorted[panelIndexing.indexOf(panel.id)][hotspotIndex] = new ImageItem(hotspot.id, hotspot.name, hotspot.description, hotspot.imageURL, cnt, hotspot.url, panel.id);

                            cnt = cnt + 1;
                        };
                    }

                    // flatten multidimensional array
                    // panels
                    for (var p = 0 ; p < unsorted.length; p++) {
                        if (unsorted[p] && unsorted[p].length) {
                            // hotspots
                            for (var h = 0; h < unsorted[p].length; h++) {
                                productPanel.productItems.push(unsorted[p][h]);
                            }
                        }
                    }

                    var i = 0
                      , len = productPanel.productItems.length;

                    // set last element to contain the last class -> on el and on attribute
                    productPanel.productItems[len - 1].className         = productPanel.productItems[len - 1].className + " last";
                    productPanel.productItems[len - 1].element.className = productPanel.productItems[len - 1].element.className + " last";

                    // add click event, text, and new class to close btn
                    $(productPanel.hrefProductPanelClose)
                        .click(closeProductPanel).attr("href", "javascript:;")
                        .text("Close")
                        .addClass("pg-endframe-close-btn");

                    // add a the close button to the wrapper
                    productPanel.divProductPanelWrapper.appendChild(productPanel.hrefProductPanelClose);

                    // loop through all the new products and append them to the "ul"
                    for (i; i < len; i++) {
                        productPanel.ulProductContainer.appendChild(productPanel.productItems[i].element);
                    };

                    // append the ul to the wrapper
                    productPanel.divProductPanelWrapper.appendChild(productPanel.ulProductContainer);

                    // run the callback, use the wrapper as a hook
                    callback( productPanel.divProductPanelWrapper );

                    // assign the product panel data to a globally accessible object on the SNI namespace
                    gallery.setReference("refProducts", productPanel.productItems);

                    // append to dom
                    $(".pg-photo-display-wrapper").get(0).appendChild(productPanel.divProductPanelWrapper);

                    // release old product panel from memory
                    productPanel = null;

                    return finishedCallback( $( gallery.getReference("refProducts")[0].element) );

                };

                if (SNI.DIY.Photogallery3.Hotspots === "undefined") {
                    $.ajax({
                        "url"      : SNI.DIY.Photogallery3.hsJSON
                      , "dataType" : "script"
                      , "success"  : success
                    });
                } else {
                    success();
                };

            };

            /*
             *
             *   closeProductPanel     : handles the closing of a product panel
             *
             * */
            var closeProductPanel = function(){

                var $n = $("#pg-next-title")
                  , $v = $(".pg-viewport ");

                gallery.restorePagination();

                // bring back next title
                $n.show();

                // set overflow back to hidden
                $v.find(".pg-photo-display-wrapper").removeClass("showing-product-panel");
                $v.find("#social-toolbar").removeClass("showing-product-panel");

                // set height back to auto
                $v.removeAttr("style");

                return $w = $(".pg-endframe").eq(0).addClass("hide").end();
            };

            /*
             *
             *   showProductDetails    : handles showing the product details panel
             *
             * */
            var productDetailsHandler = function(){

                var items = $("ul.pg-endframe-products").find("a, img"); //will want to bind both a and img
                var liList = $("ul.pg-endframe-products li"); //to be used to find hotspot index of clicked a, img
                // unbind any previously bound events
                items.unbind("click");

                // bind new event to click handle
                items.bind("click", function(event){

                    // stop regular dom-default action
                    event.preventDefault();

                    // ref self and find index of element through the pages
                    // DRS: previously this got the index from the class name.  Since we've sorted by position in gallery, the index now is the position in the list
                    // Seems a horribly convoluted way of doing things, but going with what Erik started for now
                    var self           = $(this)
                      , height         = self.parents(".hs-product").outerHeight(true)
                      , index          = liList.index(self.parents("li")) //(+self.parents(".hs-product").attr("class").replace(/last|first/g, "").replace(/.*-/g, "") - 1)
                      , image          = gallery.getReference("refProducts")[index]
                      , wrapper        = gallery.clearProducts() // returns the gallery wrapper when clearProducts is called.
                      , totalImages    = gallery.getReference("refProducts").length;


                    // Back to Products : Event
                    var back_to_products_action = function(event){

                        // stop regular dom-default action
                        event.preventDefault();

                        // remove element and info container
                        $(this)
                          .next().remove().end()
                          .next().remove().end()
                          .remove();

                        gallery.SHOWING_DETAILS = false;

                        // restore products & pagination
                        gallery.restorePagination();
                        gallery.createPagination(12, ".pg-endframe ul", "refPagination");
                        productDetailsHandler();
                    };

                    // Back to Products : Element
                    var back_to_products = $("<a />", {
                        "html"  : "Back to All Products <span></span>"
                      , "class" : "back-to-all-products"
                      , "href"  : "javascript:;"
                      , "click" : back_to_products_action
                    });

                    // handle events for next and prev product detail
                    var paginate = function(event){

                        // stop regular dom-default action
                        event.preventDefault();

                        // grab inner data object
                        var $this     = $(this)
                          , data      = $this.data()
                          , container = $this.parent()
                          , page_data = container.data()
                          , direction = (data.method === "next" ? true : false);

                        // on the last one, disable the next
                        if (page_data.current === page_data.total && direction) {
                            return false;
                        };

                        // on the first one, disable the prev
                        if (!page_data["index"] && !direction) {
                            return false;
                        };

                        // cleans the next/prev class
                        $this.parent().children().removeClass("disabled");

                        // grab reference to image at correct index.
                        var index = (direction ? (page_data["index"] + 1) : (page_data["index"] - 1))
                          , image = gallery.getReference("refProducts")[index];

                        var isFirstOrLast;
                        if (index === 0 && totalImages === (index + 1)) {
                          isFirstOrLast = "both";
                        } else if (index === 0) {
                          isFirstOrLast = "first";
                        } else if (totalImages === (index + 1)) {
                          isFirstOrLast = "last";
                        } else {
                          isFirstOrLast = "";
                        };

                        // populate container data with new correct data
                        populate_wrapper_with_product( image, {
                            "total"   : totalImages
                          , "current" : (index + 1)
                          , "index"   : index
                        }, isFirstOrLast);

                    };

                    var populate_wrapper_with_product = function(image, data, isFirstOrLast){
                    		
                    		
                        if (typeof image === "undefined") {
                            return console.warn("Cannot populate wrapper with products becuase image reference was not set.");
                        };

                        // start fresh
                        $(".product-pagination-container, .product-detail-container, .detail_next, .detail_previous").remove();

                        // Product Details View : Pagination Container
                        var product_pagination_container = $("<div />", {
                            "class"   : "product-pagination-container clrfix"
                        }).data(data);

                        // add disabled class to pagination if state meets credentials
                        var btnState_next = ""
                          , btnState_prev = "";

                        if ( isFirstOrLast === "last" || isFirstOrLast === "both" ) {
                          btnState_next = "disabled";
                        };

                        if ( isFirstOrLast === "first" || isFirstOrLast === "both" ) {
                          btnState_prev = "disabled";
                        };

                        // Product Details View : Pagination Links
                        var product_pagination_next = $("<a class=\"detail_next\" />")
                              .bind("click", paginate)
                              .addClass(btnState_next)
                              .attr("href", "javascript:;")
                              .data("method", "next")
                              .html("Next Product &rarr;");

                        var product_pagination_prev = $("<a class=\"detail_previous\" />")
                              .bind("click", paginate)
                              .addClass(btnState_prev)
                              .attr("href", "javascript:;")
                              .data("method", "prev")
                              .html("&larr; Previous");

                        // append links to container
                        product_pagination_container
                          .append(product_pagination_prev)
                          .append(product_pagination_next);

                        // Product Details View : Container
                        var product_detail_container = $("<div />", {
                            "class"  : "product-detail-container clrfix"
                        });

                        // Product Details View : Container Elements
                        var product_detail_left  = $("<div class=\"image detail_left\" />")
                          , product_detail_link  = $("<a />").attr("href", image.href).attr("target", "_blank")
                          , product_detail_right = $("<div class=\"info detail_right\" />")
                          , product_detail_title = $("<a class=\"title\" />").attr("href", image.href).attr("target", "_blank").text(image.title)
                          , product_detail_more  = $("<a class=\"more btn\" />").attr("href", image.href).attr("target", "_blank").html("<span>More Info</span>")
                          , product_detail_desc  = $("<p class=\"description\" />").text(image.description);

                        // find the correct hotspot index
                        var l = SNI.DIY.Photogallery3.Hotspots.images.length,
                      	imageArray = SNI.DIY.Photogallery3.Hotspots.images;
                        for(i = 0; i < l; i++) {
                        	if ( typeof(imageArray[i].hotspots[0]) !== 'undefined' && imageArray[i].hotspots[0].id == image.id) {
                        		image.hsIndex = i;
                        		break;
                        	} 
                        }
                        
                        // apply the click Omniture click event
                        
                        product_detail_more.click(function(e){
                        	var oHS = SNI.DIY.Photogallery3.Hotspots.images[image.hsIndex].hotspots[0];
                        	SNI.DIY.Omniture.HotSpotClick(oHS, "l");
                          e.stopPropagation();
                    		});
                        
                        // Product Details View : Container Image
                        product_detail_left
                            .append(product_detail_link.append(image._e[2]));

                        // Product Details View : Container Info
                        product_detail_right
                            .append(product_detail_title)
                            .append(product_detail_desc)
                            .append(product_detail_more);

                        // Product Details View : Container Combo
                        product_detail_container
                            .append(product_detail_left)
                            .append(product_detail_right)

                        return wrapper
                            .append(product_detail_container)
                            .append(product_pagination_container);
                    };

                    // Product Details View : Append View to wrapper
                    wrapper.append(back_to_products);

                    var isFirstOrLast;
                    if (index === 0 && totalImages === (index + 1)) {
                      isFirstOrLast = "both";
                    } else if (index === 0) {
                      isFirstOrLast = "first";
                    } else if (totalImages === (index + 1)) {
                      isFirstOrLast = "last";
                    } else {
                      isFirstOrLast = "";
                    };

                    // populate wrapper with product
                    populate_wrapper_with_product( image, {
                        "total"   : totalImages
                      , "current" : (index + 1)
                      , "index"   : index
                    }, isFirstOrLast);
                  	
                    gallery.SHOWING_DETAILS = true;

                });

            };

            /*
             *
             *   showProductPanel      : handles showing the product panel
             *   @object               : event signature of the current element
             *
             * */
            var showProductPanel = function(event){

                // stop regular dom-default action
                event.preventDefault();

                // build the panel, wont do anything if there is nothing there. Runs the callback.
                buildProductsPanel(function( wrapper ){

                    // overall height to fit 12 products
                    var height = 680;

                    // show products panel by removing the hide
                    var $w = $(wrapper),
                        $p = $w.parent(),
                        $v = $(".pg-viewport").eq(0);

                    if (!$p.length) $p = $(".pg-photo-display-wrapper").eq(0);

                    $w.removeClass().addClass("pg-endframe").css({
                        "height" : height
                      , "width"  : $p.width() + 1
                    });

                    hideNextGalleryTitleOverlay();

                    // set overflow to fix issues with next title

                    $v.find(".pg-photo-display-wrapper").addClass("showing-product-panel");
                    $v.find("#social-toolbar").addClass("showing-product-panel");

                    // set viewport height to max height of 12 products :: note, we need to kill this height when removed.
                    $v.css("height", height);


                }, function( element ){

                    gallery.createPagination(12, ".pg-endframe ul", "refPagination");

                    // add listener for details pane
                    productDetailsHandler();

                });

            };

            // clear whats given to us at first.
            $(".pg-endframe, .recommend-lead, .recommend-more").remove();

            // add click handle
            $(".view-all-products").unbind("click").bind("click", showProductPanel);

            window._pg = gallery;
            on_initial_load = false;
            return gallery;
        }

        var gal = gallery.initGallery(false);

    }
})(jQuery);
