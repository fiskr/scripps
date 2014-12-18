if (typeof SNI === 'undefined') {
	SNI = {};
}
if (SNI.Community === undefined) {
	SNI.Community = {};
}
if (SNI.Community.UR === undefined) {
	SNI.Community.UR = {};
}

SNI.Community.UR.init = function() {
	if(typeof SNI.Community.siteName=='string') {
		if(typeof this.ViewingUserName=='string') {
			this.logged_in=true;
		}
	} else {
		var user = new SNI.UR.UrUser(new SNI.UR.ApplicationConfig());
		if(user.isLoggedIn==true) {
			this.ViewingUserId=user.getUserId();
			this.ViewingUserName=user.getEmail();
			this.ViewingUserDisplayName=user.getUserName();
			this.logged_in=true;
		}
	}
};

SNI.Community.UR.logout = function() {
		var destURL = document.location;
		document.location = "http://my.hgtvremodels.com/redirectors/logout_redirector.jsp?DEST_URL=" + escape(destURL);
};

// new from JEllis Jul 2011

SNI.Community.UR.extendedInit=function()
{	
	if(typeof SNI.Community.siteName=='string')
	{
		if(typeof this.ViewingUserName=='string')
		{
			this.logged_in=true;
		}
	}
	else
	{
		var user=new SNI.UR.UrUser(new SNI.UR.ApplicationConfig());
		if(user.isLoggedIn==true)
		{
			this.ViewingUserId=user.getUserId();
			this.ViewingUserName=user.getEmail();
			this.ViewingUserDisplayName=user.getUserName();
			this.ViewingUserAvatar=user.getAvatar(); 
			this.logged_in=true;
		}
	}
};

SNI.Community.UR.Core.extendedInit();  //sets up the mainSiteDomain and ur3Domain variables
SNI.Community.UR.extendedInit();    //sets up the ViewingUser* variables 



