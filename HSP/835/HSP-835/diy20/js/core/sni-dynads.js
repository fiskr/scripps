SNI = SNI || {};

SNI.DynamicAds = 
    (function($) {
	var DynamicAds = function() {

	    var d = this;
	    d.bDebug = false;
	    d.rgJSLoaded = false;

	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // ad descriptor parameters with default values:
	    d.descr = {
		active: true,
		refreshRate: 3,
		interstitial: false,
		intFreqCap:  0, 
		globalSession: false,
                toFreqCap: 0,            /* [integer] - The number of Takeover interstitials a user can see per session */
                toSlot: '',              /* [comma separated ints] - This will determine at what "refreshCount" interstitial TO call should be made (assuming they haven't hit the toFreqCap) */
                piSlot: ''
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // interstitial descriptor parameters with default values:
	    d.iparm = {
		iURL: '',
		iFmt: '',
		iHREF: '',
		iHeight: '',
		iWidth: '',
		iTrackURL: '',
		bURL: '',
		embedId:'', //pre-roll adv param
		name:'', //pre-roll adv param
                id: '' // interstitial or interstitialTO for Interstitial Takeover
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // some values to keep track of:
	    // imageViews == current count of images viewed, since last interstitial (initially 1, on page load)  
	    // impTot == interstitials served (in page or session)
	    // refreshTot == number of bigbox refreshes (in page or session)
	    // bRefreshed == flag to block too-rapid refresh of interstitials; cleared on refresh, reset on timeout
	    d.ixState = {
		imgViews: 1,
		impTot: 1,
		refreshTot: 0,
		bRefreshed: true
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // object identifying some elements for interstitial interaction, set in init()
	    d.ixCfg = {
		descriptor: 'PHOTO_DESCRIPTOR',
		param_styles: 'photoGallery',
		container: '.photo-gallery4',
		dismiss_elts: '.photo-gallery4 .pg-navigation .pg-next, .photo-gallery4 .pg-navigation .pg-previous',
		insert_tgt: '.photo-gallery4 .pg-viewport .pg-photo-display-wrapper',
                //different insert tag for better styling
		insert_tgt_to: '.photo-gallery4 .pg-viewport',
                callback: false,
		inter_elt:  null
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // load and set the ad descriptor (on page load):
	    // set config object d.ixCfg from passed config object oDynConfig = { params for descriptor ad call; various DOM specifiers }
	    d.init = function(oDynAdCfg) {
		if (typeof oDynAdCfg != 'undefined') {
		    if ( oDynAdCfg.descriptor != null ) { d.ixCfg.descriptor = oDynAdCfg.descriptor; }
		    if ( oDynAdCfg.param_styles != null ) { d.ixCfg.param_styles = oDynAdCfg.param_styles; }
		    if ( oDynAdCfg.container != null ) { d.ixCfg.container = oDynAdCfg.container; }
		    if ( oDynAdCfg.dismiss_elts != null ) { d.ixCfg.dismiss_elts = oDynAdCfg.dismiss_elts; }
		    if ( oDynAdCfg.insert_tgt != null ) { d.ixCfg.insert_tgt = oDynAdCfg.insert_tgt; }
		    if ( oDynAdCfg.callback != null ) { d.ixCfg.callback = oDynAdCfg.callback; }
		    if ( oDynAdCfg.insert_tgt_to != null ) { d.ixCfg.insert_tgt_to = oDynAdCfg.insert_tgt_to; }
		}

		var myJSON = getDartEnterpriseUrl(d.ixCfg.descriptor, 1) + '&params.styles=' + d.ixCfg.param_styles + '&callback=?';

		if (d.bDebug) {
		    myJSON = '?descriptor=' + d.ixCfg.descriptor + '&param_styles=' + d.ixCfg.param_styles + '&filename=photo_descr.json&callback=?&mime=text/html';
		}

		// global error trap for presumed bad JSONP response: do nothing (allow descriptor defaults) & unhook handler
		window.onerror = function(msg, url, linenumber) {
		    window.onerror = function(msg, url, linenumber) { return false; };
		    return true;
		};
		$.getJSON(myJSON, d.cback_descrJSON);
		return;
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // process the ad descriptor: validate and write to d.descr vector
	    d.cback_descrJSON = function(oJSON) {

		if (typeof oJSON != 'object') {
		    return false;
		}
		if (oJSON.photo_descriptor == undefined) {
		    return false;
		}
		oJSON = oJSON.photo_descriptor;
		if ((oJSON.active == undefined) || (oJSON.active != 'true')){
		    d.descr.active = false;
		    return false;
		}
		d.descr.active = true;
		if (oJSON.refreshRate != undefined) {
		    tmp = parseInt(oJSON.refreshRate);
		    if (! isNaN(tmp) && (tmp > 0 && tmp <= 100)) {
			d.descr.refreshRate = tmp;
		    }
		}
		if (oJSON.interstitial == 'true') {
		    d.descr.interstitial = true;
		}
		
		if (oJSON.intFreqCap != undefined) {
		    tmp = parseInt(oJSON.intFreqCap);
		    if (! isNaN(tmp) && (tmp > 0) ) {
			d.descr.intFreqCap = tmp;
		    }
		}
		
		if ((oJSON.globalSession != undefined) && (oJSON.globalSession == 'yes')) {
		    d.descr.globalSession = true;
		    // read global session impression count and refresh count from cookie:
		    var sCookie = SNI.Util.Cookie.get('dynads');
		    if (sCookie != null) {
			aCookie = sCookie.split(',');
			var nTmpCt = aCookie[0];
			if (nTmpCt != null) {
			    d.ixState.impTot = parseInt(nTmpCt);
			}
			var nTmpCt = aCookie[1];
			if (nTmpCt != null) {
			    d.ixState.refreshTot = parseInt(nTmpCt);
			}
		    }
		}

                if (oJSON.toFreqCap != undefined) { //toFreqCap -> takeoverFreqCap
		    tmp = parseInt(oJSON.toFreqCap);
		    if (! isNaN(tmp) && (tmp > 0) ) {
			d.descr.toFreqCap = tmp;
		    }
		}


                if (oJSON.toSlot != undefined) { //toSlot -> takeoverSlot
		    var slots = oJSON.toSlot.split(',');
                    //ensure slots is a comma delimited array of integers
                    for(var i=0; i<slots.length; i++) {      
                        if (isNaN( parseInt(slots[i]) )) {
                            slots = new Array();
                            break;
                        }
                        slots[i] = parseInt(slots[i]);
                    }
		    d.descr.toSlot = slots;
		}

                if (oJSON.piSlot != undefined) { //piSlot -> interstitial ads slot
		    var slots = oJSON.piSlot.split(',');
                    //ensure slots is a comma delimited array of integers
                    for(var i=0; i<slots.length; i++) {      
                        if (isNaN( parseInt(slots[i]) )) {
                            slots = new Array();
                            break;
                        }
                        slots[i] = parseInt(slots[i]);
                    }
		    d.descr.piSlot = slots;
		}

		// reset global error handler 			
		window.onerror = function(msg, url, linenumber) { return false; };
		return true;
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // ad refresh: called for each image navigation event
	    d.refresh = function() {
		retval = false;
		if (!d.descr.active) {
		    return retval;
		}

                /**
                 * Start MM-2652: Send unique ORD param for each bigbox refresh
                 * This uses the same method of generating the parameter as initAdManager()
                 * adManager should have been created by initAdManager() in sni-ads-core.js
                 */
                if (adManager) {
                    var now = new Date(),
               	    ad_ord = now.getTime() % 10000000000;

           	    adManager.setParameter('ord', ad_ord);
                }
                // end MM-2652

		// delete interstitial (if any), then increment impression count
		if (d.ixCfg.inter_elt !== null) {
		    $(d.ixCfg.inter_elt).remove();
		    d.ixCfg.inter_elt = null;
		}               

        if (d.ixState.imgViews >= d.descr.refreshRate) {
            d.ixState.imgViews = 1;
            d.ixState.refreshTot++;
            d.saveSessState();
                        
            var takeover_is_on = (d.descr.toSlot.length > 0 && d.descr.toFreqCap > 0);
                var ad_type = (d.descr.interstitial && d.ixState.impTot < d.descr.intFreqCap) ? 'PHOTO_INTERSTITIAL' : '';
                        
                    if (ad_type != '' && d.descr.piSlot && d.descr.piSlot.length > 0) {                      
                        ad_type = '';

                        for(var i = 0; i < d.descr.piSlot.length; i++) {
                            if (d.ixState.impTot == d.descr.piSlot[i]) {
                                ad_type = 'PHOTO_INTERSTITIAL';
                                break;
                            }
                        }
                    }

		    for (var i=0; i<d.descr.toSlot.length && takeover_is_on; i++) {
                        if (d.ixState.refreshTot == d.descr.toSlot[i] && takeover_is_on) {
                        ad_type = 'PHOTO_INTERSTITIAL_TO';
                        d.descr.toFreqCap--;
                        break;
                    }
                }
              
		    if (ad_type === '') {
			setDartEnterpriseBanner('BIGBOX', getDartEnterpriseUrl('BIGBOX',5));		    
		    } 

		    if (ad_type === '' && (!d.descr.interstitial || takeover_is_on) ) {
            d.ixState.impTot++;
            return;
        }

		    if (ad_type !== '') {
                        /* Special case where we have to increment manually. Intersitital is off. Takeover is on but if it's not the slot where it should
                         * appear, since the ad server returns blank page we never increment.
                         */
        var myJSON = getDartEnterpriseUrl(ad_type, 1) + '&params.styles=photoGallery&refreshCount=' + (d.ixState.refreshTot) + '&callback=?';

        if (d.bDebug) {
			    var flagParam = ''; 
			    //	if (d.ixState.refreshTot % 2 != 0) flagParam = '&flag=1';  // interstitial refresh only every other refresh, to test separately accumulating

			    myJSON = '?refreshCount=' + (d.ixState.refreshTot) + flagParam + '&filename=inter_descr.json&callback=?&mime=text/html';
        }

                    // use global error handler to trap (assumed) invalid Istl Descriptor & refresh BigBox
        window.onerror = function(msg, url, linenumber) {
            setDartEnterpriseBanner('BIGBOX', getDartEnterpriseUrl('BIGBOX', 5));
            window.onerror = function(msg, url, linenumber) { return false; };
            return true;
        };
        $.getJSON(myJSON, d.cback_interJSON);
        retval = true;
        }
		} else {
		    // no refresh at all, just count image:
		    d.ixState.imgViews++;
		}
		return retval;
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // write global session impression count and refresh count to cookie if global session in effect;
	    d.saveSessState = function() {
		if (d.descr.globalSession) {
		    var sCookie = d.ixState.impTot + ',' + d.ixState.refreshTot;
		    SNI.Util.Cookie.set('dynads', sCookie);
		}
		return;	
	    }
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    d.cback_interJSON = function(oJSON) {		
		// reset interstitial parameters:
		$.each(d.iparm, function(key, val) {
		    d.iparm[key] = '';
		});
		if (typeof oJSON != 'object' || typeof oJSON.scrippsads != 'object' || typeof oJSON.scrippsads.ad != 'object') {
		    return false;
		}

		for ( i = 0; i < oJSON.scrippsads.ad.length; ++i) {
		    if (typeof oJSON.scrippsads.ad[i].position != 'object') {
			return false;
		    }

		    with (oJSON.scrippsads.ad[i].position) {
			if ((d.iparm.iURL == '') && (id == 'interstitial' || id == 'interstitialTO')) {
                            d.iparm.id = id;
			    d.iparm.iURL = media.src;
			    d.iparm.iFmt = media.format;
			    d.iparm.iHREF = media.href;
			    d.iparm.iHeight = media.height;
			    d.iparm.iWidth = media.width;
			    if (typeof media.tracking.audit == 'object') {
				d.iparm.iTrackURL = media.tracking.audit.src;
			    }
			} else if (id == 'interstitialPR') {
                            d.iparm.id = id;
			    d.iparm.iURL = '';
			    d.iparm.iFmt = '';
			    d.iparm.iHREF = '';
			    d.iparm.iHeight = media.height;
			    d.iparm.iWidth = media.width;
			    d.iparm.embedId = $.trim(media.embedId);
			    d.iparm.name = $.trim(media.name);
			    if (typeof media.tracking.audit == 'object') {
				d.iparm.iTrackURL = media.tracking.audit.src;
			}
			}

			if ((d.iparm.bURL == '') && (id == '300syncBanner')) {
			    d.iparm.bURL = media.src;
			}
		    }
		}
		// insert interstitial if (1) refresh timeout has expired, (2) still under cap, 
		//    and (3) key parameters are set:
		if ( d.ixState.bRefreshed ) {
	 	    // timeout mechanism to block stacking interstitial calls
		    d.ixState.bRefreshed = false;
		    setTimeout(function(){ d.ixState.bRefreshed = true; }, 5000);
		    d.ixState.impTot++;
		    
		    if (d.iparm.id == 'interstitialPR') {
		    	d.disableNextPrevButtons();
			d.gen_preroll();
		    } else if ((d.iparm.iURL != '') && (d.iparm.iFmt != '')) {
		    d.gen_interstitial();
		}
		}
		// refresh bigbox with URL from descriptor if available...
		if (d.iparm.bURL != '') {
		    setDartEnterpriseBanner('BIGBOX', d.iparm.bURL);
		} else if (d.iparm.id != 'interstitialPR') {
		    // else, unless a pre-roll ad, default call:
		    setDartEnterpriseBanner('BIGBOX',getDartEnterpriseUrl('BIGBOX', 5));
		}
		// reset global error handler 			
		window.onerror = function(msg, url, linenumber) { return false; };
		d.saveSessState();
		return;
	    };

	    d.gen_preroll = function() {
		$('#bigbox').parent().append('<div id="adaptvcompanion"></div>'); //palyer needs a div with id "adaptvcompanion" in order to refresh the ad
		$('#bigbox').remove();

		window.playerReady = function(playerObject) {
		    var player = document.getElementById(d.iparm.embedId);
		    if (!player || !player.jwAddEventListener) {
			player = document.getElementById("rg_player_" + d.iparm.embedId);
		    }
		    if (player && player.jwAddEventListener) {
			player.jwAddEventListener('adCompleted', 'SNI.DynamicAds.removePlayer()');
		    	player.jwAddEventListener('adPresent', 'SNI.DynamicAds.enableNextPrevButtons()');
		    }
		};

		var player = '<object id="rg_player_' + d.iparm.embedId + '" name="' + d.iparm.name + '" type="application/x-shockwave-flash"' +
		    'width="' + d.iparm.iWidth + '" height="' + d.iparm.iHeight + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="visibility: visible;">' +
		    '<param name="movie" value="http://anomaly.realgravity.com/flash/player.swf"></param>' +
		    '<param name="allowScriptAccess" value="always"></param>' +
		    '<param name="allowNetworking" value="all"></param>' +
		    '<param name="menu" value="false"></param>' +
		    '<param name="wmode" value="transparent"></param>' +
		    '<param name="allowFullScreen" value="true"></param>' +
		    '<param name="flashvars" value="config=http://mediacast.realgravity.com/vs/2/players/24355d48-cda7-43e4-aabc-76e402764bea.xml"></param>' +
		    '<!--[if !IE]>-->' +
		    '<embed id="' + d.iparm.embedId + '" name="' + d.iparm.name + '" width="' + d.iparm.iWidth + '" height="' + d.iparm.iHeight + '"' +
		    'allowNetworking="all" allowScriptAccess="always" allowFullScreen="true" wmode="transparent"' +
		    'flashvars="config=http://mediacast.realgravity.com/vs/2/players/24355d48-cda7-43e4-aabc-76e402764bea.xml"' +
		    'src="http://anomaly.realgravity.com/flash/player.swf"></embed>' +
		    '<!--<![endif]-->' +
		    '</object>';
	    
		d.ixCfg.inter_elt = $('<div class="interwrap">' + player + '</div>').appendTo(d.ixCfg.insert_tgt);
		$(d.ixCfg.container).addClass('interstitial-show');
		d.ixCfg.inter_elt.append('<img style="display:none;" src="' + d.iparm.iTrackURL + '" />');	
	    
		if (!d.rgJSLoaded) {
		    $.getScript('http://anomaly.realgravity.com/javascripts/ads/rg_companion_ad.min.js', function(){
			d.rgJSLoaded = true;
		    });
		}
	    };

	    //disable next/prev buttons while pre-roll is loading
	    d.disableNextPrevButtons = function() {
		$(d.ixCfg.dismiss_elts).each(function(i, elt) { 
                   $(elt).data('block', 'yes').addClass('pg-disabled');
                });
	    };

	    //enable buttons after pre-roll starts
	    d.enableNextPrevButtons = function() {
	    	$(d.ixCfg.dismiss_elts).each(function(i, elt) { 
	        	$(elt).removeClass('pg-disabled').click(d.removePlayer); 
                });
	    };
	    
	    d.removePlayer = function(e) {
		if (e) e.stopImmediatePropagation();
		$(d.ixCfg.dismiss_elts).each(function(i, elt) { 
                    $(elt).unbind('click', d.removePlayer).data('block', 'no'); 
                });
		$(d.ixCfg.container).removeClass('interstitial-show');
		d.ixCfg.inter_elt.remove();
		d.resetBigBoxId();
		return false;
	    };

	    d.resetBigBoxId = function() {
		$('#adaptvcompanion').attr('id', 'bigbox');
	    };	   
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // marks up interstitial data in HTML
	    d.fmt_interstitial = function() {
		var hRet = '';
                var wrapperClass = 'interwrap';
                
                if (d.iparm.id == 'interstitialTO') {
                    wrapperClass += ' takeover';
                }
                
		hRet += '<div class="' + wrapperClass + '">';
		hRet += '<a href="#" class="close"><span>Skip Advertisement</span></a>';
		hRet += '<div class="inter-container">';

		if (d.iparm.iFmt.toLowerCase() == "swf") {
		    hRet += '<div id="interad">'
			+ '<a class="no-flash-message" href="http://www.adobe.com/go/getflashplayer">'
			+ '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />'
			+ '</a>'
			+ '</div>';
		} else {
		    if (d.iparm.iHREF != "") {
			hRet += '<a href="' + d.iparm.iHREF + '">';
		    }
		    hRet += '<img src ="' + d.iparm.iURL + '" />';
		    if (d.iparm.iHREF != "") {
			hRet += '</a>';
		    }
		}
		hRet += '<iframe class="tracker" width="0" height="0" frameborder="0"></iframe>';
		hRet += '</div>';
		hRet += '</div>';
		return hRet;
	    };
	    
	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // calls fn to format interstitial then inserts into page
	    d.gen_interstitial = function() {
		var hRet = d.fmt_interstitial();
                //console.log('hRet: ' + hRet);
                var appendElement = (d.iparm.id == 'interstitialTO') ? d.ixCfg.insert_tgt_to : d.ixCfg.insert_tgt;

		d.ixCfg.inter_elt = $(hRet).appendTo(appendElement);

		// dismiss handler (intercepts next/prev etc)
		var dismiss_fn = function(e) {
		    e.stopImmediatePropagation();
		    $(d.ixCfg.dismiss_elts).each(function(i, elt) { 
                        $(elt).unbind('click', dismiss_fn).data('block', 'no'); 
                    });
		    $(d.ixCfg.container).removeClass('interstitial-show').removeClass('takeover');
		    $(d.ixCfg.inter_elt).remove()
		    return false;
		};
		$(d.ixCfg.inter_elt).find('.close').click(dismiss_fn);
		// block default ix for dismiss elements (action already done bfr istl shown)
		// and attach istl dismiss handler
		$(d.ixCfg.dismiss_elts).each(function(i, elt) { 
                    $(elt).data('block', 'yes').click(dismiss_fn); 
                });
		if (d.iparm.iFmt.toLowerCase() == 'swf') {
		    swfobject.embedSWF(d.iparm.iURL, 
                                       'interad', 
                                       d.iparm.iWidth, 
                                       d.iparm.iHeight, 
                                       '9',
                                       'http://common.scrippsnetworks.com/common/flash-express-install/expressInstall.swf', 
                                       null, 
				       {
                                           wmode: 'transparent', 
                                           allowScriptAccess: 'always', 
                                           quality: 'high'
                                       });
		}
		$(d.ixCfg.container).addClass('interstitial-show');
                if (d.iparm.id == 'interstitialTO') {
                    $(d.ixCfg.container).addClass('takeover');		    
                }
                
                if ( d.isFunction(d.ixCfg.callback) ) {
                    d.ixCfg.callback();
                }
                
		$(d.ixCfg.inter_elt).find('.tracker').attr('src', d.iparm.iTrackURL);
		$(d.ixCfg.container).removeClass('loading');
                return;
	    };

	    //  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  
	    // reset the impression count (if global session is NOT in place)
	    // this is used in DP when filter is changed (action equivalent to loading a new photo gallery)
	    // --no action taken when global session is in effect
	    d.reset_cap = function() {
		if (!d.descr.globalSession) {
		    d.ixState.imgViews = 1;
		    d.ixState.impTot = 0;
		    d.ixState.refreshTot = 0;
		}
		return;	
	    };
            
            d.isFunction = function (functionToCheck) {
                var getType = {};    
                return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
            };
	};

	return new DynamicAds();
	
    })(jQuery);


/*      TAKEOVER AD [ PHOTO_INTERSTITIAL_TO ]
 * 
 *      Ad call:
 *      http://adsremote.scrippsnetworks.com/html.ng/ADTYPE=PHOTO_INTERSTITIAL_TO&
 *                                                      PAGEPOS=1&
 *                                                      refreshCount=VALUE&callback=VALUE&OtherMdManagerValues
 *
 *      Served XML Descriptor:
 *              ValueOfThe"Callback"InTheAdCall({
                                photo_descriptor:{
                                                active: "true", 
                                                refreshRate: "2", 
                                                interstitial: "true", 
                                                intFreqCap:  "1", 
                                                globalSession: "yes", 
                                                toFreqCap: "1", 
                                                piSlot: "1,5,7",
                                                toSlot: "3,10" 
                                                } 
                                              });
 *
        Value Represenatation:
        @Active: True of False - Basically is this functionality on.
        @refreshRate: An Integer - This determines when the ads refresh and when a call for an interstitial should be made.
        @interstitial: True or False - This is just a switch for whether or not this gallery should have an interstitial.
        @intFreqCap: An Integer - This is the number of interstitials a user can see per session.
                        SHOULD ONLY increase the freqcap numbers on the unit if an actual JSON photo interstitial piece 
                        is returned from the call.
        @globalSession: yes or no - This determines whether the rules apply across the whole site or just the area the user is currently in.

        @NEW - piSlot: Mulitple Integers separated by commas:  This will determine at what "refreshCount" intersital ads will be served
        @NEW - toFreqCap: An Integer: This is the number of Takeover interstitials a user can see per session.
        @NEW - toSlot: Mulitple Integers separated by commas:  This will determine at what "refreshCount" that the interstitialTO call should be made 
*/

/*
Currently the photo gallery here isn't calling for the photo interstitial ads, so I can't target anything to them.
http://www.dev-hgtv.com/decorating/conservatory-sunrooms/pictures/index.html

This is a link to a production photo gallery that is calling for the photo interstitial ad after the second click of "next room"
http://www.hgtv.com/designers-portfolio/room/traditional/kitchens/1912/index.html#/id-1890/room-kitchens/style-traditional

The Photo Descriptor XML to what I've outlined above, and I'm now serving in creative against the adtype "PHOTO_INTERSTITIAL_TO"

var RETURNED_Photo_Descriptor =1
{ scrippsads:
  {
      ad: [
          {param: 
           {name: "syncID", value: "9999"},
           position: {id: "interstitialTO",
                      media: { 
                          src: "http://adimages.scrippsnetworks.com/hgtv/TAKEOVERPI.jpg", 
                          format: "jpg", 
                          href: "http://google.com", 
                          height: "617", 
                          width: "987",
                          tracking: { 
                              audit: { 
                                  src: "http://adimages.scrippsnetworks.com/1x1.jpg", 
                                  position: "0"
                              }
                          }
                      }             
                     }
          },
          {
              position: {id:"300syncBanner",
                         media: {src: "http://adsremote.scrippsnetworks.com/html.ng/adtype=BIGBOX&Pagepos=5&site=HGTV&category=SYNC&syncid=HG38305160", 
                                 format: "jpg", 
                                 href: "" 
                                }
                        }
          }  
      ]  
  }
};
*/
