/**
 * Created by hans on 19.09.15.
 */

describe('reminder', function(){

    before(function () {
        this.$fixtures = $("<div id='fixtures' ></div>")
        $('body').append(this.$fixtures);
        this.$fixture = $("<div id='mocha-fixture'></div>");
    });

    beforeEach(function () {
        this.$fixture.empty().appendTo($("#fixtures"));
    });

    afterEach(function () {
        this.$fixture.empty();
    });

    describe('init', function(){

        it('should display reminder if registration is possible in the future', function(){
            var pageContentMock = $('<div class="groupHeaderWrapper"><div class="header_element"><span>Anmeldung ab 05.10.15</span></div></div>' +
            '<div id="registrationForm:begin">01.01.2015</div>');
            this.$fixture.append(pageContentMock);

            var requests = {
                renderReminder: sinon.stub().yields('<button></button>')
            };
            reminder.init(requests);

            expect($('.groupHeaderWrapper').children().length).to.equal(2);

        });

        it('should not display reminder if registration over or possible', function(){
            var pageContentMock = $('<div class="groupHeaderWrapper"><div class="header_element"><span>Anmeldung möglich</span></div></div>' +
                '<div id="registrationForm:begin">01.01.2015</div>');
            this.$fixture.append(pageContentMock);
            var requests = {
                renderReminder: sinon.stub().yields('<button ></button>')
            };
            reminder.init(requests);

            assert.equal($('.groupHeaderWrapper').children().length, 1, "Reminder was created");
        });
    });

    describe('click', function(){
        it('should create an event on click', function(){
            var pageContentMock =$(
                '<div id="contentInner"><h1>Lva Name</h1></div>' +
                '<div class="groupHeaderWrapper"> <div class="header_element"><span>Anmeldung ab 01.01.2015</span></div></div>'  +
                '<div id="registrationForm:begin">21.09.2015, 12:00</div>');
            this.$fixture.append(pageContentMock);

            var requests = {
                createReminder: function () {
                },
                renderReminder: function () {
                }
            };
            var mock = sinon.mock(requests);
            mock.expects("createReminder").once().withArgs({name: "Lva Name", date: "2015-09-21T10:00:00.000Z"});
            mock.expects("renderReminder").once().yields("<button id='reminder-button'></button>");

            reminder.init(requests);
            var button = $('#reminder-button');
            button.trigger($.Event("click"));
            mock.verify();
        });

        it("should display a notification if event created", function(){
            var pageContentMock = $("<div id='contentInner'><h1>Lva Name</h1></div>" +
                "<div class='groupHeaderWrapper'> <div class='header_element'><span>Anmeldung ab 01.01.2015</span></div></div>"  +
                "<div id='registrationForm:begin'>21.09.2015, 12:00</div>");
            this.$fixture.append(pageContentMock);

            var requests = {
                createReminder: function () {
                },
                renderReminder: function () {
                }
            };
            var mock = sinon.mock(requests);
            mock.expects("createReminder").yields({type: "Notificaton", data: "Event created"});
            mock.expects("renderReminder").yields("<button id='reminder-button'></button>");
            var spy = sinon.spy(console, "log");

            reminder.init(requests);
            var button = $('#reminder-button');
            button.trigger($.Event("click"));


            expect(spy.calledWith("Event created")).to.be.true;
            spy.restore()
        })

        it("should display error notification if no event created", function(){
            var pageContentMock = $("<div id='contentInner'><h1>Lva Name</h1></div>" +
                "<div class='groupHeaderWrapper'> <div class='header_element'><span>Anmeldung ab 01.01.2015</span></div></div>"  +
                "<div id='registrationForm:begin'>21.09.2015, 12:00</div>");
            this.$fixture.append(pageContentMock);


            var requests = {
                createReminder: function () {
                },
                renderReminder: function () {
                }
            };
            var mock = sinon.mock(requests);
            mock.expects("createReminder").yields({type: "ERROR", error: "Some error"});
            mock.expects("renderReminder").yields("<button id='reminder-button'></button>");
            var spy = sinon.spy(console, "log");

            reminder.init(requests);
            var button = $('#reminder-button');
            button.trigger($.Event("click"));

            expect(spy.calledWith("Error: Some error")).to.equal(true);
            spy.restore()
        })
    });

});
