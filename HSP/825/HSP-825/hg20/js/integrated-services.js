
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

if( typeof(SNI.HGTV.IS)=='undefined' ) {
	SNI.HGTV.IS = {};
}

/* FaceBook Like */

SNI.HGTV.IS.FB = {};

SNI.HGTV.IS.FB.like = function(config) {
    config = $.extend({
        'layout':'button_count',
        'show_faces':'true',
        'width' : '50',
        'font':'trebuchet ms',
        'colorscheme':'light'
    }, config);

    return SNI.IS.FB.like(config);
};

/* FaceBook Share */
/* can define a share call here */
