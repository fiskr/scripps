<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage[@context = 'Photogallery']/Category/Asset">
            <ul>
                <xsl:apply-templates select="AssetUsage"/>
            </ul>            
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:apply-templates select="Category/Asset"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <a href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="first">
                <a href="{$href}">
                    <xsl:value-of select="Title"/>
                </a>
            </p>
            <p>
                <xsl:text>View Photos</xsl:text>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <img height="69" width="92">
            <xsl:attribute name="src"><xsl:value-of select="ImageURL"/></xsl:attribute>
            <xsl:attribute name="alt"><xsl:value-of select="Alt"/></xsl:attribute>
        </img>
    </xsl:template>

</xsl:stylesheet>
