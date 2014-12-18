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
        <xsl:if test="child::AssetUsage/Category/Asset">
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
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="child::Description">pod paint sponsored-pod</xsl:when>
                <xsl:otherwise>pod tile sponsored-pod alt</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div class="{$class}">
            <xsl:apply-templates select="Title"/>
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
    </xsl:template>
    
    <xsl:template match="Category" mode="cross-link">
       <div class="pod sister-promo">
           <a target="_blank" rel="{$podType}-img">
               <xsl:attribute name="href"><xsl:value-of select="Image/Url"/></xsl:attribute>
               <img>
                   <xsl:attribute name="src"><xsl:value-of select="Image/ImageURL"/></xsl:attribute>
                   <xsl:attribute name="alt"><xsl:value-of select="Image/Alt"/></xsl:attribute>
               </img>
           </a>
               <xsl:apply-templates select="Description" mode="cross-link"/>
       </div>    
    </xsl:template>
    
    <xsl:template match="Title">
        <div class="hd">
            <h4><xsl:value-of select="."/></h4>
        </div>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="href">            
            <xsl:value-of select="parent::Category/Url"/>
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
                    <a href="{$desc-url}" target="_blank">
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
        <a target="_blank">
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
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="Image/ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Image/Alt"/>
        </xsl:variable>
        <div class="ft clrfix">
            <p>Sponsored by:
                <a href="{$href}" class="sponsor-img" rel="{$podType}-sponsor-img">
                    <img src="{$src}" alt="{$alt}"/>
                </a>
            </p>
        </div>
    </xsl:template>

</xsl:stylesheet>
