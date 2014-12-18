(function($) {

	var oImgEnl = function() {
		var oImgEnl = this;
		var oImgDim = { "vert": {"shr": {"w": "300", "h": "400"}, "enl": {"w": "602", "h": "802"} },
										"hori": {"shr": {"w": "400", "h": "300"}, "enl": {"w": "602", "h": "452"} },
										"sq":   {"shr": {"w": "400", "h": "400"}, "enl": {"w": "602", "h": "602"} } };
		oImgEnl.init = function($alink) {
			$alink.click( function() {
				var $this = $(this);
				var imgType = "hori";
				var w, h, b, p;
				if ($this.parent().hasClass("vert")) {
					imgType = "vert";
				} else if  ($this.parent().hasClass("sq")) {
					imgType = "sq";
				}
				var imgScale = "enl";
				if ($this.parent().hasClass("enl")) { imgScale = "shr"; }
				w = oImgDim[imgType][imgScale].w;
				h = oImgDim[imgType][imgScale].h;
				b = p = 0;
				if (imgScale == "shr") {
					b = 1;
					p = 2;
				}
				$this.children("img").animate( { height: h, width: w, borderWidth: b, padding: p }, {duration: 250, complete: function() {$(this).style="";}} );
				b = p = 0;
				if (imgScale == "shr") {
					w = parseInt(w) + 6;
					h = parseInt(h) + 6;
				}
				$this.find(".vtoggle").hide();
				$this.parent().animate( { height: h, width: w}, {duration: 250, complete: function() {$this.parent().attr("style",""); $this.parent().toggleClass("enl"); $this.find(".vtoggle").attr("style","");}} );
				return false;
			});	
		};
	};

	SNI.ImgEnlarge2 = new oImgEnl;
		
}) (jQuery);
