<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <!--<xsl:output method="text"/>-->
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <script type="text/javascript">
            <xsl:text>SNI.HGTV.ProductIdeas = [</xsl:text>
        <xsl:apply-templates select="Category/Asset"/>
        <xsl:text>;</xsl:text>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:text>{ pID: "</xsl:text>
        <xsl:value-of select="AssetId"/>
        <xsl:text>", pURL: "</xsl:text>
        <xsl:value-of select="Url"/>
        <xsl:text>", pName: "</xsl:text>
        <xsl:value-of select="Title"/>
        <xsl:text>", iURL: "</xsl:text>
        <xsl:value-of select="Image/ImageURL"/>
        <xsl:text>", iAlt: "</xsl:text>
        <xsl:value-of select="Title"/>
        <xsl:text>"</xsl:text>
        <xsl:choose>
            <xsl:when test="not(following-sibling::Asset)"><xsl:text> }]</xsl:text></xsl:when>
            <xsl:otherwise><xsl:text> },</xsl:text></xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>
