

// JS for Image Enlarge

if( typeof(SNI.HGTV.ImageEnlarge) == "undefined" ) {
	SNI.HGTV.ImageEnlarge = {};
}

SNI.HGTV.ImageEnlarge = {
	clickCtrl: ".img-enlarge",
	insertPoint: "#hg-art-we",
	imgFrame: "#blow-up",
	closeCtrl: "#blow-up a.close",
			
	init: function() {
		$(SNI.HGTV.ImageEnlarge.clickCtrl).bind("click", SNI.HGTV.ImageEnlarge.clickExpand);
	},

	clickExpand: function(e) {
	/* droping the flyout near the thumbnail */
		$(this).parents().filter(".thumb-wrap").before(SNI.HGTV.ImageEnlarge.htmlImage(this.href));
		//$(SNI.HGTV.ImageEnlarge.insertPoint).prepend(SNI.HGTV.ImageEnlarge.htmlImage(this.href));
		$(SNI.HGTV.ImageEnlarge.closeCtrl).bind("click", SNI.HGTV.ImageEnlarge.closeImg);
		return false;
	},

	htmlImage: function (imgURL) {
		retHTML =	"<div id='blow-up' class='clrfix'><div class='bu-hd'></div><div class='bu-bd'><div class='bu-bd-hd'><a class='close' href='#'>Close</a></div><img width='616' src='" + imgURL + "'><div class='bu-bd-ft clrfix'><!--[if IE]><center><![endif]-->";
		retHTML += "<p class='clrfix'><a class='close button' href='#'><span>Close</span></a>";
	
		if ((typeof pgalurl) != "undefined")
		{
			retHTML += "<span class='pgal-link'>or <a href='" + pgalurl + "'>Go to Photo Gallery</a></span>";
		}
		retHTML += "</p><!--[if IE]></center><![endif]--></div></div><div class='bu-ft'></div>";
		return retHTML;
	},

	closeImg: function(e)	{
		$(SNI.HGTV.ImageEnlarge.imgFrame).remove();
		return false;
	}
	
};

