<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:variable name="asset-count">
        <xsl:value-of select="count(ServiceResponse/AssetUsage/Category/Asset)"/>
    </xsl:variable>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <div id="products-showcase" class="clrfix">
            <xsl:apply-templates select="Category"/>            
                <xsl:apply-templates select="MoreInfo"/>          
        </div>
        <script type="text/javascript">
            <![CDATA[SNI.DIY.Omniture.ClickTrack('#products-showcase','Products','Products_module');]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <ul class="grid">
            <xsl:apply-templates select="Asset"/>
        </ul>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="position() mod 3 = 0">cell cap</xsl:when>
                <xsl:otherwise>cell</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li class="{$cname}">
            <div class="bd">
                <a href="{$href}" class="img-container" rel="prodi-{$position}">
                    <xsl:apply-templates select="Image"/>
                </a>            
            <a href="{$href}" class="desc" rel="prodt-{$position}">
                <xsl:value-of select="Title"/>
            </a>
             <div class="products-ft clrfix">
                 <a href="{$href}" class="button" rel="prod-buy">
                     <span>Get Info</span>
                 </a>
             </div>
        </div>
        </li>
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
    
    <xsl:template match="MoreInfo">
        <div class="pagination">
            <a rel="prod-more">
                <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
                <xsl:value-of select="Label"/>
            </a>
        </div>
    </xsl:template>

</xsl:stylesheet>
