/* site level omniture file
 * set up alias for backwards compatability
 *
 *
 */

if (typeof(SNI.HGRM.Omniture) == 'undefined') {
	SNI.HGRM.Omniture = {};
}
SNI.HGRM.Omniture.ClickTrack = SNI.Omniture.MultiVar;
SNI.HGRM.Omniture.MultiVar = SNI.Omniture.MultiVar;
SNI.HGRM.Omniture.SingleVar = SNI.Omniture.SingleVar;
SNI.HGRM.Omniture.CrossLinkTrack = SNI.Omniture.CrossLinkTrack;

SNI.HGRM.Omniture.HotSpotClick = function() { /* some stuff here */ return; }

//overriding core method for link text:
SNI.Omniture.getLinkText = function ($elt) {
	var $aEle = $elt.closest('a'),
	linkText = $.trim($aEle.text()),
	isNav= $aEle.attr('rel').indexOf('gh-') >= 0;
	
	if (isNav) {
		if ($elt.parents('.box').length) {
			var mainTopic = $elt.parents('.nav').find('a:first-child span').text();
			linkText =  mainTopic + ' : ' + linkText;
		}

	} else if (linkText === '' && $elt.is('img')) {
		linkText = 'Photo : ' + $elt.attr('alt');
	}

	return linkText;
};