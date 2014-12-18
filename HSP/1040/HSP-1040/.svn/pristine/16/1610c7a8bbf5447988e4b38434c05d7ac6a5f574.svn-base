
var HGTV={};
HGTV.M={};
if (!SNI) SNI = {};
if (!SNI.HGTV) SNI.HGTV = {};

HGTV.M.lazyLoadCallback = $.throttle(50, function () {
    var offsetTop = parseInt(window.pageYOffset, 10),
        screenHeight = window.innerHeight*2,
        offsetBottom = offsetTop + screenHeight;
       
    $('img[data-src]:visible').each(function() {	
        var $img = $(this);
        if($img.offset().top < offsetBottom) {
            $img.lazyLoad();
        }        
    });

     $(function() {//speed up lead carousel by hiding elements off screen
        //not sure why this works, but the river module is clearly slowing down swiping
        if ( !$('#lead-carousel').length && !$('#show-hosts').length) {return;} //don't need if no problem carousel
        
        //try river first, e.g. section fronts        
        var $river = $('.river .pod').filter(':gt(1)');
        if($river.length) riverOffset = $('.river').offset().top + 632; //set top, using main div, with tweak component
            else {  //else try home page
                    $river = $('#dynamic-content-grid-module li').filter(':gt(1)'); //if no river, check for dcg for main page
                    if($river.length) riverOffset = $('#dynamic-content-grid-module').offset().top + 632; //set offset using main div, different tweak b/c of nav bar
                    else { //else try ontv main
                            $river = $('#directory-list li').filter(':gt(4)'); //tweak filter and hardcoded offset below to show/hide at right position 
                            if($river.length) riverOffset = $('#directory-list').offset().top + 732;
                    } 
                }                           
            
        //console.log($lc.length);
        if (!$river.length) return;  //if no river/dcg/shows A-Z don't do anything    
        //console.log("bottom: " + offsetBottom + ", river: " + riverOffset + ', screenHeight: ' + screenHeight);
        if (offsetBottom <  riverOffset) {
            $river.hide(); //keep the first two visible
        } else $river.show();
     });
});

/*
    MAKES INITIAL AJAX REQUEST TO  RETURN TABBED CONTENT
*/

HGTV.M.getTabbedContent = $.throttle(50, function (callback) {
    var offsetTop = parseInt(window.pageYOffset, 10);
    var offsetBottom = (offsetTop+200) + window.innerHeight;
    var tabbedData;
    $('.tab-content[data-source]:visible').each(function() {
        var $tabContent = $(this);

        if($tabContent.offset().top < offsetBottom) {
            var dataSource = $tabContent.attr("data-source");
            $tabContent.removeAttr("data-source");

            $.ajax({
                url: dataSource,
            }).done(function(data) {
                callback($(data).children(".tab-panel"));
            });
        }
    });
});

/*
    APPENDS 20 ELEMENTS AT A TIME TO EACH TABBED SECTION.
*/

HGTV.M.loadTabbedContent = $.throttle(500, function () {
    var offsetTop = parseInt(window.pageYOffset, 10),
        offsetBottom = offsetTop + window.innerHeight,
        footerPosition = ($("#footer").offset().top-window.innerHeight),
        appendedItems = 20;

        if(footerPosition < offsetBottom && HGTV.M.tabbedData != "" ) {

             var $tabPanelActive =  $(".tab-panel.active");
             var $tabPanelActiveIndex = $tabPanelActive.index();

            if (HGTV.M.tabbedData[$tabPanelActiveIndex].length){
                $tabPanelActive.append(HGTV.M.tabbedData[$tabPanelActiveIndex].splice(0, appendedItems));
                picturefill();
                $('img[data-src]:visible').lazyLoad();
                refreshMobileBannerAd('#ad_wrapper > div', 1);
                s.t();
            }
        }
});

HGTV.M.getBrowserHeight = function() {
    return document.documentElement.clientHeight;
};

HGTV.M.getBrowserWidth = function() {
    return document.documentElement.clientWidth;
};

HGTV.M.Nav = function() {

    var elSiteWrapper = document.getElementById('site'),
    nav = document.getElementsByTagName('nav')[0],
    elNavButtonHd = document.getElementById('hd-nav-button'),
    elNavButtonFt = document.getElementById('ft-nav-button'),
    elBodyTag = document.getElementsByTagName('body')[0],
    elHtmlTag = document.getElementsByTagName('html')[0];

    // click events when header is visible
    handleStartTouch = function(evt) {
	evt.preventDefault();
	toggleGlobalNav();
    };
    var burgerButton;
    toggleGlobalNav = function(pos) { // show/hide navigation
        $('#site-nav .active').removeClass('active'); //remove current active state
        $('#site-nav a[href="'+document.location.pathname+'"]').parent().addClass('active'); //move to current section front, if on section front
        var windowPosition =  $(document).height();   

	if ( elSiteWrapper.className == 'shifted' ) {
	    elSiteWrapper.className = '';
	    nav.className='';
	    elSiteWrapper.removeEventListener('touchstart', handleStartTouch, false);
	    var t = setTimeout( function() {
		elHtmlTag.style.overflowX = '';
		//elBodyTag.style.overflowX = '';
        elBodyTag.style.overflowY = '';
        elBodyTag.style.position = '';
	    }, 300);
        //if position exists scroll to the bottom of the page

        if (burgerButton){

		//            setTimeout( function() {
                $(elSiteWrapper).removeAttr("style");
  
                $("html, body").scrollTop($(document).height());
  //          }, 300);
        }
        
	    
	} else {	 
        if (burgerButton){
            $(elSiteWrapper).css("top", -( ($("#site").height()-10) -$(window).height() )  );
        }
        $("html, body").scrollTop(0);
	    elSiteWrapper.addEventListener('touchstart', handleStartTouch, false);
	    elSiteWrapper.className = 'shifted';
	    elHtmlTag.style.overflowX = 'hidden';
	    //elBodyTag.style.overflowX = 'hidden';
        elBodyTag.style.overflowY = 'hidden';
        elBodyTag.style.position = 'relative';
	    nav.className = 'visible';
	}
    };

    elNavButtonHd.onclick = function() {
    burgerButton = false;
	toggleGlobalNav();
    };
    elNavButtonFt.onclick = function() {
    burgerButton = true;
	toggleGlobalNav();
    };  
    bindNavInteractions = function() {
	var navMainLinks = document.querySelectorAll('nav > a');
	var linksCount = navMainLinks.length;
	
	//starting at 1 to avoid "Home Page" link
	for (var i=1; i < linksCount; i++) {
	    navMainLinks[i].addEventListener('click', toggleSubnavLinks, false);
	}	
	
	function toggleSubnavLinks(evt) {
	    evt.preventDefault();
	    
	    var subnav = this.nextElementSibling;	    
	    var navDispay = subnav.style.display;
	    subnav.style.display = (navDispay == '' || navDispay == 'block') ? 'none' : 'block';	   
	}
    };
};

document.addEventListener('DOMContentLoaded', HGTV.M.Nav, false);




$(document).ready( function() {

    /*
     * INSERTS LETTERS BEFORE EACH ALPHABETICAL SECTION  ON THE TV HOME PAGE 
    var lastChar, 
    currChar,
    isNumber =false;
    $("#directory-list li a").each(function(){ 
	var $this = $(this),
        currChar = $this.text().charAt(0).toUpperCase();	
        if (currChar != lastChar) {
            if (isNaN(currChar) ){
                $this.parent("li").before('<li class="letter">'+ currChar +'</li>');
            }
            if (!isNumber){
                $this.parent("li").before('<li class="letter">#</li>');
                isNumber= true;
            }	    
	}
	lastChar = currChar;
    });
    */
    
    if ($("article").length ) {
	$('article p').each(function(){
            var value = $.trim($(this).html());
            if(value == '&nbsp;' || value == '' ){
		$(this).remove();
            }
	});
    }

    if ( $('.tv-this-week').length > 0) { //On TV & Show Pages
	var $tvThisWeek = $('.tv-this-week');
	var $mod = $tvThisWeek.find('div.tab');
	var $prev = $mod.find('h3.left');
	var $next = $mod.find('h3.right');
	var $grid = $tvThisWeek.find('div.grid');
    var onairIndex;

    $grid.on('click','li', function(e){//make whole row clickable
        window.location.href = $(this).find('a').attr('href');
    });

	$('div.info.' + $mod.find('h3.active').data('day')).show(); //show today's program info
	    
	var scrollDays = function(el) {
        var $days = el.siblings().filter(':not(.right,.left)'),
            $visibleDays = $days.filter(':not(.hide)'),
            $arrows = el.siblings().filter('.right, .left'),//$('.tv-this-week .tab:first-child .right, .tv-this-week .tab:first-child .left')
            mid = $visibleDays.eq(1).index(); //index of the middle visible day
    
	    if (el.hasClass('right')) {
            if (mid <=3 ) { mid+=3; } //normally want to move three days
            else if (mid <= 4) {mid +=2; } //otherwise go as far as possible
            else if (mid <= 5) {mid++;}
            else return;  //should never get here since arrow should be disabled          
            
	    } else if (el.hasClass('left')) {
            if (mid >= 5) mid-=3;
            else if (mid >=4) mid-=2;
            else if (mid >=3) {mid--;}
            else return;
	}
	
        //handle arrow active state
        $arrows.removeClass('inactive');//assume both are active at first and then test two edge cases
        if(mid == 2) $('.left').addClass('inactive')
        else if (mid == 6) $('.right').addClass('inactive');

        $visibleDays.addClass('hide');//hide all the currently visible days            
        $days.slice(mid-2,mid+1).removeClass('hide'); //show the new visible days 
        
	}
	
	//bind click events
	$mod.on('click', 'h3', function(e) {
        e.preventDefault();
	    var $h3 = $(this),
            $parent = $h3.parent('.tab'),
            className = $h3.attr('class') || '',
         url = $h3.find('a').attr('href');

	    if (className.match(/active/) ) return false; //if current tab clicked (active) or disable arrow (inactive, which also matches), do nothing
	    if (className.match(/left/) || className.match(/right/))   { 
            scrollDays($h3); 
            $('.tab').not($parent).replaceWith($parent.clone(true,true)); //to sync, replace the tab that wasn't clicked with the one that was, preserving bindings
            return false; 
        }
	    
        //below here only happens when clicking a day
        $parent.find('.active').removeClass('active');
	    $h3.addClass('active'); 
	    
        //sync top and bottom tabs; replace the tab that wasn't clicked with the one that was, preserving bindings
        $('.tab').not($parent).replaceWith($parent.clone(true,true)); 
	   
        //for show guide only
	    $('div.info').hide();
	    $('div.info.' + $h3.data('day') ).show();
	    
        if(url){//the url is undefined on the show guide, and there's no service there; also don't want scrolling there
        $.ajax({
            url: url
        })  .done(function(data){
                var $grid = $('.grid ul');
                $grid.html(data);
                if($h3.hasClass('today')) {//add back onair, when user clicks on today
                    $grid.find('li .time').eq(onairIndex).addClass('onair');    
                }
                $('html, body').animate({scrollTop:0}, 'medium');
            });
        }

	});	  

	//only for program guide page
	if ( $grid.length > 0) {
        
        //on initialization inactive next/prev if necessary
        if($mod.find('[data-day="0"]').is(':not(.hide)')){
            $prev.addClass('inactive');    
    }
        else if($mod.find('[data-day="6"]').is(':not(.hide)')){
            $next.addClass('inactive');    
    }

                //utility function, used for ON AIR feature below
                function getMinutes(h,m,ampm){
                        if(ampm === 'pm') {if (h< 12) h += 12;} //afternoon
                        else {
                            if(h<6) h += 24; //after midnight
                            else if (h==12) h = 24; //between midnight and 1am
                        } 

                        return h*60 + m;
                }
        
        //change today's date to 'TODAY'
        $('.tv-this-week .tab h3.active a').text('TODAY').parent('h3').addClass('today'); //active class is set to current day on the BE, assuming it's recached at the right time                    
        if ($('.tv-this-week .tab h3.active')) {//if today is the active panel
            //get user's local time. Use this for ON AIR, independent of time zone selected
            var d = new Date(),
            hour = d.getHours(),
            min = d.getMinutes(),
            ampm = (hour >= 12) ? 'pm' : 'am',
            currentMinutes = getMinutes(hour,min,ampm);

            var timeReg = /([0-9]{1,2}):([0-9]{1,2})([A,P]M)/i;

            
            $times = $grid.find('li .time');
            $.each($times, function(key2,value2){
                parsedTime = timeReg.exec($(value2).text());   
                if (parsedTime.length == 4 ){
                    var thisMinutes = getMinutes(+parsedTime[1],+parsedTime[2],parsedTime[3])
                    if(currentMinutes > thisMinutes) {
                        onairIndex = key2;
                        return true; //try next in each-loop
                    }
                    $times.eq(onairIndex).addClass('onair'); //most recently started entry 
                    return false; //break out of each-loop
                }
            })
        }

    }
    }

    // Advertisement refresh for articles
    /* EDIT: this function was not behaving as anticipated; it was adding 
    * the callback function to each waypoint object, then as they were scrolled over
    * on the page, it was calling the refreshMobileBannerAd() and s.t() functions for 
    * the current item AND every item that had already been scrolled over and added to the
    * collection! This resulted in far too many pagetracking (s.t()) calls. So, I added
    * the ID check so that iterating over all the items in the list wouldn't be an issue; it
    * will only call the other functions for that matching item and quietly ignore the others
    * [NOTE: this is not an ideal solution, part of the problem may be that the version of the
    * Waypoint plug-in is out of date, and a newer version might just fix the problem]
    * - scurtis 10/09/2013 
    */
    $('.page').waypoint(function(way) {
	   if(this.id === way.target.id) {
	refreshMobileBannerAd('#ad_wrapper > div', 1);
            /* added to only fire the tracking call the first time through the divs
             * it doesn't matter what the data is; if it's there, no more calls - scurtis
             */
            if(!$(this).data('fired')) {
                $(this).data('fired','true');
                s.t();    
            }
             
       } 
    });

    $(".inline-slider").royalSlider({
        autoHeight: true,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        imageScalePadding: 0,
        sliderTouch: true,
        slidesSpacing: 10,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        imageScaleMode: 'none',
        imageAlignCenter:false,
        loopRewind: false,
        loop: true,
        numImagesToPreload: 1,
        keyboardNavEnabled: true,
        usePreloader: false,
        navigateByClick: false,
        visibleNearby: {
            enabled: false,
        //  center: true,
            

            navigateByCenterClick: false //was true

        }
    });

    // $.ajaxSetup({
    //   timeout:10000
    // });
    /*
     when page loads picture fill plugin executed and all images in window view 
     plus the offset of the browser view are loaded
    */
    picturefill();
    HGTV.M.lazyLoadCallback();
    var t = setTimeout(function(){ HGTV.M.lazyLoadCallback(); }, 1000);  //On pageload visible 'We Recommend' modules won't load images unless the user scrolls, fix by running again after a second ...
    $(window).on("scroll", HGTV.M.lazyLoadCallback);

    $('nav li a.icon-plus-sign').on('click', function(e){
	$(this).parent().hide().find('~ li').show();
	HGTV.M.lazyLoadCallback();
    });

    // foooter button anchor to top
    $("#anchor-top").click(function () {
        $('html, body').animate({scrollTop:0}, 'medium');
    });

    /* 
        initialize tabs for section fronts 
        request content from service
        append 20 elements to appropriate section
    */
    HGTV.M.tabbedData = [];
    if ($(".nav-tabs").length){
        HGTV.M.tabs.init();
        $(window).on("scroll", function() {
            HGTV.M.getTabbedContent(function(data){
                return $.each(data, function (index, domElement){
                    HGTV.M.tabbedData[index]= $(domElement).children();
                });
            }) 
            HGTV.M.loadTabbedContent();
        } );
    }

    // super section dropdown
    $('.page-head select.drop-down-menu').change(function() {
        document.location = $(this).val();
    });

    // add selected state
    var pageHeadDropdown =  $(".page-head .drop-down-menu");
    if (pageHeadDropdown.length){
        var pageTitle = $("h1").text();
        
        pageHeadDropdown.find("option").each(function(){
            var $this = $(this);
            if ($this.text() === pageTitle){
                $this.attr("selected", "selcted");
            }
        });
        
    }


    // trigger modal and make request to display asset
    $("#site, .river, .royalSlider,  #dynamic-content-grid-module, #lead-carousel").on("click", "[data-asset-type=PHOTO_GALLERY] a, [data-asset-type=WR_PHOTO_GALLERY] a, [data-asset-type=ARTICLE_OR_GALLERY] a", function (event) {
        event.preventDefault();
        var $this = $(this);
        var $parent = $this.parents("[data-asset-type=PHOTO_GALLERY], [data-asset-type=ARTICLE], [data-asset-type=WR_PHOTO_GALLERY], [data-asset-type=ARTICLE_OR_GALLERY]");
        var linkURL = $parent.attr("data-href"); 
        var assetId = $parent.attr("data-asset-id");
        if ( linkURL === undefined ) {
            linkURL = $this.attr("href");
        }

        HGTV.M.overlay.removeLoader();

        if ($parent.find(" > a:eq(0)").length){
            HGTV.M.overlay.addLoader($parent.find(" > a:eq(0)"));
        }

        if (assetId != undefined) {
            
            if (typeof HGTV.M.overlay.ajax !== 'undefined'){
                HGTV.M.overlay.ajax.abort();  
            }      
                HGTV.M.overlay.getGallery( linkURL, assetId, 
                function(){
                    HGTV.M.overlay.getYMALGalleries(assetId); 
                } );

        }

    });    

    // trigger modal and make request to display asset
    $(".river, .portfolio-promo, #lead-carousel,#content").on("click", "[data-asset-type=GARDEN_GALLERY] a, [data-asset-type=DESIGNERS_PORTFOLIO] a" , function (event) {
        event.preventDefault();
        var url_params = window.location.hash;
        var $this = $(this);
        var $parent = $this.parents("[data-asset-type=GARDEN_GALLERY], [data-asset-type=DESIGNERS_PORTFOLIO]");
        var space = $parent.attr("data-asset-space");
        var type = $parent.attr("data-asset-type");
        var style = "";
        var color = "";
        var assetId = $parent.attr("data-asset-id");
        var linkURL = $parent.attr("data-href");
        if ( linkURL === undefined ) {
            linkURL = $this.attr("href");
        }

        if (type == "GARDEN_GALLERY"){
            type = "GARDEN+GALLERIES";
        }else {
            type = "DESIGNERS+PORTFOLIO";
        }
        HGTV.M.overlay.removeLoader();
        if ($parent.find(" > a:eq(0)").length){
            HGTV.M.overlay.addLoader($parent.find(" > a:eq(0)"));
        }
        if (typeof HGTV.M.overlay.ajax !== 'undefined'){
          HGTV.M.overlay.ajax.abort();
        }

        if (url_params) {
            var filters = window.location.hash.split('/');
            jQuery.each( filters, function( i, val ) {
                var filter = val.split('-');
                var name = filter.shift();
                var value = filter.join('-');
                switch( name ) {
                case "room":
                  space = value;
                  break;
                case "style":
                  style = value;
                  break;
                case "color":
                  color = value;
                  break;
                }
            });
        }

       // make iniital request to get category from Endeca
        HGTV.M.overlay.getEndeca(type, space, style, color, assetId, function(porfolioIds){
            HGTV.M.overlay.getPortfolio(porfolioIds, assetId );
      });
    });    

    // trigger modal and make request to display asset for uber articles
    $(".builder-uber").on("click", "[data-gallery] a", function (event) {
        event.preventDefault();
        var $this = $(this);
        var $parent = $this.parents("[data-gallery]");
        var ind = $parent.find('a').index($this); //determine which item was clicked 
        var $assetUrl = $parent.attr("data-gallery");

        HGTV.M.overlay.addLoader($this);
        SNI.InlineGallery = {};
        SNI.InlineGallery.jsonpCallback = function (data) {
            //use the uber inline photogallery-overlay service and transform the markup into the mobile overlay markup (the portfolio version) 
            var markup = ['<div class="royalSlider contentSlider rsDefault slideshow" id="slideshow">'];
            for(i=0;i<data.length;i++){
                markup.push('<div class="slide" data-asset-id="' + data[i].iid + '" data-href="'+data[i].pgUrl+'">');
                markup.push('<div class="img-container"> <a class="rsImg" href="'+data[i].iurl+'"></a></div>');
                markup.push('<div class="rsContent hidden"><h1>'+data[i].ititle+'</h1><p>'+data[i].icap+'</p></div>');
                markup.push('<small class="credit">'+data[i].creator+'</small>');
                markup.push('</div>');
            }         
            markup.push('</div>');
            $("#overlay .body").html(markup.join(""));
            HGTV.M.overlay.show();
            HGTV.M.overlay.initUber(ind);
        };


        url = "/hgtv/feeds/photogallery-overlay/0,,"+$assetUrl+",00.json";
        $.ajax({
            url: url,
            async: true,
            dataType: "jsonp"                        
        })
            .done( function(data){
                //all the action happens in SNI.InlineGallery.jsonpCallback();
            });
    });    
   
    //modal functionality
    HGTV.M.overlay.addOverlay();

    //detail page see-more button
    $('.see-more').click(
        function(){
            var buttonTarget = $(this).attr('data-src');
            if (buttonTarget){
              window.location.href=buttonTarget;  
            } 
            
    });

    // global dropdown
    $("body").click(function(event){
        var dropdown = $(".dropdown-toggle"),
        $vid=$('.vid-wrap');
        if (event.target != dropdown ){
            if ( $(".dropdown-menu").is(":visible") ){
             $(".dropdown-menu").parent(".dropdown").removeClass("open");
            }
            if ($vid.length){
                $vid.css('position','relative').css('left','auto');
            }

        }
    });
    $(".dropdown-toggle").click( function () {
        var $this = $(this),
            $vid=$('.vid-wrap');//applying the operations below on the video tag itself took away controls
        
        function closeSocial() {
            $this.parent(".dropdown").removeClass("open");
            $vid.css('left','auto');
        } 
        if ($this.next(".dropdown-menu").is(":visible")){
            closeSocial();
        
        } else {
            // var $sel = $('h1,.description');//want to close dropdown on blur, but can't easily do that, so choosing nearby elements instead
            // $sel.css("-webkit-tap-highlight-color", "rgba(0,0,0,0)")//disable gray highlight box
            // $sel.one('click',function(e){
            //     if ($this.next(".dropdown-menu").is(":visible")){
            //         closeSocial();
            //         $sel.off('click');
            //     } 
            // });

            $this.parent(".dropdown").addClass("open");

            if ($("video:visible")) {
                $vid.css('position','absolute').css('left','-200%');  //hiding/showing the video took away controls; changing opacity stole clicks from overlay; shifting off page instead
            }
        }
    });
    //'View Desktop Link' click
    $('nav p.legal a, footer p.legal a').on('click', function(e) {
	e.preventDefault();
	SNI.Util.Cookie.set('layout', 'desktop', null, '/');
	document.location.href = $(this).attr('href');
    });
    //'View Desktop Link' click
    $('nav p.legal a, footer p.legal a').on('click', function(e) {
	e.preventDefault();
	SNI.Util.Cookie.set('layout', 'desktop', null, '/');
	document.location.href = $(this).attr('href');
    });
});

SNI.Util.IMGResize = {};
SNI.Util.HookIMGResize = function(){};
SNI.Util.IMGResize.init = function(obj){
    if(obj.module){ $(obj.module).find('.ico').remove(); }
    
}
