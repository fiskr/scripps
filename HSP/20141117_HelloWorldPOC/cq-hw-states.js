(function( $ ){

/* depends on jQuery ( v1.4.2+ ) as $, and iframeResizer.js from Hello World, and of course, mdManager/adManager/Omniture's object 's' */

if ( !window.console ) { window.console = { log : function() {} }; }

SNI.TP = SNI.TP || {};
SNI.TP.Sweeps = SNI.TP.Sweeps || {};

SNI.TP.isIE = function ( version ) {
    var result,
        regex = /MSIE ([0-9]*)\./ig;

    while ( result = regex.exec( navigator.userAgent ) ) {
        if ( version && ( Number( result[1] ) === Number( version ) ) ) {
            return true;
        } else {
            if ( !version && ( result && result[1] ) ) {
                return Number( result[1] );
            } else {
            	return false;
            }
        }
    }
    return false;
};
SNI.TP.addEventListener = function(evnt, elem, func) {
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem[evnt] = func;
   }
};

SNI.TP.Sweeps.HelloWorld = {
	"init" : function( domElems, config ) {
		var ieVersion	= SNI.TP.isIE(),
			HW			= SNI.TP.Sweeps.HelloWorld,
			ieMsg		= 'We&rsquo;re sorry, your browser, <strong>Internet Explorer version {version}</strong>, is not supported for this sweepstakes form. Please upgrade to the latest version of <a href="http://www.google.com/chrome" target="_blank">Chrome</a>, <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer</a>, <a href="http://www.apple.com/safari/" target="_blank">Safari</a>, or <a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank">Firefox</a>',
			detId = mdManager.getParameter( 'DetailId' );
		
		if ( HW.inited ) {
			console.log( 'Hello World states already initialized! Why you initialize again?' );
			return true;
		}
		

		//DEPRECATED - 
		//this no longer uses the detail ID to setup the config, 
		//this is only here in case someone forgets this and uses this script for an old init.
		if ( config[detId] ) {
			config = config[detId];
		} else {
			if ( (window.location.host.indexOf( 'staging' ) !== -1) || (window.location.host.indexOf( 'qa' ) !== -1)) {
				for ( var key in config ) {
					if ( config[key]['stagingDetailId'] && ( config[key]['stagingDetailId'] == detId ) ) {
						config = config[key];
						break;
					}
				}
			}
		}
		//</DEPRECATED>
		
		if ( !config || !config.states || !domElems || !domElems.states || ( domElems.states.length === 0 ) ) {
			console.log("Config?: ", config, "\tConfig States?: ", config.states, "\tdomElems?: ", domElems, "\tdomElems.states?: ", domElems.states, "\tdomElems.states.length?: ", domElems.states.length );
			console.log( "This page hasn't been properly configured as a Hello World sweeps page." );
			return false;
		}
		
		HW.origTitle	= mdManager.getParameter( 'Title' );
		HW.origType		= mdManager.getParameter( 'Type' );
		HW.statesCfg	= config.states;
		HW.domElems		= domElems;
		
		HW.setMetaData( HW.getDefaultState() );
		HW.inited = true;
		
		$( function() {
			$.each( HW.domElems, function( key, value ){
				HW.domElems[key] = $( HW.domElems[key] );
			} );
			
			HW.domElems.iframe = HW.domElems.states.find( 'iframe' ).closest( HW.domElems.states.selector );
			
			HW.domElems.states.hide();
			HW.domElems.loader.hide();
			
			if ( ieVersion && ( ieVersion <= 8 ) ) {
				
				ieMsg = '<div class="msg-error-browser-not-supported">' + ieMsg + '</div>';
				HW.setDefaultState();
				HW.domElems.iframe.hide().before( ieMsg.replace( '{version}', ieVersion ) );
				
			} else {
				
				iFrameResize( {
					'log'                     : false,
					'enablePublicMethods'     : true,
					'resizedCallback'         : function( messageData ){
						console.log( 'iframe resized to: ' + messageData.width + 'x' + messageData.height );
						HW.setState( messageData.page );
					}
				} );
				
				HW.setDefaultState();
				
			}
			if ( config.docReady && ( typeof config.docReady === "function" ) ) {
				config.docReady();
			}
				
		} );
		return true;
	},
	"setState" : function( state ) {
		console.log('setState started');
		var catchall	= 'default',
			reg_err  	= 'register_error',
			HW			= SNI.TP.Sweeps.HelloWorld,
			cfg			= HW.statesCfg[state],
			states		= HW.domElems.states,
			scroll			= $( window ).scrollTop();
		console.table(states);
		if ( !cfg ) {
			console.warn( 'State "' + state + '" has not been configured...' );
			if ( HW.statesCfg[ catchall ] ) {
				console.log( 'Using ' + catchall + ' state.' );
				state = catchall;
				cfg = HW.statesCfg[state];
			} else {
				console.error('HW-STATES: There is no catchall/default state...')
				return;
			}
		}
		
		//don't set status when it's not actually changing, unless it's the catchall (error) state or the register_error state
		if ( ( state !== catchall && state!== reg_err ) && HW.currentState && ( HW.currentState === state ) ) {
			return;
		}
		
		if ( cfg.leave && ( typeof cfg.leave === "function" ) ) {
			cfg.leave.call( this, state );
		}
		
		if ( ( state !== HW.getDefaultState() ) && scroll && ( scroll > 0 ) ) {
			if(state === reg_err){
				
				var off = $('h2.bc14-title').offset() ? $('h2.bc14-title').offset().top : '0px';
				$('html, body').animate({scrollTop: off},1000);

			} else{
				$( window ).scrollTop( 0 );
			}
		}
		
		( function() {

			cfg.hide = ( ( typeof cfg.hide === "string" ) ? $( cfg.hide ) : cfg.hide ) || states;
			cfg.show = ( ( typeof cfg.show === "string" ) ? $( cfg.show ) : cfg.show ) || states.filter( '.' + state );
		
			if ( cfg.hide && ( cfg.hide.length > 0 ) && ( typeof cfg.hide.hide === "function" ) ) {
				cfg.hide.hide();
			}
			if ( cfg.show && ( cfg.show.length > 0 ) && ( typeof cfg.show.show === "function" ) ) {
				cfg.show.show().css( 'visibility', 'visible' );
			}
			HW.domElems.loader.hide();
		} )();
		
		if ( cfg.enter && ( typeof cfg.enter === "function" ) ) {
			cfg.enter.call( this, state );
		}
		
		HW.currentState = state;
		console.log( 'State changed to: ' + state );
		
		if ( cfg.omniture !== false ) {
			HW.pageView( state, catchall );
		}
	},
	"getDefaultState" : function() {
		var first,
			HW	= SNI.TP.Sweeps.HelloWorld,
			cfg	= HW.statesCfg;
			
		for ( first in cfg ) break;
		
		for( var key in cfg ) {
			if ( cfg[key]['default'] === true ) {
				return key;
			}
		}
		return first;
	},
	"setDefaultState" : function() {	
		var HW = SNI.TP.Sweeps.HelloWorld;
		HW.setState( HW.getDefaultState() );
	},
	"pageView" : function( state, catchall ) {
		
		var HW				= SNI.TP.Sweeps.HelloWorld,
			cfg				= HW.statesCfg[state].omniture,
			reg_err  		= 'register_error',
			defaultState	= HW.getDefaultState();
		
		if ( !cfg || !cfg.page_num ) { return; }
		
		HW.setMetaData( state );
		
		if ( state !== defaultState && state !== reg_err ) {
			
		    if (typeof s == "object") {
				s.t();
				console.log( 'pageView fired!' );
		    }
			
			HW.refreshAds();
		}
		return;
	},
	"setMetaData" : function( state ) {
		var mdm				= mdManager,
			HW				= SNI.TP.Sweeps.HelloWorld,
			cfg				= HW.statesCfg[state].omniture,
			origType		= HW.origType,
			origTitle		= HW.origTitle,
			uniq			= mdm.getParameter( 'Site' ) + '-' + origType + '-' + mdm.getParameter( 'DetailId' ) + '-' + cfg.page_num,
			titleSuffix		= ( cfg ) ? cfg.report_title || cfg.internal_state || state : '',
			title			= ( titleSuffix.length > 0 ) ? origTitle + ' - ' + titleSuffix : origTitle,
			omnitureParams	= {
				'Title'			: title,
				'UniqueId'		: uniq,
				'PageNumber'	: cfg.page_num,
				'Type'			: 'Sweepstakes'
			};
		
		omnitureParams = ( cfg.mdm_override ) ? $.extend( omnitureParams, cfg.mdm_override ) : omnitureParams;
		
		
	    //$.each( omnitureParams, function( key, value ){
		//	if ( typeof mdManager.getParameter( key ) == 'undefined' ) {
		//		mdManager.addParameter( key, value );
		//	} else {
		//		mdManager.setParameter( key, value );
		//	}
		//	if ( typeof adManager.getParameter( key ) == 'undefined' ) {
		//		adManager.addParameter( key, value );
		//	} else {
		//		adManager.setParameter( key, value );
		//	}
	    //} );
	},
	"refreshAds" : function() {
		var now = new Date(),
			ad_ord = now.getTime() % 10000000000;
			
		//adManager.setParameter( 'ord', ad_ord );
		
		if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test( navigator.userAgent ) ) {
			SniAds.refreshSlot('dfp_smartphone_banner');
		} else {
			SniAds.refreshSlot('dfp_leaderboard');
			SniAds.refreshSlot('dfp_bigbox');
		}
		
	}
};


})( jQuery );