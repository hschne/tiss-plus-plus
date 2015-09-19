/**
 * Created by hans on 18.09.15.
 */
requests = (function () {

    var runtime;

    var init = function (chromeRuntime) {
        runtime = chromeRuntime;
    };

    var renderMap = function (room, callback) {
        runtime.sendMessage(
            {action: tpp.transfer.actions.RENDER_MAP, data: room}, function (map) {
            callback(map)
        });
    };

    return {
        init: init,
        renderMap: renderMap
    };
}());