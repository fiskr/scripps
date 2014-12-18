/* instantiate object namespace */
if(typeof(SNI.HGTV.DreamHome)=='undefined') {
    SNI.HGTV.DreamHome = {};
}
	
	
SNI.HGTV.DreamHome.Medialibrary = function(element, config) {

    // prime the toggles for the video channels
    togglelist = $(element).find('li.switch');

    carouselCount = 0;
    togglelist.each(function(){

        var $this = $(this);

        // click target for li toggle
        var target = $this.find("h4");

        //			if (carouselCount < 4) {
        //				$this.addClass("selected");
        //			}


        // hide carousel if active class not present
        if (!$this.hasClass("selected")) {
            //$this.find(".bd").hide();
            $this.find(".channel-bd").hide();
        }

        target.click(function(){
            if ($this.hasClass("selected")) {
                $this.removeClass("selected");
                //$this.find(".bd").hide();
                $this.find(".channel-bd").hide();
            } else {
                $this.addClass("selected");
                //$this.find(".bd").show();
                $this.find(".channel-bd").show();
            }

            carouselCount++;
        //alert("Hello HGTV")
        });
    });
};	// end Medialibrary


/*
 * 	Deprecated in favor of floorplan.js.
 */

SNI.HGTV.DreamHome.flashtour = function() {
    var pageId = mdManager.getParameter('DetailId');
    var pageIds = [
    {
        tour:'5946059',
        photoGallery:'6023377',
        video:'29860',
        name:"Front"
    },

    {
        tour:'5946070',
        photoGallery:'6023399',
        video:'29855',
        name:"Entry Hall"
    },

    {
        tour:'5946077',
        photoGallery:'6023411',
        video:'29843',
        name:"Great Room"
    },

    {
        tour:'5946076',
        photoGallery:'6023409',
        video:'29865',
        name:"Kitchen"
    },

    {
        tour:'5946078',
        photoGallery:'6023413',
        video:'29859',
        name:"Walk-through Pantry"
    },

    {
        tour:'5946079',
        photoGallery:'6023415',
        video:'29861',
        name:"Dining Room"
    },

    {
        tour:'5946064',
        photoGallery:'6023387',
        video:'29851',
        name:"Home Theater"
    },

    {
        tour:'5946060',
        photoGallery:'6023379',
        video:'29864',
        name:"Master Suite"
    },

    {
        tour:'5946062',
        photoGallery:'6023383',
        video:'29857',
        name:"Master Bathroom"
    },

    {
        tour:'5946061',
        photoGallery:'6023381',
        video:'29848',
        name:"Master Closet"
    },

    {
        tour:'5946063',
        photoGallery:'6023385',
        video:'29850',
        name:"Sunrise Room"
    },

    {
        tour:'5946065',
        photoGallery:'6023389',
        video:'29844',
        name:"Laundry Room"
    },

    {
        tour:'5946066',
        photoGallery:'6023391',
        video:'29858',
        name:"Kids Bedroom"
    },

    {
        tour:'5946068',
        photoGallery:'6023395',
        video:'29847',
        name:"Jack & Jill Bathroom"
    },

    {
        tour:'5946067',
        photoGallery:'6023393',
        video:'29845',
        name:"Guest Bedroom"
    },

    {
        tour:'5946081',
        photoGallery:'6023419',
        video:'29846',
        name:"Home Office"
    },

    {
        tour:'5946073',
        photoGallery:'6023405',
        video:'29862',
        name:"Motor Court"
    },

    {
        tour:'5946074',
        photoGallery:'6023407',
        video:'29863',
        name:"Casita"
    },

    {
        tour:'5946080',
        photoGallery:'6023417',
        video:'29849',
        name:"Casita Patio"
    },

    {
        tour:'5946069',
        photoGallery:'6023397',
        video:'29856',
        name:"Three Car Garage"
    },

    {
        tour:'5946072',
        photoGallery:'6023403',
        video:'29854',
        name:"Back Patio"
    },

    {
        tour:'5946071',
        photoGallery:'6023401',
        video:'29852',
        name:"Recycling Room"
    }
    ];
    var flashvars = {};
    var idFound = false;
    /* this is the default setting [living room], if you're on neither a tour page nor a photo gallery page */
    flashvars.startHereRoomId = '5946059';
    for (var i=0; i < pageIds.length; i++) {
        for ( pageType in pageIds[i] ) {
            if ( pageIds[i][pageType] == pageId ) {
                flashvars.selectedRoomId = pageIds[i].tour;
                flashvars.startHereRoomId = null;
                idFound = true;
                break;
            }
        }
        if ( idFound == true ) {
            break;
        }
    };
    var params = {
        allowscriptaccess: 'always'
    };
    swfobject.embedSWF('http://web.hgtv.com/webhgtv/hg20/pkgs/2010/dh/swf/floorplan.swf', 'floorplan-container', '323', '280', '9.0.0', null, flashvars, params);
};


(function($) {
    SNI.HGTV.photogalleryTracking = function () {
        var rendered_images_manager = {}, $gallery_element;

        /* each time a photo is loaded, we save it in the "rendered_images" array to prevent from doing the work again */
        $(document).bind("load-photo-complete", function(e, params) {
            /* default to handle initial page load */
            $gallery_element = params.element || $(".photo-gallery4");

            //            console.log("current_data", params.photo)
            if($gallery_element) {

                // "More" link click - "HGTV : Photo Gallery : (current photo gallery title) : Caption - More"
                $gallery_element.find(".pg-viewport .pg-photo-description .pg-show-caption").click(function(){
                    //                    console.log("more clicked");
                    SNI.Omniture.dynamicSingleVar({
                        section: "HGTV",
                        module: "Photo Gallery",
                        linkText: params.gallery.title + " : Caption - More",
                        element: $(this)
                    });
                });
                
                if(!rendered_images_manager[params.photo.iid] ) {
                    $gallery_element.find(".pg-viewport .pg-you-might-like ul li a").click(function(){
                        // "You Might Also Like" link click - "HGTV : Photo Gallery : (current photo gallery title) : You Might Also Like : (link title)"
                        if($(this).is("a")) {
                            SNI.Omniture.dynamicSingleVar({
                                section: "HGTV",
                                module: "Photo Gallery",
                                linkText: params.gallery.title + " : " + $(this).text().trim(),
                                element: $(this)
                            });
                        }
                    });
                }

                rendered_images_manager[params.photo.iid] = params.photo;

            }
        //            console.log("load-photo-complete", params);
        });

        /*
//        $(document).bind("previous-photo", function(e, params) {
            // "Previous Photo" click - "HGTV : Photo Gallery : (current photo gallery title) : Previous (prev. photo number)"
//            SNI.Omniture.dynamicSingleVar({
//                section: "HGTV",
//                module: "Photo Gallery",
//                linkText: params.gallery.title + " : Previous " + (params.index+1),
//                element: params.element
//            });
//            console.log("previous-photo", params);
//        });

        $(document).bind("next-photo", function(e, params) {
            // "Next Photo" click - "HGTV : Photo Gallery : (current photo gallery title) : Next (next photo number)"
            SNI.Omniture.dynamicSingleVar({
                section: "HGTV",
                module: "Photo Gallery",
                linkText: params.gallery.title + " : Next " + (params.index+1),
                element: params.element
            });
//            console.log("next-photo", params);
        });
        */

        $(document).bind("show-thumbnails", function(e, params) {
            // "View Thumbnails" click - "HGTV : Photo Gallery : (current photo gallery title) : Thumbnails"
            SNI.Omniture.dynamicSingleVar({
                section: "HGTV",
                module: "Photo Gallery",
                linkText: params.gallery.title + " : Thumbnails",
                element: params.element
            });
//            console.log("show-thumbnails", params);
        });
        /*
        $(document).bind("click-thumbnail", function(e, params) {
            // "View Thumbnails" click - "HGTV : Photo Gallery : (current photo gallery title) : Thumbnails"
            var image = $(this).find("img");
            SNI.Omniture.dynamicSingleVar({
                section: "HGTV",
                module: "Photo Gallery",
                linkText: params.gallery.title + " : Thumbnail : " + $(image).attr("alt"),
                element: $(image)
            });
//            console.log("click-thumbnail", params);

        });
        */
        $(document).bind("endframe-render-complete", function(e, params) {
            // end frame link clicks - "HGTV : Photo Gallery : End Frame : (current photo gallery title) : (Link Name)

            $gallery_element = params.element || $(".photo-gallery4");

            if($gallery_element) {
                // "More" link click - "HGTV : Photo Gallery : (current photo gallery title) : Caption - More"
                $gallery_element.find(".pg-viewport .pg-endframe a").click(function(){
                    var title_text = $(this).text().trim();
                    title_text = (title_text.length > 0) ? title_text : $(this).attr("title");
                    SNI.Omniture.dynamicSingleVar({
                        section: "HGTV",
                        module: "Photo Gallery : End Frame",
                        linkText: params.gallery.title + " : " + title_text,
                        element: $(this)
                    });
                });

            }
        //            console.log("endframe-render-complete", params);
        });

    }
})(jQuery);

