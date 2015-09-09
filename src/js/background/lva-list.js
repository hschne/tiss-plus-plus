function LvaList(lvas) {
    if ($.isEmptyObject(lvas) || lvas == null) {
        lvas = [];
    }
    this.lvas = lvas;
}

LvaList.prototype.add = function (oldLvas) {
    var lvas = this.lvas;

    function lvasEqual(oldLva, newLva){
        if (oldLva.name != newLva.name) {
            return false
        }
        if (oldLva.number != newLva.number) {
            return false;
        }
        return oldLva.semester == newLva.semester;
    }

    function duplicateUpdated() {
        for (var i = 0; i < lvas.length; i++) {
            var oldLva = lvas[i];
            if (lvasEqual(oldLva, oldLvas)) {
                lvas[i].date = oldLvas.date;
                return true;
            }
        }
        return false;
    }


    if (!duplicateUpdated()) {
        lvas.push(oldLvas);
        if (lvas.length > 10) {
            lvas.shift();
        }
    }
};

LvaList.prototype.get = function () {
    return this.lvas;
};
