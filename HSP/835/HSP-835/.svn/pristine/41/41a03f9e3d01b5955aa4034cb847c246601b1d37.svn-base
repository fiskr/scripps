/**
 * ads core
 */

// requires SNI.MetaData

// instantiate Ads object/namespace
if( typeof(SNI.Ads)=='undefined' ) {
	SNI.Ads = {
		// should be adsremote.scrippsnetworks.com for production and devadsremote.scrippsnetworks.com for development/staging
		_adServerHostname: SNI.Config.adServerUrl
	};
}

// Url obj
SNI.Ads.Url = function() {
	var p = new SNI.MetaData.Parameter();

	// functions
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
 
 	// setUrl
	function setUrl(u) { this.url = u; }

	// getUrl
	function getUrl() { return this.url; }

	// buildQueryStringValuePairs
	function buildQueryStringValuePairs() {
			var queryString = "";
			for ( key in this.getKeys() ) {
				if (queryString !== "") {
					queryString += '&';
				}
				queryString += key +'='+ this.getParameter(key, ',');
	    	}
	    	return queryString;
	}

	// buildUrl
	function buildUrl() {
		return this.getUrl() + this.buildQueryStringValuePairs();
	}
	
	
	// buildExpandedQueryStringValuePairs
	function buildExpandedQueryStringValuePairs() {
			var queryString = "";

			for ( key in this.getKeys() ) {

					var item = this.getParameter(key, ",");
					var iArray = item.split(",");

					for(i = 0; i < iArray.length; i++) {
						if (queryString !== "" && iArray[i] !== "" && iArray[i] !== undefined) {
							queryString += '&';
						}
						if (iArray[i] !== "" && iArray[i] !== undefined) {
							queryString += key +'='+ iArray[i];
						}
				
					}
	    	}
	    	return queryString;
	}

	// buildUrl
	function buildExpandedUrl() {
		// for any jitterbug previews, append string to adserver call
		var sJitterbug = "";
		if( window.location.hostname.indexOf("jitterbug") != (-1) ) {
			sJitterbug = "&domain=jitterbug";
		}
		
		var sRSI = "";
		if ((SNI.Ads.UseRSI) && (segQS.length > 0)) {
			sRSI = segQS;
		}
		return this.getUrl() + this.buildExpandedQueryStringValuePairs() + sJitterbug + sRSI;
	}

};


Ad.prototype = new SNI.Ads.Url();
function Ad()
{
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

	// add the parameter
	function useFeature(key) {feature.addParameter(key, "T");}

	// add the parameter
	function getFeature(key) {return feature.getParameter(key, ",");}
 	
 	// this should be overloaded
	function debug() {document.write('<div style="background:red;color:white;">'+ this.buildExpandedUrl() +'</div>');}

	// this should be overloaded
	function write() {}
}


/* -------------------------------------------
Ad Object inherits paramter
------------------------------------------- */

DartAd.prototype = new Ad();
function DartAd()
{
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
			// if this is a load-test (token detected in user agent string), don't make dart call
			return;
		}

		document.write('<script type="text/javascript" src="'+ this.buildExpandedUrl() +'"></script>');
	}
}

AdUrl.prototype = new Ad();
function AdUrl()
{
	AdUrl.prototype = new Ad();
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
	this.useFeature("SearchKeywords");
	this.useFeature("SearchFilters");
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
    
	function write() {}
}


DartAdvanceAd.prototype = new DartAd();
function DartAdvanceAd()
{
	DartAdvanceAd.prototype = new DartAd();
	this.write = write;
	this.align='';
	this.frameborder = 0;
	this.height='';
	this.longdesc='';
	this.marginheight=0;
	this.marginwidth=0;
	this.name='';
	this.scrolling = 'no';
	this.width = '100%';
	this.useIframe = false;
	
	function write() {
		if (navigator.userAgent.indexOf("#sni-loadtest#") !== -1) {
			// if this is a load-test (token detected in user agent string), don't make dart call
			return;
		}

		if(this.useIframe == false) {
			this.setUrl("http://"+SNI.Ads._adServerHostname+"/js.ng/");
			document.write('<script type="text/javascript" src="'+ this.buildExpandedUrl() +'"></script>');
		} else {
			this.setUrl("http://"+SNI.Ads._adServerHostname+"/html.ng/");
			document.write('<iframe src ="'+this.buildExpandedUrl()+'" align ="'+this.align+'" frameborder ="'+this.frameborder+'" height ="'+this.height+'" longdesc ="'+this.longdesc+'" marginheight ="'+this.marginheight+'" marginwidth ="'+this.marginwidth+'" name ="'+this.name+'" scrolling ="'+this.scrolling+'" width ="'+this.width+'"></iframe>');
		}
	}
}

/* -------------------------------------------
AdManager
------------------------------------------- */
function AdManager()
{
	var p = new SNI.MetaData.Parameter();
	this.addParameter = p.addParameter;
	this.getParameter = p.getParameter;
	this.resetKeys = p.resetKeys;
    /* adding update method to the ad manager in order to update params in the ad url dynamically */
	this.setParameter = p.setParameter;
	this.getKeys = p.getKeys;
	this.createAd = createAd;
	this.createDeferredAd = createDeferredAd;
	this.moveAds = moveAds;
	this.ads = [];
	this.defer = false;

	if(document.deferAds !== null && 
	 	   document.deferAds == 1 &&
	   	   document.deferEnabled !== null &&
	   	   document.deferEnabled == 1) {
	   	   this.defer = true;
	 }
		
	// add the parameter
	function createAd(ad) {
		// add the site params
		for ( key in this.getKeys()) {
			if ( ad.getFeature(key) !== undefined) {
				ad.addParameter(key, this.getParameter(key, ','));
			}
 		}
		
		if(document.debug == 1) {
 			ad.debug();
		}
		ad.write();
	}

	// Create Deferred Ad
	function createDeferredAd(i) {
	}
	
	// Move Ads
	function moveAds() {
	}
}


// Url obj
function AdRestriction()
{
	var p = new SNI.MetaData.Parameter();	
	// functions
	this.addParameter = p.addParameter;
	this.getParameter = p.getParameter;
	this.getKeys = p.getKeys;
	this.isActive = true;
	this.isIframe = false;
	
}

function AdDefault()
{
	var p = new SNI.MetaData.Parameter();	
	// functions
	this.addParameter = p.addParameter;
	this.getParameter = p.getParameter;
	this.getKeys = p.getKeys;
	this.display = false;
}

function AdRestrictionManager() {
	this.restriction = [];
	this.adDefaults = [];
	this.isActive = isActive;
	this.isIframe = isIframe;
	this.isMatch = isMatch;
	this.startMatch = startMatch;
	// is active
	function isActive(ad, mdm) {
		var value = false;
		var adDefaultMatch = false;
		var defaultReturnValue = true;
		
		for (var i = 0; i < this.adDefaults.length; i++){
			adDefaultMatch = this.startMatch(ad, mdm, this.adDefaults[i]);
			if (adDefaultMatch == true) {
				defaultReturnValue = this.adDefaults[i].display;
				break;
			} 
		}
		
		for (var i = 0; i < this.restriction.length; i++){
			adRestriction = this.restriction[i];
			if(!adRestriction.isActive) {
				value = this.startMatch(ad, mdm, adRestriction);
			}
			if(value == true) {
				return !defaultReturnValue;
			}
		}
		
		return defaultReturnValue;
	}
	
	// is Iframe
	function isIframe(ad, mdm) {
		var value = false;
		for (var i = 0; i < this.restriction.length; i++){
			adRestriction = this.restriction[i];
			if(adRestriction.isIframe) {
				value = this.startMatch(ad, mdm, adRestriction);
			} 
			
		}
		return value;
		
	}
	
	function startMatch(ad, mdm, adRestriction) {
		var match = true;
		for ( var key in adRestriction.getKeys() ) {
					var restrictions = adRestriction.getParameter(key, ',');
					
					// get it from the mdm
					var value = mdm.getParameter(key, '----');
					match = this.isMatch(value, restrictions);
					
					// ad
					if(!match) {
						value = ad.getParameter(key, '----');
						match = this.isMatch(value, restrictions);
					}
					if(!match) {return false;}
				
		}
		return match;
	}
	
	function isMatch(value, restrictions) {
		var match = false;
		if(value) {
			splitValue = value.split('----');
			for(var x = 0; x < splitValue.length; x++) {
				if(restrictions == splitValue[x]) {match = true;}
				for(var a; a < restrictions.length; a++) {	
					if(splitValue[x] == restrictions[a]) {
						return true;
					}
				}
			}
		}
		return match;
	}
	
}




function initAdManager(adm, mdm) {
	// adm = ad manager
	// mdm = metadata manager
	
	function admAppendParam(key, val) {
		// appends the parameter to the ad manager if val is not empty string
		if( val != "" ) {
			val = val.replace(/-/g, "_");		// replace all dashes with underscores
			val = val.replace(/ /g, "_");		// replace all spaces with underscores

			s = val.split(',', 1);				// just grab the first val of any multi-value string separated by commas
			adm.addParameter(key, s);

			//alert("key = " + key + ", val = " + s);			// debug
		}
	}
	

	var ranNum = String(Math.round(Math.random()*10000000000));
	var now = new Date();
	var ad_ord = now.getTime()%10000000000;

	var amPageType = mdm.getPageType() ;
	var amSponsorship = mdm.getSponsorship();
	var amKeywords = mdm.getKeywords();
	amPageType = amPageType.replace(/-/g , "_");
	
	var amUniqueId = mdm.getUniqueId();
	amUniqueId = amUniqueId.replace(/-/g , "_");
	
	if (amSponsorship !== "" && amSponsorship !== undefined) {
		amSponsorship = amSponsorship.replace(/-/g , "_");
		amSponsorship = amSponsorship.replace(/ /g , "_");
	}

	if (amKeywords !=="" && amKeywords !== undefined) {
		amKeywords = amKeywords.replace(/,/g , "_");
	}

	amSctns = mdm.getClassification();
	amSctns = amSctns.split(",");
	
	if (amSctns.length > 1) {
		for (var i=0; i < amSctns.length; i++) {
			if (i == (amSctns.length-1)) {
				adm.addParameter("sitesection", amSctns[i]);
			} else if (i == (amSctns.length-2)) {
				adm.addParameter("category", amSctns[i]);
			} else if (i == (amSctns.length-3)) {
				adm.addParameter("vgncontent", amSctns[i]);
			} else {
				adm.addParameter("SUBSECTION", amSctns[i]);
			}
		}
	} else {
		var c = mdm.getClassification();
		adm.addParameter("category", c );
	}
	
	if (amPageType == 'SECTION') {
		if (!adm.getParameter("vgncontent", " ")) {
			adm.addParameter("page", "MAIN");
		}
	}
	var s = mdm.getSite();
	adm.addParameter("site",s );
	var gsId = mdm.getSctnId();
	adm.addParameter("tile", ranNum +  gsId );
	adm.addParameter("ord", ad_ord);
	adm.addParameter("topic", amSponsorship);
	adm.addParameter("keywords", amKeywords);
	adm.addParameter("pagetype", amPageType);
	adm.addParameter("uniqueid", amUniqueId);
	var sId = mdm.getSctnId();
	adm.addParameter("SECTION_ID", sId);

    if (SNI.Util.Cookie.get('aam_did')) {
        adm.addParameter("u", SNI.Util.Cookie.get('aam_did'));
    }


	// these first column keys need to match with this.useFeature(key) from the DartAd() and AdUrl() objects
	admAppendParam("adkey1", mdm.getParameterString("AdKey1").toUpperCase());
	admAppendParam("adkey2", mdm.getParameterString("AdKey2").toUpperCase());
	admAppendParam("delvfrmt", mdm.getParameterString("DelvFrmt"));
	admAppendParam("source", mdm.getParameterString("Source"));
	admAppendParam("filter", mdm.getParameterString("filter"));
	admAppendParam("chef", mdm.getParameterString("ChefName"));
	admAppendParam("show", mdm.getParameterString("Show_Abbr"));
	admAppendParam("difficulty", mdm.getParameterString("Difficulty"));
	admAppendParam("cuisine", mdm.getParameterString("Cuisine"));
	admAppendParam("ingredient", mdm.getParameterString("MainIngredient"));
	admAppendParam("occasion", mdm.getParameterString("Occasion"));
	admAppendParam("mealpart", mdm.getParameterString("MealPart"));
	admAppendParam("technique", mdm.getParameterString("Technique"));
	admAppendParam("hubhierarchy", mdm.getParameterString("HubHierarchy"));
	admAppendParam("preptime", mdm.getParameterString("PrepTime"));
}

