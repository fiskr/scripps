//load overlay


HGTV.M.overlay={};
HGTV.M.overlay.mobileDescriptor={};
HGTV.M.overlay.EndecaResults = [];
HGTV.M.overlay.EndecaResultsCurrent=[];
HGTV.M.overlay.flyoutTimer;

HGTV.M.overlay.galleryCurrentPosition = -1;
HGTV.M.overlay.currGalleryIndex = -1; //set to 0 on initial mData request
HGTV.M.overlay.loaderElement ="";
HGTV.M.overlay.YMALGalleries = [];
HGTV.M.overlay.galleriesMetaData = new Array();
/* MM-5545 --> MM-5546, MM-5547 - an object to hold the gallery images as we load them */
HGTV.M.overlay.imagesIndex = {};
/* MM-5545 --> MM-5546, MM-5547 - image index - which one are we looking at right now? */
HGTV.M.overlay.currImageIndex = -1;

HGTV.M.overlay.ajax;


var windowHeight = window.innerHeight || $(window).height();
var windowWidth = window.innerWidth || $(window).width();

//control for ad behavioral instructions for interstitial (HOME-218)
HGTV.M.overlay.mobileDescriptor={
    enabled: "false",
    adtype :            "PHOTO_DESCRIPTOR_MOBILE",
    refreshRate :       "",
    descriptorStatus :  0
};

HGTV.M.overlay.socialShare = {"share": 
    [
        { 
            "name" : "Pinterest",
            "class" : "icon-pinterest-sign",
            "url" : "http://pinterest.com/pin/create/button/?url=",
            "params" : ["media", "description"]
        },
        {
            "name" : "Facebook",
            "class" : "icon-facebook-sign",
            "url" : "https://www.facebook.com/sharer.php?u="
        },
        {
            "name" : "Twitter",
            "class" : "icon-twitter-sign",            
            "url" : "http://twitter.com/share?url=",
            "params" : ["text"]
        },
        {
            "name" : "Google+",
            "class" : "icon-google-plus-sign",            
            "url" : "https://plusone.google.com/_/+1/confirm?hl=en-US&amp;url="
        },
        {
				      "name" : "StumbleUpon",
				      "class" : "icon-stumbleupon-sign",            
				      "url" : "https://www.stumbleupon.com/submit?url="
				  },
				  {
            "name" : "Email",
            "class" : "icon-email-sign",            
            "url" : "mailto:?",
            "params" : ["subject", "body"]
        }
    ]
			     };
var orientationTimeout;
function orientationChangeHandler(e) {
 clearTimeout(orientationTimeout);
    orientationTimeout = setTimeout( function(){ 
        $('html, body').scrollTop(0); 
        HGTV.M.overlay.setWidthImgContainer();
    }, 500);
}

HGTV.M.overlay.setWidthImgContainer = $.throttle(50, function (slide) {
    var imgContainer = $("#overlay .img-container");

    if (imgContainer.length) {
      windowHeight = window.innerHeight || $(window).height();
      windowWidth = window.innerWidth|| $(window).width();
   
        //windowWidth = window.innerWidth || $(window).width();
        if (windowHeight != undefined || windowWidth != undefined) {

 
                if (slide){
                    $(slide).find(".img-container").css({"height": parseInt(windowHeight *.90), "width": windowWidth});
                }else {
                    //alert("windowHeight" + parseInt(windowHeight *.90));
                    $("#overlay .img-container").css({"height": parseInt(windowHeight *.90), "width": windowWidth});
                }
            $(window).trigger('resize');
                
        }
    }

});

/* MM-5545 --> MM-5546, MM-5547 - update the images object
 * and update if this image gallery (identified by DetailId) doesn't already exist
*/
HGTV.M.overlay.updateImages = function(meta) {
    if(!HGTV.M.overlay.imagesIndex[meta.DetailId]) {
        HGTV.M.overlay.imagesIndex[meta.DetailId] = meta['images'];
    }
}

/*
 *   GENERATES SHARE URL FOR DIFFERENT PARAMETERS
 */
HGTV.M.overlay.generateShareUrl = function(url, params, slide) {
    if (slide != undefined) {
        var encodedURL = (slide != undefined) ?  encodeURIComponent( "http://" + location.host + slide.attr("data-href") ) : "";
        var urlOut=url + encodedURL;
        var paramValue;
        var galleryTitle = $("#now-viewing span").text();
        var photoTitle = slide.find(".rsContent h1").text();
        var imgSrc = slide.find(".img-container img").attr("src");

        if (params != undefined) {
            $.each(params, function(index, item){
                switch (item) {
                    case "media":
                    paramValue =  encodeURIComponent( imgSrc );
                    break;

                    case "description":
                    paramValue =  encodeURIComponent( ( ($.trim(photoTitle) !="") ? photoTitle+ " in " : "" )  + ( ($.trim(galleryTitle) !="") ? galleryTitle : "" ) + " from HGTV" );
                    break;

                    case "text":
                    paramValue =  encodeURIComponent( ( ($.trim(photoTitle) !="") ? photoTitle : galleryTitle ) + " from @ HGTV" );
                    break;

                    case "subject":
                    paramValue =  encodeURIComponent( "Check out this page on HGTV" );
                    break;

                    case "body":
                    paramValue =  encodeURIComponent( "I thought you would be interested in this page on HGTV: \n" + "http://" + location.host + slide.attr("data-href") );
                    break;                

                    default:
                    break;
                }
                urlOut += "&amp;"+ item +"="+ paramValue;
            });
        }
	return urlOut;
    }
};

/*
 *   GENERATES SHARE URL FOR DIFFERENT PARAMETERS
 */
HGTV.M.overlay.updateShare = function(slide){
    var socialShareList = ""
    $.each(HGTV.M.overlay.socialShare.share, function(index, obj){
        socialShareList += '<li><a href="'+ HGTV.M.overlay.generateShareUrl( obj.url, obj.params, slide ) +'" target="_blank" class="'+ obj.class +'"><strong>'+ obj.name +'</strong></a>';
    });
    $("#overlay .share .dropdown-menu ul").html(socialShareList);
};

HGTV.M.overlay.addLoader = function ($element) {
    if ($element != undefined) {
        HGTV.M.overlay.loaderElement = $element;
        $("<div/>", {"class": "loader"}).appendTo($element);
    }
}

HGTV.M.overlay.removeLoader = function(){
    if (HGTV.M.overlay.loaderElement != ""){
        HGTV.M.overlay.loaderElement.find(".loader").remove();
    }
}

HGTV.M.overlay.addOverlay = function(){
    var overlay = '<aside id="overlay" style="display:none"> \
<header class="tool-belt clrfix"> \
<div class="dropdown share"> \
<a  class="button dropdown-toggle icon-">Share </a> \
<div class="dropdown-menu share-photo"> \
<ul> \
</ul> \
</div> \
</div> \
<div class="logo"> \
<span class="icon-">&#xf500;</span> \
</div> \
<a href="#" class="button close">Done</a> \
</header> \
<section class="body"></section> \
<div id="overlay-loader" class="loader"></div> \
</aside>';
    $("body").append(overlay);

    //binds functionality for overlay
    $("#overlay").find(".body").click( function (event){
            var $this = $(this);
            HGTV.M.overlay.removeFlyout();

            if (!$this.parent("#overlay").find(".tool-belt").hasClass("slide-up") ){
              $this.parent("#overlay").find(".dropdown").removeClass("open");  
              $this.parent("#overlay").find(".tool-belt").addClass('slide-up');
            } else {
              $this.parent("#overlay").find(".tool-belt").removeClass('slide-up');
            }

        }
    ).end().find(".tool-belt").click(
        function (event){
            event.stopPropagation();
        }
    ).end().find(".close").click( function(event){
        event.preventDefault();
        var $this = $(this);
        var $overlay = $this.parents("#overlay");
        var windowPosition = $overlay.attr('data-pos');

        // OMNITURE tracking call on closing overlay
	HGTV.M.overlay.resetPGMetadata();
        HGTV.M.overlay.destroySlideshow();
        $overlay.removeClass("show");
        $overlay.find(".body").removeClass("fade");
        setTimeout(function(){
            $overlay.hide();
            $("#site, #site-nav, #ad_wrapper").removeClass("hide");
            $("body").removeClass("overlay-bg");
            if (windowPosition){
                $('html, body').scrollTop(windowPosition);
            }      
        }, 500);
	//refresh sticky ad
	refreshMobileBannerAd('#ad_wrapper > div', 1);
    });

    HGTV.M.overlay.updateShare();

    document.getElementById("overlay-loader").addEventListener('touchmove', function(e) {
	// This prevents native scrolling from happening.
	e.preventDefault();
    }, false);
};



HGTV.M.overlay.resetPGMetadata = function() {
    HGTV.M.overlay.isPhotoGallery = false;
    /* MM-5545 --> sub-task MM-5552: reset the index so that all of the data will return to its initial state */
    HGTV.M.overlay.currGalleryIndex = -1;
    HGTV.M.overlay.updateMetadata(HGTV.M.overlay.originalMetadata);
    /* empty out the images object and reset the index */
    HGTV.M.overlay.imagesIndex = {};
    HGTV.M.overlay.currImageIndex = -1;
    HGTV.M.overlay.galleriesMetaData = [];
    HGTV.M.overlay.currGalleryCount = 0;
}

HGTV.M.overlay.destroySlideshow = function(){
    var slider = $("#slideshow").data('royalSlider');
    slider.destroy(); 
    //Reset slideshow objects
    HGTV.M.overlay.YMALGalleries = [];
    HGTV.M.overlay.EndecaResults = [];
    HGTV.M.overlay.EndecaResultsCurrent = [];
}


/*
 * FUNCTION TO SHOW THE OVERLAY AND HIDE THE SITE CONTENT AND NAV
 */

HGTV.M.overlay.show = function() {
    var $overlay = $("#overlay");
    var windowPosition = $(window).scrollTop();
    $overlay.attr("data-pos", windowPosition)
        HGTV.M.overlay.removeLoader();
          $overlay.show().addClass("show");
        $("#site, #site-nav, #ad_wrapper").addClass("hide");
        $("body").addClass("overlay-bg");
}

/*
 * REMOVES THE GALLERY FLYOUT
 */
HGTV.M.overlay.removeFlyout = function() {
    var $overlay = $("#overlay");
    $overlay.find("#slideshow .rsArrow").addClass("rsHidden");
    $overlay.find("#now-viewing").removeClass("slide-out");
    clearTimeout(HGTV.M.overlay.flyoutTimer);
}

/*
 * DISPLAYS THE GALLERY FLYOUT AND SETS A TIMEOUT TO HIDE IT AFTER 5 SECONDS
 */
HGTV.M.overlay.triggerFlyout = function() {
    var $flyout = $("#overlay #now-viewing");
        $flyout.addClass("slide-out");
        // remove onboarding after 5 seconds
        HGTV.M.overlay.flyoutTimer = setTimeout(function(){
             $flyout.removeClass("slide-out");
        },5400);
}

HGTV.M.overlay.updateFlyout = function(currentPos){
    var $flyout = $("#now-viewing");
    
    if (currentPos >= 0){
        if (HGTV.M.overlay.YMALGalleries[currentPos].title != "") {
            //console.log(HGTV.M.overlay.YMALGalleries[currentPos].title);
            //console.log(HGTV.M.overlay.YMALGalleries[currentPos].assetId);
            $flyout.find("span").text(HGTV.M.overlay.YMALGalleries[currentPos].title);
        }
    }
}

HGTV.M.overlay.removeInterstitial = function() {
    HGTV.M.overlay.showOverlay( $('#overlay') );
    removeOrientationChangeEvent();
    $('div.overlay-ad').remove();
}

HGTV.M.overlay.requestAd = function () {
    MobileInterstitialAd(1);
}

HGTV.M.overlay.hideOverlay = function ($overlay) {
    var adStyles = {
	'position':'absolute',
	'top':'0', 
	'visibility':'hidden'
    };
   
    var $rs = $overlay.find('.rsOverflow');
    HGTV.M.overlay.rsHeight = $rs.css('height');
    HGTV.M.overlay.rsWidth = $rs.css('width');
    $rs.css('display','none');

    $overlay.find('header.tool-belt').css(adStyles); 
    $overlay.find('section.body').css(adStyles).delay(500).css('min-height', $(window).height());
    $overlay.css({
	'height':$('.overlay-ad').height(),
	'width': $('.overlay-ad').width()
    });
}

HGTV.M.overlay.showOverlay = function ($overlay) {
    var adLess = {
	'position':'relative',
	'top':'auto',
	'visibility':'visible'
    };
    $overlay.find('header.tool-belt').css(adLess); 
    $overlay.find('section.body').css(adLess);

    var $rs = $overlay.find('.rsOverflow');
    $rs.css({
	'display': 'block',
	'height': $overlay.height(),
	'width': $overlay.width()
    });
    $overlay.css({'height':'auto','width':'auto'});
}


// updates share dropodown with currentSlides share links
/*
 * INITIALIZES EACH SLIDE CALL. 
 * -- UPDATES SHARE LINKS IN TOOLBAR
 * -- DISPLAY DESCRIPTION FOR EACH SLIDE
 * -- TRIGGERS FLYOUT IF SLIDE IS FIRST IN GALLERY
 */
HGTV.M.overlay.initSlide = function(slider) {
    var currentSlide = slider.currSlide.content;
    //update Share buttons
    HGTV.M.overlay.updateShare(currentSlide);
    /* MM-5545 --> MM-5546, 5547 - update the index to the current slide, based on the data-href value */
    HGTV.M.overlay.currImageIndex = HGTV.M.overlay.lookForImageIndex(currentSlide.attr('data-href') || currentSlide[0].attributes[0].value);
    //Metadata and Tracking
    HGTV.M.overlay.updateMetadata( currentSlide.data('metadata'), slider.currSlideId );
    $.ajax({//SE-10512 -- comScore candidate pageview
        dataType: 'json',
        cache: false,
        url: '/cr/cda/javascript/comScore.marker.json',
        async: true
    }).done(function(data) {
        //console.log('comScore sent');
    }).error(function(jqXHR,textStatus,errorThrown) {
        return true;
    });

    //remove hidden class which fades text in
    currentSlide.find('.rsContent').removeClass('hidden');    
    
    if ( $(currentSlide).hasClass('trigger-flyout') ) {
        HGTV.M.overlay.triggerFlyout();
    }
};
HGTV.M.overlay.addEmptySlide = function (slider, index) {
    var emptySlide = '<div class="slide empty-slide"></div>';
    slider.appendSlide( emptySlide, index );
}
HGTV.M.overlay.removeEmptySlide = function (slider) {
    if ($(slider.currSlide.content).hasClass("empty-slide") ){
        slider.removeSlide(slider.currSlideId);
        HGTV.M.overlay.initSlide(slider);
    }

}

HGTV.M.overlay.getGalleryMetadata = function(assetId) {
    $.ajax({
	dataType: 'json',
	url: '/hgtv/cda/modules/articleMetadata/0,,ARTICLE-DETAIL_HGTV___' + assetId + '_ARTICLE-DETAIL_no_,00.html',
	async: false
    }).done(function(data) {
        /* MM-5545 --> MM-5546, MM-5547 - properly updating the index information */
        HGTV.M.overlay.currGalleryIndex++;
        HGTV.M.overlay.galleriesMetaData[HGTV.M.overlay.currGalleryIndex] = data;
        /* MM-5545 --> MM-5546, MM-5547 - updating images object so we can keep track */
        HGTV.M.overlay.updateImages(data);

    }).error(function(jqXHR,textStatus,errorThrown) {
	return true;
    });
}

/* Interstitial ad control */
//build ad call to retrieve the mobile gallery interstial settings from adserver in JSON format
HGTV.M.overlay.getDescriptorResponse = function() {
    var descriptorCall;
    descriptorCall = getDartEnterpriseUrl(HGTV.M.overlay.mobileDescriptor.adtype, 1) + '&params.styles=' + SNI.DynamicAds.ixCfg.param_styles + '&callback=?';
    //update status in mobileDescriptor object
    HGTV.M.overlay.mobileDescriptor.descriptorStatus = 'requestBuilt';
    return descriptorCall;
}

//make ajax call and parse JSON response, changing values in HGTV.M.overlay.mobileDescriptor object
HGTV.M.overlay.parseDescriptorResponse = function (adCall) {
    if(HGTV.M.overlay.mobileDescriptor.descriptorStatus == 'requestBuilt'){
         $.ajax({
            dataType: 'json',
            url: adCall,
            async: true//was false
        }).done(function (data) {
            HGTV.M.overlay.mobileDescriptor.refreshRate = data.photo_descriptor.refreshRate;
            HGTV.M.overlay.mobileDescriptor.enabled = data.photo_descriptor.active;
            HGTV.M.overlay.mobileDescriptor.descriptorStatus = 'requestComplete';
        }).error(function (jqXHR, textStatus, errorThrown) {
             HGTV.M.overlay.mobileDescriptor.refreshRate = 10;
             HGTV.M.overlay.mobileDescriptor.enabled = "true";
             HGTV.M.overlay.mobileDescriptor.descriptorStatus = 'requestIncomplete';
            return true;
        });
    }
}

/*
 * INITIALIZES ROYAL SLIDER
 */
HGTV.M.overlay.initGallery = function(linkURL, assetId) {    
    var sliderObject = $("#slideshow");
    var slideIndex = sliderObject.find('.slide[data-href="'+linkURL+'"]').index();
    var $overlay = $("#overlay");
    HGTV.M.overlay.isPhotoGallery = true;

    var lastTab = slideIndex;
    if (lastTab === -1) {
        lastTab = 0;
    }

    //initialize Royal Slider plygb
    sliderObject.royalSlider({
        autoHeight: true,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        sliderTouch: true,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        imageScaleMode: 'none',
        imageAlignCenter:false,
        loopRewind: false,
        numImagesToPreload: 1,
        keyboardNavEnabled: true,
        usePreloader: false,
        navigateByClick: false,
        startSlideId: lastTab
    });

    var slider = sliderObject.data('royalSlider');
    var slideCounter =1;
    // height of image container



    //reference HGTV.M.overlay.mobileDescriptor
    //test var descriptorStatus value. should be 0, ie ad call not built yet;
    if(HGTV.M.overlay.mobileDescriptor.descriptorStatus == 0){
        //build ad call
        var adCall = HGTV.M.overlay.getDescriptorResponse();
        //console.log('descriptorStatus function will return ' + adCall);
        //retrieve JSON response from adserver
        HGTV.M.overlay.parseDescriptorResponse(adCall);
    }




    //bind orientation change
    $(window).on('orientationchange', orientationChangeHandler);
    // set height of onboarding
    $("#slideshow .rsArrow").css({"height": parseInt(windowHeight *.90)});
    HGTV.M.overlay.addEmptySlide(slider);

    setTimeout(function () {
        $('html, body').scrollTop(0); 
        HGTV.M.overlay.setWidthImgContainer();
      }, 1000); 

    // slider.ev.on('rsDragStart', function(event) {
    //     // mouse/touch drag start
    //     HGTV.M.overlay.setWidthImgContainer();
    // });

    slider.ev.on('rsAfterContentSet', function(e, slideObject) {
    // fires when every time when slide content is loaded and added to DOM
        HGTV.M.overlay.setWidthImgContainer();
        if($overlay.find(".body").hasClass("fade") != true){

            setTimeout(function(){
                $overlay.find(".body").addClass("fade");

            },500);
        }

    });



    slider.ev.on('rsAfterSlideChange', function(event) {
        // triggers after slide change

        // test to avoid fake swipe 
        if(slider.currSlideId !== lastTab) {
            lastTab = slider.currSlideId;
            $('html, body').scrollTop(0);        
            HGTV.M.overlay.initSlide(slider);
                HGTV.M.overlay.setWidthImgContainer($("#slideshow").find(".rsSlide").first());	
                HGTV.M.overlay.setWidthImgContainer($("#slideshow").find(".rsSlide").last() );
            }
        if ( event.currentTarget._horDir == -1){
            if ($(slider.currSlide.content).hasClass("trigger-flyout")){
                HGTV.M.overlay.galleryCurrentPosition = HGTV.M.overlay.galleryCurrentPosition+1;
                HGTV.M.overlay.updateFlyout( HGTV.M.overlay.galleryCurrentPosition );
            }
        }

        if ( event.currentTarget._horDir == 1){ 
            if ($(slider.currSlide.content).hasClass("last") ){
                HGTV.M.overlay.galleryCurrentPosition = HGTV.M.overlay.galleryCurrentPosition-1;
                HGTV.M.overlay.updateFlyout( HGTV.M.overlay.galleryCurrentPosition ); 
            }
        }
        //console.log("galleryNextGalleryPosition" + HGTV.M.overlay.galleryCurrentPosition);

	
            if (slider.currSlideId >= (slider.numSlides-2) && event.currentTarget._horDir == -1){

            }
        // get next slides
        if ( slider.currSlideId >= (slider.numSlides-1) && event.currentTarget._horDir == -1){

            if (HGTV.M.overlay.YMALGalleries != "" && ( HGTV.M.overlay.galleryCurrentPosition + 1 ) < HGTV.M.overlay.YMALGalleries.length) {
                HGTV.M.overlay.getNextGallery( HGTV.M.overlay.YMALGalleries[HGTV.M.overlay.galleryCurrentPosition+1].assetId, slider );
            }
        }

        //Interstitial advertisement displays every x slide changes (determined by adserver via ajax call & json response
        if (slideCounter % HGTV.M.overlay.mobileDescriptor.refreshRate == 0 ) HGTV.M.overlay.requestAd();

        //if (slideCounter % 10 == 0 ) HGTV.M.overlay.requestAd();

        slideCounter++;
    });

    // remove onboarding when user interacts
    slider.ev.on('rsDragStart', function(event) {
        HGTV.M.overlay.removeFlyout();
    });
    
    
    // remove onboarding after 5 seconds
    setTimeout(function(){HGTV.M.overlay.removeFlyout()},5000);
    
     HGTV.M.overlay.initSlide(slider);
    // else slider.goTo(slideIndex);
}

HGTV.M.overlay.objKeysToLowerCase = function(obj) {
    for(var key in obj) {
	lkey = key.toLowerCase();
	if (! obj.hasOwnProperty(lkey)) obj[lkey] = obj[key];
    }
    return obj;
}


/* MM-5545 --> MM-5546,MM-5547
 * added this to look for the index of the image we're currently looking at on-screen;
 * also, we're updating the currGalleryIndex BECAUSE otherwise we'll continue looking at
 * the wrong Gallery for Metadata information
 * This way, if we're traversing back through the gallery and we hit the previous
 * gallery, this will be changed and now the Metadata will be correct
*/
HGTV.M.overlay.lookForImageIndex = function(url) {
    var new_index = -1;
    for(key_id in HGTV.M.overlay.imagesIndex) {
        var imgs = HGTV.M.overlay.imagesIndex[key_id];
        for(var ind = 0; ind < imgs.length; ind++) {
            if(imgs[ind].pgUrl === url) {
                new_index = ind;
                /* reset the silly currGalleryIndex */
                if(!Array.prototype.map) {
                    /* lt ie8 does not necessarily have Array.map, so... */
                    for(var index=0; index < HGTV.M.overlay.galleriesMetaData.length; index++) {
                        if(HGTV.M.overlay.galleriesMetaData[index].DetailId == key_id) {
                            HGTV.M.overlay.currGalleryIndex = index;    
                        }
                    }
                } else {
                    HGTV.M.overlay.currGalleryIndex = HGTV.M.overlay.galleriesMetaData.map(function(el) {
                        return key_id === el.DetailId ? key_id : null;
                    }).indexOf(key_id);
                }
            }
        }
    }
    return new_index;
}

HGTV.M.overlay.updateMetadata = function(data, index) {
    var pgMetadata = HGTV.M.overlay.galleriesMetaData[HGTV.M.overlay.currGalleryIndex]; 
    var mdata = ( pgMetadata ) ? pgMetadata : data;
    /* HOME-72: bypass metadata update if current slide is not an actual image */
    //test
    if (! mdata || (HGTV.M.overlay.isPhotoGallery && HGTV.M.overlay.currImageIndex === -1)) return false;
    /* MM-5545 --> MM-5547: fixing the page number issue for Photo Galleries by tracking the correct index */
    var ind = HGTV.M.overlay.currImageIndex !== -1 && HGTV.M.overlay.isPhotoGallery ? HGTV.M.overlay.currImageIndex : index;
    mdata = HGTV.M.overlay.objKeysToLowerCase(mdata);
    for(key in HGTV.M.overlay.mdKeys) {
	var lkey = key.toLowerCase();
        if (ind != 0 && lkey == 'url' && HGTV.M.overlay.isPhotoGallery) {
            mdManager.setParameter(lkey, mdata[lkey].replace('index.html', 'page-' + (ind+1) + '.html'));
        } else if(HGTV.M.overlay.isPhotoGallery) {
            /* MM-5546 - replace the uniqueid parameter */
            if(lkey === 'uniqueid') {
                var patt = /((\w+|\d+-))*(-\d+)$/;
                if(patt.test(mdata[lkey])) {
                    mdManager.setParameter(lkey, mdata[lkey].replace(RegExp.$3, '-' + (ind+1)));    
                } else {
                    /* we don't match the pattern - we hope to not be here, but if the unique ID pattern 
                     * ever changes, we will end up here
                     */
                    mdManager.setParameter(lkey, mdata[lkey]);   
                }
            /* default */    
            } else {
                mdManager.setParameter(lkey, mdata[lkey]);    
            }
        /* otherwise, if we're a portfolio or something else, just do this */    
        } else {
            mdManager.setParameter(lkey, mdata[lkey]);    
        }
       adManager.setParameter(lkey, mdata[lkey]);
    }

    mdManager.setParameter('deliverychannel', 'mobile');
    /* MM-5545 - adding "delvfrmt" because sometimes it was not previously
     * in the metadata
     */
    if(!mdManager.getParameter('delvfrmt'))
        mdManager.setParameter('delvfrmt', mdata['delvfrmt']);
    //initAdManager(adManager, mdManager);   
    s.t();
};


HGTV.M.overlay.backupMetadata = function() {
    HGTV.M.overlay.originalMetadata = new Object();
    for (key in HGTV.M.overlay.mdKeys) HGTV.M.overlay.originalMetadata[key] = mdManager.getParameter(key);
}

HGTV.M.overlay.initUber = function( slideIndex ) {
    //modeled from initPortfolio()
    HGTV.M.overlay.mdKeys = mdManager.getKeys();
    HGTV.M.overlay.backupMetadata();

    var sliderObject = $("#slideshow");
    var $overlay = $("#overlay");
    var lastTab = slideIndex;
    if (lastTab === -1) {
        lastTab = 0;
    }

    //initialize Royal Slider plygb
    sliderObject.royalSlider({
        autoHeight: true,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        sliderTouch: true,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        controlNavigation: 'tabs',
        imageScaleMode: 'none',
        imageAlignCenter:false,
        loop: true,
        loopRewind: false,
        numImagesToPreload: 1,
        keyboardNavEnabled: true,
        usePreloader: false,
        navigateByClick: false,
        startSlideId: lastTab
    });

    var slider = sliderObject.data('royalSlider');
    var slideCounter =1;
 
    //bind orientation change
    $(window).on('orientationchange', orientationChangeHandler);
    // set height of onboarding
    $("#slideshow .rsArrow").css({"height": parseInt(windowHeight *.90)});

    // add empty slide to end of gallery
    //HGTV.M.overlay.addEmptySlide(slider);

    setTimeout(function () {
        $('html, body').scrollTop(0); 
        HGTV.M.overlay.setWidthImgContainer();
      }, 1000); 

    slider.ev.on('rsAfterContentSet', function(e, slideObject) {
        // fires when every time when slide content is loaded and added to DOM
            HGTV.M.overlay.setWidthImgContainer();    
            if($overlay.find(".body").hasClass("fade") != true){
                 setTimeout(function(){
                    $overlay.find(".body").addClass("fade");

                },500);
            }
    });

    slider.ev.on('rsAfterSlideChange', function(event) {
        // triggers after slide change
        // test to avoid fake swipe 
        if(slider.currSlideId !== lastTab) {
            lastTab = slider.currSlideId;
            $('html, body').scrollTop(0);        
            HGTV.M.overlay.initSlide(slider);
            HGTV.M.overlay.setWidthImgContainer( $("#slideshow").find(".rsSlide").first() );  
            HGTV.M.overlay.setWidthImgContainer( $("#slideshow").find(".rsSlide").last() );
        }



    //rl:add all logic needed to make photo descriptor mobile call

    var mobileDescriptorCall = getDartEnterpriseUrl('PHOTO_DESCRIPTOR_MOBILE', 1) + '&params.styles=' + SNI.DynamicAds.ixCfg.param_styles + '&callback=?';


       
    //Interstitial advertisement displays every 10 slide changes.
    if (slideCounter % 10 == 0 ) {
        //console.log('var mobileDescriptorCall = ' + mobileDescriptorCall;
        console.log(getDartEnterpriseUrl('PHOTO_DESCRIPTOR_MOBILE', 1) + '&params.styles=' + SNI.DynamicAds.ixCfg.param_styles + '&callback=?');
        //the interstitial call
        HGTV.M.overlay.checkForMobileAds();

    }

        /*//Interstitial advertisement displays every 10 slide changes.
          if (slideCounter % 10 == 0 ){
          HGTV.M.overlay.toggleAd($overlay);
          }
    */
    slideCounter++;

    });

    // remove onboarding when user interacts
    slider.ev.on('rsDragStart', function(event) {
        HGTV.M.overlay.removeFlyout();
    });
    
    // remove onboarding after 5 seconds
    setTimeout(function(){HGTV.M.overlay.removeFlyout()},5000);
    
    HGTV.M.overlay.initSlide(slider);
}

HGTV.M.overlay.initPortfolio = function( assetId ) {
    HGTV.M.overlay.mdKeys = mdManager.getKeys();
    HGTV.M.overlay.backupMetadata();

    var sliderObject = $("#slideshow");
    var slideIndex = sliderObject.find('.slide[data-asset-id="'+assetId+'"]').index();
    var $overlay = $("#overlay");

    var lastTab = slideIndex;
    if (lastTab === -1) {
        lastTab = 0;
    }

    //initialize Royal Slider plygb
    sliderObject.royalSlider({
        autoHeight: true,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        sliderTouch: true,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        controlNavigation: 'tabs',
        imageScaleMode: 'none',
        imageAlignCenter:false,
        loop: true,
        loopRewind: false,
        numImagesToPreload: 1,
        keyboardNavEnabled: true,
        usePreloader: false,
        navigateByClick: false,
        startSlideId: lastTab
    });

    var slider = sliderObject.data('royalSlider');
    var slideCounter =1;
 
    //bind orientation change
    $(window).on('orientationchange', orientationChangeHandler);
    // set height of onboarding
    $("#slideshow .rsArrow").css({"height": parseInt(windowHeight *.90)});

    setTimeout(function () {
        $('html, body').scrollTop(0); 
        HGTV.M.overlay.setWidthImgContainer();
      }, 1000); 

    slider.ev.on('rsAfterContentSet', function(e, slideObject) {
        // fires when every time when slide content is loaded and added to DOM
            HGTV.M.overlay.setWidthImgContainer();    
            if($overlay.find(".body").hasClass("fade") != true){
                 setTimeout(function(){
                    $overlay.find(".body").addClass("fade");

                },500);
            }
    });

    slider.ev.on('rsAfterSlideChange', function(event) {
        // triggers after slide change

        var direction = ( slider.currSlideId - lastTab );
        // test to avoid fake swipe 
        if(slider.currSlideId !== lastTab) {
	          //Interstitial advertisement displays every 10 slide changes.
            if (slideCounter % 10 == 0 ) HGTV.M.overlay.requestAd();
            slideCounter++;	

            lastTab = slider.currSlideId;
            $('html, body').scrollTop(0);        
        HGTV.M.overlay.initSlide(slider);
            HGTV.M.overlay.setWidthImgContainer( $("#slideshow").find(".rsSlide").first() );  
            HGTV.M.overlay.setWidthImgContainer( $("#slideshow").find(".rsSlide").last() );
	    }


        // get next slides
          if ( slider.currSlideId >= (slider.numSlides-1) && direction > 0){	   
            $("#overlay-loader").addClass("show-loader");
            var portfolioIds = HGTV.M.overlay.getNextSetofPortfolios( HGTV.M.overlay.EndecaResults, HGTV.M.overlay.EndecaResultsCurrent[HGTV.M.overlay.EndecaResultsCurrent.length - 1] );
            if (portfolioIds.length >0 ) {
                HGTV.M.overlay.getNextPortfolio(HGTV.M.formatIdsAsString(portfolioIds), slider);
            } else {
              $("#overlay-loader").removeClass("show-loader"); 
            }
        }

        // get Previous slides 
          if ( slider.currSlideId == 1 && direction < 0) { 
            $("#overlay-loader").addClass("show-loader");
            var portfolioIds = HGTV.M.overlay.getPrevSetofPortfolios( HGTV.M.overlay.EndecaResults, HGTV.M.overlay.EndecaResultsCurrent[0] );
            if (portfolioIds.length > 0) {
                //initially reverse portfolio id's for API service request
                HGTV.M.overlay.getPrevPortfolio(HGTV.M.formatIdsAsString(portfolioIds.reverse()), slider);
                // reverse portfolio ids to original order so for the correct index order
                portfolioIds.reverse();
            } else {
              $("#overlay-loader").removeClass("show-loader"); 
            }
        }
    });

    // remove onboarding when user interacts
    slider.ev.on('rsDragStart', function(event) {
        HGTV.M.overlay.removeFlyout();
    });
    
    // remove onboarding after 5 seconds
    setTimeout(function(){HGTV.M.overlay.removeFlyout()},5000);
    
    HGTV.M.overlay.initSlide(slider);
    // else slider.goTo(slideIndex);
}
/* 
 * LOOKS UP ALL GALLERIES FOR SUBSEQUENT GALLERIES AFTER INITIAL
 * YMAL API request to get next galleries
 * -- http://www.dev-hgtv.com/hgtv/cda/modules/YMALGalleries/0,,HGTV_6030206,00.html
 */

HGTV.M.overlay.getYMALGalleries = function (assetId) {
    if (assetId != undefined) {
        var request = '/hgtv/cda/modules/YMALGalleries/0,,HGTV_'+ assetId+',00.html';
        $.getJSON(request, function(data) {

                //console.log(data)
               HGTV.M.overlay.YMALGalleries = data;
 
        });   
    }

};
/*
 * GET INITIAL GALLERY
 */
HGTV.M.overlay.getGallery = function(linkURL, assetId, callback){
    if (assetId == undefined) return false;

    HGTV.M.overlay.mdKeys = mdManager.getKeys();
    HGTV.M.overlay.backupMetadata();
    //HGTV.M.overlay.getGalleryMetadata(assetId);
    
    var requestURL ="/hgtv/services/photoGalleryOverlay/api/0,,HGTV_"+ assetId +"_mobile,00.html";
    $.when(

    $.ajax({
        dataType: 'json',
        url: '/hgtv/cda/modules/articleMetadata/0,,ARTICLE-DETAIL_HGTV___' + assetId + '_ARTICLE-DETAIL_no_,00.html',
        async: true
        }).done(function(data) {
            /* MM-5545 --> MM-5546, MM-5547 - properly updating the index information */
            HGTV.M.overlay.currGalleryIndex++;
            HGTV.M.overlay.galleriesMetaData[HGTV.M.overlay.currGalleryIndex] = data;
            /* MM-5545 --> MM-5546, MM-5547 - updating the image index and images */
            HGTV.M.overlay.currImageIndex = 0;
            HGTV.M.overlay.updateImages(data);

        }).error(function(jqXHR,textStatus,errorThrown) {
            //if error, most likely an article, and we want to follow the link
            //if an old delv-frmt or just an error, also try following link
            HGTV.M.overlay.removeLoader();
            window.location.href = linkURL;
        return true;
        }),
        
    HGTV.M.overlay.ajax = $.ajax({
        url: requestURL,
    }).done(function(data) {
        $("#overlay .body").html(data);
        callback(data);
        
    })
    ).done(function(a1, a2){
        
        HGTV.M.overlay.show();
        var $slideshow = $("#slideshow");

        if ($slideshow.length) {
            HGTV.M.overlay.initGallery(linkURL, assetId);
        } else {
            document.location.href = linkURL;
        }	

    });
}

/*
 * GET MORE GALLERIES  
 */
HGTV.M.overlay.getNextGallery = function (assetId, slider){
    $("#overlay-loader").addClass("show-loader");
    //HGTV.M.overlay.getGalleryMetadata(assetId);
    
    //    slider.currSlide.content.removeAttr("data-gallery");
    
   if (assetId != undefined){
        var requestURL ="/hgtv/services/photoGalleryOverlay/api/0,,HGTV_"+ assetId +"_mobile,00.html";

    $.when(
        $.ajax({
                dataType: 'json',
                url: '/hgtv/cda/modules/articleMetadata/0,,ARTICLE-DETAIL_HGTV___' + assetId + '_ARTICLE-DETAIL_no_,00.html',
                async: true
                }).done(function(data) {
                    /* MM-5545 --> MM-5546, MM-5547 - properly updating the index information */
                    HGTV.M.overlay.currGalleryIndex++;
                    HGTV.M.overlay.galleriesMetaData[HGTV.M.overlay.currGalleryIndex] = data;
                    /* MM-5545 --> MM-5546, MM-5547 - updating the index and images information */
                    HGTV.M.overlay.currImageIndex = 0;
                    HGTV.M.overlay.updateImages(data);

                }).error(function(jqXHR,textStatus,errorThrown) {
                return true;
                }),
            $.ajax({
            url: requestURL,
        }).done(function(data) {
            var slides = $(data).find(".slide");
            //update flyout with new title
            //$("#overlay").find("#now-viewing").html( $(data).eq(0).html() );
             $.each(slides, function(index, domEle){
                if (index ==0) {
                    $(domEle).addClass("trigger-flyout");
                }
                 slider.appendSlide( domEle );
             });

            //HGTV.M.overlay.YMALGalleries.shift();
            //console.log(HGTV.M.overlay.YMALGalleries);                  
             })
     ).done(function(a1, a2){
        $("#overlay-loader").removeClass("show-loader"); 

        HGTV.M.overlay.removeEmptySlide(slider);

        if (HGTV.M.overlay.YMALGalleries != "" && ( HGTV.M.overlay.galleryCurrentPosition + 1 ) < HGTV.M.overlay.YMALGalleries.length) {
            HGTV.M.overlay.addEmptySlide(slider);
    }
     });
    }

}

HGTV.M.overlay.getEndeca = function(type, space, style, color, assetId, callback){
    if(typeof type === 'undefined'){
        //console.log("Type undefined. Choosing Designers Portfolio.");
        type="DESIGNERS+PORTFOLIO";
    }

    if(typeof space == 'undefined'){
        //console.log("Space undefined. Returning all.");
        space="";
    } else {
      var spaceMap = {
        "bathrooms" : "Bathrooms",
        "bedrooms" : "Bedrooms",
        "dining-rooms" : "Dining+Rooms",
        "entryways" : "Entryways",
        "home-offices" : "Home+Offices",
        "kids-rooms" : "Kids'+Rooms",
        "kitchens" : "Kitchens",
        "living-rooms" : "Living+Rooms",
        "outdoors" : "Outdoors"
      }

      var newSpace = spaceMap[space.toLowerCase()];
      if ( typeof newSpace != 'undefined' ) {
        space = newSpace;
      }

    }

    if(typeof style == 'undefined'){
        //console.log("Style undefined. Returning all.");
        style="";
    } else {
      var styleMap = {
        "arts-and-crafts" : "Arts+and+Crafts",
        "asian" : "Asian",
        "contemporary" : "Contemporary",
        "cottage" : "Cottage",
        "country" : "Country",
        "eclectic" : "Eclectic",
        "english-country" : "English+Country",
        "mediterranean" : "Mediterranean",
        "mid-century-modern" : "Mid-Century+Modern",
        "modern" : "Modern",
        "old-world" : "Old+World",
        "romantic" : "Romantic",
        "southwestern" : "Southwestern",
        "traditional" : "Traditional",
        "transitional" : "Transitional",
        "tropical" : "Tropical",
        "tuscan" : "Tuscan"
      }

      var newStyle = styleMap[style.toLowerCase()];
      if ( typeof newStyle != 'undefined' ) {
        style = newStyle;
      }
    }

    if(typeof color == 'undefined'){
        //console.log("Color undefined. Returning all.");
        color="";
    } else {
      var colorMap = {
        "beige" : "Beige",
        "black" : "Black",
        "blue" : "Blue",
        "brown" : "Brown",
        "copper" : "Copper",
        "gold" : "Gold",
        "gray" : "Gray",
        "green" : "Green",
        "mixed+color" : "mixed+color",
        "neutral" : "Neutral",
        "orange" : "Orange",
        "pink" : "Pink",
        "purple" : "Purple",
        "red" : "Red",
        "silver" : "Silver",
        "turquoise" : "Turquoise",
        "white" : "White",
        "yellow" : "Yellow"
      }

      var newColor = colorMap[color.toLowerCase()] ;
      if ( typeof newColor != 'undefined' ) {
        color = newColor;
      }
    }

    var start=0;
    var increment = 20;
    var requestUrl ="/hgtv/cxfservice/filterResults/filterBy/Core_Type-PORTFOLIO,Portfolio_Home_Section-"+ type +"/returnFilters/Portfolio_Space-"+ space +",Portfolio_Style-" + style + ",Color-" + color;

    HGTV.M.overlay.ajax = $.ajax({
        url: requestUrl,
        success: function(data){
            var obj = data.results;
            $.each(obj, function(key, val) {
                HGTV.M.overlay.EndecaResults[key] = val.id;
            });

            // make secondary request to return portfolio slideshow
            var portfIds = HGTV.M.overlay.getPortfoliosFromId(HGTV.M.overlay.EndecaResults, assetId);
            var porfolioIds = HGTV.M.formatIdsAsString( portfIds );
            callback( porfolioIds );
        }
    });
};

HGTV.M.overlay.getPortfolioList = function (data, assetId, direction) {
  //data 
  //    the complete list of portfolio ids for the current loop
  //assetId
  //    the id of the portfolio that we want to make sure to include
  //    in the returned list of portfolio ids (except when next is not 0)
  //direction
  //    the direction that the user is navigating the loop
  //     1 = forward
  //     0 = just starting
  //    -1 = backward
  
  var start = 0;
        var increment = 20;
  var index = data.indexOf(assetId);
  if( index != -1 ) {//if the given portfolio is found in Endeca list
    if( direction ==  1 ) { index++; } //next batch
    if( direction == -1 ) { index -= increment; } //previous batch
    //if this takes us off the end of the list, loop back around
    if( index === data.length ) { index = 0; }
    else if( index < 0 ) { index = data.length; }
    //set start to an even batch breakpoint - this makes the caching easier for Vignette
    if( index > 0 ) { start =  HGTV.M.roundDown(index, increment); }
                }
  //if we have loaded all of the portfolios that are in the loop, don't load more.
  var slider = $("#slideshow").data('royalSlider');
  if( typeof slider != 'undefined' && slider.slides.length >= data.length ) { return new Array(); }
  HGTV.M.overlay.EndecaResultsCurrent = data.slice(start, start+increment);

  return HGTV.M.overlay.EndecaResultsCurrent;
}

HGTV.M.overlay.getPortfoliosFromId = function (data, assetId) {
  return HGTV.M.overlay.getPortfolioList( data, assetId, 0 );
};

/*
 * RETURNS NEXT SET OF PORTFOLIO IDS
 */
HGTV.M.overlay.getNextSetofPortfolios = function (data, assetId) {
  return HGTV.M.overlay.getPortfolioList( data, assetId, 1 );
}

/*
 * RETURNS NEXT SET OF PORTFOLIO IDS
 */
HGTV.M.overlay.getPrevSetofPortfolios = function (data, assetId) {
  return HGTV.M.overlay.getPortfolioList( data, assetId, -1 );
}

HGTV.M.overlay.getPrevPortfolio = function (assetId, slider){
  $("#overlay-loader").addClass("show-loader");
    
   if (assetId != undefined){
        var request ="/hgtv/services/portfolioOverlay/api/0,,HGTV_"+ assetId +"_mobile,00.html";
        $.ajax({
            url: request,
        }).done(function(data) {
            var slides = $(data).find(".slide");
            //update flyout with new title
            var count = 0;
             $.each(slides, function(index, domEle){
                 slider.appendSlide( domEle, 0 );
             });
            $("#overlay-loader").removeClass("show-loader");
            HGTV.M.overlay.removeEmptySlide(slider);
               
            if (HGTV.M.overlay.EndecaResults != "") {
                //HGTV.M.overlay.addEmptySlide(slider, 0);
            }   
               
         });  
    }

}

/*
 * GET NEXT PORTFOLIOS
 */
HGTV.M.overlay.getNextPortfolio = function (assetId, slider){
   if (assetId != undefined){
        var request ="/hgtv/services/portfolioOverlay/api/0,,HGTV_"+ assetId +"_mobile,00.html";
        $.ajax({
            url: request,
        }).done(function(data) {
            var slides = $(data).find(".slide");
            //update flyout with new title
             $.each(slides, function(index, domEle){
                 slider.appendSlide( domEle );
             });
            $("#overlay-loader").removeClass("show-loader");
            HGTV.M.overlay.removeEmptySlide(slider);
         });  
    }
};

/*
 * GET INITIAL PORTFOLIOS
 */
HGTV.M.overlay.getPortfolio = function(porfolioIds, assetId){
    if (porfolioIds != undefined){
    var request ="/hgtv/services/portfolioOverlay/api/0,,HGTV_"+ porfolioIds +"_mobile,00.html";
        HGTV.M.overlay.ajax  = $.ajax({
              url: request
            }).done(function(data) {
                $("#overlay .body").html(data);
                HGTV.M.overlay.show();
                var $slideshow = $("#slideshow");
                if ($slideshow.length){
                    HGTV.M.overlay.initPortfolio(assetId);
                }
        });
    }
};

/*
 * FUNCTION IS USED TO FORMAT ARRAY OF IDS TO A STRING FOR THE GET PORTFOLIO WEB SERVICE
 */
HGTV.M.formatIdsAsString = function (ids){
    if (ids != undefined) {
     return ids.toString().replace(/,/g, "-");
    }
};

// round utility
HGTV.M.roundDown = function (x, to) {
    return Math.floor(x / to) * to;
};
HGTV.M.roundUp = function (x, to) {
    return Math.ceil(x / to) * to;
};
