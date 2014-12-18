/*
	SNI.HGTV.imageSpot
		options
			
*/
;(function( window, undefined ) {

$.fn.imageSpot = function( options ) {  

	var $this	= $( this ),
		options = $.extend({
			size			: '50%',
			elementOptions	: $.parseJSON( $this.attr( 'data-options' ) )
		}, options);
	
	if ( options.elementOptions && typeof options.elementOptions === 'object' ) {
		options = $.extend({
			left					: '0px',
			top						: '0px'
		}, options );
		$this.css({
			'left'						: options.left,
			'top'						: options.top
		});
	}
	
	function animateHotSpot( options ) {
		var options = $.extend({
				element		: null,
				/* size (width) to animate to */
				size		: '50%',
				/* for jQuery.animate */
				speed		: 500,
				easing		: 'swing',
				complete	: function() {},
				static		: false,
				track		: null
			}, options ),
			/* the width */
			size	= options.size,
			/* half width ( border radius ) */
			h		= ( size / 2 ),
			/* our image */
			$el		= $( options.element ),
			/* original width */
			ow		= parseInt( $el.outerWidth( true ), 10 ),
			/* original height */
			oh		= parseInt( $el.outerHeight( true ), 10 ),
			/* shrinking? */
			sg		= size > ow ? '-=' : '+=',
			/*
				original left position
				note: cannot used $.position() because they
						need to be calculated from the width
						and height respectively.
			*/
			ol		= $el.position().left,
			/* original top position */
			ot		= $el.position().top,
			pt		= parseInt( $el.css('padding-top'), 10 ) || 0,
			pr		= parseInt( $el.css('padding-right'), 10 ) || 0,
			pb		= parseInt( $el.css('padding-bottom'), 10 ) || 0,
			pl		= parseInt( $el.css('padding-left'), 10 ) || 0,
			bt		= parseInt( $el.css('border-top-width'), 10 ) || 0,
			br		= parseInt( $el.css('border-right-width'), 10 ) || 0,
			bb		= parseInt( $el.css('border-bottom-width'), 10 ) || 0,
			bl		= parseInt( $el.css('border-left-width'), 10 ) || 0,
			//l		= options.static ? ol : sg + ( Math.floor( Math.abs( ow - size - pl - pr - bl - br ) / 2 ) ),
			l		= options.static ? ol : sg + ( Math.floor( Math.abs( ow - size - pl - pr - bl - br ) / 2 ) ),
			t		= options.static ? ot : sg + ( Math.floor( Math.abs( ow - size - pt - pb - bt - bb ) / 2 ) );
		
		/* not used */
		/* when expanding capture the original [ left, top ] positions */
		if ( sg === '-=' ) {
			$.data( $el[ 0 ], 'position', {
				'left'	: ol,
				'top'	: ot
			});
		}
		/* not used */
		
		if ( $el[ 0 ] ) {
			/* ensure our object is controlled by jQuery */
			$el.stop( true ).css( 'opacity', '100' ).animate({
				'left'						: l + 'px',
				'top'						: t + 'px',
				'width'						: size
			}, options.speed, options.easing, function() {
				if ( options.complete ) {
					options.complete();
				}
			});
		}
	};
	//$.data( this, 'options', options )
	
	return this.each(function() {
		
		var $this	= $( this ),
			max		= ( parseInt( $this.outerWidth( true ), 10 ) ) || null,
			min		= /%$/.exec( options.size ) ? ( parseInt( options.size, 10 ) / 100 ) * max : parseInt( options.size, 10 );
		
		if ( max ) {
			$.data( $this[0], 'sizes', {
				'min'	: min,
				'max'	: max
			});
			
			$this.mouseenter(function() {
				animateHotSpot({
					element	: this,
					size	: $.data( this, 'sizes' ).max
				});
				return false;
			}).mouseleave(function() {
				animateHotSpot({
					element	: this,
					size	: $.data( this, 'sizes' ).min
				});
				return false;
			});
			
			if ( options.track ) {
				options.track.call( this, $this );
			}
			
			/* do an initial animation */
			animateHotSpot({
				element	: $this,
				size	: min,
				static	: true
			});
		}
	});
};
})( window );