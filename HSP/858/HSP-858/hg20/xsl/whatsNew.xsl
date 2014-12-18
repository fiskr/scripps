<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div class="inside-pod" id="whats-new">
            <div class="hd">
                <h4>
                    <xsl:value-of select="AssetUsageTitle"/>
                </h4>
            </div>
            <div class="bd">
                <ul class="list">
                    <xsl:apply-templates select="Category/Asset"/>
                </ul>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                SNI.HGTV.Omniture.ClickTrack('#whats-new','Whats New', 'WhatsNew_Module')
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="wn-{$position}" href="{$href}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
