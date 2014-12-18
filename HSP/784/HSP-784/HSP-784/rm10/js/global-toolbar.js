// JS for Site Toolbar: Recipes, Articles, and Episodes
if (typeof(SNI.HGRM.globalToolbar) == "undefined") {
	SNI.HGRM.globalToolbar = {};
}

SNI.HGRM.globalToolbar = {

	toolbar: ".toolbar",

	revealModule: function(trigger, module) {
		module.fadeIn(SNI.HGRM.ANIMATION_SPEED);
		module.addClass("active");
		SNI.HGRM.globalToolbar.loadCaptcha();
        // Firing the clicktrack event here results in smoother performance as it executes after the email popup appears
        SNI.Omniture.ClickTrackFire("#tb-email a", "Social Toolbar");
		return false;
	},

	closeModule: function(trigger, module, speed) {
		if (speed == null) {
			speed = SNI.HGRM.ANIMATION_SPEED;
		}
		module.fadeOut(speed);
		if ($(trigger).hasClass("active")) {
			$(trigger).removeClass("active");
		}
	},

	loadCaptcha: function() {
		var emailModule = $("#email-a-friend");
		var emailForm = emailModule.find("form");
		var addtime = new Date().getTime();
		//load captcha when email flyout displays
		emailForm.find('#captcha-img').html('<img src="http://' + SNI.Config.domain + '/app/emailservice2/captchaImg?generateNew=true&t=' + addtime + '" height="30" width="93" />');
	},

	printPage: function() {
		var config = SNI.HGRM.globalToolbar.config;
		var module = $('#tb-print');
		var printDropDown = $("#email-a-friend");
		module.append($('<a>').attr({ 'href' : config.printUrl, 'target' : '_blank'}).text("Print"));

		if (printDropDown) {
			var module = $("#print-select");
			var printLink = $('#print a.print');
			// positioning needs to be fixed
			printLink.click(function(event) {
				var linkPos = printLink.offset().left;
				module.css("left", (linkPos - 240));
				event.preventDefault();
				SNI.HGRM.globalToolbar.revealModule(".print", module);
			});

			$("em.close").click(function() {
				SNI.HGRM.globalToolbar.closeModule(".print", module);
			});

			$("#email").click(function() {
				SNI.HGRM.globalToolbar.closeModule(".print", module);
			});
		}
	},

	createEmail: function() {
		var config = SNI.HGRM.globalToolbar.config;
		var module = $('#tb-email');
		var emailModule = $("#email-a-friend");
		module.append($('<a>').attr({ 'href' : '#'}).text("E-Mail")).click(function(event) {
			event.preventDefault()
		});

		$('#email-a-friend').load(config.emailModulePath, function() {
			SNI.HGRM.globalToolbar.emailAFriend();

			$(".close, .box .hd span, .cancel a").click(function() {
				SNI.HGRM.globalToolbar.closeModule("#email", emailModule);
				return false;
			});

		});
		module.click(function() {
			SNI.HGRM.globalToolbar.revealModule("#email", $("#email-a-friend"));
		});
	},

	emailAFriend: function() {
		var config = SNI.HGRM.globalToolbar.config;
		var null_value = "";
		var emailModule = $("#email-a-friend");
		var emailForm = emailModule.find("form");
        var emailSubject = emailForm.find('input[name="subject"]').val(config.emailSubject);
        var emailComments = emailForm.find('textarea[name="body"]').val(config.emailComments);
		var fromName = emailForm.find('input[name="from_name"]');
        var success = emailModule.find('.success');

		//refresh captcha image when refresh link is clicked
		$("#captcha-request a").click(function() {
			SNI.HGRM.globalToolbar.loadCaptcha();
			return false;
		});

		$(".form-submit a").click(function() {
			SNI.HGRM.globalToolbar.closeModule("#email", emailModule);
			return false;
		});

		if (mdManager.getPageTitle) {
			var success_message = emailModule.find('.success span');
			success_message.text(config.emailPageTitle + " ");
		} else {
			success_message.text('this page');
		}

		//captcha msg value
		var captcha_msg = "Whoops. Please enter the characters in the image to verify you are human.";

		//	Validation && Submit
		emailForm.validate({
			errorPlacement: function(error, element) {
				error.appendTo(".error-wrap.eaf" );
			},
			errorLabelContainer: '.error-wrap.eaf ul',
			wrapper: "li",
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
				},
				captcha_answer: {
					required: true
				}
			},
			messages: {
				from_name: {
					required: "Whoops. Please enter your name."
				},
				from_email: {
					required: "Whoops. Please enter your e-mail address.",
					email: "Whoops. Please check the format of your e-mail address and re-enter (i.e. jeff@hgtvremodels.com)."
				},
				to_emails: {
					required: "Whoops. Please enter at least one friend e-mail address.",
					multipleEmails: "Whoops. One or more of your friend e-mail addresses is not formatted correctly. Please check the format and re-enter (i.e. jeff@hgtvremodels.com)."
				},
				captcha_answer: {
					required: captcha_msg
				}
			},
			showErrors: function(errorMap, errorList) {
				if (errorList.length) {
					this.errorList = [this.errorList[0]];					
					this.defaultShowErrors();
					$('.error-wrap').css('display','block').fadeIn();
				}
			},
			submitHandler: function() {
				var txtarea_comment = emailComments.val();
				var msg_body = '';
				msg_body += fromName.val() + ' ' + config.emailBody + "\n\n";
				msg_body += "http://" + location.hostname;
				msg_body += mdManager.getParameter("Url") + "\n\n";
				if (emailComments.val() != null_value) {
					msg_body += "Comments from " + fromName.val() + ":\n";
					msg_body += emailComments.val();
				}
                
				emailComments.val(msg_body);

				var form_data = emailForm.serialize();

				emailModule.find('.message').hide().removeClass("alert");
				emailForm.find('fieldset').hide();
				emailForm.find("label").removeClass("error");
				emailForm.find('button').addClass('disabled').attr('disabled', 'disabled');
				emailForm.find('.cancel').addClass("disabled");
				emailForm.find('.loader').show();

				$.ajax({
					type: "POST",
					url: emailForm.attr("action"),
					dataType: 'json',
					data: form_data,
					cache: false,
					success: function(data) {
						emailForm.find('.loader').hide();
						var response = $(data);
						var emailSent = data.emailSent;
						var captchaCorrect = data.captchaAnswerValid;

						if (!emailSent) {
							emailComments.val(txtarea_comment);
							emailForm.find('fieldset').show();
							emailForm.find('button').removeClass('disabled').removeAttr('disabled');
							emailForm.find('.cancel').removeClass("disabled");

							if (!captchaCorrect) {
								emailForm.find("label[for='captcha_answer']").addClass("error");
								$("#captcha_answer").select();
								emailModule.find('.message').addClass("alert").text(captcha_msg).show();

							} else {
								emailForm.find("label[for='friends-email']").addClass("error");
								$("#friends-email").select();
								emailModule.find('.message').addClass("alert").text("Whoops. The e-mail could not be sent to one or more of your friends. Please check the format of their e-mail address and re-enter (i.e. joe@foodnetwork.com).").show();
							}

						} else {
							var page_title = mdManager.getPageTitle();
							success.show();
							$('.boot .center').append('<a class="btn closer">Close</a>');
							$('.boot .center span, .boot .center button').hide();
							$('.error-wrap').hide();

							function resetForm() {
								emailModule.hide();
								// Reset form
								success.hide();
								emailComments.val(txtarea_comment);
								emailModule.find('.message').text("All fields are required.").show();
								emailForm.find("input:text").each(function() {
									$(this).val("");
								});
								emailForm.find('button').removeClass('disabled').removeAttr('disabled').show();
								$('.boot .center').remove('.closer');
								emailForm.find('.cancel').removeClass("disabled");
								emailForm.find('.closer').hide();
								emailForm.find('fieldset').show();
								emailForm.show();
							}

							var timeout = setTimeout(function() {
								SNI.HGRM.globalToolbar.closeModule("#email", emailModule, 300);
								resetForm();
							}, 3000);
							$(".close, .closer").click(function() {
								clearTimeout(timeout);
								resetForm();
								SNI.HGRM.globalToolbar.closeModule("#email", emailModule);
							});
						}
					},
					error: function() {
						emailForm.find('.loader').hide();
						emailComments.val();
						emailForm.find('fieldset').show();
						emailForm.find('button').removeClass('disabled').removeAttr('disabled');
						emailForm.find('.cancel').removeClass("disabled");
						emailModule.find('.message').addClass("alert").text("Whoops. We encountered an error when trying to e-mail this page. Please wait a few moments and try again.").show();
					}
				});

				emailForm.submit(function() {
					return false;
				});
			}
		});

	},

	toolbarElement: $(SNI.HGRM.globalToolbar.toolbar),

	fbShare: function() {
		SNI.HGRM.IS.FB.like({element: "#tb-facebook"});
	},

	twitterShare: function() {
		//SNI.HGRM.IS.Twitter.share({element: "#tb-tweet"});
        SNI.IS.Twitter.tweet({element: '#tb-tweet'});
	},

    pinterest: function() {
		return false;
    },

    gplus: function() {
        SNI.IS.GP.plusone({element: "#tb-gplus", annotation: "bubble", size: "medium"});
    },

    clickTrack: function() {
        /**
         * @description MM-2794: BI wants rel values added depending on the number/position of links in the toolbar
         * @author Matt Heisig
        */
        $(SNI.HGRM.globalToolbar.toolbar).find('a:visible').each(function (i) {
            if (this.rel) {
                this.rel += " scltb-" + (++i);
            } else {
                this.rel = "scltb-" + (++i);
            }
        });

        SNI.HGRM.Omniture.ClickTrack("#tb-print a, #tb-tweet a", "Social Toolbar");
    },

	init: function(configObj) {

		// by default all items on toolbar are included.  Options switched to false will not run.
		if (configObj.toolBarConfig) {

			var toolBarConfig = $.extend({
				createEmail: true,
				printPage: true,
				twitterShare: true,
				fbShare: true,
                pinterest: true,
                gplus: true
			}, configObj.toolBarConfig);

			SNI.HGRM.globalToolbar.config = configObj;

			$.each(toolBarConfig, function(index, value) {
				if (!value) {
				} else {
					SNI.HGRM.globalToolbar[index].apply(this)
				}
			})

		} else {
			SNI.HGRM.globalToolbar.config = configObj;
			SNI.HGRM.globalToolbar.createEmail();
			SNI.HGRM.globalToolbar.printPage();
			SNI.HGRM.globalToolbar.twitterShare();
			SNI.HGRM.globalToolbar.fbShare();
            SNI.HGRM.globalToolbar.pinterest();
            SNI.HGRM.globalToolbar.gplus();
		}

        SNI.HGRM.globalToolbar.clickTrack();
	}
};
