SNI.HGTV.Topics = {

	/* TOPIC NAVIGATION */ 
	topicNav: function() {
					$("#topicNav .nav li").each(function (i) {
						$(this).click(function(){
							$("#topicNav .active").removeClass("active");
							$(this).addClass("active");
							$("#topicNav .bbsctnt:eq(" + i + ")").addClass("active");
						});
						if($(this).hasClass("active")){
							$("#topicNav .bbsctnt:eq(" + i + ")").addClass("active");
						}
					});
					$("#topicNav .nav li a").click(function(){
						return false;
					});
	}
	/* /TOPIC NAVIGATION */	
};