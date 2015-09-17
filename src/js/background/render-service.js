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

    function formatDate(lvaList){
        for(var i= 0; i<lvaList.length; i++ ){
            var lva = lvaList[i];
            lva.date = formatSingleDate(lva.date);
        }
        return lvaList;
    }

    function formatSingleDate(date){
        var actualDate = new Date(date);
        var day = actualDate.getDate(),
            month = actualDate.getMonth() + 1,
            year = actualDate.getFullYear();
        return day +"." +month+"."+year;
    }

    instance.renderRecentLvas = function (lvaList, callback) {
        getTemplate("visited-lvas.mustache", function (template) {
            var rendered = Mustache.render(template, {lvas: formatDate(lvaList)});
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