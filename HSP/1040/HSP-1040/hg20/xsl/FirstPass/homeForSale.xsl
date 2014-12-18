<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="xml"/>
    <xsl:template match="results">
        <ServiceResponse name="HOME FOR SALE">
            <xsl:apply-templates select="featured"/>
        </ServiceResponse>
    </xsl:template>
    
    <xsl:template match="featured">
        <AssetUsage>
            <Category>
                <xsl:apply-templates select="listing"/>
            </Category>
        </AssetUsage>
    </xsl:template>
    
    <xsl:template match="listing">
        <xsl:choose>
            <xsl:when test="child::propertythumbnail/child::text()">
                <Asset>
                    <Site>FrontDoor</Site>
                    <xsl:apply-templates/>
                </Asset>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="index">
        <Index><xsl:value-of select="."/></Index>
    </xsl:template>
    
    <xsl:template match="idlisting">
        <AssetId><xsl:value-of select="."/></AssetId>
    </xsl:template>
    
    <xsl:template match="propertythumbnail">
        <xsl:variable name="alt">
            <xsl:value-of select="preceding-sibling::addrdisplay | following-sibling::addrdisplay"/>
        </xsl:variable>
        <Image>
            <ImageURL><xsl:value-of select="."/></ImageURL>
            <Alt>
                <xsl:value-of select="$alt"/>
            </Alt>
        </Image>
    </xsl:template>
    
    <xsl:template match="addrdisplay">
        <AddrDisplay><xsl:value-of select="."/></AddrDisplay>
    </xsl:template>
    
    <xsl:template match="price">
        <Price><xsl:value-of select="."/></Price>
    </xsl:template>
    
    <xsl:template match="advertisername">
        <xsl:variable name="adName">
            <xsl:value-of select="."/>
        </xsl:variable>
        <Advertisement>
            <Name><xsl:value-of select="$adName"/></Name>
            <Logo>
                <Image>
                    <ImageURL><xsl:value-of select="preceding-sibling::advertiserlogo | following-sibling::advertiserlogo"/></ImageURL>
                    <Alt>Sponsored By: <xsl:value-of select="$adName"/></Alt>
                </Image>
            </Logo>
        </Advertisement>
    </xsl:template>
    
    <xsl:template match="advertiserlogo">
        <!-- Suppressing this element -->
    </xsl:template>
    
    <xsl:template match="impressionsdata">
        <ImpressionsData>
            <xsl:value-of select="."/>
        </ImpressionsData>
    </xsl:template>
    
    <xsl:template match="clickthroughdata">
        <ClickThroughData>
            <xsl:value-of select="."/>
        </ClickThroughData>
    </xsl:template>
    
    <xsl:template match="city">
        <City>
            <xsl:value-of select="."/>
        </City>
    </xsl:template>
    
    <xsl:template match="state">
        <State>
            <xsl:value-of select="."/>
        </State>
    </xsl:template>
    
    <xsl:template match="detaillink">
        <DetailLink>
            <xsl:value-of select="."/>
        </DetailLink>
    </xsl:template>
    
</xsl:stylesheet>
