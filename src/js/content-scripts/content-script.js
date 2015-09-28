/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var favouriteCourseUrl = "course/educationDetails.xhtml";
var newCourseUrl = "/course/courseDetails.xhtml";
var courseSearchPageUrl = "/course/courseList.xhtml";
var courseRegistrationUrl ="/course/courseRegistration.xhtml";

requests.init(chrome.runtime);
courseHistory.init(requests);

if (pageUrl.indexOf(favouriteCourseUrl) > -1 || pageUrl.indexOf(newCourseUrl) > -1) {
    maps.init(requests);
    courseHistory.update();
}

if (pageUrl.indexOf(courseSearchPageUrl) > -1) {
    courseHistory.display();
}
if(pageUrl.indexOf(courseRegistrationUrl) > -1){
    reminder.init(requests, $.notify);
}


