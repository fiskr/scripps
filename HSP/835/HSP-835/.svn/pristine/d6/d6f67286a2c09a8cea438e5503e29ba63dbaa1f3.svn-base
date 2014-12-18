// styled drop down list code - jford
(function($) {
	
$.widget("ui.dropdown", {
	_init: function() {
		this.options.title = this.options.title || this.element.find('option.select-title').text();

		// this.element.addClass("ui-dropdown");

		// build the dropdown list
		this.list = $.ui.dropdown.buildList(this.element, this.options);
		this.element.after(this.list);

		// save original css values
		this.css = {
			position: this.element.css('position'),
			left: this.element.css('left')
		};

		// hide the select
		this.element.hide();

		if (this.element.attr('disabled')) {
			this.disable();
		} else {
			this.enable();
		}
	},
	
	enable: function() {
		var $this = this;
		
		this.options.disabled = false;
		
		// enable the form element and visual select
		this.element.removeAttr('disabled');
		this.list.find('.disabled').removeClass('disabled');

		var handle = this.list.find('dt a');

		// show the dropdown list when clicked
		handle.mousedown(function() {
			$.ui.dropdown.hideDropDowns();
			$this.list.find('.fly-dd').show();
			$(this).parent('.fly-dt').addClass('active');
			$('body').bind("mousedown", $.ui.dropdown.bodyClicked);
			return false;
		});

		return this.element;
	},
	
	disable: function() {
		this.options.disabled = true;
		
		this.element.attr('disabled', 'disabled');
		this.list.find('dt').addClass('disabled');

		var handle = this.list.find('dt a');
		handle.unbind('mousedown');

		return this.element;
	},
	
	destroy: function() {
		// this.element.removeClass("ui-dropdown ui-dropdown-disabled").removeData("dropdown");
		this.element.removeData("dropdown");
		this.list.remove();
		this.element.show();
	},
	
	select: function() {
		if (this.element.get(0).selectedIndex > -1) {
			var html = '<em></em><span>' + this.element.get(0)[this.element.get(0).selectedIndex].text + '</span>';
			this.list.find('.fly-dt a').html(html);
		}
	}
});

$.ui.dropdown.buildList = function(element, options) {
	select = element.get(0);
	option = select.selectedIndex > -1 ? select[select.selectedIndex] : false;
	//tabindex = $(select).attr('tabindex');
	var selected = option ? option.text : '';
	
	// build drop down list
	var classNames = 'ui-dropdown ' + element.get(0).className;
	var ddList = '<dl class="' + classNames + '">';
	//ddList += tabindex ? ' tabindex="' + tabindex + '">' : '>';
	ddList += options.disabled ? '<dt class="fly-dt disabled">' : '<dt class="fly-dt">';
	ddList += '<a><em></em><span>' + selected + '</span></a></dt>';
	
	var ddClassName = options.ddClassName ? options.ddClassName + ' fly-dd ' : 'fly-dd ';
	
	ddList += '<dd style="display: none;" class="' + ddClassName + '">';
	ddList += '<div class="fly-hd"></div>';
	ddList += '<div class="fly-bd">';
	ddList += '<a class="close"></a>';

	if (options.title) {
		ddList += '<h3>' + options.title + '</h3>';
	}

	ddList += '</div>';
	ddList += '<div class="fly-ft"></div>';
	ddList += '</dd>';
	ddList += '</dl>';

	ddList = $(ddList);

	// bind event to the close icon
	ddList.find('.close').click(function() {
		$.ui.dropdown.hideDropDowns();
		return false;
	});

	// add select options
	var list = $('<ul class="fly-ul"></ul>');
	element.children('option:not(.select-title)').each(function(index){
		var linkText = $(this).text();
		var link = $('<a href="#">' + linkText + '</a>');
		
		var isSelected = element[0].options[element[0].selectedIndex].text == linkText;

		// change the selected list item
		link.click(function() {
			$('li', list).removeClass("selected");
			$(this).parent().addClass("selected");
						
			// only trigger if it's not selected already
			// var selectedText = element[0].options[element[0].selectedIndex].text;
			// if (selectedText != linkText) {
			if (!isSelected) {
				ddList.find('.fly-dt a').html('<em></em><span>' + linkText + '</span>');
				element.find('option:not(.select-title)')[index].selected = true;

				$.ui.dropdown.hideDropDowns();

				// trigger change event so other code can hook into this
				element.trigger('change');
			} else {
				$.ui.dropdown.hideDropDowns();
			}

			return false;
		});

		var item = $('<li class="fly-li' + (isSelected ? ' selected' : '') + '"></li>').append(link);
		list.append(item);
	});

	ddList.find('.fly-bd').append(list);

	return ddList;
};

$.ui.dropdown.hideDropDowns = function(event) {
	$('dl.ui-dropdown .fly-dd').hide();
	$('dl.ui-dropdown .active').removeClass('active');
	$('body').unbind("mousedown", $.ui.dropdown.bodyClicked);

	return true;
};

$.ui.dropdown.bodyClicked = function(event) {
	var element = $(event.target);
	if (element.parents().is('.ui-dropdown')) {
		return false;
	}
	
	$.ui.dropdown.hideDropDowns();
};

$.ui.dropdown.defaults = {
	title: '',
	disabled: false,
	ddClassName: 'flyout'
};

})(jQuery);

