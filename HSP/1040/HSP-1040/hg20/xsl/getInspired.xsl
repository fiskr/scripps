<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:include href="common/zoneFinder.xsl"/>
    <xsl:include href="colorPicker.xsl"/>
    <xsl:output method="html"/>
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/Asset">
            <div class="acco" id="get-inspired">
                <div class="hd">
                    <h4><span>Get Inspired</span></h4>
                </div>
                <div class="bd">
                    <ul class="acco-a">
                        <xsl:apply-templates select="AssetUsage"/>
                    </ul>
                </div>
                <div class="ft"></div>	
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                    $("#get-inspired .acco-a").dpl("accordion", { direction: 'prev', event: "mouseover" });
                ]]>
            </script>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type = 'Zone Finder']">
        <xsl:call-template name="zone-finder"/>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type= 'Browse By Area']">
        <li class="clrfix">
            <div class="acco-bd" id="brw-by-area">
                <xsl:apply-templates select="Category" mode="Area"/>
            </div>
            <div class="acco-link">
                <h5>Browse By Area</h5>
                <p>Get your home into shape.</p>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                SNI.HGTV.Omniture.ClickTrack('#brw-by-area','Browse By Area','brwByArea_Module')
            ]]>
            </script>
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type = 'My Dream Designs']">
        <li class="clrfix">
            <div class="acco-bd">
                <div id="acco-mydreamhome" class="acco-content acco-crsl">
                    <div class="crsl">
                        <ul>
                               <xsl:apply-templates select="Category" mode="Dream"/> 
                        </ul>
                    </div>
                    <script type="text/javascript" charset="utf-8">
                        <![CDATA[
                            $("#acco-mydreamhome").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
                        ]]>
                    </script>
                </div>
            </div> 
            <div class="acco-link">
                <h5>My HGTV Dream Home</h5>
                <p>Share your photos and videos.</p>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Category" mode="Dream">
        <xsl:apply-templates select="Asset" mode="Dream"/>
    </xsl:template>
    
    <xsl:template match="Asset" mode="Dream">
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="usr-href">
            <xsl:value-of select="User/Url"/>
        </xsl:variable>
        <li>
            <a rel="dream-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <xsl:apply-templates select="Rating"/>
            <p class="title"><xsl:text>By: </xsl:text><a rel="dream-user-{$position}" href="{$usr-href}"><xsl:value-of select="User/UserName"/></a></p>
        </li>
    </xsl:template>
    
    <xsl:template match="Category" mode="Area">
        <div class="acco-content">
            <ul class="list">
                <xsl:apply-templates select="Asset" mode="Area"/>
            </ul>
        </div>
    </xsl:template>

    <xsl:template match="Asset" mode="Area">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <xsl:variable name="rel">
            <xsl:value-of select="concat('brwByArea-',$position)"/>
        </xsl:variable>
        <li>
            <a rel="{$rel}" href="{$href}"><xsl:value-of select="Title"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type='Designers Portfolio']">
        <li class="clrfix">
            <div class="acco-bd">
                <xsl:apply-templates select="Category" mode="DP"/>
            </div>
            <div class="acco-link">
                <h5>Designers&#8217; Portfolio</h5>
                <p>Inspiration from the experts.</p>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Category" mode="DP">
        <xsl:variable name="proj-href">
            <xsl:value-of select="following-sibling::ProjectUpload/Url"/>
        </xsl:variable>
        <div id="acco-designerfolio" class="acco-content acco-crsl">
            <div class="crsl">
                <ul>
                    <xsl:apply-templates select="Asset" mode="DP"/>
                </ul>
                <p class="view-more"><a rel="dp-seeall" href="{$proj-href}"><xsl:value-of select="following-sibling::ProjectUpload/Label"/></a></p>
            </div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[
                $("#acco-designerfolio").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
            ]]>
        </script>
    </xsl:template>
    
    <xsl:template match="Asset" mode="DP">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="sbj-href">
            <xsl:value-of select="Subject/Url"/>
        </xsl:variable>
        <xsl:variable name="user-href">
            <xsl:value-of select="User/Url"/>
        </xsl:variable>
        <xsl:variable name="stl-href">
            <xsl:value-of select="Style/Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="dp-img-{$position}" href="{$href}">
                <xsl:apply-templates select="Image"/>
            </a>
            <p class="title"><a rel="dp-sbj-{$position}" href="{$sbj-href}"><xsl:value-of select="Subject/Name"/></a></p>
            <xsl:if test="child::User">
                <p><xsl:text>By: </xsl:text>
                    <a rel="dp-user-{$position}" href="{$user-href}"><xsl:value-of select="User/UserName"/></a>
                </p>
            </xsl:if>
            <xsl:if test="child::Style">
                <p><xsl:text>Style: </xsl:text><a rel="dp-stl-{$position}" href="{$stl-href}"><xsl:value-of select="Style/Name"/></a></p>
            </xsl:if>
        </li>
    </xsl:template>
    
    <xsl:template match="AssetUsage[@type='Rate My Space']">
        <li class="clrfix">
            <div class="acco-bd">
                <xsl:apply-templates select="Category" mode="RMS"/>
            </div>
            <div class="acco-link">
                <h5>Rate My Space</h5>
                <p>Ideas from users like you.</p>
            </div>
        </li>
    </xsl:template>
    
    <xsl:template match="Category" mode="RMS">
        <div id="acco-ratemyspace" class="acco-content acco-crsl">
            <div class="crsl">
                <ul>
                    <xsl:apply-templates select="Asset" mode="RMS"/>
                </ul>
                <p><a href="http://www.roomzaar.com/rate-my-space/editupload.esi">Upload your project</a></p>
            </div>
            <script type="text/javascript" charset="utf-8">
                <![CDATA[
                    $("#acco-ratemyspace").dpl('carousel', { pagelink:"text", pagetext:"_current of _total" });
                ]]>
            </script>
        </div>
    </xsl:template>
    
    <xsl:template match="Asset" mode="RMS">
        <xsl:variable name="href">
            <xsl:value-of select="Url"/>
        </xsl:variable>
        <xsl:variable name="usr-href">
            <xsl:value-of select="User/Url"/>
        </xsl:variable>
        <xsl:variable name="position">
            <xsl:value-of select="position()"/>
        </xsl:variable>
        <li>
            <a rel="rms-img-{$position}" href="{$href}"><xsl:apply-templates select="Image"/></a>
            <xsl:apply-templates select="Rating"/>
            <p class="title"><xsl:text>By: </xsl:text><a rel="rms-user-{$position}" href="{$usr-href}"><xsl:value-of select="User/UserName"/></a></p>
        </li>
    </xsl:template>
    
    <xsl:template match="Rating">
        <xsl:variable name="current">
            <xsl:value-of select="."/>
        </xsl:variable>
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="$current = 1">one</xsl:when>
                <xsl:when test="$current = 2">two</xsl:when>
                <xsl:when test="$current = 3">three</xsl:when>
                <xsl:when test="$current = 4">four</xsl:when>
                <xsl:when test="$current = 5">five</xsl:when>
            </xsl:choose>            
        </xsl:variable>
        <p class="rating">
            <span class="{$cname}"><xsl:value-of select="$current"/></span>
        </p>
    </xsl:template>
    
    <xsl:template match="Image">
        <xsl:variable name="src">
            <xsl:choose>
                <xsl:when test="child::ImageURL">
                    <xsl:value-of select="ImageURL"/>        
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="small_thumb"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="alt">
            <xsl:choose>
                <xsl:when test="child::Alt">
                    <xsl:value-of select="Alt"/>        
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="alt"/>
                </xsl:otherwise>
            </xsl:choose>           
        </xsl:variable>
        <img src="{$src}" alt="{$alt}" height="90" width="120"/>        
    </xsl:template>
    
    <xsl:template match="AssetId | Site | AssetType">
        
    </xsl:template>
    
</xsl:stylesheet>
