/*
 * jCarouselLite - jQuery plugin to navigate images/any content in a carousel style widget.
 * @requires jQuery v1.2 or above
 *
 * http://gmarwaha.com/jquery/jcarousellite/
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0.1
 * Note: Requires jquery 1.2 or above from version 1.0.1
 *
 * Customized by Paolo: made updates to support SNI carousel requrements (denoted with a 'pv').
 * -added a mini nav (PreviousButton – [page links] - NextButton)
 * -page enumeration (1 of x) with PreviousButton/ NextButton
 * -fixed a bug when creating a carousel with uneven number of entries
 * -fixed a bug when carousel contains nested lists
 * -fixed a bug regarding total width of carousel item
 * -all navigation is inserted by the plugin now, doesn’t need the markup in the source
 * -lazy load images that are in not visible (thanks Mark I borrowed some of your code
 *
 */


(function($) {                                          // Compliant with jquery.noConflict()
$.fn.jCarouselLite = function(o) {
    o = $.extend({
        btnPrev: null,
        btnNext: null,
        btnGo: null,
        mouseWheel: false,
        auto: null,

        displayPage: false,
        btnNavigation: false,
        miniNav: false,

        container: null,

        speed: 200,
        easing: null,

        vertical: false,
        circular: true,
        visible: 3,
        start: 0,
        scroll: 1,

        beforeStart: null,
        afterEnd: null
    }, o || {});

    return this.each(function() {                           // Returns the element collection. Chainable.

        var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
        var div = $(this), ul = $("ul:first", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible, container = $(o.container);

        if(o.circular) {
            ul.prepend(tLi.slice(tl-v-1+1).clone())
              .append(tLi.slice(0,v).clone());
            o.start += v;
        }

        //pv - handle odd sets, plugin bug
        var oli = $(">li", ul);
        var olength = oli.size();
        var grps = Math.ceil(olength/o.scroll);
        var fullSet = o.scroll*grps;
        if(olength < fullSet) {
            var html = "";
            for (var i=1;i<=(fullSet - olength);i++) {
                html += '<li class="filler"></li>';
            }
            ul.append(html);
        }

        var li = $(">li", ul), itemLength = li.size(), curr = o.start;
        li.addClass('crsl-item');
        div.css("visibility", "visible");

        li.css({"overflow": "hidden", "float": o.vertical ? "none" : "left"});
        ul.css({"margin": "0", "padding": "0", "position": "relative", "list-style-type": "none", "z-index": "1"}).addClass('clrfix');
        div.css({"overflow": "hidden", "position": "relative", "z-index": "2", left: "0px"});

        var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
        var divSize = liSize * v;                           // size of entire div(total length for just the visible items)
        var singlePage = (itemLength<=o.visible);           // if the visible number equals the number of items, no need for additional pages

        li.css({width: li.outerWidth(), height: li.outerHeight()});
        ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

        div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

        /* pv lets create them button navs in here
         * 2 options:
         * -default buttons on the ends
         * -top left nav
         */
        if(o.miniNav) {
            container.addClass('mini-nav');
            var miniNavHtml =  '<div class="nav clrfix">';
                miniNavHtml += '    <div class="prev-btn">previous</div>';
                miniNavHtml += '    <div class="controls"></div>';
                miniNavHtml += '    <div class="next-btn">next</div>';
                miniNavHtml += '</div>';

            container.find('.hd').append(miniNavHtml);
            $(o.btnPrev).addClass("disabled");

        } else {
            container.addClass('default-nav');
            container.find('.hd').after('<div class="nav clrfix"><div class="controls"></div></div>');
            container.find('.hd').before('<div class="prev-btn">previous</div>');
            container.append('<div class="next-btn">next</div>');
            $(o.btnPrev).addClass("disabled");
            container.find('.nav').css('width', divSize+"px");
        }

        /* disable next if there is no other page */
        if (singlePage) {$(o.btnNext).addClass("disabled");}

        /*
         * 2 options:
         * -page numbers
         * -page indicators/links
         */
        var ctrl =  container.find('.controls');

        if (!singlePage) {
            if (o.displayPage) {
                //container.addClass('page-nav');
                container.find('.controls').html('1 of ' + grps);
            } else {
                var btns, imgPos;

                for (var i=1;i<=grps;i++) {

                    if (i==1) {
                        btns += '<span data-load-img="0" class="active">'+i+'</span>';
                    } else {
                        imgPos = ((i-1) * o.scroll);
                        btns += '<span data-load-img='+imgPos+'>'+i+'</span>';
                    }
                }
                btns = $(btns);

                $.each(btns, function() {
                    var loadImg = parseInt($(this).attr('data-load-img'));
                    $(this).click(function() {
                        ctrl.find('span').removeClass('active');
                        $(this).addClass('active');
                        return go(loadImg);
                    });
                });

                ctrl.addClass('btn-nav clrfix');
                ctrl.html(btns);
            }
        }
        if(!o.miniNav) {
            var offset = parseInt(divSize/2) - parseInt(width(ctrl)/2);
            ctrl.css('left', offset + 'px');
            //console.log(width(ctrl), ctrl);    
        }






        //pv lets pre-load only the visible images
        ul.find(">li:lt("+o.scroll+")").each(function(){
            var img = $(this).find('img');
            SNI.Util.LazyLoad(img);
        });

        if(o.btnPrev)
            $(o.btnPrev).click(function() {
                return go(curr-o.scroll);
            });

        if(o.btnNext)
            $(o.btnNext).click(function() {
                return go(curr+o.scroll);
            });

        if(o.btnGo)
            $.each(o.btnGo, function(i, val) {
                $(val).click(function() {
                    return go(o.circular ? o.visible+i : i);
                });
            });

        if(o.mouseWheel && div.mousewheel)
            div.mousewheel(function(e, d) {
                return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
            });

        if(o.auto)
            setInterval(function() {
                go(curr+o.scroll);
            }, o.auto+o.speed);

        function vis() {
            return li.slice(curr).slice(0,v);
        };

        function visImgs() {
            var list = li.slice(curr).slice(0,v);
            list.each(function(){
                var img = $(this).find('img');
                SNI.Util.LazyLoad(img);
            });
        };

        //pv
        function pageIndex() {
            var cp = Math.ceil(curr / o.scroll) + 1;
            container.find('.controls').html( cp + ' of ' + grps);
        }

        function go(to) {
            if(!running) {

                if(o.beforeStart)
                    o.beforeStart.call(this, vis());

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<=o.start-v-1) {           // If first, then goto last
                        ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
                        curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
                    } else if(to>=itemLength-v+1) { // If last, then goto first
                        ul.css(animCss, -( (v) * liSize ) + "px" );
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
                        curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                }                           // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                //pv update pagination
                if (o.displayPage) {
                    pageIndex();
                }

                //pv update mini-nav
                if (o.btnNavigation) {
                    container.find('.controls span').removeClass('active');
                    container.find('.controls span[data-load-img='+curr+']').addClass('active');
                }

                //pv lets lazy load em if we have too
                visImgs();

                ul.animate(
                    animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis());
                        running = false;
                    }
                );
                // Disable buttons when the carousel reaches the last/first, and enable when not
                if(!o.circular) {
                    $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                }

            }
            return false;
        };
    });
};

function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
};
function width(el) {
    return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight') + css(el, 'borderLeftWidth') + css(el, 'borderRightWidth');
};
function height(el) {
    return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
};

})(jQuery);