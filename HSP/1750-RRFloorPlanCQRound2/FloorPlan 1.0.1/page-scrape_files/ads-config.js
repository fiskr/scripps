/**
* SniAds Global Configuration
*
* Maintined by Technical AdOps Group
*
* Last Updated: Mon Oct 20 15:22:14 2014
**/

// Define SniAds namespace
(function() {
    window.SniAdsConfig = window.SniAdsConfig || {};
})();


/**
 * SniAds global configuration object. Maintained by Ad Operations Departments. Local site configuration can override
 * most values via SniAds.init(siteConfig). The library will ignore any settings that are not settable at the site level.
 * @namespace SniAdsConfig
 * @type {Object}
 */
SniAdsConfig = {
    /* DFP server to use. production|staging */

    /**
     * @property {string} env Determines which DFP network to use. Additional configurations are based on this. In
     * production, the Google Console is disabled and any logging or debugging functionality is removed.
     * @memberOf SniAdsConfig
     */
    "env" : "production",

    /**
     * Allows overriding the environment setting for a specific site value. Use the KVP value of site as the key. *Not the mdManager
     * value, but the value after SniAds has initialized and any value adjustments have occured. Sites will still need to use
     * the dfpEnv option in SniAds.init for additional environments like QA and Dev if they differ from the prod setting.
     *
     */
    "envSite": {
        "hgtv": "staging"
    },


    /**
     * If true, DFP will not count impressions. Useful for testing.
     * @todo Not implemented yet.
     */
    "noCount": false,

    /**
     * If true, the hierarchy will use the section placeholders (l1o, l2o, l3o, l4o, l5o) to fill out a complete hierarchy. By default, the ad unit will
     * terminate at the last available section.
     */
    "fillPartialHierarchy": false,

    /**
    * An array of any values that should be removed from any key values before slots are created. (ie Paula Deen)
    * Values will be replaced with jjydnat and have house ads targeted to it.
    * *** NOTE *** THIS IS CURRENTLY DISABLED ****
    **/
    "restrictedValues": ["paula dean", "pauladean", "paula_dean"],


    /**
     * Array of all key-values we are interested in for custom targeting. Some sites have a ton of data so we must limit what we use to a subset to avoid maxing out the ad call. The max character limit for a DFP ad url is 2,000 characters. Keys are case-insensitive.
     */
    "targetingKeys": ["pagetype", "uniqueid", "topic", "keyterm", "adkey1", "talentName", "showName", "keyword", "contenttag1", "contenttag2", "aam_did", "referrer", "category", "photocount", "vgncontent", "show_abbr", "sniads_regression_test", "ing", "scripps160", "scripps250", "scripps600", "scripps728", "aamid", "subsection1", "subsection2", "cs_debug"],

    /**
     * An array of cookies to read into KVP. If you want them to be targeted, set it in the targetingKeys array also.
     */
    "cookies": ["aam_did"],

    /**
     * Some sites handle multi word value differently. For DFP they must be converted to array. Set the split character for each site below.
     * As most sites use a space, that is the default. As a result, only sites not using spaces must be set here, but you may add all if you want.
     * While care has been taken to work out of the box, this allows control if needed.
     * When setting, key must match site key value. Eg: Food.com = foodcom
     */
    "keySettings": {
        "keytermSplit": {
            "foodcom": "-"
        },
        // The following allows overridding the key used for DFP keys. For example, if a site uses pageSearchTerms instead of keyterm, you can override the keyterm key to use the value of pageSearchTerms. NOTE: If you set a override, and the value does not exists, a blank value will be used. It will NOT revert to tryng the default.
        // DO NOT REMOVE ANY OF THESE
        // Ex: { "food": "newkey"} // use newkey instead of default key
        "override_pagetype": {},
        "override_adkey1": {},
        "override_keywords": {},
        "override_topic": {},
        "override_talentname": {},
        "override_showname": {},
        "override_uniqueid": {}
    },

    /**
     * DFP custom targeting values may not contain the following characters. During init, these are stripped out.
     */
    "invalidChars": "#\",*.()=+<>[]| ",

    /**
     * These charcters are "safe", but must be encoded before being use in DFP targeting.
     */
    "encodeChars": "$-_.",


    /**
     * Set GPT settings here.
     */
    "gptSettings": {
        "collapseEmptyDivs": true,
        "singleRequestMode": true,
        "centerAds": true
    },

    /**
     * Define all possible ad slots. This is used when scanning a page for the ad hooks. Every possible ad tag should be listed here.
     */
    "adSlots" : [
        {
            "tag": "dfp_bigbox",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_bigbox_2",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_bigbox_3",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_leaderboard",
            "sizes": [728, 90],
            "mapping":{
                "small": [320,50],  // small = ( phone )
                "medium": [728,90],   // medium = ( phablet )
                "large": [728,90],  // large = ( tablet )
                "xlarge": [728,90] // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_leaderboard_body",
            "sizes": [728, 90],
            "mapping":{
                "small": [320,50],  // small = ( phone )
                "medium": [728,90],   // medium = ( phablet )
                "large": [728,90],  // large = ( tablet )
                "xlarge": [728,90] // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_logo",
            "sizes": [1, 2]
        }, {
            "tag": "dfp_photo_interstitial",
            "sizes": [1, 3]
        },{
            "tag": "dfp_photo_interstitial_takeover",
            "sizes": [1, 7]
        }, {
            "tag": "dfp_sponsorship_module",
            "sizes": [300, 150]
        }, {
            "tag": "dfp_smartphone_banner",
            "sizes": [320, 50]
        }, {
            "tag": "dfp_smartphone_interstitial",
            "sizes": [[320,480],[480, 320]]
        }, {
            "tag": "dfp_pushdown_brandscape",
            "sizes": [[1, 5], [1, 14]]
        }, {
            "tag": "dfp_utility1",
            "sizes": [1, 6]
        }, {
            "tag": "dfp_utility2",
            "sizes": [1, 12]
        }, {
            "tag": "dfp_prog_bigbox",
            "sizes": [[300, 252],[300, 602],[300, 1052]],
            "mapping":{
                "small": [320,50],             // small = ( phone )
                "medium": [300,252],             // medium = ( phablet )
                "large": [[300,252],[300,602]],  // large = ( tablet )
                "xlarge": [[300,252],[300,602]]  // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_rsi_module",
            "sizes": [1, 9]
        }, {
            "tag": "dfp_rsi_result",
            "sizes": [1, 10]
        }, {
            "tag": "dfp_cartridge",
            "sizes": [1, 11]
        }, {
            "tag": "dfp_textlink",
            "sizes": [1, 11]
        }
    ],

    /**
     * An array of ads that should be blocked on initial page load.
     * @type {Array}
     */
    blockInitialLoad: ["dfp_photo_interstitial", "dfp_smartphone_interstitial"],

    /**
     * DFP Premium is based on the notion of ad unit hierarchies. The idea is for the levels to
     * map against a sites content hierarchy. The DFP network ID is always first and acts as level_0.
     * We can have up to five levels. Set the page data key to use for each level here.
     *
     * Level1 will aways be required and the library will make every effort to determine it if the datra is not accesible
     * via mdManager or SniAds.init arguments.
     *
     * Any missing data beyond level 1 will be ignored and the resulting hierarchy will stop at level1.
     *
     * Extreme care should be taken when editing this. Changes have the potential to break ad functionality across the
     * entire DFP platform. So, please be careful.
     *
     * *Important*
     * Because there is not a consistent standard for meta-data key-values across the sites, a site may need to set this during
     * library initialization to map to the correct site hierarchy. Only the levels that need to change must be set. The rest
     * will use the global defaults.
     *
     * @example Setting custom hierarchy during init.
     * var config = {
     *     hierarchy_sections: {
     *         "level1" : "customSiteKey",
     *         "level2" : "customSectionKey"
     *     }
     * }
     * Levels 3, 4, and 5 will use the global defaults set in the file.
     *
     */

    // Default hierarchy - Can be overridden using overrides below based on site value.
    "hierarchy_sections" : {
      "level1": "site",
      "level2": "categorydspname",
      "level3": "sctndspname",
      "level4": null,
      "level5": null,
    },

    "hierarchy_overrides": {
        "food": {
            "level1": "site",
            "level2": "section",
            "level3": null,
            "level4": null,
            "level5": null,
        },
        "rr": {
          "level1": "site",
          "level2": "section",
          "level3": "vgncontent",
          "level4": null,
          "level5": null,
        },
        "hgtv": {
          "level1": "site",
          "level2": "categorydspname",
          "level3": "sctndspname",
          "level4": "subsection1",
          "level5": "subsection2",
        }
    },

    /*=====================================================
    =            Photo Gallery Module Settings            =
    =====================================================*/

    "Gallery": {
       /**
        * Host server for descriptor file.
        * @type {string}
        */
      "photoDescriptorUrl": "http://code.adsales.snidigital.com/conf/ads-descriptors.js",

      /**
       * Timer in seconds for interstitial element disable.
       */
      "interstitialTimer": 5,

      /**
       * Default descriptor file.
       * @type {string}
       */
      "photoDescriptorDefault": {
          active        : "true",
          interstitial  : "true",
          refreshRate   : "2",
          intFreqCap    : "1999",
          toFreqCap     : "1999",
          globalSession : "yes",
          piSlot        : [3,7,11,15,25,33],
          toSlot        : [60,70,80]
      }
    },

    /*=============================================
    =            River Module Settings            =
    =============================================*/

   "River": {
        refreshRate: 2000, // Sets refresh rate for ad slots created with River.appendAutoSlot()
        refreshSlotName: "dfp_bigbox_auto", // Name to use for the refrehable ad slot.
        refreshTimeDelay: 10000 // Minimum time between ad refreshes (ignores refresh rate)
    },

    /*===========================================
    =            Responsive Settings            =
    ===========================================*/

    "Responsive": {
    }
};