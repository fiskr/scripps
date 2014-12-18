// change the default behavior of the validator plugin
$.validator.setDefaults({
	errorElement: 'span',
	onfocusout: false,
	onkeyup: false,
	onclick: false,
	highlight: function(element, errorClass) {
		$(element).addClass(errorClass);
		$(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
	},
	unhighlight: function(element, errorClass) {
		$(element).removeClass(errorClass);
		$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
	}
});

// add method to validator to check for spaces
$.validator.addMethod("spaces", function(value, element) {
  return this.optional(element) || value.indexOf(' ') == -1;
}, "Spaces are not allowed");

$.validator.addMethod("multipleEmails", function(value, element) {
	if (this.optional(element)) {
		return true;
	}
	var friendsEmails = value.split(",");
	var isEmail = true;
	$.each(friendsEmails, function(){
		var patternTest = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($.trim(this));
		if (patternTest == false) {
			isEmail = false;
		};
	});
	return isEmail;
}, "One of these is not a valid e-mail address");