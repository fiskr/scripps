/*
* Tabs - ported over from HGTV and utilized in the topic pages
* pvaca made slight modifications:
*   -changed namespace from NotSoSimpleTabs to FilterTabs
*   -updated container classnames, ideally should be configurable
*   -commented out animated fade in/out navigation
*
* */

(function($) {

	var oTabs = function() {
		oTabs = this;
		oTabs.$wrap = {};
		oTabs.$Nav = {};
		oTabs.$Cont = {};
 

		// Nielsen non-std event tracking
		oTabs.nseTrack = function($elt) {
			var retVal = false;
			if (typeof SNI.Nielsen == "undefined") return retVal;
			if (oTabs.$Wrap.attr("id") == "ss-ideas") {
				SNI.Nielsen.trackNSE();
				retVal = true;
			}
			return retVal;
		};

		oTabs.init = function($modWrap, nInit) {
			oTabs.$Wrap = $modWrap;
			oTabs.$Nav = $modWrap.find(".filter");
			oTabs.$Cont = $modWrap.find(".filter-cont");
			oTabs.$Nav.addClass("dis");
			oTabs.$Nav.find("li a").click(function() {
				if (oTabs.$Nav.hasClass("dis") || $(this).parent().hasClass("sel")) { return false; }
				oTabs.$Nav.find("li.sel").removeClass("sel");
				$(this).parent().addClass("sel");
				oTabs.nseTrack($(this));
				oTabs.fTransOut(oTabs.$Wrap.find(".filter-cont > li#" + $(this).attr("rel")));
				return false;
			});

			oTabs.$Cont.append('<li class="loader"><span></span></li>');
			idx = 0;
			if ((typeof nInit != "undefined") && (nInit != 0)) {
				if (nInit < 0) {
					// initially selected tab is random
					idx = Math.floor(Math.random() * oTabs.$Nav.find("li").length);
				}
				else if (nInit < oTabs.$Nav.find("li").length) {
					// initially selected tab was specified
					idx = nInit;
				}
			}
			oTabs.$Nav.find("li").eq(idx).addClass("sel");
			oTabs.fTransIn(oTabs.$Cont.find("li#" + oTabs.$Nav.find("li.sel a").attr("rel")));
			return;
		};

		oTabs.fTransOut = function($elt) {
			oTabs.$Nav.addClass("dis");
			/* is this really neccesarry? */
            //oTabs.$Nav.find("li a").not("li.sel a").animate({color: "#dae7e3", backgroundColor: "transparent"}, { duration: 500, complete: function(){$(this).attr("style","");} } );
			//oTabs.$Nav.find("li.sel a").animate({color: "#fff", backgroundColor: "#fbcfcf"}, {duration: 500, complete: function(){$(this).attr("style","");} });
			oTabs.$Cont.find("li.loader").fadeIn(250);
			oTabs.$Cont.find("li.sel").animate({opacity: 0, height: "toggle"}, {duration: 500, complete: function() {	$(this).removeClass("sel"); oTabs.fTransIn($elt);} } );
		};

		oTabs.fTransIn = function($elt) {
			oTabs.$Cont.find("li.loader").fadeOut(250);
			$elt.find("img").each( function(i, e) { SNI.Util.LazyLoad($(e)); } );
			//oTabs.$Nav.find("li a").not("li.sel a").animate({color: "#386cb4", backgroundColor: "transparent"}, { duration: 500, complete: function(){$(this).attr("style","");} } );
			//oTabs.$Nav.find("li.sel a").animate({color: "#fff", backgroundColor: "#ef4141"}, {duration: 500, complete: function(){$(this).attr("style","");} });
			$elt.animate({opacity: 1, height: "toggle"}, {duration: 500, complete: function() {
									$(this).addClass("sel");
									if($.browser.msie){ $(this).css({opacity:''}); }
									oTabs.$Nav.removeClass("dis");
									} }
			);
			return;
		};
	};

	SNI.FilterTabs = new oTabs;

}) (jQuery);
