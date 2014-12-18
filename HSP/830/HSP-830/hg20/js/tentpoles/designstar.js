/* instantiate object namespace */
	if(typeof(SNI.HGTV.DesignStar)=='undefined') {
		SNI.HGTV.DesignStar = {};
	}
	
	SNI.HGTV.DesignStar.dsTabs = function(jsel) {
		$('.ds-tabs .ui-tabs-nav li').each(function(i) {
			$(this).addClass("tab-num-" + i); // add class name to each tab
		});
		
		$('.ds-tabs .tab-well').each(function(i) {
			$(this).addClass("tab-num-" + i); // add class name to each tab well
		});
		
		$('.ds-tabs .tab-well').not(".tab-num-0").hide(); // hide all but the first
		
		$('.ds-tabs .ui-tabs-nav li').click(function(){
			if($(this).hasClass('ui-tabs-selected')) { // if it is already active
				return false; // do nothing
			} else {
				$(this).siblings().removeClass('ui-tabs-selected'); // remove it from siblings
				
				var selectedClass = $(this).attr("class"); // get the tab's class
				
				$('.ds-tabs .tab-well').each(function(){ 
					if($(this).hasClass(selectedClass)) { // if it has the target class
						$(this).show(); // show it
						$(this).siblings().hide(); // hide the rest
					}
				});
								
				$(this).addClass('ui-tabs-selected'); // add the class
				return false; // kill the href
			}
		});	

	};
	
	SNI.HGTV.DesignStar.bodyHook = function() {
		var bodyClass = $('#body-hook').attr('rel');
		$('body').addClass(bodyClass);
	};
	
	
SNI.HGTV.DesignStar.Medialibrary = function(element, config) {

		// prime the toggles for the video channels
		togglelist = $(element).find('li.switch');

		carouselCount = 0;	
		togglelist.each(function(){

			var $this = $(this);

			// click target for li toggle
			var target = $this.find("h4");

			if (carouselCount < 4) {
				$this.addClass("selected");
			}


			// hide carousel if active class not present
			if (!$this.hasClass("selected")) {
				//$this.find(".bd").hide();
				$this.find(".channel-bd").hide();
			}

			target.click(function(){
				if ($this.hasClass("selected")) {
					$this.removeClass("selected");
					//$this.find(".bd").hide();
					$this.find(".channel-bd").hide();
				} else {
					$this.addClass("selected");
					//$this.find(".bd").show();
					$this.find(".channel-bd").show();
				}

			carouselCount++;
			});


		});
};	// end Medialibrary

SNI.HGTV.DesignStar.ThankYouToggle = function(element, config) {
	var submitStatus = '';
	if ($.query.has('fvEmail')) {
		submitStatus = $.query.get('fvEmail');
	}	
	
	if (submitStatus != '') {
		$("#thank-you-message").show();
	}

	$("#ty-close").click(function(){
		$("#thank-you-message").hide();
	});


};	// end Thank You Toggle


SNI.HGTV.DesignStar.ReminderSignUp = {
	
	remind: "#reminders",
	
	revealModule: function(trigger,module) {
		$(SNI.HGTV.DesignStar.ReminderSignUp.remind).find(trigger).click(function() {
			module.fadeIn(SNI.HGTV.ANIMATION_SPEED);
			$(this).addClass("active");
			return false;
		});
	},
	
	closeModule: function(trigger,module,speed) {
		if (speed === null) {
			speed = SNI.HGTV.ANIMATION_SPEED;
		};
		module.fadeOut(speed);
		if ($(trigger).hasClass("active")) {
			$(trigger).removeClass("active");
		}
	},
	
	signUp: function(){
		var module = $("#reminder-signup");
		var form = module.find("form");
		var null_value = "";
		
		//init Single Tracking on Submit Button
		//SNI.HGTV.Omniture.ClickTrackSingleCustom("#invite-button", "DS09:Reminder", "prop2", "")		

		// Reveal the Email-A-Friend Panel
		SNI.HGTV.DesignStar.ReminderSignUp.revealModule(".reminder",module);
		$(".close").click(function(){
			SNI.HGTV.DesignStar.ReminderSignUp.closeModule(".reminder",module);
		});
		$(".form-submit a").click(function(){
			SNI.HGTV.DesignStar.ReminderSignUp.closeModule(".reminder",module);
			return false;
		});



	 //	Validation && Submit
		form.validate({

			debug: false,
		
			rules: {
				FIRST_NAME_: "required",
				LAST_NAME_: "required",
				email: "email",
				email: { 
					required: true,
					email: true
				},
				email_confirm: {
					required: true,
					equalTo: "#email"
				}
			},

			messages: {
				FIRST_NAME_: "Please enter your first name",
				LAST_NAME_: "Please enter your last name",
				email: "Please enter an e-mail address",
				email_confirm: "Please make sure your e-mails match"
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
	
}; // end Reminder Sign-up

// Countdown module
(function($) {
	$.fn.countDown2 = function(options) {
		var options = $.extend({
			container		: null,
			date			: 'January 1, 2099 00:00:00',
			updateInterval	: .5,
			wraps			: null,
			onExpire		: function() {}
		}, options);
		return this.each(function(i) {
			var obj = this;
			var today = new Date();
			var endDate = new Date(options.date);
			var ms = Math.floor(endDate.getTime() - today.getTime());
			function two(x) {return ((x>9)?"":"0")+x};
			function three(x) {return ((x>99)?"":"0")+((x>9)?"":"0")+x};
			/* function MS2DHMSMS() - converts milliseconds to days : hrs : min : sec : ms */
			function MS2DHMSMS(ms) {
				var nt = {};
				var sec = Math.floor(ms/1000);
				ms = ms % 1000;
				nt.ms = three(ms).toString();
				var min = Math.floor(sec/60);
				sec = sec % 60;
				nt.ss = two(sec).toString();
				var hr = Math.floor(min/60);
				min = min % 60;
				nt.mm = two(min).toString();
				var day = Math.floor(hr/24);
				hr = hr % 24;
				nt.hh = two(hr).toString();
				nt.dd = day.toString();
				return nt;
			}
			function getTimeLeft() {
				var today = new Date();
				var ms = Math.floor(endDate.getTime() - today.getTime());
				sLeft = MS2DHMSMS(ms).ss;
				mLeft = MS2DHMSMS(ms).mm;
				hLeft = MS2DHMSMS(ms).hh;
				dLeft = MS2DHMSMS(ms).dd;
				if ( dLeft <= 0 ) {
					if ( hLeft <= 0 ) {
						if ( mLeft <= 0 ) {
							if ( sLeft <= 0 ) {
								options.onExpire.call(this, obj);
							}
						}
					}
				}
				if ( options.wraps == null ) {
					$(obj).html('<span class="jcdDays">' + dLeft + '</span>&nbsp;<span class="jcdDaysText">day' + s + '</span>&nbsp;<span class="jcdHours">' + hLeft + '</span>:<span class="jcdMinutes">' + mLeft + '</span>:<span class="jcdSeconds">' + sLeft + '</span>');
				} else {
					for ( x in options.wraps ) {
						if ( x == 'days' ) { $(options.wraps[x]).html(dLeft); }
						if ( x == 'hours' ) { $(options.wraps[x]).html(hLeft); }
						if ( x == 'minutes' ) { $(options.wraps[x]).html(mLeft); }
						if ( x == 'seconds' ) { $(options.wraps[x]).html(sLeft); }
					}
				}
			};
			if ( options.container ) {
				$(options.container).css('display', 'block');
				obj.container = options.container;
			}
			if ( parseInt(MS2DHMSMS(ms).dd) < 0 ) {
				options.onExpire.call(this, obj);
			} else {
				if ( options.updateInterval ) {
					setInterval(function() { getTimeLeft(); }, options.updateInterval * 1000);
				} else {
					getTimeLeft();
				}
			}
		});
	};
})(jQuery);
// end Countdown
	