/**
 * Created by hans on 19.09.15.
 */
var calendar = (function() {

    var _identity;

    var _CALENDAR_LIST_URI = "https://www.googleapis.com/calendar/v3/users/me/calendarList";


    var init = function(identity){
        _identity = identity;
    };

    var createEvent = function(eventData, callback){
        _identity.authenticatedRequest('GET',
            _CALENDAR_LIST_URI, true, function(error, status, response){
                var response = response;
                var items = response.items;
            })
    }

    return {
        init: init,
        createEvent: createEvent
    }
}());