SNI.DIY.GalleryLibrary = {
	itemsPerPage: 8,
	columnsPerPage: 4,
	// galleryLinkTitle: 'Photo Galleries',
	galleryUrl: '/diy/feeds/landing-content/json/0,,DIY_',
	itemTitle: 'Photos',
	errorMessage: 'Sorry we could not load the photo galleries.',

	init: function(sectionUrl) {
		this.sectionUrl = sectionUrl;
		this.loadSections();
	},
	
	loadSections: function() {
		var gl = this;

		gl.showLoading();

		$.ajax({
			dataType: 'script',
			url: gl.sectionUrl,
			success: function(result) {
				gl.hideLoading();
				
				// update the section list
				if( typeof(sections) == "object" ) {
					var html = '<ul>';
					
					$.each(sections['items'], function(key, value) {
						html += '<li>';
						html += '<a href="#" data-section="' + key + '" title="' + value + '">' + SNI.Util.truncate(value, 21) + '</a>';
						html += '</li>';
					});
					
					html += '</ul>';
					html = $(html);
					
					$('a', html).click(function() {
						var items = $('.gallery-library .items');
						$('.viewing', items).html('&nbsp;');
						$('.pagination', items).html('&nbsp;');

						gl.loadGallery($(this).attr('data-section'), 1);						
						return false;
					});
					
					$('.gallery-library .sections').html(html);
					
					// activate the first section
					if (sections['default']) {
						$(".gallery-library .sections ul a[data-section='" + sections['default'] + "']").click();
					} else {
						$('.gallery-library .sections ul a:first').click();
					}
				}				
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$('.gallery-library .sections').html('<ul></ul>');
				gl.showError();
			}
		});
	},
	
	loadGallery: function(sectionId, page) {
		var gl = this;
		
		gl.abortPreviousRequests();
		gl.showLoading();
		
		// highlight the correct section
		var sections = $('.gallery-library .sections ul a');
		sections.removeClass('selected');
		sections.filter("[data-section='" + sectionId + "']").addClass('selected');
		
		gl.xhr = $.ajax({
			// data: 't=p&p=' + page + '&s=' + sectionId,
			dataType: 'script',
			url: gl.buildGalleryUrl(sectionId, page),
			success: function(result) {
				gl.hideLoading();

				if( typeof(gallery) == "object" ) {
					gl.updateViewing(gallery.current_page, gallery.total_pages, gallery.total_items, gallery.gallery_link, gallery.gallery_text);
					gl.updateThumbs(gallery.items);
					gl.updatePagination(gallery.current_page, gallery.total_pages);
				}				
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				gl.showError();
			},
			complete: function(request, textStatus) {
				gl.xhr = null;
			}
		});
	},
	
	updateViewing: function(currentPage, totalPages, totalItems, galleryLink, sectionTitle) {
		var gl = this;

		var start = currentPage == 1 ? 1 : (gl.itemsPerPage * (currentPage-1) + 1);
		var end = currentPage == totalPages ? totalItems : start + gl.itemsPerPage - 1;
		
		var html = start + '-' + end + ' of ' + totalItems;
		html += ' ' + sectionTitle + ' Photo Galleries';
		
		$('.gallery-library .items .viewing').html(html);
	},
	
	updateThumbs: function(items) {
		var gl = this;

		var count = 1;
		var html = '<ul>';

		$.each(items, function(key, value) {
			if (count % gl.columnsPerPage == 0) {
				html += '<li class="last">';
			} else {
				html += '<li>';
			}
			
			html += '<em>(' + value.count + ' ' + gl.itemTitle + ')</em>';
			html += '<a href="' + value.link + '"><img src="' + value.thumb + '" width="120" height="90" alt="' + value.alt_text + '" /></a>';
			html += '<a href="' + value.link + '">' + SNI.Util.truncate(value.title, 50) + '</a>';
			
			html += '</li>';
			count++;
		});

		// fill the remaining blocks with blanks
		for (var i=count; i<=gl.itemsPerPage; i++) {
			if (i % gl.columnsPerPage == 0) {
				html += '<li class="last"></li>';
			} else {
				html += '<li></li>';
			}
		}
		
		html += '</ul>';
		
		$('.gallery-library .items .thumbs').html(html);	
	},
	
	updatePagination: function(currentPage, totalPages) {
		var gl = this;

		var html = '<div class="pagi clrfix">';
		
		// print the 'previous' link/text
		if (currentPage > 1) {
			html += '<a class="nextprev prev" href="#">&laquo; Previous</a> ';
		} else {
			html += '<span class="nextprev prev">&laquo; Previous</span> ';
		}
		
		// if we're under 10 pages then we don't need special formatting
		if (totalPages < 10) {
			html += gl.getPaginationHtml(1, totalPages, currentPage, totalPages);
			
		// special formatting with dots to show nor more than 9 page numbers
		} else {
			
			if (currentPage < 6) {
				html += gl.getPaginationHtml(1, currentPage+2, currentPage, totalPages);
			} else {
				html += gl.getPaginationHtml(1, 2, currentPage, totalPages);
				html += '<span>...</span>';
				html += gl.getPaginationHtml(currentPage-2, currentPage+2, currentPage, totalPages);
			}

			if (currentPage < totalPages-4) {
				html += '<span>...</span>';
				html += gl.getPaginationHtml(totalPages-1, totalPages, currentPage, totalPages);
			} else {
				html += gl.getPaginationHtml(currentPage+3, totalPages, currentPage, totalPages);
			}			
		}
		
		// print the 'next' link/text
		if (currentPage < totalPages) {
			html += '<a class="nextprev next" href="#">Next &raquo;</a>';
		} else {
			html += '<span class="nextprev next">Next &raquo;</span>';
		}
		
		html = $(html);
		
		// setup pagination links
		var sectionId = $('.gallery-library .sections ul a.selected').attr('data-section');
		
		$('a.prev', html).click(function() {
			gl.loadGallery(sectionId, currentPage-1);
			return false;
		});
		
		$('a.next', html).click(function() {
			gl.loadGallery(sectionId, currentPage+1);
			return false;
		});
		
		$('a.page', html).click(function() {
			gl.loadGallery(sectionId, $(this).text());
			return false;
		});

		$('.gallery-library .items .pagination').html(html);
	},
	
	getPaginationHtml: function(fromPage, toPage, currentPage, totalPages) {
		var html = '';

		for (var i=fromPage; i<=toPage; i++) {
			
			// make sure we're not out of range
			if (i > 0 && i <= totalPages) {
				if (i == currentPage) {
					html += '<span class="current">' + i + '</span> ';
				} else {
					html += '<a href="#" class="page">' + i + '</a> ';
				}
			}
		}
		
		return html;
	},
	
	showError: function() {
		var gl = this;

		var html = $('<div class="viewing">&nbsp;</div><div class="thumbs"><div class="error"><strong>' + gl.errorMessage + '</strong><br />We are working to correct this. <a href="#">Please try again.</a></div></div><div class="pagination">&nbsp;</div>');
		
		$('a', html).click(function() {
			var selected = $('.gallery-library .sections ul a.selected');
			
			if (selected.length > 0) {
				selected.click();
			} else {
				gl.loadSections();
			}
			
			return false;
		});
		
		gl.hideLoading();
		
		$('.gallery-library .items').html(html);
	},
	
	showLoading: function() {
		$('.gallery-library .items .thumbs').html('<div class="loading">Loading Galleries</div>');
	},
	
	hideLoading: function() {
		$('.gallery-library .items .loading').remove();
	},
	
	buildGalleryUrl: function(sectionId, page) {
		return this.galleryUrl + sectionId + '_ARTICLE_' + this.itemsPerPage + '_' + page + '_IMAGE_ARTICLE-PHOTO-GALLERY_BC-PHOTO-GALLERY.json';
	},
	
	abortPreviousRequests: function() {
		if (this.xhr) { 
			this.xhr.abort(); 
		}
	}
};
