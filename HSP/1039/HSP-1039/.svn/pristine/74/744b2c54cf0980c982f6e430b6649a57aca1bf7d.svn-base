(function(){
    if (typeof (HGTV.M.ProgramGuide) === 'undefined') HGTV.M.ProgramGuide = {};
    HGTV.M.ProgramGuide.getOnTvNow = function() {
        var ontvid = '#hgtv-ontv',
	d = new Date(),
	m = (d.getUTCMinutes()<30) ? '00' : '30';

	$.ajax({
            dataType: 'json',
	    url: '/hgtv/feeds/ontv/0,,HGTV_' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + '-' + d.getUTCFullYear()+ '_' + d.getHours() + ':' + m + ',00.html',
	    //url: './rightnow.json',
	    success: function(data) {
                if (data) {
                    console.log(data);
                    if (data.onair) {
                        //$(ontvid + ' .show.now .show-info').html(data.onair.title );
                        $(ontvid + ' .show.now .show-info').html('<a title="' + data.onair.title + '" href="' + data.onair.url + '">' + data.onair.title + '</a>');
                    } else {
                        $(ontvid + ' .show.now').hide();
                    }

                    if (data.tonight) {
                        $(ontvid + ' .show.tonight .time').html(data.tonight.time);
                        $(ontvid + ' .show.tonight .day-time').html(data.tonight.amorpm);
                        //$(ontvid + ' .show.tonight .show-info').html(data.tonight.title);
                        $(ontvid + ' .show.tonight .show-info').html('<a title="' + data.tonight.title + '" href="' + data.tonight.url + '">' + data.tonight.title + '</a>');
                    } else {
                        $(ontvid + ' .show.tonight').hide();
                    }
                }

                //HGTV.M.Omniture.ClickTrack(ontvid, 'On Tv');
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //hide 'now' and 'tonight' since those would be blank
                $(ontvid + ' .show.now').hide();
                $(ontvid + ' .show.tonight').hide();
            }
	});
    }
    $(function(){ $('.time-zone').insertAfter('.hot'); }); //move "All times Eastern" text, which needs to be on bottom of page, but would impact desktop page to put in in xslt
}(jQuery));
