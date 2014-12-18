// JS for Site DesignPortfolio
if( typeof(SNI.HGTV.DesignPortfolio) == "undefined" ) {
    SNI.HGTV.DesignPortfolio = {};
}

SNI.HGTV.DesignPortfolio = {
    ajaxCache : {}, //for performance boost 
    /* BROWSE BY STYLE */
    browseByStyle: function() {
        var styles_list = jQuery("#browse-by-style .nav ul li");

        $("#browse-by-style .active").removeClass("active");

        var random_pick = Math.floor(Math.random()*styles_list.length);

        jQuery(styles_list[random_pick]).addClass("active");
        jQuery(jQuery("#browse-by-style .ctnt .bbsctnt")[random_pick]).addClass("active");

        styles_list.each(function (i) {
            $(this).click(function(){
                $("#browse-by-style .active").removeClass("active");
                $(this).addClass("active");
                $("#browse-by-style .bbsctnt:eq(" + i + ")").addClass("active");
            });
        });
    },

    /* EQUALIZE GRID ITEM HEIGHT */
    gridHeight: function() {
        var itemHeight = 0;
        $(".grid li").each(function(e){
            var thisHeight = $(this).height();
            if(thisHeight>itemHeight){
                itemHeight = thisHeight;
            }
        });
        $(".grid li").css("height",itemHeight);
    },
    /* /EQUALIZE GRID ITEM HEIGHT */

    /* BROWSE BY STYLE PODS ON DETAIL PAGE */
    browseByStylePods: {
        node: function(id,length){
            this.id = id;
            this.lock = false;
            this.length = length;
            this.current = -1;
            this.duration = 400;
            this.easing = "easeOutQuad";
        },
        advance: function(id,direction){
            var n = SNI.HGTV.DesignPortfolio.browseByStylePods[id];
            var next = n.current + direction;
            if(next < 0){
                next = 0;
            }
            if(next >= n.length){
                next = n.length - 1;
            }
            return next;
        },
        set: function(id,next){
            var n = SNI.HGTV.DesignPortfolio.browseByStylePods[id];
            if(n.current != next & !n.lock){
                n.lock = true;
                n.current = next;
                var obj = $("#" + id);
                var newx = -1 * next * obj.find(".bd li:first").width();
                obj.find(".bd ul").animate({
                    left:newx
                },n.duration,n.easing,function(){
                    // free the lock for another click
                    n.lock = false;
                });
                if(n.current<1){
                    obj.find(".previous a").addClass("disabled");
                }
                else {
                    obj.find(".previous a").removeClass("disabled");
                }
                if(n.current>=n.length-1){
                    obj.find(".next a").addClass("disabled");
                }
                else {
                    obj.find(".next a").removeClass("disabled");
                }
            }
        },
        init: function(){
            // create dropdowns
            $('#dp-space-more select').dropdown({
                title: "Browse More Spaces"
            });
            $('#dp-designer-more select').dropdown({
                title: "Browse More Designers"
            });
            $('#dp-sponsor-more select').dropdown({
                title: "Browse More Showrooms"
            });
            $('#dp-style-more select').dropdown({
                title: "Browse More Styles"
            });

            $('#dp-browse .more-pod').each(function() {
                var select = $(this);

                select.change(function() {
                    window.location.href = $(this).val();
                    return false;
                });
            });

            $("#dp-browse-designer .bd ul").each(function(i){
                var list = $(this);
                var length = list.find("li").length;
                if(length>1){
                    list.width(list.find("li:first").width() * length);
                    var obj = list.parents("li");
                    var id = obj.attr('id');
                    SNI.HGTV.DesignPortfolio.browseByStylePods[id] = new SNI.HGTV.DesignPortfolio.browseByStylePods.node(id,length);

                    obj.find(".pod").addClass("multiple");
                    obj.find(".wrap").before('<p class="previous"><a href="#">Previous</a></p>\n');
                    obj.find(".wrap").before('<p class="next"><a href="#">Next</a></p>\n');

                    obj.find(".previous a").bind("click", function() {
                        var n = SNI.HGTV.DesignPortfolio.browseByStylePods.advance(id,-1);
                        SNI.HGTV.DesignPortfolio.browseByStylePods.set(id,n);
                        return false;
                    });
                    obj.find(".next a").bind("click", function() {
                        var n = SNI.HGTV.DesignPortfolio.browseByStylePods.advance(id,1);
                        SNI.HGTV.DesignPortfolio.browseByStylePods.set(id,n);
                        return false;
                    });
                    SNI.HGTV.DesignPortfolio.browseByStylePods.set(id,0);
                }
            });
        }
    },
    /* /BROWSE BY STYLE PODS ON DETAIL PAGE */



    /* Room Browser */
    RoomBrowser: {
        google_leaderboard_html: "",

        getRooms: function(data, count){
            var browser = this;
            var next_button = browser.element.find('.navigate .next');
            var previous_button = browser.element.find('.navigate .previous');
            // this should be the array of room id's
            var room_count = count || data.length;
            var first_room = data[0];
            var this_room = parseInt(browser.portfolioId);
            browser.rooms = data;

            if (window.location.hash) {
                var id_in_hash = window.location.hash.split('/')[1];
                if (id_in_hash) {
                    var id_value = id_in_hash.split('-');
                    id_value.shift();
                    var hash_id = parseInt(id_value.join('-'));
                    if (hash_id && (jQuery.inArray(hash_id, data) >= 0)) {
                        first_room = data[jQuery.inArray(hash_id, data)];
                        if (first_room != this_room) {
                            this_room = null;
                        }
                    }
                }
            }

            if (this_room && (jQuery.inArray(this_room, data) >= 0)) {
                first_room = data[jQuery.inArray(this_room, data)];
                browser.portfolioId = null;
            }

            browser.setRoomCount(room_count);

            // Load first room in set if it is not the current portfolio
            if ( (first_room != this_room) && (!browser.previewFlg) ) {
                browser.loadRoom(first_room);
            } else {
                browser.hideLoadingFilters();
            }

            if (!(data.length <= 1)) {
                browser.navigateRooms(first_room);
                if (next_button.hasClass('disabled')) {
                    next_button.removeClass('disabled');
                }
                if (previous_button.hasClass('disabled')) {
                    previous_button.removeClass('disabled');
                }
            } else {
                next_button.addClass('disabled');
                previous_button.addClass('disabled');
            }


            return data;
        },

        navigateRooms: function(current_room,dir) {
            var browser = this;
            var rooms = browser.rooms;
            var current_room_index = jQuery.inArray(current_room,rooms);

            if (current_room_index === 0) {
                // first room
                browser.previous_room = rooms[rooms.length - 1];
                browser.next_room = rooms[current_room_index + 1];
            } else if (current_room_index === (rooms.length - 1)) {
                // last room
                browser.previous_room = rooms[current_room_index - 1];
                browser.next_room = rooms[0];
            } else {
                browser.previous_room = rooms[current_room_index - 1];
                browser.next_room = rooms[current_room_index + 1];
            }
            
            //preload for performace
            if(dir === 'prev'){//only go one back for previous button -- this should be much less common anyway
                browser.preloadRoom(browser.previous_room);
            } else {//go two forward
            browser.preloadRoom(browser.next_room);
            if(current_room_index + 2 < rooms.length) browser.preloadRoom(rooms[current_room_index + 2]);            
            }

            return rooms;
        },

        preloadRoom: function(room){//for performace purposes
            if(room in SNI.HGTV.DesignPortfolio.ajaxCache) return;
            var browser = this;
            //url used to be taken from JS function taken from backend, which meant that preprod used the prod portfolio service causing cross-domain issues -- going relative
            var url = '/app/PortfolioService/index.json?portfolio='+room+'&site=HGTV';
            if (browser.previewFlg) {
                url += '&preview=true'
            }
            $.ajax({
                url: url,
                dataType : 'script', //note that this dataType results in the script being executed in global scope
                success: function(result, textStatus){
                    if(typeof dpCurrentRoom == "undefined" || $.isEmptyObject(dpCurrentRoom)) { 
                        console.log("Problem in preload");
                    }
                    else{    
                        SNI.HGTV.DesignPortfolio.ajaxCache[room] = dpCurrentRoom; //dpCurrentRoom is set through ajax; cache result of that variable 
                        $('<img/>')[0].src = dpCurrentRoom.images[0].lgUrl; //cache image
                    } 
                },
                error: function(jqXHR, textStatus, errorThrown){console.log(textStatus);}
            }); 
        },

        goNextRoom: function(){
        		SNI.HGTV.Omniture.setAjaxOmniReferer();
        		
            var browser = this;

            // Refresh Ads, if an interstitial is returned, hijack the viewer
            
            SNI.HGTV.DynamicAds.refresh();
            
            var current_room = browser.loadRoom(browser.next_room,'next');
            if (current_room){
                browser.navigateRooms(current_room, 'next');
            }

            return browser.current_room;
        },

        goPreviousRoom: function(){
        		SNI.HGTV.Omniture.setAjaxOmniReferer();
            var browser = this;

            // Refresh Ads, if an interstitial is returned, hijack the viewer
            SNI.HGTV.DynamicAds.refresh();

            var current_room = browser.loadRoom(browser.previous_room, 'prev');
            if (current_room){
                browser.navigateRooms(current_room,'prev');
            }

            return browser.current_room;
        },

        loadRoom: function(room_id, dir) {
            var browser = this;
            browser.imageContainer.attr("style", "");
            browser.imageContainer.find("img").attr("style", "");
            var applied_filters = (window.location.hash || "#").split('/');
            var url = browser.serviceUrl + 'PortfolioService/index.json?portfolio='+room_id+'&site=HGTV';
            if (browser.previewFlg) {
                url += '&preview=true'
            }
            var room_type = browser.portfolioRoomName;
            var room_type_filter = browser.element.find('#select-filter-room :selected');

            if (browser.google_leaderboard_html == "") {
                browser.google_leaderboard_html = $("<div />").append($("#hg-w").find(".google-leaderboard").clone().find("script").remove().end()).html();
            }

            // Loading screen
	          browser.displayLoadingMessage(room_id);
            browser.current_room = room_id;

                successFunction = function(result){//moved this from ajax call below   
                    if (result) dpCurrentRoom = result; //normally this is called after dpCurrentRoom was put into global scope using ajax or ajaxCache
                    if (typeof dpCurrentRoom == "undefined" || $.isEmptyObject(dpCurrentRoom)) {
                        browser.goNextRoom();
                    }

                    // Add the room Id to the hash
                    applied_filters[1] = ("id-" + dpCurrentRoom.portfolioId);
                    window.location.hash = applied_filters.join('/');

                    // if this is a sponsored Room and the browser is not set to display the sponsor filter
                    // go to the permalink for the sponsored room.

                    if (!browser.sponsorFlg && (dpCurrentRoom.sponsorFlag.length > 0)) {
                        browser.refreshPage();
                        return dpCurrentRoom;
                    }

                    // if the browser is displaying the sponsor filter but this is not a sponsored room
                    // redraw the filters without the sponsored dropdown
                    if (browser.sponsorFlg && (dpCurrentRoom.sponsorFlag.length <= 0)) {
                        browser.sponsorFlg = false;
                        browser.refreshPage();
                        return dpCurrentRoom;
                    }

                    // if this is a sponsored room, but the sponsorship of the room is different than
                    // that of the page refresh the page
                    if (browser.sponsorFlg && (dpCurrentRoom.sponsorshipValue != mdManager.getSponsorship())) {
                        browser.refreshPage();
                        return dpCurrentRoom;
                    }

                    // If a Room Type is selected and does not match the current room's Room Type,
                    // refresh the right rail

                    // Set Room Metadata
                    if(dpCurrentRoom && dpCurrentRoom.metadata){
                      jQuery.each(dpCurrentRoom.metadata, function(key,val){
                        mdManager.setParameter(key, val);
                      });
                    }

                    // Send data to Omniture:
                    if (typeof s == "object") {
                        s.t();
                    }

                    // Nielson hit count: new NSE fn
                    SNI.Nielsen.trackNSE();

                    browser.constructRoom(dpCurrentRoom);

                    // hide loading message
                    browser.hideLoadingFilters();
                    browser.hideLoadingMessage();
                }

        if(room_id in SNI.HGTV.DesignPortfolio.ajaxCache) {//if ajax result is already in cache
            dpCurrentRoom = SNI.HGTV.DesignPortfolio.ajaxCache[room_id]; //dpCurrentRoom has already been "parsed" in the ajax request, b/c of the script dataType, and then cached
            successFunction(dpCurrentRoom); //do what would normally be done in success condition of AJAX
        }
        else { 
            jQuery.ajax({
                url: url,
                dataType: 'script',
                cache: true,
                success: function(result, textStatus){
                    if(typeof dpCurrentRoom == "undefined" || $.isEmptyObject(dpCurrentRoom)) { 
                        console.log("Problem with dpCurrentRoom, going to next room... " + dir); 
                        if(dir === 'prev') browser.goPreviousRoom();
                        else browser.goNextRoom();
                    }
                    else{
                        SNI.HGTV.DesignPortfolio.ajaxCache[room_id] = dpCurrentRoom; //cache result
                        successFunction(dpCurrentRoom); //note dpCurrentRoom is a global var, but I'm passing it anyway 
                    }
                }
                 
            });
        }
            return browser.current_room;
        },

        displayLoadingMessage: function(room_id){
            var browser = this;
            var room_viewer = browser.viewer;
            var content_well = jQuery('#hg-w');
            var designers_notes = room_viewer.find('.dp-notes');
            var loader = jQuery('<div id="room-loading"><p>Loading room...</p></div>');
            content_well.empty();
            designers_notes.empty();
            room_viewer.append(loader);
        },

        hideLoadingMessage: function(){
            var browser = this;
            browser.viewer.find('#room-loading').hide().remove();
        },

        setRoomCount: function(count) {
            var browser = this;

            var criteria = browser.element.find('.navigate > .room-count .criteria');
            var room_count_html = browser.element.find('.navigate > .room-count strong');
            var room_text = ' Rooms';

            if (count === 1) {
                room_text = ' Room';
            }

            room_count_html.html('<span class="count">'+count+'</span>'+room_text);

            if (browser.filterIsApplied()) {
                criteria.text('Based on the above criteria');
            } else {
                criteria.text('Set your criteria above to narrow your results');
            }

            return room_count_html;
        },

        filterIsApplied: function(){
            var browser = this;
            var filters = browser.element.find('.filter-select :selected').not('.excluded')
            return !(filters.length <= 0);
        },

        generateFilters: function(filters){
            var browser = this;
            var select_lists = browser.element.find('.filter');
            var flyouts = [];
            jQuery.each(filters, function(i,filter){

                if (browser.sponsorFlg) {
                    if (filter.name == "designer") {
                        return true;
                    }
                } else {
                    if (filter.name == "sponsor") {
                        return true;
                    }
                }

                var $select_list = select_lists.eq(i);
                if (filter.name == "sponsor") {
                    $select_list = select_lists.eq(3);
                }
                var label = jQuery('<label class="filter-title"></label>');
                var select = jQuery('<select class="filter-select"></select>');
                var option = "<option></option>";


                label.attr('for',filter.id);
                label.text(filter.label+":");
                select.attr('id',filter.id);
                select.attr('name',filter.name);
                select.append('<option class="excluded">Any '+filter.label+'</option>');

                jQuery.each(filter.options, function(j, option){
                    var $option = jQuery('<option value="'+option.v+'">'+option.t+'</option>');
                    if (option.s) {
                        $option.attr('selected','selected');
                    }
                    if (option.d) {
                        $option.attr('disabled','disabled');
                    }
                    select.append($option);
                });
                $select_list.empty();
                $select_list.append(label);
                $select_list.append(select);

                flyouts.push(browser.generateFlyout(select).flyout);

            });
            browser.checkSelectedFilters(flyouts);
            jQuery.each(flyouts, function(index, flyout) {
                if (flyout.select.attr('id') === 'select-filter-room') {
                    browser.changeRoomType(flyout.select.find(':selected'));
                }

                flyout.resetLink.click(function(e){
                    jQuery.each(flyouts, function(index, flyout) {
                        flyout.hide();
                        flyout.flyout_reset.attr('selected','selected');
                        browser.element.removeClass("filtered");
                        if(index+1 >= flyouts.length) {
                            flyout.select.change();
                        }
                    });
                });
            });

            browser.filterClickTracking();
            return select_lists;
        },

        checkSelectedFilters: function(flyouts) {
            var browser = this;
            var reset_all = true;
            if(!browser.element.hasClass("filtered")) {
                browser.element.addClass("filtered");
            }
            jQuery.each(flyouts, function(index, flyout) {
                // not sure if the [0] is needed but could not access selectedIndex without it
                if(flyout.select[0].selectedIndex>0) {
                    reset_all = false;
                    return false;
                }
            });
            if(reset_all) {
                browser.element.removeClass("filtered");
            }
        },
        
        setRoomType: function(room_en) {
          var browser = this;
        	room_map = { "main" : "main",
        								"kitchens" : "kitchens", 
												"bathrooms" : "bathrooms", 
												"livingrooms" : "living-rooms", 
												"diningrooms" : "dining-rooms", 
												"bedrooms" : "bedrooms",
												"kidsrooms" : "kids-rooms",
												"outdoors" : "outdoors" };
					var room_js = room_map[room_en];
          if (typeof room_js == "undefined") {
          	room_js = "main";
          }
          browser.menuReset(room_js);
          return;
        },

        menuReset: function(rm) {
            var browser = this;
            var navigation = $('#tentpole-menu');
            var selector = ".tab-" + rm;
            navigation.children('li').removeClass('sel');
            if (navigation.children(selector).length == 0) {
            	selector = '.tab-main';
            }
            navigation.children(selector).addClass('sel');
        },

        changeRoomType: function(option){
            var browser = this;
          //  var right_rail = $('#hg-e');
						browser.menuReset(option.val());
						return;
        },
        
        loadRightRail: function(room_type){
            // SE-700: Currently deferred...
            var browser = this;
            var right_rail = $('#hg-e');

            jQuery.ajax({
                url: browser.rightRailService(room_type),
                dataType: 'script',
                success: function(result, textStatus){
                    if (typeof roomTypeRightRail == "undefined") {
                        eval(result);
                    }
                /*          right_rail.empty();*/
                }
            });
        },

        generateFlyout: function(select){
            var browser = this;
            var config = {};

            config.flyout_css = false;
            config.close_button = true;

            if (select.attr('id')) {
                var label = jQuery("label[for='"+select.attr('id')+"']");
                if (label.size() > 0) {
                    config['title'] = 'Select a ' + jQuery.trim(label.text());
                }
            }

            select.change(function(e){
                var $this = $(this);
                var select_lists = browser.element.find('select');
                var applied_filters = ("#").split('/');
                applied_filters[1] = window.location.hash.split('/')[1];

                var filter = $this.attr('name')
                var option = $this.children(':selected').val();
                var url = browser.browserService();
                var selected_hash = [];
                var room_type = browser.portfolioRoomName;

                jQuery.each(select_lists, function(i,list){
                    var $list = jQuery(list);
                    var $selected = $list.children(':selected');
                    if ($selected.hasClass('excluded')) {
                        return true;
                    }
                    url += $list.attr('name') + "/" + $selected.val() + "/";

                    selected_hash.push($list.attr('name') + '-' + $selected.val());
                });
                jQuery.merge(applied_filters,selected_hash);
                window.location.hash = applied_filters.join('/');
                url += 'roomfilter.js';
								SNI.HGTV.DynamicAds.reset_cap();
                browser.generateBrowser(url);
            });


            var flyout = SNI.Util.Flyout.createFor(select,config);
            var flyout_body = flyout.element.children('.flyout-bd');
            var flyout_reset = flyout.select.children('.excluded');
            var select_name = select.attr('name').charAt(0).toUpperCase() + select.attr('name').substr(1).toLowerCase();
            var reset_button = jQuery('<button class="button"><span><em>See Any Available '+select_name+'</em></span></button>');
            reset_button.click(function(e){
                flyout.hide();
                flyout_reset.attr('selected','selected');
                flyout.select.change();
                e.preventDefault();
            });
            flyout_body.append(reset_button);

            var reset_container = jQuery('<div class="reset">Or </div>');
            var reset_link = jQuery('<a href="javascript: void(0);">Start a New Search</a>');
            reset_container.append(reset_link)
            flyout_body.append(reset_container);

            flyout.resetLink = reset_link;
            flyout.flyout_reset = flyout_reset;

            select.flyout = flyout;


            return select;
        },

        generateBrowser: function(service_url){
            var browser = this;

            browser.showLoadingFilters();

            jQuery.ajax({
                url: service_url,
                dataType: 'script',
                success: function(result, textStatus){
                    if (typeof dpRoomBrowser == "undefined") {
                        //when is this condition ever met?  ajax() executes the script (result) automatically, and in global scope
                        //note: the eval statement below would actually place it in local scope
                        eval(result);
                    }
                    browser.generateFilters(dpRoomBrowser.filters);
                    browser.getRooms(dpRoomBrowser.rooms, dpRoomBrowser.count);
                }
            });

            return browser;
        },

        /* DEV */
        /*    browserService: 'http://10.64.36.113:18080/HGTVSearchServiceCXF/browseByRoom/',*/
        /* Staging */
        /*    browserService: 'http://search1.staging-hgtv.com/hgtv/cxfservice/browseByRoom/',*/
        /* Production*/
        // browserService: 'http://www.hgtv.com/hgtv/cxfservice/browseByRoom/',

        browserService: function(){
            var url;
            switch(window.location.host){
                case 'www.dev-hgtv.com':
                    url = 'http://10.64.36.113:18080/HGTVSearchServiceCXF/browseByRoom/'
                    break;
                case 'www.staging-hgtv.com':
                    url = 'http://search1.staging-hgtv.com/hgtv/cxfservice/browseByRoom/';
                    break;
                default:
                    url = 'http://www.hgtv.com/hgtv/cxfservice/browseByRoom/';
            }
            return url;
        },

        rightRailService: function(room_type){
            room_type = room_type || '';
            return 'http://' + window.location.host + '/hgtv/feeds/portfolio-right-rail/0,,HGTV_'+room_type+',00.html'
        },

        showLoadingFilters: function(){
            var browser = this;
            if (browser.element.find('.loading').length <= 0){
                browser.element.append('<div class="loading">Loading Filters</div>');
            }
        },

        hideLoadingFilters: function(){
            var browser = this;
            browser.element.children('.loading').remove();
        },

        constructRoom: function(data){
            var browser = this;
            var room_viewer = browser.viewer;
            var content_well = jQuery('#hg-w');
            var designers_notes = room_viewer.find('.dp-notes');

            var toggler = browser.imageContainer.find(".dp-toggler").detach();
            var enlarge = browser.toggler.find(".dp-enlarge");
            var shrink = browser.toggler.find(".dp-shrink");

            designers_notes.empty();
            content_well.empty();
            browser.imageContainer.empty();
            
            browser.imageContainer.append(toggler);
            enlarge.show();
            shrink.hide();
            if(data.images[0].bvert && data.images[0].bvert == "true") {
                browser.imageContainer.addClass("dp-fitted");
            } else {
                browser.imageContainer.removeClass("dp-fitted");
            }

            var designer_info = jQuery('<div id="dp-about-designers" class="dp-acco"><div class="hd"><h4>About the Designer(s)</h4></div>');
            var more_from_sponsor = jQuery('<div id="dp-more-sponsor" class="dp-notes"><h4>More From This Sponsor</h4></div>');

            if (data.multimedia && data.multimedia.length > 0) {
                browser.imageContainer.append(data.multimedia);
            } else if (data.images && data.images.length > 0) {
                var new_img = $('<img src="'+data.images[0].lgUrl+'" alt="'+data.images[0].img_alt+'" />');
                new_img.click(function(e){
                    if(!browser.element.find('.navigate .next').hasClass("disabled")) {
                        browser.goNextRoom();
                    }
                    return false;
                });
                browser.imageContainer.append(new_img);
            }

            if (data.designerNotes.length >= 1) {
                if (data.sponsorFlag.length >= 1){
                    designers_notes.append('<h4>About This Room</h4>');
                } else {
                    designers_notes.append("<h4>Designer's Notes</h4>");
                }
                designers_notes.append(browser.truncateNotes(data.designerNotes));
            }

						browser.updateToolbar();

            if (data.sponsorFlag.length <= 0) {
                designer_info.append(data.designerList);
                designer_info.append('<div class="ft"></div>');
                content_well.append(designer_info);
                content_well.find('#dp-about-designers .acco-dp').dpl('accordion');
            }

            /* MORE FROM THIS SPONSOR MODULE IS BROKEN RIGHT NOW */

            /*else {
	           var sponsor_data = jQuery(data.moreFromThisSponsor);
	           room_viewer.append(more_from_sponsor);
	           if (sponsor_data.get(0).nodeName == 'SCRIPT') {
	              console.log(sponsor_data.attr('src'));
	              room_viewer.find('#dp-more-sponsor').append(sponsor_data);
	           } else {
	              room_viewer.find('#dp-more-sponsor').append(sponsor_data);
	            }
	         }*/

            content_well.append(data.otherRoomsEndeca);

            content_well.append(browser.google_leaderboard_html);

            return data;
        },
        
        updateToolbar : function() {
            var browser = this;
						var id = browser.current_room;
						var $tb = $("#toolbar");
						// update favorite URL:
						/*
							ADDED 12-09-2013 cengle
							MM-5703
							(OR empty string)
							Will cause res to not match anything allowing 
						*/
						var url = $tb.find("li.favorite a").attr("href") || '';
						var res = url.match(/([^\s]*=)[0-9]+$/);
						if ($.isArray(res) && res.length > 1) {
							url = res[1] + id;
							$tb.find("li.favorite a").attr("href", url); 
						}
						// update print URL: 
						url = $tb.find("li.print a").attr("href"); 
						res = url.match(/([^\s]*_)[0-9]+(_PORTFOLIO-DETAIL-PRINT[^\s]*)$/);
						if ($.isArray(res) && res.length > 2) {
							url = res[1] + id + res[2];
							$tb.find("li.print a").attr("href", url); 
						}
						with (location) {
							var thisUrl =  protocol + "//" + hostname + mdManager.getParameterString("Url");
						}
						var thisTitle = this.buildTitle();
						// update ShareThis Facebook Chicklet
						SNI.HGTV.Toolbar.facebook_shared_object.properties.url = thisUrl + "?soc=sharingfb";
						SNI.HGTV.Toolbar.facebook_shared_object.properties.title = thisTitle;
						// update ShareThis Twitter Chicklet
						SNI.HGTV.Toolbar.twitter_shared_object.properties.url = thisUrl + "?soc=sharingtw";
						SNI.HGTV.Toolbar.twitter_shared_object.properties.title = thisTitle + " #HGTV ";
                        //update Pinit button -- not following style/approach of other buttons as this is going to change in MM-4500
                        
                        var pinurl = thisUrl,
							/*
								ADDED 12-09-2013 cengle
								MM-5703
								typeof dpCurrentRoom != 'undefined' ... : '' in effort to ensure non failure for this line of code								
							*/
							pinmedia = typeof dpCurrentRoom != 'undefined' && !$.isEmptyObject( dpCurrentRoom ) && typeof dpCurrentRoom.images != 'undefined' && $.isArray( dpCurrentRoom.images ) && typeof dpCurrentRoom.images[ 0 ].lgUrl != 'undefined'
								? dpCurrentRoom.images[0].lgUrl
									: "http://hgtv.sndimg.com/HGTV/2012/07/02/HGTV_favicon_s92x69.png";
                        $tb.find('.pinit a').attr('href','http://pinterest.com/pin/create/button/?url='+encodeURIComponent(pinurl)+ encodeURIComponent("?soc=sharingpinterest")+"&description="+encodeURIComponent(thisTitle + " on HGTV")+"&media="+encodeURIComponent(pinmedia));
						return;
        },

				buildTitle: function() {
					function fixTitleWord(s) {
						return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
					}
					var aPath = mdManager.getParameterString("Url").split('/');
					var len = aPath.length;
					if (len > 3 && aPath[len - 1] == "index.html") {
						return fixTitleWord(aPath[aPath.length-4]) + " " + fixTitleWord(aPath[aPath.length-3]) + " from " + mdManager.getParameterString("DesignerName");
					} else {
						return "Beautiful Room Design";
					}
				},
				
        truncateNotes: function(notes){
            var browser = this;
            var $notes = $(notes);
            var text = $notes.text();
            var cut_off = 333;

            if (text.length > cut_off) {
                var new_notes = text.slice(0, cut_off)+"... ";
                var more_link = jQuery('<a href="#">more</a>').click(function(e){
                    $(this).parent().text(text);
                    return false;
                });

                $notes.text(new_notes);
                $notes.append(more_link);
            }

            return $notes;
        },

        refreshPage: function(url){
            var path;
            try {
                path = dpCurrentRoom.metadata.Url;
            } catch(err) {
                path = url || window.location.pathname
            }

            var new_location = 'http://'+ window.location.host + path + window.location.search + window.location.hash;
            window.location = new_location;
            return new_location;
        },

        filterClickTracking: function(){
            var browser = this;
            var filters = browser.element.find('.filters .flyout-for-select .flyout-bd');

            if (filters.length <= 0) {
                return;
            }

            filters.bind('click',function(e){
                var $clicked = $(e.target);
                var filter = $clicked.parents('#room-browser li.filter').children('.filter-title').text().split(':')[0];
                var option = $clicked.text();
                var s = s_gi(s_account);
                s.linkTrackVars='prop50,eVar8';
                s.linkTrackEvents='None';
                s.prop50 = filter + ': ' + option;
                s.eVar8 = s.prop50;
                s.tl(this,'o','DP Room Filter');

                s.linkTrackVars='';
                s.linkTrackEvents='';
                s.prop50 = '';
                s.eVar8 = '';
            });
        },

        init: function(){
            var browser = this;
            browser.element = jQuery('#room-browser');
            browser.viewer = jQuery('#room-viewer');

            browser.setupToggler();

            var next_button = browser.element.find('.navigate .next');
            var previous_button = browser.element.find('.navigate .previous');
            var service_url = browser.browserService();

            // Add filter options to URL
            if (window.location.hash) {
                var filters = window.location.hash.split('/');
                var url = '';
                jQuery.each(filters,function(i,val){
                    // skip the # sign and skip if this one is blank
                    if (i == 0 || !val) {
                        return true;
                    }
                    var filter = val.split('-');
                    var name = filter.shift();
                    var value = filter.join('-');
                    // skip over the room id
                    if (name == 'id') {
                        return true;
                    }
                    url += name + '/' + value + '/';
                });
                if (url) {
                    service_url += url;
                }
            }

            browser.generateBrowser(service_url + 'roomfilter.js');

            previous_button.click(function(e){
                if ($(this).hasClass('disabled')) {
                    return false;
                }
              	if ($(this).data("block") != "yes") browser.goPreviousRoom();
              	SNI.HGTV.Omniture.setAjaxOmniReferer();
                return false;
            });

            next_button.click(function(e){
                if ($(this).hasClass('disabled')) {
                    return false;
                }
              	if ($(this).data("block") != "yes") browser.goNextRoom();
              	SNI.HGTV.Omniture.setAjaxOmniReferer();
                return false;
            });
            
            browser.viewer.find('.large-image img').click(function(e){
                if(!next_button.hasClass("disabled")) {
                		SNI.HGTV.Omniture.setAjaxOmniReferer();
                    browser.goNextRoom();
                }
                return false;
            });

            //toolbar is getting revamped in MM-4500, just adding Pinterest button quickly before then
            //this is for initial pageload
            var pinurl = 'http://' + SNI.Config.domain + mdManager.getParameterString("url");
                        var pinmedia = $('#dp-space-viewer img').attr('src');
                        if (!pinmedia) pinmedia = "http://hgtv.sndimg.com/HGTV/2012/07/02/HGTV_favicon_s92x69.png";                            
            $('#toolbar .pinit a').attr('href','http://pinterest.com/pin/create/button/?url='+encodeURIComponent(pinurl)+ encodeURIComponent("?soc=sharingpinterest")+"&description="+encodeURIComponent(this.buildTitle() + " on HGTV")+"&media="+encodeURIComponent(pinmedia));


    //swipe stuff -- using hammer.js, map swipe events to next/previous button clicks
    swipeForElement = function(el) {
        if (typeof (Hammer) === 'undefined') return false;

        if (typeof (el) === 'undefined') {//condition is met in ad callback
        var el = $('.inter-container');
        if (el.length == 0) return;
        }
        
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
            previous_button.trigger('click');
        } else if(ev.direction == 'left') {
            next_button.trigger('click');
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
            browser.viewer.find('.large-image img').trigger('click');     
        }          

    }

    swipe = function() {
        /* Set-up Hammer */
        var photo_wrap = browser.viewer.find('.large-image');
        swipeForElement(photo_wrap);
    }

    //load hammer.js if device has touch support
    if ( SNI.HGTV.hasTouch() ) {
        SNI.HGTV.loadMobileJS(swipe);
    }
    



            //callback function is so that mobile swiping will advance past interstitial ads
            SNI.HGTV.DynamicAds.init({ container: browser.viewer, insert_tgt: browser.viewer, dismiss_elts: [next_button, previous_button] , callback: swipeForElement});

            SNI.HGTV.Omniture.ClickTrack("#room-browser .navigate", "Designer's Portfolio Room Gallery");

            return browser;
        },
        setupToggler: function() {
            var browser = this;
            browser.toggler = browser.viewer.find(".dp-toggler");
            var enlarge = browser.toggler.find(".dp-enlarge");
            var shrink = browser.toggler.find(".dp-shrink");
            var imageContainer = browser.viewer.find(".large-image");
            browser.imageContainer = imageContainer;

            enlarge.click(function(){
                browser.imageContainer.animate({
                    width: "616px"
                }, 200);
                browser.imageContainer.find("img").animate({
                    width: "616px"
                }, 200);
                enlarge.hide();
                shrink.show();
            });

            enlarge.children(".dp-toggler-button").hover(function () {
                enlarge.children(".dp-toggler-label").show();
            },
            function () {
                enlarge.children(".dp-toggler-label").hide();
            });

            enlarge.children(".dp-toggler-label").hover(function () {
                enlarge.children(".dp-toggler-label").show();
            },
            function () {
                enlarge.children(".dp-toggler-label").hide();
            });

            shrink.click(function(){
                browser.imageContainer.animate({
                    width: "346px"
                }, 250);
                browser.imageContainer.find("img").animate({
                    width: "346px"
                }, 250);
                shrink.hide();
                enlarge.show();
            });

            shrink.children(".dp-toggler-button").hover(function () {
                shrink.children(".dp-toggler-label").show();
            },
            function () {
                shrink.children(".dp-toggler-label").hide();
            });

            shrink.children(".dp-toggler-label").hover(function () {
                shrink.children(".dp-toggler-label").show();
            },
            function () {
                shrink.children(".dp-toggler-label").hide();
            });
        }
    },
    searchFieldHandler: function(){

        var searchField =  jQuery("#hg-w-search-input");
        var label = "Search Thousands of Designer Rooms";

        searchField.val(label);

        if(searchField.val() != label) {
            searchField.removeClass("grayedout");
        }

        searchField.focus(function(e) {
            var field = jQuery(this);
            field.removeClass("grayedout");
            if(field.val() == label) {
                field.val("");
            }
        });
        searchField.blur(function(e) {
            var field = jQuery(this);
            if(field.val() == "") {
                field.addClass("grayedout");
                field.val(label);
            }
        });

        jQuery("#dp-search .search .input").click(function(){
            searchField.focus();
        });

        jQuery("#dp-search-form").submit(function(e){
            if(searchField.val() == label) {
                searchField.val("");
            }
        });

    }

};
