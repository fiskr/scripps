<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">


 <xsl:template name="ImageCarouselSubFeature">
     <div class="epkg-wrap">
         <div id="top-spaces" class="crsl-w-four clrfix">
             <div class="hd">
                 <h3><xsl:value-of select="AssetUsageTitle"/></h3>
             </div>
             <xsl:apply-templates select="Category" mode="Carousel"/>
             <div class="ft"></div>
         </div>
         <script type="text/javascript">
             SNI.HGTV.ViewSlider.init(jQuery("#top-spaces .view-slider"));
         </script>
     </div>
 </xsl:template>
    
    <xsl:template match="Category" mode="Carousel">
        <div class="bd crsl">
            <div class="view-slider">
                <ul class="clrfix">
                    <xsl:for-each select="child::Asset">
                        <xsl:sort data-type="number" select="AssetRank"/>
                        <xsl:apply-templates select="self::Asset" mode="Carousel"/>
                    </xsl:for-each>
                </ul>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Carousel">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="class">
            <xsl:choose>
                <xsl:when test="child::AssetType = 'Channel'">video</xsl:when>
                <xsl:when test="child::AssetType = 'Gallery'">gallery</xsl:when>
                <xsl:when test="child::AssetType = 'Video'">video</xsl:when>
                <xsl:otherwise>article</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="imageTitle">
            <xsl:value-of select="ImageTitle"/>
        </xsl:variable>
        <xsl:variable name="urlTitle">
            <xsl:value-of select="UrlTitle"/>
        </xsl:variable>
        <xsl:variable name="title">
            <xsl:choose>
                <xsl:when test="TitleOverride !=''"><xsl:value-of select="TitleOverride"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Title"/></xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <li class="{$class}">
            <a href="{$href}" class="thumb" title="{$imageTitle}">
                <xsl:apply-templates select="Image" mode="Carousel"/>
            </a>
           <xsl:choose>
               <xsl:when test="child::AssetType= 'Channel'">
                   <p>
                       <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                       <cite>
                           <xsl:text>(</xsl:text>
                           <xsl:value-of select="VideoCount"/>
                           <xsl:text> videos)</xsl:text>
                       </cite>
                   </p>
               </xsl:when>
               <xsl:when test="child::AssetType= 'Gallery'">
                   <p>
                       <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                       <cite>
                           <xsl:text>(</xsl:text>
                           <xsl:value-of select="ImageCount"/>
                           <xsl:text> photos)</xsl:text>
                       </cite>
                   </p>
               </xsl:when>
               <xsl:when test="child::AssetType= 'Video'">
                   <p>
                       <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                       <cite>
                           <xsl:text>(video</xsl:text>
                           <xsl:value-of select="RunningTime"/>
                           <xsl:text>)</xsl:text>
                       </cite>
                   </p>
               </xsl:when>
               <xsl:otherwise>
                   <p>
                       <a href="{$href}" title="{$urlTitle}"><xsl:value-of select="$title"/></a>
                   </p>
               </xsl:otherwise>
           </xsl:choose>
            
        </li>
    </xsl:template>
    
    <xsl:template match="Image" mode="Carousel">
        <xsl:variable name="src">
            <xsl:value-of select="ImageURL"/>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:value-of select="Alt"/>
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" width="120" height="90"/>
    </xsl:template>

</xsl:stylesheet>
