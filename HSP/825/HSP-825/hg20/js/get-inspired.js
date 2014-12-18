SNI.HGTV.GetInspired = {
	colorPicker: function(colorList, typeList, hrefList) {
		var swfUrl = 'http://web.hgtv.com/webhgtv/hg20/swf/color-picker/color-picker.swf';
		var elementId = 'color-picker';
		var width = 160;
		var height = 160;
		var flashvars = { colorList: colorList, typeList: typeList, hrefList: hrefList };
		var params = { wmode: "transparent", allowScriptAccess: "always", quality: "high" };
		
		swfobject.embedSWF(
			swfUrl,
			elementId, 
			width, 
			height, 
			"9", 
			"http://common.scrippsnetworks.com/common/flash-express-install/expressInstall.swf", 
			flashvars,
			params,
			{}
		);		
	}
};

SNI.HGTV.ZoneFinder = {
	init: function() {
		
		$("#zone-finder form").submit(function() {
			zip = $.trim($("#zone-zip").val());
			if (zip == '') { return false; }
			var url = "/cf/com/hgtv/zonefinder/ZipCodeSearch.cfc?method=findZone&zipCode=" + zip;

			try {
				$.ajax({
					dataType: "text",
					url: url,
					success: function(zone) {
						$('#zone-finder .message').hide();
						
						zone = $.trim(zone);
						if (zone == '-1' || zone == '-2' || zone == '') {
							$('#zone-finder .error').show();
						} else {
							$('#zone-finder form').hide();
							success = $('#zone-finder .success');
							success.find('.zone').text('Zone ' + zone.toUpperCase());
							success.find('.details').attr('href', '/topics/garden-zone-' + parseInt(zone) + '/index.html');
							success.show();
						}
					}
				});

			} catch (e) {
				// console.log(e);
			}
			
			return false;
		});
	}
};