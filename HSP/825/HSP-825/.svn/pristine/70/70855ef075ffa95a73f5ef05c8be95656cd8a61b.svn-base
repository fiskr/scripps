<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="designers-portfolio-crsl" class="pod crsl-ww">
            <xsl:apply-templates select="Category"/>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#designers-portfolio-crsl").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <div class="hd">
            <h4>Designers&#8217; Portfolio</h4>
        </div>
        <div class="bd crsl">
            <ul>
                <xsl:apply-templates select="Asset"/>
            </ul>
            <p class="view-more">
                <xsl:apply-templates select="following-sibling::DesignerPortfolio"/>
            </p>
        </div>
        <div class="ft"></div>
    </xsl:template>
    
    <xsl:template match="DesignerPortfolio">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <a rel="dp-seeall" href="{$href}">See All Rooms</a>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="dp-img-{$position}" href="{$href}">
               <xsl:apply-templates select="Image"/>
            </a>
            <p class="title">
                <xsl:apply-templates select="Subject"/>
            </p>
            <p>
                <xsl:text>By: </xsl:text>
                <xsl:apply-templates select="User"/>
            </p>
            <p>
                <xsl:text>Style: </xsl:text>
                <xsl:apply-templates select="Style"/>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Style | User | Subject">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(parent::Asset/preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:choose>
                <xsl:when test="self::Style">
                    <xsl:text>dp-style-</xsl:text>
                    <xsl:value-of select="$position"/>
                </xsl:when>
                <xsl:when test="self::User">
                    <xsl:text>dp-user-</xsl:text>
                    <xsl:value-of select="$position"/>
                </xsl:when>
                <xsl:when test="self::Subject">
                    <xsl:text>dp-title-</xsl:text>
                    <xsl:value-of select="$position"/>
                </xsl:when>
            </xsl:choose>
        </xsl:variable>
        <a rel="{$rel}"><xsl:value-of select="Name"/></a>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="120" height="90"/>
    </xsl:template>
    
</xsl:stylesheet>
