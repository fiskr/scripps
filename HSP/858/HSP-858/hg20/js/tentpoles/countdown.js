/* start jQuery countdown plugin */
/*
	Countdown Pugin for jQuery by Chris Engle
	last modified: 12-02-08, 13:43
		+ ADDED 12-02-08 module is now capable of counting down to a particular second if needed
			examples on init:
				Thu Jan 01, 2009 09:00:00 - countdown to Jan 1, 2009 at 9AM Eastern Time
				May 5, 2010 20:00:00 GMT-0600 (Central Time) - countdown to 8PM on May 5, 2010 Central Time
		+ FIXED 12-09-08 conversion from milliseconds to days : hours : minutes : seconds : 
	
	Sets the innerHTML of matched elements to a time based on date option to count down until.
	jQuery( [matched_elements] ).countDown( {[options]} );
	
	options:
		date			[string]	'January 1, 2099'	The date to countdown to
		updateInterval	[integer]	1					The interval in which to update the html (can be set to false in order to display once on page load)
		wraps			[object]	null				An object set of properties used to break down [days, hours, minutes, seconds]
			note: to specify a property of wraps use standard property notation
			wraps: { prop: 'value', prop: 1, prop: false, prop: function(){} }
			IF options.wraps is NOT used then a single output string will be generated for [matched_elements]
			The generated HTML is:
			<span class="jcdDays">##</span>&nbsp;<span class="jcdDaysText">days</span>&nbsp;<span class="jcdHours">##</span>:<span class="jcdMinutes">##</span>:<span class="jcdSeconds">##</span>
*/
(function($) {
	$.fn.countDown = function(options) {
		var options = $.extend({
			date			: 'January 1, 2099 00:00:00',
			updateInterval	: 1,
			wraps			: null,
			onExpire		: function() {}
		}, options);
		return this.each(function(i) {
			var obj = this;
			var today = new Date();
			var endDate = new Date(options.date);
			var ms = Math.floor(endDate.getTime() - today.getTime())
			function two(x) {return ((x>9)?"":"0")+x}
			function three(x) {return ((x>99)?"":"0")+((x>9)?"":"0")+x}
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
				var ms = Math.floor(endDate.getTime() - today.getTime())
				sLeft = MS2DHMSMS(ms).ss;
				mLeft = MS2DHMSMS(ms).mm;
				hLeft = MS2DHMSMS(ms).hh;
				dLeft = MS2DHMSMS(ms).dd;
				if ( options.wraps == null )
					$(obj).html('<span class="jcdDays">' + dLeft + '</span>&nbsp;<span class="jcdDaysText">day' + s + '</span>&nbsp;<span class="jcdHours">' + hLeft + '</span>:<span class="jcdMinutes">' + mLeft + '</span>:<span class="jcdSeconds">' + sLeft + '</span>');
				else {
					for ( x in options.wraps ) {
						if ( x == 'days' ) $(options.wraps[x]).html(dLeft);
						if ( x == 'hours' ) $(options.wraps[x]).html(hLeft);
						if ( x == 'minutes' ) $(options.wraps[x]).html(mLeft);
						if ( x == 'seconds' ) $(options.wraps[x]).html(sLeft);
					}
				}
			};
			if ( parseInt(MS2DHMSMS(ms).dd) < 0 )
				options.onExpire.call(this, obj);
			else
				if ( options.updateInterval ) setInterval(function() { getTimeLeft(); }, options.updateInterval * 500);
				else getTimeLeft();
		});
	};
})(jQuery);
/* end countDown() plugin */


/* New countdown method for Dream Home 2010 */
SNI.HGTV.timer = {
	init: function (timer_data) {
		for (var i=0;i<timer_data.length;i++) {
			var now = new Date();
			now = now.getTime();
			
			var then = new Date(timer_data[i].date);
			then = then.getTime();
			
			if (then > now) {
				var date = timer_data[i].date;
				var message = timer_data[i].message;
				SNI.HGTV.timer.countdown(date, now, then);
				SNI.HGTV.timer.message(message);
				break;
			} else {
				// If the last date in the loop has passed, hide the module.
				if (i == timer_data.length - 1) {
					$(".countdown").hide();
				}
			}
		};
	},
	
	countdown: function (date, now, then) {
		// Convert the time difference into readable time, and update each element.
		var diff = Math.floor(then - now);
	
		var sec = Math.floor(diff/1000);
		
		var mn = Math.floor(sec/60);
		sec = sec % 60;
		sec = SNI.HGTV.timer.two(sec);
		
		var hr = Math.floor(mn/60);
		mn = mn % 60;
		mn = SNI.HGTV.timer.two(mn);
		
		var day = Math.floor(hr/24);
		hr = hr % 24;
		hr = SNI.HGTV.timer.two(hr);
		
		document.getElementById('cdDays').innerHTML=day;
		document.getElementById('cdHours').innerHTML=hr;
		document.getElementById('cd_minutes').innerHTML=mn;
		document.getElementById('cd_seconds').innerHTML=sec;
		t=setTimeout('SNI.HGTV.timer.init(timer_data)',500);
	},
	
	two: function (x) {
		return ((x>9)?"":"0")+x;
	},
	
	message: function (message) {
		document.getElementById('cd_additional_text').innerHTML = message;
	}
}
