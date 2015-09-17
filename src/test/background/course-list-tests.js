QUnit.module("Course list tests")
QUnit.test('Add course to empty list', function (assert) {
    var newCourse = CreateDummyCourse();
    var courseList = new CourseList();
    courseList.add(newCourse);

    assert.equal(courseList.get().length, 1, "Lva added to empty list");
});

QUnit.test('Add new lva to non-empty list', function (assert) {
    var courses = CreateExistingCourses(1);
    var courseList = new CourseList(courses);

    courseList.add(CreateDummyCourse());

    assert.equal(courseList.get().length, 2, "New LVA added");
});

QUnit.test('Add duplicate of lva', function (assert) {
    var courses = CreateExistingCourses(1);
    var courseList = new CourseList(courses);
    var newCourse = {
        name: "existing0",
        number: "number0",
        semester: "semester0",
        date: new Date().toJSON(),
        url: "somelink"
    };

    courseList.add(newCourse);

    var newList = courseList.get();
    assert.equal(newList.length, 1, "Lva updated");
    assert.notEqual(newList[0].date, "anotherDate", "Date updated")
});

QUnit.test("Add lva to full list", function (assert) {
    var existingCourses = CreateExistingCourses(10);
    var courseList = new CourseList(existingCourses);
    var newCourse = CreateDummyCourse();

    courseList.add(newCourse);

    var newList = courseList.get();
    assert.equal(newList.length, 10, "Length is still 10");
    assert.equal(newList[0].name, "existing1", "Oldest item was removed")
});

function CreateExistingCourses(count) {
    var courses = [];
    for (var i = 0; i < count; i++) {
        //Create courses with ascending date
        courses.push(
            {
                name: "existing" + i,
                number: "number" + i,
                semester: "semester" + i,
                date: new Date(i+"/01/2010").toJSON(),
                url: "somelink"
            });
    }
    return courses;

}
function CreateDummyCourse() {
    var newCourse = {
        name: "name",
        number: "number",
        semester: "semester",
        date: new Date("01/01/2100").toJSON(),
        url: "somelink"
    };
    return newCourse;
}