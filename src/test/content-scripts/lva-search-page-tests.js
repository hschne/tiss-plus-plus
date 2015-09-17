/**
 * Created by hasch on 12.09.2015.
 */
QUnit.module("Lva search page tests");
QUnit.begin(function () {
    $('body').append('<div id="qunit-fixture"></div>');
});
QUnit.test('Render content in content-inner', function (assert) {
    var pageContentMock = "<div id='contentInner'></div>";
    $('#qunit-fixture').append(pageContentMock);
    var contentToAdd = "<div id='renderedContent'>Hello</div>"

    var lvaSearchPage = new LvaSearchPage();
    lvaSearchPage.displayRecentlyVisitedLvas(contentToAdd);

    var newContent = $('#renderedContent');
    assert.equal(newContent.text(), "Hello", "Content has been rendered");
});

QUnit.test('Another table already exists', function (assert) {
    var pageContentMock = "<div id='contentInner'><div id='courseList:courseTable'></div></div>";
    $('#qunit-fixture').append(pageContentMock);
    var contentToAdd = "<div id='renderedContent'>Hello</div>"

    var lvaSearchPage = new LvaSearchPage();
    lvaSearchPage.displayRecentlyVisitedLvas(contentToAdd);

    var newContent = $('#renderedContent');
    assert.equal(newContent.length, 0, "No new content has been rendered");
});
