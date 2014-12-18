
// JS for Site Toolbar: Articles 
if( typeof(SNI.DIY.Toolbar) == "undefined" ) {
	SNI.DIY.Toolbar = {};
}

SNI.DIY.Toolbar = {
    addPintrestShare     : function(selector_id, img_url, description, from_message) {
        SNI.IS.Pinterest.createButton({
            'element': selector_id,
            'imgUrl': img_url,
            'desc': description,
            'fromMsg': from_message
		});
	},

    addFacebookShare  : function(selector_id) {
        var config = {
            'element': selector_id,
            'layout': 'button_count',
            'show_faces': 'true',
            'width': '50',
            'font': 'trebuchet ms',
            'colorscheme': 'light'
		};
        SNI.IS.FB.like(config);
    },

    addTwitterShare   : function(selector_id) {
        SNI.IS.Twitter.tweet({
            'element': selector_id
		});
				},

    addGooglePlusShare: function(selector_id) {
        SNI.IS.GP.plusone({
            'element': selector_id,
            'annotation': 'bubble',
            'size': 'medium'
								});
					},

    addStumble: function(selector_id) {
        SNI.IS.Stumble.createButton({
           element: selector_id
			});
					},

	init: function(){
        (function($){
            SNI.DIY.Toolbar.addPintrestShare('#tb-pinterest');
            SNI.DIY.Toolbar.addFacebookShare('#tb-facebook');
            SNI.DIY.Toolbar.addTwitterShare('#tb-twitter');
            SNI.DIY.Toolbar.addGooglePlusShare('#tb-gplus');
            SNI.DIY.Toolbar.addStumble('#tb-stumble');
        })(jQuery);
		}
};