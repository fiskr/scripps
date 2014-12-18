<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="tour-rooms" class="pod crsl-ww">
            <div class="hd">
                <h4>Tour More Rooms</h4>
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Category/Asset"/>
                </ul>
            </div>
            <div class="ft"></div>	
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#tour-rooms").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });	
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
            <a rel="TMR-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p>
                <a rel="TMR-title-{$position}" href="{$href}">
                    <xsl:value-of select="Title"/>
                </a>    
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="120" height="90"/>
    </xsl:template>


</xsl:stylesheet>
