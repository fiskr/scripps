/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w ){
    
    // Enable strict mode
    "use strict";

    w.picturefill = function() {
	var imgBase = 'http://hgtv.sndimg.com/HGTV/2013/03/14/mobile_loading-image_4x3',
	imgEnd = 'gif',
	imgSizes = ['_lg.',  '_lead.', '_al.', '_med.', '_tz.', '_sm.', '_400x300.', '_160x120.'];
    
    //create map so we can map video images to one of the placeholders
    var imgSizeMap = {}; 
    imgSizeMap['_lg.']='_lg.'; imgSizeMap['_lead.']='_lead.';imgSizeMap['_al.']='_al.';
    imgSizeMap['_med.']='_med.';imgSizeMap['_tz.']='_tz.';imgSizeMap['_sm.']='_sm.';
    imgSizeMap['_400x300.']='_lead.';
    imgSizeMap['_160x120.']='_med.';

        var ps = w.document.getElementsByTagName( 'div' );
        
        // Loop the pictures
        for( var i = 0, il = ps.length; i < il; i++ ) {
            if( ps[ i ].getAttribute( 'data-picture' ) !== null ){

                var sources = ps[ i ].getElementsByTagName( 'div' ),
                matches = [];
		
                // See if which sources match
                for( var j = 0, jl = sources.length; j < jl; j++ ){
                    var media = sources[ j ].getAttribute( 'data-media' );
                    // if there's no media specified, OR w.matchMedia is supported 
                    if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
                        matches.push( sources[ j ] );
                    }
                }

		// Find any existing img element in the picture element
		var picImg = ps[ i ].getElementsByTagName( 'img' )[ 0 ];

		if( matches.length ){           
            if( !picImg ){
               picImg = w.document.createElement( "img" );
               picImg.alt = ps[ i ].getAttribute( "data-alt" );
               ps[ i ].appendChild( picImg );
            }
                    
		    var dataSrc = matches.pop().dataset.src;
            if (picImg.src === ""){
    		    for ( var k=0; k<imgSizes.length; k++ ) {
        			if ( dataSrc.indexOf( imgSizes[k] ) !== -1 ) {
        			    picImg.src = imgBase + imgSizeMap[ imgSizes[k] ] + imgEnd;
        			}
    		    }
            picImg.dataset.src = dataSrc;
            }
		}
		else if( picImg ){
                    ps[ i ].removeChild( picImg );
		}
            }
        }
	//HGTV.M.lazyLoadCallback();	
    };
    
    // Run on resize and domready (w.load as a fallback)
    if( w.addEventListener ){
        //w.addEventListener( 'resize', w.picturefill, false );
        w.addEventListener( 'DOMContentLoaded', function(){
            w.picturefill();
            // Run once only
            w.removeEventListener( 'load', w.picturefill, false );
        }, false );
        w.addEventListener( 'load', w.picturefill, false );
    }
    else if( w.attachEvent ){
        w.attachEvent( 'onload', w.picturefill );
    }
    
}( this ));
