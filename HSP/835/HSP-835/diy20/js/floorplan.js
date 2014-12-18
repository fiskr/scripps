/* floorplan flash module for Blog Cabin */
/* requires vars pageIds, startHereRoomId, swfPath, swfHeight */
SNI.DIY.floorplan = function(pageIds, startHereRoomId, swfPath, swfHeight) {
	var pageId = mdManager.getParameter('DetailId');
	var flashvars = {};
	var idFound = false;
	for (var i=0; i < pageIds.length; i++) {
		for ( pageType in pageIds[i] ) {
			if ( pageIds[i][pageType] == pageId ) {
				flashvars.selectedRoomId = pageIds[i].tour;
				idFound = true;
				break;
			}
		}
		if ( idFound == true ) {
			break;
		}
	};
	/* this is the default setting [living room], if you're on neither a tour page nor a photo gallery page */
	if(flashvars.selectedRoomId == "" || typeof(flashvars.selectedRoomId)=='undefined') {
		flashvars.startHereRoomId = startHereRoomId;
	}
	var params = { allowscriptaccess: 'always' };
	swfobject.embedSWF(swfPath, "floorplan-container", "308", swfHeight, "9.0.0",null, flashvars, params);
};