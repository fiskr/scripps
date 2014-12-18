<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:choose>
                <xsl:when test="child::AssetUsage[@name='HGTV']">
                    <xsl:apply-templates select="AssetUsage" mode="HGTV"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="AssetUsage" mode="DH"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage" mode="HGTV">
        <div id="product-ideas" class="pod crsl-ww crsl">
            <div class="hd">
                <h4><xsl:value-of select="ancestor::ServiceResponse/@name"/></h4>
            </div>
            <xsl:apply-templates select="Category" mode="HGTV"/>
            <div class="ft"></div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                SNI.Common.Carousel("#product-ideas", {visible:1, displayPage: true }); 
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="AssetUsage" mode="DH">
        <div id="product-crsl" class="video-pod crsl-e">
            <div class="hd">
                <h4>Product Ideas</h4>
            </div>
            <div class="bd crsl">
                <ul>
                   <xsl:apply-templates select="Category" mode="DH"/> 
                </ul>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript">
            <![CDATA[
                $("#product-crsl").dpl('carousel', { pagelink:"image" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category" mode="DH">
        <xsl:variable name="imageCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>        
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$imageCount mod 3 =0">
                    <xsl:value-of select="$imageCount div 3"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$imageCount div 3 + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        
        <xsl:call-template name="for-loop">
            <xsl:with-param name="i">1</xsl:with-param>
            <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>        
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * 3"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 3"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop ">
            <li>                
                <ul>
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                </ul>                
            </li>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Category" mode="HGTV">
        <xsl:variable name="href">
            <xsl:value-of select="MoreProducts/Url"/>
        </xsl:variable>
        <div class="bd crsl-wrap">
            <ul>
                <xsl:apply-templates select="Asset"/>
            </ul>
            <p class="view-more">
                <a rel="pi-moreProducts" href="{$href}"><xsl:value-of select="MoreProducts/Label"/></a>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="Image/ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Image/Alt"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <li>
            <a rel="pi-img-{$position}" href="{$href}"><img data-src="{$src}" alt="{$alt}" width="120" height="90"/></a>
            <a rel="pi-title-{$position}" href="{$href}"><xsl:value-of select="Title"/></a>
        </li>
    </xsl:template>

</xsl:stylesheet>
