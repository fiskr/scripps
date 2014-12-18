<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:include href="common/uniqueId.xsl"/>
    
 <xsl:output method="text"/>
    <xsl:template match="ServiceResponse">
        <xsl:apply-templates select="AssetUsage/Asset"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:call-template name="ResultUrl"/>
        <xsl:text> &#xa;</xsl:text>          
        <xsl:call-template name="CategoryDspName"/>  
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="Section"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="ContentTag1"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="ContentTag2"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="SponsorshipCode"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="Title"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="AdKey1"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="AdKey2"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="UniqueId"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="SectionId"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="DetailId"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="Classification"/>
        <xsl:text> &#xa;</xsl:text>
        <xsl:call-template name="Constants"/>
    </xsl:template>
    
    <xsl:template name="ResultUrl">      
        <xsl:text>mdManager.addParameter("Url", "</xsl:text>
        <xsl:value-of select="ResultUrl"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="CategoryDspName">
        <xsl:text>mdManager.addParameter("CategoryDspName", "HOME_IMPROVEMENT");</xsl:text>
    </xsl:template>

    <xsl:template name="Section">
        <xsl:text>mdManager.addParameter("SctnDspName", "</xsl:text>
        <xsl:value-of select="Section"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="ContentTag1">
        <xsl:text>mdManager.addParameter("ContentTag1", "</xsl:text>
        <xsl:value-of select="ContentTag1"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="ContentTag2">
        <xsl:text>mdManager.addParameter("ContentTag2", "</xsl:text>
        <xsl:value-of select="ContentTag2"/>
        <xsl:text>");</xsl:text>
    </xsl:template>

    <xsl:template name="SponsorshipCode">
        <xsl:text>mdManager.addParameter("Sponsorship", "</xsl:text>
        <xsl:value-of select="SponsorshipCode"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Title">
        <xsl:text>mdManager.addParameter("Title", "</xsl:text>
        <xsl:value-of select="SEOTitle"/>
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
    
    <xsl:template name="SectionId">
        <xsl:text>mdManager.addParameter("SctnId", "</xsl:text>
        <xsl:value-of select="SectionId"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="DetailId">
        <xsl:text>mdManager.addParameter("DetailId", "</xsl:text>
        <xsl:value-of select="AssetType"/>
        <xsl:value-of select="AssetId"/>
        <xsl:text>");</xsl:text>    
    </xsl:template>
    
    <xsl:template name="Classification">
        <xsl:text>mdManager.addParameter("Classification", "HOME IMPROVEMENT,</xsl:text>
        <xsl:value-of select="Site"/>
        <xsl:text>");</xsl:text>
    </xsl:template>
    
    <xsl:template name="Constants">
<xsl:text>mdManager.addParameter("PageNumber", "1");
mdManager.addParameter("Role", "EPACKAGE");
mdManager.addParameter("Site", "HGTV");
mdManager.addParameter("Type", "EPACKAGE");
mdManager.addParameter('DelvFrmt', "EPACKAGE");
mdManager.addParameter('UserId', userIdCookieUserId);</xsl:text>
    </xsl:template>
    
</xsl:stylesheet>
