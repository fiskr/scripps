<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:output method="text"/>
    <xsl:template match="ServiceResponse">
      <xsl:if test="AssetUsage/Category/Asset">
          <xsl:apply-templates select="AssetUsage"/>
      </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:text>var pfind = {</xsl:text>
        <xsl:if test="child::ProjectCount">
            <xsl:text>c: </xsl:text>
            <xsl:value-of select="child::ProjectCount"/>
            <xsl:text>,</xsl:text>
        </xsl:if>
        <xsl:text>i:{</xsl:text>
        <xsl:apply-templates select="Category/Asset"/>
        <xsl:text>}};</xsl:text>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:text>'</xsl:text>
        <xsl:value-of select="Param"/>
        <xsl:text>': {</xsl:text>
        <xsl:text>l: '</xsl:text>
        <xsl:value-of select="Title"/>
        <xsl:text>',c:</xsl:text>
        <xsl:value-of select="ProjectCount"/>
        <xsl:choose>
            <xsl:when test="not(following-sibling::Asset)"><xsl:text>}</xsl:text></xsl:when>
            <xsl:otherwise><xsl:text>},</xsl:text></xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    </xsl:stylesheet>
