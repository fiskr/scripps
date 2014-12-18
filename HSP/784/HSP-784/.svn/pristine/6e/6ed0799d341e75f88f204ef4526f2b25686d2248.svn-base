// JS for Site DesignPortfolio
if (typeof (SNI.HGRM.ProGallery) == "undefined") {
    SNI.HGRM.ProGallery = {};
}

SNI.HGRM.ProGallery = {
    site_name: 'HGRM',
    sni_w: 'div.site-wrapper div.sni-w',
    cxf_service: '/hgrmcxfwebservice/browsebyroom',
    portf_service: '/app/PortfolioService/index.json?portfolio=',
    current_portf_id: '',
    fetch_portf_id: '',
    gallery_wrap: '.pro-gallery .photo-gallery',
    navigation: 'div.photo-gallery div.pg-navigation',
    photo_count: '.filter-wrap .p-wrap',
    change_portfolio: 'a.nextprev',
    next_portfolio: 'a.nextprev.next',
    prev_portfolio: 'a.nextprev.prev',
    photo_outer_wrapper: '.pg-photo-display-wrapper',
    photo_wrapper: '.pg-photo-wrapper',
    photo_description: '.pg-photo-description',
    photo_title: '.pg-photo-description h1',
    photo_desc: '.pg-photo-description h2',
    portf_photo_href: '.pg-photo-wrapper a.photo',
    portf_photo: '.pg-photo-wrapper a.photo img',
    filters_class: '.click-wrap ul.single li a',
    filters_close: '.box.drop .hd span',
    filters_more: '.click-wrap .btn, .click-wrap .more',
    filters_wrap: '.click-wrap .box',
    hotspot_object: '#sponsored_hotspot',
    category_filter: '.pro-filters #pro-category',
    style_filter: '.pro-filters #pro-style',
    designer_link: '.master .pro-info h5 a, #carousel .hd h4 a',
    secondary_designer_div: '.pro .master',
    portf_style: '',
    portf_category: '',
    portf_designer: '',
    portf_loop: [],
    author_name: '.pg-author-name',
    toggler: '.pg-photo-display .pg-toggler',
    remove_filter: '.pro-filters .bd.bdr.center a',
    narrow_by: 'div.pro-filters div.narrowby',
    current_filter: '',
    sponsor_multi_logo: '.sponsor-multi-logo',
    error_thrown:false,

    init : function () {
        SNI.HGRM.ProGallery.setupToggler();

        //CHANGE CAPTION in TOOLBAR --
        SNI.HGRM.MenuHandler.space_detail = 1;
        SNI.HGRM.ProGallery.current_portf_id = SNI.HGRM.ProGallery.getPortfIdFromUrl(window.location.href);
        SNI.HGRM.ProGallery.checkUrlFilters();
        SNI.HGRM.ProGallery.getFilterData(false, true);
        $(window).hashchange( function() {
            SNI.HGRM.ProGallery.hashChange();
        });

        //right-click next/prev opens a new page
        $(SNI.HGRM.ProGallery.change_portfolio).bind('contextmenu', function(e) {
	    e.stopPropagation();
	    e.preventDefault();
            window.open( $(this).attr('href') );
        });

        //click on 'viewer' image
        $(SNI.HGRM.ProGallery.gallery_wrap).delegate(SNI.HGRM.ProGallery.portf_photo, 'click', function(e) {
            e.stopPropagation();
	    e.preventDefault();
            $(SNI.HGRM.ProGallery.next_portfolio).click();
        });

        //any category/style button click
        $(SNI.HGRM.ProGallery.navigation).delegate(SNI.HGRM.ProGallery.remove_filter, 'click', function(e) {
            e.stopPropagation();
	    e.preventDefault();

            if( $(this).parents(SNI.HGRM.ProGallery.category_filter).length > 0 ) {
                SNI.HGRM.ProGallery.portf_category = '';
            }
            else {
                SNI.HGRM.ProGallery.portf_style = '';
            }

            SNI.HGRM.ProGallery.getFilterData(true);
            $(this).closest(SNI.HGRM.ProGallery.filters_wrap).removeClass('show');
	    $(SNI.HGRM.ProGallery.filters_more).removeClass('sel');
        });

        // drop-down/filter on click
        $(SNI.HGRM.ProGallery.navigation).delegate(SNI.HGRM.ProGallery.filters_class, 'click', function(e) {
            e.stopPropagation();
	    e.preventDefault();

            if( $(this).parents(SNI.HGRM.ProGallery.category_filter).length > 0 ) {
                SNI.HGRM.ProGallery.portf_category = $(this).attr('data-filter');
                $(SNI.HGRM.ProGallery.category_filter + ' a.btn.pull').attr('data-url', SNI.HGRM.ProGallery.portf_category);
            } else {
                SNI.HGRM.ProGallery.portf_style = $(this).attr('data-filter');
                $(SNI.HGRM.ProGallery.style_filter + ' a.btn.pull').attr('data-url', SNI.HGRM.ProGallery.portf_style);
            }

            SNI.HGRM.ProGallery.getFilterData(true);

            $(this).closest(SNI.HGRM.ProGallery.filters_wrap).removeClass('show');
	    $(SNI.HGRM.ProGallery.filters_more).removeClass('sel');

        });

	// close drop-down/filters
	$(SNI.HGRM.ProGallery.filters_close).click(function () {
            $(SNI.HGRM.ProGallery.gallery_wrap).click();
	});

        //next/previous photo click
        $(SNI.HGRM.ProGallery.navigation).delegate(SNI.HGRM.ProGallery.change_portfolio, 'click', function(e) {
	    e.stopPropagation();
	    e.preventDefault();

            SNI.HGRM.ProGallery.fetch_portf_id = SNI.HGRM.ProGallery.getPortfIdFromUrl( $(this).attr('href') );
            SNI.HGRM.ProGallery.updateHash({'portfolioId':SNI.HGRM.ProGallery.fetch_portf_id});
        });

        //next/prev keyboard arrows instead of clicks
        $(document).keydown(function(e){
            if (e.keyCode == 37) {
	        $(SNI.HGRM.ProGallery.prev_portfolio).click();
            }
            else if (e.keyCode == 39) {
	        $(SNI.HGRM.ProGallery.next_portfolio).click();
            }
            else { return true; }
        });

        // designer loop
        $(SNI.HGRM.ProGallery.sni_w).delegate(SNI.HGRM.ProGallery.designer_link, 'click', null, function(e) {
	    e.stopPropagation();
	    e.preventDefault();

            SNI.HGRM.ProGallery.portf_designer = $(this).attr('data-designer');
	    var designerName = $(this).text();

            SNI.HGRM.ProGallery.portf_category = '';
            SNI.HGRM.ProGallery.portf_style = '';
            SNI.HGRM.ProGallery.hideErrorPanel();
	    SNI.HGRM.ProGallery.getFilterData();
	    $(SNI.HGRM.ProGallery.photo_count).find('.type').text(designerName);
            $(SNI.HGRM.ProGallery.photo_count).find('.browse').hide();
            $(SNI.HGRM.ProGallery.photo_count).find('.spaces').show();
	    $(SNI.HGRM.ProGallery.narrow_by).html('<a class="view-all" href="javascript:void(0);" onclick="SNI.HGRM.ProGallery.viewAllPortfolios();">View All Galleries</a>');

	    // scroll back to "narrow by" anchor
	    var targetOffset = $(SNI.HGRM.ProGallery.narrow_by).offset().top-21;
	    $('body,html').animate({scrollTop: targetOffset}, 400);
	    return false;

        });

        //Re-build DOM if data missing on page load
        if ( $(SNI.HGRM.ProGallery.author_name).length == 0 ) {
            $(SNI.HGRM.ProGallery.photo_description).prepend('<cite class="cap pg-author"><span class="pg-author-name"></span></cite>').hide();
        }
        if ( $(SNI.HGRM.ProGallery.photo_title).length == 0 ) {
            $('cite.cap.pg-auther').after('<h1></h1>').hide();
        }
        if ( $(SNI.HGRM.ProGallery.photo_desc).length == 0 ) {
            $(SNI.HGRM.ProGallery.photo_title).after('<h2></h2>').hide();
        }

        var pinterestShareUrl = window.location.protocol + "//" + window.location.hostname + window.location.pathname + encodeURIComponent('?soc=sharingpinterest');
        
    SNI.IS.Pinterest.createButton({
           element: '#tb-pinit',
           url: pinterestShareUrl,
           imgUrl: $(this.portf_photo).attr('src'),
           desc: $(this.photo_title).text() + ": " + $(this.photo_desc).text(),
           fromMsg: " From HGTVRemodels.com"
    });

	SNI.HGRM.DynamicAds.init({ container: SNI.HGRM.ProGallery.photo_outer_wrapper, insert_tgt: SNI.HGRM.ProGallery.photo_outer_wrapper, dismiss_elts: [SNI.HGRM.ProGallery.next_portfolio, SNI.HGRM.ProGallery.prev_portfolio] });
	SNI.HGRM.Omniture.ClickTrack(SNI.HGRM.ProGallery.change_portfolio, "Pro Gallery Viewer");

    },

    updateNextPrevLinks: function() {
        var portfolios = SNI.HGRM.ProGallery.portf_loop,
        prev_index = 0,
        next_index = 0;

        if (portfolios.length < 1) {
	    SNI.HGRM.ProGallery.errorPanel('no_photos');
	    $(SNI.HGRM.ProGallery.portf_photo).hide();
	    return;
        }

        if (portfolios.length == 2) { //next and prev load same portfolio when 2 results
            if (SNI.HGRM.ProGallery.current_portf_id == portfolios[0].id) {
                prev_index = 1;
                next_index = 1;
            }
        } else if (portfolios.length == 1) { //prev_index and next_index set to 0 already

        } else {
            for (var i=0; i < portfolios.length; i++) {
                if (portfolios[i].id == SNI.HGRM.ProGallery.current_portf_id) {
                    prev_index = (i == 0) ? (portfolios.length - 1) : i - 1;
                    next_index = (i == portfolios.length - 1) ? 0 : i + 1;
                    break;
                }
            }
        }

        $(SNI.HGRM.ProGallery.next_portfolio).attr('href', portfolios[next_index].url);
        $(SNI.HGRM.ProGallery.prev_portfolio).attr('href', portfolios[prev_index].url);
    },

    highLightSubnav:function() {
        var category = SNI.HGRM.ProGallery.portf_category.replace('/space/', '').replace(/\+/g, ' ');
        $.each($('.local-nav ul li a'), function() {
	    if ( category == $(this).html().replace('&amp;', 'and') ) {
		$(this).addClass('sel');
            } else $(this).removeClass('sel');
        });
    },

    viewAllPortfolios:function() {
        SNI.HGRM.ProGallery.portf_category = '';
        SNI.HGRM.ProGallery.portf_style = '';
        SNI.HGRM.ProGallery.portf_designer = '';
        SNI.HGRM.ProGallery.getFilterData(true);
    },

    updateFilterValues: function(filter_selector, filter_data) {
        var filter = filter_data,
        options = filter.options;

        $(filter_selector + ' ul.single li a').each(function(index) {
            var dropdown_val = $(this).html().replace('&amp;', '&'), // massaging for #/space/Closets+&+Utility
            available = false,
            selected = false,
            filter_val = '';

            for (var i=0; i < options.length; i++) {
                if ( dropdown_val == options[i].t ) {
                    available = true;
                    selected = options[i].sel;
                    filter_val = options[i].v;
                    break;
                }
            }

            if (! available || selected) {
                var sel = '';
                if (selected) {
                    sel = ' class="selected" ';
                    $(filter_selector + ' a.btn.pull').html(dropdown_val + '<span></span>');
                    $(filter_selector + ' a.btn.pull').attr('data-url', '/' + filter.selector + '/' + filter_val);
                }
                $(this).parent().html('<span' + sel + '>' +  dropdown_val + '</span>');
            } else {
                $(this).attr('data-filter', '/' + filter.selector + '/' + filter_val);
            }

        });
    },

    updateFilters: function(data) {
        SNI.HGRM.ProGallery.updateFilterValues(SNI.HGRM.ProGallery.category_filter, data.filters.category);
        SNI.HGRM.ProGallery.updateFilterValues(SNI.HGRM.ProGallery.style_filter, data.filters.style);
    },

    checkUrlFilters: function() {
        var url_params = window.location.hash;
        if (url_params && url_params.length > 1) {
            url_params = url_params.replace('#', '');

	    var style = url_params.match(/\/style\/[a-zA-Z\+-]*/),
	    category = url_params.match(/\/space\/[a-zA-Z\+-]*/),
	    designer_id = url_params.match(/\/designerId\/\w*/g);

	    if(category && style){
		 SNI.HGRM.ProGallery.portf_category = category[0];
		 SNI.HGRM.ProGallery.portf_style = style[0];

	    }else{
		if (category) {
		    SNI.HGRM.ProGallery.portf_category = category[0];
		    SNI.HGRM.ProGallery.highLightSubnav();
		}else if (style) {
		    SNI.HGRM.ProGallery.portf_style = style[0];
		    SNI.HGRM.ProGallery.highLightSubnav();

		    str= window.location.hash;
		    str = str.match(/\/style\/[a-zA-Z\+-]*/);
		    str= str[0].replace(/\+/g, " ");
		    str = str.replace("/\style\/", "");
		    $(SNI.HGRM.ProGallery.photo_count).find('span.type').html(str, ' Spaces');
		}else if (designer_id) {
		    SNI.HGRM.ProGallery.portf_designer = designer_id[0];
		}else{
		    $(SNI.HGRM.ProGallery.photo_count).find('span.type').html('Spaces');
		}
	    }
        }else if(url_params == 0){
	    $(SNI.HGRM.ProGallery.photo_count).find('span.type').html('Spaces');
	}
    },

    getCFXServiceUrl: function() {
        return SNI.HGRM.ProGallery.cxf_service + SNI.HGRM.ProGallery.portf_category + SNI.HGRM.ProGallery.portf_style + SNI.HGRM.ProGallery.portf_designer;
    },

    getFilterData: function(refresh_page, on_init) {
        jQuery.ajax({
	    type: 'GET',
	    url: SNI.HGRM.ProGallery.getCFXServiceUrl(),
	    dataType: 'json',
	    success: function(data, textStatus, jqXHR) {
		if (refresh_page) {
		    SNI.HGRM.ProGallery.refreshPortfolioPage(data);
		    return;
		}
		SNI.HGRM.ProGallery.portf_loop = data.rooms;
                if (on_init) { SNI.HGRM.ProGallery.getHashId(); }
		SNI.HGRM.ProGallery.updateFilters(data);
		SNI.HGRM.ProGallery.updateNextPrevLinks();
		SNI.HGRM.ProGallery.updateRoomCount(data);
                if (pro_loop && data.count != 0) {
                    var exists = false;
                    for (var i = 0; i < data.count; i++) {
                        if (SNI.HGRM.ProGallery.current_portf_id == data.rooms[i].id) {
                            exists = true;
                            break;
                        }
                    }

                    if (!exists) {
                        SNI.HGRM.ProGallery.fetch_portf_id = data.rooms[0].id;
                        SNI.HGRM.ProGallery.updatePageContent();
                        return false;
                    }
                    if (SNI.HGRM.ProGallery.error_thrown) {
                        $(SNI.HGRM.ProGallery.photo_description +','+ SNI.HGRM.ProGallery.portf_photo).show();
                    }
                }
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
		SNI.HGRM.ProGallery.errorPanel();
	    }
	});
    },

    refreshPortfolioPage: function(resp) {
        var old_path = window.location.pathname,
        filters = '#' +  SNI.HGRM.ProGallery.portf_style + SNI.HGRM.ProGallery.portf_category + SNI.HGRM.ProGallery.portf_designer,
        new_url = resp.rooms[0].url + filters;

        if (filters == '#') {
	    filters = '';
        }
        window.location.replace(new_url);
        if (old_path == resp.rooms[0].url) {
            var t = setTimeout('window.location.reload()', 500);
        }
        //window.location.href = resp.rooms[0].url + filters;
        //var t = setTimeout('window.location.reload()', 750);
    },

    getPortfIdFromUrl: function(url) {
        return url.match(/\/[0-9]{2,9}?\/index\.html/g)[0].split('/')[1];
    },

    getJsonUrl: function() {
        return SNI.HGRM.ProGallery.portf_service + SNI.HGRM.ProGallery.fetch_portf_id + '&site=' + SNI.HGRM.ProGallery.site_name;
    },

    updateDesigners: function(designers) {
        var associateDesc = '<p>Also associated with this project:</p>',
        pro = '.sni-w .pro',
        pro_div = '.pro .master',
        pro_count = designers.length;

        var assoc_pros = '';
        /* empty contents and hide the associated pro section - will return an empty object if doesn't exist */
        var assoc_pro_div = $(pro_div).filter(function(ind, val) {
            return ind > 0;
        });

        assoc_pro_div.empty().hide();

        for (var i=0; i< pro_count; i++) {
             /* first time through? */
             if(i === 0) {
            var master_pro_div = '.pro .master.main .pro-info';
                /* previous version of this code was only removing the existing text if
                 * it had the format <ul><li>some text</li><li>...</li></ul>, but if it wasn't
                 * styled that way, it resulted in new text being appended to the old text; now
                 * we're going to wrap this section in its own div so we can easily remove it again next time
                 * through ---> MM-5424: grab any existing details */
                var div_text = $(master_pro_div).find('div.pro-info-text');
                $(master_pro_div + ' h5 a').attr('data-designer', '/designerId/' + designers[i].id);
                $(master_pro_div + ' h5 a').html(designers[i].name);
                /* if previous details are on the screen, remove them before appending the new text */
                if(div_text.length > 0) {
                    div_text.remove();
        }
                /* this is a little to attempt to fix some text that included line breaks, it may 
                 * or may not actually display correctly, but with br's, it DEFINITELY won't  
                */
                var str = designers[i].text.replace(/<br>/g,'\n');
                $(master_pro_div).find('h5').after('<div class="pro-info-text">' + str + '</div>');   

            } else {
                /* everything after the first time is associated pros, so let's build our string */
                assoc_pros += '<div class="pro-info">'; 
                assoc_pros += '<h5><a data-designer="/designerId/' + designers[i].id + '" href="javascript:void(0);">' + designers[i].name + '</a></h5>' + designers[i].text;
                assoc_pros += '</div>';
            }

        }
        if(assoc_pros !== '') {
            /* no div already? create one */
            if(assoc_pro_div.length === 0) {
                $(pro).append('<div class="master"></div>');
            }
            /* add the header paragraph */
            assoc_pro_div.append(associateDesc);
            /* append our HTML string */
            assoc_pro_div.append(assoc_pros);
            assoc_pro_div.show();
            }

    },

    updateCarousel: function(designerPhotos) {
        if (!designerPhotos || !designerPhotos.portfolios) {
            $('#carousel').hide();
            return;
        }

        var heading = $('#carousel .hd h4 a'),
        carousel = '<div class="crsl-wrap"><ul>',
        portfolios = designerPhotos.portfolios;

        if (!portfolios || (portfolios.length < 2) ) { //If 1 result, hide the carousel since it's image is identical to the current portfolio
            $('#carousel').hide();
            return;

        } else {
            $('#carousel').show();
        }

        heading.attr('href', 'javascript:void(0);');
        heading.html('More Photos from ' + designerPhotos.designerName);
        for (var i=0; i < portfolios.length; i++) {
	    carousel += '<li>' +
		'<a title="' + portfolios[i].title + '"  href="' + portfolios[i].url + '">' +
		'<img width="120" height="90" alt="' + portfolios[i].title + '" data-src="' + portfolios[i].image.imgUrl + '"/>' +
		'</a>' +
		'<span class="small"><a href="' + portfolios[i].url + '">' + portfolios[i].title + '</a></span>' +
		'</li>';
	}
	carousel += '</ul></div>';
        $('#carousel .crsl-wrap').remove();
        $('#carousel div.nav').remove();
        $('#carousel div.prev-btn').remove();
        $('#carousel div.next-btn').remove();
        $('#carousel').append(carousel);
        SNI.Common.Carousel('#carousel', {visible:4});
        if (portfolios.length > 4) {
            $('#carousel a.btn.next').removeClass('disabled');
        } else {
            $('#carousel a.btn.next').addClass('disabled');
        }
    },

    updateRightRail: function(modules) {
        $('.sni-e').html('');
        $('.sni-e').append(modules.editorialPods);
        $('.sni-e').append(modules.sponsorPods);
        $('.sni-e').append(modules.rateMyRemodel);
        $('.sni-e').append(modules.popularIn);
    },

    updateViewer: function(data) {
        var img = new Image(),
        title = data.portfolioTitle,
        desc = data.designerNotes,
        metadata = data.metaData,
        browserTitle = title;

        if (data && data.portfoliosFromDesigner && data.portfoliosFromDesigner.designerName) {
            browserTitle += ' : ' +  data.portfoliosFromDesigner.designerName;
        }
        var catName=metadata.roomType;catName=catName.replace(/_/gi,' ').replace('PG','').trim();catName=catName.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();});browserTitle+=' : '+catName;
        document.title = browserTitle + ' : Pro Galleries : HGTV Remodels';

        // Returning an empty array when there is no author
	if (data.images && !$.isArray(data.images[0].imgAuthor)) {
	    $(SNI.HGRM.ProGallery.author_name).text("Courtesy of: "+ data.images[0].imgAuthor).parent().show();
	} else { // and a string when there is an author
	    $(SNI.HGRM.ProGallery.author_name).parent().hide();
	}

        if ( title && !$.isArray(title) ) {
            $(SNI.HGRM.ProGallery.photo_title).html(title).show();
        } else {
            $(SNI.HGRM.ProGallery.photo_title).hide();
        }

        if (desc  && !$.isArray(desc) ) {
            $(SNI.HGRM.ProGallery.photo_desc).html(desc).show();
        } else {
            $(SNI.HGRM.ProGallery.photo_desc).hide();
        }

        if (data.multimedia && data.multimedia.path) {
            $(SNI.HGRM.ProGallery.photo_wrapper).append('<div id="sponsored_hotspot"></div>');
            $('#sponsored_hotspot').flash({
                swf: data.multimedia.path,
		width: 616,
		height: 462,
                wmode: 'transparent',
                allowscriptaccess:'always'
	    });
            //$(SNI.HGRM.ProGallery.photo_wrapper).append('<object width="616" height="462" type="application/x-shockwave-flash" data="' + data.multimedia.path + '" id="sponsored_hotspot" style="visibility: visible;"><param name="wmode" value="transparent"><param name="allowscriptaccess" value="always"></object>');
            $(SNI.HGRM.ProGallery.photo_wrapper).removeClass('pg-fitted');

        } else {
            $(img).load(function(response, status, xhr) {
                if (data.images[0].bvert == 'true') {
                    $(SNI.HGRM.ProGallery.photo_wrapper).addClass('pg-fitted').attr('style', '.');
		    $(SNI.HGRM.ProGallery.toggler).show().find('.pg-enlarge').show();
	        } else {
		    $(SNI.HGRM.ProGallery.toggler).hide();
		    $(SNI.HGRM.ProGallery.photo_wrapper).removeClass('pg-fitted');
	        }

                if ( ! $(SNI.HGRM.ProGallery.portf_photo_href).length ) { //in case we were on a hotspot
                    $(SNI.HGRM.ProGallery.photo_wrapper).append('<a class="photo" title="Next Photo"></a>');
                }
                $(SNI.HGRM.ProGallery.portf_photo_href).html('').append(this);

            }).error(function() { // in case image doesn't load properly
                SNI.HGRM.ProGallery.errorPanel('no_photos');
	        $(SNI.HGRM.ProGallery.portf_photo).hide();
	    }).attr('src', data.images[0].lgUrl);
        }

        SNI.HGRM.ProGallery.hideErrorPanel();
	$(SNI.HGRM.ProGallery.photo_wrapper).fadeIn();
    },

    updateHash: function(data) {
	window.location.hash = "/id-" + data.portfolioId + SNI.HGRM.ProGallery.portf_style + SNI.HGRM.ProGallery.portf_category + SNI.HGRM.ProGallery.portf_designer;
    },

    getHashId: function() {
        var deep_link_id = window.location.hash.match(/\/id-[0-9]{2,9}/);
	if (deep_link_id) {
            SNI.HGRM.ProGallery.fetch_portf_id = deep_link_id[0].split('-')[1];
            SNI.HGRM.ProGallery.updatePageContent();
	}
    },

    updateAds: function(data) {
        mdManager.setParameter('UniqueId', 'HGRM-PORTFOLIO-' + SNI.HGRM.ProGallery.current_portf_id + '-1');
	$.each(data.metaData, function(key,val){ // set mdManager data
	    mdManager.setParameter(key, val);
	});
	if (typeof s == "object") { // Send data to Omniture:
	    s.t();
	}
	SNI.Nielsen.trackNSE(); // Nielson hit counter
    },

    updateRoomCount: function(data) {
	var roomCount = data.count;
	var countWrap = '.p-wrap .count';
	$(countWrap).text(roomCount);
    },

    updatePageContent: function() {
        $(SNI.HGRM.ProGallery.toggler).hide('fast'); //hide enlarge/shrink
        $(SNI.HGRM.ProGallery.portf_photo).fadeOut('fast'); //hide current photo
        $(SNI.HGRM.ProGallery.photo_wrapper).attr('style', '').find('.pg-shrink').hide(); //remove custom styling and hide 'shrink' if img enlarged
        $(SNI.HGRM.ProGallery.hotspot_object).remove(); //remove hotspot
        $(SNI.HGRM.ProGallery.sponsor_multi_logo).remove(); //remove sponsor adv

        try {
	    jQuery.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: SNI.HGRM.ProGallery.getJsonUrl(),
	        success: function(data, textStatus, jqXHR) {
		     if (data.sponsorFlag == 'Y') { //refresh page for sponsor portfolios
                        var filters = '#' + SNI.HGRM.ProGallery.portf_category + SNI.HGRM.ProGallery.portf_style;
                        if (filters == '#') {
                            filters = '';
                        }
                        window.location.replace(data.portfolioUrl + filters);
                        return;
                    }
		    
		    if((data.sponsorFlag != 'Y') && (mdManager.getParameter("Sponsorship") != '')){
		window.location.replace(data.portfolioUrl+'#/id-'+data.portfolioId+SNI.HGRM.ProGallery.portf_style + SNI.HGRM.ProGallery.portf_category + SNI.HGRM.ProGallery.portf_designer);
                        return;
		    }
                    SNI.HGRM.ProGallery.current_portf_id = SNI.HGRM.ProGallery.fetch_portf_id;
                    SNI.HGRM.ProGallery.updateNextPrevLinks();
                    SNI.HGRM.ProGallery.updateViewer(data);
                    SNI.HGRM.ProGallery.updateDesigners(data.designers);
                    SNI.HGRM.ProGallery.updateCarousel(data.portfoliosFromDesigner);
                    SNI.HGRM.ProGallery.updateRightRail(data.rightRail);
                    SNI.HGRM.ProGallery.updateAds(data);
                    SNI.HGRM.DynamicAds.refresh();
                    SNI.HGRM.ProGallery.refreshSocial(data);
	        },
		    complete: function() {
				SNI.HGRM.ProGallery.SpinManager.cancel();
		    },
	        error: function(jqXHR, textStatus, errorThrown) {
		    SNI.HGRM.ProGallery.errorPanel();
	        }
	    });
        } catch (e) { /*console.log('Error: ' + e.description);*/ }
    },

    hashChange: function() {
        SNI.HGRM.ProGallery.getHashId();
    },

    hideErrorPanel: function() {
        $('div.pg-error.pod').hide();
    },

    errorPanel: function(type) {
        var errorThrown = true;
	var errorContent;

	if (type == 'no_photos') {
	    errorContent = '<div class="pg-error pod" style="display:block;top:150px;">'
		+ '<h4>There were no photos found for this designer.</h4>'
		+ '<p>Please click the button below to reload your content.</p>'
		+ '<a class="btn">Reload</a>'
		+ '</div>';
	}

	else {
	    errorContent = '<div class="pg-error pod" style="display:block;top:150px;">'
		+ '<h4>Please forgive us, our photos are <em>really</em> popular.</h4>'
		+ '<p>Please click the button below to reload your content.</p>'
		+ '<a class="btn">Reload</a>'
		+ '</div>';
	}

	if (SNI.HGRM.ProGallery.error_thrown) {
	    $(SNI.HGRM.ProGallery.photo_outer_wrapper).append(errorContent);
	    $(SNI.HGRM.ProGallery.photo_description +','+ SNI.HGRM.ProGallery.portf_photo).hide();
	}

	$('.btn').click(function () {
	    $(this).parent().remove();
	    SNI.HGRM.ProGallery.viewAllPortfolios();
        SNI.HGRM.ProGallery.error_thrown=false;
    });
    },

    refreshSocial: function(data) {
        var url = 'http://www.hgtvremodels.com' + data.portfolioUrl;
        var page_title = data.portfolioTitle;
        mdManager.setParameter("RoomType", page_title);
        var config = SNI.HGRM.globalToolbar.config;

        config.emailPageTitle = page_title;
        config.emailLink = url;


        SNI.IS.Pinterest.updateButton({
           element: '#tb-pinit iframe',
           url: url + encodeURIComponent('?soc=sharingpinterest'),
           imgUrl: data.images[0].lgUrl,
           desc: page_title + ": " + data.designerNotes,
           fromMsg: " From HGTVRemodels.com"
        });

        SNI.IS.FB.updateButton({
            element: '#tb-facebook iframe',
            url: url
        });

        SNI.IS.Twitter.updateButton({
            element: '#tb-tweet',
            url: url + "?soc=sharingtw",
            text: page_title + " @HGTVRemodels"
        });

        SNI.IS.GP.updateButton({
           element: '#tb-gplus iframe',
            url: url
        });
    },

    setupToggler: function() {
	var enlarge = $(SNI.HGRM.ProGallery.photo_wrapper).find('.pg-enlarge'),
	shrink = $(SNI.HGRM.ProGallery.photo_wrapper).find('.pg-shrink'),
	enlarge_width = '616px',
	shrink_width = '339px',
        enlarge_height = 'height:auto';

	enlarge.click(function() {
	    $(SNI.HGRM.ProGallery.photo_wrapper).animate({width: enlarge_width}, 200);
	    $(SNI.HGRM.ProGallery.portf_photo).animate({width: enlarge_width}, 200);
            $(SNI.HGRM.ProGallery.portf_photo).attr('style', enlarge_height);
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
	    $(SNI.HGRM.ProGallery.photo_wrapper).animate({width: '339px'}, 250);
	    $(SNI.HGRM.ProGallery.portf_photo).animate({width:'339px'}, 250);
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
};

/*!  IN ORDER TO SUPPORT 'onhashchange' events in IE8 Compatibility mode, IE7 and older browsers
 * COPIED MINIFIED VERSION TO REDUCE SIZE . CHECK SOURCE FOR DETAILS
 *
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

// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal
// http://jquery.thewikies.com/swfobject
(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);