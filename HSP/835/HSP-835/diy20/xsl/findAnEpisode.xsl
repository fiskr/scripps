<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html"/>
    <xsl:variable name="context">        
        <xsl:value-of select="translate(//AssetUsage/@context,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
    </xsl:variable>
        
    <xsl:template match="ServiceResponse">
        <xsl:if test="AssetUsage/Category/*">
            <xsl:apply-templates select="AssetUsage"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="AssetUsage">
        <xsl:variable name="cname">
            <xsl:choose>
                <xsl:when test="$context = 'search'">solid-pod</xsl:when>
                <xsl:otherwise>secondary</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        
        <div class="{$cname}" id="find-a-project">
            <div class="hd">
                <xsl:choose>
                    <xsl:when test="$context = 'search'">
                        <h4>Find a Project Seen On TV</h4>
                    </xsl:when>
                    <xsl:otherwise>
                        <h5>Find a Project Seen On TV</h5>        
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <div class="bd">
                <xsl:apply-templates select="Category"/>
            </div>
        </div>
        <script type="text/javascript" charset="utf-8">
            <![CDATA[SNI.DIY.FindProjectOnTV.init();]]>
        </script>        
    </xsl:template>
    
    <xsl:template match="Category">
        <form name="episodeForm" action="/search/episode.do" method="get">
            <small>Use any of the fields below.</small>
            <fieldset>
                <ul>
                    <xsl:if test="ShowList">             
                        <xsl:apply-templates select="ShowList"/>                        
                    </xsl:if>
                    <xsl:if test="TalentList">
                        <xsl:apply-templates select="TalentList"/>
                    </xsl:if>
                    <li>
                        <label for="keywords">Keyword/s:</label>
                        <div class="input-box">
                            <span>
                                <input type="text" name="diySearchString" id="keywords"/>
                            </span>
                        </div>
                    </li>
                    <li>
                        <label for="date-from">From:</label>
                        <div class="date-box">
                            <span>
                                <input type="text" name="diyStartDate" value="mm/dd/yy" size="8" maxlength="8" id="date-from"/>
                            </span>
                        </div>
                        <label for="date-to" class="date-to-label">To:</label>
                        <div class="date-box">
                            <span>
                                <input type="text" name="diyEndDate" value="mm/dd/yy" size="8" maxlength="8" id="date-to"/>
                            </span>
                        </div>
                    </li>
                </ul>
                <p class="submit">
                    <button type="submit" name="" class="button">
                        <span><em>Find</em></span>
                    </button>
                    <xsl:if test="$context = 'search'">
                        or <a href="#">Get Search Tips</a>
                    </xsl:if>
                </p>
                <xsl:if test="$context = 'search'">
                    <div class="search-tips flyout fmed fly-dd noscroll">
                        <div class="fly-hd"></div>
                        <div class="fly-bd">
                            <a class="close"></a>
                            <h3>Search Tips</h3>
                            <ul class="list">
                                <li>A broader date range will return greater results.</li>
                                
                                <li>Try using a show or expert name and/or the date range only.</li>
                                <li>Try different words that mean the same thing.</li>
                            </ul>
                        </div>
                        <div class="fly-ft"></div>
                    </div>
                    <script type="text/javascript" charset="utf-8">
                        SNI.DIY.Search.tips('#find-a-project .submit a', '#find-a-project .search-tips');
                    </script>
                </xsl:if>
            </fieldset>
        </form>
    </xsl:template>
    
    <xsl:template match="ShowList">
        <li>
            <label for="show-name">Show Name:</label>
            <select name="diyShowId" id="show-name">
                <option value="" class="select-title">Select Show:</option>
                <xsl:apply-templates select="Show"/>
            </select>
        </li>
    </xsl:template>
    
    <xsl:template match="TalentList">
        <li>
            <label for="expert-name">Expert Name:</label>
            <select name="diyExpertId" id="expert-name">
                <option value="" class="select-title">Select Expert:</option>
                <xsl:apply-templates select="Talent"/>
            </select>            
        </li>
    </xsl:template>
    
    <xsl:template match="Show | Talent">
        <option>
            <xsl:attribute name="value"><xsl:value-of select="Param"/></xsl:attribute>
            <xsl:value-of select="Label"/>
        </option>
    </xsl:template>
   
    
</xsl:stylesheet>
