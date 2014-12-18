<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:template name="threeFeature">
        <div class="epkg-wrap">            
            <div id="three-feature">                
                <h2><xsl:value-of select="AssetUsageTitle"/></h2>
                <xsl:apply-templates select="Category" mode="threeFeature"/>
            </div>
        </div>        
    </xsl:template>
    
    <xsl:template match="Category" mode="threeFeature">
        <ul class="clrfix">
            <xsl:if test="child::Asset">
                <xsl:for-each select="child::Asset">
                    <xsl:sort data-type="number" select="AssetRank"/>
                    <xsl:apply-templates select="self::Asset[position() &lt; 4]" mode="threeFeature"/>
                </xsl:for-each>
            </xsl:if>
        </ul>
    </xsl:template>
    
    <xsl:template match="Asset" mode="threeFeature">
        <xsl:variable name="desc">
            <xsl:choose>
                <xsl:when test="DescriptionOverride != ''"><xsl:value-of select="DescriptionOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Description"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="assetTitle">
            <xsl:choose>
                <xsl:when test="TitleOverride !=''"><xsl:value-of select="TitleOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Title"/></xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <xsl:variable name="assetType">
            <xsl:value-of select="AssetType"/>
        </xsl:variable>
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="$assetType = 'VIDEO'">video last</xsl:when>
                <xsl:when test="$assetType = 'PHOTOGALLERY'">gallery last</xsl:when>
                <xsl:otherwise>last</xsl:otherwise>
            </xsl:choose>            
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="child::AssetRank = 3">
                <li class="{$class}">
                   <xsl:choose>
                       <xsl:when test="$assetType = 'VIDEO'">
                           <h3><xsl:value-of select="$assetTitle"/></h3>
                           <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                               <xsl:apply-templates select="Image" mode="threeFeature"/>
                               <span class="play-button"></span>
                           </a>
                           <p>
                               <a href="{$href}" title="{$urlTitle}">
                                   <xsl:value-of select="$desc"/>
                                   <xsl:if test="child::RunningTime">
                                       <cite>
                                           <xsl:text>(video </xsl:text>
                                           <xsl:value-of select="RunningTime"/>
                                           <xsl:text>)</xsl:text>
                                       </cite>
                                   </xsl:if>
                               </a>
                           </p>
                       </xsl:when>
                       <xsl:when test="$assetType = 'PHOTOGALLERY'">
                           <h3><xsl:value-of select="$assetTitle"/></h3>
                           <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                               <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                           </a>
                           <p>
                               <a href="{$href}" title="{$urlTitle}">
                                   <xsl:value-of select="$desc"/>
                                   <xsl:if test="child::AssetCount">
                                       <cite>
                                           <xsl:text>(</xsl:text>
                                           <xsl:value-of select="AssetCount"/>
                                           <xsl:text> photos)</xsl:text>
                                       </cite>
                                   </xsl:if>
                               </a>
                           </p>
                       </xsl:when>
                       <xsl:when test="$assetType = 'CHANNEL'">
                           <h3><xsl:value-of select="$assetTitle"/></h3>
                           <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                               <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                           </a>
                           <p>
                               <a href="{$href}" title="{$urlTitle}">
                                   <xsl:value-of select="$desc"/>
                                   <xsl:if test="child::AssetCount">
                                       <cite>
                                           <xsl:text>(</xsl:text>
                                           <xsl:value-of select="AssetCount"/>
                                           <xsl:text> videos)</xsl:text>
                                       </cite>
                                   </xsl:if>
                               </a>
                           </p>
                       </xsl:when>
                       <xsl:otherwise>
                           <h3><xsl:value-of select="$assetTitle"/></h3>
                           <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                               <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                           </a>
                           <p>
                               <a href="{$href}" title="{$urlTitle}">
                                   <xsl:value-of select="$desc"/>
                               </a>
                           </p> 
                       </xsl:otherwise>
                   </xsl:choose>
                </li>        
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="$assetType = 'VIDEO'">
                        <li class="video">
                            <h3><xsl:value-of select="$assetTitle"/></h3>
                            <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                                <xsl:apply-templates select="Image" mode="threeFeature"/>
                                <span class="play-button"></span>
                            </a>
                            <p>
                                <a href="{$href}" title="{$urlTitle}">
                                    <xsl:value-of select="$desc"/>
                                    <xsl:if test="child::RunningTime">
                                        <cite>
                                            <xsl:text>(video </xsl:text>
                                            <xsl:value-of select="RunningTime"/>
                                            <xsl:text>)</xsl:text>
                                        </cite>
                                    </xsl:if>
                                </a>
                            </p>
                        </li>
                    </xsl:when>
                    <xsl:when test="$assetType = 'PHOTOGALLERY'">
                        <li class="gallery">
                            <h3><xsl:value-of select="$assetTitle"/></h3>
                            <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                                <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                            </a>
                            <p>
                                <a href="{$href}" title="{$urlTitle}">
                                    <xsl:value-of select="$desc"/>
                                    <xsl:if test="child::AssetCount">
                                        <cite>
                                            <xsl:text>(</xsl:text>
                                            <xsl:value-of select="AssetCount"/>
                                            <xsl:text> photos)</xsl:text>
                                        </cite>
                                    </xsl:if>
                                </a>
                            </p>
                        </li>
                    </xsl:when>
                    <xsl:when test="$assetType = 'CHANNEL'">
                        <li>
                            <h3><xsl:value-of select="$assetTitle"/></h3>
                            <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                                <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                            </a>
                            <p>
                                <a href="{$href}" title="{$urlTitle}">
                                    <xsl:value-of select="$desc"/>
                                    <xsl:if test="child::AssetCount">
                                        <cite>
                                            <xsl:text>(</xsl:text>
                                            <xsl:value-of select="AssetCount"/>
                                            <xsl:text> videos)</xsl:text>
                                        </cite>
                                    </xsl:if>
                                </a>
                            </p>
                        </li>
                    </xsl:when>
                   <xsl:otherwise>
                       <li>
                           <h3><xsl:value-of select="$assetTitle"/></h3>
                           <a href="{$href}" title="{$imageTitle}" class="thumb">                               
                               <xsl:apply-templates select="Image" mode="threeFeature"/>                               
                           </a>
                           <p>
                               <a href="{$href}" title="{$urlTitle}">
                                   <xsl:value-of select="$desc"/>
                               </a>
                           </p>
                       </li>
                   </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>       
    </xsl:template>
    
    <xsl:template match="Image" mode="threeFeature">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}"/>
    </xsl:template>

</xsl:stylesheet>
