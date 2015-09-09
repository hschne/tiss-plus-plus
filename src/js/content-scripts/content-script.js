/**
 * Created by hasch on 09.09.2015.
 */
var location = window.location.href;

var lvaPageUrl = "course/educationDetails.xhtml";

if(location.indexOf(lvaPageUrl) > -1){
    var lvaPage = new LvaPage(location);
    lvaPage.displayRoomMaps();
    chrome.extension.sendMessage({
        action: 'UpdateLvaList',
        data: lvaPage.getLva()
    });
}


