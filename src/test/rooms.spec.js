/**
 * Created by hans on 05.10.15.
 */
describe("rooms", function(){
    describe("init", function(){
        it("should fill array from resource", function(){
            var runtimeStub = {
                getURL: sinon.stub()
            };
            runtimeStub.getURL.withArgs("resources/room-links.json").returns( "url" );
            sinon.stub($, "ajax").yieldsTo("success", ["test1", "test2", "test3"])

            rooms.init(runtimeStub);

            expect(rooms.get().length).to.equal(3);
        })
    })

});