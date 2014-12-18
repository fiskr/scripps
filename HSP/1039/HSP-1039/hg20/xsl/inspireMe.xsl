<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="inspire-me" class="pod crsl-ww-alt">
            <xsl:apply-templates select="Category"/>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#inspire-me").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
                SNI.HGTV.Omniture.ClickTrack('#inspire-me','Inspire Me', 'IM_Module')
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <div class="hd">
            <h4>Inspire Me!</h4>
        </div>
        <div class="bd crsl">
            <ul>
                <xsl:apply-templates select="Asset"/>
            </ul>
        </div>
        <div class="ft"></div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="$position"/>
        </xsl:variable>
        <li>
            <a rel="im-{$rel}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" height="120" width="160"/>
    </xsl:template>

</xsl:stylesheet>
