

// JS for Quick-Vote Poll form validation and displaying results
//   Web 2.0 style: AJAX to post vote, AJAX to display results

if( typeof(SNI.HGTV.QuickVote) == "undefined" ) {
	SNI.HGTV.QuickVote = {};
}

SNI.HGTV.QuickVote = {
	
	inputLink: "#poll-input-link",
	resultLink: "#poll-result-link",
	submitLink: "#poll-submit-link",
	inputPanel: ".qvInputPanel",
	inputForm:  "#quick-vote-poll",
	resultsPanel: ".qv-results-panel",
	submittingPanel: ".qv .submitting",
	loadingPanel: ".qv .loading",
	validateOptions: { 	errorElement: "",
											highlight: "",
											rules: {Rating: "required" }, 
											messages: { Rating: "" },
											errorContainer: "#quick-vote-poll .errormsg" },
									
	voteURL: '',
	resURL: '',
	POLL_Cookie: '',
	oValidator: '',
											
	init: function(pollnum, voteURL, resURL) {
		SNI.HGTV.QuickVote.voteURL = voteURL;
		SNI.HGTV.QuickVote.resURL = resURL;
		SNI.HGTV.QuickVote.POLL_Cookie = "HGTV_poll_" + pollnum;
		SNI.HGTV.QuickVote.oValidator = $(SNI.HGTV.QuickVote.inputForm).validate(SNI.HGTV.QuickVote.validateOptions);
		SNI.HGTV.QuickVote.oValidator.resetForm();
		/*added by dsisan*/
		SNI.HGTV.QuickVote.inputPanel = "#HGTV_poll" + pollnum + " .qvInputPanel";
		SNI.HGTV.QuickVote.submittingPanel = "#HGTV_poll" + pollnum + ".qv .submitting"; 
		SNI.HGTV.QuickVote.loadingPanel = "#HGTV_poll" + pollnum + ".qv .loading";
		SNI.HGTV.QuickVote.resultsPanel = "#HGTV_poll" + pollnum + " .qv-results-panel"; //need the space before the results panel class		
				
		$(SNI.HGTV.QuickVote.inputForm).get(0).reset();
		$(SNI.HGTV.QuickVote.resultLink).click(	function () { 
				$(SNI.HGTV.QuickVote.inputPanel).hide();
				SNI.HGTV.QuickVote.showResults(resURL);
				return false; });
		$(SNI.HGTV.QuickVote.inputPanel).submit( SNI.HGTV.QuickVote.submitVote );
		if (SNI.Util.Cookie.get(SNI.HGTV.QuickVote.POLL_Cookie) == "yes") { 
			$(SNI.HGTV.QuickVote.inputPanel).hide();
			SNI.HGTV.QuickVote.showResults(resURL);
		}
		else
		{ 
			$(SNI.HGTV.QuickVote.inputPanel).show();
		}		
	},
		
	submitVote: function () { 
		$(SNI.HGTV.QuickVote.inputPanel).hide();
		$(SNI.HGTV.QuickVote.submittingPanel).show();
        // Must use $.get instead of $.post for it to work in Firefox
        //$.post(SNI.HGTV.QuickVote.voteURL, $(SNI.HGTV.QuickVote.inputForm).serialize(), SNI.HGTV.QuickVote.afterSubmit );
		$.get(SNI.HGTV.QuickVote.voteURL, $(SNI.HGTV.QuickVote.inputForm).serialize(), SNI.HGTV.QuickVote.afterSubmit );
		return false;
	},
	
	afterSubmit: function () {
		SNI.Util.Cookie.set(SNI.HGTV.QuickVote.POLL_Cookie, "yes"); 
		$(SNI.HGTV.QuickVote.submittingPanel).hide();
		SNI.HGTV.QuickVote.showResults();
	},

	showResults: function () {
		$(SNI.HGTV.QuickVote.loadingPanel).show();
		$(SNI.HGTV.QuickVote.resultsPanel).load(SNI.HGTV.QuickVote.resURL, '', SNI.HGTV.QuickVote.resInit);
                return false;
        },

	resInit: function () {
		$(SNI.HGTV.QuickVote.loadingPanel).hide();
		$(SNI.HGTV.QuickVote.resultsPanel).show(); 
		$(SNI.HGTV.QuickVote.inputLink).click( function () { 
				SNI.HGTV.QuickVote.showInputForm();  
				return false; });
		return;
	},

	showInputForm: function () {
		$(SNI.HGTV.QuickVote.resultsPanel).empty(); 
		$(SNI.HGTV.QuickVote.resultsPanel).hide(); 
		SNI.HGTV.QuickVote.oValidator.resetForm();
		$(SNI.HGTV.QuickVote.inputForm).get(0).reset();
		$(SNI.HGTV.QuickVote.inputPanel).show(); 
		return false;
	}

};


