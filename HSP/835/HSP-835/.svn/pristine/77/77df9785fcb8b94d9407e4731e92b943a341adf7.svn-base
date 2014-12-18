/**********************************************************************************************
 *
 * SNI SNAP 2.0 Video Player JavaScript API
 *
 * initial draft: Aug 27, 2009
 * initial author: Jay Hung
 *
 **********************************************************************************************/

// SNIMOD JTF 03192010: cloneObject creates a copy of an object instead of a reference
var cloneObject = function(obj) {
  var newObj = (obj instanceof Array) ? [] : {};
  for (var i in obj) {
		if (obj[i] && typeof obj[i] == "object") {
			newObj[i] = cloneObject(obj[i]);
		} else newObj[i] = obj[i]
  } return newObj;
};

// SNIMOD JTF 02012010: mergeObject function for extending default options.
//returns a merged object of two objects.  Similar to $.extend(), but only merges 2 objects (instead of n)
//Can accept an optional last argument specifying a deep (recursive) merge.
/*
Example usage:

var defaults = {
	foo: 'bar',
	free: 'beer',
	hello: 'world',
	schedule: {
		monday: null,
		tuesday: 'pilates at 4PM',
		saturday: 'football scrimmage at 3PM'
	},
	favoriteReindeer: ['Dasher', 'Dancer', 'Prancer', 'Vixen', 'Comet', 'Cupid', 'Donner', 'Blitzen', 'Rudolf']
};

var options = {
	free: 'Tibet',
	name: 'Jason Featheringham',
	schedule: {
		thursday: 'class until 1PM',
		saturday: 'dinner with Vicki at 6PM'
	},
	favoriteReindeer: ['Dasher', 'Rudolf']
};

var shallowMerge = mergeObjects(defaults, options);
var deepMerge = mergeObjects(defaults, options, true);

//RESULTS

shallowMerge = { //only root object is merged.  Nested objects are simply replaced.
	foo: 'bar',
	free: 'Tibet',
	name: 'Jason Featheringham',
	hello: 'world',
	schedule: {
		thursday: 'class until 1PM',
		saturday: 'dinner with Vicki at 6PM'
	},
	favoriteReindeer: ['Dasher', 'Rudolf']
};

deepMerge = { //notice nested objects are recursively merged
	foo: 'bar',
	free: 'Tibet',
	name: 'Jason Featheringham',
	hello: 'world',
	schedule: {
		monday: null,
		tuesday: 'pilates at 4PM',
		thursday: 'class until 1PM',
		saturday: 'dinner with Vicki at 6PM'
	},
	favoriteReindeer: ['Dasher', 'Rudolf']
};

*/
mergeObjects = function(trg, src) {
	//determine deep search
	var lastArg = arguments[arguments.length-1];
	var deep = arguments.length > 2 && typeof(lastArg) == 'boolean' ? lastArg : false;
	var result = cloneObject(trg);
	
	if(!src || typeof(src) != 'object') return result;
		
	for(prop in src) {
		//if not deep merge, just overwrite props
		if(typeof(trg[prop]) == 'undefined'
			|| trg[prop].constructor == Array
			|| typeof(trg[prop]) != 'object'
			|| !deep) { 
			result[prop] = src[prop];
			continue;
		}
		//if deep merge, just replace value.
		result[prop] = mergeObjects(trg[prop], src[prop], deep);
		
	}
	return result;
}



/**
 * SNI.Player {}
 *
 * instantiate player object namespace
 */

if (typeof(SNI.Player) == "undefined")
{
	SNI.Player = {};
}



/**
 * SNI.Player.Settings {}
 *
 * Contains info that is editable by the property developer
 */

if (typeof(SNI.Player.Settings) == "undefined")
{
	SNI.Player.Settings =
	{
		// --------------------------------------
		// path to SNAP binary swf
		// --------------------------------------
		snap_swf_url : "http://common.scrippsnetworks.com/common/snap/snap-3.2.12.swf",


		// --------------------------------------
		// path to express install for flash
		// --------------------------------------
		flash_express_install_url : "http://common.scrippsnetworks.com/common/flash-express-install/expressInstall.swf",


		// --------------------------------------
		// minimum version of flash required
		// --------------------------------------
		flash_minimum_version : "9"
	};
}



/**
 * SNI.Player.UserInterfaceConfigs {}
 *
 * Contains predefined ui configs for the types of players, such as FullSize, FullSizeNoPlaylist, RightRail, etc.
 */

if (typeof(SNI.Player.UserInterfaceConfigs) == "undefined")
{
	SNI.Player.UserInterfaceConfigs =
	{
		FullSize : {
			enableSyncAdFix : 1,
			dimensions : {
				width:'576',
				height:'636'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				//showCarousel : "true",
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-fullsize.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",
				allowScriptAccess:"always",
				wmode:"transparent",
				bgcolor:"#ffffff"
			}
		},

		FullSizeNoPlaylist : {
			enableSyncAdFix : 1,
			dimensions : {
				width:'576',
				height:'460'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				showCarousel : "false",
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-std.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		},

		RightRail : {
			enableSyncAdFix : 0,
			dimensions : {
				width:'320',
				height:'360'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				//showCarousel : "true",
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-rr.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		},

		RightRailNoPlaylist : {
			enableSyncAdFix : 0,
			dimensions : {
				width:'320',
				height:'263'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				showCarousel : "false",
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-rr.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		},

		Blog : {
			enableSyncAdFix : 1,
			dimensions : {
				width:'320',
				height:'263'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				showCarousel : "false",			// force all blog carousels for now to not show playlists
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-std.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		},

		BlogNoPlaylist : {
			enableSyncAdFix : 1,
			dimensions : {
				width:'320',
				height:'263'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				showCarousel : "false",
				//showAds : "true",
				//showMenuButton : "true",
				//enableShare : "true",

				// external config files (load style config first so can override in config)
				config:"http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-style.xml,http://frontend.scrippsnetworks.com/~jhung/snap2/configs/snap-config-std.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		},

		Interactive : {
			enableSyncAdFix : 1,
			dimensions : {
				width:'630',
				height:'650'
			},
			flashvars : {
				// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
				// uncomment only the ones you need

				//autoPlay : "false",
				//fullscreen : "true",
				//shuffle : "false",
				//showPlaylistTitle : "false",
				//showCarousel : "false",
				//showAds : "false",
				//showMenuButton : "true",
				//enableShare : "true",
                enableInteractiveMenu: "true",
				interactiveDataURL: "http://common.scrippsnetworks.com/common/snap/test-pages/interactive-player/xmls/",

				// external config files (load style config first so can override in config)
				config:"http://common.scrippsnetworks.com/common/snap/config/snap-style.xml,http://common.scrippsnetworks.com/common/snap/config/snap-config-interactive.xml"
			},
			params : {
				menu:"false",
				scale:"noscale",
				allowFullScreen:"true",						// this is a flash thing and should be set to true
				allowScriptAccess:"always",					// we want to leave this at true
				wmode:"transparent"
			}
		}

	};
}






/* --------------------------------------------------------------------------------------------------- */






/**
 * Public API Methods
 */

SNI.Player.getPlayerContainerDivId = function()
{
	return this.container_div_id;
};


SNI.Player.getPlayerInstanceId = function()
{
	return this.instance_id;
};


SNI.Player.loadPlaylist = function(channelId, playlistTitle, videoId)
{
	// read params
	if (channelId=="undefined") { channelId = ''; }
	if (playlistTitle=="undefined") { playlistTitle = ''; }
	if (videoId=="undefined") { videoId = ''; }

	// build playlist url
	var playlistUrl = this.getPlaylistUrl(channelId);

	// get player instance
	var fl = document.getElementById(this.instance_id);

	// call Flash API
	if(fl != "undefined")
	{
		fl.setPlaylist(channelId, playlistUrl, escape(playlistTitle), videoId);
	}
};




/* --------------------------------------------------------------------------------------------------- */




/**
 * constructor SNAP()
 *
 * 		player object loads a flash video player based on config settings for size, full screen, etc.
 *
 * params:
 * 		@config = {
 * 			"container_div_id" : string,
 * 			"ui_config" : object,
 * 			"channel_id" : string,
 * 			"video_id" : string,
 * 			"playlist_title" : string,
 * 			"fcn_build_playlist_url" : function,
 * 			"fcn_callback_user" : function
 * 		}
 */

SNI.Player.SNAP = function(config)
{

	/**
	 * load config values
	 */

	if (typeof(config) == "undefined")
	{
		// no configuration passed in - display error message and exit

		alert("Error loading video player");
		return null;
	}
	else
	{
		// configuration object detected - read values from object

		// div_id
		if (typeof(config.container_div_id) == "undefined")
		{
			alert("Error loading video player");
			return null;
		}
		else
		{
			this.container_div_id = config.container_div_id;
			this.instance_id = config.container_div_id + '-instance';
		}

		// ui_config
		if (typeof(config.ui_config) == "undefined")
		{
			alert("Error loading video player configuration");
			return null;
		}
		else
		{
			this.ui_config = config.ui_config;
		}

		// build channel feed url function
		if (typeof(config.fcn_build_playlist_url) == "undefined" || config.fcn_build_playlist_url == '')
		{
			this.getPlaylistUrl = SNI.Player.getPlaylistUrl;			// use default function for building playlist url if none specified
		}
		else
		{
			this.getPlaylistUrl = config.fcn_build_playlist_url;		// otherwise use specified function for building playlist url
		}

		// channel_id
		if (typeof(config.channel_id) == "undefined")
		{
			alert("No playlist specified.");
			return null;
		}
		else
		{
			this.channel_id = config.channel_id;
			this.channel_url = this.getPlaylistUrl(this.channel_id);
		}

		// video_id
		this.video_id = SNI.Player.getUrlParam('videoId');		// check url query params for video_id value, and use that if it exists
		if (this.video_id == "")
		{
			// if empty string (ie no video id passed as query param), then use value from config if it exists

			if (typeof(config.video_id) != "undefined")
			{
				this.video_id = config.video_id;
			}
		}
		
		// player controls
		
		// SNIMOD JTF 02012010: function to play video on demand
		this.play = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.playerPlay) {
					alert('play() not yet implemented');
					return;
				}
				fl.playerPlay();
			}
		}

		// SNIMOD JTF 02012010: function to pause video on demand
		this.pause = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.playerPause) {
					alert('pause() not yet implemented');
					return;
				}
				fl.playerPause();
			}
		}
		
		// SNIMOD JTF 02012010: function to seek to a specific video timeframe on demand
		this.seek = function(mins, secs) 
		{
			
			// read params
			if (mins=="undefined") { mins = 0; }
			if (secs=="undefined") { secs = 0; }
			
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.playerSeek) {
					alert('seek() not yet implemented');
					return;
				}
				fl.playerSeek((mins*60)+secs);
			}
		}
		
		// SNIMOD JTF 02012010: function to jump to next video on demand
		this.nextVideo = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.nextVideo) {
					alert('nextVideo() not yet implemented');
					return;
				}
				fl.nextVideo();
			}
		}
		
		// SNIMOD JTF 02012010: function to jump to previous video on demand
		this.prevVideo = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.prevVideo) {
					alert('prevVideo() not yet implemented');
					return;
				}
				fl.prevVideo();
			}
		}
		
		// SNIMOD JTF 02012010: function to mute audio on demand
		this.mute = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.mute) {
					alert('mute() not yet implemented');
					return;
				}
				fl.mute();
			}
		}
		
		// SNIMOD JTF 02012010: function to unmute audio on demand
		this.unmute = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.unmute) {
					alert('unmute() not yet implemented');
					return;
				}
				fl.unmute();
			}
		}
		
		// SNIMOD JTF 02012010: function to set the playlist channel
		this.setPlaylistChannel = function(chId, url) {
			// read params
			if (chId=="undefined") { chId = ''; }
			if (url=="undefined") { url = ''; }

			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				fl.setPlaylistChannel(chId, url);
			}
		}
		
		// SNIMOD JTF 02012010: function to set the playlist title
		this.setPlaylistTitle = function(ttl) {
			// read params
			if (ttl=="undefined") { ttl = ''; }

			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				fl.setPlaylistTitle(ttl);
			}
		}
		
		// SNIMOD JTF 02012010: function to set the playlist video
		this.setPlaylistVideo = function(videoId) {
			// read params
			if (videoId=="undefined") { videoId = ''; }

			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				fl.setPlaylistVideo(videoId);
			}
		}
		
		// SNIMOD JTF 02012010: function to zoom to full screen on demand
		this.fullScreen = function() 
		{
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.fullScreen) {
					alert('fullScreen() not yet implemented');
					return;
				}
				fl.fullScreen();
			}
		}
		
		// SNIMOD JTF 02012010: function to show overlay menu on demand
		this.showMenu = function(tab) 
		{
			if (tab=="undefined") { tab = ''; }
			var fl = document.getElementById(this.instance_id);

			// call Flash API
			if(fl != "undefined") 
			{
				if(!fl.showMenu) {
					alert('showMenu() not yet implemented');
					return;
				}
				fl.showMenu(tab);
			}
		}
		
		
		

	}

	/**
	 * set mdmanager param to specify current page has a video
	 *
	 * 	- used generally for bigbox sync ad fix
	 */

	if( typeof(mdManager) != "undefined" )
	{
		mdManager.addParameter("VideoPlayer", "SNAP");
	}



	/**
	 * setup our attributes and flashvars objects that we will be sending to swfobject
	 */

	var attributes =
	{
		id : this.instance_id,					// id of the player instance
		name : this.instance_id + ' Player'		// name of the player instance
	};

	// flashvars

	var flashvars = this.ui_config.flashvars;	// copy flashvars from config

	// globally set/override configs (should be set in this.ui_config.flashvars - this section is for global overrides ONLY
/*
	flashvars.autoPlay = "false",
	flashvars.fullscreen = "true",
	flashvars.shuffle = "false",
	flashvars.showPlaylistTitle = "false",
	flashvars.showCarousel = "true",
	flashvars.showAds = "true",
	flashvars.showMenuButton = "true",
	flashvars.enableShare = "true",
*/

	// playlist fields
	flashvars.channel = this.channel_id,
	flashvars.channelurl = this.channel_url,
	flashvars.videoId = this.video_id,

	// misc flashvar fields
	flashvars.snapDivId = this.container_div_id				// pass container div id to snap binary
	


	// only add playlist title if supplied and not undefined
	if (typeof(config.playlist_title) != "undefined")
	{
		flashvars.playlistTitle = escape(config.playlist_title);
	}

	// register system callback (for sync ad fix) only if this player type's config specified it (ie we do not want it for rightrail players)
	if(this.ui_config.enableSyncAdFix!="undefined" && this.ui_config.enableSyncAdFix)
	{
		flashvars.systemEventHandler = "SNI.Player.callbackSystem";
	}

	// register user callback with the flash swf only if a callback was provided in config
	if (typeof(config.fcn_callback_user) != "undefined")
	{
		flashvars.userEventHandler = config.fcn_callback_user;
	}



	/**
	 * instantiate flash player swf
	 */

	swfobject.embedSWF(
		SNI.Player.Settings.snap_swf_url,
		this.container_div_id,
		this.ui_config.dimensions.width,
		this.ui_config.dimensions.height,
		SNI.Player.Settings.flash_minimum_version,
		SNI.Player.Settings.flash_express_install_url,
		flashvars,
		this.ui_config.params,
		attributes
	);

};




/**
 * default build channel feed url function (should be overridden in brand-specific config)
 *
 * @param channelId string	the id of the channel to load, in string format
 *
 * @return string url path to the channel feed xml
 */

SNI.Player.getPlaylistUrl = function(channelId)
{
	//return 'http://' + window.location.hostname + '/food/channel/xml/0,,' + chId + ',00.xml';
	return 'http://www.diynetwork.com/diy/channel/xml/0,,' + channelId + ',00.xml';
};




/**
 * local function to get query params from url
 * (keep this here as different sites, including legacy sites, may not have their own existing function)
 *
 * @param paramName string	the name of the query parameter to read
 *
 * @return string value of the param with name of paramName if it exists, otherwise empty string
 */

SNI.Player.getUrlParam = function(paramName)
{
	paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+paramName+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	} else {
		return results[1];
	}
};




/**
 * Method to parse json object strings
 * (this function must exist external to callback function, and in global namespace)
 *
 * @param json string	the string value for the json object to parse/execute
 * @return object		the JSON object
 */
SNI.Player.getJSON = function(json)
{
	return eval('(' + json + ')');
};




/**
 * SNAP system callback handler (fixes the double video sync ad impressions)
 * see documentation at https://wiki.scrippsnetworks.com/display/F2E/SNAP+Player+Events+API
 *
 * @param eventType string	a string value that signifies which event it is that fired (see documentation for valid values)
 * @param eventInfo string	a json string which will include details for the event fired (see documentation for json properties)
 */

SNI.Player.callbackSystem = function(eventType, eventInfo)
{
	// for some reason double quotes BREAKS when using this callback via the swf!!
	var eventJson = SNI.Player.getJSON(eventInfo);
	//console.log(eventInfo);

	if(eventType=='playerReady')
	{
		// thrown when the player has finished initializing and the flash external API is ready for commands
		// #####
		// check to see if we need to display the initial bigbox ad on pageload
		var isAutoPlay = eventJson.isAutoPlay;	// check autoplay info here as it's specified by descriptor
		var hasPreroll = eventJson.hasPreroll;	// should have sync ad info here
		//console.log(isAutoPlay);
		//console.log(hasPreroll);

		if (isAutoPlay=='false' || hasPreroll=='false')
		{
			// if video is not autoplay OR if video has no preroll, then display initial bigbox ad on page
			// (there should ALWAYS be a sync ad when there is a preroll)
			if (typeof(setDefaultBigboxAd)=="function")
			{
				setDefaultBigboxAd();
			}
		}
	}
}




/* --------------------------------------------------------------------------------------------------- */




/**
 * Public Editorial/Production API Methods
 *
 * These methods are used to embed SNAP players into the HTML pages.
 * They should be accessed from the SNI.Player.* namespace, but for backwards compatibility with SNAP 1.0,
 * they will also be available via the SNI.[site].Player.* namespaces.  Because of playlist URL needs, 
 * some of these functions may need to be overridden to access their respective playlist URL builder
 * functions.
 *
 * NOTE: 	SNIMOD JTF 02012010: Each of these functions can now accept a final ui_config JSON object
 *			to override configuration defaults at runtime.
 *
 * Examples:
 *
 * 		var snap = SNI.Player.FullSize('123445');
 *
 * 		var snap = SNI.Food.Player.FullSize('123445');
 *
 * 		var snap = SNI.HGTV.Player.FullSize('123445');
 */

SNI.Player.FullSize = function(divId, channelId, videoId, callback, ui_config)
{
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.FullSize, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback
	});
};


SNI.Player.FullSizeNoPlaylist = function(divId, channelId, videoId, callback, ui_config)
{
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.FullSizeNoPlaylist, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback
	});
};


SNI.Player.RightRail = function(divId, channelId, videoId, callback, ui_config)
{
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.RightRail, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback
	});
};


SNI.Player.RightRailNoPlaylist = function(divId, channelId, videoId, callback, ui_config)
{
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.RightRailNoPlaylist, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback
	});
};


SNI.Player.Blog = function(divId, channelId, videoId, callback, ui_config)
{
	getPlaylistUrlForBlogs = function(channelId) {
		// for blogs, need absolute urls due to subdomains
		return 'http://www.diynetwork.com/diy/channel/xml/0,,' + channelId + ',00.xml';
	};

	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.FullSizeNoPlaylist, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback,
		"fcn_build_playlist_url" : getPlaylistUrlForBlogs
	});
};

SNI.Player.Interactive = function(divId, channelId, videoId, callback, ui_config)
{
	var getPlaylistUrl = function(channelId) {
		// for blogs, need absolute urls due to subdomains
		return 'http://common.scrippsnetworks.com/common/snap/test-pages/interactive-player/data/interactive_player_rss_playlist.xml';
	};

	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.Interactive, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback/*,
		"fcn_build_playlist_url" : getPlaylistUrl
		*/
	});
};




/**
 * Site-specific aliases to public editorial methods (for backwards compatibility with SNAP 1.0 syntax)
 */

/*
SNI.Food.Player.FullSize = SNI.Player.FullSize;							// alias to actual method
SNI.Food.Player.Big = SNI.Food.Player.FullSize;
SNI.Food.Player.VideoLibrary = SNI.Food.Player.FullSize;

SNI.Food.Player.FullSizeNoPlaylist = SNI.Player.FullSizeNoPlaylist;		// alias to actual method
SNI.Food.Player.VideoAsset = SNI.Food.Player.FullSizeNoPlaylist;

SNI.Food.Player.RightRail = SNI.Player.RightRail;						// alias to actual method
SNI.Food.Player.RightRailNoPlaylist = SNI.Player.RightRailNoPlaylist;	// alias to actual method

SNI.Food.Player.Blog = SNI.Player.Blog;									// alias to actual method
*/

//SNI.Food.Player = SNI.Player;		// alias for backwards compatibility
