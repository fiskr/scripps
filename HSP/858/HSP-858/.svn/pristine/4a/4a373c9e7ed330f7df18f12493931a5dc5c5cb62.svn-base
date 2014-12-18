(function($){

    // JS for Site Toolbar: Articles
    if( typeof(SNI.HGTV.ArticleInfo) == "undefined" ) {
        SNI.HGTV.ArticleInfo = {};
    }

    SNI.HGTV.ArticleInfo = {
        moreTags: function() {
            var $tags = $(".article-info .tags");
            var $more_tags = $tags.find(".more-tags");
            var $trigger = $tags.find("div.more");
            var fadeOutTimeout, fadeInTimeout;

            $more_tags.css({
                top: "15px",
                left: "0px"
            });


            $trigger.hover(function(e){
                clearTimeout(fadeOutTimeout);
                $trigger.addClass("on");
                fadeInTimeout = setTimeout(function(){
                    $more_tags.fadeIn("fast");
                }, 100);
            }, function(e){
                clearTimeout(fadeInTimeout);
                $trigger.removeClass("on");
                fadeOutTimeout = setTimeout(function(){
                    $more_tags.fadeOut("fast");
                }, 100);
            });

            $("body").click(function(){
                $more_tags.fadeOut("fast");
            });
        }
    }
})(jQuery);