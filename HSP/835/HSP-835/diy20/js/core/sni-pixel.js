/**
 * Loads 3rd-party tracking pixel script asynchronously.
 * @author Matt Heisig : 10/27/2011
 * @param {String} url Absolute path to tracking script
 */
if( typeof(SNI.Pixel) === "undefined" ) {
	SNI.Pixel = {};
}


SNI.Pixel.init = function(url) {
    if (url) {
        SNI.Pixel.asyncLoad(url);
    }
    /* TODO: Might want more error handling here -- check for valid URL */
};


SNI.Pixel.asyncLoad = function(url) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = url;

		var x = document.getElementsByTagName('script')[0];
		x.parentNode.insertBefore(s, x);
    
};

