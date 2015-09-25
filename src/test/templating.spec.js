/**
 * Created by hans on 25.09.15.
 */
/* globals templating */
describe('templating', function () {
    'use strict';
    describe('load', function () {

        it('should load 3 templates', function () {
            createFakeRequests(this);
            var runtimeStub = createRuntimeStub();
            runtimeStub.getURL.withArgs("test").returns("Template");
            templating.init(runtimeStub, null);

            templating.load();
            // Answer requests via XMLHttp
            for (var i = 0; i < this.requests.length; i++) {
                this.requests[i].respond(200, null, "Content");
            }

            expect(templating.templates.length).to.equal(3);
            templating.clear();
        });

        it('should fill template content', function () {
            createFakeRequests(this);
            var runtimeStub = createRuntimeStub();
            runtimeStub.getURL.withArgs("test").returns("Template");
            templating.init(runtimeStub, null);

            templating.load();
            // Answer requests via XMLHttp
            for (var i = 0; i < this.requests.length; i++) {
                this.requests[i].respond(200, null, "Content");
            }

            expect(templating.templates[0].template).to.equal("Content");
            templating.clear();
        })
    });

    describe('render', function () {
        it('should call success callback with rendered template', function () {
            var mustacheStub = createMustacheStub();
            mustacheStub.render.withArgs("TemplateContent").returns("RenderedTemplate");

            templating.init(null, mustacheStub);
            templating.loadFrom([{name: "TestTemplate", template: "TemplateContent"}]);

            var successCallback = sinon.spy();
            templating.render("TestTemplate", null, successCallback, null);

            expect(successCallback.calledWith("RenderedTemplate")).to.be.true;
        });

        it('should call error callback if template does not exist', function () {
            var mustacheStub = createMustacheStub();
            mustacheStub.render.withArgs("TestTemplate").returns("RenderedTemplate");

            templating.init(null, mustacheStub);
            templating.loadFrom([{name: "TestTemplate", template: "TemplateContent"}]);

            var errorCallback = sinon.spy();
            templating.render("AnotherTemplate", null, null, errorCallback);

            expect(errorCallback.called).to.be.true;

        });

    });


    function createFakeRequests(func) {
        func.xhr = sinon.useFakeXMLHttpRequest();
        var requests = func.requests = [];

        func.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    }

    function createMustacheStub() {
        return {
            render: sinon.stub()
        }
    }

    function createRuntimeStub() {
        return {
            getURL: sinon.stub()
        };
    }

});