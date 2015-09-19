/**
 * Created by hans on 19.09.15.
 */
var reminder = (function(){

    var _requests;

    var init = function(requests){
        _requests = requests;
        _createReminderButton();
    };

    var _getReminderData = function(){
        var registrationBegin = $("#registrationForm\\:begin").text();
        //text is of form 01.01.2015, 12:00
        var datePart = registrationBegin.split(',')[0].trim();
        var timePart = registrationBegin.split(',')[1].trim();
        return { date: datePart, time: timePart};
    };

    var _createReminder = function(){
        var data = _getReminderData();
        _requests.createReminder(data, function(result) {
            //Handle result
        })
    };

    var _createReminderButton = function(){
        _requests.renderReminder(function(reminderButton){
            var header = $(".groupHeaderWrapper").get(0);
            header.innerHTML = header.innerHTML + reminderButton;
            var reminderButton =  $("#reminder-button");
            reminderButton.click(function(){
                _createReminder();
            });
        })

    };

    return {
        init: init
    }
}());