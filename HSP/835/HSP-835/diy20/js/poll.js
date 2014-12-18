

// JS for Quick-Vote Poll form validation and displaying results
//   Web 2.0 style: AJAX to post vote, AJAX to display results

if( typeof(SNI.DIY.QuickVote) == "undefined" ) {
	SNI.DIY.QuickVote = {};
}

SNI.DIY.QuickVote = {
	
	inputLink: "#poll-input-link",
	resultLink: "#poll-result-link",
	submitLink: "#poll-submit-link",
	inputPanel: "#inputPanel",
	inputForm:  "#quick-vote-poll",
	resultsPanel: "#resultsPanel",
	submittingPanel: ".poll .submitting",
	loadingPanel: ".poll .loading",
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
		SNI.DIY.QuickVote.voteURL = voteURL;
		SNI.DIY.QuickVote.resURL = resURL;
		SNI.DIY.QuickVote.POLL_Cookie = "DIY_poll_" + pollnum;
		SNI.DIY.QuickVote.oValidator = $(SNI.DIY.QuickVote.inputForm).validate(SNI.DIY.QuickVote.validateOptions);
		SNI.DIY.QuickVote.oValidator.resetForm();
		$(SNI.DIY.QuickVote.inputForm).get(0).reset();
		$(SNI.DIY.QuickVote.resultLink).click(	function () { 
				$(SNI.DIY.QuickVote.inputPanel).hide();
				SNI.DIY.QuickVote.showResults(resURL);
				return false; });
		$(SNI.DIY.QuickVote.inputPanel).submit( SNI.DIY.QuickVote.submitVote );
		if (SNI.Util.Cookie.get(SNI.DIY.QuickVote.POLL_Cookie) == "yes") { 
			$(SNI.DIY.QuickVote.inputPanel).hide();
			SNI.DIY.QuickVote.showResults(resURL);
		}
		else
		{ 
			$(SNI.DIY.QuickVote.inputPanel).show();
		}		
	},
		
	submitVote: function () { 
		$(SNI.DIY.QuickVote.inputPanel).hide();
		$(SNI.DIY.QuickVote.submittingPanel).show();
        // $.post doesn't work in Firefox
		// $.post(SNI.DIY.QuickVote.voteURL, $(SNI.DIY.QuickVote.inputForm).serialize(), SNI.DIY.QuickVote.afterSubmit );
        $.get(SNI.DIY.QuickVote.voteURL, $(SNI.DIY.QuickVote.inputForm).serialize(), SNI.DIY.QuickVote.afterSubmit );
		return false;
	},
	
	afterSubmit: function () {
		SNI.Util.Cookie.set(SNI.DIY.QuickVote.POLL_Cookie, "yes"); 
		$(SNI.DIY.QuickVote.submittingPanel).hide();
		SNI.DIY.QuickVote.showResults();
	},

	showResults: function () {
		$(SNI.DIY.QuickVote.loadingPanel).show();
		$(SNI.DIY.QuickVote.resultsPanel).load(SNI.DIY.QuickVote.resURL, '', SNI.DIY.QuickVote.resInit);
		return false;
	},
	
	resInit: function () {
		$(SNI.DIY.QuickVote.loadingPanel).hide();
		$(SNI.DIY.QuickVote.resultsPanel).show(); 
		$(SNI.DIY.QuickVote.inputLink).click( function () { 
				SNI.DIY.QuickVote.showInputForm();  
				return false; });
		return;
	},

	showInputForm: function () {
		$(SNI.DIY.QuickVote.resultsPanel).empty(); 
		$(SNI.DIY.QuickVote.resultsPanel).hide(); 
		SNI.DIY.QuickVote.oValidator.resetForm();
		$(SNI.DIY.QuickVote.inputForm).get(0).reset();
		$(SNI.DIY.QuickVote.inputPanel).show(); 
		return false;
	}

};


