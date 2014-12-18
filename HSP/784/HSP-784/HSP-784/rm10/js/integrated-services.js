/* Integrated Services - common namespace to define calls to sni-ntegrated-services.js
 *
 *  here we can define specific configurations at a site level
 *  for instance FN can have a global 'dark' colorscheme and HGTV can have a global 'light' colorscheme
 *  overriding the default configurations of sni-integrated-services.js
 *
 *  additionally you can extend the IS namespace here to add a "SITE" specific utility without having to add it to core, minimizing bloat
 *  for instance, if FN needs something special, we can create it here: SNI.IS.FB.SomethingReallySpecialJustForFN
 *  if it becomes a functionality that needs to be shared across brands we can move it over to sni-integrated-services.js
 *
 * */

if (typeof(SNI.HGRM.IS) == 'undefined') {
	SNI.HGRM.IS = {};
}

/* FaceBook Like */
 
SNI.HGRM.IS.FB = {}; 

SNI.HGRM.IS.FB.like = function(config) {
	config = $.extend({
		'layout':'button_count',
		'show_faces':'true',
		'width' : '50',
		'font':'trebuchet ms',
		'colorscheme':'light'
	}, config);

	return SNI.IS.FB.like(config);
};


/* FaceBook login */
SNI.HGRM.IS.FB.login = function(config) {
//	config = $.extend({	}, config);
	return SNI.IS.FB.login(config);
};

/* FaceBook Share */
/* can define a share call here */
SNI.HGRM.IS.Twitter = {};

SNI.HGRM.IS.Twitter.share = function (config) {
	config = $.extend({
		messages: {
			prefix: {
				DEFAULT: "",
				RECIPE: "Get the recipe:",
				COMPANIES: "Get local info:",
				MENU: "Get the menu:",
				GALLERY: "Browse the photos:",
				CHANNEL: "Watch the video:",
				ARTICLE: "Read the article:"
			},
			via: "@HGTVRemodels"
		},
		shareThisSrc: "http://w.sharethis.com/button/sharethis.js#publisher=87e14ce7-dc4d-40d2-ada1-38b20bfad22c&amp;type=website&amp;post_services=email%2Cfacebook%2Ctwitter%2Cgbuzz%2Cmyspace%2Cdigg%2Csms%2Cwindows_live%2Cdelicious%2Cstumbleupon%2Creddit%2Cgoogle_bmarks%2Clinkedin%2Cbebo%2Cybuzz%2Cblogger%2Cyahoo_bmarks%2Cmixx%2Ctechnorati%2Cfriendfeed%2Cpropeller%2Cwordpress%2Cnewsvine&amp;button=false"
	}, config, true);

	return SNI.IS.Twitter.share(config);
}
