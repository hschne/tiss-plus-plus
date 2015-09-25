/**
 * Created by hans on 19.09.15.
 */
QUnit.module("Reminder widget tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Should display reminder if registration is possible in the future', function (assert) {
    var pageContentMock = "<div class='groupHeaderWrapper'><div class='header_element'><span>Anmeldung ab 05.10.15</span></div></div>" +
        "<div id='registrationForm:begin'>01.01.2015</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        renderReminder: sinon.stub().yields("<button></button>")
    };
    reminder.init(requests);

    assert.equal($('.groupHeaderWrapper').children().length, 2, "Reminder was created");

});

QUnit.test('Should not display reminder if registration over or possible', function (assert) {
    var pageContentMock = "<div class='groupHeaderWrapper'><div class='header_element'><span>Anmeldung möglich</span></div></div>" +
        "<div id='registrationForm:begin'>01.01.2015</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        renderReminder: sinon.stub().yields("<button></button>")
    };
    reminder.init(requests);

    assert.equal($('.groupHeaderWrapper').children().length, 1, "Reminder was created");

});


QUnit.test('Should create event on click', function () {
    var pageContentMock = "<div id='contentInner'><h1>Lva Name</h1></div>" +
        "<div class='groupHeaderWrapper'> <div class='header_element'><span>Anmeldung ab 01.01.2015</span></div></div>"  +
        "<div id='registrationForm:begin'>21.09.2015, 12:00</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        createReminder: function () {
        },
        renderReminder: function () {
        }
    };
    var mock = sinon.mock(requests);
    mock.expects("createReminder").once().withArgs({name: 'Lva Name', date: "2015-09-21T10:00:00.000Z"});
    mock.expects("renderReminder").once().yields("<button id='reminder-button'></button>");

    reminder.init(requests);
    var button = $('#reminder-button');
    button.trigger($.Event("click"));
    mock.verify();
    expect(0);
});

QUnit.test('Should display normal notification if event created', function (assert) {
    var pageContentMock = "<div id='contentInner'><h1>Lva Name</h1></div>" +
        "<div class='groupHeaderWrapper'> <div class='header_element'><span>Anmeldung ab 01.01.2015</span></div></div>"  +
        "<div id='registrationForm:begin'>21.09.2015, 12:00</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        createReminder: function () {
        },
        renderReminder: function () {
        }
    };
    var mock = sinon.mock(requests);
    mock.expects("createReminder").yields({type: "Notificaton", message: "Event created"});
    mock.expects("renderReminder").yields("<button id='reminder-button'></button>");
    var spy = sinon.spy(console, "log");

    reminder.init(requests);
    var button = $('#reminder-button');
    button.trigger($.Event("click"));

    assert.equal(spy.calledWith("Event created"), true);
    spy.restore()
});

QUnit.test('Should display error notification if no event created', function (assert) {
    var pageContentMock = "<div id='contentInner'><h1>Lva Name</h1></div>" +
        "<div class='groupHeaderWrapper'> <div class='header_element'><span>Anmeldung ab 01.01.2015</span></div></div>"  +
        "<div id='registrationForm:begin'>21.09.2015, 12:00</div>";
    $('#qunit-fixture').append(pageContentMock);


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

    assert.equal(spy.calledWith("Error: Some error"), true);
    spy.restore()
});

