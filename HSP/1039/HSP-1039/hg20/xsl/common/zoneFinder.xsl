<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:template name="zone-finder">
        <li class="clrfix">
            <div class="acco-bd">
                
                <div class="acco-content">
                    <div id="zone-finder">
                        <p class="info message">
                            Grow a great garden in your 
                            climate! Use this search tool
                            to find what to plant and how
                            to care for it.
                        </p>
                        <p class="error message" style="display: none">
                            <span>
                                Whoops, we could not find your zip code in our system.
                                Please try entering again.
                            </span>
                            <br />
                            
                            or <a href="/landscaping/usda-zones-and-plant-lists/index.html">Read More About Zones</a>
                        </p>
                        <p class="success message" style="display: none">
                            Your zone is:<br />
                            <span class="zone">
                                Zone 6B
                            </span>
                            <a href="#" class="details">Get Details</a>
                            
                            or<br />
                            <a href="/landscaping/usda-zones-and-plant-lists/index.html" class="more">Read More About<br />USDA Zones</a>
                        </p>
                        
                        <form action="" method="post">
                            <ul>
                                <li>
                                    <label for="zone-zip">Enter Zip Code</label>
                                    
                                    <div class="text-box">
                                        <span><em><input type="text" id="zone-zip" /></em></span>
                                    </div>
                                </li>
                            </ul>
                            
                            <p class="find">
                                <button type="submit" class="button"><span><em>Find Zone</em></span></button>
                            </p>
                            
                        </form>
                    </div>
                </div>
            </div>
            <div class="acco-link">
                <h5>Zone Finder</h5>
                <p>Find your zone by zip code.</p>
            </div>
            
            <script type="text/javascript" charset="utf-8">
                SNI.HGTV.ZoneFinder.init();
            </script>
        </li>
    </xsl:template>

</xsl:stylesheet>
