/** @fileoverview define and instantiate:
 *
 *			 SNI.HGTV.GlobalHeader
 *
 *
 */ 

/*
SNI.HGTV.loadMobileJS = function(callbackFunc) {
    var url = (SNI.Config.env === 'prod') ? 'http://hgtv.sndimg.com/webhgtv/hg20/js/hammer.js' : 'http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/hammer.js';
    
    jQuery.ajax({
	url: url,
	dataType: 'script',
	success: function(data) {
	    if ( typeof callbackFunc === 'function') callbackFunc();
	}
    });
}
*/


SNI.HGTV.hasTouch = function () {
    if (typeof (SNI.HGTV.hasTouchSupport) === 'undefined') {
    
	SNI.HGTV.hasTouchSupport = false;

	if( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            SNI.HGTV.hasTouchSupport = true;
	}
    }
    return SNI.HGTV.hasTouchSupport;
}
SNI.HGTV.hasTouch();


(function($) {
	
	var GlobalHeader = function() {
		
		var GlobalHeader = this;
			
		/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
		*			@class Global Site Navigation (top tabs, sub-tabs, drop-downs)
		*			public methods: 
		*				init()  						: main initializer for site nav
		*				getTabsToSelect()		: get top nav and sub nav tab (text) from metadata
		*				setSelectedTabs()				: set selected tabs (CSS class)
		*				loadDropsDta()			: kick off script tag injection load of nav menu drop content (JSON)
		*				processNavLoad()		: callback to process the menu drop content (assign to member; fill selected sub-nav)
		*/
		
		var globalNav = function() {

			var globalNav = this;
			globalNav.MENU_DELAY = 500;
			globalNav.MENU_DELAY_IN = 100;

			if (typeof SNI.Config.navHoverDelay == 'number') {
				globalNav.MENU_DELAY = SNI.Config.navHoverDelay;
			}

			if (typeof SNI.Config.navHoverDelayIn == 'number') {
					globalNav.MENU_DELAY_IN = SNI.Config.navHoverDelayIn;
			}

			globalNav.oSiteNav = {};   // will receive JSON for drops
			globalNav.navSelector = "#hg-sitenav";    // selects nav, can be overridden
			globalNav.jQnav = {};  // jQuery selector for nav; set on init
		
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		@member globalNav
			*		@constructor 
			*		@param jQuery object for site nav wrapper
			*		@returns void
			*/
			globalNav.init = function($nav) {
				globalNav.loadDropsDta();
				initTopNav($nav);
				initSubNavs($nav.find(".subnav ul"));
				globalNav.setSelectedTabs($nav, globalNav.getTabsToSelect(mdManager));

				return;
			};
		
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		for top nav tabs: assign event handlers for top tab hover with delayed response
			*		@member globalNav
			*		@param jQuery object for site nav wrapper
			*		@returns void
			*/
			function initTopNav($nav) {
				var navTimer = null;
				var navDelay = 250;
				var $topNav = $nav.find(".topnav"); // main menu elements
				var $subNav = $nav.find(".subnav ul");// flyout elements
				// save menu load state:
				$topNav.children("li").data("drops", false).filter(".sel").addClass("savesel");
				$subNav.filter(".sel").addClass("savesel");

				$topNav.children("li").hover(
					function(e) {
						// top nav mouse enter: set select after delay
						var $this = $(this);							
						clearTimeout( navTimer );
						navTimer = null;
						if ($this.hasClass("sel")) { return; }
						navTimer  = setTimeout( function () {
							if (! $this.data("drops")) {
								if (fillDrops( (/tab-([\S]+)/.exec($this.attr("class")))[1])) { $this.data("drops", true); }
							}
							$topNav.children("li.sel").removeClass("sel").find(".subnav > ul li.dd-on").removeClass("dd-on");
							$this.addClass("sel"); 
							
							//Adjusting arrow-r to be centered
								$topNav.children("li.sel").find('.nav').each(function(){
									var _this = $(this);
									var liCenterHeight = Math.round(((_this.height()) /2) + 6);
									_this.find('.arrow-r').css('margin-top', -liCenterHeight);
								})
							
							}, navDelay );
					
					
					}
					,
					function(e) {
						// top nav tab mouse leave: revert to default (page load) select after delay
						var $this = $(this);
						clearTimeout( navTimer );
						navTimer = null;
						navTimer  = setTimeout( function () {
							$topNav.children("li.sel").removeClass("sel").find(".subnav > ul li.dd-on").removeClass("dd-on");
							$topNav.children("li.savesel").addClass("sel"); }, navDelay );
					}
				
				);
				
				
				return;
			}
			
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		for sub nav tabs: assign event handlers; loop through each group
			*		@member globalNav
			*		@param jQuery object for sub navs
			*		@returns void
			*/
			function initSubNavs($subnavs) {
				/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
				*		set event handlers for one sub nav (one set of section-level tabs, under one super-section)
				*		@member initSubNavs
				*		@param jQuery object for one sub nav (ul)
				*		@returns void
				*/
				function initOneSubNav($subnav) {
					var navTimer = null;
					var navDelay = globalNav.MENU_DELAY;					
					var originalListHeight = 0;
					
					$subnav.parent().parent().hover(
						function(e){
							var $this = $(this);
							originalListHeight = $this.find('.subnav').height();
							
							}, 
						function(e){
							var $this = $(this);
							
							$this.find('.subnav').css('height', originalListHeight);	
								}
					)
					
					
					$subnav.children("li.nav").hover(
						function(e) {
							// sub nav mouse enter: set select immediately, no delay; clear pending drop close delays
							var $this = $(this);
							clearTimeout( navTimer );
							navTimer = null;
							navTimer = setTimeout( function() {
							if ($this.hasClass("dd-on")) { return; }
							$this.siblings("li.nav").removeClass("dd-on");
							$this.addClass("dd-on");
							
							/*make height the same for containers*/
							var linkList = $this.parent().parent();
							var flyout = $this.children('.dd20');
							var linkListHeight = $this.parent().parent().height();
							var flyoutHeight = $this.children('.dd20').height();	

							if (flyoutHeight < originalListHeight){
								flyout.css('height', originalListHeight);
								linkList.css('height', originalListHeight);
							} 
							else if (flyoutHeight > originalListHeight){
								linkList.css('height', flyoutHeight);
						
							}
							else{
								flyout.css('height', originalListHeight);
								linkList.css('height', originalListHeight);
							}
							}, 150);
						},
						function(e) {
							// sub nav tab mouse leave: close drop after delay
							var $this = $(this);

							clearTimeout( navTimer );
							navTimer = null;
							navTimer  = setTimeout( function () {
								$this.removeClass("dd-on"); }, navDelay );
						}
					);
					
					//IE Bug Fix for SE-4360 with SE-4423
					if ( $.browser.msie ){
						$subnav.parent().hover(function(){
							$('.topnav .dd20').attr("style","");	
						},
						function(){
							$('.topnav .dd20').hide();					
						})
					}
					
					return;
				}
				
				// initSubNavs entry point:
				$subnavs.each( function(i) { initOneSubNav($(this)); } );
				return;
			}
	
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		compute tabs (top nav and sub nav) from metadata
			*		@member globalNav
			*		@param jQuery object for site nav wrapper
			*		@returns object with variables for tTab, sTab
			*/
			globalNav.getTabsToSelect = function(md) {
				var o = { tTab: "xyz", sTab: "abc"};
				if (((typeof md.getParameter("SctnNameLineage")) != "undefined") && (md.getParameter("SctnNameLineage") != "")) {
					var aLin = md.getParameter("SctnNameLineage").split(',');
					if (typeof aLin[0] != "undefined") { aLin.pop(); }
					if (typeof aLin[0] != "undefined") { o.tTab = aLin.pop().toLowerCase().replace(new RegExp(" ", "g"), '-'); }
					if (typeof aLin[0] != "undefined") { o.sTab = aLin.pop().toLowerCase().replace(new RegExp(" ", "g"), '-'); }
				} else {
					if (((typeof md.getParameter("CategoryDspName")) != "undefined") && (md.getParameter("CategoryDspName") != "")) {
						o.tTab = md.getParameter("CategoryDspName").toLowerCase();
					}
					if (((typeof md.getParameter("SctnDspName")) != "undefined") && (md.getParameter("SctnDspName") != "")) {
						o.sTab = md.getParameter("SctnDspName").toLowerCase();
					}
				}
				return o;
			};
	
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		set initially selected tabs based on page metadata; default (no match) is "Rooms" supersection, no section
			*		@member globalNav
			*		@param jQuery object for site nav wrapper
			*		@param object with variables for tTab, sTab
			*		@returns void
			*/
			globalNav.setSelectedTabs = function($nav, oTabs) {
				var $tTabs = $nav.find(".topnav > li");
				$tTabs.removeClass("sel savesel");
				var $tTab = $tTabs.filter(".tab-" + oTabs.tTab);
				if ($tTab.length > 0) {
					$tTab.addClass("sel savesel");
					var $sTab = $tTab.find(".tab-" + oTabs.sTab);
					if ($sTab.length > 0) {
						$sTab.addClass("sel");			
					}
				} else {
					//$tTabs.eq(0).addClass("sel savesel"); removes home from tentpole tabs	
				}

				//this works for the blog pages (runs 2x first is empty) - tests to see if the array is empty and if not builds the sub nav 
				//not working on the regular pages because the array is empty and no inline call is present as in blogs

				if(!jQuery.isEmptyObject(globalNav.oSiteNav)){	
					GlobalHeader.buildSubNav(oTabs.tTab, globalNav.oSiteNav);
					}
				else{
					GlobalHeader.setTentpoleTab();
					GlobalHeader.setDontMiss();
					GlobalHeader.subNavTenPlus();
					GlobalHeader.subNavFlyout();
					GlobalHeader.subNavPadding();
				}
				return;
			};
	
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		loadDropsDta: asynch load of JSON defining global nav (for inserting drop-downs)
			*		@member globalNav
			*		@param none
			*		@returns (void)
			*/
			globalNav.loadDropsDta = function() {
				$.ajax({url: SNI.Config.navDropJsonPath + "&callback=SNI.HGTV.GlobalHeader.globalNav.processNavLoad", 
								dataType: 'script', 
								cache: true,
								timeout: 5000,
								error: SNI.HGTV.GlobalHeader.globalNav.errorNavLoad
				});
			};
	
			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		processNavLoad: succcess callback for loadDropsData
			*		@member globalNav
			*		@param none
			*		@returns (void)
			*/
			globalNav.processNavLoad = function(jsondta) {
				globalNav.oSiteNav = jsondta;
				$tTab = $("#hg-sitenav .topnav > li.sel");
				if ($tTab.length > 0) {
					fillDrops((/tab-([\S]+)/.exec($tTab.attr("class")))[1]);
					$tTab.data("drops", true);
				}
				
				//Code to build sub nav (not for blog)
				var currentPage = "";	
				
				if($tTab.attr("class")){
					if(((/tab-([\S]+)/.exec($tTab.attr("class")))[1]) != null){
					var currentPage = (/tab-([\S]+)/.exec($tTab.attr("class")))[1];
					}
				}

				//blog calls setselected tab at end of page so we will build their nave in that function
				if(currentPage == 'blog')
					{return;}
				
				if ($tTab.length > 0){
					GlobalHeader.buildSubNav(currentPage, globalNav.oSiteNav);
				}
				else{
					GlobalHeader.setTentpoleTab();
					GlobalHeader.setDontMiss();
					GlobalHeader.subNavTenPlus();
					GlobalHeader.subNavFlyout();
					GlobalHeader.subNavPadding();
				}

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
			*		@param (string) top tab key
			*		@returns status: true == success, false == JSON data not available
			*/
			function fillDrops(topTab) {

				if (typeof globalNav.oSiteNav != "object") return false;
				if (!$.isArray(globalNav.oSiteNav.topTabs)) return false;		
				var o = globalNav.oSiteNav.topTabs;
				for (var i = 0; i < o.length; i++) {
					if ((typeof o[i].keyName != "undefined") && (o[i].keyName == topTab)) {
						with (o[i]) {
							if ($.isArray(subTabs)) {
								for (var j = 0; j < subTabs.length; j++) {
									$subTab = $("#hg-sitenav .topnav").find("> li.tab-" + topTab + " li.tab-" + subTabs[j].keyName);
									
									// get drop-down markup; 2nd param stub of rel attr for Omniture (incr thru dd links):
									var myHtml = fmtOneDropHtml(subTabs[j], "gh-t"+(i+1)+"s"+(j+1));
									if (myHtml != "") {
											$subTab.append(myHtml);  // insert the drop-down markup
											$subTab.append("<em class='arrow-r' />");  // show drop-down arrow in tab
	
									}
								}
							}
						}
						break;
					}
				}

				return true;
				
			}

			/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
			*		Fill the drop-downs for one tab in the sub-nav (i.e., for one section) 
			*		@param (JSON object) contents of drop down nav (links in groups, etc.)
			*		@param (string) 'rel' attribute stub (gh-tNsM) for generated links, incremented on each, for Omniture
			*		@returns (string) formatted HTML for drop-down
			*/
			function fmtOneDropHtml(oSubTab, relVal) {
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
					if ((typeof bLast != undefined) && bLast ) {
						extraClass = " last";
					}
					if ((typeof oLG.dspName) == "string") {
						retHtml += '\t\t\t<h3>' + oLG.dspName + '</h3>\n';
					}
					if ($.isArray(oLG.links)) {
						retHtml += '\t\t\t<ul class="first">\n';
						var mhalf = Math.round( oLG.links.length / 2, 0);
						for (var m = 0; m < oLG.links.length; m++ ) {
							if (m == mhalf) {
								retHtml += "\t\t\t</ul>\n";
								retHtml += "\t\t\t<ul>\n";
							}
							if ((aHtml = fmtALink(oLG.links[m])) != "") {
								retHtml += '\t\t\t\t<li>' + aHtml + '</li>\n';
							}
						}
						retHtml += "\t\t\t</ul>\n";
					}
					if ((aHtml = fmtALink(oLG.cta)) != "") {
						retHtml += '\t\t\t<p class="cta">' + aHtml  + '</p>\n';
					}
					if ((aHtml = fmtALink(oLG.oneLink)) != "") {
						retHtml += '\t\t\t<p>' + aHtml + '</p>\n';
					}
					if (retHtml != "") {
						retHtml = "\t\t<div class=\"grp clrfix" + extraClass +"\">\n" + retHtml +"\t\t</div>\n";							
					}
					return retHtml;

				}
	
				/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
				*		Format a link based on JSON object
				*		@member fmtOneDropHtml
				*		@param (JSON object) link: url, text (both required), and optional rel attribute
				*		@returns (string) formatted HTML for hyperlink (a-tag)
				*/
				function fmtALink(oLnk) {
					retHtml = "";
					if (typeof oLnk != "object") { return retHtml; }
					if (((typeof oLnk.text) != "string") || ((typeof oLnk.url) !== "string")) { return retHtml; }
					var url = oLnk.url;
					if (url.indexOf("http://") == -1) {
						url = "http://" + SNI.Config.domain + url;
					}
					retHtml = '<a href="' + url + '"';
					retHtml += ' rel=' + relVal + "-" + (++linkCt);
					if (((typeof oLnk.rel) == "string"))  { retHtml += ' rel="' + oLnk.rel +'"'; }
					if (((typeof oLnk.newWin) == "string") && oLnk.newWin == "true" )  { retHtml += ' target=\"_blank\"'; }
					retHtml += '>' + oLnk.text + '</a>';
					return retHtml;
				}
	
				// fmrOneDropHtml entry:
				var retHtml = "";
				var linkCt = 0;
	
				// loop through link groups in JSON for this tab
				if ($.isArray(oSubTab.linkGrps)) {
					for (var i = 0; i < oSubTab.linkGrps.length; i++) {
						retHtml += fmtLinkGrp( oSubTab.linkGrps[i], (i == (oSubTab.linkGrps.length - 1)) );
					}
				}
	
				// wrap and return
				if (retHtml != "") {

					var tmp = retHtml;
					retHtml = "<div class=\"dd20\">\n";
					retHtml += "\t\t<div class=\"dd20-bd\">\n";
					retHtml += "\t\t\t<div class=\"content clrfix\">\n";
					retHtml += tmp;
					retHtml += "\t\t\t</div>\n";
					retHtml += "\t</div>\n";
					retHtml += "</div>\n";
				}
		
				return retHtml;

			}
		};
		
		GlobalHeader.globalNav = new globalNav;
		
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
			var searchValue = 'Search HGTV.com';
			var _preventDefault = true;

			if(forceDefaultValue) {

					if(mdManager.getParameterString("type") == "SEARCH") {
							searchValue = mdManager.getParameterString("searchTerm");
							_preventDefault = false;
					} else if(mdManager.getParameterString("noSearchResults") == "Did You Mean") {
							searchValue = mdManager.getParameterString("dymterm");
							_preventDefault = false;
					}
			}
			// in our case, when we don't want prevent default, we want to allowDefaultValue
			SNI.Util.inputField(element + ' input', searchValue, _preventDefault, !_preventDefault );

			// animate input when focus

			GlobalHeader.animateSearch = function() {
				var speed = 100;
				var $global_search = $('.global-search');
				var $global_nav_elem = $('.topnav > li:not(.sel)');
				var navExpanded;

				$('#hd-search-input')
					.focus(function () {
						$('#hd-search-input').css('color','#333');
						$global_search.animate({
							width: 270
						}, speed).addClass('active');

						$global_search.find('.input #hd-search-input').css('width', 230);
					
					 	$global_nav_elem.animate({
					 		'padding-right': '10px'
					 	}, speed);

					 	navExpanded = true;

				}).blur(function(e) {	
						if($('#hd-search-input').val() === 'Search HGTV.com'){
							$('#hd-search-input').css('color','white');
							setTimeout(function(){
								$('#hd-search-input').css('color','#333');
							},150)
						}
						$('body, #hg-hd').children().andSelf().click(function (e) { 
						    if ($(e.target).parents().is('#hgSearchForm')) {						
								$('#hd-search-input').focus();
									e.stopPropagation();
					            } else if (navExpanded) {
					                $global_search.animate({
										width: 193
										}, speed).removeClass('active');

										$global_search.find('.input #hd-search-input').css('width', 150);

										$global_nav_elem.animate({
									 		'padding-right': '14px'
									 	}, speed);
					                navExpanded = false;
					            }
				        });
				});				
			};

			if(forceDefaultValue && !_preventDefault) {
					$(element + ' input').removeClass("input-hint");
			}
			if (autosuggest === true) {

					function findValue(li) {
									if( li == null ) {
													return alert("No match!");
									} else {
													return li.selectValue;
									}
					}

					function selectItem(li) {
									findValue(li);
					}
					var formatItem;

					if(SNI.Config.site == "HGTV") {
							formatItem = function (row, i, num, prev) {
									var formattedItem;

									if(prev.length > 0 && row[0].indexOf(prev) >= 0) {
											formattedItem = row[0].replace(prev, "<em>"+prev+"</em>")
									}

									return formattedItem || row[0];
							}
					} else {
							formatItem = function (row) {
									return row[0];
							}
					}


					/* revert this if-statement when done with dev */
					/* this is the real path to the servlet - adding a condition to initialize only on core site to avoid cross domain issues */
		//                             if (document.domain == "www.hgtv.com" || document.domain == "www.staging-hgtv.com") {
							$(element + " input").autocomplete(SNI.Config.autoSuggestService, {
									delay:10,
									width: 396,
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
									formElement: $(element + ' form')
							}
					);
		//                            }
			}
			/* removing per MM-5411, no longer using this functionality, existence of this
			 *  select box with its relative URL's was causing Google to index bad URL's
			 * S. Curtis - 10/10/2013
			$(element + " select").dropdown({
				title: 'Search In:'
			});
			*/
			// submit the form to the correct location
			$(element + ' form').submit(function() {
				var $form = $(this);
				var $searchInput = $form.find('input');
				var searchText = $.trim($searchInput.val());
				//removed, MM-5411
				//var searchIn = $form.find('option:selected').attr('id');
				
				// strip off hd_ or ft_ prefix
				//if ((aSearch = /[^_]{2}_([\S]+)/.exec(searchIn)) != null) {
				//	searchIn = aSearch[1];
				//}
				var searchAction = $form.find('select').val();
	
				// nothing was entered into the search
				if (searchText == '' 
				    || searchText.toLowerCase() == 'search'
				    || searchText.match(/[\w\d]+/g) === null) { /* MM-2550 */
				        
					//$searchInput.get(0).focus();
					return false;		
				
				} 
				//removed, MM-5411, see above notes
				/*else if (searchIn == 'tv-shows') {
					$form.attr('action', searchAction);
				
				} else if (searchIn == 'rate-my-space') {
					window.location.href = searchAction.replace(/(.*)(SEARCH_STRING)(.*)/, "$1" + escape(searchText) + "$3");
					return false;
				
				} else if (searchIn == 'designers-portfolio') {
					$form.attr('action', searchAction);
				
				} else if (searchIn == 'products') {
					searchText = searchText.replace(/\s+/, '%20').toLowerCase();
					window.location.href = searchAction + searchText + '_keyword';
					return false;

				} else if (searchIn == 'services') {
					searchText = encodeURIComponent(searchText);
					window.location.href = searchAction + "&searchVal=" + searchText;
					return false;
				}
				*/
				return true;
			});
		};
		
		GlobalHeader.subNavPadding = function() {
			$(document).ready(function(){

				$('#tentpole-menu li.sel a .r.on').parent().addClass('selem');
				$('#tentpole-menu li a .r.on').parent().parent().addClass('emroom');
				
			});
			/* page subnav menu's*/
			$('.hg-site-subnav li').hover(
				function(e){
					var $this = $(this);
					t = setTimeout( function(){
						$this.find('.hg-site-subnav-dropdown').addClass('visible');
					}, 200);
				},
				function(e){
					var $this = $(this);
					clearTimeout(t);
					$this.find('.hg-site-subnav-dropdown').removeClass('visible');
				}
			);
			/*page subnav*/
			$('.hg-site-subnav-dropdown ul').hover(function(){
					$(this).parent().parent().toggleClass('hover');
			});
			$('#tentpole-menu .content').hover(function(){
					$(this).parent().parent().parent().parent().toggleClass('hover');
			});			
		};

		/**  *  *  *  *  *  *  *  *  *  *	*  *  *  *  *	 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *				
		*  My HGTV (Community) header initialization, sensitive to UR logged-in state
		*    signed out: show sign in/ join links
		*    signed in: show My HGTV with drop down
		*  
		*		@member GlobalHeader
		*		@returns 
		*/				
		GlobalHeader.myHGTV = function() {

			var baseUrl = SNI.Config.userLoginUrl;
			var atHome = SNI.Config.userPrefUrl;
			var marketUrl = SNI.Config.userMarket;

			$('#my-hgtv .not-signed-in div a.log-in').attr('href', baseUrl + 'registration/login.esi');
			$('#my-hgtv .not-signed-in div a.join-now').attr('href', baseUrl + 'registration/register.esi');

			if ( (SNI.Community.UR.logged_in != null) && (SNI.Community.UR.logged_in == "true") ) {
				// setup dropdown
				/*var $dd = $('#my-hgtv .signed-in .dd20');
				$('#my-hgtv .signed-in .dd20-cntnr').hover(function() {
					$dd.show();
				}, function() {
					// create a slight delay when hiding
					var timer = setTimeout(function(){
						$dd.hide();
						clearTimeout( timer );
						timer = null;
					}, 100);
				});*/


				//Populate Image and User Name
				$('#my-hgtv .signed-in .customer-base img').attr('src', SNI.Community.UR.ViewingUserAvatar);
				$('#my-hgtv .signed-in .customer-base > a, #my-hgtv .signed-in .customer-base .customer-info a.customer-name').text(SNI.Community.UR.ViewingUserDisplayName);

				//Populate Personal Links
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-uploads a').attr('href', atHome + 'community/portfolio.esi'); //http://www.athomewith.com/community/portfolio.esi
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-profile a, #my-hgtv .signed-in .customer-base .customer-info a.customer-name,  #my-hgtv .signed-in .customer-base .customer-info a.customer-image, #my-hgtv .signed-in .customer-base > a').attr('href', atHome + 'community/style.esi'); //http://www.athomewith.com/community/style.esi
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-favorites a').attr('href', atHome + 'community/favorites.esi'); //http://www.athomewith.com/community/favorites.esi
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-products a').attr('href', marketUrl + 'dashboard'); //http://marketplace.hgtv.com/dashboard
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-styleboards a').attr('href', marketUrl + 'dashboard/products'); //http://marketplace.hgtv.com/dashboard/products
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-settings a').attr('href', atHome + 'community/usersettings.esi'); //http://www.athomewith.com/community/usersettings.esi
				$('#my-hgtv .signed-in .customer-base .customer-info li.my-hgtv a').attr('href', baseUrl + 'home/home.esi'); //my.hgtv.com/home/home.esi
				$('#my-hgtv .signed-in .customer-base .customer-info .sign-out').click(function(){
					SNI.Community.UR.logout();
				});


				//Show and hide div's
				$('#my-hgtv .not-signed-in').hide();
				$('#my-hgtv .signed-in').show();

			}
		};
		
		GlobalHeader.buildSubNav = function(currentPage, jsonData){

				GlobalHeader.setTentpoleTab();
				GlobalHeader.setDontMiss();

				var tabList = jsonData.topTabs;
				var current = currentPage; /*Should be currentPage - Example use on-tv*/
				var currentTab = ".topnav > .tab-" + current;
				var sctnCheck = mdManager.getParameter('Classification').split(",");
				var sponsorship = mdManager.getParameter('Sponsorship');
				var pageType = mdManager.getParameter('Type');
				var sctnDspName = mdManager.getParameter('SctnName');

				var navNumber = $(currentTab).index(); //Find out what number the top nav is for omniture building

				if (current === "home"){return;} /*No subnav for home page */
				
				/*We don't want to build subnav for the blogs or dream home*/
			
				if (current === "dream-home" || sctnCheck[1] === "DESIGNERS_PORTFOLIO" || sctnCheck[1] === "MARKETPLACE" || sponsorship === "DESIGNHAPPENS" || sctnDspName === "GARDEN GALLERIES")
				{	
					GlobalHeader.subNavTenPlus();
					GlobalHeader.subNavFlyout();
					GlobalHeader.subNavPadding();
					return;
				}
				
				//If there isn't a selected tab set it to main
				if($(currentTab + " .sel > a").html() === null && pageType === "SECTION"){
					var selectedSubTabText = "";
				}
				else if($(currentTab + " .sel > a").html() === null && pageType === "TOPICS"){ //used to not make sure no subnav is selected if topic page is not on main or subnav
					var selectedSubTabText = "topics-selected";
				}
				else{	
					var selectedSubTabText = $(currentTab + " .sel > a").html();
				}
				
				//Tab list contains all of the top tab's - go through this list and make 3 arrays storing all of the values
				for(var i = 0; i < tabList.length; i++){
					if(tabList[i].keyName == current){
						var subNavObject = tabList[i];
						var pageDisplayName = tabList[i].dspName;
						var pageDisplayURL = tabList[i].url;
						}
				}
				
				//if selectedsubtabtext isn't anything make main highlighted if not make a regular link list item
				if(selectedSubTabText == null || selectedSubTabText == ""){
					var subNavHTML = '<li class="selected"><a href="' + pageDisplayURL + '" rel="gh-t' + navNumber + '">' + pageDisplayName + ' Main </a></li>';	
				}
				else{
					var subNavHTML = '<li><a href="' + pageDisplayURL + '" rel="gh-t' + navNumber + '">' + pageDisplayName + ' Main </a></li>';	
				}
				
				//go through the list of links and sublinks to create the html structure
				//loop for items with drop down
				for(i = 0; i < subNavObject.subTabs.length; i++){
					if(subNavObject.subTabs[i].linkGrps){
						
						if(subNavObject.subTabs[i].dspName === selectedSubTabText){
							subNavHTML += '<li class="selected emroom"><a href="' + subNavObject.subTabs[i].url + '" rel="gh-t' + navNumber + 's' + (i+1) + '">' + subNavObject.subTabs[i].dspName + '<em></em></a>'
						}
						else{
							subNavHTML += '<li class="emroom"><a href="' + subNavObject.subTabs[i].url + '" rel="gh-t' + navNumber + 's' + (i+1) + '">' + subNavObject.subTabs[i].dspName + '<em></em></a>'	
						}
						
						subNavHTML += '<div class="hg-site-subnav-dropdown"><em class="arrow-up"></em><ul>';
						
						for(j = 0; j < subNavObject.subTabs[i].linkGrps[0].links.length; j++){
							
							subNavHTML += '<li><a href="' + subNavObject.subTabs[i].linkGrps[0].links[j].url + '" rel="gh-t' + navNumber + 's' + (i+1) + '-' + (j+1) + '">' + subNavObject.subTabs[i].linkGrps[0].links[j].text + '</a></li>'
						
						}
                    					
						subNavHTML += '</ul></div></li>';	
					}
					//loop for items without drop down
					else {
						if(subNavObject.subTabs[i].dspName === selectedSubTabText){
							subNavHTML += '<li class="selected"><a href="' + subNavObject.subTabs[i].url + '" rel="gh-t' + navNumber + 's' + (i+1) + '">' + subNavObject.subTabs[i].dspName + '</a></li>';
						}
						else{
							subNavHTML += '<li><a href="' + subNavObject.subTabs[i].url + '" rel="gh-t' + navNumber + 's' + (i+1) + '">' + subNavObject.subTabs[i].dspName + '</a></li>';
						}
					}
					}
				
				$('#main-subnav').html('<ul>' + subNavHTML + '</ul>');

				GlobalHeader.subNavTenPlus();
				GlobalHeader.subNavFlyout();
				GlobalHeader.subNavPadding();

				/*On TV Highlighting*/
				if(mdManager.getParameter('SctnName') === 'ON TV'){
					
					$('#main-subnav .selected').removeClass('selected'); //remove previous highlighting

					var onTvSection = mdManager.getParameter('SctnDspName');
					var urlValidation = mdManager.getParameter('Url');
					var hostShowValue = mdManager.getParameter('Show_Abbr');
					var typeId = mdManager.getParameter('Type');

					//highlighting done in different ways because of difference in meta data
					switch (onTvSection)
						{
						case 'PROGRAM_GUIDE':
						  $('#main-subnav > ul > li > a:contains("Program Guide")').parent().addClass('selected');
						  break;
						case 'SHOW':
						  $('#main-subnav > ul > li > a:contains("Shows")').first().parent().addClass('selected'); 
						  break;
						
						default:
						 $('#main-subnav ul li').first().addClass('selected');
						 break;
						} 
					
					//highlight if full episodes
					if(urlValidation === "/full-episodes/package/index.html"){
						$('#main-subnav .selected').removeClass('selected');
						$('#main-subnav > ul > li > a:contains("Full Episodes")').first().parent().addClass('selected');
					}

					//highlight if a host show
					if(hostShowValue === "HANTT" || hostShowValue === "HCASH" || hostShowValue === "HDSW1" || hostShowValue === "HCRBL" || hostShowValue === "HREIN" || hostShowValue === "HCTAL" || hostShowValue === "HDGEN" || hostShowValue === "HHIP" || hostShowValue === "FLSRA" || hostShowValue === "HCLRS"){
						$('#main-subnav .selected').removeClass('selected');
						$('#main-subnav > ul > li > a:contains("Hosts")').first().parent().addClass('selected');
					}

					//on window load test hash (coming from other pages)
					if(window.location.hash) {
					      var hashVal = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
					      if (hashVal === "hgtv-hosts"){
				    			$('#main-subnav .selected').removeClass('selected');
				    			$('#main-subnav > ul > li > a:contains("Hosts")').first().parent().addClass('selected');
				    		}
				    		else if (hashVal === "dm-shows-az"){
				    			$('#main-subnav .selected').removeClass('selected');
				    			$('#main-subnav > ul > li > a:contains("Shows")').first().parent().addClass('selected');
				    		}
					}
					
					//on click test hash (coming from same page) - only needs to work on the main page
					if( typeId === "SECTION"){
						$('#main-subnav > ul > li').click(function(){
					    	if($(this).find('> a').text() === "Shows" || $(this).find('> a').text() === "Hosts" ){
					    		hashVal = $(this).find('> a').attr('href').split('#');
					    		hashVal = hashVal[1];
					    		if (hashVal === "hgtv-hosts"){
					    			setTimeout( function(){
					    				$('#main-subnav .selected').removeClass('selected');
					    				$('#main-subnav > ul > li > a:contains("Hosts")').first().parent().addClass('selected');}
					    			, 2000); //delay so you don't see the switch when you shouldn't
					    		}
					    		else if (hashVal === "dm-shows-az"){
					    			setTimeout( function(){
					    				$('#main-subnav .selected').removeClass('selected');
					    				$('#main-subnav > ul > li > a:contains("Shows")').first().parent().addClass('selected');}
					    			, 2000); //delay so you don't see the switch when you shouldn't
					    		}
					    	}		    	
					    })
					}
				
				}


		};	
		
		GlobalHeader.subNavFlyout = function() { //This positions the flyouts so none fly outside of the main webpage body
			//new navs
			$(document).ready(function(){
				jQuery.each($('.hg-site-subnav-dropdown'), function(index){
					var _this = $(this)
					var itemWidth = $(_this).parent().width();
					var minusWidth = ((itemWidth/2) + 9);
					var position = $(_this).parent().position();
					
					$(_this).find('em').css('left', -minusWidth);

					if(position.left < 700){
						$(_this).find('ul').css('left', -1 * (itemWidth + 20));
					}
					else {
						if ($(_this).find('ul').hasClass('tenplus')){
							$(_this).find('ul').css('left', -1 * (minusWidth + 250));
						}
						else{
							$(_this).find('ul').css('left', -1 * (minusWidth + 70));
						}
					}
					
					});	
				
					
					//old navs
					jQuery.each($('#tentpole-menu .dd20'), function(index){
						var _this = $(this)
						var itemWidth = $(_this).parent().width();
						var minusWidth = 10;
						var position = $(_this).position();
						
						$(_this).find('.dd20-hd').css('left', -minusWidth);	
						
						if(position.left < 700){
							$(_this).find('.content').css('left', -1 * ((itemWidth/2) + 13));
						}
						else {
							if ($(_this).find('.content').hasClass('tenplus')){
								$(_this).find('.content').css('left', -minusWidth + 250);
							}
							else{
								$(_this).find('.content').css('left', -minusWidth + 70);
							}
						}
					
		
					});

				});
				
		};
		
		GlobalHeader.subNavTenPlus = function() { 

			$(document).ready(function(){

				jQuery.each($('.hg-site-subnav-dropdown'), function(){ 
				var _this = $(this);
				listAmount = $(_this).find('ul li').size();
				
				if (listAmount > 10){		
					$(_this).find('ul').addClass('tenplus');		
					
				}
				});

				jQuery.each($('#tentpole-menu .dd20'), function(){ 
					var _this = $(this);
					listAmount = $(_this).find('ul li').size();

					if (listAmount > 10){		
						$(_this).find('.content').addClass('tenplus');		
						
					}
				});
				
			})

		};

		GlobalHeader.setTentpoleTab = function() {
			var hook = $("#body-hook").attr('rel'),
				pagetype;

			if(typeof(hook) !== 'undefined' && hook !== null) { /*Tentpoles have a body hook for each section to tell which page you are on*/
				pagetype = hook.slice(4);
				$( "#tentpole-menu, #tentpole-subnav" ).find("li.tab-" + pagetype).addClass("sel");
			} 
			else if ( mdManager.getParameter("Type") == "SECTION" ) { /*If no body hook is present you are on the main section*/
				$( "#tentpole-menu li, #tentpole-subnav li" ).eq(0).addClass("sel");
			}
			
		};
		
		GlobalHeader.setDontMiss = function() {

			var categoryName = mdManager.getParameter("CategoryDspName");
			var classification = mdManager.getParameter("Classification");
			var sponsorship = mdManager.getParameter("Sponsorship");
			var sctnName = mdManager.getParameter("SctnName");
		
			if (classification){
				classification=classification.split(',');	
			}
			
			if(categoryName){
				categoryName = categoryName.toLowerCase();
				$('.' + categoryName).addClass('selected');
			}

			/*Stuff for blog specific highlighting and search*/
			if (categoryName && categoryName == "blog"){//whichBlog
				if(sctnName){
					$('.' + sctnName.toLowerCase().replace(" ", "")).addClass('selected');
				}
				
				if(sponsorship){ //green blog
					$('.' + sponsorship.toLowerCase().replace("BLOG", "")).addClass('selected');
				}	
				
			}

			/*newsletter highlighter*/
			if (classification && classification[0] == 'Newsletters'){
				$('.newsletters').addClass('selected');
			}

			/*spring highlighter*/
			//DRS 6/6/2012: the search condition here returns 26 rows currently
			//select * from ff_sponsorship where sponsorship_value like '%SPRING%';
			//spring event is over now, but I would double check this next year			
			if (sponsorship && sponsorship.toLowerCase().indexOf("spring") >= 0){
				$('.springevent').addClass('selected');
			}
			
		};

		GlobalHeader.iPadClicks = function(){

	    if ( SNI.HGTV.hasTouchSupport ) $('#hd-social, #main-subnav').addClass('mobile');

	    $(document).ready(function() {		
		if ( !SNI.HGTV.hasTouchSupport ) return;
					
		$('#hg-sitenav .subnav > ul > li.nav > a').click( function(e) {
							var $this = $(this);
							
							if($this.next().attr('class') === "dd20"){
								if (!$(this).hasClass('clicked')){
									$('#hg-sitenav .subnav > ul > li.nav > a').removeClass('clicked');
									$('#hg-sitenav .subnav > ul > li.nav > .dd20').hide();
									$this.next().show();
									e.preventDefault();
								}
								$this.addClass('clicked');
							}
		});

		$('.subnav-style > ul > li > a').click( function(e) {
							
							if($(this).next().attr('class') === "hg-site-subnav-dropdown"){
								if (!$(this).hasClass('clicked')){
									$('.subnav-style > ul > li > a').removeClass('clicked');
									e.preventDefault();
								}
								$(this).addClass('clicked');
							}
			});
	    });
		}
		
		
		GlobalHeader.init = function() {
			GlobalHeader.globalNav.init($("#hg-sitenav"));
			GlobalHeader.globalSearch('#hg-hd .search', true, true);
			GlobalHeader.animateSearch();
			GlobalHeader.myHGTV();
			GlobalHeader.iPadClicks();

		};
		
	};

	SNI.HGTV.GlobalHeader = new GlobalHeader;
		
}) (jQuery);
