function LvaList(lvas) {
    if (lvas == null) {
        lvas = [];
    }
    this.lvas = lvas;
}

LvaList.prototype.add = function (lva) {
    var lvas = this.lvas;

    function duplicateUpdated() {
        for (var i = 0; i < lvas.length; i++) {
            if (lvas[i].equals(lva)) {
                lvas[i].dateVisited = lva.dateVisited;
                return true;
            }
        }
        return false;
    }

    if (!duplicateUpdated()) {
        lvas.push(lva);
        if (lvas.length > 10) {
            lvas.shift();
        }
    }
};


LvaList.prototype.get = function () {
    return this.lvas;
};
