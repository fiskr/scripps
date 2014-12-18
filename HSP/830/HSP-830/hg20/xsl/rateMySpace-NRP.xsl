<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">        
            <div class="acco-bd">
                <xsl:apply-templates select="Category"/>
            </div>
            <div class="acco-link">
                <h5>Rate My Space</h5>
                <p>Ideas from users like you.</p>
            </div>        
    </xsl:template>
    
    <xsl:template match="Category">
        <div id="ratemyspace-noresults" class="acco-content acco-crsl">
            <div class="crsl">
                <ul>
                    <xsl:apply-templates select="Asset"/>
                </ul>
                <p><a href="http://www.roomzaar.com/rate-my-space/editupload.esi">Upload your project</a></p>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                    $("#ratemyspace-noresults").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
                ]]>
            </script>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="usr-href">
            <xsl:value-of select="User/Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="rms-img-{$position}"><xsl:apply-templates select="Image"/></a>
            <xsl:apply-templates select="Rating"/>
            <p class="title"><xsl:text>By: </xsl:text><a rel="rms-user-{$position}"><xsl:value-of select="User/UserName"/></a></p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:choose>
                <xsl:when test="child::ImageURL">
                    <xsl:value-of select="ImageURL"/>        
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="small_thumb"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:choose>
                <xsl:when test="child::Alt">
                    <xsl:value-of select="Alt"/>        
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="alt"/>
                </xsl:otherwise>
            </xsl:choose>           
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" height="90" width="120"/>        
    </xsl:template>
    
    <xsl:template match="AssetId | Site | AssetType">
        
    </xsl:template>

</xsl:stylesheet>
