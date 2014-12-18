<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:variable name="context">            
        <xsl:value-of select="translate(//ServiceResponse/AssetUsage/@context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
    <xsl:template match="ServiceResponse">        
        <xsl:if test="child::AssetUsage/Category/Room">
            <xsl:choose>
                <xsl:when test="$context = 'home page'">
                    <xsl:apply-templates select="AssetUsage/Category" mode="home"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="AssetUsage/Category" mode="other"/>        
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Category" mode="home">
        <xsl:apply-templates select="Room[position() &lt; 4]" mode="home"/>
    </xsl:template>
    
    <xsl:template match="Category" mode="other">
        <div id="projects-by-space" class="pod crsl-ww bottom">
            <div class="hd">
                <h4>Projects By Room</h4>
                <div class="more-dd clrfix">
                    <span class="view">View:</span>
                    <select name="" class="noscroll">
                        <option value="" class="select-title">Select a Room</option>
                        <xsl:apply-templates select="Room" mode="name"/>    
                    </select>                    
                </div>
            </div>
            <xsl:apply-templates select="Room[1]" mode="items"/>
        </div>
        <script type="text/javascript" charset="utf-8">
            var jsonpbr = {            
            
            <xsl:for-each select="Room">
                <xsl:text>"</xsl:text>
                <xsl:value-of select="Name/Param"/>
                <xsl:text>": {more: [ "</xsl:text>
                <xsl:value-of select="MoreProjects/Label"/>
                <xsl:text>","</xsl:text>
                <xsl:value-of select="MoreProjects/Url"/>
                <xsl:text>"],content:[</xsl:text>                
                <xsl:for-each select="Asset">
                    <xsl:text>["</xsl:text>
                    <xsl:value-of select="Title"/>
                    <xsl:text>", "</xsl:text>
                    <xsl:value-of select="Url"/>
                    <xsl:text>", "</xsl:text>
                    <xsl:value-of select="Image/ImageURL"/>
                    <xsl:text>", "</xsl:text>
                    <xsl:value-of select="Image/Alt"/>
                    <xsl:choose>
                        <xsl:when test="following-sibling::Asset">
                            <xsl:text>"],</xsl:text>                           
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>"]] </xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>  
                
                <xsl:choose>
                    <xsl:when test="following-sibling::Room">
                        <xsl:text>},</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                       <xsl:text>}</xsl:text> 
                    </xsl:otherwise>
                </xsl:choose>                
            </xsl:for-each>
            };
            SNI.DIY.ProjectsBySpace("#projects-by-space", { pagelink:"text", pagetext:"_current of _total" }, "#projects-by-space select", jsonpbr, "Projects by Room");
        </script>
    </xsl:template>
    
    <xsl:template match="Room" mode="name">
        <option>
            <xsl:attribute name="value"><xsl:value-of select="Name/Param"/></xsl:attribute>
            <xsl:value-of select="Name/Label"/>
        </option>
    </xsl:template>
    
    <xsl:template match="Room[1]" mode="items">
        <div class="bd crsl">
            <ul>
                <xsl:apply-templates select="Asset"/>
            </ul>
            <p>
                <a rel="pbs-more">
                    <xsl:attribute name="href"><xsl:value-of select="MoreProjects/Url"/></xsl:attribute>
                    <xsl:value-of select="MoreProjects/Label"/>
                </a>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="Room" mode="home">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$position = 3">
                <div id="projects-dd-1" class="pod crsl-ww">
                    <div class="hd">
                        <h4><xsl:value-of select="Name/Label"/></h4>
                    </div>
                    <div class="bd crsl">
                        <ul>
                            <xsl:apply-templates select="Asset"/>
                        </ul>
                        <p class="more">
                            <a>
                                <xsl:attribute name="href"><xsl:value-of select="MoreProjects/Url"/></xsl:attribute>
                                <xsl:value-of select="MoreProjects/Label"/>
                            </a>
                        </p>
                        <xsl:apply-templates select="ancestor::AssetUsage/MoreSpaces"/>
                    </div>
                </div>
                <script type="text/javascript" charset="utf-8">
                    <![CDATA[SNI.Common.Carousel("#projects-dd-1", { pagelink:"text", pagetext:"_current of _total" });
                    $("#projects-dd-1 select").dropdown();
                    SNI.DIY.Util.dropdownToLinks("#projects-dd-1 select");]]>
                </script>
            </xsl:when>
            <xsl:otherwise>
                <div id="projects-{$position}" class="pod crsl-ww">
                    <div class="hd">
                        <h4><xsl:value-of select="Name/Label"/></h4>
                    </div>
                    <div class="bd crsl">
                        <ul>
                           <xsl:apply-templates select="Asset"/> 
                        </ul>
                        <p class="more">
                            <a>
                                <xsl:attribute name="href"><xsl:value-of select="MoreProjects/Url"/></xsl:attribute>
                                <xsl:value-of select="MoreProjects/Label"/>
                            </a>
                        </p>
                    </div>
                </div>
                <script type="text/javascript" charset="utf-8">
                    SNI.Common.Carousel("#projects-<xsl:value-of select="$position"/>", { pagelink:"text", pagetext:"_current of _total" });
                </script>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(parent::Room/preceding-sibling::Room) + 1"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="pbs-img-{$position}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p>
                <a href="{$href}" rel="pbs-title-{$position}">
                   <xsl:value-of select="Title"/>     
                </a>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <xsl:variable name="width">
            <xsl:choose>
                <xsl:when test="$context = 'home page'">120</xsl:when>
                <xsl:otherwise>160</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="height">
            <xsl:choose>
                <xsl:when test="$context = 'home page'">90</xsl:when>
                <xsl:otherwise>120</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="{$width}" height="{$height}"/>
    </xsl:template>
    
    <xsl:template match="MoreSpaces">
        <div class="project-dd clrfix">
            <select name="" class="fxmed noscroll">
                <option value="" class="select-title">More Spaces</option>
                <xsl:apply-templates select="Asset" mode="home"/>
            </select>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="home">
        <option>
            <xsl:attribute name="value"><xsl:value-of select="Url"/></xsl:attribute>
            <xsl:value-of select="Title"/>
        </option>
    </xsl:template>

</xsl:stylesheet>
