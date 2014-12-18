(function($) {
	
	var Search2 = function() {

		var Search2 = this;
	
		Search2.init = function() {
			// open filters area:
			$("#filt-ctrl .open").click( function() { $("#filt-ctrl .open").hide(); $(".filters").animate({height: "toggle", opacity: 1.0}, { complete: function() { $(".filters h4 a.close, #filt-ctrl .close").show(); if($.browser.msie){ $(this).css({opacity:''}); } } } ); return false; });
			// initialize drop-down in filters area		
		  $(".filters").find(".jump").each( function(i, e) { SNI.HGTV.Drops.init( $(e).children(".dd20"), $(e).children("a") ); });
			// close filters area:
		  $(".filters h4 a.close, #filt-ctrl .close").click( function() { $(".filters h4 a.close, #filt-ctrl .close").hide(); $("body").trigger("click.drops_out"); $(".filters").animate({height: "toggle", opacity: 0}, {complete: function() {$("#filt-ctrl .open").show();  $(".filters h4 a.open").show(); } } ); return false; } );
			// close dym status box
		  $("#dp-search-dym h4 a.close").click( function() { $(this).hide(); $("#dp-search-dym").animate({height: "toggle", opacity: 0}, {complete: function() { document.cookie = "NoShowDYMBox=1;;path=/"; } } ); return false; } );
		};
	};

	SNI.HGTV.Search2 = new Search2;
		
}) (jQuery);
