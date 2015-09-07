/**
 * Created by hasch on 06.09.2015.
 */
chrome.storage.sync.get(keyName, function (val) {
    var lvaList = val[keyName];
});

chrome.storage.sync.set({keyName: lvaList})