/**
 * Created by hans on 19.09.15.
 */
QUnit.module("Reminder widget tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Add reminder button', function (assert) {
    var pageContentMock = "<div class='groupHeaderWrapper'></div>" +
        "<div id='registrationForm:begin'>01.01.2015</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        renderReminder: sinon.stub().yields("<button></button>")
    };
    reminder.init(requests);

    var done = assert.async();
    setTimeout(function () {
        assert.equal($('.groupHeaderWrapper').children().length, 1, "Reminder was created");
        done();
    });
});


QUnit.test('Should create event on click', function (assert) {
    var pageContentMock = "<div class='groupHeaderWrapper'></div>" +
        "<div id='registrationForm:begin'>01.01.2015, 12:00</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        createReminder: function () {
        },
        renderReminder: function () {
        }
    }
    var mock = sinon.mock(requests);
    mock.expects("createReminder").once().withArgs( {date: "01.01.2015", time: "12:00"});
    mock.expects("renderReminder").once().yields("<button id='reminder-button'></button>");

    reminder.init(requests);
    var button = $('#reminder-button');
    button.trigger($.Event("click"));
    mock.verify();
    expect(0);

});
