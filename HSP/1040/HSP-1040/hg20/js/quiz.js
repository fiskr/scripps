/* Quiz Object */

// instantiate object namespace
if( typeof(SNI.HGTV.Quiz)=='undefined' ) {
	SNI.HGTV.Quiz = {};
}



// define global quiz variables - needed for backwards compatibility (jayh 11-25-08)
var total_a;
var total_b;
var total_c;
var total_d;
var aQuizAnswers;


/**
 * sets up the quiz vars and pops up a quiz in a popup window
 * 
 * example:
 *
 * <a href="http://www.hgtv.com/webhgtv/images/69135/quiz/q1.html" onclick="return SNI.HGTV.Quiz.popupQuiz(this.href);">Name of your Quiz</a>
 */

SNI.HGTV.Quiz.popupQuiz = function(url) {
	// initialize variable values
	total_a = 0;
	total_b = 0;
	total_c = 0;
	total_d = 0;
	aQuizAnswers = [];
	SNI.Util.popup(url,775,525);
	return false;
};
