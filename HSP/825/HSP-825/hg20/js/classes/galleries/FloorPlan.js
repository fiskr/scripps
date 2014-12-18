/**
 * Created using IntelliJ IDEA.
 * User: 902635
 * Date: Nov 1, 2011
 * Time: 1:50:28 PM
 */


(function ($) {


    if (typeof(SNI.HGTV.Classes) == "undefined") {
        /**
         * @namespace Holds JavaScript Classes related to HGTV
         */
        SNI.HGTV.Classes = {};
    }


    /**
     * @namespace container to hold FloorPlan configuration
     *
     */
    SNI.Config.FloorPlan = {
        /**
         * The container of the FloorPlan Module
         * @memberof SNI.Config.FloorPlan
         * @type String|jQuery
         */
        container: ".floor-plans",
        /**
         * The staging area for the floor plans
         * @memberof SNI.Config.FloorPlan
         * @type String|jQuery
         */
        stage: ".fp-stage",
        /**
         * An array of items to be displayed as floor plans
         * @memberof SNI.Config.FloorPlan
         * @type array
         */
        displayItems: [],
        /**
         * A DOM element to toggle the show and hide of the floor plan container
         * @memberof SNI.Config.FloorPlan
         * @type String|jQuery
         */
        floorPlanToggler: "",
        /**
         * A object containing the configuration to retrieve DOM elements of the controls for the gallery as well as their
         * respective DOM events to be binded
         * @memberof SNI.Config.FloorPlan
         * @type Object
         */
        controls: {
            nextButton : {
                selector: ".fp-next-button",
                eventType: "click"
            },
            previousButton : {
                selector: ".fp-previous-button",
                eventType: "click"
            },
            tableOfContent : {
                selector: ".fp-toc",
                eventType: "click"
            },
            tableOfContentItem : {
                selector: ".fp-toc > li",
                eventType: "click"
            }
        }
    };


    /**
     * @class FloorPlan extends a Gallery that displays a set of floor plans with
     * hot spots to help users explore the rooms for each floor of the home being show cased.
     *
     * @constructor FloorPlan
     * @description creates an instance of a FloorPlan please see {@Link SNI.HGTV.Classes.Gallery} for other requirements.
     * @extends SNI.HGTV.Classes.Gallery
     * @this {FloorPlan}
     * @param config
     *
     * @example
     * var myFloorPlan = new SNI.HGTV.Classes.FloorPlan({
     *     id: "6030516",
     *     floorPlanToggler: ".floor-plans .fp-toggler",
     *     hotSpots: [{"id" : "", hotspots: [{x: "", y: ""}]]
     *     displayItems: [
     *         {
     *             id: "2539994",
     *             title: "floor 1",
     *             image: "http://img.hgtv.com/HGTV/2010/08/20/DH2011_Floorplan-2_s4x3_lead.jpg",
     *             description: ""
     *         },
     *         {
     *             id: "2539995",
     *             title: "floor 2",
     *             image: "http://img.hgtv.com/HGTV/2010/08/20/DH2011_Floorplan-1_s4x3_lead.jpg",
     *             description: ""
     *         }
     *     ]
     * });
     * // need to do more?  you can create a singleton that wraps all this together
     * // here's an example of using AJAX to retrieve the hot spots before instantiating a FloorPlan
     * var myFloorPlanModule = {
     *      init: function (config) {
     *          jQuery.ajax({
     *              url: "http://apistg.scrippsnetworks.com/api/photogallery/images/image/6030516/6030517/2539994/jsonp"
     *              dataType: "jsonp",
     *              success: function(data) {
     *                  // assuming the config is the same as the above example
     *                  config.hotSpots = data;
     *                  var myFloorPlan = new SNI.HGTV.Classes.FloorPlan(config)
     *              }
     *          }
     *      }
     * };
     *
     * myFloorPlanModule.init({
     *     id: "6030516",
     *     floorPlanToggler: ".floor-plans .fp-toggler",
     *     displayItems: [
     *         {
     *             id: "2539994",
     *             title: "floor 1",
     *             image: "http://img.hgtv.com/HGTV/2010/08/20/DH2011_Floorplan-2_s4x3_lead.jpg",
     *             description: ""
     *         },
     *         {
     *             id: "2539995",
     *             title: "floor 2",
     *             image: "http://img.hgtv.com/HGTV/2010/08/20/DH2011_Floorplan-1_s4x3_lead.jpg",
     *             description: ""
     *         }
     *     ]
     * });
     *
     */
    SNI.HGTV.Classes.FloorPlan = function (config) {
        var _self = this, width, _runOnce;

        /* 3 because we have 2 empty holders at the start and end */
        width = (config.displayItems.length + 3) * 426;

        // might be useful in the future if you want to keep a list of FloorPlans on a single page
        _self.id = config.id;

        // set up hot spot first since the proceeding call results in calling
        // setUpItem for the first item to be displayed
        _self.imageData = config.imageData;

        // if the user clicks on a hot spot from a previous page, the url params might contain useful information
        // to help us select the floor and room
        if(config.roomSelectConfig) {
            _self.roomSelectConfig = config.roomSelectConfig;
            $.each(config.displayItems, function (index, value) {
                if(this.id == config.roomSelectConfig.floorId && index == config.roomSelectConfig.floorIndex) {
                    // once this function runs, it kills itself
                    _runOnce = function () {
                        // unbind function from event
                        $(SNI.Config.FloorPlan.container).unbind("FP_IMG_LOADED", _runOnce);
                        _self.goToFloor(_self.roomSelectConfig.floorIndex);
                    };
                    // subscribe to custom event when image finishes loading to prevent race condition
                    // using SNI.Config.FloorPlan.container because _self.$container is not set yet until we call the super Class' constructor
                    // but we need to bind the event before anything executes
                    $(SNI.Config.FloorPlan.container).bind("FP_IMG_LOADED", _runOnce);
                    return false;
                }
            });
        }

        // this.super() equivalent
        // the super call will trigger the following:
        // apply hot spot to first image, set up dom events, etc...
        _self = SNI.HGTV.Classes.Gallery.call(_self, config);
        // adjust the width of the stage for the sliding effect

        _self.$stage.css({width: width + "px"});
        return _self;
    };
    /**
     * Applies hot spots, uses {@Link SNI.Widgets.ToolTip#.hoverTip} to apply the hover effect
     * @param {object} item image data object to apply hot spots to
     *
     */
    SNI.HGTV.Classes.FloorPlan.prototype.applyHotSpots = function (item) {
        var _self = this, currentItem, currentRoomId = (_self.roomSelectConfig && _self.roomSelectConfig.roomId ? _self.roomSelectConfig.roomId : false);

        currentItem = item || _self.displayItems[_self.currentIndex];
        currentItem.setHotSpots = true;

        $(_self.imageData).each(function () {
            var imageDataObj = this, $floorPlanEl;

            $floorPlanEl = currentItem.$displayElement.find(".fp-floor-plan");

            if (imageDataObj.id === currentItem.id) {
                var eachFunction = function () {
                    var hotSpot = this, $hotSpotEl;

                    /*
                     hot spots are returned in percentages, transforming into actual pixels based on the
                     floor plan's height and width of the picture, currently width: 400, height: 300
                     */
                    $hotSpotEl = $("<div class=\"fp-hot-spot-wrapper"
                            + (hotSpot.id == currentRoomId ? " tool-tip-current-room" : "")
                            +"\" id=\"hot-spot-"
                            + hotSpot.id
                            + "\"><a href=\""
                            + hotSpot.url
                            + "#floorId|"
                            + currentItem.id
                            + "/floorIndex|"
                            + _self.currentIndex
                            + "/roomId|"
                            + hotSpot.id
                            + "\" alt=\""
                            + hotSpot.name
                            + "\">"
                            + "<div class=\"fp-hot-spot\"><div class=\"fp-tool-tip-trigger\"></div><div class=\"fp-tool-tip"
                            + (hotSpot.id == currentRoomId ? " fp-current-room" : "")
                            + "\">"
                            + hotSpot.name
                            + "</div></div></a></div>")
                            .appendTo($floorPlanEl);

                    // selectClass = "";
                    $hotSpotEl.click(function () {
                        SNI.HGTV.Omniture.HotSpotClick({name: hotSpot.name, description: _self.id, marketplaceId: ""}, "c");
                    });
                    
                    // the numbers used below is a translation of the % to actual pixel value + offset
                    // 12px offset to center the image to the given coordinates
                    $($hotSpotEl).css({
                        top: ((300 * (hotSpot.hotspotYPercent / 100)) - 12) + "px",
                        left: ((400 * (hotSpot.hotspotXPercent / 100)) - 12) + "px"
                    }).mouseenter(function () {
                        // tool tip widget from SNI-CORE
                        if($(this).hasClass("tool-tip-current-room")) {
                            SNI.Widgets.ToolTip.hoverTip($floorPlanEl, {
                                triggerSelector: ".tool-tip-current-room",
                                tipSelector: "div.fp-tool-tip",
                                showClass: "show-tip",
                                showDelay: 250,
                                animateIn: "fadeIn",
                                animateInSpeed: "fast",
                                animateOut: "fadeOut",
                                animateOutSpeed: "fast"
                            });
                            $(this).removeClass("tool-tip-current-room").find(".fp-current-room").removeClass("fp-current-room");
                        }
                    });
                };
                $(imageDataObj.hotspots).each(eachFunction);
                // tool tip widget from SNI-CORE
                SNI.Widgets.ToolTip.hoverTip($floorPlanEl, {
                    triggerSelector: ".fp-hot-spot-wrapper:not(.tool-tip-current-room)",
                    tipSelector: "div.fp-tool-tip:not(.fp-current-room)",
                    showClass: "show-tip",
                    showDelay: 250,
                    animateIn: "fadeIn",
                    animateInSpeed: "fast",
                    animateOut: "fadeOut",
                    animateOutSpeed: "fast"
                });
                return false;
            }
        });
    };

    /**
     * Sets the item to active state also applies hot spots, removes loading status
     * @param item The display item to be made active
     *
     */
    SNI.HGTV.Classes.FloorPlan.prototype.activateItem = function (item) {
        var _self = this, currentItem;

        _self.$stage.find(".fp-active").removeClass("fp-active");

        currentItem = item || _self.displayItems[_self.currentIndex];


        // apply hot spots
        // use tool tip hover widget from sni-core
        if (_self.imageData && !currentItem.setHotSpots) {
            _self.applyHotSpots(currentItem);
        }

        _self.controls.$tableOfContent.find(".active").removeClass("active");


        // select TOC item to match current item
        _self.controls.$tableOfContent.find("button#fp-toc-" + currentItem.id).addClass("active");

        if(_self.currentIndex+1 >= _self.displayItems.length) {
            _self.controls.$nextButton.addClass("fp-next-button-disabled");
            _self.controls.$previousButton.removeClass("fp-previous-button-disabled");
        } else if(_self.currentIndex <= 0) {
            _self.controls.$previousButton.addClass("fp-previous-button-disabled");
            _self.controls.$nextButton.removeClass("fp-next-button-disabled");
        } else {
            _self.controls.$previousButton.removeClass("fp-previous-button-disabled");
            _self.controls.$nextButton.removeClass("fp-next-button-disabled");
        }

        currentItem.$displayElement.addClass("fp-active");

    };

    /**
     * Go to the floor provided by index
     * @param index the index of floor you want get
     * @param $tocItem and the table of content (jQuery object)
     */
    SNI.HGTV.Classes.FloorPlan.prototype.goToFloor = function (index, $tocItem) {

        var floorPlanGallery = this, itemsToJump;

//        console.log("===========")
//        console.log("has class", !floorPlanGallery.$stage.hasClass("fp-animating"));
//        console.log("length", floorPlanGallery.$stage.find(".fp-loading").length);
//        console.log("current index", this.currentIndex)
//        console.log("get index", index)
//        console.log("===========")

        if (!floorPlanGallery.$stage.hasClass("fp-animating") && floorPlanGallery.$stage.find(".fp-loading").length <= 0 ) {
//            console.log("pre cond")
            if (index != floorPlanGallery.currentIndex && floorPlanGallery.displayItems[index]) {
//                console.log("calls")
                // figure out if jump is left or right of the current item
                var direction = "+=";

                // todo: jump-to algorithm can probably be optimized

                itemsToJump = (Math.abs(index - floorPlanGallery.currentIndex) * 426);

                floorPlanGallery.controls.$tableOfContent.find(".fp-selected").removeClass("fp-selected");

                if($tocItem) {
                    $tocItem.addClass("fp-selected");
                } else {
                    floorPlanGallery.controls.$tableOfContent.find("button#fp-toc-" + floorPlanGallery.displayItems[index].id).addClass("active");
                }

                if (index > floorPlanGallery.currentIndex) {
                    direction = "-=";
                }

                // animate according to above
                floorPlanGallery.$stage.addClass("fp-animating");

                var $slider = floorPlanGallery.$stage.find(".fp-stage-slider");
                
                $slider.animate({left: direction + itemsToJump}, SNI.Config.animationSpeed, function() {
                    floorPlanGallery.get(index);
                    floorPlanGallery.$stage.removeClass("fp-animating");
                });

            }
        }
    };


    SNI.HGTV.Classes.FloorPlan.prototype.nextFloor = function () {
        var floorPlanGallery = this;
        if (!floorPlanGallery.$stage.hasClass("fp-animating") && floorPlanGallery.$stage.find(".fp-loading").length <= 0 && !floorPlanGallery.controls.$nextButton.hasClass("fp-next-button-disabled")) {
            if(floorPlanGallery.currentIndex >= 1) {
                floorPlanGallery.controls.$previousButton.removeClass("fp-previous-button-disabled");
            }
//            if (floorPlanGallery.currentIndex + 1 === floorPlanGallery.displayItems.length) {
//                floorPlanGallery.controls.$nextButton.addClass("fp-next-button-disabled");
//                floorPlanGallery.$stage.css({left: "114px"});
//                floorPlanGallery.$stage.animate({left: "-340px"}, SNI.Config.animationSpeed, function() {floorPlanGallery.next();});
//            } else {

            floorPlanGallery.$stage.addClass("fp-animating");

            var $slider = floorPlanGallery.$stage.find(".fp-stage-slider");

            $slider.animate({left: "-=426"}, SNI.Config.animationSpeed, function () {
                floorPlanGallery.next();
                floorPlanGallery.$stage.removeClass("fp-animating");
            });

//            }
        }
    };

    SNI.HGTV.Classes.FloorPlan.prototype.previousFloor = function () {
        var floorPlanGallery = this, leftValue = (((floorPlanGallery.displayItems.length - 1) * 426) + 340) * (-1);
        if (!floorPlanGallery.$stage.hasClass("fp-animating") && floorPlanGallery.$stage.find(".fp-loading").length <= 0 && !floorPlanGallery.controls.$previousButton.hasClass("fp-previous-button-disabled")) {
            if(floorPlanGallery.currentIndex <= floorPlanGallery.displayItems.length-1) {
                floorPlanGallery.controls.$nextButton.removeClass("fp-next-button-disabled");
            }
//            if (floorPlanGallery.currentIndex === 0) {
//                floorPlanGallery.$stage.css({left: (leftValue - 426) + "px"});
//                floorPlanGallery.$stage.animate({left: leftValue + "px"}, SNI.Config.animationSpeed, function () {floorPlanGallery.previous();});
//            } else {

            floorPlanGallery.$stage.addClass("fp-animating");

            var $slider = floorPlanGallery.$stage.find(".fp-stage-slider");

            $slider.animate({left: "+=426"}, SNI.Config.animationSpeed, function () {
                floorPlanGallery.previous();
                floorPlanGallery.$stage.removeClass("fp-animating");
            });

//            }
        }
    };

//    SNI.HGTV.Classes.FloorPlan.prototype.selectRoom = function (selectRoomParam) {
//        var _self = this, currentItem;
//
//        if(selectRoomParam.floorIndex >= 0) {
//            this.goToFloor(selectRoomParam.floorIndex);
//            // do select room
//            setTimeout(function () {
//                _self.displayItems[selectRoomParam.floorIndex].$displayElement.find("#hot-spot-"+selectRoomParam.roomId).show();
//            }, 2000)
//        }
//    };


    var overrides =
        /**
         * @lends SNI.HGTV.Classes.FloorPlan.prototype
         *
         */
    {
        /**
         * Override of method from parent class {@link SNI.HGTV.Classes.Gallery#setUpItem} lazy loads the image as well as the next anticipated image to be shown
         * @param {object} item the item to set up, default to item indexed by currentIndex
         * @param {boolean} skipNext logical flag to stop recursive set up of items in advance
         */

        setUpItem: function (item, skipNext) {
            var _self = this, currentItem, $floorPlanImgEl, img;

            currentItem = item || _self.displayItems[_self.currentIndex];


            if (!currentItem.$displayElement) {

                // this.super() equivalent
                SNI.HGTV.Classes.Gallery.prototype.setUpItem.call(_self, currentItem);
                // lazy load image
                $floorPlanImgEl = currentItem.$displayElement.find(".lazy-load");

                if ($floorPlanImgEl.length > 0) {
                    currentItem.$displayElement.addClass("fp-loading")
                    img = new Image();

                    // execute rest after image finishes loading
                    $(img).load(function () {
                        $floorPlanImgEl.attr("src", img.src);
                        $floorPlanImgEl.removeClass("lazy-load");
                        if (skipNext !== true) {
                            _self.activateItem(currentItem);
                            $(SNI.Config.FloorPlan.container).trigger("FP_IMG_LOADED", [_self]);
                            if((_self.currentIndex + 1) <= _self.displayItems.length) {

                                _self.$stage.find(".fp-loading").removeClass("fp-loading");
                            }
                        } else {
                            // done loading
                            _self.$stage.find(".fp-loading").removeClass("fp-loading");
                        }

                    });
                    // load image
                    img.src = $floorPlanImgEl.attr("img-src");
                }
            } else if (skipNext !== true) {
                _self.activateItem(currentItem);
            }

            if (skipNext !== true && (_self.currentIndex + 1) < _self.displayItems.length) {
                _self.setUpItem(_self.displayItems[_self.currentIndex + 1], true);
            }
        },
        /**
         * Override of abstract method from parent class {@link SNI.HGTV.Classes.Gallery#bindEvents} Binds DOM events specific to this implementation
         * and to customize the animation.
         */
        bindEvents: function () {
            var floorPlanGallery = this;
//            console.log("bind events")
            floorPlanGallery.controls.$nextButton.bind(SNI.Config.FloorPlan.controls.nextButton.eventType, function () {
                floorPlanGallery.nextFloor();
            },true);

            floorPlanGallery.controls.$previousButton.bind(SNI.Config.FloorPlan.controls.previousButton.eventType, function () {
                floorPlanGallery.previousFloor();
            }, true);

            floorPlanGallery.controls.$tableOfContent.$tocItems.each(function (index) {
                // go to item selected from toc
                var $_tocItem = $(this);

                $_tocItem.bind(SNI.Config.FloorPlan.controls.tableOfContentItem.eventType, function () {
                    floorPlanGallery.goToFloor(index, $_tocItem);
                });
            });
        }
    };

    // FloorPlan extends a Gallery, with a set over overridden functions
    $.extend(SNI.HGTV.Classes.FloorPlan.prototype,
        SNI.HGTV.Classes.Gallery.prototype,
        overrides
    );


}(jQuery));