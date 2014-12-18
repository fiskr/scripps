/*
 * ======================================================================================== *
 * SniAds Library 
 * Version: 1.0.2
 * Development Build
 * Wed Oct 22 2014 at 12:28:44 GMT-0400 (EDT)
 * Provided by SNI Technical Ad Operations Group 
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Scripps Networks Interactive - Technical Ad Operations Group 
 * ======================================================================================== *
 */

/**
 * All polyfills should reside in this file.
 */

/**
 * Cross browser console support.
 */
 if(typeof window.console==='undefined'){window.console={};var types=['log','warn','dir','info','debug'];for(var i=0;i<types.length;i++){window.console[types[i]]=function(){return false;}}}

/**
 * Array.prototype.indexOf
 **/
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined');}
var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0;}
if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0;}}
for(;fromIndex<length;fromIndex++){if(this[fromIndex]===searchElement){return fromIndex;}}
return-1;};}


/**
 * classList Support
 */
 (function () {

 if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

 var prototype = Array.prototype,
     push = prototype.push,
     splice = prototype.splice,
     join = prototype.join;

 function DOMTokenList(el) {
   this.el = el;
   // The className needs to be trimmed and split on whitespace
   // to retrieve a list of classes.
   var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
   for (var i = 0; i < classes.length; i++) {
     push.call(this, classes[i]);
   }
 };

 DOMTokenList.prototype = {
   add: function(token) {
     if(this.contains(token)) return;
     push.call(this, token);
     this.el.className = this.toString();
   },
   contains: function(token) {
     return this.el.className.indexOf(token) != -1;
   },
   item: function(index) {
     return this[index] || null;
   },
   remove: function(token) {
     if (!this.contains(token)) return;
     for (var i = 0; i < this.length; i++) {
       if (this[i] == token) break;
     }
     splice.call(this, i, 1);
     this.el.className = this.toString();
   },
   toString: function() {
     return join.call(this, ' ');
   },
   toggle: function(token) {
     if (!this.contains(token)) {
       this.add(token);
     } else {
       this.remove(token);
     }

     return this.contains(token);
   }
 };

 window.DOMTokenList = DOMTokenList;

 function defineElementGetter (obj, prop, getter) {
     if (Object.defineProperty) {
         Object.defineProperty(obj, prop,{
             get : getter
         });
     } else {
         obj.__defineGetter__(prop, getter);
     }
 }

 defineElementGetter(Element.prototype, 'classList', function () {
   return new DOMTokenList(this);
 });

 })();
// Declare Google API object and cmd stack must be declared as globals.
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

// Define SniAds namespace
(function() {
    window.SniAds = window.SniAds || {};
})();

/**
 * A site agnostic JavaScript library for using DFP across SNI desktop and mobile websites. The primary goal of this library is to provide an easy to deploy solution to running ads across all SNI web properties while providing a common API for the sites. The library consists of a core module SniAds which all methods and submodules are namespaced under (this page) and a collection of sub-modules that provide more specific implementation methods.
 * @namespace
 * @author      Andy Hutchins (Ad Operations), Tom Humberg (WCM)
 * @version     1.0.2
 */
SniAds = (function() {
    "use strict";

    // queue for functions to call on libray ready.
    var _readyQueue = [];

    // SniAds.init() flag to prevent multiple calls
    var _initFlag = 0;

    // Library ready flag
    var _libraryReady = 0;

    // Object to hold public API methods
    var api = {};

    // The DFP environment being used.
    var _dfpEnv = "staging";

    /**
     * A custom exception for SniAds module
     * @param {String} message The custom error message.
     * alias SniAdsError
     * @memberOf! SniAds
     */
    api.SniAdsError = function(message) {
       this.message = message;
       this.name = "SniAdsError";
       this.toString = function() {
          return this.name + ": " + this.message;
       };
    };

    /*
     * Private Properties
     */

    /**
     * Current library version.
     * @private
     * @type {String}
     */
    var _version = "1.0.2";

    /**
     * Set of key-value pairs for given page. These values are extracted from the page via
     * mdManager and init function arguments. As a last resort, the library will attempt
     * to extract the minimum values required to form a valid hierarchy for defining slots.
     * @private
     * @type {Object}
     */
    var _kvp = {};

    /**
     * Configuration property for library. This will be populated using the external ads-config.js file
     * and any additional options passed through the init function.
     * @private
     * @type {Object}
     */
    var _cfg = {};

    /**
     * After initialization, will contain the ad hierarchy used in defining ad slots.
     * @private
     * @type {Object}
     */
    var _dfpHierarchy = "";

    /**
     * A subset and the full _kvp object with only key values used for targeting.
     * @private
     * @type {Object}
     */
    var _targetedKeyValues = {};

    /**
     * Array of dfp page tags found on the page.
     * @private
     * @type {Array}
     */
    var _pageTags = [];

    /**
     * The DFP network ID to use. This is set based on the environment configuration option.
     * Production: 109359770
     * Staging: 201823409
     * @private
     * @type {Array}
     */
    var _networkId = "";

    /**
     * List of defined ad slots.
     * @private
     * @type {Array}
     */
    var _definedSlots = {};

    /**
     * Return object size.
     * @param  {Object} obj
     * @private
     * @return {Number}     Size
     */
    var _objSize = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    /**
     * Validate argument type. Used to verify function arguments. Ensures arg exists and is proper type.
     * @param  {Mixed} arg  array of arguments.
     * @param  {String} type array of expected types.
     * @return {Boolean}
     */
    var _isValid = function(arg, type) {
        type = type.toLowerCase();
        if( typeof(arg) !== "undefined" && typeof(arg) === type ){
            // Validation passed.
            return true;
        }
        // Validation failed.
        return false;
    };

    /**
     * Private Methods
     **/

    /**
     * Loads key-value data from mdManager if available. All keys and values are lowercased.
     * @private
     * @return {void}
     */
    var _loadKeyValuesMdManager = function() {
        if( typeof(mdManager) === "undefined"){
            return {}; // return empty object if mdm missing.
        }

        if (mdManager && mdManager.getKeys) {
            var mdKeys = mdManager.getKeys();
            // lowercase each key and value and add to internal kvp object.
            for (var key in mdKeys) {
                var _key = key.toLowerCase();
                var _value = mdManager.getParameterString(key).toLowerCase();
                if (_key && _value) {
                    // update internal kvp if both are present or
                    _kvp[_key] = _value;
                }
            }
        } else {
            _kvp = {}; // If no mdManager, return empty object
        }

        return _kvp;
    };

    /**
     * Merge key value objects with the master internal KVP object. Duplicate keys will have their values updated.
     * @param  {object} kvp     The kvp object to merge with.
     * @param  {object} newKeys The new KVP object to merge.
     * @private
     * @return {object} The resulting merged KVP object.
     */
    var _mergeCustomKeyValues = function(kvp, newKeys){
        if (newKeys) {
            for (var newKey in newKeys) {
                if( typeof(newKeys[newKey]) === "string" && newKeys[newKey] !== null ){
                    kvp[newKey.toLowerCase()] = newKeys[newKey].toLowerCase();
                }
            }
        }
        return kvp;
    };

    /**
     * Gets the Criteo key-value set.
     * @return {(object|boolean)} Criteo flag object or false.
     */
    var _getCriteoFlags = function() {
        if( window.crtg_content && window.crtg_content.length ){
            var crtgObject = {}, current;
            // Parse string into object
            var parts = crtg_content.split("&");
            for (var i = 0; i < parts.length; i++) {
                current = parts[i].split("=");
                // We only want "on" flags
                if( current[1] == "1" ){
                    crtgObject[current[0]] = current[1];
                }
            }

            return crtgObject;
        } else {
            // Criteo not present
            return false;
        }
    };

    /**
     * Tries to get some key value data from the page itself without MDM or user provided data.
     * @return {object} A KVP object that can be merged with main set.
     */
    var _getPageKeyValues = function(){
        var kvp = {};

        // Get referrer
        kvp.referrer = ( document.referrer ) ? document.referrer : "";

        return kvp;
    };

    /**
     * Returns a KVP object of cookie values. The cookies list is set in the config.
     * @return {Object} An object of cookie keys and values.
     */
    var _getCookieData = function(){
        var data = {}, current;
        if( SniAdsConfig.hasOwnProperty("cookies") ){
            for (var i = 0; i < SniAdsConfig.cookies.length; i++) {
                current = _getCookieValue(SniAdsConfig.cookies[i]);
                if( current ){

                    // Adobe requires different targeting key than cookie. We alias it here. Both values are kept.
                    if( SniAdsConfig.cookies[i] === "aam_did" ){
                        data["aamId"] = current;
                    }
                    data[SniAdsConfig.cookies[i]] = current;
                }
            }
        }

        return data;
    };

    /**
     * Modify a value to be comptabible with the DFP requirements. Removes invalid character and encodes "safe" characters.
     * See: https://support.google.com/dfp_premium/answer/1697712?hl=en&ref_topic=4390040
     * @param  {String} val The string to clean.
     * @return {String}     The cleaned string.
     */
    var _cleanValue = function(val) {
        // Convert pipes and spaces to underscores
        val = val.replace(/\|/g, "_");
        val = val.replace(/\ /g, "_");
        val = val.replace(/\-/g, "_");

        // Strip out any other crap.
        val = val.replace(/\;/g, "");
        val = val.replace(/\&/g, "");

        var invalidChars = SniAdsConfig.invalidChars.split("");
        var encodeChars = SniAdsConfig.encodeChars.split("");
        var valChars = val.split("");
        var chars = []; // Final set of valid characters

        var arrLen = valChars.length;
        var curChar;
        for (var i = 0; i < valChars.length; i++) {
            curChar = valChars[i];

            // Check if invalid
            if( invalidChars.indexOf(curChar) === -1 ){

                // check if needs encoding
                if( encodeChars.indexOf(curChar) > -1 ){
                    // Needs escaping
                    chars.push(escape(curChar));
                } else {
                    // Valid and safe
                    chars.push(valChars[i]);
                }
            }
        }

        // join chars and return
        return chars.join("");
    };

    /**
     * Tries to read a cookie value from the current page.
     * @param  {String} key Cookie key to get.
     * @return {(String|Boolean)}     Cookie value or false if not found.
     */
    var _getCookieValue = function(key){
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };

    /**
     * Process KVP data that will be passed to DFP. This includes splitting search terms
     * into arrays, Handling site variances with key and values, Cleaning values for DFP.
     * If a value is missing after all checks, it will be set to an empty string. (During targeting, empty strings are ignored.)
     * @param {object} The current internal KVP object.
     * @private
     * @return {object} The processed KVP object. Values not part of the targeting set are left alone.
     */
    var _processKeyValue = function(kvp){
        var site = kvp.site; // Get the site
        var splitChar;
        var keySettings = SniAdsConfig.keySettings; // Ref to config settings
        var value; // hold value info during exceution of each key

        // Hotfix vgncontent key on FN which is just the section key. Normally, this
        // is handled in hierarchy, but on FN we dont use level 3 so we have to do this.
        // TODO: Put all these non-standard operations in one place. We need them unfortunately, but
        // having them together will be easier to manage.
        // Addded: Thu Sep 11 16:10:11 2014
        if( kvp.site === "food" && kvp.hasOwnProperty("section") ){
            value = kvp.section;
            kvp.vgncontent = _cleanValue(value);
        }

        // Handle HOME site values. Added: Wed Oct 15 10:30:30 2014
        var homeSiteValues = ["hgtv-com","hgtv-videos","hgtv-people","hgtv-photos","hgtv-search","hgtv_com","hgtv_videos","hgtv_people","hgtv_photos","hgtv_search"];
        if( homeSiteValues.indexOf(kvp.site) > -1 ){
            // we remap all these to just hgtv
            kvp.site = "hgtv";
        }

        /**
         * Process ingredient key value for Food.com hyper-targeting.
         * Not overridable.
         */
        value = ""; // clear value
         if( kvp.hasOwnProperty("ingredients") ){
             value = kvp.ingredients;
         }

         // For multi value keys, we split and pass up as array.
         // NOTE: To save space in ad request, we pass this up as "ing" instead of "ingredients"
         if( value.length > 0 ){
             var ingParts = value.split(",");
             kvp.ing = [];
             for (var i = 0; i < ingParts.length; i++) {
                kvp.ing.push(_cleanValue(ingParts[i]));
             }
         }

        /**
         * Process pagetype
         */
        value = ""; // clear value
        if( keySettings.override_pagetype.hasOwnProperty(site) ){ // is there a setting? then use that
            // Make sure it exists in the set
            if( kvp.hasOwnProperty(keySettings.override_pagetype[site]) ){
                value = kvp[keySettings.override_pagetype[site]]; // Then set the value
            }
        } else {
            //  For pagetype, we also try 'pagetype' then the less common 'type'
            if( kvp.hasOwnProperty("pagetype") ){
                value = kvp.pagetype;
            } else if( kvp.hasOwnProperty("type") ) {
                value = kvp.type;
            }
        }
        // clean and set value.
        kvp.pagetype = _cleanValue(value);

        /**
         * Process adkey1
         */
        value = ""; // clear value
        if( keySettings.override_adkey1.hasOwnProperty(site) ){ // is there a setting? then use that
            if( kvp.hasOwnProperty(keySettings.override_adkey1[site]) ){
                value = kvp[keySettings.override_adkey1[site]]; // Then set the value
            }
        } else {
            if( kvp.hasOwnProperty("adkey1") ){
                value = kvp.adkey1;
            }
        }
        kvp.adkey1 = _cleanValue(value);


        /**
         * Process keyword
         */
        value = ""; // clear value
         if( keySettings.override_keywords.hasOwnProperty(site) ){ // is there a setting? then use that
             if( kvp.hasOwnProperty(keySettings.override_keywords[site]) ){
                 value = kvp[keySettings.override_keywords[site]]; // Then set the value
             }
         } else {
             if( kvp.hasOwnProperty("keywords") ){
                 value = kvp.keywords;
             }
         }

         // Handle multiple keywords (comma-separated). Should be an array
         var kwParts = value.split(",");
         kvp.keyword = [];
        for (var i = 0; i < kwParts.length; i++) {
            kvp.keyword.push(_cleanValue(kwParts[i]));
        }

        /**
         * Process topic
         */
         value = ""; // clear value
         if( keySettings.override_topic.hasOwnProperty(site) ){ // is there a setting? then use that
             if( kvp.hasOwnProperty(keySettings.override_topic[site]) ){
                 value = kvp[keySettings.override_topic[site]]; // Then set the value
             }
         } else {
             if( kvp.hasOwnProperty("topic") ){
                 value = kvp.topic;
             } else if( kvp.hasOwnProperty("sponsorship") ) {
                value = kvp.sponsorship;
             }
         }
         kvp.topic = _cleanValue(value);

         // Pass unique flag value if topic/sponsorship is empty so we can target it these from DFP
         if( !kvp.topic){
            kvp.topic = "tandyjj";
         }

         /**
          * Process talentname
          */
          value = ""; // clear value
          if( keySettings.override_talentname.hasOwnProperty(site) ){ // is there a setting? then use that
              if( kvp.hasOwnProperty(keySettings.override_talentname[site]) ){
                  value = kvp[keySettings.override_talentname[site]]; // Then set the value
              }
          } else {
              if( kvp.hasOwnProperty("talentname") ){
                  value = kvp.talentname;
              }
          }

          kvp.talentname = _cleanValue(value);
          kvp.talentName = kvp.talentname; // Set to camelcase to match server setup

          /**
           * Process showname
           */
           value = ""; // clear value
           if( keySettings.override_showname.hasOwnProperty(site) ){ // is there a setting? then use that
               if( kvp.hasOwnProperty(keySettings.override_showname[site]) ){
                   value = kvp[keySettings.override_showname[site]]; // Then set the value
               }
           } else {
                if( kvp.hasOwnProperty("show_abbr") ){
                    value = kvp.show_abbr;
               } else if( kvp.hasOwnProperty("show_name")){
                    value = kvp.show_name;
               } else {
                value = "";
               }
           }
           // Pass up camelCased to match server setup
           kvp.showname = _cleanValue(value);
           kvp.showName = kvp.showname; // Set to camelcase also

           /**
            * Process uniqueid
            */
            value = ""; // clear value
            if( keySettings.override_uniqueid.hasOwnProperty(site) ){ // is there a setting? then use that
                if( kvp.hasOwnProperty(keySettings.override_uniqueid[site]) ){
                    value = kvp[keySettings.override_uniqueid[site]]; // Then set the value
                }
            } else {
                if( kvp.hasOwnProperty("uniqueid") ){
                    value = kvp.uniqueid;
                }
            }
            kvp.uniqueid = _cleanValue(value);

         /**
          * Process keyterm
          * This one is little different than the above and is not setup to be overridden at this point. The split character can be set though.
          */
         if (kvp.keyterm) {
             splitChar = " "; // space is default
             // Use custom split character from config if it is set.
             if( keySettings.keytermSplit.hasOwnProperty(site) ){
                 splitChar = keySettings.keytermSplit[site];
             }
             kvp.keyterm = kvp.keyterm.split(splitChar);

             // The keyterms need to be merged into the keyword value because many campaigns are using keywords instead of keyterms. The keyword key-value
             // does double-duty currently, but the plan is to change this.
             kvp.keyword = kvp.keyword.concat(kvp.keyterm);
         }

        // Return the modified kvp object
        return kvp;
    };

    /**
     * Find ad hook divs on the page. All slots must be set in SniAdsConfig.
     * @private
     * @return {Array} An array of slots found on page
     */
    var _findPageTags = function() {
        _pageTags = []; //Clear existing page tags
        var adSlots = SniAdsConfig.adSlots,
            len = adSlots.length,
            current;

        // Loop through each config ad slot and scan page.
        for (var i = 0; i < len; i++) {
            current = document.getElementById(adSlots[i].tag);
            if (current !== null && current.tagName === "DIV") {
                _pageTags.push(adSlots[i]);
            }
        }

        return _pageTags;
    };

    /**
     * Sets up targeting key-values for all ad units on the page. It only uses keys set in the config and ignores all other.
     * @param {object} slot The GPT slot object to apply targeting to
     * @param {object} kvp Key value object.
     * @private
     * @returns {object} GPT slot object with targeting applie
     */
    var _setSlotTargeting = function(slot, kvp) {
        var targetedKvp = {};
        for (var key in kvp) {
            key = key.toLowerCase();
            // Only apply if listed in targeting set and value is not empty
            if (SniAdsConfig.targetingKeys.indexOf(key) > -1 && kvp[key].length > 0 ) {
                googletag.cmd.push(function() {
                    slot.setTargeting(key, kvp[key]);
                });
                // Update internal set
                _targetedKeyValues[key] = kvp[key];
            }
        }

        SniAds.Event.publish("slotTargetingApplied", "argument 1 data", "argument 2 data");
        return slot;
    };

    /**
     * Set targeting key-value pairs on the pubads object so that it applies to all slots on a page.
     * @param {Object} kvp Key value object.
     */
    var _setPageTargeting = function(kvp) {
        // cleans all values that will be passed to DFP
        var curKey;
        for (var i = 0; i < SniAdsConfig.targetingKeys.length; i++) {
            curKey = SniAdsConfig.targetingKeys[i];

            // Clean strings
            if( typeof(kvp[curKey]) === "string" ){
                kvp[curKey] = _cleanValue(kvp[curKey]);
            }
        }


        googletag.cmd.push(function() {
            for (var key in kvp) {

                // These are handled differently, so we skip them.
                if( key !== "talentName" && key !== "showName"){
                    key = key.toLowerCase();
                }

                // Only apply if listed in targeting set and value is not empty
                if (SniAdsConfig.targetingKeys.indexOf(key) > -1 && kvp[key].length > 0 ) {
                    googletag.pubads().setTargeting(key, kvp[key]);

                    // Update internal set
                    _targetedKeyValues[key] = kvp[key];
                }
            }

            // We need to set category and vgncontent to level 2 and 3 respectively.
            var levels = _dfpHierarchy.split("/");

            // Grab the levels to put into category/vgncontent
            var _category = (typeof(levels[2]) !== "undefined" ) ? levels[2] : "";
            var _vgncontent = (typeof(levels[3]) !== "undefined" ) ? levels[3] : "";

            if( _category ){
                googletag.pubads().setTargeting("vgncontent", _category);
                _targetedKeyValues["category"] = _category;
            }

            if( _vgncontent ) {
                googletag.pubads().setTargeting("vgncontent", _vgncontent);
                _targetedKeyValues["vgncontent"] = _vgncontent;
            }
        });
    };


    /**
    * Sets up several internal event subscriptions that are used to keep internal data up to date. When a sub-module creates a new slot, for example, the root class will update the definedSlots object.
     * @return {void}
     */
    var _bindInternalEvents = function(){
        // Subscribe to new slot event.
        SniAds.Event.subscribe("_newSlotDefined", function(slotName, slot){
            // Add to defined slots if not exists already
            if( !_definedSlots.hasOwnProperty(slotName) ){
                _definedSlots[slotName] = slot;
            }
        });
    };

    /**
     * Contains all the hard-coded hierarchy overrides for several sites. Keeping these in one place should keep things cleaner.
     * @param {object} kvp The KVP set object to use. Typically the internal _kvp.
     * @return {(string|null)} Null if no override.
     */
    var _getHierarchyOverride = function(kvp) {
        // Hotfix for Food Network store page which use the category key: Fri Sep 12 14:13:28 2014
        if( kvp.hasOwnProperty("category") && kvp.category === "store" && kvp.site === "food"){
            // Store pages have a flat hierarchy so we just return the string now.
            return "/food/store";
        }

        // Hotfix for Food Network blog page which use the categorydspname key: Fri Sep 12 14:13:21 2014
        if( kvp.hasOwnProperty("categorydspname") && kvp.categorydspname === "blog" && kvp.site === "food"){
            // Store pages have a flat hierarchy so we just return the string now.
            return "/food/blog";
        }

        // Hotfix for CCTV Blogs. Added Tue Sep 16 12:21:47 2014
        if( kvp.hasOwnProperty("categorydspname") && kvp.categorydspname === "blog" && kvp.site === "cook"){
            return "/cook/blog";
        }

        // Hotfix for FN Recipe Box. Added Tue Sep 16 13:08:42 2014
        if( kvp.hasOwnProperty("categorydspname") && kvp.categorydspname === "myrecipebox" && kvp.site === "food"){
            return "/food/myrecipebox";
        }

        // Hotfix for HGTV blog pages which use the type key: Wed Oct  8 14:10:54 2014
        if( kvp.hasOwnProperty("type") && kvp.type === "blog" && kvp.site === "hgtv"){
            // Store pages have a flat hierarchy so we just return the string now.
            return "/hgtv/blog";
        }

        // Hotfix for HGTV Remodels blog pages which use the type key: Wed Oct  8 14:10:54 2014
        if( kvp.hasOwnProperty("type") && kvp.type === "blog" && kvp.site === "hgrm"){
            // Store pages have a flat hierarchy so we just return the string now.
            return "/hgrm/blog";
        }

        return null;
    };


    /**
     * Build the hierarchy that will be used to define ad slots with GPT library. If the values required for
     * slot definition are missing, try to determine from page via other methods.
     * @private
     * @return {void}
     */
    var _buildSlotHierarchy = function(id, kvp) {
        var previousLevel = ""; // keep track of previoud level to test for repeats.

        // Build hierarchy for use when defining ad slots.
        if( typeof(id) === "undefined" ){
            throw new api.SniAdsError("Missing DFP network ID.");
        }

        if( typeof(SniAdsConfig) === "undefined" ){
            throw new api.SniAdsError("SniAdsConfig missing.");
        }

        var cfgSections = SniAdsConfig.hierarchy_sections;

        // Check for site override set in config.
        if( SniAdsConfig.hierarchy_overrides.hasOwnProperty(kvp.site) ){
            // Use
            cfgSections = SniAdsConfig.hierarchy_overrides[kvp.site];
        }

        // Set DFP network as first section
        _dfpHierarchy = id;

        // IMPORTANT - This is not the same as the hierarchy config override above. These are hardcoded full hierarchies.
        // Checking for hard coded overrides. It method returns a string, use that as the hierarchy levels and return.
        var levelsOverride = _getHierarchyOverride(kvp);
        if( levelsOverride ){
            _dfpHierarchy += levelsOverride;
            return _dfpHierarchy;
        }

        // Setup level 1
        if( cfgSections.level1 ){
            if(kvp[cfgSections.level1]){
                _dfpHierarchy += "/" + _cleanValue(kvp[cfgSections.level1]);
            } else {
                if( SniAdsConfig.fillPartialHierarchy ){
                    // Fill missing sections if enabled
                    _dfpHierarchy += "/l1o";
                } else {
                    // By default, stop after last section
                    return _dfpHierarchy;
                }
            }

            previousLevel = kvp[cfgSections.level1];
        }

        // Setup level 2
        if( cfgSections.level2 && kvp[cfgSections.level2] !== previousLevel ){
            if( kvp[cfgSections.level2]){
                _dfpHierarchy += "/" + _cleanValue(kvp[cfgSections.level2]);
            } else {
                if( SniAdsConfig.fillPartialHierarchy ){

                    // Fill missing sections if enabled
                    _dfpHierarchy += "/l2o";

                } else {
                    // By default, stop after last section
                    return _dfpHierarchy;
                }
            }
            previousLevel = kvp[cfgSections.level2];
        }

        // Setup level 3
        if( cfgSections.level3 && kvp[cfgSections.level3] !== previousLevel ){
            if( kvp[cfgSections.level3]){
                _dfpHierarchy += "/" + _cleanValue(kvp[cfgSections.level3]);
            } else {
                if( SniAdsConfig.fillPartialHierarchy ){

                    // Fill missing sections if enabled
                    _dfpHierarchy += "/l3o";

                } else {
                    // By default, stop after last section
                    return _dfpHierarchy;
                }
            }
            previousLevel = kvp[cfgSections.level3];
        }

        // Setup level 4
        if( cfgSections.level4 && kvp[cfgSections.level4] !== previousLevel ){
            if( kvp[cfgSections.level4]){
                _dfpHierarchy += "/" + _cleanValue(kvp[cfgSections.level4]);
            } else {
                if( SniAdsConfig.fillPartialHierarchy ){
                    // Fill missing sections if enabled
                    _dfpHierarchy += "/l4o";
                } else {
                    // By default, stop after last section
                    return _dfpHierarchy;
                }
            }
            previousLevel = kvp[cfgSections.level4];
        }

        // Setup level 5
        if( cfgSections.level5 && kvp[cfgSections.level5] !== previousLevel ){
            if( kvp[cfgSections.level5]){
                _dfpHierarchy += "/" + _cleanValue(kvp[cfgSections.level5]);
            } else {
                if( SniAdsConfig.fillPartialHierarchy ){
                    // Fill missing sections if enabled
                    _dfpHierarchy += "/l5o";
                } else {
                    // By default, stop after last section
                    return _dfpHierarchy;
                }
            }
            previousLevel = kvp[cfgSections.level5];
        }

        return _dfpHierarchy;
    };

    /**
     * Define GPT ad slots using Google Publisher Tags.
     * @param  {String} hierarchy DFP hierarchy for current page.
     * @param  {Array} pageTags  DFP ad hooks found on the page that will have slots defined on them.
     * @private
     * @return {Object}          The defined slots with each slots tag as the key.
     */
    var _defineAdSlots = function(hierarchy, pageTags) {
        var currentAd, currentSlot, sizeMap = {};

        googletag.cmd.push(function() {
            for (var i = 0; i < pageTags.length; i++) {
                currentAd = pageTags[i];
                // Create size mapping array using GPT size map builder. This will be applied during slot definition.
                if( typeof(_cfg.breakpoints) !== "undefined" ){
                    if( currentAd.hasOwnProperty("mapping") ){
                        sizeMap[currentAd.tag] = googletag.sizeMapping() // Create new mapping object
                            .addSize(_cfg.breakpoints.xlarge, currentAd.mapping.xlarge)
                            .addSize(_cfg.breakpoints.large, currentAd.mapping.large)
                            .addSize(_cfg.breakpoints.medium, currentAd.mapping.medium)
                            .addSize(_cfg.breakpoints.small, currentAd.mapping.small)
                            .build();
                    }
                }

                // Check restrictions
                if( !SniAds.Restriction.isRestricted(currentAd.tag) ){
                    // Define a new slot and add id to internal _definedSlots
                    currentSlot = googletag.defineSlot(hierarchy, currentAd.sizes, currentAd.tag);

                    // Apply size mapping for this slot if one was made
                    if( typeof(sizeMap[currentAd.tag]) !== "undefined" ){
                        currentSlot.defineSizeMapping(sizeMap[currentAd.tag]);
                    }

                    // Add service
                    currentSlot.addService(googletag.pubads());

                    googletag.display(currentAd.tag);

                    // Add internal slot state
                    _definedSlots[currentAd.tag] = currentSlot;
                }
            }
        });

        return _definedSlots;
    };

    /**
     * Call refresh on defined ad slots that are not disabled for initial load. Any ad that is loaded at a later point is
     * blocked on initial load.
     * @private
     * @return {Void}
     */
    var _loadAds = function(){
        var slots;
        // loop over defined slots and refresh initial load
        googletag.cmd.push(function(){
            slots = _definedSlots;
            if( _objSize(slots) < 1 ){
                return;
            }
            var reloadSet = [];
            for( var slot in slots ){
                if( slots.hasOwnProperty(slot) ){
                    if( SniAdsConfig.blockInitialLoad.indexOf(slot) < 0 ){
                        reloadSet.push(slots[slot]);
                    }
                }
            }
            googletag.pubads().refresh(reloadSet);
        });

        return void(0);
    };

    /**
     * Enable the GPT service. Must be called before any use of the googletag service apis.
     */
    var _gptEnableServices = function(){
        googletag.cmd.push(function(){
            googletag.enableServices();
        });
    };

    /**
     * Set GPT configuration options based on configuration.
     * @private
     * @return {bool} [description]
     */
    var _gptApplySettings = function(){
        if( SniAdsConfig.gptSettings.collapseEmptyDivs ){
            googletag.cmd.push(function() {
                googletag.pubads().collapseEmptyDivs(true);
            });
        }

        if( SniAdsConfig.gptSettings.singleRequestMode ){
            googletag.cmd.push(function() {
                googletag.pubads().enableSingleRequest();
            });
        }

        if( SniAdsConfig.gptSettings.centerAds ){
            googletag.cmd.push(function() {
                googletag.pubads().setCentering(true);
            });
        }

        // Disable initial load.
        googletag.cmd.push(function() {
            googletag.pubads().disableInitialLoad();
        });

        return 1;
    };

    /**
     * Load the Google Publisher Tag API asynchronously.
     * @private
     * @return {bool}
     */
    var _gptLoad = function() {
        var gads = document.createElement("script");
        gads.async = true;
        gads.type = "text/javascript";
        var useSSL = "https:" == document.location.protocol;
        gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
        var node = document.getElementsByTagName("script")[0];
        node.parentNode.insertBefore(gads, node);

        return 1;
    };

    /**
     * Bind to GPT event linsteners.
     * @param  {string}   ev Event to bind to. Only "slotRenderEnded" supported by GPT API.
     * @param  {Function} cb Callback
     * @private
     * @return {void}
     */
    var _bindEvents = function(ev, cb){
        googletag.cmd.push(function(){
            googletag.pubads().addEventListener(ev, cb);
        });
        return void(0);
    };

    /**
     * Parse user provided config thruough init and set internal config.
     * @param  {Object} cfg
     * @return {Object} The configuration object.
     */
    var _parseConfig = function(cfg){
        if( cfg.hasOwnProperty("breakpoints") ){
            _cfg.breakpoints = cfg.breakpoints;
        }
        if( cfg.hasOwnProperty("customKeys") ){
            _cfg.customKeys = cfg.customKeys;
        }

        if( cfg.hasOwnProperty("dfpEnv") ){
            _cfg.dfpEnv = cfg.dfpEnv;
        }

        if( cfg.hasOwnProperty("enableRepeatBigbox") ){
            if( typeof(cfg.enableRepeatBigbox) === "object" ){
                // config options were provided
                _cfg.enableRepeatBigbox = cfg.enableRepeatBigbox;
            } else {
                // Enabled with defaults
                _cfg.enableRepeatBigbox = true;
            }
        }

        return _cfg;
    };

    /**
     * Get a url query string parameter by name.
     * @param  {string} name
     * @return {(string|null)}
     */
    var _getQueryParameter = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    /**
     * Exceuted the ready queue in sequence (FIFO - First In First Out)
     * @return {Boolean}
     */
    var _executeReadyQueue = function(){
        // Run any deferred functions
        var dLen = _readyQueue.length;
        if( dLen > 0 ){
            for (var i = 0; i < dLen; i++) {
                _readyQueue[i].call();
            }
            // set queue to empty array.
            _readyQueue = [];

            // set the flag. so that future ready call will be exceuted immediately.
            _libraryReady = 1;
        }
    };

    var _selectElement = function(selector){
        var s = selector;
        var el;

        // First strip . and # in case jQuery syntax was used
        s = selector.replace(".", "");
        s = s.replace("#", "");
        s = s.trim();

        // try to select class
        el = document.getElementsByClassName(s);
        if(el.length){
            // return first found element if found
            return el[0];
        }

        // try for id
        el = document.getElementById(s);
        if( el ){
            return el;
        }

        return false;
    };

    /**
     * Determine the environment to use for DFP based on the config file. This will process the global environment
     * setting as well as any site specific settings. This sets the internal environment variable and the DFP network id for future use.
     * This should be called after all KVP processing is complete.
     * @param {object} kvp The current KVP set object
     * @return {string} The DFP environment.
     */
    var _setDfpEnvironment = function(kvp) {
        // Initialize to the general setting.
        _dfpEnv = SniAdsConfig.env;


        if( typeof(kvp) !== "object" || !kvp.hasOwnProperty("site") ){
            // If no KVP or no site value we default to to the master config
            _dfpEnv = "staging";
            return "staging";
        }

        // get site value.
        var site = kvp.site;

        if( SniAdsConfig.envSite.hasOwnProperty(site) ){
            // A site override is present
            _dfpEnv = SniAdsConfig.envSite[site];
        }

        // Was dfpEnv passed in the init call?
        if( _cfg.hasOwnProperty("dfpEnv") ){
            _dfpEnv = _cfg.dfpEnv;
        }


        // If its not production, its staging. This provides some protection against typos.
        if( _dfpEnv !== "production" ){
            _dfpEnv = "staging";
        }

        // Set network id based on the environment.
        _networkId = (_dfpEnv === "production") ? "109359770" : "201823409";

        return _dfpEnv;
    };

    /*======================================
    =            Public Methods            =
    ======================================*/

    /**
     * Initialize the SniAds library on a page.
     * @memberOf! SniAds
     * @alias init
     * @param  {Object=} cfg - A configuration object to modify how the library operates. Options are: `breakpoints` and `customKeys`.
     * @example
     * SniAds.Core.init({
     *   breakpoints: {
     *       "small": [width, height], // Mobile
     *       "medium": [width, height], // Phablet
     *       "large": [width, height], // Tablet
     *       "xlarge": [width, height] // Desktop
     *   },
     *   customKeys: {
     *       "key1": "value1", // will create new key1 if no exists
     *       "site": "foo" // will override mdManager site value
     *   }
     * });
     * @return {void}
     */
    api.init = function(cfg) {
        if( _initFlag ){
            // Prevent multiple init calls.
            return false;
        }
        _initFlag = 1; // Prevent aditional init calls.

        SniAds.Event.publish("initStart");

        // Setup internal events
        _bindInternalEvents();

        // Check for load testing UA substring and cancel if present.
        if (navigator.userAgent.indexOf("#sni-loadtest#") !== -1) {
            return void(0);
        }

        // set cfg if missing
        cfg = cfg || {};

        // Grab config options
        _cfg = _parseConfig(cfg);

        // Check for environment setting in init. Options are production or staging. If missing or some other value than "production", use staging.
        if( typeof(_cfg.dfpEnv) !== "undefined" ){
            if( _cfg.dfpEnv === "production" ) {
                SniAdsConfig.env = "production";
            } else {
                SniAdsConfig.env = "staging";
            }
        }

        /**
         * START KVP PROCESSING
         */

        // Load and process key values
        _kvp = _loadKeyValuesMdManager();

        // Add the regression flag if present or query string set to active
        if( window.sniads_regression_test || _getQueryParameter("sniads_regression_test") === "active" ){
            console.log("Regression Testing Mode Active");
            SniAds.Event.publish("debug_log", "Regression Testing mode enabled.");
            // Enabled regression test.
            _kvp.sniads_regression_test = "active";
        }

        // Add the regression flag if present or query string set to active
        if( _getQueryParameter("cs_debug") === "active" ){
            console.log("Creative Services Testing Mode Active");
            SniAds.Event.publish("debug_log", "Creative services debug mode on.");
            // Enabled regression test.
            _kvp.cs_debug = "active";
        }

        // Merge customKeys
        if( typeof(_cfg.customKeys) !== "undefined" ){
            _kvp = _mergeCustomKeyValues(_kvp, _cfg.customKeys);
        }
        // Get and merge any page data
        _kvp = _mergeCustomKeyValues(_kvp, _getPageKeyValues());
        // Get and merge any cookie data
        _kvp = _mergeCustomKeyValues(_kvp, _getCookieData());
        // Process key values and normalize for use in ad calls
        _kvp = _processKeyValue(_kvp);
        // Merge Criteo flags
        _kvp = _mergeCustomKeyValues(_kvp, _getCriteoFlags());

        /**
         * END KVP PROCESSING
         */

        // Set the DFP environment
        _setDfpEnvironment(_kvp);

        // Build slot hierarchy
        _dfpHierarchy = _buildSlotHierarchy(_networkId, _kvp);

        // Init restrictions
        SniAds.Restriction.init(_kvp);

        // Scan page for defined ad slots.
        _pageTags = _findPageTags();

        // Begin GPT process (Must happen before slot definition)
        _gptApplySettings();
        _gptEnableServices();

        // Set page level targeting
        _setPageTargeting(_kvp);

        // Define add slots with hierarchy and tags found on page.
        _defineAdSlots(_dfpHierarchy, _pageTags);

        // Trigger initial load of ads exluding any dynamic ads.
        _loadAds();

        // Load the GPT lib which will start everything up...
        _gptLoad();

        // GPT offers one event we can listen for. To make things simpler for users, we wrap it in the SniAds event system.
        _bindEvents("slotRenderEnded", function(slot){
            // wrap the single GPT event with our own event system to give a consistent API. Pass slot object
            SniAds.Event.publish("slotRenderComplete", slot);
        });


        // Handle repeating bigbox activation
        if( typeof(_cfg.enableRepeatBigbox) === "object" ){
            // Activate the repeating bigbox with config if needed.
            SniAds.River.repeatBigbox(_cfg.enableRepeatBigbox);
        } else if(_cfg.enableRepeatBigbox) {
            // Activate the repeating bigbox (default)
            SniAds.River.repeatBigbox();
        }

        // Wrapping our library ready publish in the google stack ensure any queued methods are all completed.
        googletag.cmd.push(function(){
            // Init completed
            SniAds.Event.publish("initComplete");

            // Run the queued functions
            _executeReadyQueue();
        });
        return void(0);
    };

    /**
     * Return current library version.
     * @memberOf! SniAds
     * @alias getVersion
     * @return {String}
    */
    api.getVersion = function() {
        if( typeof(_version) === "string" ){
            return _version;
        } else {
            return "";
        }
    };

    /**
     * Returns the current key values from internal state. This is based on mdManager values, any additional values passed through SniAds.init(), and any values the library extracted manually for required keys (minimum keys needed for defining an ad slots)
     * @memberOf! SniAds
     * @alias getKeyValues
     * @return {Object} Object of key values
     */
    api.getKeyValues = function() {
        return _kvp;
    };

    /**
     * Return a single targeting value by key from the internal key value object.
     * @function getValueByKey
     * @memberOf! SniAds
     * @alias getValueByKey
     * @param  {String} key A targeting key.
     * @return {String}     The value associated with the provided key.
     */
    api.getValueByKey = function(key) {
        key = key.toLowerCase();
        if (typeof(_kvp[key]) !== "undefined" && _kvp[key].length > 0) {
            return _kvp[key];
        } else {
            return null;
        }
    };

    /**
     * Return the DFP network id being used. This is detemined by the env setting in ads-config.js.
     * @memberOf! SniAds
     * @alias getNetworkId
     * @return {String} The DFP network idea.
     */
    api.getNetworkId = function() {
        return _networkId;
    };


    /**
     * Return the current value of the dfpEnv.
     * @return {string}
     */
    api.getEnvironment = function() {
        return _dfpEnv;
    };

    /**
     * Get the DFP hierarchy that was created from the page key values and is used in slot creation.
     * @example
     * SniAds.getDfpHierarchy(); // 123456/food/ssection/subsection
     * @alias getDfpHierarchy
     * @memberOf! SniAds
     * @return {String} The hierarchy string.
     */
    api.getDfpHierarchy = function() {
        return _dfpHierarchy;
    };

    /**
     * Get an object containing all GPT slots defined during page init.
     * @memberOf! SniAds
     * @alias getDefinedSlots
     * @return {Object} The GPT slot object.
     */
    api.getDefinedSlots = function() {
        return _definedSlots;
    };

    /**
     * A subset of the internal key values which only include keys in the targetingKeys setting in ads-config.js.
     * @memberOf! SniAds
     * @alias getTargetedKeyValues
     * @return {Object} The key-value pairs used for targeting.
     */
    api.getTargetedKeyValues = function(){
        return _targetedKeyValues;
    };

    /**
     * Get the slot configuration for a single DFP slot configuration by the tag name.
     * @example
     * var bigboxConfig = SniAds.getSlotConfig("dfp_bigbox");
     * @param  {String} tagName The tag name.
     * @alias getSlotConfig
     * @memberOf! SniAds
     * @return {(Object|Boolean)}         The slot object configuration if found. Otherwise, false.
     */
    api.getSlotConfig = function(tagName){
        if( typeof(tagName) !== "string" ){
            throw new api.SniAdsError("Invalid Argument: tagName must be a string.");
        }

        for (var i = 0; i < SniAdsConfig.adSlots.length; i++) {
            if( SniAdsConfig.adSlots[i].tag === tagName ){
                return SniAdsConfig.adSlots[i];
            }
        }
    };

    /**
     * Returns the current targeting applied at the page level.
     * @memberOf! SniAds
     * @alias getCurrentPageTargeting
     * @return {Object} An object of targeting objects.
     */
    api.getCurrentPageTargeting = function(){
        var pa = googletag.pubads();
        // GPT stores page level targeting on the pubads service. We can access this via the 'k' property on the object.
        return pa.k;
    };

    /**
     * Use the ready method to delay exceution until the core library has been initialized. Similar to jQuery's ready event. You may call this multiple times and the closures will be called in the order they were added. If library is already loaded, closure is invoked immediately.
     * @param  {function} func A function to call when core is ready.
     * @memberOf! SniAds
     * @alias ready
     * @example
     * // Initialize gallery on ready
     * SniAds.ready(function(){
     *     var cfg = {foo:bar} // your gallery settings.
     *     SniAds.Gallery.init(cfg);
     * });
     */
    api.ready = function(func){
        if( typeof(func) !== "function" ){
            throw new api.SniAdsError("Invalid or missing argument: SniAds.ready requires a single function as its argument.");
        }

        // If ready, just execute immediately.
        if( _libraryReady ){
            // Execute now
            func.call();
        } else {
            // Add to the stack
            _readyQueue.push(func);
        }
    };


    /**
    *
    * Core Module Methods
    * Added: Thu Aug 28 12:35:22 2014
    *
    **/
    /**
     * Get the GPT slot object by its tag name. This provides the GPT slot object used by the GPT SDK. If you need to use the GPT sdk directly, you will often need to have the slot object this provides.
     * @example
     * SniAds.getSlot("dfp_bigbox"); // Returns GPT object of type googletag.Slot for dfp_bigbox slot.
     * @param  {String} tagName     DFP slot tag. (Ex: dfp_bigbox)
     * @alias getSlot
     * @memberOf! SniAds
     * @return {(Object|boolean)}   googletag.Slot object. False if tag not found.
     */
    api.getSlot = function(tagName) {
        if( _isValid(tagName, "String") ){
            if( _definedSlots.hasOwnProperty(tagName) ){
                // return the slot object
                return _definedSlots[tagName];
            }
        } else {
            return false;
        }
    };

    /**
     * Makes a new request for the ad slot related to the tag name provided.
     * @param  {String} tagName     Slot tag name. (Ex. dfp_bigbox)
     * @throws {SniAds.SniAdsError} If tagName missing or invalid.
     * @alias refreshSlot
     * @memberOf! SniAds
     * @return {Boolean}            Returns false if slot fails.
     */
    api.refreshSlot = function(tagName) {
        if( _isValid(tagName, "String") ){
            var slot = api.getSlot(tagName);

            // Refresh using GPT
            if( slot ){
                googletag.cmd.push(function(){
                    googletag.pubads().refresh([slot]);
                    return slot;
                });
            }
        } else {
            return false;
        }
    };

    // Keeps track increment count of all slots that have been added via the appendSlot method. Note: this currently only
    // includes slots inserted using the core SniAds.appendSlot() method – not slots added using the River.appendSlot method.
    var _appendedSlotCounts = {};

    /**
     * Will append a new slot into the page based on an existing slot type. The slot name will increment
     * each time called on a single page load. For example, dfp_logo_1, dfp_logo_2. If you need to refresh a slot manually, you would use these.
     * @param  {String} target    A selector for the target container. This must be a single ID or class with no descendent selectors.
     * @param  {String} tagName   The type of ad slot to append. Ex: dfp_logo, dfp_bigbox, etc.
     * @param  {Object} targeting A key value object containing the targeting for this slot. These values will merge with the existing page targeting.
     * @param  {Boolean} preventLoad If true, the new slot will not render. If false or not set, the ad slot will load immediately.
     * @memberOf! SniAds
     * @alias appendSlot
     * @example
     * SniAds.appendSlot("target_el", "dfp_bigbox", {key:value,})
     * @return {(String|Boolean)} Returns the new slot name or false if failed.
     */
    api.appendSlot = function(target, tagName, targeting, preventLoad){
        preventLoad = preventLoad || false;

        // Check optional arguments
        if ( arguments.length === 3 && typeof targeting === "boolean" ) {
            // Targeting supplied
            preventLoad = targeting;
            targeting = null;
        }

        var tgtEl = _selectElement(target);
        var nextSlotId;
        var slotName;
        var newTargeting = null;

        targeting = targeting || null;

        if( !tgtEl ){
            return false;
        }

        // Grab the slot increment for this tagName if it exists. Otherwise start at 1.
        nextSlotId = ( _appendedSlotCounts.hasOwnProperty(tagName) ) ? _appendedSlotCounts[tagName] : 1;

        // build new slot name
        slotName = tagName + "_" + nextSlotId;

        // Append new slot element.
        var newEl = document.createElement("div");
        newEl.id = slotName;
        tgtEl.appendChild(newEl);

        if( targeting ){
            // We to process any targeting before creating the new slot.
            newTargeting = _processKeyValue(targeting);
        }

        // Increment the slot nextSlotId
        _appendedSlotCounts[tagName] = nextSlotId + 1;

        // Create slot
        googletag.cmd.push(function() {
            var slotCfg = api.getSlotConfig(tagName);
            var slot = googletag.defineSlot(_dfpHierarchy, slotCfg.sizes, slotName)
                .addService(googletag.pubads());

            // Apply targeting if we have some
            if( newTargeting ){
                _setSlotTargeting(slot, newTargeting);
            }

            // Display the slot
            if( !preventLoad ){
                // Load the slot
                googletag.display(slotName);
                googletag.pubads().refresh([slot]);
            }

            // Add internal slot state
            _definedSlots[slotName] = slot;
        });

        return slotName;
    };



    /**
     * If unit testing, expose internal methods also. utFlag should be set in test/SpecRunner.html
     */
    if( typeof(utFlag) != "undefined" ){
        api._buildSlotHierarchy = _buildSlotHierarchy;
        api._loadKeyValuesMdManager = _loadKeyValuesMdManager;
        api._mergeCustomKeyValues = _mergeCustomKeyValues;
        api._findPageTags = _findPageTags;
        api._setSlotTargeting = _setSlotTargeting;
        api._defineAdSlots = _defineAdSlots;
        api._gptLoad = _gptLoad;
        api._processKeyValue = _processKeyValue;
    }

    return api;
})();
/**
 * @description Provides some helpful utility functions for working with ads.
 * @namespace
 */
SniAds.Utility = (function(){
    var parent = SniAds; // Parent reference

/**
     * Return a simplified GPT url for ad, jump, click & raw html(adx) in an object.
     * @memberOf! SniAds.Utility
     * @param  {String} size A string of sizes in format: "300x250|300x600". Multiple sizes separated with pipes.
     * @return {Object}
     */
    var getSimplifiedUrlSet = function(size){
        var kvp = parent.getKeyValues();

        var urlSet = {};

        var useSSL = "https:" == document.location.protocol;
        url = (useSSL ? "https:" : "http:") + "//pubads.g.doubleclick.net/gampad";

        var targetString = "";
        targetString += "iu=/" + parent.getDfpHierarchy();
        targetString += "&sz=" + size;
        targetString += "&t=" + _buildSlotTargetingString(kvp);
        targetString += "&c=" + getCacheBuster();

        urlSet.ad = url + "/ad?" + targetString;
        urlSet.jump = url + "/jump?" + targetString;
        urlSet.click = url + "/click?" + targetString;
        urlSet.adx = url + "/adx?" + targetString;

        return urlSet;
    };


    /**
     * Return a single simplified GPT url for ad or jump or click or raw html(adx).
     * @memberOf! SniAds.Utility
     * @param  {String} size A string of sizes in format: "300x250|300x600". Multiple sizes separated with pipes.
     * @param  {String} type Type of simple url to get (ad,jump,click,adx);
     * @return {String} The single ad request URL
     */
    var getSimplifiedUrlSingle = function(size,type){
        var validTypes = ["ad","jump","click","adx"];

        if( validTypes.indexOf(type) == -1 ){
            throw new parent.SniAdsError("Invalid argument: type must be one of 'ad', 'jump', 'click', or 'adx'.");
        }

        var kvp = parent.getKeyValues();

        var urlSingle = "";

        var useSSL = "https:" == document.location.protocol;
        url = (useSSL ? "https:" : "http:") + "//pubads.g.doubleclick.net/gampad";

        var targetString = "";
        targetString += "iu=/" + parent.getDfpHierarchy();
        targetString += "&sz=" + size;
        targetString += "&t=" + _buildSlotTargetingString(kvp);
        targetString += "&c=" + getCacheBuster();

        urlSingle = url + "/" + type + "?" + targetString;

        return urlSingle;
    };

    /**
     * Get a cachbuster. Uses current millisecond timestamp.
     * @memberOf! SniAds.Utility
     * @return {string}
     */
    var getCacheBuster = function(){
        return Math.floor(Math.random() * 1000000);
    };

    /**
     * Create the targeting string in format needed by DFP simple url
     * @param  {Object} kvp The key value object to use.
     * @return {String}     The escaped and formatted targeting string.
     */
    var _buildSlotTargetingString = function(kvp){
        var targetingString = "";
        var targetedKvp = parent.getTargetedKeyValues();

        // Build targeting string
        for( var t in targetedKvp ){
            if( targetedKvp.hasOwnProperty(t) ){
                targetingString += encodeURIComponent(t) + "=" + encodeURIComponent(targetedKvp[t]) + "&";
            }
        }

        return encodeURIComponent(targetingString);
    };

    return {
        getSimplifiedUrlSet: getSimplifiedUrlSet,
        getSimplifiedUrlSingle: getSimplifiedUrlSingle,
        getCacheBuster: getCacheBuster
    };
})();
/**
 * @description Gallery sub-module. Provides support for running ads on gallery pages including standard bigbox and interstitials.
 * @namespace
 */
SniAds.Gallery = (function(){
    var _incrementCount = 1; // Start at 1 to avoid 0 % <any pos. number> === 0 situations.
    var _photoIndex = 0;
    var _bigboxRefreshCount = 0; // Count of bigbox refreshes.
    var _interstitialRefreshCount = 0; // Count of interstitial updates.
    var _timer; // interstitial timer object

    // Interstitial data. These default values should be overridden via the settings object passed to SniAds.Gallery.init()
    var _galCfg = {
        // The top level element for a gallery. When instersitial active, 'show-interstitial' class is added.
        // The site should use this to control how children elements display.
        container: ".photo-gallery",
        dismiss_elts: ".dismiss-el", // elements that will dismiss an interstitial (ex: skip ad)
        disable_elts: ".disable-el", // elements that will be disabled during interstitials (ex: next/previous controls)
        blockDelay: 10, // how may seconds disabled elements are disabled.
        syncSlot: "dfp_bigbox", // which slot needs to sync refresh with interstitial.
        interstitialSlot: "dfp_interstitial" // the interstitial slot to use
    };

    // internal variables
    var _descriptorData = {};
    var _kvp = SniAds.getKeyValues(); // get current page kvp via core module;
    var _hierarchy = SniAds.getDfpHierarchy(); // get hierarchy via core module
    var _slots = {}; // hold a reference to the on page slots
    var _ixSlot = {};

    /**
     * Add slot targeting. This is identical to the core method we should refactor to use that soon.
     * @param {string} slot The slot name. ie dfp_bigbox
     * @param {object} kvp  Key value object
     */
    var _setSlotTargeting = function(slot, kvp) {
        var targetedKvp = {};
        for (var key in kvp) {
            key = key.toLowerCase();
            if (SniAdsConfig.targetingKeys.indexOf(key) > -1) {
                googletag.cmd.push(function() {
                    slot.setTargeting(key, kvp[key]);
                });
            }
        }
        return slot;
    };


    /**
     * Check a block against page key-value data.
     * @param  {Object} block       A descriptor block object
     * @return {(Object|Boolean)}   Block object if match, or false.
     */
    var _testBlock = function(block){
        var blockKeys = block.keys;
        // Loop for common key
        for(var key in _kvp){
            if( blockKeys.hasOwnProperty(key.toLowerCase()) ){
                // Test values
                if( blockKeys[key] !== _kvp[key] ){
                    return false; // Match failed, break out immediately.
                }
            }
        } // end key loop

        // if we get here, than the block is a match. return it.
        return block;
    };

    // Check for cores support
    var _browserSupportsCors = function() {
        if ("withCredentials" in new XMLHttpRequest()){
            return true;
        }
        else if (window.XDomainRequest){
            console.log("IE9 Cors");
            return false;
        }
        else {
            return false;
        }
    };

    /**
     * Process descriptor config and update internal descriptor if needed.
     * @return {Object} The descriptor data.
     */
    var _processDescriptorConfig = function(){
        if( !_browserSupportsCors() ){
            // If no CORS just return the current default
            console.log("No CORS support");
            return _descriptorData;
        }

        // Grab the remote descriptor url.
        var descriptorFileUrl = SniAdsConfig.Gallery.photoDescriptorUrl;

        /**
         * Make an asynchronous regquest for the descriptor data file.
         */
            // Make XHR request for descriptor file.
            var oReqSuccess = function(){
                if( this.statusText !== "OK" ){
                    // Descriptor not found
                    return false;
                } else {
                    descriptorConfig = JSON.parse(this.responseText);

                    // Loop through the descriptor blocks
                    for (var i = 0; i < descriptorConfig.length; i++) {
                        if (_testBlock(descriptorConfig[i])) {
                            // If block passes, update internal descriptor data object.
                            _descriptorData = descriptorConfig[i].descriptor;
                        }
                    }

                    // Notify
                    SniAds.Event.publish("galleryConfigLoaded", _descriptorData);
                    return _descriptorData;
                }
            };

            var oReq = new XMLHttpRequest();
            oReq.onload = oReqSuccess;
            oReq.open("get", descriptorFileUrl, true);
            oReq.send();
    };

    /**
     * Called when a gallery navigation event is called. (next/previous)
     */
    var _galleryChanged = function(){
        // Make sure any interstitials are removed
        clearInterstitial();

        // Update both slots with the the photo count
        googletag.cmd.push(function() {

            _slots[_galCfg.syncSlot].setTargeting("photocount", _incrementCount);
            _slots[_galCfg.interstitialSlot].setTargeting("photocount", _incrementCount);
        });

        // Is it time for an interstitial?
        if( _descriptorData.piSlot.indexOf(_incrementCount) > -1 ){
            // Are they enabled by the descriptor?
            if( _descriptorData.active === "true" && _descriptorData.interstitial === "true"){
                _renderInterstitial();
            } else {
                console.log("Interstitial disabled.");
            }


            // Prevent bigbox refresh by short-returning function
            return false;
        }

        // Check for refresh. Offset by 1 so we refresh ON the refresh cycle not after.
        if( _incrementCount % _descriptorData.refreshRate === 0 ){
            if( _descriptorData.active === "true" ){
                _adRefresh();
            } else {
                console.log("Refreshes disabled");
            }
        }
    };

    /**
     * Refresh an ad.
     * @return {Boolean}
     */
    var _adRefresh = function(){
        var slots = SniAds.getDefinedSlots(); // grab reference to parent slots property

        // Incrememnt refresh count
        _bigboxRefreshCount++;
        googletag.pubads().refresh([slots[_galCfg.syncSlot]]);
        return 1;
    };

    // Helper functions
    var _selectElement = function(selector){
        if( typeof(selector) === "undefined"){
            return false;
        }

        var s = selector;
        var el;

        // First strip . and # in case jQuery syntax was used
        s = selector.replace(".", "");
        s = s.replace("#", "");
        s = s.trim();

        // try to select class
        el = document.getElementsByClassName(s);
        if(el.length){
            // return last element if more than one is found
            // Fixes HGTV issue using multiple class names.
            return el[el.length - 1];
        }

        // try for id
        el = document.getElementById(s);
        if( el ){
            return el;
        }

        return false;
    };

    var _addClass = function(selector, className) {
        var el = _selectElement(selector);

        if( el ){
            // try to deafult
            el.classList.add(className);
        }
    };

    var _removeClass = function(selector, className) {
        var el = _selectElement(selector);
        if( el ){
            el.classList.remove(className);
            return true;
        } else {
            return false;
        }
    };

    // Tests if element has a certain class. Selector can only be a single level class or id.
    var _hasClass = function( selector, className ) {
        target = _selectElement(selector);
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
    };

    /**
     * Will bind an event to the provided element and attach callback.
     * @param  {object}   element
     * @param  {string}   event
     * @param  {Function} callback
     * @return {(object|boolean)}            If successful, returns the DOM element. If failed, returns false.
     */
    var _bindEvent = function(element, myEvent, callback) {
        if( !element || typeof(element) !== "object" ){
            // Missing or invalid element.
            return false;
        }

        if( !callback || typeof(callback) !== "function"){
            // missing or invalid callback.
            return false;
        }

        if( !myEvent || typeof(myEvent) !== "string" ){
            // missing or invalid event.
            return false;
        }

        return ( element.addEventListener(myEvent, callback) ) ? element : 0;
    };

    /**
     * Render an interstitial ad into the interstitial slot and refresh the sync slot.
     * @return {Void}
     */
    var _renderInterstitial = function(){
        SniAds.Event.publish("interstitialStart");
        // Bind dismiss event and disable elements
        // _bindDismissElements();
        // _disableElements();

        _interstitialRefreshCount++;

        // Get the config to use for interstitial slots
        var slotCfg = SniAds.getSlotConfig("dfp_photo_interstitial");

        // Bind the dismiss controls (Need to fix)
        // $(_galCfg.dismiss_elts).bind("click", clearInterstitial);

        // Add show class
        _addClass(_galCfg.container, "interstitial-show");

        // Define and refresh interstitical and bibgox
        googletag.cmd.push(function(){
            var slotCfg = SniAds.getSlotConfig("dfp_photo_interstitial");
            googletag.display(_galCfg.interstitialSlot);

            // Refresh the interstitial and sync slot
            googletag.pubads().refresh([ _slots[_galCfg.interstitialSlot], _slots[_galCfg.syncSlot] ]);

            _startTimer();
        });
    };

    /**
     * Bind dismiss elements to clear the interstitial ad on click.
     * @return {void}
     */
    var _bindDismissElements = function(){
        var classes, els;
        // process the configuration
        classes = _galCfg.dismiss_elts.split(",");

        if( classes.length < 1 ){
            return false; // no classes found.
        }

        for (var i = 0; i < classes.length; i++) {
            el = _selectElement(classes[i]);

            if( el ){
                // We bind to both click and touch events to be sure we get any mobile events. There is no risk in running clearInterstitial
                // multiple times so this is OK. A better solution should be considered though.
                _bindEvent(el, "click", clearInterstitial);
                _bindEvent(el, "touchend", clearInterstitial);
            }
        }

        return void 0;
    };

    /**
     * Handles the interstitial timer. Countsdown from the seconds option passed in. Will fire events at each tick and at start and end. Calling it again will restart the timer.
     */
    var _startTimer = function(seconds) {
        var s = seconds || SniAdsConfig.Gallery.interstitialTimer;

        SniAds.Event.publish("interstitialTimerStart", s);

        function decrement(){
            s--;
            // Fire timer event
            SniAds.Event.publish("interstitialTimerUpdate", s);
            if( s === 0 ){
                SniAds.Event.publish("interstitialTimerEnd");
                clearInterval(_timer);
            }
        }

        // Start the timer...
        clearInterval(_timer); // clear interval
        _timer = 0;
        _timer = setInterval(decrement, 1000); // decrement once per second
    };

    var _clearTimer = function(){
        // Start the timer...
        clearInterval(_timer); // clear interval
        _timer = 0;
    };

    /**
     * Disables the elements in galleryCfg.disable_elts (should be CSS class) by applying disabled class and disabling click/touchend events.
     */
    var _disableElements = function(){
        var classes = _galCfg.disable_elts.split(",");
        var el;

        for (var i = 0; i < classes.length; i++) {
            el = _selectElement(classes[i]);

            _addClass(classes[i], "disabled");

            _bindEvent(el, "click", function(e){
                e.stopPropagation();
                return false;
            });
        }
    };

    /**
     * Disables the elements in galleryCfg.disable_elts (should be CSS class) by applying disabled class and disabling click/touchend events.
     */
    var _enableElements = function(){
        var classes = _galCfg.disable_elts.split(",");
        var el;

        for (var i = 0; i < classes.length; i++) {
            el = _selectElement(classes[i]);

            _removeClass(classes[i], "disabled");

            _bindEvent(el, "click", function(e){
            });
        }
    };

    /**
     * Gallery module init. Called by parent module init if on gallery apge.
     * @param  {Object} cfg Configuration object. Options include: descriptor and galleryCfg.
     * @example
     * SniAds.Gallery.init({
     *     descriptor: {
     *         "active": "true",
     *         "refreshRate": "4",
     *         "piSlot": [10, 20, 30],
     *         "toSlot": [10, 20, 30]
     *     },
     *     galleryCfg: {
     *         container: "gallery-wrap",
     *         dismiss_elts: "dismissEl",
     *         disable_elts: "disableEl",
     *         blockDelay: 10
     *     }
     * });
     * @memberOf SniAds.Gallery
     * @return {void}
     */
    var init = function(cfg){
        _cfg = cfg || {};

        _slots = SniAds.getDefinedSlots();

        // Set the default descriptor based on global ads-config.
        _descriptorData = SniAdsConfig.Gallery.photoDescriptorDefault;

        /**
         * If a descriptor was passed, update
         */
        if( _cfg.hasOwnProperty("descriptor") ){
            _descriptorData = _cfg.descriptor;
        }

        // Check for remote descriptor match and override if present. This is an AJAX call that will update the descriptor
        // object when it resolves. So, the first few gallery navigations could be using the default values. This is OK.
        _processDescriptorConfig();


        // Apply custom gallery configuration if passed in init method.
        if( cfg.hasOwnProperty("galleryCfg") ){
            _galCfg.descriptor = (cfg.galleryCfg.descriptor !== null) ? cfg.galleryCfg.descriptor : _galCfg.descriptor;
            _galCfg.container = (cfg.galleryCfg.container !== null) ? cfg.galleryCfg.container : _galCfg.container;
            _galCfg.dismiss_elts = (cfg.galleryCfg.dismiss_elts !== null) ? cfg.galleryCfg.dismiss_elts : _galCfg.dismiss_elts;
            _galCfg.disable_elts = (cfg.galleryCfg.disable_elts !== null) ? cfg.galleryCfg.disable_elts : _galCfg.disable_elts;
            _galCfg.syncSlot = (cfg.galleryCfg.syncSlot) ? cfg.galleryCfg.syncSlot : _galCfg.syncSlot;
            _galCfg.interstitialSlot = (cfg.galleryCfg.interstitialSlot) ? cfg.galleryCfg.interstitialSlot : _galCfg.interstitialSlot;
        }

        // Clear interstitial when timer ends.
        SniAds.Event.subscribe("interstitialTimerEnd", function(){
            _enableElements(); // enable control blocked when interstitial started.
        });

        googletag.cmd.push(function(){
            // Gallery Init completed
            SniAds.Event.publish("galleryInitComplete");
        });
    };

    /**
     * Set the slot that will be refreshed when an interstitial fires. Default is dfp_bigbox
     * @param {string} slotName Set the slot that will be refreshed when an interstitial fires.
     */
    var setSyncSlot = function(slotName) {
        if( typeof(slotName) === "string" ){
            _galCfg.syncSlot = slotName;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Set the slot that should be the interstitial slot. Only used if interstitial is appended after initial page load.
     * @param {string} slotName Set the slot that will be refreshed when an interstitial fires.
     */
    var setInterstitialSlot = function(slotName) {
        if( typeof(slotName) === "string" ){
            _galCfg.interstitialSlot = slotName;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Used to reset the gallery internal counts. Use this when a new gallery loads without a full page refresh.
     */
    var reset = function() {
        _incrementCount = 1; // Start at 1 to avoid 0 % <any pos. number> === 0 situations.
        _photoIndex = 0;
        _bigboxRefreshCount = 0; // Count of bigbox refreshes.
        _interstitialRefreshCount = 0; // Count of interstitial updates.

        // Reset any active timers
        _clearTimer();

        // Gallery Init completed
        SniAds.Event.publish("galleryResetComplete");
    };

    /**
     * Return an object containing the current state of the gallery module.
     * @return {Object}
     */
    var getState = function() {
        return {
            incrementCount: _incrementCount,
            bigboxRefreshCount: _bigboxRefreshCount,
            interstitialRefreshCount: _interstitialRefreshCount
        };
    };

    /**
     * Clear the interstitial if present
     */
    var clearInterstitial = function(){
        _clearTimer(); // clear timer

        _enableElements();
        // Dismiss interstitial
        googletag.cmd.push(function(){
            // Clear the interstitial slot
            googletag.pubads().clear([_slots[_galCfg.interstitialSlot]]);

            if( _hasClass(_galCfg.container, "interstitial-show") ){
                _removeClass(_galCfg.container, "interstitial-show");
                SniAds.Event.publish("interstitialClear");
            }
        });
        return false;
    };

    /**
     * Must be called by site during gallery next event
     * @memberOf SniAds.Gallery
     */
    var next = function(){
        _galleryChanged();
        _incrementCount += 1;
    };

    /**
     * Must be called by site during gallery prev event
     * @memberOf SniAds.Gallery
     */
    var previous = function(){
        _galleryChanged();
        _incrementCount -= 1;
    };

    /**
     * Getter
     * @return {Object}
     */
    var getDescriptorData = function(){
        return _descriptorData;
    };

    var getConfigData = function() {
        return _galCfg;
    };

    return {
        init: init,
        next: next,
        previous: previous,
        getDescriptorData: getDescriptorData,
        clearInterstitial: clearInterstitial,
        getConfigData: getConfigData,
        setSyncSlot: setSyncSlot,
        setInterstitialSlot: setInterstitialSlot,
        getState: getState,
        reset: reset
    };
})();
/**
 * @description Handles river (inifinite scroll) page ad functionality
 * @namespace
 */
SniAds.River = (function(){
    // Public API object
    var api = {};

    var _slotIncrement = 0;
    var _adRefreshCount = 0;
    var _kvp = SniAds.getKeyValues();
    var _refreshTimeDelay = SniAdsConfig.River.refreshTimeDelay || 1000;
    var _refreshRate  = SniAdsConfig.River._refreshRate || 2000;
    var _refreshAdCount = 0;

    /**
     * Create new slot name based on DFP tag name.
     * @param  {string} slot Slot name.
     * @param  {string} tag The ad tag to create an increment of. For instance, the if you need another bigbox, the tag would be "dfp_bigbox" and would generate a bfp_bigbox_1.
     * @return {string} The new ad slot id.
     */
    var _createNextSlot = function(tag){
        _slotIncrement++;
        var slotConfig = SniAds.getSlotConfig(tag);
        var slotName = slotConfig.tag + "_" + _slotIncrement;
        return slotName;
    };

    /**
     * Set the targeting for this slot.
     * @param {Object} slot A GPT slot object.
     * @param {Object} kvp  The key-value data set to use.
     */
    var _setSlotTargeting = function(slot, kvp) {
        var targetedKvp = {};
        for (var key in kvp) {
            key = key.toLowerCase();
            if (SniAdsConfig.targetingKeys.indexOf(key) > -1) {
                googletag.cmd.push(function() {
                    slot.setTargeting(key, kvp[key]);
                });
            }
        }
        return slot;
    };

    /**
     * Append a new slot to the page given a DOM element ID and ad slot type
     * @param  {String} target The id of the element to append the new slot to.
     * @param  {String} tag    The ad slot type to create (ex: dfp_bigbox)
     * @memberOf! SniAds.River
     * @return {String}        The name for the new slot.
     */
    api.appendSlot = function(target, tag){
        var slotConfig = SniAds.getSlotConfig(tag);

        if( !slotConfig ){
            throw new SniAds.SniAdsError("Invalid Ad Tag: Tag not configured in configurations.");
        }

        var newSlotName = _createNextSlot(tag);
        var newSlot;
        var targetEl = document.getElementById(target);
        var _hierarchy = SniAds.getDfpHierarchy();

        if( !targetEl ){
            throw new SniAds.SniAdsError("Invalid argument: Target element was not found.");
        }

        // Create and insert new slot hook
        var newSlotHook = document.createElement("div");
        newSlotHook.id = newSlotName;
        targetEl.appendChild(newSlotHook);

        googletag.cmd.push(function(){
            var newSlot = googletag.defineSlot(_hierarchy, slotConfig.sizes, newSlotName)
                .addService(googletag.pubads());

            // Apply targeting
            _setSlotTargeting(newSlot, _kvp);

            googletag.display(newSlotName);
            googletag.pubads().refresh([newSlot]);

            SniAds.Event.publish("_newSlotDefined", newSlotName, newSlot);
        });

        return newSlotName;
    };

    /**
     * Use to append a slot to the page that will automatically refresh based on the page scrolling. The
     * scrolling rate is a global ad ops setting. This should be used for simple setups. If a more controlled setup is required, you should use other methods to append and refresh slots.
     * @param  {String} target The id or class of the target element. The new slot will be appended to its content.
     * @memberOf! SniAds.River
     * @return {String}        New slot name.
     */
    api.appendAutoSlot = function(target){
        if( typeof(target) !== "string" ){
            throw new SniAds.SniAdsError("Invalid argument: target value must be a string.");
        }

        // Try to select target
        var targetEl = document.getElementById(target);

        if( !targetEl ){
            // target not found
            throw new SniAds.SniAdsError("Unfound: target div was not found in DOM.");
        }

        // Get new slot name from config or default to "dfp_bigbox_auto"
        var newSlotName = SniAdsConfig.River.refreshSlotName || "dfp_bigbox_auto";

        // Setup refresh based on page scroll position
        var doc = document.documentElement, body = document.body;
        var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
        var nextRefreshPoint = top + _refreshRate;
        var refreshTimeStamp = (new Date()).getTime() + _refreshTimeDelay;

        var _debounce = function(fn, delay) {
          var timer = null;
          return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
              fn.apply(context, args);
            }, delay);
          };
        };

        /**
         * Check if auto slot is in view.
         * @return {boolean} Return true if in view. Otherwise, false.
         */
        var _inView = function(){
            var slot = document.getElementById(newSlotName);
            if( !slot ){
                return false; // Slot not found.
            }

            // If slot or wrapper is fixed position, assume in view.
            if( slot.offsetTop >= 0 && slot.offsetTop <= 160 ) {
                // Element below view threshhold and fixed position. Assume in view.
                return true;
            }

            if( top > (slot.offsetTop + 160) ){
                return true;
            } else {
                return false;
            }
        };

        // by default we will use the bigbox slot settings.
        var slotConfig = SniAds.getSlotConfig("dfp_bigbox");
        var newSlotDiv = document.createElement("div");
        newSlotDiv.id = newSlotName;
        targetEl.appendChild(newSlotDiv);

        // Grab the hierarchy
        var _hierarchy = SniAds.getDfpHierarchy();

        var newSlot; // will hold the new slot

        // Create slot using GPT
        googletag.cmd.push(function(){
            newSlot = googletag.defineSlot(_hierarchy, slotConfig.sizes, newSlotName)
                .addService(googletag.pubads());

            // Apply kvp targeting data.
            _setSlotTargeting(newSlot, _kvp);

            // Notify about new slot. New slot name and slot object provided as args.
            SniAds.Event.publish("_newSlotDefined", newSlotName, newSlot);

            googletag.display(newSlotName);

            // Wait to refresh in the scroll handler which tests view position.
        });

        // Bind to scroll event and use _debounce to throttle callback firing.
        document.addEventListener("scroll", _debounce(function(){
            // Get the current scroll position (cross browser)
            top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);

            // Check if we reach refresh point.
            if( top > nextRefreshPoint ){
                if( _inView() ){
                    // Only refresh if in view
                    api.refreshSlot(newSlotName);

                    // Set next point and increment count
                    nextRefreshPoint += _refreshRate; // set next refresh point by adding rate

                    _refreshAdCount++; // update count
                }
            }
            // Publish event
            SniAds.Event.publish("debug_river", nextRefreshPoint, _refreshAdCount, top);
        }, 50));

        return newSlotName;
    };

    /**
     * Refresh the provided ad slot.
     * @param  {String} slot The slot tag to refresh. (Ex: dfp_bigbox)
     * @memberOf! SniAds.River
     */
    api.refreshSlot = function(slot){
        var slots = SniAds.getDefinedSlots();

        googletag.cmd.push(function(){
            googletag.pubads().refresh([slots[slot]]);
        });

        _adRefreshCount++;
        return _adRefreshCount;
    };

    /**
     * Insert bigbox in the right rail at set intervals (like a certain amount of scroll).
     * @param  {Object} options A configuration object used to override certain properties. Options are: `base`, `selector`, `adHeight` and `footerHeight`.
     * @example
     * SniAds.River.repeatBigbox({
     *   base: 700,
     *   selector: '.some-other-element',
     *   adHeight: 150,
     *   containerClass: 'class-names for-styling',
     *   footerHeight: 250
     * });
     * @memberOf! SniAds.River
     */
    api.repeatBigbox = function (options) {
        var $ = (jQuery && jQuery.fn) ? jQuery : ($ && $.fn) ? $ : false;

        if (!$) { return false; }

        var opts = options || {},
            maxScroll = 0,
            base = opts.base || 2000,
            adPlaced = 0,
            $window = $(window),
            selector = opts.selector || '.container-aside',
            $element = $(selector),
            elementHeight = $element.outerHeight(),
            containerClass = opts.containerClass || false,
            adHeight = opts.adHeight || 250,
            footerHeight = opts.footerHeight || $('.footer').outerHeight(),
            elementTop = (($element.length > 0) && $element.offset() && $element.offset().top) ? $element.offset().top : 0,
            elementOffset = elementTop + elementHeight - adHeight,
            bottomOffset = footerHeight + adHeight;

        //if no ad container or if CQ and mobile flag, disable repeating bigbox
        if (($element.length === 0) || ((typeof window.cqMobile !== 'undefined') && (window.cqMobile === true))) { return; }

        $window.bind('scroll', function () {
            if (lastFire && ((new Date()).getTime() < lastFire + 250)) { return; } //limit the frequency we're doing the perf-hogging stuffs below :)

            var repeatingBigbox,
                lastFire = (new Date()).getTime(),
                scrollLimit = $('body').outerHeight() - bottomOffset - elementTop - adHeight,
                windowScrollTop = $window.scrollTop(),
                scrollTop = windowScrollTop - elementOffset,
                adIncrement = (scrollTop / base).toFixed(),
                diff = adIncrement - adPlaced;


            if (scrollTop > maxScroll && windowScrollTop < scrollLimit) {

                maxScroll = scrollTop;

                if (adIncrement > adPlaced) {

                    for (var i = 0; i < diff; i++) {

                        repeatingBigbox = SniAds.appendSlot(selector, 'dfp_bigbox');

                        // Pubilsh new slot event
                        SniAds.Event.publish('_newSlotDefined', repeatingBigbox, SniAds.getDefinedSlots(repeatingBigbox));

                        adPlaced++;

                        $('#' + repeatingBigbox)
                            .css({
                                position: 'absolute',
                                top: (adPlaced * base) + elementHeight,
                                width: $element.width() + 'px'
                            })
                            .fadeIn()
                            .filter(function() {
                                return (containerClass && typeof containerClass === 'string');
                            }).addClass(containerClass);

                        // Make sure omniture
                        if( typeof(s) === 'object' && s.t ){
                            s.t();
                        }
                    }
                }
            }
        });
    };

    return api;
})();

/**
 * @description Iframe sub-module. Handles cross iframe requests.
 * @namespace
 */
SniAds.Iframe = (function(){
    var parent = SniAds;

    /**
     * A method that resizes a GPT ad slot to the sizes passed.
     * @param  {string} adId        The id attribute of the ad to resize. (i.e. dfp_bigbox)
     * @param  {number} width       The new iframe width.
     * @param  {number} height      The new iframe height.
     * @memberOf! SniAds.Iframe
     * @return {(object|boolean)}   Returns the ad iframe or false if not found.
     */
    var resize = function(adId, width, height){
        var adDiv, adFrame;
        if( !adId || typeof(adId) !== "string" ){
            throw new parent.SniAdsError("Invalid or missing argument: adId. Expected string.");
        }
        if( !width || typeof(width) !== "number" ){
            throw new parent.SniAdsError("Invalid or missing argument: width. Expected number.");
        }
        if( !height || typeof(height) !== "number" ){
            throw new parent.SniAdsError("Invalid or missing argument: height. Expected number.");
        }

        // Select the ad div.
        adDiv = document.getElementById(adId);

        if( adDiv ){
            adFrame = adDiv.children[0].children[0]; // The second child is always the iframe.
            if( adFrame.tagName === "IFRAME" ){
                if( width > 0 ) adFrame.width = width;
                if( height > 0 ) adFrame.height = height;
                // Ad iframe was found and resized.
                return adFrame;
            }
        } else {
            // Ad not found.
            return false;
        }
    };

    /**
     * Will resize the containing iframe to the width/height provided.
     * @param  {Number} height
     * @param  {Number} width
     * @return {Boolean} True if successful, otherwise false.
     */
    var resizeSlot = function(dfpIframeName, width, height) {
        // Validate
        if( !width || typeof(width) !== "number" ){
            throw new parent.SniAdsError("Invalid or missing argument: width. Expected number.");
        }
        if( !height || typeof(height) !== "number" ){
            throw new parent.SniAdsError("Invalid or missing argument: height. Expected number.");
        }

        // select the iframe from parent
        adFrame = document.getElementById(dfpIframeName);
        if( adFrame ){
            adFrame.width = width;
            adFrame.height = height;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Writes an HTML string into the ad slot element in the parent page.
     * @param  {string} adId        The id attribute of the ad to resize. (i.e. dfp_bigbox)
     * @param  {string} content     A string of HTML to be inserted.
     * @memberOf! SniAds.Iframe
     * @return {(object|boolean)}   A reference to the ad div or false if not found.
     */
    var escape = function(adId, content){
        var adDiv, domFrag;
        if( !adId || typeof(adId) !== "string" ){
            throw new parent.SniAdsError("Invalid or missing argument: adId. Expected string.");
        }
        if( !content || typeof(content) !== "string" ){
            throw new parent.SniAdsError("Invalid or missing argument: content. Expected string.");
        }

        adDiv = document.getElementById(adId);
        if( adDiv ){
            adEl = document.createElement("div");
            adEl.innerHTML = content;
            adDiv.appendChild(adEl);
        }

        return adDiv;
    };

    return {
        resize: resize,
        resizeSlot: resizeSlot,
        escape: escape
    };
})();
/**
 * @description Handles parsing and enforcement of ad restrictions configuration files.
 * @namespace
 */
SniAds.Restriction = (function(){
    // API object. Any functions on this will be public.
    var api = {};

    var _kvp;
    var _restricted;
    var _sizeOverrides;

    /**
     * Return object size.
     * @param  {Object} obj
     * @private
     * @return {Number}     Size
     */
    var _objSize = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };


    /**
     * Check a block against page data.
     * @param  {Object} block       A block object
     * @return {(Object|Boolean)}   BLock objet if match, or false.
     */
    var _testBlock = function(block){
        var blockKeys = block.keys;

        if( _objSize(blockKeys) < 1){
            return false; // block has not keys,
        }

        // Loop for common key
        for(var key in blockKeys){
            key = key.toLowerCase(); // force lower case on configured key
            // Check that is exists
            if( _kvp.hasOwnProperty(key) ){
                // Check values
                if( blockKeys[key] !== _kvp[key] ){
                    return false; // Match failed, break out immediately.
                }
            } else {
                // block key missing, failed match
                return false;
            }
        } // end key loop

        // if we get here, than the block is a match. return it.
        return true;
    };

    /**
     * Process the restrictions and return an array of restricted ad slots.
     * @param  {Object} kvp Key value object.
     * @return {Array}
     */
    var _processRestrictions = function(kvp){
        var restrictedBlocks = [], current;
        if( dfpAdRestrictions ){
            for (var i = 0; i < dfpAdRestrictions.length; i++) {
                current = dfpAdRestrictions[i];
                if( _testBlock(current) ){
                    // Set match, do we restrict or enable;
                    if( current.action === "restrict" ){
                        // add to restricted array
                        restrictedBlocks.push(current.tag);
                    } else if( current.action === "enable" ) {
                        // Remove from restricted array
                        var removeIndex = restrictedBlocks.indexOf(current.tag);

                        // Bug Fix: https://bitbucket.org/SniAdOps/sniads/issue/35/_processrestrictions-call-to-splice
                        if( removeIndex > -1 ){
                            restrictedBlocks.splice(removeIndex, 1);
                        }

                    } else {
                        throw new SniAds.SniAdsError("Invalid action setting in restrictions file.");
                    }
                }
            }
        }

        return restrictedBlocks;
    };

    /**
     * Process the slot size overrides and update the config object.
     * @param  {Object} kvp Key value object.
     * @return {Array}  an array of affected slot tags and their new sizes
     */
    var _processSizeOverrides = function(kvp){
        var current, affected = [];
        if( dfpSizeOverrides ){
            for (var i = 0; i < dfpSizeOverrides.length; i++) {
                current = dfpSizeOverrides[i];
                if( _testBlock(current) ){
                    // update the slot config
                    for (var k = 0; k < SniAdsConfig.adSlots.length; k++) {
                        if( SniAdsConfig.adSlots[k].tag === current.tag ){
                            // update slot config with override
                            SniAdsConfig.adSlots[k].sizes = current.sizes;
                            affected.push({
                                tag: SniAdsConfig.adSlots[k].tag,
                                sizes: SniAdsConfig.adSlots[k].sizes
                            });
                        }
                    } // end config loop
                } // end test block
            } // end override loop
        }

        return affected;
    };

    /**
     * Is this ad tag in the restricted list?
     * @param  {String}  slotTag The ad tag to test. This is the same as the div id value. Ex: dfp_bigbox
     * @memberOf! SniAds.Restriction
     * @return {Boolean}         True if restricted, otherwise false.
     */
    api.isRestricted = function(slotTag){
        if ( _restricted.indexOf(slotTag) > -1 ) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Returns an array of all currently restricted ad slots.
     * @return {Array} The array of slot name that are restricted
     */
    api.getRestricted = function(){
        return _restricted;
    };

    /**
     * Returns an array of slot configurations that were overridden during init based on the
     * size overide blocks in the ad restrictions file.
     * @return {array} Array of slot configuration objects
     */
    api.getSizeOverrides = function() {
        return _sizeOverrides;
    };

    /**
     * Initialize photo gallery adds.
     * @param {Object} Key value set to use.
     * @memberOf! SniAds.Restriction
     */
    api.init = function(kvp){
        _kvp = kvp;
        _restricted = _processRestrictions(_kvp);
        _sizeOverrides = _processSizeOverrides(_kvp);
    };

    return api;
})();
/**
 * @description Event submodule. A Publisher/Subscriber implementation for interacting with library events. The library provides core events that occur at key times during the execution. Sites may bind to these events using subscribe. A full list of the available events can be found in the wiki.
 *
 * Is based largely on the Amplify.js PubSub module (http://amplifyjs.com/api/pubsub/ for additional docs) and provides an identicial API.
 *
 * @namespace
 */


// Amplify 1.1.2
// Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
// Dual licensed under the MIT or GPL licenses.
// http://appendto.com/open-source-licenses

SniAds.Event = (function(){
    var api = {};
    var slice = [].slice;
    var subscriptions = {};
    var allEvents = [];

    /**
     * Publishes (fire) an event. Any subscriptions for the event will be notified.
     * @param  {Strong} topic The event name.
     * @memberOf! SniAds.Event
     * @return {Boolean}      True = event fired. False = event fire failed.
     */
    api.publish = function(topic){
        if ( typeof topic !== "string" ) {
            throw new SniAds.SniAdsError("You must provide a valid topic to publish.");
        }

        // Add to event list
        allEvents.push(topic);

        var args = slice.call( arguments, 1 ),
            topicSubscriptions,
            subscription,
            length,
            i = 0,
            ret;

        if ( !subscriptions[ topic ] ) {
            return true;
        }

        topicSubscriptions = subscriptions[ topic ].slice();
        for ( length = topicSubscriptions.length; i < length; i++ ) {
            subscription = topicSubscriptions[ i ];
            ret = subscription.callback.apply( subscription.context, args );
            if ( ret === false ) {
                break;
            }
        }
        return ret !== false;
    };

    /**
     * Subscribe to an published SniAds event.
     * @param  {String}   topic    Event to bind.
     * @param  {Object}   [context]  Context in which callback should execute.
     * @param  {Function} callback Function to execute when event fires.
     * @param  {Number}   [priority] If conflicts exists with another subscription, the sub with higher priority will take precedence. You are unlikely to have many conflicts, but if you do, try setting priority.
     * @memberOf! SniAds.Event
     * @return {Function}            Function that will be called when event is published. Any arguments the event provides will be passed to the callback function if arguments are set.
         */
    api.subscribe = function( topic, context, callback, priority ) {
        if ( typeof topic !== "string" ) {
            throw new SniAds.SniAdsError( "Must provide a valid topic to subscribe." );
        }

        if ( arguments.length === 3 && typeof callback === "number" ) {
            priority = callback;
            callback = context;
            context = null;
        }
        if ( arguments.length === 2 ) {
            callback = context;
            context = null;
        }
        priority = priority || 10;

        var topicIndex = 0,
            topics = topic.split( /\s/ ),
            topicLength = topics.length,
            added;
        for ( ; topicIndex < topicLength; topicIndex++ ) {
            topic = topics[ topicIndex ];
            added = false;
            if ( !subscriptions[ topic ] ) {
                subscriptions[ topic ] = [];
            }

            var i = subscriptions[ topic ].length - 1,
                subscriptionInfo = {
                    callback: callback,
                    context: context,
                    priority: priority
                };

            for ( ; i >= 0; i-- ) {
                if ( subscriptions[ topic ][ i ].priority <= priority ) {
                    subscriptions[ topic ].splice( i + 1, 0, subscriptionInfo );
                    added = true;
                    break;
                }
            }

            if ( !added ) {
                subscriptions[ topic ].unshift( subscriptionInfo );
            }
        }

        return callback;
    };

    /**
     * Unsubscribe a subscribed event from the stack.
     * @param  {String}   topic    The vent to unsubscribe from.
     * @param  {Object}   [context]  The context in which the callback should execute.
     * @param  {Function} callback Function to execute when the event fires.
     * @memberOf! SniAds.Event
     * @return {Void}
     */
    api.unsubscribe = function( topic, context, callback ) {
        if ( typeof topic !== "string" ) {
            throw new Error( "You must provide a valid topic to remove a subscription." );
        }

        if ( arguments.length === 2 ) {
            callback = context;
            context = null;
        }

        if ( !subscriptions[ topic ] ) {
            return;
        }

        var length = subscriptions[ topic ].length,
            i = 0;

        for ( ; i < length; i++ ) {
            if ( subscriptions[ topic ][ i ].callback === callback ) {
                if ( !context || subscriptions[ topic ][ i ].context === context ) {
                    subscriptions[ topic ].splice( i, 1 );

                    // Adjust counter and length for removed item
                    i--;
                    length--;
                }
            }
        }
    };

    /**
     * Returns a list of events available on this page load.
     * @return {Array} Array of event names.
     */
    api.getAllEvents = function(){
        return allEvents;
    };


    /**
     * Return the public API.
     */
    return api;
})();