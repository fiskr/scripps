$(document).ready(function(){
	       
    var id = [];
                
        id.HOME = "87118caf832e45bc85310ccb4eb042c3.js";
	id.PLAYER = "dda552d69aa84f1d9504f88dd1283fe5.js";
	id.VIDEO = "dda552d69aa84f1d9504f88dd1283fe5.js";
	id.SHOW = "7e975b3bc4224eb7b7e6e276748e877f.js";
	id.ARTICLE = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.TEXT = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.POLL = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.TALENT = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.SECTION = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.DP_SECTION = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.PORTFOLIO = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	id.BLOG = "a3cbdf9c91a74e46816e117d43ae12a6.js";
	/*id.HGTVSweepsEntryPage = "8b4c44533c364c85855a03f0e93f5dc8.js";
	id.HGTVSweepsThankYouPage = "7e089791533a456f93cf697473f08a31.js";
	id.HGTVEmailSignupPage = "cf230f4fae8c433eb531991d9beaee53.js";
	id.HGTVEmailThankYouPage = "a789b253d17a443b821a442dce027590.js";*/
    
	var currentSection = mdManager.getParameterString('SctnName');
        var currentType = mdManager.getParameterString('Type');
	var trackingPixel = "http://cti.w55c.net/ct/ct-";	
	var defaultPixel = "http://cti.w55c.net/ct/ct-a3cbdf9c91a74e46816e117d43ae12a6.js";
	var trackingScript="";

	//If there is NOT a section or type listed in the array with a predefined value
        if (! jQuery.inArray(currentType, id) && ! jQuery.inArray(currentSection, id)){
	
	 //Serve up the default tracking script 
         trackingScript = defaultPixel;  

	}
	
	//If we are on the homepage of a site
	else if( currentSection === "HOME"){
	    
	    //Return the value for the section name "HOME"
            trackingScript = trackingPixel+id[currentSection];
        }
	
	else if( jQuery.inArray(currentType, id) &&  jQuery.inArray(currentSection, id)){
	if ((typeof jQuery.inArray(currentType, id) !== 'undefined') && (jQuery.inArray(currentSection, id) !== null)){
                trackingScript = defaultPixel;
            }
            else{
		trackingScript = trackingPixel+id[currentType];
		}	
		
	
	}

	
	/*Did we have a valid Type or Section? If YES then we'll use
	 the Type/section's stored trackingScript value otherwise lets use the defaultPixel*/
	$.getScript(trackingScript ? trackingScript : defaultPixel);


});
