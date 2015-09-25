/**
 * Created by hans on 19.09.15.
 */

/* global chrome */
var templating;
templating = (function () {
    'use strict';

    var _mustache;

    var _chromeRuntime;

    var _baseFolder = "../../templates/";

    var TEMPLATE = {
        MAP_BUTTON: "map-button.mustache",
        REMINDER_BUTTON: "reminder-button.mustache",
        COURSE_HISTORY: "visited-courses.mustache"
    };

    var _loadTemplate = function (template) {
        var req = new XMLHttpRequest();
        var pathToTemplate = _baseFolder + template;
        req.open("GET", _chromeRuntime.getURL(pathToTemplate), true);
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                templates.push({name: template, template: req.responseText});
            }
        };
        req.send(null);
    };


    var templates = [];

    var init = function (chromeRuntime, mustache) {
        _chromeRuntime = chromeRuntime;
        _mustache = mustache;
    };


    var loadTemplates = function () {
        for (var property in TEMPLATE) {
            if (TEMPLATE.hasOwnProperty(property)) {
                _loadTemplate(TEMPLATE[property]);
            }
        }
    };

    var loadTemplatesFrom = function(array){
        templates = array;
    };

    var clearTemplates = function(){
        templates = [];
    };

    var renderTemplate = function( template, data, onSuccess, onFailure){
        var foundTemplate = templates.filter(function(item) {
            return item.name === template;
        });
        if(foundTemplate.length === 1){
            var rendered = _mustache.render(foundTemplate[0].template, data);
            onSuccess(rendered);
        }
        else{
            onFailure("Could not retrieve template "+template);
        }
    };

    return {
        init: init,
        load: loadTemplates,
        loadFrom: loadTemplatesFrom,
        clear: clearTemplates,
        TEMPLATE: TEMPLATE,
        templates: templates,
        render: renderTemplate
    };
}());