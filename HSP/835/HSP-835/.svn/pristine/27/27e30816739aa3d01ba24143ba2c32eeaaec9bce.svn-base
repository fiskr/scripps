// instantiate object namespace
if( typeof(SNI.DIY.Player)=='undefined' ) {
	SNI.DIY.Player = {};
}

/**
 * @author Matt Heisig
 * @description Hotfix to add environment-specific paths for config XMLs. Should move this to a full site config like
 * the other sites.

switch (window.location.hostname) {
    case 'www.dev-diynetwork.com':
        SNI.Config.snapConfigs = 'http://frontend.scrippsnetworks.com/diy/snap-configs/';
        break;
    case 'www.staging-diynetwork.com':
        SNI.Config.snapConfigs = 'http://frontend.scrippsnetworks.com/diy/staging/snap-configs/';
        break;
    default:
        SNI.Config.snapConfigs = 'http://images.diynetwork.com/webdiy/diy20/snap-configs/';
        break;
}
 */
SNI.DIY.Player.Configs = {
	FullSize: {
		dimensions: {
			width: '576',
			height: '509'
		},
		flashvars: {
            playerSize: "FullScreenWide",
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-fullsize.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	},
	FullSizeNoPlaylist: {
		dimensions: {
			width: '576',
			height: '347'
		},
		flashvars: {
            playerSize: "FullScreenWide",
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-fullsize.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	},
	RightRail: {
		dimensions: {
			width: '320',
			height: '306'
		},
		flashvars: {
            playerSize: "RightRail",
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-rightrail.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	},
	RightRailNoPlaylist: {
		dimensions: {
			width: '320',
			height: '203'
		},
		flashvars: {
            playerSize: "RightRail",
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-rightrail.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	},
	Blog: {
		dimensions: {
			width: '320',
			height: '203'
		},
		flashvars: {
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-blog.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	},
	Lead: { //this one doesn't already exist... provide all defaults
		enableSyncAdFix: 1,
		dimensions: {
			width: '400',
			height: '248'
		},
		flashvars: {
            playerSize: "Inline",
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-lead.xml"
		},
		params : {
			menu:"false",
			scale:"noscale",
			allowFullScreen:"true",						// this is a flash thing and should be set to true
			allowScriptAccess:"always",					// we want to leave this at true
			wmode:"opaque",								// need to set opaque in order to set bgcolor
			bgcolor:"#151615"							// bgcolor under actual video content
		}
	},
	Interactive: {
		flashvars: {
			config: SNI.Config.snapConfigs + "snap-style.xml," + SNI.Config.snapConfigs + "snap-config-interactive.xml"
		},
		params: {
			wmode: 'opaque',
			bgcolor: '#151615'
		}
	}
};

// SNIMOD JTF 02012010: extend Player defaults with DIY settings
SNI.Player.UserInterfaceConfigs = mergeObjects(SNI.Player.UserInterfaceConfigs, SNI.DIY.Player.Configs, true);

// video library version of player
SNI.DIY.Player.FullSize = function(divId, channelId, videoId, playlistTitle, ui_config, fcnUserCallback) {
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"playlistTitle": playlistTitle,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.FullSize, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : fcnUserCallback
	});
};
SNI.DIY.Player.Big = SNI.DIY.Player.FullSize;							// alias
SNI.DIY.Player.VideoLibrary = SNI.DIY.Player.FullSize;				// alias


// single video asset version of player
SNI.DIY.Player.FullSizeNoPlaylist = SNI.Player.FullSizeNoPlaylist;		// alias
SNI.DIY.Player.VideoAsset = SNI.DIY.Player.FullSizeNoPlaylist;


// right rail version of player
SNI.DIY.Player.RightRail = SNI.Player.RightRail;

// right rail version of player with no playlist
SNI.DIY.Player.RightRailNoPlaylist = SNI.Player.RightRailNoPlaylist;


// blog version of player (no playlist)
SNI.DIY.Player.Blog = SNI.Player.Blog;

// lead/dynamic-lead version of player
SNI.DIY.Player.Lead = function(divId, channelId, videoId, ui_config) {
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(SNI.Player.UserInterfaceConfigs.Lead, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId
	});
};


// blog version of player (no playlist)
SNI.DIY.Player.Blog = SNI.Player.Blog;


// since actionscript doesn't like some of the stuff we're doing with javascript
// we have to call a second function to fake it out
SNI.DIY.Player.NowPlaying = function(eventType, eventInfo) {
	SNI.DIY.Player.NowPlayingExecute(eventType, eventInfo);
}

SNI.DIY.Player.NowPlayingExecute = function(eventType, eventInfo) {
	if (eventType == 'itemBegin') {
		var json = eval('(' + eventInfo + ')');
		
		if (json.itemType != 'ad') {
			var html = '<h3 class="sub-header">Now Playing</h3>';
			html += '<h4>' + json.videoTitle + ' <span>(' + json.videoDuration + ')</span></h4>';
			html += '<p>' + json.videoDescription + '</p>';

			$('#now-playing').html(html);
		}
	}
}


// for players dropped into pickle2 rate my apps
SNI.DIY.Player.RightRailPickle = function(divId, channelId, videoId, configId, ui_config) {
	buildChannelFeedUrlForPickle = function(chId) {
		return 'http://www.diynetwork.com/diy/channel/xml/0,,' + chId + ',00.xml';
	};
	
	// set default configId value if none provided
	if ( typeof(configId)=="undefined" ) { configId = ''; }
	
	// select which config object based on configId
	var cfgObj;
	switch(configId) {
		default:
			cfgObj = SNI.Player.UserInterfaceConfigs.RightRail;
			break;
	}
	
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : mergeObjects(cfgObj, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_build_playlist_url" : buildChannelFeedUrlForPickle
	});
};

// interactive version of player
SNI.DIY.Player.Interactive = SNI.Player.Interactive;

// Home page lead version of player, autoplay off
SNI.DIY.Player.HomePageLead = function (divId, channelId, videoId, ui_config) {
	return new SNI.DIY.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, mergeObjects({ dimensions: { width: 266, height: 223 }, flashvars: { autoPlay: false, playerSize: "Inline" } }, ui_config, true));
};

// Dynamic lead version of the player, autoplay off
SNI.DIY.Player.DynamicLead = function (divId, channelId, videoId, ui_config) {
	return new SNI.DIY.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, mergeObjects({ flashvars: { autoPlay: false, enableRelatedInfoIcon: false, enableNowPlayingOverlay: false, playerSize: "Inline", enableHomePageMode : true }, dimensions: { width: 272, height: 229 } }, ui_config, true));
};
