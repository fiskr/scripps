if(typeof(SNI.HGTV.GreenHome)=='undefined') {
	SNI.HGTV.GreenHome = {};
}

SNI.HGTV.GreenHome.flashtour = function() {
	var pageId = mdManager.getParameter('DetailId');
	var pageIds = [	
		{tour:'6024752', photoGallery:'6024750', video:'33703', name:"Living Room"},
		{tour:'6024792', photoGallery:'6024756', video:'33504', name:"Kitchen"},
		{tour:'6024794', photoGallery:'6024758', video:'33516', name:"Dining Room"},
		{tour:'6024798', photoGallery:'6024762', video:'33510', name:"Hall"},
		{tour:'6024796', photoGallery:'6024760', video:'33515', name:"Laundry Room"},
		{tour:'6024800', photoGallery:'6024764', video:'33702', name:"Sitting Room"},
		{tour:'6024806', photoGallery:'6024772', video:'33507', name:"Master Bedroom"},
		{tour:'6024808', photoGallery:'6024774', video:'33506', name:"Master Bathroom"},
		{tour:'6024810', photoGallery:'6024776', video:'33512', name:"Master Closet"},
		{tour:'6024802', photoGallery:'6024766', video:'33513', name:"Kid's Bedroom"},
		{tour:'6024804', photoGallery:'6024770', video:'33514', name:"Kid's Bathroom"},
		{tour:'6024812', photoGallery:'6024778', video:'33509', name:"Tower"},
		{tour:'6024814', photoGallery:'6024780', video:'33503', name:"Exterior Front"},
		{tour:'6024816', photoGallery:'6024782', video:'33505', name:"Covered Porch"},
		{tour:'6024820', photoGallery:'6024786', video:'33521', name:"Garage Exterior"},
		{tour:'6024828', photoGallery:'6024830', video:'33501', name:"GMC Terrain"},
		{tour:'6024818', photoGallery:'6024784', video:'33511', name:"Outdoor Kitchen"}
	];
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
		flashvars.startHereRoomId = '6024752';
	}
	var params = { allowscriptaccess: 'always' };
	swfobject.embedSWF("http://web.hgtv.com/webhgtv/hg20/pkgs/2010/gh/swf/floorplan.swf", "floorplan-container", "323", "468", "9.0.0",null, flashvars, params);
};
