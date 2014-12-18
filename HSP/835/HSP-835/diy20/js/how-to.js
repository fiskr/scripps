
// JS for how-to Assets

if( typeof(SNI.DIY.HowTos) == "undefined" ) {
	SNI.DIY.HowTos = {};
}

SNI.DIY.HowTos = {

	related: function() {
		var relatedContents = $('.step .rc-wrap');

		relatedContents.each(function() {	
			var rc = $(this);
			var header	= rc.find(" .sub-header");
			var flyout = rc.find(".rc");
			
			header.bind("mouseenter", function (){
				flyout.show("fast");
			});
			
			flyout.bind("mouseleave", function (){
				flyout.hide("fast");
			});
			
			rc.find('.close').click( function() {
				 flyout.hide("fast");
			});			    
		    
		});
	}
};

