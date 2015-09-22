/**
 * Created by hasch on 22.09.2015.
 */
QUnit.module("Calendar tests");

QUnit.test('Create calendar event', function () {
    var expectedMethod = "POST";
    var expectedRequestUri = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    var expectedRequestData = createExpectedRequestData();
    var identity = createIdentityStub();

    var mock = sinon.mock(identity);
    mock.expects("authenticatedRequest").once().withArgs(expectedMethod, expectedRequestUri, expectedRequestData).yields({ Result: "OK"});

    calendar.init(identity);
    calendar.createEvent(createEventData(), function() {} );
    mock.verify("Create event called");
    expect(0);
});

var createEventData = function(){
    return {
        name: "Course name",
        date: "2015-02-01T12:00:00.000Z"
    }

};

var createExpectedRequestData = function() {
    var startTime = new Date('2015-02-01T12:00:00').toJSON();
    var endTime = new Date('2015-02-01T12:30:00').toJSON();
    var event = {
        'summary': 'Anmeldung für Course name',
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


var createIdentityStub = function(){
    return {
        authenticatedRequest: function () {
        }
    };

};
