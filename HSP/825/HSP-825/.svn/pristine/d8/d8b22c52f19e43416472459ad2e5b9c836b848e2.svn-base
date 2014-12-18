HGTV.M.portfolio={};

HGTV.M.portfolio.checkRedirect = function() {
    if (mdManager.getParameter("Type") == 'PORTFOLIO'){
        var url_params = window.location.hash;
        if (url_params) {
            var deep_link_id = url_params.match(/\/id-[0-9]{2,9}/);
            if (deep_link_id) {
                var deepId = deep_link_id[0].split('-')[1];
                var primId = mdManager.getParameter('DetailId');

                if (deepId !== primId){
                    var service_url = '/app/PortfolioService/index.json?site=HGTV&portfolio=' + deepId ;
                    jQuery.ajax({
                        type: 'GET',
                        dataType: 'script',
                        url: service_url,
                        async: false,
                        beforeSend: function () {
                            },
                        success: function(data, textStatus){
                            if( typeof dpCurrentRoom != "undefined"
                                && !$.isEmptyObject(dpCurrentRoom)
                                && dpCurrentRoom.metadata != undefined
                                && dpCurrentRoom.metadata.Url != undefined ) {
                                    window.location = dpCurrentRoom.metadata.Url + window.location.hash;
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert('Error: ' + ' Sorry, we are experiencing difficulties fetching the necessary data.' + errorThrown);
                        }
                    });
                }
            }
        }
    }
};

