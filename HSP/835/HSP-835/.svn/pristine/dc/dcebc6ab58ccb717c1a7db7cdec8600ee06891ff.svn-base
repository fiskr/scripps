<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <div class="pod" id="inside-pod">
                <xsl:apply-templates select="AssetUsage/Category"/>    
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[SNI.DIY.Omniture.ClickTrack('#inside-pod','Table Of  Contents','TOC_module')]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="count">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>        
        <xsl:variable name="linkCountDivideByTwo">
            <xsl:value-of select="$count div 2"/>        
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
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="$count &gt; 5">columns clrfix</xsl:when>
                <xsl:otherwise>clrfix</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div class="hd">
            <a rel="tc-title">
                <xsl:attribute name="href">
                    <xsl:value-of select="Url"/>
                </xsl:attribute>
                <h4>
                    <xsl:value-of select="Title"/>
                </h4>
            </a>
        </div>
        <div class="bd">
            <div class="{$class}">                
                <xsl:choose>
                    <xsl:when test="$count &gt; 5">
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
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <li>
            <a rel="tct-{$position}">
                <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>


</xsl:stylesheet>
