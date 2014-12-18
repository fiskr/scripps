SNI.DIY.ProjectsBySpace = function(carouselElement, carouselOptions, dropdownElement, json, moduleName) {
	var dropdown = $(dropdownElement).dropdown();
	var carousel = SNI.Common.Carousel(carouselElement, carouselOptions);

	$(dropdown).change(function() {
		var content = null;
		
		if (json[this.value] && (content = json[this.value].content)) {
			
			var html = '<ul>';
			
			$.each(content, function(index, item) {
				var title = item[0];
				var link  = item[1];
				var image = item[2];
				var alt   = item[3];
				var rel   = 'pbs-' + (index+1);
				
				html += '<li>';
				html += '<a href="' + link + '" rel="' + rel + '"><img src="' + image + '" width="160" height="120" alt="' + alt + '" /></a>';
				html += '<p><a href="' + link + '" rel="' + rel + '">' + title + '</a></p>';
				html += '</li>';				
			});
			
			html += '</ul>';
			html += '<p class="more"><a href="' + json[this.value].more[1] + '" rel="pbs-more">' + json[this.value].more[0] + '</a></p>';
			
			$(carousel).html(html);
			SNI.Common.Carousel(carouselElement, carouselOptions);
			
			var selectedSpace = dropdown[0].options[dropdown[0].selectedIndex].text;
			SNI.DIY.Omniture.ClickTrack(carousel, moduleName + ' (' + selectedSpace + ')');
		}
	});
};
