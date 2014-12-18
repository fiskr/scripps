/*

we refresh the ads on states changes from hw-states.js (written by Jeff Moore and maintained by Home Special Projects)
on Frontdoor, when ads are refreshed, the PARAM.STYLES=LEADERBOARD param isn't being appended to the URL, 
so the leaderboard isn't getting the proper left and right margins (making it render flush with the left side of the window)



*/

//this is the function we use to refresh the ads:
"refreshAds" : function() {
	var now = new Date(),
		ad_ord = now.getTime() % 10000000000;
		
	adManager.setParameter( 'ord', ad_ord );
	
	if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test( navigator.userAgent ) ) {
		setDartEnterpriseBanner( 'MOBILE_BANNER', getDartEnterpriseUrl( 'MOBILE_BANNER', 1 ) );
	} else {
		setDartEnterpriseBanner( 'LEADERBOARD', getDartEnterpriseUrl( 'LEADERBOARD', 1 ) );
		setDartEnterpriseBanner( 'BIGBOX', getDartEnterpriseUrl( 'BIGBOX', 5 ) );
	}
	
}


//the way we get the URL that needs the param that is being left off is:
getDartEnterpriseUrl( 'LEADERBOARD', 1 ); 

/*
which on FrontDoor returns: 
http://adsremote.scrippsnetworks.com/html.ng/
ADTYPE=LEADERBOARD
&PAGEPOS=1
&VGNCONTENT=HGTV_URBAN_OASIS
&CATEGORY=HGTV_URBAN_OASIS
&SITE=DOOR&TILE=6448830525
&ORD=9247930457
&TOPIC=FD_TP_URBAN_OASIS_SWEEPS
&PAGETYPE=PACKAGE_INTERIOR
&UNIQUEID=DOOR-Sweepstakes-00000148-180a-dcb3-a96d-f97fead00000-1
&SECTION_ID=0000013c-3ad9-d8ec-a9bf-baff9f830000&SOURCE=DOOR


HGTV seems pretty different- 
but I am going to compare function with them to see if something possibly changed for Frontdoor that we can notice.

Here is HGTV's URL:

http://adsremote.scrippsnetworks.com/html.ng/
ADTYPE=LEADERBOARD&PAGEPOS=1
&CATEGORY=URBAN_OASIS&SITE=HGTV
&TILE=397410574042804&ORD=9248628954&TOPIC=HG_TP_URBAN_OASIS_SWEEPS
&PAGETYPE=ARTICLE&UNIQUEID=HGTV-ARTICLE-6074065-1&SECTION_ID=42804
&DELVFRMT=ARTICLE_BUILDER_UBER&SOURCE=MANUAL&HUBHIERARCHY=59481|

//////////////////////////////////////////////////////////////////////

*/

//DOOR:

function setDartEnterpriseBanner(d, c, b, h) {
    if (d == "LEADERBOARD") {
        if ($("#leaderboard").length > 0) {
            boxW = 728;
            boxH = 90;
            $("#leaderboard").html("<iframe src='" + c + "' width='" + boxW + "' height='" + boxH + "'frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>")
        }
    } ...
    return
}

//HGTV:
function setDartEnterpriseBanner(adType, sync_banner, tracking_url, resource_obj) {
    var $bigbox = $('#bigbox');
    if (adType == 'LEADERBOARD') {
        if ($("#leaderboard").length > 0) {
            var boxW = 728;
            var boxH = 90;
            $("#leaderboard").html(
            	"<iframe src='" 
            	+ sync_banner 
            	+ "\' width=\'" 
            	+ boxW 
            	+ "\' height=\'" 
            	+ boxH 
            	+ "\'" 
            	+ "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>"
            	);
        }
    } ...
    return;
}


//DOOR:
function getDartEnterpriseUrl(a, c) {
    a = a.toUpperCase();
    var b = VideoPlayerAd(a, '', c);
    return b
}


//HGTV:
function getDartEnterpriseUrl(adtype, pos) {
    adtype = adtype.toUpperCase();
    var strUrl = VideoPlayerAd(adtype, '', pos);
    return strUrl;
}

//////////////////////////////////////////////////////////////////////


//DOOR:
function VideoPlayerAd(b, a, d) {
    var c = new AdUrl();
    c.setUrl('http://' + SNI.Ads._adServerHostname + '/html.ng/');
    if (b != '') {
        c.addParameter('adtype', b)
    }
    if (a != '') {
        c.addParameter('adsize', a)
    }
    if (!d || d == '') {
        d = 1
    }
    c.addParameter('PagePos', d);
    if (b == 'LEADERBELT') { 									// see, this logic makes me think the param
        c.addParameter('Params.styles', 'SNI_LEADERBELT')		// for the leaderboard styles needs to be added here
    }															
    c.useFeature('tile');
    writeAd(c);
    return c.buildExpandedUrl()
}


//this is what I would suggest we do:

function VideoPlayerAd(b, a, d) {
   ...
    }
    c.addParameter('PagePos', d);
    if (b == 'LEADERBELT') {
        c.addParameter('Params.styles', 'SNI_LEADERBELT')
    } else if (b === 'LEADERBOARD') { 						// add condition for the leaderboard
    	c.addParameter('Params.styles', 'SNI_LEADERBOARD'); // to append the necessary style parameter
    }															
    c.useFeature('tile');
	...
}

//HGTV:
function VideoPlayerAd(adtype, adsize, pos) {
    var ad = new AdUrl();
    ad.setUrl("http://" + SNI.Ads._adServerHostname + "/html.ng/");
    if (adtype != '') {
        ad.addParameter("adtype", adtype);
    }
    if (adsize != '') {
        ad.addParameter("adsize", adsize);
    }
    if (!pos || pos == '') {
        pos = 1;
    }
    ad.addParameter("PagePos", pos);
    ad.useFeature("tile");
    writeAd(ad);
    return ad.buildExpandedUrl();
}