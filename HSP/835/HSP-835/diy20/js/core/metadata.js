/**
 * MetaData Manager
 */

    if( typeof(SNI) == "undefined" ) {var SNI = {};}

SNI.MetaData = {};

SNI.MetaData.Parameter = function(){
	var parameters = {};		// object to store parameters

	this.addParameter = function(key, value){
		key = key.toUpperCase();		// always force key to uppercase before insert (case-insensitive insert and lookup)
		if(!parameters[key]) {
			parameters[key] = [];
		}
		parameters[key].push(value);
	};

	this.getParameter = function(key, separator){
		key = key.toUpperCase();		// always force key to uppercase before retrieval (case-insensitive insert and lookup)
		if(!parameters[key]) {
			return;
		}
		return parameters[key].join(separator);
	};

	this.getKeys = function(){
		return parameters;
	};
	
	this.setParameter = function(key, value){
		key = key.toUpperCase();		// always force key to uppercase before insert (case-insensitive insert and lookup)
		parameters[key] = [];
		parameters[key].push(value);
	};

    this.resetKeys = function() {
	parameters = {};
    };
	
};



/* -------------------------------------------
			MetaDataManager
   ------------------------------------------- */
SNI.MetaData.Manager = function(){
	var m = new SNI.MetaData.Parameter();
	this.addParameter = m.addParameter;
	this.getParameter = m.getParameter;
	this.getKeys = m.getKeys;
	this.setParameter = m.setParameter;
    this.resetKeys = m.resetKeys;
	
	// gets the value of the parameter, but returns empty string if parameter doesn't exist
	this.getParameterString = function(key) {
		var s =  this.getParameter(key," ");
		if ( s == null ) {
			s = "";
		}
		return s;
	};
	
	// these getters are for backwards compatibility; should use getParameterString() now
	
	// generic getters
	this.getPageType = 		function() { return this.getParameterString("Type"); };
	this.getPageTitle = 	function() { return this.getParameterString("Title"); };
	this.getSite = 			function() { return this.getParameterString("Site"); };
	this.getSctnId = 		function() { return this.getParameterString("SctnId"); };
	this.getSponsorship = 	function() { return this.getParameterString("Sponsorship"); };
	this.getAbstract = 		function() { return this.getParameterString("Abstract"); };
	this.getKeywords = 		function() { return this.getParameterString("Keywords"); };
	this.getClassification =function() { return this.getParameterString("Classification"); };
	this.getSctnDspName = 	function() { return this.getParameterString("SctnDspName"); };
	this.getCategoryDspName=function() { return this.getParameterString("CategoryDspName"); };
	this.getShowAbbr = 		function() { return this.getParameterString("Show_Abbr"); };
	this.getRole = 			function() { return this.getParameterString("Role"); };
	this.getDetailId = 		function() { return this.getParameterString("DetailId"); };
	this.getPageNumber = 	function() { return this.getParameterString("PageNumber"); };
	this.getUniqueId = 		function() { return this.getParameterString("UniqueId"); };
	this.getUserId = 		function() { return this.getParameterString("UserId"); };
	this.getUserIdEmail = 	function() { return this.getParameterString("UserIdEmail"); };
	this.getUserIdCreateDt =function() { return this.getParameterString("UserIdCreateDt"); };
	this.getUserIdVersion = function() { return this.getParameterString("UserIdVersion"); };
	this.getFilters = 		function() { return this.getParameterString("Filters"); };

	// food specific getters
	this.getMultimediaFlag =function() { return this.getParameterString("MultimediaFlag"); };
	this.getChefName = 		function() { return this.getParameterString("ChefName"); };
	this.getMealPart = 		function() { return this.getParameterString("MealPart"); };
	this.getCuisine = 		function() { return this.getParameterString("Cuisine"); };
	this.getOccasion = 		function() { return this.getParameterString("Occasion", " "); };
	this.getMainIngredient =function() { return this.getParameterString("MainIngredient"); };
	this.getTechnique = 	function() { return this.getParameterString("Technique", " "); };
	this.getDish = 			function() { return this.getParameterString("Dish", " "); };
	this.getMealType = 		function() { return this.getParameterString("MealType", " "); };
	this.getNutrition = 	function() { return this.getParameterString("Nutrition", " "); };
	this.getDifficulty = 	function() { return this.getParameterString("Difficulty", " "); };
	
	// other methods
	
	this.getSearchTerm = function() {
		var args = parseQueryString ();
		for (var arg in args) {
			var s = arg.toUpperCase();
			if ( s == 'SEARCHSTRING' ){
				return args[arg];
			}
		}
		return "";
	};
	
	this.setMultimediaFlag = function(flag) {
		if ( flag != null ) {
			this.addParameter("MultimediaFlag",flag);
		} else {
			this.addParameter("MultimediaFlag","");
		}
	};
	
	this.parseQueryString = function(str) {
	  str = str ? str : document.location.search;
	  var query = str.charAt(0) == '?' ? str.substring(1) : str;
	  var args = {};
	  if (query) {
	    var fields = query.split('&');
	    for (var f = 0; f < fields.length; f++) {
	      var field = fields[f].split('=');
	      args[unescape(field[0].replace(/\+/g, ' '))] = 
			unescape(field[1].replace(/\+/g, ' '));
	    }
	  }
	  return args;
	};

};


// MetaDataManager for backwards compatibility
var MetaDataManager = SNI.MetaData.Manager;
