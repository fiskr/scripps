(function($) {
	var pageState = "details",
	$article = $('article'),
	userDetails = '',
	detailAttempt = 0,
	confirmSent = false,
	origTitle = mdManager.getParameter('title'),
	handleSubmissionValues = function(eventName, payload) {
		//  var submissionValues = payload.submissionValues;
	},
	handleUserDetails = function(eventName, payload) {
		userDetails = payload.userDetails.dateOfBirth.year + "|";
		userDetails += payload.userDetails.gender === "Male" ? "m" : "f";  
		userDetails += "|" + payload.userDetails.cableProvider;
	},
	handleUid = function(eventName, payload) {
		//var uid = payload.uid;
	},
	logPageview = function(eventName, payload) {
		var state = eventName.split(":").pop(),
		uId=mdManager.getUniqueId().split("|");
		if ( state  === "confirmation" ) {
				mdManager.setParameter("Sweepstakes","SweepsThankYou");
				// if we don't have details yet try again in a little while
				if ( !userDetails && detailAttempt < 2 ) {
					// only try twice
					detailAttempt++;
					setTimeout(function(){
							logPageview(eventName, payload);
						}, 200);
					return;
				}
		}
		uId.pop();
		uId.push(state);
		if ( state !== pageState ) {
			pageState = state;
			mdManager.setParameter("uniqueID",uId.join("|"));
			mdManager.setParameter("title", origTitle + " - " + pageState);
			if (CQ_Analytics.Sitecatalyst) {
				CQ_Analytics.Sitecatalyst.collect();
				CQ_Analytics.Sitecatalyst.events=[];
				CQ_Analytics.Sitecatalyst.updateEvars();
				if(typeof s === "object"){
					// if this is the confirmation page add the demo data and entry event
					if ( !confirmSent && state  === "confirmation" && s.events.indexOf("event34") === -1) {
						s.events=s.apl(s.events,"event34",",",2);
						s.linkTrackVars = 'eVar36';
						s.eVar36 = userDetails;
						s.linkTrackEvents=s.events;
						confirmSent = true;
					}
					s.t();
				}
				CQ_Analytics.Sitecatalyst.events=[];
				if(typeof t === "object" && t.loadTagContainer){
					t.loadTagContainer();
				}
			}
			// make sure the bigbox is in the viewport
			if ( $article.length > 0 && $(window).scrollTop() > $article.position().top + 10 ) {
				$(window).scrollTop($article.position().top);
			}	
			refreshAds();
		}
	},
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
			if(CQ_Analytics.Sitecatalyst) {
				CQ_Analytics.Sitecatalyst.collect();
				CQ_Analytics.Sitecatalyst.events=[];
				CQ_Analytics.Sitecatalyst.updateEvars();
				if(typeof s === "object"){
					s.linkTrackVars = 'eVar16,eVar17,eVar18,eVar19,prop18';
					s.linkTrackEvents = "";
					s.eVar16 = "food:" + module;
					s.eVar17 = "food:" + module + ":" + pageState;
					s.prop18 = "food:" + module + ":" + s.pageName;
					s.eVar18 = "food:" + module + ":" + eName;
					s.eVar19 = "food:" + module + ":#";
					s.tl(this, 'o', 'logEvent ' + eName);
					// reset eVars and props
					s.linkTrackVars = '';
					s.eVar19 = "";
					s.eVar18 = "";
					s.eVar18 = "";
					s.eVar17 = "";
					s.eVar16 = "";
				}
			} 
	},
	refreshAds = function(eventName, payload) {
		setDartEnterpriseBanner("BIGBOX",getDartEnterpriseUrl("BIGBOX",5));
	},
	// Vars and functions for DTM Form Abandonment support
	allowAbndnTrack = false,
	lastElement = mdManager.getParameter('sponsorship') + "|none",
	delay = function(ms) {
			var start = +new Date();
			while ((+new Date() - start) < ms){}
	},
	addIEFriendlyEventListener = function(evnt, elem, func) {
		if (elem.addEventListener)  // W3C DOM
			elem.addEventListener(evnt,func,false);
		else if (elem.attachEvent) { // IE DOM
			elem.attachEvent("on"+evnt, func);
		} else { // No much to do
			elem[evnt] = func;
		}
	};
	
	NGX.Embed.registerEventHandler('state:entry', logPageview); 
	NGX.Embed.registerEventHandler('state:details', logPageview); 
	NGX.Embed.registerEventHandler('state:entry_detail', logPageview); 
	NGX.Embed.registerEventHandler('flow:after', logPageview); 
	NGX.Embed.registerEventHandler('state:confirmation', logPageview); 
	NGX.Embed.registerEventHandler('state:rules', logPageview);
	NGX.Embed.registerEventHandler('user:details', handleUserDetails); 
	NGX.Embed.registerEventHandler('action:share:campaign:pinterest',logEvent);
	NGX.Embed.registerEventHandler('action:share:campaign:facebook',logEvent);
	NGX.Embed.registerEventHandler('action:share:campaign:twitter',logEvent);
	NGX.Embed.registerEventHandler('action:invite',logEvent);
	
	// Listner for the DTM form abandonment tracking
	addIEFriendlyEventListener( "message", window, function(event){
		var evArray;
		if ( typeof event.data === "string" ) {
		//record the last element
			if ( event.data.match(/last_element/) ) {
				evArray = event.data.split(":",2);
				allowAbndnTrack = true;
				lastElement = mdManager.getParameter('sponsorship') + "|" + evArray[1];
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
			s.linkTrackVars = "eVar50,events";
			s.linkTrackEvents = "event85";
			s.eVar50 = lastElement;
			s.events="event85";
			s.tl(event, 'o', 'abandonned sweeps entry');
			delay(200); //give the analytics call time to go out
		}
	});	

})(jQuery);