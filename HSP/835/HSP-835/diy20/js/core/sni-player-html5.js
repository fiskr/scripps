if (typeof SNI.Player == "undefined") SNI.Player = {};

SNI.Player.SNAPHTML5 = (function ($) {
    //console.log('SNI.Player.SNAPHTML5');
    return new function () {

        var O = this; // attach public members to this

        O.state = {
            curVidIdx: 0,
            playcount: 0,
            embed: false,
            playbackQ: []
            //corspxy: "http://frontend.scrippsnetworks.com/~clewis/corspxy.php?url="
            //corspxy: "corspxy.php?url="
        };


        // the "data" branch will hold everything read in from XML files plus some "flashvars" passed to init in parameter object	
        // three branches:
        // 	defa == default values as fallback, hard-coded here
        //	extrn == after XML has been loaded and parsed, it's converted to javascript objects here
        //	eff == effective values, merged and scrubbed: defaults if load fails, flashvars override certain config values, "autoPlay" is always false on iOS, "true"/"false" strings cleeaned up to boolean, etc. 
        O.data = {};
        O.data.eff = {
            cfgArgs: {},
            config: {},
            styles: {},
            Omniture: {},
            channel: {}
        };
        // data.extrn will be populated from the XML files
        O.data.extrn = {};
        // data.def contains default values to be used if XML file fails to load:  config, styles, and Omniture
        O.data.defa = {
            config: {
                enableSubscriberAuth: false,
                enableHomePageMode: false,
                playerSize: "",
                showCarousel: true,
                fullscreen: true,
                autoPlay: false,
                overrideAutoplay: false,
                enableRepeateMode: true,
                enableNextVideoOverlay: true,
                enableRelatedInfoIcon: true,
                enableStaticOverlayPlayIcon: true,
                enableNowPlayingOverlay: true,
                omnitureConfig: "",
                omnitureVersion: "default",
                shuffle: false,
                showPlaylistTitle: true,
                showAds: true,
                enableShare: true,
                enableEmail: true,
                enableRelatedMenu: true,
                showMenuButton: true,
                enableInteractiveMenu: false,
                enableAutoOpenInteractiveSteps: false,
                interactiveDataURL: "data/",
                showEmbedMenu: true,
                moreVideoURL: "http://www.foodnetwork.com/video-library/index.html",
                relatedOverlayDelay: "2",
                relatedOverlayInitialOpenTime: "4",
                enableEndFrame: false,
                endFrameText: "",
                endFrameURL: "",
                vendorsURL: "",
                jsSurveyHandler: "",
                convivaServiceURL: "",
                convivaCustomerId: "",
                email: {
                    server: "http://www.foodnetwork.com/app/emailservice/sendEmail.html",
                    params: {
                        senderEmail: "from_email",
                        senderName: "from_name",
                        recipient: "to_emails",
                        subject: "subject",
                        message: "body",
                        securityToken: "security_token"
                    },
                    paramValues: {
                        securityToken: "68-91-143-161-245-213-218-70-154-90-195-249-151-254-139-24-214-245-53-141-94-96-245-11",
                        senderEmail: "donotreply@foodnetwork.com"
                    },
                    texts: {
                        subject: "$$SENDER_NAME$$ has sent you a FoodNetwork.com video",
                        message: "$$SENDER_NAME$$ thought you might enjoy this FoodNetwork.com video:\n$$VIDEO_TITLE$$\n$$VIDEO_URL$$.\n\n$$COMMENTS$$\nView more FoodNetwork.com videos at http://www.foodnetwork.com/video-library/",
                        comments: "Comments from $$SENDER_NAME$$:\n$$USER_MESSAGE$$"
                    }
                }
            },
            styles: {
                config: {
                    textButton: {
                        bg: {
                            normal: "",
                            hover: "",
                            press: "",
                            disabled: ""
                        },
                        textColors: {
                            normal: "#81092C",
                            hover: "#FF0012",
                            press: "#FF0012",
                            disabled: "#999999"
                        }
                    },
                    playlistCarousel: {
                        rightArrow: {
                            normal: "",
                            hover: "",
                            press: "",
                            disabled: ""
                        },
                        leftArrow: {
                            normal: "",
                            hover: "",
                            press: "",
                            disabled: ""
                        },
                        isBackground: false,
                        bgURL: "",
                        thumbnailBorder: "small",
                        textColors: {
                            normal: "#006699",
                            hover: "#990000",
                            selected: "#999999",
                            secondary: "#CCCCCC"
                        },
                        borderColors: {
                            normal: "#999999",
                            hover: "#990000",
                            selected: "#FFD65D"
                        },
                        paginationIcon: {
                            normal: "",
                            selected: ""
                        },
                        paginationText: {
                            color: "#000000",
                            size: "11",
                            font: "Trebuchet"
                        },
                        playlistTitle: {
                            color: "#000000",
                            font: "Trebuchet",
                            size: "14"
                        }
                    },
                    controlButtons: {
                        buttonColors: {
                            normal: "#454545",
                            hover: "#b50938",
                            press: "#6B0521",
                            disabled: "#CCCCCC"
                        }
                    },
                    overlayMenu: {
                        textColors: {
                            title: "#B50938",
                            secondary: "#666666",
                            body: "#FFFFFF"
                        }
                    },
                    recallButton: {
                        normal: "",
                        hover: "",
                        press: ""
                    },
                    closeButton: {
                        normal: "",
                        hover: "",
                        press: ""
                    },
                    endFrameTextColor: "#53A8D5",
                    endFrameHoverColor: "#53A8D5"
                }
            },
            Omniture: {
                accountName: "scrippsfoodnetnew",
                vars: {
                    variable: [{
                        name: "Channel",
                        "default": ""
                    }, {
                        name: "Brand",
                        "default": "scrippsfoodnetnew"
                    }, {
                        name: "PlayerName",
                        "default": "SNAP"
                    }, {
                        name: "SiteID",
                        "default": "FOODNETWORK"
                    }, {
                        name: "SlotNumber",
                        "default": ""
                    }, {
                        name: "OriginalSite",
                        "default": ""
                    }, {
                        name: "VideoTitle",
                        "default": ""
                    }, {
                        name: "PlayType",
                        "default": ""
                    }, {
                        name: "LCStation",
                        "default": ""
                    }, {
                        name: "DARTStation",
                        "default": ""
                    }, {
                        name: "PlayerAction",
                        "default": "PUP Video Play"
                    }, {
                        name: "AssetID",
                        "default": ""
                    }, {
                        name: "VideoSearchKeyword",
                        "default": ""
                    }, {
                        name: "VideoScreenType",
                        "default": ""
                    }, {
                        name: "Sponsor",
                        "default": ""
                    }, {
                        name: "ShowName",
                        "default": ""
                    }, {
                        name: "MVPDId",
                        "default": ""
                    }, {
                        name: "Duration",
                        "default": ""
                    }]
                },
                formats: {
                    customVars: {
                        props: {
                            prop: [{
                                number: "4",
                                value: "$PlayerAction$"
                            }, {
                                number: "37",
                                value: "$VideoTitle$"
                            }, {
                                number: "38",
                                value: "$VideoTitle$"
                            }]
                        },
                        eVars: {
                            eVar: [{
                                number: "21",
                                value: "$PlayerAction$"
                            }, {
                                number: "22",
                                value: "$VideoTitle$"
                            }, {
                                number: "23",
                                value: "$ShowName$"
                            }, {
                                number: "24",
                                value: "$PlayerName$"
                            }, {
                                number: "25",
                                value: "$Channel$"
                            }, {
                                number: "26",
                                value: "$MVPDId$"
                            }, {
                                number: "27",
                                value: "$OriginalSite$"
                            }, {
                                number: "28",
                                value: "$PlayType$"
                            }, {
                                number: "29",
                                value: "$DARTStation$"
                            }, {
                                number: "30",
                                value: "$AssetID$"
                            }, {
                                number: "33",
                                value: "$Duration$"
                            }, {
                                number: "34",
                                value: "$VideoScreenType$"
                            }, {
                                number: "35",
                                value: "$Sponsor$"
                            }, {
                                number: "39",
                                value: "$PlayerAction$"
                            }]
                        },
                        hiers: {
                            hier: [{
                                number: "1",
                                value: "$Brand$|$PlayerName$|$Channel$|$VideoTitle$"
                            }]
                        }
                    }
                },
                events: {
                    event: [{
                        number: "2",
                        name: "VideoAdStart"
                    }, {
                        number: "3",
                        name: "VideoAdStart2"
                    }, {
                        number: "4",
                        name: "VideoAdComplete"
                    }, {
                        number: "5",
                        name: "VideoContentStart"
                    }, {
                        number: "6",
                        name: "VideoContent10%"
                    }, {
                        number: "7",
                        name: "VideoContent50%"
                    }, {
                        number: "8",
                        name: "VideoContent90%"
                    }, {
                        number: "9",
                        name: "VideoContent100%"
                    }, {
                        number: "51",
                        name: "VideoNotFound"
                    }, {
                        number: "63",
                        name: "VideoPause"
                    }, {
                        number: "64",
                        name: "VideoResume"
                    }, {
                        number: "65",
                        name: "VideoMenuOpen"
                    }, {
                        number: "66",
                        name: "VideoFullScreenOpen"
                    }]
                }
            },
            ads: {

            }
        };

        // some utility methods
        O.Util = {

            cleanStrForAdParam: function (inStr) {
                // replace everything except a-zA-Z0-9 with '_'
                return inStr.replace(/[^a-zA-Z0-9]/g, '_');
            },

            sss2mmmdec: function (inSSS) {
                // convert seconds to decimal minutes with underscore as delimiter (for ad descriptor call)
                // note that this is different from other ad calls which just take sss
                // e.g., 3:34 mm:ss == 3_57 decimal minutes == 214 sec
                return Math.round(100 * inSSS / 60, 0).toString().replace(/(\d*)(\d\d)$/, '$1_$2');
            },

            hhmmss2sss: function (inHHMMSS) {
                // time conversion: (hh:)mm:ss to sss
                //  note: also works as hh:mm to mmm
                var sss = 0;
                $.each(inHHMMSS.split(':'), function (i, v) {
                    sss *= 60;
                    sss += +v;
                });
                return sss;
            },

            boolify: function (o) {
                if (typeof o === "object") {
                    $.each(Object.getOwnPropertyNames(o),

                    function (i, v) {
                        if (typeof o[v] === "string") {
                            if (o[v].toLowerCase() == "true") {
                                o[v] = true;
                            } else if (o[v].toLowerCase() == "false") {
                                o[v] = false;
                            }
                        }
                    });
                }
                return;
            },

            // Rmoved MM-3672
            //getCORSProxyURL: function (url) {
            //    if (SNI.Config.env.toLowerCase() == "dev") url = O.state.corspxy + encodeURIComponent(url);
            //    return url;
            //},

            fixStrForXML: function (str) {
                str = $.trim(str);
                // handle the title == Recipes & Cooking case (until we can get Recipes &amp; Cooking
                // also psaPlayerTitle == HGTV Cash & Cari - Episodes
                if (/up:channel/.test(str)) {
                    str = str.replace(/<title>(.+?)<\/title>/, "<title><![CDATA[$1]]><\/title>");
                    str = str.replace(/<psaPlayerTitle>(.+?)<\/psaPlayerTitle>/, "<psaPlayerTitle><![CDATA[$1]]><\/psaPlayerTitle>");
                }
                return str;
            },

            parseXML: function (xmlStr) {
		console.log('parseXML');
                var xmlDoc = "";
                try {
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlStr, "text/xml");
                    } else if (window.ActiveXObject) {
                        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.loadXML(xmlStr);
                    }
                } catch (e) {}
                return xmlDoc;
            },

            // autoplay is effectively OFF for iOS devices
            //   note that this may change, and would be nice to feature detect
            //   note that non-autoplay devices (iOS) will always be treated as autoplay ON since device provides manual start; this is necessary to cause the poster to load and show correctly (apparently video must load)
            deviceAutoPlay: function () {
                return !/iphone|ipad|ipod/i.test(window.navigator.platform);
            },

            getAdDescriptorURL: function () {
		console.log("getAdDescriptorURL");
                var url = "";
                if (typeof getDartEnterpriseUrl === "function") {
                    url = getDartEnterpriseUrl("VIDEO_XML_DESCRIPTOR", 1);
                }
                if (url.length == 0) {
                    url = "http://adsremote.scrippsnetworks.com/html.ng/site=FOOD&adtype=VIDEO_XML_DESCRIPTOR&Pagepos=1";
                }
                var parmEmbed = "";
                if (O.state.embed) parmEmbed = "&embed=true";
                return [url, '&', "channelid=", O.state.channelId, '&', "duration=", O.Util.sss2mmmdec(O.data.eff.channel.video[0].length_sss), '&', "snapDivId=", O.state.containerID, '&', "psaPlayerId=", O.data.eff.channel.playerId, '&', "psaPlayerTitle=", O.Util.cleanStrForAdParam(O.data.eff.channel.psaPlayerTitle), '&', "playertype=", O.state.playertype, '&', "domain=", escape(window.location.href.toString()), '&', "playerSize=", O.state.playerSize, '&', "playerWidth=", O.state.dimensions.width, '&', "rand=", (new Date()).valueOf().toString(),
                parmEmbed].join('');
            },

            getAdURLbyType: function (inType) {
                if ( !! SNI.Config.DEBUG && !! SNI.Config.DEBUG.cannedAds) {
                    //						return "/sites/sandbox/video/content/ads/preroll_VAST.xml";
                    return "/sites/sandbox/video/content/ads/cc_VAST_tmp.xml";
                }
                var url = "";
                if (typeof getDartEnterpriseUrl === "function") {
                    url = getDartEnterpriseUrl(inType, 1);
                }
                if (url.length == 0) {
                    url = "http://adsremote.scrippsnetworks.com/html.ng/site=FOOD&adtype=" + inType + " &Pagepos=1";
                }
                var parmEmbed = "";
                if (O.state.embed) parmEmbed = "&embed=true";
                return [url, '&', "playcount=", O.state.playcount, '&', "playertype=", O.state.playertype, '&', "title=", O.Util.cleanStrForAdParam(O.data.eff.channel.video[O.state.curVidIdx].clipName), '&', "channelid=", O.state.channelId, '&', "videoid=", O.data.eff.channel.video[O.state.curVidIdx].videoId, '&', "psaPlayerId=", O.data.eff.channel.playerId, '&', "psaPlayerTitle=", O.Util.cleanStrForAdParam(O.data.eff.channel.psaPlayerTitle), '&', "snapDivId=", O.state.containerID, '&', "domain=", escape(window.location.href.toString()), '&', "duration=", O.data.eff.channel.video[O.state.curVidIdx].length_sss, '&', "playerSize=", O.state.playerSize, '&', "playerWidth=", O.state.dimensions.width, '&', "rand=", (new Date()).valueOf().toString(),
                parmEmbed].join('');
            },

            getHLSvidURL: function (inAssetId) {
                return "http://sni-i.akamaihd.net/i/" + inAssetId.substr(0, 4) + '/' + inAssetId + "_,1,2,3,4,5,.mp4.csmil/master.m3u8";
            },

            getVideoUrlForDevice: function (inVideo) {
                // input is a video record in playlist
                // calculate effective URL
                // obviously may have several cases in the future; HLS for iP* via Akamai for now
                var url_eff = inVideo.videoUrl;
                if (SNI.Config.snapEnableHTML5 && /iphone|ipad|ipod/i.test(window.navigator.platform)) {
                    url_eff = O.Util.getHLSvidURL(inVideo.assetId);
                } else if ( !! SNI.Config.DEBUG) {
                    SNI.Config.DEBUG.fmt = SNI.Config.DEBUG.fmt || "";
                    if (SNI.Config.DEBUG.fmt === "prog") {
                        if (/safari/i.test(window.navigator.userAgent.toString().toLowerCase())) {
                            url_eff = inVideo.videoUrlMp4;
                        } else if (/firefox/i.test(window.navigator.userAgent.toString().toLowerCase())) {
                            url_eff = inVideo.videoUrlOgg;
                        }
                    } else if (SNI.Config.DEBUG.fmt === "allHLS") {
                        url_eff = O.Util.getHLSvidURL(inVideo.assetId);
                    }
                }
                return url_eff;
            },

            parseXMLtoObj: function (dta, tgt, ppfn) {
                if (!$.isXMLDoc(dta)) {
                    // throw error
                } else {
                    var r = dta.documentElement.localName;
                    console.log("parseXMLtoObj: " + r);
                    if (typeof tgt[r] != "object") tgt[r] = {};
                    $.extend(tgt[r], $.xml2json(dta));
                    if (typeof ppfn == "function") ppfn();
                    return;
                }
            },

            // for now, just jQ ajax; beware of CORS failures (requires access-control-allow-origin: * header in response)
            // unfortunate that we have to ingest as text, parse to XML, and then convert to JSON
            // but channel coming out of Jitterbug is malformed
            loadXML: function (sets) {

                function onComplete(jqXHR, stat) {
                    if (stat === "success") {
                        try {
                            O.Util.parseXMLtoObj($.parseXML(O.Util.fixStrForXML(jqXHR.responseText)), sets.tgt || O, sets.postProc);
                        } finally {
                            $(O).trigger(sets.ctrlID);
                            return;
                        }
                    }
                }

                $.ajax({
                    url: sets.url,
                    dataType: "text",
                    complete: onComplete
                });
                return;
            },

            // load 1x1 tracking images; input is array of URLs (to allow multiple requests to be handled by one event)
            pixelBeacon: function (aURL) {
                console.log("pixelBeacon " + aURL);
                aURL.forEach(function (_u) {
                    (new Image()).src = _u;
                });
                return;
            },

            // get URL for best-fit poster image size for video element: 
            //  smallest one at least bigg enough to fit without stretching (examine height bc image is 4:3)
            getVidImageForHeight: function (inAssetId, inHeight, inDomain) {
                if (typeof inHeight != "number") inHeight = 500;
                if (typeof inDomain != "string") inDomain = '';
                var dims = [
                    [92, 69],
                    [120, 90],
                    [160, 120],
                    [266, 200],
                    [400, 300],
                    [480, 360],
                    [616, 462]
                ];
                var i = 0;
                while ( !! dims[i + 1] && dims[i][1] < inHeight)++i;
                return inDomain + "/up/images/" + inAssetId.substr(0, 4) + '/' + inAssetId + "_" + dims[i][0] + "x" + dims[i][1] + ".jpg";
            },

            // note: to customize per site, override this method
            getVideoMissingHTML: function () {
                return '<div><p>Oops!  We\'re sorry, but this video is not available for your location or device.  Select <a href="/food-network-top-food-videos/videos/index.html">here</a> to browse our top videos.</p></div>';
            },

            getLoadingHTML: function () {
                return '<div><p>Your video is loading.</p><span class="prog"></span></div><script>(function(O){O.Util.progressBar(O.VPlayer.elts.jVidWrap.find(".vid-over div span.prog"));})(SNI.Player.SNAPHTML5);</script>';
            },

            getEndframeHTML: function () {
                return '<div><p>Select <a href="#" class="r">here</a> to restart this playlist</p><p>or <a href="/food-network-top-food-videos/videos/index.html">here</a> to browse our top videos.</p></div><script>(function(O){O.VPlayer.elts.jVidWrap.find(".vid-over div a.r").bind(O.Util.getUIselectEvent(), function() { O.state.curVidIdx= 0; O.VPlayer.Playlist.readyToPlayVid(); return false;}).click(function(){return false;})})(SNI.Player.SNAPHTML5);</script>';
            },

            getUIselectEvent: function (inNS) {
                if (typeof inNS === "undefined") inNS = '';
                else inNS = '.' + inNS;
                return (("ontouchend" in document ? "touchend" : "mouseup") + inNS);
            },

            progressBar: function (inSel) {
                $(inSel).bind("transitionend webkitTransitionEnd oTransitionEnd", function (evt) {
                    $(evt.target).toggleClass("on")
                });
                setTimeout(function () {
                    $(inSel).addClass("on");
                }, 500);
            }


        };

        O.StartUp = {
	
            Tasks: {

                prepCfgArgsState: function (inCfg) {
                    O.data.extrn.cfgArgs = inCfg.cfgArgs;
                    $.extend(O.data.eff.cfgArgs, O.data.extrn.cfgArgs);
                    O.state.channelId = O.data.eff.cfgArgs.channel;
                    delete O.data.eff.cfgArgs.channel;
                    O.state.channelUrl = O.data.eff.cfgArgs.channelurl;
                    delete O.data.eff.cfgArgs.channelurl;
                    O.state.configFiles = O.data.eff.cfgArgs.config.split(',');
                    delete O.data.eff.cfgArgs.config;
                    O.state.containerID = O.data.eff.cfgArgs.snapDivId;
                    delete O.data.eff.cfgArgs.snapDivId;
                    O.state.playerSize = O.data.eff.cfgArgs.playerSize;
                    delete O.data.eff.cfgArgs.playerSize;
                    O.state.playertype = mdManager.getParameter("VideoPlayer");
                    O.state.dimensions = inCfg.dimensions;
                    O.state.enableSyncAdFix = inCfg.enableSyncAdFix;
                    O.state.videoId = O.data.eff.cfgArgs.videoId;
                    delete O.data.eff.cfgArgs.videoId;
                    delete O.data.eff.cfgArgs.minimumFlashVersion;
                    O.Util.boolify(O.data.eff.cfgArgs);
                    return;
                },

                // do some fix up on the raw playlist imported from XML (e.g., more usable data types)
                prepPlaylist: function () {
                    O.data.eff.channel = {}
                    $.extend(true, O.data.eff.channel, O.data.extrn.channel);
                    // force single-video into array 
                    if (!$.isArray(O.data.eff.channel.video)) {
                        O.data.eff.channel.video = [O.data.eff.channel.video];
                    }
                    $.each(O.data.eff.channel.video,

                    function (i, v) {
                        v.length_sss = O.Util.hhmmss2sss(v.length);
                        v.cmpnRunTimes_sss = [];
                        
                        if(typeof v.cmpnRunTimes !== 'undefined') {
                        $.each(v.cmpnRunTimes.split(','),

                        function (j, c) {
                            v.cmpnRunTimes_sss.push(O.Util.hhmmss2sss(c));
                         });                        
                        }

                        
                        v.videoUrl_eff = O.Util.getVideoUrlForDevice(v);
                    });
                    return;
                },

                loadPlaylist: function () {
                    console.log(">> loading Playlist");
                    O.Util.loadXML({
                        url: O.state.channelUrl,
                        tgt: O.data.extrn,
                        postProc: this.prepPlaylist,
                        ctrlID: "playlistLoaded"
                    });
                    return;
                },

                // do some fix up on the raw config tree imported from XML (e.g., more usable data types)
                prepConfig: function () {
                    console.log("prepConfig");
                    $.extend(O.data.eff.config, O.data.defa.config, O.data.extrn.config);
                    O.Util.boolify(O.data.eff.config);
                    $.extend(O.data.eff.config, O.data.eff.cfgArgs);
                    return;
                },

                loadConfig: function () {
                    console.log(">> loading Config");
                    O.Util.loadXML({
                        url: O.state.configGenl,
                        tgt: O.data.extrn,
                        postProc: this.prepConfig,
                        ctrlID: "configLoaded"
                    });
                    return;
                },

                prepStyles: function () {
                    console.log("prepConfig");
                    $.extend(O.data.eff.styles, O.data.defa.styles, O.data.extrn.styles);
                    return;
                },

                loadStyles: function () {
                    console.log(">> loading Styles");
                    O.data.extrn.styles = {};
                    O.Util.loadXML({
                        url: O.state.configStyles,
                        tgt: O.data.extrn.styles,
                        postProc: this.prepStyles,
                        ctrlID: "stylesLoaded"
                    });
                    return;
                },

                loadOmniture: function () {
                    console.log(">> loading Omniture");
                    if (typeof O.data.extrn.Omniture == "undefined" && typeof O.data.extrn.config.omnitureConfig == "string" && O.data.extrn.config.omnitureConfig.length > 0) {
                        O.Util.loadXML({
                            url: O.data.extrn.config.omnitureConfig,
                            tgt: O.data.extrn,
                            postProc: null,
                            ctrlID: "omnitureLoaded"
                        });
                    }
                    return;
                },

                procAdDesc: function () {
                    var _t = O.data.eff.ads = {};
                    var _s = O.data.extrn.ads.video_descriptor;
                    O.Util.boolify(_s.autoplay);
                    if (O.data.eff.config.overrideAutoplay && (typeof _s.autoplay.value === "boolean")) {
                        O.data.eff.config.autoPlay = _s.autoplay.value;
                    }
                    _s = _s.ads.ad;
                    if (!$.isArray(_s)) _s = [_s]; // handle yucky one-item case
                    for (var i = 0; i < _s.length; i++) {
                        if (_s[i].template.toLowerCase() == "preroll") {
                            _t["preroll"] = true;
                        } else if (_s[i].template.toLowerCase() == "overlay") {
                            _t["overlay"] = {};

                        } else if (_s[i].template.toLowerCase() == "midroll") {

                        } else if (_s[i].template.toLowerCase() == "postroll") {}
                    }
                    return;
                },

                loadAdDesc: function () {
                    console.log(">> loading Ad Desc");
                    O.data.extrn.ads = {};
                    if (O.data.eff.config.showAds) {
                        O.Util.loadXML({
                            url: O.Util.getAdDescriptorURL(),
                            tgt: O.data.extrn.ads,
                            postProc: this.procAdDesc,
                            ctrlID: "adDescLoaded"
                        });
                    } else {
                        $(O).trigger("adDescLoaded");
                    }
                    return;
                }

            },

            // startup controller: only event catch/dispatch

            Controller: {

                init: function () {
                    var evtsCaught = [];
                    var evtsAll = ["initialLoad", "playlistLoaded", "configLoaded", "stylesLoaded", "omnitureLoaded", "adDescLoaded"];
                    var evtsNewChannel = ["playlistLoaded", "adDescLoaded"];
                    var evtsToCk = evtsAll;

                    function ckCaught(evt, cb) {
                        var aEvts = [];
                        if (typeof evt === "string") aEvts.push(evt);
                        else if ($.isArray(evt)) aEvts = evt;
                        else return false;
                        var bRet = true;
                        $.each(aEvts, function (i, v) {
                            bRet = bRet && (evtsCaught.indexOf(v) > -1)
                        });
                        if (bRet) cb();
                    }

                    function attachEvents() {
                        console.log("attaching events");
                        $(O).bind({
                            "initialLoad": onInitialLoad,
                            "doLoadPlaylist": onLoadPlaylist,
                            "doLoadConfig": onLoadConfig,
                            "doLoadStyles": onLoadStyles,
                            "doLoadOmniture": onLoadOmniture,
                            "doLoadAdDesc": onLoadAdDesc,

                            "playlistLoaded": onPlaylistLoaded,
                            "configLoaded": onConfigLoaded,
                            "stylesLoaded": onStylesLoaded,
                            "omnitureLoaded": onOmnitureLoaded,
                            "adDescLoaded": onAdDescLoaded,

                            "allInitLoaded": onAllInitLoaded,
                            "adLoaded": onAdLoaded,

                            "loadNewPlaylist": onLoadNewPlaylist
                        });
                        return;
                    }

                    function onInitialLoad(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        evtsCaught.push(evt.type);
                        $(O).trigger("doLoadPlaylist");
                        $(O).trigger("doLoadConfig");
                        $(O).trigger("doLoadStyles");
                        return;
                    }

                    function onLoadNewPlaylist(evt) {
                        evtsCaught = ["initialLoad", "configLoaded", "stylesLoaded", "omnitureLoaded"];
                        evtsToCk = evtsNewChannel;
                        $(O).trigger("doLoadPlaylist");
                        return;
                    }

                    function onLoadPlaylist(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.StartUp.Tasks.loadPlaylist();
                        return;
                    }

                    function onLoadConfig(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.StartUp.Tasks.loadConfig();
                        return;
                    }

                    function onLoadStyles(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.StartUp.Tasks.loadStyles();
                        return;
                    }

                    function onLoadOmniture(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.StartUp.Tasks.loadOmniture();
                        return;
                    }

                    function onLoadAdDesc(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.StartUp.Tasks.loadAdDesc();
                        return;
                    }

                    function onPlaylistLoaded(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        evtsCaught.push(evt.type);
                        ckCaught("configLoaded", function () {
                            $(O).trigger("doLoadAdDesc");
                        });
                        ckCaught(evtsToCk, function () {
                            O.initPlay();
                        });
                        return;
                    }

                    function onConfigLoaded(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        evtsCaught.push(evt.type);
                        $(O).trigger("doLoadOmniture");
                        ckCaught("playlistLoaded", function () {
                            $(O).trigger("doLoadAdDesc");
                        });
                        ckCaught(evtsToCk, function () {
                            $(O).trigger("allInitLoaded");
                        });
                        return;
                    }

                    function onStylesLoaded(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        evtsCaught.push(evt.type);
                        ckCaught(evtsToCk, function () {
                            $(O).trigger("allInitLoaded");
                        });
                        return;
                    }

                    function onOmnitureLoaded(evt) {
                        console.log("C>>  " + evt.type);
                        evtsCaught.push(evt.type);
                        ckCaught(evtsToCk, function () {
                            $(O).trigger("allInitLoaded");
                        });
                        return;
                    }

                    function onAdDescLoaded(evt) {
                        console.log("C>>  " + evt.type);
                        evtsCaught.push(evt.type);
                        ckCaught(evtsToCk, function () {
                            $(O).trigger("allInitLoaded");
                        });
                        return;
                    }

                    function onAllInitLoaded(evt) {
                        console.log("C>>  " + evt.type + " " + evt.timeStamp);
                        O.initPlay();
                        return true;
                    }

                    function onAdLoaded(evt) {
                        O.Ads.runAd();
                        return;
                    }

                    console.log("initializing events");
                    attachEvents();
                    return;
                }
            }

        };


        O.VPlayer = (function () {

            return {

                elts: {},

                Playlist: {

                    // build/insert markup and load a channel
                    init: function () {
                        // build UI for the Playlist -- container with carousel if any
                        bReload = (typeof O.VPlayer.elts.jPlayerWrap === "object");
                        if (!bReload) {
                            O.VPlayer.elts.jOuterWrap = $('#' + O.state.containerID);
                            O.VPlayer.elts.jOuterWrap.attr("id", O.state.containerID + '-instance').removeAttr("class");
                            O.VPlayer.elts.jOuterWrap.empty().append('<div class="vid-html ' + O.state.playerSize.toLowerCase() + '"></div>');
                            O.VPlayer.elts.jPlayerWrap = O.VPlayer.elts.jOuterWrap.find(".vid-html");
                            O.VPlayer.elts.jPlayerWrap.width(O.state.dimensions.width).animate({
                                "height": (O.state.dimensions.height)
                            });
                            O.VPlayer.elts.jTitle = O.VPlayer.elts.jPlayerWrap.find("h1");
                        }
                        if (O.data.eff.config.showCarousel) {
                            if (bReload) O.VPlayer.elts.jChNav.remove();
                            O.VPlayer.Playlist.fmtCarousel();
                            O.VPlayer.Playlist.initPlaylistController();
                        }
                        if (!bReload) O.VPlayer.VidElt.init();
                        O.VPlayer.Playlist.findSelectedVid();
                        O.VPlayer.Playlist.readyToPlayVid(true);
                        return;
                    },

                    crslCfgLookUp: {
                        "fullscreenwide": {
                            crslItemsVisible: 4,
                            imgDims: {
                                width: 92,
                                height: 69
                            }
                        },
                        "rightrail": {
                            crslItemsVisible: 2,
                            imgDims: {
                                width: 60,
                                height: 45
                            }
                        },
                        "recipe": {
                            crslItemsVisible: 4,
                            imgDims: {
                                width: 92,
                                height: 69
                            }
                        }
                    },
                    crslCfg: {
                        crslItemsVisible: 3,
                        imgDims: {
                            width: 92,
                            height: 69
                        }
                    },

                    // build and insert carousel markup for current channel
                    fmtCarousel: function () {
                        var _this = this;

                        _this.crslCfg = _this.crslCfgLookUp[O.state.playerSize.toLowerCase()] || _this.crslCfg;

                        // build and inject styles from config:
                        var _styles = O.data.eff.styles.config;
                        var _rules = ['.vid-html .crsl .prev-btn{background: transparent url(' + _styles.playlistCarousel.leftArrow.normal + ') no-repeat 0 0;}', '.vid-html .crsl .prev-btn:hover{background: transparent url(' + _styles.playlistCarousel.leftArrow.hover + ') no-repeat 0 0}', '.vid-html .crsl .prev-btn:active{background: transparent url(' + _styles.playlistCarousel.leftArrow.press + ') no-repeat 0 0}', '.vid-html .crsl .prev-btn.disabled{background: transparent url(' + _styles.playlistCarousel.leftArrow.disabled + ') no-repeat 0 0}', '.vid-html .crsl .next-btn{background: transparent url(' + _styles.playlistCarousel.rightArrow.normal + ') no-repeat 0 0}', '.vid-html .crsl .next-btn:hover{background: transparent url(' + _styles.playlistCarousel.rightArrow.hover + ') no-repeat 0 0}', '.vid-html .crsl .next-btn:active{background: transparent url(' + _styles.playlistCarousel.rightArrow.press + ') no-repeat 0 0}', '.vid-html .crsl .next-btn.disabled{background: transparent url(' + _styles.playlistCarousel.rightArrow.disabled + ') no-repeat 0 0}', '.vid-html .crsl li p{color:' + _styles.playlistCarousel.textColors.normal + ';}', '.vid-html .crsl li a:hover p{color:' + _styles.playlistCarousel.textColors.hover + ';}', '.vid-html .crsl li.sel p,.vid-html .crsl li.sel a:hover p{color:' + _styles.playlistCarousel.textColors.selected + ';}', '.vid-html .crsl li p .sec{color:' + _styles.playlistCarousel.textColors.secondary + ';}', '.vid-html .crsl .controls.btn-nav span{background-image: url(' + _styles.playlistCarousel.paginationIcon.normal + ');}', '.vid-html .crsl .controls.btn-nav span.active,.vid-html .crsl .controls.btn-nav span:hover {background-image: url(' + _styles.playlistCarousel.paginationIcon.selected + ');}', '.vid-html .crsl .controls{color:' + _styles.playlistCarousel.paginationText.color + ';font-family:' + _styles.playlistCarousel.paginationText.font + ';font-size:' + _styles.playlistCarousel.paginationText.size + 'px;}'].join('');

                        if (["fullscreenwide", "recipe"].indexOf(O.state.playerSize.toLowerCase()) > -1) {
                            _rules += ['.vid-html .crsl li img{border-color:' + _styles.playlistCarousel.borderColors.normal + ';}', '.vid-html .crsl li a:hover img{border-color:' + _styles.playlistCarousel.borderColors.hover + ';}', '.vid-html .crsl li.sel img, .vid-html .crsl li.sel a:hover img{border-color:' + _styles.playlistCarousel.borderColors.selected + ';}'].join('');
                        } else if (O.state.playerSize.toLowerCase() == "rightrail") {
                            _rules += ['.vid-html .crsl li a{border-color:' + _styles.playlistCarousel.borderColors.normal + ';}', '.vid-html .crsl li a:hover{border-color:' + _styles.playlistCarousel.borderColors.hover + ';}', '.vid-html .crsl li.sel a, .vid-html .crsl li.sel a:hover{border-color:' + _styles.playlistCarousel.borderColors.selected + ';}'].join('');
                        }
                        $("head").append('<style id="vid-css" type="text/css">' + _rules + '</style>');
                        var aHtml = [];
                        aHtml.push('<div class="hd"></div>');
                        aHtml.push('<div class="crsl-wrap"><ul>');
                        $.each(O.data.eff.channel.video,

                        function (i, c) {
                            aHtml.push('<li>');
                            aHtml.push('<a href="#" class="clrfix"><img width="' + _this.crslCfg.imgDims.width + '" height="' + _this.crslCfg.imgDims.height + '" src="' + c.thumbnailUrl + '" /><span class="icn"></span>');
                            aHtml.push('<p><span>' + c.clipName + '</span><span class="sec"> (' + c.length + ')</span></p></a>');
                            aHtml.push('</li>');
                        });
                        aHtml.push('</ul></div>');
                        O.VPlayer.elts.jPlayerWrap.append('<div class="crsl">' + aHtml.join(' ') + '</div>');
                        O.VPlayer.elts.jChNav = O.VPlayer.elts.jPlayerWrap.find(".crsl");
                        O.VPlayer.elts.jCrsl = O.VPlayer.elts.jChNav.find(".crsl-wrap");
                        O.VPlayer.elts.jCrsl.jCarouselLite({
                            container: "#" + O.state.containerID + "-instance .crsl",
                            btnNavigation: true,
                            btnNext: ".crsl .next-btn",
                            btnPrev: ".crsl .prev-btn",
                            mouseWheel: true,
                            visible: _this.crslCfg.crslItemsVisible,
                            scroll: _this.crslCfg.crslItemsVisible,
                            circular: false,
                            displayPage: Math.ceil(O.VPlayer.elts.jCrsl.find("li").length / _this.crslCfg.crslItemsVisible) > 3
                        });
                        O.VPlayer.elts.jCrslPrev = O.VPlayer.elts.jChNav.find(".prev-btn");
                        O.VPlayer.elts.jCrslNext = O.VPlayer.elts.jChNav.find(".next-btn");
                        return;
                    },

                    updtCrslForIdx: function (idx) {
                        var _this = this;
                        O.VPlayer.elts.jCrsl.find("li").removeClass("sel").eq(idx).addClass("sel");
                        // current page
                        var oldPg = -O.VPlayer.elts.jCrsl.children("ul").position().left / O.VPlayer.elts.jCrsl.width();
                        var newPg = Math.floor(idx / _this.crslCfg.crslItemsVisible);
                        var maxPg = Math.floor((O.VPlayer.elts.jCrsl.find(".crsl-item").length - 1) / _this.crslCfg.crslItemsVisible);
                        if (oldPg != newPg) {
                            // rotate carousel to desired page
                            O.VPlayer.elts.jCrsl.find("ul").animate({
                                left: (-O.VPlayer.elts.jCrsl.width() * newPg).toString() + "px"
                            });
                            // switch left/right nav button states
                            if (newPg == 0) O.VPlayer.elts.jCrslPrev.addClass("disabled");
                            if (oldPg == 0) O.VPlayer.elts.jCrslPrev.removeClass("disabled");
                            if (newPg == maxPg) O.VPlayer.elts.jCrslNext.addClass("disabled");
                            if (oldPg == maxPg) O.VPlayer.elts.jCrslNext.removeClass("disabled");
                            // fix up pagination
                            var jCrslNav = O.VPlayer.elts.jChNav.find(".controls");
                            if (jCrslNav.hasClass("btn-nav")) {
                                jCrslNav.children("span").eq(oldPg).removeClass("active").end().eq(newPg).addClass("active");
                            } else {
                                jCrslNav.text((newPg + 1) + " of " + (maxPg + 1));
                            }
                        }
                        return;
                    },

                    initPlaylistController: function () {

                        O.VPlayer.elts.jChNav.delegate("li > a", O.Util.getUIselectEvent(),

                        function (evt) {
                            if (!$(this).closest("li").hasClass("sel")) {
                                O.state.curVidIdx = O.VPlayer.elts.jCrsl.find("li > a").index(this);
                                console.log("play new video: " + O.data.eff.channel.video[O.state.curVidIdx].assetId);
                                O.VPlayer.Playlist.readyToPlayVid();
                            }
                            return false;
                        }).delegate("li > a", "click", function () {
                            return false
                        });
                        // can't use event map in jQ 1.4.2, requires 1.4.3 
                        return;

                    },

                    playNext: function () {
                        if (O.state.curVidIdx < O.data.eff.channel.video.length - 1) {
                            ++O.state.curVidIdx;
                            O.VPlayer.Playlist.readyToPlayVid();
                        } else {
                            O.VPlayer.elts.jVidElt.one("canplay", function () {
                                O.VPlayer.VidElt.removeOverlay();
                            });
                            if (O.VPlayer.elts.dVidElt.webkitDisplayingFullscreen) O.VPlayer.elts.dVidElt.webkitExitFullscreen();
                            O.VPlayer.VidElt.showOverlay(O.Util.getEndframeHTML(), "endframe");
                        }
                        return;
                    },

                    // play the video pointed to (in the playlist) by the current video index
                    playVideoByIdx: function (vidIdx) {
                        // update title if nec
                        // rotate carousel if nec.
                        O.state.mode = "content";
                        O.VPlayer.elts.jVidElt.trigger("playVideoByUrlSNI", {
                            "url": O.data.eff.channel.video[O.state.curVidIdx].videoUrl_eff,
                            "mode": O.state.mode,
                            "channelId": O.state.channelId,
                            "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                        });
                    },

                    findSelectedVid: function () {
                        // if a video in playlist was specified, find its position; else stay on first one
                        if (O.state.videoId) {
                            $.each(O.data.eff.channel.video,

                            function (i, v) {
                                console.log("looking for " + O.state.videoId + " " + i + " " + v);
                                if (v.videoId == O.state.videoId) {
                                    O.state.curVidIdx = i;
                                    return false;
                                }
                            });
                        }
                        return;
                    },

                    readyToPlayVid: function (ckAutoplay) {
                        if (O.data.eff.config.showCarousel) {
                            O.VPlayer.Playlist.updtCrslForIdx(O.state.curVidIdx);
                        }
                        O.Analytics.prepVideo();
                        O.state.playbackQ = [O.VPlayer.Playlist.playNext];
                        // poster for non-autoplay: configured or dictated by device
                        if (!O.data.eff.config.autoPlay || !O.Util.deviceAutoPlay()) {
                            O.VPlayer.VidElt.setPosterForVideo();
                        }
                        // only on first video in player (page load):
                        // user initiate play handler needed only for autoplay devices (not iOS)
                        if (ckAutoplay && !O.data.eff.config.autoPlay && O.Util.deviceAutoPlay()) {
                            O.VPlayer.elts.jVidElt.one("play.start", O.VPlayer.Playlist.playVid);
                        }
                        // sync ad fix-- insert default big box if it isn't going to come from player once everything loads
                        //  (i.e., if no preroll or if effectively no autostart)
                        if ( !! O.state.enableSyncAdFix && (!O.data.eff.config.autoPlay || !O.data.eff.ads.preroll || !O.Util.deviceAutoPlay()) && (typeof setDefaultBigboxAd === "function")) {
                            setDefaultBigboxAd();
                            O.state.enableSyncAdFix = false; // default ad only on page load, not subsequent videos
                        }
                        // will actually play video in 3 cases
                        // -check autoplay flag not set (play through from earlier video in channel)
                        // -autoplay configured (play first video)
                        // -non-autoplay device (iOS-- won't actually play but video elt will get src attr, allowing poster to show 
                        if (!ckAutoplay || O.data.eff.config.autoPlay || !O.Util.deviceAutoPlay()) {
                            O.VPlayer.elts.jVidElt.unbind("play.start");
                            O.VPlayer.Playlist.playVid();
                        }
                        return;
                    },

                    playVid: function () {
                        O.state.playcount++;
                        var cbNextAction = (function (vidIdx) {
                            return function () {
                                O.VPlayer.Playlist.playVideoByIdx(vidIdx);
                            };
                        })(O.state.curVidIdx);
                        if (O.data.eff.config.showAds && O.data.eff.ads.preroll) {
                            console.log("playvid <<<<<<<<<");
                            O.state.playbackQ.push(cbNextAction);
                            O.Ads.doPreroll();
                        } else {
                            cbNextAction();
                        }
                        return;
                    }


                },

                VidElt: {

                    init: function () {
                        O.VPlayer.elts.jPlayerWrap.prepend('<div class="vid-wrap"><video></video></div>');
                        O.VPlayer.elts.jVidWrap = O.VPlayer.elts.jOuterWrap.find(".vid-wrap");
                        O.VPlayer.elts.jVidElt = O.VPlayer.elts.jOuterWrap.find("video");
                        O.VPlayer.elts.dVidElt = O.VPlayer.elts.jVidElt.get(0);
                        O.VPlayer.elts.jVidElt.attr("controls", "controls");
                        this.initMediaController();
                        this.setVideoDims();
                        // set up custom controls -- state setting indicating?
                        // if user event handler passed, bind handlers to video events (allows TVL to update thumbnail matrix with current state)
                        if (typeof O.data.extrn.cfgArgs.userEventHandler === "function") O.TVL.UIevents();
                        return;

                    },

                    setVideoDims: function () {
                        // this used to be more complicated: now just constrain height and width will follow:
                        var h_max = O.state.dimensions.height;
                        if (O.data.eff.config.showCarousel) {
                            h_max -= O.VPlayer.elts.jChNav.outerHeight(true);
                        }
                        O.VPlayer.elts.jVidElt.attr("height", h_max);
                        return;
                    },

                    setPosterForVideo: function () {
                        O.VPlayer.elts.jVidElt.attr("poster", O.Util.getVidImageForHeight(O.data.eff.channel.video[O.state.curVidIdx].assetId, O.VPlayer.elts.jVidElt.height(), O.data.eff.channel.video[O.state.curVidIdx].thumbnailUrl.match(/http:\/\/[^\/]*/)[0]));
                        return;
                    },

                    showOverlay: function (inHTML, inType) {
                        if (O.VPlayer.elts.jVidWrap.children(".vid-over").length == 0) {
                            O.VPlayer.elts.jVidWrap.prepend("<div class='vid-over'></div>");
                        }
                        if (O.VPlayer.elts.jVidWrap.children(".vid-over").attr("data-msg") != inType) {
                            O.VPlayer.elts.jVidWrap.children(".vid-over").html(inHTML).attr("data-msg", inType);
                            O.VPlayer.elts.jVidWrap.addClass("overlay");
                        }
                        return;
                    },

                    removeOverlay: function () {
                        if (O.VPlayer.elts.dVidElt.src) {
                            O.VPlayer.elts.jVidWrap.removeClass("overlay");
                            O.VPlayer.elts.jVidWrap.children(".vid-over").empty().removeAttr("data-msg");
                            return;
                        }
                    },

                    initMediaController: function () {

                        var _v = O.VPlayer.elts.jVidElt;
                        var _d = O.VPlayer.elts.dVidElt;
                        var furthestPlay = 0;
                        var timeoutVar,
                        setToPlayFunc = function() {
                        	if( _d.paused && _d.duration > 0 ) {
                        		_d.play();
                        }
                        };
                        
                        _v.bind({
                            "play": onPlay,
                            "pause": onPause,

                            "loadstart": onLoadStart,
                            "loadedmetadata": onLoadedMetaData,
                            "loadeddata": onLoadedData,
                            "canplay": onCanPlay,
                            "canplaythrough": onCanPlayThrough,
                            "ended": onEnded,

                            "playing": onPlaying,
                            "seeking": onSeeking,
                            "seeked": onSeeked,

                            "durationchange": onDurationChange,
                            "progress": onProgress,
                            "timeupdate": onTimeUpdate,

                            "suspend": onSuspend,
                            "abort": onAbort,
                            "error": onError,
                            "emptied": onEmptied,
                            "stalled": onStalled,
                            "waiting": onWaiting,


                            "togglePlaySNI": onTogglePlay_SNI,
                            "goTimeSNI": onGoTime_SNI,
                            "playVideoByUrlSNI": onPlayVideoByUrl_SNI,
                            "startedSNI": onStarted_SNI,
                            "completeSNI": onComplete_SNI

                        });

                        function onPlay() {
                            console.log("M: video play event");

                            /*								o.jq.VCPlay.trigger("update", "pause");
								o.diag.evts["play"]++;
								if (!o.cfg.track.start) {
									o.cfg.track.start = true;
									CEL.Tracking.logVideo("START", o.meta);
								}
*/
                        }

                        function onPause() {
                            console.log("M: video pause event");
                            //							o.jq.VCPlay.trigger("update", "play");
                            //								o.diag.evts["pause"]++;
                        }

                        function onLoadStart() {
                            console.log("M: video loadstart event");
                            //								o.diag.evts["loadstart"]++;
                        }

                        function onLoadedMetaData() {
                            console.log("M: video loadedmetadata event");
                            console.log("vid elt w/h " + $("video").width() + " / " + $("video").height() + " media w/h " + $("video")[0].videoWidth + " / " + $("video")[0].videoHeight);


                            //								o.jq.VidPlayer.trigger("update", {ad: "sync"});
                            //								o.diag.evts["loadedmetadata"]++;
                        };

                        function onLoadedData() {
                            console.log("M: video loadeddata event");
                            //								o.diag.evts["loadeddata"]++;
                        };

                        function onCanPlay() {
                            console.log("M: video canplay event");
                            if (_d.src == "") _d.pause();
                            //								o.diag.evts["canplay"]++;
                            /*								o.jq.Loading.hide();
								if (!o.cfg.playFl) {
									if (o.meta.timeos && o.meta.timeos > 0) {
										o.cfg.dVidElt.currentTime = o.meta.timeos;
										o.meta.timeos = 0;
									} else {
										o.cfg.dVidElt.currentTime = .1;    // for Safari
										o.jq.VCTimes.trigger("update", {dur: o.cfg.dVidElt.duration});
									}
									
									if (o.jq.VCBigPlay) {
										o.jq.VCBigPlay.show();
									} else {
										o.cfg.dVidElt.play(); 
										o.cfg.playFl = true;
									}
								}
*/
                            //						_d.play(); 
                        };

                        function onCanPlayThrough() {
                            console.log("M: video canplaythrough event |" + _d.src + '|');
                            //								o.diag.evts["canplaythrough"]++;
                        };


                        function onPlaying() {
                            console.log("M: video playing event");
                            //								o.diag.evts["playing"]++;
                        };

                        function onSeeking() {
                            //							_d.currentTime = furthestPlay;
                            console.log("M: video seeking event");
                            //								o.diag.evts["seeking"]++;
                        };

                        function onSeeked() {
                            /*
							if (_d.currentTime > furthestPlay) {
								_d.pause();
								_d.currentTime = furthestPlay;
								_d.play();
							}
*/
                            console.log("M: video seeked event");
                            //								o.diag.evts["seeked"]++;
                        };

                        function onDurationChange() {
                            console.log("M: video durationchange event >>" + _d.duration);
                            //								o.jq.VCTimes.trigger("update", {dur: o.cfg.dVidElt.duration});
                            //								o.diag.evts["durationchange"]++;
                        };

                        function onProgress() {
                            console.log("M: video progress event");
                            //								o.diag.evts["progress"]++;
                        };

                        function onTimeUpdate() {

                        };

                        function onEnded() {
                            console.log("M: video ended event");
                            _d.pause();
                            _v.trigger("completeSNI", {
                                "mode": O.state.mode,
                                "channelId": O.state.channelId,
                                "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                            });

                        }


                        function onSuspend() {
                            console.log("M: suspend event");
                        }

                        function onAbort() {
                            console.log("M: abort event");
                        }

                        function onError(e) {
                            // missing video src url:  error.code == MEDIA_ERR_SRC_NOT_SUPPORTED (4) and networkState == NETWORK_NO_SOURCE (3)
                            // missing poster image: Firefox only: error == null (but this method hit!)
                            console.log("M: error event " + (_d.error ? _d.error.code : '') + " " + _d.networkState);
                            if ( !! _d.error && _d.error.code == _d.error.MEDIA_ERR_SRC_NOT_SUPPORTED && _d.networkState == _d.NETWORK_NO_SOURCE) {
                                if (_d.webkitDisplayingFullscreen) _d.webkitExitFullscreen();
                                _v.one("startedSNI", function () {
                                    O.VPlayer.VidElt.removeOverlay();
                                });
                                O.VPlayer.VidElt.showOverlay(O.Util.getVideoMissingHTML(), "missing");
                            } else {
                                // Firefox: poster image doesn't load, covers video element; need a valid image URI to clear it (so use 1x1 gif):
                                _v.attr("poster", 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
                            }
                        }

                        function onEmptied() {
                            console.log("M: emptied event");
                        }

                        function onStalled() {
                            console.log("M: stalled event");
                            if ((_d.duration - _d.currentTime) < .1) {
                                _d.pause();
                                _v.trigger("completeSNI", {
                                    "mode": O.state.mode,
                                    "channelId": O.state.channelId,
                                    "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                                });
                            }
                            
                            
                            if( _d.paused && _d.duration > 0 ) {
                            	clearTimeout(timeoutVar);
                            	timeoutVar = setTimeout(setToPlayFunc, 3000);
                            }                            
                        }


                        function onWaiting() {
                            console.log("M: waiting event");
                        }

                        // custom video events
                        function onTogglePlay_SNI(e) {
                            console.log("M: catch toggle play/pause");
                            /*								if (o.cfg.dVidElt.ended) { o.cfg.dVidElt.currentTime = 0; }
								if (o.cfg.dVidElt.paused) { o.cfg.dVidElt.play(); }
								else { o.cfg.dVidElt.pause(); }
*/
                        }

                        function onGoTime_SNI(evt, dta) {
                            console.log("M: catch go to time offset " + dta.os);

                            //							o.cfg.dVidElt.currentTime = dta.os * o.cfg.dVidElt.duration;
                        }

                        function onStarted_SNI(evt, dta) {
                            console.log("M: catch custom SNI started handler: " + dta.mode);
                            return;
                        }

                        function onComplete_SNI(evt, dta) {
                            console.log("M: catch custom SNI complete handler: mode: |" + dta.mode + "|  src: |" + _v.attr("src") + "|");
                            if (O.state.mode) {
                                O.state.mode = "";
                                _v.removeAttr("src");
                                _d.pause();
                                if (O.state.playbackQ.length > 0) {
                                    _v.one("startedSNI", function () {
                                        O.VPlayer.VidElt.removeOverlay();
                                    });
                                    O.VPlayer.VidElt.showOverlay(O.Util.getLoadingHTML(), "loading");
                                    (O.state.playbackQ.pop())();
                                }
                            }
                            return;
                        }

                        function onPlayVideoByUrl_SNI(evt, dta) {
                            console.log("M: catch custom SNI play video by URL handler " + dta.url);
                            _v.unbind(".vid");
                            console.log("binding custom startedSNI");
                            _v.one("playing", function () {
                                console.log("triggering custom play->startedSNI networkstate: " + _d.networkState);
                                if (!_d.error && _d.networkState != _d.NETWORK_NO_SOURCE) {
                                    _v.trigger("startedSNI", {
                                        "mode": O.state.mode,
                                        "channelId": O.state.channelId,
                                        "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                                    });
                                }
                            });
                            O.VPlayer.VidElt.playVideoByUrl(dta.url);
                            return;
                        }

                    },

                    playVideoByUrl: function (inUrl) {
                        console.log("M: loading new " + inUrl);
                        O.VPlayer.elts.dVidElt.src = inUrl;
                        O.VPlayer.elts.dVidElt.load();
                        O.VPlayer.elts.dVidElt.play();
                        return;
                    }
                },

                init: function () {
                    this.Playlist.init();
                    return;
                }

            };
        })();

        O.Ads = (function () {

            return new function () {

                var Public = this;

                var doPreroll = function () {
                        var url = O.Util.getAdURLbyType("preroll");
                        O.data.extrn.ads.cur = {};
                        delete O.data.eff.ads.cur;
                        O.Util.loadXML({
                            url: url,
                            tgt: O.data.extrn.ads.cur,
                            ctrlID: "adLoaded",
                            postProc: function () {
                                O.Ads.parseAd();
                            }
                        });
                    };
                Public.doPreroll = doPreroll;

                var parseAd = function () {
                        var _o = {};
                        try {
                            var _i, _j, _m;
                            var _a = O.data.extrn.ads.cur.VAST.Ad.InLine.Creatives.Creative;
                            for (_i = 0; _i < _a.length; _i++) {
                                if (typeof _a[_i].Linear != "undefined") {
                                    _m = _a[_i].Linear.MediaFiles.MediaFile;
                                    if (!$.isArray(_m)) _m = [_m];
                                    for (_j = 0; _j < _m.length; _j++) {
                                        if ((new RegExp(O.state.adMediaFmt)).test(_m[_j].type)) {
                                            _o.video = _m[_j].text;
                                            break;
                                        }
                                    }
                                    _o.dur = O.Util.hhmmss2sss(_a[_i].Linear.Duration);
                                    if ((typeof _a[_i].Linear.TrackingEvents != "undefined") && (typeof _a[_i].Linear.TrackingEvents.Tracking != "undefined")) {
                                        _m = _a[_i].Linear.TrackingEvents.Tracking;
                                        if (!$.isArray(_m)) _m = [_m];
                                        _o.tracking = {};
                                        for (_j = 0; _j < _m.length; _j++) {
                                            if (typeof _m[_j].text === "string") {
                                                _o.tracking[_m[_j].event] = _m[_j].text;
                                            }
                                        }
                                    }
                                } else if (typeof _a[_i].CompanionAds != "undefined") {
                                    var _m = _a[_i].CompanionAds.Companion;
                                    _o.sync = _m.IFrameResource;
                                }
                            }
                            _a = O.data.extrn.ads.cur.VAST.Ad.InLine;
                            if (typeof _a.Impression != "undefined") {
                                if (!$.isArray(_a.Impression)) _a.Impression = [_a.Impression];
                                _o.impression = [];
                                _a.Impression.forEach(function (_v) {
                                    if (_v.toString() != "") {
                                        _o.impression.push(_v.toString());
                                    }
                                });
                            }
                        } finally {
                            O.data.eff.ads.cur = _o;
                            return;
                        }
                    };
                Public.parseAd = parseAd;

                var runAd = function () {
                        try {
                            if (typeof O.data.eff.ads.cur.video !== "string") throw "noVideo";
                            O.VPlayer.elts.jVidElt.trigger("pause");
                            O.state.mode = "ad";
                            O.VPlayer.elts.jVidElt.unbind(".ads");
                            O.VPlayer.elts.jVidElt.one("play.ads", function () {
                                if (!O.VPlayer.elts.dVidElt.webkitDisplayingFullscreen) setDartEnterpriseBanner('BIGBOX', SNI.Player.SNAPHTML5.data.eff.ads.cur.sync);
                            });
                            setAdEvents();
                            O.VPlayer.elts.jVidElt.trigger("playVideoByUrlSNI", {
                                "url": O.data.eff.ads.cur.video,
                                "mode": O.state.mode,
                                "channelId": O.state.channelId,
                                "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                            });
                        } catch (e) {
                            O.VPlayer.elts.jVidElt.unbind(".ads");
                            (O.state.playbackQ.pop())();
                        } finally {
                            return;
                        }
                    };
                Public.runAd = runAd;

                var trackpts = [];
                Public.trackpts = trackpts;

                var setAdEvents = function () {
                        var _v = O.VPlayer.elts.jVidElt;
                        trackpts = [];

                        function ckPctEvent(evt) {
                            var tp, curTimeOS = O.VPlayer.elts.dVidElt.currentTime;
                            while (trackpts.length > 0 && trackpts[0].sss < curTimeOS) {
                                tp = trackpts.shift();
                                O.Util.pixelBeacon(tp.urls);
                            }
                            return;
                        }

                        if ( !! O.data.eff.ads.cur.impression || !! O.data.eff.ads.cur.tracking["start"]) {
                            _v.one("play.ads", (function (url) {
                                return function () {
                                    O.Util.pixelBeacon(url);
                                    return;
                                };
                            })([].concat(O.data.eff.ads.cur.impression || []).concat([O.data.eff.ads.cur.tracking["start"]] || [])));
                        }

                        if ( !! O.data.eff.ads.cur.tracking["complete"]) {
                            _v.one("completeSNI.ads", (function (url) {
                                return function () {
                                    O.Util.pixelBeacon(url);
                                    _v.unbind(".ads");
                                    return;
                                };
                            })([O.data.eff.ads.cur.tracking["complete"]]));
                        }

                        if ( !! O.data.eff.ads.cur.tracking["midpoint"]) {
                            trackpts.push({
                                sss: O.data.eff.ads.cur.dur * .5,
                                urls: [O.data.eff.ads.cur.tracking["midpoint"]]
                            });
                        }
                        if ( !! O.data.eff.ads.cur.tracking["firstQuartile"]) {
                            trackpts.push({
                                sss: O.data.eff.ads.cur.dur * .25,
                                urls: [O.data.eff.ads.cur.tracking["firstQuartile"]]
                            });
                        }
                        if ( !! O.data.eff.ads.cur.tracking["thirdQuartile"]) {
                            trackpts.push({
                                sss: O.data.eff.ads.cur.dur * .75,
                                urls: [O.data.eff.ads.cur.tracking["thirdQuartile"]]
                            });
                        }
                        if (trackpts.length > 0) {
                            trackpts = trackpts.sort(function (a, b) {
                                return a.sss - b.sss;
                            });
                            _v.bind("timeupdate.ads", ckPctEvent);
                        }

                        return;
                    }

            };

        })();

        O.Analytics = (function () {

            return new function () {

                var Public = this;
                var _s, _t;
                var ThingsToTrack = [];
                if (!O.state.embed) {
                    ThingsToTrack = [{
                        internalName: "VideoSelect",
                        eVars: [21, 22, 23, 24, 25, 27, 28, 29, 30, 33, 34, 35],
                        props: [37, 38],
                        hiers: [1]
                    }, {
                        internalName: "VideoAdStart",
                        cfgNames: ["VideoAdStart", "VideoAdStart2"]
                    }, {
                        internalName: "VideoAdComplete"
                    }, {
                        internalName: "VideoContentStart"
                    }, {
                        internalName: "VideoContentComplete",
                        cfgNames: ["VideoContent100%"]
                    }, {
                        internalName: "VideoNotFound"
                    }, {
                        internalName: "VideoPause"
                    }, {
                        internalName: "VideoResume"
                    }, {
                        internalName: "VideoScrollLft",
                        eVars: [39],
                        props: [4]
                    }, {
                        internalName: "VideoScrollRt",
                        eVars: [39],
                        props: [4]
                    }];
                } else { // embedded
                    ThingsToTrack = [{
                        internalName: "VideoSelect",
                        eVars: [27, 28, 33, 34, 35],
                        props: [37, 38],
                        hiers: [1]
                    }, {
                        internalName: "VideoPause"
                    }, {
                        internalName: "VideoResume"
                    }];
                }
                Public.ThingsToTrack = ThingsToTrack;

                var trackpts = {
                    saved: [],
                    working: []
                };
                Public.trackpts = trackpts;

                // overll one-time init
                var init = function () {
                        _s = $.isEmptyObject(O.data.extrn.Omniture) ? O.data.defa.Omniture : O.data.extrn.Omniture;
                        _t = O.data.eff.Omniture;
                        _t.accountName = _s.accountName;
                        _t.trackingServer = _s.trackingServer || window.s.trackingServer;

                        _t.vars = {};
                        if (!$.isArray(_s.vars.variable)) {
                            _s.vars.variable = [_s.vars.variable];
                        }
                        $.each(_s.vars.variable, function (i, _this) {
                            _t.vars[_this.name] = {
                                cur: "",
                                defa: _this["default"]
                            };
                        });

                        _t.evars = {};
                        if (!$.isArray(_s.formats.customVars.eVars.eVar)) {
                            _s.formats.customVars.eVars.eVar = [_s.formats.customVars.eVars.eVar];
                        }
                        $.each(_s.formats.customVars.eVars.eVar, function (i, _this) {
                            _t.evars[_this.number] = {
                                cur: "",
                                templ: _this.text
                            };
                        });

                        _t.props = {};
                        if (!$.isArray(_s.formats.customVars.props.prop)) {
                            _s.formats.customVars.props.prop = [_s.formats.customVars.props.prop];
                        }
                        $.each(_s.formats.customVars.props.prop, function (i, _this) {
                            _t.props[_this.number] = {
                                cur: "",
                                templ: _this.text
                            };
                        });

                        _t.hiers = {};
                        if (!$.isArray(_s.formats.customVars.hiers.hier)) {
                            _s.formats.customVars.hiers.hier = [_s.formats.customVars.hiers.hier];
                        }
                        $.each(_s.formats.customVars.hiers.hier, function (i, _this) {
                            _t.hiers[_this.number] = {
                                cur: "",
                                templ: _this.text
                            };
                        });

                        _t.events = {};
                        if (!$.isArray(_s.events.event)) {
                            _s.events.event = [_s.events.event];
                        }
                        $.each(_s.events.event, function (i, _this) {
                            _t.events[_this.name] = {
                                number: _this.number
                            };
                        });
                        // extract event names of the form VideoContent10%, etc., but not 100% which is handled separately
                        var pctEvents = Object.getOwnPropertyNames(_t.events).filter(function (_this, i, a) {
                            return /VideoContent\d\d?%/.test(_this);
                        })
                        if (pctEvents.length > 0) {
                            $.each(pctEvents, function (i, _this) {
                                trackpts.saved.push({
                                    pct: /VideoContent(\d\d?)%/.exec(_this)[1]
                                });
                            });
                            // make sure it's sorted
                            trackpts.saved = trackpts.saved.sort(function (a, b) {
                                return a.pct - b.pct;
                            });
                        }

                        return;
                    };
                Public.init = init;

                var prepVideo = function () {
                        console.log('prepVideo: Yup!');
                        var _c = O.data.eff.channel;
                        var _v = _c.video[O.state.curVidIdx];
                        if (typeof _t.vars["Brand"] === "object" ) {_t.vars["Brand"].cur = _t.accountName;};
                        if (typeof _t.vars["Channel"] === "object" ) {_t.vars["Channel"].cur = _c.title;};
                        if (typeof _t.vars["PlayerName"] === "object" ) {_t.vars["PlayerName"].cur = _c.psaPlayerTitle;};
                        if (typeof _t.vars["OriginalSite"] === "object" ) {_t.vars["OriginalSite"].cur = _v.sourceNetwork;};
                        if (typeof _t.vars["VideoTitle"] === "object" ) {_t.vars["VideoTitle"].cur = _v.clipName;};
                        if (typeof _t.vars["PlayType"] === "object" ) {_t.vars["PlayType"].cur = "manual";};
                        if (typeof _t.vars["DARTStation"] === "object" ) {_t.vars["DARTStation"].cur = _c.adLevel;};
                        if (typeof _t.vars["PlayerAction"] === "object" ) {_t.vars["PlayerAction"].cur = "HTML5 Video Play";};
                        if (typeof _t.vars["AssetID"] === "object" ) {_t.vars["AssetID"].cur = _v.assetId;};
                        if (typeof _t.vars["Sponsor"] === "object" ) {_t.vars["Sponsor"].cur = _c.sponsorshipValue;};
                        if (typeof _t.vars["ShowName"] === "object" )  { _t.vars["ShowName"].cur = _v.showName; };
                        if (typeof _t.vars["Duration"] === "object" ) {_t.vars["Duration"].cur = _v.length;};
                        $.each(_t.vars, function (i, _this) {
                            if (_this.cur == "") {
                                _this.cur = _this.defa;
                            }
                        });
                        // expand each evars template based on vars value
                        $.each(_t.evars, function (i, _this) {
                            _this.cur = _t.vars[/\$(\w+)\$/.exec(_this.templ)[1]].cur;
                        });
                        $.each(_t.props, function (i, _this) {
                            _this.cur = _t.vars[/\$(\w+)\$/.exec(_this.templ)[1]].cur;
                        });
                        $.each(_t.hiers, function (i, _this) {
                            _this.cur = "";
                            $.each(_this.templ.split('|'), function (i, __this) {
                                if (i > 0) _this.cur += '|';
                                _this.cur += _t.vars[/\$(\w+)\$/.exec(__this)[1]].cur;
                            });
                        });
                        // reset events cleared flags
                        $.each(ThingsToTrack, function (i, _this) {
                            _this.cleared = false;
                        });
                        trackpts.working = [];
                        $.each(trackpts.saved, function (_i, _this) {
                            trackpts.working[_i] = {
                                pct: _this.pct,
                                sss: _this.pct * _v.length_sss / 100
                            };
                        });
                        setOmniEvents();
                        return;
                    };
                Public.prepVideo = prepVideo;

                var setOmniEvents = function () {
                        var _v = O.VPlayer.elts.jVidElt;

                        function ckPctEvent(evt) {
                            var tp, tps = trackpts.working,
                                curTimeOS = O.VPlayer.elts.dVidElt.currentTime;
                            if (O.state.mode != "content") return;
                            while (tps.length > 0 && tps[0].sss < curTimeOS) {
                                tp = tps.shift();
                            }
                            if (typeof tp === "object") {
                                sendOmnitureEvent({
                                    events: [_t.events["VideoContent" + tp.pct + "%"].number],
                                    linkName: "Video Content",
                                    eVars: [],
                                    props: [],
                                    hiers: []
                                });
                            }
                            return;
                        }

                        _v.unbind(".omni");
                        if (O.data.eff.config.showCarousel) O.VPlayer.elts.jChNav.unbind(".omni");

                        for (var _i = 0, itm; itm = ThingsToTrack[_i]; _i++) {

                            itm.cleared = false;

                            var events = [],
                                linkname = "";
                            if (!$.isArray(itm.cfgNames)) {
                                itm.cfgNames = [itm.internalName];
                            }
                            for (var _j = 0; _j < itm.cfgNames.length; _j++) {
                                if (typeof _t.events[itm.cfgNames[_j]] === "object") {
                                    events.push(_t.events[itm.cfgNames[_j]].number);
                                }
                            }

                            var omniEvent = {
                                idx: _i,
                                events: events,
                                linkName: "",
                                eVars: itm.eVars || [],
                                props: itm.props || [],
                                hiers: itm.hiers || []
                            };

                            switch (itm.internalName) {

                            case "VideoSelect":
                                omniEvent.linkName = "Video Select";
                                _v.one("startedSNI.omni", (function (omniEvent) {
                                    return function (evt, dta) {
                                        if (!O.Analytics.ThingsToTrack[omniEvent.idx].cleared) {
                                            O.Analytics.ThingsToTrack[omniEvent.idx].cleared = true;
                                            sendOmnitureEvent(omniEvent);
                                        }
                                    };
                                })(omniEvent));
                                break;

                            case "VideoAdStart":
                                omniEvent.linkName = "Video Ad";
                                _v.bind("startedSNI.omni", (function (omniEvent) {
                                    return function (evt, dta) {
                                        if (dta.mode == "ad" && !O.Analytics.ThingsToTrack[omniEvent.idx].cleared) {
                                            O.Analytics.ThingsToTrack[omniEvent.idx].cleared = true;
                                            sendOmnitureEvent(omniEvent);
                                        }
                                    };
                                })(omniEvent));
                                break;

                            case "VideoAdComplete":
                                omniEvent.linkName = "Video Ad";
                                _v.bind("completeSNI.omni", (function (omniEvent) {
                                    return function (evt, dta) {
                                        if (dta.mode == "ad" && !O.Analytics.ThingsToTrack[omniEvent.idx].cleared) {
                                            O.Analytics.ThingsToTrack[omniEvent.idx].cleared = true;
                                            sendOmnitureEvent(omniEvent);
                                        }
                                    };
                                })(omniEvent));
                                break;

                            case "VideoContentStart":
                                omniEvent.linkName = "Video Content";
                                _v.bind("startedSNI.omni", (function (omniEvent) {
                                    return function (evt, dta) {
                                        if (dta.mode == "content" && !O.Analytics.ThingsToTrack[omniEvent.idx].cleared) {
                                            O.Analytics.ThingsToTrack[omniEvent.idx].cleared = true;
                                            sendOmnitureEvent(omniEvent);
                                        }
                                    };
                                })(omniEvent));
                                break;

                            case "VideoContentComplete":
                                omniEvent.linkName = "Video Content";
                                _v.bind("completeSNI.omni", (function (omniEvent) {
                                    return function (evt, dta) {
                                        if (dta.mode == "content" && !O.Analytics.ThingsToTrack[omniEvent.idx].cleared) {
                                            O.Analytics.ThingsToTrack[omniEvent.idx].cleared = true;
                                            sendOmnitureEvent(omniEvent);
                                        }
                                    };
                                })(omniEvent));
                                break;

                            case "VideoNotFound":

                                break;
                            case "VideoPause":

                                break;

                            case "VideoResume":

                                break;

                            case "VideoScrollLft":
                                if (O.data.eff.config.showCarousel) {
                                    omniEvent.linkName = "Video Player: Arrow Scroll";
                                    omniEvent.varOverride = {
                                        "PlayerAction": "Video Player: Arrow Scroll Left"
                                    };
                                    O.VPlayer.elts.jChNav.delegate(".prev-btn", O.Util.getUIselectEvent("omni"), (function (omniEvent) {
                                        return function (evt, dta) {
                                            if (!$(evt.currentTarget).hasClass("disabled")) sendOmnitureEvent(omniEvent);
                                        };
                                    })(omniEvent));
                                }
                                break;

                            case "VideoScrollRt":
                                if (O.data.eff.config.showCarousel) {
                                    omniEvent.linkName = "Video Player: Arrow Scroll";
                                    omniEvent.varOverride = {
                                        "PlayerAction": "Video Player: Arrow Scroll Right"
                                    };
                                    O.VPlayer.elts.jChNav.delegate(".next-btn", O.Util.getUIselectEvent("omni"), (function (omniEvent) {
                                        return function (evt, dta) {
                                            if (!$(evt.currentTarget).hasClass("disabled")) sendOmnitureEvent(omniEvent);
                                        };
                                    })(omniEvent));
                                }
                                break;

                            }
                        }

                        // progress trackpoint are checked on timeupdate
                        if (trackpts.saved.length > 0) {
                            _v.bind("timeupdate.omni", ckPctEvent);
                        }

                        return;

                    };
                // private setOmniEvents

                var s_save = {};
                // Private s_save

                var clearVars = function (s) {
                        function saveNclear(i, mem) {
                            s_save[mem] = s[mem];
                            s[mem] = "";
                        }
                        $.each(["usePlugins", "channel", "pageName", "pageURL", "events"], saveNclear);
                        for (var i = 0; i < 50; i++) {
                            saveNclear(i, "prop" + i);
                            saveNclear(i, "eVar" + i);
                            saveNclear(i, "hier" + i);
                        }
                        s_save.trackingServer = s.trackingServer;
                        s.trackingServer = _t.trackingServer;
                        s.usePlugins = false;
                        return;
                    };
                // Private clearVars

                var restoreVars = function (s) {
                        function putItBack(i, mem) {
                            s[mem] = s_save[mem];
                        }
                        $.each(["usePlugins", "channel", "pageName", "pageURL", "events"], putItBack);
                        for (var i = 0; i < 50; i++) {
                            putItBack(i, "prop" + i);
                            putItBack(i, "eVar" + i);
                            putItBack(i, "hier" + i);
                        }
                        s.trackingServer = s_save.trackingServer;
                        return;
                    };
                // Private restoreVars

                var qOmni = [];
                var sendOmnitureEvent = function (omniDta) {
                        if (typeof omniDta === "object") qOmni.push(omniDta);
                        ckQOmni();
                    };
                Public.sendOmnitureEvent = sendOmnitureEvent;

                var ckQOmni = function () {

                        function doOverride() {
                            var _k;
                            $.each(_t.props, function (_i, _v) {
                                _k = /\$(\w+)\$/.exec(_v.templ)[1];
                                if (_k in _d.varOverride) {
                                    _v.sav = _v.cur;
                                    _v.cur = _d.varOverride[_k];
                                }
                            });
                            $.each(_t.evars, function (_i, _v) {
                                _k = /\$(\w+)\$/.exec(_v.templ)[1];
                                if (_k in _d.varOverride) {
                                    _v.sav = _v.cur;
                                    _v.cur = _d.varOverride[_k];
                                }
                            });
                            return;
                        }

                        function undoOverride() {
                            $.each(_t.props, function (_i, _v) {
                                if (_v.sav) {
                                    _v.cur = _v.sav;
                                    delete _v.sav;
                                }
                            });
                            $.each(_t.evars, function (_i, _v) {
                                if (_v.sav) {
                                    _v.cur = _v.sav;
                                    delete _v.sav;
                                }
                            });
                            return;
                        }

                        var _to;
                        if (typeof s_gi != 'function') {
                            // omniture code is not loaded so try once every second until we find it
                            _to = setTimeout(function () {
                                clearTimeout(_to);
                                _to = null;
                                ckQOmni();
                            }, 1000);
                            return false;
                        } else {
                            // clear the timeout once omniture has been loaded
                            if (_to !== null) {
                                clearTimeout(_to);
                                _to = null;
                            }
                            // pop each element off the queue and process it
                            while (qOmni.length > 0) {
                                var _d = qOmni.pop();
                                var s = s_gi(_t.accountName);
                                var _name;
                                clearVars(s);
                                s.events = [];
                                _d.events.forEach(function (_v) {
                                    s.events.push("event" + _v);
                                });
                                s.events = s.events.join(',');
                                if (s.events == "") s.events = "None";
                                s.linkTrackEvents = s.events;
                                s.linkTrackVars = [];
                                if (typeof _d.varOverride === "object") doOverride();
                                _d.props.forEach(function (_v) {
                                    _name = "prop" + _v;
                                    s.linkTrackVars.push(_name);
                                    s[_name] = _t.props[_v].cur;
                                });
                                _d.eVars.forEach(function (_v) {
                                    _name = "eVar" + _v;
                                    s.linkTrackVars.push(_name);
                                    s[_name] = _t.evars[_v].cur;
                                });
                                _d.hiers.forEach(function (_v) {
                                    _name = "hier" + i;
                                    s.linkTrackVars.push(_name);
                                    s[_name] = _t.hiers[_v].cur;
                                });
                                s.linkTrackVars = s.linkTrackVars.join(',');
                                if (s.linkTrackVars == "") s.linkTrackVars = "None";
                                console.log("OMNI: event " + s.events + " " + s.linkTrackVars);
                                s.tl(true, 'o', _d.linkName);
                                if (typeof _d.varOverride === "object") undoOverride();
                                restoreVars(s);
                            }
                            return true;
                        }
                    };
                // private ckQOmni


            };

        })();


        O.TVL = (function () {
            return new function () {
                var Public = this;

                var UIevents = function () {
                        if (typeof O.data.extrn.cfgArgs.userEventHandler != "function") return;
                        var _v = O.VPlayer.elts.jVidElt;

                        O.data.extrn.cfgArgs.userEventHandler("playerReady", {
                            "itemType": O.state.mode,
                            "channelId": O.state.channelId,
                            "videoId": O.state.videoId
                        });
                        _v.bind("playVideoByUrlSNI", function (evt, dta) {
                            O.data.extrn.cfgArgs.userEventHandler("itemBegin", {
                                "itemType": dta.mode || "ad",
                                "channelId": dta.channelId,
                                "videoId": dta.videoId
                            })
                        });
                        _v.bind("completeSNI", function (evt, dta) {
                            O.data.extrn.cfgArgs.userEventHandler("itemEnd", {
                                "itemType": dta.mode || "ad",
                                "channelId": dta.channelId,
                                "videoId": dta.videoId
                            });
                        });
                        _v.bind("pause", function () {
                            O.data.extrn.cfgArgs.userEventHandler("itemPause", {
                                "itemType": O.state.mode || "ad",
                                "channelId": O.state.channelId,
                                "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                            });
                        });
                        _v.bind("play", function () {
                            O.data.extrn.cfgArgs.userEventHandler("itemResume", {
                                "itemType": O.state.mode || "ad",
                                "channelId": O.state.channelId,
                                "videoId": O.data.eff.channel.video[O.state.curVidIdx].videoId
                            });
                        });

                        //											O.data.extrn.cfgArgs.userEventHandler("done", dta);

                    };
                Public.UIevents = UIevents;

            };
        })();


        // entry point

        O.init = function (inCfg) {
            // parseXML is built into jQ 1.5+
            if (typeof $.parseXML !== "function") {
                $.parseXML = O.Util.parseXML;
		console.log('typeof $.parseXML');		
            }

            if (!SNI.Config.DEBUG || !SNI.Config.DEBUG.log) {
                console.log = function () {
                    return;
                };
            } else if ( !! SNI.Config.DEBUG && SNI.Config.DEBUG.log === "server") {
                $.get("", {
                    msg: window.navigator.userAgent + " : log started",
                    mode: 'w'
                });
                console.log = function (x) {
                    $.get("", {
                        msg: window.navigator.userAgent + " : " + x
                    });
                };
            }

            console.log(inCfg);
		
            O.StartUp.Controller.init();
            O.StartUp.Tasks.prepCfgArgsState(inCfg);

            // move out:
            if (/safari/i.test(window.navigator.userAgent)) {
                O.state.adMediaFmt = "mp4";
            } else if (/firefox/i.test(window.navigator.userAgent)) {
                O.state.adMediaFmt = "ogg";
            }

            // config files: general and styles--assuming one of each, may need to change
            O.state.configStyles = O.state.configFiles.filter(function (v) {
                return /-style/.test(v);
            })[0];
            O.state.configGenl = O.state.configFiles.filter(function (v) {
                return !/-style/.test(v);
            })[0];

            SNI.Player.doLoadPlaylist = O.setPlaylist;

            $(O).trigger("initialLoad");

        };

        O.initPlay = function () {
            console.log("Ready to Play!!");
            O.Analytics.init();
            SNI.Player.loadPlaylist = O.loadNewChannel;
            O.VPlayer.init();
            return;
        };

        // equivalent of SNAP Flash API call used by TVL to switch channels:
        O.setPlaylist = function (inChannelId, inChannelUrl, inTitle, inVideoId) {
            console.log("set playlist HTML5");
            O.state.videoId = !! inVideoId ? inVideoId : '';
            O.state.mode = '';
            console.log("setPlaylist: " + inChannelId + ' | ' + inChannelUrl + ' | ' + inTitle + ' | ' + inVideoId);
            if ( !! inChannelId && O.state.channelId != inChannelId) {
                O.state.channelId = inChannelId;
                O.state.channelUrl = inChannelUrl;
                $(O).trigger("loadNewPlaylist");
            } else {
                O.VPlayer.Playlist.findSelectedVid();
                O.VPlayer.Playlist.readyToPlayVid();
            }
            return;
        };


    };

})(jQuery);


SNI.Player.getEmbed = function (videoId, width, height) {

    var flashEmbed = "",
        htmlEmbed = "",
        allEmbed = "";
    var channelurl = SNI.Player.getPlaylistUrl(videoId + "-VIDEO");
    var html5templ = "embedplayer.html";

    flashEmbed += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
    flashEmbed += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0"';
    flashEmbed += ' width="' + width + '" height="' + height + '">';
    flashEmbed += '<param name="movie" value="';
    flashEmbed += SNI.Config.snapBinaryEmbed + '?channelurl=' + encodeURIComponent(channelurl) + "&channel=" + videoId + '"/>';
    flashEmbed += '<param name="allowFullScreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="bgcolor" value="#FFFFFF"/>';
    flashEmbed += '<embed src="';
    flashEmbed += SNI.Config.snapBinaryEmbed + '?channelurl=' + encodeURIComponent(channelurl) + "&channel=" + videoId + '"';
    flashEmbed += ' type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" bgcolor="#FFFFFF"';
    flashEmbed += ' width="' + width + '" height="' + height + '"/>';
    flashEmbed += '</object>';

    if (SNI.Config.snapEnableHTML5) {
        htmlEmbed += '<iframe';
        htmlEmbed += ' width="' + width + '" height="' + height + '"';
        htmlEmbed += ' src="' + html5templ;
        htmlEmbed += '?width=' + width + '&height=' + height + ' ' + '&channelurl=' + encodeURIComponent(channelurl) + '">';
        htmlEmbed += '</iframe>';
    }

    if (!SNI.Config.snapEnableHTML5) {
        return flashEmbed;
    } else {
        allEmbed += '<script type="text/javascript">if (/iphone|ipad|ipod/i.test(window.navigator.platform)) {'
        allEmbed += "document.write('" + htmlEmbed + "');";
        allEmbed += '} else {';
        allEmbed += "document.write('" + flashEmbed + "')";
        allEmbed += '}';
        allEmbed += '</script>';
        return allEmbed;
    }

};