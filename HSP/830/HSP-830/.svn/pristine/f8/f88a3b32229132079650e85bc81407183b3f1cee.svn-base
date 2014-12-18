SNI.HGTV.EpisodeFinder = {
	init: function() {
		$('#episode-finder .acco-round').dpl(
		    'accordion',
		    config = { collapsible: true }
		);
		// $('#ef-upcoming-episodes .acco-round').dpl('accordion');
		//$("#episode-finder .button-nav").dpl('tabs');
		$("#episode-finder").dpl('tabs');
		$("#episode-finder .date-box input").attr('readonly', 'readonly');
		$("#episode-finder-w .date-box input").attr('readonly', 'readonly');
		
		SNI.Util.inputField('#ef-topic', 'Topic');

		$(document).ready(function() {
			$("#episode-finder .date").attachDatepicker();
			$("#episode-finder-w .date").attachDatepicker();
		});
	}
};