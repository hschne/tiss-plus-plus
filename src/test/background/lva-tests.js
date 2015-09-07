/**
 * Created by hasch on 07.09.2015.
 */
QUnit.test('Compare two lvas', function (assert) {
    var lvaOne = new Lva("name", "number", "semester", "01.01.2015", "link");
    var lvaTwo = new Lva("anotherName", "number", "semester", "01.01.2015", "link");

    assert.equal(lvaOne.equals(lvaTwo), false, "Lvas are not equal")
});

QUnit.test('Compare two lvas', function (assert) {
    var lvaOne = new Lva("name", "number", "semester", "01.01.2015", "link");
    var lvaTwo = new Lva("name", "number", "semester", "01.01.2015", "link");

    assert.equal(lvaOne.equals(lvaTwo), true, "Lvas are equal")
});
