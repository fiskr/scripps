<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    
    <xsl:include href="threeLinkLeadCartridge.xsl"/>
    <xsl:include href="textFeature.xsl"/>
    <xsl:include href="threeFeature.xsl"/>
    <xsl:include href="imageCarouselSubFeature.xsl"/>
    <xsl:include href="cartridge.xsl"/>
    
    <xsl:template match="ServiceResponse">                        
        <xsl:call-template name="BannerImage"/>
        <xsl:call-template name="hg-west"/>            
    </xsl:template>
    
    <xsl:template name="BannerImage">        
            <style type='text/css'>
                <xsl:text>.mini-lead h1 {background: url(</xsl:text><xsl:value-of select="BannerImageURL"/><xsl:text>) ;}</xsl:text>
            </style>
            <div class="mini-lead">
                <h1>
                    <span>
                        <xsl:value-of select="Title"/>
                    </span>
                </h1>
            </div>        
    </xsl:template>
    
    <xsl:template name="hg-west">
        <div class="intro clrfix">
            <div id="cnt_sponsor">
                <span class="sponsor-multi-logo"><script type="text/javascript">MultiLogoAd('LOGO',4);</script></span>
            </div>
            <h2>
                <xsl:value-of select="Description"/>
            </h2>
        </div>
         <xsl:call-template name="Cartridge"/>
    </xsl:template>
    
    <xsl:template name="Cartridge">
        <xsl:apply-templates select="AssetUsage[child::AssetRank = 1]"/>
        <xsl:apply-templates select="AssetUsage[child::AssetRank = 2]"/>
        <xsl:if test="child::AssetUsage">            
            <xsl:for-each select="AssetUsage">
                <xsl:sort data-type="number" select="AssetRank"/>
                <xsl:apply-templates select="self::AssetUsage[child::AssetRank &gt; 2]" mode="Cartridge"/>
            </xsl:for-each>            
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage[child::AssetRank = 1]">
        <xsl:call-template name="threeLink"/>
    </xsl:template>
    
    <xsl:template match="AssetUsage[child::AssetRank = 2]">
        <xsl:choose>
            <xsl:when test="@context = 'SUB_FEATURE_TIL_3'">
                <xsl:call-template name="threeFeature"/>
            </xsl:when>
            <xsl:when test="@context = 'SUB_FEATURE_LINKS_PLUS_FEATURE'">
                <xsl:call-template name="textFeature"/>
            </xsl:when>
            <xsl:when test="@context = 'SUB_FEATURE_IMAGE_CAROUSEL'">
                <xsl:call-template name="ImageCarouselSubFeature"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>


</xsl:stylesheet>
