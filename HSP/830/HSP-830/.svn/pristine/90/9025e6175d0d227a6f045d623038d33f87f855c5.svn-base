SNI.HGTV.Photogallery = {
	gallery: function(){
		
		$("#pgallery .prev a.desc").hover(
		  function () {
			$(".prev a.btn").addClass("hover");
		  }, 
		  function () {
			$('.prev a.btn').removeClass("hover");
		  }
		);
	
		$("#pgallery .next a.desc").hover(
		  function () {
			$(".next a.btn").addClass("hover");
		  }, 
		  function () {
			$('.next a.btn').removeClass("hover");
		  }
		);
	
		var topmargin = 13;
		var panelheight = $('#pgallery .imgpanel').height();
		var shrinkheight = panelheight - topmargin;

		$("#pgallery .close-btn").click(function(){
			$(".imgpanel").animate({ 
				bottom: -shrinkheight + "px"
			}, 500 );

			$("#pgallery .imgpanel span.close-btn").css("display", "none");
			$("#pgallery .imgpanel span.open-btn").css("display", "block");

		});

		$("#pgallery .open-btn").click(function(){
			$(".imgpanel").animate({ 
				bottom: "1px"
			}, 500 );

			$("#pgallery .imgpanel span.open-btn").css("display", "none");
			$("#pgallery .imgpanel span.close-btn").css("display", "block");

		});

		$(window).load(function() {
			// executes when complete page is fully loaded, including all frames, objects and images
				// fix IE caption issue
				$("#pgallery .largeImage .imgpanel").css("left", "1px");
				$("#pgallery .largeImage .imgpanel").css("bottom", "1px");
		});


	} //end photogallery
};
	
	