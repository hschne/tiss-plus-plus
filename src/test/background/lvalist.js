QUnit.module("Recently visited LVAs tests")
QUnit.test('Add lva to non-empty list', function (assert) {
    var lvas = [
        {
            name: "name",
            number: "number",
            semester: "WS2015",
            visited: "01.01.2015",
            url: "testurl"
        }
    ]
    var newLva = {
        name: "newName",
        number: "newNumber",
        semester: "newSemester",
        visited: "01.02.2015",
        url: "anotherUrl"
    }

    var lvaList = new LvaList(lvas);
    lvaList.add(newLva);

    assert.equal(lvaList.get().length, 2, "New LVA added")

});