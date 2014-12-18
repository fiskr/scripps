SNI.DIY.Carousel = function(element, config) {
	/* call the common function from here - can add DIY specific code if neccesary */
	/* the common function can be accessed directly */
	SNI.Common.Carousel(element, config);

	$(window).load(function() {
		// executes when complete page is fully loaded, including all frames, objects and images
			// fix IE caption issue
			$("#pgallery .largeImage .imgpanel").css("left", "1px");
			$("#pgallery .largeImage .imgpanel").css("bottom", "1px");
			$("#pgallery .jcarousel-clip").css("position", "relative");
	});
};

// uses a carousel as thumbnails that activate larger photos when clicked
SNI.DIY.CarouselGallery = function(carousel, options, photos) {
	var $authors = $(carousel+" .authors .author");
	carousel = SNI.Common.Carousel(carousel, options);
	photos = $(photos);
	var listItems = $('.crsl-group li', carousel);
	
	$('a', listItems).click(function() {
		var link = $(this);
		var item = link.parent().parent('li');
		var index = listItems.index(item);
		var photo = $(photos.get(index));
                var photoId = $("img", photo).attr("id").split("-")[1];
                var author = $("#author-"+photoId);

		if (photo && photo.is(':hidden')) {		
			listItems.removeClass('active');
			item.addClass('active');
			photos.filter(':visible').fadeOut();
			photo.fadeIn();
		}
                if(author && author.is(':hidden')) {
                    $authors.removeClass("active");
                    author.addClass("active");
                    $authors.filter(':visible').hide();
                    author.fadeIn("fast");
                }

		return false;
	});

};
