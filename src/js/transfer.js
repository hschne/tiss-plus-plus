/**
 * Created by hans on 18.09.15.
 */
transfer = (function(){
    var actions = {
        RENDER_MAP: "RENDER_MAP",
        RENDER_COURSE_HISTORY: "RENDER_COURSE_HISTORY",
        RENDER_REMINDER: "RENDER_REMINDER"
    };

    var renderMapRequest = function(room) {
        return {
            action: actions.RENDER_MAP,
            data: room
        }
    };

    var renderCourseHistoryRequest = function(courses){
        return {
            action: actions.RENDER_COURSE_HISTORY,
            data: courses
        }
    };

    var renderReminderRequest = function(){
        return {
            action: actions.RENDER_REMINDER
        }
    };

    return {
        actions: actions,
        getMap : renderMapRequest,
        getHistory: renderCourseHistoryRequest,
        getReminder: renderReminderRequest
    }
}());