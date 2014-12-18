<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="text"/>
    <xsl:template match="ServiceResponse">
        <xsl:call-template name="ResultUrl"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey1"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey2"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Site"/>
        <xsl:text>&#xa;</xsl:text>   
        <xsl:call-template name="DetailId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="PageNumber"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        
    </xsl:template>
    
    <xsl:template name="ResultUrl">
        <xsl:text>mdManager.addParameter("Url", "/hgtvRedesign/site/search.do");</xsl:text>
    </xsl:template>

    <xsl:template name="DetailId">
        <xsl:text>mdManager.addParameter("DetailId", "</xsl:text>
        <xsl:value-of select="@detailId"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="PageNumber">
        <xsl:text>mdManager.addParameter("PageNumber", "</xsl:text>
        <xsl:value-of select="@pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="UniqueId">
        <xsl:text>mdManager.addParameter("UniqueId", "HGTV-SEARCH-</xsl:text>
        <xsl:value-of select="@detailId"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="@pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Site">
        <xsl:text>mdManager.addParameter("Site", "HGTV");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey1">
        <xsl:text>mdManager.addParameter("AdKey1", "</xsl:text>
        <xsl:value-of select="AssetUsage/Asset/AdKey1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey2">
        <xsl:text>mdManager.addParameter("AdKey2", "</xsl:text>
        <xsl:value-of select="AssetUsage/Asset/AdKey2"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("Type","SEARCH");
            mdManager.addParameter("Role","");
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("Abstract","");
            mdManager.addParameter("Keywords","");
            mdManager.addParameter("Classification","SEARCH,HGTV");
            mdManager.addParameter("SctnName","");
            mdManager.addParameter("SctnDspName","SEARCH_RESULTS");
            mdManager.addParameter("CategoryDspName","SEARCH");
            mdManager.addParameter("SctnId","1001");
            mdManager.addParameter("Show_Abbr","");
      </xsl:text>  
    </xsl:template>


</xsl:stylesheet>
