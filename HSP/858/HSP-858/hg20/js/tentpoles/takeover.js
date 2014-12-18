/* Take over header function for tent poles */

SNI.HGTV.TakeOverHeader = {
	init: function() {
		var $nav = $("#takeover-nav");
		
		SNI.HGTV.TakeOverHeader.setTakeoverTab( $nav, SNI.HGTV.GlobalHeader.globalNav.getTabsToSelect(mdManager) ); 
		SNI.HGTV.TakeOverHeader.globalSearch();
	},
	
	globalSearch: function() {
		var $search = $("#hd-search-input");
		
		// Initial check if search field has text, hide default text.
		if ( $search.val() !== "" ) {
			$search.parent().find("label span").hide();
		}
		
		// Check again after document ready, if search field has text, for IE latency.
		$(function(){
			if ( $search.val() !== "" ) {
				$search.parent().find("label span").hide();
			}
		});
		
		$search.focus( function () { 
			$search.parents("#takeover-search").addClass("longbox");
			$search.parent().find("label span").addClass("focus");
				
			this.onkeydown = function(){
				$search.parent().find("label span").hide();
			};
		}).blur( function () { 
			if ( $search.val() === "" ) {
				$search.parent().find("label span").show().removeClass("focus");
			}
			$search.parents("#takeover-search").removeClass("longbox");
		});
		
		$("#hgSearchForm").submit( function () { 
			if ( $search.val() === "" ) {
				$search.focus();
				
				return false;
			} else {
				return true;
			}
		});
	},
	
	setTakeoverTab: function( $nav, oTabs ) {
		var $tTabs, $tTab;
		
		$tTabs = $nav.children("li");
		$tTabs.removeClass("sel");
		$tTab = $tTabs.filter("li.tab-" + oTabs.tTab);
		if ($tTab.length > 0) {
			$tTab.addClass("sel");
		}
		return;
	},

	setTentpoleTab: function() {
		var hook = $("#body-hook").attr('rel'),
			pagetype;	
	
		if(typeof(hook) !== 'undefined' && hook !== null) {
			pagetype = hook.slice(4);
			
			$( "#tentpole-menu" ).find("li.tab-" + pagetype).addClass("sel");
		} else if ( mdManager.getParameter("Type") == "SECTION" ) {
			$( "#tentpole-menu" ).children("li").eq(0).addClass("sel");
		}
	}
};
