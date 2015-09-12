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

    instance.renderRecentLvas = function (lvaList, callback) {
        getTemplate("visited-lvas.mustache", function (template) {
            var rendered = Mustache.render(template, {lvas: lvaList});
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