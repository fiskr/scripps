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
    env         : "stage",
    site        : "HGTV",
    domain      : "www.staging-hgtv.com",
    adServerUrl : "devadsremote.scrippsnetworks.com",
    userPrefUrl : "http://test2-www.athomewith.com/",
    userLoginUrl: "http://test2-my.hgtv.com/",
    userMarket  : "http://styleboards-beta.hgtv.com/",

    snapPlayListUrl: "http://www.staging-hgtv.com/hgtv",
    snapBinary     : "http://common.scrippsnetworks.com/common/snap/snap-3.2.23.swf",
    snapConfigs    : "http://frontend.scrippsnetworks.com/hgtv/staging/snap-configs/v4",
    snapEnableHTML5: true,
    autoSuggestContainer: "#hd-wrap .search",
    autoSuggestService  : "/search/autosuggest.do",

    omnitureMultiVariable : "prop14,eVar16,prop15,eVar18,prop16,eVar17,prop17,eVar19,prop18,prop19,eVar20,prop20",
    omnitureSingleVariable: "prop26",
    rsiKeyWord            : "searchTerm",
    UR3                   : true,
    animationSpeed        : 250,

    navDropJsonPath: "http://www.staging-hgtv.com/app/fetchElement/text.json?site=HGTV&type=TEXT&id=99096&preview=yes",
    navHoverDelay  : 350,
    navHoverDelayIn: 100,

    kudzuSearchPath: "http://api.kudzu.com/GetSearchResults?license=AB92JADHI&page=1&numResults=3&format=json",

    //FaceBook Channel URL
    FB             : { ChannelUrl: "http://www.staging-hgtv.com/hgtv/fbchannel/0,,,00.html" },

    Pinterest: {
        defaultImgUrl : "http://hgtv.sndimg.com/webhgtv/hg20/imgs/hgtv-logo-new.png",
        defaultFromMsg: " from HGTV.com"
    },
      
      /**
    * @Description: Nielsen
    */
    Nielsen : {
        ci: "us-200639h",
        autoTrackPages: false,
        useIframeTracking:  true,
        hitCountIframeContainer: "hitCountIframeContainer",
        hitCountHtmlUrl:  "http://frontend.scrippsnetworks.com/hgtv/fixHits.html"
      },

      mobileOverlayPaths: {
          iPad: "/hgtv/cda/firefly/module/0,,HGTV_20398707_22_no,00.html",
          iPhone: "/hgtv/cda/firefly/module/0,,HGTV_20398682_22_no,00.html",
          iPod: "/hgtv/cda/firefly/module/0,,HGTV_20398682_22_no,00.html"
    }
};
