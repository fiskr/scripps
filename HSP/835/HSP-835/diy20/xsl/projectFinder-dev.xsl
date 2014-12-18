<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
        
    <xsl:output method="text"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Projects">
            <xsl:text>var pfind = {
                        c:</xsl:text>
            <xsl:value-of select="AssetUsage/Category/Projects/ProjectCount"/>
            <xsl:text>,
                i:{
            </xsl:text>
            <xsl:apply-templates select="AssetUsage/Category/Projects/Project"/>
            <xsl:text>
                }
            };</xsl:text>
        </xsl:if>
        <xsl:if test="AssetUsage/Category/Shows">
            <xsl:text> 
                var sfind = {
                c:</xsl:text>
            <xsl:value-of select="AssetUsage/Category/Shows/ProjectCount"/>
            <xsl:text>,
                i:{
            </xsl:text>
            <xsl:apply-templates select="AssetUsage/Category/Shows/ShowList"/>
            <xsl:text>
                }
            };</xsl:text>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="Project">
        <xsl:text>'</xsl:text>
        <xsl:value-of select="Asset/Param"/>
        <xsl:text>':{
            l:'</xsl:text>
        <xsl:value-of select="Asset/Label"/>
        <xsl:text>',
            c:</xsl:text>
        <xsl:value-of select="Asset/ProjectCount"/>
        <xsl:text>,
            i:{
        </xsl:text>
        <xsl:apply-templates select="Object"/>
        <xsl:text>}</xsl:text>
        <xsl:choose>
            <xsl:when test="following-sibling::Project">
                <xsl:text>},</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>}</xsl:text>  
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="ShowList">
        <xsl:text>'</xsl:text>
        <xsl:value-of select="Asset/Param"/>
        <xsl:text>':{
            l:'</xsl:text>
        <xsl:value-of select="Asset/Label"/>
        <xsl:text>',
            c:</xsl:text>
        <xsl:value-of select="Asset/ProjectCount"/>
        <xsl:text>,
            i:{
        </xsl:text>
        <xsl:apply-templates select="Object"/>
        <xsl:text>}</xsl:text>
        <xsl:choose>
            <xsl:when test="following-sibling::ShowList">
                <xsl:text>},</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>}</xsl:text>  
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="Object">
        <xsl:text>'</xsl:text>
        <xsl:value-of select="Asset/Param"/>
        <xsl:text>':{
            l:'</xsl:text>
        <xsl:value-of select="Asset/Label"/>
        <xsl:text>',
            c:</xsl:text>
        <xsl:value-of select="Asset/ProjectCount"/>
        <xsl:text>,
            i:{
        </xsl:text>
        <xsl:apply-templates select="Activity"/>        
        <xsl:choose>
            <xsl:when test="following-sibling::Object">
                <xsl:text> 
                    }
                },</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>
                    }
                }</xsl:text>  
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="Activity">
        <xsl:text>'</xsl:text>
        <xsl:value-of select="Asset/Param"/>
        <xsl:text>':{
            l:'</xsl:text>
        <xsl:value-of select="Asset/Label"/>
        <xsl:text>',
            c:</xsl:text>
        <xsl:value-of select="Asset/ProjectCount"/>
        <xsl:choose>
            <xsl:when test="following-sibling::Activity">
                <xsl:text>},</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>}</xsl:text>
            </xsl:otherwise>
        </xsl:choose>    
    </xsl:template>
   
</xsl:stylesheet>
    

