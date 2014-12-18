SNI.HGTV.OnHGTV = {
    init: function() {
        //$(".tvschedule").dpl("accordion");
		SNI.Common.Accordion('#on-hgtv .acco');
        // there are links inside of the accordion header which makes it act a little funny
        // we have to force the links to activate since the accordion tries to cancel this action
        
		/*
		$('.tvschedule .acco-link a').click(function() {
            window.location.href = this.href;
            return true;
        });
        */
    }
};
