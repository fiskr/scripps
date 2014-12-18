SNI.HGRM.Newsletters = {
   
    inlineSubscribe: function(form) {
        var $form = $(form);
        $form.validate({
			errorPlacement: function(error, element) {
				error.appendTo(".error-wrap.news" );
			},
	        errorLabelContainer: '.error-wrap.news ul',
			wrapper: "li",
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.defaultShowErrors();
					$('.error-wrap.news').css('display','block').fadeIn();
				}
			},
            rules: {
                emailaddress: {
                    required: true,
                    email: true
                },
				terms: {
					required: true
				}
            },
            messages: {
                emailaddress: {
                    required: "Please enter an e-mail address",
                    email: "Whoops. Please check the format of your e-mail address and re-enter (e.g. sally@gmail.com)"
                },
				terms: {
					required: "Please agree to the Terms of Use"
				}
            }
        });
    }
};