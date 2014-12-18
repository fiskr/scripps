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
        <xsl:call-template name="SctnDspName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Title"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Keywords"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Sponsorship"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Classification"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Type"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Site"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey1"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="AdKey2"/>
        <xsl:text>&#xa;</xsl:text>        
        <xsl:call-template name="CategoryDisplayName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="SctnName"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="SectionLineage"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>
    
    <xsl:template name="ResultUrl">
        <xsl:text>mdManager.addParameter("Url", "</xsl:text>
        <xsl:value-of select="ResultUrl"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SctnDspName">
        <xsl:text>mdManager.addParameter("SctnDspName", "</xsl:text>
        <xsl:value-of select="translate(Section,' ','_')"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Title">
        <xsl:text>mdManager.addParameter("Title", "</xsl:text>
        <xsl:value-of select="SEOTitle"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Keywords">
        <xsl:text>mdManager.addParameter("Keywords", "");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Sponsorship">
        <xsl:text>mdManager.addParameter("Sponsorship", "</xsl:text>
        <xsl:value-of select="SponsorshipCode"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Classification">
        <xsl:text>mdManager.addParameter("Classification",  "</xsl:text>
        <xsl:value-of select="translate(SectionLineage,' ','_')"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Type">
        <xsl:text>mdManager.addParameter("Type", "</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:text>S");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Site">
        <xsl:text>mdManager.addParameter("Site", "</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
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
    
    <xsl:template name="SctnName">
        <xsl:text>mdManager.addParameter("SctnName", "</xsl:text>
        <xsl:value-of select="translate(Section,' ','_')"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="CategoryDisplayName">
        <xsl:variable name="modSectionLineage">
            <xsl:value-of select="substring-after(SectionLineage,',')"/>
        </xsl:variable>
        <xsl:variable name="catDspName">
            <xsl:value-of select="substring-before($modSectionLineage,',')"/>
        </xsl:variable>
        <xsl:text>mdManager.addParameter("CategoryDspName","</xsl:text>
        <xsl:value-of select="translate($catDspName,' ','_')"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="SectionLineage">
        <xsl:text>mdManager.addParameter("SctnNameLineage", "</xsl:text>
        <xsl:value-of select="SectionLineage"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
        <xsl:text>mdManager.addParameter("SctnId", "1003");
            mdManager.addParameter("DelvFrmt", "TOPIC");
            mdManager.addParameter("DetailId", "");
            mdManager.addParameter("PageNumber", "TOPIC");
            mdManager.addParameter('UserId', userIdCookieUserId);
            mdManager.addParameter('UserIdEmail', userIdEmail);
            mdManager.addParameter('UserIdCreateDt', userIdCookieCreateDt);
            mdManager.addParameter('UserIdVersion', userIdCookieVersion);
        </xsl:text>
    </xsl:template>
    
    
</xsl:stylesheet>