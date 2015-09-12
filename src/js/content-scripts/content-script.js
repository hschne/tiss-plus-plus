/**
 * Created by hasch on 09.09.2015.
 */
var pageUrl = location.href;

var registeredLva = "course/educationDetails.xhtml";
var newLvaUrl = "/course/courseDetails.xhtml";
var lvaSearchPageUrl = "/course/courseList.xhtml";


if (pageUrl.indexOf(registeredLva) > -1 || pageUrl.indexOf(newLvaUrl) > -1) {
    var lvaPage = new LvaPage(pageUrl);
    lvaPage.displayRoomMaps();
    chrome.runtime.sendMessage({
        action: 'UpdateLvaList',
        data: lvaPage.getLva()
    });
}

if (pageUrl.indexOf(lvaSearchPageUrl) > -1) {
    chrome.runtime.sendMessage({action: "GetLvaTable"}, function (lvaTable) {
        var lvaSearchPage = new LvaSearchPage();
        lvaSearchPage.displayRecentlyVisitedLvas(lvaTable);
    });
}



