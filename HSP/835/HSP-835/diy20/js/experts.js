SNI.DIY.Experts = function(element, config) {

		// prime the toggles for the video channels
		var togglelist = $("#featured li .projectlist");
	

		togglelist.each(function(){
								 
			var $this = $(this);

			// click target for li toggle
			var target = $this.find(".moreoptions");
			var pane = $this.find(".pane");

			target.click(function(){
				target.css("display", "none");							  
				pane.show("fast");
			});

		});

		// adjust heights
		var featured = $("#featured").height();
		var expertlist = $("#expertlist").height(featured);

};