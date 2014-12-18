
//LEFT-NAV SEARCH FILTERS 
SNI.HGTV.SearchFilter = {

	srchLeftNavFilter: function(){
		var flyout_container = $("<div id='search-flyouts'></div>");
		$("body").prepend(flyout_container);
		
		$("#hg-filters .bd ul").not('.dp-color-srf').each(function(i) {
			var count = $(this).children().size();
			var title = $(this).prev().text();
			var count_diff = parseInt(count - 4);
			
			if (count > 5) {
				$(this).attr("id", "srf-list"+i);
				
				var results = document.createElement("div");
				var $results = $(results);
				$results.addClass("drops").addClass("small").attr("id","flyout"+i);
				$results.html('<div class="hd"> </div><div class="bd"><h3>More ' + title +  ' <a class="close">Close</a></h3><ul id="alpha'+i+'"></ul></div><div class="ft"> </div>');
			
				$(this).children("li").each(function(i) {
					$(this).find("a").click( function(){
						$(this).parents().filter(".drops").hide();
						return true;
					});
					
					if(i <= 3) {
						$(this).clone(true).appendTo($results.find(".bd ul"));
					} else {
						$results.find(".bd ul").append($(this));
					}
				});
				
				$("#srf-list"+i).after('<div id="srf-drop'+i+'"><a class="cta" href="#flyout'+i+'">More ' + title +  '</a> <span>('+count+')</span></div>');
				flyout_container.append(results);
				
				function alphaList($it) {
				    $('#alpha'+i).html(($it.map( function() {
				        return '<li><a href="'+this.href+'">' + this.innerHTML + '</a><span>'+$(this).parent().children("span")[0].innerHTML+'</span></li>';
				    }).get().join('\n') )); 
				}
				alphaList( $('#alpha'+i+' li a').sort( function( a, b ) {
				    return  SNI.HGTV.Util.flyOuts.alphaCompare( a.innerHTML, b.innerHTML );
				}) );
				
				$("#srf-drop"+i).find(".cta").click( function(e) {
					var $fDiv = $("#search-flyouts").find("#flyout"+i);
					var $aDiv = $("#srf-drop"+i).find("a");
					// first hide them all
					hideAll();
					if (jQuery.browser.msie ){ $fDiv.css({background: ""}); }
					// then make sure its in the viewport
					SNI.HGTV.Util.flyOuts.moveToView({
					  object: $fDiv,		
	 				  anchorObj: $aDiv,	
					  pAlign: "right",
					  useLftOffset: 32,
					  useTopOffset: -13,
					  overRideDflt: true		
					});
					// now show it
					$fDiv.fadeIn("fast");	
					$('body').bind("click", function(e){bodyClick(e);});
					return false;
				}).css({cursor: "pointer"});
				
				$("#search-flyouts .drops").find('.close').click( function() {hideAll();}).css({cursor: "pointer"});
			}
		});
				
		function bodyClick(e) {
			var $clicked=$(e.target);
			if ($clicked.is('.cta') || $clicked.parents().is('.drops')) {
				return false;
			} else {
				hideAll();
			  $('body').unbind();
			}
		}
		
		function hideAll() {
			$("#search-flyouts .drops").each(function() {
			  if (jQuery.browser.msie ){ $(this).css({background: "B1B1B1"}); }
			  $(this).fadeOut("fast");
			});
		}
			
	},
	
	init: function(){			
		SNI.HGTV.SearchFilter.srchLeftNavFilter();
	}
};