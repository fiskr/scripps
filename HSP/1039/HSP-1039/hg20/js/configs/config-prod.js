/*
 * sni-config - development environment
 * hgtv
 * Prep the SNI namespace and define site specific config values
 * 
 */

if (typeof SNI == "undefined" || !SNI) {
    var SNI = {};
}

SNI.Config = {
    env         : "prod",
    site        : "HGTV",
    domain      : "www.hgtv.com",
    adServerUrl : "adsremote.scrippsnetworks.com",
    userPrefUrl : "http://www.athomewith.com/",
    userLoginUrl: "http://my.hgtv.com/",
    userMarket  : "http://marketplace.hgtv.com/",

    snapPlayListUrl: "http://www.hgtv.com/hgtv",
    snapBinary     : "http://common.scrippsnetworks.com/common/snap/snap-3.2.23.swf",
    snapConfigs    : "http://hgtv.sndimg.com/webhgtv/hg20/snap-configs/v4",
    snapEnableHTML5: true,

    autoSuggestContainer: "#hd-wrap .search",
    autoSuggestService  : "/search/autosuggest.do",

    omnitureMultiVariable : "prop14,eVar16,prop15,eVar18,prop16,eVar17,prop17,eVar19,prop18,prop19,eVar20,prop20",
    omnitureSingleVariable: "prop26",
    rsiKeyWord            : "searchTerm",
    UR3                   : true,
    animationSpeed        : 250,

    navDropJsonPath: "http://www.hgtv.com/app/fetchElement/text.json?site=HGTV&type=TEXT&id=99096&preview=no",
    navHoverDelay  : 350,
    navHoverDelayIn: 100,

    kudzuSearchPath: "http://api.kudzu.com/GetSearchResults?license=HGTV&page=1&numResults=3&format=json",

    //FaceBook Channel URL
    FB             : { ChannelUrl: "http://www.hgtv.com/hgtv/fbchannel/0,,,00.html" },

    Pinterest: {
        defaultImgUrl : "http://hgtv.sndimg.com/webhgtv/hg20/imgs/hgtv-logo-new.png",
        defaultFromMsg: " from HGTV.com"
    },
    
      /**
    * 
    * @Description: Nielsen
    */
    Nielsen : {
        ci: "us-200639h",
        autoTrackPages: false,
        useIframeTracking:  true,
        hitCountIframeContainer: "hitCountIframeContainer",
        hitCountHtmlUrl:  "http://img.hgtv.com/webhgtv/hg20/html/fixHits.html"
      },

      mobileOverlayPaths: {
          iPad: "/hgtv/cda/firefly/module/0,,HGTV_3580359_22_no,00.html",
          iPhone: "/hgtv/cda/firefly/module/0,,HGTV_3579941_22_no,00.html",
          iPod: "/hgtv/cda/firefly/module/0,,HGTV_3579941_22_no,00.html"
    }
};

