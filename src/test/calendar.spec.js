/**
 * Created by hasch on 22.09.2015.
 */

describe("calendar", function(){
    describe("createEvent", function(){

        it("should make an create calendar request", function(){
            var expectedMethod = "POST";
            var expectedRequestUri = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
            var expectedRequestData = createExpectedRequestData();
            var identity = createIdentityStub();

            var mock = sinon.mock(identity);
            mock.expects("authenticatedRequest").once().withArgs(expectedMethod, expectedRequestUri, expectedRequestData).yields(null, "status",{ Result: "OK"});

            calendar.init(identity);
            calendar.createEvent(createEventData(), function() {}, function() {} );
            mock.verify("Create event called");
        });

        it("should call the success callback if request succeeds", function(){
            var identity = {
                authenticatedRequest: sinon.stub()
            };
            identity.authenticatedRequest.yields(null, "status", "response")
            var callback = sinon.spy();

            calendar.init(identity);
            calendar.createEvent(createEventData(), callback, function() {});

            expect(callback.called).to.equal(true);
        });

        it("should call the error callback if request fails", function(){
            var identity = {
                authenticatedRequest: sinon.stub()
            };
            identity.authenticatedRequest.yields("ERROR", null, null)
            var callback = sinon.spy();

            calendar.init(identity);
            calendar.createEvent(createEventData(), function() {}, callback);

            expect(callback.called).to.equal(true);
        })



    });

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

