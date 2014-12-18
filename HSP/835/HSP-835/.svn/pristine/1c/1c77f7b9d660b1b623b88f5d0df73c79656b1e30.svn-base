/* CHRIS ENGLE'S FLYOUT.  FROM FOOD */

(function($) {
	$.HGTV.initFlyoutPanel = function(options) {
		var defaults = {
			numOriginal						: 3,
			hiddenListClassName				: '',
			panelHeight						: 0,
			panelWrapClassName				: '',
			panelBtnCloseClassName			: '',
			panelTitleClassName				: '',
			panelContentClassName			: ''
		};
		var options = $.extend(defaults, options);
		var showOnly = options.numOriginal;
		
		return this.each(function(i) {
			var lists = this.getElementsByTagName('ul');
			var titles = this.getElementsByTagName("h5");
			var makeMoreButton = function(number, text) {
				var newSpan = document.createElement("span");
				newSpan.innerHTML = '<a href="javascript: void(0);">More ' + text + '</a> (' + number + ')';
				return newSpan;
			}
			var moreBtnTextFromGroupTitle = function(titleElement) { return titleElement.innerHTML.replace(/:/g, ''); }
			for(var i = 0; i < lists.length; i++) {
				var qty = lists[i].getElementsByTagName('li').length;
				if(qty > showOnly) { // ...that has elements to hide:
					var extra = qty - showOnly;
					for(var k = showOnly; k < qty; k++){ // cycle through EXTRA li elements:
						$(lists[i].getElementsByTagName('li')[k]).addClass(options.hiddenListClassName);
					}
		
					/* set up two column classes: ***************************************************************/
					var col1Qty = Math.ceil(qty / 2);
					var col2Qty = qty - col1Qty;
					var newList = new Array();
					var newUL = lists[i].cloneNode(false);
					for (var m=0; m < qty; m++) {
						newList[$(lists[i].getElementsByTagName("li")[m]).text()] = lists[i].getElementsByTagName("li")[m].innerHTML;
						/* is this the first in a column? */
						if (m == col1Qty) {
							/* this is the first row of either the first or second column */
							$(lists[i].getElementsByTagName('li')[m]).addClass('col-start');
						}
						if (m < col1Qty) {
							$(lists[i].getElementsByTagName('li')[m]).addClass('col-1');
						} else {
							$(lists[i].getElementsByTagName('li')[m]).addClass('col-2');
						}
					}
					/***************************************************************/
					newList = $.sniUtil.sortAssocArray(newList).sort();
					for (var m=0; m<newList.length; m++) {
						var newLIContainer = lists[i].getElementsByTagName('li')[m].cloneNode(false);
						newLIContainer.innerHTML = newList[m];
						newUL.appendChild(newLIContainer);
					}
					
					var lih = $(lists[i].getElementsByTagName('li')[0]).height();
					var lipt = parseInt($(lists[i].getElementsByTagName('li')[0]).css('padding-top'));
					var lipb = parseInt($(lists[i].getElementsByTagName('li')[0]).css('padding-bottom'));
					var limt = parseInt($(lists[i].getElementsByTagName('li')[0]).css('margin-top'));
					var limb = parseInt($(lists[i].getElementsByTagName('li')[0]).css('margin-bottom'));
					var lith = lih + lipt + lipb + limt + limb;
					
					// create 'more' button
					var moreButton = makeMoreButton(qty, moreBtnTextFromGroupTitle(titles[i]));
					this.insertBefore(moreButton, lists[i].nextSibling);
					
					var lHeight = 18;
					
					// give 'more' button reference to associated ul element:
					btnMore = moreButton.getElementsByTagName('a')[0];
					btnMore.contentObj = newUL;
					// put click handler onto 'more' button
					// get offset:
					btnMore.offset = $(moreButton).offset();
					btnMore.qty = qty;
					btnMore.lh = lHeight;
					btnMore.lith = lith;
					btnMore.optionsHeight = options.panelHeight;
					btnMore.panelWrapClassName = options.panelWrapClassName;
					btnMore.panelBtnCloseClassName = options.panelBtnCloseClassName;
					btnMore.panelTitleClassName = options.panelTitleClassName;
					btnMore.panelContentClassName = options.panelContentClassName;
					btnMore.onclick = function() {
						var pHeight = (Math.ceil(this.qty) * this.lh);
						//alert(pHeight+":"+this.lh);
						var pAllowScale = false;
						//if (this.optionsHeight < pHeight) {
						//	pHeight = this.optionsHeight;
						//	pAllowScale = true;
						//}
						
						if ( this.qty > 7 ) {
							pAllowScale = true;
						}
						
						$(this).flyoutPanel({
							title: this.innerHTML,
							contentObj: this.contentObj,
							x: (this.offsetLeft + this.offsetWidth + 30),
							y: (this.offsetTop - 4),
							w: 333,
							h: this.optionsHeight,
							numLI: this.qty,
							maxLI: 7,
							liTotalHeight: this.lith,
							allowScroll: pAllowScale,
							wrapClassName: this.panelWrapClassName,
							btnCloseClasnName: this.panelBtnCloseClassName,
							titleClassName: this.panelTitleClassName,
							contentClassName: this.panelContentClassName
						});
						return false;
					}
				} // else do nothing
			}
		});
	};
})(jQuery);


/* Validation plugin */
(function($) {
	$.HGTV.flyoutPanel = function(options) {
		var defaults = {
			title				: '',		// string to use as panel heading
			contentStr			: '',		// html (or text) string to write into container
			contentObj			: null,		// dom element to insert into container
			h					: 0,		// height in pixels
			x					: 0,		// x poisition in pixels
			y					: 0,		// y position in pixels
			allowScroll			: false,	// allow scrollbars if needed to display content? (boolean)
			targetId			: '',		// ID (string) of element to insert panel into; defaults to BODY if none specified
			wrapClassName		: '',
			btnCloseClassName	: 'dpl-panel-close',
			titleClassName		: '',
			contentClassName	: '',
			numLI				: 0,
			maxLI				: 0,
			liTotalHeight		: 0
		};
		var options = $.extend(defaults, options);
		return this.each(function(i) {
			/* first try and remove the flyout panel */
			try { if (options.targetId == '') { document.body.removeChild($.sniFlyoutContainer); } else { document.getElementById(options.targetId).removeChild($.sniFlyoutContainer); } } catch(e) {}
			// outer-most container:
			var pWrap = document.createElement('div');
			$.sniFlyoutContainer = pWrap;
			
			pWrap.className = 'panelWrap';
			
			
			pWrap.style.left = options.x + 'px';
			pWrap.style.zIndex = $.sniUtil.getHighestZIndex() + 1;
			
			var outputContainer = pWrap.appendChild(document.createElement('div'));
			
			outputContainer.className = options.wrapClassName;
	

			// title:
			var title = outputContainer.appendChild(document.createElement('div'));
			title.className = options.titleClassName;
			title.innerHTML = options.title;
	
			// close button:
			var btnClose = outputContainer.appendChild(document.createElement('a'));
			btnClose.title = 'close';
			btnClose.href = 'javascript: void(0);';
			btnClose.className = options.btnCloseClassName;
			btnClose.onclick = function() {
				document.body.removeChild($.sniFlyoutContainer);
				return false;
			}
			
			var footer = pWrap.appendChild(document.createElement('div'));
			footer.className = 'panel-footer';
		
			// content area:
			var contentArea = footer.appendChild(document.createElement('div'));
			contentArea.className = options.contentClassName;
			
			//if ( options.h != 0 ) {
			//	contentArea.style.height = options.h + 'px';
			//}
			if ( options.numLI > options.maxLI ) {
				contentArea.style.height = options.h + 'px';
			} else {
			}

			if ( options.allowScroll ) {
				contentArea.style.overflowY = 'auto';
				contentArea.style.overflowX = 'hidden';
			} else {
				contentArea.style.overflow = 'hidden';
			}
			/* insert string or appendChild? */
			if ( options.contentObj != null ) {
				contentArea.appendChild(options.contentObj);
			} else {
				contentArea.innerHTML = options.contentStr;
			}
			// add where?
			if ( options.targetId == '' ) {
				document.body.appendChild(pWrap);
			} else {
				document.getElementById(options.targetId).appendChild(pWrap);
			}
			var viewportHeight = $(window).height();
			var scrollTop = $.sniUtil.getScrollXY()[1];
			var viewportBottomY = scrollTop + viewportHeight;
			/* get max y offset to still fit panel on current viewport */
			var containerMaxTopY = (viewportBottomY - (pWrap.offsetHeight + 10));
			/*
				panel goes past bottom of viewport so use our max top y value
				(only if panel itself is not taller than viewport)
				otherwise panel is taller than viewport (does not fit)
				OR the panel does fit, so use original y offset value
			*/
			if (options.y > containerMaxTopY && options.h <= viewportHeight) {
				pWrap.style.top = containerMaxTopY + 'px';
			} else {
				pWrap.style.top = options.y + 'px';
			}
			if(options.allowScroll) {
				contentArea.style.width = (contentArea.offsetWidth - 10) + 'px';
				var theUL = pWrap.getElementsByTagName('ul')[0];
				if (theUL) theUL.style.paddingRight = '0px';
			}
		});
	};
})(jQuery);





function hgliteInitFlyout(){
	// initialize filters flyout panel
	$('#hgFilters').initFlyoutPanel( {
		numOriginal: 3,
		hiddenListClassName: 'extra',
		panelHeight: 165,
		panelWrapClassName: 'dpl-panel-popup-container2',
		panelBtnCloseClassName: 'dpl-panel-close',
		panelTitleClassName: 'dpl-panel-title',
		panelContentClassName: 'dpl-panel-content-area'
	});
}
