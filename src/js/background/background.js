/**
 * Created by hasch on 06.09.2015.
 */
requests.init(chrome.runtime);
templating.init(chrome.runtime, Mustache);
templating.load();
rooms.init(chrome.runtime);
courses.init(chrome.storage.sync);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    'use strict';
    if (request) {
        if (request.action === requests.ACTIONS.RENDER_MAP) {
            rooms.getMap(request.data, function (result) {
                sendResponse(result)
            }, function (error) {
                sendResponse(error);
            })
        }
        else if (request.action == requests.ACTIONS.UPDATE_COURSE_HISTORY) {
            courses.add(request.data);
            courses.save();
        }
        else if (request.action == requests.ACTIONS.RENDER_COURSE_HISTORY) {
            var renderData = { courses: courses.get()};
            templating.render(templating.TEMPLATE.COURSE_HISTORY, renderData, function (result) {
                sendResponse(result)
            }, function (error) {
                sendResponse({type: 'Error', data: error});
            })
        }
        else if (request.action == requests.ACTIONS.RENDER_REMINDER) {
            templating.render(templating.TEMPLATE.REMINDER_BUTTON, null, function (result) {
                sendResponse(result);
            }, function (error) {
                sendResponse({type: 'Error', data: error})
            })
        }
        else if (request.action = requests.ACTIONS.CREATE_REMINDER) {
            identity.authenticate();
            calendar.init(identity);
            calendar.createEvent(request.data, function (result) {
                sendResponse({data: result});
            }, function (error) {
                sendResponse({type: "Error", data: error})
            });
        }
    }
    return true;
});
