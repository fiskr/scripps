// photogallery 4
SNI.HGTV.DynamicAds = SNI.DynamicAds;

// customize interstitial markup for site (augmented module pattern to override method):
SNI.HGTV.DynamicAds = (function(d) {
  d.fmt_interstitial = function() {
    var hRet = "";
    hRet += '<div class="interwrap">';
    hRet += '<a href="#" class="close"><span></span>Skip Ad</a>';
    hRet += '<h6 class="mrec">Advertisement</h6>';
    hRet += '<div class="inter-container">';
    if (d.iparm.iFmt.toLowerCase() == "swf") {
      hRet += '<div id="interad">'
    + '<a class="no-flash-message" href="http://www.adobe.com/go/getflashplayer">'
    + '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />'
    + '</a>'
    + '</div>';
    } else {
      if (d.iparm.iHREF != "") {
        hRet += '<a href="' + d.iparm.iHREF + '">';
      }
      hRet += '<img src ="' + d.iparm.iURL + '" />';
      if (d.iparm.iHREF != "") {
        hRet += '</a>';
      }
    }
    hRet += '<iframe class="tracker" width="0" height="0" frameborder="0"></iframe>';
    hRet += '</div>';
    hRet += '</div>';
    return hRet;
  }
  
  return d;
  
}) (SNI.HGTV.DynamicAds);
// kludge to allow current hotspot feed to work, inserts into SNI.HGTV.Photogallery4 ns
if (SNI.HGTV === undefined) { SNI.HGTV = {}; } 

if (SNI.HGTV.Photogallery4 === undefined) { SNI.HGTV.Photogallery4 = {}; }
// end kludge
(function($) {
    var DEFAULT_CONFIG = {
    type: 'full-page',
    gallery_title: "",
    current_index: 0,
    initial_load: false,
    thumbnail_loader: "http://www.sndimg.com/webhgrm/rm10/imgs/le/loader-dark.gif",
    default_product_image_sm: "http://www.sndimg.com/webhgrm/rm10/imgs/le/product_unavailable_sm.jpg",
    default_product_image_lg: "http://www.sndimg.com/webhgrm/rm10/imgs/le/product_unavailable_al.jpg",
    images: null
    };

    /* A photo gallery with a few methods to traverse through an array of photos
     * @constructor
     * @param {Object|String} element DOM reference or jQuery selector string to initialize photo gallery functionality
     * @param {Object} config Configuration for photo gallery settings
     * @return PhotoGallery
     */
    var PhotoGallery = function (element, config) {
    for (var prop in DEFAULT_CONFIG) {
        if (!config.hasOwnProperty(prop)) {
        config[prop] = DEFAULT_CONFIG[prop];
        }
    }

    config.images = config.images || imageData;
    var gallery = this,
    gallery_element,
    count_label,
    photo_display,
    thumbnails_button,
    thumbnails_frame,
    next_button,
    previous_button,
    ad_unit,
    photo_description,
    photo_author,
    caption_head,
    caption,
    toggler,
    endframe_info,
    endframe_container,
    template_element,
    hsproduct_wrapper,
    ymal,
    ymal_list,
    _load_once,
    current_index,
    loader_img = new Image(),
    default_product_img_sm = new Image(),
    default_product_img_lg = new Image(),
    inter_next = false,
    print_link,
    inter_refreshed = true,
    dyn_load_origin;

    // for lazy loading
    loader_img.src = config.thumbnail_loader;

    /* private functions */

    /*
     * Omniture tracking when photo loads
     * @private
     */
    function doDynOmni(i) {
        ++i;
        var omniVars = new Object();
        if (mdManager.getParameterString("oUrl") == "") {
        mdManager.setParameter("oUrl", mdManager.getParameterString("Url"));
        }
        mdManager.setParameter("Url", mdManager.getParameter("oUrl") + "?i=" + parseInt(i, 10));
        if (i < 10) {
        i = '0' + parseInt(i, 10);
        }

        var metaUniqueId = [];
        metaUniqueId.push(mdManager.getParameter('Site'));
        metaUniqueId.push(mdManager.getParameter('Type'));
        metaUniqueId.push(mdManager.getParameter('DetailId'));
        metaUniqueId.push(i);

        mdManager.setParameter('UniqueId', metaUniqueId.join('-') );
        mdManager.setParameter('DelvFrmt', 'OVERLAY_PHOTO_GALLERY');
        

        if (typeof s == "object") {
        omniVars = new Object();
        if (dyn_load_origin != "") {
            omniVars.prop26 = "HGTV Made Remade Blog: Photo Gallery : " + config.gallery_title + " : " + dyn_load_origin + " : " + i;
            dyn_load_origin = "";
        }
        s.t(omniVars);
        }
        return;
    }

    /*
     * Creates the image wrapper dom elements by cloning the first wrapper rendered by formatter
     * @private
     */
    function createImageWrapper(current_data) {
        var clone = template_element.clone(),
        clone_image = clone.find("a img"),
        new_image = new Image(),
        toggler = clone.children(".pg-toggler");

        clone.attr("id", "pg-photo-" + current_data.iid);
            
        console.log(new_image.src);
        clone.find("a.photo").attr("href", current_data.pgUrl).click(function(e) {
        if (current_data.bhs != -1) {
            gallery.nextPhoto(e);
            var omniParams = {
            section: "HGTV Made Remade Blog: Photo Gallery",
            module: (config.gallery_title || $("head title").text()),
            linkText: "Photo Click:" + current_index
            };
            SNI.Omniture.dynamicSingleVar(omniParams);
        }
        return false;
        });

        clone.children(".pg-hotspots").remove();
        clone_image.attr("alt", current_data.ialt);

        $(new_image).load(function(response, status, xhr) {
        // only add when the image is really loaded
        clone.appendTo(photo_display);
        current_data.image_wrapper = clone;
        clone_image.attr("src", new_image.src);
        console.log(clone_image);
        clone_image.attr("style", "");

        clone.attr("style", "");
        if (current_data.bvert) {
            setupToggler(toggler, current_index);
            toggler.show();
        }
        else {
            toggler.hide();
            clone.removeClass("pg-fitted");
        }

        applyHotspots(current_data);
        gallery_element.removeClass("loading");
        thumbnails_button.removeClass("dis");
        next_button.removeClass("dis");
        previous_button.removeClass("dis");

        clone.hide();
        clone.fadeIn("fast");
        }).error(function() {
        // in case image doesn't load properly
        gallery_element.removeClass("loading");
        gallery_element.addClass("pg-errored");
        photo_display_parent.hide();
        });
        new_image.src = current_data.iurl;
    }

    /*
     * Sets up events to toggle an image's size
     * @private
     */
    function setupToggler(toggler, index) {
        var enlarge = toggler.find(".pg-enlarge");
        var shrink = toggler.find(".pg-shrink");
        var current_data = config.images[index];
        current_data.image_wrapper.addClass("pg-fitted");

        current_data.toggler = toggler;
        current_data.toggler.enlarge = enlarge;
        current_data.toggler.shrink = shrink;

        enlarge.click(function() {
        current_data.image_wrapper.animate({
            width: "616px"
        }, 200);
        current_data.image_wrapper.find("a.photo img").animate({
            width: "616px"
        }, 200);
        enlarge.hide();
        shrink.show();
        var t = setTimeout(function() { verifyWrapperHeight(); }, 450);
        });

        enlarge.children(".pg-toggler-button").hover(
        function() {
            enlarge.children(".pg-toggler-label").show();
        },

        function() {
            enlarge.children(".pg-toggler-label").hide();
        }
        );

        enlarge.children(".pg-toggler-label").hover(
        function() {
            enlarge.children(".pg-toggler-label").show();
        },
        function() {
            enlarge.children(".pg-toggler-label").hide();
        }
        );

        shrink.click(function() {
        current_data.image_wrapper.animate({
            width: "339px"
        }, 250);
        current_data.image_wrapper.find("a.photo img").animate({
            width: "339px"
        }, 250);
        shrink.hide();
        enlarge.show();
        var t = setTimeout(function() { verifyWrapperHeight(); }, 450);
        });

        shrink.children(".pg-toggler-button").hover(
        function() {
            shrink.children(".pg-toggler-label").show();
        },
        function() {
            shrink.children(".pg-toggler-label").hide();
        }
        );

        shrink.children(".pg-toggler-label").hover(
        function() {
            shrink.children(".pg-toggler-label").show();
        },
        function() {
            shrink.children(".pg-toggler-label").hide();
        }
        );
    }

    
    function shortenCaptionText(index) {
        var current_data = config.images[index];
        var caption_length = 207;
        var cap_start, cap_end = '';

        if (current_data.ititle.length > 41) {
        caption_length = 157;
        }

        var cap = current_data.icap,
        truncated_cap = SNI.Util.truncate(cap, caption_length),
        rendered_content = truncated_cap.success ? truncated_cap.output + '<span class="pg-cap-elipse">&#8230; <span class="pg-show-caption">Read More</span></span>' : cap;
        
        caption_head.html(current_data.ititle);
        caption.html(rendered_content);
        caption.find(".pg-show-caption").click(function () {
        caption.find(".pg-cap-elipse").hide();
        caption
            .hide()
            .html(cap)
            .fadeIn(175)
            .slideDown(175);
        var t = setTimeout(function() { verifyWrapperHeight(); }, 450);
        });
    }

    /*
     * Loads the photo and extra information such as hot spots as well as setting up some events for user interaction
     * @private
     */
    function loadPhotoInfo(index, bFirst) {

        var current_data = config.images[index];
        var dispIndex = index + 1,
            num_images = (config.images.length - 1);
            if (dispIndex > num_images) dispIndex = num_images; //to account for
        $(".pg-thumbnails-button .count").html(dispIndex  +" of " + (config.images.length - 1));

        var next_index = (index + 1) % config.images.length;
        doDynOmni(index);
        // Nielson non-std event count, not on initial load
        if (!bFirst) {
        SNI.Nielsen.trackNSE();
        }
        next_button.attr("href", config.images[next_index].pgUrl);
        if (print_link.length > 0) {
        var i = index + 1;
        var plink = print_link.attr("href");
        if (i < 10) {
            i = '0' + parseInt(index + 1, 10);
        }
        plink = plink.replace(/(.*ARTICLE-PRINT-PHOTO-GALLERY-CURRENT).*?(,00.html)$/, "$1_" + i + "$2");
        print_link.attr("href", plink);
        }

        gallery_element.addClass("loading");
        if (current_data.iid != "endframe") {
        // update the line to display the correct photo number
        count_label.html(index + 1);
        photo_description.show();
        endframe_info.hide();
        shortenCaptionText(index);
        
        if (current_data.rtitle && current_data.rtitle != "") {
            ymal.show();
            if (current_data.rtxt) {
            ymal.find("h4").text(current_data.rtxt);
            }
            ymal_list.html('<li><a href="' + current_data.rurl + '">' + current_data.rtitle + '</a></li>');
        }
        else {
            ymal.hide();
        }

        if (current_data.creator) {
            photo_author.children(".pg-author-name").html(current_data.creator);
            photo_author.show();
            if (config['type'] == 'inline') photo_display_parent.attr('style', 'padding-bottom:0;');
        
        } else {
            photo_author.hide();
            if (config['type'] == 'inline') photo_display_parent.attr('style', 'padding-bottom:70px;');
        }

        } else {
        photo_description.hide();
        photo_author.hide();
        if (config['type'] == 'inline') photo_display_parent.attr('style', 'padding-bottom:70px;');
        endframe_info.show();
        ymal.hide();
        photo_display.prepend("<div class='mask' />");
        $(".pg-endframe .tabs .products-btn .btn").click();
        }

        $(thumbnails_frame.find(".pg-thumbnails li")[index]).addClass("pg-selected-thumbnail");
        
        // show photo
        if (!current_data.image_wrapper) {
        createImageWrapper(current_data);
        } else {
        gallery_element.removeClass("loading");
        current_data.image_wrapper.fadeIn("fast");
        }
        gallery_element.trigger("load-photo-complete", {
        gallery: gallery,
        photo: current_data
        });
        
        if (! config['initial_load']) var t = setTimeout(function() { verifyWrapperHeight(); }, 450);
        config['initial_load'] = false;

    }

    function verifyWrapperHeight() { //changing height
        if (top != self) top.SNI.HGTV.adjustFrameWrapperHeight( $('.photo-gallery').height() );
    }

    /*
     * Applies hot spots to the photo and click events to show products
     * @private
     */
    function applyHotspots(current_data) {
        if(typeof SNI.HGTV.Photogallery4.Hotspots === "object") {
        $(SNI.HGTV.Photogallery4.Hotspots.images).each(function() {
            
            var hotspotImage = this;
            if (hotspotImage.id == current_data.iid && !current_data.hotspotSet) {
            
            current_data.hotspotSet = true;
            // create the hotspots holder
            var hotspots_container = $('<div class="pg-hotspots"></div>').appendTo(current_data.image_wrapper);
            
            var hotspots_products, hotspot_items_info;
            // create hot spots
            
            var list_html = [], product_info_html = [], panel_html = [];
            
            list_html.push('<h3>Products From This Photo:</h3><ul class="pg-hotspot-list">');
            product_info_html.push('<ul class="pg-hsproducts">');
            panel_html.push('<div class="pg-hotspot-panel clrfix">' +
                        '<div class="l">' +
                            '<div class="pg-close-hspanel pg-close">' +
                                '<img src="' + current_data.itnurl.replace('_sm.jpg', '_med.jpg') + '" />' +
                                '<span><a href="javascript: void(0);">Back to this Photo</a></span>' +
                            '</div>');
            
            var showProducts = function(e) {
                SNI.HGTV.Omniture.HotSpotClick(e.data.hotspot, "c");
                current_data.image_wrapper.fadeOut("fast", function() {
                hotspots_products.find("ul.pg-hotspot-list li.selected").removeClass("selected");
                hotspot_items_info.hide();
                $(hotspots_products.find("ul.pg-hotspot-list li")[e.data.index]).addClass("selected");
                $(hotspot_items_info[e.data.index]).show();
                current_data.image_wrapper.product_panel.fadeIn("fast", function() {
                    current_data.image_wrapper.addClass("pg-hide-hotspots");
                                    hsproduct_wrapper.fadeIn("fast");
                });
                
                });
            };
            var hoverIn = function() {
                $(this).children().fadeIn("fast");
            };
            var hoverOut = function() {
                $(this).children().fadeOut("fast");
            };
            
            var product_image_url, product_description;
            
            $(hotspotImage.hotspots).each(function(index) {
                var hotspot = this;
                product_image_url = hotspot.imageURL;
                product_description = hotspot.description;
                if (product_description.length > 180) {
                product_description = product_description.substring(0, 180) + '... <a class="hotspot_readmore_' + index + '" href="' + hotspot.url + '">Read More</a>';
                }
                if (hotspot.imageURL === "null" || hotspot.imageURL == "" || hotspot.imageURL == null) {
                product_image_url = default_product_img_lg.src;
                }
                
                list_html.push('<li>' + hotspot.name + '</li>');

                product_info_html.push('<li class="clrfix">'
                           + '<p class="strong"><a class="hotspot_readmore_' + index + '" href="' + hotspot.url + '" target="_blank">' + hotspot.name + '</a></p>'
                           + ' <div class="pg-hsproduct-img"><a class="hotspot_readmore_' + index + '" href="' + hotspot.url + '" target="_blank"><img src="' + product_image_url + '" alt="' + hotspot.name + '" width="266" height="200" /></a></div>'
                           + ' <p>' + product_description + '</p>'
                           + ' <a class="pg-hsproduct-moreinfo btn small hotspot_readmore_' + index + '" href="' + hotspot.url + '" target="_blank">'
                           + ' <span>More info</span></a>'
                           + '</li>');
                
                var hotspotCSS = {
                left: hotspot.hotspotXPercent + "%",
                top: hotspot.hotspotYPercent + "%"
                };
                
                var hotspot_element = $('<div class="pg-hotspot"><span class="pg-hotspot-name">' + hotspot.name + '</span></div>').appendTo(hotspots_container);
                
                hotspot_element.css(hotspotCSS);
                
                hotspot_element.bind("click", {
                hotspot: hotspot,
                index: index
                }, function(e){
                                hoverOut.apply(this, [e]);
                                showProducts.apply(this, [e]);
                            });             
                hotspot_element.mouseover(hoverIn)
                            hotspot_element.mouseout(hoverOut);
            });
            
            list_html.push('</ul>');
            product_info_html.push('</ul>');
            panel_html.push(list_html.join("\n"));
            panel_html.push('</div><div class="r">');
            panel_html.push(product_info_html.join("\n"));
            panel_html.push('</div><span class="pg-close-btn pg-close">close</span></div>');

            // create product panel
            hotspots_products = $(panel_html.join("\n")).appendTo(hsproduct_wrapper);
            current_data.image_wrapper.product_panel = hotspots_products;
            
            hotspot_items_info = hotspots_products.find("ul.pg-hsproducts li");
            $(hotspot_items_info[0]).show();
            
            hotspots_products.find("ul.pg-hotspot-list li").each(function(index) {
                $(this).click(function() {
                SNI.HGTV.Omniture.HotSpotClick(hotspotImage.hotspots[index], "c");
                hotspots_products.find("ul.pg-hotspot-list li.selected").removeClass("selected");
                hotspot_items_info.hide();
                $(this).addClass("selected");
                $(hotspot_items_info[index]).show();
                });
            });

            hotspots_products.find(".pg-close-btn, .pg-close").click(function() {
                hsproduct_wrapper.fadeOut("fast", function() {
                current_data.image_wrapper.product_panel.hide();
                current_data.image_wrapper.removeClass("pg-hide-hotspots");
                current_data.image_wrapper.fadeIn("fast");
                });
            });
            
            hotspots_products.find("ul.pg-hsproducts li").each(function(index) {
                $(this).find("a.hotspot_readmore_" + index).click(function(e) {
                SNI.HGTV.Omniture.HotSpotClick(hotspotImage.hotspots[index], "1");
                e.stopPropagation();
                return true;
                });
            });
            }
        });
        
        gallery_element.trigger("hotspot-render-complete", {
            gallery: gallery
        });
        }
    }

    /* end private functions */

    // public methods

    /*
     * Goes to the previous photo
     * @member PhotoGallery
     */
    gallery.title = config.gallery_title;
    gallery.previousPhoto = function(e) {
        if ($(this).data("block") != "yes") {
        var new_index;
        if (!previous_button.hasClass("pg-disabled")) {
            if (gallery_element.hasClass("pg-errored")) {
            gallery_element.removeClass("pg-errored");
            photo_display_parent.show();
            }
            dyn_load_origin = "Previous";
            inter_next = false;
            new_index = current_index - 1;
            gallery.goToPhoto(new_index);
            gallery_element.trigger("previous-photo", {
            gallery: gallery,
            index: new_index,
            element: previous_button
            });

        }
        }
        e.preventDefault();
    };

    /*
     * Goes to the next class
     * @member PhotoGallery
     */

    gallery.nextPhoto = function(e) {
        if ($(this).data("block") != "yes") {
        var new_index;
        if (!next_button.hasClass("pg-disabled")) {
            if (gallery_element.hasClass("pg-errored")) {
            gallery_element.removeClass("pg-errored");
            photo_display_parent.show();
            }
            dyn_load_origin = "Next";
            inter_next = true;
            new_index = ((current_index + 1) % config.images.length);
            gallery.goToPhoto(new_index);
            gallery_element.trigger("next-photo", {
            gallery: gallery,
            index: new_index,
            element: next_button
            });
        }
        }
        e.preventDefault();
    };

    /*
     * Load once method to help lazy load thumbnail images when the thumbnail panel loads for the first time
     * @private
     */
    _load_once = function() {

        thumbnails_frame.find(".hd .pg-close-btn").click(function(e) {
            gallery.toggleThumbnails(e);
        });

        thumbnails_frame.find(".pg-thumbnail").each(function() {
            var thumb_container = $(this);
            var thumb = $(thumb_container.children("img"));
            thumb.attr("src", loader_img.src);
    
            var img = new Image();

            $(img).load(function() {
                thumb_container.removeClass("pg-thumbnails-loading");
                thumb.attr("src", img.src);
            });
            
            thumb_container.addClass("pg-thumbnails-loading");
            img.src = thumb.attr("data-src");
        });

        $(thumbnails_frame.find(".pg-thumbnails li")[current_index]).addClass("pg-selected-thumbnail");

        setTimeout(function(){
            var currentOverlay = $(".sni-inline-gallery").not(":hidden");
        }, 0);
        
        _load_once = function() {
            return;
        };
    };

    /*
     * Show the thumbnail panel
     * @member PhotoGallery
     */
    gallery.showThumbnails = function (e) {
        console.log('show thumbanils')

        $('.photo-gallery4').addClass("showing_thumbnails");
        if (!gallery_element.hasClass("loading")) {
            gallery.toggleThumbnails(e);
            gallery_element.trigger("show-thumbnails", {
                gallery: gallery,
                element: thumbnails_button
            });
        };
        e.stopPropagation();
    };

    /*
     * Hide the thumbnail panel
     * @member PhotoGallery
     */
    gallery.hideThumbnails = function (e) {
        if ($(thumbnails_frame).is(":visible")) {
            thumbnails_button.removeClass("sel");
            thumbnails_frame.fadeOut("fast");
            gallery_element.trigger("hide-thumbnails", {
                gallery: gallery,
                element: thumbnails_button
            });
        };
        e.stopPropagation();
    };

    /*
     * Toggle the show and hide of the thumbnail panel
     * @member PhotoGallery
     */
    gallery.toggleThumbnails = function(e) {

        if (!gallery_element.hasClass("loading")) {
            
            _load_once();
            
            if (thumbnails_button.hasClass("sel")) {
                thumbnails_button.removeClass("sel");
                thumbnails_button.parent().parent().removeClass("showing_thumbnails");
            } else {
                thumbnails_button.addClass("sel");
                console.log("else")
                thumbnails_button.parent().parent().addClass("showing_thumbnails");
            };

            /*thumbnails_frame.animate({ opacity: 'toggle' }, function() {
                if ($(this).is(":hidden")) {
                    gallery_element.trigger("hide-thumbnails", {
                        gallery: gallery,
                        element: thumbnails_button
                    });
                    thumbnails_button.parent().parent().removeClass("showing_thumbnails");
                } else {
                    gallery_element.trigger("show-thumbnails", {
                        gallery: gallery,
                        element: thumbnails_button
                    });
                    thumbnails_button.parent().parent().addClass("showing_thumbnails");
                };
            });
            */
            gallery_element.trigger("toggle-thumbnail", {
                gallery: gallery,
                element: thumbnails_button
            });

        };
        
        e.stopPropagation();

    };

    /*
     * Go to a specific photo in the gallery and loads image information if not loaded already
     * @param {String} index The index representation of the photo in the array
         * @param {object} evt document event object, passed in when goToPhoto is called via dom event
     */
    gallery.goToPhoto = function(index, evt) {
        console.log("core goto");
        $('.photo-gallery4').removeClass("showing_thumbnails");
        // added evt parameter to determine whether this method is being called from a thumb click or the navigation        
        if (gallery_element.hasClass("pg-errored")) {
        gallery_element.removeClass("pg-errored");
            photo_display_parent.hide();
        }

        if (!gallery_element.hasClass("loading")) {
        if (current_index >= 0) {
            // conditionally hide current photo
            if(config.type === 'inline' && index === (config.images.length - 1 && typeof evt !== 'undefined')){         
            // is the end frame the next frame?
            if( (index-1) === current_index) {
                endframe_container.show();
                $('.pg-author-name').html('&nbsp;');
                $('.pg-enlarge').hide();
                current_index = index + 1; // adding by 2 to indicate that we're at the end of the slideshow
            
            } else {
                // then we must be on the end frame and going back one!
                // if this is an inline gallery and we are on the last photo, don't hide the photo
                endframe_container.hide();
                current_index = index - 1;
                $('.pg-enlarge').show();
            }
            
            loadPhotoInfo(current_index);
            
            } else if (config.type === 'inline' && current_index === config.images.length) {
            endframe_container.hide();
            gallery_element.addClass("loading");
            SNI.HGTV.DynamicAds.refresh();
            hsproduct_wrapper.hide();
            
            // otherwise, hide photo
            config.images[current_index - 2].image_wrapper.hide();
            current_index = 0;

            // disable previous button
            if (current_index <= 0) {
                current_index = 0;
                previous_button.addClass("pg-disabled");
            } else if (current_index > 0 && previous_button.hasClass("pg-disabled")) {
                previous_button.removeClass("pg-disabled");
            }
            
            loadPhotoInfo(current_index);
            
            } else {
            gallery_element.addClass("loading");
            SNI.HGTV.DynamicAds.refresh();
            hsproduct_wrapper.hide();
            // otherwise, hide photo
            var previous_data = config.images[current_index];
            var current_data = config.images[index];

            if (previous_data.image_wrapper) {
                if (previous_data.iid == 'endframe') {
                $('.pg-photo-wrapper').hide(); //hide very last image now since we don't hide when endframe is visible
                $('.pg-photo-display-wrapper .mask').remove();
                }
                if (current_data.iid != 'endframe') previous_data.image_wrapper.hide();

                if (previous_data.image_wrapper.product_panel) {
                previous_data.image_wrapper.product_panel.hide();
                previous_data.image_wrapper.removeClass("pg-hide-hotspots");
                }
                thumbnails_frame.find(".pg-thumbnails li.pg-selected-thumbnail").removeClass("pg-selected-thumbnail");
                previous_button.attr("href", previous_data.pgUrl);
            }
            
            current_index = index;

            // disable previous button
            if (current_index <= 0) {
                current_index = 0;
                previous_button.addClass("pg-disabled");
            } else if (current_index > 0 && previous_button.hasClass("pg-disabled")) {
                previous_button.removeClass("pg-disabled");
            }
            
            loadPhotoInfo(current_index);
            }
            
        }

        
        }
    };

    // get reference to dom elements
    gallery_element = $(element);
    photo_display_parent = gallery_element.find(".pg-viewport .pg-photo-display");
    photo_display = gallery_element.find(".pg-viewport .pg-photo-display-wrapper");
    count_label = gallery_element.find(".pg-navigation .pg-photo-count .count");
    thumbnails_button = gallery_element.find(".pg-navigation a.thumbs");
    thumbnails_frame = gallery_element.find(".pg-navigation .pg-thumbnails-frame");
    next_button = gallery_element.find(".pg-navigation .next");
    previous_button = gallery_element.find(".pg-navigation .prev");
    template_element = photo_display.children(".pg-photo-wrapper");
    photo_description = $(".pg-viewport .pg-photo-description");
    photo_author = $(".pg-viewport .pg-author");
    caption_head = photo_description.children("h5");
    caption = photo_description.children("p");
    endframe_info = $(".pg-viewport .pg-endframe-info");
    endframe_container = $(gallery_element).find(".pg-endframe");
    hsproduct_wrapper = $('<div class="pg-photo-hsproduct-wrapper"></div>').appendTo(photo_display);
    ymal = gallery_element.find(".pg-you-might-like");
    ymal_list = ymal.find("ul");
    print_link = $("#print-select a.this");

    // some initial leg work
    current_index = config.current_index;
    gallery.element = gallery_element;

    // setting up endframe
    config.images.push({
        iid: "endframe",
        image_wrapper: $(photo_display).children(".pg-endframe")
    });
    
    // var pageNum = SNI.Util.getParameterByName('pgNum'); //passed in as URL param for Stip Galleries
    // if (pageNum != "" && !isNaN(pageNum)) { current_index = pageNum - 1; }

    if (!config.images[current_index]) {
        current_index = 0;
    }
    $(count_label).html(current_index + 1) 

    if (current_index != 0) { //back-end load first image by default. hide it and display correct one when necessary
        template_element.hide();
        if (config['type'] == 'inline') config['initial_load'] = true;
        gallery.goToPhoto(current_index);
    } else {
        shortenCaptionText(current_index)
        SNI.Nielsen.trackNSE();
    }

    if (config.images[current_index].iid != "endframe") {
        if (current_index == 0) {
        previous_button.addClass("pg-disabled");
        }
        config.images[current_index].image_wrapper = template_element;

        toggler = template_element.children(".pg-toggler");

        if (config.images[current_index].bvert == 1) {
        setupToggler(toggler, current_index);
        toggler.show();
        } else {
        //toggler.hide();
        template_element.removeClass("pg-fitted");
        }

        config.images[current_index].image_wrapper.find("a.photo").click(function (e) {
        if (config.images[current_index].bhs != -1) {
            gallery.nextPhoto(e);
            var omniParams = {
            section: "HGTV Made Remade Blog : Photo Gallery",
            module: (config.gallery_title || $("head title").text()),
            linkText: "Photo Click:" + current_index
            };
            SNI.Omniture.dynamicSingleVar(omniParams);

        }
        return false;
        });

        //var t = setTimeout(function() { verifyWrapperHeight(); }, 1250);
    }

    // go out and get the hotspots first
    var applyHotspotImg = config.images[current_index];
    if (config.hotspotURL) {
        $.ajax({
        url: config.hotspotURL,
        dataType: "script",
        timeout: 10000,
        success: function(data) {
            /* attach this function to the HGTV property to be accessed outside of this closure */
            SNI.HGTV.buildProductsTab = function () {
            var endframe_products = [];
            applyHotspots(applyHotspotImg);
            var count = 0;

            default_product_img_sm.src = config.default_product_image_sm;
            default_product_img_lg.src = config.default_product_image_lg;

            $(config.images).each(function() {
                var image = this;
                var product_image_url;
                var even_class;
                if (image.bhs != 0) {
                $(SNI.HGTV.Photogallery4.Hotspots.images).each(function() {

                    $(this.name).each(function() {
                        alert(this.html);
                        $(this).html( SNI.Util.Ellipsize(this, 45) );
                    });             

                    if (image.iid == this.id) {
                    $(this.hotspots).each(function() {
                        count++;
                        even_class = "";
                        product_image_url = this.imageURL;

                        if (this.imageURL == "null" || this.imageURL == "" || this.imageURL == null) {
                        product_image_url = default_product_img_sm.src;
                        }

                        if ((count % 2) == 0) {
                        even_class = " even";
                        }

                        endframe_products.push('<li class="clrfix hs-product' + even_class + '">' +
                                        '<div class="pg-endframe-product-img">' +
                                             '<a href="' + this.url + '"><img src="' + product_image_url + '" /></a>' +
                                         '</div>' + 
                                         '<p><a href="' + this.url + '">' + this.name + '</a></p>' + 
                                     '</li>');
                    });
                    }
                });
                }
            });

            if (endframe_products.length > 0) {

                var endframe_products_list = $('.products').append($('<span class="pg-close-btn">x</span><ul class="pg-endframe-products">' + endframe_products.join("\n") + '</ul>'));
                var $endframe_products = endframe_products_list.find("li.hs-product");

                $($endframe_products[$endframe_products.length - 1]).addClass("last");
                endframe_container.find(".pg-close-btn").click(function() {
                endframe_container.hide();
                $('.pg-photo-display-wrapper .mask').remove();
                });

                if (($endframe_products.length % 2) == 0) {
                // add last class to 2nd last item if even number
                $($endframe_products[$endframe_products.length - 2]).addClass("last");
                } else {
                $('<li class="last"></li>').appendTo(endframe_products_list);
                }

                $(".pg-endframe .tabs .ymal-btn .btn").click(function() {
                $(".pg-endframe .tabs .products-btn .btn").removeClass("sel");
                $(this).addClass("sel");
                $(".pg-endframe-content .products").hide();
                $(".pg-endframe-content .recommend").fadeIn("fast");
                });
                $(".pg-endframe .tabs .products-btn .btn").click(function() {
                $(".pg-endframe .tabs .ymal-btn .btn").removeClass("sel");
                $(this).addClass("sel");
                $(".pg-endframe-content .recommend").hide();
                $(".pg-endframe-content .products").fadeIn("fast");
                });
                $(".products-btn").show();
                $(".pg-endframe .tabs .ymal-btn .btn").click();
            }

            else {
                // remove "tabbed" class and hide tab
                $(".pg-endframe .tabs .ymal-btn .btn").hide();
                $(".pg-endframe").removeClass('tabbed');
            }

            gallery_element.trigger("endframe-render-complete", {
                gallery: gallery
            });

            };

            // build endframe products
            $("head").append('<script type="text/javascript">' + data + ' \n SNI.HGTV.buildProductsTab(); </script>');
        },
        complete: function() {
            loadPhotoInfo(current_index, true);
            applyHotspots(config.images[current_index]);
        }
        });
    }

    thumbnails_button.click(gallery.toggleThumbnails);

    thumbnails_frame.find(".pg-thumbnails li").each(function(index) {
        var thumb = $(this);
        var resetNextForInterstitial = false;
        thumb.click(function(e) {
        if ( $('.photo-gallery').hasClass('interstitial-show') ) {
            $('.photo-gallery').removeClass('interstitial-show');
            resetNextForInterstitial = true;
        }
        $('.photo-gallery').removeClass('interstitial-show');
        dyn_load_origin = "Thumbnail";
        gallery.goToPhoto(index, e);
        gallery.hideThumbnails(e);
        $(gallery_element).trigger("click-thumbnail", {
            gallery: gallery,
            thumb: thumb
        });
        if (resetNextForInterstitial) {
            next_button.click();
        }
        e.stopPropagation();
        });
    });

    thumbnails_frame.click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function(e) {
        gallery.hideThumbnails(e);
    });

    previous_button.click(gallery.previousPhoto);

    gallery_element.find(".pg-error .btn").bind("click", function(e) {
        gallery.goToPhoto(0);
        photo_display_parent.show();
        e.preventDefault();
    });

    next_button.click(gallery.nextPhoto);

    // endframe functions
    endframe_container.find(".pg-close-btn").click(function() {
        endframe_container.hide();
        $('.pg-photo-display-wrapper .mask').remove();
    });
    endframe_container.find(".replay").click(gallery.nextPhoto);
    
    endframe_container.find("div.thumb a,h3 a.next-title,div.content h4 a").click(function(e) {
        var link = $(this);
        var title = link.attr("title") || link.text();
        var params = {
        section: "HGTV Made Remade Blog: Photo Gallery",
        module: "EF:" + config.gallery_title,
        linkText: "Related Photo Gallery: " + title
        };
        SNI.Omniture.dynamicSingleVar(params);
    });

    /*
     * Addon function to SNI.HGTV.DynamicAds to override show of interstitial ads
     * @addon
     */
    SNI.HGTV.DynamicAds.init({
        container: gallery_element,
        insert_tgt: photo_display,
        dismiss_elts: [next_button, previous_button]
    });
        return gallery;
        };

    // Exposing/attaching PhotoGallery class to global scope
    SNI.HGTV.PhotoGallery5 = PhotoGallery;
})(jQuery);
