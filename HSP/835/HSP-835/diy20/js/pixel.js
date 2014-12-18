if( typeof(SNI.DIY.tracker) === "undefined" ) {
	SNI.DIY.tracker = {};
}

SNI.DIY.tracker = function(){
    $(window).load(function () {
        var currSection = mdManager.getParameter('SctnDspName');
       if(currSection == 'HOME'){
            var url = "http://tags.w55c.net/rs?id=df412536b2fc4abc849e288ccb65c4fc&t=homepage";
            var type = 'img'
            SNI.Pixel.asyncLoad(url, type);
        }
    });
}
SNI.DIY.tracker();