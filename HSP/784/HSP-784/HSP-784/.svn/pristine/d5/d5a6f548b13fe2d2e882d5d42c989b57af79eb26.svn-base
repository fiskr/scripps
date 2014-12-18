if (typeof (SNI.HGRM.TravelingLib) == "undefined") {
    SNI.HGRM.TravelingLib = {};
}

SNI.HGRM.TravelingLib = {
    itemsPerPage: 9,
    itemsInList: 20,
    itemsPerRow: 3,
    libraryUrl: SNI.Config.snapPlayListUrl + "/feeds/channel-video/",
    viewingPage: 1,
    currentVideoDuration: null,
    currentVideoId: null,
    videoPaused: false,
    pageParams: false,
    currentView: 'thumbs',
    sortOrder: 'RA',
    pageType: '',
    channels: [],
    channelInfo: {},
    pagesData: {},
    initialLoad: true,
    initialInlineLoad: true,
    params: {},

    init: function () {
        var lib = this;
        var params = lib.params();
        lib.params = params;
        lib.getChannelList();
        lib.changeSelectedChannel();

        if ((lib.pageType != 'channel') && (params.channel) && ($.inArray(params.channel + "", lib.channels) > -1)) {
            $(".traveling-lib .sections li[data-channel='" + params.channel + "'] a").click();
            if (params.video) lib.viewingPage = lib.findVideoInChannel(params.video, params.channel);
        }

        var channelId = lib.getChannelId();
        lib.videoView(channelId);

        $("div.toggle-view input:radio").change(function () {
            lib.toggleViewOption($(this).val());
        });

        // Have to explicitly tell IE to trigger the radio button change when the label is clicked...
        $('div.toggle-view label').click(function () {
            var label = $(this).attr('for');
            $('#' + label).change();
        });

        lib.lastPlayedVideoId = null;
    },

    fixThumbPos: function (offset) {
        var elems = $(".fix-pos");
        var isChannel = $(document.getElementById("video")).hasClass("channel-detail");
        return $.each(elems, function () {
            var isPlaying = $(this).parent().css("position", "relative").hasClass("playing");
            var leftPos = $(this).css("margin-left", "0").prev().find(".title-and-time").outerWidth(true) + ((offset || 30) + (isChannel ? 60 : 0) + (isPlaying ? 30 : 0));
            return $(this).css("left", leftPos);
        });
    },

    resetInlinePlayingClass: function () {
        $('#carousel .crsl-wrap ul li').removeClass('playing');
    },

    setInlinePlayingDesc: function (val) {
        $('.pod.inline p:first').html(val);
    },

    setInlinePlayingTitle: function (title, time) {
        $('.pod.inline h4').html('<strong>' + title + '</strong><cite class="in cap">' + time + '</cite></h4>');
    },

    instantiateInlineSnapPlayer: function () {
        var lib = this;
        var i = parseInt(SNI.Util.getParameterByName("pgNum")) - 1;
        if (i == 0) {
            snap = new SNI.HGRM.Player.FullSizeNoPlaylist('video-player', snapPlayerChannelId, snapPlayerVideoId, SNI.HGRM.TravelingLib.inlineVideoSnapHandler);
        } else {
            var li = $('#carousel ul li').eq(i);
            snap = new SNI.HGRM.Player.FullSizeNoPlaylist('video-player', $(li).attr('data-channel'), $(li).attr('data-id'), SNI.HGRM.TravelingLib.inlineVideoSnapHandler);
            $(li).addClass('playing');
            SNI.HGRM.TravelingLib.setInlinePlayingDesc($(li).find('a.vid-btn img').attr('title'));
            SNI.HGRM.TravelingLib.setInlinePlayingTitle($(li).find('a span.last').html(), $(li).find('span.cap').html());
            var t = setTimeout(function () {
                $('#carousel ul li').eq(0).removeClass('playing');
            }, 100);
        }
    },

    wireInlinePlayerCarouselLinks: function () { //only called for inline player
        var lib = this;
        $('#carousel .crsl-wrap ul li a').bind('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();

            SNI.HGRM.TravelingLib.resetInlinePlayingClass();
            var li = $(this).closest('li');
            $(li).addClass('playing');
            snap.loadPlaylist($(li).attr('data-channel'), '', $(li).attr('data-id'));
            SNI.HGRM.TravelingLib.setInlinePlayingDesc($(li).find('a.vid-btn img').attr('title'));
            SNI.HGRM.TravelingLib.setInlinePlayingTitle($(li).find('a span.last').html(), $(li).find('span.cap').html());
        });
    },

    params: function () {
        var query = jQuery.query.get();
        var channel, video;

        if (query.channel) {
            channel = query.channel;
        }
        if (query.video) {
            video = query.video;
        }

        return {
            'channel': channel,
            'video': video
        };
    },

    toggleViewOption: function (view) {
        lib = this;
        var resetSelected = function () {
            $('div.toggle-view label').removeClass('selected');
        }

        resetSelected();
        if (view == 'icons') {
            lib.currentView = 'thumbs';
            var html = '';
            $('div.traveling-lib div.video-list ul.videos.sponsored li.sponsored').each(function () {
                var li = $(this);
                html += '<li class="' + li.attr("class") + '" data-id ="' + li.attr("data-id") + '" data-channel="' + li.attr("data-channel") + '">' + li.html() + '</li>';
            });
            $('div.traveling-lib div.video-list ul.videos.sponsored li.sponsored').remove();
            $('div.traveling-lib div.video-list ul.videos.content').prepend(html);

            $('div.toggle-view #view-icon-label').addClass('selected');
            $('div.traveling-lib div.video-list').attr('class', 'video-thumbs');

            $('div.traveling-lib div.video-thumbs li.sponsored').click(function () {
                var channel_id = $(this).attr('data-channel');
                var vid_id = $(this).attr('data-id');
                $('ul.videos li').removeClass('playing');
                $(this).addClass('playing');
                lib.playVideo(vid_id, channel_id, lib.viewingPage);
                return false;
            });


        } else if (view == 'list') {
            lib.currentView = view;
            var html = '';
            $('div.traveling-lib div.video-thumbs ul.videos.content li.sponsored').each(function () {
                var li = $(this);
                html += '<li class="' + li.attr("class") + '" data-id ="' + li.attr("data-id") + '" data-channel="' + li.attr("data-channel") + '">' + li.html() + '</li>';
            });
            $('div.traveling-lib div.video-thumbs ul.videos.content li.sponsored').remove();
            $('div.traveling-lib div.video-thumbs ul.videos.sponsored').append(html);
            $('div.toggle-view #view-list-label').addClass('selected');
            $('div.traveling-lib div.video-thumbs').attr('class', 'video-list');

            $('div.traveling-lib div.video-list li.sponsored').each(function () {
                $(this).click(function () {
                    var channel_id = $(this).attr('data-channel');
                    var vid_id = $(this).attr('data-id');
                    $('ul.videos li').removeClass('playing');
                    $(this).addClass('playing');
                    lib.playVideo(vid_id, channel_id, lib.viewingPage);
                    return false;
                });
            });

            lib.fixThumbPos();

        } else {
            throw "Not a recognized View."
        }
    },

    toggleView: function (view, channel_id) {
        var lib = this;
        lib.loadStream(channel_id, lib.viewingPage);
    },

    videoView: function (channel_id) {
        var lib = this;
        var toggled = $("div.toggle-view input:radio").filter(':checked').val();
        lib.toggleView(toggled, channel_id);
    },

    loadStream: function (channelId, page) {
        var lib = this;
        var library_url = lib.buildLibraryUrl(channelId, page);

        lib.showLoading();

        if ((!lib.pagesData[channelId]) || (!lib.pagesData[channelId][page])) {
            $.ajax({
                dataType: 'script',
                url: library_url,
                success: function (result, textStatus) {
                    lib.hideLoading();
                    if (typeof snapTravelingLib == "undefined") {
                        eval(result);
                    }
                    if (!lib.pagesData[channelId]) {
                        lib.pagesData[channelId] = {};
                    }
                    lib.pagesData[channelId][page] = snapTravelingLib[0];
                    lib.buildThumbs(snapTravelingLib[0]);
                },
                complete: function () {
                    if (lib.initialLoad && lib.pageType != 'channel' && lib.params.channel) {
                        SNI.HGRM.TravelingLib.setPlayingVideo(lib.params.video, lib.params.channel, lib.viewingPage);

                    } else if (lib.initialLoad && lib.pageType == 'channel' && lib.params.video) {
                        SNI.HGRM.TravelingLib.setPlayingVideo(lib.params.video, lib.currentChannelId, lib.viewingPage);
                    }
                    lib.initialLoad = false;
                }
            });

        } else {
            lib.buildThumbs(lib.pagesData[channelId][page]);
        }

    },

    buildThumbs: function (data) {
        var settings = {};
        var lib = this;
        var first_item = data.first;
        lib.first_item = data.first;
        var last_item = data.last;
        var total_items = data.total;
        var sponsorvideo_length = data.sponsor_videos.length;
        var viewing = this.buildViewingInfo(first_item, last_item, total_items);
        var current_page = this.getCurrentPage(last_item); //returns 1, 2, 3 ...
        var total_pages = this.getTotalPages(total_items, sponsorvideo_length);
        var pagi = this.buildPagination(current_page, total_pages, viewing);

        var build_a_video = function (values, sponsored, index, videoCount) {
            var title = values.label;
            var duration = values.length;
            var image_src = values.thumbnailURL;
            var description = values.description;

            var firstSponsored = '';
            var lastSponsored = '';
            if (sponsored && index == 0) firstSponsored = 'first_sp';
            if (sponsored && index == videoCount - 1) lastSponsored = 'last_sp';

            var is_playing = '';
            var sponsored_text = (sponsored) ? '<span class="sponsored">Sponsored Video</span>' : '';
            if (values.id == lib.currentVideoId) {
                is_playing = ' class=" playing  ' + firstSponsored + ' ' + lastSponsored + ' "';
                if (sponsored) {
                    is_playing = is_playing.replace('playing', 'playing sponsored ');
                }

            } else is_playing = (sponsored) ? ' class="sponsored ' + firstSponsored + ' ' + lastSponsored + ' "' : '';

            var imgWidth = (lib.pageType == 'channel') ? 120 : 92;
            var imgHeight = (lib.pageType == 'channel') ? 90 : 69;
            markup = '' + '<li data-id="' + values.id + '" data-channel="' + values.channelId + '" ' + is_playing + '>' + '<a href="javascript:void(0);" class="video-info">' + '<p class="title-and-time">' + title + '  <span>(' + duration + ')</span></p>' + '<p class="playing">PLAYING</p>' + '</a>' + '<div class="box drop quart fix-pos">' + '<div class="bd">' + '<div class="vid-btn">' + sponsored_text + '<img src="' + image_src + '" width="' + imgWidth + '" height="' + imgHeight + '" alt="' + title + '" />' + '<span class="ico"></span>' + '</div>' + '<p class="small last">' + title + '</p>' + '<p class="small desc">' + description + '</p>' + '<p class="vid-length">(' + duration + ')</p>' + '<p class="playing">PLAYING</p>' + '</div>' + '</div' + '</li>';

            return markup;
        };

        var sponsor_html = "";
        var sponsor_list_html = '<ul class="videos ' + lib.pageType.toString() + ' sponsored clrfix"><li class="perm"><p>Sponsored Videos</p></li></ul>';
        if (data['sponsor_videos'] && (data['sponsor_videos'].length > 0)) {
            $.each(data['sponsor_videos'], function (key, value) {
                sponsor_html += build_a_video(value, true, key, data['sponsor_videos'].length);
            });
        }

        var html = '<div class="loader hide-slide"><span></span></div><ul class="' + lib.pageType + ' videos content clrfix">';
        html = html + sponsor_html;

        if (data['videos'] && (data['videos'].length > 0)) {
            $.each(data['videos'], function (key, value) {
                html += build_a_video(value);
            });
        }

        html += '</ul>';

        html = $(html.toString());

        var lastRow = Math.ceil($('li', html).length / lib.itemsPerRow);
        $('li:nth-child(' + last_item + 'n)', html).each(function () {
            $(this).addClass('last');
        });
        if (lib.pageType != 'channel') {
            $('li:nth-child(' + lib.itemsPerRow + 'n-2)', html).each(function () {
                $(this).addClass('left');
            });
            $('li:nth-child(' + lib.itemsPerRow + 'n-1)', html).each(function () {
                $(this).addClass('center');
            });
            $('li:nth-child(' + lib.itemsPerRow + 'n)', html).each(function () {
                $(this).addClass('right');
            });
            $('li', html).each(function (index) {
                if (index == 3 || index == 4 || index == 5) {
                    $(this).addClass('second-row');
                }
                if (index == 6 || index == 7 || index == 8) {
                    $(this).addClass('third-row');
                }
                if (Math.ceil((index + 1) / lib.itemsPerRow) == lastRow) $(this).addClass('last-row');
            });

        } else if (lib.pageType == 'channel') {
            $('li:nth-child(' + lib.itemsPerRow + 'n-3)', html).each(function () {
                $(this).addClass('left');
            });
            $('li:nth-child(' + lib.itemsPerRow + 'n-2)', html).each(function () {
                $(this).addClass('center');
            });
            $('li:nth-child(' + lib.itemsPerRow + 'n-1)', html).each(function () {
                $(this).addClass('center');
            });
            $('li:nth-child(' + lib.itemsPerRow + 'n)', html).each(function () {
                $(this).addClass('right');
            });
            $('li', html).each(function (index) {
                if (index == 4 || index == 5 || index == 6 || index == 7) {
                    $(this).addClass('second-row');
                }
                if (Math.ceil((index + 1) / lib.itemsPerRow) == lastRow) $(this).addClass('last-row');
            });
        }

        $('li', html).click(function () {
            var channel_id = $(this).attr('data-channel');
            var vid_id = $(this).attr('data-id');
            $('ul.videos li').removeClass('playing');
            $(this).addClass('playing');
            lib.playVideo(vid_id, channel_id, current_page);
            return false;
        });


        if (data['sponsor_videos'] && (data['sponsor_videos'].length > 0)) {
            $('div.video-' + lib.currentView).html(sponsor_list_html).append(html).append(pagi);

        } else {
            $('div.video-' + lib.currentView).html(html).append(pagi)
        };

        $('div.viewing p.count').html(viewing);

        if (lib.currentView == 'list') lib.fixThumbPos(0);
    },

    playVideo: function (vidId, channelId, currentPage) {
        var lib = this;
        snap.loadPlaylist(channelId, '', vidId);
        this.setPlayingVideo(vidId, channelId, currentPage);

        var title_location = $('.sni-w .pod h4').offset().top;
        $('html,body').animate({
            scrollTop: title_location
        }, 1000);
    },

    buildPagination: function (currentPage, totalPages, viewingInfo) {
        var lib = this;
        var html = '<div class="' + lib.pageType + ' pagination"><div class="pagi clrfix">';
        html += '<span class="page-range">' + viewingInfo + '</span>';

        // print the 'previous' link/text
        if (currentPage > 1) {
            html += '<a class="nextprev prev" href="#">&larr; Previous</a> ';
        } else {
            html += '<span class="nextprev prev">&larr; Previous</span> ';
        }

        // if we're under 10 pages then we don't need special formatting
        if (totalPages < 10) {
            html += lib.getPaginationHtml(1, totalPages, currentPage, totalPages);

        } else { // special formatting with dots to show nor more than 9 page numbers

            if (currentPage < 6) {
                html += lib.getPaginationHtml(1, currentPage + 2, currentPage, totalPages);
            } else {
                html += lib.getPaginationHtml(1, 2, currentPage, totalPages);
                html += '<span>...</span>';
                html += lib.getPaginationHtml(currentPage - 2, currentPage + 2, currentPage, totalPages);
            }

            if (currentPage < totalPages - 4) {
                html += '<span>...</span>';
                html += lib.getPaginationHtml(totalPages - 1, totalPages, currentPage, totalPages);
            } else {
                html += lib.getPaginationHtml(currentPage + 3, totalPages, currentPage, totalPages);
            }
        }

        // print the 'next' link/text
        if (currentPage < totalPages) {
            html += '<a class="nextprev next" href="#">Next &rarr;</a>';
        } else {
            html += '<span class="nextprev next">Next &rarr;</span>';
        }
        html += '</div></div>';

        html = $(html);

        // setup pagination links
        var sectionId = lib.getChannelId(); // this is just a placeholder

        $('a.prev', html).click(function () {
            lib.loadStream(sectionId, currentPage - 1);
            lib.viewingPage = currentPage - 1;
            return false;
        });

        $('a.next', html).click(function () {
            lib.loadStream(sectionId, currentPage + 1);
            lib.viewingPage = currentPage + 1;
            return false;
        });

        $('a.page', html).click(function () {
            lib.loadStream(sectionId, $(this).text());
            lib.viewingPage = $(this).text();
            return false;
        });

        return html;
    },

    getPaginationHtml: function (fromPage, toPage, currentPage, totalPages) {
        var html = '';

        for (var i = fromPage; i <= toPage; i++) {
            if (i > 0 && i <= totalPages) {
                if (i == currentPage) {
                    html += '<span class="current">' + i + '</span> ';
                } else {
                    html += '<a href="#" class="page">' + i + '</a> ';
                }
            }
        }
        return html;
    },

    getTotalPages: function (totalItems, sponsorvideo_length) {
        var lib = this;
        if (sponsorvideo_length > 0) {
            var tempItemsPerPage;
            sponsorvideo_length == '1' ? tempItemsPerPage = '7' : tempItemsPerPage = '8';
            return Math.ceil(totalItems / tempItemsPerPage);
        } else return Math.ceil(totalItems / lib.itemsPerPage);
    },

    getCurrentPage: function (lastItem) {
        var lib = this;
        if ((lib.first_item + 0) > 7 && (lib.first_item + 0) <= 9) {
            return 2;
        }
        return Math.ceil(lastItem / lib.itemsPerPage);
    },

    buildViewingInfo: function (firstItem, lastItem, totalItems) {
        return firstItem + " - " + lastItem + " of " + totalItems + " Videos";
    },

    buildLibraryUrl: function (channelId, page) {
        if (channelId == "all-videos") {
            var player_id = $('.traveling-lib .sections li[data-channel="' + channelId + '"]').attr('data-player');
            return this.libraryUrl + "0,,HGRM_PLAYER_" + player_id + "_" + page + "_" + this.itemsPerPage + ",00.json";
        } else {
            return this.libraryUrl + "0,,HGRM_CHANNEL_" + channelId + "_" + page + "_" + this.itemsPerPage + ",00.json";
        }
    },

    changeSelectedChannel: function () {
        var lib = this;
        $('.traveling-lib .sections li a').click(function () {
            $(this).parents('ul').find('li a').each(function () {
                $(this).parent().removeClass('ui-state-active');
            });
            $(this).parent().addClass('ui-state-active');
            var channel = $(this).parent().attr('data-channel');
            lib.viewingPage = 1;
            lib.videoView(channel);
            return false;
        });
    },

    getChannelList: function () {
        var lib = this;
        $('.traveling-lib .sections li').each(function () {
            var channel = $(this).attr('data-channel');
            if (channel != 'all-videos') {
                lib.channels.push(channel);
            }
        });
        return lib.channels;
    },

    getChannelId: function () {
        return $('.traveling-lib .sections li.ui-state-active').attr('data-channel');
    },

    findVideoInChannel: function (video_id, channel_id) {
        // returns a page number
        var lib = this;
        var items_per_page = lib.itemsPerPage;
        var channel_listing = lib.channelInfo[channel_id + ""];

        if (channel_listing && channel_listing.length && $.inArray(video_id + "", channel_listing)) {
            var position = $.inArray(video_id + "", channel_listing);
            return Math.ceil((position + 1) / items_per_page);
        }
        return 1;
    },

    showLoading: function () {
        var lib = this;
        vw = lib.currentView;
        $('.traveling-lib .video-' + vw + ' .pagi').addClass('hide-slide');
        $('.traveling-lib .video-' + vw + ' .videos').addClass('hide-slide');
        $('.traveling-lib .video-' + vw + ' .loader').removeClass('hide-slide');
    },

    hideLoading: function () {
        var lib = this;
        vw = lib.currentView;

        $('.traveling-lib .video-' + vw + ' .loader').addClass('hide-slide');
        $('.traveling-lib .video-' + vw + ' .videos').removeClass('hide-slide');
        $('.traveling-lib .video-' + vw + ' .pagi').removeClass('hide-slide');
    },

    getCurrentPlayingPage: function (videoPosition) {
        var pos = Math.ceil((parseInt(videoPosition) + 1) / SNI.HGRM.TravelingLib.itemsPerPage);
        return pos;
    },

    snapHandler: function (eventType, eventInfo) {
        var lib = this;
        // allow passing in a JS object (HTML5) **OR** a JSON string (SNAP Flash hook)
        var event = (typeof eventInfo === 'string') ? SNI.HGRM.TravelingLib.evaluateJSON(eventInfo) : eventInfo;
        SNI.HGRM.TravelingLib.currentVideoId = event.videoId;

        // doing a big if-else statement because IE choked on a switch    
        if (eventType == 'playerReady') {
            SNI.HGRM.TravelingLib.resetPlayingVideo(SNI.HGRM.TravelingLib.currentVideoId, event.channelId);
        } else if (eventType == 'itemBegin') {
            if (event.itemType != 'ad') {
                //ad cur page
                var currPage = SNI.HGRM.TravelingLib.getCurrentPlayingPage(event.currentPlaylistPosition);
                SNI.HGRM.TravelingLib.setPlayingVideo(event.videoId, event.channelId, currPage);
            }
        } else if (eventType == 'itemEnd') {
            if (event.itemType != 'ad') {
                SNI.HGRM.TravelingLib.resetPlayingVideo(event.videoId, event.channelId);

                if (event.currentPlaylistPosition != 0) {
                    var position = SNI.HGRM.TravelingLib.addOne(event.currentPlaylistPosition);
                    if (SNI.HGRM.TravelingLib.pageType == 'channel') {
                        if (SNI.HGRM.TravelingLib.getModEight(position) == 0) {
                            $('#video-library .pagination .nextprev.next').click();
                        }
                    } else {
                        if (SNI.HGRM.TravelingLib.getModNine(position) == 0) {
                            $('#video-library .pagination .nextprev.next').click();
                        }
                    }
                }
            }
        } else if (eventType == 'itemPause') {
            if (event.itemType != 'ad') {
                SNI.HGRM.TravelingLib.pauseVideo(event.videoId, event.channelId);
            }

        } else if (eventType == 'itemResume') {
            if (event.itemType != 'ad') {
                SNI.HGRM.TravelingLib.resumeVideo(event.videoId, event.channelId);
            }
        } else if (eventType == 'done') {

            SNI.HGRM.TravelingLib.resetPlayingVideo(event.videoId, event.channelId);

            var channels = SNI.HGRM.TravelingLib.channels;
            var channel_index = channels.indexOf(event.channelId);
            // i'm doing this -(-1) thing because SNAP strips away + operators
            var next_channel = channels[(channel_index - (-1))];
            if ((channel_index - (-1)) >= channels.length) {
                next_channel = channels[0];
            }
            if ($('.traveling-lib .sections li a.selected').parent().attr('data-channel') == 'all-videos') {
                SNI.HGRM.TravelingLib.playVideo('', next_channel);
            }


        } else {
            throw 'SNAP Callback Error';
        }
    },

    evaluateJSON: function (json) {
        return eval('(' + json + ')');
    },

    setPlayingVideo: function (video_id, channel_id, currentPage) {
        var lib = this;
        var title = '';
        var length = '';
        var desc = '';

        lib.resetPlayingVideo(); //lib.lastPlayedVideoId
	
	//Commented this out, as it returns undefined in HTML5 video and does not appear to be casuing issues with SNAP player
        //var videos = lib.pagesData[channel_id][currentPage].videos.concat(lib.pagesData[channel_id][currentPage].sponsor_videos);
        //
        //$.each(videos, function (index, value) {
        //    if (value.id == video_id && value.channelId == channel_id) {
        //        title = value.label;
        //        length = ['(', value.length, ')'].join('');
        //        desc = value.description;
        //        return false;
        //    }
        //});

        var liSelector = [".traveling-lib ul.videos [data-id='", video_id, "']"];
        var currently_playing = $(liSelector.join('')).eq(0);
        currently_playing.addClass('playing');
        if (generate_snap && generate_snap.video != video_id) {
        	
          title = currently_playing.find('.last').text();
          length = currently_playing.find('.vid-length').text();
          desc = currently_playing.find('.desc').text();
        $('.sni-w .pod h4 strong').html(title);
        $('.sni-w .pod h4 cite.cap').html(length);
        $('.sni-w .pod p.video-desc').html(desc);

        lib.currentVideoDuration = length;
        lib.lastPlayedVideoId = video_id;
        }
    },

    //pauseVideo: function (video_id, channel_id) {
    //    var lib = this;
    //    var currently_playing = $(".traveling-lib .items [data-id='" + video_id + "']");
    //    currently_playing.find('.duration').text('Paused');
    //    lib.videoPaused = true;
    //},

    resumeVideo: function (video_id, channel_id) {
        var lib = this;
        var currently_playing = $(".traveling-lib .items [data-id='" + video_id + "']");
        currently_playing.find('.duration').text('Playing');
        lib.videoPaused = false;
    },

    resetPlayingVideo: function () { //video_id, channel_id
        $('.traveling-lib ul.videos li').removeClass('playing');
    },


    inlineVideoSnapHandler: function (eventType, eventInfo) {
        var lib = SNI.HGRM.TravelingLib;
        eventInfo = $.parseJSON(eventInfo);

        if (eventType == 'itemBegin') {
            if (eventInfo.itemType == 'content') {
                if (!eventInfo.videoTitle) return;

                var videoId = eventInfo.videoId;
                if (lib.getModFive(eventInfo.currentPlaylistPosition) == 0) {
                    $('.controls.btn-nav span').each(function () {
                        var attr = $(this).attr('data-load-img');
                        if (attr == eventInfo.currentPlaylistPosition) $(this).click();
                    });
                }
                lib.resetInlinePlayingClass();
                $('#carousel .crsl-wrap ul li').each(function () {
                    var attr = $(this).attr('data-id');
                    if (attr == videoId) $(this).addClass('playing');
                });
                lib.setInlinePlayingDesc(eventInfo.videoDescription);
                lib.setInlinePlayingTitle(eventInfo.videoTitle, eventInfo.videoDuration);
            };
        }
    },

    addOne: function (num) {
        return parseInt(num) + 1;
    },

    getModFive: function (num) {
        return (parseInt(num) % 5);
    },

    getModEight: function (num) {
        return (parseInt(num) % 8);
    },

    getModNine: function (num) {
        return (parseInt(num) % 9);
    }
};