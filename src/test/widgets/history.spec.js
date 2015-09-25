/**
 * Created by hans on 25.09.15.
 */
describe('history', function () {

    before(function () {
        this.$fixtures = $('<div id="fixtures" ></div>')
        $('body').append(this.$fixtures);
        this.$fixture = $('<div id="mocha-fixture"></div>');
    });

    beforeEach(function () {
        this.$fixture.empty().appendTo($('#fixtures'));
    });

    afterEach(function () {
        this.$fixture.empty();
    });

    describe('update', function () {
        it('should send course data from the page', function () {
            var courseInfo = $("<div id='contentInner'><h1><span class='light'>184.685</span>Lva Name</h1><div id='subHeader'>2015W, VU, 2.0h</div></div>");
            $('#mocha-fixture').append(courseInfo);

            var request = {
                updateHistory: function () {
                }
            };
            var mock = sinon.mock(request);
            mock.expects("updateHistory").withArgs(sinon.match.has("name", "Lva Name"));

            recentCourses.init(request);

            recentCourses.update();

            mock.verify();
        })
    });
});
