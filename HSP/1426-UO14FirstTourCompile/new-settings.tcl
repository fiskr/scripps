##
## GENERAL DSIPLAY SETTINGS
##
## 2010-07-12 CLewis SS_TENTPOLE_JS actually CSS and JavaScript for tentpole pages
## 2011-02-15 CLewis specify SS_OMNITURE_JS for Staging environment
## 2013-10-22 ETrybuch Specify SS_MAIN_SITE_JS for dev and stage environment
 
 
#*************************************************************************************************************
#new js/css for redesign -paolo
set SS_MAIN_SITE_CSS "
                <link rel=\"icon\" type=\"image/png\" href=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/imgs/favicon.png\"/>
                <link rel=\"apple-touch-icon-precomposed\" href=\"http://hgtv.sndimg.com/webhgtv/hg20/imgs/logo-ios.png\" />
                <link rel=\"stylesheet\" type=\"text/css\" href=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/css/sni-hgtv.2.0.css\"/>
                <noscript><link rel=\"stylesheet\" type=\"text/css\" href=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/css/sni-hgtv-noscript.2.0.css\"/></noscript>
"
 
## DEVELOPMENT
set SS_MAIN_SITE_JS "
                <script src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/config-dev.js\" type=\"text/javascript\"></script>
                <script src=\"http://frontend.scrippsnetworks.com/development/common/js/sni-core/sni-core.2.0.js\" type=\"text/javascript\"></script>
                <script type=\"text/javascript\" src=\"http://www.sndimg.com/common/adimages/networkads/hgtv/dev/adRestriction.js\"></script>
                <script type=\"text/javascript\" src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/sni-hgtv.2.0.js\"></script> 
"
## STAGING
#set SS_MAIN_SITE_JS "
#             <script src=\"http://frontend.scrippsnetworks.com/staging/webhgtv/hg20/js/config-stage.js\" type=\"text/javascript\"></script>
#             <script src=\"http://frontend.scrippsnetworks.com/staging/common/js/sni-core/sni-core.2.0.js\" type=\"text/javascript\"></script>
#             <script type=\"text/javascript\" src=\"http://www.sndimg.com/common/adimages/networkads/hgtv/stage/adRestriction.js\"></script>
#             <script type=\"text/javascript\" src=\"http://frontend.scrippsnetworks.com/staging/webhgtv/hg20/js/sni-hgtv.2.0.js\"></script> 
#"
 
## PRODUCTION
#set SS_MAIN_SITE_JS "
#             <script src=\"http://hgtv.sndimg.com/webhgtv/hg20/js/sni-hgtv-cfg.2.0.js\" type=\"text/javascript\"></script>
#             <script src=\"http://www.sndimg.com/common/js/sni-core/sni-core.2.0.js\" type=\"text/javascript\"></script>
#             <script type=\"text/javascript\" src=\"http://www.sndimg.com/common/adimages/networkads/hgtv/prod/adRestriction.js\"></script>
#             <script type=\"text/javascript\" src=\"http://hgtv.sndimg.com/webhgtv/hg20/js/sni-hgtv.2.0.js\"></script>    
#"
 
set SS_MOBILE_SITE_CSS "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/css/hgtv-mobile-home.css\">"
set SS_MOBILE_SITE_JS "<script src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/config-dev.js\" type=\"text/javascript\"></script>
                <script src=\"http://frontend.scrippsnetworks.com/development/common/js/sni-core/sni-mobile-core.js\" type=\"text/javascript\"></script>
                <script src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/hgtv-mobile-home.js\" type=\"text/javascript\"></script>"      
 
# Dynamic delivery of tentpole css and js based on section name.
# Implmented in com.scripps HGTV Page Header Formatter API 1.4
# Designers Porfolio while not a Tentpole also used the hat header
set SS_SPEC_PAGES [list "DESIGNERS PORTFOLIO" "DESIGN STAR" "GREEN HOME" "DREAM HOME" "URBAN OASIS"]
set SS_SPEC_PAGES_JS "<script src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/sni-hgtv-tentpole.2.0.js\" type=\"text/javascript\"></script>"
set SS_SPEC_PAGES_CSS "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/css/sni-hgtv-tentpole.2.0.css\"/>"
 
 
## MM-2651 subtask MM-2715 Global Pushdown change : Elan Trybuch
set SS_PUSHDOWN_AD_CODE {
                <div id="pushdown_adtag" class="iax_outer"><div class="iax_inner"><script type="text/javascript">HgtvAd('PUSHDOWN', '', 1);</script></div><div id="brandscape"></div></div>
}
 
# ### SiteCatalyst code version: G.6. Copyright 1997-2004 Omniture, Inc. More info available at http://www.omniture.com
 
# on DEVELOPMENT site:
set SS_OMNITURE_JS "
<script type=\"text/javascript\" src=\"http://frontend.scrippsnetworks.com/development/webhgtv/hg20/js/s_code_remote.js\"></script>
<script type=\"text/javascript\">s.t()</script>
"
 
#on STAGING site:
# set SS_OMNITURE_JS "
# <script type=\"text/javascript\" src=\"http://frontend.scrippsnetworks.com/hgtv/staging/js/s_code_remote.js\"></script>
# <script type=\"text/javascript\">s.t()</script>
# "
 
# on PRODUCTION site:
# set SS_OMNITURE_JS "
# <script type=\"text/javascript\" src=\"http://web.hgtv.com/webhgtv/hg20/js/s_code_remote.js\"></script>
# <script type=\"text/javascript\">s.t()</script>
# "
 
 
# ### end SiteCatalyst
 
               
# ###On HGTV values 
#PrimeTime start time
set SS_PRIMETIME_START "8:00pm"
# ###end On HGTV values          
 
set SS_DH_SUPERLEAD_ID 71263
 
# Design star specific items
set SS_DS_SCTN_ID "88796"
set SS_DS_RECAP_WIDGET_PLAYER_ID "2921"
set SS_DS_RECAP_WIDGET_CHANNEL_ID "20821"
 
set SS_HotSpotPath "/api/photogallery/images/image_list/"
#set SS_HotSpotPath "http://frontend.scrippsnetworks.com/api/photogallery/images/image_list/"
#set SS_HotSpotPath "http://apistg.scrippsnetworks.com/api/photogallery/images/image_list/"
#set SS_HotSpotPath "http://www.hgtv.com/api/photogallery/images/image_list/"
 
#Robert Eilam - Swf File location driven from sponsorship code
set SS_swffile_MAPPING {
                { sponsoredSite {DREAM HOME} {GREEN HOME} {URBAN OASIS} {SMART HOME}}
                { DH2010_TOUR "http://web.hgtv.com/webhgtv/hg20/pkgs/2010/dream-home/swf/tourModulePreloader.swf" "" "" ""}
                { DH2011 "http://web.hgtv.com/webhgtv/hg20/pkgs/2011/dream-home/swf/tourModulePreloader.swf" "" "" ""}
                { GH2010TOUR "" "http://web.hgtv.com/webhgtv/hg20/pkgs/2010/green-home/swf/tourModulePreloader.swf" "" ""}
                { URBANOASIS2010 "" ""  "http://www.hgtv.com/webhgtv/hg20/pkgs/2010/urban-oasis/swf/tourModulePreloader.swf" ""}
                { GREENHOME2011 "" "http://web.hgtv.com/webhgtv/hg20/pkgs/2011/green-home/swf/tourModulePreloader.swf" "" ""}
                { URBANOASIS2011 "" ""  "http://www.hgtv.com/webhgtv/hg20/pkgs/2011/urban-oasis/swf/tourModulePreloader.swf" ""}
                { DH2012 "http://web.hgtv.com/webhgtv/hg20/pkgs/2012/dream-home/swf/tourModulePreloader.swf" "" "" ""}
                { HG_TP_GREEN_HOME_2012 "" "http://web.hgtv.com/webhgtv/hg20/pkgs/2012/green-home/swf/tourModulePreloader.swf" "" ""}
                { HG_TP_URBAN_OASIS_2012 "" ""  "http://images.hgtv.com/webhgtv/hg20/pkgs/2012/urban-oasis/swf/tourModulePreloader.swf" ""}
                { HG_TP_DREAM_HOME_2013 "http://www.hgtv.com/webhgtv/hg20/pkgs/2013/dream-home/swf/tourModulePreloader.swf" "" "" ""}
                { HG_TP_SMART_HOME_2013 "" ""  "" "http://www.hgtv.com/webhgtv/hg20/pkgs/2013/smart-home/swf/tourModulePreloader.swf"}                               
                { HG_TP_URBAN_OASIS_2013 "" "" "http://www.hgtv.com/webhgtv/hg20/pkgs/2013/urban-oasis/swf/tourModulePreloader.swf" ""}                            
                { HG_TP_DREAM_HOME_2014 "http://www.hgtv.com/webhgtv/hg20/pkgs/2014/dream-home/swf/tourModulePreloader.swf" "" "" ""}
                { HG_TP_SMART_HOME_2014 "" "" "" "http://www.hgtv.com/webhgtv/hg20/pkgs/2014/smart-home/swf/tourModulePreloader.swf"}
                { HG_TP_URBAN_OASIS_2014 "" "" "http://www.hgtv.com/webhgtv/hg20/pkgs/2014/urban-oasis/swf/tourModulePreloader.swf" "" }
               
set SS_UBER_TENTPOLE_SECTIONS {{DREAM HOME} {URBAN OASIS} {SMART HOME}}
}
 