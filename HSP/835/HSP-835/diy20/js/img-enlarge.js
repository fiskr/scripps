// JS for Image Enlarge

if( typeof(SNI.DIY) == "undefined" ) {
	SNI.DIY = {};
}

(function ($) {
	
	var ImageEnlarge = function() {

		o = this;
		
		o.init = function(element, config) {
			config = $.extend({
				clickCtrl: ".img-enlarge",
				insertPoint: element,
				imgFrame: "#blow-up",
				closeCtrl: "#blow-up a.close",
				closeCtrlBtn: "#blow-up a.close-btn"
			}, config);	

			$(config.clickCtrl).click(function() {
				$(config.imgFrame).remove();
				$(config.insertPoint).prepend(SNI.DIY.ImageEnlarge.htmlImage(this.href));
				$(config.closeCtrl).click(SNI.DIY.ImageEnlarge.closeImg);
				$(config.closeCtrlBtn).click(SNI.DIY.ImageEnlarge.closeImg);
				return false;
			});
		};

		o.htmlImage = function (imgURL) {
			retHTML =	"<div id='blow-up' class='clrfix'><div class=\"flyout fxlg\"><div class=\"fly-hd\"></div>";
			retHTML += 	"<div class=\"fly-bd\"><a class=\"close\" href=\"#\"></a><img width='616' src='" + imgURL + "'>";
			retHTML += 	"<p class=\"blow-up-btn clrfix\"><a href=\"#\" class=\"button close-btn\"><span>Close</span></a></p>";
			if ((typeof pgalurl) != "undefined") {
				retHTML += "<span class='pgal-link'>or <a href='" + pgalurl + "'>Go to Photo Gallery</a></span>";
			}
			retHTML += "</div><div class=\"fly-ft\"></div></div></div>";
			return retHTML;
		};

		o.closeImg = function(e)	{
			$(this).parents().find("#blow-up").remove();
			return false;
		};
	};
	
	SNI.DIY.ImageEnlarge = new ImageEnlarge;
	
}) (jQuery);


