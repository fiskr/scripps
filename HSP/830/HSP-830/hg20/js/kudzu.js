// Dynamic Kudzu module: AJAX for context-sensitive results

(function($) {
	var o = this;
	var nTimeout = 7000;
	if (typeof SNI.Config.kudzuTimeout == 'number') {
		nTimeout = SNI.Config.kudzuTimeout;
	}
	
	var oTimer = null;
	
	o.isStatic = function() {
		var bRet = false;
		if (mdManager.getParameterString("type") != "SEARCH") bRet = true;
		if (mdManager.getParameterString("noSearchResults") == "No Results") bRet = true;
		return bRet;
	};
	
	o.getSearchVal = function() {
		var searchVal = escape(mdManager.getParameterString("searchTerm"));
		if (mdManager.getParameterString("noSearchResults") == "Did You Mean") {
			searchVal = escape(mdManager.getParameterString("dymterm"));
		}
		return searchVal;
	};

	o.init = function() {
		if (o.isStatic()) return;
		var mySearchVal = o.getSearchVal();
		if (mySearchVal == "") return;
		fnLoaderTransit(1);
		oTimer = setTimeout( function() { fnLoaderTransit(2);}, nTimeout);
		$.ajax({url: SNI.Config.kudzuSearchPath + "&callback=SNI.HGTV.KudzuModule.processLoad&searchVal=" + mySearchVal,
							dataType: 'script', 
							cache: true,
							timeout: nTimeout,
							error: SNI.HGTV.KudzuModule.errorLoad });
		return;
	};

	function fnLoaderTransit(nSw) {
		if (nSw == 1) {
			// set to "loading" mode
			$("#services-search.dyn h4").append('<span class="finding">Finding Professionals&hellip;<em class="loader"></em></span>');
			$("#services-search.dyn form").after('<div class="transit"></div>');
			$("#services-search.dyn .transit").show();
			$("#services-search.dyn .default").hide();
			$("#services-search.dyn .finding").show();
		} else if (nSw == 2) {	
			// load failed - set to static search form
			$("#services-search.dyn .transit").animate({opacity: 0}, {complete: function(){$(this).hide();}} ); 
			$("#services-search.dyn .finding").fadeOut();
			$("#services-search.dyn .default").fadeIn();
		} else if (nSw == 3) {	
			// load succeeded - set to results mode
			$("#services-search.dyn h4").append('<span class="found">Professionals In Your Area</span>');
			$("#services-search.dyn > p").html("<b>Not a match?</b>  Tell us what you need, and we'll help you find the best service providers in your area.");
			$("#services-search.dyn .transit").animate({opacity: 0}, {complete: function(){$(this).hide();}} ); 
			$("#services-search.dyn .finding").fadeOut();
			$("#services-search.dyn .found").fadeIn();
			$("#services-search.dyn .lg-img").fadeOut();
			$("#services-search.dyn").animate({ paddingTop: "17"},{ complete: function(){$("#services-search.dyn .results").slideDown("slow");} } ); 
		}
		return;
	}

	o.processLoad = function(jsondta) {
		if ((typeof jsondta != "object") ||
				(jsondta.totalResults == 0) ||
				(typeof jsondta.Company == "undefined")) {
			clearTimeout(oTimer);
			oTimer = null;
			fnLoaderTransit(2);
			return false;
		}
		var c = jsondta.Company;
		var sHtml = '<ul class="results">';
		if ($.isArray(c)) {
			var lim = Math.min(3, c.length);
			for (var i = 0; i < lim; ++i) {
				sHtml += fmtOneResult(c[i]);
			}
		} else {
			// yes, single result is NOT a one-element array
			sHtml += fmtOneResult(c);
		}
		sHtml += '</ul>';
		clearTimeout(oTimer);
		oTimer = null;
		$("#services-search.dyn h4").after(sHtml);
		fnLoaderTransit(3);
	} 

	function fmtOneResult(r) {
		if (typeof r['@NumberReviews'] == "undefined" ||
				typeof r['@AverageRating'] == "undefined" ||
				typeof r['@KudzuReviewsURL'] == "undefined" ||
				typeof r['@KudzuURL'] == "undefined" ||
				typeof r['@CompanyName'] == "undefined" ||
				typeof r['@City'] == "undefined" ||
				typeof r['@State'] == "undefined") {
			return '';
		}
			
		var sHtml = '<li>';
		if ((r['@NumberReviews'] > 0) || (r['@AverageRating'] > 0)) {
			sHtml += '<div class="rating clrfix">';
			if (r['@AverageRating'] > 0) {
				sHtml += '<span class="rated-' + parseInt(r['@AverageRating']) + '">'  + parseInt(r['@AverageRating']) + ' stars out of 5</span>';
			}
			if (r['@NumberReviews'] > 0) {
				sHtml += '<p>from <a href="' + r['@KudzuReviewsURL'] + '">' + r['@NumberReviews'] + ' review' + ( r['@NumberReviews'] > 1 ? 's' : '') + '</a></p>';
			}
			sHtml += '</div>';
		}
		sHtml +=  '<h5><a href="' + r['@KudzuURL'] + '">' + r['@CompanyName'] + '</a></h5>';
		sHtml +=  '<p>' + r['@City'] +', ' + r['@State'] + '</p>';
		sHtml += '</li>';
		return sHtml;
	}

	SNI.HGTV.KudzuModule = o;
}) (jQuery);
