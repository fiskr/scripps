/*Added from sni-core*/
// instantiate object namespaces 
if( typeof SNI === "undefined" ) SNI = {};
if( typeof SNI.Community === "undefined" ) SNI.Community = {}; 
if( typeof SNI.Community.UR === "undefined" ) SNI.Community.UR = {};

SNI.Community.UR = {

	init: function() {
		if ( (SNI.Community.siteName==undefined) || (SNI.Community.siteName==null) ) {

			SNI.Community.UR.urUser = new SNI.UR.UrUser(new HGTVApplicationConfig());

			if (SNI.Community.UR.urUser.isLoggedIn==true) {
				// set the variables from URLite
				SNI.Community.UR.ViewingUserId = SNI.Community.UR.urUser.getUserId();
				SNI.Community.UR.ViewingUserName = SNI.Community.UR.urUser.getEmail();
				SNI.Community.UR.ViewingUserDisplayName = SNI.Community.UR.urUser.getUserName();

				//If there is no display name, set display_name=first part of the email address
				if ( (SNI.Community.UR.ViewingUserDisplayName==undefined) || (SNI.Community.UR.ViewingUserDisplayName==null) || (SNI.Community.UR.ViewingUserDisplayName=='') ) {
					if ( (SNI.Community.UR.ViewingUserName!=null) ) {
						if (SNI.Community.UR.ViewingUserName.indexOf("@")==-1) {
							//they don't have an @ in their email...this would probably never happen but in case of legacy users that have this condition, just use the email string (that is missing the @)
							SNI.Community.UR.ViewingUserDisplayName=SNI.Community.UR.ViewingUserName;
						} else {
							SNI.Community.UR.ViewingUserDisplayName=SNI.Community.UR.ViewingUserName.substring(0,SNI.Community.UR.ViewingUserName.indexOf("@"));
						}
					}
				}

				SNI.Community.UR.ViewingUserPostalCode = SNI.Community.UR.urUser.getPostalCode();
				SNI.Community.UR.logged_in='true';

			} else {
				//user is not logged in
				//alert('user is NOT logged in  ');
			}
		}

		else if ( (SNI.Community.UR.ViewingUserName != undefined) && (SNI.Community.UR.ViewingUserName != null) ) {
			if (
				(SNI.Community.UR.ViewingUserDisplayName == undefined) ||
				(SNI.Community.UR.ViewingUserDisplayName == null) || 
				(SNI.Community.UR.ViewingUserDisplayName == '')
				) {

				if (SNI.Community.UR.ViewingUserName != null) {
					if (SNI.Community.UR.ViewingUserName.indexOf("@") == -1) {
						SNI.Community.UR.ViewingUserDisplayName=SNI.Community.UR.ViewingUserName;
					} else {
SNI.Community.UR.ViewingUserDisplayName = SNI.Community.UR.ViewingUserName.substring(0, SNI.Community.UR.ViewingUserName.indexOf("@"));
					}
				}
			} 
			SNI.Community.UR.logged_in='true';
		}		
	},

	logout: function() {
		var destURL = document.location;
	        document.location = SNI.Config.userLoginUrl + "/redirectors/logout_redirector.jsp?DEST_URL=" +escape(destURL);
	}
};




