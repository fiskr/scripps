SNI.DIY.Contact = function() {
	// Start : MM-2730 
	// set user agent
	$("#contact-form input[name|='optionaldata13']").val(navigator.userAgent)

	// set user flash version
	if(swfobject) {
	    var playerVersion = swfobject.getFlashPlayerVersion();
	    $("#contact-form input[name|='optionaldata14']").val(playerVersion.major + "." + playerVersion.minor + "." + playerVersion.release);
	}
	// get user id (if available)
	$("#contact-form input[name|='optionaldata15']").val(SNI.Community.UR.ViewingUserId);
	// End : MM-2730  
	
	$('.contact select').dropdown();
	
	$(".contact form").validate({
		errorContainer: '.contact .form-errors',
		errorLabelContainer: '.contact .form-errors ul',
		wrapper: "li",
		rules: {
			optionaldata5: 'required',
			optionaldata6: 'required',
			email: {
				required: true,
				email: true
			},
			confirm: {
				required: true,
				equalTo: '#email'
			},
			fname: 'required',
			lname: 'required',
			optionaldata4: 'required',
			optionaldata7: {
				required: true,
				minlength: 6
			}
		},
		messages: {
			optionaldata5: 'Please select a reason for contacting us',
			optionaldata6: 'Please select what this is regarding',
			email: {
				required: 'Please enter your e-mail address',
				email: 'Please check the format of your e-mail address and re-enter (i.e. joe@diynetwork.com)'
			},
			confirm: {
				required: 'Please confirm your e-mail address',
				equalTo: 'Please make sure your e-mail and confirmation e-mail match'
			},
			fname: 'Please enter your first name',
			lname: 'Please enter your last name',
			optionaldata4: 'Please enter your zip code',
			optionaldata7: {
				required: 'Please enter a message',
				minlength: 'Please make sure your message is at least 6 characters long'
			}
		}
	});
	
	// hide the error messages if X is clicked
	$('.contact .form-errors .close').click(function() {
		$('.contact .form-errors').animate({
			opacity: 'toggle',
			height: 'toggle'
		});
	});
	
	$('.contact .submit a').click(function(){
		$('.contact form')[0].reset();
		return false;
	})
};