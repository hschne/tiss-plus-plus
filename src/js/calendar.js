/**
 * Created by hans on 19.09.15.
 */
var calendar = (function() {

    var _identity;

    var _CALENDAR_EVENT_URI = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

    var init = function(identity){
        _identity = identity;
    };

    var _createEventData = function(data) {
        var startTime = new Date(Date.parse(data.date));
        var endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 30)
        var event = {
            'summary': 'Anmeldung für ' + data.name,
            'start': {
                'dateTime': startTime
            },
            'end': {
                'dateTime': endTime
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        return JSON.stringify(event);
    };

    var createEvent = function(data, callback){
        _identity.authenticatedRequest('POST', _CALENDAR_EVENT_URI, _createEventData(data), true, function(error, status, response){
            callback(response)
        });
    };

    return {
        init: init,
        createEvent: createEvent
    }
}());