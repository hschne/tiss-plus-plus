/**
 * Created by hasch on 12.09.2015.
 */
QUnit.module("Render service tests");
QUnit.test("Render Map button", function (assert) {
    //Fake chrome api
    var chromeApiMock = {
            getURL: function () {
                return "testContent"
            }
        },
        mock = sinon.mock(chromeApiMock);
    mock.expects("getURL").once().withExactArgs("../../templates/map-button.mustache");
    // Fake XMLHttpRequest
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
        requests.push(xhr);
    };

    var returnedContent = "";
    var callback = function (content) {
        returnedContent = content;
    };
    var done = assert.async();

    var renderService = new RenderService(chromeApiMock);
    renderService.renderMapButton("test", callback);
    this.requests[0].respond(200, {'Content-Type': 'text/plain'}, 'Content');

    mock.verify()
    setTimeout(function () {
        assert.equal(returnedContent, 'Content', "Content was returned from render");
        done();
    });
    this.xhr.restore()
    mock.restore();
});

QUnit.test("Render lva table", function (assert) {
    //Fake chrome api
    var chromeApiMock = {
            getURL: function () {
                return "testContent"
            }
        },
        mock = sinon.mock(chromeApiMock);
    mock.expects("getURL").once().withExactArgs("../../templates/visited-lvas.mustache");
    // Fake XMLHttpRequest
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
        requests.push(xhr);
    };

    var returnedContent = "";
    var callback = function (content) {
        returnedContent = content;
    };
    var done = assert.async();

    var renderService = new RenderService(chromeApiMock);
    renderService.renderRecentLvas(["1","2"], callback);
    this.requests[0].respond(200, {'Content-Type': 'text/plain'}, 'Content');

    mock.verify()
    setTimeout(function () {
        assert.equal(returnedContent, 'Content', "Content was returned from render");
        done();
    });
    this.xhr.restore()
    mock.restore();
});
