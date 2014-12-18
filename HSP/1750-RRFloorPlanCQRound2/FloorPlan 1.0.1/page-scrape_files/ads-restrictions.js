var dfpAdRestrictions = [];
var dfpSizeOverrides = [];

// Basic ad restriction file. All keys in a block must match for that block to pass and its action to apply. Note, the block order is important as a later block can operate on the same settings as an earlier one. General restriction blocks should come before specific ones.
//
// IMPORTANT: *** ALL KEYS AND VALUES MUST BE LOWER-CASED. ***

//IMPORTAN: *** ALWAYS USING SniAds.getKeyValues() IN CONSOLE FOR DETERMINE CORRECT VALES FOR ADDING NEW RESTRICTIONS

/*======================================
=            Size Overrides            =
======================================*/
/* Example block of Overide
dfpSizeOverrides.push({
   tag: "dfp_pushdown_brandscape",
   sizes: [[300,250]],
   keys: {
       "site": "food",
       "sponsorship": "size_override_testing"
   }
});
*/

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food.com homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "foodcom",
		"pagetype": "home"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food Network homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "food",
		"uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food Network Store
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "food",
		"category": "store"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Cooking Chanel homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "cook",
		"uniqueid": "cook_cook_home_section_b9dbee4b_78b0_4bb0_b391_046b8436d4cc_1"
    }
});


// Restrict the 300x1050 slot size on the dfp_bigbox adslot on hgtv portal page
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "hgtv",
		"uniqueid": "hgtv_landingpage_b9823d3b_dd07_4c47_a5c4_8ee31dcc795d_1"
    }
});



/*========================================================
=       First Entry Pushdown 1x14 SizeOverrides  Begin =
=========================================================*/

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Food.com homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "foodcom",
		"pagetype": "home"
    }
});

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Food Network homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "food",
		"uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Cooking Chanel homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "cook",
		"uniqueid": "cook_cook_home_section_b9dbee4b_78b0_4bb0_b391_046b8436d4cc_1"
    }
});

// Start Generic Pagetype & Category  1x14 slot size restrictions across all sites
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "video"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "player"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "channel"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "photo_gallery"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "article"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "search"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"vgncontent": "search"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "video"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "home"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "blog"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "home"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "store"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "marketplace"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "about_us"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "doory_awards"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"category": "healthy_eating"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"vgncontent": "myrecipebox"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "video_player"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
		"pagetype": "landingpage"
    }
});

// End Generic Pagetype & Category  1x14 slot size restrictions across all sites



/*=====================================================
=       First Entry Pushdown 1x14 SizeOverrides  End =
=======================================================*/




/*======================================
=           Restrictions           =
======================================*/

/*  Example Block of Enable vs Restrict
// Restrict the dfp_bigbox slot on all foodnetwork pages (site=food)
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "food"
    }
});

// Enable bigbox on pages with site = food. Just to test the restrict/enable
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "enable",
    keys: {
        "site": "food"
    }
});
*/

// Restrict the dfp_leaderboard slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
		"uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});


// Restrict the dfp_cartridge slot on foodnetwork search page
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "site": "food",
		"category": "search"
    }
});

// Restrict the dfp_prog_bigbox slot on foodnetwork universal-landing pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
		"pagetype": "universal_landing"
    }
});

// Restrict the dfp_utility1 slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_utility1",
    action: "restrict",
    keys: {
        "site": "food",
		"uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the dfp_utility2 slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_utility2",
    action: "restrict",
    keys: {
        "site": "food",
		"uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the dfp_leaderboard slot univeral-landing pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "universal_landing"
    }
});

// Restrict the dfp_leaderboard slot univeral-landing pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "video_player"
    }
});


// Restrict the dfp_leaderboard slot on foodnetwork search page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "search"
    }
});

// Restrict the dfp_leaderboard slot on foodnetwork search page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "video"
    }
});

// Restrict the dfp_leaderboard slot on food.com recipe_search page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "foodcom",
		"pagetype": "recipe_search"
    }
});

// Restrict the dfp_utility1 slot on food.com homepage page
dfpAdRestrictions.push({
    tag: "dfp_utility1",
    action: "restrict",
    keys: {
        "site": "foodcom",
		"pagetype": "home"
    }
});

// Restrict the dfp_utility1 slot on food.com homepage page
dfpAdRestrictions.push({
    tag: "dfp_utility2",
    action: "restrict",
    keys: {
        "site": "foodcom",
		"pagetype": "home"
    }
});

// Restrict the dfp_leaderboard slot on food.com food_holiday 3rd level
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "foodcom",
		"vgncontent": "food_holidays"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel chef section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
		"pagetype": "chefs_and_hosts_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel show section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
		"pagetype": "show_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel recipe section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
		"pagetype": "recipe_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel homepage
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
		"pagetype": "cook_home_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel search page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
		"pagetype": "search"
    }
});

// Restrict 300x150 on main Foodnetwork.com page.
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "homepage"
    }
});

/*
// Restrict 300x150 on section fronts Food Network.com.
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "food",
		"pagetype": "universal_landing"
    }
});
*/

// Restrict dfp_mobile_banner on FOOD store pages in case the slot is not removed. One they remove it, we can take this out. - Andy 9/30/2014
dfpAdRestrictions.push({
    tag: "dfp_mobile_banner",
    action: "restrict",
    keys: {
        "site": "food",
        "category": "store"
    }
});

// Restrict the dfp_prog_bigbox slot of Food.com homepage
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "foodcom",
		"pagetype": "home"
    }
});


//************************************************************************//
//					-- Begin Home Ad Restrictions --                        //
//***********************************************************************//

// Restrict the dfp_leaderboard slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "photolibrarylandingpage"
    }
});

// Restrict the dfp_leaderboard slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "advertiserprofilepage"
    }
});


// Restrict the dfp_leaderboard slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "professionalprofilepage"
    }
});


// Restrict the dfp_leaderboard slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "designerprofilepage"
    }
});


// Restrict the dfp_logo slot on hgtv pagetype landingpage pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "landingpage"
    }
});

// Restrict the dfp_leaderboard slot on hgtv pagetype searchpage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "searchpage"
    }
});


// Restrict the dfp_leaderboard slot on hgtv pagetype section pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "section"
    }
});


// Restrict the dfp_leaderboard slot on hgtv pagetype singlevideopage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "singlevideopage"
    }
});

// Restrict the dfp_leaderboard slot on hgtv pagetype videoplaylistpage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "videoplaylistpage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype singlevideopagee pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "singlevideopage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype videoplaylistpage pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "videoplaylistpage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype photogallerypage pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
		"pagetype": "photogallerypage"
    }
});








