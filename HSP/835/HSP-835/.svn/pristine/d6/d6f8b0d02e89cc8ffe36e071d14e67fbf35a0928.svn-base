<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/child::Category/child::Asset">
            <div id="most-popular" class="widget">
                <h4>Most Popular</h4>
                <div class="bd">
                    <ul class="acco clrfix">
                        <xsl:apply-templates select="AssetUsage"/>
                    </ul>
                </div>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                SNI.DIY.Accordion('#most-popular .acco');
                SNI.DIY.Omniture.ClickTrack('#most-popular','Most Popular','Most_Popular_module')
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <li class="acco-group">
            <div class="acco-link">
                <h5><xsl:value-of select="@type"/></h5>
            </div>
            <div class="acco-bd">
               <div class="wrap">
                   <xsl:choose>
                       <xsl:when test="@type = 'Projects'">
                           <ul class="list">
                               <xsl:apply-templates select="Category/Asset"/>
                           </ul>
                       </xsl:when>
                       <xsl:otherwise>
                           <ol class="thumbs">
                               <xsl:apply-templates select="Category/Asset" mode="thumb"/>
                           </ol>
                       </xsl:otherwise>
                   </xsl:choose>
               </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="mpt-proj-{$position}"><xsl:value-of select="Title"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="Asset" mode="thumb">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="omni-var">
            <xsl:choose>
                <xsl:when test="ancestor::AssetUsage/@type = 'Videos'">vid</xsl:when>
                <xsl:otherwise>pg</xsl:otherwise>
            </xsl:choose>
            
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset) + 1"/>
        </xsl:variable>
       <xsl:choose>
           <xsl:when test="not(preceding-sibling::Asset)">               
               <li class="first">
                   <a class="thumbnail" href="{$href}" rel="mpi-{$omni-var}-{$position}">
                       <xsl:apply-templates select="Image"/>
                   </a>
                   <p class="title">
                       <a href="{$href}" rel="mpt-{$omni-var}-{$position}">
                           <xsl:value-of select="Title"/>  
                       </a>
                       <em>
                           <xsl:text> </xsl:text>
                            <xsl:choose>
                                <xsl:when test="ancestor::AssetUsage/@type = 'Videos'">(<xsl:value-of select="RunningTime"/>)</xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="ImageCount"/><xsl:text> Photos</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>                               
                       </em>
                   </p>
               </li>
           </xsl:when>
           <xsl:otherwise>
               <li>
                   <a class="thumbnail" href="{$href}" rel="mpi-{$omni-var}-{$position}">
                       <xsl:apply-templates select="Image"/>
                   </a>
                   <p class="title">
                       <a href="{$href}" rel="mpt-{$omni-var}-{$position}">
                           <xsl:value-of select="Title"/>
                       </a>
                           <em>
                               <xsl:text> </xsl:text>
                               <xsl:choose>
                                   <xsl:when test="ancestor::AssetUsage/@type = 'Videos'">(<xsl:value-of select="RunningTime"/>)</xsl:when>
                                   <xsl:otherwise>
                                       <xsl:value-of select="ImageCount"/><xsl:text> Photos</xsl:text>
                                   </xsl:otherwise>
                               </xsl:choose>                               
                           </em>
                   </p>
               </li>
           </xsl:otherwise>
       </xsl:choose>        
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="href">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$href}" alt="{$alt}" width="92" height="69"/>
    </xsl:template>

</xsl:stylesheet>
