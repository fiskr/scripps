<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div class="pod" id="my-dream-cabin">
            <div class="hd clrfix">
                <h4>My Dream Cabin</h4>
                <a class="more" href="http://my.diynetwork.com/my-dream-cabin">upload your own</a>
            </div>
            <div class="bd">
                <ul class="menu small-nav clrfix">
                    <xsl:for-each select="Category">
                        <xsl:variable name="position">
                            <xsl:value-of select="position()"/>
                        </xsl:variable>
                        <li>
                            <a href="#dream-cabin-tab{$position}"><span><xsl:value-of select="@type"/></span></a>
                        </li>
                    </xsl:for-each>
                </ul>
                <xsl:apply-templates select="Category"/>
            </div>
        </div>
        <script type="text/javascript">
            <![CDATA[SNI.DIY.Tabs("#my-dream-cabin .small-nav", { forcePositionCenter: false});]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <div id="dream-cabin-tab{$position}">
            <ol class="thumbs">
                <xsl:apply-templates select="Asset"/>
            </ol>            
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="position() = 1">
                <li class="first">
                    <a class="thumbnail" href="{$href}">
                        <xsl:apply-templates select="Image"/>
                    </a>
                    <p class="title">
                        <a href="{$href}"><xsl:value-of select="Title"/></a>
                    </p>
                </li>
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <a class="thumbnail" href="{$href}">
                        <xsl:apply-templates select="Image"/>
                    </a>
                    <p class="title">
                        <a href="{$href}"><xsl:value-of select="Title"/></a>
                    </p>
                </li>
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="small_thumb"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="92" height="69"/>
    </xsl:template>

</xsl:stylesheet>
