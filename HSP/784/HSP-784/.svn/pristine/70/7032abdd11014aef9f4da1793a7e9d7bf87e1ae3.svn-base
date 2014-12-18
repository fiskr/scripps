SNI.HGRM.Contact = {

	init: function() {
        var flashVersion;
        // set user agent
        $("input[name|='optionaldata13']").val(navigator.userAgent);

        // set user flash version
        if(swfobject) {
            flashVersion = swfobject.getFlashPlayerVersion();
            $("input[name|='optionaldata14']").val(flashVersion.major + "." + flashVersion.minor + "." + flashVersion.release);
        }

        // get user id (if available)
        $("input[name|='optionaldata15']").val(SNI.Community.UR.ViewingUserId);

		$('select').dropdown();

		// setup form validation
		$('#contact').validate({
			errorContainer: '.error-wrap',
			errorLabelContainer: '.error-wrap ul',
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
					email: "Please check the format of your e-mail address and re-enter (i.e. joe@gmail.com)"
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
					$('html, body').animate({scrollTop: $('.error-wrap').offset().top-10}, 'slow');
					$('.error-wrap').fadeIn();
				}
			}
		});
	},

	liveChat: function() {
		// setup form validation
		$('form').validate({
			errorContainer: '.error-wrap',
			errorLabelContainer: '.error-wrap ul',
			wrapper: "li",
			rules: {
				fname: "required",
				lname: "required",
				email: {
					required: true,
					email: true
				},
				confirm: {
					required: true,
					equalTo: "#email"
				}
			},
			messages: {
				fname: "Please enter your first name",
				lname: "Please enter your last name",
				email: {
					required: "Please enter your e-mail address",
					email: "Please check the format of your e-mail address and re-enter (i.e. joe@HGRM.com)"
				},
				confirm: {
					required: "Please confirm your e-mail address",
					equalTo: "Please make sure your e-mail and confirmation e-mail match"
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.errorList = [this.errorList[0]];
					this.defaultShowErrors();
					$('.error-wrap').css('display','block').fadeIn();
				}
			}
		});
	}
};

