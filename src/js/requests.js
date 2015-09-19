/**
 * Created by hans on 18.09.15.
 */
var requests = (function () {
    var runtime;

    var ACTIONS = {
        RENDER_MAP: "RENDER_MAP",
        RENDER_COURSE_HISTORY: "RENDER_COURSE_HISTORY",
            RENDER_REMINDER: "RENDER_REMINDER",
            CREATE_REMINDER: "CREATE_REMINDER"
    };

    var init = function (chromeRuntime) {
        runtime = chromeRuntime;
    };

    var renderMap = function (data, callback) {
        runtime.sendMessage(
            {action: ACTIONS.RENDER_MAP, data: data}, function (result) {
            callback(result)
        });
    };

    var renderReminder = function(callback){
        runtime.sendMessage(
            {action: ACTIONS.RENDER_REMINDER}, function(result){
                callback(result);
            }
        )
    };

    var createReminder = function(data, callback){
        runtime.sendMessage({
            action: ACTIONS.CREATE_REMINDER, data: data }, function(result){
                callback(result)

        })
    };

    return {
        init: init,
        renderMap: renderMap,
        renderReminder: renderReminder,
        createReminder: createReminder,
        ACTIONS: ACTIONS
    };
}());