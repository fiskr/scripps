<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="show-url">
            <xsl:value-of select="child::Show/Url"/>
        </xsl:variable>
        <xsl:variable name="epi-url">
            <xsl:value-of select="child::EpisodicContent/Url"/>
        </xsl:variable>
        <xsl:variable name="id">
            <xsl:choose>
                <xsl:when test="child::Show | child::EpisodicContent">toi-v2</xsl:when>
                <xsl:otherwise>toi</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        <div id="{$id}" class="pod">
            <div class="hd">
                <h4>Topics of Interest</h4>    
            </div>
            <div class="bd">
                <ul class="list">
                    <xsl:apply-templates select="Category/Asset"/>
                </ul>
                <xsl:if test="child::EpisodicContent | child::Show">
                    <div class="epi-content">
                        <xsl:if test="child::Show">
                            <h5><xsl:value-of select="child::Show/Name"/></h5>
                        </xsl:if>
                        <xsl:if test="child::EpisodicContent">
                            <p>
                                <a rel="toi-episode" href="{$epi-url}"><xsl:value-of select="child::EpisodicContent/Title"/></a>
                            </p>
                        </xsl:if>
                        <xsl:if test="child::Show">
                            <a rel="toi-show" href="{$show-url}">
                                <strong>More from the show</strong>
                            </a>
                        </xsl:if>
                    </div>
                </xsl:if>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <xsl:text>SNI.HGTV.Omniture.ClickTrack('#</xsl:text>
            <xsl:value-of select="$id"/>
            <xsl:text>','Topic Of Interest', 'TOI_Module')</xsl:text>            
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
            <a rel="toi-{$position}" href="{$href}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
