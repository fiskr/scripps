<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">       
            <table class="products">
                <xsl:apply-templates select="Category"/>
            </table>        
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
            <xsl:with-param name="funcall" select="1"/>
        </xsl:call-template>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>       
        <xsl:choose>
            <xsl:when test="position()= 1">
                <td class="first">
                    <a href="{$href}">
                        <xsl:apply-templates select="Image"/>
                        <xsl:value-of select="Title"/>
                    </a>
                </td>    
            </xsl:when>
            <xsl:when test="position() = 3">
                <td class="last">
                    <a href="{$href}">
                        <xsl:apply-templates select="Image"/>
                        <xsl:value-of select="Title"/>
                    </a>
                </td>    
            </xsl:when>
            <xsl:otherwise>
                <td>
                    <a href="{$href}">
                        <xsl:apply-templates select="Image"/>
                        <xsl:value-of select="Title"/>
                    </a>
                </td>    
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
        <img src="{$src}" alt="{$alt}" height="120" width="160"/>        
    </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>
        <xsl:param name="funcall"/>
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
            <xsl:choose>
                <xsl:when test="$funcall = 1">
                    <tr class="first">
                        <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                    </tr>    
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>
                <xsl:with-param name="funcall"><xsl:value-of select="$funcall + 1"/></xsl:with-param>
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    

</xsl:stylesheet>
