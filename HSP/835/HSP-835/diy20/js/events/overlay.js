var ftn = (function () {
	
	var navTimer = null,
		navDelay = 500;
	
	return {
		menu : function () {
			var $futonMenu = $("div.futon-menu").find("div.flyout"),
				hd, bd, ft;
			
			hd = "<div class=\"fly-hd\"></div>";
			bd = "<div class=\"fly-bd\"></div>";
			ft = "<div class=\"fly-ft\"></div>";
			
			$futonMenu.wrapInner( bd ).prepend( hd ).append( ft );
			
			$("div.futon-menu").hover(
				function(e) {
					// sub nav mouse enter: set select immediately, no delay; clear pending drop close delays
					clearTimeout( navTimer );
					navTimer = null;
					if ($(this).hasClass("fly-on")) { return; }
					$(this).addClass("fly-on"); 
				},
				function(e) {
					// sub nav tab mouse leave: close drop after delay
					var $this = $(this);
					clearTimeout( navTimer );
					navTimer = null;
					navTimer  = setTimeout( function () {
						$this.removeClass("fly-on");
					}, navDelay );
				}
			);
			
			$("div.futon-menu a.button").click( function () { return false; });
		}
	};
})();