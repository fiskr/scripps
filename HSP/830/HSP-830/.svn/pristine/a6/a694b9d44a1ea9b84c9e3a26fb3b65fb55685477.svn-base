<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="linked-hash-map">
        <xsl:apply-templates select="entry[string = 'data']/linked-hash-map/entry[string = 'epackages']/list" mode="epackage"></xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="list" mode="epackage">
        <ServiceResponse name="cartridge">
            <xsl:apply-templates select="linked-hash-map" mode="pageData"/>
        </ServiceResponse>
    </xsl:template>
    
    <xsl:template match="linked-hash-map" mode="pageData">
        <xsl:if test="child::entry/string = 'id'">
            <xsl:apply-templates select="entry[child::string = 'id']" mode="id"/>            
        </xsl:if>
        <xsl:if test="child::entry/string = 'site'">            
            <xsl:apply-templates select="entry[child::string = 'site']" mode="site"/>
        </xsl:if>
        <xsl:if test="child::entry/string = 'bannerImageUrl'">
            <xsl:apply-templates select="entry[child::string = 'bannerImageUrl']" mode="bannerImage"/>
        </xsl:if>        
        <xsl:if test="child::entry/string = 'seoTitle'">
            <xsl:apply-templates select="entry[child::string = 'seoTitle']" mode="seoTitle"/>
        </xsl:if>
        <xsl:if test="child::entry/string = 'displayName'">
            <xsl:apply-templates select="entry[child::string = 'displayName']" mode="Title"/>
        </xsl:if>
        <xsl:if test="child::entry/string = 'description'">
            <xsl:apply-templates select="entry[child::string = 'description']" mode="description"/>
        </xsl:if>
        <xsl:if test="child::entry/string = 'modules'">
            <xsl:apply-templates select="entry[child::string = 'modules']" mode="module"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="entry" mode="id">
        <AssetId>
            <xsl:value-of select="string[2]"/>
        </AssetId>
    </xsl:template>
    
    <xsl:template match="entry" mode="site">
        <Site>
            <xsl:value-of select="string[2]"/>
        </Site>
    </xsl:template>
    
    <xsl:template match="entry" mode="bannerImage">
        <BannerImageURL>
            <xsl:value-of select="string[2]"/>
        </BannerImageURL>
    </xsl:template>
    
    <xsl:template match="entry" mode="seoTitle">
        <SEOTitle>
            <xsl:value-of select="string[2]"/>
        </SEOTitle>
    </xsl:template>
    
    <xsl:template match="entry" mode="Title">
        <Title>
            <xsl:value-of select="string[2]"/>
        </Title>
    </xsl:template>
    
    <xsl:template match="entry" mode="description">
        <Description>
            <xsl:value-of select="string[2]"/>
        </Description>
    </xsl:template>
    
    <xsl:template match="entry" mode="module">
        <xsl:apply-templates select="list" mode="module"/>
    </xsl:template>
    
    <xsl:template match="list" mode="module">
        <xsl:apply-templates select="linked-hash-map" mode="module"/>
    </xsl:template>
    
    <xsl:template match="linked-hash-map" mode="module">
        <xsl:variable name="region">
            <xsl:value-of select="entry[child::string[1] = 'region']/string[2]"/>
        </xsl:variable>
        <xsl:variable name="template">
            <xsl:value-of select="entry[child::string[1] = 'template']/string[2]"/>
        </xsl:variable>
        <AssetUsage>
            <xsl:attribute name="context">
                <xsl:value-of select="translate($region,' ','_')"/>
                <xsl:text>_</xsl:text>
                <xsl:value-of select="translate($template,' ','_')"/>
            </xsl:attribute>
            <xsl:apply-templates select="entry[child::string[1] = 'displayName']" mode="module-title"/>
            <xsl:apply-templates select="entry[child::string[1] = 'description']" mode="module-desc"/>
            <xsl:apply-templates select="entry[child::string[1] = 'moduleRank']" mode="module-rank"/>            
            <xsl:apply-templates select="entry[child::string[1] = 'assets']" mode="module-assets"/>
        </AssetUsage>
    </xsl:template>
    
    <xsl:template match="entry" mode="module-desc">
        <Description>
            <xsl:value-of select="string[2]"/>
        </Description>
    </xsl:template>
    
    <xsl:template match="entry" mode="module-rank">
        <AssetRank>
            <xsl:value-of select="string[2]"/>
        </AssetRank>
    </xsl:template>
    
    <xsl:template match="entry" mode="module-title">
        <AssetUsageTitle>
            <xsl:value-of select="string[2]"/>
        </AssetUsageTitle>
    </xsl:template>
    
    <xsl:template match="entry" mode="module-assets"> 
        <Category>
            <xsl:apply-templates select="list" mode="asset"/>
        </Category>
    </xsl:template>
    
    <xsl:template match="list" mode="asset">
        <xsl:apply-templates select="linked-hash-map" mode="asset"/>        
    </xsl:template>
    
    <xsl:template match="linked-hash-map" mode="asset">
        <Asset>
            <xsl:apply-templates select="entry[child::string = 'assetId']" mode="assetId"/>
            <xsl:apply-templates select="entry[child::string = 'assetRank']" mode="assetRank"/>
            <xsl:apply-templates select="entry[child::string = 'assetType']" mode="assetType"/>
            <xsl:apply-templates select="entry[child::string = 'site']" mode="assetSite"/>
            <xsl:apply-templates select="entry[child::string = 'title']" mode="assetTitle"/>
            <xsl:apply-templates select="entry[child::string = 'titleOverride']" mode="assetTitleOverride"/>
            <xsl:apply-templates select="entry[child::string = 'description']" mode="assetDescription"/>
            <xsl:apply-templates select="entry[child::string = 'descriptionOverride']" mode="assetDescriptionOverride"/>
            <xsl:apply-templates select="entry[child::string = 'url']" mode="assetURL"/>
            <xsl:apply-templates select="entry[child::string='urlTitle']" mode="assetURLTitle"/>
            <xsl:apply-templates select="entry[child::string='imageUrlTitle']" mode="imageTitle"/>
            <xsl:call-template name="image"/>
            <xsl:apply-templates select="entry[child::string = 'cookTime']" mode="cookTime"/>
            <xsl:apply-templates select="entry[child::string = 'difficulty']" mode="difficulty"/>
            <xsl:apply-templates select="entry[child::string = 'callToAction']" mode="callToAction"/>
            <xsl:apply-templates select="entry[child::string = 'videoLength']" mode="VideoLength"/>
            <xsl:apply-templates select="entry[child::string = 'memberCount']" mode="AssetCount"/>
        </Asset>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetId">
        <AssetId>
            <xsl:value-of select="string[2]"/>
        </AssetId>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetType">
        <AssetType>
            <xsl:value-of select="string[2]"/>
        </AssetType>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetRank">
        <AssetRank>
            <xsl:value-of select="string[2]"/>
        </AssetRank>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetSite">
        <Site>
            <xsl:value-of select="string[2]"/>
        </Site>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetTitle">
        <Title>
            <xsl:value-of select="string[2]"/>
        </Title>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetTitleOverride">
        <TitleOverride>
            <xsl:value-of select="string[2]"/>
        </TitleOverride>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetDescription">
        <Description>
            <xsl:value-of select="string[2]"/>
        </Description>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetDescriptionOverride">
        <DescriptionOverride>
            <xsl:value-of select="string[2]"/>
        </DescriptionOverride>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetURL">
        <Url>
            <xsl:value-of select="string[2]"/>
        </Url>
    </xsl:template>
    
    <xsl:template match="entry" mode="assetURLTitle">
        <UrlTitle>
            <xsl:value-of select="string[2]"/>
        </UrlTitle>
    </xsl:template>
    
    <xsl:template match="entry" mode="imageTitle">
        <ImageTitle>
            <xsl:value-of select="string[2]"/>
        </ImageTitle>
    </xsl:template>
    
    <xsl:template match="entry" mode="cookTime">
        <CookTime>
            <xsl:value-of select="string[2]"/>
        </CookTime>
    </xsl:template>
    
    <xsl:template match="entry" mode="difficulty">
        <xsl:variable name="soDifficulty">
            <xsl:value-of select="string[2]"/>
        </xsl:variable>
        <xsl:variable name="difficulty">
            <xsl:choose>
                <xsl:when test="$soDifficulty = 1">
                    <xsl:text>Easy</xsl:text>
                </xsl:when>
                <xsl:when test="$soDifficulty = 2">
                    <xsl:text>Intermediate</xsl:text>
                </xsl:when>
                <xsl:when test="$soDifficulty = 3">
                    <xsl:text>Difficult</xsl:text>
                </xsl:when>
                <xsl:when test="$soDifficulty = 4">
                    <xsl:text>Expert</xsl:text>
                </xsl:when>
            </xsl:choose>    
        </xsl:variable>
        <Difficulty>
            <xsl:value-of select="$difficulty"/>
        </Difficulty>
    </xsl:template>
    
    <xsl:template match="entry" mode="callToAction">
        <CallToAction>
            <xsl:value-of select="string[2]"/>
        </CallToAction>
    </xsl:template>
    
    <xsl:template match="entry" mode="VideoLength">
        <RunningTime>
            <xsl:value-of select="string[2]"/>
        </RunningTime>
    </xsl:template>
    
    <xsl:template match="entry" mode="AssetCount">
        <AssetCount>
            <xsl:value-of select="string[2]"/>
        </AssetCount>
    </xsl:template>
    
    <xsl:template name="image">
        <Image>
            <xsl:apply-templates select="entry[child::string='imageUrlThumbnail']" mode="imageThumb"/>
            <xsl:apply-templates select="entry[child::string='imageUrlLead']" mode="imageLead"/>
            <xsl:apply-templates select="entry[child::string='imageUrlMedium']" mode="imageMedium"/>
            <xsl:apply-templates select="entry[child::string='imageUrlOverride']" mode="imageOverride"/>
            <xsl:apply-templates select="entry[child::string='imageUrlAlt']" mode="imageAlt"/>            
        </Image>
    </xsl:template>
    
    <xsl:template match="entry" mode="imageThumb">
        <ImageURL>
            <xsl:value-of select="string[2]"/>
        </ImageURL>
    </xsl:template>
    
    <xsl:template match="entry" mode="imageLead">
        <ImageLeadURL>
            <xsl:value-of select="string[2]"/>
        </ImageLeadURL>
    </xsl:template>
    <xsl:template match="entry" mode="imageMedium">
        <ImageMedURL>
            <xsl:value-of select="string[2]"/>
        </ImageMedURL>
    </xsl:template>
    <xsl:template match="entry" mode="imageOverride">
        <ImageOverride>
            <xsl:value-of select="string[2]"/>
        </ImageOverride>
    </xsl:template>
    <xsl:template match="entry" mode="imageAlt">
        <Alt>
            <xsl:value-of select="string[2]"/>
        </Alt>
    </xsl:template>
    
    
    
</xsl:stylesheet>
