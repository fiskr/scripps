(function ($) {
    if (typeof (SNI.HGRM.MenuHandler) == 'undefined') {
	SNI.HGRM.MenuHandler = {};
    }

    /* opens and closes menu */
    SNI.HGRM.MenuHandler = {
        pro_style_id: '#pro-style',
        pro_category_id: '#pro-category',
        pod_grid: '.pod.grid',
        pod_grid_child: '.pod.grid .bd.three-across',
        dd_label: '.click-wrap .btn.pull',
        pagiClass: '.pagi',
        resPerPage: 24,
        currentPage: 1,
        categoryId:'',
        styleId:'',
        prevCategoryId:'',
        prevStyleId:'',
        categoryFilter:'',
        styleFilter:'',
        showroom: 0,
        space_detail: 0,
        on_page_load: 1,
        category_name: '',

        getJsonUrl: function() {
            var jsnUrlStart = '/hgrm/cda/modules/roomStyleJSON/0,,HGRM';
            var jsnUrlEnd = ',00.html';
            return jsnUrlStart + '_' + SNI.HGRM.MenuHandler.categoryId + '_' + SNI.HGRM.MenuHandler.styleId + '_' + SNI.HGRM.MenuHandler.showroom + '_' + SNI.HGRM.MenuHandler.currentPage + jsnUrlEnd;
        },

        toTitleCase: function(str) {
            return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();} );
        },

        highLightSubnav: function() {            
            $.each($('.local-nav ul li a'), function() {
                if (SNI.HGRM.MenuHandler.showroom && !SNI.HGRM.MenuHandler.on_page_load) return;
                if (SNI.HGRM.MenuHandler.category_name == $(this).html() ) {
                    $(this).addClass('sel');
                    SNI.HGRM.MenuHandler.on_page_load = 0;

                } else $(this).removeClass('sel');
            });
        },

        getResultsData: function() {
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: SNI.HGRM.MenuHandler.getJsonUrl(),
                success: function(data, textStatus, jqXHR) {
                    SNI.HGRM.MenuHandler.renderResults(data);
                    SNI.HGRM.MenuHandler.prepareResultsData();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Error: ' + ' Sorry, we are experiencing difficulties fetching the necessary data.'); //errorThrown);
                }
            });
        },

        renderResults: function(jsonData) {
            if (!jsonData || jsonData.resultsCount < 1 || jsonData.filters.length < 1) return;
            SNI.HGRM.MenuHandler.updatedDropDowns(jsonData.filters);
            SNI.HGRM.MenuHandler.updatedResults(jsonData.results);
            SNI.HGRM.MenuHandler.updatedXofY(jsonData.currentPage, jsonData.resultsCount);
            SNI.HGRM.MenuHandler.updatePagination(jsonData.currentPage, jsonData.totalPages, jsonData.resultsCount);
        },

        hidePagination: function() { $(SNI.HGRM.MenuHandler.pagiClass).hide(); },

        showPagination: function() { $(SNI.HGRM.MenuHandler.pagiClass).show(); },

        getPagiLink: function(index, currentPage) {
            if (index == currentPage) return '<span class="current">' + index + '</span>';                    
            return '<a href="javascript:void(0);">' + index + '</a>';
        },

        updatePagination: function(currentPage, totalPages, resultsCount) {
            if ( $('.pagi').length == 0 ) {
                $('.sni-w').append(' <div class="pagi">' +
                                        '<a class="nextprev prev" href=""><em></em> Previous Page</a>' +
                                        '<a href="">1</a>' +
                                        '<span class="current">2</span>' + 
                                        '<span class="nextprev prev">Next Page <em></em></span>' +
                                   '<div>');
            }
            
            var prevPage = '.nextprev.prev',
            nextPage = '.nextprev.next',
            pagiLinks = '.pagi a',
            addedEllipsis = false,
            pagiHtml = (currentPage > 1) ? '<a href="javascript:void(0);" class="nextprev prev">&larr; Previous</a>' : '';

            if (totalPages < 2) { //if only 1 page of results -> hide
                SNI.HGRM.MenuHandler.hidePagination();
                return;
            }

            var rangeLow = currentPage - 2;
            var rangeHigh = currentPage + 2;

            pagiHtml += SNI.HGRM.MenuHandler.getPagiLink(1, currentPage);
            for (var i=2; i < totalPages; i++) { //i=2 ? ->first and last pagination links would always be redered
                if ((rangeLow < i) && (i < rangeHigh)) {
                    pagiHtml += SNI.HGRM.MenuHandler.getPagiLink(i, currentPage);

                } else if (! addedEllipsis) {
                    pagiHtml += '<span>....</span>';
                    addedEllipsis = true;
                }
            }
            pagiHtml += SNI.HGRM.MenuHandler.getPagiLink(totalPages, currentPage);
            if (currentPage != totalPages) pagiHtml += '<a href="javascript:void(0);" class="nextprev next">&rarr; Next</a>';
            $(SNI.HGRM.MenuHandler.pagiClass).html(pagiHtml);

            SNI.HGRM.MenuHandler.showPagination();
        },

        updatedXofY: function(currentPage, resultsCount) {
            var from = (currentPage - 1) * 24 + 1;
            var to = (from + 23) < resultsCount ? from + 23 : resultsCount;

            $('div.lead.rule span.left cite.in.cap').text('Showing ' + from + '-' + to + ' of ' + resultsCount + ' ' + SNI.HGRM.MenuHandler.category_name);
        },

        updatedResults: function(results) {
            var filter_vals = '#' + SNI.HGRM.MenuHandler.categoryFilter + SNI.HGRM.MenuHandler.styleFilter;
            lis = '',
            filters = (filter_vals == '#') ? '' : filter_vals;
            
            $.each(results, function(index) {
                var item = $(this)[0];
                if (index % 3 == 0) lis += '<div class="bd three-across"><ul>';
                lis += 	'<li>' +
		                '<a href="' + item.url + filters + '"><img width="160" height="120" alt="' + item.title + '" src="' + item.image + '"></a>' +
                                '<a href="' + item.url + filters + '">' + item.title + '</a>' +
				'<cite class="cap"><span>' + item.designer + '</span></cite>' +
			'</li>';
                if (index == results.length || (index > 0 && index % 3 == 2)) lis += '</ul></div>';
            });
            $('.sni-w div.pod.grid').html(lis);
        },
        
        updatedDropDowns: function(filters) {
            SNI.HGRM.MenuHandler.generateDropDowns(SNI.HGRM.MenuHandler.pro_style_id, filters.style);
            SNI.HGRM.MenuHandler.generateDropDowns(SNI.HGRM.MenuHandler.pro_category_id, filters.category);
        },

        generateDropDowns: function(menuId, filters) {
            var lis = '',
            selId = $(menuId).attr('data-id');
            $.each(filters, function() {
                var item = $(this)[0],
                sel = (selId == item.id) ? ' class="selected" ' : '';
                if (item.disp) lis += '<li><a href="javascript:void(0);" data-id="' + item.id + '" onclick="javascript:void(0);">' + item.name + '</a></li>';
                else lis += '<li><span' + sel + '>' + item.name + '</span></li>';
            });
            $(menuId + ' ul').html(lis);
        },

        prepareResultsData: function(response) {
	    var gridHeight = $(SNI.HGRM.MenuHandler.pod_grid_child).height();
            if (response === "start") {
	        $(SNI.HGRM.MenuHandler.pod_grid).css('height',gridHeight);
                $(SNI.HGRM.MenuHandler.pod_grid).spinner();
                $(SNI.HGRM.MenuHandler.pod_grid_child).fadeOut('fast');
                setTimeout(function() {
                    SNI.HGRM.MenuHandler.getResultsData();
                }, 1000);
            }
            else {
	        $(SNI.HGRM.MenuHandler.pod_grid).css('height','auto');
		$(SNI.HGRM.MenuHandler.pod_grid).append('<div class="hr"><hr></div>');
                $(SNI.HGRM.MenuHandler.pod_grid).spinner('remove');
                $(SNI.HGRM.MenuHandler.pod_grid_child).fadeIn('fast');
            }
        },

        portfolioFilters: function() {

            var sni_w = '.sni-w',
            click_wrap = '.click-wrap',
            click_btn = '.click-wrap .btn, .click-wrap .more',
            display_menu = '.click-wrap .box',
            close_btn = '.click-wrap .box .hd span',
            menu_link = '.click-wrap .box a';

            SNI.HGRM.MenuHandler.category_name = SNI.HGRM.MenuHandler.toTitleCase( mdManager.getParameterString('SctnDspName').split('_').slice(1).join(' ') );
            if ('PORTFOLIO_DETAIL' == mdManager.getParameterString('DelvFrmt')) SNI.HGRM.MenuHandler.space_detail = 1;
            SNI.HGRM.MenuHandler.highLightSubnav();

            //ajax call to update results upon pagination
	    $(sni_w).delegate('.pagi a', 'click', function (e) {
		e.stopPropagation();
		e.preventDefault();

                var newPage = parseInt($(this).html());
                if (isNaN(newPage)) {
                    newPage = SNI.HGRM.MenuHandler.currentPage;

                    if ($(this).hasClass('prev')) newPage--;
                    else if ($(this).hasClass('next')) newPage++;

                    if (newPage == SNI.HGRM.MenuHandler.currentPage) { return; }
                }

                SNI.HGRM.MenuHandler.currentPage = newPage;
                SNI.HGRM.MenuHandler.prepareResultsData('start');

                $('html, body').animate({scrollTop:285}, 'slow');
            });

            //ajax call to update results
	    $(click_wrap).delegate(menu_link, 'click', function (e) {
		e.stopPropagation();
		e.preventDefault();

                var link = $(this);
                var dd = $(this).parents(click_wrap);

                if (SNI.HGRM.MenuHandler.space_detail) { 
                    SNI.HGRM.ProGallery.refreshPortfolioPage(link.attr('href'), dd.attr('id'));
                    return;
                }

                if ('#' + dd.attr('id') == SNI.HGRM.MenuHandler.pro_style_id) {
                    SNI.HGRM.MenuHandler.prevStyleId = SNI.HGRM.MenuHandler.styleId;
                    SNI.HGRM.MenuHandler.styleId = link.attr('data-id');
                    SNI.HGRM.MenuHandler.styleFilter = '/style/' + link.text().replace(/\s/g, '+');
                    if (! SNI.HGRM.MenuHandler.styleId) SNI.HGRM.MenuHandler.styleFilter = ''; //fixes Any Style selection
            
                } else {
                    SNI.HGRM.MenuHandler.prevCategoryId = SNI.HGRM.MenuHandler.categoryId;
                    SNI.HGRM.MenuHandler.categoryId = link.attr('data-id');
                    SNI.HGRM.MenuHandler.categoryFilter = '/space/' + link.text().replace(/\s/g, '+');
                    if (! SNI.HGRM.MenuHandler.categoryId) SNI.HGRM.MenuHandler.categoryFilter = ''; //fixes Any Category selection                     
                }

                dd.children(SNI.HGRM.MenuHandler.dd_label).html(link.text() + ' <span></span>');
                SNI.HGRM.MenuHandler.currentPage = 1;
                SNI.HGRM.MenuHandler.prepareResultsData('start');
                $(close_btn).trigger('click');
            });
        },
        
	toggleBox: function() {
	    var click_wrap = '.click-wrap',
	    click_btn = '.click-wrap .btn.pull, .click-wrap .more',
	    display_menu = '.click-wrap .box',
	    close_btn = '.click-wrap .hd.tint span',
	    menu_link = '.click-wrap .box a';
            SNI.HGRM.MenuHandler.closeBox();

	    // toggle menu
	    $(click_wrap).delegate(click_btn, 'click', function (e) {
                //console.log('click_btn TB');
		if ($(this).hasClass('sel')) {
		    $(this).removeClass('sel').siblings(display_menu).removeClass('show');
		    SNI.HGRM.StoreVariable.activeMenu = '';
		} else {
		    $(this).addClass('sel').siblings(display_menu).addClass('show');
		    if (typeof SNI.HGRM.StoreVariable.activeMenu.removeClass == 'function') {
			SNI.HGRM.StoreVariable.activeMenu.removeClass('sel').siblings(display_menu).removeClass('show');
		    }
		    SNI.HGRM.StoreVariable.activeMenu = $(this);
		}
		e.stopPropagation();
		e.preventDefault();
	    });

	    // close menu with button
	    $(click_wrap).delegate(close_btn, 'click', function (e) {


		$(this).closest(display_menu).removeClass('show');
		$(click_btn).removeClass('sel');
		SNI.HGRM.StoreVariable.activeMenu = '';
		e.stopPropagation();
	    });

	    // reference for open menu
	    if (typeof SNI.HGRM.StoreVariable === 'undefined') {
		SNI.HGRM.StoreVariable = {};
		SNI.HGRM.StoreVariable.activeMenu = '';
	    }

	    // close menu when click on body; need wacky selector for header, footer elts
	    $('body').children().andSelf().click(function (e) {
		if ($(e.target).parents().is(display_menu)) {
		    e.stopPropagation();
		} else if (typeof SNI.HGRM.StoreVariable.activeMenu.removeClass == 'function') {
		    SNI.HGRM.StoreVariable.activeMenu.removeClass('sel').siblings(display_menu).removeClass('show');
		    SNI.HGRM.StoreVariable.activeMenu = '';
		}
	    });

	},

	closeBox: function () {
	    var display_menu = '.box';
	    var close_btn = '.box .box.drop.half span, .close-btn';
	    var box_wrapper = '.lead, .pod';

	    $(close_btn).click(function () {
                
                //console.log('close box funciton');

		$(this).closest(box_wrapper).fadeOut('fast');
		return false;
	    });
	},

	moreBox: function (t, d) { 	/* open/close on hover */
	    $(t).hover(
		function () {
		    $(this).children(d).show();
		}, function () {
		    $(this).children(d).hide();
		});
	},

	searchFilters: function () {
	    var $toggleBtn = $('.narrow-results-btn');
	    var $searchBox = $('#narrow-results-box');
	    var $closeBtn = $('#narrow-results-box > .hd > span');
	    var $showMore = $('#narrow-results-box .cta > a');
	    var $boxContainers = $searchBox.find('.cta');
	    var defaultMsg = 'Hide Narrowing Filters';
	    var toggleMsg = 'Narrow Your Results';

	    // toggle panel
	    $toggleBtn.click(function () {
		$searchBox.slideToggle('fast', function () {
		    if ($(this).is(':hidden')) {
			$toggleBtn.text(toggleMsg);
		    } else {
			$toggleBtn.text(defaultMsg);
		    }
		});
		return false;
	    });

	    // close panel (only)
	    $closeBtn.click(function () {
		$searchBox.slideUp('fast', function () {
		    $toggleBtn.text(toggleMsg);
		});
		return false;
	    });

	    $showMore.click(function(e) {
		var $_self = $(this);
		if(!$_self.siblings('.box').hasClass('active')) {
		    $boxContainers.children('.box').removeClass('active').fadeOut('fast');
		    $_self.siblings('.box').addClass('active').fadeIn('fast');
		} else {
		    $_self.siblings('.box').removeClass('active').fadeOut('fast');
		}
		e.stopPropagation();
		return false;
	    });

	    $('html').click(function (e) {
		$boxContainers.children('.box').removeClass('active').fadeOut('fast');
	    });
	}
    };
})(jQuery);