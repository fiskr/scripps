<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:include href="common/uniqueId.xsl"/>
    
    <xsl:variable name="Site">
        <xsl:value-of select="ServiceResponse/AssetUsage/Asset/Site"/>    
    </xsl:variable>
    
    <xsl:output method="text"/>
    <xsl:template match="ServiceResponse">
        <xsl:apply-templates select="AssetUsage/Asset"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:call-template name="ResultUrl"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey1"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey2"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Site"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Classification"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>

    <xsl:template name="ResultUrl">
        <xsl:text>mdManager.addParameter("Url","/hgtvRedesign/videos/vlp.do");
        </xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey1">
        <xsl:text>mdManager.addParameter("AdKey1", "</xsl:text>
        <xsl:value-of select="AdKey1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey2">
        <xsl:text>mdManager.addParameter("AdKey2", "</xsl:text>
        <xsl:value-of select="AdKey2"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Site">
        <xsl:text>mdManager.addParameter("Site", "</xsl:text>
        <xsl:value-of select="$Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Classification">
        <xsl:text>mdManager.addParameter("Classification","VIDEO,</xsl:text>
        <xsl:value-of select="$Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("Type","VIDEO_LANDING");
            mdManager.addParameter("Role","");
            mdManager.addParameter("Title","");
            mdManager.addParameter("Abstract","");
            mdManager.addParameter("Keywords","");
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("SctnId","1002");
            mdManager.addParameter("SctnName","");
            mdManager.addParameter("SctnDspName","VIDEO");
            mdManager.addParameter("CategoryDspName","VIDEO");
            mdManager.addParameter("DetailId","");
            mdManager.addParameter("PageNumber","1");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
