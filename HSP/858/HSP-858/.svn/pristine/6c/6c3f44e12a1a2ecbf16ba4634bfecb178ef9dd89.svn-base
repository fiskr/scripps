<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   
    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse[child::AssetUsage/@context='Photo-gallery']">
        <xsl:if test="child::AssetUsage">
            <div id="rel-photos">
                <div class="hd">
                    <h2>Related Photo Galleries</h2>
                </div>            
                <div class="bd">
                    <ul class="accordion">
                        <xsl:apply-templates select="AssetUsage[position() &lt; 11]"/>
                        <script type="text/javascript" language="JavaScript">
                            <![CDATA[
                                $(".relphotos-crsl").dpl("carousel",{
                                pagelink:"text",
                                pagetext:"_current of _total"
                                });
                            ]]>
                        </script>	
                    </ul>
                </div>
            </div>
            <script type="text/javascript">
                <![CDATA[
                    $('#rel-photos ul.accordion').dpl('toggler');
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage">
            <div class="related">
                <h2>Related Content</h2>
                <ul>
                    <xsl:apply-templates select="AssetUsage/Category/Asset[position() &lt; 11]" mode="Video"/>
                </ul>
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="count">
            <xsl:value-of select="count(parent::ServiceResponse/AssetUsage)"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="position()=1">
                <li class="expand clrfix">
                    <div class="acco-link">
                        <h3><xsl:value-of select="AssetUsageTitle"/></h3>
                    </div>
                    <div class="acco-bd clrfix">
                        <div class="relphotos-crsl crslThree-img crsl-we">
                            <div class="crsl bd">
                                <ul>
                                    <xsl:apply-templates select="Category"/>    
                                </ul>                                    
                            </div>
                        </div>
                    </div>   
                </li>
            </xsl:when>
            <xsl:when test="position()=2 and $count &gt; 2">
                <li class="expand clrfix">
                    <div class="acco-link">
                        <h3><xsl:value-of select="AssetUsageTitle"/></h3>
                    </div>
                    <div class="acco-bd clrfix">
                        <div class="relphotos-crsl crslThree-img crsl-we">
                            <div class="crsl bd">
                                <ul>
                                    <xsl:apply-templates select="Category"/>    
                                </ul>                                    
                            </div>
                        </div>
                    </div>   
                </li>
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <div class="acco-link">
                        <h3><xsl:value-of select="AssetUsageTitle"/></h3>
                    </div>
                    <div class="acco-bd clrfix">
                        <div class="relphotos-crsl crslThree-img crsl-we">
                            <div class="crsl bd">
                                <ul>
                                    <xsl:apply-templates select="Category"/>    
                                </ul>
                            </div>
                        </div>
                    </div>                    
                </li>
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>
    
    <xsl:template match="Category">
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
    
    <xsl:template match="Asset">
        <li>
            <xsl:variable name="href">
                <xsl:value-of select="Url"/>
            </xsl:variable>
            <a href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>               
        </li>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Video">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="child::AssetType = 'Video'">
                <li>Video:
                    <a href="{$href}">
                        <xsl:value-of select="Title"/>
                    </a>   
                </li>
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <a href="{$href}">
                        <xsl:value-of select="Title"/>
                    </a>   
                </li>
            </xsl:otherwise>
        </xsl:choose>
        
        
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
