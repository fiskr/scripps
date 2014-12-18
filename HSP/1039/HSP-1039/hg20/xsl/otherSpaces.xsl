<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <div id="dp-other-spaces" class="dp-acco">
                <div class="hd">
                    <h4>Other Rooms You Might Like</h4>
                </div>
                <div class="bd">
                    <ul class="acco-dp clrfix">
                        <xsl:apply-templates select="AssetUsage"/>
                    </ul>
                </div>
                <div class="ft"></div>
            </div>
            <script type="text/javascript">
                <![CDATA[
                    $("#dp-other-spaces-1").dpl('carousel', { pagelink:"image" });
                    $("#dp-other-spaces-2").dpl('carousel', { pagelink:"image" });
                    $("#dp-other-spaces-3").dpl('carousel', { pagelink:"image" });
                    $("#dp-other-spaces-4").dpl('carousel', { pagelink:"image" });
                    $('#dp-other-spaces .acco-dp').dpl('accordion');
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li class="acco-bg">
            <div class="acco-link">
                <h5><em></em><xsl:value-of select="AssetUsageTitle"/></h5>
            </div>
            <div class="acco-bd">
                <div class="acco-content">
                    <div id="dp-other-spaces-{$position}" class="acco-crsl clrfix">
                        <div class="crsl">
                            <ul>
                                   <xsl:apply-templates select="Category"/> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="imageCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$imageCount mod 4 =0">
                    <xsl:value-of select="$imageCount div 4"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$imageCount div 4 + 1"/>
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
            <xsl:value-of select="$i-1 * 4"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 4"/>
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
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset )+ 1"/>
        </xsl:variable>
        <li>           
            <a rel="os-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="desc">
                <a rel="os-title-{$position}" href="{$href}">
                    <xsl:value-of select="Title"/>
                </a>
                <xsl:if test="child::SubTitle">
                    <span class="designer">
                        <xsl:value-of select="SubTitle"/>
                    </span>
                </xsl:if>
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
        <img src="{$src}" alt="{$alt}" width="92" height="69"></img>
    </xsl:template>
    
</xsl:stylesheet>
