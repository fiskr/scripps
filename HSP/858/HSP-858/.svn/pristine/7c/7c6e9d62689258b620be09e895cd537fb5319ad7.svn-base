SNI.HGTV.Contact = {
	init: function() {
        var flashVersion;
        // set user agent
        $(".contact-bd input[name|='optionaldata13']").val(navigator.userAgent)

        // set user flash version
        if(swfobject) {
            flashVersion = swfobject.getFlashPlayerVersion();
            $(".contact-bd input[name|='optionaldata14']").val(flashVersion.major + "." + flashVersion.minor + "." + flashVersion.release);
        }

        // get user id (if available)
        $(".contact-bd input[name|='optionaldata15']").val(SNI.Community.UR.ViewingUserId);

		$('.contact-bd select').dropdown();
		
		// setup form validation
		$('.contact-bd form').validate({
			errorContainer: '.contact-bd .form-errors',
			errorLabelContainer: '.contact-bd .form-errors ul',
			wrapper: "li",
			rules: {
				optionaldata5: "required",
				optionaldata6: "required",
				email: {
					required: true,
					email: true
				},
				confirm: {
					required: true,
					equalTo: "#email"
				},
				fname: "required",
				lname: "required",
				optionaldata4: "required",
				optionaldata7: "required"
			},
			messages: {
				optionaldata5: "Please select a reason for contacting us",
				optionaldata6: "Please select what this is regarding",
				email: {
					required: "Please enter your e-mail address",
					email: "Please check the format of your e-mail address and re-enter (i.e. joe@hgtv.com)"
				},
				confirm: {
					required: "Please confirm your e-mail address",
					equalTo: "Please make sure your e-mail and confirmation e-mail match"
				},
				fname: "Please enter your first name",
				lname: "Please enter your last name",
				optionaldata4: "Please enter your zip code",
				optionaldata7: "Please enter your message"
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.defaultShowErrors();
					$('html, body').animate({scrollTop: $('.contact-bd .form-errors').offset().top-10}, 'slow'); 
					$('.contact-bd .form-errors').fadeIn();
				}
			}
		});
	},
	
	liveChat: function() {
		// setup form validation
		$('form').validate({
			errorContainer: '.form-errors',
			errorLabelContainer: '.form-errors ul',
			wrapper: "li",
			rules: {
				fname: "required",
				lname: "required",
				email: {
					required: true,
					email: true
				},
				email2: {
					required: true,
					equalTo: "#email"
				}
			},
			messages: {
				fname: "Please enter your first name",
				lname: "Please enter your last name",
				email: {
					required: "Please enter your e-mail address",
					email: "Please check the format of your e-mail address and re-enter (i.e. joe@hgtv.com)"
				},
				email2: {
					required: "Please confirm your e-mail address",
					equalTo: "Please make sure your e-mail and confirmation e-mail match"
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					$('.form-errors').fadeIn();
					this.defaultShowErrors();
				}
			}
		});
	}
};

