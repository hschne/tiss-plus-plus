/**
 * Created by hasch on 06.09.2015.
 */
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request){
        if(request.action == "UpdateLvaList") {
            chrome.storage.sync.get("lva-list", function (val) {
                var lvaList = new LvaList(val);
                lvaList.add(request.data.lva);
                chrome.storage.sync.set({"lva-list": lvaList.get()});
            });
        }
        else if(request.action == "GetLvaList") {
            chrome.storage.sync.get("lva-list"), function(val){
                sendResponse(new LvaList(val));
            }
        }
    }
});
