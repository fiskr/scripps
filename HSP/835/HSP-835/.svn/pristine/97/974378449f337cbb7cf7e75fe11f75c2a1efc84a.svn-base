/**
 * SNI Video Player
 */


// instantiate object namespace
if( typeof(SNI.Player)=='undefined' ) {
	SNI.Player = {};
}



// default build channel feed url function

SNI.Player.buildDefaultChannelFeedUrl = function(chId) {
	//return 'http://' + window.location.hostname + '/diy/channel/xml/0,,' + chId + ',00.xml';
	/* hardcoding this for now */
	return 'http://www.diynetwork.com/diy/channel/xml/0,,' + chId + ',00.xml';
};


// Player object loads a flash video player based on config settings for size, full screen, etc.

SNI.Player.SNAP = function(divId, cfg, channelId, videoId, playlistTitle, fcnBuildChannelUrl) {
	if (!divId || !cfg) {
		alert("Error loading video player");
		return null;
	}

	// set some defaults
	if ( channelId == undefined ) { channelId = ''; }
	if ( videoId == undefined ) { videoId = ''; }
	if ( fcnBuildChannelUrl == undefined ) {
		this.buildChannelFeedUrl = SNI.Player.buildDefaultChannelFeedUrl;		// use default function to build url
	} else {
		this.buildChannelFeedUrl = fcnBuildChannelUrl;							// use custom function for building channel url
	}



	/**
	 * public/instance properties
	 */

		this.playerContainerId = divId;
		this.playerId = divId+'-instance';



	/**
	 * private vars/methods
	 */
		var swfUrl = "http://common.scrippsnetworks.com/common/snap/snap-portable-1.3.0.swf";

		var attributes = {
			id: this.playerId,				// id of the player instance
			name: this.playerId				// name of the player instance
		};



	/**
	 * public/instance methods
	 */

		this.getPlayerId = function() {
			return this.playerId;
		};

		this.getPlayerContainerId = function() {
			return this.playerContainerId;
		};

		this.loadPlaylist = function(chId, vidId) {
			if ( chId == undefined ) { chId = ''; }
			if ( vidId == undefined ) { vidId = ''; }
			var url = this.buildChannelFeedUrl(chId);
			var fl = document.getElementById(this.playerId);
			if(fl != undefined) {
				fl.setPlaylist(chId, url, vidId);
			}
		};



	/**
	 * auto-init player upon instantiation
	 */

		// build channel url string
		var tmpChanUrl = '';
		if (channelId != '') { tmpChanUrl = this.buildChannelFeedUrl(channelId); }

		// add ids to to flashvars
		var flashvars = {
			config: cfg.flashvars.config,
			channel: channelId,
			channelurl: tmpChanUrl,
			videoid: videoId
		};
		// only add playlist title if supplied and not undefined, passing thru empty strings but NOT undefined values (enables swf to read title from xml)
		if( playlistTitle != "undefined" ) {
			flashvars.playlistTitle = escape(playlistTitle);
		}

		swfobject.embedSWF(
			swfUrl,
			this.playerContainerId,
			cfg.dimensions.width,
			cfg.dimensions.height,
			"9",
			"http://common.scrippsnetworks.com/common/flash-express-install/expressInstall.swf",
			flashvars,
			cfg.params,
			attributes
		);
};
