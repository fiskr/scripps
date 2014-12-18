<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:variable name="context">
        <xsl:value-of select="ServiceResponse/AssetUsage/@context"/>
    </xsl:variable>
    <xsl:variable name="lowerCaseContext">
        <xsl:value-of select="translate($context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
    <xsl:variable name="logo-src">
        <xsl:value-of select="//ServiceResponse/AssetUsage/Logo/LogoImage/ImageURL"/>
    </xsl:variable>
    <xsl:variable name="logo-alt">
        <xsl:value-of select="//ServiceResponse/AssetUsage/Logo/LogoImage/ALT"/>
    </xsl:variable>
    <xsl:variable name="logo-url">
        <xsl:value-of select="//ServiceResponse/AssetUsage/Logo/Url"/>
    </xsl:variable>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="blog">
            <xsl:apply-templates select="Bio"/>
            <xsl:apply-templates select="Category"/>
            <xsl:apply-templates select="FromThisBlog"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Bio">
        <div class="hd">
            <!--<xsl:if test="$lowerCaseContext ='ecologue'">
                <p class="powered-by">Powered by: <a href="{$logo-url}" target="_blank"><img src="{$logo-src}" alt="{$logo-alt}"/></a></p> 
            </xsl:if>--> <!-- Commenting out this change as from now on the green living section blog will not be making a call to the ecologue blog module -->
            <h2>
                <xsl:value-of select="Name"/>
            </h2>            
            <p class="intro"><xsl:value-of select="Description"/></p>
        </div>
    </xsl:template>
    
    <xsl:template match="Category">
        <div class="bd">
            <xsl:apply-templates select="Asset"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <div class="entry">
            <cite><xsl:value-of select="Month"/><xsl:text> </xsl:text><xsl:value-of select="Date"/>, <xsl:value-of select="Year"/></cite>
            <h4><a href="{$href}"><xsl:value-of select="Title"/></a></h4>
            <xsl:apply-templates select="Description"/>
        </div>
    </xsl:template>
    
    <xsl:template match="Description">
        <xsl:variable name="desc">
            <xsl:value-of select="."/>
        </xsl:variable>
        <xsl:variable name="desc-mod">
            <xsl:choose>
                <xsl:when test="string-length($desc) &gt; 120">
                    <xsl:value-of select="concat(substring($desc,1,117), '&#8230;')"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$desc"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <p>
            <xsl:value-of select="$desc-mod"/>
        </p>
    </xsl:template>
    
    <xsl:template match="FromThisBlog">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$lowerCaseContext ='ecologue'">
                <div class="ft">
                    <a href="{$href}" class="morelink" target="_blank"><xsl:value-of select="Label"/></a>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div class="ft">
                    <a href="{$href}" class="morelink"><xsl:value-of select="Label"/></a>
                </div>
            </xsl:otherwise>
        </xsl:choose>
        
        
    </xsl:template>



</xsl:stylesheet>
