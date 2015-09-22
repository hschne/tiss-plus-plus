/**
 * Created by hasch on 22.09.2015.
 */
QUnit.module("Calendar tests");

QUnit.test('Create calendar event', function (assert) {

    var expectedMethod = "POST";
    var expectedRequestUri = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    var expectedRequestData = createExpectedRequestData();
    var identity = createIdentityStub();

    var mock = sinon.mock(identity);
    mock.expects("authenticatedRequest").once().withArgs(expectedMethod, expectedRequestUri, expectedRequestData).yields({ Result: "OK"})

    calendar.init(identity)
    calendar.createEvent(null, function(){});
    mock.verify("Create event called")
    expect(0);
});

var createExpectedRequestData = function() {
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

var createIdentityStub = function(){
    var identity = {
        authenticatedRequest: function() {}
    };
    return identity;

}
