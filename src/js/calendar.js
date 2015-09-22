/**
 * Created by hans on 19.09.15.
 */
var calendar = (function() {

    var _identity;

    var _CALENDAR_EVENT_URI = "https://www.googleapis.com/calendar/v3/calendars/primary/events";


    var init = function(identity){
        _identity = identity;
    };

    var _createEventData = function(eventData) {
        var startTime = new Date('2015-09-30T09:00:00').toJSON();
        var endTime = new Date('2015-09-30T09:05:00').toJSON();
        var event = {
            'summary': 'Anmeldung für LVA',
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

    var createEvent = function(eventData, callback){
        _identity.authenticatedRequest('POST', _CALENDAR_EVENT_URI, _createEventData(), true, function(error, status, response){
            callback(response)
        });
    };

    return {
        init: init,
        createEvent: createEvent
    }
}());