<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <div class="dp-acco" id="dp-other-spaces">
                <div class="hd">
                    <h4>Other Rooms You Might Like</h4>
                </div>
                <div class="bd">
                    <ul class="acco-dp">
                        <xsl:apply-templates select="AssetUsage"/>
                    </ul>
                </div>
                <div class="ft"></div>
            </div>
            <script type="text/javascript">
                <![CDATA[
                    SNI.HGTV.ViewSlider.init(jQuery("#hg-w #dp-other-spaces-1"));
                    SNI.HGTV.ViewSlider.init(jQuery("#hg-w #dp-other-spaces-2"));
                    SNI.HGTV.ViewSlider.init(jQuery("#hg-w #dp-other-spaces-3"));
                    SNI.HGTV.ViewSlider.init(jQuery("#hg-w #dp-other-spaces-4"));
                    $('#dp-other-spaces .acco-dp').dpl('accordion');
                    SNI.HGTV.Omniture.ClickTrack("dp-other-spaces", "Designer's Portfolio Other Rooms You Might Like");
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li class="acco-bg">
            <div class="acco-link">
                <h5><em></em><xsl:value-of select="AssetUsageTitle"/></h5>
            </div>
            <div class="acco-bd">
                <div class="acco-content">
                    <div class="view-slider acco-crsl clrfix" id="dp-other-spaces-{$position}">
                        <ul>
                            <xsl:apply-templates select="Category"/> 
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:apply-templates select="Asset"/>
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset )+ 1"/>
        </xsl:variable>
        <li>           
            <a class="photo" href="{$href}" rel="os-img-{$position}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="desc">
                <a href="{$href}" rel="os-title-{$position}">
                    <xsl:value-of select="Title"/>
                </a>
                <xsl:if test="child::SubTitle">
                    <span class="designer">
                        <xsl:value-of select="SubTitle"/>
                    </span>
                </xsl:if>
            </p>            
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img  width="92" height="69" alt="{$alt}" data-src="{$src}"></img>
    </xsl:template>
    
</xsl:stylesheet>