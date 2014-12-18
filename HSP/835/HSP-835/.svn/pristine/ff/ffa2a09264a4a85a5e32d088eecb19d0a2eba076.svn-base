<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>  
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="product-ideas" class="pod crsl-ww">
            <div class="hd">
                <h4>
                    <xsl:value-of select="AssetUsageTitle"/>
                </h4>
                <div class="bd crsl">
                    <ul>
                        <xsl:apply-templates select="Category/Asset"/>
                    </ul>
                    <p class="more"><xsl:apply-templates select="MoreInfo"/></p>
                </div>
            </div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[SNI.Common.Carousel("#product-ideas", { pagelink:"text", pagetext:"_current of _total" });
                SNI.DIY.Omniture.ClickTrack('#products-ideas','Products','Products_module');
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="prodi-{$position}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p>
                <a href="{$href}" rel="prodt-{$position}">
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
    
    <xsl:template match="MoreInfo">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <a href="{$href}" rel="prod-more">
            <xsl:value-of select="Label"/>
        </a>
    </xsl:template>
    

</xsl:stylesheet>
