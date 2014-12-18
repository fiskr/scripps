<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="homes-for-sale" class="crsl-w-frontdoor clrfix">
            <div class="hd">
                <p class="powered-by">Powered by: <img src="http://web.hgtv.com/webhgtv/hg20/imgs/poweredby_frontdoor.png" alt="FrontDoor.com"/></p>                
                <h3>Homes for Sale</h3>
                <p>Top properties from <a href="http://www.frontdoor.com/" target="_blank">FrontDoor.com</a></p> 
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Category"/>
                </ul>
            </div>
            <div class="ft clrfix">
                <div id="section-search">
                    <div class="search clrfix">
                        <p>Search millions of homes</p>
                        <form class="clrfix" method="post" action="http://www.frontdoor.com/HGTVSearch.aspx?int=INT_10" name="third_party_search" id="third_party_search" target="_blank">
                            <div class="input"><input id="txtSearch" name="txtSearch"/></div>
                            <button id="hd-search-submit" title="Search" type="submit"><span>Search</span></button>
                        </form>
                        <script type="text/javascript" charset="utf-8">
                            <![CDATA[
                                SNI.Util.inputField('#third_party_search .input input', 'City and State or Zip Code', true);
                            ]]>
                        </script>
                    </div>
                </div>
            </div> 
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#homes-for-sale").dpl('carousel', { pagelink:"image" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="assetCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$assetCount mod 4 =0">
                    <xsl:value-of select="$assetCount div 4"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$assetCount div 4 + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        
        <xsl:call-template name="for-loop">
            <xsl:with-param name="i">1</xsl:with-param>
            <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>            
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>        
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * 4"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 4"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop ">
            <li>                
                <ul>
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                </ul>                
            </li>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>                
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="DetailLink"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset )+ 1"/>
        </xsl:variable>
        <li>           
            <a rel="hms-img-{$position}" href="{$href}" target="_blank">
                <xsl:apply-templates select="Image"/>                
            </a>
            <p class="desc">
                    <xsl:value-of select="City"/>
                <xsl:text>, </xsl:text>
                <xsl:value-of select="State"/>
            </p>
            <p class="price">
                <xsl:value-of select="Price"/>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="92" height="69"></img>
    </xsl:template>
    
</xsl:stylesheet>
