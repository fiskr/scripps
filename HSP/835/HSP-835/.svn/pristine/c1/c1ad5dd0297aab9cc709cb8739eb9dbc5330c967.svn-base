if (typeof SNI === 'undefined') { SNI = {} };
if (typeof SNI.IS === 'undefined') { SNI.IS = {} };

(function(){
    SNI.IS.GP = {};

    SNI.IS.GP.plusone = function(config){
        var $button = $("<div />", {
          "class" : "g-plusone",
          "data-size" : (config.size || "small"),
          "data-annotation" : (config.annotation || "none"),
          "callback": "gSP"
        });

        return (function(){
            var $container = $(config.element);
            if ($container.length) {
                $container.append($button);
                return setTimeout(function(){
                    $.getScript("https://apis.google.com/js/plusone.js");
                }, 1000);
            };
        })();
    };

    SNI.IS.GP.updateButton = function(config) {
        if (typeof(googleapis) === 'undefined') {
            return;
        }

        var $iframe = $(config.element).eq(0);

        if ($iframe.is('iframe')) {
            var baseUrl = $iframe.attr('src').split('url=')[0],
                targetUrl = $iframe.attr('src').split('url=')[1].split('&size=')[0],
                miscUrl = $iframe.attr('src').split('url=')[1].split('&size=')[1];

            var newUrl = "url=" + config.url;
            $iframe.attr('src', baseUrl + newUrl + '&size=' + miscUrl);
        }
    }
})();
