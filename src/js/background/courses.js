/*global $ */
var courses = (function () {
    'use strict';

    var _chromeStorageSync;

    var _courses;

    var init = function (chromeStorageSync) {
        _chromeStorageSync = chromeStorageSync;
        _chromeStorageSync.get("courses", function (result) {
            _courses = result
        });
    };

    var add = function (newCourse) {
        function coursesEqual(oldCourse, newCourse) {
            if (oldCourse.name !== newCourse.name) {
                return false;
            }
            if (oldCourse.number !== newCourse.number) {
                return false;
            }
            return oldCourse.semester === newCourse.semester;
        }

        function duplicateUpdated() {
            for (var i = 0; i < _courses.length; i++) {
                if (coursesEqual(_courses[i], newCourse)) {
                    _courses[i].date = newCourse.date;
                    return true;
                }
            }
            return false;
        }

        if (!duplicateUpdated()) {
            _courses.push(newCourse);
            _courses.sort(function (a, b) {
                var date1 = new Date(a.date);
                var date2 = new Date(b.date);
                return date1 - date2;
            });
            if (_courses.length > 10) {
                _courses.shift();
            }
        }

    };

    var save = function(){
        courseList.add(request.data);
        _chromeStorageSync.set({ "courses": courseList.get()});
    };

    var get = function(){
        return _courses;
    };

    return {
        init: init,
        add: add,
        save: save,
        get: get
    }

})();

