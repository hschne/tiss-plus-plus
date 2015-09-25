/**
 * Created by hans on 25.09.15.
 */
/* globals courseHistory */
describe('courses', function () {
    'use strict';

    describe('add', function () {

        it('should add a course to an empty list', function () {
            var chromeStorageSync = {
                    get: sinon.stub(),
                    set: sinon.stub()
            };
            chromeStorageSync.get.yields([]);

            courses.init(chromeStorageSync);
            var newCourse = {
                name: "name",
                number: "number",
                semester: "semester",
                date: new Date("01/01/2100").toJSON(),
                url: "someLink"
            };
            courses.add(newCourse);

            expect(courses.get().length).to.equal(1);
        });

        it('should update existing courses', function () {
            var existingCourses = CreateExistingCourses(1);
            var chromeStorageSync = {
                get: sinon.stub(),
                set: sinon.stub()
            };
            chromeStorageSync.get.yields(existingCourses);

            courses.init(chromeStorageSync);
            var newCourse = {
                name: "existing0",
                number: "number0",
                semester: "semester0",
                date: "anotherDate",
                url: "someLink"
            };
            courses.add(newCourse);

            var newList = courses.get();
            expect(newList.length).to.equal(1);
            expect(newList[0].date).to.equal("anotherDate");
        });

        it('should remove oldest entry if more than 10 courses', function () {
            var existingCourses = CreateExistingCourses(10);
            var chromeStorageSync = {
                get: sinon.stub(),
                set: sinon.stub()
            };
            chromeStorageSync.get.yields(existingCourses);

            courses.init(chromeStorageSync);
            var newCourse = {
                name: "name",
                number: "number",
                semester: "semester",
                date: new Date("01/01/2100").toJSON(),
                url: "someLink"
            };

            courses.add(newCourse);

            var newList = courses.get();
            expect(newList.length).to.equal(10);
            expect(newList[0].name).to.not.equal("existing0");
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
                    date: new Date(i + "/01/2010").toJSON(),
                    url: "someLink"
                });
        }
        return courses;
    }

});




