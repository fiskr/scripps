<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    
    <xsl:variable name="heading">
        <xsl:choose>
            <xsl:when test="//AssetUsage[@type = 'On Tv This Week']/Category[@type = 'Talent']">My Top Projects</xsl:when>
            <xsl:otherwise>Projects From The Show</xsl:otherwise>
        </xsl:choose>
        
    </xsl:variable>
    
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <div id="projects-from-show" class="tabbed-well-pod pod">                
                <div class="hd clrfix">
                        <h3 class="sub-header"><xsl:value-of select="$heading"/></h3>
                    <xsl:if test="child::TopProjects">
                        <xsl:apply-templates select="TopProjects"/>
                    </xsl:if>
                </div>
                <div id="projects-from-show-tabs" class="tabbed-well">                    
                    <div class="hd">
                        <ul class="menu small-nav">
                            <xsl:for-each select="child::AssetUsage">
                                <xsl:if test="child::Category/Show/Asset or child::Category/Asset">
                                <xsl:variable name="type">
                                    <xsl:value-of select="translate(@type,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
                                </xsl:variable>
                                <xsl:variable name="id-href">
                                    <xsl:choose>
                                        <xsl:when test="$type='on tv this week'">this-week-proj</xsl:when>
                                        <xsl:when test="$type='justadded'">just-added-proj</xsl:when>
                                        <xsl:when test="$type='mostpopular'">most-popular-proj</xsl:when>
                                    </xsl:choose>                                    
                                </xsl:variable>
                                    <xsl:variable name="heading">
                                        <xsl:choose>
                                            <xsl:when test="$type='on tv this week'">On Tv This Week</xsl:when>
                                            <xsl:when test="$type='justadded'">Just Added</xsl:when>
                                            <xsl:when test="$type='mostpopular'">Most Popular</xsl:when>
                                        </xsl:choose>
                                    </xsl:variable>
                                <li>
                                    <a href="#{$id-href}">
                                        <span><xsl:value-of select="$heading"/></span>
                                    </a>
                                </li>
                                </xsl:if>
                            </xsl:for-each>                            
                        </ul>                        
                    </div>
                    <div class="bd">
                        <xsl:apply-templates select="AssetUsage"/>
                    </div>
                    <div class="ft"></div>
                </div>
                <script type="text/javascript">
                    <![CDATA[SNI.DIY.Tabs("#projects-from-show-tabs .small-nav");]]>
                </script>
            </div>
            <script type="text/javascript">
                <![CDATA[SNI.DIY.Omniture.ClickTrack('#projects-from-show','Projects From This Show','Projects_From_Show_module');]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="type">
            <xsl:value-of select="translate(@type,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$type = 'on tv this week'">
                <xsl:apply-templates select="Category" mode="on-tv"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="Category"/>
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>
    
    <xsl:template match="Category" mode="on-tv">
        <xsl:if test="child::Show">
            <div id="this-week-proj">
                <xsl:apply-templates select="Show"/>
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="type">
            <xsl:value-of select="translate(parent::AssetUsage/@type,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
        </xsl:variable>
        <xsl:variable name="id">
           <xsl:choose>        
                <xsl:when test="$type='justadded'">just-added-proj</xsl:when>
                <xsl:when test="$type='mostpopular'">most-popular-proj</xsl:when>
           </xsl:choose> 
        </xsl:variable>
        <div id="{$id}">
            <ul class="list">
                <xsl:apply-templates select="Asset"/>
            </ul>
        </div>
    </xsl:template>
    
    <xsl:template match="Show">
        <xsl:choose>
            <xsl:when test="position() = 1">
                <dt class="first"><xsl:value-of select="@day"/></dt>                
            </xsl:when>
            <xsl:otherwise>
                <dt><xsl:value-of select="@day"/></dt>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="Asset" mode="on-tv"/>
    </xsl:template>
    
    <xsl:template match="TopProjects">
        <xsl:if test="child::Url">
            <p class="more">
                <a rel="pts-more">
                    <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
                    <xsl:value-of select="Label"/>
                </a>
            </p>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="positon">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="ptst-{$positon}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="Asset" mode="on-tv">
        <xsl:variable name="positon">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <dd>
            <a rel="ptst-{$positon}">
                <xsl:attribute name="href"><xsl:value-of select="Url"/></xsl:attribute>
                <xsl:value-of select="Title"/>
            </a>
        </dd>
    </xsl:template>


</xsl:stylesheet>
