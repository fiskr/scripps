<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:include href="common/carousel.xsl"/>

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>  
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="products-right-rail" class="pod crsl-e wood">
            <h4><xsl:value-of select="AssetUsageTitle"/></h4>
            <div class="bd crsl">
                <xsl:apply-templates select="Category"/>
            </div>
        </div>
        <script type="text/javascript">
            <![CDATA[SNI.Common.Carousel("#products-right-rail", { pagelink:"image" });
                SNI.DIY.Omniture.ClickTrack('#products-right-rail','Products','Products_module');
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="assetCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$assetCount mod 2 =0">
                    <xsl:value-of select="$assetCount div 2"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$assetCount div 2 + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        <ul>
            <xsl:call-template name="carousel">
                <xsl:with-param name="i">1</xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>
                <xsl:with-param name="clength">2</xsl:with-param>
            </xsl:call-template>           
        </ul>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>            
        </xsl:variable>
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="$position mod 2 = 1">first crsl-item</xsl:when>                
                <xsl:when test="$position mod 2 = 0">last crsl-item</xsl:when>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li class="{$class}">
            <div class="image">
                <a href="{$href}" rel="prodi-{$position}">
                    <xsl:apply-templates select="Image"/>
                </a>
            </div>
            <p>
                <a href="{$href}" rel="prodt-{$position}"><xsl:value-of select="Title"/></a>
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
        <img src="{$src}" alt="{$alt}"/>
    </xsl:template>
    
</xsl:stylesheet>
