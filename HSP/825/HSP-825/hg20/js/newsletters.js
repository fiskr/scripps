SNI.HGTV.Newsletters = {
    subscribe: function() {
        this.setupAccordion();
		
        // setup the check all link
        $(".nl-bd .check-all a").click(function() {
            link = $(this);
			
            if (link.text() == 'Check All') {
                checked = "checked";
                link.html('<span>Uncheck All</span>');
            } else {
                checked = '';
                link.html('<span>Check All</span>');
            }
			
            $('.nl-choose :checkbox').attr('checked', checked);
			
            return false;
        });
		
        // setup form validation
        $('.nl-bd form').validate({
            errorContainer: '.nl-bd .form-errors',
            errorLabelContainer: '.nl-bd .form-errors ul',
            wrapper: "li",
            rules: {
                newsletter: {
                    required: true
                },
                fname: {
                    required: true
                },
                lname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                email2: {
                    required: true,
                    equalTo: "#email"
                },
                zip: "required"
            },
            messages: {
                newsletter: "Please choose at least one HGTV newsletter",
                fname: "Please enter your first name",
                lname: "Please enter your last name",
                email: {
                    required: "Please enter your e-mail address",
                    email: "Please check the format of your e-mail address and re-enter (i.e. joe@hgtv.com)"
                },
                email2: {
                    required: "Please confirm your e-mail address",
                    equalTo: "Please make sure your e-mail and confirmation e-mail match"
                },
                zip: "Please enter your zip code"
            },
            showErrors: function(errorMap, errorList) {
                if (errorList.length) {
                    this.defaultShowErrors();
					
                    // make sure to highlight the correct item for the newsletter checkboxes
                    element = errorList[0].element;
                    if (element.type == 'checkbox') {
                        form = $(element.form);
                        form.find("label[for=" + element.id + "]").removeClass('error');
                        form.find("label[for='newsletter']").addClass('error');
                    } else {
                        form.find("label[for='newsletter']").removeClass('error');
                    }
					
                    $('html, body').animate({
                        scrollTop: $('.nl-bd .form-errors').offset().top-10
                    }, 'slow');
					
                    $('.nl-bd .form-errors').fadeIn();
                }
            }
        });
    },
	
    changeEmail: function() {
        // setup form validation
        $('.nl-bd form').validate({
            errorContainer: '.nl-bd .form-errors',
            errorLabelContainer: '.nl-bd .form-errors ul',
            wrapper: "li",
            rules: {
                oldemail: {
                    required: true,
                    email: true
                },
                newemail: {
                    required: true,
                    email: true
                },
                newemail2: {
                    required: true,
                    equalTo: "#new-email"
                }
            },
            messages: {
                oldemail: {
                    required: "Please enter your old e-mail address",
                    email: "Please check the format of your old e-mail address and re-enter (i.e. joe@hgtv.com)"
                },
                newemail: {
                    required: "Please enter your new e-mail address",
                    email: "Please check the format of your new e-mail address and re-enter (i.e. joe@hgtv.com)"
                },
                newemail2: {
                    required: "Please confirm your new e-mail address",
                    equalTo: "Please make sure your new e-mail and confirmation e-mail match"
                }
            },
            showErrors: function(errorMap, errorList) {
                if (errorList.length) {
                    this.defaultShowErrors();
					
                    // $('html, body').animate({scrollTop: $('.nl-bd .form-errors').offset().top-10 }, 'slow');
					
                    $('.nl-bd .form-errors').fadeIn();
                }
            }
        });
    },
	
    unsubscribe: function() {
        this.setupAccordion();
		
        // setup form validation
        $('.nl-bd form').validate({
            errorContainer: '.nl-bd .form-errors',
            errorLabelContainer: '.nl-bd .form-errors ul',
            wrapper: "li",
            rules: {
                newsletter: {
                    required: true
                },
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
                newsletter: "Please choose at least one HGTV newsletter",
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
                    this.defaultShowErrors();
					
                    // make sure to highlight the correct item for the newsletter checkboxes
                    element = errorList[0].element;
                    if (element.type == 'checkbox') {
                        form = $(element.form);
                        form.find("label[for=" + element.id + "]").removeClass('error');
                        form.find("label[for='newsletter']").addClass('error');
                    } else {
                        form.find("label[for='newsletter']").removeClass('error');
                    }
					
                    $('html, body').animate({
                        scrollTop: $('.nl-bd .form-errors').offset().top-10
                    }, 'slow');
					
                    $('.nl-bd .form-errors').fadeIn();
                }
            }
        });
    },
	
    setupAccordion: function() {
        // make sure "sister newsletters" are open if needed
        $(".nl-bd .acco-res li.selected").each(function() {
            $(this).find(".acco-bd").show();
        });
		
        // setup the "sister newsletters" open and close
        $(".nl-bd .acco-res .acco-link").click(function() {
            acco_link = $(this);
            acco_bd = acco_link.next();
            acco_li = acco_link.parent();
			
            if (acco_li.hasClass("selected")) {
                acco_bd.slideUp("slow");
                acco_li.removeClass("selected");
            } else {
                acco_bd.slideDown("slow");
                acco_li.addClass("selected");
            }
        });
    },

    inlineSubscribe: function(form) {
        var $form = $(form);
        $form.validate({
            errorLabelContainer: '.nl-errors',
            wrapper: 'li',
            rules: {
                emailaddress: {
                    required: true,
                    email: true
                }
            },
            messages: {
                emailaddress: {
                    required: "Please enter an e-mail address",
                    email: "Please check the format of your e-mail address and re-enter (e.g. joe@hgtv.com)"
                }
            }
        });
    }
};

/*
 * @deprecated As of transition to StrongMail (MM-2194). Use HGTV.Newsletter.inlineSubscribe() for inline NL subscriptions
 */
(function($){
    var NewsLetterAjax = function (form){
        var $nl_form, submit_url, $nl_error_list;

        $nl_form = $(form);
        $nl_error_list = $nl_form.find(".nl-errors")
        submit_url = $nl_form.attr("action");
    //    submit_url = "/pages/newsletter.js";

        $nl_form.submit(function(e){
            $nl_form.find(".nl-loading").show();
            $nl_error_list.find("li").hide();

            var privacy = $nl_form.find("#nl-agree").attr("checked") ? 1 : "";
            var ajax_url = submit_url
            + '?&list[]='+ $nl_form.find("#nl-list").val()
            +'&email=' + $nl_form.find("#nl-emailaddress").val()
            + '&privacy=' + privacy;
            $.ajax({
                url: ajax_url,
                timeout: 10000,
                dataType: "json",
                success: function(response) {
                    $nl_form.find(".highlight").removeClass("highlight");
                    $nl_form.find("p.nl-intro").hide();
                    if(response.success === true) {
                        $nl_form.find("fieldset").hide();
                        $nl_form.find(".nl-thank-you").show();
                    } else if(response.error && response.error.code) {
                        var error = response.error;
                        $nl_error_list.find(".error-"+error.code).show();
                        /* requires plugin */
                        //                      $nl_form.find(".highlight-"+error.code).animate({backgroundColor: "#FF0000"});
                        $nl_form.find(".highlight-"+error.code).addClass("highlight");
                    // });
                    }
                    $nl_form.find(".nl-loading").fadeOut("fast");

                }
            });
            e.preventDefault();
            return false;
        });
        return $nl_form;
    }

    SNI.HGTV.Newsletters.ajaxHandler = NewsLetterAjax;
})(jQuery);
