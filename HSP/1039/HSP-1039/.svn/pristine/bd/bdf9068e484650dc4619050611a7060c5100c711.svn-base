
SNI.HGTV.ViewSliderTP  = (function(){
    function ViewSlider() {
        this.updateImageList = function(){
            this.images = this.images.not('[src]');
            return this.images;
        };

        this.monitorScroll = function(){
            var sliding_window = this;
            var slider = sliding_window.slider;
            sliding_window.images = slider.find('img').not('[src]');

            if (sliding_window.images.length > 0) {
                slider.scroll(function(e){

                    sliding_window.images.each(function(i) {
                        var $this = jQuery(this);
                        
                        if (($this.offset().left - slider.offset().left) <= slider.width()) {
                            SNI.HGTV.LazyImage.load($this);
                            sliding_window.updateImageList();
                        }
                    });
                });
            }
        };

        this.calculateBodyWidth = function(slider_body){
            slider_body = slider_body || sliding_window.slider.children('ul');
            var total_body_width = 0;
            slider_body.children('li').each(function(i){
                var $this = $(this);
                var list_item_width = $this.outerWidth() + parseInt($this.css('margin-left'), 10) + parseInt($this.css('margin-right'), 10);
                total_body_width = total_body_width + list_item_width;
            });
            return total_body_width;
        };

        this.init = function(element, addWidth){
            var sliding_window = this;
            var slider = element || jQuery('.view-slider');
			
			if (!addWidth) {
				addWidth = 0;
			}
			
            sliding_window.slider = slider;
            slider.addClass("view-slider-setup");
            sliding_window.images = slider.find('img').not('[src]');
            var slider_body = slider.children('ul');
            var slider_body_width = sliding_window.calculateBodyWidth(slider_body);

            // Set the width of the UL if it doesn't match the calculated width
            if (slider_body.width() !== slider_body_width) {
                slider_body.width(slider_body_width + addWidth);
            }

            // initial image load
            sliding_window.images.each(function(i){
                var $this = jQuery(this);

                if ($this.position().left <= sliding_window.slider.width()){
                    SNI.HGTV.LazyImage.load($this);
                }
            });
            sliding_window.updateImageList();
            
            sliding_window.monitorScroll();

       //     return sliding_window;
        };
    }
	
    return {
        init: function(element, addWidth) {
            var view_slider = new ViewSlider();
            view_slider.init(element, addWidth);
            return view_slider;
        }
    };
})();


SNI.HGTV.ActiveScroll = (function() {

	// Private jquery DOM reference to the HTML root 
	// of the ActiveScroll widget:
	var rootElement ;
	
	// A collection of jQuery node selected using the ".featured" class
	// The randomization of the active chef will be done in this set
	// of featured items.
	// Featured items are marked with the "featured" class at HTML level.
	var featuredItems ;
	
	// List of items
	var itemList ;
	
	var currentActiveElement ;
	
	var _getInitialActiveItem = function() {
		
		var activeItem ;

		if((typeof(featuredItems) === "object") && (featuredItems.length>0)) {
			
			// If we have at least one featured item,
			// we randomly select one beyond the set of featured items:
			activeItem = $(featuredItems[Math.floor(Math.random() * (featuredItems.length))]) ;
		}
		else {
			
			// Otherwise, we fallback by taking the first one in HTML:
			activeItem = itemList.eq(0);
		}
	
		return activeItem;
	};
	
	// Private callback when an item pod is clicked:
	var _onItemPodClick = function(evt) {
		
		var allowDefaultBehavior = true;
		
		// Normalization for event delegation, we want the clicked item 
		// to have the "item" CSS class: 
		var clicked = $(evt.target);
		if(!clicked.hasClass("item")) {
			clicked = clicked.parents(".item").eq(0);
		}
		
		if(!clicked.hasClass("active")) {
			
			// The clicked item is not in an active state,
			// we will scroll it to the center of the carousel.
			
			var activeItem = rootElement.find(".active") ;
			activeItem.removeClass('active');
			clicked.addClass('active');
			
			//begin scroll:
			rootElement.scrollTo(clicked, {
				duration: 150,
				// An active item pod has a 303px width.
				// Check CSS selector: ".view-slider ul li.active" 
				 offset: -153	
			});
						
			// Clicked item was not active, so we want to move the carousel on the clicked element
			// instead of having the basic browser behavior (following hyperlinks or img redirections)
			allowDefaultBehavior = false;
		}
		
		return allowDefaultBehavior ;
	};
	
	var initActiveScrollBehavior = function() {
		
		var activeItem = _getInitialActiveItem() ;
		currentActiveElement = activeItem;
		
		activeItem.addClass("active");
		rootElement.scrollTo(activeItem, 350, {offset:-153});
		
		// Get the item and use event delegation for triggering the scroll:
		itemList.parent().click(_onItemPodClick);
	};
	
	return {
		init: function(jqueryRootElement, addWidth) {
			
			// Cache the jQuery root element: 
			rootElement = jqueryRootElement ;
			
			// Cache the list of item:
			itemList = rootElement.find('.item');
			
			// Initialize set of featured items:
			featuredItems = rootElement.find(".featured") ;
			
			// Instantiate abstract ViewSlider object:
			SNI.HGTV.ViewSliderTP.init(rootElement, addWidth);
			
			// Add the ActiveScroll behavior on previously created ViewSlider:
			initActiveScrollBehavior();
			
		} // END init	
	
	}; // END return
})();