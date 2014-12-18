if(typeof window.console==='undefined'){window.console={};var types=['log','warn','dir','info','debug'];for(var i=0;i<types.length;i++){window.console[types[i]]=function(){return false;}}}


if( typeof(SNI.Util) == "undefined" ) {
	SNI.Util = {};
}

/**
* Defaults an input field to 'defaultText' and automatically
* removes the text when the input field is clicked.
*
* Example:
* SNI.Util.inputField('#search-box', 'Search:');
*
* Params:
*  elem: the text field to attach the default text
*  defaultText: the default text to display in the field if nothing already exists
*  preventDefault: (optional, default is 'blank') to determine if form is prevented from submitting
*                  when the default value has not been changed by the user. If set to true it will
*                  stop the form submission.
*/
SNI.Util.inputField = function(elem, defaultText, preventDefault) {
	var elem = $(elem);
	var preventDefault = preventDefault == null ? 'blank' : preventDefault;
	var hintClass = 'input-hint';

	if (elem.length > 0) {
		var input = elem.get(0);

		// make sure we're dealing w/ an input field
		if (input.tagName.toLowerCase() == 'input' && input.type == 'text') {

			// load up the default text if nothing is in the field
			if ($.trim(elem.val()) === '') {
				elem.val(defaultText);
				elem.addClass(hintClass);
			}

			// show our default text if there is nothing in the field
			elem.blur(function() {
				if ($.trim(this.value) === '') {
					this.value = defaultText;
					elem.addClass(hintClass);
				}
			});

			// hide our default text when input is clicked
			elem.focus(function() {
				if (this.value == defaultText) {
					this.value = '';
				}
				elem.removeClass(hintClass);
			});

			// prevent form from submitting when default value exists in header site search only - otherwise it submits default text
			if (preventDefault === true || preventDefault == 'blank') {
				form = $(elem.get(0).form);
				if (form) {
					form.submit(function(event) {
						if ($.trim(elem.val()) == defaultText || $.trim(elem.val()) == "") {
							if (preventDefault === true) {
								event.preventDefault();
								elem.focus();
							} else {
								elem.val('');
							}
						}
						return true;
					});
				}
			}
		}
	}
};




/**
 * popups a new browser window
 */
 
SNI.Util.popup = function(url,w,h,menu) {
	x = Math.floor((screen.width - w) / 2);
	y = Math.floor((screen.height - h) / 2);        
	now = new Date();
	features = "screenx="+x+",screeny="+y+",left="+x+",top="+y+",width="+w+",height="+h+",location=no,resizable=yes"+",directories=no,status=no,scrollbars=yes";

	if (menu != null) {
		//features += ",menubar=yes,toolbar=yes,scrollbars=yes";
		features += ",menubar=yes,toolbar=yes";
	} else {
		//features += ",menubar=no,toolbar=no,scrollbars=no"; 
		features += ",menubar=no,toolbar=no"; 
	}
	window.open(url,"newwin",features);
};

/**
 * get the value of a query parameter from the url
 */
SNI.Util.getUrlParam = function( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	} else {
		return results[1];
	}
};

SNI.Util.truncate = function(str, length, truncation) {
	length = length || 30;
	truncation = truncation == undefined ? '...' : truncation;
	return str.length > length ?
	str.slice(0, length - truncation.length) + truncation : str;
};



/**
 * load a dummy html page into a hidden iframe to force a Nielson hit count
 */
SNI.Util.hitCount = function() {
	var myURL;
	if (location.host == "www.diynetwork.com") {
		myURL = "http://images.diynetwork.com/webdiy/diy20/html/fixHits.html";
	} else {
		myURL = "http://frontend.scrippsnetworks.com/diy/js/fixHits.html";
	}
	if ($("#hitCounter").length > 0) {
		$("#hitCounter").remove();
	}
// if you need HTTP response code 200, otherwise will be 304
//	myURL  += "?t=" + (new Date().getTime());
	$("head").append('<iframe id="hitCounter" src="' + myURL + '" width="0" height="0" frameborder="0" style="height:0; width:0; display:none;"></iframe>')
	return;	
};

/* @mehtod  LazyLoad
 * @param   img_element, src
 * loads an image lazily only when user invoked
 * paolo grabbed this from marks slider - thanks mark
 *
 */
SNI.Util.LazyLoad = function(img_element, src) {
    if (img_element.attr('src')) {return;}
    var image_src = src || img_element.attr('data-src');
    img_element.attr('src', image_src);
    return img_element;
}

if(typeof jQuery!=='undefined'){(function($){$.fn.truncate=function(opts){var options=$.extend({'maxLines':1,'lineHeight':15,'allowedExtraLines':0,'truncateString':'','showText':'','hideText':'','collapsed':true,'debug':false,'contextParent':null},opts);var DEBUG=function(msg){if((options.debug===true)&&(typeof console!=='undefined')){console.log(msg);}};var lastWordPattern=/(?:^|\W)\w*$/;var firstWordPattern=/(?:^\W+)\w+/;var showLinkHtml=options.showText!==''?' <a class="show" href="#">'+options.showText+'</a>':'';var hideLinkHtml=options.hideText!==''?' <a class="hide" href="#">'+options.hideText+'</a>':'';var maxHeight=options.maxLines*options.lineHeight;var realMaxHeight=maxHeight+options.allowedExtraLines*options.lineHeight;var setNodeText=$.browser.msie?function(node,text){node.nodeValue=text;}:function(node,text){node.textContent=text;};var getHtmlUntilTextOffset=function($el,offset){var queue=[];var $html=$('<div/>');var textLen=0;var count=0;var rootChildren=$el.clone().contents().detach();var n=0;for(n=rootChildren.size()-1;n>=0;--n){queue.push({$parent:$html,node:rootChildren.get(n)});}
while((queue.length>0)&&(textLen<offset)&&(count<100)){var queueItem=queue.pop();var node=queueItem.node;var $node=$(node);var nodeTextLen=0;var nodeText;if(node.nodeType===3){var $nodeParent=queueItem.$parent;$nodeParent.append($node);nodeText=$node.text();nodeTextLen=nodeText.length;if(nodeTextLen>offset-textLen){var match=lastWordPattern.exec(nodeText.substring(0,offset-textLen));var lastWordOffset=match.index+match[0].length;setNodeText(node,nodeText.substring(0,lastWordOffset));if(!($nodeParent.is('a'))){$nodeParent.append(options.truncateString);}else{$nodeParent.parent().append(options.truncateString);}
textLen+=lastWordOffset;break;}else{textLen+=nodeTextLen;}}else{nodeText=$node.text();nodeTextLen=nodeText.length;if(nodeTextLen>offset-textLen){var children=$node.contents().detach();var i=0;for(i=children.size()-1;i>=0;--i){queue.push({$parent:$node,node:children.get(i)});}}else{textLen+=nodeTextLen;}
queueItem.$parent.append($node);}}
return $html;};$(this).each(function(){var startTime=new Date();var $text=$(this);var originalHeight=$text.height();if(originalHeight>realMaxHeight){var originalHtml=$text.html();var $contextParent=(options.contextParent===null||options.contextParent===$text)?$text:$(options.contextParent);var $doppleText;var $doppleParent;if($contextParent.find($text).size()>0){var childOffsets=[];var $node=$text;var $closestParent=$node.parent();while($closestParent.size()!==0&&!($closestParent.find($contextParent).size()>0)){childOffsets.unshift($node.index());$node=$closestParent;$closestParent=$closestParent.parent();}
$doppleParent=$contextParent.clone();$doppleText=$doppleParent;var i;for(i=0;i<childOffsets.length;i++){var offset=childOffsets[i];$doppleText=$doppleText.children().eq(offset);}}else{$doppleText=$text.clone();$doppleParent=$doppleText;}
$doppleParent.css({position:'absolute',left:'-9999px',width:$contextParent.width()});$doppleText.css({'line-height':options.lineHeight+'px'});$contextParent.after($doppleParent);var textString=$text.text();var near=0;var far=textString.length;var mid=far;var truncatedHtml;var count=0;do{if($doppleText.height()>maxHeight){far=mid;}else{near=mid;}
var avg=Math.floor((far+near)/2);mid=lastWordPattern.exec(textString.substring(0,avg)).index;if(mid===near){var nextWord=firstWordPattern.exec(textString.substring(avg,far));if(nextWord!==null){mid=avg+nextWord.index;}}
truncatedHtml=getHtmlUntilTextOffset($text,mid).html();$doppleText.html(truncatedHtml+showLinkHtml);count++;}while((count<100)&&(mid>near));$doppleParent.remove();if(options.collapsed===false){$text.append(hideLinkHtml);}else{$text.html(truncatedHtml+showLinkHtml);}
$text.css({'display':'block','line-height':options.lineHeight+'px'});$text.delegate('.show','click',function(event){event.preventDefault();$text.html(originalHtml+hideLinkHtml);$text.css('height','auto');$text.trigger('show');$text.trigger('toggle');});$text.delegate('.hide','click',function(event){event.preventDefault();$text.html(truncatedHtml+showLinkHtml);$text.css('height',maxHeight+'px');$text.trigger('hide');$text.trigger('toggle');});DEBUG("truncate.js: truncated element with height "+originalHeight+"px > "+realMaxHeight+"px in "+count+" steps.");}else{DEBUG("truncate.js: skipped processing element with height "+originalHeight+"px < "+realMaxHeight+"px");}
var endTime=new Date();DEBUG("truncate.js: took "+(endTime-startTime)+"  ms to execute.");});};})(jQuery);}
