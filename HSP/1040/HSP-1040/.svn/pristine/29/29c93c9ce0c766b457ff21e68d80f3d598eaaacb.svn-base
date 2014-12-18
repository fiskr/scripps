// Throttles the excution of a function to run at most every set interval.
$.throttle = function(interval, throttledFunction) {

    if (interval <= 0) {
        return throttledFunction;
    }

    var lastTrigger = 0;
    var timeout;
    var lastArguments;
    return function() {

        lastArguments = arguments;
        if (timeout) {
            return;
        }
	
        var context = this;
        var now = +new Date();
        var delay = interval - now + lastTrigger;
	
        if (delay <= 0) {
            lastTrigger = now;
            throttledFunction.apply(context, lastArguments);
	    
        } else {
            timeout = setTimeout(function() {
                lastTrigger = now;
                timeout = null;
                throttledFunction.apply(context, lastArguments);
            }, delay);
        }
    };
};