/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var lvaPageUrl = "course/educationDetails.xhtml";
var lvaSearchPageUrl = "/course/courseList.xhtml";


if(pageUrl.indexOf(lvaPageUrl) > -1){
    var lvaPage = new LvaPage(pageUrl);
    lvaPage.displayRoomMaps();
    chrome.runtime.sendMessage({
        action: 'UpdateLvaList',
        data: lvaPage.getLva()
    });
};

if(pageUrl.indexOf(lvaSearchPageUrl) > -1){
    chrome.runtime.sendMessage({action: "GetLvaList"}, function(response) {
        var lvaSearchPage = new LvaSearchPage();
        lvaSearchPage.displayRecentlyVisitedLvas(response.lvalist);
    });
}



