// Requirements: jQuery, EngageSciences NGX Object
// NGX script: https://display.engagesciences.com/ui/ngx.embed.min.js
// Full NGX script: https://display.engagesciences.com/ui/ngx.embed.js

// For the best tracking SweepsID should be set in the main document.
// Example...
// <script>
//      mdManager.setParameter("SweepsID","xCampaign#####");
// </script>
// This data will be set automatically as well but may not
// be available during the initial pageload unless set manually. 

SNI.EngageSweepsManager = SNI.EngageSweepsManager || {};


(function($) {
//    var pageState = "details",
//    $container = $('article'),

    var pageState = "",
    $container = $('isweep')

    confirmStates = ['confirmation'],
    isConfirmation = false, //this is to track whether the current state is thanks
    userDetails = '',
    userID = '',
    detailAttempt = 0,
    confirmSent = false,
//    origTitle = mdManager.getParameter('title'),
    origTitle = mdManager.getPageTitle(),
    sniSite = mdManager.getParameter('Site').toLowerCase(),
    thanksUrl = "",
    // handleSubmissionValues: NOT IN USE 
    handleSubmissionValues = function(eventName, payload) {
        //  var submissionValues = payload.submissionValues;
    },
    // handleUserDetails: User Demographics passed up from iframe
    handleUserDetails = function(eventName, payload) {
        console.log('EngageSciences: Handling user details, event: "' + eventName + '" and payload:.', payload);
        userDetails = payload.userDetails.dateOfBirth.year + "|";
        userDetails += payload.userDetails.gender.toLowerCase() === "male" ? "m" : "f";  
        userDetails += "|" + payload.userDetails.cableProvider;
        console.log('DOB: ' + payload.userDetails.dateOfBirth.year + ', Gender: ' + payload.userDetails.gender + ', cableProvider: ' + payload.userDetails.cableProvider);
    },
    // handleUid: User ID passed up from iframe
    handleUid = function(eventName, payload) {
        userID = payload.uid;
    },
    // handleSweepsId: Set mdManage Sweeps ID passed up from iframe
    handleSweepsId = function(eventName, payload) {
        if(typeof payload.campaignId !== 'undefined'){
            
//            mdManager.setParameter("SweepsID", payload.campaignId);
            if ( !mdManager.getParameter("SweepsID") ) {
                mdManager.addParameter("SweepsID", payload.campaignId);
            }


            var id = mdManager.getParameter("SweepsID");
            console.log('Set SweepsID: ' + id);
        }else{
            console.error('EngageSciences: SweepsID is not being passed in the payload with attribute name of "campaignId".');
            var site = mdManager.getParameter("site");
            switch(site){
                case 'DIY' :
                    mdManager.setParameter("SweepsID", '20649');
                    break;
                case 'HGTV' :
                    mdManager.setParameter("SweepsID", '20645');
                    break;
                case 'HGRM' :
                    mdManager.setParameter("SweepsID", '20647');
                    break;
            }
            var id = mdManager.getParameter("SweepsID");
            console.log('Defaulted SweepsID to "' + id + '"');
        }
        

    },
    // stateUpdate: update state related variables, log pageview, refresh ads, trigger special handling on confirmation
    stateUpdate = function(eventName, payload) {
        console.log('EngageSciences: State changed to "'+ eventName +'"');
        var state = eventName.split(":").pop(),
        uId=mdManager.getUniqueId().split("|");
        if ( confirmStates.indexOf(state) > -1 ) {
            if(typeof allowAbndnTrack !== 'undefined'){
                allowAbndnTrack = false;
            }else{
                console.error('EngageSciences: Allow Abandon Track is undefined: "' + allowAbndnTrack + '", ');
            }
            // if we don't have user details yet try again in a little while
            if ( !userDetails && detailAttempt < 2 ) {
                console.error('EngageSciences: userDetails is not set: "' + userDetails + '", # of times attempted: ' + detailAttempt);
                // only try twice more
                detailAttempt++;
                setTimeout(function(){
                    stateUpdate(eventName, payload);
                }, 200);
                return;
            }
            confirmationView(true);   
        } else {
            confirmationView(false);
        }
        if( uId.length > 1 ) {
            uId.pop();
        }
        uId.push(state);

        if ( !pageState ) {
            pageState = state;
            $container.addClass(state);
        }

        if ( state !== pageState ) {
            $container.addClass('state');
            $container.removeClass('pageState');
            pageState = state;
//            mdManager.setParameter("uniqueID",uId.join("|"));
//            mdManager.setParameter("title", origTitle + " - " + pageState);

            s.prop9 = uId.join("|");
            s.prop6 = origTitle + " - " + pageState;

            if(typeof s === "object"){
//                s.events="";
                s.events=s.apl(s.events,"event1",",",2);

                s.linkTrackVars = 'eVar75';
                s.eVar75 = mdManager.getParameterString("SweepsID");
                // if this is the confirmation page add the demo data and entry event
                if ( !confirmSent && confirmStates.indexOf(state) > -1  && s.events.indexOf("event34") === -1) {
                    s.events=s.apl(s.events,"event34",",",2);
                    s.linkTrackVars = 'eVar36,eVar10,prop32,eVar75';
                    s.eVar36 = userDetails;
                    s.eVar10 = s.prop32 = userID;
                    s.linkTrackEvents=s.events;
                    confirmSent = true;
                }       
                
                s.prop6=origTitle + " - " + pageState;
                s.prop9=uId.join("|");
                
                s.t();
                s.events="";
            }
            // make sure the bigbox is in the viewport
            if ( $container.length > 0 && $(window).scrollTop() > $container.position().top + 10 ) {
                $(window).scrollTop($container.position().top);
            }
            refreshAds();
        }
    },
    // Sends a custom link event with module click tracking data - this does not increment a pageview
    logEvent = function(eventName, payload) {
            var module = "sweeps_social", 
            eName = eventName.split(":").pop();
            switch ( eventName ) {
                case "action:invite":
                    module = "invite";
                break;
                case "state:rules":
                    module = "sweeps_nav";
                break;      
            }
            if(typeof s === "object"){
                s.linkTrackVars = 'eVar16,eVar17,eVar18,eVar19,prop18,eVar75';
                s.linkTrackEvents = "";
                s.eVar16 = sniSite + ":" + module;
                s.eVar17 = sniSite + ":" + module + ":" + pageState;
                s.prop18 = sniSite + ":" + module + ":" + s.pageName;
                s.eVar18 = sniSite + ":" + module + ":" + eName;
                s.eVar19 = sniSite + ":" + module + ":#";
                s.eVar75 = mdManager.getParameterString("SweepsID");
                s.tl(this, 'o', 'logEvent ' + eName);
                // reset eVars and props
                s.linkTrackVars = '';
                s.eVar19 = "";
                s.eVar18 = "";
                s.eVar18 = "";
                s.eVar17 = "";
                s.eVar16 = "";
            }
    },
    // Update the Ads on pageview
    refreshAds = function() {
        setDartEnterpriseBanner("BIGBOX",getDartEnterpriseUrl("BIGBOX",5));
        //setDartEnterpriseBanner( 'LEADERBOARD', getDartEnterpriseUrl( 'LEADERBOARD', 1 ) ); 
    },
    // play a Video (usually on the Confirmation page)
    playVideo = function(channelID, autoPlay, site) {

        if(!(typeof site === 'string')){
            var site = mdManager.getParameter('Site');
        }
        if(!(typeof autoPlay === 'boolean')){
            console.error('Engage Sciences: playVideo(): invalid autoplay value: \'' + autoPlay + '\', should be boolean; defaults to false.');
            autoPlay = false;
        }
        if(!(typeof channelID === 'number')){
            console.error('Engage Sciences: playVideo(): invalid channel ID: \'' + channelID + '\', should be number.');
        }else{
            if (site === 'GAC' && autoPlay === false){
                SNI.GAC.Player.Package('video-player', channelID);
            } else {
               if(!snap && SNI[site] && SNI[site].Player && SNI[site].Player.FullSize){
                    var snap = new SNI[site].Player.FullSize('vplayer-1', channelID, '', '', {enableSyncAdFix: 1, dimensions: {width: 576, height: 567}, flashvars: { autoplay: autoPlay }});
                    console.log('Video player has been init');
                }else{
                    console.error('Engage Sciences: playVideo(): SNAP Fullsize Player doesn\'t exist: \'SNI.' + site + '\'.');
            }
            }
            
        }
    },
    // trigger view for Confirmation page
    confirmationView = function(isThanks) {
        console.log('confirmationView has been triggered')
        isConfirmation ? false : isThanks; // if current state is confirmation it will go back to false, otherwise it will 
        $('#confirmation-content').toggle(isThanks);
        if(isThanks){
            //replace the banner with a shorter banner - to pull the video up
            $('h1.stubby-banner').css('background-image', 'url("http://images.gactv.com/packages/2014/outdoor-sweeps/images/stubby-banner.jpg")');  
            //$('h1.stubby-banner').height('75px');
            $('.header').height('75px'); 
            //init the video
            switch (mdManager.getParameter('Site')){
                case 'GAC':
                    playVideo(84702, false);
                    break;
            }
        }
    },
    // Vars and functions for DTM Form Abandonment support
    allowAbndnTrack = false,
    // Set default value for last form element touched
    lastElement = mdManager.getParameter('SweepsID') + "|none",
    // Blocking function to allow abandonment tracking to go out
    delay = function(ms) {
            var start = +new Date();
            while ((+new Date() - start) < ms){}
    },
    // IE Friendly eventListener wrapper
    addIEFriendlyEventListener = function(evnt, elem, func) {
        if (elem.addEventListener)  // W3C DOM
            elem.addEventListener(evnt,func,false);
        else if (elem.attachEvent) { // IE DOM
            elem.attachEvent("on"+evnt, func);
        } else { // No much to do
            elem[evnt] = func;
        }
    };
    
    //-------------------------------------------------
    // Public methods 
    //-------------------------------------------------
    // SNI.EngageSweepsManager.setContainer:
    // * Accepts a valid jQuery selector
    // * Sets the container used for scrolling to top of page. 
    // * A selector that will place the Big Box ad within the 
    //   viewport vertically should be used. 
    SNI.EngageSweepsManager.setContainer = function(selector) {
        $container = $(selector);
    };
    // SNI.EngageSweepsManager.setConfirmStates:
    // * Accepts an array of strings
    // * Sets the locol confirmStates array
    // * Any values in this array that match a state message from the
    //   iframe will trigger confirmation page behavior
    SNI.EngageSweepsManager.setConfirmStates = function(stateArray) {
        confirmStates = stateArray.slice();
    };
    // SNI.EngageSweepsManager.setThanksURL:
    // * Accepts a URL string
    // * Set thanksUrl to the value passed in
    // * It thanksUrl is set the page will redirect after receiving the confirmation state update
    SNI.EngageSweepsManager.setThanksURL = function(url) {
        thanksUrl = url;
    };
    //-------------------------------------------------
    // End Public methods 
    //-------------------------------------------------
    
    // Attach Engage Sciences event handlers
    // Note: We need to make sure an eventHandler is set up for every 
    //      potential state. This is not ideal. We would prefer general
    //      handler that indicated specifics in the event payload.  
    NGX.Embed.registerEventHandler('state:entry', stateUpdate); 
    NGX.Embed.registerEventHandler('state:details', stateUpdate); 
    NGX.Embed.registerEventHandler('state:entry_detail', stateUpdate); 
    NGX.Embed.registerEventHandler('flow:after', stateUpdate); 
    NGX.Embed.registerEventHandler('state:confirmation',stateUpdate); 
    NGX.Embed.registerEventHandler('state:rules', stateUpdate);
    NGX.Embed.registerEventHandler('state:prizes', stateUpdate);
    NGX.Embed.registerEventHandler('user:details', handleUserDetails);
    NGX.Embed.registerEventHandler('page:loaded:confirmation', handleUid); 
    NGX.Embed.registerEventHandler('action:share:campaign:pinterest',logEvent);
    NGX.Embed.registerEventHandler('action:share:campaign:facebook',logEvent);
    NGX.Embed.registerEventHandler('action:share:campaign:twitter',logEvent);
    NGX.Embed.registerEventHandler('action:invite',logEvent);
    NGX.Embed.registerEventHandler('form:returninguser:unknownuser', stateUpdate); // first time to entry form state
    NGX.Embed.registerEventHandler('campaign:id', handleSweepsId); // to get the SweepsID, they send payload.campaignId through this state

    // Listner for the DTM form abandonment tracking
    addIEFriendlyEventListener( "message", window, function(event){
        var evArray;
        if ( typeof event.data === "string" ) {
        //record the last element
            if ( event.data.match(/last_element/) ) {
                evArray = event.data.split(":",2);
                allowAbndnTrack = true;
                lastElement = mdManager.getParameter('SweepsID') + "|" + evArray[1];
            }
            //received a message to block the form abandonment event (triggered by a submit)
            if ( event.data.match(/block_abandon/) ) {
                allowAbndnTrack = false; 
                setTimeout(function() {
                    // reset this flag (scenario: failed validation)
                    if ( pageState === "entry" || pageState === "after" ) {
                        allowAbndnTrack = true;
                    }
                },2500);
            }
        }
    }, false);
    
    // Bind to beforeunload to track form abandonment
    $(window).bind('beforeunload',function(event){
        // allowAbndnTrack should be false if there was a submit
        if ( allowAbndnTrack ) {
            allowAbndnTrack = false;
            s.linkTrackVars = "eVar50,eVar75,events";
            s.eVar75 = mdManager.getParameterString("SweepsID");
            s.linkTrackEvents = "event85";
            s.eVar50 = lastElement;
            s.events="event85";
            s.tl(event, 'o', 'abandonned sweeps entry');
            delay(200); //give the analytics call time to go out
        }
    }); 

})(jQuery);