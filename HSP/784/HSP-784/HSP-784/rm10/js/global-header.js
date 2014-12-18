if (typeof SNI === 'undefined') { SNI = {}}
if (SNI.HGRM === undefined) { SNI.HGRM = {}}

/** @fileoverview define and instantiate:
 *
 *			 SNI.HGRM.GlobalHeader
 *
 */

SNI.HGRM.GlobalHeader = (function($) {

	var GlobalHeader = function() {

		var GlobalHeader = this;

		/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
		 *			@class Global Site Navigation (top tabs, sub-tabs, drop-downs)
		 *			public methods:
		 *				init()				  : main initializer for site nav
		 *				getTabToSelect()		: get top nav and sub nav tab (text) from metadata
		 *				setSelectedTab()		: set selected tabs (CSS class)
		 *				loadDropsDta()			: kick off script tag injection load of nav menu drop content (JSON)
		 *				processNavLoad()		: callback to process the menu drop content (assign to member; fill selected sub-nav)
		 */

		var globalNav = function() {

			var globalNav = this;
			globalNav.MENU_DELAY_OUT = 500;
			globalNav.MENU_DELAY_IN = 100;
			
			if (typeof SNI.Config.navHoverDelayOut == 'number') {
				globalNav.MENU_DELAY_OUT = SNI.Config.navHoverDelayOut;
			}
			if (typeof SNI.Config.navHoverDelayIn == 'number') {
				globalNav.MENU_DELAY_IN = SNI.Config.navHoverDelayIn;
			}
		
			globalNav.oSiteNav = {};   // will receive JSON for drops
			globalNav.navSelector = "header:first nav";    // selects nav, can be overridden
			globalNav.jQnav = {};  // jQuery selector for nav; set on init 

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		@member globalNav
			 *		@returns void
			 *		initialization tasks for global site nav
			 */
			globalNav.init = function() {
				globalNav.jQnav = $(globalNav.navSelector);
				initNavBar(globalNav.jQnav.find(".nav-wrap ul"));
				globalNav.setSelectedTab(globalNav.getTabToSelect(mdManager));
				globalNav.loadDropsDta();
				return;
			};

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		for nav tabs: assign event handlers for each tab
			 *		@member globalNav
			 *		@param jQuery object for nav tabs
			 *		@returns void
			 */
			function initNavBar($navtabs) {
				/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
				 *		set event handlers for one sub nav (one set of section-level tabs, under one super-section)
				 *		@member initNavBar
				 *		@param jQuery object for nav list (here, HGRM, actually two ULs, primary & secondary)
				 *		@returns void
				 */
				var navTimerOut, navTimerIn = null;
				$navtabs.children("li.nav").hover(
						function(e) {
							// sub nav mouse enter: set select after (short) delay -- changed from no delay (in HGTV)
							var $this = $(this);
							clearTimeout(navTimerOut);
							navTimerOut = null;
							if ($this.hasClass("dd-on")) {
								return;
							}
							$navtabs.find("li.nav").removeClass("dd-on");
							clearTimeout(navTimerIn);
							navTimerIn = null;
							navTimerIn = setTimeout(function () {
								$this.addClass("dd-on");
							}, globalNav.MENU_DELAY_IN);
						},
						function(e) {
							// sub nav tab mouse leave: close drop after delay
							var $this = $(this);
							clearTimeout(navTimerIn);
							navTimerIn = null;
							clearTimeout(navTimerOut);
							navTimerOut = null;
							navTimerOut = setTimeout(function () {
								$this.removeClass("dd-on");
							}, globalNav.MENU_DELAY_OUT);
						}
					);
				return;
			}

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		compute current nav tab from metadata
			 *		@member globalNav
			 *		@param metadata object
			 *		@returns string (will map to class of desired tab)
			 */
			globalNav.getTabToSelect = function(md) {
				var tabKey = "xyz";
				if (((typeof md.getParameter("SctnName")) != "undefined") && (md.getParameter("SctnName") != "")) {
					tabKey = md.getParameter("SctnName");
				}
				return tabKey;
			};

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		set initially selected tabs based on page metadata; default (no match) is "Rooms" supersection, no section
			 *		@member globalNav
			 *		@param string for tab class
			 *		@returns success (false = not found/not set, true = found & set)
			 */
			globalNav.setSelectedTab = function(tabKey) {
				var retVal = false;
				if ($.isEmptyObject(globalNav.jQnav)) {
					globalNav.jQnav = $(globalNav.navSelector).eq(0);  // if somehow init was bypassed
				}
				tabKey = tabKey.toLowerCase().replace(/ /g, '-');
				var $tTabs = globalNav.jQnav.find(".nav-wrap > ul > li");
				$tTabs.removeClass("sel savesel");
				var $tTab = $tTabs.filter(".tab-" + tabKey);
				if ($tTab.length > 0) {
					$tTab.addClass("sel savesel");
					retVal = true;
				}
				return retVal;
			};

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		loadDropsDta: asynch load of JSON defining global nav (for inserting drop-downs)
			 *		@member globalNav
			 *		@param none
			 *		@returns (void)
			 */
			globalNav.loadDropsDta = function() {
				$.ajax({url: SNI.Config.navDropJsonPath + "&callback=SNI.HGRM.GlobalHeader.globalNav.processNavLoad",
					dataType: 'script',
					cache: true,
					timeout: 45000,
					error: SNI.HGRM.GlobalHeader.globalNav.errorNavLoad });
			};

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		processNavLoad: succcess callback for loadDropsData
			 *		@member globalNav
			 *		@param none
			 *		@returns (void)
			 */
			globalNav.processNavLoad = function(jsondta) {
				globalNav.oSiteNav = jsondta;
				// fill drop-down menus for selected super-section
				fillDrops();
				return;
			};

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		errorNavLoad: error callback for loadDropsData; probably never gets called w/ JSONP script-tag method
			 *		@member globalNav
			 *		@param none
			 *		@returns (void)
			 */
			globalNav.errorNavLoad = function(oXHR, sError) {
				return;
			}


			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		fillDrop: find, format and insert drop-down data for all sub tabs under specified top tab
			 *		@member globalNav
			 *		@returns status: true == success, false == JSON data not available
			 *		modified to handle extra level for new grouped (primary/secondary) structure if present
			 */
			function fillDrops() {
				var i, o =[], myHtml;
				if (typeof globalNav.oSiteNav != "object") return false;
				// flatten primary/secondary navs into one array
				if ($.isArray(globalNav.oSiteNav.navGrps)) {
					for (i = 0; i < globalNav.oSiteNav.navGrps.length; i++) {
						o = o.concat(globalNav.oSiteNav.navGrps[i].topTabs);
					}
				} else if ($.isArray(globalNav.oSiteNav.topTabs)) { 
					o = globalNav.oSiteNav.topTabs;
				} else {
					return false;
				}
				var bShivIt = (typeof window.innerShiv === "function") && $.browser.msie && ($.browser.version < 9);
				for (i = 0; i < o.length; i++) {
					if ( (typeof o[i].keyName == "string") && $.isArray(o[i].linkGrps) ) {
						$thisTab = $("nav").find("li.tab-" + o[i].keyName);
						if ( (typeof $thisTab != "object") || ($thisTab.length == 0) ) continue;
						// get drop-down markup; 2nd param stub of rel attr for Omniture (incr thru dd links):
						myHtml = fmtOneDropHtml(o[i], "gh-t" + (i + 1));
						if (myHtml != "") {
							if (bShivIt) {
								myHtml = innerShiv(myHtml);
							}
							$thisTab.append(myHtml);  // insert the drop-down markup
						}
					}
				}
				setHandlers();
				positionDrops();
				return true;
			}

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
			 *		Fill the drop-downs for one tab in the sub-nav (i.e., for one section)
			 *		@param (JSON object) contents of drop down nav (links in groups, etc.)
			 *		@param (string) 'rel' attribute stub (gh-tNsM) for generated links, incremented on each, for Omniture
			 *		@returns (string) formatted HTML for drop-down
			 */
			function fmtOneDropHtml(oTab, relVal) {

				function evalObj(o) {
					for (var a=o.split('.'), r=window, k; k=a.shift(); r=r[k]) ;
					return r;
				}

				function fixUrl(url, dom) {
					if (url.search(/^http(s?):\/\//) == -1) {
						if (typeof dom === "string") {
							dom = evalObj(dom);
						} else {
							dom = SNI.Config.domain;
						}
						url = "http://" + dom + url;
					}
					return url;
				}				


				/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
				 *		Format a link based on JSON object
				 *		@member fmtOneDropHtml
				 *		@param (JSON object) link: url, text (both required), and optional rel attribute
				 *		@returns (string) formatted HTML for hyperlink (a-tag)
				 */
				function fmtALink(oLnk) {
					var retHtml = "";
					if (typeof oLnk != "object") {
						return retHtml;
					}
					if (((typeof oLnk.text) != "string") || ((typeof oLnk.url) !== "string")) {
						return retHtml;
					}
					var url = fixUrl(oLnk.url, oLnk.domain);
					retHtml = '<a href="' + url + '"';
					retHtml += ' rel="' + relVal + '-' + (++linkCt) + '"';
					if (((typeof oLnk.newWin) == "string") && oLnk.newWin == "true") {
						retHtml += ' target=\"_blank\"';
					}
					retHtml += '>' + oLnk.text + '</a>';
					return retHtml;
				}

				/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
				 *		Format one link group in a drop-down
				 *		@member fmtOneDropHtml
				 *		@param (JSON object) link group: title, list of links (url, text), call-to action (single url + text)
				 *						(requires at minimum list of links or cta)
				 *		@param bLast boolean : whether to add "last" class to group ul wrapper
				 *		@returns (string) formatted HTML for part of drop-down
				 */
				function fmtLinkGrp(oLG, bLast) {
					var retHtml = "";
					var extraClass = "";
					var aHtml;
					if ((typeof bLast != 'undefined') && bLast) {
						extraClass += " last";
					}
					if ((typeof oLG.type != 'undefined')) {
						if (oLG.type == "search") {
							extraClass += " special";
						}					
					} else {
						oLG.type = "links";
					}
					if (extraClass != "") {
						extraClass = ' class="' + $.trim(extraClass) + '"';
					}
					retHtml += "<section" + extraClass + ">";
					if ((typeof oLG.dspName) == "string") {
						retHtml += '<div class="hd"><p>' + oLG.dspName + '</p></div>';
					}
					retHtml += '<div class="bd">';	
					if (oLG.type == "links") {
						if ($.isArray(oLG.links)) {
							retHtml += '<ul>';
							var mhalf = Math.round(oLG.links.length / 2, 0);
							for (var m = 0; m < oLG.links.length; m++) {
								if (m == mhalf) {
									retHtml += "</ul>";
									retHtml += "<ul>";
								}
								if ((aHtml = fmtALink(oLG.links[m])) != "") {
									retHtml += '<li>' + aHtml + '</li>';
								}
							}
							retHtml += "</ul>";
						}
						if ((aHtml = fmtALink(oLG.cta)) != "") {
							retHtml += '<p class="cta">' + aHtml + '</p>';
						}
						if ((aHtml = fmtALink(oLG.oneLink)) != "") {
							retHtml += '<p>' + aHtml + '</p>';
						}
					} else if (oLG.type == "search") {
						if (typeof oLG.action == 'string' & $.isArray(oLG.fields)) {
							var myAction = oLG.action;
							if (myAction.indexOf("http://") == -1) {
								myAction = fixUrl(myAction, oLG.domain);
							}
							retHtml += '<form id="' + oLG.id +'" class="global-search" action="' + myAction + '" method="get">';
							formScript = "";
							retHtml += '<div class="input">';
							for (var i = 0; i < oLG.fields.length; i++) {
								if (typeof oLG.fields[i].type != "string") {
									oLG.fields[i].type = "text";
								}
								retHtml += '<input name="' + oLG.fields[i].name + '" type="' + oLG.fields[i].type +'"';
								if (typeof oLG.fields[i].value === "string") {
									retHtml += ' value="' + oLG.fields[i].value + '"';
								}
								retHtml += ' />';
								if (typeof oLG.fields[i].prompt === "string") {
									myPreventDefault = "";
									if (typeof oLG.fields[i].preventDefault == "string") {
										myPreventDefault = ', ' + oLG.fields[i].preventDefault;
									}
									formScript += 'SNI.Util.inputField("#' + oLG.id + ' input:eq(' + i + ')",  "' + oLG.fields[i].prompt.replace(/"/g, '\\"') + '"' + myPreventDefault + ');';
								}
							}
							retHtml += '</div>';
							retHtml += '<button type="submit" title="Search" class="btn search"><span>Search</span></button>';
							retHtml += '</form>';
							retHtml += '<script>' + formScript + '</script>';
						}
					}
					retHtml += "</div>";
					retHtml += "</section>";
					return retHtml;
				}


				// fmtOneDropHtml entry:
				var retHtml = "";
				var linkCt = 0;

				// loop through link groups in JSON for this tab
				for (var i = 0; i < oTab.linkGrps.length; i++) {
					retHtml += fmtLinkGrp(oTab.linkGrps[i], (i == (oTab.linkGrps.length - 1)));
				}
				// wrap and return
				if (retHtml != "") {
					var myHtml = retHtml;
					var myClass = '';
					if (typeof oTab.treatment === "string" && oTab.treatment.length > 0) {
						myClass = ' ' + oTab.treatment;
					}
					retHtml = "<div class=\"box drop clean" + myClass + "\"><em></em>";
					retHtml += myHtml;
					retHtml += "</div>";
				}

				return retHtml;
			}
			
			// fine tune each nav drop left/right position so "point" is centered in tab
			function positionDrops() {

				var $dropBoxes = globalNav.jQnav.find(".box");
				var $peakElt = $dropBoxes.children("em");
				var peakWidth = parseInt($peakElt.css("width"));   // outerWidth no workie if display none
				var peakIndent = parseInt($peakElt.css("left"));

				function positionOneDrop(i,e) {
					var $thisBox = $(e);
					var $thisTab = $thisBox.siblings("a");
					var newOffset = ((($thisTab.outerWidth() - peakWidth))/2  - peakIndent) + "px";
					if ($thisTab.parent().hasClass('e')) {
						$thisBox.css({"right" : newOffset });
					} else {
						$thisBox.css({"left" : newOffset });
					}
					return;
				}
				
				$dropBoxes.each( positionOneDrop );
				return;
			
			}
			
			function setHandlers() {

				$("#rmr-search").submit( function(e) {
						var searchVal = $("#rmr-search input[name='rmr-term']").val();
						if ($.trim(searchVal).length > 0) {
							SNI.HGRM.RMRSearch.globalSearch(searchVal);
						} else {
							$("#rmr-search input[name='rmr-term']").get(0).focus();
						}
						e.preventDefault();	
					} );
				
				$("#hdr-kudzu-search").submit( function(e) {
						if ($("#hdr-kudzu-search input[name='searchVal']").val().trim() == '') {
							$("#hdr-kudzu-search input[name='currentLocation']").blur();
						}
						return;
					} );
				
				return;
			}
			
			
			
		};

		GlobalHeader.globalNav = new globalNav();

		/* end globalNav class */


		/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
		 *		Site search with auto-suggest object:
		 *			Initializes default search prompt text & its handler
		 *			Initializes auto-suggest pull-down
		 *			sets form action or triggers other-domain search depending on search context ("Search In" pulldown)
		 *		@member GlobalHeader
		 *		@param {string} element : jQuery selector containing text input
		 *		@param {boolean} autosuggest : set up autosuggest (y/n)
		 *		@param {boolean} forceDefaultValue: try to grab a default value from previous search and have it stick when focus
		 *		@returns boolean to control form action
		 */
		GlobalHeader.globalSearch = function(element, autosuggest, forceDefaultValue) {
			var searchValue = 'Find remodeling advice & inspiration';
			var _preventDefault = true;

			if (forceDefaultValue) {
				if (mdManager.getParameterString("type") == "SEARCH") {
					searchValue = mdManager.getParameterString("searchTerm");
					if (mdManager.getParameterString("noSearchResults") == "Did You Mean") {
						var tmpValue = mdManager.getParameterString("dymterm");
						if (tmpValue.length > 0) {
							searchValue = tmpValue;
						}
					}
					_preventDefault = false;
				}
			}
			// in our case, when we don't want prevent default, we want to allowDefaultValue
			SNI.Util.inputField(element + ' input', searchValue, _preventDefault, !_preventDefault);

			if (forceDefaultValue && !_preventDefault) {
				$(element + ' input').removeClass("input-hint");
			}

			// turn off typeahead if it would result in an x-origin request
			if (window.location.hostname != SNI.Config.domain) {
				autosuggest = false;
			}
			
			if (autosuggest === true) {

				function findValue(li) {
					if (li == null) {
					//	return alert("No match!");
					} else {
						return li.selectValue;
					}
				}

				function selectItem(li) {
					findValue(li);
				}

				function formatItem(row, i, num, prev) {
					var formattedItem;
					if (prev.length > 0 && row[0].indexOf(prev) >= 0) {
						formattedItem = row[0].replace(prev, "<em>" + prev + "</em>")
					}
					return formattedItem || row[0];
				}
				
				$(element + " input").autocomplete(
						SNI.Config.autoSuggestService, 
						{	delay:10,
							width: 320,
							minChars:3,
							matchSubset:1,
							matchContains:0,
							cacheLength:10,
							onItemSelect:selectItem,
							onFindValue:findValue,
							formatItem:formatItem,
							autoFill:true,
							backspaceAutofill: true,
							resultsShow: {method: "slideDown", duration: 300},
							resultsHide: {method: "slideUp", duration: 300},
							stylizedOverlay: true,
							formElement: $(element + ' form'),
							maxItemsToShow: 7,
							svcTermInPath: true	}
				);

			}

			// submit the form to the correct location
			$(element + ' form').submit(function() {
				var $form = $(this);
				var $searchInput = $form.find('input');
				var searchText = $.trim($searchInput.val());

				// nothing was entered into the search
				if (searchText == '' || searchText.toLowerCase() == 'search') {
					$searchInput.get(0).focus();
					return false;
				} 
				return true;
			});
		};

		/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
		 *  My hgtvremodels (Community) header initialization, sensitive to UR logged-in state
		 *    signed out: show sign in/ join links
		 *    signed in: show My hgtvremodels with drop down
		 *
		 *		@member GlobalHeader
		 *		@returns
		 */

		GlobalHeader.myHGRM = function() {
			//$("#my-hgrm .not-signed-in #ur-login").attr("href", "http://" + SNI.Community.UR.Core.getLoginLink());
			//$("#my-hgrm .not-signed-in #ur-register").attr("href", "http://" + SNI.Community.UR.Core.getRegisterLink());

			if (SNI.Community.UR.logged_in) {
				$('#my-hgrm .signed-in .hello a, #my-hgrm .signed-in .drop .feature a').text(SNI.Community.UR.ViewingUserDisplayName);
				if (typeof SNI.Community.UR.ViewingUserAvatar === "string" && SNI.Community.UR.ViewingUserAvatar.length > 0) {
					$('#my-hgrm .signed-in .hello').before('<li class="avatar"><img width="20" height="20" src="' + SNI.Community.UR.ViewingUserAvatar + '" /></li>');
					$("#my-hgrm .signed-in .drop .feature").prepend('<img width="48" height="48" src="' + SNI.Community.UR.ViewingUserAvatar + '" />');
				}
				$('#my-hgrm .signed-in a').not('.btn').each( function() { $(this).attr("href", "http://"+SNI.Community.ur3Domain+$(this).attr("href").match(/^(http:\/\/[^\/]*)?(.*)/)[2]); });
				$('#my-hgrm .signed-in a.btn').attr("href", "http://" + SNI.Community.UR.Core.logout());
				// setup dropdown
				var $dd = $('#my-hgrm .box');
				$('#my-hgrm .signed-in .arrow').hover(function() {
					$dd.show();
				}, function() {
					// create a slight delay when hiding
					var timer = setTimeout(function() {
						$dd.hide();
						clearTimeout(timer);
						timer = null;
					}, 100);
				});

				$('.family-bar .not-signed-in').hide();
				$('#my-hgrm .signed-in').show();
			}
		};

		GlobalHeader.init = function() {
			GlobalHeader.globalNav.init();
			GlobalHeader.globalSearch('header:first .search', true, true);
			GlobalHeader.myHGRM();
		};

	};

	return new GlobalHeader();

})(jQuery);


// this may well belong somewhere else; ideally we'd call from Community lib
SNI.HGRM.RMRSearch = (function($) {

	var r = function() {
		var r = this;
		
		// taken directly from SNI.Community.Widgets.cleanSearchQuery 
		r.cleanSearchQuery = function(input) {
			var temp = input;
			temp = temp.replace(/[^a-zA-Z 0-9&']+/g,"-");
			//temp = temp.replace(/&/g,"(amp)"); 
			temp = temp.replace(/%/g," "); //no percentage
			temp = temp.replace(/~/g," "); //no percentage
			temp = temp.replace(/#/g," "); //no percentage
			//temp = temp.replace(/&/g," "); //no ampersand
			temp = temp.replace(/\?/g," "); //no question mark
			temp = temp.replace(/\$/g," "); //no pounds either
			temp = temp.replace(/  /g," "); //trim spaces
			temp = temp.replace(/  /g," "); //trim spaces
			temp = temp.replace(/--/g,"-"); //trim dashes
			temp = temp.replace(/-/g,"--"); //user dashes are doubled for recognition
			temp = temp.replace(/ /g,"-"); //user spaces replaced with - for recognition
			//temp = temp.replace(/[^a-zA-Z 0-9]+/g,'-');
			temp = escape(temp);
			return temp;
		}
		
		r.globalSearch = function(searchVal) {
			searchVal = r.cleanSearchQuery(searchVal)
			var myPath = "http://" + SNI.Config.Community.ur3Domain + SNI.Config.Community.searchPath.replace("@term@", searchVal);
			window.location = myPath;
			return;
		}
		
	};

	return new r();
}) (jQuery);

