/**
 * Created by hans on 19.09.15.
 */
var reminder = (function () {

    var _requests;

    var init = function (requests) {
        _requests = requests;
        _initNotify();
        _createReminderButton();

    };

    var _initNotify = function(){
        $.notify.addStyle('tiss',{
            html: "<div><span data-notify-text/></div>"
        });
        $.notify.defaults({
            arrowShow: false,
            autoHideDelay: 3000,
            showAnimation: 'fadeIn',
            hideAnimation: 'fadeOut',
            elementPosition: 'right middle',
            style: 'tiss'
        });
    };

    var _createReminderButton = function () {
        var registrationStatus = $(".header_element span").text();
        if (registrationStatus.indexOf("Anmeldung ab") > -1) {
            _requests.renderReminder(function (reminderButton) {
                var header = $(".groupHeaderWrapper").get(0);
                header.innerHTML = header.innerHTML + reminderButton;
                var reminderButton = $("#reminder-button");
                reminderButton.click(function () {
                    _createCalendarEvent();
                });
            })
        }
    };

    var _createCalendarEvent = function () {
        var data = _getEventData();
        _requests.createReminder(data, function (result) {
            _displayResult(result);
        })
    };

    var _getEventData = function () {
        var registrationBegin = $("#registrationForm\\:begin").text();
        //text is of form 01.01.2015, 12:00
        var datePart = registrationBegin.split(',')[0].trim();
        var yearMonthDay = datePart.split('.');
        var timePart = registrationBegin.split(',')[1].trim();
        var hoursMinutes = timePart.split(':');
        var date = new Date(yearMonthDay[2], parseInt(yearMonthDay[1]) - 1, yearMonthDay[0], hoursMinutes[0], hoursMinutes[1], 0, 0).toJSON();
        var $contentInner = $('#contentInner');
        var header = $contentInner.find('h1').first();
        var name = _sanitizeText(_getTextWithoutChildren(header));
        return {name: name, date: date};
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

    var _displayResult = function (result) {
        var type = result.type;
        var reminderButton = $("#reminder-button");
        if (type == "ERROR") {
            reminderButton.notify(result.data, "error");
            console.log("Error: " +result.error);
        }
        else {
            reminderButton.notify(result.data, "success");
            console.log(result.data)
        }
    };

    return {
        init: init
    }
}());