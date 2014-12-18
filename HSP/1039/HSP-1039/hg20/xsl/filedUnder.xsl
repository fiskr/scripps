<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:apply-templates select="AssetUsage"/>
    </xsl:template>

    <xsl:template match="AssetUsage">
        <div class="article-info">
            <div class="tags">
                Related topics:
                <xsl:apply-templates select="Category/Asset"/>
            </div>
        </div>
        <script type="text/javascript">
            SNI.HGTV.Omniture.ClickTrack(".article-info div.tags", "Related Topics");
        </script>
    </xsl:template>

    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <span class="tag">
            <a href="{$href}">
                <xsl:attribute name="rel">
                    <xsl:value-of select="position()"/>
                </xsl:attribute>
                <xsl:value-of select="Title"/>
            </a>
            <xsl:if test="not(position()=last())">,
            </xsl:if>
        </span>
    </xsl:template>

</xsl:stylesheet>
