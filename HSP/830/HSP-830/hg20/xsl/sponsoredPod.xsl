<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">      
        <xsl:apply-templates select="Category"/>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type='crossLinking']">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">editorial-module</xsl:when>
                <xsl:otherwise>sponsor-module</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="id">
            <xsl:value-of select="concat($initial,$position)"/>
        </xsl:variable>
        
        <div class="pod sponsor-pod banner promo" id="{$id}">
            <div class="hd"></div>
            <div class="bd crsl">
                <xsl:apply-templates select="Category" mode="cross-link"/>
            </div>
            <div class="ft"></div>
        </div>
        <xsl:call-template name="omniture-track"/>
    </xsl:template>
    
    <xsl:template match="Category" mode="cross-link">
        <xsl:variable name="href">
            <xsl:value-of select="DescriptionURL"/>
        </xsl:variable>
        <span><xsl:value-of select="Title"/></span>
        <xsl:apply-templates select="Image" mode="cross-link"/>
        <xsl:choose>
            <xsl:when test="child::DescriptionURL">
                <a rel="sm-desc" target="_blank" href="{$href}">
                    <p><xsl:value-of select="Description"/></p>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <p>
                    <xsl:value-of select="Description"/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="SponsoredBy"/>
    </xsl:template>
    
    <xsl:template match="Image" mode="cross-link">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="child::Url"/>
        </xsl:variable>
        <xsl:variable name="au-pos">
            <xsl:value-of select="count(ancestor::AssetUsage/preceding-sibling::AssetUsage) + 1"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">em</xsl:when>
                <xsl:otherwise>sm</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="zone">
            <xsl:value-of select="ancestor::AssetUsage/@zone"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat($initial,$au-pos,'-',$zone,'-','img')"/>
        </xsl:variable>
        <a  rel="{$rel}" href="{$href}" target="_blank">
            <img src="{$src}" alt="{$alt}"/>
        </a>
    </xsl:template>
    
    <xsl:template match="Title[parent::Category]">
        <div class="hd">
            <h4>
                <xsl:value-of select="."/>
            </h4>
        </div>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <xsl:variable name="au-pos">
            <xsl:value-of select="count(ancestor::AssetUsage/preceding-sibling::AssetUsage) + 1"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">em</xsl:when>
                <xsl:otherwise>sm</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="zone">
            <xsl:value-of select="ancestor::AssetUsage/@zone"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat($initial,$au-pos,'-',$zone,'-','img')"/>
        </xsl:variable>
        <a  rel="{$rel}" href="{$href}" target="_blank">
            <img src="{$src}" alt="{$alt}" class="thumb" height="69" width="92"/>
        </a>
    </xsl:template>
    
    <xsl:template match="Description">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="Link">
        <xsl:variable name="href">
            <xsl:value-of select="@href"/>
        </xsl:variable>
        <a href="{$href}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="assetCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        <xsl:variable name="linkCountDivideByTwo">
            <xsl:value-of select="$assetCount div 2"/>        
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
        <xsl:variable name="position">
            <xsl:value-of select="count(parent::AssetUsage/preceding-sibling::AssetUsage) + 1"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">editorial-module</xsl:when>
                <xsl:otherwise>sponsor-module</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="id">
            <xsl:value-of select="concat($initial,$position)"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="not(child::Image)">
                <xsl:choose>
                    <xsl:when test="$assetCount &gt; 5">
                        <div class="pod sponsor-pod promo list-2" id="{$id}">
                            <div class="hd">
                                <h4><xsl:value-of select="Title"/></h4>                                
                            </div>
                            <div class="bd clrfix">
                                <ul class="list col1">
                                    <xsl:apply-templates select="Asset[position() &lt;= $cutoff]"/>
                                </ul>
                                <ul class="list col2">
                                    <xsl:apply-templates select="Asset[position() &gt; $cutoff]"/>
                                </ul>
                                <xsl:apply-templates select="SponsoredBy"/>
                            </div>
                            <div class="ft"></div>
                        </div>                        
                    </xsl:when>
                    <xsl:otherwise>
                        <div class="pod sponsor-pod promo" id="{$id}">
                            <div class="hd">
                                <h4><xsl:value-of select="Title"/></h4>
                            </div>
                            <div class="bd clrfix">
                                <ul class="list">
                                    <xsl:apply-templates select="Asset"/>
                                </ul>
                                <xsl:apply-templates select="SponsoredBy"/>
                            </div>
                            <div class="ft"></div>
                        </div>                       
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                 <xsl:choose>
                     <xsl:when test="child::Description">
                         <div class="pod sponsor-pod promo" id="{$id}">                    
                             <xsl:apply-templates select="Title"/>
                             <div class="bd clrfix">
                                 <xsl:apply-templates select="Image"/>
                                 <xsl:apply-templates select="Description"/>
                                 <ul class="list">
                                     <xsl:apply-templates select="Asset"/>
                                 </ul>
                                 <xsl:apply-templates select="SponsoredBy"/>
                             </div>
                             <div class="ft"></div>
                         </div>
                     </xsl:when>
                     <xsl:otherwise>
                         <div class="pod sponsor-pod" id="{$id}">
                             <xsl:apply-templates select="Title"/>
                             <div class="bd clrfix">
                                 <xsl:apply-templates select="Image"/>
                                 <ul class="list">
                                     <xsl:apply-templates select="Asset"/>
                                 </ul>
                                 <xsl:apply-templates select="SponsoredBy"/>
                             </div>
                             <div class="ft"></div>
                         </div>
                     </xsl:otherwise>
                 </xsl:choose>                
            </xsl:otherwise>                
        </xsl:choose>
        <xsl:call-template name="omniture-track"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="au-pos">
            <xsl:value-of select="count(ancestor::AssetUsage/preceding-sibling::AssetUsage) + 1"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">em</xsl:when>
                <xsl:otherwise>sm</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="zone">
            <xsl:value-of select="ancestor::AssetUsage/@zone"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat($initial,$au-pos,'-',$zone,'-',$position)"/>
        </xsl:variable>
        <li>
            <a rel="{$rel}" href="{$href}"><xsl:apply-templates select="child::Title"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="SponsoredBy">
        <xsl:variable name="href">
            <xsl:value-of select="Image/Url"/>
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
        <xsl:variable name="au-pos">
            <xsl:value-of select="count(ancestor::AssetUsage/preceding-sibling::AssetUsage) + 1"/>
        </xsl:variable>
        <xsl:variable name="initial">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name = 'Editorial Pod'">em</xsl:when>
                <xsl:otherwise>sm</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="zone">
            <xsl:value-of select="ancestor::AssetUsage/@zone"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat($initial,$au-pos,'-',$zone)"/>
        </xsl:variable>
        <p class="sponsored-by">
            <span>Sponsored by:</span>
            <a rel="{$rel}" href="{$href}" target="_blank">
                <img alt="{$alt}" src="{$src}" />
            </a>        
        </p>        
    </xsl:template>
    
    <xsl:template name="omniture-track">
        <xsl:variable name="pod-type">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name='Editorial Pod'">Right Rail Editorial Pod</xsl:when>
                <xsl:otherwise>Right Rail Sponsor Pod</xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        
        <xsl:variable name="position">
            <xsl:choose>
                <xsl:when test="self::AssetUsage">
                    <xsl:value-of select="count(preceding-sibling::AssetUsage) +1"/>
                </xsl:when>
                <xsl:otherwise><xsl:value-of select="count(ancestor::AssetUsage/preceding-sibling::AssetUsage) + 1"/></xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        
            <xsl:choose>
                <xsl:when test="$pod-type = 'Right Rail Sponsor Pod'">                    
                    <script type="text/javascript">
                        <xsl:text>SNI.HGTV.Omniture.ClickTrack("#sponsor-module</xsl:text><xsl:value-of select="$position"/>
                        <xsl:text>","</xsl:text><xsl:value-of select="concat($pod-type,' ',$position)"/><xsl:text>","</xsl:text>
                        <xsl:value-of select="concat('Sponsor_Module_',$position)"/><xsl:text>")</xsl:text>
                    </script>
                </xsl:when>
                <xsl:otherwise>
                    <script type="text/javascript">
                        <xsl:text>SNI.HGTV.Omniture.ClickTrack("#editorial-module</xsl:text><xsl:value-of select="$position"/>
                        <xsl:text>","</xsl:text><xsl:value-of select="concat($pod-type,' ',$position)"/><xsl:text>","</xsl:text>
                        <xsl:value-of select="concat('Editorial_Module_',$position)"/><xsl:text>")</xsl:text>
                    </script>
                </xsl:otherwise>
            </xsl:choose>            
           
    </xsl:template>

</xsl:stylesheet>
