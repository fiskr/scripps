<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="all-about" class="pod relevant">
            <h4>All About&#8230;</h4>
            <ul class="topics">
                <xsl:apply-templates select="Category/Asset"/>
            </ul>
            <p class="more">
                <a href="/topics/index.html" rel="aa-more">More Topics</a>
            </p>
        </div>        
        <script type="text/javascript" charset="utf-8">
            <![CDATA[SNI.DIY.Omniture.ClickTrack('#all-about','All About','All_About_module')]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$position=1">
                <li class="first">
                    <a href="{$href}" rel="aat-{$position}">
                        <xsl:value-of select="Title"/>
                    </a>
                </li>
            </xsl:when>
            <xsl:when test="not(following-sibling::Asset)">
                <li class="first">
                    <a href="{$href}" rel="aat-{$position}">
                        <xsl:value-of select="Title"/>
                    </a>
                </li> 
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <a href="{$href}" rel="aat-{$position}">
                        <xsl:value-of select="Title"/>
                    </a>
                </li>
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>

</xsl:stylesheet>
