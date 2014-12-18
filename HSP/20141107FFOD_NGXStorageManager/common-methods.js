// Common methods & shared components

/**
 * Common non-module specific pieces of functionality - Component-specific code always lives within it's
 * own module, don't replicate functionality without a sensible reason and keep things agnostic.
 *
 * I've used some underscore methods which can be removed easily enough, but avoid jQuery dependencies.
 */

(function(doc, Math, undefined){
	"use strict";

	var _NAMESPACE = 'v4',
		_VERSION   = '4.0.2',
		_DEBUG     = 0,

		// cache some common objects
		root = this,
		html = doc.documentElement || doc.getElementsByTagName('html')[0],
		//body = doc.body, // we don't use this currently
		ua   = navigator.userAgent;

	// internal object, safely wrapped TODO: when ECMA6 drops, make this a proxy or something.
	var Common = function(obj) {
		if (obj instanceof Common) {
			return obj;
		}
		else if (!(this instanceof Common)) {
			return new Common(obj);
		}
	};

	// surface object instance
	root[_NAMESPACE] = Common;

	/** Environment */

	// return the platform version
	Common.version = function() {
		return _VERSION;
	};

	// quick and dirty browser checks

	Common.isWebkit = function() {
		return ('webkitRequestAnimationFrame' in root);
	};

	Common.isIE = function() {
		return /MSIE/.test(ua);
	};

	Common.isIEMobile = function() {
		return /IEMobile/.test(ua);
	};

	Common.isSafari = function() {
		return /Safari/.test(ua) && /Apple Computer/.test(navigator.vendor);
	};

	// check for mobile device by orientation.
	// * has a userAgent failover because windows mobile doesn't support window.orientation
	// * over-sized tablets will likely trigger this too but we cannot rely on the resolution to identify a mobile device.
	Common.isMobile = function(){
		return ('orientation' in root || Common.isIEMobile());
	};

    Common.applyUAClasses = function(){
        var uaString = navigator.userAgent,
            uaName="", uaVersion=""

        var uaClasses = []

        if(uaString.indexOf('Chrome')>-1){
            uaName = 'uaChrome'
            uaVersion = uaString.substring(uaString.indexOf('Chrome')+7).trim()
        } else if(uaString.indexOf('iPhone')>-1){
            uaName = 'uaIPhone'
            uaVersion = uaString.substring(uaString.indexOf('iPhone OS')+10).trim().replace("_","-")
        } else if(uaString.indexOf('Safari')>-1){
            uaName = 'uaSafari'
            uaVersion = uaString.substring(uaString.indexOf('Version')+8).trim()
        } else if(uaString.indexOf('Firefox')>-1){
            uaName = 'uaFirefox'
            uaVersion = uaString.substring(uaString.indexOf('Firefox')+8).trim()
        } else if(uaString.indexOf('MSIE')>-1){
            uaVersion = uaString.substring(uaString.indexOf('MSIE')+5).trim()
            uaName = 'uaMSIE'
        } else if(uaString.indexOf('Opera')>-1){
            uaVersion = uaString.substring(uaString.indexOf('Opera')+6).trim()
            uaName = 'uaOpera'
        }


        if(uaVersion.indexOf(" ")>0) uaVersion = uaVersion.substring(0, uaVersion.indexOf(" "));
        if(uaVersion.indexOf(".")>0) uaVersion = uaVersion.substring(0, uaVersion.indexOf("."));

        uaClasses.push(uaName)
        uaClasses.push(uaName+uaVersion)

        $('html').addClass(uaClasses.join(" "))
    };

    Common.isAssetRef = function(ref){
        return (ref.indexOf('ugc:')==0 ||ref.indexOf('asset:')==0 || ref.indexOf('weburl:')==0);
    };

	// return the queryString as an object, if a parameter is supplied return that value
	Common.queryStringObject = function(param) {
		var qs = root.location.search, out = {};
		if (qs) {
			_.each(qs.slice(1).split('&'), function(item){
				var kvp = item.split('=');
				out[kvp[0]] = kvp[1] || undefined;
			});
		}
		return (typeof param === 'string')? out[param]: out;
	};

    Common.updateQueryString = function(newParams,replaceIfExists,fullUrl){
        var _newParams = newParams||{},
            _replace   = (!!replaceIfExists===false)?false:true,
            _qUrl      = fullUrl||document.location.href,
            _qString   = ( _qUrl.indexOf('?')>-1 )?_qUrl.substring(_qUrl.indexOf('?')+1):"",
            _qSObj     = {},
            _newQSObj  = {};

        if(_qString){
            _.each(_qString.split('&'), function(item){
                var kvp = item.split('=');
                _qSObj[kvp[0]] = kvp[1] || undefined;
            });
        }

        if(_replace){
            _.extend(_newQSObj,_qSObj,_newParams);
        } else {
            _.extend(_newQSObj,_newParams,_qSObj);
        }

        return _qUrl.substring(0,_qUrl.indexOf('?'))+"?"+decodeURIComponent($.param(_newQSObj));
    }

	/** Functions */

	// trigger a function asynchronously
	// effectively takes it out of the call stack and executes at the first available moment
	Common.asyncFn = function(fn, context, delay) {
		if (typeof fn === 'function') {
			setTimeout(function() {
				fn.call(context||root);
			}, delay || 20);
		}
	};

    Common.openWindow = function(url, obj) {
        if (url) {
            if (obj) {
                url += '?' + $.param(obj);
            }
            window.open('//' + url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
        return false;
    };

	// shorthand app flow methods (return the function calls because they won't exist yet)

	Common.action = function(ref) {
		return NGX.App.api.action(ref);
	};

	Common.state = function(ref) {
		return NGX.App.api.state(ref);
	};

	Common.submit = function(displayState) {
		return NGX.App.api.campaignEntry(displayState);
	};

	/** Numbers */

	// generate a random number between 1 and [max] (defaults to 1-9999)
	Common.random = function(max) {
		var type = typeof max,
			maxInt = ('undefined' !== type && 'number' !== type)? parseInt(max, 10): max;
		return Math.floor( Math.random() * ( ( maxInt + 1 ) || 9999 ) );
	};

	/** Strings */

	// string trim (added to remove a jQuery dependency)
	Common.trim = (function(nativeTrimSupport){
		// wrap the native trim if present
		if (nativeTrimSupport) return function nativeTrim(str){
			return ('string' === typeof str)? str.trim(str): false;
		};
		// otherwise use the fastest trim we can come up with
		return function fastTrim(str) {
			if ('string' !== typeof str)
				return false;
			var len = str.length,
				checkCode = function(code) {
					var c = str.charCodeAt(code);
					return (c != 32 && c != 10 && c != 13 && c != 9 && c != 12);
				};
			for (var i = 0; i < len; i++) {
				if (checkCode(i)) break;
			}
			for (var j = len - 1; j >= i; j--) {
				if (checkCode(j)) break;
			}
			return str.substring(i, j + 1);
		}
	}('function' === typeof String.prototype.trim));

	// capitalise the first letter of a string
	Common.capitalize = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	// check if a string value matches asset ref structure
	Common.isRef = function(str) {
		if (typeof str === 'string') {
			// first segment must be lowercase letters only, subsequent segments may contain any word character.
			return /[a-z]+(:\w+)+/g.test(str);
		}
		// return undefined if the str value is bad so we can test if we need to
		return undefined;
	};

	// string token replacement. add more if required. call with an object's scope as a fallback, or pass object as a param.
	// cannot be called without a parameter & using "window" as scope, because that would be stupid.
	Common.tokenize = function(str, obj) {
		var match,
			// get the correct context
			context = obj || (this === root? {}: this);
		if (typeof str === 'string') {
			// match any grails-style tokens: ${tokenName}
			while (match = /\$\{(.*?)\}/g.exec(str)) {
				// replace the token with the matching value from the scoped object, using parenthesised substring from returned array & trim . eg. gets 'a' from '${ a }'
				str = str.replace(match[0], context[Common.trim(match[1])] || '');
			}
			return str;
		}
		// don't break callers without type checks on the returned value.
		return '';
	};

	/** Elements **/

	// element type checks

	Common.isCheckbox = function(el) {
		return el.getAttribute('type') === 'checkbox';
	};

	Common.isSelectbox = function(el) {
		return typeof el.selectedIndex !== 'null';
	};

	// return an object containing all attributes beginning with the prefix provided
	Common.getAttrsByPrefix = function(el, prefix) {
		var out = {}, plen, len, attr, i = 0;
		if (!el || !prefix || 'undefined' === typeof el.attributes) {
			return false;
		}
		len  = el.attributes.length;
		plen = prefix.length;
		for (; i<len; i++) {
			attr = el.attributes[i];
			if (attr.name.indexOf(prefix) === 0) {
				out[attr.name.substring(plen)] = attr.value;
			}
		}
		return out;
	};

	// get actual offsetTop of specified element (returns a number)
	Common.offsetTop = function(el) {
		var top = 0;
		if (!_.isElement(el)) {
			return false;
		}
		if (el.offsetParent) {
			do {
				top += el.offsetTop;
			} while (el = el.offsetParent);
		}
		return top;
	};

	// go back up the DOM until we get a matching attribute and return it's value (String or False)
	Common.getParentAttr = function(el, attr) {
		if (el && attr) {
			do {
				if (_.isElement(el) && el.hasAttribute(attr)) {
					return el.getAttribute(attr);
				}
			} while (el = el.parentNode);
		}
		return false;
	};

	// add a script tag (returns an HTMLElement)
	Common.addScriptTag = function(url, id, callback){
		var el, js;
		if (!url || !id || doc.getElementById(id)) {
			return false;
		}
		js = doc.createElement('script');
		js.id    = id;
		js.src   = url;
		js.async = true;
		js.type  = 'text/javascript';
		if (typeof callback === 'function') {
			js.onload = function() { // TODO: add better event listeners here :P
				callback.call(root);
			};
		}
		el = doc.getElementsByTagName('script')[0];
		el.parentNode.insertBefore(js, el);
		return js;
	};

	// Go back up the DOM until we hit the first matching tagName (defaults to FORM)
	Common.getParentByTagName = function(el, tagName) {
		tagName = (tagName)? tagName.toUpperCase(): 'FORM';
		if (el && el.nodeType) {
			do {
				if (el.tagName === tagName) {
					return el;
				}
			} while (el = el.parentNode);
		}
		return false;
	};

	// update element class with contextual [prefix][value] class (return class list)
	// will replace any matched prefix'd item.
	Common.updateClassByPrefix = function(el, prefix, val) {
		var clss = el.getAttribute('class'), out = [];
		// don't let it proceed without these, bad things happen.
		if (!val || !prefix) {
			return false;
		}
		if (clss) {
			_.each(clss.split(' '), function(item) {
				if (item.indexOf(prefix) !== 0 && item !== '') {
					out.push(item);
				}
			});
		}
		out.push(prefix + Common.capitalize(val+''));
		el.setAttribute('class', out.join(' '));
		return out;
	};

	/**
	* Debug mode
	 *
	* enable with ?debug=[Level] url param or by calling Common.debugLevel( [Level] )
	*/

	// debug mode
	Common.debug = (function(isWebkit) {
		var base = 'margin:0;padding:2px 4px;line-height:24px', // base style
			bg = ';background:#',
			br = ';border:1px solid #',
			co = ';color:#',
			style = [
				co+'c09853'+bg+'fcf8e3'+br+'fbeed5', // notification
				co+'b94a48'+bg+'f2dede'+br+'eed3d7', // errors
				co+'468847'+bg+'dff0d8'+br+'d6e9c6', // success
				co+'3a87ad'+bg+'d9edf7'+br+'bce8f1'  // debugging
			],
		// check safari version will support this (function lifted from //github.com/adamschwartz/log)
			safariSupport = function() {
				var m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
				if (!m) {
					return false;
				}
				return 537.38 <= parseInt(m[1], 10) + (parseInt(m[2], 10) / 100);
			},
		// create the style array if there is matching style and the value is a string
			buildArr = function(val, level) {
				var css = style[style.length >= level? level: 0], type = typeof val;
				return (type === 'string' || isNaN(val) === false)? [(type !== 'string'? type+' ': '') + '%c' + val, base + css]: [val];
			},
		// check the requirements are met
			isValidLevel = function(level) {
				return (!level || level <= _DEBUG);
			};
		// don't deliver console.logging for unsupported browsers // TODO: add a log collection for these browsers?
		// IE 8/9 was freaking out here so i've added every possible check to see if console exists
		if (!root.console || 'undefined' === typeof console || 'function' !== typeof console.log) {
			return function noOp() {
				return false;
			};
		}
		// only deliver stylized logging for webkit browsers that support it (firebug also supports this, but we don't look for gecko+firebug atm)
		if (Common.isWebkit() && (!Common.isSafari() || safariSupport())) {
			return function stylizedLogging(val, level) {
				if (isValidLevel(level)) {
					return console.log.apply(console, buildArr(val, level));
				}
			};
		}
		// failover to regular logging
		return function consoleLogging(val, level) {
			if (isValidLevel(level)) {
				return console.log.call(console, val);
			}
		};
	}(Common.isWebkit()));

	// set debug level
	Common.debugLevel = function(level) {
		if (_.isNumber(level)) {
			_DEBUG = level;
			Common.debug('debug level = ' + level);
		}
		return _DEBUG;
	};

	// enable debugging via queryString ?debug=[Number]
	(function(level){
		if (level) {
			Common.debugLevel(parseInt(level, 10));
		}
	}(Common.queryStringObject('debug')));

}).call(window, document, Math);

/**
 * NGX Application Core
 * Backbone Definitions, Routing, Templates, Events
 *
 * NGX.App.init();
 */

/* global $, _, FB, NGX, Insights, Backbone, Handlebars */

/** i18n */
NGX.lang = {
	// perform deep merge with new properties
	extend: function(obj){
		"use strict"; // :/
		$.extend(true, this, obj);
	},
    get: function(stringKey){
        var o = this;
        _key = stringKey.replace(/\[(\w+)\]/g, '.$1');
        _key = _key.replace(/^\./, '');
        var a = _key.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }
};

/** App */
NGX.App = (function(w,d,$,_,undefined){
	"use strict";

	var Components = false,
		App        = false,
		Router     = false,
		Events     = {}, // Backbone.Events
		Templates  = {}, // Handlebars templates

	// App flow objects
		Actions    = false,
		States     = false,

	// Component View override definitions
		viewDef    = {},

	// trackQueue contains component view events
		trackQueue = [],

	// Application state and configuration JSON
		Config     = {},
		State      = {},

		/**
		 * page config
		 */

		conf = {
			// application root view
			// TODO: display object ID is this el's id. use that once we've tidied up a bit.
			app       : '.xPage',
			// selector for pages within the app
			section   : '.xSectionContent',
			// selector for individual components
			component : '.xComponent'
		},

		/**
		 * API methods
		 */

        // remove form content and replace with a gate
        gateApp = function(cfg){
            var _el = (cfg && cfg.hasOwnProperty('el'))?cfg.el:'.xPageInner',
                _val = true,
                _type =(cfg && cfg.hasOwnProperty('type'))?cfg.type:'';

            $('body').addClass('x'+_type+'Gated');
            $(_el).html(NGX.lang.get('form.coppa.title'));

            NGX.overlay.create({
                template: NGX.App.api.getTemplate('inviteModal'),
                type  : ('modal x'+_type+'Gate'),
                content : {
                    title : NGX.lang.get('form.coppa.title'),
                    msg   : NGX.lang.get('form.coppa.msg')
                },
                callback : function(){
                    if(cfg && cfg.hasOwnProperty('store') && cfg.store===true){
                        if(cfg.data){
                            _val = NGX.Util.hashCode(cfg.data);
                        }
                        NGX.StorageManager.push('gate_'+NGX.App.config.tenant,_val,'local');
                    }
                }
            });
        },

		// component view events queue
		processTrackQueue = function(){
			var i = 0, len = trackQueue.length;
			// execute pushed event immediately to prevent more events being added to queue
			trackQueue.push = function(evt) {
				Insights.track(evt);
			};
			// process existing queue
			for (; i<len; i++) {
				Insights.track(trackQueue[i]);
			}
		},

	// extend execution context with NGX.objName then delete to cleanup global
		mergeAndPurge = function(obj) {
			if (this !== w && _.isObject(NGX[obj])) {
				_.extend(this, NGX[obj]);
				delete NGX[obj];
			}
		},

	// something is ready - update App State and trigger Event
		stateReady = function(name){
			State[name+'Ready'] = true;
			Events.trigger(name+':ready');
			v4.debug(name + ' ready', 2);
		},

	// get all templates, add to templates object
		preCompileTemplates = function(targ) {
			_.each((targ || d.body).getElementsByTagName('script'), function(el) {
				if (el.hasAttribute('id') &&
					el.getAttribute('type') === 'text/x-template-handlebars') {
					addTemplate(el.getAttribute('id').replace(/^\W+$/g,''), el.innerHTML);
				}
			});
		},

	// get the current query sting, or supply values to extend the current qs object
		updateQueryString = function(options) {
			var qs = w.location.search, qsObj = {}, qsArr, len, item, i=0;
			if (_.isObject(options)) {
				_.extend(State.query, options);
			}
			else if (qs) {
				qsArr = qs.substring(1).split('&');
				len = qsArr.length;
				for (; i<len; i++) {
					item = qsArr[i].split('=');
					qsObj[item[0]] = (item.length > 1)? item[1]: undefined;
				}
				State.query = qsObj;
			}
			return State.query;
		},

	// get querystring from the State object
		getQuerystring = function() {
			if (State.query) {
				return '?' + $.param(State.query);
			}
			return '';
		},

	// register a new view type
		registerView = function(type, view) {
			viewDef[type] = view;
		},

	// return a Handlebars template
		getTemplate = function(id) {
			return Handlebars.templates['display/'+id] || Templates[id] || false;
		},

	// create a new Handlebars template from a string
		addTemplate = function(el, val) {
			return (el && val && ('function'===typeof Handlebars.compile))? Templates[el] = Handlebars.compile(val): false;
		},

	// return an object containing the current campaign form
		getForm = function() {
			var el   = d.getElementById('xCampaignForm'),
				type = (el)? 'inline': 'hidden',
				form = el || d.getElementById('xHiddenForm');
			return {
				el   : form,
				type : (form)? type: undefined
			};
		},

    // send a message to the parent frame's handler
        messageParent = function(msgObj){
            if(NGX.App.state.framed){
                var getFrameId = function(){
                    if(NGX.context.isPreview){
                        return 'iframe-preview-details';
                    } else {
                        if(NGX.context.displayContainer)
                            return ('ngxFrame'+NGX.context.displayContainer.id);
                    }
                };

                var _theMsg = {
                    action:'',
                    event :'',
                    id:getFrameId(),
                    payload:{}
                }
                _.extend(_theMsg,msgObj);
                var msgString = '_NGX_'+JSON.stringify(_theMsg);
                v4.debug('Messaging Parent with: "' + msgString + '"', 6);
                return window.parent.postMessage(msgString,'*');
            }
        },

    // resize parent iframe
        resizeParent = function(config){
            if(!NGX.context.isFB){
                messageParent({
                    action:(config&&config.mode)?config.mode:'resize',
                    event : 'frame:resize',
                    payload: {
                        height:$('body').outerHeight(true)
                    }
                });
            }
        },

    // scroll top frame
        scrollTo = function(x,y){
            if(NGX.App.state.framed){
                if(NGX.context.isFB){
                    FB.Canvas.scrollTo(x,y);
                } else {
                    messageParent({action:'scrollTo',payload:{left:x,top:y}});
                }
            } else {
                window.scrollTo(x,y);
            }
        },

	// add a hidden field to the campaign form
		setFormField = function(id, val, type) {
			var el, form = getForm();
			// check there is an id and a form
			if (typeof id === 'string' && form.el) {
				// check if field exists
				el = d.getElementById(id);
				if (!el) {
					// otherwise create it
					el = d.createElement('input');
					el.id = id;
					el.setAttribute('name',id);
					el.type = (typeof type === 'string')? type: 'hidden';
					form.el.appendChild(el);
				}
				// set field value
				el.value = (val)? val.toString(): '';
			}
			return el;
		},

	// return campaign metadata in the format you wanted
		getMetadata = function(prop) {
			var obj = Config.extendedProperties, out;
			if (!obj) {
				return false;
			}
			// return the requested item
			if (typeof prop === 'string') {
				return obj[prop];
			}
			// return an array of values as an object containing those
			if (_.isArray(prop)) {
				out = {};
				_.each(prop, function(item) {
					out[item] = obj[item];
				});
				return out;
			}
			// otherwise return the whole object
			return obj;
		},

    getComponents = function() {
        _.each($(conf.component), function(item) {
            if (!item.hasAttribute('data-registered')) {
                Components.add(new Component({
                    targ : '#'+item.id,
                    type : item.getAttribute('data-componenttype')
                }));
                item.setAttribute('data-registered', 'true');
            }
        });
    },

	// main CTA
		appEntry = function(stateName) {
			var form = getForm();
			if (form.el) {
				switch (form.type) {
					case 'inline':
						// if a target state is supplied use that, otherwise get the parent state of the inline form.
						NGX.App.api.state( stateName || v4.getParentAttr( form.el, 'data-statename' ) );
						break;
					case 'hidden':
						submitCampaignObjectForm(form.el);
				}
			}
		},

		/**
		 * Generic component structure
		 */

	// generic component model (components always use this model - use this for standard functionality)
		Component = Backbone.Model.extend({
			defaults: {},
			initialize: function() {
				// use target element id as the primary key
				this.id = this.get('targ').substring(1);
				// track this component init
				Events.trigger('init:' + this.id, this);
				// add events to queue to process on page ready
				trackQueue.push('view:' + this.attributes.type);
				// debug log the component init
				v4.debug('Component ' + this.id + ' initialised', 3);
			}
		}),

	// generic component collection
		ComponentList = Backbone.Collection.extend({
			model: Component
		}),

	// generic component view
		ComponentView = Backbone.View.extend({
			// we don't trigger a render method on these non-type components because they arrive populated
		}),

		/**
		 * Application Structure
		 */

		AppModel = Backbone.Model.extend({
			// this is populated elsewhere
		}),

        AppView = Backbone.View.extend({
			el: conf.app,
			initialize: function(){
				this.listenTo(Components, 'add', this.addComponent);
				this.model.set('sections', this.$(conf.section));
				NGX.App.api.getComponents();
			},
			// create new component model for each matching element

			// if viewDefs[data-componenttype] use that, otherwise use the ComponentView default
			addComponent: function(model) {
				var obj = {
						model   : model,
						el      : (model.has('targ'))? $(model.get('targ')): false,
						tagName : 'section'
					},
					Fn = viewDef[model.get('type')];
				if (typeof Fn === 'function') {
					return new Fn(obj).render();
				} else {
					return new ComponentView(obj);
				}
			}
		}),

		/**
		 * Routes
		 */

		AppRouter = Backbone.Router.extend({
			initialize: function() {
				this.createStateRoutes.call(this, flowJSON.states);
				stateReady('router');
			},
			createStateRoutes: function(statesObj) {
				// configure any flow routes on this page
                _.each(statesObj, function(item){
					var route = item.route;
					if (route) {
						// build route for this state
						this.route(route + '(/:id)', route, function(id){
							// the optional is parameter is passed in as ID / TODO: do something with it :)
							// console.log(id);
							// state change triggers the programatic route, then updates the URL
							this.stateChange(route);
						}, this);
						// if this item is the default route trigger navigate on landing
						if (!this.defaultState && item.defaultState) {
							this.defaultState = route;
						}
						// add to the availableStates in NGX.context, for reference.
						NGX.context.availableStates = NGX.context.availableStates || [];
						NGX.context.availableStates.push(route);
					}
				}, this);
                // configure default state route & optionally prevent Facebook's url modification from breaking routing
                if(!this.defaultState && statesObj && statesObj[0]) this.defaultState = statesObj[0].route;

				if ('undefined' !== typeof this.defaultState) {
					// prevent FB from mangling the URL with params being appended after a hash
					this.route('(_=_)', this.defaultState, function(){
						// TODO: extract the params and populate our querystring object, rather than just scrubbing them.
						Backbone.history.navigate(this.defaultState + getQuerystring(), { trigger:true, replace:false });
					}, this);
				}
			},
			stateChange: function(route) {
				var stateObj = States.get({ route: route });
				if (stateObj) {
					Actions.byRef('state:' + stateObj.name, stateObj);
				}
			}
		}),

		/**
		 * App Flow Init
		 */

		appFlowInit = function() {

			// Start the campaign flow component and create State and Action classes
			var appFlow = NGX.appFlow.init();

			// States and Actions defined here to give the Router access
			States  = appFlow.state;
			Actions = appFlow.action;

			// expose API methods - this runs after the App obj is creates & also because of the scoping
			NGX.App.api.register  = appFlow.register;
			NGX.App.api.remove    = appFlow.remove;
			NGX.App.api.action    = Actions.trigger;
			NGX.App.api.state     = function(routeName) {
				return Actions.trigger('route:'+routeName);
			};
			NGX.App.api.statePrev = NGX.appFlow.prev;
			NGX.App.api.actionClick = function(e){
				var attObj  = v4.getAttrsByPrefix(this, 'data-ngx-'),
					eClass = this.getAttribute('class');
				if (attObj.action) {
					e.preventDefault();
					if (!eClass||(eClass && !/\bcurrent\b/.test(eClass))) {
						NGX.App.api.action( attObj.action, attObj );
					}
				}
			};

			// update public & internal app states with data from App Flow
			Events.on('state', function(stateName, stateObj){
				State.name = stateName;
				App.model.set('state', stateObj);
                NGX.App.api.resizeParent();
			});
		},

		/**
		 *  NGX Application start
		 */

		AppInit = function() {

			// import default config options and cleanup after ourselves
			mergeAndPurge.call(Config, 'config');
			mergeAndPurge.call(State,  'state');

			// grab the query string & store it
			updateQueryString();
			// add backbone event handler to Events
			_.extend(Events, Backbone.Events);

            // build component collection before document ready so the app:ready extends take effect.
			NGX.App.Components = Components = new ComponentList();

            // Do this client side
            v4.applyUAClasses();

            // this needs to happen before we build the views, but speeds up subsequent usage.
			preCompileTemplates.call(w, d.body);

			// invite/share on init
			if (Config.shareOnInit) {
				Events.on('fb:ready', function(){
					switch (Config.shareOnInitMode) {
						case "invite":
							NGX.Virality.inviteFBFriends();
							break;
						case "share":
							NGX.Virality.facebookShare(Config.sharing);
							break;
						default:
							// do nothing
							break;
					}
				});
			}

			/** post-load events */

			$(function(){

				// get the NGX user ID if it's present
				State.currentUser.id = NGX.Util.getRefCookie({ c_name : 'ngx' });
                NGX.App.Events.on('all',function(e){
                    if(v4.queryStringObject('debug')>2){ v4.debug('Event triggered: ['+e+']'); }
                    NGX.App.api.messageParent({
                        action:'event',
                        event : e
                    });
                });

				// build the main application view (delayed until we have an FB id)
				App = new AppView({
					model: new AppModel(Config.extendedProperties)
				});

				// the app is now initialised
				// IMPORTANT! to catch a component model before it is fully initialised, use the 'init:moduleId' event, rather than appReady
				stateReady('app');

				// setup the router
				Router = new AppRouter();

				// start the campaign flow & create API methods
				appFlowInit();

				// start Backbone History - Handles pushState
				Backbone.history = Backbone.history || new Backbone.History({});
				Backbone.history.start({
					root      : NGX.context.basePath,
					pushState : (typeof history.pushState !== 'undefined')
				});

				// bind ngx actions
				$(conf.app).on('click', '[data-ngx-action]', NGX.App.api.actionClick);

				// page has loaded
				stateReady('page');

                // process the insights events after page:ready
				processTrackQueue();


                NGX.App.api.resizeParent();
			});

		};

	/**
	 * FB Application start
	 */

	// post-FB login behaviour
	window.fbAsyncInit = function() {

		// facebook API init
		FB.init({
			appId		: NGX.context.fb.app.id,
			status		: true,
			channelUrl  : NGX.context.displayUrl + '/xui/channelUrl.gsp',
			cookie		: true,
			xfbml		: true,
			oauth		: true
		});

		if (NGX.context.isFB === true) {
			// scale the canvas if we're in FB
			NGX.Util.resizeCanvas();
			// reset the canvas scroll position
			FB.Canvas.scrollTo(0,0);
		}

		// login/auth facebook
		NGX.Util.fbLogin(function(response){
			State.fbLoaded = true;
			State.currentUser.userSession = response;
			if (response.authResponse && response.status === 'connected' ) {
				State.currentUser.fbid        = response.authResponse.userID;
				State.currentUser.accessToken = response.authResponse.accessToken;
			}
			if (response.status === 'connected') {
				FB.api('/me', function(response) {
					// store the user profile in the app state (there may not be a form so we should store this somewhere)
					State.currentUser.userProfile = response;
					// if there is a form, try to populate the hidden fields
					var form = d.getElementById('xCampaignForm');
					if (!form) {
						form = d.getElementById('xHiddenForm');
					}
					if (form) {
						populateFormData(form, response);
					}
					stateReady('fb');
				});
			}
			else {
				// if the auth doesn't work for whatever reason, attempt to auth on submit
				if (response.error) {
					Config.permissionRequest.timing = 'submit';
				}
				stateReady('fb');
			}
			// TODO: This is not the ideal way to handle this.
			if (State.currentUser.fbid) {
				var home = d.getElementById('Header_xModule_header'), button, href;
				if (home) {
					button = $('.xCTA a', home);
					href   = button.attr('href');
					if (href) {
						button.attr('href', href + (((href.indexOf('?') > -1)? '&': '?') + 'fbid=' + State.currentUser.fbid));
					}
				}
			}
		}, { timing: 'init' });
	};

	/**
	 * Expose API functions
	 */

	return {
		init  : AppInit,
		// client API
		api : {
			/**
			 * API methods - methods may be set elsewhere, if the methods are specific to a module look in it's js file.
			 */
			// echo params (use to test action refs)
			echo : function() {
				if (console && typeof console.log === "function") {
					console.log(arguments);
				}
			},
			// register a component view
			registerView : registerView,
			// add a string as new handlebars template
			addTemplate  : addTemplate,
			// return a handlebars template function
			getTemplate  : getTemplate,
			// return object containing campaign form
            getComponents: getComponents,
            // return object containing campaign form
			getForm      : getForm,
			// add hidden field to the campaign form
			setFormField : setFormField,
			// return campaign metadata (individual value, custom object based on array of keys, or full object)
			getMetadata : getMetadata,
			// querystring obj as string
            getQuerystring: getQuerystring,
			// send message to parent frame
            messageParent: messageParent,
            // resize the iframe
            resizeParent: resizeParent,
            // scroll the top frame
            scrollTo: scrollTo,
            // apply gate
            gate: gateApp,
			// share page via FB
			facebookShare : function(conf) {
				var sharingOpt = $.extend(true, NGX.App.config.sharing, conf);
				if (sharingOpt) {
					NGX.Virality.facebookShare(sharingOpt);
				}
			},
			// invite friends to page via FB
			// TODO: we have multiple ways of performing an invite at the moment. Refactor down to one method.
			facebookInvite : function(){
				// Inline invite method (does not use NGX.Util.fbLogin, which is tied to the config.timing parameter
				if (FB) {
					FB.login(function(response) {
						NGX.Virality.inviteFBDialog(response);
					}, { scope: "" });
				}
				else {
					throw new Error('Facebook API unavailable');
				}
			},
			// campaign form submission
			campaignEntry : appEntry
		},
		Events : Events,
		config : Config,
		state  : State
	};

}(this,document,$,_));

NGX.App.init();
/**
 syntax

 NGX.game.register({
	 id: 'abcdefg',
	 el: 'xSectionDetails_xModuleGame',
	 shareMessage : 'CUSTOM GAME Share message',
	 inviteMessage : 'CUSTOM GAME Invite Message'
 });

 NGX.App.api.action(...

	 game:get:[gameId]                  returns the game object
	 game:submit:[gameId]               submit the game score (returns true/false if it's going to try to add anything)
	 game:score:[gameId]:[newValue]     returns the current score, newValue is an optional parameter

 not yet implemented

    game:asset:[gameId]:[assetId]       returns asset object (will contain Object.type, Object.size, Object.path

 NGX.App.Events.on(...

	 game:[gameId]:init
	 game:[gameId]:active
	 game:[gameId]:inactive

*/

//test code
/*
NGX.asset = (function(refDef){

	var isAsset = function(ref) {
			return (ref.indexOf('asset:') === 0);
		},

		getAsArray = function(ref) {
			var arr = false;
			if (isAsset(ref)) {
				arr = ref.split(':');
				arr.shift();
			}
			return arr;
		},

		getAsObj = function(ref) {
			var arr = getAsArray(ref), i = 0, len, obj = {}, d;
			if (arr && arr.length >= 1) {
				// get asset ref type
				obj.type = arr[0];
				// get asset ref definition
				d = refDef[obj.type];
				if (d) {
					// remove the type
					arr.shift();
					// get the new length
					len = d.length;
					// populate object from definition
					for (; i<len; i++) {
						obj[d[i]] = arr[i];
					}
				}
			}
			return obj;
		};

	return {
		asObj: getAsObj
	};

}({
	"image": ['size','path']
}));

*/

//NGX.asset.asObj('asset:image:10x10:/path/path/blah/stuff.jpg');



NGX.game = (function() {
	"use strict";

	var Cache = {}, Game, getGameById, getGameContent, scoreSubmit, scoreSet, fbShare, fbInvite;

	/** game class */

	Game = function(o) {
		// merge extended properties & game registration metadata
		_.extend(this, o, NGX.App.config.extendedProperties);
		// location is the parent state
		this.parentState = v4.getParentAttr( o.el, 'data-statename' );
		// pull content
		$.ajax({
			url     : '/display/page/entries/'+NGX.context.apikey+'/'+NGX.App.config.id+'.json',
			context : this
		}).success(function(response){
			this.content = response;
			NGX.App.Events.trigger('game:'+this.id+':ready', this);
		});
		// event binds
		NGX.App.Events.on('state', (function(_self){
			return function scoped(name) {
				// get current active state
				var isActive = (name === _self.parentState);
				// don't duplicate activity events
				if (_self.active !== isActive) {
					// set active state
					_self.active = isActive;
					// trigger 'game:name:active/pause' event
					NGX.App.Events.trigger('game:'+_self.id+':'+(_self.active? 'active': 'inactive'), _self);
				}
			};
		}(this)));
	};

	/** Flow api.game methods **/

	getGameById = function(id) {
		return Cache[id] || false;
	};

	getGameContent = function(id, assetId) {
		var g = getGameById(id);
		if (g) {
			if (typeof assetId == "string" && _.isObject(g.content)) {
				return _.where(g.content, { id: assetId });
			}
			return g.content;
		}
		return false;
	};

	// returns true if it's trying to submit, but technically you shouldn't need to check for anything but false
	scoreSubmit = function(id) {
		var g = getGameById(id);
		if (g) {
			if (NGX.App.api.setFormField('ngxQuizScore', g.score)) {
				v4.submit();
				return true;
			}
		}
		return false;
	};

	// set & return score, if no score is passed will just return current score
	scoreSet = function(id, score) {
		var g = getGameById(id);
		if (g) {
			if (score) {
				g.score = score;
			}
			return g.score;
		}
		return false;
	};

	// TODO: use the values passed in. for some reason it's ignoring them atm
	fbShare = function(id) {
		var g = getGameById(id), opts;
		if (g) {
			if (g.shareMessage) {
				opts = {
					name : v4.tokenize(g.shareMessage, g)
				};
			}
			NGX.App.api.facebookShare(opts);
			return true;
		}
		return false;
	};

	fbInvite = function(id) {
		var g = getGameById(id), opts;
		if (g) {
			if (g.inviteMessage) {
				opts = {
					inviteDialog: {
						message : v4.tokenize(g.inviteMessage, g)
					}
				};
			}
			// TODO: our implementation of the invites is slightly complex at present, we should standardise and use our App.api abstration
			NGX.Virality.inviteFBFriends(opts);
			return true;
		}
		return false;
	};

	/** setup */

	// populate NGX Api (called via appflow)
	NGX.App.api.game = {
		get     : getGameById,
		submit  : scoreSubmit,
		score   : scoreSet,
		share   : fbShare,
		invite  : fbInvite,
		content : getGameContent
	};

	/** init **/

	var init = function(gameConfig) {
		var g = new Game(gameConfig);
		Cache[g.id] = g;
		NGX.App.Events.trigger('game:' + g.id + ':init', g);
		return g;
	};

	return {
		register : init
	}

}());

/**
 * NGX Application Flow
 * States, Actions, Action Methods
 *
 * NGX.appFlow.init();
 *
 * returns an Object with the States and Actions
 */

/* global NGX, $, console, _, Backbone */

/**

 Flow specific events. these are handled within appflow to allow beforeX + blocking.

 NGX.App.api.register(String event, Function, [Bool blocking]);

 If optional param blocking is true, the callback is passed as a argument
 to the function rather than executed immediately. This only applies to
 beforeX events since the others are triggered after anyway.

 'beforeState:entry'
 'beforeAction:entry'

 'onState:entry'
 'onAction:entry'

 State events. These are broadcast globally.

 NGX.App.Events.on(String event, Function)

 'state'        => String, state name
 'state:name'   => Object, state

 'tab:show'     => Array, components on visible section
 'tab:hide'     => Array, components on section being hidden

 'action'       => String, caller action
 'action:name'  => Undefined, returns the output of the called function

 */

;NGX.appFlow = (function(root, d, $, json) {
	"use strict";

	var body = d.body, _state = false, _action = false, _prev = false, _current = false, stateInit = {}, actionInit = {}, actionJSON = json.actions;

	/** State Object cache */

	// protect the app flow from tampering TODO: add methods to update this object via the api?
	var stateCache = (function(raw) {
		var out = {}, item, i = 0, len;
		if (raw) {
			len = raw.length;
			for (; i<len; i++) {
				item = raw[i];
				if (item.name) {
					out[item.name] = item;
				}
			}
		}
		return out;
	}(json.states));

	/** Utility functions */

	// return action ref as an Object
	var	getRefObj = function(refStr) {
			var refArr = refStr.split(':');
			return {
				method : refArr[0],
				action : refArr[1],
				target : refArr[2],
				// pass any additional params as a string array
				// TODO: New sharing moved away from using a params array to .apply() to functions, should consider replacing this in exec and game methods to ensure consistency.
				params : (function(a){
					var out = [],
						len = a.length,
						i = 2;
					if (len >= i) {
						for (; i<len; i++) {
							if (a[i].length > 0) {
								out.push(a[i]+'');
							}
						}
					}
					return out;
				}(refArr))
			};
		},

    // Check eligibility to view this page
        canSeeCampaign = function(){
            // TODO: Check if user is gated from a particular campaign
            //NGX.StorageManager.get('gate_'+NGX.App.config.tenant)) NGX.App.api.gate();
        },

	// screen position is not called for overlays
		screenPosition = function() {
			// resize the FB frame. this is a bit of a hack.
			if (NGX.context.isFB === true && 'undefined' !== typeof FB) {
				NGX.Util.resizeCanvas();
			}
			// TODO: add code to handle scroll-to the now visible state panels top?
		},

		/** AppFlow specific items */

	// trigger componentView method for components on this tab
		componentsStatus = function(status, el) {
			$('[data-componenttype]', el).each(function(i, item){
				if (item.id) {
					// update 'viewed' attribute in component model
					NGX.App.Components.get(item.id).set('viewed', true);
				}
			});
		},

	// update any nav items for the current state
		updateNav = function() {
			var attr = 'data-ngx-action',
				update = function() {
					var data = this.getAttribute(attr);
					$(this)[(data && data.indexOf(':'+_current.route) > -1)? 'addClass': 'removeClass']('current');
				};
			// TODO: remove these bits of jQuery? it's kinda slow
			$('nav')
				.find('a['+attr+']')
				.each(update);
		},

	// overlay sections are rendered differently
		showTabAsOverlay = function(state) {
            NGX.App.api.messageParent({action:"getPageInfo"});
			var el = d.getElementById('xSection' + v4.capitalize(state));
			if (el) {
				var $el = $(el),
					$content = $('.xSectionInner',$el);

				NGX.overlay.create({
					content: $content.html(),
					type : 'state'
				});

				// update the xState[stateName] body class
				v4.updateClassByPrefix(body, 'xState', state);
				// set 'show' model value of components on incoming panel
				componentsStatus("show", el);
				// return the active section
				return el;

			}
		},

	// show a tab
		showTab = function(state) {
			var rxA = /\bxSectionContent\b/,
			//rxB = /\bxSectionActive\b/,
				el = d.getElementById('xSection' + v4.capitalize(state)),
				n, nClass, nClassArr = ['xHidden', 'xSectionActive'];
			if (el && el.parentNode) {
				n = el.parentNode.firstChild;
				// loop through siblings
				for (; n; n = n.nextSibling) {
					// its an html node with a class
					if (n.nodeType === 1 && n.hasAttribute('class')) {
						// not using n.className to support IE8 quirks mode
						nClass = n.getAttribute('class');
						// is a section
						if ((rxA).test(nClass)) {
							// is currently active
							// TODO: replace the jQuery selector here with DOM JS
							$(n)
								.addClass(nClassArr[(n !== el)? 0: 1])
								.removeClass(nClassArr[(n !== el)? 1: 0] + ' xOverlay');
						}
					}
				}
				// update the navigate panel hi-light
				updateNav();
				// update the state-stateName body class
				v4.updateClassByPrefix(body, 'xState', state);
				// set 'show' model value of components on incoming panel
				componentsStatus("show", el);
	            // resize the iframe to fit the content
				screenPosition();
				// return the active panel
				return el;
			}
			// no panel matching that state
			return false;
		};

	/** States */

	var State = function(){

		// state invocation function
		var stateAction = function(newState) {
				var action = newState.action;
				if (action && action.indexOf('state') !== 0) {
					// action caller is state:stateRoute, full action name is action:state:stateRoute
					return _action.trigger(action, _current);
					//TODO: no action event is triggered for state actions, since they're the product of a state. this would .trigger('action:state:stateRoute');
					//return _action.trigger(action, _current, 'state:'+_current.route);
				}
				v4.debug('Unable to execute State action "' + action + '"', 1);
				return true; // we have entered a state at this point, return true even if there is no action
			},

		// trigger a state
			stateInvoke = function(name) {
				var newState = stateCache[name],
					init     = stateInit[name],
					doState  = function() {
						_prev    = _current;
						_current = newState;
						// trigger pseudo-asyncronously to prevent .on('state') event blocking stateAction()
						v4.asyncFn(function(){
							NGX.App.Events.trigger('state', newState.name, newState);
                            NGX.App.Events.trigger('navigate:page', newState.name, newState);
							NGX.App.Events.trigger('state:' + newState.name, newState);
							NGX.App.Events.trigger('navigate:page:' + newState.name, newState);
                            NGX.App.api.messageParent({action:'event',event:'state',payload:{name:newState.name}});
						});
						v4.debug('entered State "' + newState.name + '", action is "' + newState.action + '"', 2);
						return stateAction(newState);
					};
				// TODO: do we need more state object validation here?
				if (newState) {
					// an init function exists
					if (init) {
						// if async pass the action function
						if (init.async === true) {
							return init.fn(doState);
						}
						// otherwise just do it now
						init.fn();
					}
					return doState();
				}
				v4.debug('unable to change state "' + name + '"', 1);
				return false; // we have not entered a state
			},

		// remove init function
			removeStateInit = function(name) {
				if (stateInit[name]) {
					delete stateInit[name];
					v4.debug('State event "beforeState:'+name+'" removed', 2);
					return true;
				}
				return false;
			},

		// create an init function for an action
			addStateInit = function(name, fn, isAsync) {
				var out = false;
				if (name && typeof fn === 'function') {
					out = stateInit[name] = {
						async : isAsync || false,
						fn    : fn
					};
					v4.debug('State event "'+name+'" created', 2);
				}
				return out;
			};

		return {
			get : function(obj) {
				return _.findWhere(json.states, obj);
			},
			invoke   : stateInvoke,
			register : addStateInit,
			remove   : removeStateInit
		};

	};

	/** Actions */

	var Action = function(){

		// action behaviours
		var	method = {
				// invoke a function
				exec: function(obj){
					var fn = NGX.App.api[obj.action];
					if (typeof fn === "function") {
						// TODO: new sharing method uses an object passed, rather than an array .apply() - consider refactoring to bring into line
						return fn.apply(root, obj.params);
					}
					v4.debug('API method "' + obj.action + '" not found', 1);
					return false;
				},
				// game API methods
				game: function(obj){
					var fn, gameAPI = NGX.App.api.game;
					if (typeof gameAPI === 'object') {
						// TODO: tighten this logic up
						fn = NGX.App.api.game[obj.action];
						if (typeof fn === "function") {
							// TODO: new sharing method uses an object passed, rather than an array .apply() - consider refactoring to bring into line
							return fn.apply(root, obj.params);
						}
					}
					return false;
				},
				// state display methods
				display: function(obj, params){
					switch (obj.action) {
						case 'dialog':
							return NGX.overlay.create({
								content : d.getElementById('xSection' + v4.capitalize(obj.target)).innerHTML,
								onclose : function() {
									if (_prev) {
										NGX.appFlow.prev();
									}
								}
							});
						case 'campaign':
						case 'page':
							// if the state style definition is overlay
							if (params && params.style === "overlay") {
								return showTabAsOverlay(obj.target);
							}
							// otherwise call showTab
							return showTab(obj.target);
                        case 'promo':
                            v4.debug("Display Promo: "+obj.target,5);
                            NGX.overlay.create({
                                url:'/display/promotion/ajaxOverlay?id='+obj.target,
                                callback: function(){
                                    $('.xComponent','.xOverlayInner').on('click','.xContainer .xTriggerOverlay',initOverlayHandler);
                                    NGX.App.api.getComponents();
                                }
                            });
                            Insights.track('view:promo',{p:obj.target});
                            break;
                        case 'item':
                            v4.debug("Display Item: "+obj.target,5);
                            popOverlayForDisplayItem(obj.target);
                            break;
					}
					return false;
				},
				// sharing functions
				share: function(obj, params) {
					var shareContext = NGX.App.api.share[obj.action], fn;
					if (shareContext) {
						fn = shareContext[obj.target];
						if (typeof fn === "function") {
                            v4.debug(obj.target + ' ' + obj.action + ' share prompt',2);
                            NGX.App.Events.trigger('action:share');
							return fn.call(root, params);
						}
					}
					return false;
				},
				// trigger a route to a state
				route: function(obj, params){
					// if a target id is supplied, add it to the route
					var route = obj.action + (obj.target? '/'+obj.target: ''),
                        theQS = NGX.App.api.getQuerystring();

					v4.debug('routing to "' + route + '"', 2);
					// actual routing event
					Backbone.history.navigate(route, {
						trigger:true,
						replace:false
					});
                    Backbone.history.navigate('ngxtemp', {trigger:false,replace:false});  // TODO: [SG] Can we use a (?*qs splat here?)
					// update URL with query string
					Backbone.history.navigate(route + theQS, {
						replace:true
					});
					return route;
				},
                // trigger network actions
                network : function(obj, params){
                    switch(obj.action){
                        case "twitter":
                            var url = "twitter.com/intent/"+((obj.target=="reply")?"tweet":obj.target),
                                twParams = {};
                            twParams[obj.target=="reply"?'in_reply_to':'tweet_id']=obj.params[1];

                            v4.openWindow(url,twParams);
                            break;
                    }

                    Insights.track(obj.target+":contentitem",{'action':obj.target,ci:obj.params[2],target:obj.action});
                },
				// update the app state
				state: function(obj){
					// prevent double state entry
					if (_current && _current.route === obj.action) {
						v4.debug('Cannot re-trigger current active state "' + obj.action + '"', 1);
						return false;
					}
					return _state.invoke(obj.action);
				}
			},

		// get action object
			getActionObjByName = function(name) {
				var obj = actionJSON[name];
				return (obj && obj.action)? obj: false;
			},

		// get an action ref from a named action
			getActionRefByName = function(name) {
				var obj;
				if (name && !v4.isRef(name)) {
					obj = actionJSON[name];
					if (obj && obj.action) {
						return obj.action; // return the action ref string
					}
					return false; // nothing matches
				}
				return name; // treat as action ref
			},

		// trigger an action based on its action ref.
		// caller is an optional param that contains the named action that triggered the action by ref.
			triggerByRef = function(refStr, params, caller) {
				v4.debug('triggerByRef = ' + refStr, 3);
				var obj  = getRefObj(refStr),
					fn   = method[obj.method],
					init = actionInit[caller],
					out  = function() {
						var fnOut = fn(obj, params);
						// if an onAction tracking event is passed in trigger it now // TODO: this used to depend on 'caller' being present, but surely that sucks?
						// ensure this happens after the delayed state events (and its own callback) are triggered so events always execute in order, see stateInvoke()
						v4.asyncFn(function(){
							// TODO: caller is a product of the custom 'before' events, refStr is a regular ref string.
							var str = (caller || refStr);
							NGX.App.Events.trigger('action', str);
							NGX.App.Events.trigger('action:'+str, fnOut); // TODO: there's a reason we pass fnOut but i can't remember what it was! put a comment here when i have time to chase it through.
						}.bind(this));
						return fnOut;
					};
				if (typeof fn === 'function') {
					// an init function exists
					if (init && caller) {
						// if async pass the action function
						if (init.async === true) {
							return init.fn(out);
						}
						// otherwise just do it now
						init.fn();
					}
					return out();
				}
				v4.debug('Method "'+obj.method+'" is not a function', 1);
				return false;
			},

		// trigger a named action
			triggerByName = function(name) {
				v4.debug('triggerByName = ' + name, 3);
				var obj = getActionObjByName(name);
				if (obj) {
					return triggerByRef(obj.action, obj, name);
				}
				v4.debug('Action "'+name+'" not found', 1);
				return false;
			},

		/**
		 * triggerByValue is the action ref entry point.
		 *
		 * Object 'params' will either be passed in from the State handler and will contain the State definition,
		 * otherwise it will be constructed from the any html attributes prefixed with 'data-ngx-' from the clicked
		 * element. (handled in ui.core.js)
		 *
		 * String 'caller' is used to track which State triggered an action, and will generally only be provided by
		 * the internal calls to this method. Use it at your own peril :P
         */

			triggerByValue = function(action, params, caller) {
				v4.debug('triggerByValue = ' + action, 3);
				if (action) {
					if (v4.isRef(action)) {
						return triggerByRef(action, params, caller);
					}
					return triggerByName(action);
				}
				v4.debug('No action specified', 1);
				return false;
			},

		// create an init function for an action
			addActionInit = function(name, fn, isAsync) {
				var out = false;
				if (typeof fn === 'function') {
					if (name) {
						out = actionInit[name] = {
							async : isAsync || false,
							fn    : fn
						};
						v4.debug('Action event "beforeAction:'+name+'" created', 2);
					}
				}
				return out;
			},

		// remove init function
			removeActionInit = function(name) {
				if (actionInit[name]) {
					delete actionInit[name];
					v4.debug('Action event "beforeAction:'+name+'" removed', 2);
					return true;
				}
				return false;
			},

		// add new action (won't replace existing values unless optional overwrite === true)
			registerAction = function(name, obj, overwrite) {
				var out = false;
				if (!actionJSON[name] || overwrite === true) {
					if (typeof obj === 'object' && obj.action) {
						out = actionJSON[name] = obj;
						v4.debug('Action "'+name+'" registered', 2);
					}
				}
				return out;
			};

		return {
			byName     : triggerByName,
			byRef      : triggerByRef,
			trigger    : triggerByValue,
			getAction  : getActionObjByName,
			getRef     : getActionRefByName,
			register   : addActionInit,
			remove     : removeActionInit,
			regAction  : registerAction
		};

	};

	return {
		// current state name is available from NGX.App.state.name, the object is stored in App View's model
		/*currentState : function() {
		 return _current;
		 },
		 prevState : function() {
		 return _prev;
		 },*/
		// attach a new appflow event
		registerEvent : function(ref, fn, optional) {
			var arr, name, type;
			if (v4.isRef(ref)) {
				arr  = ref.split(':');
				type = arr[0];
				name = arr[1];
				// check there is a name and a valid function
				if (!name || typeof fn !== 'function') {
					return false;
				}
				// create the right type of onX event, or beforeX pseudo-event
				switch (type) {
					case 'beforeAction' :
						return _action.register(name, fn, optional);
					case 'beforeState'  :
						return _state.register(name, fn, optional);
					case 'onAction' :
					case 'onState'  :
						return NGX.App.Events.on(type.substr(2).toLowerCase()+':'+name, fn);
				}
			}
			v4.debug('unrecognised action ref syntax "' + ref + '"', 1);
			return false;
		},
		// remove an appflow event
		removeEvent : function(ref) {
			var arr, name, type;
			if (v4.isRef(ref)) {
				arr  = ref.split(':');
				type = arr[0];
				name = arr[1];
				switch (type) {
					case 'beforeAction' :
						return _action.register(name);
					case 'beforeState'  :
						return _state.register(name);
					case 'onAction' :
					case 'onState'  :
						return NGX.App.Events.off(type.substr(2).toLowerCase()+':'+name);
				}
			}
			v4.debug('unrecognised action ref syntax "' + ref + '"', 1);
			return false;
		},
		// revert the app to the previous state (used by 'close' buttons on state overlays)
		prev : function() {
			// failover is the first state in the object, as no defaultState may be present // TODO: first try to failover to default state?
			var stateName = json.states[0].name;
			// HOTFIX: if the first item is the current state, grab the next.
			if (stateName === _current.name) {
				stateName = json.states[1].name;
			}
			// if a previous state is available and isn't the current route...
			if (typeof _prev === 'object' && _prev.route) {
				stateName = _prev.route;
			}
			// navigate to the state provided
			NGX.App.api.state(stateName);
		},
		// init function returns the methods, when this is called in ui.core populate the API with these
		init : function(){
            canSeeCampaign();
			return {
				// prevent multiple state and action objects from being instantiated.
				state: (function() {
					if (!_state) {
						_state = new State();
					}
					return _state;
				}).call(this),
				action: (function() {
					if (!_action) {
						_action = new Action();
					}
					return _action;
				}).call(this),
				register : this.registerEvent,
				remove   : this.removeEvent
			};
		}
	};

}(window, document, $, flowJSON));
/**
 * Overlays
 */

;NGX.overlay = (function(w, d, $, undefined) {
	"use strict";

	/**
	 * Default options
	 */

	var config = {
			prefix : 'xO-',
			oClass : 'xOverlay',
			iClass : 'xOverlayInner xDetailContainer',
			cClass : 'xOverlayContent',
			static : 'content'
		},
		oIndex = 0,
		oCache = {},

		/**
		 * Overlay class
		 */

		Overlay = function(id, options) {
			this.id = id;
			_.extend(this, options);
			if (this.url) {
				ajaxContent.call(this);
			}
			createMarkup.call(this);
		},

		/**
		 * modify an existing overlay, or create new overlay, add to DOM and trigger a .show()
		 */

		createOverlay = function(options) {
			var id, obj, cache, o;
            if(!NGX.context.isFB){
                if(NGX.App.state.framed){
                    NGX.App.api.messageParent({action:'getPageInfo'});
                } else {
                    NGX.App.state.pageInfo = {
                        clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                        scrollTop    : (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
                        offsetTop    : 0
                    }
                }
            } else {
                if(NGX.App.state.fbLoaded && FB){
                    FB.Canvas.getPageInfo(function(info){
                        NGX.App.state.pageInfo = info;
                    });
                }
            }

			if (options) {
				if (options.type === config.static) {
					cache = _.where(oCache, { type: config.static });
					// cached match found
					if (cache.length > 0) {
						o = cache[0];
						o.content = options.content || false;
						o.url     = options.url     || false;
						// o.url takes priority over o.content, but will fail-over to the content if the AJAX request fails
						if (o.url) {
							return ajaxContent.call(o);
						} else if (o.content) {
							return updateContent.call(o);
						}
						// no content of any description provided. do nothing.
						return false;
					}
				}
				// create the overlay content if there is nothing to update
				id = config.prefix + ++oIndex;
				obj = oCache[id] = new Overlay(id, options);
				return obj;
			}
			// no options provided
			return false;
		},

		/**
		 * get overlay object by element ID.
		 * you can specify a property as a second param, if that prop does not exist it returns false.
		 */

		getOverlay = function(id, prop) {
			var oObj = oCache[id];
			if (!oObj) {
				return false;
			}
			return (prop)? (oObj[prop] || false): oObj;
		},

		/**
		 * retrieve URL
		 */

		ajaxContent = function() {
			var _self = this;
			$.ajax({
				url: this.url
			})
			.fail(function(xhr, err, msg){
				if (!_self.content) {
					_self.content = '<div class="'+config.oClass+'-error"><h1>'+err+'</h1><p>'+msg+'</p><button class="xAction xActionCloseOverlay"><span>Close</span></button></span></div>';
				}
			})
			.done(function(response){
				if(response.content){
					_self.content = response.content[0];
				} else {
					_self.content = response;
				}
			})
			.complete(function(){
				updateContent.call(_self);
			});
			return _self;
		},

		/**
		 * update the content value of the Overlay model
		 */

		updateContent = function() {
			var _self = this;
			// if a template is present
			if (this.template) {
				// create handlebars template
				if (typeof this.template !== 'function') {
					this.template = Handlebars.compile(this.template);
				}
				// if passed an object as content, use that to populate the template
				if (_.isObject(this.content)) {
					this.content = this.template(this.content);
				}
				// otherwise use the overview object itself
				else {
					this.content = this.template(this);
				}
			}

			// populate the overlay
			this.$contentWrapper.html(this.content);
			// trigger the callback
			if (this.callback &&
				this.callback.constructor === Function) {
					this.callback.call(this);
			}
			// trigger the global event
			NGX.App.Events.trigger('overlay:ready', this);
            // position it as best we can - [SG] Once images are loaded
			imagesLoaded(_self.el,function(){
				_self.center.call(_self);
			});
			// return the overlay object
			return this;
		},

		createCloseButtons = function(type) {
			var toolbar = d.createElement('div'),
				outer, middle;

			toolbar.setAttribute('class','xActionContainer xActionClose has'+type.charAt(0).toUpperCase() + type.slice(1));

			if(type=="button"){
				outer = d.createElement('div');
				middle = d.createElement('span');
				outer.setAttribute('class','xButton xAction xActionCloseOverlay');
                //outer.setAttribute('type','button');
				middle.innerHTML=NGX.lang.get('buttons.overlayClose');
			} else {
				outer  = d.createElement('a'),
				middle = d.createElement('i');
				outer.setAttribute('class','xIconButton xAction xActionCloseOverlay');
				outer.setAttribute('href','#');
				middle.setAttribute('class','xIcon xIconClose');
			}

			if(this.type=='state'){
                middle.setAttribute('data-ngx-action','exec:statePrev');
			}

			outer.appendChild(middle);
			toolbar.appendChild(outer);

			return toolbar;

		},



		/**
		 * Build the markup, bind events and attach to DOM.
		 * call in scope but don't prototype because we don't want to expose this.
		 */

		createMarkup = function() {
			var _self = this,
				el = this.el     = d.createElement('div'),
				ir = this.inner  = d.createElement('div'),
				contentWrapper = this.contentWrapper = d.createElement('div'),
				$e = this.$el    = $(el),
				$i = this.$inner = $(ir),
				$contentWrapper = this.$contentWrapper = $(contentWrapper);
			// setup the HTML element
			el.id = this.id;
			el.setAttribute('class', config.oClass + ((_self.type)? ' '+config.oClass+'-'+_self.type: ''));
			ir.setAttribute('class', config.iClass);
			contentWrapper.setAttribute('class','xOverlayContent');
			if(_self.type) el.setAttribute('data-type', _self.type);
			ir.appendChild(createCloseButtons.call(_self,'icon'));
			ir.appendChild(contentWrapper);
			ir.appendChild(createCloseButtons.call(_self,'button'));
			el.appendChild(ir);
			ir.style.opacity = "0";
			// event binds
			if (_self.type !== 'modal' && _self.type !== 'state') {
				$e.on('click', function(){
					_self.destroy();
				});
				// TODO: Fix this propagation issue
                // And move the insights tracking once this propagation issue is sorted [SG]
				$i.on('click', ':not([data-ngx-action],[data-ngx-action]>*,.xCTA>span)', function(e){
					e.stopPropagation();
                    var $this = $(this),
                        $promo = $this.parents('.xPromotion');
                    if($this.hasClass('xCTASecondary')){
                        Insights.track('click:secondaryCta',{p:$promo.attr('data-ngx-id')})
                    } else if($this.hasClass('xCTA')){
                        Insights.track('click:promo',{p:$promo.attr('data-ngx-id')})
                    }
				});
			}
			$i
				.on('click', '.xActionCloseOverlay span, .xActionCloseOverlay .xIconClose', function(e){
					e.preventDefault();
					_self.destroy();
				})
				// enable data attributes (propagation from overlay mask close prevents this)
				.on('click', '[data-ngx-action]', NGX.App.api.actionClick);
			// append to the DOM
			d.body.appendChild(el);
			// this will trigger a reflow/repaint but we want to trigger the callback and 'overlay:open' event in the update method after it's attached to the DOM
			updateContent.call(_self);
		};

	Overlay.prototype.show = function() {
		this.el.style.opacity = '1';
		return this;
	};

	Overlay.prototype.center = function() {
		var _self = this,
			positionInner = function(info) {

                if('undefined'===typeof info){
                    info = NGX.App.api.messageParent({action:'getpageinfo'});
                }
                var _prevMaxHeight = _self.$inner.css('maxHeight'),
                    _info = info || {};
                _self.inner.style.maxHeight = 'none';

                var st = _info.scrollTop,
                    ch = _info.clientHeight,
					ih = _self.$inner.outerHeight(),
                    ot = _info.offsetTop,
                    total;

                var vTop, vMiddle, vBottom;

                if (NGX.App.state.framed) {
                    vTop = st;
                    vBottom = (vTop+ch);
                    vMiddle = ((vBottom - vTop)/2)+vTop;
                    total = (vMiddle - (ih/2))-ot;
                    var docHeight = $(d).outerHeight();

                    // If the iframe is smaller than the content, you're gonna have to try to grow it
                    if(ih>docHeight){
                        d.body.style.minHeight=(ih+40)+'px';
                        NGX.App.api.messageParent({action:'grow',payload:{height:ih+40}})
                        total = 0;
                    }
                    // If the bottom of the iframe would be cut off, move to top of frame
                    if(total>docHeight || (total+ih)>docHeight) total = docHeight - (ih+40);

				} else {
                    // Not in a frame
                    total = (ch/2) - (ih/2);
				}

				// position the overlay
				_self.inner.style.top = Math.max(10, Math.round(total)) + 'px';
                //_self.inner.style.maxHeight = _prevMaxHeight;
				// show the overlay
				_self.inner.style.opacity = "1";


			};
		// position the overlay
		if (NGX.context.isFB && NGX.App.state.framed) {
			_self.$el.addClass('xPositionFrame');

			// facebook tab or tab in canvas
			if( !NGX.App.state.fbLoaded ){
				NGX.App.Events.on('fb:ready', function(){
					FB.Canvas.getPageInfo(positionInner);
				})
			} else {
				FB.Canvas.getPageInfo(positionInner);
			}

		} else {
			// outside FB
            _self.$el.addClass('xPositionScreen');
            setTimeout(function(){ // Yuk - SG
                positionInner(NGX.App.state.pageInfo);
            },75)

		}
		return this;
	};

	Overlay.prototype.hide = function() {
        NGX.App.Events.trigger('overlay:hidden');
		this.el.style.opacity = '0';
		return this;
	};

	Overlay.prototype.destroy = function() {
		d.body.removeChild(this.el);
        d.body.style.minHeight = '';
		delete oCache[this.id];
		--oIndex;
		// if an onclose fn has been specified trigger now
		if (typeof this.onclose === 'function') {
			return this.onclose();
		}
        NGX.App.Events.trigger('overlay:destroyed');
		return null;
	};

	$(function(){
		// allow closing of overlay with keypress
		$(d).keydown(function(e) {
			var o;
			// 4  = android back button
			// 27 = desktop escape key
			if (e.keyCode == 4 || e.keyCode == 27) {
				o = oCache[config.prefix + oIndex];
				if (o) {
					e.preventDefault();
					o.destroy();
				}
			}
		});
	});

	return {
		get    : getOverlay,
		create : createOverlay,
        cache  : {}
	};

}(this, document, $));
(function(w,doc,o) {
	"use strict";

	// spawn the popup window
	var openWindow = function(url, obj) {
			if (url) {
				if (obj) {
					url += '?' + $.param(obj);
				}
				w.open('//' + url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			}
			return false;
		},

		// wrapped tokenize method
		tokenizeMe = function(input, obj) {
			// I've removed the token-type selection as requested - if you want
			// to re-add it just pop an object full of regexes into the top of
			// the ui.common.js closure and reference that by key in x.tokenize.
			return v4.tokenize(input, obj || NGX.App.config.extendedProperties);
		},

	// TODO: link refs were never fully fleshed out, so this is a quick implementation, using 'ctx:smarturl' as the link ref.
		buildLink = function( link, internal ) {

			var arr, json, linkString, qs="",
        		// TODO: this is only a quick query string implementation and will likely need to be revisited
				qsr = (function(id){
					return (id)? 'r=' + id: '';
				}(NGX.App.state.currentUser.id));
			if ('string' === typeof link) {
				arr = link.split(':');
				if (_.isArray(arr)) {
					switch (arr[0]) {
						// TODO: url:campaignlink vs ctx:smarturl issue
						case "url":
							arr[1] = (arr[1]=='campaignlink')?'smarturl':arr[1];
						case "ctx":
							json = NGX.context;
							break;
					}

					linkString = (json)? json[ arr[ 1 ] || 'smarturl' ] : link
					linkString = ((linkString)? linkString: document.location.href)

					if(internal) qs = (linkString.indexOf('?')>-1)? "&"+qsr: "?"+qsr;

					return linkString+qs;
				}
			} else {
				return link+qs;
			}

		},

	// fb share track is handled in the API method. others do not have proper API methods
		trackShare = function(data) {
            // extract the type of item being shared from its componenttype attribute.
            var getContext = function(c){

                    var el, cmp = 'campaign';
                    if(!c){
                        // failover to DisplayItem, which may not actually be entirely correct but the non-APIs don't have any proper callabcks yet
                        return "contentitem";
                    } else  if (c == 'campaign' || 'confirmation') {
                        return cmp;
					} else {
						el = doc.getElementById(c);
						if (el)
							return el.getAttribute('data-componenttype');
                    }

				},
				source = NGX.context.isFB? 'facebook': 'web';

            Insights.track('share:'+getContext(data.context), { source:source, target:data.target, i:data.id } );

		},

		// configured networks
		networks = {
			twitter : {
				post: function(data, overrides){
					_.extend(data, overrides);
					openWindow('twitter.com/share', {
						url  : buildLink( data.link,overrides.linktype=="internal" ),
						text : tokenizeMe( data.message, data )
					});
                    trackShare($.extend({},data,{target:'twitter'}));
				}
			},
			google : {
				post: function(data, overrides){
					_.extend(data, overrides);
					openWindow('plus.google.com/share', {
						url: buildLink( data.link,overrides.linktype=="internal" )
					});
                    trackShare($.extend({},data,{target:'google'}));
				}
			},
            vkontakt : {
                post: function(data, overrides){
                    _.extend(data, overrides);
                    var pictureData = NGX.Util.assetFromRef(data.picture),
                        canonSrc = (v4.isAssetRef(data.picture))?pictureData.src:data.picture;
                    openWindow('vk.com/share.php', {
                        url: buildLink( data.link,overrides.linktype=="internal" ),
                        title:tokenizeMe(data.title, data),
                        description:tokenizeMe(data.message, data),
                        image: (canonSrc)? canonSrc: ''
                    });
                    trackShare($.extend({},data,{target:'vkontakt'}));
                }
            },
            facebook : {
                post: function(data, overrides){
                    _.extend(data, overrides);
                    if(data.linktype=="external" && data.picture){
                        openWindow('facebook.com/sharer/sharer.php',{
                            appId : NGX.context.fb.app.id,
                            sdk   : 'joey',
                            display:'popup',
                            u : encodeURIComponent(data.link)
                        });
                    } else {
                        var pictureData = NGX.Util.assetFromRef(data.picture),
                            canonSrc = (v4.isAssetRef(data.picture))?pictureData.src:data.picture;
                        canonSrc = (canonSrc.substring(0,2)=="//")?"https:"+canonSrc:canonSrc;

                        NGX.App.api.facebookShare({
                            name        : tokenizeMe(data.title, data),
                            link        : buildLink( data.link ),
                            picture     : (canonSrc)? canonSrc: '',
                            caption     : tokenizeMe(data.byline, data),
                            description : tokenizeMe(data.message, data)
                        });
                    }
                    trackShare($.extend({},data,{target:'facebook'}));
                }
            },
			pinterest : {
				post: function(data, overrides){
					_.extend(data, overrides);
					var pictureData = NGX.Util.assetFromRef(data.picture),
						canonSrc = (v4.isAssetRef(data.picture))?pictureData.src:data.picture;
					openWindow('pinterest.com/pin/create/button', {
						media       : (canonSrc)? canonSrc: '',
						url         : buildLink( data.link, overrides.linktype=="internal" ),
						description : tokenizeMe(data.message, data)
					});
                    trackShare($.extend({},data,{target:'pinterest'}));
				}
			}
		},

		shareFactory = function(obj) {
			// only build out JS for required modules
			if (obj.enabled === "true" && networks[obj.network]) {
				// add to public API with a data property containing the sharing object (or use the existing one if it's there)
				NGX.App.api.share[obj.context] = NGX.App.api.share[obj.context] || { data: obj };
				// create data-bound function for sharing
				NGX.App.api.share[obj.context][obj.network] = networks[obj.network].post.bind(obj, obj.data[0]);
			}
		};

	(function() {
		// make sure the share section of the API is configured
		NGX.App.api.share = NGX.App.api.share || {};

		// expose methods to public API
		NGX.App.api.addShare  = shareFactory;

		// create the dynamic API options
		NGX.App.Events.on('page:ready', function() {
			_.each(o, function(item) {
				shareFactory(item);
			});
		});

		// show confirmation message // TODO: tidy this up a - will we be using other networks for confirmation?.
		NGX.App.Events.on('fb:ready', function(){
			if (NGX.App.api.share &&
				NGX.App.api.share.confirmation &&
				'confirmation' === NGX.App.state.name &&
				'function' === typeof NGX.App.api.share.confirmation.facebook) {
					NGX.App.api.share.confirmation.facebook({context:'confirmation'});
			}
		});


	}());

}(this, document, NGX.App.config.sharingConfig));

var compositeCustomValidations = {};

(function(root,doc) {
    "use strict";

    var $form = $('#xCampaignForm'),
        html  = doc.documentElement || doc.getElementsByTagName('html')[0],
        customValidations = {},
        fieldGroups = [];

    // init selectize (do this before parsley to avoid horrors) - But not for mobiles.
    if(!v4.isMobile()){
        $('select').selectize({
            wrapperClass : 'xComboWrapper',
            inputClass   : 'xComboInput',
            dropdownClass: 'xComboOptions',
            dropdownContentClass : 'xComboOption',
            selectOnTab:true
        });
    }

    // init parsley and configure custom validations
    $form
        .parsley({
            namespace:'data-parsley-',
            excluded: 'input[type=hidden], :disabled',
            // add custom composite field to parsley validations
            inputs : '[data-parsley-trigger]',
            useHtml5Constraints: false,
            validateIfUnchanged: true,
            validators: {
                ngxcustom: function(){
                    return {
                        validate : function(val, attrVal, c) {
                            var fn = customValidations[attrVal];
                            if ('function' === typeof fn) {
                                return fn.call(window, val, c.$element);
                            }
                            return true;
                        },
                        priority : 512
                    }
                },
                markup: function(){
                    return {
                        validate : function(val,attrVal,c){
                            var acceptable = "b|i|em|u|p|br|span|a".split('|'),
                                re = /<[^>]+>/g,
                                matches = val.match(re),
                                badTags = false;

                            if(/<!/.test(val)) return false;

                            var acceptTag = function(tag){
                                var tagName = tag.replace(/[<>\/]/g,'').toLowerCase();
                                if(!_.contains(acceptable,tagName)){
                                    return false
                                }
                                return true;
                            };

                            _.each(matches,function(match){
                                if(!acceptTag(match)) badTags = true;
                                return;
                            });

                            if(badTags) return false;

                            return true;
                        },
                        priority : 1024
                    }
                },

                fileupload : function(){
                    return {
                        validate: function(val,required,field){
                            var valid = false;
                            field.options.validateIfUnchanged = true;

                            if(required == false){
                                return true;
                            } else {
                                var filename = null,
                                    fieldEl = field.$element;

                                if(fieldEl && fieldEl.attr('type')=="file"){

                                    if (!(root.FileReader && root.File)){
                                        // Old browser fallback
                                        filename = field.$element.get(0).value||null;
                                    } else {
                                        filename = field.$element.get(0).files[0]?field.$element.get(0).files[0].name:null;
                                    }

                                    if(filename){
                                        field.$element.attr('data-parsley-value',filename);
                                        valid = true;
                                    } else {
                                        field.$element.attr('data-parsley-value','');
                                        valid = false;
                                    }
                                } else if(fieldEl && fieldEl.attr('type')=="text"){
                                    if(val!=="" && val!=="-"){
                                        valid = true;
                                    } else {
                                        valid = false;
                                    }
                                }

                                return valid;

                            }

                        },
                        priority : 1024
                    }
                }
            },

            messages: {
                name: "You must complete all fields",
                fileupload: "The upload field is not populated"
            },


            // validation classes
            successClass   : 'xFieldValid',
            errorClass     : 'xFieldError',
            validatedClass : 'xFieldValidated',
            errors : {
                classHandler: function(element, isRadioOrCheckbox){
                    return $(element).parents('.xFieldItem');
                }
            },
            listeners: {

                onFormValidate : function(){

                },

                onFieldError : function(elem,constraints,field){
                    setTimeout(function(){
                        formWrapperResize();
                        NGX.App.api.resizeParent();
                    },300,$form,elem);
                }
            }
        });

    // hide form upload control field in unsupported browsers
    if (html && html.hasAttribute('class') &&
        !/\bfileinput\b/g.test(html.getAttribute('class'))) {
        var frm = NGX.lang.form || false,
            cls = 'uploadUnsupported',
            msg = (frm && frm[cls])? frm[cls]: 'Upload not supported by your device';
        $('.xControlUpload', $form).html('<div class="xErrorLabel xUploadUnsupported">' + msg + '</div>');
    }

    /**
     * NGX Group validations 2.0 (standalone)
     */

    var ngxValidations = {
            // check user has entered a full name and it doesn't contain bad characters
            // TODO: i18n
            name: {
                msg: "Please enter your full name",
                fn: function(control) {

                    var $control = $(this),
                        includeTitle = $control.hasClass('xFormatNameTitle')||$control.hasClass('xFormatNameTitleLastFirst');

                    if(!$control.hasClass('xRequired')) return true;

                    var getVal = function(selector) {
                        var $el = $( '#'+control+'_'+selector ),
                            val = v4.trim( $el.val() ),
                            rxp = /<|>|\/|\\|"|\*|%|;|\{|\}|&|\+|\n|\r/g.test(val);
                        return (val && val !== '' && rxp === false);
                    };

                    if(includeTitle){
                        return (getVal('Title') && getVal('Firstname') && getVal('Lastname'))
                    } else {
                        return (getVal('Firstname') && getVal('Lastname'));
                    }

                }
            },
            // check user has entered a full address and it doesn't contain bad characters
            // TODO: i18n
            address: {
                msg: "Please enter your full address",
                fn: function(control) {

                    var $control = $('[data-ngx-control="'+control+'"]'),
                        includeCountry = $control.hasClass('hasCountry');

                    var getVal = function(selector) {
                            var $el = $( '#'+control+'_'+selector ),
                                val = v4.trim( $el.val() ),
                                rxp = /<|>|\\|"|\*|%|;|\{|\}|&|\+|\n|\r/g.test(val);
                            return (val && val !== '' && rxp === false);
                        },
                        checkZip = function(){
                            // If US address format, only 5 chars or 9 chars is valid
                            if($control.hasClass('xFormatAddressUs')){
                                var _zipVal = $('#'+control+'_Zip').val();
                                if(_zipVal.length===5||_zipVal.length===9) return true;
                                return false;
                            } return true;
                        },
                        checkState = function(){
                            if($control.hasClass('xFormatAddressUs')){
                                return getVal('State');
                            } return true;
                        };


                    if(includeCountry){
                        return (getVal('Address1') && getVal('City') && checkState() && getVal('Zip') && getVal('Country') && checkZip());
                    } else {
                        return (getVal('Address1') && getVal('City') && checkState() && getVal('Zip') && checkZip());
                    }

                }
            },
            // confirm the date entered is <18 years ago. use data-minage to control this value.
            /**
             * TODO: DOB validation is really heavy, but it kinda needs to be for accuracy and to support both 2/4 char formats.
             * at a later date look at doing a speedy check to see if it's within a year either way of the target date *THEN* do
             * the actual date validation to quickly filter out bad dates without too much processing.
             */
            "date_of_birth": {
                fn: function(controlName) {
                    var _datecompare,
                        // check the year value and try to handle the input
                        checkYear = function(dVal, now) {

                            // try to set a sensible date
                            var validYear = function(v, d){



                                var nowSuffix, yearPrefix, $yearEl = $('#'+controlName+'_year');
                                // 2-character dates are handled semi-intelligently, based on the current year
                                if (v && v >= 0 && v <= 99) {
                                    // get last 2 digits of the current year
                                    nowSuffix = d.year() % 100;
                                    // round down to the nearest integer to get first 2 characters
                                    yearPrefix = Math.round(d.year() / 100) - (v > nowSuffix? 1: 0);
                                    // build the new date (as Number)
                                    dobObj.year = yearPrefix * 100 + v;
                                    // update the val without triggering validation (field blur event handles this to avoid stacking .one() events)
                                    $yearEl.data('value', dobObj.year);
                                    // after all that we've probably got a reasonable stab at a date
                                    return true;
                                }
                                // yuck
                                $yearEl.data('value', dobObj.year);
                                // 4-character dates are cool
                                if (v >= 1000 && v <= 9999 && v<=$yearEl.attr('max')) return true;
                                // otherwise it's no good
                                return false;
                            };

                            return _.isNumber(dVal) && validYear(dVal, now);
                        },
                        checkDay = function(dVal, now) {
                            // try to set a sensible date
                            var validDay = function(v, d){
                                var $dayEl = $('#'+controlName+'_day');
                                $dayEl.data('value', dobObj.day);
                                if (v >= 1 && v <= 31) return true;
                                // otherwise it's no good
                                return false;
                            };

                            return _.isNumber(dVal) && validDay(dVal, now);
                        },
                        getVal = function(selector) {
                            return parseInt( $('#'+controlName+'_'+selector).val(), 10);
                        },
                        getAge = function(age) {

                            var ageInt = parseInt(age,10);
                            if (!_.isNumber(ageInt)) ageInt = 18;

                            return ageInt - (2*ageInt);
                        },
                        dobObj = {
                            day   : getVal('day'),
                            month : getVal('month'),
                            year  : getVal('year')
                        },
                        now = moment(parseInt(this.attr('data-ngx-datecompare'))),
                        dob; // <-- don't build these unless we need to. they are expensive.
                    // we need to have some data here to do anything

                    if (checkDay.call(this, dobObj.day, now) && checkYear.call(this, dobObj.year, now)) {
                        // modify because moment uses a 0 based index
                        --dobObj.month;
                        // build the date object
                        dob = moment(dobObj);
                        // update hidden field yo
                        $('#'+controlName).val( dob.format() );
                        // make sure it's a good date
                        if (dob.isValid() ) {

                            var yearsDiff = dob.diff(now, 'years');

                            if( (this.attr('data-ngx-coppa')==="enabled") && yearsDiff > -13){
                                NGX.App.api.gate({store:true, data:$('#xReturningUserEmail').eq(0).val(), type:'Age'});
                            } else {

                                // If a minimum age is set AND < current age
                                if( this.attr('data-ngx-minage')){
                                    if(yearsDiff <= getAge(this.attr('data-ngx-minage'))){
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }

                                return true;

                            }

                        }
                        return false;
                    }
                }
            }
        },
    // run though all custom groups and return true if nothing failed validation, else false
        validateAllGroups = function() {
            var groupValid = true, i = 0, a, len = fieldGroups.length;
            for (; i<len; i++) {
                a = fieldGroups[i].call(fieldGroups[i],'force');
                if (!a) groupValid = false;
            }
            return groupValid;
        };

    // find all field groups on the form

    $form.find('.xComposite[data-ngx-control]').each(function( index, item ){

        // get their matching validation fn
        var $el = $(item), $input = $('select[data-ngx-validtype],input:not([type="hidden"])',$el),
            type = $input.eq(0).data('ngxValidtype'),
            control = $el.data('ngxControl'),
            obj = ngxValidations[type], $el, err, objValidation,
            fieldErrorMsg = $(this).attr('data-ngx-control-error-msg') || '';

        // if there is a matching validation...
        if ('undefined' !== typeof obj ) {

            err = $form.find($el.attr('data-parsley-error-container'));

            // validation handler
            objValidation = function(arg) {
                var force = ("string" === typeof arg && arg==="force")?true:false,
                    $fields = $('input[id]:not([type="hidden"],:hidden)',$el),  // Only validate VISIBLE elements
                    allFieldsTouched = true;

                if($fields.length){
                    // Only do the validation if all three fields have been touched
                    _.each($fields,function(el,idx){
                        if(!el.getAttribute('data-ngx-touched')) allFieldsTouched = false;
                    });

                    if(allFieldsTouched || force){
                        var valid = obj.fn.call(this, control);
                        if(valid && compositeCustomValidations.hasOwnProperty(control)) {
                            //console.log('Also do the composite validation')
                            valid = compositeCustomValidations[control].call(this,$fields)
                        }
                        $el[(valid? 'remove': 'add') + 'Class']('xFieldError');
                        err.text(fieldErrorMsg || obj.msg || 'Invalid field');
                        return valid;
                    }
                } else {
                    return true;
                }

            };

            // bind fn to the change event of any child inputs. if the wrapper has a data-trigger attr use those values
            $el.on( ($el.attr('data-parsley-trigger') || 'change'), 'input', objValidation.bind($el) );

            // populate the submission validation array
            fieldGroups.push( objValidation.bind($el) );
        }
    });

    // update UI with calculated date for any minimum age fields only once. prevent infinite validation events onblur, or one .one() for every validation event triggered
    // TODO: FIXME: parsley bug/feature fix - it is triggering too many validation events.
    $('.xComposite[data-ngx-minage]', $form).each(function() {
        var controlName = $(this).attr('data-ngx-control'), yearField = $('#'+controlName+'_year');
        if (yearField.length > 0) {
            $('input,textarea,select', this).on('blur', function(){
                var date = yearField.data('value');
                if (date && date !== '')
                    yearField.val( yearField.data('value') );
            });
        }
    });

    /**
     * Event Binding and API updates
     */

        // do not validate hidden fields (eg. UIFlow)
    $form
        .parsley('addListener', {
            onFieldValidate: function ( elem ) {
                var $elem = $(elem);
                return !$elem.is( ':visible' ) && !$elem.hasClass('selectized');
            }
        });

    // catch form submission and apply parsley validation
    $form
        .submit(function(e){
            e.preventDefault();
            var _cntxt = NGX.context;

            if("object"=== typeof _cntxt.captcha){
                if(_cntxt.captcha.enabled == false ){
                    NGX.App.Events.trigger('form:submit');
                    submitCampaignObjectForm($form[0]);
                } else {
                    if(_cntxt.captcha.type === "recaptcha"){
                        NGX.overlay.create({
                            content:NGX.App.api.getTemplate('recaptcha'),
                            type: 'modal captcha',
                            callback: function(){
                                var _self = this,
                                    failureDialog = {
                                        template:NGX.App.api.getTemplate('inviteModal'),
                                        content : {
                                            title       : NGX.lang.get("form.captcha.failed.title"),
                                            msg         : NGX.lang.get("form.captcha.failed.msg"),
                                            closeBtnText: NGX.lang.get('buttons.overlayClose')
                                        },
                                        onclose : function(){Recaptcha.reload();}
                                    };

                                Recaptcha.create(NGX.context.captcha.key,'recaptchaWrapper',{theme:'clean'});

                                $('#xFormRecaptcha').submit(function(e){
                                    e.preventDefault();
                                    var _chlnge = document.getElementById('recaptcha_challenge_field').value,
                                        _rspnse = document.getElementById('recaptcha_response_field').value;

                                    if(_chlnge && _rspnse){
                                        // Only do the verify step if both challenge and response fields are available
                                        var response = $.ajax({
                                            url : '/display/api/captcha/checkReCaptcha',
                                            data : {
                                                captcha_challenge:_chlnge,
                                                captcha_response :_rspnse
                                            }
                                        }).success(function(rsp){
                                                if(rsp.success==="true" && rsp.ngx_captcha_token){
                                                    NGX.App.api.setFormField('ngx_captcha_token',rsp.ngx_captcha_token);
                                                    NGX.App.Events.trigger('form:submit');
                                                    submitCampaignObjectForm($form[0]);
                                                } else {
                                                    NGX.overlay.create(failureDialog);
                                                }
                                            });
                                    } else {
                                        NGX.overlay.create(failureDialog);
                                    }
                                });
                            },
                            onclose: function(){
                                $('.xSubmit',$form[0]).attr('disabled',null);
                            }
                        });
                    }

                }

            } else {

            }


            return false;
        });

    // update API
    NGX.App.api.formValidate = function() {
        NGX.App.Events.trigger('form:validate');
        // if there is no form allow validation to pass.
        if ('undefined' === typeof $form || $form.length === 0)
            return true;

        // do the validation
        var parsleyFieldsValid = $form.parsley('validate');
        var groupsValid = validateAllGroups(); //using $form.parsley('validate') && validateAllGroups() is wrong, group validation will only be called if the parsley validation is passed first.
        var valid = parsleyFieldsValid && groupsValid;

        // return validation state regardless of callback behaviour
        if (typeof valid === 'boolean') {

            NGX.App.Events.trigger('form:validation:'+((valid)?'passed':'failed'));
            return valid;
        }

        // if the return value was not true/false something went badly wrong
        throw new Error("NGX Error: form validation did not return a boolean");
    };

    NGX.App.api.addCustomValidation = function(id, fn) {
        if (id && 'function' === typeof fn) {
            customValidations[id] = fn;
            return true;
        }
        return false;
    };

    NGX.App.api.addCompositeCustomValidation = function(id, fn) {
        if (id && 'function' === typeof fn) {
            compositeCustomValidations[id] = fn;
            return true;
        }
        return false;
    };

}(window,document));



$('.xComposite').on('focus','input,select',function(e){
    $(this).attr('data-ngx-touched','true');
});


/*
 * TODO: Everything below this point was brought straight over from V3 -------------------------------------------------
 */


function restrictInput(field, restrictRegExp, maxLength){

    // restrict field input

    field.keypress(function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        var character = String.fromCharCode(event.which);
        if ( event.which == 0 || /*event.which == 46 ||*/ event.which == 8 || event.which == 9 || event.which == 27 || event.which == 13 || event.which == 127 ||
            // Allow: Ctrl+A
            (event.which == 65 && event.ctrlKey === true) || (event.which == 97 && event.ctrlKey === true) ||
            //Allow: Ctrl+V
            (event.which == 87 && event.ctrlKey === true) || (event.which == 118 && event.ctrlKey === true) ||
            //Allow: Ctrl+C
            (event.which == 67 && event.ctrlKey === true) || (event.which == 99 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            //((event.which >= 35 && event.which <= 39)&&(event.which != event.charCode))
            ((event.keyCode >= 35 && event.keyCode <= 39)&&(event.charCode != undefined)&&(event.keyCode != event.charCode))
            ) {
            // let it happen, don't do anything
            return this;
        }
        else {
            // check if the key is allowed or not
            if (!character.match(restrictRegExp)) {
                event.preventDefault();
            }
        }

    });

    //copy/paste will be handled by 'keyup'
    /*field.bind('paste', function() {
     setTimeout(function(){
     field.val(stripValues(field, restrictRegExp));
     }, 100);
     });*/

    field.keyup(function(event){
        field.val(stripValues(field, restrictRegExp));
    })

    function stripValues(field, restrictRegExp){
        var txt = field.val();
        var c, i, ret = '';
        for (i = 0; i < txt.length; i++){
            c = txt.charAt(i);
            if (null == restrictRegExp || c.match(restrictRegExp)){
                ret += c;
            }
        }

        if (!isNaN(maxLength) && ret.length > maxLength){
            ret = ret.substr(0, maxLength);
        }

        return ret;
    }
}

function changeMarketing(control, name){
    var obj = document.getElementById(name);
    if (control.checked) {
        obj.value = "";
    }
    else {
        obj.value = control.value
    }
}

function formAutofill(config){
    if (config){
        var i, fields, ef;
        if (config.email){
            var emailFields = getItemsByFieldValue(fieldProfiles, "profile", "email");
            for (i = 0; i < emailFields.length; i++){
                ef = emailFields[i];
                fields = $(ef.selector + " input");
                if (fields.length > 0){
                    $(fields.get(0)).val(config.email);
                }
            }
        }
        if (config.first_name || config.last_name){
            var nameFields = getItemsByFieldValue(fieldProfiles, "profile", "name");
            for (i = 0; i < nameFields.length; i++){
                ef = nameFields[i];
                fields = $(ef.selector + " input");
                if (fields.length == 1){
                    $(fields.get(0)).val((config.first_name || "") + " " + (config.last_name || ""));
                } else if (fields.length > 1){
                    if (config.first_name){
                        $(fields.get(0)).val(config.first_name);
                    }
                    if (config.last_name){
                        $(fields.get(1)).val(config.last_name);
                    }
                }
            }
        }
    }
}

// File Uploader

function createNgxUUID(rndCase){
    var uv = '89ab';
    var rndS = '', i, c;
    for (i = 0; i < 32; i++){
        c = (Math.random() * 16 | 0).toString(16);
        if (rndCase && (rndCase == true) && (Math.round(Math.random()) == 1)){
            c = c.toUpperCase();
        }
        rndS += c;
    }
    return [rndS.substr(0,8), rndS.substr(8,4), "4" + rndS.substr(12,3), uv.charAt(Math.random() * 4 | 0) + rndS.substr(16,3),  rndS.substr(20,12)].join("-");
}

function getItemsByFieldValue(dataArray, fieldName, fieldValue){
    var ret = [];
    var currentValue;
    for (i = 0; i < dataArray.length; i++){
        currentValue = fieldName? dataArray[i][fieldName] : dataArray[i];
        if (currentValue == fieldValue){
            ret.push(dataArray[i]);
        }
    }
    return ret;
}

function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}


/**
 * Build/populate hidden fields
 *
 * @param targ      target element
 * @param response  the FB response containing values to be used
 * @return {Array}  An array of fields updated/created
 */

function populateFormData(targ, response, submitOnDone) {
    var d = document,
    // array of modified fields to return
        updated = [],
    // add a hidden field to the form
        add = function(id, val) {
            var el = d.createElement('input');
            el.setAttribute('type', 'hidden');
            el.setAttribute('name', id);
            el.setAttribute('value', (val || ''));
            el.id = id;
            targ.appendChild(el);
            return el;
        },
    // update field value, create if it does not exist
        check = function(id, val) {
            var field = d.getElementById(id);
            if (field) {
                if (field.value === val) return false;
                else field.setAttribute('value', (val || ''));
            }
            else field = add(id, val);
            updated.push(field);
        },
        user = NGX.App.state.currentUser.userSession;
    // no point running this without a target
    if (!targ) return false;
    if (response) {
        // pre-defined fields to populate from FB response;
        check('fbname', response.name);
        check('fbid', response.id);
        check('fblink', response.link);
        check('fblocale', response.locale);
        check('fbfirstname', response.first_name);
        check('fblastname', response.last_name);
        if (user &&	user.authResponse)
            check('fboauth_token', user.authResponse.accessToken);
    }
    if (submitOnDone === true) targ.submit();
    else return updated;
}

/**
 * Submit a form
 *
 * @param formEl
 * @param callback
 */

    // TODO tidy this up.

function submitCampaignObjectForm ( formEl, callback ) {
    var user = NGX.App.state.currentUser.userSession,
        _cntxt = NGX.context,
        doFbLogin = function() {
            NGX.Util.fbLogin(function(response) {
                // has tried to login
                if (response && response.authResponse) {
                    NGX.App.state.currentUser.userSession = response;
                    // attempt to auth
                    FB.api('/' + response.authResponse.userID + '?access_token=' + response.authResponse.accessToken, function(response) {
                        if (response && !response.error) {
                            populateFormData(formEl, response, true);
                        }
                    });
                }
                // already logged in and authed
                else if (user && user.status === 'connected') {
                    populateFormData(formEl, response, true);
                }
                // User cancelled
                else if (user && user.status === 'not_authorized') {
                    $('.xSubmit',formEl).attr('disabled',null);
                    NGX.overlay.create( {
                        type    : 'modal',
                        template: NGX.App.api.getTemplate( 'inviteModal' ),
                        content : {
                            msg         : NGX.lang.get('permissions.error.message'),
                            title       : NGX.lang.get('permissions.error.title'),
                            closeBtnText: NGX.lang.get('buttons.overlayClose')
                        }
                    } );

                }
            }, { timing: 'submit' });
        },
        submissionStrategy = function(callback) {
            // if invite on submit is configured do that and pass the fbLogin as a callback

            if($(formEl).attr('data-ngx-method')==="ajax" && ("FormData" in window)){
                var _formData = $(':input:not(.checkField)',formEl).serializeArray(),
                    _sendData = {},
                    _checkboxes = {};

                var _frmData = new FormData();
                _frmData.append('isXHR',true);


                $('.checkField:checked').each(function(idx,chk){
                    var _chkName = chk.name.replace('[]','');
                    _frmData.append(_chkName,chk.value);
                });

                _.each(_formData,function(i){
                    _frmData.append(i.name, i.value)
                });

                $.each($('[type="file"]'),function(i,el){
                    if(el.files && el.files.length > 0){
                        $.each(el.files,function(f,file){
                            _frmData.append(el.name,file);
                        });
                    }
                });

                $.ajax({
                    type:'post',
                    url: formEl.action,
                    contentType:false,
                    processData:false,
                    data: _frmData
                }).success(function(response){

                    if(response.state==="success"){
                        if(response.url){
                            _redirectUrl = getRedirectURL(response.url,response.entry);
                            window.location = _redirectUrl;
                        }
                    } else if(response.state==="already_entered") {
                        NGX.App.Events.trigger('form:entry:alreadyentered');
                        NGX.overlay.create( {
                            type    : 'modal',
                            template: NGX.App.api.getTemplate( 'inviteModal' ),
                            content : {
                                title       : NGX.lang.get('form.returningUser.entered.title'),
                                msg         : NGX.lang.get('form.returningUser.entered.msg'),
                                closeBtnText: NGX.lang.get('buttons.overlayClose')
                            }
                        } );
                    }
                }).fail(function(){
                    $('.xSubmit',formEl).attr('disabled',null);
                });
            } else {

                if (NGX.App.config.autoInviteMode === 'submit') {
                    NGX.Virality.inviteFBFriends({}, callback);
                } else if (NGX.context.isFB === false || NGX.App.config.permissionRequest.timing === "never") {
                    formEl.submit();
                } else {
                    callback();
                }

            }


        },
        invited = document.getElementById('ngxInvitedFriends');

    if (invited && NGX.App.config.invites) {
        invited.setAttribute('value', NGX.App.state.currentUser.invitedFriends.join(','));
    }

    if (NGX.App.state.fbLoaded) {
        // if it's a hidden form we don't need to validate
        if (formEl.id && formEl.id === 'xHiddenForm') {
            submissionStrategy(doFbLogin);
        }
        // use the parsley validation
        else if( NGX.App.api.formValidate() ) {
            $('.xSubmit').attr('disabled','disabled');
            submissionStrategy(doFbLogin);
        }
    }
}

// Construct ajax redirect URL

var getRedirectURL = function(url,params){
    var _redirectUrl = url,
        _paramsToSend = {},
        _ngxMappingObject = window.ngxMappingObject||{};

    _.each(_ngxMappingObject,function(v,k){
        if(params.hasOwnProperty(v)){
            _paramsToSend['nc.'+k] = encodeURIComponent(params[v]);
        }
    });

    return v4.updateQueryString(_paramsToSend,false,_redirectUrl);
}

function formWrapperResize($form,elem){
    $('.xFormPages',$form).animate({
        height:$('.xFormPage:visible',$form).outerHeight(true)
    },'fast');
}

function checkReturningUser(){
    var returningUserForm  = document.getElementById('xReturningUserForm'),
        mainCampaignForm   = document.getElementById('xCampaignForm'),
        returningUserEmail = document.getElementById('xReturningUserEmail'),
        _emailAddr = returningUserEmail.value,
        _stageMode = false,
        _sendData  = {},

        showMainForm = function(){
            if(NGX.uiFlow.get('xCampaignForm')){
                NGX.uiFlow.get('xCampaignForm').model.set('viewed',false)
            }
            $('[type="email"]',mainCampaignForm).eq(0).val(_emailAddr);
            $(returningUserForm).addClass('xHidden');
            $(mainCampaignForm).parents('.xHidden').removeClass('xHidden');
            if(NGX.uiFlow.get('xCampaignForm')){
                NGX.uiFlow.get('xCampaignForm').model.set('viewed',true)
            }
            NGX.App.api.resizeParent();
        }

    if(!validateEmail(_emailAddr)){

        NGX.overlay.create( {
            type    : 'modal',
            template: NGX.App.api.getTemplate( 'inviteModal' ),
            content : {
                title       : NGX.lang.get('form.returningUser.invalid.title'),
                msg         : NGX.lang.get('form.returningUser.invalid.msg'),
                closeBtnText: NGX.lang.get('buttons.overlayClose')
            }
        } );
        return false;
    }

    var _blocked = NGX.StorageManager.get('gate_'+NGX.App.config.tenant),
        _hashed  = NGX.Util.hashCode(_emailAddr);

    if(_blocked.indexOf(_hashed)>-1){
        NGX.App.api.gate({type:'Age'});
    } else {

        _sendData = {
            email:returningUserEmail.value,
            apikey:NGX.context.apikey,
            campaignObjectId:NGX.App.config.id,
            ngx_remember_me:true,
            isXHR:true
        };

        if(v4.queryStringObject('stageMode')=="true"){
            _sendData.stageMode = true
        }

        $.ajax({
            url  : returningUserForm.action, //'https://local.engagesciences.com:19443/display/form/post',
            contentType:'text/plain',
            data : _sendData
        }).success(function(response){

                if(response.state==="unknown_user"){
                    NGX.App.Events.trigger('form:returninguser:unknownuser');
                    showMainForm();
                } else if(response.state==="success"){
                    NGX.App.Events.trigger('form:returninguser:remembered');
                    if(response.url){
                        _redirectUrl = getRedirectURL(response.url,response.entry);
                        window.location = _redirectUrl;
                    }
                } else if(response.state==="already_entered") {
                    NGX.App.Events.trigger('form:returninguser:alreadyentered');
                    NGX.overlay.create( {
                        type    : 'modal',
                        template: NGX.App.api.getTemplate( 'inviteModal' ),
                        content : {
                            title       : NGX.lang.get('form.returningUser.entered.title'),
                            msg         : NGX.lang.get('form.returningUser.entered.msg'),
                            closeBtnText: NGX.lang.get('buttons.overlayClose')
                        }
                    } );
                }
            }).fail(function(response){
                NGX.overlay.create( {
                    type    : 'modal',
                    template: NGX.App.api.getTemplate( 'inviteModal' ),
                    content : {
                        title       : NGX.lang.get('form.returningUser.failed.title'),
                        msg         : NGX.lang.get('form.returningUser.failed.msg'),
                        closeBtnText: NGX.lang.get('buttons.overlayClose')
                    },
                    onclose : showMainForm
                } );
            });
    }


}

function sendToFriends(){
    var sendToFriendForm  = document.getElementById('xSendToFriendForm'),
        emailAddresses = sendToFriendForm.querySelectorAll('.textField'),
        emailString = "",
        ajaxData    = {
            url  : sendToFriendForm.action,
            type : 'post'
        },
        failureConfig = {
            type    : 'modal',
            template: NGX.App.api.getTemplate('inviteModal'),
            content : {
                title       : NGX.lang.get('sendToAFriend.error.title'),
                msg         : NGX.lang.get('sendToAFriend.error.msg'),
                closeBtnText: NGX.lang.get('buttons.overlayClose')
            }
        };

    var getEmailAddressString = function(emailAddresses){
        var addresses = [],
            max=10;

        if(emailAddresses.length===1){
            var emlVal = emailAddresses[0].value;
            max = emailAddresses[0].getAttribute('data-ngx-max');
            addresses = emlVal.split(',');
            addresses=addresses.slice(0,max);

        } else {
            _.each(emailAddresses,function(email){
                if(email && email.value) addresses.push(email.value);
            });
        }

        return addresses.join(',');

    }


    emailString = getEmailAddressString(emailAddresses);

    ajaxData.data = {
        async                   : true,
        campaignId              : NGX.App.config.id,
        apikey                  : NGX.context.apikey,
        sendToAFriend_to        : emailString,
        sendToAFriend_subject   : sendToFriendForm.getAttribute('data-ngx-subject')||NGX.lang.get('sendToAFriend.subject')
    };

    if(emailString.length>0){
        $.ajax(ajaxData)
            .success(function(response){
                var _content = response.content[0];
                if(_content.scheduled){
                    NGX.overlay.create({
                        type    : 'modal',
                        template: NGX.App.api.getTemplate('inviteModal'),
                        content : {
                            title       : NGX.lang.get('sendToAFriend.success.title'),
                            msg         : NGX.lang.get('sendToAFriend.success.msg'),
                            closeBtnText: NGX.lang.get('buttons.overlayClose')
                        }
                    });
                } else {
                    NGX.overlay.create(failureConfig);
                }
            })
            .fail(function(response){
                NGX.overlay.create(failureConfig);
            });
    } else {
        NGX.overlay.create(failureConfig);
    }
}
/*
 * Attach a UI flow to a form.
 */

;NGX.uiFlow = (function(d,Events,$,_) {
	"use strict";

	var config = {
			wrapper : '.xFormPages',
			module  : '.xComponent',
			next    : '.xActionNext',
			prev    : '.xActionPrevious',
			disable : 'xDisabled',
			validate: false,
			plugin  : {
				timeout   		: 0,                  				// prevent auto-start
				allowWrap 		: false,              				// prevent looping
				slides    		: 'div.xFormPage',    				// slide selector
				log       		: false,              				// no console.logging
				fx		  		: 'ScrollVert',       				// transition
				pauseOnHover	: true,								// pause on hover
				pagerTemplate	: '<li class="xPagerIcon"><span></span></li>',	// lis for pager
				pagerActiveClass: 'activeSlide'						// active slide class
			}
		},
		flowCache = {},
		flowCount = 0,

		// Flow class
		Flow = function(el, options) {
			_.extend(this, options);
			this.config  = $.extend(true, {}, config, this.config); // deep merge config object
			this.fid     = ++flowCount;
			this.form    = el;
			this.formId  = el.id;
			this.$el     = $(this.config.wrapper, this.form);
			this.$module = this.$el.parents(this.config.module);
			this.model   = NGX.App.Components.get(this.$module.attr('id'));
			this.percent = 0;
			this.form.setAttribute('data-flow', this.fid);
			// initialise cycle2
			initCycle2.call(this);
			// update button classes
			updateUI.call(this);
			// cycle2 bugfix - does not auto-size hidden elements correctly
			if (this.config.plugin.autoHeight === "container" && this.model) {
				this.model.on('change:viewed', function(){
					autoSize.call(this);
				}, this);
			}
			return this;
		},

		// resize the first slide on display if autosize is configured
		autoSize = function() {
            var height = $('.cycle-slide-active', this.$el).outerHeight();
            this.$el.height(height + 'px');
            return height;
		},

		// setup cycle2 plugin
		initCycle2 = function() {
			this.$el
				.cycle(this.config.plugin)
				.on('cycle-after', $.proxy(function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
					updateUI.call(this);
                    // TODO: Do we want to autosize?
                    NGX.App.api.resizeParent();
					// TODO: pass these as a mapped object
					Events.trigger('flow:after', this, event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
				}, this));
			// get length of slideshow
			this.length = this.$el.data('cycle.opts').slideCount;
			// trigger ready event
			Events.trigger('flow:ready', this);
		},

		// update ui with contextual classes (next/prev button disabled classes) and completion percentage
		updateUI = function() {
			var cnf = this.config,
				add = 'addClass',
				rem = 'removeClass',
				$d, $m, pos;
			if (!cnf.plugin.allowWrap) {
				// get Flow data
				$d = this.$el.data('cycle.opts');
				$m = this.$module;
				// hide prev button if at index 0
				$m.find(cnf.prev)[($d.currSlide === 0)? add: rem](cnf.disable);
				// hide next button if at index -1
				$m.find(cnf.next)[(($d.currSlide + 1) >= $d.slideCount)? add: rem](cnf.disable);
				// get progress as percentage // TODO: currently doesn't reference visiblity (eg. quiz on another tab)
				pos = (($d.currSlide+1) / this.length) * 100;
				if (typeof pos === 'number' && pos > this.percent) {
					this.percent = pos;
				}
			}
		},

		// Retrieve a Flow object
		getFlowById = function(id) {
			 return flowCache[id] || false;
		},

		// Create a new instance of a Flow object
		createFlow = function(id, options) {
			var el = d.getElementById(id),
				evtTrigger = function(e, method, id) {
					e.stopPropagation();
					NGX.App.Events.trigger('flow:'+method, id);
                    NGX.App.Events.trigger('navigate:'+method, id);
				},
				flow;
			if (el) {
				flow = el.hasAttribute('data-flow')? getFlowById(id): flowCache[id] = new Flow(el, options);
				flow.$module.on('click', config.next, function(e){
					if(!$(this).hasClass('xDisabled')) evtTrigger(e, 'next', id);
				}).on('click', config.prev, function(e){
					if(!$(this).hasClass('xDisabled')) evtTrigger(e, 'prev', id);
				});
				return flow;
			}
			return false;
		},

		// Trigger item transition
		triggerTransition = function(id, fn) {
			var obj = getFlowById(id),
				objConf,
				method;
			if (obj && _.isFunction(obj[fn])) {
				objConf = obj.config;
				// wrap obj[fn]() so it executes within the correct scope
				method = function(){ obj[fn].call(obj); };
				// if a validation function is specified
				if (_.isFunction(objConf.validate)) {
					switch (objConf.validate.call(obj, fn)) {
						case true:
							// there is a success function to run
							if (_.isFunction(objConf.success)){
								objConf.success.call(obj, method);
							}
							// otherwise proceed
							else {
								method();
							}
							break;
						case false:
							// obj.validate doesn't return true and obj.fail() exists
							if (_.isFunction(objConf.fail)) {
								objConf.fail.call(obj, method);
							}
							break;
						default:
							// a true/false value was not returned, do not proceed with callback
							return false;
					}
				}
				else {
					method();
				}
			}
		};

	// prototype Cycle2 methods
	// TODO: add the functions here as methods of the current App.Component
	Flow.prototype.goto = function(indx) {
		this.$el.cycle('goto', indx);
	};

	Flow.prototype.next = function() {
		if (this.config.validate === true) {
			if (NGX.App.api.formValidate() === true) {
				this.$el.cycle('next');
			}
		}
		else this.$el.cycle('next');
	};

	Flow.prototype.prev = function() {
		this.$el.cycle('prev');
	};

	Flow.prototype.autosize = function() {
		autoSize.call(this);
	};

	Flow.prototype.destroy = function() {
		this.form.removeAttribute('data-flow');
		this.$el.cycle('destroy');
		delete flowCache[this.formId];
	};

	// bind NGX.App.Events to flow control
	Events.on({
		'flow:next': function(id){
			triggerTransition(id, 'next');
		},
		'flow:prev': function(id){
			triggerTransition(id, 'prev');
		}
	});

	// Additional transitions and transition aliases
	$.fn.cycle.transitions.scrollVert = {
		before: function( opts, curr, next, fwd ) {
			opts.API.stackSlides( curr, next, fwd );
			var w = opts.container.css('overflow','hidden').width();
			opts.cssBefore = { top: fwd ? w : - w, left: 0, opacity: 1, display: 'block' };
			opts.cssAfter = { zIndex: opts._maxZ - 2, top: 0 };
			opts.animIn = { top: 0 };
			opts.animOut = { top: fwd ? -w : w };
		}
	};
	$.fn.cycle.transitions.ScrollHorz = $.fn.cycle.transitions.scrollHorz;
	$.fn.cycle.transitions.ScrollUp   = $.fn.cycle.transitions.scrollVert;
	$.fn.cycle.transitions.ScrollVert = $.fn.cycle.transitions.scrollVert;

	// expose public methods
	return {
		create : createFlow,
		get    : getFlowById
	};

}(document, NGX.App.Events, $, _));

/*

$(function(){

	NGX.uiFlow.create('xCampaignForm', {
		validate: function(){
			return true;
		},
		success: function(callback){
			console.log('success');
			callback();
		},
		fail: function(callback){
			console.log('fail');
		}
	});
	NGX.overlay.create({
		content: '<form enctype="multipart/form-data" method="post" action="http://ngx.dyndns.org:8080/display/form/post" id="xCampaignForm2" class="xDefaultForm" style=""><div class="xFormPages"><div class="xFormPage">1</div><div class="xFormPage">2</div><div class="xFormPage">3</div></div></div></form>',
		callback: function (){
			NGX.uiFlow.create('xCampaignForm2', {
				validate: function(){
					return true;
				},
				success: function(callback){
					console.log('success');
					callback();
				},
				fail: function(callback){
					console.log('fail');
				}
			});
		}
	});
});

*/
;NGX.Util = (function( w, d, $, _, undefined ){

	// set any global constants here
	var $body = $( 'body' ),
		$window = $( w );

	return {

        hashCode : function( string ){
           return CryptoJS.MD5(string).toString()
        },

		assetFromRef : function( assetRef ){
			if ( typeof assetRef == 'string' && assetRef.indexOf( ':' ) > -1 ) {
				var assetRefParts = assetRef.split( ':' );

				if ( assetRefParts.length > 4 )
					assetRefParts[3] = _.rest( assetRefParts, 3 ).join( ":" )

				var src;
				if ( assetRefParts[0] == 'asset' ) {
					src = NGX.context.assetUrl + assetRefParts[3]
				} else if ( assetRefParts[0] == 'ugc' ) {
					src = NGX.context.ugcAssetPath + assetRefParts[3];
				} else {
					src = assetRefParts[3] || '';
				}

				return {
					type      : assetRefParts[0],
					assetType : assetRefParts[1],
					size      : (function( s ){
						var sArr = s.split( 'x' );
						return {
							width  : sArr[0] || 0,
							height : sArr[1] || 0
						}
					}( assetRefParts[2] || '' )),
					path      : assetRefParts[3],
					src       : src
				}
			}
			return false;
		},

		fbLogin : function( callback, options ){
			var perms = NGX.App.config.permissionRequest;
			// call login & ask for permissionRequest.timing
			if ( (perms && perms.timing.indexOf( options.timing ) > -1) || options.timing==='now' ) {
				// FB.getLoginStatus is faster than letting FB.login do it, and doesn't flicker the screen.
				FB.getLoginStatus( function( response ){
					// if connected and additional permissions are not required
					if ( response.status === 'connected' && (perms.scope === '' || options.scope==='')) {
						callback.apply( response, arguments );
					}
					// otherwise takeoff and login the app from orbit. its the only way to be sure.
					else {
						FB.login( function( response ){
							// update the userSession data on login
							if (response.status === "connected" && NGX.App.state) {
								NGX.App.state.currentUser = NGX.App.state.currentUser || {};
								NGX.App.state.currentUser.userSession = response;
							}
							if ( typeof callback === 'function' ) {
								callback.apply( response, arguments )
							}
						}, { scope : perms.scope } );
					}
				} );
				// catchall for campaigns that don't have permissions defined
			} else if ( typeof callback === 'function' ) {
				if ( options.timing == 'init' ) {
					FB.getLoginStatus( function( response ){
						callback.apply( response, arguments );
					} );
				} else {
					callback.apply( arguments );
				}
			}
		},

		resizeCanvas : function( opt ){
			if ( FB && !NGX.context.isPreview ) {

				var defaults = {
						strategy : 'auto',
						height   : 800
					},
					options = _.extend( defaults, opt );

				switch ( options.strategy ) {
					case 'auto' :
						// by calling auto, then manually setting the height, we can force the tab to fit the content
						FB.Canvas.setAutoGrow(true);
						FB.Canvas.setSize({ height: 480 });
						break;
					case 'explicit' :
						FB.Canvas.setSize( { height : options.height } );
						break;
					case 'calculate' :
						$window.load( function(){
							var height = (($body.outerHeight( true ) + 20) > options.height) ? ($body.outerHeight( true ) + 20) : options.height;
							FB.Canvas.setSize( { height : height } );
						} );
						break;
					default :
						FB.Canvas.setAutoGrow( true );
						break;
				}
			}
		},

		getRefCookie : function( config ){
			var i, x, y, ARRcookies = document.cookie.split( ";" );
			if ( config.c_name ) {
				for ( i = 0; i < ARRcookies.length; i++ ) {
					x = ARRcookies[i].substr( 0, ARRcookies[i].indexOf( "=" ) );
					y = ARRcookies[i].substr( ARRcookies[i].indexOf( "=" ) + 1 );
					x = x.replace( /^\s+|\s+$/g, "" );
					if ( x == config.c_name ) {
						return encodeURIComponent( y );
					}
				}
			}
			return false
		},

		addRefCookie : function( config ){
			var i, x, y, outLink = '', ARRcookies = document.cookie.split( ";" );
			if ( config.link ) {
				outLink = config.link;
				for ( i = 0; i < ARRcookies.length; i++ ) {
					x = ARRcookies[i].substr( 0, ARRcookies[i].indexOf( "=" ) );
					y = ARRcookies[i].substr( ARRcookies[i].indexOf( "=" ) + 1 );
					x = x.replace( /^\s+|\s+$/g, "" );
					if ( x == config.c_name ) {
						if ( config.useAppData || config.link.indexOf( "?sk=app_" ) != -1 ) {
							if ( config.link.indexOf( 'app_data' ) != -1 ) {
								outLink += encodeURIComponent( '&r=' + y );
							} else outLink += ('&app_data=' + encodeURIComponent( 'r=' + y ));
						} else {
							outLink += config.link.indexOf( '?' ) != -1 ? '&r=' + y : '?r=' + y
						}
					}
				}
				return outLink;
			}
		},

		createCORSRequest : function( method, url ){
			var xhr = new XMLHttpRequest();
			if ( "withCredentials" in xhr ) {
				xhr.open( method, url, true );
			} else if ( typeof XDomainRequest != "undefined" ) {
				xhr = new XDomainRequest();
				xhr.open( method, url );
			} else {
				xhr = null;
			}
			return xhr;
		},

		initialiseCountdown : function( config ){
			var untilDate = new Date( config.date );
			$( config.countdown ).countdown( {
				until         : untilDate,
				layout        : config.layout ? config.layout : '{d<} <span id="daysWrapper"><span class="countdownValue" id="daysValue">{dn}</span><span class="countdownLabel" id="daysLabel">{dl}</span></span>{d>} {h<}<span id="hoursWrapper"><span class="countdownValue" id="hoursValue">{hn}</span><span class="countdownLabel" id="hoursLabel">{hl}</span></span>{h>} {m<} <span id="minutesWrapper"><span class="countdownValue" id="minutesValue">{mnn}</span><span class="countdownLabel" id="minutesLabel">{ml}</span></span>{m>} {s<}<span id="secondsWrapper"><span class="countdownValue" id="secondsValue">{snn}</span><span class="countdownLabel" id="secondsLabel">{sl}</span></span>{s>}',
				compact       : true,
				compactLabels : config.compactLabels ? config.compactLabels : ['y', 'm', 'w', 'd', 'h', 'm', 's'],
				onExpiry      : function(){
					NGX.Util.expireCountdown( config )
				},
				onTick        : NGX.Util.watchCountdown,
				alwaysExpire  : true,
				format        : config.format ? config.format : 'dhmS'
			} );
		},

		expireCountdown : function( config ){
			if ( config.type == 'prelaunch' ) {
				document.location.href = config.expiryURL;
			}
			$( this ).parent().removeClass( 'lastWeek' ).removeClass( 'lastDay' ).removeClass( 'lastHour' ).removeClass( 'lastMinute' ).addClass( 'expired' );
		},

		watchQuizCountdown : function( periods ){

			if ( periods[5] == 0 && periods[6] <= 5 ) {
				$( this ).addClass( 'lastFewSeconds' );
			} else {
				$( this ).removeClass( 'lastFewSeconds' );
			}
		},

		watchCountdown : function( periods ){

			// [0] is years, [1] is months, [2] is weeks, [3] is days, [4] is hours, [5] is minutes, and [6] is seconds.
			// $( this ).children().filter( ":first" ).addClass( 'big' );

			if ( periods[0] == 0 && periods[1] == 0 && periods[2] == 0 && periods[3] < 7 ) {
				$( this ).parent().removeClass( 'lastDay' ).removeClass( 'lastHour' ).removeClass( 'lastMinute' ).addClass( 'lastWeek' );
			}

			if ( periods[0] == 0 && periods[1] == 0 && periods[2] == 0 && periods[3] == 0 && periods[4] <= 24 ) {
				$( this ).parent().removeClass( 'lastWeek' ).removeClass( 'lastHour' ).removeClass( 'lastMinute' ).addClass( 'lastDay' );
			}

			if ( periods[0] == 0 && periods[1] == 0 && periods[2] == 0 && periods[3] == 0 && periods[4] == 0 && periods[5] <= 60 ) {
				$( this ).parent().removeClass( 'lastWeek' ).removeClass( 'lastDay' ).removeClass( 'lastMinute' ).addClass( 'lastHour' );
			}
			if ( periods[0] == 0 && periods[1] == 0 && periods[2] == 0 && periods[3] == 0 && periods[4] == 0 && periods[5] == 0 && periods[6] <= 60 ) {
				$( this ).parent().removeClass( 'lastWeek' ).removeClass( 'lastDay' ).removeClass( 'lastHour' ).addClass( 'lastMinute' );
			}

		}


	}

}( this, document, $, _ ));

/* Embed iFrame video --------------------------------------------------------------------------------------------------

 video.create([CSSSelector or HTMLElement], {

 (REQUIRED)

 id     : 'VIDEO_ID',         // video ref
 cdn    : 'youtube',          // content platform (youtube, fb, vimeo)

 (OPTIONAL)

 height : '123px',            // override default
 width  : '456px',            // override default
 targ   : '#cssSelector,      // don't auto-create, add onclick to populate this element
 before : function() { ... }  // called before targ is populated onclick (global context)
 after  : function() { ... }  // called after targ is populated onclick (global context)

 });
 */

;
NGX.video = (function( w, $ ){
	"use strict";

	var config = {
			template : {
				iframe : '<iframe id="player_{{id}}" src="//{{host}}/{{id}}" data-videoName="{{name}}" class="{{style}} {{cdn}}" width="{{width}}" height="{{height}}" {{attribs}}></iframe>'
			},
			platform : {
				fb      : 'www.facebook.com/v',
				vimeo   : 'player.vimeo.com/video',
				youtube : 'www.youtube.com/embed'
			},
			defaults : {
				style   : 'xVideoOverlayIframe',
				height  : '100%', //'400px',
				width   : '100%', //'500px',
				attribs : 'frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'
			}
		},

		Collection = function(){
			this.list = [];
		},

		Video = function( self, obj ){
			var _self = this;
			// setup object
			_.extend( this, config.defaults, obj );
			this.indx = players.list.length;
			this.host = config.platform[this.cdn] || config.platform.youtube;
			this.template = Handlebars.compile( config.template.iframe );
			this.html = this.template( this );
			// update UI and create click event if required
			if ( this.targ ) {
				var thePlayer = this.el.id + "_player";
				// $(this.el).on('click', function() {
				$( "#" + thePlayer ).on( 'click', function( e ){
					if ( obj.before ) obj.before.call( this, e );
					$( _self.targ ).html( _self.html ); // populate target onclick
					if ( obj.after ) obj.after.call( this, e );
				} );
			} else {
				this.el.innerHTML = this.html;
			}
			this.el.setAttribute( 'data-index', this.indx );
		},

		players = new Collection();

	// pushing an object to the collection creates a new video instance
	Collection.prototype.push = function( el, obj ){
		var domEl = el || obj.el;
		if ( !domEl.nodeName ) {
			domEl = $( domEl )[0];
		}
		if ( domEl.nodeName &&                   // its an element!
			!domEl.getAttribute( 'data-indx' ) ) { // its not already done!
			obj.el = domEl;
			if ( this.list ) {
				return this.list.push( new Video( domEl, obj ) );
			}
		}
		return false;
	};

	return {
		// create video directly
		create : function( el, obj ){
			if ( el && obj.constructor === Object ) {
				players.push( el, obj );
			}
		}
	};

}( this, $ ));

/**
 * NGX.videoEvents sets up a listener for youtube api and then allows you to add players to trigger events
 * Call with NGX.videoEvents.add( @param ) where @param is the id of the frame.
 * This will self initialise when required - no need to call init unless you want to
 */

;NGX.videoEvents = (function( w, d, $, undefined ){
	"use strict";

	var _eventsObj,
		players = [],

		VideoEvents = function( ){

			// this is so we can add players when we like and they will be initialised after the YT api is filly set up
			function processCache() {
				for ( var frameId in players ) {
					_eventsObj.addPlayer( players[frameId] );
				}
			}
			// Load YouTube Frame API
			(function(){ // Closure, to not leak to the scope
				//console.log('init YT api')
				var ytScript = document.createElement( "script" );
				ytScript.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
				var before = document.getElementsByTagName( "script" )[0];
				before.parentNode.insertBefore( ytScript, before );
			})();

			// This function will be called when the API is fully loaded and triggers it's own event
			window.onYouTubePlayerAPIReady = function(){
				//console.log('processing cache')

				_eventsObj._initialised = true;
				processCache();
			}

			return _eventsObj;

		},

		Player = function( frameId ){

			//console.log('adding a new player')
			return _eventsObj.addPlayer( frameId );

		},

		initEventTracker = function( ) {
			if ( !_eventsObj ) {					// this has the effect of checking if we're already in the process of initialising
				_eventsObj = new VideoEvents();
			}
		},

		createFrameListener = function ( frameId ) {
			// this is intended to be expanded on to allow tracking on more than just youtube
			var playerObj = {},
				suppliers = {
					youtube : (function(frameEl) {
						return ((frameEl && frameEl.src)? frameEl.src: '').indexOf('youtu') > 0;
					}(document.getElementById(frameId)))
				};

			if ( suppliers.youtube ) {
				playerObj = new Player( frameId );
				return playerObj;
			}
		},

		listenToFrame = function( frameId ){

			if ( frameId && d.getElementById( frameId ) ) {
				if ( _eventsObj && _eventsObj._initialised === true ) {
					var obj = createFrameListener( frameId );
					return obj;
				} else {
					// we can keep a cache of things to do once we've initialised...
					players.push( frameId );
					initEventTracker()				// ...but we really should init now if we're not already in the process
				}
			}

		};

	VideoEvents.prototype.addPlayer = function( frameId ){

		var ytTimer, timerId, player, notYetStarted = true;

		var opts = _.extend( {frameId : frameId}, this );

		function YTProgressTimer( callback, delay ){

			this.clear = function(){
				window.clearInterval( timerId );
			};

			this.start = function(){
				timerId = window.setInterval( callback, delay );
			};

		};

		// regex to extract video id from any youtube url
		function getYoutubeVideoId( path ){
			var patt = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
			try {
				return patt.exec( path )[1];
			}
			catch( e ) {
				return '';
			}

		};

		// function with fallback to extract video name from either the options sent when adding the video, markup data attribute or the video id
		function getVideoName( ){
			return document.getElementById( opts.frameId ).getAttribute( 'data-videoName' ) || opts.videoId;
		};

		// youtube api will call this when the player is ready to use
		function onPlayerReady(){
			opts.videoId = getYoutubeVideoId( player.getVideoUrl() );
			opts.videoName = opts.videoName || getVideoName();
			opts.duration = player.getDuration();
			opts.chunkYetElapsed = {
				threequarter : ( opts.duration / 4 ) * 3,
				half         : opts.duration / 2,
				quarter      : opts.duration / 4
			};
		};

		// when the state of the player changes, the youtube api will call this function
		function onPlayerStateChange( event ){

			switch ( event.data ) {
				case YT.PlayerState.PAUSED :
					$.event.trigger( { type : 'ytplayerapi:pause', videoId : opts.videoId, videoName : opts.videoName } );
					break;
				case YT.PlayerState.PLAYING :
					if ( notYetStarted === true ) {
						$.event.trigger( { type : 'ytplayerapi:begin', videoId : opts.videoId, videoName : opts.videoName } );
						notYetStarted = false;
					} else {
						$.event.trigger( { type : 'ytplayerapi:play', videoId : opts.videoId, videoName : opts.videoName } );
					}
					break;
				case YT.PlayerState.ENDED :
					$.event.trigger( { type : 'ytplayerapi:end', videoId : opts.videoId, videoName : opts.videoName } );
					break;

			}

		};

		// create our timer object ready to be ticked into action
		ytTimer = new YTProgressTimer( function(){

			var curTime = player.getCurrentTime();

			// for each time chunk we hit, we set the chunk to null so it's not triggered again and trigger the corresponding event
			for ( var chunk in opts.chunkYetElapsed ) {
				if ( opts.chunkYetElapsed[chunk] && ( curTime > opts.chunkYetElapsed[chunk] ) ) {
					opts.chunkYetElapsed[chunk] = null;
					$.event.trigger( { type : 'ytplayerapi:' + chunk, videoId : opts.videoId, videoName : opts.videoName } );
				}
			}

		}, 2000 );

		// add a few more timer event triggers for the general, basic player operations
		$( document ).on( {
			'ytplayerapi:pause' : function( evt ){
				ytTimer.clear();
			},
			'ytplayerapi:begin' : function( evt ){
				ytTimer.start();
			},
			'ytplayerapi:play'  : function( evt ){
				ytTimer.start();
			}
		} );

		//console.log('creating YT Player Object')
		// set up the player
		player = new YT.Player( opts.frameId, {
			events : {
				'onReady'       : onPlayerReady,
				'onStateChange' : onPlayerStateChange
			}
		} );

		return player;

	};

	return {
		listen 	: listenToFrame,
		init 	: initEventTracker
	}

}( this, document, $ ));

/**
 * These are the example listeners a client could use to call their own tracking scripts
 *
 * -- begin : first time play button invoked
 * -- pause : pause invoked
 * -- play : play button invoked
 * -- quarter : video passes 1/4 the way through - one time event
 * -- half : video passes 1/2 the way through - one time event
 * -- threequarter : video passes 3/4 the way through - one time event
 * -- end : video reaches end
 *
 $( document ).on({
    'ytplayerapi:begin' : function( evt ) {
        console.log('begin:' + evt.videoId)
    },
    'ytplayerapi:pause' : function( evt ) {
        console.log('pause:' + evt.videoId)
    },
    'ytplayerapi:play' : function( evt ) {
        console.log('play:' + evt.videoId)
    },
    'ytplayerapi:quarter' : function( evt ) {
        console.log('quarter:' + evt.videoId)
    },
    'ytplayerapi:half' : function( evt ) {
        console.log('half:' + evt.videoId)
    },
    'ytplayerapi:threequarter' : function( evt ) {
        console.log('threequarter:' + evt.videoId)
    },
    'ytplayerapi:end' : function( evt ) {
        console.log('end:' + evt.videoId)
    }
});

 **/
/**
 * NGX Insights
 *
 *   Insights.track('type:object', {Object});
 *   Insights.listen('type:object', {Function});
 *
 *   // TODO! add to our tracking - is this actually required, since we can track unreg'd events?
 *   Insights.register('type:object');
 */
var Insights = (function(w, d, $, undefined){
	"use strict";

    var conf = NGX.App.config,
        cntx = NGX.context,
        state = NGX.App.state;

	var eventBus, defaults, optional

		,alias = {
			// event
			"e": {
				"view"         : "v"
				,"share"       : "s"
				,"retweet"     : "s"
				,"invite"      : "i"
				,"conversion"  : "g"
				,"referral"    : "r"
				,"click"       : "ct"
				,"consume"     : "c"
				,"vote"        : "vo"
				,"network"     : "n"
				,"x"           : "x"
				,"comment"     : "cm"
				,"reply"       : "cm"
                ,"like"        : "lk"
                ,"favorite"    : "lk"
                ,"upvote"      : "lk"
                ,"plusone"     : "lk"
			}
			// object
			,"o": {
				"campaign"          : "c"
				,"display"          : "d"
				,"promo"            : "p"
				,"likeGate"         : "g"
				,"secondaryCta"     : "s"
				,"promotionDetails" : "pd"
				,"media"            : "m"
				,"channel"          : "ch"
				,"medium"           : "med"
				,"source"           : "src"
				,"link"             : "link"
				,"details"          : "dt"
                ,"contentitem"      : "ci"
				,"x"                : "x"
			}
		}

		,rules = {
			// event
			"v" : {
				// object: [required params]
				"c"   : ["c","i","dc","h"]
				,"d"  : ["dc","h"]
				,"p"  : ["c","p","dc","h"]
				,"g"  : ["dc","h"]
				,"ch" : ["h"]
                ,"ci" : ["c","h","dc","i"]
			}
			,"ct" : {
				"p"   : ["c","p","dc","h"]
				,"s"  : ["c","p","dc","h"]
				,"ci" : ["c","dc","h","link"]
			}
			,"i" : {
				"c"   : ["c","p","dc","h"]
			}
			,"s" : {
				"c"   : ["c","p","dc","h"],
				"ci"  : ["c","dc","h","a","i"]
			},
            "lk" : {
                "ci"  : ["ci","c","dc","h","a"]
            },
            "cm" : {
                "ci"  : ["ci","c","dc","h","a"]
            }
		}

	/**
	 * Event bus Class
	 * @param {String} id (we don't do anything with this, but would let us run concurrent buses)
	 */
		,Bus = function(id){
			this.id  = id;
			this.url = NGX.App.config.insightUrl + '/track.ngx?';
			this.delay = 200;
			_.extend(this, Backbone.Events); // underscore extend for Backbone.Events
			return this;
		}

	/**
	 * Create query string
	 * @param {Object} event parameter key:value pairs
	 */
		,buildQueryString = function(params) {
            var obj = $.extend({}, defaults, params) // jQuery extend is faster for simple objects than underscore/lodash in webkit. hipster libraries < browser vendors.
				,qs = ""
				,prop
				,propVal
				,noCache = "&" + Math.floor( Math.random() * 10000)
				,userName = 'Anonymous';


			// add user's FB name if we have it
			obj.u = (NGX.App.state.currentUser.userProfile)? (NGX.App.state.currentUser.userProfile.name || userName): userName;
			// process the object to create the string
            for (prop in obj) {
				// yeah there is an assignment in this condition. ignore JSHint, it's absolutely fine because i just told you about it. move along please.
				if (obj.hasOwnProperty(prop) && (propVal = obj[prop])) {
					// only accept strings and numbers here
					if (/(string|number)/.test(typeof propVal)) {
						qs += prop + '=' + encodeURIComponent(propVal) + '&';
					}
				}
			}

            // cleanup the URL, append noCache and return
			return ((/&$/.test(qs))? qs.substring(0, qs.length-1): qs) + noCache;
		}

	/**
	 * Map parameter values
	 * @param {Object} event parameter key:value pairs
	 */
		,paramsValMap = function(params) {
			var obj = {}
			// rename a parameter and it's content using alias and remove old property so we can extend using params
				,nameMap = function(a, b) {
					if (params[a]) {
						obj[b] = alias[b][params[a]];
						delete params[a];
					}
					return obj[b];
				}
			// add required parameters for an event/object combo
				,paramsRequired = function(e, o) {
					var req = (rules[e])? rules[e][o]: []
						,item
						,i = 0
						,len = (req)? req.length: 0;
					for (; i<len; i++) {
                        if (item = req[i]) {
                            obj[item] = optional[item];
						}
						item = false;
					}
				};

			paramsRequired(nameMap('event',  'e'), nameMap('object', 'o'));
			// currently overwites default parameters with params
            return $.extend(obj, params);
		}

	/**
	 * Handle anchor links clicks
	 * @param {Object} jQuery event
	 */
		,linkClick = function(e) {
			var el      = e.currentTarget
				,href   = el.getAttribute('href')
				,targ   = el.getAttribute('target')
				,clss   = el.getAttribute('class')
				,action = el.getAttribute('data-ngx-action')
				// open link location in it's specified target attribute
				,openInTarg = function(targ) {
					var targStr;
					if (targ) {
						targStr = ((targ[0] === '_')? targ.substring(1): targ).toLowerCase();
						// open in a new window
						if (targStr === 'blank') {
							var win = w.open(href, targ);
							if (win) {
								win.focus();
							}
							return false;
						}
						// window.self.location, window.top.location, window.parent.location...
						else if (w[targStr]) {
							w[targStr].location.href = href;
							return false;
						}
						// Likely to trigger an origin error in X-Frame-Options
						/*
						 else if (self.frames[t]) {
							 self.frames[t].location.href = href;
							 return false;
						 }
						 */
					}
					// if all else fails...
					w.location.href = href;
					return false;
				};
			// do not do anything if there is no href, the href="#" or it has data-ngx-action="route"
			if (!!href && href[0] !== '#' && action !== 'route') {
				e.preventDefault();
				// default params for a click (!! to handle null or "")
				Insights.track('click:'+((!!clss && clss.indexOf('xCTA'))? 'secondaryCta': 'link'), {
					"callback" : function(){
						openInTarg(targ);
					}
				});
			}
		}

	/**
	 * create an image
	 */
		,tempImg = function(src) {
			// image does not need to be attached to the DOM to load the SRC
			var img = d.createElement('img');
			img.setAttribute('src', src);
			return img;
		}

    /**
     * Create a cors request
     */

        ,corsRequest = function(obj,callback){
            var request = NGX.Util.createCORSRequest( "POST", conf.sharing.updateURL + '?' + $.param({
                ic    : 1,
                cID   : conf.id,
                apikey: cntx.apikey,
                fbid  : state.currentUser.fbid,
                channelId : (cntx.channel&&cntx.channel.id)?cntx.channel.id:"",
                target : obj.target,
                source : obj.source,
                medium : obj.medium,
                channel: obj.channel
            } ) ) ;
            if (request){
                request.send();
                if("function"===typeof callback){
                    callback.call(this)
                }
            }
        }


	/**
	 * initialise tracker
	 */
		,initialise = function(options){
			// populate default values
			defaults = $.extend({}, {
				"t": NGX.context.apikey
                ,"channel" : (NGX.context.track.channel)? NGX.context.track.channel: ''
                ,"medium" : (NGX.context.track.medium)? NGX.context.track.medium: ''
                ,"source" : (NGX.context.track.source)? NGX.context.track.source: ''
			}, options);
			// populate optional values (rule-driven)
			optional = {
				"dc" : (NGX.context.displayContainer)? NGX.context.displayContainer.id: ''
				,"c" : (NGX.App.config)? NGX.App.config.id: ''
				// these don't actually exist
				,"p" : (NGX.context.promotion)? NGX.context.promotion.id: ''
				,"h" : (NGX.context.channel)? NGX.context.channel.id: ''

			};
			// instantiate new tracking instance
			eventBus = new Bus('ngxDefault');
			// register default event types
			eventBus.registerEvents(['x:x','view:channel','view:campaign','view:display','view:promo','view:likeGate','view:secondaryCta','view:media','view:promotionDetails','view:contentitem','click:link','click:secondaryCta','click:promo','click:contentitem','consume:media','vote:campaign','vote:contentitem','retweet:contentitem','reply:contentitem','favorite:contentitem','share:display','share:contentitem','share:promotion','invite:display'],'track');
			eventBus.registerEvents(['share:campaign'],'trackShare');
			eventBus.registerEvents(['invite:campaign'],'trackInvite');

			// add the click handler to the page
			/*$(function(){
				$(d).on('click', 'a:not([data-insights="false"]>span)', linkClick);
			})*/
		};

	/**
	 * Add tracking to named events
	 * @param {Object} eventList can contain an array of strings or a single string
	 */
	Bus.prototype.registerEvents = function(eventList,method) {
		var i = 0
			,len
			,cn;
		if (eventList) {
			cn = eventList.constructor;
			if (cn === Array) {
				len = eventList.length;
				for (; i<len; i++) {
					this.on(eventList[i], this[method]);
				}
			}
			else if (cn === String) {
				this.on(eventList, this[method]);
			}
		}
	};

	/**
	 * Track event
	 * @param {Object} Event parameters
	 */
	Bus.prototype.track = function(params, queued) {
		// build the query string
        var obj  = paramsValMap(params)
			,qs  = buildQueryString(obj);
		// fire off the server request
        this.img = tempImg.call(this, this.url + qs);
		// trigger callback in global score if specified (passed the image)
		if (params.callback && params.callback.constructor === Function) {
			setTimeout(function(){
				params.callback(this.img);
			}, this.delay);
		}
	};

    /**
     * Track Share event
     * @param {Object} Event parameters
     */
    Bus.prototype.trackShare = function(params, queued) {
        // build the query string
        var obj = $.extend({}, defaults, paramsValMap(params))

        if ( NGX.App.config.sharing.updateURL){
            // modified updateShares code

            // fire off the server request
            corsRequest.call(this,obj,function(){
                // trigger callback in global score if specified (passed the image)
                if (params.callback && params.callback.constructor === Function) {
                    setTimeout(function(){
                        params.callback(this.img);
                    }, this.delay);
                }
            });

        } else{
            // Do what here?
        }




    };

    return {
        //Events : eventBus, // do not expose this
		init  : initialise // called at end of _page_display_context.gsp
        ,track: function(eventName, params) {
            var evtObj = eventName.split(':')
				,paramObj = {
					event   : evtObj[0]
					,object : evtObj[1]
				};
			// we enforce the event/object name even if an alternative is passed
			eventBus.trigger(eventName, $.extend({}, params, paramObj));
		}
        ,listen: function(eventName, fn) {
			if (eventName && fn.constructor === Function) {
				eventBus.on(eventName, fn);
			}
		}
		,register: function(params) {
			eventBus.registerEvents(params);
		}
	};

}(this, document, $));
;
NGX.Virality = (function( w, d, $, _, undefined ){

	var $body = $( 'body' ),
		$window = $( w ),
		conf = NGX.App.config,
		cntx = NGX.context,
		state = NGX.App.state,

	// Facebook stuff

		facebook = (function(){

			var inviteConfig = {
					defaultMessage  : 'Invite Friends',						// using a new attribute to make it easier to separate off the old on (inviteDialog) when we're sure it's no longer needed
					// TODO: get this from message bundles
                    failureDialog: {
                        msg         : NGX.lang.get('permissions.error.message'),
                        title       : NGX.lang.get('permissions.error.title'),
                        closeBtnText: NGX.lang.get('buttons.overlayClose')
                    },
                    previewDialog: {
                        title       : 'Preview Mode: Invite Dialog',
                        msg         : 'When live, the Invite Friends tabs and buttons would display the Facebook Invite Dialog',
                        closeBtnText: NGX.lang.get('buttons.overlayClose')
                    },
                    inviteDialog : {
                        title   : 'Invite friends',
                        message : 'Invite friends',
                        helpText: 'This dialog will invite friends by posting to their wall'
                    }
				},

				inviteCallbackFn, // TODO: add default values and/or pull from JSON message bundles when they exist.

				inviteSubmit = function( data ){
					var request;
					if (cntx.isPreview){ data.preview = true }
					if (cntx.guid !== ''){ data.guid = cntx.guid }
					request = NGX.Util.createCORSRequest( "POST", conf.invites.updateURL + '?' + $.param( data ) );
					if (request){
						request.onload = function(){
							if (typeof inviteCallbackFn === "function"){
								inviteCallbackFn();
							}
						};
						request.send();
					}
				},

				inviteCallback = function( response ){
					var friendsStr, friendsEl = d.getElementById( 'ngxInvitedFriends' );
					if (response && response.request){
						_.each( response.to, function( val ){
							NGX.App.state.currentUser.invitedFriends.push( val );
						} );
						friendsStr = state.currentUser.invitedFriends.join( ',' );
						if (friendsEl){
							friendsEl.value = friendsStr;
						}
						inviteSubmit( {
							ngxInvitedFriends: friendsStr,
							ic               : response.to.length,
							cID              : conf.id,
							apikey           : cntx.apikey,
							fbid             : state.currentUser.userSession.authResponse.userID,
                            channelId : cntx.channel.id||"",
                            source : cntx.track.source,
                            medium : cntx.track.medium,
                            channel: cntx.track.channel
						} );
					//Insights.track('invite:campaign');
				}
		    },

            inviteDialog = function( response ){
                var fbContext = NGX.context.fb,
                    appConfig = NGX.App.config;
                if (response && response.status === 'connected'){
                    var obj = {
                        message 	   : appConfig.sharing.inviteText || inviteConfig.defaultMessage,				// use the 'invite friends' message as a fallback
                        max_recipients: conf.invites.maxInvites - state.currentUser.invitedFriends.length,
                        exclude_ids   : state.currentUser.invitedFriends,
                        method        : 'apprequests',
                        data          : {
                            url: cntx.smarturl || document.location.href,
                            r  : NGX.Util.getRefCookie( {c_name: 'ngx'} )	// referrer tracer
                        }
                    };

                    // the 'data' attribute must be passed as a string, not a JSON obj
                    obj.data = JSON.stringify( obj.data );

                    // display the facebook invite overlay
                    // TODO: show different overlay in preview mode
                    FB.ui( obj, inviteCallback );

                } else {
                    // display modal if user is not auth'd, and template is present.
                    var inviteTemplate = NGX.App.api.getTemplate( 'inviteModal' );
                    if (inviteTemplate){
                        NGX.overlay.create( {
                            type    : 'modal',
                            template: inviteTemplate,
                            content : {
                                msg         : NGX.lang.get('permissions.error.message'),
                                title       : NGX.lang.get('permissions.error.title'),
                                closeBtnText: NGX.lang.get('buttons.overlayClose')
                            }
                        } );
                    }
                }
            },

            inviteInit = function( options, callback ){
                $.extend( inviteConfig, options );
                inviteCallbackFn = callback;
                NGX.Util.fbLogin( inviteDialog, { timing: 'submit' } );
            }

			return {
				invite        : inviteInit,
				inviteCallback: inviteDialog
			}

		}());

	return {

		// TODO: re-examine actionLink, actionText and noAction; they're very old concepts and can probably be very carefully removed entirely from the codebase
		facebookShare: function( config ){
			if (NGX.App.state.fbLoaded){
				var uiConfig = {
					method     : 'feed',
					name       : config.name,
					'link'     : NGX.Util.addRefCookie( {
						link  : config.link,
						c_name: 'ngx'
					} ),
					source     : config.picture,
					caption    : config.caption,
					description: config.description
				};

				// TODO: re-examine actionLink, actionText and noAction; they're very old concepts and can probably be very carefully removed entirely from the codebase
				if (config.noAction === true || ((config.actionLink && config.actionLink !== '') && (config.actionText && config.actionText != ""))){
					uiConfig.actions = {
						'name': config.actionText,
						'link': NGX.Util.addRefCookie( {
							link  : config.link ? config.link : config.actionlink,
							c_name: 'ngx'
						} )
					}
				}
				FB.ui( uiConfig, function( response ){
					if (response && response.post_id ) {
                        /* OLD SHARE TRACKING METHOD - CAN WE DELETE? [SG]
						if ( conf.sharing.updateURL){
                            // modified updateShares code
							var request = NGX.Util.createCORSRequest( "POST", conf.sharing.updateURL + '?' + $.param( {
								ic    : 1,
								cID   : conf.id,
								apikey: cntx.apikey,
								fbid  : state.currentUser.userSession.authResponse.userID,
                                channelId : (cntx.channel&&cntx.channel.id)?cntx.channel.id:""
							} ) );
							if (request){
								request.send();
							}
						} else{
							// if we don't have the sharing URL, trigger a regular tracking event
							Insights.track( 'share:campaign', {
								medium : (NGX.context.isFB ? 'facebook' : 'web'),
								a      : 'posttowall',
								post_id: response.post_id
							} );
						} */
					}
                });
            }
        },

		twitterInit: function( config ){
			return true
		},

		twitterShare: function( config ){},

		inviteFBFriends: facebook.invite,

		// trigger the invite callback without NGX.Util.fbLogin
		inviteFBDialog : facebook.inviteCallback
	}

}( this, document, $, _ ));
// Utility function to check whether selector returns anything
function exists(selectorResult) {
	return selectorResult.length !== 0;
}

// Reorganise the markup
function prepareTooltip(ttApi) {

	var sourceName = $(ttApi.getTrigger()).data("ngxsourcename");
	var sourceLink = $(ttApi.getTrigger()).data("ngxsourcelink");

	var tip = ttApi.getTip();

	// check if the wrapper div for the tooltip text has already been added - avoid adding text multiple times
	if (exists($('div.textWrapper', tip))) {
		return;
	}

	var content = tip.text();

	// remove the existing text content
	tip.contents().filter( function() {
			return this.nodeType == 3; //Node.TEXT_NODE
		}
	).remove();

	// add it back inside a wrapper and add other markup
	var nameDiv = (sourceName === "") ? "" : $("<div/>").addClass('sourceName').append(sourceName);
	var hr = (sourceName === "") ? "" : $('<hr/>').addClass('fadeLine');
	var contentDiv = $('<div/>').addClass('mainContent').append(content);

	$('<div/>').addClass('textWrapper').append(nameDiv).append(hr).append(contentDiv).prependTo(tip);

	// for ugc there is no link back to the original source
	if (sourceLink !== "") {
		$(tip).click(function() {
			window.open(sourceLink);
			return false;
		});
	}
}

function textElision(ttApi) {

	var tip = ttApi.getTip();
	var trigger = ttApi.getTrigger();
	// set visibility to hidden whilst text is trimmed
	$(tip).css('visibility', 'hidden');
	// ensure trigger remains fully opaque when user mouses out into tooltip
	$(trigger).css('filter', 'alpha(opacity=100)').css('-moz-opacity', '1').css('-khtml-opacity', '1').css('opacity', '1');

	var tipHeight = tip.height();

	while ($('div.textWrapper', tip).outerHeight() > tipHeight) {
		$('div.mainContent', tip).text(function (index, text) {
			// if there is no whitespace in the String need to truncate character by character
			var charCheck = (text.match(/\s/) != null);
			if(charCheck) {
				// use \W{0,3} to handle non-ASCII charsets
				return text.replace(/\W{0,3}\s(\S)*$/, '...');
			} else {
				return text.substring(0, (text.length - 1)).replace(/.{3}$/, '...');
			}
		});
	}

	$(tip).css('visibility', 'visible');
}

function hideTooltip(ttApi) {
	$(ttApi.getTrigger()).css('filter', 'alpha(opacity=70)').css('-moz-opacity', '0.70').css('-khtml-opacity', '0.70').css('opacity', '0.70');
}


(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.on(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).on(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.off(p[0]).on(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.off(p[1]).on(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);

/* jQuery Tools - tooltips dynamic plugin */
(function(a){var b=a.tools.tooltip;b.dynamic={conf:{classNames:"top right bottom left"}};function c(b){var c=a(window),d=c.width()+c.scrollLeft(),e=c.height()+c.scrollTop();return[b.offset().top<=c.scrollTop(),d<=b.offset().left+b.width(),e<=b.offset().top+b.height(),c.scrollLeft()>=b.offset().left]}function d(a){var b=a.length;while(b--)if(a[b])return!1;return!0}a.fn.dynamic=function(e){typeof e=="number"&&(e={speed:e}),e=a.extend({},b.dynamic.conf,e);var f=a.extend(!0,{},e),g=e.classNames.split(/\s/),h;this.each(function(){var b=a(this).tooltip().onBeforeShow(function(b,e){var i=this.getTip(),j=this.getConf();h||(h=[j.position[0],j.position[1],j.offset[0],j.offset[1],a.extend({},j)]),a.extend(j,h[4]),j.position=[h[0],h[1]],j.offset=[h[2],h[3]],i.css({visibility:"hidden",position:"absolute",top:e.top,left:e.left}).show();var k=a.extend(!0,{},f),l=c(i);if(!d(l)){l[2]&&(a.extend(j,k.top),j.position[0]="top",i.addClass(g[0])),l[3]&&(a.extend(j,k.right),j.position[1]="right",i.addClass(g[1])),l[0]&&(a.extend(j,k.bottom),j.position[0]="bottom",i.addClass(g[2])),l[1]&&(a.extend(j,k.left),j.position[1]="left",i.addClass(g[3]));if(l[0]||l[2])j.offset[0]*=-1;if(l[1]||l[3])j.offset[1]*=-1}i.css({visibility:"visible"}).hide()});b.onBeforeShow(function(){var a=this.getConf(),b=this.getTip();setTimeout(function(){a.position=[h[0],h[1]],a.offset=[h[2],h[3]]},0)}),b.onHide(function(){var a=this.getTip();a.removeClass(e.classNames)}),ret=b});return e.api?ret:this}})(jQuery);

/**
 * displays metrics for quiz questions
 *
 */
var ngxQuizMetricDisplay = (function(d, w, $) {
	"use strict";
	//example data
	/*var oneMetricDataExample = {
	 "title":"Quiz Metrics",
	 "status":"ok",
	 "statusmsg":"...",
	 "statuscode":"...",
	 "count":1,
	 "content":[{label: "Quiz question?",values: [{label: "Answer 1",value: 50},{label: "Answer 2",value: 100}]}]
	 }*/

	//default config
	var config = {
			url: "",
			el : "",
			metricData: null,
			animationDuration: 1000,
			countDisplayType: "percent", //'percent'/'value'
			minMetricWidthPercent: 0
		},

	//create the metric object, copy the default config and use the new properties from obj if they are given
	Metric = function(obj) {
		$.extend(true, this, config, obj); //copy the config
	};

	// get min, max and total count values
	Metric.prototype.getMetricExtremes = function(metricData){
		var total = 0, max = Number.MAX_VALUE * -1, min = Number.MAX_VALUE ;

		var i, m, answers = metricData.values, len = answers.length;
		for (i = 0; i < len ; i++){
			m = answers[i];
			total += m.value;
			if (m.value > max){
				max = m.value;
			}
			if (m.value < min){
				min = m.value;
			}
		}

		return {total: total, min: min, max: max};
	}

	/**
	 * when rounding percetages to int numbers, we can easily go over 100%, so the next function will properly round the percentages
	 * the idea behind rounding: compute the offset that comes out when rounding, then sort the items by rounding difference, then make the additions and finally sort it back to original order and return the values
	 */
	Metric.prototype.roundPercentages = function(l, target) {
		var off = target - _.reduce(l, function(acc, x) { return acc + Math.round(x) }, 0); //difference between the target value and sum of rounded values
		return _.chain(l).
			map(function(x, i){return {v: x, idx: i}}).//keep the original index
			sortBy(function(x) { return Math.round(x.v) - x.v }). //sort the items based on rounding that will happen
			map(function(x, i) { return {v: Math.round(x.v) + (off > i) - (i >= (l.length + off)), idx: x.idx} }). //add a portion of the offset to the percentage and also keep the original order index
			sortBy(function(x) { return x.idx }). //sort to original order
			pluck('v'). //get the values
			value();
	}

	Metric.prototype.getRoundPercentages = function(values, metricsExtremes) {
		var p = _.map(values, function(m){ return (m.value * 100 / metricsExtremes.total) || 0});
		return this.roundPercentages(p, 100);
	}

	//computes the data needed for one metric graph
	Metric.prototype.computeMetricData = function(metricData, metricsExtremes, animationPercent, finalDisplayPercent){
		var metricWidthPercent, metricValue, displayPercent;
		//metricWidthPercent = Math.floor(metricData.value * 100 / metricsExtremes.max) || 0;  //max metric will be presented as full width and all other metric bars will be relative to longest bar
		metricWidthPercent = Math.floor(metricData.value * 100 / metricsExtremes.total) || 0; //metric bars will be relative to 100% instead of longest bar
		displayPercent = Math.round(metricData.value * 100 / metricsExtremes.total) || 0;

		if (finalDisplayPercent){ //on last item, make sure the total of percentages is 100
			displayPercent = (metricsExtremes.total == 0)? 0 : finalDisplayPercent;
		}
		metricValue = (this.countDisplayType == "percent")? Math.round(displayPercent * animationPercent / 100) + "%" : Math.round(metricData.value * animationPercent / 100);

		return $.extend(true, {}, metricData, {displayPercent: displayPercent, metricWidth: (Math.max(this.minMetricWidthPercent, metricWidthPercent) * animationPercent / 100) + "%", metricValue: metricValue, extraClass: (metricData.value == metricsExtremes.max)? "xFormMetricItemMaxScore" : ""})
	}

	//function will produce the graph html at a given animation percent
	Metric.prototype.createGraphHtml = function(metricData, metricsExtremes, animationPercent, displayEmbed, roundedPercentages){
		var metricsHtml = '', i, m, metrics = metricData.values, len = metrics.length, metricWidthPercent, metricValue, displayPercent;
		var componentTemplate = NGX.App.api.getTemplate('metricComponent'), metricTemplate = NGX.App.api.getTemplate('metricTemplate'), itemGraphTemplate = NGX.App.api.getTemplate('metricItemGraph');
		for (i = 0; i < len ; i++){
			m = metrics[i];
			if (displayEmbed && m.imageAssetRef){
				m.imageAssetUrl = m.imageAssetRef.split(":")[3];
			}
			if (!(displayEmbed && m.embedCode)){
				delete(m.embedCode);
			}

			var mTempModel = this.computeMetricData(m, metricsExtremes, animationPercent, (roundedPercentages != null)? roundedPercentages[i] : 0);
			mTempModel.itemGraph = itemGraphTemplate(mTempModel);
			metricsHtml += metricTemplate(mTempModel) + "\n";
		}

		var mCompModel = {label: metricData.label, metricsHtml: metricsHtml};
		var mCompContent = componentTemplate(mCompModel);
		return mCompContent
	}

	//creates the metric graph, using animation if configured
	Metric.prototype.createGraph = function(metricData, displayEmbed){
		var metricsExtremes = this.getMetricExtremes(metricData), _mSelf = this, roundedPercentages = this.getRoundPercentages(metricData.values, metricsExtremes);
		if (this.animationDuration && this.animationDuration > 0){
			var itemGraphTemplate = NGX.App.api.getTemplate('metricItemGraph'), i, len;
			//draw the whole graph, but with the animation start point set to 0
			$("<div/>").addClass('xMetricWrapper').html(_mSelf.createGraphHtml(metricData, metricsExtremes, 0, displayEmbed)).appendTo($(_mSelf.el));
			var animator = $("<div>").appendTo($(this.el));
			animator.css("opacity", "0.0");
			animator.animate({
				opacity: 1.0
			},{
				step: function(now) {
					//animate each graph bar one by one
					var graphs = $('.xFormMetricItemGraphWrapper', $(_mSelf.el));
					len = graphs.length;
					for (i = 0; i < len; i++){
						var mTempModel = _mSelf.computeMetricData(metricData.values[i], metricsExtremes, now * 100, (now == 1)? roundedPercentages[i] : 0);
						$(graphs[i]).html(itemGraphTemplate(mTempModel));
					}
				},
				complete: function() {
					animator.remove();
				},
				duration: _mSelf.animationDuration
			});
		} else {
			$("<div/>").addClass('xMetricWrapper').html(_mSelf.createGraphHtml(metricData, metricsExtremes, 100, displayEmbed, roundedPercentages)).appendTo($(_mSelf.el));
		}
	}

	//create metrics for one poll field, using the data passed in or loaded from a url
	function createMetric(obj){
		var metric = new Metric(obj);

		if (metric.metricData){
			metric.createGraph(metric.metricData, obj.displayEmbed);
		} else if (metric.url){
			$.ajax({
				url: metric.url,
				dataType: 'json',
				cache: false,
				success: function(data){
					if (data && data.status == 'ok'){
						metric.createGraph(data.content[0], obj.displayEmbed);
					}
				},
				error:function(data){
					//resolve error
				}
			});
		}

	}

	//find metric by id
	function getMetricIdxById(metrics, id){
		var i, len = metrics.length;
		for (i = 0; i < len; i++){
			if (metrics[i].id == id){
				return i;
			}
		}
		return -1;
	}

	//create a list of form metrics
	function displayMetricList(obj, data){
		if (data && data.status == 'ok'){
			var i, j, m, metrics = data.content, len = metrics.length, metricIds = obj.metricIds, mIdLen = metricIds.length, mObjIdx;
			for (j = 0; j < mIdLen; j++){
				if (metricIds[j].questionId){
					mObjIdx = getMetricIdxById(metrics, metricIds[j].questionId);
					if (mObjIdx > -1){
						createMetric({el: metricIds[j].el, metricData: metrics[mObjIdx], displayEmbed: obj.displayEmbed});
					}
				} else {
					createMetric({el: metricIds[j].el, metricData: metrics[j], displayEmbed: obj.displayEmbed});
				}
			}
		}
	}

	//load data from url or use data passed in to create a list of metrics
	function createFormMetrics(obj){

		if (obj.metricData){
			displayMetricList(obj, obj.metricData)
		} else if (obj.url){
			$.ajax({
				url: obj.url,
				dataType: 'json',
				cache: false,
				success: function(data){
					displayMetricList(obj, data)
				},
				error:function(data){
					//resolve error
				}
			});
		}
	}

	return {
		createMetric: function(config) {
			createMetric(config);
		},
		createFormMetrics : function (config){
			createFormMetrics(config);
		}
	}

}(document, window, $));
/**

	Backbone item list boilerplate

*/

(function() {

	var ItemModel,
		ItemView,
		ItemList,
		ComponentView;

	ItemModel = Backbone.Model.extend();

	ItemView = Backbone.View.extend({
		// TODO: tagname should probably be configurable ;)
		initialize: function(o) {
		    this.template = o.template;
		},
		render: function() {
            var _attr = this.model.attributes,
			    obj = _attr.reward;

			obj.type = obj.itemClass;

			// move the coupon code object into the root if there is one present
			if (_attr.code) {
				obj.code = _attr.code;
			}

            if(obj.offer && obj.offer.action){
                obj.target = {
                    object : v4.isAssetRef(obj.offer.action)?NGX.Util.assetFromRef(obj.offer.action).src:obj.offer.action,
                    text   : obj.offer.heading || obj.heading
                }
            }

			// decode asset ref urls for rendering
			if (obj.assets) {
				if (obj.assets.main) obj.badgeSrc = NGX.Util.assetFromRef( obj.assets.main ).src;
				if (obj.assets.thumbnail) obj.badgeThumb = NGX.Util.assetFromRef( obj.assets.thumbnail ).src;
				if (obj.assets.background) obj.badgeBg = NGX.Util.assetFromRef( obj.assets.background ).src;
			}

            if(obj.userInfo.isEligible){
                obj.isEligible = true
            }

            if(_attr.redemptionStatus.id==="status.redemption.claimed"){
                obj.isEntitled = true
            }

			var html = this.template( obj );
            this.setElement( $( html.trim() ) )
			return this;
		}
	});

	ItemList = Backbone.Collection.extend({
		// url parameters are taken from NGX.context and handled by the fetch
		url   : '/display/api/entitlement/campaign',
		model : ItemModel,
		// we override the parse method because our model definition objects is nested in response.content
		parse : function(response) {
			return response.content;
		}
	});

	ComponentView = Backbone.View.extend({
		initialize: function() {
			_.bindAll( this, 'createCollection', 'storeJson', 'addAll', 'addItem' );
			// TODO: the xRewardsList and xRewardRow prefixes should be set in the component model on app:ready so this is more agnostic
			this.$list = $('.xContainerInner', '#xRewardsList_' + this.el.id);
			this.itemTemplate = NGX.App.api.getTemplate( 'itemRewardInline' );
            var boundFunction = function() {
                this.createCollection( 'items' );
            }.bind(this);

            if (NGX.App.state.currentUser.accessToken) {
                boundFunction();
            } else {
                NGX.App.Events.on('fb:ready', boundFunction);
            }

		},
		// create a named collection within this view
		createCollection: function(name) {
			var list = this[name] = new ItemList({
					el: this.$list
				}),
				params = {
					apikey     : NGX.context.apikey,
					guid       : NGX.context.guid,
					campaignId : NGX.App.config.id,
                    fbid       : NGX.App.state.currentUser.fbid||"",
                    nocache    : Math.random()
				};
			// if we're in preview mode pass the paramter
			if (NGX.context.isPreview === true) {
				params.preview = true;
			}
			this.listenTo(list, 'reset', this.addAll);
			this.listenTo(list, 'add', this.addItem);
			list.fetch({
				success: this.storeJson,
				data: params
			});
		},
		// storeJson is used for list item sharing
		storeJson: function(collection, response) {
			this.model.set('response', response.content);
		},
		// build & render views for a whole collection
		addAll: function(collection) {
			_.each(collection.models, function(model) {
				this.addItem( model )
			}, this);
		},
		// build and render an item view from its model
		addItem: function(model) {
			var obj = {
				model: model,
				template: this.itemTemplate
			};
			this.$list.append( new ItemView( obj ).render().el );
		}
	});

	// register new view against a component type
	NGX.App.api.registerView('myrewards',  ComponentView);

}());

/**
 * Social Advocacy - common components
 */

(function(root, doc, $) {

	// check if the isotope components have completed (re-)layout

	var publishLayoutCompleteEvent = function(msg) {
		var message = ("undefined" === typeof msg? "windowLayoutComplete" : msg),
			timeout = null,
			checkIsotopeComplete = function() {
				if (root.SOCIALHUB && !root.SOCIALHUB.isotopeComplete()) {
					clearTimeout(timeout);
					timeout = setTimeout(checkIsotopeComplete, 250);
				} else {
					timeout = setTimeout(layoutComplete, 500);
				}
			},
			layoutComplete = function() {
				clearTimeout(timeout);
				$.event.trigger({ type: "windowLayoutComplete", message: message });
				if (root.SOCIALHUB) {
					root.SOCIALHUB.reset();
				}
			};
		checkIsotopeComplete();
	};

	// create the global social hub object if one does not exist

	root.SOCIALHUB = root.SOCIALHUB || (function(){
		var isotopeCounterArr = [];
		return {
			aMDLComponentCount: function() {
				return $('.xTemplateMasonry.xGridTarget').length;
			},
			registerIsotopeCallback: function(moduleId) {
				isotopeCounterArr.push(moduleId);
			},
			reset: function() {
				isotopeCounterArr.length = 0;
			},
			isotopeComplete: function() {
				return this.aMDLComponentCount() == isotopeCounterArr.length;
			}
		}
	}());

	// add smart resize & publish event on window resize

	$.fn.smartresize = function(fn){
		return fn ? this.bind('resize', _.debounce(fn, 250)) : this.trigger('smartresize');
	};

	$(root).smartresize(function() {
		publishLayoutCompleteEvent();
	});

	// publish event on document ready (first load)

	$(doc).ready(function() {
		publishLayoutCompleteEvent("documentReady");
	});

}(window, document, $));

/**
 * Social Advocacy - isotope responsive functionality
 */


$.extend( $.Isotope.prototype, {

	_responsiveReset : function() {
		var responsiveOptions = this.options[this.options.layoutMode], i;
		// layout-specific props
		this.responsive = {};
		// copy over options for responsive layout
		for(var propertyName in responsiveOptions) {
			this.responsive[propertyName] = responsiveOptions[propertyName];
		}
		// FIXME shouldn't have to call this again << note from Isotope Masonry code
		this._getSegments();
		i = this.responsive.cols;
		this.responsive.colYs = [];
		while (i--) {
			this.responsive.colYs.push( 0 );
		}
	},

	// todo: this has been partially refactored, feels more responsive but no actual tests done.

	_responsiveLayout : function( $elems ) {

		var instance = this,
			props = instance.responsive,
			_pres = props.presentationFormats,
			_cols = props.cols,
			_colW = props.columnWidth,
			getRoundVal = function(val) {
				// for some reason this always uses columnWidth?
				return Math.floor( (Math.min(_cols, val) * _colW) - (2 * props.margin) );
			};

		$elems.each(function(){

			// isotope requires the jQuery wrapped element
			var $this = $(this), colSpan;

			for (var propertyName in _pres) {
				// if the current element matches a presentation type
				if ( $this.hasClass('xDisplay'+propertyName) ) {
					// get property value
					var prop = _pres[propertyName];
					// set the element size
					this.style.width  = getRoundVal(prop.wUnits) + 'px';
					this.style.height = getRoundVal(prop.hUnits) + 'px';
					// update dynColCount class on element
					v4.updateClassByPrefix(this, 'dynColCount', _cols);
					// no need to carry on
					break;
				}
			}

			// calculate how many columns the block spans
			colSpan = Math.min( Math.ceil( $this.outerWidth(true) / _colW ), _cols );

			// if brick spans only one column, just like singleMode
			if ( colSpan === 1 ) {
				instance._responsivePlaceBrick( $this, props.colYs );
			}
			// brick spans more than one column
			else {
				// how many different places could this brick fit horizontally
				var groupCount = props.cols + 1 - colSpan, groupY = [], groupColY, i = 0;
				// for each group potential horizontal position
				for (; i < groupCount; i++) {
					// make an array of colY values for that one group
					groupColY = props.colYs.slice( i, i + colSpan );
					// and get the max value of the array
					groupY.push( Math.max.apply( Math, groupColY ) );
				}
				instance._responsivePlaceBrick( $this, groupY );
			}
		});

	},

	// worker method that places brick in the columnSet
	// with the the minY
	_responsivePlaceBrick : function( $brick, setY ) {
		// get the minimum Y value from the columns
		var minimumY = Math.min.apply( Math, setY ), shortCol = 0;

		// Find index of short column, the first from the left
		for (var i=0, len = setY.length; i < len; i++) {
			if ( setY[i] === minimumY ) {
				shortCol = i;
				break;
			}
		}

		// position the brick
		var x = this.responsive.columnWidth * shortCol;
		this._pushPosition( $brick, x, minimumY );

		// apply setHeight to necessary columns
		var setSpan = this.responsive.cols + 1 - len;
		for ( i=0; i < setSpan; i++ ) {
			this.responsive.colYs[ shortCol + i ] = ( minimumY + $brick.outerHeight(true) );
		}
	},

	_responsiveGetContainerSize : function() {
		return { height: Math.max.apply( Math, this.responsive.colYs ) };
	},

	_responsiveResizeChanged : function() {
		return this._checkIfSegmentsChanged();
	}
});
var Mosaic = function(domId){

    // Static variables
    var avatarWidths = [45,46,47,48,49,50,51,52,53],
        minHeight    = 300;


    // Internal methods
    var requiredNumberOfNodes = function(){
            var dimensions = gridUnitDimension();
            // get the height based on the existing avatar nodes
            var rows = Math.floor(nodes().length / Math.floor(containerWidth() / dimensions));
            // height with available nodes i.e is padding of the collection required
            var numberOfRows = Math.ceil(Math.max(minHeight,dimensions*rows)/dimensions);
            return unitsPerRow()*numberOfRows;
        },
        containerWidth = function(){
            return $('.xGridPlaceholder',this.$module).innerWidth();
        },
        gridUnitDimension = function(){
            var gridUnitDimension,
                remainder = Math.max.apply(null, avatarWidths),
                width = containerWidth(),
                len = avatarWidths.length,
                i = 0;
            for (; i < len; i++) {
                var test = width % avatarWidths[i];
                if (test < remainder) {
                    remainder = test;
                    gridUnitDimension = avatarWidths[i];
                }
            }
            return gridUnitDimension;
        },
        unitsPerRow = function(){
            return Math.floor(containerWidth()/gridUnitDimension());
        },
        rows = function(){
            return Math.floor(requiredNumberOfNodes() / Math.floor(containerWidth() / gridUnitDimension()));
        },
        moduleHeight = function(){
            return rows() * gridUnitDimension();
        },
        nodes = function(){
            return $('.xItem', $('.xGridPlaceholder','#'+domId));
        },
        randomiseArray = function( inputArr ){
            // randomise array using Fisher Yates http://sedition.com/perl/javascript-fy.html
            var i = inputArr.length, j, tempi, tempj;
            if ( i == 0 ) return false;
            while ( --i ) {
                j = Math.floor( Math.random() * ( i + 1 ) );
                tempi = inputArr[i];
                tempj = inputArr[j];
                inputArr[i] = tempj;
                inputArr[j] = tempi;
            }
            return inputArr;
        },
        processNodesToDisplay = function( $el ){
            var reqNodes = requiredNumberOfNodes(),
                arr = [];

            while (arr.length < reqNodes) {
                var newArr = nodes().clone().get().slice(0);
                // copy the original nodes array to pad out to the required number of nodes
                arr = arr.concat(newArr);
            }
            while (arr.length > reqNodes) {
                var domObj = arr.pop(); // remove item from array
            }

            $el.find('.xContainerInner').append( $( randomiseArray(arr) ) );
        };

// Public methods

    this.$module = $('#'+domId);
    this.$placeholder = $('.xGridPlaceholder',this.$module);
    this.$avatarGridCell = this.$module.parents('.xCell');

    this.init = function(){

        this.$avatarGridCell.css({
            opacity:0,
            backgroundColor:'transparent'
        });

        this.$placeholder.css({
            height:0,
            overflow:'hidden'
        });

        var $grid = $('.xGridTarget',this.$module),
            dimensionPx = gridUnitDimension();

        processNodesToDisplay($grid);

        $('.xMediaAvatar',this.$module).css({
            width :dimensionPx,
            height:dimensionPx
        });

        $grid.css('visibility','visible');
        this.$avatarGridCell.animate({opacity:1},1000);

        this.tooltips = new MosaicTip(domId);
        this.tooltips.addTooltips();

    };

    this.reset = function(){
        this.$module.find('.xGridTarget .xContainerInner').html('');
        this.init();
    };

    this.containerWidth = containerWidth;
    this.gridUnitDimension = gridUnitDimension;

};





var MosaicTip = function(domId){

    var _id = domId,
        _ttip, _timer,
        autoTriggerFlag = "autoTriggerFlag";

    var mosaic = function(){
            return $('.xGridTarget .xContainerInner','#'+_id);
        },
        wrapper = function(){
            return mosaic().closest('.xCellInner')
        },
        avatars = function(){
            return mosaic().find('img.xMediaAvatar')
        },
        avatarFirst = function(){
            var list = mosaic()[0].getElementsByTagName('IMG'),
                len  = list.length,
                i    = 0;
            for(;i<len;i++){
                if($(list[i]).hasClass('xMediaAvatar')) return $(list[i]);
            }
            return avatars().first();
        },
        visibleAvatarLength = function(actualLen){
            var $wrap  = wrapper(),
                $first = avatarFirst();

            return Math.min( Math.floor( ($wrap.height() / $first.height()) / $first.height() ) * ($wrap.width() / $first.width()), actualLen );
        };

    var showTooltip = function(e){
        var updateTooltip = function(el){
            if('function'===typeof el.getAttribute && _ttip.qtip('api')){
                if(el.getAttribute('data-ngxsourcename')){
                    _ttip.trigger('show');
                    _ttip.qtip('api').set({
                        'position.target' : el,
                        'style.classes'   : 'qtip-bootstrap '+el.getAttribute('data-ngxnetwork'),
                        'content.title'   : el.getAttribute('data-ngxsourcename')||'',
                        'content.text'    : el.getAttribute('data-ngxtitle')||''
                    });

                }
            }
        },
        getRandomAvatar = function(){
            var _avID = Math.floor( Math.random() * visibleAvatarLength( avatars().length) );
            return avatars().eq( _avID );
        };

        if('undefined'!==typeof e && e.currentTarget){
            updateTooltip(e.currentTarget);
            return true;
        } else if(mosaic().data(autoTriggerFlag)===true){
            updateTooltip( getRandomAvatar() );
            triggerTimer();
            return true;
        }
        return false;
    };

    var resetTimer = function(){
            clearTimeout(_timer);
        },
        triggerTimer = function(){
            resetTimer();
            _timer = setTimeout( showTooltip, 7500);
        },
        preventAuto = function(){
            resetTimer();
            mosaic().data(autoTriggerFlag,false);
        },
        initialiseTimer = function(){
            //_ttip.trigger('hide');
            mosaic().data(autoTriggerFlag,true);
            triggerTimer();
        };

    var addTooltips = function(){
        var $initial;
        if( 'undefined' === typeof _ttip ){
            $initial = avatarFirst();
            _ttip = mosaic().qtip({
                content: {
                    title : '',
                    text  : ''
                },
                position: {
                    target : $initial,
                    effect : false,
                    my     : 'top center',
                    at     : 'bottom center',
                    viewport: mosaic()
                },
                show : {
                    ready: true,
                    delay: 0,
                    event: 'show'
                },
                hide : {
                    event: 'hide'
                },
                style: {
                    classes: 'qtip-bootstrap '+$initial.attr('data-ngxnetwork')
                }
            });
        } else {
            showTooltip();
        }

        wrapper()
            .on('mouseenter',preventAuto)
            .on('mouseleave',initialiseTimer);
        avatars()
            .on('mouseenter',showTooltip);
    };

    this.init = initialiseTimer;
    this.addTooltips = addTooltips;

};



Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {
    if (arguments.length < 3){
        throw new Error( "Handlebars Helper 'compare' needs 2 parameters" );
    }
    var operator = options.hash.operator || "==",
        operators = {
            '=='     : function (l, r) { return l == r; },
            '==='    : function (l, r) { return l === r; },
            '!='     : function (l, r) { return l != r; },
            '!=='    : function (l, r) { return l !== r; },
            '<'      : function (l, r) { return l < r; },
            '>'      : function (l, r) { return l > r; },
            '<='     : function (l, r) { return l <= r; },
            '>='     : function (l, r) { return l >= r; },
            'typeof' : function (l, r) { return typeof l == r; },
            '&&'     : function (l, r) { return l && r; },
            '||'	 : function (l, r) { return l || r; }
        };

    if ( !operators[operator] ){
        throw new Error( "Handlebars Helper 'compare' doesn't know the operator " + operator );
    }

    if(operators[operator](lvalue,rvalue)){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

} );

Handlebars.registerHelper('anyAttribute',function (){
    var args = Array.prototype.slice.call(arguments)
    var options = args.pop()
    for(var i = 0;i<(args.length);i++){
        if(args[i]) return options.fn(this)
    }
    return options.inverse(this)
});

Handlebars.registerHelper('debugModel',function(obj){
    console.log(obj);
});

Handlebars.registerHelper('isSecureRequest',function(options){
    if(document.location.protocol==="https:"){
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
});

Handlebars.registerHelper('assetPathFromRef', function( assetRef, options ){
    if( arguments.length < 2)
        throw new Error( "HandlebarsHelper 'assetPathFromRef' expects an assetRef!")

    var assetObj = NGX.Util.assetFromRef(assetRef);

    return assetObj.src

});

Handlebars.registerHelper('assetAttributeFromRef', function( assetRef,attribute,options){
    if( arguments.length < 3)
        throw new Error( "HandlebarsHelper 'assetAttributeFromRef' expects an assetRef!")

    var assetObj = NGX.Util.assetFromRef(assetRef);

    return assetObj[attribute]
})

Handlebars.registerHelper('vineEmbedId', function( assetRef, options ){
    var assetObj = NGX.Util.assetFromRef(assetRef);
    var startIndex = assetObj.path.lastIndexOf('/v/')+3;
        embedIDStart = assetObj.path.substring(startIndex);

    if(embedIDStart.indexOf('/')>-1){
        embedIDStart = embedIDStart.substring(0,embedIDStart.indexOf('/'));
    }
    return embedIDStart;


})

Handlebars.registerHelper('shareAssetRef', function( defaultImage, assets, options ){
    /**
     * If no main asset or main asset is not an image, try the thumbnail instead
     */

    if(assets.main){
        var assetObj = NGX.Util.assetFromRef(assets.main);
        if(assetObj.assetType==="video" && assets.thumbnail){
            return assets.thumbnail;
        } else {
            return assets.main;
        }
    } else if(assets.thumbnail){
        return assets.thumbnail;
    } else {
        return v4.tokenize( defaultImage, assets );
    }

});

Handlebars.registerHelper('shareLink', function( defaultLink, item, options ){

    if(item.externalServiceRef!=="external.service.ugc"){
        return item.link;
    } else {
        /**
         * Non-ES domains - nothing added, ES domains, the correct format of this e.g. "?r=123456789&itemID=27296972"
         */

        var applyRoute = ['ngx.me','engagesciences.com:8443/link/','engageplatform.com/link/'],
            applyQS = ['engagesciences.com','engageplatform.com'],
            method = "ext";

        // Check smart url first
        _.each(applyRoute,function(domain){
            if(defaultLink.indexOf(domain)>-1){
                method = "route";
                defaultLink = defaultLink+"/${id}"
            }
        });
        if(method!=="route"){
            // Check if query string is required next
            _.each(applyQS,function(domain){
                if(defaultLink.indexOf(domain)>-1){
                    method = "qs";
                    defaultLink = v4.updateQueryString({itemID:'${id}'},true,defaultLink);
                }
            });
        }

        return v4.tokenize( defaultLink, item );
    }

});

Handlebars.registerHelper('linkType', function(item,options){
    return (item.network=="ugc")?"internal":"external";
});

Handlebars.registerHelper( 'capitalize', function( word, options ){
    if( arguments.length < 2)
        throw new Error( "HandlebarsHelper 'capitalize' expects a word!")

    if(!word||(typeof word == "object")){
        return false
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

});

Handlebars.registerHelper( 'formatUserName', function( firstName, lastName, transFn, options ){

    if( !firstName && !lastName ) throw new Error( "HandlebarsHelper 'formatUserName' expects a user name!")

    if ( !firstName && !lastName || ((typeof firstName == "object") || (typeof lastName == "object"))) {
        return false
    }
    else {

        // this allows us to call another handlebars helper from within this one. primarily used to allow the call to capitalize, this could be used for other funky stuff
        if ( transFn && typeof transFn === 'string' && (Handlebars.helpers[transFn] && typeof Handlebars.helpers[transFn] === 'function')) {
            _.each([firstName, lastName], function( u ) {
                u = Handlebars.helpers[transFn]( u, options );
            })
        }

        // now you can do a simplistic replace on the tokens in the string
        var repStr = NGX.lang.user.nameFormat.toLowerCase();
        repStr = repStr.replace(new RegExp("{{firstname}}", "gm"), firstName)
        repStr = repStr.replace(new RegExp("{{lastname}}", "gm"), lastName)

    }

    return repStr

});

Handlebars.registerHelper('stripSpaces', function( words, options ){
    if( arguments.length < 2)
        throw new Error( "HandlebarsHelper 'stripSpaces' expects some words!")

    if(!words||(typeof words == "object")){
        return false
    } else {
        return words.replace(/\s/g,'');
    }

});

Handlebars.registerHelper('protocolFree', function( url, options ){
    if( arguments.length < 2)
        throw new Error( "HandlebarsHelper 'removeProtocol' expects a URL!")

    if(!url||(typeof url == "object")){
        return false
    } else {
        return "//"+url.replace(/.*?:\/\//g, "");
    }

});

Handlebars.registerHelper( 'viralAction', function( context, options ){
    if(!context){
        return false;
    } else {
        if(context.action=="share"){
            return "share:"+context.context+":"+context.network;
        } else if(context.action=="invite"){
            return "invite";
        }
    }

});

Handlebars.registerHelper( 'tokenizeMe', function( haystack, needles){
    if( arguments.length < 2) return haystack
    return v4.tokenize( haystack, needles ).replace(/(<([^>]+)>)/ig,"");;
});

Handlebars.registerHelper( 'messageBundle', function(messageKey, messageDefault){
    var _theMessage;
    if(!messageKey && !messageDefault){
        console.error('No message key or default passed')
        return ""
    }

    if(NGX.lang && messageKey){
        _theMessage = NGX.lang.get(messageKey);
    }

    return _theMessage||messageDefault;
});

/**
 * popOverlayForDisplayItem
 * @param itemId
 *
 */

var popOverlayForDisplayItem = function(itemId,component){

    NGX.App.api.messageParent({action:'getScrollPosition'});

    var theItem = null,
        theType = 'social',
        theTemplate,
        targetState,
        firstCmp = null,
        firstTarget;

    var findFirstComponent = function(compTypes){
        v4.debug("Searching components for "+compTypes,5);
        var _components=[];
        _.each(NGX.App.Components.models,function(cmp){
            if(_.contains(compTypes,cmp.get('type'))){
                _components.push(cmp);
            }
        });

        return _components[0]||false;

    };

    $.getJSON('/display/api/content/displayItem/' + itemId + '.json')
        .success(function(response){
            if(response.count==1){
                v4.debug("The item ID brought back a valid display item",5);
                theItem     = response.content[0];
                theType     = (theItem.network=="ugc")?'gallery':'social';
                theTemplate = (theType=='social')?'overlayContentcard':'overlayMediacard';
            } else {
                v4.debug("The item ID did not bring back a valid display item, maybe it's unpublished?",5);
            }
        })
        .done(function(){
            if(theType==='gallery'){
                v4.debug("The item is UGC; if the component wasn't passed, let's find a gallery",5);
                firstCmp = component || findFirstComponent(['entries'])
            } else {
                v4.debug("The item is social, let's find a social component",5);
            }

            if(!firstCmp) firstCmp = component || findFirstComponent(['socialcontentwall','socialcontentmosaic','socialcontentcarousel'])

            if(firstCmp){
                firstTarget = $(firstCmp.get('targ')).parents('.xSection');
                targetState = (!component)?firstTarget.attr('data-statename'):null;
                // Todo: use proper default state mechanism
                theItem.itemOpts = firstCmp.get('itemOpts');
            }

            if(targetState && _.findWhere(flowJSON.states,{name:targetState})){
                v4.debug("Attempting to route to state:"+targetState,5);
                v4.action('state:'+targetState);
            }

            if(theItem){
                NGX.overlay.create({
                    template : NGX.App.api.getTemplate(theTemplate),
                    content  : theItem,
                    callback : function(){
                        Insights.track('view:contentitem',{i:itemId});
                    }
                });
            }
        });
}


// Initialise Overlay Handlers

    var initOverlayHandler = function(e){
        e.preventDefault();
        e.stopPropagation();
        var $item     = $(this),
            $asset 	  = $item.find('.xActionOverlay'),
            $component= $item.parents('.xComponent'),
            theComponent = NGX.App.Components.get($component.attr('id')),
            content   = null,
            contentSource = $item.data('ngxOverlaysource');

        switch(contentSource){
            case "json":
                content    = window[$component.attr('id')][$item.data('ngxOverlaycontent')];
                content['itemOpts'] = theComponent.get('itemOpts');

                if($asset.data('ngxSourceid')){
                    content['extId'] = $asset.data('ngxSourceid');
                    content['network'] = $asset.data('ngxService');
                }
                NGX.overlay.create({
                    template:NGX.App.api.getTemplate('overlayMediacard'),
                    content:content,
                    event: e.originalEvent
                });
                break;

            case "ajax":
                popOverlayForDisplayItem($item.data('ngxId'),theComponent);
                break;

            case "external":
                break;

            default:
                NGX.overlay.create({
                    content : $item.html(),
                    event   : e.originalEvent
                });
                break;
        }
    },

    initExternalLinkHandler = function(e){
        e.preventDefault();
        var externalLink = this.getAttribute('data-ngx-sourcelink'),
            linkTarget   = this.getAttribute('data-ngx-sourcetarget');

        Insights.track("click:contentitem",{i:this.getAttribute('data-ngx-id'),link:externalLink});

        if(linkTarget=="_blank"){
            window.open(externalLink);
        } else {
            document.location=externalLink;
        }

    };



// Redirect to

$('.xComponent').on('click','.xContainer .xTriggerOverlay',initOverlayHandler);
$('.xComponent').on('click','.xContainer .xTriggerExternal',initExternalLinkHandler);

$('.xComponent').on('click','.xShareModal',function(e){
    e.stopPropagation();
    e.preventDefault();
    var $item     = $(this).parents('.xItem'),
        cmp       = NGX.App.Components.get($(this).parents('.xComponent').attr('id')),
        $asset 	  = $item.find('.xActionOverlay'),
        itemObj   = null;

    $.getJSON('/display/api/content/displayItem/' + $item.data('ngxId') + '.json')
        .success(function(response){
            if(response.count==1){
                itemObj = _.extend({},response.content[0],{itemOpts:cmp.get('itemOpts'),title:'Share'});
            }
        })
        .done(function(){
            if(itemObj){
                NGX.overlay.create({
                    template : NGX.App.api.getTemplate('shareModal'),
                    content  : itemObj,
                    event    : e.originalEvent,
                    type     : 'shareModal'
                });
            }
        })

});

NGX.App.Events.on("page:ready",function(){
    var theID = v4.queryStringObject('itemID')||null,
        promoID = v4.queryStringObject('promoID')||null,
        appData;

    if(promoID){
        v4.action('display:promo:'+promoID);
    } else {
        if(!theID && NGX.context.appData){
            appData = JSON.parse(NGX.context.appData);
            if(!isNaN(appData.itemID)) theID = appData.itemID;
        }

        if(theID){
            v4.debug("There's an item ID in the QS, attempting to load it",5);
            popOverlayForDisplayItem(theID);
        }
    }

});

_.extend(Handlebars.partials,{
    sharingButtons : NGX.App.api.getTemplate('sharingButtons'),
    sharingIcons   : NGX.App.api.getTemplate('sharingIcons'),
    actionsNetwork : NGX.App.api.getTemplate('networkActions'),
    actionsPlatform: NGX.App.api.getTemplate('platformActions'),
    actionsProfile : NGX.App.api.getTemplate('profileActions'),
    objectVideo    : NGX.App.api.getTemplate('objectVideo')
});
var NGX = NGX || {};

NGX.Embed = (function(w,d){

// Public API methods

    var _actions = {

        setfieldvalues : function(target,msg){
            var flds = msg.payload;
            _.each(flds,function(val,fld){
                if(val&&fld){

                    var $fld = $('#'+fld);
                    if($fld.hasClass('selectized')){
                        $fld[0].selectize.setValue(val);
                    } else {
                        $fld.val(val);
                    }
                }
            });
        },

        // Navigate to a state from parent page
        navigate : function(target,msg){
            var _pld = msg.payload||null,
                stateName;
            if(_pld && ('undefined'!==typeof _pld.page)){
                stateName=(isNaN(_pld.page))?_pld.page:flowJSON.states[parseInt(_pld.page)].name;
                NGX.App.api.action('route:'+stateName)
            }
        },

        // Show display item
        showitem : function(target,msg){
            var _pld = msg.payload||null,
                _type = _pld.type||'item';
            v4.action('display:'+_type+':'+_pld.itemId);
        },

        // Set positioning info in page display context
        returnpageinfo : function(target,msg){
            NGX.App.state.pageInfo = msg.payload||{};
        },

        // Trigger an event
        triggerevent : function(target,msg){
            NGX.App.Events.trigger(msg.payload.event);
        }

    },

    enableListeners = function(){
        if(w.addEventListener){
            w.addEventListener("message",receiveMessage,false);
            w.addEventListener('resize',_.debounce(NGX.App.api.resizeParent, 250),false);
        } else {
            w.attachEvent("onmessage",receiveMessage);
            w.attachEvent('onresize',_.debounce(NGX.App.api.resizeParent, 250));
        }
    },

    disableListeners = function(){
        if(w.removeEventListener){
            w.addEventListener("message",receiveMessage,false);
            w.addEventListener('resize',_.debounce(NGX.App.api.resizeParent, 250),false);
        } else {
            w.detachEvent("onmessage",receiveMessage)
            w.detachEvent('onresize',_.debounce(NGX.App.api.resizeParent, 250));
        }
    };


    // Internal methods

    function isValidMessage(msg){
        if(msg.data.indexOf('_NGX_')===0){
            return true;
        }
        return false;
    }

    function receiveMessage(e){
        try {
            v4.debug("Message Recieved: "+ e.data,3);
            if(isValidMessage(e)){
                var msgObj = JSON.parse(e.data.substring(5)),
                    result = messageAction(msgObj);
                if(result) e.source.postMessage(result,'*');
            }
        } catch(e){

        }
    }

    function messageAction(msg){
        var theFrame = d.getElementById(msg.frameId),
            result;

        if(_actions.hasOwnProperty(msg.action.toLowerCase())){
            return _actions[msg.action.toLowerCase()].call(this,theFrame,msg);
        }
    }

    function init(){
        NGX.Embed.listen();
    }

    return {
        init: init,
        listen: enableListeners,
        ignore: disableListeners,
        actions: _actions,
        sendMessage: NGX.App.api.messageParent
    }
}(window,document));

NGX.Embed.init();
;NGX.contests = (function(w,d,$,_,undefined){
	"use strict";

	/** utility methods */

	var getDataAttr = function(el, attr) {
			var dataAttr = 'data-' + attr;
			return (el && el.nodeType === 1 && el.hasAttribute(dataAttr))? el.getAttribute(dataAttr): undefined;
		},

		/** voting handler */

		voteClickHandler = function(e){
			var _self = this, // TODO: scoping alias for CORS callback, fix this later
				cntx  = NGX.context,
				conf  = NGX.App.config,
				user  = NGX.App.state.currentUser.userSession,
				$el   = $(e.currentTarget).addClass('processing clicked'),
			// safari bugfix
				auth = (user)? user.authResponse: {},
			// config object
				obj = {
					entryId    : $(e.currentTarget).parents('.xItem').attr('data-ngx-id'),
					campaignId : conf.id,
					apikey     : cntx.apikey,
					fbid       : auth? auth.userID: '',
					url        : conf.displayFormURLsecure + '/display/form/voteEntry/'
				},
			// context sniffing
				isVoting = (this.model.get('parentType') === 'voting'), // TODO: this is currently the only way to detect head2head voting :/
				isSafari  = (function(ua) {
					return (/safari/.test(ua) && !/chrome/.test(ua));
				}(navigator.userAgent.toLowerCase())),
			// if the vote request returns anything from the server..
				voteSuccess = function(response) {
					var voteNum = response.currentVotes, $details, $overlay;
					// update vote count in the component models
					if (voteNum) {
						$overlay = $('.xDetailContainer');
						// update entry item model with the correct number of votes
						_self.model.set({
							'entryVotes'   	 : voteNum,
							'voteButtonText' : (NGX.lang.button && NGX.lang.button.postvote)? NGX.lang.button.postvote: 'Voted' // TODO: handler to make this tidier
						});
						if ($overlay) {
							// TODO: add some kind of data binding to the _overlay_ to update from the model
							$details = $('.xVoteCount',$overlay);
							if ($details) {
								// update vote count element
								$details.html(voteNum);
							}
							// update button on successful vote
							$el.addClass('voted').html((NGX.lang.button && NGX.lang.button.postvote)? NGX.lang.button.postvote: 'Voted');
						}
					}
					// blur out vote buttons if it's a voting module
					if (isVoting) {
						// disable vote buttons
						$('.xActionVote').addClass('xDisabled');
						// show votes count
						$('.voteButtonWrapper').removeClass('xHidden');
						$('.xActionAnotherSet>span').text((NGX.lang.button && NGX.lang.button.voteagain)? NGX.lang.button.voteagain: 'Voted. Show More?');
					}
					// callback specified in voting stratergy
					if (_.isObject(obj.afterVote)) {
						NGX.overlay.create(obj.afterVote);
					}
				},
			// a network error occured (voting errors handled on success event)
			// also called if user fails to provide required permissions upon voting
				voteFail = function(response) {
					var msg = response.message || 'Unknown error occurred', // TODO: message bundles!
						txt = (NGX.lang.button && NGX.lang.button.notvoted)? NGX.lang.button.notvoted: 'Vote not counted';
					NGX.overlay.create({
						type: 'modal',
						content: msg
					});
					$el.addClass('error').children('span').html(txt);
				},
			// send the vote to the server
				voteSubmit = function() {
					var xhr = NGX.Util.createCORSRequest("POST", obj.url + '?' + $.param({
						entryId     : obj.entryId,
						cID         : obj.campaignId,
						apikey      : obj.apikey,
						uid         : NGX.Util.getRefCookie({ c_name : 'ngx' }),
						fbid        : auth? auth.userID : '',
						oauth_token : auth? auth.accessToken : ''
					}));
					if (xhr) {
						// server returns some json
						xhr.onload = function() {
							var json = $.parseJSON(xhr.responseText);

							if (!!json.voted===true) {
								voteSuccess(json);
							}
							else {
								voteFail(json);
							}
							$el.removeClass('processing').off('click');
						};
						// network/x-domain error
						xhr.onerror = function() {
							voteFail({ message: 'A network error occurred', error: true }); //TODO: message bundles!
							$el.removeClass('processing');
						};
						// send the request
						xhr.send();
					}
				},
			// check the voting strategy prior to submit.
				voteStrategy = function() {
					switch (conf.votingStrategy) {
						case 'strategy.voting.cta':
							obj.afterVote = {
								url: '/display/page/votecta/?' + $.param({
									id      : conf.id,
									pageId  : cntx.fb.page.id,
									appId   : cntx.fb.app.id,
									apikey  : cntx.apikey,
									preview : cntx.isPreview
								})
							};
							break;
						case 'strategy.voting.posttowall':
							var cs = conf.sharing;
							NGX.Virality.facebookShare({
								trackURL	: cs.trackURL,
								name        : cs.name,
								picture     : cs.picture,
								caption     : cs.caption,
								description : cs.description,
								link        : cs.link,
								actionLink	: cs.actionLink,
								actionText	: cs.actionText
							});
							break;
					}
					voteSubmit();
				};

			// prevent clicks on disabled items
			if ($el.hasClass('xDisabled')) {
				return false;
			}

			// we need to login to FB in the following situations
			if (conf.votingStrategy === 'strategy.voting.posttowall' ||
				conf.votingPermsRequired === true ) {
					NGX.Util.fbLogin(function(response){
						if (response.authResponse && response.status === 'connected' ) {
							// we need to update these now we have auth from the user
							user  = NGX.App.state.currentUser.userSession,
							auth = (user)? user.authResponse: {},
							voteStrategy();
						} else voteFail({ message: NGX.lang.exception.voteperms || 'Please authorise the app in order to vote', error: true });
					}, { timing: '' });
			}
			else {
				voteStrategy();
			}
		},

		/** Contest entry item  */

		ContestEntry = Backbone.Model.extend(),

		ContestEntryView = Backbone.View.extend({
			initialize	: function(options){
				var _self = this;
				// retain scope for click events
				_.bindAll(this,'showDetails');
				// get templates
				this.template = NGX.App.api.getTemplate(options.template||this.options.template);
				this.details  = NGX.App.api.getTemplate(options.details||this.options.details);
				this.vote     = NGX.App.api.getTemplate(options.vote||this.options.vote);
				// set some values
				this.model.set('voteButtonText', options.voteButtonText);
				this.model.set('parentType', options.parentType);
				this.model.set('itemOpts',options.itemOpts);
				// event handlers
				this.listenTo(this.model,'change',this.render);

				if (typeof this.template === 'function'){
					var html = this.template(this.model.attributes);
					this.setElement( $( html.trim() ) );
				}
				if(this.model.get('parentType')=="entries"){
					// Only apply click handler to entries module, not voting module
					this.$el.on('click','.xMediaContainer',this.showDetails);
				}

				this.$el.on('click','.xActionVote span',function(e) {
					e.preventDefault();
					e.stopPropagation();
					voteClickHandler.call(_self, e);
				});
			},
			render: function(){
                var _self = this;

				if (typeof this.template === 'function'){
					var html = this.template(this.model.attributes);
                    this.$el.html( $(html.trim()).html() )
				}

				return this;
			},
			showDetails: function(evt){
                var _self = this;
				NGX.overlay.create({
					content: this.model.attributes,
					template:this.details,
					event:evt.originalEvent,
					// TODO: pass the current view as a parameter for some rudimentary databinding?
					callback: function() {
						this.$inner
							.on('click', '.xActionVote span', function(e) {
								e.preventDefault();
								e.stopPropagation();
								voteClickHandler.call(_self, e);
							});
					}
				});
			}
		}),

		/** Contest entry collection  */

		ContestEntryList = Backbone.Collection.extend({
			model : ContestEntry,
			parse : function(response){
				var entries = response.content;
				if(entries && entries.constructor === Array){
					this.addEntries(entries);
                    if(response.page==response.pagecount){
                        $('.xActionShowMoreContainer').addClass('xHidden');
                    } else {
                        $('.xActionShowMoreContainer').removeClass('xHidden')
                    }
				}
			},
			addEntries : function(content){
                v4.debug('collection:before:render',2)
                NGX.App.Events.trigger('collection:before:render');
				_.each(content, function(entry){
					if(entry){
                        v4.debug("collection:model:render",2);
                        NGX.App.Events.trigger('collection:model:render');
						var assetRefMain  = NGX.Util.assetFromRef(entry.assets.main),
							assetRefThumb = NGX.Util.assetFromRef(entry.assets.thumbnail);
						// setup generic content
						entry.thumbnail  = assetRefThumb.src;
						entry.entryId    = entry.id;
						entry.entryVotes = (entry.score)? entry.score: 0;
						entry.entryDate  = (function(date) {
							var y = date.getFullYear(),
								m = date.getMonth() + 1,
								d = date.getDate();
							return m + '-' + d + '-' + y;
						}(new Date(entry.dateCreated)));
						// populate model with appropriate asset values
						entry[assetRefMain.assetType] = assetRefMain.src;
						// parse the youtube URL for embedding
						if (entry.contentType=="video" && assetRefMain.type === "youtube") {
							var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
							var match = entry.video.match(regExp);
							if(match){
								entry.extId = match[2].substr(0,11);
							}
						}
						// images have a size, videos don't seem to
						else if (entry.image && assetRefMain.size) {
							entry.imgHeight = assetRefMain.size.height;
							entry.imgWidth  = assetRefMain.size.width;
						}
						// add extendedProperties as an object
						if (typeof entry.extendedProperties === 'string') {
							entry.extendedProperties = $.parseJSON(entry.extendedProperties);
						}
						this.add(entry);
					}
				}, this);
                v4.debug("collection:rendered",2);
				this.trigger('collection:rendered');

			}
		}),

		/** Contest sort controller */

		// TODO: Integrate sorting into app flow


		ContestSort = Backbone.Model.extend({
			initialize: function() {
		    	this.set('base', '/display/api/content/entryDisplayItems.json');
			},
			getURL: function() {
				var opts = this.attributes, url = this.get('base'), i = 0,
					add = function(val) {
						url += (i > 0? '&': '?') + val;
						i++;
					};

				add('cID='+NGX.App.config.id);
				add('apikey='+NGX.context.apikey);
				if(NGX.context.isStage) add('stageMode='+NGX.context.isStage);


				if (typeof opts === "object") {
					if (opts.cat) {
						add(opts.cat === 'random'? "random=true": 'sort=' + opts.cat);
					}
					if (opts.order === 'asc') {
						add('ascending=true');
					}
					if (opts.max) {
						add("max=" + opts.max);
					}
					if (opts.offset) {
						add("offset=" + opts.offset);
					}
                    if (opts.filter1) { add("filter1=" + opts.filter1); }
                    if (opts.filter2) { add("filter2=" + opts.filter2); }
                    if (opts.filter3) { add("filter3=" + opts.filter3); }
				}
                if (NGX.context.isPreview === true) {
                    add("preview=true");
                }

				// bust cache
				add('cache=' + (new Date()).getTime());
				return url;
			}
		}),

		/** Component view  */

		ContestView = Backbone.View.extend({
			initialize: function(){
				var _self = this;
				// populate component model
				var container = this.$('.xContainer')[0],
					// sample-size is based on how many items are shown by default
					max = parseInt(getDataAttr(container, 'ngx-initialmax'), 10);
				// scope the functions
				_.bindAll(this, 'addItem', 'getEntries', 'sortClick', 'moreClick', 'submitItemViews','filterEntries');
				// create the sort object
				this.sort = new ContestSort({
					'cat'   : getDataAttr(container, 'ngx-initialsort'),
					'order' : getDataAttr(container, 'ngx-initialorder'),
					'size'  : max,
					'max'   : max
				});
				// create entries list collection
				this.entries = new ContestEntryList();
				// cache the wrapper element
				this.$wrapper  = $('.xContainerInner','#xContestEntriesWrapper_' + this.el.id);
				// add new items to entry list
				this.listenTo(this.entries, 'add', this.addItem);
				// listen to a change in the sort order
				this.listenTo(this.sort, 'change', this.getEntries);
				// event bindings


				this.listenTo(this.entries,'collection:rendered', this.afterRender);

				this.$el
					// bind sort buttons
					.on('click', '.xActionSort', this.sortClick)
					// bind show more button
					.on('click','.xActionShowMore', this.moreClick)
                    // bind filtering
                    .on('change','.filterEntries', this.filterEntries)
					// bind show another set behaviour
					.on('click','.xActionAnotherSet', (function(_self) {
						return function scoped(list, result) {
							_self.getEntries(true, function(){
								_self.submitItemViews();
							});
						};
					}(this)));

				// do the fetch // TODO: without resetting entries.models is empty on first run - smart merge issue?
				this.getEntries(true, (function(_self){
					return function scoped(list, response){
						// for head to head components trigger item view // TODO: we need a nicer way of identifying head to head voting.
						if (_self.model.get('type') === 'voting') {
							_self.submitItemViews();
						}
						// Store the raw response json in the parent model
						// used for item tokenization, but useful to keep here since there
						// is no coupling between entry models and the component model, and
						// storing the collection in the patent model creates issues.
						_self.model.set('response', response, {
							trigger:false
						});
					};
				}(this)));
			},
			afterRender: function(){
				var _self = this,
                    _packeryEl = $('.xContainerInner',_self.$el);


                if(typeof _packeryEl.data('packery') !== "undefined"){
                    this.$el.imagesLoaded(function(){
                        $('.xContainerInner',_self.$el).packery('reloadItems').packery('layout');
                    });
                }

			},
			// attach a view and render the item
			addItem: function(item){

				var id = this.el.id,
					out = {
						model          : item,
						// component type of parent (used in vote click handler)
						parentType     : this.model.get('type'),
						// list item template
						template       : this.model.get('template') || 'xContestEntry',
						// details template
						details        : this.model.get('details') || 'xContestEntryDetails',
						vote           : 'xContestEntryVote_' + id,
						voteButtonText : (NGX.lang.button && NGX.lang.button.prevote)? NGX.lang.button.prevote: 'Vote',
						itemOpts	   : this.model.get('itemOpts')
					};
				this.$wrapper.append( new ContestEntryView( out ).render().el );
			},
			// sort button click TODO: tidy this up and combine with moreClick into a generic sort option Handler?
			sortClick: function(e) {
                var targ = e.currentTarget, targInner = targ.getElementsByTagName('a')[0], order, catog, replace;
				if (targInner) {
					order = getDataAttr(targInner, 'sortorder');
					catog = getDataAttr(targInner, 'sortby');
       				// update the mode
					this.sort.set({
						'cat'   : catog,
						'order' : order,
						// if the category is 'random' force the sort model to update & trigger the change event // TODO: can we find a more efficent way of doing this?
						'rnd'   : (catog === 'random'? (new Date()).getTime(): this.sort.get('rnd'))
					});
					if (order) {
						// toggle the buttons to the opposite value for next click
						replace = (order === "asc"? "desc": "asc");
						// TODO: refactor this jquery some time.
						// clear the previous actve sort
						this.$('.xActionSort .active')
							.removeClass('active');
						// highlight the new active sort
						$(targ)
							.removeClass(order)
							.addClass(replace + ' active');
						// toggle it's sort order
						targInner
							.setAttribute('data-sortorder', replace);
					}
				}
			},
			// more button click
			moreClick: function(e){
                this.sort.set({
					'max' : (this.sort.get('max') + this.sort.get('size'))
				});
			},

            // Filter items
            filterEntries: function(e){
                var $filter = $(e.currentTarget),
                    filterData = {};
                filterData[$filter.attr('id')] = $filter.val();
                this.sort.set(filterData);
            },

			// submit views and refresh using current sort criteria
			submitItemViews: function() {

				var getContentIds, xhr, xhrDone;
				// get the content ids as an array
				getContentIds = (function(modelList) {
					var contentIds = [];
					_.each(modelList, function(model){
						contentIds.push(model.attributes.id);
					}, this);
					return contentIds.join(',');
				}(this.entries.models));
				// create the request
				xhr = NGX.Util.createCORSRequest("POST", '/display/form/updateContentViews.json?' + $.param({
					cID        : NGX.App.config.id,
					apikey     : NGX.context.apikey,
					contentIds : getContentIds
				}));
				xhr.send();
				// update the button text // TODO: put this somewhere cleaner. the logic is right but the location isn't ideal.
				$('.xShowAnotherSet>span ').text((NGX.lang.button && NGX.lang.button.votenewset)? NGX.lang.button.votenewset: 'Show more');
			},
			// the sort/max/offset params are set on the component and this applies them to the collection & re-fetches
			getEntries: function(forceReset, successFn) {
				var _self = this;
				// update the URL with the new sort order
				this.entries.url = this.sort.getURL();
				// clear out the old markup
				this.$wrapper.html('');
				// get the new item list
				this.entries.fetch({
					reset   : (forceReset? forceReset: false),
					success : function(){
						//_self.afterRender();
						(typeof successFn === 'function'? successFn(): false)
					}
				});
			}
		});

	NGX.App.api.registerView('entries', ContestView);
	NGX.App.api.registerView('voting',  ContestView);

}(window, document, $, _));

NGX.StorageManager = (function(w,d){

    // Internals

    var _localStorage = {
            // Local storage methods, only if localStorage is supported by the browser

            supported : function(){
                try {
                    return (typeof(localStorage)!=='undefined')
                } catch(exc) {
                    return false;
                }
            },
            getData : function(key){
                if(this.supported()) return (localStorage.getItem(key)?localStorage.getItem(key):false);
            },

            setData : function(key,value){
                if(this.supported()) localStorage.setItem(key,value);
            },

            pushData : function(key,value){
                if(!this.supported()) return false;
                var _values = [],
                    _existing = this.getData(key);
                if(_existing){
                    _values.push(_existing)
                }

                _values.push(""+value);

                this.setData(key,_values);

            },

            popData : function(key,value){
                if(!this.supported()) return false;
                var _values = [],
                    _existing = this.getData(key);

                if(_existing){
                    _.each(_existing.split(','),function(el){
                        if(""+el !== ""+value) _values.push(""+el);
                    });
                    this.setData(key,_values);
                }


            },

            clearData : function(key){
                if(this.supported()) localStorage.removeItem(key);
            }
        },

        _cookieStorage = {
            // Cookie storage methods, used as fallback for non localStorage, longer lived and/or requests that need to go back to the server

            setData : function(key,value){
                var _key = key.replace(/\./g, '_'),
                    _d = new Date(),
                    _expires;

                _d.setTime(_d.getTime() + (360*24*60*60*1000));
                _expires = "expires="+_d.toGMTString();

                document.cookie = key + "=" + value + "; " + _expires;
            },

            getData : function(key){
                var _key     = key.replace(/\./g, '_'),
                    _cName   = key + "=",
                    _cookies = document.cookie.split(';');

                for(var i=0; i < _cookies.length; i++){
                    var c = _cookies[i];
                    while (c.charAt(0)===' ') c = c.substring(1);
                    if (c.indexOf(_cName) !== -1) return c.substring(_cName.length,c.length);
                }

                return '';
            },

            clearData : function(key){
                var _key = key.replace(/\./g, '_'),
                    _expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";

                document.cookie = _key + "=; " + _expires;
            }
        },

    // API Methods

        _setData = function(key,value,where){
            var _where = where||"both";
            var _useLocal = (_where=="local"||_where=="both"),
                _useCookie = (_where=="cookie"||_where=="both");

            if(_useLocal) _localStorage.setData(key,value);
            if(_useCookie) _cookieStorage.setData(key,value);

        },

        _pushData = function(key,value,where){
            var _where = where||"both";
            var _useLocal = (_where=="local"||_where=="both");
            _useCookie = false; // (_where=="cookie"||_where=="both"); <-- Not currently supported [SG]

            if(_useLocal) _localStorage.pushData(key,value);
            if(_useCookie) _cookieStorage.pushData(key,value);

        },

        _popData = function(key,value,where){
            var _where = where||"both";
            var _useLocal = (_where=="local"||_where=="both");
            _useCookie = false; // (_where=="cookie"||_where=="both"); <-- Not currently supported [SG]

            if(_useLocal) _localStorage.popData(key,value);
            if(_useCookie) _cookieStorage.popData(key,value);
        },

        _getData = function(key){
            var _theData = _localStorage.getData(key);
            if(!_theData){
                _theData = _cookieStorage.getData(key);
            }

            return _theData;
        },


        _clearData = function(key){
            if("undefined"!==typeof(key)){
                _localStorage.clearData(key);
                _cookieStorage.clearData(key);
            }
        }

    return {
        'get'   : _getData,
        'set'   : _setData,
        'push'  : _pushData,
        'pop'   : _popData,
        'clear' : _clearData
    }

}(window,document));
//=require ngx/ui.common.js
//=require ngx/ui.core.js
//=require ngx/ui.game.js
//=require ngx/ui.appflow.js
//=require ngx/ui.overlay.js
//=require ngx/ui.share.js
//=require ngx/ui.forms.js
//=require ngx/ui.uiflow.js
//=require ngx/ui.util.js
//=require ngx/ui.insights.js
//=require ngx/ui.virality.js
//=require ngx/ui.tooltips.js
//=require ngx/ui.metric.js
//=require ngx/ui.itemlist.js
//=require ngx/ui.social.common.js
//=require ngx/ui.social.mosaic.js
//=require ngx/ui.displayitem.js
//=require ngx/ui.messaging.listener.js
//=require ngx/ui.contests.js
//=require ngx/ui.storagemanager.js
