<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:output method="text"/>
    
    <xsl:variable name="term">
        <xsl:value-of select="ServiceResponse/@searchTitleTerm"/>
    </xsl:variable>

    <xsl:variable name="detailId">
        <xsl:value-of select="ServiceResponse/@detailId"/>
    </xsl:variable>

    <xsl:variable name="pageNumber">
        <xsl:value-of select="ServiceResponse/@pageNumber"/>
    </xsl:variable>

    <xsl:template match="ServiceResponse">
        <xsl:call-template name="Title"/>
        <xsl:call-template name="terms"/>
        <xsl:call-template name="DetailId"/>
        <xsl:call-template name="PageNumber"/>
        <xsl:call-template name="UniqueId"/>
        <xsl:call-template name="Constant"/>
    </xsl:template>
    
    <xsl:template name="Title">
        <xsl:text>mdManager.addParameter("Title", "</xsl:text>
        <xsl:if test="not(@searchTitleTerm = 'EPISODE SEARCH')">
            <xsl:value-of select="@searchTitleTerm"/>
           <xsl:text> :</xsl:text>
        </xsl:if>
        <xsl:if test="AssetUsage/Asset/ResultTitle">
            <xsl:value-of select="AssetUsage/Asset/ResultTitle"/>
            <xsl:text> :</xsl:text>
        </xsl:if>        
        <xsl:text> Episode Search Results : DIY");</xsl:text>
    </xsl:template>
    
    <xsl:template name="terms">
        <xsl:text>mdManager.addParameter("keyterm", "</xsl:text>
        <xsl:value-of select="$term"/>
        <xsl:text>");</xsl:text>
        <xsl:text>mdManager.addParameter("searchTerms", "</xsl:text>
        <xsl:value-of select="$term"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="DetailId">
        <xsl:text>mdManager.addParameter("DetailId","</xsl:text>
    <xsl:value-of select="$detailId"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="PageNumber">
        <xsl:text>mdManager.addParameter("PageNumber","</xsl:text>
    <xsl:value-of select="$pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="UniqueId">
        <xsl:text>mdManager.addParameter("UniqueId","DIY-EPISODE_SEARCH-</xsl:text>
        <xsl:value-of select="$detailId"/>
        <xsl:text>-</xsl:text>
    <xsl:value-of select="$pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="Constant">
        <xsl:text>mdManager.addParameter("Url", "/diyRedesign/search/episode.do");
            mdManager.addParameter("Type", "EPISODE_SEARCH");            
            mdManager.addParameter("Adkey1", "");
            mdManager.addParameter("Adkey2", "");            
            mdManager.addParameter("Classification", "EPISODE_SEARCH,DIY");
            mdManager.addParameter("Site", "DIY");
            mdManager.addParameter("SctnDspName", "EPISODE_SEARCH");
            mdManager.addParameter("CategoryDspName", "SEARCH");
            mdManager.addParameter("SctnId", "1007");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
