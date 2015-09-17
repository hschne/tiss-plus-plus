/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var favouriteCourseUrl = "course/educationDetails.xhtml";
var newCourseUrl = "/course/courseDetails.xhtml";
var courseSearchPageUrl = "/course/courseList.xhtml";


if (pageUrl.indexOf(favouriteCourseUrl) > -1 || pageUrl.indexOf(newCourseUrl) > -1) {
    var coursePage = new CoursePage(pageUrl);
    coursePage.displayRoomMaps();
    var course = coursePage.getCourse();
    chrome.runtime.sendMessage({
        action: 'UpdateCourseList',
        data: coursePage.getCourse()
    });
}

if (pageUrl.indexOf(courseSearchPageUrl) > -1) {
    chrome.runtime.sendMessage({action: "GetRecentCourseTable"}, function (courseTable) {
        var courseSearchPage = new CourseSearchPage();
        courseSearchPage.displayRecentlyVisitedCourses(courseTable);
    });
}



