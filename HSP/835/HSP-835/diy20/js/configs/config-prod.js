/*
* sni-config - staging environment
* DIY
* Prep the SNI namespace and define site specific config values
* 
*/
if (typeof SNI == "undefined" || !SNI){ var SNI={}; };

SNI.Config = {};

/**
* 
* @Description: Debugging
*/ 
SNI.Config.DEBUG = {};
SNI.Config.DEBUG.log = true;

/**
* 
* @Description: Enviroment defaults
*/ 
SNI.Config.env = "prod";
SNI.Config.site = "DIY Network";
SNI.Config.domain = "www.diynetwork.com";

SNI.Config.rsiKeyWord = "searchTerm";
/**
* 
* @Description: adsRemoteUrl
*/ 
SNI.Config.adServerUrl = "adsremote.scrippsnetworks.com";

/**
* 
* @Description: imgRootUrl
*/
SNI.Config.imgRootUrl = "http://images.diynetwork.com/webdiy/diy20/imgs/";


/**
* 
* @Description: snapPlayer
*/
SNI.Config.snapPlayListUrl = "http://www.diynetwork.com/diy";
SNI.Config.snapBinary = "http://common.scrippsnetworks.com/common/snap/snap-3.2.23.swf";
switch (window.location.hostname) {
    case 'www.dev-diynetwork.com':
        SNI.Config.snapConfigs = 'http://frontend.scrippsnetworks.com/diy/snap-configs/';
        break;
    case 'www.staging-diynetwork.com':
        SNI.Config.snapConfigs = 'http://frontend.scrippsnetworks.com/diy/staging/snap-configs/';
        break;
    default:
        SNI.Config.snapConfigs = 'http://images.diynetwork.com/webdiy/diy20/snap-configs/';
        break;
}
SNI.Config.snapEnableHTML5 = true;
/**
* 
* @Description: Facebook defaults
*/ 
SNI.Config.FB = {};
SNI.Config.FB.ChannelUrl = "http://" + SNI.Config.domain + "/diy/fbchannel/0,,,00.html";

SNI.Config.Pinterest = {};
SNI.Config.Pinterest.defaultImgUrl = "http://images.diynetwork.com/webdiy/diy20/imgs/se/diy-200.jpg";
SNI.Config.Pinterest.defaultFromMsg = " from DIYnetwork.com";

/**
* 
* @Description: Nielsen
*/
SNI.Config.Nielsen = {};
SNI.Config.Nielsen.ci = "us-200639h";
SNI.Config.Nielsen.autoTrackPages = false;
SNI.Config.Nielsen.useIframeTracking = true;
SNI.Config.Nielsen.hitCountIframeContainer = "hitCountIframeContainer";
SNI.Config.Nielsen.hitCountHtmlUrl = "http://img.hgtv.com/webhgtv/hg20/html/fixHits.html";
