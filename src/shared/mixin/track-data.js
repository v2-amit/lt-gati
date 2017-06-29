/***
 * This provides an interface to push data into common object for tracking
 */
var trackData = {};

export default {
    set: function (obj) {
		var key = obj.key.replace(/[\W_]/g, '').toLowerCase();
		trackData[key] = obj.val;
    },
    get: function() {
        return trackData;
    }
}