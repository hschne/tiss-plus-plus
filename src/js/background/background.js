/**
 * Created by hasch on 06.09.2015.
 */
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request){
        if(request.action == "UpdateLvaList") {
            chrome.storage.sync.get("lvalist", function (val) {
                var lvaList = new LvaList(val.lvalist);
                lvaList.add(request.data);
                chrome.storage.sync.set({"lvalist": lvaList.get()});
            });
        }
        else if(request.action == "GetLvaList") {
            chrome.storage.sync.get("lvalist"), function(val){
                sendResponse(new LvaList(val.lvalist));
            }
        }
    }
});
