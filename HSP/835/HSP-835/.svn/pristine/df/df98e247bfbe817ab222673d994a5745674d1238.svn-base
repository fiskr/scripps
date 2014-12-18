/* DYNAMIC PATTERNS LIBRARY 
  ************************************/
/* ---------- ADD CUSTOM JAVASCRIPT BELOW THIS LINE ---------- */
jQuery.dpl = {

	/* in markup, init is called with method name and if method exists, will call that method
	 * jQuery.dpl(poll, someConfigObject) will call this init function and then the method poll()
	 */
	init: function(type, config){

		return this.each(function(i){
			if (this.id) {

			}
			else {
				//TODO - revisit
				this.id = type + "-" + new Date().getTime(); // assign ID if container does not have one
			}


 			try {
				/* DO NOT REMOVE - fix for IE background flicker */
				document.execCommand('BackgroundImageCache', false, true);
			} catch(e) {}

			var init = $.dpl[type];
			if ($.isFunction(init)) {
				init(this, config);
			}
		});

	},  // end init


	/**
	 * Initializing of carousel with the use of jCarousel Plugin.
	 *
	 * @name carousel
	 * @param Map configuration pairs of optional settings.
	 * @option Boolean pause: TODO allow user to pause if auto roate is on
	 * @option Integer scroll: Number of items to scroll, Default is set to 1
	 * @option Integer|String animation: "slow", "fast", or integer millisecond, "0" to turn off animation
	 * @option Integer|String auto: Default is set to 0 for off
	 * @option String wrap: "first", "last", "both" or "continuous"  TODO: implement continuous wrap
	 * @option String pagelink:"text","image","both" or null
	 * @option String pagetext: the text string to be displayed with either current or total.
	 * 			@example
	 * 			pagetext:"_current of _total" will display "1 of 10"
	 * 			pagetext:"_current" will display the current page number
	 *
	 *
	 * TODO: implement continuous wrap
	 * 		 implement pause button similar to dynlead
	 */
	carousel: function(ele, config){

		config = $.extend({
			pause: null,
			scroll: 1,
			animation: "slow",
			auto: 0,
			wrap: null,
			pagelink: null,
			pagetext: null,
			start: 1
		}, config);

		var crsl_itemFirstInCallback = function(carousel, item, idx, state){

			if (config["pagelink"] == "text") {
				var tmpText = config["pagetext"];
				tmpText = tmpText.replace(/_current/ig, idx);
				tmpText = tmpText.replace(/_total/ig, carousel["options"]["size"]);
				carousel.container.find(".jcarousel-pagetext").html(tmpText);
			} else if (config["pagelink"] == "image") {
				jQuery(ele).find('.jcarousel-pageimg a.current').removeClass("current");
				link = jQuery(ele).find('.jcarousel-pageimg a')[idx - 1];
				jQuery(link).addClass("current");
			}
		};

		var crsl_initCallback = function(carousel, state){

			if ((config["pagelink"] == "text") || (config["pagelink"] == "both")) {
				// add container div for paging text info
				carousel.container.append('<div class="jcarousel-pagetext"></div>');

			} else if ((config["pagelink"] == "image") || (config["pagelink"] == "both")) {
				// add container div for the image dots used for paging

				var imgLinks = "";
				for (var i = 1; i <= carousel["options"]["size"]; i++) {
					imgLinks += '<a href="#' + i + '">' + i + '</a>'; // generate the individual dots for the number of pages
				}

				carousel.container.append('<div class="jcarousel-pageimg"></div>');
				jQuery(ele).find(".jcarousel-pageimg").append(imgLinks);

				// calculations done to ensure paging dots are centered aligned.
				jQuery(ele).find(".jcarousel-pageimg").css("left", parseInt($(ele).width()) / 2 - parseInt($(ele).find(".jcarousel-pageimg").width()) / 2);

				jQuery(ele).find('.jcarousel-pageimg a').bind('click', function(){
					carousel.scroll(jQuery.jcarousel.intval(jQuery(this).html()));
					return false;
				});
			}
		};

		// call constructor function from jcarousel plugin
		$(ele).find('.crsl').jcarousel({
			scroll: config["scroll"],
			animation: config["slow"],
			auto: config["auto"],
			wrap: config["wrap"],
			itemFirstInCallback: crsl_itemFirstInCallback,
			initCallback: crsl_initCallback,
			start: config["start"],
			itemFallbackDimension:config["itemFallbackDimension"]
		});
	},
	
	dynlead: function(ele, config){
		config = $.extend({
			delay: 15000,
			loops: 0,
			showThumbnails: false,
			widthThumbails: 110,
			pause: null
		}, config);
		var _timeout;
		var currentSlide = 0;
		var slides = $(ele).find(".dl-content li");	// store the content panels
		var pageLinks = $(ele).find(".dl-menu");	// store the navigational elements
		var maxSlides = slides.length;				// max number of content panels
		var countLoop = 0;
		// set up video links and layers
		$(".video-cn").hide();
		$(ele).find(".videolink").click(function(){
			clearTimeout(_timeout);
			$(this).hide();
			$(this).parent().find(".video-cn").show();
		});
		// set up pause button
		var play = true;
		if (config["pause"] != null) {
			$(ele).find("." + config["pause"]).click(function(){
				txt = ($(this).html() == "PAUSE") ? "PLAY" : "PAUSE";
				$(this).html(txt);
				if (play) {
					clearTimeout(_timeout);
					play = false;
				}
				else {
					nextSlide(ele, config);
					play = true;
				}
			});
		}
		slides.not(":first").hide(); // hide all except first
		pageLinks.find("li:first-child").addClass("active"); // select first in paging
		pageLinks.find("li").each(function(i){ // for all page links apply hover event and click event	
			var $this = $(this);
			if (config["showThumbnails"]) {
				// apply hover event if showing thumbnails
				var thPreviewID = ele.id + "-cn-th-" + i;
				$this.attr({
					"rel": "#" + thPreviewID
				});
				$this.next(".content-th").attr({
					"id": thPreviewID
				});
				$this.cluetip({
					width: config["widthThumbails"],
					cluezIndex: 6,
					cluetipClass: 'content-th',
					local: true,
					showTitle: false,
					sticky: true,
					mouseOutClose: true,
					closePosition: 'title',
					closeText: '',
					topOffset: 6,
					leftOffset: -($this.parent().width()),
					positionBy: 'fixed',
					dropShadow: false,
					cursor: 'hand',
					titleAttribute: '',
					waitImage: false
				});
				$this.hover(function(e){
					// reset offsets
					height = $("#cluetip-inner").outerHeight();
					$('#cluetip').hide();
					opt = {
						margin: true,
						padding: true,
						border: true,
						scroll: true
					};
					anchorPos = $(this).offset({
						scroll: true,
						margin: true,
						padding: true,
						border: true
					});
					_top = parseInt(anchorPos["top"]) - parseInt(height);
					$('#cluetip').css('top', _top);
					$('#cluetip').show();	
				}, function(){
					if ($('#cluetip').is(':visible')) {
					
						$('#cluetip').hover(function(){
							$('#cluetip').show();
						}, function(){
							$('#cluetip').hide();
						});
						$('#cluetip').hide();
					}
				});
			} // end setup for thumbnails
			$this.click(function(){
				// click event for pagelinks.  onclick will take user to selected page.  
				//alert('called');
				clearTimeout(_timeout);
				currentSlide = i; // reset the currentSlide to the index of the link that was clicked
				nextSlide(ele, config);
			});
		});
		
		var nextSlide = function(ele, config){
			clearTimeout(_timeout);
			var currentID = ele.id;
			var currentPage = slides[currentSlide];
			$(ele).find("li.active").removeClass("active");
			pageLinks.find("li:eq(" + currentSlide + ")").addClass("active");			
			$(currentPage).fadeIn('slow').siblings().not(":hidden").fadeOut('slow');  // the animation
			if (currentSlide == (maxSlides - 1)) {
				currentSlide = 0;
				countLoop++;
			}
			else {
				currentSlide++;
			}
			if ((countLoop < config["loops"]) && (config["loops"] > 0)) {
				_timeout = setTimeout(function(){
					nextSlide(ele, config);
				}, config["delay"]);
			}
		};
		
		if ((config["loops"] > 0)) {
			_timeout = setTimeout(function(){
				nextSlide(ele, config);
			}, config["delay"]);
		}
	}, // end of dyn-lead
	
	accordion:function(el, config){
		config = $.extend({
			autoheight: true,
			header:'.acco-link',
			animated: ($.browser.msie ? false : 'easeOutSine')
		}, config);
		
		jQuery(el).accordion(config);
	}, // end accordian
	
	tabs: function(el, config) {
		jQuery(el).tabs(config);
	}, // end tabs
	
	// Collapser: Psuedo-Accordion
	collapser: function(el,config){
		config = $.extend({
			programguide: false,
			videochannels: false
		}, config);
		if (config["programguide"] == true) {
			var today = new Date();
			var current_time = today.getHours();
			var current_minutes = today.getMinutes();
			var dayofweek = today.getDay();
			var weekend = false;
			if (dayofweek == 0 || dayofweek == 6) {
				weekend = true;
			}
			if (weekend == true && current_time >= 7 && current_time < 12) {
				$("#prog-guide .morning").addClass("active");
			}
			else if (current_time >= 9 && current_time < 12) {
				$("#prog-guide .morning").addClass("active");
			}
			else if (current_time >= 12 && current_time < 16) {
				$("#prog-guide .daytime").addClass("active");
			}
			else if (current_time >= 16 && current_time < 19) {
				$("#prog-guide .evening").addClass("active");
			}
			else if (current_time >= 19 && current_time < 23) {
				$("#prog-guide .primetime").addClass("active");
			}
			else {
				$("#prog-guide .latenight").addClass("active");
			};
		};
		if (config["videochannels"] == true) {
			// prime the toggles for the video channels
			togglelist = $(el).find('li.switch');
			togglelist.each(function(){
				var $this = $(this);
				// click target for li toggle
				var target = $this.find("h4");
				// hide carousel if active class not present
				if (!$this.hasClass("active")) {
					$this.find(".crsl-w").hide();
				};
				target.click(function(){
					if ($this.hasClass("active")) {
						$this.removeClass("active");
						$this.find(".crsl-w").hide(250);
					} else {
						$this.addClass("active");
						$this.find(".crsl-w").show(250);
					}
				});
			});
		};
		if (config["videochannels"] != true) {
			$(el).children(":first").each(function(){
				var $this = $(this);
				$this.click(function(){
					$this.parent().toggleClass("active");
				});
			});
		};
	} //end collapser
};

jQuery.fn.dpl = jQuery.dpl.init;