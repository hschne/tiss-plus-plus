/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var lvaPageUrl = "course/educationDetails.xhtml";

if(pageUrl.indexOf(lvaPageUrl) > -1){
    var lvaPage = new LvaPage(pageUrl);
    lvaPage.displayRoomMaps();
    chrome.extension.sendMessage({
        action: 'UpdateLvaList',
        data: lvaPage.getLva()
    });
};


