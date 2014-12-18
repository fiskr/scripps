<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    
    <xsl:variable name="context">
        <xsl:value-of select="/ServiceResponse/AssetUsage/@context"/>
    </xsl:variable>
    <xsl:variable name="lowerCaseContext">
        <xsl:value-of select="translate($context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
    
    
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:choose>
            <xsl:when test="@context='Videos'">
                <xsl:apply-templates select="Category" mode="Videos"/>
            </xsl:when>
            <xsl:when test="@context='PhotoGalleries' or @context='Hubphotogallery'">
                <xsl:apply-templates select="Category" mode="PG"/> 
            </xsl:when>           
        </xsl:choose>        
    </xsl:template>
    
    <xsl:template match="Category" mode="Videos">
        <div id="related-videos" class="pod crsl-ww">
            <div class="hd">
                <h4>Related Videos</h4>
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Asset"/>
                </ul>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#related-videos").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category" mode="PG">       
        <xsl:variable name="header">
            <xsl:choose>
                <xsl:when test="$lowerCaseContext = 'hubphotogallery'">PHOTO GALLERY</xsl:when>
                <xsl:otherwise>Related Photo Gallery</xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="parent::AssetUsage/Url"/>
        </xsl:variable>
        <div id="photo-gallery" class="pod crsl-ww">
            <div class="hd">
                <h4><xsl:value-of select="$header"/></h4>
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Asset"/>
                </ul>
                <xsl:if test="parent::AssetUsage/Url">
                    <p class="view-more"><a href="{$href}">View this gallery</a></p>
                </xsl:if>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#photo-gallery").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <a href="{$href}"><xsl:apply-templates select="Image"/></a>
            <xsl:if test="$lowerCaseContext != 'hubphotogallery' and child::Title | child::RunningTime">
                <p>
                    <a href="{$href}">
                        <xsl:value-of select="Title"/>
                        <xsl:apply-templates select="RunningTime"/>
                    </a>
                </p>
            </xsl:if>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" height="90" width="120"/>
    </xsl:template>
    
    <xsl:template match="RunningTime">
        <small><xsl:text> (</xsl:text><xsl:value-of select="."/><xsl:text>)</xsl:text></small>
    </xsl:template>

</xsl:stylesheet>
