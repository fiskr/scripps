<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="text"/>
    
    <xsl:variable name="searchType">
        <xsl:value-of select="ServiceResponse/@searchType"/>
    </xsl:variable>
        <xsl:template match="ServiceResponse">
        <xsl:call-template name="Title"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="SearchTerm"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="DetailId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="PageNumber"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="SearchType"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>        
        </xsl:template>
    
    <xsl:template name="Title">
        <xsl:text>mdManager.addParameter("Title","</xsl:text>
        <xsl:choose>
            <xsl:when test="@searchTerm = 'EASYPROJECTFINDER'"></xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="@searchTitleTerm"/>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:text> Search Results : DIY");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SearchTerm">
        <xsl:text>mdManager.addParameter("searchTerm","</xsl:text>        
        <xsl:choose>
            <xsl:when test="@searchTerm = 'EASYPROJECTFINDER'"></xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="@searchTerm"/>
            </xsl:otherwise>
        </xsl:choose>        
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="DetailId">
        <xsl:text>mdManager.addParameter("DetailId","</xsl:text>
        <xsl:value-of select="@detailId"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="PageNumber">
        <xsl:text>mdManager.addParameter("PageNumber","</xsl:text>
        <xsl:value-of select="@pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="UniqueId">
        <xsl:text>mdManager.addParameter("UniqueId","DIY-</xsl:text>
        <xsl:value-of select="@searchType"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="@detailId"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="@pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SearchType">
        <xsl:text>mdManager.addParameter("SctnName","</xsl:text>
        <xsl:value-of select="$searchType"/>        
        <xsl:text>");</xsl:text>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>mdManager.addParameter("SctnDspName","</xsl:text>
        <xsl:value-of select="$searchType"/>        
        <xsl:text>");</xsl:text>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>mdManager.addParameter("Classification","</xsl:text>
        <xsl:value-of select="$searchType"/>        
        <xsl:text>,DIY");</xsl:text>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>mdManager.addParameter("Type","</xsl:text>
        <xsl:value-of select="$searchType"/>        
        <xsl:text>");</xsl:text>        
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("Url","/diyRedesign/site/search.do");           
            mdManager.addParameter("Role","");           
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("Abstract",     "");
            mdManager.addParameter("AdKey1","");
            mdManager.addParameter("AdKey2","");
            mdManager.addParameter("Keywords","");            
            mdManager.addParameter("Site","DIY");
            mdManager.addParameter("CategoryDspName",     "SEARCH");
            mdManager.addParameter("SctnId",         "1001");
            mdManager.addParameter("Show_Abbr",     "");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);            
        </xsl:text>
    </xsl:template>
    
    

</xsl:stylesheet>
