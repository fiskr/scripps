SNI.DIY.BrowserCheck = {
	init: function() {
		if ($.browser.msie && parseInt($.browser.version) < 7 && !window.XMLHttpRequest) {
			var bc = this;

			if (SNI.Util.Cookie.get('upgradeReminderSet') == null) { 

				var html = '<div id="browser-msg" class="notice-msg clrfix"><a href="#" class="close">Close</a><div class="col1"><h4>We noticed you are using Internet Explorer 6.</h4><p>We detected your browser is out of date. For the best possible experience upgrade to the latest version of <a href="http://www.microsoft.com/windows/downloads/ie/">Internet Explorer</a>, or try one of these fine browsers: <a href="http://www.getfirefox.com/">Firefox</a> and <a href="http://www.apple.com/safari/download/">Safari</a>.</p></div><div class="col2"><p><a href="http://www.microsoft.com/windows/downloads/ie/" class="button"><span>Upgrade Internet Explorer</span></a></p>';
				
				if (SNI.Util.Cookie.get('upgradePreviouslyReminded') == '1') { 
					html += '<p class="remind"><a href="#" class="yes">Remind Me in 30 Days</a> or <a href="#" class="no">Don\'t Remind Me</a></p>';
				}
				
				html += '</div></div>';
				html = $(html);
	
				$('a.close, .remind a.yes', html).click(function() {
					bc.setReminder(30);
					html.slideUp();
					SNI.DIY.Omniture.ClickTrackSingle(this, "UpgradeIE6 ", "DIY");
					return false;
				});
		
				$('.remind a.no', html).click(function() {
					bc.setReminder(365);
					html.slideUp();
					SNI.DIY.Omniture.ClickTrackSingle(this, "UpgradeIE6 ", "DIY");
					return false;
				});
	
				$('#diy-bd').prepend(html);
				html.show();
				SNI.DIY.Omniture.ClickTrackSingle("#browser-msg .col1", "UpgradeIE6 ", "DIY");
				SNI.DIY.Omniture.ClickTrackSingle("#browser-msg .col2", "UpgradeIE6 ", "DIY");
				SNI.DIY.Omniture.ClickTrackSingle("#browser-msg .remind", "UpgradeIE6 ", "DIY");
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
	SNI.DIY.BrowserCheck.init();
});
