
    /* instantiate object namespace */
/*
 *  Removed Function and namespace SNI.HGTV.Medialibary. This was not in use on site and is duplicated by same function 
 *  in common.js which uses code in SNI Core js.
 *  
 *  Remaining function below left, still to be determined if this is currently needed on HGTV. -kw
 */


/* instantiate object namespace */
	if(typeof(SNI.HGTV.newflashtour)=='undefined') {
		SNI.HGTV.newflashtour = {};
	}
    
SNI.HGTV.newflashtour = function() {
	var pageId = mdManager.getParameter('DetailId');
	var pageIds = [	
		{tour:'5946059', photoGallery:'6023377', video:'29860', name:"Front"},
		{tour:'5946070', photoGallery:'6023399', video:'29855', name:"Entry Hall"},
		{tour:'5946077', photoGallery:'6023411', video:'29843', name:"Great Room"},
		{tour:'5946076', photoGallery:'6023409', video:'29865', name:"Kitchen"},
		{tour:'5946078', photoGallery:'6023413', video:'29859', name:"Walk-through Pantry"},
		{tour:'5946079', photoGallery:'6023415', video:'29861', name:"Dining Room"},
		{tour:'5946064', photoGallery:'6023387', video:'29851', name:"Home Theater"},
		{tour:'5946060', photoGallery:'6023379', video:'29864', name:"Master Suite"},
		{tour:'5946062', photoGallery:'6023383', video:'29857', name:"Master Bathroom"},
		{tour:'5946061', photoGallery:'6023381', video:'29848', name:"Master Closet"},
		{tour:'5946063', photoGallery:'6023385', video:'29850', name:"Sunrise Room"},
		{tour:'5946065', photoGallery:'6023389', video:'29844', name:"Laundry Room"},
		{tour:'5946066', photoGallery:'6023391', video:'29858', name:"Kids Bedroom"},
		{tour:'5946068', photoGallery:'6023395', video:'29847', name:"Jack & Jill Bathroom"},
		{tour:'5946067', photoGallery:'6023393', video:'29845', name:"Guest Bedroom"},
		{tour:'5946081', photoGallery:'6023419', video:'29846', name:"Home Office"},
		{tour:'5946073', photoGallery:'6023405', video:'29862', name:"Motor Court"},
		{tour:'5946074', photoGallery:'6023407', video:'29863', name:"Casita"},
		{tour:'5946080', photoGallery:'6023417', video:'29849', name:"Casita Patio"},
		{tour:'5946069', photoGallery:'6023397', video:'29856', name:"Three Car Garage"},
		{tour:'5946072', photoGallery:'6023403', video:'29854', name:"Back Patio"},
		{tour:'5946071', photoGallery:'6023401', video:'29852', name:"Recycling Room"}
	];
	var flashvars = {};
	var idFound = false;
	/* this is the default setting [living room], if you're on neither a tour page nor a photo gallery page */
	flashvars.startHereRoomId = '5946059';
	for (var i=0; i < pageIds.length; i++) {
		for ( pageType in pageIds[i] ) {
			if ( pageIds[i][pageType] == pageId ) {
				flashvars.selectedRoomId = pageIds[i].tour;
				flashvars.startHereRoomId = null;
				idFound = true;
				break;
			}
		}
		if ( idFound == true ) {
			break;
		}
	};
	var params = { allowscriptaccess: 'always' };
	swfobject.embedSWF('http://web.hgtv.com/webhgtv/hg20/pkgs/2010/dh/swf/floorplan.swf', 'floorplan-container', '323', '280', '9.0.0', null, flashvars, params);
};

