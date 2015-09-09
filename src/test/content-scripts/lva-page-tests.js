
QUnit.module("Lva page tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Add room button to link', function (assert) {
    var currentRoomLink = "someurl";
    var roomName = "name";
    var pageContentMock = "<div id='linkContainer'><a href='" + currentRoomLink + "'>" + roomName + "</a></div>";
    $('#qunit-fixture').append(pageContentMock);


    var lvaPage = new LvaPage();
    lvaPage.getJson = function (cb) {
        var jsonToReturn = [{
            name: roomName,
            link: "/someLink"
        }];
        cb(jsonToReturn);
    }
    lvaPage.roomLink = currentRoomLink

    var done = assert.async();
    lvaPage.displayRoomMaps();
    setTimeout(function () {
        assert.equal($('#linkContainer').children().length, 2, "Another link was inserted");
        assert.equal($('.maplink').get(0).getAttribute('href'), "http://www.wegweiser.ac.at/someLink");
        done();
    });


});

QUnit.done(function () {
    $('#qunit-fixture').remove();
});