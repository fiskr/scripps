/**
 * diy-ads.js
 *
 * requires core ads functionality from js/sni-core/ads-core.js
 * requires mdManager (uses mdManager within functions, but not during load)
 */


function DiyAd(adtype, adsize, pos, keywords) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	if(keywords == undefined) { keywords = ""; }
	
    var ad = new DartAd(),
    delFormat = mdManager.getParameter('DelvFrmt');
    
    if (adtype == 'BIGBOX' && delFormat == 'ARTICLE_BUILDER_PHOTOGALLERY') {
	setDartEnterpriseBanner('BIGBOX', getDartEnterpriseUrl('BIGBOX',5));
	return false;
    }

	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/js.ng/");
	
	if (adtype== 'BIGBOX' && pos == 5) {
		ad.addParameter("adtype", 'BIGBOX');
	} else {
		ad.addParameter("adtype", adtype );
	}
	
	if (adtype== 'LEADERBOARD') {
		ad.addParameter("Params.styles", "SNI_LEADERBOARD"); //tells ad server to wrap with div.ad-ldr
	}	
	
	if (adtype== 'LEADERBOARD' || adtype== 'PUSHDOWN') {
		ad.addParameter("Role",  mdManager.getParameter("Role"));
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
		if( adRestrictionManager.isActive(ad, mdManager) != false) {
			adManager.createAd(ad);
		}
	} else {
		adManager.createAd(ad);
	}	
}


function LeaderboardAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;}
	DiyAd('LEADERBOARD', '468x60',  pos);
}

function VswAd(pos) {
    if(pos < 0 || pos == undefined || pos == '') {pos = 1;}
    DiyAd('VSW', '', pos);
} 

function PushdownAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('PUSHDOWN', '', pos);
}


function GoogleBigboxAd(pos) {
	// Food GOOGLE BIG BOX 300x250 adtag
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('GOOGLE_BIGBOX', '', pos);
}


function GoogleLeaderboardAd(pos) {
	// Food GOOGLE HORIZONTAL RECTANGLE 630x132 adtag
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('GOOGLE_LEADERBOARD', '', pos);
}

function BigboxAd(pos,keywords){
	// only show bigbox ad inline in page IF snap player is not detected on page
	// (video player callback handles it whenever snap is loaded on page)
	if( typeof(mdManager)!=undefined && mdManager.getParameterString("VideoPlayer")=="" ) {
		if(pos<0||pos==undefined){pos=1;}
		DiyAd('BIGBOX','',pos,keywords);
	}
}

function BigboxAd300x150(pos, keywords) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('SPONSORSHIP_CONTENT', '', pos, keywords);
}


function SuperstitialAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('SUPERSTITIAL', '', pos);
}


//Video PreRoll & Overlay Ad functions for Maven, Pickle
function VideoPlayerAd(adtype, adsize, pos) {
	var ad = new AdUrl();
	
	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/html.ng/");
	if (adtype != '') {	ad.addParameter("adtype", adtype); }
	if (adsize != '') { ad.addParameter("adsize", adsize); }
	if (!pos || pos=='') { pos = 1; }
	ad.addParameter("PagePos", pos);
	ad.addParameter("Role",  mdManager.getParameter("Role"));
	ad.useFeature("tile");
	writeAd(ad);

   return ad.buildExpandedUrl();
}

function PaintOverAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	DiyAd('SPONSORSHIP_CONTENT', '', pos, 'GLIDDEN');
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
	if (adType == 'LEADERBOARD') {
	  if($("#leaderboard").length > 0) {
			boxW = 728;
			boxH = 90;
			$("#leaderboard").html("<iframe src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}
	} else { // assumes adType == 'BIGBOX' or should
        var $bigbox = $('#bigbox');

		if($bigbox.length > 0) {
			boxW = 300;
			boxH = 250;
	    var isPG = (mdManager.getParameter('DelvFrmt') === 'ARTICLE_BUILDER_PHOTOGALLERY') ? true : false;
	    var frameStyle = '';
	    if (isPG) {
		boxH = 600;
		frameStyle = ' allowTransparency="true" style="background-color:#242424" ';
		sync_banner += '&PARAMS.STYLES=DIY_PHOTOGALLERY_BIGBOX';
	    }

			if (sync_banner.indexOf("336x850") > -1) {
				boxW = 336;
				boxH = 850;
			} else if (sync_banner.indexOf("300x600") > -1)	{
				boxW = 300;
				boxH = 600;
			}
			/* MM-5937: adding support for variable ad types when VAST ad called for by SNAP player */
			var html = '';
			resource_obj = resource_obj || {"nodeName":"IFrameResource"};
				
			switch(resource_obj.nodeName) {
				case "HTMLResource":
					html += sync_banner; 
					break;
				case "StaticResource":
					/* this will be either jpeg or Flash */
					if(resource_obj.creativeType === 'image/jpeg')
						html += '<a><img src="'+ sync_banner +'" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></a>';
					else
						html += '<embed src="' + sync_banner + '" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></embed>' ;
					break;
				default:
					/* default is iframe */ 
					html += "<iframe src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' " + frameStyle + " marginwidth='0'></iframe>";
					break;
			}

			$bigbox.html(html);

            if (tracking_url) {
                $bigbox.append('<img src="' + tracking_url + '" class="cvTrackingPixel hide">');
            }
		}
	}
	return;
}

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
			var sponsor = $('.sponsor-multi-logo');
			if ($('a img', sponsor).length > 0) {
				if (sponsor.parents("div").hasClass("generic-lead")) {
					$(".generic-lead .hd").css({"border-bottom" : "1px solid #e3e3e3","padding" : "5px"});
				}
				// just in case there is more than one sponsor on the page
				if (($('em:first-child', sponsor).length <= 0) && (!(sponsor.parents("div").hasClass("section-title")))) {
					if (sponsor.is(':only-child') || sponsor.siblings().is(':empty')) {
						sponsor.prepend('<em class="solo">Sponsored by:</em>');
					} else {
						sponsor.prepend("<em>Sponsored by:</em>");
					}
				}
			}
		});
	}
}

// multiple text link ad tag
function sponsorTextLinks(adtype,linkNum) {
        var ad = new DartAd();
        if (linkNum == undefined || linkNum == '' || linkNum > 6 || linkNum < 1) { linkNum = 6; }
        if (adtype == undefined || adtype == '') { adtype = 'SPONSORLINKS'; }
        ad.setUrl("http://"+SNI.Ads._adServerHostname+"/[NEW_SERVER_SIDE_FILENAME] "+linkNum+".html?");
        ad.addParameter("adtype", adtype );
        ad.addParameter("PagePos", 1 );
        if (linkNum > 0) {
               writeAd(ad);
        }
} 

// multiple text link ad tag
function sponsorLinks(adtype,linkNum) {
	var ad = new DartAd();
	if (linkNum == undefined || linkNum == '' || linkNum > 6 || linkNum < 1) { linkNum = 6; }
	if (adtype == undefined || adtype == '') { adtype = 'SPONSORLINKS';	}
	ad.setUrl("http://"+SNI.Ads._adServerHostname+"/snd_dp_links"+linkNum+".html?");
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

