/**
 * Created by hans on 19.09.15.
 */
var reminder = (function(){

    var _requests;

    var init = function(requests){
        _requests = requests;
        _createReminderButton();
    };

    var _getTextWithoutChildren = function(element) {
        return element.clone()
            .children()
            .remove()
            .end()
            .text();

    };

    var _sanitizeText = function(text){
        return text.replace(/(\r\n|\n|\r)/gm,"").trim();
    };

    var _getReminderData = function(){
        var registrationBegin = $("#registrationForm\\:begin").text();
        //text is of form 01.01.2015, 12:00
        var datePart = registrationBegin.split(',')[0].trim();
        var yearMonthDay = datePart.split('.');
        var timePart = registrationBegin.split(',')[1].trim();
        var hoursMinutes = timePart.split(':');
        var date = new Date(yearMonthDay[2], parseInt(yearMonthDay[1])-1, yearMonthDay[0], hoursMinutes[0], hoursMinutes[1], 0, 0).toJSON();
        var $contentInner = $('#contentInner');
        var header = $contentInner.find('h1').first();
        var name =  _sanitizeText(_getTextWithoutChildren(header));
        return { name: name, date: date};
    };

    var _createReminder = function(){
        var data = _getReminderData();
        _requests.createReminder(data, function(result) {
            //Handle result
        })
    };

    var _createReminderButton = function(){
        var registrationStatus = $(".header_element span").text();
        if (registrationStatus.indexOf("Anmeldung ab") > -1) {
            _requests.renderReminder(function(reminderButton){
                var header = $(".groupHeaderWrapper").get(0);

                header.innerHTML = header.innerHTML + reminderButton;
                var reminderButton =  $("#reminder-button");
                reminderButton.click(function(){
                    _createReminder();
                });
            })
        }
    };

    return {
        init: init
    }
}());