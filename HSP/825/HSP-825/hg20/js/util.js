if( typeof(SNI.HGTV.Util) == "undefined" ) {
	SNI.HGTV.Util = {};
}

//from HGRM, used in uber articles
SNI.Util.HookIMGResize = function(citeId, aTagId) {
    $(citeId).bind('click', function(evt){
  evt.stopPropagation();
  evt.preventDefault();
  $(aTagId).click();
    });
};

// also from HGRM -- click-based photo resize functionality
SNI.Util.IMGResize = ( function($){
    return {
  sizes : { // storing various image sizes for flexible lookup on resize
      'lg': {width: '616px', height: '462px',
       vertical_dimensions: {width: '616px', height: '821px'}
      },
      'al': {width: '266px', height: '200px',
       vertical_dimensions: {width: '266px', height: '354px'}
      },
      'med': {width:'160px', height: '120px', 
        vertical_dimensions: {width: '160px', height: '120px'}
       },
      'tzhz': {width: '120px', height: '90px', 
         vertical_dimensions: {width: '90px', height: '120px'}
        },
      'ab': {width: '160px', height: '120px',
       vertical_dimensions: {width: '120px', height: '160px'}
      }
  },
  
  grow: function(cfg) {
      var animate = function() {

    var p = cfg.img.parent(),
    ico = p.find('.ico:first'),
    newsize = SNI.Util.IMGResize.sizes[cfg.newsize];
    p.spinner();

    if(cfg.is_vertical === true) { // check if large image is vertical. if so, change the dimensions of the new size
        newsize = SNI.Util.IMGResize.sizes[cfg.newsize].vertical_dimensions;
    }

    ico.fadeOut('350', function() {

      p.spinner('remove');

        if (cfg.headline.n.length === 0) { //when no h4 to scroll to, use image
      cfg.headline.n = cfg.img;
        }

        SNI.Util.scrollNodeIntoView(cfg.headline);
        p.parent().addClass('active');

        cfg.img.animate($.extend(newsize, cfg.props), {         
      duration: 350,
      complete: function() {
          p.find('.ico em:first').text('Shrink Photo').parent().delay(0).fadeIn('350');
          cfg.img.removeClass('animating');
      } // end callback
        }); // end animate
    });
      },
      prep = function() {
    if(cfg.fluff !== false && typeof cfg.fluff.pregrow !== 'undefined'){
        cfg.fluff.pregrow();
    }
      };
      
      prep();
      cfg.img.one('load', function(evt) {
    animate();

      });
      cfg.img.attr('src', cfg.newsrc);
  },

  shrink: function(cfg) {       // scale large image back down to the smaller image's size

      var p = cfg.img.parent();
      ico = p.find('.ico:first'),
      originalsize = cfg.originalsize;
      
      if(cfg.is_vertical === true) {
    originalsize = cfg.originalsize.vertical_dimensions;
      }

      ico.fadeOut('350', function() {
    p.parent().removeClass('active');
    cfg.img.stop().animate($.extend(originalsize, cfg.props), {
        duration: 350,
        complete: function() {
      
      if(cfg.fluff !== false && typeof cfg.fluff.postshrink !== 'undefined') {
          cfg.fluff.postshrink();
      }
      p.find('.ico em:first').text('Enlarge Photo').parent().delay(0).fadeIn('350');
      cfg.img.attr('src', cfg.newsrc);
      cfg.img.removeClass('animating');
      
        } // end callback
    }); // end animate
      });
  },

  init: function(cfg) {
      var DEFAULT_CONFIG = {
    module : '',
    context : '' // used to indicate if special treatment needs to be applied prior to resize
      },
      img,
      img_sm_url,
      img_lg_url,
      treatments = {},
      fluff = false,
      headline,
      references = {},
      originalsize,     // suffix associated with original (thumb) size,
      newsize,     // suffix associated with enlarged thumb (traditionally _lg)
                  //      suffix = /(3x4|4x3)\_(.{2,4})\.jpg$/ig, // 2-4 characters after the last underscore, prior to the .jpg extension;

      suffix = /\_(lg|lead|al|med|tz|sm|ab|tzhz)\.jpg$/ig,    //match all possible image sizes

      is_vertical = function(str, imgClass) { //vertical if '3x4' present
    if (imgClass == 'vertical') return true;

    str = str || '';
    if (str.split('_').shift() === '3x4') {
        return true;
    }
    return false;
      },

      get_suffix = function(str){
    str = str || '';
    return str.split('_').pop();
      },

      originalsize_is_vertical,
      newsize_is_vertical;

      cfg = $.extend(DEFAULT_CONFIG, cfg);
      cfg.module = $(cfg.module);

      // store small and large image values
      img = cfg.module.find('img:first');
      img_sm_url = img.attr('src');
      img_lg_url = cfg.module.attr('href');

      // cached dom selectors related to before/after module
      // should be expanded/abstracted to accommodate other contexts as needed
      references.li = img.parent().parent();
      references.nextli = references.li.next();
      references.previmg = references.li.prev('li').find('img:first');

      // various custom pre-treatments based on special cases,
      // dictated by the cfg.context parameter in its relation to a key within this lookup table
      treatments = {
    'before' : {
        headline : {
      n : cfg.module.prev('h5'),
      special_offset : 20
        }, // jquery selector for headline associated with before image in before/after module

        references : references,
        pregrow: function() {
      treatments.before.references.li.animate(
          {'padding-left': '0px'},
          {duration: 350}
      );

      if(treatments.before.references.nextli.hasClass('active') === false) {
          treatments.before.references.nextli.find('cite:first').css('margin-left', '7px');
      }
        },

        postshrink: function() {
      headline.special_offset = 15;
      SNI.Util.scrollNodeIntoView(headline);
      
      treatments.before.references.li.animate(
          {'padding-left': '28px'},
          {duration: 350}
      );
      
      if(treatments.before.references.nextli.hasClass('active') === false) {
          treatments.before.references.nextli.find('cite:first').removeAttr('style');
      }
        }
    },

    'after': {
        headline: {
      n: cfg.module.prev('h5'),
      special_offset : -270
        },
        references : references, // get reference to before image

        pregrow: function() { // check if it's enlarged
      if( treatments.after.references.previmg.attr('height') === 200) {
          headline.special_offset = -270
      
      } else headline.special_offset = 15;
        },

        postshrink : function(){
      if( treatments.after.references.previmg.attr('height') === 200) {
          headline.special_offset = 15;
      }
      else {
          headline.special_offset = 15;
      }

      // if there's a custom style (left margin on image-specific caption) remove it
      treatments.after.references.li.find('cite:first').removeAttr('style');
      SNI.Util.scrollNodeIntoView(headline);
        }
    }
      };

      // check if pre-treatment needs to be applied prior to resize
      if(cfg.context !== '' && typeof cfg.context !== 'undefined'){
    fluff = treatments[cfg.context];
    headline = treatments[cfg.context].headline;
      
      } else { // set headline to hard-coded default
    headline = {
        n : cfg.module.parent().prev('h4'),
        special_offset : 10
    };
      }

      originalsize = img.attr('src').match(suffix)[0].replace('.jpg','');
      imgClass = img.attr('class');
      originalsize_is_vertical = is_vertical(originalsize, imgClass);
      originalsize = get_suffix(originalsize);

            newsize = img_lg_url.match(suffix)[0].replace('.jpg','');
      newsize_is_vertical = originalsize_is_vertical;
      newsize = get_suffix(newsize);

      // delegating click event off of link so that nothing breaks when image or icon is clicked
      return cfg.module.bind('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // adding a class so that duplicate handlers don't execute
    if(img.hasClass('animating') === false) {
        img.addClass('animating');
        
        if(img.parent().parent().hasClass('active')){
      SNI.Util.IMGResize.shrink({
          is_vertical : originalsize_is_vertical,
          img : img,
          newsrc : img_sm_url,
          fluff : fluff,
          originalsize : SNI.Util.IMGResize.sizes[originalsize],
          props : cfg.shrinkprops,
          headline : headline
      });
        }
        else {
      SNI.Util.IMGResize.grow({
          is_vertical : newsize_is_vertical,
          img : img,
          newsrc : img_lg_url,
          newsize : newsize,
          fluff : fluff,
          props : cfg.growprops,
          headline : headline
      });
        } // end if
    } // end if
      }); // end handler
  }
    };
} )(jQuery);



// sets the class .hover on <li> elements only when in IE 6
SNI.HGTV.Util.liHover = function(el) {
	if ($.browser.msie && parseInt($.browser.version) == 6) {
		$(el).find('li').hover(
			function() { $(this).addClass('hover'); }, 
			function() { $(this).removeClass('hover'); }
		);
	}
};

// add an additional animation for accordions
$.extend($.ui.accordion.animations, {
	easeOutSine: function(options) {
		this.slide(options, {
			easing: 'easeOutSine',
			duration: 600
		});
	}
});

// give input fields an additional class when they are "active"
// $(document).ready(function() {
// 	$(':text, textarea').focus(function() { $(this).addClass('active'); }).blur(function() { $(this).removeClass('active'); });
// });

/*giving jquery the sort method */
jQuery.fn.sort = Array.prototype.sort;

SNI.HGTV.Util.flyOuts  = {
	getScrollXY: function() {
		  var scrOfX = 0, scrOfY = 0;
		  if( typeof( window.pageYOffset ) == 'number' ) {
			// Netscape compliant
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			// DOM compliant
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			// IE6 standards compliant mode
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		  }
		  return [ scrOfX, scrOfY ];
	},
	
		/*scroll the current element into view*/
		/* params
			object: defines the popup object
			anchorObj: defines the anchor object
			yAlign: defines to which side of the anchor element popup must align
			useLftOffset: this allows to use a left offset value
			useTopOffset: this allows to use a left offset value
			overRideDflt: this overrides the default CSS placement of the div when it is IN the viewport
		*/
		moveToView:function(settings) {
			settings = jQuery.extend({
			object: null,		
			anchorObj: null,					
			yAlign: "left",
			useLftOffset: 0,
			useTopOffset: 0,
			overRideDflt: false
			}, settings);
			/*reset the obj pos*/
			settings.object.css({left:'', top:''});
			/*get the current pos*/
			var p = SNI.HGTV.Util.flyOuts.getPosition(settings.object, true);
			var pc = SNI.HGTV.Util.flyOuts.getPosition(settings.anchorObj, true);


			var viewportHeight = $(window).height();
			var scrollTop = SNI.HGTV.Util.flyOuts.getScrollXY()[1];
			var viewportBottomY = scrollTop + viewportHeight;
			var containerMaxTopY = (viewportBottomY - (settings.object[0].offsetHeight + 10));

			/*if we're off the bottom of the page, move it*/
			if((settings.anchorObj[0].offsetTop - 4 > containerMaxTopY) && (165 <= viewportHeight)){
			  var top = containerMaxTopY;
			  var left = (pc.width + pc.left) + (settings.useLftOffset);

			    if (settings.pAlign == "left") {
			      left = (pc.left - p.width) + (settings.useLftOffset);
			    }
			  settings.object.css({left: left + 'px', top: top + 'px' });
			  //$("html,body").animate({"scrollTop": "+=" + ((p.bottom - sd.y)) + "px" })
			} else {
			    var top = '';
			    var left = '';
				
				if (settings.overRideDflt) {
				  top = pc.top + settings.useTopOffset;
				  left = (pc.width + pc.left) + (settings.useLftOffset);
				}				
				
				/*ugly workaround*/	
			    if ( (jQuery.browser.msie) && (!settings.overRideDflt)) { 
				  left = pc.left; 
				  top = pc.top + 15;
				}
			    settings.object.css({left: left + 'px', top: top + 'px'});
			}
		},
				
		getPosition: function(obj){
			var $el = obj;
			var bHidden = false;
			var bUseOffset = true;
			// if the element is hidden we must make it visible to the DOM to get
			if ($el.is(":hidden")) {
				bHidden = !!$el.css("visibility", "hidden").show();
			}
			
			var pos = $.extend($el[bUseOffset === true ? "offset" : "position"](),{
				  width: $el.outerWidth()
				, height: $el.outerHeight()
				, marginLeft: parseInt($.curCSS($el[0], "marginLeft", true), 10) || 0
				, marginRight: parseInt($.curCSS($el[0], "marginRight", true), 10) || 0
				, marginTop: parseInt($.curCSS($el[0], "marginTop", true), 10) || 0
				, marginBottom: parseInt($.curCSS($el[0], "marginBottom", true), 10) || 0
			});
			
			if( pos.marginTop < 0 ) pos.top += pos.marginTop;
			if( pos.marginLeft < 0 ) pos.left += pos.marginLeft;
			
			pos["bottom"] = pos.top + pos.height;
			pos["right"] = pos.left + pos.width;
			
			// hide the element again
			if( bHidden ) $el.hide().css("visibility", "visible");
	
			return pos;
		},

		/*functions to sort alphabetically*/
		alphaCompare: function(a, b){ 
		    a = a.toLowerCase();
		    b = b.toLowerCase();
		    return a < b ? -1 : a > b ? 1 : 0;	
		}

};


// to-do: bundle with other metric util methods(?)
SNI.Util.hitCount = function() {
	var myURL, cacheBuster = new Date();

	if (location.host == "www.hgtv.com") {
		myURL = "http://img.hgtv.com/webhgtv/hg20/html/fixHits.html?c="+cacheBuster.getTime();
	} else {
		myURL = "http://frontend.scrippsnetworks.com/hgtv/fixHits.html?c="+cacheBuster.getTime();
	}
	if ($("#hitCounter").length > 0) {
		$("#hitCounter").remove();
	}
// if you need HTTP response code 200, otherwise will be 304
//	myURL  += "?t=" + (new Date().getTime());
	$("head").append('<iframe id="hitCounter" src="' + myURL + '" width="0" height="0" frameborder="0" style="height:0; width:0; display:none;"></iframe>')
	return;
};



/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
 *  Flyout object formerly in core util.js
 */
SNI.Util.Flyout = {  
  create: function(settings){
    var flyout = {      
      draw_list: function(items){
        var flyout = this;
        items = items || flyout.select.children('option').not('.excluded');

        var flyout_list = jQuery('<ul class="flyout-list"></ul>');    

        items.each(function(i){
          var $this = jQuery(this);
          var list_item = jQuery('<li><span>' + jQuery.trim($this.text()) + '</span></li>');

          if ($this.attr('selected')) {
            list_item.addClass('selected');
          }

          if ($this.attr('disabled')) {
            list_item.addClass('disabled');
          }

          list_item.not('.disabled').click(function(event){
            flyout.anchor.children('.'+flyout.settings.trigger_class[0]).children('span').text(jQuery.trim($this.text()))
            $this.siblings().removeAttr('selected');
            $this.attr('selected','selected');            
            flyout.hide();
            flyout.select.change();
          });

          flyout_list.append(list_item);
        });    

        return flyout_list;
      },
      
      show: function(speed){
        var flyout = this;
        flyout.element.fadeIn(speed || 100);
        flyout.anchor.addClass('flyout-is-open');
      },
      
      hide: function(speed){
        var flyout = this;
        flyout.element.fadeOut(speed || 100);
        flyout.anchor.removeClass('flyout-is-open');
      },
      
      create_flyout: function(){
        var flyout = this;
        var html = jQuery('<div></div>');
        var id = flyout.flyout_id();
        var settings = flyout.settings;
        
        jQuery.each(settings.wrapper_classes,function(){
          html.addClass(this.toString());
        });
        
        if (id) {
          html.attr('id',id);
        }
        
        var head = flyout._flyout_hd();
        head.children('.close').click(function(e){
          flyout.hide();
        });
        
        html.append(head);

        html.append(flyout._flyout_bd());
        
        html.append(flyout._flyout_ft());

        return html;
      },
      
      _flyout_hd: function(){
        var html = jQuery('<div></div>')
        jQuery.each(settings.header_wrap, function(){
          html.addClass(this.toString());
        });
        
        if (settings.close_button) {
          html.prepend('<span class="close">Close</span>')
        }
        
        if (settings.title) {
          html.prepend('<'+settings.title_element+' class="'+settings.title_class+'">'+settings.title+'</'+settings.title_element+'>');
        }
        
        return html;        
      },
      
      _flyout_bd: function(){
        var html = jQuery('<div></div>')
        jQuery.each(settings.body_wrap, function(){
          html.addClass(this.toString());
        });
        
        html.append(flyout.list);
        
        return html;
      },
      
      _flyout_ft: function(){
        var html = jQuery('<div></div>')
        jQuery.each(settings.footer_wrap, function(){
          html.addClass(this.toString());
        });
        
        return html;
      },
      
      flyout_id: function(){
        var flyout = this;
        var id;

        if (flyout.select && flyout.select.attr('id')) {
          id = "flyout-for-"+flyout.select.attr('id');
        }

        return id;
      },
            
      build_options: function(settings) {
        settings.title_element = settings.title_element || 'h4';
        settings.title_class = settings.title_class || 'flyout-title';
        settings.close_button = settings.close_button ? true : false;
        settings.wrapper_classes = settings.wrapper_classes || ['flyout'];
        settings.header_wrap = settings.header_wrap || ['flyout-hd'];
        settings.body_wrap = settings.body_wrap || ['flyout-bd'];
        settings.footer_wrap = settings.footer_wrap || ['flyout-ft'];
        
        this.settings = settings;
        return settings;
      }
    };
    
    flyout.build_options(settings);
    
    return flyout;
  },
  
  
  
  createFor: function(select_element, settings) {
    settings.wrapper_classes = ['flyout', 'flyout-med', 'flyout-for-select']
    settings.attach_to = settings.attach_to || select_element.parent();
    settings.anchor_class = settings.anchor_class || ['select-flyout'];
    settings.trigger_class = settings.trigger_class || ['select-flyout-selector'];
    // add ability to  use a css class instead for easier configuration
    settings.flyout_css = (settings.flyout_css === false) ? false : true;
    
    var flyout = this.create(settings);
    
    flyout.anchor = jQuery('<div><div><span>'+jQuery.trim(select_element.children(':selected').text())+'</span></div></div>');
    flyout.select = select_element;
    flyout.list = flyout.draw_list(flyout.sele);
    flyout.element = flyout.create_flyout();
    
    if (flyout.select.attr('id')) {
      flyout.anchor.attr('id',"selector-for-"+flyout.select.attr('id'));
    }
    
    jQuery.each(settings.anchor_class, function(){
      flyout.anchor.addClass(this.toString());
    });
    jQuery.each(settings.trigger_class, function(){
      flyout.anchor.children('div').addClass(this.toString());
    });
    
    flyout.select.change(function(event){
      flyout.anchor.children('span').html(jQuery.trim(flyout.select.children(':selected').text()));
      flyout.select.children('option').not('.excluded').each(function(i){
        if (jQuery(this).is(':selected')) {
          var selected_list_item = flyout.element.find('.flyout-list > li').eq(i);
          
          if (!selected_list_item.hasClass('selected')) {
            selected_list_item.siblings().removeClass('selected');
            selected_list_item.addClass('selected');
          }
                    
          return false;
        }
      });
      
    });

    if(settings.flyout_css === true) {
        flyout.element.css({ 'position':'absolute', 'top': 0, 'left': 0, 'display': 'none'});
    }

    flyout.anchor.append(flyout.element);
    
    var body_click = function(event){
      var fly = flyout;
      var element = $(event.target);
      if (fly.element.is(':visible')) {
        if (element.parents().is('#'+fly.anchor.attr('id'))) {
          event.stopPropagation();
        } else {
          fly.hide();
          jQuery('body').unbind('click',body_click);
        }
      } else {
        event.stopPropagation();
      }      
    };
    
    flyout.anchor.children('.'+settings.trigger_class[0]).bind('click focus',function(e){
      flyout.show();
      jQuery('body').bind('click',body_click);
    });
    
    select_element.hide();
    flyout.settings.attach_to.append(flyout.anchor);
    
    return flyout;
  }
};


/*
 * General ellipsize-ing helper function
 * @returns an array of:
 *   ['ellipsized text', 'remaining text']
 */
SNI.Util.Ellipsize = function(selector, max, textToTruncate) {
    var dots = '...';
    if (max < 3) return '...';
    
    var text = $(selector).html() || textToTruncate;

    if (text.length <= max) return new Array(text, '');
    var end = text.lastIndexOf(' ', (max - 3)); // Start by chopping off at the word before max

    if (end == -1) return new Array(text.substring(0, (max - 3)) + dots,
                                    text.substring((max - 3), text.length) 
                                   ); // Just one long word. Chop it off.
    
    var newEnd = end;
    while ((text.substring(0, newEnd) + dots).length < max) {
	end = newEnd;
	newEnd = text.indexOf(' ', end + 1);
	
	if (newEnd == -1) newEnd = text.length; // No more spaces.
    }

    return new Array(text.substring(0, end) + dots,
                     text.substring(end, text.length)
                    );
};

SNI.Util.EllipsizeWithMoreLink = function(selector, max, more_link_text, more_link_function) {
    if (! ($(selector).length && $(selector).html().length > max) ) return;

    var ellps_text = SNI.Util.Ellipsize(selector, max);
    $(selector).html(ellps_text[0] + 
                     ' <a class="read-more" href="javascript:void(0);" onclick="' +  more_link_function + '">' + more_link_text + '</a>' +
                     '<span class="hidden" style="display:none">' + ellps_text[1] + '</span>');
};

SNI.Util.RemoveEllipsize = function(selector) {
    $(selector + ' a.read-more').remove();
    var more_text = $(selector + ' span.hidden').html();
    $(selector + ' span').remove();

    var text = $(selector).html();
    if (text.length < 3) return;

    text = text.replace(/\.+\s*$/g, '');
    $(selector).html(text + more_text);
};


/*
 * jQuery truncate plugin
 * @author Brendan Brelsford
 * @email brendan@perfectsensedigital.com
 *
 * @version 1.0 [2012-03-01]
 *
 * Usage:
 *
 *     Invocation
 *
 *     $('.selector').truncate(options);
 *
 *     Event Binding (after invocation)
 *
 *     $('.selector').truncate('bind', 'show', function(){ // do something when full text is shown});
 *
 * Events:
 *
 *     Events are triggered on the following state changes of the selected element.  No events are triggered
 *     on the initial invocation of the truncate plugin.
 *
 *     "show" - Triggered when full text is shown
 *     "hide" - Triggered when full text is truncated
 *     "toggle" - Triggered both when full text is shown and truncated
 *
 * Options:
 *
 *     Options are passed as a flat javascript object with the following allowed keys:
 *
 *     "maxLines" - The maximum number of lines to display when the element is truncated.
 *                  Allowed Values: integer > 0
 *                  Default Value: 1
 *
 *     "allowedExtraLines" - Target "maxLines", but allow up to this many extra lines if text is long enough.
 *                  Allowed Values: integer >= 0
 *                  Default Value: 0
 *
 *     "truncateString" - Suffix to append to truncated text. e.g. &nbsp;&#8230; (non-breaking space followed by an ellipsis).
 *                  Allowed Values: any string
 *                  Default Value: ''
 *
 *     "showText" - If specified, will be shown as a hyperlink appended to the truncated text.  When clicked, this link
 *                  will toggle the truncated element to its full-text state. e.g. ("more")
 *                  Allowed Values: true / false
 *                  Default Value: ''
 *
 *     "hideText" - If specified, will be shown as a hyperlink appended to the full text.  When clicked, this link will
 *                  toggle the full-text element to its truncated state.  e.g. ("less")
 *                  Allowed Values: any string
 *                  Default Value: ''
 *
 *     "collapsed" - Indicates whether the truncated element should be initially displayed in a full-text or truncated state.
 *                   Allowed Values: true / false
 *                   Default Value: true
 *
 *     "debug" - Indicates whether messages should be written to console.log including the truncation execution time and
 *                   number of binomal search steps used to truncate the full text.  The usage of console.log in this plugin
 *                   is always safe for inclusion in IE.
 *
 *     "contextParent" - A parent DOM element to use as the cloned element for measuring height of the cloned text.  This is necessary
 *                   when the text node can have its text displaced by floated elements inside a common parent.
 *
 * Examples:
 *
 *     Truncate to 3 lines with a trailing ellipsis, "Read More" text when collapsed, and no hide text.
 *
 *     $('.selector').truncate({
 *         'maxLines': 3,
 *         'truncateString': '&nbsp;&#8230;',
 *         'showText': 'Read More'
 *     });
 *
 *     Truncate to 3 lines with a trailing ellipsis, relative to a context parent that includes a floated image.
 *
 *     var $el = $('.selector');
 *     var $contextParent = $el.closest('.parent-selector');
 *
 *     $('.selector').truncate({
 *         'maxLines': 3,
 *         'truncateString': '&nbsp;&#8230;',
 *         'contextParent': $contextParent
 *     });
 */


if (typeof jQuery !== 'undefined') {
    (function($) {

        $.fn.truncate = function(opts) {

            var options = $.extend({

                // --- Defaults ---
                'maxLines': 1,
                'lineHeight': 15,
                'allowedExtraLines': 0,
                'truncateString': '',
                'showText': '',
                'hideText': '',
                'collapsed': true,
                'debug': false,
                'contextParent': null

            }, opts);

            var DEBUG = function(msg) {
                if((options.debug === true) && (typeof console !== 'undefined')) {
                    console.log(msg);
                }
            };

            // matching expression to determine the last word in a string.
            var lastWordPattern = /(?:^|\W)\w*$/;
            var firstWordPattern = /(?:^\W+)\w+/;
            var showLinkHtml = options.showText !== '' ? ' <a class="show" href="#">' + options.showText + '</a>' : '';
            var hideLinkHtml = options.hideText !== '' ? ' <a class="hide" href="#">' + options.hideText + '</a>' : '';

            var maxHeight = options.maxLines * options.lineHeight;
            var realMaxHeight = maxHeight + options.allowedExtraLines * options.lineHeight;

            var setNodeText = $.browser.msie ? function(node, text) {
                node.nodeValue = text;
            } : function(node, text) {
                node.textContent = text;
            };

            // defines a utility function to splice HTML at a text offset
            var getHtmlUntilTextOffset = function($el, offset) {

                var queue = [];
                var $html = $('<div/>');
                var textLen = 0;

                // testing var to prevent infinite loops
                var count = 0;

                // remove child nodes from this node and push all onto the queue in reverse order (this implements depth-first search).
                var rootChildren = $el.clone().contents().detach();
                var n = 0;
                for(n = rootChildren.size() - 1; n >= 0; --n) {

                    queue.push({$parent: $html, node: rootChildren.get(n)});
                }

                while((queue.length > 0) && (textLen < offset) && (count < 100)) {

                    var queueItem = queue.pop();
                    var node = queueItem.node;
                    var $node = $(node);
                    var nodeTextLen = 0;
                    var nodeText;

                    // process text nodes distinctly from other node types
                    if(node.nodeType === 3) {

                        var $nodeParent = queueItem.$parent;

                        // append $node to $html with children.  if children were detached above, then this is an empty node
                        $nodeParent.append($node);

                        nodeText = $node.text();
                        nodeTextLen = nodeText.length;

                        // if the text node's contents would put textLen above offset, perform truncation
                        if (nodeTextLen > offset - textLen) {

                            var match = lastWordPattern.exec(nodeText.substring(0, offset - textLen));
                            var lastWordOffset = match.index + match[0].length;
                            setNodeText(node, nodeText.substring(0, lastWordOffset));

                            if(!($nodeParent.is('a'))) {
                                $nodeParent.append(options.truncateString);
                            } else {
                                $nodeParent.parent().append(options.truncateString);
                            }

                            // stop processing nodes.  the last word that will not exceed the offset has been found.
                            textLen += lastWordOffset;
                            break;

                        } else {
                            textLen += nodeTextLen;
                        }

                    } else {

                        nodeText = $node.text();
                        nodeTextLen = nodeText.length;

                        // if the text content of this node and its children is greater than the gap between the accumulated text length and offset
                        if(nodeTextLen > offset - textLen) {

                            // remove child nodes from this node and push all onto the queue in reverse order (this implements depth-first search).
                            var children = $node.contents().detach();
                            var i = 0;
                            for(i = children.size() - 1; i >= 0; --i) {

                                queue.push({$parent: $node, node: children.get(i)});
                            }
                        } else {

                            textLen += nodeTextLen;
                        }

                        // append $node to $html with children.  if children were detached above, then this is an empty node
                        queueItem.$parent.append($node);
                    }
                }

                return $html;
            };

            $(this).each(function() {

                var startTime = new Date();

                var $text = $(this);

                var originalHeight = $text.height();

                if (originalHeight > realMaxHeight) {

                    var originalHtml = $text.html();

                    // check whether a $parent element was specified for a larger DOM context
                    var $contextParent = (options.contextParent === null || options.contextParent === $text) ? $text : $(options.contextParent);

                    var $doppleText;
                    var $doppleParent;
                    if($contextParent.find($text).size() > 0) {

                        var childOffsets = [];
                        var $node = $text;
                        var $closestParent = $node.parent();
                        while($closestParent.size() !== 0 && !($closestParent.find($contextParent).size() > 0)) {

                            childOffsets.unshift($node.index());
                            $node = $closestParent;
                            $closestParent = $closestParent.parent();
                        }

                        $doppleParent = $contextParent.clone();
                        $doppleText = $doppleParent;
                        var i;
                        for(i = 0; i < childOffsets.length; i++) {
                            var offset = childOffsets[i];
                            $doppleText = $doppleText.children().eq(offset);
                        }
                    } else {
                        $doppleText = $text.clone();
                        $doppleParent = $doppleText;
                    }

                    $doppleParent.css({
                        position: 'absolute',
                        left: '-9999px',
                        width: $contextParent.width()
                    });
                    $doppleText.css({
                        'line-height': options.lineHeight + 'px'
                    });

                    $contextParent.after($doppleParent);

                    var textString = $text.text();
                    var near = 0;
                    var far = textString.length;
                    var mid = far;
                    var truncatedHtml;

                    var count = 0;

                    do {
                        if($doppleText.height() > maxHeight) {
                            far = mid;
                        } else {
                            near = mid;
                        }

                        var avg = Math.floor((far + near) / 2);
                        mid = lastWordPattern.exec(textString.substring(0, avg)).index;
                        if(mid === near) {
                            var nextWord = firstWordPattern.exec(textString.substring(avg, far));
                            if(nextWord !== null) {
                                mid = avg + nextWord.index;
                            }
                        }

                        truncatedHtml = getHtmlUntilTextOffset($text, mid).html();
                        $doppleText.html(truncatedHtml + showLinkHtml);
                        count++;
                    } while((count < 100) && (mid > near));

                    $doppleParent.remove();

                    if(options.collapsed === false) {
                        $text.append(hideLinkHtml);
                    } else {
                        $text.html(truncatedHtml + showLinkHtml);
                    }

                    $text.css({
                        'display': 'block',
                        'line-height': options.lineHeight + 'px'
                    });

                    $text.delegate('.show', 'click', function(event) {

                        event.preventDefault();

                        $text.html(originalHtml + hideLinkHtml);
                        $text.css('height', 'auto');

                        $text.trigger('show');
                        $text.trigger('toggle');
                    });

                    $text.delegate('.hide', 'click', function(event) {

                        event.preventDefault();

                        $text.html(truncatedHtml + showLinkHtml);
                        $text.css('height', maxHeight + 'px');
                        $text.trigger('hide');
                        $text.trigger('toggle');
                    });
                    DEBUG("truncate.js: truncated element with height " + originalHeight + "px > " + realMaxHeight + "px in " + count + " steps.");
                } else {
                    DEBUG("truncate.js: skipped processing element with height " + originalHeight + "px < " + realMaxHeight + "px");
                }

                var endTime = new Date();

                DEBUG("truncate.js: took " + (endTime - startTime) + "  ms to execute.");
            });
        };

    })(jQuery);
}

// abstracted functionality to scroll HTML nodes into view
SNI.Util.scrollNodeIntoView = ( function($){
    return function(cfg){
  var DEFAULT_CONFIGS = {},
  doc = $('html, body');

  cfg = $.extend(DEFAULT_CONFIGS, cfg);
  doc.animate({scrollTop: cfg.n.offset().top - cfg.special_offset}, 750);
    };
} )(jQuery);
