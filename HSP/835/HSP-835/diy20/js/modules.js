/* This file is a place for various module code to live */

$(document).ready(function () {

    SNI.DIY.bindViewMoreEventOnGalleries = function () {

        //dynamic content grid - 'Get Inspired by DIY' $module
        var $module = $("#diy-w .pods.get-inspired, #diy-w .featured");

        if ($module.length) {
            $module.find("a.load-more").click(function (e) {

                e.preventDefault();

                var $this = $(this),
                    $hidden = $module.find(".more-hidden:eq(0)"),
                    t,
                    u,
                    $left_hidden;

                if ($hidden.length) {
                    $hidden.show(250).removeClass("more-hidden");

                    t = setTimeout(function () { $hidden.spinner(); }, 250);
                    u = setTimeout(function () {
                        $hidden.spinner("remove");
                        $hidden.children().show();
                    }, 750);

                    $left_hidden = $module.find(".more-hidden");

                    if ($left_hidden.length === 0) { $this.hide(250); }
                }
            });
        }
    }

    SNI.DIY.bindViewMoreEventOnGalleries();

    SNI.DIY.highlightHubTab = function() {
        var hubs = $('.hub.clrfix .button-nav');

        if (hubs.length <=  0) { return; }

        var hub_links = hubs.find('li a').removeClass('selected');
            page_url = document.location.pathname.replace(/\/(index|page-\d).html/gi, '');

        $.each(hub_links, function(index, key) {
            var hub_url = $(this).attr('href').replace('/index.html', '');
            if (page_url === hub_url) { $(this).addClass('selected'); }
            });
    }

    SNI.DIY.highlightHubTab();

});