/**
 *	Core Functions for Nielsen Digital Ratings Content Tracking
 *
 *	This namespace implements beacons for use in tracking both individual page views
 *	and dynamically loaded content.  AJAX Photogalleries, in particular, should use
 *  the trackNSE() function to record page views for dynamically loaded photos.
 *
 *	SNI.Nielsen.trackPageView(): to be included in the site footer for onLoad page tracking
 *	SNI.Nielsen.trackNSE(): to be used by ajax content-loading triggers, for dynamic content tracking
 */

(function($) {

	// load time leg work
	var hitCountQueue = [];

	// ensure that SNI.Config.Nielsen exists, and has at least a default value for the customer identifier param
	SNI.Config = $.extend(true, {}, {
		Nielsen: {
			
			//Get value from the site config
			ci: SNI.Config.Nielsen.ci,
			autoTrackPages: SNI.Config.Nielsen.autoTrackPages,
			useIframeTracking: SNI.Config.Nielsen.useIframeTracking,
			hitCountIframeContainer: SNI.Config.Nielsen.hitCountIframeContainer,
			hitCountHtmlUrl: SNI.Config.Nielsen.hitCountHtmlUrl
		}
	}, SNI.Config);

	var config = SNI.Config.Nielsen;
	config.element = $("<div id=\"" + config.hitCountIframeContainer + "\" style=\"display: none;\"></div>");

	// add the Nielsen namespace to the SNI namespace
	$.extend(true, SNI, {
		Nielsen: {
			hitCount: function() {
				
				hitCountQueue.push(true);
			},
			trackPageView: function() {
				return false;
				var d = new Image(1, 1);
				d.onerror = d.onload = function () {
					d.onerror = d.onload = null;
				};
				d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=", SNI.Config.Nielsen.ci, "&cg=0&cc=1&si=", escape(window.location.href), "&rp=",
				escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
			},
			trackNSE: function() {
				if(config.useIframeTracking) {
					SNI.Nielsen.hitCount();
				}
				var d = new Image(1, 1);
				d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=", SNI.Config.Nielsen.ci, "&cg=0&cc=1&si=",
				escape(window.location.href), "&rp=", escape(document.referrer),
				"&c0=usergen,1&rnd=", (new Date()).getTime()].join('');
			}
		}
	});
	
	$(document).ready(function(){
		$(document.body).append(config.element);
		// make a page-level tracking call for Nielsen if autoTrackPages is set to true
		if(config.autoTrackPages) {
			SNI.Nielsen.trackPageView();
		}
		// redefining the function to process queues without ready check
		SNI.Nielsen.hitCount = function() {
			var cacheBuster = new Date();
			// append iframe to â€œelementâ€� with dummy page as src
			$(config.element).append('<iframe class="hitCounter" src="' + config.hitCountHtmlUrl + "?t=" + cacheBuster.getTime()+'" width="0" height="0" frameborder="0" style="height:0; width:0; display:none;"></iframe>');
			return;
		};

		// process the hitCountQueue array by calling hitCount for each item in queue
		$.each(hitCountQueue, function(){
			SNI.Nielsen.hitCount();
		});
	});
})(jQuery);
