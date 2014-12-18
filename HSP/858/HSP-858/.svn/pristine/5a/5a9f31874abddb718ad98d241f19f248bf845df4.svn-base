<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage">
            <div id="most-popular" class="widget">
                <div class="hd">
                    <h4>Most Popular on HGTV</h4>
                </div>
                <div class="bd">
                    <ul class="acco-b">
                        <xsl:apply-templates select="AssetUsage"/>
                    </ul>
                </div>
                <div class="ft"></div>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                   $('#most-popular .acco-b').dpl('accordion');
                   $("#most-popular .button-nav-sm").dpl('tabs');
                   SNI.HGTV.Omniture.ClickTrack('#most-popular','Most Popular','Most_Popular_module')
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type='Article']">
        <xsl:variable name="accordianTitle">
            <xsl:value-of select="@type"/>
        </xsl:variable>
        <li>            
            <div class="acco-link">
                <h5>Features</h5>
            </div>            
            <div class="acco-bd">
                <div class="acco-content">
                    <ul class="button-nav-sm clrfix">
                        <li><a href="#mp-most-read"><span>Most Read</span></a></li>
                        <li><a href="#mp-most-searched"><span>Most Searched</span></a></li>
                    </ul>
                <xsl:apply-templates select="Category" mode="Article"/>
                </div>
            </div>            
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="accordianTitle">
            <xsl:value-of select="@type"/>
        </xsl:variable>
        <li>            
            <div class="acco-link">
                <h5>
                    <xsl:value-of select="$accordianTitle"/>
                </h5>
            </div>            
            <div class="acco-bd">
                <div class="acco-content">
                    <ul class="list-photo">
                        <xsl:apply-templates select="Category" mode="Not-Article"/>
                    </ul>
                </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type='Topics']">
        <xsl:variable name="accordianTitle">
            <xsl:value-of select="@type"/>
        </xsl:variable>
        <li class="last">            
            <div class="acco-link">
                <h5>
                    <xsl:value-of select="$accordianTitle"/>
                </h5>
            </div>
            <div class="acco-bd">
                <div class="acco-content">
                    <ul class="list">
                        <xsl:apply-templates select="Category" mode="Not-Article"/>
                    </ul>
                </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template  match="Category" mode="Not-Article">
        <xsl:apply-templates select="Asset"/>
    </xsl:template>
    
    <xsl:template match="Category" mode="Article">        
        <xsl:variable name="tabval">
            <xsl:choose>
                <xsl:when test="@type='Most Read'">mp-most-read</xsl:when>
                <xsl:when test="@type='Most Searched'">mp-most-searched</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <div id="{$tabval}">
            <ul class="list">
                <xsl:apply-templates select="Asset" mode="Article"/>
            </ul>
        </div>
    </xsl:template>
    
    <xsl:template mode="Article" match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="parent-type">
            <xsl:choose>
                <xsl:when test="parent::Category[@type = 'Most Read']">read</xsl:when>
                <xsl:when test="parent::Category[@type = 'Most Searched']">searched</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        
        <xsl:variable name="url">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:if test="position() &lt;6">
            <xsl:choose>
                <xsl:when test="not(following-sibling::*)">
                    <li class="last">
                        <a rel="mp-{$parent-type}-{$position}" href="{$url}">
                            <xsl:value-of select="Title"/>
                        </a>
                    </li>
                </xsl:when>
                <xsl:otherwise>
                    <li>
                        <a rel="mp-{$parent-type}-{$position}" href="{$url}">
                            <xsl:value-of select="Title"/>
                        </a>
                    </li>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>    
    
    <xsl:template match="Asset">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="ans-type">
            <xsl:choose>
                <xsl:when test="ancestor::AssetUsage[@type='Videos']">video</xsl:when>
                <xsl:when test="ancestor::AssetUsage[@type='Photo Galleries']">pg</xsl:when>
                <xsl:when test="ancestor::AssetUsage[@type='Topics']">topic</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat('mp-',$ans-type,'-',$position)"/>
        </xsl:variable>
        <xsl:variable name="url">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="Image/ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Image/Alt"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="ancestor::AssetUsage[@type='Videos'] | ancestor::AssetUsage[@type='Photo Galleries']">
                <xsl:choose>
                    <xsl:when test="not(following-sibling::*)">
                        <li class="last">
                            <a rel="{$rel}" href="{$url}">
                                <xsl:if test="child::Image">
                                    <xsl:choose>
                                        <xsl:when test="ancestor::AssetUsage[@type='Videos']">
                                            <img src="{$src}" alt="{$alt}" height="69" width="92"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <img src="{$src}" alt="{$alt}"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                            </a>
                            <xsl:choose>
                                <xsl:when test="ancestor::AssetUsage[@type='Videos']">
                                    <span>
                                        <a rel="{$rel}" href="{$url}">
                                            <xsl:value-of select="Title"/>
                                            <small>
                                                <xsl:text> </xsl:text><xsl:text>(</xsl:text><xsl:value-of select="RunningTime"/><xsl:text>)</xsl:text>
                                            </small>
                                        </a>
                                    </span>
                                </xsl:when>
                                <xsl:when test="ancestor::AssetUsage[@type='Photo Galleries']">
                                    <span>
                                        <a rel="{$rel}" href="{$url}">
                                            <xsl:value-of select="Title"/>
                                            <xsl:if test="child::ImageCount">
                                                <small>
                                                    <xsl:text> </xsl:text><xsl:value-of select="ImageCount"/><xsl:text> Photos</xsl:text>
                                                </small>
                                            </xsl:if>
                                        </a>
                                    </span>
                                </xsl:when>                                
                            </xsl:choose>
                        </li>
                    </xsl:when>
                    <xsl:otherwise>
                        <li>
                            <a rel="{$rel}" href="{$url}">
                                <xsl:if test="child::Image">
                                    <xsl:choose>
                                        <xsl:when test="ancestor::AssetUsage[@type='Videos']">
                                            <img src="{$src}" alt="{$alt}" height="69" width="92"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <img src="{$src}" alt="{$alt}"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                            </a>
                            <xsl:choose>
                                <xsl:when test="ancestor::AssetUsage[@type='Videos']">
                                    <span>
                                        <a rel="{$rel}" href="{$url}">
                                            <xsl:value-of select="Title"/>  
                                            <small>
                                                <xsl:text> </xsl:text><xsl:text>(</xsl:text><xsl:value-of select="RunningTime"/><xsl:text>)</xsl:text>
                                            </small>
                                        </a>
                                    </span>
                                </xsl:when>
                                <xsl:when test="ancestor::AssetUsage[@type='Photo Galleries']">
                                    <span>
                                        <a rel="{$rel}" href="{$url}">
                                            <xsl:value-of select="Title"/>
                                            <xsl:if test="child::ImageCount">
                                                <small>
                                                    <xsl:text> </xsl:text><xsl:value-of select="ImageCount"/><xsl:text> Photos</xsl:text>
                                                </small>
                                            </xsl:if>
                                        </a>
                                    </span>
                                </xsl:when>
                            </xsl:choose>
                        </li>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="not(following-sibling::*)">
                        <li class="last">
                            <a rel="{$rel}" href="{$url}">
                                <xsl:value-of select="Title"/>
                            </a>
                        </li>
                    </xsl:when>
                    <xsl:otherwise>
                        <li>
                            <a rel="{$rel}" href="{$url}">
                                <xsl:value-of select="Title"/>
                            </a>
                        </li>
                    </xsl:otherwise>
                </xsl:choose>                
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>
