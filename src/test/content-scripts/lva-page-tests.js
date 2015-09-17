QUnit.module("Lva page tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Add room button to link', function (assert) {
    var currentRoomLink = "someurl";
    var roomName = "name";
    var pageContentMock = "<div id='linkContainer'><a href='" + currentRoomLink + "'>" + roomName + "</a></div>";
    $('#qunit-fixture').append(pageContentMock);

    var coursePage = new CoursePage();
    coursePage.getJson = function (cb) {
        var jsonToReturn = [{
            name: roomName,
            link: "/someLink"
        }];
        cb(jsonToReturn);
    }
    coursePage.roomLink = currentRoomLink;

    var done = assert.async();
    coursePage.displayRoomMaps();
    setTimeout(function () {
        assert.equal($('#linkContainer').children().length, 2, "Another link was inserted");
        assert.equal($('.map-button').get(0).getAttribute('href'), "http://www.wegweiser.ac.at/someLink");
        done();
    });
});

QUnit.test('Extract lva from page', function (assert) {
    var currentRoomLink = "currentUrl";
    var pageContentMock = "<div id='contentInner'><h1><span class='light'>184.685</span>Lva Name</h1><div id='subHeader'>2015W, VU, 2.0h</div></div>";
    $('#qunit-fixture').append(pageContentMock);
    var coursePage = new CoursePage(currentRoomLink);

    var course = coursePage.getCourse();

    assert.equal(course.name, "Lva Name", "Lva name extracted");
    assert.equal(course.number, "184.685", "Lva number extracted");
    assert.equal(course.semester, "2015W", "Lva semester extracted");
    assert.equal(course.url, "currentUrl", "Lva url extracted");
});

QUnit.test('Remove whitespsaces and linebreaks from data', function (assert) {
    var currentRoomLink = "currentUrl";
    var pageContentMock = "<div id='contentInner'><h1><span class='light'>184.685  </span>\r\n Lva Name </h1><div id='subHeader'>2015W , VU, 2.0h</div></div>";
    $('#qunit-fixture').append(pageContentMock);
    var coursePage = new CoursePage(currentRoomLink);

    var course = coursePage.getCourse();

    assert.equal(course.name, "Lva Name", "Lva name extracted");
    assert.equal(course.number, "184.685", "Lva number extracted");
    assert.equal(course.semester, "2015W", "Lva semester extracted");
    assert.equal(course.url, "currentUrl", "Lva url extracted");
});



QUnit.done(function () {
    $('#qunit-fixture').remove();
});