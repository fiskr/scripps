/* anonymous function to instantiate an easter egg surprise */

(function(){

_egg = function(){
	return;		// todo: temp
	
	if ( $("#fn-ft div.brand").length == 0 ) { return; }
	var o = $("#fn-ft .brand").get(0);
	if (o!==null) {
		var ee = document.createElement("div");
		ee.className = "_egg";
		o.appendChild(ee);
		$(ee).click(
			function(){
				if(document.getElementById('_egg-yolk')===null){
					// only open if not already open (i.e. already clicked and not closed)
					var bd = document.getElementById('fn-bd');
					if (bd!=null) {
						// get image dimensions
						var img_w = 620;		// no px
						var img_h = 465;		// no px
						
						// figure home coords to start displaying easter egg image
						var x = ($(window).width() - img_w) / 2;
						var y = ($(window).height() - img_h) / 2;
						y += window.scrollY;		// add y value to viewport offset to display in visible window to user

						// create yolk (surprise)
						var yolk = document.createElement("div");
						yolk.setAttribute('id', '_egg-yolk');
						yolk.style.left = Math.ceil(x) + 'px';
						yolk.style.top = Math.ceil(y) + 'px';

						// add surprise to page
						bd.appendChild(yolk);
						$(yolk).click( function(){ yolk.parentNode.removeChild(yolk); } );		// allow close surprise when trigger clicked again
						$(yolk).animate( { width:img_w+'px', height:img_h+'px' }, 700);			// "open" image/surprise
					}
				}
			}
		);
	}
};

$(document).ready(_egg);

})();
