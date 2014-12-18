

//for some reason the adhesion banner isn't getting pulled in when setDartEnterpriseBanner is called 
//let's do a walkthrough of exactly what fires.

//within SNI.TP.Sweeps.HelloWorld.setState function
HW.refreshAds();

//this is the refresh ads function
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

//this is the mobile banner call:
setDartEnterpriseBanner( 'MOBILE_BANNER', getDartEnterpriseUrl( 'MOBILE_BANNER', 1 ) );


//which uses the following function:
function setDartEnterpriseBanner(adType, sync_banner, tracking_url, resource_obj) {
    var $bigbox = $('#bigbox');
    if (adType == 'LEADERBOARD') {
        //not relevant- this is for leaderboard...
    } else {
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
            } else if (sync_banner.indexOf("300x600") > -1) {
                boxW = 300;
                boxH = 600;
            }
            if (mdManager.getParameter('DelvFrmt') === 'PORTFOLIO_DETAIL') {
                boxH = 600;
            }
            var html = '';
            resource_obj = resource_obj || {
                "nodeName": "IFrameResource"
            };
            switch (resource_obj.nodeName) {
                case "HTMLResource":
                    html += sync_banner;
                    break;
                case "StaticResource":
                    if (resource_obj.creativeType === 'image/jpeg')
                        html += '<a><img src="' + sync_banner + '" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></a>';
                    else
                        html += '<embed src="' + sync_banner + '" width="' + (resource_obj.width ? resource_obj.width : boxW) + '" height="' + (resource_obj.height ? resource_obj.height : boxH) + '"></embed>';
                    break;
                default:
                    html += '<iframe src="' + sync_banner + '" width="' + boxW + '" height="' + boxH + '" frameborder="0" scrolling="no" marginheight="0" ' + frameStyle + '" marginwidth="0"></iframe>';
                    break;
            }
            if (SNI.Ads.SafeFrame.isActive()) {
                SNI.Ads.SafeFrame.renderSyncBanner(html);
            } else {
                $bigbox.html(html);
            }
            if (tracking_url) {
                $bigbox.append('<img src="' + tracking_url + '" class="cvTrackingPixel hide">');
            }
        }
    }
    return;
}




////////////////////////////

//on page load, the following is run:
MobileBannerAd(1);

//if we can understand the difference between this and the getDartEnterpriseBanner, 
//we might be able to fix what's wrong.

function MobileBannerAd(pos) {
    if (pos < 0 || pos == undefined || pos == '') {
        pos = 1;
    }
    HgtvAd('MOBILE_BANNER', '', pos);
}


function HgtvAd(adtype, adsize, pos, keywords) {
    if (SNI.Ads.SafeFrame) {
        SNI.Ads.SafeFrame.init();
    }
    if (pos < 0 || pos == undefined) {
        pos = 1;
    }
    if (keywords == undefined) {
        keywords = "";
    }
    var ad = new DartAd(),
        delFormat = mdManager.getParameter('DelvFrmt');
    if (adtype == 'BIGBOX' && (delFormat == 'ARTICLE_BUILDER_PHOTOGALLERY' || delFormat == 'PORTFOLIO_DETAIL')) {
        if (SNI.Ads.SafeFrame.isActive()) {
            SNI.Ads.SafeFrame.renderAdsRemoteUrl(getDartEnterpriseUrl('BIGBOX', 5));
        } else {
            setDartEnterpriseBanner('BIGBOX', getDartEnterpriseUrl('BIGBOX', 5));
        }
        return false;
    }
    ad.setUrl('http://' + SNI.Ads._adServerHostname + '/js.ng/');
    if (adtype == 'BIGBOX' && pos == 5) {
        ad.addParameter("adtype", 'BIGBOX');
    } else {
        ad.addParameter("adtype", adtype);
    }
    if (adtype == 'LEADERBOARD') {
        ad.addParameter("Params.styles", "SNI_LEADERBOARD");
    }
    ad.addParameter("adsize", adsize);
    ad.addParameter("PagePos", pos);
    ad.useFeature("tile");
    if (keywords != "") {
        var words = keywords.split(" ");
        for (i = 0; i < words.length; i++) {
            ad.addParameter("keyword", words[i]);
        }
    }
    switch (adtype) {
        default: writeAd(ad);
        break;
    }
}

function DartAd() {
    DartAd.prototype = new Ad();
    this.write = write;
    this.useFeature("site");
    this.useFeature("category");
    this.useFeature("vgncontent");
    this.useFeature("ord");
    this.useFeature("topic");
    this.useFeature("tile");
    this.useFeature("pagetype");
    this.useFeature("SECTION_ID");
    this.useFeature("SUBSECTION");
    this.useFeature("page");
    this.useFeature("uniqueid");
    this.useFeature("adkey1");
    this.useFeature("adkey2");
    this.useFeature("chef");
    this.useFeature("show");
    this.useFeature("delvfrmt");
    this.useFeature("source");
    this.useFeature("filter");
    this.useFeature("difficulty");
    this.useFeature("cuisine");
    this.useFeature("ingredient");
    this.useFeature("occasion");
    this.useFeature("mealpart");
    this.useFeature("technique");
    this.useFeature("hubhierarchy");
    this.useFeature("preptime");
    this.useFeature("u");
    this.adClass = "AD_CLASS";

    function write() {
        if (navigator.userAgent.indexOf("#sni-loadtest#") !== -1) {
            return;
        }
        document.write('<script type="text/javascript" src="' + this.buildExpandedUrl() + '"></script>');
    }
}

function Ad() {
    var url = new SNI.Ads.Url();
    this.addParameter = url.addParameter;
    this.getParameter = url.getParameter;
    this.getKeys = url.getKeys;
    this.buildUrl = url.buildUrl;
    this.buildExpandedUrl = url.buildExpandedUrl;
    var feature = new SNI.MetaData.Parameter();
    this.useFeature = useFeature;
    this.getFeature = getFeature;
    this.debug = debug;
    this.write = write;
    this.deferrable = 1;

    function useFeature(key) {
        feature.addParameter(key, "T");
    }

    function getFeature(key) {
        return feature.getParameter(key, ",");
    }

    function debug() {
        document.write('<div style="background:red;color:white;">' + this.buildExpandedUrl() + '</div>');
    }

    function write() {} // defaults to nothing 
}

function writeAd(ad) {
    if (typeof adRestrictionManager != 'undefined') {
        ad.useIframe = adRestrictionManager.isIframe(ad, mdManager);
        if (adRestrictionManager.isActive(ad, mdManager) != false) {
            adManager.createAd(ad);
        }
    } else {
        adManager.createAd(ad);
    }
}

function createAd(ad) {
    for (key in this.getKeys()) {
        if (ad.getFeature(key) !== undefined) {
            ad.addParameter(key, this.getParameter(key, ','));
        }
    }
    if (document.debug == 1) {
        ad.debug();
    }
    ad.write();
}

//SNI.Ads.Url.toString();
function() {
    var p = new SNI.MetaData.Parameter();
    this.addParameter = p.addParameter;
    this.getParameter = p.getParameter;
    this.getKeys = p.getKeys;
    this.url = '';
    this.buildUrl = buildUrl;
    this.buildExpandedUrl = buildExpandedUrl;
    this.setUrl = setUrl;
    this.getUrl = getUrl;
    this.buildQueryStringValuePairs = buildQueryStringValuePairs;
    this.buildExpandedQueryStringValuePairs = buildExpandedQueryStringValuePairs;

    function setUrl(u) {
        this.url = u;
    }

    function getUrl() {
        return this.url;
    }

    function buildQueryStringValuePairs() {
        var queryString = "";
        for (key in this.getKeys()) {
            if (queryString !== "") {
                queryString += '&';
            }
            queryString += key + '=' + this.getParameter(key, ',');
        }
        return queryString;
    }

    function buildUrl() {
        return this.getUrl() + this.buildQueryStringValuePairs();
    }

    function buildExpandedQueryStringValuePairs() {
        var queryString = "";
        for (key in this.getKeys()) {
            var item = this.getParameter(key, ",");
            var iArray = item.split(",");
            for (i = 0; i < iArray.length; i++) {
                if (queryString !== "" && iArray[i] !== "" && iArray[i] !== undefined) {
                    queryString += '&';
                }
                if (iArray[i] !== "" && iArray[i] !== undefined) {
                    queryString += key + '=' + iArray[i];
                }
            }
        }
        return queryString;
    }

    function buildExpandedUrl() {
        var sJitterbug = "";
        if (window.location.hostname.indexOf("jitterbug") != (-1)) {
            sJitterbug = "&domain=jitterbug";
        }
        var sRSI = "";
        if ((SNI.Ads.UseRSI) && (segQS.length > 0)) {
            sRSI = segQS;
        }
        return this.getUrl() + this.buildExpandedQueryStringValuePairs() + sJitterbug + sRSI;
    }
}

/////////////////////

function refreshMobileBannerAd(containerSelector, position) {
    if (!containerSelector) return;
    var pos = +position,
        container = $(containerSelector),
        url = getUpdatedORD(getDartEnterpriseUrl('MOBILE_BANNER', 1));
    if (!/^\d+$/.test(pos)) pos = 1;
    return $(containerSelector).html('<iframe src="' + url + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
}











