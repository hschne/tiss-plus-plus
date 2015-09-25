/**
 * Created by hans on 25.09.15.
 */


/* globals courseHistory */

describe('course list', function(){
    'use strict';

    describe('add', function(){

        it('should add a course to an empty list', function(){
            var newCourse = CreateDummyCourse();
            var courseList = new courseHistory.CourseList();
            courseList.add(newCourse);

            expect(courseList.get().length).to.equal(1);
        });

        it('should update existing courses', function(){
            var courses = CreateExistingCourses(1);
            var courseList = new courseHistory.CourseList(courses);
            var newCourse = {
                name: "existing0",
                number: "number0",
                semester: "semester0",
                date: "another date",
                url: "someLink"
            };

            courseList.add(newCourse);

            var newList = courseList.get();
            expect(newList.length).to.equal(1);
            expect(newList[0].date).to.not.equal("anotherDate");
        });

        it('should remove oldest entry if more than 10 courses', function(){
            var existingCourses = CreateExistingCourses(10);
            var courseList = new courseHistory.CourseList(existingCourses);
            var newCourse = CreateDummyCourse();

            courseList.add(newCourse);

            var newList = courseList.get();
            expect(newList.length).to.equal(10);
            expect(newList[0].name).to.not.equal("existing0");
        });

    });

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
                url: "someLink"
            });
    }
    return courses;

}
function CreateDummyCourse() {
    return {
        name: "name",
        number: "number",
        semester: "semester",
        date: new Date("01/01/2100").toJSON(),
        url: "someLink"
    };
}

