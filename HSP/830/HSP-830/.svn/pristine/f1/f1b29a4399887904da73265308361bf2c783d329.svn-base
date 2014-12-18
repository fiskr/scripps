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
        <xsl:text>mdManager.addParameter("UniqueId","HGTV-EPISODE_SEARCH-</xsl:text>
        <xsl:value-of select="$detailId"/>
        <xsl:text>-</xsl:text>
        <xsl:value-of select="$pageNumber"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template match="ServiceResponse">
        <xsl:text>mdManager.addParameter("Url","/hgtvRedesign/search/episode.do");
            mdManager.addParameter("Type","EPISODE_SEARCH");          
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("Abstract","");
            mdManager.addParameter("Adkey1", "");
            mdManager.addParameter("Adkey2", "");
            mdManager.addParameter("Keywords","");          
            mdManager.addParameter("Classification","EPISODE_SEARCH,HGTV");
            mdManager.addParameter("Site","HGTV");
            mdManager.addParameter("SctnName","");
            mdManager.addParameter("SctnDspName","EPISODE_SEARCH");
            mdManager.addParameter("CategoryDspName","SEARCH");
            mdManager.addParameter("SctnId","1007");
        </xsl:text>
        <xsl:call-template name="DetailId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="PageNumber"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
