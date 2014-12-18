<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
      <xsl:if test="AssetUsage/Category/Asset">
          <xsl:apply-templates select="AssetUsage"/>
      </xsl:if>  
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:choose>
            <xsl:when test="@context = 'Project'">
                <xsl:apply-templates select="Category" mode="RR"/>
            </xsl:when>
            <xsl:when test="@context='Episode'">
               <xsl:apply-templates select="Category" mode="CR"/> 
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="Category" mode="LR"/>   
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="Category" mode="LR">
        <div id="product-ideas" class="pod crsl-ww">
            <div class="hd">
                <h4>Product</h4>                
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Asset"/>
                </ul>
                <p class="more">
                    <a>
                        <xsl:attribute name="href"><xsl:value-of select="following-sibling::MoreInfo/Url"/></xsl:attribute>
                        <xsl:value-of select="following-sibling::MoreInfo/Label"/>
                    </a>
                </p>
            </div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[SNI.Common.Carousel("#product-ideas", { pagelink:"text", pagetext:"_current of _total" });]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category" mode="RR">
        <div id="products-right-rail" class="pod crsl-e wood">
            <h4>Product</h4>
            <div class="bd crsl">
                <ul>
                    <xsl:variable name="assetCount">
                        <xsl:value-of select="count(Asset)"/>
                    </xsl:variable>
                    
                    <xsl:variable name="counter">            
                        <xsl:choose>
                            <xsl:when test="$assetCount mod 2 =0">
                                <xsl:value-of select="$assetCount div 2"/>
                            </xsl:when>
                            <xsl:otherwise>                    
                                <xsl:value-of select="$assetCount div 2 + 1"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>        
                    
                    <xsl:call-template name="for-loop">
                        <xsl:with-param name="i">1</xsl:with-param>
                        <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>            
                    </xsl:call-template>
                </ul>                
            </div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[SNI.DIY.Carousel("#products-right-rail", { pagelink:"image" });]]>
        </script>
        </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>        
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * 2"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 2"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop ">
            <li class="panel">                
                <ul class="crsl-group">
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]" mode="RR"/>
                </ul>                
            </li>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>                
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="prod-img-{$position}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p>
                <a href="{$href}" rel="prod-title-{$position}">
                    <xsl:value-of select="Title"/>
                </a>
            </p>
            <p class="price"><xsl:value-of select="Price"/></p>
        </li>
    </xsl:template>
    
    <xsl:template match="Asset" mode="RR">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="class-name">
            <xsl:choose>
                <xsl:when test="$position mod 2 = 0">last crsl-item</xsl:when>
                <xsl:otherwise>first crsl-item</xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <li class="{$class-name}">
            <a href="{$href}" rel="prod-img-{$position}">
                <xsl:apply-templates select="Image" mode="RR"/>
            </a>
            <p>
                <a href="{$href}" rel="prod-title-{$position}">
                    <xsl:value-of select="Title"/>
                </a>
            </p>
            <p class="price"><xsl:value-of select="Price"/></p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image" mode="RR">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}"/>
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
