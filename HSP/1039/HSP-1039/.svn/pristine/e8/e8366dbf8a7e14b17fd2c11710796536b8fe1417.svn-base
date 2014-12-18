<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='Article' or @context='Episode']">
        <div class="related-link-wrap">
            <h2>Related Content</h2>
            <xsl:apply-templates select="Category/Asset" mode="Art-Epi"/>
        </div>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='Video' or @context='Photogallery']">
        <xsl:variable name="title">
            <xsl:choose>
                <xsl:when test="@context ='Video'">VIDEOS</xsl:when>
                <xsl:when test="@context='Photogallery'">PHOTO GALLERIES</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="id">
            <xsl:choose>
                <xsl:when test="@context ='Video'">related-videos</xsl:when>
                <xsl:when test="@context='Photogallery'">related-photo-galleries</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <li>
            <div class="acco-link">
                <h5><xsl:value-of select="$title"/></h5>
            </div>
            <div class="acco-bd">
                <div class="acco-content">
                    <div id="{$id}" class="crsl-feature">
                        <div class="hd"></div>
                        <div class="bd crsl">
                            <ul>
                                <xsl:apply-templates select="Category" mode="Video-PG"/>
                            </ul>
                        </div>
                        <div class="ft"></div>  
                    </div>
                    <xsl:choose>
                        <xsl:when test="@context ='Video'">
                            <script type="text/javascript">
                                <![CDATA[
                                    $("#related-videos").dpl('carousel', { pagelink:"image" });
                                ]]>
                            </script>        
                        </xsl:when>
                        <xsl:when test="@context='Photogallery'">
                            <script type="text/javascript">
                                <![CDATA[
                                    $("#related-photo-galleries").dpl('carousel', { pagelink:"image" });
                                ]]>
                            </script>
                        </xsl:when>
                    </xsl:choose>
                </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@context='Show']">
        <div class="inside-pod">
            <div class="hd">
                <h4>Similar Shows</h4>
            </div>
            <div class="bd">
                <ul class="list">
                    <xsl:apply-templates select="Category/Asset" mode="Shows"/>
                </ul>
            </div>
            <div class="ft"></div>
        </div>
    </xsl:template>
    
    <xsl:template match="Category" mode="Video-PG">
        <xsl:variable name="assetCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$assetCount mod 3 =0">
                    <xsl:value-of select="$assetCount div 3"/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$assetCount div 3 + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        
        <xsl:call-template name="for-loop">
            <xsl:with-param name="i">1</xsl:with-param>
            <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>            
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>        
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * 3"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 3"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop">
            <li>                
                <ul>
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]" mode="Video-PG"/>
                </ul>                
            </li>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>                
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Asset" mode="Video-PG">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:choose>
                <xsl:when test="ancestor::AssetUsage[@context='Video']">
                    <xsl:text>video-</xsl:text><xsl:value-of select="$position"/>
                </xsl:when>
                <xsl:when test="ancestor::AssetUsage[@context='Photogallery']">
                    <xsl:text>pg-</xsl:text><xsl:value-of select="$position"/>
                </xsl:when>
            </xsl:choose>
        </xsl:variable>
        <li>
            <a rel="img-{$rel}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <a rel="title-{$rel}" href="{$href}">
                <xsl:value-of select="Title"/>                
            </a>
            <xsl:if test="ancestor::AssetUsage[@context = 'Video']">
                <xsl:if test="child::RunningTime">
                    <span>
                        <xsl:text>(</xsl:text>
                        <xsl:value-of select="RunningTime"/>
                        <xsl:text>)</xsl:text>
                    </span>
                </xsl:if>
            </xsl:if>
        </li>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Art-Epi">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>        
        <xsl:if test="position() &lt; 4">
            <div class="related-link">
                <a href="{$href}"><xsl:apply-templates select="Image"/></a>
                <p><a rel="rc-title" href="{$href}"><xsl:value-of select="Title"/></a></p>
                <p><xsl:apply-templates select="Description"/></p>
                <p class="more">
                    <a rel="rc-stext" href="{$href}">
                        <xsl:choose>
                            <xsl:when test="child::Site = Video">Watch Now</xsl:when>
                            <xsl:otherwise>Read More</xsl:otherwise>
                        </xsl:choose>
                    </a>
                </p>
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Shows">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="show-{$position}" href="{$href}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="img-url">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$img-url}" alt="{$alt}" width="92" height="69"/>
    </xsl:template>

</xsl:stylesheet>
