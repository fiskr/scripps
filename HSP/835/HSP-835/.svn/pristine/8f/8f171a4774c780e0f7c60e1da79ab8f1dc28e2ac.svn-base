if (typeof SNI === 'undefined') { SNI = {}; }
if (typeof SNI.IS === 'undefined') { SNI.IS = {}; }

/**
 * @author <a href="mailto:mheisig@scrippsnetworks.com">Matt Heisig</a>
 * @namespace Defines functions to load Pinterest library and create "Pin It" buttons
 */
SNI.IS.Pinterest = {
		scriptSrc: window.location.protocol + '//assets.pinterest.com/js/pinit.js',
		/* place to store the pin it jQuery element*/
		$pinItEl: null,
		/* style element node for testing animate support and injecting the css setup*/
		styleElem: document.createElement('style'),
		/* place holder for the last node from the pin it count node*/
		pinItCountNode: null,
		/* setting default animation support to false*/
		animationSupport: false,
		venderPrefixes: ['Webkit', 'Moz', 'ms'],
		keyframeName: 'pinCountLoaded',
		animationString: 'AnimationName',
		keyframePrefix: '',
		/*
		 * @function
		 * @description Check for animation support and set the correct vendor prefix css property for keyframes and animation
		 * @author Henry Chan
		 */
		setCheckForAnimationSupport: function() {
			var thisPinterest = SNI.IS.Pinterest;
			
			if (thisPinterest.styleElem.style.animationName) {
				thisPinterest.animationSupport = true;
			} else {
				var domPrefixes = thisPinterest.venderPrefixes,
				prefix = '',
				numPrefixes = domPrefixes.length;
				for (var i = 0; i < numPrefixes; i++) {
					if (thisPinterest.styleElem.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
						prefix = domPrefixes[i];
						thisPinterest.animationString = prefix + 'Animation';
						thisPinterest.keyframePrefix = '-' + prefix.toLowerCase() + '-';
						thisPinterest.animationSupport = true;
						break;
					}
				}
			}
			
		},
		/*
		 * @function
		 * @description setting up the @keyframe and animation css for css selector listerner implementation
		 * @author Henry Chan
		 */
		setCssListenerCss: function() {
			var styleRules = null,
			thisPinterest = SNI.IS.Pinterest,
			styleElem = thisPinterest.styleElem,
			ruleText = '@' + thisPinterest.keyframePrefix + 'keyframes ' + thisPinterest.keyframeName + '{50% { opacity: 1 }}';
			ruleText += thisPinterest.pinItCountNode;
			ruleText += '{';
			ruleText += thisPinterest.keyframePrefix + 'animation-duration: 0.001s;';
			ruleText += thisPinterest.keyframePrefix + 'animation-name: ' + thisPinterest.keyframeName +';';
			ruleText += '}';
			styleRules = document.createTextNode(ruleText);
			
			if (styleElem.styleSheet) {
				styleElem.styleSheet.cssText = styleRules.nodeValue;
			} else {
				styleElem.appendChild(styleRules);
			}

			document.getElementsByTagName('script')[0].parentNode.appendChild(styleElem);
		},
    /**
     * @function
     * @description Checks if Pinterest library is loaded. If not, calls SNI.IS.Pinterest.asyncLoad() after window.load
     * @author Matt Heisig
     */
    init: function() {
    		var thisPinterest = SNI.IS.Pinterest;
        // Check if Pinterest library is loaded, bail out if it so
        window.PinIt = window.PinIt || { loaded:false };
        if (window.PinIt.loaded) { return; }
        window.PinIt.loaded = true;

        if (window.attachEvent) {
            window.attachEvent('onload', this.asyncLoad);
        } else {
            window.addEventListener('load', this.asyncLoad, false);
        }
        
        thisPinterest.setCheckForAnimationSupport();
        /* if support 
         * reset the margin-right as if there were no count
         * setup the css keyframe and animation listener 
         * */
        if ( thisPinterest.animationSupport ) {
        	thisPinterest.$pinItEl.css({'margin-right': 14});
        	thisPinterest.setCssListenerCss();
        	thisPinterest.addAnimationListener();
        }
        
    },

    /**
     * @function
     * @description Loads Pinterest JS library asynchronously and inserts it into the document head
     * @author Matt Heisig
     */
    asyncLoad: function() {
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = SNI.IS.Pinterest.scriptSrc;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    },

    /**
     * @description Creates "Pin It" button based on config options object
     * @example <code>
     * SNI.IS.Pinterest.createButton({
     *      element: '#pin-it'
     * });
     * </code>
     * @author Matt Heisig
     * @param {Object} options
     * @param {String} options.element The HTMl element to be transformed into the Pin It button (Required)
     * @param {String} options.url The URL to be pinned (Optional)
     * @param {String} options.imgUrl The URL of the image to be pinned (Optional)
     * <br/><strong>Default:</strong> SNI.Config.Pinterest.defaultImg
     * @param {String} options.desc The description of the item to be pinned (Optional)
     * <br/><strong>Default:</strong> ""
     * @param {String} options.fromMsg Appended to options.desc (Optional)
     * <br/><strong>Default:</strong> " from domain.com"
     * @param {String} options.layout 'vertical' || 'horizontal' || 'no-count' (Optional)
     * <br/><strong>Default:</strong> "horizontal"
     */
    createButton: function(options) {
    		
        var thisPinterest = SNI.IS.Pinterest,
        config = $.extend({
            element: options.element,
            buttonText: options.text || '',
            url: options.url || thisPinterest.getUrl() + "?soc=sharingpinterest",
            imgUrl: options.imgUrl || thisPinterest.getImgUrl() || SNI.Config.Pinterest.defaultImgUrl,
            fromMsg: options.fromMsg || '',
            desc: options.desc || '',
            layout: options.layout || 'horizontal'
        }, options);

        config.desc = thisPinterest.getDesc(config);
        
        if ( !thisPinterest.pinItCountNode ) {
        	thisPinterest.pinItCountNode = config.element + ' span i';
        } 
        
        if(!thisPinterest.$pinItEl) {
        	thisPinterest.$pinItEl = $(config.element);	
        }
        
        var $el = thisPinterest.$pinItEl;
        
        if ($el.is('a')) {
            $el.attr('href', thisPinterest.getPinUrl(config))
               .attr('count-layout', config.layout)
               .addClass('pin-it-button')
               .text(config.buttonText);
        }
        else if ($el.is('li')) {
            var $link = $('<a></a>')
                        .attr('href', thisPinterest.getPinUrl(config))
                        .attr('count-layout', config.layout)
                        .addClass('pin-it-button')
                        .text(config.buttonText);

            $el.append($link);
        }
        //reset margin-right css style
        if ( thisPinterest.animationSupport ) {
        	$el.css({'margin-right': 14});
        }
        thisPinterest.init();
    },
    
    /**
     * @description Updates existing button via the iframe. Primarily used for async implementations (Photo galleries)
     * @example <code>
     * SNI.IS.Pinterest.updateButton({
     *      element: '#pin-it'
     * });
     * </code>
     * @author Matt Heisig
     * @param {Object} options
     * @param {String} options.element The iframe element to be updated (Required)
     * @param {String} options.url The URL to be pinned (Optional)
     * @param {String} options.imgUrl The URL of the image to be pinned (Optional)
     * <br/><strong>Default:</strong> SNI.Config.Pinterest.defaultImg
     * @param {String} options.desc The description of the item to be pinned (Optional)
     * <br/><strong>Default:</strong> ""
     * @param {String} options.fromMsg Appended to options.desc (Optional)
     * <br/><strong>Default:</strong> " from domain.com"
     * @param {String} options.layout 'vertical' || 'horizontal' || 'no-count' (Optional)
     * <br/><strong>Default:</strong> "horizontal"
     */
    updateButton: function(options) {
        if (typeof(window.PinIt) === 'undefined') {
            return;
        }
        
        var thisPinterest = SNI.IS.Pinterest,
        $el = thisPinterest.$pinItEl;
        
        if ( $el.is('li') ) {
        	$el.empty(); 
        	thisPinterest.createButton(options);
        	thisPinterest.asyncLoad();
        } 
        
        if ($el.is('iframe')) {
        	$el.attr('src', thisPinterest.getIframeUrl(config, $el));
        }
        
    },
    /**
     * @description updates the right margin for the pinterest button base on the count.
     */
    updateButtonMargin: function(event) {
    	var thisPinterest = SNI.IS.Pinterest;
    	
    	if ( event.animationName === thisPinterest.keyframeName ) {
      	if (typeof SNI === 'undefined') { return; }
      	if (typeof SNI.IS === 'undefined') { return; }
      	thisPinterest.$pinItEl.css({ 'margin-right' : thisPinterest.$pinItEl.find('span').innerWidth() + 14 });
    	}
    },
    addAnimationListener: function() {
    	if( !!document.addEventListener ) {
    		var updateButtonMargin = SNI.IS.Pinterest.updateButtonMargin;
    		document.addEventListener('animationstart', updateButtonMargin, false); // standard + firefox
    		document.addEventListener('MSAnimationStart', updateButtonMargin, false); // IE
    		document.addEventListener('webkitAnimationStart', updateButtonMargin, false); // Chrome + Safari
    	}
    },
    /**
     * @description Returns a scrubbed URL without parameters, hashes, etc. Pinterest chokes on these.
     */
    getUrl: function() {
        return window.location.protocol + "//" + window.location.hostname + window.location.pathname;
    },

    /**
     * @description Returns image URL from mdManager if it's available
     */
    getImgUrl: function() {
        if (typeof(mdManager) !== 'undefined') {
            return mdManager.getParameterString('ImgUrl');
        } else {
            return false;
        }
    },

    /**
     * @description Returns description with " from domain.com" appended
     * @param {Object} config
     */
    getDesc: function(config) {
        var title = mdManager.getParameterString('Title');

        if (config.desc && config.fromMsg) {
            return config.desc + config.fromMsg; }
        else if (config.desc && !config.fromMsg) {
            return config.desc + SNI.Config.Pinterest.defaultFromMsg; }
        else if (!config.desc && config.fromMsg) {
            return title + config.fromMsg; }
        else if (typeof(mdManager) !== 'undefined') {
            return title + SNI.Config.Pinterest.defaultFromMsg; }
        else {
            return ''; }
    },

    /**
     * @description Returns the pinterest URL based on config parameters
     * @param {Object} config
     */
    getPinUrl: function(config) {
        return 'http://pinterest.com/pin/create/button/' + '?url=' + encodeURIComponent(config.url) + '&media=' + encodeURIComponent(config.imgUrl) + '&description=' + encodeURIComponent(config.desc);
    },

    /**
     * @description Gets the iframe URL and updates the parameters
     * @param {Object} config
     */
    getIframeUrl: function(config, $el) {
        var src = $el.attr('src');
        var baseUrl = src.split("?")[0];

        return baseUrl + '?url=' + config.url + '&media=' + config.imgUrl + '&description=' + config.desc;
    }
};