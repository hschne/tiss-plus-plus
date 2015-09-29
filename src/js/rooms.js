/**
 * Created by hasch on 29.09.2015.
 */
var rooms = (function () {

    var _chromeRuntime;

    var _allRooms;

    var BASE_URL = "http://www.wegweiser.ac.at";

    var init = function (chromeRuntime, templating) {
        _chromeRuntime = chromeRuntime;
        _templating = templating;
        _loadAllRooms();
    };

    var _loadAllRooms = function () {
        var url = chrome.extension.getURL('resources/room-links.json');
        $.getJSON(url, function (data) {
            _allRooms = data;
        });
    };

    var _getMapUrl = function (roomName) {
        var url = _allRooms.filter(function (item) {
            return item.name === roomName;
        });
        if (url.length === 1) {
            return BASE_URL + url[0].link;
        }
    };

    var getMap = function (roomName, successCallback, errorCallback) {
        var url = _getMapUrl(roomName);
        if (url != null) {
            var renderData = {
                url: url
            };
            templating.render(templating.TEMPLATE.MAP_BUTTON, renderData, function (result) {
                    successCallback(result);
                }, function (error) {
                    errorCallback(error);

                }
            )
        }
    };

    return {
        init: init,
        getMap: getMap
    }
}());

