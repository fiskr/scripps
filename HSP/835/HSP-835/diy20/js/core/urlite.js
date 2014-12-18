/**
 * UR Lite
 */

/* --------------------------------------------
UrLite
--------------------------------------------- */
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };


// instantiate object namespace
if( typeof(SNI.UR)=='undefined' ) {
	SNI.UR = {};
}




/* --------------------------------------------
IdCookie Global variables - for backward compatibility
--------------------------------------------- */
var userIdCookieUserId;
var userIdEmail;
var userIdCookieCreateDt;
var userIdCookieVersion;

/* --------------------------------------------
IdCookie
--------------------------------------------- */
SNI.UR.IdCookie = function() {
	// properties
	
    this.id = "";
    this.email = "";
    this.createDate = new Date();
    this.version = "2.0";
    this.domain = getPrimaryDomain();
    this.secure = "";
    this.path = "/";
    this.cookieName = 'userIdCookie';
    this.expirationDate = new Date(new Date().getTime() + (10000 * 1000 * 60 * 60 * 24));


	// private methods
	
	function getCookieKeyValue(cookie_value, key, delimeter) {
		if (cookie_value != null) {
			var keystring = key + delimeter;
			var thiscookie_start = cookie_value.indexOf(keystring) + keystring.length;
			var thiscookie_end = cookie_value.indexOf(delimeter, thiscookie_start);
			var keyvalue = cookie_value.substring(thiscookie_start, thiscookie_end);
			return keyvalue;
		}
		return null;
	}

	function getPrimaryDomain() {
		var theUrl = document.domain;
		var urlLength = theUrl.length;
		var firstDot = theUrl.lastIndexOf(".");
		var secondDot = theUrl.lastIndexOf(".", firstDot - 1);
		var primaryDomain = theUrl.substr(secondDot);
		return primaryDomain;
	}

	function getRandNumber(numDigits) {
		var randNum = "";
		var thisDigit = "";
		for (var i = 0; i < numDigits; i++) {
			thisDigit = Math.floor(Math.random() * 10);
			randNum = randNum + thisDigit;
		}
		return randNum;
	}
	
	function setGlobalValues() {
		// Store in global vars for compatibility
		userIdCookieUserId = this.id;
		userIdEmail = this.email;
		userIdCookieCreateDt = this.createDate;
		userIdCookieVersion = this.version;
	}
	
	
	// public methods
	
	this.createCookie = function(cookies, user) {
		var updtCookie = false;
		
		if (cookies['userIdCookie'] != undefined) {
			// Load the current id cookie values
			this.id = getCookieKeyValue(cookies['userIdCookie'], 'userId', 'ZZ');
			this.email = getCookieKeyValue(cookies['userIdCookie'], 'email', 'ZZ');
			this.createDate = getCookieKeyValue(cookies['userIdCookie'], 'createDate', 'ZZ');
			this.version = getCookieKeyValue(cookies['userIdCookie'], 'cookieVersion', 'ZZ');
		}
		
		if (user.isLoggedIn) {
			// Compare the id cookie with UR values
			if (this.id != user.getUserId()) {
				this.id = user.getUserId();
				updtCookie = true;
			}
			if (this.email != user.getEmail()) {
				this.email = user.getEmail();
				updtCookie = true;
			}
		}
		
		if (this.id == "") {
			// Initialize id cookie
			this.id = getRandNumber(10);
			updtCookie = true;
		}
		
		setGlobalValues();
		
		if (updtCookie) {
			// Save updated id cookie
			this.writeCookie();
		}
	};

	this.writeCookie = function() {
		var cookieValue = 'userIdZZ' + this.id + 'ZZemailZZ' + this.email + 'ZZcreateDateZZ' + this.createDate + 'ZZcookieVersionZZ' + this.version + 'ZZ';
		document.cookie = this.cookieName + "=" + escape(cookieValue) +
							( ( this.expirationDate ) ? ";expires=" + this.expirationDate.toGMTString() : "" ) +
							( ( this.path ) ? ";path=" + this.path : "" ) +
							( ( this.domain ) ? ";domain=" + this.domain : "" ) +
							( ( this.secure ) ? ";secure=" : "" );
	};
};




/* --------------------------------------------
Application Config
--------------------------------------------- */
SNI.UR.ApplicationConfig = function() {
    this.applicationName = "";
    this.applicationCode = "";
    this.applicationEntryPage = "";
    this.applicationPath = "";
    this.loginServer = {"DEV": "", "STAGE": "", "PROD": ""};
    this.requiredRoles = [];
    this.requiresLogin = false;

	this.getLoginServer = function(env) {
		if (this.loginServer[env]) {return this.loginServer[env];}
		return null;
	};
	
	this.addRole = function(role) {this.requiredRoles.push(role);};
	this.urVersion = function() {return 1;};
};



/* --------------------------------------------
Role
--------------------------------------------- */
SNI.UR.ApplicationRole = function(name, date) {
    this.name = name;
    this.date = date;
};






UrCookie = SNI.UR.UrCookie = function() {
    this.info = [];

	this.clear = this.clearInfo = function() {
		for(var i=0; i<this.info.length; i++){
			delete this.info[i];
		}
		//delete this.info;

		this.info = [];
	};
	
	this.parse = this.parseCookie = function(cookie) {
		var cookieArray = cookie.split("|");		
		for (var i = 0; i < cookieArray.length; i++) {
			var chips = cookieArray[i].split(":");	
			this.info[chips[0]] = chips[1];
		}
	};
};


SNI.UR.ValueCookie = function() {
	this.info = new SNI.UR.UrCookie();

	// call the parent's clear functions
	this.clear = this.clearInfo = this.info.clear;
	this.parse = this.parseCookie = this.info.parse;

	this.getEmail = function() {return this.info['email'];};
	this.getBirthYear = function() {return this.info['birth_year'];};
	this.getCity = function() {return this.info['city'];};
	this.getConfirm = function() {return this.info['confirm'];};
	this.getFirstName = function() {return this.info['first_name'];};
	this.getGender = function() {return this.info['gender'];};
	this.getLastName = function() {return this.info['last_name'];};
	this.getParentEmail = function() {return this.info['parent_email'];};
	this.getPersist = function() {return this.info['persist'];};
	this.getPhone = function() {return this.info['phone'];};
	this.getPostalCode = function() {return this.info['postal_code'];};
	this.getStatus = function() {return this.info['status'];};
	this.getTransComplete = function() {return this.info['transcomplete'];};
	this.getUserId = function() {return this.info['user_id'];};
	this.getUserName = function() {return this.info['user_name'];};
	this.getUserType = function() {return this.info['usertype'];};
};

/*
SNI.UR.ValueCookie.prototype.clear = function() {return this.info.clear();};
SNI.UR.ValueCookie.prototype.parse = function(c) {return this.info.parse(c);};
SNI.UR.ValueCookie.prototype.getEmail = function() {return this.info['email'];};
SNI.UR.ValueCookie.prototype.getBirthYear = function() {return this.info['birth_year'];};
SNI.UR.ValueCookie.prototype.getCity = function() {return this.info['city'];};
SNI.UR.ValueCookie.prototype.getConfirm = function() {return this.info['confirm'];};
SNI.UR.ValueCookie.prototype.getFirstName = function() {return this.info['first_name'];};
SNI.UR.ValueCookie.prototype.getGender = function() {return this.info['gender'];};
SNI.UR.ValueCookie.prototype.getLastName = function() {return this.info['last_name'];};
SNI.UR.ValueCookie.prototype.getParentEmail = function() {return this.info['parent_email'];};
SNI.UR.ValueCookie.prototype.getPersist = function() {return this.info['persist'];};
SNI.UR.ValueCookie.prototype.getPhone = function() {return this.info['phone'];};
SNI.UR.ValueCookie.prototype.getPostalCode = function() {return this.info['postal_code'];};
SNI.UR.ValueCookie.prototype.getStatus = function() {return this.info['status'];};
SNI.UR.ValueCookie.prototype.getTransComplete = function() {return this.info['transcomplete'];};
SNI.UR.ValueCookie.prototype.getUserId = function() {return this.info['user_id'];};
SNI.UR.ValueCookie.prototype.getUserName = function() {return this.info['user_name'];};
SNI.UR.ValueCookie.prototype.getUserType = function() {return this.info['usertype'];};
*/



SNI.UR.RoleCookie = function() {
	this.info = new SNI.UR.UrCookie();

	// call the parent's clear functions
	this.clear = this.clearInfo = this.info.clear;
	this.parse = this.parseCookie = this.info.parse;
	
	this.getRoleByName = function(name) {return this.info[name];};
};

/*
SNI.UR.RoleCookie.prototype.getRoleByName = function(name) {return this.info[name];};
*/





SNI.UR.UrLite = function() {
	// private methods
	
    function getPrimaryDomain() {
        var theUrl = document.domain;
        var urlLength = theUrl.length;
        var firstDot = theUrl.lastIndexOf(".");
        var secondDot = theUrl.lastIndexOf(".", firstDot - 1);
        var primaryDomain = theUrl.substr(secondDot);
        return primaryDomain;
    }


	// public methods
	
	this.login = function(urUser, applicationConfig) {
		var cookies = this.loadCookies();

		if (cookies['value']) {urUser.vignetteValueCookie.parse(cookies['value']);}
		if (cookies['UserLoginCookie']) {urUser.valueCookie.parse(cookies['UserLoginCookie']);}
	
		if (urUser.getUserId() == null || urUser.getUserId() < 0) {
			if (applicationConfig.requiresLogin == true) {
				writeIdCookie(cookies, urUser);
				this.redirectToUr(urUser, applicationConfig);
			}
		} else {
			urUser.isLoggedIn = true;
		}
	
		this.writeIdCookie(cookies, urUser);
	
		if (cookies['UserRoleCookie']) {urUser.roleCookie.parse(cookies['UserRoleCookie']);}
		if (cookies['role']) {urUser.vignetteRoleCookie.parse(cookies['role']);}
	
		if (applicationConfig.requiredRoles != null && applicationConfig.requiredRoles.length > 0 && applicationConfig.requiresLogin==true) {
			for (var i = 0; i < applicationConfig.requiredRoles.length; i++) {
				if (urUser.hasRoleByName(applicationConfig.requiredRoles[i]) == false) {
					this.redirectToUr(urUser, applicationConfig);
				}
			}
		}
	};

	this.logout = function(urUser, applicationConfig) {
		var domain = getPrimaryDomain();
		this.deleteLoginCookie("value", "/", domain);
		this.deleteLoginCookie("role", "/", domain);
		this.deleteLoginCookie("userLoginCookie", "/", domain);
		this.deleteLoginCookie("userRoleCookie", "/", domain);
		
		urUser.valueCookie.clear();
		urUser.roleCookie.clear();
		urUser.vignetteValueCookie.clear();
		urUser.vignetteRoleCookie.clear();
		
		urUser.isLoggedIn = false;
	};
	
	this.deleteLoginCookie = function(name, path, domain) {
		document.cookie = name + "=" + "; path=" + path +  "; domain=" + domain + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	};
	
	this.getEnvironment = function() {
		switch (document.location.hostname) {
			case "localhost":
			case "127.0.0.1":
			case "vdev2.scrippsnetworks.com":
				return "DEV";
			case "staging.scrippsweb.com":
				return "STAGE";
			default:
				return "PROD";
		}
	};

	this.redirectToUr = function(urUser, applicationConfig) {
		window.location = this.getLoginPath(applicationConfig);
	};

	this.getLoginPath = function(applicationConfig) {
		var loginPath;
		if (applicationConfig.urVersion() == "1") {
			loginPath = applicationConfig.loginServer[this.getEnvironment()] + applicationConfig.applicationPath + '?a=fflogin&url=' + escape(applicationConfig.applicationEntryPage) + '&an=' + escape(applicationConfig.applicationName) + '&ac=' + escape(applicationConfig.applicationCode);
		} else {
			loginPath = applicationConfig.loginServer[this.getEnvironment()] + applicationConfig.applicationPath + 'urValidation.html?applicationId='+applicationConfig.applicationCode;
		}
		return loginPath;
	};

	this.loadCookies = function() {
		var cookies = [];
		if (document.cookie != '') {
			var cookieArray = document.cookie.split(';');
			for (var i = 0; i < cookieArray.length; i++) {
				var cookiesValues = cookieArray[i].split('=');
				cookies[cookiesValues[0].trim()] = cookiesValues[1];
			}
		}
		return cookies;
	};

	this.writeIdCookie = function(cookies, user) {
		var id = new SNI.UR.IdCookie();
		id.createCookie(cookies, user);
	};
	
};



/* ---------------------------------------------
	This is the Ur User JavaScript
---------------------------------------------  */


SNI.UR.UrUser = function(appConfig) {

    // properties

    this.valueCookie = new SNI.UR.ValueCookie();
    this.roleCookie = new SNI.UR.RoleCookie();
    this.vignetteValueCookie = new VignetteValueCookie();
    this.vignetteRoleCookie = new VignetteRoleCookie();

	this.applicationConfig = appConfig;
	this.urLite = new SNI.UR.UrLite();
	this.isLoggedIn = false;


	// public methods
	
    this.getBirthYear = function() {
		if (this.valueCookie.getBirthYear() != null){return this.valueCookie.getBirthYear();}
		if (this.vignetteValueCookie.getBirthYear() != null){return this.vignetteValueCookie.getBirthYear();}
	};

	this.getCity = function() {
		if (this.valueCookie.getCity() != null){return this.valueCookie.getCity();}
		if (this.vignetteValueCookie.getCity() != null){return this.vignetteValueCookie.getCity();}
	};

	this.getConfirm = function() {
		if (this.valueCookie.getConfirm() != null){return this.valueCookie.getConfirm();}
		if (this.vignetteValueCookie.getConfirm() != null){return this.vignetteValueCookie.getConfirm();}
	};

	this.getEmail = function() {
		if (this.valueCookie.getEmail() != null){return this.valueCookie.getEmail();}
		if (this.vignetteValueCookie.getEmail() != null){return this.vignetteValueCookie.getEmail();}
	};

	this.getFirstName = function() {
		if (this.valueCookie.getFirstName() != null){return this.valueCookie.getFirstName();}
		if (this.vignetteValueCookie.getFirstName() != null){return this.vignetteValueCookie.getFirstName();}
	};
	
	this.getFullName = function() {
		return this.getFirstName() + ' ' + this.getLastName();
	};
	
	this.getGender = function() {
		if (this.valueCookie.getGender() != null){return this.valueCookie.getGender();}
		if (this.vignetteValueCookie.getGender() != null){return this.vignetteValueCookie.getGender();}
	};
	
	this.getLastName = function() {
		if (this.valueCookie.getLastName() != null){return this.valueCookie.getLastName();}
		if (this.vignetteValueCookie.getLastName() != null){return this.vignetteValueCookie.getLastName();}
	};
	
	this.getParentEmail = function() {
		if (this.valueCookie.getParentEmail() != null){return this.valueCookie.getParentEmail();}
		if (this.vignetteValueCookie.getParentEmail() != null){return this.vignetteValueCookie.getParentEmail();}
	};

	this.getPersist = function() {
		if (this.valueCookie.getPersist() != null){return this.valueCookie.getPersist();}
		if (this.vignetteValueCookie.getPersist() != null){return this.vignetteValueCookie.getPersist();}
	};

	this.getPhone = function() {
		if (this.valueCookie.getPhone() != null){return this.valueCookie.getPhone();}
		if (this.vignetteValueCookie.getPhone() != null){return this.vignetteValueCookie.getPhone();}
	};
	
	this.getPostalCode = function() {
		if (this.valueCookie.getPostalCode() != null){return this.valueCookie.getPostalCode();}
		if (this.vignetteValueCookie.getPostalCode() != null){return this.vignetteValueCookie.getPostalCode();}
	};
	
	this.getStatus = function() {
		if (this.valueCookie.getStatus() != null){return this.valueCookie.getStatus();}
		if (this.vignetteValueCookie.getStatus() != null){return this.vignetteValueCookie.getStatus();}	
	};
	
	this.getTransComplete = function() {
		if (this.valueCookie.getTransComplete() != null){return this.valueCookie.getTransComplete();}
		if (this.vignetteValueCookie.getTransComplete() != null){return this.vignetteValueCookie.getTransComplete();}
	};
	
	this.getUserId = function() {
		if (this.valueCookie.getUserId() != null){return this.valueCookie.getUserId();}
		if (this.vignetteValueCookie.getUserId() != null){return this.vignetteValueCookie.getUserId();}
	};
	
	this.getUserName = function() {
		if (this.valueCookie.getUserName() != null){return this.valueCookie.getUserName();}
		if (this.vignetteValueCookie.getUserName() != null){return this.vignetteValueCookie.getUserName();}
	};
	
	this.getUserType = function() {
		if (this.valueCookie.getUserId() != null){return this.valueCookie.getUserId();}
		if (this.vignetteValueCookie.getUserType() != null){return this.vignetteValueCookie.getUserType();}
	};
	
	this.hasRole = function(role) {
		if (this.roleCookie.getRoleByName(role.name) != null) {
			if(this.roleCookie.getRoleByName(role.name) >= role.date){return true;}
			return false;
		}
		if (this.vignetteRoleCookie.getRoleByName(role.name) != null){return true;}
		return false;
	};
	
	this.hasRoleById = function(roleId) {
		if (this.vignetteRoleCookie.getRoleById(roleId) != null){return true;}
		return false;
	};

	this.logout = function() {
		if (this.isLoggedIn) {
			this.urLite.logout(this, this.applicationConfig);
		}
	};
	

	/**
	 * Initialization
	 */
	this.urLite.login(this, appConfig);

};





/* ---------------------------------------------
	VignetteCookie Base Class
---------------------------------------------  */


SNI.UR.VignetteCookie = function() {

    this.info = [];
    this.parse = parseCookie;
    this.parseCookie = parseCookie;
    this.parseSingleValueChip = parseSingleValueChip;
    this.parseMultiValueChip = parseMultiValueChip;
	
	this.cookieName = "";
	this.cookiePath = "/";
	this.cookieDomain = "";
	this.clear = clearInfo;

	function clearInfo() {
		for(var i=0; i<this.info.length; i++){
			delete this.info[i];
		}

		this.info = [];
	}

    function stripHeader(string) {
        return string.substring(23);
        // 23 is always the length of the header
    }

    function stripTrailer(string) {
        return string.substring(0, string.length - 3);
    }

    function parseCookie(cookie) {
        cookie = stripHeader(cookie);
        cookie = stripTrailer(cookie);
        var cookieArray = cookie.split("ZZ%");
        for (var i = 0; i < cookieArray.length; ++ i) {
            chip = cookieArray[i];
            chip = chip.substring(6);
            if (chip.substring(0, 1) == "s") {
                chip = chip.substring(1);
            } else {
                chip = chip.substring(3);
            }
            if (chip.match("\\+") == '+') {
                this.parseMultiValueChip(chip);
            } else {
                this.parseSingleValueChip(chip);
            }
        }
    }

    function parseSingleValueChip(chip) {
        chip = URLDecode(chip);
        var values = chip.split("ZZ");

        if (values.length < 2) {
            this.info[values[0]] = "";
        } else {
            this.info[values[0]] = values[1];

        }
    }

    function parseMultiValueChip(chip) {
        var multivalue = [];
        chip = URLDecode(chip);

        // pull out the name
        var key = chip.split("ZZ")[0];
        chip = chip.substring(key.length);

        // parse the parts
        chip = chip.replace(/ZZZZ/g, "ZZ");
        var chips = chip.split("+");

        for (var i = 0; i < chips.length; ++ i) {
            part = chips[i];
            var parts = part.split("ZZ");
            multivalue[parts[1]] = parts[2];

        }
        this.info[key] = multivalue;
    }

    function URLDecode(encodedString) {
        var output = encodedString;
        var binVal, thisString;
        var myregexp = /(%.{2})/;
        while ((match = myregexp.exec(output)) != null
                && match.length > 1
                && match[1] != '') {
            binVal = parseInt(match[1].substr(1), 16);
            thisString = String.fromCharCode(binVal);
            output = output.replace(match[1], thisString);
        }
        return output;
    }

};

/* ---------------------------------------------
	This is the Ur User JavaScript
---------------------------------------------  */
VignetteValueCookie.prototype = new SNI.UR.VignetteCookie();
function VignetteValueCookie() {
    VignetteValueCookie.prototype = new SNI.UR.VignetteCookie();

    this.getEmail = function() {return this.info['email'];};
	this.getBirthYear = function() {return this.info['birth_year'];};
	this.getCity = function() {return this.info['city'];};
	this.getConfirm = function() {return this.info['confirm'];};
	this.getFirstName = function() {return this.info['first_name'];};
	this.getGender = function() {return this.info['gender'];};
	this.getLastName = function() {return this.info['last_name'];};
	this.getParentEmail = function() {return this.info['parent_email'];};
	this.getPersist = function() {return this.info['persist'];};
	this.getPhone = function() {return this.info['phone'];};
	this.getPostalCode = function() {return this.info['postal_code'];};
	this.getStatus = function() {return this.info['status'];};
	this.getTransComplete = function() {return this.info['transcomplete'];};
	this.getUserId = function() {return this.info['user_id'];};
	this.getUserName = function() {return this.info['user_name'];};
	this.getUserType = function() {return this.info['usertype'];};
}

/* ---------------------------------------------
	This is the Ur User JavaScript
---------------------------------------------  */
VignetteRoleCookie.prototype = new SNI.UR.VignetteCookie();
function VignetteRoleCookie() {
	VignetteRoleCookie.prototype = new SNI.UR.VignetteCookie();
	
	this.getPersist = function() {return this.info['persist'];};
	this.getUserId = function() {return this.info['user_id'];};
	this.getRoleByName = function(name) {
		if (this.info['roles'] != undefined) {
			for (var i = 0; i < this.info['roles'].length; i++) {
				if (this.info['roles'][i] != undefined && this.info['roles'][i] == name) {
					return this.info['roles'][i];
				}
			}
		}
	};
	this.getRoleById = function(id) {if (this.info['roles'] != undefined) return this.info['roles'][id];};
}


