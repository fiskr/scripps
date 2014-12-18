if (HGTV === "undefined" || !HGTV) {
    var HGTV = {};
}

if (jQuery !== 'undefined') {
//ta da!
    (function ($) {
        $.extend(true, HGTV.M, {
            tabs: {
                init: function () {
                    var nav = $(".nav-tabs");
                    var tabsHTML = $("<div/>", {class:"nav-tabs-container"}).append(nav);
		    $(".tab-content").before(tabsHTML);
                    var  nav_container = $(".nav-tabs-container");
 
		    if ( !navigator.userAgent.toLowerCase().match(/(iphone)/) ){
                        nav.find("[href=#videos]").parent("dd").remove();
                    }

                    $(".nav-tabs a").click(function (event) {
                        event.stopPropagation();
                        var $tab = $(this);
                        HGTV.M.tabs.toggleTab($tab);
                        refreshMobileBannerAd('#ad_wrapper > div', 1);
                    });
                    //trigger click on load
                    HGTV.M.tabs.loadTabs();
                },
                toggleTab: function ($tab) {
                    var hash = $tab.attr("href"),
                        hashTab = '';
                    if (hash) {
                        hashTab = hash + "-tab";
                        hash = hash.replace("#", "");

                    }

                    $('html, body').animate({
                        scrollTop: $tab.parents(".nav-tabs").parent().offset().top
                    }, "medium", function(){
                        $tab.parent().addClass("active").siblings().removeClass("active");
                        $tab.parents(".nav-tabs").parent().siblings(".tab-content").find(hashTab).addClass("active").siblings().removeClass("active");
                        HGTV.M.lazyLoadCallback();
                    });
                },
                loadTabs: function () {
                    var hash = window.location.hash,
                        hashTab = '';
                    if (hash) {
                        hashTab = hash + "-tab";
                    }

                    if (hash) {
                        $('.nav-tabs a[href=' + hash + ']').trigger("click");
                    } 
                }
            }

        });
    })(jQuery);
}
