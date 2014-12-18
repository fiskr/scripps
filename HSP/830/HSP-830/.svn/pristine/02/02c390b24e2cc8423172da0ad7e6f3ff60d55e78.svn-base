<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <!-- Global variables -->
    <xsl:variable name="context">
        <xsl:value-of select="/ServiceResponse/AssetUsage/@context"/>
    </xsl:variable>
    <xsl:variable name="lowercaseContext">
        <xsl:value-of select="translate($context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
    <xsl:variable name="context-val">
        <xsl:choose>
            <xsl:when test="$lowercaseContext = 'topic'">toi</xsl:when>
            <xsl:otherwise>aa</xsl:otherwise>
        </xsl:choose>        
    </xsl:variable>
    <xsl:variable name="title">
        <xsl:choose>
            <xsl:when test="$lowercaseContext = 'topic'">Topic Of Interest</xsl:when>
            <xsl:otherwise>All About</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    
    <!-- Templates -->    
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
                <xsl:when test="child::Show | child::EpisodicContent"><xsl:value-of select="$context-val"/>-v2</xsl:when>
                <xsl:otherwise><xsl:value-of select="$context-val"/></xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        <div id="{$id}" class="pod">            
            <div class="hd">
                <h4><xsl:value-of select="$title"/></h4>    
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
                                <a rel="{$context-val}-episode" href="{$epi-url}"><xsl:value-of select="child::EpisodicContent/Title"/></a>
                            </p>
                        </xsl:if>
                        <xsl:if test="child::Show">
                            <a rel="{$context-val}-show" href="{$show-url}">
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
            <xsl:text>','</xsl:text>
           <xsl:value-of select="$title"/>        
            <xsl:text>', 'TOI_Module')</xsl:text>            
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
            <a rel="{$context-val}-{$position}" href="{$href}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
