SNI.DIY.GlobalHeader = {

/*GLOBAL NAV*/
	globalNav: function() {
		
		settings = ({
		navTimer : null,
		initializeMenu : "#diy-sub-nav li",
		flyoutTopOffset :  $("#diy-hd .nav").height() - 8,
		navWidth :  $("#diy-sub-nav").width(),
		padWest : 6,
		padEast : 23
		});
		
		if ( !/iphone|ipad|ipod/i.test(window.navigator.platform) ) {
		hideAll();
		initMenu();
		}
	
		function initMenu() {
			var menu = settings.initializeMenu;
			
			$(menu).find('h3:first span').click( function() {
				hideAll();
			});	

			$(menu+"[class ^= 'nav-']").each(function(i) {
				menuItem = $(this);
				var flyOutWidth = menuItem.find('div.flyout').outerWidth();
				var tabWidth = menuItem.outerWidth();
				var divs = $(this).prevAll();
				var leftOffset = 0;

				$.each(divs, function() {
					leftOffset = leftOffset + parseInt($(this).width());
				});
				
				if (menuItem.hasClass("nav-w")) {
					leftOffset = (leftOffset) +(settings.padWest);
				} else {
					if ($(this).hasClass("all-nav")) {
						leftOffset = (settings.navWidth - flyOutWidth) + (settings.padEast);
					}else{
						leftOffset = (leftOffset - (flyOutWidth) + tabWidth) + (settings.padEast);	
					}
				}

				menuItem.find('div.flyout').css({left: leftOffset+'px', top: settings.flyoutTopOffset+'px'});

				// setup nav hovering
				menuItem.hover(function(e){
					hideAll();
					var $this = $(this);		

					$this.addClass("nav-on");
					
					settings.navTimer = setTimeout(function(){
					  $this.find('div.flyout').show();
					  navTimer = null;
					}, 250);
				},
				function(e){
					clearTimeout( settings.navTimer );
					settings.navTimer = null;
					var closeDiv = $(this);

					settings.navTimer = setTimeout(function(){
						closeDiv.removeClass("nav-on");
						closeDiv.find('div.flyout').hide();
						settings.navTimer = null;
					}, 100);

				});/*hover*/
			});/*each*/
		}
		
		function hideAll() {
			clearTimeout( settings.navTimer );
			settings.navTimer = null;
			
			$("#diy-sub-nav li[class ^= 'nav-']").each(function() {
				var navItem = $(this);
				navItem.removeClass("nav-on");
				navItem.find('div.flyout').hide();
			});
		}
	},
	/*END GLOBAL NAV*/

	/* AUTOSUGGEST/SITE SEARCH DROP DOWN */ 
	globalSearch: function(element, autosuggest, searchInputTxt) {

		if (autosuggest === true) {
			/* == autosuggest == */
			function findValue(li) {
				if( li == null ) {
				return alert("No match!");
				} else {
				$(element + ' form').submit();
				return li.selectValue;
				}
			}
	
			function selectItem(li) {
				findValue(li);
			}
	
			function formatItem(row) {
				return row[0];
			}
			/* this is the real path to the servlet - adding a condition to initialize only on core site to avoid cross domain issues */
			var host = window.location.hostname;
			if (host.indexOf("www.diynetwork.com") != -1 || host.indexOf("beta.diynetwork.com") != -1) {
				$(element + " input").autocomplete("/search/autosuggest.do", {
						delay:10,
						width: 341,
						minChars:3,
						matchSubset:1,
						matchContains:0,
						cacheLength:10,
						onItemSelect:selectItem,
						onFindValue:findValue,
						formatItem:formatItem,
						autoFill:false
					}
				);
			}
			
		}
		
		var gh = this;

		// submit the form to the correct location
		$(element + ' form').submit(function() {
			var form = $(this);
			var searchText = $.trim(form.find('input').val());
			var searchIn = $(form).find('option[selected]').attr('id');
			var searchAction = $(form).find('select').val();
			
			// nothing was entered into the search
			if (searchText == '' || searchText == searchInputTxt) {
				gh.noSearchPopup(form);
				return false;		

			} else if (searchIn == 'tv') {
				$(this).attr('action', searchAction);
			
			} else if (searchIn == 'prod-tools') {
				searchText = searchText.replace(/\s+/, '%20').toLowerCase();
				window.location.href = searchAction + searchText + '_keyword';
				return false;
			}
			return true;
		});
	},
	/*END AUTOSUGGEST/SITE SEARCH DROP DOWN */
	
	noSearchPopup: function(form) {
		var gh = this;
		
		// do some simple caching of the element
		if (typeof gh.noSearchHTML == 'undefined') {
			var html = '<div class="flyout flg fly-dd noscroll noquery">';
			html +=	'	<div class="fly-hd"></div>';
			html +=	'	<div class="fly-bd">';
			html +=	'		<a class="close"></a>';
			html +=	'		<div class="col1">&nbsp;</div>';
			html +=	'		<div class="col2">';
			html +=	'			<p>Please enter a term or phrase into the search field.<br />We recommend you search by:</p>';
			html +=	'			<ul class="list">';
			html +=	'				<li><strong>Space</strong> (e.g. <a href="#">bathroom</a>, <a href="#">bedroom</a>)</li>';
			html +=	'			   <li><strong>Show</strong> (e.g. <a href="#">Cool Tools</a>, <a href="#">Knitty Gritty</a>)</li>';
			html +=	'			   <li><strong>Project Focus</strong> (e.g. <a href="#">plumbing</a>, <a href="#">drywall</a>)</li>';
			html +=	'			   <li><strong>Structure</strong> (e.g. <a href="#">fire pit</a>, <a href="#">pergolas</a>)</li>';
			html +=	'			</ul>';
			html +=	'		</div>';
			html +=	'	</div>';
			html +=	'	<div class="fly-ft"></div>';
			html +=	'</div>';
			html = $(html);
			gh.noSearchHTML = html;
		
			// submit the query if one of the links is clicked
			$('.list a', html).click(function() {
				form.find('input').val($(this).text());
				form.submit();
				return false;
			});
		
			// hide the popup on close
			$('.close', html).click(function() {
				form.find('input').focus();
				html.fadeOut('fast');
				return false;
			});
		
			$('body').bind("mousedown", function(event) {
				var element = $(event.target);
				if (element.parents().is('div.noquery')) {
					return false;
				}

				html.fadeOut('fast');
				$('body').unbind("mousedown", this);
			});
		
			$('#diy-site-hd').append(html);
		} else {
			var html = gh.noSearchHTML;
		}
		
		html.fadeIn('fast');		
	},

	init: function(){
		var searchInputTxt = "Find Projects, How-tos and Experts' Advice";
		SNI.Util.inputField("#diy-search-input", searchInputTxt);
		SNI.DIY.GlobalHeader.globalNav();
		SNI.DIY.GlobalHeader.globalSearch('#diy-masthead .search', true, searchInputTxt);
		SNI.DIY.GlobalHeader.signin();
		SNI.DIY.ProjectFinder.init();
	},
	
	signin: function() {

		SNI.Community.UR.init();

		if (SNI.Community.UR.logged_in === true) {

			var name = SNI.Community.UR.displayName();
			var signin = $('#sign-in');
			var flyout = $('.flyout', signin);
			
			signin.hover(function() {
				flyout.fadeIn();
			}, function() {
				// create a slight delay when hiding
				var timer = setTimeout(function(){
					flyout.hide();
					clearTimeout( timer );
					timer = null;
				}, 100);
			});
			
			$('.sign-out', signin).click(function() {
				SNI.Community.UR.logout();
				return false;
			});
			
			$('.close', signin).click(function() {
				flyout.hide();
				return false;
			});

			$('#sign-in .link').text('Hi, ' + name);
			$('#sign-in .link').attr('href', "http://diy." + SNI.Config.env + "-athomewith.com/community/style.esi");
		}

        //Update the AIM URLS to represent what environment we are in.
        var prefix = '';
        if( SNI.Config.env == "dev" )
            prefix = 'dev-';
        else if( SNI.Config.env == "staging" )
            prefix = 'staging-';

        if(prefix !== '' ){
            $('#diy-hd #links a').each(function(){
                $(this).attr('href', $(this).attr('href').replace('diy.athomewith', 'diy.'+prefix+'athomewith') );
                $(this).attr('href', $(this).attr('href').replace('my.diynetwork', 'my.'+prefix+'diynetwork') );
            });
	}
	}
};
