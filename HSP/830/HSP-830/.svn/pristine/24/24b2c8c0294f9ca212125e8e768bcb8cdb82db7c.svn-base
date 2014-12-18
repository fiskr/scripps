<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">      
        <div id="rate-my-space" class="crsl crsl-w-rating"> 
            <div class="hd">
                <h3>Rate My Space</h3>
                <p>See how your neighbors express themselves. <a href="http://www.roomzaar.com/rate-my-space/multigallery.esi">Go to Rate My Space</a></p>
            </div>
            <div class="img-crsl-wrap"> 
                <div class="bd crsl-wrap"> 
                    <ul>
                    <xsl:apply-templates select="Category/Asset"/>
                    </ul>
                </div>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript">
            <![CDATA[
                SNI.Common.Carousel("#rate-my-space", {visible:4});		
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset )+ 1"/>
        </xsl:variable>
        <li>           
            <a rel="rms-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="rating">
                <xsl:apply-templates select="Rating"/>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="small_thumb"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img data-src="{$src}" alt="{$alt}" width="92" height="69"></img>
    </xsl:template>
    
    <xsl:template match="Rating">
        <xsl:variable name="current">
            <xsl:value-of select="."/>
        </xsl:variable>
        <xsl:variable name="var">
            <xsl:value-of select="substring($current,1,1)"/>
        </xsl:variable>
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="$var = 1">one</xsl:when>
                <xsl:when test="$var = 2">two</xsl:when>
                <xsl:when test="$var = 3">three</xsl:when>
                <xsl:when test="$var = 4">four</xsl:when>
                <xsl:when test="$var = 5">five</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <span class="{$cname}"><xsl:value-of select="$var"/></span>
    </xsl:template>

</xsl:stylesheet>
