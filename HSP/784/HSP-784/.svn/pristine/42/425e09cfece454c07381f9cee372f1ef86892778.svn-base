if (typeof(SNI.ShareThis) == 'undefined') {
	SNI.ShareThis = {};
}


SNI.ShareThis = {

	JS :"http://w.sharethis.com/button/sharethis.js#publisher=87e14ce7-dc4d-40d2-ada1-38b20bfad22c&amp;type=website&amp;post_services=email%2Cfacebook%2Ctwitter%2Cgbuzz%2Cmyspace%2Cdigg%2Csms%2Cwindows_live%2Cdelicious%2Cstumbleupon%2Creddit%2Cgoogle_bmarks%2Clinkedin%2Cbebo%2Cybuzz%2Cblogger%2Cyahoo_bmarks%2Cmixx%2Ctechnorati%2Cfriendfeed%2Cpropeller%2Cwordpress%2Cnewsvine&amp;button=false",

	load: function(config, type) {

		var shared_object = SNI.ShareThis.obj.addEntry(config, {button:false,onmouseover:false});
		if (type == 'twitter') {
			shared_object.attachChicklet("twitter", $("#tb-tweet .chicklet")[0]);
		} else if (type == 'sharethis') {
			shared_object.attachButton(document.getElementById('st-button'));
		} else if (type == 'facebook') {
			shared_object.attachChicklet("facebook", $("#tb-facebook .chicklet")[0]);
		}
	},


	toolbar: function(config, type) {
		if (typeof SNI.ShareThis.obj == 'object') {
			SNI.ShareThis.load(config, type);
		} else {

			$.getScript(SNI.ShareThis.JS, function() {
				SHARETHIS.onReady();
				SNI.ShareThis.obj = SHARETHIS;
				SNI.ShareThis.load(config, type);
			});

		}
	}

};