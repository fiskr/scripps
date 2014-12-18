
SNI.HGTV.Gardens = SNI.HGTV.Gardens || {};

/** **************************************************************************************
 * SNI.HGTV.Gardens powers all HGTV Garden Gallery (GG) interactions
 *      init()                  : is the initialization function for the GG Category (GGC) pages
 *      initGardenDetails()     : is the initialization function for the GG Detail (GGD) pages
 */

SNI.HGTV.Gardens = {
    /**
     * Common/Necessary variables and selectors
     */ 
    pod_grid: '.pod.grid',
    pod_grid_child: '.pod.grid .bd.three-across',
    pagiClass: 'div.pod.grid .pagi',
    resPerPage: 24,
    currentPage: 1,
    categoryFilter:'',
    styleFilter:'',
    space_detail: 0,
    style: '',
    color: '',
    category: '',
    sponsor: 0,
    portf_loop: [],
    photo_wrapper: '.pg-photo-wrapper',
    portf_photo: '.pg-photo-wrapper a.photo img',
    toggler: '.pg-photo-display .pg-toggler',
    hotspot_object: '#sponsored_hotspot',
    sponsor_multi_logo: '.sponsor-multi-logo',
    photo_outer_wrapper: '.pg-photo-display-wrapper',
    current_portf_id: '',
	current_portf_index: 0,
	next_portf_index: 0,
	prev_portf_index: 0,
    portf_category: 'Portfolio_Space',
    portf_style: 'Portfolio_Style',
    portf_color: 'Color',
    portf_designer: '',
    color_url_param: '',
    style_url_param: '',
    category_url_param: '',
    portf_photo_href: '.pg-photo-wrapper a.photo',
    next_portfolio: 'div.pg-navigation .right .nextprev',
    prev_portfolio: 'div.pg-navigation .left .nextprev',
    photo_title: 'div.pg-photo-description h1',
    photo_desc:  'div.pg-photo-description p',
    image_credit:  'div.pg-photo-description span.pg-author-name',
    fetchingData: false,
	isNext: true, //whether next (not previous) has been pushed last
	retryFlag: false, //if error try next gallery and set this true to revert to error message
    ajaxCache: {}, //to cache results of preload function, for performace 
	
    /**
     * init fuction for GG Category pages. Wires up all JS interactions
     */
    init: function(){
        SNI.HGTV.Gardens.SctnId = mdManager.getParameter('SctnId');
	SNI.HGTV.Gardens.flyout();
	SNI.HGTV.Gardens.onFilterChange();
	

	var urlRcode = window.location.href.match('/r[0-9][0-9][0-9]/'), //the category code
		urlPcode = window.location.href.match('/py/'); //sponsored code
		if(urlPcode) SNI.HGTV.Gardens.sponsor = 1; 
				//highlight product nav
	        	$('nav.local-nav-wrap.local-nav li a').each(function() {
				//this used to match the text in the product subnav with the section
				//now it matches the current urls R-code with the R-code in the url of the subnav
				//The advantage is that it is robust to editorial changes to the names.
					var $el = $(this),
	             		$elRmatch = $el.attr('href').match('/r[0-9][0-9][0-9]/'),
						$elPmatch = $el.attr('href').match('/py/');						
						if ((urlRcode && $elRmatch && $elRmatch[0]==urlRcode[0]) || (urlPcode && $elPmatch)){ 
	                		$el.parent().attr('class', 'current');
	                		return false;
	            		}
						
	        		});



    //swipe stuff -- using hammer.js, map swipe events to next/previous button clicks
    swipeForElement = function(el) {        
        if(!el.length) {console.log("el.length = 0"); return; }
        var hammer = new Hammer(el.get(0), {
        drag_min_distance: 0,
        drag_horizontal: true,
        drag_vertical: false,
        transform: false,
        hold: false,
        prevent_default: false
        });
        
        // ondragend we will fire next/prev photo click events
        hammer.ondragend = function(ev) {   
        if(ev.direction == 'right') {
            $('div.pagi .nextprev.prev').trigger('click');
        } else if(ev.direction == 'left') {
            $('div.pagi .nextprev.next').trigger('click');
        }
        }

        // ondrag we preview the next/prev slide
        hammer.ondrag = function(ev) {
        var left = 0;
        // determine which direction we need to show the preview
        if(ev.direction == 'left') {
            left = 0 - ev.distance;
        } else if(ev.direction == 'right') {
            left = ev.distance;
        }
        }
        
    }

    swipe = function() {
        /* Set-up Hammer -- swiping grid should trigger next/previous pagination clicks */
        swipeForElement($('.pod.grid'));
    }

    //load hammer.js if device has touch support
    if ( SNI.HGTV.hasTouch() ) {
        SNI.HGTV.loadMobileJS(swipe);
    }


    },

    /**
     * Enable on-click close/open events for GG dropdown filters
     * @shared by both Category and Detail pages
     */
    flyout: function() {	
	$('li.filter').delegate('div.select-flyout-selector', 'click', function() {
            var $el = $(this);
            if( $el.parent().hasClass('flyout-is-open') )  { //if flyout already open - close it
                $('div.flyout-for-select').hide().parent().removeClass('flyout-is-open');
                return;
            }

	    $('div.flyout-for-select').hide().parent().removeClass('flyout-is-open');            
	    $el.next('div.flyout-for-select').show();
	    $el.parent().addClass('flyout-is-open');
            SNI.HGTV.Gardens.openMenu = $(this);
	});

	$('body').children().andSelf().click(function (e) { //close dropdowns when click on anything but them
	    if ($(e.target).parents().is('li.filter')) {
		e.stopPropagation();
            } else if (typeof SNI.HGTV.Gardens.openMenu === 'object') {
                $('div.flyout-hd span.close').click();
                SNI.HGTV.Gardens.openMenu = '';
            }
        });

	$('div.flyout-hd').delegate('span.close', 'click', function() { //dropdown menus close button
            var $el = $(this).parent().parent();
            $el.hide();
	    $el.parent().removeClass('flyout-is-open');
	});
    },

    /**
     * Generates the the URL necessary to fetch JSON for the GG Category Page
     */
    getJsonUrl: function() {
        var jsnUrlStart = '/hgtv/cda/modules/roomStyleJSON/0,,HGTV_' + SNI.HGTV.Gardens.SctnId;
        var jsnUrlEnd = '_1,00.html';		
        return jsnUrlStart + '_' + SNI.HGTV.Gardens.category + '_' + SNI.HGTV.Gardens.style + '_' + SNI.HGTV.Gardens.color + '_' + SNI.HGTV.Gardens.sponsor + '_' + SNI.HGTV.Gardens.currentPage + jsnUrlEnd;
    },

    /**
     * Requests the JSON necessary to update results on the GG Category Page
     */
    getResultsData: function(scrollUp) {

        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: SNI.HGTV.Gardens.getJsonUrl(),
            beforeSend: function () {
                SNI.HGTV.Gardens.hidePagination();
                SNI.HGTV.Gardens.SpinManager.setup('category');
                $(SNI.HGTV.Gardens.pod_grid_child).fadeOut('fast');
                $(SNI.HGTV.Gardens.pod_grid).css('height', $(SNI.HGTV.Gardens.pod_grid_child).height());
                if (scrollUp) {
                    var top = $('cite.in.cap').position().top - 10;
                    $('html, body').animate({scrollTop: top}, 'slow');
                }
	    },
            success: function(data, textStatus, jqXHR) {
                SNI.HGTV.Gardens.renderResults(data);
            },
            complete: function () {
		SNI.HGTV.Gardens.SpinManager.cancel('category');
	    },
            error: function(jqXHR, textStatus, errorThrown) {                
		SNI.HGTV.Gardens.errorPanel();
            }
        });
    },

    /**
     * Defines actions for pagition or filter drop down click event
     * @shared by both Category and Detail pages
     */
    onFilterChange: function(){
	$('div.flyout-for-select').delegate('li', 'click', function() {
            var $el = $(this);
            var className = $el.attr('class');
            if (className == 'disabled' || className == 'selected') return; //do nothing if option is not available

            SNI.HGTV.Gardens.currentPage = 1;
            var dropDown =  $el.parent().parent().parent();
	    var selectedValue = $el.children().text();
            var selectedId = $el.attr("data-id");
	    var selectedFilter = dropDown.parent().attr('id').replace('selector-for-select-filter-', '');

	    dropDown.hide();
	    dropDown.parent().removeClass('flyout-is-open');
	    dropDown.prev('.select-flyout-selector').children().html(selectedValue);

	    //get json results getResultsData which rebuilds the JsonUrl and calls renderResults
            if (mdManager.getParameter('Type').toLowerCase() === 'portfolio') {
                SNI.HGTV.Gardens.portf_designer = '';
                SNI.HGTV.Gardens['portf_' + selectedFilter] = selectedId;
                SNI.HGTV.Gardens.getAllFiltersAndPortfolios(true);
            }
            else {
                selectedValue = selectedValue.replace(/\s/g, '+');
                if (selectedFilter == 'color') {
                    selectedValue = selectedValue.toLowerCase();
                    SNI.HGTV.Gardens.color_url_param = '/Color-' + selectedValue
                } else if (selectedFilter == 'style')  { 
                    SNI.HGTV.Gardens.style_url_param = '/Portfolio_Style-' + selectedValue;
                } else {
                    SNI.HGTV.Gardens.category_url_param = '/Portfolio_Space-' + selectedValue;
                }
                
                SNI.HGTV.Gardens.portf_filters += '/Portfolio_Style-' + selectedValue;
                SNI.HGTV.Gardens[selectedFilter] = selectedId;
                SNI.HGTV.Gardens.getResultsData();
            }
	});

        /**
         * Any Color/Style/Category click - resets filter
         */
	$('div.flyout-for-select').delegate('button.button', 'click', function() {
            parentDiv = $(this).parent().parent().parent();
            dropDownId = parentDiv.attr('id').replace('selector-for-select-filter-', '');
            SNI.HGTV.Gardens[dropDownId] = '';

            if (mdManager.getParameter('Type').toLowerCase() === 'portfolio') {
                SNI.HGTV.Gardens['portf_' + dropDownId] = SNI.HGTV.Gardens['portf_' + dropDownId].split('-')[0];
                
                SNI.HGTV.Gardens.updateHash();
                SNI.HGTV.Gardens.getAllFiltersAndPortfolios(true);
            } else {
                SNI.HGTV.Gardens[dropDownId + '_url_param'] = '';
                SNI.HGTV.Gardens.getResultsData();
            }

            $('div.flyout-hd span.close').click();
            parentDiv.find('div.select-flyout-selector span').html('Any ' + dropDownId.charAt(0).toUpperCase() + dropDownId.slice(1));
        });

        $('div.pagi').delegate('a', 'click', function(e) {
            e.preventDefault();
            var className = $(this).attr('class');
            if (className.match('nextprev prev'))
                SNI.HGTV.Gardens.currentPage--;
            else if (className.match('nextprev next')) 
                SNI.HGTV.Gardens.currentPage++;
            else
                SNI.HGTV.Gardens.currentPage = parseInt($(this).html());
            console.log("click: " + className + " now getResultsData");
            SNI.HGTV.Gardens.getResultsData(true);
            SNI.HGTV.Gardens.getResultsData(true);
        });
    },

    /**
     * Updates page presentation on Category Pages with content/data returned in JSON
     */
    renderResults: function(jsonData) {
	if (!jsonData || jsonData.resultsCount < 1 || jsonData.filters.length < 1) return;

        SNI.HGTV.Gardens.updateResults(jsonData.results);
        $(SNI.HGTV.Gardens.pod_grid).css('height', 'auto');
        SNI.HGTV.Gardens.updateResultsRangeCount(jsonData.currentPage, jsonData.resultsCount);
        SNI.HGTV.Gardens.updateDropDowns(jsonData);
        SNI.HGTV.Gardens.updatePagination(jsonData.currentPage, jsonData.totalPages, jsonData.resultsCount);
    },

    /**
     * Updates drop down filters on Category Pages
     */
    updateDropDowns: function(jsonData) {
        var dropDowns = ['color', 'style', 'category'];
        for (var i=0; i<dropDowns.length; i++) {

            var selector = '#selector-for-select-filter-' + dropDowns[i];
            var li_options = '';

            for (var j=0; j<jsonData.filters[dropDowns[i]].length; j++) {
                var filter_item = jsonData.filters[dropDowns[i]][j];
                var li_property = (filter_item.disp) ? ' data-id="' + filter_item.id  + '" ' : ' class="disabled" ';
                
                if(SNI.HGTV.Gardens.style == filter_item.id || filter_item.id == SNI.HGTV.Gardens.color) {
                    li_property = ' class="selected" ';
                }
                li_options += '<li' + li_property + '><span>' + filter_item.name  + '</span></li>';
            }
            $(selector + ' ul.flyout-list').html(li_options);
        }
    },

    /**
     * Updates "Showing 1-24 of X Results" text
     */
    updateResultsRangeCount: function(currentPage, resultsCount) {
        var from = (currentPage - 1) * 24 + 1;
        var to = (from + 23) < resultsCount ? from + 23 : resultsCount;
		var $sel = $('div.pod.filters cite.in.cap');
 		sectionText = $sel.html().match(/of [0-9]+(.*)/)[1]; //get existing section text from backend
        $sel.text('Showing ' + from + '-' + to + ' of ' + resultsCount + ' ' + sectionText);
    },

    /**
     * Updates Category Page results grid
     */
    updateResults: function(results) {	
	
		var filter_vals = '#',
		        lis = '',
		        filters,
		 		item; 

		$.each(results, function(index) {
				item = $(this)[0];
				filter_vals = '#' + '/Portfolio_Space-' + item.Portfolio_Space + SNI.HGTV.Gardens.style_url_param + SNI.HGTV.Gardens.color_url_param;
				filters = (filter_vals == '#') ? '' : filter_vals;
				
            if (index % 3 == 0) {
		lis += '<div class="bd three-across clrfix"><ul><li class="first">' +
		    '<a title="' + item.title + '" href="' + item.url + filters + '"><img width="160" height="120" alt="' + item.title + '" src="' + item.image + '"></a>' +
		    '<a title="' + item.title + '" href="' + item.url + filters + '">' + item.title + '</a>' + '<cite class="cap"><span>' + item.designer 
		    + '</span></cite>' + '</li>';
	    }
            if (index % 3 == 1) {
		lis += 	'<li>' +  '<a title="' + item.title + '" href="' + item.url + filters + '"><img width="160" height="120" alt="' + item.title + '" src="' + item.image 
		    + '"></a>' + '<a title="' + item.title + '" href="' + item.url + filters + '">' + item.title + '</a>' + '<cite class="cap"><span>' + item.designer + 
		    '</span></cite>' + '</li>';
	    }
	    if (index % 3 == 2) {
		lis += 	'<li class="third">' + '<a title="' + item.title + '" href="' + item.url + filters + '"><img width="160" height="120" alt="' + item.title + '" src="' 
		    + item.image + '"></a>' + '<a title="' + item.title + '" href="' + item.url + filters + '">' + item.title + '</a>' + '<cite class="cap"><span>' + item.designer 
		    + '</span></cite>' + '</li>';
	    }
	    
            if (index == results.length || (index > 0 && index % 3 == 2)) lis += '</ul></div>';
        });
        $('#hg-w div.pod.grid .bd.three-across').remove();
        $('#hg-w div.pod.grid').prepend(lis);
    },

    /**
     * Updates Category Page pagination
     */
    updatePagination: function(currentPage, totalPages, resultsCount) {
        if ( $('.pagi').length == 0 ) {
            $('.sni-w').append(' <div class="pagi">' +
                               '<a class="nextprev prev" href="">&laquo; Previous Page</a>' +
                               '<a href="">1</a>' +
                               '<span class="current">2</span>' + 
                               '<span class="nextprev prev">Next Page &raquo;</span>' +
                               '<div>');
        }
        
        var prevPage = '.nextprev.prev',
        nextPage = '.nextprev.next',
        pagiLinks = '.pagi a',
        addedEllipsis = false,
        pagiHtml = (currentPage > 1) ? '<a href="javascript:void(0);" class="nextprev prev">&laquo; Previous</a>' : '<span class="nextprev prev">&laquo; Previous</span>';
        
        if (totalPages < 2) { //if only 1 page of results -> hide
            return;
        }

        var rangeLow = currentPage - 2;
        var rangeHigh = currentPage + 2;

        pagiHtml += SNI.HGTV.Gardens.getPagiLink(1, currentPage);
        for (var i=2; i < totalPages; i++) { //i=2 ? ->first and last pagination links would always be redered
            if ((rangeLow < i) && (i < rangeHigh)) {
                pagiHtml += SNI.HGTV.Gardens.getPagiLink(i, currentPage);

            } else if (! addedEllipsis) {
                pagiHtml += '<span>....</span>';
                addedEllipsis = true;
            }
        }
        pagiHtml += SNI.HGTV.Gardens.getPagiLink(totalPages, currentPage);
        if (currentPage != totalPages) pagiHtml += '<a href="javascript:void(0);" class="nextprev next">Next &raquo;</a>';
        else pagiHtml += '<span class="nextprev next">Next &raquo;</span>';

        $(SNI.HGTV.Gardens.pagiClass).html(pagiHtml);

        SNI.HGTV.Gardens.showPagination();
    },

    hidePagination: function() { $(SNI.HGTV.Gardens.pagiClass).hide(); },

    showPagination: function() { $(SNI.HGTV.Gardens.pagiClass).show(); },

    getPagiLink: function(index, currentPage) {
        if (index == currentPage) return '<span class="current">' + index + '</span>';                    
        return '<a href="javascript:void(0);">' + index + '</a>';
    },

    
    /** ************************************************************
     * All code below is ONLY for Garden Galleries Detail (GGD) pages 
     */

    refreshSocial: function(data) {
        var url = 'http://www.hgtv.com' + data.portfolioUrl;
        var page_title = data.portfolioTitle;
        
        SNI.IS.Pinterest.updateButton({
           element: '#tb-pinit iframe',
           url: url,
           imgUrl: data.images[0].lgUrl,
           desc: page_title + ": " + data.designerNotes,
           fromMsg: " From HGTV.com's Garden Galleries"
        });

        SNI.IS.FB.updateButton({
            element: '#tb-facebook iframe',
            url: url
        });

        SNI.IS.Twitter.updateButton({
			'element': '#tb-twitter',
			'url': url,
			'text': data.portfolioTitle + " - See more inspiration like this at HGTV.com's Garden Galleries."
        });

        SNI.IS.GP.updateButton({
           element: '#tb-gplus iframe',
            url: url
        });
    },
	
	deepLinkRedirect: function() {
		if (mdManager.getParameter("Type") !== 'PORTFOLIO'){return;} 
		var url_params = window.location.hash;
		if (!url_params) {return;}
		var deep_link_id = url_params.match(/\/id-[0-9]{2,9}/);
		var primId = SNI.HGTV.Gardens.getPortfIdFromUrl(window.location.href);
		if (deep_link_id) {
	       	var deepId = deep_link_id[0].split('-')[1];
			if (deep_link_id !== primId){
				//
				
		        if (url_params.length > 2) {
			    var style = url_params.match(/Portfolio_Style-[a-zA-Z-+]*/),
			    category = url_params.match(/Portfolio_Space-[a-zA-Z\+-]*/),
			    color = url_params.match(/Color-[a-zA-Z\+-]*/),
			    designer_id = url_params.match(/\/designerId\/\w*/g);
								
				if(category) { 
			                SNI.HGTV.Gardens.portf_category = category[0];
			                var url_filter_text =  SNI.HGTV.Gardens.portf_category.replace('Portfolio_Space-', '').replace(/\+/g, ' ').toLowerCase();			            
			            }
			            if(style) SNI.HGTV.Gardens.portf_style = style[0];
			            if(color) SNI.HGTV.Gardens.portf_color = color[0];
			            if(designer_id) {
			                SNI.HGTV.Gardens.portf_designer = designer_id[0];
			                SNI.HGTV.Gardens.get_designer_loop = true;
			            }

			        } else if(url_params == 0){
				    $(SNI.HGTV.Gardens.photo_count).find('span.type').html('Spaces');
				}
												
				 jQuery.ajax({
			            type: 'GET',
			            dataType: 'json',
			            url: SNI.HGTV.Gardens.getServiceUrl(deepId),
						async: false,

				    beforeSend: function () {
			                SNI.HGTV.Gardens.fetchingData = true;
					//SNI.HGTV.Gardens.SpinManager.setup('detail');
				    },

					success: function(data, textStatus){
								SNI.HGTV.Gardens.refreshPortfolioPage(data, true);
			                    return;		
			            },

				    complete: function() {			
				    },
			            error: function(jqXHR, textStatus, errorThrown) {
			                alert('Error: ' + ' Sorry, we are experiencing difficulties fetching the necessary garden galleries data.'); //errorThrown);
			            }
			        });																
				
			}
		   
	    }
	
				
	},

    hideMetaElements: function() {//hide description, title etc. when interstitial ads are present
	SNI.HGTV.Gardens.adPresent = true;
	SNI.HGTV.Gardens.authorVisibility = 'hidden';

	var $pgDesc = $('div.pg-photo-description');
	$pgDesc.css('visibility', 'hidden').find('iframe').css('visibility', 'hidden');

	var $author = $pgDesc.find('.pg-author-name');
	if ( $author.css('visibility') != 'hidden') {
	    SNI.HGTV.Gardens.authorVisibility = 'visible';
	}
	$author.css('visibility', 'hidden');

	SNI.HGTV.Gardens.checkForInterstitial();
    },

    checkForInterstitial: function() {
	if (! SNI.HGTV.Gardens.adPresent ) return false;

	var $adDiv = $(SNI.HGTV.Gardens.photo_outer_wrapper);

	if ( $adDiv.hasClass('interstitial-show') ) {
	    var t = setTimeout( function() { SNI.HGTV.Gardens.checkForInterstitial() },  200);
	} else {

	    SNI.HGTV.Gardens.adPresent = false;
	    var $pgDesc = $('div.pg-photo-description');
	    $pgDesc.css('visibility', 'visible').find('.pg-author-name').css('visibility', SNI.HGTV.Gardens.authorVisibility);
	    $pgDesc.find('iframe').css('visibility', 'visible');
	}
    },   

    initGardenDetails: function() {
		var photo_title=$(this.photo_title).text(),
			photo_desc = $(this.photo_desc).text(),
		 	clean_url = 'http://www.hgtv.com' + window.location.pathname;
	
        SNI.HGTV.Gardens.on_page_load = true;
        SNI.HGTV.Gardens.checkUrlFilters();
		
        $(window).hashchange( function() {
            SNI.HGTV.Gardens.hashChange();
        });
        SNI.HGTV.Gardens.current_portf_id = SNI.HGTV.Gardens.getPortfIdFromUrl(window.location.href);
        SNI.HGTV.Gardens.setupToggler();
        SNI.HGTV.Gardens.nextOrPreviousPhoto();
        SNI.HGTV.Gardens.flyout();
        SNI.HGTV.Gardens.onFilterChange();

        SNI.HGTV.Toolbar.addPintrestShare('#tb-pinit', $(this.portf_photo).attr('src'), $(this.photo_title).text() + ": " + $(this.photo_desc).text(), " From HGTV.com's Garden Galleries");
        SNI.HGTV.Toolbar.addFacebookShare('#tb-facebook');
        //SNI.HGTV.Toolbar.addTwitterShare('#tb-twitter');
		SNI.IS.Twitter.tweet({
					'element': '#tb-twitter',
		        	'url': clean_url,
		        	'text': photo_title + " - See more inspiration like this at HGTV.com's Garden Galleries."
		});
        SNI.HGTV.Toolbar.addGooglePlusShare('#tb-gplus');

    //swipe stuff -- using hammer.js, map swipe events to next/previous button clicks
    swipeForElement = function(el) {
        if (typeof (el) === 'undefined') {//condition is met in ad callback
        var el = $('.inter-container');
        if (el.length == 0) return;
        }
        
        if(!el.length) {console.log("el.length = 0"); return; }
        var hammer = new Hammer(el.get(0), {
        drag_min_distance: 0,
        drag_horizontal: true,
        drag_vertical: false,
        transform: false,
        hold: false,
        prevent_default: true
        });
        
        // ondragend we will fire next/prev photo click events
        hammer.ondragend = function(ev) {   
        if(ev.direction == 'right') {
            $(SNI.HGTV.Gardens.prev_portfolio).trigger('click');
        } else if(ev.direction == 'left') {
            $(SNI.HGTV.Gardens.next_portfolio).trigger('click');
        }
        }

        // ondrag we preview the next/prev slide
        hammer.ondrag = function(ev) {
        var left = 0;
        // determine which direction we need to show the preview
        if(ev.direction == 'left') {
            left = 0 - ev.distance;
        } else if(ev.direction == 'right') {
            left = ev.distance;
        }
        }
    
        // ontap we preview the next/prev slide     
        hammer.ontap = function(ev) {
            $('.pg-photo-wrapper img').trigger('click');     
        }          

    }

    swipe = function() {
        /* Set-up Hammer */
        var photo_wrap = $('.pg-photo-display');
        swipeForElement(photo_wrap);

    }

    //load hammer.js if device has touch support
    if ( SNI.HGTV.hasTouch() ) {
        SNI.HGTV.loadMobileJS(swipe);

            SNI.HGTV.DynamicAds.init({ 
		container: SNI.HGTV.Gardens.photo_outer_wrapper,
		insert_tgt: SNI.HGTV.Gardens.photo_outer_wrapper,
		dismiss_elts: [SNI.HGTV.Gardens.next_portfolio, SNI.HGTV.Gardens.prev_portfolio], 
		callback: swipeForElement
	    });

	} else {
	    SNI.HGTV.DynamicAds.init({ 
		container: SNI.HGTV.Gardens.photo_outer_wrapper,
		insert_tgt: SNI.HGTV.Gardens.photo_outer_wrapper,
		dismiss_elts: [SNI.HGTV.Gardens.next_portfolio, SNI.HGTV.Gardens.prev_portfolio], 
		callback: SNI.HGTV.Gardens.hideMetaElements
	    });
	}
    },

    hashChange: function() {
        SNI.HGTV.Gardens.getHashId();
    },

    getHashId: function() {
        if (SNI.HGTV.Gardens.get_designer_loop || SNI.HGTV.Gardens.on_page_load) {
            if (SNI.HGTV.Gardens.get_designer_loop) SNI.HGTV.Gardens.resetFilterValues();

            SNI.HGTV.Gardens.on_page_load = false;
            SNI.HGTV.Gardens.get_designer_loop = false;
 		
  		SNI.HGTV.Gardens.getAllFiltersAndPortfolios();
		return;
        }

        var ajax_id = window.location.hash.match(/\/id-[0-9]{2,9}/);

	if (ajax_id) {
			//drives the AJAX updates
			//nextOrPrevious on click --> updateHash --> here, I think
            SNI.HGTV.Gardens.fetch_portgf_id = ajax_id[0].split('-')[1];
            SNI.HGTV.Gardens.updateDetailsPageContent(SNI.HGTV.Gardens.fetch_portgf_id);  			
	}
	            
    },

    updateHash: function(data) {
        /*
        if (SNI.HGTV.Gardens.portf_designer) {
            window.location.hash = SNI.HGTV.Gardens.portf_designer;
            return;
        }
        */

        var hash = window.location.hash;
        var porft_id = (data) ? ("/id-" + data.portfolioId) : '';
	window.location.hash = porft_id + '/' +
                                SNI.HGTV.Gardens.portf_category + '/' +
                                SNI.HGTV.Gardens.portf_style + '/' +
                                SNI.HGTV.Gardens.portf_color + SNI.HGTV.Gardens.portf_designer;
		if (SNI.HGTV.Gardens.retryFlag) {SNI.HGTV.Gardens.retryFlag=false;return;} //getHashId calls portfolio service
		//necessary when refreshing a page
        if (hash == window.location.hash) SNI.HGTV.Gardens.getHashId();
    },

    getPortfIdFromUrl: function(url) {
        return url.match(/\/[0-9]{2,9}?\/index\.html/g)[0].split('/')[1];
    },

    /**
     * Generates URL for JSON returned by Endeca
     */
    getEndecaServiceUrl: function() {
        var url = '/hgtv/cxfservice/filterResults/filterBy/Core_Type-PORTFOLIO,Portfolio_Home_Section-GARDEN+GALLERIES';
        url += (SNI.HGTV.Gardens.portf_designer) ? ',Portfolio_Designer_Id-' + SNI.HGTV.Gardens.portf_designer.replace('/designerId/', '') + '/returnFilters/' : '/returnFilters/';
        return url + SNI.HGTV.Gardens.portf_category + ',' + SNI.HGTV.Gardens.portf_style + ',' + SNI.HGTV.Gardens.portf_color;
    },

    /**
     * Requests JSON on GGD page for Generates URL for JSON returned by Endeca
     */
    getAllFiltersAndPortfolios: function(refresh_page){
        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: SNI.HGTV.Gardens.getEndecaServiceUrl(),
            success: function(data) {
                if (refresh_page) {
                    SNI.HGTV.Gardens.refreshPortfolioPage(data);
                    return;
                }
                SNI.HGTV.Gardens.portf_loop = data.results;

                // updates dropdowns
                SNI.HGTV.Gardens.EndecaResults = data;
		SNI.HGTV.Gardens.updateFilters();  
		SNI.HGTV.Gardens.updateNextPrevLinks();
		SNI.HGTV.Gardens.updateGardensCount(data);
                if (data && data.count != 0) {
                    $(SNI.HGTV.Gardens.photo_description +','+ SNI.HGTV.Gardens.portf_photo).show();
                }
                if (SNI.HGTV.Gardens.portf_designer) {
                    SNI.HGTV.Gardens.updateDesignerCount(data);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
				//SNI.HGTV.Gardens.errorPanel('no_photos'); //try to make this more graceful
            }
        });
    },

    resetFilterValues: function() {
        SNI.HGTV.Gardens.portf_category = 'Portfolio_Space';
        SNI.HGTV.Gardens.portf_style = 'Portfolio_Style';
        SNI.HGTV.Gardens.portf_color = 'Color';
    },

    resetFilters: function() {
        SNI.HGTV.Gardens.resetFilterValues();
        SNI.HGTV.Gardens.portf_designer = '';
        SNI.HGTV.Gardens.getAllFiltersAndPortfolios(true);
    },

    /**
     * Update "Browse 123 from DESIGNER_NAME" text
     */
    updateDesignerCount: function(data) {
        var designer_name = $('#hg-w .garden-designer-info li a[data-designer="' + SNI.HGTV.Gardens.portf_designer + '"]').text();
        //sponsor portfolios don't have "about the pro" module; gra the name from the carousel below it
        if (! designer_name) designer_name = $('#hg-w #carousel h4 a[data-designer="' + SNI.HGTV.Gardens.portf_designer + '"]').text();

        var count = data.count;
		var browseText = '';
		
		if (count > 1) {
			browseText = count + ' Gardens from ';
		} else if (count == 1) {
	    	browseText = count + ' Garden from ';
        } else if (count == 0) {
	    	browseText = 'No gardens from ';
        }
        
        browseText += designer_name + ' | <span class="view-all" onclick="SNI.HGTV.Gardens.resetFilters();">View All Gardens</span>';

        $('ul#room-browser').remove();
        $('div.photo-gallery .h5-wrap h5').html(browseText);
    },

    /**
     * Update "Browse 123 Outdoor Retreat Gardens" text
     */
    updateGardensCount: function(data) {
	var browseText= '';
	var middleText= ' ' + SNI.HGTV.Gardens.portf_category.replace(/\+|\-|Portfolio_Space/g, ' ') 
	if (data.count > 1) {
	    browseText = 'Browse ' + data.count + middleText + ' Gardens: '; 
	}
	else if (data.count == 1) {
	    browseText = '1 ' + middleText + ' Garden: ';
	} 
	else if (data.count == 0) {
	    browseText = 'No ' + middleText + ' Gardens: ';
	}
        $('div.photo-gallery .h5-wrap h5').html(browseText);
    },

    /**
     * Updated drop down filters on GGD page based on JSON data returned by Endeca
     */
    updateFilters: function() {
        SNI.HGTV.Gardens.updateFilterValues('Portfolio_Space', '#selector-for-select-filter-category');
        SNI.HGTV.Gardens.updateFilterValues('Portfolio_Style', '#selector-for-select-filter-style');
        SNI.HGTV.Gardens.updateFilterValues('Color', '#selector-for-select-filter-color');
    },


    /**
     * Update available/selected/unavailable filter dropdown options/values
     */
    updateFilterValues: function(filter_data_selector, jquerySelector) {
        var filter = SNI.HGTV.Gardens.EndecaResults.filters[filter_data_selector];
        var options = filter.options;

        $(jquerySelector + '  ul.flyout-list li span').each(function(index) {

            var dropdown_val = $(this).html();
            available = false,
            selected = false,
            filter_val = '',
            class_attr = '';

            for (var i=0; i < options.length; i++) {
                if ( dropdown_val.toLowerCase() == options[i].t.toLowerCase() ) {
                    filter_val = options[i].v;
                    available = true;
                    selected = options[i].sel;
                    break;
                }
            }

            if (! available) class_attr = 'disabled';
            if (selected) {
                class_attr = 'selected';
                $(jquerySelector + ' .select-flyout-selector span').html(dropdown_val);
            }
            $(this).parent().attr('data-id', '' + filter.name + '-' + filter_val).attr('class', class_attr);
        });
    },

    /**
     * Grab GGD drop down filters from the values passed in the page URL
     */
    checkUrlFilters: function() {
        var url_params = window.location.hash;

        if (url_params && url_params.length > 1) {
	    var style = url_params.match(/Portfolio_Style-[a-zA-Z-+]*/),
	    category = url_params.match(/Portfolio_Space-[a-zA-Z\+-]*/),
	    color = url_params.match(/Color-[a-zA-Z\+-]*/),
	    designer_id = url_params.match(/\/designerId\/\w*/g),
		deep_link_id = window.location.hash.match(/\/id-[0-9]{2,9}/);			
   
	    if(category) { 
                SNI.HGTV.Gardens.portf_category = category[0];
                var url_filter_text =  SNI.HGTV.Gardens.portf_category.replace('Portfolio_Space-', '').replace(/\+/g, ' ').toLowerCase();
                       
            }
            if(style) SNI.HGTV.Gardens.portf_style = style[0];
            if(color) SNI.HGTV.Gardens.portf_color = color[0];
            if(designer_id) {
                SNI.HGTV.Gardens.portf_designer = designer_id[0];
                SNI.HGTV.Gardens.get_designer_loop = true;
            }

        } else if(url_params == 0){
	    $(SNI.HGTV.Gardens.photo_count).find('span.type').html('Spaces');
	}
	 if(deep_link_id) {		
	 	SNI.HGTV.Gardens.fetch_portgf_id = deep_link_id[0].split('-')[1];        
		SNI.HGTV.Gardens.updateDetailsPageContent(SNI.HGTV.Gardens.fetch_portgf_id); 
		SNI.HGTV.Gardens.updateHash({'portfolioId':SNI.HGTV.Gardens.fetch_portgf_id});
	} else SNI.HGTV.Gardens.updateHash();	
    },


    /*

    /**
     * Update GGD page content on "Next/Previous Photo" button click event
     */
    nextOrPreviousPhoto: function() {		
		     var next = nextPreviousClickEvents('div.pg-navigation .right, div.pg-photo-wrapper', true); 
		     var prev = nextPreviousClickEvents('div.pg-navigation .left', false); 
		
			function nextPreviousClickEvents(selector, isNext) { 
			            $(selector).delegate('a', 'click', function(e) {
			            	SNI.HGTV.Omniture.setAjaxOmniReferer();
							if(!SNI.HGTV.Gardens.portf_loop.length) return; //if loop busted just follow link 
			                e.preventDefault(); 
			                var portf_id = SNI.HGTV.Gardens.getPortfIdFromUrl($(this).attr('href')); 
			                SNI.HGTV.Gardens.updateHash({'portfolioId':portf_id}); 
			                SNI.HGTV.Gardens.isNext = isNext; 
			            }); 
			};
		
        /**
         * Enable "Designer Loops" - limits potfolio loop to assets by a certain desginer
         */

        $('#hg-w').delegate('.garden-designer-info ul li.design-loop a, #carousel h4 a, div.speech-bubble a', 'click', function(e) {
	    e.stopPropagation();
	    e.preventDefault();

            SNI.HGTV.Gardens.portf_designer = $(this).attr('data-designer');
            SNI.HGTV.Gardens.get_designer_loop = true;
            SNI.HGTV.Gardens.updateHash();

	    // scroll back to "narrow by" anchor
	    var targetOffset = $('section.theater.pro-gallery').offset().top-21;
	    $('body,html').animate({scrollTop: targetOffset}, 400);
	    return false;
        });
    },    

    getServiceUrl: function(portf_id) {
        return '/app/PortfolioService/index.json?portfolio=' + portf_id + '&site=HGTV';        
    },


    successFunction: function(data){//moved from updateDetailsPageContent ajax success 
        var page_load_flag= SNI.HGTV.Gardens.on_page_load; //store value 
        if (data.sponsorFlag == 'Y' || mdManager.getParameter('SponsorFlag') == 'true' || (page_load_flag && (SNI.HGTV.Gardens.current_portf_id !== portf_id))) { //refresh when leaving/going to a sponsor portfolio                    
                    SNI.HGTV.Gardens.refreshPortfolioPage(data, true);
                    return;
                }               
                SNI.HGTV.Gardens.current_portf_id = data.portfolioId;
                SNI.HGTV.Gardens.updateNextPrevLinks();
                SNI.HGTV.Gardens.updateViewer(data);
                SNI.HGTV.Gardens.updateDesigners(data);
                SNI.HGTV.Gardens.hideErrorPanel();
                SNI.HGTV.Gardens.updateCarousel(data.portfoliosFromDesigner);
                SNI.HGTV.Gardens.updateRightRail(data.rightRail);
                SNI.HGTV.Gardens.updateAds(data);  //update Metadata, Nielson, and Omniture
                SNI.HGTV.DynamicAds.refresh();
                SNI.HGTV.Gardens.refreshSocial(data);
                if(SNI.HGTV.Gardens.retryFlag){
                    SNI.HGTV.Gardens.updateHash(data); //needed if last attempt failed                    
                }

            },

    updateDetailsPageContent: function(portf_id) {
        if (SNI.HGTV.Gardens.fetchingData) return;
        $(SNI.HGTV.Gardens.toggler).hide('fast'); //hide enlarge/shrink
        $(SNI.HGTV.Gardens.portf_photo).fadeOut('fast'); //hide current photo
        $(SNI.HGTV.Gardens.photo_wrapper).attr('style', '').find('.pg-shrink').hide(); //remove custom styling and hide 'shrink' if img enlarged
        $(SNI.HGTV.Gardens.hotspot_object).remove(); //remove hotspot
        $(SNI.HGTV.Gardens.sponsor_multi_logo).remove(); //remove sponsor adv
        if(portf_id in SNI.HGTV.Gardens.ajaxCache) {//pull data from cache, if available; should be preloaded
            SNI.HGTV.Gardens.successFunction(SNI.HGTV.Gardens.ajaxCache[portf_id]);
        }
        else {//if problem w/ ajax service, preload() will fail and error handling happens here
        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: SNI.HGTV.Gardens.getServiceUrl(portf_id),

	    beforeSend: function () {
                SNI.HGTV.Gardens.fetchingData = true;
		SNI.HGTV.Gardens.SpinManager.setup('detail');
	    },
        
		success: function(data, textStatus){
		      SNI.HGTV.Gardens.successFunction(data);
            },

	    complete: function() {			
                SNI.HGTV.Gardens.fetchingData = false;
				SNI.HGTV.Gardens.SpinManager.cancel('detail');
	    },
            error: function(jqXHR, textStatus, errorThrown) {//retry with next port in loop		
			  if(!SNI.HGTV.Gardens.retryFlag){//only retry once 
				SNI.HGTV.Gardens.retryFlag=true;	
				var j=0, 
					retry_flag,			
					portfolios = SNI.HGTV.Gardens.portf_loop;
					
				SNI.HGTV.Gardens.updateCurrentPortfolioIndexes();
				
				if (SNI.HGTV.Gardens.isNext && SNI.HGTV.Gardens.next_portf_index){					
					j = SNI.HGTV.Gardens.next_portf_index;//start with next
					j = (j == portfolios.length - 1) ? 0 : j + 1; //go one more
				} else if (SNI.HGTV.Gardens.prev_portf_index){ 
	        		j = SNI.HGTV.Gardens.prev_portf_index; //start with prev
					j= (j == 0) ? (portfolios.length - 1) : j - 1; //go one more
				}				
				SNI.HGTV.Gardens.fetchingData= false;	
				if (!SNI.HGTV.Gardens.portf_loop.length) return; //don't update if Endeca error
				SNI.HGTV.Gardens.updateDetailsPageContent(portfolios[j].id);
				return;
			  }
                alert('Error: ' + ' Sorry, we are experiencing difficulties fetching the necessary garden galleries data.'); //errorThrown);
            }
        });
    } //else
    },


    updateAds: function(data) {
	$.each(data.metaData, function(key,val){ // set mdManager data
	    mdManager.setParameter(key, val);
	});
	if (typeof s == "object") { // Send data to Omniture:
	    s.t();
	}
	SNI.Nielsen.trackNSE(); // Nielson hit counter
    },

    /**
     * Updates GGD page designers area of the page
     */
    updateDesigners: function(data) {
        var designers = data.designers,
        portf_from_designer = data.portfoliosFromDesigner;

        $('div.garden-designer-info').remove();
        if (designers.length == 0) return false;

        var see_more = '<div class="speech-bubble">' +
                                '<span class="arrow"></span>' +
                                '<h4>Want to see more?</h4>' +
                                '<a href="javascript:void(0);" data-designer="DESIGNER_ID">View all photos from this professional</a>' +
                        '</div>';

        if (! (portf_from_designer && portf_from_designer.portfolios.length > 1)) see_more = ''; //if designer has only 1, don't show "see all ..."

        var secondary_wrap = '<div class="secondary-info clrfix"><h4>Also associated with this project:</h4></div>';

        var sub_container = '<div class="left-info">DESIGNER_INFO</div>' +
                            '<div class="right-info">SEE_MORE</div>';

        var container = '<div class="garden-designer-info">' +
                                '<h2>About the Professional(s)</h2>' +
                                '<div class="primary-info clrfix"></div>' +
			'</div>';

        if (designers.length) {
            $('#hg-w').prepend(container);
        }

        for (var i = 0; i<designers.length; i++) {
            var designer_html;
            if (i == 0) {
                var more = see_more.replace('DESIGNER_ID', '/designerId/' + designers[i].id);
                designer_html = sub_container.replace('DESIGNER_INFO', SNI.HGTV.Gardens.constructDesignerData(designers[i].id, designers[i].name, designers[i].text))
                                             .replace('SEE_MORE', more);
                $('div.garden-designer-info .primary-info').append(designer_html);            

            } else if (i == 1) {
                $('div.garden-designer-info').append(secondary_wrap);
                designer_html = sub_container.replace('DESIGNER_INFO', SNI.HGTV.Gardens.constructDesignerData(designers[i].id, designers[i].name, designers[i].text));

                if (designers.length > 2) {
                    designer_html = designer_html.replace('SEE_MORE', SNI.HGTV.Gardens.constructDesignerData(designers[i+1].id, designers[i+1].name, designers[i+1].text));
                } else {
                    designer_html = designer_html.replace('<div class="right-info">SEE_MORE</div>', '');
                }
                $('div.garden-designer-info .secondary-info').append(designer_html);

                return;
            }
        }
    },

    /**
     * Helper method to construct designer html
     */
    constructDesignerData: function(designers_id, designers_name, designers_text) {
        return '<ul>' +
                '<li><a href="javascript:void(0)" data-designer="/designerId/' + designers_id + '">' +
                        designers_name +
                '</a></li>' +
                        designers_text +
                '</ul>';
    },

    /**
     * Updates GG Portfolio photo, description, title etc
     */
    updateViewer: function(data) {
        var img = new Image(),
        title = data.portfolioTitle,
        desc = data.designerNotes,
        metadata = data.metaData,
	browser_title = title,
        room_type = metadata.roomType;
	
        if (room_type) {
	    browser_title += ' : ' + room_type.replace(/GP_/g,'')
                                                .replace(/_/g, ' ')
                                                .replace(/\w\S*/g, function(txt) { 
                                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); 
                                                });
	}

        if (data && data.portfoliosFromDesigner && data.portfoliosFromDesigner.designerName) {
            browser_title += ' | ' +  data.portfoliosFromDesigner.designerName;
        }
        document.title = browser_title + ' : Garden Galleries : HGTV - Home & Garden Television';

        // Returning an empty array when there is no author
        var $cite_tag = $(SNI.HGTV.Gardens.image_credit);
	if (data.images && !$.isArray(data.images[0].imageCopy)) {
            if ($cite_tag.length == 0) {
                $('div.pg-photo-description').prepend('<cite class="cap pg-auther"><span class="pg-author-name">' + 
                                                                                data.images[0].imgCreator + ' ' +
                                                                                data.images[0].imageCopy + 
                                                                                '</span></cite>');
            } else {
                $cite_tag.html(data.images[0].imgCreator + ' ' + data.images[0].imageCopy).css('visibility', 'visible');
            }
	} else { // and a string when there is an author
	    $cite_tag.css('visibility', 'hidden')
	}

        var $h5_tag = $(SNI.HGTV.Gardens.photo_title);
        if ( title && !$.isArray(title) ) {
            if ($h5_tag.length == 0) {                
                $(SNI.HGTV.Gardens.image_credit).parent().after('<h1>' + title + '</h1>');               
            } else {
                $h5_tag.html(title).show();
            }
        } else {
            $h5_tag.hide();
        }

        var $p_tag = $(SNI.HGTV.Gardens.photo_desc);
        if ( desc && !$.isArray(desc) ) {
            if ($p_tag.length > 0) {
                $p_tag.html(desc).show();
                SNI.Util.EllipsizeWithMoreLink(SNI.HGTV.Gardens.photo_desc, 
                                               300, 
                                               'read more', 
                                               'SNI.Util.RemoveEllipsize(\'' + SNI.HGTV.Gardens.photo_desc + '\')'
                                              );
            } else {
                $(SNI.HGTV.Gardens.photo_title).after('<p>' + desc + '</p>');
            }

        } else {
            $p_tag.hide();
        }

        if (data.multimedia && data.multimedia.path) {
            $(SNI.HGTV.Gardens.photo_wrapper).append('<div id="sponsored_hotspot"></div>');
            $('#sponsored_hotspot').flash({
                swf: data.multimedia.path,
		width: 616,
		height: 462,
                wmode: 'transparent',
                allowscriptaccess:'always'
	    });
            $(SNI.HGTV.Gardens.photo_wrapper).removeClass('pg-fitted');

        } else {
            $(img).load(function(response, status, xhr) {
                if (data.images[0].bvert == 'true') {
                    $(SNI.HGTV.Gardens.photo_wrapper).addClass('pg-fitted').attr('style', '.');
		    $(SNI.HGTV.Gardens.toggler).show().find('.pg-enlarge').show();
	        } else {
		    $(SNI.HGTV.Gardens.toggler).hide();
		    $(SNI.HGTV.Gardens.photo_wrapper).removeClass('pg-fitted');
	        }

                if ( ! $(SNI.HGTV.Gardens.portf_photo_href).length ) { //in case we were on a hotspot
                    $(SNI.HGTV.Gardens.photo_wrapper).append('<a class="photo" title="Next Photo"></a>');
                }
                $(SNI.HGTV.Gardens.portf_photo_href).html('').append(this);

            }).error(function() { // in case image doesn't load properly
                SNI.HGTV.Gardens.errorPanel('no_photos');
	        $(SNI.HGTV.Gardens.portf_photo).hide();
	    }).attr('src', data.images[0].lgUrl);
        }

        SNI.HGTV.Gardens.hideErrorPanel();
	$(SNI.HGTV.Gardens.photo_wrapper).fadeIn();
    },

    onDetailsPageFilterChange: function () {

    },
	
	updateCurrentPortfolioIndexes: function () {
		var j = SNI.HGTV.Gardens.current_portf_index,			
		 	portfolios = SNI.HGTV.Gardens.portf_loop;
		if (!portfolios.length) return;	//don't do this function if Endeca failed		
		if (portfolios[j].id==SNI.HGTV.Gardens.current_portf_id){//if index current, 
			//do nothing
		} else if (SNI.HGTV.Gardens.isNext && portfolios[SNI.HGTV.Gardens.next_portf_index].id == SNI.HGTV.Gardens.current_portf_id) {//next
			j = (j == portfolios.length - 1) ? 0 : j + 1;
		} else if (!SNI.HGTV.Gardens.isNext && portfolios[SNI.HGTV.Gardens.prev_portf_index].id == SNI.HGTV.Gardens.current_portf_id) {//prev
			j= (j == 0) ? (portfolios.length - 1) : j - 1;			
		} else { //search -- should only run on initial page load			
			for (var j=0; j < portfolios.length; j++) {//find it in loop -- 
				//would be better to keep track of where you are in the loop
	            if (portfolios[j].id == SNI.HGTV.Gardens.current_portf_id) {
					break;
	            }
	        }
		}
		SNI.HGTV.Gardens.current_portf_index = j;
		SNI.HGTV.Gardens.prev_portf_index = (j == 0) ? (portfolios.length - 1) : j - 1;
		SNI.HGTV.Gardens.next_portf_index = (j == portfolios.length - 1) ? 0 : j + 1;
	},


    preload: function(portf_id){//for performace purposes
        if (portf_id in SNI.HGTV.Gardens.ajaxCache) return;
        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: SNI.HGTV.Gardens.getServiceUrl(portf_id),
                success: function(result, textStatus){
                    SNI.HGTV.Gardens.ajaxCache[portf_id] = result; //cache ajax output
                    $('<img/>')[0].src = result.images[0].lgUrl; //cache image
                }
                
            }); 
        },


    /**
     * Updates links on "Next/Previous photo" based on what current filters
     */
    updateNextPrevLinks: function() {
        var portfolios = SNI.HGTV.Gardens.portf_loop,
        prev_index = 0,
        next_index = 0;
		
		if (!SNI.HGTV.Gardens.portf_loop.length) return; //try this instead of piece below for gracefulness

        if (portfolios.length == 2) { //next and prev load same portfolio when 2 results
            if (SNI.HGTV.Gardens.current_portf_id == portfolios[0].id) {
                prev_index = 1;
                next_index = 1;
            }
        } else if (portfolios.length == 1) { //prev_index and next_index set to 0 already

        } else {				
			SNI.HGTV.Gardens.updateCurrentPortfolioIndexes();
			prev_index = SNI.HGTV.Gardens.prev_portf_index;
			next_index = SNI.HGTV.Gardens.next_portf_index; 			
        }
        SNI.HGTV.Gardens.preload(portfolios[next_index].id);//preload next gallery
        if(next_index+1<portfolios.length) SNI.HGTV.Gardens.preload(portfolios[next_index+1].id); //preload two ahead
		
		if (portfolios.length > 1){
        	$(SNI.HGTV.Gardens.next_portfolio).attr('href', portfolios[next_index].url).removeClass('disabled');
        	$(SNI.HGTV.Gardens.portf_photo_href).attr('href', portfolios[next_index].url).removeClass('disabled');
        	$(SNI.HGTV.Gardens.prev_portfolio).attr('href', portfolios[prev_index].url).removeClass('disabled');
		}
		else {
			$(SNI.HGTV.Gardens.next_portfolio).click(function(e) {e.preventDefault();return false;}).addClass('disabled');
        	$(SNI.HGTV.Gardens.portf_photo_href).click(function(e) {e.preventDefault();return false;}).addClass('disabled');
        	$(SNI.HGTV.Gardens.prev_portfolio).click(function(e) {e.preventDefault();return false;}).addClass('disabled');
		}
		
    },

    refreshPortfolioPage: function(resp, portf_service) {
        var old_path = window.location.pathname,
        filters = '#/' + SNI.HGTV.Gardens.portf_category + '/' + SNI.HGTV.Gardens.portf_style + '/' + SNI.HGTV.Gardens.portf_color + '/' + SNI.HGTV.Gardens.portf_designer,
        new_url = (portf_service) ? resp.portfolioUrl : resp.results[0].url;

        if (filters == '#') filters = '';

        window.location = new_url + filters;

        if (old_path == new_url) var t = setTimeout('window.location.reload()', 500);
    },

    /**
     * Updates the DDG page carousel
     */
    updateCarousel: function(designerPhotos) {
        if (!designerPhotos || !designerPhotos.portfolios) {
            $('#carousel').remove('');
            return;
        }

        var heading = $('#carousel div.hd h4'),
        carousel = '<div class="crsl-wrap"><ul>',
        portfolios = designerPhotos.portfolios,
        designer_id = designerPhotos.designerId,
        item_template = '<li>' +
                            '<a title="PORTF_TITLE" href="PORTF_URL">' +
	                        '<img width="120" height="90" data-src="IMG_URL"/>' +
	                    '</a>' +
	                    '<span class="small"><a title="PORTF_TITLE" href="PORTF_URL">SHORT_TITLE</a></span>' +
	                '</li>';

        if (portfolios.length > 0) {
            ( $('#carousel').length ) ? $('#carousel').html('') : $('#hg-w').append('<div id="carousel" class="pod wide crsl default-nav"></div>');
        } else {
            $('#carousel').remove('');
        }
        
        $('#carousel').append('<div class="hd clrfix"><h4 class="strong">More Photos from <a href="javascript:void(0);" data-designer="/designerId/' + designer_id + '" >' + designerPhotos.designerName + '</a></h4></div>');

        for (var i=portfolios.length-1; i > -1; i--) { //if not in reverse order, carousel items are reversed..
            var ellipsed_title = SNI.Util.Ellipsize(false, 35, portfolios[i].title);

            carousel += item_template.replace(/PORTF_TITLE/g, ellipsed_title[1])
                                     .replace(/SHORT_TITLE/g, ellipsed_title[0])
                                     .replace(/PORTF_URL/g, portfolios[i].url + '#/designerId/' + designer_id)
                                     .replace(/IMG_URL/g, portfolios[i].image.imgUrl);
	}
	carousel += '</ul></div>';
        $('#carousel').append(carousel);

        if (portfolios.length > 4) {
            $('#carousel a.btn.next').removeClass('disabled');
        } else {
            $('#carousel a.btn.next').addClass('disabled');
        }
        SNI.Common.Carousel('#carousel', {visible:4});
    },

    /**
     * Updates GGD page Right Rail
     */
    updateRightRail: function(modules) {
        var $hg_e = $('div#hg-e');

        $hg_e.find('div.pod.sponsor-pod').parent().remove();
        $hg_e.find('div.recent-portfolios').eq(1).after(modules.sponsorPods);
        $hg_e.find('div.recent-portfolios').eq(1).after(modules.editorialPods);
    },

    hideErrorPanel: function() {
        $('div.pg-error.pod').hide();
    },

    errorPanel: function(type) {
        var errorThrown = true,
	errorContent;

	if (type == 'bad_filters') {
	    errorContent = '<div class="pg-error pod" style="display:block;">'
		+ '<h4>There were no photos found for this filter combination.</h4>'
		+ '<p>Please click the button below to reset the filters.</p>'
		+ '<a class="btn">Reset</a>'
		+ '</div>';
	}

	else {
	    errorContent = '<div class="pg-error pod" style="display:block;">'            
                                + '<h4>Please forgive us, Garden Galleries is <em>really</em> popular.</h4>'
		                + '<p>We sent a note to our support staff about the glitch you just experienced. Please click the button below to reload the gallery.</p>'
		                + '<a href="javascript:void(0);" class="btn">Reload</a>'
		         + '</div>';
	}

	if (errorThrown) {
	    $(SNI.HGTV.Gardens.photo_outer_wrapper).append(errorContent);
	    $(SNI.HGTV.Gardens.photo_description +','+ SNI.HGTV.Gardens.portf_photo).hide();
	}

	$('div.pg-error.pod .btn').click(function () {
	    $(this).parent().remove();
            SNI.HGTV.Gardens.resetFilters();
	    errorThrown = false;
	});
    },

    /**
     * Defines interactions for Enlarge/Shrink photo
     */
    setupToggler: function() {
	var enlarge = $(SNI.HGTV.Gardens.photo_wrapper).find('.pg-enlarge'),
	shrink = $(SNI.HGTV.Gardens.photo_wrapper).find('.pg-shrink'),
	enlarge_width = '616px',
	shrink_width = '339px',
        enlarge_height = 'height:auto';

	enlarge.click(function() {
	    $(SNI.HGTV.Gardens.photo_wrapper).animate({width: enlarge_width}, 200);
	    $(SNI.HGTV.Gardens.portf_photo).animate({width: enlarge_width}, 200);
            $(SNI.HGTV.Gardens.portf_photo).attr('style', enlarge_height);
	    enlarge.hide();
	    shrink.show();
	});

	enlarge.children('.pg-toggler-button').hover(
	    function() { enlarge.children('.pg-toggler-label').show(); },
	    function() { enlarge.children('.pg-toggler-label').hide(); }
	);

	enlarge.children('.pg-toggler-label').hover(
	    function() { enlarge.children('.pg-toggler-label').show(); },
	    function() { enlarge.children('.pg-toggler-label').hide(); }
	);

	shrink.click(function() {
	    $(SNI.HGTV.Gardens.photo_wrapper).animate({width: '339px'}, 250);
	    $(SNI.HGTV.Gardens.portf_photo).animate({width:'339px'}, 250);
	    shrink.hide();
	    enlarge.show();
	});

	shrink.children('.pg-toggler-button').hover(
	    function() { shrink.children('.pg-toggler-label').show(); },
	    function() { shrink.children('.pg-toggler-label').hide(); }
	);

	shrink.children('.pg-toggler-label').hover(
	    function() { shrink.children('.pg-toggler-label').show(); },
	    function() { shrink.children('.pg-toggler-label').hide(); }
	);
    }
}

/**
 * Defines spinner actions - "image loader/spinner" is shown when request is >250ms
 */

SNI.HGTV.Gardens.SpinManager = {
    timeout: 250,
    selectors: {'detail': SNI.HGTV.Gardens.photo_outer_wrapper, 'category': SNI.HGTV.Gardens.pod_grid},
    spinning: false,

    add: function(selector_id) {
        if (this.spinning) return;
        $(this.selectors[selector_id]).spinner();
        this.spinning = true;
        delete this.timeoutID;
    },

    setup: function(selector_id) {
        var self = this;
        this.timeoutID = window.setTimeout(
	    function() {
		self.add(selector_id);
	    },  
            SNI.HGTV.Gardens.SpinManager.timeout);
    },      

    cancel: function(selector_id) {
        if(typeof this.timeoutID == "number") {
	    window.clearTimeout(this.timeoutID);
            delete this.timeoutID;
        }
	else {
            try {
	        $(this.selectors[selector_id]).spinner('remove');
                this.spinning = false;
            } catch(e) {}
	}
    }
};

/** IN ORDER TO SUPPORT 'onhachange' events in IE8 Compatibility mode, IE7 and older browsers
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * COPIED FROM http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js,
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal -  http://jquery.thewikies.com/swfobject
(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);

