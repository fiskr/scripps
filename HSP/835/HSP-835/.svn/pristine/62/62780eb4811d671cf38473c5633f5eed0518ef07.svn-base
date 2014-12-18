<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <ol>
                <xsl:apply-templates select="AssetUsage/Category/Asset"/>
            </ol>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="AssetOffset"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <div class="proj-summary clrfix">
                <h5>
                    <xsl:value-of select="$position"/>
                    <xsl:text>. </xsl:text>
                    <a href="{$href}" rel="mtpt-{$position}"><xsl:value-of select="Title"/></a>
                </h5>
                <div class="proj-image">
                    <a href="{$href}" rel="mtpi-{$position}">
                        <xsl:apply-templates select="Image"/>
                    </a>
                    <div class="thumb-rate rated">
                        <xsl:apply-templates select="Review"/>
                    </div>
                </div>
                <div class="proj-details">
                        <p><xsl:value-of select="Description"/></p>
                        <dl class="clrfix">
                            <xsl:if test="child::Time">
                                <dt>Time:</dt><dd> <xsl:value-of select="Time"/></dd>                                
                            </xsl:if>
                            <xsl:if test="child::Cost">
                                <xsl:apply-templates select="Cost"/>
                            </xsl:if>
                            <xsl:if test="child::DifficultyLevel">
                                <dt>Difficulty:</dt><dd> <xsl:value-of select="DifficultyLevel"/></dd>
                            </xsl:if>
                        </dl>
                    </div>
            </div>            
        </li>
    </xsl:template>
    
    <xsl:template match="Cost">
        <dt>Cost:</dt><dd> $<xsl:value-of select="Min"/> to $<xsl:value-of select="Max"/></dd>
    </xsl:template>
    
    <xsl:template match="Review">
        <xsl:variable name="position">
            <xsl:value-of select="parent::Asset/AssetOffset"/>
        </xsl:variable>
        <a rel="mtp-{$position}">
            <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
            <xsl:value-of select="ReviewCount"/><xsl:text> Thumbs</xsl:text>
        </a>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}"/>
    </xsl:template>

</xsl:stylesheet>
