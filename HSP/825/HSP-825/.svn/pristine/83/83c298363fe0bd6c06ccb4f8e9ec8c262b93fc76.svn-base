<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Show">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="more-shows">
            <h2>More Shows Covering This Topic</h2>
            <ul class="list">
                <xsl:apply-templates select="Show"/>
            </ul>
        </div>
    </xsl:template>
    
    <xsl:template match="Show">
        <xsl:variable name="epi-href">
            <xsl:value-of select="EpisodicContent/Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <xsl:value-of select="Name"/>
            <xsl:text>: </xsl:text>
            <a rel="more-shows-{$position}" href="{$epi-href}">
                <xsl:value-of select="EpisodicContent/Title"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
