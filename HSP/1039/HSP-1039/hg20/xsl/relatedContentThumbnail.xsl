<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage[@context = 'Photogallery']/Category/Asset">
            <xsl:apply-templates select="AssetUsage[1]/Category/Asset[1]/Image"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Image">
        <img>
            <xsl:attribute name="src"><xsl:value-of select="ImageURL"/></xsl:attribute>
            <xsl:attribute name="alt"><xsl:value-of select="Alt"/></xsl:attribute>
        </img>
    </xsl:template>
    

</xsl:stylesheet>
