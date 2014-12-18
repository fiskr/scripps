/*
Date: December 02, 2014
Author: Brandon Foster (CQ), Jeff Moore (Jitterbug)
Requires: jQuery 1.4.2+
Purpose: provide functionality for the email reminder used by major sweepstakes and tentpoles.
*/
(function($){
	/*
		All of the utility sort of functions
	*/

	//tell if error has happened
	var err = function(isErr){
			if(isErr){
				$('form-group').addClass("has-error");
				$('.form-control-feedback').css({ visibility: 'visible' });

			}else{
				$('.form-group').removeClass('has-error');
				$('.form-control-feedback').css({ visibility: 'hidden' });
			}
		},
		//submit the email to the newsletter
		submitEmail = function(email){
			$(this).focus();	//removes focus from input box to avoid flashing cursor in IE
			err(false); //removes validation message and all that jazz
			$loading.show().find('p').css( { top: ( ( $module.outerHeight() - $loading.find('p').height() ) / 2 ) + 'px' } );	//show and vertically center loading img/message
			$.getJSON('https://mynewsletters.scrippsnetworks.com/services/reminders_home_json.php?emailaddress=' + email + '&list=' + listId + '&jsonpCallback=?', function( json ) {
				$inputs.hide();
				$loading.hide();
				if ( json.success === "true" ) {

					var thanksMessage = config.thanksMessage.replace( /\{email\}/g, email );
					$thanksMsg.html( thanksMessage ).css({ visibility: 'visible', display: 'block' });
					$loading.siblings(':not(.thanks-msg)').hide();

					if ((config.successCallback) && (typeof(config.successCallback) == "function")) {
						config.successCallback($module);
					} 

				}else {
						$failureMsg.show();
						console.error('REMINDER MODULE: failed to submit https://mynewsletters.scrippsnetworks.com/services/reminders_home_json.php?emailaddress=' + email + '&list=' + listId + '&jsonpCallback=?');
						//$validationMsg.addClass("fail").text( config.failureMsg );
					}
					//$el.closest('.form-group').find('.ts-1').hide();
				});
		},
		//check to see if the value is a valid email
		isValidEmail = function( value ) {
					return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( value );
		},
		//
		driver = function( listId, config ) {
			
			var defaults = {
				selector	: ".email-reminder-signup"
				,placeholder	: "ex. jane@" + location.hostname.replace('www.', '')
				,emailError	: "check the address format"
				,thanksMessage : document.getElementsByClassName('thanks-msg').innerHTML
				,failureMsg	: "Submission failed! Please contact Customer Service."
				,listLabel	: ""
				//,successCallback : function(){};
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
					$validationMsg = $module.find('.form-control-feedback'),
					$thanksMsg = $module.find('.thanks-msg'),
					$inputs = $module.find('.input'),
					$failureMsg = $('.failure-msg'),
					$loading = $('<div style="display:none;"><p><div id="loadingdot"><div id="loadingdot1" class="loadingdot"></div><div id="loadingdot2" class="loadingdot"></div><div id="loadingdot3" class="loadingdot"></div><div id="loadingdot4" class="loadingdot"></div></div> Submitting...</p></div>').prependTo($module);
				
				$module.css({ 'minHeight' : $module.height() });
			
				/*
					Event handlers for the email validation, etc.
				*/
				
				//Checks to see if email is valid on submit. If not, it updates the html with the message and adds an error class to the field.		
				$module.find("button").click( function() {
					var email = $el.val();
					if ( isValidEmail( email ) ) {
							err(false);
							submitEmail(email);
					} else {
						err(true);
						return false;
					}
				});

				//check to see if the email is valid on keyup
				$el.bind('keyup', function() {
					if ( isValidEmail($el.val()) ) { //$el.val is the email value itself
						err(false);
					} else {
						err(true);
					}
				});


				//when user clicks enter key, it clicks the submit button
				$el.bind('keypress', function (e) {
					var code = (e.keyCode ? e.keyCode : e.which);
					if (code == 13) {
						$module.find("button").click(); //button click on pressing enter
						return false;
					}
				});	
			});
		};	
	driver('dream');
})(jQuery);