/**
 * Created by hasch on 06.09.2015.
 */
requests.init(chrome.runtime);
templating.init();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request) {
        if(request.action == "GetMapButton"){
            var renderService = new RenderService(chrome.runtime);
            renderService.renderMapButton(request.data, sendResponse)
        }
        else if (request.action == "UpdateCourseList") {
            chrome.storage.sync.get("courseList", function (val) {
                var courseList = new CourseList(val.courseList);
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


            
        }


    }
    return true;
});
