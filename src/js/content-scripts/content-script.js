/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var favouriteCourseUrl = "course/educationDetails.xhtml";
var newCourseUrl = "/course/courseDetails.xhtml";
var courseSearchPageUrl = "/course/courseList.xhtml";
var courseRegistrationUrl ="/course/courseRegistration.xhtml";


if (pageUrl.indexOf(favouriteCourseUrl) > -1 || pageUrl.indexOf(newCourseUrl) > -1) {
    var coursePage = new CoursePage(pageUrl);
    coursePage.displayRoomMaps();
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

if(pageUrl.indexOf(courseRegistrationUrl) > -1){
    requests.init(chrome.runtime);
    reminder.init(requests, $.notify);
}


