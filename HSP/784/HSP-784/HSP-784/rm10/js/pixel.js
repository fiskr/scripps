/**
 * MM-2711: Deliver DataXU pixel tracking scripts
 * @author Matt Heisig
 */
$(window).load(function () {
    // Shim for IE8 and lower to enable Object.keys()
    if (typeof Object.keys != 'function') {
        Object.keys = function(obj) {
           if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
                throw TypeError("Object.keys called on non-object");
           }
           var keys = [];
           for (var p in obj) {
                obj.hasOwnProperty(p) && keys.push(p);
            }

            return keys;
        };
    }

    // If this is Rate My Remodel then we can't use mdManager
    if (SNI.Community.projectName === 'Rate My Remodel') {
        SNI.Pixel.init(SNI.Config.DataXU.RateMyRemodel);
    }
    // This is a page with mdManager
    else {
        var sponsorship = mdManager.getParameterString('Sponsorship'),
            section = mdManager.getParameterString('SctnName'),
            sectionKeys = Object.keys(SNI.Config.DataXU.Sections),
            sponsorKeys = Object.keys(SNI.Config.DataXU.Sponsorships),
            tag = mdManager.getParameterString('ContentTag1');

        // Check sponsorships first as they take precedence over sections
        if ($.inArray(sponsorship, sponsorKeys) >= 0) {
            SNI.Pixel.init(SNI.Config.DataXU.Sponsorships[sponsorship]);
        }
        else if ($.inArray (section, sectionKeys) >= 0) {
            // Handle the unique case of Interior sections that are tagged "home theater"
            if (section === 'INTERIORS' && tag === 'home theater') {
                SNI.Pixel.init(SNI.Config.DataXU.Misc[tag]);
            } else {
                SNI.Pixel.init(SNI.Config.DataXU.Sections[section]);
            }
        }
    }
});