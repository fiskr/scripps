// instantiate object namespaces 
if( typeof(SNI)=='undefined' ) { 
	SNI = {}; 
} 
if( typeof(SNI.Community)=='undefined' ) { 
	SNI.Community = {}; 
} 
if( typeof(SNI.Community.UR)=='undefined' ) { 
	SNI.Community.UR = {}; 
} 


SNI.Community.UR.getCookie = function(name){ 
	var cookies = document.cookie; 
	if (cookies.indexOf(name) != -1) { 
		var startpos = cookies.indexOf(name)+name.length+1; 
		var endpos = cookies.indexOf(';',startpos)-1; 
		if (endpos == -2) { endpos = cookies.length; }
		return unescape(cookies.substring(startpos,endpos)); 
	} 
	else { 
		return false; // the cookie couldn't be found! it was never set before, or it expired. 
	} 
} 

SNI.Community.xUrlPre = '';
if(location.hostname.toLowerCase().indexOf("dev")>-1)
{
SNI.Community.xUrlPre="test1-";
}
else if(location.hostname.toLowerCase().indexOf("staging")>-1)
{
SNI.Community.xUrlPre="test2-";
}
else if (location.hostname.toLowerCase().indexOf("test1") > -1) {
SNI.Community.xUrlPre = "test1-";
}
else if (location.hostname.toLowerCase().indexOf("test2") > -1) {
SNI.Community.xUrlPre = "test2-";
}

if( (SNI.Community.UR.getCookie('SMSESSION')==null) || (SNI.Community.UR.getCookie('SMSESSION')=='') ) { 
	var orig_domain = document.location.href.substring(0,document.location.href.indexOf(location.hostname)+location.hostname.length); 
	var x = document.createElement('script'); 
	x.src = 'http://' + SNI.Community.xUrlPre + 'www.scrippscontroller.com/sso/checkcontrollercookie.html?DEST_URL='+document.location.href+'&orig_domain='+orig_domain; 
	document.getElementsByTagName('head')[0].appendChild(x); 
} 


SNI.Community.UR = {
	
	init: function() {
		
		// check if we're on a pickle page
		if (typeof SNI.Community.siteName == 'string')  {
			
			if (typeof this.ViewingUserName == 'string') {
				this.logged_in = true;
			}

		// look for the UR cookie
		} else {
			var user = new SNI.UR.UrUser(new DIYApplicationConfig());
			
			if (user.isLoggedIn == true) {
				this.ViewingUserId = user.getUserId();
				this.ViewingUserName = user.getEmail();
				this.ViewingUserDisplayName = user.getUserName();
				this.logged_in = true;
			}
		}
	},

	logout: function() {
		var host = window.location.hostname;
		var domain = 'http://my.diynetwork.com/';
	
		if (host.indexOf("dev") != -1) {
			domain = 'http://my.dev-diynetwork.com/';
		} else if (host.indexOf("staging") != -1) {
			domain = 'http://my.staging-diynetwork.com/';
		}
	
		window.location.href = domain + 'redirectors/logout_redirector.jsp?DEST_URL=' + escape(window.location.href);
	},
	
	displayName: function() {
		var name = this.ViewingUserDisplayName;
		
		if (typeof name != 'string' || name == '') {
			var email = this.ViewingUserName;
		
			if (typeof email == "string" && email.indexOf('@') != -1) {
				return email.substring(0, email.indexOf('@'));
			}
		
			return email;
		}
	
		return name;
	}
};
