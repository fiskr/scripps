// JS for Site Toolbar: Articles
if( typeof(SNI.HGTV.Toolbar) == "undefined" ) {
    SNI.HGTV.Toolbar = {};
}

SNI.HGTV.Toolbar = {

    toolbar: "#toolbar",

    toolbarElement: $(SNI.HGTV.Toolbar.toolbar),

    revealModule: function(trigger,module) {
        $(SNI.HGTV.Toolbar.toolbar).find(trigger).click(function() {
            module.fadeIn(SNI.HGTV.ANIMATION_SPEED);
            $(this).addClass("active");
            // Firing the clicktrack event here results in smoother performance as it executes after the email popup appears
            SNI.Omniture.ClickTrackFire(trigger + " a", "Social Toolbar");
            return false;
        })
    },

	/* Modified 05-03-2011 by Matt Heisig
	*  MM-2116: Clear message, captcha and "send to" emails on close
	*           Improved element caching
	*/
    closeModule: function(trigger,module,speed) {
        var $trigger = $(trigger);

        if (speed == null) {
            speed = SNI.HGTV.ANIMATION_SPEED;
        }
        module.fadeOut(speed);
        if ($trigger.hasClass("active")) {
            $trigger.removeClass("active");
        }
        if ($trigger.is(".email")) {
            module.find("textarea").val("I think this is just what you've been looking for.");
            module.find("#friends-email").val("");
            module.find("#captcha_answer").val("");
        }
    },

	fontResizeTgt: "#hg-art-we",

    fontResize: function(element) {
        $(element).find("li").click(function(){
            var defaultSize = "100%";
            $(element).find("li").removeClass("active");
            $(this).addClass("active");
            if ($(this).hasClass("med")) {
                $(SNI.HGTV.Toolbar.fontResizeTgt).css("font-size",defaultSize);
            } else if ($(this).hasClass("sm")) {
                $(SNI.HGTV.Toolbar.fontResizeTgt).css("font-size","85%");
            } else {
                $(SNI.HGTV.Toolbar.fontResizeTgt).css("font-size","116%");
            }
        });
    },

    printPage: function() {
        var module = $("#print-select");
        if (module.length == 0 ) return;
        SNI.HGTV.Toolbar.revealModule(".print",module);
        $("em.close").click(function(){
            SNI.HGTV.Toolbar.closeModule(".print",module);
        });
        $(".email").click(function(){
            SNI.HGTV.Toolbar.closeModule(".print",module);
        });
    },

    emailAFriend: function(inMod) {
        if (inMod == undefined) {
            SNI.HGTV.Toolbar.emailAFriend1($("#email-a-friend"));
        } else {
            SNI.HGTV.Toolbar.emailAFriend2($(inMod));
        }
    },

    emailAFriend2: function(module){
        var form = module.find("form");
        initMessage = form.find("textarea").val();
        // If you click on print, close the email drop-down
        //		$(".print").click(function(){
        //			SNI.HGTV.Toolbar.closeModule(".email",$("#email-a-friend"));
        //		});

        //		close_module = function(speed) {
        //			if (speed == null) {
        //				speed = SNI.HGTV.ANIMATION_SPEED;
        //			}
        //			module.fadeOut(speed);
        //		};
        clear_form = function() {
            form.find("input:text").each(function(){
                $(this).val("");
            });
            form.find("textarea").val(initMessage);
            form.find("label").removeClass("error");
            module.find(".message").removeClass("alert").text("All fields are required.");
            return;
        };
        clear_form();

        // Reveal the Email-A-Friend Panel
        //		$(SNI.HGTV.Toolbar.toolbar).find(".email").click(function(){
        //			clear_form();
        //	/		module.fadeIn(SNI.HGTV.ANIMATION_SPEED);
        //			return false;
        //		});
        //		module.find(".close").click(function(){
        //			close_module();
        //		});
        //		$("#email-a-friend form .form-submit a").click(function(){
        //			close_module();
        //			return false;
        //		});
        $("#pgallery3 .email form .form-submit a").click(function(){
            clear_form();
            return false;
        });

        if (mdManager.getPageTitle) {
            var page_title = mdManager.getPageTitle();
            success_message = module.find('.success strong');
            success_message.text(page_title);
        } else {
            success_message.text('this page');
        }
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
                var txtarea_comment = txtarea.val();
                var page_title = mdManager.getPageTitle();
                var msg_body = form.find('input[name="from_name"]').val() + " thought you would be interested in this link to \"" + page_title + "\" on the  HGTV Web site:\n\n";
                msg_body += "http://" + location.hostname;
                msg_body += mdManager.getParameter("Url") + "\n\n";
                if (txtarea.val() != "") {
                    msg_body += "Comments from " + form.find('input[name="from_name"]').val() + ":\n";
                    msg_body += txtarea.val();
                };

                module.find('.message').hide().removeClass("alert");
                form.find('fieldset').hide();
                form.find("label").removeClass("error");
                form.find('button').addClass('disabled').attr('disabled', 'disabled');
                form.find('.cancel').addClass("disabled");
                form.find('.loading').show();
                txtarea.val(msg_body);

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
                            txtarea.val(txtarea_comment);
                            form.find('fieldset').show();
                            form.find('button').removeClass('disabled').removeAttr('disabled');
                            form.find('.cancel').removeClass("disabled");
                            form.find("label[for='friends-email']").addClass("error");
                            $("#friends-email").select();
                            module.find('.message').addClass("alert").text("Whoops. The e-mail could not be sent to one or more of your friends. Please check the format of their e-mail address and re-enter (i.e. joe@HGTV.com).").show();
                        } else {
                            var success = module.find('.success');
                            //	var page_title = mdManager.getPageTitle();
                            var page_title = "this page"
                            form.hide();
                            success.show();
                            var timeout = setTimeout(function(){
                                //								close_module(300);
                                //								module.hide();
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
                                form.find('fieldset').show();
                            }, 3000);
                            $(".close").click(function(){
                                clearTimeout(timeout);
                                close_module();
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

    emailAFriend1: function(module){
        var form = module.find("form");
        var null_value = "";
        var initMessage = form.find("textarea").val();

        // If you click on print, close the email module
        $(".print").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
        });
        // Reveal the Email-A-Friend Panel
        SNI.HGTV.Toolbar.revealModule(".email",module);
        $(".close").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
        });
        $(".form-submit a").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
            return false;
        });

        if (mdManager.getPageTitle) {
            var page_title = mdManager.getPageTitle();
            var success_message = module.find('.success strong');
            success_message.text(page_title);
        } else {
            success_message.text('this page');
        };

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
                var txtarea_comment = txtarea.val();
                var page_title = mdManager.getPageTitle();
                var msg_body = form.find('input[name="from_name"]').val() + " thought you would be interested in this link to \"" + page_title + "\" on the  HGTV Web site:\n\n";
                msg_body += "http://" + location.hostname;
                msg_body += mdManager.getParameter("Url") + "\n\n";
                if (txtarea.val() != null_value) {
                    msg_body += "Comments from " + form.find('input[name="from_name"]').val() + ":\n";
                    msg_body += txtarea.val();
                };

                module.find('.message').hide().removeClass("alert");
                form.find('fieldset').hide();
                form.find("label").removeClass("error");
                form.find('button').addClass('disabled').attr('disabled', 'disabled');
                form.find('.cancel').addClass("disabled");
                form.find('.loading').show();
                txtarea.val(msg_body);

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
                            txtarea.val(txtarea_comment);
                            form.find('fieldset').show();
                            form.find('button').removeClass('disabled').removeAttr('disabled');
                            form.find('.cancel').removeClass("disabled");
                            form.find("label[for='friends-email']").addClass("error");
                            $("#friends-email").select();
                            module.find('.message').addClass("alert").text("Whoops. The e-mail could not be sent to one or more of your friends. Please check the format of their e-mail address and re-enter (i.e. joe@HGTV.com).").show();
                        } else {
                            var success = module.find('.success');
                            //	var page_title = mdManager.getPageTitle();
                            var page_title = "this page"
                            form.hide();
                            success.show();
                            var timeout = setTimeout(function(){
                                SNI.HGTV.Toolbar.closeModule(".email",module,300);
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
                                SNI.HGTV.Toolbar.closeModule(".email",module);
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

    emailAFriendCaptcha: function(module){
        var module = $("#email-a-friend");
        var form = module.find("form");
        var null_value = "";
        var initMessage = form.find("textarea").val();
        form.submit(function(e){
            e.preventDefault();
            return false;
        });
        function newCaptchaImg() {
            addtime = new Date().getTime();
        };

        //load captcha when email flyout displays
        $(".email").click(function() {
            form.find('#captcha-img').html('<img src="/app/emailservice2/captchaImg" height="30" width="93" />');
        });

        /**
        * Modified 05-03-2011: MM-2158: Removed ".email" from jQuery selector to prevent
        * double event attachment resulting in two Captcha requests
        */
        //refresh captcha image when refresh link is clicked
        $("#captcha-request a").click(function() {
            newCaptchaImg();
            form.find('#captcha-img').html('<img src="/app/emailservice2/captchaImg?generateNew=true&t=' + addtime + '" height="30" width="93" />');
            return false;
        });

        // If you click on print, close the email module
        $(".print").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
        });
        // Reveal the Email-A-Friend Panel
        SNI.HGTV.Toolbar.revealModule(".email",module);
        $(".close").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
        });
        $(".form-submit a").click(function(){
            SNI.HGTV.Toolbar.closeModule(".email",module);
            return false;
        });

        if (mdManager.getPageTitle) {
            var page_title = mdManager.getPageTitle();
            var success_message = module.find('.success strong');
            success_message.text(page_title);
        } else {
            success_message.text('this page');
        };

        //captcha msg value
        var captcha_msg = "Whoops. Please enter the characters in the image to verify you are human."

        //	Validation && Submit
        form.validate({
            errorLabelContainer: form.find("p.message"),
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
                    email: "Whoops. Please check the format of your e-mail address and re-enter (i.e. joe@hgtv.com)."
                },
                to_emails: {
                    required: "Whoops. Please enter at least one friend e-mail address.",
                    multipleEmails: "Whoops. One or more of your friend e-mail addresses is not formatted correctly. Please check the format and re-enter (i.e. joe@hgtv.com)."
                },
                captcha_answer: {
                    required: captcha_msg
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
                var txtarea_comment = txtarea.val();
                var page_title = mdManager.getPageTitle();
                var msg_body = form.find('input[name="from_name"]').val() + " thought you would be interested in this link to \"" + page_title + "\" on the  HGTV Web site:\n\n";
                msg_body += "http://" + location.hostname;
                msg_body += mdManager.getParameter("Url") + "\n\n";
                if (txtarea.val() != null_value) {
                    msg_body += "Comments from " + form.find('input[name="from_name"]').val() + ":\n";
                    msg_body += txtarea.val();
                };

                module.find('.message').hide().removeClass("alert");
                form.find('fieldset').hide();
                form.find("label").removeClass("error");
                form.find('button').addClass('disabled').attr('disabled', 'disabled');
                form.find('.cancel').addClass("disabled");
                form.find('.loading').show();
                txtarea.val(msg_body);

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
                    dataType: 'json',
                    data: form_data.slice(0,-1),
                    cache: false,
                    success: function(data){
                        form.find('.loading').hide();
                        var response = $(data);
                        var emailSent = data.emailSent;
                        var captchaCorrect = data.captchaAnswerValid;

                        if (!emailSent) {
                            txtarea.val(txtarea_comment);
                            form.find('fieldset').show();
                            form.find('button').removeClass('disabled').removeAttr('disabled');
                            form.find('.cancel').removeClass("disabled");

                            if (!captchaCorrect) {
                                form.find("label[for='captcha_answer']").addClass("error");
                                $("#captcha_answer").select();
                                module.find('.message').addClass("alert").text(captcha_msg).show();

                            } else {
                                form.find("label[for='friends-email']").addClass("error");
                                $("#friends-email").select();
                                module.find('.message').addClass("alert").text("Whoops. The e-mail could not be sent to one or more of your friends. Please check the format of their e-mail address and re-enter (i.e. joe@HGTV.com).").show();
                            }

                        } else {
                            var success = module.find('.success');
                            //	var page_title = mdManager.getPageTitle();
                            var page_title = "this page"
                            form.hide();
                            success.show();
                            var timeout = setTimeout(function(){
                                SNI.HGTV.Toolbar.closeModule(".email",module,300);
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
                                SNI.HGTV.Toolbar.closeModule(".email",module);
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

    shareThis: function() {
        var share_url =  document.location.href;
        var page_title = jQuery("<div>"+mdManager.getPageTitle()+"</div>").text();
        this.twitter_shared_object = SHARETHIS.addEntry({
            title: page_title + " #HGTV ",
             url: share_url + "?soc=sharingtw"
        });
        this.facebook_shared_object = SHARETHIS.addEntry({
            title: page_title,
            url: share_url + "?soc=sharingfb"
        });
        /* jQuery objects will not work */
        this.twitter_shared_object.attachChicklet("twitter", SNI.HGTV.Toolbar.toolbarElement.find(".sharing .twitter a.chicklet")[0]);
        this.facebook_shared_object.attachChicklet("facebook", SNI.HGTV.Toolbar.toolbarElement.find(".sharing .facebook a.chicklet")[0]);


	$('li.twitter a.chicklet').click(function(event) {event.stopPropagation()});

	},

    clickTrack: function() {
        /**
         * @description MM-2793: BI wants rel values added depending on the number/position of links in the toolbar
         * @author Matt Heisig
        */
        SNI.HGTV.Toolbar.toolbarElement.find('.sharing a:visible').each(function (i) {
            if (this.rel) {
                this.rel += " scltb-" + (++i);
            } else {
                this.rel = "scltb-" + (++i);
            }
        });

        SNI.HGTV.Omniture.ClickTrack(SNI.HGTV.Toolbar.toolbar + ", #toolbar .twitter a", "Social Toolbar");
    },

    init: function(){
        if(!SNI.HGTV.Toolbar.toolbarElement || SNI.HGTV.Toolbar.toolbarElement.length == 0) {
            SNI.HGTV.Toolbar.toolbarElement = jQuery(SNI.HGTV.Toolbar.toolbar);
        }

        SNI.HGTV.Toolbar.fontResize(".font-resize");
        SNI.HGTV.Toolbar.printPage();


        if(SNI.HGTV.Toolbar.toolbarElement.find(".sharing .facebook a.chicklet").length > 0) {
            SNI.HGTV.Toolbar.shareThis();
        }

        if (jQuery("#email-a-friend form").attr("name")) {
            SNI.HGTV.Toolbar.emailAFriendCaptcha();
        }
        else {
            SNI.HGTV.Toolbar.emailAFriend();
        }

        if ($('#toolbar #fb-root').length === 0) {
            SNI.HGTV.IS.FB.like({element: "#toolbar .facebook-like"});
        }

        $(function(){
            var pintitle = mdManager.getParameterString('title') + " - on HGTV",
                pinurl = 'http://' + SNI.Config.domain + '/' + mdManager.getParameterString("url");

            switch(mdManager.getParameterString('delvFrmt')){
            case 'ARTICLE_BEAUTY' : case 'ARTICLE_BIO' : case 'ARTICLE_BUILDER_SIMPLE' :
                    var pinmedia = $('#art-image img').attr('src');
                break;

            default :
                    var pinmedia = $('img[itemprop=contentUrl]').first().attr('src');
                break;
            }
            if(!pinmedia) pinmedia = "http://hgtv.sndimg.com/HGTV/2012/07/02/HGTV_favicon_s92x69.png";
            $('#toolbar .pinit a').attr('href','http://pinterest.com/pin/create/button/?url='+encodeURIComponent(pinurl)+ encodeURIComponent("?soc=sharingpinterest")+"&description="+encodeURIComponent(pintitle)+"&media="+encodeURIComponent(pinmedia));
        });
        SNI.HGTV.Toolbar.clickTrack();
    },

    addPintrestShare: function(selector_id, img_url, description, from_message){
        SNI.IS.Pinterest.createButton({
            'element': selector_id,
            'imgUrl': img_url,
            'desc': description,
            'fromMsg': from_message
        });
    },

    addFacebookShare: function(selector_id) {
        config = {'element': selector_id,
	          'layout':'button_count',
	          'show_faces':'true',
	          'width' : '50',
	          'font':'trebuchet ms',
	          'colorscheme':'light'};
	SNI.IS.FB.like(config);
    },

    addTwitterShare: function(selector_id) {
        SNI.IS.Twitter.tweet({'element': selector_id});
    },

    addGooglePlusShare: function(selector_id) {
        SNI.IS.GP.plusone({'element': selector_id, 'annotation': 'bubble', 'size': 'medium'});
    },

    addShareThis: function (config, type) {
        /*  title: config.tweet_msg, url: config.share_url */
            SNI.IS.ShareThis.init(config, type);
    }
};