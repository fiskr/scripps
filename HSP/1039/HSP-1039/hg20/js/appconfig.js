/* --------------------------------------------
   HGTV Application Config
--------------------------------------------- */
HGTVApplicationConfig.prototype = new SNI.UR.ApplicationConfig();
function HGTVApplicationConfig() {
	HGTVApplicationConfig.prototype = new SNI.UR.ApplicationConfig();
	this.loginServer["DEV"] = "http://vdev2.scrippsnetworks.com/";
	this.loginServer["STAGE"] = "http://swwd.scrippsweb.com/";
	this.loginServer["PROD"] = "http://web.hgtv.com/";
	
    this.urVersion = urVersion;

	function urVersion() {
		return 1;
	}
}
