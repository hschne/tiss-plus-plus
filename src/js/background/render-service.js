/**
 * Created by hasch on 12.09.2015.
 */
function RenderService(chrome) {
    var instance = {};

    var chromeApi = chrome;

    var templateFolder = "../../templates/";

    function getTemplate(templateName, callback) {
        var req = new XMLHttpRequest();
        var pathToTemplate = templateFolder + templateName;
        req.open("GET", chromeApi.getURL(pathToTemplate), true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                callback(req.responseText)
            }
        };
        req.send(null);
    }

    function formatDate(courseList){
        for(var i= 0; i<courseList.length; i++ ){
            var course = courseList[i];
            course.date = formatSingleDate(course.date);
        }
        return courseList;
    }

    function formatSingleDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "." + date.getDate() + "." + date.getFullYear() + "  " + strTime;
    }

    instance.renderRecentCourses = function (courseList, callback) {
        getTemplate("visited-courses.mustache", function (template) {
            var rendered = Mustache.render(template, {courses: formatDate(courseList)});
            callback(rendered);
        })
    };

    instance.renderMapButton = function(mapLink, callback){
        getTemplate("map-button.mustache", function(template){
            var rendered = Mustache.render(template, { url: mapLink});
            callback(rendered);
        });
    };

    return instance;
}