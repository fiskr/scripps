<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
   <xsl:template match="ServiceResponse">
       <xsl:if test="AssetUsage/Category/Asset">
           <xsl:apply-templates select="AssetUsage[@type='Browse By Color']"/>
       </xsl:if>
   </xsl:template>
    
    <xsl:template match="AssetUsage[@type= 'Browse By Color']">
        <li class="clrfix">
            <div class="acco-bd">
                <div class="acco-content">
                    <div id="color-picker"></div>
                </div>
            </div>
            <div class="acco-link">
                <h5>Browse By Color</h5>
                <p> What color inspires you?</p>
            </div>        
            <script type="text/javascript">
                SNI.HGTV.GetInspired.colorPicker(
                <xsl:call-template name="color-list"/>
                <xsl:call-template name="type-list"/>
                <xsl:call-template name="href-list"/>
                );
            </script>
        </li>
    </xsl:template>
    
    <xsl:template name="color-list">
        <xsl:text>"</xsl:text>
        <xsl:for-each select="Category/Asset">
            <xsl:value-of select="Color"/>
            <xsl:if test="following-sibling::Asset">
                <xsl:text>,</xsl:text>
            </xsl:if>
        </xsl:for-each>
        <xsl:text>",
        </xsl:text>
    </xsl:template>
    
    <xsl:template name="type-list">
        <xsl:text>"</xsl:text>
        <xsl:for-each select="Category/Asset">
            <xsl:value-of select="ColorType"/>
            <xsl:if test="following-sibling::Asset">
                <xsl:text>,</xsl:text>
            </xsl:if>
        </xsl:for-each>
        <xsl:text>",</xsl:text>        
    </xsl:template>
    
    <xsl:template name="href-list">
        <xsl:text>"</xsl:text>
        <xsl:for-each select="Category/Asset">
            <xsl:value-of select="Url"/>
            <xsl:if test="following-sibling::Asset">
                <xsl:text>,</xsl:text>
            </xsl:if>
        </xsl:for-each>
        <xsl:text>"</xsl:text>
    </xsl:template>
</xsl:stylesheet>
