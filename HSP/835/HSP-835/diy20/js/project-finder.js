SNI.DIY.ProjectFinder = {
    isLoaded: false,
    items: null,
    itemsCache: {
        'all': null,
        'tv': null
    },
    selectedTab: 'all', // flag to see which tab is selected 'all' or 'tv'
    expanded: false,

    init: function() {
        var pf = this;
        var bodyId = document.body.id;
        var hdPadDflt = (bodyId == 'blog-cabin') ? 82 : 40;
        var hdPadExpand = (bodyId == 'blog-cabin') ? 248 : 222;
        var pfWrap = $('#find-project-wrap');
        var win = $(window);
        var pfButton = $("#pf-btn");
        var floatDiv = $("#diy-site-hd");
		
        this.ajaxUrl = this.getAjaxUrl();
		
        // setup omniture tracking - needs to be on ready or it will throw an
        // error if someone clicks the project finder button as the page is loading
        //$(document).ready(function() {
        SNI.DIY.Omniture.ClickTrack('#get-proj a', 'Project Finder');
        //});
		
        function fireOmnitureClick() {
            SNI.DIY.Omniture.ClickTrackFire(pfButton, 'Project Finder');
        }
		
		
        pfButton.toggle(
            function() {
                SNI.DIY.ProjectFinder.load();
				
                if (win.scrollTop() == 0 || $("#diy-hd #diy-site-hd").length > 0 || $("body#blog-cabin").length > 0) {
                    growHeader();
                }
				
                pfButton.addClass('pf-btn-open').attr('rel', 'pf-open');
                fireOmnitureClick();
				
                pfWrap.animate({
                    height:167
                }, 750, 'easeOutBack', function() {
                    $('.proj-pane ul', pfWrap).show();
                    $('#pf-results', pfWrap).show();
                });
                $('.proj-pane', pfWrap).animate({
                    height:131
                }, 750, 'easeOutBack');
				
                pfButton.blur(); // b/c IE sux
                pf.expanded = true;
				
                return false;
            },
            function() {
                if (win.scrollTop() == 0 || $("#diy-hd #diy-site-hd").length > 0 || $("body#blog-cabin").length > 0) {
                    shrinkHeader();
                }

                $('#pf-results', pfWrap).hide();
                $(".proj-pane ul", pfWrap).hide();
									
                pfButton.removeClass('pf-btn-open').attr('rel', 'pf-close');
                fireOmnitureClick();

                pfWrap.animate({
                    height:0
                }, 500, 'easeOutCubic', function() {
                    pfWrap.hide();
                });
				
                pfButton.blur(); // b/c IE sux
                pf.expanded = false;
				
                return false;
            });
        // turn off scrolling unless its blog-cabin
        // decide on how these 2 functions should be defined based on blog-cabin
        if($("#diy-hd #diy-site-hd").length < 1) {
            win.scroll(function() {
                if (win.scrollTop() == 0) {
                    if (pf.expanded) {
                        growHeader();
                    } else {
                        shrinkHeader();
                    }
                }
            });
        }

        function growHeader () {
            if($("#diy-hd #diy-site-hd").length > 0) {
                $("#diy-hd").animate({
                    paddingBottom: "167px"
                }, 750, 'easeOutBack');
                $("#diy-hd .nav").animate({
                    paddingTop: "167px"
                }, 750, 'easeOutBack');
            } else {
                var paddingTopVal = ($("body#blog-cabin").length > 0 ? "233px" : hdPadExpand);
                $('#diy-hd').animate({
                    paddingTop: paddingTopVal
                }, 750, 'easeOutBack');

            }
        }

        function shrinkHeader () {
            if($("#diy-hd #diy-site-hd").length > 0) {
                $("#diy-hd").animate({
                    paddingBottom: "0px"
                }, 750, 'easeOutCubic');
                $("#diy-hd .nav").animate({
                    paddingTop: "0px"
                }, 750, 'easeOutCubic');
            } else {
                var paddingTopVal = ($("body#blog-cabin").length > 0 ? "66px" : hdPadDflt);
                $('#diy-hd').animate({
                    paddingTop: paddingTopVal
                }, 500, 'easeOutCubic');
            }
        }
 		
        /* to make it work in ie6 */
        if ($.browser.msie && (parseInt($.browser.version) < 7)) {
            floatDiv.css({
                position: 'absolute'
            });
			
            win.scroll(function() {
                floatDiv.css({
                    top: win.scrollTop()
                });
            });
        }
		
        // setup tabs to change between All Projects and TV Projects
        var tabs = $('.proj-tabs h2', pfWrap);
        tabs.click(function() {
            if (this.id == 'pf-all-proj' && !pf.isAllProjects()) {
                tabs.removeClass('pf-tab-on');
                $(this).addClass('pf-tab-on');
                $('.proj-wrap:eq(2) h2', pfWrap).text('What Activity Do You Want To Do?');
                pf.loadAll();
            } else if (this.id == 'pf-tv-prog' && pf.isAllProjects()) {
                tabs.removeClass('pf-tab-on');
                $(this).addClass('pf-tab-on');
                $('.proj-wrap:eq(2) h2', pfWrap).text('When Was The Show On?');
                pf.loadTV();
            }
        });
    },
	
    open: function() {
        if (!this.expanded) {
            $("#pf-btn").click();
        }
    },

    load: function() {
        if (!this.isLoaded) {
            this.lists = [$('#proj-lst'), $('#work-lst'), $('#activity-lst')];
            this.isLoaded = true;
            this.loadAll();
        }
    },
	
    loadAll: function() {
        this.selectedTab = 'all';
        this.items = this.itemsCache[this.selectedTab];
        this.loadList([], this.lists, 0);
    },
	
    loadTV: function() {
        this.selectedTab = 'tv';
        this.items = this.itemsCache[this.selectedTab];
        this.loadList([], this.lists, 0);
    },

    loadList: function(keys, lists, level) {
        this.getItem(keys, lists, level);
    },
	
    displayList: function(item, keys, lists, level) {
        var pf = this;
		
        pf.setAvailableProjects(item.c);

        // make sure we don't recurse forever
        if (level >= lists.length) {
            return;
        }

        var list = lists[level];

        // build the html for this list
        var html = '';
        $.each(item.i, function(key, value) {
            html += '<li rel="' + key + '"><a href="#">X</a>' + value.l + '</li>';
        });
        html = $(html);
		
        // decide what to do when an li is clicked
        html.click(function() {
            var li = $(this);
            var key = li.attr('rel');
				
            if (!li.hasClass('sel')) {
                $('a', html).click(function(event) {
                    li.removeClass('sel');
                    pf.loadList(keys, lists, level);
                    $(this).unbind('click');
                    return false;
                });
            }
			
            html.removeClass('sel');
            li.addClass('sel');
            // pf.setAvailableProjects(item.c);
            // pf.loadList(item.i[key], lists, level+1, $.merge(keys, [key]));
			
            // clone the keys array
            var newKeys = [];
            $.each(keys, function(i, value) {
                newKeys.push(value);
            });
            newKeys.push(key);
			
            pf.loadList(newKeys, lists, level+1);

            return false;
        });

        // clear any levels after activated list and set default messages
        for (var i=level+1; i<lists.length; i++) {
            var emptyHtml = '';

            if (level==0 && i==1) {
                if (pf.isAllProjects()) {
                    emptyHtml = '<li class="empty-pane">Select<br />category</li>';
                } else {
                    emptyHtml = '<li class="empty-pane">Select a<br />TV Show</li>';
                }
            } else if (level==1 && i==2) {
                emptyHtml = '<li class="empty-pane">Select<br />an object</li>';
            }

            lists[i].removeClass('populated').html(emptyHtml);
        }

        // show newly created list
        lists[level].addClass('populated');
        lists[level].html(html);
		
        return html;
    },
	
    getItem: function(keys, lists, level) {
        var pf = this;
        var item = null;
		
        pf.abortPreviousRequests();
		
        // try to find existing item
        if (pf.items) {
            var found = true;
            var tempItem = pf.items;
            var count = 0;

            $.each(keys, function(i, value) {
                if (tempItem && tempItem['i'] && tempItem['i'][value]) {
                    tempItem = tempItem['i'][value];
                } else {
                    found = false;
                }
				
                count++;
            });
			
            // see if we found a cached item
            if (found && (count == 3 || tempItem['i'])) {
                item = tempItem;
            }
        }
		
        // do ajax call if we didn't find an item
        if (item) {
            pf.displayList(item, keys, lists, level);
            pf.updateSearchButton();
        } else {
			
            pf.showLoading(lists, level);
			
            try {
                pf.xhr = $.ajax({
                    dataType: 'script',
                    url: pf.buildAjaxUrl(),
                    success: function(result) {
                        if (typeof pfind == 'object') {
                            result = pfind;
                            item = pf.cacheItem(keys, result);
                            pf.displayList(item, keys, lists, level);
                            pf.updateSearchButton();
                        } else {
                            lists[0].html('<li class="empty-pane">Error Retrieving<br />Data</li>');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        lists[0].html('<li class="empty-pane">' + textStatus + '</li>');
                    },
                    complete: function(request, textStatus) {
                        pf.xhr = null;
                    }
                });
            } catch (e) {
                lists[0].html('<li class="empty-pane">AJAX Request<br />Error</li>');
            }
        }
		
        return item;
    },
	
    abortPreviousRequests: function() {
        if (this.xhr) {
            this.xhr.abort();
        }
    },
	
    cacheItem: function(keys, item) {
        var size = keys.length;
        var result = null;
		
        // NOTE: there's probably a way to loop through instead of checking
        // for size but this should be fast
        if (size == 0) {
            this.items = item;
            result = this.items;
        } else if (size == 1) {
            this.items['i'][keys[0]]['i'] = item.i;
            result = this.items['i'][keys[0]];
        } else if (size == 2) {
            this.items['i'][keys[0]]['i'][keys[1]]['i'] = item.i;
            result = this.items['i'][keys[0]]['i'][keys[1]];
        }
		
        this.updateItemsCache();
		
        return result;
    },
	
    updateItemsCache: function() {
        this.itemsCache[this.selectedTab] = this.items;
    },
	
    showLoading: function(lists, level) {
        lists[level].removeClass('populated').html('<li class="loading"></li>');
		
        for (var i=level+1; i<lists.length; i++) {
            lists[i].removeClass('populated').html('<li class="empty-pane"></li>');
        }
    },

    setAvailableProjects: function(num) {
        $('#avail-proj').text(this.formatNumber(num));
    },
	
    // guess the url based on the current domain
    getAjaxUrl: function() {
        var domain = this.getDomain();

        return domain + 'diy/batchCache/easyProjectFinder/projectFinder.xsl/';
    },
	
    getDomain: function() {
        var host = window.location.hostname;
        var domain = 'http://www.diynetwork.com/';
		
        if (host.indexOf("staging-diynetwork.com") != -1) {
            domain = 'http://www.staging-diynetwork.com/';
        } else if (host.indexOf("dev-diynetwork.com") != -1) {
            domain = 'http://www.dev-diynetwork.com/';
        } else if (host.indexOf("beta.diynetwork.com") != -1) {
            domain = 'http://beta.diynetwork.com/';
        }
		
        return domain;
    },
	
    buildAjaxUrl: function() {
        var url = this.ajaxUrl;
        var count = 0;
		
        if (this.isAllProjects()) {
            url += 'projects';
        } else {
            url += 'shows';
        }
		
        $('#find-project-wrap li.sel').each(function(key, value) {
            var rel = $(value).attr('rel');
            url += '-' + rel;
            count++;
        });
		
        for (i=count; i< 5; i++) {
            url += '-0';
        }
		
        url += '.js';
		
        return url;
    },
	
    buildSearchUrl: function() {
        var domain = this.getDomain();
        var searchUrl = domain + 'search/results.do?easyProjectFinder=';
		
        if (this.isAllProjects()) {
            searchUrl += 'projects+'
        } else {
            searchUrl += 'shows+';
        }
		
        $('#find-project-wrap .proj-pane li.sel').each(function(key, value) {
            searchUrl += $(this).attr('rel') + '+';
        });
		
        return searchUrl.substring(0, searchUrl.length-1);
    },
	
    updateSearchButton: function() {
        $('#get-proj a').attr('href', this.buildSearchUrl());
    },
	
    isAllProjects: function() {
        return this.selectedTab == 'all';
    },

    // http://mredkj.com/javascript/numberFormat.html
    formatNumber: function(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

};
