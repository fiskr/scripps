SNI.DIY.Materialstools = function(element, config) {
	
		// toggle for checkall
		$("#checkall").click(function(){
			var $this = $(this);
	
		
			if ($this.attr('checked') === true){
	
				$(".supply-list input[@type=checkbox]").each(function() {
					$(".supply-list input[@type='checkbox']").attr('checked', true);
				});
			} else {
					$(".supply-list input[@type=checkbox]").each(function() {
					$(".supply-list input[@type='checkbox']").attr('checked', false);
				});
			}
		}); // end toggle for checkall
	



};