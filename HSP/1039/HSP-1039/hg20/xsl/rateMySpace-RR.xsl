<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="child::AssetUsage/Category/Asset">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="project-href">
            <xsl:value-of select="ProjectUpload/Url"/>
        </xsl:variable>
        <div id="rate-my-space" class="crsl-e video-pod">
            <div class="hd">
                <h4>Rate My Space</h4>
                <p>See how your neighbors express themselves. <a href="http://www.roomzaar.com/rate-my-space/editupload.esi">Upload your project</a></p>
            </div>
            <div class="bd crsl">
                <ul>
                    <xsl:apply-templates select="Category"/>
                </ul>
            </div>
            <div class="ft"></div>
        </div>
        <script type="text/javascript">
            <![CDATA[
                $("#rate-my-space").dpl('carousel', { pagelink:"image" });		
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Category">
        <xsl:variable name="imageCount">
            <xsl:value-of select="count(Asset)"/>
        </xsl:variable>
        
        <xsl:variable name="counter">            
            <xsl:choose>
                <xsl:when test="$imageCount mod 3 =0">
                    <xsl:value-of select="$imageCount div 3 "/>
                </xsl:when>
                <xsl:otherwise>                    
                    <xsl:value-of select="$imageCount div 3 + 1"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>        
        
        <xsl:call-template name="for-loop">
            <xsl:with-param name="i">1</xsl:with-param>
            <xsl:with-param name="loop"><xsl:value-of select="$counter"/></xsl:with-param>            
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="for-loop">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>        
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * 3"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * 3"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop ">
            <li>                
                <ul>
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                </ul>                
            </li>
            <xsl:call-template name="for-loop">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>                
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>
    
    <xsl:template match="Asset">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="count(preceding-sibling::Asset )+ 1"/>
        </xsl:variable>
        <li>           
            <a rel="rms-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="rating">
                <xsl:apply-templates select="Rating"/>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:value-of select="small_thumb"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="92" height="69"></img>
    </xsl:template>
    
    <xsl:template match="Rating">
        <xsl:variable name="current">
            <xsl:value-of select="."/>
        </xsl:variable>
        <xsl:variable name="var">
            <xsl:value-of select="substring($current,1,1)"/>
        </xsl:variable>
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="$var = 1">one</xsl:when>
                <xsl:when test="$var = 2">two</xsl:when>
                <xsl:when test="$var = 3">three</xsl:when>
                <xsl:when test="$var = 4">four</xsl:when>
                <xsl:when test="$var = 5">five</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <span class="{$cname}"><xsl:value-of select="$var"/></span>
    </xsl:template>

</xsl:stylesheet>
