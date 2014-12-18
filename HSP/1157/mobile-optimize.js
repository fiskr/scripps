/* 
 * put the following in the doc.ready 
 * for the hello world init.js file
 */



//put this at the bottom of the "mobile banner" for the uber article


(function(){
if(document.URL.match(/http.*?\.com.*\.html\?layout=mobile/) ){ //only execute if on a mobile page (checking the current URL)
	
	$('#sh-head').css('display','none'); //hide the heading

	// $('#coming-soon div.hub-tabs').css('display','none'); // only necessary if desktop has these tabs

    var i = 0; // iterations of the timeout
    var isOver = 0; // number designating how many pieces I have removed from mobile 
    var NUM_TO_REMOVE = 4; //how many modules needing to be removed
	var elemCheck = setTimeout(function(){
		clearInterval(elemCheck); // stop the timeout from running again
		i++; //iterate to tell how many times we've ran the timeout function

		//hide social toolbar on mobile
		if($('#social-toolbar')){ 							//if the social-toolbar exists
			$('#social-toolbar').ready(function(){ 			//and once ready
				$('#social-toolbar').css('display','none'); //hide the toolbar
				console.log('There is a social toolbar. It took: ' + i);
				isOver++; //iterate how many pieces have been removed
			});
			
		}
		if($('section#social-module')){ 							// if social module exists,
			$('section#social-module').ready(function(){ 			// and once ready,
				$('section#social-module').css('display', 'none') 	// hide the social module
				$('article.builder-uber + hr').css('display', 'none'); //get rid of following hr
				console.log('There is a social module section. It took: ' + i);
				isOver++; //iterate how many pieces have been removed
			});
			
		}
		//you get the idea now...
		if($('div#we-recommend')){
			$('div#we-recommend').ready(function(){
				$('div#we-recommend').css('display', 'none')
				$('div#we-recommend + hr').css('display', 'none'); // getting rid of following hr
				console.log('There is a we-recommend. It took: ' + i);
				isOver++; //iterate how many pieces have been removed
			});
			
		}
		if($('a.see-more')){
			$('a.see-more').ready(function(){
				$('a.see-more').css('display','none');
				console.log('There is a see-more button. It took: ' + i);
				isOver++; //iterate how many pieces have been removed
			});
			
		}
		
		if(isOver < NUM_TO_REMOVE){ //if you still need to remove modules
			console.log('not over: ' + isOver);
			setInterval(elemCheck, 10); //start the interval again
		}
	},10);
}

})();

