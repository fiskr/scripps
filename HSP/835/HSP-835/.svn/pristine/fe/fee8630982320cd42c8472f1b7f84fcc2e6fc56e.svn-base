SNI.DIY.Search = {

	// setup 'more' filters on search results page
	filters: function() {
		var mostUsed = 4;
		var filters = $('.filters .filter');
		
		filters.each(function(index, value) {
			var list = $('ul', value);
			var children = list.children();
			var total = children.length;
		
			if (total > mostUsed) {			
				var title = list.prev('h5').text();
				if (title.substring(title.length-1) == ':') { title = title.substring(0, title.length-1); }
				title = 'More ' + title;
				
				var items = '';
				var a = '';
				var em = '';
				var url = '';
				children.sort(filterCompare).each(function(i, v) {
					a = $('a', v).text();
					url = $('a', v).attr("href");
					em = $('em', v).text();
					items += '<li class="fly-li"><a href="'+ url +'">' + a + ' <em>' + em + '</em></a></li>';
				});
				
				// build flyout
				var classNames = 'flyout fly-dd' + (total <= 7 ? ' noscroll' : '');
				var flyout = '<div class="' + classNames + '">';
				flyout += '<div class="fly-hd"></div>';
				flyout += '<div class="fly-bd">';
				flyout += '<a class="close"></a>';
				flyout += '<h3>' + title + '</h3>';
				flyout += '<ul class="fly-ul">';
				flyout += items;
				flyout += '</ul>';
				flyout += '</div>';
				flyout += '<div class="fly-ft"></div>';
				flyout += '</div>';
				flyout = $(flyout);
				
				// remove items from list that should be hidden
				$('li:gt(' + (mostUsed-1) + ')', list).remove();
				
				// setup the close button
				$('.close', flyout).click(function() {
					hideAllFlyouts();
					return false;
				});
				
				// setup the filter links in the flyout
				$('li a', flyout).click(function() {
					hideAllFlyouts();
					return true;
				});
				
				var moreLink = $('<p class="more"><a href="#">' + title + '</a> <em>(' + total + ')</em></p>');
				
				// setup more link
				$('a', moreLink).click(function() {
					SNI.DIY.Util.moveToView(flyout, {anchor: moreLink, topOffset: -30, leftOffset: 85});
					$('body').bind("mousedown", bodyClicked);
					return false;
				});

				// add the flyout and more link to the page
				list.after(flyout);
				list.after(moreLink);
			}
		});
		
		function hideAllFlyouts() {
			$('.filters .flyout').fadeOut('fast');
			$('body').unbind("mousedown", bodyClicked);

			return true;
		}
		
		function bodyClicked(event) {
			var element = $(event.target);
			if (element.parents().is('.flyout')) {
				return false;
			}

			hideAllFlyouts();
		}
		
		function filterCompare(a, b) {
			a = a.firstChild.innerHTML.toLowerCase();
			b = b.firstChild.innerHTML.toLowerCase();
		    return a < b ? -1 : (a > b ? 1 : 0);
		}
	},
	
	tips: function(link, tips) {
		var link = $(link);
		var tips = $(tips);
		
		link.click(function() {
			tips.fadeIn();
			$('body').bind("mousedown", bodyClicked);
			return false;
		});
		
		$('.close', tips).click(hideTip);
		
		function hideTip() {
			tips.fadeOut('fast');
			$('body').unbind("mousedown", bodyClicked);

			return true;
		}
		
		function bodyClicked(event) {
			var element = $(event.target);
			if (element.parents().is('.flyout')) {
				return false;
			}

			hideTip();
		}
	},
	
	/**
	 * Creates the 'Sort By' dropdown and sets the search sort cookie 
	 * and submits the form on change
	 */
	sortBy: function() {
		var select = $('.results-toolbar select');

		select.dropdown();
		select.change(function() {
			SNI.Util.Cookie.persist(SNI.Util.Cookie.SEARCH, 'sortOrder', select.val());
			this.form.submit();
		});
	},
	
	/**
	 * Closes the DYM notice popup and set a cookie so it won't be displayed
	 * on subsequent pages
	 */
	closeDYMNotice: function() {
		$('.notice-msg .close').click(function() {
			SNI.Util.Cookie.persist(SNI.Util.Cookie.SEARCH, 'hideDym', 'true');
			$('.notice-msg').slideUp();
			return false;
		});
	},
	
	/**
	 * Deletes the hide DYM notice cookie so the message will display until the user
	 * closes the popup
	 */
	hideDYMNotice: function() {
		SNI.Util.Cookie.persist(SNI.Util.Cookie.SEARCH, 'hideDym', null);
	}
};
