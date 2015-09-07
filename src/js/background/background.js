/**
 * Created by hasch on 06.09.2015.
 */
chrome.storage.sync.get("lva-list", function (val) {
    var lvaList = val["lva-list"];
});

chrome.storage.sync.set({"lva-list": "lva-list "})