<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="text"/>

    <xsl:variable name="detailId">
        <xsl:value-of select="ServiceResponse/@detailId"/>
    </xsl:variable>
    <xsl:variable name="pageNumber">
        <xsl:value-of select="ServiceResponse/@pageNumber"/>
    </xsl:variable>

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
        <xsl:text>mdManager.addParameter("UniqueId","HGTV-DP_SEARCH-</xsl:text>
        <xsl:value-of select="$detailId"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="$pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template match="/">
        <xsl:text>mdManager.addParameter("Url", "/hgtvRedesign/designers-portfolio/search.do");
            mdManager.addParameter("Type","DP_SEARCH");
            mdManager.addParameter("SctnNameLineage", "DESIGNERS PORTFOLIO,DECORATING,HGTV");
            mdManager.addParameter("Role","");
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("Abstract","");
            mdManager.addParameter("AdKey1","");
            mdManager.addParameter("AdKey2","");
            mdManager.addParameter("Keywords","");
            mdManager.addParameter("Classification","DP_SEARCH,DESIGNERS_PORTFOLIO,HGTV");
            mdManager.addParameter("Site","HGTV");
            mdManager.addParameter("SctnName","");
            mdManager.addParameter("SctnDspName","DP_SEARCH");
            mdManager.addParameter("CategoryDspName","DESIGNERS_PORTFOLIO");
            mdManager.addParameter("SctnId","1004");
        </xsl:text>
        <xsl:call-template name="DetailId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="PageNumber"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>mdManager.addParameter("Show_Abbr","");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
