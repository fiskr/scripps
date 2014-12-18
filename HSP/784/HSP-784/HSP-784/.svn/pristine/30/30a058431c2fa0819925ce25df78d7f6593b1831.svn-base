// styled drop down list code - jford
//(function($) {

// If the UI scope is not available, add it
$.ui = $.ui || {};

$.fn.extend({
	dropdown: function(options, data) {
		if (navigator.userAgent.match(/iPhone|android|blackberry/i)) {
			return;
		}

		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			if (typeof options == "string") {
				var dropdown = $.data(this, "ui-dropdown");
				dropdown[options].apply(dropdown, args);
				// INIT with optional options
			} else if (!$(this).is(".ui-dropdown")) {
				$.data(this, "ui-dropdown", new $.ui.dropdown(this, options));
			}
		});
	}
});

$.ui.dropdown = function(container, options) {
	this.element = $(container);
	this.options = options = $.extend({}, $.ui.dropdown.defaults, options);
	this.options.title = this.options.title || this.element.find('option.select-title').text();

	this.element.addClass("ui-dropdown");

	// build the dropdown list
	this.list = buildList(this.element, this.options);
	this.element.after(this.list);

	// save original css values
	this.css = {
		position: this.element.css('position'),
		left: this.element.css('left')
	};

	// hide the select
	this.element.hide();
	// this.element.css({ position: 'absolute', left: '-999em' });

	if (this.element.attr('disabled')) {
		this.disable();
	} else {
		this.enable();
	}

	// TODO: complete the keybooard implementation. The items below work but need all key events working
	this.element.bind('focus', {dropdown: this}, this.activate);
	this.element.blur(hideDropDowns);
	this.element.keydown(function(event) {
		event.preventDefault();
	});
};

$.extend($.ui.dropdown, {
	defaults: {
		title: '',
		disabled: false
	}
});

$.ui.dropdown.prototype = {

	enable: function() {
		var element = this.element;
		var list = this.list;

		this.options.disabled = false;

		// enable the form element and visual select
		this.element.removeAttr('disabled');
		this.list.find('.disabled').removeClass('disabled');

		var handle = this.list.find('dt a');

		// show the dropdown list when clicked
		handle.mousedown(function() {
			hideDropDowns();
			list.find('dd').show();
			$(this).parent('dt').addClass('active');
			$('body').bind("mousedown", bodyClicked);
			return false;
		});

		return element;
	},

	disable: function() {
		this.options.disabled = true;

		this.element.attr('disabled', 'disabled');
		this.list.find('dt').addClass('disabled');

		var handle = this.list.find('dt a');
		handle.unbind('mousedown');

		return this.element;
	},

	// reset the dropdown back to its original state
	destroy: function() {
		this.list.remove();
		this.element.show();
		// this.element.css({position: this.css.position, left: this.css.left});
		this.element.removeClass("ui-dropdown");
		$.removeData(this.element, "ui-dropdown");
	},

	// read the list again and reset all values and hooks
	reset: function() {
		this.list.remove();
		this.options.title = this.element.find('option.select-title').text();
		this.list = buildList(this.element, this.options);
		this.element.after(this.list);
		// this.enable();
	},

	// reads the selected element and sets the value of the dropdown to it
	select: function() {
		var select = this.element.get(0);
		var option = select.selectedIndex > -1 ? select[select.selectedIndex] : false;
		if (option) {
			this.list.find('dt a').html(option.text + '<em></em>');
		}
	},

	activate: function(event) {
		var dropdown = event && event.data ? event.data.dropdown : this;

		if (!dropdown.options.disabled) {
			hideDropDowns();
			dropdown.list.find('dd').show();
			dropdown.list.find('dt').addClass('active');
		}
	}
};

function buildList(element, options) {
	var select = element.get(0);
	var option = select.selectedIndex > -1 ? select[select.selectedIndex] : false;
	//var tabindex = $(select).attr('tabindex');
	var selected = option ? option.text : '';

	// build drop down list
	var ddList = '<dl class="dd-list">';
	ddList += options.disabled ? '<dt class="dd-dt disabled">' : '<dt class="dd-dt">';
	ddList += '<a>' + selected + '<em></em></a></dt>';
	ddList += '<dd style="display: none;">';
	ddList += '<div class="dd-bd box drop half">';
	if (options.title) {
		ddList += '<div class="hd tint"><p>' + options.title + '</p><span></span></div>';
	}	
	ddList += '<div class="bd fill">';

	ddList += '</div>';
	ddList += '</dd>';
	ddList += '</dl>';

	ddList = $(ddList);

	// bind event to the close icon
	ddList.find('.hd span').click(function() {
		hideDropDowns();
		return false;
	});

	// add select options
	var list = $('<ul class="dd-ul single"></ul>');
	element.children('option:not(.select-title)').each(function(i) {
		var link = $('<a href="#">' + $(this).text() + '</a>');

		// change the selected list item
		link.click(function() {
			ddList.find('dt a').html($(this).text() + '<em></em>');
			element.find('option:not(.select-title)')[i].selected = true;

			hideDropDowns();

			// trigger change event so other code can hook into this
			element.trigger('change');

			return false;
		});

		var item = $('<li class="dd-li"></li>').append(link);
		list.append(item);
	});

	ddList.find('.bd').append(list);

	return ddList;
}

function hideDropDowns(event) {
	// don't hide if we're in FF3 or FF2 (Win) and clicking on the scrollbar
	// FF seems to think it's part of the element and registers the clicks on the scrollbar
	if (event && $.browser.mozilla && $(event.target).hasClass('dd-ul')) {
		return true;
	}

	$('.dd-list dd').hide();
	$('.dd-list .active').removeClass('active');
	$('body').unbind("mousedown", bodyClicked);

	return true;
}

function bodyClicked(event) {
	var element = $(event.target);
	if (element.parents().is('.dd-list')) {
		return false;
	} else {
		hideDropDowns();
	}
}

//})(jQuery);


// dropdowns that populate values depending on previous dropdown selection
//(function($) {

// If the UI scope is not available, add it
$.ui = $.ui || {};

$.fn.extend({
	dependent_dropdowns: function(options, data) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			if (typeof options == "string") {
				var dependent_dropdowns = $.data(this, "ui-dependent-dropdowns");
				dependent_dropdowns[options].apply(dependent_dropdowns, args);
				// INIT with optional options
			} else if (!$(this).is(".ui-dependent-dropdowns")) {
				$.data(this, "ui-dependent-dropdowns", new $.ui.dependent_dropdowns(this, options));
			}
		});
	}
});

$.ui.dependent_dropdowns = function(container, options) {
	this.element = $(container);
	this.options = options = $.extend({}, $.ui.dependent_dropdowns.defaults, options);
	this.dropdowns = this.options.dropdowns || this.element.find('select');
	this.data = this.options.data;

	this.element.addClass("ui-dependent-dropdowns");

	// update values when select is changed
	var dd = this;
	$.each(this.dropdowns, function(i, val) {
		// make sure these are "dropdown" objects
		$(val).dropdown();

		$(val).bind("change", function() {
			index = $.inArray(this, dd.dropdowns);
			if (index != -1) {
				dd._updateValues(index + 1);
			}
		});
	});

	// $(this.dropdowns).bind("change", this._updateSelect);

	this.enable();
};

$.ui.dependent_dropdowns.prototype = {

	// loads the pass values into the selects
	enable: function() {
		//for (i=0; i<this.dropdowns.length; i++) this._updateValues(i);
		this._updateValues(0);
		this.defaults();
	},

	disable: function() {
	},

	// reset the container back to its original state
	destroy: function() {
		$.each(this.dropdowns, function(key, value) {
			$(value).destroy();
		});
		this.element.removeClass("ui-dependent-dropdowns");
		$.removeData(this.element, "ui-dependent-dropdowns");
	},

	// loads default values if they were passed
	defaults: function() {

		if (this.data.defaults) {

			// values are loaded based on the time of day
			var now = new Date();
			var hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
			var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
			var time = hours.toString() + minutes.toString();

			var dd = this;
			$.each(this.data.defaults, function(key, values) {

				times = key.split('-');

				if (dd._checkTime(times[0], times[1], time)) {
					//console.log(values);
					index = 0;
					$.each(values, function(k, v) {

						// try to find the item and select it
						if (select = dd.dropdowns[index]) {
							$(select).find('option').each(function() {
								if ($(this).val() == v) {
									this.selected = true; //$(this).attr('selected', 'selected');

									// force the box to indicate the selected value
									$(select).dropdown('select');
									$(select).trigger('change');
								}
							});
						}

						index++;
					});
				}
			});
		}

	},

	_updateValues: function(index) {
		if (index == null) {
			index = 0;
		}

		if (dropdown = this.dropdowns[index]) {
			values = this._findValues(this.data.values, 0, index);

			// use the previously selected option if it exists in the new list
			previous_value = $(dropdown).val() || false;

			if (this.data.titles && this.data.titles[index]) {
				options = '<option value="" class="select-title">' + this.data.titles[index] + '</option>';
			} else {
				options = '';
			}

			// build the new list of values
			if (values) {
				$.each(values, function(key, val) {
					options += '<option value="' + key + '"';
					if (previous_value && previous_value == key) {
						options += ' selected="selected"';
					}
					options += '>' + val.label + '</option>';
				});
			}

			// disable the dropdown if no valid options are found
			if (!values) {
				$(dropdown).dropdown('disable');
			}

			// update the dropdown and redraw it
			$(dropdown).html(options);
			$(dropdown).dropdown('reset');

			// enable the dropdown if there are valid options
			if (values) {
				$(dropdown).dropdown('enable');
			}

			this._updateValues(index + 1);
		}
	},

	// find values to use when populating the dropdown
	_findValues: function (values, start_index, end_index) {
		if (start_index == end_index) {
			return values;
		} else {
			values = values[$(this.dropdowns[start_index]).val()];
			if (values) {
				return this._findValues(values.values, start_index + 1, end_index);
			} else {
				return null;
			}
		}
	},

	_updateDropdown: function (dropdown) {
		//console.log('_updateDropdown', this.dropdowns);
		if (index = $.inArray(dropdown, this.dropdowns)) {

			//	console.log('_updateDropdown index=', index);

			this._updateValues(index + 1);
		}
	},

	// return true if time is between from_time and to_time
	_checkTime: function (from_time, to_time, time) {

		// if to_time is less than from time then check the correct timeframe
		if (to_time < from_time) {

			if (time >= from_time && time < 2400) {// check up to 2359
				return true;
			} else if (time < to_time && time >= 0) {
				return true;
			}

		} else if (time >= from_time && time < to_time) {
			return true;
		}

		return false;
	}
};

//})(jQuery);

