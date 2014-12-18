
if( typeof(SNI.HGTV.SweepsInvite) == "undefined" ) {
	SNI.HGTV.SweepsInvite = {};
}

SNI.HGTV.SweepsInvite = {
	
	invite: "#sweeps-invite",
	
	revealModule: function(trigger,module) {
		$(SNI.HGTV.SweepsInvite.invite).find(trigger).click(function() {
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
	
	inviteAFriend: function(){
		var module = $("#invite-a-friend");
		var form = module.find("form");
		var null_value = "";
		
		//init Single Tracking on Submit Button
		SNI.HGTV.Omniture.ClickTrackSingleCustom("#invite-button", "GH09:InviteFriends", "prop2", "")		

		// Reveal the Email-A-Friend Panel
		SNI.HGTV.SweepsInvite.revealModule(".email",module);
		$(".close").click(function(){
			SNI.HGTV.SweepsInvite.closeModule(".email",module);
		});
		$(".form-submit a").click(function(){
			SNI.HGTV.SweepsInvite.closeModule(".email",module);
			return false;
		});

	 //	Validation && Submit
		form.validate({
			errorLabelContainer: false,
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
				var txtarea = form.find('textarea[name="body"]');
				msg_body_full = form.find('input[name="from_name"]').val() + msg_body;
				txtarea.val(msg_body_full);
				
				module.find('.message').hide().removeClass("alert");
				form.find('fieldset').hide();
				form.find("label").removeClass("error");
				form.find('button').addClass('disabled').attr('disabled', 'disabled');
				form.find('.cancel').addClass("disabled");
				form.find('.loading').show();
				
			//	var form_data = form.find(":input:not('button')").serialize();
				var form_data = "";
				form.find(":input:not('button')").each(function(){
					var input_name = $(this).attr("name");
					var input_value = $(this).val();
					form_data += input_name + "=" + input_value + "&"; 
				});
				$.ajax({
					type: "POST",
					url: form.attr("action"),
					data: form_data.slice(0,-1),
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
								SNI.HGTV.SweepsInvite.closeModule(".email",module,300);
								module.hide();
								// Reset form
								success.hide();
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
								SNI.HGTV.SweepsInvite.closeModule(".email",module);
								module.hide();
								// Reset form
								success.hide();
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
						form.find('fieldset').show();
						form.find('button').removeClass('disabled').removeAttr('disabled');
						form.find('.cancel').removeClass("disabled");
						module.find('.message').addClass("alert").text("Whoops. We encountered an error when trying to e-mail this page. Please wait a few moments and try again.").show();
					}
 				}); 
			}
		});
	}
	
};
	