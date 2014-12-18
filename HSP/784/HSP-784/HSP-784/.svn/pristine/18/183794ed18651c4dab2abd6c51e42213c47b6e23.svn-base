/* Video Player Object */

// instantiate object namespace
if( typeof(SNI.HGRM.Player)=='undefined' ) {
	SNI.HGRM.Player = {};
}



SNI.HGRM.Player.Configs = {
	FullSize : {
		dimensions : {
			width:'576',
			height:'512'
		},
		flashvars : {
            playerSize: "FullScreenWide",
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs + "snap-config-std.xml"
		}
	},

	FullSizeNoPlaylist : {
		dimensions : {
			width:'576',
			height:'347'
		},
		flashvars : {
            playerSize: "FullScreenWide",
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-std.xml"
		}
	},

	RightRail : {
		dimensions : {
			width:'320',
			height:'360'
		},
		flashvars : {
            playerSize: "RightRail",
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-rr.xml"
		}
	},

    RecipePage : {
		dimensions : {
			width:'185',
			height:'162'
		},
		flashvars : {
            autoPlay: false,
            showMenu: false,
            enableNowPlayingOverlay: false,
            enableRelatedMenu: false,
            enableRelatedInfoIcon: false,
            enableEmail: false,
            enableShare: false,
            enableHomePageMode: true,
            playerSize: "Inline",
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-rr.xml"
		}
	},

	RightRailNoPlaylist : {
		dimensions : {
			width:'320',
			height:'263'
		},
		flashvars : {
            playerSize: "RightRail",
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-rr.xml"
		}
	},

	Blog : {
		dimensions : {
			width:'320',
			height:'263'
		},
		flashvars : {
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-rr.xml"
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

			//autoPlay : "false",
			//fullscreen : "true",
			//shuffle : "false",
			//showPlaylistTitle : "false",
			//showCarousel : "true",
			//showAds : "true",
			//showMenuButton : "true",
			//enableShare : "true",
            playerSize: "Inline",             
			// external config files (load style config first so can override in config)
			config: SNI.Config.snapConfigs + "snap-style.xml,"+SNI.Config.snapConfigs +"snap-config-std.xml"
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

SNI.Player.UserInterfaceConfigs = SNI.Util.mergeObjects(SNI.Player.UserInterfaceConfigs,
	SNI.HGRM.Player.Configs,
	true);



// video library version of player
SNI.HGRM.Player.FullSize = SNI.Player.FullSize;
SNI.HGRM.Player.Big = SNI.HGRM.Player.FullSize;							// alias
SNI.HGRM.Player.VideoLibrary = SNI.HGRM.Player.FullSize;				// alias

SNI.HGRM.Player.TravelingVideoLibrary = function (divId, channelId, videoId, callback, ui_config) {
	//save original page sponsor
	var originalSponsor = mdManager.getParameter('Sponsorship');
    var tvlEventHandler = function (eventType, eventInfo) {
		//call original callback (syncadfix)
        SNI.Player.callbackSystem(eventType, eventInfo);

		//get data from player
        var data = $.parseJSON(eventInfo);

		var currentSponsor = mdManager.getParameter('Sponsorship');

		//if the channel has a sponsor, set that as current sponsor
        if (typeof(data.sponsorshipValue) == 'string') {
			var channelSponsor = data.sponsorshipValue;
			currentSponsor = channelSponsor != '' ? channelSponsor : originalSponsor;

			mdManager.setParameter('Sponsorship', currentSponsor);
			adManager.setParameter('Topic', currentSponsor);
        }
		//otherwise, set the current sponsor to the original page sponsor
		else if(currentSponsor != originalSponsor) {
			currentSponsor = originalSponsor;

			mdManager.setParameter('Sponsorship', currentSponsor);
			adManager.setParameter('Topic', currentSponsor);
		}
    };

    /* overriding the playerSize value */
    /* biz changing this back to use FullScreen, leaving this in in case we need it later */
    ui_config = SNI.Util.mergeObjects({flashvars: {playerSize: "FullScreen"}}, ui_config, true);

    return new SNI.Player.SNAP({
        "container_div_id": divId,
        "ui_config": SNI.Util.mergeObjects(SNI.Player.UserInterfaceConfigs.FullSizeNoPlaylist, ui_config, true),
        "channel_id": channelId,
        "video_id": videoId,
        "fcn_callback_user": callback,
        "fcn_callback_system": tvlEventHandler
    });
};


// single video asset version of player
SNI.HGRM.Player.FullSizeNoPlaylist = SNI.Player.FullSizeNoPlaylist;
SNI.HGRM.Player.VideoAsset = SNI.HGRM.Player.FullSizeNoPlaylist;		// alias


// right rail version of player
SNI.HGRM.Player.RightRail = SNI.Player.RightRail;
// right rail version of player with no playlist
SNI.HGRM.Player.RightRailNoPlaylist = SNI.Player.RightRailNoPlaylist;


// blog version of player (no playlist)
SNI.HGRM.Player.Blog = function(divId, channelId, videoId, ui_config) {
	buildChannelFeedUrlForBlogs = function(chId) {
		return 'http://www.foodnetwork.com/food/channel/xml/0,,' + chId + ',00.xml';
	};

	return new SNI.Player.Blog(divId, channelId, videoId, buildChannelFeedUrlForBlogs, ui_config);
};


// lead/dynamic-lead version of player
SNI.HGRM.Player.Lead = function(divId, channelId, videoId, callback, ui_config) {
	return new SNI.Player.SNAP({
		"container_div_id" : divId,
		"ui_config" : SNI.Util.mergeObjects(SNI.Player.UserInterfaceConfigs.Lead, ui_config, true),
		"channel_id" : channelId,
		"video_id" : videoId,
		"fcn_callback_user" : callback
	});
};


// Dynamic lead version of the player, autoplay on
SNI.HGRM.Player.DynamicLead = function (divId, channelId, videoId, ui_config) {
	return new SNI.HGRM.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, SNI.Util.mergeObjects({ flashvars: { autoPlay: false, enableRelatedInfoIcon: false, enableNowPlayingOverlay: false, playerSize: "Inline", enableHomePageMode : true }, dimensions: { width: 272, height: 229 } }, ui_config, true));
};

// Recipe page version of the player
SNI.HGRM.Player.RecipePage = function (divId, channelId, videoId, ui_config) {
	return new SNI.HGRM.Player.FullSizeNoPlaylist(divId, channelId, videoId, null, SNI.Util.mergeObjects(SNI.Player.UserInterfaceConfigs.RecipePage, ui_config, true));
};
//Overwriting HTML5 Video Overlays
SNI.Player.SNAPHTML5.Util.getVideoMissingHTML = function() {
					return '<div><p>Oops!  We\'re sorry, but this video is not available for your location or device.  Select <a href="/hgtvremodels-video-library/videos/index.html">here</a> to browse our top videos.</p></div>';
				};
SNI.Player.SNAPHTML5.Util.getLoadingHTML = function() {
					return '<div><p>Your video is loading.</p><span class="prog"></span></div><script>(function(O){O.Util.progressBar(O.VPlayer.elts.jVidWrap.find(".vid-over div span.prog"));})(SNI.Player.SNAPHTML5);</script>';
				},

SNI.Player.SNAPHTML5.Util.getEndframeHTML = function() {
					return '<div><p>Select <a href="#" class="r">here</a> to restart this playlist</p><p>or <a href="/hgtvremodels-video-library/videos/index.html">here</a> to browse our top videos.</p></div><script>(function(O){O.VPlayer.elts.jVidWrap.find(".vid-over div a.r").bind(O.Util.getUIselectEvent(), function() { O.state.curVidIdx= 0; O.VPlayer.Playlist.readyToPlayVid(); return false;}).click(function(){return false;})})(SNI.Player.SNAPHTML5);</script>';
				},
