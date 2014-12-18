
/* Controltag Loader for Scripps Network */
(function(){
  function debugLog(msg) {
    var isDebug = /kxdebug=(1|true)/.test(location);
    if (isDebug && typeof window.console === 'object' && typeof console.info === 'function') {
      console.info(msg);
    }
  }

  function loadCT(url, callback) {
    debugLog('Loading Krux control tag.');
    var ct_element = document.createElement('script');
    ct_element.async = true;
    ct_element.src = url;

    ct_element.onload = ct_element.onreadystatechange = function() {
      var state = ct_element.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        callback();
      }
    };

    // Fetch the first script element, so we can insert the
    // controltag before it. There *must* be at least one
    // script element, or this code would never be called
    var sibling = document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(ct_element, sibling);
  };

  function loadConfig() {
    
    
    debugLog('Loading krux configuration.');

    var config = {"partner_segment_map": {}, "context_terms": [], "tags": [{"content": "<script>\r\n//Setsection/subsection\r\n  Krux('set',{\r\n    section:Krux('get','page_attr_url_path_1'),\r\n    subsection:Krux('get','page_attr_url_path_2') \r\n  });\r\n</script>", "target": "", "target_action": null, "require": "", "docwrite": null, "method": "document", "execution_results": {"onloadSafe": true, "docwrite": false, "listeners": []}, "tier": 1, "internal": 1, "content_type": "html", "timing": "onload", "type": "publisher", "id": 29366, "name": "Krux Set Section and Subsection"}], "segments": [], "publisher": {"uuid": "11552641-53fa-4a48-bd04-3ec078e996a6", "id": 12187, "name": "Scripps Network"}, "controltag_options": {"async": "true", "render": true}, "site": {"id": 17064, "name": "hgtv.com"}, "dnt": null, "params": {"revenue_optimization": false, "control_tag_pixel_throttle": "100", "context_terms": "false", "jslog_host": "jslog.krxd.net", "capture_js_errors": "true", "control_tag_load_sync": "false", "remove_kxhead": true, "site_level_supertag_config": "site", "max_slot_time": 1000, "services_host": "apiservices.krxd.net", "capture_leakage": true, "max_segments": null, "client_side_storage": "localStorage,cookie", "control_tag_stats_prefix": null, "user_id_cookie": null, "no_pii": 0, "beacon_host": "beacon.krxd.net", "control_tag_namespace": null, "control_tag_version": "stable", "datatag_version": "3", "supertag_requires_approval": false}, "services": {"impression": "//beacon.krxd.net/ad_impression.gif", "stats": "//apiservices.krxd.net/stats", "log": "//jslog.krxd.net/jslog.gif", "userData": "//apiservices.krxd.net/user_data/segments/3", "optout": "//beacon.krxd.net/optout_check", "pixel": "//beacon.krxd.net/pixel.gif", "um": "//apiservices.krxd.net/um", "is_optout": "//beacon.krxd.net/optout_check", "set_optin": "//apiservices.krxd.net/consumer/optin", "social": "//beacon.krxd.net/social.gif", "set_optout": "//apiservices.krxd.net/consumer/optout", "data": "//beacon.krxd.net/data.gif", "event": "//beacon.krxd.net/event.gif"}, "geo": {}, "realtime_segments": [], "confid": "JArJSez7"};

    // Wrap in a function and comment, then toString the func and replace
    // everything that's not the beginning or end of a JSON object, so we get a
    // string that's either empty or JSON.
    var esiGeo = String(function(){/*
      <esi:include src="/geoip_esi"/>
    */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

    if (esiGeo) {
      config.geo = esiGeo;
    }

    Krux('config', config);
    
  };

  // ControlTag simply crashes when opening a website from Twitter browser on
  // iOS, temporarily disable CT when Twitter for iPhone is detected until they
  // fix this (works fine with other twitter client though)
  if (/Twitter for iPhone/.test(window.navigator.userAgent || '')) return;
    
  loadCT( "//cdn.krxd.net/ctjs/controltag.js.f99670595ccd46c65a517672ea749179", loadConfig );
})();
