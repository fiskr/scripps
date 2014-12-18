<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:output method="html"/>

    <xsl:template match="AssetUsage[@context='LIST_MODULE_TIL_ARTICLE_LIST']" mode="Cartridge">
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <div class="epkg-wrap til">
            <h2><xsl:value-of select="AssetUsageTitle"/></h2>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <xsl:apply-templates select="Category" mode="Article"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="Article">
        <xsl:for-each select="child::Asset">
            <xsl:sort data-type="number" select="AssetRank"/>
            <xsl:apply-templates select="self::Asset" mode="Article"/>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='LIST_MODULE_TIL_PHOTO_GALLERY_LIST']" mode="Cartridge">
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <div class="epkg-wrap til">
            <h2><xsl:value-of select="AssetUsageTitle"/></h2>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <xsl:apply-templates select="Category" mode="Gallery"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="Gallery">
        <xsl:for-each select="child::Asset">
            <xsl:sort data-type="number" select="AssetRank"/>
            <xsl:apply-templates select="self::Asset" mode="Gallery"/>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='LIST_MODULE_TIL_VIDEO_LIST']" mode="Cartridge">
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <div class="epkg-wrap til">
            <h2><xsl:value-of select="AssetUsageTitle"/></h2>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <xsl:apply-templates select="Category" mode="Video"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="Video">
        <xsl:for-each select="child::Asset">
            <xsl:sort data-type="number" select="AssetRank"/>
            <xsl:apply-templates select="self::Asset" mode="Video"/>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='LIST_MODULE_TIL_CHANNEL_LIST']" mode="Cartridge">
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <div class="epkg-wrap til">
            <h2><xsl:value-of select="AssetUsageTitle"/></h2>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <xsl:apply-templates select="Category" mode="Channel"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="Channel">
        <xsl:for-each select="child::Asset">
            <xsl:sort data-type="number" select="AssetRank"/>
            <xsl:apply-templates select="self::Asset" mode="Channel"/>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="AssetUsage" mode="Cartridge">
        <!-- Suppresing this one need to remove this -->
    </xsl:template>
    
    <xsl:template match="Asset" mode="Article">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:value-of select="TitleOverride"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <div class="clrfix">
            <a href="{$href}" title="{$imageTitle}">
                <xsl:apply-templates select="Image" mode="Cartridge"/>               
            </a>            
                <h3>
                    <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                </h3>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <xsl:if test="child::CallToAction != ''">
                <p>
                    <a href="{$href}"><xsl:value-of select="CallToAction"/></a>
                </p>
            </xsl:if>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Gallery">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:value-of select="TitleOverride"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <div class="gallery clrfix">
            <a href="{$href}" class="thumb" title="{$imageTitle}">
                <xsl:apply-templates select="Image" mode="Cartridge"/>               
            </a>
                <h3>
                    <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                </h3>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <p>
                <a href="{$href}">
                    <xsl:value-of select="CallToAction"/>
                   <xsl:if test="child::AssetCount">
                        <cite>
                            <xsl:text>(</xsl:text>
                            <xsl:value-of select="AssetCount"/>
                            <xsl:text> photos)</xsl:text>
                        </cite>
                   </xsl:if>
                </a>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Channel">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:value-of select="TitleOverride"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <div class="video clrfix">
            <a href="{$href}" class="thumb" title="{$imageTitle}">
                <xsl:apply-templates select="Image" mode="Cartridge"/>               
            </a>            
                <h3>
                    <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                </h3>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>
            <p>
                <a href="{$href}">
                    <xsl:value-of select="CallToAction"/>
                    <xsl:if test="child::AssetCount">
                        <cite>
                            <xsl:text>(</xsl:text>
                            <xsl:value-of select="AssetCount"/>
                            <xsl:text> videos)</xsl:text>
                        </cite>
                    </xsl:if>
                </a>
            </p>
        </div>
        
    </xsl:template>    
    <xsl:template match="Asset" mode="Video">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>       
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:value-of select="TitleOverride"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <div class="video clrfix">
            <a href="{$href}" class="thumb" title="{$imageTitle}">
                <xsl:apply-templates select="Image" mode="Cartridge"/>
                <span class="play-button"></span>
            </a>            
                <h3>
                    <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                </h3>
            <xsl:if test="$desc != ''">
                <p><xsl:value-of select="$desc"/></p>
            </xsl:if>            
            <p>
                <a href="{$href}"><xsl:value-of select="CallToAction"/></a>
                <xsl:if test="child::RunningTime != ''">
                    <cite>
                        <xsl:text>(video </xsl:text>
                        <xsl:value-of select="RunningTime"/>
                        <xsl:text> )</xsl:text>
                    </cite>
                </xsl:if>
            </p>            
        </div>
    </xsl:template>
    
    <xsl:template match="Image" mode="Cartridge">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}"/>
    </xsl:template>

</xsl:stylesheet>
