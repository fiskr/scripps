(function( $ ){
    
   /*
     Author: Robert Eilam
     Date created 2/16/2012
     Example Usage: $("#foo").userIntent('target':'#foo-menu');
   */
  
  $.fn.userIntent = function( options ) {  

    // Defaults, extending them with any options that are provided
    var settings = $.extend( {
      'target': 'div#sister_sites_popup', //Element that will be delayed
      'delay' : '250' //Delay time in milliseconds
    }, options);

    return this.each(function() {        

    /*Intent Logic*/
	var triggerElement = $(this);  
	var myTimeout,myClearTimeout,myflyTimeout; 
	var userIntent = {};
	triggerElement.click(function(){ return false});
	userIntent.flyOut = $(settings.target); //Delayed element
	userIntent.flyOutTrigger = triggerElement; //Trigger for delayed element
	userIntent.showFlyout = function(){ userIntent.flyOut.show(); };
	userIntent.hideFlyout = function(){ userIntent.flyOut.hide(); };
	 
	userIntent.flyOutTrigger.mouseover(function(){
	 //Clear timeout on target element if it has already been set
	 //Set timeout on target after a 250 ms delay
	 clearTimeout(myflyTimeout);
	 myTimeout = setTimeout(userIntent.showFlyout,settings.delay);
	
	});
	 
	userIntent.flyOutTrigger.mouseleave(function(){
	    //Clear timeout to show target element
	    clearTimeout(myTimeout);
	    userIntent.flyOut.hide(); 
	});
	
	userIntent.flyOut.mouseover(function() {
	   
	 /* Clear timeouts to HIDE the target that was set when mouse leaves and
	       show target as long as we do not EXIT the target for a duration of 350 ms */
	   
	    clearTimeout(myflyTimeout);
	    myClearTimeout = clearTimeout(userIntent.hideFlyout);
	    myflyTimeout = setTimeout(userIntent.showFlyout,settings.delay);
	    userIntent.flyOut.show();
	 });
	
	userIntent.flyOut.mouseleave(function() {
	    
	/* Clear timeouts to SHOW the target that was set when mouse entered the target
	    Since we are now OFF of the target HIDE the target after 350 ms */
	     
	    myClearTimeout = clearTimeout(myflyTimeout);
	    myflyTimeout = setTimeout(userIntent.hideFlyout,350);
	  clearTimeout(myClearTimeout);
	 
	});
/*End all intent logic*/

    }); 
 
  };

})( jQuery );

$(document).ready(function(){
    
    $("#sister_sites_container").css('display', 'block');	
    $("a#sister_sites_link").userIntent();

});