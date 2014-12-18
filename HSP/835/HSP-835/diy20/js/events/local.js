function setTentpoleTab() {
	var hook = $("#body-hook").attr('rel'),
		pagetype;

	if( typeof(hook) !== 'undefined' && hook !== null ) {
		pagetype = hook.slice(4);
		
		$( "#tentpole-menu" ).find("li.tab-" + pagetype).addClass("sel");
	}
}	