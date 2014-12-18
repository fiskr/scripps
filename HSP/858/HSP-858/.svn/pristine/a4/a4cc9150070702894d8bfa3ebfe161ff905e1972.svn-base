if (mdManager == undefined) {
    var mdManager = new MetaDataManager()
}
if (adManager == undefined) {
    var adManager = new AdManager()
}
$(function () {
    SNI.Gallery = function (bind) {
        // ("here i am with that: " + bind);
        var that = this;
        that.defaults = {
            items: $("[data-gallery]"),
            speed: 350,
            active: "active",
            html: {}
        };

            

        that.defaults.html.viewport = ['<div class="sni-inline-gallery sni-inline-gallery-instance-{{id}}" style="display:none;">', 
            '<div class="site-wrapper" id="uberInline">', '<section class="theater inline">', '<div class="photo-gallery4" id="{{id}}-pg">', '<div class="box close inline">', 
            '<div class="hd">', '<a class="pg-close sni-inline-gallery-close clrfix">', "<span>x</span>", "<em>Close </em>", "</a>", 
            "</div>", "</div>", '<span class="divot light"></span>', '<span class="divot dark"></span>', 


//new nav bar
'<div class="pg-navigation clrfix">',
                '<a class="pg-thumbnails-button btn thumbs"><span class="count">1 of 10</span> Photos</a>',
                '<a href="" class="pg-previous btn prev">',
                    '<span>Previous</span>',
                '</a>',
                '<a href="#" class="pg-next btn next">',
                    '<span>Next</span>',
                '</a>',
                '<div class="drop pg-thumbnails-frame">',
                    '<span class="arrow"></span>',
                    '<div class="hd">',
                        '<a href="javascript:void(0);" class="pg-close-btn">&nbsp;&nbsp;&nbsp;</a>',
                    '</div>','<div class="bd">',
'<ul class="pg-thumbnails clrfix" data-id="{{id}}">',
    '</ul>',
                            '</div>',
                '</div>',
            '</div>',



            //old nav-bar
            // '<div class="pg-navigation clrfix">', 
            //     '<div class="pg-photo-count">', 
            //      //   '<p>Photo <span class="count">1</span> of <span class="total"></span></p>', 
            //     "</div>", 
            //     '<a class="btn thumbs"><span></span>Thumbnails</a>', 
            //         '<div class="right">', '<a class="btn prev" href=""><span></span>Previous Photo</a>', '<a class="btn next" href="#">Next Photo<span></span></a>', 
            //         "</div>", 
            //         '<div class="drop pg-thumbnails-frame">', '<div class="hd"><span class="pg-close-btn">x</span></div>', '<div class="bd">', 
            //             '<ul class="pg-thumbnails clrfix" data-id="{{id}}">', "</ul>", 
            //             "</div>", "</div>", 
            //         "</div>", 

//changed h5 -->h2 and added .desc class to p
                    '<div class="pg-viewport clrfix">', '<div class="pg-photo-display">', '<div class="pg-photo-display-wrapper">', '<div class="pg-endframe inline">', '<ul class="pg-endframe-tools">', '<li><a href="#" class="replay"><span></span>Back to Beginning</a></li>', '<li><a href="#" class="back sni-inline-gallery-close"><span></span>Back to Article</a></li>', "</ul>", "</div>", "</div>", '<p class="pg-author"><span class="pg-author-name"></span></p>', "</div>", '<div class="ad-unit">', '<div class="mrec">', '<div id="bigbox">', '<script type="text/javascript">setDartEnterpriseBanner("BIGBOX",getDartEnterpriseUrl("BIGBOX",5));<\/script>', "</div>", "<span>Advertisement</span>", "</div>", "</div>", '<div class="pg-photo-description">', "<h5>{{tit}}</h5>", "<p class='desc'>{{desc}}</p>", "</div>", '<div class="pg-you-might-like">', "<h4></h4>", "<ul>", '<li><a href="#" class="next-title"></a></li>', "</ul>", "</div>", '<div class="pg-loader">', "<span></span>", "</div>", '<div class="pg-error pod">', "<h4>Please forgive us, our photos are <em>really</em> popular.</h4><p>We sent a note to our support staff about the glitch you just experienced. Please click the button below to reload your content.</p>", '<a class="btn">Reload</a>', "</div>", "</div>", "</section>", "</div>", "</div>"
                    ].join("");

        that.defaults.html.overlay = ['<div class="sni-inline-gallery-overlay" style="display:none;">', "</div>"].join(""), that.defaults.html.info = ['<div class="pg-photo-wrapper" id="pg-photo-{{id}}">', '<div class="pg-toggler">', '<div class="pg-enlarge clrfix">', '<span class="pg-toggler-button">+</span>', '<span class="pg-toggler-label">Enlarge Photo</span>', "</div>", '<div class="pg-shrink clrfix">', '<span class="pg-toggler-button">&ndash;</span>', '<span class="pg-toggler-label">Shrink Photo</span>', "</div>", "</div>", '<a title="Next Photo" class="photo" href="{{pageUrl}}"><img data-src="{{url}}" alt="{{alt}}"/></a>', "</div>"].join(""), this.defaults.html.thumbnail = ["<li>", '<div class="pg-thumbnail" data-count="{{thumbnail.count}}">', '<img data-src="{{url}}" alt="{{alt}}" />', "</div>", "</li>"].join(""), that.defaults.html.wrapper = ['<div class="pg-photo-wrapper" style="display:block;" id="pg-photo-{{id}}">', '<div class="pg-toggler">', '<div class="pg-enlarge clrfix">', '<span class="pg-toggler-button">+</span>', '<span class="pg-toggler-label">Enlarge Photo</span>', "</div>", '<div class="pg-shrink clrfix">', '<span class="pg-toggler-button">&ndash;</span>', '<span class="pg-toggler-label">Shrink Photo</span>', "</div>", "</div>", '<a title="Next Photo" class="photo" href="{{pageUrl}}"><img src="{{url}}" alt="{{alt}}"/></a>', "</div>"].join("");
        if (bind == undefined) {
            return that.bind(that)
        }
    };
    SNI.Gallery.prototype.unbind = function (elements) {
        if (elements == undefined || !elements.length) {
            return this.defaults.items.find(".sni-inline-gallery-icon, img, a").unbind()
        }
        $.each(elements, function () {
            return $(this).find(".sni-inline-gallery-icon, img, a").unbind()
        })
    };
    SNI.Gallery.prototype.bind = function (that) {
        //console.log("that: " + that);
        $(".sni-inline-gallery-close").live("click", function (e) {
            e.preventDefault();
            var current_gallery = $(this).parent().parent();
            $(".sni-inline-gallery, .sni-inline-gallery-overlay").remove();
            that.ads(false, current_gallery, that.defaults);
            return (new SNI.Gallery(false)).init()
        });
        $(".inline-gallery-close, .sni-inline-gallery-overlay").live("click", function (e) {
            e.preventDefault();
            return $(".sni-inline-gallery-close").trigger("click")
        });
        $(document).keydown(function (e) {
            var isOpen = $(".sni-inline-gallery-overlay").is(":visible");
            if (isOpen && e.keyCode == 27) {
                e.preventDefault();
                return $(".sni-inline-gallery-close").trigger("click")
            }
        })
    };
    SNI.Gallery.prototype.ads = function (show, element, ops) {
        var $bigBox = $("#bigbox");
        var $bigBox150 = $("#bigbox-150");
        $("#temp_bigbox").attr("id", "bigbox").show();
        $("#bigbox-150").show();
        element.find(".bigbox").attr("id", "").empty()
    };
    SNI.Gallery.prototype.success = function (data, id, ops, startFrom, title) {
        var $viewport = $(".sni-inline-gallery-instance-" + id);
        var $viewportOverlay = $(".sni-inline-gallery-overlay");
        if (startFrom) {
            $viewport.attr("data-gallery-startFrom", startFrom);
            //console.log("startFrom: " + startFrom);
        }
        $.each(data, function (i) {
            $this = this;
            if (i === 0) {
                $viewport.find(".pg-photo-display-wrapper").append(ops.html.wrapper.replace(/{{id}}/g, $this.iid).replace(/{{pageUrl}}/g, $this.pgUrl).replace(/{{url}}/g, $this.iurl).replace(/{{alt}}/g, $this.ialt));
                $viewport.find(".pg-photo-description .desc").html($this.icap);
                $viewport.find(".pg-photo-description h5").html($this.ititle);
                $viewport.find(".pg-photo-wrapper").show();                 

            }
            $viewport.find(".pg-thumbnails").append(ops.html.thumbnail.replace(/{{url}}/g, $this.itnurl).replace(/{{alt}}/g, $this.ialt).replace(/{{thumbnail.count}}/g, i).replace('_tz.jpg', '_sm.jpg'));
            
        });
        //$viewport.find("span.total").text(parseInt(data.length));
        //console.log("data length: " + data.length);
        $viewport.find(".pg-thumbnails-button .count").html(startFrom +" of " + data.length);
        SNI.Gallery.Instance = SNI.HGTV.PhotoGallery5($viewport, {
            current_index: startFrom -1,
            images: data,
            gallery_title: title,
            'num_images': data.length
        });
    
        if ($.browser.webkit) {
            bodyelem = $("body")
        } else {
            bodyelem = $("html,body")
        }
        $viewportOverlay.css({
            height: "100%",
            width: "100%",
            position: "fixed",
            "z-index": 99998,
            top: 0,
            left: 0,
            background: "#000",
            opacity: 0.4,
            filter: "alpha (opacity=40)"
        }).fadeIn(ops.speed, function () {
            $viewport.css({
                position: "absolute",
                top: bodyelem.scrollTop(),
                width: "100%",
                left: 0,
                "z-index": 99999,
                display: "block",
                opacity: 0,
                "background-color": "#303030"
            }).animate({
                top: bodyelem.scrollTop() + 155,
                opacity: 1,
                filter: "none !important"
            }, ops.speed)
        });
         //console.log("startFrom: " + $viewport.attr("data-gallery-startFrom"));
         //console.log("before goto in overlay.gallery" + (+$viewport.attr("data-gallery-startFrom") - 1));
        SNI.Gallery.Instance.goToPhoto((+$viewport.attr("data-gallery-startFrom") - 1))
    };
    SNI.Gallery.prototype.indicators = function (size, element) {
        if (element.find(".sni-inline-gallery-indicator").length || element.find(".sni-inline-gallery-icon").length || element.find(".sni-inline-gallery-link").length) {
            return console.warn("Warning: The indicators/Icons/Links already exsist!")
        }
        var image = element.find("> img");
        switch (size) {
            case "big":
                if (element.attr("data-gallery-title") || element.attr("data-gallery-caption")) {
                    return console.warn("Warning: Cant have captions and titles for galleries of type big or small!")
                }
                var icon = document.createElement("span");
                icon.className = "sni-inline-gallery-icon sni-inline-gallery-icon-big";
                element.prepend(icon);
                break;
            case "strip":
                var caption, title, title_length;
                if (image.length < 1) {
                    return console.warn("Warning: There are not enough images to build a strip!")
                }
                if (element.attr("data-gallery-caption")) {
                    caption = document.createElement("p");
                    caption.className = "sni-inline-gallery-caption";
                    caption.innerHTML = element.attr("data-gallery-caption")
                }
                if (element.attr("data-gallery-title")) {
                    title = element.attr("data-gallery-title");
                    title.className = "sni-inline-gallery-title";
                    title_length = element.attr("data-gallery-length");
                    title_length.className = "sni-inline-gallery-title-length";
                    photo_title = document.createElement("div");
                    photo_title.innerHTML = "<h3>" + title + "<span>&nbsp;(" + title_length + "&nbsp;Photos)</span></h3>"
                }
                $.each(image, function (index) {
                    var t = $(this);
                    var wrapper = document.createElement("div");
                    wrapper.className = "sni-inline-gallery-icon-wrapper sni-inline-gallery-icon-strip-wrapper-" + (index + 1);
                    var icon = document.createElement("span");
                    icon.className = "sni-inline-gallery-icon sni-inline-gallery-icon-strip";
                    var text = document.createElement("span");
                    text.innerHTML = "Open Gallery";
                    $(icon).append(text);
                    return t.wrap(wrapper).parent().append(icon)
                });
                var action = document.createElement("a");
                action.className = "sni-inline-gallery-icon-wrapper sni-inline-gallery-icon-wrapper-action";
                action.href = "javascript:;";
                var length = element.attr("data-gallery-length");
                action.innerHTML = "View All <span>" + length + "</span> Photos";
                return element.prepend(photo_title).append(action).append(caption).delay(1000).fadeIn("fast");
                break;
            case "default":
                var indicator = document.createElement("span");
                indicator.className = "sni-inline-gallery-indicator sni-inline-gallery-indicator-small";
                var icon = document.createElement("span");
                icon.className = "sni-inline-gallery-icon sni-inline-gallery-icon-small";
                var text = document.createElement("span");
                text.innerHTML = "Open Gallery";
                $(icon).append(text);
                var link = document.createElement("a");
                link.className = "sni-inline-gallery-link sni-inline-gallery-link-small";
                link.href = "javascript:;";
                var length = element.attr("data-gallery-length");
                link.innerHTML = "View All <span>" + length + "</span> Photos";
                link.title = image.attr("title");
                return element.prepend(indicator).append(icon).append(link).delay(1000).slideDown(2000)
        }
    };
    SNI.Gallery.prototype.init = function () {
        //console.log("init");
        var _success = this.success;
        this.unbind();
        var _this = this;
        var ops = _this.defaults;
        var body = $("body");
        _this.caption = $('p.desc');
        
        body.find(".sni-inline-gallery-overlay").remove();
        body.prepend(ops.html.overlay);
        $.each(ops.items, function () {
            var $this = $(this);
            var oid = $this.attr("data-gallery");
            var length = $this.attr("data-gallery-length");

            //var url="http://diynetwork.com/diy/feeds/photo-gallery/0,,DIY_"+id+"_1_"+length+"_SNI-InlineGallery-jsonpCallback_tz_yes,00.json";  
            //oid="HGTV_6058588__tz";
            var url="http://" + SNI.Config.domain + "/hgtv/feeds/photogallery-overlay/0,," + oid + ",00.json";
            //console.log(url);
            var size = $this.attr("data-gallery-size") || "big";
            var current_gallery = $(".sni-inline-gallery-instance-" + oid);
            _this.indicators(size, $this);
            var action_items = $this.find(".gal-btn a, .cta a, a.gal-btn"); //(".sni-inline-gallery-icon, img"); //sisan: take out a or img to prevent double calls
            $.each(action_items, function (i) {
                
                var $t = $(this);
                $t.bind("click", function (e) {
                    e.preventDefault();
                    //console.log("heelloo?");
                    if (!current_gallery.length) {
                        body.prepend(ops.html.viewport.replace(/{{id}}/g, oid))
                    }
					//check to see if the clicked element is the 'view all' strip member (versus 1st, 2nd, 3rd member)
					//'view all' element should load overlay gallery with 1 of x images loaded, vs loading 4 of x)
                    var element_clicked = $(this);
					if ( element_clicked.parent().hasClass("cta")  && element_clicked.attr("id").indexOf('inl-pg') > -1 ) {
						var index = 1;
					} else {
                    var index = i+1;
					}
					
                    if ($this.attr("data-gallery-size") === "strip") {
                        if (element_clicked.hasClass("sni-inline-gallery-icon-wrapper-action")) {
                            index = 1
                        } else {
                            index = element_clicked.parent().index()
                        }
                    }
                    SNI.InlineGallery = {};
                    SNI.InlineGallery.jsonpCallback = function (data) {
                        //console.log("oid: " + oid);
                        _success(data, oid, ops, index, (element_clicked.parents("div[data-gallery-title]").attr("data-gallery-title") || document.title))
                    };
                    //url='http://www.hgtv.com/hgtv/feeds/photo-gallery/0,,HGTV_6061011_1_20_SNI-InlineGallery-jsonpCallback_tz_no,00.json';
                    //url='http://www.dev-hgtv.com/hgtv/feeds/photogallery-overlay/0,,HGTV_6102164_2519912_tz,00.json';
                    $.ajax({
                        url: url,
                        async: true,
                        dataType: "jsonp",
                        jsonp: "callback",
                        jsonpCallback: "SNI.InlineGallery.jsonpCallback"
                    });
                    return $t.unbind("click")
                })
            });
            _this.ads(true, current_gallery, ops);

        })
    }
    //console.log("log jammin'");
    gal = new SNI.Gallery(); gal.init(); gal.caption=$('p.desc');
});