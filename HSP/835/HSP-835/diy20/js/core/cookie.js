if( typeof(SNI.Util.Cookie) == "undefined" ) {
	SNI.Util.Cookie = {};
}

// code adpated from http://www.quirksmode.org/js/cookies.html
SNI.Util.Cookie = {
	SEARCH: 'S',
	UI: 'U',
	
	get: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	},
	
	// leave 'days' blank to expire at end of session
	set: function(name, value, days, path) {
		var expires = "";
		
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		
		if (!path) {
			path = '/';
		}
		
		document.cookie = name+"="+value+expires+"; path=" + path;
	},
	
	remove: function(name) {
		this.set(name, "", -1);
	},
	
	/**
	 * reads/writes a single persistent cookie that can be used to store basic key/value information
	 * if the value doesn't exist it will be created
	 * SNI.Util.Cookie.persist(cookieName, key) - retrieve a value or null if not found
	 * SNI.Util.Cookie.persist(cookieName, key, value, [days]) - store a value
	 * If the 'value' parameter is null the key/value pair is deleted from the cookie
	 */ 
	persist: function(cookieName, key, value, days) {
		var cookie = this.get(cookieName);
		days = days || 30;
		
		// just need to read the value
		if (typeof value == 'undefined') {
			
			// cookie has not been created so no info exists
			if (cookie == null) {
				return null;

			// try to find the key/value pair
			} else {
				var values = this.getPersistValues(cookie);
				return values[key];
			}			

		// writing the value
		} else {

			// create new cookie
			if (cookie == null) {
				var values = {};
				values[key] = value;

			// append to the current cookie
			} else {
				var values = this.getPersistValues(cookie);				
				values[key] = value;
			}
			
			this.set(cookieName, this.buildPersistString(values), days);
		}
	},

	// creates an object from key/value pairs
	getPersistValues: function(cookie) {
		var values = {};
		var temp = '';

		$.each(cookie.split('&'), function(k, v) {
			temp = v.split('=');
			
			if (temp[0]) {
				values[temp[0]] = unescape(temp[1]);
			}
		});

		return values;
	},
	
	// creates a string like a 'query string'
	buildPersistString: function(values) {
		var result = [];

		$.each(values, function(k, v) {
			// skip/delete the value if it's null
			if (v != null) {
				result.push(k + '=' + escape(v));
			}
		});
		
		return result.join('&');
	}
};
