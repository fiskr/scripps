if (typeof SNI === "undefined") { SNI = {}; }

if (typeof SNI.IS === "undefined") { SNI.IS = {}; }

(function () {
    SNI.IS.ST = {};

    SNI.IS.ST.plusone = function (config) {
        var $button = $("<a />", {
            "class" : "sharethis",
            "href" : config.su_url
        })
        .wrapInner(config.label);
        return (function () {
            var $container = $(config.element);
            if ($container.length) {
                $container.append($button);
            }
        })();
    };

    SNI.IS.ST.updateButton = function (config) {
        // after content has loaded
    };
})();