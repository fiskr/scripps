<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category">
            
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="href">
            <xsl:value-of select="AllProducts/Url"/>
        </xsl:variable>            
        <div class="acco-link">
            <a href="{$href}" class="open-only">
                <xsl:text>All Products (</xsl:text><xsl:value-of select="AssetCount"/><xsl:text>)</xsl:text>
            </a>
            <h5><em></em>Featured Products</h5>
        </div>
        <div class="acco-bd">
            <div class="acco-content">
                <div id="featured-products" class="crsl-feature">
                    <div class="hd"></div>                    
                    <div class="bd crsl">
                        <ul>
                              <xsl:apply-templates select="Category"/> 
                        </ul>
                    </div>
                    <div class="ft"></div>
                </div>
                <script type="text/javascript">
                    <![CDATA[
                        $("#featured-products").dpl('carousel', { pagelink:"image" });
                        ]]>
                </script>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="imageCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        
        <xsl:variable name="img-var">
            <xsl:choose>
                <xsl:when test="ancestor::AssetUsage/@context= 'Article'">4</xsl:when>
                <xsl:otherwise>3</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$imageCount mod $img-var =0">
                    <xsl:value-of select="$imageCount div $img-var"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$imageCount div $img-var + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
      
        <xsl:call-template name="for-loop">
            <xsl:with-param name="i">1</xsl:with-param>
            <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>
            <xsl:with-param name="img-var"><xsl:value-of select="$img-var"/></xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>
        <xsl:param name="img-var"/>
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * $img-var"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * $img-var"/>
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
                <xsl:with-param name="img-var"><xsl:value-of select="$img-var"/></xsl:with-param>
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <li>
            <xsl:variable name="href">
                <xsl:value-of select="Url"/>
            </xsl:variable>
            <a href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <a href="{$href}"><xsl:value-of select="Title"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="92" height="69"/>
    </xsl:template>
</xsl:stylesheet>
