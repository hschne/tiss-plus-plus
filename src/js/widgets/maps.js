/**
 * Created by hans on 18.09.15.
 */
maps = (function () {

    var _requests;

    var _targetLink = "'/events/roomSchedule.xhtml'";

    var _createButton = function (linkElement) {
        var currentRoom = linkElement.innerHTML;
        _requests.renderMap(currentRoom, function (map) {
            var parent = linkElement.parentElement;
            var parentContent = parent.innerHTML;
            parent.innerHTML = parentContent + map;
        });
    };

    var init = function (requests) {
        _requests = requests;
        var roomLinks = $('a[href*=' + _targetLink + ']');
        roomLinks.each(function () {
            var link = $(this);
            _createButton(link.get(0));
        });
    };

    return {
        init: init

    }
}());