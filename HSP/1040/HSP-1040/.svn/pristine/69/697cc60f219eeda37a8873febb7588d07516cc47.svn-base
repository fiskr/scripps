/**
 * hgtv-ads.js
 *
 * requires core ads functionality from js/sni-core/ads-core.js
 * requires mdManager (uses mdManager within functions, but not during load)
 */

function HgtvAd(adtype, adsize, pos, keywords) {
    // Needs to run as soon as possible but not before mdManager values are built.
    // wrapped in a check for the safeframe object since Mobile HGTV does not contain Safeframe 
    // but still contains this ad library.
    if (SNI.Ads.SafeFrame) {
    SNI.Ads.SafeFrame.init();
    }

	if(pos < 0 || pos == undefined) {pos = 1;}
	if(keywords == undefined) { keywords = ""; }

    var ad = new DartAd(),
    delFormat = mdManager.getParameter('DelvFrmt');

    if (adtype == 'BIGBOX' && (delFormat == 'ARTICLE_BUILDER_PHOTOGALLERY' || delFormat == 'PORTFOLIO_DETAIL')) {
        if( SNI.Ads.SafeFrame.isActive() ){
            SNI.Ads.SafeFrame.renderAdsRemoteUrl(getDartEnterpriseUrl('BIGBOX',5));
        } else {
	setDartEnterpriseBanner('BIGBOX', getDartEnterpriseUrl('BIGBOX',5));
        }
	return false;
    }

    ad.setUrl('http://' + SNI.Ads._adServerHostname + '/js.ng/');

	if (adtype== 'BIGBOX' && pos == 5) {
		ad.addParameter("adtype", 'BIGBOX');
	} else {
		ad.addParameter("adtype", adtype );
	}

	if (adtype== 'LEADERBOARD') {
		ad.addParameter("Params.styles", "SNI_LEADERBOARD"); //tells ad server to wrap with div.ad-ldr
    }

	ad.addParameter("adsize", adsize);
    ad.addParameter("PagePos", pos);
	ad.useFeature("tile");

	if( keywords != "" ) {
		var words = keywords.split(" ");
		for(i=0; i < words.length; i++) {
			ad.addParameter("keyword", words[i]);
		}
	}

	// filter out certain cases of when to write an ad and when not to
	switch(adtype) {
		default:
			writeAd(ad);
			break;
	}
}


function writeAd(ad){
	if (typeof adRestrictionManager != 'undefined') {
		ad.useIframe = adRestrictionManager.isIframe(ad, mdManager);
        if( adRestrictionManager.isActive(ad, mdManager) != false ) {
			adManager.createAd(ad);
		}
	} else {
		adManager.createAd(ad);
    }
}

function MobileBannerAd(pos) {
    if(pos < 0 || pos == undefined || pos=='') {pos = 1;}
    HgtvAd('MOBILE_BANNER', '',  pos);
}

function getUpdatedORD(url) {
    if(url.indexOf("ORD=")!== -1) {
        var part1 = url.substring(0,url.indexOf("ORD="));
        var part2 = url.substring(url.indexOf("ORD="), url.length);
        part2 = part2.substring(part2.indexOf("&")+1, part2.length);
        url = part1 + part2;
    }
    url += "&ORD=" + Math.floor(Math.random()*10000000000);

    return url;
}

function refreshMobileBannerAd(containerSelector, position) { //refreshMobileBannerAd('#ad_wrapper > div', 1);
    if (!containerSelector) return;
    var pos = +position,
    container = $(containerSelector),
    url = getUpdatedORD( getDartEnterpriseUrl('MOBILE_BANNER', 1) );


    if(! /^\d+$/.test(pos)) pos = 1;

    return $(containerSelector).html('<iframe src="' + url + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
}

/*
 *  adUrl - optional parameter, only passed in if ad url is already requested
 */
function MobileInterstitialAd(pos) {

    if (SNI.Ads.INTERSTITIALS_AVAILABLE === false) return false;

    var initialStyles = '';
    if ( typeof(SNI.Ads.INTERSTITIALS_AVAILABLE) === 'undefined' ) {
    initialStyles = ' display:none; ';
	}

    var $overlay = $('aside#overlay'),
    width = $(window).width(),
    height = $(window).height(),
    styles = ' style="' + initialStyles  +  ' width: ' + width + 'px; height:' + height + 'px;" ',
    orientation = '&orientation=' + ((window.orientation === 0) ? 'portrait' : 'landscape'),
    url = getUpdatedORD( getDartEnterpriseUrl('MOBILE_INTERSTITIAL', pos) );

    $overlay.prepend("<div " + styles + " class=\"overlay-ad\"><a class='icon-remove-sign' onclick=\" HGTV.M.overlay.removeInterstitial(); \" href='javascript:;'></a><iframe src='" + url  + '&params.styles=SNI_MOBILE_INTERSTITIAL' + orientation  + "\' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' class='interstitial'></iframe></div>");

    if (SNI.Ads.INTERSTITIALS_AVAILABLE !== true) {
	var adHtml = $('.overlay-ad').html();
	SNI.Ads.INTERSTITIALS_AVAILABLE = (adHtml.indexOf('ADS_NOT_AVAILABLE') !== -1) ? false : true;
 }

    if ( SNI.Ads.INTERSTITIALS_AVAILABLE ) {
	$('.overlay-ad').show();
	addOrientationChangeEvent();
	HGTV.M.overlay.hideOverlay( $overlay );
    }
 }

function addOrientationChangeEvent() {
    window.addEventListener('orientationchange', changedOrientationAdRefresh, false);
}

function removeOrientationChangeEvent() {
    window.removeEventListener('orientationchange', changedOrientationAdRefresh, false);
}

function changedOrientationAdRefresh()  {
    $('div.overlay-ad').remove();
    MobileInterstitialAd(1);
}

function LeaderboardAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;}
	HgtvAd('LEADERBOARD', '468x60',  pos);
}

function VswAd(pos) {
    if(pos < 0 || pos == undefined || pos=='') {pos = 1;}
    HgtvAd('VSW', '', pos);
}

function PushdownAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	HgtvAd('PUSHDOWN', '', pos);
}


function GoogleBigboxAd(pos) {
	// Food GOOGLE BIG BOX 300x250 adtag
	if(pos < 0 || pos == undefined) {pos = 1;}
	HgtvAd('GOOGLE_BIGBOX', '', pos);
}

function GoogleLeaderboardAd(pos) {
	// Food GOOGLE HORIZONTAL RECTANGLE 630x132 adtag
	if(pos < 0 || pos == undefined) {pos = 1;}
	HgtvAd('GOOGLE_LEADERBOARD', '', pos);
}


function BigboxAd(pos, keywords) {
	// only show bigbox ad inline in page IF video player is not detected on page
	// (video player callback handles it whenever snap is loaded on page)
	if( typeof(mdManager)!=undefined && mdManager.getParameterString("VideoPlayer")=="" ) {
		if(pos < 0 || pos == undefined) {pos = 1;}
		HgtvAd('BIGBOX', '', pos, keywords);
	}
}


function BigboxAd300x150(pos, keywords) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	HgtvAd('SPONSORSHIP_CONTENT', '', pos, keywords);
}


function SuperstitialAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	HgtvAd('SUPERSTITIAL', '', pos);
}


//Video PreRoll & Overlay Ad functions for Maven, Pickle
function VideoPlayerAd(adtype, adsize, pos) {
	var ad = new AdUrl();

	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/html.ng/");
	if (adtype != '') {	ad.addParameter("adtype", adtype); }
	if (adsize != '') { ad.addParameter("adsize", adsize); }
	if (!pos || pos=='') { pos = 1; }
	ad.addParameter("PagePos", pos);
	ad.useFeature("tile");
	writeAd(ad);

   return ad.buildExpandedUrl();
}


// Video Player Ad Integration
// The video player will make calls to the following javascript functions to
//    1. Get a Dart ad tag url for PRE_ROLL and OVERLAY ads.
//--Wrapper function which the video player calls to get a preroll ad tag url -->
function getDartEnterpriseUrl(adtype,pos){
   		adtype = adtype.toUpperCase();
   		var strUrl = VideoPlayerAd(adtype,'', pos);
   		return strUrl;
}

function setDartEnterpriseBanner(adType, sync_banner, tracking_url, resource_obj) {
    var $bigbox = $('#bigbox');

	if (adType == 'LEADERBOARD') {
        if ($("#leaderboard").length > 0) {
	    var boxW = 728;
	    var boxH = 90;
			$("#leaderboard").html("<iframe src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}

	} else { // assumes adType == 'BIGBOX' or should
        if ($bigbox.length > 0) {
	    var boxW = 300;
	    var boxH = 250;
	    var isPG = (mdManager.getParameter('DelvFrmt') === 'ARTICLE_BUILDER_PHOTOGALLERY') ? true : false;
	    var frameStyle = '';
	    if (isPG) {
		boxH = 600;
		frameStyle = ' allowTransparency="true" style="background-color:#303030 !important;" ';
		sync_banner += '&PARAMS.STYLES=SNI_PHOTOGALLERY_BIGBOX';
	    }

			if (sync_banner.indexOf("336x850") > -1) {
				boxW = 336;
				boxH = 850;
			} else if (sync_banner.indexOf("300x600") > -1)	{
				boxW = 300;
				boxH = 600;
            }

			/* MM-5666: added this hack to force a larger height for the BB ad for particular galleries */
            if (mdManager.getParameter('DelvFrmt') === 'PORTFOLIO_DETAIL') {
				boxH = 600;
			}
			/* MM-5937: adding support for variable ad types when VAST ad called for by SNAP player */
			var html = '';
            resource_obj = resource_obj || {"nodeName": "IFrameResource"};

            switch (resource_obj.nodeName) {
				case "HTMLResource":
                    html += sync_banner;
					break;
				case "StaticResource":
					/* this will be either jpeg or Flash */
                    if (resource_obj.creativeType === 'image/jpeg')
                        html += '<a><img src="' + sync_banner + '" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></a>';
					else
                        html += '<embed src="' + sync_banner + '" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></embed>';
					break;
				default:
                    /* default is iframe */
					html += '<iframe src="' + sync_banner + '" width="' + boxW + '" height="' + boxH + '" frameborder="0" scrolling="no" marginheight="0" ' + frameStyle + '" marginwidth="0"></iframe>';
					break;
			}

            if( SNI.Ads.SafeFrame.isActive() ){
                // IF SF enabled, pass the html string
                SNI.Ads.SafeFrame.renderSyncBanner(html);
            } else {
                // Non-safeframe default mode.
            $bigbox.html(html);
            }


            /* CreativeView tracking URL sent from SNAP player */
            if (tracking_url) {
                $bigbox.append('<img src="' + tracking_url + '" class="cvTrackingPixel hide">');
            }
        }
	}
	return;
}

// used when delay loading a bigbox ad into page after page has loaded
function setDefaultBigboxAd() {
	// prevent this function from executing if no video player detected on page
	if( typeof(mdManager)!=undefined && mdManager.getParameterString("VideoPlayer")=="" ) {
		return;		// just exit
	}

	// retrieve a default ad to display
	var default_ad = VideoPlayerAd('BIGBOX', '', 5);

	// write ad into DOM
	if($("#bigbox").length > 0) {
		boxW = 300;
		boxH = 250;
		if (default_ad.indexOf("336x850") > -1) {
			boxW = 336;
			boxH = 850;
		} else if (default_ad.indexOf("300x600") > -1)	{
			boxW = 300;
			boxH = 600;
		}
		// insert into DOM
		$("#bigbox").html("<iframe src='" + default_ad + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
	}
}


// multiple sponsor logo tag
function MultiLogoAd(adtype,logoNum) {
	var ad = new DartAd();
	if (logoNum == undefined || logoNum == '' || logoNum > 4 || logoNum < 1) { logoNum = 4; }
	if (adtype == undefined || adtype == '') { adtype = 'LOGO';	}
	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/snDigitalLogo"+logoNum+".html?");
	ad.addParameter("adtype", adtype );
	ad.addParameter("PagePos", 1 );
	if (logoNum > 0) {
		writeAd(ad);
		$(document).ready( function() {
			if ($(".sponsor-multi-logo a img").length > 0) {
				if ($(".sponsor-multi-logo").parent().hasClass("west-spons")) {
				// section display names not properly maintained on HGTV as on Food:
		    //					$(".sponsor-multi-logo").prepend("<em>" + mdManager.getSctnDspName() + " is Sponsored by:</em>");
					$(".sponsor-multi-logo").prepend("<em>Sponsored by:</em>");
					$(".west-spons").css("display", "block");
				} else {
					$(".sponsor-multi-logo").prepend("<em>Sponsored by:</em>");
				}
			}
		});
	}
}
//refreshes footer ad
function refreshFooterAd () {
    if(typeof setDartEnterpriseBanner === 'function' && typeof getDartEnterpriseUrl === 'function') {
	setDartEnterpriseBanner('MOBILE_BANNER', getDartEnterpriseUrl('MOBILE_BANNER', 1), '#ad');
    }
}

// multiple text link ad tag
function sponsorLinks(adtype,linkNum) {
	var ad = new DartAd();
	if (linkNum == undefined || linkNum == '' || linkNum > 6 || linkNum < 1) { linkNum = 6; }
	if (adtype == undefined || adtype == '') { adtype = 'SPONSORLINKS';	}
    //	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/sndigital_textlinks"+linkNum+".html?");
	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/sndigital_textlinks.html?");
	ad.addParameter("adtype", adtype );
	ad.addParameter("PagePos", 1 );
	if (linkNum > 0) {
		writeAd(ad);
	}
}


//==ENDECA Functions Begin ===============================================================
//functions added at the request of Amy Thomason for the Endeca recipe search

function WDGuidedNavSearchAds(adtype, pos, keywords, filters, pageNo) {
	var ad = new DartAd();
	if(pos < 0 || pos == undefined) {
		pos = 1;
	}
	if(pageNo > 0 && pageNo != undefined) {
	   ad.addParameter("Page", pageNo);
	}
	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/js.ng/");
	ad.addParameter("adtype", adtype);
	ad.addParameter("adsize", "");
	ad.addParameter("PagePos", pos);
	// ad.addParameter("Params.styles", "trace");
	var words = keywords.split(" ");
	for(i = 0; i < words.length; i++) {
		ad.addParameter("keyword", words[i]);
	}
	var words = filters.split(" ");
	for(i = 0; i < words.length; i++) {
		ad.addParameter("filter", words[i]);
	}
	writeAd(ad);
}


function WDGuidedNavSiteAdAds(adtype, keywords, filters, pageNo) {
	WDGuidedNavSearchAds(adtype, 1, keywords, filters, pageNo);
	//WDGuidedNavSearchAds(adtype, 2, keywords, filters, pageNo)
}


//==ENDECA Functions End ===============================================================

