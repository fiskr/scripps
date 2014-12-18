<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

   <xsl:output method="html"/>
    <!-- Global Variables -->
    <xsl:variable name="pod">
        <xsl:value-of select="ServiceResponse/@name"/>
    </xsl:variable>
    <xsl:variable name="translatePod">
        <xsl:value-of select="translate($pod,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
    <xsl:variable name="podType">
        <xsl:choose>
            <xsl:when test="$translatePod = 'editorial pod'">em</xsl:when>
            <xsl:otherwise>sm</xsl:otherwise>
        </xsl:choose>        
    </xsl:variable>
    
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:choose>
            <xsl:when test="@type = 'crossLinking'">
                <xsl:apply-templates select="Category" mode="cross-link"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="Category"/>        
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="backgroundColor">
            <xsl:value-of select="TitleBackgroundColor"/>
        </xsl:variable>
        <xsl:variable name="lbc">
            <xsl:value-of select="translate($backgroundColor,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
        </xsl:variable>
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="child::Description">pod paint sponsored-pod</xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
                        <xsl:when test="not(child::Image)">pod tile sponsored-pod</xsl:when>
                        <xsl:otherwise>pod tile sponsored-pod alt</xsl:otherwise>
                    </xsl:choose>
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
        <div class="{$class} {$lbc}" id="{$id}">
            <div class="hd">
                <h4>
                    <a rel="{$podType}-title">
                        <xsl:attribute name="href"><xsl:value-of select="child::TitleURL"/></xsl:attribute>
                        <xsl:value-of select="child::Title"/>
                    </a>
                </h4>
            </div>            
            <div class="bd clrfix">
                <xsl:apply-templates select="Image"/>
                <xsl:choose>
                    <xsl:when test="$class ='pod paint sponsored-pod'">
                        <xsl:apply-templates select="Description"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <ul class="list">
                            <xsl:apply-templates select="Asset"/>
                        </ul>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <xsl:apply-templates select="SponsoredBy"/>
        </div>
        <xsl:call-template name="omniture-track"/>
    </xsl:template>
    
    <xsl:template match="Category" mode="cross-link">
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
       <div class="pod sister-promo" id="{$id}">
           <div class="bd item">
               <a target="_blank" rel="{$podType}-img">
                   <xsl:attribute name="href"><xsl:value-of select="Image/Url"/></xsl:attribute>
                   <img>
                       <xsl:attribute name="src"><xsl:value-of select="Image/ImageURL"/></xsl:attribute>
                       <xsl:attribute name="alt"><xsl:value-of select="Image/Alt"/></xsl:attribute>
                   </img>
               </a>
               <xsl:apply-templates select="Description" mode="cross-link"/>
           </div>
       </div>  
        <xsl:call-template name="omniture-track"/>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="href">            
            <xsl:value-of select="child::Url"/>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <div class="image">
            <a href="{$href}" rel="{$podType}-img">
                <img src="{$src}" alt="{$alt}"/>
            </a>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>        
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
            <li>
                <a href="{$href}" rel="{$podType}-{$position}">
                    <xsl:value-of select="Title"/>
                </a>
            </li>
    </xsl:template>
    
    <xsl:template match="Description">
        <p>
            <xsl:value-of select="."/>
            <xsl:apply-templates select="following-sibling::ViewProjects"/>
        </p>
    </xsl:template>
    
    <xsl:template match="Description" mode="cross-link">
        <xsl:variable name="desc-url">
            <xsl:value-of select="parent::Category/DescriptionURL"/>
        </xsl:variable>
        <p>
            <xsl:choose>
                <xsl:when test="parent::Category/DescriptionURL">
                    <a href="{$desc-url}" rel="{$podType}-description" target="_blank">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </p>
    </xsl:template>
    
    <xsl:template match="Link">
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Link) + 1"/>
        </xsl:variable>
        <a target="_blank" rel="{$podType}-{$position}">
            <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
            <xsl:value-of select="."/>
        </a>
    </xsl:template>
    
    <xsl:template match="ViewProjects">
        <a rel="{$podType}-ViewProjects">
            <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
            <xsl:value-of select="Label"/>
        </a>
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
        <div class="ft clrfix">
            <p>Sponsored by:
                <a href="{$href}" class="sponsor-img" rel="{$podType}-sponsor-img" target="_blank">
                    <img src="{$src}" alt="{$alt}"/>
                </a>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template name="omniture-track">
        <xsl:variable name="mod-type">
            <xsl:choose>
                <xsl:when test="ancestor::ServiceResponse/@name='Editorial Pod'">Editorial Modules</xsl:when>
                <xsl:otherwise>Sponsored Modules</xsl:otherwise>
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
            <xsl:when test="$mod-type = 'Sponsored Modules'">                    
                <script type="text/javascript">
                    <xsl:text>SNI.DIY.Omniture.ClickTrack("#sponsor-module</xsl:text><xsl:value-of select="$position"/>
                    <xsl:text>","</xsl:text><xsl:value-of select="concat($mod-type,' ',$position)"/><xsl:text>","</xsl:text>
                    <xsl:value-of select="concat('Sponsor_Module_',$position)"/><xsl:text>")</xsl:text>
                </script>
            </xsl:when>
            <xsl:otherwise>
                <script type="text/javascript">
                    <xsl:text>SNI.DIY.Omniture.ClickTrack("#editorial-module</xsl:text><xsl:value-of select="$position"/>
                    <xsl:text>","</xsl:text><xsl:value-of select="concat($mod-type,' ',$position)"/><xsl:text>","</xsl:text>
                    <xsl:value-of select="concat('Editorial_Module_',$position)"/><xsl:text>")</xsl:text>
                </script>
            </xsl:otherwise>
        </xsl:choose>            
        
    </xsl:template>

</xsl:stylesheet>
