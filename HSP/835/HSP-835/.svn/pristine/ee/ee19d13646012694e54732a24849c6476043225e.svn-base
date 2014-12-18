<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:include href="common/uniqueId.xsl"/>
    <xsl:output method="text"/>
    
    <xsl:variable name="Section">
        <xsl:value-of select="ServiceResponse/AssetUsage/Asset/Section"/>
    </xsl:variable>
    
    <xsl:template match="ServiceResponse">
        <xsl:apply-templates select="AssetUsage/Asset"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:call-template name="ResultUrl"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Title"/>
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
        <xsl:call-template name="SectionName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Classification"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Site"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Type"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="DelvFrmt"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Sponsorship"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>
    
    <xsl:template name="ResultUrl">
        <xsl:text>mdManager.addParameter("Url", "</xsl:text>
        <xsl:value-of select="ResultUrl"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Title">
        <xsl:text>mdManager.addParameter("Title","</xsl:text>
        <xsl:value-of select="SEOTitle"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="AdKey1">
        <xsl:text>mdManager.addParameter("Adkey1","</xsl:text>
        <xsl:value-of select="AdKey1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="AdKey2">
        <xsl:text>mdManager.addParameter("Adkey2","</xsl:text>
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
        <xsl:text>mdManager.addParameter("CategoryDspName","Home_Improvement");</xsl:text> 
    </xsl:template>
    
    <xsl:template name="SectionDisplayName">
        <xsl:text>mdManager.addParameter("SctnDspName", "</xsl:text>
        <xsl:value-of select="$Section"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SectionName">
        <xsl:text>mdManager.addParameter("SctnName", "</xsl:text>
        <xsl:value-of select="$Section"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Classification">
        <xsl:variable name="sectionName">
            <xsl:value-of select="translate($Section,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
        </xsl:variable>
        <xsl:text>mdManager.addParameter("Classification", "</xsl:text>
        <xsl:value-of select="translate(AdID,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="translate($sectionName,' ','_')"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Site">
        <xsl:text>mdManager.addParameter("Site","</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="DelvFrmt">
        <xsl:text>mdManager.addParameter("DelvFrmt","</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Type">
        <xsl:text>mdManager.addParameter("Type","</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Sponsorship">
        <xsl:text>mdManager.addParameter("Sponsorship", "</xsl:text>
        <xsl:value-of select="SponsorshipCode"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("SctnId", "1003");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);</xsl:text>
    </xsl:template>

</xsl:stylesheet>
