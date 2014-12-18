if (typeof(SNI.HGTV.Sweepstakes) === "undefined") { 
	SNI.HGTV.Sweepstakes = {}; 
}

SNI.HGTV.Sweepstakes = {

	premier: {
		init: function() {
			SNI.HGTV.Sweepstakes.checkAll($(".hgtv-nl"));
			SNI.HGTV.Sweepstakes.closeErrors();
			var form = $("#sweepsEntryForm");
		
			var _ckVals = SNI.Util.Cookie.get('sniPremSweepsVals');
			_xemail = '';
			if (_ckVals !== null) {
				var _aryCkVals = _ckVals.split('|');
				_xemail = _aryCkVals[0];
				if (_aryCkVals[1] !== undefined) {_xfn = _aryCkVals[1];
				} else {_xfn = '';}
				if (_aryCkVals[2] !== undefined) {_xln = _aryCkVals[2];
				} else {_xln = '';}
				if (_aryCkVals[3] !== undefined) {_xaddy = _aryCkVals[3];
				} else {_xaddy = '';}
				if (_aryCkVals[4] !== undefined) {_xcity = _aryCkVals[4];
				} else {_xcity = '';}
				if (_aryCkVals[5] !== undefined) {_xstate = _aryCkVals[5];
				} else {_xstate = 0;}
				if (_aryCkVals[6] !== undefined) {_xzip = _aryCkVals[6];
				} else {_xzip = '';}
				if (_aryCkVals[7] != undefined) {_xphone = _aryCkVals[7];
				} else {_xphone = '';}
				if (_aryCkVals[8] != undefined) {_xgender = _aryCkVals[8];
				} else {_xgender = null;}
			}
			$("#fvEmail").blur(function () {
				SNI.HGTV.Sweepstakes.premier.checkCkVals($("#fvEmail").val(), form);
			});
			
			var validator = form.validate({
	   
				//debug: true,
				errorContainer: '#sweepsEntryForm div.form-errors',
				errorLabelContainer: '#sweepsEntryForm div.form-errors ul',
				wrapper: "li",
		
				rules: {
					fvFirstName: "required",
					fvLastName: "required",
					fvAddress1: "required",
					fvCity: "required",
					fvState: "required",
					fvZip: {
						required: true,
						zipUS: true
					},
					fvEvePhone: {
						required: true,
						phoneUS: true
					},
					fvEmail: { 
						required: true,
						email: true
					},
					fvConfirmEmail: {
						required: true,
						equalTo: "#fvEmail"
					},
					fvGender: "required"
				},
		
				messages: {
					fvFirstName: "Please enter your first name",
					fvLastName: "Please enter your last name",
					fvAddress1: "Please enter your address",
					fvCity: "Please enter your city",
					fvState: "Please select your state",
					fvZip: "Please enter a valid ZIP code",
					fvEvePhone: "Please enter a valid phone number with area code",
					fvEmail: "Please enter an e-mail address",
					fvConfirmEmail: "Please make sure your e-mails match",
					fvGender: "Please select your gender"
				},
		
				showErrors: function(errorMap, errorList) {
					if (errorList.length) {
						this.defaultShowErrors();
						SNI.HGTV.Sweepstakes.scrollTop();
					}
				},
				
				submitHandler: function(form) {
					if(window.onbeforeunload != "undefined") {
						window.onbeforeunload = null;
					}
					
					SNI.HGTV.Sweepstakes.premier.phoneSplit();
					SNI.HGTV.Sweepstakes.premier.ckInit();
					form.submit();
					//return false;
				}
			});
		},
		
		phoneSplit: function() {
			var fvEvePhone = $("#fvEvePhone").val();
			var fvAreaCode = fvEvePhone.match(/\([2-9]\d{2}\)|[2-9]\d{2}/);
			var fvPhone = fvEvePhone.match(/[2-9]\d{2}-?\s?\d{4}/);
			$("#fvAreaCode").val(fvAreaCode);
			$("#fvPhone").val(fvPhone);
		},
		
		ckInit: function() {
			var _email = $("#fvEmail").val();
			var _fn = $("#fvFirstName").val();
			var _ln = $("#fvLastName").val();
			var _addy = $("#fvAddress1").val();
			var _city = $("#fvCity").val();
			var _state = $("#fvState").val();
			var _zip = $("#fvZip").val();
			var _phone = $("#fvEvePhone").val();
			if ($('#sweepsEntryForm input[name="fvGender"]').eq(0).attr("checked") === true) {
				var _gender = 'm';
			} else {
				_gender = 'f';
			}
			var _ckVals = _email + '|' + _fn + '|' + _ln + '|' + _addy + '|' + _city + '|' + _state + '|' + _zip + '|' + _phone + '|' + _gender;
			SNI.Util.Cookie.set('sniPremSweepsVals', _ckVals, 365);
		},
	
		checkCkVals: function(userEmail, form) {
			if (userEmail != "" && userEmail == _xemail) {
				$("#fvConfirmEmail").val($("#fvEmail").val());
				if ($("#fvFirstName").val() === '') {$("#fvFirstName").val(_xfn);}
				if ($("#fvLastName").val() === '') {$("#fvLastName").val(_xln);}
				if ($("#fvAddress1").val() === '') {$("#fvAddress1").val(_xaddy);}
				if ($("#fvCity").val() === '') {$("#fvCity").val(_xcity);}
				if ($("#fvState").val() === '') {$("#fvState").val(_xstate);}
				if (form.find('dt a').html() === 'Select<em></em>' || form.find('dt a').html() === 'Select<EM></EM>') {form.find('dt a').html(_xstate + '<em></em>');}
				if ($("#fvZip").val() === '') {$("#fvZip").val(_xzip);}
				if ($("#fvEvePhone").val() === '') {$("#fvEvePhone").val(_xphone);}
				if (form.find('input[name="fvGender"]').eq(0).attr("checked") === false && form.find('input[name="fvGender"]').eq(1).attr("checked") === false) {
					if (_xgender !== null) {
						if (_xgender == 'm') {
							form.find('input[name="fvGender"]').eq(0).attr({ 
								checked: "true"
							});
						} else {
							form.find('input[name="fvGender"]').eq(1).attr({ 
								checked: "true"
							});
						}
					}
				}
			}
		}
	},

	init: function() {
		SNI.HGTV.Sweepstakes.checkAll($(".hgtv-nl"));
		SNI.HGTV.Sweepstakes.closeErrors();
		var form = $("#sweepsEntryForm");
			
		var _ckVals = SNI.Util.Cookie.get('sniSweepsVals');
		_xemail = '';
		if (_ckVals !== null) {
			var _aryCkVals = _ckVals.split('|');
			_xemail = _aryCkVals[0];
			if (_aryCkVals[1] !== undefined) {_xfn = _aryCkVals[1];
			} else {_xfn = '';}
			if (_aryCkVals[2] !== undefined) {_xln = _aryCkVals[2];
			} else {_xln = '';}
			if (_aryCkVals[3] !== undefined) {_xaddy = _aryCkVals[3];
			} else {_xaddy = '';}
			if (_aryCkVals[4] !== undefined) {_xcity = _aryCkVals[4];
			} else {_xcity = '';}
			if (_aryCkVals[5] !== undefined) {_xstate = _aryCkVals[5];
			} else {_xstate = 0;}
			if (_aryCkVals[6] !== undefined) {_xzip = _aryCkVals[6];
			} else {_xzip = '';}
			if (_aryCkVals[7] != undefined) {_xphone = _aryCkVals[7];
			} else {_xphone = '';}
			if (_aryCkVals[8] != undefined) {_xgender = _aryCkVals[8];
			} else {_xgender = null;}
		}
		$("#fvEmail").blur(function () {
			SNI.HGTV.Sweepstakes.checkCkVals($("#fvEmail").val(), form);
		});

		var validator = form.validate({
   
			debug: false,
		
			rules: {
				fvFirst: "required",
				fvLast: "required",
				fvAddress1: "required",
				fvCity: "required",
				fvState: "required",
				fvZip: {
					required: true,
					digits: true
				},
				//fvAreaCode: "required",
				fvEvePhone: {
					required: true,
					phoneUS: true
				},
				fvEmail: "email",
				fvEmail: { 
					required: true,
					email: true
				},
				fvEmailConfirm: {
					required: true,
					equalTo: "#fvEmail"
				},
				fvGender: "required"
			},
		
			messages: {
				fvFirst: "Please enter your first name",
				fvLast: "Please enter your last name",
				fvAddress1: "Please enter your address",
				fvCity: "Please enter your city",
				fvState: "Please select your state",
				fvZip: "Please enter your 5 digit ZIP code",
				//fvAreaCode: "Please enter an area code",
				fvEvePhone: "Please enter a valid phone number",
				fvEmail: "Please enter an e-mail address",
				fvEmailConfirm: "Please make sure your e-mails match",
				fvGender: "Please select your gender"
			},
		
			errorContainer: ".form-errors",
			errorLabelContainer: $(".list-alt", ".form-errors"),
			wrapper: "li",		
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.defaultShowErrors();
					SNI.HGTV.Sweepstakes.scrollTop();
				} else {
					// succssful validation, remove onbeforeunload hanlr
					if(window.onbeforeunload != "undefined") {
						window.onbeforeunload = null;
					}
					SNI.HGTV.Sweepstakes.ckInit();
				}
			} 
		
		});
	},
	
	ckInit: function() {
		var _email = $("#fvEmail").val();
		var _fn = $("#fvFirstName").val();
		var _ln = $("#fvLastName").val();
		var _addy = $("#fvAddress1").val();
		var _city = $("#fvCity").val();
		var _state = $("#fvState").val();
		var _zip = $("#fvZip").val();
		var _phone = $("#fvEvePhone").val();
		if ($('#sweepsEntryForm input[name="fvGender"]').eq(0).attr("checked") === true) {
			var _gender = 'm';
		} else {
			_gender = 'f';
		}
		var _ckVals = _email + '|' + _fn + '|' + _ln + '|' + _addy + '|' + _city + '|' + _state + '|' + _zip + '|' + _phone + '|' + _gender;
		SNI.Util.Cookie.set('sniSweepsVals', _ckVals, 365);
	},

	checkCkVals: function(userEmail, form) {
		if (userEmail != "" && userEmail == _xemail) {
			$("#fvConfirmEmail").val($("#fvEmail").val());
			if ($("#fvFirstName").val() === '') {$("#fvFirstName").val(_xfn);}
			if ($("#fvLastName").val() === '') {$("#fvLastName").val(_xln);}
			if ($("#fvAddress1").val() === '') {$("#fvAddress1").val(_xaddy);}
			if ($("#fvCity").val() === '') {$("#fvCity").val(_xcity);}
			if ($("#fvState").val() === '') {$("#fvState").val(_xstate);}
			if (form.find('dt a').html() === 'Select<em></em>' || form.find('dt a').html() === 'Select<EM></EM>') {form.find('dt a').html(_xstate + '<em></em>');}
			if ($("#fvZip").val() === '') {$("#fvZip").val(_xzip);}
			if ($("#fvEvePhone").val() === '') {$("#fvEvePhone").val(_xphone);}
			if (form.find('input[name="fvGender"]').eq(0).attr("checked") === false && form.find('input[name="fvGender"]').eq(1).attr("checked") === false) {
				if (_xgender !== null) {
					if (_xgender == 'm') {
						form.find('input[name="fvGender"]').eq(0).attr({ 
							checked: "true"
						});
					} else {
						form.find('input[name="fvGender"]').eq(1).attr({ 
							checked: "true"
						});
					}
				}
			}
		}
	},
	
	closeErrors: function() {
		// hide the error messages if X is clicked
		var errors = $("#sweepsEntryForm div.form-errors");
		errors.find('.close').click(function() {
			errors.slideUp();
			return false;
		});
	},
	
	revealModule: function(parent,trigger,module) {
		$(parent).find(trigger).click(function() {
			module.fadeIn(SNI.HGTV.ANIMATION_SPEED);
			$(this).addClass("active");
			return false;
		})
	},
	
	closeModule: function(trigger,module,speed) {
		if (speed == null) {
			speed = SNI.HGTV.ANIMATION_SPEED;
		};
		module.fadeOut(speed);
		if ($(trigger).hasClass("active")) {
			$(trigger).removeClass("active");
		};
	},
	
	checkAll: function(container) {
		// setup check all button
		
		container.find("#optionalall").click(function(){
			var $this = $(this);
			var checkValue = $this.find('span').html();
			if (container.hasClass("hgtv-nl")) {
				var optins = $(".hgtv-nl input[@type=checkbox],.sponsor-offer input[@type=checkbox]");
			} else if (container.hasClass("acco-content")) {
				var optins = $(".acco-content input[@type=checkbox]");
			}
			
			if (checkValue === 'Check All'){
				optins.each(function() {
					optins.attr('checked', true);
				});
				$this.find('span').html('Uncheck All');
			} else {
				optins.each(function() {
					optins.attr('checked', false);
				});
				$this.find('span').html('Check All');
			}
			return false;
		});
	},
		
	scrollTop: function() {
		var winOffset = 70;  // must account for the project finder height
		var win = $(window);
		var winTop = win.scrollTop() + winOffset;
		var errorTop = $('#sweepsEntryForm div.form-errors').offset().top;
		
		if (errorTop < winTop) {
			win.scrollTop(errorTop - winOffset);
		}
	},
	
	confirmExit: function(e) {
		if(!e) e = window.event;
	
		//e.cancelBubble is supported by IE - this will kill the bubbling process.
		e.cancelBubble = true;
	
		//This is displayed on the dialog
		return "It appears you have not entered the sweepstakes.\nDon't miss a chance to win the Green Home Sweepstakes.";
	
		//e.stopPropagation works in Firefox.
		if (e.stopPropagation) {
			e.stopPropagation();
			e.preventDefault();
		}
	},
	
	inviteAFriend: function(){
		var parent = $("#sweeps-thanks");
		var module = $("#invite-a-friend");
		var form = module.find("form");
		var null_value = "";
		//var initMessage = form.find("textarea").val();
	
		// Reveal the Email-A-Friend Panel
		SNI.HGTV.Sweepstakes.revealModule(parent,".email",module);
		$(".close").click(function(){
			SNI.HGTV.Sweepstakes.closeModule(".email",module);
		});
		$(".form-submit a").click(function(){
			SNI.HGTV.Sweepstakes.closeModule(".email",module);
			return false;
		});

	 //	Validation && Submit
		form.validate({
			errorLabelContainer: module.find('.message'),
			rules: {
				from_name: {
					required: true
				},
				from_email: {
					required: true,
					email: true
				},
				to_emails: {
					required: true,
					multipleEmails: true
				}
			},
			messages: {
				from_name: {
					required: "Whoops. Please enter your name."
				},
				from_email: {
					required: "Whoops. Please enter your e-mail address.",
					email: "Whoops. Please check the format of your e-mail address and re-enter (i.e. joe@hgtv.com)."
				},
				to_emails: {
					required: "Whoops. Please enter at least one friend e-mail address.",
					multipleEmails: "Whoops. One or more of your friend e-mail addresses is not formatted correctly. Please check the format and re-enter (i.e. joe@hgtv.com)."
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					module.find('.message').addClass('alert').html(errorList[0].message);
					// select the email field
					element = $(errorList[0].element);
					if (element.hasClass('isemail')) {
						element.select();
					}
					// only show one error at a time for this form
					this.errorList = [this.errorList[0]];
					this.defaultShowErrors();
				}
			}, 
			submitHandler: function() {
				var txtarea = form.find('input[name="body"]');
				var txtarea_comment = txtarea.val();
				var msg_body = form.find('input[name="from_name"]').val() + " thought you might like this.\n\n";
				msg_body += txtarea.val() + "\n\n";
				msg_body += form.find('input[name="url"]').val();
			
				module.find('.message').hide().removeClass("alert");
				form.find('fieldset').hide();
				form.find("label").removeClass("error");
				form.find('button').addClass('disabled').attr('disabled', 'disabled');
				form.find('.cancel').addClass("disabled");
				form.find('.loading').show();
				txtarea.val(msg_body);
			
				var form_data = form.serialize();
				$.ajax({
					type: "POST",
					url: form.attr("action"),
					data: form_data,
					cache: false,
					success: function(data){
						form.find('.loading').hide();
						var response = $(data);
						var emailSent = response.eq(7).text();
						if (emailSent == "false") {
							form.find('fieldset').show();
							form.find('button').removeClass('disabled').removeAttr('disabled');
							form.find('.cancel').removeClass("disabled");
							form.find("label[for='friends-email']").addClass("error");
							$("#friends-email").select();
							module.find('.message').addClass("alert").text("Whoops. The e-mail could not be sent to one or more of your friends. Please check the format of their e-mail address and re-enter (i.e. joe@HGTV.com).").show();
						} else {
							var success = module.find('.success');
							form.hide();
							success.show();
							var timeout = setTimeout(function(){	
								SNI.HGTV.Sweepstakes.closeModule(".email",module,300);
								module.hide();
								// Reset form
								success.hide();
								txtarea.val(txtarea_comment);
								module.find('.message').text("All fields are required.").show();
								form.find("input:text").each(function(){
									$(this).val(""); 
								});
								form.find('button').removeClass('disabled').removeAttr('disabled');
								form.find('.cancel').removeClass("disabled");
								form.find('fieldset').show();
								form.show();
							}, 3000);
							$(".close").click(function(){
								clearTimeout(timeout);
								SNI.HGTV.Sweepstakes.closeModule(".email",module);
								module.hide();
								// Reset form
								success.hide();
								txtarea.val(txtarea_comment);
								module.find('.message').text("All fields are required.").show();
								form.find("input:text").each(function(){
									$(this).val(""); 
								});
								form.find('button').removeClass('disabled').removeAttr('disabled');
								form.find('.cancel').removeClass("disabled");
								form.find('fieldset').show();
								form.show();
							});
						}
					},
					error: function(){
						form.find('.loading').hide();
						txtarea.val(txtarea_comment);
						form.find('fieldset').show();
						form.find('button').removeClass('disabled').removeAttr('disabled');
						form.find('.cancel').removeClass("disabled");
						module.find('.message').addClass("alert").text("Whoops. We encountered an error when trying to e-mail this page. Please wait a few moments and try again.").show();
					}
				}); 
			}
		});
	},
	
	reminder: function() {
		$("#sweepsReminder").validate({
   
			debug: false,
		
			rules: {
				email: "email",
				email: { 
					required: true,
					email: true
				},
				email_confirm: {
					required: true,
					equalTo: "#email"
				},
				POSTAL_CODE_: {
					required: true,
					minlength: 5
				}
			},
		
			messages: {
				email: "Please enter an e-mail address",
				email_confirm: "Please make sure your e-mails match",
				POSTAL_CODE_: "Please enter your 5 digit ZIP code"
			},
			
			errorContainer: ".form-errors",
			errorLabelContainer: $(".list-alt", ".form-errors"),
			wrapper: "li",		
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					$('#sweepsReminder').fadeIn().animate({scrollTop:0}, 'slow');
					this.defaultShowErrors();
				} else {
					// succssful validation, remove onbeforeunload hanlr
					if(window.onbeforeunload != "undefined") {
						window.onbeforeunload = null;
					}
				}
			} 
		
		});
	},
	
	thanks_reminder: {

		remind: "#sweeps-thanks",
		
		signUp: function(){
			var parent = $("#sweeps-thanks");
			var module = $("#reminder-signup");
			var form = module.find("form");
			var null_value = "";
			
			//init Single Tracking on Submit Button
			//SNI.HGTV.Omniture.ClickTrackSingleCustom("#invite-button", "DS09:Reminder", "prop2", "")		
	
			// Reveal the Sign-Up Reminder
			SNI.HGTV.Sweepstakes.revealModule(parent,".reminder",module);
			$(".close").click(function(){
				SNI.HGTV.Sweepstakes.closeModule(".reminder",module);
			});
			$(".form-submit a").click(function(){
				SNI.HGTV.Sweepstakes.closeModule(".reminder",module);
				return false;
			});
	
	
	
		 //	Validation && Submit
			form.validate({
	
				debug: false,
			
				rules: {
					email: "email",
					email: { 
						required: true,
						email: true
					},
					email_confirm: {
						required: true,
						equalTo: "#email"
					},
					POSTAL_CODE_: {
						required: true,
						minlength: 5
					}
				},
			
				messages: {
					email: "Please enter an e-mail address",
					email_confirm: "Please make sure your e-mails match",
					POSTAL_CODE_: "Please enter your 5 digit ZIP code"
				},
			
				showErrors: function(errorMap, errorList) {
					if (errorList.length) {
						module.find('.message').addClass('alert').html(errorList[0].message);
						// select the email field
						element = $(errorList[0].element);
						if (element.hasClass('isemail')) {
							element.select();
						}
						// only show one error at a time for this form
						this.errorList = [this.errorList[0]];
	//					this.defaultShowErrors();
					}
				}		
		
			});  // form-validate
	
		}
	}
};

//US Phone Number Validation Method for jQuery validation
$.validator.addMethod("phoneUS", function(phone_number, element) {
	phone_number = phone_number.replace(/\s+/g, ""); 
	return this.optional(element) || phone_number.length > 9 &&
	phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

//US Zip Code Validation Method for jQuery validation
$.validator.addMethod("zipUS", function(zip_code, element) {
	zip_code = zip_code.replace(/\s+/g, ""); 
	return this.optional(element) || zip_code.length > 4 &&
	zip_code.match(/^\d{5}(-\d{4})?$/);
}, "Please specify a valid zip code");
