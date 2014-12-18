/* Video Player Object */

// instantiate object namespace
if( typeof(SNI.HGTV.Player)=='undefined' ) {
	SNI.HGTV.Player = {};
}

SNI.HGTV.Player.Configs =
{
	FullSize : {
		enableSyncAdFix : 1,
		dimensions : {
			width:'576',
			height:'567'
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
			moreVideoURL: "http://www.hgtv.com/video-library/index.html",
			enableRelatedInfoIcon : "false",
			playerSize: "FullScreenWide",
			 // external config files (load style config first so can override in config)
			config:SNI.Config.snapConfigs + "/snap-style-playlist-w-title.xml," + SNI.Config.snapConfigs + "/snap-config-std.xml"
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
			height:'348'
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
			moreVideoURL: "http://www.hgtv.com/video-library/index.html",
			enableRelatedInfoIcon : "false",
			playerSize: "FullScreenWide",
			// external config files (load style config first so can override in config)
			config:SNI.Config.snapConfigs + "/snap-style.xml," + SNI.Config.snapConfigs + "/snap-config-std.xml"
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
			//fullscreen : "false",
			//shuffle : "false",
			//showPlaylistTitle : "false",
			//showCarousel : "false",
			//showAds : "true",
			//showMenuButton : "true",
			//enableShare : "true",
			moreVideoURL: "http://www.hgtv.com/video-library/index.html",
			enableRelatedInfoIcon : "false",
			playerSize: "RightRail",
			// external config files (load style config first so can override in config)
			config:SNI.Config.snapConfigs + "/snap-style-rr.xml," + SNI.Config.snapConfigs + "/snap-config-rr.xml"
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
			//fullscreen : "false",
			//shuffle : "false",
			//showPlaylistTitle : "false",
			//showCarousel : "false",			// force all blog carousels for now to not show playlists
			//showAds : "true",
			//showMenuButton : "true",
			//enableShare : "true",
			moreVideoURL: "http://www.hgtv.com/video-library/index.html",
			enableRelatedInfoIcon : "false",
			// external config files (load style config first so can override in config)
			config:SNI.Config.snapConfigs + "/snap-style-rr.xml," + SNI.Config.snapConfigs + "/snap-config-std-no-autoplay.xml"
		},
		params : {
			menu:"false",
			scale:"noscale",
			allowFullScreen:"true",						// this is a flash thing and should be set to true
			allowScriptAccess:"always",					// we want to leave this at true
			wmode:"transparent"
		}
	},
	
	Lead : {
		enableSyncAdFix : 1,
		dimensions : {
			width:'400',
			height:'300'
		},
		flashvars : {
			// config overrides (sets new values or overrides values set in the external configs and built-in defaults)
			// uncomment only the ones you need

			autoPlay : "false",
			//fullscreen : "false",
			//shuffle : "false",
			showPlaylistTitle : "false",
			showCarousel : "false",			// force all blog carousels for now to not show playlists
			//showAds : "true",
			//showMenuButton : "true",
			//enableShare : "true",
			moreVideoURL: "http://www.hgtv.com/video-library/index.html",
			enableRelatedInfoIcon : "false",
			 playerSize: "Inline",
			// external config files (load style config first so can override in config)
			config:SNI.Config.snapConfigs + "/snap-style-v4.xml," + SNI.Config.snapConfigs + "/snap-config-std.xml"
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

//override default player configs with HGTV-specific ones
SNI.Player.UserInterfaceConfigs = SNI.Util.mergeObjects(SNI.Player.UserInterfaceConfigs, SNI.HGTV.Player.Configs);

//override the default callbacksystem with HGTV-specific ones
SNI.HGTV.Player.callbackSystem = function(eventType, eventInfo) {
	// for some reason double quotes BREAKS when using this callback via the swf!!
	var eventJson = SNI.Player.getJSON(eventInfo);
	
	//for Taboola tracking
	if(eventType === 'itemBegin' && eventJson.videoId !== null){//don't track for preroll as id and url are not there
		window._taboola = window._taboola || [];
		_taboola.push({notify:'videoPlay',id: eventJson.videoId,url: eventJson.videoUrl});
	} 

	if(eventType=='playerReady') {
	
	
		// thrown when the player has finished initializing and the flash external API is ready for commands
		// #####
		// check to see if we need to display the initial bigbox ad on pageload
		var isAutoPlay = eventJson.isAutoPlay,	// check autoplay info here as it's specified by descriptor
				hasPreroll = eventJson.hasPreroll,	// should have sync ad info here
				lessThan60Sec = eventJson.videoDuration ? eventJson.videoDuration < 60 : false; // check to see if the video is more less than 60 sec
		
		if (isAutoPlay=='false' || hasPreroll=='false' || (lessThan60Sec && isAutoPlay=='true')) {
			// if video is not autoplay OR if video has no preroll or video is less than 60 sec, then display initial bigbox ad on page
			// (there should ALWAYS be a sync ad when there is a preroll)
			if (typeof(setDefaultBigboxAd)=="function") {
				setDefaultBigboxAd();
			}
		}
	}
};
SNI.Player.callbackSystem = SNI.HGTV.Player.callbackSystem;

/**
 * Site-specific aliases to public editorial methods (for backwards compatibility with SNAP 1.0 syntax)
 */


//SNI.HGTV.Player = SNI.Player;		// alias for backwards compatibility
// video library version of player
SNI.HGTV.Player.FullSize = SNI.Player.FullSize;
SNI.HGTV.Player.Big = SNI.HGTV.Player.FullSize; // alias
SNI.HGTV.Player.VideoLibrary = SNI.HGTV.Player.FullSize; // alias


// single video asset version of player
SNI.HGTV.Player.FullSizeNoPlaylist = SNI.Player.FullSizeNoPlaylist;
SNI.HGTV.Player.VideoAsset = SNI.HGTV.Player.FullSizeNoPlaylist; // alias


// right rail version of player
SNI.HGTV.Player.RightRail = SNI.Player.RightRail;


// for players dropped into pickle2 rate my apps
SNI.HGTV.Player.RightRailMyHGTV = function(divId, channelId, videoId, ui_config) {
	var buildChannelFeed = function(chId) { return 'http://www.hgtv.com/hgtv/channel/xml/0,,' + chId + ',00.xml'; };

	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : SNI.Util.mergeObjects(SNI.HGTV.Player.Configs.RightRail, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_build_playlist_url" : buildChannelFeed
	});
};


// blog version of player (no playlist)
SNI.HGTV.Player.Blog = function(divId, channelId, videoId, ui_config) {
	var buildChannelFeed = function(chId) { return 'http://www.hgtv.com/hgtv/channel/xml/0,,' + chId + ',00.xml'; };

	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : SNI.Util.mergeObjects(SNI.HGTV.Player.Configs.Blog, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_build_playlist_url" : buildChannelFeed
	});
};

// blog version of full sizeplayer (no playlist)
SNI.HGTV.Player.BigBlog = function(divId, channelId, videoId, ui_config) {
	var buildChannelFeed = function(chId) {
		return 'http://www.hgtv.com/hgtv/channel/xml/0,,' + chId + ',00.xml';
	};
	
	var bigBlogConfig = SNI.Util.mergeObjects(
		SNI.HGTV.Player.Configs.FullSizeNoPlaylist,
		{
			flashvars: {
				config: SNI.Config.snapConfigs + "/snap-style.xml," + SNI.Config.snapConfigs + "/snap-config-std-no-autoplay.xml",
				moreVideoURL: "http://www.hgtv.com/video-library/index.html"
			}
		},
		true
	);

	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : SNI.Util.mergeObjects(bigBlogConfig, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_build_playlist_url" : buildChannelFeed
	});
};

// lead/dynamic-lead version of player
SNI.HGTV.Player.Lead = function(divId, channelId, videoId, ui_config) {
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : SNI.Util.mergeObjects(SNI.HGTV.Player.Configs.Lead, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId
	});
};

// Home page lead version of player, autoplay off
SNI.HGTV.Player.HomePageLead = function (divId, channelId, videoId, ui_config) {
	return new SNI.HGTV.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, SNI.Util.mergeObjects({ dimensions: { width: 482, height: 296 }, flashvars: { autoPlay: false, playerSize: "Inline" } }, ui_config, true));
};

// Dynamic lead version of the player, autoplay
SNI.HGTV.Player.DynamicLead = function (divId, channelId, videoId, ui_config) {
	return new SNI.HGTV.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, SNI.Util.mergeObjects({ flashvars: { autoPlay: false, enableRelatedInfoIcon: false, enableNowPlayingOverlay: false, playerSize: "Inline", enableHomePageMode : true }, dimensions: { width: 266, height: 223 } }, ui_config, true));
};

// Dynamic lead version of the player, autoplay
SNI.HGTV.Player.DynamicLeadWide = function (divId, channelId, videoId, ui_config) {
	return new SNI.HGTV.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, SNI.Util.mergeObjects({ enableSyncAdFix: 0, flashvars: { autoPlay: false, enableRelatedInfoIcon: false, enableNowPlayingOverlay: false, playerSize: "Inline", enableHomePageMode : true }, dimensions: { width: 266, height: 173 } }, ui_config, true));
};

//Overwriting HTML5 Video Overlays
SNI.Player.SNAPHTML5.Util.getVideoMissingHTML = function() {
					return '<div><p>Oops!  We\'re sorry, but this video is not available for your location or device.  Select <a href="/video-library/index.html">here</a> to browse our top videos.</p></div>';
				};
SNI.Player.SNAPHTML5.Util.getLoadingHTML = function() {
					return '<div><p>Your video is loading.</p><span class="prog"></span></div><script>(function(O){O.Util.progressBar(O.VPlayer.elts.jVidWrap.find(".vid-over div span.prog"));})(SNI.Player.SNAPHTML5);</script>';
				},

SNI.Player.SNAPHTML5.Util.getEndframeHTML = function() {
					return '<div><p>Select <a href="#" class="r">here</a> to restart this playlist</p><p>or <a href="/video-library/index.html">here</a> to browse our top videos.</p></div><script>(function(O){O.VPlayer.elts.jVidWrap.find(".vid-over div a.r").bind(O.Util.getUIselectEvent(), function() { O.state.curVidIdx= 0; O.VPlayer.Playlist.readyToPlayVid(); return false;}).click(function(){return false;})})(SNI.Player.SNAPHTML5);</script>';
				},
