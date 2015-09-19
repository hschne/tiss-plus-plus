/**
 * Created by hans on 18.09.15.
 */
QUnit.module("Map widget tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Add room button to link', function (assert) {
    var currentRoomLink = "<a href='/events/roomSchedule.xhtml'>Room Name</a>";
    var pageContentMock = "<div id='linkContainer'>" + currentRoomLink + "</div>";
    $('#qunit-fixture').append(pageContentMock);

    var requests = {
        renderMap: sinon.stub().yields("<div></div>")

    };

    maps.init(requests);

    var done = assert.async();
    setTimeout(function () {
        assert.equal($('#linkContainer').children().length, 2, "Another link was inserted");
        done();
    })
});