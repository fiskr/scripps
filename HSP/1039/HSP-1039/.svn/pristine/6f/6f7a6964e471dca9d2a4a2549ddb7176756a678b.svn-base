(function(){
    HGTV.M.photosByTopic = function() {
        $content = $('#photos-by-topic-module .super-section .content');
        $tab = $('#photos-by-topic-module .tab h3');
        $content.first().show(); 
        $tab.first().addClass('active');

        $tab.each( function(i){
            $(this).click(function(){
                $content.hide().eq(i).show();
                $tab.removeClass('active').eq(i).addClass('active');
		refreshMobileBannerAd('#ad_wrapper > div', 1);
            });
        });
    }

    $(document).ready(function() {
        HGTV.M.photosByTopic();
    });

}(jQuery));
