<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div class="pod blog">
            <h3 class="sub-header">
                <xsl:value-of select="AssetUsageTitle"/>
            </h3>
            <p class="more">
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="MoreBlog/Url"/>
                    </xsl:attribute>
                    <xsl:value-of select="MoreBlog/Label"/>
                </a>
            </p>
            <div class="bd">
               <ul>
                   <xsl:apply-templates select="Category/Asset"/>
               </ul>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <h4>
                <a href="{$href}"><xsl:value-of select="Title"/></a>
            </h4>
           <xsl:apply-templates select="Description"/>
            <p class="meta">
               <xsl:text>Comments (</xsl:text><xsl:value-of select="CommentCount"/><xsl:text>) </xsl:text>
                <xsl:apply-templates select="PostingDate"/>
            </p>
        </li>
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
    
    <xsl:template match="PostingDate">
        <xsl:text>| Posted </xsl:text><xsl:value-of select="Month"/><xsl:text>. </xsl:text><xsl:value-of select="Date"/><xsl:text>,</xsl:text><xsl:value-of select="Year"/>
    </xsl:template>

</xsl:stylesheet>
