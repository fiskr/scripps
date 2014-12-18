// drop-down (fly-out) interaction ("Browse Designer Rooms" and "Section Design Styles" LR modules)
// refactored to encapsulate jQuery $ 

(function($) {

	var Drops = function() {

		this.init = function($eDrop, $eLnk) {
			$eLnk.click( function() {
				if ($eLnk.hasClass("sel")) { 
					$eDrop.find(".close").trigger("click");
				} 
				else {
					$("body").trigger("click.drops_out");
					$eLnk.addClass("sel");
					$("body").bind( "click.drops_out", function(ev) { 
						if ($(ev.target).parents(".drops, .dd20").length == 0) { 
							$eDrop.find(".close").trigger("click"); 
						}
						return true;
					} );
					$eDrop.show(); 
				}
				return false; 
			}); 
			$eDrop.find(".close").click( function() { 
				$eDrop.hide(); 
				$eLnk.removeClass("sel"); 
				$("body").unbind("click.drops_out");
				return false; 
			}); 
			return;
		};
		
	};
		
	// insert into namespace
	SNI.HGTV.Drops = new Drops;
	
})(jQuery);
