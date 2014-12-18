SNI.DIY.FindProjectFromShow = {
	init: function() {
		$(document).ready(function() {
			$('#find-project-from-show .date-box input').attachDatepicker();
		});
	}
};

SNI.DIY.FindProjectOnTV = {
	init: function() {
		var showName = $('#find-a-project #show-name').dropdown();
		var expertName = $('#find-a-project #expert-name').dropdown();
		
		showName.change(function() {
			expertName.get(0).selectedIndex = 0;
			expertName.dropdown('select');
		});
		
		expertName.change(function() {
			showName.get(0).selectedIndex = 0;
			showName.dropdown('select');
		});

		$(document).ready(function() {
			$('#find-a-project .date-box input').attachDatepicker();
		});
	}
};
