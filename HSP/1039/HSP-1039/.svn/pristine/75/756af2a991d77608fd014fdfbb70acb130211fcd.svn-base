<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:template name="threeLink">
        <div class="epkg-wrap">
            <div class="static-lead video clrfix">
                <xsl:apply-templates select="Category" mode="threeLink"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="threeLink">
        <span>
            <xsl:apply-templates select="Asset[child::AssetRank = 1]" mode="leadImage"/>
        </span>
        <h2><xsl:value-of select="parent::AssetUsage/AssetUsageTitle"/></h2>
        <p><xsl:value-of select="parent::AssetUsage/Description"/></p>
        <ul class="list">
            <xsl:for-each select="child::Asset">
                <xsl:sort data-type="number" select="AssetRank"/>
                <xsl:apply-templates select="self::Asset" mode="threeLink"/>
            </xsl:for-each>
        </ul>        
    </xsl:template>
    
    <xsl:template match="Asset[child::AssetRank = 1]" mode="leadImage">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="AssetType = 'VIDEO'">
               <a href="{$href}" class="thumb" title="{$imageTitle}">
                   <xsl:apply-templates select="Image" mode="leadImage"/>
               </a> 
                <span class="play-button"></span>
            </xsl:when>
            <xsl:otherwise>
                <a href="{$href}" title="{$imageTitle}">
                    <xsl:apply-templates select="Image" mode="leadImage"/>
                </a> 
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="Image" mode="leadImage">
        <xsl:variable name="src">
            <xsl:value-of select="ImageLeadURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="400" height="300"/>
    </xsl:template>
    
    <xsl:template match="Asset" mode="threeLink">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:choose>
                <xsl:when test="TitleOverride !=''"><xsl:value-of select="TitleOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Title"/></xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <li>
            <a href="{$href}" title="{$urlTitle}">
                <xsl:value-of select="$title"/>
            </a>
            <cite>
                <xsl:choose>
                    <xsl:when test="AssetType = 'Gallery'">
                        <xsl:text>(</xsl:text>
                        <xsl:value-of select="ImageCount"/>
                        <xsl:text> photos)</xsl:text>
                    </xsl:when>
                    <xsl:when test="AssetType = 'Channel'">
                        <xsl:text>(</xsl:text>
                        <xsl:value-of select="VideoCount"/>
                        <xsl:text> videos)</xsl:text>
                    </xsl:when>
                    <xsl:when test="AssetType = 'Video'">
                        <xsl:text>(video</xsl:text>
                        <xsl:value-of select="RunningTime"/>
                        <xsl:text>)</xsl:text>
                    </xsl:when>                
                </xsl:choose>
            </cite>
        </li>
    </xsl:template>

</xsl:stylesheet>
