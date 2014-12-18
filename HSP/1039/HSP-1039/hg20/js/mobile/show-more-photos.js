(function(){
    //dynamic content grid
    HGTV.M.bindViewMoreEventOnGalleries = function() {	
        var $module = $('#dynamic-content-grid-module');
        if ($module.length == 0) return;

        $module.find('button').click(function (e) {
            var $hidden = $module.find('ul.hidden');
            $hidden.eq(0).show(250).removeClass('hidden');		

            if ($hidden.length == 1) {
                $(this).hide(250);
            }
	    HGTV.M.lazyLoadCallback(); //initialte lazyload without scrolling
        });
    };

    $(function(){
	HGTV.M.bindViewMoreEventOnGalleries();
    });
}(jQuery));
