
// JS for Site Toolbar: Articles 
if( typeof(SNI.HGTV.Search) == "undefined" ) {
	SNI.HGTV.Search = {};
}

SNI.HGTV.Search = {

	/* STATUS MESSAGES */ 
	statusMessage: function() {
					$(".status-message .close a").each(function(e){
						$(this).bind("click",function(){
							var obj = $(this).parents(".status-message");
							obj.css("height",obj.height());
							obj.find(".wrap").fadeOut("slow",function(){
								obj.slideUp("slow");
							});
							return false;
						});
					});
	}
	/* /STATUS MESSAGE */ 
	
};