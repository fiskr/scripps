if( typeof(SNI.HGTV) == "undefined" ) {SNI.HGTV = {};}SNI.HGTV.ANIMATION_SPEED = 150;

(function(){
  
  if (typeof SNI.HGTV === "undefined") SNI.HGTV = new Object();

  // truncate
  SNI.HGTV.truncate = function truncate(input, args) {
      var limit    = args && args.limit    || 10
        , omission = args && args.omission || '...';
      return input.length <= limit ? input : input.slice(0, limit) + omission;
  };

  // trim
  SNI.HGTV.trim = function strip(input) {
    return input.trim ? input.trim() : input.replace(/^\s+/, '').replace(/\s+$/, '');
  };

  // humanize
  SNI.HGTV.humanize = function humanize(number) {
      if(number % 100 >= 11 && number % 100 <= 13)
          return number + "th";
      switch(number % 10) {
          case 1: return number + "st";
          case 2: return number + "nd";
          case 3: return number + "rd";
      };
      return number + "th";
  };

  // generate unique id
  SNI.HGTV.guid = function guid(length) {
      
      var buf     = []
        , chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length
        , length  = length || 16;
          
      for (var i = 0; i < length; i++) {
          buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
      };
      
      return buf.join('');
  };

  // checks to see if string is empty
  SNI.HGTV.isBlank = function isBlank(input) {
      return /^\s*$/.test(input);
  };

  // removes parts of a string
  SNI.HGTV.remove = function remove(input, start, end) {
    return input.slice(0, start) + input.slice(end);
  };

  // inserts parts into a string
  SNI.HGTV.insert = function insert(input, string, index) {
    return input.slice(0, index) + string + input.slice(index);
  };

  // sluggify
  SNI.HGTV.dasherize = function dasherize(input) {
  return input.replace(/\W+/g, '-')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
  };

  // camel case
  SNI.HGTV.camelize = function camelize(input) {
    return input.replace(/\W+(.)/g, function(match, letter) {
      return letter.toUpperCase();
    });
  };

})();