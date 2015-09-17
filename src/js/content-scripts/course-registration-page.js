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

    instance.setReminder = function(){
        console.log("Reminder set");
    }

}