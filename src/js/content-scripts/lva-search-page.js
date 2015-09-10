/**
 * Created by hasch on 10.09.2015.
 */
function LvaSearchPage(){

    this.displayRecentlyVisitedLvas = function (lvaList) {
        for(var i = 0; i< lvaList.length; i++){
            var lva = lvaList[i];
            console.log(lva.name);
        }
    }
}