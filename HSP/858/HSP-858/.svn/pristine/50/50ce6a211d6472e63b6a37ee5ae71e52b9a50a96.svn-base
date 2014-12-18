/**
 * Created using IntelliJ IDEA.
 * User: 902635
 * Date: Oct 10, 2011
 * Time: 10:23:12 AM
 */

(function ($) {
    if( typeof(SNI.HGTV.Modules) == "undefined" ) {
        /**
         * @namespace container that holds JavaScript modules related to HGTV
         */
        SNI.HGTV.Modules = {};
    }

    /**
     * JSONP call back function to get around Akama cache in production env.
     * @param data
     */
    SNI.Config.FloorPlan.jsonpCallback = function (data) {
        SNI.Config.FloorPlan.imageData = data.images;
        SNI.HGTV.Modules.FloorPlan._init();
    }
    
    /**
     * @memberOf SNI.HGTV.Modules
     * @namespace Floor Plan module to instantiate a {@link SNI.HGTV.Classes.FloorPlan}
     */
    SNI.HGTV.Modules.FloorPlan = {
        /**
         * Initializes the AJAX retrieval of hot spot data and creation of a FloorPlan object
         * @memberOf SNI.HGTV.Modules.FloorPlan
         * @param config Configuration object to creating an instance of a FloorPlan
         */
        init: function(config) {

            var _self;

            _self = this;

            SNI.Config.FloorPlan = $.extend(true, SNI.Config.FloorPlan, config);
            // why not use complete handler?  because it gets called twice.
            $.ajax({
                url: SNI.Config.FloorPlan.hotSpotURL,
                dataType: "jsonp",
                context: _self,
                jsonpCallback: "SNI.Config.FloorPlan.jsonpCallback",
                success: function (data) {
                    SNI.Config.FloorPlan.imageData = data.images;
                    _self._init();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // do nothing if fails
                    _self._init();
                }
            });

            return true;
        },
        _init: function () {
            var floorPlanGallery, _self, $fpToggler, initialized = false;
            _self = this;
            SNI.Config.FloorPlan.roomSelectConfig = _self.getSelectedRoomConfig(document.location.href);
            
            floorPlanGallery = new SNI.HGTV.Classes.FloorPlan(SNI.Config.FloorPlan);

            // this toggler is specific to the implementation
            $fpToggler = $(SNI.Config.FloorPlan.floorPlanToggler);
            if($fpToggler.length > 0) {
                $fpToggler.delegate("button.button", "click", function () {
                    var $button, buttonId;

                    $button = $(this);

                    buttonId = $button.attr("id");

                    $button.css("display", "none");

                    if(buttonId == "show-floor-plan") {
                        floorPlanGallery.$container.find(".fp-module-wrapper").slideDown();
                        $fpToggler.find("#hide-floor-plan").css("display", "block");
                        $fpToggler.animate({backgroundColor: "#F2F6F2"}, SNI.Config.animationSpeed);
                    } else {
                        floorPlanGallery.$container.find(".fp-module-wrapper").slideUp(SNI.Config.animationSpeed, function() {
                            $fpToggler.css({backgroundColor: "transparent"});
                        });
                        $fpToggler.find("#show-floor-plan").css("display", "block");
                    }
                });
            }
            if($fpToggler.length > 0 || config.initClosed){
                $fpToggler.find("#hide-floor-plan").trigger("click");
            }

        },
        getSelectedRoomConfig: function (url) {
            var roomSelectConfig = {}, temp;
            url = decodeURIComponent(url);
            temp = url.split("#");
            
            if(temp.length >= 2) {
                temp = temp[1].split("/");
                $.each(temp, function (index, value) {
                    var splitString = this.split("|");
                    if(splitString.length > 1) {
                        roomSelectConfig[splitString[0]] = splitString[1];
                    }
                });
            }

            return roomSelectConfig;
        }
    };

    // todo: should this go into the core FloorPlan class or this should be an implementation level override

}(jQuery));