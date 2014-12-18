<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:template name="textFeature">
        <div class="epkg-wrap">
            <div class="topic-feature two-image-feature clrfix">
                <xsl:apply-templates select="Category" mode="textFeature"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="textFeature">
        <div class="image-feature left-feature gallery clrfix">
            <xsl:apply-templates select="Asset[child::AssetRank = 1]" mode="Feature"/>
        </div>
        <div class="image-feature right-feature gallery clrfix">
            <h3><xsl:value-of select="ancestor::AssetUsage/AssetUsageTitle"/></h3>
            <ul class="list">
                <xsl:for-each select="child::Asset">
                    <xsl:sort data-type="number" select="AssetRank"/>
                    <xsl:apply-templates select="self::Asset[child::AssetRank != 1]" mode="ListTextFeature"/>
                </xsl:for-each>
            </ul>            
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Feature">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:choose>
                <xsl:when test="TitleOverride !=''"><xsl:value-of select="TitleOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Title"/></xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <a href="{$href}" class="thumb" title="{$imageTitle}">
            <xsl:apply-templates select="Image" mode="textFeature"/>
        </a>
        <p>                
            <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
            <span class="content-count">
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
            </span>
        </p>
    </xsl:template>
    
    <xsl:template match="Image" mode="textFeature">
        <xsl:variable name="src">
            <xsl:value-of select="ImageMedURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="parent::Asset/ImageTitle"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="266" title="{$imageTitle}" class="thumb"/>
    </xsl:template>
    
    <xsl:template match="Asset" mode="ListTextFeature">
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
            <xsl:choose>
                <xsl:when test="AssetType = 'Gallery'">
                    <cite>
                        <xsl:text>(</xsl:text>
                        <xsl:value-of select="AssetCount"/>
                        <xsl:text> photos)</xsl:text>
                 </cite>
                </xsl:when>
                <xsl:when test="AssetType = 'Channel'">
                    <cite>
                        <xsl:text>(</xsl:text>
                        <xsl:value-of select="AssetCount"/>
                        <xsl:text> videos)</xsl:text>
                    </cite>
                </xsl:when>
                <xsl:when test="AssetType = 'Video'">
                    <cite>
                        <xsl:text>(video</xsl:text>
                        <xsl:value-of select="RunningTime"/>
                        <xsl:text>)</xsl:text>
                    </cite>
                </xsl:when>                
            </xsl:choose>            
        </li>
    </xsl:template>

</xsl:stylesheet>
