<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Room">
            <xsl:apply-templates select="AssetUsage/Category"/> 
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Category">
        <div id="projects-by-space" class="pod crsl-ww bottom">
            <div class="hd">
                <h4>Projects By Room</h4>
                <div class="more-add clrfix">
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
            var json = {
            
            <xsl:for-each select="Room">
            
                <xsl:value-of select="Name/Param"/>
                <xsl:text> : { 
                    more: [ '</xsl:text>
                <xsl:value-of select="MoreProjects/Label"/>
                <xsl:text>','</xsl:text>
                <xsl:value-of select="MoreProjects/Url"/>
                <xsl:text>'], 
                    content:[
                </xsl:text>
                
                <xsl:for-each select="Asset">
                    <xsl:text>['</xsl:text>
                    <xsl:value-of select="Title"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="Url"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="Image/ImageURL"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="Image/Alt"/>
                    <xsl:choose>
                        <xsl:when test="following-sibling::Asset">
                            <xsl:text>'],</xsl:text>                           
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>']
                            ] </xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>  
                
                <xsl:choose>
                    <xsl:when test="following-sibling::Room">
                        <xsl:text>
                            },
                        </xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                       <xsl:text>
                           }
                       </xsl:text> 
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:for-each>
            };
            SNI.DIY.ProjectsBySpace('#projects-by-space', { pagelink:"text", pagetext:"_current of _total" }, '#projects-by-space select', json, "Projects by Room");
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
        <img src="{$src}" alt="{$alt}" width="160" height="120"/>
    </xsl:template>
    
    

</xsl:stylesheet>
