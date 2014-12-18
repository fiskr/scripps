(function($){
	/*!
	 * Sweeps Reminder
	 * @version 1.5.2
	 * @author Jeffery Moore, Brandon Foster
	 * @requires jQuery 1.4.2+
	 */

	var ftn = ftn || $( {} );

	ftn.extend({

		reminder : function( listId, config ) {
			
			var defaults = {
				selector	: ".email-reminder-signup",
				placeholder	: "ex. jane@" + location.hostname.replace('www.', ''),
				emailError	: "check the address format",
				successMsg	: "<h3>Thank You!</h3><p>You have successfully registered to receive {list_label} email reminders. Emails will be sent to {email}.</p>",
				failureMsg	: "Submission failed! Please contact Customer Service.",
				hintClass	: "input-hint",
				listLabel	: ""
			};
			
			if (config) {
				config = $.extend( defaults, config );
			} else {
				config = defaults;
			}
			
			if ( !listId ) {
				listId = "none";
			}
			
			$(config.selector).each(function() {
				
				var $module = $(this),
					$el = $module.find("input[type=text]"),
					$validMsg = $module.find('#valid-msg'),
					$thanksMsg = $module.find('.thanks-msg'),
					$inputs = $module.find('.rounded-input'),
					$loading = $('<div class="reminder-loading" style="display:none;"><p><img class="plain-img" src="http://images.hgtv.com/webhgrm/rm10/pkgs/2012/greenhome/images/ajax-loader.gif" /> Submitting...</p></div>').prependTo($module);
				
				$module.css({ 'minHeight' : $module.height() });
				
			/**
			 * Populates the field with placeholder text and adds defined CSS class for placeholder.
			 */

				function inputReset() {
					var input = $el.val();
					if ( input === "" ) {
						$el.val( config.placeholder ).addClass( config.hintClass );
					} else if ( input === config.placeholder ) {
						$el.addClass( config.hintClass );
					}
				}
				
				
				function isValidEmail( value ) {
					return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( value );
				}
				
			/**
			 * Resets the field and removes the CSS class on focus. Runs the reset function on blur.
			 */

				$el.focus( function() {
					if ( $el.val() === config.placeholder ) {
						$(this).val("").removeClass( config.hintClass );
					}
					$inputs.addClass('focus');
					$('form-group').removeClass("has-error");
				})
				
				.blur( function() {
					inputReset();
					$inputs.removeClass('focus');
				})
				
				.bind('keypress', function (e) {
					var code = (e.keyCode ? e.keyCode : e.which);
					if (code == 13) {
						$module.find("button").click();
						return false;
					}
				});
				
				
			/**
			 * Checks to see if email is valid on submit. If not, it updates the html with the message and adds an error class to the field.
			 */
				
				$module.find("button").click( function() {
					
					var email = $el.val();
					
					$el.bind('keyup', function() {
						if ( isValidEmail($el.val()) ) {
							$('.form-group').removeClass('has-error');
							$('.form-control-feedback').css({ visibility: 'hidden' });
						} else {
							$('.form-group').addClass('has-error');
							$('.form-control-feedback').css({ visibility: 'visible' });
						}
					});
					
					if ( isValidEmail( email ) ) {
						$(this).focus();	//removes focus from input box to avoid flashing cursor in IE
						$el.removeClass("error");
						$loading.show().find('p').css( { top: ( ( $module.outerHeight() - $loading.find('p').height() ) / 2 ) + 'px' } );	//show and vertically center loading img/message
						$.getJSON('https://mynewsletters.scrippsnetworks.com/services/reminders_home_json.php?emailaddress=' + email + '&list=' + listId + '&jsonpCallback=?', function( json ) {
							$inputs.hide();
							$loading.hide();
							if ( json.success === "true" ) {
							
								var listLabel = config.listLabel,
									labelInline = $module.find('.list-label')[0];
								
								if (labelInline && labelInline.innerHTML) {
									listLabel = labelInline.innerHTML;
								}
								var successMsg = config.successMsg.replace( '{email}', email )
																  .replace( '{list_label}', listLabel);

								$thanksMsg.html( successMsg ).css({ visibility: 'visible', display: 'block' });
								$inputs.removeClass("error");
								$loading.siblings(':not(.form-wrap, .thanks-msg)').hide();

								if ((config.successCallback) && (typeof(config.successCallback) == "function")) {
									config.successCallback($module);
								}
								
							} else {
								$('.form-group').addClass('has-error');
								$('.form-control-feedback').css({ visibility: 'visible' });
								$validMsg.addClass("fail").text( config.failureMsg );
							}
							$el.closest('.form-wrap').find('.label').hide();
						});
					} else {
						$('.form-group').addClass('has-error');
						$('.form-control-feedback').css({ visibility: 'visible' });
						$validMsg.addClass("fail").text( config.emailError );
						return false;
					}
				});
				
				inputReset();
				
			});
		}
		
	});

	ftn.reminder( 'dream', {successMsg : "<h3>Thank You!</h3><p>You have successfully registered to receive {list_label}. Messages will be sent to {email}.</p>"});
})(jQuery);