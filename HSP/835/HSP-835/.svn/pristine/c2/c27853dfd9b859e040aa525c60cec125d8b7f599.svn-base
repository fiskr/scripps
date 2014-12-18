// instantiate object namespace
/* this namespace will hold functions that can be referenced in multiple properties utilizing a common namespace */
if( typeof(SNI.Common)=='undefined' ) {
	SNI.Common = {};
}

SNI.Common.Carousel = function(element, config) {

	config = $.extend({
		pause: null,
		scroll: 1,
		animation: "slow",
		auto: 0,
		wrap: null,
		pagelink: null,
		pagetext: null,
		start: 1,
		itemFallbackDimension: 300
	}, config);
	
	var crsl_itemFirstInCallback = function(carousel, item, idx, state){

		if (config["pagelink"] == "text") {
			var tmpText = config["pagetext"];
			tmpText = tmpText.replace(/_current/ig, idx);
			tmpText = tmpText.replace(/_total/ig, carousel["options"]["size"]);
			carousel.container.find(".jcarousel-pagetext").html(tmpText);
		} else if (config["pagelink"] == "image") {
			carousel.container.find('.jcarousel-pageimg a.current').removeClass("current");
			link = carousel.container.find('.jcarousel-pageimg a')[idx - 1];
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
			carousel.container.find(".jcarousel-pageimg").append(imgLinks);

			// calculations done to ensure paging dots are centered aligned.
			carousel.container.find(".jcarousel-pageimg").css("left", parseInt(carousel.container.width()) / 2 - parseInt(carousel.container.find(".jcarousel-pageimg").width()) / 2);

			carousel.container.find('.jcarousel-pageimg a').bind('click', function(){
				carousel.scroll(jQuery.jcarousel.intval(jQuery(this).html()));
				return false;
			});
		}
	};

	// call constructor function from jcarousel plugin
	return $(element).find('.crsl').jcarousel({
		scroll: config["scroll"],
		animation: config["slow"],
		auto: config["auto"],
		wrap: config["wrap"],
		itemFirstInCallback: crsl_itemFirstInCallback,
		initCallback: crsl_initCallback,
		start: config["start"],
		itemFallbackDimension:config["itemFallbackDimension"]
	});	
	
	
};

	
