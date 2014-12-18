SNI.DIY.Newsletter = {
	
	subscribe: function() {
		SNI.DIY.Newsletter.moreNewsletters();
		SNI.DIY.Newsletter.checkAll();
		SNI.DIY.Newsletter.closeErrors();
	
		// setup form validation
		$('.newsletter form').validate({
			// debug: true,
			errorContainer: '.newsletter .form-errors',
			errorLabelContainer: '.newsletter .form-errors ul',
			wrapper: "li",
			rules: {
				newsletter: {
					required: function(element) {
						return $(".newsletter .choose input:checked").length < 1;
					}				
				},
				FIRST_NAME_: 'required',
				LAST_NAME_: 'required',
				list_agree: 'required',
				email: {
					required: true,
					email: true
				},
				email_confirm: {
					required: true,
					equalTo: '#email'
				},
				POSTAL_CODE_: 'required'
			},
			messages: {
				newsletter: 'Please check the Newsletter you wish to receive',
				FIRST_NAME_: 'Please enter your first name',
				LAST_NAME_: 'Please enter your last name',
				list_agree: 'please check and confirm that you have read the privacy policy, terms of use, and infringement ',
				email: {
					required: 'Please enter your e-mail address',
					email: 'Please check the format of your e-mail address and re-enter (i.e. joe@diynetwork.com)'
				},
				email_confirm: {
					required: 'Please confirm your e-mail address',
					equalTo: 'Please make sure your e-mail and confirmation e-mail match'
				},
				POSTAL_CODE_: 'Please enter your zip code'
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					if (errorMap.newsletter) {
						$('.newsletter .newsletter-error').show();
					} else {
						$('.newsletter .newsletter-error').hide();
					}
					this.defaultShowErrors();
					SNI.DIY.Newsletter.scrollTop();
				}
			}
		});
	},
	
	changeEmail: function() {
		SNI.DIY.Newsletter.closeErrors();
		
		// setup form validation
		$('.newsletter form').validate({
			// debug: true,
			errorContainer: '.newsletter .form-errors',
			errorLabelContainer: '.newsletter .form-errors ul',
			wrapper: "li",
			rules: {
				email: {
					required: true,
					email: true
				},
				emailnew: {
					required: true,
					email: true
				},
				emailnew_confirm: {
					required: true,
					equalTo: '#email'
				}
			},
			messages: {
				email: {
					required: 'Please enter your old e-mail address',
					email: 'Please check the format of your old e-mail address and re-enter (i.e. joe@diynetwork.com)'
				},
				emailnew: {
					required: 'Please enter your e-mail address',
					email: 'Please check the format of your e-mail address and re-enter (i.e. joe@diynetwork.com)'
				},
				emailnew_confirm: {
					required: 'Please confirm your e-mail address',
					equalTo: 'Please make sure your e-mail and confirmation e-mail match'
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.defaultShowErrors();
					SNI.DIY.Newsletter.scrollTop();
				}
			}
		});		
	},
	
	unsubscribe: function() {
		SNI.DIY.Newsletter.moreNewsletters();
		SNI.DIY.Newsletter.checkAll();
		SNI.DIY.Newsletter.closeErrors();
		
		// setup form validation
		$('.newsletter form .bd ul').validate({
			// debug: true,
			errorContainer: '.newsletter .form-errors',
			errorLabelContainer: '.newsletter .form-errors ul',
			wrapper: "li",
			rules: {
				newsletter: {
					required: function(element) {
						return $(".newsletter .choose input:checked").length < 1;
					}				
				},
				email: {
					required: true,
					email: true
				},
				email_confirm: {
					required: true,
					equalTo: '#email'
				}
			},
			messages: {
				newsletter: 'Please check the Newsletter you wish to unsubscribe from',
				email: {
					required: 'Please enter your e-mail address',
					email: 'Please check the format of your e-mail address and re-enter (i.e. joe@diynetwork.com)'
				},
				email_confirm: {
					required: 'Please confirm your e-mail address',
					equalTo: 'Please make sure your e-mail and confirmation e-mail match'
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					if (errorMap.newsletter) {
						$('.newsletter .newsletter-error').show();
					} else {
						$('.newsletter .newsletter-error').hide();
					}
					this.defaultShowErrors();
					SNI.DIY.Newsletter.scrollTop();
				}
			}
		});
	},
	
	thanks: function() {
		SNI.DIY.Newsletter.moreNewsletters();
		SNI.DIY.Newsletter.checkAll();
	},
	
	closeErrors: function() {
		// hide the error messages if X is clicked
		$('.newsletter .form-errors .close').click(function() {
			$('.newsletter .form-errors').slideUp();
		});
	},
	
	moreNewsletters: function() {
		// setup more newlsetters faux-accordion
		$('.newsletter .more-newsletters h4 a').click(function() {
			var link = $(this);
			if (link.hasClass('active')) {
				link.removeClass('active')
				$('.newsletter .more-newsletters .bd').slideUp();
				link.blur(); // fix for IE
			} else {
				link.addClass('active');
				$('.newsletter .more-newsletters .bd').slideDown();
				link.blur(); // fix for IE
			}
			return false;
		});
	},
	
	checkAll: function() {
		// setup check all button
		$('.newsletter .more-newsletters .check-all').click(function() {
			var link = $(this);
			var text = link.find('span');

			if (text.text() == 'Check All') {
				text.text('Uncheck All');
				$('.newsletter .more-newsletters input').attr('checked', 'checked');
			} else {
				text.text('Check All');
				$('.newsletter .more-newsletters input').removeAttr('checked');
			}
		
			return false
		});
	},
	
	scrollTop: function() {
		var winOffset = 70;  // must account for the project finder height
		var win = $(window);
		var winTop = win.scrollTop() + winOffset;
		var errorTop = $('.newsletter .form-errors').offset().top;
		
		if (errorTop < winTop) {
			win.scrollTop(errorTop - winOffset);
		}
	}
};