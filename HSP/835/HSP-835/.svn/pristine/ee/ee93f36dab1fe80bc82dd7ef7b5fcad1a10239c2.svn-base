/* instantiate object namespace */
if(typeof(SNI.DIY.Omniture)=='undefined') {
	SNI.DIY.Omniture = {};
}

SNI.DIY.Omniture.timeout = null;
SNI.DIY.Omniture.queue = [];

/**
* Omniture click tracking for modules (requires jQuery for DOM selection)
*/

/* this functions submits multiple tracking variables to omniture */
SNI.DIY.Omniture.ClickTrack = function(jsel, module, searchKey) {
	var $el = $(jsel);

	if ($el.length == 0) {return;}

	// set the values on click
	$el.click( function(e) {
		SNI.DIY.Omniture.ClickTrackFire(e.target, module, searchKey);
		e.stopPropagation();
	});
};

/**
 * Omniture click tracking for modules (requires jQuery for DOM selection)
 * This function submits multiple tracking variables to omniture.
 * This does not hook into a click event but directly fires the tracking call
 * to omniture. If you need to hook into the click event use SNI.DIY.Omniture.ClickTrack
 * instead. If the omniture function isn't loaded yet 'false' is returned.
 */
SNI.DIY.Omniture.ClickTrackFire = function(element, module, searchKey) {
	// don't call omniture tracking unless the function is loaded
	// if (typeof s_gi != 'function') {
	// 	return false;
	// }
	
	var originalElement = element;
	var element = $(element);
	var isLink  = element.is("a");

	// exit out if it's site search dropdown
	if (isLink) {
		var formId = element.parents().filter('form').attr("id");
		if (formId == 'hgSearchForm' || formId == 'hgFtSearchForm') {
			return;
		}
	}

	var parentElement = element.parent();
	var isParentLink = parentElement.is("a");
	var isSubmit = element.attr("type") == "submit";
	
	if (isLink || isParentLink || isSubmit) {

		if (isSubmit) {
			site = "DIY: " + element.parents().filter('form').attr("name") + " ";
		} else {
			site = "DIY: " + module + " ";
		}

		// var s = s_gi(s_account);
		var s = {};

		// prep info to track
		s.linkTrackVars = 'prop14,eVar16,prop15,eVar18,prop16,eVar17,prop17,eVar19,prop18,prop19,eVar20,prop20';

		// zone name
		s.prop14 = site;
		s.eVar16 = s.prop14;

		// link title
		var linkText = element.html();
		var thumbnail = false;
		
		if (linkText == '' && element.is("img")) {
			//linkText = element.attr("alt");
			linkText='Photo : '+element.attr("alt");  
			thumbnail = true;
		} 

		s.prop15 = site + linkText;
		s.eVar18 = s.prop15;

		// link rel identifier {position}
		var relid = "relid?";
		var linkUrl = element.attr("href");

		if (isLink) {
			relid = element.attr("rel");
		} else if (isParentLink) { 
			relid = parentElement.attr("rel");
			linkUrl = parentElement.attr("href");
		}
		
		s.prop16 = site + relid;
		s.eVar17 = s.prop16;

		// link url
		s.prop17 = site + linkUrl;
		s.eVar19 = s.prop17;

		// origin url
		s.prop18 = site + mdManager.getParameter("Url");

		// endeca specific
		if (typeof(searchKey) !== 'undefined') {					
			// rule name
			s.prop19 = "endeca: " + mdManager.getParameter( searchKey + "_name", " ");
			s.eVar20 = s.prop19;

			// style name
			s.prop20 = "endeca: " + mdManager.getParameter( searchKey + "_style", " "); 
		}

		//s.tl(originalElement, 'o', 'Link Name');
		s.element = originalElement;
		SNI.DIY.Omniture.ClickTrackTrigger(s);
	}
}

/**
 * Triggers the omniture tracking or adds data to the queue to be executed
 * after the omniture javascript has been loaded. If no 'data' is passed the
 * queue is still processed.
 * 
 * data: object with tracking data or null to process queue
 */
SNI.DIY.Omniture.ClickTrackTrigger = function(data) {
	// add data to the queue if it was passed
	if (typeof data == 'object') {
		SNI.DIY.Omniture.queue.push(data);
	}
	
	// see if the omniture code is loaded
	if (typeof s_gi == 'function') {
		
		// clear the timeout once omniture has been loaded
		if (SNI.DIY.Omniture.timeout !== null) {
			clearTimeout(SNI.DIY.Omniture.timeout);
			SNI.DIY.Omniture.timeout = null;
		}
		
	// omniture code is not loaded so try once every second until we find it
	} else {
		SNI.DIY.Omniture.timeout = setTimeout(function() {
			clearTimeout(SNI.DIY.Omniture.timeout);
			SNI.DIY.Omniture.timeout = null;
			SNI.DIY.Omniture.ClickTrackTrigger();
		}, 1000);
		
		return false;
	}
	
	// alert('queue firing with ' + SNI.DIY.Omniture.queue.length + ' objects');
	
	// pop each element off the queue and process it
	while (SNI.DIY.Omniture.queue.length > 0) {
		var d = SNI.DIY.Omniture.queue.pop();
		var s = s_gi(s_account);
		
		// add data to omniture variable
		$.each(d, function(key, value) {
			if (key != 'element') {
				s[key] = value;
			}
		});
		
		s.tl(d.element, 'o', 'Link Name');
	}
}


/* This function submits a single tracking variable to omniture */
SNI.DIY.Omniture.ClickTrackSingle = function(jsel, module, section) {
  var $el = $(jsel);
	
	if($el.length == 0) {return;}

	/* set the values on click */	
	$el.click( function(e) {

		var $clicked=$(e.target);
		
		if ($clicked.is("a") || $clicked.parent().is("a")) {
			var linkText = $clicked.html();
			if ((linkText == "") && ($clicked.is("img"))) {
				linkText = 'Photo : '+ $clicked.attr("alt");
			}
			
			// var s=s_gi(s_account);	
			var s = {};
	
			/* prep info to track */
			s.linkTrackVars='prop26';
		
			/* zone name */
			s.prop26 = section + ": " + module + ": " + linkText;

			s.element = this;
			SNI.DIY.Omniture.ClickTrackTrigger(s);
			// s.tl(this,'o','Link Name');	
			e.stopPropagation();
		}
	});

};

/* custom DIY function to track the section buckets on the Home Page - it uses the single tracking variable function above */
SNI.DIY.Omniture.TrackHPBuckets = function(buckets) {
	$.each(buckets, function( i, value ){
		SNI.DIY.Omniture.ClickTrackSingle("#"+value[0] +" h3", value[1], "HP"); 
		SNI.DIY.Omniture.ClickTrackSingle("#"+value[0] +" .related-feature", value[1], "HP"); 
		SNI.DIY.Omniture.ClickTrackSingle("#"+value[0] +" .relevant", value[1] + " : All About", "HP");
		SNI.DIY.Omniture.ClickTrackSingle("#"+value[0] +" .related-expert", value[1] + " : Expert", "HP");
	});
};

/* custom DIY function to track panes in a tab module and pass a specific identifier */
SNI.DIY.Omniture.TrackTabs = function( tab, tabModuleName ) {
	$.each(tab, function( i, value ){
		SNI.DIY.Omniture.ClickTrackSingle("#"+value[0], value[1], "HP : " + tabModuleName); 
	});
};

SNI.DIY.Omniture.HotSpotClick = function(oHS, mode) {
	//copied from HGTV
    var s=s_gi(s_account),
    	mdSponsorship = window._pg.mdSponsorship;
    
    s.linkTrackVars = 'eVar46,eVar47,eVar48,events';
    if ((oHS.marketplaceId == "") || (oHS.marketplaceId == "0") || typeof (oHS.marketplaceId) == 'undefined' ) {
        s.eVar46 = "Non-Marketplace";
    } else {
        s.eVar46 = oHS.marketplaceId;
    }
    
    s.eVar47 = mdSponsorship + ':' + oHS.name;
    s.eVar48 = mdSponsorship + ':' + oHS.description;

    if (mode == 'c') {
        s.linkTrackEvents='event47';
        s.events='event47';
        s.tl(this,'o','Hotspot Click');
    } else {
        s.linkTrackEvents='event48';
        s.events='event48';
        s.tl(this,'o','Hotspot Learn More');
    }

   // s.eVar48 = oHS.description; //set to projectFinder for DIY, not capturing description per R DeHart 

    s.linkTrackVars = '';
    s.linkTrackEvents = '';
    s.events = '';
    s.eVar46 = '';
    s.eVar47 = '';
    s.eVar48 = '';	
    return;
};

SNI.DIY.Omniture.setAjaxOmniReferer = function() {
    if (typeof(s) !== 'undefined' && typeof(s.referrer) !== 'undefined') {
        s.referrer = window.location.host + window.location.pathname;
    } else {
        s = window.s || {};
        s.referrer = window.location.host + window.location.pathname;
    }
};