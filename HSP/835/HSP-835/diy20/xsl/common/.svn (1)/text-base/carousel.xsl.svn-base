<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:template name="carousel">
        <xsl:param name="i"/>
        <xsl:param name="loop"/>
        <xsl:param name="clength" select="1"/>
        <xsl:param name="i-1">
            <xsl:value-of select="$i - 1"/>
        </xsl:param>
        <xsl:param name="lowerLimit">
            <xsl:value-of select="$i-1 * $clength"/>
        </xsl:param>
        <xsl:param name="upperLimit">
            <xsl:value-of select="$i * $clength"/>
        </xsl:param>
        <xsl:if test="$i &lt;= $loop ">
            <li class="panel">                
                <ul class="crsl-group">
                    <xsl:apply-templates select="child::Asset[position() &gt; $lowerLimit and position() &lt;= $upperLimit]"/>
                </ul>                
            </li>
            <xsl:call-template name="carousel">
                <xsl:with-param name="i"><xsl:value-of select="$i +1"/></xsl:with-param>
                <xsl:with-param name="loop"><xsl:value-of select="$loop"/></xsl:with-param>
                <xsl:with-param name="clength"><xsl:value-of select="$clength"/></xsl:with-param>
            </xsl:call-template>
        </xsl:if>        
    </xsl:template>


</xsl:stylesheet>
