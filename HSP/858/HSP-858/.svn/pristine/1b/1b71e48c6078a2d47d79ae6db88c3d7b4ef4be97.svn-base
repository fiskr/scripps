<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

   <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage/Category"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Category">
        <div class="pod" id="rel-topics">
            <div class="hd">
                <h4>Related Topics</h4>
            </div>
            <div class="bd">
                <ul class="list">
                   <xsl:apply-templates select="Asset"/> 
                </ul>
            </div> 
            <div class="ft"></div>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="topic-{$position}" href="{$href}"><xsl:value-of select="Title"/></a>
        </li>
    </xsl:template>

</xsl:stylesheet>
