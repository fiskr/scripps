if( typeof(SNI) === 'undefined' ) throw new Error('Required SNI module missing.');
if( typeof(SNI.Ads) === 'undefined' ) throw new Error('Required SNI.Ads module missing. ');
if( typeof(SNI.Ads.SafeFrame) === 'undefined' ) SNI.Ads.SafeFrame = {};

/**
 * @name SNI.Ads.SafeFrame
 * @author Andy Hutchins <ahutchins@scrippsnetworks.com>
 * @namespace SNI.Ads.SafeFrame
 * @description A wrapper module for SafeFrame rendering of ads on SNI sites. Provides an API for
 * interfacing with the SafeFrame Javascript library.
 */

/*===========================================
=            Internal Properties            =
===========================================*/
/**
 * SafeFrame flag - If true, ad library will try to render ads in SafeFrame.
 * @description By defult, SF is off. This property is used in the site ad libs to determine
 *              if an ad should render in a SafeFrame.
 * @type {Boolean}
 */
SNI.Ads.SafeFrame.enabled = false;

/**
 * Debug mode flag - If true, messages will be logged to browser console.
 * If ?sfdebug is in url, debug is enabled.
 * @type {Boolean}
 */
SNI.Ads.SafeFrame.debug = ( window.location.href.indexOf('sfdebug') >= 0 ) ? true : false;


/**
 * Profile Flag - If true, elapsed time will be logged for major processes
 * @type {Boolean}
 */
SNI.Ads.SafeFrame.profile = ( window.location.href.indexOf('sfprofile') >= 0 ) ? true : false;

/**
 * Flag to ensure we only init once.
 * @type {Boolean}
 */
SNI.Ads.SafeFrame.initialized = false;

/*========================================
=            Internal Methods            =
========================================*/

/**
 * Helper for console - If console not supported, method returns gracefully.
 * If using Chrome, additional styles are applied.
 * @param  {string} msg Message to log to console
 * @param  {string|undefined} [type] Must be one of browser basic console methods. (log|warn|info|error). If Chrome Browser, additional options are (success|warning|error|sfupdate).
 * @return {void}
 */
SNI.Ads.SafeFrame._log = function(msg, type){
    if( !this.debug ) {
        return false;
    }
    msg = msg || '';

    msg = "SafeFrame: " + msg; // prefix to allow filtering in console.
    type = type || 'log';

    // If Chrome, use style to highlight messages
    if ( window.navigator.userAgent.indexOf("Chrome")) {
        switch (type) {
            case 'success':
                console.log('%c ' + msg + ' ', 'background: #090; color: #fff; border:1px solid #000;');
                break;
            case 'warning':
                console.log('%c ' + msg + ' ', 'background: #ffe534; color: #000; border:1px solid #000;');
                break;
            case 'sfupdate':
                console.log('%c ' + msg + ' ', 'background: #ff970c; color: #000; border:1px solid #000;');
                break;
            case 'error':
                console.log('%c ' + msg + ' ', 'background: #900; color: #fff; border:1px solid #000;');
                break;
            default:
                console.log('%c ' + msg + ' ', 'background: #fff; color: #000; border:1px solid #000;');
                break;
        }
    } else {
        if (typeof(console) === 'object') {
            if (typeof(console[type]) === 'function') {
                console[type](msg);
            } else {
                // Fallback to log if type not supported
                console.log(msg);
            }
        }
    }

    return false;
};


/**
 * Measure elapsed time between start and stop. Used to monitor performance impact of notable SafeFrame processes.
 * @param  {string} label Label to use for time block. Will show in console with result.
 * @param  {string} mode  start|stop
 *
 * @example
 * // Start time
 * SNI.Ads.SafeFrame._profile('Example Time Profile', 'start');
 * // Stop
 * SNI.Ads.SafeFrame._profile('Example Time Profile', 'stop');
 *
 * @return {void}
 */
SNI.Ads.SafeFrame._profile = function(label, mode){
    if( !this.profile ){
        return false;
    }
    switch (mode){
        case 'start':
            console.time(label);
            break;
        case 'stop':
            console.timeEnd(label);
            break;
    }
};

/**
 * Check for SafeFrame dependencies - Page must have $sf module loaded.
 * @return {boolean}
 */
SNI.Ads.SafeFrame._hasDependencies = function() {
    if( typeof($sf) === 'undefined' ) {
        this._log('Safeframe: Dependency check failed!', 'error');
        return false;
    }
    if( typeof($sf.host) === 'undefined' ) {
        this._log('Safeframe: Dependency check failed!', 'error');
        return false;
    }

    this._log('Safeframe: Dependency check passed.');
    return true;
};

/**
 * Insert safeframe hooks into DOM. By doing this, we do not have to update the site templates to add
 * the HTML hooks. We just insert them on the fly.
 */
SNI.Ads.SafeFrame._addSafeFrameHooks = function(){
    // Initialize SafeFrame tags on the page by adding inside existing tags
    if( !$('#tgtSFBB').length ){
        $('#bigbox').html('<div id="tgtSFBB"></div>');
    }
};

/**
 * SafeFrame message callback. Used to capture messages from ads running in SafeFrames.
 * Viewability tracking will be available here.
 * @param  {string} id   SafeFrame ad ID. Used by SF lib to track positions.
 * @param  {string} msg  Message from SafeFrame rendered ad.
 * @param  {object} data Data from SafeFrame rendered ad. Viewability data is contained in here among other data. See SafeFrame spec for full listing.
 */
SNI.Ads.SafeFrame._onPosMsgCallback = function(id, msg, data){
    console.log(data);
    switch (msg){
        case 'geom-update':
            var perc = Math.round(data.self.iv * 100);
            var logMsg = 'In View: (' + id + ') ' + perc + '%';
            SNI.Ads.SafeFrame._log(logMsg, 'sfupdate');
            break;
        default:
            SNI.Ads.SafeFrame._log(id + ' : ' + msg, 'sfupdate');
            break;
    } // end switch
};


/**
 * Initial Safeframe setup. Initialize SafeFrame on current page and setup position config. For now,
 * just bigbox is supported. More adtypes will be added as needed.
 */
SNI.Ads.SafeFrame._doSafeFrameConfig = function(){
    // Create SF config object
    var self = this;

    // Set host configuration options.
    var conf = new $sf.host.Config({
        renderFile: "http://adimages.scrippsnetworks.com/ad_ops/safeframe/1-0-3/html/r.html", // static render file
        onPosMsg: SNI.Ads.SafeFrame._onPosMsgCallback, // SafeFrame message handler. All messages from SafeFrame containers pass through this.
        auto: false, // disable SafeFrame auto-render.
        // Setup the Safeframe positions
        positions: {
            "SFBB": {
                id: "SFBB", // ID for this position
                dest: "tgtSFBB", // ID of target DOM element
                w: 300, // initial width
                h: 250 // initial height
            }
        }
    });
};

/**
 * Test a single safeFrameEnable block. Block is true if all sub-items match.
 *
 * @example
 * // Example block
 * safeFrameEnable.push([
 *     { "key": "delvfrmt", "value": "ARTICLE_BUILDER_PHOTOGALLERY"}, // Article Photogallery Pages
 *     { "key": "deliverychannel", "value": "WEB"}, // Web channel
 * ]);
 *
 * @param  {array} block Array of objects containing mdManager key/value pairs to check.
 * @return {boolean}     Result of block. True is valid.
 */
SNI.Ads.SafeFrame._testBlock = function(block){
    this._profile('Block Test', 'start');

    if( typeof(mdManager) === 'undefined' )  {
        this._log('MDN Missing', 'error');
        return false; // If we can't access mdManager deafult to false and log error
    }

    var mdKeys = mdManager.getKeys(); // get the current mdManager keys

    // Looping over each safeFrameEnable block item.
    for (var i = block.length - 1; i >= 0; i--) {

        // Loop for common key
        for(var key in mdKeys){
            if( mdKeys.hasOwnProperty(key) ){
                if( key.toUpperCase() === block[i].key.toUpperCase() ){
                    // Common key found. Comparing values.
                    if( mdKeys[key][0].toUpperCase() !== block[i].value.toUpperCase() ){
                        this._profile('Block Test', 'stop');
                        // If match fails, then whole block is invalid and we can just return
                        return false;
                    } // end value check
                } // end key check
            }
        } // end key loop

    } // end block item loop
    this._profile('Block Test', 'stop');
    return true; // if we get here block is true
};

/**
 * Performs match tests against the object variable safeFrameEnable set in AdRestrictions.js file.
 * @return {void}
 */
SNI.Ads.SafeFrame._processAdRestrictionFile = function(){
    this._profile('Total Restriction Time', 'start');
    var blockResults = []; // Hold results for each enable block in adRestrictions. If any are true, then enable.
    var blockItemMatch; // Hold current value for each block as we test each subitem. Pushed to blockResults before next block checks begins. Set to true at start of each block.

    if( typeof(safeFrameEnable) !== "undefined" ){
        // Looping over each safeFrameEnable blocks
        for (var k = 0; k < safeFrameEnable.length; k++) {
            // Store block test result
            blockResults.push(this._testBlock(safeFrameEnable[k]));
        } // end block loop
    } // end safeFrameEnable typeof check

    this._profile('Total Restriction Time', 'stop');

    // If any block evaluates to true, enable SF.
    if( blockResults.indexOf(true) > -1 ){
        return true;
    } else {
        return false;
    }
};


/*======================================
=            Public Methods            =
======================================*/

/**
 * Perform initial SafeFrame setup. This may only run once. Additional calls will do nothing.
 */
SNI.Ads.SafeFrame.init = function(){
    if( !this.initialized ){
        this._profile('Total SF Init', 'start');

        var self = this;

        if( self.debug ){
            self._log("SafeFrame debug mode enabled");
        }

        // Make sure we have what we need
        if( self._hasDependencies() ){
            // Process SafeFrame config from AdRestriction
            this.enabled = SNI.Ads.SafeFrame._processAdRestrictionFile();

            if( this.enabled ){ this._log("Enabled", "success") }

            // Insert SF hooks into exsiting tags
            self._addSafeFrameHooks();

            // Prepare SafeFrame positions
            self._doSafeFrameConfig();

            this._log("Safeframe initialization complete.");

            this.initialized = true;
        }

        this._profile('Total SF Init', 'stop');
    }
};

/**
 * Will render a string of HTML into a SafeFrame.
 * @param  {string} html   String of escaped HTML.
 * @param  {integer|undefined} [width=300]  Width of ad. Width is optional.
 * @param  {integer|undefined} [height=600] Height of ad. Height is optional.
 * @return {boolean}
 */
SNI.Ads.SafeFrame.renderSyncBanner = function(html, width, height){
    // Default if no size provided.
    width = width || 300;
    height = height || 600;

    if( typeof(html) !== "string" ){
        this._log("SafeFrame.renderSyncBanner requires html string!", "error");
        return false;
    }

    this._log("SNI.Ads.SafeFrame.renderSyncBanner called.");
    this._addSafeFrameHooks(); // Just in case the hook was not inserted

    // Create new position object
    var sf_pos = new $sf.host.Position({
        id: "SFBB",
        html: html,
        w: width,
        h: height,
        supports: {
            "exp-ovr" : true, // Allow expand expansion over ads
            "exp-push": true // Allow push expanding ads (aka sidekicks)
        }
    });

    try {
        $sf.host.render(sf_pos);
    } catch(e) {
        this._log("SafeFrame rendering failed.", "error");
    }

    return true;
};

/**
 * Renders the adUrl into a SafeFrame.
 * @param  {string} adUrl Ad server url. Must be js.ng. Any html.ng will be changed to js.ng before used.
 * @param  {integer|undefined} [width=300]  Width of ad. Width is optional.
 * @param  {integer|undefined} [height=600] Height of ad. Height is optional.
 * @return {boolean}
 */
SNI.Ads.SafeFrame.renderAdsRemoteUrl = function(adUrl, width, height){
    // Default if no size provided.
    width = width || 300;
    height = height || 600;

    if( typeof(adUrl) !== "string" ){
        this._log("SafeFrame.render requires a valid adUrl!", "error");
        return false;
    }

    this._log("SNI.Ads.SafeFrame.renderAdsRemoteUrl called.");
    this._addSafeFrameHooks(); // Just in case the hook was not inserted
    // Ensure the adUrl is using js.ng
    adUrl = adUrl.replace("html.ng", "js.ng"); // SafeFrame requires doc-wrtten JS so we must use js.ng

    if( this.debug ){
        // Use dev ads server if in debug mode.
        // adUrl = adUrl.replace("adsremote", "devadsremote");
    }

    // Create new position object
    var sf_pos = new $sf.host.Position({
        id: "SFBB",
        html: "",
        src: adUrl,
        w: width,
        h: height,
        supports: {
            "exp-ovr" : true, // Allow expand expansion over ads
            "exp-push": true // Allow push expanding ads (aka sidekicks)
        }
    });

    try {
        $sf.host.render(sf_pos);
    } catch(e) {
        this._log("SafeFrame rendering failed.", "error");
    }

    return true;
};

/**
 * Determines if SafeFrame is enabled for page.
 * @return {Boolean}
 */
SNI.Ads.SafeFrame.isActive = function(){
    return this.enabled;
};