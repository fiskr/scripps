<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:include href="common/uniqueId.xsl"/>
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
        <xsl:call-template name="ContentTag1"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="ContentTag2"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="CategoryDisplayName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="SectionDisplayName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Classification"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Site"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>
    
    <xsl:template name="ResultUrl">
        <xsl:text>mdManager.addParameter("Url","/diyRedesign/videos/vlp.do");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey1">
        <xsl:text>mdManager.addParameter("AdKey1","</xsl:text>
        <xsl:value-of select="AdKey1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey2">
        <xsl:text>mdManager.addParameter("AdKey2","</xsl:text>
        <xsl:value-of select="AdKey2"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="ContentTag1">
        <xsl:text>mdManager.addParameter("ContentTag1","</xsl:text>
        <xsl:value-of select="ContentTag1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="ContentTag2">
        <xsl:text>mdManager.addParameter("ContentTag2","</xsl:text>
        <xsl:value-of select="ContentTag2"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="CategoryDisplayName">
        <xsl:text>mdManager.addParameter("CategoryDspName","</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SectionDisplayName">
        <xsl:text>mdManager.addParameter("SctnDspName","</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Classification">
        <xsl:text>mdManager.addParameter("Classification","</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Site">
        <xsl:text>mdManager.addParameter("Site","</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("Role","");
            mdManager.addParameter("Type","VIDEO_LANDING");
            mdManager.addParameter("Title","");
            mdManager.addParameter("PageNumber","1");
            mdManager.addParameter("Sponsorship","");
            mdManager.addParameter("Abstract","");
            mdManager.addParameter("Keywords","");
            mdManager.addParameter("Show_Abbr","");
            mdManager.addParameter("SctnName","");
            mdManager.addParameter("SctnId","1002");
            mdManager.addParameter("DetailId","");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
