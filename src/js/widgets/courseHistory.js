/**
 * Created by hans on 25.09.15.
 */
var courseHistory = (function () {

    var _requests;

    var init = function (requests) {
        _requests = requests;
    };

    var display = function () {
        _requests.renderHistory(null, function (result) {
            _displayTable(result)
        })
    };

    var _displayTable = function (table) {
        var anotherTable = $("#courseList\\:courseTable");
        if (anotherTable.length == 0) {
            var contentInner = $('#contentInner').get(0);
            var existingContent = contentInner.innerHTML;
            contentInner.innerHTML = existingContent + table;
            //Activate sorting by date and sort ascending
            $("#recent-course-table").tablesorter({sortList: [[3, 1]]});
        }
    };

    var update = function () {
        var $contentInner = $('#contentInner');
        var header = $contentInner.find('h1').first();
        var subHeader = $contentInner.find('#subHeader').first();
        var name = _sanitizeText(_getTextWithoutChildren(header));
        var number = _sanitizeText(header.find('span').first().text());
        var semester = _sanitizeText(subHeader.text().split(',')[0]);
        var date = new Date().toJSON();
        var url = location.url;
        //Only return if page could be loaded properly
        if (name != "" && number != "" && semester != "") {
            _requests.updateHistory({
                name: name,
                number: number,
                semester: semester,
                date: date,
                url: url
            }, function (result) {

            });
        }
    };

    var _getTextWithoutChildren = function (element) {
        return element.clone()
            .children()
            .remove()
            .end()
            .text();

    };

    var _sanitizeText = function (text) {
        return text.replace(/(\r\n|\n|\r)/gm, "").trim();
    };

    return {
        init: init,
        update: update,
        display: display
    };
})();

