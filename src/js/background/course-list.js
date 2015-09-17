function CourseList(courses) {
    if ($.isEmptyObject(courses) || courses == null) {
        courses = [];
    }
    this.courses = courses;
}

CourseList.prototype.add = function (oldCourses) {
    var courses = this.courses;

    function coursesEqual(oldCourse, newCourse){
        if (oldCourse.name != newCourse.name) {
            return false
        }
        if (oldCourse.number != newCourse.number) {
            return false;
        }
        return oldCourse.semester == newCourse.semester;
    }

    function duplicateUpdated() {
        for (var i = 0; i < courses.length; i++) {
            var oldCourse = courses[i];
            if (coursesEqual(oldCourse, oldCourses)) {
                courses[i].date = oldCourses.date;
                return true;
            }
        }
        return false;
    }

    if (!duplicateUpdated()) {
        courses.push(oldCourses);
        courses.sort(function(a,b){
                var date1 = new Date(a.date);
                var date2 = new Date(b.date);
                return date1 - date2;
            });
        if (courses.length > 10) {
            courses.shift();
        }
    }
};

CourseList.prototype.get = function () {
    return this.courses;
};
