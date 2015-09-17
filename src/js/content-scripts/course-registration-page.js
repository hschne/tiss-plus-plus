/**
 * Created by hasch on 17.09.2015.
 */
function CourseRegistrationPage(chromeApi){

    var chromeApi = chromeApi;

    var instance = this;

    var buttonContent = "<div id='reminder-button' title='Set a reminder in your calendar'> </div>"

    instance.renderRemindButton = function(){
        var header = $(".groupHeaderWrapper").get(0);
        header.innerHTML = header.innerHTML + buttonContent;
        $("#reminder-button").click(function(){
            instance.setReminder();
        })
    };

    function parseRegistrationBegin(){
        var registrationBegin = $("#registrationForm\\:begin").text();
        //text is of form 01.01.2015, 12:00
        var datePart = registrationBegin.split(',')[0].trim();
        var timePart = registrationBegin.split(',')[1].trim();
        return { date: datePart, time: timePart};
    }

    instance.setReminder = function(){
        var lvaInformation = parseLvaInformation();
        var parsedDate = parseRegistrationBegin();
        console.log("Reminder set for " +parsedDate.date +" "+ parsedDate.time );
    }

}