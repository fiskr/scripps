(function($){
    $(function(){
        var HWDomElems = {
                'states' : '.hello-world-state' ,
                'loader' : 'img.hello-world-loaderimg'
            },
            
            HWSweepsCfg = {
                //urban oasis main sweeps
                
                'docReady' : function() {
                    //if I've got the main loader image (responsible for pushing down content that we don't want visible while the js runs)
                    if(document.getElementsByClassName('hw-main-loaderimg').length > 0){
                        //kill the main loader image
                        $('.hw-main-loaderimg').hide();
                    }
                    
                },
                'states': {
                    //email entry form
                    'login' : {
                        'enter' : function( state ) {
                            //showMobileAdhesionBanner(false);
                            //iosFix();
                            //$( '.hello-world-states > iframe' ).css( 'position', 'static' );    //TODO: integrate into hw-states.js
                        },
                        'omniture' : {
                            'page_num' : 1,
                            'report_title' : 'Email Entry',
                            'mdm_override' : {
                                'Sweepstakes' : 'SweepsLogin'
                            }
                        }
                    },

                    'register' : {  //entry form
                        'enter' : function(){
                        },
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
                        'enter' : function(){
                        },
                        'omniture' : {
                            'page_num' : 3,
                            'report_title' : 'Thanks',
                            'mdm_override' : {
                                'Sweepstakes' : 'SweepsThankYou',
                                'Sponsorship' : 'HG_TP_DREAM_HOME_SWEEPS_THANKS'
                            }
                        }
                    },

                    //'too soon' msg
                    'limiter' : {
                        'enter' : function(){
                        },
                        'omniture' : {
                            'page_num' : 4,
                            'report_title' : 'Too Soon',
                            'mdm_override' : {
                                'Sweepstakes' : 'SweepsTooSoon'
                            }
                        }
                    },

                    'default' : {   // known states that will use this:  fatal, prelaunch, expired, maintenance, ineligible_age
                        'enter' : function(){
                        },
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
                        'enter' : function(){
                            //showMobileAdhesionBanner(true);
                        },
                        'omniture' : {
                            'page_num' : 6,
                            'report_title' : 'Ineligible Age'
                        }
                    },
                    
                    'maintenance' : {
                        'enter' : function(){
                            //showMobileAdhesionBanner(true);
                        },
                        'omniture' : {
                            'page_num' : 7,
                            'report_title' : 'Maintenance'
                        }
                    },
                    
                    'expired' : {
                        'enter' : function(){
                            //showMobileAdhesionBanner(true);
                        },
                        'omniture' : {
                            'page_num' : 8,
                            'report_title' : 'Expired'
                        }
                    },

                    'optin' : {
                        'enter' : function(){
                            //showMobileAdhesionBanner(true);
                        },
                        'omniture' : {
                            'page_num' : 9,
                            'report_title' : 'Opt-Ins',
                            'mdm_override' : {
                                'Sweepstakes' : 'SweepsOops'
                            }
                        }
                    },

                    //registration error - 
                    'register_error':{
                        'enter' : function(){
                            //showMobileAdhesionBanner(true);
                        },
                        //'enter' : function( state ) { window.scroll(0,0); },
                        'omniture' : {
                            'page_num' : 10,
                            'report_title' : 'Register Error',
                            'mdm_override' : {
                                'Sweepstakes' : 'SweepsFullEntryError'
                            }
                        }
                    },

                    'prelaunch' : {},
                    
                    'loading' : {}
                }
            };

        if ( SNI.TP.Sweeps.HelloWorld.init( HWDomElems, HWSweepsCfg ) ) {
            
            //omniture requirements from HSP-1176
            var allowAbndnTrack = false,
                lastElement = mdManager.getParameter('sponsorship') + "|none",
                addEvent = function (evnt, elem, func) { 
                    if (elem.addEventListener) { // W3C DOM 
                        elem.addEventListener(evnt,func,false); 
                    } else if (elem.attachEvent) { // IE DOM 
                        elem.attachEvent("on"+evnt, func); 
                    } else { // No much to do 
                        elem[evnt] = func; 
                    } 
                }, 
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
            addEvent( "message", window, function(event){
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
                if (event.data.match(/block_abandon/)) {
                    allowAbndnTrack = false;
                    setTimeout(function() {
                        // reset this flag (scenario: failed validation)
                        if (SNI.TP.Sweeps.HelloWorld.currentState !== 'reg_thanks') {
                            allowAbndnTrack = true;
                        }
                    }, 2500); //was 1000, increased time to avoid race
                }
            }, false);
            

            $(function() {
                $('.sponsor-pod .bd ul.list').css('margin-left', '106px');
            });
        }
    });
})( jQuery );