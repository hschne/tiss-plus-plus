/**
 * Created by hans on 19.09.15.
 */
var templating = (function () {

    var _baseFolder = "../../templates/";

    var TEMPLATE_FILES =  {
        MAP_BUTTON: "map-button.mustache",
            REMINDER_BUTTON: "reminder-button.mustache",
            COURSE_HISTORY: "visited-courses.mustache"
    };

    var _loadTemplate = function (templateName) {
        var req = new XMLHttpRequest();
        var pathToTemplate = _baseFolder + templateName;
        req.open("GET", chrome.runtime.getURL(pathToTemplate), true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                templates.push({ name: templateName, template: req.responseText});
            }
        };
        req.send(null);
    }


    var _loadTemplates = function () {
        for (var property in TEMPLATE_FILES) {
            if (TEMPLATE_FILES.hasOwnProperty(property)) {
                _loadTemplate(TEMPLATE_FILES[property]);
            }
        }
    }

    var templates = [];

    var init = function () {

        _loadTemplates()
    };

    return {
        TEMPLATE_FILES: TEMPLATE_FILES,
        init: init,
        templates: templates
    }
}());