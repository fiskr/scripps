/**
 * Created using IntelliJ IDEA.
 * User: 902635
 * Date: Nov 1, 2011
 * Time: 10:37:55 AM
 */



if( typeof(SNI) == "undefined" ) {
    /**
     * @namespace Container to hold JavaScript Objects and Classes related to Scripps Networks Interactive
     */
	SNI = {};
}
if( typeof(SNI.HGTV) == "undefined" ) {
    /**
     * @namespace Container for JavaScript Objects and Classes related to HGTV
     */
	SNI.HGTV = {};
}


if( typeof(SNI.HGTV.Classes) == "undefined" ) {
    /**
     * @namespace Container to hold JavaScript Classes related to HGTV
     */
	SNI.HGTV.Classes = {};
}

(function ($) {

    /**
     * @class Gallery is an abstract class to be used for modules that require a display of the
     * content using controls such as next, previous, or table of content.  It is not to be used on
     * it's own.
     *
     * @description
     * <p>Before you start using this class, please note a few assumptions were made:</p>
     * <ol>
     *  <li><strong>The developer will override the {@link SNI.HGTV.Classes.Gallery#bindEvents} and {@link SNI.HGTV.Classes.Gallery#setUpItem} methods</strong> (see {@link SNI.HGTV.Classes.FloorPlan} for example)</li>
     *  <li>All markup has to at least be contained in your specified container</li>
     *  <li>You have a staging area for displaying your items (config.stage)</li>
     *  <li>Markup for the first item is rendered during page load, before initialization of any Gallery or any of its
     *    sub-classes are instantiated, and be contained in the staging container</li>
     *  <li>If using startIndex, Gallery will skip setupItem and leave it up to the inheriting class to fulfill setupItem call </li>
     * </ol>
     * @constructor  creates an instance of a Gallery object
     * @this {Gallery}
     * @param {object} config The configuration for initialization of controls and display items
     * @example
     *
     * // extending from Gallery
     * function MyGallery () {
     *     // do some setting up work
     * }
     *
     *  // define functions that parent classe doesn't have
     * MyGallery.prototype.myGalleryCustomFunc = function () {
     *     // do some custom thing
     * }
     *
     * // override any functions that are being copied over from parent class
     * var overrides = {
     *     bindEvents: function () {
     *         // do some animation while we bind events to our controls
     *     },
     *     setUpItem: function () {
     *         // set up the item to display
     *         // can also call the parent class' setUpItem function by doing so:
     *         SNI.HGTV.Classes.Gallery.prototype.setUPItem.call(this);
     *     }
     * }
     *
     * // jQuery's way of object inheritance
     * $.extend(MyGallery.prototype,
     *     SNI.HGTV.Classes.Gallery.prototype,
     *     overrides
     * );
     *
     * 
     * // Example of config object
     *
     *   {
     *      container: ".gallery",
     *      stage: ".stage",
     *      displayItems: [
     *          {
     *               id: "12443545"
     *          },
     *          {
     *              id: "12443523"
     *          },
     *          {
     *              id: "12443234"
     *          },
     *      ],
     *      controls: {
     *          nextButton : {
     *              selector: ".next-button",
     *              eventType: "click"
     *          },
     *          previousButton : {
     *              selector: ".previous-button",
     *              eventType: "click"
     *          },
     *          tableOfContent : {
     *              selector: ".gallery-toc",
     *              eventType: "click"
     *          },
     *          tableOfContentItem : {
     *              selector: ".gallery-toc > li",
     *              eventType: "click"
     *          }
     *       }
     *   };
     *
     */

    SNI.HGTV.Classes.Gallery = function (config) {
        var _self = this;

        _self.config = config;
        _self.displayItems = config.displayItems;
        _self.$container = $(config.container);
        _self.$stage = _self.$container.find(config.stage);
        // if using startIndex, Gallery will skip setupItem and leave it up to the inheriting class to fulfill setupItem call
        _self.currentIndex = config.startIndex || 0;

        // get controls: next, previous, toc
        _self.controls = _self.getControls(config.controls);

        // set up first item
        if(_self.currentIndex == 0) {
            _self.setUpItem();
        }

        // bind all events
        _self.bindEvents();

        return _self;
    };

    /**
     * Traverse to the next item in the array of display items
     *
     * @this {Gallery}
     * @return {object} The next item to be displayed
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.next = function () {
        this.currentIndex = (this.currentIndex + 1) % this.displayItems.length;
        this.setUpItem();
        return this.displayItems[this.currentIndex];
    };

    /**
     * Traverse to the next item in the array of display items
     *
     * @this {Gallery}
     * @return {object} The previous item
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.previous = function () {
        this.currentIndex = (this.currentIndex - 1) < 0 ? this.displayItems.length - 1 : (this.currentIndex - 1) % this.displayItems.length;
        this.setUpItem();
        return this.displayItems[this.currentIndex];
    };

    /**
     * Traverse to the previous item in the array of display items
     *
     * @this {Gallery}
     * @param {number} index The index of the item to be retrieved
     * @return {object} The item retrieved based on the index
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.get = function (index) {
        this.currentIndex = index % this.displayItems.length;
        this.setUpItem();
        return this.displayItems[this.currentIndex];
    };

    /**
     * Traverse to the first in the array of display items
     *
     * @this {Gallery}
     * @return {object} The first item
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.first = function () {
        this.currentIndex = 0;
        this.setUpItem();
        return this.displayItems[0];
    };

    /**
     * Traverse to the last in the array of display items
     *
     * @this {Gallery}
     * @return {object} The last item
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.last = function () {
        this.currentIndex = this.displayItems.length - 1;
        this.setUpItem();
        return this.displayItems[this.currentIndex];
    };

    /* start: key functions to override */

    /**
     * Applies any implementation specific treatments to the item that is to be displayed.
     * This is a function you would most likely override as most of the heavy lifting such
     * as data retrieval, ad rules, and others would occur here.
     *
     * @this {Gallery}
     * @param item the item to apply treatment to
     **/
    SNI.HGTV.Classes.Gallery.prototype.setUpItem = function (item) {
        var _self = this, currentItem;

        currentItem = item || _self.displayItems[_self.currentIndex];

        if (!currentItem.$displayElement) {
            currentItem.$displayElement = _self.$stage.find("#" + currentItem.id);
        }
    };

    /**
     * Get the UI elements to let user interact with a gallery
     *
     * @this {Gallery}
     * @returns {object} an object literal containing jQuery DOM references retrieved from the control configs
     */
    SNI.HGTV.Classes.Gallery.prototype.getControls = function (controlSelectors) {
        var _self = this,
                controls = {
                    $nextButton: _self.$container.find(controlSelectors.nextButton.selector),
                    $previousButton: _self.$container.find(controlSelectors.previousButton.selector),
                    $tableOfContent: _self.$container.find(controlSelectors.tableOfContent.selector)
                };
        controls.$tableOfContent.$tocItems = _self.$container.find(controlSelectors.tableOfContentItem.selector);

        return controls;
    };

    /**
     * Abstract method to be overridden for event binding of your controls.  Also use this function to
     * do custom animations when transitioning from next, previous, or jump to any photo.
     *
     * @this {Gallery}
     *
     **/
    SNI.HGTV.Classes.Gallery.prototype.bindEvents = function () {
        // skeleton function
        return;
    };
    /* end: key functions to override */
}(jQuery));
