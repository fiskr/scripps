/* some functions specific to IE */
if ($.browser.msie) {
	$(function() {
		// add active states to buttons since IE doesn't recognice the :active state in CSS
		$('button.button').mousedown(function() {
			$(this).addClass('active');
		}).mouseup(function() {
			$(this).removeClass('active');
		});
		
		// fire off blur so that IE will remove the active state from the link
		$('a.button, .button-nav a, a.button-sm, .button-nav-sm a').mouseup(function() {
			$(this).blur();
		});
	});
}

SNI.HGTV.BrowserCheck = {
	init: function() {
		if ($.browser.msie && parseInt($.browser.version) < 7 && !window.XMLHttpRequest && ($("body#print").length == 0) ) {

			var bc = this;

			if (SNI.Util.Cookie.get('upgradeReminderSet') == null) { 

				var html = '<div id="ie6-msg" class="clrfix"><a href="#" class="close">Close</a><div id="ie6-txt"><h3>We Noticed You Are Using Internet Explorer 6.</h3><p>We detected your browser is out of date. For the best possible experience, upgrade to the latest version of <a href="http://www.browserforthebetter.com/download.html" target="_blank">Internet Explorer</a>, or try one of these fine browsers: <a href="http://www.firefox.com" target="_blank">Firefox</a> or <a href="http://www.apple.com/safari/download/" target="_blank">Safari</a>.</p>';
				
				if (SNI.Util.Cookie.get('upgradePreviouslyReminded') == '1') { 
					html += '<p class="remind"><a href="#" class="yes">Remind Me in 30 Days</a> or <a href="#" class="no">Don\'t Remind Me</a></p>';
				}

				html += '</div><ul><li><a id="icn-ie" href="http://www.browserforthebetter.com/download.html" target="_blank">Get Internet Explorer</a></li><li><a id="icn-ff" href="http://www.firefox.com" target="_blank">Get Firefox</a></li><li><a id="icn-sf" href="http://www.apple.com/safari/download/" target="_blank">Get Safari</a></li></ul></div>';

				html = $(html);
	
				$('a.close, .remind a.yes', html).click(function() {
					bc.setReminder(30);
					$(html).slideUp();
					SNI.HGTV.Omniture.ClickTrackSingle(this, "UpgradeIE6 ", "HGTV");
					return false;
				});
		
				$('.remind a.no', html).click(function() {
					bc.setReminder(365);
					$(html).slideUp();
					SNI.HGTV.Omniture.ClickTrackSingle(this, "UpgradeIE6 ", "HGTV");
					return false;
				});

	
				if ($('#hg-bd').length) {
					$('#hg-bd').prepend(html);
				}
				else {				
					$('#site-wrapper').prepend(html);
				}

				html.show();

				SNI.HGTV.Omniture.ClickTrackSingle("#ie6-msg #ie6-txt", "UpgradeIE6 ", "Food");
				SNI.HGTV.Omniture.ClickTrackSingle("#ie6-msg ul li", "UpgradeIE6 ", "Food");
				SNI.HGTV.Omniture.ClickTrackSingle("#ie6-msg .remind", "UpgradeIE6 ", "Food");
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
	SNI.HGTV.BrowserCheck.init();
});