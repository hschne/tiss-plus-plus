function LvaList(lvas) {
    this.lvas = lvas;
}

LvaList.prototype.add = function (lva) {
    var lvas = this.lvas;
    if (lvas == null) {
        lvas = [];
    }
    if (lvas.length > 10) {
        lvas.shift();
    }
    lvas.push(lva);

};


LvaList.prototype.get = function () {
    return this.lvas;
};
