/**
 * Created by hasch on 10.09.2015.
 */
function LvaSearchPage() {

    this.displayRecentlyVisitedLvas = function (table) {
        var contentInner = $('#contentInner').get(0);
        var existingContent = contentInner.innerHTML;
        contentInner.innerHTML = existingContent + table;
    }
}