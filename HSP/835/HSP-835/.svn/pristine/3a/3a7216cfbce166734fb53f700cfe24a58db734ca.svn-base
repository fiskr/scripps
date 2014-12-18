SNI.DIY.Photogallery = function(element, config) {
		config = $.extend({
					crsl_class: ".crsl-media"
				}, config);	
		


		// prime the toggles for the video channels
		togglelist = $(element).find('li.switch');


		togglelist.each(function(){

			var $this = $(this);

			// click target for li toggle
			var target = $this.find("h4");



			// hide carousel if active class not present
			if (!$this.hasClass("active")) {
				$this.find(config.crsl_class).hide();
			};

			target.click(function(){
				if ($this.hasClass("active")) {
					$this.removeClass("active");
					$this.find(config.crsl_class).hide(250);
				} else {
					$this.addClass("active");
					$this.find(config.crsl_class).show(250);
				}


			});


		});


};