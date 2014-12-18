<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="href">
            <xsl:value-of select="Category/Url"/>
        </xsl:variable>
        
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="count(child::Category/Asset) &gt;5">pod col-2</xsl:when>
                <xsl:otherwise>pod</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        <div id="toc" class="{$cname}">
            <div class="hd">
                <h4>
                    <xsl:choose>
                        <xsl:when test="Category/Url">
                        	<a href="{$href}">                                
                                <xsl:value-of select="Category/Title"/>
                        	</a>
                        </xsl:when>
                        <xsl:otherwise>
                        	<xsl:value-of select="Category/Title"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </h4>
            </div>
            <div class="bd clrfix">
                <xsl:apply-templates select="Category"/>                
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                SNI.HGTV.Omniture.ClickTrack('#toc','Table Of Contents','TOC_Module')
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="assetCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$assetCount &gt;5">
                <xsl:variable name="linkCountDivideByTwo">
                    <xsl:value-of select="count(Asset) div 2"/>        
                </xsl:variable>        
                <xsl:variable name="cutoff">

                    <xsl:choose>
                        <xsl:when test="$linkCountDivideByTwo &gt; 1">
                            <xsl:value-of select="$linkCountDivideByTwo + .5"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$linkCountDivideByTwo"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>                
                <ul class="list">
                    <xsl:apply-templates select="Asset[position() &lt;= $cutoff]"/>
                </ul>
                <ul class="list">
                    <xsl:apply-templates select="Asset[position() &gt; $cutoff]"/>
                </ul>
            </xsl:when>
            <xsl:otherwise>
                <ul class="list">
                    <xsl:apply-templates select="Asset"/>
                </ul>                
            </xsl:otherwise>
        </xsl:choose>
        <xsl:if test="following-sibling::SponsoredBy">
            <xsl:apply-templates select="following-sibling::SponsoredBy"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">

            <xsl:value-of select="Url"/>
        </xsl:variable>        
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>        
        <li>
            <a rel="toc-{$position}" href="{$href}">
                <xsl:value-of select="Title"/>
            </a>
        </li>        
    </xsl:template>

    
    <xsl:template match="SponsoredBy">
        <xsl:variable name="src">
            <xsl:value-of select="Image/ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Image/Alt"/>
        </xsl:variable>
        <p class="sponsored-by">Sponsored by <img alt="{$alt}" src="{$src}"/></p> 
    </xsl:template>

</xsl:stylesheet>
