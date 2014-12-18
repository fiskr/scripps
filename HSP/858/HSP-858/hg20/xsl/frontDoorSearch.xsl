<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:apply-templates select="AssetUsage"/>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="context">
            <xsl:value-of select="@context"/>
        </xsl:variable>
        <xsl:variable name="lowerCaseContext">
            <xsl:value-of select="translate($context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
        </xsl:variable>
        <xsl:variable name="img-src"><![CDATA[http://adsremote.scrippsnetworks.com/image.ng/site=DOOR&adtype=TRACKING&TRACKING=DOOR_08MAY08_SEARCH_WIDGET_1x1_TRACKING&adsize=1x1&PagePos=1]]></xsl:variable>
        <xsl:if test="$lowerCaseContext = 'real estate'">
            <div class="pod sponsor-pod" id="frodo-search-widget">
                <div class="hd"></div>
                <div class="bd clrfix">                    
                    <div id="fd-search-wrapper">
                        <form method="post" action="http://www.frontdoor.com/HGTVSearch.aspx?int=INT_10" name="third_party_search" id="third_party_search" target="_blank">
                            <div id="fd-search-header">
                                <div id="fd-search-logo">
                                    <img src="http://web.hgtv.com/webhgtv/hg20/imgs/frodo-search-logo.png" width="156" height="39" alt="FrontDoor"/>
                                </div>                                
                                <div id="fd-search-poweredby">
                                    <img src="http://web.hgtv.com/webhgtv/hg20/imgs/frodo-search-hgtv-logo.png " width="119" height="29" alt="Powered by HGTV"/>
                                </div>
                            </div>
                            <h5>Search Homes For Sale Across America:</h5>
                            <div id="fd-search-input" class="global-search">
                                <div class="input">
                                    <input type="text" name="txtSearch" id="txtSearch" value="City and State or Zip Code" onFocus="resetSearchField();" onBlur="checkSearchField();" />
                                </div>                                
                                <button type="submit" title="Search"><span>Search</span></button>
                            </div>
                        </form>
                    </div>                    
                    <script language="javascript" charset="utf-8">
                        <![CDATA[
                            function resetSearchField() {
                            if (document.third_party_search.txtSearch.value == "City and State or Zip Code") {
                            document.third_party_search.txtSearch.value = "";
                            }
                            }
                            function checkSearchField() {
                            if (document.third_party_search.txtSearch.value == "") {
                            document.third_party_search.txtSearch.value = "City and State or Zip Code";
                            }
                            }
                            function enterSearchText(SearchTerm) {
                            document.third_party_search.txtSearch.value = SearchTerm;
                            }
                        ]]>
                    </script>
                    <img src="{$img-src}" border="0"/>
                   </div>
                 <div class="ft"></div>
                </div>
                
                <script type="text/javascript">
                  <![CDATA[
                    SNI.HGTV.Omniture.ClickTrack("#frodo-search-widget","Front Door Right Rail Search Widget","Frodo_search_widget")
                    ]]>
                </script>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>
