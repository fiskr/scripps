SNI.HGRM.BrowserCheck = {
	init: function() {
		if ($.browser.msie && parseInt($.browser.version) < 9 ) {

			var bc = this;

			if (SNI.Util.Cookie.get('upgradeReminderSet') == null) { 

				var html = '<div id="ie6-msg" class="box caution"><div class="hd"><span class="close"></span></div><div class="bd" id="ie6-txt"><h3>We detected your browser is out of date.</h3><p>For the best possible experience, upgrade to the latest version of <a href="http://www.browserforthebetter.com/download.html" target="_blank">Internet Explorer</a>, or try one of these fine browsers: <a href="http://www.firefox.com" target="_blank">Firefox</a> or <a href="http://www.apple.com/safari/download/" target="_blank">Safari</a>.</p>';

				if (SNI.Util.Cookie.get('upgradePreviouslyReminded') == '1') {
					html += '<p class="remind"><a href="#" class="yes">Remind Me in 30 Days</a> or <a href="#" class="no">Don\'t Remind Me</a></p>';
				}

				html += '</div></div>';

				html = $(html);
	
				$('span.close, .remind a.yes', html).click(function() {
					bc.setReminder(30);
					$(html).slideUp();
					SNI.HGRM.Omniture.SingleVar(this, "UpgradeIE6 ", "HGRM");
					return false;
				});
		
				$('.remind a.no', html).click(function() {
					bc.setReminder(365);
					$(html).slideUp();
					SNI.HGRM.Omniture.SingleVar(this, "UpgradeIE6 ", "HGRM");
					return false;
				});

	
				if ($('#board_main').length) {
					$('#board_main').prepend(html);
				}
				else {				
					$('.top-panel').append(html);
				}

				html.show();

				SNI.HGRM.Omniture.SingleVar("#ie6-msg #ie6-txt", "UpgradeIE6 ", "Food");
				SNI.HGRM.Omniture.SingleVar("#ie6-msg ul li", "UpgradeIE6 ", "Food");
				SNI.HGRM.Omniture.SingleVar("#ie6-msg .remind", "UpgradeIE6 ", "Food");
			}
		}
	},
	
	setReminder: function(days) {
		SNI.Util.Cookie.set('upgradeReminderSet', '1', days);
		SNI.Util.Cookie.set('upgradePreviouslyReminded', '1', 365*2);
	}
};

// set this to always get run
$(document).ready(function() {
	SNI.HGRM.BrowserCheck.init();
});