/*
	Countdown Pugin for jQuery by Chris Engle
	
	Sets the innerHTML of matched elements to a time based on date option to count down until.
	SNI.DIY.Countdown(elements, [options]);
	
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
SNI.DIY.Countdown = function(element, options) {
	options = $.extend({
		container		: null,
		date			: 'January 1, 2099 00:00:00',
		updateInterval	: 0.5,
		wraps			: null,
		onExpire		: function() {}
	}, options);
	
	return $(element).each(function(i) {
		var obj = this;
		var today = new Date();
		var endDate = new Date(options.date);
		var ms = Math.floor(endDate.getTime() - today.getTime());
		function two(x) {return ((x>9)?"":"0")+x;}
		function three(x) {return ((x>99)?"":"0")+((x>9)?"":"0")+x;}
		//function MS2DHMSMS() - converts milliseconds to days : hrs : min : sec : ms
		
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
			if ( ms < 0 ) {options.onExpire.call(this, obj);}
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
		}
		
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
