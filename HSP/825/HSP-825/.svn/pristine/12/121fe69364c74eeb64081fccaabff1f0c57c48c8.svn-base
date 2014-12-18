/* site level omniture file
 * set up alias for backwards compatability
 * multi-var and single-var methods are  part of sni-core
 *
 * add custom site level omniture tracking methods in this file as seen below
 *                                                        *
 */

if(typeof(SNI.HGTV.Omniture)=='undefined') {
    SNI.HGTV.Omniture = {};
}

// overriding core method for link text:
SNI.Omniture.getLinkText = function($elt) {
    var linkText = "";
    linkText = $.trim($elt.closest("a").text());
    //adding text to differentiate image click
    if (linkText == '' && $elt.is("img")) {
        linkText = 'Photo : ' + $elt.attr("alt");
    } 
    
    else if ($elt.closest("#hg-sitenav .subnav").length > 0) {
        // in one of the sub navs
        $thislink = $elt.closest("a");
        
        if ($thislink.is("#hg-sitenav .subnav li.nav > a") ) {
            // link is one of the sub nav drop downs but not the flyout
            linkText = $elt.closest("#hg-sitenav .topnav > li").children("a").text() + '-' + linkText;
        }

        else if ($thislink.is("#hg-sitenav .subnav li.nav .dd20 a") ) {
            // link is one in the flyout
            linkText = $elt.closest("#hg-sitenav .topnav > li").children("a").text() + '-' + $elt.closest("#hg-sitenav .topnav .subnav li.nav").children("a").text() + '-' + linkText;
        }
        
    }

    else if ($elt.closest("#main-subnav").length > 0) {
        // in one of the sub navs
        $thislink = $elt.closest("a");
        $parentLink = $('.topnav li.savesel.sel > a').text(); //Find parent link tab for subnav

        if ($thislink.is("#main-subnav > ul > li > a") ) {
            // link is one of the sub nav drop downs but not the flyout
            linkText = $parentLink + '-' + linkText;
        }

        else if ($thislink.is("#main-subnav li .hg-site-subnav-dropdown a") ) {
            // link is one of the sub nav drop downs but not the flyout
            linkText = $parentLink + '-' + $elt.closest("#main-subnav > ul > li").children("a").text() + '-' + linkText;
        }
        
    } 

    else if ($elt.closest("#hd-social").length > 0) {
        linkText = "gh_right_social";
    }


    return linkText;
}

SNI.HGTV.Omniture.ClickTrack  = SNI.Omniture.MultiVar;

/*
 * @method mobileClickTrack  
 * this functions submits multiple tracking variables to omniture
 *
 */
SNI.HGTV.Omniture.mobileClickTrack = function(jsel, module, searchKey) {
    var $el = $(jsel);

    if($el.length == 0 || $el.data('events.click.omniture')) {
        return;
    }    
    // set the values on click
    $el.on('click.omniture', "a", function(e){
        SNI.Omniture.ClickTrackFire($(this), module, searchKey);
        e.stopPropagation();
    });
};

SNI.HGTV.Omniture.ClickTrackSingle  = SNI.Omniture.SingleVar;

SNI.HGTV.Omniture.ClickTrackSingleCustom = function(jsel, module, propVal, trackEvent) {
    var $el = $(jsel);
    if($el.length == 0 || $el.data('events.click.omniture')) {
        return;
    }
	
    $el.bind('click.omniture', function(e){
        
        var $clicked=$(e.target);
        var s=s_gi(s_account);	
        s.linkTrackVars=propVal;

        if (trackEvent != "") {
            s.linkTrackEvents = trackEvent;
        } else {
            s.linkTrackEvents = "None";
        }

        s[propVal] = module;
    
        s.tl(this,'o',propVal);	
        e.stopPropagation();

			
    });

};


SNI.HGTV.Omniture.HotSpotClick = function(oHS, mode) {
    var s = s_gi('scrippshgtvnew,scrippshomeglobal'),
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
	
    s.linkTrackVars = '';
    s.linkTrackEvents = '';
    s.events = '';
    s.eVar46 = '';
    s.eVar47 = '';
    s.eVar48 = '';
    return;
};

SNI.HGTV.Omniture.pageViewTrack = function (omnitureParams) {

    jQuery.each(omnitureParams, function(key, value){
        mdManager.setParameter(key, value);
    });
    
    if (typeof s == "object") {
        s.t();
    }
    return;
};

/*
 * function to set s.referer to the current url for displaying new photo via ajax
 */

SNI.HGTV.Omniture.setAjaxOmniReferer = function() {
	if (typeof (s) !== 'undefined' && ( typeof(s.referrer) === 'undefined' || s.referrer !== window.location.host + window.location.pathname )) {
    s.referrer = window.location.host + window.location.pathname;
	}	
	return;
};


SNI.HGTV.Omniture.OutbrainClickTrack = function (jsel, module, searchKey) {
    var $el = $(jsel);
    if ($el.length == 0 || $el.data('events.click.omniture')) {
        return;
    }
    $el.bind('click.omniture', function (e) {
        var site = module,
            originalElement = e.target,
            element = $(e.target),
            isLink = element.is('a');
        this.getLinkText = SNI.Omniture.getLinkText;
        var parentElement = element.parents('a'),
            isParentLink = parentElement.is('a');
        if (isLink || isParentLink) {
            var s = {}, linkText = this.getLinkText(element),
                pos = parentElement.index() + 1,
                relid = 'relid?',
                linkUrl = element.attr('href');
            s.linkTrackVars = SNI.Config.omnitureMultiVariable;
            s.prop14 = site;
            s.eVar16 = s.prop14;
            s.prop15 = site + ' : ' + linkText;
            s.eVar18 = s.prop15;
            if (isLink) {
                relid = element.attr('rel');
            }
            else if (isParentLink) {
                relid = parentElement.attr('rel');
                linkUrl = parentElement.attr('href');
            }
            s.prop16 = site + ': ' + pos;
            s.eVar17 = s.prop16;
            s.prop17 = site + ': ' + linkUrl;
            s.eVar19 = s.prop17;
            s.prop18 = site + ' : ' + mdManager.getParameter('Url');
            if (typeof searchKey !== 'undefined') {
                s.prop19 = 'endeca: ' + mdManager.getParameter(searchKey + '_name', ' ');
                s.eVar20 = s.prop19;
                s.prop20 = 'endeca: ' + mdManager.getParameter(searchKey + '_style', ' ');
            }
            s.element = originalElement;
            SNI.Omniture.ClickTrackTrigger(s);
        }
        e.stopPropagation();
    });
};
