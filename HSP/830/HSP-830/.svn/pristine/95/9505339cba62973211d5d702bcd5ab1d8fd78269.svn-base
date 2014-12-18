(function($){
    SNI.HGTV.TopicFilters = function(){

        var $topicResultsContainer,
        $filterList,
        $resultsDisplay,
        $paginator,
        $seeMoreTrigger,
        $moreTopicResults,
        $totalCount,
        $currentCountStart,
        $currentCountEnd,
        $loadingPanel,
        $searchContainer,
        totalResultCount,
        topicParams,
        scrollToSelector = $.browser.safari ? "body" : "html",
        trackUrl,
        currentPageUnqiueId,
        getFilteredResults = function (e, keepFilter) {
            var $link = $(this);
            
            moveAdBox();

            if(keepFilter !== true) {
                $filterList.find("li.selected").removeClass("selected");
                $link.parent().parent().addClass("selected");
            }
            
            $searchContainer.fadeOut("fast");
            
            $(scrollToSelector).animate({
                scrollTop: $topicResultsContainer.offset().top
            }, 750, "swing", function(){
                $resultsDisplay.addClass("loading");
                
                $loadingPanel.fadeIn("slow");
                $resultsDisplay.slideUp("slow", function () {
                    topicParams = getFilterParams($link.attr("href"));
                    if(topicParams != null) {
                        getFilteredResultsJSON();
                    }
                });
                $paginator.hide();
                $seeMoreTrigger.hide();
            });
            
            e.preventDefault();
        },
        getFilterResultsPage = function(e) {
            var resultCount = parseInt($(".current-count-end").html(), 10), currentResultCount, nextResultEndCount;

            if($(this).hasClass("prev")) {
                currentResultCount = (resultCount > 1 ? (resultCount-10) : 1);
            } else if($(this).hasClass("next")) {
                currentResultCount = (resultCount > 1 ? (resultCount+1) : 1);
            } else {
                resultCount = parseInt($(this).html());

                if(!isNaN(resultCount) && resultCount > 1) {
                    currentResultCount = ((resultCount-1)*10) + 1;
                }else {
                    currentResultCount = 1;
                }

            }
            
            nextResultEndCount = currentResultCount + 9;

            if(nextResultEndCount > totalResultCount) {
                nextResultEndCount = totalResultCount;
            }
            $loadingPanel.find(".elipsis").html(" " + currentResultCount + " - " + nextResultEndCount+"...");
            getFilteredResults.apply(this, [e, true]);
            e.preventDefault();
        },
        getFilterParams = function (topicUrl) {
            var parsedUrl, topic, filter = "All", pageTemp, page = 1;
            trackUrl = topicUrl;
            if(topicUrl != "") {

                parsedUrl = topicUrl.split("/topics/");
                parsedUrl = parsedUrl[1].split("/")

                topic = parsedUrl[0];

                if(topic != "") {
                    if(parsedUrl.length > 2) {
                        filter = parsedUrl[1];
                        pageTemp = parsedUrl[2].split("-");
                    } else {
                        pageTemp = parsedUrl[1].split("-");
                    }

                    if(pageTemp.length > 1) {
                        pageTemp = parseInt(pageTemp[1], 10);
                        if(!isNaN(pageTemp)) {
                            page = pageTemp;
                        }
                    }

                    return {
                        topic: topic,
                        filter: filter,
                        pageNum: page
                    };

                }
            }

            return null;
        },
        getFilteredResultsJSON = function () {
            $.ajax({
                url: "/hgtv/cxfservice/resultsByTopic/topic/" + topicParams.topic + "/filter/" + topicParams.filter + "/pageNum/" + topicParams.pageNum + "/count/10/resultsByTopic.js",
                dataType: "json",
                success: drawResults
            });
        },
        setHashParams = function () {
            document.location.href = "#" + topicParams.topic + "/" + topicParams.filter + "/" + topicParams.pageNum;
        },
        drawResults = function(data) {

            var currentPage, renderedHTML = [], currentEndCount;
            if(data != null) {
                $resultsDisplay.empty();
                
                $(data.results).each(function() {
                    var result = this;

                    if(result.type == "ARTICLE") {
                        renderedHTML.push(drawArticle(result));
                    }
                    else if(result.type == "PHOTOGALLERY") {
                        renderedHTML.push(drawGallery(result));
                    }
                    else if(result.type == "VIDEO" || result.type == "EPISODE") {
                        renderedHTML.push(drawVideo(result));
                    }
                });
                
                $resultsDisplay.append(renderedHTML.join("\n"));
                currentPage = parseInt(data.pageNumber, 10);


                if(isNaN(currentPage)) {
                    currentPage = 1;
                }

                totalResultCount = parseInt(data.totalCount, 10);
                $totalCount.html(totalResultCount);

                var currentResultCount = ((currentPage-1)*10)+1;
                $currentCountStart.html(currentResultCount);
                currentEndCount = currentResultCount+(data.results.length-1);
                if(currentEndCount > totalResultCount) {
                    currentEndCount = totalResultCount;
                }
                $currentCountEnd.html(currentEndCount);

                $paginator = $(drawPaginator(currentPage, data.totalCount));
                
                // we got a response back so the hash params are correct, set it to url
                setHashParams();
                // refresh ads
                SNI.HGTV.DynamicAds.refresh();
                SNI.HGTV.DynamicAds.descr.refreshRate = 1;
                // track pageview
                SNI.Nielsen.trackNSE();
                SNI.HGTV.Omniture.pageViewTrack({
                    Url: trackUrl,
                    UniqueId: currentPageUnqiueId.replace(/(.*?)-([0-9]{1,2})$/, "$1-"+topicParams.pageNum)
                });
            }
            $loadingPanel.fadeOut("normal", function(){
                $resultsDisplay.removeClass("loading");
                
                $resultsDisplay.slideDown("slow", function() {
                    $loadingPanel.find(".elipsis").html("...");
                    $searchContainer.fadeIn("slow");
                    if($paginator) {
                        $paginator.hide();
                        $resultsDisplay.append($paginator);
                        $paginator.find("a").click(getFilterResultsPage);
                        $paginator.fadeIn();
                    }
                });
            });
        },
        drawPaginator = function (currentResultPage, totalCount) {
            var totalPages = Math.floor(totalCount/10), topicParamsUrl, paginationHTML;

            if(totalPages == 0) {
                // no pagination needed
                return "";
            }
            
            topicParamsUrl = "/topics/";
            
            topicParamsUrl += topicParams.topic + "/" + topicParams.filter + "/";

            if((totalCount%10) >= 1) {
                totalPages++;
            }

            paginationHTML = '<div class="pagi">';


            if(currentResultPage == 1) {
                paginationHTML += '<span class="nextprev prev">&laquo; Previous&nbsp;&nbsp;</span>' + '<span class="current">1</span>';
            } else {
                paginationHTML += '<a href="'+topicParamsUrl+'page-'+parseInt(currentResultPage-1, 10)+'.html" class="nextprev prev">&laquo; Previous&nbsp;&nbsp;</a>' +'<a href="'+topicParamsUrl+'page-1.html">1</a>';
            }

            if(currentResultPage == 2) {
                paginationHTML += '<span class="current">2</span>';
            } else {
                paginationHTML += '<a href="'+topicParamsUrl+'page-2.html">2</a>';
            }


            if(totalPages >= 3) {
                if(totalPages > 6 && currentResultPage > 5) {
                    paginationHTML += '<span>...</span>';
                }
                if(currentResultPage <= totalPages-1) {
                    var loopCounter = 0;
                    for(var pageLoop = currentResultPage-2; pageLoop < totalPages-1 && loopCounter < 5; pageLoop++) {
                        loopCounter++;
                        if(pageLoop > 2) {
                            if(currentResultPage != pageLoop) {
                                paginationHTML += '<a href="'+topicParamsUrl+'page-'+pageLoop+'.html">' + pageLoop + '</a>';
                            } else {
                                paginationHTML += '<span class="current">' + pageLoop + '</span>';
                            }
                        }
                    }
                }

                if(currentResultPage < totalPages - 4) {
                    paginationHTML += '<span>...</span>';
                }
                if(totalPages >= 4) {
                    if(currentResultPage != totalPages-1) {
                        paginationHTML += '<a href="'+topicParamsUrl+'page-'+(totalPages-1)+'.html">' + (totalPages-1) + '</a>';
                    } else {
                        paginationHTML += '<span class="current">' + (totalPages-1) + '</span>';
                    }
                }

                if(currentResultPage < totalPages) {
                    paginationHTML += '<a href="'+topicParamsUrl+'page-'+totalPages+'.html">' + totalPages + '</a>';
                } else {
                    paginationHTML += '<span class="current">' + totalPages + '</span>';
                }
            }

            if(currentResultPage < totalPages) {
                paginationHTML += '<a class="next" href="'+topicParamsUrl+'page-'+parseInt(currentResultPage+1, 10)+'.html">Next &raquo;</a>' + '</div>';
            } else {
                paginationHTML += '<span class="nextprev next">Next &raquo;</span>' + '</div>';
            }
            
            return paginationHTML;
        
        },
        drawArticle = function (result) {
            var html = '<div class="topic-result article clrfix">';

            if(result.thumbnail && result.thumbnail != "") {
                html += '<a class="thumb" href="' + result.url + '"><img alt="' + result.title + '" title="' + result.title + '" height="69" width="92" src="' + result.thumbnail + '" /></a>';
            }

            html += '<h3>' + '<a href="' + result.url + '">' + result.title + '</a> ';

            if(result.contentCount && result.contentCount != "") {
                html += '<span class="content-count">(' + result.contentCount + ' Photos)</span>'
            }

            html += '</h3>';

            if(result.description && result.description != "") {
                html += '<p class="description">' + result.description + '</p>';
            }

            html += '</div>';
            return html;
        },
        drawGallery = function (result) {
            var html = '<div class="topic-result gallery clrfix">';

            if(result.thumbnail && result.thumbnail != "") {
                html += '<a class="thumb" href="' + result.url + '"><img alt="' + result.title + '" title="' + result.title + '" height="69" width="92" src="' + result.thumbnail + '" /></a>';
            }

            html += '<h3>' + '<a href="' + result.url + '">' + result.title + '</a> ';

            if(result.contentCount && result.contentCount != "") {
                html += '<span class="content-count">(' + result.contentCount + ' Photos)</span>'
            }

            html += '</h3>';
            
            if(result.description && result.description != "") {
                html += '<p class="description">' + result.description + '</p>';
            }

            html += '</div>';

            return html;
        },
        drawVideo = function (result) {
            var html = '<div class="topic-result video clrfix">'

            if(result.thumbnail && result.thumbnail != "") {
                html += '<a class="thumb" href="' + result.url + '"><img alt="' + result.title + '" title="' + result.title + '" height="69" width="92" src="' + result.thumbnail + '" />'+'<span class="play-button"/></a>'
            }
            html += '<h3>' + '<a href="' + result.url + '">' + result.title + '</a> ';

            if(result.contentCount && result.contentCount != "") {
                html += '<span class="content-count">(video ' + result.contentCount + ')</span>'
            }

            html += '</h3>';

            if(result.description && result.description != "") {
                html += '<p class="description">' + result.description + '</p>';
            }

            html += '</div>';
            return html;
        },
        showMoreResults = function(e){
            var $results = $moreTopicResults.find(".topic-result");
            var moreCount = parseInt($results.length, 10);
            var currentResultCount = parseInt($currentCountEnd.html(), 10);
            $currentCountEnd.html(currentResultCount+ moreCount);

            $moreTopicResults.slideDown();
            $(scrollToSelector).animate({
                scrollTop: $moreTopicResults.offset().top
            }, 750, "swing", function(){
                $results.css({
                    display: "block"
                });
            });
            $seeMoreTrigger.fadeOut("fast");
            $paginator.fadeIn("fast");
            e.preventDefault();
        },
        moveAdBox = function () {
            var swapped = false;
            var $hgE = $("#hg-e");
            var $modules = $hgE.children("div");
            var $mrec = $hgE.find(".mrec");
            var $bigBoxAd = $hgE.find(".bigboxad");
            var resultsTopPos = $topicResultsContainer.find(".topic-results-count").offset().top 
            + $topicResultsContainer.find(".topic-results-count").height();
            var mrecOffset = parseInt($mrec.height(),10)+14;
            var bigBoxAdOffset = $bigBoxAd.height() > 0 ? parseInt($bigBoxAd.height(),10)+14 : 0;

            if($modules.length > 0) {
                $mrec.fadeOut();
                $bigBoxAd.fadeOut();

                $modules.each(function() {
                    var $module = $(this);
               
                    if(($module.offset().top + $module.height()) <= (resultsTopPos + mrecOffset + bigBoxAdOffset)) {
                        if(!$module.hasClass("mrec") && !$module.hasClass("bigboxad") && !$module.hasClass("google-text-ads")) {
                            $module.insertBefore($mrec);
                        }
                    }
                });
                
                $mrec.fadeIn("slow");
                $bigBoxAd.fadeIn("slow");

                moveAdBox = function () {};
            }
        };

        return {
            initialize: function(page) {
                currentPageUnqiueId = mdManager.getParameterString("UniqueId");
                $topicResultsContainer = $(".topic-results");
                $resultsDisplay = $topicResultsContainer.find(".topic-results-display");
                $filterList = $topicResultsContainer.find(".topic-filters .popular-topics ul");

                $totalCount = $topicResultsContainer.find(".topic-results-count .total-count");
                $currentCountStart = $topicResultsContainer.find(".topic-results-count .current-count-start");
                $currentCountEnd = $topicResultsContainer.find(".topic-results-count .current-count-end");

                $paginator = $topicResultsContainer.find(".pagi");
                $seeMoreTrigger = $topicResultsContainer.find(".see-more-results-trigger");
                $moreTopicResults = $resultsDisplay.find(".more-topic-results");
                $searchContainer = $topicResultsContainer.find(".search");
                
                $paginator.fadeOut();
                $moreTopicResults.slideUp();

                SNI.HGTV.DynamicAds.descr.refreshRate = 2;

                $loadingPanel = $('<div class="filter-loading-panel">' +
                    '<span class="loading-msg">Loading Results<span class="elipsis">...</span></span>' +
                    '<span class="loading-img"></span>' +
                    '</div>');

                $loadingPanel.insertAfter(".topic-results-count");

                var $filtersLinks = $filterList.find("li a");
                $filtersLinks.click(function(e){
                    var $link = $(this);

                    if(!$link.parent().parent().hasClass("selected")) {
                        getFilteredResults.apply(this, [e]);
                    }
                    e.preventDefault();
                });


                
                $paginator.find("a").click(getFilterResultsPage);

                $seeMoreTrigger.find("a").click(showMoreResults);

                var hashedState = document.location.href.split("#");
                var hashFilters = [];
                if(hashedState.length >= 2 && hashedState[1] != "") {
                    hashFilters = hashedState[1].split("/");
                    topicParams = {
                        topic: (hashFilters[0] ? hashFilters[0] : "All"),
                        filter: (hashFilters[1] ? hashFilters[1] : "All"),
                        pageNum: (hashFilters[2] ? hashFilters[2] : "1")
                    }
                    $(scrollToSelector).animate({
                        scrollTop: $topicResultsContainer.offset().top
                    }, 750);
                    $filterList.find("li.selected").removeClass("selected");
                    $filtersLinks.each(function(){
                        var $link = $(this);
                        if($link.attr("href").indexOf(topicParams.filter) > 0) {
                            $link.parent().parent().addClass("selected");
                            return false;
                        }
                        return true;
                    });

                    moveAdBox();
                    getFilteredResultsJSON();
                } else {
                    $seeMoreTrigger.fadeIn();
                }
            }
        };
    }();

})(jQuery);



