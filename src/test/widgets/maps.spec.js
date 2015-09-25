/**
 * Created by hans on 18.09.15.
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

    describe('init', function(){
        it('should display new links', function(){
            var targetLink = $('<div id="linkContainer"><a href="/events/roomSchedule.xhtml">Room Name</a></div>');
            this.$fixture.append(targetLink);
            var requests = {
                renderMap: sinon.stub()
            };
            requests.renderMap.yields('<div id="newContent">New content</div>');

            maps.init(requests);

            expect($('#newContent').length).to.equal(1);


        })
    })

});
