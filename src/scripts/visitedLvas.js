function VisitedLvas() {
    this.keyName = 'visited-lvas';
}

VisitedLvas.prototype.add = function (lva) {
    var keyName = this.keyName;
    chrome.storage.sync.get(keyName, function (val) {
        var lvaList = val[keyName];
        if (lvaList != null) {
            console.log("Loaded: " + val);
            if(lvaList.Count > 10){
                lvaList.shift();
            }
            else {
                lvaList.push(lva);
            }
        }
        else {
            lvaList = [ lva ];
        }

        chrome.storage.sync.set({keyName: lvaList})
    });


}



