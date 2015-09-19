/**
 * Created by hans on 18.09.15.
 */
requests = (function () {

    var runtime;

    var actions;

    var init = function (chromeRuntime) {
        runtime = chromeRuntime;
        actions = {
            RENDER_MAP: "RENDER_MAP",
            RENDER_COURSE_HISTORY: "RENDER_COURSE_HISTORY",
            RENDER_REMINDER: "RENDER_REMINDER",
            CREATE_REMINDER: "CREATE_REMINDER"
        };
    };

    var renderMap = function (data, callback) {
        runtime.sendMessage(
            {action: actions.RENDER_MAP, data: data}, function (result) {
            callback(result)
        });
    };

    var renderReminder = function(callback){
        runtime.sendMessage(
            {action: actions.RENDER_REMINDER}, function(result){
                callback(result);
            }
        )
    };

    var createReminder = function(data, callback){
        runtime.sendMessage({
            action: actions.CREATE_REMINDER, data: data }, function(result){
                callback(result)

        })
    };

    return {
        init: init,
        renderMap: renderMap,
        renderReminder: renderReminder,
        createReminder: createReminder
    };
}());