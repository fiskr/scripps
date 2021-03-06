(function($) {

var currentSweeps = ( $( '.sh14-sweeps' ).length > 0 ),
	
	//this should be done more elegantly when time allows...
	iosFix = function() {
		if ( /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test( navigator.userAgent ) ) {
			$( '.hello-world-states > .state.registration iframe' ).css( { 'width' : $( '.hello-world-states > .state' ).width() + 'px' } );
		}
	},
	
	
	HWDomElems = {
		'states' : '.hello-world-states > .state' ,
		'loader' : '.hello-world-states img.loaderimg'
	},
	
	HWSweepsCfg = {
		//smart Home 2014 sweeps
		108446 : { //DetailID
		
			'stagingDetailId' : 108334,
			
			'states': {
				//email entry form
				'login' : {
					'enter' : function( state ) { iosFix(); $( '.hello-world-states > .state.registration iframe' ).css( 'position', 'static' ); },
					'omniture' : {
						'page_num' : 1,
						'report_title' : 'Email Entry',
						'mdm_override' : {
							'Sweepstakes' : 'SweepsLogin'
						}
					}
				},

				'registration' : {  //entry form
					'omniture' : {
						'page_num' : 2,
						'report_title' : 'Entry Form',
						'mdm_override' : {
							'Sweepstakes' : 'SweepsFullEntry'
						}
					}
				},

				//thanks
				'reg_thanks' : {
					//'default' : true,
					'omniture' : {
						'page_num' : 3,
						'report_title' : 'Thanks',
						'mdm_override' : {
							'Sweepstakes' : 'SweepsThankYou'
						}
					},
					'enter' : function() {

						// params: (playerid, channelid)
						// player id needs to be unique for this page and match the div id above
						var snap = new SNI.HGRM.Player.FullSize('vplayer-1', '81021', '', '', {enableSyncAdFix: 0, dimensions: {width: 615, height: 567}, flashvars: { autoplay: true }});
					
					}
				},

				//'too soon' msg
				'limiter' : {
					'omniture' : {
						'page_num' : 4,
						'report_title' : 'Too Soon',
						'mdm_override' : {
							'Sweepstakes' : 'SweepsTooSoon'
						}
					},
					'enter' : function() {

						// params: (playerid, channelid)
						// player id needs to be unique for this page and match the div id above
						var snap = new SNI.HGRM.Player.FullSize('vplayer-1', '81021', '', '', {enableSyncAdFix: 0, dimensions: {width: 615, height: 567}, flashvars: { autoplay: true }});
					
					}
				},

				'prelaunch' : {},

				'default_catchall' : {	// known states that will use this:  fatal, prelaunch, expired, maintenance, ineligible_age
	
					'omniture' : {
						'page_num' : 5,
						'report_title' : 'Oops',
						'internal_state' : 'oops',
						'mdm_override' : {
							'Sweepstakes' : 'SweepsOops'
						}
					}
				},
				
				'ineligible_age' : {
					'omniture' : {
						'page_num' : 6,
						'report_title' : 'Ineligible Age'
					}
				},
				
				'maintenance' : {
					'omniture' : {
						'page_num' : 7,
						'report_title' : 'Maintenance'
					}
				}
			}
			
		}
	};
	

if ( SNI.HGTV && SNI.HGTV.tabHighlight ) {
	SNI.HGTV.tabHighlight();
}

if ( currentSweeps && SNI.TP.Sweeps.HelloWorld.init( HWDomElems, HWSweepsCfg ) ) {
	//omniture requirements from HSP-564 and HSP-569
	var allowAbndnTrack = false,
		lastElement = mdManager.getParameter('sponsorship') + "|none",
		delay = function(ms) {
			var start = +new Date();
			while ((+new Date() - start) < ms){}
		};
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
	SNI.TP.addEventListener( "message", window, function(event){
		var evArray;
		//track demographics for sweeps entry
		if ( event.data.match(/eVar36/) ) {
			evArray = event.data.split(":",2);
			s.linkTrackVars = 'eVar36';
			s.linkTrackEvents = '';
			s.events = '';
			s.eVar36 = evArray[1];
			s.tl(event, 'o', 'sweeps entry');
		}
		//record the last element
		if ( event.data.match(/last_elememt/) ) {
			evArray = event.data.split(":",2);
			allowAbndnTrack = true;
			lastElement = mdManager.getParameter('sponsorship') + "|" + evArray[1];
		}
		//received a message to block the form abandonment event (triggered by a submit)
		if ( event.data.match(/block_abandoned/) ) {
			allowAbndnTrack = false; 
			setTimeout(function() {
				// reset this flag (scenario: failed validation)
				allowAbndnTrack = true;
			},1000);
		}
	}, false);
	
	
	$( function() {
		//remove empty p tags created by CMA in Uber output
		$( HWDomElems.states ).find( 'p' ).each( function() {
			if ( !$( this ).text() ) {
				$( this ).remove();
			}
		} );
	} );
	
}

})(jQuery);