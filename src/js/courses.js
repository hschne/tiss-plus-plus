/*global $ */
var courses = (function () {
    'use strict';

    var _chromeStorageSync;

    var _courses;

    var init = function (chromeStorageSync) {
        _chromeStorageSync = chromeStorageSync;
        _chromeStorageSync.get("courses", function (result) {
            _courses = result.courses || []
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

    var save = function () {
        _chromeStorageSync.set({"courses": _courses});
    };

    var get = function () {
        return _formatDates();
    };

    var _formatDates = function(){
        //Make a deep copy and format dates in copy
        var copy = [];
        for (var i = 0; i < _courses.length; i++) {
            var course = _courses[i];
            var newCourse = {
                name: course.name,
                number: course.number,
                semester: course.semester,
                date: _formatSingleDate(course.date),
                url: course.url
            }
            copy.push(newCourse);
        }
        return copy;
    };

    var _formatSingleDate = function(date) {
        var actualDate = new Date(date);
        var hours = actualDate.getHours();
        var minutes = actualDate.getMinutes();
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes;
        var date =("0" + actualDate.getDate()).slice(-2);
        var month = ("0" + (actualDate.getMonth() + 1)).slice(-2);
        return date +"." + month +"." + actualDate.getFullYear() + ", " + strTime;
    };

    return {
        init: init,
        add: add,
        save: save,
        get: get
    }

})();

