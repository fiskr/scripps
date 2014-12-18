<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>    
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <li class="acco-group">
            <div class="acco-link">
                <h5>
                    <xsl:value-of select="Category/@type"/>
                </h5>
            </div>
            <div id="sim-proj" class="acco-bd">
               <div class="wrap">
                  <ul class="list">
                     <xsl:apply-templates select="Category/Asset"/>
                  </ul>
               </div>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                SNI.DIY.Omniture.ClickTrack('#sim-proj','Similar Projects','Similar_Projects_module')
                ]]>
            </script>
        </li>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a href="{$href}" rel="smt-{$position}">
                <xsl:value-of select="Title"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
