/**
 * Created by hasch on 06.09.2015.
 */
/*global chrome */
/*global Mustache */
/*global requests */
/*global courseHistory */
/*global templating */
requests.init(chrome.runtime);
templating.init(chrome.runtime, Mustache);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    'use strict';
    if (request) {
        if(request.action === "GetMapButton"){
            var mapButton = templating.TEMPLATE.MAP_BUTTON;
            templating.render(mapButton, request.data, function(result) {
                sendResponse({type: 'Basic', data: result});
            }, function(error){
                sendResponse({type: 'Error', data: error})
            });
        }
        else if (request.action == "UpdateCourseList") {
            chrome.storage.sync.get("courseList", function (result) {
                var courseList = new courses.CourseList(result.courseList);
                courseList.add(request.data);
                chrome.storage.sync.set({"courseList": courseList.get()});
            });
        }
        else if (request.action == "GetRecentCourseTable") {
            chrome.storage.sync.get("courseList", function (val) {
                var renderService = new RenderService(chrome.runtime);
                renderService.renderRecentCourses(val.courseList, sendResponse)
            });
        }
        else if(request.action == requests.ACTIONS.RENDER_REMINDER){
            var found = templating.templates.filter(function(item) {
                return item.name === templating.TEMPLATE_FILES.REMINDER_BUTTON;
            });
            if(found.length != 1){
                sendResponse("Error: Could not retrieve template ")
            }
            sendResponse(found[0].template);
        }
        else if(request.action = requests.ACTIONS.CREATE_REMINDER) {
            identity.authenticate();
            calendar.init(identity);
            calendar.createEvent(request.data, function(result){
                sendResponse({type: "Basic", data: result });
            }, function(error){
                sendResponse({type: "Error", data: error})
            });
        }


    }
    return true;
});
