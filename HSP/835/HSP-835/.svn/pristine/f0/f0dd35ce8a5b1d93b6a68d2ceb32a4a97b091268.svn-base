if (typeof SNI === 'undefined') { SNI = {}; }
if (typeof SNI.IS === 'undefined') { SNI.IS = {}; }

/**
 * @author <a href="mailto:mheisig@scrippsnetworks.com">Matt Heisig</a>
 * @namespace Defines functions to load StumbleUpon library and create Stumble buttons
 */
SNI.IS.Stumble = {
    createButton: function(options) {
        var config = $.extend({
            element: $(options.element),
            layout: options.layout || '4',
            url: options.url || SNI.Config.domain + mdManager.getParameterString('URL')
        }, options);

        $(config.element).children().attr('layout', config.layout)
                                    .attr('location', config.url);

        SNI.IS.Stumble.load();
    },

    /**
     * @Description: Load the StumbleUpon library asynchronously
     */
    load: function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//platform.stumbleupon.com/1/widgets.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
            }
};